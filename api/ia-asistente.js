/**
 * api/ia-asistente.js — Click&Clase
 * Proxy serverless a Google Gemini API
 * Variables de entorno requeridas: GEMINI_API_KEY
 */

const GEMINI_MODEL_DEFAULT = 'gemini-2.5-flash';
const GEMINI_MODELOS_PERMITIDOS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro'
];
function _geminiUrl(modelo) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`;
}

// ── NEE: tips pedagógicos por diagnóstico ────────────────────
const NEE_TIPS = {
  tea:         'Estudiante con TEA: usa instrucciones paso a paso, secuencias visuales, evita ambigüedades, incluye rutinas predecibles y tiempo adicional.',
  tdah:        'Estudiante con TDAH: divide actividades en pasos cortos, incluye pausas activas, instrucciones claras y breves, variedad de formatos (visual, auditivo, kinestésico).',
  dislexia:    'Estudiante con Dislexia: usa fuentes grandes, espaciado amplio, apoyos visuales (imágenes, esquemas), lectura en voz alta como alternativa, tiempo extra.',
  discalculia: 'Estudiante con Discalculia: usa materiales concretos y manipulativos, tablas de ayuda permitidas, pasos intermedios visibles, calculadora si corresponde.',
  disgrafia:   'Estudiante con Disgrafía: permite respuestas orales o digitales, reduce exigencia de copia, usar letra imprenta, evaluar contenido más que caligrafía.',
  hipoacusia:  'Estudiante con Hipoacusia/Sordera: posicionar al frente, usar apoyo visual siempre, subtítulos en videos, materiales escritos completos, intérprete LSCh si aplica.',
  'baja-vision':'Estudiante con Baja Visión: materiales en letra grande (16pt mínimo), alto contraste, acceso prioritario, iluminación adecuada, versión digital editable.',
  'deficit-int':'Estudiante con Déficit Intelectual: objetivos simplificados con adecuación curricular, actividades concretas y funcionales, refuerzo positivo constante, apoyo del PIE.',
  tl:          'Estudiante con Trastorno del Lenguaje (TEL/DEL): dar tiempo extra para responder, no corregir frente al grupo, apoyar con imágenes y gestos, evaluación adaptada.',
  motor:       'Estudiante con Trastorno Motor: adaptar espacio físico y materiales, uso de tecnología asistiva, evaluar de forma oral o con apoyo, tiempos flexibles.',
  emocional:   'Estudiante con Trastorno Emocional/Conductual: ambiente predecible y estructurado, acuerdos de convivencia claros, refuerzo positivo, estrategias de regulación emocional.',
  dotacion:    'Estudiante con Altas Capacidades: actividades de ampliación y profundización, proyectos de investigación, rol de tutor entre pares, desafíos de orden superior (analizar, crear).'
};

// ── Tabla de niveles cognitivos (clásicos) ───────────────────
// Equivalen a los 6 niveles ascendentes de complejidad cognitiva.
// El documento generado NUNCA debe nombrar la taxonomía — solo los niveles.
const BLOOM = {
  recordar:    'Nivel RECORDAR: preguntas de conocimiento factual, definiciones, identificación, reconocimiento.',
  comprender:  'Nivel COMPRENDER: preguntas que exigen explicar, describir, interpretar, resumir, clasificar.',
  aplicar:     'Nivel APLICAR: ejercicios que requieren usar conceptos en situaciones nuevas, resolver problemas.',
  analizar:    'Nivel ANALIZAR: ítems que piden descomponer, comparar, contrastar, diferenciar, examinar causas.',
  evaluar:     'Nivel EVALUAR: preguntas de juicio, crítica, justificación, defensa de posturas.',
  crear:       'Nivel CREAR: actividades de diseño, producción, propuesta, elaboración de algo nuevo.'
};

// ── Tabla de niveles de Marzano (Nueva Taxonomía 2001) ──────
// Marzano agrupa el procesamiento cognitivo en 4 niveles + 2 sistemas (meta-cognición y self-system).
const MARZANO = {
  recuperacion:    'Nivel 1 RECUPERACIÓN (Marzano): reconocer, recordar y ejecutar procedimientos. Preguntas de identificación, definición y ejecución básica.',
  comprension:     'Nivel 2 COMPRENSIÓN (Marzano): integrar y simbolizar información. Preguntas de síntesis, parafraseo, representaciones gráficas o esquemas.',
  analisis:        'Nivel 3 ANÁLISIS (Marzano): emparejar, clasificar, analizar errores, generalizar y especificar. Preguntas que exigen razonamiento profundo y conexiones inferenciales.',
  utilizacion:     'Nivel 4 UTILIZACIÓN DEL CONOCIMIENTO (Marzano): toma de decisiones, resolución de problemas, investigación experimental, indagación. Tareas de aplicación auténtica en contextos reales.',
  metacognicion:   'Nivel 5 METACOGNICIÓN (Marzano): especificar metas, monitorear el proceso, evaluar la claridad y precisión del propio pensamiento.',
  autosistema:     'Nivel 6 AUTO-SISTEMA (Marzano): examinar la importancia, eficacia, respuesta emocional y motivación frente a la tarea.'
};

// ── Ejes y características de las competencias PAES ──────────
const PAES = {
  lectora: {
    nombre: 'Competencia Lectora PAES',
    descripcion: 'Mide habilidades de localizar, interpretar, relacionar y reflexionar sobre textos. NO mide conocimiento literario per se.',
    ejes: ['Localizar información', 'Interpretar y relacionar', 'Reflexionar sobre el texto'],
    formato: 'Estímulos textuales variados (literarios, no literarios, infografías, gráficos, tablas, columnas de opinión, instructivos). Cada estímulo tiene entre 4 y 8 preguntas asociadas. 5 alternativas (A-E) por pregunta.'
  },
  m1: {
    nombre: 'Matemática M1 (PAES)',
    descripcion: 'Eje común obligatorio. Evalúa habilidades de Números, Álgebra y Funciones, Geometría, y Probabilidad y Estadística aplicadas a 7° Básico–2° Medio.',
    ejes: ['Números', 'Álgebra y Funciones', 'Geometría', 'Probabilidad y Estadística'],
    formato: 'Preguntas con contextos cotidianos o disciplinares. Incluye tablas, gráficos, figuras. 5 alternativas (A-E). Habilidades evaluadas: resolver problemas, modelar, representar y argumentar/comunicar.'
  },
  m2: {
    nombre: 'Matemática M2 (PAES Electivo)',
    descripcion: 'Eje electivo. Evalúa contenidos de 3° y 4° Medio: funciones, vectores, geometría analítica, probabilidad condicional, inferencia estadística.',
    ejes: ['Números complejos', 'Álgebra y funciones (avanzado)', 'Geometría', 'Probabilidad y Estadística inferencial'],
    formato: 'Contextos más abstractos y disciplinares. 5 alternativas (A-E). Habilidades superiores: argumentar, demostrar.'
  },
  ciencias: {
    nombre: 'Ciencias PAES (Biología, Física, Química)',
    descripcion: 'Módulo común obligatorio. Evalúa los OAs comunes de ciencias en 1°-2° Medio para todos, más electivo en una de las 3 disciplinas.',
    ejes: ['Habilidades de pensamiento científico', 'Biología (organismos y procesos)', 'Física (movimiento, energía, ondas)', 'Química (materia y reacciones)'],
    formato: 'Estímulos: experimentos, datos experimentales, gráficos, esquemas, fenómenos. 5 alternativas (A-E). Énfasis en interpretar evidencia y modelar.'
  },
  historia: {
    nombre: 'Historia y Ciencias Sociales PAES',
    descripcion: 'Módulo electivo. Evalúa Historia, Geografía y Formación Ciudadana de 1°-2° Medio (común) más 3°-4° Medio (electivo).',
    ejes: ['Pensamiento histórico', 'Pensamiento geográfico', 'Formación ciudadana', 'Pensamiento crítico sobre información'],
    formato: 'Fuentes primarias y secundarias: textos historiográficos, documentos de época, mapas, infografías, gráficos. 5 alternativas (A-E). Habilidades: análisis de fuentes, multicausalidad, perspectivas históricas.'
  },
  ingles: {
    nombre: 'Inglés (formato tipo PAES — Reading Comprehension)',
    descripcion: 'Comprensión lectora en inglés. Aunque no es una prueba PAES oficial, replica el formato: textos auténticos seguidos de preguntas con 5 alternativas, alineado al estándar B1-B2 del MCER y al currículum Mineduc de Inglés 3°-4° Medio.',
    ejes: ['Reading for gist', 'Reading for specific information', 'Inferring meaning from context', 'Author intent and tone', 'Vocabulary in context'],
    formato: 'Textos en inglés (artículos, anuncios, blogs, emails, infografías, fragmentos literarios), 200-400 palabras según nivel. Cada texto con 4-6 preguntas en inglés con 5 alternativas (A-E) en inglés. Distractores plausibles basados en errores comunes de L2.'
  }
};

// ── Constructor de contexto pedagógico ──────────────────────
function buildContext(datos) {
  // Tabla taxonómica activa: Marzano si datos.taxonomiaSistema === 'marzano', si no Bloom (default)
  const TAX_TABLE = datos.taxonomiaSistema === 'marzano' ? MARZANO : BLOOM;
  const taxLabel  = datos.taxonomiaSistema === 'marzano' ? 'Marzano' : 'Bloom';

  const lines = [
    datos.colegio      ? `Institución educativa: ${datos.colegio}`            : '',
    datos.asignatura   ? `Asignatura / Módulo: ${datos.asignatura}`           : '',
    datos.modulo       ? `Módulo TP: ${datos.modulo}`                         : '',
    datos.especialidad ? `Especialidad EMTP: ${datos.especialidad}`           : '',
    datos.nivel        ? `Nivel / Curso: ${datos.nivel}`                      : '',
    datos.unidad       ? `Unidad: ${datos.unidad}`                            : '',
    datos.horas        ? `Duración: ${datos.horas} horas pedagógicas`        : '',
    datos.tema         ? `Tema específico: ${datos.tema}`                     : '',
    datos.taxonomia    ? (TAX_TABLE[datos.taxonomia] || `Nivel cognitivo: ${datos.taxonomia}`) : '',
    datos.tiposPreguntas && datos.tiposPreguntas.length
                       ? `Tipos de preguntas/actividades: ${Array.isArray(datos.tiposPreguntas) ? datos.tiposPreguntas.join(', ') : datos.tiposPreguntas}` : '',
    datos.nPreguntas   ? `Cantidad total de preguntas/ítems: ${datos.nPreguntas}` : '',
    datos.extra        ? `Indicaciones adicionales: ${datos.extra}`           : '',
  ].filter(Boolean).join('\n');

  // ── Bloque de OAs Mineduc ─────────────────────────────────
  let oaBlock = '';
  const oasSel = datos.oas_seleccionados;
  const oaManual = datos.oa;

  if (oasSel && oasSel.length > 0) {
    // OAs reales desde el currículum Mineduc
    oaBlock = '\n\n─── OBJETIVOS DE APRENDIZAJE (Programa Mineduc) ───\n' +
      oasSel.map(o => `• ${o.codigo}: ${o.descripcion}`).join('\n') +
      '\n\nINSTRUCCIÓN CURRICULAR: Tu documento DEBE:\n' +
      '1. Citar explícitamente los códigos OA en el objetivo de la clase (ej: "OA3, OA7").\n' +
      '2. Diseñar cada actividad alineada a los indicadores de esos OA.\n' +
      '3. Incluir los códigos OA en la rúbrica o tabla de especificaciones.\n' +
      '4. Los indicadores de logro deben ser verificables y corresponder al OA citado.';
  } else if (oaManual) {
    oaBlock = `\n\nObjetivo de Aprendizaje / AE: ${oaManual}\n` +
      'INSTRUCCIÓN: Cita el código OA en el objetivo de la clase y en los indicadores de logro.';
  }

  // ── Bloque NEE ───────────────────────────────────────────
  const neeTips = (datos.nee && datos.nee.length)
    ? '\n\n─── ATENCIÓN A LA DIVERSIDAD (NEE diagnosticadas) ───\n' +
      'Incorporar como sección final del documento:\n' +
      datos.nee.map(k => '• ' + (NEE_TIPS[k] || k)).join('\n')
    : '';

  return lines + oaBlock + neeTips;
}

// ── Prompts por herramienta ──────────────────────────────────
function buildPrompt(tipo, datos) {
  const hasOAs = (datos.oas_seleccionados && datos.oas_seleccionados.length > 0) || datos.oa;

  // ── Atajo: si el formato es PAES y aplica al tipo (prueba/evaluacion/guia), usar prompt PAES ──
  const formatoPAES = datos.formato === 'paes';
  const aplicaPAES  = ['prueba', 'evaluacion', 'guia'].indexOf(tipo) !== -1;
  if (formatoPAES && aplicaPAES) {
    return buildPromptPAES(tipo, datos);
  }

  const intro = `Eres un experto pedagógico en educación chilena (Mineduc).
