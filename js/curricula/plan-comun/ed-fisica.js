// =============================================================================
//  PLAN COMÚN — Educación Física y Salud
//  Archivo: js/curricula/plan-comun/ed-fisica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['ed-fisica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['ed-fisica'] = {
  nombre: 'Educación Física y Salud',
  sigla:  'EDF',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],
  unidades: {
    '1B': ['Habilidades motrices básicas','Juegos libres','Higiene'],
    '2B': ['Destrezas locomotoras','Juegos cooperativos','Vida activa'],
    '3B': ['Habilidades atléticas','Deporte básico','Bienestar'],
    '4B': ['Gimnasia','Deportes colectivos','Salud y actividad física'],
    '5B': ['Condición física','Deportes individuales','Nutrición básica'],
    '6B': ['Capacidades físicas','Deportes y competencia','Salud integral'],
    '7B': ['Entrenamiento básico','Deportes terrestres','Vida saludable'],
    '8B': ['Planificación de actividad física','Deportes alternativos','Vida saludable'],
    '1M': ['Capacidades físicas','Deporte y salud','Vida activa adolescente'],
    '2M': ['Entrenamiento personalizado','Deportes de conjunto','Bienestar integral'],
    '3M': ['Plan de actividad física','Deportes de aventura','Salud y rendimiento'],
    '4M': ['Proyecto de vida activa','Liderazgo deportivo','Actividad física para la vida']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases Curriculares (DS 439/2012
  //  Básica, DS 369/2015 7°B-2°M, DS 193/2019 3°M-4°M FG).
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    // ── 1°B — Programa de Estudio (DS 2960/2012) ─ 11 OAs ─────────────────
    '1B': [
      { codigo: 'OA1',  eje: 'Habilidades motrices', descripcion: 'Demostrar habilidades motrices básicas de locomoción, manipulación y estabilidad en una variedad de juegos y actividades físicas, como saltar con dos pies consecutivamente en una dirección, lanzar un balón hacia un compañero, caminar y correr consecutivamente, lanzar y recoger un balón, caminar sobre una línea manteniendo el control del cuerpo, realizar suspensiones, giros y rodadas o volteos.' },
      { codigo: 'OA2',  eje: 'Habilidades motrices', descripcion: 'Ejecutar acciones motrices con relación a sí mismo, a un objeto o un compañero, usando diferentes categorías de ubicación espacial y temporal, como derecha, izquierda, adelante, atrás, arriba, abajo, adentro, afuera, entre, al lado, antes, durante, después, rápido y lento.' },
      { codigo: 'OA3',  eje: 'Habilidades motrices', descripcion: 'Practicar una amplia gama de juegos con y sin oposición, con y sin colaboración, de persecución, individuales y colectivos.' },
      { codigo: 'OA4',  eje: 'Habilidades motrices', descripcion: 'Ejecutar habilidades motrices básicas en diferentes entornos, como las plazas activas, el patio del colegio, parques, playas, entre otros.' },
      { codigo: 'OA5',  eje: 'Habilidades motrices', descripcion: 'Ejecutar movimientos corporales, expresando sensaciones, ideas, estados de ánimo y emociones en variados espacios y a diferentes ritmos.' },
      { codigo: 'OA6',  eje: 'Vida activa y saludable', descripcion: 'Ejecutar actividades físicas de intensidad moderada a vigorosa que incrementen la condición física, por medio de juegos y circuitos.' },
      { codigo: 'OA7',  eje: 'Vida activa y saludable', descripcion: 'Practicar en su vida cotidiana actividades físicas de intensidad moderada a vigorosa de forma guiada, por medio de juegos tradicionales y actividades lúdicas.' },
      { codigo: 'OA8',  eje: 'Vida activa y saludable', descripcion: 'Reconocer las sensaciones y respuestas corporales provocadas por la práctica de actividad física, como cambios del color de la piel, sudor, agitación, ritmo de respiración, cansancio y dificultad al hablar.' },
      { codigo: 'OA9',  eje: 'Vida activa y saludable', descripcion: 'Practicar actividades físicas en forma segura, demostrando la adquisición de hábitos de higiene, posturales y de vida saludable, como lavarse las manos y la cara después de la clase, mantener una correcta postura y comer una colación saludable antes y después de practicar actividad física.' },
      { codigo: 'OA10', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar juegos o actividades motrices para aprender a trabajar en equipo, asumiendo diferentes roles (respetar al otro, recoger los materiales solicitados o liderar si se le asigna ese rol).' },
      { codigo: 'OA11', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas, demostrando comportamientos seguros como: realizar un calentamiento mediante un juego; escuchar y seguir instrucciones; utilizar implementos bajo supervisión; mantener su posición dentro de los límites establecidos para la actividad.' }
    ],
    // ── 2°B — Programa de Estudio (DS 2960/2012) ─ 11 OAs ─────────────────
    '2B': [
      { codigo: 'OA1',  eje: 'Habilidades motrices', descripcion: 'Demostrar habilidades motrices básicas de locomoción, manipulación y estabilidad en diferentes direcciones, alturas y niveles, como saltar de forma continua en un pie y luego en el otro, botear un balón mientras camina, mantener el equilibrio sobre una base a una pequeña altura, realizar suspensiones, giros y rodadas o volteos.' },
      { codigo: 'OA2',  eje: 'Habilidades motrices', descripcion: 'Ejecutar acciones motrices que presenten una solución a un problema, por ejemplo, agrupaciones, representaciones de símbolos, letras, números o figuras geométricas.' },
      { codigo: 'OA3',  eje: 'Habilidades motrices', descripcion: 'Practicar una amplia gama de juegos con y sin oposición, con y sin colaboración, de persecución, individuales y colectivos.' },
      { codigo: 'OA4',  eje: 'Habilidades motrices', descripcion: 'Ejecutar habilidades motrices básicas en diferentes entornos, como plazas activas, patio del colegio, playa, entre otros, utilizando referencias (rutas, mapas, símbolos, etc.) guiados por el profesor.' },
      { codigo: 'OA5',  eje: 'Habilidades motrices', descripcion: 'Ejecutar movimientos corporales, expresando sensaciones, ideas, estados de ánimo y emociones en variados espacios y a diferentes ritmos e intensidades.' },
      { codigo: 'OA6',  eje: 'Vida activa y saludable', descripcion: 'Ejecutar actividades físicas de intensidad moderada a vigorosa que incrementen la condición física por medio de juegos y circuitos.' },
      { codigo: 'OA7',  eje: 'Vida activa y saludable', descripcion: 'Ejecutar e incorporar a su vida cotidiana juegos y actividades físicas de intensidad moderada a vigorosa (cinco veces por semana), como juegos tradicionales, saltar la cuerda y realizar caminatas al aire libre.' },
      { codigo: 'OA8',  eje: 'Vida activa y saludable', descripcion: 'Describir las sensaciones y respuestas corporales provocadas por la práctica de actividad física, como cambios del color de la piel, sudor, agitación, ritmo de respiración, cansancio y dificultad al hablar.' },
      { codigo: 'OA9',  eje: 'Vida activa y saludable', descripcion: 'Practicar actividades físicas en forma segura, demostrando la adquisición de hábitos de higiene, posturales y de vida saludable, como lavarse las manos y la cara después de la clase, mantener una correcta postura y comer una colación saludable antes y luego de la práctica de actividad física.' },
      { codigo: 'OA10', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar juegos o actividades motrices para aprender a trabajar en equipo, asumiendo diferentes roles (respetar al otro, recoger los materiales solicitados o liderar si se le asigna ese rol).' },
      { codigo: 'OA11', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas, demostrando comportamientos seguros como: realizar un calentamiento mediante un juego; escuchar y seguir instrucciones; utilizar implementos bajo supervisión; mantener su posición dentro de los límites establecidos para la actividad.' }
    ],
    // ── 3°B — Programa de Estudio (DS 2960/2012) ─ 11 OAs ─────────────────
    '3B': [
      { codigo: 'OA1',  eje: 'Habilidades motrices', descripcion: 'Demostrar capacidad para ejecutar de forma combinada las habilidades motrices básicas de locomoción, manipulación y estabilidad en diferentes direcciones, alturas y niveles, como correr y lanzar un objeto con una mano, caminar sobre una línea y realizar un giro de 180° en un pie.' },
      { codigo: 'OA2',  eje: 'Habilidades motrices', descripcion: 'Ejecutar acciones motrices que presenten una solución a un problema, reconociendo diversos criterios (tiempo, espacio y números de personas), por ejemplo, juegos de uno contra uno, juegos en grupos reducidos y juegos con superioridad numérica.' },
      { codigo: 'OA3',  eje: 'Habilidades motrices', descripcion: 'Practicar juegos pre-deportivos con reglas y espacios adaptados, aplicando los principios generales de juego, como avanzar y retroceder en bloque, recuperar el balón, acompañar la jugada y la visión periférica.' },
      { codigo: 'OA4',  eje: 'Habilidades motrices', descripcion: 'Ejecutar actividades físicas y/o lúdicas en diferentes entornos, aplicando medidas para conservar limpios y ordenados los espacios, por ejemplo: jugar en plazas activas; jugar un partido en la plaza o la playa; realizar caminatas en el entorno natural; andar en bicicleta en un parque o en un camino rural.' },
      { codigo: 'OA5',  eje: 'Habilidades motrices', descripcion: 'Ejecutar movimientos o elementos de danzas tradicionales de forma coordinada, utilizando actividades rítmicas y lúdicas de forma individual o grupal.' },
      { codigo: 'OA6',  eje: 'Vida activa y saludable', descripcion: 'Ejecutar actividades físicas de intensidad moderada a vigorosa que desarrollen la condición física por medio de la práctica de ejercicios de resistencia cardiovascular, fuerza, flexibilidad y velocidad, mejorando sus resultados personales.' },
      { codigo: 'OA7',  eje: 'Vida activa y saludable', descripcion: 'Practicar de manera regular y autónoma actividades físicas de intensidad moderada a vigorosa, como saltar la cuerda y caminar hasta el colegio.' },
      { codigo: 'OA8',  eje: 'Vida activa y saludable', descripcion: 'Describir y registrar las respuestas corporales provocadas por la práctica de actividad física, como aumento de la frecuencia cardiaca y respiratoria.' },
      { codigo: 'OA9',  eje: 'Vida activa y saludable', descripcion: 'Practicar actividades físicas en forma segura, demostrando la adquisición de hábitos de higiene, posturales y de vida saludable, como utilizar protección solar, lavarse y cambiarse de ropa después de la clase, hidratarse con agua, comer una colación saludable después de la práctica de actividad física.' },
      { codigo: 'OA10', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas y/o juegos colectivos con responsabilidad y honestidad, cumpliendo las reglas, los roles asignados y los principios de un juego limpio.' },
      { codigo: 'OA11', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas, demostrando comportamientos seguros, como: participar en actividades de calentamiento en forma apropiada; escuchar y seguir instrucciones; mantener su posición dentro de los límites establecidos para la actividad; asegurar que el espacio está libre de obstáculos.' }
    ],
    // ── 4°B — Programa de Estudio (DS 2960/2012) ─ 11 OAs ─────────────────
    '4B': [
      { codigo: 'OA1',  eje: 'Habilidades motrices', descripcion: 'Demostrar control en la ejecución de las habilidades motrices básicas de locomoción, manipulación y estabilidad en diferentes direcciones, alturas y niveles, por ejemplo, atrapar un objeto con una mano a diferentes alturas, desplazarse boteando un objeto en zigzag y saltar, caminar sobre una base a una pequeña altura y realizar un giro de 360° en un solo pie.' },
      { codigo: 'OA2',  eje: 'Habilidades motrices', descripcion: 'Ejecutar juegos colectivos y crear estrategias con el apoyo del docente para resolver problemas en relación con el tiempo, el espacio y el número de personas, por ejemplo, dar cinco pases sin que el equipo rival lo intercepte o sin que el objeto caiga.' },
      { codigo: 'OA3',  eje: 'Habilidades motrices', descripcion: 'Practicar juegos pre-deportivos con reglas y espacios adaptados, aplicando los principios generales de juego, como acoplarse en ataque y replegarse en defensa, utilizar el campo de juego a lo largo y ancho o reconocer el espacio del adversario.' },
      { codigo: 'OA4',  eje: 'Habilidades motrices', descripcion: 'Ejecutar actividades físicas y/o lúdicas en diferentes entornos, aplicando medidas para conservar limpios y ordenados los espacios, como: jugar en plazas activas; jugar un partido en la plaza o la playa; realizar caminatas en el entorno natural; andar en bicicleta en un parque o en un camino rural.' },
      { codigo: 'OA5',  eje: 'Habilidades motrices', descripcion: 'Ejecutar movimientos o elementos de danzas tradicionales de forma coordinada, utilizando actividades rítmicas y lúdicas de forma individual o grupal.' },
      { codigo: 'OA6',  eje: 'Vida activa y saludable', descripcion: 'Ejecutar actividades físicas de intensidad moderada a vigorosa que desarrollen la condición física por medio de la práctica de ejercicios de resistencia cardiovascular, fuerza, flexibilidad y velocidad, mejorando sus resultados personales.' },
      { codigo: 'OA7',  eje: 'Vida activa y saludable', descripcion: 'Practicar de manera regular y autónoma actividades físicas de intensidad moderada a vigorosa, como saltar la cuerda y caminar hasta el colegio.' },
      { codigo: 'OA8',  eje: 'Vida activa y saludable', descripcion: 'Medir y registrar las respuestas corporales provocadas por la actividad física mediante el pulso o utilizando escalas de percepción de esfuerzo.' },
      { codigo: 'OA9',  eje: 'Vida activa y saludable', descripcion: 'Practicar actividades físicas en forma segura, demostrando la adquisición de hábitos de higiene, posturales y de vida saludable, como utilizar protección solar, lavarse y cambiarse de ropa después de la clase, hidratarse con agua, comer una colación saludable después de la práctica de actividad física.' },
      { codigo: 'OA10', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas y/o juegos colectivos con responsabilidad y honestidad, cumpliendo las reglas y los roles asignados, respetando las decisiones de la autoridad, y organizar equitativamente los equipos.' },
      { codigo: 'OA11', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas, demostrando comportamientos seguros, como: realizar un calentamiento en forma apropiada; utilizar de manera adecuada los materiales y las instalaciones para evitar el riesgo personal y de otros; escuchar y seguir instrucciones; asegurar que el espacio está libre de obstáculos.' }
    ],
    // ── 5°B — Programa de Estudio (DS 2960/2012) ─ 11 OAs ─────────────────
    '5B': [
      { codigo: 'OA1',  eje: 'Habilidades motrices', descripcion: 'Demostrar la aplicación de las habilidades motrices básicas adquiridas, en una variedad de actividades deportivas; por ejemplo: realizar un giro sobre una viga de equilibrio, lanzar un balón hacia la portería y correr una distancia determinada (por ejemplo: 50 o 100 metros).' },
      { codigo: 'OA2',  eje: 'Habilidades motrices', descripcion: 'Ejecutar juegos colectivos y deportes, creando tácticas y estrategias y demostrando formas para resolver un problema en relación con el espacio, el objeto y los adversarios; por ejemplo: dar tres pases en cinco segundos o dar tres pasos y dar un pase a un compañero.' },
      { codigo: 'OA3',  eje: 'Habilidades motrices', descripcion: 'Practicar deportes individuales y colectivos con reglas y espacios adaptados en los que aplican estrategias defensivas y ofensivas; por ejemplo: reducir y ampliar espacios, obtener y mantener la posesión del balón y transportar el balón de forma controlada.' },
      { codigo: 'OA4',  eje: 'Habilidades motrices', descripcion: 'Ejecutar actividades físicas y/o deportivas, utilizando diferentes entornos y aplicando medidas para conservar limpios y ordenados los espacios; por ejemplo: caminatas recreativas urbanas; bailes recreativos; cicletadas; juegos de balón en plazas y parques.' },
      { codigo: 'OA5',  eje: 'Habilidades motrices', descripcion: 'Demostrar la correcta ejecución de una danza nacional, utilizando pasos básicos y música folclórica de forma individual o grupal; por ejemplo: danzas de la zona norte, central, sur e Isla de Pascua.' },
      { codigo: 'OA6',  eje: 'Vida activa y saludable', descripcion: 'Ejecutar actividades físicas de intensidad moderada a vigorosa que desarrollen la condición física por medio de la práctica de ejercicios de resistencia cardiovascular, fuerza, flexibilidad y velocidad, estableciendo metas de superación personal.' },
      { codigo: 'OA7',  eje: 'Vida activa y saludable', descripcion: 'Practicar y planificar de forma regular actividades físicas y/o deportivas de intensidad moderada a vigorosa, como planificar un partido, participar en una caminata o corrida familiar e integrar talleres deportivos.' },
      { codigo: 'OA8',  eje: 'Vida activa y saludable', descripcion: 'Determinar la intensidad del esfuerzo físico de forma manual, mediante el pulso o utilizando escalas de percepción de esfuerzo.' },
      { codigo: 'OA9',  eje: 'Vida activa y saludable', descripcion: 'Practicar actividades físicas en forma segura, demostrando la adquisición de hábitos de higiene, posturales y de vida saludable, como utilizar una ropa distinta para la clase, mantener una correcta postura, utilizar protectores solares e hidratarse con agua antes, durante y después de la clase.' },
      { codigo: 'OA10', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas y/o juegos colectivos, demostrando responsabilidad, liderazgo y respeto al participar; por ejemplo: conversar y plantear discrepancias, aceptar las diferencias individuales e intentar llegar a acuerdos, jugar en forma cooperativa, aceptar el resultado y manejar el triunfo.' },
      { codigo: 'OA11', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas y/o deportivas, demostrando comportamientos seguros y un manejo adecuado de los materiales y los procedimientos, como: realizar un calentamiento específico individual o grupal; usar ropa adecuada para la actividad; cuidar sus pertenencias; manipular de forma segura los implementos y las instalaciones.' }
    ],
    // ── 6°B — Programa de Estudio (DS 2960/2012) ─ 11 OAs ─────────────────
    '6B': [
      { codigo: 'OA1',  eje: 'Habilidades motrices', descripcion: 'Demostrar la aplicación de las habilidades motrices básicas adquiridas, en una variedad de actividades deportivas, por ejemplo, realizar un giro sobre una viga de equilibrio, lanzar un balón hacia la portería y correr una distancia determinada (por ejemplo, 50 o 100 metros).' },
      { codigo: 'OA2',  eje: 'Habilidades motrices', descripcion: 'Ejecutar juegos colectivos y deportes que requieran tomar decisiones y evaluar las estrategias utilizadas para perfeccionar su juego, por ejemplo, aplicar las orientaciones dadas por el profesor durante el tiempo solicitado o parcial reglamentado durante el juego.' },
      { codigo: 'OA3',  eje: 'Habilidades motrices', descripcion: 'Practicar deportes individuales y colectivos que apliquen reglas y estrategias específicas del juego, por ejemplo, generar superioridad numérica, cambiar la posición o la función de los jugadores durante el partido.' },
      { codigo: 'OA4',  eje: 'Habilidades motrices', descripcion: 'Planificar y ejecutar actividades físicas y deportivas, utilizando diversos entornos y aplicando medidas para conservar limpios y ordenados los espacios; por ejemplo: planificar un campamento, incluyendo actividades deportivas.' },
      { codigo: 'OA5',  eje: 'Habilidades motrices', descripcion: 'Demostrar la correcta ejecución de una danza nacional, utilizando pasos básicos y música folclórica de forma individual o grupal, por ejemplo, danzas de la zona norte, central, sur e Isla de Pascua.' },
      { codigo: 'OA6',  eje: 'Vida activa y saludable', descripcion: 'Ejecutar actividades físicas de intensidad moderada a vigorosa que desarrollen la condición física por medio de la práctica de ejercicios de resistencia cardiovascular, fuerza, flexibilidad y velocidad, estableciendo metas de superación personal.' },
      { codigo: 'OA7',  eje: 'Vida activa y saludable', descripcion: 'Practicar y planificar de forma regular actividades físicas y/o deportivas de intensidad moderada a vigorosa, como planificar un partido, participar en una caminata, corrida o cicletada familiar e integrar talleres deportivos.' },
      { codigo: 'OA8',  eje: 'Vida activa y saludable', descripcion: 'Determinar la intensidad del esfuerzo físico de forma manual, mediante el pulso o utilizando escalas de percepción de esfuerzo.' },
      { codigo: 'OA9',  eje: 'Vida activa y saludable', descripcion: 'Practicar actividades físicas en forma segura, demostrando la adquisición de hábitos de higiene, posturales y de vida saludable, como ducharse después de realizar actividad física, utilizar una ropa distinta para la clase, mantener una correcta postura, utilizar protectores solares e hidratarse con agua antes, durante y después de la clase.' },
      { codigo: 'OA10', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas y/o juegos colectivos, demostrando responsabilidad, liderazgo y respeto al participar; por ejemplo: conversar y plantear discrepancias, aceptar las diferencias individuales e intentar llegar a acuerdos, jugar en forma cooperativa, aceptar el resultado y manejar el triunfo.' },
      { codigo: 'OA11', eje: 'Seguridad, juego limpio y liderazgo', descripcion: 'Practicar actividades físicas y/o deportivas, demostrando comportamientos seguros y un manejo adecuado de los materiales y los procedimientos, como: realizar un calentamiento específico individual o grupal; usar ropa adecuada para la actividad; cuidar sus pertenencias; manipular de forma segura los implementos y las instalaciones.' }
    ],
    // ── 7°B — Programa de Estudio (DS 369/2015) ─ 5 OAs ──────────────────
    '7B': [
      { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Aplicar, combinar y ajustar las habilidades motrices específicas de locomoción, manipulación y estabilidad en, al menos: un deporte individual (atletismo, gimnasia artística, entre otros); un deporte de oposición (tenis, bádminton, entre otros); un deporte de colaboración (escalada, vóleibol duplas, entre otros); un deporte de oposición/colaboración (básquetbol, hándbol, hockey, entre otros); una danza (folclórica, moderna, entre otras).' },
      { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Seleccionar y aplicar estrategias y tácticas específicas para la resolución de problemas durante la práctica de juegos o deportes; por ejemplo: ubicar la pelota lejos de un contrincante, utilizar los espacios para recibir un objeto sin oponentes, aplicar un sistema de juego (uno contra uno, tres contra tres, entre otros), entre otros.' },
      { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Desarrollar la resistencia cardiovascular, la fuerza muscular, la velocidad y la flexibilidad para alcanzar una condición física saludable, considerando: frecuencia; intensidad; tiempo de duración; tipo de ejercicio (correr, andar en bicicleta, realizar trabajo de fuerza, ejercicios de flexibilidad, entre otros).' },
      { codigo: 'OA4', eje: 'Vida activa y saludable', descripcion: 'Practicar regularmente una variedad de actividades físicas alternativas y/o deportivas en diferentes entornos, aplicando conductas de autocuidado y seguridad, como realizar al menos 30 minutos diarios de actividades físicas de su interés, evitar el consumo de drogas, tabaco y alcohol, ejecutar un calentamiento, aplicar reglas y medidas de seguridad, hidratarse con agua de forma permanente, entre otras.' },
      { codigo: 'OA5', eje: 'Responsabilidad personal y social en la actividad física y el deporte', descripcion: 'Participar en una variedad de actividades físicas y/o deportivas de su interés y que se desarrollan en su comunidad escolar y/o en su entorno; por ejemplo: integrarse en talleres de actividades físicas y/o deportivas extraprogramáticas en su comunidad y/o entorno; asumir variados roles en la participación y promoción de una vida activa; utilizar los entornos cercanos para realizar alguna actividad física y/o deportiva (plazas, parques, entre otros).' }
    ],
    // ── 8°B — Programa de Estudio (DS 369/2015) ─ 5 OAs ──────────────────
    '8B': [
      { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Seleccionar, combinar y aplicar con mayor dominio las habilidades motrices específicas de locomoción, manipulación y estabilidad en, al menos: un deporte individual (atletismo, gimnasia artística, entre otros); un deporte de oposición (tenis, bádminton, entre otros); un deporte de colaboración (escalada, vóleibol duplas, entre otros); un deporte de oposición/colaboración (básquetbol, hándbol, hockey, entre otros); una danza (folclórica, moderna, entre otras).' },
      { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Seleccionar, evaluar y aplicar estrategias y tácticas específicas para la resolución de problemas durante la práctica de juegos o deportes; por ejemplo: ubicar la pelota lejos de un contrincante, utilizar los espacios para recibir un objeto sin oponentes, aplicar un sistema de juego (uno contra uno, tres contra tres, entre otros), entre otros.' },
      { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Desarrollar la resistencia cardiovascular, la fuerza muscular, la velocidad y la flexibilidad para alcanzar una condición física saludable, considerando: frecuencia; intensidad; tiempo de duración y recuperación; progresión; tipo de ejercicio (correr, andar en bicicleta, realizar trabajo de fuerza, ejercicios de flexibilidad, entre otros).' },
      { codigo: 'OA4', eje: 'Vida activa y saludable', descripcion: 'Practicar regularmente una variedad de actividades físicas alternativas y/o deportivas en diferentes entornos, aplicando conductas de autocuidado y seguridad, como realizar al menos 30 minutos diarios de actividades físicas de su interés, evitar el consumo de drogas, tabaco y alcohol, ejecutar un calentamiento, aplicar reglas y medidas de seguridad, hidratarse con agua de forma permanente, entre otras.' },
      { codigo: 'OA5', eje: 'Responsabilidad personal y social en la actividad física y el deporte', descripcion: 'Promover y participar en una variedad de actividades físicas y/o deportivas de su interés y que se desarrollan en su comunidad escolar y/o en su entorno; por ejemplo: promover la práctica regular de actividad física y deportiva; participar en la organización de una variedad de actividades físicas y/o deportivas que sean de interés personal y de la comunidad; utilizar estrategias para promover la práctica regular de actividad física (por ejemplo: elaborar afiches o diarios murales, entre otros).' }
    ],
    // ── 1°M — Programa de Estudio (DS 369/2015) ─ 5 OAs ─────────────────
    '1M': [
      { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Perfeccionar y aplicar controladamente las habilidades motrices específicas de locomoción, manipulación y estabilidad en, al menos: un deporte individual (gimnasia rítmica, natación, entre otros); un deporte de oposición (bádminton, tenis de mesa, entre otros); un deporte de colaboración (kayak, escalada, entre otros); un deporte de oposición/colaboración (fútbol, vóleibol, rugby, entre otros); una danza (folclórica, popular, entre otras).' },
      { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Modificar, evaluar y aplicar las estrategias y tácticas específicas utilizadas para la resolución de problemas durante la práctica de juegos o deportes; por ejemplo: ubicar la pelota en un punto estratégico de la cancha, cambiar la posición o la función de los jugadores durante el partido, implementar y evaluar un sistema de posiciones de ataque junto a otros jugadores, entre otras.' },
      { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Diseñar y aplicar un plan de entrenamiento personal para alcanzar una condición física saludable, desarrollando la resistencia cardiovascular, la fuerza muscular, la velocidad y la flexibilidad, considerando: tiempo asignado para el plan de entrenamiento (por ejemplo: 4 a 6 semanas); frecuencia, intensidad, tiempo de duración y recuperación, progresión y tipo de ejercicio; niveles de condición física al iniciar el plan de entrenamiento; actividades físicas que sean de interés personal y contribuyan a mejorar la condición física; ingesta y gasto calórico.' },
      { codigo: 'OA4', eje: 'Vida activa y saludable', descripcion: 'Practicar regularmente una variedad de actividades físicas alternativas y/o deportivas en diferentes entornos, aplicando conductas de autocuidado, seguridad y primeros auxilios, como: realizar al menos 30 minutos diarios de actividades físicas de su interés; promover campañas para evitar el consumo de drogas, tabaco y alcohol; aplicar maniobras básicas de primeros auxilios en situaciones de riesgo; dirigir y ejecutar un calentamiento de manera grupal; hidratarse con agua de forma permanente.' },
      { codigo: 'OA5', eje: 'Responsabilidad personal y social en el deporte y la actividad física', descripcion: 'Participar y promover una variedad de actividades físicas y/o deportivas de su interés y que se desarrollen en su comunidad escolar y/o en su entorno; por ejemplo: evaluar los programas que ofrece la comunidad para promover la práctica regular de actividad física; aplicar y desarrollar estrategias específicas para mejorar su condición física y la de los demás; desarrollar estrategias grupales para promover una vida activa dentro de su comunidad escolar o su entorno cercano.' }
    ],
    // ── 2°M — Programa de Estudio (DS 369/2015) ─ 5 OAs ─────────────────
    '2M': [
      { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Perfeccionar y aplicar con precisión las habilidades motrices específicas de locomoción, manipulación y estabilidad en, al menos: un deporte individual (gimnasia rítmica, natación, entre otros); un deporte de oposición (bádminton, tenis de mesa, entre otros); un deporte de colaboración (kayak, escalada, entre otros); un deporte de oposición/colaboración (fútbol, vóleibol, rugby, entre otros); una danza (folclórica, popular, entre otras).' },
      { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Diseñar, aplicar y evaluar las estrategias y tácticas específicas utilizadas para la resolución de problemas durante la práctica de juegos o deportes; por ejemplo: ajustar las velocidades del golpe según la posición del contrincante, elaborar en forma grupal una táctica para recuperar el balón desde el campo del adversario, evaluar la aplicación de una estrategia defensiva en función del resultado, entre otros.' },
      { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Diseñar, evaluar y aplicar un plan de entrenamiento personal para alcanzar una condición física saludable, desarrollando la resistencia cardiovascular, la fuerza muscular, la velocidad y la flexibilidad, considerando: tiempo asignado para el plan de entrenamiento (por ejemplo: 4 a 6 semanas); frecuencia, intensidad, tiempo de duración y recuperación, progresión y tipo de ejercicio; niveles de condición física al iniciar el plan de entrenamiento; actividades físicas que sean de interés personal y contribuyan a mejorar la condición física; ingesta y gasto calórico.' },
      { codigo: 'OA4', eje: 'Vida activa y saludable', descripcion: 'Practicar regularmente una variedad de actividades físicas alternativas y/o deportivas en diferentes entornos, aplicando conductas de autocuidado, seguridad y primeros auxilios, como: realizar al menos 30 minutos diarios de actividades físicas de su interés; promover campañas para evitar el consumo de drogas, tabaco y alcohol; aplicar maniobras básicas de primeros auxilios en situaciones de riesgo; dirigir y ejecutar un calentamiento de manera grupal; hidratarse con agua de forma permanente.' },
      { codigo: 'OA5', eje: 'Responsabilidad personal y social en el deporte y la actividad física', descripcion: 'Participar, liderar y promover una variedad de actividades físicas y/o deportivas de su interés y que se desarrollen en su comunidad escolar y/o en su entorno; por ejemplo: sugerir estrategias grupales para organizar actividades físicas y/o deportivas; demostrar distintos estilos de liderazgo en la promoción de una vida activa; proponer y crear una variedad de actividades físicas y deportivas para desarrollar los planes para promover una vida activa en su comunidad; fomentar y crear estrategias para adherir a la práctica de actividad física permanente.' }
    ],
    '3M': [
      { codigo: 'OA1', eje: 'Vida Activa Saludable', descripcion: 'Diseñar, ejecutar y evaluar un plan personal de actividad física saludable que integre las dimensiones física, mental, social y emocional, considerando intereses, necesidades, contextos y aspectos éticos.' },
      { codigo: 'OA2', eje: 'Vida Activa Saludable', descripcion: 'Promover, en su comunidad educativa y entorno, prácticas que fomenten estilos de vida activos y saludables, considerando los principios del aprendizaje colaborativo, inclusivo y de equidad de género.' },
      { codigo: 'OA3', eje: 'Vida Activa Saludable', descripcion: 'Aplicar estrategias para autorregular su esfuerzo físico, prevenir lesiones y mejorar su bienestar integral durante la práctica de actividad física, deportiva o recreativa.' },
      { codigo: 'OA4', eje: 'Vida Activa Saludable', descripcion: 'Evaluar críticamente los factores que inciden en una vida activa y saludable (sedentarismo, alimentación, descanso, estrés, uso de pantallas), proponiendo acciones para superarlos.' },
      { codigo: 'OA5', eje: 'Vida Activa Saludable', descripcion: 'Diseñar y liderar proyectos comunitarios que promuevan la actividad física, el deporte y la recreación en su entorno escolar y social, considerando la sustentabilidad ambiental e inclusión.' }
    ],
    '4M': [
      { codigo: 'OA1', eje: 'Vida Activa Saludable', descripcion: 'Diseñar, ejecutar y evaluar un plan personal de actividad física saludable que integre las dimensiones física, mental, social y emocional, considerando intereses, necesidades, contextos y aspectos éticos.' },
      { codigo: 'OA2', eje: 'Vida Activa Saludable', descripcion: 'Promover, en su comunidad educativa y entorno, prácticas que fomenten estilos de vida activos y saludables, considerando los principios del aprendizaje colaborativo, inclusivo y de equidad de género.' },
      { codigo: 'OA3', eje: 'Vida Activa Saludable', descripcion: 'Aplicar estrategias para autorregular su esfuerzo físico, prevenir lesiones y mejorar su bienestar integral durante la práctica de actividad física, deportiva o recreativa.' },
      { codigo: 'OA4', eje: 'Vida Activa Saludable', descripcion: 'Evaluar críticamente los factores que inciden en una vida activa y saludable (sedentarismo, alimentación, descanso, estrés, uso de pantallas), proponiendo acciones para superarlos.' },
      { codigo: 'OA5', eje: 'Vida Activa Saludable', descripcion: 'Diseñar y liderar proyectos comunitarios que promuevan la actividad física, el deporte y la recreación en su entorno escolar y social, considerando la sustentabilidad ambiental e inclusión.' }
    ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Habilidades motrices','Vida activa y saludable','Seguridad, juego limpio y liderazgo'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVOS DIFERENCIADOS HC (3°M y 4°M) — DS 193/2019
  //  Programas de Estudio Mineduc, febrero 2021. Las Bases Curriculares
  //  prescriben los mismos OAs para 3°M y 4°M.
  // ────────────────────────────────────────────────────────────────────
  electivos: {
    'educacion-fisica-y-salud-1': {
      nombre:  'Educación Física y Salud (Programa 1)',
      sigla:   'EFS1',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Habilidades motrices y juego modificado','Plan de entrenamiento personal','Vida activa y bienestar comunitario','Estilo de vida saludable y entorno social'],
        '4M': ['Habilidades motrices y juego modificado','Plan de entrenamiento personal','Vida activa y bienestar comunitario','Estilo de vida saludable y entorno social']
      },
      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Aplicar individual y colectivamente las habilidades motrices especializadas de manera creativa y segura, en una variedad de actividades físicas que sean de sus intereses y en diferentes entornos.' },
          { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Evaluar el impacto de las estrategias y tácticas individuales y colectivas utilizadas para la resolución de problemas en el juego, el deporte y la recreación, asumiendo distintos roles y tareas.' },
          { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Diseñar y aplicar un plan de entrenamiento para mejorar su rendimiento físico considerando sus características personales y funcionales.' },
          { codigo: 'OA4', eje: 'Responsabilidad personal y social', descripcion: 'Promover el bienestar, el autocuidado, la vida activa y la alimentación saludable en su comunidad, valorando la diversidad de las personas a través de la aplicación de programas y proyectos deportivos, recreativos y socioculturales.' },
          { codigo: 'OA5', eje: 'Responsabilidad personal y social', descripcion: 'Analizar cómo los factores sociales, culturales, económicos y tecnológicos favorecen el desarrollo de oportunidades para la adquisición de un estilo de vida activo saludable a nivel local, regional y global.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Aplicar individual y colectivamente las habilidades motrices especializadas de manera creativa y segura, en una variedad de actividades físicas que sean de sus intereses y en diferentes entornos.' },
          { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Evaluar el impacto de las estrategias y tácticas individuales y colectivas utilizadas para la resolución de problemas en el juego, el deporte y la recreación, asumiendo distintos roles y tareas.' },
          { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Diseñar y aplicar un plan de entrenamiento para mejorar su rendimiento físico considerando sus características personales y funcionales.' },
          { codigo: 'OA4', eje: 'Responsabilidad personal y social', descripcion: 'Promover el bienestar, el autocuidado, la vida activa y la alimentación saludable en su comunidad, valorando la diversidad de las personas a través de la aplicación de programas y proyectos deportivos, recreativos y socioculturales.' },
          { codigo: 'OA5', eje: 'Responsabilidad personal y social', descripcion: 'Analizar cómo los factores sociales, culturales, económicos y tecnológicos favorecen el desarrollo de oportunidades para la adquisición de un estilo de vida activo saludable a nivel local, regional y global.' }
        ]
      }
    },
    'educacion-fisica-y-salud-2': {
      nombre:  'Educación Física y Salud (Programa 2)',
      sigla:   'EFS2',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Evaluación de habilidades motrices','Estrategias y juego inteligente','Plan de entrenamiento responsable','Programas y proyectos comunitarios'],
        '4M': ['Evaluación de habilidades motrices','Estrategias y juego inteligente','Plan de entrenamiento responsable','Programas y proyectos comunitarios']
      },
      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Evaluar individual y colectivamente las habilidades motrices especializadas utilizadas en una variedad de actividades físicas que sean de su interés y en diferentes entornos.' },
          { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Organizar y aplicar individual y colectivamente estrategias y tácticas para desarrollar un juego inteligente, asumiendo distintos roles y tareas.' },
          { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Aplicar responsablemente un plan de entrenamiento para mejorar su rendimiento físico considerando sus características personales y funcionales.' },
          { codigo: 'OA4', eje: 'Responsabilidad personal y social', descripcion: 'Evaluar el impacto de variados programas y proyectos deportivos, recreativos y socioculturales que promuevan de manera colectiva el bienestar, el autocuidado, la vida activa y la alimentación saludable en su comunidad, considerando la diversidad de las personas.' },
          { codigo: 'OA5', eje: 'Responsabilidad personal y social', descripcion: 'Evaluar por medio de la práctica regular de actividad física cómo los factores sociales, culturales, económicos y tecnológicos favorecen el desarrollo de oportunidades para la adquisición de un estilo de vida activo saludable a nivel local, regional y global.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Habilidades motrices', descripcion: 'Evaluar individual y colectivamente las habilidades motrices especializadas utilizadas en una variedad de actividades físicas que sean de su interés y en diferentes entornos.' },
          { codigo: 'OA2', eje: 'Habilidades motrices', descripcion: 'Organizar y aplicar individual y colectivamente estrategias y tácticas para desarrollar un juego inteligente, asumiendo distintos roles y tareas.' },
          { codigo: 'OA3', eje: 'Vida activa y saludable', descripcion: 'Aplicar responsablemente un plan de entrenamiento para mejorar su rendimiento físico considerando sus características personales y funcionales.' },
          { codigo: 'OA4', eje: 'Responsabilidad personal y social', descripcion: 'Evaluar el impacto de variados programas y proyectos deportivos, recreativos y socioculturales que promuevan de manera colectiva el bienestar, el autocuidado, la vida activa y la alimentación saludable en su comunidad, considerando la diversidad de las personas.' },
          { codigo: 'OA5', eje: 'Responsabilidad personal y social', descripcion: 'Evaluar por medio de la práctica regular de actividad física cómo los factores sociales, culturales, económicos y tecnológicos favorecen el desarrollo de oportunidades para la adquisición de un estilo de vida activo saludable a nivel local, regional y global.' }
        ]
      }
    }
  }
};

