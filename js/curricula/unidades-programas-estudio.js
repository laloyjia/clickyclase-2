// =============================================================================
//  UNIDADES OFICIALES — Programas de Estudio Mineduc
//  Archivo: js/curricula/unidades-programas-estudio.js
//
//  Reemplaza los "ejes" genéricos del campo `unidades` de cada asignatura por
//  las unidades didácticas reales de los Programas de Estudio cargados en
//  /pdf-text. Las unidades aquí se aplican como override a los archivos
//  plan-comun/<asig>.js.
//
//  Estructura:
//    window.UNIDADES_PROGRAMAS_ESTUDIO[asignaturaKey][nivelKey] = [
//      'Unidad 1: ...', 'Unidad 2: ...', ...
//    ]
//
//  Si una asignatura/nivel no está aquí, se mantienen las "unidades" del
//  archivo de la asignatura (que actualmente son los ejes disciplinares).
//
//  Fuente:
//    - Extracción automática de PDFs Mineduc en pdf-text/
//    - Correcciones manuales para títulos truncados, contrastando con los
//      títulos oficiales del Programa de Estudio.
// =============================================================================

window.UNIDADES_PROGRAMAS_ESTUDIO = {
  // ── ARTES VISUALES ─────────────────────────────────────────────
  'artes': {
    '7B': [
      'Unidad 1: Creación en el plano y diversidad cultural',
      'Unidad 2: Espacios de difusión de las artes visuales y diversidad cultural',
      'Unidad 3: Creación en el volumen y género',
      'Unidad 4: Imágenes digitales en las artes visuales e identidad'
    ],
    '8B': [
      'Unidad 1: Creación visual, persona y naturaleza',
      'Unidad 2: Creación visual, persona y medioambiente',
      'Unidad 3: Instalación y arte contemporáneo',
      'Unidad 4: Espacios de difusión, diseño y naturaleza'
    ],
    '1M': [
      'Unidad 1: Grabado y libro de artista',
      'Unidad 2: Arquitectura',
      'Unidad 3: Pintura Mural y Diseño Urbano',
      'Unidad 4: Arte Digital'
    ],
    '2M': [
      'Unidad 1: Problemáticas juveniles y medios',
      'Unidad 2: Problemáticas sociales y escultura',
      'Unidad 3: Instalación multimedial',
      'Unidad 4: Diseño y difusión'
    ]
  },

  // ── CIENCIAS NATURALES (7°-8° básico) ──────────────────────────
  'ciencias': {
    '7B': [
      'Unidad 1: Comportamiento de la materia y su clasificación',
      'Unidad 2: Cambios físicos y químicos en la materia (Eje Física/Química)',
      'Unidad 3: Sistema reproductor y sexualidad responsable (Eje Biología)',
      'Unidad 4: Microorganismos, barreras defensivas y prevención de enfermedades (Eje Biología)'
    ],
    '8B': [
      'Unidad 1: Función de nutrición: digestión, respiración, circulación y excreción (Eje Biología)',
      'Unidad 2: Coordinación y regulación: sistema nervioso (Eje Biología)',
      'Unidad 3: Movimiento, fuerza y energía (Eje Física)',
      'Unidad 4: Estudio y organización de la materia (Eje Química)'
    ]
  },

  // ── EDUCACIÓN FÍSICA Y SALUD (3°-4° medio) ─────────────────────
  'ed-fisica': {
    '3M-4M': [
      'Unidad 1: Habilidades motrices especializadas, sus estrategias y tácticas',
      'Unidad 2: Planes de entrenamiento para la condición física',
      'Unidad 3: Programas y proyectos deportivos, recreativos y socioculturales',
      'Unidad 4: Comunidades activas'
    ],
    '3M': [
      'Unidad 1: Habilidades motrices especializadas, sus estrategias y tácticas',
      'Unidad 2: Planes de entrenamiento para la condición física',
      'Unidad 3: Programas y proyectos deportivos, recreativos y socioculturales',
      'Unidad 4: Comunidades activas'
    ],
    '4M': [
      'Unidad 1: Habilidades motrices especializadas, sus estrategias y tácticas',
      'Unidad 2: Planes de entrenamiento para la condición física',
      'Unidad 3: Programas y proyectos deportivos, recreativos y socioculturales',
      'Unidad 4: Comunidades activas'
    ]
  },

  // ── EDUCACIÓN CIUDADANA (3°-4° medio FG) ───────────────────────
  'ed-ciudadana': {
    '3M': [
      'Unidad 1: Estado, Democracia y Ciudadanía',
      'Unidad 2: Justicia y derechos humanos',
      'Unidad 3: Participación y organización territorial en democracia',
      'Unidad 4: Relaciones entre Estado y mercado'
    ],
    '4M': [
      'Unidad 1: La participación ciudadana contribuye con soluciones a los desafíos, problemas y conflictos de la sociedad',
      'Unidad 2: Medios de comunicación masivos, ciudadanía responsable y ética para una sociedad democrática',
      'Unidad 3: Principios éticos para orientar la vida en democracia',
      'Unidad 4: Modelos de desarrollo económico y derechos laborales, decisiones para construir la sociedad'
    ]
  },

  // ── HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES ────────────────────
  'historia': {
    '7B': [
      'Unidad 1: Complejización de las primeras sociedades: de la hominización al surgimiento de las primeras civilizaciones',
      'Unidad 2: Civilizaciones que confluyen en la conformación de la cultura americana y europea: el legado del mundo clásico',
      'Unidad 3: Civilizaciones que confluyen en la conformación de la cultura americana: la Edad Media y el nacimiento de la civilización europea',
      'Unidad 4: Civilizaciones que confluyen en la conformación de la cultura americana: civilizaciones precolombinas'
    ],
    '8B': [
      'Unidad 1: Los inicios de la modernidad: humanismo, Reforma y el choque de dos mundos',
      'Unidad 2: Formación de la sociedad americana y de los principales rasgos del Chile colonial',
      'Unidad 3: Nuevos principios que configuran el mundo occidental: Ilustración, revolución e independencia',
      'Unidad 4: La conformación del Estado-Nación en Chile durante el siglo XIX'
    ],
    '1M': [
      'Unidad 1: La construcción de estados naciones en Europa y América durante el siglo XIX',
      'Unidad 2: Progreso, industrialización y crisis: Europa y Chile en la segunda mitad del siglo XIX y principios del XX',
      'Unidad 3: La conformación del territorio chileno y de sus dinámicas geográficas',
      'Unidad 4: Componentes y dinámicas del sistema económico'
    ],
    '2M': [
      'Unidad 1: Crisis, totalitarismo y guerra en la primera mitad del siglo XX',
      'Unidad 2: El mundo bipolar: proyectos políticos, transformaciones económicas y conflictos sociales',
      'Unidad 3: Dictadura militar, transición política y los desafíos pendientes de la sociedad chilena',
      'Unidad 4: Formación ciudadana: Estado de derecho, sociedad democrática y derechos humanos'
    ]
  },

  // ── INGLÉS ─────────────────────────────────────────────────────
  'ingles': {
    '1M': [
      'Unidad 1: Jobs',
      'Unidad 2: Education and lifelong learning',
      'Unidad 3: The arts',
      'Unidad 4: Traditions and festivities'
    ],
    '2M': [
      'Unidad 1: Globalization and communication',
      'Unidad 2: Technology and its effects',
      'Unidad 3: Outstanding persons',
      'Unidad 4: Sustainable development'
    ],
    '3M': [
      'Unidad 1: My skills and achievements contribute to the world',
      'Unidad 2: My reflections on global issues',
      'Unidad 3: The importance of the evolution of communication',
      'Unidad 4: English as a means to understand new cultures'
    ],
    '4M': [
      'Unidad 1: The media and the message in today’s globalized world',
      'Unidad 2: Communicating ideas through science and technology',
      'Unidad 3: It’s business time',
      'Unidad 4: Learning about sustainability and contributing with solutions'
    ]
  },

  // ── LENGUAJE Y COMUNICACIÓN ────────────────────────────────────
  'lenguaje': {
    '7B': [
      'Unidad 1: El héroe en distintas épocas',
      'Unidad 2: La solidaridad y la amistad',
      'Unidad 3: Mitología y relatos de creación',
      'Unidad 4: La identidad: quién soy, cómo me ven los demás',
      'Unidad 5: El romancero y la poesía popular',
      'Unidad 6: El terror y lo extraño',
      'Unidad 7: Medios de comunicación'
    ],
    '8B': [
      'Unidad 1: Epopeya',
      'Unidad 2: Experiencias del amor',
      'Unidad 3: Relatos de misterio',
      'Unidad 4: Naturaleza',
      'Unidad 5: La comedia',
      'Unidad 6: El mundo descabellado',
      'Unidad 7: Medios de comunicación'
    ],
    '1M': [
      'Unidad 1: La libertad como tema literario',
      'Unidad 2: Ciudadanos y opinión (texto argumentativo)',
      'Unidad 3: Relaciones humanas en el teatro y la literatura',
      'Unidad 4: Comunicación y sociedad'
    ],
    '2M': [
      'Unidad 1: Sobre la ausencia: exilio, migración',
      'Unidad 2: Ciudadanía y trabajo (medios de comunicación)',
      'Unidad 3: Lo divino y lo humano (género lírico)',
      'Unidad 4: Poder y ambición (género dramático)'
    ]
  },

  // ── MÚSICA ─────────────────────────────────────────────────────
  'musica': {
    '7B': [
      'Unidad 1: Conociendo nuestra herencia musical',
      'Unidad 2: Polifonía y creaciones',
      'Unidad 3: Los sonidos expresan',
      'Unidad 4: Compartiendo experiencias'
    ],
    '8B': [
      'Unidad 1: Escuchando, cantando y tocando',
      'Unidad 2: Experimentando y construyendo',
      'Unidad 3: Expresando y mejorando',
      'Unidad 4: Compartiendo y reflexionando'
    ],
    '1M': [
      'Unidad 1: Lo que la música nos muestra',
      'Unidad 2: Lo que la música nos cuenta',
      'Unidad 3: La música nos identifica',
      'Unidad 4: Compartiendo nuestras músicas'
    ],
    '2M': [
      'Unidad 1: Música y tradición',
      'Unidad 2: Música y cultura',
      'Unidad 3: Música y otras artes',
      'Unidad 4: Compartiendo nuestras músicas'
    ]
  },

  // ── TECNOLOGÍA ─────────────────────────────────────────────────
  'tecnologia': {
    '7B': [
      'Unidad 1: Planteamiento del problema e identificación de necesidades',
      'Unidad 2: Establecimiento del diseño de la solución',
      'Unidad 3: Planificación y elaboración de la solución',
      'Unidad 4: Evaluación y funcionamiento de la solución'
    ],
    '8B': [
      'Unidad 1: Planteamiento del problema e identificación de necesidades',
      'Unidad 2: Establecimiento del diseño de la solución',
      'Unidad 3: Planificación y elaboración de la solución',
      'Unidad 4: Evolución y funcionamiento de la solución'
    ],
    '1M': [
      'Unidad 1: Desarrollo e implementación de un servicio',
      'Unidad 2: Evolución e impacto de una solución tecnológica'
    ],
    '2M': [
      'Unidad 1: Mejorando el uso de los recursos',
      'Unidad 2: Oportunidades y desafíos de la sociedad de la información'
    ]
  },

  // ── BIOLOGÍA, FÍSICA, QUÍMICA (1°-2° medio) ────────────────────
  // 1M-2M: ejes de Ciencias Naturales (DS 369/2015).
  // 3M-4M NO tienen FG separada — viven como electivos HC (ver biologia.js,
  // fisica.js, quimica.js → campo `electivos`).
  'biologia': {
    '1M': [
      'Unidad 1: Sexualidad y reproducción humana',
      'Unidad 2: Tabaco, alcohol y drogas',
      'Unidad 3: Variabilidad y herencia',
      'Unidad 4: Organismos y ambiente'
    ],
    '2M': [
      'Unidad 1: Coordinación y regulación: sistema nervioso y hormonal',
      'Unidad 2: Salud, comportamiento y enfermedades del sistema nervioso',
      'Unidad 3: Genética molecular y biotecnología',
      'Unidad 4: Evolución y biodiversidad'
    ]
  },
  'fisica': {
    '1M': [
      'Unidad 1: Sonido',
      'Unidad 2: Luz',
      'Unidad 3: Fuerza y movimiento',
      'Unidad 4: Tierra y universo'
    ],
    '2M': [
      'Unidad 1: Movimiento rectilíneo',
      'Unidad 2: Fuerza y movimiento (Leyes de Newton)',
      'Unidad 3: Energía mecánica y trabajo',
      'Unidad 4: Calor y temperatura'
    ]
  },
  'quimica': {
    '1M': [
      'Unidad 1: Modelo mecano-cuántico y configuración electrónica',
      'Unidad 2: Enlace químico y formación de moléculas',
      'Unidad 3: Estequiometría y disoluciones',
      'Unidad 4: Hidrocarburos y química del carbono'
    ],
    '2M': [
      'Unidad 1: Reactividad y equilibrio químico',
      'Unidad 2: Ácido-base y soluciones',
      'Unidad 3: Termoquímica y cinética',
      'Unidad 4: Compuestos del carbono y polímeros'
    ]
  },

  // ── CIENCIAS PARA LA CIUDADANÍA (3°-4° medio FG) ─────────────
  // Asignatura modular: 4 módulos × 2 unidades = 8 unidades electivas
  'ciencias-ciudadania': {
    '3M': [
      'Unidad 1 (Bienestar y Salud): Salud humana y medicina',
      'Unidad 2 (Bienestar y Salud): Prevención de infecciones',
      'Unidad 1 (Seguridad, Prevención y Autocuidado): Riesgos socionaturales en nuestros territorios',
      'Unidad 2 (Seguridad, Prevención y Autocuidado): Amenazas y riesgos cerca de nosotros',
      'Unidad 1 (Ambiente y Sostenibilidad): Cambio climático como desafío urgente',
      'Unidad 2 (Ambiente y Sostenibilidad): Consumo sostenible y protección ambiental',
      'Unidad 1 (Tecnología y Sociedad): Innovación tecnológica',
      'Unidad 2 (Tecnología y Sociedad): Proyectos tecnológicos'
    ],
    '4M': [
      'Unidad 1 (Bienestar y Salud): Salud humana y medicina',
      'Unidad 2 (Bienestar y Salud): Prevención de infecciones',
      'Unidad 1 (Seguridad, Prevención y Autocuidado): Riesgos socionaturales en nuestros territorios',
      'Unidad 2 (Seguridad, Prevención y Autocuidado): Amenazas y riesgos cerca de nosotros',
      'Unidad 1 (Ambiente y Sostenibilidad): Cambio climático como desafío urgente',
      'Unidad 2 (Ambiente y Sostenibilidad): Consumo sostenible y protección ambiental',
      'Unidad 1 (Tecnología y Sociedad): Innovación tecnológica',
      'Unidad 2 (Tecnología y Sociedad): Proyectos tecnológicos'
    ]
  },

  // ── FILOSOFÍA (3°-4° medio FG) ─────────────────────────────────
  'filosofia': {
    '3M': [
      'Unidad 1: ¿Qué es la filosofía?',
      'Unidad 2: ¿Qué puedo conocer? (epistemología)',
      'Unidad 3: ¿Qué es el ser humano? (antropología filosófica)',
      'Unidad 4: ¿Cómo debemos vivir? (ética)'
    ],
    '4M': [
      'Unidad 1: Filosofía política y formas de organización social',
      'Unidad 2: Justicia, libertad e igualdad',
      'Unidad 3: Estética y experiencia del arte',
      'Unidad 4: Reflexión filosófica sobre problemas contemporáneos'
    ]
  },

  // ── MATEMÁTICA (1°-2° medio) — Programa de Estudio Mineduc ─────
  // Para básica no hay división por unidades titulada en el PDF — se
  // mantienen los ejes existentes en plan-comun/matematica.js.
  'matematica': {
    '1M': [
      'Unidad 1: Números racionales',
      'Unidad 2: Álgebra y funciones (función lineal y afín)',
      'Unidad 3: Geometría (vectores y transformaciones isométricas)',
      'Unidad 4: Probabilidad y estadística'
    ],
    '2M': [
      'Unidad 1: Números reales y operaciones',
      'Unidad 2: Álgebra y funciones (cuadrática, sistemas, raíces)',
      'Unidad 3: Geometría (semejanza y trigonometría)',
      'Unidad 4: Probabilidad y estadística (variable aleatoria)'
    ],
    '3M': [
      'Unidad 1: Números (potencias y logaritmos)',
      'Unidad 2: Álgebra y funciones (modelos exponenciales/logarítmicos)',
      'Unidad 3: Geometría (cónicas y vectores 3D)',
      'Unidad 4: Probabilidad y estadística (regresión lineal)'
    ],
    '4M': [
      'Unidad 1: Números y proporcionalidad',
      'Unidad 2: Cálculo (límites, derivadas e integrales)',
      'Unidad 3: Geometría analítica',
      'Unidad 4: Probabilidad y estadística inferencial'
    ]
  }
};

