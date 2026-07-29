/**
 * ver-asistencia.mjs — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Diagnóstico + visualización de la asistencia cargada en Firestore.
 *
 * Muestra en consola:
 *   • Total de días de asistencia registrados en el liceo
 *   • Por curso: días, % promedio de asistencia, top 3 alumnos con baja asistencia
 *   • Resumen global del colegio
 *
 * Exporta CSV a ./output/asistencia/:
 *   • asistencia_por_alumno_<curso>.csv  → matriz alumno × día
 *   • resumen_asistencia_colegio.csv     → resumen global
 *
 * Uso:
 *   cd setup-usuarios
 *   node ver-asistencia.mjs
 *
 *   # o filtrando por curso:
 *   node ver-asistencia.mjs --curso salesianos-talca_1MA
 *
 *   # o solo consola (sin CSV):
 *   node ver-asistencia.mjs --no-csv
 */

import admin from 'firebase-admin';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══════════════════════════════════════════════════════════════
// Autenticación
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
const OUT_DIR    = path.join(__dirname, 'output', 'asistencia');

// CLI args
const args = process.argv.slice(2);
const filtroCurso = (() => {
  const idx = args.indexOf('--curso');
  return idx !== -1 ? args[idx + 1] : null;
})();
const generarCSV = !args.includes('--no-csv');

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function color(txt, code) { return `\x1b[${code}m${txt}\x1b[0m`; }
const bold   = t => color(t, '1');
const gray   = t => color(t, '90');
const green  = t => color(t, '32');
const yellow = t => color(t, '33');
const red    = t => color(t, '31');
const cyan   = t => color(t, '36');

function fmt(n)  { return n.toFixed(1); }
function pct(n)  { return `${n.toFixed(1)}%`; }
function pad(s, n) { return String(s).padEnd(n); }
function padR(s, n) { return String(s).padStart(n); }
function escapeCSV(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// Semáforo para % asistencia
function semaforo(porc) {
  if (porc >= 90) return green(pct(porc));
  if (porc >= 80) return yellow(pct(porc));
  return red(pct(porc));
}

// ═══════════════════════════════════════════════════════════════
// CARGA DE DATOS
// ═══════════════════════════════════════════════════════════════
async function cargarCursos() {
  const snap = await db.collection('cursos')
    .where('liceoSlug', '==', LICEO_SLUG)
    .get();
  const cursos = [];
  snap.forEach(doc => cursos.push({ id: doc.id, ...doc.data() }));
  cursos.sort((a, b) => (a.nivel + a.letra).localeCompare(b.nivel + b.letra));
  return cursos;
}

async function cargarAsistencia(cursoId) {
  const snap = await db.collection('asistencia')
    .where('cursoId', '==', cursoId)
    .get();
  const registros = [];
  snap.forEach(doc => registros.push({ id: doc.id, ...doc.data() }));
  registros.sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''));
  return registros;
}

// ═══════════════════════════════════════════════════════════════
// ANÁLISIS
// ═══════════════════════════════════════════════════════════════
function analizarCurso(curso, asistencias) {
  const estudiantes = Array.isArray(curso.estudiantes) ? curso.estudiantes : [];
  if (!asistencias.length || !estudiantes.length) return null;

  // Contadores por alumno
  const porAlumno = {};
  estudiantes.forEach(e => {
    porAlumno[e.uid] = {
      uid: e.uid,
      nombre: e.nombre,
      presente: 0, ausente: 0, atrasado: 0, justificado: 0,
      total: 0
    };
  });

  // Por día — sumar estados por alumno
  let totalPresentesGlobal = 0, totalGlobal = 0;
  const porDia = [];

  for (const a of asistencias) {
    const regs = Array.isArray(a.registros) ? a.registros : [];
    let presDia = 0;
    regs.forEach(r => {
      if (porAlumno[r.uid]) {
        porAlumno[r.uid][r.estado] = (porAlumno[r.uid][r.estado] || 0) + 1;
        porAlumno[r.uid].total++;
        if (r.estado === 'presente') presDia++;
      }
    });
    totalPresentesGlobal += presDia;
    totalGlobal += regs.length;
    porDia.push({
      fecha: a.fecha,
      presentes: presDia,
      totalDia: regs.length,
      porcDia: regs.length ? (presDia / regs.length * 100) : 0
    });
  }

  // % por alumno (presente + justificado + atrasado cuentan como asistencia)
  const alumnosArr = Object.values(porAlumno).map(al => {
    const asistidos = al.presente + al.atrasado + al.justificado;
    const porc = al.total ? (asistidos / al.total * 100) : 0;
    return { ...al, asistidos, porc };
  });

  alumnosArr.sort((a, b) => a.porc - b.porc);
  const bajos = alumnosArr.filter(a => a.porc < 80).slice(0, 5);

  return {
    diasRegistrados: asistencias.length,
    totalAlumnos: estudiantes.length,
    porcPromedio: totalGlobal ? (totalPresentesGlobal / totalGlobal * 100) : 0,
    alumnos: alumnosArr,
    alumnosBajos: bajos,
    porDia
  };
}

