// =============================================================================
//  PLAN COMÚN — Tecnología
//  Archivo: js/curricula/plan-comun/tecnologia.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['tecnologia'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['tecnologia'] = {
  nombre: 'Tecnología',
  sigla:  'TEC',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  unidades: {
    '1B': ['Objetos tecnológicos del hogar','Materiales básicos','Diseño simple'],
    '2B': ['Tecnología en mi vida','Construcción básica','Resolución de problemas'],
    '3B': ['Sistemas tecnológicos','Materiales y procesos','Diseño y construcción'],
    '4B': ['Tecnología y sociedad','Energía en tecnología','Proyecto tecnológico'],
    '5B': ['Diseño técnico','Circuitos básicos','Innovación tecnológica'],
    '6B': ['TIC básicas','Automatización simple','Impacto tecnológico'],
    '7B': ['Programación básica','Robótica educativa','Tecnología y empleo'],
    '8B': ['Pensamiento computacional','Proyectos tecnológicos','Tecnología sustentable'],
    '1M': ['Pensamiento computacional','Programación básica (Python/Scratch)','Tecnología y sociedad'],
    '2M': ['Desarrollo de proyectos digitales','Ciberseguridad básica','Emprendimiento tecnológico']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases (DS 439/2012 + DS 369/2015).
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1B': [ /* TODO */ ], '2B': [ /* TODO */ ], '3B': [ /* TODO */ ], '4B': [ /* TODO */ ],
    '5B': [ /* TODO */ ], '6B': [ /* TODO */ ], '7B': [ /* TODO */ ], '8B': [ /* TODO */ ],
    '1M': [ /* TODO */ ], '2M': [ /* TODO */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Identificar oportunidades y problemas','Diseñar y hacer','Evaluar impactos y mejorar']
};

