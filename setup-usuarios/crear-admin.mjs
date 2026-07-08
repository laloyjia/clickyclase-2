/**
 * crear-admin.mjs — Click&Clase (electrolearn-prod)
 *
 * Crea o actualiza el usuario administrador principal:
 *   - En Firebase Authentication (con contraseña conocida y emailVerified: true)
 *   - En Firestore colección `usuarios` con role=admin, liceoSlug, etc.
 *   - Setea custom claims { rol: 'admin', tipo: 'plataforma' }
 *
 * Es idempotente: si el usuario ya existe en Auth le actualiza la contraseña
 * y en Firestore hace merge. Sirve para "resetear" la cuenta admin sin borrar.
 *
 * Requisitos:
 *   1) serviceAccountKey.json de electrolearn-prod en esta misma carpeta.
 *      (Ver LEEME.md paso 2 — descargar desde Firebase Console → ⚙ → Cuentas
 *       de servicio → Generar nueva clave privada → Renombrar y mover acá).
 *   2) npm install ejecutado en esta carpeta.
 *
 * Ejecutar (contraseña por defecto = Admin2026):
 *   node crear-admin.mjs
 *
 * Ejecutar con contraseña custom (PowerShell / Bash):
 *   PASSWORD='miContraseñaSecreta' node crear-admin.mjs
 *
 * Ejecutar con email/nombre/liceo distintos:
 *   EMAIL=otro@mail.cl NOMBRE='Otro' LICEO='otro-liceo' node crear-admin.mjs
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

// ── Verificar service account key ─────────────────────────────
const keyPath = new URL('./serviceAccountKey.json', import.meta.url);
if (!existsSync(keyPath)) {
  console.error('\n✗ ERROR: no se encontró serviceAccountKey.json en esta carpeta.');
  console.error('  Descargá la clave desde:');
  console.error('    https://console.firebase.google.com/project/electrolearn-prod/settings/serviceaccounts/adminsdk');
  console.error('  → Botón "Generar nueva clave privada" → Guardá el JSON acá renombrado a serviceAccountKey.json.\n');
  process.exit(1);
}

const cred = JSON.parse(readFileSync(keyPath));

if (cred.project_id !== 'electrolearn-prod') {
  console.error('\n✗ ERROR: serviceAccountKey.json apunta a proyecto "' + cred.project_id + '"');
  console.error('  Debe ser de electrolearn-prod. Descargá la key correcta.\n');
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.cert(cred) });
const auth = admin.auth();
const db = admin.firestore();

// ── Parámetros ────────────────────────────────────────────────
const EMAIL    = process.env.EMAIL    || 'eduyanezjara@gmail.com';
const PASSWORD = process.env.PASSWORD || 'Admin2026';
const NOMBRE   = process.env.NOMBRE   || 'Eduardo Yáñez';
const LICEO    = process.env.LICEO    || 'salesianos-talca';

async function main() {
  console.log('\n────────────────────────────────────────────');
  console.log('  Click&Clase — Crear admin en electrolearn-prod');
  console.log('────────────────────────────────────────────');
  console.log('  Email:    ' + EMAIL);
  console.log('  Password: ' + PASSWORD);
  console.log('  Nombre:   ' + NOMBRE);
  console.log('  Liceo:    ' + LICEO);
  console.log('────────────────────────────────────────────\n');

  // 1) Firebase Auth: crear o actualizar
  let user;
  try {
    user = await auth.createUser({
      email:         EMAIL,
      password:      PASSWORD,
      displayName:   NOMBRE,
      emailVerified: true
    });
    console.log('  ✓ Usuario CREADO en Auth');
  } catch (e) {
    if (e.code === 'auth/email-already-exists') {
      user = await auth.getUserByEmail(EMAIL);
      await auth.updateUser(user.uid, {
        password:      PASSWORD,
        displayName:   NOMBRE,
        emailVerified: true
      });
      console.log('  ✓ Usuario ACTUALIZADO en Auth (ya existía, password reseteada)');
    } else {
      throw e;
    }
  }
  console.log('    UID: ' + user.uid);

  // 2) Custom claims (útil para reglas y enrutamiento server-side)
  await auth.setCustomUserClaims(user.uid, {
    rol:  'admin',
    tipo: 'plataforma'
  });
  console.log('  ✓ Custom claims seteados: { rol: "admin", tipo: "plataforma" }');

  // 3) Documento en Firestore usuarios/{uid}
  const docRef = db.collection('usuarios').doc(user.uid);
  await docRef.set({
    email:          EMAIL,
    nombre:         NOMBRE,
    role:           'admin',           // legacy string (retro-compatible)
    roles:          { admin: {} },     // formato nuevo (roles múltiples)
    liceoSlug:      LICEO,
    activo:         true,
    primerIngreso:  false,
    creadoEn:       new Date().toISOString(),
    xp:             0,
    nivel:          1,
    badges:         [],
    evaluaciones:   []
  }, { merge: true });
  console.log('  ✓ Perfil GUARDADO en Firestore (usuarios/' + user.uid + ')');

  console.log('\n────────────────────────────────────────────');
  console.log('  ✓ LISTO');
  console.log('────────────────────────────────────────────');
  console.log('  Login en: https://clickyclase.cl');
  console.log('  Email:    ' + EMAIL);
  console.log('  Password: ' + PASSWORD);
  console.log('────────────────────────────────────────────\n');

  process.exit(0);
}

main().catch(function (err) {
  console.error('\n✗ ERROR:', err.message);
  if (err.code) console.error('  code:', err.code);
  process.exit(1);
});
