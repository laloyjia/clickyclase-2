/**
 * functions/index.js — Click&Clase
 * Cloud Function que actúa como proxy seguro a Google Gemini API.
 *
 * Secret esperado: GEMINI_API_KEY (puede contener varias keys separadas por coma)
 *
 * Despliegue:
 *   firebase functions:secrets:set GEMINI_API_KEY
 *   firebase deploy --only functions
 *
 * Endpoint final (vía rewrite en firebase.json):
 *   https://clickyclase.cl/api/ia-asistente
 */

const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

// Secret manejado por Google Secret Manager. NUNCA llega al cliente.
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

const GEMINI_MODEL_DEFAULT = 'gemini-2.5-flash';
const GEMINI_MODELOS_PERMITIDOS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro'
];
function _geminiUrl(modelo) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`;
}

// ── Sanitizador anti-degeneración ────────────────────────────
// Los LLMs a veces entran en bucle generando caracteres repetidos
// (underscores, guiones, asteriscos, etc.) sin parar. Esto limita
// cualquier secuencia >80 a un máximo razonable de 60 caracteres.
function _sanitizarOutput(texto) {
  if (typeof texto !== 'string') return texto;
  // Underscores: para líneas de escritura, max 60
  texto = texto.replace(/_{80,}/g, '_'.repeat(60));
  // Guiones: max 60
  texto = texto.replace(/-{80,}/g, '-'.repeat(60));
  // Asteriscos / puntos / igual / tilde
  texto = texto.replace(/\*{80,}/g, '*'.repeat(40));
  texto = texto.replace(/\.{80,}/g, '.'.repeat(40));
  texto = texto.replace(/={80,}/g, '='.repeat(40));
  texto = texto.replace(/~{80,}/g, '~'.repeat(40));
  // Espacios consecutivos
  texto = texto.replace(/ {200,}/g, '   ');
  // <br> consecutivos (la IA a veces los acumula)
  texto = texto.replace(/(<br\s*\/?>\s*){10,}/gi, '<br><br>');
  // Líneas de div vacías repetidas
  texto = texto.replace(/(<div[^>]*>\s*<\/div>\s*){5,}/gi, '<div></div>');
  return texto;
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
const BLOOM = {
  recordar:    'Nivel RECORDAR: preguntas de conocimiento factual, definiciones, identificación, reconocimiento.',
  comprender:  'Nivel COMPRENDER: preguntas que exigen explicar, describir, interpretar, resumir, clasificar.',
  aplicar:     'Nivel APLICAR: ejercicios que requieren usar conceptos en situaciones nuevas, resolver problemas.',
  analizar:    'Nivel ANALIZAR: ítems que piden descomponer, comparar, contrastar, diferenciar, examinar causas.',
  evaluar:     'Nivel EVALUAR: preguntas de juicio, crítica, justificación, defensa de posturas.',
  crear:       'Nivel CREAR: actividades de diseño, producción, propuesta, elaboración de algo nuevo.'
};

// ── Tabla de niveles de Marzano (Nueva Taxonomía 2001) ──────
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
    descripcion: 'Mide habilidades de localizar, interpretar, relacionar y reflexionar sobre textos.',
    ejes: ['Localizar información', 'Interpretar y relacionar', 'Reflexionar sobre el texto'],
    formato: 'Estímulos textuales variados. Cada estímulo tiene entre 4 y 8 preguntas asociadas. 5 alternativas (A-E) por pregunta.'
  },
  m1: {
    nombre: 'Matemática M1 (PAES)',
    descripcion: 'Eje común obligatorio. Evalúa habilidades de Números, Álgebra y Funciones, Geometría, y Probabilidad y Estadística (7° Básico–2° Medio).',
    ejes: ['Números', 'Álgebra y Funciones', 'Geometría', 'Probabilidad y Estadística'],
    formato: 'Preguntas con contextos cotidianos o disciplinares. Tablas, gráficos, figuras. 5 alternativas (A-E). Habilidades: resolver problemas, modelar, representar, argumentar.'
  },
  m2: {
    nombre: 'Matemática M2 (PAES Electivo)',
    descripcion: 'Eje electivo (3° y 4° Medio).',
    ejes: ['Números complejos', 'Álgebra y funciones (avanzado)', 'Geometría', 'Probabilidad y Estadística inferencial'],
    formato: 'Contextos disciplinares más abstractos. 5 alternativas (A-E).'
  },
  ciencias: {
    nombre: 'Ciencias PAES (Biología, Física, Química)',
    descripcion: 'Módulo común obligatorio. OAs comunes de ciencias 1°-2° Medio.',
    ejes: ['Habilidades de pensamiento científico', 'Biología', 'Física', 'Química'],
    formato: 'Estímulos: experimentos, datos, gráficos, esquemas. 5 alternativas (A-E).'
  },
  historia: {
    nombre: 'Historia y Ciencias Sociales PAES',
    descripcion: 'Módulo electivo.',
    ejes: ['Pensamiento histórico', 'Pensamiento geográfico', 'Formación ciudadana', 'Análisis de fuentes'],
    formato: 'Fuentes primarias y secundarias. 5 alternativas (A-E).'
  },
  ingles: {
    nombre: 'Inglés — Reading Comprehension',
    descripcion: 'Comprensión lectora en inglés, formato tipo PAES, B1-B2 MCER.',
    ejes: ['Reading for gist', 'Specific information', 'Inference', 'Author intent', 'Vocabulary in context'],
    formato: 'Textos en inglés 200-400 palabras, 4-6 preguntas en inglés con 5 alternativas A-E.'
  }
};

// ── Constructor de contexto pedagógico ──────────────────────
function buildContext(datos) {
  const TAX_TABLE = datos.taxonomiaSistema === 'marzano' ? MARZANO : BLOOM;
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

  let oaBlock = '';
  const oasSel = datos.oas_seleccionados;
  const oaManual = datos.oa;
  if (oasSel && oasSel.length > 0) {
    oaBlock = '\n\n─── OBJETIVOS DE APRENDIZAJE (Programa Mineduc) ───\n' +
      oasSel.map(o => `• ${o.codigo}: ${o.descripcion}`).join('\n') +
      '\n\nINSTRUCCIÓN CURRICULAR: cita los códigos OA en el objetivo y en la rúbrica/tabla de especificaciones.';
  } else if (oaManual) {
    oaBlock = `\n\nObjetivo de Aprendizaje / AE: ${oaManual}\n` +
      'INSTRUCCIÓN: cita el código OA en el objetivo y en los indicadores de logro.';
  }

  const neeTips = (datos.nee && datos.nee.length)
    ? '\n\n─── ATENCIÓN A LA DIVERSIDAD (NEE diagnosticadas) ───\n' +
      'Incorporar como sección final del documento:\n' +
      datos.nee.map(k => '• ' + (NEE_TIPS[k] || k)).join('\n')
    : '';

  return lines + oaBlock + neeTips;
}

function buildPrompt(tipo, datos) {
  const hasOAs = (datos.oas_seleccionados && datos.oas_seleccionados.length > 0) || datos.oa;
  const formatoPAES = datos.formato === 'paes';
  const aplicaPAES  = ['prueba', 'evaluacion', 'guia'].indexOf(tipo) !== -1;
  if (formatoPAES && aplicaPAES) return buildPromptPAES(tipo, datos);

  const intro = `Eres un experto pedagógico en educación chilena (Mineduc).