Conoces el currículum nacional: Educación Básica 1°-8°, Plan Común 1°-4° Medio y EMTP.
Redactas en español formal chileno, de forma práctica y lista para usar en aula.
${hasOAs ? 'FUNDAMENTAL: El documento debe estar ALINEADO CURRICULAMENTE con los OA indicados — citar sus códigos en los objetivos y la evaluación.' : ''}
Responde SOLO con el documento solicitado, sin saludos ni comentarios adicionales.
Usa secciones en MAYÚSCULAS, bullets (•) y numeración donde corresponda.\n\n`;

  const ctx = buildContext(datos);

  const prompts = {

    planificacion: `${intro}Genera una PLANIFICACIÓN DE CLASE completa con estos datos:
${ctx}

ESTRUCTURA REQUERIDA:
═══════════════════════════════════════════════
PLANIFICACIÓN DE CLASE
Institución: [${datos.colegio || '_____________'}]
Asignatura: ${datos.asignatura || '___'}  |  Nivel/Curso: ${datos.nivel || datos.curso || '___'}  |  Duración: ${datos.horas || '___'} hrs
${datos.modulo ? 'Módulo (EMTP): ' + datos.modulo + '\n' : ''}${datos.oaEspecialidad ? 'OA de la especialidad: ' + datos.oaEspecialidad + '\n' : ''}${datos.oag ? 'Objetivos de Aprendizaje Genéricos (OAG): ' + datos.oag + '\n' : ''}${hasOAs ? 'Objetivo(s) de Aprendizaje Mineduc: [citar códigos OA aquí]' : 'OA / AE: _______________'}
${datos.ae ? 'Aprendizaje(s) Esperado(s): ' + datos.ae + '\n' : ''}Unidad: ${datos.unidad || '___'}  |  Tema: ${datos.tema || '___'}
═══════════════════════════════════════════════

