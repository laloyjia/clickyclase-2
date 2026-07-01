/**
 * borrar-usuarios.mjs — Click&Clase (clickyclase-2)
 * Borra TODOS los usuarios (Authentication + documento en Firestore "usuarios")
 * EXCEPTO las cuentas de administrador, para partir de cero.
 *
 * Se conservan:
 *   - Cualquier correo listado en KEEP_EMAILS (abajo).
 *   - Cualquier cuenta cuyo rol sea 'admin' (en custom claims o en Firestore).
 *
 * NO toca: colegios, liceos, materiales, planificaciones ni actividad.
 *
 * Requisitos:
 *   1) serviceAccountKey.json en esta carpeta.
 *   2) npm install   (firebase-admin)
 *
 * Ejecutar (previsualizar sin borrar):
 *   DRY_RUN=1 node borrar-usuarios.mjs
 * Ejecutar (borrar de verdad):
 *   node borrar-usuarios.mjs
 */

import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';

// 👉 Agrega aquí TODOS los correos de admin que quieras conservar:
const KEEP_EMAILS = [
  'admin@clickyclase.cl',
  // 'tu-correo-admin@gmail.com',
];

const DRY_RUN = !!process.env.DRY_RUN; // DRY_RUN=1 → solo lista, no borra

const cred = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));
admin.initializeApp({ credential: admin.credential.cert(cred) });
const auth = admin.auth();
const db = admin.firestore();

const keepSet = new Set(KEEP_EMAILS.map((e) => (e || '').toLowerCase()));

function esAdminClaim(u) {
  const c = u.customClaims || {};
  return c.rol === 'admin' || c.role === 'admin';
}

async function esAdminFirestore(uid) {
  try {
    const doc = await db.collection('usuarios').doc(uid).get();
    return doc.exists && (doc.data() || {}).role === 'admin';
  } catch { return false; }
}

async function borrarTodos() {
  let borrados = 0, conservados = 0, pageToken = undefined;

  do {
    const res = await auth.listUsers(1000, pageToken);
    for (const u of res.users) {
      const email = (u.email || '').toLowerCase();
      const conservar = keepSet.has(email) || esAdminClaim(u) || (await esAdminFirestore(u.uid));
      if (conservar) {
        conservados++;
        console.log('  = conservar ', u.email || u.uid, '(admin)');
        continue;
      }
      if (DRY_RUN) {
        console.log('  · [dry-run] borrar', u.email || u.uid);
        borrados++;
        continue;
      }
      try {
        await auth.deleteUser(u.uid);
        await db.collection('usuarios').doc(u.uid).delete().catch(() => {});
        borrados++;
        console.log('  - borrado   ', u.email || u.uid);
      } catch (e) {
        console.log('  ! error     ', u.email || u.uid, '→', e.message);
      }
    }
    pageToken = res.pageToken;
  } while (pageToken);

  // Limpieza de documentos "usuarios" huérfanos (sin cuenta de Auth), salvo admins.
  if (!DRY_RUN) {
    const snap = await db.collection('usuarios').get();
    for (const d of snap.docs) {
      const data = d.data() || {};
      const email = (data.email || '').toLowerCase();
      if (keepSet.has(email) || data.role === 'admin') continue;
      await d.ref.delete().catch(() => {});
    }
  }

  console.log('\n──────────────────────────────');
  console.log(DRY_RUN ? 'DRY-RUN (no se borró nada).' : 'Listo.');
  console.log('Borrados:', borrados, '· Conservados (admin):', conservados);
  console.log('Nota: colegios, liceos y contenido NO se tocaron.');
}

borrarTodos().then(() => process.exit(0)).catch((e) => { console.error('Error fatal:', e); process.exit(1); });
