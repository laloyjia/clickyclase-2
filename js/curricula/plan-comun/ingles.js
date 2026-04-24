// =============================================================================
//  PLAN COMÚN — Inglés
//  Archivo: js/curricula/plan-comun/ingles.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['ingles'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['ingles'] = {
  nombre: 'Inglés',
  sigla:  'ING',
  // Inglés como asignatura obligatoria es 5B-4M según DS 439/2012 + DS 369/2015.
  // Se conservan 1B-4B para planificación del Plan Salesiano que parte desde 1B.
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    '1B': ['Listening: greetings','Speaking: simple words','Vocabulary: family & colors'],
    '2B': ['Listening: classroom','Speaking: short phrases','Vocabulary: animals & numbers'],
    '3B': ['Listening: daily life','Speaking: simple Q&A','Vocabulary: food & school'],
    '4B': ['Listening: stories','Speaking: simple dialogues','Vocabulary: body & clothes'],
    '5B': ['Hello!: Greetings','My Family and Friends','My Daily Routine'],
    '6B': ['My World','Food and Health','Free Time Activities'],
    '7B': ['My Community','Travel and Adventure','Technology in my Life'],
    '8B': ['Changes in our World','Global Issues','Future Perspectives'],
    '1M': ['Identity and Belonging','Community and Society','Science and Innovation'],
    '2M': ['Arts and Expression','Environment and Sustainability','Work and Career'],
    '3M': ['Global Challenges','Culture and Diversity','Technology and Future'],
    '4M': ['Independent Reading','Academic Writing','Communication and Media']
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Comprensión auditiva','Comprensión lectora','Expresión oral','Expresión escrita'],
  oas: {
    '5B': [
      { codigo: 'OA1',  eje: 'Comprensión auditiva', descripcion: 'Escuchar y demostrar comprensión de información explícita de textos orales adaptados y auténticos simples, literarios y no literarios, tales como descripciones, diálogos y exposiciones, con una duración de al menos un minuto, al identificar propósito, personajes, información específica y vocabulario temático.' },
      { codigo: 'OA2',  eje: 'Comprensión auditiva', descripcion: 'Reproducir y producir textos orales breves (canciones, rimas, diálogos, trabalenguas) para pronunciar adecuadamente palabras y sonidos, familiarizarse con las formas de hablar en inglés y reforzar el aprendizaje de vocabulario y estructuras.' },
      { codigo: 'OA3',  eje: 'Comprensión lectora',  descripcion: 'Leer y demostrar comprensión de textos adaptados y auténticos simples no literarios (instrucciones, descripciones, diálogos breves) y literarios (rimas, canciones, cuentos, tiras cómicas), identificando propósito, ideas principales, información explícita y vocabulario temático.' },
      { codigo: 'OA4',  eje: 'Comprensión lectora',  descripcion: 'Leer y demostrar comprensión de textos no literarios que contengan palabras de uso frecuente, conectores básicos de adición, secuencia y causa, y las siguientes estructuras: presente simple, presente continuo, pasado simple de verbos regulares, there is/are, can para pedir y dar información.' },
      { codigo: 'OA5',  eje: 'Expresión oral',       descripcion: 'Reaccionar frente a textos escuchados, expresando preferencias y opiniones con vocabulario limitado sobre los temas tratados, de forma oral o por escrito.' },
      { codigo: 'OA6',  eje: 'Expresión oral',       descripcion: 'Participar en diálogos con pares y profesor, expresándose con apoyo visual o digital, sobre temas conocidos o de interés, usando recursos verbales y no verbales (gestos, contacto visual) para apoyar la comunicación.' },
      { codigo: 'OA7',  eje: 'Expresión oral',       descripcion: 'Reproducir canciones, rimas, poemas o chants, prestando atención a pronunciación, entonación y vocabulario.' },
      { codigo: 'OA8',  eje: 'Expresión escrita',    descripcion: 'Escribir para realizar las siguientes funciones: expresar información de uno mismo y de otros; describir objetos, personas, lugares, actividades cotidianas; narrar hechos del pasado; expresar gustos, preferencias y opiniones.' },
      { codigo: 'OA9',  eje: 'Expresión escrita',    descripcion: 'Escribir una variedad de textos breves, como descripciones, cartas, correos electrónicos, instrucciones, historias y diálogos, utilizando los pasos del proceso de escritura (organizar ideas, redactar borrador, corregir, editar).' },
      { codigo: 'OA10', eje: 'Expresión escrita',    descripcion: 'Escribir para expresar información, usando un repertorio de vocabulario (al menos 200 palabras de uso frecuente) y las estructuras de nivel: presente simple y continuo, pasado simple de verbos regulares, can, there is/are, verbo to be.' }
    ],
    '6B': [
      { codigo: 'OA1',  eje: 'Comprensión auditiva', descripcion: 'Escuchar y demostrar comprensión de textos orales adaptados y auténticos simples, literarios y no literarios, con duración de hasta dos minutos, identificando propósito, ideas principales, información explícita, vocabulario temático y de uso frecuente, palabras clave, expresiones idiomáticas básicas y pronunciación.' },
      { codigo: 'OA2',  eje: 'Comprensión auditiva', descripcion: 'Identificar palabras y frases clave, expresiones de uso frecuente y vocabulario temático en los textos escuchados, apoyándose en el contexto visual y en las claves lingüísticas.' },
      { codigo: 'OA3',  eje: 'Comprensión lectora',  descripcion: 'Leer y demostrar comprensión de textos adaptados y auténticos simples no literarios (artículos, biografías, correos, descripciones, instrucciones, diálogos) y literarios (cuentos, fábulas, poemas, tiras cómicas), identificando propósito, ideas principales, información explícita, personajes y secuencia de eventos.' },
      { codigo: 'OA4',  eje: 'Comprensión lectora',  descripcion: 'Leer comprensivamente textos que contengan vocabulario de uso frecuente y las siguientes estructuras: presente simple y continuo, pasado simple de verbos regulares e irregulares, futuro con going to, can/must, there was/were, adjetivos comparativos y superlativos.' },
      { codigo: 'OA5',  eje: 'Expresión oral',       descripcion: 'Participar en intercambios orales sobre temas conocidos, como descripciones personales, rutinas, gustos, preferencias, de forma dialogada, en parejas o grupos.' },
      { codigo: 'OA6',  eje: 'Expresión oral',       descripcion: 'Presentar información en forma oral, con apoyo de recursos visuales o digitales, sobre temas conocidos o investigados (deportes, lugares turísticos, celebridades, países), con pronunciación y entonación adecuadas.' },
      { codigo: 'OA7',  eje: 'Expresión oral',       descripcion: 'Reproducir y producir textos orales breves (diálogos, canciones, rimas, poemas), demostrando conocimiento de las formas de hablar en inglés (saludos, despedidas, agradecimientos, disculpas, peticiones).' },
      { codigo: 'OA8',  eje: 'Expresión escrita',    descripcion: 'Escribir para llevar a cabo las siguientes funciones: expresar información sobre uno mismo y otros; describir objetos, personas, lugares, acciones y eventos; narrar hechos del pasado; expresar gustos, preferencias, opiniones, planes e ideas.' },
      { codigo: 'OA9',  eje: 'Expresión escrita',    descripcion: 'Escribir una variedad de textos breves (descripciones, cartas, correos, instrucciones, historias, diálogos, biografías breves) aplicando los pasos del proceso de escritura (planificar, redactar, revisar, editar) y usando vocabulario y estructuras del nivel.' },
      { codigo: 'OA10', eje: 'Expresión escrita',    descripcion: 'Escribir para expresar información, usando un repertorio de al menos 250 palabras de uso frecuente y las siguientes estructuras: presente simple y continuo, pasado simple, futuro con going to, imperativos, pronombres y adjetivos comparativos/superlativos.' }
    ],
    '7B': [
      { codigo: 'OA1',  eje: 'Comprensión auditiva', descripcion: 'Escuchar y demostrar comprensión de textos orales adaptados y auténticos simples, literarios y no literarios, de hasta tres minutos de duración, identificando propósito, actitudes e ideas principales, información específica, detalles relevantes, vocabulario temático y de uso frecuente.' },
      { codigo: 'OA2',  eje: 'Comprensión auditiva', descripcion: 'Identificar en textos orales vocabulario, expresiones idiomáticas, aspectos fonológicos (ritmo, acentuación, entonación) y elementos culturales (festividades, costumbres, personajes) propios de los países de habla inglesa.' },
      { codigo: 'OA3',  eje: 'Comprensión lectora',  descripcion: 'Leer y demostrar comprensión de textos adaptados y auténticos simples no literarios (noticias, artículos, biografías, correos, entrevistas, avisos) y literarios (cuentos, poemas, tiras cómicas) identificando propósito, ideas principales, información explícita, inferencias simples, opiniones del autor y conectores básicos.' },
      { codigo: 'OA4',  eje: 'Comprensión lectora',  descripcion: 'Leer comprensivamente textos que contengan vocabulario de uso frecuente y las siguientes estructuras: tiempos verbales (presente simple y continuo, pasado simple y continuo, futuro con will y going to, presente perfecto), modales (can, could, must, should), conectores de secuencia, adición, causa y contraste, voz pasiva con presente simple.' },
      { codigo: 'OA5',  eje: 'Expresión oral',       descripcion: 'Participar en intercambios orales en parejas y grupos sobre textos escuchados o leídos, expresando opiniones, preferencias, acuerdos y desacuerdos, reaccionando frente a los aportes de los demás y pidiendo o dando explicaciones.' },
      { codigo: 'OA6',  eje: 'Expresión oral',       descripcion: 'Presentar información en forma oral sobre temas conocidos o investigados, con recursos visuales o digitales de apoyo, con estructura organizada (introducción, desarrollo, cierre), pronunciación adecuada y vocabulario variado.' },
      { codigo: 'OA7',  eje: 'Expresión oral',       descripcion: 'Reproducir textos orales variados (noticias breves, diálogos, canciones, poemas), demostrando conocimiento de las formas de hablar en inglés y de los sonidos difíciles del idioma.' },
      { codigo: 'OA8',  eje: 'Expresión escrita',    descripcion: 'Escribir para llevar a cabo las siguientes funciones: narrar una historia o experiencia; describir personas, lugares, eventos; expresar planes, gustos, preferencias y opiniones fundamentadas; explicar información; expresar acuerdo y desacuerdo.' },
      { codigo: 'OA9',  eje: 'Expresión escrita',    descripcion: 'Escribir una variedad de textos breves (descripciones, artículos breves, correos, cartas, cuentos, biografías) aplicando los pasos del proceso de escritura (planificar, redactar, revisar, editar, publicar) y organizando ideas en párrafos con oración principal y apoyos.' },
      { codigo: 'OA10', eje: 'Expresión escrita',    descripcion: 'Demostrar conocimiento y uso del lenguaje en los textos producidos, mediante un repertorio de al menos 300 palabras de uso frecuente, estructuras de presente/pasado/futuro, conectores, modales y organización textual adecuada al género.' }
    ],
    '8B': [
      { codigo: 'OA1',  eje: 'Comprensión auditiva', descripcion: 'Escuchar y demostrar comprensión de textos orales adaptados y auténticos simples y semi-complejos, literarios y no literarios, de hasta cuatro minutos de duración, identificando propósito, actitudes e ideas principales, información específica y detalles relevantes, vocabulario temático y de uso frecuente, expresiones idiomáticas y elementos culturales.' },
      { codigo: 'OA2',  eje: 'Comprensión auditiva', descripcion: 'Identificar en los textos escuchados ideas principales, información específica, detalles relevantes, opiniones, actitudes del hablante, conectores de adición, secuencia, causa, contraste y consecuencia, y rasgos fonológicos característicos del inglés.' },
      { codigo: 'OA3',  eje: 'Comprensión lectora',  descripcion: 'Leer y demostrar comprensión de textos adaptados y auténticos simples y semi-complejos, literarios y no literarios (artículos de opinión, noticias, biografías, correos, entrevistas, reseñas, cuentos breves, poemas, tiras cómicas), identificando propósito, ideas principales, información explícita e implícita, inferencias, opiniones del autor, secuencias de eventos y argumentos.' },
      { codigo: 'OA4',  eje: 'Comprensión lectora',  descripcion: 'Leer comprensivamente textos que contengan vocabulario variado y las siguientes estructuras: tiempos verbales (presente, pasado, futuro, presente perfecto, pasado continuo), modales, condicionales de tipo I y II, voz pasiva, conectores de contraste, causa, consecuencia y propósito, discurso indirecto simple.' },
      { codigo: 'OA5',  eje: 'Expresión oral',       descripcion: 'Participar en intercambios orales en parejas y grupos, opinando, reaccionando y dialogando sobre textos, respetando turnos, contribuyendo con ideas y fundamentando con argumentos simples.' },
      { codigo: 'OA6',  eje: 'Expresión oral',       descripcion: 'Presentar información en forma oral sobre temas de interés o investigados, con estructura organizada, apoyo de recursos visuales o digitales, vocabulario variado, pronunciación y entonación adecuadas, adaptando el registro a la audiencia.' },
      { codigo: 'OA7',  eje: 'Expresión oral',       descripcion: 'Reproducir textos orales variados (noticias, entrevistas, diálogos, monólogos, canciones, poemas) demostrando conocimiento de las formas de hablar en inglés, sonidos y patrones de entonación.' },
      { codigo: 'OA8',  eje: 'Expresión escrita',    descripcion: 'Escribir para cumplir las siguientes funciones: narrar una historia real o imaginada; describir personas, lugares, sentimientos, objetos y eventos; expresar planes, opiniones, acuerdos y desacuerdos fundamentados; persuadir; informar; instruir.' },
      { codigo: 'OA9',  eje: 'Expresión escrita',    descripcion: 'Escribir una variedad de textos breves y semi-extensos (artículos breves, cartas, correos, cuentos, biografías, reseñas, entradas de blog, cartas de opinión) aplicando los pasos del proceso de escritura, con estructura textual adecuada al género y apoyada por conectores.' },
      { codigo: 'OA10', eje: 'Expresión escrita',    descripcion: 'Demostrar conocimiento del lenguaje escrito mediante un repertorio de al menos 350 palabras de uso frecuente, variedad de estructuras gramaticales del nivel (presente/pasado/futuro, perfectos, condicionales I y II, voz pasiva, modales), conectores y organización textual adecuada al tipo de texto.' }
    ]
  }
};

