// =============================================================================
//  PLAN COMÚN — Química
//  Archivo: js/curricula/plan-comun/quimica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 369/2015 7°B–2°M, DS 193/2019 3°M–4°M).
//
//  Nota arquitectónica:
//   - 1°M-2°M: Química es uno de los ejes de Ciencias Naturales (ver ciencias.js).
//   - 3°M-4°M: En el plan común NO existe "Química" como asignatura propia.
//     Vive como ELECTIVO de Profundización HC (DS 193/2019), bajo
//     `electivos['quimica-hc']`.
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['quimica'] = {
  nombre: 'Química',
  sigla:  'QUI',
  niveles: ['1M','2M'],   // 3M-4M solo via electivos HC
  unidades: {
    '1M': ['Modelo mecano-cuántico y configuración electrónica','Enlace químico y formación de moléculas','Estequiometría y disoluciones','Hidrocarburos y química del carbono'],
    '2M': ['Reactividad y equilibrio químico','Ácido-base y soluciones','Termoquímica y cinética','Compuestos del carbono y polímeros']
  },
  oas: {
    '1M': [
      { codigo: 'OA17', eje: 'Química', descripcion: 'Investigar y argumentar sobre la importancia, aplicaciones y consecuencias de la nanotecnología y su relación con la química, considerando: aplicaciones (en medicina, electrónica, ingeniería); consecuencias (sociales, económicas, ambientales y éticas).' },
      { codigo: 'OA18', eje: 'Química', descripcion: 'Investigar experimentalmente y explicar las propiedades de los compuestos orgánicos (alcanos, alquenos, alquinos, alcoholes, aldehídos, cetonas, ácidos carboxílicos, ésteres, éteres y aminas), considerando sus estructuras, enlaces, reactividad y aplicaciones tecnológicas y/o medicinales.' },
      { codigo: 'OA19', eje: 'Química', descripcion: 'Investigar experimentalmente y explicar el efecto de algunos factores (concentración, temperatura, presión, superficie de contacto y catalizadores) en la velocidad de reacciones químicas (cambio químico), considerando representaciones con ecuaciones químicas, modelos y teorías de las reacciones.' },
      { codigo: 'OA20', eje: 'Química', descripcion: 'Explicar el equilibrio químico de las reacciones reversibles, considerando: el principio de Le Chatelier, el efecto de la temperatura, la presión y la concentración de reactivos y productos; representaciones gráficas, modelos y ecuaciones químicas.' }
    ],
    '2M': [
      { codigo: 'OA15', eje: 'Química', descripcion: 'Explicar, por medio de modelos y la experimentación, las propiedades de las soluciones en ejemplos cercanos, considerando: el estado físico (sólido, líquido y gaseoso); sus componentes (soluto y solvente); la cantidad de soluto disuelto (concentración).' },
      { codigo: 'OA16', eje: 'Química', descripcion: 'Investigar experimentalmente y explicar las características de las reacciones ácido-base, considerando: el comportamiento de ácidos y bases (incluyendo disociación, neutralización, formación de iones, reacción con metales, entre otros); los conceptos de pH, indicadores y aplicación de escalas para clasificarlas; sus implicancias y aplicaciones en procesos cotidianos (concentración de drogas, valor de pH en soluciones de uso casero) e industriales (papel y celulosa, productos farmacéuticos).' },
      { codigo: 'OA17', eje: 'Química', descripcion: 'Planificar y conducir una investigación experimental para proveer evidencias que expliquen los procesos químicos de la formación de compuestos, considerando: los cambios de la materia y la energía involucrada; los reordenamientos de átomos en la formación de nuevos compuestos químicos; algunas reacciones químicas cotidianas (oxidación, combustión, fotosíntesis, respiración, entre otras).' },
      { codigo: 'OA18', eje: 'Química', descripcion: 'Investigar y comunicar propiedades de algunos compuestos orgánicos (como alcanos, alquenos, alquinos, alcoholes, aldehídos, cetonas, éteres, ésteres, ácidos carboxílicos y aminas), considerando: hibridación del carbono; los grupos funcionales presentes; sus aplicaciones industriales y comerciales; sus efectos en la salud y el ambiente.' }
    ]
  },
  actitudes:   [],
  habilidades: ['Observar y plantear preguntas', 'Planificar y conducir una investigación', 'Procesar, analizar e interpretar evidencia', 'Evaluar y comunicar'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVO DIFERENCIADO HC — QUÍMICA (3°M y 4°M)
  //  Decreto Supremo N°193/2019 — Programa de Estudio Mineduc, febrero 2021
  // ────────────────────────────────────────────────────────────────────
  electivos: {
    'quimica-hc': {
      nombre:  'Química (Plan Diferenciado HC)',
      sigla:   'QUI-HC',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Programa de Estudio Mineduc, febrero 2021',

      unidades: {
        '3M': [
          'Fenómenos químicos del entorno y sus efectos',
          'Química y Tecnología: aplicaciones para la vida',
          'Reacciones químicas: espontaneidad y cinética',
          'Química para la sustentabilidad'
        ],
        '4M': [
          'Fenómenos químicos del entorno y sus efectos',
          'Química y Tecnología: aplicaciones para la vida',
          'Reacciones químicas: espontaneidad y cinética',
          'Química para la sustentabilidad'
        ]
      },

      // Visión global del Programa (OA por unidad)
      oasPorUnidad: {
        'Fenómenos químicos del entorno y sus efectos':        ['OA2', 'OA7'],
        'Química y Tecnología: aplicaciones para la vida':     ['OA1', 'OA5'],
        'Reacciones químicas: espontaneidad y cinética':       ['OA3', 'OA5'],
        'Química para la sustentabilidad':                     ['OA4', 'OA6']
      },

      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Evaluar el desarrollo del conocimiento científico y tecnológico en nanoquímica y química de polímeros, considerando sus aplicaciones y consecuencias en ámbitos tales como el ambiental, médico, agrícola e industrial.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Explicar, por medio de investigaciones experimentales y no experimentales, fenómenos ácido-base, de óxido-reducción y de polimerización-despolimerización presentes en sistemas naturales y en aplicaciones tecnológicas.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar y comunicar, con base en evidencia científica, cómo la termodinámica y la cinética de reacciones químicas contribuyen a comprender el funcionamiento de los sistemas naturales y sus respuestas a cambios ejercidos sobre estos.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Explicar efectos del cambio climático sobre los ciclos biogeoquímicos y los equilibrios químicos que ocurren en los océanos, la atmósfera, las aguas dulces y los suelos, así como sus consecuencias sobre el bienestar de las personas y el desarrollo sostenible.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el origen, las vías de exposición, los efectos y las propiedades de contaminantes químicos provenientes de actividades domésticas e industriales (como minería, agricultura y desarrollo urbano) sobre los sistemas naturales y los servicios ecosistémicos que estos brindan a las personas y a la sociedad.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Evaluar la contribución de la química y sus aplicaciones tecnológicas en el entendimiento, la prevención y mitigación de efectos derivados del cambio climático y la restauración de los sistemas naturales afectados.' },
          { codigo: 'OA7', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la química con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales, considerando las implicancias éticas, sociales y ambientales.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Evaluar el desarrollo del conocimiento científico y tecnológico en nanoquímica y química de polímeros, considerando sus aplicaciones y consecuencias en ámbitos tales como el ambiental, médico, agrícola e industrial.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Explicar, por medio de investigaciones experimentales y no experimentales, fenómenos ácido-base, de óxido-reducción y de polimerización-despolimerización presentes en sistemas naturales y en aplicaciones tecnológicas.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar y comunicar, con base en evidencia científica, cómo la termodinámica y la cinética de reacciones químicas contribuyen a comprender el funcionamiento de los sistemas naturales y sus respuestas a cambios ejercidos sobre estos.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Explicar efectos del cambio climático sobre los ciclos biogeoquímicos y los equilibrios químicos que ocurren en los océanos, la atmósfera, las aguas dulces y los suelos, así como sus consecuencias sobre el bienestar de las personas y el desarrollo sostenible.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el origen, las vías de exposición, los efectos y las propiedades de contaminantes químicos provenientes de actividades domésticas e industriales (como minería, agricultura y desarrollo urbano) sobre los sistemas naturales y los servicios ecosistémicos que estos brindan a las personas y a la sociedad.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Evaluar la contribución de la química y sus aplicaciones tecnológicas en el entendimiento, la prevención y mitigación de efectos derivados del cambio climático y la restauración de los sistemas naturales afectados.' },
          { codigo: 'OA7', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la química con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales, considerando las implicancias éticas, sociales y ambientales.' }
        ]
      },

      habilidades: [
        { codigo: 'OAa', eje: 'Planificar y conducir investigación',  descripcion: 'Formular preguntas y problemas sobre tópicos científicos de interés, a partir de la observación de fenómenos y/o la exploración de diversas fuentes.' },
        { codigo: 'OAb', eje: 'Planificar y conducir investigación',  descripcion: 'Planificar y desarrollar investigaciones que permitan recoger evidencias y contrastar hipótesis, con apoyo de herramientas tecnológicas y matemáticas.' },
        { codigo: 'OAc', eje: 'Analizar e interpretar datos',         descripcion: 'Describir patrones, tendencias y relaciones entre datos, información y variables.' },
        { codigo: 'OAd', eje: 'Analizar e interpretar datos',         descripcion: 'Analizar las relaciones entre las partes de un sistema en fenómenos y problemas de interés, a partir de tablas, gráficos, diagramas y modelos.' },
        { codigo: 'OAe', eje: 'Construir explicaciones y soluciones', descripcion: 'Construir, usar y comunicar argumentos científicos.' },
        { codigo: 'OAf', eje: 'Construir explicaciones y soluciones', descripcion: 'Desarrollar y usar modelos basados en evidencia, para predecir y explicar mecanismos y fenómenos naturales.' },
        { codigo: 'OAg', eje: 'Construir explicaciones y soluciones', descripcion: 'Diseñar proyectos para encontrar soluciones a problemas, usando la imaginación y la creatividad.' },
        { codigo: 'OAh', eje: 'Evaluar',                              descripcion: 'Evaluar la validez de información proveniente de diversas fuentes, distinguiendo entre evidencia científica e interpretación, y analizar sus alcances y limitaciones.' },
        { codigo: 'OAi', eje: 'Evaluar',                              descripcion: 'Analizar críticamente implicancias sociales, económicas, éticas y ambientales de problemas relacionados con controversias públicas que involucran ciencia y tecnología.' }
      ],

      actitudes: [
        'Pensar con perseverancia y proactividad para encontrar soluciones innovadoras a los problemas.',
        'Actuar de acuerdo con los principios de la ética en el uso de la información y de la tecnología, respetando la propiedad intelectual y la privacidad de las personas.',
        'Pensar con consciencia, reconociendo que los errores ofrecen oportunidades para el aprendizaje.',
        'Interesarse por las posibilidades que ofrece la tecnología para el desarrollo intelectual, personal y social del individuo.',
        'Trabajar con empatía y respeto en el contexto de la diversidad, eliminando toda expresión de prejuicio y discriminación.',
        'Trabajar con responsabilidad y liderazgo en la realización de las tareas colaborativas y en función del bienestar común.',
        'Pensar con autorreflexión y autonomía para gestionar el propio aprendizaje, identificando capacidades, fortalezas y aspectos por mejorar.'
      ]
    }
  }
};
