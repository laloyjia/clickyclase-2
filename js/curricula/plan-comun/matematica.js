// =============================================================================
//  PLAN COMÚN — Matemática
//  Archivo: js/curricula/plan-comun/matematica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['matematica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['matematica'] = {
  nombre: 'Matemática',
  sigla:  'MAT',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    '1B': ['Números y operaciones','Patrones y álgebra','Geometría','Medición','Datos y probabilidades'],
    '2B': ['Números y operaciones','Patrones y álgebra','Geometría','Medición','Datos y probabilidades'],
    '3B': ['Números y operaciones','Patrones y álgebra','Geometría','Medición','Datos y probabilidades'],
    '4B': ['Números y operaciones','Patrones y álgebra','Geometría','Medición','Datos y probabilidades'],
    '5B': ['Números y operaciones','Patrones y álgebra','Geometría','Medición','Datos y probabilidades'],
    '6B': ['Números y operaciones','Patrones y álgebra','Geometría','Medición','Datos y probabilidades'],
    '7B': ['Números','Álgebra y funciones','Geometría','Probabilidad y estadística'],
    '8B': ['Números','Álgebra y funciones','Geometría','Probabilidad y estadística'],
    '1M': ['Números y Álgebra','Geometría','Probabilidad y Estadística'],
    '2M': ['Números y Álgebra','Geometría','Probabilidad y Estadística'],
    '3M': ['Números y Álgebra','Geometría','Probabilidad y Estadística'],
    '4M': ['Números y Álgebra','Geometría','Probabilidad y Estadística']
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Resolver problemas','Representar','Modelar','Argumentar y comunicar'],
  oas: {
    '1B': [
        { codigo: 'OA1', eje: 'Números', descripcion: 'Contar números naturales del 0 al 100, de 1 en 1, de 2 en 2, de 5 en 5 y de 10 en 10, hacia delante y hacia atrás, empezando por cualquier número menor que 100' },
        { codigo: 'OA2', eje: 'Números', descripcion: 'Identificar el orden de los elementos de una serie, utilizando números ordinales del primero (1º) al décimo (10º)' },
        { codigo: 'OA3', eje: 'Números', descripcion: 'Leer números del 0 al 20 y representarlos de manera concreta, pictórica y simbólica' },
        { codigo: 'OA4', eje: 'Números', descripcion: 'Comparar y ordenar números del 0 al 20 de menor a mayor y/o viceversa, utilizando material concreto y/o software educativo' },
        { codigo: 'OA5', eje: 'Números', descripcion: 'Estimar cantidades hasta 20 en situaciones concretas, usando un referente' },
        { codigo: 'OA6', eje: 'Números', descripcion: 'Componer y descomponer números del 0 al 20 de manera aditiva de forma concreta, pictórica y simbólica' },
        { codigo: 'OA7', eje: 'Números', descripcion: 'Describir y aplicar estrategias de cálculo mental para las adiciones y sustracciones hasta 20: atrás' },
        { codigo: 'OA8', eje: 'Números', descripcion: 'Determinar las unidades y decenas en números del 0 al 20, agrupando de a 10 de manera concreta, pictórica y simbólica' },
        { codigo: 'OA9', eje: 'Números', descripcion: 'Demostrar que comprende la adición y la sustracción de números del 0 a 20, progresivamente de 0 a 5, de 6 a 10 y de 11 a 20: para describir acciones desde su propia experiencia sustracciones con material concreto y pictórico, de manera manual y/o usando software educativo forma simbólica contextos familiares cos y resolviéndolos' },
        { codigo: 'OA10', eje: 'Números', descripcion: 'Demostrar que la adición y la sustracción son operaciones inversas, de manera concreta, pictórica y simbólica' },
        { codigo: 'OA11', eje: 'Patrones y álgebra', descripcion: 'Reconocer, describir, crear y continuar patrones repetitivos (sonidos, figuras, ritmos…) y patrones numéricos hasta 20, crecientes y decrecientes usando material concreto, pictórico y simbólico de manera manual y/o por medio de software educativo' },
        { codigo: 'OA12', eje: 'Geometría', descripcion: 'Identificar en el entorno figuras 3D y figuras 2D y relacionarlas, usando material concreto' },
        { codigo: 'OA13', eje: 'Números', descripcion: 'Describir la posición de objetos y personas con relación a sí mismos y a otros objetos y personas, usando un lenguaje común (como derecha e izquierda)' },
        { codigo: 'OA14', eje: 'Geometría', descripcion: 'Identificar en el entorno 1 figuras 3D y figuras 2D y Identifica relacionarlas, usando ma-' },
        { codigo: 'OA15', eje: 'Geometría', descripcion: 'Identificar y dibujar líneas rectas y curvas' },
        { codigo: 'OA16', eje: 'Números', descripcion: 'Usar unidades no estandarizadas de tiempo para comparar la duración de eventos cotidianos' },
        { codigo: 'OA17', eje: 'Medición', descripcion: 'Usar un lenguaje cotidiano para secuenciar eventos en el tiempo: días de la semana, meses del año y algunas fechas significativas' },
        { codigo: 'OA18', eje: 'Medición', descripcion: 'Identificar y comparar la longitud de objetos, usando palabras como largo y corto' },
        { codigo: 'OA19', eje: 'Datos y probabilidades', descripcion: 'Recolectar y registrar datos para responder preguntas estadísticas sobre sí mismo y el entorno, usando bloques, tablas de conteo y pictogramas' },
        { codigo: 'OA20', eje: 'Números', descripcion: 'Construir, leer e interpretar pictogramas' }
    ],
    '2B': [
        { codigo: 'OA1', eje: 'Números', descripcion: 'Contar números naturales del 0 al 1 000 de 2 en 2, de 5 en 5 y de 10 en 10 hacia adelante y hacia atrás, empezando por cualquier número menor que 1 000' },
        { codigo: 'OA2', eje: 'Números', descripcion: 'Leer números naturales del 0 al 100 y representarlos en forma concreta, pictórica y simbólica' },
        { codigo: 'OA3', eje: 'Números', descripcion: 'Comparar y ordenar números naturales del 0 al 100 de menor a mayor y viceversa, usando material concreto y monedas nacionales de manera manual y/o por medio de software educativo' },
        { codigo: 'OA4', eje: 'Números', descripcion: 'Estimar cantidades hasta 100 en situaciones concretas, usando un referente' },
        { codigo: 'OA5', eje: 'Números', descripcion: 'Componer y descomponer números naturales del 0 al 100 de manera aditiva, en forma concreta, pictórica y simbólica. Matemática' },
        { codigo: 'OA6', eje: 'Medición', descripcion: 'Describir y aplicar estrategias de cálculo mental para adiciones y sustracciones hasta 20: más uno menos” operaciones' },
        { codigo: 'OA7', eje: 'Números', descripcion: 'Identificar las unidades y decenas en números naturales del 0 al 100, representando las cantidades de acuerdo a su valor posicional, con material concreto, pictórico y simbólico' },
        { codigo: 'OA8', eje: 'Números', descripcion: 'Demostrar y explicar, de manera concreta, pictórica y simbólica, el efecto de sumar y restar 0 a un número' },
        { codigo: 'OA9', eje: 'Números', descripcion: 'Demostrar que comprende la adición y la sustracción en el ámbito del 0 al 100: y matemático para describir acciones desde su propia experiencia una variedad de representaciones concretas y pictóricas, incluyendo software educativo ma simbólica las adiciones y sustracciones de los números naturales del 0 a 20 sin realizar cálculos adición sin considerar reserva ticos en contextos familiares y resolviéndolos' },
        { codigo: 'OA10', eje: 'Patrones y álgebra', descripcion: 'Demostrar que comprende la relación entre la adición y la sustracción al usar la “familia de operaciones” en cálculos aritméticos y en la resolución de problemas' },
        { codigo: 'OA11', eje: 'Números', descripcion: 'Demostrar que comprende la multiplicación: cretas y pictóricas como una adición de sumandos iguales como estrategia para construir las tablas del 2, del 5 y del 10 involucran las tablas del 2, del 2, 5 y del atemática' },
        { codigo: 'OA12', eje: 'Patrones y álgebra', descripcion: 'Crear, representar y continuar una variedad de patrones numéricos y completar los elementos faltantes, de manera manual y/o usando software educativo' },
        { codigo: 'OA13', eje: 'Números', descripcion: 'Demostrar, explicar y registrar la igualdad y desigualdad en forma concreta y pictórica del 0 al 20, usando el símbolo igual (=) y los símbolos no igual (›,<)' },
        { codigo: 'OA14', eje: 'Números', descripcion: 'Representar y describir la posición de objetos y personas con relación a sí mismo y a otros (objetos y personas), incluyendo derecha e izquierda, usando material concreto y dibujo' },
        { codigo: 'OA15', eje: 'Geometría', descripcion: 'Describir, comparar y construir figuras 2D (triángulos, cuadrados, rectángulos y círculos) con material concreto' },
        { codigo: 'OA16', eje: 'Geometría', descripcion: 'Describir, comparar y construir figuras 3D (cubos, paralelepípedos, esferas y conos) con diversos materiales' },
        { codigo: 'OA17', eje: 'Medición', descripcion: 'Identificar días, semanas, meses y fechas en el calendario' },
        { codigo: 'OA18', eje: 'Medición', descripcion: 'Leer horas y medias horas en relojes digitales ,en el contexto de la resolución de problemas' },
        { codigo: 'OA19', eje: 'Medición', descripcion: 'Determinar la longitud de objetos, usando unidades de medidas no estandarizadas y unidades estandarizadas (cm y m) en el contexto de la resolución de problemas' },
        { codigo: 'OA20', eje: 'Datos y probabilidades', descripcion: 'Recolectar y registrar datos para responder preguntas estadísticas sobre juegos con monedas y dados, usando bloques, tablas de conteo y pictogramas' },
        { codigo: 'OA21', eje: 'Datos y probabilidades', descripcion: 'Registrar en tablas y gráficos de barra simple, resultados de juegos aleatorios con dados y monedas. Matemática' },
        { codigo: 'OA22', eje: 'Datos y probabilidades', descripcion: 'Construir, leer e interpretar pictogramas con escala y gráficos de barra simple' }
    ],
    '3B': [
        { codigo: 'OA1', eje: 'Medición', descripcion: 'Contar números del 0 al 1 000 de 5 en 5, de 10 en 10, de 100 en 100: número menor que 1 000 zando por cualquier múltiplo del número correspondiente' },
        { codigo: 'OA2', eje: 'Números', descripcion: 'Leer números hasta 1 000 y representarlos en forma concreta, pictórica y simbólica' },
        { codigo: 'OA3', eje: 'Geometría', descripcion: 'Comparar y ordenar números hasta 1 000, utilizando la recta numérica o la tabla posicional de manera manual y/o por medio de software educativo' },
        { codigo: 'OA4', eje: 'Medición', descripcion: 'Describir y aplicar estrategias de cálculo mental para las adiciones y sustracciones hasta 100: más cercana' },
        { codigo: 'OA5', eje: 'Números', descripcion: 'Identificar y describir las unidades, decenas y centenas en números del 0 al 1 000, representando las cantidades de acuerdo a su valor posicional, con material concreto, pictórico y simbólico' },
        { codigo: 'OA6', eje: 'Números', descripcion: 'Demostrar que comprenden la adición y la sustracción de números del 0 al 1 000: con y sin material concreto mas de adición y sustracción que involucren operaciones combinadas, en forma concreta, pictórica y simbólica, de manera manual y/o por medio de software educativo y sin reserva, progresivamente, en la adición de hasta 4 sumandos y en la sustracción de hasta un sustraendo' },
        { codigo: 'OA7', eje: 'Patrones y álgebra', descripcion: 'Demostrar que comprenden la relación entre la adición y la sustracción, usando la “familia de operaciones” en cálculos aritméticos y en la resolución de problemas' },
        { codigo: 'OA8', eje: 'Números', descripcion: 'Demostrar que comprenden las tablas de multiplicar de 3, 6, 4 y 8 de manera progresiva: cretas y pictóricas como una adición de sumandos iguales como estrategia para construir las tablas hasta el 8 tablas de multiplicación de 3, 6, 4 y 8, sin realizar cálculos volucren las tablas aprendidas hasta el 10' },
        { codigo: 'OA9', eje: 'Números', descripcion: 'Demostrar que comprenden la división en el contexto de las tablas de 3, 6, 4 y 8: la división como repartición y agrupación en partes iguales, con material concreto y pictórico mas en contextos que incluyan la repartición y la agrupación un sustracción repetida relación inversa entre la división y la multiplicación tablas de multiplicación hasta 10x8, sin realizar cálculos' },
        { codigo: 'OA10', eje: 'Números', descripcion: 'Resolver problemas rutinarios en contextos cotidianos, que incluyan dinero e involucren las cuatro operaciones (no combinadas)' },
        { codigo: 'OA11', eje: 'Números', descripcion: 'Demostrar que comprenden las fracciones de uso común: 1/4, 1/3, 1/2, 2/3, 3/4: representa la parte de un todo, de manera concreta, pictórica, simbólica, de forma manual y/o con software educativo las cuales se puede usar fracciones mismo todo, de igual denominador' },
        { codigo: 'OA12', eje: 'Patrones y álgebra', descripcion: 'Generar, describir y registrar patrones numéricos, usando una variedad de estrategias en tablas del 100, de manera manual y/o con software educativo' },
        { codigo: 'OA13', eje: 'Geometría', descripcion: 'Resolver ecuaciones de un paso, que involucren adiciones y sustracciones y un símbolo geométrico que represente un número desconocido, en forma pictórica y simbólica del 0 al 100' },
        { codigo: 'OA14', eje: 'Geometría', descripcion: 'Describir la localización de un objeto en un mapa simple o cuadrícula' },
        { codigo: 'OA15', eje: 'Geometría', descripcion: 'Demostrar que comprenden la relación que existe entre figuras 3D y figuras 2D: partir de una red (plantilla)' },
        { codigo: 'OA16', eje: 'Geometría', descripcion: 'Describir cubos, paralelepípedos, esferas, conos, cilindros y pirámides de acuerdo a la forma de sus caras, el número de aristas y de vértices' },
        { codigo: 'OA17', eje: 'Geometría', descripcion: 'Reconocer en el entorno figuras 2D que están trasladadas, reflejadas y rotadas' },
        { codigo: 'OA18', eje: 'Números', descripcion: 'Demostrar que comprenden el concepto de ángulo: ángulos en el entorno gulos, usando como referente ángulos de 45º y de 90º' },
        { codigo: 'OA19', eje: 'Números', descripcion: 'Leer e interpretar líneas de tiempo y calendarios' },
        { codigo: 'OA20', eje: 'Medición', descripcion: 'Leer y registrar el tiempo en horas, medias horas, cuartos de horas y minutos en relojes análogos y digitales' },
        { codigo: 'OA21', eje: 'Geometría', descripcion: 'Demostrar que comprenden el perímetro de una figura regular y de una irregular: rímetro de figuras del entorno en el contexto de la resolución de problemas un cuadrado y un rectángulo' },
        { codigo: 'OA22', eje: 'Medición', descripcion: 'Demostrar que comprenden la medición del peso (g y kg): o más objetos a partir de su peso de manera informal la relación que existe entre gramos y kilogramos tos de uso cotidiano, usando referentes peso de objetos en números y en fracciones de uso común, en el contexto de la resolución de problemas' },
        { codigo: 'OA23', eje: 'Datos y probabilidades', descripcion: 'Realizar encuestas, clasificar y organizar los datos obtenidos en tablas y visualizarlos en gráficos de barra' },
        { codigo: 'OA24', eje: 'Datos y probabilidades', descripcion: 'Registrar y ordenar datos obtenidos de juegos aleatorios con dados y monedas, encontrando el menor, el mayor y estimando el punto medio entre ambos' },
        { codigo: 'OA25', eje: 'Datos y probabilidades', descripcion: 'Construir, leer e interpretar pictogramas y gráficos de barra simple con escala, de acuerdo a información recolectada o dada' },
        { codigo: 'OA26', eje: 'Datos y probabilidades', descripcion: 'Representar datos, usando diagramas de puntos' }
    ],
    '4B': [
        { codigo: 'OA1', eje: 'Geometría', descripcion: 'Representar y describir números del 0 al 10 000: 100 en 100, de 1 000 en 1 000 concreta, pictórica y simbólica ordenándolos en la recta numérica o tabla posicional posicional de los dígitos hasta la decena de mil descomponiendo números naturales hasta 10 000 en forma aditiva, de acuerdo a su valor posicional' },
        { codigo: 'OA2', eje: 'Números', descripcion: 'Describir y aplicar estrategias de cálculo mental: para determinar las multiplicaciones hasta 10 x 10 y sus divisiones correspondientes Matemática' },
        { codigo: 'OA3', eje: 'Números', descripcion: 'Demostrar que comprende la adición y la sustracción de números hasta 1 000: para realizar estas operaciones involucrados rios y no rutinarios que incluyan adiciones y sustracciones progresivamente, en la adición de hasta 4 sumandos y en la sustracción de hasta un sustraendo' },
        { codigo: 'OA4', eje: 'Números', descripcion: 'Fundamentar y aplicar las propiedades del 0 y del 1 en la multiplicación y la propiedad del 1 en la división' },
        { codigo: 'OA5', eje: 'Números', descripcion: 'Demostrar que comprende la multiplicación de números de tres dígitos por números de un dígito: material concreto plicación butiva de la multiplicación respecto de la suma multiplicación narios' },
        { codigo: 'OA6', eje: 'Números', descripcion: 'Demostrar que comprende la división con dividendos de dos dígitos y divisores de un dígito: dir con o sin material concreto existe entre la división y la multiplicación descomposición del dividendo división Matemática' },
        { codigo: 'OA7', eje: 'Números', descripcion: 'Resolver problemas rutinarios y no rutinarios en contextos cotidianos que incluyen dinero, seleccionando y utilizando la operación apropiada' },
        { codigo: 'OA8', eje: 'Geometría', descripcion: 'Demostrar que comprende las fracciones con denominador 100, 12, 10, 8, 6, 5, 4, 3, 2: representa la parte de un todo o de un grupo de elementos y un lugar en la recta numérica en las cuales se puede usar fracciones puede tener representaciones diferentes fracciones (por ejemplo: , 1 1 1 1 , , , ) con material 8 5 4 2 concreto y pictórico' },
        { codigo: 'OA9', eje: 'Números', descripcion: 'Resolver adiciones y sustracciones de fracciones con igual denominador (denominadores 100, 12, 10, 8, 6, 5, 4, 3, 2), de manera concreta y pictórica, en el contexto de la resolución de problemas' },
        { codigo: 'OA10', eje: 'Números', descripcion: 'Identificar, escribir y representar fracciones propias y los números mixtos hasta el 5, de manera concreta, pictórica y simbólica en el contexto de la resolución de problemas' },
        { codigo: 'OA11', eje: 'Números', descripcion: 'Describir y representar decimales (décimos y centésimos): concreta, pictórica y simbólica, de manera manual y/o con software educativo los hasta la centésima' },
        { codigo: 'OA12', eje: 'Números', descripcion: 'Resolver adiciones y sustracciones de decimales, empleando el valor posicional hasta la centésima en el contexto de la resolución de problemas' },
        { codigo: 'OA13', eje: 'Patrones y álgebra', descripcion: 'Identificar y describir patrones numéricos en tablas que involucren una operación, de manera manual y/o usando software educativo' },
        { codigo: 'OA14', eje: 'Patrones y álgebra', descripcion: 'Resolver ecuaciones e inecuaciones de un paso, que involucren adiciones y sustracciones, comprobando los resultados en forma pictórica y simbólica del 0 al 100, aplicando las relaciones inversas entre la adición y la sustracción' },
        { codigo: 'OA15', eje: 'Geometría', descripcion: 'Describir la localización absoluta de un objeto en un mapa simple con coordenadas informales (por ejemplo: con letra y números) y la localización relativa a otros objetos' },
        { codigo: 'OA16', eje: 'Geometría', descripcion: 'Determinar las vistas de figuras 3D, desde el frente, desde el lado y desde arriba' },
        { codigo: 'OA17', eje: 'Geometría', descripcion: 'Demostrar que comprende una línea de simetría: cas 2D simetría en figuras 2D' },
        { codigo: 'OA18', eje: 'Geometría', descripcion: 'Trasladar, rotar y reflejar figuras 2D' },
        { codigo: 'OA19', eje: 'Geometría', descripcion: 'Construir ángulos con el transportador y compararlos' },
        { codigo: 'OA20', eje: 'Medición', descripcion: 'Leer y registrar diversas mediciones del tiempo en relojes análogos y digitales, usando los conceptos A.M., P.M. y 24 horas' },
        { codigo: 'OA21', eje: 'Medición', descripcion: 'Realizar conversiones entre unidades de tiempo en el contexto de la resolución de problemas: el número de segundos en un minuto, el número de minutos en una hora, el número de días en un mes y el número de meses en un año' },
        { codigo: 'OA22', eje: 'Medición', descripcion: 'Medir longitudes con unidades estandarizadas (m, cm) y realizar transformaciones entre estas unidades (m a cm y viceversa) en el contexto de la resolución de problemas' },
        { codigo: 'OA23', eje: 'Geometría', descripcion: 'Demostrar que comprenden el concepto de área de un rectángulo y de un cuadrado: una superficie se mide en unidades cuadradas la elección de la unidad estandarizada (cm2 y m2) área en cm2 y m2 en contextos cercanos rectángulos para un área dada (cm2 y m2) para mostrar que distintos rectángulos pueden tener la misma área' },
        { codigo: 'OA24', eje: 'Geometría', descripcion: 'Demostrar que comprenden el concepto de volumen de un cuerpo: estandarizada para medir el volumen de un cuerpo se mide en unidades de cubos volumen en unidades de cubo' },
        { codigo: 'OA25', eje: 'Datos y probabilidades', descripcion: 'Realizar encuestas, analizar los datos y comparar con los resultados de muestras aleatorias, usando tablas y gráficos' },
        { codigo: 'OA26', eje: 'Números', descripcion: 'Realizar experimentos aleatorios lúdicos y cotidianos, y tabular y representar mediante gráficos de manera manual y/o con software educativo' },
        { codigo: 'OA27', eje: 'Datos y probabilidades', descripcion: 'Leer e interpretar pictogramas y gráficos de barra simple con escala y comunicar conclusiones' }
    ],
    '5B': [
        { codigo: 'OA1', eje: 'Medición', descripcion: 'Representar y describir números de hasta más de 6 dígitos y menores que 1 000 millones: posicional de los dígitos descomponiendo números naturales en forma estándar y expandida números naturales en este ámbito numérico números naturales en contextos reales' },
        { codigo: 'OA2', eje: 'Medición', descripcion: 'Aplicar estrategias de cálculo mental para la multiplicación: multiplica por un múltiplo de 10 repetida conmutativa, asociativa y distributiva' },
        { codigo: 'OA3', eje: 'Números', descripcion: 'Demostrar que comprende la multiplicación de 2 dígitos por 2 dígitos: cálculo mental distributiva de la adición respecto de la multiplicación rutinarios y no rutinarios, aplicando el algoritmo' },
        { codigo: 'OA4', eje: 'Números', descripcion: 'Demostrar que comprende la división con dividendos de tres dígitos y divisores de un dígito: tinarios y no rutinarios que impliquen divisiones' },
        { codigo: 'OA5', eje: 'Números', descripcion: 'Realizar cálculos que involucren las cuatro operaciones con expresiones numéricas, aplicando las reglas relativas a paréntesis y la prevalencia de la multiplicación y la división por sobre la adición y la sustracción cuando corresponda' },
        { codigo: 'OA6', eje: 'Números', descripcion: 'Resolver problemas rutinarios y no rutinarios que involucren las cuatro operaciones y combinaciones de ellas: dinero computador en ámbitos numéricos superiores al 10 000' },
        { codigo: 'OA7', eje: 'Números', descripcion: 'Demostrar que comprende las fracciones propias: concreta, pictórica y simbólica equivalentes –simplificando y amplificando– de manera concreta, pictórica, simbólica, de forma manual y/o con software educativo propias con igual y distinto denominador de manera concreta, pictórica y simbólica' },
        { codigo: 'OA8', eje: 'Geometría', descripcion: 'Demostrar que comprende las fracciones impropias de uso común de denominadores 2, 3, 4, 5, 6, 8, 10, 12 y los números mixtos asociados: pictórico para representarlas, de manera manual y/o usando software educativo equivalencias entre fracciones impropias y números mixtos fracciones y estos números mixtos en la recta numérica Matemática' },
        { codigo: 'OA9', eje: 'Números', descripcion: 'Resolver adiciones y sustracciones con fracciones propias con denominadores menores o iguales a 12: simbólica' },
        { codigo: 'OA10', eje: 'Números', descripcion: 'Determinar el decimal que corresponde a fracciones con denominador 2, 4, 5 y 10' },
        { codigo: 'OA11', eje: 'Números', descripcion: 'Comparar y ordenar decimales hasta la milésima' },
        { codigo: 'OA12', eje: 'Números', descripcion: 'Resolver adiciones y sustracciones de decimales, empleando el valor posicional hasta la milésima' },
        { codigo: 'OA13', eje: 'Números', descripcion: 'Resolver problemas rutinarios y no rutinarios, aplicando adiciones y sustracciones de fracciones propias o decimales hasta la milésima' },
        { codigo: 'OA14', eje: 'Geometría', descripcion: 'Descubrir alguna regla que explique una sucesión dada y que permita hacer predicciones' },
        { codigo: 'OA15', eje: 'Patrones y álgebra', descripcion: 'Resolver problemas, usando ecuaciones de un paso que involucren adiciones y sustracciones, en forma pictórica y simbólica' },
        { codigo: 'OA16', eje: 'Números', descripcion: 'Identificar y dibujar puntos en el primer cuadrante del plano cartesiano, dadas sus coordenadas en números naturales' },
        { codigo: 'OA17', eje: 'Geometría', descripcion: 'Describir y dar ejemplos de aristas y caras de figuras 3D, y lados de figuras 2D' },
        { codigo: 'OA18', eje: 'Geometría', descripcion: 'Demostrar que comprende el concepto de congruencia, usando la traslación, la reflexión y la rotación en cuadrículas' },
        { codigo: 'OA19', eje: 'Medición', descripcion: 'Medir longitudes con unidades estandarizadas (m, cm, mm) en el contexto de la resolución de problemas' },
        { codigo: 'OA20', eje: 'Medición', descripcion: 'Realizar transformaciones entre unidades de medidas de longitud (km a m, m a cm, cm a mm y viceversa), usando software educativo' },
        { codigo: 'OA21', eje: 'Geometría', descripcion: 'Diseñar y construir diferentes rectángulos, dados el perímetro o el área o ambos, y sacar conclusiones' },
        { codigo: 'OA22', eje: 'Geometría', descripcion: 'Calcular áreas de triángulos, de paralelogramos y de trapecios, y estimar áreas de figuras irregulares aplicando las estrategias: rectángulo traslación' },
        { codigo: 'OA23', eje: 'Datos y probabilidades', descripcion: 'Calcular el promedio de datos e interpretarlo en su contexto' },
        { codigo: 'OA24', eje: 'Datos y probabilidades', descripcion: 'Describir la posibilidad de ocurrencia de un evento de acuerdo a un experimento aleatorio, empleando los términos seguro – posible – poco posible – imposible' },
        { codigo: 'OA25', eje: 'Números', descripcion: 'Comparar probabilidades de distintos eventos sin calcularlas' },
        { codigo: 'OA26', eje: 'Geometría', descripcion: 'Leer, interpretar y completar tablas, gráficos de barra simple y gráficos de línea, y comunicar sus conclusiones' },
        { codigo: 'OA27', eje: 'Datos y probabilidades', descripcion: 'Utilizar diagramas de tallo y hojas para representar datos provenientes de muestras aleatorias' }
    ],
    '6B': [
        { codigo: 'OA1', eje: 'Medición', descripcion: 'Demostrar que comprende los factores y múltiplos: factores de números menores de 100 y compuestos involucran múltiplos' },
        { codigo: 'OA2', eje: 'Números', descripcion: 'Realizar cálculos que involucren las cuatro operaciones en el contexto de la resolución de problemas, utilizando la calculadora en ámbitos superiores a 10 000' },
        { codigo: 'OA3', eje: 'Patrones y álgebra', descripcion: 'Demostrar que comprende el concepto de razón de manera concreta, pictórica, simbólica y/o usando software educativo' },
        { codigo: 'OA4', eje: 'Números', descripcion: 'Demostrar que comprende el concepto de porcentaje de manera concreta, pictórica, simbólica y/o usando software educativo' },
        { codigo: 'OA5', eje: 'Geometría', descripcion: 'Demostrar que comprende las fracciones y números mixtos: equivalencias entre fracciones impropias y números mixtos, usando material concreto y representaciones pictóricas de manera manual y/o software educativo en la recta numérica' },
        { codigo: 'OA6', eje: 'Números', descripcion: 'Resolver adiciones y sustracciones de fracciones propias e impropias y números mixtos con numeradores y denominadores de hasta dos dígitos' },
        { codigo: 'OA7', eje: 'Medición', descripcion: 'Demostrar que comprende la multiplicación y la división de decimales por números naturales de un dígito, múltiplos de 10 y decimales hasta la milésima de manera concreta, pictórica y simbólica' },
        { codigo: 'OA8', eje: 'Números', descripcion: 'Resolver problemas rutinarios y no rutinarios que involucren adiciones y sustracciones de fracciones propias, impropias, números mixtos o decimales hasta la milésima' },
        { codigo: 'OA9', eje: 'Datos y probabilidades', descripcion: 'Demostrar que comprenden la relación entre los valores de una tabla y aplicarla en la resolución de problemas sencillos: los valores de la tabla lenguaje matemático' },
        { codigo: 'OA10', eje: 'Patrones y álgebra', descripcion: 'Representar generalizaciones de relaciones entre números naturales, usando expresiones con letras y ecuaciones' },
        { codigo: 'OA11', eje: 'Patrones y álgebra', descripcion: 'Resolver ecuaciones de primer grado con una incógnita, utilizando estrategias como: correspondencia 1 a 1 entre los términos en cada lado de la ecuación y aplicando procedimientos formales de resolución' },
        { codigo: 'OA12', eje: 'Geometría', descripcion: 'Construir y comparar triángulos de acuerdo a la medida de sus lados y/o sus ángulos con instrumentos geométricos o software geométrico' },
        { codigo: 'OA13', eje: 'Geometría', descripcion: 'Demostrar que comprenden el concepto de área de una superficie en cubos y paralelepípedos, calculando el área de sus redes (plantillas) asociadas' },
        { codigo: 'OA14', eje: 'Geometría', descripcion: 'Realizar teselados de figuras 2D, usando traslaciones, reflexiones y rotaciones' },
        { codigo: 'OA15', eje: 'Geometría', descripcion: 'Construir ángulos agudos, obtusos, rectos, extendidos y completos con instrumentos geométricos o software geométrico' },
        { codigo: 'OA16', eje: 'Números', descripcion: 'Identificar los ángulos que se forman entre dos rectas que se cortan (pares de ángulos opuestos por el vértice y pares de ángulos complementarios)' },
        { codigo: 'OA17', eje: 'Geometría', descripcion: 'Demostrar, de manera concreta, pictórica y simbólica, que la suma de los ángulos interiores de un triángulo es 180º y de un cuadrilátero es 360º' },
        { codigo: 'OA18', eje: 'Geometría', descripcion: 'Calcular la superficie de cubos y paralelepípedos, expresando el resultado en cm2 y m2' },
        { codigo: 'OA19', eje: 'Geometría', descripcion: 'Calcular el volumen de cubos y paralelepípedos, expresando el resultado en cm3 , m3 y mm3' },
        { codigo: 'OA20', eje: 'Geometría', descripcion: 'Estimar y medir ángulos, usando el transportador y expresando las mediciones en grados' },
        { codigo: 'OA21', eje: 'Números', descripcion: 'Calcular ángulos en rectas paralelas cortadas por una transversal y en triángulos' },
        { codigo: 'OA22', eje: 'Números', descripcion: 'Comparar distribuciones de dos grupos, usando diagramas de puntos y de tallo y hojas' },
        { codigo: 'OA23', eje: 'Números', descripcion: 'Conjeturar acerca de las tendencias de resultados obtenidos en repeticiones de un mismo experimento con dados, monedas u otros, de manera manual y/o usando software educativo' },
        { codigo: 'OA24', eje: 'Datos y probabilidades', descripcion: 'Leer e interpretar gráficos de barra doble y circulares y comunicar sus conclusiones' }
    ],
    '7B': [
        { codigo: 'OA1', eje: 'Números', descripcion: 'Mostrar que comprenden la adición y la sustracción de números enteros: de un movimiento equivalente en la posición opuesta no representa ningún cambio de posición)' },
        { codigo: 'OA2', eje: 'Números', descripcion: 'Explicar la multiplicación y la división de fracciones positivas' },
        { codigo: 'OA3', eje: 'Números', descripcion: 'Resolver problemas que involucren la multiplicación y la división de fracciones y de decimales positivos de manera concreta, pictórica y simbólica (de forma manual y/o con software educativo)' },
        { codigo: 'OA4', eje: 'Números', descripcion: 'Mostrar que comprenden el concepto de porcentaje' },
        { codigo: 'OA5', eje: 'Números', descripcion: 'Utilizar potencias de base 10 con exponente natural' },
        { codigo: 'OA6', eje: 'Álgebra y funciones', descripcion: 'Utilizar el lenguaje algebraico para generalizar relaciones entre números, para establecer y formular reglas y propiedades y construir ecuaciones' },
        { codigo: 'OA7', eje: 'Álgebra y funciones', descripcion: 'Reducir expresiones algebraicas, reuniendo términos semejantes para obtener expresiones de la forma ax + by + cz (a, b, c P Z)' },
        { codigo: 'OA8', eje: 'Álgebra y funciones', descripcion: 'Demostrar que comprenden las proporciones directas e inversas' },
        { codigo: 'OA9', eje: 'Álgebra y funciones', descripcion: 'Modelar y resolver problemas diversos de la vida diaria y de otras asignaturas, que involucran ecuaciones e inecuaciones lineales de la forma: x x x' },
        { codigo: 'OA10', eje: 'Números', descripcion: 'Descubrir relaciones que involucran ángulos exteriores o interiores de diferentes polígonos' },
        { codigo: 'OA11', eje: 'Geometría', descripcion: 'Mostrar que comprenden el círculo: asignaturas y de la vida diaria' },
        { codigo: 'OA12', eje: 'Geometría', descripcion: 'Construir objetos geométricos de manera manual y/o con software educativo' },
        { codigo: 'OA13', eje: 'Números', descripcion: 'Desarrollar y aplicar la fórmula del área de triángulos, paralelogramos y trapecios' },
        { codigo: 'OA14', eje: 'Números', descripcion: 'Tiempo estimado: 57 horas pedagógicas' },
        { codigo: 'OA15', eje: 'Números', descripcion: 'Estimar el porcentaje de algunas características de una población desconocida por medio del muestreo' },
        { codigo: 'OA16', eje: 'Datos y probabilidades', descripcion: 'Representar datos obtenidos en una muestra mediante tablas de frecuencias absolutas y relativas, utilizando gráficos apropiados, de manera manual y/o con software educativo' },
        { codigo: 'OA17', eje: 'Números', descripcion: 'Mostrar que comprenden las medidas de tendencia central y el rango' },
        { codigo: 'OA18', eje: 'Números', descripcion: 'Explicar las probabilidades de eventos obtenidos por medio de experimentos de manera manual y/o con software educativo' },
        { codigo: 'OA19', eje: 'Datos y probabilidades', descripcion: 'Comparar las frecuencias relativas de un evento obtenidas al repetir un experimento de forma manual y/o con software educativo, con la probabilidad obtenida de manera teórica, usando diagramas de árbol, tablas o gráficos' }
    ],
    '8B': [
        { codigo: 'OA1', eje: 'Números', descripcion: 'Mostrar que comprenden la multiplicación y la división de números enteros' },
        { codigo: 'OA2', eje: 'Números', descripcion: 'Utilizar las operaciones de multiplicación y división con los números racionales en el contexto de la resolución de problemas' },
        { codigo: 'OA3', eje: 'Números', descripcion: 'Explicar la multiplicación y la división de potencias de base natural y exponente natural hasta 3, de manera concreta, pictórica y simbólica' },
        { codigo: 'OA4', eje: 'Números', descripcion: 'Mostrar que comprenden las raíces cuadradas de números naturales' },
        { codigo: 'OA5', eje: 'Números', descripcion: 'Resolver problemas que involucran variaciones porcentuales en contextos diversos, usando representaciones pictóricas y registrando el proceso de manera simbólica; por ejemplo: el interés anual del ahorro' },
        { codigo: 'OA6', eje: 'Álgebra y funciones', descripcion: 'Mostrar que comprenden las operaciones de expresiones algebraicas' },
        { codigo: 'OA7', eje: 'Álgebra y funciones', descripcion: 'Mostrar que comprenden la noción de función por medio de un cambio lineal: educativo' },
        { codigo: 'OA8', eje: 'Álgebra y funciones', descripcion: 'Modelar situaciones de la vida diaria y de otras asignaturas, usando ecuaciones lineales de la forma: x ax = b; = b, a ≠ 0; a x ax + b = c; a + b = c; ax = b + cx; a (x + b) = c; ax + b = cx + d (a, b, c, d, e P Q)' },
        { codigo: 'OA9', eje: 'Álgebra y funciones', descripcion: 'Resolver inecuaciones lineales con coeficientes racionales en el contexto de la resolución de problemas, por medio de representaciones gráficas, simbólicas, de manera manual y/o con software educativo' },
        { codigo: 'OA10', eje: 'Álgebra y funciones', descripcion: 'Mostrar que comprenden la función afín: con software educativo' },
        { codigo: 'OA11', eje: 'Geometría', descripcion: 'Desarrollar las fórmulas para encontrar el área de superficies y el volumen de prismas rectos con diferentes bases y cilindros' },
        { codigo: 'OA12', eje: 'Geometría', descripcion: 'Explicar, de manera concreta, pictórica y simbólica, la validez del teorema de Pitágoras y aplicar a la resolución de problemas geométricos y de la vida cotidiana, de manera manual y/o con software educativo' },
        { codigo: 'OA13', eje: 'Geometría', descripcion: 'Describir la posición y el movimiento (traslaciones, rotaciones y reflexiones) de figuras 2D, de manera manual y/o con software educativo, utilizando' },
        { codigo: 'OA14', eje: 'Geometría', descripcion: 'Componer rotaciones, traslaciones y reflexiones en el plano cartesiano y en el espacio, de manera manual y/o con software educativo, y aplicar a las simetrías de polígonos y poliedros, y a la resolución de problemas geométricos relacionados con el arte' },
        { codigo: 'OA15', eje: 'Números', descripcion: 'Mostrar que comprenden las medidas de posición, percentiles y cuartiles' },
        { codigo: 'OA16', eje: 'Datos y probabilidades', descripcion: 'Evaluar la forma en que los datos están presentados: fortalezas y debilidades de cada uno' },
        { codigo: 'OA17', eje: 'Números', descripcion: 'Explicar el principio combinatorio multiplicativo' }
    ],
    '1M': [
        { codigo: 'OA1', eje: 'Números y Álgebra', descripcion: 'Calcular operaciones con números racionales en forma simbólica' },
        { codigo: 'OA2', eje: 'Números y Álgebra', descripcion: 'Mostrar que comprenden las potencias de base racional y exponente entero' },
        { codigo: 'OA3', eje: 'Números y Álgebra', descripcion: 'Desarrollar los productos notables de manera concreta, pictórica y simbólica' },
        { codigo: 'OA4', eje: 'Números y Álgebra', descripcion: 'Resolver sistemas de ecuaciones lineales (2x2) relacionados con problemas de la vida diaria y de otras asignaturas, mediante representaciones gráficas y simbólicas, de manera manual y/o con software educativo' },
        { codigo: 'OA5', eje: 'Números y Álgebra', descripcion: 'Graficar relaciones lineales en dos variables de la forma f(x, y) = ax + by; por ejemplo: un haz de rectas paralelas en el plano cartesiano, líneas de nivel en planos inclinados (techo), propagación de olas en el mar y la formación de algunas capas de rocas: c; a, b, c ∈ Q (decimales hasta la décima)' },
        { codigo: 'OA6', eje: 'Geometría', descripcion: 'Desarrollar la fórmula de los valores del área y del perímetro de sectores y segmentos circulares, respectivamente, a partir de ángulos centrales de 60°, 90°, 120° y 180°, por medio de representaciones concretas' },
        { codigo: 'OA7', eje: 'Geometría', descripcion: 'Desarrollar las fórmulas para encontrar el área de la superficie y el volumen del cono' },
        { codigo: 'OA8', eje: 'Geometría', descripcion: 'Mostrar que comprenden el concepto de homotecia' },
        { codigo: 'OA9', eje: 'Geometría', descripcion: 'Desarrollar el teorema de Tales mediante las propiedades de la homotecia, para aplicarlo en la resolución de problemas' },
        { codigo: 'OA10', eje: 'Números y Álgebra', descripcion: 'Aplicar propiedades de semejanza y de proporcionalidad a modelos a escala y otras situaciones de la vida diaria y otras asignaturas' },
        { codigo: 'OA11', eje: 'Geometría', descripcion: 'Representar el concepto de homotecia de forma vectorial, relacionándolo con el producto de un vector por un escalar, de manera manual y/o con software educativo' },
        { codigo: 'OA12', eje: 'Probabilidad y Estadística', descripcion: 'Registrar distribuciones de dos características distintas, de una misma población, en una tabla de doble entrada y en una nube de puntos' },
        { codigo: 'OA13', eje: 'Números y Álgebra', descripcion: 'Comparar poblaciones mediante la confección de gráficos “xy” para dos atributos de muestras, de manera concreta y pictórica' },
        { codigo: 'OA14', eje: 'Geometría', descripcion: 'Desarrollar las reglas de las probabilidades, la regla aditiva, la regla multiplicativa y la combinación de ambas, de manera concreta, pictórica y simbólica, de manera manual y/o con software educativo, en el contexto de la resolución de problemas' },
        { codigo: 'OA15', eje: 'Probabilidad y Estadística', descripcion: 'Mostrar que comprenden el concepto de azar: educativo' },
        { codigo: 'OA16', eje: 'Probabilidad y Estadística', descripcion: 'Evaluar la forma en que los datos están presentados: información de los mismos datos representada en distintos tipos de gráficos para determinar fortalezas y debilidades de cada uno. la elección del gráfico para una determinada situación y su correspondiente conjunto de datos. manipulaciones de gráficos para representar datos' }
    ],
    '2M': [
        { codigo: 'OA1', eje: 'Números y Álgebra', descripcion: 'Realizar cálculos y estimaciones que involucren operaciones con números reales' },
        { codigo: 'OA2', eje: 'Números y Álgebra', descripcion: 'Mostrar que comprenden las relaciones entre potencias, raíces enésimas y logaritmos' },
        { codigo: 'OA3', eje: 'Números y Álgebra', descripcion: 'Mostrar que comprenden la función cuadrática f(x)= ax2 + bx + c (a ≠ 0): oferta y demanda' },
        { codigo: 'OA4', eje: 'Números y Álgebra', descripcion: 'Resolver, de manera concreta, pictórica y simbólica o usando herramientas tecnológicas, ecuaciones cuadráticas de la forma' },
        { codigo: 'OA5', eje: 'Números y Álgebra', descripcion: 'Mostrar que comprenden la inversa de una función' },
        { codigo: 'OA6', eje: 'Números y Álgebra', descripcion: 'Explicar el cambio porcentual constante en intervalos de tiempo' },
        { codigo: 'OA7', eje: 'Geometría', descripcion: 'Desarrollar las fórmulas del área de la superficie y del volumen de la esfera' },
        { codigo: 'OA8', eje: 'Números y Álgebra', descripcion: 'Mostrar que comprenden las razones trigonométricas de seno, coseno y tangente en triángulos rectángulos' },
        { codigo: 'OA9', eje: 'Números y Álgebra', descripcion: 'Aplicar las razones trigonométricas en diversos contextos en la composición y descomposición de vectores y determinar las proyecciones de vectores' },
        { codigo: 'OA10', eje: 'Números y Álgebra', descripcion: 'Mostrar que comprenden las variables aleatorias finitas' },
        { codigo: 'OA11', eje: 'Probabilidad y Estadística', descripcion: 'Utilizar permutaciones y la combinatoria sencilla para calcular probabilidades de eventos y resolver problemas' },
        { codigo: 'OA12', eje: 'Probabilidad y Estadística', descripcion: 'Mostrar que comprenden el rol de la probabilidad en la sociedad' },
        { codigo: 'OA16', eje: 'Probabilidad y Estadística', descripcion: 'Evaluar la forma en que los datos están presentados: información de los mismos datos representada en distintos tipos de gráficos para determinar fortalezas y debilidades de cada uno. la elección del gráfico para una determinada situación y su correspondiente conjunto de datos. manipulaciones de gráficos para representar datos' }
    ],
    '3M': [
        { codigo: 'OA1', eje: 'Números y Álgebra', descripcion: 'Resolver problemas de adición, sustracción, multiplicación y división de números complejos C, en forma pictórica, simbólica y con uso de herramientas tecnológicas' },
        { codigo: 'OA2', eje: 'Probabilidad y Estadística', descripcion: 'Tomar decisiones en situaciones de incerteza que involucren el análisis de datos estadísticos con medidas de dispersión y probabilidades condicionales' },
        { codigo: 'OA3', eje: 'Números y Álgebra', descripcion: 'Aplicar modelos matemáticos que describen fenómenos o situaciones de crecimiento y decrecimiento, que involucran las funciones exponencial y logarítmica, de forma manuscrita, con uso de herramientas tecnológicas y promoviendo la búsqueda, selección, contrastación y verificación de información en ambientes digitales y redes sociales' },
        { codigo: 'OA4', eje: 'Probabilidad y Estadística', descripcion: 'Resolver problemas de geometría euclidiana que involucran relaciones métricas entre ángulos, arcos, cuerdas y secantes en la circunferencia, de forma manuscrita y con uso de herramientas tecnológicas. Programa de Estudio Matemática 3° Medio Formación General Visión global del año Unidad nidad nidad nidad l uso de datos Predecir acerca de estadísticos y de Necesidad y aplicación situaciones, utilizando Relaciones métricas en modelos de los números modelos matemáticos geometría probabilísticos para complejos tomar decisiones Objetivos de Objetivos de Objetivos de Objetivos de Aprendizaje Aprendizaje Aprendizaje Aprendizaje OA 2: Tomar OA 3: Aplicar modelos OA 4: Resolver OA 1. Resolver decisiones en matemáticos que describen problemas de problemas de adición, situaciones de fenómenos o situaciones de geometría euclidiana sustracción, incerteza que crecimiento y que involucran multiplicación y división involucren el análisis decrecimiento, que relaciones métricas de números complejos de datos estadísticos involucran las funciones entre ángulos, arcos, C, en forma pictórica, con medidas de exponencial y logarítmica, cuerdas y secantes simbólica y con uso de dispersión y de forma manuscrita, con en la circunferencia, herramientas probabilidades uso de herramientas de forma manuscrita tecnológicas. condicionales. tecnológicas y promoviendo y con uso de la búsqueda, selección, herramientas OA a. Construir y evaluar OA c. Tomar contrastación y verificación tecnológicas. estrategias de manera decisiones de información en colaborativa al resolver fundamentadas en ambientes digitales y redes OA a. Construir y problemas no rutinarios. evidencia estadística sociales. evaluar estrategias y/o en la evaluación de manera OA d. Argumentar, de resultados OA a. Construir y evaluar colaborativa al utilizando lenguaje obtenidos a partir estrategias de manera resolver problemas simbólico y diferentes de un modelo colaborativa al resolver no rutinarios. representaciones para probabilístico. problemas no rutinarios. justificar la veracidad o OA d. Argumentar, falsedad de una OA d. Argumentar, OA e. Construir modelos, utilizando lenguaje conjetura, y evaluar el utilizando lenguaje realizando conexiones entre simbólico y alcance y los límites de simbólico y variables para predecir diferentes los argumentos diferentes posibles escenarios de representaciones utilizados. representaciones solución a un problema, y para justificar la para justificar la tomar decisiones veracidad o falsedad OA g. Elaborar veracidad o falsedad fundamentadas. de una conjetura, y representaciones, tanto de una conjetura, y evaluar el alcance y en forma manual como evaluar el alcance y OA f. Evaluar modelos para los límites de los digital, y justificar cómo los límites de los estudiar un fenómeno, argumentos una misma información argumentos analizando críticamente las utilizados. puede ser utilizada utilizados. simplificaciones requeridas según el tipo de y considerando las representación. limitaciones de aquellos. Programa de Estudio Matemática 3° Medio Formación General' }
    ],
    '4M': [
        { codigo: 'OA1', eje: 'Números y Álgebra', descripcion: 'Fundamentar decisiones en el ámbito financiero y económico personal o comunitario, a partir de modelos que consideren porcentajes, tasas de interés e índices económicos' },
        { codigo: 'OA2', eje: 'Probabilidad y Estadística', descripcion: 'Fundamentar decisiones en situaciones de incerteza, a partir del análisis crítico de datos estadísticos y con base en los modelos binomial y normal' },
        { codigo: 'OA3', eje: 'Números y Álgebra', descripcion: 'Construir modelos de situaciones o fenómenos de crecimiento, decrecimiento y periódicos que involucren funciones potencias de exponente entero y trigonométricas sen(x) y cos(x), de forma manuscrita, con uso de herramientas tecnológicas y promoviendo la búsqueda, selección, contrastación y verificación de información en ambientes digitales y redes sociales' },
        { codigo: 'OA4', eje: 'Probabilidad y Estadística', descripcion: 'Resolver problemas acerca de rectas y circunferencias en el plano, mediante su representación analítica, de forma manuscrita y con uso de herramientas tecnológicas. Programa de Estudio Matemática 4° Medio Formación General Visión global del año UNIDAD NIDAD NIDAD NIDAD a toma de decisiones La toma de decisiones en situaciones Modelamiento matemático Geometría con en situaciones de financieras y para describir y predecir coordenadas incerteza económicas Objetivos de Aprendizaje Objetivos de Aprendizaje Objetivos de Aprendizaje Objetivos de Aprendizaje OA 2: Fundamentar OA 1: Fundamentar OA 3: Construir modelos de OA 4: Resolver decisiones en decisiones en el situaciones o fenómenos de problemas acerca de situaciones de ámbito financiero y crecimiento, decrecimiento rectas y incerteza, a partir del económico personal o y periódicos que involucren circunferencias en el análisis crítico de datos comunitario, a partir funciones potencia de plano, mediante su estadísticos y con base de modelos que exponente entero y representación en los modelos consideren tasas de trigonométricas sen(x) y analítica, de forma binomial y normal. interés e índices cos(x), de forma manuscrita y con uso económicos. manuscrita, con uso de de herramientas OA c. Tomar decisiones herramientas tecnológicas y tecnológicas. fundamentadas en OA d. Argumentar, promoviendo la búsqueda, evidencia estadística utilizando lenguaje OA d. Argumentar, selección, contrastación y y/o en la evaluación de simbólico y diferentes utilizando lenguaje verificación de información resultados obtenidos a representaciones, para simbólico y diferentes en ambientes digitales y partir de un modelo justificar la veracidad o representaciones, para redes sociales. probabilístico. falsedad de una justificar la veracidad o conjetura, y evaluar el OA e. Construir modelos, falsedad de una OA f. Evaluar modelos alcance y los límites de realizando conexiones entre conjetura, y evaluar el para estudiar un los argumentos variables para predecir alcance y los límites de fenómeno, analizando utilizados. posibles escenarios de los argumentos críticamente las solución a un problema, y utilizados. simplificaciones OA f. Evaluar modelos tomar decisiones OA e. Construir requeridas y realizando para estudiar un fundamentadas. modelos realizando conexiones entre fenómeno, analizando variables para predecir críticamente las OA f. Evaluar modelos para conexiones entre posibles escenarios de simplificaciones estudiar un fenómeno, variables para predecir solución a un requeridas y analizando críticamente las posibles escenarios de problema, y tomar considerando las simplificaciones requeridas solución a un decisiones limitaciones de y considerando las problema, y tomar fundamentadas. aquellos. limitaciones de aquellos. decisiones fundamentadas' }
    ]
  },
  // ── Electivos del Plan Diferenciado HC (3°-4° Medio) ─────
  //  DS 193/2019 — Programas de Estudio Mineduc, febrero 2021
  // ────────────────────────────────────────────────────────────────────
  electivos: {

    // ════════════════════════════════════════════════════════════════
    //  GEOMETRÍA 3D — PENDIENTE: subir Programa de Estudio Mineduc
    //  Esta entrada queda como placeholder visible. Cuando el docente
    //  proporcione el PDF se completará con OAs, unidades y mapeo.
    // ════════════════════════════════════════════════════════════════
    'geometria3d': {
      nombre:  'Geometría 3D',
      sigla:   'GEO3D',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Pendiente carga de Programa de Estudio',
      unidades: { '3M': [], '4M': [] },
      oas:      { '3M': [], '4M': [] },
      habilidades: [],
      actitudes:   [],
      _pendiente: 'Subir PDF Programa de Estudio Geometría 3D para completar OAs y unidades.'
    },

    // ════════════════════════════════════════════════════════════════
    //  LÍMITES, DERIVADAS E INTEGRALES (Cálculo)
    //  DS 193/2019 — Programa de Estudio Mineduc, febrero 2021
    // ════════════════════════════════════════════════════════════════
    'limites-derivadas-integrales': {
      nombre:  'Límites, Derivadas e Integrales',
      sigla:   'LIMI',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Programa de Estudio Mineduc, febrero 2021',

      unidades: {
        '3M': [
          'Representar y modelar situaciones de cambio por medio de funciones',
          'Reconocer un patrón infinito y la noción de límite',
          'Modelar situaciones de cambio con derivadas',
          'Comprender la integral como proceso de reversibilidad y cálculo de áreas'
        ],
        '4M': [
          'Representar y modelar situaciones de cambio por medio de funciones',
          'Reconocer un patrón infinito y la noción de límite',
          'Modelar situaciones de cambio con derivadas',
          'Comprender la integral como proceso de reversibilidad y cálculo de áreas'
        ]
      },

      oasPorUnidad: {
        'Representar y modelar situaciones de cambio por medio de funciones':           ['OA1'],
        'Reconocer un patrón infinito y la noción de límite':                           ['OA2'],
        'Modelar situaciones de cambio con derivadas':                                  ['OA3', 'OA4'],
        'Comprender la integral como proceso de reversibilidad y cálculo de áreas':     ['OA5']
      },

      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Utilizar diversas formas de representación acerca de la resultante de la composición de funciones y la existencia de la función inversa de una función dada.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar acerca de la existencia de límites de funciones en el infinito y en un punto para determinar convergencia y continuidad en contextos matemáticos, de las ciencias y de la vida diaria, en forma manuscrita y utilizando herramientas tecnológicas digitales.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Modelar situaciones o fenómenos que involucren rapidez instantánea de cambio y evaluar la necesidad eventual de ajustar el modelo obtenido.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Resolver problemas que involucren crecimiento o decrecimiento, concavidad, puntos máximos o de inflexión de una función, a partir del cálculo de la primera y segunda derivada, en forma manuscrita y utilizando herramientas tecnológicas digitales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Modelar situaciones o fenómenos que involucren el concepto de integral como área bajo la curva en contextos matemáticos, de las ciencias y de la vida diaria, en forma manuscrita y utilizando herramientas tecnológicas digitales, y evaluar la necesidad eventual de ajustar el modelo obtenido.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Utilizar diversas formas de representación acerca de la resultante de la composición de funciones y la existencia de la función inversa de una función dada.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar acerca de la existencia de límites de funciones en el infinito y en un punto para determinar convergencia y continuidad en contextos matemáticos, de las ciencias y de la vida diaria, en forma manuscrita y utilizando herramientas tecnológicas digitales.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Modelar situaciones o fenómenos que involucren rapidez instantánea de cambio y evaluar la necesidad eventual de ajustar el modelo obtenido.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Resolver problemas que involucren crecimiento o decrecimiento, concavidad, puntos máximos o de inflexión de una función, a partir del cálculo de la primera y segunda derivada, en forma manuscrita y utilizando herramientas tecnológicas digitales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Modelar situaciones o fenómenos que involucren el concepto de integral como área bajo la curva en contextos matemáticos, de las ciencias y de la vida diaria, en forma manuscrita y utilizando herramientas tecnológicas digitales, y evaluar la necesidad eventual de ajustar el modelo obtenido.' }
        ]
      },

      habilidades: _habilidadesMatHC(),
      actitudes:   _actitudesMatHC()
    },

    // ════════════════════════════════════════════════════════════════
    //  PROBABILIDADES Y ESTADÍSTICA DESCRIPTIVA E INFERENCIAL
    //  DS 193/2019 — Programa de Estudio Mineduc, febrero 2021
    // ════════════════════════════════════════════════════════════════
    'probabilidades-estadistica': {
      nombre:  'Probabilidades y Estadística Descriptiva e Inferencial',
      sigla:   'PROB',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Programa de Estudio Mineduc, febrero 2021',

      unidades: {
        '3M': [
          '¿Qué dicen los gráficos? Análisis crítico de la información',
          'Comprender la media muestral, las medidas de dispersión y la correlación',
          'Modelaje de fenómenos mediante las probabilidades y las distribuciones binomial o normal',
          'Hacer inferencia estadística'
        ],
        '4M': [
          '¿Qué dicen los gráficos? Análisis crítico de la información',
          'Comprender la media muestral, las medidas de dispersión y la correlación',
          'Modelaje de fenómenos mediante las probabilidades y las distribuciones binomial o normal',
          'Hacer inferencia estadística'
        ]
      },

      oasPorUnidad: {
        '¿Qué dicen los gráficos? Análisis crítico de la información':                                       ['OA1'],
        'Comprender la media muestral, las medidas de dispersión y la correlación':                          ['OA2'],
        'Modelaje de fenómenos mediante las probabilidades y las distribuciones binomial o normal':         ['OA3'],
        'Hacer inferencia estadística':                                                                       ['OA4']
      },

      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar y comunicar decisiones a partir del análisis crítico de información presente en histogramas, polígonos de frecuencia, frecuencia acumulada, diagramas de cajón y nube de puntos, incluyendo el uso de herramientas digitales.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Resolver problemas que involucren los conceptos de media muestral, desviación estándar, varianza, coeficiente de variación y correlación muestral entre dos variables, tanto de forma manuscrita como haciendo uso de herramientas tecnológicas digitales.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Modelar fenómenos o situaciones cotidianas del ámbito científico y del ámbito social, que requieran el cálculo de probabilidades y la aplicación de las distribuciones binomial y normal.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar inferencias acerca de parámetros (media y varianza) o características de una población, a partir de datos de una muestra aleatoria, bajo el supuesto de normalidad y aplicando procedimientos con base en intervalos de confianza o pruebas de hipótesis.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar y comunicar decisiones a partir del análisis crítico de información presente en histogramas, polígonos de frecuencia, frecuencia acumulada, diagramas de cajón y nube de puntos, incluyendo el uso de herramientas digitales.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Resolver problemas que involucren los conceptos de media muestral, desviación estándar, varianza, coeficiente de variación y correlación muestral entre dos variables, tanto de forma manuscrita como haciendo uso de herramientas tecnológicas digitales.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Modelar fenómenos o situaciones cotidianas del ámbito científico y del ámbito social, que requieran el cálculo de probabilidades y la aplicación de las distribuciones binomial y normal.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Argumentar inferencias acerca de parámetros (media y varianza) o características de una población, a partir de datos de una muestra aleatoria, bajo el supuesto de normalidad y aplicando procedimientos con base en intervalos de confianza o pruebas de hipótesis.' }
        ]
      },

      habilidades: _habilidadesMatHC(),
      actitudes:   _actitudesMatHC()
    },

    // ════════════════════════════════════════════════════════════════
    //  PENSAMIENTO COMPUTACIONAL Y PROGRAMACIÓN
    //  DS 193/2019 — Programa de Estudio Mineduc, febrero 2021
    // ════════════════════════════════════════════════════════════════
    'pensamiento-computacional': {
      nombre:  'Pensamiento Computacional y Programación',
      sigla:   'PCP',
      tramo:   'media',
      niveles: ['3M', '4M'],
      decreto: 'DS 193/2019 — Programa de Estudio Mineduc, febrero 2021',

      unidades: {
        '3M': [
          'La escritura como medio para comunicar y almacenar la información',
          'La resolución de problemas y las máquinas',
          'Ayuda de la computadora en problemas geométricos y estadísticos',
          'Elaboración de Apps para dispositivos electrónicos móviles'
        ],
        '4M': [
          'La escritura como medio para comunicar y almacenar la información',
          'La resolución de problemas y las máquinas',
          'Ayuda de la computadora en problemas geométricos y estadísticos',
          'Elaboración de Apps para dispositivos electrónicos móviles'
        ]
      },

      oasPorUnidad: {
        'La escritura como medio para comunicar y almacenar la información':           ['OA1'],
        'La resolución de problemas y las máquinas':                                   ['OA2', 'OA3'],
        'Ayuda de la computadora en problemas geométricos y estadísticos':             ['OA4'],
        'Elaboración de Apps para dispositivos electrónicos móviles':                  ['OA5']
      },

      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Aplicar conceptos de Ciencias de la Computación —abstracción, organización lógica de datos, análisis de soluciones alternativas y generalización— al crear el código de una solución computacional.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Representar diferente tipo de datos en una variedad de formas, considerando su uso en diversas situaciones cotidianas y científicas.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Desarrollar y programar algoritmos para ejecutar procedimientos matemáticos, realizar cálculos y obtener términos definidos por una regla o patrón.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Crear aplicaciones y realizar análisis mediante procesadores simbólicos, de geometría dinámica y de análisis estadístico.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Desarrollar aplicaciones para dispositivos móviles y para dispositivos provistos de sensores y mecanismos de control.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Aplicar conceptos de Ciencias de la Computación —abstracción, organización lógica de datos, análisis de soluciones alternativas y generalización— al crear el código de una solución computacional.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Representar diferente tipo de datos en una variedad de formas, considerando su uso en diversas situaciones cotidianas y científicas.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Desarrollar y programar algoritmos para ejecutar procedimientos matemáticos, realizar cálculos y obtener términos definidos por una regla o patrón.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Crear aplicaciones y realizar análisis mediante procesadores simbólicos, de geometría dinámica y de análisis estadístico.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Desarrollar aplicaciones para dispositivos móviles y para dispositivos provistos de sensores y mecanismos de control.' }
        ]
      },

      habilidades: _habilidadesMatHC(),
      actitudes:   _actitudesMatHC()
    }
  }
};

