// =============================================================================
//  PLAN COMÚN — Filosofía
//  Archivo: js/curricula/plan-comun/filosofia.js
//
//  Fuente: Bases Curriculares Mineduc DS 193/2019 — Formación General 3°-4° Medio.
//
//  Estructura estándar:
//    window.CURRICULA_PLAN_COMUN['filosofia'] = {
//      nombre, sigla, niveles,
//      unidades: { '3M': [...], '4M': [...] },
//      oas: { '3M': [...], '4M': [...] },
//      actitudes: [...],
//      habilidades: [...]
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['filosofia'] = {
  nombre: 'Filosofía',
  sigla:  'FIL',
  niveles: ['3M','4M'],
  unidades: {
    '3M': ['¿Qué es la filosofía?','Epistemología','Ética y moral','Lógica básica'],
    '4M': ['Filosofía política','Filosofía del lenguaje','Estética','Proyecto filosófico']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases DS 193/2019 FG 3°-4° medio.
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '3M': [ /* TODO: OAs Filosofía 3°M FG DS 193/2019 */ ],
    '4M': [ /* TODO: OAs Filosofía 4°M FG DS 193/2019 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Problematizar y argumentar','Dialogar filosóficamente','Interpretar textos filosóficos','Aplicar categorías filosóficas a la realidad']
};
