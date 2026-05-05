// =============================================
// DATOS CURRICULARES — Especialidad Mecánica Industrial
// Archivo: js/curricula/tp/datos-mecanica-industrial.js
//
// Módulos cargados: MI1–MI5 (5 módulos)
//   3° Medio : MI1, MI2, MI3, MI4, MI5
//   4° Medio : (pendientes)
//
// Fuente: Programa de Estudio Mineduc — Especialidad Mecánica Industrial
// Menciones: Mantenimiento Electromecánico, Máquinas-Herramientas, Matricería
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['mecanica-industrial'] = {

  modulos: {

    // ══════════════════════════════════════════════════════
    // 3° MEDIO
    // ══════════════════════════════════════════════════════

    'MI1': {
      num:    'MI1',
      nombre: 'Soldadura Industrial',
      nivel:  '3M',
      horas:  190,
      oas: {
        'OA3': 'Unir y reparar elementos mediante actividades de corte y soldadura en posición plana, horizontal y vertical, con equipos de oxígeno y arco manual, soldadura TIG y MIG, utilizando adecuadamente las herramientas, las máquinas y los elementos de protección personal.',
        'OA6': 'Aplicar constantemente la normativa pertinente de higiene, de seguridad industrial y medioambiental correspondiente al tipo de faenas y al sector productivo, para prevenir riesgos de accidentes, enfermedades profesionales, daños ambientales y de los equipos.'
      },
      aes: {
        'OA1': {
          texto: 'Corta y suelda materiales ferrosos, utilizando oxiacetileno, respetando las normas de calidad, de higiene, de seguridad industrial y medioambiental.',
          ces: {
            'CE1': 'Selecciona y prepara los elementos y materiales necesarios para utilizar correctamente el equipo de corte y soldadura con oxígeno, de acuerdo a las indicaciones del manual del fabricante y a las normas de higiene, seguridad industrial y medioambiental.',
            'CE2': 'Regula las presiones de trabajo en los equipos, de acuerdo al tipo de material y las especificaciones técnicas del fabricante.',
            'CE3': 'Adecua la dosis de oxígeno y acetileno a las condiciones de corte y soldadura, de acuerdo al tipo de material y las especificaciones técnicas del fabricante, respetando la normativa de higiene y seguridad industrial.',
            'CE4': 'Ejecuta el trabajo de corte y soldadura con precisión y prolijidad, utilizando los implementos de seguridad apropiados y el manual de funcionamiento del fabricante.'
          }
        },
        'OA2': {
          texto: 'Une y repara piezas o conjuntos mecánicos, utilizando la soldadura con arco eléctrico SMAW en posición plana, horizontal y vertical, considerando las especificaciones técnicas del fabricante o plano de soldadura, respetando la normativa de higiene, de seguridad industrial y medioambiental.',
          ces: {
            'CE1': 'Prepara la superficie a soldar y las condiciones de seguridad individual y colectiva necesarias para poner en funcionamiento el equipo de soldadura, de acuerdo a las indicaciones técnicas del fabricante.',
            'CE2': 'Selecciona el material de aporte a utilizar, considerando las características de la pieza a unir o reparar, las especificaciones técnicas del manual del fabricante y las normas de higiene y seguridad adecuadas.',
            'CE3': 'Calibra el equipo de soldadura en concordancia con el tipo de material de aporte, sus espesores y las indicaciones del fabricante.',
            'CE4': 'Suelda piezas o conjuntos mecánicos en posición, velocidad y movimientos adecuados para obtener una aplicación uniforme y armónica, considerando los requerimientos específicos del trabajo y el respeto a las normas de seguridad industrial.'
          }
        },
        'OA3': {
          texto: 'Une y repara piezas o conjuntos mecánicos, utilizando la soldadura con arco eléctrico bajo gas protector con electrodo consumible y no consumible (MIG/MAG), respetando la normativa de higiene, de seguridad industrial y medioambiental.',
          ces: {
            'CE1': 'Prepara la superficie a soldar y las condiciones de seguridad individual y colectiva necesarias para poner en funcionamiento el equipo de soldadura y sus accesorios, de acuerdo a las indicaciones del manual del fabricante.',
            'CE2': 'Selecciona el material de aporte a utilizar, de acuerdo a las características de la pieza a unir o reparar y a las indicaciones del manual del fabricante, considerando las normas de higiene y seguridad.',
            'CE3': 'Calibra el equipo de soldadura en concordancia con el tipo de material de aporte y sus espesores, de acuerdo a las indicaciones del manual del fabricante.',
            'CE4': 'Regula la presión y velocidad de salida del electrodo consumible, considerando la intensidad eléctrica del equipo y el tipo de material a unir o reparar, de acuerdo a las indicaciones del manual del fabricante, respetando las normas de seguridad pertinentes.',
            'CE5': 'Suelda piezas o conjuntos mecánicos en posición, velocidad y movimientos adecuados para obtener una aplicación uniforme y armónica, de acuerdo a las indicaciones del manual del fabricante y a las normas de seguridad.',
            'CE6': 'Prepara la superficie a soldar y las condiciones de seguridad individual y colectivas necesarias para poner en funcionamiento el equipo de soldadura y sus accesorios, de acuerdo a las indicaciones del manual del fabricante.',
            'CE7': 'Selecciona los elementos adecuados para el trabajo a realizar (antorcha, tungsteno, difusor y boquilla cerámica), considerando las condiciones de calor, resistencia y medidas del material que se soldará, y las indicaciones del manual del fabricante, respetando las normas de seguridad y protección al medio ambiente.'
          }
        },
        'OA4': {
          texto: 'Une y repara piezas o conjuntos mecánicos, utilizando soldadura con arco eléctrico bajo gas protector con electrodo no consumible (TIG), respetando la normativa de seguridad y ambiental vigente.',
          ces: {
            'CE1': 'Calibra el equipo de soldadura en concordancia con el tipo de material de aporte y sus espesores, de acuerdo a las indicaciones del manual del fabricante.',
            'CE2': 'Regula la presión y flujo del gas, considerando la intensidad eléctrica del equipo, el tipo de material a unir o reparar, las indicaciones del manual del fabricante, el respeto a las normas de seguridad y protección al medioambiente.',
            'CE3': 'Suelda piezas o conjuntos mecánicos en posición, velocidad y movimientos adecuados para obtener una aplicación uniforme y armónica, de acuerdo a las indicaciones del manual del fabricante y a las normas de seguridad.'
          }
        }
      }
    },

    'MI2': {
      num:    'MI2',
      nombre: 'Mantenimiento de Herramientas',
      nivel:  '3M',
      horas:  190,
      oas: {
        'OA4': 'Realizar el mantenimiento preventivo de herramientas mecánicas, hidráulicas, neumáticas, eléctricas y manuales, y de útiles y componentes propios de la especialidad de Mecánica Industrial, de acuerdo a pautas de mantenimiento y especificaciones del fabricante.',
        'OA6': 'Aplicar constantemente la normativa pertinente de higiene, de seguridad industrial y medioambiental correspondiente al tipo de faenas y al sector productivo, para prevenir riesgos de accidentes, enfermedades profesionales, daños ambientales y de los equipos.'
      },
      aes: {
        'OA1': {
          texto: 'Programa y prepara actividades de mantenimiento preventivo de herramientas mecánicas, hidráulicas, neumáticas, eléctricas y manuales, y de útiles y componentes propios de la especialidad de Mecánica Industrial, respetando la normativa de higiene, de seguridad industrial y medioambiental.',
          ces: {
            'CE1': 'Define tareas a realizar, su secuencia y duración aproximada a partir de la lectura del plan de mantenimiento e instructivos del fabricante.',
            'CE2': 'Prepara los instrumentos, herramientas y materiales necesarios para la ejecución de un plan de mantención preventivo, considerando las pautas de mantenimiento establecidas por el fabricante y la normativa de higiene, seguridad industrial y medioambiental.',
            'CE3': 'Ejecuta procedimientos de seguridad necesarios para iniciar el desarrollo de un plan de mantenimiento preventivo de una herramienta o componente propio de la especialidad, respetando la normativa de higiene, seguridad industrial y medioambiental.'
          }
        },
        'OA2': {
          texto: 'Realiza mantenimiento preventivo de herramientas mecánicas, hidráulicas, neumáticas, eléctricas y manuales, y de útiles y componentes propios de la especialidad de Mecánica Industrial, respetando la normativa de higiene, de seguridad industrial y medioambiental.',
          ces: {
            'CE1': 'Inicia y termina el plan de mantenimiento preventivo de una máquina, realizando las tareas según una secuencia previamente establecida por el manual del fabricante, respetando las normas de seguridad y protección al medio ambiente.',
            'CE2': 'Realiza tareas de limpieza, engrase y sustitución de piezas, de acuerdo a pautas de mantenimiento y especificaciones del fabricante, considerando el respeto a la normativa de higiene, seguridad industrial y medioambiental.',
            'CE3': 'Verifica el correcto funcionamiento de las herramientas, posterior a la ejecución de su plan de mantenimiento preventivo, de acuerdo a las indicaciones del manual del fabricante y las normas de seguridad industrial.'
          }
        },
        'OA3': {
          texto: 'Realiza chequeo final del mantenimiento preventivo, considerando la bitácora de herramientas mecánicas, hidráulicas, neumáticas, eléctricas y manuales, y de útiles y componentes propios de la especialidad de Mecánica Industrial, respetando la normativa de higiene, de seguridad industrial y medioambiental.',
          ces: {
            'CE1': 'Comprueba la realización de las tareas de mantenimiento preventivo programadas, señalando los materiales e instrumentos utilizados para ello, de acuerdo a la bitácora de mantenimiento.',
            'CE2': 'Describe el estado y condiciones que presentan las herramientas una vez ejecutado su plan de mantenimiento preventivo, de acuerdo a las indicaciones del manual del fabricante.',
            'CE3': 'Señala sugerencias o recomendaciones para la ejecución de un plan de mantenimiento preventivo posterior, de acuerdo a las indicaciones del manual del fabricante, a la normativa de higiene y seguridad industrial.'
          }
        }
      }
    },

    'MI3': {
      num:    'MI3',
      nombre: 'Medición y Verificación',
      nivel:  '3M',
      horas:  190,
      oas: {
        'OA2': 'Realizar mediciones y controles de verificación de distintas magnitudes para la ejecución de trabajos de fabricación, mantenimiento y reparación de piezas y partes de conjuntos mecánicos y electromecánicos.'
      },
      aes: {
        'OA1': {
          texto: 'Mide y verifica magnitudes de piezas y conjuntos mecánicos y electromecánicos para la ejecución de trabajos de fabricación, utilizando planos e instrumentos de medición adecuados.',
          ces: {
            'CE1': 'Selecciona el instrumento de medición adecuado para la realización de trabajos de fabricación, considerando sus rangos de medida y precisión.',
            'CE2': 'Calibra o prepara el instrumento de medición, utilizando patrones de control estandarizados para cada instrumento entregado por el fabricante.',
            'CE3': 'Realiza mediciones de magnitudes con el instrumento adecuado a dicho control de verificación, considerando el uso adecuado indicado por el fabricante.',
            'CE4': 'Revisa los valores y rangos esperados del trabajo, de acuerdo a las especificaciones técnicas y tolerancias del conjunto mecánico y electromecánico.'
          }
        },
        'OA2': {
          texto: 'Mide y verifica magnitudes de piezas y conjuntos mecánicos y electromecánicos para la ejecución de trabajos de mantenimiento, utilizando planos e instrumentos de medición adecuados.',
          ces: {
            'CE1': 'Selecciona los instrumentos de medición adecuados para el control dimensional de una pieza o conjunto mecánico o electromecánico, considerando las pautas de mantenimiento del fabricante.',
            'CE2': 'Calibra o prepara el instrumento de medición, utilizando patrones de control estandarizados para cada instrumento entregado por el fabricante.',
            'CE3': 'Realiza control dimensional de las partes y piezas definiendo defectos, de acuerdo a planos o especificaciones técnicas.',
            'CE4': 'Registra la información obtenida del control dimensional de forma adecuada en bitácoras de mantenimiento de los conjuntos mecánicos o electromecánicos, de acuerdo a procedimientos establecidos.',
            'CE5': 'Verifica la coherencia de medidas de partes y piezas, de acuerdo a información registrada en la bitácora y las especificaciones técnicas del producto.'
          }
        },
        'OA3': {
          texto: 'Mide y verifica magnitudes de piezas y conjuntos mecánicos y electromecánicos para la ejecución de trabajos de reparación, utilizando planos e instrumentos de medición adecuados.',
          ces: {
            'CE1': 'Selecciona instrumentos de medición para la reparación de partes y piezas de conjuntos mecánicos y electromecánicos, de acuerdo al tipo de conjunto mecánico.',
            'CE2': 'Calibra o prepara el instrumento de medición, utilizando patrones de control estandarizados para cada instrumento entregado por el fabricante.',
            'CE3': 'Verifica la coherencia de medidas de partes y piezas y sus tolerancias, de acuerdo a la información entregada en su plano de fabricación.'
          }
        }
      }
    },

    'MI4': {
      num:    'MI4',
      nombre: 'Mecánica de Banco',
      nivel:  '3M',
      horas:  152,
      oas: {
        'OA5': 'Realizar trabajos de sujeción, pulido y ajuste, utilizando herramientas eléctricas y manuales, considerando las medidas de seguridad y de protección del medio ambiente.',
        'OA6': 'Aplicar constantemente la normativa pertinente de higiene, de seguridad industrial y medioambiental correspondiente al tipo de faenas y al sector productivo, para prevenir riesgos de accidentes, enfermedades profesionales, daños ambientales y de los equipos.'
      },
      aes: {
        'OA1': {
          texto: 'Realiza trabajos de sujeción de piezas y componentes mecánicos, utilizando herramientas eléctricas y manuales, considerando las medidas de seguridad y de protección del medio ambiente.',
          ces: {
            'CE1': 'Identifica los elementos de sujeción correctos, considerando las características de las piezas o componentes y sus posibilidades de contención, de acuerdo a las indicaciones del manual del fabricante.',
            'CE2': 'Prepara las herramientas, piezas o componentes y área de trabajo para la ejecución de un trabajo de sujeción, considerando normas de seguridad y protección del medio ambiente.',
            'CE3': 'Realiza trabajos de sujeción de piezas o componentes mecánicos con herramientas y elementos adecuados, de acuerdo a las indicaciones del manual del fabricante.',
            'CE4': 'Verifica resistencia de piezas o componentes posterior a la realización de los trabajos de sujeción, de acuerdo a las normas de calidad.',
            'CE5': 'Revisa el estado de herramientas antes de su utilización, de acuerdo a las indicaciones del manual del fabricante.'
          }
        },
        'OA2': {
          texto: 'Pule piezas y componentes mecánicos, utilizando herramientas eléctricas y manuales, considerando las medidas de seguridad y de protección del medio ambiente.',
          ces: {
            'CE1': 'Determina los elementos y herramientas necesarias para el pulido de partes o piezas mecánicas, considerando las imperfecciones del material y acabado solicitado en las especificaciones técnicas entregadas en planos.',
            'CE2': 'Ejecuta tareas de pulido de superficie, utilizando técnicas y herramientas apropiadas para el tipo de trabajo, respetando normas de seguridad, protección del medio ambiente y las indicaciones del manual del fabricante.',
            'CE3': 'Utiliza rugosímetro para medir la calidad de los trabajos de pulido realizados en una pieza o componente mecánico, de acuerdo a las normas de calidad.'
          }
        },
        'OA3': {
          texto: 'Ajusta piezas o componentes mecánicos, utilizando herramientas eléctricas y manuales bajo las medidas de seguridad y de protección del medio ambiente.',
          ces: {
            'CE1': 'Determina tipo de ajuste, considerando las características del material, las especificaciones técnicas del diseño y herramientas disponibles.',
            'CE2': 'Prepara las herramientas, piezas y área de trabajo para la ejecución de un trabajo de ajuste, considerando normas de seguridad y protección del medio ambiente.',
            'CE3': 'Realiza trabajo de ajuste entre dos piezas mecánicas, utilizando herramientas y elementos de protección personal adecuados, de acuerdo a las normas de seguridad.',
            'CE4': 'Verifica la holgura de las piezas ajustadas, con el instrumento apropiado, de acuerdo al tipo de juego solicitado en las especificaciones técnicas del fabricante.'
          }
        },
        'OA4': {
          texto: 'Aplica normas básicas de seguridad en el manejo de herramientas, máquinas y materiales, así como su orden y mantenimiento.',
          ces: {
            'CE1': 'Revisa estado de herramientas y/o máquinas antes de su utilización, de acuerdo a las indicaciones del manual del fabricante.',
            'CE2': 'Transporta y almacena adecuadamente las herramientas, previniendo accidentes personales y de terceros, de acuerdo a las normas de seguridad y del fabricante.',
            'CE3': 'Selecciona y utiliza adecuadamente las herramientas y máquinas para la realización de un trabajo, de acuerdo al tipo de trabajo y a las indicaciones del manual del fabricante.'
          }
        }
      }
    },

    'MI5': {
      num:    'MI5',
      nombre: 'Lectura de Manuales y Planos',
      nivel:  '3M',
      horas:  114,
      oas: {
        'OA1': 'Leer y utilizar especificaciones técnicas, planos elaborados con herramientas computacionales, lecturas de instrumentos análogos, y digitales y simbología, relacionados con el trabajo a realizar.',
        'OA7': 'Aplicar los procedimientos establecidos y las normativas nacionales e internacionales de fabricación que correspondan al tipo de producto o faena en ejecución.'
      },
      aes: {
        'OA1': {
          texto: 'Organiza las operaciones de mecanizado necesarias para la fabricación de una pieza, a partir de la lectura e interpretación de sus planos, considerando normas y procedimientos técnicos pertinentes.',
          ces: {
            'CE1': 'Identifica los requerimientos de material necesarios para la construcción de una pieza, a partir de la lectura e interpretación de los planos de fabricación.',
            'CE2': 'Define las máquinas a utilizar en un proceso de mecanizado, a partir de la lectura de la simbología técnica representada en un plano.',
            'CE3': 'Selecciona las herramientas necesarias para el mecanizado de un producto, considerando los materiales declarados en los planos de fabricación.',
            'CE4': 'Planifica las tareas de una operación de mecanizado, de acuerdo a las especificaciones técnicas solicitadas para dicho trabajo.',
            'CE5': 'Determina las dimensiones de partes y piezas de un producto a mecanizar, a partir de la lectura de sus planos de vistas y cortes.',
            'CE6': 'Identifica escalas de medidas de un producto, a partir de la lectura de sus planos de vistas y cortes.',
            'CE7': 'Detalla los componentes y materiales de piezas a mecanizar, de acuerdo a planos y especificaciones técnicas del fabricante.'
          }
        },
        'OA2': {
          texto: 'Elabora y lee planos y diagramas de circuitos eléctricos, neumáticos e hidráulicos de máquinas o equipos industriales, aplicando normas y procedimientos técnicos pertinentes.',
          ces: {
            'CE1': 'Lee planos de circuitos eléctricos, neumáticos e hidráulicos de máquinas o equipos industriales para realizar un mantenimiento preventivo, aplicando normas y procedimientos técnicos determinados por el fabricante.',
            'CE2': 'Realiza mediciones para calcular parámetros eléctricos neumáticos e hidráulicos básicos de un montaje en un panel de entrenamiento, utilizando instrumentos análogos y digitales adecuados, aplicando normas y procedimientos técnicos del fabricante.',
            'CE3': 'Elabora un plano de diagramas eléctricos neumáticos e hidráulicos en forma digital, de una máquina o equipo, a partir de la observación de circuitos montados en el panel de entrenamiento, señalando correctamente sus componentes, de acuerdo a las normas y procedimientos técnicos del fabricante.'
          }
        },
        'OA3': {
          texto: 'Realiza montaje de circuitos eléctricos, neumáticos e hidráulicos de máquinas o equipos industriales, a partir de la lectura de planos, aplicando normas y procedimientos técnicos determinados por el fabricante.',
          ces: {
            'CE1': 'Determina las funciones de los dispositivos de circuitos eléctricos, neumáticos e hidráulicos de máquinas o equipos industriales, considerando las especificaciones de su plano de fabricación.',
            'CE2': 'Conecta dispositivos de circuitos eléctricos, neumáticos e hidráulicos de máquinas o equipos industriales, de acuerdo a lo establecido en planos del fabricante, aplicando normas y procedimientos técnicos pertinentes.',
            'CE3': 'Verifica parámetros físicos (presión, fuerza, velocidad) de circuitos montados y chequea su funcionamiento correcto, considerando las especificaciones técnicas del fabricante, aplicando normas y procedimientos técnicos pertinentes.'
          }
        }
      }
    }

  }, // fin modulos

  // ── Objetivos de Aprendizaje Genéricos ──────────────────
  oag: {
    'A': 'Analizar información técnica de diversas fuentes para sustentar decisiones en el trabajo.',
    'B': 'Realizar las actividades de manera prolija, responsable y con atención al detalle.',
    'C': 'Usar herramientas, instrumentos y equipos con destreza y seguridad.',
    'D': 'Planificar y organizar el trabajo técnico con eficiencia.',
    'I': 'Proponer mejoras e innovaciones con perspectiva de eficiencia.',
    'K': 'Verificar condiciones de riesgo y aplicar normas de seguridad y medioambientales.'
  }

};
