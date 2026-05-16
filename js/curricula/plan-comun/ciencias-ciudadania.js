// =============================================================================
//  PLAN COMÚN — Ciencias para la Ciudadanía (3°M y 4°M)
//  Archivo: js/curricula/plan-comun/ciencias-ciudadania.js
//
//  Fuente: Decreto Supremo N°193/2019 — Bases Curriculares 3°-4° Medio FG.
//          Programa de Estudio Ciencias para la Ciudadanía, Mineduc febrero 2021.
//
//  Estructura:
//   Asignatura del Plan Común FG, organizada en 4 MÓDULOS interdependientes.
//   Cada módulo tiene 2 unidades. Los liceos eligen qué módulos abordar y en
//   qué nivel (3°M o 4°M).
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['ciencias-ciudadania'] = {
  nombre:  'Ciencias para la Ciudadanía',
  sigla:   'CCI',
  niveles: ['3M', '4M'],
  decreto: 'DS 193/2019 — Programa de Estudio Mineduc, febrero 2021',
  tipo:    'asignatura-modular',  // organizada en módulos, no en unidades secuenciales

  // ─── Vista por unidades (alias de los módulos, para compatibilidad con UI) ───
  unidades: {
    '3M': [
      'Bienestar y salud — Salud humana y medicina',
      'Bienestar y salud — Prevención de infecciones',
      'Seguridad, Prevención y Autocuidado — Riesgos socionaturales',
      'Seguridad, Prevención y Autocuidado — Amenazas y riesgos cercanos',
      'Ambiente y Sostenibilidad — Cambio climático',
      'Ambiente y Sostenibilidad — Consumo sostenible',
      'Tecnología y Sociedad — Innovación tecnológica',
      'Tecnología y Sociedad — Proyectos tecnológicos'
    ],
    '4M': [
      'Bienestar y salud — Salud humana y medicina',
      'Bienestar y salud — Prevención de infecciones',
      'Seguridad, Prevención y Autocuidado — Riesgos socionaturales',
      'Seguridad, Prevención y Autocuidado — Amenazas y riesgos cercanos',
      'Ambiente y Sostenibilidad — Cambio climático',
      'Ambiente y Sostenibilidad — Consumo sostenible',
      'Tecnología y Sociedad — Innovación tecnológica',
      'Tecnología y Sociedad — Proyectos tecnológicos'
    ]
  },

  // ─── OAs disciplinares (todos los módulos consolidados) ───
  // Numeración Mineduc: OA1-OA3 dentro de cada módulo. Aquí se prefijan con
  // la clave del módulo para evitar colisiones.
  oas: {
    '3M': [
      // ── BIENESTAR Y SALUD ──
      { codigo: 'BS-OA1', eje: 'Bienestar y Salud', descripcion: 'Analizar, sobre la base de la investigación, factores biológicos, ambientales y sociales que influyen en la salud humana (como la nutrición, el consumo de alimentos transgénicos, la actividad física, el estrés, el consumo de alcohol y drogas, y la exposición a rayos UV, plaguicidas, patógenos y elementos contaminantes, entre otros).' },
      { codigo: 'BS-OA2', eje: 'Bienestar y Salud', descripcion: 'Investigar y comparar diversas medicinas (incluyendo la convencional, la tradicional de nuestros pueblos originarios y la complementaria alternativa), considerando su origen, conocimientos y prácticas para la resolución de problemas de salud cotidianos.' },
      { codigo: 'BS-OA3', eje: 'Bienestar y Salud', descripcion: 'Analizar, a partir de evidencias, situaciones de transmisión de agentes infecciosos a nivel nacional y mundial (como virus de influenza, VIH-SIDA, hanta, hepatitis B, sarampión, entre otros), y evaluar críticamente posibles medidas de prevención como el uso de vacunas.' },
      // ── SEGURIDAD, PREVENCIÓN Y AUTOCUIDADO ──
      { codigo: 'SPA-OA1', eje: 'Seguridad, Prevención y Autocuidado', descripcion: 'Investigar sustancias químicas de uso cotidiano en el hogar y el trabajo (medicamentos, detergentes y plaguicidas, entre otros), analizando su composición, reactividad, riesgos potenciales y medidas de seguridad asociadas (manipulación, almacenaje y eliminación).' },
      { codigo: 'SPA-OA2', eje: 'Seguridad, Prevención y Autocuidado', descripcion: 'Diseñar, evaluar y mejorar soluciones que permitan reducir las amenazas existentes en el hogar y en el mundo del trabajo (en sistemas eléctricos y de calefacción, y exposición a radiaciones, entre otros) para disminuir posibles riesgos en el bienestar de las personas y el cuidado del ambiente.' },
      { codigo: 'SPA-OA3', eje: 'Seguridad, Prevención y Autocuidado', descripcion: 'Analizar, a partir de modelos, riesgos de origen natural o provocados por la acción humana en su contexto local (como aludes, incendios, sismos de alta magnitud, erupciones volcánicas, tsunamis e inundaciones, entre otros) y evaluar las capacidades existentes en la escuela y la comunidad para la prevención, la mitigación y la adaptación frente a sus consecuencias.' },
      // ── AMBIENTE Y SOSTENIBILIDAD ──
      { codigo: 'AS-OA1', eje: 'Ambiente y Sostenibilidad', descripcion: 'Investigar el ciclo de vida de productos de uso cotidiano y proponer, basados en evidencia, estrategias de consumo sostenible para prevenir y mitigar impactos ambientales.' },
      { codigo: 'AS-OA2', eje: 'Ambiente y Sostenibilidad', descripcion: 'Diseñar proyectos locales, basados en evidencia científica, para la protección y utilización sostenible de recursos naturales de Chile, considerando eficiencia energética, reducción de emisiones, tratamiento de recursos hídricos, conservación de ecosistemas o gestión de residuos, entre otros.' },
      { codigo: 'AS-OA3', eje: 'Ambiente y Sostenibilidad', descripcion: 'Modelar los efectos del cambio climático en diversos ecosistemas y sus componentes biológicos, físicos y químicos, y evaluar posibles soluciones para su mitigación.' },
      // ── TECNOLOGÍA Y SOCIEDAD ──
      { codigo: 'TS-OA1', eje: 'Tecnología y Sociedad', descripcion: 'Diseñar proyectos tecnológicos que permitan resolver problemas personales y/o locales de diversos ámbitos de la vida (como vivienda y transporte, entre otros).' },
      { codigo: 'TS-OA2', eje: 'Tecnología y Sociedad', descripcion: 'Explicar, basados en investigaciones y modelos, cómo los avances tecnológicos (en robótica, telecomunicaciones, astronomía, física cuántica, entre otros) han permitido al ser humano ampliar sus capacidades sensoriales y su comprensión de fenómenos relacionados con la materia, los seres vivos y el entorno.' },
      { codigo: 'TS-OA3', eje: 'Tecnología y Sociedad', descripcion: 'Evaluar alcances y limitaciones de la tecnología y sus aplicaciones, argumentando riesgos y beneficios desde una perspectiva de salud, ética, social, económica y ambiental.' }
    ],
    '4M': [
      { codigo: 'BS-OA1', eje: 'Bienestar y Salud', descripcion: 'Analizar, sobre la base de la investigación, factores biológicos, ambientales y sociales que influyen en la salud humana (como la nutrición, el consumo de alimentos transgénicos, la actividad física, el estrés, el consumo de alcohol y drogas, y la exposición a rayos UV, plaguicidas, patógenos y elementos contaminantes, entre otros).' },
      { codigo: 'BS-OA2', eje: 'Bienestar y Salud', descripcion: 'Investigar y comparar diversas medicinas (incluyendo la convencional, la tradicional de nuestros pueblos originarios y la complementaria alternativa), considerando su origen, conocimientos y prácticas para la resolución de problemas de salud cotidianos.' },
      { codigo: 'BS-OA3', eje: 'Bienestar y Salud', descripcion: 'Analizar, a partir de evidencias, situaciones de transmisión de agentes infecciosos a nivel nacional y mundial (como virus de influenza, VIH-SIDA, hanta, hepatitis B, sarampión, entre otros), y evaluar críticamente posibles medidas de prevención como el uso de vacunas.' },
      { codigo: 'SPA-OA1', eje: 'Seguridad, Prevención y Autocuidado', descripcion: 'Investigar sustancias químicas de uso cotidiano en el hogar y el trabajo (medicamentos, detergentes y plaguicidas, entre otros), analizando su composición, reactividad, riesgos potenciales y medidas de seguridad asociadas (manipulación, almacenaje y eliminación).' },
      { codigo: 'SPA-OA2', eje: 'Seguridad, Prevención y Autocuidado', descripcion: 'Diseñar, evaluar y mejorar soluciones que permitan reducir las amenazas existentes en el hogar y en el mundo del trabajo (en sistemas eléctricos y de calefacción, y exposición a radiaciones, entre otros) para disminuir posibles riesgos en el bienestar de las personas y el cuidado del ambiente.' },
      { codigo: 'SPA-OA3', eje: 'Seguridad, Prevención y Autocuidado', descripcion: 'Analizar, a partir de modelos, riesgos de origen natural o provocados por la acción humana en su contexto local (como aludes, incendios, sismos de alta magnitud, erupciones volcánicas, tsunamis e inundaciones, entre otros) y evaluar las capacidades existentes en la escuela y la comunidad para la prevención, la mitigación y la adaptación frente a sus consecuencias.' },
      { codigo: 'AS-OA1', eje: 'Ambiente y Sostenibilidad', descripcion: 'Investigar el ciclo de vida de productos de uso cotidiano y proponer, basados en evidencia, estrategias de consumo sostenible para prevenir y mitigar impactos ambientales.' },
      { codigo: 'AS-OA2', eje: 'Ambiente y Sostenibilidad', descripcion: 'Diseñar proyectos locales, basados en evidencia científica, para la protección y utilización sostenible de recursos naturales de Chile, considerando eficiencia energética, reducción de emisiones, tratamiento de recursos hídricos, conservación de ecosistemas o gestión de residuos, entre otros.' },
      { codigo: 'AS-OA3', eje: 'Ambiente y Sostenibilidad', descripcion: 'Modelar los efectos del cambio climático en diversos ecosistemas y sus componentes biológicos, físicos y químicos, y evaluar posibles soluciones para su mitigación.' },
      { codigo: 'TS-OA1', eje: 'Tecnología y Sociedad', descripcion: 'Diseñar proyectos tecnológicos que permitan resolver problemas personales y/o locales de diversos ámbitos de la vida (como vivienda y transporte, entre otros).' },
      { codigo: 'TS-OA2', eje: 'Tecnología y Sociedad', descripcion: 'Explicar, basados en investigaciones y modelos, cómo los avances tecnológicos (en robótica, telecomunicaciones, astronomía, física cuántica, entre otros) han permitido al ser humano ampliar sus capacidades sensoriales y su comprensión de fenómenos relacionados con la materia, los seres vivos y el entorno.' },
      { codigo: 'TS-OA3', eje: 'Tecnología y Sociedad', descripcion: 'Evaluar alcances y limitaciones de la tecnología y sus aplicaciones, argumentando riesgos y beneficios desde una perspectiva de salud, ética, social, económica y ambiental.' }
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
    'Trabajar con responsabilidad y liderazgo en la realización de las tareas colaborativas y en función del bienestar común.',
    'Pensar con consciencia, reconociendo que los errores ofrecen oportunidades para el aprendizaje.',
    'Interesarse por las posibilidades que ofrece la tecnología para el desarrollo intelectual, personal y social del individuo.',
    'Trabajar con empatía y respeto en el contexto de la diversidad, eliminando toda expresión de prejuicio y discriminación.',
    'Pensar con autorreflexión y autonomía para gestionar el propio aprendizaje.',
    'Actuar de acuerdo con los principios de la ética en el uso de la información y de la tecnología.'
  ],

  // ─── Estructura de módulos para UI especializada ───
  modulos: {
    'bienestar-salud': {
      nombre: 'Bienestar y Salud',
      sigla:  'BS',
      unidades: [
        'Salud humana y medicina: ¿Cómo contribuir a nuestra salud y a la de los demás?',
        'Prevención de infecciones'
      ],
      oas: ['BS-OA1', 'BS-OA2', 'BS-OA3']
    },
    'seguridad-prevencion-autocuidado': {
      nombre: 'Seguridad, Prevención y Autocuidado',
      sigla:  'SPA',
      unidades: [
        'Riesgos socionaturales en nuestros territorios: ¿Preparados para actuar en situación de emergencia?',
        'Amenazas y riesgos cerca de nosotros: ¿estoy actuando responsablemente?'
      ],
      oas: ['SPA-OA1', 'SPA-OA2', 'SPA-OA3']
    },
    'ambiente-sostenibilidad': {
      nombre: 'Ambiente y Sostenibilidad',
      sigla:  'AS',
      unidades: [
        'Cambio climático como desafío urgente: ¿Qué espero para actuar?',
        'Consumo sostenible y protección ambiental: ¡Ya es hora de actuar!'
      ],
      oas: ['AS-OA1', 'AS-OA2', 'AS-OA3']
    },
    'tecnologia-sociedad': {
      nombre: 'Tecnología y Sociedad',
      sigla:  'TS',
      unidades: [
        'Innovación tecnológica: ¿Hasta dónde llegaremos?',
        'Proyectos tecnológicos: diseño, alcances e implicancias'
      ],
      oas: ['TS-OA1', 'TS-OA2', 'TS-OA3']
    }
  }
};
