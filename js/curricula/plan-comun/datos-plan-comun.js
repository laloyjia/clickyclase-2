// =============================================
// DATOS CURRICULARES — Plan Común
// Archivo: js/curricula/plan-comun/datos-plan-comun.js
//
// Cubre asignaturas del Plan de Formación General
// (Básica y Educación Media, 1°B – 4°M)
//
// Asignaturas incluidas:
//   - Lenguaje y Comunicación
//   - Matemática
//   - Historia, Geografía y Ciencias Sociales
//   - Ciencias Naturales / Biología / Física / Química
//   - Inglés
//   - Educación Física y Salud
//   - Artes Visuales
//   - Música
//   - Tecnología
//   - Orientación
//
// Estado: PENDIENTE DE CARGA — cargar OAs por asignatura y nivel
// =============================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

// ── Estructura general ──────────────────────────────────────
// CURRICULA_PLAN_COMUN['lenguaje']['1B'] = [ { codigo, descripcion, eje }, ... ]
// CURRICULA_PLAN_COMUN['matematica']['2M'] = [ ... ]
// etc.

// ══════════════════════════════════════════════════════════════
// LENGUAJE Y COMUNICACIÓN
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['lenguaje'] = {
  nombre: 'Lenguaje y Comunicación',
  sigla:  'LEN',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  // OAs se cargan por nivel: '1B': [...], '2B': [...], etc.
  oas: {
    // Ejemplo de estructura:
    // '1B': [
    //   { codigo: 'OA1', descripcion: 'Leer en voz alta...', eje: 'Lectura' },
    //   { codigo: 'OA2', descripcion: 'Comprender textos...', eje: 'Lectura' },
    // ],
    // '1M': [ ... ],
  }
};

