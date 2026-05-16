/**
 * curricula-chile.js  — Click&Clase
 * Generado automáticamente desde Programas de Estudio MINEDUC
 * Incluye: Básica 1°-8°, Media 1°-4° (Plan Común), Electivos y Especialidades TP
 *
 * LENGUAJE BÁSICA : 208 OAs (1°-8° básico)
 * MATEMÁTICA BÁSICA: 184 OAs (1°-8° básico)
 * LENGUAJE MEDIA   : 50 OAs (1°-4° medio)
 * MATEMÁTICA MEDIA : 36 OAs (1°-4° medio)
 * ORIENTACIÓN BÁSICA: 74 OAs (1°-8° básico) — D.S. 2960/2012 + BC 2013
 * ORIENTACIÓN MEDIA : 40 OAs (1°-4° medio) — BC Orientación Media
 */

var CURRICULA_CHILE = (function() {
  'use strict';

  // ════════════════════════════════════════════════════════════
  //  EDUCACIÓN BÁSICA — Asignaturas por nivel (1° a 8°)
  // ════════════════════════════════════════════════════════════
  var basica = {
    asignaturas: [
      {
        nombre: 'Lenguaje y Comunicación',
        sigla:  'LEN',
        color:  '#3b82f6',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ["Lectura", "Escritura", "Comunicación oral"],
          '2B': ["Lectura", "Escritura", "Comunicación oral"],
          '3B': ["Lectura", "Escritura", "Comunicación oral"],
          '4B': ["Lectura", "Escritura", "Comunicación oral"],
          '5B': ["Lectura", "Escritura", "Comunicación oral"],
          '6B': ["Lectura", "Escritura", "Comunicación oral"],
          '7B': ["Lectura", "Escritura", "Comunicación oral"],
          '8B': ["Lectura", "Escritura", "Comunicación oral"]
        },
        oas: {
          '1B': [
            {codigo:"OA1",eje:"Lectura",desc:"Reconocer que los textos Distinguen entre imagen y texto escrito"},
            {codigo:"OA2",eje:"Lectura",desc:"Reconocer que las palabras son Diferencian una palabra de una frase u oración"},
            {codigo:"OA3",eje:"Lectura",desc:"Con el texto de estudio, sino ser una"},
            {codigo:"OA4",eje:"Lectura",desc:"Leer palabras aisladas y en Nombran las letras estudiadas y reproducen su sonido"},
            {codigo:"OA5",eje:"Lectura",desc:"Leer textos breves en voz alta Leen con precisión palabras que incluyen las letras aprendi-"},
            {codigo:"OA6",eje:"Lectura",desc:"Comprender textos aplicando Mencionan un aspecto de sus vidas que se relaciona con el"},
            {codigo:"OA7",eje:"Lectura",desc:"Leer independientemente y Mencionan a personajes de las obras leídas"},
            {codigo:"OA8",eje:"Lectura",desc:"Demostrar comprensión de Contestan preguntas que aluden a información explícita del"},
            {codigo:"OA9",eje:"Lectura",desc:"Leer habitualmente y disfrutar Recrean versos de poemas a través de diferentes expresio-"},
            {codigo:"OA10",eje:"Lectura",desc:"Leer independientemente y Hacen un recuento de la información obtenida de textos"},
            {codigo:"OA11",eje:"Lectura",desc:"Desarrollar el gusto por la Sacan libros de la biblioteca de aula cuando han terminado"},
            {codigo:"OA12",eje:"Lectura",desc:"Asistir habitualmente a la bi- Visitan la biblioteca y seleccionan libros de su interés"},
            {codigo:"OA13",eje:"Lectura",desc:"Experimentar con la escritura Juegan a escribir"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir oraciones completas Escriben mensajes a otros"},
            {codigo:"OA15",eje:"Lectura",desc:"Escribir con letra clara, sepa- Escriben palabras, usando correctamente las letras aprendi-"},
            {codigo:"OA16",eje:"Lectura",desc:"Incorporar de manera pertinen- Realizan dibujos que expresan el significado de palabras"},
            {codigo:"OA17",eje:"Lectura",desc:"Comprender y disfrutar versio- Solicitan que les lean o relean un cuento"},
            {codigo:"OA18",eje:"Lectura",desc:"Comprender textos orales Relacionan lo que han aprendido en otras asignaturas con"},
            {codigo:"OA19",eje:"Lectura",desc:"Desarrollar la curiosidad por Identifican las palabras desconocidas al oírlas o leerlas"},
            {codigo:"OA20",eje:"Lectura",desc:"Disfrutar de la experiencia de Describen una parte de una obra de teatro o representación"},
            {codigo:"OA21",eje:"Lectura",desc:"Participar activamente en Relatan experiencias personales o expresan sentimientos"},
            {codigo:"OA22",eje:"Lectura",desc:"Interactuar de acuerdo con Se presentan, usando su nombre completo y entregando"},
            {codigo:"OA23",eje:"Lectura",desc:"Expresarse de manera coheren- Presentan información sobre un objeto o un tema"},
            {codigo:"OA24",eje:"Lectura",desc:"Incorporar de manera pertinen- Usan adecuadamente en sus intervenciones orales, las pala-"},
            {codigo:"OA25",eje:"Lectura",desc:"Desempeñar diferentes roles Representan partes de textos escuchados o leídos"},
            {codigo:"OA26",eje:"Lectura",desc:"Recitar con entonación y ex- Recitan poemas, rimas, canciones, trabalenguas y adivinanzas"}
          ],
          '2B': [
            {codigo:"OA1",eje:"Lectura",desc:"Leer textos significativos que Leen en voz alta, sin equivocarse, palabras con hiatos y dip-"},
            {codigo:"OA3",eje:"Lectura",desc:"Comprender textos aplicando Explican lo que saben de un tema antes de leer un texto"},
            {codigo:"OA4",eje:"Lectura",desc:"Leer independientemente y Mencionan personajes de las obras leídas"},
            {codigo:"OA5",eje:"Lectura",desc:"Demostrar comprensión de las Contestan preguntas que aluden a información explícita o"},
            {codigo:"OA7",eje:"Lectura",desc:"Leer independientemente y Explican, oralmente o por escrito, información que han"},
            {codigo:"OA11",eje:"Lectura",desc:"Desarrollar la curiosidad por Identifican qué palabras de un texto no conocen"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir artículos informativos Escriben un párrafo sobre un tema"},
            {codigo:"OA21",eje:"Lectura",desc:"Escribir correctamente para fa- Escriben correctamente palabras que contienen las combi-"},
            {codigo:"OA25",eje:"Lectura",desc:"Participar activamente en Aportan información que se relaciona con el tema sobre el"}
          ],
          '3B': [
            {codigo:"OA1",eje:"Lectura",desc:"Leer en voz alta de manera flui- Leen en voz alta"},
            {codigo:"OA2",eje:"Lectura",desc:"Comprender textos aplicando Explican lo que saben de un tema antes de leer un texto"},
            {codigo:"OA3",eje:"Lectura",desc:"Con el texto de estudio, sino ser una"},
            {codigo:"OA4",eje:"Lectura",desc:"Profundizar su comprensión de Aluden, en sus comentarios orales y escritos, a información"},
            {codigo:"OA5",eje:"Lectura",desc:"Comprender poemas adecua- Dibujan imágenes de poemas que les gusten"},
            {codigo:"OA6",eje:"Lectura",desc:"Leer independientemente y Explican, oralmente o por escrito, información que han"},
            {codigo:"OA7",eje:"Lectura",desc:"Desarrollar el gusto por la Escogen textos en el aula, la biblioteca o internet para inves-"},
            {codigo:"OA8",eje:"Lectura",desc:"Asistir habitualmente a la Visitan la biblioteca frecuentemente para buscar informa-"},
            {codigo:"OA9",eje:"Lectura",desc:"En libros, internet, diarios, revistas, satisfacer un propósito y transmitir"},
            {codigo:"OA10",eje:"Lectura",desc:"Desconocidas, usando claves contex- utilizan conectores apropiados"},
            {codigo:"OA11",eje:"Lectura",desc:"Desconocidas, usando el orden alfabé- corrigen la ortografía y la presentación"},
            {codigo:"OA12",eje:"Lectura",desc:"Escribir frecuentemente, para Escriben al menos una vez a la semana un texto con un"},
            {codigo:"OA13",eje:"Lectura",desc:"Escribir creativamente narra- Escriben uno o más párrafos para narrar una experiencia o"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir artículos informativos Eligen un tema interesante para escribir"},
            {codigo:"OA15",eje:"Lectura",desc:"Escribir cartas, instrucciones, Eligen un formato adecuado a su propósito"},
            {codigo:"OA16",eje:"Lectura",desc:"Escribir con letra clara para que Escriben con letra ligada o imprenta, sin mezclar estilos"},
            {codigo:"OA17",eje:"Lectura",desc:"Planificar la escritura: Conversan sobre lo que van a escribir"},
            {codigo:"OA18",eje:"Lectura",desc:"Escribir, revisar y editar sus tex- Desarrollan ideas que tienen relación con el tema"},
            {codigo:"OA19",eje:"Lectura",desc:"Incorporar de manera pertinen- Usan adecuadamente en la escritura de textos, las palabras"},
            {codigo:"OA20",eje:"Lectura",desc:"Comprender la función de los Seleccionan el artículo que concuerda con un sustantivo en"},
            {codigo:"OA21",eje:"Lectura",desc:"Comprender la función de los Reemplazan en textos algunos sustantivos por pronombres"},
            {codigo:"OA22",eje:"Lectura",desc:"Escribir correctamente para fa- Escriben textos en los que utilizan mayúscula al iniciar una"},
            {codigo:"OA23",eje:"Lectura",desc:"Comprender y disfrutar versio- Solicitan que les lean o relean un cuento"},
            {codigo:"OA24",eje:"Lectura",desc:"Comprender textos orales Relacionan algún tema o aspecto del texto con sus expe-"},
            {codigo:"OA25",eje:"Lectura",desc:"Disfrutar de la experiencia de Relatan una parte de la obra de teatro vista"},
            {codigo:"OA26",eje:"Lectura",desc:"Participar activamente en Aportan información que se relaciona con el tema sobre el"},
            {codigo:"OA27",eje:"Lectura",desc:"Interactuar de acuerdo con Se presentan a sí mismos o a la persona con la que están"},
            {codigo:"OA28",eje:"Lectura",desc:"Expresarse de manera coheren- Exponen sobre un tema"},
            {codigo:"OA29",eje:"Lectura",desc:"Incorporar de manera pertinen- Usan adecuadamente en sus intervenciones orales las pala-"},
            {codigo:"OA30",eje:"Lectura",desc:"Caracterizar distintos persona- Representan un personaje de un texto leído, actuando sus"},
            {codigo:"OA31",eje:"Lectura",desc:"Recitar poemas con entona- Recitan poemas o versos de memoria"}
          ],
          '4B': [
            {codigo:"OA1",eje:"Lectura",desc:"Leer en voz alta de manera flui- Leen en voz alta"},
            {codigo:"OA2",eje:"Lectura",desc:"Comprender textos aplicando Identifican en el texto la información que ya conocían y"},
            {codigo:"OA3",eje:"Lectura",desc:"Con el texto de estudio, sino ser una"},
            {codigo:"OA4",eje:"Lectura",desc:"Profundizar su comprensión de Aluden, en sus comentarios orales y escritos, a información"},
            {codigo:"OA5",eje:"Lectura",desc:"Comprender poemas adecua- Dibujan imágenes de poemas que les gusten"},
            {codigo:"OA6",eje:"Lectura",desc:"Leer independientemente y Relacionan información del texto con sus experiencias y"},
            {codigo:"OA7",eje:"Lectura",desc:"Desarrollar el gusto por la Leen libros para entretenerse, para encontrar información"},
            {codigo:"OA8",eje:"Lectura",desc:"Asistir habitualmente a la Asisten de manera independiente a la biblioteca para leer"},
            {codigo:"OA9",eje:"Lectura",desc:"Buscar y clasificar información Encuentran información sobre un tema en una fuente"},
            {codigo:"OA10",eje:"Lectura",desc:"Aplicar estrategias para deter- Subrayan o anotan las palabras desconocidas que encuen-"},
            {codigo:"OA11",eje:"Lectura",desc:"Escribir frecuentemente, para Escriben al menos una vez a la semana un texto con un"},
            {codigo:"OA12",eje:"Lectura",desc:"Escribir creativamente narra- Eligen un tema que les interese para escribir un cuento o"},
            {codigo:"OA13",eje:"Lectura",desc:"Escribir artículos informativos Eligen un tema interesante para escribir"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir cartas, instrucciones, Eligen un formato adecuado a su propósito"},
            {codigo:"OA15",eje:"Lectura",desc:"Escribir con letra clara para que Escriben con letra ligada o imprenta, sin mezclar estilos"},
            {codigo:"OA16",eje:"Lectura",desc:"Planificar la escritura: Explican sobre qué van a escribir"},
            {codigo:"OA17",eje:"Lectura",desc:"Escribir, revisar y editar sus tex- Escriben hechos que se relacionan unos con otros y siguen"},
            {codigo:"OA18",eje:"Lectura",desc:"Incorporar de manera pertinen- Incorporan adecuadamente en sus escritos las palabras que"},
            {codigo:"OA19",eje:"Lectura",desc:"Comprender la función de los Explican qué información aporta el adverbio en una oración"},
            {codigo:"OA20",eje:"Lectura",desc:"Comprender la función de los Identifican qué palabra de una oración indica la acción"},
            {codigo:"OA21",eje:"Lectura",desc:"Escribir correctamente para Escriben correctamente en sus textos las palabras hay, ahí o"},
            {codigo:"OA22",eje:"Lectura",desc:"Comprender y disfrutar versio- Solicitan que les lean o relean un cuento"},
            {codigo:"OA23",eje:"Lectura",desc:"Comprender textos orales Comparan lo escuchado con sus propias experiencias y cono-"},
            {codigo:"OA24",eje:"Lectura",desc:"Disfrutar de la experiencia de Comentan qué aspectos de la historia les llamaron la atención"},
            {codigo:"OA25",eje:"Lectura",desc:"Participar activamente en conver- Comentan aspectos de los textos leídos o escuchados en"},
            {codigo:"OA26",eje:"Lectura",desc:"Interactuar de acuerdo con Se presentan a sí mismos o a la persona con la que están"},
            {codigo:"OA27",eje:"Lectura",desc:"Expresarse de manera coheren- Realizan una exposición oral en que"},
            {codigo:"OA28",eje:"Lectura",desc:"Incorporar de manera pertinen- Usan adecuadamente en sus intervenciones orales las pala-"},
            {codigo:"OA29",eje:"Lectura",desc:"Caracterizar distintos personajes Representan roles en obras teatrales"},
            {codigo:"OA30",eje:"Lectura",desc:"Recitar poemas con entona- Recitan estrofas o poemas completos de memoria"}
          ],
          '5B': [
            {codigo:"OA1",eje:"Lectura",desc:"Leer de manera fluida textos Leen en voz alta, de forma individual y colectiva"},
            {codigo:"OA2",eje:"Lectura",desc:"Comprender textos aplicando Mencionan si hay información que no concuerda con sus"},
            {codigo:"OA3",eje:"Lectura",desc:"Con el texto de estudio, sino ser una"},
            {codigo:"OA4",eje:"Lectura",desc:"Analizar aspectos relevantes de Explican, oralmente o por escrito, expresiones de un texto"},
            {codigo:"OA5",eje:"Lectura",desc:"Analizar aspectos relevantes de Explican con sus palabras un poema leído"},
            {codigo:"OA6",eje:"Lectura",desc:"Leer independientemente y Relacionan información del texto con sus experiencias y"},
            {codigo:"OA7",eje:"Lectura",desc:"Evaluar críticamente la infor- Identifican al autor y explican cuál es su intención al publicar"},
            {codigo:"OA8",eje:"Lectura",desc:"Sintetizar y registrar las ideas Subrayan o registran la información relevante en un texto"},
            {codigo:"OA9",eje:"Lectura",desc:"Desarrollar el gusto por la Leen libros para entretenerse, para encontrar información o"},
            {codigo:"OA10",eje:"Lectura",desc:"Asistir habitualmente a la Asisten de manera independiente a la biblioteca para leer"},
            {codigo:"OA11",eje:"Lectura",desc:"Buscar y seleccionar la infor- Explican el orden en el cual están dispuestos los libros en la"},
            {codigo:"OA12",eje:"Lectura",desc:"Aplicar estrategias para deter- Subrayan o anotan las palabras desconocidas que encuen-"},
            {codigo:"OA13",eje:"Lectura",desc:"Escribir frecuentemente, para Escriben, al menos una vez a la semana, un texto con el"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir creativamente narra- Escriben un texto narrativo en que"},
            {codigo:"OA15",eje:"Lectura",desc:"Escribir artículos informativos Eligen un tema interesante sobre las lecturas realizadas en"},
            {codigo:"OA16",eje:"Lectura",desc:"Escribir frecuentemente para Escriben comentarios de al menos dos párrafos en los que"},
            {codigo:"OA17",eje:"Lectura",desc:"Planificar sus textos: Escogen un tema para escribir que se relaciona con un texto"},
            {codigo:"OA18",eje:"Lectura",desc:"Escribir, revisar y editar sus tex- Desarrollan ideas que son relevantes para el tema"},
            {codigo:"OA19",eje:"Lectura",desc:"Escritura el vocabulario nuevo extraído OA 25Apreciar obras de teatro, películas o"},
            {codigo:"OA20",eje:"Lectura",desc:"Leer, hablar y escribir para ampliar su describiendo a los personajes según"},
            {codigo:"OA21",eje:"Lectura",desc:"Regulares al utilizarlos en sus produc- OA 26Dialogar para compartir y desarrollar"},
            {codigo:"OA22",eje:"Lectura",desc:"Comprensión por parte del lector, apli- haciendo comentarios en los mo-"},
            {codigo:"OA23",eje:"Lectura",desc:"Comprender y disfrutar versio- Solicitan que les lean o relean un cuento"},
            {codigo:"OA24",eje:"Lectura",desc:"Comprender textos orales Relacionan, cuando es pertinente, los textos escuchados con"},
            {codigo:"OA25",eje:"Lectura",desc:"Apreciar obras de teatro, pelícu- Comentan qué aspectos de la historia les llamaron la aten-"},
            {codigo:"OA26",eje:"Lectura",desc:"Dialogar para compartir y desa- Comparten sus opiniones sobre los textos leídos o escucha-"},
            {codigo:"OA27",eje:"Lectura",desc:"Interactuar de acuerdo con Usan las convenciones de cortesía en sus interacciones de la"},
            {codigo:"OA28",eje:"Lectura",desc:"Expresarse de manera clara y Realizan una exposición oral en la que"},
            {codigo:"OA29",eje:"Lectura",desc:"Incorporar de manera pertinen- Usan adecuadamente en sus intervenciones orales las pala-"},
            {codigo:"OA30",eje:"Lectura",desc:"Producir textos orales planifica- Recitan poemas o versos de memoria"}
          ],
          '6B': [
            {codigo:"OA1",eje:"Lectura",desc:"Leer de manera fluida textos Leen en voz alta"},
            {codigo:"OA2",eje:"Lectura",desc:"Comprender textos aplicando Identifican la información del texto que es nueva para ellos y"},
            {codigo:"OA3",eje:"Lectura",desc:"Con el texto de estudio, sino ser una"},
            {codigo:"OA4",eje:"Lectura",desc:"Analizar aspectos relevantes Explican qué efecto tiene determinada acción en los eventos"},
            {codigo:"OA5",eje:"Lectura",desc:"Analizar aspectos relevantes de Explican con sus palabras un poema leído"},
            {codigo:"OA6",eje:"Lectura",desc:"Leer independientemente y Identifican y registran las ideas relevantes de un texto leído"},
            {codigo:"OA7",eje:"Lectura",desc:"Evaluar críticamente la infor- Identifican al autor y explican cuál es su intención al publicar"},
            {codigo:"OA8",eje:"Lectura",desc:"Sintetizar, registrar y ordenar Subrayan o registran la información relevante de un texto"},
            {codigo:"OA9",eje:"Lectura",desc:"Desarrollar el gusto por la Leen libros para entretenerse, para encontrar información"},
            {codigo:"OA10",eje:"Lectura",desc:"Asistir habitualmente a la Asisten de manera independiente a la biblioteca para leer"},
            {codigo:"OA11",eje:"Lectura",desc:"Buscar y comparar informa- Encuentran en internet información sobre el tema que"},
            {codigo:"OA12",eje:"Lectura",desc:"Aplicar estrategias para deter- Subrayan o anotan las palabras desconocidas que encuen-"},
            {codigo:"OA13",eje:"Lectura",desc:"Escribir frecuentemente, para Escriben un texto al menos una vez a la semana, seleccio-"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir creativamente narra- Escriben un cuento en que"},
            {codigo:"OA15",eje:"Lectura",desc:"Escribir artículos informativos Eligen un tema interesante para escribir y registran informa-"},
            {codigo:"OA16",eje:"Lectura",desc:"Escribir frecuentemente para Escriben comentarios de al menos dos párrafos en los que"},
            {codigo:"OA17",eje:"Lectura",desc:"Planificar sus textos: Escogen un tema para escribir que se relaciona con un texto"},
            {codigo:"OA18",eje:"Lectura",desc:"Escribir, revisar y editar sus tex- Desarrollan ideas que son relevantes para el tema"},
            {codigo:"OA19",eje:"Lectura",desc:"Incorporar de manera pertinen- Incorporan adecuadamente en sus escritos las palabras que"},
            {codigo:"OA20",eje:"Lectura",desc:"Ampliar su capacidad expresi- Reemplazan palabras por sinónimos, hipónimos e hiperóni-"},
            {codigo:"OA21",eje:"Lectura",desc:"Utilizar correctamente los parti- Escriben textos en los que utilizan correctamente los partici-"},
            {codigo:"OA22",eje:"Lectura",desc:"Escribir correctamente para Escriben correctamente las conjugaciones de los verbos"},
            {codigo:"OA23",eje:"Lectura",desc:"Comprender y disfrutar versio- Solicitan que les lean o relean un cuento"},
            {codigo:"OA24",eje:"Lectura",desc:"Comprender textos orales (ex- Comparan lo escuchado con sus propias opiniones y conoci-"},
            {codigo:"OA25",eje:"Lectura",desc:"Evaluar críticamente mensajes Señalan quién es el emisor (empresa o institución anuncian-"},
            {codigo:"OA26",eje:"Lectura",desc:"Apreciar obras de teatro, pelí- Comentan qué aspectos de la historia les llamaron la aten-"},
            {codigo:"OA27",eje:"Lectura",desc:"Dialogar para compartir y desa- Comparten sus opiniones sobre los textos leídos o escucha-"},
            {codigo:"OA28",eje:"Lectura",desc:"Interactuar de acuerdo con las Usan las convenciones de cortesía en sus interacciones de la"},
            {codigo:"OA29",eje:"Lectura",desc:"Expresarse de manera clara y Realizan una exposición oral en la que"},
            {codigo:"OA30",eje:"Lectura",desc:"Incorporar de manera pertinen- Usan adecuadamente en sus intervenciones orales las pala-"},
            {codigo:"OA31",eje:"Lectura",desc:"Producir textos orales espontá- Narran un hecho, estructurando el relato en un orden que se"}
          ],
          '7B': [
            {codigo:"OA1",eje:"Lectura",desc:"Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con"},
            {codigo:"OA2",eje:"Lectura",desc:"Reflexionar sobre las diferentes dimensiones de la experiencia humana, propia y"},
            {codigo:"OA3",eje:"Lectura",desc:"En las Bases Curriculares"},
            {codigo:"OA4",eje:"Lectura",desc:"Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando"},
            {codigo:"OA5",eje:"Lectura",desc:"Leer y comprender romances y obras de la poesía popular, considerando sus"},
            {codigo:"OA6",eje:"Lectura",desc:"Leer y comprender relatos mitológicos, considerando sus características y el contexto"},
            {codigo:"OA7",eje:"Lectura",desc:"Formular una interpretación de los textos literarios, considerando…"},
            {codigo:"OA8",eje:"Lectura",desc:"Analizar y evaluar textos con finalidad argumentativa como columnas de opinión"},
            {codigo:"OA9",eje:"Lectura",desc:"Analizar y evaluar textos de los medios de comunicación, como noticias, reportajes"},
            {codigo:"OA10",eje:"Lectura",desc:"Leer y comprender textos no literarios para contextualizar y complementar las"},
            {codigo:"OA11",eje:"Lectura",desc:"Aplicar estrategias de comprensión de acuerdo con sus propósitos de lectura"},
            {codigo:"OA12",eje:"Lectura",desc:"Expresarse en forma creativa por medio de la escritura de textos de diversos géneros"},
            {codigo:"OA13",eje:"Lectura",desc:"Escribir, con el propósito de explicar un tema, textos de diversos géneros (por"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir, con el propósito de persuadir, textos breves de diversos géneros (por"},
            {codigo:"OA15",eje:"Lectura",desc:"Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto"},
            {codigo:"OA16",eje:"Lectura",desc:"Aplicar los conceptos de oración, sujeto y predicado con el fin de revisar y mejorar"},
            {codigo:"OA17",eje:"Lectura",desc:"Usar en sus textos recursos de correferencia léxica…"},
            {codigo:"OA18",eje:"Lectura",desc:"Utilizar adecuadamente, al narrar, los tiempos verbales del indicativo, manteniendo"},
            {codigo:"OA19",eje:"Lectura",desc:"Escribir correctamente para facilitar la comprensión al lector…"},
            {codigo:"OA20",eje:"Lectura",desc:"Comprender, comparar y evaluar textos orales y audiovisuales tales como exposiciones"},
            {codigo:"OA21",eje:"Lectura",desc:"Dialogar constructivamente para debatir o explorar ideas…"},
            {codigo:"OA22",eje:"Lectura",desc:"Expresarse frente a una audiencia de manera clara y adecuada a la situación, para"},
            {codigo:"OA23",eje:"Lectura",desc:"Usar conscientemente los elementos que influyen y configuran los textos orales…"},
            {codigo:"OA24",eje:"Lectura",desc:"Realizar investigaciones sobre diversos temas para complementar sus lecturas o"},
            {codigo:"OA25",eje:"Lectura",desc:"Sintetizar, registrar y ordenar las ideas principales de textos escuchados o leídos para"}
          ],
          '8B': [
            {codigo:"OA1",eje:"Lectura",desc:"Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con"},
            {codigo:"OA2",eje:"Lectura",desc:"Son los OA especificados"},
            {codigo:"OA3",eje:"Lectura",desc:"Analizar las narraciones leídas para enriquecer su comprensión, considerando"},
            {codigo:"OA4",eje:"Lectura",desc:"Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando"},
            {codigo:"OA5",eje:"Lectura",desc:"Analizar los textos dramáticos leídos o vistos, para enriquecer su comprensión"},
            {codigo:"OA6",eje:"Lectura",desc:"Leer y comprender fragmentos de epopeyas, considerando sus características y el"},
            {codigo:"OA7",eje:"Lectura",desc:"Leer y comprender comedias teatrales, considerando sus características y el contexto"},
            {codigo:"OA8",eje:"Lectura",desc:"Formular una interpretación de los textos literarios leídos o vistos, que sea coherente"},
            {codigo:"OA9",eje:"Lectura",desc:"Analizar y evaluar textos con finalidad argumentativa, como columnas de opinión"},
            {codigo:"OA10",eje:"Lectura",desc:"Analizar y evaluar textos de los medios de comunicación, como noticias, reportajes"},
            {codigo:"OA11",eje:"Lectura",desc:"Leer y comprender textos no literarios para contextualizar y complementar las"},
            {codigo:"OA12",eje:"Lectura",desc:"Aplicar estrategias de comprensión de acuerdo con sus propósitos de lectura"},
            {codigo:"OA13",eje:"Lectura",desc:"Expresarse en forma creativa por medio de la escritura de textos de diversos géneros"},
            {codigo:"OA14",eje:"Lectura",desc:"Escribir, con el propósito de explicar un tema, textos de diversos géneros (por"},
            {codigo:"OA15",eje:"Lectura",desc:"Escribir, con el propósito de persuadir, textos breves de diversos géneros (por"},
            {codigo:"OA16",eje:"Lectura",desc:"Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto"},
            {codigo:"OA17",eje:"Lectura",desc:"Usar adecuadamente oraciones complejas…"},
            {codigo:"OA18",eje:"Lectura",desc:"Construir textos con referencias claras…"},
            {codigo:"OA19",eje:"Lectura",desc:"Conocer los modos verbales, analizar sus usos y seleccionar el más apropiado para"},
            {codigo:"OA20",eje:"Lectura",desc:"Escribir correctamente para facilitar la comprensión al lector"},
            {codigo:"OA21",eje:"Lectura",desc:"Comprender, comparar y evaluar textos orales y audiovisuales tales como exposiciones"},
            {codigo:"OA22",eje:"Lectura",desc:"Dialogar constructivamente para debatir o explorar ideas…"},
            {codigo:"OA23",eje:"Lectura",desc:"Expresarse frente a una audiencia de manera clara y adecuada a la situación para"},
            {codigo:"OA24",eje:"Lectura",desc:"Usar conscientemente los elementos que influyen y configuran los textos orales…"},
            {codigo:"OA25",eje:"Lectura",desc:"Realizar investigaciones sobre diversos temas para complementar sus lecturas o"},
            {codigo:"OA26",eje:"Lectura",desc:"Sintetizar, registrar y ordenar las ideas principales de textos escuchados o leídos para"}
          ]
        }
      },
      {
        nombre: 'Matemática',
        sigla:  'MAT',
        color:  '#10b981',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ["Números y Operaciones", "Geometría", "Datos y Probabilidades", "Medición"],
          '2B': ["Números y Operaciones", "Geometría", "Datos y Probabilidades", "Medición"],
          '3B': ["Números y Operaciones", "Geometría", "Datos y Probabilidades", "Medición"],
          '4B': ["Números y Operaciones", "Geometría", "Datos y Probabilidades", "Medición"],
          '5B': ["Números y Operaciones", "Geometría", "Datos y Probabilidades", "Medición"],
          '6B': ["Números y Operaciones", "Geometría", "Datos y Probabilidades", "Medición"],
          '7B': ["Números y Operaciones", "Álgebra y Funciones", "Geometría", "Probabilidad y Estadística", "Medición"],
          '8B': ["Números y Operaciones", "Álgebra y Funciones", "Geometría", "Probabilidad y Estadística", "Medición"]
        },
        oas: {
          '1B': [
            {codigo:"OA 1",eje:"",desc:"Representar y describir números del 0 al 10 000"},
            {codigo:"OA 2",eje:"",desc:"Describir y aplicar estrategias de cálculo mental"},
            {codigo:"OA 3",eje:"",desc:"Leer números del 0 al 20 y representarlos en forma concreta, pictórica y simbólica"},
            {codigo:"OA 4",eje:"",desc:"Comparar y ordenar números del 0 al 20 de menor a mayor y/o viceversa, utilizando material concreto"},
            {codigo:"OA 5",eje:"",desc:"Estimar cantidades hasta 20 en situaciones concretas, usando un referente"},
            {codigo:"OA 6",eje:"",desc:"Componer y descomponer números del 0 a 20 de manera aditiva, en forma concreta, pictórica y simbólic"},
            {codigo:"OA 7",eje:"",desc:"Describir y aplicar estrategias1 de cálculo mental para las adiciones y sustracciones hasta 20"},
            {codigo:"OA 8",eje:"",desc:"Determinar las unidades y decenas en números del 0 al 20, agrupando de a 10, de manera concreta, pic"},
            {codigo:"OA 9",eje:"",desc:"Demostrar que comprenden la adición y la sustracción de números del 0 al 20 progresivamente, de 0 a"},
            {codigo:"OA 10",eje:"",desc:"Demostrar que la adición y la sustracción son operaciones inversas, de manera concreta"},
            {codigo:"OA 11",eje:"",desc:"Reconocer, describir, crear y continuar patrones repetitivos (sonidos, figuras, ritmos…) y patrones"},
            {codigo:"OA 12",eje:"",desc:"Identificar en el entorno figuras 3D y figuras 2D y relacionarlas, usando material concreto"},
            {codigo:"OA 13",eje:"",desc:"Describir la posición de objetos y personas con relación a sí mismos y a otros objetos y personas, u"},
            {codigo:"OA 14",eje:"",desc:"Identificar en el entorno figuras 3D y figuras 2D y relacionarlas, usando material concreto"},
            {codigo:"OA 15",eje:"",desc:"Identificar y dibujar líneas rectas y curvas"},
            {codigo:"OA 16",eje:"",desc:"Usar unidades no estandarizadas de tiempo para comparar la duración de eventos cotidianos"},
            {codigo:"OA 17",eje:"",desc:"Usar un lenguaje cotidiano para secuenciar eventos en el tiempo: días de la semana"},
            {codigo:"OA 18",eje:"",desc:"Identificar y comparar la longitud de objetos, usando palabras como largo y corto"},
            {codigo:"OA 19",eje:"",desc:"Recolectar y registrar datos para responder preguntas estadísticas sobre sí mismo y el entorno, usan"},
            {codigo:"OA 20",eje:"",desc:"Construir, leer e interpretar pictogramas"}
          ],
          '2B': [
            {codigo:"OA 1",eje:"",desc:"Representar y describir números del 0 al 10 000"},
            {codigo:"OA 2",eje:"",desc:"Describir y aplicar estrategias de cálculo mental"},
            {codigo:"OA 3",eje:"",desc:"Comparar y ordenar números del 0 al 100 de menor a mayor y viceversa, usando material concreto y mon"},
            {codigo:"OA 4",eje:"",desc:"Estimar cantidades hasta 100 en situaciones concretas, usando un referente"},
            {codigo:"OA 5",eje:"",desc:"Estimar cantidades hasta 20 en situaciones concretas, usando un referente"},
            {codigo:"OA 6",eje:"",desc:"Describir y aplicar estrategias1 de cálculo mental para adiciones y sustracciones hasta 20"},
            {codigo:"OA 7",eje:"",desc:"Identificar las unidades y decenas en números del 0 al 100, representando las cantidades de acuerdo"},
            {codigo:"OA 8",eje:"",desc:"Demostrar y explicar de manera concreta, pictórica y simbólica el efecto de sumar y restar 0 a un nú"},
            {codigo:"OA 9",eje:"",desc:"Demostrar que comprende la adición y la sustracción en el ámbito del 0 al 100"},
            {codigo:"OA 10",eje:"",desc:"Demostrar que comprende la relación entre la adición y la sustracción al usar la “familia"},
            {codigo:"OA 11",eje:"",desc:"PATRONES Y ÁLGEBRA"},
            {codigo:"OA 12",eje:"",desc:"Crear, representar y continuar una variedad de patrones numéricos y completar los elementos faltante"},
            {codigo:"OA 13",eje:"",desc:"Demostrar, explicar y registrar la igualdad y desigualdad en forma concreta y pictórica del 0 al 20"},
            {codigo:"OA 14",eje:"",desc:"Representar y describir la posición de objetos y personas con relación a sí mismo y a otros (objetos"},
            {codigo:"OA 15",eje:"",desc:"Describir, comparar y construir figuras 2D (triángulos, cuadrados, rectángulos y círculos) con mater"},
            {codigo:"OA 16",eje:"",desc:"Describir, comparar y construir figuras 3D (cubos, paralelepípedos, esferas y conos) con diversos ma"},
            {codigo:"OA 17",eje:"",desc:"Identificar días, semanas, meses y fechas en el calendario"},
            {codigo:"OA 18",eje:"",desc:"Leer horas y medias horas en relojes digitales ,en el contexto de la resolución de problemas"},
            {codigo:"OA 19",eje:"",desc:"Determinar la longitud de objetos, usando unidades de medidas no estandarizadas y unidades estandari"},
            {codigo:"OA 20",eje:"",desc:"Recolectar y registrar datos para responder preguntas estadísticas sobre juegos con monedas y dados"},
            {codigo:"OA 21",eje:"",desc:"Registrar en tablas y gráficos de barra simple, resultados de juegos aleatorios con dados y"},
            {codigo:"OA 22",eje:"",desc:"Construir, leer e interpretar pictogramas con escala y gráficos de barra simple"}
          ],
          '3B': [
            {codigo:"OA 1",eje:"",desc:"Representar y describir números del 0 al 10 000"},
            {codigo:"OA 2",eje:"",desc:"Describir y aplicar estrategias de cálculo mental"},
            {codigo:"OA 3",eje:"",desc:"Comparar y ordenar números naturales hasta 1 000, utilizando la recta numérica o la tabla posicional"},
            {codigo:"OA 4",eje:"",desc:"Describir y aplicar estrategias1 de cálculo mental para las adiciones y sustracciones hasta 100"},
            {codigo:"OA 5",eje:"",desc:"Identificar y describir las unidades, decenas y centenas en números del 0 al 1 000, representando la"},
            {codigo:"OA 6",eje:"",desc:"Demostrar que comprenden la adición y la sustracción de números del 0 al 1 000"},
            {codigo:"OA 7",eje:"",desc:"Demostrar que comprenden la relación entre la adición y la sustracción, usando la “familia de operac"},
            {codigo:"OA 8",eje:"",desc:"Demostrar que comprenden las tablas de multiplicar hasta 10 de manera progresiva"},
            {codigo:"OA 08",eje:"",desc:"Demostrar que comprenden las tablas de multiplicar de 3, 6, 4 y 8 de manera progresiva"},
            {codigo:"OA 9",eje:"",desc:"Demostrar que comprenden la división en el contexto de las tablas3 de hasta 10x10"},
            {codigo:"OA 09",eje:"",desc:"Demostrar que comprenden la división en el contexto de las tablas de 3, 6, 4 y 8"},
            {codigo:"OA 10",eje:"",desc:"Resolver problemas rutinarios en contextos cotidianos, que incluyan dinero e involucren las"},
            {codigo:"OA 11",eje:"",desc:"Demostrar que comprenden las fracciones de uso común: 1/4, 1/3, 1/2, 2/3, 3/4"},
            {codigo:"OA 12",eje:"",desc:"Generar, describir y registrar patrones numéricos, usando una variedad de estrategias"},
            {codigo:"OA 13",eje:"",desc:"Resolver ecuaciones de un paso, que involucren adiciones y sustracciones y un símbolo"},
            {codigo:"OA 14",eje:"",desc:"Describir la localización de un objeto en un mapa simple o cuadrícula"},
            {codigo:"OA 15",eje:"",desc:"Demostrar que comprenden la relación que existe entre figuras 3D y figuras 2D"},
            {codigo:"OA 16",eje:"",desc:"Describir cubos, paralelepípedos, esferas, conos, cilindros y pirámides de acuerdo a la forma de sus"},
            {codigo:"OA 17",eje:"",desc:"Reconocer en el entorno figuras 2D que están trasladadas, reflejadas y rotadas"},
            {codigo:"OA 18",eje:"",desc:"Demostrar que comprenden el concepto de ángulo"},
            {codigo:"OA 19",eje:"",desc:"Leer e interpretar líneas de tiempo y calendarios"},
            {codigo:"OA 20",eje:"",desc:"Leer y registrar el tiempo en horas, medias horas, cuartos de horas y minutos en relojes"},
            {codigo:"OA 21",eje:"",desc:"Demostrar que comprenden el perímetro de una figura regular y de una irregular"},
            {codigo:"OA 22",eje:"",desc:"Demostrar que comprenden la medición del peso (g y kg)"},
            {codigo:"OA 23",eje:"",desc:"Realizar encuestas, clasificar y organizar los datos obtenidos en tablas y visualizarlos en gráficos"},
            {codigo:"OA 24",eje:"",desc:"Registrar y ordenar datos obtenidos de juegos aleatorios con dados y monedas, encontrando el menor"},
            {codigo:"OA 25",eje:"",desc:"Construir, leer e interpretar pictogramas y gráficos de barra simple con escala, de acuerdo a"},
            {codigo:"OA 26",eje:"",desc:"Representar datos, usando diagramas de puntos"}
          ],
          '4B': [
            {codigo:"OA 1",eje:"",desc:"Representar y describir números del 0 al 10 000"},
            {codigo:"OA 2",eje:"",desc:"Describir y aplicar estrategias de cálculo mental"},
            {codigo:"OA 3",eje:"",desc:"Demostrar que comprende la adición y la sustracción de números hasta 1 000"},
            {codigo:"OA 4",eje:"",desc:"Representar y describir números del 0 al 10 000"},
            {codigo:"OA 5",eje:"",desc:"Demostrar que comprenden la multiplicación de números de tres dígitos por números de un dígito"},
            {codigo:"OA 6",eje:"",desc:"Demostrar que comprenden la división con dividendos de dos dígitos y divisores de un dígito"},
            {codigo:"OA 7",eje:"",desc:"Resolver problemas rutinarios y no rutinarios en contextos cotidianos que incluyen dinero, seleccion"},
            {codigo:"OA 8",eje:"",desc:"Demostrar que comprende las fracciones con denominadores 100, 12, 10, 8, 6, 5, 4, 3, 2"},
            {codigo:"OA 9",eje:"",desc:"OA 17 Demostrar que comprenden una línea"},
            {codigo:"OA 10",eje:"",desc:"Identificar, escribir y representar fracciones propias y los números mixtos hasta el 5"},
            {codigo:"OA 11",eje:"",desc:"De simetría"},
            {codigo:"OA 12",eje:"",desc:"Resolver adiciones y sustracciones de decimales, empleando el valor posicional"},
            {codigo:"OA 13",eje:"",desc:"Identificar y describir patrones numéricos en tablas que involucren una operación, de"},
            {codigo:"OA 14",eje:"",desc:"Resolver ecuaciones e inecuaciones de un paso, que involucren adiciones y"},
            {codigo:"OA 15",eje:"",desc:"Describir la localización absoluta de un objeto en un mapa simple con coordenadas informales (por ej"},
            {codigo:"OA 16",eje:"",desc:"Determinar las vistas de figuras 3D, desde el frente, desde el lado y desde arriba"},
            {codigo:"OA 17",eje:"",desc:"Demostrar que comprende una línea de simetría"},
            {codigo:"OA 18",eje:"",desc:"Trasladar, rotar y reflejar figuras 2D"},
            {codigo:"OA 19",eje:"",desc:"Construir ángulos con el transportador y compararlos"},
            {codigo:"OA 20",eje:"",desc:"Leer y registrar diversas mediciones del tiempo en relojes análogos y digitales, usando los concepto"},
            {codigo:"OA 21",eje:"",desc:"Realizar conversiones entre unidades de tiempo en el contexto de la resolución de problemas: el núme"},
            {codigo:"OA 22",eje:"",desc:"Medir longitudes con unidades estandarizadas (m, cm) y realizar transformaciones entre estas unidade"},
            {codigo:"OA 23",eje:"",desc:"Demostrar que comprenden el concepto de área de un rectángulo y de un cuadrado"},
            {codigo:"OA 24",eje:"",desc:"Demostrar que comprenden el concepto de volumen de un cuerpo"},
            {codigo:"OA 25",eje:"",desc:"Realizar encuestas, analizar los datos y comparar con los resultados de muestras aleatorias, usando"},
            {codigo:"OA 26",eje:"",desc:"Realizar experimentos aleatorios lúdicos y cotidianos, y tabular y representar mediante gráficos de"},
            {codigo:"OA 27",eje:"",desc:"Leer e interpretar pictogramas y gráficos de barra simple con escala y comunicar"}
          ],
          '5B': [
            {codigo:"OA 1",eje:"",desc:"Representar y describir números del 0 al 10 000"},
            {codigo:"OA 2",eje:"",desc:"Describir y aplicar estrategias de cálculo mental"},
            {codigo:"OA 3",eje:"",desc:"Demostrar que comprenden la multiplicación de números naturales de dos dígitos por números naturales"},
            {codigo:"OA 4",eje:"",desc:"Demostrar que comprenden la división con dividendos de tres dígitos y divisores de un dígito"},
            {codigo:"OA 5",eje:"",desc:"Realizar cálculos que involucren las cuatro operaciones, aplicando las reglas relativas a paréntesis"},
            {codigo:"OA 6",eje:"",desc:"Resolver problemas rutinarios y no rutinarios que involucren las cuatro operaciones y combinaciones"},
            {codigo:"OA 7",eje:"",desc:"Demostrar que comprenden las fracciones propias4"},
            {codigo:"OA 8",eje:"",desc:"Demostrar que comprenden las fracciones impropias de uso común de denominadores 2, 3, 4, 5, 6, 8, 10"},
            {codigo:"OA 9",eje:"",desc:"Resolver adiciones y sustracciones con fracciones propias con denominadores menores o iguales a 12"},
            {codigo:"OA 10",eje:"",desc:"Determinar el decimal que corresponde a fracciones con denominador 2, 4, 5 y 10"},
            {codigo:"OA 11",eje:"",desc:"Comparar y ordenar decimales hasta la milésima"},
            {codigo:"OA 12",eje:"",desc:"Resolver adiciones y sustracciones de decimales, empleando el valor posicional"},
            {codigo:"OA 13",eje:"",desc:"Resolver problemas rutinarios y no rutinarios, aplicando adiciones y sustracciones de"},
            {codigo:"OA 14",eje:"",desc:"Descubrir alguna regla que explique una sucesión dada y que permita hacer predicciones"},
            {codigo:"OA 15",eje:"",desc:"Resolver problemas, usando ecuaciones de un paso que involucren adiciones y sustracciones, en forma"},
            {codigo:"OA 16",eje:"",desc:"Identificar y dibujar puntos en el primer cuadrante del plano cartesiano, dadas sus"},
            {codigo:"OA 17",eje:"",desc:"Describir y dar ejemplos de aristas y caras de figuras 3D, y lados de figuras 2D"},
            {codigo:"OA 18",eje:"",desc:"Demostrar que comprende el concepto de congruencia, usando la traslación, la reflexión"},
            {codigo:"OA 19",eje:"",desc:"Medir longitudes con unidades estandarizadas (m, cm, mm) en el contexto de la resolución de"},
            {codigo:"OA 20",eje:"",desc:"Realizar transformaciones entre unidades de medidas de longitud (km a m, m a cm, cm a mm y viceversa"},
            {codigo:"OA 21",eje:"",desc:"Diseñar y construir diferentes rectángulos, dados el perímetro o el área o ambos, y sacar conclusion"},
            {codigo:"OA 22",eje:"",desc:"Calcular áreas de triángulos, de paralelogramos y de trapecios, y estimar áreas de figuras"},
            {codigo:"OA 23",eje:"",desc:"Calcular el promedio de datos e interpretarlo en su contexto"},
            {codigo:"OA 24",eje:"",desc:"Describir la posibilidad de ocurrencia de un evento de acuerdo a un experimento"},
            {codigo:"OA 25",eje:"",desc:"Comparar probabilidades de distintos eventos sin calcularlas"},
            {codigo:"OA 26",eje:"",desc:"Leer, interpretar y completar tablas, gráficos de barra simple y gráficos de línea, y comunicar"},
            {codigo:"OA 27",eje:"",desc:"Utilizar diagramas de tallo y hojas para representar datos provenientes de muestras aleatorias"}
          ],
          '6B': [
            {codigo:"OA 1",eje:"",desc:"Representar y describir números del 0 al 10 000"},
            {codigo:"OA 2",eje:"",desc:"Describir y aplicar estrategias de cálculo mental"},
            {codigo:"OA 3",eje:"",desc:"Demostrar que comprenden el concepto de razón de manera concreta, pictórica y simbólica, en forma ma"},
            {codigo:"OA 4",eje:"",desc:"Demostrar que comprenden el concepto de porcentaje de manera concreta, pictórica y simbólica, de"},
            {codigo:"OA 5",eje:"",desc:"Demostrar que comprenden las fracciones y números mixtos"},
            {codigo:"OA 6",eje:"",desc:"Resolver adiciones y sustracciones de fracciones propias e impropias y números mixtos con numeradore"},
            {codigo:"OA 7",eje:"",desc:"Demostrar que comprenden la multiplicación y la división de decimales por números naturales de un dí"},
            {codigo:"OA 8",eje:"",desc:"Resolver problemas rutinarios y no rutinarios que involucren adiciones y sustracciones de fracciones"},
            {codigo:"OA 9",eje:"",desc:"Demostrar que comprenden la relación entre los valores de una tabla y aplicarla en la resolución de"},
            {codigo:"OA 10",eje:"",desc:"Representar generalizaciones de relaciones entre números naturales, usando expresiones"},
            {codigo:"OA 11",eje:"",desc:"Resolver ecuaciones de primer grado con una incógnita, utilizando estrategias como"},
            {codigo:"OA 12",eje:"",desc:"Construir y comparar triángulos de acuerdo a la medida de sus lados y/o sus ángulos con"},
            {codigo:"OA 13",eje:"",desc:"Demostrar que comprenden el concepto de área de una superficie en cubos y paralelepípedos, calculand"},
            {codigo:"OA 14",eje:"",desc:"Realizar teselados de figuras 2D, usando traslaciones, reflexiones y rotaciones"},
            {codigo:"OA 15",eje:"",desc:"Construir ángulos agudos, obtusos, rectos, extendidos y completos con instrumentos"},
            {codigo:"OA 16",eje:"",desc:"Identificar los ángulos que se forman entre dos rectas que se cortan (pares de ángulos"},
            {codigo:"OA 17",eje:"",desc:"Demostrar, de manera concreta, pictórica y simbólica, que la suma de los ángulos interiores de un tr"},
            {codigo:"OA 18",eje:"",desc:"Calcular la superficie de cubos y paralelepípedos, expresando el resultado en cm2 y m2"},
            {codigo:"OA 19",eje:"",desc:"Calcular el volumen de cubos y paralelepípedos, expresando el resultado en cm3 , m3 y mm3 "},
            {codigo:"OA 20",eje:"",desc:"Estimar y medir ángulos, usando el transportador y expresando las mediciones en"},
            {codigo:"OA 21",eje:"",desc:"Calcular ángulos en rectas paralelas cortadas por una transversal y en triángulos"},
            {codigo:"OA 22",eje:"",desc:"Comparar distribuciones de dos grupos, usando diagramas de puntos y de tallo y hojas"},
            {codigo:"OA 23",eje:"",desc:"Conjeturar acerca de las tendencias de resultados obtenidos en repeticiones de un"},
            {codigo:"OA 24",eje:"",desc:"Leer e interpretar gráficos de barra doble y circulares y comunicar sus conclusiones"}
          ],
          '7B': [
            {codigo:"OA 1",eje:"",desc:"Cotidianos"},
            {codigo:"OA 2",eje:"",desc:"Utilizando representaciones concretas, Representan la división de una fracción por otra fracción"},
            {codigo:"OA 3",eje:"",desc:"Crean problemas de la vida cotidiana que se modelan y se resuelven con operaciones matemáticas en"},
            {codigo:"OA 4",eje:"",desc:"Mostrar que comprenden el concepto de porcentaje: Representándolo de manera pictórica. Calculand"},
            {codigo:"OA 5",eje:"",desc:"Exponente, elevado"},
            {codigo:"OA 6",eje:"",desc:"Representan patrones de manera pictórica y simbólica"},
            {codigo:"OA 7",eje:"",desc:"Aplican la conmutatividad y la asociatividad de la adición para reducir expresiones algebraicas. O"},
            {codigo:"OA 8",eje:"",desc:"Demostrar que comprenden las proporciones directas e inversas: Realizando tablas de valores para"},
            {codigo:"OA 9",eje:"",desc:"Modelar y resolver problemas diversos de la vida diaria y de otras asignaturas, que involucran ecuac"},
            {codigo:"OA 10",eje:"",desc:"Resultados, midiéndolos. Muestran geométricamente, mediante la descomposición en triángulos, el pa"},
            {codigo:"OA 11",eje:"",desc:"Mostrar que comprenden el círculo"},
            {codigo:"OA 12",eje:"",desc:"Construir objetos geométricos de manera manual y/o con software educativo: Líneas, como las perpen"},
            {codigo:"OA 13",eje:"",desc:"Dibujan cuadriláteros a partir de un triángulo dado"},
            {codigo:"OA 14",eje:"",desc:"Conjeturan la forma y la ubicación de figuras 2D (rectángulo, cuadrado, paralelogramo y trapecio)"},
            {codigo:"OA 15",eje:"",desc:"Estimar el porcentaje de algunas características de una población desconocida por medio del muestreo"},
            {codigo:"OA 16",eje:"",desc:"Representar datos obtenidos en una muestra mediante tablas de frecuencias absolutas y relativas, uti"},
            {codigo:"OA 17",eje:"",desc:"Mostrar que comprenden las medidas de tendencia central y el rango"},
            {codigo:"OA 18",eje:"",desc:"Explicar las probabilidades de eventos obtenidos por medio de experimentos de manera manual y/o con"},
            {codigo:"OA 19",eje:"",desc:"Comparar las frecuencias relativas de un evento obtenidas al repetir un experimento de forma manual"}
          ],
          '8B': [
            {codigo:"OA 1",eje:"",desc:"Mostrar que comprenden la adición y sustracción de números enteros"},
            {codigo:"OA 2",eje:"",desc:"Explicar la multiplicación y la división de fracciones"},
            {codigo:"OA 3",eje:"",desc:"1° medio"},
            {codigo:"OA 4",eje:"",desc:"Resolviendo problemas, usando la notación científica"},
            {codigo:"OA 5",eje:"",desc:"Mostrar que comprenden el concepto de porcentaje"},
            {codigo:"OA 6",eje:"",desc:"Utilizar el lenguaje algebraico para generalizar relaciones"},
            {codigo:"OA 7",eje:"",desc:"Reducir expresiones algebraicas, reuniendo términos semejantes para"},
            {codigo:"OA 8",eje:"",desc:"Identificar puntos en el plano cartesiano, usando pares ordenados"},
            {codigo:"OA 9",eje:"",desc:"(a, b, c son números racionales, a ≠ 0)"},
            {codigo:"OA 10",eje:"",desc:"Mostrar que comprenden la función afín: Generalizándola como la"},
            {codigo:"OA 11",eje:"",desc:"> Arman y despliegan cajas de forma de prismas rectos"},
            {codigo:"OA 12",eje:"",desc:"Explicar, de manera concreta, pictórica y simbólica, la validez del teorema de Pitágoras y aplicar a"},
            {codigo:"OA 13",eje:"",desc:"Realizan traslaciones en el plano con vectores dados"},
            {codigo:"OA 14",eje:"",desc:"Componer rotaciones, traslaciones y reflexiones en el plano cartesiano y en el espacio, de manera ma"},
            {codigo:"OA 15",eje:"",desc:"Mostrar que comprenden las medidas de posición, percentiles y cuartiles: Identificando la muestra"},
            {codigo:"OA 16",eje:"",desc:"Evaluar la forma en que los datos están presentados"},
            {codigo:"OA 17",eje:"",desc:"Explicar el principio combinatorio multiplicativo: A partir de situaciones concretas"}
          ]
        }
      },
      {
        nombre: 'Ciencias Naturales',
        sigla:  'CN',
        color:  '#f59e0b',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Seres vivos y no vivos','El cuerpo humano básico','Entorno natural'],
          '2B': ['Animales y plantas','Materia y energía básica','El cielo y la tierra'],
          '3B': ['Ecosistemas locales','Estados de la materia','Sistema solar'],
          '4B': ['Clasificación de seres vivos','Mezclas y soluciones','Fuerza y movimiento'],
          '5B': ['Células','Propiedades de la materia','Energía y sus transformaciones'],
          '6B': ['Sistema nervioso','Electricidad básica','Ciclos de la naturaleza'],
          '7B': ['Genética básica','Química de la materia','Ondas'],
          '8B': ['Evolución','Reacciones químicas','Física mecánica básica']
        }
      },
      {
        nombre: 'Historia, Geografía y CS',
        sigla:  'HCS',
        color:  '#8b5cf6',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Mi familia y yo','Mi barrio y escuela','Chile: mi país'],
          '2B': ['Comunidades locales','Geografía de Chile','Identidad chilena'],
          '3B': ['Pueblos originarios de Chile','Geografía regional','Normas y valores'],
          '4B': ['Historia prehispánica','Mapas y representaciones','Ciudadanía básica'],
          '5B': ['Conquista y colonia','América y sus geografías','Economía básica'],
          '6B': ['Independencia de Chile','Geografía de América','Sociedad y cultura'],
          '7B': ['Chile siglo XIX','Historia universal moderna','Geografía mundial'],
          '8B': ['Chile siglo XX-XXI','Globalización','Democracia y DDHH']
        }
      },
      {
        nombre: 'Educación Física',
        sigla:  'EF',
        color:  '#ef4444',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Habilidades motrices básicas','Juegos libres','Higiene'],
          '2B': ['Destrezas locomotoras','Juegos cooperativos','Vida activa'],
          '3B': ['Habilidades atléticas','Deporte básico','Bienestar'],
          '4B': ['Gimnasia','Deportes colectivos','Salud y actividad física'],
          '5B': ['Condición física','Deportes individuales','Nutrición básica'],
          '6B': ['Capacidades físicas','Deportes y competencia','Salud integral'],
          '7B': ['Entrenamiento básico','Deportes terrestres','Vida saludable'],
          '8B': ['Planificación de actividad física','Deportes alternativos','Vida saludable']
        }
      },
      {
        nombre: 'Artes Visuales',
        sigla:  'AV',
        color:  '#f472b6',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Expresión plástica libre','Color y forma','Arte y entorno'],
          '2B': ['Técnicas básicas','Observación artística','Arte chileno básico'],
          '3B': ['Elementos del lenguaje visual','Técnicas mixtas','Arte y cultura'],
          '4B': ['Composición visual','Historia del arte básica','Creación artística'],
          '5B': ['Arte y patrimonio','Técnicas avanzadas','Proyecto artístico'],
          '6B': ['Arte latinoamericano','Diseño básico','Crítica de arte'],
          '7B': ['Arte contemporáneo','Lenguajes artísticos','Proyecto creativo'],
          '8B': ['Arte y sociedad','Portafolio artístico','Arte digital básico']
        }
      },
      {
        nombre: 'Música',
        sigla:  'MUS',
        color:  '#6366f1',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Pulso y ritmo','Cantos y juegos','Sonidos del entorno'],
          '2B': ['Notación básica','Instrumentos básicos','Música folclórica'],
          '3B': ['Elementos musicales','Flauta dulce inicio','Música chilena'],
          '4B': ['Lectura musical','Conjunto vocal-instrumental','Géneros musicales'],
          '5B': ['Teoría musical básica','Expresión instrumental','Música popular'],
          '6B': ['Armonía básica','Creación musical','Música latinoamericana'],
          '7B': ['Música y contexto histórico','Composición','Apreciación musical'],
          '8B': ['Géneros y estilos musicales','Proyecto musical','Música y tecnología']
        }
      },
      {
        nombre: 'Inglés',
        sigla:  'ING',
        color:  '#0ea5e9',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['In My classroom','My family and me','What\'s the weather like today?','Happy birthday!'],
          '2B': ['At the zoo','My house','My city','Food & Celebrations'],
          '3B': ['My clothes','Animals and nature','My home','Food and celebrations'],
          '4B': ['How do you feel?','My city and transport','Sports and habits','Celebrations and climate'],
          '5B': ['Hello!: Greetings','My Family and Friends','My Daily Routine'],
          '6B': ['My World','Food and Health','Free Time Activities'],
          '7B': ['My Community','Travel and Adventure','Technology in my Life'],
          '8B': ['Changes in our World','Global Issues','Future Perspectives']
        },
        oas: {
          '1B': [
            {codigo:"OA1",eje:"Comprensión Oral",desc:"Comprender textos leídos por un adulto o en formato audiovisual, muy breves y simples, con un patrón que se repite, como rimas y chants, cuentos y canciones."},
            {codigo:"OA2",eje:"Comprensión Oral",desc:"Comprender textos orales relacionados con temas conocidos con funciones básicas: información personal, familia, clima y animales, juguetes y celebraciones (varía por unidad)."},
            {codigo:"OA3",eje:"Comprensión Oral",desc:"Demostrar comprensión de textos orales: identificando personajes, objetos y animales; siguiendo instrucciones simples; identificando palabras, expresiones de uso muy frecuente y vocabulario aprendido; identificando sonidos propios del inglés."},
            {codigo:"OA4",eje:"Comprensión Oral",desc:"Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer conexiones con conocimientos previos; relacionar el texto con imágenes."},
            {codigo:"OA5",eje:"Comprensión Oral",desc:"Reaccionar a lo escuchado, estableciendo relaciones con experiencias personales y/o expresando preferencias u opiniones por medio de palabras, dibujos, mímicas y acciones."},
            {codigo:"OA6",eje:"Comprensión Lectura",desc:"Seguir la lectura y comprender textos como cuentos, rimas, chants, listas, instrucciones, tarjetas de saludo y textos informativos, identificando personajes, palabras conocidas, vocabulario aprendido y expresiones de uso muy frecuente."},
            {codigo:"OA7",eje:"Comprensión Lectura",desc:"Seguir la lectura y demostrar comprensión de textos relacionados con temas conocidos, con funciones y vocabulario que varían por unidad."},
            {codigo:"OA8",eje:"Comprensión Lectura",desc:"Seguir la lectura y aplicar estrategias para apoyar la comprensión; por ejemplo: establecer relaciones con conocimientos previos; relacionar el texto con las imágenes; jugar a leer a otros y dibujar de acuerdo a lo leído."},
            {codigo:"OA9",eje:"Comprensión Lectura",desc:"Reaccionar a lo leído, estableciendo relaciones con experiencias personales y/o expresando preferencias y opiniones por medio de dibujos y palabras."},
            {codigo:"OA10",eje:"Expresión Oral",desc:"Reproducir chants, rimas y canciones muy breves y simples para familiarizarse con los sonidos propios del inglés."},
            {codigo:"OA11",eje:"Expresión Oral",desc:"Participar en interacciones de la clase y exposiciones muy breves y simples, acerca de temas conocidos o de otras asignaturas, usando apoyo del docente, objetos, gestos e imágenes; usando el vocabulario aprendido y expresiones de uso muy frecuente (Good morning; thank you; My name is...)."},
            {codigo:"OA12",eje:"Expresión Oral",desc:"Expresarse oralmente con el apoyo del docente para saludar, presentarse, describir objetos y animales, expresar posesiones, gustos y cantidades, con funciones que varían por unidad."},
            {codigo:"OA13",eje:"Expresión Escrita",desc:"Experimentar con la escritura de palabras (trazar, copiar o completar) cuya ortografía tenga alta correspondencia con el español, acerca de temas conocidos o de otras asignaturas, de acuerdo a un modelo."},
            {codigo:"OA14",eje:"Expresión Escrita",desc:"Escribir, con apoyo de imágenes y tarjetas de palabras, sobre temas conocidos identificando y describiendo objetos, animales, personas y acciones, con funciones que varían por unidad."}
          ],
          '2B': [
            {codigo:"OA1",eje:"Comprensión Oral",desc:"Comprender textos leídos por un adulto o en formato audiovisual, breves y simples, como rimas y chants, canciones, cuentos y diálogos."},
            {codigo:"OA2",eje:"Comprensión Oral",desc:"Comprender textos orales relacionados con temas conocidos con funciones básicas, con variaciones por unidad (la escuela/animales, la casa, ocupaciones/ciudad, comida/celebraciones)."},
            {codigo:"OA3",eje:"Comprensión Oral",desc:"Demostrar comprensión de textos orales: identificando personajes, objetos y animales; siguiendo instrucciones simples; identificando palabras, expresiones de uso frecuente y vocabulario aprendido; identificando sonidos propios del inglés."},
            {codigo:"OA4",eje:"Comprensión Oral",desc:"Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; hacer conexiones con conocimientos previos; relacionar el texto con imágenes; focalizar la atención en palabras clave."},
            {codigo:"OA5",eje:"Comprensión Oral",desc:"Reaccionar a lo escuchado, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de dibujos, mímicas, dramatizaciones y palabras o frases escritas."},
            {codigo:"OA6",eje:"Comprensión Lectura",desc:"Leer y demostrar comprensión de textos como cuentos, rimas, chants, tarjetas de saludo, instrucciones y textos informativos, identificando ideas generales, personajes y acciones, vocabulario aprendido y expresiones de uso muy frecuente."},
            {codigo:"OA7",eje:"Comprensión Lectura",desc:"Leer y demostrar comprensión de textos relacionados con temas conocidos, con funciones y vocabulario que varían por unidad (la escuela/animales, la casa, ocupaciones/ciudad, comida/celebraciones)."},
            {codigo:"OA8",eje:"Comprensión Lectura",desc:"Leer y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; establecer relaciones con conocimientos previos; relacionar el texto con las imágenes; releer o leer a otros en voz alta; dibujar o recontar con ayuda."},
            {codigo:"OA9",eje:"Comprensión Lectura",desc:"Reaccionar a lo leído, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones por medio de ilustraciones, dramatizaciones y palabras o frases escritas."},
            {codigo:"OA10",eje:"Expresión Oral",desc:"Reproducir chants, rimas y diálogos muy breves y simples para familiarizarse con los sonidos propios del inglés e identificar los sonidos /w/, /th/, /s/-/z/ en particular, con variaciones por unidad."},
            {codigo:"OA11",eje:"Expresión Oral",desc:"Participar en diálogos, interacciones de la clase y exposiciones muy breves y simples, acerca de temas conocidos o de otras asignaturas, usando apoyo del docente, objetos, gestos e imágenes; usando vocabulario aprendido y expresiones de uso muy frecuente (How do you say...? I'm...)."},
            {codigo:"OA12",eje:"Expresión Oral",desc:"Expresarse oralmente con el apoyo del docente para compartir información personal, expresar habilidad, sentimientos y posesión, identificar y describir animales y objetos, describir acciones que ocurren al momento de hablar, con variaciones por unidad."},
            {codigo:"OA13",eje:"Expresión Escrita",desc:"Escribir (por ejemplo: copiar o completar) palabras y oraciones simples de acuerdo a un modelo, acerca de temas conocidos o de otras asignaturas."},
            {codigo:"OA14",eje:"Expresión Escrita",desc:"Escribir, sobre la base de imágenes, identificando animales, acciones, objetos y partes de la casa, ocupaciones, lugares, comida; expresando sentimientos y cantidades en números hasta el veinte; describiendo ubicación de objetos y acciones, con variaciones por unidad."}
          ],
          '3B': [
            {codigo:"OA1",eje:"Comprensión Oral",desc:"Comprender textos leídos por un adulto o en formato audiovisual, como rimas y chants, canciones, cuentos, diálogos y textos informativos."},
            {codigo:"OA2",eje:"Comprensión Oral",desc:"Comprender textos orales relacionados con temas conocidos con funciones que varían por unidad (ropa/información personal, animales/naturaleza, la casa, comida/celebraciones)."},
            {codigo:"OA3",eje:"Comprensión Oral",desc:"Demostrar comprensión de textos orales: identificando personajes, objetos y animales; siguiendo instrucciones; identificando palabras, expresiones de uso frecuente y vocabulario aprendido; identificando sonidos propios del inglés."},
            {codigo:"OA4",eje:"Comprensión Oral",desc:"Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones sobre la base de conocimientos previos; relacionar texto con imágenes; focalizar atención en palabras clave; visualizar diferentes aspectos del texto; verificar predicciones."},
            {codigo:"OA5",eje:"Comprensión Oral",desc:"Reaccionar a lo escuchado estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de ilustraciones, mímica, dramatizaciones y frases u oraciones escritas."},
            {codigo:"OA6",eje:"Comprensión Lectura",desc:"Leer y demostrar comprensión de textos como cuentos, rimas, chants, canciones, invitaciones, tarjetas de saludo, menús, instrucciones, diálogos y textos informativos, en formato digital o impreso, identificando ideas generales, información explícita y vocabulario aprendido."},
            {codigo:"OA7",eje:"Comprensión Lectura",desc:"Leer y demostrar comprensión de textos relacionados con temas conocidos, con funciones y vocabulario que varían por unidad (ropa, animales/naturaleza, la casa, comida/celebraciones)."},
            {codigo:"OA8",eje:"Comprensión Lectura",desc:"Leer y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; establecer relaciones con conocimientos previos; visualizar diferentes aspectos del texto; releer, leer a otros en voz alta; recontar con ayuda; verificar predicciones."},
            {codigo:"OA9",eje:"Comprensión Lectura",desc:"Reaccionar a lo leído estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de ilustraciones, dramatizaciones y palabras y frases escritas."},
            {codigo:"OA10",eje:"Expresión Oral",desc:"Reproducir chants, canciones, rimas y diálogos muy breves y simples para familiarizarse con los sonidos propios del inglés e identificar los sonidos /s/, /z/, /sh/, /ch/ en particular, con variaciones por unidad."},
            {codigo:"OA11",eje:"Expresión Oral",desc:"Participar en diálogos, interacciones de la clase y exposiciones breves y simples, acerca de temas conocidos o de otras asignaturas, usando el apoyo de objetos, gestos e imágenes; usando vocabulario aprendido y expresiones de uso frecuente."},
            {codigo:"OA12",eje:"Expresión Oral",desc:"Expresarse oralmente (en diálogos o exposiciones preparadas) para describir ropa, animales, la casa, comida; expresar preferencias, posesiones y cantidades; describir acciones que ocurren al momento de hablar, con variaciones por unidad."},
            {codigo:"OA13",eje:"Expresión Escrita",desc:"Escribir (completar o responder preguntas), de acuerdo a un modelo y con apoyo de imágenes y vocabulario dado, textos tales como oraciones, listas y descripciones breves acerca de temas conocidos o de otras asignaturas."},
            {codigo:"OA14",eje:"Expresión Escrita",desc:"Escribir, sobre la base de imágenes y con funciones que varían por unidad, para identificar y describir ropa, animales y naturaleza, partes de la casa, comida; expresar sentimientos, posesiones y acciones en tiempo presente."},
            {codigo:"OA15",eje:"Expresión Escrita",desc:"Planificar, escribir, revisar y publicar textos muy breves y simples recurriendo a apoyo del docente, de imágenes, organizadores gráficos, modelos, diccionario de imágenes y herramientas como el procesador de textos."}
          ],
          '4B': [
            {codigo:"OA1",eje:"Comprensión Oral",desc:"Comprender textos leídos por un adulto o en formato audiovisual, como poemas, chants y canciones, cuentos, diálogos y textos informativos."},
            {codigo:"OA2",eje:"Comprensión Oral",desc:"Comprender textos orales relacionados con temas conocidos con funciones que varían por unidad (la clase/salud, la ciudad/transportes, deportes/hábitos, celebraciones/clima)."},
            {codigo:"OA3",eje:"Comprensión Oral",desc:"Demostrar comprensión de textos orales, identificando ideas generales e información explícita relacionada con personajes, objetos, lugares y fechas; palabras de vocabulario aprendido y expresiones de uso frecuente; sonidos del inglés como /h/, /j/, /sh/, /ch/ que varían por unidad."},
            {codigo:"OA4",eje:"Comprensión Oral",desc:"Escuchar textos orales y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones sobre la base de conocimientos previos; relacionar el texto con imágenes; focalizar la atención en palabras clave; visualizar diferentes aspectos del texto; verificar predicciones."},
            {codigo:"OA5",eje:"Comprensión Oral",desc:"Reaccionar a lo escuchado, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones por medio de ilustraciones, acciones, dramatizaciones y frases u oraciones escritas."},
            {codigo:"OA6",eje:"Comprensión Lectura",desc:"Leer y demostrar comprensión de textos como cuentos, poemas, chants, canciones, invitaciones, menús, recetas, instrucciones, e-mails, diálogos y textos informativos, en formato digital o impreso, identificando ideas generales, información explícita y vocabulario aprendido."},
            {codigo:"OA7",eje:"Comprensión Lectura",desc:"Leer y demostrar comprensión de textos relacionados con temas conocidos con funciones que varían por unidad (la clase/salud, la ciudad/transportes, deportes/hábitos, celebraciones/clima)."},
            {codigo:"OA8",eje:"Comprensión Lectura",desc:"Leer y aplicar estrategias para apoyar la comprensión; por ejemplo: hacer predicciones; establecer relaciones con conocimientos previos; visualizar diferentes aspectos del texto; releer, recontar con ayuda; verificar predicciones."},
            {codigo:"OA9",eje:"Comprensión Lectura",desc:"Reaccionar a lo leído, estableciendo relaciones con experiencias personales y/o expresando preferencias, sentimientos u opiniones, por medio de ilustraciones, dramatizaciones y palabras y frases escritas."},
            {codigo:"OA10",eje:"Expresión Oral",desc:"Reproducir chants, canciones, rimas, poemas y diálogos breves y simples para familiarizarse con los sonidos del inglés e identificar los sonidos /h/, /j/, /sh/, /ch/ en particular, con variaciones por unidad."},
            {codigo:"OA11",eje:"Expresión Oral",desc:"Participar en diálogos, interacciones de la clase y exposiciones breves y simples acerca de temas conocidos o de otras asignaturas, usando el apoyo de objetos, gestos e imágenes; usando vocabulario aprendido y expresiones de uso frecuente (You're welcome; When's your birthday?)."},
            {codigo:"OA12",eje:"Expresión Oral",desc:"Expresarse oralmente (en diálogos o exposiciones preparadas) para dar consejos y sugerencias, indicar direcciones, hablar de rutinas y hábitos, expresar preferencias y posesiones; con funciones que varían por unidad."},
            {codigo:"OA13",eje:"Expresión Escrita",desc:"Escribir (completar o responder preguntas), de acuerdo a un modelo y con apoyo de imágenes y vocabulario dado, textos tales como oraciones, invitaciones y diálogos de tres o cuatro intercambios acerca de temas conocidos o de otras asignaturas."},
            {codigo:"OA14",eje:"Expresión Escrita",desc:"Escribir, sobre la base de imágenes y funciones que varían por unidad, para expresar información sobre la salud, la ciudad, deportes y hábitos, celebraciones y clima; usando el vocabulario y expresiones de uso frecuente aprendidos."},
            {codigo:"OA15",eje:"Expresión Escrita",desc:"Planificar, escribir, revisar y publicar textos muy breves y simples recurriendo a apoyo del docente, de imágenes, organizadores gráficos, modelos, diccionario de imágenes y herramientas como el procesador de textos, para demostrar conocimiento y uso del vocabulario y expresiones de uso frecuente aprendidos."}
          ]
        }
      },
      {
        nombre: 'Tecnología',
        sigla:  'TEC',
        color:  '#64748b',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Objetos tecnológicos del hogar','Materiales básicos','Diseño simple'],
          '2B': ['Tecnología en mi vida','Construcción básica','Resolución de problemas'],
          '3B': ['Sistemas tecnológicos','Materiales y procesos','Diseño y construcción'],
          '4B': ['Tecnología y sociedad','Energía en tecnología','Proyecto tecnológico'],
          '5B': ['Diseño técnico','Circuitos básicos','Innovación tecnológica'],
          '6B': ['TIC básicas','Automatización simple','Impacto tecnológico'],
          '7B': ['Programación básica','Robótica educativa','Tecnología y empleo'],
          '8B': ['Pensamiento computacional','Proyectos tecnológicos','Tecnología sustentable']
        }
      },
      {
        nombre: 'Orientación',
        sigla:  'ORI',
        color:  '#14b8a6',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Grupos de pertenencia y afecto','Emociones y resolución de conflictos'],
          '2B': ['Grupos de pertenencia y afecto','Emociones y resolución de conflictos'],
          '3B': ['Autoconocimiento y afectividad','Emociones y resolución de conflictos'],
          '4B': ['Autoconocimiento y convivencia','Emociones, afectividad y pubertad'],
          '5B': ['Autoestima y valoración personal','Emociones y resolución de conflictos','Afectividad y autocuidado','Prevención y vida saludable'],
          '6B': ['Autoestima y valoración personal','Emociones y resolución de conflictos','Afectividad y autocuidado','Prevención y vida saludable'],
          '7B': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje'],
          '8B': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje']
        },
        oas: {
          '1B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Observar, describir y valorar sus características personales, sus habilidades e intereses."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Identificar emociones experimentadas por ellos y por los demás y distinguir diversas formas de expresarlas."},
            {codigo:"OA3",eje:"Crecimiento Personal",desc:"Observar, describir y valorar las expresiones de afecto y cariño que dan y reciben en los ámbitos familiar, escolar y social."},
            {codigo:"OA4",eje:"Crecimiento Personal",desc:"Identificar y practicar, en forma guiada, conductas protectoras y de autocuidado (higiene, descanso, alimentación, resguardo del cuerpo e intimidad)."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (buen trato, escucha, compartir con pares)."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Identificar conflictos que surgen entre pares y practicar formas de solucionarlos (escuchar al otro, ponerse en su lugar, buscar un acuerdo)."},
            {codigo:"OA7",eje:"Participación y Pertenencia",desc:"Reconocer, describir y valorar sus grupos de pertenencia (familia, curso, pares) y participar activamente en ellos."},
            {codigo:"OA8",eje:"Trabajo Escolar",desc:"Practicar hábitos y actitudes que favorezcan el proceso de aprendizaje (útiles escolares, orden, identificar nuevos aprendizajes)."}
          ],
          '2B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Observar, describir y valorar sus características personales, sus habilidades e intereses."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Identificar emociones experimentadas por ellos y por los demás y distinguir diversas formas de expresarlas."},
            {codigo:"OA3",eje:"Crecimiento Personal",desc:"Observar, describir y valorar las expresiones de afecto y cariño que dan y reciben en los ámbitos familiar, escolar y social."},
            {codigo:"OA4",eje:"Crecimiento Personal",desc:"Identificar y practicar, en forma guiada, conductas protectoras y de autocuidado (higiene, descanso, alimentación, resguardo del cuerpo e intimidad)."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (buen trato, escucha, compartir con pares)."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Identificar conflictos que surgen entre pares y practicar formas de solucionarlos (escuchar al otro, ponerse en su lugar, buscar un acuerdo)."},
            {codigo:"OA7",eje:"Participación y Pertenencia",desc:"Reconocer, describir y valorar sus grupos de pertenencia (familia, curso, pares) y participar activamente en ellos."},
            {codigo:"OA8",eje:"Trabajo Escolar",desc:"Practicar hábitos y actitudes que favorezcan el proceso de aprendizaje (útiles escolares, orden, identificar nuevos aprendizajes)."}
          ],
          '3B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Observar, describir y valorar sus características, habilidades y fortalezas, y proponerse acciones concretas para superarse."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Identificar y aceptar sus propias emociones y las de los demás, y practicar estrategias personales de manejo emocional."},
            {codigo:"OA3",eje:"Crecimiento Personal",desc:"Reconocer y valorar la sexualidad como expresión de amor, vínculo e intimidad entre dos personas y como gestora de su propia vida."},
            {codigo:"OA4",eje:"Crecimiento Personal",desc:"Identificar y practicar en forma autónoma conductas protectoras y de autocuidado (higiene, descanso, alimentación, resguardo del cuerpo, prevención de drogas)."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, no discriminación, respetar ambiente de aprendizaje)."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Resolver conflictos entre pares en forma guiada y aplicar estrategias diversas de resolución de problemas."},
            {codigo:"OA7",eje:"Participación y Pertenencia",desc:"Participar en forma guiada en la comunidad escolar y en la organización del curso (proponer iniciativas, asumir responsabilidades, respetar derechos)."},
            {codigo:"OA8",eje:"Trabajo Escolar",desc:"Manifestar hábitos y actitudes de esfuerzo e interés que favorezcan el aprendizaje (puntualidad, organización, honestidad, curiosidad intelectual)."}
          ],
          '4B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Observar, describir y valorar sus características, habilidades y fortalezas, y proponerse acciones concretas para superarse."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Identificar y aceptar sus propias emociones y practicar estrategias de manejo emocional (esperar, escuchar al otro, considerar su impacto en los demás)."},
            {codigo:"OA3",eje:"Crecimiento Personal",desc:"Reconocer y valorar la sexualidad como expresión de amor, vínculo e intimidad entre dos personas y como gestora de su propia vida."},
            {codigo:"OA4",eje:"Crecimiento Personal",desc:"Reconocer y valorar el proceso de desarrollo afectivo y sexual, describiendo los cambios físicos y afectivos que ocurren en la pubertad."},
            {codigo:"OA5",eje:"Crecimiento Personal",desc:"Identificar y practicar en forma autónoma conductas protectoras y de autocuidado (higiene, descanso, intimidad, prevención de drogas y abuso)."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, no violencia, no discriminación)."},
            {codigo:"OA7",eje:"Relaciones Interpersonales",desc:"Resolver conflictos entre pares en forma guiada y aplicar estrategias diversas de resolución de problemas."},
            {codigo:"OA8",eje:"Participación y Pertenencia",desc:"Participar en forma guiada en la comunidad escolar y en la organización del curso mediante diálogo y toma de decisiones democráticas."},
            {codigo:"OA9",eje:"Trabajo Escolar",desc:"Manifestar hábitos y actitudes de esfuerzo e interés que favorezcan el aprendizaje (puntualidad, organización, honestidad, curiosidad intelectual)."}
          ],
          '5B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Demostrar una valoración positiva de sí mismo reconociendo habilidades, fortalezas y aspectos que requiera superar."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Distinguir y describir emociones y reconocer y practicar formas apropiadas de expresarlas, considerando su impacto en sí mismo y en otros."},
            {codigo:"OA3",eje:"Crecimiento Personal",desc:"Reconocer y valorar el proceso de desarrollo afectivo y sexual y los cambios físicos, afectivos y sociales de la pubertad."},
            {codigo:"OA4",eje:"Crecimiento Personal",desc:"Practicar en forma autónoma conductas protectoras y de autocuidado (intimidad, redes sociales, fuentes de información confiables, comunicación familiar)."},
            {codigo:"OA5",eje:"Crecimiento Personal",desc:"Reconocer causas y consecuencias del consumo de drogas (tabaco, alcohol, marihuana), identificar factores preventivos y proponer estrategias de enfrentamiento."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, rechazo a la violencia y la discriminación)."},
            {codigo:"OA7",eje:"Relaciones Interpersonales",desc:"Resolver conflictos de convivencia en forma autónoma, seleccionando y aplicando diversas estrategias de resolución de problemas."},
            {codigo:"OA8",eje:"Participación y Pertenencia",desc:"Participar activa y colaborativamente en la comunidad escolar y en la organización del curso mediante diálogo y toma de decisiones democráticas."},
            {codigo:"OA9",eje:"Trabajo Escolar",desc:"Practicar en forma autónoma y perseverante hábitos y actitudes que favorezcan el aprendizaje (metas, organización del tiempo, trabajo colaborativo, honestidad)."}
          ],
          '6B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Demostrar una valoración positiva de sí mismo reconociendo habilidades, fortalezas y aspectos que requiera superar."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Distinguir y describir emociones y reconocer y practicar formas apropiadas de expresarlas, considerando su impacto en sí mismo y en otros."},
            {codigo:"OA3",eje:"Crecimiento Personal",desc:"Reconocer y valorar el proceso de desarrollo afectivo y sexual y los cambios físicos, afectivos y sociales de la pubertad."},
            {codigo:"OA4",eje:"Crecimiento Personal",desc:"Practicar en forma autónoma conductas protectoras y de autocuidado (intimidad, redes sociales, fuentes de información confiables, comunicación familiar)."},
            {codigo:"OA5",eje:"Crecimiento Personal",desc:"Reconocer causas y consecuencias del consumo de drogas (tabaco, alcohol, marihuana), identificar factores preventivos y proponer estrategias de enfrentamiento."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, rechazo a la violencia y la discriminación)."},
            {codigo:"OA7",eje:"Relaciones Interpersonales",desc:"Resolver conflictos de convivencia en forma autónoma, seleccionando y aplicando diversas estrategias de resolución de problemas."},
            {codigo:"OA8",eje:"Participación y Pertenencia",desc:"Participar activa y colaborativamente en la comunidad escolar y en la organización del curso mediante diálogo y toma de decisiones democráticas."},
            {codigo:"OA9",eje:"Trabajo Escolar",desc:"Practicar en forma autónoma y perseverante hábitos y actitudes que favorezcan el aprendizaje (metas, organización del tiempo, trabajo colaborativo, honestidad)."}
          ],
          '7B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Construir representaciones positivas de sí mismos incorporando características, motivaciones, intereses y capacidades, considerando los cambios de la adolescencia."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Analizar la importancia de integrar las dimensiones de la sexualidad, el cuidado del cuerpo y la intimidad, discriminando formas de relacionarse con respeto."},
            {codigo:"OA3",eje:"Bienestar y Autocuidado",desc:"Identificar situaciones que expongan a adolescentes a riesgos (sustancias nocivas, conductas sexuales riesgosas, violencia) y desarrollar estrategias de protección."},
            {codigo:"OA4",eje:"Bienestar y Autocuidado",desc:"Integrar acciones cotidianas que favorezcan el bienestar y la vida saludable en el plano personal y en la comunidad escolar."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Analizar sus relaciones atendiendo a principios de igualdad, dignidad, inclusión y no discriminación, y reconocer su impacto en el bienestar de las personas."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Resolver conflictos y desacuerdos a través del diálogo, la escucha empática y la búsqueda de soluciones respetuosas y sin violencia."},
            {codigo:"OA7",eje:"Pertenencia y Participación",desc:"Reconocer intereses y necesidades compartidas con su grupo de pertenencia y colaborar para alcanzar metas comunes valorando el trabajo en equipo."},
            {codigo:"OA8",eje:"Pertenencia y Participación",desc:"Elaborar acuerdos para fines compartidos utilizando espacios de participación democrática como Consejo de Curso, respetando la diversidad de opiniones."},
            {codigo:"OA9",eje:"Gestión del Aprendizaje",desc:"Reconocer sus intereses, motivaciones y capacidades, comprendiendo la relevancia del aprendizaje escolar para elaborar sus proyectos personales."},
            {codigo:"OA10",eje:"Gestión del Aprendizaje",desc:"Gestionar de manera autónoma su proceso de aprendizaje mediante el establecimiento de metas progresivas, monitoreo de logros y redefinición de acciones."}
          ],
          '8B': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Construir representaciones positivas de sí mismos incorporando características, motivaciones, intereses y capacidades, considerando los cambios de la adolescencia."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Analizar la importancia de integrar las dimensiones de la sexualidad, el cuidado del cuerpo y la intimidad, discriminando formas de relacionarse con respeto."},
            {codigo:"OA3",eje:"Bienestar y Autocuidado",desc:"Identificar situaciones que expongan a adolescentes a riesgos (sustancias nocivas, conductas sexuales riesgosas, violencia) y desarrollar estrategias de protección."},
            {codigo:"OA4",eje:"Bienestar y Autocuidado",desc:"Integrar acciones cotidianas que favorezcan el bienestar y la vida saludable en el plano personal y en la comunidad escolar."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Analizar sus relaciones atendiendo a principios de igualdad, dignidad, inclusión y no discriminación, y reconocer su impacto en el bienestar de las personas."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Resolver conflictos y desacuerdos a través del diálogo, la escucha empática y la búsqueda de soluciones respetuosas y sin violencia."},
            {codigo:"OA7",eje:"Pertenencia y Participación",desc:"Reconocer intereses y necesidades compartidas con su grupo de pertenencia y colaborar para alcanzar metas comunes valorando el trabajo en equipo."},
            {codigo:"OA8",eje:"Pertenencia y Participación",desc:"Elaborar acuerdos para fines compartidos utilizando espacios de participación democrática como Consejo de Curso, respetando la diversidad de opiniones."},
            {codigo:"OA9",eje:"Gestión del Aprendizaje",desc:"Reconocer sus intereses, motivaciones y capacidades, comprendiendo la relevancia del aprendizaje escolar para elaborar sus proyectos personales."},
            {codigo:"OA10",eje:"Gestión del Aprendizaje",desc:"Gestionar de manera autónoma su proceso de aprendizaje mediante el establecimiento de metas progresivas, monitoreo de logros y redefinición de acciones."}
          ]
        }
      }
    ]
  };

  // ════════════════════════════════════════════════════════════
  //  PLAN COMÚN — Educación Media (1° a 4° Medio)
  // ════════════════════════════════════════════════════════════
  var planComun = {
    asignaturas: [
      {
        nombre: 'Lengua y Literatura',
        sigla:  'LEN',
        color:  '#3b82f6',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ["comunicación y sociedad (medios de comunicación)", "la libertad como tema literario", "ciudadanos y opinión", "relaciones humanas en el teatro y la literatura", "comunicación y sociedad", "la libertad como tema literario (narrativa y lírica)", "ciudadanos y opinión (texto argumentativo)", "relaciones humanas en el teatro y la literatura (género dramático)"],
          '2M': ["sobre la ausencia: exilio, migración e identidad", "ciudadanía y trabajo", "lo divino y lo humano", "poder y ambición", "Tiempo estimado: Tiempo estimado: Tiempo estimado: Tiempo estimado:", "sobre la ausencia: exilio, migración e identidad (narrativa)", "ciudadanía y trabajo (medios de comunicación)", "ObjetivOs de AprendizAje indicAdOres de evAluAción", "lo divino y lo humano (género lírico)", "poder y ambición (género dramático)"],
          '3M': ["Lectura", "Escritura", "Comunicación oral"],
          '4M': ["Lectura", "Escritura", "Comunicación oral"]
        },
        oas: {
          '1M': [
            {codigo:"OA1",eje:"",desc:"Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con sus preferencias y"},
            {codigo:"OA2",eje:"",desc:"Reflexionar sobre las diferentes dimensiones de la experiencia humana, propia y ajena, a partir de l"},
            {codigo:"OA3",eje:"",desc:"Analizar las narraciones leídas para enriquecer su comprensión, considerando, cuando sea pertinente"},
            {codigo:"OA4",eje:"",desc:"Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando sea pertinente"},
            {codigo:"OA5",eje:"",desc:"Analizar los textos dramáticos leídos o vistos, para enriquecer su comprensión, considerando, cuando"},
            {codigo:"OA6",eje:"",desc:"Comprender la visión de mundo que se expresa a través de las tragedias leídas, considerando sus cara"},
            {codigo:"OA7",eje:"",desc:"Comprender la relevancia de las obras del Romanticismo, considerando sus características y el contex"},
            {codigo:"OA8",eje:"",desc:"Formular una interpretación de los textos literarios leídos o vistos, que sea coherente con su análi"},
            {codigo:"OA9",eje:"",desc:"Analizar y evaluar textos con finalidad argumentativa, como columnas de opinión, cartas, discursos y"},
            {codigo:"OA10",eje:"",desc:"Analizar y evaluar textos de los medios de comunicación, como noticias, reportajes, cartas al direct"},
            {codigo:"OA11",eje:"",desc:"Leer y comprender textos no literarios para contextualizar y complementar las lecturas literarias re"},
            {codigo:"OA12",eje:"",desc:"Aplicar flexiblemente y creativamente las habilidades de escritura adquiridas en clases como medio d"},
            {codigo:"OA13",eje:"",desc:"Escribir, con el propósito de explicar un tema, textos de diversos géneros (por ejemplo, artículos"},
            {codigo:"OA14",eje:"",desc:"Escribir, con el propósito de persuadir, textos de diversos géneros, en particular ensayos sobre los"},
            {codigo:"OA15",eje:"",desc:"Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto, el destinatar"},
            {codigo:"OA16",eje:"",desc:"Usar consistentemente el estilo directo y el indirecto en textos escritos y orales"},
            {codigo:"OA17",eje:"",desc:"Usar en sus textos recursos de correferencia léxica compleja, empleando adecuadamente la metáfora y"},
            {codigo:"OA18",eje:"",desc:"Escribir correctamente para facilitar la comprensión al lector"},
            {codigo:"OA19",eje:"",desc:"Comprender, comparar y evaluar textos orales y audiovisuales tales como exposiciones, discursos, doc"},
            {codigo:"OA20",eje:"",desc:"Resumir un discurso argumentativo escuchado, explicando y evaluando los argumentos usados por el emi"},
            {codigo:"OA21",eje:"",desc:"Dialogar constructivamente para debatir o explorar ideas"},
            {codigo:"OA22",eje:"",desc:"Expresarse frente a una audiencia de manera clara y adecuada a la situación para comunicar temas de"},
            {codigo:"OA23",eje:"",desc:"Analizar los posibles efectos de los elementos lingüísticos, paralingüísticos"},
            {codigo:"OA24",eje:"",desc:"Realizar investigaciones sobre diversos temas para complementar sus lecturas o responder interrogant"}
          ],
          '2M': [
            {codigo:"OA1",eje:"",desc:"Leer habitualmente para aprender y recrearse, y seleccionar textos de acuerdo con sus"},
            {codigo:"OA2",eje:"",desc:"Reflexionar sobre las diferentes dimensiones de la experiencia humana, propia y ajena, a"},
            {codigo:"OA3",eje:"",desc:"Analizar las narraciones leídas para enriquecer su comprensión, considerando"},
            {codigo:"OA4",eje:"",desc:"Analizar los poemas leídos para enriquecer su comprensión, considerando, cuando sea pertinente"},
            {codigo:"OA5",eje:"",desc:"Analizar los textos dramáticos leídos o vistos, para enriquecer su comprensión, considerando, cuando"},
            {codigo:"OA6",eje:"",desc:"Comprender la relevancia de las obras del Siglo de Oro, considerando sus características y el contex"},
            {codigo:"OA7",eje:"",desc:"En las distintas actividades"},
            {codigo:"OA8",eje:"",desc:"Formular una interpretación de los textos literarios leídos o vistos, que sea coherente"},
            {codigo:"OA9",eje:"",desc:"Analizar y evaluar textos con finalidad argumentativa, como columnas de opinión, cartas al director"},
            {codigo:"OA10",eje:"",desc:"Analizar y evaluar textos de los medios de comunicación, como noticias, reportajes, cartas al direct"},
            {codigo:"OA11",eje:"",desc:"Leer y comprender textos no literarios para contextualizar y complementar las lecturas literarias re"},
            {codigo:"OA12",eje:"",desc:"Aplicar flexiblemente y creativamente las habilidades de escritura adquiridas en clases como medio d"},
            {codigo:"OA13",eje:"",desc:"Escribir, con el propósito de explicar un tema, textos de diversos géneros (por ejemplo, artículos"},
            {codigo:"OA14",eje:"",desc:"Escribir, con el propósito de persuadir, textos de diversos géneros, en particular ensayos sobre los"},
            {codigo:"OA15",eje:"",desc:"Planificar, escribir, revisar, reescribir y editar sus textos en función del contexto, el destinatar"},
            {codigo:"OA16",eje:"",desc:"Usar consistentemente el estilo directo y el indirecto en textos escritos y orales"},
            {codigo:"OA17",eje:"",desc:"Emplear frases nominales complejas como recurso para compactar la información y establecer correfere"},
            {codigo:"OA18",eje:"",desc:"Escribir correctamente para facilitar la comprensión al lector"},
            {codigo:"OA19",eje:"",desc:"Comprender, comparar y evaluar textos orales y audiovisuales tales como exposiciones, discursos, doc"},
            {codigo:"OA20",eje:"",desc:"Evaluar el punto de vista de un emisor, su razonamiento y uso de recursos retóricos (vocabulario, or"},
            {codigo:"OA21",eje:"",desc:"Dialogar constructivamente para debatir o explorar ideas"},
            {codigo:"OA22",eje:"",desc:"Expresarse frente a una audiencia de manera clara y adecuada a la situación para comunicar temas de"},
            {codigo:"OA23",eje:"",desc:"Analizar los posibles efectos de los elementos lingüísticos, paralingüísticos y no lingüísticos que"},
            {codigo:"OA24",eje:"",desc:"Realizar investigaciones sobre diversos temas para complementar sus lecturas o responder interrogant"}
          ],
          '3M': [
            {codigo:"OA9",eje:"",desc:"Investigar sobre diversos temas"}
          ],
          '4M': [
            {codigo:"OA9",eje:"",desc:"Investigar sobre diversos temas"}
          ]
        }
      },
      {
        nombre: 'Matemática',
        sigla:  'MAT',
        color:  '#10b981',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ["Números y Álgebra", "Geometría", "Probabilidad y Estadística"],
          '2M': ["Números y Álgebra", "Geometría", "Probabilidad y Estadística"],
          '3M': ["Números y Álgebra", "Geometría", "Probabilidad y Estadística"],
          '4M': ["Números y Álgebra", "Geometría", "Probabilidad y Estadística"]
        },
        oas: {
          '1M': [
            {codigo:"OA1",eje:"",desc:"Calcular operaciones con números racionales en forma simbólica"},
            {codigo:"OA2",eje:"",desc:"La unidad. El propósito es"},
            {codigo:"OA3",eje:"",desc:"Desarrollar los productos notables de manera concreta, pictórica y simbólica"},
            {codigo:"OA4",eje:"",desc:"Verifican que una sola ecuación en dos"},
            {codigo:"OA5",eje:"",desc:"Elaboran tablas y gráficos para ecuaciones"},
            {codigo:"OA6",eje:"",desc:"Desarrollar la fórmula de los valores del área y del perímetro de sectores y segmentos circulares, r"},
            {codigo:"OA7",eje:"",desc:"Desarrollar las fórmulas para encontrar el área de la superficie y el volumen del cono"},
            {codigo:"OA8",eje:"",desc:"En las Bases Curriculares"},
            {codigo:"OA9",eje:"",desc:"Desarrollar el teorema de Tales mediante las propiedades de la homotecia, para aplicarlo en la resol"},
            {codigo:"OA10",eje:"",desc:"Aplicar propiedades de semejanza y de proporcionalidad a modelos a escala y otras situaciones de la"},
            {codigo:"OA11",eje:"",desc:"Representar el concepto de homotecia de forma vectorial, relacionándolo con el producto de un vector"},
            {codigo:"OA12",eje:"",desc:"Realizan en su entorno encuestas preguntando"},
            {codigo:"OA13",eje:"",desc:"Comparar poblaciones mediante la confección de gráficos “xy” para dos atributos de muestras, de mane"},
            {codigo:"OA14",eje:"",desc:"Desarrollar las reglas de las probabilidades, la regla aditiva, la regla multiplicativa y la combina"},
            {codigo:"OA15",eje:"",desc:"Mostrar que comprenden el concepto de azar"},
            {codigo:"OA17",eje:"",desc:"De 1º medio"},
            {codigo:"OA20",eje:"",desc:"De 1º medio"}
          ],
          '2M': [
            {codigo:"OA1",eje:"",desc:"Reconocen números cuyo desarrollo decimal"},
            {codigo:"OA2",eje:"",desc:"Relacionan y caracterizan las raíces por"},
            {codigo:"OA3",eje:"",desc:"Mostrar que comprenden la función cuadrática f(x)= ax2 + bx + c (a ≠ 0)"},
            {codigo:"OA4",eje:"",desc:"Resolver, de manera concreta, pictórica y simbólica o usando herramientas tecnológicas, ecuaciones c"},
            {codigo:"OA5",eje:"",desc:"Mostrar que comprenden la inversa de una función"},
            {codigo:"OA6",eje:"",desc:"Son los OA especificados"},
            {codigo:"OA7",eje:"",desc:"Relacionan medidas de contenidos en envases"},
            {codigo:"OA8",eje:"",desc:"Mostrar que comprenden las razones trigonométricas de seno, coseno y tangente en triángulos rectángu"},
            {codigo:"OA9",eje:"",desc:"Aplicar las razones trigonométricas en diversos contextos en la composición y descomposición de vect"},
            {codigo:"OA10",eje:"",desc:"Mostrar que comprenden las variables aleatorias finitas"},
            {codigo:"OA11",eje:"",desc:"De 8° básico"},
            {codigo:"OA12",eje:"",desc:"Mostrar que comprenden el rol de la probabilidad en la sociedad"},
            {codigo:"OA20",eje:"",desc:"De 1° medio"}
          ],
          '3M': [
            {codigo:"OA2",eje:"",desc:"Tomar OA 3: Aplicar modelos OA 4: Resolver OA 1. Resolver"},
            {codigo:"OA3",eje:"",desc:"Aplicar modelos matemáticos que describen fenómenos o situaciones de crecimiento y"},
            {codigo:"OA4",eje:"",desc:"Resolver problemas de geometría euclidiana que involucran relaciones métricas entre ángulos"}
          ],
          '4M': [
            {codigo:"OA1",eje:"",desc:"Fundamentar decisiones en el ámbito financiero y económico personal o comunitario, a"},
            {codigo:"OA2",eje:"",desc:"Fundamentar OA 1: Fundamentar OA 3: Construir modelos de OA 4: Resolver"},
            {codigo:"OA3",eje:"",desc:"Construir modelos de situaciones o fenómenos de crecimiento, decrecimiento y periódicos"}
          ]
        }
      },
      {
        nombre: 'Historia, Geografía y CS',
        sigla:  'HCS',
        color:  '#8b5cf6',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Civilizaciones antiguas','Medioevo y mundo moderno','Chile colonial'],
          '2M': ['Revoluciones e independencias','Chile siglo XIX','Imperialismo'],
          '3M': ['Chile y el mundo en el siglo XX','Totalitarismos','Guerra Fría'],
          '4M': ['Chile democrático','Globalización','DDHH y ciudadanía global']
        }
      },
      {
        nombre: 'Biología',
        sigla:  'BIO',
        color:  '#22c55e',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Célula y sus procesos','Organismos y ambiente','Herencia y reproducción'],
          '2M': ['Genética molecular','Evolución','Ecosistemas y biodiversidad'],
          '3M': ['Fisiología humana','Neurociencia básica','Biotecnología'],
          '4M': ['Ecología y sustentabilidad','Biología molecular avanzada','Biotecnología y ética']
        }
      },
      {
        nombre: 'Física',
        sigla:  'FIS',
        color:  '#f97316',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Cinemática','Dinámica newtoniana','Trabajo y energía'],
          '2M': ['Fluidos','Termodinámica','Ondas y sonido'],
          '3M': ['Electricidad y magnetismo','Óptica','Física moderna básica'],
          '4M': ['Electromagnetismo','Relatividad especial','Física cuántica básica']
        }
      },
      {
        nombre: 'Química',
        sigla:  'QUI',
        color:  '#a855f7',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Estructura atómica','Tabla periódica','Enlace químico','Reacciones básicas'],
          '2M': ['Estequiometría','Soluciones','Termoquímica','Química orgánica básica'],
          '3M': ['Equilibrio químico','Electroquímica','Química orgánica funcional'],
          '4M': ['Química ambiental','Bioquímica básica','Polímeros y materiales']
        }
      },
      {
        nombre: 'Inglés',
        sigla:  'ING',
        color:  '#0ea5e9',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Identity and Belonging','Community and Society','Science and Innovation'],
          '2M': ['Arts and Expression','Environment and Sustainability','Work and Career'],
          '3M': ['Global Challenges','Culture and Diversity','Technology and Future'],
          '4M': ['Independent Reading','Academic Writing','Communication and Media']
        }
      },
      {
        nombre: 'Educación Física',
        sigla:  'EF',
        color:  '#ef4444',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Capacidades físicas','Deporte y salud','Vida activa adolescente'],
          '2M': ['Entrenamiento personalizado','Deportes de conjunto','Bienestar integral'],
          '3M': ['Plan de actividad física','Deportes de aventura','Salud y rendimiento'],
          '4M': ['Proyecto de vida activa','Liderazgo deportivo','Actividad física para la vida']
        }
      },
      {
        nombre: 'Artes Visuales',
        sigla:  'AV',
        color:  '#f472b6',
        niveles: ['1M','2M'],
        unidades: {
          '1M': ['Lenguaje visual contemporáneo','Arte y patrimonio','Proyecto artístico'],
          '2M': ['Arte latinoamericano y chileno','Diseño y comunicación visual','Proyecto final']
        }
      },
      {
        nombre: 'Música',
        sigla:  'MUS',
        color:  '#6366f1',
        niveles: ['1M','2M'],
        unidades: {
          '1M': ['Músicas del mundo','Creación e interpretación','Análisis musical'],
          '2M': ['Música chilena e identidad','Proyecto musical','Música y tecnología']
        }
      },
      {
        nombre: 'Filosofía',
        sigla:  'FIL',
        color:  '#78716c',
        niveles: ['3M','4M'],
        unidades: {
          '3M': ['¿Qué es la filosofía?','Epistemología','Ética y moral','Lógica básica'],
          '4M': ['Filosofía política','Filosofía del lenguaje','Estética','Proyecto filosófico']
        }
      },
      {
        nombre: 'Orientación y Bienestar',
        sigla:  'ORI',
        color:  '#14b8a6',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje'],
          '2M': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje'],
          '3M': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje'],
          '4M': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje']
        },
        oas: {
          '1M': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Comparar distintas alternativas posibles de sus proyectos de vida considerando intereses, condiciones, capacidades y cómo las propias decisiones influyen en su realización."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Analizar temáticas relacionadas con la sexualidad y los vínculos afectivos en función de valores como el respeto, la responsabilidad y el cuidado de sí mismo y de los demás."},
            {codigo:"OA3",eje:"Bienestar y Autocuidado",desc:"Evaluar situaciones de riesgo relacionadas con consumo de sustancias, conductas sexuales riesgosas y violencia, e identificar y recurrir a redes de apoyo disponibles."},
            {codigo:"OA4",eje:"Bienestar y Autocuidado",desc:"Promover y llevar a cabo acciones que favorezcan la vida saludable a nivel personal y social, manifestando interés ante problemas de salud en su entorno."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Promover relaciones interpersonales constructivas, presenciales y virtuales, considerando principios de igualdad, dignidad, inclusión y no discriminación."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Discriminar alternativas para la resolución de conflictos en un marco de derechos, promoviendo acuerdos que beneficien a todas las personas involucradas."},
            {codigo:"OA7",eje:"Pertenencia y Participación",desc:"Evaluar instancias de participación en el entorno social e institucional cercano donde puedan contribuir a la resolución de problemáticas como sujetos de derecho."},
            {codigo:"OA8",eje:"Pertenencia y Participación",desc:"Desarrollar iniciativas orientadas a promover el respeto, la justicia, el buen trato y el bien común en el curso y la comunidad."},
            {codigo:"OA9",eje:"Gestión del Aprendizaje",desc:"Contrastar posibles caminos en el desarrollo del proyecto de vida considerando opciones laborales y académicas, y reconociendo habilidades e intereses propios."},
            {codigo:"OA10",eje:"Gestión del Aprendizaje",desc:"Diseñar aspectos del proyecto de vida considerando habilidades, motivaciones, metas personales y opciones académicas y laborales disponibles."}
          ],
          '2M': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Comparar distintas alternativas posibles de sus proyectos de vida considerando intereses, condiciones, capacidades y cómo las propias decisiones influyen en su realización."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Analizar temáticas relacionadas con la sexualidad y los vínculos afectivos en función de valores como el respeto, la responsabilidad y el cuidado de sí mismo y de los demás."},
            {codigo:"OA3",eje:"Bienestar y Autocuidado",desc:"Evaluar situaciones de riesgo relacionadas con consumo de sustancias, conductas sexuales riesgosas y violencia, e identificar y recurrir a redes de apoyo disponibles."},
            {codigo:"OA4",eje:"Bienestar y Autocuidado",desc:"Promover y llevar a cabo acciones que favorezcan la vida saludable a nivel personal y social, manifestando interés ante problemas de salud en su entorno."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Promover relaciones interpersonales constructivas, presenciales y virtuales, considerando principios de igualdad, dignidad, inclusión y no discriminación."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Discriminar alternativas para la resolución de conflictos en un marco de derechos, promoviendo acuerdos que beneficien a todas las personas involucradas."},
            {codigo:"OA7",eje:"Pertenencia y Participación",desc:"Evaluar instancias de participación en el entorno social e institucional cercano donde puedan contribuir a la resolución de problemáticas como sujetos de derecho."},
            {codigo:"OA8",eje:"Pertenencia y Participación",desc:"Desarrollar iniciativas orientadas a promover el respeto, la justicia, el buen trato y el bien común en el curso y la comunidad."},
            {codigo:"OA9",eje:"Gestión del Aprendizaje",desc:"Contrastar posibles caminos en el desarrollo del proyecto de vida considerando opciones laborales y académicas, y reconociendo habilidades e intereses propios."},
            {codigo:"OA10",eje:"Gestión del Aprendizaje",desc:"Diseñar aspectos del proyecto de vida considerando habilidades, motivaciones, metas personales y opciones académicas y laborales disponibles."}
          ],
          '3M': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Reflexionar sobre la construcción de la propia identidad y el proyecto de vida en el contexto de la transición a la adultez, reconociendo sus fortalezas y desafíos."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Analizar la vivencia de la sexualidad y los vínculos afectivos desde una perspectiva de derechos, respeto mutuo y responsabilidad personal."},
            {codigo:"OA3",eje:"Bienestar y Autocuidado",desc:"Evaluar factores de protección y riesgo en su entorno personal y social, identificando estrategias para promover el bienestar personal y colectivo."},
            {codigo:"OA4",eje:"Bienestar y Autocuidado",desc:"Llevar a cabo acciones que favorezcan estilos de vida saludable, la integridad personal y el cuidado responsable del entorno."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Analizar dinámicas relacionales en distintos contextos, promoviendo relaciones basadas en el respeto, la empatía y la no violencia."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Aplicar estrategias de resolución de conflictos que promuevan el diálogo, la escucha activa y acuerdos justos para las personas involucradas."},
            {codigo:"OA7",eje:"Pertenencia y Participación",desc:"Reconocer y ejercer su rol como sujeto de derecho en instancias de participación ciudadana y democrática dentro y fuera del establecimiento."},
            {codigo:"OA8",eje:"Pertenencia y Participación",desc:"Desarrollar proyectos colectivos orientados a la mejora de la convivencia y el bien común en la comunidad escolar y local."},
            {codigo:"OA9",eje:"Gestión del Aprendizaje",desc:"Explorar opciones de continuación de estudios y trayectorias laborales, vinculándolas con sus propias capacidades, intereses y valores."},
            {codigo:"OA10",eje:"Gestión del Aprendizaje",desc:"Gestionar su proceso de aprendizaje de manera autónoma, estableciendo metas, evaluando logros y ajustando sus estrategias de estudio."}
          ],
          '4M': [
            {codigo:"OA1",eje:"Crecimiento Personal",desc:"Elaborar una visión integrada de sí mismo como base para la transición a la vida adulta, considerando el proyecto de vida en sus distintas dimensiones."},
            {codigo:"OA2",eje:"Crecimiento Personal",desc:"Analizar la vivencia de la sexualidad, los vínculos afectivos y la identidad con énfasis en la responsabilidad, el respeto y el bienestar propio y ajeno."},
            {codigo:"OA3",eje:"Bienestar y Autocuidado",desc:"Evaluar críticamente los factores que inciden en el bienestar personal y social, y diseñar estrategias para afrontar situaciones de riesgo en la vida adulta."},
            {codigo:"OA4",eje:"Bienestar y Autocuidado",desc:"Promover estilos de vida saludable en la comunidad, integrando hábitos de autocuidado sostenibles y responsabilidad hacia el entorno social y natural."},
            {codigo:"OA5",eje:"Relaciones Interpersonales",desc:"Analizar críticamente dinámicas de poder y género en las relaciones interpersonales, promoviendo vínculos basados en la igualdad y el respeto mutuo."},
            {codigo:"OA6",eje:"Relaciones Interpersonales",desc:"Aplicar de manera autónoma estrategias avanzadas de resolución de conflictos que promuevan la justicia, la empatía y el bien común."},
            {codigo:"OA7",eje:"Pertenencia y Participación",desc:"Ejercer una ciudadanía activa, participando en instancias democráticas y contribuyendo a la construcción de comunidades más justas e inclusivas."},
            {codigo:"OA8",eje:"Pertenencia y Participación",desc:"Liderar o participar en proyectos de impacto social que reflejen sus valores cívicos y compromiso con el bien común en la comunidad."},
            {codigo:"OA9",eje:"Gestión del Aprendizaje",desc:"Diseñar su proyecto de continuación de estudios o trayectoria laboral, tomando decisiones fundamentadas en sus habilidades, intereses y valores."},
            {codigo:"OA10",eje:"Gestión del Aprendizaje",desc:"Consolidar hábitos de aprendizaje autónomo y reflexivo que le permitan continuar aprendiendo a lo largo de la vida en distintos contextos."}
          ]
        }
      },
      {
        nombre: 'Educación Ciudadana',
        sigla:  'EC',
        color:  '#dc2626',
        niveles: ['3M','4M'],
        unidades: {
          '3M': ['Democracia y participación','Sistema político chileno','DDHH'],
          '4M': ['Instituciones del Estado','Chile y el mundo','Proyecto ciudadano']
        }
      },
      {
        nombre: 'Educación Tecnológica',
        sigla:  'TEC',
        color:  '#64748b',
        niveles: ['1M','2M'],
        unidades: {
          '1M': ['Desarrollo e implementación de un servicio','Evolución e impacto de una solución'],
          '2M': ['Mejorando el uso de los recursos','Oportunidades y desafíos de la tecnología en la actualidad']
        },
        oas: {
          '1M': [
            {codigo:"OA1",eje:"Resolución de Problemas Tecnológicos",desc:"Identificar oportunidades o necesidades personales, grupales o locales que impliquen la creación de un servicio, utilizando recursos digitales u otros medios."},
            {codigo:"OA2",eje:"Resolución de Problemas Tecnológicos",desc:"Desarrollar un servicio que implique la utilización de recursos digitales u otros medios, considerando aspectos éticos, sus potenciales impactos y normas de cuidado y seguridad."},
            {codigo:"OA3",eje:"Resolución de Problemas Tecnológicos",desc:"Evaluar el servicio desarrollado considerando criterios propios, técnicos y valóricos, y proponer mejoras asociadas tanto a los procesos como al producto final."},
            {codigo:"OA4",eje:"Resolución de Problemas Tecnológicos",desc:"Comunicar el diseño, la planificación u otros procesos del desarrollo de un servicio, utilizando herramientas TIC, considerando diferentes tipos de objetivos y audiencias y teniendo en cuenta aspectos éticos."},
            {codigo:"OA5",eje:"Tecnología, Ambiente y Sociedad",desc:"Analizar las formas en que los productos tecnológicos y los entornos evolucionan, caracterizando los diversos factores que influyen en ese cambio."},
            {codigo:"OA6",eje:"Tecnología, Ambiente y Sociedad",desc:"Inferir, basándose en la evolución de los productos tecnológicos y los entornos, los efectos positivos o negativos que estos han tenido en la sociedad."}
          ],
          '2M': [
            {codigo:"OA1",eje:"Resolución de Problemas Tecnológicos",desc:"Identificar necesidades que impliquen la reducción de efectos perjudiciales relacionados con el uso de recursos energéticos y materiales en una perspectiva de sustentabilidad."},
            {codigo:"OA2",eje:"Resolución de Problemas Tecnológicos",desc:"Proponer soluciones que apunten a resolver necesidades de reducción de efectos perjudiciales relacionados con el uso de recursos energéticos y materiales en una perspectiva de sustentabilidad, utilizando herramientas TIC colaborativas de producción, edición, publicación y comunicación."},
            {codigo:"OA3",eje:"Resolución de Problemas Tecnológicos",desc:"Evaluar las propuestas de soluciones que apunten a resolver necesidades de reducción de efectos perjudiciales relacionados con el uso de recursos energéticos y materiales, considerando aspectos o dilemas éticos, legales, económicos, ambientales y sociales."},
            {codigo:"OA4",eje:"Resolución de Problemas Tecnológicos",desc:"Comunicar propuestas de soluciones para reducir los efectos perjudiciales proyectando posibles escenarios de cambio y sus impactos, utilizando herramientas TIC, considerando diferentes tipos de objetivos y audiencias, teniendo en cuenta aspectos éticos y aplicando normas de cuidado y seguridad."},
            {codigo:"OA5",eje:"Tecnología, Ambiente y Sociedad",desc:"Evaluar críticamente cómo las innovaciones tecnológicas actuales afectan a la sociedad y al ambiente, considerando criterios éticos, económicos, ambientales y sociales."},
            {codigo:"OA6",eje:"Tecnología, Ambiente y Sociedad",desc:"Proyectar escenarios de posibles impactos positivos y/o negativos de las innovaciones tecnológicas actuales en ámbitos personales, sociales, ambientales, legales, económicos u otros."}
          ]
        }
      }
    ]
  };

  // ════════════════════════════════════════════════════════════
  //  ELECTIVOS MEDIA (3° y 4° Medio)
  // ════════════════════════════════════════════════════════════
  var electivosMedia = {
    lenguaje: [
      {
        key:    "lec_esp",
        nombre: "Lectura y Escritura Especializadas",
        nivel:  "3º-4º Medio",
        ejes:   ["Unidad 1.", "Actividad 1:", "El profesor plantea una pregunta para sacar conclusiones a partir de la información de la tabla. Para", "A modo de ejemplo se muestra la siguiente síntesis para ilustrarla."],
        oas:    [{codigo:"OA1",desc:"Producir textos pertenecientes a diversos géneros discursivos académicos, en los cuales se"}, {codigo:"OA2",desc:"Participar de manera activa en procesos colaborativos de producción de textos especializados"}, {codigo:"OA3",desc:"Utilizar diversas estrategias para registrar y procesar información obtenida en soportes"}, {codigo:"OA4",desc:"Utilizar diversas estrategias para construir y transformar el conocimiento por escrito, en"}, {codigo:"OA5",desc:"Buscar, evaluar y seleccionar rigurosamente fuentes disponibles en soportes impresos y"}]
      },
      {
        key:    "part_dem",
        nombre: "Participación y Argumentación en Democracia",
        nivel:  "3º-4º Medio",
        ejes:   ["UNIDAD 2 UNIDAD 3", "Formación Diferenciada Humanístico-Científica"],
        oas:    [{codigo:"OA1",desc:"Construir colectivamente conclusiones, soluciones, preguntas, hipótesis o acuerdos que surjan"}, {codigo:"OA2",desc:"Dialogar argumentativamente, privilegiando el componente racional de la argumentación"}, {codigo:"OA3",desc:"Evaluar diversas formas en que se legitima el conocimiento en los discursos (investigación"}, {codigo:"OA4",desc:"Elaborar argumentos basándose en evidencias o información pública legitimada pertinentes al"}, {codigo:"OA5",desc:"Utilizar formas de argumentación y de legitimación del conocimiento, pertinentes al ámbito de"}, {codigo:"OA6",desc:"Evaluar críticamente argumentaciones surgidas en distintos ámbitos de la sociedad, enfocándose"}, {codigo:"OA7",desc:"Construir una postura personal sobre diversos temas controversiales y problemáticas de la"}]
      },
      {
        key:    "taller_lit",
        nombre: "Taller de Literatura",
        nivel:  "3º Medio",
        ejes:   ["Formación General", "Construyamos Transformemos Aprendamos a crear Conozcamos nuevos", "Construyamos trayectorias de lectura", "Transformemos experiencias reales"],
        oas:    [{codigo:"OA1",desc:"Producir diversos géneros escritos y audiovisuales para desarrollar y comunicar sus interpretaciones"}, {codigo:"OA2",desc:"Producir textos pertenecientes a diversos géneros discursivos de la literatura que den cuenta de sus"}, {codigo:"OA3",desc:"Contribuir con sus comentarios, sugerencias, interpretaciones y críticas a los procesos de lectura"}, {codigo:"OA4",desc:"Revisar y reescribir sus propias producciones (escritas, orales o audiovisuales), a la luz de los"}, {codigo:"OA5",desc:"De las obras leídas"}, {codigo:"OA6",desc:"Producir textos y otras producciones que den cuenta de sus reflexiones sobre sí mismos y sobre"}]
      }
    ],
    historia: [
      {
        key:    "cla",
        nombre: "Chile y la Región Latinoamericana",
        nivel:  "3° o 4° Medio electivo",
        ejes:   ["Conocimiento y comprensión","Habilidades","Actitudes"],
        unidades: ['Evaluación crítica de los procesos políticos de la historia reciente latinoamericana','Los desafíos medioambientales en América Latina','Diagnosticando el presente de los pueblos indígenas en Chile y América Latina','Economía, sociedad y cultura: los grandes desafíos en el siglo XXI'],
        oas:    [
          {codigo:"OA1",desc:"Analizar procesos sociales y culturales recientes de Chile y América Latina tales como migraciones, cambios demográficos y urbanización, considerando avances y desafíos comunes en materia de equidad, diversidad e interculturalidad."},
          {codigo:"OA2",desc:"Explicar procesos comunes de los Estados latinoamericanos en la historia política reciente, incluyendo la relación entre el poder civil y las fuerzas armadas, transiciones, la defensa y promoción de los derechos humanos y el fortalecimiento de las democracias."},
          {codigo:"OA3",desc:"Investigar cómo en América Latina los Estados responden a desafíos económicos y sociales, como pobreza, desigualdad, crecimiento económico, desarrollo social y diversificación de la matriz productiva, aplicando conceptos de la economía e información de fuentes e indicadores económicos (PIB, distribución del ingreso, empleo y producción, entre otros)."},
          {codigo:"OA4",desc:"Analizar, a partir de distintas interpretaciones y perspectivas, el presente de distintos pueblos indígenas de Chile y Latinoamérica, considerando su cultura, los procesos históricos recientes y los avances y desafíos en su relación con los Estados nacionales de la región."},
          {codigo:"OA5",desc:"Evaluar, a partir de la investigación, el estado del medioambiente en Chile y América Latina, incluyendo efectos de distintas actividades humanas y acciones emprendidas por los Estados de la región para avanzar en sustentabilidad."},
          {codigo:"OA6",desc:"Analizar las oportunidades que ofrece a los Estados de América Latina la integración y la cooperación internacional, examinando la conformación de bloques económicos y los tratados y acuerdos en materia de economía, derechos humanos, educación, género, salud y ciencia."},
          {codigo:"OA7",desc:"Participar en forma colaborativa en el diseño de propuestas para dar solución a problemas presentes a nivel local relacionadas con temas abordados en el nivel."}
        ]
      },
      {
        key:    "mug",
        nombre: "Mundo Global",
        nivel:  "3° o 4° Medio electivo",
        ejes:   ["Conocimiento y comprensión","Habilidades","Actitudes"],
        unidades: ['Los desafíos de los procesos migratorios para el Estado-nación','Los conflictos internacionales y su impacto en la economía','Las decisiones económicas, los actores y el cambio climático','Cambio climático y desastres socio-naturales'],
        oas:    [
          {codigo:"OA1",desc:"Analizar procesos migratorios contemporáneos en distintas regiones del mundo considerando múltiples causas, principales características, impactos en la sociedad de origen y de destino, y los desafíos para las sociedades y los Estados nacionales."},
          {codigo:"OA2",desc:"Investigar algunos aspectos de la economía global actual como cambios en la producción y en el mercado del trabajo, el rol del comercio mundial y del mercado financiero, y nuevas formas de consumo, aplicando conceptos de la economía (escasez, oferta y demanda, precio, balanza comercial, entre otros)."},
          {codigo:"OA3",desc:"Explicar el cambio climático como fenómeno global, incluyendo controversias sobre sus múltiples causas, los grados de responsabilidad de distintos actores y sus principales consecuencias para la población."},
          {codigo:"OA4",desc:"Analizar, por medio de la investigación, desastres socionaturales, considerando amenazas naturales, el papel de la sociedad y el Estado en la prevención y gestión del riesgo, factores que inciden en la vulnerabilidad de la población y avances de Chile y otros países en la materia."},
          {codigo:"OA5",desc:"Explicar, por medio de la investigación, transformaciones del Estado-nación en la actualidad, en relación con aspectos como la ciudadanía en un mundo cada vez más interconectado, la internacionalización de la economía y la relación con otros Estados y organismos intergubernamentales."},
          {codigo:"OA6",desc:"Analizar algunos conflictos internacionales que involucran a Estados nacionales, sociedades o grupos, explicando sus contextos, posibilidades de resolución y aplicando conceptos de la ciencia política como poder, soberanía, ideología, derechos humanos, opinión pública entre otros."},
          {codigo:"OA7",desc:"Participar en forma colaborativa en el diseño de propuestas para dar solución a problemas presentes a nivel local relacionadas con temas abordados en el nivel."}
        ]
      }
    ],
    matematica: [
      {
        key:    "geo3d",
        nombre: "Geometría 3D",
        nivel:  "3° o 4° Medio electivo",
        ejes:   ["Geometría Espacial"],
        unidades: ['Representación vectorial de situaciones y fenómenos','Generación de cuerpos utilizando patrones geométricos','Rectas y planos en el espacio','Los objetos con sus caras y perspectivas'],
        oas:    [
          {codigo:"OA1",desc:"Argumentar acerca de la validez de soluciones a situaciones que involucren isometrías y homotecias en el plano, haciendo uso de vectores y de representaciones digitales."},
          {codigo:"OA2",desc:"Resolver problemas que involucren puntos, rectas y planos en el espacio 3D, haciendo uso de vectores e incluyendo representaciones digitales."},
          {codigo:"OA3",desc:"Resolver problemas que involucren relaciones entre figuras 3D y 2D en las que intervengan vistas, cortes, proyecciones en el plano o la inscripción de figuras 3D en otras figuras tridimensionales."},
          {codigo:"OA4",desc:"Formular y verificar conjeturas acerca de la forma, área y volumen de figuras 3D generadas por rotación o traslación de figuras planas en el espacio, incluyendo el uso de herramientas tecnológicas digitales."},
          {codigo:"OA5",desc:"Diseñar propuestas y resolver problemas relacionados con perspectiva, proyección paralela y central, puntos de fuga y elevaciones, tanto en arte como en arquitectura, diseño o construcción, aplicando conceptos y procedimientos de la geometría 3D."}
        ]
      },
      {
        key:    "calculo",
        nombre: "calculo",
        nivel:  "3° y 4° Medio electivo",
        ejes:   ["Límites", "Derivadas", "Integrales"],
        oas:    [{codigo:"OA1",desc:"Utilizar OA 2. Argumentar OA 3. Modelar OA 5. Modelar"}, {codigo:"OA2",desc:"Argumentar acerca de la existencia de límites de funciones en el infinito y en un punto para"}, {codigo:"OA4",desc:"Resolver"}]
      },
      {
        key:    "pens_comp",
        nombre: "pens_comp",
        nivel:  "3° y 4° Medio electivo",
        ejes:   ["Pensamiento Computacional"],
        oas:    [{codigo:"OA1",desc:"Aplicar"}, {codigo:"OA2",desc:"Representar OA 4. Crear OA 5. Desarrollar"}, {codigo:"OA3",desc:"Desarrollar y OA 6. Utilizar la"}, {codigo:"OA4",desc:"Crear aplicaciones y realizar análisis mediante procesadores simbólicos, de geometría dinámica"}]
      },
      {
        key:    "prob_est",
        nombre: "prob_est",
        nivel:  "3° y 4° Medio electivo",
        ejes:   ["Probabilidades", "Estadística Descriptiva", "Estadística Inferencial"],
        oas:    [{codigo:"OA1",desc:"Argumentar y OA 2. Resolver OA 3. Modelar OA 4. Argumentar"}, {codigo:"OA2",desc:"Resolver problemas que involucren los conceptos de media muestral, desviación estándar, varianza"}]
      }
    ]
  };

  // ════════════════════════════════════════════════════════════
  //  CATÁLOGO TP — metadatos por especialidad
  //  Los datos curriculares reales viven en window.CURRICULA_FULL
  //  (cargados desde js/curricula/tp/datos-*.js).  Este catálogo
  //  define display metadata y el mapeo legacyKey → fullKey para
  //  mantener compatibilidad con usuarios que tengan guardada la
  //  especialidad con el nombre antiguo (ej: "automotriz").
  // ════════════════════════════════════════════════════════════
  var TP_CATALOG = {
    'electricidad':        { nombre: 'Electricidad',           sigla: 'EL',  sector: 'Electricidad',             color: '#f59e0b', fullKey: 'electricidad' },
    'mecanica-automotriz': { nombre: 'Mecánica Automotriz',    sigla: 'MA',  sector: 'Mecánica',                 color: '#ef4444', fullKey: 'mecanica-automotriz' },
    'mecanica-industrial': { nombre: 'Mecánica Industrial',    sigla: 'MI',  sector: 'Mecánica',                 color: '#f97316', fullKey: 'mecanica-industrial' },
    'electronica':         { nombre: 'Electrónica',            sigla: 'EN',  sector: 'Electricidad',             color: '#10b981', fullKey: 'electronica' },
    'administracion':      { nombre: 'Administración',         sigla: 'ADM', sector: 'Administración y Comercio',color: '#3b82f6', fullKey: 'administracion' },
    'contabilidad':        { nombre: 'Contabilidad',           sigla: 'CO',  sector: 'Administración y Comercio',color: '#8b5cf6', fullKey: 'contabilidad' },
    'ventas':              { nombre: 'Ventas y Marketing',     sigla: 'VE',  sector: 'Administración y Comercio',color: '#14b8a6', fullKey: 'ventas' },
    'grafica':             { nombre: 'Gráfica',                sigla: 'GR',  sector: 'Gráfica',                  color: '#ec4899', fullKey: 'grafica' },
    'construccion':        { nombre: 'Construcción',           sigla: 'CONST',sector:'Construcción',             color: '#92400e', fullKey: 'construccion' }
  };

  // Alias para retrocompatibilidad con valores ya guardados en Firestore
  var TP_ALIASES = {
    'automotriz': 'mecanica-automotriz',
    'mecanica':   'mecanica-industrial',
    'industrial': 'mecanica-industrial'
  };

  function _resolveEspKey(key) {
    if (!key) return null;
    if (TP_CATALOG[key]) return key;
    if (TP_ALIASES[key] && TP_CATALOG[TP_ALIASES[key]]) return TP_ALIASES[key];
    return null;
  }

  // Adapta un módulo del formato CURRICULA_FULL (aes como dict OAx→{texto,nombre})
  // al formato esperado por el API legacy (aes como array [{num,nombre,texto}])
  function _adaptModulo(m) {
    var aesArr = [];
    if (m && m.aes && typeof m.aes === 'object') {
      Object.keys(m.aes).forEach(function(aeKey) {
        var ae = m.aes[aeKey] || {};
        var match = aeKey.match(/(\d+)/);
        var num = match ? parseInt(match[1], 10) : (aesArr.length + 1);
        aesArr.push({
          num:    num,
          nombre: ae.nombre || aeKey,
          texto:  ae.texto || ae.descripcion || (m.oas && m.oas[aeKey]) || ''
        });
      });
    }
    return {
      num:    m.num,
      nombre: m.nombre,
      nivel:  m.nivel,
      horas:  m.horas,
      aes:    aesArr
    };
  }

  // Construye el bloque `especialidades` en formato legacy a partir de
  // window.CURRICULA_FULL.  Se reconstruye en cada acceso para capturar
  // cargas de datos diferidas (scripts con defer/async).
  function _buildEspecialidades() {
    var out = {};
    var CF = (typeof window !== 'undefined' && window.CURRICULA_FULL) || {};
    Object.keys(TP_CATALOG).forEach(function(key) {
      var meta = TP_CATALOG[key];
      var full = CF[meta.fullKey];
      var modulos = [];
      if (full && full.modulos) {
        Object.keys(full.modulos).forEach(function(modKey) {
          modulos.push(_adaptModulo(full.modulos[modKey]));
        });
        // Orden natural por num (EL1, EL2, …)
        modulos.sort(function(a, b) {
          var na = parseInt((String(a.num).match(/\d+/) || [0])[0], 10);
          var nb = parseInt((String(b.num).match(/\d+/) || [0])[0], 10);
          return na - nb;
        });
      }
      out[key] = {
        nombre: meta.nombre,
        sigla:  meta.sigla,
        sector: meta.sector,
        color:  meta.color,
        especialidades: [{
          nombre:  meta.nombre,
          sigla:   meta.sigla,
          modulos: modulos
        }]
      };
    });
    return out;
  }

  // ════════════════════════════════════════════════════════════
  //  API pública — CURRICULA_CHILE
  // ════════════════════════════════════════════════════════════
  var api = {
    basica:         basica,
    planComun:      planComun,
    electivosMedia: electivosMedia,

    // ── Helpers ────────────────────────────────────────────────
    getAsignaturas: function(nivel) {
      if (nivel.endsWith('B')) return basica.asignaturas.filter(function(a) {
        return a.niveles.indexOf(nivel) !== -1;
      });
      if (nivel.endsWith('M')) return planComun.asignaturas.filter(function(a) {
        return a.niveles.indexOf(nivel) !== -1;
      });
      return [];
    },

    getOAs: function(asigSigla, nivel) {
      // Plan común es la fuente autoritativa. Si no tiene OAs para ese nivel
      // (oas[nivel] ausente o array vacío), caemos al legacy básica/planComun.
      if (typeof window !== 'undefined' && window.CURRICULA_PLAN_COMUN) {
        var PC  = window.CURRICULA_PLAN_COMUN;
        var key = (this._siglaToPlanComunKey
                    ? this._siglaToPlanComunKey(asigSigla)
                    : (asigSigla || '').toLowerCase());
        if (PC[key] && PC[key].oas && Array.isArray(PC[key].oas[nivel]) && PC[key].oas[nivel].length) {
          return PC[key].oas[nivel].map(function(o){
            var out = {
              codigo: o.codigo,
              descripcion: o.descripcion || o.desc || '',
              desc: o.desc || o.descripcion || '',
              eje: o.eje || 'General'
            };
            if (o.provisional) out.provisional = true;
            return out;
          });
        }
      }
      // Fallback legacy
      var arr = nivel.endsWith('B') ? basica.asignaturas : planComun.asignaturas;
      var asig = arr.find ? arr.find(function(a){ return a.sigla === asigSigla; }) : null;
      var oas = (asig && asig.oas && asig.oas[nivel]) || [];
      if (oas.length) {
        return oas.map(function(o){
          return {
            codigo: o.codigo,
            descripcion: o.descripcion || o.desc || '',
            desc: o.desc || o.descripcion || '',
            eje: o.eje || 'General'
          };
        });
      }
      return [];
    },

    // ── Helpers del Plan Común (delegación a CURRICULA_PLAN_COMUN) ──
    // Mapeo de siglas legacy → keys del plan común (reutilizado por varios helpers)
    _siglaToPlanComunKey: function(sigla) {
      var map = {
        'LEN': 'lenguaje',
        'MAT': 'matematica',
        'HCS': 'historia', 'HIS': 'historia',
        'CN':  'ciencias',
        'BIO': 'biologia',
        'FIS': 'fisica',
        'QUI': 'quimica',
        'ING': 'ingles',
        'EF':  'ed-fisica', 'EDF': 'ed-fisica',
        'ART': 'artes', 'AV': 'artes',
        'MUS': 'musica',
        'TEC': 'tecnologia',
        'ORI': 'orientacion',
        'CLA': 'chile-latam',
        'MUG': 'mundo-global',
        'FIL': 'filosofia',
        'EC':  'ed-ciudadana'
      };
      return map[sigla] || (sigla || '').toLowerCase();
    },

    // getUnidades(asigSigla, nivel) → array de unidades (strings u objetos)
    // El plan común nuevo es la fuente autoritativa. Si no tiene datos para
    // ese nivel, cae al legacy (basica/planComun.asignaturas).
    // Acepta tanto sigla canónica plan-común (HIS, EDF, ART) como alias legacy
    // (HCS, EF, AV) gracias al match por clave canónica.
    getUnidades: function(asigSigla, nivel) {
      if (!asigSigla || !nivel) return [];
      var self = this;
      var askedKey = self._siglaToPlanComunKey(asigSigla);
      // 1) Fuente autoritativa: plan común nuevo
      if (typeof window !== 'undefined' && window.CURRICULA_PLAN_COMUN) {
        var PC = window.CURRICULA_PLAN_COMUN;
        if (PC[askedKey] && PC[askedKey].unidades && PC[askedKey].unidades[nivel] && PC[askedKey].unidades[nivel].length) {
          return PC[askedKey].unidades[nivel];
        }
      }
      // 2) Fallback legacy (basica/planComun en este mismo archivo) — match
      //    por sigla exacta o por clave canónica (así HIS encuentra HCS, etc.)
      var arr = nivel.endsWith('B') ? basica.asignaturas : planComun.asignaturas;
      var asig = arr.find ? arr.find(function(a){
        if (a.sigla === asigSigla) return true;
        return askedKey && self._siglaToPlanComunKey(a.sigla) === askedKey;
      }) : null;
      if (asig && asig.unidades && asig.unidades[nivel] && asig.unidades[nivel].length) {
        return asig.unidades[nivel];
      }
      return [];
    },

    // getActitudes(asigSigla, nivelOtramo) — delega en getPlanComunActitudes si existe
    getActitudes: function(asigSigla, nivelOtramo) {
      if (typeof window !== 'undefined' && typeof window.getPlanComunActitudes === 'function') {
        var key = this._siglaToPlanComunKey(asigSigla);
        return window.getPlanComunActitudes(key, nivelOtramo) || [];
      }
      return [];
    },

    // getHabilidades(asigSigla, nivelOtramo) — delega en getPlanComunHabilidades si existe
    getHabilidades: function(asigSigla, nivelOtramo) {
      if (typeof window !== 'undefined' && typeof window.getPlanComunHabilidades === 'function') {
        var key = this._siglaToPlanComunKey(asigSigla);
        return window.getPlanComunHabilidades(key, nivelOtramo) || [];
      }
      return [];
    },

    // getOAT(tramoONivel) → objetivos de aprendizaje transversales (dimensiones)
    getOAT: function(tramoONivel) {
      if (typeof window !== 'undefined' && typeof window.getPlanComunOAT === 'function') {
        return window.getPlanComunOAT(tramoONivel) || [];
      }
      return [];
    },

    // getAsignaturas(tramo) → lista unificada de asignaturas para 'basica' o 'media'.
    // Fuente:
    //   1) Plan común (autoritativo) — incluye asignaturas FG que sólo viven ahí
    //      (p.ej. Filosofía, Educación Ciudadana en 3°-4° medio).
    //   2) Legacy (basica.asignaturas / planComun.asignaturas) como respaldo y
    //      para enriquecer color/nombre cuando el plan común no los trae.
    // Dedup por clave plan-común canónica (vía _siglaToPlanComunKey) para que
    // siglas divergentes (HCS↔HIS, EF↔EDF, AV↔ART) colapsen en una sola entrada.
    // Retorna [{ key, nombre, sigla, color, niveles }].
    getAsignaturas: function(tramo) {
      if (tramo !== 'basica' && tramo !== 'media') return [];
      var self = this;
      var seen = {};       // key canónica → índice en out
      var out  = [];
      var nivelRe = tramo === 'basica' ? /B$/ : /M$/;

      function canonKey(sigla) {
        return self._siglaToPlanComunKey
          ? self._siglaToPlanComunKey(sigla)
          : (sigla || '').toLowerCase();
      }

      // 1) Plan común primero (autoritativo)
      if (typeof window !== 'undefined' && window.CURRICULA_PLAN_COMUN) {
        var PC = window.CURRICULA_PLAN_COMUN;
        Object.keys(PC).forEach(function(key) {
          if (key === '_comun') return;
          var a = PC[key];
          if (!a || !a.sigla || !Array.isArray(a.niveles)) return;
          var niv = a.niveles.filter(function(n) { return nivelRe.test(n); });
          if (!niv.length) return;
          if (seen[key] !== undefined) return;
          seen[key] = out.length;
          out.push({
            key:     key,
            nombre:  a.nombre,
            sigla:   a.sigla,
            color:   a.color || null,
            niveles: niv
          });
        });
      }

      // 2) Fallback legacy — añade asignaturas faltantes y enriquece color/niveles
      var legacyArr = (tramo === 'basica' ? basica.asignaturas : planComun.asignaturas) || [];
      legacyArr.forEach(function(a) {
        if (!a || !a.sigla) return;
        var key = canonKey(a.sigla);
        var niv = (a.niveles || []).filter(function(n) { return nivelRe.test(n); });
        if (seen[key] !== undefined) {
          // Ya está: enriquecer color desde legacy si plan común no lo trajo
          var existing = out[seen[key]];
          if (existing && !existing.color && a.color) existing.color = a.color;
          return;
        }
        if (!niv.length) return;
        seen[key] = out.length;
        out.push({
          key:     key,
          nombre:  a.nombre,
          sigla:   a.sigla,
          color:   a.color || null,
          niveles: niv
        });
      });

      return out;
    },

    getModulos: function(sectorKey) {
      var key = _resolveEspKey(sectorKey);
      if (!key) return [];
      var sec = this.especialidades[key];
      if (!sec) return [];
      var mods = [];
      (sec.especialidades || []).forEach(function(esp) {
        (esp.modulos || []).forEach(function(m) { mods.push(m); });
      });
      return mods;
    },

    getAllNiveles: function() {
      return ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'];
    },

    getNivelLabel: function(nivel) {
      var map = {
        '1B':'1° Básico','2B':'2° Básico','3B':'3° Básico','4B':'4° Básico',
        '5B':'5° Básico','6B':'6° Básico','7B':'7° Básico','8B':'8° Básico',
        '1M':'1° Medio','2M':'2° Medio','3M':'3° Medio','4M':'4° Medio'
      };
      return map[nivel] || nivel;
    },

    // Retorna array [{key, nombre, sector, color}] para poblar selectores TP.
    // Solo incluye especialidades con datos cargados (CURRICULA_FULL presente);
    // si CURRICULA_FULL no está cargado, retorna todo el catálogo igual (para
    // que selectores de admin sigan funcionando aún sin datos reales).
    getEspecialidades: function() {
      var CF = (typeof window !== 'undefined' && window.CURRICULA_FULL) || null;
      return Object.keys(TP_CATALOG).map(function(key) {
        var meta = TP_CATALOG[key];
        return {
          key:       key,
          nombre:    meta.nombre,
          sector:    meta.sector,
          color:     meta.color,
          hasData:   !!(CF && CF[meta.fullKey])
        };
      });
    },

    // Normaliza una clave de especialidad (maneja alias legacy como "automotriz")
    resolveEspKey: function(key) { return _resolveEspKey(key); },

    // Retorna un objeto compatible con MODULOS[] para un módulo TP por espKey y num
    getModuloCompat: function(espKey, modNum) {
      espKey = _resolveEspKey(espKey) || espKey;
      var ceEstandar = {
        'C1': { texto: 'Aplica procedimientos técnicos según normativa vigente y especificaciones del fabricante.', oag: ['A'] },
        'C2': { texto: 'Usa correctamente herramientas e instrumentos de medición adecuados para el trabajo técnico.', oag: ['C'] },
        'C3': { texto: 'Cumple estrictamente con las normas de seguridad laboral y prevención de riesgos en el área de trabajo.', oag: ['K'] },
        'C4': { texto: 'Documenta y registra con precisión los trabajos realizados, completando informes técnicos.', oag: ['B'] },
        'C5': { texto: 'Trabaja con responsabilidad, orden, limpieza y respeto en el puesto de trabajo y con sus compañeros.', oag: ['D'] }
      };

      var mods = this.getModulos(espKey);
      var m = null;
      for (var i = 0; i < mods.length; i++) {
        if (mods[i].num === modNum) { m = mods[i]; break; }
      }
      if (!m) return null;

      var oas = {};
      var aes = {};
      (m.aes || []).forEach(function(ae) {
        var key = 'OA' + ae.num;
        var textoCompleto = ae.texto || ae.nombre;
        oas[key] = textoCompleto;
        aes[key] = { texto: textoCompleto, ces: ceEstandar };
      });

      return {
        num:    m.num,
        nombre: m.nombre,
        horas:  m.horas,
        oas:    oas,
        aes:    aes,
        _fromCurricula: true,
        _espKey: espKey
      };
    },

    // Busca un módulo en TODAS las especialidades por su número (num).
    // Útil cuando user.especialidad está vacío pero se conoce el número de módulo.
    // Retorna objeto compatible con MODULOS[] o null.
    getModuloCompatByNum: function(modNum) {
      var esps = this.getEspecialidades();
      for (var i = 0; i < esps.length; i++) {
        var result = this.getModuloCompat(esps[i].key, modNum);
        if (result) return result;
      }
      return null;
    },

    // Retorna todos los módulos de todas las especialidades (para listado general TP)
    getAllModulos: function() {
      var all = [];
      var seen = {};
      var esps = this.getEspecialidades();
      for (var i = 0; i < esps.length; i++) {
        var mods = this.getModulos(esps[i].key);
        for (var j = 0; j < mods.length; j++) {
          var key = esps[i].key + '_' + mods[j].num;
          if (!seen[key]) {
            seen[key] = true;
            all.push({ espKey: esps[i].key, espNombre: esps[i].nombre, mod: mods[j] });
          }
        }
      }
      return all;
    }
  };

  // `especialidades` se resuelve dinámicamente vía getter para capturar
  // cargas diferidas de window.CURRICULA_FULL.  Fallback a objeto plano en
  // entornos que no soporten defineProperty (muy improbable en targets).
  try {
    Object.defineProperty(api, 'especialidades', {
      enumerable: true,
      configurable: false,
      get: function() { return _buildEspecialidades(); }
    });
  } catch (e) {
    api.especialidades = _buildEspecialidades();
  }

  return api;
})();
