/* ============================================================
   Click&Clase — Motor de Recomendaciones Curriculares v1.0
   Especialidad Electrónica
   ============================================================
   Uso:
     renderRecomendaciones('EN1', '3', 'OA1')
   Requiere un <div id="recsPanel"></div> en la página.
   ============================================================ */

// ============================================================
// BASE DE DATOS DE RECOMENDACIONES
// ============================================================
var REC_DB = {

    /* ─────────────────────────────────────────────────────────
       EN1 · PROYECTOS ELECTRÓNICOS  (3ro Medio · 190h)
    ───────────────────────────────────────────────────────── */
    'EN1': {
        nombre: 'Proyectos Electrónicos',
        emoji: '🔌',
        videos: [
            { titulo: 'Cómo leer un esquema electrónico (paso a paso)', canal: 'Naso Electrónica', duracion: '18 min', nivel: 'básico',
              desc: 'Simbología estándar, identificación de componentes en planos y trazado de señales.',
              url: 'https://www.youtube.com/results?search_query=como+leer+esquema+electronico+español' },
            { titulo: 'Uso profesional del multímetro digital', canal: 'ElectroMike', duracion: '22 min', nivel: 'básico',
              desc: 'Medición de voltaje, corriente y resistencia. Continuidad y prueba de diodos.',
              url: 'https://www.youtube.com/results?search_query=uso+multimetro+digital+electronica+español' },
            { titulo: 'Identificación de componentes electrónicos pasivos y activos', canal: 'Electronoobs', duracion: '15 min', nivel: 'básico',
              desc: 'Resistencias (código de colores), capacitores, inductores, diodos, transistores. Ideal para inicio de módulo.',
              url: 'https://www.youtube.com/results?search_query=componentes+electronicos+identificacion+pasivos+activos' },
            { titulo: 'Normativa eléctrica y seguridad en taller electrónico', canal: 'JC Electrónica', duracion: '12 min', nivel: 'básico',
              desc: 'EPP obligatorio, riesgo eléctrico, primeros auxilios ante descarga. Obligatorio antes del taller.',
              url: 'https://www.youtube.com/results?search_query=seguridad+taller+electronica+EPP+norma' }
        ],
        sitios: [
            { nombre: 'Electronics Tutorials', url: 'https://www.electronics-tutorials.ws', tipo: 'Referencia',
              desc: 'Explicaciones detalladas de cada componente y ley de electrónica. El mejor recurso de fundamentos.' },
            { nombre: 'All About Circuits', url: 'https://www.allaboutcircuits.com', tipo: 'Referencia',
              desc: 'Libro online gratuito: DC, AC, semiconductores, circuitos digitales y más.' },
            { nombre: 'Tinkercad Circuits', url: 'https://www.tinkercad.com/circuits', tipo: 'Simulador',
              desc: 'Simulador de circuitos gratuito en el navegador. Ideal para demostraciones en clases expositivas.' },
            { nombre: 'Datasheets PDF', url: 'https://www.datasheetspdf.com', tipo: 'Datasheets',
              desc: 'Buscador de hojas de datos de cualquier componente electrónico.' }
        ],
        herramientas: [
            { nombre: 'Tinkercad Circuits', url: 'https://www.tinkercad.com/circuits', gratuito: true,
              desc: 'Simulación de circuitos en el navegador, sin instalación. Perfecto para estudiantes.' },
            { nombre: 'Multisim Live', url: 'https://www.multisim.com/create/', gratuito: true,
              desc: 'Simulador online de NI. Permite simular circuitos analógicos y digitales con osciloscopio virtual.' },
            { nombre: 'Fritzing', url: 'https://fritzing.org', gratuito: true,
              desc: 'Diseño de prototipos en protoboard, esquemático y PCB. Ideal para documentar proyectos.' }
        ],
        libros: [
            { titulo: 'Principios de Electrónica', autor: 'Albert Malvino & David Bates', desc: 'El clásico para nivel técnico. Cubre todos los componentes de EN1. Ed. McGraw-Hill.' },
            { titulo: 'Electrónica: Teoría de Circuitos y Dispositivos', autor: 'Robert Boylestad', desc: 'Base teórica sólida, con ejemplos resueltos. Ed. Pearson.' }
        ],
        aes: {
            '1': {
                conceptos: ['Valores nominales', 'Instrumentos de medición', 'Especificaciones técnicas', 'Normas IEC/NCh', 'Procedimientos de instalación'],
                actividades: [
                    '🔬 Taller: medir valores de 10 componentes reales con multímetro y comparar con datasheet.',
                    '📋 Análisis de manual: identificar valores nominales en manual de un equipo real del taller.',
                    '💻 Simulación: armar el circuito del esquemático en Tinkercad y verificar funcionamiento.',
                    '📝 Elaborar un procedimiento de instalación paso a paso para un equipo asignado.'
                ],
                errores: [
                    '⚠️ Confundir tensión de trabajo con tensión máxima del componente.',
                    '⚠️ No verificar la polaridad de capacitores electrolíticos antes de insertar.',
                    '⚠️ Olvidar conectar tierra de protección (PE) en equipos clase I.'
                ],
                sugerencia: 'Comienza con un equipo real del taller (fuente regulada, osciloscopio o cargador industrial). Pide a los estudiantes identificar en el manual los valores nominales ANTES de encender. Luego miden con multímetro y comparan.'
            },
            '2': {
                conceptos: ['Herramientas de instalación', 'Planos y croquis', 'Montaje mecánico', 'Comprobación de funcionamiento', 'Seguridad operacional'],
                actividades: [
                    '🔧 Taller: instalar una fuente de alimentación siguiendo el manual técnico paso a paso.',
                    '📐 Interpretar un plano de instalación y marcar en papel los pasos a seguir.',
                    '✅ Check-list de seguridad pre-encendido (elaborado por los estudiantes).',
                    '📹 Grabar el proceso de instalación para posterior retroalimentación entre pares.'
                ],
                errores: [
                    '⚠️ No verificar el voltaje de alimentación antes de conectar.',
                    '⚠️ Apretar tornillos sin torquímetro en terminales eléctricos (riesgo de corte o afloje).',
                    '⚠️ No respetar el orden de conexión especificado en el manual.'
                ],
                sugerencia: 'Divide la clase en grupos de 2-3 estudiantes. Cada grupo recibe un equipo diferente. Al final, cada grupo expone su procedimiento. Esto desarrolla comunicación técnica (OAG A).'
            },
            '3': {
                conceptos: ['Plan de mantención', 'Mantención preventiva', 'Mantención correctiva', 'Registro técnico', 'Check-list de revisión'],
                actividades: [
                    '📋 Elaborar un plan de mantención mensual para un equipo del taller con tabla de frecuencias.',
                    '🔍 Realizar mantención preventiva real: limpieza, ajuste de conectores, medición de parámetros.',
                    '📝 Completar ficha técnica de mantención con valores antes/después.',
                    '💡 Comparar plan propio con manual de fabricante del equipo.'
                ],
                errores: [
                    '⚠️ Confundir mantención preventiva con correctiva.',
                    '⚠️ No registrar los valores medidos durante la mantención.',
                    '⚠️ Olvidar la descarga de condensadores antes de intervenir equipos.'
                ],
                sugerencia: 'Usa equipos del propio taller para que la mantención sea real. El informe técnico escrito desarrolla OAG A (comunicación técnica). Evalúa tanto la ejecución como el informe.'
            },
            '4': {
                conceptos: ['Diagnóstico de fallas', 'Síntoma → Causa → Solución', 'Protocolos de diagnóstico', 'Instrumentos de diagnóstico', 'Árbol de fallas'],
                actividades: [
                    '🔎 Ejercicio de diagnóstico guiado: equipo con falla inducida, estudiantes usan árbol de decisión.',
                    '📊 Elaborar árbol de fallas para el equipo más común del taller.',
                    '🧪 Medir señales en puntos clave con osciloscopio y comparar con valores del manual.',
                    '🎯 Juego de rol: un grupo "falla" el equipo (sin decir qué), otro grupo diagnostica.'
                ],
                errores: [
                    '⚠️ Saltar directamente a reemplazar partes sin diagnosticar primero.',
                    '⚠️ No documentar el diagnóstico (síntoma inicial, pruebas realizadas, solución).',
                    '⚠️ Confundir síntoma con causa raíz de la falla.'
                ],
                sugerencia: 'El método síntoma→prueba→diagnóstico→solución debe ser un ritual. Pide siempre el informe escrito antes de que el equipo "sea aceptado" como reparado.'
            },
            '5': {
                conceptos: ['Lectura de datasheet', 'Componentes pasivos y activos', 'Técnica de soldadura', 'Equivalencia de componentes', 'Diseño de circuito auxiliar'],
                actividades: [
                    '🔧 Desmontar y reemplazar un componente defectuoso real con estación de soldadura.',
                    '📄 Buscar equivalente de transistor usando datasheet y tabla de sustitución.',
                    '💻 Simular el circuito con el nuevo componente antes de soldar (Tinkercad/LTspice).',
                    '⚙️ Mini-proyecto: diseñar circuito de reemplazo para una función específica.'
                ],
                errores: [
                    '⚠️ Aplicar temperatura excesiva en la soldadura (>350°C más de 3s daña el componente).',
                    '⚠️ No verificar equivalencia completa: mismo voltaje, corriente Y encapsulado.',
                    '⚠️ No proteger componentes sensibles a estática (MOSFET, CMOS) con pulsera antiestática.'
                ],
                sugerencia: 'Tener una caja de "componentes para práctica de soldadura" acelera el aprendizaje. Que cada estudiante suelde y dessuelde el mismo componente 5 veces antes de intervenir un equipo real.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN2 · ARMADO Y REPARACIÓN DE CIRCUITOS  (3ro · 228h)
    ───────────────────────────────────────────────────────── */
    'EN2': {
        nombre: 'Armado y Reparación de Circuitos Electrónicos',
        emoji: '🔧',
        videos: [
            { titulo: 'Fabricación de PCB casera (método transfer)', canal: 'Inventable', duracion: '20 min', nivel: 'intermedio',
              desc: 'Proceso completo: diseño → impresión → transfer → atacado → perforación → soldadura.',
              url: 'https://www.youtube.com/results?search_query=fabricacion+circuito+impreso+PCB+casero+electronica' },
            { titulo: 'Técnica profesional de soldadura electrónica', canal: 'Soldafácil', duracion: '25 min', nivel: 'básico',
              desc: 'Temperatura, estaño, flujo, tiempo. Soldadura de componentes THT y SMD.',
              url: 'https://www.youtube.com/results?search_query=tecnica+soldadura+electronica+tutorial+español' },
            { titulo: 'Amplificadores operacionales desde cero', canal: 'Electronoobs', duracion: '30 min', nivel: 'intermedio',
              desc: 'Configuraciones básicas del op-amp: inversor, no inversor, sumador, comparador.',
              url: 'https://www.youtube.com/results?search_query=amplificador+operacional+opamp+tutorial+español' },
            { titulo: 'Circuitos analógicos: transistor como switch y amplificador', canal: 'Naso Electrónica', duracion: '28 min', nivel: 'intermedio',
              desc: 'Regiones de operación del BJT. Diseño de polarización y ganancia.',
              url: 'https://www.youtube.com/results?search_query=transistor+BJT+switch+amplificador+tutorial+español' }
        ],
        sitios: [
            { nombre: 'EasyEDA (PCB Online)', url: 'https://easyeda.com', tipo: 'Diseño PCB',
              desc: 'Diseño de esquemáticos y PCB en el navegador. Gratuito y con biblioteca enorme de componentes.' },
            { nombre: 'KiCad EDA', url: 'https://www.kicad.org', tipo: 'Diseño PCB',
              desc: 'Software profesional de diseño PCB, gratuito y open source. Estándar industrial.' },
            { nombre: 'LTspice Online Tutorials', url: 'https://www.analog.com/en/resources/design-tools/ltspice-simulator.html', tipo: 'Simulador',
              desc: 'Simulador SPICE profesional gratuito de Analog Devices. Ideal para circuitos analógicos.' },
            { nombre: 'CircuitLab', url: 'https://www.circuitlab.com', tipo: 'Simulador',
              desc: 'Simulador en el navegador con osciloscopio y analizador de frecuencia integrado.' }
        ],
        herramientas: [
            { nombre: 'EasyEDA', url: 'https://easyeda.com', gratuito: true, desc: 'Diseño PCB online, sin instalación. Integrado con tienda de componentes.' },
            { nombre: 'LTspice', url: 'https://www.analog.com/en/resources/design-tools/ltspice-simulator.html', gratuito: true, desc: 'El simulador SPICE más usado en la industria. Imprescindible para circuitos analógicos.' },
            { nombre: 'KiCad', url: 'https://www.kicad.org', gratuito: true, desc: 'Software profesional de PCB. Open source, usado por empresas reales.' }
        ],
        libros: [
            { titulo: 'El Arte de la Electrónica', autor: 'Horowitz & Hill', desc: 'La biblia de la electrónica analógica y digital. Lectura obligada para EN2.' },
            { titulo: 'Análisis de Circuitos en Ingeniería', autor: 'Hayt & Kemmerly', desc: 'Teoría de circuitos con análisis nodal, de mallas y transitorio.' }
        ],
        aes: {
            '1': {
                conceptos: ['Diseño de pistas PCB', 'Circuito impreso', 'Atacado químico', 'Reglas de diseño (clearance, ancho de pista)', 'Footprint de componentes'],
                actividades: [
                    '💻 Diseñar el layout PCB de un circuito simple (amplificador + LED) en EasyEDA.',
                    '🧪 Fabricar PCB en el taller usando método de transfer térmico o serigrafía.',
                    '🔍 Comparar PCB fabricada con diseño digital: medir pistas con calibre.',
                    '📐 Calcular ancho mínimo de pista según corriente máxima (IPC-2221).'
                ],
                errores: [
                    '⚠️ No respetar separación mínima entre pistas de diferente potencial.',
                    '⚠️ Olvidar el plano de tierra (GND) en el diseño, causando ruido e interferencias.',
                    '⚠️ Sobreatacar o subatacar el PCB por tiempo o temperatura incorrectos del FeCl₃.'
                ],
                sugerencia: 'Permite que los estudiantes diseñen el PCB en EasyEDA en clase y envía los archivos Gerber a un servicio online (JLCPCB) para mostrarles el proceso real de fabricación industrial.'
            },
            '2': {
                conceptos: ['Circuitos analógicos', 'Amplificadores BJT/FET', 'Respuesta en frecuencia', 'Distorsión', 'Punto Q de operación'],
                actividades: [
                    '⚡ Armar amplificador de una etapa con transistor BC547 y medir ganancia real vs calculada.',
                    '📊 Medir respuesta en frecuencia con generador de señales y osciloscopio.',
                    '🔧 Reemplazar un componente defectuoso y documentar el proceso de diagnóstico.',
                    '💻 Simular el circuito en LTspice y comparar con resultado real del taller.'
                ],
                errores: [
                    '⚠️ No polarizar correctamente el transistor → el amplificador satura o corta.',
                    '⚠️ Usar cable demasiado largo en el circuito analógico → ruido por inductancia parásita.',
                    '⚠️ Confundir ganancia de tensión con ganancia de potencia.'
                ],
                sugerencia: 'El ejercicio de "simular → construir → comparar" es poderoso. Los estudiantes aprenden que la práctica tiene parásitos que la simulación no muestra, lo que refuerza la importancia de la medición real.'
            },
            '3': {
                conceptos: ['Diagnóstico de circuitos', 'Técnica de hemisección', 'Señal de entrada/salida', 'Prueba en circuito', 'Equivalentes de reemplazo'],
                actividades: [
                    '🔎 Taller de reparación: circuitos con fallas inducidas (componente corto, circuito abierto).',
                    '📋 Documentar cada reparación con: síntoma, diagnóstico, componente reemplazado, resultado.',
                    '🧩 Identificar componente equivalente en base de datos y verificar en simulador.',
                    '🛡️ Práctica de desoldar SMD con aire caliente sin dañar PCB ni componentes adyacentes.'
                ],
                errores: [
                    '⚠️ No descargar condensadores de filtro antes de intervenir fuentes de alimentación.',
                    '⚠️ Aplicar calor de aire caliente en un solo punto → levantar pistas de cobre.',
                    '⚠️ Reemplazar sin diagnosticar la causa raíz → el nuevo componente también falla.'
                ],
                sugerencia: 'Prepara 10 circuitos idénticos con fallas diferentes para que cada estudiante repare uno diferente. Al final, los estudiantes presentan "su caso clínico" al curso.'
            },
            '4': {
                conceptos: ['Circuitos digitales', 'Compuertas lógicas', 'Sistemas combinacionales', 'Álgebra de Boole', 'TTL vs CMOS'],
                actividades: [
                    '🔢 Armar circuitos combinacionales básicos (decodificador, multiplexor) con 74xx.',
                    '💻 Simular tabla de verdad en CircuitVerse o Logisim antes de armar en protoboard.',
                    '⚡ Medir tiempos de propagación de compuertas TTL y CMOS con osciloscopio.',
                    '🎮 Diseñar y armar un "juego de reflejos" con lógica digital discreta.'
                ],
                errores: [
                    '⚠️ Mezclar familias TTL y CMOS sin adaptadores de nivel de tensión.',
                    '⚠️ No conectar entradas no usadas (floating inputs) → comportamiento errático.',
                    '⚠️ Exceder fan-out máximo de una compuerta TTL estándar.'
                ],
                sugerencia: 'Los circuitos digitales con 74xx son excelentes para visualizar con LEDs. Prepara una placa de prueba con DIP switches de entrada y LEDs de salida para hacer la clase más interactiva.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN3 · SISTEMAS Y EQUIPOS DIGITALES  (3ro · 228h)
    ───────────────────────────────────────────────────────── */
    'EN3': {
        nombre: 'Ensamblaje y Mantención de Sistemas y Equipos Digitales',
        emoji: '💻',
        videos: [
            { titulo: 'Armado de PC desde cero (2024)', canal: 'PC Tutorial', duracion: '35 min', nivel: 'básico',
              desc: 'Identificación de todos los componentes, pasos de ensamblaje y configuración BIOS.',
              url: 'https://www.youtube.com/results?search_query=armar+computador+desde+cero+paso+a+paso+español' },
            { titulo: 'Circuitos digitales: compuertas lógicas explicadas', canal: 'Electronoobs', duracion: '20 min', nivel: 'básico',
              desc: 'AND, OR, NOT, NAND, NOR, XOR. Tabla de verdad y álgebra de Boole.',
              url: 'https://www.youtube.com/results?search_query=compuertas+logicas+digitales+tutorial+español' },
            { titulo: 'Diagnóstico y reparación de PC: GPU, RAM, placa madre', canal: 'Hard Reset', duracion: '28 min', nivel: 'intermedio',
              desc: 'Metodología profesional de diagnóstico de equipos digitales.',
              url: 'https://www.youtube.com/results?search_query=diagnostico+reparacion+PC+placa+madre+español' },
            { titulo: 'Introducción a microcontroladores Arduino', canal: 'Programo Ergo Sum', duracion: '45 min', nivel: 'intermedio',
              desc: 'Primeros pasos en Arduino: E/S digitales, PWM, comunicación serial.',
              url: 'https://www.youtube.com/results?search_query=arduino+introduccion+microcontrolador+español+tutorial' }
        ],
        sitios: [
            { nombre: 'CircuitVerse', url: 'https://circuitverse.org', tipo: 'Simulador Digital',
              desc: 'Simulador de circuitos digitales en el navegador. Gratuito, colaborativo, en español.' },
            { nombre: 'Logisim Evolution', url: 'https://github.com/logisim-evolution/logisim-evolution', tipo: 'Simulador',
              desc: 'Simulador de lógica digital. Permite simular desde compuertas hasta microprocesadores.' },
            { nombre: 'CPU-Z (diagnóstico)', url: 'https://www.cpuid.com/softwares/cpu-z.html', tipo: 'Herramienta diagnóstico',
              desc: 'Información detallada de CPU, RAM y placa madre. Imprescindible para diagnóstico.' },
            { nombre: 'PC Part Picker', url: 'https://pcpartpicker.com', tipo: 'Referencia',
              desc: 'Planificador de configuraciones de PC con verificación de compatibilidad.' }
        ],
        herramientas: [
            { nombre: 'CircuitVerse (online)', url: 'https://circuitverse.org', gratuito: true, desc: 'Simulador digital en el navegador. Sin instalación. Ideal para clases.' },
            { nombre: 'Logisim Evolution', url: 'https://github.com/logisim-evolution/logisim-evolution/releases', gratuito: true, desc: 'Software de simulación de lógica digital. Descarga gratuita.' },
            { nombre: 'MemTest86', url: 'https://www.memtest86.com', gratuito: true, desc: 'Diagnóstico de memoria RAM. Booteable desde USB.' }
        ],
        libros: [
            { titulo: 'Fundamentos de Electrónica Digital', autor: 'Thomas Floyd', desc: 'El texto estándar para sistemas digitales en nivel técnico. Ed. Pearson.' },
            { titulo: 'Sistemas Digitales: Principios y Aplicaciones', autor: 'Tocci & Widmer', desc: 'De compuertas hasta microprocesadores. Excelente para EN3.' }
        ],
        aes: {
            '1': {
                conceptos: ['Álgebra de Boole', 'Tablas de verdad', 'Compuertas lógicas', 'Circuitos combinacionales', 'TTL y CMOS'],
                actividades: [
                    '🔢 Simular en CircuitVerse un circuito combinacional (sumador de 1 bit).',
                    '📋 Verificar tabla de verdad de 5 compuertas diferentes en protoboard.',
                    '🧮 Simplificar expresión booleana con mapa de Karnaugh.',
                    '🎮 Diseñar circuito lógico para un problema real: "alarma que suena si A y no B".'
                ],
                errores: [
                    '⚠️ Confundir NAND con NOR en tablas de verdad bajo presión de tiempo.',
                    '⚠️ No conectar Vcc y GND del chip integrado, causando comportamiento errático.',
                    '⚠️ No respetar la secuencia lógica al simplificar con Karnaugh.'
                ],
                sugerencia: 'El simulador CircuitVerse permite compartir circuitos con un link. Pide a los estudiantes compartir su diseño antes del taller para revisión previa.'
            },
            '2': {
                conceptos: ['Componentes de PC', 'Socket CPU', 'DDR4/DDR5', 'POST y BIOS', 'Gestión térmica'],
                actividades: [
                    '🖥️ Armar y desarmar una PC completa en equipo de 2 estudiantes.',
                    '🔍 Actualizar BIOS y configurar opciones de arranque.',
                    '📊 Benchmarking con CPU-Z y CrystalDiskMark para verificar rendimiento.',
                    '🛠️ Diagnosticar una PC con falla introducida: RAM defectuosa, conector suelto, etc.'
                ],
                errores: [
                    '⚠️ No descargar estática antes de manipular componentes (usar pulsera antiestática).',
                    '⚠️ Forzar conectores en orientación incorrecta → pines doblados.',
                    '⚠️ Olvidar el conector de alimentación de la CPU (12V ATX).'
                ],
                sugerencia: 'Graba un video corto del proceso de cada equipo. Al revisar el video posterior al armado se ven claramente los errores de procedimiento y sirve como evaluación formativa.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN4 · SISTEMAS DE CONTROL DOMÓTICO  (3ro · 190h)
    ───────────────────────────────────────────────────────── */
    'EN4': {
        nombre: 'Sistemas de Control Domótico',
        emoji: '🏠',
        videos: [
            { titulo: 'Arduino desde cero: sensores, actuadores y programación', canal: 'BricoGeek', duracion: '40 min', nivel: 'básico',
              desc: 'Lectura de sensores (temperatura, LDR, PIR) y control de actuadores (servo, relé, motor).',
              url: 'https://www.youtube.com/results?search_query=arduino+sensores+actuadores+domotica+español' },
            { titulo: 'Sistema domótico con Arduino y relés', canal: 'Inventable', duracion: '25 min', nivel: 'intermedio',
              desc: 'Control de iluminación, portones y riego desde Arduino con módulo de relés.',
              url: 'https://www.youtube.com/results?search_query=domotica+arduino+rele+control+casa+español' },
            { titulo: 'Protocolo KNX explicado para instaladores', canal: 'KNX Association', duracion: '18 min', nivel: 'intermedio',
              desc: 'Arquitectura KNX, topología, programación ETS y aplicaciones residenciales.',
              url: 'https://www.youtube.com/results?search_query=protocolo+KNX+domotica+instalacion+español' },
            { titulo: 'Home Assistant: domótica open source completa', canal: 'Un loco y su tecnología', duracion: '35 min', nivel: 'avanzado',
              desc: 'Plataforma profesional de automatización del hogar gratuita y local.',
              url: 'https://www.youtube.com/results?search_query=home+assistant+domotica+tutorial+español' }
        ],
        sitios: [
            { nombre: 'Arduino.cc Reference', url: 'https://www.arduino.cc/reference/en/', tipo: 'Referencia',
              desc: 'Documentación oficial de todas las funciones de Arduino. Indispensable.' },
            { nombre: 'Wokwi Simulator', url: 'https://wokwi.com', tipo: 'Simulador Arduino',
              desc: 'Simulador online de Arduino, ESP32 y Raspberry Pi Pico. Sin instalación.' },
            { nombre: 'Home Assistant Docs', url: 'https://www.home-assistant.io/docs/', tipo: 'Referencia domótica',
              desc: 'Documentación de la plataforma de automatización más usada.' },
            { nombre: 'Adafruit Learning System', url: 'https://learn.adafruit.com', tipo: 'Tutoriales',
              desc: 'Cientos de proyectos paso a paso con sensores, actuadores y microcontroladores.' }
        ],
        herramientas: [
            { nombre: 'Wokwi', url: 'https://wokwi.com', gratuito: true, desc: 'Simula Arduino y ESP32 en el navegador. Con biblioteca de sensores y actuadores.' },
            { nombre: 'Arduino IDE', url: 'https://www.arduino.cc/en/software', gratuito: true, desc: 'Entorno oficial de programación Arduino. Versión 2.x con autocompletado.' },
            { nombre: 'Fritzing', url: 'https://fritzing.org', gratuito: true, desc: 'Diagrama de conexiones en protoboard y esquemático. Ideal para documentar proyectos domóticos.' }
        ],
        libros: [
            { titulo: 'Arduino: Guía Práctica de Fundamentos y Proyectos', autor: 'J. A. Torrente Artero', desc: 'El mejor libro en español para Arduino aplicado a domótica.' },
            { titulo: 'Domótica con Raspberry Pi y Arduino', autor: 'Álvaro Polo Valdenebro', desc: 'Proyectos completos de automatización del hogar con plataformas open source.' }
        ],
        aes: {
            '1': {
                conceptos: ['Sensores analógicos y digitales', 'Actuadores (servo, relé, motor)', 'Comunicación I2C / SPI / Serial', 'PWM', 'Protocolos domóticos'],
                actividades: [
                    '🌡️ Sistema de control de temperatura: sensor DHT11 + Arduino + relé de ventilador.',
                    '🚪 Control de portón automático con sensor PIR y motor DC.',
                    '💡 Control de iluminación con sensor LDR y módulo de relés.',
                    '📱 Dashboard domótico básico en pantalla LCD I2C + Arduino.'
                ],
                errores: [
                    '⚠️ Conectar actuadores de alta corriente (motores, relés) directamente al pin del Arduino (máx. 40mA por pin).',
                    '⚠️ No poner resistencia pull-up en sensores con salida open-collector.',
                    '⚠️ No proteger entradas analógicas contra tensiones mayores a 5V/3.3V.'
                ],
                sugerencia: 'Simula el proyecto completo en Wokwi antes del taller. Esto permite que los estudiantes depuren el código antes de conectar hardware real, reduciendo fallas por errores de programación.'
            },
            '2': {
                conceptos: ['Mantenimiento preventivo sistemas domóticos', 'Actualización de firmware', 'Calibración de sensores', 'Backups de configuración', 'Resolución de problemas de conectividad'],
                actividades: [
                    '🔧 Plan de mantención para sistema domótico escolar: qué revisar y cada cuánto.',
                    '📶 Diagnóstico de red WiFi para IoT: cobertura, interferencias, latencia.',
                    '🔄 Actualizar firmware de controlador domótico y verificar funcionamiento post-actualización.',
                    '📝 Documento de configuración del sistema (mapa de red, dispositivos, contraseñas).'
                ],
                errores: [
                    '⚠️ No hacer backup antes de actualizar firmware de un sistema en producción.',
                    '⚠️ Ignorar errores de calibración de sensores → lecturas incorrectas en automatizaciones.',
                    '⚠️ No documentar cambios en la configuración del sistema.'
                ],
                sugerencia: 'La mantención de un sistema domótico real (si el colegio tiene uno) es la mejor práctica. Si no hay, simula un "sistema en producción" con el proyecto del AE1 como punto de partida.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN11 · MECATRÓNICA Y ROBÓTICA  (3ro · 114h)
    ───────────────────────────────────────────────────────── */
    'EN11': {
        nombre: 'Sistemas Mecatrónicos y Robóticos',
        emoji: '🤖',
        videos: [
            { titulo: 'Servomotores y motores paso a paso con Arduino', canal: 'HowToMechatronics', duracion: '20 min', nivel: 'intermedio',
              desc: 'Control de posición y velocidad. Librería Servo.h y AccelStepper.',
              url: 'https://www.youtube.com/results?search_query=servomotor+motor+paso+paso+arduino+control+español' },
            { titulo: 'Diseño 3D en TinkerCAD desde cero', canal: 'Inventable', duracion: '30 min', nivel: 'básico',
              desc: 'Herramientas de modelado, formas básicas, exportar STL para impresión 3D.',
              url: 'https://www.youtube.com/results?search_query=tinkercad+3D+diseño+impresion+tutorial+español' },
            { titulo: 'Robot seguidor de línea con Arduino paso a paso', canal: 'Nerd Para Todo', duracion: '35 min', nivel: 'intermedio',
              desc: 'Sensores TCRT5000, driver L298N, algoritmo PID básico para seguimiento.',
              url: 'https://www.youtube.com/results?search_query=robot+seguidor+linea+arduino+PID+español' },
            { titulo: 'Introducción a la impresión 3D (FDM)', canal: 'El Profe García', duracion: '22 min', nivel: 'básico',
              desc: 'Parámetros de impresión, materiales (PLA, PETG), soporte y relleno.',
              url: 'https://www.youtube.com/results?search_query=impresion+3D+FDM+parametros+tutorial+español' }
        ],
        sitios: [
            { nombre: 'Tinkercad (3D + Circuitos)', url: 'https://www.tinkercad.com', tipo: 'Diseño 3D + Simulador',
              desc: 'Diseño 3D para impresión y simulación de circuitos con Arduino. Gratuito.' },
            { nombre: 'Wokwi Arduino/ESP32 Simulator', url: 'https://wokwi.com', tipo: 'Simulador',
              desc: 'Simula Arduino con sensores, motores y pantallas. Comparte proyectos con link.' },
            { nombre: 'Thingiverse', url: 'https://www.thingiverse.com', tipo: 'Modelos 3D',
              desc: 'Repositorio gratuito de diseños 3D para impresión. Excelente para piezas mecánicas.' },
            { nombre: 'How To Mechatronics', url: 'https://howtomechatronics.com', tipo: 'Tutoriales',
              desc: 'Proyectos paso a paso de mecatrónica: robótica, Arduino, sensores, actuadores.' }
        ],
        herramientas: [
            { nombre: 'TinkerCAD', url: 'https://www.tinkercad.com', gratuito: true, desc: 'Diseño 3D en navegador + simulación de circuitos Arduino. Cuentas gratuitas para estudiantes.' },
            { nombre: 'Fusion 360 (Educación)', url: 'https://www.autodesk.com/campaigns/education/fusion-360', gratuito: true, desc: 'CAD/CAM profesional gratuito para estudiantes. Estándar en la industria.' },
            { nombre: 'Ultimaker Cura', url: 'https://ultimaker.com/software/ultimaker-cura', gratuito: true, desc: 'Slicer gratuito para preparar archivos de impresión 3D. Compatible con todas las impresoras.' }
        ],
        libros: [
            { titulo: 'Robótica: Manipuladores y Robots Móviles', autor: 'Ollero Baturone', desc: 'Fundamentos de robótica en español. Base teórica para EN11.' },
            { titulo: 'Diseño en Ingeniería Mecánica con Solidworks', autor: 'Shigley', desc: 'Fundamentos de diseño mecánico aplicable al componente mecatrónico de EN11.' }
        ],
        aes: {
            '1': {
                conceptos: ['Sistemas mecatrónicos', 'Integración eléctrica-mecánica-informática', 'Sensores y actuadores', 'Lazo de control', 'Documentación técnica'],
                actividades: [
                    '🔬 Diseccionar y documentar un sistema mecatrónico real (impresora, robot comercial).',
                    '📐 Identificar el lazo de control completo: sensor → controlador → actuador → planta.',
                    '🎯 Mini-proyecto: brazo robótico de 1 GDL con servo y potenciómetro.',
                    '📝 Diagrama de bloques del sistema con descripción de cada subsistema.'
                ],
                errores: [
                    '⚠️ No considerar las limitaciones mecánicas al diseñar el control (par, velocidad máxima).',
                    '⚠️ Confundir sensor de posición con sensor de velocidad en el lazo de control.',
                    '⚠️ No proteger electrónica de ruido generado por motores (usar condensadores de desacoplamiento).'
                ],
                sugerencia: 'Pide a los estudiantes traer un aparato doméstico (licuadora, reloj despertador, impresora vieja) para diseccionarlo y documentar sus subsistemas mecatrónicos. Aprendizaje concreto e inmediato.'
            },
            '2': {
                conceptos: ['Diseño 3D', 'CAD (TinkerCAD / Fusion 360)', 'Tolerancias de impresión', 'Materiales PLA/PETG', 'Prototipado rápido'],
                actividades: [
                    '💻 Diseñar en TinkerCAD una pieza mecánica simple (soporte de sensor, carcasa).',
                    '🖨️ Imprimir la pieza y evaluar tolerancias vs diseño original.',
                    '🔧 Diseñar un ensamblaje: dos piezas que encajan (eje-bocina, tapa-caja).',
                    '📊 Tabla comparativa de materiales: PLA vs PETG vs ABS para diferentes aplicaciones.'
                ],
                errores: [
                    '⚠️ No añadir tolerancia de impresión (0.2-0.4mm) en uniones mecánicas.',
                    '⚠️ Imprimir sin soportes piezas con voladizos mayores a 45°.',
                    '⚠️ Usar relleno demasiado bajo (< 20%) en piezas estructurales.'
                ],
                sugerencia: 'El ciclo "diseñar → imprimir → probar → corregir" en 48h es una experiencia de aprendizaje iterativo poderosa. Reserva la impresora para que cada equipo tenga al menos 2 intentos.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN5 · CONTROL ELECTRÓNICO DE POTENCIA  (4to · 152h)
    ───────────────────────────────────────────────────────── */
    'EN5': {
        nombre: 'Mantención y Operación de Equipos de Control Electrónico de Potencia',
        emoji: '⚡',
        videos: [
            { titulo: 'Variador de frecuencia (VFD): instalación y programación', canal: 'Ingeniería MEC', duracion: '30 min', nivel: 'intermedio',
              desc: 'Parámetros básicos del VFD, rampa de aceleración, protecciones y modos de control.',
              url: 'https://www.youtube.com/results?search_query=variador+frecuencia+VFD+instalacion+programacion+español' },
            { titulo: 'Electrónica de potencia: IGBT, MOSFET y tiristores', canal: 'Electronoobs', duracion: '25 min', nivel: 'avanzado',
              desc: 'Funcionamiento, curvas características y aplicaciones industriales de dispositivos de potencia.',
              url: 'https://www.youtube.com/results?search_query=electronica+potencia+IGBT+MOSFET+tiristor+industrial+español' },
            { titulo: 'Mantenimiento preventivo de variadores y servos', canal: 'Mantenimiento Industrial', duracion: '20 min', nivel: 'intermedio',
              desc: 'Plan de mantención, limpieza de ventiladores, revisión de conexiones y parámetros.',
              url: 'https://www.youtube.com/results?search_query=mantenimiento+preventivo+variador+frecuencia+industrial' },
            { titulo: 'Servomecanismos industriales: encoder y lazo cerrado', canal: 'AutomatizaciónPro', duracion: '28 min', nivel: 'avanzado',
              desc: 'Lazo de posición y velocidad, encoder incremental y absoluto, tuning del servo.',
              url: 'https://www.youtube.com/results?search_query=servomecanismo+industrial+encoder+lazo+cerrado+español' }
        ],
        sitios: [
            { nombre: 'Schneider Electric Learning', url: 'https://www.se.com/ww/en/work/training/', tipo: 'Formación industrial',
              desc: 'Cursos gratuitos de Schneider: variadores ATV, contactores TeSys, protecciones.' },
            { nombre: 'ABB Motor Academy', url: 'https://new.abb.com/drives/sustainability/abb-drives-academy', tipo: 'Formación industrial',
              desc: 'Recursos de formación de ABB sobre variadores de frecuencia e inversores.' },
            { nombre: 'Siemens Industry Online Support', url: 'https://support.industry.siemens.com', tipo: 'Documentación técnica',
              desc: 'Manuales y software oficial de Siemens para variadores, PLCs y servos. Gratuito.' }
        ],
        herramientas: [
            { nombre: 'TIA Portal (trial)', url: 'https://www.siemens.com/global/en/products/automation/industry-software/automation-software/tia-portal.html', gratuito: false, desc: 'Software de programación Siemens. Trial de 21 días funcional completo.' },
            { nombre: 'Siemens STARTER', url: 'https://support.industry.siemens.com/cs/ww/en/view/109474635', gratuito: true, desc: 'Software de puesta en marcha de variadores Siemens SINAMICS. Gratuito.' }
        ],
        libros: [
            { titulo: 'Electrónica de Potencia', autor: 'Muhammad Rashid', desc: 'El texto estándar de electrónica de potencia. Rectificadores, inversores, chopper. Ed. Pearson.' },
            { titulo: 'Accionamientos Eléctricos de Velocidad Variable', autor: 'Werner Leonhard', desc: 'Control de motores AC y DC con convertidores de potencia.' }
        ],
        aes: {
            '1': {
                conceptos: ['Plan de mantenimiento', 'MTBF y MTTR', 'Mantenimiento basado en condición', 'Registro de intervenciones', 'Indicadores de disponibilidad'],
                actividades: [
                    '📋 Elaborar plan de mantención preventiva para un variador de frecuencia real.',
                    '📊 Calcular MTBF y disponibilidad de un sistema a partir de historial de fallas.',
                    '🔍 Inspección visual guiada: qué buscar en una revisión preventiva de un VFD.',
                    '📝 Completar la orden de trabajo estándar ISO de una mantención preventiva.'
                ],
                errores: [
                    '⚠️ No esperar la descarga completa del bus DC antes de abrir un VFD (peligro de muerte).',
                    '⚠️ No verificar el par de apriete de terminales de potencia.',
                    '⚠️ Confundir mantención preventiva con inspección.'
                ],
                sugerencia: 'El bus DC de un variador puede mantener hasta 600V varios minutos después de apagar. Esto debe ser lo PRIMERO que se enseña. Usa el medidor antes de abrir siempre.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN6 · DETECCIÓN DE FALLAS INDUSTRIALES  (4to · 152h)
    ───────────────────────────────────────────────────────── */
    'EN6': {
        nombre: 'Detección de Fallas Industriales',
        emoji: '🔍',
        videos: [
            { titulo: 'Uso del osciloscopio digital industrial', canal: 'Tektronix', duracion: '22 min', nivel: 'intermedio',
              desc: 'Menús, sondas, triggering, medición de frecuencia, duty cycle y amplitud.',
              url: 'https://www.youtube.com/results?search_query=osciloscopio+digital+uso+profesional+tutorial+español' },
            { titulo: 'Diagnóstico de motores eléctricos industriales', canal: 'Mantenimiento Industrial', duracion: '30 min', nivel: 'avanzado',
              desc: 'Medición de aislamiento con megóhmetro, análisis de vibración y termografía.',
              url: 'https://www.youtube.com/results?search_query=diagnostico+motor+electrico+industrial+megohmetro+español' },
            { titulo: 'Lectura de esquemas eléctricos industriales', canal: 'PLC Academy', duracion: '35 min', nivel: 'intermedio',
              desc: 'Normalización IEC 60617, simbología de contactores, relés y protecciones.',
              url: 'https://www.youtube.com/results?search_query=esquemas+electricos+industriales+IEC+simbologia+español' },
            { titulo: 'Análisis de fallas con árbol de decisión (FMEA)', canal: 'Ingeniería de Confiabilidad', duracion: '18 min', nivel: 'avanzado',
              desc: 'Método FMEA aplicado a sistemas electrónicos industriales.',
              url: 'https://www.youtube.com/results?search_query=FMEA+analisis+fallas+electronica+industrial+español' }
        ],
        sitios: [
            { nombre: 'Fluke Learning Center', url: 'https://www.fluke.com/en-us/learn', tipo: 'Instrumentación',
              desc: 'Guías de uso de instrumentos de medición industrial: multímetros, pinzas, termovisor.' },
            { nombre: 'Engineering Toolbox (Español)', url: 'https://www.engineeringtoolbox.com', tipo: 'Referencia',
              desc: 'Tablas de referencia técnica: resistividad, temperaturas, tolerancias, normas.' }
        ],
        herramientas: [
            { nombre: 'Virtual Oscilloscope (Soundcard)', url: 'https://www.zeitnitz.eu/scope_en', gratuito: true, desc: 'Osciloscopio virtual usando tarjeta de sonido del PC. Útil para señales de baja frecuencia.' },
            { nombre: 'Audacity (análisis señales)', url: 'https://www.audacityteam.org', gratuito: true, desc: 'Software de audio adaptable para análisis de señales y ruidos en equipos.' }
        ],
        libros: [
            { titulo: 'Mantenimiento de Equipos Industriales', autor: 'Enrique Dounce Villanueva', desc: 'Metodología completa de diagnóstico y mantenimiento industrial. Ed. CECSA.' },
            { titulo: 'Análisis de Fallas en Equipos Industriales', autor: 'Luis Amendola', desc: 'Herramientas RCM, FMEA y árbol de fallas para diagnóstico industrial.' }
        ],
        aes: {
            '1': {
                conceptos: ['Inspección visual sistemática', 'Check-list de inspección', 'Termografía infrarroja', 'Análisis de vibración', 'Registro fotográfico'],
                actividades: [
                    '📸 Inspección de tablero eléctrico con check-list estándar y registro fotográfico.',
                    '🌡️ Medición de temperatura en terminales con termómetro infrarrojo.',
                    '📋 Comparar valores medidos con valores nominales del manual.',
                    '📝 Informe de inspección con nivel de riesgo y recomendaciones.'
                ],
                errores: [
                    '⚠️ No respetar distancias de seguridad en inspección de tableros energizados.',
                    '⚠️ Inspeccionar sin EPP adecuado (riesgo de arco eléctrico).',
                    '⚠️ No documentar los hallazgos inmediatamente → pérdida de información.'
                ],
                sugerencia: 'Lleva a los estudiantes a inspeccionar el tablero eléctrico real del colegio (con protección y autorización). La experiencia real en campo es irreemplazable para este módulo.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN7 · CONTROL ELÉCTRICO INDUSTRIAL  (4to · 152h)
    ───────────────────────────────────────────────────────── */
    'EN7': {
        nombre: 'Operación y Programación de Equipos de Control Eléctrico Industrial',
        emoji: '🎛️',
        videos: [
            { titulo: 'PLC Siemens LOGO! programación desde cero', canal: 'Siemens Chile', duracion: '45 min', nivel: 'básico',
              desc: 'Ladder Diagram (LD) y Function Block Diagram (FBD) en LOGO!Soft Comfort.',
              url: 'https://www.youtube.com/results?search_query=PLC+siemens+LOGO+programacion+ladder+español' },
            { titulo: 'Tablero de control: contactor, relé y guardamotor', canal: 'Automatización Industrial', duracion: '28 min', nivel: 'básico',
              desc: 'Circuito de mando y fuerza. Enclavamiento eléctrico y retención.',
              url: 'https://www.youtube.com/results?search_query=tablero+control+industrial+contactor+rele+mando+fuerza+español' },
            { titulo: 'Arranque estrella-triángulo de motor trifásico', canal: 'Ingeniería de Plantas', duracion: '20 min', nivel: 'intermedio',
              desc: 'Circuito de potencia y mando de arranque estrella-triángulo con temporizador.',
              url: 'https://www.youtube.com/results?search_query=arranque+estrella+triangulo+motor+trifasico+tutorial+español' },
            { titulo: 'SCADA y HMI básico con WinCC', canal: 'Siemens Academy', duracion: '35 min', nivel: 'avanzado',
              desc: 'Creación de pantalla HMI, animaciones y comunicación con PLC Siemens.',
              url: 'https://www.youtube.com/results?search_query=SCADA+HMI+WinCC+PLC+Siemens+tutorial+español' }
        ],
        sitios: [
            { nombre: 'LOGO! Soft Comfort (descarga)', url: 'https://support.industry.siemens.com/cs/ww/en/view/109798346', tipo: 'Software PLC',
              desc: 'Software oficial gratuito de programación para LOGO! de Siemens.' },
            { nombre: 'PLC Academy', url: 'https://plcacademy.com', tipo: 'Formación PLC',
              desc: 'Cursos gratuitos de PLC: Ladder, FBD, SCL. Con simuladores online.' },
            { nombre: 'Codesys Store (free)', url: 'https://store.codesys.com', tipo: 'Simulador PLC',
              desc: 'Entorno de programación PLC estándar IEC 61131-3. Incluye simulador gratuito.' }
        ],
        herramientas: [
            { nombre: 'LOGO!Soft Comfort V8', url: 'https://support.industry.siemens.com/cs/ww/en/view/109798346', gratuito: true, desc: 'Programación y simulación de LOGO! Siemens. Con simulador offline.' },
            { nombre: 'Factory I/O (30 días)', url: 'https://factoryio.com', gratuito: false, desc: 'Simulación 3D de planta industrial. Conecta con LOGO!, S7, Allen-Bradley.' },
            { nombre: 'Codesys V3', url: 'https://www.codesys.com/download.html', gratuito: true, desc: 'PLC virtual IEC 61131-3. Estándar industrial. Funciona en el PC como PLC real.' }
        ],
        libros: [
            { titulo: 'Programación de Autómatas Programmables', autor: 'José M. Angulo Usategui', desc: 'Fundamentos de PLC con ejemplos ladder y FBD. Muy didáctico para nivel técnico.' },
            { titulo: 'Manual SIMATIC S7-1200', autor: 'Siemens AG', desc: 'Manual oficial de Siemens. Disponible gratis en support.industry.siemens.com' }
        ],
        aes: {
            '1': {
                conceptos: ['Circuito de mando y fuerza', 'Enclavamiento eléctrico', 'Retención (self-holding)', 'Temporizadores industriales', 'Guardamotor y protecciones'],
                actividades: [
                    '⚡ Armar circuito de arranque directo de motor con contactor y guardamotor.',
                    '🔒 Implementar enclavamiento eléctrico entre dos contactores (marcha adelante/atrás).',
                    '💻 Simular el mismo circuito en LOGO!Soft Comfort y verificar equivalencia.',
                    '📝 Documentar el circuito con esquema de mando y fuerza en norma IEC 60617.'
                ],
                errores: [
                    '⚠️ No instalar protección contra cortocircuito en el circuito de fuerza.',
                    '⚠️ Omitir el enclavamiento mecánico entre contactores de marcha adelante/atrás → cortocircuito.',
                    '⚠️ Confundir la corriente nominal del guardamotor con la corriente de cortocircuito.'
                ],
                sugerencia: 'El enclavamiento es el concepto más crítico de este módulo. Dedica una clase completa solo a demostrar QUÉ pasa si NO hay enclavamiento (usando un modelo a escala o simulador).'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN8 · MONTAJE DE EQUIPOS INDUSTRIALES  (4to · 152h)
    ───────────────────────────────────────────────────────── */
    'EN8': {
        nombre: 'Montaje de Equipos Industriales',
        emoji: '🏗️',
        videos: [
            { titulo: 'Cableado de tablero eléctrico industrial desde cero', canal: 'Ingeniería Eléctrica', duracion: '40 min', nivel: 'intermedio',
              desc: 'Orden de instalación, gestión de cables, ferrulas, numeración de conductores.',
              url: 'https://www.youtube.com/results?search_query=cableado+tablero+electrico+industrial+rieles+DIN+español' },
            { titulo: 'Norma IEC 61439 para tableros de distribución', canal: 'Schneider Electric', duracion: '25 min', nivel: 'avanzado',
              desc: 'Requisitos de diseño, ensayos y documentación de tableros según norma.',
              url: 'https://www.youtube.com/results?search_query=norma+IEC+61439+tablero+distribucion+electrico+español' },
            { titulo: 'Instalación de bandejas y ductos portacables', canal: 'Ingeniería Industrial', duracion: '18 min', nivel: 'básico',
              desc: 'Tipos de canalización, radio de curvatura, separación de circuitos de fuerza y control.',
              url: 'https://www.youtube.com/results?search_query=bandejas+portacables+ductos+instalacion+industrial+español' }
        ],
        sitios: [
            { nombre: 'IEC Webstore (normas gratuitas)', url: 'https://webstore.iec.ch/publication/6144', tipo: 'Normas',
              desc: 'Resúmenes gratuitos de normas IEC relevantes para instalaciones industriales.' },
            { nombre: 'SEW-Eurodrive Docs', url: 'https://www.sew-eurodrive.cl/soporte/documentacion/', tipo: 'Manuales técnicos',
              desc: 'Manuales de instalación de motores y reductores industriales en español.' }
        ],
        herramientas: [
            { nombre: 'EPLAN Electric P8 (estudiante)', url: 'https://www.eplan.help/en-us/eplanhelp/2023/content/getting_started.htm', gratuito: false, desc: 'Software estándar industrial para planos eléctricos. Licencia educacional disponible.' },
            { nombre: 'QElectroTech', url: 'https://qelectrotech.org', gratuito: true, desc: 'Software open source para esquemas eléctricos industriales. Alternativa gratuita a EPLAN.' }
        ],
        libros: [
            { titulo: 'Instalaciones Eléctricas Industriales', autor: 'Antonio Hermosa Donate', desc: 'Reglamentación, cálculo y diseño de instalaciones industriales.' },
            { titulo: 'Manual del Técnico en Electricidad y Electrónica', autor: 'José Roldan', desc: 'Referencia práctica de montaje y maniobra eléctrica industrial.' }
        ],
        aes: {
            '1': {
                conceptos: ['Planificación del montaje', 'Planos de emplazamiento', 'Lista de materiales (BOM)', 'Secuencia de instalación', 'Normas de seguridad en obra'],
                actividades: [
                    '📐 Elaborar un plano de montaje de un tablero de control en escala.',
                    '📋 Preparar la lista de materiales completa para el montaje asignado.',
                    '🔧 Instalar riel DIN, bornes y canaletas en tablero según plano.',
                    '✅ Verificar instalación con check-list de comisionamiento.'
                ],
                errores: [
                    '⚠️ No verificar la sección de conductores según la corriente nominal antes del tendido.',
                    '⚠️ No identificar los conductores con ferrulas numeradas → mantenimiento imposible.',
                    '⚠️ Tender cables de control junto a cables de potencia → interferencias electromagnéticas.'
                ],
                sugerencia: 'Usa la norma NCh 4/2003 (Instalaciones de Baja Tensión Chile) como referencia. Es la norma que los estudiantes encontrarán en el campo laboral chileno.'
            }
        }
    },

    /* ─────────────────────────────────────────────────────────
       EN9 · AUTOMATIZACIÓN INDUSTRIAL  (4to · 152h)
    ───────────────────────────────────────────────────────── */
    'EN9': {
        nombre: 'Automatización Industrial',
        emoji: '⚙️',
        videos: [
            { titulo: 'PLC Siemens S7-1200: programación completa desde cero', canal: 'Apex Automation', duracion: '60 min', nivel: 'intermedio',
              desc: 'TIA Portal, OBs, FBs, FCs. Programación Ladder, FBD y SCL. Comunicación Profinet.',
              url: 'https://www.youtube.com/results?search_query=PLC+S7-1200+TIA+Portal+programacion+completo+español' },
            { titulo: 'Sensores industriales: proximidad, foto, presión, temperatura', canal: 'Automatización Industrial Latina', duracion: '30 min', nivel: 'intermedio',
              desc: 'Inductivos, capacitivos, fotoeléctricos, encoders. Cableado y diagnóstico.',
              url: 'https://www.youtube.com/results?search_query=sensores+industriales+inductivo+capacitivo+fotoelectrico+español' },
            { titulo: 'Comunicación industrial: Profibus, Modbus y Profinet', canal: 'InfoPLC', duracion: '25 min', nivel: 'avanzado',
              desc: 'Diferencias, topologías y configuración de redes de campo industriales.',
              url: 'https://www.youtube.com/results?search_query=profibus+modbus+profinet+comunicacion+industrial+español' },
            { titulo: 'SCADA con WinCC: pantallas, alarmas y tendencias', canal: 'TIA Portal Academy', duracion: '40 min', nivel: 'avanzado',
              desc: 'Crear y configurar proyecto SCADA completo. Comunicación con S7-1200.',
              url: 'https://www.youtube.com/results?search_query=SCADA+WinCC+pantallas+alarmas+Siemens+PLC+español' }
        ],
        sitios: [
            { nombre: 'InfoPLC (en español)', url: 'https://www.infoplc.net', tipo: 'Comunidad industrial',
              desc: 'Foro y recursos de automatización industrial en español. Tutoriales de PLC, SCADA y HMI.' },
            { nombre: 'TIA Portal Tutorial (Siemens)', url: 'https://support.industry.siemens.com/cs/ww/en/view/109749127', tipo: 'Formación oficial',
              desc: 'Tutoriales oficiales de Siemens TIA Portal para S7-1200. Descarga gratuita.' },
            { nombre: 'Factory I/O Demos', url: 'https://factoryio.com/docs/4.0/', tipo: 'Simulación industrial',
              desc: 'Documentación y demos gratuitas del simulador de planta industrial Factory I/O.' }
        ],
        herramientas: [
            { nombre: 'TIA Portal V17 (trial 21d)', url: 'https://support.industry.siemens.com/cs/ww/en/view/109784440', gratuito: false, desc: 'Herramienta oficial Siemens para S7-1200/1500. Trial 21 días, versión completa.' },
            { nombre: 'Codesys V3 (Simulador PLC)', url: 'https://www.codesys.com/download.html', gratuito: true, desc: 'PLC virtual estándar IEC 61131-3. Soporta Ladder, FBD, ST, SFC. Gratuito.' },
            { nombre: 'Factory I/O Community', url: 'https://factoryio.com', gratuito: false, desc: 'Simulador 3D de planta industrial. Conecta con TIA Portal, Codesys, Unity Pro.' }
        ],
        libros: [
            { titulo: 'Automatización Industrial Moderna', autor: 'Timothy Maloney', desc: 'Desde PLC hasta redes industriales. Excelente para el nivel de 4to Medio.' },
            { titulo: 'Sistemas SCADA', autor: 'Aquilino Rodríguez Penin', desc: 'Arquitectura SCADA, comunicaciones industriales y diseño de sistemas de supervisión.' }
        ],
        aes: {
            '1': {
                conceptos: ['Relés programables', 'Lenguaje Ladder (LD)', 'Temporizadores y contadores en PLC', 'Entradas/salidas digitales', 'Modos de control ON/OFF'],
                actividades: [
                    '💻 Programar en LOGO!Soft un control de semáforo con temporizadores.',
                    '🏭 Simular en Factory I/O la cinta transportadora controlada por LOGO.',
                    '📊 Comparar el mismo programa en Ladder y FBD.',
                    '🔧 Cablear un LOGO! real con pulsadores y lámparas en el panel.'
                ],
                errores: [
                    '⚠️ Confundir bobina de salida (Q) con contacto de salida (Q) en Ladder.',
                    '⚠️ No asignar dirección a todas las entradas y salidas físicas.',
                    '⚠️ Olvidar el scan de entradas: los cambios en las entradas solo se leen al inicio de cada ciclo.'
                ],
                sugerencia: 'Comienza SIEMPRE con el LOGO! físico antes que con el S7-1200. El LOGO! tiene menos abstracción y los estudiantes ven directamente la relación entre Ladder y el hardware real.'
            },
            '2': {
                conceptos: ['PLC S7-1200', 'TIA Portal', 'Bloques de función (FB, FC, OB)', 'Variables globales y locales', 'Comunicación Profinet'],
                actividades: [
                    '💻 Crear proyecto TIA Portal para S7-1200: configurar CPU, E/S y módulo HMI.',
                    '🏭 Programar control de motor (marcha/paro/emergencia) con FB reutilizable.',
                    '📡 Configurar comunicación Profinet entre S7-1200 y pantalla KTP700.',
                    '📊 Crear tabla de variables con tipos de datos estructurados (UDT).'
                ],
                errores: [
                    '⚠️ No configurar correctamente la dirección IP del PLC y la pantalla HMI.',
                    '⚠️ Usar variables globales innecesariamente → programa difícil de mantener.',
                    '⚠️ No documentar el código con comentarios → código ilegible.'
                ],
                sugerencia: 'La estructura FB para motor es la "kata" fundamental del PLC. Una vez que los estudiantes la dominan, pueden construir cualquier automatización combinando instancias del mismo FB.'
            }
        }
    }
};

// ============================================================
// ESTADO DEL PANEL
// ============================================================
var REC_TAB_ACTIVA = 'videos';

// ============================================================
// FUNCIÓN PRINCIPAL: RENDERIZAR PANEL
// ============================================================
function renderRecomendaciones(modId, aeNum) {
    var panel = document.getElementById('recsPanel');
    if (!panel) return;

    var db = REC_DB[modId];
    if (!db) {
        panel.style.display = 'none';
        return;
    }

    var aeData = db.aes && db.aes[aeNum] ? db.aes[aeNum] : null;

    // Merge recursos del módulo + específicos del AE
    var videos      = db.videos      || [];
    var sitios      = db.sitios      || [];
    var herramientas = db.herramientas || [];
    var libros      = db.libros      || [];

    var conceptos   = aeData ? aeData.conceptos   || [] : [];
    var actividades = aeData ? aeData.actividades  || [] : [];
    var errores     = aeData ? aeData.errores      || [] : [];
    var sugerencia  = aeData ? aeData.sugerencia   || ''  : '';

    REC_TAB_ACTIVA = 'videos';

    panel.innerHTML =
        '<div class="rec-header">' +
            '<div class="rec-header-left">' +
                '<span class="rec-emoji">' + db.emoji + '</span>' +
                '<div>' +
                    '<div class="rec-titulo">Recursos Recomendados</div>' +
                    '<div class="rec-subtitulo">' + db.nombre + (aeNum ? ' &nbsp;·&nbsp; AE ' + aeNum : '') + '</div>' +
                '</div>' +
            '</div>' +
            '<button class="rec-toggle" onclick="toggleRecsPanel()" title="Minimizar">−</button>' +
        '</div>' +

        // Conceptos clave
        (conceptos.length > 0 ?
        '<div class="rec-conceptos">' +
            '<span class="rec-conceptos-label">Conceptos clave</span>' +
            conceptos.map(function(c) { return '<span class="rec-chip">' + c + '</span>'; }).join('') +
        '</div>' : '') +

        // Tabs
        '<div class="rec-tabs">' +
            '<button class="rec-tab active" data-tab="videos"    onclick="recTab(this,\'videos\')">🎬 Videos <span class="rec-count">' + videos.length + '</span></button>' +
            '<button class="rec-tab"        data-tab="sitios"    onclick="recTab(this,\'sitios\')">🌐 Web <span class="rec-count">' + sitios.length + '</span></button>' +
            '<button class="rec-tab"        data-tab="tools"     onclick="recTab(this,\'tools\')">🛠️ Herramientas <span class="rec-count">' + herramientas.length + '</span></button>' +
            '<button class="rec-tab"        data-tab="libros"    onclick="recTab(this,\'libros\')">📚 Bibliografía <span class="rec-count">' + libros.length + '</span></button>' +
            (actividades.length > 0 ? '<button class="rec-tab" data-tab="ideas" onclick="recTab(this,\'ideas\')">💡 Ideas <span class="rec-count">' + actividades.length + '</span></button>' : '') +
        '</div>' +

        // Contenido de tabs
        '<div class="rec-body">' +
            // VIDEOS
            '<div class="rec-panel-content" id="rctab-videos">' +
                (videos.length > 0 ? buildVideoCards(videos) : recVacio('videos')) +
            '</div>' +
            // SITIOS
            '<div class="rec-panel-content" id="rctab-sitios" style="display:none">' +
                (sitios.length > 0 ? buildSitioCards(sitios) : recVacio('sitios')) +
            '</div>' +
            // HERRAMIENTAS
            '<div class="rec-panel-content" id="rctab-tools" style="display:none">' +
                (herramientas.length > 0 ? buildToolCards(herramientas) : recVacio('herramientas')) +
            '</div>' +
            // LIBROS
            '<div class="rec-panel-content" id="rctab-libros" style="display:none">' +
                (libros.length > 0 ? buildLibrosCards(libros) : recVacio('libros')) +
            '</div>' +
            // IDEAS DE CLASE
            (actividades.length > 0 ?
            '<div class="rec-panel-content" id="rctab-ideas" style="display:none">' +
                buildIdeasContent(actividades, errores, sugerencia) +
            '</div>' : '') +
        '</div>';

    panel.style.display = 'block';
    panel.classList.add('rec-enter');
    setTimeout(function() { panel.classList.remove('rec-enter'); }, 600);
}

// ─── Builders de tarjetas ───────────────────────────────────

function buildVideoCards(videos) {
    return '<div class="rec-cards-grid">' +
        videos.map(function(v) {
            var nivelColor = v.nivel === 'básico' ? '#34d399' : v.nivel === 'intermedio' ? '#60a5fa' : '#f59e0b';
            return '<a href="' + v.url + '" target="_blank" class="rec-card rec-card-video">' +
                '<div class="rec-card-top">' +
                    '<span class="rec-card-icon">🎬</span>' +
                    '<span class="rec-card-duracion">⏱ ' + v.duracion + '</span>' +
                '</div>' +
                '<div class="rec-card-title">' + v.titulo + '</div>' +
                '<div class="rec-card-meta">' + v.canal + '</div>' +
                '<div class="rec-card-desc">' + v.desc + '</div>' +
                '<div class="rec-card-footer">' +
                    '<span class="rec-nivel-chip" style="background:' + nivelColor + '22;color:' + nivelColor + ';">' + v.nivel + '</span>' +
                    '<span class="rec-link-btn">Ver en YouTube →</span>' +
                '</div>' +
            '</a>';
        }).join('') +
    '</div>';
}

function buildSitioCards(sitios) {
    return '<div class="rec-cards-grid">' +
        sitios.map(function(s) {
            return '<a href="' + s.url + '" target="_blank" class="rec-card rec-card-sitio">' +
                '<div class="rec-card-top">' +
                    '<span class="rec-card-icon">🌐</span>' +
                    '<span class="rec-tipo-chip">' + s.tipo + '</span>' +
                '</div>' +
                '<div class="rec-card-title">' + s.nombre + '</div>' +
                '<div class="rec-card-desc">' + s.desc + '</div>' +
                '<span class="rec-link-btn" style="margin-top:auto;">Visitar sitio →</span>' +
            '</a>';
        }).join('') +
    '</div>';
}

function buildToolCards(herramientas) {
    return '<div class="rec-cards-grid">' +
        herramientas.map(function(h) {
            return '<a href="' + h.url + '" target="_blank" class="rec-card rec-card-tool">' +
                '<div class="rec-card-top">' +
                    '<span class="rec-card-icon">🛠️</span>' +
                    '<span class="rec-tipo-chip" style="' + (h.gratuito ? 'background:rgba(52,211,153,0.15);color:#34d399;' : 'background:rgba(251,191,36,0.15);color:#fbbf24;') + '">' + (h.gratuito ? '✓ Gratis' : '💳 Pago/Trial') + '</span>' +
                '</div>' +
                '<div class="rec-card-title">' + h.nombre + '</div>' +
                '<div class="rec-card-desc">' + h.desc + '</div>' +
                '<span class="rec-link-btn" style="margin-top:auto;">Descargar / Abrir →</span>' +
            '</a>';
        }).join('') +
    '</div>';
}

function buildLibrosCards(libros) {
    return '<div class="rec-cards-grid">' +
        libros.map(function(l) {
            return '<div class="rec-card rec-card-libro">' +
                '<div class="rec-card-top"><span class="rec-card-icon">📚</span></div>' +
                '<div class="rec-card-title">' + l.titulo + '</div>' +
                '<div class="rec-card-meta">' + l.autor + '</div>' +
                '<div class="rec-card-desc">' + l.desc + '</div>' +
            '</div>';
        }).join('') +
    '</div>';
}

function buildIdeasContent(actividades, errores, sugerencia) {
    var html = '';
    if (sugerencia) {
        html += '<div class="rec-sugerencia">' +
            '<div class="rec-sug-label">✨ Sugerencia pedagógica</div>' +
            '<p>' + sugerencia + '</p>' +
        '</div>';
    }
    if (actividades.length > 0) {
        html += '<div class="rec-ideas-section">' +
            '<div class="rec-sug-label">💡 Actividades sugeridas</div>' +
            '<ul class="rec-ideas-list">' +
                actividades.map(function(a) { return '<li>' + a + '</li>'; }).join('') +
            '</ul>' +
        '</div>';
    }
    if (errores.length > 0) {
        html += '<div class="rec-errores-section">' +
            '<div class="rec-sug-label" style="color:#f43f5e;">⚠️ Errores frecuentes a prevenir</div>' +
            '<ul class="rec-errores-list">' +
                errores.map(function(e) { return '<li>' + e + '</li>'; }).join('') +
            '</ul>' +
        '</div>';
    }
    return html || recVacio('ideas');
}

function recVacio(tipo) {
    return '<div class="rec-vacio">No hay recursos específicos de ' + tipo + ' para este módulo aún.</div>';
}

// ─── Control de tabs ────────────────────────────────────────

function recTab(btn, tab) {
    var tabs = document.querySelectorAll('.rec-tab');
    tabs.forEach(function(t) { t.classList.remove('active'); });
    btn.classList.add('active');

    var contents = document.querySelectorAll('.rec-panel-content');
    contents.forEach(function(c) { c.style.display = 'none'; });

    var el = document.getElementById('rctab-' + tab);
    if (el) el.style.display = 'block';
    REC_TAB_ACTIVA = tab;
}

function toggleRecsPanel() {
    var body = document.querySelector('#recsPanel .rec-body');
    var tabs = document.querySelector('#recsPanel .rec-tabs');
    var conceptos = document.querySelector('#recsPanel .rec-conceptos');
    var btn = document.querySelector('#recsPanel .rec-toggle');
    if (!body) return;
    var hidden = body.style.display === 'none';
    body.style.display = hidden ? 'block' : 'none';
    if (tabs) tabs.style.display = hidden ? 'flex' : 'none';
    if (conceptos) conceptos.style.display = hidden ? 'flex' : 'none';
    if (btn) btn.textContent = hidden ? '−' : '+';
}

// ============================================================
// CSS INYECTADO DINÁMICAMENTE
// ============================================================
(function injectRecStyles() {
    if (document.getElementById('rec-styles')) return;
    var style = document.createElement('style');
    style.id = 'rec-styles';
    style.textContent = `
    /* ── Panel contenedor ── */
    #recsPanel {
        display: none;
        border-radius: 16px;
        border: 1px solid rgba(99,102,241,0.35);
        background: linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(20,184,166,0.05) 100%);
        backdrop-filter: blur(12px);
        margin: 1.5rem 0;
        overflow: hidden;
        transition: all .3s ease;
    }
    #recsPanel.rec-enter {
        animation: recSlideIn 0.45s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes recSlideIn {
        from { opacity:0; transform: translateY(-12px) scale(0.98); }
        to   { opacity:1; transform: none; }
    }

    /* ── Header ── */
    .rec-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 14px 20px;
        background: rgba(99,102,241,0.12);
        border-bottom: 1px solid rgba(99,102,241,0.2);
    }
    .rec-header-left { display:flex; align-items:center; gap:12px; }
    .rec-emoji { font-size:1.6rem; }
    .rec-titulo {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.95rem; font-weight:700;
        background: linear-gradient(90deg,#818cf8,#34d399);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .rec-subtitulo { font-size:0.78rem; color:var(--text-muted); margin-top:1px; }
    .rec-toggle {
        background: rgba(255,255,255,0.07); border: 1px solid var(--glass-border);
        color: var(--text-muted); border-radius: 6px; width:28px; height:28px;
        cursor:pointer; font-size:1.1rem; line-height:1; transition:.2s;
    }
    .rec-toggle:hover { background:rgba(255,255,255,0.14); color:var(--text); }

    /* ── Conceptos clave ── */
    .rec-conceptos {
        display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
        padding: 10px 20px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .rec-conceptos-label { font-size:0.72rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:.07em; margin-right:4px; }
    .rec-chip {
        background: rgba(129,140,248,0.15); border: 1px solid rgba(129,140,248,0.3);
        color: #a5b4fc; border-radius: 99px; padding: 3px 10px; font-size:0.76rem;
    }

    /* ── Tabs ── */
    .rec-tabs {
        display: flex; flex-wrap: wrap; gap: 4px;
        padding: 10px 16px 0;
        border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .rec-tab {
        background: transparent; border: none; border-bottom: 2px solid transparent;
        color: var(--text-muted); padding: 6px 12px; font-size:0.82rem;
        cursor:pointer; border-radius: 6px 6px 0 0; transition: all .2s;
        display:flex; align-items:center; gap:5px;
    }
    .rec-tab:hover { background: rgba(255,255,255,0.06); color:var(--text); }
    .rec-tab.active { border-bottom-color: #818cf8; color:#818cf8; background: rgba(129,140,248,0.08); }
    .rec-count {
        background: rgba(255,255,255,0.1); border-radius:99px;
        padding: 1px 6px; font-size:0.7rem; color:var(--text-muted);
    }
    .rec-tab.active .rec-count { background:rgba(129,140,248,0.2); color:#818cf8; }

    /* ── Body / contenidos ── */
    .rec-body { padding: 16px; }
    .rec-panel-content { animation: recFadeTab .25s ease; }
    @keyframes recFadeTab { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }

    /* ── Cards grid ── */
    .rec-cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 12px;
    }
    .rec-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px; padding: 14px;
        display: flex; flex-direction: column; gap: 6px;
        text-decoration: none; color: var(--text);
        transition: all .2s; cursor:pointer;
    }
    .rec-card:hover { border-color: rgba(129,140,248,0.4); background: rgba(129,140,248,0.07); transform: translateY(-2px); }
    .rec-card-video  { border-left: 3px solid rgba(239,68,68,0.6); }
    .rec-card-sitio  { border-left: 3px solid rgba(52,211,153,0.6); }
    .rec-card-tool   { border-left: 3px solid rgba(251,191,36,0.6); }
    .rec-card-libro  { border-left: 3px solid rgba(167,139,250,0.6); }
    .rec-card-top { display:flex; align-items:center; justify-content:space-between; }
    .rec-card-icon { font-size:1.2rem; }
    .rec-card-duracion { font-size:0.72rem; color:var(--text-muted); }
    .rec-card-title { font-weight:600; font-size:0.88rem; line-height:1.3; }
    .rec-card-meta { font-size:0.74rem; color:var(--text-muted); }
    .rec-card-desc { font-size:0.78rem; color:var(--text-muted); line-height:1.4; flex:1; }
    .rec-card-footer { display:flex; align-items:center; justify-content:space-between; margin-top:4px; }
    .rec-nivel-chip { border-radius:99px; padding:2px 8px; font-size:0.7rem; font-weight:600; }
    .rec-tipo-chip { border-radius:99px; padding:2px 8px; font-size:0.7rem; background:rgba(255,255,255,0.07); color:var(--text-muted); }
    .rec-link-btn { font-size:0.76rem; color:#818cf8; }
    .rec-card:hover .rec-link-btn { text-decoration:underline; }

    /* ── Ideas / Errores ── */
    .rec-sugerencia {
        background: rgba(129,140,248,0.08); border: 1px solid rgba(129,140,248,0.2);
        border-radius:10px; padding:14px; margin-bottom:14px;
    }
    .rec-sug-label { font-size:0.76rem; font-weight:700; text-transform:uppercase; letter-spacing:.07em; margin-bottom:6px; color:#818cf8; }
    .rec-sugerencia p { font-size:0.88rem; line-height:1.55; color:var(--text); margin:0; }
    .rec-ideas-section, .rec-errores-section { margin-bottom:14px; }
    .rec-ideas-list, .rec-errores-list { list-style:none; padding:0; margin:6px 0 0; }
    .rec-ideas-list li, .rec-errores-list li { font-size:0.85rem; padding:5px 0 5px 4px; border-bottom:1px solid rgba(255,255,255,0.04); line-height:1.4; }
    .rec-ideas-list li:last-child, .rec-errores-list li:last-child { border-bottom:none; }
    .rec-errores-section .rec-sug-label { color:#f43f5e; }
    .rec-errores-list li { color:#fca5a5; }
    .rec-vacio { text-align:center; color:var(--text-muted); padding:20px; font-size:0.9rem; }
    `;
    document.head.appendChild(style);
})();
