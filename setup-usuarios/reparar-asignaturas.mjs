// =============================================================================
//  Click&Clase — Reparar asignaturas: formato superadmin → formato admin
//  Archivo: setup-usuarios/reparar-asignaturas.mjs
//
//  QUÉ HACE:
//  El panel de superadmin guarda las asignaturas como "fisica__3b",
//  "ciencias_nat__1m" (slug + nivel pegado). El panel de admin las guarda
//  como nombres limpios: "Física", "Ciencias Naturales". El sistema de carga
//  de OA solo entiende el formato de admin. Este script convierte a todos los
//  usuarios afectados al formato que funciona: quita el "__nivel", traduce el
//  slug al nombre oficial, y deduplica.
//
//  USO (desde setup-usuarios/):
//    1) Prueba (no cambia nada):   node reparar-asignaturas.mjs
//    2) Aplicar de verdad:         node reparar-asignaturas.mjs --aplicar
// =============================================================================

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

const KEY_PATH = new URL('./serviceAccountKey.json', import.meta.url);
const PROJECT_ID = 'electrolearn-prod';
let initOpts = { projectId: PROJECT_ID };
if (existsSync(KEY_PATH)) {
  try {
    const cred = JSON.parse(readFileSync(KEY_PATH));
    initOpts.credential = cred.project_id === PROJECT_ID
      ? admin.credential.cert(cred)
      : admin.credential.applicationDefault();
  } catch (e) { initOpts.credential = admin.credential.applicationDefault(); }
} else {
  initOpts.credential = admin.credential.applicationDefault();
}
admin.initializeApp(initOpts);
const db = admin.firestore();
const APLICAR = process.argv.includes('--aplicar');

// Slug del superadmin → Nombre oficial (igual que usa el panel de admin)
const SLUG_A_NOMBRE = {
  'lenguaje':'Lenguaje y Comunicación', 'ling_liter':'Lengua y Literatura',
  'lengua_literatura':'Lengua y Literatura', 'matematica':'Matemática',
  'ciencias_nat':'Ciencias Naturales', 'ciencias':'Ciencias Naturales',
  'biologia':'Biología', 'fisica':'Física', 'quimica':'Química',
  'historia':'Historia, Geografía y Ciencias Sociales', 'ingles':'Inglés',
  'artes_vis':'Artes Visuales', 'artes':'Artes Visuales', 'musica':'Música',
  'tecnologia':'Tecnología', 'ed_fisica':'Educación Física y Salud',
  'religion':'Religión', 'orientacion':'Orientación', 'filosofia':'Filosofía',
  'cs_ciudadania':'Ciencias para la Ciudadanía', 'ed_ciudadana':'Educación Ciudadana'
};

// Convierte una lista de asignaturas al formato limpio (nombres, sin nivel, deduplicado)
function convertir(asigs) {
  if (!Array.isArray(asigs)) return { nueva: asigs, cambio: false };
  const set = new Set();
  let huboCombo = false;
  asigs.forEach(a => {
    let s = String(a);
    if (s.indexOf('__') !== -1) { s = s.split('__')[0]; huboCombo = true; }
    const key = s.toLowerCase().trim();
    // Si ya es un nombre bonito (tiene mayúscula/espacio), lo dejamos tal cual
    const nombre = SLUG_A_NOMBRE[key] || (a.indexOf('__') === -1 && /[A-ZÁÉÍÓÚ ]/.test(a) ? a.split('__')[0] : (SLUG_A_NOMBRE[key] || s));
    set.add(nombre);
  });
  const nueva = Array.from(set);
  // cambio si hubo combos O si la lista cambió de tamaño/contenido
  const cambio = huboCombo || nueva.length !== asigs.length || nueva.some((v,i)=>v!==asigs[i]);
  return { nueva, cambio };
}

async function main() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  REPARAR ASIGNATURAS (formato superadmin → admin)');
  console.log('  Modo:', APLICAR ? '⚠️  APLICAR' : '🔍 PRUEBA (no cambia nada)');
  console.log('═══════════════════════════════════════════════════════════\n');

  const snap = await db.collection('usuarios').get();
  let afectados = 0;

  for (const doc of snap.docs) {
    const data = doc.data();
    if (!Array.isArray(data.asignaturas) || !data.asignaturas.length) continue;
    // ¿Tiene formato con "__" (superadmin)? Solo reparamos esos.
    const tieneCombo = data.asignaturas.some(a => String(a).indexOf('__') !== -1);
    if (!tieneCombo) continue;

    const { nueva, cambio } = convertir(data.asignaturas);
    if (!cambio) continue;

    afectados++;
    const nombre = data.nombre || data.email || doc.id;
    console.log(`• ${nombre}`);
    console.log(`    antes (${data.asignaturas.length}): ${data.asignaturas.slice(0,6).join(', ')}${data.asignaturas.length>6?'…':''}`);
    console.log(`    después (${nueva.length}): ${nueva.join(', ')}`);

    if (APLICAR) {
      await db.collection('usuarios').doc(doc.id).update({ asignaturas: nueva });
      console.log('    ✅ actualizado');
    }
    console.log('');
  }

  console.log('───────────────────────────────────────────────────────────');
  console.log(`Usuarios ${APLICAR ? 'reparados' : 'que se repararían'}: ${afectados}`);
  console.log('───────────────────────────────────────────────────────────');
  if (!APLICAR && afectados > 0) {
    console.log('\n🔍 Fue PRUEBA. Para aplicar:  node reparar-asignaturas.mjs --aplicar');
  } else if (APLICAR) {
    console.log('\n✅ Listo. Recarga con Ctrl+Shift+R y prueba de nuevo.');
  } else {
    console.log('\n✨ No hay nada que reparar.');
  }
  console.log('');
  process.exit(0);
}
main().catch(e => { console.error('❌', e.message); process.exit(1); });
