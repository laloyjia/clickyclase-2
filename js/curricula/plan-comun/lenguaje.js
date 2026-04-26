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
    // 3°M FG (DS 193/2019) — Programa de Estudio Mineduc, febrero 2021
    '3M': ['Diálogo: literatura y efecto estético','Elaborar y comunicar interpretaciones literarias','Análisis crítico de géneros discursivos en comunidades digitales','Evaluar y producir géneros discursivos'],
    // 4°M FG (DS 193/2019) — Programa de Estudio Mineduc, febrero 2021
    '4M': ['Comparando lecturas literarias','Construyendo interpretaciones literarias colaborativas','Desafíos en el análisis crítico de los discursos','La escritura como forma de participación social']
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
      {codigo:'OA1', eje:'Lectura', descripcion:'Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con sus preferencias y propósitos.'},
      {codigo:'OA2', eje:'Lectura', descripcion:'Reflexionar sobre las diferentes dimensiones de la experiencia humana, propia y ajena, a partir de la lectura de obras literarias y otros textos que forman parte de nuestras herencias culturales, abordando los temas estipulados para el curso y las obras sugeridas para cada uno.'},
      {codigo:'OA3', eje:'Lectura', descripcion:'Analizar las narraciones leídas para enriquecer su comprensión, considerando, cuando sea pertinente: el o los conflictos de la historia; análisis de los personajes y sus motivaciones; la relación de un fragmento con el total; el efecto de la narración en 1ª o 3ª persona; personajes tipo, símbolos y tópicos literarios; creencias, prejuicios y estereotipos del relato a la luz de la visión de mundo de la época; el efecto del orden de los acontecimientos; y relaciones intertextuales con otras obras.'},
      {codigo:'OA4', eje:'Lectura', descripcion:'Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando sea pertinente: los símbolos; la actitud del hablante hacia el tema; el significado o efecto del lenguaje figurado; el efecto del uso de repeticiones (estructuras, sonidos, palabras o ideas); la relación entre aspectos formales y significado; y relaciones intertextuales con otras obras.'},
      {codigo:'OA5', eje:'Lectura', descripcion:'Analizar los textos dramáticos leídos o vistos, considerando: el conflicto y el problema humano que se expresa a través de él; análisis de los personajes principales (evolución, relaciones, dichos, acciones, motivaciones); personajes tipo, símbolos y tópicos literarios; creencias, prejuicios y estereotipos presentes en el relato; elementos que gatillan o anuncian futuros eventos en la tragedia; cómo los elementos de la puesta en escena (iluminación, sonido, vestuario, escenografía, actuación) aportan a la comprensión; y relaciones intertextuales con otras obras.'},
      {codigo:'OA6', eje:'Lectura', descripcion:'Comprender la visión de mundo que se expresa a través de las tragedias leídas, considerando sus características y el contexto en el que se enmarcan.'},
      {codigo:'OA7', eje:'Lectura', descripcion:'Comprender la relevancia de las obras del Romanticismo, considerando sus características y el contexto en el que se enmarcan.'},
      {codigo:'OA8', eje:'Lectura', descripcion:'Formular una interpretación de los textos literarios leídos o vistos, coherente con su análisis, considerando: una hipótesis sobre el sentido de la obra con punto de vista personal, histórico, social o universal; una crítica sustentada en citas o ejemplos; presencia o alusión a personajes, temas o símbolos de mitos, leyendas, cuentos folclóricos o textos sagrados; y la relación de la obra con la visión de mundo y el contexto histórico en el que se ambienta y/o fue creada.'},
      {codigo:'OA9', eje:'Lectura', descripcion:'Analizar y evaluar textos con finalidad argumentativa, como columnas de opinión, cartas, discursos y ensayos, considerando: la tesis (explícita o implícita) y los argumentos e información que la sostienen; la diferencia entre hecho y opinión; si la información es suficiente y pertinente; cómo el autor organiza el texto; la intención del uso de preguntas retóricas, oraciones desiderativas y dubitativas; y su postura personal frente a lo leído.'},
      {codigo:'OA10',eje:'Lectura', descripcion:'Analizar y evaluar textos de los medios de comunicación (noticias, reportajes, cartas al director, propaganda, crónicas), considerando: propósitos explícitos e implícitos; estrategias de persuasión (humor, estereotipos, apelación a sentimientos) y evaluación de las mismas; veracidad y consistencia de la información; efectos de recursos no lingüísticos (diseño, imágenes, audio); similitudes y diferencias entre fuentes sobre un mismo hecho; y los elementos que influyen en las propias opiniones y percepciones.'},
      {codigo:'OA11',eje:'Lectura', descripcion:'Leer y comprender textos no literarios para contextualizar y complementar las lecturas literarias realizadas en clases.'},
      {codigo:'OA12',eje:'Escritura', descripcion:'Aplicar flexible y creativamente las habilidades de escritura adquiridas como medio de expresión personal y al enfrentarse a nuevos géneros: investigando sus características antes de escribir; adecuando el texto a los propósitos y situación.'},
      {codigo:'OA13',eje:'Escritura', descripcion:'Escribir, con el propósito de explicar un tema, textos de diversos géneros (artículos, informes, reportajes, etc.) caracterizados por: presentación clara del tema; organización y redacción propias de la información; hechos, descripciones, ejemplos o explicaciones con reflexión personal; progresión temática con recursos anafóricos y conectores; imágenes u otros recursos gráficos pertinentes; cierre coherente; y uso de citas y referencias.'},
      {codigo:'OA14',eje:'Escritura', descripcion:'Escribir, con el propósito de persuadir, textos de diversos géneros —en particular ensayos sobre los temas o lecturas propuestos— caracterizados por: hipótesis o afirmación sobre temas contingentes o literarios; evidencias e información pertinente extraída de textos literarios y no literarios; mantención de la coherencia temática; conclusión coherente con los argumentos; y uso de citas y referencias.'},
      {codigo:'OA15',eje:'Escritura', descripcion:'Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto, destinatario y propósito: recopilando información antes de escribir; adecuando registro y estructura al género, contexto y destinatario; considerando al lector; asegurando coherencia y cohesión; usando conectores y vocabulario variado y preciso; corrigiendo usos inadecuados (pronombres, conjugaciones, concordancia); cuidando ortografía y presentación; y usando eficazmente el procesador de textos.'},
      {codigo:'OA16',eje:'Escritura', descripcion:'Usar consistentemente el estilo directo y el indirecto en textos escritos y orales: empleando adecuadamente los tiempos verbales en el estilo indirecto y reflexionando sobre el contraste formal y de significado entre ambos estilos, especialmente en textos académicos.'},
      {codigo:'OA17',eje:'Escritura', descripcion:'Usar en sus textos recursos de correferencia léxica compleja, empleando adecuadamente la metáfora y la metonimia para este fin.'},
      {codigo:'OA18',eje:'Escritura', descripcion:'Escribir correctamente para facilitar la comprensión al lector: aplicando todas las reglas de ortografía literal y acentual; verificando la escritura de palabras sin regla; y usando correctamente punto, coma, raya, dos puntos, paréntesis, puntos suspensivos y comillas.'},
      {codigo:'OA19',eje:'Comunicación oral', descripcion:'Comprender, comparar y evaluar textos orales y audiovisuales (exposiciones, discursos, documentales, noticias, reportajes), considerando: postura personal y argumentos; ordenación de la información según relevancia; contexto del texto; uso de estereotipos, clichés y generalizaciones; hechos y opiniones con valor argumentativo; distintos puntos de vista; contribución de imágenes y sonido al significado; y relaciones con los temas y obras estudiados durante el curso.'},
      {codigo:'OA20',eje:'Comunicación oral', descripcion:'Resumir un discurso argumentativo escuchado, explicando y evaluando los argumentos usados por el emisor.'},
      {codigo:'OA21',eje:'Comunicación oral', descripcion:'Dialogar constructivamente para debatir o explorar ideas: manteniendo el foco; demostrando comprensión; fundamentando la postura con información pertinente; distinguiendo afirmaciones con evidencia; formulando preguntas o comentarios que hagan avanzar la discusión; negociando acuerdos; reformulando comentarios; y considerando al interlocutor en la toma de turnos.'},
      {codigo:'OA22',eje:'Comunicación oral', descripcion:'Expresarse frente a una audiencia de manera clara y adecuada a la situación para comunicar temas de su interés: presentando información fidedigna con investigación previa; progresión temática clara; relacionando información nueva con la ya dicha; vocabulario de dominio del tema; conectores adecuados; y material visual pertinente.'},
      {codigo:'OA23',eje:'Comunicación oral', descripcion:'Analizar los posibles efectos de los elementos lingüísticos, paralingüísticos y no lingüísticos que usa un hablante en una situación determinada.'},
      {codigo:'OA24',eje:'Investigación', descripcion:'Realizar investigaciones sobre diversos temas para complementar sus lecturas o responder interrogantes relacionadas con el lenguaje y la literatura: delimitando el tema; descartando páginas poco útiles y refinando búsquedas; usando organizadores y estructura textual para encontrar información; evaluando suficiencia e información; evaluando validez y confiabilidad de fuentes; jerarquizando la información; registrando información bibliográfica; y elaborando un texto oral o escrito bien estructurado.'},
      {codigo:'OAA', eje:'Actitud', descripcion:'Manifestar disposición a formarse un pensamiento propio, reflexivo e informado, mediante una lectura crítica y el diálogo con otros.'},
      {codigo:'OAB', eje:'Actitud', descripcion:'Manifestar una disposición a reflexionar sobre sí mismo y sobre las cuestiones sociales y éticas que emanan de las lecturas.'},
      {codigo:'OAC', eje:'Actitud', descripcion:'Interesarse por comprender las experiencias e ideas de los demás, utilizando la lectura y el diálogo para el enriquecimiento personal y para la construcción de buenas relaciones con los demás.'},
      {codigo:'OAD', eje:'Actitud', descripcion:'Valorar la diversidad de perspectivas, creencias y culturas, presentes en su entorno y el mundo, como manifestación de la libertad, creatividad y dignidad humana.'},
      {codigo:'OAE', eje:'Actitud', descripcion:'Valorar las posibilidades que da el discurso hablado y escrito para participar de manera proactiva, informada y responsable en la vida de la sociedad democrática.'},
      {codigo:'OAF', eje:'Actitud', descripcion:'Valorar la evidencia y la búsqueda de conocimientos que apoyen sus aseveraciones.'},
      {codigo:'OAG', eje:'Actitud', descripcion:'Realizar tareas y trabajos de forma rigurosa y perseverante, entendiendo que los logros se obtienen solo después de un trabajo prolongado.'},
      {codigo:'OAH', eje:'Actitud', descripcion:'Trabajar colaborativamente, usando de manera responsable las tecnologías de la comunicación, dando crédito al trabajo de otros y respetando la propiedad y la privacidad de las personas.'}
    ],
    '2M': [
      {codigo:'OA1', eje:'Lectura', descripcion:'Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con sus preferencias y propósitos.'},
      {codigo:'OA2', eje:'Lectura', descripcion:'Reflexionar sobre las diferentes dimensiones de la experiencia humana, propia y ajena, a partir de la lectura de obras literarias y otros textos que forman parte de nuestras herencias culturales, abordando los temas estipulados para el curso y las obras sugeridas para cada uno.'},
      {codigo:'OA3', eje:'Lectura', descripcion:'Analizar las narraciones leídas para enriquecer su comprensión, considerando, cuando sea pertinente: el o los conflictos de la historia; análisis de los personajes (relaciones, acciones, motivaciones, convicciones, dilemas); la relación de un fragmento con el total; cómo influye la visión del narrador en el relato; personajes tipo, símbolos y tópicos literarios; creencias, prejuicios y estereotipos del relato a la luz de la época; el efecto de recursos como flashback, indicios, caja china e historia paralela; y relaciones intertextuales.'},
      {codigo:'OA4', eje:'Lectura', descripcion:'Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando sea pertinente: los símbolos y su relación con la totalidad del poema; la actitud del hablante; el significado o efecto del lenguaje figurado; el efecto de repeticiones (estructuras, sonidos, palabras o ideas); la relación entre fragmento y total; relaciones intertextuales; y las características del soneto.'},
      {codigo:'OA5', eje:'Lectura', descripcion:'Analizar los textos dramáticos leídos o vistos, considerando: el conflicto y el problema humano que se expresa; análisis de los personajes principales y sus motivaciones; personajes tipo, símbolos y tópicos literarios; creencias, prejuicios y estereotipos presentes en el relato; la atmósfera y cómo se construye a través de diálogos, monólogos, acciones y acotaciones; cómo la puesta en escena (iluminación, sonido, vestuario, escenografía, actuación) aporta a la comprensión; y relaciones intertextuales.'},
      {codigo:'OA6', eje:'Lectura', descripcion:'Comprender la relevancia de las obras del Siglo de Oro, considerando sus características y el contexto en el que se enmarcan.'},
      {codigo:'OA7', eje:'Lectura', descripcion:'Leer y comprender cuentos latinoamericanos modernos y contemporáneos, considerando sus características y el contexto en el que se enmarcan.'},
      {codigo:'OA8', eje:'Lectura', descripcion:'Formular una interpretación de los textos literarios leídos o vistos, coherente con su análisis, considerando: una hipótesis sobre el sentido de la obra con punto de vista personal, histórico, social o universal; una crítica sustentada en citas o ejemplos; los antecedentes culturales que influyen en la visión de la obra sobre temas como destino, muerte, trascendencia o guerra; y la relación de la obra con la visión de mundo y el contexto histórico en que se ambienta y/o fue creada.'},
      {codigo:'OA9', eje:'Lectura', descripcion:'Analizar y evaluar textos con finalidad argumentativa, como columnas de opinión, cartas al director, discursos y ensayos, considerando: la tesis (explícita o implícita) y los argumentos e información que la sostienen; los recursos emocionales usados para persuadir, evaluándolos; fallas evidentes en la argumentación (exageración, estereotipos, generalizaciones, descalificaciones); el efecto del uso de modalizadores en el grado de certeza; cómo el autor organiza el texto; la intención del uso de elementos léxicos valorativos y figuras retóricas; y la postura personal frente a lo leído, refutando o apoyando los argumentos.'},
      {codigo:'OA10',eje:'Lectura', descripcion:'Analizar y evaluar textos de los medios de comunicación (noticias, reportajes, cartas al director, propaganda, crónicas), considerando: propósitos explícitos e implícitos con justificación; estrategias de persuasión (humor, estereotipos, apelación a sentimientos) y evaluación; evidencias entregadas u omitidas; efectos de recursos no lingüísticos (diseño, imágenes, audio) y lingüísticos (imperativo, figuras literarias, expresiones populares, intertextualidad, modalizaciones); similitudes y diferencias entre fuentes sobre un mismo hecho; y elementos del texto que influyen en opiniones y percepciones.'},
      {codigo:'OA11',eje:'Lectura', descripcion:'Leer y comprender textos no literarios para contextualizar y complementar las lecturas literarias realizadas en clases.'},
      {codigo:'OA12',eje:'Escritura', descripcion:'Aplicar flexible y creativamente las habilidades de escritura adquiridas como medio de expresión personal y al enfrentarse a nuevos géneros: investigando sus características antes de escribir; adecuando el texto a propósitos y situación.'},
      {codigo:'OA13',eje:'Escritura', descripcion:'Escribir, con el propósito de explicar un tema, textos de diversos géneros (artículos, informes, reportajes, etc.) caracterizados por: presentación clara del tema; organización y redacción propias de la información; hechos, descripciones, ejemplos o explicaciones con reflexión personal; progresión temática con recursos anafóricos y conectores; uso de recursos variados (anécdotas, citas, síntesis, imágenes, infografías); cierre coherente; y citas y referencias según formato acordado.'},
      {codigo:'OA14',eje:'Escritura', descripcion:'Escribir, con el propósito de persuadir, textos de diversos géneros —en particular ensayos sobre los temas o lecturas propuestos— caracterizados por: hipótesis o afirmación sobre temas contingentes o literarios; evidencias e información pertinente extraída de textos literarios y no literarios; uso de contraargumentos cuando es pertinente; recursos variados (anécdotas, citas, síntesis, imágenes, infografías); coherencia temática; conclusión coherente; y uso de citas y referencias.'},
      {codigo:'OA15',eje:'Escritura', descripcion:'Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto, destinatario y propósito: recopilando información antes de escribir; adecuando registro, persona gramatical y estructura al género, contexto y destinatario; considerando al lector; asegurando coherencia y cohesión; organización oracional y textual; conectores; vocabulario variado y preciso; corrigiendo usos inadecuados (pronombres, conjugaciones, participios, conectores, preposiciones, concordancias); cuidando ortografía y presentación; y usando eficazmente el procesador de textos.'},
      {codigo:'OA16',eje:'Escritura', descripcion:'Usar consistentemente el estilo directo y el indirecto en textos escritos y orales: empleando adecuadamente los tiempos verbales en el estilo indirecto y reflexionando sobre el contraste formal y de significado entre ambos estilos, especialmente en textos del ámbito académico.'},
      {codigo:'OA17',eje:'Escritura', descripcion:'Emplear frases nominales complejas como recurso para compactar la información y establecer correferencia en textos con finalidad expositiva y argumentativa.'},
      {codigo:'OA18',eje:'Escritura', descripcion:'Escribir correctamente para facilitar la comprensión al lector: aplicando todas las reglas de ortografía literal y acentual; verificando la escritura de palabras sin regla; y usando correctamente punto, coma, raya, dos puntos, paréntesis, puntos suspensivos, comillas y punto y coma.'},
      {codigo:'OA19',eje:'Comunicación oral', descripcion:'Comprender, comparar y evaluar textos orales y audiovisuales (exposiciones, discursos, documentales, noticias, reportajes), considerando: postura personal y argumentos; ordenación de la información según relevancia; contexto del texto; uso de estereotipos, clichés y generalizaciones; argumentos y elementos de persuasión del hablante; distintos puntos de vista; contribución de imágenes y sonido al significado; y relaciones con temas y obras estudiados durante el curso.'},
      {codigo:'OA20',eje:'Comunicación oral', descripcion:'Evaluar el punto de vista de un emisor, su razonamiento y uso de recursos retóricos (vocabulario, organización de ideas, desarrollo y progresión de argumentos, etc.).'},
      {codigo:'OA21',eje:'Comunicación oral', descripcion:'Dialogar constructivamente para debatir o explorar ideas: manteniendo el foco; demostrando comprensión; fundamentando la postura; distinguiendo afirmaciones con evidencia; retomando lo dicho por otros mediante paráfrasis antes de contribuir o refutar; negociando acuerdos; reformulando comentarios; y considerando al interlocutor en la toma de turnos.'},
      {codigo:'OA22',eje:'Comunicación oral', descripcion:'Expresarse frente a una audiencia de manera clara y adecuada a la situación para comunicar temas de su interés: presentando información fidedigna con investigación previa; progresión temática clara; graduando la cantidad de información por parte; vocabulario de dominio del tema; conectores adecuados; y material visual que destaque lo más relevante y/o explique conceptos complejos.'},
      {codigo:'OA23',eje:'Comunicación oral', descripcion:'Analizar los posibles efectos de los elementos lingüísticos, paralingüísticos y no lingüísticos que usa un hablante en una situación determinada.'},
      {codigo:'OA24',eje:'Investigación', descripcion:'Realizar investigaciones sobre diversos temas para complementar sus lecturas o responder interrogantes relacionadas con el lenguaje y la literatura: delimitando el tema; seleccionando páginas y fuentes según profundidad y cobertura; usando organizadores y estructura textual; evaluando suficiencia e información; evaluando validez y confiabilidad de fuentes; jerarquizando la información; registrando información bibliográfica; y elaborando un texto oral o escrito bien estructurado.'},
      {codigo:'OAA', eje:'Actitud', descripcion:'Manifestar disposición a formarse un pensamiento propio, reflexivo e informado, mediante una lectura crítica y el diálogo con otros.'},
      {codigo:'OAB', eje:'Actitud', descripcion:'Manifestar una disposición a reflexionar sobre sí mismo y sobre las cuestiones sociales y éticas que emanan de las lecturas.'},
      {codigo:'OAC', eje:'Actitud', descripcion:'Interesarse por comprender las experiencias e ideas de los demás, utilizando la lectura y el diálogo para el enriquecimiento personal y para la construcción de buenas relaciones con los demás.'},
      {codigo:'OAD', eje:'Actitud', descripcion:'Valorar la diversidad de perspectivas, creencias y culturas, presentes en su entorno y el mundo, como manifestación de la libertad, creatividad y dignidad humana.'},
      {codigo:'OAE', eje:'Actitud', descripcion:'Valorar las posibilidades que da el discurso hablado y escrito para participar de manera proactiva, informada y responsable en la vida de la sociedad democrática.'},
      {codigo:'OAF', eje:'Actitud', descripcion:'Valorar la evidencia y la búsqueda de conocimientos que apoyen sus aseveraciones.'},
      {codigo:'OAG', eje:'Actitud', descripcion:'Realizar tareas y trabajos de forma rigurosa y perseverante, entendiendo que los logros se obtienen solo después de un trabajo prolongado.'},
      {codigo:'OAH', eje:'Actitud', descripcion:'Trabajar colaborativamente, usando de manera responsable las tecnologías de la comunicación, dando crédito al trabajo de otros y respetando la propiedad y la privacidad de las personas.'}
    ],
    // ── 3°M Formación General — Bases Curriculares DS 193/2019 ──────────────
    //    Programa de Estudio Mineduc, febrero 2021. 9 OAs en 3 dimensiones:
    //    Comprensión (1-5), Producción (6-8), Investigación (9).
    '3M': [
      { codigo: 'OA1', eje: 'Comprensión',   descripcion: 'Formular interpretaciones surgidas de sus análisis literarios, considerando: la contribución de los recursos literarios (narrador, personajes, tópicos literarios, características del lenguaje, figuras literarias, etc.) en la construcción del sentido de la obra; las relaciones intertextuales que se establecen con otras obras leídas y con otros referentes de la cultura y del arte.' },
      { codigo: 'OA2', eje: 'Comprensión',   descripcion: 'Reflexionar sobre el efecto estético de las obras leídas, evaluando: cómo la obra dialoga con las experiencias personales del lector y sus puntos de vista sobre diversas problemáticas del ser humano (afectos, dilemas éticos, conflictos, etc.); cómo los recursos y técnicas literarias de la obra inciden en el efecto estético producido.' },
      { codigo: 'OA3', eje: 'Comprensión',   descripcion: 'Analizar críticamente textos de diversos géneros discursivos no literarios orales, escritos y audiovisuales, considerando: la influencia de los contextos socioculturales de enunciador y audiencia; las características del género discursivo al que pertenece el texto; las relaciones establecidas entre las ideas para construir razonamientos; la selección y la veracidad de la información.' },
      { codigo: 'OA4', eje: 'Comprensión',   descripcion: 'Analizar críticamente los géneros discursivos surgidos en diversas comunidades digitales (post, tweet, fotografías y videos, comentarios en foros, memes, etc.), considerando: influencia del contexto sociocultural; intereses, motivaciones, características y temas compartidos por los participantes de la comunidad; posicionamiento de los enunciadores frente a los temas y el rol que asumen ante la audiencia; modos de razonamiento y calidad de la evidencia para sostener opiniones; problemas éticos asociados a la participación: difusión de información, formas de acoso, descalificación o discriminación, sus alcances y consecuencias.' },
      { codigo: 'OA5', eje: 'Comprensión',   descripcion: 'Evaluar los recursos lingüísticos y no lingüísticos (visuales, sonoros y gestuales) al comprender textos, considerando su incidencia en el posicionamiento frente al tema, en los roles y actitudes asumidos ante la audiencia, y la forma en que dichos recursos se combinan para construir el sentido del discurso.' },
      { codigo: 'OA6', eje: 'Producción',    descripcion: 'Producir textos (orales, escritos o audiovisuales) coherentes y cohesionados, para comunicar sus análisis e interpretaciones de textos, desarrollar posturas sobre temas, explorar creativamente con el lenguaje, entre otros propósitos: aplicando un proceso de escritura según sus propósitos, el género discursivo seleccionado, el tema y la audiencia; adecuando el texto a las convenciones del género y a las características de la audiencia (conocimientos, intereses, convenciones culturales).' },
      { codigo: 'OA7', eje: 'Producción',    descripcion: 'Usar los recursos lingüísticos y no lingüísticos (visuales, sonoros y gestuales) al producir textos, considerando su incidencia en el posicionamiento frente al tema, en los roles y actitudes asumidos ante la audiencia, y la forma en que dichos recursos se combinan para construir el sentido del discurso.' },
      { codigo: 'OA8', eje: 'Producción',    descripcion: 'Dialogar argumentativamente, evitando descalificaciones o prejuicios, para construir y ampliar ideas en torno a interpretaciones literarias y análisis crítico de textos: explicando sus criterios de análisis o interpretación, razonamientos y conclusiones; usando evidencia disponible para fundamentar posturas y reflexiones; evaluando el razonamiento de otros (sus premisas, relaciones entre ideas, elecciones de palabras y énfasis); incorporando las posiciones de sus pares para ampliarlas o refutarlas.' },
      { codigo: 'OA9', eje: 'Investigación', descripcion: 'Investigar sobre diversos temas para enriquecer sus lecturas y análisis, o para responder interrogantes propias de la asignatura: seleccionando fuentes e información según criterios de validez y confiabilidad; procesando la información mediante herramientas digitales o impresas; comunicando sus hallazgos por medio de géneros (escritos, orales o audiovisuales) del ámbito educativo; haciendo uso ético de la información investigada por medio de recursos de citación y referencia.' }
    ],
    // ── 4°M Formación General — Bases Curriculares DS 193/2019 ──────────────
    //    Programa de Estudio Mineduc, febrero 2021. 8 OAs en 3 dimensiones:
    //    Comprensión (1-4), Producción (5-7), Investigación (8).
    '4M': [
      { codigo: 'OA1', eje: 'Comprensión',   descripcion: 'Formular interpretaciones de obras que aborden un mismo tema o problema, comparando: la relación de cada obra con sus contextos de producción y de recepción (historia, valores, creencias, ideologías, etc.); el tratamiento del tema o problema y la perspectiva adoptada sobre estos; el efecto estético producido por los textos.' },
      { codigo: 'OA2', eje: 'Comprensión',   descripcion: 'Proponer distintas interpretaciones para una obra literaria, a partir de un criterio de análisis literario (por ejemplo: perspectiva de personajes, creencias, valores, contextos, etc.), fundamentándolas con evidencia del texto coherente con el criterio adoptado.' },
      { codigo: 'OA3', eje: 'Comprensión',   descripcion: 'Evaluar críticamente textos de diversos géneros no literarios (orales, escritos y audiovisuales), analizando cuando corresponda: intenciones explícitas e implícitas del texto; tratamiento de temas y veracidad de la información; presentación de ideologías, creencias y puntos de vista; posicionamiento del enunciador frente al tema y el rol que busca representar ante la audiencia.' },
      { codigo: 'OA4', eje: 'Comprensión',   descripcion: 'Evaluar los recursos lingüísticos y no lingüísticos (visuales, sonoros y gestuales) al comprender textos, considerando su incidencia en el posicionamiento frente al tema, en los roles y actitudes asumidos ante la audiencia, y la forma en que dichos recursos se combinan para construir el sentido del discurso.' },
      { codigo: 'OA5', eje: 'Producción',    descripcion: 'Producir textos (orales, escritos o audiovisuales) coherentes y cohesionados para comunicar sus análisis e interpretaciones de textos, desarrollar posturas sobre temas, explorar creativamente con el lenguaje, entre otros propósitos: aplicando un proceso de escritura según sus propósitos, el género discursivo seleccionado, el tema y la audiencia; adecuando el texto a las convenciones del género y a las características de la audiencia (conocimientos, intereses, convenciones culturales).' },
      { codigo: 'OA6', eje: 'Producción',    descripcion: 'Usar los recursos lingüísticos y no lingüísticos (visuales, sonoros y gestuales) al producir textos, considerando su incidencia en el posicionamiento frente al tema, en los roles y actitudes asumidos ante la audiencia, y la forma en que dichos recursos se combinan para construir el sentido del discurso.' },
      { codigo: 'OA7', eje: 'Producción',    descripcion: 'Dialogar argumentativamente, evitando descalificaciones o prejuicios, para construir y ampliar ideas en torno a interpretaciones literarias y análisis crítico de textos: explicando sus criterios de análisis o interpretación, razonamientos y conclusiones; usando evidencia disponible para fundamentar posturas y reflexiones; evaluando el razonamiento de otros (sus premisas, relaciones entre ideas, elecciones de palabras y énfasis); incorporando las posiciones de sus pares para ampliarlas o refutarlas.' },
      { codigo: 'OA8', eje: 'Investigación', descripcion: 'Investigar sobre diversos temas para enriquecer sus lecturas y análisis, o para responder interrogantes propios de la asignatura: seleccionando fuentes e información según criterios de validez y confiabilidad; procesando la información mediante herramientas digitales o impresas y géneros discursivos determinados; comunicando sus hallazgos por medio de géneros (escritos, orales o audiovisuales) del ámbito educativo; haciendo uso ético de la información investigada por medio de recursos de citación y referencia.' }
    ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Lectura', 'Escritura', 'Comunicación oral', 'Investigación'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVOS DIFERENCIADOS HC (3°M y 4°M)
  //  Cada electivo agrupa OAs y unidades. Se exponen como sub-asignaturas.
  //  Acceso: CURRICULA_PLAN_COMUN['lenguaje'].electivos['<key>']
  // ────────────────────────────────────────────────────────────────────
  electivos: {
    'lectura-y-escritura-especializadas': {
      nombre:  'Lectura y Escritura Especializadas',
      sigla:   'LEE',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Géneros académicos y especializados', 'Investigación y fuentes', 'Procesos colaborativos de escritura'],
        '4M': ['Producción de textos especializados', 'Citación y uso ético de la información', 'Comunidades de pares']
      },
      // Las Bases Curriculares prescriben los mismos OAs para 3°M y 4°M.
      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Escritura',     descripcion: 'Producir textos pertenecientes a diversos géneros discursivos académicos, en los cuales se gestione información recogida de distintas fuentes y se demuestre dominio especializado de un tema.' },
          { codigo: 'OA2', eje: 'Escritura',     descripcion: 'Participar de manera activa en procesos colaborativos de producción de textos especializados —como autor, lector, revisor— al interior de una comunidad de pares especialistas.' },
          { codigo: 'OA3', eje: 'Investigación', descripcion: 'Utilizar diversas estrategias para registrar y procesar información obtenida en soportes impresos o digitales, en coherencia con el tema, los propósitos comunicativos y las convenciones discursivas.' },
          { codigo: 'OA4', eje: 'Escritura',     descripcion: 'Utilizar diversas estrategias para construir y transformar el conocimiento por escrito, en coherencia con los temas, los propósitos comunicativos y las convenciones discursivas de los textos que producirán.' },
          { codigo: 'OA5', eje: 'Investigación', descripcion: 'Buscar, evaluar y seleccionar rigurosamente fuentes disponibles en soportes impresos y digitales, considerando la validez, veracidad y responsabilidad de su autoría.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Escritura',     descripcion: 'Producir textos pertenecientes a diversos géneros discursivos académicos, en los cuales se gestione información recogida de distintas fuentes y se demuestre dominio especializado de un tema.' },
          { codigo: 'OA2', eje: 'Escritura',     descripcion: 'Participar de manera activa en procesos colaborativos de producción de textos especializados —como autor, lector, revisor— al interior de una comunidad de pares especialistas.' },
          { codigo: 'OA3', eje: 'Investigación', descripcion: 'Utilizar diversas estrategias para registrar y procesar información obtenida en soportes impresos o digitales, en coherencia con el tema, los propósitos comunicativos y las convenciones discursivas.' },
          { codigo: 'OA4', eje: 'Escritura',     descripcion: 'Utilizar diversas estrategias para construir y transformar el conocimiento por escrito, en coherencia con los temas, los propósitos comunicativos y las convenciones discursivas de los textos que producirán.' },
          { codigo: 'OA5', eje: 'Investigación', descripcion: 'Buscar, evaluar y seleccionar rigurosamente fuentes disponibles en soportes impresos y digitales, considerando la validez, veracidad y responsabilidad de su autoría.' }
        ]
      }
    },

    'taller-de-literatura': {
      nombre:  'Taller de Literatura',
      sigla:   'TLIT',
      tramo:   'media',
      niveles: ['3M'],
      unidades: {
        '3M': ['Trayectorias de lectura', 'Producción literaria y creativa', 'Comunidad lectora']
      },
      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Producción',        descripcion: 'Producir diversos géneros escritos y audiovisuales para desarrollar y comunicar sus interpretaciones de las obras leídas.' },
          { codigo: 'OA2', eje: 'Producción',        descripcion: 'Producir textos pertenecientes a diversos géneros discursivos de la literatura que den cuenta de sus proyectos personales y creativos.' },
          { codigo: 'OA3', eje: 'Comunidad lectora', descripcion: 'Contribuir con sus comentarios, sugerencias, interpretaciones y críticas a los procesos de lectura colectiva y de escritura creativa de sus pares.' },
          { codigo: 'OA4', eje: 'Producción',        descripcion: 'Revisar y reescribir sus propias producciones (escritas, orales o audiovisuales) a la luz de los comentarios, críticas y sugerencias de sus pares, para enriquecer su producción creativa.' },
          { codigo: 'OA5', eje: 'Lectura',           descripcion: 'Construir trayectorias de lectura que surjan de sus propios intereses, gustos literarios e inquietudes, explicitando criterios de selección de obras y compartiéndolas con sus pares.' },
          { codigo: 'OA6', eje: 'Producción',        descripcion: 'Producir textos y otras producciones que den cuenta de sus reflexiones sobre sí mismos y sobre diversas temáticas del mundo, surgidas de las interpretaciones de las obras leídas y de sus trayectorias de lectura.' }
        ]
      }
    },

    'participacion-y-argumentacion-en-democracia': {
      nombre:  'Participación y Argumentación en Democracia',
      sigla:   'PAD',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Discusión argumentativa', 'Pensamiento crítico', 'Postura ciudadana'],
        '4M': ['Argumentación pública', 'Evaluación de evidencias', 'Construcción de propuestas']
      },
      // Las Bases Curriculares prescriben los mismos OAs para 3°M y 4°M.
      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Discusión argumentativa', descripcion: 'Construir colectivamente conclusiones, soluciones, preguntas, hipótesis o acuerdos que surjan de discusiones argumentadas y razonadas, en torno a temas controversiales de la vida y la sociedad actual.' },
          { codigo: 'OA2', eje: 'Discusión argumentativa', descripcion: 'Dialogar argumentativamente, privilegiando el componente racional de la argumentación, estableciendo relaciones lógicas y extrayendo conclusiones razonadas.' },
          { codigo: 'OA3', eje: 'Investigación',           descripcion: 'Evaluar diversas formas en que se legitima el conocimiento en los discursos, a partir del análisis crítico de sus modos de generación y su pertinencia al ámbito de participación y a la comunidad discursiva.' },
          { codigo: 'OA4', eje: 'Argumentación',           descripcion: 'Elaborar argumentos basándose en evidencias o información pública legitimada pertinentes al tema o problema analizado.' },
          { codigo: 'OA5', eje: 'Argumentación',           descripcion: 'Utilizar formas de argumentación y de legitimación del conocimiento, pertinentes al ámbito de participación, a la comunidad discursiva y a los propósitos de sus argumentaciones.' },
          { codigo: 'OA6', eje: 'Pensamiento crítico',     descripcion: 'Evaluar críticamente argumentaciones surgidas en distintos ámbitos de la sociedad, enfocándose en sus alcances, pertinencia, legitimidad de las evidencias y relaciones lógicas establecidas.' },
          { codigo: 'OA7', eje: 'Ciudadanía',              descripcion: 'Construir una postura personal sobre diversos temas controversiales y problemáticas de la sociedad, a partir de sus investigaciones y de la evaluación y confrontación de argumentaciones y evidencias.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Discusión argumentativa', descripcion: 'Construir colectivamente conclusiones, soluciones, preguntas, hipótesis o acuerdos que surjan de discusiones argumentadas y razonadas, en torno a temas controversiales de la vida y la sociedad actual.' },
          { codigo: 'OA2', eje: 'Discusión argumentativa', descripcion: 'Dialogar argumentativamente, privilegiando el componente racional de la argumentación, estableciendo relaciones lógicas y extrayendo conclusiones razonadas.' },
          { codigo: 'OA3', eje: 'Investigación',           descripcion: 'Evaluar diversas formas en que se legitima el conocimiento en los discursos, a partir del análisis crítico de sus modos de generación y su pertinencia al ámbito de participación y a la comunidad discursiva.' },
          { codigo: 'OA4', eje: 'Argumentación',           descripcion: 'Elaborar argumentos basándose en evidencias o información pública legitimada pertinentes al tema o problema analizado.' },
          { codigo: 'OA5', eje: 'Argumentación',           descripcion: 'Utilizar formas de argumentación y de legitimación del conocimiento, pertinentes al ámbito de participación, a la comunidad discursiva y a los propósitos de sus argumentaciones.' },
          { codigo: 'OA6', eje: 'Pensamiento crítico',     descripcion: 'Evaluar críticamente argumentaciones surgidas en distintos ámbitos de la sociedad, enfocándose en sus alcances, pertinencia, legitimidad de las evidencias y relaciones lógicas establecidas.' },
          { codigo: 'OA7', eje: 'Ciudadanía',              descripcion: 'Construir una postura personal sobre diversos temas controversiales y problemáticas de la sociedad, a partir de sus investigaciones y de la evaluación y confrontación de argumentaciones y evidencias.' }
        ]
      }
    }
  }
};

