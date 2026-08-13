/**
 * functions/index.js — Click&Clase
 * Cloud Function que actúa como proxy seguro a Google Gemini API.
 *
 * Fuente de API keys y modelo por defecto:
 *   Firestore → sistema/gemini → { keys: [...], modelo: '...' }
 *   Las gestiona el admin desde admin.html → sección "Configuración IA".
 *
 * Despliegue:
 *   firebase deploy --only functions
 *
 * Endpoint final (vía rewrite en firebase.json):
 *   https://clickyclase.cl/api/ia-asistente
 */

const { onRequest }    = require('firebase-functions/v2/https');
const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore }  = require('firebase-admin/firestore');
const { getAuth }       = require('firebase-admin/auth');

// Inicializar Firebase Admin (usa credenciales de la propia function)
try { initializeApp(); } catch (_) { /* ya inicializado */ }
const _db = getFirestore();

// Cache en memoria de la config IA (se refresca cada 5 min)
let _cachedIaConfig = null;
let _cachedAt = 0;
const _CACHE_TTL_MS = 30 * 1000; // 30s — cambios de modelo se reflejan casi al instante

async function _cargarConfigIA() {
  const ahora = Date.now();
  if (_cachedIaConfig && (ahora - _cachedAt) < _CACHE_TTL_MS) return _cachedIaConfig;
  const snap = await _db.collection('sistema').doc('gemini').get();
  const data = snap.exists ? (snap.data() || {}) : {};
  _cachedIaConfig = {
    keys:   Array.isArray(data.keys) ? data.keys.filter(k => typeof k === 'string' && k.length > 10) : [],
    modelo: (typeof data.modelo === 'string' && data.modelo.length > 3) ? data.modelo : 'gemini-2.5-flash'
  };
  _cachedAt = ahora;
  return _cachedIaConfig;
}

