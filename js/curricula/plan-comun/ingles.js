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
    '1B': ['In my classroom','My family and me','What is the weather like today?','Happy birthday!'],
    '2B': ['At the zoo','My house','My city','Food and celebrations'],
    '3B': ['My clothes','Animals and nature','My home','Food and celebrations'],
    '4B': ['How do you feel?','My city and transport','Sports and habits','Celebrations and climate'],
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
    '1B': [
      { codigo: 'OA1',  eje: 'Comprensión oral',    descripcion: 'Comprender textos leídos por un adulto o en formato audiovisual, muy breves y simples, con un patrón que se repite, como rimas y chants, cuentos y canciones.' },
      { codigo: 'OA2',  eje: 'Comprensión oral',    descripcion: 'Comprender textos orales relacionados con temas conocidos con funciones básicas: información personal, familia, clima y animales, juguetes y celebraciones (varía por unidad).' },
      { codigo: 'OA3',  eje: 'Comprensión oral',    descripcion: 'Demostrar comprensión de textos orales: identificando personajes, objetos y animales; siguiendo instrucciones simples; identificando palabras, expresiones de uso muy frecuente y vocabulario aprendido; identificando sonidos propios del inglés.' },
      { codigo: 'OA4',  eje: 'Comprensión oral',    descripcion: 'Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer conexiones con conocimientos previos; relacionar el texto con imágenes.' },
      { codigo: 'OA5',  eje: 'Comprensión oral',    descripcion: 'Reaccionar a lo escuchado, estableciendo relaciones con experiencias personales y/o expresando preferencias u opiniones por medio de palabras, dibujos, mímicas y acciones.' },
      { codigo: 'OA6',  eje: 'Comprensión lectora', descripcion: 'Seguir la lectura y comprender textos como cuentos, rimas, chants, listas, instrucciones, tarjetas de saludo y textos informativos, identificando personajes, palabras conocidas, vocabulario aprendido y expresiones de uso muy frecuente.' },
      { codigo: 'OA7',  eje: 'Comprensión lectora', descripcion: 'Seguir la lectura y demostrar comprensión de textos relacionados con temas conocidos, con funciones y vocabulario que varían por unidad.' },
      { codigo: 'OA8',  eje: 'Comprensión lectora', descripcion: 'Seguir la lectura y aplicar estrategias para apoyar la comprensión; por ejemplo: establecer relaciones con conocimientos previos; relacionar el texto con las imágenes; jugar a leer a otros y dibujar de acuerdo a lo leído.' },
      { codigo: 'OA9',  eje: 'Comprensión lectora', descripcion: 'Reaccionar a lo leído, estableciendo relaciones con experiencias personales y/o expresando preferencias y opiniones por medio de dibujos y palabras.' },
      { codigo: 'OA10', eje: 'Expresión oral',      descripcion: 'Reproducir chants, rimas y canciones muy breves y simples para familiarizarse con los sonidos propios del inglés.' },
      { codigo: 'OA11', eje: 'Expresión oral',      descripcion: 'Participar en interacciones de la clase y exposiciones muy breves y simples, acerca de temas conocidos o de otras asignaturas, usando apoyo del docente, objetos, gestos e imágenes; usando el vocabulario aprendido y expresiones de uso muy frecuente (Good morning; thank you; My name is...).' },
      { codigo: 'OA12', eje: 'Expresión oral',      descripcion: 'Expresarse oralmente con el apoyo del docente para saludar, presentarse, describir objetos y animales, expresar posesiones, gustos y cantidades, con funciones que varían por unidad.' },
      { codigo: 'OA13', eje: 'Expresión escrita',   descripcion: 'Experimentar con la escritura de palabras (trazar, copiar o completar) cuya ortografía tenga alta correspondencia con el español, acerca de temas conocidos o de otras asignaturas, de acuerdo a un modelo.' },
      { codigo: 'OA14', eje: 'Expresión escrita',   descripcion: 'Escribir, con apoyo de imágenes y tarjetas de palabras, sobre temas conocidos identificando y describiendo objetos, animales, personas y acciones, con funciones que varían por unidad.' }
    ],
    '2B': [
      { codigo: 'OA1',  eje: 'Comprensión oral',    descripcion: 'Comprender textos leídos por un adulto o en formato audiovisual, breves y simples, como rimas y chants, canciones, cuentos y diálogos.' },
      { codigo: 'OA2',  eje: 'Comprensión oral',    descripcion: 'Comprender textos orales relacionados con temas conocidos con funciones básicas, con variaciones por unidad (la escuela/animales, la casa, ocupaciones/ciudad, comida/celebraciones).' },
      { codigo: 'OA3',  eje: 'Comprensión oral',    descripcion: 'Demostrar comprensión de textos orales: identificando personajes, objetos y animales; siguiendo instrucciones simples; identificando palabras, expresiones de uso frecuente y vocabulario aprendido; identificando sonidos propios del inglés.' },
      { codigo: 'OA4',  eje: 'Comprensión oral',    descripcion: 'Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; hacer conexiones con conocimientos previos; relacionar el texto con imágenes; focalizar la atención en palabras clave.' },
      { codigo: 'OA5',  eje: 'Comprensión oral',    descripcion: 'Reaccionar a lo escuchado, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de dibujos, mímicas, dramatizaciones y palabras o frases escritas.' },
      { codigo: 'OA6',  eje: 'Comprensión lectora', descripcion: 'Leer y demostrar comprensión de textos como cuentos, rimas, chants, tarjetas de saludo, instrucciones y textos informativos, identificando ideas generales, personajes y acciones, vocabulario aprendido y expresiones de uso muy frecuente.' },
      { codigo: 'OA7',  eje: 'Comprensión lectora', descripcion: 'Leer y demostrar comprensión de textos relacionados con temas conocidos, con funciones y vocabulario que varían por unidad (la escuela/animales, la casa, ocupaciones/ciudad, comida/celebraciones).' },
      { codigo: 'OA8',  eje: 'Comprensión lectora', descripcion: 'Leer y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; establecer relaciones con conocimientos previos; relacionar el texto con las imágenes; releer o leer a otros en voz alta; dibujar o recontar con ayuda.' },
      { codigo: 'OA9',  eje: 'Comprensión lectora', descripcion: 'Reaccionar a lo leído, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones por medio de ilustraciones, dramatizaciones y palabras o frases escritas.' },
      { codigo: 'OA10', eje: 'Expresión oral',      descripcion: 'Reproducir chants, rimas y diálogos muy breves y simples para familiarizarse con los sonidos propios del inglés e identificar los sonidos /w/, /th/, /s/-/z/ en particular, con variaciones por unidad.' },
      { codigo: 'OA11', eje: 'Expresión oral',      descripcion: 'Participar en diálogos, interacciones de la clase y exposiciones muy breves y simples, acerca de temas conocidos o de otras asignaturas, usando apoyo del docente, objetos, gestos e imágenes; usando vocabulario aprendido y expresiones de uso muy frecuente (How do you say...? I am...).' },
      { codigo: 'OA12', eje: 'Expresión oral',      descripcion: 'Expresarse oralmente con el apoyo del docente para compartir información personal, expresar habilidad, sentimientos y posesión, identificar y describir animales y objetos, describir acciones que ocurren al momento de hablar, con variaciones por unidad.' },
      { codigo: 'OA13', eje: 'Expresión escrita',   descripcion: 'Escribir (por ejemplo: copiar o completar) palabras y oraciones simples de acuerdo a un modelo, acerca de temas conocidos o de otras asignaturas.' },
      { codigo: 'OA14', eje: 'Expresión escrita',   descripcion: 'Escribir, sobre la base de imágenes, identificando animales, acciones, objetos y partes de la casa, ocupaciones, lugares, comida; expresando sentimientos y cantidades en números hasta el veinte; describiendo ubicación de objetos y acciones, con variaciones por unidad.' }
    ],
    '3B': [
      { codigo: 'OA1',  eje: 'Comprensión oral',    descripcion: 'Comprender textos leídos por un adulto o en formato audiovisual, como rimas y chants, canciones, cuentos, diálogos y textos informativos.' },
      { codigo: 'OA2',  eje: 'Comprensión oral',    descripcion: 'Comprender textos orales relacionados con temas conocidos con funciones que varían por unidad (ropa/información personal, animales/naturaleza, la casa, comida/celebraciones).' },
      { codigo: 'OA3',  eje: 'Comprensión oral',    descripcion: 'Demostrar comprensión de textos orales: identificando personajes, objetos y animales; siguiendo instrucciones; identificando palabras, expresiones de uso frecuente y vocabulario aprendido; identificando sonidos propios del inglés.' },
      { codigo: 'OA4',  eje: 'Comprensión oral',    descripcion: 'Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones sobre la base de conocimientos previos; relacionar texto con imágenes; focalizar atención en palabras clave; visualizar diferentes aspectos del texto; verificar predicciones.' },
      { codigo: 'OA5',  eje: 'Comprensión oral',    descripcion: 'Reaccionar a lo escuchado estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de ilustraciones, mímica, dramatizaciones y frases u oraciones escritas.' },
      { codigo: 'OA6',  eje: 'Comprensión lectora', descripcion: 'Leer y demostrar comprensión de textos como cuentos, rimas, chants, canciones, invitaciones, tarjetas de saludo, menús, instrucciones, diálogos y textos informativos, en formato digital o impreso, identificando ideas generales, información explícita y vocabulario aprendido.' },
      { codigo: 'OA7',  eje: 'Comprensión lectora', descripcion: 'Leer y demostrar comprensión de textos relacionados con temas conocidos, con funciones y vocabulario que varían por unidad (ropa, animales/naturaleza, la casa, comida/celebraciones).' },
      { codigo: 'OA8',  eje: 'Comprensión lectora', descripcion: 'Leer y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; establecer relaciones con conocimientos previos; visualizar diferentes aspectos del texto; releer, leer a otros en voz alta; recontar con ayuda; verificar predicciones.' },
      { codigo: 'OA9',  eje: 'Comprensión lectora', descripcion: 'Reaccionar a lo leído estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de ilustraciones, dramatizaciones y palabras y frases escritas.' },
      { codigo: 'OA10', eje: 'Expresión oral',      descripcion: 'Reproducir chants, canciones, rimas y diálogos muy breves y simples para familiarizarse con los sonidos propios del inglés e identificar los sonidos /s/, /z/, /sh/, /ch/ en particular, con variaciones por unidad.' },
      { codigo: 'OA11', eje: 'Expresión oral',      descripcion: 'Participar en diálogos, interacciones de la clase y exposiciones breves y simples, acerca de temas conocidos o de otras asignaturas, usando el apoyo de objetos, gestos e imágenes; usando vocabulario aprendido y expresiones de uso frecuente.' },
      { codigo: 'OA12', eje: 'Expresión oral',      descripcion: 'Expresarse oralmente (en diálogos o exposiciones preparadas) para describir ropa, animales, la casa, comida; expresar preferencias, posesiones y cantidades; describir acciones que ocurren al momento de hablar, con variaciones por unidad.' },
      { codigo: 'OA13', eje: 'Expresión escrita',   descripcion: 'Escribir (completar o responder preguntas), de acuerdo a un modelo y con apoyo de imágenes y vocabulario dado, textos tales como oraciones, listas y descripciones breves acerca de temas conocidos o de otras asignaturas.' },
      { codigo: 'OA14', eje: 'Expresión escrita',   descripcion: 'Escribir, sobre la base de imágenes y con funciones que varían por unidad, para identificar y describir ropa, animales y naturaleza, partes de la casa, comida; expresar sentimientos, posesiones y acciones en tiempo presente.' },
      { codigo: 'OA15', eje: 'Expresión escrita',   descripcion: 'Planificar, escribir, revisar y publicar textos muy breves y simples recurriendo a apoyo del docente, de imágenes, organizadores gráficos, modelos, diccionario de imágenes y herramientas como el procesador de textos.' }
    ],
    '4B': [
      { codigo: 'OA1',  eje: 'Comprensión oral',    descripcion: 'Comprender textos leídos por un adulto o en formato audiovisual, como poemas, chants y canciones, cuentos, diálogos y textos informativos.' },
      { codigo: 'OA2',  eje: 'Comprensión oral',    descripcion: 'Comprender textos orales relacionados con temas conocidos con funciones que varían por unidad (la clase/salud, la ciudad/transportes, deportes/hábitos, celebraciones/clima).' },
      { codigo: 'OA3',  eje: 'Comprensión oral',    descripcion: 'Demostrar comprensión de textos orales, identificando ideas generales e información explícita relacionada con personajes, objetos, lugares y fechas; palabras de vocabulario aprendido y expresiones de uso frecuente; sonidos del inglés como /h/, /j/, /sh/, /ch/ que varían por unidad.' },
      { codigo: 'OA4',  eje: 'Comprensión oral',    descripcion: 'Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones sobre la base de conocimientos previos; relacionar el texto con imágenes; focalizar la atención en palabras clave; visualizar diferentes aspectos del texto; verificar predicciones.' },
      { codigo: 'OA5',  eje: 'Comprensión oral',    descripcion: 'Reaccionar a lo escuchado, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones por medio de ilustraciones, acciones, dramatizaciones y frases u oraciones escritas.' },
      { codigo: 'OA6',  eje: 'Comprensión lectora', descripcion: 'Leer y demostrar comprensión de textos como cuentos, poemas, chants, canciones, invitaciones, menús, recetas, instrucciones, e-mails, diálogos y textos informativos, en formato digital o impreso, identificando ideas generales, información explícita y vocabulario aprendido.' },
      { codigo: 'OA7',  eje: 'Comprensión lectora', descripcion: 'Leer y demostrar comprensión de textos relacionados con temas conocidos con funciones que varían por unidad (la clase/salud, la ciudad/transportes, deportes/hábitos, celebraciones/clima).' },
      { codigo: 'OA8',  eje: 'Comprensión lectora', descripcion: 'Leer y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; establecer relaciones con conocimientos previos; visualizar diferentes aspectos del texto; releer, recontar con ayuda; verificar predicciones.' },
      { codigo: 'OA9',  eje: 'Comprensión lectora', descripcion: 'Reaccionar a lo leído, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de ilustraciones, dramatizaciones y palabras y frases escritas.' },
      { codigo: 'OA10', eje: 'Expresión oral',      descripcion: 'Reproducir chants, canciones, rimas, poemas y diálogos breves y simples para familiarizarse con los sonidos del inglés e identificar los sonidos /h/, /j/, /sh/, /ch/ en particular, con variaciones por unidad.' },
      { codigo: 'OA11', eje: 'Expresión oral',      descripcion: 'Participar en diálogos, interacciones de la clase y exposiciones breves y simples acerca de temas conocidos o de otras asignaturas, usando el apoyo de objetos, gestos e imágenes; usando vocabulario aprendido y expresiones de uso frecuente (You are welcome; When is your birthday?).' },
      { codigo: 'OA12', eje: 'Expresión oral',      descripcion: 'Expresarse oralmente (en diálogos o exposiciones preparadas) para dar consejos y sugerencias, indicar direcciones, hablar de rutinas y hábitos, expresar preferencias y posesiones; con funciones que varían por unidad.' },
      { codigo: 'OA13', eje: 'Expresión escrita',   descripcion: 'Escribir (completar o responder preguntas), de acuerdo a un modelo y con apoyo de imágenes y vocabulario dado, textos tales como oraciones, invitaciones y diálogos de tres o cuatro intercambios acerca de temas conocidos o de otras asignaturas.' },
      { codigo: 'OA14', eje: 'Expresión escrita',   descripcion: 'Escribir, sobre la base de imágenes y funciones que varían por unidad, para expresar información sobre la salud, la ciudad, deportes y hábitos, celebraciones y clima; usando el vocabulario y expresiones de uso frecuente aprendidos.' },
      { codigo: 'OA15', eje: 'Expresión escrita',   descripcion: 'Planificar, escribir, revisar y publicar textos muy breves y simples recurriendo a apoyo del docente, de imágenes, organizadores gráficos, modelos, diccionario de imágenes y herramientas como el procesador de textos, para demostrar conocimiento y uso del vocabulario y expresiones de uso frecuente aprendidos.' }
    ],
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
    ],
    '1M': [
      { codigo: 'OA1',  eje: 'Comunicación oral', descripcion: 'Demostrar comprensión de ideas generales e información explícita en textos orales adaptados y auténticos simples, literarios y no literarios, en diversos formatos audiovisuales.' },
      { codigo: 'OA2',  eje: 'Comunicación oral', descripcion: 'Identificar palabras, frases y expresiones clave, vocabulario temático, conectores y sonidos del idioma en textos orales y conversaciones de la clase.' },
      { codigo: 'OA3',  eje: 'Comunicación oral', descripcion: 'Identificar en los textos escuchados propósito, tema, ideas relevantes, información específica y relaciones de contraste y problema-solución.' },
      { codigo: 'OA4',  eje: 'Comunicación oral', descripcion: 'Seleccionar y usar estrategias para apoyar la comprensión de los textos escuchados (predicciones, inferencias, focalización, resumen).' },
      { codigo: 'OA5',  eje: 'Comunicación oral', descripcion: 'Presentar información en forma oral usando recursos multimodales que refuercen el mensaje en forma creativa acerca de temas variados.' },
      { codigo: 'OA6',  eje: 'Comunicación oral', descripcion: 'Participar en interacciones y exposiciones recurriendo a estrategias antes, durante y después de hablar para expresarse con claridad y fluidez.' },
      { codigo: 'OA7',  eje: 'Comunicación oral', descripcion: 'Reaccionar a textos leídos o escuchados mediante exposiciones orales, discusiones y conversaciones grupales haciendo conexiones, expresando opiniones y formulando hipótesis.' },
      { codigo: 'OA8',  eje: 'Comunicación oral', descripcion: 'Demostrar conocimiento y uso del lenguaje en conversaciones, discusiones y exposiciones por medio de diversas funciones comunicativas del nivel.' },
      { codigo: 'OA9',  eje: 'Lectura',           descripcion: 'Demostrar comprensión de ideas generales e información explícita en textos adaptados y auténticos simples, en formato impreso o digital, sobre temas variados.' },
      { codigo: 'OA10', eje: 'Lectura',           descripcion: 'Demostrar comprensión de textos no literarios identificando propósito, idea principal, información específica, relaciones entre ideas, palabras clave y conectores.' },
      { codigo: 'OA11', eje: 'Lectura',           descripcion: 'Demostrar comprensión de textos literarios identificando tema, personajes, caracterización, entorno, trama, problema-solución y vocabulario temático.' },
      { codigo: 'OA12', eje: 'Lectura',           descripcion: 'Seleccionar y usar estrategias de prelectura, lectura y poslectura para apoyar la comprensión de los textos leídos.' },
      { codigo: 'OA13', eje: 'Escritura',         descripcion: 'Escribir historias e información relevante usando diversos recursos multimodales en forma atractiva y novedosa para reforzar el mensaje en textos variados.' },
      { codigo: 'OA14', eje: 'Escritura',         descripcion: 'Escribir una variedad de textos (cuentos, correos, folletos, biografías, instrucciones, etc.) utilizando los pasos del proceso de escritura y herramientas digitales.' },
      { codigo: 'OA15', eje: 'Escritura',         descripcion: 'Escribir para explicar, expresar opiniones y narrar usando variedad de palabras, conectores, ortografía correcta y puntuación apropiada.' },
      { codigo: 'OA16', eje: 'Escritura',         descripcion: 'Demostrar conocimiento y uso del lenguaje en sus textos escritos por medio de diversas funciones comunicativas del nivel.' }
    ],
    '2M': [
      { codigo: 'OA1',  eje: 'Comunicación oral', descripcion: 'Demostrar comprensión de ideas generales e información explícita en textos orales adaptados y auténticos simples, literarios y no literarios, en diversos formatos audiovisuales.' },
      { codigo: 'OA2',  eje: 'Comunicación oral', descripcion: 'Identificar palabras, frases y expresiones clave, vocabulario temático, conectores y sonidos del idioma en textos orales y conversaciones de la clase.' },
      { codigo: 'OA3',  eje: 'Comunicación oral', descripcion: 'Identificar en los textos escuchados propósito, tema, ideas relevantes, información específica y relaciones de importancia y problema-solución.' },
      { codigo: 'OA4',  eje: 'Comunicación oral', descripcion: 'Seleccionar y usar estrategias para apoyar la comprensión de los textos escuchados (predicciones, inferencias, toma de notas, resumen).' },
      { codigo: 'OA5',  eje: 'Comunicación oral', descripcion: 'Presentar información en forma oral usando recursos multimodales que refuercen el mensaje en forma creativa acerca de temas variados.' },
      { codigo: 'OA6',  eje: 'Comunicación oral', descripcion: 'Participar en interacciones y exposiciones recurriendo a estrategias antes, durante y después de hablar para expresarse con claridad y fluidez.' },
      { codigo: 'OA7',  eje: 'Comunicación oral', descripcion: 'Reaccionar a textos leídos o escuchados mediante exposiciones orales, discusiones y conversaciones grupales haciendo conexiones, evaluando ideas y formulando hipótesis.' },
      { codigo: 'OA8',  eje: 'Comunicación oral', descripcion: 'Demostrar conocimiento y uso del lenguaje en conversaciones, discusiones y exposiciones por medio de diversas funciones comunicativas del nivel.' },
      { codigo: 'OA9',  eje: 'Lectura',           descripcion: 'Demostrar comprensión de ideas generales e información explícita en textos adaptados y auténticos simples, en formato impreso o digital, sobre temas variados.' },
      { codigo: 'OA10', eje: 'Lectura',           descripcion: 'Demostrar comprensión de textos no literarios identificando propósito, idea principal, información específica, relaciones entre ideas, palabras clave y conectores.' },
      { codigo: 'OA11', eje: 'Lectura',           descripcion: 'Demostrar comprensión de textos literarios identificando tema, personajes, caracterización, entorno, trama, conflicto y vocabulario temático.' },
      { codigo: 'OA12', eje: 'Lectura',           descripcion: 'Seleccionar y usar estrategias de prelectura, lectura y postlectura para apoyar la comprensión de los textos leídos.' },
      { codigo: 'OA13', eje: 'Escritura',         descripcion: 'Escribir historias e información relevante usando diversos recursos multimodales en forma creativa y efectiva que refuercen el mensaje en textos variados.' },
      { codigo: 'OA14', eje: 'Escritura',         descripcion: 'Escribir una variedad de textos (cuentos, correos, artículos, biografías, poemas, etc.) utilizando los pasos del proceso de escritura y herramientas digitales.' },
      { codigo: 'OA15', eje: 'Escritura',         descripcion: 'Escribir para analizar, expresar opiniones y narrar usando variedad de palabras, conectores, ortografía correcta y puntuación apropiada.' },
      { codigo: 'OA16', eje: 'Escritura',         descripcion: 'Demostrar conocimiento y uso del lenguaje en sus textos escritos por medio de diversas funciones comunicativas del nivel.' }
    ],
    // 3°M y 4°M en Formación General prescriben sólo 4 OAs integrados (no separados por habilidad).
    '3M': [
      { codigo: 'OA1', eje: 'Comprensión',  descripcion: 'Comprender información central de textos orales y escritos en contextos relacionados con sus intereses e inquietudes, con el fin de conocer las maneras en que otras culturas abordan dichos contextos.' },
      { codigo: 'OA2', eje: 'Producción',   descripcion: 'Producir textos orales y escritos breves y claros en contextos relacionados con sus intereses e inquietudes, con el fin de expresar una postura personal crítica que respeta otras posturas.' },
      { codigo: 'OA3', eje: 'Uso del idioma', descripcion: 'Utilizar su conocimiento del inglés en la comprensión y producción de textos orales y escritos breves y claros, con el fin de construir una postura personal crítica en contextos relacionados con sus intereses e inquietudes.' },
      { codigo: 'OA4', eje: 'Interacción',  descripcion: 'Producir y comprender con fluidez textos orales y escritos breves y claros en situaciones comunicativas que involucren otras visiones de mundo y la propia, con el fin de interactuar y tomar conciencia de su propia identidad.' }
    ],
    '4M': [
      { codigo: 'OA1', eje: 'Comprensión',  descripcion: 'Comprender información relevante para un propósito específico en textos orales y escritos en contextos relacionados con sus intereses e inquietudes, con el fin de conocer las maneras en que otras culturas abordan dichos contextos.' },
      { codigo: 'OA2', eje: 'Producción',   descripcion: 'Producir textos orales y escritos claros en contextos relacionados con sus intereses e inquietudes, con el fin de expresar una postura personal crítica que respeta otras posturas.' },
      { codigo: 'OA3', eje: 'Uso del idioma', descripcion: 'Utilizar su conocimiento del inglés en la comprensión y producción de textos orales y escritos claros, con el fin de construir una postura personal crítica en contextos relacionados con sus intereses e inquietudes.' },
      { codigo: 'OA4', eje: 'Interacción',  descripcion: 'Producir y comprender con fluidez textos orales y escritos claros en situaciones comunicativas que involucren otras visiones de mundo y la propia, con el fin de interactuar y tomar conciencia de su propia identidad.' }
    ]
  }
};

