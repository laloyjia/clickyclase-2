// =============================================================================
//  Click&Clase — Sincronizar usuarios Firestore ↔ Firebase Auth
//  Archivo: setup-usuarios/sincronizar-usuarios.mjs
//
//  QUÉ HACE:
//    Compara la colección Firestore `usuarios/{uid}` contra Firebase Auth y:
//      1) Detecta docs Firestore cuyo uid NO existe en Auth → HUÉRFANOS
//         (aparecen en el panel admin pero no pueden loguearse).
//      2) Detecta cuentas Auth sin doc Firestore → INCONSISTENTES
//         (pueden loguearse pero no tienen perfil).
//      3) Detecta docs Firestore con el mismo email pero distinto uid → DUPLICADOS
//
//  USO (desde setup-usuarios/):
//    node sincronizar-usuarios.mjs                     # dry-run (solo lista)
//    node sincronizar-usuarios.mjs --commit            # borra los huérfanos
//    node sincronizar-usuarios.mjs --commit --borrar-duplicados
//                                                      # además borra duplicados
//                                                      # (conserva el más nuevo)
//    node sincronizar-usuarios.mjs --commit --crear-docs-faltantes
//                                                      # crea doc mínimo para
//                                                      # cuentas Auth sin doc
//
//  Protegidos (nunca se tocan): eyanez@salesianostalca.cl, admin@clickyclase.cl
// =============================================================================

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';
import readline from 'node:readline';

const PROJECT_ID = 'electrolearn-prod';
const KEY_PATH = new URL('./serviceAccountKey.json', import.meta.url);

const ADMINS_PROTEGIDOS = [
  'eyanez@salesianostalca.cl',
  'admin@clickyclase.cl'
];

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
const auth = admin.auth();
const db = admin.firestore();

const COMMIT              = process.argv.includes('--commit');
const BORRAR_DUPLICADOS   = process.argv.includes('--borrar-duplicados');
const CREAR_DOCS_FALTANTES = process.argv.includes('--crear-docs-faltantes');

function ask(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, ans => { rl.close(); resolve(ans); });
  });
}

async function listarAuthUsers() {
  const map = new Map();  // uid → { email, ... }
  let pageToken;
  do {
    const res = await auth.listUsers(1000, pageToken);
    res.users.forEach(u => {
      map.set(u.uid, {
        uid: u.uid,
        email: (u.email || '').toLowerCase(),
        disabled: u.disabled,
        creationTime: u.metadata?.creationTime || null
      });
    });
    pageToken = res.pageToken;
  } while (pageToken);
  return map;
}

async function listarFirestoreUsers() {
  const list = [];
  const snap = await db.collection('usuarios').get();
  snap.forEach(d => {
    list.push({
      uid: d.id,
      email: String(d.data().email || '').toLowerCase(),
      nombre: d.data().nombre || '',
      role: d.data().role || '',
      liceoSlug: d.data().liceoSlug || '',
      createdAt: d.data().createdAt || d.data().creadoEn || null
    });
  });
  return list;
}