// ══════════════════════════════════════════════════════════════
// MATEMÁTICA — Objetivos de Aprendizaje
// Fuente: Programas de Estudio MINEDUC
// Incluye: 1°–8° Básico, 1°–4° Medio, 4 electivos 3°–4°M
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['matematica'] = {
  nombre: 'Matemática',
  sigla:  'MAT',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {
    '1B': [
        { codigo: 'OA1', descripcion: 'Contar números naturales del 0 al 100, de 1 en 1, de 2 en 2, de 5 en 5 y de 10 en 10, hacia delante y hacia atrás, empezando por cualquier número menor que 100' },
        { codigo: 'OA2', descripcion: 'Identificar el orden de los elementos de una serie, utilizando números ordinales del primero (1º) al décimo (10º)' },
        { codigo: 'OA3', descripcion: 'Leer números del 0 al 20 y representarlos de manera concreta, pictórica y simbólica' },
        { codigo: 'OA4', descripcion: 'Comparar y ordenar números del 0 al 20 de menor a mayor y/o viceversa, utilizando material concreto y/o software educativo' },
        { codigo: 'OA5', descripcion: 'Estimar cantidades hasta 20 en situaciones concretas, usando un referente' },
        { codigo: 'OA6', descripcion: 'Componer y descomponer números del 0 al 20 de manera aditiva de forma concreta, pictórica y simbólica' },
        { codigo: 'OA7', descripcion: 'Describir y aplicar estrategias de cálculo mental para las adiciones y sustracciones hasta 20: atrás' },
        { codigo: 'OA8', descripcion: 'Determinar las unidades y decenas en números del 0 al 20, agrupando de a 10 de manera concreta, pictórica y simbólica' },
        { codigo: 'OA9', descripcion: 'Demostrar que comprende la adición y la sustracción de números del 0 a 20, progresivamente de 0 a 5, de 6 a 10 y de 11 a 20: para describir acciones desde su propia experiencia sustracciones con material concreto y pictórico, de manera manual y/o usando software educativo forma simbólica contextos familiares cos y resolviéndolos' },
        { codigo: 'OA10', descripcion: 'Demostrar que la adición y la sustracción son operaciones inversas, de manera concreta, pictórica y simbólica' },
        { codigo: 'OA11', descripcion: 'Reconocer, describir, crear y continuar patrones repetitivos (sonidos, figuras, ritmos…) y patrones numéricos hasta 20, crecientes y decrecientes usando material concreto, pictórico y simbólico de manera manual y/o por medio de software educativo' },
        { codigo: 'OA12', descripcion: 'Identificar en el entorno figuras 3D y figuras 2D y relacionarlas, usando material concreto' },
        { codigo: 'OA13', descripcion: 'Describir la posición de objetos y personas con relación a sí mismos y a otros objetos y personas, usando un lenguaje común (como derecha e izquierda)' },
        { codigo: 'OA14', descripcion: 'Identificar en el entorno 1 figuras 3D y figuras 2D y Identifica relacionarlas, usando ma-' },
        { codigo: 'OA15', descripcion: 'Identificar y dibujar líneas rectas y curvas' },
        { codigo: 'OA16', descripcion: 'Usar unidades no estandarizadas de tiempo para comparar la duración de eventos cotidianos' },
        { codigo: 'OA17', descripcion: 'Usar un lenguaje cotidiano para secuenciar eventos en el tiempo: días de la semana, meses del año y algunas fechas significativas' },
        { codigo: 'OA18', descripcion: 'Identificar y comparar la longitud de objetos, usando palabras como largo y corto' },
        { codigo: 'OA19', descripcion: 'Recolectar y registrar datos para responder preguntas estadísticas sobre sí mismo y el entorno, usando bloques, tablas de conteo y pictogramas' },
        { codigo: 'OA20', descripcion: 'Construir, leer e interpretar pictogramas' }
    ],
    '2B': [
        { codigo: 'OA1', descripcion: 'Contar números naturales del 0 al 1 000 de 2 en 2, de 5 en 5 y de 10 en 10 hacia adelante y hacia atrás, empezando por cualquier número menor que 1 000' },
        { codigo: 'OA2', descripcion: 'Leer números naturales del 0 al 100 y representarlos en forma concreta, pictórica y simbólica' },
        { codigo: 'OA3', descripcion: 'Comparar y ordenar números naturales del 0 al 100 de menor a mayor y viceversa, usando material concreto y monedas nacionales de manera manual y/o por medio de software educativo' },
        { codigo: 'OA4', descripcion: 'Estimar cantidades hasta 100 en situaciones concretas, usando un referente' },
        { codigo: 'OA5', descripcion: 'Componer y descomponer números naturales del 0 al 100 de manera aditiva, en forma concreta, pictórica y simbólica. Matemática' },
        { codigo: 'OA6', descripcion: 'Describir y aplicar estrategias de cálculo mental para adiciones y sustracciones hasta 20: más uno menos” operaciones' },
        { codigo: 'OA7', descripcion: 'Identificar las unidades y decenas en números naturales del 0 al 100, representando las cantidades de acuerdo a su valor posicional, con material concreto, pictórico y simbólico' },
        { codigo: 'OA8', descripcion: 'Demostrar y explicar, de manera concreta, pictórica y simbólica, el efecto de sumar y restar 0 a un número' },
        { codigo: 'OA9', descripcion: 'Demostrar que comprende la adición y la sustracción en el ámbito del 0 al 100: y matemático para describir acciones desde su propia experiencia una variedad de representaciones concretas y pictóricas, incluyendo software educativo ma simbólica las adiciones y sustracciones de los números naturales del 0 a 20 sin realizar cálculos adición sin considerar reserva ticos en contextos familiares y resolviéndolos' },
        { codigo: 'OA10', descripcion: 'Demostrar que comprende la relación entre la adición y la sustracción al usar la “familia de operaciones” en cálculos aritméticos y en la resolución de problemas' },
        { codigo: 'OA11', descripcion: 'Demostrar que comprende la multiplicación: cretas y pictóricas como una adición de sumandos iguales como estrategia para construir las tablas del 2, del 5 y del 10 involucran las tablas del 2, del 2, 5 y del atemática' },
        { codigo: 'OA12', descripcion: 'Crear, representar y continuar una variedad de patrones numéricos y completar los elementos faltantes, de manera manual y/o usando software educativo' },
        { codigo: 'OA13', descripcion: 'Demostrar, explicar y registrar la igualdad y desigualdad en forma concreta y pictórica del 0 al 20, usando el símbolo igual (=) y los símbolos no igual (›,<)' },
        { codigo: 'OA14', descripcion: 'Representar y describir la posición de objetos y personas con relación a sí mismo y a otros (objetos y personas), incluyendo derecha e izquierda, usando material concreto y dibujo' },
        { codigo: 'OA15', descripcion: 'Describir, comparar y construir figuras 2D (triángulos, cuadrados, rectángulos y círculos) con material concreto' },
        { codigo: 'OA16', descripcion: 'Describir, comparar y construir figuras 3D (cubos, paralelepípedos, esferas y conos) con diversos materiales' },
        { codigo: 'OA17', descripcion: 'Identificar días, semanas, meses y fechas en el calendario' },
        { codigo: 'OA18', descripcion: 'Leer horas y medias horas en relojes digitales ,en el contexto de la resolución de problemas' },
        { codigo: 'OA19', descripcion: 'Determinar la longitud de objetos, usando unidades de medidas no estandarizadas y unidades estandarizadas (cm y m) en el contexto de la resolución de problemas' },
        { codigo: 'OA20', descripcion: 'Recolectar y registrar datos para responder preguntas estadísticas sobre juegos con monedas y dados, usando bloques, tablas de conteo y pictogramas' },
        { codigo: 'OA21', descripcion: 'Registrar en tablas y gráficos de barra simple, resultados de juegos aleatorios con dados y monedas. Matemática' },
        { codigo: 'OA22', descripcion: 'Construir, leer e interpretar pictogramas con escala y gráficos de barra simple' }
    ],
    '3B': [
        { codigo: 'OA1', descripcion: 'Contar números del 0 al 1 000 de 5 en 5, de 10 en 10, de 100 en 100: número menor que 1 000 zando por cualquier múltiplo del número correspondiente' },
        { codigo: 'OA2', descripcion: 'Leer números hasta 1 000 y representarlos en forma concreta, pictórica y simbólica' },
        { codigo: 'OA3', descripcion: 'Comparar y ordenar números hasta 1 000, utilizando la recta numérica o la tabla posicional de manera manual y/o por medio de software educativo' },
        { codigo: 'OA4', descripcion: 'Describir y aplicar estrategias de cálculo mental para las adiciones y sustracciones hasta 100: más cercana' },
        { codigo: 'OA5', descripcion: 'Identificar y describir las unidades, decenas y centenas en números del 0 al 1 000, representando las cantidades de acuerdo a su valor posicional, con material concreto, pictórico y simbólico' },
        { codigo: 'OA6', descripcion: 'Demostrar que comprenden la adición y la sustracción de números del 0 al 1 000: con y sin material concreto mas de adición y sustracción que involucren operaciones combinadas, en forma concreta, pictórica y simbólica, de manera manual y/o por medio de software educativo y sin reserva, progresivamente, en la adición de hasta 4 sumandos y en la sustracción de hasta un sustraendo' },
        { codigo: 'OA7', descripcion: 'Demostrar que comprenden la relación entre la adición y la sustracción, usando la “familia de operaciones” en cálculos aritméticos y en la resolución de problemas' },
        { codigo: 'OA8', descripcion: 'Demostrar que comprenden las tablas de multiplicar de 3, 6, 4 y 8 de manera progresiva: cretas y pictóricas como una adición de sumandos iguales como estrategia para construir las tablas hasta el 8 tablas de multiplicación de 3, 6, 4 y 8, sin realizar cálculos volucren las tablas aprendidas hasta el 10' },
        { codigo: 'OA9', descripcion: 'Demostrar que comprenden la división en el contexto de las tablas de 3, 6, 4 y 8: la división como repartición y agrupación en partes iguales, con material concreto y pictórico mas en contextos que incluyan la repartición y la agrupación un sustracción repetida relación inversa entre la división y la multiplicación tablas de multiplicación hasta 10x8, sin realizar cálculos' },
        { codigo: 'OA10', descripcion: 'Resolver problemas rutinarios en contextos cotidianos, que incluyan dinero e involucren las cuatro operaciones (no combinadas)' },
        { codigo: 'OA11', descripcion: 'Demostrar que comprenden las fracciones de uso común: 1/4, 1/3, 1/2, 2/3, 3/4: representa la parte de un todo, de manera concreta, pictórica, simbólica, de forma manual y/o con software educativo las cuales se puede usar fracciones mismo todo, de igual denominador' },
        { codigo: 'OA12', descripcion: 'Generar, describir y registrar patrones numéricos, usando una variedad de estrategias en tablas del 100, de manera manual y/o con software educativo' },
        { codigo: 'OA13', descripcion: 'Resolver ecuaciones de un paso, que involucren adiciones y sustracciones y un símbolo geométrico que represente un número desconocido, en forma pictórica y simbólica del 0 al 100' },
        { codigo: 'OA14', descripcion: 'Describir la localización de un objeto en un mapa simple o cuadrícula' },
        { codigo: 'OA15', descripcion: 'Demostrar que comprenden la relación que existe entre figuras 3D y figuras 2D: partir de una red (plantilla)' },
        { codigo: 'OA16', descripcion: 'Describir cubos, paralelepípedos, esferas, conos, cilindros y pirámides de acuerdo a la forma de sus caras, el número de aristas y de vértices' },
        { codigo: 'OA17', descripcion: 'Reconocer en el entorno figuras 2D que están trasladadas, reflejadas y rotadas' },
        { codigo: 'OA18', descripcion: 'Demostrar que comprenden el concepto de ángulo: ángulos en el entorno gulos, usando como referente ángulos de 45º y de 90º' },
        { codigo: 'OA19', descripcion: 'Leer e interpretar líneas de tiempo y calendarios' },
        { codigo: 'OA20', descripcion: 'Leer y registrar el tiempo en horas, medias horas, cuartos de horas y minutos en relojes análogos y digitales' },
        { codigo: 'OA21', descripcion: 'Demostrar que comprenden el perímetro de una figura regular y de una irregular: rímetro de figuras del entorno en el contexto de la resolución de problemas un cuadrado y un rectángulo' },
        { codigo: 'OA22', descripcion: 'Demostrar que comprenden la medición del peso (g y kg): o más objetos a partir de su peso de manera informal la relación que existe entre gramos y kilogramos tos de uso cotidiano, usando referentes peso de objetos en números y en fracciones de uso común, en el contexto de la resolución de problemas' },
        { codigo: 'OA23', descripcion: 'Realizar encuestas, clasificar y organizar los datos obtenidos en tablas y visualizarlos en gráficos de barra' },
        { codigo: 'OA24', descripcion: 'Registrar y ordenar datos obtenidos de juegos aleatorios con dados y monedas, encontrando el menor, el mayor y estimando el punto medio entre ambos' },
        { codigo: 'OA25', descripcion: 'Construir, leer e interpretar pictogramas y gráficos de barra simple con escala, de acuerdo a información recolectada o dada' },
        { codigo: 'OA26', descripcion: 'Representar datos, usando diagramas de puntos' }
    ],
    '4B': [
        { codigo: 'OA1', descripcion: 'Representar y describir números del 0 al 10 000: 100 en 100, de 1 000 en 1 000 concreta, pictórica y simbólica ordenándolos en la recta numérica o tabla posicional posicional de los dígitos hasta la decena de mil descomponiendo números naturales hasta 10 000 en forma aditiva, de acuerdo a su valor posicional' },
        { codigo: 'OA2', descripcion: 'Describir y aplicar estrategias de cálculo mental: para determinar las multiplicaciones hasta 10 x 10 y sus divisiones correspondientes Matemática' },
        { codigo: 'OA3', descripcion: 'Demostrar que comprende la adición y la sustracción de números hasta 1 000: para realizar estas operaciones involucrados rios y no rutinarios que incluyan adiciones y sustracciones progresivamente, en la adición de hasta 4 sumandos y en la sustracción de hasta un sustraendo' },
        { codigo: 'OA4', descripcion: 'Fundamentar y aplicar las propiedades del 0 y del 1 en la multiplicación y la propiedad del 1 en la división' },
        { codigo: 'OA5', descripcion: 'Demostrar que comprende la multiplicación de números de tres dígitos por números de un dígito: material concreto plicación butiva de la multiplicación respecto de la suma multiplicación narios' },
        { codigo: 'OA6', descripcion: 'Demostrar que comprende la división con dividendos de dos dígitos y divisores de un dígito: dir con o sin material concreto existe entre la división y la multiplicación descomposición del dividendo división Matemática' },
        { codigo: 'OA7', descripcion: 'Resolver problemas rutinarios y no rutinarios en contextos cotidianos que incluyen dinero, seleccionando y utilizando la operación apropiada' },
        { codigo: 'OA8', descripcion: 'Demostrar que comprende las fracciones con denominador 100, 12, 10, 8, 6, 5, 4, 3, 2: representa la parte de un todo o de un grupo de elementos y un lugar en la recta numérica en las cuales se puede usar fracciones puede tener representaciones diferentes fracciones (por ejemplo: , 1 1 1 1 , , , ) con material 8 5 4 2 concreto y pictórico' },
        { codigo: 'OA9', descripcion: 'Resolver adiciones y sustracciones de fracciones con igual denominador (denominadores 100, 12, 10, 8, 6, 5, 4, 3, 2), de manera concreta y pictórica, en el contexto de la resolución de problemas' },
        { codigo: 'OA10', descripcion: 'Identificar, escribir y representar fracciones propias y los números mixtos hasta el 5, de manera concreta, pictórica y simbólica en el contexto de la resolución de problemas' },
        { codigo: 'OA11', descripcion: 'Describir y representar decimales (décimos y centésimos): concreta, pictórica y simbólica, de manera manual y/o con software educativo los hasta la centésima' },
        { codigo: 'OA12', descripcion: 'Resolver adiciones y sustracciones de decimales, empleando el valor posicional hasta la centésima en el contexto de la resolución de problemas' },
        { codigo: 'OA13', descripcion: 'Identificar y describir patrones numéricos en tablas que involucren una operación, de manera manual y/o usando software educativo' },
        { codigo: 'OA14', descripcion: 'Resolver ecuaciones e inecuaciones de un paso, que involucren adiciones y sustracciones, comprobando los resultados en forma pictórica y simbólica del 0 al 100, aplicando las relaciones inversas entre la adición y la sustracción' },
        { codigo: 'OA15', descripcion: 'Describir la localización absoluta de un objeto en un mapa simple con coordenadas informales (por ejemplo: con letra y números) y la localización relativa a otros objetos' },
        { codigo: 'OA16', descripcion: 'Determinar las vistas de figuras 3D, desde el frente, desde el lado y desde arriba' },
        { codigo: 'OA17', descripcion: 'Demostrar que comprende una línea de simetría: cas 2D simetría en figuras 2D' },
        { codigo: 'OA18', descripcion: 'Trasladar, rotar y reflejar figuras 2D' },
        { codigo: 'OA19', descripcion: 'Construir ángulos con el transportador y compararlos' },
        { codigo: 'OA20', descripcion: 'Leer y registrar diversas mediciones del tiempo en relojes análogos y digitales, usando los conceptos A.M., P.M. y 24 horas' },
        { codigo: 'OA21', descripcion: 'Realizar conversiones entre unidades de tiempo en el contexto de la resolución de problemas: el número de segundos en un minuto, el número de minutos en una hora, el número de días en un mes y el número de meses en un año' },
        { codigo: 'OA22', descripcion: 'Medir longitudes con unidades estandarizadas (m, cm) y realizar transformaciones entre estas unidades (m a cm y viceversa) en el contexto de la resolución de problemas' },
        { codigo: 'OA23', descripcion: 'Demostrar que comprenden el concepto de área de un rectángulo y de un cuadrado: una superficie se mide en unidades cuadradas la elección de la unidad estandarizada (cm2 y m2) área en cm2 y m2 en contextos cercanos rectángulos para un área dada (cm2 y m2) para mostrar que distintos rectángulos pueden tener la misma área' },
        { codigo: 'OA24', descripcion: 'Demostrar que comprenden el concepto de volumen de un cuerpo: estandarizada para medir el volumen de un cuerpo se mide en unidades de cubos volumen en unidades de cubo' },
        { codigo: 'OA25', descripcion: 'Realizar encuestas, analizar los datos y comparar con los resultados de muestras aleatorias, usando tablas y gráficos' },
        { codigo: 'OA26', descripcion: 'Realizar experimentos aleatorios lúdicos y cotidianos, y tabular y representar mediante gráficos de manera manual y/o con software educativo' },
        { codigo: 'OA27', descripcion: 'Leer e interpretar pictogramas y gráficos de barra simple con escala y comunicar conclusiones' }
    ],
    '5B': [
        { codigo: 'OA1', descripcion: 'Representar y describir números de hasta más de 6 dígitos y menores que 1 000 millones: posicional de los dígitos descomponiendo números naturales en forma estándar y expandida números naturales en este ámbito numérico números naturales en contextos reales' },
        { codigo: 'OA2', descripcion: 'Aplicar estrategias de cálculo mental para la multiplicación: multiplica por un múltiplo de 10 repetida conmutativa, asociativa y distributiva' },
        { codigo: 'OA3', descripcion: 'Demostrar que comprende la multiplicación de 2 dígitos por 2 dígitos: cálculo mental distributiva de la adición respecto de la multiplicación rutinarios y no rutinarios, aplicando el algoritmo' },
        { codigo: 'OA4', descripcion: 'Demostrar que comprende la división con dividendos de tres dígitos y divisores de un dígito: tinarios y no rutinarios que impliquen divisiones' },
        { codigo: 'OA5', descripcion: 'Realizar cálculos que involucren las cuatro operaciones con expresiones numéricas, aplicando las reglas relativas a paréntesis y la prevalencia de la multiplicación y la división por sobre la adición y la sustracción cuando corresponda' },
        { codigo: 'OA6', descripcion: 'Resolver problemas rutinarios y no rutinarios que involucren las cuatro operaciones y combinaciones de ellas: dinero computador en ámbitos numéricos superiores al 10 000' },
        { codigo: 'OA7', descripcion: 'Demostrar que comprende las fracciones propias: concreta, pictórica y simbólica equivalentes –simplificando y amplificando– de manera concreta, pictórica, simbólica, de forma manual y/o con software educativo propias con igual y distinto denominador de manera concreta, pictórica y simbólica' },
        { codigo: 'OA8', descripcion: 'Demostrar que comprende las fracciones impropias de uso común de denominadores 2, 3, 4, 5, 6, 8, 10, 12 y los números mixtos asociados: pictórico para representarlas, de manera manual y/o usando software educativo equivalencias entre fracciones impropias y números mixtos fracciones y estos números mixtos en la recta numérica Matemática' },
        { codigo: 'OA9', descripcion: 'Resolver adiciones y sustracciones con fracciones propias con denominadores menores o iguales a 12: simbólica' },
        { codigo: 'OA10', descripcion: 'Determinar el decimal que corresponde a fracciones con denominador 2, 4, 5 y 10' },
        { codigo: 'OA11', descripcion: 'Comparar y ordenar decimales hasta la milésima' },
        { codigo: 'OA12', descripcion: 'Resolver adiciones y sustracciones de decimales, empleando el valor posicional hasta la milésima' },
        { codigo: 'OA13', descripcion: 'Resolver problemas rutinarios y no rutinarios, aplicando adiciones y sustracciones de fracciones propias o decimales hasta la milésima' },
        { codigo: 'OA14', descripcion: 'Descubrir alguna regla que explique una sucesión dada y que permita hacer predicciones' },
        { codigo: 'OA15', descripcion: 'Resolver problemas, usando ecuaciones de un paso que involucren adiciones y sustracciones, en forma pictórica y simbólica' },
        { codigo: 'OA16', descripcion: 'Identificar y dibujar puntos en el primer cuadrante del plano cartesiano, dadas sus coordenadas en números naturales' },
        { codigo: 'OA17', descripcion: 'Describir y dar ejemplos de aristas y caras de figuras 3D, y lados de figuras 2D' },
        { codigo: 'OA18', descripcion: 'Demostrar que comprende el concepto de congruencia, usando la traslación, la reflexión y la rotación en cuadrículas' },
        { codigo: 'OA19', descripcion: 'Medir longitudes con unidades estandarizadas (m, cm, mm) en el contexto de la resolución de problemas' },
        { codigo: 'OA20', descripcion: 'Realizar transformaciones entre unidades de medidas de longitud (km a m, m a cm, cm a mm y viceversa), usando software educativo' },
        { codigo: 'OA21', descripcion: 'Diseñar y construir diferentes rectángulos, dados el perímetro o el área o ambos, y sacar conclusiones' },
        { codigo: 'OA22', descripcion: 'Calcular áreas de triángulos, de paralelogramos y de trapecios, y estimar áreas de figuras irregulares aplicando las estrategias: rectángulo traslación' },
        { codigo: 'OA23', descripcion: 'Calcular el promedio de datos e interpretarlo en su contexto' },
        { codigo: 'OA24', descripcion: 'Describir la posibilidad de ocurrencia de un evento de acuerdo a un experimento aleatorio, empleando los términos seguro – posible – poco posible – imposible' },
        { codigo: 'OA25', descripcion: 'Comparar probabilidades de distintos eventos sin calcularlas' },
        { codigo: 'OA26', descripcion: 'Leer, interpretar y completar tablas, gráficos de barra simple y gráficos de línea, y comunicar sus conclusiones' },
        { codigo: 'OA27', descripcion: 'Utilizar diagramas de tallo y hojas para representar datos provenientes de muestras aleatorias' }
    ],
    '6B': [
        { codigo: 'OA1', descripcion: 'Demostrar que comprende los factores y múltiplos: factores de números menores de 100 y compuestos involucran múltiplos' },
        { codigo: 'OA2', descripcion: 'Realizar cálculos que involucren las cuatro operaciones en el contexto de la resolución de problemas, utilizando la calculadora en ámbitos superiores a 10 000' },
        { codigo: 'OA3', descripcion: 'Demostrar que comprende el concepto de razón de manera concreta, pictórica, simbólica y/o usando software educativo' },
        { codigo: 'OA4', descripcion: 'Demostrar que comprende el concepto de porcentaje de manera concreta, pictórica, simbólica y/o usando software educativo' },
        { codigo: 'OA5', descripcion: 'Demostrar que comprende las fracciones y números mixtos: equivalencias entre fracciones impropias y números mixtos, usando material concreto y representaciones pictóricas de manera manual y/o software educativo en la recta numérica' },
        { codigo: 'OA6', descripcion: 'Resolver adiciones y sustracciones de fracciones propias e impropias y números mixtos con numeradores y denominadores de hasta dos dígitos' },
        { codigo: 'OA7', descripcion: 'Demostrar que comprende la multiplicación y la división de decimales por números naturales de un dígito, múltiplos de 10 y decimales hasta la milésima de manera concreta, pictórica y simbólica' },
        { codigo: 'OA8', descripcion: 'Resolver problemas rutinarios y no rutinarios que involucren adiciones y sustracciones de fracciones propias, impropias, números mixtos o decimales hasta la milésima' },
        { codigo: 'OA9', descripcion: 'Demostrar que comprenden la relación entre los valores de una tabla y aplicarla en la resolución de problemas sencillos: los valores de la tabla lenguaje matemático' },
        { codigo: 'OA10', descripcion: 'Representar generalizaciones de relaciones entre números naturales, usando expresiones con letras y ecuaciones' },
        { codigo: 'OA11', descripcion: 'Resolver ecuaciones de primer grado con una incógnita, utilizando estrategias como: correspondencia 1 a 1 entre los términos en cada lado de la ecuación y aplicando procedimientos formales de resolución' },
        { codigo: 'OA12', descripcion: 'Construir y comparar triángulos de acuerdo a la medida de sus lados y/o sus ángulos con instrumentos geométricos o software geométrico' },
        { codigo: 'OA13', descripcion: 'Demostrar que comprenden el concepto de área de una superficie en cubos y paralelepípedos, calculando el área de sus redes (plantillas) asociadas' },
        { codigo: 'OA14', descripcion: 'Realizar teselados de figuras 2D, usando traslaciones, reflexiones y rotaciones' },
        { codigo: 'OA15', descripcion: 'Construir ángulos agudos, obtusos, rectos, extendidos y completos con instrumentos geométricos o software geométrico' },
        { codigo: 'OA16', descripcion: 'Identificar los ángulos que se forman entre dos rectas que se cortan (pares de ángulos opuestos por el vértice y pares de ángulos complementarios)' },
        { codigo: 'OA17', descripcion: 'Demostrar, de manera concreta, pictórica y simbólica, que la suma de los ángulos interiores de un triángulo es 180º y de un cuadrilátero es 360º' },
        { codigo: 'OA18', descripcion: 'Calcular la superficie de cubos y paralelepípedos, expresando el resultado en cm2 y m2' },
        { codigo: 'OA19', descripcion: 'Calcular el volumen de cubos y paralelepípedos, expresando el resultado en cm3 , m3 y mm3' },
        { codigo: 'OA20', descripcion: 'Estimar y medir ángulos, usando el transportador y expresando las mediciones en grados' },
        { codigo: 'OA21', descripcion: 'Calcular ángulos en rectas paralelas cortadas por una transversal y en triángulos' },
        { codigo: 'OA22', descripcion: 'Comparar distribuciones de dos grupos, usando diagramas de puntos y de tallo y hojas' },
        { codigo: 'OA23', descripcion: 'Conjeturar acerca de las tendencias de resultados obtenidos en repeticiones de un mismo experimento con dados, monedas u otros, de manera manual y/o usando software educativo' },
        { codigo: 'OA24', descripcion: 'Leer e interpretar gráficos de barra doble y circulares y comunicar sus conclusiones' }
    ],
    '7B': [
        { codigo: 'OA1', descripcion: 'Mostrar que comprenden la adición y la sustracción de números enteros: de un movimiento equivalente en la posición opuesta no representa ningún cambio de posición)' },
        { codigo: 'OA2', descripcion: 'Explicar la multiplicación y la división de fracciones positivas' },
        { codigo: 'OA3', descripcion: 'Resolver problemas que involucren la multiplicación y la división de fracciones y de decimales positivos de manera concreta, pictórica y simbólica (de forma manual y/o con software educativo)' },
        { codigo: 'OA4', descripcion: 'Mostrar que comprenden el concepto de porcentaje' },
        { codigo: 'OA5', descripcion: 'Utilizar potencias de base 10 con exponente natural' },
        { codigo: 'OA6', descripcion: 'Utilizar el lenguaje algebraico para generalizar relaciones entre números, para establecer y formular reglas y propiedades y construir ecuaciones' },
        { codigo: 'OA7', descripcion: 'Reducir expresiones algebraicas, reuniendo términos semejantes para obtener expresiones de la forma ax + by + cz (a, b, c P Z)' },
        { codigo: 'OA8', descripcion: 'Demostrar que comprenden las proporciones directas e inversas' },
        { codigo: 'OA9', descripcion: 'Modelar y resolver problemas diversos de la vida diaria y de otras asignaturas, que involucran ecuaciones e inecuaciones lineales de la forma: x x x' },
        { codigo: 'OA10', descripcion: 'Descubrir relaciones que involucran ángulos exteriores o interiores de diferentes polígonos' },
        { codigo: 'OA11', descripcion: 'Mostrar que comprenden el círculo: asignaturas y de la vida diaria' },
        { codigo: 'OA12', descripcion: 'Construir objetos geométricos de manera manual y/o con software educativo' },
        { codigo: 'OA13', descripcion: 'Desarrollar y aplicar la fórmula del área de triángulos, paralelogramos y trapecios' },
        { codigo: 'OA14', descripcion: 'Tiempo estimado: 57 horas pedagógicas' },
        { codigo: 'OA15', descripcion: 'Estimar el porcentaje de algunas características de una población desconocida por medio del muestreo' },
        { codigo: 'OA16', descripcion: 'Representar datos obtenidos en una muestra mediante tablas de frecuencias absolutas y relativas, utilizando gráficos apropiados, de manera manual y/o con software educativo' },
        { codigo: 'OA17', descripcion: 'Mostrar que comprenden las medidas de tendencia central y el rango' },
        { codigo: 'OA18', descripcion: 'Explicar las probabilidades de eventos obtenidos por medio de experimentos de manera manual y/o con software educativo' },
        { codigo: 'OA19', descripcion: 'Comparar las frecuencias relativas de un evento obtenidas al repetir un experimento de forma manual y/o con software educativo, con la probabilidad obtenida de manera teórica, usando diagramas de árbol, tablas o gráficos' }
    ],
    '8B': [
        { codigo: 'OA1', descripcion: 'Mostrar que comprenden la multiplicación y la división de números enteros' },
        { codigo: 'OA2', descripcion: 'Utilizar las operaciones de multiplicación y división con los números racionales en el contexto de la resolución de problemas' },
        { codigo: 'OA3', descripcion: 'Explicar la multiplicación y la división de potencias de base natural y exponente natural hasta 3, de manera concreta, pictórica y simbólica' },
        { codigo: 'OA4', descripcion: 'Mostrar que comprenden las raíces cuadradas de números naturales' },
        { codigo: 'OA5', descripcion: 'Resolver problemas que involucran variaciones porcentuales en contextos diversos, usando representaciones pictóricas y registrando el proceso de manera simbólica; por ejemplo: el interés anual del ahorro' },
        { codigo: 'OA6', descripcion: 'Mostrar que comprenden las operaciones de expresiones algebraicas' },
        { codigo: 'OA7', descripcion: 'Mostrar que comprenden la noción de función por medio de un cambio lineal: educativo' },
        { codigo: 'OA8', descripcion: 'Modelar situaciones de la vida diaria y de otras asignaturas, usando ecuaciones lineales de la forma: x ax = b; = b, a ≠ 0; a x ax + b = c; a + b = c; ax = b + cx; a (x + b) = c; ax + b = cx + d (a, b, c, d, e P Q)' },
        { codigo: 'OA9', descripcion: 'Resolver inecuaciones lineales con coeficientes racionales en el contexto de la resolución de problemas, por medio de representaciones gráficas, simbólicas, de manera manual y/o con software educativo' },
        { codigo: 'OA10', descripcion: 'Mostrar que comprenden la función afín: con software educativo' },
        { codigo: 'OA11', descripcion: 'Desarrollar las fórmulas para encontrar el área de superficies y el volumen de prismas rectos con diferentes bases y cilindros' },
        { codigo: 'OA12', descripcion: 'Explicar, de manera concreta, pictórica y simbólica, la validez del teorema de Pitágoras y aplicar a la resolución de problemas geométricos y de la vida cotidiana, de manera manual y/o con software educativo' },
        { codigo: 'OA13', descripcion: 'Describir la posición y el movimiento (traslaciones, rotaciones y reflexiones) de figuras 2D, de manera manual y/o con software educativo, utilizando' },
        { codigo: 'OA14', descripcion: 'Componer rotaciones, traslaciones y reflexiones en el plano cartesiano y en el espacio, de manera manual y/o con software educativo, y aplicar a las simetrías de polígonos y poliedros, y a la resolución de problemas geométricos relacionados con el arte' },
        { codigo: 'OA15', descripcion: 'Mostrar que comprenden las medidas de posición, percentiles y cuartiles' },
        { codigo: 'OA16', descripcion: 'Evaluar la forma en que los datos están presentados: fortalezas y debilidades de cada uno' },
        { codigo: 'OA17', descripcion: 'Explicar el principio combinatorio multiplicativo' }
    ],
    '1M': [
        { codigo: 'OA1', descripcion: 'Calcular operaciones con números racionales en forma simbólica' },
        { codigo: 'OA2', descripcion: 'Mostrar que comprenden las potencias de base racional y exponente entero' },
        { codigo: 'OA3', descripcion: 'Desarrollar los productos notables de manera concreta, pictórica y simbólica' },
        { codigo: 'OA4', descripcion: 'Resolver sistemas de ecuaciones lineales (2x2) relacionados con problemas de la vida diaria y de otras asignaturas, mediante representaciones gráficas y simbólicas, de manera manual y/o con software educativo' },
        { codigo: 'OA5', descripcion: 'Graficar relaciones lineales en dos variables de la forma f(x, y) = ax + by; por ejemplo: un haz de rectas paralelas en el plano cartesiano, líneas de nivel en planos inclinados (techo), propagación de olas en el mar y la formación de algunas capas de rocas: c; a, b, c ∈ Q (decimales hasta la décima)' },
        { codigo: 'OA6', descripcion: 'Desarrollar la fórmula de los valores del área y del perímetro de sectores y segmentos circulares, respectivamente, a partir de ángulos centrales de 60°, 90°, 120° y 180°, por medio de representaciones concretas' },
        { codigo: 'OA7', descripcion: 'Desarrollar las fórmulas para encontrar el área de la superficie y el volumen del cono' },
        { codigo: 'OA8', descripcion: 'Mostrar que comprenden el concepto de homotecia' },
        { codigo: 'OA9', descripcion: 'Desarrollar el teorema de Tales mediante las propiedades de la homotecia, para aplicarlo en la resolución de problemas' },
        { codigo: 'OA10', descripcion: 'Aplicar propiedades de semejanza y de proporcionalidad a modelos a escala y otras situaciones de la vida diaria y otras asignaturas' },
        { codigo: 'OA11', descripcion: 'Representar el concepto de homotecia de forma vectorial, relacionándolo con el producto de un vector por un escalar, de manera manual y/o con software educativo' },
        { codigo: 'OA12', descripcion: 'Registrar distribuciones de dos características distintas, de una misma población, en una tabla de doble entrada y en una nube de puntos' },
        { codigo: 'OA13', descripcion: 'Comparar poblaciones mediante la confección de gráficos “xy” para dos atributos de muestras, de manera concreta y pictórica' },
        { codigo: 'OA14', descripcion: 'Desarrollar las reglas de las probabilidades, la regla aditiva, la regla multiplicativa y la combinación de ambas, de manera concreta, pictórica y simbólica, de manera manual y/o con software educativo, en el contexto de la resolución de problemas' },
        { codigo: 'OA15', descripcion: 'Mostrar que comprenden el concepto de azar: educativo' },
        { codigo: 'OA16', descripcion: 'Evaluar la forma en que los datos están presentados: información de los mismos datos representada en distintos tipos de gráficos para determinar fortalezas y debilidades de cada uno. la elección del gráfico para una determinada situación y su correspondiente conjunto de datos. manipulaciones de gráficos para representar datos' }
    ],
    '2M': [
        { codigo: 'OA1', descripcion: 'Realizar cálculos y estimaciones que involucren operaciones con números reales' },
        { codigo: 'OA2', descripcion: 'Mostrar que comprenden las relaciones entre potencias, raíces enésimas y logaritmos' },
        { codigo: 'OA3', descripcion: 'Mostrar que comprenden la función cuadrática f(x)= ax2 + bx + c (a ≠ 0): oferta y demanda' },
        { codigo: 'OA4', descripcion: 'Resolver, de manera concreta, pictórica y simbólica o usando herramientas tecnológicas, ecuaciones cuadráticas de la forma' },
        { codigo: 'OA5', descripcion: 'Mostrar que comprenden la inversa de una función' },
        { codigo: 'OA6', descripcion: 'Explicar el cambio porcentual constante en intervalos de tiempo' },
        { codigo: 'OA7', descripcion: 'Desarrollar las fórmulas del área de la superficie y del volumen de la esfera' },
        { codigo: 'OA8', descripcion: 'Mostrar que comprenden las razones trigonométricas de seno, coseno y tangente en triángulos rectángulos' },
        { codigo: 'OA9', descripcion: 'Aplicar las razones trigonométricas en diversos contextos en la composición y descomposición de vectores y determinar las proyecciones de vectores' },
        { codigo: 'OA10', descripcion: 'Mostrar que comprenden las variables aleatorias finitas' },
        { codigo: 'OA11', descripcion: 'Utilizar permutaciones y la combinatoria sencilla para calcular probabilidades de eventos y resolver problemas' },
        { codigo: 'OA12', descripcion: 'Mostrar que comprenden el rol de la probabilidad en la sociedad' },
        { codigo: 'OA16', descripcion: 'Evaluar la forma en que los datos están presentados: información de los mismos datos representada en distintos tipos de gráficos para determinar fortalezas y debilidades de cada uno. la elección del gráfico para una determinada situación y su correspondiente conjunto de datos. manipulaciones de gráficos para representar datos' }
    ],
    '3M': [
        { codigo: 'OA1', descripcion: 'Resolver problemas de adición, sustracción, multiplicación y división de números complejos C, en forma pictórica, simbólica y con uso de herramientas tecnológicas' },
        { codigo: 'OA2', descripcion: 'Tomar decisiones en situaciones de incerteza que involucren el análisis de datos estadísticos con medidas de dispersión y probabilidades condicionales' },
        { codigo: 'OA3', descripcion: 'Aplicar modelos matemáticos que describen fenómenos o situaciones de crecimiento y decrecimiento, que involucran las funciones exponencial y logarítmica, de forma manuscrita, con uso de herramientas tecnológicas y promoviendo la búsqueda, selección, contrastación y verificación de información en ambientes digitales y redes sociales' },
        { codigo: 'OA4', descripcion: 'Resolver problemas de geometría euclidiana que involucran relaciones métricas entre ángulos, arcos, cuerdas y secantes en la circunferencia, de forma manuscrita y con uso de herramientas tecnológicas. Programa de Estudio Matemática 3° Medio Formación General Visión global del año Unidad nidad nidad nidad l uso de datos Predecir acerca de estadísticos y de Necesidad y aplicación situaciones, utilizando Relaciones métricas en modelos de los números modelos matemáticos geometría probabilísticos para complejos tomar decisiones Objetivos de Objetivos de Objetivos de Objetivos de Aprendizaje Aprendizaje Aprendizaje Aprendizaje OA 2: Tomar OA 3: Aplicar modelos OA 4: Resolver OA 1. Resolver decisiones en matemáticos que describen problemas de problemas de adición, situaciones de fenómenos o situaciones de geometría euclidiana sustracción, incerteza que crecimiento y que involucran multiplicación y división involucren el análisis decrecimiento, que relaciones métricas de números complejos de datos estadísticos involucran las funciones entre ángulos, arcos, C, en forma pictórica, con medidas de exponencial y logarítmica, cuerdas y secantes simbólica y con uso de dispersión y de forma manuscrita, con en la circunferencia, herramientas probabilidades uso de herramientas de forma manuscrita tecnológicas. condicionales. tecnológicas y promoviendo y con uso de la búsqueda, selección, herramientas OA a. Construir y evaluar OA c. Tomar contrastación y verificación tecnológicas. estrategias de manera decisiones de información en colaborativa al resolver fundamentadas en ambientes digitales y redes OA a. Construir y problemas no rutinarios. evidencia estadística sociales. evaluar estrategias y/o en la evaluación de manera OA d. Argumentar, de resultados OA a. Construir y evaluar colaborativa al utilizando lenguaje obtenidos a partir estrategias de manera resolver problemas simbólico y diferentes de un modelo colaborativa al resolver no rutinarios. representaciones para probabilístico. problemas no rutinarios. justificar la veracidad o OA d. Argumentar, falsedad de una OA d. Argumentar, OA e. Construir modelos, utilizando lenguaje conjetura, y evaluar el utilizando lenguaje realizando conexiones entre simbólico y alcance y los límites de simbólico y variables para predecir diferentes los argumentos diferentes posibles escenarios de representaciones utilizados. representaciones solución a un problema, y para justificar la para justificar la tomar decisiones veracidad o falsedad OA g. Elaborar veracidad o falsedad fundamentadas. de una conjetura, y representaciones, tanto de una conjetura, y evaluar el alcance y en forma manual como evaluar el alcance y OA f. Evaluar modelos para los límites de los digital, y justificar cómo los límites de los estudiar un fenómeno, argumentos una misma información argumentos analizando críticamente las utilizados. puede ser utilizada utilizados. simplificaciones requeridas según el tipo de y considerando las representación. limitaciones de aquellos. Programa de Estudio Matemática 3° Medio Formación General' }
    ],
    '4M': [
        { codigo: 'OA1', descripcion: 'Fundamentar decisiones en el ámbito financiero y económico personal o comunitario, a partir de modelos que consideren porcentajes, tasas de interés e índices económicos' },
        { codigo: 'OA2', descripcion: 'Fundamentar decisiones en situaciones de incerteza, a partir del análisis crítico de datos estadísticos y con base en los modelos binomial y normal' },
        { codigo: 'OA3', descripcion: 'Construir modelos de situaciones o fenómenos de crecimiento, decrecimiento y periódicos que involucren funciones potencias de exponente entero y trigonométricas sen(x) y cos(x), de forma manuscrita, con uso de herramientas tecnológicas y promoviendo la búsqueda, selección, contrastación y verificación de información en ambientes digitales y redes sociales' },
        { codigo: 'OA4', descripcion: 'Resolver problemas acerca de rectas y circunferencias en el plano, mediante su representación analítica, de forma manuscrita y con uso de herramientas tecnológicas. Programa de Estudio Matemática 4° Medio Formación General Visión global del año UNIDAD NIDAD NIDAD NIDAD a toma de decisiones La toma de decisiones en situaciones Modelamiento matemático Geometría con en situaciones de financieras y para describir y predecir coordenadas incerteza económicas Objetivos de Aprendizaje Objetivos de Aprendizaje Objetivos de Aprendizaje Objetivos de Aprendizaje OA 2: Fundamentar OA 1: Fundamentar OA 3: Construir modelos de OA 4: Resolver decisiones en decisiones en el situaciones o fenómenos de problemas acerca de situaciones de ámbito financiero y crecimiento, decrecimiento rectas y incerteza, a partir del económico personal o y periódicos que involucren circunferencias en el análisis crítico de datos comunitario, a partir funciones potencia de plano, mediante su estadísticos y con base de modelos que exponente entero y representación en los modelos consideren tasas de trigonométricas sen(x) y analítica, de forma binomial y normal. interés e índices cos(x), de forma manuscrita y con uso económicos. manuscrita, con uso de de herramientas OA c. Tomar decisiones herramientas tecnológicas y tecnológicas. fundamentadas en OA d. Argumentar, promoviendo la búsqueda, evidencia estadística utilizando lenguaje OA d. Argumentar, selección, contrastación y y/o en la evaluación de simbólico y diferentes utilizando lenguaje verificación de información resultados obtenidos a representaciones, para simbólico y diferentes en ambientes digitales y partir de un modelo justificar la veracidad o representaciones, para redes sociales. probabilístico. falsedad de una justificar la veracidad o conjetura, y evaluar el OA e. Construir modelos, falsedad de una OA f. Evaluar modelos alcance y los límites de realizando conexiones entre conjetura, y evaluar el para estudiar un los argumentos variables para predecir alcance y los límites de fenómeno, analizando utilizados. posibles escenarios de los argumentos críticamente las solución a un problema, y utilizados. simplificaciones OA f. Evaluar modelos tomar decisiones OA e. Construir requeridas y realizando para estudiar un fundamentadas. modelos realizando conexiones entre fenómeno, analizando variables para predecir críticamente las OA f. Evaluar modelos para conexiones entre posibles escenarios de simplificaciones estudiar un fenómeno, variables para predecir solución a un requeridas y analizando críticamente las posibles escenarios de problema, y tomar considerando las simplificaciones requeridas solución a un decisiones limitaciones de y considerando las problema, y tomar fundamentadas. aquellos. limitaciones de aquellos. decisiones fundamentadas' }
    ]
  },
  // ── Electivos 3°–4° Medio ────────────────────────────────
  electivos: {
    'geometria3d': {
      nombre: 'Geometría 3D',
      sigla: 'GEO3D',
      oas: [
        { codigo: 'OA1', descripcion: 'Argumentar acerca de la validez de soluciones a situaciones que involucren isometrías y homotecias en el plano, haciendo uso de vectores y de representaciones digitales. OA a. Construir y evaluar estrategias de manera colaborativa al resolver problemas no rutinarios. OA g. Elaborar representaciones, tanto en forma manual como digital, y justificar cómo una misma' },
        { codigo: 'OA2', descripcion: 'Resolver problemas que involucren puntos, rectas y planos en el espacio 3D, haciendo uso de vectores e incluyendo representaciones digitales. OA b. Resolver problemas que impliquen variar algunos parámetros en el modelo utilizado y observar cómo eso influye en los resultados obtenidos' },
        { codigo: 'OA3', descripcion: 'Resolver problemas que involucren relaciones entre figuras 3D y 2D en las que intervengan vistas, cortes, proyecciones en el plano o la inscripción de figuras 3D en otras figuras tridimensionales. OA a. Construir y evaluar estrategias de manera colaborativa al resolver problemas no rutinarios. OA g. Elaborar representaciones, tanto en forma manual como digital, y justificar cómo una misma' },
        { codigo: 'OA4', descripcion: 'Formular y verificar conjeturas acerca de la forma, área y volumen de figuras 3D generadas por rotación o traslación de figuras planas en el espacio, incluyendo el uso de herramientas tecnológicas digitales. OA a. Construir y evaluar estrategias de manera colaborativa al resolver problemas no rutinarios' },
        { codigo: 'OA5', descripcion: 'Diseñar propuestas y resolver problemas educacional o en el entorno– podríamos que relacionados con perspectiva, proyección paralela y intervenir para mejorar la vida comunitaria en central, puntos de fuga y elevaciones, tanto en arte como los ámbitos cultural y físico? en arquitectura, diseño o construcción, aplicando • ¿Qué necesitan los miembros de la comunidad' }
      ]
    },
    'limites': {
      nombre: 'Límites, derivadas e integrales',
      sigla: 'LIMI',
      oas: [
        { codigo: 'OA1', descripcion: 'Utilizar diversas formas de representación acerca de la resultante de la composición de funciones y la existencia de la función inversa de una función dada. OA b. Resolver problemas que impliquen variar algunos parámetros en el modelo utilizado y observar cómo eso influye en los resultados obtenidos' },
        { codigo: 'OA2', descripcion: 'Argumentar acerca de la existencia de límites de funciones en el infinito y en un punto para determinar convergencia y continuidad en contextos matemáticos, de las ciencias y de la vida diaria, en forma manuscrita y utilizando herramientas tecnológicas digitales. OA d. Argumentar, utilizando lenguaje simbólico y diferentes representaciones, para justificar la' },
        { codigo: 'OA3', descripcion: 'Modelar situaciones o fenómenos que involucren rapidez instantánea de cambio y evaluar la necesidad eventual de ajustar el modelo obtenido. OA a. Construir y evaluar estrategias de manera colaborativa al resolver problemas no rutinarios. OA d. Argumentar, utilizando lenguaje simbólico y diferentes representaciones, para justificar la' },
        { codigo: 'OA4', descripcion: 'Resolver problemas que involucren crecimiento o decrecimiento, concavidad, puntos máximos, mínimos o de inflexión de una función, a partir del cálculo de la primera y segunda derivada, en forma manuscrita y utilizando herramientas tecnológicas digitales. OA a. Construir y evaluar estrategias de manera colaborativa al resolver problemas no rutinarios' },
        { codigo: 'OA5', descripcion: 'Modelar situaciones o fenómenos que involucren el concepto de integral como área bajo la curva en contextos matemáticos, de las ciencias y de la vida diaria, en forma manuscrita y utilizando herramientas tecnológicas digitales, y evaluar la necesidad eventual de ajustar el modelo obtenido' }
      ]
    },
    'probabilidades': {
      nombre: 'Probabilidades y estadística descriptiva e inferencial',
      sigla: 'PROB',
      oas: [
        { codigo: 'OA1', descripcion: 'Argumentar y comunicar decisiones a partir del análisis crítico de información presente en histogramas, polígonos de frecuencia, frecuencia acumulada, diagramas de cajón y nube de puntos, incluyendo el uso de herramientas digitales. OA c. Tomar decisiones fundamentadas en evidencia estadística y/o en la evaluación de resultados' },
        { codigo: 'OA2', descripcion: 'Resolver problemas que involucren los conceptos de media muestral, desviación estándar, varianza, coeficiente de variación y correlación muestral entre dos variables, tanto de forma manuscrita como haciendo uso de herramientas tecnológicas digitales. OA b. Resolver problemas que impliquen variar algunos parámetros en el modelo utilizado y observar' },
        { codigo: 'OA3', descripcion: 'Modelar fenómenos o situaciones cotidianas del individuales? ámbito científico y del ámbito social, que requieran el cálculo de probabilidades y la aplicación de las distribuciones binomial y normal' },
        { codigo: 'OA4', descripcion: 'Argumentar inferencias acerca de una estimación de la media parámetros (media y varianza) o características poblacional, con desviación estándar de una población, a partir de datos de una conocida, por medio de intervalos de muestra aleatoria, bajo el supuesto de confianza' }
      ]
    },
    'computacional': {
      nombre: 'Pensamiento computacional y programación',
      sigla: 'COMP',
      oas: [
        { codigo: 'OA1', descripcion: 'Aplicar conceptos de Ciencias de la Computación –abstracción, organización lógica de datos, análisis de soluciones alternativas y generalización– al crear el código de una solución computacional. OA a. Construir y evaluar estrategias de manera colaborativa al resolver problemas no rutinarios. OA d. Argumentar, utilizando lenguaje simbólico y diferentes representaciones para justificar la' },
        { codigo: 'OA3', descripcion: 'Desarrollar y programar algoritmos para ejecutar procedimientos matemáticos, realizar cálculos y obtener términos definidos por una regla o patrón. OA g. Elaborar representaciones, tanto en forma manual como digital, y justificar cómo una misma información puede ser utilizada según el tipo de representación' },
        { codigo: 'OA4', descripcion: 'Crear aplicaciones y realizar análisis mediante procesadores simbólicos, de geometría dinámica y de análisis estadístico. OA d. Argumentar, utilizando lenguaje simbólico y diferentes representaciones para justificar la veracidad o falsedad de una conjetura, y evaluar el alcance y los límites de los argumentos utilizados' },
        { codigo: 'OA5', descripcion: 'Desarrollar aplicaciones para dispositivos móviles y para dispositivos provistos de sensores y mecanismos de control. OA j. Desarrollar un trabajo colaborativo en línea para discusión y resolución de tareas matemáticas, usando herramientas electrónicas de productividad, entornos virtuales y redes sociales' },
        { codigo: 'OA6', descripcion: 'Utilizar la tecnología digital y la información personal y privada que esta contiene de una forma creativa, respetuosa y responsable. OA j. Desarrollar un trabajo colaborativo en línea para discusión y resolución de tareas matemáticas, usando herramientas electrónicas de productividad, entornos virtuales y redes sociales' }
      ]
    }
  }
};


