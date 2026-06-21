/**
 * crear-usuarios.mjs — Click&Clase (clickyclase-2)
 * Crea los usuarios de prueba (1 por rol) en Firebase Authentication,
 * les asigna su rol y deja su documento en Firestore (colección usuarios).
 *
 * Requisitos:
 *   1) Tener el archivo serviceAccountKey.json en esta carpeta (ver LEEME.md).
 *   2) Tener Firestore creado en el proyecto clickyclase-2.
 *   3) npm install   (instala firebase-admin)
 *
 * Ejecutar:
 *   node crear-usuarios.mjs
 *
 * Es seguro correrlo varias veces: si el usuario ya existe, lo actualiza.
 */

import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';

const cred = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));
admin.initializeApp({ credential: admin.credential.cert(cred) });
const auth = admin.auth();
const db = admin.firestore();

// Contraseña común para todos los usuarios de prueba (cámbiala si quieres)
const PASSWORD = 'Demo1234!';
const COLEGIO = 'colegio-demo';

// Cada usuario: email, nombre, rol (= id de panel), tipo, y a qué organización pertenece
const USUARIOS = [
  { email: 'admin@clickyclase.cl',                nombre: 'Administrador General',        role: 'admin',     tipo: 'plataforma',    org: null },
  { email: 'director@colegio-demo.cl',            nombre: 'Director Demo',                role: 'director',  tipo: 'colegio',       org: COLEGIO },
  { email: 'utp@colegio-demo.cl',                 nombre: 'Encargado UTP',                role: 'utp',       tipo: 'colegio',       org: COLEGIO },
  { email: 'profesor@colegio-demo.cl',            nombre: 'Profesor Demo',                role: 'profesor',  tipo: 'colegio',       org: COLEGIO },
  { email: 'ambiente@colegio-demo.cl',            nombre: 'Encargado de Ambiente',        role: 'amb_enc',   tipo: 'colegio',       org: COLEGIO },
  { email: 'ambiente.prof@colegio-demo.cl',       nombre: 'Profesional de Ambiente',      role: 'amb_prof',  tipo: 'colegio',       org: COLEGIO },
  { email: 'apoyo@colegio-demo.cl',               nombre: 'Encargado Apoyo Psicosocial',  role: 'aps_enc',   tipo: 'colegio',       org: COLEGIO },
  { email: 'apoyo.prof@colegio-demo.cl',          nombre: 'Profesional Apoyo Psicosocial',role: 'aps_prof',  tipo: 'colegio',       org: COLEGIO },
  { email: 'pie.encargada@colegio-demo.cl',       nombre: 'Encargada PIE',                role: 'pie_enc',   tipo: 'colegio',       org: COLEGIO },
  { email: 'pie.educadora@colegio-demo.cl',       nombre: 'Educadora PIE',                role: 'pie_edu',   tipo: 'colegio',       org: COLEGIO },
  // Profesor independiente: contrata el servicio por su cuenta, NO pertenece a un colegio.
  // Mismo panel de profesor, pero su propio espacio aislado (organización personal).
  { email: 'profesor.independiente@clickyclase.cl', nombre: 'Profesor Independiente',     role: 'profesor',  tipo: 'independiente', org: null },
];

async function upsertUsuario(u) {
  let user;
  try {
    user = await auth.createUser({ email: u.email, password: PASSWORD, displayName: u.nombre });
    console.log('  + creado   ', u.email);
  } catch (e) {
    if (e.code === 'auth/email-already-exists') {
      user = await auth.getUserByEmail(u.email);
      await auth.updateUser(user.uid, { password: PASSWORD, displayName: u.nombre });
      console.log('  ~ existente', u.email, '(actualizado)');
    } else {
      console.log('  ! error    ', u.email, '→', e.message);
      return;
    }
  }

  // Organización efectiva: colegio, o espacio personal del profesor independiente
  const orgId = u.org || (u.tipo === 'independiente' ? 'personal-' + user.uid : null);

  // Custom claims (útiles luego para reglas y enrutamiento rápido)
  await auth.setCustomUserClaims(user.uid, { rol: u.role, tipo: u.tipo, orgId: orgId });

  // Documento en Firestore (compatible con el sistema actual: campo "role")
  await db.collection('usuarios').doc(user.uid).set({
    email: u.email,
    nombre: u.nombre,
    role: u.role,
    tipo: u.tipo,
    orgId: orgId,
    creadoEn: new Date().toISOString(),
  }, { merge: true });

  // Si pertenece a un colegio, dejar también su membresía en el modelo multi-tenant
  if (u.org) {
    await db.doc(`organizaciones/${u.org}/miembros/${user.uid}`).set({
      rol: u.role, email: u.email, nombre: u.nombre,
    }, { merge: true });
  }
}

async function main() {
  console.log('\nCreando usuarios de prueba en clickyclase-2…\n');
  for (const u of USUARIOS) {
    await upsertUsuario(u);
  }
  console.log('\n────────────────────────────────────────────');
  console.log('  Listo. ' + USUARIOS.length + ' usuarios. Contraseña: ' + PASSWORD);
  console.log('────────────────────────────────────────────\n');
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
