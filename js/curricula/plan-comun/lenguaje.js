// =============================================================================
//  PLAN COMÚN — Lenguaje y Comunicación
//  Archivo: js/curricula/plan-comun/lenguaje.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['lenguaje'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['lenguaje'] = {
  nombre: 'Lenguaje y Comunicación',
  sigla:  'LEN',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    // Básica — ejes estables a lo largo de 1B-8B (DS 439/2012 + DS 369/2015).
    '1B': ['Lectura', 'Escritura', 'Comunicación oral'],
    '2B': ['Lectura', 'Escritura', 'Comunicación oral'],
    '3B': ['Lectura', 'Escritura', 'Comunicación oral'],
    '4B': ['Lectura', 'Escritura', 'Comunicación oral'],
    '5B': ['Lectura', 'Escritura', 'Comunicación oral'],
    '6B': ['Lectura', 'Escritura', 'Comunicación oral'],
    '7B': ['Lectura', 'Escritura', 'Comunicación oral'],
    '8B': ['Lectura', 'Escritura', 'Comunicación oral'],
    // Media — unidades temáticas de las Bases (referenciales; los docentes pueden adaptar).
    '1M': ['Comunicación y sociedad','La libertad como tema literario','Ciudadanos y opinión','Relaciones humanas en el teatro y la literatura'],
    '2M': ['Sobre la ausencia: exilio, migración e identidad','Ciudadanía y trabajo','Lo divino y lo humano','Poder y ambición'],
    '3M': ['Lectura literaria y no literaria','Escritura académica y creativa','Comunicación oral'],
    '4M': ['Lectura literaria y no literaria','Escritura académica y creativa','Comunicación oral']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — esquema canónico:
  //    { codigo: 'OA1', eje: 'Lectura'|'Escritura'|'Comunicación oral'|'Investigación',
  //      descripcion: '...', provisional?: true }
  //
  //  Estado actual:
  //    · 1B–8B   → sin portar; se sirve por fallback desde CURRICULA_CHILE.getOAs()
  //                (los datos legacy tienen truncamientos; ver TODO abajo).
  //    · 1M / 2M → portados desde legacy tal cual, marcados provisional:true
  //                porque varias descripciones vienen cortadas desde la fuente PDF.
  //                NO rellenar a mano; reemplazar cuando se suba Bases oficiales.
  //    · 3M / 4M → vacío; insertar al recibir material DS 193/2019 FG.
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1B': [],
    '2B': [],
    '3B': [],
    '4B': [],
    '5B': [],
    '6B': [],
    '7B': [],
    '8B': [],
    '1M': [
      {codigo:'OA1', eje:'Lectura', descripcion:'Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con sus preferencias y', provisional:true},
      {codigo:'OA2', eje:'Lectura', descripcion:'Reflexionar sobre las diferentes dimensiones de la experiencia humana, propia y ajena, a partir de l', provisional:true},
      {codigo:'OA3', eje:'Lectura', descripcion:'Analizar las narraciones leídas para enriquecer su comprensión, considerando, cuando sea pertinente', provisional:true},
      {codigo:'OA4', eje:'Lectura', descripcion:'Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando sea pertinente', provisional:true},
      {codigo:'OA5', eje:'Lectura', descripcion:'Analizar los textos dramáticos leídos o vistos, para enriquecer su comprensión, considerando, cuando', provisional:true},
      {codigo:'OA6', eje:'Lectura', descripcion:'Comprender la visión de mundo que se expresa a través de las tragedias leídas, considerando sus cara', provisional:true},
      {codigo:'OA7', eje:'Lectura', descripcion:'Comprender la relevancia de las obras del Romanticismo, considerando sus características y el contex', provisional:true},
      {codigo:'OA8', eje:'Lectura', descripcion:'Formular una interpretación de los textos literarios leídos o vistos, que sea coherente con su análi', provisional:true},
      {codigo:'OA9', eje:'Lectura', descripcion:'Analizar y evaluar textos con finalidad argumentativa, como columnas de opinión, cartas, discursos y', provisional:true},
      {codigo:'OA10',eje:'Lectura', descripcion:'Analizar y evaluar textos de los medios de comunicación, como noticias, reportajes, cartas al direct', provisional:true},
      {codigo:'OA11',eje:'Lectura', descripcion:'Leer y comprender textos no literarios para contextualizar y complementar las lecturas literarias re', provisional:true},
      {codigo:'OA12',eje:'Escritura', descripcion:'Aplicar flexiblemente y creativamente las habilidades de escritura adquiridas en clases como medio d', provisional:true},
      {codigo:'OA13',eje:'Escritura', descripcion:'Escribir, con el propósito de explicar un tema, textos de diversos géneros (por ejemplo, artículos', provisional:true},
      {codigo:'OA14',eje:'Escritura', descripcion:'Escribir, con el propósito de persuadir, textos de diversos géneros, en particular ensayos sobre los', provisional:true},
      {codigo:'OA15',eje:'Escritura', descripcion:'Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto, el destinatar', provisional:true},
      {codigo:'OA16',eje:'Escritura', descripcion:'Usar consistentemente el estilo directo y el indirecto en textos escritos y orales', provisional:true},
      {codigo:'OA17',eje:'Escritura', descripcion:'Usar en sus textos recursos de correferencia léxica compleja, empleando adecuadamente la metáfora y', provisional:true},
      {codigo:'OA18',eje:'Escritura', descripcion:'Escribir correctamente para facilitar la comprensión al lector', provisional:true},
      {codigo:'OA19',eje:'Comunicación oral', descripcion:'Comprender, comparar y evaluar textos orales y audiovisuales tales como exposiciones, discursos, doc', provisional:true},
      {codigo:'OA20',eje:'Comunicación oral', descripcion:'Resumir un discurso argumentativo escuchado, explicando y evaluando los argumentos usados por el emi', provisional:true},
      {codigo:'OA21',eje:'Comunicación oral', descripcion:'Dialogar constructivamente para debatir o explorar ideas', provisional:true},
      {codigo:'OA22',eje:'Comunicación oral', descripcion:'Expresarse frente a una audiencia de manera clara y adecuada a la situación para comunicar temas de', provisional:true},
      {codigo:'OA23',eje:'Comunicación oral', descripcion:'Analizar los posibles efectos de los elementos lingüísticos, paralingüísticos', provisional:true},
      {codigo:'OA24',eje:'Investigación', descripcion:'Realizar investigaciones sobre diversos temas para complementar sus lecturas o responder interrogant', provisional:true}
    ],
    '2M': [
      {codigo:'OA1', eje:'Lectura', descripcion:'Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con sus', provisional:true},
      {codigo:'OA2', eje:'Lectura', descripcion:'Reflexionar sobre las diferentes dimensiones de la experiencia humana, propia y ajena, a', provisional:true},
      {codigo:'OA3', eje:'Lectura', descripcion:'Analizar las narraciones leídas para enriquecer su comprensión, considerando', provisional:true},
      {codigo:'OA4', eje:'Lectura', descripcion:'Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando sea pertinente', provisional:true},
      {codigo:'OA5', eje:'Lectura', descripcion:'Analizar los textos dramáticos leídos o vistos, para enriquecer su comprensión, considerando, cuando', provisional:true},
      {codigo:'OA6', eje:'Lectura', descripcion:'Comprender la relevancia de las obras del Siglo de Oro, considerando sus características y el contex', provisional:true},
      {codigo:'OA8', eje:'Lectura', descripcion:'Formular una interpretación de los textos literarios leídos o vistos, que sea coherente', provisional:true},
      {codigo:'OA9', eje:'Lectura', descripcion:'Analizar y evaluar textos con finalidad argumentativa, como columnas de opinión, cartas al director', provisional:true},
      {codigo:'OA10',eje:'Lectura', descripcion:'Analizar y evaluar textos de los medios de comunicación, como noticias, reportajes, cartas al direct', provisional:true},
      {codigo:'OA11',eje:'Lectura', descripcion:'Leer y comprender textos no literarios para contextualizar y complementar las lecturas literarias re', provisional:true},
      {codigo:'OA12',eje:'Escritura', descripcion:'Aplicar flexiblemente y creativamente las habilidades de escritura adquiridas en clases como medio d', provisional:true},
      {codigo:'OA13',eje:'Escritura', descripcion:'Escribir, con el propósito de explicar un tema, textos de diversos géneros (por ejemplo, artículos', provisional:true},
      {codigo:'OA14',eje:'Escritura', descripcion:'Escribir, con el propósito de persuadir, textos de diversos géneros, en particular ensayos sobre los', provisional:true},
      {codigo:'OA15',eje:'Escritura', descripcion:'Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto, el destinatar', provisional:true},
      {codigo:'OA16',eje:'Escritura', descripcion:'Usar consistentemente el estilo directo y el indirecto en textos escritos y orales', provisional:true},
      {codigo:'OA17',eje:'Escritura', descripcion:'Emplear frases nominales complejas como recurso para compactar la información y establecer correfere', provisional:true},
      {codigo:'OA18',eje:'Escritura', descripcion:'Escribir correctamente para facilitar la comprensión al lector', provisional:true},
      {codigo:'OA19',eje:'Comunicación oral', descripcion:'Comprender, comparar y evaluar textos orales y audiovisuales tales como exposiciones, discursos, doc', provisional:true},
      {codigo:'OA20',eje:'Comunicación oral', descripcion:'Evaluar el punto de vista de un emisor, su razonamiento y uso de recursos retóricos (vocabulario, or', provisional:true},
      {codigo:'OA21',eje:'Comunicación oral', descripcion:'Dialogar constructivamente para debatir o explorar ideas', provisional:true},
      {codigo:'OA22',eje:'Comunicación oral', descripcion:'Expresarse frente a una audiencia de manera clara y adecuada a la situación para comunicar temas de', provisional:true},
      {codigo:'OA23',eje:'Comunicación oral', descripcion:'Analizar los posibles efectos de los elementos lingüísticos, paralingüísticos y no lingüísticos que', provisional:true},
      {codigo:'OA24',eje:'Investigación', descripcion:'Realizar investigaciones sobre diversos temas para complementar sus lecturas o responder interrogant', provisional:true}
    ],
    '3M': [
      // TODO: insertar OAs LEN FG 3°M (DS 193/2019). Formato: { codigo, eje, descripcion }
    ],
    '4M': [
      // TODO: insertar OAs LEN FG 4°M (DS 193/2019). Formato: { codigo, eje, descripcion }
    ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Lectura', 'Escritura', 'Comunicación oral', 'Investigación']
};