Conoces el currículum nacional: Educación Básica 1°-8°, Plan Común 1°-4° Medio y EMTP.
Redactas en español formal chileno, de forma práctica y lista para usar en aula.
${hasOAs ? 'FUNDAMENTAL: el documento debe estar ALINEADO CURRICULAMENTE con los OA indicados — citar sus códigos en los objetivos y la evaluación.' : ''}
Responde SOLO con el documento solicitado, sin saludos ni comentarios.
Usa secciones en MAYÚSCULAS, bullets (•) y numeración donde corresponda.\n\n`;

  const ctx = buildContext(datos);
  const prompts = {
    planificacion: `${intro}Genera una PLANIFICACIÓN DE CLASE completa con estos datos:\n${ctx}\n\nESTRUCTURA:\nPLANIFICACIÓN DE CLASE\nInstitución: ${datos.colegio || '___'}\nAsignatura: ${datos.asignatura || '___'} | Nivel: ${datos.nivel || '___'} | Duración: ${datos.horas || '___'}\n${hasOAs ? 'OA(s): [citar códigos]' : 'OA / AE: ___'}\n\nOBJETIVO DE LA CLASE\nHABILIDADES A DESARROLLAR\nACTITUDES Y VALORES\n\nINICIO (___min): activación, motivación, conexión con OA.\nDESARROLLO (___min): al menos 3 actividades secuenciadas con recursos.\nCIERRE (___min): síntesis y evaluación formativa.\n\nINDICADORES DE LOGRO verificables.\n${datos.nee && datos.nee.length ? 'ATENCIÓN A LA DIVERSIDAD (NEE)' : ''}`,
    guia: `${intro}Genera una GUÍA DE APRENDIZAJE para estudiantes chilenos:\n${ctx}\n${datos.tiposPreguntas && datos.tiposPreguntas.length ? 'Actividades: ' + (Array.isArray(datos.tiposPreguntas) ? datos.tiposPreguntas.join(', ') : datos.tiposPreguntas) : ''}\n${datos.nPreguntas ? 'Total: ' + datos.nPreguntas + ' ítems' : ''}\n\nGUÍA DE APRENDIZAJE\nInstitución: ${datos.colegio || '___'} | Asig: ${datos.asignatura || '___'} | Nivel: ${datos.nivel || '___'}\n\nOBJETIVO DE APRENDIZAJE\nINTRODUCCIÓN AL TEMA\nCONCEPTOS CLAVE (definiciones + ejemplos)\nACTIVIDADES DE DESARROLLO\nPREGUNTAS DE REFLEXIÓN (nivel ${datos.taxonomia || 'analizar'})\nAUTOEVALUACIÓN`,
    prueba: `${intro}Genera un INSTRUMENTO DE EVALUACIÓN (prueba) chileno:\n${ctx}\n${datos.tiposPreguntas && datos.tiposPreguntas.length ? 'Partes: ' + (Array.isArray(datos.tiposPreguntas) ? datos.tiposPreguntas.join(', ') : datos.tiposPreguntas) : 'Incluye: Selección Múltiple, V/F y Desarrollo.'}\n${datos.nPreguntas ? 'TOTAL ÍTEMS: ' + datos.nPreguntas : 'Mínimo 15 ítems.'}\n\nINSTRUCCIONES GENERALES\n${getPartesPrueba(datos)}\nPAUTA DE CORRECCIÓN\nTABLA DE ESPECIFICACIONES: OA | Contenido | Tipo | N° | Habilidad cognitiva | Puntaje`,
    apunte: `${intro}Genera un APUNTE DE CONTENIDO chileno:\n${ctx}\n${datos.nPreguntas ? 'Incluye ' + datos.nPreguntas + ' preguntas de comprensión al final.' : ''}\n\nAPUNTE — ${datos.asignatura || '___'}\nNivel: ${datos.nivel || '___'} | Tema: ${datos.tema || '___'}\n\nINTRODUCCIÓN\nCONTENIDO PRINCIPAL (conceptos, ejemplos, tablas)\nRESUMEN / IDEAS CLAVE\nGLOSARIO TÉCNICO\nPREGUNTAS DE COMPRENSIÓN (${datos.nPreguntas || '5-8'} preg, nivel ${datos.taxonomia || 'aplicar'})`,
    revision: `${intro}Realiza una REVISIÓN PEDAGÓGICA:\n${ctx}\n${datos.texto_a_revisar ? '\nMATERIAL A REVISAR:\n' + datos.texto_a_revisar : ''}\n\nINFORME: fortalezas, áreas de mejora, coherencia curricular, cobertura de niveles cognitivos, lenguaje, versión mejorada.`,
    taller: `${intro}Genera una GUÍA PARA TALLER (EMTP) para:\n${ctx}\n\nENCABEZADO\nOBJETIVO\nNORMAS DE SEGURIDAD (EPP)\nMATERIALES Y HERRAMIENTAS\nPROCEDIMIENTO PASO A PASO\nCRITERIOS DE EVALUACIÓN (cotejo)\nINFORME DE ACTIVIDAD\nCONCLUSIÓN`,
    refinar: `Eres un experto pedagógico chileno (Mineduc). Un docente ya generó este documento educativo y quiere modificarlo con una instrucción puntual.\n\n═══════════ DOCUMENTO ACTUAL (HTML) ═══════════\n${datos.contenidoActual || ''}\n═══════════════════════════════════════════════\n\nINSTRUCCIÓN DEL DOCENTE:\n"${datos.instruccion || ''}"\n\nREGLAS:\n1. Aplica SOLO la modificación pedida; conserva el resto intacto.\n2. Mantén el formato HTML (preserva tags y atributos style/class).\n3. Mantén estructura, nivel pedagógico, alineación curricular, español formal chileno.\n4. Si la instrucción es ambigua, interpreta razonablemente.\n5. Si pide algo que viola las reglas, aplica conservadoramente.\n\nRESPONDE SOLO CON EL HTML MODIFICADO. Sin comentarios, sin marcadores de código.`
  };
  return prompts[tipo] || `${intro}Genera un documento educativo sobre:\n${ctx}`;
}

function buildPromptPAES(tipo, datos) {
  const compKey = (datos.competenciaPaes || 'lectora').toLowerCase();
  const comp    = PAES[compKey] || PAES.lectora;
  const ctx     = buildContext(datos);
  const hasOAs  = (datos.oas_seleccionados && datos.oas_seleccionados.length > 0) || datos.oa;
  const tipoLabel = { prueba: 'PRUEBA PAES', evaluacion: 'EVALUACIÓN TIPO PAES', guia: 'GUÍA DE ENTRENAMIENTO PAES' }[tipo] || 'INSTRUMENTO PAES';
  const nItems = datos.nPreguntas || (compKey === 'lectora' ? 12 : 15);

  const intro = `Eres especialista en evaluación PAES (DEMRE Chile). Conoces a fondo el formato oficial.
