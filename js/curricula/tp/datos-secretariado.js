// =============================================
// DATOS CURRICULARES — Especialidad Secretariado
// Archivo: js/curricula/tp/datos-secretariado.js
// Sector: Apoyo administrativo, redacción y gestión de oficina
//
// Estado: PLACEHOLDER ESTRUCTURAL — pendiente carga de PDF MINEDUC
// Cuando se cargue el Programa de Estudio oficial, completar el objeto
// 'modulos' con la estructura:
//   {
//     'SEC1': { num, nombre, nivel:'3M', horas, oas: {...}, aes: {...} },
//     'SEC2': { ... }
//   }
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['secretariado'] = {
  nombre:  'Secretariado',
  sigla:   'SEC',
  niveles: ['3M', '4M'],
  _pendiente: 'Cargar Programa de Estudio MINEDUC oficial para esta especialidad.',
  modulos: {
    // ══════════════════════════════════════════════════════
    // 3° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'SEC1': { num: 'SEC1', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },
    // 'SEC2': { num: 'SEC2', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },

    // ══════════════════════════════════════════════════════
    // 4° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'SEC5': { num: 'SEC5', nombre: '— Pendiente —', nivel: '4M', horas: 0, oas: {}, aes: {} },
  }
};
