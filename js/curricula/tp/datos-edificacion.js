// =============================================
// DATOS CURRICULARES — Especialidad Edificación
// Archivo: js/curricula/tp/datos-edificacion.js
// Sector: Obras de albañilería, hormigón y estructuras de edificación
//
// Estado: PLACEHOLDER ESTRUCTURAL — pendiente carga de PDF MINEDUC
// Cuando se cargue el Programa de Estudio oficial, completar el objeto
// 'modulos' con la estructura:
//   {
//     'EDI1': { num, nombre, nivel:'3M', horas, oas: {...}, aes: {...} },
//     'EDI2': { ... }
//   }
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['edificacion'] = {
  nombre:  'Edificación',
  sigla:   'EDI',
  niveles: ['3M', '4M'],
  _pendiente: 'Cargar Programa de Estudio MINEDUC oficial para esta especialidad.',
  modulos: {
    // ══════════════════════════════════════════════════════
    // 3° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'EDI1': { num: 'EDI1', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },
    // 'EDI2': { num: 'EDI2', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },

    // ══════════════════════════════════════════════════════
    // 4° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'EDI5': { num: 'EDI5', nombre: '— Pendiente —', nivel: '4M', horas: 0, oas: {}, aes: {} },
  }
};
