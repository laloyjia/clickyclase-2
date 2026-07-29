/**
 * borrar-demo.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Borra el colegio demo "Salesianos Talca" (liceoSlug: 'salesianos-talca'
 * y variantes: 'demo', 'colegio-demo') INCLUYENDO:
 *
 *   • Todos los usuarios Firestore (usuarios/{uid} con liceoSlug demo)
 *   • Todas las cuentas Firebase Auth de esos usuarios (SI --wipe-auth)
 *   • Todos los cursos, alumnos, materiales, planificaciones
 *   • Intervenciones APS, entrevistas convivencia, fichas PIE
 *   • Agenda APS, familia, red externa, contactos
 *   • Anotaciones, alertas, derivaciones, notas, asistencia
 *   • Libro de clases, entrevistas, comunicados, informes
 *   • Registro del liceo mismo (liceos/{slug})
 *
 *   * NO borra tu cuenta admin (eyanez@salesianostalca.cl)
 *     salvo que aparezca con liceoSlug demo (te avisa antes).
 *
 * Uso:
 *   cd setup-usuarios
 *
 *   # 1. Dry-run (por defecto): lista qué borraría, no borra nada
 *   node borrar-demo.mjs
 *
 *   # 2. Con confirmación: pide escribir "BORRAR" en la consola
 *   node borrar-demo.mjs --commit
 *
 *   # 3. Además borra cuentas Firebase Auth (irreversible!)
 *   node borrar-demo.mjs --commit --wipe-auth
 *
 *   # 4. Cambiar el slug objetivo (por defecto salesianos-talca)
 *   node borrar-demo.mjs --slug=otro-demo --commit
 *
 *   # 5. Ampliar slugs incluidos
 *   node borrar-demo.mjs --slugs=salesianos-talca,demo,colegio-demo --commit
 *
 *   # 6. Preservar usuarios (borra datos pero NO usuarios)
 *   node borrar-demo.mjs --commit --keep-users
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';
import readline from 'node:readline';

// ── Config ──────────────────────────────────────────────────
const PROJECT_ID = 'electrolearn-prod';
const KEY_PATH = new URL('./serviceAccountKey.json', import.meta.url);

const ADMINS_PROTEGIDOS = [
  'eyanez@salesianostalca.cl',   // Tu cuenta admin
  'admin@clickyclase.cl'
];

// Colecciones que se filtran por liceoSlug
const COLECCIONES_POR_LICEO = [
  'usuarios',
  'cursos',
  'materiales',
  'planificaciones',
  'evaluaciones',
  'horarios',
  'bloques_liceo',
  'anotaciones',
  'anotaciones_alumno',
  'alertas',
  'alertas_alumno',
  'derivaciones',
  'derivaciones_alumno',
  'listas_curso',
  'notas',
  'notas_curso',
  'asistencia',
  'asistencia_curso',
  'libro_clases',
  'entrevistas_apoderado',
  'entrevistas_convivencia',
  'indicadores_informe',
  'informes_personalidad',
  'comunicados',
  'anuncios',
  'actividad',
  'codigos_acceso',
  'intervenciones_apoyo',
  'pie_estudiantes',
  'apoyo_agenda',
  'apoyo_familia',
  'apoyo_red_externa',
  'apoyo_red_contactos',
  'apoyo_perfil_evaluaciones',
  'apoyo_perfil_visitas',
  'apoyo_perfil_planes_apoyo',
  'calendarios_docentes'
];

// ── Parse args ──────────────────────────────────────────────
const args = process.argv.slice(2);
const COMMIT = args.includes('--commit');
const WIPE_AUTH = args.includes('--wipe-auth');
const KEEP_USERS = args.includes('--keep-users');
const slugArg = args.find(a => a.startsWith('--slug='));
const slugsArg = args.find(a => a.startsWith('--slugs='));

let SLUGS = ['demo'];
if (slugArg) SLUGS = [slugArg.split('=')[1]];
if (slugsArg) SLUGS = slugsArg.split('=')[1].split(',').map(s => s.trim());

// ── Colores consola ─────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// ── Init Admin SDK: intenta JSON, si no usa Application Default Credentials ──
// (la organización puede tener bloqueada la creación de service account keys)
let usaADC = false;
let key = null;
if (existsSync(KEY_PATH)) {
  try {
    key = JSON.parse(readFileSync(KEY_PATH, 'utf8'));
    if (key.project_id !== PROJECT_ID) {
      console.log('\x1b[33m⚠ serviceAccountKey.json es del proyecto "' + key.project_id + '", uso ADC en su lugar\x1b[0m');
      key = null;
      usaADC = true;
    }
  } catch (e) {
    console.log('\x1b[33m⚠ serviceAccountKey.json inválido, uso ADC\x1b[0m');
    usaADC = true;
  }
} else {
  usaADC = true;
}

if (usaADC) {
  console.log('\x1b[36mUsando Application Default Credentials (ADC).\x1b[0m');
  console.log('\x1b[90mSi da error de autenticación, ejecutá primero:\x1b[0m');
  console.log('\x1b[1m  gcloud auth application-default login --project=' + PROJECT_ID + '\x1b[0m\n');
  admin.initializeApp({ credential: admin.credential.applicationDefault(), projectId: PROJECT_ID });
} else {
  admin.initializeApp({ credential: admin.credential.cert(key), projectId: PROJECT_ID });
}
const db = admin.firestore();
const auth = admin.auth();

// ── Helpers ─────────────────────────────────────────────────
function log(...msg) { console.log(...msg); }
function header(t) { log('\n' + c.bold + c.cyan + '━━━ ' + t + ' ━━━' + c.reset); }
function pregunta(q) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(res => rl.question(q, a => { rl.close(); res(a.trim()); }));
}

async function contar(colName, slug) {
  const q = db.collection(colName).where('liceoSlug', '==', slug);
  const sn = await q.get().catch(() => null);
  return sn ? sn.size : 0;
}

async function borrarPorLiceo(colName, slug) {
  const q = db.collection(colName).where('liceoSlug', '==', slug);
  const sn = await q.get();
  if (sn.empty) return 0;
  // Batches chicos + retry con fallback documento-por-documento si un batch falla
  // Firestore permite hasta 500 ops por batch PERO también hay límite de 10 MB por
  // transacción. Documentos grandes (notas, informes_personalidad) obligan a bajar.
  let borrados = 0;
  const docs = sn.docs;
  const BATCH_SIZE = 100;
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const chunk = docs.slice(i, i + BATCH_SIZE);
    try {
      const batch = db.batch();
      chunk.forEach(d => batch.delete(d.ref));
      await batch.commit();
      borrados += chunk.length;
    } catch (err) {
      // Si el batch falla (transaction too big), fallback: doc por doc
      if (String(err.message || '').includes('too big') || err.code === 3) {
        for (const d of chunk) {
          try { await d.ref.delete(); borrados++; }
          catch (e) { console.log('    ⚠ ' + colName + '/' + d.id + ' → ' + e.message); }
        }
      } else { throw err; }
    }
  }
  return borrados;
}

async function obtenerUidsAborrar(slug) {
  const sn = await db.collection('usuarios').where('liceoSlug', '==', slug).get();
  const uids = [];
  sn.forEach(d => {
    const u = d.data();
    if (ADMINS_PROTEGIDOS.includes(u.email)) {
      log(c.yellow + '  ⚠ PROTEGIDO: ' + u.email + ' (uid=' + d.id + ') NO se borrará' + c.reset);
      return;
    }
    uids.push({ uid: d.id, email: u.email, nombre: u.nombre });
  });
  return uids;
}

async function borrarUsuariosAuth(uids) {
  let ok = 0, fail = 0;
  for (const u of uids) {
    try {
      await auth.deleteUser(u.uid);
      ok++;
    } catch (err) {
      if (err.code === 'auth/user-not-found') { ok++; continue; }
      log(c.red + '  ✕ ' + u.email + ': ' + err.message + c.reset);
      fail++;
    }
  }
  return { ok, fail };
}

// ── MAIN ────────────────────────────────────────────────────
async function main() {
  log(c.bold + '\n╔══════════════════════════════════════════════════════════════╗');
  log('║       Click&Clase · Borrador de datos demo (v1)              ║');
  log('╚══════════════════════════════════════════════════════════════╝' + c.reset);
  log('Proyecto: ' + c.cyan + PROJECT_ID + c.reset);
  log('Slugs objetivo: ' + c.cyan + SLUGS.join(', ') + c.reset);
  log('Modo: ' + (COMMIT ? c.red + 'BORRAR (commit)' + c.reset : c.green + 'DRY-RUN (no borra nada)' + c.reset));
  log('Wipe Auth: ' + (WIPE_AUTH ? c.red + 'SÍ (irreversible!)' + c.reset : c.gray + 'no'));
  log('Preservar usuarios: ' + (KEEP_USERS ? c.yellow + 'sí' : c.gray + 'no') + c.reset);

  // ── PASO 1: contar todo ──
  header('Paso 1 · Inventario');
  let totalDocs = 0;
  const inventario = {};
  for (const slug of SLUGS) {
    log('\n' + c.bold + 'Slug: ' + slug + c.reset);
    inventario[slug] = {};
    for (const col of COLECCIONES_POR_LICEO) {
      if (KEEP_USERS && col === 'usuarios') continue;
      const n = await contar(col, slug);
      if (n > 0) {
        log('  ' + col.padEnd(30, ' ') + ' → ' + c.yellow + n + c.reset);
        inventario[slug][col] = n;
        totalDocs += n;
      }
    }
    // El liceo mismo
    const liceoDoc = await db.collection('liceos').doc(slug).get();
    if (liceoDoc.exists) {
      log('  ' + 'liceos/'.padEnd(30, ' ') + ' → ' + c.yellow + '1 (el registro del colegio)' + c.reset);
      inventario[slug].liceos = 1;
      totalDocs += 1;
    }
  }
  log('\n' + c.bold + 'TOTAL de documentos a borrar: ' + c.yellow + totalDocs + c.reset);

  // ── PASO 2: listar usuarios afectados ──
  header('Paso 2 · Usuarios afectados');
  const allUids = {};
  for (const slug of SLUGS) {
    log('\n' + c.bold + 'Slug: ' + slug + c.reset);
    const uids = KEEP_USERS ? [] : await obtenerUidsAborrar(slug);
    allUids[slug] = uids;
    if (uids.length === 0 && !KEEP_USERS) {
      log(c.gray + '  (ninguno)' + c.reset);
    } else {
      uids.slice(0, 10).forEach(u => log('  • ' + u.email + ' (' + (u.nombre || 'sin nombre') + ')'));
      if (uids.length > 10) log(c.gray + '  … y ' + (uids.length - 10) + ' más' + c.reset);
    }
  }

  // ── PASO 3: dry-run cierra acá ──
  if (!COMMIT) {
    log('\n' + c.green + '✓ DRY-RUN completado. NO se borró nada.' + c.reset);
    log(c.gray + '  Para borrar de verdad: ' + c.reset + 'node borrar-demo.mjs --commit');
    if (!WIPE_AUTH) log(c.gray + '  Para además borrar cuentas Auth: ' + c.reset + 'node borrar-demo.mjs --commit --wipe-auth');
    process.exit(0);
  }

  // ── PASO 4: confirmación explícita ──
  header('Paso 4 · Confirmación');
  log(c.red + c.bold + '⚠ Esta acción es IRREVERSIBLE.' + c.reset);
  log('Vas a borrar ' + c.yellow + totalDocs + c.reset + ' documentos de Firestore' + (WIPE_AUTH ? ' + cuentas Auth' : '') + '.');
  const respuesta = await pregunta(c.bold + '\nEscribí ' + c.red + 'BORRAR' + c.reset + c.bold + ' para continuar (cualquier otra cosa cancela): ' + c.reset);
  if (respuesta !== 'BORRAR') {
    log(c.gray + '\n✕ Cancelado.' + c.reset);
    process.exit(0);
  }

  // ── PASO 5: borrar Firestore ──
  header('Paso 5 · Borrado Firestore');
  const resumen = { docs: 0, colecciones: {} };
  for (const slug of SLUGS) {
    log('\n' + c.bold + 'Slug: ' + slug + c.reset);
    for (const col of COLECCIONES_POR_LICEO) {
      if (KEEP_USERS && col === 'usuarios') continue;
      const n = await borrarPorLiceo(col, slug);
      if (n > 0) {
        log('  ✓ ' + col.padEnd(30, ' ') + ' → ' + c.green + n + ' borrados' + c.reset);
        resumen.colecciones[col] = (resumen.colecciones[col] || 0) + n;
        resumen.docs += n;
      }
    }
    // Borrar el liceo mismo
    const ref = db.collection('liceos').doc(slug);
    const snap = await ref.get();
    if (snap.exists) {
      await ref.delete();
      log('  ✓ liceos/' + slug + ' → ' + c.green + '1 borrado' + c.reset);
      resumen.docs += 1;
    }
  }

  // ── PASO 6: borrar Auth (opcional) ──
  if (WIPE_AUTH) {
    header('Paso 6 · Borrado Firebase Auth');
    let totalAuth = { ok: 0, fail: 0 };
    for (const slug of SLUGS) {
      log('\n' + c.bold + 'Slug: ' + slug + c.reset);
      // Los uids ya se recolectaron al inicio pero ahora los usuarios ya no existen en firestore.
      // Los tomamos de la lista guardada.
      const uids = allUids[slug];
      if (!uids || uids.length === 0) { log(c.gray + '  (ninguno)' + c.reset); continue; }
      const res = await borrarUsuariosAuth(uids);
      log('  ✓ ' + c.green + res.ok + c.reset + ' cuentas borradas' + (res.fail ? ' · ' + c.red + res.fail + ' errores' + c.reset : ''));
      totalAuth.ok += res.ok; totalAuth.fail += res.fail;
    }
    log('\n  Total Auth: ' + c.green + totalAuth.ok + c.reset + ' ok / ' + c.red + totalAuth.fail + c.reset + ' errores');
  }

  // ── Resumen final ──
  header('✓ Terminado');
  log('Total documentos Firestore borrados: ' + c.green + resumen.docs + c.reset);
  if (WIPE_AUTH) log('Cuentas Auth borradas: ver arriba');
  log('\n' + c.gray + 'Podés verificar en:' + c.reset);
  log('  https://console.firebase.google.com/project/' + PROJECT_ID + '/firestore/databases/-default-/data');
  log('  https://console.firebase.google.com/project/' + PROJECT_ID + '/authentication/users');
  process.exit(0);
}

main().catch(err => {
  console.error(c.red + '\n✕ Error fatal:' + c.reset, err);
  process.exit(1);
});
