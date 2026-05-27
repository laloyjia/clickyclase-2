// =============================================
// DATOS CURRICULARES — Especialidad Logística
// Archivo: js/curricula/tp/datos-logistica.js
// Sector: Almacenamiento, transporte y distribución de mercancías
//
// Estado: PLACEHOLDER ESTRUCTURAL — pendiente carga de PDF MINEDUC
// Cuando se cargue el Programa de Estudio oficial, completar el objeto
// 'modulos' con la estructura:
//   {
//     'LOG1': { num, nombre, nivel:'3M', horas, oas: {...}, aes: {...} },
//     'LOG2': { ... }
//   }
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['logistica'] = {
  nombre:  'Logística',
  sigla:   'LOG',
  niveles: ['3M', '4M'],
  _pendiente: 'Cargar Programa de Estudio MINEDUC oficial para esta especialidad.',
  modulos: {
    // ══════════════════════════════════════════════════════
    // 3° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'LOG1': { num: 'LOG1', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },
    // 'LOG2': { num: 'LOG2', nombre: '— Pendiente —', nivel: '3M', horas: 0, oas: {}, aes: {} },

    // ══════════════════════════════════════════════════════
    // 4° MEDIO — Módulos pendientes de carga
    // ══════════════════════════════════════════════════════
    // 'LOG5': { num: 'LOG5', nombre: '— Pendiente —', nivel: '4M', horas: 0, oas: {}, aes: {} },
  }
};
