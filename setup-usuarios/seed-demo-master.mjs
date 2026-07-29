/**
 * seed-demo-master.mjs — Click&Clase
 * ═══════════════════════════════════════════════════════════════
 * MEGA-SCRIPT que puebla TODO el colegio demo en un solo pase.
 *
 * Liceo: "Colegio Demo"
 * Slug:  demo
 * Email: @demo.cl para todos los funcionarios
 * Password: Demo1234!
 *
 * Puebla todos los paneles con datos realistas:
 *  ✅ Liceo + 34 funcionarios (@demo.cl)
 *  ✅ 15 cursos + ~460 estudiantes (RUT válido, apoderados)
 *  ✅ 32 materiales (15 base + 17 con estados de aprobación)
 *  ✅ 23 planificaciones (15 base + 8 con estados)
 *  ✅ 60 anotaciones · 30 alertas apoderado · 25 derivaciones
 *  ✅ 28 fichas PIE (con adecuaciones)
 *  ✅ 38 intervenciones apoyo psicosocial
 *  ✅ 40 entrevistas convivencia (+ 3 casos reincidentes)
 *  ✅ 450 sets de notas · 600 días de asistencia por curso
 *  ✅ 15 clases del libro registradas
 *  ✅ 10 eventos calendario + 5 comunicados
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-demo-master.mjs
 *
 * ES IDEMPOTENTE: podés correrlo 10 veces sin duplicar.
 * Cada colección usa seedTag para reemplazar limpiamente.
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

// ═══════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════
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

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
const LICEO_SLUG    = 'demo';
const LICEO_NOMBRE  = 'Colegio Demo';
const DOMINIO_MAIL  = 'demo.cl';
const PASSWORD      = 'Demo1234!';
const HOY           = new Date();
const HOY_ISO       = HOY.toISOString().slice(0, 10);
const SEED_TAG      = 'demo-master-v1';

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}
function slug(s) {
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function rutRandom() {
  const n = rand(10_000_000, 25_000_000);
  const rev = String(n).split('').reverse().map(Number);
  const factores = [2, 3, 4, 5, 6, 7];
  let suma = 0;
  for (let i = 0; i < rev.length; i++) suma += rev[i] * factores[i % 6];
  const dv = 11 - (suma % 11);
  const digito = dv === 11 ? '0' : dv === 10 ? 'K' : String(dv);
  const s = String(n);
  return `${s.slice(0, -6)}.${s.slice(-6, -3)}.${s.slice(-3)}-${digito}`;
}
function fechaNacRandom(edadMin, edadMax) {
  const edad = rand(edadMin, edadMax);
  const anio = HOY.getFullYear() - edad;
  const mes = rand(1, 12);
  const dia = rand(1, 28);
  return `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}
function fechaHace(dias) {
  const d = new Date(HOY);
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
}
function isoHace(dias) {
  const d = new Date(HOY);
  d.setDate(d.getDate() - dias);
  return d.toISOString();
}
function esFinDeSemana(fechaISO) {
  const d = new Date(fechaISO + 'T12:00:00');
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}
function foneRandom() { return `+569${rand(10000000, 99999999)}`; }
function notaAleatoria(base = 5.5, varianza = 0.8) {
  const n = base + (Math.random() - 0.5) * 2 * varianza;
  const r = Math.round(n * 10) / 10;
  return Math.max(1.0, Math.min(7.0, r));
}

// Espera un poco para no exceder rate limits de Firebase Auth
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ═══════════════════════════════════════════════════════════════
// CREAR/ACTUALIZAR USUARIO EN AUTH + FIRESTORE
// ═══════════════════════════════════════════════════════════════
async function crearUsuario(email, nombre, extra = {}) {
  try {
    let uid;
    try {
      const u = await auth.getUserByEmail(email);
      uid = u.uid;
      await auth.updateUser(uid, { displayName: nombre, password: PASSWORD, disabled: false });
    } catch {
      const u = await auth.createUser({
        email, password: PASSWORD, displayName: nombre, emailVerified: true
      });
      uid = u.uid;
    }
    const perfil = {
      uid, email, nombre,
      liceoSlug:    LICEO_SLUG,
      activo:       true,
      creadoEn:     admin.firestore.FieldValue.serverTimestamp(),
      seedTag:      SEED_TAG,
      ...extra
    };
    await db.collection('usuarios').doc(uid).set(perfil, { merge: true });
    return uid;
  } catch (e) {
    console.error(`   ✗ ${email}:`, e.message);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// DATOS MAESTROS
// ═══════════════════════════════════════════════════════════════
const NOMBRES_M = [
  'Alonso', 'Andrés', 'Benjamín', 'Camilo', 'Cristóbal', 'Diego', 'Eduardo', 'Emilio', 'Ernesto',
  'Felipe', 'Fernando', 'Francisco', 'Gabriel', 'Gonzalo', 'Ignacio', 'Javier', 'Joaquín', 'José',
  'Juan', 'Lucas', 'Manuel', 'Martín', 'Matías', 'Nicolás', 'Pablo', 'Rodrigo', 'Sebastián',
  'Tomás', 'Vicente', 'Álvaro'
];
const NOMBRES_F = [
  'Agustina', 'Amanda', 'Antonia', 'Bárbara', 'Camila', 'Carla', 'Catalina', 'Constanza', 'Daniela',
  'Emilia', 'Fernanda', 'Florencia', 'Francisca', 'Gabriela', 'Isidora', 'Javiera', 'Josefa',
  'Julieta', 'Laura', 'Macarena', 'Magdalena', 'María', 'Martina', 'Natalia', 'Paula', 'Rocío',
  'Sofía', 'Trinidad', 'Valentina', 'Victoria'
];
const APELLIDOS = [
  'González', 'Muñoz', 'Rojas', 'Díaz', 'Pérez', 'Soto', 'Contreras', 'Silva', 'Martínez',
  'Sepúlveda', 'Morales', 'Rodríguez', 'López', 'Fuentes', 'Hernández', 'Torres', 'Araya',
  'Flores', 'Espinoza', 'Valenzuela', 'Castillo', 'Tapia', 'Reyes', 'Gutiérrez', 'Castro',
  'Álvarez', 'Vargas', 'Herrera', 'Vásquez', 'Núñez', 'Fernández', 'Ramírez', 'Carrasco',
  'Sánchez', 'Pizarro', 'Miranda', 'Cornejo', 'Bravo', 'Yáñez', 'Quezada', 'Ortiz', 'Cárdenas'
];
function nombreCompletoRand(sexo) {
  const n = pick(sexo === 'M' ? NOMBRES_M : NOMBRES_F);
  const a1 = pick(APELLIDOS);
  const a2 = pick(APELLIDOS);
  return { nombre: `${n} ${a1} ${a2}`, primer: n, apellido: a1 };
}

// ═══════════════════════════════════════════════════════════════
// LIMPIAR DATOS PREVIOS DEL SEED
// ═══════════════════════════════════════════════════════════════
async function limpiarPrevio() {
  console.log('▶ [0/15] Limpiando datos previos del seed…');
  const cols = [
    'asistencia', 'notas', 'anotaciones', 'alertas', 'derivaciones',
    'libro_clases', 'planificaciones', 'materiales',
    'intervenciones_apoyo', 'entrevistas_convivencia', 'pie_estudiantes',
    'eventos_calendario', 'comunicados'
  ];
  let total = 0;
  for (const col of cols) {
    try {
      const snap = await db.collection(col).where('seedTag', '==', SEED_TAG).limit(2000).get();
      const batches = []; let batch = db.batch(); let n = 0;
      snap.forEach(doc => {
        batch.delete(doc.ref); n++;
        if (n >= 400) { batches.push(batch); batch = db.batch(); n = 0; }
      });
      if (n > 0) batches.push(batch);
      for (const b of batches) await b.commit();
      total += snap.size;
    } catch (e) {
      // colección puede no existir aún, no importa
    }
  }
  console.log(`   ✓ ${total} docs previos borrados`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 1: LICEO
// ═══════════════════════════════════════════════════════════════
async function crearLiceo() {
  console.log('▶ [1/15] Creando liceo…');
  await db.collection('liceos').doc(LICEO_SLUG).set({
    slug:        LICEO_SLUG,
    nombre:      LICEO_NOMBRE,
    tipo:        'colegio',
    region:      'Región Metropolitana',
    comuna:      'Santiago',
    direccion:   'Av. Los Educadores 1234, Santiago',
    telefono:    '+56 2 2222 3333',
    email:       `contacto@${DOMINIO_MAIL}`,
    plan:        'full',
    activo:      true,
    creadoEn:    admin.firestore.FieldValue.serverTimestamp(),
    dependencia: 'Particular subvencionado',
    niveles:     ['7B', '8B', '1M', '2M', '3M', '4M'],
    tieneTP:     true,
    especialidadesTP: ['tp_electricidad', 'tp_electronica', 'tp_mec_auto'],
    seedTag:     SEED_TAG
  }, { merge: true });
  console.log(`   ✓ Liceo: ${LICEO_NOMBRE} (slug: ${LICEO_SLUG})`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 2: FUNCIONARIOS (todos @demo.cl)
// ═══════════════════════════════════════════════════════════════
async function crearFuncionarios() {
  console.log('▶ [2/15] Creando funcionarios (35)…');

  const staff = [
    // ══ EQUIPO DIRECTIVO ══
    { rol: 'rector',        nombre: 'María Fernanda Silva Rojas',       email: 'rector',    cargo: 'Rectora' },
    { rol: 'director',      nombre: 'Roberto Cornejo Muñoz',            email: 'director',  cargo: 'Director de Ciclo' },
    { rol: 'admin_colegio', nombre: 'Andrea Fuentes Rojas',             email: 'admin',     cargo: 'Administradora del establecimiento' },
    // ══ UTP ══
    { rol: 'utp',           nombre: 'Marcela Espinoza Vargas',          email: 'utp1',      cargo: 'Jefa UTP · Enseñanza Media' },
    { rol: 'utp',           nombre: 'Cristian Herrera Ortiz',           email: 'utp2',      cargo: 'Jefe UTP · Enseñanza Básica' },
    // ══ PIE (Programa de Integración Escolar) ══
    { rol: 'pie_enc',       nombre: 'Paola Quezada Torres',             email: 'pie.coord', cargo: 'Coordinadora PIE',           profesion: 'Educadora Diferencial' },
    { rol: 'pie_edu',       nombre: 'Carolina Pizarro Bravo',           email: 'pie.edu1',  cargo: 'Educadora Diferencial',      profesion: 'Educadora Diferencial' },
    { rol: 'pie_edu',       nombre: 'Andrea Cárdenas Silva',            email: 'pie.edu2',  cargo: 'Educadora Diferencial',      profesion: 'Educadora Diferencial' },
    { rol: 'pie_edu',       nombre: 'Bárbara Yáñez Rojas',              email: 'pie.edu3',  cargo: 'Educadora Diferencial',      profesion: 'Educadora Diferencial' },
    // ══ APOYO PSICOSOCIAL (equipo diverso: psi + ts + psicopedagoga) ══
    { rol: 'aps_enc',       nombre: 'Alejandra Núñez Miranda',          email: 'apoyo.enc', cargo: 'Encargada Apoyo Psicosocial', profesion: 'Psicóloga' },
    { rol: 'aps_prof',      nombre: 'Diego Vásquez Contreras',          email: 'psicologo', cargo: 'Psicólogo Escolar',           profesion: 'Psicólogo' },
    { rol: 'aps_prof',      nombre: 'Constanza Ramírez Soto',           email: 'trabajador.social', cargo: 'Trabajadora Social',  profesion: 'Trabajadora Social' },
    { rol: 'aps_prof',      nombre: 'Francisca Muñoz Herrera',          email: 'psicopedagoga',     cargo: 'Psicopedagoga',       profesion: 'Psicopedagoga' },
    // ══ CONVIVENCIA ESCOLAR ══
    { rol: 'amb_enc',       nombre: 'Mauricio Sepúlveda Rojas',         email: 'conviv.enc',cargo: 'Encargado Convivencia Escolar', profesion: 'Orientador' },
    { rol: 'amb_prof',      nombre: 'Valentina Morales Flores',         email: 'conviv1',   cargo: 'Mediadora Escolar',           profesion: 'Mediadora Escolar' },
    { rol: 'amb_prof',      nombre: 'Rodrigo Silva Castro',             email: 'conviv2',   cargo: 'Inspector General',           profesion: 'Inspector' },
    // ══ DOCENTES PLAN COMÚN — 15 profesores por asignatura ══
    { rol: 'profesor', nombre: 'Camila Reyes González',       email: 'camila.reyes',       cargo: 'Profesora de Lenguaje',      asignaturas: ['lenguaje', 'ling_liter'] },
    { rol: 'profesor', nombre: 'Fernanda Muñoz López',        email: 'fernanda.munoz',     cargo: 'Profesora de Lenguaje',      asignaturas: ['lenguaje', 'ling_liter'] },
    { rol: 'profesor', nombre: 'Ignacio Martínez Pérez',      email: 'ignacio.martinez',   cargo: 'Profesor de Matemática',     asignaturas: ['matematica'] },
    { rol: 'profesor', nombre: 'Sofía Herrera Torres',        email: 'sofia.herrera',      cargo: 'Profesora de Matemática',    asignaturas: ['matematica'] },
    { rol: 'profesor', nombre: 'Pablo Contreras Díaz',        email: 'pablo.contreras',    cargo: 'Profesor de Historia',       asignaturas: ['historia', 'ed_ciudadana'] },
    { rol: 'profesor', nombre: 'Antonia Rojas Vargas',        email: 'antonia.rojas',      cargo: 'Profesora de Inglés',        asignaturas: ['ingles'] },
    { rol: 'profesor', nombre: 'Sebastián Castillo Núñez',    email: 'sebastian.castillo', cargo: 'Profesor de Inglés',         asignaturas: ['ingles'] },
    { rol: 'profesor', nombre: 'Macarena Soto Álvarez',       email: 'macarena.soto',      cargo: 'Profesora de Biología',      asignaturas: ['ciencias_nat', 'biologia'] },
    { rol: 'profesor', nombre: 'Nicolás Bravo Fuentes',       email: 'nicolas.bravo',      cargo: 'Profesor de Ciencias',       asignaturas: ['fisica', 'quimica'] },
    { rol: 'profesor', nombre: 'Emilia Tapia Silva',          email: 'emilia.tapia',       cargo: 'Profesora de Ed. Física',    asignaturas: ['ed_fisica'] },
    { rol: 'profesor', nombre: 'Rodrigo Gutiérrez Araya',     email: 'rodrigo.gutierrez',  cargo: 'Profesor de Ed. Física',     asignaturas: ['ed_fisica'] },
    { rol: 'profesor', nombre: 'Trinidad Cornejo Vargas',     email: 'trinidad.cornejo',   cargo: 'Profesora de Artes',         asignaturas: ['artes_vis', 'musica'] },
    { rol: 'profesor', nombre: 'Javiera Espinoza Miranda',    email: 'javiera.espinoza',   cargo: 'Profesora de Tecnología',    asignaturas: ['tecnologia'] },
    { rol: 'profesor', nombre: 'Matías Flores Reyes',         email: 'matias.flores',      cargo: 'Profesor de Filosofía',      asignaturas: ['filosofia', 'cs_ciudadania'] },
    { rol: 'profesor', nombre: 'Amanda Álvarez Yáñez',        email: 'amanda.alvarez',     cargo: 'Profesora de Artes Escénicas', asignaturas: ['ling_liter', 'artes_esc'] },
    // ══ DOCENTES TP (especialidades técnico-profesionales) ══
    { rol: 'profesor', nombre: 'Cristóbal Vargas Muñoz',      email: 'cristobal.vargas',   cargo: 'Profesor especialidad Electricidad', esp: 'tp_electricidad', modulos: ['EL1', 'EL2', 'EL3'] },
    { rol: 'profesor', nombre: 'Andrés Reyes Fuentes',        email: 'andres.reyes',       cargo: 'Profesor especialidad Electrónica',  esp: 'tp_electronica',  modulos: ['EN2', 'EN4'] },
    { rol: 'profesor', nombre: 'Diego Muñoz Pizarro',         email: 'diego.munoz',        cargo: 'Profesor especialidad Mecánica Automotriz', esp: 'tp_mec_auto', modulos: ['MA1', 'MA2'] }
  ];

  const uids = {};
  const listaCompleta = [];
  for (const s of staff) {
    const email = s.email.includes('@') ? s.email : `${s.email}@${DOMINIO_MAIL}`;
    const extra = {
      role:   s.rol,
      roles:  { [s.rol]: true },
      tipoProfesor: s.esp ? 'tecnico' : (s.asignaturas ? 'media' : 'directivo')
    };
    if (s.asignaturas) extra.asignaturas = s.asignaturas;
    if (s.esp)         extra.especialidades = [s.esp];
    if (s.esp && s.modulos) extra.modulosTP = { [s.esp]: s.modulos };
    if (s.profesion)   extra.profesion = s.profesion;
    if (s.cargo)       extra.cargo = s.cargo;

    const uid = await crearUsuario(email, s.nombre, extra);
    if (uid) {
      uids[s.email.split('@')[0]] = uid;
      listaCompleta.push({ uid, email, nombre: s.nombre, rol: s.rol });
    }
  }
  console.log(`   ✓ ${listaCompleta.length}/${staff.length} funcionarios creados`);
  return { uids, listaCompleta };
}

// ═══════════════════════════════════════════════════════════════
// FASE 3: CURSOS + ESTUDIANTES
// ═══════════════════════════════════════════════════════════════
async function crearCursosYEstudiantes(profes) {
  console.log('▶ [3/15] Creando 15 cursos + ~470 estudiantes…');

  const cursosDef = [
    { nivel: '7B', letra: 'A', jefe: 'camila.reyes' },
    { nivel: '7B', letra: 'B', jefe: 'ignacio.martinez' },
    { nivel: '8B', letra: 'A', jefe: 'sofia.herrera' },
    { nivel: '8B', letra: 'B', jefe: 'fernanda.munoz' },
    { nivel: '1M', letra: 'A', jefe: 'pablo.contreras' },
    { nivel: '1M', letra: 'B', jefe: 'antonia.rojas' },
    { nivel: '2M', letra: 'A', jefe: 'sebastian.castillo' },
    { nivel: '2M', letra: 'B', jefe: 'macarena.soto' },
    { nivel: '3M', letra: 'A', jefe: 'nicolas.bravo' },
    { nivel: '3M', letra: 'B', jefe: 'emilia.tapia' },
    { nivel: '3M', letra: 'C', jefe: 'cristobal.vargas', esp: 'tp_electricidad' },
    { nivel: '3M', letra: 'D', jefe: 'andres.reyes',     esp: 'tp_electronica' },
    { nivel: '4M', letra: 'A', jefe: 'rodrigo.gutierrez' },
    { nivel: '4M', letra: 'B', jefe: 'trinidad.cornejo' },
    { nivel: '4M', letra: 'C', jefe: 'diego.munoz',      esp: 'tp_mec_auto' }
  ];

  const cursosCreados = [];
  const estudiantesTotales = [];

  for (const c of cursosDef) {
    const cursoId = `${LICEO_SLUG}_${c.nivel}${c.letra}`;
    const nombreCurso = c.esp ? `${c.nivel}${c.letra} — ${c.esp.toUpperCase()}` : `${c.nivel}${c.letra}`;
    const jefeUid = profes.uids[c.jefe];
    const jefeInfo = profes.listaCompleta.find(x => x.uid === jefeUid);

    const totalEst = rand(28, 34);
    const estudiantes = [];
    for (let i = 0; i < totalEst; i++) {
      const sexo = pick(['M', 'F']);
      const info = nombreCompletoRand(sexo);
      const apInfo = nombreCompletoRand(pick(['M', 'F']));
      const edadBase = c.nivel === '7B' ? 12 : c.nivel === '8B' ? 13 :
                       c.nivel === '1M' ? 14 : c.nivel === '2M' ? 15 :
                       c.nivel === '3M' ? 16 : 17;
      estudiantes.push({
        uid:      `est_${cursoId}_${String(i + 1).padStart(2, '0')}`,
        ordinal:  i + 1,
        nombre:   info.nombre,
        rut:      rutRandom(),
        sexo,
        fechaNac: fechaNacRandom(edadBase, edadBase + 1),
        curso:    cursoId,
        activo:   true,
        apoderado: {
          nombre:   apInfo.nombre,
          telefono: foneRandom(),
          email:    `${slug(apInfo.primer)}.${slug(apInfo.apellido)}@gmail.com`,
          parentesco: pick(['Madre', 'Padre', 'Tutor'])
        }
      });
    }

    // Asignaturas asignadas
    let asignaturasAsignadas = [];
    if (c.esp) {
      asignaturasAsignadas = [
        { asignatura: 'lenguaje',   docenteUid: profes.uids['camila.reyes'],       docenteNombre: 'Camila Reyes González' },
        { asignatura: 'matematica', docenteUid: profes.uids['ignacio.martinez'],    docenteNombre: 'Ignacio Martínez Pérez' },
        { asignatura: 'historia',   docenteUid: profes.uids['pablo.contreras'],    docenteNombre: 'Pablo Contreras Díaz' },
        { asignatura: 'ingles',     docenteUid: profes.uids['antonia.rojas'],      docenteNombre: 'Antonia Rojas Vargas' },
        { asignatura: 'ed_fisica',  docenteUid: profes.uids['emilia.tapia'],       docenteNombre: 'Emilia Tapia Silva' }
      ];
    } else {
      asignaturasAsignadas = [
        { asignatura: 'lenguaje',    docenteUid: profes.uids[pick(['camila.reyes', 'fernanda.munoz'])], docenteNombre: '' },
        { asignatura: 'matematica',  docenteUid: profes.uids[pick(['ignacio.martinez', 'sofia.herrera'])], docenteNombre: '' },
        { asignatura: 'historia',    docenteUid: profes.uids['pablo.contreras'], docenteNombre: 'Pablo Contreras Díaz' },
        { asignatura: 'ingles',      docenteUid: profes.uids[pick(['antonia.rojas', 'sebastian.castillo'])], docenteNombre: '' },
        { asignatura: 'biologia',    docenteUid: profes.uids['macarena.soto'], docenteNombre: 'Macarena Soto Álvarez' },
        { asignatura: 'fisica',      docenteUid: profes.uids['nicolas.bravo'], docenteNombre: 'Nicolás Bravo Fuentes' },
        { asignatura: 'quimica',     docenteUid: profes.uids['nicolas.bravo'], docenteNombre: 'Nicolás Bravo Fuentes' },
        { asignatura: 'ed_fisica',   docenteUid: profes.uids[pick(['emilia.tapia', 'rodrigo.gutierrez'])], docenteNombre: '' },
        { asignatura: 'artes_vis',   docenteUid: profes.uids['trinidad.cornejo'], docenteNombre: 'Trinidad Cornejo Vargas' },
        { asignatura: 'religion',    docenteUid: profes.uids['alvaro.sepulveda'], docenteNombre: 'Álvaro Sepúlveda Ortiz' },
        { asignatura: 'tecnologia',  docenteUid: profes.uids['javiera.espinoza'], docenteNombre: 'Javiera Espinoza Miranda' }
      ];
    }

    await db.collection('cursos').doc(cursoId).set({
      id: cursoId,
      cursoId: cursoId,
      liceoSlug: LICEO_SLUG,
      nivel: c.nivel,
      letra: c.letra,
      nombreCompleto: nombreCurso,
      jefeUid,
      jefeNombre: jefeInfo ? jefeInfo.nombre : '',
      esp: c.esp || null,
      esTP: !!c.esp,
      totalEstudiantes: estudiantes.length,
      estudiantes,
      asignaturasAsignadas: asignaturasAsignadas.filter(a => a.docenteUid),
      activo: true,
      anio: HOY.getFullYear(),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    }, { merge: true });

    cursosCreados.push({ id: cursoId, ...c, cursoId, nombreCompleto: nombreCurso, totalEstudiantes: estudiantes.length, estudiantes, jefeUid });
    estudiantes.forEach(e => estudiantesTotales.push({ ...e, cursoNombre: nombreCurso, cursoId }));
  }
  console.log(`   ✓ ${cursosCreados.length} cursos + ${estudiantesTotales.length} estudiantes`);
  return { cursos: cursosCreados, estudiantes: estudiantesTotales };
}

// ═══════════════════════════════════════════════════════════════
// FASE 4: MATERIALES (base + con estados)
// ═══════════════════════════════════════════════════════════════
async function crearMateriales(profes) {
  console.log('▶ [4/15] Creando materiales (32)…');

  const TITULOS = [
    { titulo: 'Guía de ejercicios — Ecuaciones cuadráticas', tipo: 'guia', asig: 'matematica', autor: 'ignacio.martinez' },
    { titulo: 'Prueba unidad 2 — Sistema respiratorio', tipo: 'prueba', asig: 'biologia', autor: 'macarena.soto' },
    { titulo: 'Rúbrica — Ensayo argumentativo', tipo: 'rubrica', asig: 'lenguaje', autor: 'camila.reyes' },
    { titulo: 'Guía comprensión lectora — Poesía chilena', tipo: 'guia', asig: 'lenguaje', autor: 'fernanda.munoz' },
    { titulo: 'Actividad grupal — Análisis de fuentes históricas', tipo: 'actividad', asig: 'historia', autor: 'pablo.contreras' },
    { titulo: 'Evaluación semestral — Inglés 3M', tipo: 'evaluacion', asig: 'ingles', autor: 'antonia.rojas' },
    { titulo: 'Guía práctica — Resolución de sistemas', tipo: 'guia', asig: 'matematica', autor: 'sofia.herrera' },
    { titulo: 'Apunte — Introducción a la genética', tipo: 'apunte', asig: 'biologia', autor: 'macarena.soto' },
    { titulo: 'Prueba diagnóstica — Cinemática', tipo: 'prueba', asig: 'fisica', autor: 'nicolas.bravo' },
    { titulo: 'Guía TP — Circuitos serie y paralelo', tipo: 'guia', asig: 'tp_electricidad', autor: 'cristobal.vargas' },
    { titulo: 'Rúbrica — Presentación oral en inglés', tipo: 'rubrica', asig: 'ingles', autor: 'sebastian.castillo' },
    { titulo: 'Guía complementaria — Filosofía moderna', tipo: 'guia', asig: 'filosofia', autor: 'matias.flores' },
    { titulo: 'Actividad de refuerzo — Números racionales', tipo: 'actividad', asig: 'matematica', autor: 'ignacio.martinez' },
    { titulo: 'Evaluación formativa — Biología celular', tipo: 'evaluacion', asig: 'biologia', autor: 'macarena.soto' },
    { titulo: 'Guía TP electrónica — Osciloscopio', tipo: 'guia', asig: 'tp_electronica', autor: 'andres.reyes' }
  ];

  // 15 aprobados/publicados históricos
  let n = 0;
  let batch = db.batch();
  for (const t of TITULOS) {
    const uid = profes.uids[t.autor];
    if (!uid) continue;
    const persona = profes.listaCompleta.find(x => x.uid === uid);
    const doc = {
      titulo: t.titulo, tipo: t.tipo, asignatura: t.asig,
      autorUid: uid, autorNombre: persona?.nombre || '', uid,
      liceoSlug: LICEO_SLUG,
      visibilidad: pick(['liceo', 'liceo', 'departamento']),
      estado: pick(['aprobada', 'aprobada', 'activa', 'publicada']),
      enviadoEn: isoHace(rand(15, 60)),
      estadoFecha: isoHace(rand(1, 15)),
      contenido: `<h2>${t.titulo}</h2><p>Material didáctico alineado a los OA MINEDUC.</p>`,
      nivel: pick(['1M', '2M', '3M', '4M']),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    };
    batch.set(db.collection('materiales').doc(), doc);
    n++;
  }
  await batch.commit();

  // 17 en estados de aprobación (para bandeja UTP)
  const estadosMap = [
    { estado: 'enviada',     n: 5, dias: [1,1,2,2,3] },
    { estado: 'en_revision', n: 4, dias: [2,3,3,4] },
    { estado: 'aprobada',    n: 5, dias: [1,2,2,3,4] },
    { estado: 'devuelta',    n: 3, dias: [1,2,3] }
  ];
  batch = db.batch();
  let idx = 0;
  for (const bloque of estadosMap) {
    for (let i = 0; i < bloque.n; i++) {
      const t = TITULOS[idx++ % TITULOS.length];
      const uid = profes.uids[t.autor];
      if (!uid) continue;
      const persona = profes.listaCompleta.find(x => x.uid === uid);
      const revisor = profes.listaCompleta.find(x => x.rol === 'utp' || x.rol === 'director');
      const doc = {
        titulo: `[BR] ${t.titulo}`, tipo: t.tipo, asignatura: t.asig,
        autorUid: uid, autorNombre: persona?.nombre || '', uid,
        liceoSlug: LICEO_SLUG,
        visibilidad: 'liceo',
        estado: bloque.estado,
        enviadoEn: isoHace(bloque.dias[i]),
        estadoFecha: isoHace(bloque.estado === 'aprobada' || bloque.estado === 'devuelta' ? 0 : bloque.dias[i]),
        revisorUid: bloque.estado !== 'enviada' ? revisor?.uid : null,
        revisorNombre: bloque.estado !== 'enviada' ? revisor?.nombre : null,
        comentarioRevisor:
          bloque.estado === 'aprobada' ? 'Aprobado. Excelente estructura y alineación curricular.'
          : bloque.estado === 'devuelta' ? 'Ajustar la ponderación de las evaluaciones y agregar rúbrica.'
          : bloque.estado === 'en_revision' ? 'En revisión por UTP…'
          : '',
        contenido: `<h2>${t.titulo}</h2><p>Material en flujo de aprobación.</p>`,
        nivel: pick(['1M','2M','3M','4M']),
        creadoEn: admin.firestore.FieldValue.serverTimestamp(),
        seedTag: SEED_TAG
      };
      batch.set(db.collection('materiales').doc(), doc);
      n++;
    }
  }
  await batch.commit();
  console.log(`   ✓ ${n} materiales creados`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 5: PLANIFICACIONES
// ═══════════════════════════════════════════════════════════════
async function crearPlanificaciones(profes) {
  console.log('▶ [5/15] Creando planificaciones (23)…');

  const planes = [
    { titulo: 'Unidad 1: Textos argumentativos', asignatura: 'lenguaje',    autor: 'camila.reyes',        nivel: '3M', horas: 45 },
    { titulo: 'Unidad 2: Literatura latinoamericana', asignatura: 'ling_liter', autor: 'amanda.alvarez',  nivel: '4M', horas: 60 },
    { titulo: 'Unidad 1: Números y álgebra', asignatura: 'matematica',       autor: 'ignacio.martinez',   nivel: '1M', horas: 50 },
    { titulo: 'Unidad 3: Geometría analítica', asignatura: 'matematica',     autor: 'sofia.herrera',       nivel: '3M', horas: 40 },
    { titulo: 'Unidad 2: Chile en el siglo XX', asignatura: 'historia',      autor: 'pablo.contreras',    nivel: '3M', horas: 55 },
    { titulo: 'Unit 1: My daily routine', asignatura: 'ingles',              autor: 'antonia.rojas',       nivel: '1M', horas: 30 },
    { titulo: 'Unit 3: Environmental issues', asignatura: 'ingles',          autor: 'sebastian.castillo', nivel: '3M', horas: 30 },
    { titulo: 'Unidad 1: Célula y niveles de organización', asignatura: 'biologia', autor: 'macarena.soto', nivel: '1M', horas: 40 },
    { titulo: 'Unidad 2: Cinemática', asignatura: 'fisica',                  autor: 'nicolas.bravo',       nivel: '2M', horas: 45 },
    { titulo: 'Unidad 4: Enlace químico', asignatura: 'quimica',             autor: 'nicolas.bravo',       nivel: '2M', horas: 35 },
    { titulo: 'Módulo EL1: Instalaciones domiciliarias', asignatura: 'tp_electricidad', autor: 'cristobal.vargas', nivel: '3M', horas: 80 },
    { titulo: 'Módulo EN2: Sistemas digitales', asignatura: 'tp_electronica', autor: 'andres.reyes',       nivel: '3M', horas: 80 },
    { titulo: 'Módulo MA1: Sistema de encendido', asignatura: 'tp_mec_auto', autor: 'diego.munoz',        nivel: '3M', horas: 90 },
    { titulo: 'Unidad 1: Deportes de conjunto', asignatura: 'ed_fisica',     autor: 'emilia.tapia',        nivel: '1M', horas: 30 },
    { titulo: 'Unidad 2: Corrientes filosóficas', asignatura: 'filosofia',   autor: 'matias.flores',       nivel: '4M', horas: 40 }
  ];

  let n = 0;
  for (const p of planes) {
    const uid = profes.uids[p.autor];
    if (!uid) continue;
    const persona = profes.listaCompleta.find(x => x.uid === uid);
    const id = `plan_${slug(p.titulo).slice(0, 40)}_${n}`;
    await db.collection('planificaciones').doc(id).set({
      id, titulo: p.titulo, asignatura: p.asignatura, modulo: p.asignatura,
      nivel: p.nivel, horas: p.horas,
      autorUid: uid, autorNombre: persona?.nombre || '', profesor: persona?.email, uid,
      liceoSlug: LICEO_SLUG,
      fechaClase: fechaHace(rand(-20, 30)),
      fechaISO: fechaHace(rand(1, 30)),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      estado: pick(['aprobada', 'aprobada', 'activa', 'publicada']),
      seedTag: SEED_TAG
    }, { merge: true });
    n++;
  }

  // 8 con estados variados para bandeja
  const estados = [
    { estado: 'enviada',     dias: 1 }, { estado: 'enviada',     dias: 2 }, { estado: 'enviada',     dias: 3 },
    { estado: 'en_revision', dias: 4 }, { estado: 'en_revision', dias: 5 },
    { estado: 'aprobada',    dias: 1 }, { estado: 'aprobada',    dias: 3 },
    { estado: 'devuelta',    dias: 2 }
  ];
  const revisor = profes.listaCompleta.find(x => x.rol === 'utp' || x.rol === 'director');
  for (let i = 0; i < estados.length; i++) {
    const e = estados[i];
    const p = planes[i % planes.length];
    const uid = profes.uids[p.autor];
    if (!uid) continue;
    const persona = profes.listaCompleta.find(x => x.uid === uid);
    await db.collection('planificaciones').add({
      titulo: `[BR] ${p.titulo}`, asignatura: p.asignatura, nivel: p.nivel, horas: p.horas,
      autorUid: uid, autorNombre: persona?.nombre || '', uid,
      liceoSlug: LICEO_SLUG,
      estado: e.estado,
      enviadoEn: isoHace(e.dias),
      estadoFecha: isoHace(e.estado === 'aprobada' || e.estado === 'devuelta' ? 0 : e.dias),
      revisorUid: e.estado !== 'enviada' ? revisor?.uid : null,
      revisorNombre: e.estado !== 'enviada' ? revisor?.nombre : null,
      comentarioRevisor:
        e.estado === 'aprobada' ? 'Aprobado. Muy buen trabajo.'
        : e.estado === 'devuelta' ? 'Falta explicitar indicadores de logro.'
        : e.estado === 'en_revision' ? 'En revisión por UTP…' : '',
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    });
    n++;
  }
  console.log(`   ✓ ${n} planificaciones creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 6: ANOTACIONES (60)
// ═══════════════════════════════════════════════════════════════
async function crearAnotaciones(cursos, profes) {
  console.log('▶ [6/15] Creando 60 anotaciones…');
  const TIPOS = [
    { tipo: 'positiva',      texto: 'Excelente participación en clase y ayudó a sus compañeros con dudas.' },
    { tipo: 'positiva',      texto: 'Entrega puntual y de gran calidad en el trabajo grupal.' },
    { tipo: 'positiva',      texto: 'Destaca por su liderazgo y actitud colaborativa.' },
    { tipo: 'academica',     texto: 'Presenta dificultades para seguir el ritmo de la clase.' },
    { tipo: 'academica',     texto: 'Muestra mejora sostenida en la comprensión de los OA.' },
    { tipo: 'academica',     texto: 'No entregó el trabajo asignado dentro del plazo.' },
    { tipo: 'comportamiento', texto: 'Interrumpe reiteradamente el desarrollo de la clase.' },
    { tipo: 'comportamiento', texto: 'Conflicto con compañero durante el recreo. Conversado y resuelto.' },
    { tipo: 'comportamiento', texto: 'Uso indebido del celular durante la evaluación.' },
    { tipo: 'apoyo',         texto: 'Se detecta necesidad de apoyo psicosocial. Derivación en curso.' }
  ];

  let batch = db.batch(); let n = 0;
  for (let i = 0; i < 60; i++) {
    const curso = pick(cursos);
    const estudiantes = curso.estudiantes || [];
    if (!estudiantes.length) continue;
    const alumno = pick(estudiantes);
    const t = pick(TIPOS);
    const profe = pick(profes.listaCompleta.filter(p => p.rol === 'profesor'));
    batch.set(db.collection('anotaciones').doc(), {
      cursoId: curso.id, cursoNombre: curso.nombreCompleto,
      alumnoUid: alumno.uid, alumnoNombre: alumno.nombre, alumnoRut: alumno.rut,
      tipo: t.tipo, texto: t.texto,
      profesorUid: profe.uid, profesorNombre: profe.nombre,
      liceoSlug: LICEO_SLUG,
      fecha: fechaHace(rand(1, 60)),
      leida: Math.random() > 0.4,
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    });
    n++;
  }
  await batch.commit();
  console.log(`   ✓ ${n} anotaciones creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 7: ALERTAS APODERADO
// ═══════════════════════════════════════════════════════════════
async function crearAlertas(cursos, profes) {
  console.log('▶ [7/15] Creando 30 alertas apoderado…');
  const MOTIVOS = [
    { m: 'Inasistencias reiteradas',  d: 'Más de 5 inasistencias sin justificar en el mes.' },
    { m: 'Bajo rendimiento académico',d: 'Promedio actual bajo 4.0 en más de una asignatura.' },
    { m: 'Comportamiento en clases',  d: 'Anotaciones reiteradas por interrupción del desarrollo de clases.' },
    { m: 'Tareas no entregadas',      d: 'No ha entregado 3 tareas consecutivas.' },
    { m: 'Reunión de apoderados',     d: 'Convocatoria a reunión de apoderados del curso.' },
    { m: 'Felicitación por logro',    d: 'Reconocimiento por destacado desempeño en evaluación.' }
  ];
  const ESTADOS = ['pendiente','pendiente','pendiente','respondida','respondida','escalada'];
  let batch = db.batch(); let n = 0;
  for (let i = 0; i < 30; i++) {
    const curso = pick(cursos);
    const estudiantes = curso.estudiantes || [];
    if (!estudiantes.length) continue;
    const alumno = pick(estudiantes);
    const motivo = pick(MOTIVOS);
    const profe = pick(profes.listaCompleta.filter(p => p.rol === 'profesor'));
    const estado = pick(ESTADOS);
    batch.set(db.collection('alertas').doc(), {
      cursoId: curso.id, cursoNombre: curso.nombreCompleto,
      alumnoUid: alumno.uid, alumnoNombre: alumno.nombre,
      apoderadoNombre: alumno.apoderado?.nombre || '',
      apoderadoTelefono: alumno.apoderado?.telefono || '',
      apoderadoEmail: alumno.apoderado?.email || '',
      motivo: motivo.m, descripcion: motivo.d, estado,
      profesorUid: profe.uid, profesorNombre: profe.nombre,
      liceoSlug: LICEO_SLUG,
      fechaEnvio: fechaHace(rand(1, 30)),
      canal: pick(['whatsapp', 'email', 'llamada']),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    });
    n++;
  }
  await batch.commit();
  console.log(`   ✓ ${n} alertas creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 8: DERIVACIONES
// ═══════════════════════════════════════════════════════════════
async function crearDerivaciones(cursos, profes) {
  console.log('▶ [8/15] Creando 25 derivaciones…');
  const DERIVS = [
    { destino: 'apoyo',       motivo: 'Sospecha de vulneración de derechos',    urgencia: 'alta' },
    { destino: 'apoyo',       motivo: 'Sintomatología ansiosa recurrente',      urgencia: 'media' },
    { destino: 'apoyo',       motivo: 'Duelo por pérdida familiar',             urgencia: 'alta' },
    { destino: 'convivencia', motivo: 'Bullying entre pares',                    urgencia: 'alta' },
    { destino: 'convivencia', motivo: 'Conflicto reiterado con compañeros',      urgencia: 'media' },
    { destino: 'pie',         motivo: 'Sospecha de TEA',                        urgencia: 'media' },
    { destino: 'pie',         motivo: 'Dificultades específicas de aprendizaje', urgencia: 'media' }
  ];
  const ESTADOS = ['abierta','abierta','abierta','abierta','abierta',
                   'en_proceso','en_proceso','en_proceso','en_proceso','en_proceso',
                   'en_proceso','en_proceso','en_proceso','en_proceso','en_proceso',
                   'cerrada','cerrada','cerrada','cerrada','cerrada',
                   'cerrada','cerrada','cerrada','cerrada','cerrada'];

  let batch = db.batch(); let n = 0;
  for (let i = 0; i < 25; i++) {
    const curso = pick(cursos);
    const estudiantes = curso.estudiantes || [];
    if (!estudiantes.length) continue;
    const alumno = pick(estudiantes);
    const d = pick(DERIVS);
    const profe = pick(profes.listaCompleta.filter(p => p.rol === 'profesor'));
    const estado = ESTADOS[i];
    const fechaCreacion = fechaHace(rand(15, 55));
    const historial = [
      { fecha: fechaCreacion, actor: profe.nombre, actorUid: profe.uid, rol: 'profesor', accion: 'creación', nota: `Derivo por: ${d.motivo}` }
    ];
    if (estado !== 'abierta') {
      historial.push({ fecha: fechaHace(rand(5, 15)), actor: `Equipo ${d.destino}`, rol: d.destino, accion: 'tomada', nota: 'Se agenda primera entrevista.' });
    }
    if (estado === 'cerrada') {
      historial.push({ fecha: fechaHace(rand(1, 4)), actor: `Equipo ${d.destino}`, rol: d.destino, accion: 'cierre', nota: 'Caso resuelto satisfactoriamente.' });
    }
    batch.set(db.collection('derivaciones').doc(), {
      cursoId: curso.id, cursoNombre: curso.nombreCompleto,
      alumnoUid: alumno.uid, alumnoNombre: alumno.nombre, alumnoRut: alumno.rut,
      derivadoPorUid: profe.uid, derivadoPorNombre: profe.nombre,
      profesorUid: profe.uid,
      destino: d.destino, motivo: d.motivo, descripcion: d.motivo,
      urgencia: d.urgencia, estado, historial,
      liceoSlug: LICEO_SLUG,
      fechaCreacion,
      fechaCierre: estado === 'cerrada' ? historial[historial.length-1].fecha : null,
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    });
    n++;
  }
  await batch.commit();
  console.log(`   ✓ ${n} derivaciones creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 9: FICHAS PIE (28)
// ═══════════════════════════════════════════════════════════════
async function crearFichasPIE(cursos, profes) {
  console.log('▶ [9/15] Creando 28 fichas PIE…');
  const NEE_TIPO = {
    tdah: 'transitoria', tel: 'transitoria', dislexia: 'transitoria', discalculia: 'transitoria',
    dea_lectura: 'transitoria', dea_matematica: 'transitoria',
    tea: 'permanente', discapacidad_intelectual: 'permanente', discapacidad_motora: 'permanente'
  };
  const TRANS = [
    { d: 'tdah',           peso: 5, resumen: 'TDAH combinado con apoyo farmacológico externo.' },
    { d: 'dea_lectura',    peso: 4, resumen: 'Dificultad específica de aprendizaje en lectura.' },
    { d: 'dea_matematica', peso: 3, resumen: 'DEA en matemática con material manipulable.' },
    { d: 'dislexia',       peso: 3, resumen: 'Dislexia confirmada por evaluación externa.' },
    { d: 'discalculia',    peso: 2, resumen: 'Discalculia con adecuaciones de evaluación.' },
    { d: 'tel',            peso: 2, resumen: 'TEL con coordinación fonoaudiológica externa.' }
  ];
  const PERM = [
    { d: 'tea',                      peso: 3, resumen: 'TEA nivel 1, requiere anticipación de rutinas.' },
    { d: 'discapacidad_intelectual', peso: 2, resumen: 'DI leve con adecuación curricular significativa.' },
    { d: 'discapacidad_motora',      peso: 1, resumen: 'Discapacidad motora con adecuaciones de acceso.' }
  ];
  const ADEC = [
    { tipo: 'evaluacion',   texto: 'Reducir a 60% las preguntas, tiempo extra 50%.' },
    { tipo: 'metodologia',  texto: 'Material concreto y visual. Instrucciones simplificadas.' },
    { tipo: 'acceso',       texto: 'Ubicación al frente del aula, sin distractores.' },
    { tipo: 'temporalizacion', texto: 'Extender tiempo para tareas escritas.' }
  ];

  const educadoras = profes.listaCompleta.filter(p => p.rol === 'pie_edu');
  const ESTADOS_POOL = [...Array(20).fill('activo'), ...Array(5).fill('egresado'), ...Array(3).fill('suspendido')].sort(() => Math.random() - 0.5);

  const poolTrans = []; TRANS.forEach(t => { for (let i=0;i<t.peso;i++) poolTrans.push(t); });
  const poolPerm  = []; PERM.forEach(t => { for (let i=0;i<t.peso;i++) poolPerm.push(t); });

  const usados = new Set();
  let batch = db.batch(); let n = 0;
  for (let i = 0; i < 28; i++) {
    let curso, alumno, ordinal;
    for (let intento = 0; intento < 20; intento++) {
      curso = pick(cursos);
      const ests = curso.estudiantes || [];
      if (!ests.length) continue;
      ordinal = rand(1, ests.length);
      const clave = curso.id + ':' + ordinal;
      if (usados.has(clave)) continue;
      usados.add(clave);
      alumno = ests[ordinal - 1];
      break;
    }
    if (!alumno) continue;

    const esTrans = Math.random() < 0.65;
    const dg = esTrans ? pick(poolTrans) : pick(poolPerm);
    const tipoNEE = NEE_TIPO[dg.d];
    const educadora = educadoras[i % educadoras.length];
    const estado = ESTADOS_POOL[i];
    const adecuaciones = pickN(ADEC, rand(2, 4)).map(a => ({ ...a, fecha: fechaHace(rand(30,180)), responsable: educadora.nombre }));

    const estUid = `${LICEO_SLUG}-${curso.id}-est${ordinal}`;
    batch.set(db.collection('pie_estudiantes').doc(estUid), {
      estUid, liceoSlug: LICEO_SLUG,
      cursoId: curso.id, cursoNombre: curso.nombreCompleto,
      estudianteOrdinal: ordinal, estudianteUid: alumno.uid,
      estudianteNombre: alumno.nombre, estudianteRut: alumno.rut,
      diagnostico: dg.d, diagnosticoDetalle: dg.resumen.slice(0, 100),
      decreto: tipoNEE === 'permanente' ? '170_permanente' : '170_transitoria',
      tipoNEE, adecuaciones,
      educadoraUid: educadora.uid, educadoraNombre: educadora.nombre,
      profesionalesExternos: [],
      fechaIngresoPIE: fechaHace(rand(60, 400)),
      fechaEgresoPIE: estado === 'egresado' ? fechaHace(rand(1, 60)) : '',
      estadoPIE: estado,
      confidencial: tipoNEE === 'permanente' && Math.random() < 0.3,
      resumenCaso: dg.resumen,
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    }, { merge: true });
    n++;
  }
  await batch.commit();
  console.log(`   ✓ ${n} fichas PIE creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 10: INTERVENCIONES APOYO
// ═══════════════════════════════════════════════════════════════
async function crearIntervencionesApoyo(cursos, profes) {
  console.log('▶ [10/15] Creando 38 intervenciones apoyo psicosocial…');
  const equipo = profes.listaCompleta.filter(p => p.rol === 'aps_enc' || p.rol === 'aps_prof');
  const MOTIVOS = ['emocional','emocional','emocional','familiar','familiar','academico','academico','conductual','conductual','salud','convivencia','sospecha_vulneracion','otro'];
  const ESTADOS = [...Array(15).fill('abierto'), ...Array(10).fill('seguimiento'), ...Array(8).fill('cerrado'), ...Array(5).fill('derivado')].sort(() => Math.random()-0.5);

  let batch = db.batch(); let n = 0;
  for (let i = 0; i < 38; i++) {
    const curso = pick(cursos);
    const ests = curso.estudiantes || [];
    if (!ests.length) continue;
    const idx = rand(0, ests.length - 1);
    const alumno = ests[idx];
    const prof = equipo[i % equipo.length];
    const motivo = pick(MOTIVOS);
    const estado = ESTADOS[i];
    const dias = estado === 'abierto' ? rand(1,10) : estado === 'seguimiento' ? rand(10,30) : rand(20,60);
    const intId = `int-${SEED_TAG}-${i}-${Date.now()}`;
    batch.set(db.collection('intervenciones_apoyo').doc(intId), {
      intId, liceoSlug: LICEO_SLUG,
      cursoId: curso.id, cursoNombre: curso.nombreCompleto,
      estudianteOrdinal: idx + 1, estudianteUid: alumno.uid,
      estudianteNombre: alumno.nombre, estudianteRut: alumno.rut,
      profesionalUid: prof.uid, profesionalNombre: prof.nombre, profesionalEmail: prof.email,
      profesionalRol: prof.email.includes('ts') ? 'trabajador_social' : 'psicologo',
      tipo: pick(['individual','individual','familiar','grupal']),
      motivo, motivoDetalle: `Caso de ${motivo}. Requiere acompañamiento.`,
      resumen: `Caso de ${motivo}. Se abre proceso de acompañamiento.`,
      compromisos: 'Sesiones semanales con evaluación mensual.',
      seguimientoRequerido: estado !== 'cerrado',
      estado, derivadoA: estado === 'derivado' ? pick(['pie','convivencia','externo']) : '',
      confidencial: motivo === 'sospecha_vulneracion',
      fecha: fechaHace(dias),
      creadoEn: isoHace(dias),
      actualizadoEn: isoHace(rand(0, dias)),
      seedTag: SEED_TAG
    });
    n++;
  }
  await batch.commit();
  console.log(`   ✓ ${n} intervenciones apoyo creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 11: ENTREVISTAS CONVIVENCIA
// ═══════════════════════════════════════════════════════════════
async function crearEntrevistasConvivencia(cursos, profes) {
  console.log('▶ [11/15] Creando 40 entrevistas convivencia…');
  const equipo = profes.listaCompleta.filter(p => p.rol === 'amb_enc' || p.rol === 'amb_prof');
  const MOTIVOS = [
    { m: 'indisciplina_aula', g: ['leve','leve','grave'] },
    { m: 'agresion_verbal', g: ['leve','grave'] },
    { m: 'uniforme_presentacion', g: ['leve'] },
    { m: 'inasistencia_reiterada', g: ['leve','grave'] },
    { m: 'bullying', g: ['grave','gravisima'] },
    { m: 'ciberbullying', g: ['grave','gravisima'] },
    { m: 'dano_material', g: ['leve','grave'] },
    { m: 'discriminacion', g: ['grave','gravisima'] },
    { m: 'porte_sustancias', g: ['gravisima'] }
  ];
  const MEDIDAS = { leve: ['conversacion','compromiso_escrito'], grave: ['suspension','derivacion'], gravisima: ['suspension','condicionalidad','derivacion'] };
  const ESTADOS = [...Array(12).fill('abierto'), ...Array(10).fill('seguimiento'), ...Array(12).fill('cerrado'), ...Array(6).fill('derivado')].sort(() => Math.random()-0.5);

  let batch = db.batch(); let n = 0;
  for (let i = 0; i < 40; i++) {
    const curso = pick(cursos);
    const ests = curso.estudiantes || [];
    if (!ests.length) continue;
    const idx = rand(0, ests.length - 1);
    const alumno = ests[idx];
    const m = pick(MOTIVOS);
    const gravedad = pick(m.g);
    const medida = pick(MEDIDAS[gravedad]);
    const estado = ESTADOS[i];
    const prof = equipo[i % equipo.length];
    const dias = estado === 'abierto' ? rand(1,12) : estado === 'seguimiento' ? rand(10,35) : rand(20,90);
    const entId = `ent-${SEED_TAG}-${i}-${Date.now()}`;
    batch.set(db.collection('entrevistas_convivencia').doc(entId), {
      entId, liceoSlug: LICEO_SLUG,
      tipo: pick(['apoderado','estudiante','apoderado','grupo']),
      cursoId: curso.id, cursoNombre: curso.nombreCompleto,
      estudianteOrdinal: idx + 1, estudianteUid: alumno.uid,
      estudianteNombre: alumno.nombre, estudianteRut: alumno.rut,
      participantes: [prof.nombre, alumno.nombre],
      profesionalUid: prof.uid, profesionalNombre: prof.nombre, profesionalEmail: prof.email,
      profesionalRol: 'convivencia',
      motivo: m.m, motivoDetalle: `Situación de ${m.m}.`,
      resumen: `Entrevista por ${m.m}. Se conversa y coordinan acciones.`,
      acuerdos: 'Compromiso de conducta con seguimiento mensual.',
      seguimientoRequerido: estado === 'abierto' || estado === 'seguimiento',
      estado, gravedad, medida,
      confidencial: gravedad === 'gravisima',
      fecha: fechaHace(dias),
      creadoEn: isoHace(dias),
      actualizadoEn: isoHace(rand(0, dias)),
      seedTag: SEED_TAG
    });
    n++;
  }
  await batch.commit();
  console.log(`   ✓ ${n} entrevistas convivencia creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 12: NOTAS (450 sets)
// ═══════════════════════════════════════════════════════════════
async function crearNotas(cursos) {
  console.log('▶ [12/15] Creando notas (~450 sets)…');
  const EVAL = ['Diagnóstica inicial','Control 1','Trabajo unidad 1','Prueba unidad 1','Control 2','Prueba semestral'];
  let total = 0;
  for (const c of cursos) {
    const ests = c.estudiantes || [];
    if (!ests.length) continue;
    const asigs = c.asignaturasAsignadas || [];
    if (!asigs.length) continue;
    const enRiesgo = pickN(ests, 3).map(e => e.uid);
    const destacados = pickN(ests.filter(e => !enRiesgo.includes(e.uid)), 2).map(e => e.uid);

    let batch = db.batch(); let opsB = 0;
    for (const asig of asigs) {
      for (let ev = 0; ev < EVAL.length; ev++) {
        const evalId = `${c.id}_${asig.asignatura}_ev${ev+1}`.replace(/[.\-\s]/g, '_');
        const notas = ests.map(est => {
          let base = 5.5;
          if (enRiesgo.includes(est.uid)) base = 3.6;
          if (destacados.includes(est.uid)) base = 6.4;
          return { uid: est.uid, ordinal: est.ordinal, nombre: est.nombre, nota: notaAleatoria(base, 0.6) };
        });
        batch.set(db.collection('notas').doc(evalId), {
          cursoId: c.id, cursoNombre: c.nombreCompleto,
          asignatura: asig.asignatura, docenteUid: asig.docenteUid, docenteNombre: asig.docenteNombre,
          liceoSlug: LICEO_SLUG,
          nombre: EVAL[ev], fecha: fechaHace(60 - ev*10), ponderacion: 20,
          semestre: 1,
          notas,
          promedio: Math.round((notas.reduce((a,n)=>a+n.nota,0)/notas.length)*10)/10,
          creadoEn: admin.firestore.FieldValue.serverTimestamp(),
          seedTag: SEED_TAG
        }, { merge: true });
        opsB++; total++;
        if (opsB >= 400) { await batch.commit(); batch = db.batch(); opsB = 0; }
      }
    }
    if (opsB > 0) await batch.commit();
  }
  console.log(`   ✓ ${total} sets de notas creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 13: ASISTENCIA (60 días laborables por curso)
// ═══════════════════════════════════════════════════════════════
async function crearAsistencia(cursos, profes) {
  console.log('▶ [13/15] Creando asistencia (60 días laborables por curso)…');
  const DIAS = 60;
  let total = 0;
  for (const c of cursos) {
    const ests = c.estudiantes || [];
    if (!ests.length) continue;
    const casosCrit = pickN(ests, rand(2,3)).map(e => e.uid);
    const profeUid = c.jefeUid;

    let batch = db.batch(); let opsB = 0;
    for (let i = 0; i < DIAS; i++) {
      const fecha = fechaHace(i);
      if (esFinDeSemana(fecha)) continue;
      const registros = ests.map(est => {
        const esCritico = casosCrit.includes(est.uid);
        const probP = esCritico ? 0.65 : 0.90;
        const r = Math.random();
        let estado;
        if (r < probP) estado = 'presente';
        else if (r < probP + 0.08) estado = 'atrasado';
        else if (r < probP + 0.14) estado = 'justificado';
        else estado = 'ausente';
        return { uid: est.uid, ordinal: est.ordinal, nombre: est.nombre, estado, justificacion: estado === 'justificado' ? 'Certificado médico' : '' };
      });
      const asistId = `${c.id}_${fecha}`.replace(/[.\-\s]/g, '_');
      batch.set(db.collection('asistencia').doc(asistId), {
        cursoId: c.id, cursoNombre: c.nombreCompleto,
        liceoSlug: LICEO_SLUG, fecha, profesorUid: profeUid,
        registros,
        totalPresente: registros.filter(r => r.estado === 'presente').length,
        totalAtrasado: registros.filter(r => r.estado === 'atrasado').length,
        totalAusente: registros.filter(r => r.estado === 'ausente').length,
        totalJustificado: registros.filter(r => r.estado === 'justificado').length,
        creadoEn: admin.firestore.FieldValue.serverTimestamp(),
        seedTag: SEED_TAG
      }, { merge: true });
      opsB++; total++;
      if (opsB >= 400) { await batch.commit(); batch = db.batch(); opsB = 0; }
    }
    if (opsB > 0) await batch.commit();
  }
  console.log(`   ✓ ${total} registros de asistencia (día × curso)`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 14: LIBRO DE CLASES (15)
// ═══════════════════════════════════════════════════════════════
async function crearLibroClases(cursos, profes) {
  console.log('▶ [14/15] Creando 15 clases del libro…');
  const ACT = [
    'Introducción al tema con lluvia de ideas',
    'Desarrollo de guía de ejercicios en parejas',
    'Presentación de trabajos grupales',
    'Corrección colectiva de evaluación',
    'Aplicación práctica con material concreto',
    'Video-clase con guía de análisis'
  ];
  let batch = db.batch(); let n = 0;
  for (let i = 0; i < 15; i++) {
    const curso = pick(cursos);
    const profe = pick(profes.listaCompleta.filter(p => p.rol === 'profesor'));
    const fecha = fechaHace(rand(1, 60));
    batch.set(db.collection('libro_clases').doc(), {
      cursoId: curso.id, cursoNombre: curso.nombreCompleto,
      profesorUid: profe.uid, profesorNombre: profe.nombre, docenteUid: profe.uid,
      asignatura: pick(profe.asignaturas || ['Lenguaje']),
      liceoSlug: LICEO_SLUG,
      fecha, hora: `${rand(8,15)}:00`,
      oaTrabajado: `OA ${rand(1, 15)}`,
      objetivo: 'Comprender y aplicar los conceptos de la unidad actual',
      actividades: pickN(ACT, 3).join(' | '),
      observaciones: pick([
        'Clase desarrollada según planificación.',
        'Se aplicó adecuación para alumnos PIE.',
        'Buen desempeño general del curso.'
      ]),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    });
    n++;
  }
  await batch.commit();
  console.log(`   ✓ ${n} clases del libro creadas`);
}

// ═══════════════════════════════════════════════════════════════
// FASE 15: EVENTOS + COMUNICADOS
// ═══════════════════════════════════════════════════════════════
async function crearEventosYComunicados(profes) {
  console.log('▶ [15/15] Creando eventos + comunicados…');
  const EVENTOS = [
    { titulo: 'Reunión de apoderados 3° medio', dias: 5, tipo: 'reunion' },
    { titulo: 'Cierre semestre I', dias: -15, tipo: 'academico' },
    { titulo: 'Salida pedagógica 8° básico', dias: 10, tipo: 'salida' },
    { titulo: 'Acto cívico Fiestas Patrias', dias: 40, tipo: 'ceremonia' },
    { titulo: 'Consejo de profesores', dias: 3, tipo: 'reunion' },
    { titulo: 'Entrega de informes', dias: -5, tipo: 'academico' },
    { titulo: 'Feria de las ciencias', dias: 20, tipo: 'evento' },
    { titulo: 'Reunión equipo PIE', dias: 7, tipo: 'reunion' },
    { titulo: 'Capacitación docente', dias: 14, tipo: 'formacion' },
    { titulo: 'Aniversario del colegio', dias: 60, tipo: 'ceremonia' }
  ];
  let batch = db.batch();
  for (const e of EVENTOS) {
    batch.set(db.collection('eventos_calendario').doc(), {
      titulo: e.titulo, tipo: e.tipo,
      fecha: fechaHace(-e.dias),
      liceoSlug: LICEO_SLUG,
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    });
  }
  const COMS = [
    { titulo: 'Bienvenida año escolar 2026', cuerpo: 'Comenzamos un nuevo año escolar. ¡Éxito a todos!' },
    { titulo: 'Cambio en horario de recreos', cuerpo: 'A partir del próximo lunes, ajuste en horarios.' },
    { titulo: 'Protocolo COVID actualizado', cuerpo: 'Nuevas medidas sanitarias en vigor desde esta semana.' },
    { titulo: 'Convocatoria elección centro de estudiantes', cuerpo: 'Postulaciones abiertas hasta el 30 del mes.' },
    { titulo: 'Cierre semestral: fechas clave', cuerpo: 'Consulta el calendario de evaluaciones finales.' }
  ];
  for (const c of COMS) {
    batch.set(db.collection('comunicados').doc(), {
      titulo: c.titulo, cuerpo: c.cuerpo,
      liceoSlug: LICEO_SLUG,
      fecha: fechaHace(rand(1, 30)),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      seedTag: SEED_TAG
    });
  }
  await batch.commit();
  console.log(`   ✓ ${EVENTOS.length} eventos + ${COMS.length} comunicados creados`);
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  const t0 = Date.now();
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║   SEED MASTER — Colegio Demo (@demo.cl)              ║');
  console.log('║   Puebla TODOS los paneles en un solo pase            ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  await limpiarPrevio();
  await crearLiceo();
  const profes = await crearFuncionarios();
  const base = await crearCursosYEstudiantes(profes);
  await crearMateriales(profes);
  await crearPlanificaciones(profes);
  await crearAnotaciones(base.cursos, profes);
  await crearAlertas(base.cursos, profes);
  await crearDerivaciones(base.cursos, profes);
  await crearFichasPIE(base.cursos, profes);
  await crearIntervencionesApoyo(base.cursos, profes);
  await crearEntrevistasConvivencia(base.cursos, profes);
  await crearNotas(base.cursos);
  await crearAsistencia(base.cursos, profes);
  await crearLibroClases(base.cursos, profes);
  await crearEventosYComunicados(profes);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log(`║   ✅ SEED COMPLETO en ${elapsed}s                        `);
  console.log('╚═══════════════════════════════════════════════════════╝');
  console.log('');
  console.log('🎓 Colegio: ' + LICEO_NOMBRE + ' (slug: ' + LICEO_SLUG + ')');
  console.log('🔑 Password para TODOS: ' + PASSWORD);
  console.log('');
  console.log('CREDENCIALES CLAVE (password: ' + PASSWORD + ')');
  console.log('  DIRECTIVOS');
  console.log('    • Rectora:               rector@' + DOMINIO_MAIL);
  console.log('    • Director de Ciclo:     director@' + DOMINIO_MAIL);
  console.log('    • Administradora:        admin@' + DOMINIO_MAIL);
  console.log('  UTP');
  console.log('    • Jefa UTP Media:        utp1@' + DOMINIO_MAIL);
  console.log('    • Jefe UTP Básica:       utp2@' + DOMINIO_MAIL);
  console.log('  PIE');
  console.log('    • Coordinadora PIE:      pie.coord@' + DOMINIO_MAIL);
  console.log('    • Educadora Diferencial: pie.edu1@' + DOMINIO_MAIL);
  console.log('  APOYO PSICOSOCIAL');
  console.log('    • Encargada (Psi):       apoyo.enc@' + DOMINIO_MAIL);
  console.log('    • Psicólogo:             psicologo@' + DOMINIO_MAIL);
  console.log('    • Trabajadora Social:    trabajador.social@' + DOMINIO_MAIL);
  console.log('    • Psicopedagoga:         psicopedagoga@' + DOMINIO_MAIL);
  console.log('  CONVIVENCIA');
  console.log('    • Encargado:             conviv.enc@' + DOMINIO_MAIL);
  console.log('    • Mediadora:             conviv1@' + DOMINIO_MAIL);
  console.log('    • Inspector:             conviv2@' + DOMINIO_MAIL);
  console.log('  DOCENTES');
  console.log('    • Prof. Lenguaje:        camila.reyes@' + DOMINIO_MAIL);
  console.log('    • Prof. Matemática:      ignacio.martinez@' + DOMINIO_MAIL);
  console.log('    • Prof. Historia:        pablo.contreras@' + DOMINIO_MAIL);
  console.log('    • Prof. TP Electricidad: cristobal.vargas@' + DOMINIO_MAIL);
  console.log('    • Prof. TP Electrónica:  andres.reyes@' + DOMINIO_MAIL);
  console.log('    • Prof. TP Mec.Auto:     diego.munoz@' + DOMINIO_MAIL);
  console.log('');
  console.log('LISTO PARA GRABAR. ¡Éxito con los videos!');
  console.log('');
  process.exit(0);
}

main().catch(e => { console.error('❌ ERROR FATAL:', e); process.exit(1); });
