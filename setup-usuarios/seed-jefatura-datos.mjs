/**
 * seed-jefatura-datos.mjs — Click&Clase
 * ═══════════════════════════════════════════════════════════════
 * Genera datos realistas para PROBAR los paneles de Mi Jefatura
 * en TODOS los liceos disponibles (o uno específico si se pasa arg).
 *
 * Uso:
 *   node seed-jefatura-datos.mjs                 → siembra TODOS los liceos
 *   node seed-jefatura-datos.mjs demo            → solo el liceo demo
 *   node seed-jefatura-datos.mjs salesianos-talca → solo ese
 *
 * ES IDEMPOTENTE (seedTag: 'jefatura-datos-v1').
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
const db = admin.firestore();

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
const LICEO_ARG = process.argv[2] || null; // opcional
const SEED_TAG  = 'jefatura-datos-v1';
const HOY = new Date();

// ─── Helpers ─────────────────────────────────────────────────
function rndFloat(min, max) { return Math.random() * (max - min) + min; }
function rndInt(min, max)   { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr)          { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n)      { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }

function gauss(mean, std) {
  const u = Math.random(), v = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + z * std;
}

function slugCurso(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'curso';
}
function estKey(e) {
  const r = String(e.rut || '').trim();
  return r ? ('r:' + r) : ('n:' + String(e.nombre || '').trim().toLowerCase());
}

// ─── Datos base ──────────────────────────────────────────────
const EVALS_ESTANDAR = [
  { concepto: 'Prueba de unidad 1',  ponderacion: 25, tipo: 'coef1' },
  { concepto: 'Trabajo grupal',      ponderacion: 15, tipo: 'coef1' },
  { concepto: 'Control de lectura',  ponderacion: 20, tipo: 'coef1' },
  { concepto: 'Prueba de síntesis',  ponderacion: 40, tipo: 'coef2' }
];

const ANO_POS = [
  { categoria: 'academica',    txt: 'Demuestra excelente disposición y participa activamente en clases.' },
  { categoria: 'academica',    txt: 'Presenta sus trabajos y evaluaciones con dedicación y calidad.' },
  { categoria: 'conductual',   txt: 'Colabora con sus compañeros en actividades grupales.' },
  { categoria: 'colaboracion', txt: 'Ayuda a compañeros(as) que presentan dificultades en la materia.' },
  { categoria: 'actitudinal',  txt: 'Muestra actitud positiva frente a los desafíos académicos.' },
  { categoria: 'actitudinal',  txt: 'Demuestra liderazgo y compromiso con el curso.' }
];
const ANO_NEG = [
  { categoria: 'academica',   txt: 'No presenta las tareas asignadas en la fecha establecida.' },
  { categoria: 'academica',   txt: 'Se distrae con facilidad y no participa de las actividades de la clase.' },
  { categoria: 'conductual',  txt: 'Interrumpe reiteradamente el desarrollo de la clase.' },
  { categoria: 'conductual',  txt: 'Utiliza el celular durante la clase sin autorización.' },
  { categoria: 'asistencia',  txt: 'Llega atrasado(a) sin justificación al inicio de la jornada.' }
];
const ANO_NEU = [
  { categoria: 'academica',   txt: 'Se ausenta a evaluación programada. Se reagenda para próxima clase.' },
  { categoria: 'asistencia',  txt: 'Se registra ausencia justificada por el apoderado.' },
  { categoria: 'otra',        txt: 'Se cita al apoderado para conversar situación observada.' }
];

const CRITERIOS_INFORME = ['e1','e2','e3','e4','c1','c2','c3','c4','p1','p2','p3','p4','w1','w2','w3','w4'];

// ═══════════════════════════════════════════════════════════════
// DETECTAR LICEOS
// ═══════════════════════════════════════════════════════════════
async function detectarLiceos() {
  if (LICEO_ARG) return [LICEO_ARG];
  const liceos = new Set();
  // Intentar de la colección liceos primero
  try {
    const snap = await db.collection('liceos').get();
    snap.forEach(d => { const s = d.data().slug || d.id; if (s) liceos.add(s); });
  } catch(e){}
  // También detectar por cursos
  const snapC = await db.collection('cursos').get();
  snapC.forEach(d => { const s = d.data().liceoSlug; if (s) liceos.add(s); });
  return [...liceos];
}

// ═══════════════════════════════════════════════════════════════
// SEMBRAR UN CURSO ESPECÍFICO
// ═══════════════════════════════════════════════════════════════
async function sembrarCurso(curso, docentes, liceoSlug) {
  const ests = curso.estudiantes || [];
  if (!ests.length) return { notas: 0, asist: 0, ano: 0, inf: 0, docsJefe: 0 };

  const asigsAsignadas = (curso.asignaturasAsignadas || []).filter(a => a.asignatura);
  const asigsNombres   = asigsAsignadas.map(a => a.asignatura);
  if (!asigsNombres.length) return { notas: 0, asist: 0, ano: 0, inf: 0, docsJefe: 0 };

  const asigsPorDocUid = {};
  asigsAsignadas.forEach(a => { asigsPorDocUid[a.asignatura] = a.docenteUid || null; });

  // Perfil por alumno
  const perfilAlumno = {};
  ests.forEach((e, i) => {
    const roll = Math.random();
    perfilAlumno[e.rut || i] = {
      mediaNotas: roll < 0.15 ? rndFloat(3.2, 4.5)
                : roll < 0.35 ? rndFloat(4.5, 5.4)
                :                rndFloat(5.4, 6.5),
      pctAsist:   roll < 0.05 ? rndFloat(50, 70)
                : roll < 0.20 ? rndFloat(70, 84)
                :                rndFloat(85, 98)
    };
  });

  // ── NOTAS (con bulkWriter — resistente a limites de Firestore) ─
  const writerN = db.bulkWriter();
  writerN.onWriteError(e => e.failedAttempts < 5);
  let totalNotas = 0;
  for (const asig of asigsNombres) {
    const docenteUid = asigsPorDocUid[asig] || curso.jefeUid || '';
    const docente    = docentes[docenteUid] || { uid: docenteUid, nombre: '', email: '' };
    for (let k = 0; k < EVALS_ESTANDAR.length; k++) {
      const evalStd  = EVALS_ESTANDAR[k];
      const semestre = (k % 2 === 0) ? 1 : 2;
      const fechaEval = new Date(HOY.getTime() - rndInt(5, 150) * 86400000);
      for (const est of ests) {
        const perfil = perfilAlumno[est.rut];
        let nota = gauss(perfil.mediaNotas, 0.6);
        if (nota < 1.5) nota = 1.5;
        if (nota > 7.0) nota = 7.0;
        nota = Math.round(nota * 10) / 10;
        writerN.set(db.collection('notas').doc(), {
          liceoSlug, cursoId: curso.cursoId,
          cursoNombre: curso.nombreCompleto || curso.nombre || '',
          estudianteRut: est.rut, estudianteNombre: est.nombre,
          rut: est.rut, alumnoRut: est.rut, alumnoNombre: est.nombre,
          asignatura: asig, concepto: evalStd.concepto, ponderacion: evalStd.ponderacion,
          tipo: evalStd.tipo, nota, semestre,
          fecha: fechaEval.toISOString().slice(0,10),
          docenteUid: docente.uid, docenteNombre: docente.nombre,
          seedTag: SEED_TAG, creadoEn: new Date().toISOString()
        });
        totalNotas++;
      }
    }
  }
  await writerN.close();

  // ── LIBRO_CLASES (asistencia detallada) ───────────────────
  const writerL = db.bulkWriter();
  writerL.onWriteError(e => e.failedAttempts < 5);
  let totalAsist = 0;
  for (let d = 0; d < 30; d++) {
    const fecha = new Date(HOY.getTime() - (d + 1) * 86400000);
    if (fecha.getDay() === 0 || fecha.getDay() === 6) continue;
    const fechaISO = fecha.toISOString().slice(0, 10);
    const asigsDelDia = pickN(asigsNombres, Math.min(2, asigsNombres.length));
    for (const asig of asigsDelDia) {
      const docenteUid = asigsPorDocUid[asig] || curso.jefeUid || '';
      const docente = docentes[docenteUid] || { uid: docenteUid, nombre: '', email: '' };
      const asistencia = ests.map((e, i) => {
        const perfil = perfilAlumno[e.rut];
        const roll   = Math.random() * 100;
        let estado;
        if (roll < perfil.pctAsist)         estado = 'P';
        else if (roll < perfil.pctAsist+8)  estado = 'T';
        else if (roll < perfil.pctAsist+13) estado = 'J';
        else                                 estado = 'A';
        return { ordinal: i+1, uid: e.uid||'', rut: e.rut||'',
                 nombreCompleto: e.nombre||'', estado, motivo: '', horaLlegada: '' };
      });
      const totP = asistencia.filter(a => a.estado === 'P').length;
      const totA = asistencia.filter(a => a.estado === 'A').length;
      const totT = asistencia.filter(a => a.estado === 'T').length;
      const totJ = asistencia.filter(a => a.estado === 'J').length;
      const ref = db.collection('libro_clases').doc();
      writerL.set(ref, {
        regId: ref.id, liceoSlug, cursoId: curso.cursoId,
        cursoNombre: curso.nombreCompleto || curso.nombre || '',
        asignatura: asig, fecha: fechaISO,
        docenteUid: docente.uid, docenteNombre: docente.nombre,
        contenidoDelDia: 'Contenido de la clase del ' + fechaISO,
        observacionesGenerales: '', asistencia,
        totalPresentes: totP, totalAusentes: totA, totalAtrasados: totT, totalJustificados: totJ,
        firmado: Math.random() < 0.8,
        firmadoEn: new Date(fecha.getTime() + 8*3600000).toISOString(),
        firmadoPor: docente.email || docente.nombre,
        firmaConPin: Math.random() < 0.5,
        seedTag: SEED_TAG, creadoEn: new Date().toISOString()
      });
      totalAsist++;
    }
  }
  await writerL.close();

  // ── ANOTACIONES ───────────────────────────────────────────
  const writerA = db.bulkWriter();
  writerA.onWriteError(e => e.failedAttempts < 5);
  let totalAno = 0;
  const profeJefeUid = curso.jefeUid || '';
  const profeJefe    = docentes[profeJefeUid] || { uid: profeJefeUid, nombre: 'Profesor Jefe', email: '' };
  for (const est of ests) {
    const nAnos = rndInt(3, 7);
    for (let a = 0; a < nAnos; a++) {
      const roll = Math.random();
      let tipo, plantilla;
      if (roll < 0.6)      { tipo = 'positiva'; plantilla = pick(ANO_POS); }
      else if (roll < 0.9) { tipo = 'neutra';   plantilla = pick(ANO_NEU); }
      else                 { tipo = 'negativa'; plantilla = pick(ANO_NEG); }
      const fecha = new Date(HOY.getTime() - rndInt(3, 60) * 86400000);
      writerA.set(db.collection('anotaciones_alumno').doc(), {
        alumnoRut: est.rut, alumnoNombre: est.nombre,
        estudianteRut: est.rut, rut: est.rut,
        cursoId: curso.cursoId,
        cursoNombre: curso.nombreCompleto || curso.nombre || '',
        liceoSlug,
        profesorUid: profeJefe.uid, profesorNombre: profeJefe.nombre, profesorRol: 'jefe_curso',
        tipo, categoria: plantilla.categoria, descripcion: plantilla.txt,
        visibleApoderado: tipo !== 'neutra',
        fecha: fecha.toISOString(),
        seedTag: SEED_TAG, creadoEn: new Date().toISOString()
      });
      totalAno++;
    }
  }
  await writerA.close();

  // ── INFORMES DE PERSONALIDAD (60%) ────────────────────────
  let infTotal = 0;
  for (const est of ests) {
    if (Math.random() > 0.6) continue;
    const perfil = perfilAlumno[est.rut];
    const dist = perfil.mediaNotas >= 5.5 ? ['L','L','L','L','ML']
               : perfil.mediaNotas >= 4.5 ? ['L','L','ML','ML','PL']
               :                            ['ML','PL','PL','L','ML'];
    const valores = {};
    CRITERIOS_INFORME.forEach(k => { valores[k] = pick(dist); });
    for (const periodo of ['1° Semestre', '2° Semestre']) {
      const id = curso.cursoId + '__' + est.rut + '__' + periodo;
      await db.collection('informes_personalidad').doc(id).set({
        liceoSlug, cursoId: curso.cursoId,
        cursoNombre: curso.nombreCompleto || curso.nombre || '',
        alumnoRut: est.rut, alumnoNombre: est.nombre,
        periodo, valores,
        observaciones: 'El(la) estudiante ha mostrado un desempeño ' +
          (perfil.mediaNotas >= 5.5 ? 'sobresaliente' :
           perfil.mediaNotas >= 4.5 ? 'satisfactorio' : 'que requiere apoyo') +
          ' durante el período.',
        profesorJefeUid: profeJefe.uid, profesorJefeNombre: profeJefe.nombre,
        seedTag: SEED_TAG, actualizadoEn: new Date().toISOString()
      });
      infTotal++;
    }
  }

  // ── DOCS de listas_curso/notas_curso/asistencia_curso ──
  //    Se generan por CADA docente que enseña en el curso
  //    (jefe + docenteUid de cada asignatura)
  const cursoNombre = curso.nombreCompleto || curso.nombre || curso.cursoId;
  const uidsDocentes = new Set();
  if (profeJefeUid) uidsDocentes.add(profeJefeUid);
  asigsAsignadas.forEach(a => { if (a.docenteUid) uidsDocentes.add(a.docenteUid); });

  const estsNorm = ests.map((e, i) => ({
    ordinal: i+1, nombre: e.nombre||'', rut: e.rut||'', uid: e.uid||''
  }));

  const evaluaciones = [];
  const notasMap = {};
  let evalIdx = 0;
  for (const asig of asigsNombres) {
    EVALS_ESTANDAR.forEach((evalStd, k) => {
      evalIdx++;
      const evalId = 'e' + evalIdx;
      const semestre = (k % 2 === 0) ? 1 : 2;
      const fechaEval = new Date(HOY.getTime() - rndInt(5, 150) * 86400000);
      evaluaciones.push({
        id: evalId,
        nombre: asig.slice(0, 12) + ' · ' + evalStd.concepto,
        asignatura: asig, ponderacion: evalStd.ponderacion,
        tipo: evalStd.tipo, semestre, fecha: fechaEval.toISOString().slice(0,10)
      });
      for (const est of ests) {
        const perfil = perfilAlumno[est.rut];
        let nota = gauss(perfil.mediaNotas, 0.6);
        if (nota < 1.5) nota = 1.5;
        if (nota > 7.0) nota = 7.0;
        nota = Math.round(nota * 10) / 10;
        const kEst = estKey(est);
        if (!notasMap[kEst]) notasMap[kEst] = {};
        notasMap[kEst][evalId] = nota;
      }
    });
  }

  const registros = {};
  for (let d = 0; d < 30; d++) {
    const fecha = new Date(HOY.getTime() - (d + 1) * 86400000);
    if (fecha.getDay() === 0 || fecha.getDay() === 6) continue;
    const fISO = fecha.toISOString().slice(0, 10);
    registros[fISO] = {};
    ests.forEach(est => {
      const perfil = perfilAlumno[est.rut];
      const roll = Math.random() * 100;
      let estado;
      if (roll < perfil.pctAsist)         estado = 'P';
      else if (roll < perfil.pctAsist+8)  estado = 'T';
      else if (roll < perfil.pctAsist+13) estado = 'J';
      else                                 estado = 'A';
      registros[fISO][estKey(est)] = estado;
    });
  }

  let docsJefe = 0;
  for (const uid of uidsDocentes) {
    if (!uid) continue;
    const docente = docentes[uid] || { uid, email: '', nombre: '' };
    const docId = uid + '__' + slugCurso(cursoNombre);
    await db.collection('listas_curso').doc(docId).set({
      profesorUid: uid, profesorEmail: docente.email || '',
      cursoId: curso.cursoId, cursoNombre, liceoSlug,
      estudiantes: estsNorm,
      seedTag: SEED_TAG, actualizadoEn: new Date().toISOString()
    });
    await db.collection('notas_curso').doc(docId).set({
      profesorUid: uid, profesorEmail: docente.email || '',
      cursoId: curso.cursoId, cursoNombre, liceoSlug,
      evaluaciones, notas: notasMap,
      seedTag: SEED_TAG, actualizadoEn: new Date().toISOString()
    });
    await db.collection('asistencia_curso').doc(docId).set({
      profesorUid: uid, profesorEmail: docente.email || '',
      cursoId: curso.cursoId, cursoNombre, liceoSlug, registros,
      seedTag: SEED_TAG, actualizadoEn: new Date().toISOString()
    });
    docsJefe += 3;
  }

  return { notas: totalNotas, asist: totalAsist, ano: totalAno, inf: infTotal, docsJefe };
}

// ═══════════════════════════════════════════════════════════════
// SEMBRAR UN LICEO COMPLETO
// ═══════════════════════════════════════════════════════════════
async function sembrarLiceo(liceoSlug) {
  console.log(`\n═══ Liceo: ${liceoSlug} ═══`);

  const snapC = await db.collection('cursos').where('liceoSlug','==',liceoSlug).get();
  const cursos = [];
  snapC.forEach(d => { const c = d.data(); c.cursoId = c.cursoId || d.id; cursos.push(c); });
  if (!cursos.length) {
    console.log(`  ⚠ Sin cursos en ${liceoSlug}, se omite`);
    return;
  }
  console.log(`  ✓ ${cursos.length} cursos`);

  const snapU = await db.collection('usuarios').where('liceoSlug','==',liceoSlug).get();
  const docentes = {};
  snapU.forEach(d => {
    const u = d.data();
    docentes[d.id] = { uid: d.id, nombre: u.nombre||u.email||'', email: u.email||'' };
  });

  let totNotas=0, totAsist=0, totAno=0, totInf=0, totDocsJefe=0;
  for (const curso of cursos) {
    const s = await sembrarCurso(curso, docentes, liceoSlug);
    console.log(`  ✓ ${curso.nombreCompleto || curso.nombre || curso.cursoId}: ` +
                `${s.notas}n · ${s.asist}a · ${s.ano}o · ${s.inf}i · ${s.docsJefe}dj`);
    totNotas+=s.notas; totAsist+=s.asist; totAno+=s.ano; totInf+=s.inf; totDocsJefe+=s.docsJefe;
  }
  console.log(`  📊 Totales: ${totNotas} notas · ${totAsist} asistencia · ${totAno} anotaciones · ${totInf} informes · ${totDocsJefe} docs jefe`);
}

// ═══════════════════════════════════════════════════════════════
// LIMPIAR SEED PREVIO
// ═══════════════════════════════════════════════════════════════
async function limpiarPrevios() {
  console.log('\n🧹 Limpiando datos previos del seed');
  const cols = ['notas','anotaciones','anotaciones_alumno','libro_clases',
                'informes_personalidad','listas_curso','notas_curso','asistencia_curso'];
  for (const col of cols) {
    const snap = await db.collection(col).where('seedTag', '==', SEED_TAG).get();
    if (snap.empty) continue;

    const total = snap.size;
    process.stdout.write(`  ⏳ ${col}: ${total} docs → borrando`);

    // Usar bulkWriter: maneja rate limits y reintentos automáticamente
    const writer = db.bulkWriter();
    writer.onWriteError(err => {
      if (err.failedAttempts < 5) return true; // reintentar hasta 5 veces
      console.warn(`\n    ⚠ Falló ${err.documentRef.path} después de 5 intentos`);
      return false;
    });

    let hechos = 0;
    snap.forEach(doc => {
      writer.delete(doc.ref).then(() => {
        hechos++;
        if (hechos % 500 === 0) process.stdout.write('.');
      });
    });
    await writer.close();
    console.log(` ✓ ${hechos}`);
  }
}

// ═══════════════════════════════════════════════════════════════
// RUN
// ═══════════════════════════════════════════════════════════════
(async () => {
  try {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  SEED DATOS JEFATURA — multi-liceo                    ║');
    console.log('╚═══════════════════════════════════════════════════════╝');

    const liceos = await detectarLiceos();
    console.log(`\n🏫 Liceos a sembrar: ${liceos.join(', ')}`);

    await limpiarPrevios();

    for (const slug of liceos) {
      await sembrarLiceo(slug);
    }

    console.log('\n🎉 LISTO. Probá en Mi Jefatura → cualquier acceso.');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ ERROR:', err);
    process.exit(1);
  }
})();
