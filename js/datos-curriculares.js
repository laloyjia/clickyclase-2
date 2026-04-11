// =============================================
// DATOS CURRICULARES - Especialidad Electronica
// Archivo compartido entre planificacion.html y material.html
// Datos extraidos de PDFs oficiales Mineduc
// =============================================

var MODULOS = {
        // ========== 3ro MEDIO ==========
        'EN1': {
            num: 'EN1',
            nombre: 'Proyectos Electronicos',
            nivel: '3ro',
            horas: 190,
            oas: {
                'OA1': 'Leer y utilizar informacion tecnica consignada en manuales, planos, croquis, instrucciones y proyectos de instalacion electronicos, relevando los datos necesarios para desarrollar correctamente su trabajo.',
                'OA4': 'Instalar y montar equipos y sistemas electronicos industriales y otros, de acuerdo al diseno y caracteristicas tecnicas del proyecto, utilizando las herramientas e instrumentos adecuados, respetando la normativa electrica, ambiental y de seguridad.'
            },
            aes: {
                1: {
                    texto: 'Realiza analisis tecnico para la instalacion de equipos electronicos segun manual de uso y especificaciones tecnicas, respetando normas de seguridad y tiempos establecidos.',
                    ces: {
                        '1.1': { texto: 'Contrasta informacion tecnica, verificando valores nominales de las magnitudes para instalacion del equipo, utilizando instrumentos de medicion.', oag: ['A'] },
                        '1.2': { texto: 'Genera procedimiento de instalacion de equipos de acuerdo a especificaciones y caracteristicas tecnicas, considerando normas de seguridad.', oag: ['K'] },
                        '1.3': { texto: 'Documenta los valores experimentales, para las pruebas de funcionamiento en equipos electronicos, leyes y normativas.', oag: ['A'] },
                        '1.4': { texto: 'Predice el comportamiento de equipos electronicos, mediante la aplicacion y analisis de teoremas, leyes de electricidad y electronica, segun manuales de uso y especificaciones tecnicas.', oag: ['B'] }
                    }
                },
                2: {
                    texto: 'Instala equipos electronicos, segun requerimientos del usuario, e instrucciones consignadas en manuales.',
                    ces: {
                        '2.1': { texto: 'Prepara las condiciones necesarias para efectuar la instalacion de equipos electronicos, tales como seleccion de herramientas, interpretacion de planos, y distribucion de los tiempos.', oag: ['B'] },
                        '2.2': { texto: 'Monta los equipos electronicos y dispositivos asociados, de acuerdo al manual, siguiendo las instrucciones del proyecto, cumpliendo con los plazos establecidos.', oag: ['B'] },
                        '2.3': { texto: 'Comprueba el funcionamiento de la instalacion, midiendo parametros en los puntos mas relevantes, previendo situaciones de riesgo y enfermedades laborales.', oag: ['K'] },
                        '2.4': { texto: 'Hace uso de las herramientas y elementos de seguridad requerida para el tipo de instalacion, considerando las condiciones tecnicas y de espacio.', oag: ['C'] }
                    }
                },
                3: {
                    texto: 'Mantiene equipos electronicos conforme al tipo de sistema, considerando procedimientos establecidos y especificaciones tecnicas del fabricante.',
                    ces: {
                        '3.1': { texto: 'Elabora un plan de mantenimiento, segun uso e instrucciones consignadas en manuales.', oag: ['D'] },
                        '3.2': { texto: 'Realiza tareas de mantenimiento en equipos electronicos considerando zonas de instalacion, materiales y herramientas requeridas, respetando los tiempos asignados.', oag: ['B'] },
                        '3.3': { texto: 'Chequea operaciones de mantencion en equipos electronicos, realizando mediciones de parametros y pruebas de funcionamiento, de acuerdo a procedimientos establecidos.', oag: ['B'] },
                        '3.4': { texto: 'Elabora informes tecnicos referidos a la mantencion de equipos electronicos, comunicando en forma clara y precisa los trabajos realizados.', oag: ['A'] }
                    }
                },
                4: {
                    texto: 'Analiza funcionamiento de equipos electronicos y diagnostica fallas segun manuales, considerando las normas de seguridad establecidas.',
                    ces: {
                        '4.1': { texto: 'Diagnostica fallas en equipos electronicos en relacion al tipo de sintoma presentado, siguiendo protocolos de busqueda y localizacion de fallas.', oag: ['B'] },
                        '4.2': { texto: 'Cambia componentes, partes o piezas de un equipo electronico, aplicando las tecnicas indicadas en manuales especificos de reparacion.', oag: ['B'] },
                        '4.3': { texto: 'Verifica el funcionamiento de equipos electronicos segun instrucciones consignadas en manuales tecnicos y, respetando normativa de seguridad.', oag: ['K'] }
                    }
                },
                5: {
                    texto: 'Remplaza componentes y dispositivos electronicos pasivos y activos de acuerdo a especificaciones tecnicas de cada uno.',
                    ces: {
                        '5.1': { texto: 'Interpreta un esquema electronico, reconociendo cada componente, con la finalidad de buscar el remplazo mas adecuado.', oag: ['B'] },
                        '5.2': { texto: 'Remplaza los componentes electronicos tanto pasivos como activos, aplicando tecnicas de soldadura y manejo de herramientas e instrumentos, de acuerdo a especificaciones tecnicas.', oag: ['B'] },
                        '5.3': { texto: 'Utiliza la informacion consignada en manuales, planos y otros con la finalidad de encontrar la alternativa mas adecuada durante la intervencion del circuito.', oag: ['B'] },
                        '5.4': { texto: 'Crea o disena en caso de ser necesario pequenos circuitos electronicos, de caracteristicas similares a las originales, con la finalidad de dejar operativo el equipo.', oag: ['B'] }
                    }
                }
            }
        },

        'EN2': {
            num: 'EN2',
            nombre: 'Armado y Reparacion de Circuitos Electronicos',
            nivel: '3ro',
            horas: 228,
            oas: {
                'OA3': 'Armar y ensamblar circuitos electronicos basicos, analogicos y digitales, y repararlos cuando corresponda, de acuerdo a manuales de procedimiento.'
            },
            aes: {
                1: {
                    texto: 'Elabora circuitos electronicos de ensayo, aplicando diversas tecnicas de diseno, previendo situaciones de riesgo en la manipulacion de quimicos y herramientas.',
                    ces: {
                        '1.1': { texto: 'Dibuja las pistas para un circuito impreso, aplicando distintas tecnicas de diseno, segun la complejidad del diagrama electronico.', oag: ['B'] },
                        '1.2': { texto: 'Crea circuitos impresos basicos, segun los requerimientos, previendo situaciones de riesgo en la manipulacion de quimicos y herramientas.', oag: ['K'] },
                        '1.3': { texto: 'Selecciona los dispositivos y componentes adecuados, segun el tipo de circuito a montar, considerando especificaciones tecnicas.', oag: ['B'] },
                        '1.4': { texto: 'Utiliza herramientas de montaje y ensamblado para circuitos electronicos, tales como estaciones de soldaduras, maquinarias e instrumentos de chequeo.', oag: ['C'] }
                    }
                },
                2: {
                    texto: 'Arma circuitos electronicos analogicos basicos de acuerdo a manuales de procedimiento, cumpliendo plazos establecidos y estandares de calidad.',
                    ces: {
                        '2.1': { texto: 'Selecciona los dispositivos y componentes electronicos segun el diagrama esquematico a montar, considerando manuales de especificaciones tecnicas.', oag: ['B'] },
                        '2.2': { texto: 'Verifica el correcto funcionamiento de cada componente, correspondiente a un circuito electronico analogico, utilizando instrumentos de medida y hojas de datos tecnicos.', oag: ['B'] },
                        '2.3': { texto: 'Arma circuitos electronicos analogicos basicos, aplicando tecnicas de manipulacion y de montaje para componentes electronicos, cumpliendo plazos establecidos.', oag: ['C'] },
                        '2.4': { texto: 'Comprueba el correcto funcionamiento de circuitos electronicos analogicos, realizando medicion de parametros, previendo situaciones de riesgo.', oag: ['K'] },
                        '2.5': { texto: 'Modifica circuitos electronicos basicos, utilizando software de diseno y simulacion de circuitos, en una perspectiva de eficiencia energetica.', oag: ['I'] }
                    }
                },
                3: {
                    texto: 'Repara y mantiene equipos electronicos basicos, segun requerimientos y especificaciones tecnicas.',
                    ces: {
                        '3.1': { texto: 'Diagnostica fallas en equipos electronicos basicos, empleando distintos medios en la busqueda y diagnostico de averias.', oag: ['K'] },
                        '3.2': { texto: 'Cambia componentes, partes o equipos danados, en sistemas electronicos basicos, considerando el tipo de averia y las especificaciones tecnicas.', oag: ['B'] },
                        '3.3': { texto: 'Actualiza el sistema operativo, cuando corresponda, segun indicaciones de los fabricantes, resguardando la normativa vigente.', oag: ['J'] },
                        '3.4': { texto: 'Elabora informes tecnicos referidos a la mantencion y reparacion de equipos electronicos, comunicando en forma clara y precisa los trabajos realizados.', oag: ['H'] }
                    }
                },
                4: {
                    texto: 'Ensambla circuitos electronicos, analogicos y digitales, de acuerdo a manuales de procedimiento.',
                    ces: {
                        '4.1': { texto: 'Prepara las condiciones necesarias para realizar tareas de ensamblaje de equipos electronicos, revisando herramientas e instrumentos, segun normas de seguridad.', oag: ['J'] },
                        '4.2': { texto: 'Clasifica las partes y piezas del equipo a ensamblar, dando un orden logico para mayor fluidez del proceso.', oag: ['B'] },
                        '4.3': { texto: 'Ensambla y realiza pruebas de control de calidad, utilizando los instrumentos adecuados, segun protocolos establecidos.', oag: ['J'] },
                        '4.4': { texto: 'Elabora informes tecnicos referidos a fallas reiterativas o defectos de fabricacion en equipos electronicos ensamblados.', oag: ['H'] }
                    }
                }
            }
        },

        'EN3': {
            num: 'EN3',
            nombre: 'Ensamblaje y Mantencion de Sistemas y Equipos Digitales',
            nivel: '3ro',
            horas: 228,
            oas: {
                'OA3': 'Armar y ensamblar circuitos electronicos basicos, analogicos y digitales, y repararlos cuando corresponda, de acuerdo a manuales de procedimiento.'
            },
            aes: {
                1: {
                    texto: 'Ensambla circuitos electronicos digitales para equipos basicos, comprobando su logica de funcionamiento, de acuerdo a manuales de procedimiento.',
                    ces: {
                        '1.1': { texto: 'Predice el comportamiento de circuitos electronicos digitales, basado en distintos teoremas, de acuerdo a manuales de procedimiento.', oag: ['B'] },
                        '1.2': { texto: 'Selecciona circuitos integrados digitales, segun el diagrama esquematico a montar, considerando manuales de especificaciones tecnicas.', oag: ['B'] },
                        '1.3': { texto: 'Verifica el correcto funcionamiento de cada componente digital, utilizando instrumentos de medida y hojas de datos tecnicos.', oag: ['B'] },
                        '1.4': { texto: 'Arma circuitos electronicos digitales basicos, aplicando tecnicas de manipulacion y ensamblaje, cumpliendo plazos y estandares de calidad.', oag: ['C'] },
                        '1.5': { texto: 'Comprueba el correcto funcionamiento de circuitos electronicos digitales, realizando mediciones de distintos parametros.', oag: ['K'] },
                        '1.6': { texto: 'Modifica circuitos electronicos basicos, mediante la aplicacion de teoremas de logica digital, en perspectiva de eficiencia energetica.', oag: ['I'] },
                        '1.7': { texto: 'Realiza pruebas de funcionamiento a circuitos electronicos, mediante instrumentos y aplica protocolos establecidos y normas de seguridad.', oag: ['B'] }
                    }
                },
                2: {
                    texto: 'Arma y configura en forma prolija un computador, de acuerdo a manuales de procedimiento.',
                    ces: {
                        '2.1': { texto: 'Organiza y selecciona los materiales e insumos a utilizar durante el armado de computadores, basandose en manuales especificos.', oag: ['B'] },
                        '2.2': { texto: 'Ensambla el hardware de un computador, previendo los cuidados necesarios, indicados en manuales tecnicos.', oag: ['B'] },
                        '2.3': { texto: 'Instala y configura el sistema operativo en un computador, acorde a los requerimientos del usuario.', oag: ['H'] },
                        '2.4': { texto: 'Ejecuta los procedimientos de control y calidad, para los distintos tipos de computadores ensamblados.', oag: ['B'] },
                        '2.5': { texto: 'Verifica el funcionamiento del equipo, haciendo uso de procedimientos establecidos.', oag: ['B'] }
                    }
                },
                3: {
                    texto: 'Repara y mantiene equipos electronicos basicos, segun requerimientos y especificaciones tecnicas.',
                    ces: {
                        '3.1': { texto: 'Diagnostica fallas en equipos electronicos basicos, empleando distintos medios en la busqueda y diagnostico de averias.', oag: ['J'] },
                        '3.2': { texto: 'Remplaza componentes, partes o equipos danados, en sistemas electronicos basicos, considerando el tipo de averia.', oag: ['B'] },
                        '3.3': { texto: 'Actualiza el sistema operativo, cuando corresponda, de acuerdo a las indicaciones de los fabricantes.', oag: ['J'] },
                        '3.4': { texto: 'Realiza pruebas de funcionamiento, aplicando formulas, pautas y rutinas establecidas.', oag: ['B'] },
                        '3.5': { texto: 'Elabora informes tecnicos referidos a la mantencion y reparacion de equipos electronicos.', oag: ['H'] }
                    }
                },
                4: {
                    texto: 'Realiza analisis tecnico para la instalacion de equipos electronicos segun manual de uso y especificaciones tecnicas.',
                    ces: {
                        '4.1': { texto: 'Inspecciona espacios fisicos para la instalacion de equipos electronicos de acuerdo a disposicion y usabilidad.', oag: ['K'] },
                        '4.2': { texto: 'Contrasta informacion tecnica, verifica valores nominales de las magnitudes para instalacion del equipo.', oag: ['A'] },
                        '4.3': { texto: 'Genera procedimiento de instalacion de equipos de acuerdo a especificaciones y caracteristicas tecnicas.', oag: ['K'] }
                    }
                }
            }
        },

        'EN4': {
            num: 'EN4',
            nombre: 'Sistemas de Control Domotico',
            nivel: '3ro',
            horas: 190,
            oas: {
                'OA6': 'Configurar el funcionamiento automatico de sistemas y equipos electronicos simples, tales como equipos de domotica, ascensores, portones electricos, riego automatizado, iluminacion y otros.'
            },
            aes: {
                1: {
                    texto: 'Utiliza equipos de domotica para el control de sistemas electronicos, de acuerdo a requerimientos y especificaciones tecnicas.',
                    ces: {
                        '1.1': { texto: 'Examina equipos de domotica, siguiendo especificaciones tecnicas del fabricante, y los manuales de uso.', oag: ['B'] },
                        '1.2': { texto: 'Instala equipos de domotica para el control de sistemas electronicos, segun proyecto, respetando protocolo de seguridad y privacidad.', oag: ['K'] },
                        '1.3': { texto: 'Configura y programa equipos de domotica, de acuerdo a requerimientos y especificaciones tecnicas.', oag: ['B'] },
                        '1.4': { texto: 'Mantiene y mejora los sistemas de domotica, optimizando los recursos, respetando el medio ambiente.', oag: ['I'] },
                        '1.5': { texto: 'Realiza pruebas de funcionamiento, aplicando pautas y rutinas establecidas para ello.', oag: ['B'] }
                    }
                },
                2: {
                    texto: 'Mantiene sistemas y equipos electronicos automaticos, de acuerdo a instrucciones y procedimientos establecidos.',
                    ces: {
                        '2.1': { texto: 'Opera sistemas y equipo electronicos considerando ahorro energetico de acuerdo a manuales del fabricante y normas de seguridad.', oag: ['B'] },
                        '2.2': { texto: 'Mantiene sistemas y equipo electronicos, haciendo uso de herramientas e instrumentos adecuados.', oag: ['B'] },
                        '2.3': { texto: 'Realiza pruebas de funcionamiento de los equipos y sistemas electronicos, haciendo uso de instrumentos y protocolos.', oag: ['K'] },
                        '2.4': { texto: 'Elabora informes tecnicos referidos a la mantencion y reparacion de equipos electronicos.', oag: ['A'] }
                    }
                },
                3: {
                    texto: 'Implementa los distintos tipos de instalaciones de alumbrado electrico en baja tension, de acuerdo a las indicaciones del proyecto.',
                    ces: {
                        '3.1': { texto: 'Chequea parametros basicos de corriente y potencia electrica para la instalacion de alumbrado.', oag: ['C'] },
                        '3.2': { texto: 'Elabora una lista de insumos y materiales requeridos en la instalacion de alumbrado de baja tension.', oag: ['A'] },
                        '3.3': { texto: 'Organiza los elementos requeridos para la instalacion de alumbrado, considerando herramientas e instrumentos de seguridad.', oag: ['I'] },
                        '3.4': { texto: 'Monta los componentes y ductos requeridos para la instalacion de alumbrado de baja tension.', oag: ['B'] },
                        '3.5': { texto: 'Verifica el funcionamiento de las diferentes instalaciones de alumbrado.', oag: ['K'] }
                    }
                },
                4: {
                    texto: 'Instala equipos electronicos, segun requerimientos del usuario, e instrucciones consignadas en manuales.',
                    ces: {
                        '4.1': { texto: 'Monta los equipos electronicos y dispositivos asociados, de acuerdo al manual, siguiendo las instrucciones del proyecto.', oag: ['B'] },
                        '4.2': { texto: 'Comprueba el funcionamiento de la instalacion, midiendo parametros en los puntos mas relevantes.', oag: ['K'] },
                        '4.3': { texto: 'Hace uso de las herramientas y elementos de seguridad requeridos para el tipo de instalacion.', oag: ['C'] },
                        '4.4': { texto: 'Verifica el funcionamiento de los equipos haciendo uso de herramientas e instrumentos apropiados.', oag: ['K'] }
                    }
                }
            }
        },

        'EN11': {
            num: 'EN11',
            nombre: 'Sistemas Mecatronicos y Roboticos',
            nivel: '3ro',
            horas: 114,
            oas: {
                'OA1': 'Leer y utilizar informacion tecnica consignada en manuales, planos, croquis, instrucciones y proyectos de instalacion electronicos.',
                'OA8': 'Aplicar los principios de la mecatronica y la robotica en el analisis, diseno, programacion y construccion de sistemas automatizados de baja complejidad.'
            },
            aes: {
                1: {
                    texto: 'Realiza analisis tecnico de sistemas mecatronicos aplicados, identificando sus componentes mecanicos, electronicos y de control.',
                    ces: {
                        '1.1': { texto: 'Identifica los componentes mecanicos, electronicos y de control presentes en distintos sistemas mecatronicos, clasificandolos segun su funcion.', oag: ['B','H'] },
                        '1.2': { texto: 'Interpreta esquemas, diagramas funcionales o simbologia tecnica de sistemas mecatronicos.', oag: ['A','B'] },
                        '1.3': { texto: 'Evalua el funcionamiento de un sistema mecatronico sencillo mediante observacion directa o simulacion.', oag: ['B','C'] },
                        '1.4': { texto: 'Aplica normas de seguridad, orden y prevencion de riesgos en el analisis y manipulacion de componentes mecatronicos.', oag: ['F','K'] }
                    }
                },
                2: {
                    texto: 'Disena, fabrica y ensambla piezas y prototipos mecanicos utilizando software CAD 3D y tecnicas de manufactura digital.',
                    ces: {
                        '2.1': { texto: 'Modela piezas y ensambles en software CAD 3D, aplicando correctamente herramientas de dibujo, cotas y restricciones geometricas.', oag: ['B','H'] },
                        '2.2': { texto: 'Genera planos tecnicos con simbologia, vistas y tolerancias normalizadas, respetando las normas ISO y ANSI.', oag: ['A','B'] },
                        '2.3': { texto: 'Configura parametros y ejecuta procesos de manufactura digital (impresion 3D, corte laser u otros).', oag: ['B','H'] },
                        '2.4': { texto: 'Ensambla las piezas fabricadas en un prototipo mecanico funcional, comprobando ajustes, tolerancias y alineacion.', oag: ['B','C'] }
                    }
                },
                3: {
                    texto: 'Programa dispositivos electronicos programables para el control de sistemas mecatronicos.',
                    ces: {
                        '3.1': { texto: 'Elabora codigos funcionales para el control de dispositivos electronicos programables, aplicando estructuras basicas de control.', oag: ['B','C'] },
                        '3.2': { texto: 'Desarrolla programas que integren sensores, actuadores y salidas de control.', oag: ['B','C'] },
                        '3.3': { texto: 'Configura y prueba el funcionamiento del sistema programado, verificando el cumplimiento de la logica establecida.', oag: ['B','C'] },
                        '3.4': { texto: 'Documenta el codigo y resultados del programa, explicando su estructura y funcionamiento.', oag: ['A','C'] }
                    }
                },
                4: {
                    texto: 'Integra sistemas roboticos basicos, configurando sensores, actuadores y controladores programables.',
                    ces: {
                        '4.1': { texto: 'Selecciona y conecta sensores, actuadores y controladores programables de acuerdo con los requerimientos del sistema robotico.', oag: ['B','H'] },
                        '4.2': { texto: 'Configura los dispositivos del sistema robotico en funcion del programa de control establecido.', oag: ['B','C'] },
                        '4.3': { texto: 'Integra los distintos componentes del sistema robotico, comprobando el funcionamiento general del sistema.', oag: ['B','C'] },
                        '4.4': { texto: 'Realiza pruebas de funcionamiento y calibracion del sistema robotico, ajustando parametros de movimiento.', oag: ['C','F'] }
                    }
                },
                5: {
                    texto: 'Disena y construye un proyecto mecatronico funcional que combine diseno, fabricacion, programacion y control.',
                    ces: {
                        '5.1': { texto: 'Planifica el proyecto mecatronico, definiendo objetivos, recursos, tiempos, responsables y criterios de evaluacion.', oag: ['B','C'] },
                        '5.2': { texto: 'Construye el prototipo mecatronico integrando diseno, fabricacion, programacion y control.', oag: ['B','C'] },
                        '5.3': { texto: 'Documenta el desarrollo del proyecto mediante informes tecnicos, planos, codigos y registros fotograficos.', oag: ['A','B'] },
                        '5.4': { texto: 'Presenta y defiende el proyecto de forma oral y practica, argumentando las decisiones tecnicas adoptadas.', oag: ['A','C'] }
                    }
                }
            }
        },

        // ========== 4to MEDIO ==========
        'EN5': {
            num: 'EN5',
            nombre: 'Mantencion y Operacion de Equipos de Control Electronico de Potencia',
            nivel: '4to',
            horas: 152,
            oas: {
                'OA1': 'Leer y utilizar informacion tecnica consignada en manuales, planos, croquis, instrucciones y proyectos de instalacion electronicos.',
                'OA5': 'Mantener preventiva y correctivamente equipos, sistemas, dispositivos y componentes electronicos, utilizando instrumentos y materiales apropiados.'
            },
            aes: {
                1: {
                    texto: 'Elabora planes de mantenimientos preventivos y correctivos para sistemas electronicos, de acuerdo a normativas y especificaciones tecnicas.',
                    ces: {
                        '1.1': { texto: 'Recopila los datos necesarios para la elaboracion de un plan de mantencion, propiciando el trabajo en equipo.', oag: ['D'] },
                        '1.2': { texto: 'Dibuja planos, croquis y diagramas esquematicos, considerando las especificaciones tecnicas necesarias para la mantencion.', oag: ['B'] },
                        '1.3': { texto: 'Disena planes de mantenimientos preventivos y correctivos apoyandose en planos y datos obtenidos.', oag: ['D'] },
                        '1.4': { texto: 'Realiza un levantamiento del cableado, con la finalidad de optimizar los planes de mantencion elaborados.', oag: ['K'] },
                        '1.5': { texto: 'Propone plan de mantenimiento para sistemas electronicos, considerando exigencias de la industria y eficiencia energetica.', oag: ['I'] }
                    }
                },
                2: {
                    texto: 'Mantiene preventivamente sistemas con dispositivos y componentes electronicos, de acuerdo a especificaciones tecnicas y planes de mantenimiento.',
                    ces: {
                        '2.1': { texto: 'Extrae informacion de manuales y protocolos de funcionamiento, para uso y manejo de sistemas con dispositivos electronicos.', oag: ['A'] },
                        '2.2': { texto: 'Realiza mantencion preventiva a sistemas con dispositivos y componentes electronicos de generacion y conversion de energia.', oag: ['B'] },
                        '2.3': { texto: 'Protege preventivamente sistemas con dispositivos y componentes electronicos de control.', oag: ['B'] },
                        '2.4': { texto: 'Inspecciona preventivamente sistemas electronicos industriales de acuerdo a especificaciones tecnicas.', oag: ['B'] },
                        '2.5': { texto: 'Disena un plan de mantenimiento preventivo en sistemas electro neumaticos y otros.', oag: ['B'] }
                    }
                },
                3: {
                    texto: 'Realiza mantencion correctiva a sistemas con dispositivos y componentes electronicos y electroneumaticos.',
                    ces: {
                        '3.1': { texto: 'Inspecciona sistemas electronicos, haciendo uso de instrumentos y herramientas adecuadas.', oag: ['C'] },
                        '3.2': { texto: 'Selecciona los equipos e insumos necesarios de acuerdo al diseno y caracteristicas tecnicas de sistema.', oag: ['B'] },
                        '3.3': { texto: 'Conecta y prueba equipos electronicos industriales, de acuerdo a especificaciones tecnicas.', oag: ['B'] },
                        '3.4': { texto: 'Mantiene correctivamente sistemas con dispositivos y componentes electronicos y electro neumaticos.', oag: ['B'] },
                        '3.5': { texto: 'Comprueba el funcionamiento del sistema, midiendo parametros en los puntos mas relevantes.', oag: ['B'] }
                    }
                },
                4: {
                    texto: 'Realiza la mantencion de servomecanismos con control electronico industrial.',
                    ces: {
                        '4.1': { texto: 'Inspecciona sistemas de servomecanismos electronicos (motor paso a paso, driver de control, servomotores y otros).', oag: ['C'] },
                        '4.2': { texto: 'Selecciona los equipos e insumos necesarios para el desarme de sistemas con servomecanismos.', oag: ['B'] },
                        '4.3': { texto: 'Remplaza y/o repara partes y piezas danadas o fatigadas, utilizando herramientas e instrumentos de precision.', oag: ['B'] },
                        '4.4': { texto: 'Calcula, sincroniza y calibra los sistemas de control para servomecanismos electronicos.', oag: ['B'] },
                        '4.5': { texto: 'Comprueba el funcionamiento de servomecanismos electronicos, midiendo parametros en los puntos mas relevantes.', oag: ['K'] }
                    }
                }
            }
        },

        'EN6': {
            num: 'EN6',
            nombre: 'Deteccion de Fallas Industriales',
            nivel: '4to',
            horas: 152,
            oas: {
                'OA2': 'Inspeccionar y diagnosticar fallas de funcionamiento en circuitos electronicos, equipos y sistemas electronicos industriales, con o sin control automatico.'
            },
            aes: {
                1: {
                    texto: 'Inspecciona equipos y circuitos electronicos industriales respetando protocolos y normas de seguridad.',
                    ces: {
                        '1.1': { texto: 'Examina circuitos electronicos industriales, utilizando herramientas e instrumentos adecuados, respetando protocolos.', oag: ['B'] },
                        '1.2': { texto: 'Revisa equipos electronicos industriales haciendo uso de las herramientas especificas y aplicando normas de seguridad.', oag: ['B'] },
                        '1.3': { texto: 'Verifica el funcionamiento de equipos y circuitos segun instrucciones consignadas en manuales tecnicos.', oag: ['B'] }
                    }
                },
                2: {
                    texto: 'Diagnostica fallas en sistemas electronicos industriales, respetando protocolos, normas de seguridad y especificaciones tecnicas.',
                    ces: {
                        '2.1': { texto: 'Diagnostica fallas en sistemas de control automatico usados en la industria, monitoreando y forzando variables.', oag: ['B'] },
                        '2.2': { texto: 'Remplaza los dispositivos, equipos e instrumentos industriales danados, respetando normas de seguridad.', oag: ['B'] },
                        '2.3': { texto: 'Elabora informes tecnicos referidos al diagnostico y fallas de sistemas electronicos.', oag: ['A'] }
                    }
                },
                3: {
                    texto: 'Mantiene equipos y sistemas electronicos industriales, con y sin control automatico.',
                    ces: {
                        '3.1': { texto: 'Elabora un plan de mantencion, preventivo y correctivo, para los tres tipos de control industrial.', oag: ['D'] },
                        '3.2': { texto: 'Realiza trabajos de mantenimiento preventivo, para los distintos tipos de control industrial.', oag: ['B'] },
                        '3.3': { texto: 'Ejecuta mantenimiento correctivo, para control industrial, segun diagnostico de falla.', oag: ['C'] },
                        '3.4': { texto: 'Realiza pruebas de funcionamiento, aplicando pautas y rutinas establecidas.', oag: ['B'] }
                    }
                },
                4: {
                    texto: 'Analiza funcionamiento de equipos electronicos y diagnostica fallas segun manuales.',
                    ces: {
                        '4.1': { texto: 'Examina el funcionamiento de los equipos electronicos haciendo uso de herramientas e instrumentos.', oag: ['K'] },
                        '4.2': { texto: 'Diagnostica fallas en equipos electronicos en relacion al tipo de sintoma presentado.', oag: ['B'] },
                        '4.3': { texto: 'Remplaza componentes, partes o piezas de un equipo electronico, aplicando las tecnicas indicadas en manuales.', oag: ['B'] },
                        '4.4': { texto: 'Verifica el funcionamiento de equipos electronicos segun instrucciones consignadas en manuales tecnicos.', oag: ['B'] }
                    }
                }
            }
        },

        'EN7': {
            num: 'EN7',
            nombre: 'Operacion y Programacion de Equipos de Control Electrico Industrial',
            nivel: '4to',
            horas: 152,
            oas: {
                'OA7': 'Modificar programas y parametros, en equipos y sistemas electricos y electronicos utilizados en control de procesos, segun requerimientos operacionales del equipo o planta y la normativa electrica vigente.'
            },
            aes: {
                1: {
                    texto: 'Opera sistemas de control electrico semiautomatico, de acuerdo a requerimientos del equipo.',
                    ces: {
                        '1.1': { texto: 'Busca informacion en manuales acerca del funcionamiento de sistemas de control semiautomaticos.', oag: ['B','H'] },
                        '1.2': { texto: 'Selecciona los dispositivos y componentes utilizados en el control electrico semiautomatico.', oag: ['B'] },
                        '1.3': { texto: 'Monta equipos de control electrico utilizados en diversos procesos industriales.', oag: ['B'] },
                        '1.4': { texto: 'Cambia los parametros en circuitos electricos semiautomaticos segun requerimientos operacionales.', oag: ['B','C'] },
                        '1.5': { texto: 'Realiza pruebas de funcionamiento, haciendo uso de instrumentos, aplicando medidas de seguridad.', oag: ['K'] }
                    }
                },
                2: {
                    texto: 'Modifica circuitos de control electrico, segun requerimientos operacionales de la planta.',
                    ces: {
                        '2.1': { texto: 'Selecciona los dispositivos y componentes utilizados en el control electrico automatico.', oag: ['B'] },
                        '2.2': { texto: 'Monta equipos de control electrico automaticos utilizados en diversos procesos industriales.', oag: ['B'] },
                        '2.3': { texto: 'Regula parametros en circuitos electricos automaticos, considerando los tipos de sensores conectados.', oag: ['B'] }
                    }
                },
                3: {
                    texto: 'Conecta y programa equipos de control electrico para el arranque y proteccion de procesos y maquinarias.',
                    ces: {
                        '3.1': { texto: 'Interviene sistemas de partida suave e inversion de giro para maquinas industriales.', oag: ['K'] },
                        '3.2': { texto: 'Opera sistemas de control electrico programable, configurando equipos y sistemas de control de potencia.', oag: ['B'] },
                        '3.3': { texto: 'Conecta, programa y modifica sistemas de control electrico segun requerimientos del proceso.', oag: ['B'] }
                    }
                },
                4: {
                    texto: 'Arma tableros de control y de fuerza considerando las caracteristicas de los equipos industriales.',
                    ces: {
                        '4.1': { texto: 'Monta dispositivos y equipos electronicos en tableros de control y de fuerza para maquinas industriales.', oag: ['K'] },
                        '4.2': { texto: 'Conecta los equipos y sistemas de control y de potencia, segun requerimientos de cada equipo.', oag: ['B'] },
                        '4.3': { texto: 'Configura y programa los equipos y sistemas de control y de potencia, segun requerimientos del proyecto.', oag: ['B'] },
                        '4.5': { texto: 'Verifica el funcionamiento y puesta en marcha de tableros de control y de fuerza.', oag: ['B'] }
                    }
                }
            }
        },

        'EN8': {
            num: 'EN8',
            nombre: 'Montaje de Equipos Industriales',
            nivel: '4to',
            horas: 152,
            oas: {
                'OA4': 'Instalar y montar equipos y sistemas electronicos industriales y otros, de acuerdo al diseno y caracteristicas tecnicas del proyecto, respetando la normativa electrica, ambiental y de seguridad.'
            },
            aes: {
                1: {
                    texto: 'Instala equipos electronicos Industriales, segun requerimientos, respetando la normativa electrica, ambiental y de seguridad.',
                    ces: {
                        '1.1': { texto: 'Extrae informacion del proyecto para la instalacion de equipos electronicos, considerando tipo de equipo, parametros y normas.', oag: ['B'] },
                        '1.2': { texto: 'Selecciona los insumos, herramientas y materiales necesarios para la instalacion.', oag: ['B'] },
                        '1.3': { texto: 'Instala equipos y sistemas electronicos Industriales, de acuerdo al diseno y caracteristicas tecnicas del proyecto.', oag: ['C'] },
                        '1.4': { texto: 'Conecta y prueba los diversos equipos electronicos industriales, respetando la normativa.', oag: ['B'] }
                    }
                },
                2: {
                    texto: 'Monta sistemas electronicos industriales, segun requerimientos de la industria.',
                    ces: {
                        '2.1': { texto: 'Prepara los dispositivos y sistemas electronicos industriales (variadores de frecuencia, partidores suaves, actuadores, sensores) segun planos.', oag: ['B'] },
                        '2.2': { texto: 'Manipula herramientas e instrumentos durante el montaje de equipos electronicos industriales previendo situaciones de riesgo.', oag: ['K'] },
                        '2.3': { texto: 'Monta y configura distintos equipos electronicos industriales segun la logica indicada en planos y manuales.', oag: ['B','I'] },
                        '2.4': { texto: 'Conecta y pone en marcha los distintos equipos electronicos industriales segun planos y manuales.', oag: ['A'] },
                        '2.5': { texto: 'Elabora informes tecnicos referidos al montaje de sistemas electronicos.', oag: ['A'] }
                    }
                },
                3: {
                    texto: 'Opera equipos y sistemas electricos y electronicos utilizados en la industria, segun protocolos de manejo.',
                    ces: {
                        '3.1': { texto: 'Extrae informacion de manuales y protocolos de funcionamiento, para uso y manejo de equipos y sistemas electronicos.', oag: ['A'] },
                        '3.2': { texto: 'Realiza pruebas de funcionamiento en sistemas electricos y electronicos utilizados en la industria.', oag: ['K'] },
                        '3.3': { texto: 'Opera diversos equipos y sistemas electricos y electronicos utilizados en la industria.', oag: ['K'] },
                        '3.4': { texto: 'Elabora informes tecnicos referidos a las pruebas de funcionamiento en equipos y sistemas.', oag: ['B'] }
                    }
                },
                4: {
                    texto: 'Ejecuta proyectos de instalacion de sistemas electronicos industriales.',
                    ces: {
                        '4.1': { texto: 'Extrae informacion de manuales y protocolos de funcionamiento relacionados con el proyecto a implementar.', oag: ['A'] },
                        '4.2': { texto: 'Monta los equipos electronicos de potencia en tableros de control y de Fuerza de acuerdo a indicaciones del proyecto.', oag: ['K'] },
                        '4.3': { texto: 'Conecta los equipos de electronica de potencia y realiza pruebas de funcionamiento segun protocolos.', oag: ['K'] },
                        '4.4': { texto: 'Realiza pruebas de funcionamiento en la instalacion de sistemas industriales, considerando protocolos y normas de seguridad.', oag: ['B'] }
                    }
                }
            }
        },

        'EN9': {
            num: 'EN9',
            nombre: 'Automatizacion Industrial',
            nivel: '4to',
            horas: 152,
            oas: {
                'OA7': 'Modificar programas y parametros, en equipos y sistemas electricos y electronicos utilizados en control de procesos, segun requerimientos operacionales del equipo o planta y la normativa electrica vigente.'
            },
            aes: {
                1: {
                    texto: 'Monta y conecta reles programables utilizados en el control de procesos basicos, segun requerimiento del proyecto.',
                    ces: {
                        '1.1': { texto: 'Selecciona los insumos y componentes a utilizar durante el montaje, segun caracteristicas de la planta y manuales tecnicos.', oag: ['B'] },
                        '1.2': { texto: 'Monta los equipos electronicos, considerando el tipo de hardware, de acuerdo con la documentacion tecnica.', oag: ['B'] },
                        '1.3': { texto: 'Conecta la alimentacion, entradas y salidas del rele programable con otros componentes, utilizando implementos de seguridad.', oag: ['K'] },
                        '1.4': { texto: 'Maneja y cambia los parametros electricos involucrados en la conexion de la red electrica, previendo situaciones de riesgo.', oag: ['K'] }
                    }
                },
                2: {
                    texto: 'Maneja equipos de control logico de prestaciones menores, segun normativas vigentes.',
                    ces: {
                        '2.1': { texto: 'Utiliza las instrucciones basicas de un rele programable, durante la programacion segun requerimientos del proyecto.', oag: ['B'] },
                        '2.2': { texto: 'Elabora programas de control basico, considerando las instrucciones de un rele programable, de acuerdo a normas.', oag: ['B'] },
                        '2.3': { texto: 'Controla y monitorea el funcionamiento de un programa de control, detectando fallas y problemas.', oag: ['D'] },
                        '2.4': { texto: 'Modifica programas basicos de control, ajustandose al tipo de hardware conectado y requerimientos del proyecto.', oag: ['B'] }
                    }
                },
                3: {
                    texto: 'Opera el software de los controladores logicos programables, segun requerimientos operacionales.',
                    ces: {
                        '3.1': { texto: 'Escribe y lee programas de control de procesos, en los diferentes lenguajes de programacion.', oag: ['B'] },
                        '3.2': { texto: 'Utiliza tablas de simbolo para identificar cada elemento durante la programacion, en forma ordenada.', oag: ['B'] },
                        '3.3': { texto: 'Activa y desactiva variables durante el monitoreo y control de programas.', oag: ['B'] },
                        '3.4': { texto: 'Respalda la informacion obtenida en equipos electronicos y otros medios de almacenamiento.', oag: ['D'] }
                    }
                },
                4: {
                    texto: 'Programa PLCs de gama baja y pantallas HMI, segun requerimientos del proceso industriales simples.',
                    ces: {
                        '4.1': { texto: 'Programa equipos de control industrial PLCS, en diferentes lenguajes, en perspectiva de eficiencia energetica.', oag: ['I'] },
                        '4.2': { texto: 'Modifica los programas en equipos y sistemas con controladores logicos programables PLC.', oag: ['I'] },
                        '4.3': { texto: 'Programa y opera equipos HMI segun requerimientos operacionales del proceso o planta industrial.', oag: ['B'] },
                        '4.4': { texto: 'Modifica parametros y programas en equipos de control industrial, en perspectiva de eficiencia energetica y cuidado ambiental.', oag: ['I'] }
                    }
                },
                5: {
                    texto: 'Mantiene equipos electronicos de control automatico industrial, conforme al tipo de sistema.',
                    ces: {
                        '5.1': { texto: 'Elabora un plan de mantenimiento para equipos automatizados, segun uso e instrucciones consignadas en manuales.', oag: ['D'] },
                        '5.2': { texto: 'Realiza tareas de mantenimiento en equipos electronicos considerando zonas de instalacion, materiales y herramientas.', oag: ['C'] },
                        '5.3': { texto: 'Remplaza automatas programables o modulos segun corresponda al tipo y problema, cargando los programas necesarios.', oag: ['B'] }
                    }
                }
            }
        }
    };

    // =============================================
    // DEFINICIONES OAG
    // =============================================
