// =============================================================================
//  PLAN COMÚN — Música
//  Archivo: js/curricula/plan-comun/musica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['musica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['musica'] = {
  nombre: 'Música',
  sigla:  'MUS',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  unidades: {
    '1B': ['Pulso y ritmo','Cantos y juegos','Sonidos del entorno'],
    '2B': ['Notación básica','Instrumentos básicos','Música folclórica'],
    '3B': ['Elementos musicales','Flauta dulce inicio','Música chilena'],
    '4B': ['Lectura musical','Conjunto vocal-instrumental','Géneros musicales'],
    '5B': ['Teoría musical básica','Expresión instrumental','Música popular'],
    '6B': ['Armonía básica','Creación musical','Música latinoamericana'],
    '7B': ['Música y contexto histórico','Composición','Apreciación musical'],
    '8B': ['Géneros y estilos musicales','Proyecto musical','Música y tecnología'],
    '1M': ['Músicas del mundo','Creación e interpretación','Análisis musical'],
    '2M': ['Música chilena e identidad','Proyecto musical','Música y tecnología']
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
  habilidades: ['Escuchar y apreciar','Interpretar y crear','Reflexionar y contextualizar']
};

