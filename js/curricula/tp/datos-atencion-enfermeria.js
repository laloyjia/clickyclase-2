// =============================================
// DATOS CURRICULARES — Especialidad Atención de Enfermería
// Archivo: js/curricula/tp/datos-atencion-enfermeria.js
//
// Esta especialidad tiene 2 menciones:
//   · Mención Atención de Enfermería, mención Adulto Mayor
//   · Mención Atención de Enfermería, mención Enfermería
//
// Módulos cargados: 15 módulos · 40 AE · 221 CE
//   3° Medio común (AE1-AE5): 836 horas
//   4° Medio común (AE6): Prevención y control de infecciones
//   4° Medio Mención Adulto Mayor (AAM1-AAM6)
//   4° Medio Mención Enfermería (AEN1-AEN3)
//
// Fuente: Programa de Estudio Mineduc — DS 452/2013.
// Nota: el JSON oficial provisto no incluye el módulo común de
//       Emprendimiento y Empleabilidad (76 h); se puede agregar aparte.
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['atencion-enfermeria'] = {

  menciones: ['Adulto Mayor', 'Enfermería'],

  modulos: {
    "AE1": {
      "num": "AE1",
      "nombre": "Aplicación de cuidados básicos",
      "nivel": "3M",
      "horas": 228,
      "oas": {
        "OA1": "Aplicar cuidados básicos de enfermería, higiene y confort a personas en distintas etapas del ciclo vital, de acuerdo a principios técnicos y protocolos establecidos, brindando un trato digno, acogedor y coherente con los derechos y deberes del paciente."
      },
      "aes": {
        "OA1": {
          "texto": "Atiende integralmente y con los cuidados básicos de enfermería a las y los pacientes y a su familia según la etapa del ciclo vital, considerando las necesidades básicas, los derechos del paciente y la calidad de la atención en salud.",
          "ces": {
            "CE1": "Brinda atención y cuidados de enfermería a cada paciente y a su familia según la etapa del ciclo vital y de acuerdo a su condición de salud, considerando sus costumbres y tradiciones.",
            "CE2": "Realiza los procedimientos de enfermería a cada paciente de acuerdo a las necesidades básicas alteradas y a los estándares de calidad de la institución.",
            "CE3": "Instruye a cada paciente y a su familia sobre la atención y cuidados de enfermería a realizar, los factores de riesgo a considerar y las medidas de autocuidado a tomar en salud y enfermedad.",
            "CE4": "Selecciona los equipos y elementos necesarios para la atención, de acuerdo a las características de la o el paciente, al procedimiento y a las normas de la institución.",
            "CE5": "Atiende y aplica los cuidados de enfermería cumpliendo los principios de asepsia y antisepsia y respetando los derechos de cada paciente y de su familia.",
            "CE6": "Detecta signos y síntomas de alteración o anormalidad en el o la paciente durante la atención, de acuerdo a las normas establecidas en la institución.",
            "CE7": "Registra las atenciones y cuidados de enfermería brindados a cada paciente, ajustándose al sistema de registro del establecimiento y utilizando las TIC."
          }
        },
        "OA2": {
          "texto": "Ejecuta los procedimientos de higiene y confort a pacientes pediátricos y adultos, de acuerdo al plan de atención de enfermería, respetando la privacidad, el pudor y el protocolo establecido.",
          "ces": {
            "CE1": "Realiza los procedimientos de higiene y confort a cada paciente, de acuerdo al plan de atención de enfermería y a las necesidades alteradas.",
            "CE2": "Informa a cada paciente y a su familia sobre los procedimientos a realizar y solicita su colaboración de acuerdo al protocolo y a sus posibilidades.",
            "CE3": "Selecciona los equipos, materiales e insumos necesarios para la realización de los procedimientos, de acuerdo a la o el paciente y a las normas establecidas en la institución.",
            "CE4": "Realiza los procedimientos de higiene y confort a la o el paciente pediátrico y adulto, respetando su privacidad y pudor.",
            "CE5": "Aplica las normas de asepsia y antisepsia y los protocolos establecidos en las técnicas de higiene y confort realizados a los y las pacientes.",
            "CE6": "Detecta alteraciones del estado de la o el paciente y factores de riesgo que amenazan su seguridad y la del equipo de salud.",
            "CE7": "Refiere oportunamente a la o el profesional a cargo las alteraciones detectadas, los factores de riesgo presentes y la tasa de adhesión de la o el paciente al tratamiento.",
            "CE8": "Registra diariamente los procedimientos de enfermería realizados a cada paciente, de acuerdo al sistema establecido y a las normas de la institución.",
            "CE9": "Utiliza las TIC para el registro de las acciones de enfermería."
          }
        },
        "OA3": {
          "texto": "Realiza las actividades y tareas de prevención de alteración de las necesidades básicas, considerando las normas de calidad de atención y los derechos de las y los pacientes.",
          "ces": {
            "CE1": "Orienta a los y las pacientes y a sus familias en relación con los signos que indiquen alteración de las necesidades básicas, presencia de factores de riesgo y aplicación de medidas inseguras, durante la atención recibida.",
            "CE2": "Instruye a las y los pacientes y a sus familias sobre acciones de autocuidado, la prevención de enfermedades y la promoción de la salud, para favorecer su recuperación.",
            "CE3": "Realiza las actividades y tareas respetando los principios de seguridad y calidad de atención y los derechos de las y los pacientes.",
            "CE4": "Detecta los signos y síntomas en las y los pacientes que pueden indicar alteración de las necesidades básicas, factores de riesgo y medidas inseguras en el quehacer diario.",
            "CE5": "Informa oportunamente a la o el profesional de las alteraciones detectadas una vez evaluado el o la paciente, de acuerdo a las normas de la institución."
          }
        }
      }
    },
    "AE2": {
      "num": "AE2",
      "nombre": "Medición y control de parámetros básicos en salud",
      "nivel": "3M",
      "horas": 152,
      "oas": {
        "OA2": "Medir, controlar y registrar parámetros de salud de los pacientes, como peso, talla, temperatura, signos vitales y presión arterial, aplicando instrumentos de medición apropiados."
      },
      "aes": {
        "OA1": {
          "texto": "Controla los signos vitales de acuerdo a la indicación profesional, al plan de atención y necesidad de la o el paciente, considerando los principios de asepsia, antisepsia y seguridad.",
          "ces": {
            "CE1": "Informa y solicita colaboración a cada paciente para realizar diariamente el control de los signos vitales, de acuerdo a su condición y a las normas de la institución.",
            "CE2": "Controla los signos vitales a pacientes pediátricos y adultos, de acuerdo al plan de atención, respetando las normas y el protocolo establecido.",
            "CE3": "Detecta alteraciones de los parámetros controlados a cada paciente de acuerdo a la edad y a la condición de cada uno.",
            "CE4": "Informa oportunamente a la o el profesional sobre alteraciones detectadas en los signos vitales de cada paciente, de acuerdo a las normas.",
            "CE5": "Registra los parámetros medidos de acuerdo a la norma del establecimiento."
          }
        },
        "OA2": {
          "texto": "Efectúa control de antropometría a pacientes pediátricos y adultos, cumpliendo las normas establecidas y el protocolo definido en el establecimiento.",
          "ces": {
            "CE1": "Informa y solicita colaboración para realizar el control de peso, talla, circunferencia craneana, de cintura y torácica, de acuerdo al protocolo.",
            "CE2": "Realiza el control antropométrico a pacientes pediátricos y adultos, ajustándose al protocolo y resguardando su seguridad.",
            "CE3": "Detecta las alteraciones de los parámetros medidos de acuerdo a los valores de crecimiento y desarrollo esperados para una determinada edad y sexo.",
            "CE4": "Registra los parámetros medidos de acuerdo a la norma del establecimiento."
          }
        },
        "OA3": {
          "texto": "Organiza equipos, materiales e insumos, para realizar el control de signos vitales y antropometría a pacientes, de acuerdo a los protocolos establecidos.",
          "ces": {
            "CE1": "Prepara los insumos requeridos para el control de los signos vitales y la antropometría, de acuerdo a lo establecido en el manual de procedimientos.",
            "CE2": "Selecciona los equipos y materiales de acuerdo a la indicación recibida y a las características de la o el paciente.",
            "CE3": "Revisa y calibra los equipos de acuerdo a la indicación del fabricante y a la condición de la o el paciente.",
            "CE4": "Prepara las condiciones ambientales para realizar el control de signos y la antropometría, de acuerdo al riesgo de la o el paciente.",
            "CE5": "Limpia y desinfecta los equipos y materiales utilizados de acuerdo a las normas de asepsia y antisepsia."
          }
        }
      }
    },
    "AE3": {
      "num": "AE3",
      "nombre": "Promoción de la salud y prevención de la enfermedad",
      "nivel": "3M",
      "horas": 190,
      "oas": {
        "OA3": "Aplicar estrategias de promoción de salud, prevención de enfermedades, hábitos de alimentación saludable para fomentar una vida adecuada para la familia y comunidad de acuerdo a modelos definidos por las políticas de salud."
      },
      "aes": {
        "OA1": {
          "texto": "Realiza acciones de prevención de enfermedades en distintos grupos etarios, y promueve el modelo de salud familiar desde su nivel de competencias y de acuerdo a lo establecido por el MINSAL.",
          "ces": {
            "CE1": "Difunde, en la familia y en grupos organizados de la comunidad, los programas de prevención y promoción de la salud establecidos por el MINSAL.",
            "CE2": "Elabora folletería y otros medios de apoyo para difundir los programas de prevención de enfermedades y promoción de la salud del MINSAL.",
            "CE3": "Dicta charlas en la comunidad sobre estrategias de prevención y promoción de la salud, dando ejemplos de estilos de vida saludable.",
            "CE4": "Realiza visita domiciliaria con el equipo de salud, llevando material educativo sobre prevención y promoción de la salud.",
            "CE5": "Detecta los factores de riesgo para la salud al interior del hogar, tanto a nivel familiar como comunitario, en relación con los sistemas de alimentación, higiene y recreación, entre otros.",
            "CE6": "Registra las acciones realizadas durante la visita en los medios establecidos por la institución."
          }
        },
        "OA2": {
          "texto": "Ejecuta acciones de prevención de riesgos para la salud de las personas asociadas a la manipulación e ingesta de agua y alimentos, la disposición de residuos domiciliarios, la contaminación atmosférica y las condiciones de la vivienda, considerando los estándares de saneamiento básico.",
          "ces": {
            "CE1": "Explica a las personas acerca de los mecanismos de control de enfermedades infectocontagiosas asociadas a la manipulación e ingesta de agua y alimentos, la disposición de residuos domiciliarios, la contaminación atmosférica y las condiciones de la vivienda.",
            "CE2": "Ejecuta un programa de detección de los riesgos para la salud de las personas asociados a los factores medioambientales (encuestas, inspección, entrevistas, entre otros).",
            "CE3": "Redacta un informe sobre los problemas de salud detectados, originados por factores medioambientales, y lo entrega a los y las profesionales u organismos correspondientes.",
            "CE4": "Orienta a la comunidad sobre las redes de apoyo con que cuenta la localidad para el control de riesgos medioambientales."
          }
        },
        "OA3": {
          "texto": "Colabora en la ejecución del plan de salud comunal en relación con la prevención de problemas infectocontagiosos, digestivos, respiratorios, enfermedades crónicas, entre otros, establecidos por el MINSAL.",
          "ces": {
            "CE1": "Realiza acciones para implementar campañas de vacunación, refuerzo de lactancia materna, alimentación complementaria, higiene bucal, planificación familiar, entre otros, de acuerdo al plan de salud comunal y lo indicado por el MINSAL.",
            "CE2": "Detecta a la población inasistente al centro de salud y realiza citaciones en terreno, de acuerdo a las normas de dicho centro.",
            "CE3": "Difunde, en la población consultante, la importancia de acceder a las acciones de prevención de enfermedades y promoción de la salud que dispone el centro de salud."
          }
        }
      }
    },
    "AE4": {
      "num": "AE4",
      "nombre": "Higiene y bioseguridad del ambiente",
      "nivel": "3M",
      "horas": 190,
      "oas": {
        "OA4": "Mantener las condiciones sanitarias y de seguridad en las dependencias donde se encuentran las personas bajo su cuidado, de acuerdo a las normas sanitarias y de seguridad vigentes."
      },
      "aes": {
        "OA1": {
          "texto": "Aplica los procedimientos de aseo e higiene diariamente en la unidad de paciente y en su entorno más inmediato, de acuerdo a las normas sanitarias básicas de los centros de salud.",
          "ces": {
            "CE1": "Ejecuta las técnicas de limpieza y desinfección de la unidad de paciente de acuerdo a las normas sanitarias y a estándares del establecimiento.",
            "CE2": "Sustituye los elementos defectuosos o no higiénicos de la unidad de paciente, de acuerdo a las normas del establecimiento.",
            "CE3": "Detecta focos de riesgo sanitario en la unidad de paciente, en su entorno más inmediato o en el servicio, que sean posibles de corregir de acuerdo a las normas.",
            "CE4": "Utiliza diariamente, durante la atención de cada paciente, las barreras protectoras y las medidas de aislamiento establecidas en el plan de atención.",
            "CE5": "Informa oportunamente a la o el profesional de los riesgos detectados en el o la paciente y en su entorno inmediato (ambiente clínico).",
            "CE6": "Realiza las acciones indicadas para el control de los focos de riesgo detectados (residuos, vectores, roedores, entre otros)."
          }
        },
        "OA2": {
          "texto": "Mantiene un ambiente clínico seguro para pacientes durante el proceso de atención, aplicando las normas de seguridad de la institución.",
          "ces": {
            "CE1": "Aplica las medidas de seguridad y prevención de riesgos en el desarrollo de los procedimientos que realiza a cada paciente, de acuerdo a las normas de la institución.",
            "CE2": "Utiliza los elementos de seguridad en la atención de cada paciente y previene accidentes de acuerdo a lo establecido en la institución.",
            "CE3": "Detecta los factores que ponen en riesgo la recuperación y seguridad de cada paciente durante la entrega de turno.",
            "CE4": "Informa a su superior sobre los elementos de riesgo y las alteraciones detectadas en la unidad y en los elementos utilizados en la atención de pacientes.",
            "CE5": "Realiza la atención diaria cumpliendo antes, durante y al término de las tareas las normas de asepsia y antisepsia y de seguridad para cada paciente y el equipo de salud."
          }
        }
      }
    },
    "AE5": {
      "num": "AE5",
      "nombre": "Sistemas de registro e información en salud",
      "nivel": "3M",
      "horas": 76,
      "oas": {
        "OA6": "Registrar información, en forma digital y manual, relativa al control de salud de las personas bajo su cuidado, y relativa a procedimientos administrativos de ingreso, permanencia y egreso de establecimientos de salud o estadía, resguardando la privacidad de las personas."
      },
      "aes": {
        "OA1": {
          "texto": "Registra en forma digital o manual la información relativa al control de salud de las personas bajo su cuidado, según las normas vigentes.",
          "ces": {
            "CE1": "Verifica el sistema de registro establecido por la institución y solicita capacitación e inducción para su uso.",
            "CE2": "Registra los datos de pacientes en el sistema manual o digital, de acuerdo al protocolo.",
            "CE3": "Ingresa los controles de salud y procedimientos realizados a cada paciente, en forma veraz y ordenada, de acuerdo a las normas.",
            "CE4": "Archiva manual o digitalmente los datos de cada paciente en forma confidencial y segura.",
            "CE5": "Informa a la supervisora o el supervisor de omisiones y errores detectados en el sistema de registro de los datos de pacientes y propone soluciones de acuerdo a las normas."
          }
        },
        "OA2": {
          "texto": "Registra la información relativa a los procedimientos administrativos de ingreso, permanencia y egreso de sus pacientes.",
          "ces": {
            "CE1": "Completa los formularios de ingreso y egreso de cada paciente según las normas vigentes.",
            "CE2": "Ingresa al sistema de registro cada uno de los procedimientos realizados durante la atención que competen a su rol.",
            "CE3": "Colabora en mantener los datos de cada paciente en forma confidencial y segura, de acuerdo al protocolo.",
            "CE4": "Detecta errores u omisiones en los registros y los comunica oportunamente a la o el profesional y propone medidas correctivas que están a su alcance."
          }
        },
        "OA3": {
          "texto": "Usa las TIC en los procesos administrativos para la admisión y el egreso de pacientes, de acuerdo a las normas establecidas.",
          "ces": {
            "CE1": "Verifica las tecnologías de la información y la comunicación disponibles en la institución.",
            "CE2": "Aplica las TIC para el registro de datos y de atenciones a la o el paciente y para comunicarse con quien corresponda, de acuerdo a las normas de la institución."
          }
        }
      }
    },
    "AE6": {
      "num": "AE6",
      "nombre": "Prevención y control de infecciones",
      "nivel": "4M",
      "horas": 228,
      "oas": {
        "OA5": "Contribuir a la prevención y control de infecciones en las personas bajo su cuidado, aplicando normas de asepsia y antisepsia."
      },
      "aes": {
        "OA1": {
          "texto": "Brinda cuidados de enfermería respetando las normas de asepsia y antisepsia durante el proceso de atención de pacientes.",
          "ces": {
            "CE1": "Aplica las medidas de control de las infecciones asociadas a la atención de salud (IAAS), en la atención de pacientes, de acuerdo a lo establecido por la institución.",
            "CE2": "Detecta las alteraciones en el estado de la o el paciente que indican infecciones asociadas a su condición de salud.",
            "CE3": "Informa a la o el profesional los signos de infección detectados durante la atención de la o el paciente.",
            "CE4": "Instala las medidas de aislamiento y control de infecciones de acuerdo a la indicación profesional.",
            "CE5": "Explica a cada paciente y a su familia las medidas de control de infecciones aplicadas, considerando los deberes y derechos de cada paciente.",
            "CE6": "Cumple y hace cumplir a sus pares y a la familia de la o el paciente las medidas de control de infecciones, solicitando respetuosamente su colaboración."
          }
        },
        "OA2": {
          "texto": "Aplica, durante la atención de cada paciente, las barreras protectoras y las medidas de aislamiento establecidas en el plan de atención.",
          "ces": {
            "CE1": "Utiliza las barreras protectoras en la atención, de acuerdo al diagnóstico de cada paciente.",
            "CE2": "Elimina las barreras protectoras entre paciente y paciente de acuerdo a las normas de asepsia y antisepsia y al reglamento de residuos.",
            "CE3": "Informa a cada paciente y a su familia sobre el uso de las barreras protectoras y responde sus inquietudes y dudas.",
            "CE4": "Rotula la unidad de paciente con la indicación de aislamiento dada por el o la profesional.",
            "CE5": "Solicita stock de materiales e insumos para el cumplimiento del tipo de aislamiento indicado."
          }
        },
        "OA3": {
          "texto": "Realiza el lavado, preparación y esterilización de materiales e instrumental, de acuerdo a la normativa vigente y a lo determinado por el establecimiento.",
          "ces": {
            "CE1": "Descontamina y lava el instrumental y los materiales empleados durante la atención, de acuerdo a las normas establecidas.",
            "CE2": "Seca e inspecciona ocularmente el instrumental y material, de acuerdo al protocolo establecido para la selección o el descarte de este.",
            "CE3": "Prepara el instrumental y material seleccionado para esterilizar, de acuerdo a los protocolos establecidos.",
            "CE4": "Esteriliza el instrumental y material rotulado y clasificado, cumpliendo el protocolo según el método empleado.",
            "CE5": "Almacena material estéril en la central de esterilización, servicio y unidad de paciente, de acuerdo a las normas de esterilización.",
            "CE6": "Registra e informa a la o el profesional los materiales descartados y las alteraciones observadas durante el proceso de esterilización."
          }
        }
      }
    },
    "AAM1": {
      "num": "AAM1",
      "nombre": "Necesidades psicosociales del adulto mayor",
      "nivel": "4M",
      "horas": 76,
      "mencion": "Adulto Mayor",
      "oas": {
        "OA1": "Realizar actividades sociales y recreativas orientadas a los intereses, necesidades y características biopsicosociales de las personas adultas mayores, entregando apoyo personalizado, aplicando técnicas de motivación, seleccionando recursos y materiales apropiados y resguardando la seguridad individual y grupal."
      },
      "aes": {
        "OA1": {
          "texto": "Aplica técnicas de comunicación efectiva con el fin de conocer las características, habilidades, necesidades e intereses de los adultos mayores en relación con los ámbitos social y recreativo.",
          "ces": {
            "CE1": "Observa cómo se desenvuelve y cómo interactúa el adulto mayor con su familia y amigos.",
            "CE2": "Conversa con los adultos mayores a fin de detectar sus necesidades e intereses de interacción y recreación.",
            "CE3": "Mantiene un diálogo con el adulto mayor basado en la escucha activa y la empatía.",
            "CE4": "Estimula al adulto mayor a fortalecer la movilidad y la lectura, entre otras actividades recreacionales."
          }
        },
        "OA2": {
          "texto": "Planifica y programa actividades recreativas para el desarrollo integral del adulto mayor, de acuerdo a su motivación y condiciones de dependencia física y psíquica, considerando los recursos que brinda la comunidad, la situación ambiental, elementos de seguridad, materiales, vestuario y recursos económicos.",
          "ces": {
            "CE1": "Organiza y planifica las actividades recreacionales diarias del adulto mayor, de acuerdo a sus intereses y motivaciones.",
            "CE2": "Ejecuta actividades recreacionales específicamente diseñadas para el adulto mayor, considerando sus capacidades y limitaciones.",
            "CE3": "Acompaña al adulto mayor en actividades recreacionales y sociales de acuerdo a sus requerimientos y habilidades personales.",
            "CE4": "Aplica medidas de seguridad con el adulto mayor para el desarrollo de las actividades recreativas.",
            "CE5": "Refuerza las capacidades psíquicas y físicas del adulto mayor con actividades de su interés como lectura, debates, baile entre otras.",
            "CE6": "Evalúa la tolerancia del adulto mayor durante las actividades recreacionales.",
            "CE7": "Acompaña al adulto mayor y lo estimula a integrar grupos organizados en su comuna.",
            "CE8": "Instruye y orienta al adulto mayor sobre los beneficios de organismos públicos y privados (municipio, Sernatur, cajas de compensación, entre otros)."
          }
        }
      }
    },
    "AAM2": {
      "num": "AAM2",
      "nombre": "Orientación familiar para el cuidado del adulto mayor",
      "nivel": "4M",
      "horas": 76,
      "mencion": "Adulto Mayor",
      "oas": {
        "OA2": "Informar a las familias respecto del estado integral del adulto mayor de acuerdo a los requerimientos de la familia y 2. a los procedimientos y protocolos de la institución, utilizando técnicas de comunicación efectiva."
      },
      "aes": {
        "OA1": {
          "texto": "Mantiene informada a la familia respecto del cuidado integral del adulto mayor y de las normas y protocolos de la institución.",
          "ces": {
            "CE1": "Aplica una pauta de entrevistas para conocer la realidad familiar y personal del adulto mayor, sus intereses y necesidades.",
            "CE2": "Informa sobre el proceso de envejecimiento al adulto mayor y a su grupo familiar mediante charlas realizadas en una sala de clases o en terreno.",
            "CE3": "Instruye a la familia acerca de los cuidados a brindar al adulto mayor."
          }
        },
        "OA2": {
          "texto": "Involucra y hace participar a la familia en el programa de mantención de las capacidades del adulto mayor.",
          "ces": {
            "CE1": "Explica los estándares del cuidado del adulto mayor de acuerdo a las leyes vigentes en el país.",
            "CE2": "Orienta a la familia sobre las medidas de apoyo y mantención de las capacidades del adulto mayor.",
            "CE3": "Instruye sobre las medidas de seguridad a aplicar en la atención del adulto mayor.",
            "CE4": "Participa activamente con la familia en preparar las condiciones de la vivienda, vestuario, alimentación, entre otras, para el cuidado del adulto mayor."
          }
        }
      }
    },
    "AAM3": {
      "num": "AAM3",
      "nombre": "Alimentación y nutrición del adulto mayor",
      "nivel": "4M",
      "horas": 114,
      "mencion": "Adulto Mayor",
      "oas": {
        "OA3": "Atender las necesidades de alimentación y nutrición del adulto mayor, preparando, presentando y sirviendo el alimento de acuerdo al grado de autonomía de la persona y sus preferencias, aplicando los procedimientos y técnicas ergonómicas pertinentes, resguardando los principios nutricionales, dietéticos, de higiene y de seguridad. 3."
      },
      "aes": {
        "OA1": {
          "texto": "Fomenta la participación activa del adulto mayor en su alimentación y nutrición mediante la colaboración constante en su actividad diaria (dentro de su hogar o en el establecimiento de atención especializada).",
          "ces": {
            "CE1": "Detecta las preferencias que el adulto mayor demuestra por ciertos tipos de alimentos y sus preparaciones.",
            "CE2": "Integra al adulto mayor a las actividades diarias relativas a la preparación de los alimentos (pelar y lavar verduras, dividir productos cárneos y verduras, etc.)",
            "CE3": "Acondiciona el lugar dispuesto para las horas de alimentación del adulto mayor, para favorecer la aceptación de los alimentos (sala, temperatura, compañía, música, montaje de mesa, etc.)",
            "CE4": "Presenta al adulto mayor los alimentos con una consistencia y temperatura adecuada para su aceptación y consumo seguro.",
            "CE5": "Selecciona la vajilla y equipo necesario para alimentar al adulto mayor de acuerdo a su condición de salud y capacidad.",
            "CE6": "Organiza en el hogar o establecimiento actividades de apoyo permanente para mantener la autonomía en la alimentación y nutrición del adulto mayor.",
            "CE7": "Registra las cantidades y preparaciones aceptadas por el adulto mayor durante la alimentación."
          }
        },
        "OA2": {
          "texto": "Explica al adulto mayor la importancia y los beneficios de una alimentación equilibrada para la conservación de la salud.",
          "ces": {
            "CE1": "Prepara actividades lúdicas (visitas a huertas, ferias gastronómicas, entre otras) que incentiven al adulto mayor a llevar una alimentación equilibrada.",
            "CE2": "Colabora con la o el nutricionista u otro profesional en la elaboración de la minuta diaria, incluyendo combinaciones de alimentos, de acuerdo a los intereses y preferencias de la o el paciente y considerando las indicaciones médicas y nutricionales para adultos mayores con distintos grados de autonomía.",
            "CE3": "Integra a la familia en las instancias de alimentación, fomentando el diálogo, la participación activa y el apego al adulto mayor."
          }
        },
        "OA3": {
          "texto": "Prepara alimentos para el adulto mayor cumpliendo las normas sanitarias e higiénicas exigidas y utilizando los implementos adecuados.",
          "ces": {
            "CE1": "Aplica técnicas de preparación de alimentos del adulto mayor, en su hogar o institución, de acuerdo a las indicaciones médicas y los requerimientos nutricionales.",
            "CE2": "Cumple las normas sanitarias, de higiene y de seguridad exigidas para la manipulación y preparación de alimentos.",
            "CE3": "Utiliza los implementos adecuados para la preparación de alimentos del adulto mayor."
          }
        },
        "OA4": {
          "texto": "Apoya y realiza las actividades de alimentar y servir los alimentos al adulto mayor según nivel de autonomía, cumpliendo indicaciones médicas y nutricionales y considerando técnicas de presentación y de atención postalimentación.",
          "ces": {
            "CE1": "Aplica técnicas de alimentación de acuerdo al nivel de autonomía del adulto mayor y/o utilizando otra vía alimentaria, según indicación médica.",
            "CE2": "Considera factores ambientales y elementos de seguridad antes, durante y después de la alimentación del adulto mayor, según su nivel de autonomía.",
            "CE3": "Utiliza técnica de presentación de alimentos, de acuerdo al nivel de autonomía y vía de alimentación.",
            "CE4": "Aplica la técnica correspondiente para servir los alimentos, de acuerdo a las normas de bienestar y seguridad establecidas.",
            "CE5": "Prepara y sirve los alimentos al adulto mayor, considerando los aspectos de motivación, estimulación y afecto, para que este se sienta acogido.",
            "CE6": "Ejecuta técnicas de aseo bucal y dental postalimentación, de acuerdo al nivel de autonomía y los procedimientos indicados para el aseo de cavidades, preocupándose de la satisfacción y comodidad del adulto mayor.",
            "CE7": "Ordena y limpia el lugar de alimentación, usando los implementos requeridos, resguardando su adecuado uso y almacenamiento."
          }
        }
      }
    },
    "AAM4": {
      "num": "AAM4",
      "nombre": "Atención de primeros auxilios",
      "nivel": "4M",
      "horas": 76,
      "mencion": "Adulto Mayor",
      "oas": {
        "OA4": "Atender al adulto mayor en situaciones de emergencia y accidentes, aplicando técnicas de primeros auxilios y protocolos establecidos, resguardando la seguridad individual y del grupo."
      },
      "aes": {
        "OA1": {
          "texto": "Colabora en la atención del adulto mayor frente a alteraciones graves de su condición de salud, con los recursos disponibles y de acuerdo a sus competencias y a los protocolos de la institución, e informa a quien corresponda, según la norma.",
          "ces": {
            "CE1": "Detecta los signos de alarma y de alteración grave de la condición de salud del adulto mayor, en el hogar, ELEAM u otro tipo de instituciones o en la vía pública.",
            "CE2": "Informa detalladamente a la familia y a la o el profesional responsable sobre los signos de alarma detectados, de acuerdo al protocolo de la institución.",
            "CE3": "Solicita colaboración para asistir al adulto mayor en espera de un o una profesional médico, una enfermera o un enfermero.",
            "CE4": "Realiza las acciones inmediatas de su competencia que permitan mantener estable al adulto mayor, sin agravar las alteraciones detectadas, hasta la llegada de la o el profesional a cargo.",
            "CE5": "Colabora en equipo en la atención brindada al adulto mayor y en el control del entorno más inmediato.",
            "CE6": "Asiste al equipo médico con los insumos, materiales e implementos requeridos para la atención de urgencia, resguardando la seguridad individual y del grupo.",
            "CE7": "Registra las acciones de su competencia en el sistema establecido por la institución.",
            "CE8": "Acompaña y acoge a la familia durante la recuperación de la emergencia o el accidente, y promueve la interacción con el o la profesional a cargo."
          }
        },
        "OA2": {
          "texto": "Colabora en la aplicación de los primeros auxilios en caso de accidentes, considerando las indicaciones médicas y de enfermería, el nivel de autonomía y la condición clínica del adulto mayor, e informa a quien corresponda, según la norma.",
          "ces": {
            "CE1": "Detecta oportunamente los riesgos de accidente presentes en el hogar, ELEAM u otro tipo de institución o en la vía pública, de acuerdo a las características y patologías de base del adulto mayor.",
            "CE2": "Selecciona los elementos, insumos y el equipamiento requerido para entregar los primeros auxilios al adulto mayor.",
            "CE3": "Aplica las técnicas de primeros auxilios de acuerdo al tipo de accidente, utilizando los elementos e insumos disponibles en el lugar del acontecimiento y resguardando la propia seguridad y la del afectado.",
            "CE4": "Solicita e indica la colaboración necesaria para asistir al adulto mayor en espera de ser trasladado a un centro de salud.",
            "CE5": "Coordina en el hogar, ELEAM, institución o vía pública, la colaboración de terceros para una asistencia y traslado eficiente.",
            "CE6": "Informa detalladamente a la familia y a la o el profesional el accidente sufrido por el adulto mayor y las acciones que se llevaron a cabo, de acuerdo al protocolo de la institución."
          }
        }
      }
    },
    "AAM5": {
      "num": "AAM5",
      "nombre": "Administración de medicamentos",
      "nivel": "4M",
      "horas": 114,
      "mencion": "Adulto Mayor",
      "oas": {
        "OA5": "Administrar productos farmacológicos de aplicación sencilla, tales como grageas y gotas por vía oral, aplicación de ungüentos en la piel e inyecciones intramusculares para diferentes tratamientos, de acuerdo a las instrucciones del profesional médico que los ha prescrito."
      },
      "aes": {
        "OA1": {
          "texto": "Prepara medicamentos indicados al adulto mayor, de acuerdo a la prescripción médica e indicación de enfermería, aplicando los principios de asepsia y antisepsia, la técnica descrita en el manual de procedimientos de enfermería y las indicaciones establecidas por el laboratorio farmacéutico.",
          "ces": {
            "CE1": "Lee diariamente en los registros de cada adulto mayor la prescripción de medicamentos que corresponde administrar por vía natural e inyectable.",
            "CE2": "Revisa el stock de medicamentos prescritos, la conservación y la vigencia de los mismos, de acuerdo a la indicación del laboratorio farmacéutico.",
            "CE3": "Identifica alteraciones en la presentación y/o vigencia de los fármacos disponibles en el stock, de acuerdo a las indicaciones del laboratorio farmacéutico.",
            "CE4": "Ordena los medicamentos de acuerdo a la vía natural e inyectable de administración (oral, tópica o mucosa, intramuscular, etc.), y a la presentación del fármaco.",
            "CE5": "Selecciona los materiales requeridos para la administración, según la forma de presentación del medicamento.",
            "CE6": "Realiza diariamente el monitoreo y seguimiento al tratamiento farmacológico, de acuerdo a la prescripción médica.",
            "CE7": "Aplica los principios de asepsia y antisepsia durante la preparación del medicamento.",
            "CE8": "Informa al adulto mayor de la prescripción médica y aclara dudas, con el propósito de que adhiera al tratamiento."
          }
        },
        "OA2": {
          "texto": "Administra medicamentos por vía natural e intramuscular, aplicando los principios de asepsia y antisepsia y las técnicas y las normas descritas en el manual de procedimientos de enfermería, de acuerdo a los protocolos establecidos y a las indicaciones médicas y bajo supervisión profesional.",
          "ces": {
            "CE1": "Pesquisa alteraciones en las vías naturales de administración de los medicamentos que impiden su adecuada administración, y lo comunica al profesional a cargo.",
            "CE2": "Prepara física y emocionalmente al paciente para administrar el medicamento, informándolo y resguardando su privacidad, de acuerdo a los protocolos establecidos y a las indicaciones médicas y bajo supervisión profesional.",
            "CE3": "Administra medicamentos por vía natural (oral, tópica o mucosa), o inyectable (intramuscular), de acuerdo a los estándares vigentes para la práctica clínica en enfermería para el adulto mayor, a los protocolos establecidos y a las indicaciones médicas y bajo supervisión profesional.",
            "CE4": "Observa la reacción de los adultos mayores a los medicamentos administrados y notifica al profesional que prescribió estos productos farmacológicos.",
            "CE5": "Registra la hora, la vía y el lugar y la reacción del adulto mayor a los medicamentos administrados, de acuerdo a los protocolos de atención."
          }
        }
      }
    },
    "AAM6": {
      "num": "AAM6",
      "nombre": "Higiene y confort del adulto mayor",
      "nivel": "4M",
      "horas": 76,
      "mencion": "Adulto Mayor",
      "oas": {
        "OA6": "Atender las necesidades de higiene y confort de las personas adultos mayores durante su permanencia en establecimientos de larga estadía o domicilio, aplicando los procedimientos y técnicas ergonómicas pertinentes, respetando su privacidad y grado de autonomía, creando ambientes adecuados a sus necesidades y brindando una acogida favorable en el acompañamiento."
      },
      "aes": {
        "OA1": {
          "texto": "Asiste al adulto mayor en las actividades de higiene y confort, respetando su privacidad y fomentando el autocuidado y la independencia, de acuerdo a su capacidad.",
          "ces": {
            "CE1": "Detecta los hábitos higiénicos del adulto mayor y promueve el cuidado de su estado de salud.",
            "CE2": "Acompaña al adulto mayor en la recolección de los útiles de aseo y en el traslado a la sala de baño.",
            "CE3": "Colabora con el adulto mayor en los procedimientos de higiene y confort, de acuerdo a sus hábitos y reglamentos de la institución.",
            "CE4": "Acondiciona la sala de baño o la habitación (temperatura, elementos de apoyo, biombos, otros) para la realización de los procedimientos de higiene y confort.",
            "CE5": "Asegura la privacidad, el pudor y la seguridad del adulto mayor, y se mantiene alerta a los requerimientos que surjan durante los procedimientos.",
            "CE6": "Detecta alteraciones en la condición del adulto mayor, tales como la calidad de la piel y anexos cutáneos, grado de movilidad y alteración visual, entre otros, de acuerdo al protocolo de la institución.",
            "CE7": "Informa oportunamente a la o el profesional a cargo sobre las alteraciones detectadas y los factores de riesgo presentes en la salud del adulto mayor.",
            "CE8": "Aplica las normas de asepsia y antisepsia, y los protocolos establecidos en las técnicas de higiene y confort.",
            "CE9": "Realiza registro diario de los procedimientos de higiene y confort y las alteraciones detectadas de acuerdo al sistema establecido y a las normas de la institución."
          }
        },
        "OA2": {
          "texto": "Aplica técnicas de conservación y fortalecimiento de la movilidad y autonomía del adulto mayor durante la aplicación de técnicas de higiene y confort en la sala de baño o habitación del adulto.",
          "ces": {
            "CE1": "Evalúa las capacidades motoras, visuales y auditivas del adulto mayor, de acuerdo al estado de salud.",
            "CE2": "Diseña un plan de ejercicios de apoyo y fortalecimiento de las capacidades motoras del adulto mayor mediante bailes, paseos al aire libre u otras actividades.",
            "CE3": "Informa al profesional a cargo acerca de las alteraciones motoras, visuales y auditivas detectadas en el adulto mayor, y promueve su incorporación en programas del sistema previsional de salud para la obtención de elementos como lentes, audífonos y bastones, entre otros.",
            "CE4": "Realiza un plan de ejercicios asistidos diariamente, en su hogar o de acuerdo al programa de la institución.",
            "CE5": "Registra la tolerancia y reacciones del adulto mayor durante el plan de ejercicios desarrollados.",
            "CE6": "Integra a la familia en el plan de fortalecimiento de la capacidad motora del adulto mayor."
          }
        }
      }
    },
    "AEN1": {
      "num": "AEN1",
      "nombre": "Técnicas básicas de enfermería y del Programa Nacional de Inmunizaciones",
      "nivel": "4M",
      "horas": 228,
      "mencion": "Enfermería",
      "oas": {
        "OA1": "Realizar acciones de apoyo al tratamiento y rehabilitación de la salud a pacientes pediátricos y adultos, ambulatorios y hospitalizados, como controlar signos vitales, tomar muestras para exámenes de laboratorio, administrar medicamentos por diferentes vías (intramuscular, endovenosa, piel y mucosas), hacer curaciones básicas, de acuerdo con protocolos establecidos y las indicaciones de profesionales del área médica."
      },
      "aes": {
        "OA1": {
          "texto": "Ejecuta las indicaciones médicas para el tratamiento y rehabilitación de la salud de pacientes pediátricos y adultos hospitalizados, de acuerdo a los protocolos establecidos.",
          "ces": {
            "CE1": "Revisa diariamente el plan de tratamiento médico y de atención de enfermería establecido en la ficha de la o el paciente.",
            "CE2": "Selecciona los equipos, materiales e insumos necesarios para el tratamiento de cada paciente, de acuerdo a la indicación dada. 1.3. Controla los signos vitales, de acuerdo a las normas establecidas, procurando establecer una comunicación empática con el o la paciente e indicando acciones para la prevención de enfermedades y promoción de la salud de acuerdo a las indicaciones de los o las profesionales responsables del área.",
            "CE3": "Realiza la toma de las muestras de los exámenes de laboratorio de acuerdo a la indicación médica y a las normas del laboratorio.",
            "CE4": "Administra los medicamentos a pacientes adultos y pediátricos por vía natural y parenteral, aplicando los principios de asepsia y antisepsia, y respetando los protocolos de la institución.",
            "CE5": "Realiza curaciones básicas de acuerdo a los protocolos establecidos, aplicando los principios de asepsia y antisepsia.",
            "CE6": "Manipula el material, el instrumental y los equipos de acuerdo a los estándares vigentes y en forma segura.",
            "CE7": "Cumple las indicaciones médicas, de acuerdo a los protocolos establecidos y respetando los principios de asepsia y antisepsia.",
            "CE8": "Registra las indicaciones médicas realizadas en el sistema de registro impuesto por la institución."
          }
        },
        "OA2": {
          "texto": "Aplica acciones de vacunación, de acuerdo al Programa Nacional de Inmunizaciones, resguardando el bienestar de las personas y el cumplimiento de las normas y protocolos del Ministerio de Salud, siempre bajo la supervisión de un o una profesional del área de la salud.",
          "ces": {
            "CE1": "Chequea la ficha clínica, carné de salud o de vacunaciones de la persona a vacunar, verificando la presencia de un adulto a cargo en caso de que se trate de un menor de edad, de acuerdo los procedimientos establecidos por el Ministerio de Salud y bajo la supervisión de una o un profesional del área.",
            "CE2": "Identifica las condiciones individuales que constituyen contraindicación definitiva para administrar una determinada vacuna, así como aquellas en que se debe postergar la vacunación o adoptar precauciones especiales, revisando los documentos de información disponibles y bajo la supervisión de una o un profesional del área de la salud.",
            "CE3": "Comunica a la persona a vacunar o al adulto a cargo, en caso de menor de edad, sobre la importancia preventiva de dicha vacuna, las contraindicaciones y cuidados a considerar una vez realizada la inmunización.",
            "CE4": "Prepara a la persona a vacunar o al adulto acompañante, en caso de menor de edad, de acuerdo al procedimiento del Ministerio de Salud y bajo la supervisión de una o un profesional del área.",
            "CE5": "Prepara y manipula las vacunas, respetando los principios de asepsia y antisepsia, de acuerdo al procedimiento del Ministerio de Salud y bajo la supervisión de una o un profesional del área.",
            "CE6": "Aplica la vacuna y/o asiste en la aplicación, seleccionando la vía de administración y el sitio anatómico y la técnica adecuada en el caso de aquellas cuya vía de administración es parenteral, según el tipo de vacuna, edad y condición general de la persona a vacunar, considerando el procedimiento establecido por el Ministerio de Salud y bajo la supervisión de una o un profesional del área.",
            "CE7": "Registra la información de la vacunación en los soportes pertinentes de acuerdo a los procedimientos establecidos por el Ministerio de Salud y bajo la supervisión de una o un profesional del área."
          }
        },
        "OA3": {
          "texto": "Refuerza las indicaciones médicas dadas para el tratamiento y rehabilitación de la salud de pacientes pediátricos y adultos ambulatorios, estableciendo una comunicación efectiva, respetuosa y responsable.",
          "ces": {
            "CE1": "Verifica en la ficha de cada paciente la receta, la orden de examen y el carné de alta, y las indicaciones médicas entregadas durante la atención.",
            "CE2": "Orienta a la o el paciente y a la familia en el cumplimiento de las indicaciones dadas por el o la médico tratante, de acuerdo a los protocolos.",
            "CE3": "Aclara las dudas de la o el paciente y de la familia sobre el tratamiento y el proceso de rehabilitación indicados por el o la médico tratante.",
            "CE4": "Aplica las técnicas de comunicación efectiva (empatía, escucha activa, mirar a los ojos, etc.) al conversar con pacientes y familia, entregando información sobre las acciones de prevención y promoción de la salud de acuerdo a las indicaciones de los y las profesionales responsables del área.",
            "CE5": "Verifica con cada paciente y su familia la comprensión del tratamiento y las indicaciones dadas por la o el médico tratante."
          }
        },
        "OA4": {
          "texto": "Colabora con el equipo de salud en situaciones de emergencia médica en pacientes hospitalizados, de acuerdo al protocolo definido.",
          "ces": {
            "CE1": "Detecta en los y las pacientes hospitalizados signos de alarma y de emergencia médica.",
            "CE2": "Informa los signos de urgencia médica a la o el profesional, de acuerdo al protocolo de la institución.",
            "CE3": "Realiza las acciones indicadas en situación de emergencia médica, de acuerdo a las normas y a los protocolos establecidos.",
            "CE4": "Colabora de manera integrada con el equipo en atención de primeros auxilios de acuerdo a la indicación recibida.",
            "CE5": "Asiste al equipo con los insumos, materiales y equipos requeridos para la atención de urgencia.",
            "CE6": "Registra las acciones de su competencia en el sistema establecido por la institución."
          }
        }
      }
    },
    "AEN2": {
      "num": "AEN2",
      "nombre": "Atención en servicios de urgencia y primeros auxilios",
      "nivel": "4M",
      "horas": 228,
      "mencion": "Enfermería",
      "oas": {
        "OA2": "Monitorear e informar al personal de salud el estado de pacientes que se encuentran en condiciones críticas de salud o con procedimientos invasivos, conforme a procedimientos establecidos y las indicaciones entregadas por el profesional médico o de enfermería."
      },
      "aes": {
        "OA1": {
          "texto": "Vigila el contexto clínico de pacientes en estado crítico o que han sido sometidos a procedimientos invasivos, de acuerdo a los estándares vigentes y a las indicaciones entregadas, e informa sobre posibles alteraciones a los o las profesionales.",
          "ces": {
            "CE1": "Observa permanentemente el estado de los y las pacientes que se encuentran en condiciones críticas o con riesgo vital.",
            "CE2": "Detecta en los y las pacientes los signos y síntomas de riesgo y las complicaciones de su estado de salud.",
            "CE3": "Informa al o a la profesional sobre alteraciones en el estado de salud de los y las pacientes, de acuerdo a los protocolos de la institución.",
            "CE4": "Reúne los equipos básicos del tratamiento de urgencia, tales como equipos de ventilación mecánica y monitores cardiovasculares.",
            "CE5": "Colabora con los profesionales en el manejo de equipos médicos críticos, de acuerdo a los protocolos."
          }
        },
        "OA2": {
          "texto": "Colabora con el equipo de salud para brindar atención de urgencia a pacientes hospitalizados, de acuerdo a los estándares de la institución.",
          "ces": {
            "CE1": "Realiza la preparación de los equipos y materiales para la atención de urgencia, de acuerdo a los procedimientos y normas de la institución.",
            "CE2": "Cumple las indicaciones médicas y de enfermería, respetando las precauciones universales, los protocolos y las normas de seguridad de la o el paciente, y reportando a los y las profesionales mediante los registros e instancias establecidas.",
            "CE3": "Detecta los signos de complicación de la lesión o daño durante la atención de urgencia brindada a cada paciente y según las técnicas aplicadas, reportando a los y las profesionales mediante los registros e instancias establecidas.",
            "CE4": "Mantiene el control de sus tareas durante la atención de urgencia, cumpliendo los protocolos definidos."
          }
        },
        "OA3": {
          "texto": "Aplica con eficacia la atención básica de primeros auxilios, como parte del equipo responsable de la atención de la o el paciente, de acuerdo a las normas y procedimientos estándares.",
          "ces": {
            "CE1": "Evalúa la condición general, estado de conciencia, condición respiratoria y circulatoria de la o el paciente que sufre un accidente dentro del hospital.",
            "CE2": "Realiza la preparación de los equipos y materiales para la atención de primeros auxilios, de acuerdo a los procedimientos y normas de la institución.",
            "CE3": "Realiza la atención básica de primeros auxilios, de acuerdo al tipo de daño o lesión (contusión, heridas, hemorragias, quemaduras, lesiones de partes duras, intoxicaciones, obstrucción de vías aérea, convulsiones, asfixia, paros cardiorrespiratorio), considerando los protocolos definidos.",
            "CE4": "Reporta el accidente o incidente a los y las profesionales mediante los registros e instancias establecidas, cumpliendo con los protocolos.",
            "CE5": "Cumple permanentemente con los principios de asepsia y antisepsia definidos para la atención de urgencia."
          }
        }
      }
    },
    "AEN3": {
      "num": "AEN3",
      "nombre": "Preparación del entorno clínico",
      "nivel": "4M",
      "horas": 76,
      "mencion": "Enfermería",
      "oas": {
        "OA3": "Preparar las instalaciones, equipos, instrumentos e insumos para la atención de salud de acuerdo al tipo de procedimiento a realizar y a las indicaciones entregadas por los profesionales clínicos, teniendo en consideración principios de asepsia y antisepsia, de seguridad y prevención de riesgos biomédicos."
      },
      "aes": {
        "OA1": {
          "texto": "Instala la unidad de paciente con los equipos y materiales requeridos para la hospitalización según la patología diagnosticada.",
          "ces": {
            "CE1": "Realiza la desinfección terminal de la unidad de paciente, de acuerdo al protocolo.",
            "CE2": "Implementa la unidad de paciente con los equipos y materiales requeridos para su atención, según el cuadro diagnosticado.",
            "CE3": "Inspecciona y calibra los equipos, materiales e instalaciones en la unidad de paciente.",
            "CE4": "Detecta desperfectos en el funcionamiento de los equipos, materiales y unidades de hospitalización de pacientes.",
            "CE5": "Aplica las medidas correctivas en la unidad de paciente y reemplaza el equipamiento defectuoso.",
            "CE6": "Registra en el libro de novedades los desperfectos de la unidad y el equipamiento dispuesto en el servicio para la atención de pacientes.",
            "CE7": "Avisa al o a la profesional a cargo sobre los deterioros detectados en la unidad y en el equipamiento del servicio."
          }
        },
        "OA2": {
          "texto": "Selecciona los insumos, materiales y equipos necesarios para realizar la atención de enfermería indicada, de acuerdo a cada paciente, los riesgos biomédicos y las condiciones de seguridad.",
          "ces": {
            "CE1": "Inspecciona los stocks críticos de insumos, materiales y equipos requeridos para la atención de enfermería, verificando su calidad y buen estado.",
            "CE2": "Recolecta los insumos, materiales y equipos necesarios, de acuerdo al procedimiento a realizar.",
            "CE3": "Repone la falta de materiales y equipos, de acuerdo a las normas del servicio.",
            "CE4": "Somete a desinfección los materiales y equipos que no se esterilizan.",
            "CE5": "Descarta los insumos utilizados de acuerdo a la normativa y al reglamento de residuos.",
            "CE6": "Utiliza sistemas de control de inventarios de insumos, materiales y equipos, y los mantiene actualizados, de acuerdo a los protocolos establecidos."
          }
        }
      }
    }
  }

};