// ══════════════════════════════════════════════════════════════
// HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
// Fuente: Programas de Estudio Mineduc (DS 439/2012 y DS 369/2015)
// Incluye: 1°–8° Básico (Media pendiente)
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['historia'] = {
  nombre: 'Historia, Geografía y Ciencias Sociales',
  sigla:  'HIS',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {
    '1B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Nombrar y secuenciar días de la semana y meses del año, utilizando calendarios, e identificar el año en curso.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Secuenciar acontecimientos y actividades de la vida cotidiana, personal y familiar, utilizando categorías relativas de ubicación temporal como antes, después; ayer, hoy, mañana; día, noche; este año, el año pasado, el año próximo.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Registrar y comunicar información sobre elementos que forman parte de su identidad personal (nombre, fecha de nacimiento, lugar de procedencia, ascendencias, gustos, intereses, amigos y otros) para reconocer sus características individuales.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Obtener y comunicar aspectos de la historia de su familia y sus costumbres, como origen de sus antepasados, los lugares donde vivieron, hitos y tradiciones familiares, a través de relatos, fotografías y entrevistas a adultos, entre otros.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Reconocer diversas expresiones del patrimonio histórico de su entorno familiar y local, como costumbres, tradiciones, leyendas, canciones, construcciones, monumentos y lugares con significado local.' },
      { codigo: 'OA6',  eje: 'Historia',             descripcion: 'Reconocer los símbolos representativos de Chile (como la bandera, el escudo y el himno nacional), describir costumbres, actividades y la participación de hombres y mujeres respecto de conmemoraciones nacionales (Fiestas Patrias, Día del Descubrimiento de dos Mundos, Combate Naval de Iquique, entre otros) y reconocer en ellos un elemento de unidad e identidad nacional.' },
      { codigo: 'OA7',  eje: 'Historia',             descripcion: 'Conocer sobre la vida de hombres y mujeres que han contribuido a la sociedad chilena en diversos ámbitos; por ejemplo, fundadores de ciudades, exploradores, personas que han fundado o creado instituciones, deportistas, científicos, artistas y grandes poetas, entre otros.' },
      { codigo: 'OA8',  eje: 'Geografía',            descripcion: 'Reconocer que los mapas y planos son formas de representar lugares.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Identificar a Chile en mapas, incluyendo la cordillera de los Andes, el océano Pacífico, su país y ciudad, la localidad donde vive, y Santiago, la capital.' },
      { codigo: 'OA10', eje: 'Geografía',            descripcion: 'Ubicar Chile, Santiago, la propia región y su capital en el globo terráqueo o en mapas, y describir características del entorno geográfico cercano, utilizando vocabulario geográfico adecuado (camino, pueblo, construcciones, cordillera, mar, vegetación y desierto, entre otros).' },
      { codigo: 'OA11', eje: 'Geografía',            descripcion: 'Conocer cómo viven otros niños en diferentes partes del mundo por medio de imágenes y relatos, ubicando en un globo terráqueo o mapamundi los países donde viven y comparándolos con la forma en que viven los niños en Chile.' },
      { codigo: 'OA12', eje: 'Geografía',            descripcion: 'Practicar y reconocer algunas normas de prevención de riesgos y cuidado de sí mismo (como normas de tránsito, de seguridad, en caso de desastres naturales) y de autocuidado (como no recibir regalos de desconocidos, rechazar todo tipo de agresiones y solicitar ayuda).' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Mantener una conducta honesta en la vida cotidiana, en los juegos y en el trabajo escolar, hablando con la verdad, respetando las reglas de los juegos sin hacer trampa, y reconociendo sus errores y sus acciones, entre otros.' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Explicar y aplicar algunas normas para la buena convivencia y para la seguridad de todos los miembros de la comunidad escolar que comparten actividades en los diversos ámbitos escolares (sala de clases, patio, actos cívicos, formaciones, entre otros).' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Identificar la labor que cumplen, en beneficio de la comunidad, instituciones como la escuela, la municipalidad, el hospital, Carabineros, bomberos y las personas que trabajan en ellas.' },
      { codigo: 'OA16', eje: 'Formación Ciudadana',  descripcion: 'Conocer, proponer, aplicar y explicar la importancia de algunas normas necesarias para cuidarse, cuidar a otros y evitar situaciones de riesgo (como seguridad vial, vulneración de intimidad, abuso sexual infantil, consumo de drogas, desastres naturales).' }
    ],
    '2B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Describir los modos de vida de algunos pueblos originarios de Chile en el período precolombino, incluyendo ubicación geográfica, medio natural, vida nómada o sedentaria, roles de hombres y mujeres, herramientas y tecnología, alimentación, costumbres, sistemas de creencias, idioma y expresiones artísticas.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Comparar el modo de vida y expresiones culturales de pueblos indígenas presentes en Chile actual (como aymara, mapuche, rapa nui) con los del período precolombino, identificando aspectos de su cultura que se han mantenido hasta el presente y aspectos que han cambiado.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Distinguir los diversos aportes a la sociedad chilena proveniente de los pueblos originarios (palabras, alimentos, tradiciones, cultura, entre otros) y de los españoles (idioma, religión, alimentos, cultura, arquitectura, entre otros), y reconocer nuestra sociedad como mestiza.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Obtener y comunicar aspectos de la historia de su comunidad, como costumbres, tradiciones, ritos, fiestas, leyendas, tradiciones orales y creencias de su localidad o región, mediante entrevistas, narraciones, visitas y otros.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Identificar y dar ejemplos de distintas expresiones del patrimonio cultural de Chile (como conjuntos arquitectónicos, barrios, sitios arqueológicos, artesanía, fiestas populares, música, comidas típicas).' },
      { codigo: 'OA6',  eje: 'Geografía',            descripcion: 'Leer y dibujar planos simples de su entorno, utilizando puntos de referencia, categorías de posición relativa y simbología pictórica.' },
      { codigo: 'OA7',  eje: 'Geografía',            descripcion: 'Ubicar Chile, Santiago, la propia región y su capital en el globo terráqueo o en mapas, y describir la ubicación relativa de países limítrofes y de otros países de América del Sur, utilizando los puntos cardinales.' },
      { codigo: 'OA8',  eje: 'Geografía',            descripcion: 'Clasificar y caracterizar algunos paisajes de Chile según su ubicación en la zona norte, centro y sur del país, observando imágenes, utilizando vocabulario geográfico adecuado (océano, río, cordillera de los Andes y de la Costa, desierto, valle, costa, volcán, archipiélago, lago, ventisquero, entre otros) e identificando recursos naturales presentes.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Distinguir algunos rasgos principales de pueblos y culturas del mundo (lengua, religión, comida, costumbres, celebraciones, bailes) y reconocer que cada cual tiene su propia identidad cultural.' },
      { codigo: 'OA10', eje: 'Geografía',            descripcion: 'Reconocer diversas expresiones del patrimonio natural de Chile y de su región, como paisajes, flora y fauna característicos, y lugares de relevancia natural.' },
      { codigo: 'OA11', eje: 'Formación Ciudadana',  descripcion: 'Mantener una conducta honesta en la vida cotidiana, en los juegos y en el trabajo escolar, hablando con la verdad, respetando las reglas de los juegos sin hacer trampa, y reconociendo sus errores y sus acciones, entre otros.' },
      { codigo: 'OA12', eje: 'Formación Ciudadana',  descripcion: 'Explicar y aplicar algunas normas para la buena convivencia y para la seguridad de todos los miembros de la comunidad escolar, reconociendo su sentido y valor en el ámbito escolar (sala de clases, patio, actos cívicos, formaciones, entre otros).' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Identificar a las autoridades (presidente, alcalde, intendente, entre otros) y explicar algunas de sus labores principales y cómo contribuyen al bien común de la sociedad.' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Conocer, proponer y aplicar formas de resolución pacífica de conflictos, considerando la empatía hacia los otros, el diálogo y el autocuidado.' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Practicar y proponer acciones para cuidar y respetar los espacios públicos dentro y fuera de la escuela (como baños, salas de clases, bibliotecas, plazas, parques, playas y calles, entre otros), y reconocer que estos espacios se deben cuidar porque son compartidos por todos.' },
      { codigo: 'OA16', eje: 'Formación Ciudadana',  descripcion: 'Reconocer la importancia y practicar acciones concretas que contribuyan al cuidado y protección del medio ambiente (como apagar luces, cerrar llaves de agua, no arrojar basura, reciclar, reutilizar).' }
    ],
    '3B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Describir la vida de las personas en las antiguas civilizaciones (griega y romana), considerando ubicación geográfica, actividades económicas, organización política y social, y aportes culturales al mundo actual (ciencias, artes, arquitectura, leyes, democracia, derecho, entre otros).' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Identificar las principales zonas climáticas del mundo (polar, templada, tropical, desértica) y dar ejemplos de distintos paisajes que pueden encontrarse en estas zonas y de cómo las personas han elaborado diferentes estrategias para habitarlas.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Describir los diversos modos de vida de algunas civilizaciones americanas, como mayas, aztecas e incas, considerando ubicación geográfica, organización política y social, actividades económicas, aportes culturales al mundo actual, y formas de relacionarse con el entorno natural.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Localizar, nombrar y ubicar en mapas las principales civilizaciones estudiadas, y comparar sus paisajes y principales características geográficas.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Usar herramientas geográficas como mapas, globo terráqueo, planos, fotografías, cartografía digital, entre otros, para identificar elementos del entorno y ubicar lugares de su interés.' },
      { codigo: 'OA6',  eje: 'Geografía',            descripcion: 'Ubicar en mapas las principales civilizaciones de América precolombina (mayas, aztecas e incas) y del mundo antiguo (griega y romana).' },
      { codigo: 'OA7',  eje: 'Geografía',            descripcion: 'Describir la geografía de Chile, considerando climas, relieve, flora y fauna en las distintas zonas del país (norte grande, norte chico, zona central, zona sur y zona austral), y comparar las formas en que las personas viven y se adaptan a ellas.' },
      { codigo: 'OA8',  eje: 'Geografía',            descripcion: 'Identificar en mapas de Chile la ubicación de las grandes ciudades, de la propia región y de las regiones vecinas, reconociendo las capitales regionales y los principales accidentes geográficos.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Distinguir recursos naturales renovables y no renovables, dar ejemplos de ambos y proponer medidas para el uso responsable de los recursos.' },
      { codigo: 'OA10', eje: 'Geografía',            descripcion: 'Reconocer y ubicar en mapas recursos significativos de Chile (como cobre, frutas, productos del mar, vinos, entre otros), explicar sus procesos de exportación y su aporte al país y las regiones.' },
      { codigo: 'OA11', eje: 'Formación Ciudadana',  descripcion: 'Asumir sus deberes en la casa y en la escuela (como cumplir con sus tareas escolares y ayudar en su familia), y dar ejemplos del aporte que estos deberes hacen al bienestar común.' },
      { codigo: 'OA12', eje: 'Formación Ciudadana',  descripcion: 'Reconocer que los niños tienen derechos que les permiten recibir un cuidado especial por parte de la sociedad (a tener una vivienda, alimentación, educación, protección, a expresar opiniones), y dar ejemplos de cómo la sociedad resguarda estos derechos.' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Participar en forma guiada en su comunidad, escuchando las opiniones de los demás, compartiendo actividades con distintos grupos y cumpliendo compromisos que apunten al bienestar común.' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Distinguir algunos actores de la vida social (padres, profesores, alcaldes, autoridades) y reconocer las instituciones que lideran (familia, escuela, municipalidad, gobierno).' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Identificar y explicar, a partir de ejemplos concretos, formas en que se organizan las personas para lograr objetivos comunes, y reconocer el rol de distintos actores que componen una comunidad.' },
      { codigo: 'OA16', eje: 'Formación Ciudadana',  descripcion: 'Participar activamente en conversaciones grupales sobre textos leídos o escuchados en clases o temas de su interés, manteniendo el foco de la conversación, expresando opiniones fundamentadas y respetando los turnos y las opiniones de los demás.' }
    ],
    '4B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Explicar los viajes de descubrimiento de Cristóbal Colón, de Hernando de Magallanes y de algún otro explorador, considerando sus objetivos, las rutas recorridas, los avances tecnológicos que facilitaron la navegación, las dificultades y los desafíos que enfrentaron las tripulaciones.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Describir el proceso de conquista de América y de Chile, incluyendo a los principales actores (Corona española, colonizadores y conquistadores como Cristóbal Colón, Hernán Cortés, Francisco Pizarro, Diego de Almagro y Pedro de Valdivia), algunas expediciones y conflictos bélicos con los pueblos indígenas y la fundación de ciudades como expresión de la voluntad de permanencia de los españoles en el territorio.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Describir algunas dimensiones de la vida colonial en Chile, como organización de la sociedad y grupos sociales, oficios y actividades económicas, costumbres y vida cotidiana, arte y construcciones.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Investigar, a partir de distintas fuentes, sobre el proceso de mestizaje y el legado cultural de españoles y pueblos indígenas en la sociedad chilena (como idioma, religión, alimentos, costumbres), reconociendo su importancia para la conformación de la sociedad chilena.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Investigar sobre los efectos de la conquista sobre los pueblos indígenas americanos (en lo social, cultural, demográfico) y comparar diferentes visiones sobre este proceso.' },
      { codigo: 'OA6',  eje: 'Geografía',            descripcion: 'Ubicar en mapas las principales rutas de viajes de descubrimiento y de conquista de América y de Chile.' },
      { codigo: 'OA7',  eje: 'Geografía',            descripcion: 'Investigar sobre problemas ambientales (como la escasez de agua, la contaminación de ríos y mares, la deforestación) y proponer soluciones creativas y factibles que favorezcan el cuidado del medio ambiente y el uso responsable de los recursos.' },
      { codigo: 'OA8',  eje: 'Geografía',            descripcion: 'Describir distintos paisajes del continente americano, considerando climas, ríos, población, idiomas, países y grandes ciudades, entre otros, y utilizando vocabulario geográfico adecuado.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Reconocer y ubicar en mapas las grandes zonas geográficas de Chile (norte grande, norte chico, zona central, zona sur y zona austral) y comparar sus características físicas y humanas.' },
      { codigo: 'OA10', eje: 'Geografía',            descripcion: 'Distinguir las principales características de cada una de las grandes zonas de Chile, en cuanto a relieve, clima, flora, fauna, recursos naturales y actividades económicas, utilizando mapas, imágenes y gráficos.' },
      { codigo: 'OA11', eje: 'Formación Ciudadana',  descripcion: 'Explicar en palabras propias lo que son los derechos, reconocer en su entorno situaciones en que estos se respetan o se vulneran, y dar ejemplos de cómo se pueden proteger.' },
      { codigo: 'OA12', eje: 'Formación Ciudadana',  descripcion: 'Explicar y aplicar algunos elementos fundamentales de una sociedad democrática (como la elección de autoridades y representantes), las instituciones que forman parte del Estado (municipios, gobierno regional, poderes Ejecutivo, Legislativo, Judicial) y el rol que cumplen.' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Explicar sus derechos y responsabilidades como niño o niña, destacando la importancia de practicar acciones cotidianas que hagan referencia a ellos (como expresar opiniones, cumplir con sus deberes, cuidar el entorno, respetar a los demás).' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Distinguir algunas instituciones del Estado de Chile, reconocer sus principales funciones y relevancia para la vida de las personas, y describir el rol que cumplen respecto de la participación ciudadana.' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Reconocer, describir y dar ejemplos de sus derechos y responsabilidades como miembros de una comunidad, destacando la importancia del compromiso, la solidaridad, la tolerancia y el respeto en la convivencia cotidiana.' },
      { codigo: 'OA16', eje: 'Formación Ciudadana',  descripcion: 'Participar en forma guiada en su comunidad, mediante iniciativas que consideren proyectos sociales, económicos o culturales que contribuyan al bienestar de la comunidad escolar.' }
    ],
    '5B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Explicar los múltiples antecedentes de la independencia de las colonias americanas y reconocer que la independencia de Chile se enmarca en un proceso continental.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Explicar el desarrollo del proceso de independencia de Chile, considerando actores y bandos que se enfrentaron, hombres y mujeres destacados, avances y retrocesos de la causa patriota y algunos acontecimientos significativos (Primera Junta Nacional de Gobierno, batallas de Rancagua, Chacabuco y Maipú, declaración de la Independencia).' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Analizar y comparar las principales características de las Repúblicas conservadora y liberal del siglo XIX, como organización política, principales medidas económicas, sociales, educacionales, entre otras.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Describir algunos hitos y procesos de la organización de la República, como las dificultades y los desafíos de la organización política, la Constitución de 1833, las políticas de Diego Portales y el impacto de la guerra contra la Confederación Perú-Boliviana.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Describir la sociedad chilena del siglo XIX, considerando temas como la vida cotidiana en la ciudad y el campo, diferencias entre la vida rural y urbana, nuevos medios de transporte y comunicación (como el ferrocarril, telégrafo), influencia de las corrientes europeas en la cultura (como la moda, educación, arquitectura, costumbres).' },
      { codigo: 'OA6',  eje: 'Historia',             descripcion: 'Explicar aspectos centrales de la Guerra del Pacífico, como las causas, actores involucrados, las decisiones estratégicas del Estado, las grandes batallas y el impacto en el país.' },
      { codigo: 'OA7',  eje: 'Historia',             descripcion: 'Explicar la ocupación de la Araucanía, el poblamiento de Valdivia, Llanquihue y Chiloé, y la incorporación de Isla de Pascua, Antofagasta y Tarapacá, reconociendo los intereses del Estado chileno al llevar a cabo estos procesos.' },
      { codigo: 'OA8',  eje: 'Historia',             descripcion: 'Describir algunos hitos y procesos de la historia de Chile durante el siglo XIX, considerando eventos como la ocupación del territorio y el desarrollo de la economía salitrera, la cuestión social, y crisis políticas como la guerra civil de 1891.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Caracterizar las grandes zonas de Chile y sus paisajes (norte grande, norte chico, zona central, zona sur y zona austral) considerando ubicación, clima, relieve, hidrografía, población y recursos naturales, entre otros.' },
      { codigo: 'OA10', eje: 'Geografía',            descripcion: 'Explicar cómo las características físicas de cada una de las grandes zonas de Chile han influido en el asentamiento humano y en los tipos de actividades económicas desarrolladas en cada una de ellas.' },
      { codigo: 'OA11', eje: 'Geografía',            descripcion: 'Reconocer y explicar factores de producción en Chile (como recursos naturales, trabajo, capital y tecnología) y clasificar las actividades económicas según la extracción de recursos naturales (primarias), la transformación de recursos (secundarias) y la prestación de servicios (terciarias).' },
      { codigo: 'OA12', eje: 'Geografía',            descripcion: 'Investigar y explicar diferentes expresiones culturales de Chile, considerando comidas, fiestas, canciones, danzas, poesía y artesanía, entre otras, y valorar su diversidad.' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Reconocer sus principales derechos en situaciones de la vida cotidiana, como el derecho a la educación, a contar con alimentación, vivienda, recreo y servicios médicos adecuados, a expresarse, a ser protegido contra el abandono y la crueldad, y a no trabajar antes de la edad mínima permitida.' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Reconocer que todas las personas son sujetos de derecho, y que estos derechos no dependen de características individuales como etnia, sexo, lugar de nacimiento u otras.' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Caracterizar a Chile como una república democrática y explicar la importancia de que el poder público sea ejercido por autoridades que son elegidas por la ciudadanía.' },
      { codigo: 'OA16', eje: 'Formación Ciudadana',  descripcion: 'Distinguir los tres poderes del Estado, identificando las principales instituciones y autoridades que componen cada uno y sus atribuciones.' }
    ],
    '6B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Explicar el desarrollo del proceso de industrialización en Chile desde la segunda mitad del siglo XIX, caracterizando los cambios tecnológicos (como la llegada del ferrocarril, telégrafo), el auge económico del salitre y sus efectos en la economía (aduanas, incentivo al comercio), y los cambios en la sociedad (migración campo-ciudad, aumento poblacional, mejora de servicios urbanos).' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Describir algunos hitos y procesos relevantes de la historia de Chile del siglo XX (ampliación del sufragio, nuevos derechos civiles y sociales, cambios en la economía, crisis económica de 1929, reformas estructurales de los años 1960 y 1970, quiebre democrático, dictadura, proceso de recuperación de la democracia), sus consecuencias y su proyección hacia nuestros días.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Explicar aspectos centrales de la sociedad chilena del siglo XX, como cambios en la familia, en el rol de la mujer, en el sistema educacional, en los medios de comunicación, y las transformaciones de la vida cotidiana.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Caracterizar el periodo de la dictadura militar en Chile, considerando la violación a los derechos humanos, la transformación económica, política y social, y el plebiscito de 1988 como la vuelta a la democracia.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Describir algunos hitos y procesos de la recuperación de la democracia en Chile desde 1990, tales como los principales cambios políticos y económicos, el rol de los partidos políticos y movimientos sociales, los avances en materia de derechos humanos y la creciente integración del país en el mundo.' },
      { codigo: 'OA6',  eje: 'Geografía',            descripcion: 'Explicar los distintos tipos de recursos naturales (renovables, no renovables e inagotables) y las principales actividades económicas de Chile relacionadas con ellos (agricultura, ganadería, pesca, minería, silvicultura, etc.), identificando los principales recursos que se extraen en las regiones del país.' },
      { codigo: 'OA7',  eje: 'Geografía',            descripcion: 'Describir distintos paisajes de Chile, considerando climas, relieves, vegetación, recursos naturales y actividades humanas, entre otros, y explicar cómo las personas se han adaptado y transformado el medio.' },
      { codigo: 'OA8',  eje: 'Geografía',            descripcion: 'Explicar características de la población de Chile, considerando aspectos demográficos (distribución de la población, composición por sexo y edad, crecimiento poblacional, migración, urbanización) y su impacto en la sociedad.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Caracterizar las grandes zonas de Chile y sus paisajes (norte grande, norte chico, zona central, zona sur y zona austral) considerando su clima, relieve, hidrografía, población y recursos productivos.' },
      { codigo: 'OA10', eje: 'Geografía',            descripcion: 'Explicar y dar ejemplos de las distintas actividades económicas del país, identificando tipos de trabajo, factores productivos, zonas donde se concentran y su importancia para el desarrollo económico y social.' },
      { codigo: 'OA11', eje: 'Formación Ciudadana',  descripcion: 'Explicar algunos elementos fundamentales de la organización democrática de Chile, incluyendo la división de los poderes del Estado, la representación mediante cargos de elección popular (presidente, parlamentarios, alcaldes y concejales), la importancia de la participación ciudadana y el respeto por la diversidad de ideas y creencias.' },
      { codigo: 'OA12', eje: 'Formación Ciudadana',  descripcion: 'Evaluar, considerando aportes de la Constitución de Chile, cómo la libre participación ciudadana, la organización en diversas agrupaciones y el respeto a los derechos humanos, favorecen la vida en comunidad.' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Explicar que los derechos generan deberes y responsabilidades en las personas y en el Estado, lo que se traduce en que los ciudadanos cumplen las leyes, respetan a los demás, contribuyen al país y el Estado garantiza los derechos y provee servicios (como salud, educación, seguridad).' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Reconocer que la Constitución Política de Chile establece la organización política del país y garantiza los derechos y las libertades de las personas, instaurando una república democrática.' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Investigar sobre la discriminación hacia diversos grupos (pueblos indígenas, inmigrantes, mujeres, personas con discapacidad, etc.) en el Chile actual y proponer acciones que contribuyan a combatirla, fomentar la igualdad de derechos y valorar la diversidad.' },
      { codigo: 'OA16', eje: 'Formación Ciudadana',  descripcion: 'Opinar y argumentar con fundamentos sobre temas de la asignatura u otros, y reconocer la importancia del respeto por opiniones distintas a la propia en el debate democrático.' }
    ],
    '7B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Explicar el proceso de hominización, reconociendo las principales etapas de la evolución de la especie humana, la influencia de factores geográficos, su dispersión en el planeta y las distintas teorías sobre el poblamiento americano.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Explicar que el surgimiento de la agricultura, la domesticación de animales, la sedentarización, la acumulación de bienes y los avances tecnológicos (cerámica, metalurgia, etc.) fueron procesos de larga duración que revolucionaron la forma en que los seres humanos se relacionaron con el espacio geográfico.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Explicar las principales características de las primeras civilizaciones (como Mesopotamia, Egipto, China, India) y reconocer su legado en el desarrollo del mundo antiguo y actual.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Analizar las principales características de la civilización griega, considerando aspectos como la organización política de las polis, el origen de la democracia, el rol de las mujeres, la esclavitud, la expansión colonial, las guerras y la cultura (filosofía, ciencia, arte y literatura).' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Analizar las principales características de la civilización romana, considerando el paso de la República al Imperio, la expansión territorial, la organización política y jurídica, la economía, la religión y el legado cultural (derecho romano, idiomas, arquitectura, obras públicas, vida urbana).' },
      { codigo: 'OA6',  eje: 'Historia',             descripcion: 'Analizar, apoyándose en fuentes, el canon cultural que se constituyó en la Antigüedad clásica, considerando los aportes de griegos y romanos a nuestra concepción de la política, el derecho, la ciencia, la filosofía y el arte.' },
      { codigo: 'OA7',  eje: 'Historia',             descripcion: 'Caracterizar el mar Mediterráneo como ecúmene y como espacio de circulación e intercambio, y analizar las formas en que su uso ha perdurado hasta el presente.' },
      { codigo: 'OA8',  eje: 'Historia',             descripcion: 'Analizar el proceso de expansión y caída del Imperio romano de Occidente, considerando el rol de los pueblos germanos, los cambios políticos, económicos y sociales, y el surgimiento de la Europa medieval.' },
      { codigo: 'OA9',  eje: 'Historia',             descripcion: 'Caracterizar la Edad Media como un período en que se configuraron las bases de la civilización europea, considerando el cristianismo, la cultura clásica y la herencia de los pueblos germánicos.' },
      { codigo: 'OA10', eje: 'Historia',             descripcion: 'Explicar los efectos de la caída del Imperio romano y la consecuente ruralización y fragmentación política, considerando el surgimiento del feudalismo como sistema político, económico y social, y las invasiones a Europa (musulmanas, vikingas, magiares).' },
      { codigo: 'OA11', eje: 'Historia',             descripcion: 'Analizar las principales características de la sociedad feudal y el impacto del cristianismo, considerando la fragmentación del poder político, las relaciones de dependencia entre señores y vasallos, y la jerarquía de la Iglesia católica.' },
      { codigo: 'OA12', eje: 'Historia',             descripcion: 'Analizar el desarrollo y el legado de la civilización musulmana, considerando factores geográficos, su expansión, su organización política, su cultura (religión islámica, ciencia, artes) y sus aportes al mundo medieval y actual.' },
      { codigo: 'OA13', eje: 'Historia',             descripcion: 'Caracterizar los principales rasgos del renacimiento de la vida urbana medieval (siglos XI–XIII), como el aumento demográfico, la expansión agrícola, el desarrollo del comercio y la aparición de las ciudades, y evaluar sus consecuencias.' },
      { codigo: 'OA14', eje: 'Geografía',            descripcion: 'Analizar la expansión europea, considerando las motivaciones para explorar y conquistar, los adelantos tecnológicos, la relevancia de los viajes, la redefinición del mapa y del comercio mundial y el impacto en Europa y otras sociedades.' },
      { codigo: 'OA15', eje: 'Geografía',            descripcion: 'Investigar sobre problemas medioambientales relacionados con fenómenos como el calentamiento global, la contaminación y el deterioro de los recursos naturales, y reconocer el impacto de la acción humana en el medio natural.' },
      { codigo: 'OA16', eje: 'Geografía',            descripcion: 'Reconocer procesos de adaptación y transformación que se derivan de la relación entre el ser humano y el medio, e identificar factores que inciden en el asentamiento de las sociedades humanas (disponibilidad de recursos, clima, relieve, vías de comunicación).' },
      { codigo: 'OA17', eje: 'Formación Ciudadana',  descripcion: 'Identificar los principios, mecanismos e instituciones que permitieron que en Atenas surgiera la democracia, y reconocer su legado en las democracias actuales (participación ciudadana, debate público, igualdad ante la ley).' },
      { codigo: 'OA18', eje: 'Formación Ciudadana',  descripcion: 'Analizar cómo los distintos tipos de gobierno (democracia, monarquía, república, imperio, tiranía) enfrentaron desafíos políticos, considerando ejemplos de la Antigüedad clásica y del mundo medieval.' },
      { codigo: 'OA19', eje: 'Formación Ciudadana',  descripcion: 'Reconocer los principales desafíos que enfrenta el ejercicio ciudadano hoy en relación con la protección de los derechos humanos, la exclusión y discriminación, y proponer acciones para contribuir al respeto y valoración de la diversidad.' },
      { codigo: 'OA20', eje: 'Formación Ciudadana',  descripcion: 'Investigar sobre instituciones políticas y procesos históricos que han sido importantes en la construcción de la democracia moderna, y valorar el legado de la Antigüedad y la Edad Media.' }
    ],
    '8B': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Analizar, apoyándose en diversas fuentes, la centralidad del ser humano y su capacidad de transformar el mundo en las ideas del Renacimiento, considerando sus características principales (humanismo, antropocentrismo, individualismo, curiosidad científica, valoración de la Antigüedad clásica) y su impacto en las artes, las ciencias y la política.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Comparar la sociedad medieval y moderna, considerando los cambios que implicó la ruptura de la unidad religiosa de Europa, el surgimiento del Estado moderno, la transformación económica (mercantilismo, capitalismo comercial) y los cambios en la mentalidad y la vida cotidiana.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Caracterizar el Estado moderno considerando sus principales rasgos, como la concentración del poder en la figura del rey, la burocracia profesional, la creación de ejércitos permanentes y la unificación territorial, e identificar cómo estas características se expresan en la actualidad.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Argumentar por qué la llegada de los europeos a América implicó un enfrentamiento entre culturas, considerando los diversos procesos de dominación y sincretismo cultural, y reconocer el legado presente en la sociedad actual.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Analizar el impacto de la conquista de América sobre los pueblos indígenas (violencia, mestizaje, evangelización, reducciones, encomiendas, trabajo forzoso) y valorar sus formas de resistencia y los procesos de mestizaje biológico y cultural que se originaron.' },
      { codigo: 'OA6',  eje: 'Historia',             descripcion: 'Explicar que la conquista española de América y Chile supuso la imposición de la cultura del conquistador y, a la vez, originó una nueva sociedad marcada por el mestizaje y el sincretismo cultural, reconocible hasta el presente.' },
      { codigo: 'OA7',  eje: 'Historia',             descripcion: 'Analizar la organización colonial y las transformaciones del siglo XVIII, considerando las reformas borbónicas, la creación de nuevas instituciones y el impacto económico, social y político en las colonias americanas y en Chile.' },
      { codigo: 'OA8',  eje: 'Historia',             descripcion: 'Caracterizar el orden colonial en Chile, considerando sus principales instituciones políticas (Gobernación, Real Audiencia, Cabildos), el rol de la Iglesia, las relaciones entre grupos sociales, la economía basada en la hacienda y las relaciones con los pueblos indígenas.' },
      { codigo: 'OA9',  eje: 'Historia',             descripcion: 'Explicar las causas y consecuencias de la Ilustración, considerando los principios de razón, libertad, igualdad, progreso, y valorar su influencia en las revoluciones políticas del siglo XVIII (Independencia de Estados Unidos, Revolución Francesa) y en la Independencia de las colonias americanas.' },
      { codigo: 'OA10', eje: 'Historia',             descripcion: 'Analizar los procesos de independencia de las colonias americanas y sus proyectos políticos posteriores, considerando la participación popular, las ideas ilustradas, el rol de los próceres y los desafíos de la organización republicana.' },
      { codigo: 'OA11', eje: 'Historia',             descripcion: 'Explicar el proceso de independencia de Chile, considerando su contexto internacional (influencia de la Ilustración, Revolución Francesa, Independencia de EE.UU.), actores clave, bandos, principales batallas y proyectos políticos que surgieron.' },
      { codigo: 'OA12', eje: 'Historia',             descripcion: 'Caracterizar el proceso de organización de la República de Chile durante las primeras décadas del siglo XIX, identificando los principales actores políticos, los distintos ensayos constitucionales, los conflictos y consensos y la consolidación del orden conservador.' },
      { codigo: 'OA13', eje: 'Geografía',            descripcion: 'Analizar las transformaciones del espacio geográfico europeo y americano entre los siglos XV y XVIII, considerando la expansión territorial, los cambios en el paisaje y el impacto sobre las sociedades originarias.' },
      { codigo: 'OA14', eje: 'Geografía',            descripcion: 'Analizar, a partir de diversas fuentes, las características del proceso de globalización comercial iniciado en el siglo XVI y sus efectos económicos, sociales y culturales en Europa, América y otras partes del mundo.' },
      { codigo: 'OA15', eje: 'Geografía',            descripcion: 'Explicar los distintos tipos de recursos naturales y las principales actividades económicas que se desarrollaron durante los siglos XV al XVIII, y evaluar su impacto social y ambiental.' },
      { codigo: 'OA16', eje: 'Formación Ciudadana',  descripcion: 'Caracterizar los principios y las instituciones de las democracias modernas, considerando la Declaración de los Derechos del Hombre y del Ciudadano (1789), la separación de los poderes del Estado y la universalidad de los derechos humanos.' },
      { codigo: 'OA17', eje: 'Formación Ciudadana',  descripcion: 'Analizar la importancia de los derechos humanos como fundamento de las sociedades democráticas y las consecuencias de su vulneración en la historia reciente, valorando el rol de las instituciones y organismos que velan por ellos.' },
      { codigo: 'OA18', eje: 'Formación Ciudadana',  descripcion: 'Reconocer los principales desafíos que enfrentan las democracias en el mundo actual (participación ciudadana, transparencia, pluralismo, respeto a las minorías, combate a la corrupción) y proponer acciones que contribuyan a fortalecerlas.' },
      { codigo: 'OA19', eje: 'Formación Ciudadana',  descripcion: 'Investigar procesos históricos de ampliación de derechos (como el sufragio universal, la igualdad de género, los derechos de los trabajadores, los derechos de los pueblos indígenas) y analizar su impacto en la conformación de las sociedades democráticas contemporáneas.' },
      { codigo: 'OA20', eje: 'Formación Ciudadana',  descripcion: 'Evaluar el legado histórico y cultural del período estudiado (siglos XV al XVIII) en la formación del mundo moderno, reconociendo continuidades y rupturas en los ámbitos político, económico, social y cultural.' }
    ],
    '1M': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Explicar las transformaciones sociales, políticas, económicas y culturales que surgen con la crisis del orden liberal a fines del siglo XIX y durante las primeras décadas del siglo XX, considerando el cuestionamiento al parlamentarismo, la emergencia de movimientos obreros y las demandas sociales, el surgimiento de nuevas ideologías, y los cambios en el rol del Estado.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Analizar el impacto de la Primera Guerra Mundial, considerando las transformaciones territoriales, políticas, económicas y sociales derivadas de ella, como el surgimiento de nuevos Estados, los tratados de paz, la crisis económica de posguerra y los cambios en las mentalidades.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Analizar y evaluar las causas, características y consecuencias del periodo de entreguerras, con foco en la crisis del modelo liberal (Gran Depresión), la emergencia de regímenes totalitarios y la Guerra Civil Española, y reconocer sus efectos en Chile.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Analizar los desafíos que enfrentó el Estado y la sociedad chilena durante las primeras décadas del siglo XX (cuestión social, parlamentarismo, proyectos de reforma, rol de los nuevos sectores medios, movimientos obreros y de mujeres) y evaluar los cambios políticos, económicos y sociales que permitieron transformar el país.' },
      { codigo: 'OA5',  eje: 'Historia',             descripcion: 'Caracterizar los principales procesos políticos, económicos y sociales del Chile de mediados del siglo XX, considerando el Estado de compromiso, el proyecto desarrollista (industrialización por sustitución de importaciones), la ampliación de derechos sociales y políticos, y los proyectos de reforma estructural.' },
      { codigo: 'OA6',  eje: 'Historia',             descripcion: 'Analizar la Segunda Guerra Mundial, considerando sus causas y características (totalitarismo, genocidio, bombardeos atómicos), sus consecuencias a nivel mundial (surgimiento de EE.UU. y la URSS como superpotencias, creación de la ONU, descolonización) y el impacto en Chile y América Latina.' },
      { codigo: 'OA7',  eje: 'Historia',             descripcion: 'Caracterizar la Guerra Fría como un enfrentamiento ideológico, político y económico entre EE.UU. y la URSS, considerando sus principales crisis (Muro de Berlín, Cuba, Vietnam), la carrera armamentista y espacial, y su impacto en América Latina (intervencionismo, Revolución Cubana, doctrinas de seguridad nacional).' },
      { codigo: 'OA8',  eje: 'Historia',             descripcion: 'Analizar los procesos de cambio y polarización política en Chile entre 1958 y 1973, considerando los proyectos de reforma (Alessandri, Frei Montalva, Allende), la Reforma Agraria, la nacionalización del cobre, las transformaciones sociales y la crisis democrática que desembocó en el quiebre institucional de 1973.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Analizar las transformaciones del espacio geográfico chileno y latinoamericano durante el siglo XX, considerando la urbanización, la industrialización, los procesos migratorios campo-ciudad y las transformaciones del paisaje rural y urbano.' },
      { codigo: 'OA10', eje: 'Geografía',            descripcion: 'Analizar la globalización como un proceso geográfico, económico y cultural que ha transformado el mundo desde la segunda mitad del siglo XX, considerando el desarrollo de las comunicaciones, la interdependencia económica, los flujos migratorios y la hibridación cultural.' },
      { codigo: 'OA11', eje: 'Geografía',            descripcion: 'Analizar cómo las actividades humanas han transformado el territorio, generando problemáticas ambientales (deforestación, contaminación, pérdida de biodiversidad) y evaluando su impacto en el desarrollo sostenible.' },
      { codigo: 'OA12', eje: 'Formación Ciudadana',  descripcion: 'Analizar el concepto de Estado de derecho, reconociendo los principios de legalidad, separación de poderes, responsabilidad de los gobernantes, respeto a los derechos humanos y control ciudadano, como pilares de una sociedad democrática.' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Evaluar el impacto de la violación sistemática a los derechos humanos durante el período de la dictadura militar en Chile (1973–1990), considerando los mecanismos represivos, las formas de resistencia, y el rol de los organismos nacionales e internacionales en la defensa de los derechos humanos.' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Analizar la recuperación de la democracia en Chile desde 1990, considerando los desafíos de la transición, los avances en materia de derechos humanos, las transformaciones políticas, económicas y sociales, y los pendientes de la democracia actual.' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Reconocer la importancia de la participación ciudadana y el respeto a la diversidad en la construcción de una sociedad democrática, y proponer formas de compromiso con los desafíos del país y del mundo actual.' }
    ],
    '2M': [
      { codigo: 'OA1',  eje: 'Historia',             descripcion: 'Analizar las transformaciones de la sociedad y la cultura contemporánea, considerando los procesos de secularización, el desarrollo científico y tecnológico, los cambios en la familia y en los roles de género, y la emergencia de nuevas subjetividades y movimientos culturales desde mediados del siglo XX.' },
      { codigo: 'OA2',  eje: 'Historia',             descripcion: 'Analizar el fin de la Guerra Fría, considerando la caída del Muro de Berlín, la disolución de la URSS, y sus consecuencias geopolíticas, económicas y culturales en el mundo y en Chile, incluyendo la consolidación de un mundo unipolar y la posterior emergencia de nuevos actores internacionales.' },
      { codigo: 'OA3',  eje: 'Historia',             descripcion: 'Analizar los procesos de integración regional y subregional en América Latina (Mercosur, Comunidad Andina, Alianza del Pacífico) y sus desafíos, considerando las dimensiones económicas, políticas y culturales, y evaluar su aporte al desarrollo de Chile.' },
      { codigo: 'OA4',  eje: 'Historia',             descripcion: 'Reconocer los principales hitos del proceso de democratización del Estado chileno durante el siglo XX, considerando la ampliación del sufragio, la incorporación de la mujer a la política, el reconocimiento de los derechos de los pueblos originarios, los derechos sociales y los desafíos pendientes.' },
      { codigo: 'OA5',  eje: 'Geografía',            descripcion: 'Caracterizar el territorio nacional como un espacio diverso y dinámico, analizando las grandes macrozonas de Chile (norte, centro, sur, austral, insular), sus paisajes, poblamiento, actividades económicas y cómo se han transformado por la acción humana y los procesos globales.' },
      { codigo: 'OA6',  eje: 'Geografía',            descripcion: 'Analizar el rol de los recursos naturales en la economía nacional y en las economías regionales, considerando la matriz productiva de Chile, los procesos de extracción, transformación y exportación, y los desafíos de la sustentabilidad y la diversificación productiva.' },
      { codigo: 'OA7',  eje: 'Geografía',            descripcion: 'Analizar los desafíos demográficos actuales en Chile y el mundo (envejecimiento poblacional, transición demográfica, migraciones internacionales, urbanización, concentración metropolitana) y su impacto en las políticas públicas y en la calidad de vida.' },
      { codigo: 'OA8',  eje: 'Geografía',            descripcion: 'Evaluar los impactos ambientales del desarrollo económico contemporáneo en Chile y en el mundo (cambio climático, pérdida de biodiversidad, contaminación, escasez hídrica) y analizar iniciativas locales, regionales y globales orientadas al desarrollo sostenible.' },
      { codigo: 'OA9',  eje: 'Geografía',            descripcion: 'Caracterizar la globalización como un proceso multidimensional (económico, político, cultural, tecnológico) que ha reconfigurado las relaciones entre los países y los territorios, y evaluar sus impactos en la sociedad chilena.' },
      { codigo: 'OA10', eje: 'Economía',             descripcion: 'Analizar el funcionamiento básico del sistema económico (mercado, oferta y demanda, rol del Estado, sistema monetario, indicadores económicos como PIB, IPC, desempleo) y evaluar cómo las políticas económicas afectan la vida cotidiana de las personas.' },
      { codigo: 'OA11', eje: 'Economía',             descripcion: 'Evaluar las transformaciones del mercado del trabajo contemporáneo en Chile y en el mundo, considerando la flexibilización laboral, la automatización, la precarización, los derechos laborales y los desafíos para la inclusión y equidad.' },
      { codigo: 'OA12', eje: 'Formación Ciudadana',  descripcion: 'Analizar los mecanismos e instituciones de la democracia representativa en Chile (sistema electoral, partidos políticos, Congreso, poder Ejecutivo, poder Judicial, órganos autónomos) y evaluar su funcionamiento, sus desafíos y los mecanismos de participación ciudadana vigentes.' },
      { codigo: 'OA13', eje: 'Formación Ciudadana',  descripcion: 'Evaluar el rol del Estado en la garantía de los derechos humanos, considerando los derechos civiles, políticos, económicos, sociales y culturales, y analizar los desafíos de Chile en materia de derechos humanos, especialmente respecto de pueblos originarios, mujeres, niños, migrantes y personas con discapacidad.' },
      { codigo: 'OA14', eje: 'Formación Ciudadana',  descripcion: 'Reconocer el valor de la participación ciudadana en la democracia, considerando los mecanismos institucionales (plebiscitos, elecciones, consultas) y no institucionales (movimientos sociales, medios de comunicación, redes sociales) y proponer formas de participación informada y responsable.' },
      { codigo: 'OA15', eje: 'Formación Ciudadana',  descripcion: 'Analizar el concepto de ciudadanía global en un contexto de interdependencia mundial, considerando los desafíos comunes a la humanidad (paz, derechos humanos, medio ambiente, desarrollo sostenible, cooperación internacional) y el rol de Chile en organismos internacionales.' }
    ]
  }
};