// ── Helpers internos: OAH (habilidades) y actitudes comunes a Matemática HC ─
function _habilidadesMatHC() {
  return [
    { codigo: 'OAa', eje: 'Construir y evaluar estrategias', descripcion: 'Construir y evaluar estrategias de manera colaborativa al resolver problemas no rutinarios.' },
    { codigo: 'OAb', eje: 'Resolver problemas',              descripcion: 'Resolver problemas que impliquen variar algunos parámetros en el modelo utilizado y observar cómo eso influye en los resultados obtenidos.' },
    { codigo: 'OAc', eje: 'Tomar decisiones',                descripcion: 'Tomar decisiones fundamentadas en evidencia estadística y/o en la evaluación de resultados obtenidos a partir de un modelo probabilístico.' },
    { codigo: 'OAd', eje: 'Argumentar',                      descripcion: 'Argumentar, utilizando lenguaje simbólico y diferentes representaciones, para justificar la veracidad o falsedad de una conjetura, y evaluar el alcance y los límites de los argumentos utilizados.' },
    { codigo: 'OAe', eje: 'Construir modelos',               descripcion: 'Construir modelos, realizando conexiones entre variables para predecir posibles escenarios de solución a un problema, y tomar decisiones fundamentadas.' },
    { codigo: 'OAf', eje: 'Evaluar modelos',                 descripcion: 'Evaluar modelos para estudiar un fenómeno, analizando críticamente las simplificaciones requeridas y considerando las limitaciones de aquellos.' },
    { codigo: 'OAg', eje: 'Elaborar representaciones',       descripcion: 'Elaborar representaciones, tanto en forma manual como digital, y justificar cómo una misma información puede ser utilizada según el tipo de representación.' },
    { codigo: 'OAh', eje: 'Lenguaje matemático',             descripcion: 'Usar lenguaje matemático para comunicar o describir relaciones, ideas, conceptos y soluciones a otros.' },
    { codigo: 'OAi', eje: 'Trabajo con información web',     descripcion: 'Buscar, seleccionar, manejar y producir información matemática/cuantitativa confiable a través de la web.' },
    { codigo: 'OAj', eje: 'Trabajo colaborativo digital',    descripcion: 'Desarrollar un trabajo colaborativo en línea para discusión y resolución de tareas matemáticas, usando herramientas electrónicas de productividad, entornos virtuales y redes sociales.' },
    { codigo: 'OAk', eje: 'Impacto tecnológico',             descripcion: 'Analizar y evaluar el impacto de las tecnologías digitales en contextos sociales, económicos y culturales.' }
  ];
}

function _actitudesMatHC() {
  return [
    'Pensar con perseverancia y proactividad para encontrar soluciones innovadoras a los problemas.',
    'Trabajar con autonomía y proactividad en trabajos colaborativos e individuales.',
    'Trabajar con responsabilidad y liderazgo en la realización de las tareas colaborativas y en función del logro de metas comunes.',
    'Interesarse por las posibilidades que ofrece la tecnología para el desarrollo intelectual, personal y social del individuo.',
    'Pensar con conciencia, reconociendo que los errores ofrecen oportunidades para el aprendizaje.',
    'Aprovechar las herramientas disponibles para aprender y resolver problemas.',
    'Trabajar colaborativamente en la generación, desarrollo y gestión de proyectos y la resolución de problemas, integrando las diferentes ideas y puntos de vista.'
  ];
}
