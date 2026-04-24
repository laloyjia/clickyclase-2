// =============================================================================
//  PLAN COMÚN — Orientación
//  Archivo: js/curricula/plan-comun/orientacion.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['orientacion'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['orientacion'] = {
  nombre: 'Orientación',
  sigla:  'ORI',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    '1B': ['Yo y los demás','Emociones','Convivencia escolar'],
    '2B': ['Identidad personal','Habilidades sociales','Valores'],
    '3B': ['Autoconocimiento','Resolución de conflictos','Ciudadanía'],
    '4B': ['Proyecto de vida básico','Habilidades para el aprendizaje','Participación'],
    '5B': ['Adolescencia','Toma de decisiones','Salud mental básica'],
    '6B': ['Orientación vocacional inicial','Habilidades del siglo XXI','Prevención'],
    '7B': ['Identidad y proyecto de vida','Orientación vocacional','Comunidad'],
    '8B': ['Transición a educación media','Opciones de futuro','Vida y ciudadanía'],
    '1M': ['Identidad y autoconocimiento','Proyecto de vida','Habilidades socioemocionales'],
    '2M': ['Orientación vocacional','Mundo del trabajo','Salud mental adolescente'],
    '3M': ['Decisiones de futuro','Ciudadanía activa','Bienestar y resiliencia'],
    '4M': ['Proyecto de vida adulta','Transición a educación superior','Ciudadanía']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases (DS 439/2012 + DS 369/2015 +
  //  DS 193/2019 FG para 3M-4M).
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1B': [ /* TODO */ ], '2B': [ /* TODO */ ], '3B': [ /* TODO */ ], '4B': [ /* TODO */ ],
    '5B': [ /* TODO */ ], '6B': [ /* TODO */ ], '7B': [ /* TODO */ ], '8B': [ /* TODO */ ],
    '1M': [ /* TODO */ ], '2M': [ /* TODO */ ], '3M': [ /* TODO */ ], '4M': [ /* TODO */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Crecimiento personal','Relaciones interpersonales','Pertenencia y participación','Gestión y proyecto de vida']
};

