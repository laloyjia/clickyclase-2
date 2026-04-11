/**
 * api/ia-asistente.js — ElectroLearn
 * Proxy serverless a Google Gemini API
 * Variables de entorno requeridas: GEMINI_API_KEY
 */

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

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

// ── Tabla de niveles de Bloom ────────────────────────────────
const BLOOM = {
  recordar:    'Nivel RECORDAR (Bloom): preguntas de conocimiento factual, definiciones, identificación, reconocimiento.',
  comprender:  'Nivel COMPRENDER (Bloom): preguntas que exigen explicar, describir, interpretar, resumir, clasificar.',
  aplicar:     'Nivel APLICAR (Bloom): ejercicios que requieren usar conceptos en situaciones nuevas, resolver problemas.',
  analizar:    'Nivel ANALIZAR (Bloom): ítems que piden descomponer, comparar, contrastar, diferenciar, examinar causas.',
  evaluar:     'Nivel EVALUAR (Bloom): preguntas de juicio, crítica, justificación, defensa de posturas.',
  crear:       'Nivel CREAR (Bloom): actividades de diseño, producción, propuesta, elaboración de algo nuevo.'
};

// ── Constructor de contexto pedagógico ──────────────────────
function buildContext(datos) {
  const lines = [
    datos.colegio      ? `Institución educativa: ${datos.colegio}`            : '',
    datos.asignatura   ? `Asignatura / Módulo: ${datos.asignatura}`           : '',
    datos.modulo       ? `Módulo TP: ${datos.modulo}`                         : '',
    datos.especialidad ? `Especialidad EMTP: ${datos.especialidad}`           : '',
    datos.nivel        ? `Nivel / Curso: ${datos.nivel}`                      : '',
    datos.unidad       ? `Unidad: ${datos.unidad}`                            : '',
    datos.horas        ? `Duración: ${datos.horas} horas pedagógicas`        : '',
    datos.tema         ? `Tema específico: ${datos.tema}`                     : '',
    datos.taxonomia    ? BLOOM[datos.taxonomia] || `Taxonomía: ${datos.taxonomia}` : '',
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
Asignatura: ${datos.asignatura || '___'}  |  Nivel: ${datos.nivel || '___'}  |  Duración: ${datos.horas || '___'}
${hasOAs ? 'Objetivo(s) de Aprendizaje Mineduc: [citar códigos OA aquí]' : 'OA / AE: _______________'}
Unidad: ${datos.unidad || '___'}  |  Tema: ${datos.tema || '___'}
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

${datos.nee && datos.nee.length ? 'ATENCIÓN A LA DIVERSIDAD (NEE)' : ''}`,

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
PREGUNTAS DE REFLEXIÓN (nivel ${datos.taxonomia || 'analizar'} en taxonomía de Bloom)
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
  OA | Contenido | Tipo ítem | N° ítem | Habilidad Bloom | Puntaje`,

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
PREGUNTAS DE COMPRENSIÓN (${datos.nPreguntas || '5-8'} preguntas, nivel ${datos.taxonomia || 'aplicar'} en taxonomía de Bloom)`,

    revision: `${intro}Realiza una REVISIÓN PEDAGÓGICA del siguiente material:
${ctx}
${datos.texto_a_revisar ? '\nMATERIAL A REVISAR:\n' + datos.texto_a_revisar : ''}

INFORME DE REVISIÓN:
ANÁLISIS DE FORTALEZAS
ÁREAS DE MEJORA (con sugerencias concretas)
COHERENCIA CURRICULAR (¿está alineado con el OA/AE?)
COBERTURA TAXONÓMICA (¿qué niveles de Bloom cubre?)
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
CONCLUSIÓN Y REFLEXIÓN`
  };

  return prompts[tipo] || `${intro}Genera un documento educativo sobre:\n${ctx}`;
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en Vercel' });

  const { tipo, datos } = req.body || {};
  if (!tipo) return res.status(400).json({ error: 'Parámetro tipo requerido' });

  const prompt = buildPrompt(tipo, datos || {});

  try {
    const r = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 3072, temperature: 0.72, topP: 0.9 },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]
      })
    });

    const data = await r.json();
    if (data.error) return res.status(502).json({ error: data.error.message });

    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!texto) return res.status(502).json({ error: 'Gemini no devolvió respuesta' });

    return res.status(200).json({ resultado: texto });
  } catch (e) {
    return res.status(500).json({ error: 'Error conectando con Gemini: ' + e.message });
  }
}
