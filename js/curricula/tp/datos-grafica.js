// =============================================
// DATOS CURRICULARES — Especialidad Gráfica
// Archivo: js/curricula/tp/datos-grafica.js
//
// Módulos cargados: GR1–GR8 + GR10 + GR11 (10 módulos)
//   3° Medio : GR1, GR2, GR3, GR4, GR10 (Taller Diseño Gráfico), GR11 (Modelación e Impresión 3D)
//   4° Medio : GR5, GR6, GR7, GR8
//
// Fuente: Programa de Estudio Mineduc — Especialidad Gráfica
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['grafica'] = {

  modulos: {

    // ══════════════════════════════════════════════════════
    // 3° MEDIO
    // ══════════════════════════════════════════════════════

    'GR1': {
      num:    'GR1',
      nombre: 'Verificación y Preparación de Archivos Digitales',
      nivel:  '3M',
      horas:  228,
      oas: {
        'OA1': 'Diagramar y editar imágenes y textos originales, utilizando software gráficos, verificando el cumplimiento de las exigencias del diseño y acorde a los requerimientos técnicos de los diversos procesos en las áreas gráficas establecidos en la orden de trabajo.'
      },
      aes: {
        'OA1': {
          texto: 'Verifica los archivos digitales y los originales de acuerdo a los procedimientos y las normas de calidad establecidas para el proceso de pre-impresión, manejando tecnologías de la información, comunicación y notificando los resultados.',
          ces: {
            'CE1': 'Comprueba que el material recibido (archivos digitales y análogos) esté completo y sin daños con respecto a la orden de trabajo.',
            'CE2': 'Detecta los errores contenidos en archivos digitales, aplicando un programa de verificación (preflight) y control visual de fotografías, tipografías, vínculos y colores.',
            'CE3': 'Corrige errores básicos, utilizando las herramientas digitales de verificación, manejando tecnologías de la información y comunicación.',
            'CE4': 'Elabora informes de identificación de errores y los comunican a las personas que corresponden.'
          }
        },
        'OA2': {
          texto: 'Arma y edita imágenes, vectores y textos de acuerdo a las indicaciones de las órdenes de trabajo y los procesamientos establecidos en la reproducción gráfica.',
          ces: {
            'CE1': 'Coloca imágenes y textos de acuerdo a prismados e indicaciones del cliente.',
            'CE2': 'Define la resolución de imágenes, según los requisitos de impresión y considerando el factor de ampliación.',
            'CE3': 'Edita y retoca imágenes, vectores, textos y colores según las instrucciones del cliente y las restricciones del proceso productivo.',
            'CE4': 'Transforma el color de archivos a cuatricromía mediante perfiles ICC y restricciones de la impresión.',
            'CE5': 'Aplica sobreimpresión y calados, según los requisitos de impresión.'
          }
        }
      }
    },

    'GR2': {
      num:    'GR2',
      nombre: 'Preparación de la Máquina Impresora',
      nivel:  '3M',
      horas:  228,
      oas: {
        'OA3': 'Seleccionar y acondicionar las materias primas e insumos (tintas, tipo y tamaño de sustrato, entre otros) de acuerdo a la orden de trabajo, manuales técnicos del fabricante y estándares de calidad establecidos.',
        'OA4': 'Regular máquinas de impresión (tipográficas, offset de pliego y bobinas, flexo y serigráficas), de acuerdo a la orden de trabajo, manuales técnicos de quienes los fabrican, materias primas, insumos y estándares de calidad y seguridad establecidos.',
        'OA7': 'Realizar operaciones de mantenimiento básico, limpieza, lubricación y reemplazo de elementos fungibles, a diferentes tipos de máquinas o equipos de pre-impresión, impresión y postimpresión, de acuerdo con los manuales de fabricación y las normas de seguridad.'
      },
      aes: {
        'OA1': {
          texto: 'Prepara la máquina para entrar en funcionamiento de acuerdo a las indicaciones de fabricación y aplicando criterios de seguridad.',
          ces: {
            'CE1': 'Acciona y coloca en funcionamiento máquinas impresoras de acuerdo a indicaciones de fabricación y del manual de operación, resguardando la seguridad personal.',
            'CE2': 'Ejecuta acciones y procedimientos de preparación de máquinas, cumpliendo con las normas de prevención de riesgos y seguridad laboral.',
            'CE3': 'Limpia y ajusta la máquina impresora de acuerdo a las indicaciones de fabricación antes de la puesta en marcha cumpliendo con las normas de prevención de riesgos y seguridad laboral y cuidado del medio ambiente.',
            'CE4': 'Lubrica máquinas impresoras de acuerdo a las indicaciones de fabricación y los manuales técnicos de operación, cumpliendo con las normas de prevención de riesgos y seguridad laboral y cuidado del medio ambiente.'
          }
        },
        'OA2': {
          texto: 'Prepara dispositivos de alimentación del sustrato a la máquina según la orden de trabajo, tamaño del sustrato, y evaluando las condiciones del entorno del trabajo que permitan prevenir situaciones de riesgo.',
          ces: {
            'CE1': 'Maneja adecuada y racionalmente materiales e insumos propios de los procesos de impresión, según la orden de trabajo, normas de seguridad y cuidado del medio ambiente.',
            'CE2': 'Prepara y ajusta dispositivos y unidades de alimentación de las máquinas impresoras a pliegos o rollos, de acuerdo a las recomendaciones de fabricación y previniendo situaciones de riesgo.',
            'CE3': 'Prepara el sustrato para alimentar la impresora, de acuerdo al tipo de impresora y según la orden de trabajo y utilizando los elementos de protección personal.'
          }
        },
        'OA3': {
          texto: 'Prepara unidades impresoras y de salida de la máquina según la orden de trabajo, y utilizando los elementos de protección personal según la normativa correspondiente.',
          ces: {
            'CE1': 'Prepara y ajusta unidades impresoras de las máquinas, efectuando tareas de montaje y limpieza de matrices impresoras y ajustando sus elementos según las recomendaciones de fabricación, los requerimientos de seguridad y cuidado del medio ambiente.',
            'CE2': 'Maneja sistemas abastecedores de tinta, según el tipo de máquina impresora y de acuerdo a las indicaciones de fabricación, cumpliendo con las normas de prevención de riesgos, seguridad laboral y cuidado del medio ambiente.',
            'CE3': 'Prepara diversas unidades de entintaje, de acuerdo a las tecnologías y máquinas impresoras, según las recomendaciones de fabricación, cumpliendo con las normas de prevención de riesgos, seguridad laboral y cuidado del medio ambiente.',
            'CE4': 'Prepara y ajusta los dispositivos de salida del sustrato en máquinas impresoras, controlando los procesos de postimpresión en línea, según las recomendaciones de fabricación.',
            'CE5': 'Toma las medidas necesarias para prevenir situaciones de riesgo, utilizando los elementos de protección personal según la normativa correspondiente.'
          }
        }
      }
    },

    'GR3': {
      num:    'GR3',
      nombre: 'Impresión del Producto Gráfico',
      nivel:  '3M',
      horas:  228,
      oas: {
        'OA5': 'Realizar la impresión del producto, controlando la calidad, limpieza y color, así como los ajustes de la máquina impresora y la salida del producto hasta obtener las condiciones exigidas en la orden de trabajo, según estándares establecidos y normas de seguridad.',
        'OA7': 'Realizar operaciones de mantenimiento básico, limpieza, lubricación y reemplazo de elementos fungibles, a diferentes tipos de máquinas o equipos de pre-impresión, impresión y postimpresión, de acuerdo con los manuales de los fabricantes y las normas de seguridad.'
      },
      aes: {
        'OA1': {
          texto: 'Prepara la impresión, controlando y ajustando la imagen impresa, hasta obtener las condiciones exigidas según la orden de trabajo y utilizando eficientemente los recursos.',
          ces: {
            'CE1': 'Aplica responsablemente normas y dispositivos de seguridad en las operaciones de impresión según requerimientos de fabricación.',
            'CE2': 'Evalúa visualmente el registro de imagen y color del impreso, de acuerdo a la prueba de color.',
            'CE3': 'Ajusta los mecanismos de registro y de impresión de imagen que aseguren una óptima reproducción según el tipo de sustrato y la máquina impresora.',
            'CE4': 'Obtiene las primeras pruebas de impresión, consiguiendo calce, limpieza y calidad de la imagen, y utilizando eficientemente los materiales.',
            'CE5': 'Corrige defectos en los ajustes de impresión con precisión, de acuerdo al visto bueno y/o la prueba de color.'
          }
        },
        'OA2': {
          texto: 'Imprime controlando visual e instrumentalmente la calidad del producto, de acuerdo a indicaciones de la orden de trabajo, el uso óptimo de insumos y la aplicación de estándares de calidad.',
          ces: {
            'CE1': 'Imprime controlando el impreso, logrando la aprobación del cliente bajo los estándares de producción de la empresa.',
            'CE2': 'Supervisa el proceso de impresión de forma visual e instrumental, para conseguir una calidad homogénea durante el tiraje de acuerdo a los estándares y las normas vigentes.',
            'CE3': 'Controla la limpieza, color y mantiene el registro de la imagen en el impreso, de acuerdo a original o prueba de color entregado en la orden de trabajo.',
            'CE4': 'Corrige fallas y problemas de impresión durante la tirada, aplicando con precisión acciones correctivas para obtener un producto de calidad.',
            'CE5': 'Verifica las cargas de tinta en el impreso y mantiene valores densitométricos en el tiraje, midiendo las tiras de control de impresión, según las normas y los estándares vigentes.',
            'CE6': 'Registra adecuadamente los datos del proceso y del producto impreso en un documento de producción, según la orden de trabajo.'
          }
        },
        'OA3': {
          texto: 'Abastece la máquina impresora con materia prima e insumos para el proceso de impresión, utilizando eficientemente los materiales y disponiendo cuidadosamente los desechos.',
          ces: {
            'CE1': 'Abastece de tinta la máquina impresora, según las condiciones y las necesidades del tiraje, utilizando los recursos en forma racional.',
            'CE2': 'Abastece y alimenta la máquina impresora de sustrato para evitar interrupciones en la producción.',
            'CE3': 'Utiliza los insumos en las cantidades indicadas, para optimizar eficientemente los recursos y cuidando el medio ambiente.',
            'CE4': 'Vierte los desechos de impresión en contenedores habilitados para tal efecto conforme a las normas medioambientales para evitar la contaminación.',
            'CE5': 'Finaliza la impresión, dejando la máquina impresora en óptimas condiciones de limpieza y funcionamiento, según las indicaciones de fabricación.'
          }
        },
        'OA4': {
          texto: 'Realiza el mantenimiento preventivo durante y una vez finalizada la impresión, según recomendaciones de fabricación y normas de seguridad.',
          ces: {
            'CE1': 'Interpreta el plan de mantenimiento preventivo básico de la máquina impresora recomendado por la fábrica en el manual de operación.',
            'CE2': 'Ejecuta el mantenimiento preventivo básico conforme a las instrucciones y recomendaciones de fabricación, usando las herramientas y los elementos apropiados.',
            'CE3': 'Realiza la limpieza y lubricación de la máquina impresora con responsabilidad y seguridad, de acuerdo a las especificaciones de fabricación y según las pautas de trabajo internas de la empresa.',
            'CE4': 'Registra las tareas efectuadas de mantenimiento en un documento para tal efecto y los comunican a la persona que corresponde.'
          }
        }
      }
    },

    'GR4': {
      num:    'GR4',
      nombre: 'Materiales e Insumos de la Industria Gráfica',
      nivel:  '3M',
      horas:  152,
      oas: {
        'OA3': 'Seleccionar y acondicionar las materias primas e insumos (tintas, tipo y tamaño de sustrato, entre otros) de acuerdo a la orden de trabajo, manuales técnicos del fabricante y estándares de calidad establecidos.'
      },
      aes: {
        'OA1': {
          texto: 'Verifica y maneja sustratos en la máquina para la impresión según la orden de trabajo, utilizando eficientemente los insumos para los procesos productivos.',
          ces: {
            'CE1': 'Selecciona adecuadamente los tipos de sustratos para diversos productos, de acuerdo a las características ópticas y mecánicas, la tecnología de impresión, el uso eficiente y la orden de trabajo.',
            'CE2': 'Reconoce correctamente familias de papeles de acuerdo a las normas de calidad vigentes, las tecnologías de impresión y los procesos de reproducción.',
            'CE3': 'Controla las características ópticas y mecánicas de diversos sustratos, utilizando instrumentos apropiados según las necesidades de impresión, de la orden de trabajo y de la máquina impresora.',
            'CE4': 'Maneja, calcula y dimensiona tamaños de papel de manera eficiente en formatos nacionales e internacionales de acuerdo a los equipos de impresión y la orden de trabajo.',
            'CE5': 'Verifica que el sustrato presente el tratamiento necesario para obtener la calidad de impresión esperada, que permita optimizar el material.'
          }
        },
        'OA2': {
          texto: 'Verifica y maneja tintas en la máquina para la impresión según la orden de trabajo, y características del sustrato, disponiendo cuidadosamente los desechos, en una perspectiva de eficiencia energética y cuidado ambiental.',
          ces: {
            'CE1': 'Selecciona adecuadamente la tinta de acuerdo a la tecnología de impresión y a las necesidades del producto impreso, según la orden de trabajo.',
            'CE2': 'Mezcla tintas, logrando tonos de color según muestras e indicaciones de la orden de trabajo.',
            'CE3': 'Prepara la tinta para la impresión, controlando sus propiedades reológicas, según la tecnología de impresión y de acuerdo al tipo y tamaño del sustrato.',
            'CE4': 'Prepara la tinta para la impresión, controlando sus propiedades para optimizar el correcto secado, según la eficiencia energética, el proceso de impresión y de acuerdo al tipo de sustrato.',
            'CE5': 'Vierte los desechos de tinta en contenedores habilitados conforme a las normas medioambientales para evitar la contaminación.'
          }
        },
        'OA3': {
          texto: 'Verifica y maneja variados insumos utilizados en las tecnologías de impresión, según la orden de trabajo, y utilizándolos eficientemente.',
          ces: {
            'CE1': 'Selecciona adecuadamente insumos y materiales necesarios para la impresión como: solventes, lubricantes, accesorios y otros elementos, según el proceso, sus diferencias, propiedades técnicas y cuidado del medio ambiente.',
            'CE2': 'Aplica y utiliza insumos y materiales gráficos con cuidado y eficiencia según los elementos especificados en una orden de trabajo, como productos de limpieza, solventes, lubricantes, accesorios, entre otros.',
            'CE3': 'Manipula y abastece de los materiales e insumos con responsabilidad, según orden de trabajo y aplicando las normas de seguridad y cuidado del medio ambiente.'
          }
        }
      }
    },

    'GR10': {
      num:    'GR10',
      nombre: 'Taller Diseño Gráfico',
      nivel:  '3M',
      horas:  114,
      oas: {
        'OA5': 'Realizar trabajos de diseño gráfico, que ofrezcan soluciones de comunicación visual en diversos medios y soportes, a través de la integración de diversas variables asociadas a las problemáticas comunicacionales tales como el contexto, requerimientos, usuario, medio, normativas y al manejo de un amplio repertorio de herramientas y tecnologías análogas y digitales, que le permiten articular soluciones a problemáticas de Diseño para la Información, Diseño para la Comercialización y Diseño para la Interacción en sus distintos sustratos.',
        'OA6': 'Aplicar constantemente la normativa pertinente de higiene, de seguridad industrial y medioambiental correspondiente al tipo de sustrato y al sector productivo, para prevenir riesgos de enfermedades profesionales, accidentes, daños ambientales y de los equipos.'
      },
      aes: {
        'OA1': {
          texto: 'Realiza el diseño de diferentes piezas gráficas, favoreciendo la comunicación visual en diversos medios y soportes.',
          ces: {
            'CE1': 'Identifica los elementos básicos del Diseño Gráfico.',
            'CE2': 'Identifica y prepara las herramientas y/o materiales para la realización de una pieza gráfica, considerando normas de seguridad y protección del medio ambiente.',
            'CE3': 'Identifica el software adecuado para la realización de la pieza gráfica solicitada en orden de trabajo.',
            'CE4': 'Realiza el diseño de diferentes piezas gráficas según orden de trabajo.'
          }
        },
        'OA2': {
          texto: 'Realiza Diseño editorial identificando sus características y utilidades en el mercado local.',
          ces: {
            'CE1': 'Reconoce diferentes estilos de diseño editorial.',
            'CE2': 'Realiza diseño editorial identificando sus características.'
          }
        },
        'OA3': {
          texto: 'Realiza diseño de afiches para diferentes soportes y sistemas de impresión.',
          ces: {
            'CE1': 'Identifica las características del comportamiento del color según sistema de impresión.',
            'CE2': 'Obtiene matrices según sistema de impresión y sus características de reproducción.'
          }
        }
      }
    },

    'GR11': {
      num:    'GR11',
      nombre: 'Modelación e Impresión 3D',
      nivel:  '3M',
      horas:  4,
      oas: {
        'OA_3D': 'Integrar conocimientos de Modelación e Impresión 3D en la especialidad de Gráfica, ofreciendo aprendizajes relevantes en cuanto al diseño de piezas gráficas personalizadas de gran impacto, manejando tecnologías de modelado, slicing e impresión, y aplicando normas de seguridad y gestión ambiental.'
      },
      aes: {
        'OA1': {
          texto: 'Nivel 1 — A.1. Reconocer los fundamentos de la impresión 3D, según normas establecidas de materialidad, seguridad y gestión ambiental, manejando las tecnologías de la información y comunicación.',
          ces: {
            'CE1': 'Tipos de Impresión 3D: FDM (Fusión por Deposición Modelada) vs. Resina (SLA/DLP).',
            'CE2': 'El Flujo de Trabajo (Workflow): Diseño → Modelado → Laminado → Impresión.',
            'CE3': 'Conceptos de Diseño para Fabricación (DfM): Espesor de pared, voladizos (overhangs), soportes.'
          }
        },
        'OA2': {
          texto: 'Nivel 1 — A.2. Reconoce Impresoras 3D, materiales e insumos, y tecnologías de impresión mediante la lectura y estudio de manuales técnicos evaluando su pertinencia.',
          ces: {
            'CE1': 'Identificar tipos de impresoras 3D e insumos según las exigencias de cada pieza gráfica.',
            'CE2': 'Identifica los formatos de archivo utilizados en la impresión 3D y su secuencialidad.',
            'CE3': 'Identificar espacios apropiados para el correcto trabajo de las impresoras, junto con las herramientas necesarias y normas de seguridad establecidas.'
          }
        },
        'OA3': {
          texto: 'Nivel 1 — A.3. Modelado Básico a partir de Vectores 2D, extrusión y elevación a 3D, mediante reconocimiento de herramientas y software especializados en modelado 3D, para la obtención de archivos (G-code) para la impresión 3D.',
          ces: {
            'CE1': 'Creación de vectores 2D, cierre de curvas, unificación de trazos y optimización para extrusión de piezas gráficas.',
            'CE2': 'Operaciones Booleanas: Unión, diferencia y corte de sólidos para generar formas gráficas complejas a partir de formas simples (2D), para piezas 3D.',
            'CE3': 'Diseñar piezas con detalles gráficos integrados como grabados o relieves, comprendiendo la estructura de un archivo STL y su relevancia en la formación de una pieza gráfica en 3D.',
            'CE4': 'Comprobación y Reparación de Errores en la Malla: Detección de agujeros y caras invertidas, uso de herramientas de reparación y exportación final: generación del archivo STL (.stl) o OBJ (.obj) con la escala correcta.'
          }
        },
        'OA4': {
          texto: 'Nivel 2 — T.4. Modelado Constructivo por Combinación de Geometrías, Confirmación y Exportación del Archivo STL.',
          ces: {
            'CE1': 'Operaciones Booleanas: Unión, diferencia y corte de sólidos para generar formas complejas a partir de primitivas.',
            'CE2': 'Concepto de Malla 3D: Triángulos, aristas y vértices. Mallas Manifold vs. Non-Manifold.',
            'CE3': 'Comprobación y Reparación de Errores en la Malla: Detección de agujeros y caras invertidas (uso de herramientas de reparación, ej. Meshmixer o la función de reparación del slicer).',
            'CE4': 'Exportación Final: Generación del archivo STL (.stl) o OBJ (.obj) con la escala correcta.'
          }
        }
      }
    },

    // ══════════════════════════════════════════════════════
    // 4° MEDIO
    // ══════════════════════════════════════════════════════

    'GR5': {
      num:    'GR5',
      nombre: 'Encuadernación del Producto Impreso',
      nivel:  '4M',
      horas:  152,
      oas: {
        'OA6': 'Realizar la postimpresión de los productos, operando máquinas de terminación y de corte de sustratos, procesando el material impreso para que cumpla con la orden de trabajo, con los estándares de calidad y las normas de seguridad requeridos.',
        'OA7': 'Realizar operaciones de mantenimiento básico, limpieza, lubricación y reemplazo de elementos fungibles, a diferentes tipos de máquinas o equipos de preimpresión, impresión y postimpresión, de acuerdo con los manuales de los fabricantes y las normas de seguridad.'
      },
      aes: {
        'OA1': {
          texto: 'Ejecuta los procesos de corte en guillotina, de acuerdo a la orden de trabajo, las particularidades de cada producto, utilizando los elementos de protección personal según la normativa correspondiente.',
          ces: {
            'CE1': 'Prepara las materias primas y productos auxiliares, evaluando las características de calidad según las indicaciones de la orden de trabajo.',
            'CE2': 'Prepara la guillotina, estableciendo los parámetros del corte y sincronizando el sistema de alimentación y salida, de acuerdo al producto final.',
            'CE3': 'Ejecuta el programa de corte, identificando los defectos y aplicando las soluciones, de acuerdo al producto.',
            'CE4': 'Realiza la limpieza y mantenimiento preventivo de la guillotina, interpretando el manual de operación y aplicando las medidas de seguridad y protección previstas.',
            'CE5': 'Toma las medidas necesarias para prevenir situaciones de riesgo, utilizando los elementos de protección personal según la normativa correspondiente.'
          }
        },
        'OA2': {
          texto: 'Ejecuta los procesos de plegado mecánico del producto, según las indicaciones de la orden de trabajo y aplicando normas de seguridad.',
          ces: {
            'CE1': 'Regula la plegadora determinando los parámetros de plegado, registro y control de la máquina.',
            'CE2': 'Realiza el plegado identificando los defectos y aplicando las soluciones.',
            'CE3': 'Prepara los mecanismos de apilado y salida de la plegadora, deduciendo los procesos de almacenamiento según indicaciones de la orden de trabajo.',
            'CE4': 'Realiza la limpieza y mantenimiento preventivo de la plegadora, interpretando la documentación técnica y aplicando las medidas de seguridad y protección previstas.'
          }
        },
        'OA3': {
          texto: 'Efectúa los procesos de encuadernación de costura alambre, rústica y en tapa dura, de acuerdo a la orden de trabajo, las particularidades de cada producto, y resguardando su seguridad.',
          ces: {
            'CE1': 'Realiza el alzado, aplicando las especificaciones técnicas del producto e indicaciones de la orden de trabajo.',
            'CE2': 'Realiza la costura o pegado, ajustando los parámetros indicados en la orden de trabajo y aplicando las características del producto que hay que encuadernar.',
            'CE3': 'Ajusta la línea de encuadernación, ajustando las estaciones y los módulos que se van a utilizar, de acuerdo al producto a encuadernar.',
            'CE4': 'Realiza la encuadernación del producto, aplicando las especificaciones técnicas según orden de trabajo.',
            'CE5': 'Regula la guillotina trilateral, estableciendo los parámetros de corte y el control de la máquina, de acuerdo a la orden de trabajo.',
            'CE6': 'Realiza la limpieza y mantenimiento preventivo de la máquina de encuadernación, identificando la documentación técnica y aplicando las medidas de seguridad.'
          }
        }
      }
    },

    'GR6': {
      num:    'GR6',
      nombre: 'Imposición de Archivos y Obtención de Prueba de Color',
      nivel:  '4M',
      horas:  228,
      oas: {
        'OA1': 'Diagramar y editar imágenes y textos originales, utilizando software gráficos, verificando el cumplimiento de las exigencias del diseño y acorde a los requerimientos técnicos de los diversos procesos en las áreas gráficas establecidos en la orden de trabajo.',
        'OA2': 'Obtener una prueba de color, película, matriz de impresión e impreso digital, aplicando controles de calidad de acuerdo a normas vigentes.'
      },
      aes: {
        'OA1': {
          texto: 'Impone digitalmente páginas y pliegos de acuerdo a la orden de trabajo para obtener una prueba de imposición, manejando tecnologías de la información y comunicación.',
          ces: {
            'CE1': 'Realiza digitalmente el montaje del archivo o imposición de páginas con precisión, considerando formatos de impresión, características de sustratos y operaciones de postimpresión a realizar, de acuerdo a las especificaciones de la orden de trabajo, manejando tecnologías de la información y comunicación.',
            'CE2': 'Obtiene una prueba impresa de montaje o imposición digital (improof), controlando visualmente elementos de referencia para la impresión y terminación según la orden de trabajo y las características de las máquinas de impresión y terminación, para detectar posibles errores y dar aviso a quien corresponda.',
            'CE3': 'Archiva el trabajo realizado para su posterior proceso, según las normas de formatos digitales vigentes y la compatibilidad del flujo de trabajo de pre-impresión.'
          }
        },
        'OA2': {
          texto: 'Elabora una prueba de color digital de contrato, según los requisitos de impresión y las normas vigentes, realizando las tareas de manera prolija, y cumpliendo con los estándares de calidad.',
          ces: {
            'CE1': 'Evalúa visualmente la conformidad de la prueba de color, según la orden de trabajo y los requisitos del cliente y de impresión, para detectar posibles errores y avisar a quien corresponda.',
            'CE2': 'Controla la prueba de color de forma colorimétrica y certifica que cumple con las normas de calidad vigentes.',
            'CE3': 'Mide con espectrofotómetro y software de calibración, para permitir la obtención de una prueba de color certificada.'
          }
        }
      }
    },

    'GR7': {
      num:    'GR7',
      nombre: 'Salida del Archivo a Matriz Impresora e Impresión Digital',
      nivel:  '4M',
      horas:  228,
      oas: {
        'OA2': 'Obtener una prueba de color, película, matriz de impresión e impreso digital, aplicando controles de calidad de acuerdo a normas vigentes.',
        'OA7': 'Realizar operaciones de mantenimiento básico, limpieza, lubricación y reemplazo de elementos fungibles, a diferentes tipos de máquinas o equipos de pre-impresión, impresión y postimpresión, de acuerdo con los manuales de los fabricantes y las normas de seguridad.'
      },
      aes: {
        'OA1': {
          texto: 'Procesa la matriz de impresión cumpliendo con los estándares de calidad, considerando el mantenimiento de equipos y aplicando los controles según normativa vigente.',
          ces: {
            'CE1': 'Fija tiempos de vacío y exposición para el copiado análogo de la forma impresora según las características de la trama, la sensibilidad del material y la norma de calidad vigente.',
            'CE2': 'Expone de forma correcta la película y la matriz impresora según los requisitos técnicos del proveedor y la norma de calidad vigente.',
            'CE3': 'Procesa la forma impresora en forma manual o automática, según los requisitos técnicos del proveedor.',
            'CE4': 'Controla la película o forma impresora con instrumentos de medición y visualmente, de acuerdo a la orden de trabajo, las normas vigentes y los requisitos técnicos de los proveedores.',
            'CE5': 'Aplica el mantenimiento preventivo y calibra los equipos para procesar matrices según las normas y los requisitos técnicos de los proveedores.'
          }
        },
        'OA2': {
          texto: 'Imprime el archivo de salida bajo tecnología de impresión digital, según requerimientos de producto y realizando las tareas de manera prolija.',
          ces: {
            'CE1': 'Prepara los archivos digitales para la salida de impresión digital ajustando parámetros de la impresión y según los requerimientos de la orden de trabajo.',
            'CE2': 'Opera impresoras xerográficas y software para impresión digital de acuerdo a las indicaciones de la orden de trabajo, y según las instrucciones del fabricante.',
            'CE3': 'Opera impresoras inkjet y software para impresión digital de acuerdo a las indicaciones de la orden de trabajo, y según las instrucciones del fabricante.',
            'CE4': 'Imprime los archivos bajo tecnología digital de manera prolija y sin errores, buscando alternativas y soluciones cuando se presentan problemas pertinentes a las funciones desempeñadas.'
          }
        }
      }
    },

    'GR8': {
      num:    'GR8',
      nombre: 'Postimpresión en Embalajes y Recubrimientos a Impresos',
      nivel:  '4M',
      horas:  152,
      oas: {
        'OA6': 'Realizar la postimpresión de los productos, operando máquinas de terminación y de corte de sustratos, procesando el material impreso para que cumpla con la orden de trabajo, con los estándares de calidad y las normas de seguridad requeridos.',
        'OA7': 'Realizar operaciones de mantenimiento básico, limpieza, lubricación y reemplazo de elementos fungibles, a diferentes tipos de máquinas o equipos de pre-impresión, impresión y postimpresión, de acuerdo con los manuales de los fabricantes y las normas de seguridad.'
      },
      aes: {
        'OA1': {
          texto: 'Efectúa el proceso de troquelado, de acuerdo a la orden de trabajo y resguardando su seguridad.',
          ces: {
            'CE1': 'Prepara el troquel para su colocación en la rama, identificando sus elementos y características técnicas, según indicaciones de la orden de trabajo.',
            'CE2': 'Regula el paso del soporte interpretando los mecanismos de alimentación, transporte y salida en la troqueladora.',
            'CE3': 'Prepara la contrapartida, reconociendo las características de los diferentes hendidos y las del soporte que se va a troquelar.',
            'CE4': 'Realiza el arreglo interpretando las instrucciones y aplicando la nivelación de presiones mediante alzas.',
            'CE5': 'Prepara el cuerpo expulsor de recortes y el separador, reconociendo los elementos mecánicos y aplicando la separación de los envases sin deterioro.',
            'CE6': 'Realiza el troquelado del pliego impreso con la calidad requerida, aplicando las especificaciones técnicas señaladas en la orden de trabajo.',
            'CE7': 'Realiza la limpieza y el mantenimiento preventivo de la troqueladora, según las especificaciones del fabricante, aplicando las normas de prevención de riesgos laborales y protección medioambiental.'
          }
        },
        'OA2': {
          texto: 'Aplica tratamiento superficial del impreso según orden de trabajo.',
          ces: {
            'CE1': 'Prepara la máquina determinando los elementos del proceso, según las características de la estampación por calor y del soporte impreso.',
            'CE2': 'Realiza el estampado por calor estableciendo la carga del soporte y aplicando la presión adecuada para alcanzar la calidad en el proceso.',
            'CE3': 'Prepara la máquina plastificadora, ajustando los elementos del proceso, en función de las características del film plástico y del soporte impreso.',
            'CE4': 'Realiza el plastificado, interpretando y aplicando las especificaciones técnicas en el proceso.',
            'CE5': 'Prepara la máquina barnizadora, ajustando los elementos del proceso en función de las características del tipo de barnizado y del soporte.',
            'CE6': 'Realiza el barnizado organizando el proceso según las características del producto y de acuerdo a la orden de trabajo.'
          }
        }
      }
    }

  }, // fin modulos

  // ── Objetivos de Aprendizaje Genéricos (OAG) ─────────────────
  // Definiciones OFICIALES Mineduc (Decreto Supremo de Educación)
  // aplicables a todas las especialidades TP/EMTP.
  oag: {
    'A': 'Comunicarse oralmente y por escrito con claridad, utilizando registros de habla y de escritura pertinentes a la situación laboral y a la relación con los interlocutores.',
    'B': 'Leer y utilizar distintos tipos de textos relacionados con el trabajo, tales como especificaciones técnicas, normativas diversas, legislación laboral, así como noticias y artículos que enriquezcan su experiencia laboral.',
    'C': 'Realizar las tareas de manera prolija, cumpliendo plazos establecidos y estándares de calidad, y buscando alternativas y soluciones cuando se presentan problemas pertinentes a las funciones desempeñadas.',
    'D': 'Trabajar eficazmente en equipo, coordinando acciones con otros in situ o a distancia, solicitando y prestando cooperación para el buen cumplimiento de sus tareas habituales o emergentes.',
    'E': 'Tratar con respeto a subordinados, superiores, colegas, clientes, personas con discapacidades, sin hacer distinciones de género, de clase social, de etnias u otras.',
    'F': 'Respetar y solicitar respeto de deberes y derechos laborales establecidos, así como de aquellas normas culturales internas de la organización que influyen positivamente en el sentido de pertenencia y en la motivación laboral.',
    'G': 'Participar en diversas situaciones de aprendizaje, formales e informales, y calificarse para desarrollar mejor su trabajo actual o bien para asumir nuevas tareas o puestos de trabajo, en una perspectiva de formación permanente.',
    'H': 'Manejar tecnologías de la información y comunicación para obtener y procesar información pertinente al trabajo, así como para comunicar resultados, instrucciones e ideas.',
    'I': 'Utilizar eficientemente los insumos para los procesos productivos y disponer cuidadosamente los desechos, en una perspectiva de eficiencia energética y cuidado ambiental.',
    'J': 'Emprender iniciativas útiles en los lugares de trabajo y/o proyectos propios, aplicando principios básicos de gestión financiera y administración para generarles viabilidad.',
    'K': 'Prevenir situaciones de riesgo y enfermedades ocupacionales, evaluando las condiciones del entorno del trabajo y utilizando los elementos de protección personal según la normativa correspondiente.',
    'L': 'Tomar decisiones financieras bien informadas, con proyección a mediano y largo plazo, respecto del ahorro, especialmente del ahorro previsional, de los seguros, y de los riesgos y oportunidades del endeudamiento crediticio, así como de la inversión.'
  }

};
