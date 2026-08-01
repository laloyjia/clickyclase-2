// =============================================================================
//  Click&Clase — Limpieza de combinaciones asignatura·nivel inválidas
//  Archivo: setup-usuarios/limpiar-combos-invalidos.mjs
//
//  QUÉ HACE:
//  Recorre todos los usuarios y les quita del campo `asignaturas` las
//  combinaciones imposibles como "ciencias_nat__nt1" o "biologia__nt2".
//  Las asignaturas del plan común/básica/media NO existen en Educación
//  Parvularia (NT1/NT2), que se organiza por Núcleos de Aprendizaje.
//  Esto resuelve el bug DE RAÍZ: al limpiar el dato, desaparece de TODAS
//  las pantallas de golpe (dashboard, planificación, material, admin...).
//
//  CÓMO USARLO (desde la carpeta setup-usuarios/):
//    1) Primero en modo PRUEBA (no cambia nada, solo muestra qué haría):
//         node limpiar-combos-invalidos.mjs
//    2) Si el reporte se ve bien, ejecútalo DE VERDAD:
//         node limpiar-combos-invalidos.mjs --aplicar
//
//  Requiere serviceAccountKey.json en esta misma carpeta (ya lo tienes).
// =============================================================================

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

// ── Conexión (mismo patrón que tus otros scripts) ──────────────────────────
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

// ── Modo: prueba (default) o aplicar ───────────────────────────────────────
const APLICAR = process.argv.includes('--aplicar');

// ── Lógica: ¿es un combo inválido? ─────────────────────────────────────────
// Un slug es inválido si contiene nt1/nt2 PERO no es un núcleo de parvularia.
const NUCLEOS_PARVULARIA = [
  'parvularia','nucleo','exploracion','lenguaje_verbal','convivencia',
  'corporalidad','pensamiento','artistico','entorno','identidad','comunicacion'
];
function esComboInvalido(slug) {
  const s = String(slug || '').toLowerCase();
  const tieneNT = s.includes('nt1') || s.includes('nt2');
  if (!tieneNT) return false;                       // sin NT → válido
  // Tiene NT: solo es válido si es un núcleo de parvularia
  return !NUCLEOS_PARVULARIA.some(n => s.includes(n));
}

// ── Proceso ────────────────────────────────────────────────────────────────
async function main() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  LIMPIEZA DE COMBINACIONES ASIGNATURA·NIVEL INVÁLIDAS');
  console.log('  Proyecto:', PROJECT_ID);
  console.log('  Modo:', APLICAR ? '⚠️  APLICAR (modificará la base)' : '🔍 PRUEBA (no cambia nada)');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  const snap = await db.collection('usuarios').get();
  console.log(`Revisando ${snap.size} usuarios…\n`);

  let afectados = 0;
  let totalCombosQuitados = 0;
  const cambios = [];

  for (const doc of snap.docs) {
    const data = doc.data();
    const asigs = Array.isArray(data.asignaturas) ? data.asignaturas : null;
    if (!asigs || !asigs.length) continue;

    const invalidos = asigs.filter(esComboInvalido);
    if (!invalidos.length) continue;

    const limpias = asigs.filter(a => !esComboInvalido(a));
    afectados++;
    totalCombosQuitados += invalidos.length;

    const nombre = data.nombre || data.name || data.email || doc.id;
    cambios.push({ uid: doc.id, nombre, quitar: invalidos, quedan: limpias.length });

    console.log(`• ${nombre}`);
    console.log(`    quita (${invalidos.length}): ${invalidos.join(', ')}`);
    console.log(`    le quedan ${limpias.length} asignaturas válidas`);

    if (APLICAR) {
      await db.collection('usuarios').doc(doc.id).update({ asignaturas: limpias });
      console.log('    ✅ actualizado');
    }
    console.log('');
  }

  console.log('───────────────────────────────────────────────────────────');
  console.log(`Usuarios afectados: ${afectados}`);
  console.log(`Combos inválidos ${APLICAR ? 'eliminados' : 'que se eliminarían'}: ${totalCombosQuitados}`);
  console.log('───────────────────────────────────────────────────────────');

  if (!APLICAR && afectados > 0) {
    console.log('');
    console.log('🔍 Esto fue solo una PRUEBA. No se cambió nada.');
    console.log('   Si el reporte se ve bien, ejecuta de verdad con:');
    console.log('       node limpiar-combos-invalidos.mjs --aplicar');
  } else if (APLICAR && afectados > 0) {
    console.log('');
    console.log('✅ Limpieza completada. Recarga las pantallas y verifica.');
  } else {
    console.log('');
    console.log('✨ No se encontraron combos inválidos. Todo limpio.');
  }
  console.log('');
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