// ══════════════════════════════════════════════════════════════
// ELECTIVOS 3°–4° MEDIO (Plan Diferenciado HCS)
// ══════════════════════════════════════════════════════════════

// ── Chile y la región latinoamericana (electivo HCS) ──────────
CURRICULA_PLAN_COMUN['chile-latam'] = {
  nombre: 'Chile y la región latinoamericana',
  sigla:  'CLA',
  niveles: ['3M','4M'],
  oas: {
    '3M': [
      { codigo: 'OA1', eje: 'Historia',             descripcion: 'Analizar los procesos de conformación de la nación y de los Estados latinoamericanos durante el siglo XIX, considerando los proyectos políticos, la consolidación territorial, las luchas por la independencia y la organización de las nuevas repúblicas, y evaluar la influencia de estos procesos en la identidad regional.' },
      { codigo: 'OA2', eje: 'Historia',             descripcion: 'Analizar las transformaciones económicas, sociales y políticas de Chile y América Latina durante el siglo XX (modernización, industrialización, populismos, revoluciones, dictaduras militares, retorno a la democracia) e interpretar su proyección hacia el presente.' },
      { codigo: 'OA3', eje: 'Geografía',            descripcion: 'Caracterizar el espacio geográfico de Chile y América Latina considerando la diversidad de paisajes, climas, recursos naturales y formas de poblamiento, y evaluar los desafíos ambientales y territoriales actuales (megaminería, deforestación amazónica, contaminación urbana, escasez hídrica).' },
      { codigo: 'OA4', eje: 'Sociedad y cultura',   descripcion: 'Analizar la diversidad social y cultural de América Latina considerando la multiculturalidad, los pueblos indígenas, la herencia afrodescendiente, las migraciones y los procesos de hibridación cultural, y reconocer su aporte a la identidad regional.' },
      { codigo: 'OA5', eje: 'Formación Ciudadana',  descripcion: 'Evaluar los desafíos comunes que enfrentan los países latinoamericanos en materia de democracia, derechos humanos, desigualdad social, violencia, corrupción, narcotráfico y migraciones, y proponer estrategias de cooperación regional.' },
      { codigo: 'OA6', eje: 'Formación Ciudadana',  descripcion: 'Analizar el rol de Chile en América Latina y en el mundo, considerando los procesos de integración regional (Mercosur, Alianza del Pacífico, Unasur, Celac), la cooperación internacional y el lugar de Chile en organismos multilaterales.' }
    ],
    '4M': [
      { codigo: 'OA1', eje: 'Historia',             descripcion: 'Analizar los procesos de cambio social en América Latina en el siglo XXI, considerando movimientos indígenas, feministas, estudiantiles, medioambientales, y evaluar su impacto en las agendas políticas nacionales y regionales.' },
      { codigo: 'OA2', eje: 'Geografía',            descripcion: 'Evaluar las desigualdades territoriales y socioeconómicas al interior de Chile y entre los países de América Latina, considerando indicadores de desarrollo humano, concentración de la riqueza, acceso a servicios, y proponer estrategias para su superación.' },
      { codigo: 'OA3', eje: 'Sociedad y cultura',   descripcion: 'Analizar los desafíos culturales contemporáneos en Chile y América Latina, considerando la protección del patrimonio, la industria cultural, la circulación de las artes, el acceso a la cultura y el rol de los medios digitales.' }
    ]
  }
};

