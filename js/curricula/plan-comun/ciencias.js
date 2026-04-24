// =============================================================================
//  PLAN COMÚN — Ciencias Naturales
//  Archivo: js/curricula/plan-comun/ciencias.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['ciencias'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

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

