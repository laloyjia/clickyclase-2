// =============================================
// datos-curriculares.js  — PUNTO DE ENTRADA
// =============================================
// Mantiene retrocompatibilidad. Datos reales en js/curricula/tp/datos-*.js.
// Expone:
//   window.CURRICULA_FULL    → catalogo cargado por cada especialidad
//   window.MODULOS           → modulos de Electronica (retrocompat)
//   window.OAG_DEFINICIONES  → OAG oficial Mineduc (12 letras A-L)
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

// ── Helper: obtener modulos segun especialidad del usuario ────
function getCurriculaModulos(espKey) {
  if (!espKey) return window.MODULOS || {};
  var esp = (espKey || '').toLowerCase();
  if (window.CURRICULA_FULL && window.CURRICULA_FULL[esp]) {
    return window.CURRICULA_FULL[esp].modulos || {};
  }
  return window.MODULOS || {};
}

// ── Helper: obtener OAG segun especialidad ───────────────────
// Prioridad:
//   1. oag propio de la especialidad (si existe y NO esta vacio)
//   2. OAG_DEFINICIONES global (12 oficiales Mineduc desde electronica.js)
function getCurriculaOAG(espKey) {
  var esp = (espKey || '').toLowerCase();
  if (window.CURRICULA_FULL && window.CURRICULA_FULL[esp]) {
    var oag = window.CURRICULA_FULL[esp].oag;
    if (oag && Object.keys(oag).length > 0) return oag;
  }
  return window.OAG_DEFINICIONES || {};
}
