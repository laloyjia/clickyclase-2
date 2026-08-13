/**
 * sanear-especialidad.mjs — Click&Clase (electrolearn-prod)
 *
 * Normaliza los datos curriculares de los docentes:
 *   1) Si tiene modulosTP:{esp:[...]} pero le falta `especialidad` /
 *      `especialidades`, los rellena desde las llaves de modulosTP.
 *   2) Si tiene el esquema legacy (`especialidad` + `modulos[]`) pero no
 *      `modulosTP`, construye modulosTP = { especialidad: modulos }.
 *   3) Reporta (no toca) los usuarios con `liceoSlug` vacío.
 *
 * Por qué importa: sin `especialidad`/`especialidades` la cascada de
 * OA/AE/CE y la preselección en planificar/material no funcionan, y el
 * dropdown de planificación (que se arma desde `especialidades`) sale vacío.
 *
 * SEGURO: usa el Admin SDK con update() (merge real, updateMask) — NUNCA
 * borra otros campos. Por defecto corre en DRY-RUN (solo reporta).
 *
 * Ejecutar (desde setup-usuarios/):
 *   node sanear-especialidad.mjs           # dry-run: solo muestra qué haría
 *   APPLY=1 node sanear-especialidad.mjs   # aplica los cambios
 *
 * Requisito: serviceAccountKey.json de electrolearn-prod en esta carpeta
 * (o credenciales ADC de gcloud).
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

const PROJECT_ID = 'electrolearn-prod';
const KEY_PATH = new URL('./serviceAccountKey.json', import.meta.url);
let initOpts = { projectId: PROJECT_ID };
if (existsSync(KEY_PATH)) {
  try {
    const cred = JSON.parse(readFileSync(KEY_PATH));
    initOpts.credential = cred.project_id === PROJECT_ID
      ? admin.credential.cert(cred)
      : admin.credential.applicationDefault();
  } catch (e) {
    initOpts.credential = admin.credential.applicationDefault();
  }
} else {
  initOpts.credential = admin.credential.applicationDefault();
}
admin.initializeApp(initOpts);
const db = admin.firestore();

const APPLY = process.env.APPLY === '1';

async function main() {
  console.log('\n────────────────────────────────────────────');
  console.log('  Saneamiento de especialidad / modulosTP');
  console.log('  Modo: ' + (APPLY ? 'APLICAR CAMBIOS' : 'DRY-RUN (solo reporte)'));
  console.log('────────────────────────────────────────────\n');

  const snap = await db.collection('usuarios').get();
  let saneados = 0, sinLiceo = [], revisados = 0;

  for (const doc of snap.docs) {
    const d = doc.data() || {};
    revisados++;

    if (!d.liceoSlug) sinLiceo.push((d.email || doc.id) + ' · role=' + (d.role || '—'));

    const modulosTP = (d.modulosTP && typeof d.modulosTP === 'object') ? d.modulosTP : null;
    const espsKeys = modulosTP ? Object.keys(modulosTP) : [];
    const patch = {};

    // Caso 1: modulosTP con llaves pero falta especialidad/especialidades
    if (espsKeys.length) {
      if (!d.especialidad) patch.especialidad = espsKeys[0];
      if (!Array.isArray(d.especialidades) || !d.especialidades.length) patch.especialidades = espsKeys;
    }
    // Caso 2: legacy especialidad + modulos[] sin modulosTP
    else if (d.especialidad && Array.isArray(d.modulos) && d.modulos.length && !modulosTP) {
      const m = {}; m[d.especialidad] = d.modulos.slice();
      patch.modulosTP = m;
      if (!Array.isArray(d.especialidades) || !d.especialidades.length) patch.especialidades = [d.especialidad];
    }

    if (Object.keys(patch).length) {
      saneados++;
      console.log('  • ' + (d.email || doc.id) + '  →  ' + JSON.stringify(patch));
      if (APPLY) {
        await doc.ref.update(patch);   // update() = merge seguro (updateMask)
      }
    }
  }

  console.log('\n  Revisados: ' + revisados + ' · Con cambios: ' + saneados + (APPLY ? ' (aplicados)' : ' (no aplicados — dry-run)'));
  if (sinLiceo.length) {
    console.log('\n  ⚠ Usuarios con liceoSlug vacío (' + sinLiceo.length + '):');
    sinLiceo.forEach(function (x) { console.log('     - ' + x); });
    console.log('    (No se modifican aquí: revisar si son independientes o requieren asignar colegio.)');
  }
  if (!APPLY && saneados) console.log('\n  Para aplicar:  APPLY=1 node sanear-especialidad.mjs\n');
  process.exit(0);
}

main().catch(function (err) {
  console.error('\n✗ ERROR:', err.message);
  if (err.code) console.error('  code:', err.code);
  process.exit(1);
});