async function main() {
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  SINCRONIZAR USUARIOS Firestore ↔ Firebase Auth');
  console.log('  Proyecto:', PROJECT_ID);
  console.log('  Modo:', COMMIT ? '⚠️  BORRADO REAL' : '🔍 DRY-RUN (solo lista)');
  if (BORRAR_DUPLICADOS) console.log('  + Borrará duplicados (conserva el más nuevo)');
  if (CREAR_DOCS_FALTANTES) console.log('  + Creará docs mínimos para cuentas Auth sin doc');
  console.log('═══════════════════════════════════════════════════════════\n');

  console.log('📥 Leyendo Firebase Auth...');
  const authMap = await listarAuthUsers();
  console.log('   → ' + authMap.size + ' cuentas Auth');

  console.log('📥 Leyendo Firestore usuarios/...');
  const fsList = await listarFirestoreUsers();
  console.log('   → ' + fsList.length + ' docs Firestore');

  // ─────────────────────────────────────────────────────────
  //  1) DOCS FIRESTORE SIN CUENTA AUTH (HUÉRFANOS)
  // ─────────────────────────────────────────────────────────
  const huerfanos = fsList.filter(f =>
    !authMap.has(f.uid) &&
    !ADMINS_PROTEGIDOS.includes(f.email)
  );
  console.log('\n━━━ 1) HUÉRFANOS (docs Firestore sin cuenta Auth) ━━━');
  console.log('   → ' + huerfanos.length + ' encontrados');
  huerfanos.slice(0, 20).forEach(h => {
    console.log('   • ' + (h.email || '(sin email)') + '  · ' + h.nombre + '  · rol=' + h.role);
  });
  if (huerfanos.length > 20) console.log('   … y ' + (huerfanos.length - 20) + ' más');

  // ─────────────────────────────────────────────────────────
  //  2) CUENTAS AUTH SIN DOC FIRESTORE
  // ─────────────────────────────────────────────────────────
  const uidsFs = new Set(fsList.map(f => f.uid));
  const authSinDoc = [];
  authMap.forEach(a => {
    if (!uidsFs.has(a.uid) && !ADMINS_PROTEGIDOS.includes(a.email)) {
      authSinDoc.push(a);
    }
  });
  console.log('\n━━━ 2) INCONSISTENTES (cuentas Auth sin doc Firestore) ━━━');
  console.log('   → ' + authSinDoc.length + ' encontrados');
  authSinDoc.slice(0, 20).forEach(a => {
    console.log('   • ' + a.email + '  · uid=' + a.uid);
  });
  if (authSinDoc.length > 20) console.log('   … y ' + (authSinDoc.length - 20) + ' más');

  // ─────────────────────────────────────────────────────────
  //  3) DUPLICADOS (mismo email, distinto uid, ambos con Auth)
  // ─────────────────────────────────────────────────────────
  const porEmail = new Map();
  fsList.forEach(f => {
    if (!f.email) return;
    if (!porEmail.has(f.email)) porEmail.set(f.email, []);
    porEmail.get(f.email).push(f);
  });
  const duplicados = [];
  porEmail.forEach((docs, email) => {
    if (docs.length > 1) {
      // Ordenar por createdAt DESC (el más nuevo primero)
      docs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      duplicados.push({ email, docs });
    }
  });
  console.log('\n━━━ 3) DUPLICADOS (mismo email, varios docs) ━━━');
  console.log('   → ' + duplicados.length + ' emails duplicados');
  duplicados.slice(0, 15).forEach(d => {
    console.log('   • ' + d.email + ' → ' + d.docs.length + ' docs');
    d.docs.forEach((doc, i) => {
      const marca = i === 0 ? '  [KEEP]' : '  [BORRAR]';
      console.log('       uid=' + doc.uid + marca + '  ' + (doc.nombre||''));
    });
  });
  if (duplicados.length > 15) console.log('   … y ' + (duplicados.length - 15) + ' más');

  // ─────────────────────────────────────────────────────────
  //  Resumen final + acciones
  // ─────────────────────────────────────────────────────────
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  RESUMEN');
  console.log('    Huérfanos a borrar:      ' + huerfanos.length);
  console.log('    Auth sin doc:            ' + authSinDoc.length + (CREAR_DOCS_FALTANTES ? ' (se crearán docs)' : ' (se ignorarán)'));
  console.log('    Duplicados:              ' + duplicados.length + (BORRAR_DUPLICADOS ? ' (se borrarán extras)' : ' (se ignorarán)'));
  console.log('═══════════════════════════════════════════════════════════\n');

  if (!COMMIT) {
    console.log('✓ DRY-RUN completado. NO se borró nada.');
    console.log('  Para limpiar huérfanos:');
    console.log('    node sincronizar-usuarios.mjs --commit');
    console.log('  Para además limpiar duplicados:');
    console.log('    node sincronizar-usuarios.mjs --commit --borrar-duplicados');
    process.exit(0);
  }

  // Confirmación
  const totalABorrar = huerfanos.length + (BORRAR_DUPLICADOS
    ? duplicados.reduce((sum, d) => sum + (d.docs.length - 1), 0)
    : 0);
  const totalACrear = CREAR_DOCS_FALTANTES ? authSinDoc.length : 0;

  console.log('⚠️  Estás a punto de:');
  console.log('   • BORRAR ' + totalABorrar + ' docs de Firestore');
  if (totalACrear > 0) console.log('   • CREAR ' + totalACrear + ' docs mínimos');
  const ans = await ask('\nEscribí "SINCRONIZAR" para continuar: ');
  if (ans !== 'SINCRONIZAR') {
    console.log('❌ Cancelado.');
    process.exit(0);
  }

  // Ejecutar
  let borrados = 0, creados = 0, errores = 0;

  // 1) Borrar huérfanos en batches de 100
  for (let i = 0; i < huerfanos.length; i += 100) {
    const grupo = huerfanos.slice(i, i + 100);
    try {
      const batch = db.batch();
      grupo.forEach(h => batch.delete(db.collection('usuarios').doc(h.uid)));
      await batch.commit();
      borrados += grupo.length;
      process.stdout.write('   Huérfanos borrados: ' + borrados + '/' + huerfanos.length + '\r');
    } catch (e) {
      // Fallback doc-por-doc si el batch falla
      for (const h of grupo) {
        try { await db.collection('usuarios').doc(h.uid).delete(); borrados++; }
        catch (e2) { errores++; console.warn('\n  ⚠️  Falló ' + h.uid + ': ' + e2.message); }
      }
    }
  }
  console.log('');

  // 2) Borrar duplicados (conservar el primero = más nuevo)
  if (BORRAR_DUPLICADOS) {
    for (const dup of duplicados) {
      const aBorrar = dup.docs.slice(1);  // Todos excepto el primero
      for (const doc of aBorrar) {
        try {
          await db.collection('usuarios').doc(doc.uid).delete();
          borrados++;
          console.log('   Duplicado borrado: ' + doc.email + ' uid=' + doc.uid);
        } catch (e) {
          errores++;
          console.warn('   ⚠️  Falló ' + doc.uid + ': ' + e.message);
        }
      }
    }
  }

  // 3) Crear docs mínimos para cuentas Auth sin doc
  if (CREAR_DOCS_FALTANTES) {
    for (const a of authSinDoc) {
      try {
        await db.collection('usuarios').doc(a.uid).set({
          email: a.email,
          nombre: a.email.split('@')[0] || 'Usuario',
          role: 'profesor',
          activo: true,
          creadoEn: new Date().toISOString(),
          creadoPor: 'sync-script'
        });
        creados++;
        console.log('   Doc creado: ' + a.email);
      } catch (e) {
        errores++;
        console.warn('   ⚠️  Falló crear doc para ' + a.email + ': ' + e.message);
      }
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('  ✓ FINALIZADO');
  console.log('    Docs borrados: ' + borrados);
  if (creados > 0) console.log('    Docs creados:  ' + creados);
  if (errores > 0) console.log('    ⚠️  Errores:    ' + errores);
  console.log('═══════════════════════════════════════════════════════════\n');
  process.exit(0);
}

main().catch(e => {
  console.error('\n❌ Error fatal:', e.message);
  process.exit(1);
});
