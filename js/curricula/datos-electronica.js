// =============================================
// DATOS CURRICULARES — Especialidad ELECTRÓNICA
// Archivo: js/curricula/datos-electronica.js
//
// Formato: CURRICULA_FULL['electronica']
//   .modulos  → módulos EN1–EN11 con OAs, AEs y CEs completos
//   .oag      → Objetivos de Aprendizaje Genéricos
//
// Datos extraídos de PDFs oficiales Mineduc (Programas de Estudio EMTP)
// Módulos EN1–EN9 y EN11
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['electronica'] = {

  // ── Módulos con datos completos (OA → AE → CE) ─────────────
  modulos: {

  // ══════════════════════════════════════════════════════
  // 3° MEDIO
  // ══════════════════════════════════════════════════════

  'EN1': {
    num: 'EN1',
    nombre: 'Proyectos Electrónicos',
    nivel: '3M',
    horas: 190,
    oas: {
      'OA1': 'Leer y utilizar información técnica consignada en manuales, planos, croquis, instrucciones y proyectos de instalación electrónicos, relevando los datos necesarios para desarrollar correctamente su trabajo.',
      'OA4': 'Instalar y montar equipos y sistemas electrónicos industriales y otros, de acuerdo al diseño y características técnicas del proyecto, utilizando las herramientas e instrumentos adecuados, respetando la normativa eléctrica, ambiental y de seguridad.'
    },
    aes: {
      'OA1': {
        texto: 'Realiza análisis técnico para la instalación de equipos electrónicos según manual de uso y especificaciones técnicas, respetando normas de seguridad y tiempos establecidos.',
        ces: {
          '1.1': { texto: 'Contrasta información técnica, verificando valores nominales de las magnitudes para instalación del equipo, utilizando instrumentos de medición.', oag: ['A'] },
          '1.2': { texto: 'Genera procedimiento de instalación de equipos de acuerdo a especificaciones y características técnicas, considerando normas seguridad.', oag: ['K'] },
          '1.3': { texto: 'Documenta los valores experimentales, para las pruebas de funcionamiento en equipos electrónicos, leyes y normativas.', oag: ['A'] },
          '1.4': { texto: 'Predice el comportamiento de equipos electrónicos, mediante la aplicación y análisis de teoremas, leyes de electricidad y electrónica, según manuales de uso y especificaciones técnicas.', oag: ['B'] }
        }
      },
      'OA2': {
        texto: 'Instala equipos electrónicos, según requerimientos del usuario, e instrucciones consignadas en manuales.',
        ces: {
          '2.1': { texto: 'Prepara las condiciones necesarias para efectuar la instalación de equipos electrónicos, tales como selección de herramientas, interpretación de planos, y distribución de los tiempos.', oag: ['B'] },
          '2.2': { texto: 'Monta los equipos electrónicos y dispositivos asociados, de acuerdo al manual, siguiendo las instrucciones del proyecto, cumpliendo con los plazos establecidos.', oag: ['B'] },
          '2.3': { texto: 'Comprueba el funcionamiento de la instalación, midiendo parámetros en los puntos más relevantes, previendo situaciones de riesgo y enfermedades laborales.', oag: ['K'] },
          '2.4': { texto: 'Hace uso de las herramientas y elementos de seguridad requerida para el tipo de instalación, considerando las condiciones técnicas y de espacio.', oag: ['C'] }
        }
      },
      'OA3': {
        texto: 'Mantiene equipos electrónicos conforme al tipo de sistema, considerando procedimientos establecidos y especificaciones técnicas del fabricante.',
        ces: {
          '3.1': { texto: 'Elabora un plan de mantenimiento, según uso e instrucciones consignadas en manuales.', oag: ['D'] },
          '3.2': { texto: 'Realiza tareas de mantenimiento en equipos electrónicos considerando zonas de instalación, materiales y herramientas requeridas, respetando los tiempos asignados.', oag: ['B'] },
          '3.3': { texto: 'Chequea operaciones de mantención en equipos electrónicos, realizando mediciones de parámetros y pruebas de funcionamiento, de acuerdo a procedimientos establecidos.', oag: ['B'] },
          '3.4': { texto: 'Elabora informes técnicos referidos a la mantención de equipos electrónicos, comunicando en forma clara y precisa los trabajos realizados.', oag: ['A'] }
        }
      },
      'OA4': {
        texto: 'Analiza funcionamiento de equipos electrónicos y diagnostica fallas según manuales, considerando las normas de seguridad establecidas.',
        ces: {
          '4.1': { texto: 'Diagnostica fallas en equipos electrónicos en relación al tipo de síntoma presentado, siguiendo protocolos de búsqueda y localización de fallas, según protocolos.', oag: ['B'] },
          '4.2': { texto: 'Cambia componentes, partes o piezas de un equipo electrónico, aplicado las técnicas indicadas en manuales específicos de reparación.', oag: ['B'] },
          '4.3': { texto: 'Verifica el funcionamiento de equipos electrónicos según instrucciones consignadas en manuales técnicos y, respetando normativa de seguridad.', oag: ['K'] }
        }
      },
      'OA5': {
        texto: 'Reemplaza componentes y dispositivos electrónicos pasivos y activos de acuerdo a especificaciones técnicas de cada uno.',
        ces: {
          '5.1': { texto: 'Interpreta un esquema electrónico, reconociendo cada componente, con la finalidad de buscar el remplazo más adecuado.', oag: ['B'] },
          '5.2': { texto: 'Reemplaza los componentes electrónicos tanto pasivos como activos, aplicando técnicas de soldadura y manejo de herramientas e instrumentos, de acuerdo a especificaciones técnicas.', oag: ['B'] },
          '5.3': { texto: 'Utiliza la información consignada en manuales, planos y otros con la finalidad de encontrar la alternativa más adecuada durante la intervención del circuito.', oag: ['B'] },
          '5.4': { texto: 'Crea o diseña en caso de ser necesario pequeños circuitos electrónicos, de características similares a las originales, con la finalidad de dejar operativo el equipo cuando no se encuentren los repuestos en el mercado, según especificaciones técnicas del sistema.', oag: ['B'] }
        }
      }
    }
  },

  'EN2': {
    num: 'EN2',
    nombre: 'Armado y Reparación de Circuitos Electrónicos',
    nivel: '3M',
    horas: 228,
    oas: {
      'OA3': 'Armar y ensamblar circuitos electrónicos básicos, analógicos y digitales, y repararlos cuando corresponda, de acuerdo a manuales de procedimiento.'
    },
    aes: {
      'OA1': {
        texto: 'Elabora circuitos electrónicos de ensayo, aplicando diversas técnicas de diseño, previendo situaciones de riesgo en la manipulación de químicos y herramientas.',
        ces: {
          '1.1': { texto: 'Dibuja las pistas para un circuito impreso, aplicando distintas técnicas de diseño, según la complejidad del diagrama electrónico.', oag: ['B'] },
          '1.2': { texto: 'Crea circuitos impresos básicos, según los requerimientos, previendo situaciones de riesgo en la manipulación de químicos y herramientas.', oag: ['K'] },
          '1.3': { texto: 'Selecciona los dispositivos y componentes adecuados, según el tipo de circuito a montar, considerando especificaciones técnicas de cada uno de ellos.', oag: ['B'] },
          '1.4': { texto: 'Utiliza herramientas de montaje y ensamblado para circuitos electrónicos, tales como estaciones de soldaduras, maquinarias e instrumentos de chequeo, considerando estándares de calidad.', oag: ['C'] }
        }
      },
      'OA2': {
        texto: 'Arma circuitos electrónicos analógicos básicos de acuerdo a manuales de procedimiento, cumpliendo plazos establecidos y estándares de calidad.',
        ces: {
          '2.1': { texto: 'Selecciona los dispositivos y componentes electrónicos según el diagrama esquemático a montar, considerando manuales de especificaciones técnicas para componentes pasivos y activos.', oag: ['B'] },
          '2.2': { texto: 'Verifica el correcto funcionamiento de cada componente, correspondiente a un circuito electrónico analógico, utilizando instrumentos de medida y hojas de datos técnicos, según corresponda.', oag: ['B'] },
          '2.3': { texto: 'Arma circuitos electrónicos analógicos básicos, aplicando técnicas de manipulación y de montaje para componentes electrónicos, cumpliendo plazos establecidos, haciendo uso de las herramientas adecuadas y estándares de calidad de la industria.', oag: ['C'] },
          '2.4': { texto: 'Comprueba el correcto funcionamiento de circuitos electrónicos analógicos, realizando medición de parámetros, previendo situaciones de riesgo y enfermedades ocupacionales.', oag: ['K'] },
          '2.5': { texto: 'Modifica circuitos electrónicos básicos, utilizando software de diseño y simulación de circuitos, asociando distintos teoremas, en una perspectiva de eficiencia energética y cuidado ambiental.', oag: ['I'] }
        }
      },
      'OA3': {
        texto: 'Repara y mantiene equipos electrónicos básicos, según requerimientos y especificaciones técnicas.',
        ces: {
          '3.1': { texto: 'Diagnostica fallas en equipos electrónicos básicos, empleando distintos medios en la búsqueda y diagnóstico de averías, emprendiendo iniciativas útiles en los lugares de trabajo.', oag: ['K'] },
          '3.2': { texto: 'Cambia componentes, partes o equipos dañados, en sistemas electrónicos básicos, considerando el tipo de avería, y las especificaciones técnicas.', oag: ['B'] },
          '3.3': { texto: 'Actualiza el sistema operativo, cuando corresponda, según indicaciones de los fabricantes, emprendiendo iniciativas útiles en los lugares de trabajo, resguardando la normativa vigente.', oag: ['J'] },
          '3.4': { texto: 'Elabora informes técnicos referidos a la mantención y reparación de equipos electrónicos, comunicando en forma clara y precisa los trabajos realizados.', oag: ['H'] }
        }
      },
      'OA4': {
        texto: 'Ensambla circuitos electrónicos, analógicos y digitales, de acuerdo a manuales de procedimiento.',
        ces: {
          '4.1': { texto: 'Prepara las condiciones necesarias para realizar tareas de ensamblaje de equipos electrónicos, revisando herramientas e instrumentos, según normas de seguridad.', oag: ['J'] },
          '4.2': { texto: 'Clasifica las partes y piezas del equipo a ensamblar, dando un orden lógico para mayor fluidez del proceso, considerando el tipo de equipo a ensamblar, y las especificaciones técnicas del fabricante.', oag: ['B'] },
          '4.3': { texto: 'Ensambla y realiza pruebas de control de calidad, utilizando los instrumentos adecuados, según protocolos establecidos.', oag: ['J'] },
          '4.4': { texto: 'Elabora informes técnicos referidos a fallas reiterativas o defectos de fabricación en equipos electrónicos ensamblados, comunicando en forma clara y precisa los trabajos realizados.', oag: ['H'] }
        }
      }
    }
  },

  'EN3': {
    num: 'EN3',
    nombre: 'Ensamblaje y Mantención de Sistemas y Equipos Digitales',
    nivel: '3M',
    horas: 228,
    oas: {
      'OA3': 'Armar y ensamblar circuitos electrónicos básicos, analógicos y digitales, y repararlos cuando corresponda, de acuerdo a manuales de procedimiento.'
    },
    aes: {
      'OA1': {
        texto: 'Ensambla circuitos electrónicos digitales para equipos básicos, comprobando su lógica de funcionamiento, de acuerdo a manuales de procedimiento.',
        ces: {
          '1.1': { texto: 'Predice el comportamiento de circuitos electrónicos digitales, basado en distintos teoremas, de acuerdo a manuales de procedimiento.', oag: ['B'] },
          '1.2': { texto: 'Selecciona circuitos integrados digitales, según el diagrama esquemático a montar, considerando manuales de especificaciones técnicas para componentes digitales.', oag: ['B'] },
          '1.3': { texto: 'Verifica el correcto funcionamiento de cada componente, correspondiente a un circuito electrónico digital, utilizando instrumentos de medida y hojas de datos técnicos, según corresponda.', oag: ['B'] },
          '1.4': { texto: 'Arma circuitos electrónicos digitales básicos, aplicando técnicas de manipulación y ensamblaje, cumpliendo plazos establecidos y estándares de calidad.', oag: ['C'] },
          '1.5': { texto: 'Comprueba el correcto funcionamiento circuitos electrónicos digitales, realizando mediciones de distintos parámetros, previendo situaciones de riesgo y enfermedades ocupacionales.', oag: ['K'] },
          '1.6': { texto: 'Modifica circuitos electrónicos básicos, mediante la aplicación de teoremas de lógica digital, en una perspectiva de eficiencia energética y cuidado ambiental.', oag: ['I'] },
          '1.7': { texto: 'Realiza pruebas de funcionamiento a circuitos electrónicos, mediante instrumentos y aplica protocolos establecidos y normas de seguridad.', oag: ['B'] }
        }
      },
      'OA2': {
        texto: 'Arma y configura en forma prolija un computador, de acuerdo a manuales de procedimiento.',
        ces: {
          '2.1': { texto: 'Organiza y selecciona los materiales e insumos a utilizar, durante el armado de computadores, basándose en los manuales específicos de cada fabricante.', oag: ['B'] },
          '2.2': { texto: 'Ensambla el hardware de un computador, previendo los cuidados necesarios, indicados en manuales técnicos.', oag: ['B'] },
          '2.3': { texto: 'Instala y configura el sistema operativo en un computador, acorde a los requerimientos del usuario, considerando tecnologías de información pertinentes al trabajo.', oag: ['H'] },
          '2.4': { texto: 'Ejecuta los procedimientos de control y calidad, para los distintos tipos de computadores ensamblados, de acuerdo a protocolos establecidos y estándares de la industria.', oag: ['B'] },
          '2.5': { texto: 'Verifica el funcionamiento del equipo, haciendo uso de procedimientos establecidos.', oag: ['B'] }
        }
      },
      'OA3': {
        texto: 'Repara y mantiene equipos electrónicos básicos, según requerimientos y especificaciones técnicas.',
        ces: {
          '3.1': { texto: 'Diagnostica fallas en equipos electrónicos básicos, empleando distintos medios en la búsqueda y diagnóstico de averías, emprendiendo iniciativas útiles en los lugares de trabajo.', oag: ['J'] },
          '3.2': { texto: 'Reemplaza componentes, partes o equipos dañados, en sistemas electrónicos básicos, considerando el tipo de avería, y las especificaciones técnicas.', oag: ['B'] },
          '3.3': { texto: 'Actualiza el sistema operativo, cuando corresponda, de acuerdo a las indicaciones de los fabricantes, emprendiendo iniciativas útiles en los lugares de trabajo.', oag: ['J'] },
          '3.4': { texto: 'Realiza pruebas de funcionamiento, aplicando fórmulas, pautas y rutinas establecidas.', oag: ['B'] },
          '3.5': { texto: 'Elabora informes técnicos referidos a la mantención y reparación de equipos electrónicos, comunicando en forma clara y precisa las especificaciones técnicas.', oag: ['H'] }
        }
      },
      'OA4': {
        texto: 'Realiza análisis técnico para la instalación de equipos electrónicos según manual de uso y especificaciones técnicas, respetando normas de seguridad y tiempos establecidos.',
        ces: {
          '4.1': { texto: 'Inspecciona espacios físicos para la instalación de equipos electrónicos de acuerdo a disposición y usabilidad.', oag: ['K'] },
          '4.2': { texto: 'Contrasta información técnica, verifica valores nominales de las magnitudes para instalación del equipo, utilizando instrumentos de medición de acuerdo a las normas.', oag: ['A'] },
          '4.3': { texto: 'Genera procedimiento de instalación de equipos de acuerdo a especificaciones y características técnicas, considerando normas seguridad.', oag: ['K'] }
        }
      }
    }
  },

  'EN4': {
    num: 'EN4',
    nombre: 'Sistemas de Control Domótico',
    nivel: '3M',
    horas: 190,
    oas: {
      'OA6': 'Configurar el funcionamiento automático de sistemas y equipos electrónicos simples, tales como equipos de domótica, ascensores, portones eléctricos, riego automatizado, iluminación y otros, de acuerdo a los requerimientos del proyecto y las especificaciones técnicas del fabricante.'
    },
    aes: {
      'OA1': {
        texto: 'Utiliza equipos de domótica para el control de sistemas electrónicos, de acuerdo a requerimientos y especificaciones técnicas.',
        ces: {
          '1.1': { texto: 'Examina equipos de domótica, siguiendo especificaciones técnicas del fabricante, y los manuales de uso.', oag: ['B'] },
          '1.2': { texto: 'Instala equipos de domótica para el control de sistemas electrónicos, según proyecto, respetando protocolo de seguridad y privacidad.', oag: ['K'] },
          '1.3': { texto: 'Configura y programa equipos de domótica, de acuerdo a requerimientos y especificaciones técnicas.', oag: ['B'] },
          '1.4': { texto: 'Mantiene y mejora los sistemas de domótica, optimizando los recursos, respetando el medio ambiente y especificaciones técnicas.', oag: ['I'] },
          '1.5': { texto: 'Realiza pruebas de funcionamiento, aplicando pautas y rutinas establecidas para ello.', oag: ['B'] }
        }
      },
      'OA2': {
        texto: 'Mantiene sistemas y equipos electrónicos automáticos, de acuerdo a instrucciones y procedimientos establecidos.',
        ces: {
          '2.1': { texto: 'Opera sistemas y equipo electrónicos considerando ahorro energético de acuerdo a manuales del fabricante y en consonancia con las normas de seguridad personal y de los equipos.', oag: ['B'] },
          '2.2': { texto: 'Mantiene sistemas y equipo electrónicos, haciendo uso de herramientas e instrumentos adecuados, de acuerdo a manuales del fabricante y pautas de mantención.', oag: ['B'] },
          '2.3': { texto: 'Realiza pruebas de funcionamiento de los equipos y sistemas electrónicos, haciendo uso de instrumentos, protocolos de prueba y normas de seguridad.', oag: ['K'] },
          '2.4': { texto: 'Elabora informes técnicos referidos a la mantención y reparación de equipos electrónicos, comunicando en forma clara y precisa los trabajos realizados.', oag: ['A'] }
        }
      },
      'OA3': {
        texto: 'Implementa los distintos tipos de instalaciones de alumbrado eléctrico en baja tensión, de acuerdo a las indicaciones del proyecto.',
        ces: {
          '3.1': { texto: 'Chequea parámetros básicos de corriente y potencia eléctrica para la instalación de alumbrado, haciendo uso de manuales, instrumentos, de acuerdo a normas eléctricas y de seguridad.', oag: ['C'] },
          '3.2': { texto: 'Elabora una lista de insumos y materiales requeridos en la instalación de alumbrado de baja tensión, evaluando los costos y tiempos de implementación.', oag: ['A'] },
          '3.3': { texto: 'Organiza los elementos requeridos para la instalación de alumbrado, considerando herramientas, instrumentos y elementos de seguridad de acuerdo a la normativa vigente.', oag: ['I'] },
          '3.4': { texto: 'Monta los componentes y ductos requeridos para la instalación de alumbrado de baja tensión, respetando las normas eléctricas.', oag: ['B'] },
          '3.5': { texto: 'Verifica el funcionamiento de las diferentes instalaciones de alumbrado, haciendo uso de herramientas e instrumentos apropiados, respetando la normativa establecida.', oag: ['K'] }
        }
      },
      'OA4': {
        texto: 'Instala equipos electrónicos, según requerimientos del usuario, e instrucciones consignadas en manuales.',
        ces: {
          '4.1': { texto: 'Monta los equipos electrónicos y dispositivos asociados, de acuerdo al manual, siguiendo las instrucciones del proyecto, cumpliendo con los plazos establecidos.', oag: ['B'] },
          '4.2': { texto: 'Comprueba el funcionamiento de la instalación, midiendo parámetros en los puntos más relevantes, previendo situaciones de riesgo y enfermedades laborales.', oag: ['K'] },
          '4.3': { texto: 'Hace uso de las herramientas y elementos de seguridad requeridos para el tipo de instalación, considerando las condiciones técnicas y de espacio.', oag: ['C'] },
          '4.4': { texto: 'Verifica el funcionamiento de los equipos haciendo uso de herramientas e instrumentos apropiados, respetando la normativa establecida.', oag: ['K'] }
        }
      }
    }
  },

  // ══════════════════════════════════════════════════════
  // 4° MEDIO
  // ══════════════════════════════════════════════════════

  'EN5': {
    num: 'EN5',
    nombre: 'Mantención y Operación de Equipos de Control Electrónico de Potencia',
    nivel: '4M',
    horas: 152,
    oas: {
      'OA1': 'Leer y utilizar información técnica consignada en manuales, planos croquis, instrucciones y proyectos de instalación electrónicos, relevando los datos necesarios para desarrollar correctamente su trabajo.',
      'OA5': 'Mantener preventiva y correctivamente equipos, sistemas, dispositivos y componentes electrónicos, utilizando instrumentos y materiales apropiados, de acuerdo a la normativa de seguridad, especificaciones técnicas y planes de mantenimiento.'
    },
    aes: {
      'OA1': {
        texto: 'Elabora planes de mantenimientos preventivos y correctivos para sistemas electrónicos, de acuerdo a normativas y especificaciones técnicas.',
        ces: {
          '1.1': { texto: 'Recopila los datos necesarios para la elaboración de un plan de mantención, basado en distintos medios de información, propiciando el trabajo en equipo.', oag: ['D'] },
          '1.2': { texto: 'Dibuja planos, croquis y diagramas esquemáticos, considerando las especificaciones técnicas necesarias para la mantención de sistemas electrónicos, respetando las diversas normativas técnicas.', oag: ['B'] },
          '1.3': { texto: 'Diseña planes de mantenimientos preventivos y correctivos apoyándose en planos y datos obtenidos, integrándose a diversos grupos de profesionales.', oag: ['D'] },
          '1.4': { texto: 'Realiza un levantamiento del cableado, con la finalidad de optimizar los planes de mantención elaborados, utilizando los equipos de seguridad necesarios.', oag: ['K'] },
          '1.5': { texto: 'Propone plan de mantenimiento para sistemas electrónicos, considerando exigencias de la industria, protocolos de manejo y eficiencia energética.', oag: ['I'] }
        }
      },
      'OA2': {
        texto: 'Mantiene preventivamente sistemas con dispositivos y componentes electrónicos, de acuerdo a especificaciones técnicas y planes de mantenimiento.',
        ces: {
          '2.1': { texto: 'Extrae información de manuales y protocolos de funcionamiento, para uso y manejo y mantención sistemas con dispositivos electrónicos.', oag: ['A'] },
          '2.2': { texto: 'Realiza mantención preventiva a sistemas con dispositivos y componentes electrónicos de generación y conversión de energía, de acuerdo a especificaciones técnicas y planes de mantenimiento.', oag: ['B'] },
          '2.3': { texto: 'Protege preventivamente sistemas con dispositivos y componentes electrónicos, de control, de acuerdo a especificaciones técnicas y planes de mantenimiento.', oag: ['B'] },
          '2.4': { texto: 'Inspecciona preventivamente sistemas electrónicos, industriales de acuerdo a especificaciones técnicas y planes de mantenimiento.', oag: ['B'] },
          '2.5': { texto: 'Diseña un plan de mantenimiento preventivo, en sistemas electro neumáticos y otros, utilizando los medios tecnológicos en la elaboración de estos planes.', oag: ['B'] }
        }
      },
      'OA3': {
        texto: 'Realiza mantención correctiva a sistemas con dispositivos y componentes electrónicos y electroneumáticos, de acuerdo a especificaciones técnicas y planes de mantenimiento.',
        ces: {
          '3.1': { texto: 'Inspecciona sistemas electrónicos, haciendo uso de instrumentos y herramientas adecuadas, según manuales de uso y normas de seguridad.', oag: ['C'] },
          '3.2': { texto: 'Selecciona los equipos e insumos necesarios de acuerdo al diseño y características técnicas de sistema, según planos del proyecto.', oag: ['B'] },
          '3.3': { texto: 'Conecta y prueba equipos electrónicos industriales, de acuerdo a especificaciones técnicas y planes de mantenimiento.', oag: ['B'] },
          '3.4': { texto: 'Mantiene correctamente sistemas con dispositivos y componentes electrónicos y electro neumáticos, de acuerdo a especificaciones técnicas y planes de mantención.', oag: ['B'] },
          '3.5': { texto: 'Comprueba el funcionamiento del sistema, midiendo parámetros en los puntos más relevantes, haciendo uso de procedimientos establecidos y previendo situaciones de riesgo.', oag: ['B'] }
        }
      },
      'OA4': {
        texto: 'Realiza la mantención de servomecanismos con control electrónico industrial, de acuerdo a especificaciones técnicas y plan de mantenimiento.',
        ces: {
          '4.1': { texto: 'Inspecciona sistemas de servomecanismos electrónicos, tales como motor paso a paso, driver de control de posición y velocidad y servomotores y otros, haciendo uso de instrumentos y herramientas adecuadas, según manuales de uso y normas de seguridad.', oag: ['C'] },
          '4.2': { texto: 'Selecciona los equipos e insumos necesarios para el desarme de sistemas con servomecanismos, según planos de cada instalación.', oag: ['B'] },
          '4.3': { texto: 'Reemplaza y/o repara partes y piezas dañadas o fatigadas, utilizando adecuadamente herramientas e instrumentos de precisión, de acuerdo a especificaciones técnicas y planes de mantenimiento.', oag: ['B'] },
          '4.4': { texto: 'Calcula, sincroniza y calibra los sistemas de control para servomecanismos electrónicos de acuerdo a especificaciones técnicas y planes de mantención establecidos.', oag: ['B'] },
          '4.5': { texto: 'Comprueba el funcionamiento de servomecanismos electrónicos, midiendo parámetros en los puntos más relevantes, visualizando imágenes y señales, haciendo uso de procedimientos establecidos y previendo situaciones de riesgo.', oag: ['K'] }
        }
      }
    }
  },

  'EN6': {
    num: 'EN6',
    nombre: 'Detección de Fallas Industriales',
    nivel: '4M',
    horas: 152,
    oas: {
      'OA2': 'Inspeccionar y diagnosticar fallas de funcionamiento en circuitos electrónicos, equipos y sistemas electrónicos industriales, con o sin control automático, con referencia a las especificaciones técnicas del fabricante.'
    },
    aes: {
      'OA1': {
        texto: 'Inspecciona equipos y circuitos electrónicos industriales respetando protocolos y normas de seguridad.',
        ces: {
          '1.1': { texto: 'Examina circuitos electrónicos industriales, utilizando herramientas e instrumentos adecuados, respetando protocolos y normas de seguridad.', oag: ['B'] },
          '1.2': { texto: 'Revisa equipos electrónicos industriales haciendo uso de las herramientas específicas y aplicando las normas de seguridad establecidas para la tarea.', oag: ['B'] },
          '1.3': { texto: 'Verifica el funcionamiento de equipos y circuitos según instrucciones consignadas en manuales técnicos y, respetando normativa de seguridad.', oag: ['B'] }
        }
      },
      'OA2': {
        texto: 'Diagnostica fallas en sistemas electrónicos industriales, respetando protocolos, normas de seguridad y especificaciones técnicas.',
        ces: {
          '2.1': { texto: 'Diagnostica fallas en sistemas de control automático usados en la industria, monitoreando y forzando variables, según protocolos de búsqueda y localización de averías en equipos de automatización industrial.', oag: ['B'] },
          '2.2': { texto: 'Reemplaza los dispositivos, equipos e instrumentos industriales dañados, respetando normas de seguridad y protocolos establecidos.', oag: ['B'] },
          '2.3': { texto: 'Elabora informes técnicos referidos al diagnóstico y fallas de sistemas electrónicos, comunicando en forma clara y precisa los trabajos realizados.', oag: ['A'] }
        }
      },
      'OA3': {
        texto: 'Mantiene equipos y sistemas electrónicos industriales, con y sin control automático, según manuales de mantención y especificaciones técnicas del fabricante.',
        ces: {
          '3.1': { texto: 'Elabora un plan de mantención, preventivo y correctivo, para los tres tipos de control industrial (control manual, semiautomático y automático), coordinando acciones con otros departamentos.', oag: ['D'] },
          '3.2': { texto: 'Realiza trabajos de mantenimiento preventivo, para los distintos tipos de control industrial, acorde al plan de mantención elaborado y especificaciones técnicas del fabricante.', oag: ['B'] },
          '3.3': { texto: 'Ejecuta mantenimiento correctivo, para control industrial, según diagnóstico de falla, aplicando técnicas de mantenimiento, herramientas adecuadas y respetando normas de seguridad.', oag: ['C'] },
          '3.4': { texto: 'Realiza pruebas de funcionamiento, aplicando pautas y rutinas establecidas.', oag: ['B'] }
        }
      },
      'OA4': {
        texto: 'Analiza funcionamiento de equipos electrónicos y diagnostica fallas según manuales, considerando las normas de seguridad establecidas.',
        ces: {
          '4.1': { texto: 'Examina el funcionamiento de los equipos electrónicos haciendo uso de herramientas e instrumentos, considerando las especificaciones técnicas, previniendo las situaciones de riesgo personal y de los equipos.', oag: ['K'] },
          '4.2': { texto: 'Diagnostica fallas en equipos electrónicos en relación al tipo de síntoma presentado, siguiendo protocolos de búsqueda y localización de fallas, según protocolos establecidos.', oag: ['B'] },
          '4.3': { texto: 'Reemplaza componentes, partes o piezas de un equipo electrónico, aplicando las técnicas indicadas en manuales específicos de reparación.', oag: ['B'] },
          '4.4': { texto: 'Verifica el funcionamiento de equipos electrónicos según instrucciones consignadas en manuales técnicos y, respetando normativa de seguridad.', oag: ['B'] }
        }
      }
    }
  },

  'EN7': {
    num: 'EN7',
    nombre: 'Programación de Sistemas de Automatización con PLC',
    nivel: '4M',
    horas: 152,
    oas: {
      'OA7': 'Programar, ajustar y operar controladores lógicos programables (PLC) y sistemas de automatización industrial, utilizando lenguajes de programación normalizados, de acuerdo a requerimientos del proceso y especificaciones técnicas.'
    },
    aes: {
      'OA1': {
        texto: 'Configura y programa un PLC para el control de procesos industriales básicos, de acuerdo a requerimientos y especificaciones técnicas.',
        ces: {
          '1.1': { texto: 'Identifica la arquitectura del PLC (CPU, módulos E/S, rack, fuente de poder) y sus periféricos, reconociendo la función de cada elemento según manuales del fabricante.', oag: ['B'] },
          '1.2': { texto: 'Selecciona el lenguaje de programación apropiado (Ladder, FBD, ST) según los requerimientos del proceso, considerando norma IEC 61131-3.', oag: ['B'] },
          '1.3': { texto: 'Programa secuencias de control lógico utilizando contactos, bobinas, temporizadores y contadores, verificando el cumplimiento de los requerimientos del proceso.', oag: ['B'] },
          '1.4': { texto: 'Carga y prueba el programa en el PLC, verificando el correcto funcionamiento mediante simulación y ejecución real, respetando normas de seguridad.', oag: ['K'] }
        }
      },
      'OA2': {
        texto: 'Conecta y configura sensores y actuadores a sistemas de control con PLC, según proyecto y especificaciones técnicas.',
        ces: {
          '2.1': { texto: 'Identifica y selecciona sensores (inductivos, capacitivos, ópticos, de temperatura) y actuadores (motores, electroválvulas, variadores) según requerimientos del proceso.', oag: ['B'] },
          '2.2': { texto: 'Cablea y configura las entradas y salidas del PLC, respetando la normativa eléctrica, ambiental y de seguridad industrial.', oag: ['C'] },
          '2.3': { texto: 'Verifica señales de entrada y salida del sistema de control, empleando instrumentos de medición y software de monitoreo.', oag: ['K'] },
          '2.4': { texto: 'Elabora informes técnicos referidos a la instalación y configuración del sistema de automatización, comunicando en forma clara y precisa los trabajos realizados.', oag: ['A'] }
        }
      },
      'OA3': {
        texto: 'Opera y diagnostica fallas en sistemas de automatización industrial con PLC, de acuerdo a especificaciones técnicas y protocolos establecidos.',
        ces: {
          '3.1': { texto: 'Opera el sistema de automatización, monitoreando variables del proceso mediante la interfaz HMI o software SCADA básico, según protocolos establecidos.', oag: ['B'] },
          '3.2': { texto: 'Diagnostica fallas en el sistema PLC y en los elementos periféricos, aplicando metodologías sistemáticas de detección de averías.', oag: ['B'] },
          '3.3': { texto: 'Modifica o ajusta el programa del PLC para corregir fallas o mejorar el desempeño del proceso, respetando procedimientos de cambio documentados.', oag: ['B'] },
          '3.4': { texto: 'Realiza pruebas de funcionamiento del sistema de automatización completo, aplicando protocolos de puesta en marcha y verificando parámetros de seguridad.', oag: ['B'] }
        }
      },
      'OA4': {
        texto: 'Documenta y evalúa proyectos de automatización con PLC, comunicando resultados técnicos en forma clara, precisa y fundamentada.',
        ces: {
          '4.1': { texto: 'Elabora informe técnico del sistema de automatización programado, incluyendo descripción funcional, diagrama de conexiones, programa comentado y resultados de pruebas.', oag: ['A'] },
          '4.2': { texto: 'Registra y justifica las modificaciones realizadas al programa del PLC durante el proceso de puesta en marcha, manteniendo trazabilidad del desarrollo.', oag: ['H'] },
          '4.3': { texto: 'Evalúa el desempeño del sistema de automatización en relación a los requerimientos originales, identificando logros, limitaciones y propuestas de mejora.', oag: ['B'] },
          '4.4': { texto: 'Presenta el sistema de automatización implementado ante pares o personal técnico, fundamentando las decisiones de programación y configuración adoptadas.', oag: ['H'] }
        }
      }
    }
  },

  'EN8': {
    num: 'EN8',
    nombre: 'Montaje de Equipos Industriales',
    nivel: '4M',
    horas: 152,
    oas: {
      'OA4': 'Instalar y montar equipos y sistemas electrónicos industriales y otros, de acuerdo al diseño y características técnicas del proyecto, utilizando las herramientas e instrumentos adecuados, respetando la normativa eléctrica, ambiental y de seguridad.'
    },
    aes: {
      'OA1': {
        texto: 'Instala equipos electrónicos Industriales, según requerimientos, respetando la normativa eléctrica, ambiental y de seguridad.',
        ces: {
          '1.1': { texto: 'Extrae información del proyecto para la instalación de equipos electrónicos, considerando tipo de equipo, parámetros y normas para la instalación.', oag: ['B'] },
          '1.2': { texto: 'Selecciona los insumos, herramientas y materiales necesarios para la instalación de acuerdo al diseño y características técnicas del proyecto electrónico Industrial.', oag: ['B'] },
          '1.3': { texto: 'Instala equipos y sistemas electrónicos Industriales, de acuerdo al diseño y características técnicas del proyecto, utilizando las herramientas e instrumentos adecuados, optimizando recursos.', oag: ['C'] },
          '1.4': { texto: 'Conecta y prueba los diversos equipos electrónicos industriales, de acuerdo al diseño y características técnicas del proyecto, respetando la normativa eléctrica, ambiental y de seguridad.', oag: ['B'] }
        }
      },
      'OA2': {
        texto: 'Monta sistemas electrónicos industriales, según requerimientos de la industria respetando la normativa eléctrica, ambiental y de seguridad.',
        ces: {
          '2.1': { texto: 'Prepara los dispositivos y sistemas electrónicos industriales, (variadores de frecuencia, partidores suaves, actuadores, sensores y otros) según indicación de planos y manuales.', oag: ['B'] },
          '2.2': { texto: 'Manipula herramientas e instrumentos durante el montaje de equipos electrónicos industriales previendo situaciones de riesgo e integridad física.', oag: ['K'] },
          '2.3': { texto: 'Monta y configura distintos equipos electrónicos industriales según la lógica indicada en planos, manuales y/o proyectos industriales respetando la normativa eléctrica, ambiental y de seguridad.', oag: ['B', 'I'] },
          '2.4': { texto: 'Conecta y pone en marcha los distintos equipos electrónicos industriales según la lógica indicada en planos, manuales, respetando la normativa eléctrica, ambiental y de seguridad.', oag: ['A'] },
          '2.5': { texto: 'Elabora informes técnicos referidos al montaje de sistemas electrónicos, comunicando en forma clara y precisa los trabajos realizados.', oag: ['A'] }
        }
      },
      'OA3': {
        texto: 'Opera equipos y sistemas eléctricos y electrónicos utilizados en la industria, según protocolos de manejo.',
        ces: {
          '3.1': { texto: 'Extrae información de manuales y protocolos de funcionamiento, para uso y manejo de equipos y sistemas electrónicos.', oag: ['A'] },
          '3.2': { texto: 'Realiza pruebas de funcionamiento en sistemas eléctricos y electrónicos utilizados en la industria de acuerdo a indicaciones o manuales propuestos para ello, respetando normas de seguridad.', oag: ['K'] },
          '3.3': { texto: 'Opera diversos equipos y sistemas eléctricos y electrónicos utilizados en la industria, previendo situaciones de riesgo y ambientales.', oag: ['K'] },
          '3.4': { texto: 'Elabora informes técnicos referidos a las pruebas de funcionamiento en equipos y sistemas eléctricos y electrónicos utilizados en la industria, considerando protocolos de manejo.', oag: ['B'] }
        }
      },
      'OA4': {
        texto: 'Ejecuta proyectos de Instalación de sistemas electrónicos industriales de acuerdo al diseño y características técnicas del proyecto, manuales específicos y normativa vigente.',
        ces: {
          '4.1': { texto: 'Extrae información de manuales y protocolos de funcionamiento, para uso y manejo de equipos y sistemas electrónicos relacionados con el proyecto a implementar.', oag: ['A'] },
          '4.2': { texto: 'Monta los equipos electrónicos de potencia en tableros de control y de Fuerza de acuerdo a indicaciones del proyecto, utilizando las herramientas e instrumentos adecuados, respetando normas de seguridad.', oag: ['K'] },
          '4.3': { texto: 'Conecta los equipos de electrónica de potencia y realiza pruebas de funcionamiento según protocolos utilizados en la industria, previendo situaciones de riesgo y ambientales.', oag: ['K'] },
          '4.4': { texto: 'Realiza pruebas de funcionamiento en la instalación de sistemas industriales, considerando protocolos de manejo técnico y normas de seguridad.', oag: ['B'] }
        }
      }
    }
  },

  'EN9': {
    num: 'EN9',
    nombre: 'Proyecto de Especialidad: Sistemas Electrónicos',
    nivel: '4M',
    horas: 114,
    oas: {
      'OA1': 'Leer y utilizar información técnica consignada en manuales, planos, croquis, instrucciones y proyectos de instalación electrónicos, relevando los datos necesarios para desarrollar correctamente su trabajo.',
      'OA9': 'Diseñar, planificar y ejecutar un proyecto de especialidad electrónica integrando los conocimientos y habilidades adquiridos, respondiendo a un problema o necesidad real, de acuerdo a estándares de calidad y normativa vigente.'
    },
    aes: {
      'OA1': {
        texto: 'Planifica y diseña el proyecto de especialidad electrónica, definiendo alcance, recursos, cronograma y criterios de calidad.',
        ces: {
          '1.1': { texto: 'Identifica y analiza el problema o necesidad a resolver, definiendo los requerimientos técnicos del proyecto electrónico a desarrollar.', oag: ['B'] },
          '1.2': { texto: 'Diseña la solución electrónica (diagrama esquemático, lista de materiales, presupuesto) de acuerdo a las especificaciones técnicas y normativa vigente.', oag: ['B'] },
          '1.3': { texto: 'Planifica las etapas del proyecto, estableciendo cronograma, distribución de tareas y criterios de control de calidad, integrándose a un equipo de trabajo.', oag: ['D'] },
          '1.4': { texto: 'Selecciona los componentes, materiales e instrumentos necesarios para el proyecto, justificando técnicamente las elecciones realizadas.', oag: ['B'] }
        }
      },
      'OA2': {
        texto: 'Construye, prueba y valida el prototipo del proyecto de especialidad electrónica, de acuerdo al diseño y especificaciones técnicas.',
        ces: {
          '2.1': { texto: 'Monta y ensambla el circuito o sistema electrónico según el diseño elaborado, aplicando técnicas de soldadura, cableado y configuración, respetando normas de seguridad.', oag: ['C'] },
          '2.2': { texto: 'Realiza pruebas funcionales al prototipo, midiendo parámetros y verificando el cumplimiento de los requerimientos establecidos en el diseño.', oag: ['K'] },
          '2.3': { texto: 'Detecta y corrige fallas o desviaciones del prototipo respecto al diseño, aplicando metodologías de diagnóstico y registro de modificaciones.', oag: ['B'] },
          '2.4': { texto: 'Valida el funcionamiento final del prototipo mediante pruebas de desempeño, comparando resultados con las especificaciones del proyecto.', oag: ['B'] }
        }
      },
      'OA3': {
        texto: 'Documenta y presenta el proyecto de especialidad electrónica, comunicando el proceso, resultados y conclusiones de forma técnica y ordenada.',
        ces: {
          '3.1': { texto: 'Elabora informe técnico completo del proyecto, incluyendo diseño, materiales, procedimiento de construcción, pruebas realizadas y resultados obtenidos.', oag: ['A'] },
          '3.2': { texto: 'Presenta y defiende el proyecto ante la comunidad escolar, argumentando las decisiones técnicas adoptadas y respondiendo consultas con propiedad.', oag: ['H'] },
          '3.3': { texto: 'Evalúa críticamente el proceso y resultado del proyecto, identificando fortalezas, dificultades y propuestas de mejora para futuras implementaciones.', oag: ['B'] }
        }
      }
    }
  },

  // ══════════════════════════════════════════════════════
  // 3° MEDIO — MÓDULO NUEVO: Mecatrónica y Robótica
  // ══════════════════════════════════════════════════════

  'EN11': {
    num: 'EN11',
    nombre: 'Sistemas Mecatrónicos y Robóticos',
    nivel: '3M',
    horas: 114,
    oas: {
      'OA1': 'Leer y utilizar información técnica consignada en manuales, planos, croquis, instrucciones y proyectos de instalación electrónicos, relevando los datos necesarios para desarrollar correctamente su trabajo.',
      'OA8': 'Aplicar los principios de la mecatrónica y la robótica en el análisis, diseño, programación y construcción de sistemas automatizados de baja complejidad, integrando componentes mecánicos, electrónicos y de control programable, mediante metodologías activas que promuevan la creatividad, el trabajo colaborativo, la seguridad y la responsabilidad técnica en el desarrollo de proyectos funcionales.'
    },
    aes: {
      'OA1': {
        texto: 'Realiza análisis técnico de sistemas mecatrónicos aplicados, identificando sus componentes mecánicos, electrónicos y de control, comprendiendo su funcionamiento integral y demostrando orden, rigurosidad y cumplimiento de normas de seguridad en el trabajo técnico.',
        ces: {
          '1.1': { texto: 'Identifica los componentes mecánicos, electrónicos y de control presentes en distintos sistemas mecatrónicos, clasificándolos según su función dentro del sistema.', oag: ['B', 'H'] },
          '1.2': { texto: 'Interpreta esquemas, diagramas funcionales o simbología técnica de sistemas mecatrónicos, estableciendo relaciones entre los elementos y el flujo de señal o energía.', oag: ['A', 'B'] },
          '1.3': { texto: 'Evalúa el funcionamiento de un sistema mecatrónico sencillo mediante observación directa o simulación, determinando interacciones entre los subsistemas mecánico, electrónico y de control.', oag: ['B', 'C'] },
          '1.4': { texto: 'Aplica normas de seguridad, orden y prevención de riesgos en el análisis y manipulación de componentes de sistemas mecatrónicos, demostrando responsabilidad y rigor técnico.', oag: ['F', 'K'] }
        }
      },
      'OA2': {
        texto: 'Diseña, fabrica y ensambla piezas y prototipos mecánicos utilizando software CAD 3D y técnicas de manufactura digital, aplicando criterios de ajuste y tolerancia.',
        ces: {
          '2.1': { texto: 'Modela piezas y ensambles en software CAD 3D, aplicando correctamente herramientas de dibujo, cotas y restricciones geométricas según especificaciones técnicas.', oag: ['B', 'H'] },
          '2.2': { texto: 'Genera planos técnicos con simbología, vistas y tolerancias normalizadas, respetando las normas ISO y ANSI de dibujo técnico.', oag: ['A', 'B'] },
          '2.3': { texto: 'Configura parámetros y ejecuta procesos de manufactura digital (impresión 3D, corte láser u otros), seleccionando materiales y verificando la calidad dimensional de las piezas.', oag: ['B', 'H'] },
          '2.4': { texto: 'Ensambla las piezas fabricadas en un prototipo mecánico funcional, comprobando ajustes, tolerancias y alineación, demostrando prolijidad, orden y cumplimiento de normas de seguridad.', oag: ['B', 'C'] }
        }
      },
      'OA3': {
        texto: 'Programa dispositivos electrónicos programables para el control de sistemas mecatrónicos, aplicando estructuras lógicas de programación y principios de automatización.',
        ces: {
          '3.1': { texto: 'Elabora códigos funcionales para el control de dispositivos electrónicos programables, aplicando estructuras básicas de control (secuencias, condicionales, bucles) según los requerimientos del sistema.', oag: ['B', 'C'] },
          '3.2': { texto: 'Desarrolla programas que integren sensores, actuadores y salidas de control, estableciendo relaciones entre las variables de entrada y salida del sistema.', oag: ['B', 'C'] },
          '3.3': { texto: 'Configura y prueba el funcionamiento del sistema programado, verificando el cumplimiento de la lógica establecida mediante simulación o ejecución práctica.', oag: ['B', 'C'] },
          '3.4': { texto: 'Documenta el código y resultados del programa, explicando su estructura y funcionamiento, evidenciando orden, claridad y responsabilidad en el trabajo técnico.', oag: ['A', 'C'] }
        }
      },
      'OA4': {
        texto: 'Integra sistemas robóticos básicos, configurando sensores, actuadores y controladores programables para ejecutar movimientos automáticos simples.',
        ces: {
          '4.1': { texto: 'Selecciona y conecta sensores, actuadores y controladores programables de acuerdo con los requerimientos del sistema robótico, aplicando correctamente los principios eléctricos y mecánicos básicos.', oag: ['B', 'H'] },
          '4.2': { texto: 'Configura los dispositivos del sistema robótico en función del programa de control establecido, verificando las señales de entrada y salida mediante pruebas funcionales.', oag: ['B', 'C'] },
          '4.3': { texto: 'Integra los distintos componentes del sistema robótico (estructura mecánica, electrónica de control y programación), comprobando el funcionamiento general del sistema y su coherencia operativa.', oag: ['B', 'C'] },
          '4.4': { texto: 'Realiza pruebas de funcionamiento y calibración del sistema robótico, ajustando parámetros de movimiento y tiempos de operación, demostrando responsabilidad, precisión y prolijidad en el trabajo.', oag: ['C', 'F'] }
        }
      },
      'OA5': {
        texto: 'Diseña y construye un proyecto mecatrónico funcional que combine diseño, fabricación, programación y control, documentando el proceso técnico y aplicando normas de seguridad.',
        ces: {
          '5.1': { texto: 'Planifica el proyecto mecatrónico, definiendo objetivos, recursos, tiempos, responsables y criterios de evaluación, aplicando métodos de organización del trabajo técnico.', oag: ['B', 'C'] },
          '5.2': { texto: 'Construye el prototipo mecatrónico integrando diseño, fabricación, programación y control, asegurando su funcionamiento y aplicando normas de seguridad y calidad.', oag: ['B', 'C'] },
          '5.3': { texto: 'Documenta el desarrollo del proyecto mediante informes técnicos, planos, códigos y registros fotográficos, comunicando en forma clara los resultados y conclusiones.', oag: ['A', 'B'] },
          '5.4': { texto: 'Presenta y defiende el proyecto de forma oral y práctica, argumentando las decisiones técnicas adoptadas, demostrando autonomía, responsabilidad y trabajo colaborativo.', oag: ['A', 'C'] }
        }
      }
    }
  }

},

  // ── Objetivos de Aprendizaje Genéricos ──────────────────────
  oag: {
  'A': 'Analizar información técnica de diversas fuentes para sustentar decisiones y procedimientos en el trabajo electrónico.',
  'B': 'Aplicar correctamente procedimientos, técnicas y protocolos en el trabajo con equipos y sistemas electrónicos.',
  'C': 'Usar herramientas, instrumentos y equipos con destreza y seguridad, considerando las especificaciones técnicas.',
  'D': 'Planificar y organizar el trabajo técnico con eficiencia, estableciendo prioridades y recursos necesarios.',
  'F': 'Cumplir con las normas de seguridad laboral y prevención de riesgos en todos los procedimientos técnicos.',
  'H': 'Comunicar en forma clara y técnica los procesos, resultados y procedimientos realizados (oral y escrito).',
  'I': 'Proponer mejoras, adaptaciones o innovaciones en sistemas o procesos electrónicos con perspectiva de eficiencia.',
  'J': 'Emprender iniciativas útiles para el lugar de trabajo, actuando con proactividad y responsabilidad profesional.',
  'K': 'Aplicar rigurosamente las normas de seguridad y verificar condiciones de riesgo antes y durante el trabajo.'
}

};

// ── Retrocompatibilidad: mantener MODULOS y OAG_DEFINICIONES ──
// (planificacion.html y material.html aún los usan directamente)
var MODULOS = CURRICULA_FULL['electronica'].modulos;
var OAG_DEFINICIONES = CURRICULA_FULL['electronica'].oag;
