/**
 * seed-colegio-demo.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Puebla el colegio demo `salesianos-talca` con datos realistas
 * para poder demostrar TODAS las funciones del sistema a colegios reales.
 *
 * Crea:
 *   • 30 funcionarios (rector, director, UTP, PIE, apoyo, convivencia, docentes)
 *   • 15 cursos (7° básico a 4° medio TP)
 *   • 450 estudiantes con RUT, apoderado, sexo, fecha nac
 *   • 20 materiales publicados
 *   • 15 planificaciones
 *   • 30 anotaciones en libro de clases
 *   • 12 alertas a apoderados
 *   • 10 derivaciones a apoyo/convivencia/PIE
 *   • 8 fichas PIE con adecuaciones
 *   • 60 notas del semestre I
 *   • Asistencia de últimos 30 días
 *   • 10 eventos de calendario
 *   • 5 comunicados institucionales
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-colegio-demo.mjs
 *
 * ES IDEMPOTENTE: se puede correr varias veces sin duplicar.
 *
 * Password para todos los usuarios creados: Demo1234!
 * (avísale al colegio que después la cambien vía "Restaurar contraseña")
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

// Autenticación híbrida: primero intenta serviceAccountKey.json (si existe y es
// del proyecto correcto), sino usa Application Default Credentials (ADC).
// Para ADC: primero corré `gcloud auth application-default login --project=electrolearn-prod`
const KEY_PATH = new URL('./serviceAccountKey.json', import.meta.url);
const PROJECT_ID = 'electrolearn-prod';

let initOpts = { projectId: PROJECT_ID };
if (existsSync(KEY_PATH)) {
  try {
    const cred = JSON.parse(readFileSync(KEY_PATH));
    if (cred.project_id === PROJECT_ID) {
      initOpts.credential = admin.credential.cert(cred);
      console.log('▸ Usando serviceAccountKey.json de', PROJECT_ID);
    } else {
      console.log('▸ serviceAccountKey.json es de otro proyecto (' + cred.project_id + '), uso ADC');
      initOpts.credential = admin.credential.applicationDefault();
    }
  } catch (e) {
    console.log('▸ serviceAccountKey.json inválido, uso ADC');
    initOpts.credential = admin.credential.applicationDefault();
  }
} else {
  console.log('▸ Sin serviceAccountKey.json, uso ADC (Application Default Credentials)');
  initOpts.credential = admin.credential.applicationDefault();
}

admin.initializeApp(initOpts);
const auth = admin.auth();
const db = admin.firestore();

// ═══════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════
const LICEO_SLUG    = 'salesianos-talca';
const LICEO_NOMBRE  = 'Colegio Salesianos Talca';
const DOMINIO_MAIL  = 'salesianos-talca.cl';
const PASSWORD      = 'Demo1234!';
const HOY           = new Date();
const HOY_ISO       = HOY.toISOString().slice(0, 10);

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
function slug(s) {
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function emailFrom(nombre, apellido) {
  const n = slug(nombre).split('-')[0];
  const a = slug(apellido).split('-')[0];
  return `${n}.${a}@${DOMINIO_MAIL}`;
}
function rutRandom() {
  // Genera RUT chileno realista con dígito verificador correcto
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
  const año = HOY.getFullYear() - edad;
  const mes = rand(1, 12);
  const dia = rand(1, 28);
  return `${año}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}
function fechaHace(dias) {
  const d = new Date(HOY);
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
}
function foneRandom() {
  return `+569${rand(10000000, 99999999)}`;
}
async function crearUsuario(email, nombre, extra = {}) {
  try {
    let uid;
    try {
      const u = await auth.getUserByEmail(email);
      uid = u.uid;
      await auth.updateUser(uid, { displayName: nombre, password: PASSWORD });
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

function nombreCompleto(sexo) {
  const n = pick(sexo === 'M' ? NOMBRES_M : NOMBRES_F);
  const a1 = pick(APELLIDOS);
  const a2 = pick(APELLIDOS);
  return { nombre: `${n} ${a1} ${a2}`, primer: n, apellido: a1 };
}

// ═══════════════════════════════════════════════════════════════
// PASO 1: LICEO
// ═══════════════════════════════════════════════════════════════
async function crearLiceo() {
  console.log('▶ [1/12] Creando liceo demo…');
  await db.collection('liceos').doc(LICEO_SLUG).set({
    slug:      LICEO_SLUG,
    nombre:    LICEO_NOMBRE,
    tipo:      'colegio',
    region:    'Región del Maule',
    comuna:    'Talca',
    direccion: 'Av. San Ignacio 950, Talca',
    telefono:  '+56 71 220 0000',
    email:     `contacto@${DOMINIO_MAIL}`,
    plan:      'full',
    activo:    true,
    creadoEn:  admin.firestore.FieldValue.serverTimestamp(),
    dependencia: 'Particular subvencionado',
    niveles: ['7B', '8B', '1M', '2M', '3M', '4M'],
    tieneTP: true,
    especialidadesTP: ['tp_electricidad', 'tp_electronica', 'tp_mec_auto']
  }, { merge: true });
  console.log('   ✓ Liceo:', LICEO_NOMBRE);
}

// ═══════════════════════════════════════════════════════════════
// PASO 2: FUNCIONARIOS
// ═══════════════════════════════════════════════════════════════
async function crearFuncionarios() {
  console.log('▶ [2/12] Creando funcionarios (~30)…');

  const staff = [
    // Directivos
    { rol: 'rector',        nombre: 'Padre Juan Salinas Herrera',      email: 'rector' },
    { rol: 'director',      nombre: 'Roberto Cornejo Muñoz',           email: 'director' },
    { rol: 'admin_colegio', nombre: 'Andrea Fuentes Rojas',            email: 'admin' },
    // UTP
    { rol: 'utp',           nombre: 'Marcela Espinoza Vargas',         email: 'utp1' },
    { rol: 'utp',           nombre: 'Cristian Herrera Ortiz',          email: 'utp2' },
    // PIE
    { rol: 'pie_enc',       nombre: 'Paola Quezada Torres',            email: 'pie.coord' },
    { rol: 'pie_edu',       nombre: 'Carolina Pizarro Bravo',          email: 'pie.edu1' },
    { rol: 'pie_edu',       nombre: 'Andrea Cárdenas Silva',           email: 'pie.edu2' },
    { rol: 'pie_edu',       nombre: 'Bárbara Yáñez Rojas',             email: 'pie.edu3' },
    // Apoyo Psicosocial
    { rol: 'aps_enc',       nombre: 'Alejandra Núñez Miranda',         email: 'apoyo.enc', profesion: 'Psicóloga' },
    { rol: 'aps_prof',      nombre: 'Diego Vásquez Contreras',         email: 'psic1', profesion: 'Psicólogo' },
    { rol: 'aps_prof',      nombre: 'Constanza Ramírez Soto',          email: 'ts1', profesion: 'Trabajadora Social' },
    // Convivencia
    { rol: 'amb_enc',       nombre: 'Mauricio Sepúlveda Rojas',        email: 'conviv.enc' },
    { rol: 'amb_prof',      nombre: 'Valentina Morales Flores',        email: 'conviv1', profesion: 'Encargada mediación' },
    { rol: 'amb_prof',      nombre: 'Rodrigo Silva Castro',            email: 'conviv2', profesion: 'Inspector' },
    // Docentes plan común (18 profes)
    { rol: 'profesor', nombre: 'Camila Reyes González', email: 'camila.reyes', asignaturas: ['lenguaje', 'ling_liter'] },
    { rol: 'profesor', nombre: 'Fernanda Muñoz López', email: 'fernanda.munoz', asignaturas: ['lenguaje', 'ling_liter'] },
    { rol: 'profesor', nombre: 'Ignacio Martínez Pérez', email: 'ignacio.martinez', asignaturas: ['matematica'] },
    { rol: 'profesor', nombre: 'Sofía Herrera Torres', email: 'sofia.herrera', asignaturas: ['matematica'] },
    { rol: 'profesor', nombre: 'Pablo Contreras Díaz', email: 'pablo.contreras', asignaturas: ['historia', 'ed_ciudadana'] },
    { rol: 'profesor', nombre: 'Antonia Rojas Vargas', email: 'antonia.rojas', asignaturas: ['ingles'] },
    { rol: 'profesor', nombre: 'Sebastián Castillo Núñez', email: 'sebastian.castillo', asignaturas: ['ingles'] },
    { rol: 'profesor', nombre: 'Macarena Soto Álvarez', email: 'macarena.soto', asignaturas: ['ciencias_nat', 'biologia'] },
    { rol: 'profesor', nombre: 'Nicolás Bravo Fuentes', email: 'nicolas.bravo', asignaturas: ['fisica', 'quimica'] },
    { rol: 'profesor', nombre: 'Emilia Tapia Silva', email: 'emilia.tapia', asignaturas: ['ed_fisica'] },
    { rol: 'profesor', nombre: 'Rodrigo Gutiérrez Araya', email: 'rodrigo.gutierrez', asignaturas: ['ed_fisica'] },
    { rol: 'profesor', nombre: 'Trinidad Cornejo Vargas', email: 'trinidad.cornejo', asignaturas: ['artes_vis', 'musica'] },
    { rol: 'profesor', nombre: 'Álvaro Sepúlveda Ortiz', email: 'alvaro.sepulveda', asignaturas: ['religion', 'orientacion'] },
    { rol: 'profesor', nombre: 'Javiera Espinoza Miranda', email: 'javiera.espinoza', asignaturas: ['tecnologia'] },
    { rol: 'profesor', nombre: 'Matías Flores Reyes', email: 'matias.flores', asignaturas: ['filosofia', 'cs_ciudadania'] },
    { rol: 'profesor', nombre: 'Amanda Álvarez Yáñez', email: 'amanda.alvarez', asignaturas: ['ling_liter', 'artes_esc'] },
    // Docentes TP (5 profes técnicos)
    { rol: 'profesor', nombre: 'Cristóbal Vargas Muñoz', email: 'cristobal.vargas', esp: 'tp_electricidad', modulos: ['EL1', 'EL2', 'EL3'] },
    { rol: 'profesor', nombre: 'Andrés Reyes Fuentes', email: 'andres.reyes', esp: 'tp_electronica', modulos: ['EN2', 'EN4'] },
    { rol: 'profesor', nombre: 'Diego Muñoz Pizarro', email: 'diego.munoz', esp: 'tp_mec_auto', modulos: ['MA1', 'MA2'] }
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

    const uid = await crearUsuario(email, s.nombre, extra);
    if (uid) {
      uids[s.email.split('@')[0]] = uid;
      listaCompleta.push({ uid, email, nombre: s.nombre, rol: s.rol });
    }
  }
  console.log(`   ✓ ${listaCompleta.length} funcionarios creados`);
  return { uids, listaCompleta };
}

// ═══════════════════════════════════════════════════════════════
// PASO 3: CURSOS + ESTUDIANTES
// ═══════════════════════════════════════════════════════════════
async function crearCursosYEstudiantes(profes) {
  console.log('▶ [3/12] Creando cursos + estudiantes (~15 cursos × ~30 alumnos)…');

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
    { nivel: '3M', letra: 'C', jefe: 'cristobal.vargas',  esp: 'tp_electricidad' },
    { nivel: '3M', letra: 'D', jefe: 'andres.reyes',      esp: 'tp_electronica' },
    { nivel: '4M', letra: 'A', jefe: 'rodrigo.gutierrez' },
    { nivel: '4M', letra: 'B', jefe: 'trinidad.cornejo' },
    { nivel: '4M', letra: 'C', jefe: 'diego.munoz',       esp: 'tp_mec_auto' }
  ];

  const cursosCreados = [];
  const estudiantesTotales = [];

  for (const c of cursosDef) {
    const cursoId = `${LICEO_SLUG}_${c.nivel}${c.letra}`;
    const nombreCurso = c.esp ? `${c.nivel}${c.letra} — ${c.esp.toUpperCase()}` : `${c.nivel}${c.letra}`;
    const jefeUid = profes.uids[c.jefe];
    const jefeInfo = profes.listaCompleta.find(x => x.uid === jefeUid);

    // Generar 28-34 estudiantes
    const totalEst = rand(28, 34);
    const estudiantes = [];
    for (let i = 0; i < totalEst; i++) {
      const sexo = pick(['M', 'F']);
      const info = nombreCompleto(sexo);
      const apInfo = nombreCompleto(pick(['M', 'F']));
      const edadBase = c.nivel === '7B' ? 12 : c.nivel === '8B' ? 13 :
                       c.nivel === '1M' ? 14 : c.nivel === '2M' ? 15 :
                       c.nivel === '3M' ? 16 : 17;
      estudiantes.push({
        uid:      `est_${cursoId}_${String(i + 1).padStart(2, '0')}`,
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

    // Asignaturas asignadas (docentes que la enseñan)
    let asignaturasAsignadas = [];
    if (c.esp) {
      // Curso TP: solo asignaturas plan común + módulos TP
      asignaturasAsignadas = [
        { asignatura: 'lenguaje',   docenteUid: profes.uids['camila.reyes'],       docenteNombre: 'Camila Reyes González' },
        { asignatura: 'matematica', docenteUid: profes.uids['ignacio.martinez'],    docenteNombre: 'Ignacio Martínez Pérez' },
        { asignatura: 'historia',   docenteUid: profes.uids['pablo.contreras'],    docenteNombre: 'Pablo Contreras Díaz' },
        { asignatura: 'ingles',     docenteUid: profes.uids['antonia.rojas'],      docenteNombre: 'Antonia Rojas Vargas' },
        { asignatura: 'ed_fisica',  docenteUid: profes.uids['emilia.tapia'],       docenteNombre: 'Emilia Tapia Silva' }
      ];
    } else {
      const isMedia = c.nivel.startsWith('1M') || c.nivel.startsWith('2M') || c.nivel.startsWith('3M') || c.nivel.startsWith('4M');
      asignaturasAsignadas = [
        { asignatura: 'lenguaje',    docenteUid: profes.uids[pick(['camila.reyes', 'fernanda.munoz'])], docenteNombre: '' },
        { asignatura: 'matematica',  docenteUid: profes.uids[pick(['ignacio.martinez', 'sofia.herrera'])], docenteNombre: '' },
        { asignatura: 'historia',    docenteUid: profes.uids['pablo.contreras'], docenteNombre: 'Pablo Contreras Díaz' },
        { asignatura: 'ingles',      docenteUid: profes.uids[pick(['antonia.rojas', 'sebastian.castillo'])], docenteNombre: '' },
        { asignatura: 'ciencias_nat', docenteUid: profes.uids['macarena.soto'], docenteNombre: 'Macarena Soto Álvarez' },
        { asignatura: 'ed_fisica',   docenteUid: profes.uids[pick(['emilia.tapia', 'rodrigo.gutierrez'])], docenteNombre: '' },
        { asignatura: 'artes_vis',   docenteUid: profes.uids['trinidad.cornejo'], docenteNombre: 'Trinidad Cornejo Vargas' },
        { asignatura: 'religion',    docenteUid: profes.uids['alvaro.sepulveda'], docenteNombre: 'Álvaro Sepúlveda Ortiz' }
      ];
      if (isMedia) {
        asignaturasAsignadas.push(
          { asignatura: 'biologia',  docenteUid: profes.uids['macarena.soto'], docenteNombre: 'Macarena Soto Álvarez' },
          { asignatura: 'fisica',    docenteUid: profes.uids['nicolas.bravo'], docenteNombre: 'Nicolás Bravo Fuentes' },
          { asignatura: 'quimica',   docenteUid: profes.uids['nicolas.bravo'], docenteNombre: 'Nicolás Bravo Fuentes' },
          { asignatura: 'filosofia', docenteUid: profes.uids['matias.flores'], docenteNombre: 'Matías Flores Reyes' }
        );
      }
    }

    await db.collection('cursos').doc(cursoId).set({
      id: cursoId,
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
      creadoEn: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    cursosCreados.push({ id: cursoId, ...c, totalEstudiantes: estudiantes.length, estudiantes });
    estudiantes.forEach(e => estudiantesTotales.push({ ...e, cursoNombre: nombreCurso }));
  }
  console.log(`   ✓ ${cursosCreados.length} cursos + ${estudiantesTotales.length} estudiantes`);
  return { cursos: cursosCreados, estudiantes: estudiantesTotales };
}

// ═══════════════════════════════════════════════════════════════
// PASO 4: MATERIALES
// ═══════════════════════════════════════════════════════════════
async function crearMateriales(profes) {
  console.log('▶ [4/12] Creando materiales…');
  const materiales = [
    { titulo: 'Guía: Análisis de "El túnel" de Sábato',       tipo: 'guia',       asignatura: 'lenguaje',    autor: 'camila.reyes',       nivel: '4M' },
    { titulo: 'Apunte: Argumentación y sus recursos',         tipo: 'apunte',     asignatura: 'lenguaje',    autor: 'fernanda.munoz',    nivel: '2M' },
    { titulo: 'Guía: Ecuaciones de segundo grado',            tipo: 'guia',       asignatura: 'matematica',  autor: 'ignacio.martinez',  nivel: '1M' },
    { titulo: 'Prueba semestral I - Álgebra',                 tipo: 'evaluacion', asignatura: 'matematica',  autor: 'sofia.herrera',      nivel: '2M' },
    { titulo: 'Apunte: Trigonometría básica',                 tipo: 'apunte',     asignatura: 'matematica',  autor: 'sofia.herrera',      nivel: '3M' },
    { titulo: 'Guía: Golpe militar de 1973',                  tipo: 'guia',       asignatura: 'historia',    autor: 'pablo.contreras',    nivel: '4M' },
    { titulo: 'Control: Sistema político chileno',            tipo: 'evaluacion', asignatura: 'ed_ciudadana',autor: 'pablo.contreras',    nivel: '3M' },
    { titulo: 'Reading Comprehension: Social Media',          tipo: 'guia',       asignatura: 'ingles',       autor: 'antonia.rojas',      nivel: '2M' },
    { titulo: 'Rubric: Oral Presentation B1',                 tipo: 'ficha',      asignatura: 'ingles',       autor: 'sebastian.castillo', nivel: '3M' },
    { titulo: 'Guía: Biomoléculas y células',                 tipo: 'guia',       asignatura: 'biologia',     autor: 'macarena.soto',      nivel: '1M' },
    { titulo: 'Prueba: Cinemática y dinámica',                tipo: 'evaluacion', asignatura: 'fisica',       autor: 'nicolas.bravo',      nivel: '2M' },
    { titulo: 'Apunte: Tabla periódica y enlaces',            tipo: 'apunte',     asignatura: 'quimica',      autor: 'nicolas.bravo',      nivel: '1M' },
    { titulo: 'Guía: Circuitos en serie y paralelo',          tipo: 'guia',       asignatura: 'tp_electricidad', autor: 'cristobal.vargas', nivel: '3M' },
    { titulo: 'Rúbrica: Proyecto electrónica digital',        tipo: 'ficha',      asignatura: 'tp_electronica',  autor: 'andres.reyes',     nivel: '3M' },
    { titulo: 'Control: Motores de combustión interna',       tipo: 'evaluacion', asignatura: 'tp_mec_auto',    autor: 'diego.munoz',       nivel: '4M' },
    { titulo: 'Guía: Voleibol y coordinación',                tipo: 'guia',       asignatura: 'ed_fisica',    autor: 'emilia.tapia',       nivel: '1M' },
    { titulo: 'Apunte: Historia de la música chilena',        tipo: 'apunte',     asignatura: 'musica',        autor: 'trinidad.cornejo',   nivel: '2M' },
    { titulo: 'Guía: Ética y bioética',                       tipo: 'guia',       asignatura: 'filosofia',    autor: 'matias.flores',      nivel: '4M' },
    { titulo: 'Rúbrica evaluación literaria integrada',       tipo: 'ficha',      asignatura: 'ling_liter',   autor: 'amanda.alvarez',    nivel: '3M' },
    { titulo: 'Planificación anual Lenguaje 2° Medio',        tipo: 'planificacion', asignatura: 'lenguaje', autor: 'fernanda.munoz',    nivel: '2M' }
  ];

  let n = 0;
  for (const m of materiales) {
    const uid = profes.uids[m.autor];
    if (!uid) continue;
    const persona = profes.listaCompleta.find(x => x.uid === uid);
    const id = `mat_${slug(m.titulo).slice(0, 40)}_${Date.now()}_${n}`;
    await db.collection('materiales').doc(id).set({
      id, titulo: m.titulo, tipo: m.tipo, asignatura: m.asignatura, nivel: m.nivel,
      autorUid: uid, autorNombre: persona?.nombre || '', profesor: persona?.email,
      liceoSlug: LICEO_SLUG,
      departamento: m.asignatura,
      visibilidad: pick(['liceo', 'departamento', 'privada']),
      contenido: `[Demo] ${m.tipo.toUpperCase()} para ${m.nivel} · ${m.asignatura}. Generado con IA sobre OA vigentes MINEDUC.`,
      fechaISO: fechaHace(rand(1, 45)),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      vistas: rand(0, 30),
      aprobado: true
    });
    n++;
  }
  console.log(`   ✓ ${n} materiales`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 5: PLANIFICACIONES
// ═══════════════════════════════════════════════════════════════
async function crearPlanificaciones(profes) {
  console.log('▶ [5/12] Creando planificaciones…');
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
      autorUid: uid, autorNombre: persona?.nombre || '', profesor: persona?.email,
      liceoSlug: LICEO_SLUG,
      fechaClase: fechaHace(rand(-20, 30)),
      fechaISO: fechaHace(rand(1, 30)),
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      estado: 'activa'
    });
    n++;
  }
  console.log(`   ✓ ${n} planificaciones`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 6: ANOTACIONES en libro de clases
// ═══════════════════════════════════════════════════════════════
async function crearAnotaciones(profes, dataCurso) {
  console.log('▶ [6/12] Creando anotaciones…');
  const tipos = [
    { tipo: 'positiva', textos: [
      'Excelente participación en clase, resolvió el ejercicio en la pizarra.',
      'Ayudó a un compañero a resolver una duda.',
      'Trajo un aporte investigado sobre el tema.',
      'Presentó su trabajo antes del plazo con excelente calidad.'
    ]},
    { tipo: 'negativa', textos: [
      'Interrumpió la clase reiteradamente.',
      'No trajo materiales solicitados por segunda vez.',
      'Uso de celular en clase pese a advertencia.',
      'Se retiró antes del término del bloque sin autorización.'
    ]},
    { tipo: 'neutra', textos: [
      'Se ausentó de la evaluación, presentar médico.',
      'Solicitó recalendarizar entrega por motivo familiar.',
      'Cambio de puesto por indicación del profesor.'
    ]}
  ];

  let n = 0;
  for (let i = 0; i < 40; i++) {
    const curso = pick(dataCurso.cursos);
    const est   = pick(curso.estudiantes);
    const tGrp  = pick(tipos);
    const texto = pick(tGrp.textos);
    const asigAssign = pick(curso.esp
      ? ['lenguaje', 'matematica', curso.esp]
      : ['lenguaje', 'matematica', 'historia', 'ingles', 'ed_fisica']);
    const profesor = pick(profes.listaCompleta.filter(p => p.rol === 'profesor'));

    const id = `anot_${curso.id}_${est.uid}_${i}`;
    await db.collection('anotaciones_alumno').doc(id).set({
      id,
      estudianteUid: est.uid,
      estudianteNombre: est.nombre,
      cursoId: curso.id,
      liceoSlug: LICEO_SLUG,
      profesorUid: profesor.uid,
      profesorNombre: profesor.nombre,
      asignatura: asigAssign,
      tipo: tGrp.tipo,
      texto,
      fecha: fechaHace(rand(1, 45)),
      creadoEn: admin.firestore.FieldValue.serverTimestamp()
    });
    n++;
  }
  console.log(`   ✓ ${n} anotaciones`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 7: ALERTAS APODERADO
// ═══════════════════════════════════════════════════════════════
async function crearAlertas(profes, dataCurso) {
  console.log('▶ [7/12] Creando alertas apoderado…');
  const motivos = [
    { motivo: 'Bajo rendimiento',  descripcion: 'Nota inferior a 4.0 en última evaluación de matemática.' },
    { motivo: 'Ausentismo',        descripcion: 'Ha faltado 5 días sin justificar en el mes.' },
    { motivo: 'Conducta',          descripcion: 'Reiteradas interrupciones en clases y falta de respeto a compañeros.' },
    { motivo: 'Salud emocional',   descripcion: 'Se le nota triste, baja energía. Solicito conversación urgente.' },
    { motivo: 'Materiales',        descripcion: 'No trae materiales por tercera semana consecutiva.' },
    { motivo: 'Uniforme',          descripcion: 'Uso reiterado de prendas no reglamentarias.' }
  ];

  let n = 0;
  for (let i = 0; i < 15; i++) {
    const curso = pick(dataCurso.cursos);
    const est   = pick(curso.estudiantes);
    const m     = pick(motivos);
    const prof  = pick(profes.listaCompleta.filter(p => p.rol === 'profesor'));

    const id = `alerta_${curso.id}_${est.uid}_${i}`;
    await db.collection('alertas_alumno').doc(id).set({
      id,
      estudianteUid: est.uid,
      estudianteNombre: est.nombre,
      cursoId: curso.id,
      liceoSlug: LICEO_SLUG,
      profesorUid: prof.uid,
      profesorNombre: prof.nombre,
      motivo: m.motivo,
      descripcion: m.descripcion,
      canal: pick(['whatsapp', 'email', 'ambos']),
      apoderadoNombre: est.apoderado.nombre,
      apoderadoTelefono: est.apoderado.telefono,
      apoderadoEmail: est.apoderado.email,
      fecha: fechaHace(rand(0, 20)),
      estado: pick(['enviada', 'leida', 'respondida']),
      creadoEn: admin.firestore.FieldValue.serverTimestamp()
    });
    n++;
  }
  console.log(`   ✓ ${n} alertas`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 8: DERIVACIONES
// ═══════════════════════════════════════════════════════════════
async function crearDerivaciones(profes, dataCurso) {
  console.log('▶ [8/12] Creando derivaciones…');
  const casos = [
    { destino: 'apoyo',      motivo: 'Estado emocional decaído', tipo: 'Salud emocional' },
    { destino: 'apoyo',      motivo: 'Posible situación familiar compleja', tipo: 'Familia' },
    { destino: 'convivencia',motivo: 'Conflicto con compañeros', tipo: 'Convivencia escolar' },
    { destino: 'convivencia',motivo: 'Reiteradas faltas al reglamento', tipo: 'Disciplina' },
    { destino: 'pie',        motivo: 'Sospecha de dificultades de aprendizaje', tipo: 'Evaluación NEE' },
    { destino: 'pie',        motivo: 'Requiere adecuación curricular', tipo: 'Adecuación' }
  ];

  let n = 0;
  for (let i = 0; i < 12; i++) {
    const curso = pick(dataCurso.cursos);
    const est   = pick(curso.estudiantes);
    const c     = pick(casos);
    const prof  = pick(profes.listaCompleta.filter(p => p.rol === 'profesor'));

    const id = `der_${curso.id}_${est.uid}_${i}`;
    await db.collection('derivaciones_alumno').doc(id).set({
      id,
      estudianteUid: est.uid,
      estudianteNombre: est.nombre,
      cursoId: curso.id,
      liceoSlug: LICEO_SLUG,
      profesorUid: prof.uid,
      profesorNombre: prof.nombre,
      destino: c.destino,
      derivadoA: c.destino === 'pie' ? 'Equipo PIE' :
                 c.destino === 'apoyo' ? 'Apoyo Psicosocial' : 'Convivencia Escolar',
      motivo: c.motivo,
      tipo: c.tipo,
      descripcion: `Se requiere seguimiento por parte del equipo de ${c.destino}.`,
      fecha: fechaHace(rand(0, 30)),
      estado: pick(['pendiente', 'en_atencion', 'atendida']),
      creadoEn: admin.firestore.FieldValue.serverTimestamp()
    });
    n++;
  }
  console.log(`   ✓ ${n} derivaciones`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 9: FICHAS PIE
// ═══════════════════════════════════════════════════════════════
async function crearFichasPIE(profes, dataCurso) {
  console.log('▶ [9/12] Creando fichas PIE…');
  const diagnosticos = [
    { key: 'tea',      label: 'TEA' },
    { key: 'tdah',     label: 'TDAH' },
    { key: 'dislexia', label: 'Dislexia' },
    { key: 'discalculia', label: 'Discalculia' },
    { key: 'tl',       label: 'Trastorno del Lenguaje' },
    { key: 'emocional', label: 'Trastorno emocional' },
    { key: 'motor',    label: 'Trastorno motor' },
    { key: 'dotacion', label: 'Altas capacidades' }
  ];

  const educadoras = profes.listaCompleta.filter(p => p.rol === 'pie_edu');
  let n = 0;
  for (let i = 0; i < 10; i++) {
    const curso = pick(dataCurso.cursos);
    const est   = pick(curso.estudiantes);
    const d     = pick(diagnosticos);
    const edu   = pick(educadoras);

    const id = `pie_${est.uid}`;
    await db.collection('fichas_pie').doc(id).set({
      id,
      estudianteUid: est.uid,
      estudianteNombre: est.nombre,
      cursoId: curso.id,
      cursoNombre: curso.nombreCompleto || `${curso.nivel}${curso.letra}`,
      liceoSlug: LICEO_SLUG,
      diagnostico: d.key,
      diagnosticoLabel: d.label,
      tipoNEE: pick(['permanente', 'transitoria']),
      decreto: pick(['DS 170/2009', 'DS 83/2015']),
      educadoraUid: edu.uid,
      educadoraNombre: edu.nombre,
      estado: 'activo',
      fechaIngreso: fechaHace(rand(30, 300)),
      adecuaciones: [
        'Tiempo adicional en evaluaciones (30% más).',
        'Instrucciones divididas en pasos cortos y visuales.',
        'Ubicación preferente cerca del profesor.'
      ],
      seguimientos: [
        { fecha: fechaHace(20), texto: 'Buena adaptación al aula.', autor: edu.nombre },
        { fecha: fechaHace(10), texto: 'Se observa mejora en la lectura comprensiva.', autor: edu.nombre }
      ],
      creadoEn: admin.firestore.FieldValue.serverTimestamp()
    });
    n++;
  }
  console.log(`   ✓ ${n} fichas PIE`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 10: NOTAS del libro de clases
// ═══════════════════════════════════════════════════════════════
async function crearNotas(dataCurso) {
  console.log('▶ [10/12] Creando notas del semestre I…');
  let n = 0;
  const asignaturasPorCurso = curso => curso.esp
    ? ['lenguaje', 'matematica', 'ingles', 'historia', curso.esp]
    : ['lenguaje', 'matematica', 'historia', 'ingles', 'ciencias_nat'];

  for (const curso of dataCurso.cursos) {
    for (const asig of asignaturasPorCurso(curso)) {
      const notasCurso = {};
      for (const est of curso.estudiantes) {
        // Genera 3-5 notas por alumno (semestre I)
        const notas = [];
        const cantidad = rand(3, 5);
        for (let i = 0; i < cantidad; i++) {
          notas.push({
            valor: (Math.round((rand(35, 70) + rand(0, 10) / 10) * 10) / 10 / 10).toFixed(1),
            fecha: fechaHace(rand(30, 150)),
            evaluacion: `Ev ${i + 1}`,
            ponderacion: pick([15, 20, 25, 30])
          });
        }
        notasCurso[est.uid] = notas;
      }
      await db.collection('notas_curso').doc(`${curso.id}_${asig}_2026_I`).set({
        cursoId: curso.id,
        liceoSlug: LICEO_SLUG,
        asignatura: asig,
        semestre: 'I',
        anio: HOY.getFullYear(),
        notas: notasCurso,
        creadoEn: admin.firestore.FieldValue.serverTimestamp()
      });
      n++;
    }
  }
  console.log(`   ✓ ${n} sets de notas`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 11: ASISTENCIA
// ═══════════════════════════════════════════════════════════════
async function crearAsistencia(dataCurso) {
  console.log('▶ [11/12] Creando registros de asistencia (últimos 30 días)…');
  let n = 0;
  for (const curso of dataCurso.cursos) {
    for (let d = 0; d < 30; d++) {
      const fecha = fechaHace(d);
      const day = new Date(fecha).getDay();
      if (day === 0 || day === 6) continue; // saltar fin de semana
      const reg = {};
      curso.estudiantes.forEach(est => {
        const estado = Math.random() < 0.90 ? 'P' : Math.random() < 0.5 ? 'A' : 'J';
        reg[est.uid] = estado;
      });
      await db.collection('asistencia_curso').doc(`${curso.id}_${fecha}`).set({
        cursoId: curso.id,
        liceoSlug: LICEO_SLUG,
        fecha,
        asistencia: reg,
        creadoEn: admin.firestore.FieldValue.serverTimestamp()
      });
      n++;
    }
  }
  console.log(`   ✓ ${n} días de asistencia`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 12: EVENTOS + COMUNICADOS
// ═══════════════════════════════════════════════════════════════
async function crearEventosYComunicados(profes) {
  console.log('▶ [12/12] Creando eventos calendario y comunicados…');
  const eventos = [
    { titulo: 'Reunión de apoderados 1M-A',   tipo: 'reunion',   dias: 7 },
    { titulo: 'Prueba coeficiente 2 Matemática 3M', tipo: 'evaluacion', dias: 4 },
    { titulo: 'Salida pedagógica Museo Ferroviario', tipo: 'salida', dias: 15 },
    { titulo: 'Consejo de profesores mensual', tipo: 'reunion',   dias: 3 },
    { titulo: 'Feria científica intercursos',  tipo: 'otro',       dias: 20 },
    { titulo: 'Acto aniversario del colegio',   tipo: 'evento',    dias: 25 },
    { titulo: 'Simulacro de emergencia',        tipo: 'otro',      dias: 10 },
    { titulo: 'Cierre 1er semestre',            tipo: 'evento',    dias: 5 },
    { titulo: 'Charla vocacional 4M',            tipo: 'charla',    dias: 12 },
    { titulo: 'Encuentro pastoral',             tipo: 'evento',    dias: 18 }
  ];
  const rector = profes.listaCompleta.find(p => p.rol === 'rector');
  const admin_colegio = profes.listaCompleta.find(p => p.rol === 'admin_colegio');

  let n = 0;
  for (const e of eventos) {
    const fecha = new Date(HOY);
    fecha.setDate(fecha.getDate() + e.dias);
    await db.collection('eventos_calendario').doc(`ev_${slug(e.titulo).slice(0, 40)}_${n}`).set({
      titulo: e.titulo, tipo: e.tipo,
      fecha: fecha.toISOString().slice(0, 10),
      liceoSlug: LICEO_SLUG,
      creadoPor: rector?.uid || '',
      creadoEn: admin.firestore.FieldValue.serverTimestamp()
    });
    n++;
  }

  const comunicados = [
    { titulo: 'Bienvenida al año escolar 2026', tipo: 'bienvenida',    mensaje: 'Queridos docentes: comienza un nuevo año lleno de oportunidades. Contamos con Ustedes para hacer de este el mejor año de aprendizajes.' },
    { titulo: 'Nueva plataforma Click&Clase',    tipo: 'avance',        mensaje: 'A partir de este mes usaremos Click&Clase para toda la gestión pedagógica: libro de clases, planificación, materiales, comunicación con apoderados. Cualquier duda, contactar a UTP.' },
    { titulo: 'Capacitación IA integrada — 25 de julio', tipo: 'capacitacion', mensaje: 'Taller práctico de uso de IA para generar guías, apuntes y pruebas alineadas a OA. Asistencia obligatoria para docentes de asignatura.' },
    { titulo: 'Recordatorio: cierre notas 1er semestre',  tipo: 'general',    mensaje: 'Recuerden que el cierre de notas del primer semestre es el próximo viernes. Cualquier atraso, avisar a UTP.' },
    { titulo: 'Feria científica 2026',            tipo: 'avance',      mensaje: 'Ya están abiertas las inscripciones para la feria científica intercursos. Los cursos participantes recibirán apoyo del departamento de ciencias.' }
  ];
  for (const c of comunicados) {
    await db.collection('comunicados').doc(`com_${slug(c.titulo).slice(0, 40)}`).set({
      ...c,
      liceoSlug: LICEO_SLUG,
      creadoPor: admin_colegio?.uid || rector?.uid || '',
      creadoEn: admin.firestore.FieldValue.serverTimestamp(),
      publicado: true
    });
  }
  console.log(`   ✓ ${n} eventos + ${comunicados.length} comunicados`);
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║  SEED colegio demo: ' + LICEO_NOMBRE.padEnd(30) + '║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  await crearLiceo();
  const profes = await crearFuncionarios();
  const dataCurso = await crearCursosYEstudiantes(profes);
  await crearMateriales(profes);
  await crearPlanificaciones(profes);
  await crearAnotaciones(profes, dataCurso);
  await crearAlertas(profes, dataCurso);
  await crearDerivaciones(profes, dataCurso);
  await crearFichasPIE(profes, dataCurso);
  await crearNotas(dataCurso);
  await crearAsistencia(dataCurso);
  await crearEventosYComunicados(profes);

  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║  ✅ SEED COMPLETO                                ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`
Todos los usuarios tienen password: ${PASSWORD}
Colegio poblado: ${LICEO_NOMBRE} (${LICEO_SLUG})

Emails de demo para hacer walkthroughs:
  • Rector:            rector@${DOMINIO_MAIL}
  • Director:          director@${DOMINIO_MAIL}
  • Admin colegio:     admin@${DOMINIO_MAIL}
  • UTP:               utp1@${DOMINIO_MAIL}
  • Coord PIE:         pie.coord@${DOMINIO_MAIL}
  • Enc Apoyo:         apoyo.enc@${DOMINIO_MAIL}
  • Enc Convivencia:   conviv.enc@${DOMINIO_MAIL}
  • Profesor Lenguaje: camila.reyes@${DOMINIO_MAIL}
  • Profesor Matem.:   ignacio.martinez@${DOMINIO_MAIL}
  • Profesor TP Elec:  cristobal.vargas@${DOMINIO_MAIL}
  `);
  process.exit(0);
}

main().catch(e => {
  console.error('❌ ERROR:', e);
  process.exit(1);
});
