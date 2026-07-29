/**
 * seed-apoyo-psicosocial.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Puebla el Panel de Apoyo Psicosocial con casos e intervenciones
 * variados para poder probar TODOS los items del checklist:
 *   • KPIs por motivo de intervención
 *   • Casos por profesional (Alejandra, Diego, Constanza)
 *   • Registrar intervención (flujo)
 *   • Estados de casos (abierto/seguimiento/cerrado/derivado)
 *
 * Colección: intervenciones_apoyo
 *
 * Motivos: emocional, familiar, academico, conductual, salud,
 *          convivencia, sospecha_vulneracion, otro
 * Estados: abierto, seguimiento, cerrado, derivado
 *
 * Genera:
 *   • 38 intervenciones distribuidas entre 3 profesionales
 *   • Mix de motivos y estados
 *   • Estudiantes reales de los cursos existentes
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-apoyo-psicosocial.mjs
 *
 * ES IDEMPOTENTE: docs marcados con seedTag = 'apoyo-v1'.
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

// Autenticación
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
const db = admin.firestore();

const LICEO_SLUG = 'salesianos-talca';
const SEED_TAG   = 'apoyo-v1';
const HOY        = new Date();

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
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

// ═══════════════════════════════════════════════════════════════
// Limpiar seed anterior
// ═══════════════════════════════════════════════════════════════
async function limpiarPrevios() {
  console.log('▶ [0/3] Limpiando docs previos con seedTag=' + SEED_TAG + '…');
  const snap = await db.collection('intervenciones_apoyo')
    .where('seedTag', '==', SEED_TAG)
    .limit(500)
    .get();
  let batch = db.batch();
  let n = 0;
  snap.forEach(d => { batch.delete(d.ref); n++; });
  if (n > 0) await batch.commit();
  console.log(`   ✓ ${n} docs previos borrados`);
}

// ═══════════════════════════════════════════════════════════════
// Cargar profesionales del apoyo + cursos + estudiantes
// ═══════════════════════════════════════════════════════════════
async function cargarBase() {
  console.log('▶ [1/3] Cargando profesionales del apoyo + cursos + estudiantes…');

  // 3 profesionales del apoyo
  const emails = ['apoyo.enc@salesianos-talca.cl', 'psic1@salesianos-talca.cl', 'ts1@salesianos-talca.cl'];
  const profesionales = [];
  for (const email of emails) {
    const snap = await db.collection('usuarios').where('email', '==', email).limit(1).get();
    snap.forEach(doc => profesionales.push({ uid: doc.id, ...doc.data() }));
  }
  if (profesionales.length < 3) {
    console.error(`   ✗ Solo encontré ${profesionales.length}/3 profesionales. Verificá que el seed base esté cargado.`);
    process.exit(1);
  }

  // Cursos y estudiantes
  const cursosSnap = await db.collection('cursos')
    .where('liceoSlug', '==', LICEO_SLUG)
    .get();
  const cursos = [];
  cursosSnap.forEach(doc => {
    const c = { id: doc.id, ...doc.data() };
    cursos.push(c);
  });

  const totalEst = cursos.reduce((s, c) => s + (Array.isArray(c.estudiantes) ? c.estudiantes.length : 0), 0);
  console.log(`   ✓ 3 profesionales, ${cursos.length} cursos, ${totalEst} estudiantes`);
  return { profesionales, cursos };
}

// ═══════════════════════════════════════════════════════════════
// Templates
// ═══════════════════════════════════════════════════════════════
const MOTIVOS = [
  { motivo: 'emocional', peso: 8, detalles: [
    'Síntomas ansiosos frente a evaluaciones importantes.',
    'Cuadro depresivo leve tras separación de padres.',
    'Estrés académico con impacto en calidad del sueño.',
    'Manifestaciones de tristeza persistente en último mes.'
  ]},
  { motivo: 'familiar', peso: 6, detalles: [
    'Proceso de separación de los padres, requiere apoyo.',
    'Situación económica compleja del hogar.',
    'Duelo por pérdida de familiar cercano.',
    'Conflicto con hermanos/hermanas en el hogar.'
  ]},
  { motivo: 'academico', peso: 6, detalles: [
    'Bajo rendimiento en múltiples asignaturas del semestre.',
    'Dificultades de organización y hábitos de estudio.',
    'Sospecha de dificultad específica de aprendizaje, pendiente evaluación PIE.',
    'Absentismo escolar reciente con impacto en notas.'
  ]},
  { motivo: 'conductual', peso: 6, detalles: [
    'Anotaciones reiteradas por interrupciones en clases.',
    'Conflictos en el patio durante los recreos.',
    'Actitud desafiante hacia profesores y autoridad.',
    'Retraimiento social observado por profesor jefe.'
  ]},
  { motivo: 'salud', peso: 4, detalles: [
    'Solicita apoyo por cuadro médico crónico.',
    'Regreso post-hospitalización, requiere seguimiento.',
    'Trastorno alimenticio en observación, coordinación con familia.',
    'Dolor recurrente sin causa identificada, deriva a médico.'
  ]},
  { motivo: 'convivencia', peso: 4, detalles: [
    'Situación de posible bullying, requiere intervención con Convivencia.',
    'Conflicto con grupo curso, mediación pendiente.',
    'Denuncia de exclusión social por parte del estudiante.',
    'Cyberbullying detectado en RRSS.'
  ]},
  { motivo: 'sospecha_vulneracion', peso: 2, detalles: [
    'Sospecha de vulneración de derechos en el hogar. Se activa protocolo.',
    'Indicios de negligencia parental, coordinar con red externa.'
  ]},
  { motivo: 'otro', peso: 2, detalles: [
    'Solicitud voluntaria del estudiante por temas personales.',
    'Derivación desde profesor jefe sin motivo específico.'
  ]}
];

const ESTADOS = ['abierto','abierto','abierto','abierto','abierto',
                 'abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto',
                 'seguimiento','seguimiento','seguimiento','seguimiento','seguimiento',
                 'seguimiento','seguimiento','seguimiento','seguimiento','seguimiento',
                 'cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado',
                 'derivado','derivado','derivado','derivado','derivado'];

const COMPROMISOS = [
  'Estudiante se compromete a asistir semanalmente. Familia autoriza y participa.',
  'Programa de intervención cognitivo-conductual de 8 sesiones.',
  'Coordinación con profesor jefe para observación en aula.',
  'Reunión con apoderado en 15 días para revisar avances.',
  'Entrega de material de psicoeducación al estudiante.',
  'Se establece plan de acompañamiento gradual con evaluación mensual.'
];

const COMPROMISOS_CERRADO = [
  'Objetivos terapéuticos alcanzados. Se cierra caso con seguimiento pasivo.',
  'Situación estabilizada, familia manifiesta mejoría clara. Alta.',
  'Estudiante y familia manifiestan satisfacción con el proceso. Alta clínica.',
  'Caso resuelto en red externa. Cierre coordinado.'
];

// ═══════════════════════════════════════════════════════════════
// Elegir estudiante random de un curso random
// ═══════════════════════════════════════════════════════════════
function pickEstudiante(cursos) {
  // Intentar 5 veces hasta encontrar curso con estudiantes
  for (let intento = 0; intento < 5; intento++) {
    const curso = pick(cursos);
    const estudiantes = Array.isArray(curso.estudiantes) ? curso.estudiantes : [];
    if (!estudiantes.length) continue;
    const idx = rand(0, estudiantes.length - 1);
    const est = estudiantes[idx];
    return {
      cursoId:      curso.id,
      cursoNombre:  curso.nombreCompleto || (curso.nivel + curso.letra),
      estudianteOrdinal: idx + 1,        // ordinal 1-based dentro del curso
      estudianteUid:     est.uid,
      estudianteNombre:  est.nombre,
      estudianteRut:     est.rut || ''
    };
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
// Generar intervenciones
// ═══════════════════════════════════════════════════════════════
async function generarIntervenciones(profesionales, cursos) {
  console.log('▶ [2/3] Generando 38 intervenciones distribuidas por motivo/estado/profesional…');

  // Construir el pool de motivos según pesos
  const poolMotivos = [];
  MOTIVOS.forEach(m => {
    for (let i = 0; i < m.peso; i++) poolMotivos.push(m);
  });

  // Barajar el pool de estados y motivos para variar
  poolMotivos.sort(() => Math.random() - 0.5);
  const estadosShuffled = [...ESTADOS].sort(() => Math.random() - 0.5);

  const TIPOS_INT = ['individual', 'individual', 'individual', 'familiar', 'grupal'];

  let batch = db.batch();
  let n = 0;

  for (let i = 0; i < 38; i++) {
    const estudiante = pickEstudiante(cursos);
    if (!estudiante) continue;

    const m = poolMotivos[i % poolMotivos.length];
    const estado = estadosShuffled[i];
    const prof = profesionales[i % profesionales.length];  // rotar entre los 3 pros
    const tipo = pick(TIPOS_INT);

    const diasAtras = estado === 'abierto'
      ? rand(1, 10)
      : estado === 'seguimiento'
        ? rand(10, 30)
        : estado === 'cerrado'
          ? rand(30, 60)
          : rand(15, 40); // derivado

    // Determinar rol profesional
    const email = prof.email || '';
    const rol = email.includes('ts')     ? 'trabajador_social'
              : email.includes('apoyo')  ? 'psicologo'
              : 'psicologo';

    const doc = {
      intId:              `int-seed-${SEED_TAG}-${i}-${Date.now()}`,
      liceoSlug:          LICEO_SLUG,
      cursoId:            estudiante.cursoId,
      cursoNombre:        estudiante.cursoNombre,
      estudianteOrdinal:  estudiante.estudianteOrdinal,
      estudianteUid:      estudiante.estudianteUid,
      estudianteNombre:   estudiante.estudianteNombre,
      estudianteRut:      estudiante.estudianteRut,
      profesionalUid:     prof.uid,
      profesionalNombre:  prof.nombre || prof.displayName || '',
      profesionalEmail:   prof.email || '',
      profesionalRol:     rol,
      tipo:               tipo,
      motivo:             m.motivo,
      motivoDetalle:      pick(m.detalles),
      resumen:            `Caso de ${m.motivo}. ${pick(m.detalles)} Se abre proceso de acompañamiento y coordinación con familia y profesor jefe.`,
      compromisos:        estado === 'cerrado' ? pick(COMPROMISOS_CERRADO) : pick(COMPROMISOS),
      seguimientoRequerido: estado !== 'cerrado',
      proximaSesion:      estado === 'abierto' || estado === 'seguimiento' ? fechaHace(-rand(3, 14)) : '',
      estado:             estado,
      derivadoA:          estado === 'derivado' ? pick(['pie','convivencia','externo']) : '',
      confidencial:       m.motivo === 'sospecha_vulneracion',
      fecha:              fechaHace(diasAtras),
      creadoEn:           isoHace(diasAtras),
      actualizadoEn:      isoHace(estado === 'abierto' ? diasAtras : rand(0, diasAtras)),
      seedTag:            SEED_TAG
    };

    batch.set(db.collection('intervenciones_apoyo').doc(doc.intId), doc);
    n++;

    if (n % 400 === 0) { await batch.commit(); batch = db.batch(); }
  }
  if (n % 400 !== 0) await batch.commit();

  console.log(`   ✓ ${n} intervenciones creadas`);
}

// ═══════════════════════════════════════════════════════════════
// Resumen final
// ═══════════════════════════════════════════════════════════════
async function mostrarResumen() {
  console.log('▶ [3/3] Verificando estado final…');
  const snap = await db.collection('intervenciones_apoyo')
    .where('liceoSlug', '==', LICEO_SLUG)
    .where('seedTag', '==', SEED_TAG)
    .get();

  const porMotivo = {}, porEstado = {}, porProf = {};
  snap.forEach(doc => {
    const d = doc.data();
    porMotivo[d.motivo] = (porMotivo[d.motivo] || 0) + 1;
    porEstado[d.estado] = (porEstado[d.estado] || 0) + 1;
    porProf[d.profesionalNombre] = (porProf[d.profesionalNombre] || 0) + 1;
  });

  console.log('');
  console.log('   Distribución por MOTIVO:');
  Object.entries(porMotivo).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(20)} ${v}`));
  console.log('');
  console.log('   Distribución por ESTADO:');
  Object.entries(porEstado).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(15)} ${v}`));
  console.log('');
  console.log('   Distribución por PROFESIONAL:');
  Object.entries(porProf).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(30)} ${v}`));
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  SEED apoyo psicosocial — Salesianos Talca        ║');
  console.log('╚══════════════════════════════════════════════════╝');

  await limpiarPrevios();
  const { profesionales, cursos } = await cargarBase();
  await generarIntervenciones(profesionales, cursos);
  await mostrarResumen();

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  ✅ APOYO POBLADO                                 ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Ahora podés probar con:');
  console.log('  • Encargada:  apoyo.enc@salesianos-talca.cl / Demo1234!');
  console.log('  • Psicólogo:  psic1@salesianos-talca.cl / Demo1234!');
  console.log('  • Trab. Soc:  ts1@salesianos-talca.cl / Demo1234!');
  console.log('');
  console.log('Panel Apoyo Psicosocial verá:');
  console.log('  • KPIs por motivo (gráfico distribución)');
  console.log('  • Casos por profesional (gráfico + tabla)');
  console.log('  • Tabla con filtros por motivo/estado');
  console.log('  • Click en caso → modal con detalle');
  console.log('  • Botón "Nueva intervención" → registrar una manualmente');
  console.log('');
  process.exit(0);
}

main().catch(e => { console.error('❌ ERROR:', e); process.exit(1); });