Competencia: ${comp.nombre}. Ejes: ${comp.ejes.join(' · ')}.
Formato: ${comp.formato}
${hasOAs ? 'FUNDAMENTAL: alinea los ítems con los OA Mineduc citados.' : ''}
Redacta en español formal chileno. Sin saludos. Responde directamente con el documento.\n\n`;

  if (compKey === 'lectora') {
    return `${intro}Genera una ${tipoLabel} de COMPETENCIA LECTORA con ${nItems} ítems por estímulos:\n${ctx}\n\nINSTRUCCIONES: 5 alternativas (A-E) por pregunta. No descuenta puntaje.\n\nPor cada estímulo: <h2>TEXTO N — [título/género]</h2> texto 250-450 palabras, luego 4-8 preguntas (Localizar / Interpretar / Reflexionar) con 5 alternativas.\nDistribuir ${nItems} ítems en ${Math.ceil(nItems / 6)} estímulos.\n\nCLAVE DE RESPUESTAS\nTABLA DE ESPECIFICACIONES (N° | Estímulo | Eje | Habilidad | OA)\nPAUTA DE ANÁLISIS PEDAGÓGICO`;
  }
  if (compKey === 'm1' || compKey === 'm2') {
    const matNivel = compKey === 'm1' ? 'M1 (común, 7°B-2°M)' : 'M2 (electivo, 3°-4°M)';
    return `${intro}Genera una ${tipoLabel} de MATEMÁTICA ${matNivel} con ${nItems} ítems:\n${ctx}\n\nINSTRUCCIONES: 5 alternativas (A-E). Calculadora científica permitida. No descuenta puntaje.\n\nDistribuye los ítems entre: ${comp.ejes.join(', ')}.\nHabilidades PAES: resolver problemas (40%), modelar (25%), representar (20%), argumentar (15%).\nUn tercio con estímulo concreto (tabla, gráfico, situación).\nDificultad progresiva. Distractores plausibles.\n\nCLAVE\nTABLA DE ESPECIFICACIONES (N° | Eje | Habilidad | Dificultad | OA)\nRESOLUCIÓN PASO A PASO`;
  }
  if (compKey === 'ciencias') {
    return `${intro}Genera una ${tipoLabel} de CIENCIAS PAES con ${nItems} ítems:\n${ctx}\n\nINSTRUCCIONES: 5 alternativas (A-E). No descuenta puntaje.\nAl menos 2 estímulos largos (experimento, tabla, gráfico, esquema) + 3-5 preguntas cada uno.\nEjes: ${comp.ejes.join(', ')}.\nHabilidades: observar, formular hipótesis, planificar experimentos, analizar evidencia.\n\nCLAVE\nTABLA DE ESPECIFICACIONES (N° | Disciplina | Eje | Habilidad | OA)\nEXPLICACIÓN CIENTÍFICA POR ÍTEM`;
  }
  if (compKey === 'ingles') {
    return `${intro}Generate a ${tipoLabel} (English Reading Comprehension, PAES-style) with ${nItems} items:\n${ctx}\n\nINSTRUCTIONS: Texts and questions IN ENGLISH (B1-B2 CEFR). Each text 200-400 words. 5 alternatives (A-E) in English per question.\nPer text: <h2>TEXT N — [title/genre]</h2> + 4-6 questions (gist / specific info / inference / vocab / author intent).\nDistribute ${nItems} questions across ${Math.ceil(nItems / 5)} texts.\n\nANSWER KEY\nTABLE OF SPECIFICATIONS (N° | Text | Skill | CEFR | OA)\nEXPLANATION PER KEY`;
  }
  if (compKey === 'historia') {
    return `${intro}Genera una ${tipoLabel} de HISTORIA Y CS SOCIALES (PAES) con ${nItems} ítems:\n${ctx}\n\nINSTRUCCIONES: 5 alternativas (A-E). Cada fuente con 2-5 preguntas. No descuenta puntaje.\nFuentes primarias y secundarias. Ejes: ${comp.ejes.join(', ')}.\nHabilidades: análisis de fuentes, multicausalidad, contextualización, perspectivas, pensamiento crítico.\nPor fuente: <h2>FUENTE N — [tipo/año/autor]</h2> cita o descripción 100-300 palabras + preguntas.\n\nCLAVE\nTABLA DE ESPECIFICACIONES (N° | Fuente | Eje | Habilidad | Período | OA)\nJUSTIFICACIÓN HISTORIOGRÁFICA POR ÍTEM`;
  }
  return `${intro}Genera una ${tipoLabel} (formato PAES) con ${nItems} ítems sobre:\n${ctx}\n\nESTRUCTURA: 5 alternativas (A-E), tabla de especificaciones, clave, justificación.`;
}

function getPartesPrueba(datos) {
  const tipos = Array.isArray(datos.tiposPreguntas)
    ? datos.tiposPreguntas
    : (datos.tiposPreguntas ? datos.tiposPreguntas.split(',').map(t => t.trim()) : []);
  if (!tipos.length) {
    return `PARTE I — SELECCIÓN MÚLTIPLE\nPARTE II — VERDADERO / FALSO\nPARTE III — DESARROLLO`;
  }
  let partes = '';
  let num = 1;
  if (tipos.includes('alternativas'))    partes += `PARTE ${num++} — SELECCIÓN MÚLTIPLE\n`;
  if (tipos.includes('vf'))              partes += `PARTE ${num++} — VERDADERO / FALSO\n`;
  if (tipos.includes('emparejamiento'))  partes += `PARTE ${num++} — EMPAREJAMIENTO\n`;
  if (tipos.includes('corta'))           partes += `PARTE ${num++} — RESPUESTA CORTA\n`;
  if (tipos.includes('casos'))           partes += `PARTE ${num++} — ANÁLISIS DE CASO\n`;
  if (tipos.includes('desarrollo'))      partes += `PARTE ${num++} — DESARROLLO\n`;
  return partes.trim();
}

// ─────────────────────────────────────────────────────────────
//  Cloud Function: iaAsistente
//  Endpoint: /iaAsistente (Functions URL) o /api/ia-asistente
//  (vía rewrite en firebase.json)
// ─────────────────────────────────────────────────────────────
exports.iaAsistente = onRequest(
  {
    region: 'us-central1',
    secrets: [GEMINI_API_KEY],
    timeoutSeconds: 540,    // 9 minutos — sobrado para Gemini
    memory: '512MiB',
    cors: true,
    maxInstances: 10,
    invoker: 'public'       // permite llamadas desde el navegador
  },
  async (req, res) => {
    // CORS extra (Firebase ya pone cabeceras pero reforzamos)
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(204).send('');
    if (req.method !== 'POST')   return res.status(405).json({ error: 'Método no permitido' });

    // Pool de API keys
    const _rawKeys = (GEMINI_API_KEY.value() || '').trim();
    const apiKeys = _rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 10);
    if (apiKeys.length === 0) {
      return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en Cloud Functions' });
    }
    const apiKeysShuffled = apiKeys
      .map(k => ({ k, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(x => x.k);

    const { tipo, datos } = req.body || {};
    if (!tipo) return res.status(400).json({ error: 'Parámetro tipo requerido' });

    let prompt;
    if (tipo === 'raw' && datos && typeof datos.prompt === 'string' && datos.prompt.length > 0) {
      prompt = datos.prompt;
    } else {
      prompt = buildPrompt(tipo, datos || {});
    }

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
          : { maxOutputTokens: 3072, temperature: 0.72, topP: 0.9 };

    const modeloPedido = (datos && datos.modelo) ? String(datos.modelo) : '';
    const modeloUsado  = GEMINI_MODELOS_PERMITIDOS.indexOf(modeloPedido) !== -1
                         ? modeloPedido
                         : GEMINI_MODEL_DEFAULT;

    let ultimoError = 'Sin keys disponibles';
    for (let intento = 0; intento < apiKeysShuffled.length; intento++) {
      const apiKey = apiKeysShuffled[intento];
      try {
        const r = await fetch(`${_geminiUrl(modeloUsado)}?key=${apiKey}`, {
          method:  'POST',
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
        const data = await r.json();
        if (data.error) {
          const errMsg = data.error.message || JSON.stringify(data.error);
          const isQuota   = /RESOURCE_EXHAUSTED|quota|rate limit/i.test(errMsg);
          const isInvalid = /API_KEY_INVALID|API key not valid|PERMISSION_DENIED/i.test(errMsg);
          if ((isQuota || isInvalid) && intento < apiKeysShuffled.length - 1) {
            ultimoError = errMsg;
            continue;
          }
          return res.status(502).json({
            error: errMsg + (apiKeysShuffled.length > 1 ? ` (probadas ${intento + 1}/${apiKeysShuffled.length} keys)` : '')
          });
        }
        const textoRaw = data && data.candidates && data.candidates[0]
          && data.candidates[0].content && data.candidates[0].content.parts
          && data.candidates[0].content.parts[0]
          && data.candidates[0].content.parts[0].text || '';
        if (!textoRaw) {
          const finishReason = data && data.candidates && data.candidates[0] && data.candidates[0].finishReason;
          return res.status(502).json({
            error: finishReason === 'SAFETY'
              ? 'La IA bloqueó la respuesta por filtros de seguridad. Reformula el contenido.'
              : 'La IA no devolvió respuesta'
          });
        }
        // Sanitizar para evitar loops de degeneración (cientos de "____" seguidos)
        const texto    = _sanitizarOutput(textoRaw);
        const tamPrev  = textoRaw.length;
        const tamPost  = texto.length;
        const recortado = tamPrev - tamPost;
        return res.status(200).json({
          resultado: texto,
          keysProbadas: intento + 1,
          ...(recortado > 100 ? { _saneado: { antes: tamPrev, despues: tamPost, recortados: recortado } } : {})
        });
      } catch (e) {
        ultimoError = e.message;
        if (intento < apiKeysShuffled.length - 1) continue;
        return res.status(500).json({ error: 'Error conectando con la IA: ' + e.message });
      }
    }
    return res.status(502).json({
      error: 'Todas las API keys del pool fallaron. Último error: ' + ultimoError
    });
  }
);
