// =============================================================================
//  PLAN COMÚN — Artes Visuales
//  Archivo: js/curricula/plan-comun/artes.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['artes'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['artes'] = {
  nombre: 'Artes Visuales',
  sigla:  'ART',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  unidades: {
    '1B': ['Expresión plástica libre','Color y forma','Arte y entorno'],
    '2B': ['Técnicas básicas','Observación artística','Arte chileno básico'],
    '3B': ['Elementos del lenguaje visual','Técnicas mixtas','Arte y cultura'],
    '4B': ['Composición visual','Historia del arte básica','Creación artística'],
    '5B': ['Arte y patrimonio','Técnicas avanzadas','Proyecto artístico'],
    '6B': ['Arte latinoamericano','Diseño básico','Crítica de arte'],
    '7B': ['Arte contemporáneo','Lenguajes artísticos','Proyecto creativo'],
    '8B': ['Arte y sociedad','Portafolio artístico','Arte digital básico'],
    '1M': ['Lenguaje visual contemporáneo','Arte y patrimonio','Proyecto artístico'],
    '2M': ['Arte latinoamericano y chileno','Diseño y comunicación visual','Proyecto final']
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
  habilidades: ['Expresar y crear visualmente','Apreciar y responder frente al arte']
};

