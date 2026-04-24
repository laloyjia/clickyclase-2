// =============================================================================
//  PLAN COMÚN — Física
//  Archivo: js/curricula/plan-comun/fisica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['fisica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['fisica'] = {
  nombre: 'Física',
  sigla:  'FIS',
  niveles: ['1M','2M','3M','4M'],
  // 1M-2M forman parte de Ciencias Naturales (ver ciencias.js).
  // 3M-4M son Formación General FG (DS 193/2019).
  unidades: {
    '1M': ['Cinemática','Dinámica newtoniana','Trabajo y energía'],
    '2M': ['Fluidos','Termodinámica','Ondas y sonido'],
    '3M': ['Electricidad y magnetismo','Óptica','Física moderna básica'],
    '4M': ['Electromagnetismo','Relatividad especial','Física cuántica básica']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases Curriculares (DS 369/2015 para
  //  1M-2M CN y DS 193/2019 para 3M-4M FG). Formato-ejemplo:
  //    { codigo:'OA1', eje:'Física', descripcion:'Explicar...' }
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1M': [ /* TODO: OAs Física 1°M (ver ciencias.js para CN) */ ],
    '2M': [ /* TODO: OAs Física 2°M (ver ciencias.js para CN) */ ],
    '3M': [ /* TODO: OAs Física 3°M FG DS 193/2019 */ ],
    '4M': [ /* TODO: OAs Física 4°M FG DS 193/2019 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Observar y plantear preguntas', 'Planificar y conducir una investigación', 'Procesar, analizar e interpretar evidencia', 'Evaluar y comunicar']
};

