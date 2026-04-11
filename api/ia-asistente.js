/**
 * api/ia-asistente.js
 * ElectroLearn — Serverless Function (Vercel)
 * Proxy seguro a Google Gemini API
 * La API key NUNCA llega al cliente — solo vive en variables de entorno de Vercel
 */

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ── Prompts por tipo de herramienta ──────────────────────────────────────────

function buildPrompt(tipo, datos) {
  const base = `Eres un asistente pedagógico experto en educación chilena.
Conoces el currículum nacional del Mineduc: Plan Común (L, M, CN, H, EF, Arte, Música),
Educación Básica (1° a 8°) y Educación Media Técnico-Profesional (EMTP) con sus especialidades.
Redactas en español formal chileno, de forma clara y práctica para el docente.
Responde SOLO con el documento solicitado, sin saludos ni explicaciones adicionales.
Usa formato con títulos en MAYÚSCULAS y bullets (•) o numeración donde corresponda.\n\n`;

  const ctx = [
    datos.asignatura  ? `Asignatura/Módulo: ${datos.asignatura}`  : '',
    datos.modulo      ? `Módulo TP: ${datos.modulo}`              : '',
    datos.especialidad? `Especialidad: ${datos.especialidad}`      : '',
    datos.nivel       ? `Nivel/Curso: ${datos.nivel}`             : '',
    datos.unidad      ? `Unidad: ${datos.unidad}`                 : '',
    datos.oa          ? `Objetivo/AE: ${datos.oa}`                : '',
    datos.horas       ? `Duración: ${datos.horas} horas`          : '',
    datos.tema        ? `Tema específico: ${datos.tema}`          : '',
    datos.contenido   ? `Contenido: ${datos.contenido}`           : '',
    datos.extra       ? `Indicaciones adicionales: ${datos.extra}`: '',
  ].filter(Boolean).join('\n');

  const prompts = {

    planificacion: `${base}Crea una PLANIFICACIÓN DE CLASE completa para el docente chileno con la siguiente información:
${ctx}

La planificación debe incluir:
OBJETIVO DE LA CLASE
HABILIDADES A DESARROLLAR
INICIO (15 min aprox.)
• Activación de conocimientos previos
• Motivación / contextualización
DESARROLLO (tiempo principal)
• Actividades secuenciadas paso a paso
• Recursos y materiales necesarios
• Estrategias de enseñanza
CIERRE (10-15 min)
• Síntesis de aprendizajes
• Evaluación formativa (cómo se evalúa la clase)
TAREA O EXTENSIÓN (opcional)
INDICADORES DE LOGRO`,

    guia: `${base}Crea una GUÍA DE APRENDIZAJE completa para estudiantes chilenos con la siguiente información:
${ctx}

La guía debe incluir:
ENCABEZADO: Nombre, Curso, Fecha, Asignatura/Módulo
OBJETIVO DE APRENDIZAJE
INTRODUCCIÓN (breve motivación al tema)
CONCEPTOS CLAVE (definiciones y explicaciones)
ACTIVIDADES DE DESARROLLO
• Actividad 1: [ejercicio práctico]
• Actividad 2: [ejercicio de análisis o aplicación]
• Actividad 3: [ejercicio integrador]
PREGUNTAS DE REFLEXIÓN
EVALUACIÓN / AUTOEVALUACIÓN (rúbrica simple o escala)
Usa lenguaje apropiado para el nivel indicado.`,

    prueba: `${base}Crea un INSTRUMENTO DE EVALUACIÓN (prueba escrita) para estudiantes chilenos con la siguiente información:
${ctx}

Incluye:
ENCABEZADO: Institución, Asignatura, Nivel, Fecha, Puntaje total
INSTRUCCIONES GENERALES
PARTE I — SELECCIÓN MÚLTIPLE (4 alternativas, indica la correcta con *)
  — 5 preguntas mínimo con contexto o problema real
PARTE II — TÉRMINOS PAREADOS o VERDADERO/FALSO
  — 5 ítems
PARTE III — DESARROLLO
  — 2 preguntas de análisis, aplicación o resolución de problemas
  — Incluye pauta de corrección indicando qué se evalúa en cada pregunta
TABLA DE ESPECIFICACIONES (objetivo, habilidad, puntaje por ítem)`,

    apunte: `${base}Crea un APUNTE DE CONTENIDO completo para estudiantes chilenos con la siguiente información:
${ctx}

El apunte debe incluir:
TÍTULO Y ENCABEZADO
INTRODUCCIÓN AL TEMA (contexto y relevancia)
CONTENIDO PRINCIPAL
  — Conceptos fundamentales definidos con claridad
  — Explicaciones con ejemplos concretos del contexto chileno / EMTP
  — Fórmulas, tablas o diagramas (describir en texto donde aplique)
  — Casos prácticos o aplicaciones reales
RESUMEN / IDEAS CLAVE (bullet points)
GLOSARIO (términos técnicos)
PREGUNTAS DE COMPRENSIÓN (3-5 preguntas para autoevaluación)`,

    revision: `${base}Realiza una REVISIÓN PEDAGÓGICA del siguiente instrumento o material educativo:
${ctx}
${datos.texto_a_revisar ? `\nMATERIAL A REVISAR:\n${datos.texto_a_revisar}` : ''}

Proporciona:
ANÁLISIS DE FORTALEZAS
• Aspectos bien logrados
ÁREAS DE MEJORA
• Problemas detectados con sugerencias concretas
COHERENCIA CURRICULAR
• ¿El instrumento está alineado con el OA/AE declarado?
LENGUAJE Y CLARIDAD
• ¿Las instrucciones son claras para el nivel?
VERSIÓN MEJORADA
• Propón una versión corregida de los ítems con mayores problemas`,

    taller: `${base}Crea una GUÍA PARA ACTIVIDAD EN TALLER (práctica) para estudiantes de EMTP chilenos con la siguiente información:
${ctx}

La guía de taller debe incluir:
ENCABEZADO: Módulo, Especialidad, Nivel, Fecha, Duración
OBJETIVO DE LA ACTIVIDAD PRÁCTICA
NORMAS DE SEGURIDAD (obligatorio para talleres EMTP)
• EPP requerido
• Precauciones específicas de la actividad
MATERIALES Y HERRAMIENTAS NECESARIOS
PROCEDIMIENTO PASO A PASO
  1. (cada paso numerado, claro y verificable)
  2. ...
CRITERIOS DE EVALUACIÓN (lista de cotejo o rúbrica)
  — Indicador | Logrado | Por lograr | No logrado
INFORME DE ACTIVIDAD (preguntas que el alumno debe responder al terminar)
CONCLUSIÓN Y REFLEXIÓN FINAL`
  };

  return prompts[tipo] || `${base}Genera un documento educativo sobre:\n${ctx}`;
}

// ── Handler principal ─────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS para Vercel
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en Vercel' });
  }

  const { tipo, datos } = req.body || {};
  if (!tipo) {
    return res.status(400).json({ error: 'Parámetro tipo requerido' });
  }

  const prompt = buildPrompt(tipo, datos || {});

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature:     0.72,
          topP:            0.9
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]
      })
    });

    const geminiData = await geminiRes.json();

    if (geminiData.error) {
      console.error('[IA] Gemini error:', geminiData.error);
      return res.status(502).json({ error: geminiData.error.message || 'Error de Gemini API' });
    }

    const texto = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!texto) {
      return res.status(502).json({ error: 'Gemini no devolvió respuesta' });
    }

    return res.status(200).json({ resultado: texto });

  } catch (err) {
    console.error('[IA] Fetch error:', err.message);
    return res.status(500).json({ error: 'Error conectando con Gemini: ' + err.message });
  }
}