OBJETIVO DE LA CLASE (vinculado al OA citado)
HABILIDADES A DESARROLLAR (según eje curricular)
ACTITUDES Y VALORES

INICIO (____min)
• Activación de conocimientos previos
• Motivación / problema o pregunta desafiante
• Conexión con el OA

DESARROLLO (____min)
• Actividades secuenciadas (al menos 3, cada una con recursos y descripción)
• Estrategias diferenciadas (trabajo individual, parejas, grupal)
• Recursos: materiales físicos y/o digitales

CIERRE (____min)
• Síntesis y plenario
• Evaluación formativa (ticket de salida, pregunta, autoevaluación)

TAREA / EXTENSIÓN (si aplica)

INDICADORES DE LOGRO (deben ser verificables y corresponder al OA citado):
• El/la estudiante [verbo observable]...
• El/la estudiante [verbo observable]...

CRITERIOS DE EVALUACIÓN (observables y medibles, alineados a los OA/AE citados)
${datos.criterios ? datos.criterios : '• Redacta criterios de evaluación verificables para cada objetivo/aprendizaje esperado.'}

VALORES Y ACTITUDES (Marco de la Buena Enseñanza)
${datos.valores ? '• Promover explícitamente: ' + datos.valores : '• Señala los valores y actitudes transversales a promover en la clase.'}

ATENCIÓN A LA DIVERSIDAD — NEE (Decreto 170)
${datos.nee ? 'Diagnóstico(s) presente(s) en el curso: ' + (Array.isArray(datos.nee) ? datos.nee.join(', ') : datos.nee) : 'Indica si hay estudiantes con NEE.'}

