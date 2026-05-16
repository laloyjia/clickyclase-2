// =============================================================================
//  PLAN COMÚN — Física
//  Archivo: js/curricula/plan-comun/fisica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 369/2015 7°B–2°M, DS 193/2019 3°M–4°M).
//
//  Nota arquitectónica:
//   - 1°M-2°M: Física es uno de los ejes de Ciencias Naturales (ver ciencias.js).
//     Los OAs se duplican aquí para que el sistema pueda planificar Física por
//     separado cuando el liceo así lo organice.
//   - 3°M-4°M: En el plan común NO existe "Física" como asignatura propia.
//     Vive como ELECTIVO de Profundización Humanístico-Científica (DS 193/2019),
//     bajo `electivos['fisica-hc']`.
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['fisica'] = {
  nombre: 'Física',
  sigla:  'FIS',
  niveles: ['1M','2M'],   // 3M-4M solo via electivos HC
  unidades: {
    '1M': ['Sonido','Luz','Fuerza y movimiento','Tierra y universo'],
    '2M': ['Movimiento rectilíneo','Fuerza y movimiento (Leyes de Newton)','Energía mecánica y trabajo','Calor y temperatura']
  },
  oas: {
    '1M': [
      { codigo: 'OA9',  eje: 'Física', descripcion: 'Demostrar que comprende, por medio de la creación de modelos y experimentos, que las ondas transmiten energía y que se pueden reflejar, refractar y absorber, explicando y considerando: sus características (amplitud, frecuencia, longitud de onda y velocidad de propagación, entre otras); los criterios para clasificarlas (mecánicas, electromagnéticas, transversales, longitudinales, superficiales).' },
      { codigo: 'OA10', eje: 'Física', descripcion: 'Explicar fenómenos del sonido perceptibles por las personas, como el eco, la resonancia y el efecto Doppler, entre otros, utilizando el modelo ondulatorio y por medio de la experimentación, considerando sus: características y cualidades (intensidad, tono, timbre y rapidez); emisiones (en cuerdas vocales, en parlantes e instrumentos musicales); consecuencias (contaminación y medio de comunicación); aplicaciones tecnológicas (ecógrafo, sonar y estetoscopio, entretención, entre otras).' },
      { codigo: 'OA11', eje: 'Física', descripcion: 'Explicar fenómenos luminosos, como la reflexión, la refracción, la interferencia y el efecto Doppler, entre otros, por medio de la experimentación y el uso de modelos, considerando: los modelos corpuscular y ondulatorio de la luz; las características y la propagación de la luz (viaja en línea recta, formación de sombras y posee rapidez, entre otras); la formación de imágenes (espejos y lentes); la formación de colores (difracción, colores primarios y secundarios, filtros); sus aplicaciones tecnológicas (lentes, telescopio, prismáticos y focos, entre otros).' },
      { codigo: 'OA12', eje: 'Física', descripcion: 'Explorar y describir el funcionamiento del oído y del ojo humano, considerando: la recepción de ondas sonoras y luminosas; el espectro sonoro y de la luz visible; sus capacidades, limitaciones y consecuencias sociales; la tecnología correctiva (lentes y audífonos).' },
      { codigo: 'OA13', eje: 'Física', descripcion: 'Describir el origen y la propagación, por medio del modelo ondulatorio, de la energía liberada en un sismo, considerando: los parámetros que lo describen (epicentro, hipocentro, área de ruptura, magnitud e intensidad); los tipos de ondas sísmicas (primarias, secundarias y superficiales); su medición y registro (sismógrafo, escalas sísmicas); sus consecuencias directas e indirectas en la superficie de la Tierra (como tsunamis) y en la sociedad; su importancia en geología, por ejemplo, en el estudio de la estructura interna de la Tierra.' },
      { codigo: 'OA14', eje: 'Física', descripcion: 'Crear modelos que expliquen los fenómenos astronómicos del sistema solar relacionados con: los movimientos del sistema Tierra-Luna y los fenómenos de luz y sombra, como las fases lunares y los eclipses; los movimientos de la Tierra respecto del Sol y sus consecuencias, como las estaciones climáticas; la comparación de los distintos planetas con la Tierra en cuanto a su distancia al Sol, su tamaño, su período orbital, su atmósfera y otros.' },
      { codigo: 'OA15', eje: 'Física', descripcion: 'Describir y comparar diversas estructuras cósmicas, como meteoros, asteroides, cometas, satélites, planetas, estrellas, nebulosas, galaxias y cúmulo de galaxias, considerando: sus tamaños y formas; sus posiciones en el espacio; temperatura, masa, color y magnitud, entre otros.' },
      { codigo: 'OA16', eje: 'Física', descripcion: 'Investigar y explicar sobre la investigación astronómica en Chile y el resto del mundo, considerando aspectos como: el clima y las ventajas que ofrece nuestro país para la observación astronómica; la tecnología utilizada (telescopios, radiotelescopios y otros instrumentos astronómicos); la información que proporciona la luz y otras radiaciones emitidas por los astros; los aportes de científicas chilenas y científicos chilenos.' }
    ],
    '2M': [
      { codigo: 'OA9',  eje: 'Física', descripcion: 'Analizar, sobre la base de la experimentación, el movimiento rectilíneo uniforme y acelerado de un objeto respecto de un sistema de referencia espacio-temporal, considerando variables como la posición, la velocidad y la aceleración en situaciones cotidianas.' },
      { codigo: 'OA10', eje: 'Física', descripcion: 'Explicar, por medio de investigaciones experimentales, los efectos que tiene una fuerza neta sobre un objeto, utilizando las leyes de Newton y el diagrama de cuerpo libre.' },
      { codigo: 'OA11', eje: 'Física', descripcion: 'Describir el movimiento de un objeto, usando la ley de conservación de la energía mecánica y los conceptos de trabajo y potencia mecánica.' },
      { codigo: 'OA12', eje: 'Física', descripcion: 'Analizar e interpretar datos de investigaciones sobre colisiones entre objetos, considerando: la cantidad de movimiento de un cuerpo en función del impulso que adquiere; la ley de conservación de cantidad de movimiento (momento lineal o momentum).' },
      { codigo: 'OA13', eje: 'Física', descripcion: 'Demostrar que comprenden que el conocimiento del Universo cambia y aumenta a partir de nuevas evidencias, usando modelos como el geocéntrico y el heliocéntrico, y teorías como la del Big-Bang, entre otros.' },
      { codigo: 'OA14', eje: 'Física', descripcion: 'Explicar cualitativamente por medio de las leyes de Kepler y la de gravitación universal de Newton: el origen de las mareas; la formación y dinámica de estructuras cósmicas naturales, como el sistema solar y sus componentes, las estrellas y las galaxias; el movimiento de estructuras artificiales como sondas, satélites y naves espaciales.' }
    ]
  },
  actitudes:   [],
  habilidades: ['Observar y plantear preguntas', 'Planificar y conducir una investigación', 'Procesar, analizar e interpretar evidencia', 'Evaluar y comunicar'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVO DIFERENCIADO HC — FÍSICA (3°M y 4°M)
  //  Decreto Supremo N°193/2019 — Programa de Estudio Mineduc, febrero 2021
  // ────────────────────────────────────────────────────────────────────
  electivos: {
    'fisica-hc': {
      nombre:  'Física (Plan Diferenciado HC)',
      sigla:   'FIS-HC',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Programa de Estudio Mineduc, febrero 2021',

      unidades: {
        '3M': [
          'Cosmos: ¿en qué momento y lugar del universo nos encontramos?',
          'Fuerzas centrales: ¿de qué tratan y cómo se manifiestan en mi vida?',
          'Cambio climático: del saber a la acción sostenible',
          'Física moderna: ¿qué sabemos de lo más pequeño y lo más grande de la naturaleza?'
        ],
        '4M': [
          'Cosmos: ¿en qué momento y lugar del universo nos encontramos?',
          'Fuerzas centrales: ¿de qué tratan y cómo se manifiestan en mi vida?',
          'Cambio climático: del saber a la acción sostenible',
          'Física moderna: ¿qué sabemos de lo más pequeño y lo más grande de la naturaleza?'
        ]
      },

      // Visión global del Programa (OA por unidad)
      oasPorUnidad: {
        'Cosmos: ¿en qué momento y lugar del universo nos encontramos?':                    ['OA2'],
        'Fuerzas centrales: ¿de qué tratan y cómo se manifiestan en mi vida?':              ['OA3', 'OA6'],
        'Cambio climático: del saber a la acción sostenible':                               ['OA1', 'OA5', 'OA6'],
        'Física moderna: ¿qué sabemos de lo más pequeño y lo más grande de la naturaleza?': ['OA4', 'OA6']
      },

      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Analizar, con base en datos científicos actuales e históricos, el fenómeno del cambio climático global, considerando los patrones observados, sus causas probables, efectos actuales y posibles consecuencias futuras sobre la Tierra, los sistemas naturales y la sociedad.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Comprender, basándose en el estudio historiográfico, las explicaciones científicas sobre el origen y la evolución del universo.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el movimiento de cuerpos bajo la acción de una fuerza central en diversas situaciones cotidianas o fenómenos naturales, con base en conceptos y modelos de la mecánica clásica.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Evaluar la contribución de la física moderna y sus teorías estructuradoras (como relatividad y mecánica cuántica) al debate sobre la naturaleza de la realidad, así como su impacto sobre la sociedad, la tecnología y los sistemas naturales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Investigar y aplicar conocimientos de la física (como mecánica de fluidos, electromagnetismo y termodinámica) para la comprensión de fenómenos y procesos que ocurren en sistemas naturales, tales como los océanos, el interior de la Tierra, la atmósfera, las aguas dulces y los suelos.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la física con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales, considerando las implicancias éticas, sociales y ambientales.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Analizar, con base en datos científicos actuales e históricos, el fenómeno del cambio climático global, considerando los patrones observados, sus causas probables, efectos actuales y posibles consecuencias futuras sobre la Tierra, los sistemas naturales y la sociedad.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Comprender, basándose en el estudio historiográfico, las explicaciones científicas sobre el origen y la evolución del universo.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el movimiento de cuerpos bajo la acción de una fuerza central en diversas situaciones cotidianas o fenómenos naturales, con base en conceptos y modelos de la mecánica clásica.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Evaluar la contribución de la física moderna y sus teorías estructuradoras (como relatividad y mecánica cuántica) al debate sobre la naturaleza de la realidad, así como su impacto sobre la sociedad, la tecnología y los sistemas naturales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Investigar y aplicar conocimientos de la física (como mecánica de fluidos, electromagnetismo y termodinámica) para la comprensión de fenómenos y procesos que ocurren en sistemas naturales, tales como los océanos, el interior de la Tierra, la atmósfera, las aguas dulces y los suelos.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la física con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales, considerando las implicancias éticas, sociales y ambientales.' }
        ]
      },

      // OAH — Habilidades comunes a las asignaturas científicas (DS 193/2019)
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
        'Trabajar con autonomía y proactividad en trabajos colaborativos e individuales para llevar a cabo eficazmente proyectos de diversa índole.',
        'Trabajar con responsabilidad y liderazgo en la realización de las tareas colaborativas y en función del bienestar común.',
        'Interesarse por las posibilidades que ofrece la tecnología para el desarrollo intelectual, personal y social del individuo.',
        'Pensar con apertura hacia otros para valorar la comunicación como una forma de relacionarse con diversas personas y culturas.',
        'Trabajar con empatía y respeto en el contexto de la diversidad, eliminando toda expresión de prejuicio y discriminación.',
        'Pensar con autorreflexión y autonomía para gestionar el propio aprendizaje, identificando capacidades, fortalezas y aspectos por mejorar.'
      ]
    }
  }
};
