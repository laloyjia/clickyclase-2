// =============================================================================
//  PLAN COMÚN — Educación Física y Salud
//  Archivo: js/curricula/plan-comun/ed-fisica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['ed-fisica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['ed-fisica'] = {
  nombre: 'Educación Física y Salud',
  sigla:  'EDF',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    '1B': ['Habilidades motrices básicas','Juegos libres','Higiene'],
    '2B': ['Destrezas locomotoras','Juegos cooperativos','Vida activa'],
    '3B': ['Habilidades atléticas','Deporte básico','Bienestar'],
    '4B': ['Gimnasia','Deportes colectivos','Salud y actividad física'],
    '5B': ['Condición física','Deportes individuales','Nutrición básica'],
    '6B': ['Capacidades físicas','Deportes y competencia','Salud integral'],
    '7B': ['Entrenamiento básico','Deportes terrestres','Vida saludable'],
    '8B': ['Planificación de actividad física','Deportes alternativos','Vida saludable'],
    '1M': ['Capacidades físicas','Deporte y salud','Vida activa adolescente'],
    '2M': ['Entrenamiento personalizado','Deportes de conjunto','Bienestar integral'],
    '3M': ['Plan de actividad física','Deportes de aventura','Salud y rendimiento'],
    '4M': ['Proyecto de vida activa','Liderazgo deportivo','Actividad física para la vida']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases Curriculares (DS 439/2012
  //  Básica, DS 369/2015 7°B-2°M, DS 193/2019 3°M-4°M FG).
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1B': [ /* TODO */ ], '2B': [ /* TODO */ ], '3B': [ /* TODO */ ], '4B': [ /* TODO */ ],
    '5B': [ /* TODO */ ], '6B': [ /* TODO */ ], '7B': [ /* TODO */ ], '8B': [ /* TODO */ ],
    '1M': [ /* TODO */ ], '2M': [ /* TODO */ ], '3M': [ /* TODO */ ], '4M': [ /* TODO */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Habilidades motrices','Vida activa y saludable','Seguridad, juego limpio y liderazgo']
};

