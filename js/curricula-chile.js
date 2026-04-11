/**
 * curricula-chile.js
 * ElectroLearn — Currículum Chileno Completo
 *
 * Estructura:
 *  CURRICULA_CHILE = {
 *    basica:       { 1B-8B: { asignaturas: [...] } },
 *    planComun:    { 1M-4M: { asignaturas: [...] } },
 *    especialidades: { [key]: { nombre, sector, modulos: [...] } }
 *  }
 *
 * Cada asignatura tiene: nombre, sigla, niveles[], unidades[]
 * Cada especialidad tiene: nombre, sector, modulos[]
 * Cada módulo tiene: num, nombre, sigla, aes[]
 * Cada AE tiene: num, nombre, criterios[]
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
          '1B': ['Lectura emergente','Escritura inicial','Comunicación oral'],
          '2B': ['Comprensión lectora básica','Escritura de textos','Vocabulario'],
          '3B': ['Comprensión de textos','Producción escrita','Gramática básica'],
          '4B': ['Textos literarios','Textos no literarios','Producción de textos'],
          '5B': ['Comprensión lectora avanzada','Escritura informativa','Comunicación efectiva'],
          '6B': ['Análisis literario','Ensayo básico','Medios de comunicación'],
          '7B': ['Literatura chilena e iberoamericana','Argumentación escrita','Discurso oral'],
          '8B': ['Literatura universal','Producción avanzada','Medios digitales']
        }
      },
      {
        nombre: 'Matemática',
        sigla:  'MAT',
        color:  '#10b981',
        niveles: ['1B','2B','3B','4B','5B','6B','7B','8B'],
        unidades: {
          '1B': ['Números del 0 al 100','Suma y resta básica','Geometría inicial'],
          '2B': ['Números hasta 1000','Multiplicación','Figuras y cuerpos'],
          '3B': ['Números hasta 10.000','División','Fracciones básicas'],
          '4B': ['Números hasta 100.000','Operaciones combinadas','Medidas'],
          '5B': ['Fracciones y decimales','Porcentajes','Geometría plana'],
          '6B': ['Números enteros','Razones y proporciones','Estadística básica'],
          '7B': ['Álgebra básica','Ecuaciones de 1° grado','Geometría del plano'],
          '8B': ['Álgebra avanzada','Funciones básicas','Probabilidad']
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
          '7B': ['Entrenamiento básico','Deportes acuáticos/terrestres','Proyecto de vida activa'],
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
        niveles: ['5B','6B','7B','8B'],
        unidades: {
          '5B': ['Hello!: Greetings','My Family and Friends','My Daily Routine'],
          '6B': ['My World','Food and Health','Free Time Activities'],
          '7B': ['My Community','Travel and Adventure','Technology in my Life'],
          '8B': ['Changes in our World','Global Issues','Future Perspectives']
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
          '1B': ['Yo y los demás','Emociones','Convivencia escolar'],
          '2B': ['Identidad personal','Habilidades sociales','Valores'],
          '3B': ['Autoconocimiento','Resolución de conflictos','Ciudadanía'],
          '4B': ['Proyecto de vida básico','Habilidades para el aprendizaje','Participación'],
          '5B': ['Adolescencia','Toma de decisiones','Salud mental básica'],
          '6B': ['Orientación vocacional inicial','Habilidades del siglo XXI','Prevención'],
          '7B': ['Identidad y proyecto de vida','Orientación vocacional','Comunidad'],
          '8B': ['Transición a educación media','Opciones de futuro','Vida y ciudadanía']
        }
      }
    ]
  };

  // ════════════════════════════════════════════════════════════
  //  PLAN COMÚN — Educación Media (1° a 4° Medio)
  //  Científico-Humanista y afines
  // ════════════════════════════════════════════════════════════
  var planComun = {
    asignaturas: [
      {
        nombre: 'Lengua y Literatura',
        sigla:  'LEN',
        color:  '#3b82f6',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Narrativa chilena contemporánea','Textos argumentativos','Oralidad y debate'],
          '2M': ['Literatura latinoamericana','Ensayo y crítica','Medios y comunicación'],
          '3M': ['Literatura universal clásica','Escritura académica','Lenguaje y poder'],
          '4M': ['Literatura siglo XX-XXI','Proyecto escritura','Cultura digital']
        }
      },
      {
        nombre: 'Matemática',
        sigla:  'MAT',
        color:  '#10b981',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Números reales','Álgebra y funciones','Geometría métrica','Estadística descriptiva'],
          '2M': ['Funciones cuadráticas','Trigonometría','Geometría analítica','Probabilidad'],
          '3M': ['Funciones exponenciales y logarítmicas','Cálculo diferencial básico','Geometría del espacio','Estadística inferencial básica'],
          '4M': ['Funciones y modelos matemáticos','Cálculo integral básico','Matrices','Probabilidad avanzada']
        }
      },
      {
        nombre: 'Historia, Geografía y CS',
        sigla:  'HCS',
        color:  '#8b5cf6',
        niveles: ['1M','2M','3M','4M'],
        unidades: {
          '1M': ['Civilizaciones antiguas','Medioevo y mundo moderno','Chile colonial','Espacio y sociedad'],
          '2M': ['Revoluciones e independencias','Chile siglo XIX','Imperialismo','Geografía política'],
          '3M': ['Chile y el mundo en el siglo XX','Totalitarismos','Guerra Fría','Geografía económica'],
          '4M': ['Chile democrático','Globalización','DDHH y ciudadanía global','Desafíos del siglo XXI']
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
          '4M': ['Electromagnetismo','Relatividad especial','Física cuántica básica','Astrofísica']
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
          '4M': ['Química ambiental','Bioquímica básica','Polímeros y materiales','Industria química']
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
          '1M': ['Identidad y autoconocimiento','Proyecto de vida','Habilidades socioemocionales'],
          '2M': ['Orientación vocacional','Mundo del trabajo','Salud mental adolescente'],
          '3M': ['Decisiones de futuro','Ciudadanía activa','Bienestar y resiliencia'],
          '4M': ['Proyecto de vida adulta','Transición a educación superior','Ciudadanía y democracia']
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
        nombre: 'Tecnología e Informática',
        sigla:  'TEC',
        color:  '#64748b',
        niveles: ['1M','2M'],
        unidades: {
          '1M': ['Pensamiento computacional','Programación básica (Python/Scratch)','Tecnología y sociedad'],
          '2M': ['Desarrollo de proyectos digitales','Ciberseguridad básica','Emprendimiento tecnológico']
        }
      }
    ]
  };

  // ════════════════════════════════════════════════════════════
  //  ESPECIALIDADES TÉCNICO-PROFESIONALES (EMTP)
  //  Todos los sectores y especialidades chilenas
  // ════════════════════════════════════════════════════════════

  // ── Sector: Electricidad ────────────────────────────────────
  var electricidad = {
    nombre: 'Electricidad',
    sigla:  'ELEC',
    sector: 'Electricidad',
    color:  '#f59e0b',
    especialidades: [
      {
        nombre: 'Electricidad',
        sigla:  'EL',
        modulos: [
          { num:'EL1',  nombre:'Seguridad en instalaciones eléctricas', aes:[
            {num:1, nombre:'Riesgos eléctricos y normativa NSEG5'},
            {num:2, nombre:'EPP y procedimientos de trabajo seguro'},
            {num:3, nombre:'Primeros auxilios en accidentes eléctricos'}
          ]},
          { num:'EL2',  nombre:'Fundamentos eléctricos',                aes:[
            {num:1, nombre:'Magnitudes eléctricas y unidades SI'},
            {num:2, nombre:'Ley de Ohm y circuitos DC básicos'},
            {num:3, nombre:'Potencia y energía eléctrica'}
          ]},
          { num:'EL3',  nombre:'Instalaciones eléctricas domiciliarias',aes:[
            {num:1, nombre:'Normativa SEC e instalaciones residenciales'},
            {num:2, nombre:'Tableros eléctricos y protecciones'},
            {num:3, nombre:'Montaje de instalaciones interiores'}
          ]},
          { num:'EL4',  nombre:'Motores y máquinas eléctricas',         aes:[
            {num:1, nombre:'Motor de inducción trifásico'},
            {num:2, nombre:'Arranque directo y estrella-triángulo'},
            {num:3, nombre:'Variadores de frecuencia básicos'}
          ]},
          { num:'EL5',  nombre:'Instalaciones industriales',            aes:[
            {num:1, nombre:'Tableros de distribución industrial'},
            {num:2, nombre:'Circuitos de fuerza y mando'},
            {num:3, nombre:'Instalaciones de baja tensión industrial'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Electrónica ─────────────────────────────────────
  var electronica = {
    nombre: 'Electrónica',
    sigla:  'EN',
    sector: 'Electricidad',
    color:  '#6366f1',
    especialidades: [
      {
        nombre: 'Electrónica',
        sigla:  'EN',
        modulos: [
          { num:'EN1',  nombre:'Introducción a la Electrónica',         aes:[
            {num:1, nombre:'Magnitudes y unidades eléctricas'},
            {num:2, nombre:'Componentes pasivos (R, L, C)'},
            {num:3, nombre:'Instrumentos de medición'}
          ]},
          { num:'EN2',  nombre:'Circuitos en Corriente Continua',       aes:[
            {num:1, nombre:'Ley de Ohm y Kirchhoff'},
            {num:2, nombre:'Circuitos serie, paralelo y mixto'},
            {num:3, nombre:'Potencia y energía en CC'}
          ]},
          { num:'EN3',  nombre:'Circuitos en Corriente Alterna',        aes:[
            {num:1, nombre:'Señales alternas sinusoidales'},
            {num:2, nombre:'Circuitos RLC en CA'},
            {num:3, nombre:'Potencia activa, reactiva y aparente'}
          ]},
          { num:'EN4',  nombre:'Electrónica Analógica',                 aes:[
            {num:1, nombre:'Diodos y rectificadores'},
            {num:2, nombre:'Transistor BJT'},
            {num:3, nombre:'Amplificadores operacionales'}
          ]},
          { num:'EN5',  nombre:'Electrónica Digital',                   aes:[
            {num:1, nombre:'Sistemas numéricos y álgebra de Boole'},
            {num:2, nombre:'Compuertas y circuitos combinacionales'},
            {num:3, nombre:'Circuitos secuenciales y flip-flops'}
          ]},
          { num:'EN6',  nombre:'Microcontroladores',                    aes:[
            {num:1, nombre:'Arquitectura de microcontroladores'},
            {num:2, nombre:'Programación en C para Arduino'},
            {num:3, nombre:'Interfaz con periféricos (sensores, actuadores)'}
          ]},
          { num:'EN7',  nombre:'Automatización y Control',              aes:[
            {num:1, nombre:'Sistemas de control en lazo abierto y cerrado'},
            {num:2, nombre:'PLC: programación básica (Ladder)'},
            {num:3, nombre:'Sensores industriales y actuadores'}
          ]},
          { num:'EN8',  nombre:'Telecomunicaciones',                    aes:[
            {num:1, nombre:'Fundamentos de comunicaciones'},
            {num:2, nombre:'Señales y modulación'},
            {num:3, nombre:'Redes de comunicación básica'}
          ]},
          { num:'EN9',  nombre:'Electrónica de Potencia',               aes:[
            {num:1, nombre:'Fuentes de alimentación reguladas'},
            {num:2, nombre:'Tiristores y TRIAC'},
            {num:3, nombre:'Convertidores DC-DC básicos'}
          ]},
          { num:'EN11', nombre:'Proyecto de Electrónica',               aes:[
            {num:1, nombre:'Metodología de proyectos'},
            {num:2, nombre:'Diseño y simulación del proyecto'},
            {num:3, nombre:'Construcción y presentación'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Telecomunicaciones ──────────────────────────────
  var telecomunicaciones = {
    nombre: 'Telecomunicaciones',
    sigla:  'TC',
    sector: 'Electricidad',
    color:  '#0ea5e9',
    especialidades: [
      {
        nombre: 'Telecomunicaciones',
        sigla:  'TC',
        modulos: [
          { num:'TC1', nombre:'Fundamentos de Telecomunicaciones', aes:[
            {num:1, nombre:'Espectro electromagnético y frecuencias'},
            {num:2, nombre:'Modulación analógica AM/FM'},
            {num:3, nombre:'Modulación digital'}
          ]},
          { num:'TC2', nombre:'Redes y Comunicaciones', aes:[
            {num:1, nombre:'Modelo OSI y TCP/IP'},
            {num:2, nombre:'Redes LAN/WAN'},
            {num:3, nombre:'Configuración de equipos de red'}
          ]},
          { num:'TC3', nombre:'Sistemas de Radiocomunicaciones', aes:[
            {num:1, nombre:'Antenas y propagación'},
            {num:2, nombre:'Sistemas de radio enlace'},
            {num:3, nombre:'Telefonía móvil básica'}
          ]},
          { num:'TC4', nombre:'Instalaciones de Telecomunicaciones', aes:[
            {num:1, nombre:'Cableado estructurado'},
            {num:2, nombre:'Sistemas de CCTV y seguridad'},
            {num:3, nombre:'IPTV y sistemas multimedia'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Mecánica Industrial ─────────────────────────────
  var mecanicaIndustrial = {
    nombre: 'Mecánica Industrial',
    sigla:  'MI',
    sector: 'Metalmecánica',
    color:  '#64748b',
    especialidades: [
      {
        nombre: 'Mecánica Industrial',
        sigla:  'MI',
        modulos: [
          { num:'MI1', nombre:'Seguridad Industrial', aes:[
            {num:1, nombre:'Normativa de seguridad y salud ocupacional'},
            {num:2, nombre:'EPP y señalética industrial'},
            {num:3, nombre:'Riesgos físicos y mecánicos'}
          ]},
          { num:'MI2', nombre:'Metrología y Dibujo Técnico', aes:[
            {num:1, nombre:'Instrumentos de medición (Vernier, micrómetro)'},
            {num:2, nombre:'Tolerancias y ajustes'},
            {num:3, nombre:'Lectura e interpretación de planos'}
          ]},
          { num:'MI3', nombre:'Mecánica de Máquinas', aes:[
            {num:1, nombre:'Transmisiones de potencia (correas, cadenas, engranajes)'},
            {num:2, nombre:'Rodamientos y lubricación'},
            {num:3, nombre:'Mantenimiento mecánico preventivo'}
          ]},
          { num:'MI4', nombre:'Neumática e Hidráulica', aes:[
            {num:1, nombre:'Fundamentos neumáticos'},
            {num:2, nombre:'Circuitos neumáticos básicos'},
            {num:3, nombre:'Hidráulica industrial básica'}
          ]},
          { num:'MI5', nombre:'Soldadura y Procesos', aes:[
            {num:1, nombre:'Soldadura SMAW (electrodo revestido)'},
            {num:2, nombre:'Soldadura MIG/MAG'},
            {num:3, nombre:'Oxicorte y esmerilado'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Mecánica Automotriz ─────────────────────────────
  var mecanicaAutomotriz = {
    nombre: 'Mecánica Automotriz',
    sigla:  'MA',
    sector: 'Metalmecánica',
    color:  '#dc2626',
    especialidades: [
      {
        nombre: 'Mecánica Automotriz',
        sigla:  'MA',
        modulos: [
          { num:'MA1', nombre:'Fundamentos Automotrices', aes:[
            {num:1, nombre:'Tipos de vehículos y sistemas'},
            {num:2, nombre:'Herramientas y equipos automotrices'},
            {num:3, nombre:'Seguridad en el taller'}
          ]},
          { num:'MA2', nombre:'Motor de Combustión Interna', aes:[
            {num:1, nombre:'Ciclos termodinámicos Otto y Diesel'},
            {num:2, nombre:'Sistemas del motor (distribución, lubricación, enfriamiento)'},
            {num:3, nombre:'Diagnóstico y reparación de motor'}
          ]},
          { num:'MA3', nombre:'Sistemas de Transmisión', aes:[
            {num:1, nombre:'Embrague y caja de cambios'},
            {num:2, nombre:'Diferencial y árbol de transmisión'},
            {num:3, nombre:'Transmisión automática básica'}
          ]},
          { num:'MA4', nombre:'Sistemas Eléctricos del Vehículo', aes:[
            {num:1, nombre:'Circuitos eléctricos automotrices'},
            {num:2, nombre:'Sistema de carga y arranque'},
            {num:3, nombre:'Diagnosis electrónica (OBD-II)'}
          ]},
          { num:'MA5', nombre:'Sistemas de Frenos y Suspensión', aes:[
            {num:1, nombre:'Frenos hidráulicos de disco y tambor'},
            {num:2, nombre:'Sistema ABS básico'},
            {num:3, nombre:'Suspensión y dirección'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Construcción ────────────────────────────────────
  var construccion = {
    nombre: 'Construcción',
    sigla:  'CO',
    sector: 'Construcción',
    color:  '#92400e',
    especialidades: [
      {
        nombre: 'Construcción',
        sigla:  'CO',
        modulos: [
          { num:'CO1', nombre:'Dibujo Arquitectónico', aes:[
            {num:1, nombre:'Normas y simbología de planos'},
            {num:2, nombre:'AutoCAD básico'},
            {num:3, nombre:'Lectura de planos de construcción'}
          ]},
          { num:'CO2', nombre:'Materiales de Construcción', aes:[
            {num:1, nombre:'Cemento, hormigón y mortero'},
            {num:2, nombre:'Maderas y estructuras de madera'},
            {num:3, nombre:'Cerámicos, vidrios y aislantes'}
          ]},
          { num:'CO3', nombre:'Albañilería', aes:[
            {num:1, nombre:'Fundaciones y cimientos'},
            {num:2, nombre:'Muros y tabiques'},
            {num:3, nombre:'Terminaciones y revestimientos'}
          ]},
          { num:'CO4', nombre:'Instalaciones Sanitarias', aes:[
            {num:1, nombre:'Red de agua potable domiciliaria'},
            {num:2, nombre:'Red de alcantarillado'},
            {num:3, nombre:'Gas domiciliario básico'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Informática ─────────────────────────────────────
  var informatica = {
    nombre: 'Informática',
    sigla:  'INF',
    sector: 'Informática',
    color:  '#7c3aed',
    especialidades: [
      {
        nombre: 'Informática',
        sigla:  'INF',
        modulos: [
          { num:'INF1', nombre:'Fundamentos de Informática', aes:[
            {num:1, nombre:'Hardware y arquitectura de computadores'},
            {num:2, nombre:'Sistemas operativos (Windows/Linux)'},
            {num:3, nombre:'Ofimática avanzada'}
          ]},
          { num:'INF2', nombre:'Redes Informáticas', aes:[
            {num:1, nombre:'Modelo OSI y protocolos TCP/IP'},
            {num:2, nombre:'Instalación y configuración de redes LAN'},
            {num:3, nombre:'Seguridad en redes básica'}
          ]},
          { num:'INF3', nombre:'Programación', aes:[
            {num:1, nombre:'Algoritmos y pseudocódigo'},
            {num:2, nombre:'Programación en Python'},
            {num:3, nombre:'Bases de datos SQL básicas'}
          ]},
          { num:'INF4', nombre:'Soporte Técnico', aes:[
            {num:1, nombre:'Diagnóstico y reparación de hardware'},
            {num:2, nombre:'Instalación y configuración de software'},
            {num:3, nombre:'Atención al usuario técnico'}
          ]},
          { num:'INF5', nombre:'Desarrollo Web', aes:[
            {num:1, nombre:'HTML5 y CSS3'},
            {num:2, nombre:'JavaScript básico'},
            {num:3, nombre:'Publicación y hosting web'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Administración y Comercio ───────────────────────
  var administracion = {
    nombre: 'Administración y Comercio',
    sigla:  'AC',
    sector: 'Administración',
    color:  '#0891b2',
    especialidades: [
      {
        nombre: 'Administración',
        sigla:  'ADM',
        modulos: [
          { num:'ADM1', nombre:'Fundamentos de Administración', aes:[
            {num:1, nombre:'Teorías administrativas'},
            {num:2, nombre:'Proceso administrativo'},
            {num:3, nombre:'Organizaciones y su entorno'}
          ]},
          { num:'ADM2', nombre:'Contabilidad Básica', aes:[
            {num:1, nombre:'Principios contables'},
            {num:2, nombre:'Documentos mercantiles'},
            {num:3, nombre:'Balance y estados financieros básicos'}
          ]},
          { num:'ADM3', nombre:'Recursos Humanos', aes:[
            {num:1, nombre:'Legislación laboral chilena'},
            {num:2, nombre:'Liquidación de sueldos'},
            {num:3, nombre:'Gestión de personas básica'}
          ]}
        ]
      },
      {
        nombre: 'Contabilidad',
        sigla:  'CON',
        modulos: [
          { num:'CON1', nombre:'Contabilidad General', aes:[
            {num:1, nombre:'Partida doble y plan de cuentas'},
            {num:2, nombre:'Libro diario y mayor'},
            {num:3, nombre:'Balance de comprobación'}
          ]},
          { num:'CON2', nombre:'Contabilidad de Costos', aes:[
            {num:1, nombre:'Clasificación de costos'},
            {num:2, nombre:'Sistemas de costeo'},
            {num:3, nombre:'Análisis costo-volumen-utilidad'}
          ]},
          { num:'CON3', nombre:'Tributación', aes:[
            {num:1, nombre:'Sistema tributario chileno'},
            {num:2, nombre:'IVA y formularios SII'},
            {num:3, nombre:'Renta de empresas y personas'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Gastronomía ─────────────────────────────────────
  var gastronomia = {
    nombre: 'Gastronomía',
    sigla:  'GAS',
    sector: 'Gastronomía',
    color:  '#f97316',
    especialidades: [
      {
        nombre: 'Gastronomía',
        sigla:  'GAS',
        modulos: [
          { num:'GAS1', nombre:'Fundamentos de Gastronomía', aes:[
            {num:1, nombre:'Historia de la gastronomía'},
            {num:2, nombre:'Higiene y manipulación de alimentos'},
            {num:3, nombre:'Mise en place y organización de cocina'}
          ]},
          { num:'GAS2', nombre:'Técnicas Culinarias Básicas', aes:[
            {num:1, nombre:'Cortes y preparaciones básicas'},
            {num:2, nombre:'Técnicas de cocción'},
            {num:3, nombre:'Fondos, salsas y aderezos'}
          ]},
          { num:'GAS3', nombre:'Cocina Chilena e Internacional', aes:[
            {num:1, nombre:'Gastronomía típica chilena'},
            {num:2, nombre:'Cocina latinoamericana'},
            {num:3, nombre:'Cocina internacional básica'}
          ]},
          { num:'GAS4', nombre:'Pastelería y Panadería', aes:[
            {num:1, nombre:'Masas y pastas básicas'},
            {num:2, nombre:'Técnicas de pastelería'},
            {num:3, nombre:'Decoración y presentación'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Salud ───────────────────────────────────────────
  var salud = {
    nombre: 'Salud',
    sigla:  'SAL',
    sector: 'Salud',
    color:  '#ec4899',
    especialidades: [
      {
        nombre: 'Atención de Adulto Mayor',
        sigla:  'AAM',
        modulos: [
          { num:'AAM1', nombre:'Gerontología y Geriatría Básica', aes:[
            {num:1, nombre:'Proceso de envejecimiento'},
            {num:2, nombre:'Patologías frecuentes del adulto mayor'},
            {num:3, nombre:'Cuidados básicos de enfermería'}
          ]},
          { num:'AAM2', nombre:'Cuidados Integrales', aes:[
            {num:1, nombre:'Higiene y confort del paciente'},
            {num:2, nombre:'Alimentación y nutrición en adulto mayor'},
            {num:3, nombre:'Actividades terapéuticas'}
          ]}
        ]
      },
      {
        nombre: 'Auxiliar de Enfermería',
        sigla:  'AE',
        modulos: [
          { num:'AE1', nombre:'Fundamentos de Enfermería', aes:[
            {num:1, nombre:'Historia de la enfermería y ética'},
            {num:2, nombre:'Anatomía y fisiología básica'},
            {num:3, nombre:'Signos vitales y medidas antropométricas'}
          ]},
          { num:'AE2', nombre:'Procedimientos de Enfermería', aes:[
            {num:1, nombre:'Administración de medicamentos'},
            {num:2, nombre:'Vendajes y curaciones'},
            {num:3, nombre:'Técnicas de primeros auxilios'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Turismo ─────────────────────────────────────────
  var turismo = {
    nombre: 'Turismo',
    sigla:  'TUR',
    sector: 'Turismo',
    color:  '#06b6d4',
    especialidades: [
      {
        nombre: 'Turismo',
        sigla:  'TUR',
        modulos: [
          { num:'TUR1', nombre:'Fundamentos del Turismo', aes:[
            {num:1, nombre:'Historia y tipos de turismo'},
            {num:2, nombre:'Geografía turística de Chile'},
            {num:3, nombre:'Industria turística y actores'}
          ]},
          { num:'TUR2', nombre:'Servicios Hoteleros', aes:[
            {num:1, nombre:'Organización hotelera'},
            {num:2, nombre:'Front office y atención al cliente'},
            {num:3, nombre:'Housekeeping básico'}
          ]},
          { num:'TUR3', nombre:'Guía de Turismo', aes:[
            {num:1, nombre:'Patrimonio natural y cultural de Chile'},
            {num:2, nombre:'Técnicas de guiado'},
            {num:3, nombre:'Turismo sustentable'}
          ]}
        ]
      }
    ]
  };

  // ── Sector: Agronomía ───────────────────────────────────────
  var agronomia = {
    nombre: 'Agronomía',
    sigla:  'AGR',
    sector: 'Agropecuario',
    color:  '#84cc16',
    especialidades: [
      {
        nombre: 'Agropecuario',
        sigla:  'AGP',
        modulos: [
          { num:'AGP1', nombre:'Fundamentos Agropecuarios', aes:[
            {num:1, nombre:'Suelo y edafología básica'},
            {num:2, nombre:'Climatología agrícola'},
            {num:3, nombre:'Plantas y su clasificación'}
          ]},
          { num:'AGP2', nombre:'Producción Vegetal', aes:[
            {num:1, nombre:'Horticultura básica'},
            {num:2, nombre:'Fruticultura'},
            {num:3, nombre:'Riego y fertilización'}
          ]},
          { num:'AGP3', nombre:'Producción Animal', aes:[
            {num:1, nombre:'Ganadería bovina y ovina'},
            {num:2, nombre:'Avicultura'},
            {num:3, nombre:'Sanidad animal básica'}
          ]}
        ]
      }
    ]
  };

  // ════════════════════════════════════════════════════════════
  //  ÍNDICE COMPLETO DE ESPECIALIDADES
  // ════════════════════════════════════════════════════════════
  var especialidades = {
    'Electricidad':         electricidad,
    'Electronica':          electronica,
    'Telecomunicaciones':   telecomunicaciones,
    'MecanicaIndustrial':   mecanicaIndustrial,
    'MecanicaAutomotriz':   mecanicaAutomotriz,
    'Construccion':         construccion,
    'Informatica':          informatica,
    'Administracion':       administracion,
    'Gastronomia':          gastronomia,
    'Salud':                salud,
    'Turismo':              turismo,
    'Agronomia':            agronomia
  };

  // ════════════════════════════════════════════════════════════
  //  FUNCIONES DE UTILIDAD
  // ════════════════════════════════════════════════════════════

  /** Obtener lista de todas las asignaturas según tipo y nivel */
  function getAsignaturas(tipo, nivel) {
    if (tipo === 'basica') {
      return basica.asignaturas.filter(function(a) {
        return !nivel || a.niveles.indexOf(nivel) !== -1;
      });
    }
    if (tipo === 'planComun' || tipo === 'media') {
      return planComun.asignaturas.filter(function(a) {
        return !nivel || a.niveles.indexOf(nivel) !== -1;
      });
    }
    return [];
  }

  /** Obtener lista de todas las especialidades */
  function getEspecialidades() {
    return Object.keys(especialidades).map(function(key) {
      var esp = especialidades[key];
      return {
        key:    key,
        nombre: esp.nombre,
        sector: esp.sector,
        color:  esp.color,
        sigla:  esp.sigla
      };
    });
  }

  /** Obtener módulos de una especialidad */
  function getModulos(especialidadKey, subEspecialidad) {
    var esp = especialidades[especialidadKey];
    if (!esp) return [];
    var target = esp;
    if (esp.especialidades) {
      if (subEspecialidad) {
        var found = esp.especialidades.filter(function(e) { return e.sigla === subEspecialidad; })[0];
        target = found || esp.especialidades[0];
      } else {
        target = esp.especialidades[0];
      }
    }
    return target ? (target.modulos || []) : [];
  }

  /** Obtener AEs de un módulo */
  function getAEs(especialidadKey, moduloNum) {
    var modulos = getModulos(especialidadKey);
    var modulo = modulos.filter(function(m) { return m.num === moduloNum; })[0];
    return modulo ? modulo.aes : [];
  }

  /** Obtener niveles según tipo */
  function getNiveles(tipo) {
    if (tipo === 'basica') return ['1B','2B','3B','4B','5B','6B','7B','8B'];
    if (tipo === 'planComun' || tipo === 'media') return ['1M','2M','3M','4M'];
    if (tipo === 'tecnico') return ['3M','4M'];
    return [];
  }

  /** Buscar en todo el currículo */
  function buscar(termino) {
    var resultados = [];
    var t = termino.toLowerCase();

    // Buscar en asignaturas básica
    basica.asignaturas.forEach(function(a) {
      if (a.nombre.toLowerCase().indexOf(t) !== -1) {
        resultados.push({ tipo: 'asignatura', nivel: 'Básica', nombre: a.nombre, sigla: a.sigla });
      }
    });

    // Buscar en plan común
    planComun.asignaturas.forEach(function(a) {
      if (a.nombre.toLowerCase().indexOf(t) !== -1) {
        resultados.push({ tipo: 'asignatura', nivel: 'Media', nombre: a.nombre, sigla: a.sigla });
      }
    });

    // Buscar en especialidades
    Object.keys(especialidades).forEach(function(key) {
      var esp = especialidades[key];
      if (esp.nombre.toLowerCase().indexOf(t) !== -1) {
        resultados.push({ tipo: 'especialidad', nombre: esp.nombre, sector: esp.sector });
      }
      var mods = getModulos(key);
      mods.forEach(function(m) {
        if (m.nombre.toLowerCase().indexOf(t) !== -1) {
          resultados.push({ tipo: 'modulo', especialidad: esp.nombre, nombre: m.nombre, num: m.num });
        }
      });
    });

    return resultados;
  }

  return {
    basica:          basica,
    planComun:       planComun,
    especialidades:  especialidades,
    getAsignaturas:  getAsignaturas,
    getEspecialidades: getEspecialidades,
    getModulos:      getModulos,
    getAEs:          getAEs,
    getNiveles:      getNiveles,
    buscar:          buscar
  };
})();