// ═══════════════════════════════════════════════════════════════
// EXPORT CSV
// ═══════════════════════════════════════════════════════════════
function exportarCSVCurso(curso, analisis) {
  if (!analisis) return;
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const nombreArchivo = `asistencia_${curso.id}.csv`.replace(/[^\w.-]/g, '_');
  const filepath = path.join(OUT_DIR, nombreArchivo);

  const lineas = [];
  // Header
  lineas.push([
    'Nombre alumno', 'RUT',
    'Total días', 'Presente', 'Atrasado', 'Justificado', 'Ausente',
    'Días asistidos', '% Asistencia'
  ].map(escapeCSV).join(','));

  // Cuerpo — ordenar alfabético por nombre
  const alumnos = [...analisis.alumnos].sort((a, b) => a.nombre.localeCompare(b.nombre));
  const est = curso.estudiantes || [];
  const rutMap = {};
  est.forEach(e => { rutMap[e.uid] = e.rut || ''; });

  for (const al of alumnos) {
    lineas.push([
      al.nombre, rutMap[al.uid] || '',
      al.total, al.presente, al.atrasado, al.justificado, al.ausente,
      al.asistidos, fmt(al.porc) + '%'
    ].map(escapeCSV).join(','));
  }

  writeFileSync(filepath, '﻿' + lineas.join('\n'), 'utf8'); // BOM para Excel
  return filepath;
}