ADECUACIONES CURRICULARES (Decreto 83/2015, coherentes con las NEE señaladas)
${datos.adecuaciones ? datos.adecuaciones : '• Indica adecuaciones de acceso y/o en los objetivos según los diagnósticos del curso (si aplica).'}`,

    guia: `${intro}Genera una GUÍA DE APRENDIZAJE completa para estudiantes chilenos:
${ctx}

${datos.tiposPreguntas && datos.tiposPreguntas.length ? 'Las actividades deben incluir los siguientes formatos: ' + (Array.isArray(datos.tiposPreguntas) ? datos.tiposPreguntas.join(', ') : datos.tiposPreguntas) + '.' : ''}
${datos.nPreguntas ? 'Incluye un total de ' + datos.nPreguntas + ' actividades/ítems.' : ''}

ESTRUCTURA:
══════════════════════════════════════
GUÍA DE APRENDIZAJE
Institución: ${datos.colegio || '_____________'}
Asignatura: ${datos.asignatura || '___'}  |  Nivel: ${datos.nivel || '___'}
${hasOAs ? 'OA(s): [citar código OA]' : 'OA / AE: _______________'}
Nombre: ___________________  Curso: ___  Fecha: ___
══════════════════════════════════════
OBJETIVO DE APRENDIZAJE (citar código OA si aplica)
INTRODUCCIÓN AL TEMA (contexto real o situación problema)
CONCEPTOS CLAVE (definiciones precisas + ejemplos cotidianos o técnicos)
ACTIVIDADES DE DESARROLLO (numeradas, variadas: ${datos.tiposPreguntas && datos.tiposPreguntas.length ? datos.tiposPreguntas.join(', ') : 'individual, parejas, grupo'})
PREGUNTAS DE REFLEXIÓN (nivel cognitivo ${datos.taxonomia || 'analizar'})
AUTOEVALUACIÓN (escala de 1-4 o lista de cotejo)`,

    prueba: `${intro}Genera un INSTRUMENTO DE EVALUACIÓN (prueba escrita) para estudiantes chilenos:
${ctx}

${datos.tiposPreguntas && datos.tiposPreguntas.length
  ? 'PARTES A INCLUIR: ' + (Array.isArray(datos.tiposPreguntas) ? datos.tiposPreguntas.join(', ') : datos.tiposPreguntas)
  : 'Incluye: Selección Múltiple, Verdadero/Falso y Desarrollo.'}
${datos.nPreguntas ? 'TOTAL DE ÍTEMS: ' + datos.nPreguntas + ' (distribuidos entre las partes)' : 'Mínimo 15 ítems en total.'}

ESTRUCTURA:
══════════════════════════════════════════════
Institución: ${datos.colegio || '_____________'}
Asignatura: ${datos.asignatura || '___'}  |  Nivel: ${datos.nivel || '___'}  |  Fecha: ___________
${hasOAs ? 'OA evaluado(s): [citar código OA]' : 'OA / AE: _______________'}
Puntaje total: ___  |  Puntaje mínimo de aprobación: ___
Nombre estudiante: _________________________  Curso: ___
══════════════════════════════════════════════
INSTRUCCIONES GENERALES
${getPartesPrueba(datos)}
PAUTA DE CORRECCIÓN (respuesta correcta y puntaje por ítem)
TABLA DE ESPECIFICACIONES:
  OA | Contenido | Tipo ítem | N° ítem | Habilidad cognitiva | Puntaje
${datos.adaptadaPIE ? `
════════════════════════════════════════════════
⚠ GENERA ÚNICAMENTE LA VERSIÓN ADAPTADA PIE (Decreto 83/2015)
Evaluación DIFERENCIADA para estudiantes con NEE: ${Array.isArray(datos.nee) ? datos.nee.join(', ') : (datos.nee || 'NEE del curso')}.
Mantén los MISMOS OA/AE evaluados y aplica EXACTAMENTE las siguientes adecuaciones elegidas por el docente (no agregues otras ni las omitas):
${(Array.isArray(datos.adecuacionesPIE) && datos.adecuacionesPIE.length) ? datos.adecuacionesPIE.map(a => '• ' + a).join('\n') : '• Reduce la cantidad de ítems priorizando lo esencial.\n• Simplifica el lenguaje y las instrucciones.\n• Más espacio para responder y letra clara.\n• Considera más tiempo y apoyos permitidos.'}
Instrucciones de aplicación:
- Si se pide "reducir alternativas", deja solo 3 opciones por ítem de selección múltiple.
- Si se pide "resaltar/ennegrecer datos esenciales", escribe en MAYÚSCULAS o entre **asteriscos** las palabras clave del enunciado.
- Si se pide "reducir preguntas", genera menos ítems que la versión estándar, cubriendo los objetivos esenciales.
Encabeza el documento con "VERSIÓN ADAPTADA PIE" y agrega al final la lista de ADECUACIONES APLICADAS.` : ''}`,

    apunte: `${intro}Genera un APUNTE DE CONTENIDO completo para estudiantes chilenos:
${ctx}

${datos.nPreguntas ? 'Incluye ' + datos.nPreguntas + ' preguntas de comprensión al final.' : ''}

ESTRUCTURA:
══════════════════════════════════════
${datos.colegio || 'Institución Educativa'}
APUNTE DE CONTENIDO — ${datos.asignatura || 'Asignatura'}
Nivel: ${datos.nivel || '___'}  |  Tema: ${datos.tema || '___'}
${hasOAs ? 'Vinculado a: [citar código OA]' : ''}
══════════════════════════════════════
INTRODUCCIÓN (relevancia del tema, conexión con la vida real)
CONTENIDO PRINCIPAL
  — Conceptos fundamentales con definiciones precisas
  — Ejemplos del contexto chileno (técnico, laboral o cotidiano)
  — Tablas comparativas, fórmulas o esquemas donde corresponda
  — Aplicaciones prácticas
