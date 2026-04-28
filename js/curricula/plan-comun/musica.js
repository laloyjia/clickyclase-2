// =============================================================================
//  PLAN COMÚN — Música
//  Archivo: js/curricula/plan-comun/musica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['musica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['musica'] = {
  nombre: 'Música',
  sigla:  'MUS',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    '1B': ['Pulso y ritmo','Cantos y juegos','Sonidos del entorno'],
    '2B': ['Notación básica','Instrumentos básicos','Música folclórica'],
    '3B': ['Elementos musicales','Flauta dulce inicio','Música chilena'],
    '4B': ['Lectura musical','Conjunto vocal-instrumental','Géneros musicales'],
    '5B': ['Teoría musical básica','Expresión instrumental','Música popular'],
    '6B': ['Armonía básica','Creación musical','Música latinoamericana'],
    '7B': ['Conociendo nuestra herencia musical','Polifonía y creaciones','Los sonidos expresan','Música, sociedad y persona'],
    '8B': ['Escuchando, cantando y tocando','Música y procedimientos compositivos','Repertorios de Chile y el mundo','Difusión musical'],
    '1M': ['Apreciar la música del mundo','Lenguaje musical y estilo','Hacer música personal y colectivamente','Música, identidad y cultura'],
    '2M': ['Valoración crítica musical','Estilos y procedimientos compositivos','Interpretación y creación','Medios de registro y transmisión'],
    '3M': ['Descubriendo la música en la vida','Música y tecnologías','Haciendo música','Compartiendo nuestra música'],
    '4M': ['Descubriendo la música en la vida','Música y tecnologías','Haciendo música','Compartiendo nuestra música']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases (DS 439/2012 + DS 369/2015).
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    // ── 1°B — DS 2960/2012 ─ 7 OAs (Escuchar 1-3, Interpretar 4-6, Reflexionar 7)
    '1B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Escuchar cualidades del sonido (altura, timbre, intensidad, duración) y elementos del lenguaje musical (pulsos, acentos, patrones, secciones), y representarlos de distintas formas.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Expresar sensaciones, emociones e ideas que les sugiere el sonido y la música escuchada, usando diversos medios expresivos (verbal, corporal, musical, visual).'},
      {codigo:'OA3', eje:'Escuchar y apreciar', descripcion:'Escuchar música en forma abundante de diversos contextos y culturas, poniendo énfasis en: tradición escrita (docta) — piezas instrumentales y vocales de corta duración; tradición oral (folclor, música de pueblos originarios) — canciones, rondas, bailes y versos rítmicos; popular (jazz, rock, fusión, etc.) — música infantil. Escuchar apreciativamente al menos 20 músicas variadas de corta duración en el transcurso del año.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Cantar al unísono y tocar instrumentos de percusión convencionales y no convencionales.'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Explorar e improvisar ideas musicales con diversos medios sonoros (la voz, instrumentos convencionales y no convencionales, entre otros), usando las cualidades del sonido y elementos del lenguaje musical.'},
      {codigo:'OA6', eje:'Interpretar y crear', descripcion:'Presentar su trabajo musical, en forma individual y grupal, compartiendo con el curso y la comunidad.'},
      {codigo:'OA7', eje:'Reflexionar y contextualizar', descripcion:'Identificar y describir experiencias musicales y sonoras en su propia vida.'}
    ],
    // ── 2°B — DS 2960/2012 ─ 7 OAs (Escuchar 1-3, Interpretar 4-6, Reflexionar 7)
    '2B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Escuchar cualidades del sonido (altura, timbre, intensidad, duración) y elementos del lenguaje musical (pulsos, acentos, patrones, secciones), y representarlos de distintas formas.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Expresar sensaciones, emociones e ideas que les sugiere el sonido y la música escuchada, usando diversos medios expresivos (verbal, corporal, musical, visual).'},
      {codigo:'OA3', eje:'Escuchar y apreciar', descripcion:'Escuchar música en forma abundante de diversos contextos y culturas, poniendo énfasis en: tradición escrita (docta) — piezas instrumentales y/o vocales de corta duración (danzas medievales, Cuaderno de A.M. Bach, Cascanueces, etc.); tradición oral (folclor, música de pueblos originarios) — canciones, bailes, rondas y versos rítmicos; popular (jazz, rock, fusión, etc.) — música infantil. Escuchar apreciativamente al menos 20 músicas variadas de corta duración en el transcurso del año.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Cantar al unísono y tocar instrumentos de percusión convencionales y no convencionales.'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Explorar e improvisar ideas musicales con diversos medios sonoros (la voz, instrumentos convencionales y no convencionales, entre otros), usando las cualidades del sonido y elementos del lenguaje musical.'},
      {codigo:'OA6', eje:'Interpretar y crear', descripcion:'Presentar su trabajo musical, en forma individual y grupal, compartiendo con el curso y la comunidad.'},
      {codigo:'OA7', eje:'Reflexionar y contextualizar', descripcion:'Identificar y describir experiencias musicales y sonoras en su propia vida.'}
    ],
    // ── 3°B — DS 2960/2012 ─ 8 OAs (Escuchar 1-3, Interpretar 4-6, Reflexionar 7-8)
    '3B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Escuchar cualidades del sonido (altura, timbre, intensidad, duración) y elementos del lenguaje musical (pulsos, acentos, patrones, reiteraciones, contrastes, variaciones, dinámica, tempo, preguntas-respuestas, secciones, A-AB-BA), y representarlos de distintas formas.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Expresar, mostrando grados crecientes de elaboración, sensaciones, emociones e ideas que les sugiere la música escuchada, usando diversos medios expresivos (verbal, corporal, musical, visual).'},
      {codigo:'OA3', eje:'Escuchar y apreciar', descripcion:'Escuchar música en forma abundante de diversos contextos y culturas poniendo énfasis en: tradición escrita (docta) — música inspirada en raíces folclóricas (Soublette, Dvorak), música descriptiva (Saint-Saëns, Gofré); tradición oral (folclor, música de pueblos originarios) — canciones, bailes, festividades, tradiciones de Chile y del mundo; popular (jazz, rock, fusión) — fusión con raíces folclóricas (Los Jaivas, Congreso). Escuchar apreciativamente al menos 20 músicas de corta duración.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Cantar (al unísono y cánones simples, entre otros) y tocar instrumentos de percusión y melódicos (metalófono, flauta dulce u otros).'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear ideas musicales con diversos medios sonoros con un propósito, utilizando las cualidades del sonido y elementos del lenguaje musical.'},
      {codigo:'OA6', eje:'Interpretar y crear', descripcion:'Presentar su trabajo musical al curso y la comunidad, en forma individual y grupal, con compromiso y responsabilidad.'},
      {codigo:'OA7', eje:'Reflexionar y contextualizar', descripcion:'Identificar y describir experiencias musicales y sonoras en su propia vida y en la sociedad (celebraciones, reuniones, festividades, situaciones cotidianas u otros).'},
      {codigo:'OA8', eje:'Reflexionar y contextualizar', descripcion:'Reflexionar sobre sus fortalezas y las áreas en que pueden mejorar su audición, su interpretación y su creación.'}
    ],
    // ── 4°B — DS 2960/2012 ─ 8 OAs (Escuchar 1-3, Interpretar 4-6, Reflexionar 7-8)
    '4B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Escuchar cualidades del sonido (altura, timbre, intensidad, duración) y elementos del lenguaje musical (pulsos, acentos, patrones, reiteraciones, contrastes, variaciones, dinámica, tempo, preguntas-respuestas, secciones, A-AB-ABA), y representarlos de distintas formas.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Expresar, mostrando grados crecientes de elaboración, sensaciones, emociones e ideas que les sugiere la música escuchada, usando diversos medios expresivos (verbal, corporal, musical, visual).'},
      {codigo:'OA3', eje:'Escuchar y apreciar', descripcion:'Escuchar música en forma abundante de diversos contextos y culturas, poniendo énfasis en: tradición escrita (docta) — música para variadas agrupaciones instrumentales (Ibert, Beethoven, Messiaen), música descriptiva (Villalobos, Mussorgsky, Amenábar); tradición oral (folclor, música de pueblos originarios); popular (jazz, rock, fusión) — música de diversas agrupaciones instrumentales (películas, musicales). Escuchar apreciativamente al menos 20 músicas de corta duración.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Cantar (al unísono y cánones simples, entre otros) y tocar instrumentos de percusión y melódicos (metalófono, flauta dulce u otros) y/o armónicos (guitarra, teclado, otros).'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear ideas musicales con diversos medios sonoros con un propósito dado, utilizando las cualidades del sonido y elementos del lenguaje musical.'},
      {codigo:'OA6', eje:'Interpretar y crear', descripcion:'Presentar y compartir su trabajo musical al curso y la comunidad, en forma individual y grupal, con compromiso y responsabilidad.'},
      {codigo:'OA7', eje:'Reflexionar y contextualizar', descripcion:'Identificar y describir experiencias musicales y sonoras en su propia vida y en la sociedad (celebraciones, reuniones, festividades, situaciones cotidianas, otros).'},
      {codigo:'OA8', eje:'Reflexionar y contextualizar', descripcion:'Reflexionar sobre sus fortalezas y las áreas en que pueden mejorar su audición, su interpretación y su creación.'}
    ],
    // ── 5°B — DS 2960/2012 ─ 8 OAs (Escuchar 1-3, Interpretar 4-6, Reflexionar 7-8)
    '5B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Describir la música escuchada e interpretada, basándose en los elementos del lenguaje musical (reiteraciones, contrastes, pulsos, acentos, patrones rítmicos y melódicos, diseños melódicos, variaciones, dinámica, tempo, secciones A-AB-ABA-otras, preguntas-respuestas y texturas) y a su propósito expresivo.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Expresar, mostrando grados crecientes de elaboración y detalle, las sensaciones, emociones e ideas que les sugiere la música escuchada e interpretada, usando diversos medios expresivos (verbal, corporal, musical, visual).'},
      {codigo:'OA3', eje:'Escuchar y apreciar', descripcion:'Escuchar música en forma abundante de diversos contextos y culturas poniendo énfasis en: tradición escrita (docta) — música de compositores americanos y del mundo (Chávez, Guastavino, Satie); tradición oral (folclor, música de pueblos originarios) — música americana y sus orígenes (música africana, huaynos, joropos); popular (jazz, rock, fusión) — música de América (tangos, jazz, cumbias). Escuchar apreciativamente al menos 15 músicas variadas de corta y mediana duración al año.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Cantar al unísono y a más voces y tocar instrumentos de percusión, melódicos (metalófono, flauta dulce u otros) y/o armónicos (guitarra, teclado, otros).'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear ideas musicales con un propósito dado y con un adecuado dominio del lenguaje musical.'},
      {codigo:'OA6', eje:'Interpretar y crear', descripcion:'Presentar su trabajo musical al curso y la comunidad, en forma individual y grupal, con responsabilidad, dominio y musicalidad.'},
      {codigo:'OA7', eje:'Reflexionar y contextualizar', descripcion:'Explicar la relación entre las obras interpretadas y/o escuchadas, con elementos del contexto en que surgen.'},
      {codigo:'OA8', eje:'Reflexionar y contextualizar', descripcion:'Reflexionar sobre sus fortalezas y las áreas en que pueden mejorar la audición, la interpretación y la creación, propia y de los otros, con respeto y autocrítica.'}
    ],
    // ── 6°B — DS 2960/2012 ─ 8 OAs (Escuchar 1-3, Interpretar 4-6, Reflexionar 7-8)
    '6B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Describir la música escuchada e interpretada basándose en los elementos del lenguaje musical (reiteraciones, contrastes, pulsos, acentos, patrones rítmicos y melódicos, diseños melódicos, variaciones, dinámica, tempo, secciones A-AB-ABA-otras, preguntas-respuestas y texturas) y a su propósito expresivo.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Expresar, mostrando grados crecientes de elaboración y detalle, las sensaciones, emociones e ideas que les sugiere la música escuchada e interpretada, usando diversos medios expresivos (verbal, corporal, musical, visual).'},
      {codigo:'OA3', eje:'Escuchar y apreciar', descripcion:'Escuchar música en forma abundante de diversos contextos y culturas, poniendo énfasis en: tradición escrita (docta) — música de compositores chilenos y del mundo (P. H. Allende, Carlos Isamitt, A. Copland); tradición oral (folclor, música de pueblos originarios) — música chilena y sus orígenes (música mapuche, Rolando Alarcón, Grupo Cuncumén); popular (jazz, rock, fusión) — música chilena y sus influencias (Los porfiados de la Cueca, La Ley). Escuchar apreciativamente al menos 15 músicas variadas de corta y mediana duración.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Cantar al unísono y a más voces y tocar instrumentos de percusión, melódicos (metalófono, flauta dulce u otros) y/o armónicos (guitarra, teclado, otros).'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear ideas musicales con un propósito dado y con un adecuado dominio del lenguaje musical.'},
      {codigo:'OA6', eje:'Interpretar y crear', descripcion:'Presentar su trabajo musical al curso y la comunidad, en forma individual y grupal, con responsabilidad, dominio y musicalidad.'},
      {codigo:'OA7', eje:'Reflexionar y contextualizar', descripcion:'Explicar la relación entre las obras interpretadas y/o escuchadas, con elementos del contexto en que surgen.'},
      {codigo:'OA8', eje:'Reflexionar y contextualizar', descripcion:'Reflexionar sobre sus fortalezas y las áreas en que pueden mejorar la audición, la interpretación y la creación, propia y de otros, con respeto y autocrítica.'}
    ],
    // ── 7°B — DS 369/2015 ─ 7 OAs (Escuchar 1-2, Interpretar 3-5, Reflexionar 6-7)
    '7B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Reconocer sentimientos, sensaciones e ideas al escuchar manifestaciones y obras musicales de Chile y el mundo, presentes en la tradición oral, escrita y popular, manifestándolos a través de medios verbales, visuales, sonoros y corporales.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Identificar conscientemente los elementos del lenguaje musical y los procedimientos compositivos evidentes en la música escuchada, interpretada y creada.'},
      {codigo:'OA3', eje:'Interpretar y crear', descripcion:'Cantar y tocar repertorio diverso, desarrollando habilidades tales como precisión rítmica y melódica, expresividad, conciencia de fraseo y dinámica, entre otros, fortaleciendo el interés por el hacer musical individual y grupal.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Interpretar a una y más voces repertorio diverso, incorporando como apoyo el uso de medios de registro y transmisión.'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear música dando énfasis a ambientaciones sonoras libres, acompañamientos rítmicos, melódicos y/o armónicos simples.'},
      {codigo:'OA6', eje:'Reflexionar y relacionar', descripcion:'Reconocer fortalezas y áreas de crecimiento personal en la audición, interpretación, creación y reflexión.'},
      {codigo:'OA7', eje:'Reflexionar y relacionar', descripcion:'Reconocer el rol de la música en la sociedad, considerando sus propias experiencias musicales, contextos en que surge y las personas que la cultivan.'}
    ],
    // ── 8°B — DS 369/2015 ─ 7 OAs (Escuchar 1-2, Interpretar 3-5, Reflexionar 6-7)
    '8B': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Comunicar sentimientos, sensaciones e ideas al escuchar manifestaciones y obras musicales de Chile y el mundo, presentes en la tradición oral, escrita y popular, integrando sus conocimientos en expresiones verbales, visuales, sonoras y corporales.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Describir analíticamente los elementos del lenguaje musical y los procedimientos compositivos evidentes en la música escuchada, interpretada y creada, y su relación con el propósito expresivo.'},
      {codigo:'OA3', eje:'Interpretar y crear', descripcion:'Cantar y tocar repertorio relacionado con la música escuchada, desarrollando habilidades tales como comprensión rítmica, melódica, conciencia de textura y estilo, expresividad, rigurosidad, fluidez de fraseo y dinámica, entre otros.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Interpretar repertorio diverso a una y más voces, con precisión rítmica y melódica, incorporando como guía el uso de medios de registro y transmisión, en la presentación de su quehacer musical.'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear música aplicando experiencias y conocimientos a partir de indicaciones determinadas, dando énfasis a acompañamientos y variaciones rítmicas, melódicas y/o armónicas.'},
      {codigo:'OA6', eje:'Reflexionar y relacionar', descripcion:'Explicar fortalezas y áreas de crecimiento personal en la audición, interpretación, creación y reflexión, y su influencia en el trabajo musical propio y colectivo.'},
      {codigo:'OA7', eje:'Reflexionar y relacionar', descripcion:'Apreciar el rol de la música en la sociedad a partir del repertorio trabajado, respetando la diversidad y riqueza de los contextos socioculturales.'}
    ],
    // ── 1°M — DS 369/2015 ─ 7 OAs (Escuchar 1-2, Interpretar 3-5, Reflexionar 6-7)
    '1M': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Apreciar musicalmente manifestaciones y obras musicales de Chile y el mundo presentes en la tradición oral, escrita y popular, expresándose mediante medios verbales, visuales, sonoros y corporales.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Comparar músicas con características diferentes, basándose tanto en elementos del lenguaje musical y en los procedimientos compositivos, como en su relación con el propósito expresivo.'},
      {codigo:'OA3', eje:'Interpretar y crear', descripcion:'Cantar y tocar repertorio diverso y relacionado con la música escuchada, desarrollando habilidades tales como conocimiento de estilo, identificación de voces en un grupo, transmisión del propósito expresivo, laboriosidad y compromiso, entre otras.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Interpretar repertorio diverso a una y más voces, con precisión técnica y fluidez, utilizando diversos medios de registro y transmisión en la gestión y presentación de su quehacer musical.'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear música dando énfasis a la experimentación con el material sonoro, arreglos de canciones y secciones musicales, basándose en ideas musicales y extramusicales.'},
      {codigo:'OA6', eje:'Reflexionar y relacionar', descripcion:'Analizar fortalezas y áreas de crecimiento personal en la audición, interpretación, creación y reflexión, y su influencia en el trabajo musical propio y colectivo, proponiendo alternativas de desarrollo.'},
      {codigo:'OA7', eje:'Reflexionar y relacionar', descripcion:'Evaluar la relevancia de la música, destacando el singular sentido que esta cumple en la construcción y preservación de identidades y culturas.'}
    ],
    // ── 2°M — DS 369/2015 ─ 7 OAs (Escuchar 1-2, Interpretar 3-5, Reflexionar 6-7)
    '2M': [
      {codigo:'OA1', eje:'Escuchar y apreciar', descripcion:'Valorar críticamente manifestaciones y obras musicales de Chile y el mundo presentes en la tradición oral, escrita y popular, comunicando sus fundamentos mediante medios verbales, visuales, sonoros y corporales.'},
      {codigo:'OA2', eje:'Escuchar y apreciar', descripcion:'Contrastar músicas con características similares, basándose tanto en elementos del lenguaje musical y en los procedimientos compositivos y contextos como en su relación con el propósito expresivo.'},
      {codigo:'OA3', eje:'Interpretar y crear', descripcion:'Cantar y tocar repertorio diverso sobre la base de una selección personal, desarrollando habilidades tales como manejo de estilo, fluidez, capacidad de proponer y dirigir, identificación de voces y funciones en un grupo, entre otras.'},
      {codigo:'OA4', eje:'Interpretar y crear', descripcion:'Interpretar repertorio diverso a una y más voces, con conciencia estilística, aplicando medios de registro y transmisión en la gestión y difusión de su quehacer musical.'},
      {codigo:'OA5', eje:'Interpretar y crear', descripcion:'Improvisar y crear música con fluidez e innovación, dando énfasis a arreglos de canciones y secciones musicales, sobre la base de proposiciones dadas o rasgos estilísticos y formales acordados.'},
      {codigo:'OA6', eje:'Reflexionar y relacionar', descripcion:'Evaluar críticamente fortalezas y áreas de crecimiento personal en la audición, interpretación, creación y reflexión, propia y de otros, diseñando un plan de mejora.'},
      {codigo:'OA7', eje:'Reflexionar y relacionar', descripcion:'Valorar críticamente el rol de los medios de registro y transmisión en la evolución de la música en diferentes periodos y espacios históricos.'}
    ],
    // ── 3°M FG — DS 193/2019 ─ 7 OAs (Expresar y crear 1-3, Apreciar y responder 4-6, Comunicar y difundir 7)
    '3M': [
      {codigo:'OA1', eje:'Expresar y crear', descripcion:'Experimentar con diversos estilos musicales contemporáneos, utilizando diferentes recursos de producción musical (voz, objetos sonoros, instrumentos musicales y tecnologías).'},
      {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear música para expresar emociones e ideas, tomando riesgos creativos al seleccionar recursos de producción y al aplicar elementos del lenguaje musical (ritmo, armonía, duración, tono, entre otros).'},
      {codigo:'OA3', eje:'Expresar y crear', descripcion:'Interpretar repertorio personal y de músicos de diferentes estilos, en forma individual o en conjunto, considerando elementos característicos del estilo y un trabajo técnico coherente con los propósitos expresivos.'},
      {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar propósitos expresivos de obras musicales de diferentes estilos a partir de criterios estéticos (lenguaje musical, aspectos técnicos, emociones, sensaciones e ideas que genera, entre otros), utilizando conceptos disciplinarios.'},
      {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios estéticos de obras musicales de diferentes estilos, considerando criterios estéticos, propósitos expresivos y aspectos contextuales.'},
      {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de obras musicales, personales y de sus pares, considerando criterios estéticos, aspectos técnicos y propósitos expresivos, y dando cuenta de una postura personal fundada y respetuosa.'},
      {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar colaborativamente proyectos de difusión de obras e interpretaciones musicales propias, empleando diversidad de medios o TIC.'}
    ],
    // ── 4°M FG — DS 193/2019 ─ Mismos 7 OAs que 3°M (Bases no diferencian por nivel)
    '4M': [
      {codigo:'OA1', eje:'Expresar y crear', descripcion:'Experimentar con diversos estilos musicales contemporáneos, utilizando diferentes recursos de producción musical (voz, objetos sonoros, instrumentos musicales y tecnologías).'},
      {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear música para expresar emociones e ideas, tomando riesgos creativos al seleccionar recursos de producción y al aplicar elementos del lenguaje musical (ritmo, armonía, duración, tono, entre otros).'},
      {codigo:'OA3', eje:'Expresar y crear', descripcion:'Interpretar repertorio personal y de músicos de diferentes estilos, en forma individual o en conjunto, considerando elementos característicos del estilo y un trabajo técnico coherente con los propósitos expresivos.'},
      {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar propósitos expresivos de obras musicales de diferentes estilos a partir de criterios estéticos (lenguaje musical, aspectos técnicos, emociones, sensaciones e ideas que genera, entre otros), utilizando conceptos disciplinarios.'},
      {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios estéticos de obras musicales de diferentes estilos, considerando criterios estéticos, propósitos expresivos y aspectos contextuales.'},
      {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de obras musicales, personales y de sus pares, considerando criterios estéticos, aspectos técnicos y propósitos expresivos, y dando cuenta de una postura personal fundada y respetuosa.'},
      {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar colaborativamente proyectos de difusión de obras e interpretaciones musicales propias, empleando diversidad de medios o TIC.'}
    ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Escuchar y apreciar','Interpretar y crear','Reflexionar y contextualizar'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVOS DIFERENCIADOS HC (3°M y 4°M) — DS 193/2019
  //  Mismos OAs para 3°M y 4°M (las Bases no diferencian por nivel).
  // ────────────────────────────────────────────────────────────────────
  electivos: {
    'creacion-y-composicion-musical': {
      nombre:  'Creación y Composición Musical',
      sigla:   'CCM',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Experimentación sonora','Ideas para la creación','Creación y montaje de obras musicales','Difusión de creaciones musicales'],
        '4M': ['Experimentación sonora','Ideas para la creación','Creación y montaje de obras musicales','Difusión de creaciones musicales']
      },
      oas: {
        '3M': [
          {codigo:'OA1', eje:'Expresar y crear', descripcion:'Innovar al resolver desafíos durante el proceso creativo, considerando aspectos expresivos y técnicos, procedimientos compositivos (repetición, variación, contraste) y la evaluación crítica personal y de otros.'},
          {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear obras musicales de diversos estilos y formatos, basados en la investigación con elementos del lenguaje musical, procedimientos compositivos, la experimentación con recursos de producción musical (voz, objetos sonoros, instrumentos musicales y tecnologías) y la investigación de referentes nacionales e internacionales.'},
          {codigo:'OA3', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar, personal o colectivamente, presentaciones a públicos específicos para comunicar propósitos, aspectos del proceso y resultados de sus creaciones y composiciones musicales, empleando diversidad de medios, recursos y tecnologías tradicionales y emergentes.'},
          {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar estéticamente obras musicales de diferentes épocas y procedencias, relacionando tratamiento del lenguaje musical, procedimientos, técnicas, instrumentos y recursos de producción musical, y contextos.'},
          {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios estéticos de obras y manifestaciones musicales de diferentes épocas y procedencias, a partir de análisis estéticos y apreciaciones personales.'},
          {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de obras y proyectos musicales personales y de sus pares, considerando la relación entre propósitos expresivos o comunicativos, aspectos estéticos y decisiones tomadas durante el proceso.'},
          {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Relacionar, a partir de investigaciones, las habilidades y conocimientos de la asignatura con diferentes contextos laborales, profesionales y de desarrollo personal.'}
        ],
        '4M': [
          {codigo:'OA1', eje:'Expresar y crear', descripcion:'Innovar al resolver desafíos durante el proceso creativo, considerando aspectos expresivos y técnicos, procedimientos compositivos (repetición, variación, contraste) y la evaluación crítica personal y de otros.'},
          {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear obras musicales de diversos estilos y formatos, basados en la investigación con elementos del lenguaje musical, procedimientos compositivos, la experimentación con recursos de producción musical (voz, objetos sonoros, instrumentos musicales y tecnologías) y la investigación de referentes nacionales e internacionales.'},
          {codigo:'OA3', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar, personal o colectivamente, presentaciones a públicos específicos para comunicar propósitos, aspectos del proceso y resultados de sus creaciones y composiciones musicales, empleando diversidad de medios, recursos y tecnologías tradicionales y emergentes.'},
          {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar estéticamente obras musicales de diferentes épocas y procedencias, relacionando tratamiento del lenguaje musical, procedimientos, técnicas, instrumentos y recursos de producción musical, y contextos.'},
          {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios estéticos de obras y manifestaciones musicales de diferentes épocas y procedencias, a partir de análisis estéticos y apreciaciones personales.'},
          {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de obras y proyectos musicales personales y de sus pares, considerando la relación entre propósitos expresivos o comunicativos, aspectos estéticos y decisiones tomadas durante el proceso.'},
          {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Relacionar, a partir de investigaciones, las habilidades y conocimientos de la asignatura con diferentes contextos laborales, profesionales y de desarrollo personal.'}
        ]
      }
    },
    'interpretacion-musical': {
      nombre:  'Interpretación Musical',
      sigla:   'IMU',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['La práctica: elemento clave de la interpretación','Ensambles musicales','Incorporando lenguaje de estilos musicales','Difundiendo el trabajo interpretativo'],
        '4M': ['La práctica: elemento clave de la interpretación','Ensambles musicales','Incorporando lenguaje de estilos musicales','Difundiendo el trabajo interpretativo']
      },
      oas: {
        '3M': [
          {codigo:'OA1', eje:'Expresar y crear', descripcion:'Innovar al resolver desafíos de la interpretación musical, considerando procedimientos expresivos (fraseo, ritmo, armonía, otros), aspectos de la ejecución y la evaluación crítica personal y de otros.'},
          {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear proyectos de interpretación musical que respondan a intereses personales o grupales, basados en la investigación con recursos y procedimientos expresivos y técnicos, características de estilo y referentes de la interpretación vocal e instrumental nacionales e internacionales.'},
          {codigo:'OA3', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar presentaciones a públicos específicos para comunicar propósitos, aspectos del proceso de interpretación y ejecución, y resultados de proyectos de interpretación musical, empleando diversidad de medios, recursos y tecnologías tradicionales y emergentes.'},
          {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar estéticamente obras musicales de diferentes épocas y procedencias, relacionando elementos del lenguaje musical, procedimientos, técnicas y recursos de la producción musical, y aspectos contextuales.'},
          {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios críticos de obras y manifestaciones musicales de diferentes épocas y procedencias, a partir de análisis estéticos y apreciaciones personales.'},
          {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de trabajos de interpretación musical personales y de sus pares, considerando propósitos expresivos y aspectos estéticos, y decisiones tomadas durante el proceso.'},
          {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Relacionar, a partir de investigaciones, las habilidades y conocimientos de la asignatura con diferentes contextos laborales, profesionales y de desarrollo personal.'}
        ],
        '4M': [
          {codigo:'OA1', eje:'Expresar y crear', descripcion:'Innovar al resolver desafíos de la interpretación musical, considerando procedimientos expresivos (fraseo, ritmo, armonía, otros), aspectos de la ejecución y la evaluación crítica personal y de otros.'},
          {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear proyectos de interpretación musical que respondan a intereses personales o grupales, basados en la investigación con recursos y procedimientos expresivos y técnicos, características de estilo y referentes de la interpretación vocal e instrumental nacionales e internacionales.'},
          {codigo:'OA3', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar presentaciones a públicos específicos para comunicar propósitos, aspectos del proceso de interpretación y ejecución, y resultados de proyectos de interpretación musical, empleando diversidad de medios, recursos y tecnologías tradicionales y emergentes.'},
          {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar estéticamente obras musicales de diferentes épocas y procedencias, relacionando elementos del lenguaje musical, procedimientos, técnicas y recursos de la producción musical, y aspectos contextuales.'},
          {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios críticos de obras y manifestaciones musicales de diferentes épocas y procedencias, a partir de análisis estéticos y apreciaciones personales.'},
          {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de trabajos de interpretación musical personales y de sus pares, considerando propósitos expresivos y aspectos estéticos, y decisiones tomadas durante el proceso.'},
          {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Relacionar, a partir de investigaciones, las habilidades y conocimientos de la asignatura con diferentes contextos laborales, profesionales y de desarrollo personal.'}
        ]
      }
    }
  }
};

