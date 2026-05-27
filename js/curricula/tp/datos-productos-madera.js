// =============================================
// DATOS CURRICULARES — Especialidad Productos de la Madera
// Archivo: js/curricula/tp/datos-productos-madera.js
// Sector: Transformación y manufactura de productos de madera
//
// Estado: PLACEHOLDER ESTRUCTURAL — pendiente carga de PDF MINEDUC
// Cuando se cargue el Programa de Estudio oficial, completar el objeto
// 'modulos' con la estructura:
//   {
//     'PM1': { num, nombre, nivel:'3M', horas, oas: {...}, aes: {...} },
//     'PM2': { ... }
//   }
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['productos-madera'] = {
  nombre:  'Productos de la Madera',
  sigla:   'PM',
  niveles: ['3M', '4M'],
  _pendiente: 'Cargar Programa de Estudio MINEDUC oficial para esta especialidad.',
  modulos: {
    // ══════════════════════════════════════════════════════
    // 3° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'PM1': { num: 'PM1', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },
    // 'PM2': { num: 'PM2', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },

    // ══════════════════════════════════════════════════════
    // 4° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'PM5': { num: 'PM5', nombre: '— Pendiente —', nivel: '4M', horas: 0, oas: {}, aes: {} },
  }
};