var OAG_DEFINICIONES = {
        'A': 'Comunicarse oralmente y por escrito con claridad, utilizando registros de habla y de escritura pertinentes a la situacion laboral.',
        'B': 'Leer y utilizar distintos tipos de textos relacionados con el trabajo, tales como especificaciones tecnicas, normativas diversas, legislacion laboral.',
        'C': 'Realizar las tareas de manera prolija, cumpliendo plazos establecidos y estandares de calidad, y buscando alternativas y soluciones.',
        'D': 'Trabajar eficazmente en equipo, coordinando acciones con otros, solicitando y prestando cooperacion para el buen cumplimiento de sus tareas.',
        'E': 'Tratar con respeto a subordinados, superiores, colegas, clientes, personas con discapacidades, sin hacer distinciones.',
        'F': 'Respetar y solicitar el respeto de deberes y derechos laborales establecidos, asi como de aquellas normas culturales internas de la organizacion.',
        'G': 'Participar en diversas situaciones de aprendizaje, formales e informales, y calificarse para desarrollar mejor su trabajo.',
        'H': 'Manejar tecnologias de la informacion y comunicacion para obtener y procesar informacion pertinente al trabajo.',
        'I': 'Utilizar eficientemente los insumos para los procesos productivos y disponer cuidadosamente los desechos, en perspectiva de eficiencia energetica y cuidado ambiental.',
        'J': 'Emprender iniciativas utiles en los lugares de trabajo y/o proyectos propios, aplicando principios basicos de gestion financiera.',
        'K': 'Prevenir situaciones de riesgo y enfermedades ocupacionales, evaluando las condiciones del entorno del trabajo y utilizando los elementos de proteccion personal.'
    };
