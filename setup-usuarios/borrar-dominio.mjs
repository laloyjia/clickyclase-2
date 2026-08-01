// =============================================================================
//  Click&Clase — Borrar cuentas de un dominio de Firebase Authentication
//  Archivo: setup-usuarios/borrar-dominio.mjs
//
//  ⚠️  ACCIÓN IRREVERSIBLE. Borra cuentas de acceso de forma PERMANENTE.
//      Los usuarios borrados NO podrán volver a iniciar sesión.
//
//  QUÉ HACE:
//  Busca en Firebase Authentication todos los correos que terminen en el
//  dominio configurado (por defecto @csjb.cl) y los elimina. Opcionalmente
//  también borra su documento en la colección "usuarios" de Firestore.
//
//  USO (desde setup-usuarios/):
//    1) PRUEBA (solo lista, no borra nada):
//         node borrar-dominio.mjs
//    2) BORRAR DE VERDAD (requiere las DOS banderas, a propósito):
//         node borrar-dominio.mjs --aplicar --confirmo
//
//    Para borrar también sus datos en Firestore, añade --con-firestore:
//         node borrar-dominio.mjs --aplicar --confirmo --con-firestore
// =============================================================================

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

// ── Dominio a borrar ────────────────────────────────────────────────────────
const DOMINIO = '@csjb.cl';

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
const auth = admin.auth();
const db = admin.firestore();

// ── Banderas de seguridad ───────────────────────────────────────────────────
const APLICAR       = process.argv.includes('--aplicar');
const CONFIRMO      = process.argv.includes('--confirmo');
const CON_FIRESTORE = process.argv.includes('--con-firestore');
const VA_A_BORRAR   = APLICAR && CONFIRMO;

async function listarTodos() {
  const encontrados = [];
  let pageToken;
  do {
    const res = await auth.listUsers(1000, pageToken);
    res.users.forEach(u => {
      if (u.email && u.email.toLowerCase().endsWith(DOMINIO.toLowerCase())) {
        encontrados.push({ uid: u.uid, email: u.email });
      }
    });
    pageToken = res.pageToken;
  } while (pageToken);
  return encontrados;
}

async function main() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  BORRAR CUENTAS DEL DOMINIO', DOMINIO);
  console.log('  Proyecto:', PROJECT_ID);
  console.log('  Modo:', VA_A_BORRAR ? '⚠️  BORRADO REAL (irreversible)' : '🔍 PRUEBA (no borra nada)');
  if (VA_A_BORRAR && CON_FIRESTORE) console.log('  + También borrará documentos en Firestore (usuarios)');
  console.log('═══════════════════════════════════════════════════════════\n');

  const cuentas = await listarTodos();

  if (!cuentas.length) {
    console.log(`✨ No se encontró ninguna cuenta con dominio ${DOMINIO}.\n`);
    process.exit(0);
  }

  console.log(`Se encontraron ${cuentas.length} cuentas con dominio ${DOMINIO}:\n`);
  cuentas.forEach((c, i) => console.log(`  ${String(i+1).padStart(3)}. ${c.email}`));
  console.log('');

  if (!VA_A_BORRAR) {
    console.log('───────────────────────────────────────────────────────────');
    console.log('🔍 Esto fue solo una PRUEBA. No se borró nada.');
    console.log('   Revisa la lista de arriba con cuidado.');
    console.log('   Para BORRAR DE VERDAD (irreversible), corre:');
    console.log('       node borrar-dominio.mjs --aplicar --confirmo');
    console.log('   (añade --con-firestore para borrar también sus datos)');
    console.log('───────────────────────────────────────────────────────────\n');
    process.exit(0);
  }

  // ── Borrado real ──
  let okAuth = 0, okFs = 0, errores = 0;
  for (const c of cuentas) {
    try {
      await auth.deleteUser(c.uid);
      okAuth++;
      let extra = '';
      if (CON_FIRESTORE) {
        try { await db.collection('usuarios').doc(c.uid).delete(); okFs++; extra = ' + Firestore'; }
        catch (e) { extra = ' (Firestore falló: ' + e.message + ')'; }
      }
      console.log(`  ✅ ${c.email}${extra}`);
    } catch (e) {
      errores++;
      console.log(`  ❌ ${c.email} — ${e.message}`);
    }
  }

  console.log('\n───────────────────────────────────────────────────────────');
  console.log(`Cuentas borradas de Authentication: ${okAuth}`);
  if (CON_FIRESTORE) console.log(`Documentos borrados de Firestore: ${okFs}`);
  if (errores) console.log(`Errores: ${errores}`);
  console.log('───────────────────────────────────────────────────────────\n');
  process.exit(0);
}

main().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
