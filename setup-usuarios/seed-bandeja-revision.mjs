/**
 * seed-bandeja-revision.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Puebla la Bandeja de Revisión del UTP con planificaciones y materiales
 * en distintos estados del flujo de aprobación.
 *
 * Estados usados por el sistema:
 *   • enviada       → Esperando revisor
 *   • en_revision   → Tomada por UTP, en curso
 *   • aprobada      → Aprobada (últimos 7 días para que salga en KPI "APROBADAS 7D")
 *   • devuelta      → Devuelta con feedback (últimos 7 días)
 *
 * Genera:
 *   • 8 planificaciones nuevas: 3 esperando, 2 en revisión, 2 aprobadas, 1 devuelta
 *   • 12 materiales nuevos:     4 esperando, 3 en revisión, 3 aprobadas, 2 devueltas
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-bandeja-revision.mjs
 *
 * ES IDEMPOTENTE: docs marcados con seedTag = 'bandeja-v1'.
 * Al re-correr, borra los previos y regenera.
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
const SEED_TAG   = 'bandeja-v1';
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
  const cols = ['planificaciones', 'materiales'];
  let borrados = 0;
  for (const col of cols) {
    const snap = await db.collection(col).where('seedTag', '==', SEED_TAG).limit(500).get();
    let batch = db.batch(); let n = 0;
    snap.forEach(d => { batch.delete(d.ref); n++; });
    if (n > 0) await batch.commit();
    borrados += snap.size;
  }
  console.log(`   ✓ ${borrados} docs previos borrados`);
}

// ═══════════════════════════════════════════════════════════════
// Cargar profes y UTPs del liceo
// ═══════════════════════════════════════════════════════════════
async function cargarPersonas() {
  console.log('▶ [1/3] Cargando profes + UTPs del liceo…');
  const snap = await db.collection('usuarios')
    .where('liceoSlug', '==', LICEO_SLUG)
    .get();
  const profes = [];
  const utps = [];
  snap.forEach(doc => {
    const d = { uid: doc.id, ...doc.data() };
    if (d.role === 'profesor') profes.push(d);
    else if (d.role === 'utp' || d.role === 'director' || d.role === 'rector') utps.push(d);
  });
  console.log(`   ✓ ${profes.length} profes + ${utps.length} revisores`);
  return { profes, utps };
}

// ═══════════════════════════════════════════════════════════════
// Definir templates de contenido
// ═══════════════════════════════════════════════════════════════
const TITULOS_PLAN = [
  'Unidad 3: Producción escrita — Ensayo argumentativo',
  'Unidad 2: Ecuaciones de segundo grado y aplicaciones',
  'Unidad 4: Chile en el siglo XXI — Democracia y participación',
  'Unit 4: Global issues in the modern world',
  'Unidad 3: Ecosistemas y sostenibilidad',
  'Unidad 5: Termodinámica — Primera ley',
  'Módulo EL3: Sistemas de iluminación domiciliaria',
  'Módulo EN4: Microcontroladores aplicados',
  'Unidad 2: Danza y expresión corporal',
  'Unidad 4: Filosofía política contemporánea',
  'Unidad 3: Reacciones ácido-base',
  'Unidad 1: Álgebra vectorial'
];

const TITULOS_MAT = [
  { titulo: 'Guía de ejercicios — Ecuaciones cuadráticas', tipo: 'guia' },
  { titulo: 'Prueba unidad 2 — Sistema respiratorio', tipo: 'prueba' },
  { titulo: 'Rúbrica — Ensayo argumentativo', tipo: 'rubrica' },
  { titulo: 'Guía de comprensión lectora — Poesía chilena', tipo: 'guia' },
  { titulo: 'Actividad grupal — Análisis de fuentes históricas', tipo: 'actividad' },
  { titulo: 'Evaluación semestral — Inglés 3M', tipo: 'evaluacion' },
  { titulo: 'Guía práctica — Resolución de sistemas', tipo: 'guia' },
  { titulo: 'Apunte — Introducción a la genética', tipo: 'apunte' },
  { titulo: 'Prueba diagnóstica — Cinemática', tipo: 'prueba' },
  { titulo: 'Guía TP — Circuitos serie y paralelo', tipo: 'guia' },
  { titulo: 'Rúbrica — Presentación oral en inglés', tipo: 'rubrica' },
  { titulo: 'Guía complementaria — Filosofía moderna', tipo: 'guia' },
  { titulo: 'Actividad de refuerzo — Números racionales', tipo: 'actividad' },
  { titulo: 'Evaluación formativa — Biología celular', tipo: 'evaluacion' },
  { titulo: 'Guía TP electrónica — Osciloscopio', tipo: 'guia' },
  { titulo: 'Apunte — Termodinámica aplicada', tipo: 'apunte' }
];

const FEEDBACK_APROBACION = [
  'Aprobado. Excelente estructura y correcta alineación curricular.',
  'Aprobado. Considerar añadir más ejemplos de aplicación práctica en próxima versión.',
  'Aprobado. Muy buen trabajo, cumple con todos los criterios evaluados.'
];
const FEEDBACK_DEVOLUCION = [
  'Se solicita ajustar la ponderación de las evaluaciones y agregar la rúbrica de puntaje.',
  'Falta explicitar los indicadores de logro para cada actividad. Por favor revisar y reenviar.',
  'La secuencia didáctica requiere mayor progresión. Sugerimos incorporar actividades de refuerzo.'
];

// ═══════════════════════════════════════════════════════════════
// Generar planificaciones con distintos estados
// ═══════════════════════════════════════════════════════════════
async function generarPlanificaciones(profes, utps) {
  console.log('▶ [2/3] Generando planificaciones con estados variados…');

  // Distribución: 3 enviadas, 2 en_revision, 2 aprobadas, 1 devuelta
  const distribucion = [
    { estado: 'enviada',     cantidad: 3, diasAtras: [1, 2, 3] },
    { estado: 'en_revision', cantidad: 2, diasAtras: [4, 5] },
    { estado: 'aprobada',    cantidad: 2, diasAtras: [1, 3] },
    { estado: 'devuelta',    cantidad: 1, diasAtras: [2] }
  ];

  let n = 0;
  let idxTitulo = 0;
  let batch = db.batch();

  for (const bloque of distribucion) {
    for (let i = 0; i < bloque.cantidad; i++) {
      const autor = pick(profes);
      if (!autor) continue;
      const titulo = TITULOS_PLAN[idxTitulo % TITULOS_PLAN.length];
      idxTitulo++;
      const diasAtras = bloque.diasAtras[i % bloque.diasAtras.length];
      const revisor = bloque.estado !== 'enviada' ? pick(utps) : null;

      const doc = {
        titulo,
        tipo:            'planificacion',
        asignatura:      pick(autor.asignaturas || ['general']) || 'general',
        nivel:           pick(autor.niveles || ['3M']) || '3M',
        horas:           rand(30, 60),
        autorUid:        autor.uid,
        autorNombre:     autor.nombre,
        profesor:        autor.email,
        uid:             autor.uid,       // compat legacy
        liceoSlug:       LICEO_SLUG,
        estado:          bloque.estado,
        enviadoEn:       isoHace(diasAtras),
        estadoFecha:     isoHace(bloque.estado === 'aprobada' || bloque.estado === 'devuelta' ? 0 : diasAtras),
        revisorUid:      revisor?.uid || null,
        revisorNombre:   revisor?.nombre || null,
        comentarioRevisor:
          bloque.estado === 'aprobada' ? pick(FEEDBACK_APROBACION)
          : bloque.estado === 'devuelta' ? pick(FEEDBACK_DEVOLUCION)
          : bloque.estado === 'en_revision' ? 'En revisión por UTP…'
          : '',
        contenido:       `Planificación pedagógica: ${titulo}\n\nObjetivo: Desarrollar habilidades de análisis y síntesis alineadas al currículum MINEDUC.\n\nActividades: 1) Motivación inicial. 2) Desarrollo. 3) Evaluación formativa. 4) Cierre metacognitivo.`,
        curso:           pick(autor.niveles || ['3M']) || '3M',
        fechaClase:      fechaHace(rand(-15, 30)),
        seedTag:         SEED_TAG,
        creadoEn:        admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(db.collection('planificaciones').doc(), doc);
      n++;
    }
  }
  await batch.commit();
  console.log(`   ✓ ${n} planificaciones creadas (3 esperando, 2 en revisión, 2 aprobadas 7D, 1 devuelta 7D)`);
}

// ═══════════════════════════════════════════════════════════════
// Generar materiales con distintos estados
// ═══════════════════════════════════════════════════════════════
async function generarMateriales(profes, utps) {
  console.log('▶ [3/3] Generando materiales didácticos con estados variados…');

  const distribucion = [
    { estado: 'enviada',     cantidad: 4, diasAtras: [1, 1, 2, 3] },
    { estado: 'en_revision', cantidad: 3, diasAtras: [2, 3, 4] },
    { estado: 'aprobada',    cantidad: 3, diasAtras: [1, 2, 4] },
    { estado: 'devuelta',    cantidad: 2, diasAtras: [1, 3] }
  ];

  let n = 0;
  let idx = 0;
  let batch = db.batch();

  for (const bloque of distribucion) {
    for (let i = 0; i < bloque.cantidad; i++) {
      const autor = pick(profes);
      if (!autor) continue;
      const template = TITULOS_MAT[idx % TITULOS_MAT.length];
      idx++;
      const diasAtras = bloque.diasAtras[i % bloque.diasAtras.length];
      const revisor = bloque.estado !== 'enviada' ? pick(utps) : null;

      const doc = {
        titulo:         template.titulo,
        tipo:           template.tipo,
        asignatura:     pick(autor.asignaturas || ['general']) || 'general',
        nivel:          pick(autor.niveles || ['3M']) || '3M',
        autorUid:       autor.uid,
        autorNombre:    autor.nombre,
        uid:            autor.uid,
        liceoSlug:      LICEO_SLUG,
        visibilidad:    'liceo',
        estado:         bloque.estado,
        enviadoEn:      isoHace(diasAtras),
        estadoFecha:    isoHace(bloque.estado === 'aprobada' || bloque.estado === 'devuelta' ? 0 : diasAtras),
        revisorUid:     revisor?.uid || null,
        revisorNombre:  revisor?.nombre || null,
        comentarioRevisor:
          bloque.estado === 'aprobada' ? pick(FEEDBACK_APROBACION)
          : bloque.estado === 'devuelta' ? pick(FEEDBACK_DEVOLUCION)
          : bloque.estado === 'en_revision' ? 'En revisión por UTP…'
          : '',
        contenido:      `<h2>${template.titulo}</h2><p>Material didáctico para la asignatura, alineado a los OA MINEDUC. Incluye instrucciones, ejercicios y solucionario.</p>`,
        curso:          pick(autor.niveles || ['3M']) || '3M',
        seedTag:        SEED_TAG,
        creadoEn:       admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(db.collection('materiales').doc(), doc);
      n++;
    }
  }
  await batch.commit();
  console.log(`   ✓ ${n} materiales creados (4 esperando, 3 en revisión, 3 aprobadas 7D, 2 devueltas 7D)`);
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  SEED bandeja de revisión — Salesianos Talca      ║');
  console.log('╚══════════════════════════════════════════════════╝');

  await limpiarPrevios();
  const { profes, utps } = await cargarPersonas();
  if (!profes.length) { console.error('❌ No hay profesores.'); process.exit(1); }
  if (!utps.length)   { console.error('❌ No hay UTPs/directores.'); process.exit(1); }

  await generarPlanificaciones(profes, utps);
  await generarMateriales(profes, utps);

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  ✅ BANDEJA POBLADA                               ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Ahora podés probar con utp1@salesianos-talca.cl / Demo1234!');
  console.log('  • KPI "Esperando revisor":  7  (3 plan + 4 mat)');
  console.log('  • KPI "En revisión":        5  (2 plan + 3 mat)');
  console.log('  • KPI "Aprobadas (7D)":     5  (2 plan + 3 mat)');
  console.log('  • KPI "Devueltas (7D)":     3  (1 plan + 2 mat)');
  console.log('');
  console.log('Filtros para explorar:');
  console.log('  1. Tipo="Material didáctico" + Estado="Esperando revisor" → 4 items');
  console.log('  2. Tipo="Planificación" + Estado="En revisión" → 2 items');
  console.log('  3. Click en un item → abrir modal de aprobación con botones');
  console.log('');
  process.exit(0);
}

main().catch(e => { console.error('❌ ERROR:', e); process.exit(1); });
