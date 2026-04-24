// =============================================================================
//  PLAN COMÚN — Índice / API
//  Archivo: js/curricula/plan-comun/index.js
//
//  Este archivo debe cargarse DESPUÉS de:
//    - _comun.js       (OAT, actitudes y habilidades transversales)
//    - Todas las asignaturas (lenguaje.js, matematica.js, historia.js, ...)
//
//  Expone helpers globales:
//    - getPlanComunOAs(asignatura, nivel)
//    - getPlanComunAsignaturas(nivel)
//    - getPlanComunActitudes(asignatura, tramo)
//    - getPlanComunHabilidades(asignatura, tramo)
//    - getPlanComunUnidades(asignatura, nivel)
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

// Niveles que corresponden a cada tramo
var NIVELES_BASICA = ['1B','2B','3B','4B','5B','6B'];
var NIVELES_MEDIA  = ['7B','8B','1M','2M','3M','4M']; // 7°B y 8°B en Chile son 2° ciclo básico pero el currículo es por asignatura media 7B-2M

function _tramoDeNivel(nivel) {
  if (NIVELES_BASICA.indexOf(nivel) !== -1) return 'basica';
  if (NIVELES_MEDIA.indexOf(nivel)  !== -1) return 'media';
  return 'basica';
}

// ── Helper: obtener OAs por asignatura y nivel ────────────────────
function getPlanComunOAs(asignatura, nivel) {
  var sigla = (asignatura || '').toLowerCase();
  for (var key in CURRICULA_PLAN_COMUN) {
    if (key === '_comun') continue;
    var item = CURRICULA_PLAN_COMUN[key];
    if (!item || typeof item !== 'object') continue;
    if (key === sigla ||
        (item.sigla && item.sigla.toLowerCase() === sigla) ||
        (item.nombre && item.nombre.toLowerCase().indexOf(sigla) !== -1)) {
      return (item.oas && item.oas[nivel]) ? item.oas[nivel] : [];
    }
  }
  return [];
}

// ── Helper: lista de asignaturas para un nivel ────────────────────
function getPlanComunAsignaturas(nivel) {
  var result = [];
  for (var key in CURRICULA_PLAN_COMUN) {
    if (key === '_comun') continue;
    var item = CURRICULA_PLAN_COMUN[key];
    if (!item || typeof item !== 'object') continue;
    if (!nivel || (item.niveles && item.niveles.indexOf(nivel) !== -1)) {
      result.push({ key: key, nombre: item.nombre, sigla: item.sigla, tramo: item.tramo });
    }
  }
  return result;
}

// ── Helper: actitudes (específicas o heredadas) ───────────────────
function getPlanComunActitudes(asignatura, tramoONivel) {
  var sigla = (asignatura || '').toLowerCase();
  var tramo = tramoONivel;
  if (tramo && tramo.length === 2) tramo = _tramoDeNivel(tramo); // recibí un nivel
  if (tramo !== 'basica' && tramo !== 'media') tramo = 'media';

  for (var key in CURRICULA_PLAN_COMUN) {
    if (key === '_comun') continue;
    var item = CURRICULA_PLAN_COMUN[key];
    if (!item) continue;
    if (key === sigla || (item.sigla && item.sigla.toLowerCase() === sigla)) {
      if (item.actitudes && item.actitudes.length) return item.actitudes;
      break;
    }
  }
  // Fallback: actitudes transversales
  var c = CURRICULA_PLAN_COMUN._comun;
  return (c && c.actitudes && c.actitudes[tramo]) ? c.actitudes[tramo] : [];
}

// ── Helper: habilidades (específicas o heredadas) ─────────────────
function getPlanComunHabilidades(asignatura, tramoONivel) {
  var sigla = (asignatura || '').toLowerCase();
  var tramo = tramoONivel;
  if (tramo && tramo.length === 2) tramo = _tramoDeNivel(tramo);
  if (tramo !== 'basica' && tramo !== 'media') tramo = 'media';

  for (var key in CURRICULA_PLAN_COMUN) {
    if (key === '_comun') continue;
    var item = CURRICULA_PLAN_COMUN[key];
    if (!item) continue;
    if (key === sigla || (item.sigla && item.sigla.toLowerCase() === sigla)) {
      if (item.habilidades && item.habilidades.length) return item.habilidades;
      break;
    }
  }
  var c = CURRICULA_PLAN_COMUN._comun;
  return (c && c.habilidades && c.habilidades[tramo]) ? c.habilidades[tramo] : [];
}

// ── Helper: unidades por asignatura y nivel ───────────────────────
function getPlanComunUnidades(asignatura, nivel) {
  var sigla = (asignatura || '').toLowerCase();
  for (var key in CURRICULA_PLAN_COMUN) {
    if (key === '_comun') continue;
    var item = CURRICULA_PLAN_COMUN[key];
    if (!item) continue;
    if (key === sigla || (item.sigla && item.sigla.toLowerCase() === sigla)) {
      return (item.unidades && item.unidades[nivel]) ? item.unidades[nivel] : [];
    }
  }
  return [];
}

// ── Helper: OAT por tramo ─────────────────────────────────────────
function getPlanComunOAT(tramoONivel) {
  var tramo = tramoONivel;
  if (tramo && tramo.length === 2) tramo = _tramoDeNivel(tramo);
  if (tramo !== 'basica' && tramo !== 'media') tramo = 'media';
  var c = CURRICULA_PLAN_COMUN._comun;
  return (c && c.oat && c.oat[tramo]) ? c.oat[tramo] : [];
}

// Exponer en window para acceso global (el código legacy asume funciones globales)
window.getPlanComunOAs          = getPlanComunOAs;
window.getPlanComunAsignaturas  = getPlanComunAsignaturas;
window.getPlanComunActitudes    = getPlanComunActitudes;
window.getPlanComunHabilidades  = getPlanComunHabilidades;
window.getPlanComunUnidades     = getPlanComunUnidades;
window.getPlanComunOAT          = getPlanComunOAT;
