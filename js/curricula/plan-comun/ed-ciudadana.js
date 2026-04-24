// =============================================================================
//  PLAN COMÚN — Educación Ciudadana
//  Archivo: js/curricula/plan-comun/ed-ciudadana.js
//
//  Fuente: Bases Curriculares Mineduc DS 193/2019 — Formación General 3°-4° Medio.
//
//  Estructura estándar:
//    window.CURRICULA_PLAN_COMUN['ed-ciudadana'] = {
//      nombre, sigla, niveles,
//      unidades: { '3M': [...], '4M': [...] },
//      oas: { '3M': [...], '4M': [...] },
//      actitudes: [...],
//      habilidades: [...]
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['ed-ciudadana'] = {
  nombre: 'Educación Ciudadana',
  sigla:  'EC',
  niveles: ['3M','4M'],
  unidades: {
    '3M': ['Democracia y participación','Sistema político chileno','Derechos Humanos'],
    '4M': ['Instituciones del Estado','Chile y el mundo','Proyecto ciudadano']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases DS 193/2019 FG 3°-4° medio.
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '3M': [ /* TODO: OAs Educación Ciudadana 3°M FG DS 193/2019 */ ],
    '4M': [ /* TODO: OAs Educación Ciudadana 4°M FG DS 193/2019 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Pensamiento crítico','Análisis y trabajo con fuentes','Pensamiento temporal y espacial','Comunicación y diálogo democrático']
};
