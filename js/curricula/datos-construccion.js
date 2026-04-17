// =============================================
// DATOS CURRICULARES — Especialidad CONSTRUCCIÓN
// Archivo: js/curricula/datos-construccion.js
//
// PLANTILLA — completar con datos reales del programa Mineduc
// Módulos: CN1–CN9 (verificar numeración oficial)
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

CURRICULA_FULL['construccion'] = {

  modulos: {

    // ══════════════════════════════════════════════════════
    // 3° MEDIO
    // ══════════════════════════════════════════════════════

    'CN1': {
      num: 'CN1',
      nombre: 'Lectura e Interpretación de Planos',
      nivel: '3M',
      horas: 190,
      oas: {
        'OA1': 'Leer e interpretar planos de construcción, arquitectónicos y de instalaciones, utilizando simbología y normas técnicas vigentes.'
      },
      aes: {
        'OA1': {
          texto: 'Interpreta planos de arquitectura y estructura, reconociendo simbología, escalas y especificaciones técnicas.',
          ces: {
            '1.1': { texto: 'Identifica los tipos de planos de construcción (planta, elevación, corte, detalle) y su función dentro de un proyecto.', oag: ['B'] },
            '1.2': { texto: 'Lee e interpreta simbología normalizada en planos de arquitectura, estructura e instalaciones, según normas NCh vigentes.', oag: ['A'] },
            '1.3': { texto: 'Determina cotas, escalas y medidas reales a partir de un plano, aplicando procedimientos de conversión y verificación.', oag: ['B'] },
            '1.4': { texto: 'Relaciona la información del plano con las especificaciones técnicas del proyecto, identificando materiales y procedimientos indicados.', oag: ['B'] }
          }
        },
        'OA2': {
          texto: 'Realiza croquis y trazados básicos a partir de indicaciones técnicas, respetando proporciones y convenciones de dibujo.',
          ces: {
            '2.1': { texto: 'Traza líneas, ángulos y figuras geométricas básicas utilizando instrumentos de dibujo técnico, respetando precisión y orden.', oag: ['C'] },
            '2.2': { texto: 'Elabora croquis acotados de elementos constructivos simples, aplicando proporciones correctas y simbología adecuada.', oag: ['B'] },
            '2.3': { texto: 'Interpreta y reproduce trazados en terreno a partir de planos, utilizando herramientas de replanteo y verificación.', oag: ['C'] },
            '2.4': { texto: 'Documenta el trazado realizado mediante registro fotográfico e informe técnico breve, comunicando los resultados con claridad.', oag: ['H'] }
          }
        },
        'OA3': {
          texto: 'Cuantifica materiales básicos a partir de planos y especificaciones técnicas, elaborando listados de insumos.',
          ces: {
            '3.1': { texto: 'Lee e interpreta las especificaciones técnicas de un proyecto, identificando materiales, calidades y cantidades requeridas.', oag: ['A'] },
            '3.2': { texto: 'Calcula superficies, volúmenes y longitudes de elementos constructivos a partir de planos, aplicando fórmulas geométricas.', oag: ['B'] },
            '3.3': { texto: 'Elabora listado de materiales (cómputo de materiales) para partidas básicas de obra, considerando rendimientos y desperdicios.', oag: ['D'] },
            '3.4': { texto: 'Verifica la coherencia entre el listado elaborado y los planos del proyecto, corrigiendo errores u omisiones detectados.', oag: ['B'] }
          }
        },
        'OA4': {
          texto: 'Aplica normas de seguridad y prevención de riesgos en lectura e interpretación de planos en contexto de obra.',
          ces: {
            '4.1': { texto: 'Identifica los riesgos asociados al trabajo en obra derivados de una lectura incorrecta de planos o replanteo impreciso.', oag: ['F'] },
            '4.2': { texto: 'Aplica procedimientos seguros en el uso de herramientas de replanteo y medición en terreno.', oag: ['K'] },
            '4.3': { texto: 'Elabora reporte de observaciones de seguridad relacionadas con el estado de planos y documentación técnica en obra.', oag: ['H'] }
          }
        }
      }
    }

    // ── Agregar CN2–CN9 siguiendo la misma estructura ─────────
    // 'CN2': { num: 'CN2', nombre: '...', nivel: '3M', horas: 0, oas: {}, aes: {} },
    // ...

  },

  // ── Objetivos de Aprendizaje Genéricos (OAG) ───────────────
  // Pueden ser los mismos que Electrónica o específicos de la especialidad
  oag: {
    'A': 'Analizar información técnica de diversas fuentes para sustentar decisiones y procedimientos en el trabajo de construcción.',
    'B': 'Aplicar correctamente procedimientos, técnicas y protocolos en el trabajo con materiales y sistemas constructivos.',
    'C': 'Usar herramientas, instrumentos y equipos con destreza y seguridad, considerando las especificaciones técnicas.',
    'D': 'Planificar y organizar el trabajo técnico con eficiencia, estableciendo prioridades y recursos necesarios.',
    'F': 'Cumplir con las normas de seguridad laboral y prevención de riesgos en todos los procedimientos técnicos.',
    'H': 'Comunicar en forma clara y técnica los procesos, resultados y procedimientos realizados (oral y escrito).',
    'I': 'Proponer mejoras, adaptaciones o innovaciones en sistemas o procesos constructivos con perspectiva de eficiencia.',
    'J': 'Emprender iniciativas útiles para el lugar de trabajo, actuando con proactividad y responsabilidad profesional.',
    'K': 'Aplicar rigurosamente las normas de seguridad y verificar condiciones de riesgo antes y durante el trabajo.'
  }

};