RESUMEN / IDEAS CLAVE (bullets concisos)
GLOSARIO TÉCNICO (términos del área)
PREGUNTAS DE COMPRENSIÓN (${datos.nPreguntas || '5-8'} preguntas, nivel cognitivo ${datos.taxonomia || 'aplicar'})`,

    revision: `${intro}Realiza una REVISIÓN PEDAGÓGICA del siguiente material:
${ctx}
${datos.texto_a_revisar ? '\nMATERIAL A REVISAR:\n' + datos.texto_a_revisar : ''}

INFORME DE REVISIÓN:
ANÁLISIS DE FORTALEZAS
ÁREAS DE MEJORA (con sugerencias concretas)
COHERENCIA CURRICULAR (¿está alineado con el OA/AE?)
COBERTURA TAXONÓMICA (¿qué niveles cognitivos cubre?)
LENGUAJE Y CLARIDAD (¿apropiado para el nivel?)
VERSIÓN MEJORADA de los ítems con más problemas`,

    taller: `${intro}Genera una GUÍA PARA ACTIVIDAD EN TALLER (práctica EMTP) para:
${ctx}

ESTRUCTURA OBLIGATORIA:
ENCABEZADO (${datos.colegio || 'Institución'}, Módulo, Especialidad, Nivel, Fecha, Duración)
OBJETIVO DE LA ACTIVIDAD PRÁCTICA
NORMAS DE SEGURIDAD (EPP requerido y precauciones específicas)
MATERIALES Y HERRAMIENTAS
PROCEDIMIENTO PASO A PASO (cada paso numerado y verificable)
CRITERIOS DE EVALUACIÓN — Lista de cotejo:
  Indicador | Logrado | Por lograr | No logrado
INFORME DE ACTIVIDAD (preguntas de análisis al terminar)
CONCLUSIÓN Y REFLEXIÓN`,

    // ── Refinamiento conversacional: modifica un documento HTML ya generado ──
    refinar: `Eres un experto pedagógico chileno (Mineduc). Un docente ya generó este documento educativo y quiere modificarlo con una instrucción puntual.

═══════════ DOCUMENTO ACTUAL (HTML) ═══════════
${datos.contenidoActual || ''}
═══════════════════════════════════════════════

INSTRUCCIÓN DEL DOCENTE:
"${datos.instruccion || ''}"

REGLAS ESTRICTAS:
1. Aplica SOLO la modificación pedida; conserva el resto del documento intacto.
2. Mantén el formato HTML del documento (preserva los tags: <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <li>, <table>, <tr>, <td>, <strong>, <em>, <hr>, <br>, <div>, <span>, atributos style/class).
3. Mantén la estructura general (encabezado, secciones en MAYÚSCULAS, pauta de corrección, tabla de especificaciones, etc.).
4. Mantén el nivel pedagógico, la alineación curricular con OAs si los hay, y el español formal chileno.
5. Si la instrucción es ambigua, interpreta de la forma más razonable para un profe de aula chileno.
6. Si la instrucción pide algo que viola las reglas (ej: "elimina todo"), aplícala de forma conservadora preservando la utilidad del documento.

RESPONDE SOLO CON EL HTML MODIFICADO. Sin comentarios, sin saludos, sin marcadores de código (no uses tres acentos graves). Empieza directamente con el primer tag HTML.`
  };

  return prompts[tipo] || `${intro}Genera un documento educativo sobre:\n${ctx}`;
}

// ── Prompts PAES por competencia ─────────────────────────────
function buildPromptPAES(tipo, datos) {
  const compKey = (datos.competenciaPaes || 'lectora').toLowerCase();
  const comp    = PAES[compKey] || PAES.lectora;
  const ctx     = buildContext(datos);
  const hasOAs  = (datos.oas_seleccionados && datos.oas_seleccionados.length > 0) || datos.oa;
  const tipoLabel = { prueba: 'PRUEBA PAES', evaluacion: 'EVALUACIÓN TIPO PAES', guia: 'GUÍA DE ENTRENAMIENTO PAES' }[tipo] || 'INSTRUMENTO PAES';
  const nItems = datos.nPreguntas || (compKey === 'lectora' ? 12 : 15);

  const intro = `Eres un experto en evaluación PAES (Prueba de Acceso a la Educación Superior, Chile, DEMRE).
Conoces a fondo el formato oficial y los estándares de la prueba real.
${comp.descripcion}
EJES EVALUADOS: ${comp.ejes.join(' · ')}
FORMATO PAES: ${comp.formato}
${hasOAs ? 'FUNDAMENTAL: Alinea los ítems con los OA Mineduc citados.' : ''}
Redacta en español formal chileno. Sin saludos. Responde directamente con el documento.\n\n`;

  // Cuerpos diferenciados por competencia
  if (compKey === 'lectora') {
    return `${intro}Genera una ${tipoLabel} de COMPETENCIA LECTORA con ${nItems} ítems organizados por estímulos:
${ctx}

ESTRUCTURA OBLIGATORIA:
════════════════════════════════════════════
${tipoLabel} — COMPETENCIA LECTORA
${datos.colegio ? 'Institución: ' + datos.colegio : 'Institución: _____________'}
${hasOAs ? 'OA Mineduc evaluados: [citar códigos]' : 'OA / AE: _____________'}
Nombre: _________________  Curso: ___  Fecha: ___
Puntaje total: ___  Tiempo sugerido: ___ min
════════════════════════════════════════════

INSTRUCCIONES GENERALES
- Cada texto va seguido de preguntas con 5 alternativas (A-E).
- Marca solo UNA alternativa correcta.
- No se descuenta por respuestas incorrectas (formato PAES).