function exportarCSVResumen(resumen) {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const filepath = path.join(OUT_DIR, 'resumen_asistencia_colegio.csv');
  const lineas = [];
  lineas.push(['Curso', 'Días registrados', 'Total alumnos', '% Asistencia promedio', 'Alumnos con <80%'].join(','));
  for (const r of resumen) {
    lineas.push([
      r.nombre, r.dias, r.alumnos,
      fmt(r.porcPromedio) + '%',
      r.enRiesgo
    ].join(','));
  }
  writeFileSync(filepath, '﻿' + lineas.join('\n'), 'utf8');
  return filepath;
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('');
  console.log(bold(cyan('╔══════════════════════════════════════════════════════════════╗')));
  console.log(bold(cyan('║  VISOR DE ASISTENCIA — Colegio Salesianos Talca             ║')));
  console.log(bold(cyan('╚══════════════════════════════════════════════════════════════╝')));
  console.log('');

  const cursos = await cargarCursos();
  if (!cursos.length) {
    console.log(red('❌ No hay cursos en el liceo. ¿Corriste el seed?'));
    process.exit(1);
  }

  console.log(gray(`Cursos en el liceo: ${cursos.length}`));
  if (filtroCurso) console.log(gray(`Filtro: ${filtroCurso}`));
  console.log(gray('Generando CSV: ' + (generarCSV ? 'sí (./output/asistencia/)' : 'no')));
  console.log('');

  const resumen = [];
  let totalDiasCol = 0, totalAlumnosCol = 0, sumaPorcCol = 0, cursosConDatos = 0;

  for (const c of cursos) {
    if (filtroCurso && c.id !== filtroCurso) continue;

    process.stdout.write(gray('  Analizando ' + c.id + '... '));
    const asistencias = await cargarAsistencia(c.id);
    const analisis = analizarCurso(c, asistencias);

    if (!analisis) {
      process.stdout.write(yellow('sin datos\n'));
      continue;
    }
    process.stdout.write(green('OK\n'));

    resumen.push({
      id: c.id,
      nombre: c.nombreCompleto || (c.nivel + c.letra),
      dias: analisis.diasRegistrados,
      alumnos: analisis.totalAlumnos,
      porcPromedio: analisis.porcPromedio,
      enRiesgo: analisis.alumnos.filter(a => a.porc < 80).length,
      analisis
    });
    totalDiasCol += analisis.diasRegistrados;
    totalAlumnosCol += analisis.totalAlumnos;
    sumaPorcCol += analisis.porcPromedio;
    cursosConDatos++;

    if (generarCSV) exportarCSVCurso(c, analisis);
  }

  // ─── TABLA RESUMEN ─────────────────────────────────────
  console.log('');
  console.log(bold('┌─────────────────────────────────────────────────────────────────────┐'));
  console.log(bold('│  RESUMEN POR CURSO                                                  │'));
  console.log(bold('└─────────────────────────────────────────────────────────────────────┘'));
  console.log('');
  console.log(bold(pad('Curso', 30) + padR('Días', 6) + padR('Alumnos', 10) + padR('% Asist.', 12) + padR('En riesgo', 12)));
  console.log(gray('─'.repeat(70)));
  for (const r of resumen) {
    console.log(
      pad(r.nombre, 30) +
      padR(r.dias, 6) +
      padR(r.alumnos, 10) +
      padR(semaforo(r.porcPromedio), 22) +   // color codes toman espacio
      padR(r.enRiesgo > 0 ? red(r.enRiesgo + ' 🚨') : green('0'), 20)
    );
  }
  console.log(gray('─'.repeat(70)));

  // ─── TOTALES ───────────────────────────────────────────
  console.log('');
  console.log(bold('📊 TOTALES COLEGIO:'));
  console.log('   Cursos con datos:      ' + cyan(cursosConDatos));
  console.log('   Días × curso:          ' + cyan(totalDiasCol));
  console.log('   Alumnos únicos:        ' + cyan(totalAlumnosCol));
  console.log('   % Asist. promedio:     ' + semaforo(cursosConDatos ? sumaPorcCol / cursosConDatos : 0));
  console.log('');

  // ─── TOP ALUMNOS BAJA ASISTENCIA (colegio completo) ────
  const bajosGlobal = [];
  resumen.forEach(r => {
    r.analisis.alumnosBajos.forEach(a => bajosGlobal.push({ ...a, curso: r.nombre }));
  });
  bajosGlobal.sort((a, b) => a.porc - b.porc);

  if (bajosGlobal.length > 0) {
    console.log(bold(yellow('⚠️  TOP 15 ALUMNOS CON MENOR ASISTENCIA:')));
    console.log(gray('─'.repeat(70)));
    bajosGlobal.slice(0, 15).forEach((a, i) => {
      console.log(
        padR(i + 1, 3) + '. ' +
        pad(a.nombre, 32) +
        pad(a.curso, 12) +
        red(pct(a.porc)) + gray(`  (${a.presente}P/${a.ausente}A/${a.atrasado}Atr/${a.justificado}J)`)
      );
    });
    console.log('');
  } else {
    console.log(green('✓ Ningún alumno con <80% de asistencia. Todos OK.'));
    console.log('');
  }

  // ─── CSV RESUMEN ───────────────────────────────────────
  if (generarCSV && resumen.length > 0) {
    const resumenFilepath = exportarCSVResumen(resumen);
    console.log(green('✅ CSVs generados en:'));
    console.log('   ' + gray(OUT_DIR));
    console.log('   • ' + cyan('resumen_asistencia_colegio.csv') + gray(' (visión global)'));
    console.log('   • ' + cyan(`asistencia_<cursoId>.csv`) + gray(' × ' + resumen.length + ' cursos (detalle por alumno)'));
    console.log('');
    console.log(gray('Abrilos con Excel — llevan BOM UTF-8, respeta tildes y ñ.'));
    console.log('');
  }

  console.log(bold(green('✓ Listo.')));
  console.log('');
  process.exit(0);
}

main().catch(e => {
  console.error(red('\n❌ ERROR:'), e);
  process.exit(1);
});
