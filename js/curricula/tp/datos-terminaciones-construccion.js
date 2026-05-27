// =============================================
// DATOS CURRICULARES — Especialidad Terminaciones de Construcción
// Archivo: js/curricula/tp/datos-terminaciones-construccion.js
// Sector: Pintura, revestimientos y terminaciones finales en obra
//
// Estado: PLACEHOLDER ESTRUCTURAL — pendiente carga de PDF MINEDUC
// Cuando se cargue el Programa de Estudio oficial, completar el objeto
// 'modulos' con la estructura:
//   {
//     'TC1': { num, nombre, nivel:'3M', horas, oas: {...}, aes: {...} },
//     'TC2': { ... }
//   }
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['terminaciones-construccion'] = {
  nombre:  'Terminaciones de Construcción',
  sigla:   'TC',
  niveles: ['3M', '4M'],
  _pendiente: 'Cargar Programa de Estudio MINEDUC oficial para esta especialidad.',
  modulos: {
    // ══════════════════════════════════════════════════════
    // 3° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'TC1': { num: 'TC1', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },
    // 'TC2': { num: 'TC2', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },

    // ══════════════════════════════════════════════════════
    // 4° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'TC5': { num: 'TC5', nombre: '— Pendiente —', nivel: '4M', horas: 0, oas: {}, aes: {} },
  }
};