// ── Mundo global (electivo HCS) ───────────────────────────────
CURRICULA_PLAN_COMUN['mundo-global'] = {
  nombre: 'Comprensión histórica del presente (Mundo global)',
  sigla:  'MUG',
  niveles: ['3M','4M'],
  oas: {
    '3M': [
      { codigo: 'OA1', eje: 'Historia',             descripcion: 'Analizar los principales procesos históricos que han configurado el mundo global actual, considerando el fin de la Guerra Fría, la reunificación alemana, la disolución de la URSS, el auge del neoliberalismo, la emergencia de China e India y la redefinición de las relaciones internacionales.' },
      { codigo: 'OA2', eje: 'Geografía',            descripcion: 'Evaluar el impacto de la globalización económica en las sociedades contemporáneas, considerando la interdependencia financiera, la deslocalización productiva, los tratados de libre comercio y la emergencia de nuevos actores económicos.' },
      { codigo: 'OA3', eje: 'Sociedad y cultura',   descripcion: 'Analizar los procesos de hibridación y homogeneización cultural en un mundo globalizado, considerando el rol de los medios de comunicación, las industrias culturales, internet, las redes sociales y el surgimiento de identidades transnacionales.' },
      { codigo: 'OA4', eje: 'Sociedad y cultura',   descripcion: 'Reconocer la multiculturalidad y la diversidad religiosa como rasgos de las sociedades contemporáneas, y evaluar los desafíos de la convivencia en contextos de pluralismo cultural, migración y tensiones interculturales.' },
      { codigo: 'OA5', eje: 'Formación Ciudadana',  descripcion: 'Analizar los principales desafíos globales del siglo XXI (cambio climático, terrorismo, crisis migratorias, pandemias, desigualdad global, ciberseguridad) y evaluar el rol de los organismos internacionales, los Estados y la ciudadanía global en su abordaje.' },
      { codigo: 'OA6', eje: 'Formación Ciudadana',  descripcion: 'Evaluar el concepto de ciudadanía global y los desafíos éticos y políticos que enfrentan las democracias contemporáneas (populismos, polarización, posverdad, amenazas a las libertades, desinformación) y proponer formas de compromiso crítico con el mundo global.' }
    ],
    '4M': [
      { codigo: 'OA1', eje: 'Historia',             descripcion: 'Analizar la emergencia de nuevas potencias y la redefinición del orden mundial en el siglo XXI, considerando el auge de Asia-Pacífico, el rol de China como actor global, los conflictos en Medio Oriente y los desafíos del multilateralismo.' },
      { codigo: 'OA2', eje: 'Geografía',            descripcion: 'Analizar los procesos de transformación del espacio urbano contemporáneo (metropolización, segregación, gentrificación, sostenibilidad urbana) y evaluar sus impactos sociales, económicos y ambientales.' },
      { codigo: 'OA3', eje: 'Sociedad y cultura',   descripcion: 'Evaluar el impacto de las tecnologías digitales en la sociedad contemporánea, considerando la revolución de los datos, la inteligencia artificial, la automatización del trabajo, y los desafíos éticos y políticos que emergen.' }
    ]
  }
};