ESTRUCTURA POR ESTÍMULO (repetir para ${Math.ceil(nItems / 6)} estímulos):

▸ TEXTO N (Género: literario / no literario / mixto / infografía)
[Texto completo de 250-450 palabras según complejidad, con buen nivel de cohesión y conectores. Si es infografía o gráfico, describir el contenido con detalle textual + referencia visual.]

PREGUNTAS DEL TEXTO N:

1. [Pregunta de LOCALIZAR información]
   A) ...
   B) ...
   C) ...
   D) ...
   E) ...

2. [Pregunta de INTERPRETAR / RELACIONAR — inferencia, propósito, intención]
   A-E: ...

3. [Pregunta de REFLEXIONAR sobre el texto — postura del autor, evaluación crítica]
   A-E: ...

(Para Comp. Lectora cada estímulo tiene entre 4 y 8 preguntas. Distribuye ${nItems} ítems en ${Math.ceil(nItems / 6)} estímulos.)

═══ CLAVE DE RESPUESTAS ═══
1. _   2. _   3. _   ... ${nItems}. _

═══ TABLA DE ESPECIFICACIONES ═══
N° ítem | Estímulo | Eje PAES (Localizar/Interpretar/Reflexionar) | Habilidad | OA Mineduc (si aplica)

═══ PAUTA DE ANÁLISIS PEDAGÓGICO ═══
Por cada ítem incorrecto frecuente, sugiere intervención.`;
  }

  if (compKey === 'm1' || compKey === 'm2') {
    const matNivel = compKey === 'm1' ? 'M1 (eje común, 7°B–2°M)' : 'M2 (eje electivo, 3°-4°M)';
    return `${intro}Genera una ${tipoLabel} de MATEMÁTICA ${matNivel} con ${nItems} ítems:
${ctx}

ESTRUCTURA OBLIGATORIA:
════════════════════════════════════════════
${tipoLabel} — MATEMÁTICA ${matNivel}
${datos.colegio ? 'Institución: ' + datos.colegio : 'Institución: _____________'}
${hasOAs ? 'OA Mineduc evaluados: [citar códigos]' : 'OA / AE: _____________'}
Nombre: _________________  Curso: ___  Fecha: ___
Puntaje total: ___  Tiempo sugerido: ___ min
════════════════════════════════════════════

INSTRUCCIONES
- ${nItems} preguntas con 5 alternativas (A-E), solo una correcta.
- Se permite calculadora científica (no graficadora).
- No se descuenta puntaje por errores (formato PAES vigente).

REQUERIMIENTOS DE DISEÑO:
1. Distribuye los ítems entre los ejes: ${comp.ejes.join(', ')}.
2. Incluye habilidades PAES: resolver problemas (40%), modelar (25%), representar (20%), argumentar/comunicar (15%).
3. Al menos un tercio de las preguntas debe usar un estímulo concreto (tabla, gráfico, figura, situación contextualizada cotidiana o disciplinar chilena).
4. Dificultad progresiva: fáciles → intermedias → exigentes.
5. Distractores plausibles que correspondan a errores conceptuales típicos.

FORMATO DE CADA ÍTEM:
N. [Enunciado claro con contexto. Si aplica, incluir tabla/gráfico textualmente descrito.]

   A) ____
   B) ____
   C) ____
   D) ____
   E) ____

═══ CLAVE DE RESPUESTAS ═══
1. _   2. _   ... ${nItems}. _

═══ TABLA DE ESPECIFICACIONES ═══
N° | Eje (${comp.ejes.join('/')}) | Habilidad PAES | Dificultad (F/M/D) | OA Mineduc

═══ RESOLUCIÓN PASO A PASO ═══
Por cada ítem, breve resolución del razonamiento que llega a la clave correcta.`;
  }

  if (compKey === 'ciencias') {
    return `${intro}Genera una ${tipoLabel} de CIENCIAS PAES con ${nItems} ítems:
${ctx}

ESTRUCTURA OBLIGATORIA:
════════════════════════════════════════════
${tipoLabel} — CIENCIAS (Bio / Fis / Quim)
${datos.colegio ? 'Institución: ' + datos.colegio : 'Institución: _____________'}
${hasOAs ? 'OA Mineduc evaluados: [citar códigos]' : 'OA / AE: _____________'}
Nombre: _________________  Curso: ___  Fecha: ___
Puntaje total: ___  Tiempo sugerido: ___ min
════════════════════════════════════════════

INSTRUCCIONES
- ${nItems} preguntas con 5 alternativas (A-E), solo una correcta.
- No se descuenta puntaje por respuestas erradas.

REQUERIMIENTOS DE DISEÑO:
1. Incluye al menos 2 estímulos largos (experimento, datos de tabla, gráfico, esquema, fenómeno) seguidos de 3-5 preguntas cada uno.
2. Cubre los ejes: ${comp.ejes.join(', ')}.
3. Habilidades de pensamiento científico: observar y plantear preguntas, formular hipótesis, planificar experimentos, analizar evidencia, comunicar.
4. Distractores reflejan misconceptions comunes documentadas en literatura.

FORMATO POR ESTÍMULO:

▸ ESTÍMULO N: [título]
[Descripción detallada del experimento, datos, gráfico, esquema o fenómeno — al menos 120 palabras con elementos numéricos cuando aplique.]

Preguntas del estímulo:
N. [Enunciado]
   A) ____  B) ____  C) ____  D) ____  E) ____

