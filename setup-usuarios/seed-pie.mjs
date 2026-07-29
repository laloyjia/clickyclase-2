/**
 * seed-pie.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Puebla el Panel de Coordinación PIE con fichas de estudiantes
 * para probar todos los items del checklist:
 *   • KPIs: PIE activos / NEE permanentes / NEE transitorias / egresados
 *   • Con adecuaciones activas / Total fichas
 *   • Distribución por diagnóstico (gráfico)
 *   • Lista de educadoras diferenciales
 *   • Ver ficha PIE con adecuaciones
 *   • Vista educadora (panel-pie-edu)
 *
 * Colección: pie_estudiantes
 *
 * Genera:
 *   • ~28 fichas PIE con diagnósticos según Decreto 170
 *   • Mix de NEE permanentes (TEA, DI, discapacidad) y transitorias (TDAH, DEA, TEL)
 *   • Distribuidas entre las 3 educadoras diferenciales del liceo
 *   • Adecuaciones curriculares según Decreto 83
 *   • 3 estados: activo / egresado / suspendido
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-pie.mjs
 *
 * ES IDEMPOTENTE: docs marcados con seedTag = 'pie-v1'.
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

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
const SEED_TAG   = 'pie-v1';
const HOY        = new Date();

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
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

// ═══════════════════════════════════════════════════════════════
// NEE_TIPO mapeo (igual que js/pie.js)
// ═══════════════════════════════════════════════════════════════
const NEE_TIPO = {
  tdah: 'transitoria', tel: 'transitoria',
  dislexia: 'transitoria', discalculia: 'transitoria',
  dea_lectura: 'transitoria', dea_escritura: 'transitoria', dea_matematica: 'transitoria',
  rango_limitrofe: 'transitoria',
  discapacidad_intelectual: 'permanente', tea: 'permanente',
  discapacidad_auditiva: 'permanente', discapacidad_visual: 'permanente',
  discapacidad_motora: 'permanente', multideficit: 'permanente',
  otro: 'na'
};

// ═══════════════════════════════════════════════════════════════
async function limpiarPrevios() {
  console.log('▶ [0/3] Limpiando fichas previas con seedTag=' + SEED_TAG + '…');
  const snap = await db.collection('pie_estudiantes')
    .where('seedTag', '==', SEED_TAG)
    .limit(500)
    .get();
  let batch = db.batch();
  let n = 0;
  snap.forEach(d => { batch.delete(d.ref); n++; });
  if (n > 0) await batch.commit();
  console.log(`   ✓ ${n} fichas previas borradas`);
}

// ═══════════════════════════════════════════════════════════════
async function cargarBase() {
  console.log('▶ [1/3] Cargando equipo PIE + cursos + estudiantes…');

  // Cargar educadoras del PIE
  const emails = [
    'pie.coord@salesianos-talca.cl',
    'pie.edu1@salesianos-talca.cl',
    'pie.edu2@salesianos-talca.cl',
    'pie.edu3@salesianos-talca.cl'
  ];
  const equipoPie = [];
  for (const email of emails) {
    const snap = await db.collection('usuarios').where('email', '==', email).limit(1).get();
    snap.forEach(doc => equipoPie.push({ uid: doc.id, ...doc.data() }));
  }
  if (equipoPie.length < 4) {
    console.error(`   ✗ Solo encontré ${equipoPie.length}/4 miembros del equipo PIE.`);
    process.exit(1);
  }
  // La coordinadora es la primera, las educadoras las 3 siguientes
  const educadoras = equipoPie.filter(e => e.email && e.email.indexOf('pie.edu') !== -1);

  // Cursos y estudiantes
  const cursosSnap = await db.collection('cursos')
    .where('liceoSlug', '==', LICEO_SLUG)
    .get();
  const cursos = [];
  cursosSnap.forEach(doc => cursos.push({ id: doc.id, ...doc.data() }));

  const totalEst = cursos.reduce((s, c) => s + (Array.isArray(c.estudiantes) ? c.estudiantes.length : 0), 0);
  console.log(`   ✓ Coordinadora + ${educadoras.length} educadoras, ${cursos.length} cursos, ${totalEst} estudiantes`);
  return { educadoras, cursos };
}

// ═══════════════════════════════════════════════════════════════
// Templates
// ═══════════════════════════════════════════════════════════════
const DIAGNOSTICOS_TRANSITORIAS = [
  { d: 'tdah',             peso: 5, dominios: ['Atención sostenida','Autorregulación','Función ejecutiva'],
    resumen: 'Estudiante con diagnóstico de TDAH combinado. Presenta dificultades de atención sostenida y autorregulación en aula. Recibe atención farmacológica externa.' },
  { d: 'dea_lectura',      peso: 4, dominios: ['Decodificación','Comprensión lectora','Velocidad lectora'],
    resumen: 'Dificultades específicas de aprendizaje en lectura. Comprensión bajo el nivel esperado para el curso.' },
  { d: 'dea_matematica',   peso: 3, dominios: ['Numeración','Cálculo','Resolución de problemas'],
    resumen: 'Dificultad específica del aprendizaje en matemática. Requiere apoyo con recursos manipulables y visuales.' },
  { d: 'dea_escritura',    peso: 3, dominios: ['Grafomotricidad','Ortografía','Redacción'],
    resumen: 'Dificultad en la escritura, especialmente en ortografía y redacción de textos extensos.' },
  { d: 'dislexia',         peso: 3, dominios: ['Conciencia fonológica','Decodificación'],
    resumen: 'Diagnóstico de dislexia confirmado por evaluación externa. Trabaja con adecuaciones en evaluaciones escritas.' },
  { d: 'discalculia',      peso: 2, dominios: ['Numeración','Cálculo mental'],
    resumen: 'Discalculia diagnosticada. Requiere apoyo con material concreto y evaluaciones diferenciadas.' },
  { d: 'tel',              peso: 2, dominios: ['Comprensión oral','Expresión oral','Vocabulario'],
    resumen: 'Trastorno específico del lenguaje. Trabajo coordinado con fonoaudiología externa.' },
  { d: 'rango_limitrofe',  peso: 1, dominios: ['Función ejecutiva','Comprensión'],
    resumen: 'Rango limítrofe intelectual. Necesita apoyo constante y adecuaciones metodológicas.' }
];

const DIAGNOSTICOS_PERMANENTES = [
  { d: 'tea',                       peso: 3, dominios: ['Comunicación social','Autorregulación','Flexibilidad cognitiva'],
    resumen: 'TEA nivel 1 diagnosticado por neurólogo. Requiere anticipación de rutinas y apoyo social.' },
  { d: 'discapacidad_intelectual',  peso: 2, dominios: ['Cognitivo','Habilidades adaptativas','Comunicación'],
    resumen: 'Discapacidad intelectual leve. Trabaja con adecuación curricular significativa y apoyo permanente.' },
  { d: 'discapacidad_motora',       peso: 1, dominios: ['Motricidad','Autonomía'],
    resumen: 'Discapacidad motora, movilidad reducida. Requiere adecuaciones de acceso y evaluación adaptada.' },
  { d: 'discapacidad_auditiva',     peso: 1, dominios: ['Comprensión oral','Comunicación'],
    resumen: 'Hipoacusia bilateral. Usa audífono y requiere ubicación estratégica en aula.' }
];

const ADECUACIONES_TEMPLATES = [
  { tipo: 'evaluacion',      texto: 'Evaluación diferenciada: reducir a 60% las preguntas, tiempo extra 50%, permitir uso de calculadora.' },
  { tipo: 'evaluacion',      texto: 'Aplicar evaluación oral complementaria cuando el desempeño escrito sea insuficiente.' },
  { tipo: 'metodologia',     texto: 'Uso de material concreto y visual. Instrucciones simplificadas paso a paso.' },
  { tipo: 'metodologia',     texto: 'Trabajo colaborativo con compañero tutor. Refuerzo positivo continuo.' },
  { tipo: 'acceso',          texto: 'Ubicación estratégica al frente del aula. Aula con buena iluminación y sin distractores.' },
  { tipo: 'temporalizacion', texto: 'Extender tiempo para tareas escritas y evaluaciones. Fragmentar entregas en etapas.' },
  { tipo: 'objetivos_aprendizaje', texto: 'Adecuar OA priorizando los esenciales del nivel. Postergar OA de mayor complejidad.' }
];

const DECRETO_POR_TIPO = {
  transitoria: '170_transitoria',
  permanente:  '170_permanente'
};

// Estados con distribución: 20 activos, 5 egresados, 3 suspendidos = 28 total
const ESTADOS_POOL = [
  ...Array(20).fill('activo'),
  ...Array(5).fill('egresado'),
  ...Array(3).fill('suspendido')
];

// ═══════════════════════════════════════════════════════════════
function pickEstudianteUnico(cursos, usados) {
  for (let intento = 0; intento < 20; intento++) {
    const curso = pick(cursos);
    const estudiantes = Array.isArray(curso.estudiantes) ? curso.estudiantes : [];
    if (!estudiantes.length) continue;
    const idx = rand(0, estudiantes.length - 1);
    const est = estudiantes[idx];
    const clave = curso.id + ':' + idx;
    if (usados.has(clave)) continue;
    usados.add(clave);
    return {
      cursoId:      curso.id,
      cursoNombre:  curso.nombreCompleto || (curso.nivel + curso.letra),
      estudianteOrdinal: idx + 1,
      estudianteUid:     est.uid,
      estudianteNombre:  est.nombre,
      estudianteRut:     est.rut || ''
    };
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
async function generarFichas(educadoras, cursos) {
  console.log('▶ [2/3] Generando fichas PIE con diagnósticos y adecuaciones…');

  // Pool ponderado de diagnósticos
  const poolTrans = [];
  DIAGNOSTICOS_TRANSITORIAS.forEach(dg => { for (let i = 0; i < dg.peso; i++) poolTrans.push(dg); });
  const poolPerm = [];
  DIAGNOSTICOS_PERMANENTES.forEach(dg => { for (let i = 0; i < dg.peso; i++) poolPerm.push(dg); });

  const estadosShuffled = [...ESTADOS_POOL].sort(() => Math.random() - 0.5);
  const usados = new Set();

  let batch = db.batch();
  let n = 0;

  for (let i = 0; i < 28; i++) {
    const estudiante = pickEstudianteUnico(cursos, usados);
    if (!estudiante) continue;

    // 65% transitorias, 35% permanentes (proporciones típicas en un colegio)
    const esTransitoria = Math.random() < 0.65;
    const dg = esTransitoria ? pick(poolTrans) : pick(poolPerm);
    const tipoNEE = NEE_TIPO[dg.d];
    const educadora = educadoras[i % educadoras.length];
    const estado = estadosShuffled[i];

    // Adecuaciones: 2-4 por ficha (más para permanentes)
    const cantAdec = esTransitoria ? rand(2, 3) : rand(3, 4);
    const adecuacionesSeleccionadas = pickN(ADECUACIONES_TEMPLATES, cantAdec).map(a => ({
      tipo:  a.tipo,
      texto: a.texto,
      fecha: fechaHace(rand(30, 180)),
      responsable: educadora.nombre
    }));

    const fechaIngreso = fechaHace(rand(60, 400));
    const fechaEgreso  = estado === 'egresado' ? fechaHace(rand(1, 60)) : '';

    const estUid = `${LICEO_SLUG}-${estudiante.cursoId}-est${estudiante.estudianteOrdinal}`;

    const payload = {
      estUid:                estUid,
      liceoSlug:             LICEO_SLUG,
      cursoId:               estudiante.cursoId,
      cursoNombre:           estudiante.cursoNombre,
      estudianteOrdinal:     estudiante.estudianteOrdinal,
      estudianteUid:         estudiante.estudianteUid,
      estudianteNombre:      estudiante.estudianteNombre,
      estudianteRut:         estudiante.estudianteRut,
      diagnostico:           dg.d,
      diagnosticoDetalle:    dg.resumen.slice(0, 120),
      decreto:               DECRETO_POR_TIPO[tipoNEE] || '170_transitoria',
      tipoNEE:               tipoNEE,
      dominios:              dg.dominios,
      adecuaciones:          adecuacionesSeleccionadas,
      educadoraUid:          educadora.uid,
      educadoraNombre:       educadora.nombre,
      profesionalesExternos: pick([
        [{ rol: 'Neurólogo', nombre: 'Dr. Ricardo Salinas', frecuencia: 'trimestral' }],
        [{ rol: 'Psicopedagoga externa', nombre: 'Sra. Marta Cabrera', frecuencia: 'semanal' }],
        [{ rol: 'Fonoaudióloga', nombre: 'Sra. Camila Rojas', frecuencia: 'quincenal' }],
        []
      ]),
      fechaIngresoPIE:       fechaIngreso,
      fechaEgresoPIE:        fechaEgreso,
      estadoPIE:             estado,
      confidencial:          tipoNEE === 'permanente' && Math.random() < 0.3,
      resumenCaso:           dg.resumen,
      actualizadoEn:         isoHace(rand(0, 20)),
      actualizadoPor:        educadora.uid,
      creadoEn:              isoHace(rand(60, 400)),
      creadoPor:             educadora.uid,
      seedTag:               SEED_TAG
    };

    batch.set(db.collection('pie_estudiantes').doc(estUid), payload, { merge: true });
    n++;

    if (n % 400 === 0) { await batch.commit(); batch = db.batch(); }
  }
  if (n % 400 !== 0) await batch.commit();
  console.log(`   ✓ ${n} fichas PIE creadas`);
}

// ═══════════════════════════════════════════════════════════════
async function mostrarResumen() {
  console.log('▶ [3/3] Verificando estado final…');
  const snap = await db.collection('pie_estudiantes')
    .where('liceoSlug', '==', LICEO_SLUG)
    .where('seedTag', '==', SEED_TAG)
    .get();

  const porDiag = {}, porTipo = {}, porEstado = {}, porEdu = {};
  let conAdec = 0;
  snap.forEach(doc => {
    const d = doc.data();
    porDiag[d.diagnostico]   = (porDiag[d.diagnostico] || 0) + 1;
    porTipo[d.tipoNEE]       = (porTipo[d.tipoNEE] || 0) + 1;
    porEstado[d.estadoPIE]   = (porEstado[d.estadoPIE] || 0) + 1;
    porEdu[d.educadoraNombre] = (porEdu[d.educadoraNombre] || 0) + 1;
    if (Array.isArray(d.adecuaciones) && d.adecuaciones.length > 0) conAdec++;
  });

  console.log('');
  console.log('   Total fichas:                    ' + snap.size);
  console.log('   PIE activos:                     ' + (porEstado.activo || 0));
  console.log('   Egresados:                       ' + (porEstado.egresado || 0));
  console.log('   Suspendidos:                     ' + (porEstado.suspendido || 0));
  console.log('   NEE Permanentes:                 ' + (porTipo.permanente || 0));
  console.log('   NEE Transitorias:                ' + (porTipo.transitoria || 0));
  console.log('   Con adecuaciones activas:        ' + conAdec);
  console.log('');
  console.log('   Distribución por DIAGNÓSTICO:');
  Object.entries(porDiag).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(28)} ${v}`));
  console.log('');
  console.log('   Distribución por EDUCADORA:');
  Object.entries(porEdu).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(30)} ${v}`));
}

// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  SEED Coordinación PIE — Salesianos Talca         ║');
  console.log('╚══════════════════════════════════════════════════╝');

  await limpiarPrevios();
  const { educadoras, cursos } = await cargarBase();
  await generarFichas(educadoras, cursos);
  await mostrarResumen();

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  ✅ PIE POBLADO                                   ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Probá con:');
  console.log('  • Coordinadora: pie.coord@salesianos-talca.cl / Demo1234!');
  console.log('  • Educadora 1:  pie.edu1@salesianos-talca.cl  / Demo1234!');
  console.log('  • Educadora 2:  pie.edu2@salesianos-talca.cl  / Demo1234!');
  console.log('  • Educadora 3:  pie.edu3@salesianos-talca.cl  / Demo1234!');
  console.log('');
  console.log('Panel PIE debería mostrar:');
  console.log('  • KPIs: PIE activos ~20, NEE Perm ~10, NEE Trans ~18, Egresados ~5, con adec ~28');
  console.log('  • Gráfico distribución por diagnóstico (TDAH, DEA, TEA, DI, etc.)');
  console.log('  • Lista de 3 educadoras con casos asignados');
  console.log('  • Tabla estudiantes en PIE (28 fichas)');
  console.log('  • Click en ficha → detalle con diagnóstico + adecuaciones');
  console.log('');
  process.exit(0);
}

main().catch(e => { console.error('❌ ERROR:', e); process.exit(1); });
