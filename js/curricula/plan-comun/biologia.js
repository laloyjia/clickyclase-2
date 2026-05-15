// =============================================================================
//  PLAN COMÚN — Biología
//  Archivo: js/curricula/plan-comun/biologia.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['biologia'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['biologia'] = {
  nombre: 'Biología',
  sigla:  'BIO',
  niveles: ['1M','2M','3M','4M'],
  // 1M-2M forman parte de Ciencias Naturales (ver ciencias.js) — aquí se
  // mantiene la referencia para planificación por asignatura separada cuando
  // el establecimiento así lo organice. 3M-4M son Formación General FG (DS 193/2019).
  unidades: {
    '1M': ['Célula y sus procesos','Organismos y ambiente','Herencia y reproducción'],
    '2M': ['Genética molecular','Evolución','Ecosistemas y biodiversidad'],
    '3M': ['Fisiología humana','Neurociencia básica','Biotecnología'],
    '4M': ['Ecología y sustentabilidad','Biología molecular avanzada','Biotecnología y ética']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases Curriculares (DS 369/2015 para
  //  1M-2M CN y DS 193/2019 para 3M-4M FG). Formato-ejemplo:
  //    { codigo:'OA1', eje:'Biología', descripcion:'Explicar...' }
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1M': [ /* Biología 1°M — DS 1264/2016 (Bases CN 7°-2°M, eje Biología). Numeración Mineduc original preservada para trazabilidad. Ver ciencias.js. */
      { codigo: 'OA1', eje: 'Biología', descripcion: 'Explicar, basándose en evidencias, que los fósiles: se forman a partir de restos de animales y plantas; se forman en rocas sedimentarias; se ubican de acuerdo a su antigüedad en los estratos de la Tierra.' },
      { codigo: 'OA2', eje: 'Biología', descripcion: 'Analizar e interpretar datos para proveer de evidencias que apoyen que la diversidad de organismos es el resultado de la evolución, considerando: evidencias de la evolución (como el registro fósil, las estructuras anatómicas homólogas, la embriología y las secuencias de ADN); los postulados de la teoría de la selección natural; los aportes de científicos como Darwin y Wallace a las teorías evolutivas.' },
      { codigo: 'OA3', eje: 'Biología', descripcion: 'Explicar, basándose en evidencias, que la clasificación de la diversidad de organismos se construye a través del tiempo sobre la base de criterios taxonómicos que permiten organizarlos en grupos y subgrupos, identificando sus relaciones de parentesco con ancestros comunes.' },
      { codigo: 'OA4', eje: 'Biología', descripcion: 'Investigar y explicar cómo se organizan e interactúan los seres vivos en diversos ecosistemas, a partir de ejemplos de Chile, considerando: los niveles de organización de los seres vivos (como organismo, población, comunidad, ecosistema); las interacciones biológicas (como depredación, competencia, comensalismo, mutualismo, parasitismo).' },
      { codigo: 'OA5', eje: 'Biología', descripcion: 'Analizar e interpretar los factores que afectan el tamaño de las poblaciones (propagación de enfermedades, disponibilidad de energía y de recursos alimentarios, sequías, entre otros) y predecir posibles consecuencias sobre el ecosistema.' },
      { codigo: 'OA6', eje: 'Biología', descripcion: 'Desarrollar modelos que expliquen: el ciclo del carbono, el nitrógeno, el agua y el fósforo, y su importancia biológica; los flujos de energía en un ecosistema (redes y pirámides tróficas); la trayectoria de contaminantes y su bioacumulación.' },
      { codigo: 'OA7', eje: 'Biología', descripcion: 'Explicar, por medio de una investigación, el rol de la fotosíntesis y la respiración celular en el ecosistema considerando: el flujo de la energía; el ciclo de la materia.' },
      { codigo: 'OA8', eje: 'Biología', descripcion: 'Explicar y evaluar los efectos de acciones humanas (conservación ambiental, cultivos, forestación y deforestación, entre otras) y de fenómenos naturales (sequías, erupciones volcánicas, entre otras) en relación con: el equilibrio de los ecosistemas; la disponibilidad de recursos naturales renovables y no renovables; las posibles medidas para un desarrollo sustentable.' }
    ],
    '2M': [ /* Biología 2°M — DS 1264/2016 (Bases CN 7°-2°M, eje Biología). Numeración Mineduc original. Ver ciencias.js. */
      { codigo: 'OA1', eje: 'Biología', descripcion: 'Explicar cómo el sistema nervioso coordina las acciones del organismo para adaptarse a estímulos del ambiente por medio de señales transmitidas por neuronas a lo largo del cuerpo, e investigar y comunicar sus cuidados, como las horas de sueño, el consumo de drogas, café y alcohol, y la prevención de traumatismos.' },
      { codigo: 'OA2', eje: 'Biología', descripcion: 'Crear modelos que expliquen la regulación de: la glicemia por medio del control de las hormonas pancreáticas; los caracteres sexuales y las funciones reproductivas por medio del control de las hormonas sexuales en el organismo.' },
      { codigo: 'OA3', eje: 'Biología', descripcion: 'Explicar que la sexualidad humana y la reproducción son aspectos fundamentales de la vida del ser humano, considerando los aspectos biológicos, sociales, afectivos y psicológicos, y la responsabilidad individual frente a sí mismo y los demás.' },
      { codigo: 'OA4', eje: 'Biología', descripcion: 'Describir la fecundación, la implantación y el desarrollo del embrión, y analizar la responsabilidad de los padres en la nutrición prenatal y la lactancia.' },
      { codigo: 'OA5', eje: 'Biología', descripcion: 'Explicar y evaluar los métodos de regulación de la fertilidad e identificar los elementos de una paternidad y una maternidad responsables.' },
      { codigo: 'OA6', eje: 'Biología', descripcion: 'Investigar y argumentar, basándose en evidencias, que el material genético se transmite de generación en generación en organismos como plantas y animales, considerando: la comparación de la mitosis y la meiosis; las causas y consecuencias de anomalías y pérdida de control de la división celular (tumor, cáncer, trisomía, entre otros).' },
      { codigo: 'OA7', eje: 'Biología', descripcion: 'Desarrollar una explicación científica, basada en evidencias, sobre los procesos de herencia genética en plantas y animales, aplicando los principios básicos de la herencia propuestos por Mendel.' },
      { codigo: 'OA8', eje: 'Biología', descripcion: 'Investigar y explicar las aplicaciones que han surgido a raíz de la manipulación genética para generar alimentos, detergentes, vestuario, fármacos u otras, y evaluar sus implicancias éticas y sociales.' }
    ],
    '3M': [ /* TODO: OAs Biología 3°M FG DS 193/2019 */ ],
    '4M': [ /* TODO: OAs Biología 4°M FG DS 193/2019 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Observar y plantear preguntas', 'Planificar y conducir una investigación', 'Procesar, analizar e interpretar evidencia', 'Evaluar y comunicar'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVOS DIFERENCIADOS HC (3°M y 4°M) — DS 193/2019
  //  Programas de Estudio Mineduc, febrero 2021. Cada electivo agrupa OAs y
  //  unidades. Se exponen como sub-asignaturas:
  //    CURRICULA_PLAN_COMUN['biologia'].electivos['<key>']
  // ────────────────────────────────────────────────────────────────────
  electivos: {

    // ════════════════════════════════════════════════════════════════
    //  BIOLOGÍA DE LOS ECOSISTEMAS — Aprobado por Dec. Exento N°497 (2020)
    //  Programa de Estudio MINEDUC, febrero 2021
    // ════════════════════════════════════════════════════════════════
    'biologia-de-los-ecosistemas': {
      nombre:  'Biología de los Ecosistemas',
      sigla:   'BEC',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Aprobado Dec. Exento N°497 (2020)',

      // Nombres oficiales de las 4 unidades del programa MINEDUC
      unidades: {
        '3M': [
          'Analizando el estado actual de la biodiversidad',
          'Analizando la relación entre los servicios ecosistémicos y la sociedad',
          'Investigando evidencias del cambio climático para generar conciencia ambiental',
          'Integrando la biología con otras ciencias para dar solución a problemas'
        ],
        '4M': [
          'Analizando el estado actual de la biodiversidad',
          'Analizando la relación entre los servicios ecosistémicos y la sociedad',
          'Investigando evidencias del cambio climático para generar conciencia ambiental',
          'Integrando la biología con otras ciencias para dar solución a problemas'
        ]
      },

      // Mapeo de OA → Unidad según visión global del programa oficial
      oasPorUnidad: {
        'Analizando el estado actual de la biodiversidad': ['OA1'],
        'Analizando la relación entre los servicios ecosistémicos y la sociedad': ['OA2'],
        'Investigando evidencias del cambio climático para generar conciencia ambiental': ['OA3', 'OA4'],
        'Integrando la biología con otras ciencias para dar solución a problemas': ['OA5']
      },

      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Explicar el estado de la biodiversidad actual a partir de teorías y evidencias científicas sobre el origen de la vida, la evolución y la intervención humana.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Comprender la relación entre la biodiversidad, el funcionamiento de los sistemas naturales y la provisión de servicios que estos brindan al bienestar de las personas y la sociedad, considerando aspectos de bioenergética, dinámica de poblaciones y flujos de materia y energía como factores explicativos subyacentes.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Explicar los efectos del cambio climático sobre la biodiversidad, la productividad biológica y la resiliencia de los ecosistemas, así como sus consecuencias sobre los recursos naturales, las personas y el desarrollo sostenible.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Investigar y comunicar cómo la sociedad, mediante la ciencia y la tecnología, puede prevenir, mitigar o reparar los efectos del cambio climático sobre los componentes y procesos biológicos de los sistemas naturales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la biología con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales presentes en sistemas naturales, considerando las implicancias éticas, sociales y ambientales.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Explicar el estado de la biodiversidad actual a partir de teorías y evidencias científicas sobre el origen de la vida, la evolución y la intervención humana.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Comprender la relación entre la biodiversidad, el funcionamiento de los sistemas naturales y la provisión de servicios que estos brindan al bienestar de las personas y la sociedad, considerando aspectos de bioenergética, dinámica de poblaciones y flujos de materia y energía como factores explicativos subyacentes.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Explicar los efectos del cambio climático sobre la biodiversidad, la productividad biológica y la resiliencia de los ecosistemas, así como sus consecuencias sobre los recursos naturales, las personas y el desarrollo sostenible.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Investigar y comunicar cómo la sociedad, mediante la ciencia y la tecnología, puede prevenir, mitigar o reparar los efectos del cambio climático sobre los componentes y procesos biológicos de los sistemas naturales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la biología con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales presentes en sistemas naturales, considerando las implicancias éticas, sociales y ambientales.' }
        ]
      },

      // Objetivos de Aprendizaje de Habilidades — comunes a todas las asignaturas
      // científicas del nivel (DS 193/2019, Habilidades del Siglo XXI + Investigación científica)
      habilidades: [
        { codigo: 'OAa', eje: 'Planificar y conducir investigación',     descripcion: 'Formular preguntas y problemas sobre tópicos científicos de interés, a partir de la observación de fenómenos y/o la exploración de diversas fuentes.' },
        { codigo: 'OAb', eje: 'Planificar y conducir investigación',     descripcion: 'Planificar y desarrollar investigaciones que permitan recoger evidencias y contrastar hipótesis, con apoyo de herramientas tecnológicas y matemáticas.' },
        { codigo: 'OAc', eje: 'Analizar e interpretar datos',            descripcion: 'Describir patrones, tendencias y relaciones entre datos, información y variables.' },
        { codigo: 'OAd', eje: 'Analizar e interpretar datos',            descripcion: 'Analizar las relaciones entre las partes de un sistema en fenómenos y problemas de interés, a partir de tablas, gráficos, diagramas y modelos.' },
        { codigo: 'OAe', eje: 'Construir explicaciones y soluciones',    descripcion: 'Construir, usar y comunicar argumentos científicos.' },
        { codigo: 'OAf', eje: 'Construir explicaciones y soluciones',    descripcion: 'Desarrollar y usar modelos basados en evidencia, para predecir y explicar mecanismos y fenómenos naturales.' },
        { codigo: 'OAg', eje: 'Construir explicaciones y soluciones',    descripcion: 'Diseñar proyectos para encontrar soluciones a problemas, usando la imaginación y la creatividad.' },
        { codigo: 'OAh', eje: 'Evaluar',                                 descripcion: 'Evaluar la validez de información proveniente de diversas fuentes, distinguiendo entre evidencia científica e interpretación, y analizar sus alcances y limitaciones.' },
        { codigo: 'OAi', eje: 'Evaluar',                                 descripcion: 'Analizar críticamente implicancias sociales, económicas, éticas y ambientales de problemas relacionados con controversias públicas que involucran ciencia y tecnología.' }
      ],

      // Actitudes propuestas desde el marco de Habilidades para el siglo XXI
      actitudes: [
        'Pensar con perseverancia y proactividad para encontrar soluciones innovadoras a los problemas.',
        'Trabajar con autonomía y proactividad en trabajos colaborativos e individuales para llevar a cabo eficazmente proyectos de diversa índole.',
        'Trabajar con responsabilidad y liderazgo en la realización de las tareas colaborativas y en función del bienestar común.',
        'Interesarse por las posibilidades que ofrece la tecnología para el desarrollo intelectual, personal y social del individuo.',
        'Pensar con apertura hacia otros para valorar la comunicación como una forma de relacionarse con diversas personas y culturas, compartiendo ideas que favorezcan el desarrollo de la vida en sociedad.',
        'Trabajar con empatía y respeto en el contexto de la diversidad, eliminando toda expresión de prejuicio y discriminación.',
        'Pensar con autorreflexión y autonomía para gestionar el propio aprendizaje, identificando capacidades, fortalezas y aspectos por mejorar.'
      ]
    },

    // ════════════════════════════════════════════════════════════════
    //  BIOLOGÍA CELULAR Y MOLECULAR — Aprobado Dec. Exento N°496 (2020)
    //  Programa de Estudio MINEDUC, febrero 2021
    // ════════════════════════════════════════════════════════════════
    'biologia-celular-y-molecular': {
      nombre:  'Biología Celular y Molecular',
      sigla:   'BCM',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Aprobado Dec. Exento N°496 (2020)',

      // Nombres oficiales de las 4 unidades del programa MINEDUC
      unidades: {
        '3M': [
          'Comprendiendo la estructura y la función de la célula',
          'Estudiando la versatilidad de las proteínas',
          'Analizando la relación entre expresión y regulación génica',
          'Analizando aplicaciones en biología celular y molecular'
        ],
        '4M': [
          'Comprendiendo la estructura y la función de la célula',
          'Estudiando la versatilidad de las proteínas',
          'Analizando la relación entre expresión y regulación génica',
          'Analizando aplicaciones en biología celular y molecular'
        ]
      },

      // Mapeo OA → Unidad según visión global del programa oficial
      oasPorUnidad: {
        'Comprendiendo la estructura y la función de la célula': ['OA1', 'OA2'],
        'Estudiando la versatilidad de las proteínas':           ['OA5'],
        'Analizando la relación entre expresión y regulación génica': ['OA3', 'OA4'],
        'Analizando aplicaciones en biología celular y molecular':    ['OA6', 'OA7']
      },

      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Investigar el desarrollo del conocimiento de biología celular y molecular a lo largo de la historia y su relación con diversas disciplinas como la química, la física y la matemática, entre otros.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Explicar la estructura y organización de la célula basado en biomoléculas, membranas y organelos, su reproducción, mantención y recambio, en procesos de metabolismo, motilidad y comunicación, como fundamento de la continuidad y evolución del fenómeno de la vida.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Analizar críticamente el significado biológico del dogma central de la biología molecular en relación al flujo de la información genética en células desde el ADN al ARN y a las proteínas.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Describir, sobre la base de evidencia, los mecanismos de regulación génica y explicar su relación con los procesos de diferenciación y proliferación celular en respuesta a estímulos ambientales, el envejecimiento y las enfermedades como el cáncer.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Explicar las relaciones entre estructuras y funciones de proteínas en procesos como la actividad enzimática, flujo de iones a través de membranas y cambios conformacionales en procesos de motilidad celular y contracción muscular.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el desarrollo del conocimiento de biología celular y molecular en Chile y el mundo, considerando diversas líneas de investigación y la relación entre ciencia, tecnología y sociedad.' },
          { codigo: 'OA7', eje: 'Conocimiento y comprensión', descripcion: 'Analizar aplicaciones biotecnológicas en diversas áreas como tratamientos para el cáncer, preservación y uso de células madre, y producción de organismos transgénicos, entre otros, y evaluar sus implicancias éticas, sociales y legales.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Investigar el desarrollo del conocimiento de biología celular y molecular a lo largo de la historia y su relación con diversas disciplinas como la química, la física y la matemática, entre otros.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Explicar la estructura y organización de la célula basado en biomoléculas, membranas y organelos, su reproducción, mantención y recambio, en procesos de metabolismo, motilidad y comunicación, como fundamento de la continuidad y evolución del fenómeno de la vida.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Analizar críticamente el significado biológico del dogma central de la biología molecular en relación al flujo de la información genética en células desde el ADN al ARN y a las proteínas.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Describir, sobre la base de evidencia, los mecanismos de regulación génica y explicar su relación con los procesos de diferenciación y proliferación celular en respuesta a estímulos ambientales, el envejecimiento y las enfermedades como el cáncer.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Explicar las relaciones entre estructuras y funciones de proteínas en procesos como la actividad enzimática, flujo de iones a través de membranas y cambios conformacionales en procesos de motilidad celular y contracción muscular.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el desarrollo del conocimiento de biología celular y molecular en Chile y el mundo, considerando diversas líneas de investigación y la relación entre ciencia, tecnología y sociedad.' },
          { codigo: 'OA7', eje: 'Conocimiento y comprensión', descripcion: 'Analizar aplicaciones biotecnológicas en diversas áreas como tratamientos para el cáncer, preservación y uso de células madre, y producción de organismos transgénicos, entre otros, y evaluar sus implicancias éticas, sociales y legales.' }
        ]
      },

      // OAH — Habilidades comunes a las asignaturas científicas (DS 193/2019)
      habilidades: [
        { codigo: 'OAa', eje: 'Planificar y conducir investigación',     descripcion: 'Formular preguntas y problemas sobre tópicos científicos de interés, a partir de la observación de fenómenos y/o la exploración de diversas fuentes.' },
        { codigo: 'OAb', eje: 'Planificar y conducir investigación',     descripcion: 'Planificar y desarrollar investigaciones que permitan recoger evidencias y contrastar hipótesis, con apoyo de herramientas tecnológicas y matemáticas.' },
        { codigo: 'OAc', eje: 'Analizar e interpretar datos',            descripcion: 'Describir patrones, tendencias y relaciones entre datos, información y variables.' },
        { codigo: 'OAd', eje: 'Analizar e interpretar datos',            descripcion: 'Analizar las relaciones entre las partes de un sistema en fenómenos y problemas de interés, a partir de tablas, gráficos, diagramas y modelos.' },
        { codigo: 'OAe', eje: 'Construir explicaciones y soluciones',    descripcion: 'Construir, usar y comunicar argumentos científicos.' },
        { codigo: 'OAf', eje: 'Construir explicaciones y soluciones',    descripcion: 'Desarrollar y usar modelos basados en evidencia, para predecir y explicar mecanismos y fenómenos naturales.' },
        { codigo: 'OAg', eje: 'Construir explicaciones y soluciones',    descripcion: 'Diseñar proyectos para encontrar soluciones a problemas, usando la imaginación y la creatividad.' },
        { codigo: 'OAh', eje: 'Evaluar',                                 descripcion: 'Evaluar la validez de información proveniente de diversas fuentes, distinguiendo entre evidencia científica e interpretación, y analizar sus alcances y limitaciones.' },
        { codigo: 'OAi', eje: 'Evaluar',                                 descripcion: 'Analizar críticamente implicancias sociales, económicas, éticas y ambientales de problemas relacionados con controversias públicas que involucran ciencia y tecnología.' }
      ],

      actitudes: [
        'Pensar con perseverancia y proactividad para encontrar soluciones innovadoras a los problemas.',
        'Trabajar con autonomía y proactividad en trabajos colaborativos e individuales para llevar a cabo eficazmente proyectos de diversa índole.',
        'Trabajar con responsabilidad y liderazgo en la realización de las tareas colaborativas y en función del bienestar común.',
        'Interesarse por las posibilidades que ofrece la tecnología para el desarrollo intelectual, personal y social del individuo.',
        'Trabajar con empatía y respeto en el contexto de la diversidad, eliminando toda expresión de prejuicio y discriminación.',
        'Pensar con autorreflexión y autonomía para gestionar el propio aprendizaje, identificando capacidades, fortalezas y aspectos por mejorar.',
        'Trabajar colaborativamente en la generación, desarrollo y gestión de proyectos y la resolución de problemas, integrando las diferentes ideas y puntos de vista.'
      ]
    }
  }
};

