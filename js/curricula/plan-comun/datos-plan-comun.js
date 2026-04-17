// =============================================
// DATOS CURRICULARES — Plan Común
// Archivo: js/curricula/plan-comun/datos-plan-comun.js
//
// Cubre asignaturas del Plan de Formación General
// (Básica y Educación Media, 1°B – 4°M)
//
// Asignaturas incluidas:
//   - Lenguaje y Comunicación
//   - Matemática
//   - Historia, Geografía y Ciencias Sociales
//   - Ciencias Naturales / Biología / Física / Química
//   - Inglés
//   - Educación Física y Salud
//   - Artes Visuales
//   - Música
//   - Tecnología
//   - Orientación
//
// Estado: PENDIENTE DE CARGA — cargar OAs por asignatura y nivel
// =============================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

// ── Estructura general ──────────────────────────────────────
// CURRICULA_PLAN_COMUN['lenguaje']['1B'] = [ { codigo, descripcion, eje }, ... ]
// CURRICULA_PLAN_COMUN['matematica']['2M'] = [ ... ]
// etc.

// ══════════════════════════════════════════════════════════════
// LENGUAJE Y COMUNICACIÓN
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['lenguaje'] = {
  nombre: 'Lenguaje y Comunicación',
  sigla:  'LEN',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  // OAs se cargan por nivel: '1B': [...], '2B': [...], etc.
  oas: {
    // Ejemplo de estructura:
    // '1B': [
    //   { codigo: 'OA1', descripcion: 'Leer en voz alta...', eje: 'Lectura' },
    //   { codigo: 'OA2', descripcion: 'Comprender textos...', eje: 'Lectura' },
    // ],
    // '1M': [ ... ],
  }
};

// ══════════════════════════════════════════════════════════════
// MATEMÁTICA
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['matematica'] = {
  nombre: 'Matemática',
  sigla:  'MAT',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['historia'] = {
  nombre: 'Historia, Geografía y Ciencias Sociales',
  sigla:  'HIS',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// CIENCIAS NATURALES (Básica) / BIOLOGÍA / FÍSICA / QUÍMICA
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['ciencias'] = {
  nombre: 'Ciencias Naturales',
  sigla:  'CN',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
  oas: {}
};

CURRICULA_PLAN_COMUN['biologia'] = {
  nombre: 'Biología',
  sigla:  'BIO',
  niveles: ['1M','2M','3M','4M'],
  oas: {}
};

CURRICULA_PLAN_COMUN['fisica'] = {
  nombre: 'Física',
  sigla:  'FIS',
  niveles: ['1M','2M','3M','4M'],
  oas: {}
};

CURRICULA_PLAN_COMUN['quimica'] = {
  nombre: 'Química',
  sigla:  'QUI',
  niveles: ['1M','2M','3M','4M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// INGLÉS
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['ingles'] = {
  nombre: 'Inglés',
  sigla:  'ING',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// EDUCACIÓN FÍSICA Y SALUD
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['ed-fisica'] = {
  nombre: 'Educación Física y Salud',
  sigla:  'EDF',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// ARTES VISUALES
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['artes'] = {
  nombre: 'Artes Visuales',
  sigla:  'ART',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// MÚSICA
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['musica'] = {
  nombre: 'Música',
  sigla:  'MUS',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// TECNOLOGÍA
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['tecnologia'] = {
  nombre: 'Tecnología',
  sigla:  'TEC',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// ORIENTACIÓN
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['orientacion'] = {
  nombre: 'Orientación',
  sigla:  'ORI',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {}
};

// ── Helper: obtener OAs por asignatura y nivel ─────────────
function getPlanComunOAs(asignatura, nivel) {
  var sigla = (asignatura || '').toLowerCase();
  // Buscar por sigla o por nombre parcial
  for (var key in CURRICULA_PLAN_COMUN) {
    var item = CURRICULA_PLAN_COMUN[key];
    if (key === sigla ||
        (item.sigla && item.sigla.toLowerCase() === sigla) ||
        (item.nombre && item.nombre.toLowerCase().indexOf(sigla) !== -1)) {
      return (item.oas && item.oas[nivel]) ? item.oas[nivel] : [];
    }
  }
  return [];
}

// ── Helper: lista de asignaturas para un nivel ─────────────
function getPlanComunAsignaturas(nivel) {
  var result = [];
  for (var key in CURRICULA_PLAN_COMUN) {
    var item = CURRICULA_PLAN_COMUN[key];
    if (!nivel || (item.niveles && item.niveles.indexOf(nivel) !== -1)) {
      result.push({ key: key, nombre: item.nombre, sigla: item.sigla });
    }
  }
  return result;
}
