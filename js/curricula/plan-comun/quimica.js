// =============================================================================
//  PLAN COMÚN — Química
//  Archivo: js/curricula/plan-comun/quimica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['quimica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['quimica'] = {
  nombre: 'Química',
  sigla:  'QUI',
  niveles: ['1M','2M','3M','4M'],
  // 1M-2M forman parte de Ciencias Naturales (ver ciencias.js).
  // 3M-4M son Formación General FG (DS 193/2019).
  unidades: {
    '1M': ['Estructura atómica','Tabla periódica','Enlace químico','Reacciones básicas'],
    '2M': ['Estequiometría','Soluciones','Termoquímica','Química orgánica básica'],
    '3M': ['Equilibrio químico','Electroquímica','Química orgánica funcional'],
    '4M': ['Química ambiental','Bioquímica básica','Polímeros y materiales']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases Curriculares (DS 369/2015 para
  //  1M-2M CN y DS 193/2019 para 3M-4M FG). Formato-ejemplo:
  //    { codigo:'OA1', eje:'Química', descripcion:'Explicar...' }
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1M': [ /* Química 1°M — DS 1264/2016 (Bases CN 7°-2°M, eje Química). Numeración Mineduc original preservada para trazabilidad. Ver ciencias.js. */
      { codigo: 'OA17', eje: 'Química', descripcion: 'Investigar experimentalmente y explicar, usando evidencias, que la fermentación, la combustión provocada por un motor y un calefactor, y la oxidación de metales, entre otras, son reacciones químicas presentes en la vida diaria, considerando: la producción de gas, la formación de precipitados, el cambio de temperatura, color y olor, y la emisión de luz, entre otros; la influencia de la cantidad de sustancia, la temperatura, el volumen y la presión en ellas; su representación simbólica en ecuaciones químicas; su impacto en los seres vivos y el entorno.' },
      { codigo: 'OA18', eje: 'Química', descripcion: 'Desarrollar un modelo que describa cómo el número total de átomos no varía en una reacción química y cómo la masa se conserva aplicando la ley de la conservación de la materia.' },
      { codigo: 'OA19', eje: 'Química', descripcion: 'Explicar la formación de compuestos binarios y ternarios, considerando las fuerzas eléctricas entre partículas y la nomenclatura inorgánica correspondiente.' },
      { codigo: 'OA20', eje: 'Química', descripcion: 'Establecer relaciones cuantitativas entre reactantes y productos en reacciones químicas (estequiometría) y explicar la formación de compuestos útiles para los seres vivos, como la formación de la glucosa en la fotosíntesis.' }
    ],
    '2M': [ /* Química 2°M — DS 1264/2016 (Bases CN 7°-2°M, eje Química). Numeración Mineduc original. Ver ciencias.js. */
      { codigo: 'OA15', eje: 'Química', descripcion: 'Explicar, por medio de modelos y la experimentación, las propiedades de las soluciones en ejemplos cercanos, considerando: el estado físico (sólido, líquido y gaseoso); sus componentes (soluto y solvente); la cantidad de soluto disuelto (concentración).' },
      { codigo: 'OA16', eje: 'Química', descripcion: 'Planificar y conducir una investigación experimental para proveer evidencias que expliquen las propiedades coligativas de las soluciones y su importancia en procesos cotidianos (la mantención de frutas y mermeladas en conserva) e industriales (aditivos en el agua de radiadores).' },
      { codigo: 'OA17', eje: 'Química', descripcion: 'Crear modelos del carbono y explicar sus propiedades como base para la formación de moléculas útiles para los seres vivos (biomoléculas presentes en la célula) y el entorno (hidrocarburos como petróleo y sus derivados).' },
      { codigo: 'OA18', eje: 'Química', descripcion: 'Desarrollar modelos que expliquen la estereoquímica e isomería de compuestos orgánicos como la glucosa, identificando sus propiedades y su utilidad para los seres vivos.' }
    ],
    '3M': [ /* TODO: OAs Química 3°M FG DS 193/2019 */ ],
    '4M': [ /* TODO: OAs Química 4°M FG DS 193/2019 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Observar y plantear preguntas', 'Planificar y conducir una investigación', 'Procesar, analizar e interpretar evidencia', 'Evaluar y comunicar']
};

