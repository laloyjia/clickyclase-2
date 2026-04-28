// =============================================================================
//  PLAN COMÚN — Artes Visuales
//  Archivo: js/curricula/plan-comun/artes.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  OAs portados desde Programas de Estudio oficiales:
//    · 1B–4B   : DS 2960/2012 (Bases Curriculares Educación Básica).
//    · 1M–2M   : Programa de Estudio 2019 (DS 369/2015).
//    · 3M–4M FG: Programa de Estudio 2021 (DS 193/2019).
//
//  Pendiente:
//    · 5B–8B   : se agregarán cuando se suban los Programas de Estudio
//                correspondientes (actualmente sin OAs portados).
//    · Electivo "Artes Visuales, Audiovisuales y Multimediales" (HC 3°–4° medio)
//                se documentará como asignatura separada, fuera de plan común.
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['artes'] = {
//      nombre, sigla, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de Artes
//      habilidades: [...],
//      unidades: { '1B': [...], ... }
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['artes'] = {
  nombre: 'Artes Visuales',
  sigla:  'ART',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    '1B': ['Expresión plástica libre','Color y forma','Arte y entorno'],
    '2B': ['Técnicas básicas','Observación artística','Arte chileno básico'],
    '3B': ['Elementos del lenguaje visual','Técnicas mixtas','Arte y cultura'],
    '4B': ['Composición visual','Historia del arte básica','Creación artística'],
    '5B': ['Arte y patrimonio','Técnicas avanzadas','Proyecto artístico'],
    '6B': ['Arte latinoamericano','Diseño básico','Crítica de arte'],
    '7B': ['Arte contemporáneo','Lenguajes artísticos','Proyecto creativo'],
    '8B': ['Arte y sociedad','Portafolio artístico','Arte digital básico'],
    '1M': ['Grabado y libro de artista','Arquitectura','Diseño urbano y pintura mural','Arte digital'],
    '2M': ['Arte y problemáticas sociales','Escultura y diseño','Video y multimedia','Comunicación y difusión'],
    '3M': ['Experimentando y decidiendo para crear','Referentes para crear','Desafíos artísticos interdisciplinarios','Compartiendo y difundiendo'],
    '4M': ['Experimentando y decidiendo para crear','Referentes para crear','Desafíos artísticos interdisciplinarios','Compartiendo y difundiendo']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo, eje, descripcion }
  //  Ejes Básica y 1M-2M: "Expresar y crear visualmente", "Apreciar y responder frente al arte",
  //                        "Difusión y comunicación" (solo 1M-2M).
  //  Ejes 3M-4M FG:        "Expresar y crear", "Apreciar y responder", "Comunicar y difundir".
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Expresar y crear trabajos de arte a partir de la observación del entorno natural (paisaje, animales y plantas), entorno cultural (vida cotidiana y familiar) y entorno artístico (obras de arte local, chileno, latinoamericano y del resto del mundo).'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Experimentar y aplicar elementos del lenguaje visual en sus trabajos de arte: línea (gruesa, delgada, recta, ondulada e irregular); color (puros, mezclados, fríos y cálidos); textura (visual y táctil).'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Expresar emociones e ideas en sus trabajos de arte a partir de la experimentación con: materiales de modelado, de reciclaje, naturales, papeles, cartones, pegamentos, lápices, pinturas, textiles e imágenes digitales; herramientas para dibujar, pintar, cortar, modelar, unir y tecnológicas (pincel, tijera, esteca, computador, entre otras); procedimientos de dibujo, pintura, collage, escultura, dibujo digital y otros.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Observar y comunicar oralmente sus primeras impresiones de lo que sienten y piensan de obras de arte por variados medios. (Observar anualmente al menos 10 obras de arte local o chileno, 10 latinoamericanas y 10 de arte universal).'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Explicar sus preferencias frente al trabajo de arte personal y de sus pares, usando elementos del lenguaje visual.'}
    ],
    '2B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Expresar y crear trabajos de arte a partir de la observación del entorno natural (figura humana y paisajes chilenos), entorno cultural (personas y patrimonio cultural de Chile) y entorno artístico (obras de arte local, chileno, latinoamericano y del resto del mundo).'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Experimentar y aplicar elementos del lenguaje visual (incluidos los del nivel anterior) en sus trabajos de arte: línea (vertical, horizontal, diagonal, espiral y quebrada); color (primarios y secundarios); formas (geométricas).'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Expresar emociones e ideas en sus trabajos de arte a partir de la experimentación con: materiales de modelado, de reciclaje, naturales, papeles, cartones, pegamentos, lápices, pinturas, textiles e imágenes digitales; herramientas para dibujar, pintar, cortar, modelar, unir y tecnológicas (pincel, tijera, mirete, computador, entre otras); procedimientos de dibujo, pintura, collage, escultura, dibujo digital, entre otros.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Comunicar y explicar sus impresiones de lo que sienten y piensan de obras de arte por variados medios. (Observar anualmente al menos 10 obras de arte local o chileno, 10 latinoamericanas y 10 de arte universal).'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Explicar sus preferencias frente al trabajo de arte personal y de sus pares, usando elementos del lenguaje visual.'}
    ],
    '3B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte con un propósito expresivo personal y basados en la observación del entorno natural (animales, plantas y fenómenos naturales); entorno cultural (creencias de distintas culturas: mitos, seres imaginarios, dioses, fiestas, tradiciones, otros); entorno artístico (arte de la Antigüedad y movimientos artísticos como fauvismo, expresionismo y art nouveau).'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Aplicar elementos del lenguaje visual (incluidos los de niveles anteriores) en sus trabajos de arte, con diversos propósitos expresivos y creativos: color (frío, cálido y expresivo); textura (en plano y volumen); forma (real y recreada).'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte a partir de experiencias, intereses y temas del entorno natural y artístico, demostrando manejo de: materiales de modelado, de reciclaje, naturales, papeles, cartones, pegamentos, lápices, pinturas, textiles e imágenes digitales; herramientas para dibujar, pintar, cortar, modelar, unir y tecnológicas (pincel, tijera, mirete, computador, cámara fotográfica, entre otras); procedimientos de dibujo, pintura, grabado, escultura, técnicas mixtas, artesanía, fotografía, entre otros.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Describir sus observaciones de obras de arte y objetos, usando elementos del lenguaje visual y expresando lo que sienten y piensan. (Observar anualmente al menos 15 obras de arte y artesanía local y chilena, 15 latinoamericanas y 15 de arte universal).'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Describir fortalezas y aspectos a mejorar en el trabajo de arte personal y de sus pares, usando criterios de uso de materiales, procedimientos técnicos y propósito expresivo.'}
    ],
    '4B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte con un propósito expresivo personal y basados en la observación del entorno natural (naturaleza y paisaje americano); entorno cultural (América y sus tradiciones: cultura precolombina, tradiciones y artesanía americana); entorno artístico (arte precolombino y movimientos artísticos como muralismo mexicano, naif y surrealismo en Chile, Latinoamérica y en el resto del mundo).'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Aplicar elementos del lenguaje visual (incluidos los de niveles anteriores) en sus trabajos de arte, con diversos propósitos expresivos y creativos: líneas de contorno; color (tono y matiz); forma (figurativa y no figurativa).'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte a partir de experiencias, intereses y temas del entorno natural y artístico, demostrando manejo de: materiales de modelado, de reciclaje, naturales, papeles, cartones, pegamentos, lápices, pinturas, textiles e imágenes digitales; herramientas para dibujar, pintar, cortar, unir, modelar y tecnológicas (pincel, tijera, mirete, computador, cámara fotográfica, entre otras); procedimientos de dibujo, pintura, grabado, escultura, técnicas mixtas, artesanía, fotografía, entre otros.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Describir sus observaciones de obras de arte y objetos, usando elementos del lenguaje visual y expresando lo que sienten y piensan. (Observar anualmente al menos 15 obras de arte y artesanía local y chilena, 15 de arte latinoamericano y 15 de arte universal).'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Describir fortalezas y aspectos a mejorar en el trabajo de arte personal y de sus pares, aplicando criterios de uso de materiales, procedimientos técnicos y propósito expresivo.'}
    ],
    // ── 5°B — Programa de Estudio (DS 2960/2012) ─ 5 OAs ─────────────────
    '5B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte y diseños a partir de sus propias ideas y de la observación del: entorno cultural (Chile, su paisaje y sus costumbres en el pasado y en el presente); entorno artístico (impresionismo y postimpresionismo; y diseño en Chile, Latinoamérica y del resto del mundo).'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Aplicar y combinar elementos del lenguaje visual (incluidos los de niveles anteriores) en trabajos de arte y diseños con diferentes propósitos expresivos y creativos: color (complementario); formas (abiertas y cerradas); luz y sombra.'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte y diseños a partir de diferentes desafíos y temas del entorno cultural y artístico, demostrando dominio en el uso de: materiales de modelado, de reciclaje, naturales, papeles, cartones, pegamentos, lápices, pinturas, textiles e imágenes digitales; herramientas para dibujar, pintar, cortar, unir, modelar y tecnológicas (brocha, sierra de calar, esteca, cámara de video y proyector multimedia, entre otros); procedimientos de pintura, escultura, construcción, fotografía, video, diseño gráfico digital, entre otros.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Analizar e interpretar obras de arte y diseño en relación con la aplicación del lenguaje visual, contextos, materiales, estilos u otros. (Observar anualmente al menos 50 obras de arte y diseño chileno, latinoamericano y universal).'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Describir y comparar trabajos de arte y diseños personales y de sus pares, considerando: fortalezas y aspectos a mejorar; uso de materiales y procedimientos; aplicación de elementos del lenguaje visual; propósitos expresivos.'}
    ],
    // ── 6°B — Programa de Estudio (DS 2960/2012) ─ 5 OAs ─────────────────
    '6B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte y diseños a partir de sus propias ideas y de la observación del: entorno cultural (el hombre contemporáneo y la ciudad); entorno artístico (el arte contemporáneo y el arte en el espacio público: murales y esculturas).'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Aplicar y combinar elementos del lenguaje visual (incluidos los de niveles anteriores) en trabajos de arte y diseños con diferentes propósitos expresivos y creativos: color (gamas y contrastes); volumen (lleno y vacío).'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos de arte y diseños a partir de diferentes desafíos y temas del entorno cultural y artístico, demostrando dominio en el uso de: materiales de modelado, de reciclaje, naturales, papeles, cartones, pegamentos, lápices, pinturas e imágenes digitales; herramientas para dibujar, pintar, cortar, unir, modelar y tecnológicas (rodillos de grabado, sierra de calar, mirete, cámara de video y proyector multimedia, entre otros); procedimientos de pintura, grabado, escultura, instalación, técnicas mixtas, arte digital, fotografía, video, murales, entre otros.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Analizar e interpretar obras de arte y objetos en relación con la aplicación del lenguaje visual, contextos, materiales, estilos u otros. (Observar anualmente al menos 50 obras de arte chileno, latinoamericano y universal).'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Evaluar críticamente trabajos de arte y diseños personales y de sus pares, considerando: expresión de emociones y problemáticas sociales; uso de materiales y procedimientos; aplicación de elementos del lenguaje visual; propósitos expresivos.'}
    ],
    // ── 7°B — Programa de Estudio (DS 369/2015) ─ 6 OAs ─────────────────
    '7B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos visuales basados en las percepciones, sentimientos e ideas generadas a partir de la observación de manifestaciones estéticas referidas a diversidad cultural, género e íconos sociales, patrimoniales y contemporáneas.'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos visuales a partir de intereses personales, experimentando con materiales sustentables en dibujo, pintura y escultura.'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos visuales a partir de la imaginación, experimentando con medios digitales de expresión contemporáneos como fotografía y edición de imágenes.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Interpretar manifestaciones visuales patrimoniales y contemporáneas, atendiendo a criterios como características del medio de expresión, materialidad y lenguaje visual.'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Interpretar relaciones entre propósito expresivo del trabajo artístico personal y de sus pares, y la utilización del lenguaje visual.'},
      {codigo:'OA6', eje:'Difundir y comunicar', descripcion:'Caracterizar y apreciar espacios de difusión de las artes visuales contemplando medios de expresión presentes, espacio, montaje y público, entre otros.'}
    ],
    // ── 8°B — Programa de Estudio (DS 369/2015) ─ 6 OAs ─────────────────
    '8B': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos visuales basados en la apreciación y el análisis de manifestaciones estéticas referidas a la relación entre personas, naturaleza y medioambiente, en diferentes contextos.'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos visuales a partir de diferentes desafíos creativos, experimentando con materiales sustentables en técnicas de impresión, papeles y textiles.'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos visuales a partir de diferentes desafíos creativos, usando medios de expresión contemporáneos como la instalación.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Analizar manifestaciones visuales patrimoniales y contemporáneas, contemplando criterios como: contexto, materialidad, lenguaje visual y propósito expresivo.'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Evaluar trabajos visuales personales y de sus pares, considerando criterios como: materialidad, lenguaje visual y propósito expresivo.'},
      {codigo:'OA6', eje:'Difundir y comunicar', descripcion:'Comparar y valorar espacios de difusión de las artes visuales, considerando: medios de expresión presentes, espacio, montaje, público y aporte a la comunidad.'}
    ],
    '1M': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear proyectos visuales con diversos propósitos, basados en la apreciación y reflexión acerca de la arquitectura, los espacios y el diseño urbano, en diferentes medios y contextos.'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos y proyectos visuales basados en sus imaginarios personales, investigando el manejo de materiales sustentables en procedimientos de grabado y pintura mural.'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear proyectos visuales basados en imaginarios personales, investigando en medios contemporáneos como libros de artista y arte digital.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Realizar juicios críticos de manifestaciones visuales considerando las condiciones contextuales de su creador y utilizando criterios estéticos pertinentes.'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Realizar juicios críticos de trabajos y proyectos visuales personales y de sus pares, fundamentados en criterios referidos al contexto, la materialidad, el lenguaje visual y el propósito expresivo.'},
      {codigo:'OA6', eje:'Difusión y comunicación', descripcion:'Diseñar propuestas de difusión hacia la comunidad de trabajos y proyectos de arte, en el contexto escolar y local, de forma directa o virtual, teniendo presente las manifestaciones visuales a exponer, el espacio, el montaje, el público y el aporte a la comunidad, entre otros.'}
    ],
    '2M': [
      {codigo:'OA1', eje:'Expresar y crear visualmente', descripcion:'Crear proyectos visuales basados en la valoración crítica de manifestaciones estéticas referidas a problemáticas sociales y juveniles, en el espacio público y en diferentes contextos.'},
      {codigo:'OA2', eje:'Expresar y crear visualmente', descripcion:'Crear trabajos y proyectos visuales basados en diferentes desafíos creativos, investigando el manejo de materiales sustentables en procedimientos de escultura y diseño.'},
      {codigo:'OA3', eje:'Expresar y crear visualmente', descripcion:'Crear proyectos visuales basados en diferentes desafíos creativos, utilizando medios contemporáneos como video y multimedia.'},
      {codigo:'OA4', eje:'Apreciar y responder frente al arte', descripcion:'Argumentar juicios críticos referidos a la valoración de diversas manifestaciones visuales, configurando una selección personal de criterios estéticos.'},
      {codigo:'OA5', eje:'Apreciar y responder frente al arte', descripcion:'Argumentar evaluaciones y juicios críticos, valorando el trabajo visual personal y de sus pares, y seleccionando criterios de análisis según el tipo de trabajo o proyecto visual apreciado.'},
      {codigo:'OA6', eje:'Difusión y comunicación', descripcion:'Implementar propuestas de difusión hacia la comunidad de trabajos y proyectos de arte, en el contexto escolar o local, de forma directa o virtual, contemplando las manifestaciones visuales a exponer, el espacio, el montaje, el público y el aporte a la comunidad, entre otros.'}
    ],
    // 3°M y 4°M — Formación General, Programa de Estudio 2021 (DS 193/2019).
    // Los mismos 7 OA se desarrollan en ambos niveles, con distinta profundidad y énfasis.
    '3M': [
      {codigo:'OA1', eje:'Expresar y crear', descripcion:'Experimentar con diversidad de soportes, procedimientos y materiales utilizados en la ilustración, las artes audiovisuales y multimediales.'},
      {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear obras y proyectos de ilustración, audiovisuales y multimediales, para expresar sensaciones, emociones e ideas, tomando riesgos creativos al seleccionar temas, materiales, soportes y procedimientos.'},
      {codigo:'OA3', eje:'Expresar y crear', descripcion:'Crear obras y proyectos de ilustración, audiovisuales o multimediales a partir de la apreciación de distintos referentes artísticos y culturales.'},
      {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar e interpretar propósitos expresivos de obras visuales, audiovisuales y multimediales contemporáneas, a partir de criterios estéticos (lenguaje visual, materiales, procedimientos, emociones, sensaciones e ideas que genera, entre otros), utilizando conceptos disciplinarios.'},
      {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios estéticos acerca de obras visuales, audiovisuales y multimediales contemporáneas, considerando propósitos expresivos, criterios estéticos, elementos simbólicos y aspectos contextuales.'},
      {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de obras y proyectos visuales, audiovisuales y multimediales personales y de sus pares, considerando criterios estéticos y propósitos expresivos, y dando cuenta de una postura personal fundada y respetuosa.'},
      {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar colaborativamente proyectos de difusión de obras visuales, audiovisuales y multimediales propios, empleando diversidad de medios o TIC.'}
    ],
    '4M': [
      {codigo:'OA1', eje:'Expresar y crear', descripcion:'Experimentar con diversidad de soportes, procedimientos y materiales utilizados en la ilustración, las artes audiovisuales y multimediales.'},
      {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear obras y proyectos de ilustración, audiovisuales y multimediales, para expresar sensaciones, emociones e ideas, tomando riesgos creativos al seleccionar temas, materiales, soportes y procedimientos.'},
      {codigo:'OA3', eje:'Expresar y crear', descripcion:'Crear obras y proyectos de ilustración, audiovisuales o multimediales a partir de la apreciación de distintos referentes artísticos y culturales.'},
      {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar e interpretar propósitos expresivos de obras visuales, audiovisuales y multimediales contemporáneas, a partir de criterios estéticos (lenguaje visual, materiales, procedimientos, emociones, sensaciones e ideas que genera, entre otros), utilizando conceptos disciplinarios.'},
      {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios estéticos acerca de obras visuales, audiovisuales y multimediales contemporáneas, considerando propósitos expresivos, criterios estéticos, elementos simbólicos y aspectos contextuales.'},
      {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de obras y proyectos visuales, audiovisuales y multimediales personales y de sus pares, considerando criterios estéticos y propósitos expresivos, y dando cuenta de una postura personal fundada y respetuosa.'},
      {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar colaborativamente proyectos de difusión de obras visuales, audiovisuales y multimediales propios, empleando diversidad de medios o TIC.'}
    ]
  },
  // Actitudes — Básica (1B-8B, DS 2960/2012) y Media (1M-2M) comparten gran parte;
  // 3M-4M FG usa las actitudes del marco "Habilidades para el Siglo XXI".
  actitudes: [
    'Disfrutar de múltiples expresiones artísticas.',
    'Demostrar disposición a expresar artísticamente las propias ideas y sentimientos.',
    'Valorar y cuidar el patrimonio artístico de su comunidad, región, país y de la humanidad.',
    'Demostrar disposición a desarrollar su creatividad, experimentando, imaginando y pensando divergentemente.',
    'Demostrar disposición a trabajar en equipo, colaborar con otros y aceptar consejos y críticas.',
    'Respetar y valorar el trabajo riguroso y el esfuerzo propio y de otros.',
    'Respetar el trabajo artístico de otros, valorando la originalidad.',
    'Aportar a la sustentabilidad del medioambiente utilizando o reciclando de manera responsable materiales en sus trabajos y proyectos visuales.',
    'Compartir trabajos y proyectos visuales con su comunidad o en otros círculos.',
    'Buscar, evaluar y usar información disponible en diversos medios y fuentes.'
  ],
  habilidades: ['Expresar y crear visualmente','Apreciar y responder frente al arte','Difusión y comunicación']
};

// =============================================================================
//  ELECTIVO DE FORMACIÓN GENERAL — Artes Visuales, Audiovisuales y Multimediales
//  3°–4° medio (DS 193/2019). Programa de Estudio Mineduc 2021.
//  Los 7 OAs son idénticos para 3°M y 4°M; el profesor decide qué OAs trabaja
//  en cada unidad y nivel según el plan de la asignatura.
// =============================================================================

(function buildOasAVM() {
  var OAS_AVM = [
    {codigo:'OA1', eje:'Expresar y crear', descripcion:'Innovar al resolver desafíos y problemas de las artes visuales, audiovisuales y multimediales, considerando aspectos expresivos, estéticos y las evaluaciones críticas personal y de otros.'},
    {codigo:'OA2', eje:'Expresar y crear', descripcion:'Crear obras y proyectos que respondan a necesidades de expresión y comunicación personales o grupales, basados en la investigación con soportes, materiales y procedimientos, y en referentes artísticos nacionales e internacionales.'},
    {codigo:'OA3', eje:'Comunicar y difundir', descripcion:'Diseñar y gestionar presentaciones a públicos específicos para comunicar propósitos, aspectos del proceso y resultados de obras y trabajos, empleando materiales, herramientas y tecnologías tradicionales y emergentes.'},
    {codigo:'OA4', eje:'Apreciar y responder', descripcion:'Analizar estéticamente obras visuales, audiovisuales y multimediales de diferentes épocas y procedencias, relacionando tratamiento de los lenguajes artísticos, elementos simbólicos y contextos.'},
    {codigo:'OA5', eje:'Apreciar y responder', descripcion:'Argumentar juicios estéticos de obras visuales, audiovisuales y multimediales de diferentes épocas y procedencias, a partir de análisis estéticos e interpretaciones personales.'},
    {codigo:'OA6', eje:'Apreciar y responder', descripcion:'Evaluar críticamente procesos y resultados de obras y proyectos personales y de sus pares, considerando relaciones entre propósitos expresivos y/o comunicativos, aspectos estéticos y decisiones tomadas durante el proceso.'},
    {codigo:'OA7', eje:'Comunicar y difundir', descripcion:'Relacionar, a partir de investigaciones, las habilidades y conocimientos de la asignatura con diferentes contextos laborales, profesionales y de desarrollo personal.'}
  ];
  CURRICULA_PLAN_COMUN['artes-hc'] = {
    nombre: 'Artes Visuales, Audiovisuales y Multimediales',
    sigla:  'AVM',
    tramo:  'media',
    niveles: ['3M','4M'],
    unidades: {
      '3M': ['Investigando la memoria a través de las artes visuales','Obras audiovisuales y su relación con el contexto','Creando obras multimediales a partir de imaginarios personales','Compartiendo experiencias con las artes'],
      '4M': ['Investigando la memoria a través de las artes visuales','Obras audiovisuales y su relación con el contexto','Creando obras multimediales a partir de imaginarios personales','Compartiendo experiencias con las artes']
    },
    oas: { '3M': OAS_AVM, '4M': OAS_AVM },
    actitudes: [
      'Pensar con perseverancia y proactividad para encontrar soluciones innovadoras a los problemas.',
      'Demostrar disposición a desarrollar su creatividad, experimentando, imaginando y pensando divergentemente.',
      'Trabajar con autonomía y proactividad en trabajos personales y colaborativos para alcanzar las metas propuestas.',
      'Trabajar colaborativamente en la generación, desarrollo y gestión de proyectos y la resolución de problemas, integrando las diferentes ideas y puntos de vista.',
      'Pensar con flexibilidad para reelaborar las propias ideas, puntos de vista y creencias.',
      'Tomar decisiones que conduzcan a la creación, innovación y trasformación de las personas y de la sociedad.',
      'Trabajar con empatía y respeto en el contexto de la diversidad, eliminando toda expresión de prejuicio y discriminación.',
      'Valorar las TIC como una oportunidad para informarse, investigar, socializar, comunicarse y participar como ciudadano.',
      'Actuar de acuerdo con los principios de la ética en el uso de la información y de la tecnología, respetando la propiedad intelectual y la privacidad de las personas.',
      'Participar asumiendo posturas razonadas en distintos ámbitos: cultural, social, político, medioambiental, entre otros.'
    ],
    habilidades: ['Expresar y crear','Apreciar y responder','Comunicar y difundir']
  };
})();