const GEMINI_MODEL_DEFAULT = 'gemini-flash-latest';
const GEMINI_MODELOS_PERMITIDOS = [
  // Recomendados evergreen (siempre apuntan al mas nuevo)
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-pro-latest',
  // Serie 3.x (2026)
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.1-flash-lite-preview',
  'gemini-3.1-pro-preview',
  'gemini-3-pro-preview',
  'gemini-3-flash-preview',
  // Serie 2.5 (2025)
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash-lite-preview-06-17',
  'gemini-2.5-pro',
  // Serie 2.0 (fallback estable)
  'gemini-2.0-flash',
  'gemini-2.0-flash-001',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash-lite-001'
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
    timeoutSeconds: 540,    // 9 minutos — sobrado para Gemini
    memory: '1GiB',          // subido de 512MiB para prompts grandes (>40 preguntas)
    cors: true,
    minInstances: 0,        // sin instancia caliente (costo cero cuando no se usa)
    maxInstances: 20,       // techo alto para picos de generación simultánea
    invoker: 'public',      // permite llamadas desde el navegador
    // Service account explícito: usar la Default Compute Service Account
    // en vez de la @appspot legacy (que no existe en proyectos Firebase-only).
    // Esta cuenta ya tiene los permisos necesarios (Cloud Build, Artifact
    // Registry, Registros) y es la recomendación oficial de Firebase para
    // proyectos sin App Engine.
    serviceAccount: '537489844804-compute@developer.gserviceaccount.com'
  },
  async (req, res) => {
    // Try/catch top-level: garantizamos que SIEMPRE se devuelva JSON
    // aunque haya un bug en el código. Si no, el cliente recibe HTML
    // y muestra "Respuesta inválida del servidor".
    try {
    // CORS extra (Firebase ya pone cabeceras pero reforzamos)
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(204).send('');
    if (req.method !== 'POST')   return res.status(405).json({ error: 'Método no permitido' });

    // Búsqueda de imágenes (Serper) y descarga server-side. Reutilizan esta
    // función pública para no crear funciones nuevas (evita permiso IAM).
    if (req.body && req.body.accion === 'imgSearch') {
      return await _handleImgSearch(req, res);
    }
    if (req.body && req.body.accion === 'fetchImg') {
      return await _handleFetchImg(req, res);
    }

    // Cargar pool de keys y modelo por defecto desde Firestore (sistema/gemini)
    // El admin las gestiona desde admin.html → sección "Configuración IA".
    const iaCfg = await _cargarConfigIA();
    const apiKeys = iaCfg.keys;
    if (apiKeys.length === 0) {
      return res.status(500).json({
        error: 'No hay API keys configuradas en el pool. El admin debe cargarlas en admin.html → Configuración IA.'
      });
    }
    const apiKeysShuffled = apiKeys
      .map(k => ({ k, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(x => x.k);
    const modeloDefectoAdmin = iaCfg.modelo || GEMINI_MODEL_DEFAULT;

    const { tipo, datos } = req.body || {};
    if (!tipo) return res.status(400).json({ error: 'Parámetro tipo requerido' });

    // ─────────────────────────────────────────────────────────────
    // Enforcement de CUOTA para docentes particulares
    // ─────────────────────────────────────────────────────────────
    // Por defecto, TODAS las llamadas al backend cuentan como una generación,
    // excepto:
    //   - tipo 'chat' (widget conversacional, no produce material entregable)
    //   - datos.consumeQuota === false (opt-out explícito, ej: refinar preview)
    // Si el usuario es particular y ya agotó su cuota → 402 CUOTA_AGOTADA
    let _quotaUidToCharge = null;
    let _quotaUserRef = null;
    try {
      const uidCliente = (datos && typeof datos.uid === 'string') ? datos.uid : '';
      const optOut = (datos && datos.consumeQuota === false);
      const esChat = (tipo === 'chat');
      const cuentaContraCuota = uidCliente && !optOut && !esChat;

      if (cuentaContraCuota) {
        _quotaUserRef = _db.collection('usuarios').doc(uidCliente);
        const uSnap = await _quotaUserRef.get();
        if (uSnap.exists) {
          const uData = uSnap.data() || {};
          if (uData.esParticular === true) {
            const usados = Number(uData.materialesGeneradosIA || 0);
            const cuota  = Number(uData.cuotaMateriales || 2);
            if (usados >= cuota) {
              console.log('[iaAsistente] Cuota agotada uid=' + uidCliente + ' usados=' + usados);
              return res.status(402).json({
                error: 'Prueba agotada',
                errorCode: 'CUOTA_AGOTADA',
                mensaje: 'Ya usaste tus ' + cuota + ' generaciones gratis con IA. Contactanos por WhatsApp para acceder a un plan sin límites.',
                whatsapp: 'https://wa.me/56942532644?text=Hola%2C%20agot%C3%A9%20mi%20prueba%20gratis%20de%20Click%26Clase%20y%20quiero%20info%20de%20planes',
                email: 'soporte.learn0@gmail.com',
                usados: usados,
                cuota: cuota
              });
            }
            // OK, guardo el ref para incrementar tras respuesta exitosa
            _quotaUidToCharge = uidCliente;
          }
        }
      }
    } catch (eqc) {
      console.warn('[iaAsistente] Chequeo cuota falló (permitido):', eqc.message);
      // No bloqueamos por errores del chequeo, seguimos
    }

    let prompt;
    if (tipo === 'raw' && datos && typeof datos.prompt === 'string' && datos.prompt.length > 0) {
      prompt = datos.prompt;
    } else if (tipo === 'chat') {
      // Modo chat conversacional del widget "Preguntá a Click&Clase"
      const mensaje   = (datos && typeof datos.mensaje === 'string') ? datos.mensaje.trim() : '';
      const historial = Array.isArray(datos && datos.historial) ? datos.historial : [];
      if (!mensaje) return res.status(400).json({ error: 'Falta el mensaje para el chat' });
      const systemPrompt = `Sos "Click&Clase", un asistente pedagógico experto en el currículum Mineduc de Chile (Plan Común y Formación Diferenciada Técnico-Profesional).
Ayudás a docentes chilenos a resolver dudas rápidas, sugerir actividades, redactar rúbricas, explicar OAs, dar consejos pedagógicos y proponer estrategias de aula.

Estilo de respuesta:
- Español chileno neutro y cercano ("tú" o "usted" según corresponda, sin excesivos modismos).
- Respuestas concisas y accionables. Máximo 250 palabras salvo que pidan detalle.
- Usá **negrita** para conceptos clave y \`código\` para nombres de OAs (ej: \`OA 05\`).
- Cuando sugieras actividades, listalas numeradas con nombre + descripción breve + tiempo estimado.
- Si te preguntan algo fuera del ámbito docente/pedagógico, redirigí amablemente al tema educativo.
- Nunca inventes OAs o AEs que no existen: si no estás seguro, decilo.`;
      const historialTexto = historial
        .filter(m => m && m.rol && m.texto)
        .map(m => (m.rol === 'user' ? 'DOCENTE: ' : 'ASISTENTE: ') + m.texto)
        .join('\n\n');
      prompt = systemPrompt + '\n\n' +
        (historialTexto ? 'Conversación previa:\n' + historialTexto + '\n\n' : '') +
        'DOCENTE: ' + mensaje + '\n\nASISTENTE:';
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
                         : modeloDefectoAdmin;

    // Modelos con "thinking" activo por defecto añaden 30-60s de latencia antes
    // de empezar a escribir. Firebase Hosting rewrite corta a los 60s, así que
    // desactivamos thinking para todos los modelos flash-like para respuestas rápidas.
    // Los usuarios que quieran razonamiento profundo pueden elegir gemini-pro-latest.
    const modelosConThinking = [
      'gemini-flash-latest',
      'gemini-flash-lite-latest',
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-3.1-flash-lite-preview',
      'gemini-3-flash-preview'
    ];
    if (modelosConThinking.indexOf(modeloUsado) !== -1) {
      genCfg.thinkingConfig = { thinkingBudget: 0 };
    }

    let ultimoError = 'Sin keys disponibles';
    for (let intento = 0; intento < apiKeysShuffled.length; intento++) {
      const apiKey = apiKeysShuffled[intento];
      try {
        // Autenticación uniforme: query string ?key=... para AMBOS formatos.
        // Confirmado por curl directo que las keys AQ. (Google AI Studio 2026)
        // funcionan con query string igual que las AIzaSy... viejas.
        // El header x-goog-api-key da UNAUTHENTICATED con keys AQ.
        const url = `${_geminiUrl(modeloUsado)}?key=${encodeURIComponent(apiKey)}`;
        const headersFetch = { 'Content-Type': 'application/json' };

        const keyType = apiKey.startsWith('AQ.') ? 'AQ.' : 'AIzaSy';
        console.log(`[ia-asistente] Intento ${intento + 1}/${apiKeysShuffled.length} · modelo=${modeloUsado} · keyType=${keyType} · promptLen=${prompt.length}`);

        const r = await fetch(url, {
          method:  'POST',
          headers: headersFetch,
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
        // Log del status HTTP para diagnóstico
        if (!r.ok) {
          console.error(`[ia-asistente] Gemini HTTP ${r.status} ${r.statusText}`);
        }
        const data = await r.json();
        if (data.error) {
          const errMsg  = data.error.message || JSON.stringify(data.error);
          const errCode = data.error.code || r.status;
          const errStat = data.error.status || '';
          // Log del error real para poder diagnosticar
          console.error(`[ia-asistente] Gemini ERROR ${errCode} ${errStat}: ${errMsg}`);
          console.error('[ia-asistente] Full error:', JSON.stringify(data.error).slice(0, 500));

          const isQuota   = /RESOURCE_EXHAUSTED|quota|rate limit/i.test(errMsg);
          const isInvalid = /API_KEY_INVALID|API key not valid|PERMISSION_DENIED/i.test(errMsg);
          if ((isQuota || isInvalid) && intento < apiKeysShuffled.length - 1) {
            ultimoError = errMsg;
            continue;
          }
          return res.status(502).json({
            error: errMsg + (apiKeysShuffled.length > 1 ? ` (probadas ${intento + 1}/${apiKeysShuffled.length} keys)` : ''),
            gemini_code:   errCode,
            gemini_status: errStat
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

        // Incrementar cuota si aplica (particular con consumeQuota:true)
        let cuotaInfo = null;
        if (_quotaUidToCharge && _quotaUserRef) {
          try {
            const FieldValue = require('firebase-admin/firestore').FieldValue;
            await _quotaUserRef.update({
              materialesGeneradosIA: FieldValue.increment(1),
              ultimoMaterialGeneradoEn: new Date().toISOString()
            });
            // Releer para devolver info al frontend
            const snap = await _quotaUserRef.get();
            const d = snap.data() || {};
            cuotaInfo = {
              usados: Number(d.materialesGeneradosIA || 0),
              cuota:  Number(d.cuotaMateriales || 2),
              restantes: Math.max(0, Number(d.cuotaMateriales || 2) - Number(d.materialesGeneradosIA || 0))
            };
            console.log('[iaAsistente] Cuota incrementada uid=' + _quotaUidToCharge + ' usados=' + cuotaInfo.usados);
          } catch (einc) {
            console.error('[iaAsistente] No pude incrementar cuota:', einc.message);
          }
        }

        return res.status(200).json({
          resultado: texto,
          keysProbadas: intento + 1,
          ...(cuotaInfo ? { cuota: cuotaInfo } : {}),
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
    } catch (errTop) {
      console.error('[iaAsistente] Error no manejado:', errTop && errTop.stack);
      try {
        return res.status(500).json({
          error: 'Error interno del servidor: ' + (errTop && errTop.message ? errTop.message : 'desconocido')
        });
      } catch (_) {
        // último recurso si res ya está roto
        return;
      }
    }
  }
);

// ═══════════════════════════════════════════════════════════════
//  syncClaims — mantiene los custom claims sincronizados con el
//  documento usuarios/{uid}. Se dispara en cada creación/edición,
//  sin importar el origen (panel admin, signup o script).
//
//  Claims que escribe:  { rol, orgId, seg, tipo }
//    - rol   ← data.role        (rol principal en formato string)
//    - orgId ← data.orgId | data.liceoSlug | data.liceo
//    - seg   ← data.seg          (segmento/ciclo: pre, b16, mhc, tp…)
//    - tipo  ← data.tipo         (plataforma | colegio | independiente)
//
//  Es idempotente: solo llama a setCustomUserClaims si algo cambió,
//  para no forzar refrescos de token innecesarios.
//
//  IMPORTANTE (compatibilidad): esta función NO modifica el doc de
//  Firestore ni el comportamiento actual. Solo AGREGA claims al token.
//  Las reglas y el frontend siguen funcionando igual hasta que se
//  actualicen para leer los claims (paso siguiente, con fallback).
// ═══════════════════════════════════════════════════════════════
function _claimsDesdeDoc(data) {
  if (!data) return null;
  const orgId = data.orgId || data.liceoSlug || data.liceo || null;
  return {
    rol:   (typeof data.role === 'string' && data.role) ? data.role : null,
    orgId: orgId || null,
    seg:   (typeof data.seg === 'string' && data.seg) ? data.seg : null,
    tipo:  (typeof data.tipo === 'string' && data.tipo) ? data.tipo : null,
  };
}

function _claimsIguales(a, b) {
  if (!a || !b) return false;
  return a.rol === b.rol && a.orgId === b.orgId &&
         a.seg === b.seg && a.tipo === b.tipo;
}

exports.syncClaims = onDocumentWritten('usuarios/{uid}', async (event) => {
  const uid = event.params.uid;
  const after = event.data && event.data.after;
  // Doc borrado → no tocamos los claims (evita dejar sin acceso por error).
  if (!after || !after.exists) return;

  const nuevos = _claimsDesdeDoc(after.data());
  if (!nuevos) return;

  try {
    const userRecord = await getAuth().getUser(uid);
    const actuales = userRecord.customClaims || {};
    const actualesNorm = {
      rol:   actuales.rol   ?? null,
      orgId: actuales.orgId ?? null,
      seg:   actuales.seg   ?? null,
      tipo:  actuales.tipo  ?? null,
    };
    // Anti-degradación: si el doc no trae un valor (null), conservamos el
    // claim válido actual en vez de borrarlo. Así un doc parcial/dañado o un
    // write incompleto NUNCA deja al usuario sin rol/orgId (causa del incidente).
    const objetivo = {
      rol:   nuevos.rol   ?? actualesNorm.rol,
      orgId: nuevos.orgId ?? actualesNorm.orgId,
      seg:   nuevos.seg   ?? actualesNorm.seg,
      tipo:  nuevos.tipo  ?? actualesNorm.tipo,
    };
    if (_claimsIguales(actualesNorm, objetivo)) return; // nada cambió

    // Preservar cualquier otro claim que exista (no lo pisamos).
    const merged = Object.assign({}, actuales, objetivo);
    await getAuth().setCustomUserClaims(uid, merged);
    console.log(`[syncClaims] ${uid} → ${JSON.stringify(objetivo)}`);
  } catch (e) {
    // Doc Firestore sin cuenta Auth (huérfano) u otro error → log y seguir.
    if (e && e.code === 'auth/user-not-found') {
      console.warn(`[syncClaims] uid ${uid} sin cuenta Auth (huérfano). Se ignora.`);
    } else {
      console.error(`[syncClaims] error en ${uid}:`, e && e.message);
    }
  }
});

// ═══════════════════════════════════════════════════════════════
//  _handleImgSearch — búsqueda de imágenes vía Serper.dev (Google Imágenes).
//  Se invoca DENTRO de iaAsistente (misma función pública ya desplegada), con
//  body { accion: 'imgSearch', q: '...' }. Así NO se crea una función nueva
//  (que requeriría permisos IAM extra que el proyecto no otorga).
//  La(s) API key(s) de Serper viven en Firestore sistema/gemini (pool
//  serperKeys[] o serperKey), gestionadas por el admin en Configuración IA.
//  Respuesta: { images: ["https://...", ...] }
// ═══════════════════════════════════════════════════════════════
async function _handleImgSearch(req, res) {
    try {
      const q = (req.body && typeof req.body.q === 'string') ? req.body.q.trim() : '';
      if (!q) return res.status(400).json({ error: 'Parámetro q requerido' });

      // Leer el POOL de keys de Serper desde Firestore (sistema/gemini).
      //   - serperKeys: [ ... ]  (pool nuevo)
      //   - serperKey:  '...'    (una sola, retro-compatible)
      let pool = [];
      try {
        const snap = await _db.collection('sistema').doc('gemini').get();
        const data = snap.exists ? (snap.data() || {}) : {};
        if (Array.isArray(data.serperKeys)) {
          pool = data.serperKeys.filter(k => typeof k === 'string' && k.trim().length > 5).map(k => k.trim());
        }
        if (typeof data.serperKey === 'string' && data.serperKey.trim().length > 5 && pool.indexOf(data.serperKey.trim()) === -1) {
          pool.push(data.serperKey.trim());
        }
      } catch (e) { /* pool vacío */ }

      if (!pool.length) {
        return res.status(200).json({ images: [], _sinKey: true,
          error: 'No hay API keys de Serper configuradas (admin.html → Configuración IA).' });
      }

      // Barajar el pool y probar una key tras otra hasta que una responda OK.
      const keysShuffled = pool.map(k => ({ k, r: Math.random() })).sort((a, b) => a.r - b.r).map(x => x.k);
      let ultimoError = '';
      for (const key of keysShuffled) {
        try {
          const r = await fetch('https://google.serper.dev/images', {
            method: 'POST',
            headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: q, num: 10 })
          });
          if (!r.ok) {
            const txt = await r.text().catch(() => '');
            ultimoError = 'HTTP ' + r.status + ': ' + txt.slice(0, 120);
            // 429 (cuota) o 401/403 (key inválida) → probar siguiente key del pool.
            continue;
          }
          const data = await r.json();
          const images = Array.isArray(data.images)
            ? data.images.map(function (im) { return im && (im.imageUrl || im.link || im.url); }).filter(Boolean)
            : [];
          return res.status(200).json({ images: images });
        } catch (e) {
          ultimoError = (e && e.message) ? e.message : String(e);
          continue;
        }
      }
      return res.status(200).json({ images: [], error: 'Todas las keys de Serper fallaron. Último: ' + ultimoError });
    } catch (errTop) {
      console.error('[imgSearch] error:', errTop && errTop.message);
      try { return res.status(200).json({ images: [], error: 'Error interno: ' + (errTop && errTop.message) }); }
      catch (_) { return; }
    }
}

// ═══════════════════════════════════════════════════════════════
//  _handleFetchImg — descarga una imagen EN EL SERVIDOR y la devuelve como
//  dataURL base64. Evita el bloqueo CORS/Mixed-Content del navegador al
//  descargar imágenes de sitios externos (Serper devuelve URLs de terceros
//  que casi nunca permiten fetch cross-origin). Se invoca desde iaAsistente
//  con { accion: 'fetchImg', url: 'https://...' }.
//  Respuesta: { dataUrl: 'data:image/...;base64,...' } | { error }
// ═══════════════════════════════════════════════════════════════
async function _handleFetchImg(req, res) {
  try {
    const url = (req.body && typeof req.body.url === 'string') ? req.body.url.trim() : '';
    if (!/^https?:\/\//i.test(url)) return res.status(400).json({ error: 'url inválida' });
    const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (ClickYClase image proxy)' } });
    if (!r.ok) return res.status(200).json({ error: 'HTTP ' + r.status });
    const ct = (r.headers.get('content-type') || '').toLowerCase();
    if (ct.indexOf('image/') !== 0) return res.status(200).json({ error: 'no es imagen: ' + ct.slice(0, 40) });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 1024) return res.status(200).json({ error: 'imagen muy chica' });
    if (buf.length > 6 * 1024 * 1024) return res.status(200).json({ error: 'imagen muy grande' });
    const mime = ct.split(';')[0].trim();
    const dataUrl = 'data:' + mime + ';base64,' + buf.toString('base64');
    return res.status(200).json({ dataUrl: dataUrl });
  } catch (e) {
    return res.status(200).json({ error: (e && e.message) ? e.message : String(e) });
  }
}
