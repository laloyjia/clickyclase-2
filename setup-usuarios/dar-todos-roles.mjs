/**
 * dar-todos-roles.mjs — Click&Clase (electrolearn-prod)
 *
 * Agrega TODOS los roles al usuario admin para que pueda navegar cada
 * panel (director, utp, aps_enc, pie_enc, etc.) sin hacer logout.
 * En el header aparecerá un switcher "Ver como:" con dropdown de roles.
 *
 * NO cambia el rol legacy `role: 'admin'` — el usuario sigue siendo admin
 * de plataforma. Solo agrega el mapa `roles` con todos los roles como llaves.
 *
 * Requisitos:
 *   serviceAccountKey.json de electrolearn-prod en esta carpeta.
 *
 * Ejecutar:
 *   node dar-todos-roles.mjs
 *
 * Con otro email:
 *   EMAIL=otro@mail.cl node dar-todos-roles.mjs
 */

import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';

const cred = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));
admin.initializeApp({ credential: admin.credential.cert(cred) });
const auth = admin.auth();
const db   = admin.firestore();

const EMAIL = process.env.EMAIL || 'eduyanezjara@gmail.com';
const LICEO = process.env.LICEO || 'salesianos-talca';

// Todos los roles del sistema con datos vacíos (para testing)
const TODOS_LOS_ROLES = {
  admin:          {},
  director:       {},
  rector:         {},
  admin_colegio:  {},
  utp:            {},
  encargado_area: { areas: ['primer_ciclo', 'segundo_ciclo', 'media_hc', 'media_tp', 'especialidad_tp'] },
  profesor:       {},
  jefe_curso:     { cursos: [] },  // se llena al asignarse en la app
  amb_enc:        {},
  amb_prof:       {},
  aps_enc:        {},
  aps_prof:       {},
  pie_enc:        {},
  pie_edu:        {}
};

async function main() {
  console.log('\n────────────────────────────────────────────');
  console.log('  Agregar todos los roles al admin');
  console.log('────────────────────────────────────────────');
  console.log('  Email:  ' + EMAIL);
  console.log('  Liceo:  ' + LICEO);
  console.log('────────────────────────────────────────────\n');

  const user = await auth.getUserByEmail(EMAIL);
  console.log('  UID: ' + user.uid);

  const ref = db.collection('usuarios').doc(user.uid);
  await ref.set({
    roles:     TODOS_LOS_ROLES,
    liceoSlug: LICEO,
    // Mantenemos el legacy para retro-compatibilidad
    role:      'admin'
  }, { merge: true });

  console.log('  ✓ Roles asignados: ' + Object.keys(TODOS_LOS_ROLES).join(', '));
  console.log('\n  Ahora podés hacer Ctrl+F5 en clickyclase.cl y navegar');
  console.log('  cada panel directamente por URL (o esperar al switcher).\n');

  process.exit(0);
}

main().catch(function (err) {
  console.error('\n✗ ERROR:', err.message);
  if (err.code) console.error('  code:', err.code);
  process.exit(1);
});
