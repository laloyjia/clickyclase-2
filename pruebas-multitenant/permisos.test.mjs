/**
 * permisos.test.mjs — Click&Clase
 * Pruebas de la matriz de permisos contra el emulador de Firestore.
 *
 * Requisito: tener el emulador corriendo en otra terminal:
 *   firebase emulators:start --project demo-electrolearn --only auth,functions,firestore
 *
 * Ejecutar:
 *   node permisos.test.mjs
 */

import { readFileSync } from 'node:fs';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// ── Conexión al emulador ya en marcha ───────────────────────
const testEnv = await initializeTestEnvironment({
  projectId: 'demo-electrolearn',
  firestore: {
    rules: readFileSync('firestore.rules', 'utf8'),
    host: '127.0.0.1',
    port: 8080,
  },
});

// ── Contadores ──────────────────────────────────────────────
let ok = 0, fail = 0;
async function prueba(nombre, fn) {
  try { await fn(); console.log('  \x1b[32m✓\x1b[0m ' + nombre); ok++; }
  catch (e) { console.log('  \x1b[31m✗\x1b[0m ' + nombre + '\n      → ' + e.message); fail++; }
}

// ── 1) Sembrar datos de prueba (sin reglas, como "admin") ───
await testEnv.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();

  // Dos colegios
  // Colegio A: profesor, educadora diferencial (PIE), apoyo
  await setDoc(doc(db, 'organizaciones/colegio-a/miembros/prof-a'),  { rol: 'profesor' });
  await setDoc(doc(db, 'organizaciones/colegio-a/miembros/pie-a'),   { rol: 'pie_educadora' });
  await setDoc(doc(db, 'organizaciones/colegio-a/miembros/apoyo-a'), { rol: 'apoyo' });

  // Colegio B: un profesor (NO debe ver nada del Colegio A)
  await setDoc(doc(db, 'organizaciones/colegio-b/miembros/prof-b'),  { rol: 'profesor' });

  // Estudiante del Colegio A con sus tres tipos de datos
  await setDoc(doc(db, 'organizaciones/colegio-a/estudiantes/est-1'),
    { nombre: 'Juan Pérez', curso: '5A' });
  await setDoc(doc(db, 'organizaciones/colegio-a/estudiantes/est-1/adecuaciones/aula'),
    { texto: 'Dar tiempo extra y apoyo visual.' });
  await setDoc(doc(db, 'organizaciones/colegio-a/estudiantes/est-1/clinico/dx'),
    { diagnostico: 'TEA nivel 1', informe: '...dato sensible...' });
});

// ── 2) Contextos de usuario ─────────────────────────────────
const profA  = testEnv.authenticatedContext('prof-a').firestore();   // profesor Colegio A
const pieA   = testEnv.authenticatedContext('pie-a').firestore();    // educadora PIE Colegio A
const profB  = testEnv.authenticatedContext('prof-b').firestore();   // profesor Colegio B

const refBase = 'organizaciones/colegio-a/estudiantes/est-1';
const refAdec = refBase + '/adecuaciones/aula';
const refClin = refBase + '/clinico/dx';
const refMat  = 'organizaciones/colegio-a/materiales/mat-1';

// ── 3) Pruebas ──────────────────────────────────────────────
console.log('\n── AISLAMIENTO ENTRE COLEGIOS ──');
await prueba('El profesor del Colegio A SÍ ve la ficha base de su estudiante',
  () => assertSucceeds(getDoc(doc(profA, refBase))));
await prueba('El profesor del Colegio B NO ve al estudiante del Colegio A',
  () => assertFails(getDoc(doc(profB, refBase))));
await prueba('El profesor del Colegio B NO ve material del Colegio A',
  () => assertFails(getDoc(doc(profB, refMat))));

console.log('\n── DATO SENSIBLE (diagnóstico clínico) ──');
await prueba('El profesor SÍ ve las ADECUACIONES de aula (las aplica en clase)',
  () => assertSucceeds(getDoc(doc(profA, refAdec))));
await prueba('El profesor NO ve el DIAGNÓSTICO clínico (dato sensible)',
  () => assertFails(getDoc(doc(profA, refClin))));
await prueba('La educadora diferencial SÍ ve el diagnóstico clínico',
  () => assertSucceeds(getDoc(doc(pieA, refClin))));

console.log('\n── AUTORÍA DEL MATERIAL ──');
await prueba('El profesor puede crear material a su propio nombre',
  () => assertSucceeds(setDoc(doc(profA, refMat), { autorUid: 'prof-a', titulo: 'Guía' })));
await prueba('El profesor NO puede crear material a nombre de otro',
  () => assertFails(setDoc(doc(profA, 'organizaciones/colegio-a/materiales/mat-2'),
                           { autorUid: 'otro', titulo: 'Falso' })));

// ── 4) Resumen ──────────────────────────────────────────────
await testEnv.cleanup();
console.log('\n────────────────────────────');
console.log(`  RESULTADO:  ${ok} ✓   ${fail} ✗`);
console.log('────────────────────────────\n');
process.exit(fail === 0 ? 0 : 1);
