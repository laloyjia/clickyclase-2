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
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  unidades: {
    '1B': ['Pulso y ritmo','Cantos y juegos','Sonidos del entorno'],
    '2B': ['Notación básica','Instrumentos básicos','Música folclórica'],
    '3B': ['Elementos musicales','Flauta dulce inicio','Música chilena'],
    '4B': ['Lectura musical','Conjunto vocal-instrumental','Géneros musicales'],
    '5B': ['Teoría musical básica','Expresión instrumental','Música popular'],
    '6B': ['Armonía básica','Creación musical','Música latinoamericana'],
    '7B': ['Música y contexto histórico','Composición','Apreciación musical'],
    '8B': ['Géneros y estilos musicales','Proyecto musical','Música y tecnología'],
    '1M': ['Músicas del mundo','Creación e interpretación','Análisis musical'],
    '2M': ['Música chilena e identidad','Proyecto musical','Música y tecnología']
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
    '7B': [ /* TODO: DS 369/2015 */ ], '8B': [ /* TODO: DS 369/2015 */ ],
    '1M': [ /* TODO: DS 369/2015 */ ], '2M': [ /* TODO: DS 369/2015 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Escuchar y apreciar','Interpretar y crear','Reflexionar y contextualizar']
};