// ══════════════════════════════════════════════════════════════
// CIENCIAS NATURALES (Básica) / BIOLOGÍA / FÍSICA / QUÍMICA
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['ciencias'] = {
  nombre: 'Ciencias Naturales',
  sigla:  'CN',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  // Ejes: Ciencias de la Vida · Ciencias Físicas y Químicas · Ciencias de la Tierra y el Universo
  oas: {
    '1B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer y observar, por medio de la exploración, que los seres vivos crecen, responden a estímulos del medio, se reproducen y necesitan agua, alimento y aire para vivir, comparándolos con las cosas no vivas.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar y describir la ubicación y la función de los sentidos, proponiendo medidas para proteger y cuidar los órganos de los sentidos.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar e identificar, por medio de la exploración, las estructuras principales de las plantas: hojas, flores, tallos y raíces.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar y comparar animales de acuerdo a características como tamaño, cubierta corporal, estructuras de desplazamiento y tipo de desplazamiento, entre otras.' },
      { codigo: 'OA5',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar la ubicación y explicar la función de algunas partes del cuerpo que son fundamentales para vivir: corazón, pulmones, estómago, esqueleto y músculos.' },
      { codigo: 'OA6',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar, describir y comunicar hábitos de vida saludable para mantener el cuerpo sano y prevenir enfermedades (actividad física, aseo del cuerpo, lavado de alimentos, alimentación saludable, entre otros).' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Describir el tiempo atmosférico identificando instrumentos y marcadores como el viento, la temperatura y la precipitación.' },
      { codigo: 'OA8',  eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir características de las estaciones del año y sus efectos sobre los seres vivos (animales y plantas) y el ambiente.' },
      { codigo: 'OA9',  eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Relacionar las principales características (forma, tamaño, distancia, entre otras) del Sol, la Tierra y la Luna con algunos fenómenos como los días y las noches, las sombras o las estaciones del año.' },
      { codigo: 'OA10', eje: 'Ciencias Físicas y Químicas',           descripcion: 'Observar, describir y clasificar los cambios que experimenta el agua al ser expuesta al frío y al calor, a partir de experimentos simples.' },
      { codigo: 'OA11', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir, dar ejemplos y practicar acciones cotidianas que contribuyen a cuidar el medioambiente, como apagar las luces, cerrar la llave del agua, reciclar y reutilizar.' }
    ],
    '2B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar y comparar las características de las etapas del ciclo de vida de distintos animales (mamíferos, aves, insectos y anfibios), relacionando con su hábitat.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar y comparar las características y necesidades de las plantas (luz, agua, dióxido de carbono y minerales), reconociendo su importancia para el ser humano.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar y distinguir, por medio de la exploración, las partes de una planta y las características de sus hojas, como forma, borde y tamaño, comparándolas.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida',                   descripcion: 'Explicar la importancia de los animales, las plantas y el agua para los seres humanos, y proponer medidas para su cuidado.' },
      { codigo: 'OA5',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar la ubicación y explicar la función de los sentidos, proponiendo medidas para cuidarlos y para prevenir situaciones de riesgo.' },
      { codigo: 'OA6',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar y describir acciones para mantener una buena salud física y mental, como una alimentación adecuada, higiene personal, ejercicio físico, descanso y recreación.' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Describir y registrar el ciclo diario y las diferencias entre el día y la noche, a partir de la observación del Sol, la Luna, las estrellas y la luminosidad del cielo, entre otras, y reconocer los beneficios de la luz solar.' },
      { codigo: 'OA8',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Distinguir objetos tecnológicos que aportan beneficios a las personas y proteger el ambiente.' },
      { codigo: 'OA9',  eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir las características de algunos de los componentes del sistema solar (Sol, planetas, lunas, cometas y asteroides) en relación con su tamaño y localización.' },
      { codigo: 'OA10', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir las principales características del paisaje costero, de los ríos y lagos, distinguiendo sus componentes y reconociendo acciones humanas que los afectan.' },
      { codigo: 'OA11', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Identificar y comunicar los efectos de las actividades humanas sobre los paisajes y proponer medidas para el cuidado del entorno (reducir, reutilizar y reciclar).' }
    ],
    '3B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer y explicar que los seres vivos están formados por una o más células y que estas se organizan en tejidos, órganos y sistemas.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar y comparar las principales características de los vertebrados (mamíferos, aves, reptiles, anfibios y peces), ejemplificando para cada grupo.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar y clasificar los invertebrados (insectos, arácnidos, crustáceos, moluscos, entre otros) y distinguir características comunes y diferentes.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer y comparar diversos hábitats de los animales (polar, marino, desértico, entre otros) y las principales características y adaptaciones que les permiten vivir en ellos.' },
      { codigo: 'OA5',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer, observar y distinguir cadenas alimentarias simples, identificando productores, consumidores y descomponedores en ecosistemas terrestres y acuáticos.' },
      { codigo: 'OA6',  eje: 'Ciencias de la Vida',                   descripcion: 'Explicar la importancia de los alimentos para el crecimiento y desarrollo de los seres humanos, identificando alimentos saludables y no saludables.' },
      { codigo: 'OA7',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar, describir y clasificar las semillas y los frutos de diferentes plantas, así como la forma en que se dispersan.' },
      { codigo: 'OA8',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Identificar y describir las propiedades de la luz (viaja en línea recta, produce sombras, puede reflejarse), a partir de experiencias simples.' },
      { codigo: 'OA9',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Investigar, en forma experimental, los materiales que permiten el paso de la luz (transparentes, translúcidos y opacos), clasificándolos según su comportamiento.' },
      { codigo: 'OA10', eje: 'Ciencias Físicas y Químicas',           descripcion: 'Identificar los sonidos del entorno, describiendo sus diferencias (fuerte, suave, agudo, grave) y reconociendo fuentes sonoras naturales y artificiales.' },
      { codigo: 'OA11', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir las características del suelo (retención de agua, presencia de arena, tierra y rocas) y explicar su importancia para los seres vivos.' },
      { codigo: 'OA12', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Reconocer los cambios experimentados por el agua en el ciclo del agua, considerando estados físicos y la acción del Sol y del viento.' }
    ],
    '4B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer y explicar que los seres vivos están formados por una o más células, y que estas se agrupan formando tejidos, órganos y sistemas que cumplen funciones especializadas.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida',                   descripcion: 'Observar y comparar ciclos de vida de plantas con flor y sin flor (musgos y helechos), y describir las etapas de germinación, crecimiento, reproducción, formación de flor y fruto y dispersión de la semilla.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer y explicar el rol de las plantas en la cadena alimentaria, identificando productores, consumidores y descomponedores, y el flujo de energía.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida',                   descripcion: 'Analizar el efecto de la actividad humana sobre las plantas y animales, proponiendo medidas para su protección y mejor convivencia.' },
      { codigo: 'OA5',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar la ubicación y explicar la función de algunas partes del cuerpo humano (huesos, músculos, corazón, pulmones) y asociarlas a sus funciones.' },
      { codigo: 'OA6',  eje: 'Ciencias de la Vida',                   descripcion: 'Describir la importancia de una alimentación balanceada, equilibrada y saludable para el adecuado funcionamiento del cuerpo y el buen estado de salud.' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Identificar y describir las propiedades de la materia y los cambios físicos que experimenta (cambios de estado) a partir de experiencias.' },
      { codigo: 'OA8',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Medir y registrar la temperatura, la masa y el volumen de la materia utilizando instrumentos adecuados.' },
      { codigo: 'OA9',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Explicar el movimiento de los objetos en términos de distancia, tiempo y rapidez, utilizando un instrumento simple (cronómetro, cinta métrica).' },
      { codigo: 'OA10', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir las características de la litósfera, hidrósfera y atmósfera, y los componentes de cada una, reconociendo sus interacciones.' },
      { codigo: 'OA11', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir los efectos benéficos y perjudiciales del Sol sobre los seres vivos y el medioambiente, y algunas medidas de protección ante la sobreexposición solar.' },
      { codigo: 'OA12', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Explicar los efectos de las catástrofes naturales (terremotos, maremotos, volcanismo, inundaciones, sequías) sobre las personas y el medioambiente, y comunicar medidas de prevención y seguridad.' }
    ],
    '5B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer y explicar que los seres vivos están formados por una o más células y que estas se organizan en tejidos, órganos y sistemas con funciones especializadas.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar y describir por medio de modelos las estructuras básicas del sistema nervioso (encéfalo, médula espinal y nervios) y sus funciones, asociándolas a la coordinación del organismo.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida',                   descripcion: 'Explicar la importancia de los hábitos saludables (alimentación balanceada, ejercicio físico, descanso, higiene) para mantener el buen funcionamiento del cuerpo y prevenir enfermedades.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida',                   descripcion: 'Analizar el consumo de algunas drogas y los efectos nocivos para el organismo, destacando las formas de prevención y protección.' },
      { codigo: 'OA5',  eje: 'Ciencias de la Vida',                   descripcion: 'Analizar, comparar y clasificar los ecosistemas chilenos, identificando componentes bióticos y abióticos, factores que inciden en su equilibrio y amenazas por acción humana.' },
      { codigo: 'OA6',  eje: 'Ciencias de la Vida',                   descripcion: 'Investigar y reportar sobre los efectos de las actividades humanas en los ecosistemas, proponiendo acciones para su conservación y la recuperación.' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Identificar y describir las propiedades de la materia (masa, volumen, densidad) y los cambios físicos y químicos, distinguiéndolos a partir de experiencias sencillas.' },
      { codigo: 'OA8',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Explicar, por medio de modelos, que la materia está formada por partículas (átomos y moléculas) en movimiento y con distinto grado de cohesión en los estados sólido, líquido y gaseoso.' },
      { codigo: 'OA9',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Identificar y describir las propiedades de las mezclas homogéneas y heterogéneas, y algunos métodos simples de separación (filtración, decantación, evaporación, tamizado).' },
      { codigo: 'OA10', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir el movimiento del Sistema Solar (Sol y planetas) y los efectos de la traslación y rotación de la Tierra en la sucesión de días y noches y en las estaciones del año.' },
      { codigo: 'OA11', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Describir las características de los eclipses, fases de la Luna y mareas, y relacionarlos con los movimientos del Sistema Sol–Tierra–Luna.' }
    ],
    '6B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida',                   descripcion: 'Identificar y describir la función de los principales componentes de los sistemas respiratorio, circulatorio, digestivo y excretor del cuerpo humano, reconociendo su interrelación.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida',                   descripcion: 'Explicar los cambios que experimenta el cuerpo humano durante la pubertad (cambios físicos, psicológicos, sociales, diferencias entre hombres y mujeres) y su importancia en el desarrollo integral de la persona.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida',                   descripcion: 'Reconocer y explicar la función de los órganos del sistema reproductor femenino y masculino, y asociarlos con los procesos de la reproducción humana.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida',                   descripcion: 'Investigar, experimental y bibliográficamente, los efectos nocivos del consumo de tabaco y alcohol en el organismo, proponiendo medidas de prevención y autocuidado.' },
      { codigo: 'OA5',  eje: 'Ciencias de la Vida',                   descripcion: 'Analizar e investigar los efectos de la actividad humana sobre los ecosistemas (deforestación, contaminación, incendios, caza), proponiendo acciones para su conservación y sustentabilidad.' },
      { codigo: 'OA6',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Identificar y describir las propiedades y transformaciones de la energía (cinética, potencial, térmica, lumínica, eléctrica, sonora), y algunos ejemplos de su transformación en el entorno cotidiano.' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Explicar algunas formas de generación y transmisión de electricidad y describir circuitos eléctricos simples, usando materiales conductores y aislantes, y representarlos mediante modelos.' },
      { codigo: 'OA8',  eje: 'Ciencias Físicas y Químicas',           descripcion: 'Investigar, experimentalmente, la forma en que se transfiere el calor entre los materiales (conducción, convección, radiación), distinguiendo conductores y aislantes térmicos.' },
      { codigo: 'OA9',  eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Explicar, con base en evidencia, que los suelos presentan características y propiedades distintas (color, retención de agua, permeabilidad, capacidad de producción), y que estas inciden en la vida de los organismos.' },
      { codigo: 'OA10', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Investigar y describir los principales recursos naturales de Chile, su uso y los efectos de la actividad humana en su disponibilidad, y proponer formas de uso responsable.' }
    ],
    '7B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar, por medio de modelos, la organización estructural y funcional de los seres vivos desde la célula hasta sistemas de órganos, reconociendo los niveles de organización biológica.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Describir, por medio de modelos, la estructura y función de los sistemas digestivo, respiratorio y circulatorio del cuerpo humano, y explicar su interrelación.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Investigar y explicar los efectos nocivos del consumo excesivo de alcohol, tabaco y otras sustancias en los sistemas respiratorio, circulatorio y nervioso, y proponer medidas de prevención.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar la importancia de la actividad física y una alimentación saludable para prevenir enfermedades cardiovasculares, respiratorias y metabólicas.' },
      { codigo: 'OA5',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Investigar y analizar las funciones, la ubicación y las estructuras del sistema reproductor humano (femenino y masculino) y explicar el ciclo menstrual, la fecundación y el desarrollo embrionario.' },
      { codigo: 'OA6',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Explicar que las ondas transportan energía sin transportar materia, distinguiendo los tipos de ondas (transversales y longitudinales), sus propiedades (amplitud, frecuencia, longitud de onda, rapidez) y su relación con el sonido.' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Describir y aplicar los principios básicos de la óptica geométrica (reflexión y refracción) y explicar cómo se forman las imágenes en espejos planos y lentes simples.' },
      { codigo: 'OA8',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Explicar la estructura y organización de la materia a partir del modelo atómico (protones, neutrones, electrones) y la tabla periódica (grupos, períodos, propiedades periódicas).' },
      { codigo: 'OA9',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Investigar experimentalmente y explicar los enlaces químicos (iónico y covalente) y las fórmulas de compuestos químicos más comunes en la vida cotidiana (agua, sal, azúcar, dióxido de carbono).' },
      { codigo: 'OA10', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Investigar y describir los principales procesos geológicos (tectónica de placas, formación de montañas, erupciones volcánicas, sismos) y explicar sus efectos en el territorio.' }
    ],
    '8B': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar, por medio de modelos, la organización e interacción de los componentes del sistema nervioso (central y periférico) y endocrino, y su rol en la homeostasis del organismo.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Investigar y explicar la estructura, función y modo de transmisión de distintos agentes infecciosos (virus, bacterias, hongos, parásitos), y las formas de prevención de enfermedades asociadas.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar la teoría de la evolución y el concepto de selección natural, a partir de las evidencias fósiles, anatómicas y moleculares, y los aportes de Darwin.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Analizar y explicar cómo las acciones humanas afectan la biodiversidad y los ecosistemas, proponiendo acciones de conservación del patrimonio natural.' },
      { codigo: 'OA5',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Analizar y aplicar los conceptos de fuerza y movimiento (leyes de Newton, fuerza de gravedad, fuerza normal, fuerza de roce), explicando fenómenos cotidianos.' },
      { codigo: 'OA6',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Aplicar los conceptos de energía cinética y potencial, identificando transformaciones en distintos sistemas (mecánicos, térmicos, eléctricos) y la conservación de la energía.' },
      { codigo: 'OA7',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Explicar las reacciones químicas (reactantes, productos, ley de conservación de la masa) y clasificarlas (síntesis, descomposición, sustitución, combustión), a partir de experimentos.' },
      { codigo: 'OA8',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Explicar la formación y propiedades de soluciones químicas (disolución, soluto, solvente, concentración) y los factores que afectan la solubilidad y la rapidez de la disolución.' },
      { codigo: 'OA9',  eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Investigar y explicar las principales causas y efectos del cambio climático global, y proponer medidas de mitigación y adaptación a nivel personal, local y global.' },
      { codigo: 'OA10', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Analizar y describir la estructura y evolución del universo (Big Bang, formación de galaxias, estrellas y sistemas planetarios), apoyándose en modelos y evidencia.' }
    ],
    '1M': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar la organización celular de los seres vivos (célula procarionte y eucarionte, animal y vegetal), y la función de los principales organelos celulares.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Analizar los procesos metabólicos celulares de obtención y transformación de energía (fotosíntesis y respiración celular), y explicar el flujo de energía en los ecosistemas.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Analizar la estructura y función del material genético (ADN, ARN, genes, cromosomas) y explicar los mecanismos básicos de la herencia (mitosis, meiosis, leyes de Mendel).' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar, con base en evidencia, los mecanismos de evolución (selección natural, deriva genética, mutación), y su impacto en la diversidad biológica.' },
      { codigo: 'OA5',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Describir y explicar el movimiento de los cuerpos en términos de magnitudes físicas (posición, desplazamiento, rapidez, velocidad, aceleración) y las leyes de Newton.' },
      { codigo: 'OA6',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Analizar los fenómenos de la mecánica de fluidos (presión, principio de Arquímedes, principio de Pascal, principio de Bernoulli) y sus aplicaciones tecnológicas.' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Aplicar los conceptos de trabajo, energía y potencia, y el principio de conservación de la energía, en la resolución de situaciones mecánicas.' },
      { codigo: 'OA8',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Explicar la estructura atómica de la materia (modelo atómico actual, configuración electrónica) y la organización de los elementos químicos en la tabla periódica.' },
      { codigo: 'OA9',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Analizar los tipos de enlaces químicos (iónico, covalente, metálico) y su relación con las propiedades macroscópicas de los compuestos.' },
      { codigo: 'OA10', eje: 'Ciencias Químicas (Química)',           descripcion: 'Aplicar los conceptos de estequiometría y reacciones químicas, a partir de ecuaciones balanceadas y cálculos con moles.' },
      { codigo: 'OA11', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Analizar la dinámica de los procesos geológicos internos (tectónica de placas, sismicidad, vulcanismo) y su impacto en el territorio chileno.' },
      { codigo: 'OA12', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Evaluar el impacto del cambio climático y los problemas ambientales globales (contaminación, sobreexplotación de recursos, pérdida de biodiversidad), y analizar estrategias para el desarrollo sostenible.' }
    ],
    '2M': [
      { codigo: 'OA1',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar la estructura y función de los sistemas nervioso y endocrino y su rol en la coordinación e integración de las respuestas del organismo, incluyendo el control hormonal y la homeostasis.' },
      { codigo: 'OA2',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Explicar, con base en evidencia, los mecanismos de la respuesta inmune humana, el rol de las vacunas y la importancia de las medidas de prevención de enfermedades infecciosas.' },
      { codigo: 'OA3',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Analizar e investigar los efectos de las drogas (alcohol, tabaco, cannabis, cocaína, entre otras) en el sistema nervioso y en la vida social, y proponer estrategias de prevención.' },
      { codigo: 'OA4',  eje: 'Ciencias de la Vida (Biología)',        descripcion: 'Analizar, con base en evidencia, los niveles de organización ecológicos (poblaciones, comunidades, ecosistemas) y los flujos de materia y energía en los ecosistemas.' },
      { codigo: 'OA5',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Explicar los fenómenos ondulatorios (sonido y luz) y sus aplicaciones (ecografía, fibra óptica, láser, efecto Doppler), y la naturaleza dual de la luz (onda y partícula).' },
      { codigo: 'OA6',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Aplicar las leyes del electromagnetismo (Coulomb, Ohm, Faraday, Ampère) para explicar fenómenos eléctricos y magnéticos, y describir aplicaciones tecnológicas (motores, generadores, transformadores).' },
      { codigo: 'OA7',  eje: 'Ciencias Físicas (Física)',             descripcion: 'Analizar los fenómenos térmicos (calor, temperatura, dilatación, cambios de estado) y aplicar las leyes de la termodinámica en sistemas físicos y tecnológicos.' },
      { codigo: 'OA8',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Analizar los tipos de reacciones químicas (ácido-base, oxidación-reducción, precipitación, combustión) y sus aplicaciones en procesos industriales y biológicos.' },
      { codigo: 'OA9',  eje: 'Ciencias Químicas (Química)',           descripcion: 'Explicar la estructura y propiedades de los compuestos del carbono (hidrocarburos, alcoholes, ácidos, aminas, ésteres) y su importancia en la química de la vida y en la industria.' },
      { codigo: 'OA10', eje: 'Ciencias Químicas (Química)',           descripcion: 'Analizar los procesos químicos en disoluciones (ácido-base, pH, reacciones de neutralización) y sus aplicaciones en la vida cotidiana (alimentación, medicina, industria).' },
      { codigo: 'OA11', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Analizar los ciclos biogeoquímicos (carbono, nitrógeno, fósforo, agua) y su rol en el equilibrio de los ecosistemas, e identificar cómo la acción humana los altera.' },
      { codigo: 'OA12', eje: 'Ciencias de la Tierra y el Universo',   descripcion: 'Evaluar los impactos de las actividades humanas en la atmósfera (cambio climático, capa de ozono, contaminación del aire) y proponer medidas locales y globales de mitigación.' }
    ]
  }
};

CURRICULA_PLAN_COMUN['biologia'] = {
  nombre: 'Biología',
  sigla:  'BIO',
  niveles: ['1M','2M','3M','4M'],
  oas: {}
};

CURRICULA_PLAN_COMUN['fisica'] = {
  nombre: 'Física',
  sigla:  'FIS',
  niveles: ['1M','2M','3M','4M'],
  oas: {}
};

CURRICULA_PLAN_COMUN['quimica'] = {
  nombre: 'Química',
  sigla:  'QUI',
  niveles: ['1M','2M','3M','4M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// INGLÉS — Idioma Extranjero Inglés
// Fuente: Programas de Estudio Mineduc (Bases Curriculares vigentes)
// Ejes: Comprensión auditiva, Comprensión lectora, Expresión oral, Expresión escrita
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['ingles'] = {
  nombre: 'Inglés',
  sigla:  'ING',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
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

// ══════════════════════════════════════════════════════════════
// EDUCACIÓN FÍSICA Y SALUD
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['ed-fisica'] = {
  nombre: 'Educación Física y Salud',
  sigla:  'EDF',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// ARTES VISUALES
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['artes'] = {
  nombre: 'Artes Visuales',
  sigla:  'ART',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// MÚSICA
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['musica'] = {
  nombre: 'Música',
  sigla:  'MUS',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// TECNOLOGÍA
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['tecnologia'] = {
  nombre: 'Tecnología',
  sigla:  'TEC',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
  oas: {}
};

// ══════════════════════════════════════════════════════════════
// ORIENTACIÓN
// ══════════════════════════════════════════════════════════════
CURRICULA_PLAN_COMUN['orientacion'] = {
  nombre: 'Orientación',
  sigla:  'ORI',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  oas: {}
};

// ── Helper: obtener OAs por asignatura y nivel ─────────────
function getPlanComunOAs(asignatura, nivel) {
  var sigla = (asignatura || '').toLowerCase();
  // Buscar por sigla o por nombre parcial
  for (var key in CURRICULA_PLAN_COMUN) {
    var item = CURRICULA_PLAN_COMUN[key];
    if (key === sigla ||
        (item.sigla && item.sigla.toLowerCase() === sigla) ||
        (item.nombre && item.nombre.toLowerCase().indexOf(sigla) !== -1)) {
      return (item.oas && item.oas[nivel]) ? item.oas[nivel] : [];
    }
  }
  return [];
}

// ── Helper: lista de asignaturas para un nivel ─────────────
function getPlanComunAsignaturas(nivel) {
  var result = [];
  for (var key in CURRICULA_PLAN_COMUN) {
    var item = CURRICULA_PLAN_COMUN[key];
    if (!nivel || (item.niveles && item.niveles.indexOf(nivel) !== -1)) {
      result.push({ key: key, nombre: item.nombre, sigla: item.sigla });
    }
  }
  return result;
}
