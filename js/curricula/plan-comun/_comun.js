// =============================================================================
//  PLAN COMÚN — Transversales (Actitudes + Habilidades + OAT)
//  Archivo: js/curricula/plan-comun/_comun.js
//
//  Fuente: Bases Curriculares Mineduc — DS 439/2012 (Básica),
//          DS 369/2015 (7°B–2°M) y DS 193/2019 (3°M–4°M FG).
//
//  Contenido:
//    • OAT (Objetivos de Aprendizaje Transversales) — aplican a TODA la
//      formación general, en todos los niveles y asignaturas.
//    • Actitudes por tramo — descriptores comunes a Básica y Media.
//    • Habilidades genéricas — descriptores base que cada asignatura
//      puede sobre-escribir o complementar.
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN._comun = {
//      oat: { basica: [...], media: [...] },
//      actitudes: { basica: [...], media: [...] },
//      habilidades: { basica: [...], media: [...] }
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN._comun = {

  // ───────────────────────────────────────────────────────────────
  //  OAT — Objetivos de Aprendizaje Transversales
  //  (Bases Curriculares 2012, actualización DS 369/2015)
  // ───────────────────────────────────────────────────────────────
  oat: {
    // Básica (1° a 6° básico) — Bases Curriculares 2012
    basica: [
      { dimension: 'Física',                   descripcion: 'Adquirir un estilo de vida activo y saludable, respetando el propio cuerpo y el de los demás.' },
      { dimension: 'Afectiva',                 descripcion: 'Construir una imagen positiva de sí mismo, basada en el conocimiento, autoaceptación y confianza en sus capacidades.' },
      { dimension: 'Cognitiva-Intelectual',    descripcion: 'Desarrollar habilidades de investigación, pensamiento crítico y creativo, y capacidad de aprender de forma autónoma.' },
      { dimension: 'Moral',                    descripcion: 'Valorar la dignidad de las personas, la libertad, la honestidad, la justicia y la solidaridad.' },
      { dimension: 'Espiritual',               descripcion: 'Reconocer y respetar las creencias y preguntas trascendentales, buscando sentido a la propia vida.' },
      { dimension: 'Socio-cultural y ciudadana', descripcion: 'Reconocer y valorar la diversidad cultural, étnica, lingüística y socioeconómica de la sociedad, y participar en la vida democrática.' },
      { dimension: 'Proactividad y trabajo',   descripcion: 'Demostrar iniciativa, responsabilidad, esfuerzo, perseverancia y rigor en el trabajo escolar y cotidiano.' },
      { dimension: 'Tecnologías de Información', descripcion: 'Hacer un uso responsable, seguro, ético y creativo de las tecnologías de información y comunicación.' }
    ],

    // Media (7°B a 4°M) — Bases Curriculares DS 369/2015 y DS 193/2019
    media: [
      { dimension: 'Física',                   descripcion: 'Valorar la vida y el cuerpo humano como un bien, promoviendo el autocuidado y la vida saludable.' },
      { dimension: 'Afectiva',                 descripcion: 'Construir una identidad personal y social positiva, basada en la autoaceptación, el respeto y la confianza en sí mismo y en los demás.' },
      { dimension: 'Cognitiva-Intelectual',    descripcion: 'Desarrollar el pensamiento crítico y reflexivo, el razonamiento lógico, la creatividad y la capacidad de resolver problemas.' },
      { dimension: 'Moral',                    descripcion: 'Fundamentar decisiones y acciones en principios éticos, valorando la justicia, la honestidad, la libertad y la responsabilidad.' },
      { dimension: 'Espiritual',               descripcion: 'Reflexionar sobre el sentido de la propia existencia, los fines últimos y los valores que orientan la vida.' },
      { dimension: 'Socio-cultural y ciudadana', descripcion: 'Participar responsable y críticamente en la vida democrática, respetando la diversidad y los derechos humanos.' },
      { dimension: 'Proactividad y trabajo',   descripcion: 'Asumir con responsabilidad el propio proyecto de vida, mostrando perseverancia, rigor y compromiso con el trabajo bien hecho.' },
      { dimension: 'Tecnologías de Información', descripcion: 'Usar con responsabilidad las TIC para el aprendizaje, la comunicación y la participación ciudadana, reconociendo sus implicancias éticas y sociales.' }
    ]
  },

  // ───────────────────────────────────────────────────────────────
  //  Actitudes transversales — comunes a todas las asignaturas
  //  Cada asignatura puede sobre-escribir este listado.
  // ───────────────────────────────────────────────────────────────
  actitudes: {
    basica: [
      'Demostrar curiosidad e interés por conocer distintos aspectos de la realidad.',
      'Manifestar una actitud positiva frente a sí mismo y a sus capacidades.',
      'Demostrar una actitud de esfuerzo y perseverancia frente a los desafíos del aprendizaje.',
      'Trabajar en equipo de manera responsable, respetando las opiniones y aportes de los demás.',
      'Demostrar respeto por las diferencias personales, étnicas, culturales y socioeconómicas.',
      'Manifestar una actitud de cuidado y respeto por el entorno natural y el patrimonio cultural.',
      'Usar las TIC de forma responsable, ética y creativa.'
    ],
    media: [
      'Pensar de manera autónoma, crítica y reflexiva sobre diversos temas y problemas.',
      'Trabajar con perseverancia y rigor, demostrando compromiso con la calidad del trabajo.',
      'Participar responsablemente en la vida democrática, respetando los derechos y la dignidad de todas las personas.',
      'Valorar la diversidad cultural, étnica, religiosa, de género y socioeconómica como un elemento enriquecedor de la sociedad.',
      'Demostrar interés por el bienestar personal y colectivo, y comprometerse con el cuidado del medioambiente.',
      'Usar las TIC de forma ética, segura y creativa en los distintos ámbitos del aprendizaje y la vida social.',
      'Asumir con responsabilidad el propio proyecto de vida y las decisiones que lo sustentan.'
    ]
  },

  // ───────────────────────────────────────────────────────────────
  //  Habilidades genéricas — base común que cada asignatura
  //  complementa con sus habilidades específicas.
  // ───────────────────────────────────────────────────────────────
  habilidades: {
    basica: [
      'Comunicar — expresar ideas oralmente y por escrito en forma clara y coherente.',
      'Resolver problemas — aplicar estrategias para enfrentar situaciones nuevas.',
      'Pensar críticamente — analizar información, distinguir hechos de opiniones y fundamentar juicios.',
      'Trabajar colaborativamente — escuchar, dialogar y construir acuerdos en equipo.',
      'Buscar información — localizar, seleccionar y organizar información de diversas fuentes.',
      'Usar TIC — emplear herramientas digitales para aprender, crear y comunicar.'
    ],
    media: [
      'Investigar — formular preguntas, buscar y evaluar información, y comunicar hallazgos.',
      'Argumentar — sostener posiciones con evidencia y razones bien fundamentadas.',
      'Resolver problemas complejos — modelar situaciones, seleccionar estrategias y evaluar resultados.',
      'Pensar críticamente — analizar supuestos, contrastar evidencia y construir juicios fundamentados.',
      'Trabajar colaborativamente — liderar, dialogar, negociar y construir soluciones en equipo.',
      'Comunicar — expresar ideas complejas, con dominio del lenguaje y adaptación a la audiencia.',
      'Alfabetización digital avanzada — usar TIC para investigar, producir y colaborar de forma ética.'
    ]
  }
};