═══ CLAVE DE RESPUESTAS ═══
═══ TABLA DE ESPECIFICACIONES ═══
N° | Disciplina (Bio/Fis/Quim) | Eje | Habilidad pensamiento científico | OA
═══ EXPLICACIÓN CIENTÍFICA DE CADA RESPUESTA ═══`;
  }

  if (compKey === 'ingles') {
    return `${intro}Genera una ${tipoLabel} de INGLÉS (Reading Comprehension, formato tipo PAES) with ${nItems} items:
${ctx}

INSTRUCTIONS (in Spanish for the teacher, EN for the student):
- Texts and questions IN ENGLISH (B1-B2 level CEFR).
- Each text 200-400 words.
- Each question 5 alternatives (A-E), one correct.
- Distractors based on common L2 misinterpretations.

═══════════════════════════════
${tipoLabel} — ENGLISH READING
${datos.colegio ? 'Institution: ' + datos.colegio : 'Institution: _____________'}
${hasOAs ? 'OA Mineduc evaluated: [citar códigos]' : 'OA / AE: _____________'}
Name: _________________  Grade: ___  Date: ___
Total points: ___  Suggested time: ___ min
═══════════════════════════════

INSTRUCTIONS FOR THE STUDENT (in English)
Read each text carefully. For each question, choose the BEST option (A, B, C, D or E). There is only one correct answer per question. Wrong answers do not subtract points.

▸ TEXT N — [title / genre: article / advertisement / blog / email / infographic / literary fragment]
[Full text in English, 200-400 words.]

QUESTIONS:
1. [Reading for gist / specific info / inference / vocab / author intent]
   A) ____
   B) ____
   C) ____
   D) ____
   E) ____

(Distribuir ${nItems} preguntas en ${Math.ceil(nItems / 5)} textos.)

═══ ANSWER KEY ═══
═══ TABLE OF SPECIFICATIONS ═══
N° | Text | Skill (gist/specific/inference/vocab/intent) | CEFR (B1/B2) | OA Mineduc
═══ EXPLANATION FOR EACH KEY ═══`;
  }

  if (compKey === 'historia') {
    return `${intro}Genera una ${tipoLabel} de HISTORIA Y CS SOCIALES (PAES) con ${nItems} ítems:
${ctx}

ESTRUCTURA OBLIGATORIA:
════════════════════════════════════════════
${tipoLabel} — HISTORIA Y CS SOCIALES
${datos.colegio ? 'Institución: ' + datos.colegio : 'Institución: _____________'}
${hasOAs ? 'OA Mineduc evaluados: [citar códigos]' : 'OA / AE: _____________'}
Nombre: _________________  Curso: ___  Fecha: ___
Puntaje total: ___  Tiempo sugerido: ___ min
════════════════════════════════════════════

INSTRUCCIONES
- ${nItems} preguntas con 5 alternativas (A-E).
- Cada fuente va seguida de 2-5 preguntas.
- No se descuenta puntaje.

REQUERIMIENTOS DE DISEÑO:
1. Incluye fuentes primarias (documento de época, mapa, gráfico estadístico, infografía) y secundarias (texto historiográfico).
2. Cubre los ejes: ${comp.ejes.join(', ')}.
3. Habilidades: análisis de fuentes, multicausalidad, contextualización, perspectivas históricas, pensamiento crítico.
4. Distractores reflejan interpretaciones parciales o anacronismos.

FORMATO POR FUENTE:

▸ FUENTE N (tipo: primaria/secundaria, año, autor o referencia)
[Cita textual o descripción detallada de mapa/gráfico — entre 100 y 300 palabras según complejidad.]

Preguntas:
N. [Enunciado que use la fuente como evidencia]
   A) ____  B) ____  C) ____  D) ____  E) ____

═══ CLAVE DE RESPUESTAS ═══
═══ TABLA DE ESPECIFICACIONES ═══
N° | Fuente | Eje PAES | Habilidad histórica | Período / Tema | OA
═══ JUSTIFICACIÓN HISTORIOGRÁFICA POR ÍTEM ═══`;
  }

  // Fallback: prompt PAES genérico
  return `${intro}Genera una ${tipoLabel} (formato PAES general) con ${nItems} ítems sobre:
${ctx}

ESTRUCTURA: 5 alternativas (A-E), tabla de especificaciones, clave, justificación.`;
}

// ── Genera las partes de una prueba según tipos seleccionados ──
function getPartesPrueba(datos) {
  const tipos = Array.isArray(datos.tiposPreguntas)
    ? datos.tiposPreguntas
    : (datos.tiposPreguntas ? datos.tiposPreguntas.split(',').map(t => t.trim()) : []);

  if (!tipos.length) {
    return `PARTE I — SELECCIÓN MÚLTIPLE (4 alternativas, señala la correcta con *)
