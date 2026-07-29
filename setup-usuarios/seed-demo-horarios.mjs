/**
 * seed-demo-horarios.mjs — Click&Clase
 * ═══════════════════════════════════════════════════════════════
 * Puebla los HORARIOS INSTITUCIONALES del Colegio Demo:
 *   • bloques_liceo/demo → 11 bloques estándar (mañana+tarde)
 *   • horarios/demo__{uid} → horario semanal para CADA docente
 *
 * Estrategia:
 *   1. Leer todos los cursos del liceo demo con sus asignaturasAsignadas
 *   2. Para cada docente, distribuir sus asignaciones reales en la
 *      grilla semanal (lunes-viernes × 8 bloques de clase)
 *   3. Cargar 3-6 clases por docente (variedad realista)
 *
 * Uso:
 *   cd setup-usuarios
 *   node seed-demo-horarios.mjs
 *
 * ES IDEMPOTENTE: reemplaza limpiamente los horarios previos.
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
const LICEO_SLUG = 'demo';

// Bloques estándar chilenos: 45min clase + 15min recreo
const BLOQUES = [
  { id: 'b1', orden: 1,  horaInicio: '08:00', horaFin: '08:45', nombre: '1° bloque', tipo: 'clase' },
  { id: 'r1', orden: 2,  horaInicio: '08:45', horaFin: '09:00', nombre: 'Recreo',    tipo: 'recreo' },
  { id: 'b2', orden: 3,  horaInicio: '09:00', horaFin: '09:45', nombre: '2° bloque', tipo: 'clase' },
  { id: 'b3', orden: 4,  horaInicio: '09:45', horaFin: '10:30', nombre: '3° bloque', tipo: 'clase' },
  { id: 'r2', orden: 5,  horaInicio: '10:30', horaFin: '10:45', nombre: 'Recreo',    tipo: 'recreo' },
  { id: 'b4', orden: 6,  horaInicio: '10:45', horaFin: '11:30', nombre: '4° bloque', tipo: 'clase' },
  { id: 'b5', orden: 7,  horaInicio: '11:30', horaFin: '12:15', nombre: '5° bloque', tipo: 'clase' },
  { id: 'r3', orden: 8,  horaInicio: '12:15', horaFin: '12:30', nombre: 'Recreo',    tipo: 'recreo' },
  { id: 'b6', orden: 9,  horaInicio: '12:30', horaFin: '13:15', nombre: '6° bloque', tipo: 'clase' },
  { id: 'al', orden: 10, horaInicio: '13:15', horaFin: '14:00', nombre: 'Almuerzo',  tipo: 'almuerzo' },
  { id: 'b7', orden: 11, horaInicio: '14:00', horaFin: '14:45', nombre: '7° bloque', tipo: 'clase' },
  { id: 'r4', orden: 12, horaInicio: '14:45', horaFin: '15:00', nombre: 'Recreo',    tipo: 'recreo' },
  { id: 'b8', orden: 13, horaInicio: '15:00', horaFin: '15:45', nombre: '8° bloque', tipo: 'clase' }
];

const BLOQUES_CLASE = BLOQUES.filter(b => b.tipo === 'clase'); // 8 slots
const DIAS = ['lunes','martes','miercoles','jueves','viernes'];

const SEED_TAG = 'demo-horarios-v1';

const _pick = (arr, i) => arr[i % arr.length];

// ═══════════════════════════════════════════════════════════════
// STEP 1: Guardar los bloques del liceo
// ═══════════════════════════════════════════════════════════════
async function seedBloques() {
  console.log('\n📦 STEP 1/3: Bloques del liceo demo');
  await db.collection('bloques_liceo').doc(LICEO_SLUG).set({
    liceoSlug:     LICEO_SLUG,
    bloques:       BLOQUES,
    seedTag:       SEED_TAG,
    actualizadoEn: new Date().toISOString(),
    actualizadoPor:'seed-demo-horarios'
  });
  console.log(`  ✓ 11 bloques guardados (8 clase + 2 recreos + 1 almuerzo)`);
}

// ═══════════════════════════════════════════════════════════════
// STEP 2: Leer cursos y armar índice docente → [{cursoId, asignatura}]
// ═══════════════════════════════════════════════════════════════
async function cargarAsignacionesPorDocente() {
  console.log('\n📚 STEP 2/3: Leyendo cursos del liceo demo');
  const snap = await db.collection('cursos')
    .where('liceoSlug', '==', LICEO_SLUG).get();

  const cursos = [];
  snap.forEach(d => {
    const c = d.data();
    c.cursoId = c.cursoId || d.id;
    cursos.push(c);
  });
  console.log(`  ✓ ${cursos.length} cursos encontrados`);

  // Índice docente → asignaturas
  const asigsDeDocente = {};   // { uid: [{cursoId, cursoNombre, asignatura, sala}] }
  const jefaturas      = {};   // { uid: [cursoId] }

  cursos.forEach(c => {
    // Jefaturas
    if (c.jefeUid) {
      if (!jefaturas[c.jefeUid]) jefaturas[c.jefeUid] = [];
      jefaturas[c.jefeUid].push(c);
    }
    // Asignaturas
    (c.asignaturasAsignadas || []).forEach(a => {
      if (!a.docenteUid || !a.asignatura) return;
      if (!asigsDeDocente[a.docenteUid]) asigsDeDocente[a.docenteUid] = [];
      asigsDeDocente[a.docenteUid].push({
        cursoId:     c.cursoId,
        cursoNombre: c.nombreCompleto || c.nombre || `${c.nivel} ${c.letra||''}`.trim(),
        asignatura:  a.asignatura,
        sala:        ''
      });
    });
  });

  // Para profes jefes sin asignaturas, añadir Consejo de Curso + Orientación
  Object.keys(jefaturas).forEach(uid => {
    const yaTiene = asigsDeDocente[uid] && asigsDeDocente[uid].length > 0;
    if (!yaTiene) {
      asigsDeDocente[uid] = jefaturas[uid].map(c => ({
        cursoId:     c.cursoId,
        cursoNombre: c.nombreCompleto || c.nombre || `${c.nivel} ${c.letra||''}`.trim(),
        asignatura:  'Consejo de Curso',
        sala:        ''
      }));
      // Y le agregamos Orientación también
      jefaturas[uid].forEach(c => {
        asigsDeDocente[uid].push({
          cursoId:     c.cursoId,
          cursoNombre: c.nombreCompleto || c.nombre || `${c.nivel} ${c.letra||''}`.trim(),
          asignatura:  'Orientación',
          sala:        ''
        });
      });
    }
  });

  return { asigsDeDocente, jefaturas };
}

// ═══════════════════════════════════════════════════════════════
// STEP 3: Crear horario semanal para cada docente
// ═══════════════════════════════════════════════════════════════
async function seedHorariosDocentes(asigsDeDocente) {
  console.log('\n🕐 STEP 3/3: Armando horarios semanales por docente');

  // Leer usuarios docentes del liceo demo
  const usersSnap = await db.collection('usuarios')
    .where('liceoSlug', '==', LICEO_SLUG).get();

  const docentes = [];
  usersSnap.forEach(d => {
    const u = d.data();
    const roles = u.roles || {};
    if (roles.profesor || roles.jefe_curso || roles.utp || roles.encargado_area) {
      u.uid = d.id;
      docentes.push(u);
    }
  });
  console.log(`  ✓ ${docentes.length} docentes en el liceo`);

  // Cargar TODOS los cursos para fallback cuando el docente no tiene asignaciones
  const cursosSnap = await db.collection('cursos')
    .where('liceoSlug', '==', LICEO_SLUG).get();
  const todosCursos = [];
  cursosSnap.forEach(d => {
    const c = d.data(); c.cursoId = c.cursoId || d.id;
    todosCursos.push(c);
  });

  let ok = 0;
  for (const docente of docentes) {
    let asigsDelProfe = asigsDeDocente[docente.uid] || [];
    if (!asigsDelProfe.length) {
      // Fallback: asignar 3-5 clases genéricas a cursos aleatorios del liceo
      // (así todos los docentes tienen algo que mostrar en su libro)
      const seleccion = todosCursos
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      const asigsGenericas = docente.especialidad
        ? ['Módulo TP', 'Práctica']
        : ['Lenguaje', 'Matemática', 'Historia', 'Ciencias', 'Inglés'];
      asigsDelProfe = seleccion.map((c, i) => ({
        cursoId:     c.cursoId,
        cursoNombre: c.nombreCompleto || c.nombre || `${c.nivel} ${c.letra||''}`.trim(),
        asignatura:  asigsGenericas[i % asigsGenericas.length],
        sala:        ''
      }));
      console.log(`  ↺ ${docente.nombre || docente.email} sin asignaciones — se generaron ${asigsDelProfe.length} clases genéricas`);
    }

    // Distribuir asignaturas en la semana. Cada asignatura aparece 2-4 veces
    // (una unidad realista chilena).
    const semana = { lunes: [], martes: [], miercoles: [], jueves: [], viernes: [], sabado: [] };

    // Estrategia: para cada asignación, la ponemos 2-4 veces por semana
    // (variando día y bloque). Máx 30 slots por semana (5 días × 6 bloques),
    // dejamos algunos vacíos para hueco pedagógico.
    const usados = new Set(); // "dia|bloque" ya ocupados
    let idx = 0;
    for (const asig of asigsDelProfe) {
      const vecesPorSemana = 2 + (asig.asignatura.length % 3); // 2, 3 o 4
      for (let v = 0; v < vecesPorSemana; v++) {
        // Buscar slot libre
        let intentos = 0;
        while (intentos < 40) {
          const dia = _pick(DIAS, (idx + v + intentos) * 7);
          const bloque = _pick(BLOQUES_CLASE, (idx + v * 3 + intentos * 5));
          const key = `${dia}|${bloque.id}`;
          if (!usados.has(key)) {
            usados.add(key);
            semana[dia].push({
              bloqueId:    bloque.id,
              cursoId:     asig.cursoId,
              cursoNombre: asig.cursoNombre,
              asignatura:  asig.asignatura,
              sala:        asig.sala || (Math.random() < 0.5 ? '' : `Sala ${(idx % 15) + 1}`)
            });
            break;
          }
          intentos++;
        }
      }
      idx++;
    }

    // Ordenar bloques por hora dentro de cada día
    Object.keys(semana).forEach(dia => {
      const bloquesMap = {};
      BLOQUES.forEach(b => { bloquesMap[b.id] = b.orden; });
      semana[dia].sort((a, b) => (bloquesMap[a.bloqueId]||0) - (bloquesMap[b.bloqueId]||0));
    });

    const totalClases = Object.values(semana).reduce((s, arr) => s + arr.length, 0);
    const docId = `${LICEO_SLUG}__${docente.uid}`;
    await db.collection('horarios').doc(docId).set({
      liceoSlug:      LICEO_SLUG,
      docenteUid:     docente.uid,
      docenteNombre:  docente.nombre || docente.email || '',
      docenteEmail:   docente.email || '',
      semana:         semana,
      seedTag:        SEED_TAG,
      actualizadoEn:  new Date().toISOString(),
      actualizadoPor: 'seed-demo-horarios'
    });
    console.log(`  ✓ ${docente.nombre || docente.email}: ${totalClases} clases/semana`);
    ok++;
  }

  console.log(`\n✅ Horarios cargados para ${ok}/${docentes.length} docentes`);
}

// ═══════════════════════════════════════════════════════════════
// RUN
// ═══════════════════════════════════════════════════════════════
(async () => {
  try {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║  SEED HORARIOS — Colegio Demo (electrolearn-prod)    ║');
    console.log('╚═══════════════════════════════════════════════════════╝');

    await seedBloques();
    const { asigsDeDocente } = await cargarAsignacionesPorDocente();
    await seedHorariosDocentes(asigsDeDocente);

    console.log('\n🎉 LISTO. Ahora podés:');
    console.log('   1. Loguearte como cualquier docente @demo.cl (pass: Demo1234!)');
    console.log('   2. Entrar a Libro de Clases → vas a ver tu horario semanal');
    console.log('   3. El día actual queda destacado con acceso directo\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ ERROR:', err);
    process.exit(1);
  }
})();
