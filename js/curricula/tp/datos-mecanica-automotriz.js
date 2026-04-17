// =============================================
// DATOS CURRICULARES — Especialidad Mecánica Automotriz
// Archivo: js/curricula/tp/datos-mecanica-automotriz.js
//
// Módulos cargados: MA1–MA9 + MA13 (10 módulos)
//   3° Medio : MA1, MA2, MA3, MA4, MA5, MA6
//   4° Medio : MA7, MA8, MA9, MA13
//
// Fuente: Programa de Estudio Mineduc — Especialidad Mecánica Automotriz
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['mecanica-automotriz'] = {

  modulos: {

    // ══════════════════════════════════════════════════════
    // 3° MEDIO
    // ══════════════════════════════════════════════════════

    'MA1': {
      num:    'MA1',
      nombre: 'Ajuste de Motores',
      nivel:  '3M',
      horas:  228,
      oas: {
        'OA4': 'Reparar y probar el funcionamiento de motores de gasolina, diésel, gas e híbridos, tanto convencionales como de inyección electrónica y sus sistemas de control de emisiones, conjunto o subconjuntos mecánicos del motor, de lubricación y refrigeración, entre otros, utilizando las herramientas e instrumentos apropiados, de acuerdo a las especificaciones técnicas del fabricante.'
      },
      aes: {
        'OA1': {
          texto: 'Diagnostica el estado del motor a gasolina y/o diésel, utilizando herramientas e instrumentos apropiados, y comparando los datos con los del manual de servicio.',
          ces: {
            'CE1': 'Lee el manual de servicio del automóvil, considerando y convirtiendo las unidades de medida, de acuerdo a los sistemas de unidades.',
            'CE2': 'Desmonta y monta motor de combustión interna, respetando las normas de seguridad establecidas en el manual de servicio.',
            'CE3': 'Desarma y arma el motor a gasolina y/o diésel, utilizando las herramientas apropiadas, los principios mecánicos de funcionamiento del motor, respetando las pautas establecidas en el manual de servicio y aplicando las normas de seguridad.',
            'CE4': 'Mide los componentes del motor y su conjunto, utilizando los instrumentos apropiados, realizando tareas en forma prolija y comparando datos establecidos en el manual de servicio.',
            'CE5': 'Diagnostica el estado del motor y entrega informe técnico de su reparación, respetando los estándares de orden y prolijidad requeridos por el manual de servicio técnico.'
          }
        },
        'OA2': {
          texto: 'Verifica y reemplaza componentes del conjunto móvil del motor a gasolina y/o diésel (biela, pistón, eje cigüeñal), siguiendo indicaciones del manual de servicio.',
          ces: {
            'CE1': 'Comprueba las tolerancias al conjunto móvil, aplicando técnicas de medición en forma prolija (micrómetro, reloj comparador, plastigaje), de acuerdo a las indicaciones del manual de servicio.',
            'CE2': 'Reemplaza los componentes del conjunto móvil (biela, cojinetes, pistón, anillos, eje cigüeñal, etc.), de acuerdo al resultado de la medición, disponiendo cuidadosamente los desechos y cuidados del medioambiente y las indicadas en el manual de servicio.',
            'CE3': 'Arma y comprueba el armado correcto del motor, utilizando las herramientas apropiadas, los elementos de protección personal de la normativa vigente y siguiendo las indicaciones del manual de servicio.'
          }
        },
        'OA3': {
          texto: 'Verifica el estado de los integrantes del conjunto fijo del motor a gasolina y/o diésel (culata, block, cárter), siguiendo indicaciones del manual del fabricante.',
          ces: {
            'CE1': 'Comprueba las tolerancias de planitud al conjunto fijo del motor, aplicando técnicas de medición (regla de pelo, feeler, azul de prussian), y concluye tipo de reparación a realizar, de acuerdo a las indicaciones del manual de servicio.',
            'CE2': 'Ensambla componentes del conjunto fijo y comprueba su armado, respetando las normas de seguridad, de acuerdo al manual de servicio.'
          }
        },
        'OA4': {
          texto: 'Reemplaza y prueba componentes de sistemas del motor, aplicando normas de seguridad y medio ambientales, de acuerdo a instrucciones del manual del fabricante.',
          ces: {
            'CE1': 'Reemplaza y prueba componentes del sistema de refrigeración del motor, de acuerdo a pautas establecidas en el manual de servicio.',
            'CE2': 'Reemplaza y prueba componentes del sistema de lubricación, utilizando los elementos de protección personal y respetando el medioambiente, de acuerdo a las pautas establecidas en el manual de servicio.',
            'CE3': 'Reemplaza y prueba componentes del sistema de distribución del motor, utilizando los elementos de protección personal, de acuerdo a pautas establecidas en el manual de servicio.',
            'CE4': 'Utiliza herramientas apropiadas para reemplazar componentes del motor y sus subsistemas, utilizando los elementos de protección personal y respetando las normas de seguridad, de acuerdo a las instrucciones del manual de servicio.'
          }
        }
      }
    },

    'MA2': {
      num:    'MA2',
      nombre: 'Lectura de Planos y Manuales Técnicos',
      nivel:  '3M',
      horas:  152,
      oas: {
        'OA2': 'Leer y utilizar la información contenida en manuales técnicos, planos y diagramas de vehículos motorizados y normas nacionales e internacionales de emisiones de gases, para resolver diagnósticos o fallas.'
      },
      aes: {
        'OA1': {
          texto: 'Lee e interpreta manuales técnicos de diferentes vehículos para conocer las especificaciones técnicas entregadas por el fabricante.',
          ces: {
            'CE1': 'Interpreta las indicaciones entregadas en documentos escritos, como especificaciones técnicas, simbología, normativa de seguridad y medioambiental, legislación laboral y otras contenidas en manuales técnicos.',
            'CE2': 'Lee e interpreta las especificaciones técnicas de un manual de taller, de operación y mantenimiento y/o catálogos de partes y piezas, para ejecutar procesos de mantenimiento y/o reparación de un vehículo automotriz.',
            'CE3': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea. Además, asignan roles y los cumplen.'
          }
        },
        'OA2': {
          texto: 'Lee e interpreta la información descrita en planos y diagramas de los distintos manuales para ejecutar procesos de mantenimiento y/o reparación de un vehículo automotriz.',
          ces: {
            'CE1': 'Selecciona la información de los distintos manuales para realizar procesos de mantenimiento y/o reparación de un vehículo automotriz.',
            'CE2': 'Describe las nomenclaturas de las normas y simbologías utilizadas en el rubro automotriz.',
            'CE3': 'Realiza una descripción del plano, serie y fecha de fabricación, modelo y número de serie aplicada al equipo.',
            'CE4': 'Utiliza coordenadas de los planos hidráulicos, eléctricos y neumáticos impresas en cada uno de ellos, para ejecutar procesos de mantenimiento y/o reparación de un vehículo automotriz.',
            'CE5': 'Interpreta función de un sistema hidráulico, neumático y eléctrico desde un plano normalizado de un vehículo automotriz.',
            'CE6': 'Utiliza pautas de mantenimiento periódico (diario / 250 horas) del manual de mantenimiento y operación, para ejecutar estos procesos y/o reparación de un vehículo automotriz.',
            'CE7': 'Utiliza un cuadro de lubricación y engrase para ejecutar procesos de mantenimiento y/o reparación de un vehículo automotriz.'
          }
        },
        'OA3': {
          texto: 'Diagnostica y resuelve fallas interpretando manuales técnicos de diferentes vehículos motorizados, basado en las normas nacionales e internacionales de emisión de gases.',
          ces: {
            'CE1': 'Lee e interpreta información contenida en manuales de diferentes vehículos para determinar y resolver fallas.',
            'CE2': 'Interpreta indicaciones entregadas en documentos escritos, como especificaciones técnicas, simbología, y normas nacionales e internacionales relacionadas con la emisión de gases y conservación del medioambiente.',
            'CE3': 'Aplica diagnóstico y resuelve fallas sectorizando un subsistema de un plano automotriz, de acuerdo al manual de servicio y normas nacionales e internacionales.'
          }
        }
      }
    },

    'MA3': {
      num:    'MA3',
      nombre: 'Manejo de Residuos y Desechos Automotrices',
      nivel:  '3M',
      horas:  76,
      oas: {
        'OA8': 'Manipular residuos y desechos del mantenimiento de vehículos motorizados, aplicando técnicas compatibles con el cuidado del medioambiente.'
      },
      aes: {
        'OA1': {
          texto: 'Reconoce los principales residuos y desechos de vehículos motorizados, aplicando técnicas compatibles con el cuidado y medioambiente, de acuerdo a la normativa vigente.',
          ces: {
            'CE1': 'Describe los principales desechos y residuos derivados de la mantención o reparación de los vehículos motorizados.',
            'CE2': 'Clasifica residuos y desechos producto de la mantención de vehículos motorizados, de manera prolija, de acuerdo a procedimientos de clasificación nacional e internacional de residuos y desechos en el taller.',
            'CE3': 'Clasifica e informa el almacenamiento y transporte de residuos y desechos en el taller, aplicando procedimientos, de acuerdo a la norma vigente.',
            'CE4': 'Aplica protocolos de emergencia respecto del procedimiento relacionado con residuos y desechos en el taller.',
            'CE5': 'Dispone de los desechos, de acuerdo a los procedimientos establecidos en las hojas de seguridad.',
            'CE6': 'Clasifica los tipos de fuegos que se pueden producir derivados de un accidente con materiales peligrosos.',
            'CE7': 'Toma precauciones necesarias y las discute con sus integrantes de equipo de trabajo para prevenir situaciones de riesgo, conforme a la normativa vigente.'
          }
        },
        'OA2': {
          texto: 'Aplica procedimientos para la prevención y el control de emergencias en el almacenamiento, transporte, manejo y manipulación de materiales peligrosos en un taller mecánico, de acuerdo a los procedimientos y la normativa vigente.',
          ces: {
            'CE1': 'Identifica los materiales peligrosos presentes en un taller mecánico.',
            'CE2': 'Clasifica las propiedades de riesgos de los materiales peligrosos disponibles en un taller mecánico.',
            'CE3': 'Aplica procedimientos de clasificación e inscripción para el almacenamiento y transporte de materiales peligrosos, según la normativa y la legislación nacional.',
            'CE4': 'Elabora plan de emergencia para manejar material peligroso en el taller, utilizando los elementos de protección personal, de acuerdo a normativas de estándares de seguridad.',
            'CE5': 'Interpreta la simbología para manipular materiales peligrosos en el taller, de acuerdo a las normas vigentes.',
            'CE6': 'Utiliza información que permite implementar material de difusión para el manejo seguro de materiales peligrosos en el taller.',
            'CE7': 'Aplica protocolos de emergencia, utilizando elementos de protección personal, de acuerdo a la normativa vigente.',
            'CE8': 'Dispone cuidadosamente de los desechos, respetando el medioambiente y previniendo situaciones de riesgo y enfermedades ocupacionales, de acuerdo a la normativa correspondiente.'
          }
        }
      }
    },

    'MA4': {
      num:    'MA4',
      nombre: 'Mantenimiento de Sistemas de Seguridad y Confortabilidad',
      nivel:  '3M',
      horas:  152,
      oas: {
        'OA7': 'Montar y desmontar sistemas de seguridad y de confortabilidad, tales como cinturones de seguridad, airbag, alarmas, aire acondicionado, sistema de audio, de acuerdo a las instrucciones del fabricante y a la normativa vigente.'
      },
      aes: {
        'OA1': {
          texto: 'Lee e interpreta circuitos eléctricos, esquemas o planos, de conjuntos o componentes, del sistema de seguridad, pasiva y activa, que aparecen en los documentos del manual del fabricante.',
          ces: {
            'CE1': 'Lee e interpreta circuitos eléctricos de componentes y conjuntos de los sistemas de seguridad pasiva y activa, incorporados en vehículos automotrices, contenidos en manuales de información técnica del fabricante.',
            'CE2': 'Interpreta esquemas o planos identificando la función y sus componentes del sistema de seguridad pasiva y activa, de vehículos automotrices, trabajando en equipo, de acuerdo a las especificaciones técnicas del fabricante.'
          }
        },
        'OA2': {
          texto: 'Desmonta y monta sistemas de seguridad pasiva y activa de vehículos automotrices, siguiendo las instrucciones del manual de servicio y respetando las normas de seguridad y medioambiente.',
          ces: {
            'CE1': 'Desmonta y monta conjuntos y componentes del sistema de seguridad activa y pasiva, utilizando las herramientas apropiadas, realizando las tareas de manera prolija, respetando normas de seguridad, el medioambiente y especificaciones técnicas del manual de servicio.',
            'CE2': 'Recambia componentes del sistema de seguridad activa y pasiva, utilizando herramientas adecuadas, respetando las normas de seguridad y cuidado del medioambiente, de acuerdo a instrucciones del manual de servicio.',
            'CE3': 'Diagnostica el funcionamiento de sistemas de seguridad activa y pasiva de vehículos, utilizando instrumentos apropiados, respetando normas de seguridad y siguiendo instrucciones del manual de servicio.'
          }
        },
        'OA3': {
          texto: 'Lee e interpreta circuitos eléctricos, esquemas o planos de conjuntos o componentes, determinando el diagnóstico y mantenimiento del sistema de confortabilidad, de acuerdo a la información técnica del manual del fabricante.',
          ces: {
            'CE1': 'Lee e interpreta circuitos eléctricos esquemas o planos del sistema de confortabilidad, definiendo la constitución y funcionamiento de conjuntos o componentes, de acuerdo a información técnica del manual de servicio.',
            'CE2': 'Realiza diagnóstico y mantenimiento del sistema de confortabilidad, incorporados de serie en vehículos automotrices, respetando las normas de seguridad y medioambiente, de acuerdo a especificaciones técnicas del fabricante.'
          }
        },
        'OA4': {
          texto: 'Desmonta y monta conjuntos y componentes de sistemas de confortabilidad de vehículos automotrices, siguiendo instrucciones del manual de servicio, respetando las normas de seguridad y del medioambiente.',
          ces: {
            'CE1': 'Interpreta esquemas o planos de sistemas de confortabilidad, identificando la función y sus componentes, de acuerdo a información contemplada en el manual de servicio.',
            'CE2': 'Desmonta, recambia y monta conjuntos o componentes del sistema de confortabilidad, utilizando las herramientas apropiadas, respetando las normas de seguridad, cuidado del medioambiente y utilizando los elementos de protección personal, siguiendo instrucciones estipuladas en el manual de servicio.',
            'CE3': 'Diagnostica el funcionamiento de sistemas de confortabilidad utilizando instrumentos apropiados, respetando normas de seguridad y medioambiente, de acuerdo a especificaciones técnicas del manual de servicio.'
          }
        }
      }
    },

    'MA5': {
      num:    'MA5',
      nombre: 'Mantenimiento de Sistemas Eléctricos y Electrónicos',
      nivel:  '3M',
      horas:  228,
      oas: {
        'OA6': 'Reemplazar y probar sistemas eléctricos y electrónicos de los vehículos automotrices, tales como sistemas de carga, de arranque, de encendido, de alumbrado y señalización, de cierre centralizado, según las indicaciones del fabricante y estándares internacionales.'
      },
      aes: {
        'OA1': {
          texto: 'Diagnostica y detecta fallas a circuitos eléctricos de vehículos automotrices, respetando las normas de seguridad, de acuerdo a las indicaciones de quien fabrica y estándares internacionales.',
          ces: {
            'CE1': 'Determina el elemento a comprobar, asociado a los sistemas de alumbrado, señalización y accesorios, interpretando el plano o circuito eléctrico o electrónico, aplicando normas de seguridad e indicaciones del manual de servicio.',
            'CE2': 'Detecta fallas de los sistemas eléctricos y electrónicos automotrices, interpretando la nomenclatura y simbología de planos y circuitos eléctricos, respetando normas de seguridad, de acuerdo a procedimiento de detección de fallas e indicaciones del manual de servicio.',
            'CE3': 'Diagnostica el estado de los sistemas eléctricos automotrices, utilizando instrumentos de medición y diagnóstico, teniendo presente las magnitudes, leyes y unidades asociadas a los circuitos eléctricos automotrices y los planos de circuitos eléctricos, respetando las normas de seguridad, de acuerdo a lo indicado en el manual de servicio técnico.'
          }
        },
        'OA2': {
          texto: 'Reemplaza y prueba componentes de los distintos sistemas eléctricos y electrónicos de los vehículos automotrices, respetando las normas de seguridad y de acuerdo a los procedimientos del manual de servicio.',
          ces: {
            'CE1': 'Reemplaza y prueba componentes y elementos del sistema de alumbrado, señalización y accesorios automotrices, realizando las tareas en forma cuidadosa, respetando las normas de seguridad y las especificaciones técnicas del fabricante.',
            'CE2': 'Mide y comprueba el correcto funcionamiento de los sistemas eléctricos y electrónicos automotrices, utilizando los instrumentos o equipos apropiados, respetando las normas de seguridad y siguiendo las indicaciones del manual de servicio.'
          }
        },
        'OA3': {
          texto: 'Reemplaza y prueba componentes a los sistemas de encendido del motor Otto e inyección del motor de ciclo Otto y Diesel, respetando las normas de seguridad, de acuerdo a las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Prueba sistemas de encendido por efecto Hall e inductivo, siguiendo indicaciones del manual de servicio.',
            'CE2': 'Reemplaza componentes de los sistemas de encendido por efecto Hall e inductivo, utilizando las herramientas y equipos, realizando las tareas de manera prolija, de acuerdo al procedimiento del manual de servicio.',
            'CE3': 'Diagnostica sistema de encendido DIS, siguiendo indicaciones del manual de servicio del vehículo.',
            'CE4': 'Realiza mantenimiento y comprueba el funcionamiento al sistema de encendido DIS, siguiendo los procedimientos descritos en el manual de servicio.',
            'CE5': 'Realiza mantenimiento al sistema de inyección y encendido electrónico del motor Otto, confeccionando informe técnico del trabajo realizado, de acuerdo a pauta de mantenimiento indicada en el manual de servicio.',
            'CE6': 'Comprueba el funcionamiento correcto del sistema de inyección y encendido del motor Otto, utilizando instrumentos de medición, aplicando normas de seguridad requeridas por el manual de servicio.',
            'CE7': 'Comprueba el funcionamiento del sistema de inyección diésel, aplicando instrumentos de medición y control, aplicando normas de seguridad, utilizando los elementos de protección personal y siguiendo las instrucciones del manual de servicio.'
          }
        },
        'OA4': {
          texto: 'Aplica procedimientos de mantenimiento y diagnóstico comprobando y reemplazando componentes del sistema de carga y arranque del vehículo, respetando las normas de seguridad, de acuerdo a las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Aplica mantenimiento a conjuntos y componentes de los sistemas de carga y arranque del vehículo, realizando las tareas de manera prolija y comunicando los resultados, respetando las normas de seguridad, de acuerdo a las pautas establecidas en el manual de servicio.',
            'CE2': 'Comprueba el funcionamiento correcto del sistema de carga y arranque del vehículo, comunicando el trabajo realizado y respetando las normas de seguridad, de acuerdo a instrucciones del manual de servicio técnico.',
            'CE3': 'Diagnostica el estado de componentes y conductores, interpretando la representación eléctrica de los sistemas de carga y arranque del vehículo, respetando las normas de seguridad y siguiendo los procedimientos indicados en el manual de servicio.'
          }
        }
      }
    },

    'MA6': {
      num:    'MA6',
      nombre: 'Mantenimiento de Motores',
      nivel:  '3M',
      horas:  190,
      oas: {
        'OA1': 'Inspeccionar y diagnosticar averías y fallas en el funcionamiento mecánico, eléctrico o electrónico de vehículos motorizados, identificando el o los sistemas y componentes comprometidos, realizando mediciones y controles de verificación de distintas magnitudes mediante instrumentos análogos y digitales, con referencia a las especificaciones técnicas del fabricante.'
      },
      aes: {
        'OA1': {
          texto: 'Controla el funcionamiento mecánico del motor, verificando magnitudes con equipos e instrumentos análogos y digitales, respetando las normas de seguridad, de acuerdo a las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Pone en funcionamiento los motores Otto y diésel, mide compresión y lo compara con los datos del fabricante, respetando las normas de seguridad y medioambiente.',
            'CE2': 'Comprueba gases producto de la combustión, con el instrumento apropiado, los coteja con las normas vigentes y registra en ficha técnica el estado del motor.',
            'CE3': 'Aplica escáner y analiza datos con su grupo de trabajo y, en conjunto, determinan el correcto funcionamiento electrónico de los motores Otto y Diesel, de acuerdo con estándares de calidad estimados por el fabricante.'
          }
        },
        'OA2': {
          texto: 'Realiza mantenimiento correctivo en relación al funcionamiento mecánico, eléctrico o electrónico de los motores de combustión interna Otto y Diesel, de acuerdo con procedimiento de detección de fallas, respetando las normas de seguridad, de acuerdo con el manual del fabricante.',
          ces: {
            'CE1': 'Desmonta y monta componentes eléctricos y electrónicos de los motores Otto y Diesel, realizando las tareas en forma prolija y aplicando las normas de seguridad, extrae datos, los compara con los especificados en el manual de servicio y decide la mantención a realizar.',
            'CE2': 'Diagnostica el estado del motor, aplicando instrumentos adecuados para el procedimiento, interpretando fallas entregadas por el mismo, utilizando las tecnologías de información disponible y comunicando sus conclusiones, teniendo presente lo contemplado en el manual de servicio.',
            'CE3': 'Comprueba el funcionamiento correcto del motor, realizando mediciones y controles de verificación usando instrumentos análogos y digitales, aplicando normas de seguridad y siguiendo instrucciones del manual de servicio.'
          }
        },
        'OA3': {
          texto: 'Realiza mantenimiento programado a motores diésel y gasolina, respetando normas de seguridad y medioambiente, de acuerdo con especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Desmonta y monta componentes de los sistemas del motor, comprueba su funcionamiento con instrumentos análogos y digitales, realizando las tareas en forma prolija y respetando las normas de seguridad, de acuerdo con instrucciones del manual de servicio.',
            'CE2': 'Realiza mantenimiento programado (10.000 km, 20.000 km, 40.000 km, etc.) a motores diésel y gasolina, utilizando los insumos en forma eficiente, interpretando fichas y manuales de servicio, evaluando las condiciones del entorno del trabajo y utilizando los elementos de protección personal, respetando el medioambiente, siguiendo pautas establecidas en el manual de servicio.',
            'CE3': 'Comprueba el funcionamiento correcto del motor, aplicando instrumentos apropiados, respetando las normas de seguridad y confeccionando informe técnico de la mantención realizada.'
          }
        }
      }
    },

    // ══════════════════════════════════════════════════════
    // 4° MEDIO
    // ══════════════════════════════════════════════════════

    'MA7': {
      num:    'MA7',
      nombre: 'Mantenimiento de Sistemas Hidráulicos y Neumáticos',
      nivel:  '4M',
      horas:  190,
      oas: {
        'OA5': 'Reparar y probar sistemas hidráulicos y neumáticos, responsables de diversas funciones en los vehículos, tales como suspensión, sistema de dirección, frenos y transmisión de potencia manual y automática, utilizando las herramientas e instrumentos apropiados, de acuerdo a las especificaciones técnicas del fabricante y estándares internacionales.'
      },
      aes: {
        'OA1': {
          texto: 'Prueba los diferentes sistemas hidráulicos y neumáticos y componentes de vehículos pesados, sobre la base de su funcionamiento y especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Verifica el funcionamiento de los diferentes sistemas hidráulicos y neumáticos y componentes de vehículos pesados, interpretando símbolos, esquemas o planos, respetando los principios de la hidráulica y neumática, las normas de seguridad, cuidado del medioambiente, y las especificaciones técnicas del fabricante.',
            'CE2': 'Comprueba la presión hidráulica de los diferentes sistemas de vehículos pesados, aplicando normas de seguridad y medioambientales, y utilizando como referencia la información que entrega el fabricante.',
            'CE3': 'Realiza mantenimiento a los sistemas hidráulicos y neumáticos y sus componentes de vehículos pesados, con dedicación y prolijidad, interpretando planos y diagramas, respetando normas de seguridad y medioambiente, de acuerdo con pautas del manual de servicio.',
            'CE4': 'Realiza prueba de funcionamiento a los diferentes sistemas hidráulicos y neumáticos y componentes de vehículos pesados, aplicando normas de seguridad y siguiendo las indicaciones del manual de servicio.',
            'CE5': 'Cumple con los plazos establecidos para el desarrollo de la tarea encomendada.',
            'CE6': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea, asigna roles y los cumple.'
          }
        },
        'OA2': {
          texto: 'Realiza mantenimiento y diagnóstico a los sistemas neumáticos y sus componentes de vehículos pesados, aplicando las normas de seguridad y respeto del medioambiente, de acuerdo a las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Prueba los componentes de los diferentes sistemas neumáticos de vehículos pesados, con los instrumentos y equipos necesarios, respetando las normas de seguridad y de cuidado del medioambiente, de acuerdo con especificaciones técnicas del fabricante.',
            'CE2': 'Realiza mantenimiento programado a los diferentes sistemas neumáticos de vehículos pesados, respetando las normas de seguridad y cuidado del medioambiente, de acuerdo con cartilla de mantención, especificada en el manual de servicio.',
            'CE3': 'Aplica diagnóstico a los diferentes sistemas neumáticos y sus componentes de vehículos pesados, utilizando los instrumentos y equipos apropiados, respetando las normas de seguridad y siguiendo indicaciones del manual de servicio.',
            'CE4': 'Cumple con los plazos establecidos para el desarrollo de la tarea encomendada.',
            'CE5': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea, asigna roles y los cumple.'
          }
        },
        'OA3': {
          texto: 'Realiza mantenimiento de los diferentes sistemas hidráulicos y componentes de vehículos pesados, respetando las normas de seguridad y medioambiente, de acuerdo con las especificaciones técnicas del fabricante y a los estándares internacionales.',
          ces: {
            'CE1': 'Mantiene componentes de los diferentes sistemas hidráulicos de vehículos pesados, utilizando instrumentos y equipos apropiados, respetando las normas de seguridad y cuidado del medioambiente, de acuerdo a especificaciones técnicas del fabricante y estándares internacionales.',
            'CE2': 'Interpreta simbología técnica de componentes de los diferentes sistemas hidráulicos de vehículos pesados y detecta fallas, siguiendo instrucciones del manual de servicio.',
            'CE3': 'Mantiene los diferentes sistemas hidráulicos de vehículos pesados, respetando las normas de seguridad, de acuerdo con especificaciones técnicas establecidas en el manual de servicio técnico.',
            'CE4': 'Cumple con los plazos establecidos para el desarrollo de la tarea encomendada.',
            'CE5': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea, asigna roles y los cumple.'
          }
        },
        'OA4': {
          texto: 'Realiza mantenimiento al sistema de transmisión de potencia manual y automática de vehículos pesados, utilizando herramientas e instrumentos apropiados, de acuerdo a los estándares internacionales y respetando normas de seguridad, de acuerdo a las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Desmonta, desarma, arma y monta mecanismos de transmisión de potencia manual y automática de vehículos pesados, utilizando las herramientas apropiadas, respetando normas de seguridad y cuidado del medioambiente, siguiendo las instrucciones técnicas del manual del fabricante.',
            'CE2': 'Prueba componentes de la transmisión de potencia manual y automática de vehículos pesados, midiendo con los instrumentos apropiados, confrontando los resultados con el manual de servicio técnico y aplicando las normas de seguridad.',
            'CE3': 'Comprueba especificaciones técnicas de componentes de transmisión de potencia manual y automática de vehículos pesados, respetando las normas de seguridad, utilizando elementos de protección personal y respetando el medioambiente, de acuerdo con las especificaciones técnicas establecidas en el manual de servicio técnico.',
            'CE4': 'Cumple con los plazos establecidos para el desarrollo de la tarea encomendada.',
            'CE5': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea, asigna roles y los cumple.'
          }
        },
        'OA5': {
          texto: 'Realiza un diagnóstico al sistema de transmisión de potencia manual y automática de vehículos pesados y prueba componentes, utilizando herramientas e instrumentos apropiados, de acuerdo con los estándares internacionales y respetando normas de seguridad, de acuerdo con las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Verifica el correcto funcionamiento de componentes de la transmisión de potencia manual y automática de vehículos pesados, midiendo con los instrumentos apropiados, confrontando los resultados con el manual de servicio técnico y aplicando normas de seguridad.',
            'CE2': 'Diagnostica el funcionamiento de transmisión de potencia manual y automática de vehículos pesados, respetando las normas de seguridad, utilizando elementos de protección personal y respetando el medioambiente, de acuerdo con las especificaciones técnicas establecidas en el manual de servicio técnico.',
            'CE3': 'Cumple con los plazos establecidos para el desarrollo de la tarea encomendada.',
            'CE4': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea, asigna roles y los cumple.'
          }
        }
      }
    },

    'MA8': {
      num:    'MA8',
      nombre: 'Mantenimiento de los Sistemas de Transmisión y Frenos',
      nivel:  '4M',
      horas:  190,
      oas: {
        'OA3': 'Realizar mantenimiento básico de diversos sistemas de vehículos automotrices livianos, semipesados y pesados, de acuerdo a las pautas de mantenimiento del fabricante, de inspección y diagnóstico de fallas.'
      },
      aes: {
        'OA1': {
          texto: 'Realiza mantenimiento al sistema de transmisión mecánica de vehículos livianos y semipesados, de acuerdo a las pautas de mantención del fabricante, de inspección y diagnóstico de fallas.',
          ces: {
            'CE1': 'Ejecuta mantenimiento al sistema de transmisión mecánica de vehículos livianos y semipesados, respetando las normas de seguridad y de acuerdo con las especificaciones técnicas del fabricante.',
            'CE2': 'Comprueba el funcionamiento del sistema de transmisión mecánica, según protocolos e instrucciones del manual de servicio.',
            'CE3': 'Realiza mantenimiento al conjunto de embrague, de mando mecánico y mando hidráulico, mecánica de vehículos livianos y semipesados, realizando las tareas de forma prolija, respetando normas de seguridad y siguiendo las instrucciones del manual de servicio.',
            'CE4': 'Evalúa el funcionamiento del conjunto de embrague de mando mecánico y mando hidráulico, de acuerdo con protocolos e instrucciones del manual de servicio.',
            'CE5': 'Ejecuta mantenimiento al conjunto diferencial de vehículos livianos y semipesados, utilizando las herramientas e instrumentos apropiados, realizando las tareas en forma prolija, respetando las normas de seguridad y siguiendo las instrucciones del manual de servicio.',
            'CE6': 'Comprueba el funcionamiento del conjunto diferencial de vehículos livianos y semipesados, y elabora un informe técnico sobre el mantenimiento realizado.',
            'CE7': 'Diagnostica al conjunto diferencial de vehículos livianos y semipesados, utilizando las herramientas e instrumentos apropiados, realizando las tareas en forma prolija, respetando las normas de seguridad y siguiendo las instrucciones del manual de servicio.'
          }
        },
        'OA2': {
          texto: 'Realiza mantenimiento al sistema de transmisión automática de vehículos livianos y semipesados, de acuerdo con las pautas del fabricante, de inspección y diagnóstico de fallas.',
          ces: {
            'CE1': 'Ejecuta mantenimiento de caja de cambios automática de vehículos livianos y semipesados, respetando normas de seguridad y de medioambiente, realizando las tareas de forma prolija y de acuerdo con las especificaciones del manual de servicio técnico.',
            'CE2': 'Utiliza las herramientas adecuadas para el mantenimiento de la transmisión automática de vehículos livianos y semipesados, aplicando las normas de seguridad necesarias y respetando el medioambiente, según las instrucciones del manual de servicio técnico.',
            'CE3': 'Desarma, limpia y rearma los componentes de una caja de cambios automática, según las especificaciones técnicas del fabricante.',
            'CE4': 'Verifica el funcionamiento de la transmisión automática de vehículos livianos y semipesados, y elabora un informe técnico sobre el mantenimiento realizado, de acuerdo con la pauta solicitada.',
            'CE5': 'Evalúa el sistema de transmisión automática y sus componentes en vehículos automotrices livianos y semipesados, utilizando herramientas e instrumentos apropiados, de acuerdo con las especificaciones técnicas del fabricante.'
          }
        },
        'OA3': {
          texto: 'Realiza mantenimiento, inspección y diagnóstico al sistema de frenos hidráulicos de vehículos livianos y semipesados, respetando las normas de seguridad y medioambiente, según las pautas especificadas por el fabricante.',
          ces: {
            'CE1': 'Ejecuta mantenimiento de manera prolija a los componentes mecánicos e hidráulicos del sistema de frenos de vehículos livianos y semipesados, respetando normas de seguridad y de medioambiente, utilizando elementos de protección personal, de acuerdo con indicaciones del manual de servicio.',
            'CE2': 'Utiliza las herramientas adecuadas para el mantenimiento del sistema de frenos de vehículos livianos y semipesados, aplicando las normas de seguridad necesarias, que se indican en el manual de mantenimiento.',
            'CE3': 'Realiza mantenimiento al conjunto hidráulico que compone el sistema antibloqueo de frenos (ABS), de vehículos livianos y semipesados, realizando las tareas en forma prolija, respetando las normas de seguridad y de medioambiente, y utilizando como referencia la información que entrega el fabricante.',
            'CE4': 'Verifica el funcionamiento del sistema de frenos hidráulicos de vehículos livianos y semipesados, y elabora un informe técnico sobre el mantenimiento realizado, de acuerdo con el manual de servicio.',
            'CE5': 'Evalúa el sistema de frenos hidráulicos y sus componentes en vehículos automotrices livianos y semipesados, según las especificaciones técnicas del fabricante.'
          }
        }
      }
    },

    'MA9': {
      num:    'MA9',
      nombre: 'Mantenimiento de Sistemas de Dirección y Suspensión',
      nivel:  '4M',
      horas:  190,
      oas: {
        'OA3': 'Realizar mantenimiento básico de diversos sistemas de vehículos automotrices livianos, semipesados y pesados, de acuerdo a las pautas de mantenimiento del fabricante, de inspección y diagnóstico de fallas.'
      },
      aes: {
        'OA1': {
          texto: 'Inspecciona los diferentes mecanismos de dirección mecánica de vehículos livianos y semipesados, de acuerdo con las pautas del fabricante, de inspección y diagnóstico de fallas.',
          ces: {
            'CE1': 'Compara los diferentes mecanismos de dirección mecánica y relaciona su funcionamiento, características y componentes, dependiendo de la aplicación en vehículos livianos y semipesados, según las especificaciones técnicas del fabricante.',
            'CE2': 'Comprueba la relación del ángulo de giro de las ruedas directrices, en relación con el giro del volante de vehículos livianos y semipesados según la especificación del fabricante.',
            'CE3': 'Planifica acciones comunes e individuales para conseguir objetivos en trabajos de equipo, proyecto o tarea. Se asignan roles y se cumplen.'
          }
        },
        'OA2': {
          texto: 'Aplica mantenimiento al sistema de dirección de vehículos livianos y semipesados, de acuerdo con pautas del fabricante, de inspección y diagnóstico de fallas.',
          ces: {
            'CE1': 'Comprueba el funcionamiento del sistema de dirección de vehículos livianos y semipesados, según las indicaciones técnicas del fabricante.',
            'CE2': 'Utiliza las herramientas adecuadas en el mantenimiento del sistema de dirección de diferentes vehículos, aplicando las normas de seguridad necesarias.',
            'CE3': 'Realiza mantenimiento al sistema de dirección y sus componentes de distintos vehículos automotrices livianos y semipesados, cumpliendo con los plazos establecidos, realizando las tareas en forma prolija, respetando las normas de seguridad y de medioambiente, y utilizando como referencia la información que entrega el fabricante.',
            'CE4': 'Realiza cambios de piezas y componentes del mecanismo de dirección de vehículos livianos y semipesados, de acuerdo con las especificaciones técnicas del fabricante, cumpliendo con los plazos establecidos y respetando las normas de seguridad.',
            'CE5': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea. Se asignan roles y se cumplen.'
          }
        },
        'OA3': {
          texto: 'Inspecciona diferentes sistemas de suspensión utilizados en vehículos livianos y semipesados, de acuerdo con las pautas del fabricante, de inspección y diagnóstico de fallas.',
          ces: {
            'CE1': 'Comprueba el funcionamiento de los diferentes tipos de sistemas de suspensión y sus componentes, utilizados en vehículos livianos y semipesados, de acuerdo con la información entregada por el fabricante.',
            'CE2': 'Clasifica diferentes sistemas de suspensión y relaciona su funcionamiento y características técnicas, dependiendo de la aplicación, en vehículos livianos y semipesados, según información técnica del fabricante.',
            'CE3': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tarea. Se asignan roles y se cumplen.'
          }
        },
        'OA4': {
          texto: 'Realiza mantenimiento, inspección y diagnóstico al sistema de suspensión de vehículos livianos y semipesados, de acuerdo a las pautas del fabricante, de inspección y diagnóstico de fallas.',
          ces: {
            'CE1': 'Utiliza las herramientas adecuadas para el mantenimiento del sistema de suspensión de vehículos livianos y semipesados, respetando las normas de seguridad establecidas en el manual de servicio técnico.',
            'CE2': 'Realiza mantenimiento al sistema de suspensión y sus componentes en vehículos automotrices livianos y semipesados, respetando las normas de seguridad y utilizando como referencia la información que entrega el fabricante.',
            'CE3': 'Diagnostica el funcionamiento del sistema de suspensión de vehículos automotrices livianos y semipesados, siguiendo indicaciones del manual de servicio técnico.',
            'CE4': 'Realiza cambios de piezas y componentes del sistema de suspensión de vehículos livianos y semipesados, cumpliendo con los plazos establecidos, respetando las normas de seguridad y las especificaciones técnicas del fabricante.',
            'CE5': 'Planifica acciones comunes e individuales para el logro del trabajo, proyecto o tareas. Se asignan roles y se cumplen.'
          }
        },
        'OA5': {
          texto: 'Realiza diagnóstico de detección y corrección de fallas en el tren trasero y/o delantero de vehículos livianos y semipesados, operando equipos y herramientas de acuerdo con las especificaciones del fabricante.',
          ces: {
            'CE1': 'Opera equipo de balanceo de ruedas de vehículos livianos y semipesados de manera prolija, determinando el desbalanceo y corrigiendo, utilizando equipos de protección personal y respetando las normas de seguridad, de acuerdo con especificaciones del equipo.',
            'CE2': 'Realiza rotación de ruedas de vehículos livianos y semipesados, utilizando equipos de protección personal. Cumple con los plazos establecidos, respetando las normas de seguridad y medioambiente, según las especificaciones técnicas del fabricante.',
            'CE3': 'Opera el equipo de alineación de manera prolija, verificando y corrigiendo la geometría del tren delantero y/o trasero de vehículos livianos y semipesados, respetando las normas de seguridad, y de acuerdo con la información del manual de servicio.',
            'CE4': 'Planifica las acciones comunes e individuales para el logro del trabajo, proyecto o tarea. Se asignan roles y se cumplen.'
          }
        }
      }
    },

    'MA13': {
      num:    'MA13',
      nombre: 'Electromovilidad',
      nivel:  '4M',
      horas:  76,
      oas: {
        'OA_EM': 'Reconocer vehículos EV. Controlar y mantener por medio de métodos y técnicas adecuadas el funcionamiento de vehículos híbridos y eléctricos, utilizando herramientas e instrumentos de control y diagnóstico automotriz.'
      },
      aes: {
        'OA1': {
          texto: 'Determina características de funcionamiento en vehículos eléctricos reconociendo partes y componentes que los clasifican, por medio de la lectura de planos eléctricos-electrónicos y esquemas de trabajo, respetando las normas de seguridad e indicaciones del fabricante.',
          ces: {
            'CE1': 'Reconoce normas de seguridad en sistemas de alto voltaje asociados a la manipulación de circuitos que se encuentran en vehículos híbridos y eléctricos, siguiendo las indicaciones del manual de servicio.',
            'CE2': 'Reconoce elementos de protección personal para la correcta manipulación de herramientas y equipos a ser utilizados en diagnóstico y reparación de vehículos eléctricos-híbridos y eléctricos, según manual de servicio.',
            'CE3': 'Identifica tipos de vehículos híbridos y eléctricos, bajo información técnica y reconociendo sus principales sistemas de alto voltaje, reconociendo protocolos de seguridad en procesos de mantención y reparación.'
          }
        },
        'OA2': {
          texto: 'Reconocer cargadores de vehículos eléctricos según los modos de carga, calcular tiempos de carga según el tipo de cargador, respetando las normas de seguridad y de acuerdo con los procedimientos del manual de servicio.',
          ces: {
            'CE1': 'Identifica tipos de cargadores, conectores y modos de carga que se utilizan en vehículos híbridos y eléctricos. Calcula tiempos de carga y capacidad, según especificaciones técnicas.',
            'CE2': 'Realiza procedimiento de carga en vehículo eléctrico identificando tiempos de carga según el tipo de cargador, utilizando normas de seguridad y cumpliendo con procedimientos del manual de servicio.'
          }
        },
        'OA3': {
          texto: 'Identificar y reconocer componentes del sistema de alto y bajo voltaje en vehículos eléctricos, tipos de motores, baterías, seguridad del vehículo, respetando las normas de seguridad, de acuerdo con las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Identifica elementos y componentes del sistema de baja y alta tensión, siguiendo indicaciones del manual de servicio y respetando normas de seguridad.',
            'CE2': 'Realiza mediciones al conjunto de baterías por medio de escáner, siguiendo las indicaciones del manual del fabricante.',
            'CE3': 'Diagnostica sistema de alto y bajo voltaje por medio de escáner respetando normas de seguridad y siguiendo las indicaciones del manual de fabricante.'
          }
        },
        'OA4': {
          texto: 'Aplica procedimientos de mantenimiento programado y sintomático comprobando y reemplazando componentes de los sistemas de bajo y alto voltaje, respetando las normas de seguridad, de acuerdo con las especificaciones técnicas del fabricante.',
          ces: {
            'CE1': 'Aplica mantenimiento a conjuntos y componentes del automóvil según manual de servicio, respetando normas de seguridad.',
            'CE2': 'Comprueba el funcionamiento correcto de los sistemas de alto y bajo voltaje, carga de la batería, conversión de voltaje, según especificaciones técnicas del fabricante.',
            'CE3': 'Realiza diagnóstico mediante escáner, lectura de códigos de avería, prueba de actuadores. Proceso de desconexión del sistema de alto voltaje para mantenciones correctivas, según manual de servicio.'
          }
        }
      }
    }

  }, // fin modulos

  // ── Objetivos de Aprendizaje Genéricos ──────────────────
  oag: {
    'B': 'Realizar las actividades de manera prolija, responsable y con atención al detalle.',
    'C': 'Usar herramientas, instrumentos y equipos con destreza y seguridad.',
    'D': 'Planificar y organizar el trabajo técnico con eficiencia.',
    'H': 'Comunicar en forma clara y técnica los procesos y resultados realizados.',
    'I': 'Proponer mejoras e innovaciones con perspectiva de eficiencia.',
    'K': 'Verificar condiciones de riesgo y aplicar normas de seguridad y medioambientales.'
  }

};
