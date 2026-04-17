// =============================================
// datos-curriculares.js  — PUNTO DE ENTRADA
// =============================================
// Este archivo mantiene retrocompatibilidad con el código
// existente (planificacion.html, material.html).
//
// Los datos reales de cada especialidad están en:
//   js/curricula/datos-electronica.js
//   js/curricula/datos-construccion.js
//   js/curricula/datos-[especialidad].js  ← agregar aquí
//
// Al cargar, este archivo expone:
//   window.CURRICULA_FULL  → { electronica: {...}, construccion: {...}, ... }
//   window.MODULOS         → módulos de Electrónica (retrocompat)
//   window.OAG_DEFINICIONES → OAG de Electrónica (retrocompat)
// =============================================

// CURRICULA_FULL se inicializa en cada archivo de especialidad.
// Si este script carga antes que ellos, lo pre-inicializamos.
window.CURRICULA_FULL = window.CURRICULA_FULL || {};

// ── Helper: obtener módulos según especialidad del usuario ────
// Uso: var mods = getCurriculaModulos(user.especialidad);
function getCurriculaModulos(espKey) {
  if (!espKey) return window.MODULOS || {};
  var esp = (espKey || '').toLowerCase();
  if (window.CURRICULA_FULL && window.CURRICULA_FULL[esp]) {
    return window.CURRICULA_FULL[esp].modulos || {};
  }
  // Fallback: MODULOS global (electrónica cargada directamente)
  return window.MODULOS || {};
}

// ── Helper: obtener OAG según especialidad ───────────────────
function getCurriculaOAG(espKey) {
  var esp = (espKey || '').toLowerCase();
  if (window.CURRICULA_FULL && window.CURRICULA_FULL[esp]) {
    return window.CURRICULA_FULL[esp].oag || {};
  }
  return window.OAG_DEFINICIONES || {};
}
