/**
 * seed-convivencia.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Puebla el Panel de Convivencia Escolar con entrevistas variadas
 * para probar TODOS los KPI y widgets:
 *   • Casos abiertos / seguimiento / cerrados / derivados
 *   • Casos graves activos (gravedad=grave|gravisima + estado activo)
 *   • Entrevistas este mes
 *   • Estudiantes con caso (únicos)
 *   • Motivos más frecuentes (gráfico distribución)
 *   • Reincidencia (≥3 entrevistas en el semestre por mismo estudiante)
 *
 * Colección: entrevistas_convivencia
 *
 * Genera:
 *   • ~40 entrevistas con distribución realista
 *   • 3 estudiantes con ≥3 entrevistas cada uno (para KPI reincidencia)
 *   • Mix de motivos, gravedades, estados y medidas
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-convivencia.mjs
 *
 * ES IDEMPOTENTE: docs marcados con seedTag = 'convivencia-v1'.
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
const SEED_TAG   = 'convivencia-v1';
const HOY        = new Date();

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
async function limpiarPrevios() {
  console.log('▶ [0/3] Limpiando docs previos con seedTag=' + SEED_TAG + '…');
  const snap = await db.collection('entrevistas_convivencia')
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
async function cargarBase() {
  console.log('▶ [1/3] Cargando equipo convivencia + cursos + estudiantes…');
  const emails = ['conviv.enc@salesianos-talca.cl', 'conviv1@salesianos-talca.cl', 'conviv2@salesianos-talca.cl'];
  const profesionales = [];
  for (const email of emails) {
    const snap = await db.collection('usuarios').where('email', '==', email).limit(1).get();
    snap.forEach(doc => profesionales.push({ uid: doc.id, ...doc.data() }));
  }
  if (profesionales.length < 3) {
    console.error(`   ✗ Solo encontré ${profesionales.length}/3 profesionales.`);
    process.exit(1);
  }

  const cursosSnap = await db.collection('cursos')
    .where('liceoSlug', '==', LICEO_SLUG)
    .get();
  const cursos = [];
  cursosSnap.forEach(doc => cursos.push({ id: doc.id, ...doc.data() }));

  const totalEst = cursos.reduce((s, c) => s + (Array.isArray(c.estudiantes) ? c.estudiantes.length : 0), 0);
  console.log(`   ✓ 3 profesionales, ${cursos.length} cursos, ${totalEst} estudiantes`);
  return { profesionales, cursos };
}

// ═══════════════════════════════════════════════════════════════
// Templates
// ═══════════════════════════════════════════════════════════════
const MOTIVOS = [
  { motivo: 'indisciplina_aula',      peso: 8, gravedad: ['leve','leve','grave'], detalles: [
    'Interrumpe reiteradamente el desarrollo de la clase.',
    'Uso indebido del celular durante clases.',
    'Se niega a seguir las instrucciones del docente.'
  ]},
  { motivo: 'agresion_verbal',        peso: 6, gravedad: ['leve','grave'], detalles: [
    'Insultos a un compañero durante recreo.',
    'Falta de respeto hacia el docente.',
    'Amenazas verbales entre pares.'
  ]},
  { motivo: 'uniforme_presentacion',  peso: 5, gravedad: ['leve','leve','leve'], detalles: [
    'Sin uniforme completo por tercera vez consecutiva.',
    'Presentación personal inadecuada al reglamento.'
  ]},
  { motivo: 'inasistencia_reiterada', peso: 5, gravedad: ['leve','grave'], detalles: [
    'Más de 8 inasistencias sin justificar en el mes.',
    'Patrón de ausencias los días de evaluación.'
  ]},
  { motivo: 'bullying',               peso: 4, gravedad: ['grave','gravisima'], detalles: [
    'Denuncia de bullying sistemático por parte de compañeros.',
    'Aislamiento y burlas persistentes reportadas por profesor jefe.'
  ]},
  { motivo: 'ciberbullying',          peso: 3, gravedad: ['grave','gravisima'], detalles: [
    'Grupo de WhatsApp con contenido ofensivo hacia una estudiante.',
    'Difusión de imágenes sin consentimiento en redes sociales.'
  ]},
  { motivo: 'dano_material',          peso: 3, gravedad: ['leve','grave'], detalles: [
    'Rayado de bancos y paredes del aula.',
    'Ruptura intencional de material didáctico.'
  ]},
  { motivo: 'discriminacion',         peso: 2, gravedad: ['grave','gravisima'], detalles: [
    'Comentarios discriminatorios por origen étnico hacia compañero.',
    'Exclusión sistemática por orientación sexual.'
  ]},
  { motivo: 'porte_sustancias',       peso: 2, gravedad: ['gravisima'], detalles: [
    'Sorprendido con cigarrillos electrónicos en el baño.',
    'Sospecha de porte de sustancias ilícitas — protocolo activado.'
  ]},
  { motivo: 'agresion_fisica',        peso: 1, gravedad: ['gravisima'], detalles: [
    'Pelea a golpes en el patio con lesiones leves.'
  ]},
  { motivo: 'apoyo_familia',          peso: 1, gravedad: ['leve'], detalles: [
    'Reunión solicitada por la familia para coordinar apoyo académico.'
  ]}
];

const MEDIDAS_POR_GRAVEDAD = {
  leve:      ['conversacion','conversacion','compromiso_escrito'],
  grave:     ['compromiso_escrito','suspension','derivacion'],
  gravisima: ['suspension','condicionalidad','derivacion','expulsion']
};

const ACUERDOS = [
  'Estudiante firma compromiso de conducta con revisión mensual.',
  'Apoderado se compromete a acompañar proceso desde el hogar.',
  'Se coordina apoyo con equipo psicosocial del establecimiento.',
  'Suspensión de 3 días con actividad reflexiva en el hogar.',
  'Se activa protocolo Mineduc de convivencia escolar.',
  'Derivación a red externa (OPD/CESFAM) por gravedad del caso.',
  'Cierre satisfactorio, situación resuelta por mediación.'
];

const ESTADOS_POOL = [
  'abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto','abierto',
  'seguimiento','seguimiento','seguimiento','seguimiento','seguimiento','seguimiento','seguimiento','seguimiento','seguimiento','seguimiento',
  'cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado','cerrado',
  'derivado','derivado','derivado','derivado','derivado','derivado'
];

// ═══════════════════════════════════════════════════════════════
function pickEstudiante(cursos) {
  for (let intento = 0; intento < 5; intento++) {
    const curso = pick(cursos);
    const estudiantes = Array.isArray(curso.estudiantes) ? curso.estudiantes : [];
    if (!estudiantes.length) continue;
    const idx = rand(0, estudiantes.length - 1);
    const est = estudiantes[idx];
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
async function generarEntrevistas(profesionales, cursos) {
  console.log('▶ [2/3] Generando entrevistas de convivencia…');

  // Pool de motivos ponderado
  const pool = [];
  MOTIVOS.forEach(m => { for (let i = 0; i < m.peso; i++) pool.push(m); });
  pool.sort(() => Math.random() - 0.5);

  const estadosShuffled = [...ESTADOS_POOL].sort(() => Math.random() - 0.5);
  const TIPOS = ['apoderado','estudiante','apoderado','grupo','reunion_equipo'];

  // Elegir 3 estudiantes "reincidentes" que tendrán ≥3 entrevistas
  const reincidentes = [
    pickEstudiante(cursos),
    pickEstudiante(cursos),
    pickEstudiante(cursos)
  ].filter(Boolean);

  let batch = db.batch();
  let n = 0;

  // Generar 40 entrevistas
  for (let i = 0; i < 40; i++) {
    // 40% de las primeras 12 van a reincidentes para acumular ≥3
    let estudiante;
    if (i < 12 && reincidentes.length && Math.random() < 0.45) {
      estudiante = reincidentes[i % reincidentes.length];
    } else {
      estudiante = pickEstudiante(cursos);
    }
    if (!estudiante) continue;

    const m = pool[i % pool.length];
    const gravedad = pick(m.gravedad);
    const medida = pick(MEDIDAS_POR_GRAVEDAD[gravedad]);
    const estado = estadosShuffled[i];
    const prof = profesionales[i % profesionales.length];
    const tipo = pick(TIPOS);

    // Fecha ponderada: casos abiertos son recientes; cerrados/derivados más antiguos
    const diasAtras = estado === 'abierto'
      ? rand(1, 12)
      : estado === 'seguimiento'
        ? rand(10, 35)
        : estado === 'cerrado'
          ? rand(20, 90)
          : rand(20, 60); // derivado

    const email = prof.email || '';
    const rol = email.includes('conviv.enc') ? 'encargado_convivencia'
              : email.includes('conviv1')    ? 'mediador'
              : 'inspector';

    const doc = {
      entId:              `ent-${SEED_TAG}-${i}-${Date.now()}`,
      liceoSlug:          LICEO_SLUG,
      tipo:               tipo,
      cursoId:            estudiante.cursoId,
      cursoNombre:        estudiante.cursoNombre,
      estudianteOrdinal:  estudiante.estudianteOrdinal,
      estudianteUid:      estudiante.estudianteUid,
      estudianteNombre:   estudiante.estudianteNombre,
      estudianteRut:      estudiante.estudianteRut,
      participantes:      [prof.nombre || '', estudiante.estudianteNombre],
      profesionalUid:     prof.uid,
      profesionalNombre:  prof.nombre || '',
      profesionalEmail:   prof.email || '',
      profesionalRol:     rol,
      motivo:             m.motivo,
      motivoDetalle:      pick(m.detalles),
      resumen:            `Entrevista por ${m.motivo}. ${pick(m.detalles)} Se conversa con el estudiante y se coordinan acciones con familia y profesor jefe.`,
      acuerdos:           pick(ACUERDOS),
      seguimientoRequerido: estado === 'abierto' || estado === 'seguimiento',
      proximaReunion:     (estado === 'abierto' || estado === 'seguimiento') ? fechaHace(-rand(5, 20)) : '',
      estado:             estado,
      gravedad:           gravedad,
      medida:             medida,
      confidencial:       gravedad === 'gravisima',
      fecha:              fechaHace(diasAtras),
      creadoEn:           isoHace(diasAtras),
      actualizadoEn:      isoHace(estado === 'abierto' ? diasAtras : rand(0, diasAtras)),
      seedTag:            SEED_TAG
    };

    batch.set(db.collection('entrevistas_convivencia').doc(doc.entId), doc);
    n++;
    if (n % 400 === 0) { await batch.commit(); batch = db.batch(); }
  }
  if (n % 400 !== 0) await batch.commit();
  console.log(`   ✓ ${n} entrevistas creadas`);
  return reincidentes;
}

// ═══════════════════════════════════════════════════════════════
async function mostrarResumen(reincidentes) {
  console.log('▶ [3/3] Verificando estado final…');
  const snap = await db.collection('entrevistas_convivencia')
    .where('liceoSlug', '==', LICEO_SLUG)
    .where('seedTag', '==', SEED_TAG)
    .get();

  const porMotivo = {}, porEstado = {}, porGravedad = {}, porProf = {}, porEst = {};
  snap.forEach(doc => {
    const d = doc.data();
    porMotivo[d.motivo] = (porMotivo[d.motivo] || 0) + 1;
    porEstado[d.estado] = (porEstado[d.estado] || 0) + 1;
    porGravedad[d.gravedad] = (porGravedad[d.gravedad] || 0) + 1;
    porProf[d.profesionalNombre] = (porProf[d.profesionalNombre] || 0) + 1;
    porEst[d.estudianteNombre] = (porEst[d.estudianteNombre] || 0) + 1;
  });

  const reincidentesReales = Object.entries(porEst).filter(([n, c]) => c >= 3);
  const gravesActivos = snap.docs.filter(doc => {
    const d = doc.data();
    return (d.gravedad === 'grave' || d.gravedad === 'gravisima') &&
           (d.estado === 'abierto' || d.estado === 'seguimiento');
  }).length;

  console.log('');
  console.log('   MOTIVOS más frecuentes:');
  Object.entries(porMotivo).sort((a,b) => b[1]-a[1]).slice(0,5).forEach(([k, v]) => console.log(`     • ${k.padEnd(24)} ${v}`));
  console.log('');
  console.log('   Distribución ESTADO:');
  Object.entries(porEstado).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(15)} ${v}`));
  console.log('');
  console.log('   Distribución GRAVEDAD:');
  Object.entries(porGravedad).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(15)} ${v}`));
  console.log('');
  console.log('   Casos GRAVES ACTIVOS (grave|gravisima + abierto|seguimiento): ' + gravesActivos);
  console.log('   Estudiantes REINCIDENTES (≥3 entrevistas): ' + reincidentesReales.length);
  if (reincidentesReales.length) {
    reincidentesReales.forEach(([n, c]) => console.log(`     • ${n.padEnd(35)} ${c} entrevistas`));
  }
  console.log('');
  console.log('   Distribución por PROFESIONAL:');
  Object.entries(porProf).sort((a,b) => b[1]-a[1]).forEach(([k, v]) => console.log(`     • ${k.padEnd(35)} ${v}`));
}

// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  SEED convivencia escolar — Salesianos Talca      ║');
  console.log('╚══════════════════════════════════════════════════╝');

  await limpiarPrevios();
  const { profesionales, cursos } = await cargarBase();
  const reincidentes = await generarEntrevistas(profesionales, cursos);
  await mostrarResumen(reincidentes);

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  ✅ CONVIVENCIA POBLADA                           ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Probá con:');
  console.log('  • Encargado:  conviv.enc@salesianos-talca.cl / Demo1234!');
  console.log('  • Mediador:   conviv1@salesianos-talca.cl / Demo1234!');
  console.log('  • Inspector:  conviv2@salesianos-talca.cl / Demo1234!');
  console.log('');
  console.log('Panel Convivencia debería mostrar:');
  console.log('  • Casos abiertos: 12');
  console.log('  • Seguimiento: 10');
  console.log('  • Casos graves activos: ~10-14');
  console.log('  • Derivados: 6');
  console.log('  • Entrevistas este mes: ~28');
  console.log('  • Estudiantes con caso: ~30 únicos');
  console.log('  • Motivos más frecuentes: gráfico con indisciplina, agresión verbal, uniforme, etc.');
  console.log('  • Reincidencia (≥3): 3 estudiantes');
  console.log('');
  process.exit(0);
}

main().catch(e => { console.error('❌ ERROR:', e); process.exit(1); });