PARTE II — VERDADERO / FALSO (justifica si es falso)
PARTE III — DESARROLLO (2 preguntas de análisis o aplicación)`;
  }

  let partes = '';
  let num = 1;
  if (tipos.includes('alternativas'))    partes += `PARTE ${num++} — SELECCIÓN MÚLTIPLE (4 alternativas, señala la correcta)\n`;
  if (tipos.includes('vf'))              partes += `PARTE ${num++} — VERDADERO / FALSO (justifica si es falso)\n`;
  if (tipos.includes('emparejamiento'))  partes += `PARTE ${num++} — TÉRMINOS PAREADOS / EMPAREJAMIENTO\n`;
  if (tipos.includes('corta'))           partes += `PARTE ${num++} — RESPUESTA CORTA (1-2 líneas por ítem)\n`;
  if (tipos.includes('casos'))           partes += `PARTE ${num++} — ANÁLISIS DE CASO / SITUACIÓN PROBLEMA\n`;
  if (tipos.includes('desarrollo'))      partes += `PARTE ${num++} — DESARROLLO (respuesta extensa, evidencia aprendizaje profundo)\n`;
  return partes.trim();
}

// ── Handler principal ────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Método no permitido' });

  // Pool de API keys: aceptamos GEMINI_API_KEY como key única o lista separada
  // por coma. También leemos GEMINI_API_KEYS (plural) si existe.
  const _rawKeys = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '').trim();
  const apiKeys = _rawKeys
    .split(',')
    .map(k => k.trim())
    .filter(k => k.length > 10); // descarta entradas inválidas/vacías
  if (apiKeys.length === 0) {
    return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en Vercel' });
  }
  // Mezclar el orden para distribuir carga entre todas las keys disponibles
  const apiKeysShuffled = apiKeys
    .map(k => ({ k, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(x => x.k);

  const { tipo, datos } = req.body || {};
  if (!tipo) return res.status(400).json({ error: 'Parámetro tipo requerido' });

  // tipo === 'raw' permite al cliente enviar un prompt ya construido (para flujos
  // donde el contexto pedagógico se arma en el frontend). NUNCA exponer la API key.
  let prompt;
  if (tipo === 'raw' && datos && typeof datos.prompt === 'string' && datos.prompt.length > 0) {
    prompt = datos.prompt;
  } else {
    prompt = buildPrompt(tipo, datos || {});
  }

  // Config dinámica según tipo:
  // - refinar: doc completo modificado → más tokens, menor temperatura
  // - PAES: estímulos largos + tabla de especificaciones → más tokens
  // - raw: el cliente puede pedir maxTokens custom
  const isRefinar = tipo === 'refinar';
  const isPAES    = (datos || {}).formato === 'paes';
  const isRaw     = tipo === 'raw';
  const rawMax    = (isRaw && datos && Number.isInteger(datos.maxTokens)) ? Math.min(datos.maxTokens, 65536) : null;
  const rawTemp   = (isRaw && datos && typeof datos.temperature === 'number') ? datos.temperature : null;
  const genCfg = isRefinar
    ? { maxOutputTokens: 8192, temperature: 0.45, topP: 0.85 }
    : isPAES
      ? { maxOutputTokens: 8192, temperature: 0.65, topP: 0.9 }
      : isRaw
        ? { maxOutputTokens: rawMax || 8192, temperature: rawTemp != null ? rawTemp : 0.7, topP: 0.9 }
        : { maxOutputTokens: 32768, temperature: 0.72, topP: 0.9 };
  // maxOutputTokens es un TECHO, no una meta: el modelo termina y se detiene solo.
  // Lo dejamos alto para que ningún documento se trunque. Y apagamos el "pensamiento"
  // (thinkingBudget 0) para que todo el presupuesto vaya al documento, no al razonamiento.
  genCfg.thinkingConfig = { thinkingBudget: 0 };

  // Modelo a usar (el cliente puede sugerir, pero validamos contra allowlist)
  const modeloPedido = (datos && datos.modelo) ? String(datos.modelo) : '';
  const modeloUsado  = GEMINI_MODELOS_PERMITIDOS.indexOf(modeloPedido) !== -1
                       ? modeloPedido
                       : GEMINI_MODEL_DEFAULT;

  // Modelos a intentar: el pedido y, si es Flash, un respaldo más ligero
  const modelosIntento = (modeloUsado === 'gemini-2.5-flash')
    ? ['gemini-2.5-flash', 'gemini-2.5-flash-lite']
    : [modeloUsado];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function llamarGemini(apiKey, modelo) {
    const r = await fetch(`${_geminiUrl(modelo)}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: genCfg,
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]
      })
    });
    return r.json();
  }

  let ultimoError = 'Sin keys disponibles';
  for (let k = 0; k < apiKeysShuffled.length; k++) {
    const apiKey = apiKeysShuffled[k];
    let siguienteKey = false;
    for (let m = 0; m < modelosIntento.length && !siguienteKey; m++) {
      const modelo = modelosIntento[m];
      for (let intento = 0; intento < 3; intento++) {
        let data;
        try { data = await llamarGemini(apiKey, modelo); }
        catch (e) { ultimoError = e.message; if (intento < 2) { await sleep(1200); continue; } break; }

        if (data.error) {
          const errMsg = data.error.message || JSON.stringify(data.error);
          ultimoError = errMsg;
          const isQuota    = /RESOURCE_EXHAUSTED|quota|rate limit/i.test(errMsg);
          const isInvalid  = /API_KEY_INVALID|API key not valid|PERMISSION_DENIED/i.test(errMsg);
          const isOverload = /UNAVAILABLE|overloaded|high demand|try again later|temporarily|\b503\b/i.test(errMsg);
          if (isInvalid || isQuota) { siguienteKey = true; break; }                 // cambiar de key
          if (isOverload) { if (intento < 2) { await sleep(1500); continue; } break; } // reintentar / cambiar modelo
          return res.status(502).json({ error: errMsg });                            // error no recuperable
        }

        const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!texto) {
          const finishReason = data.candidates?.[0]?.finishReason;
          if (finishReason === 'SAFETY') return res.status(502).json({ error: 'La IA bloqueó la respuesta por filtros de seguridad. Reformula el contenido.' });
          if (intento < 2) { await sleep(1000); continue; }
          break;
        }
        return res.status(200).json({ resultado: texto, modelo: modelo });
      }
    }
  }
  return res.status(502).json({
    error: 'La IA está saturada en este momento (alta demanda). Espera unos segundos y reintenta. Detalle: ' + ultimoError
  });
}
