// =============================================================================
//  PLAN COMÚN — Física
//  Archivo: js/curricula/plan-comun/fisica.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['fisica'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['fisica'] = {
  nombre: 'Física',
  sigla:  'FIS',
  niveles: ['1M','2M','3M','4M'],
  // 1M-2M forman parte de Ciencias Naturales (ver ciencias.js).
  // 3M-4M son Formación General FG (DS 193/2019).
  unidades: {
    '1M': ['Cinemática','Dinámica newtoniana','Trabajo y energía'],
    '2M': ['Fluidos','Termodinámica','Ondas y sonido'],
    '3M': ['Electricidad y magnetismo','Óptica','Física moderna básica'],
    '4M': ['Electromagnetismo','Relatividad especial','Física cuántica básica']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases Curriculares (DS 369/2015 para
  //  1M-2M CN y DS 193/2019 para 3M-4M FG). Formato-ejemplo:
  //    { codigo:'OA1', eje:'Física', descripcion:'Explicar...' }
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1M': [ /* Física 1°M — DS 1264/2016 (Bases CN 7°-2°M, eje Física). Numeración Mineduc original preservada para trazabilidad. Ver ciencias.js. */
      { codigo: 'OA9', eje: 'Física', descripcion: 'Demostrar que comprende, por medio de la creación de modelos y experimentos, que las ondas transmiten energía y que se pueden reflejar, refractar y absorber, explicando y considerando: sus características (amplitud, frecuencia, longitud de onda y velocidad de propagación, entre otras); los criterios para clasificarlas (mecánicas, electromagnéticas, transversales, longitudinales, superficiales).' },
      { codigo: 'OA10', eje: 'Física', descripcion: 'Explicar fenómenos del sonido perceptibles por las personas, como el eco, la resonancia y el efecto Doppler, entre otros, utilizando el modelo ondulatorio y por medio de la experimentación, considerando sus: características y cualidades (intensidad, tono, timbre y rapidez); emisiones (en cuerdas vocales, en parlantes e instrumentos musicales); consecuencias (contaminación y medio de comunicación); aplicaciones tecnológicas (ecógrafo, sonar y estetoscopio, entretención, entre otras).' },
      { codigo: 'OA11', eje: 'Física', descripcion: 'Explicar fenómenos luminosos, como la reflexión, la refracción, la interferencia y el efecto Doppler, entre otros, por medio de la experimentación y el uso de modelos, considerando: los modelos corpuscular y ondulatorio de la luz; las características y la propagación de la luz (viaja en línea recta, formación de sombras y posee rapidez, entre otras); la formación de imágenes (espejos y lentes); la formación de colores (difracción, colores primarios y secundarios, filtros); sus aplicaciones tecnológicas (lentes, telescopio, prismáticos y focos, entre otros).' },
      { codigo: 'OA12', eje: 'Física', descripcion: 'Explorar y describir el funcionamiento del oído y del ojo humano, considerando: la recepción de ondas sonoras y luminosas; el espectro sonoro y de la luz visible; sus capacidades, limitaciones y consecuencias sociales; la tecnología correctiva (lentes y audífonos).' },
      { codigo: 'OA13', eje: 'Física', descripcion: 'Describir el origen y la propagación, por medio del modelo ondulatorio, de la energía liberada en un sismo, considerando: los parámetros que lo describen (epicentro, hipocentro, área de ruptura, magnitud e intensidad); los tipos de ondas sísmicas (primarias, secundarias y superficiales); su medición y registro (sismógrafo, escalas sísmicas); sus consecuencias directas e indirectas en la superficie de la Tierra (como tsunamis) y en la sociedad; su importancia en geología, por ejemplo, en el estudio de la estructura interna de la Tierra.' },
      { codigo: 'OA14', eje: 'Física', descripcion: 'Crear modelos que expliquen los fenómenos astronómicos del sistema solar relacionados con: los movimientos del sistema Tierra-Luna y los fenómenos de luz y sombra, como las fases lunares y los eclipses; los movimientos de la Tierra respecto del Sol y sus consecuencias, como las estaciones climáticas; la comparación de los distintos planetas con la Tierra en cuanto a su distancia al Sol, su tamaño, su período orbital, su atmósfera y otros.' },
      { codigo: 'OA15', eje: 'Física', descripcion: 'Describir y comparar diversas estructuras cósmicas, como meteoros, asteroides, cometas, satélites, planetas, estrellas, nebulosas, galaxias y cúmulo de galaxias, considerando: sus tamaños y formas; sus posiciones en el espacio; temperatura, masa, color y magnitud, entre otros.' },
      { codigo: 'OA16', eje: 'Física', descripcion: 'Investigar y explicar sobre la investigación astronómica en Chile y el resto del mundo, considerando aspectos como: el clima y las ventajas que ofrece nuestro país para la observación astronómica; la tecnología utilizada (telescopios, radiotelescopios y otros instrumentos astronómicos); la información que proporciona la luz y otras radiaciones emitidas por los astros; los aportes de científicas chilenas y científicos chilenos.' }
    ],
    '2M': [ /* Física 2°M — DS 1264/2016 (Bases CN 7°-2°M, eje Física). Numeración Mineduc original. Ver ciencias.js. */
      { codigo: 'OA9', eje: 'Física', descripcion: 'Analizar, sobre la base de la experimentación, el movimiento rectilíneo uniforme y acelerado de un objeto respecto de un sistema de referencia espacio-temporal, considerando variables como la posición, la velocidad y la aceleración en situaciones cotidianas.' },
      { codigo: 'OA10', eje: 'Física', descripcion: 'Explicar, por medio de investigaciones experimentales, los efectos que tiene una fuerza neta sobre un objeto, utilizando las leyes de Newton y el diagrama de cuerpo libre.' },
      { codigo: 'OA11', eje: 'Física', descripcion: 'Describir el movimiento de un objeto, usando la ley de conservación de la energía mecánica y los conceptos de trabajo y potencia mecánica.' },
      { codigo: 'OA12', eje: 'Física', descripcion: 'Analizar e interpretar datos de investigaciones sobre colisiones entre objetos, considerando: la cantidad de movimiento de un cuerpo en función del impulso que adquiere; la ley de conservación de cantidad de movimiento (momento lineal o momentum).' },
      { codigo: 'OA13', eje: 'Física', descripcion: 'Demostrar que comprenden que el conocimiento del Universo cambia y aumenta a partir de nuevas evidencias, usando modelos como el geocéntrico y el heliocéntrico, y teorías como la del Big-Bang, entre otros.' },
      { codigo: 'OA14', eje: 'Física', descripcion: 'Explicar cualitativamente por medio de las leyes de Kepler y la de gravitación universal de Newton: el origen de las mareas; la formación y dinámica de estructuras cósmicas naturales, como el sistema solar y sus componentes, las estrellas y las galaxias; el movimiento de estructuras artificiales como sondas, satélites y naves espaciales.' }
    ],
    '3M': [ /* TODO: OAs Física 3°M FG DS 193/2019 */ ],
    '4M': [ /* TODO: OAs Física 4°M FG DS 193/2019 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Observar y plantear preguntas', 'Planificar y conducir una investigación', 'Procesar, analizar e interpretar evidencia', 'Evaluar y comunicar']
};