// ── Helper: lookup ----------------------------------------------------
window.getUnidadesProgramaEstudio = function (asigKey, nivel) {
  try {
    var d = window.UNIDADES_PROGRAMAS_ESTUDIO || {};
    if (d[asigKey] && d[asigKey][nivel]) return d[asigKey][nivel].slice();
  } catch (e) {}
  return null;
};

// ── Helper: aplicar override sobre CURRICULA_PLAN_COMUN ---------------
//   Se llama al cargar la página: reemplaza el campo `unidades` de cada
//   asignatura por las unidades oficiales cuando estén disponibles.
window.aplicarUnidadesOficiales = function () {
  var pc = window.CURRICULA_PLAN_COMUN;
  if (!pc) return;
  var data = window.UNIDADES_PROGRAMAS_ESTUDIO || {};
  Object.keys(data).forEach(function (asig) {
    if (!pc[asig]) return;
    pc[asig].unidades = pc[asig].unidades || {};
    Object.keys(data[asig]).forEach(function (nivel) {
      pc[asig].unidades[nivel] = data[asig][nivel].slice();
    });
  });
};

// Auto-aplicar si CURRICULA_PLAN_COMUN ya está cargado
if (typeof window !== 'undefined') {
  if (window.CURRICULA_PLAN_COMUN) {
    window.aplicarUnidadesOficiales();
  } else {
    // Esperar a que el index lo cargue
    document.addEventListener('DOMContentLoaded', function () {
      window.aplicarUnidadesOficiales();
    });
  }
}
