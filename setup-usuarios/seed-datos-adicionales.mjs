/**
 * seed-datos-adicionales.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Enriquece el colegio demo `salesianos-talca` con datos densos y realistas
 * para probar TODOS los dashboards, estadísticas, alertas y flujos.
 *
 * Complementa el seed original (seed-colegio-demo.mjs).
 *
 * Genera:
 *   • Asistencia densa: últimos 60 días laborables por curso
 *     (con 2-3 alumnos "casos" de asistencia crítica por curso)
 *   • Notas completas por asignatura (6 evaluaciones × alumno × asignatura)
 *     (con 2-3 casos de rendimiento en riesgo + 1-2 destacados por curso)
 *   • 60 anotaciones variadas (positivas, académicas, comportamiento, apoyo)
 *   • 30 alertas apoderado (pendientes, respondidas, escaladas)
 *   • 25 derivaciones (abiertas, en proceso, cerradas) circuito completo
 *   • 15 clases del libro registradas con OA + actividades
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-datos-adicionales.mjs
 *
 * ES IDEMPOTENTE: los docs se marcan con `seedTag: 'adicional-v1'`.
 * Al re-correr, primero borra los que tienen ese tag y regenera.
 *
 * Requisitos:
 *   • gcloud auth application-default login --project=electrolearn-prod
 *   • O serviceAccountKey.json de electrolearn-prod en esta carpeta
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'node:fs';

// ═══════════════════════════════════════════════════════════════
// Autenticación híbrida
// ═══════════════════════════════════════════════════════════════
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
      console.log('▸ serviceAccountKey.json es de otro proyecto, uso ADC');
      initOpts.credential = admin.credential.applicationDefault();
    }
  } catch (e) {
    initOpts.credential = admin.credential.applicationDefault();
  }
} else {
  initOpts.credential = admin.credential.applicationDefault();
}
admin.initializeApp(initOpts);
const db = admin.firestore();

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
const LICEO_SLUG = 'salesianos-talca';
const SEED_TAG   = 'adicional-v1';
const HOY        = new Date();
const DIAS_ASISTENCIA = 60;   // últimos 60 días laborables

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
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
function esFinDeSemana(fechaISO) {
  const d = new Date(fechaISO + 'T12:00:00');
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}
// Nota realista basada en un promedio y varianza
function notaAleatoria(promedioBase = 5.5, varianza = 0.8) {
  const n = promedioBase + (Math.random() - 0.5) * 2 * varianza;
  const nRedondeada = Math.round(n * 10) / 10;
  return Math.max(1.0, Math.min(7.0, nRedondeada));
}

// ═══════════════════════════════════════════════════════════════
// BORRAR DOCS PREVIOS CON EL MISMO TAG (idempotencia)
// ═══════════════════════════════════════════════════════════════
async function limpiarDocsPrevios() {
  console.log('▶ [0/6] Limpiando docs previos con seedTag=' + SEED_TAG + '…');
  const cols = ['asistencia', 'notas', 'anotaciones', 'alertas', 'derivaciones', 'libro_clases'];
  let borrados = 0;
  for (const col of cols) {
    try {
      const snap = await db.collection(col)
        .where('seedTag', '==', SEED_TAG)
        .limit(2000)
        .get();
      const batches = [];
      let batch = db.batch();
      let n = 0;
      snap.forEach(doc => {
        batch.delete(doc.ref);
        n++;
        if (n >= 400) { batches.push(batch); batch = db.batch(); n = 0; }
      });
      if (n > 0) batches.push(batch);
      for (const b of batches) await b.commit();
      borrados += snap.size;
    } catch (e) {
      console.warn(`   ⚠ ${col}: ${e.message}`);
    }
  }
  console.log(`   ✓ ${borrados} docs previos borrados`);
}

// ═══════════════════════════════════════════════════════════════
// CARGAR CURSOS, ESTUDIANTES Y PROFES
// ═══════════════════════════════════════════════════════════════
async function cargarBase() {
  console.log('▶ [1/6] Cargando cursos + estudiantes + profes existentes…');

  const cursosSnap = await db.collection('cursos')
    .where('liceoSlug', '==', LICEO_SLUG)
    .get();

  const cursos = [];
  const estudiantesPorCurso = {};

  cursosSnap.forEach(doc => {
    const c = { id: doc.id, ...doc.data() };
    cursos.push(c);
    // Los estudiantes están DENTRO del doc del curso (array)
    estudiantesPorCurso[c.id] = Array.isArray(c.estudiantes) ? c.estudiantes : [];
  });

  const profesSnap = await db.collection('usuarios')
    .where('liceoSlug', '==', LICEO_SLUG)
    .where('role', '==', 'profesor')
    .get();

  const profes = [];
  profesSnap.forEach(doc => {
    profes.push({ uid: doc.id, ...doc.data() });
  });

  console.log(`   ✓ ${cursos.length} cursos, ` +
              `${Object.values(estudiantesPorCurso).reduce((a, b) => a + b.length, 0)} estudiantes, ` +
              `${profes.length} profes`);
  return { cursos, estudiantesPorCurso, profes };
}

// ═══════════════════════════════════════════════════════════════
// PASO 2: ASISTENCIA DENSA
// ═══════════════════════════════════════════════════════════════
async function generarAsistencia(cursos, estudiantesPorCurso, profes) {
  console.log(`▶ [2/6] Generando asistencia densa (últimos ${DIAS_ASISTENCIA} días laborables)…`);

  let totalRegistros = 0;
  let totalDias = 0;

  for (const c of cursos) {
    const estudiantes = estudiantesPorCurso[c.id] || [];
    if (!estudiantes.length) continue;

    // Elegir 2-3 alumnos que serán "casos de asistencia crítica"
    const casosCriticos = pickN(estudiantes, rand(2, 3)).map(e => e.uid);

    // Elegir 1 profesor (el jefe de curso)
    const profeUid = c.jefeUid || (profes[0] && profes[0].uid);

    let batch = db.batch();
    let opsBatch = 0;

    for (let i = 0; i < DIAS_ASISTENCIA; i++) {
      const fecha = fechaHace(i);
      if (esFinDeSemana(fecha)) continue;
      totalDias++;

      // Un doc de asistencia por curso × día
      const asistId = `${c.id}_${fecha}`.replace(/[.\-\s]/g, '_');
      const registros = estudiantes.map(est => {
        const esCritico = casosCriticos.includes(est.uid);
        // 85% de asistencia normal, 65% para críticos
        const probPresente = esCritico ? 0.65 : 0.90;
        const r = Math.random();
        let estado;
        if (r < probPresente) estado = 'presente';
        else if (r < probPresente + 0.08) estado = 'atrasado';
        else if (r < probPresente + 0.14) estado = 'justificado';
        else estado = 'ausente';

        return {
          uid: est.uid,
          nombre: est.nombre,
          estado,
          justificacion: estado === 'justificado' ? pick(['Certificado médico', 'Motivo familiar', 'Trámite']) : ''
        };
      });

      const doc = {
        cursoId:    c.id,
        cursoNombre: c.nombreCompleto || `${c.nivel}${c.letra}`,
        liceoSlug:  LICEO_SLUG,
        fecha,
        profesorUid: profeUid,
        registros,
        totalPresente:    registros.filter(r => r.estado === 'presente').length,
        totalAtrasado:    registros.filter(r => r.estado === 'atrasado').length,
        totalAusente:     registros.filter(r => r.estado === 'ausente').length,
        totalJustificado: registros.filter(r => r.estado === 'justificado').length,
        seedTag: SEED_TAG,
        creadoEn: admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(db.collection('asistencia').doc(asistId), doc, { merge: true });
      opsBatch++;
      totalRegistros++;

      if (opsBatch >= 400) {
        await batch.commit();
        batch = db.batch();
        opsBatch = 0;
      }
    }
    if (opsBatch > 0) await batch.commit();
  }
  console.log(`   ✓ ${totalRegistros} días × curso registrados (~${totalDias / cursos.length | 0} días por curso)`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 3: NOTAS COMPLETAS
// ═══════════════════════════════════════════════════════════════
async function generarNotas(cursos, estudiantesPorCurso) {
  console.log('▶ [3/6] Generando notas completas (6 evaluaciones × asignatura × alumno)…');

  const EVALUACIONES = [
    'Diagnóstica inicial',
    'Control 1',
    'Trabajo unidad 1',
    'Prueba unidad 1',
    'Control 2',
    'Prueba semestral'
  ];

  let totalDocs = 0;

  for (const c of cursos) {
    const estudiantes = estudiantesPorCurso[c.id] || [];
    if (!estudiantes.length) continue;

    const asignaturas = Array.isArray(c.asignaturasAsignadas) ? c.asignaturasAsignadas : [];
    if (!asignaturas.length) continue;

    // Elegir alumnos "perfil pedagógico" para hacer notas realistas
    const enRiesgo   = pickN(estudiantes, rand(2, 3)).map(e => e.uid);
    const destacados = pickN(estudiantes.filter(e => !enRiesgo.includes(e.uid)), 2).map(e => e.uid);

    let batch = db.batch();
    let opsBatch = 0;

    for (const asig of asignaturas) {
      for (let evIdx = 0; evIdx < EVALUACIONES.length; evIdx++) {
        const evalNombre = EVALUACIONES[evIdx];
        const fecha = fechaHace(DIAS_ASISTENCIA - (evIdx * 10));
        // Un doc por evaluación con las notas de todos los alumnos del curso
        const evalId = `${c.id}_${asig.asignatura}_ev${evIdx + 1}`.replace(/[.\-\s]/g, '_');

        const notasAlumnos = estudiantes.map(est => {
          let base = 5.5;
          if (enRiesgo.includes(est.uid))   base = 3.6;   // casos en riesgo
          if (destacados.includes(est.uid)) base = 6.4;   // destacados
          return {
            uid: est.uid,
            nombre: est.nombre,
            nota: notaAleatoria(base, 0.6)
          };
        });

        const doc = {
          cursoId:      c.id,
          cursoNombre:  c.nombreCompleto || `${c.nivel}${c.letra}`,
          asignatura:   asig.asignatura,
          docenteUid:   asig.docenteUid || '',
          docenteNombre: asig.docenteNombre || '',
          liceoSlug:    LICEO_SLUG,
          nombre:       evalNombre,
          fecha,
          ponderacion:  20, // % del semestre
          notas:        notasAlumnos,
          promedio:     Math.round((notasAlumnos.reduce((a, n) => a + n.nota, 0) / notasAlumnos.length) * 10) / 10,
          seedTag:      SEED_TAG,
          creadoEn:     admin.firestore.FieldValue.serverTimestamp()
        };

        batch.set(db.collection('notas').doc(evalId), doc, { merge: true });
        opsBatch++;
        totalDocs++;

        if (opsBatch >= 400) { await batch.commit(); batch = db.batch(); opsBatch = 0; }
      }
    }
    if (opsBatch > 0) await batch.commit();
  }
  console.log(`   ✓ ${totalDocs} sets de notas generados`);
}

// ═══════════════════════════════════════════════════════════════
// PASO 4: ANOTACIONES VARIADAS
// ═══════════════════════════════════════════════════════════════
async function generarAnotaciones(cursos, estudiantesPorCurso, profes) {
  console.log('▶ [4/6] Generando 60 anotaciones variadas…');

  const TIPOS = [
    { tipo: 'positiva',      texto: 'Excelente participación en clase y ayudó a sus compañeros con dudas.' },
    { tipo: 'positiva',      texto: 'Entrega puntual y de gran calidad en el trabajo grupal.' },
    { tipo: 'positiva',      texto: 'Destaca por su liderazgo y actitud colaborativa.' },
    { tipo: 'academica',     texto: 'Presenta dificultades para seguir el ritmo de la clase. Se recomienda apoyo.' },
    { tipo: 'academica',     texto: 'Muestra mejora sostenida en la comprensión de los OA de la unidad.' },
    { tipo: 'academica',     texto: 'No entregó el trabajo asignado dentro del plazo.' },
    { tipo: 'comportamiento', texto: 'Interrumpe reiteradamente el desarrollo de la clase.' },
    { tipo: 'comportamiento', texto: 'Conflicto con compañero durante el recreo. Conversado y resuelto.' },
    { tipo: 'comportamiento', texto: 'Uso indebido del celular durante la evaluación.' },
    { tipo: 'apoyo',         texto: 'Se detecta necesidad de apoyo psicosocial. Derivación en curso.' },
    { tipo: 'apoyo',         texto: 'Situación familiar compleja, se coordina reunión con apoderado.' }
  ];

  let batch = db.batch();
  let ops = 0;

  for (let i = 0; i < 60; i++) {
    const curso = pick(cursos);
    const estudiantes = estudiantesPorCurso[curso.id] || [];
    if (!estudiantes.length) continue;

    const alumno = pick(estudiantes);
    const t = pick(TIPOS);
    const profe = pick(profes);
    const fecha = fechaHace(rand(1, DIAS_ASISTENCIA));

    const doc = {
      cursoId:       curso.id,
      cursoNombre:   curso.nombreCompleto || `${curso.nivel}${curso.letra}`,
      alumnoUid:     alumno.uid,
      alumnoNombre:  alumno.nombre,
      tipo:          t.tipo,
      texto:         t.texto,
      profesorUid:   profe.uid,
      profesorNombre: profe.nombre,
      liceoSlug:     LICEO_SLUG,
      fecha,
      leida:         Math.random() > 0.4,
      seedTag:       SEED_TAG,
      creadoEn:      admin.firestore.FieldValue.serverTimestamp()
    };
    batch.set(db.collection('anotaciones').doc(), doc);
    ops++;
    if (ops >= 400) { await batch.commit(); batch = db.batch(); ops = 0; }
  }
  if (ops > 0) await batch.commit();
  console.log('   ✓ 60 anotaciones creadas');
}

// ═══════════════════════════════════════════════════════════════
// PASO 5: ALERTAS APODERADO
// ═══════════════════════════════════════════════════════════════
async function generarAlertas(cursos, estudiantesPorCurso, profes) {
  console.log('▶ [5/6] Generando 30 alertas apoderado (varios estados)…');

  const MOTIVOS = [
    { m: 'Inasistencias reiteradas',        d: 'El estudiante presenta más de 5 inasistencias sin justificar en el mes.' },
    { m: 'Bajo rendimiento académico',      d: 'Promedio actual bajo 4.0 en más de una asignatura.' },
    { m: 'Comportamiento en clases',        d: 'Anotaciones reiteradas por interrupción del desarrollo de clases.' },
    { m: 'Tareas no entregadas',            d: 'No ha entregado 3 tareas consecutivas.' },
    { m: 'Reunión de apoderados',           d: 'Convocatoria a reunión de apoderados del curso.' },
    { m: 'Felicitación por logro',          d: 'Reconocimiento por destacado desempeño en evaluación.' }
  ];
  const ESTADOS = ['pendiente', 'pendiente', 'pendiente', 'respondida', 'respondida', 'escalada'];

  let batch = db.batch();
  let ops = 0;

  for (let i = 0; i < 30; i++) {
    const curso = pick(cursos);
    const estudiantes = estudiantesPorCurso[curso.id] || [];
    if (!estudiantes.length) continue;

    const alumno = pick(estudiantes);
    const motivo = pick(MOTIVOS);
    const profe  = pick(profes);
    const estado = pick(ESTADOS);
    const fecha  = fechaHace(rand(1, 30));

    const doc = {
      cursoId:       curso.id,
      cursoNombre:   curso.nombreCompleto || `${curso.nivel}${curso.letra}`,
      alumnoUid:     alumno.uid,
      alumnoNombre:  alumno.nombre,
      apoderadoNombre:  alumno.apoderado && alumno.apoderado.nombre || 'Apoderado',
      apoderadoTelefono: alumno.apoderado && alumno.apoderado.telefono || '',
      apoderadoEmail:    alumno.apoderado && alumno.apoderado.email || '',
      motivo:        motivo.m,
      descripcion:   motivo.d,
      estado,
      profesorUid:   profe.uid,
      profesorNombre: profe.nombre,
      liceoSlug:     LICEO_SLUG,
      fechaEnvio:    fecha,
      fechaRespuesta: (estado === 'respondida' || estado === 'escalada') ? fechaHace(rand(0, 5)) : null,
      respuesta:     (estado === 'respondida') ? 'Muchas gracias por informar, conversaremos con nuestro/a hijo/a en casa.' :
                     (estado === 'escalada')   ? 'Solicito reunión presencial urgente. No hemos podido comunicarnos.' : '',
      canal:         pick(['whatsapp', 'email', 'llamada']),
      seedTag:       SEED_TAG,
      creadoEn:      admin.firestore.FieldValue.serverTimestamp()
    };
    batch.set(db.collection('alertas').doc(), doc);
    ops++;
    if (ops >= 400) { await batch.commit(); batch = db.batch(); ops = 0; }
  }
  if (ops > 0) await batch.commit();
  console.log('   ✓ 30 alertas creadas (15 pendientes, 10 respondidas, 5 escaladas)');
}

// ═══════════════════════════════════════════════════════════════
// PASO 6: DERIVACIONES CIRCUITO COMPLETO
// ═══════════════════════════════════════════════════════════════
async function generarDerivaciones(cursos, estudiantesPorCurso, profes) {
  console.log('▶ [6/6] Generando 25 derivaciones (circuito completo)…');

  const DERIVS = [
    { destino: 'apoyo',       motivo: 'Sospecha de vulneración de derechos',    urgencia: 'alta' },
    { destino: 'apoyo',       motivo: 'Sintomatología ansiosa recurrente',      urgencia: 'media' },
    { destino: 'apoyo',       motivo: 'Duelo por pérdida familiar',             urgencia: 'alta' },
    { destino: 'apoyo',       motivo: 'Baja autoestima persistente',            urgencia: 'media' },
    { destino: 'convivencia', motivo: 'Bullying entre pares',                    urgencia: 'alta' },
    { destino: 'convivencia', motivo: 'Conflicto reiterado con compañeros',      urgencia: 'media' },
    { destino: 'convivencia', motivo: 'Uso indebido de RRSS entre estudiantes',  urgencia: 'media' },
    { destino: 'pie',         motivo: 'Sospecha de TEA (Trastorno Espectro Autista)', urgencia: 'media' },
    { destino: 'pie',         motivo: 'Dificultades específicas de aprendizaje',      urgencia: 'media' },
    { destino: 'pie',         motivo: 'Adecuación curricular por TDAH',              urgencia: 'baja' }
  ];
  const ESTADOS = [
    'abierta','abierta','abierta','abierta','abierta',
    'en_proceso','en_proceso','en_proceso','en_proceso','en_proceso',
    'en_proceso','en_proceso','en_proceso','en_proceso','en_proceso',
    'cerrada','cerrada','cerrada','cerrada','cerrada',
    'cerrada','cerrada','cerrada','cerrada','cerrada'
  ];

  let batch = db.batch();
  let ops = 0;

  for (let i = 0; i < 25; i++) {
    const curso = pick(cursos);
    const estudiantes = estudiantesPorCurso[curso.id] || [];
    if (!estudiantes.length) continue;

    const alumno = pick(estudiantes);
    const d      = pick(DERIVS);
    const profe  = pick(profes);
    const estado = ESTADOS[i];
    const fechaCreacion = fechaHace(rand(15, 55));

    const historial = [
      {
        fecha: fechaCreacion,
        actor: profe.nombre,
        actorUid: profe.uid,
        rol: 'profesor',
        accion: 'creación',
        nota: `Derivo por: ${d.motivo}`
      }
    ];

    if (estado === 'en_proceso' || estado === 'cerrada') {
      historial.push({
        fecha: fechaHace(rand(5, 15)),
        actor: 'Equipo ' + d.destino,
        rol: d.destino,
        accion: 'tomada',
        nota: 'Se agenda primera entrevista con el estudiante y apoderado.'
      });
    }
    if (estado === 'cerrada') {
      historial.push({
        fecha: fechaHace(rand(1, 4)),
        actor: 'Equipo ' + d.destino,
        rol: d.destino,
        accion: 'cierre',
        nota: pick([
          'Caso resuelto satisfactoriamente. Se realizará seguimiento mensual.',
          'Derivado a red externa. Seguimiento coordinado con especialista.',
          'Situación resuelta por mediación familiar. Caso cerrado.',
          'Se implementó plan de acompañamiento con evaluación positiva.'
        ])
      });
    }

    const doc = {
      cursoId:       curso.id,
      cursoNombre:   curso.nombreCompleto || `${curso.nivel}${curso.letra}`,
      alumnoUid:     alumno.uid,
      alumnoNombre:  alumno.nombre,
      derivadoPorUid:   profe.uid,
      derivadoPorNombre: profe.nombre,
      destino:       d.destino,
      motivo:        d.motivo,
      descripcion:   d.motivo + '. Se requiere apoyo del equipo especialista para acompañamiento.',
      urgencia:      d.urgencia,
      estado,
      historial,
      liceoSlug:     LICEO_SLUG,
      fechaCreacion,
      fechaCierre:   estado === 'cerrada' ? historial[historial.length - 1].fecha : null,
      seedTag:       SEED_TAG,
      creadoEn:      admin.firestore.FieldValue.serverTimestamp()
    };
    batch.set(db.collection('derivaciones').doc(), doc);
    ops++;
    if (ops >= 400) { await batch.commit(); batch = db.batch(); ops = 0; }
  }
  if (ops > 0) await batch.commit();
  console.log('   ✓ 25 derivaciones (5 abiertas, 10 en proceso, 10 cerradas)');
}

// ═══════════════════════════════════════════════════════════════
// PASO 7: LIBRO DE CLASES (15 clases registradas)
// ═══════════════════════════════════════════════════════════════
async function generarLibroClases(cursos, profes) {
  console.log('▶ [7/6] Generando 15 clases del libro registradas…');

  const ACTIVIDADES = [
    'Introducción al tema con lluvia de ideas',
    'Desarrollo de guía de ejercicios en parejas',
    'Presentación de trabajos grupales',
    'Corrección colectiva de evaluación',
    'Aplicación práctica con material concreto',
    'Debate dirigido sobre lectura previa',
    'Video-clase con guía de análisis',
    'Trabajo de investigación en biblioteca'
  ];

  let batch = db.batch();
  let ops = 0;

  for (let i = 0; i < 15; i++) {
    const curso = pick(cursos);
    const profe = pick(profes);
    const fecha = fechaHace(rand(1, DIAS_ASISTENCIA));
    const doc = {
      cursoId:       curso.id,
      cursoNombre:   curso.nombreCompleto || `${curso.nivel}${curso.letra}`,
      profesorUid:   profe.uid,
      profesorNombre: profe.nombre,
      asignatura:    pick(profe.asignaturas || ['Sin asignatura']),
      liceoSlug:     LICEO_SLUG,
      fecha,
      hora:          `${rand(8, 15)}:00`,
      oaTrabajado:   `OA ${rand(1, 15)}`,
      objetivo:      'Comprender y aplicar los conceptos de la unidad actual',
      actividades:   pickN(ACTIVIDADES, 3).join(' | '),
      observaciones: pick([
        'Clase desarrollada según planificación.',
        'Se aplicó adecuación para alumnos PIE.',
        'Uso de material audiovisual, buena recepción del curso.',
        'Se detectan alumnos con dificultades específicas — coordinar apoyo.'
      ]),
      seedTag:       SEED_TAG,
      creadoEn:      admin.firestore.FieldValue.serverTimestamp()
    };
    batch.set(db.collection('libro_clases').doc(), doc);
    ops++;
    if (ops >= 400) { await batch.commit(); batch = db.batch(); ops = 0; }
  }
  if (ops > 0) await batch.commit();
  console.log('   ✓ 15 clases del libro registradas');
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  SEED datos adicionales: Salesianos Talca         ║');
  console.log('╚══════════════════════════════════════════════════╝');

  await limpiarDocsPrevios();

  const { cursos, estudiantesPorCurso, profes } = await cargarBase();
  if (!cursos.length) {
    console.error('❌ No hay cursos en el liceo. Corré primero seed-colegio-demo.mjs');
    process.exit(1);
  }

  await generarAsistencia(cursos, estudiantesPorCurso, profes);
  await generarNotas(cursos, estudiantesPorCurso);
  await generarAnotaciones(cursos, estudiantesPorCurso, profes);
  await generarAlertas(cursos, estudiantesPorCurso, profes);
  await generarDerivaciones(cursos, estudiantesPorCurso, profes);
  await generarLibroClases(cursos, profes);

  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  ✅ DATOS ADICIONALES CARGADOS                    ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Ahora podés probar (con password Demo1234!):');
  console.log('  • Director/Rector → dashboards con gráficos y KPIs reales');
  console.log('  • UTP → cobertura curricular, alertas tempranas');
  console.log('  • Profesores → libros con datos, notas con promedios');
  console.log('  • PIE/Apoyo/Convivencia → bandeja de derivaciones activas');
  console.log('  • Apoderados → alertas recientes');
  console.log('');
  process.exit(0);
}

main().catch(e => {
  console.error('❌ ERROR:', e);
  process.exit(1);
});
