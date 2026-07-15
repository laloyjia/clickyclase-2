/* ════════════════════════════════════════════════════════════════════
 *  material-ia.js — Click&Clase
 *  Construcción de prompts para Gemini, llamada al endpoint IA con
 *  pool de reintentos, y orquestación de generación PIE adjunta.
 *
 *  Expone (window):
 *   - _promptReglasComunes, _promptFormatoHTML, _promptDatos
 *   - _promptGuia, _promptApunte, _promptPrueba, _promptEvaluacion,
 *     _promptDiferenciada, _promptGenerico, _buildPromptPorTipo
 *   - _promptPAES, _promptSIMCE
 *   - PAES_INFO, _distribuirPuntaje
 *   - generarConIA (entrada principal del botón "Generar con IA")
 *   - _generarPIEAdjunta, setIAStatus
 *
 *  Dependencias: window.IA_ENDPOINT, ELDB, showToast, MathJax,
 *  getEvalOpciones / getEvalOpcionesPIE (del módulo PIE),
 *  pieDoc / headerInstitucional / tituloBar / metaTabla (módulo doc).
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // =============================================
  // PROMPTS POR TIPO DE DOCUMENTO (IA)
  // =============================================
  /**
   * Reglas comunes que protegen el wrapper institucional. Toda variante de
   * prompt debe terminar incluyendo este bloque para evitar que la IA genere
   * portada/encabezado/h1 propios.
   */
  function _promptReglasComunes() {
      return 'REGLAS ESTRICTAS DE FORMATO (MUY IMPORTANTE):\n' +
      '- NO generes encabezado institucional, portada, logo ni datos del colegio: el sistema ya antepone automáticamente el logo, el nombre del liceo, el tipo de documento, el título en barra azul oscuro y una tabla con: nombre del estudiante, código, duración, profesor, curso, fecha, puntaje. NO los repitas.\n' +
      '- NO escribas <h1> con el título del documento (el sistema lo pone en una barra superior).\n' +
      '- NO incluyas filas de "Nombre del estudiante", "Fecha", "Curso", "Puntaje", "Profesor" en el cuerpo: ya están en la tabla del encabezado.\n' +
      '- Devuelve SOLO HTML del cuerpo (puedes usar <h2>, <h3>, <p>, <ol>, <ul>, <table>, <strong>, <em>, <hr>). Sin <html>, <head>, <body>, <style> ni CSS inline excesivo; el sistema ya tiene estilos cargados.\n' +
      '- Idioma: español de Chile, ortografía correcta, sin anglicismos innecesarios.\n';
  }

  /**
   * Bloque de datos del documento, común a todos los prompts.
   */
  // Bloque universal de reglas de formato HTML que se inyecta en todos los prompts.
  // Asegura que la IA use HTML semántico, Unicode matemático y CSS-friendly,
  // para que se vea bien en pantalla Y al descargar como Word.
  function _promptFormatoHTML() {
    return '\n══════════ INSTRUCCIONES DE FORMATO (OBLIGATORIO) ══════════\n' +
      '0. ANTI-LOOP CRÍTICO: NUNCA escribas más de 60 underscores seguidos (`______`), guiones (`------`), igual (`======`), asteriscos (`******`) o puntos (`......`). Para líneas de escritura de respuesta usa <div class="linea-escribir"></div> o exactamente "_______________________" (~30 chars). Si necesitas varias líneas, usa varios divs/elementos separados, NO una sola secuencia larga.\n' +
      '1. Devuelve SOLO HTML del cuerpo (sin <html>, <head>, <body>, ni marcadores tipo ```html).\n' +
      '2. Usa <h1> para el título, <h2>/<h3> para secciones, <p> para párrafos, <ul>/<ol>/<li> para listas, <table>/<tr>/<td> para tablas (con border="1" inline y style="border-collapse:collapse;width:100%"). Usa <strong> y <em> para énfasis.\n' +
      '3. NOTACIÓN MATEMÁTICA — REGLAS ESTRICTAS:\n' +
      '   • Exponentes: <sup>2</sup>, <sup>3</sup>, <sup>n</sup> — NUNCA escribas x^2 ni x**2.\n' +
      '   • Subíndices: <sub>1</sub>, <sub>n</sub>, <sub>i</sub>.\n' +
      '   • Fracciones: <span class="frac"><span class="num">numerador</span><span class="den">denominador</span></span> — NUNCA uses "1/2" en texto plano para fracciones formales.\n' +
      '   • Raíces: <span class="sqrt-root">√<span class="rad">contenido</span></span> para que el radical cubra la expresión. Para raíces simples basta el carácter √.\n' +
      '   • Símbolos: usa SIEMPRE Unicode matemático directo: ² ³ ⁴ ⁿ ₀ ₁ ₂ √ ∛ ∜ π τ φ θ α β γ δ ε λ μ σ ω ∞ ° ± ∓ × ÷ · ≈ ≠ ≤ ≥ ≪ ≫ ∈ ∉ ⊂ ⊃ ∪ ∩ ∅ ∀ ∃ ∑ ∏ ∫ ∮ ∂ ∇ → ← ↔ ⇒ ⇐ ⇔ ↑ ↓.\n' +
      '   • Vectores: <strong>v</strong> con flecha → o como <span style="text-decoration:overline">v</span>.\n' +
      '   • Matrices y sistemas de ecuaciones: usa <table> sin bordes con celdas alineadas. O usa la notación de "llave" con tabla.\n' +
      '   • Ecuaciones desplegadas (centradas): envuélvelas en <p style="text-align:center;font-size:1.1em;margin:8px 0"><strong>...</strong></p>.\n' +
      '   • Para ecuaciones largas o complejas (límites, integrales con límites, productos), usa LaTeX entre $...$ inline o $$...$$ display — MathJax 3 las renderizará en pantalla y se imprimirán como texto en Word.\n' +
      '4. UNIDADES Y NÚMEROS: separador decimal coma (formato chileno: 3,14). Unidades con espacio: "5 kg", "2,5 m/s". NO uses HTML especial para esto.\n' +
      '5. NO inventes datos institucionales: usa los provistos en la sección de Datos.\n' +
      '6. Mantén consistencia tipográfica: secciones en MAYÚSCULAS, una idea por párrafo, listas numeradas para procedimientos.\n';
  }

  function _promptDatos(ctx) {
      return 'DATOS DEL DOCUMENTO:\n' +
      '- Tipo: ' + ctx.tipoNombre + '\n' +
      '- Institución: ' + ctx.nombreInst + '\n' +
      '- Asignatura/Módulo: ' + ctx.modNombre + '\n' +
      '- Curso/Nivel: ' + ctx.cursoTexto + '\n' +
      '- Tema o contenido específico: ' + (ctx.contenido || '(no especificado)') + '\n' +
      '- Objetivos de Aprendizaje (Mineduc):\n' + (ctx.oaTexto || '(no especificados)') + '\n' +
      '- Dificultad pedagógica: ' + ctx.difTexto + '\n' +
      (ctx.valoresStr ? '- Actitudes/valores MBE a integrar: ' + ctx.valoresStr + '\n' : '') +
      '\n' + _promptFormatoHTML() + '\n';
  }

  /**
   * Prompt específico de Guía de Aprendizaje.
   * Estructura "5 momentos" + objetivo amigable. Tono al estudiante.
   */
  function _promptGuia(ctx) {
      return 'Actúa como un experto en diseño de material didáctico y evaluador del Marco para la Buena Enseñanza (MBE). ' +
      'Tu tarea es crear una Guía de Aprendizaje estructurada, motivadora y centrada en el estudiante.\n\n' +
      _promptDatos(ctx) +
      'TONO Y ESTILO (obligatorio):\n' +
      '- Redacta TODO el contenido dirigido directamente al estudiante usando "tú": cercano, motivador y claro.\n' +
      '- Considera el nivel ' + ctx.cursoTexto + ' al elegir vocabulario, ejemplos y extensión.\n' +
      '- NO uses lenguaje técnico para profesores en el cuerpo de la guía. Debe quedar lista para imprimir y entregar al alumno.\n' +
      '- Asegura una progresión de niveles cognitivos (de recordar a aplicar/crear).\n\n' +
      'ESTRUCTURA OBLIGATORIA (en este orden, con estos títulos exactos en <h2>):\n' +
      '1. <h2>🎯 Objetivo de hoy</h2>\n' +
      '   - Un párrafo breve en lenguaje amigable que comience con "Hoy aprenderemos a…" o equivalente, traduciendo el OA a algo que el estudiante entienda.\n' +
      '   - NO incluyas espacios para Nombre/Fecha/Curso: ya están en la tabla del sistema.\n' +
      '2. <h2>💡 Momento 1: ¡Despierta tu mente!</h2>\n' +
      '   - Activación: una pregunta breve, dato curioso o sugerencia de imagen que conecte el tema con la vida cotidiana del estudiante o con lo que ya sabe.\n' +
      '   - Si sugieres una imagen, escríbela como "[Imagen sugerida: descripción breve]" en una línea aparte.\n' +
      '   - Cierra con una pregunta gatillante para responder oralmente o por escrito.\n' +
      '3. <h2>🔍 Momento 2: Exploremos juntos</h2>\n' +
      '   - Modelaje/contenido: explicación BREVE, visual y estructurada del concepto clave.\n' +
      '   - Incluye al menos un "Ejemplo Resuelto" o "Paso a Paso" que muestre cómo se aplica la habilidad.\n' +
      '   - Usa listas, mini-tablas o pasos numerados para mantenerlo visual.\n' +
      '4. <h2>✋ Momento 3: Manos a la obra</h2>\n' +
      '   - Práctica guiada: 2 o 3 ejercicios o actividades de complejidad básica/media (niveles 1-3: recordar, comprender, aplicar).\n' +
      '   - Para cada ejercicio incluye una "💡 Pista" o "💡 Tip" al margen pensada en apoyo DUA para estudiantes que se estanquen.\n' +
      '   - Numera los ejercicios con <ol> y deja una línea horizontal o espacio para que el estudiante escriba la respuesta.\n' +
      '5. <h2>🚀 Momento 4: Tu gran desafío</h2>\n' +
      '   - Práctica independiente: 1 o 2 actividades de alta demanda cognitiva (niveles 4-6: analizar, evaluar, crear).\n' +
      '   - Sin pistas. Deben requerir fundamentar, comparar, crear, juzgar o resolver un problema nuevo.\n' +
      '6. <h2>🌱 Momento 5: ¿Qué aprendimos hoy?</h2>\n' +
      '   - Una <table> de autoevaluación con 3 criterios concretos relativos al objetivo de la guía.\n' +
      '     Columnas exactas: "Criterio | Logrado ✅ | Por lograr 🔄". Cada fila marca un criterio diferente.\n' +
      '   - Después de la tabla, dos preguntas de metacognición en <ol>, dejando espacio para responder.\n' +
      '     Una de ellas debe ser similar a "¿Qué fue lo más difícil y cómo lo superaste?".\n\n' +
      (ctx.valoresStr
          ? 'INTEGRACIÓN DE VALORES MBE:\n' +
            '- Integra de forma natural (no forzada) las actitudes: ' + ctx.valoresStr + '. Pueden aparecer como invitación al final de un Momento, en una pista DUA o como criterio de la tabla de autoevaluación.\n\n'
          : '') +
      _promptReglasComunes() +
      '\nGenera ahora SOLO el cuerpo HTML de la Guía de Aprendizaje siguiendo exactamente esta estructura.';
  }

  /**
   * Prompt específico de Apunte de Clase.
   * Texto académico riguroso + sección "Comprueba tu Aprendizaje" con 6 preguntas por niveles cognitivos + pauta breve.
   */
  function _promptApunte(ctx) {
      return 'Actúa como un experto disciplinar y catedrático especialista en diseño de material de estudio. ' +
      'Tu tarea es redactar un Apunte de Clase riguroso, extenso, fidedigno y muy bien estructurado, ' +
      'destinado a estudiantes de ' + ctx.cursoTexto + '.\n\n' +
      _promptDatos(ctx) +
      'DATOS DEL CONTENIDO (a respetar estrictamente):\n' +
      '- Asignatura/Área: ' + ctx.modNombre + '\n' +
      '- Tema Central: ' + (ctx.contenido || '(no especificado)') + '\n' +
      '- Foco o Indicaciones específicas (subtemas obligatorios, enfoques o conceptos clave que NO deben faltar):\n' +
      (ctx.oaTexto || '(no especificados)') + '\n\n' +
      'INSTRUCCIONES PARA EL DESARROLLO DEL APUNTE (El Contenido):\n' +
      '1. Rigor y Extensión:\n' +
      '   - Redacta un texto académico extenso y de alta calidad, equivalente a varias páginas de lectura.\n' +
      '   - El contenido debe ser fidedigno, técnicamente correcto y estar a la altura del nivel ' + ctx.cursoTexto + '.\n' +
      '   - Evita el lenguaje coloquial; mantén un tono formal, expositivo y didáctico.\n' +
      '2. Estructura del Texto:\n' +
      '   - Organiza el apunte en secciones claras con <h2> y, donde corresponda, subtítulos <h3>.\n' +
      '   - Comienza con una introducción que contextualice el tema y explique su relevancia.\n' +
      '   - Desarrolla los subtemas en orden lógico, asegurando que TODOS los focos indicados arriba estén cubiertos.\n' +
      '   - Cierra con una sección de síntesis o conclusión que recoja las ideas centrales.\n' +
      '3. Definiciones y Ejemplos:\n' +
      '   - Cada concepto clave debe estar definido con precisión (puedes usar <strong> para resaltar el término).\n' +
      '   - Acompaña las definiciones con ejemplos concretos, casos aplicados, esquemas en texto, mini-tablas o pasos numerados cuando ayuden a comprender.\n' +
      '   - Si el tema lo requiere, incluye fórmulas, ecuaciones o diagramas descritos en texto.\n' +
      '4. Glosario (al final, antes de las preguntas):\n' +
      '   - Incluye una sección <h2>Glosario</h2> con una <table> de 2 columnas ("Término | Definición") con los 5 a 8 términos más importantes del apunte.\n\n' +
      'INSTRUCCIONES PARA LA SECCIÓN DE EVALUACIÓN (Las Preguntas):\n' +
      '- Al final del texto, crea una sección titulada exactamente <h2>Comprueba tu Aprendizaje</h2>.\n' +
      '- Redacta 6 preguntas ordenadas estrictamente de menor a mayor complejidad cognitiva (recordar → comprender → aplicar → analizar → evaluar → crear).\n' +
      '- Etiqueta cada pregunta con su nivel correspondiente, en este formato exacto al inicio de la pregunta:\n' +
      '  * <strong>Nivel 1 (Recordar):</strong> pregunta de identificación, definición o reconocimiento.\n' +
      '  * <strong>Nivel 2 (Comprender):</strong> pregunta de explicación con palabras propias o resumen.\n' +
      '  * <strong>Nivel 3 (Aplicar):</strong> pregunta que requiera usar el conocimiento en una situación concreta.\n' +
      '  * <strong>Nivel 4 (Analizar):</strong> pregunta que requiera descomponer, comparar o relacionar.\n' +
      '  * <strong>Nivel 5 (Evaluar):</strong> pregunta de juicio fundamentado o toma de decisión justificada.\n' +
      '  * <strong>Nivel 6 (Crear):</strong> pregunta que pida diseñar, proponer o construir algo nuevo a partir del contenido.\n' +
      '- Presenta las 6 preguntas en una lista <ol>.\n\n' +
      'PAUTA DE CORRECCIÓN BREVE:\n' +
      '- Después de las preguntas, agrega una sección <h2>Pauta de Corrección</h2> con las respuestas esperadas o los conceptos clave que el estudiante debería mencionar para cada una de las 6 preguntas.\n' +
      '- Sé conciso (1 a 3 líneas por pregunta); para preguntas de desarrollo, lista los conceptos mínimos esperados.\n\n' +
      (ctx.valoresStr
          ? 'INTEGRACIÓN DE VALORES MBE:\n' +
            '- Cuando sea natural, integra las actitudes ' + ctx.valoresStr + ' a través de los ejemplos o casos del apunte (sin forzar). NO las menciones explícitamente como sección.\n\n'
          : '') +
      'FORMATO DE SALIDA:\n' +
      '- Entrega el apunte directamente, SIN saludos ni introducciones conversacionales tipo "Aquí tienes…" o "Claro, profesor…".\n' +
      '- Empieza directamente con el primer <h2> del apunte.\n\n' +
      _promptReglasComunes() +
      '\nGenera ahora SOLO el cuerpo HTML del Apunte de Clase siguiendo exactamente esta estructura.';
  }

  /**
   * Prompt específico de Prueba Sumativa.
   * Voz de Jefe de UTP / Experto en Evaluación. Ítems con cantidades dinámicas
   * según lo configurado por el docente + tabla de especificaciones + pauta + rúbrica.
   */
  /**
   * Calcula la distribución EXACTA de puntaje por tipo de ítem usando pesos
   * de dificultad cognitiva. Garantiza que la suma sea exactamente puntajeTotal.
   * Pesos: SM/VF/Completar/Pareados = 1 (recordar/comprender),
   *        Aplicación = 2, Caso = 3, Desarrollo = 4 (analizar/evaluar/crear).
   * Retorna: { sm:{n,total,porItem}, vf:..., ..., resumen, porSeccion[] }
   */
  function _distribuirPuntaje(counts, puntajeTotal) {
      var pesos = { sm:1, vf:1, completar:1, emparejar:1, aplicacion:2, caso:3, desarrollo:4 };
      var n = {
          sm: counts.sm||0, vf: counts.vf||0, completar: counts.completar||0,
          emparejar: counts.emparejar||0, aplicacion: counts.aplicacion||0,
          caso: counts.caso||0, desarrollo: counts.desarrollo||0
      };
      // Unidades ponderadas totales
      var unidadesPonderadas = 0;
      var ordenTipos = ['sm','vf','completar','emparejar','aplicacion','caso','desarrollo'];
      ordenTipos.forEach(function(k){ unidadesPonderadas += n[k] * pesos[k]; });
      if (unidadesPonderadas === 0) {
          return { sumaTotal: 0, porSeccion: {}, resumen: '(sin ítems)' };
      }
      // Puntaje por unidad ponderada (entero, recortando)
      var puntoBase = Math.max(1, Math.floor(puntajeTotal / unidadesPonderadas));
      // Calcular puntaje por tipo
      var porTipo = {};
      var sumaParcial = 0;
      ordenTipos.forEach(function(k) {
          if (n[k] === 0) { porTipo[k] = { n:0, porItem:0, total:0 }; return; }
          var pi = puntoBase * pesos[k];   // puntaje por ítem en este tipo
          var total = pi * n[k];
          porTipo[k] = { n: n[k], porItem: pi, total: total };
          sumaParcial += total;
      });
      // Diferencia para llegar al total exacto → la sumamos al último tipo no vacío
      var dif = puntajeTotal - sumaParcial;
      if (dif !== 0) {
          // Buscar el tipo con MÁS peso que tenga items, agregarle la diferencia al puntaje del ÚLTIMO ítem
          var candidatos = ordenTipos.filter(function(k){ return n[k] > 0; }).sort(function(a,b){ return pesos[b]-pesos[a]; });
          if (candidatos.length) {
              var k = candidatos[0];
              porTipo[k].total += dif;
              // La diferencia queda como "ajuste" en el último ítem de ese tipo
              porTipo[k].ajusteUltimoItem = dif;
          }
      }
      // Suma final (debería ser exactamente puntajeTotal)
      var sumaTotal = 0;
      ordenTipos.forEach(function(k){ sumaTotal += porTipo[k].total; });
      // Resumen legible para meter en el prompt
      var LABEL = { sm:'Selección Múltiple', vf:'Verdadero/Falso', completar:'Completar',
                    emparejar:'Términos pareados', aplicacion:'Aplicación', caso:'Análisis de caso',
                    desarrollo:'Desarrollo / Argumentación' };
      var lineas = [];
      ordenTipos.forEach(function(k) {
          if (n[k] === 0) return;
          var p = porTipo[k];
          var extra = (p.ajusteUltimoItem ? ' (último ítem: ' + (p.porItem + p.ajusteUltimoItem) + ' pts para que sume exacto)' : '');
          lineas.push('   • ' + LABEL[k] + ': ' + p.n + ' ítems × ' + p.porItem + ' pts = ' + p.total + ' pts' + extra);
      });
      var resumen = lineas.join('\n');
      return { sumaTotal: sumaTotal, porTipo: porTipo, resumen: resumen };
  }

  function _promptPrueba(ctx) {
      var counts = ctx.itemCounts || {};
      var nSM   = counts.sm   || 0;
      var nVF   = counts.vf   || 0;
      var nCom  = counts.completar || 0;
      var nPar  = counts.emparejar  || 0;
      var nApl  = counts.aplicacion || 0;
      var nCas  = counts.caso       || 0;
      var nDes  = counts.desarrollo || 0;
      var totalItems = nSM + nVF + nCom + nPar + nApl + nCas + nDes;
      var nAlt = ctx.cantAlternativas || 4;
      var letrasAlt = ['A','B','C','D','E'].slice(0, nAlt).join(', ');
      // Distribución exacta de puntaje calculada por la plataforma
      var distrPts = _distribuirPuntaje(counts, ctx.puntaje || 100);
      function _pts(tipo) { return (distrPts.porTipo[tipo] || {porItem:0, total:0}); }

      // Bloque de preguntas/ejercicios literales obligatorios (si el profesor los pegó)
      var refsLiteral = '';
      if (ctx.materialReferencia && ctx.materialReferencia.trim().length > 5) {
          refsLiteral = '\nPREGUNTAS O EJERCICIOS ESPECÍFICOS QUE DEBEN INCLUIRSE LITERALMENTE EN LA PRUEBA (sin reescribir):\n' +
          '"""\n' + ctx.materialReferencia.trim() + '\n"""\n' +
          'Reglas: respeta el enunciado tal como aparece. Si no calzan en el ítem que está construyendo la IA, ubícalos en el ítem que mejor se adecue (Aplicación, Caso o Desarrollo). Identifícalos en la Tabla de Especificaciones como "Pregunta del docente".\n\n';
      }

      // Construye el bloque de "secciones" del instrumento solo con los ítems con n > 0.
      var secciones = '';
      var idx = 1;
      function nrom(i) { return ['I','II','III','IV','V','VI','VII'][i-1] || ('I'.repeat(i)); }

      function _ptsLabel(tipo) {
          var p = _pts(tipo);
          return '(' + p.total + ' pts total · ' + p.porItem + ' pts c/u' + (p.ajusteUltimoItem ? ' · último: ' + (p.porItem + p.ajusteUltimoItem) + ' pts' : '') + ')';
      }
      if (nSM > 0) {
          secciones += '   <h3>Ítem ' + nrom(idx++) + ': Selección Múltiple (Recordar/Comprender) ' + _ptsLabel('sm') + '</h3>\n' +
          '   - Genera ' + nSM + ' preguntas, cada una con ' + nAlt + ' alternativas etiquetadas ' + letrasAlt + '.\n' +
          '   - PUNTAJE: cada pregunta vale ' + _pts('sm').porItem + ' pts' + (_pts('sm').ajusteUltimoItem ? ' (excepto la última que vale ' + (_pts('sm').porItem + _pts('sm').ajusteUltimoItem) + ' pts para que el total cierre exacto)' : '') + '. Anótalo explícito al lado de cada pregunta: "Pregunta N. (' + _pts('sm').porItem + ' pts)".\n' +
          '   - Los distractores deben ser plausibles y basados en errores comunes que cometen los estudiantes.\n' +
          '   - PROHIBIDO usar "Todas las anteriores", "Ninguna de las anteriores", "A y B", etc.\n' +
          '   - Usa <ol> para las preguntas y formato A) B) C)... para las alternativas.\n\n';
      }
      if (nVF > 0) {
          secciones += '   <h3>Ítem ' + nrom(idx++) + ': Verdadero o Falso (Comprender) ' + _ptsLabel('vf') + '</h3>\n' +
          '   - Genera ' + nVF + ' afirmaciones numeradas.\n' +
          '   - PUNTAJE: cada afirmación vale ' + _pts('vf').porItem + ' pts' + (_pts('vf').ajusteUltimoItem ? ' (última: ' + (_pts('vf').porItem + _pts('vf').ajusteUltimoItem) + ' pts)' : '') + '. Inclúyelo en el enunciado de cada una.\n' +
          '   - Incluye explícitamente al inicio del ítem la instrucción: "Marca V o F. JUSTIFICA con una oración cada afirmación que consideres falsa".\n' +
          '   - Deja un espacio (línea horizontal o "______") después de cada afirmación para la justificación.\n\n';
      }
      if (nCom > 0) {
          secciones += '   <h3>Ítem ' + nrom(idx++) + ': Completar (Recordar) ' + _ptsLabel('completar') + '</h3>\n' +
          '   - Redacta un párrafo breve y coherente sobre el tema con exactamente ' + nCom + ' espacios en blanco marcados como "_____ (1)", "_____ (2)", etc.\n' +
          '   - PUNTAJE: cada espacio vale ' + _pts('completar').porItem + ' pts. Indícalo junto al título del ítem.\n' +
          '   - Los espacios deben corresponder a conceptos clave del tema, no a palabras triviales.\n' +
          '   - Debajo del párrafo, deja una lista numerada del 1 al ' + nCom + ' para que el estudiante escriba el concepto faltante.\n\n';
      }
      if (nPar > 0) {
          var defB = nPar + 2;
          secciones += '   <h3>Ítem ' + nrom(idx++) + ': Términos Pareados (Comprender/Relacionar) ' + _ptsLabel('emparejar') + '</h3>\n' +
          '   - Crea una <table> de 2 columnas: Columna A con ' + nPar + ' conceptos clave (numerados 1-' + nPar + ') y Columna B con ' + defB + ' definiciones (etiquetadas a, b, c, ...).\n' +
          '   - PUNTAJE: cada par correcto vale ' + _pts('emparejar').porItem + ' pts. Anota el puntaje total del ítem (' + _pts('emparejar').total + ' pts) en el encabezado.\n' +
          '   - La Columna B DEBE tener 2 opciones más que la A para evitar que el estudiante responda por simple descarte.\n' +
          '   - Las 2 definiciones distractoras deben ser conceptualmente cercanas pero claramente incorrectas.\n\n';
      }
      if (nApl > 0) {
          secciones += '   <h3>Ítem ' + nrom(idx++) + ': Aplicación (Aplicar) ' + _ptsLabel('aplicacion') + '</h3>\n' +
          '   - Plantea ' + nApl + ' ejercicio(s) práctico(s) directo(s), adecuados a la asignatura "' + ctx.modNombre + '" y al tema "' + (ctx.contenido || 'el contenido indicado') + '".\n' +
          '   - PUNTAJE: cada ejercicio vale ' + _pts('aplicacion').porItem + ' pts. Indícalo al inicio de cada uno.\n' +
          '   - Puede ser un problema de cálculo, análisis paso a paso, clasificación, interpretación de gráfico/esquema descrito, etc.\n' +
          '   - Indica claramente qué se pide y deja espacio para el desarrollo.\n\n';
      }
      if (nCas > 0) {
          var preguntasCaso = Math.max(2, Math.min(4, nCas + 1));
          secciones += '   <h3>Ítem ' + nrom(idx++) + ': Análisis de Caso (Analizar) ' + _ptsLabel('caso') + '</h3>\n' +
          '   - Redacta un caso ficticio, situación problema o fragmento de texto fuente de 1 a 2 párrafos.\n' +
          '   - PUNTAJE: cada pregunta de análisis vale ' + _pts('caso').porItem + ' pts (total ítem: ' + _pts('caso').total + ' pts).\n' +
          '   - Si el docente solicitó ' + nCas + ' ítems de caso, puedes presentar ' + nCas + ' caso(s) breve(s) o un caso único con ' + nCas + ' preguntas de análisis basadas ESTRICTAMENTE en esa lectura.\n' +
          '   - Las preguntas deben requerir descomponer, comparar, relacionar o inferir desde el caso.\n\n';
      }
      if (nDes > 0) {
          secciones += '   <h3>Ítem ' + nrom(idx++) + ': Desarrollo y Argumentación (Evaluar/Crear) ' + _ptsLabel('desarrollo') + '</h3>\n' +
          '   - Formula ' + nDes + ' pregunta(s) abierta(s) de alta demanda cognitiva.\n' +
          '   - PUNTAJE: cada pregunta vale ' + _pts('desarrollo').porItem + ' pts' + (_pts('desarrollo').ajusteUltimoItem ? ' (última: ' + (_pts('desarrollo').porItem + _pts('desarrollo').ajusteUltimoItem) + ' pts)' : '') + '. Anótalo en el enunciado.\n' +
          '   - La consigna debe pedir explícitamente argumentar/justificar/proponer.\n\n';
      }

      if (totalItems === 0) {
          // Fallback: el docente no marcó ningún ítem; usar configuración estándar.
          secciones = '   <h3>Ítem I: Selección Múltiple (__/X pts)</h3>\n   - Genera 5 preguntas con 4 alternativas A, B, C, D. Sin "Todas/Ninguna las anteriores".\n\n' +
                      '   <h3>Ítem II: Verdadero o Falso (__/X pts)</h3>\n   - Genera 3 afirmaciones, justificación obligatoria de falsas.\n\n' +
                      '   <h3>Ítem III: Desarrollo (__/X pts)</h3>\n   - Genera 2 preguntas abiertas con argumentación.\n\n';
          totalItems = 10;
      }

      return 'Actúa como un Jefe de Unidad Técnico Pedagógica (UTP) y Experto en Evaluación Educativa. ' +
      'Tu tarea es construir un instrumento de evaluación sumativa exhaustivo, válido y alineado a los estándares de evaluación para el aprendizaje.\n\n' +
      _promptDatos(ctx) +
      'DATOS DE LA EVALUACIÓN (a respetar estrictamente):\n' +
      '- Asignatura: ' + ctx.modNombre + '\n' +
      '- Nivel: ' + ctx.cursoTexto + '\n' +
      '- Objetivo(s) de Aprendizaje (OA) a evaluar:\n' + (ctx.oaTexto || '(no especificados)') + '\n' +
      '- Tema Específico: ' + (ctx.contenido || '(no especificado)') + '\n' +
      '- Cantidad EXACTA de preguntas del instrumento: ' + totalItems + ' preguntas. Esta cifra es OBLIGATORIA: la suma de los ítems generados debe ser EXACTAMENTE ' + totalItems + '.\n' +
      '- Cantidad de alternativas para los ítems de Selección Múltiple: ' + nAlt + ' (' + letrasAlt + ').\n' +
      '- PUNTAJE TOTAL OBLIGATORIO: ' + ctx.puntaje + ' puntos. La suma de TODOS los ítems debe ser EXACTAMENTE ' + ctx.puntaje + '. Esto es innegociable.\n' +
      '\n' +
      'DISTRIBUCIÓN OFICIAL DEL PUNTAJE (pre-calculada por la plataforma — usar TAL CUAL):\n' +
      distrPts.resumen + '\n' +
      '   TOTAL: ' + distrPts.sumaTotal + ' pts (debe coincidir con el puntaje objetivo de ' + ctx.puntaje + ' pts)\n' +
      '\n' +
      'INSTRUCCIONES DE PUNTAJE — CUMPLIR SIN EXCEPCIÓN:\n' +
      '1. En el encabezado de CADA ítem (h3), incluye el puntaje total del ítem entre paréntesis tal como aparece arriba.\n' +
      '2. Junto al enunciado de CADA pregunta, indica entre paréntesis su puntaje individual. Ej: "1. (' + (_pts('sm').porItem || 2) + ' pts) ¿Cuál es..."\n' +
      '3. La Tabla de Especificaciones (ver sección Profesor) debe tener una columna "Puntaje" donde la suma SEA EXACTAMENTE ' + ctx.puntaje + '.\n' +
      '4. Al final de la prueba (antes de la Versión Profesor), agrega un párrafo: "PUNTAJE TOTAL DE LA PRUEBA: ' + ctx.puntaje + ' pts.".\n' +
      '5. Si hay un ítem con "ajuste" (último ítem con +/- 1-2 pts para que cuadre), respétalo exactamente como se indica en la distribución oficial.\n\n' +

      'ESTRUCTURA OBLIGATORIA DEL DOCUMENTO (en este ORDEN EXACTO):\n' +
      'El documento se entrega como UN SOLO archivo con DOS secciones claramente diferenciadas. Las preguntas se redactan UNA SOLA VEZ (en la Versión Estudiante). La Versión Profesor referencia esas preguntas por número, sin volver a escribirlas.\n\n' +

      '====================================================\n' +
      'PARTE 1 — VERSIÓN ESTUDIANTE\n' +
      '====================================================\n' +
      'Comienza esta parte con:\n' +
      '   <p class="doc-version-tag"><strong>Versión Estudiante</strong></p>\n' +
      '   <h1>Versión Estudiante — Instrumento de Evaluación</h1>\n\n' +
      '1. <h2>Instrucciones generales</h2>\n' +
      '   - Párrafo breve con instrucciones para el estudiante (tiempo, materiales permitidos, recomendaciones).\n\n' +
      '2. <h2>Instrumento de Evaluación</h2>\n' +
      '   - Redacta la prueba completa dirigida al estudiante, con el espacio de puntaje "(__/X pts)" al lado de cada ítem.\n' +
      '   - Numera las preguntas de forma CONTINUA del 1 al ' + totalItems + ' (no reinicies la numeración entre ítems).\n' +
      '   - NO marques las respuestas correctas en esta parte. NO incluyas claves, asteriscos ni pistas.\n' +
      '   - Estructúrala SOLO con las secciones siguientes (cada una con su <h3>), omitiendo las que tengan cantidad 0:\n\n' +

      secciones +

      refsLiteral +

      '====================================================\n' +
      'PARTE 2 — VERSIÓN PROFESOR\n' +
      '====================================================\n' +
      'Después del último ítem de la Parte 1, abre la Parte 2 con un salto de página: <div class="page-break"></div>\n' +
      'Comienza esta parte con:\n' +
      '   <p class="doc-version-tag doc-version-tag--prof"><strong>Versión Profesor</strong></p>\n' +
      '   <h1>Versión Profesor — Material del Docente</h1>\n' +
      '   <p><em>Esta sección es de uso exclusivo del docente. No debe entregarse al estudiante.</em></p>\n\n' +

      '3. <h2>Tabla de Especificaciones</h2>\n' +
      '   - Genera una <table> con estas columnas exactas:\n' +
      '     "N° de pregunta | Tipo de Ítem | Habilidad cognitiva | Contenido | Puntaje".\n' +
      '   - Una fila por CADA pregunta del instrumento (exactamente ' + totalItems + ' filas).\n' +
      '   - La columna Puntaje DEBE coincidir con el puntaje individual indicado en cada pregunta de la Versión Estudiante.\n' +
      '   - Al final de la tabla, agrega una fila TOTAL con la suma. La suma DEBE SER EXACTAMENTE ' + ctx.puntaje + ' pts. Si no suma, revisa fila por fila y corrige antes de entregar.\n\n' +

      '4. <h2>Pauta de Corrección</h2>\n' +
      '   - <h3>Respuestas — Ítems objetivos</h3>: entrega las respuestas exactas para todos los ítems con respuesta única (Selección Múltiple, V/F, Completar, Pareados, Aplicación cuando aplique), referenciándolas por su número (ej: "1. C", "2. V", "3. F — Justificación correcta: ..."). Para V/F incluye la justificación correcta de las afirmaciones falsas.\n' +
      '   - <h3>Respuesta Esperada — Ítems abiertos</h3>: párrafo breve con los elementos centrales que la respuesta debe contener para los ítems de Análisis de Caso y Desarrollo (si fueron incluidos), también referenciados por número de pregunta.\n\n' +

      '5. <h2>Rúbrica Analítica — Ítems abiertos</h2>\n' +
      '   - <table> con columnas exactas:\n' +
      '     "Criterio | Logrado | Medianamente Logrado | Por Lograr", con 3 a 4 criterios (ej: comprensión del caso/tema, calidad de la argumentación, uso de conceptos disciplinares, claridad y estructura). Describe brevemente qué debe demostrar el estudiante en cada nivel.\n\n' +

      'REGLAS DE CUMPLIMIENTO (CRÍTICAS — el documento será descartado si no se respetan):\n' +
      '- La cantidad TOTAL de preguntas en el Instrumento (Parte 1) DEBE ser exactamente ' + totalItems + '. No generes menos. Si una sección dice "Genera N preguntas", DEBES escribir las N preguntas, sin truncar, sin reemplazar por "(...)" ni "y así sucesivamente".\n' +
      '- Antes de cerrar el documento, recuenta los ítems escritos por sección y verifica que la suma sea ' + totalItems + '.\n' +
      '- En la Parte 2 (Versión Profesor) NO repitas el enunciado completo de las preguntas: refiérete a ellas por número.\n' +
      '- No incluyas ningún texto explicativo, comentarios meta ni introducciones fuera de los <h1>/<h2>/<h3> indicados.\n\n' +

      (ctx.valoresStr
          ? 'INTEGRACIÓN DE VALORES MBE:\n' +
            '- Cuando sea natural, refleja las actitudes ' + ctx.valoresStr + ' en los contextos de los ítems de Aplicación o Caso. NO crees una sección aparte de "valores".\n\n'
          : '') +

      _promptReglasComunes() +
      '\nGenera ahora SOLO el cuerpo HTML de la Prueba Sumativa siguiendo EXACTAMENTE esta estructura: PARTE 1 (Versión Estudiante con ' + totalItems + ' preguntas numeradas continuamente del 1 al ' + totalItems + ', sin respuestas marcadas) seguida de PARTE 2 (Versión Profesor con Tabla de Especificaciones, Pauta y Rúbrica, referenciando preguntas por número).';
  }

  /**
   * Prompt para Guía de Ejercicios (didáctica disciplinar por niveles).
   *
   * Basado en el prompt entregado por Eduardo: la IA actúa como Especialista
   * en Didáctica Disciplinar y diseña una guía intensiva con 3 niveles de
   * dificultad creciente (40% mecanización / 40% aplicación con variables /
   * 20% desafío de síntesis), Caja de Herramientas breve y solucionario
   * completo al final.
   */
  function _promptEvaluacion(ctx) {
      var hab = (ctx.habilidad || '').trim();
      var habDet = (ctx.habilidadDetalle || '').trim();
      var habilidadStr = '';
      if (hab && hab !== 'Otro') habilidadStr = hab;
      if (habDet) habilidadStr = habilidadStr ? (habilidadStr + ' — ' + habDet) : habDet;
      if (!habilidadStr) habilidadStr = 'A inferir del OA y del contenido (usa el verbo principal del Objetivo de Aprendizaje)';

      // Cantidad de ejercicios viene del bloque cfgHabilidad (input ejCantidad).
      // ctx.cantPreg es fallback por si el bloque no se pobló.
      var totalEj = ctx.cantEjercicios || ctx.cantPreg || 15;
      // Distribución 40/40/20 con redondeos seguros (total exacto)
      var nN1 = Math.round(totalEj * 0.40);
      var nN3 = Math.max(2, Math.round(totalEj * 0.20));
      var nN2 = totalEj - nN1 - nN3;
      if (nN2 < 1) { nN2 = 1; nN1 = totalEj - nN2 - nN3; }

      var refsLiteral = '';
      if (ctx.materialReferencia && ctx.materialReferencia.trim().length > 5) {
          refsLiteral = '\nEJERCICIOS LITERALES aportados por el docente que DEBEN incluirse tal cual (distribúyelos según su dificultad entre los 3 niveles, sin reescribirlos):\n"""\n' + ctx.materialReferencia.trim() + '\n"""\n';
      }

      return 'Actúa como un Especialista en Didáctica Disciplinar y diseñador de material práctico. ' +
      'Tu tarea es construir una Guía de Ejercicios intensiva, estructurada por niveles de dificultad, diseñada para que los estudiantes logren maestría y fluidez en una habilidad específica.\n\n' +

      'INSTITUCIÓN: ' + ctx.nombreInst + '\n' +
      'PROFESOR: ' + (ctx.profesor || 'Docente del curso') + '\n\n' +

      '═══════════════════════════════════════════════\n' +
      'DATOS DE LA GUÍA\n' +
      '═══════════════════════════════════════════════\n' +
      '• Asignatura: ' + ctx.modNombre + '\n' +
      '• Nivel: ' + ctx.cursoTexto + '\n' +
      '• Contenido / Eje: ' + ctx.contenido + '\n' +
      '• Habilidad a ejercitar: ' + habilidadStr + '\n' +
      '• Cantidad total de ejercicios: ' + totalEj + ' (distribución obligatoria 40/40/20: Nivel 1 = ' + nN1 + ' · Nivel 2 = ' + nN2 + ' · Nivel 3 = ' + nN3 + ')\n' +
      '• Dificultad general: ' + ctx.difTexto + '\n' +
      '• Objetivo(s) de Aprendizaje (OA):\n' + ctx.oaTexto + '\n' +
      (ctx.valoresStr ? '• Valores institucionales transversales: ' + ctx.valoresStr + '\n' : '') +
      refsLiteral +

      '\n═══════════════════════════════════════════════\n' +
      'ESTRUCTURA OBLIGATORIA DE LA GUÍA (DIRIGIDA AL ESTUDIANTE)\n' +
      '═══════════════════════════════════════════════\n' +
      'NO incluyas grandes bloques de teoría. Ve directo a la práctica, con tono motivador.\n\n' +

      '1) ENCABEZADO: espacio para Nombre, Fecha, Curso y el Objetivo de la guía (formulado con verbo en infinitivo, ej: "Objetivo: Ejercitar la resolución de…").\n\n' +

      '2) LA CAJA DE HERRAMIENTAS (ayuda memoria): un recuadro MUY BREVE (2 a 3 líneas o viñetas) que contenga la regla principal, la fórmula clave, o los pasos del procedimiento que el estudiante debe recordar para no quedarse bloqueado mientras practica. Renderízalo como un bloque visualmente distintivo (caja con borde, fondo claro o destacado).\n\n' +

      '3) NIVEL 1 — CALENTAMIENTO (Mecanización básica) — ' + nN1 + ' ejercicios:\n' +
      '   Aplicación directa y sencilla de la regla/fórmula/procedimiento. Ejercicios predecibles, números enteros pequeños, sin trampas, para construir confianza y mecanizar el procedimiento. Cada ejercicio debe tener espacio para que el estudiante escriba su respuesta o desarrollo.\n\n' +

      '4) NIVEL 2 — ENTRENAMIENTO (Aplicación con variables) — ' + nN2 + ' ejercicios:\n' +
      '   Sube la dificultad. Incluye pequeñas "trampas", excepciones a la regla, números fraccionarios o decimales (si es matemática), conjugaciones irregulares (si es lengua), o situaciones donde el estudiante deba pensar un poco más antes de aplicar la regla. Cada ejercicio debe forzar una decisión consciente, no automática.\n\n' +

      '5) NIVEL 3 — EL DESAFÍO (Resolución de problemas / Síntesis) — ' + nN3 + ' ejercicios:\n' +
      '   Alta complejidad. Plantea problemas de planteo CONTEXTUALIZADOS en la vida real (con datos numéricos o textuales realistas), casos de análisis o ejercicios combinados donde el estudiante deba aplicar la habilidad de forma creativa o estratégica. Pueden requerir varios pasos o integrar conceptos.\n\n' +

      '6) SOLUCIONARIO COMPLETO (exclusivo para el docente) al final del documento, en una sección claramente diferenciada y rotulada como "Solucionario — Uso del docente":\n' +
      '   • Respuestas correctas de TODOS los ejercicios de los Niveles 1 y 2 (basta el resultado).\n' +
      '   • Para los ejercicios del Nivel 3: incluye desarrollo breve o justificación de la respuesta (no solo el resultado), explicando los pasos clave o el razonamiento esperado.\n\n' +

      _promptReglasComunes() +
      '\nGenera ahora SOLO el cuerpo HTML de la Guía de Ejercicios siguiendo EXACTAMENTE esta estructura: ' +
      '(1) Encabezado con datos del estudiante y objetivo; ' +
      '(2) Caja de Herramientas; ' +
      '(3) Nivel 1 con ' + nN1 + ' ejercicios numerados 1 a ' + nN1 + '; ' +
      '(4) Nivel 2 con ' + nN2 + ' ejercicios numerados ' + (nN1 + 1) + ' a ' + (nN1 + nN2) + '; ' +
      '(5) Nivel 3 con ' + nN3 + ' ejercicios contextualizados numerados ' + (nN1 + nN2 + 1) + ' a ' + totalEj + '; ' +
      '(6) Solucionario completo. ' +
      'Mantén el tono motivador, lenguaje directo, sin teoría extensa.';
  }

  /**
   * Prompt para Evaluación Diferenciada (NEE / PIE).
   *
   * Basado en el prompt entregado por Eduardo, alineado a los Decretos 83
   * y 67 del MINEDUC Chile. La IA actúa como Educador Diferencial / Coordinador
   * PIE y adapta un instrumento sumativo tradicional para un estudiante con
   * NEE, aplicando adecuaciones de acceso o significativas según corresponda.
   */
  function _promptDiferenciada(ctx) {
      var diag = ctx.pieDiagnostico || 'No especificado';
      var ade  = ctx.pieAdecuacion  || 'acceso';
      var obs  = ctx.pieObservaciones || '';
      var adeNombre = (ade === 'significativa')
          ? 'Adecuación Significativa / PACI (puede ajustar la dificultad cognitiva del OA según el Plan de Adecuación Curricular Individual)'
          : 'Solo de Acceso (NO bajes la dificultad cognitiva, solo adapta el formato y la mediación)';

      // ═══════════════════════════════════════════════════════
      //  NUEVO ENFOQUE: ADAPTACIÓN, NO REGENERACIÓN
      //  Si recibimos la prueba estándar generada, la pasamos como
      //  referencia para que Gemini la adapte item por item, no que
      //  genere una prueba diferente.
      // ═══════════════════════════════════════════════════════
      var tienePruebaOriginal = !!(ctx.pruebaOriginalHTML && ctx.pruebaOriginalHTML.trim().length > 200);

      // Reglas PIE específicas según el diagnóstico
      var reglasPorDiagnostico = {
          'TDAH':          '- Instrucciones SEGMENTADAS y al inicio de cada ítem en una sola línea, con verbo de acción en <strong>negrita</strong>.\n- Reducir distractores visuales (no recargar la página, usar mucho espacio en blanco entre preguntas).\n- En preguntas de selección múltiple, mantener la cantidad de alternativas original pero asegurar enunciados cortos.\n- Tiempo sugerido +50% del original.\n- Permitir que el estudiante marque cada pregunta antes de responder (checkbox o casilla).\n',
          'TEA':           '- Lenguaje MUY literal: eliminar metáforas, sarcasmo, lenguaje figurado.\n- Instrucciones predecibles y secuenciadas: "Primero…", "Después…", "Por último…".\n- Apoyo visual: iconos o pictogramas asociados a cada tipo de tarea cuando sea posible.\n- Mantener la estructura visual idéntica entre preguntas (predecibilidad).\n- En desarrollo: ofrecer 2-3 ejemplos del formato de respuesta esperado.\n',
          'Dislexia':      '- Fuente sugerida grande (sugerir Arial/Verdana 13-14pt), alto interlineado.\n- Separar visualmente sílabas en palabras técnicas largas la primera vez que aparecen.\n- Evitar bloques de texto densos: cada idea en una línea.\n- Apoyar enunciados con esquemas/diagramas cuando exista cálculo o procedimiento.\n- Tiempo extra; permitir lectura en voz alta por el docente.\n',
          'Discalculia':   '- Apoyar todo cálculo con tablas auxiliares (multiplicar, conversiones, fórmulas).\n- Permitir calculadora.\n- Para problemas con cálculo: incluir los datos ya organizados en una tabla "Datos / Incógnita / Fórmula" al lado del enunciado.\n- Reducir ítems con cálculo puro; preferir interpretación de gráficos o resultados ya dados.\n',
          'Disgrafía':     '- Permitir respuestas marcadas con X o líneas más que escritura larga.\n- En desarrollo: ofrecer alternativa oral o esquema/dibujo en vez de redacción.\n- Líneas amplias para respuestas escritas.\n- Evaluar contenido, no caligrafía ni ortografía (a menos que esto último sea el OA).\n',
          'TEL':           '- Vocabulario simplificado pero preservando los términos técnicos clave del OA (definirlos brevemente entre paréntesis la primera vez).\n- Apoyo visual (banco de palabras) en preguntas de completar.\n- Iniciadores de oración ("Yo creo que… porque…") en preguntas de desarrollo.\n- Permitir respuestas más cortas; evaluar comprensión por sobre extensión.\n- Tiempo extra.\n',
          'Hipoacusia':    '- Apoyo gráfico cuando haya conceptos abstractos.\n- Instrucciones SIEMPRE por escrito (no asumir comprensión auditiva).\n- Vocabulario claro, evitar idiomas o préstamos no familiares.\n- Si la evaluación tenía audio o lectura en voz alta, ofrecer transcripción adjunta.\n',
          'Baja visión':   '- Sugerir fuente 16pt mínimo, alto contraste (negro sobre blanco), espaciado amplio.\n- Imágenes/diagramas con descripción textual también (alt text).\n- Espacios amplios para escribir respuesta.\n- Tiempo extra significativo.\n',
          'Déficit intelectual': '- Adecuación Significativa: ajustar la dificultad cognitiva. Reducir cantidad de ítems al 60% del original priorizando los de complejidad básica/media.\n- Lenguaje claro y oraciones cortas.\n- Apoyo visual constante.\n- Preferir reconocimiento (selección) sobre producción (desarrollo).\n',
          'Motor':         '- Permitir respuesta digital, oral o marcada (no obligar a escritura manual extensa).\n- Espacios amplios para marcar respuestas.\n- Si hay tareas que requieren manipulación física, ofrecer alternativa.\n',
          'Emocional':     '- Reducir presión visual (no usar rojo en titulares ni "AVISO" en mayúsculas).\n- Indicar tiempos de descanso permitidos.\n- Instrucciones con tono cálido pero claro.\n- Posibilidad de saltar un ítem y volver después.\n',
          'Altas capacidades':'- Mantener la prueba estándar igual.\n- Agregar al final 1-2 preguntas de extensión/profundización (no obligatorias) que apliquen el contenido a problemas más complejos o transversales.\n'
      };
      // Match flexible (el diag puede venir como "TDAH" o "TDAH — Déficit Atencional")
      var reglasDiag = '';
      Object.keys(reglasPorDiagnostico).forEach(function(k) {
          if (diag.toUpperCase().indexOf(k.toUpperCase()) !== -1 || k.toUpperCase().indexOf(diag.toUpperCase()) !== -1) {
              reglasDiag = reglasPorDiagnostico[k];
          }
      });
      if (!reglasDiag) {
          reglasDiag = '- Adecuación de acceso según el diagnóstico: segmentar instrucciones, reducir distractores, ofrecer apoyo visual cuando sea posible, tiempo extra.\n- NO bajes la dificultad cognitiva ni cambies los OAs.\n';
      }

      // ── Si tenemos la prueba estándar, prompt de ADAPTACIÓN (preferido) ──
      if (tienePruebaOriginal) {
          // Limpiamos algunos elementos del header institucional para no duplicarlos
          // (el header se regenera en el cliente). Pasamos solo el cuerpo útil.
          var pruebaParaIA = ctx.pruebaOriginalHTML;
          // Cortar si es muy largo (proteger tokens del prompt)
          if (pruebaParaIA.length > 35000) {
              pruebaParaIA = pruebaParaIA.substring(0, 35000) + '\n[...prueba truncada por extensión...]';
          }
          return 'Actúa como Educador Diferencial experto y Coordinador PIE alineado a Decretos 83 y 67 del MINEDUC Chile.\n\n' +
              'Tu tarea es ADAPTAR (no regenerar) la siguiente prueba estándar para un estudiante con diagnóstico ' + diag + ', aplicando ' + adeNombre + '.\n\n' +
              '═══════ PRINCIPIO FUNDAMENTAL ═══════\n' +
              'La prueba PIE debe ser la MISMA que la estándar: mismos contenidos, mismos OAs, mismas habilidades cognitivas y MISMA CANTIDAD DE PREGUNTAS. Solo cambia el FORMATO y la MEDIACIÓN según el diagnóstico.\n' +
              (ade === 'acceso'
                  ? 'NO modifiques los conceptos evaluados, NO simplifiques la dificultad cognitiva, NO reduzcas el número de ítems. Solo aplica adaptaciones de PRESENTACIÓN y APOYOS DE ACCESO.\n'
                  : 'Como es Adecuación Significativa (PACI), puedes ajustar la complejidad y reducir cantidad de ítems al 60-70%, priorizando los de complejidad básica/media. Mantén la temática y el OA.\n') +
              '═══════════════════════════════════════\n\n' +
              '── DATOS DEL ESTUDIANTE ──\n' +
              'Diagnóstico NEE: ' + diag + '\n' +
              'Tipo de Adecuación: ' + adeNombre + '\n' +
              (obs ? 'Observaciones del estudiante:\n' + obs + '\n' : '') + '\n' +
              '── ADAPTACIONES ESPECÍFICAS PARA ' + diag.toUpperCase() + ' ──\n' +
              reglasDiag + '\n' +
              '── PRUEBA ESTÁNDAR A ADAPTAR (HTML original) ──\n' +
              '"""\n' + pruebaParaIA + '\n"""\n\n' +
              '── INSTRUCCIONES DE SALIDA ──\n' +
              '1. Mantén EXACTAMENTE la misma estructura del documento original (encabezado, título, meta, items numerados, pauta).\n' +
              '2. Mantén el MISMO número de ítems y el MISMO contenido evaluado en cada uno.\n' +
              '3. Cambia ÚNICAMENTE la presentación y los apoyos según las reglas del diagnóstico arriba.\n' +
              '4. Agrega al INICIO del documento una sección "ORIENTACIONES PIE PARA EL DOCENTE" (4-6 líneas) explicando qué adaptaciones específicas se aplicaron para este diagnóstico.\n' +
              '5. Mantén la "Tabla de Especificaciones" y la "Pauta de Corrección" que tenía la prueba original (las respuestas son las mismas).\n' +
              '6. Si aplicaste "Adecuación Significativa" y redujiste ítems, indícalo en la sección PIE para el docente.\n\n' +
              _promptReglasComunes() +
              '\nDevuelve SOLO el cuerpo HTML del documento adaptado. NO incluyas marcadores tipo ```html. NO comentes tu proceso. Comienza directamente con la sección "ORIENTACIONES PIE PARA EL DOCENTE" seguida del instrumento adaptado.';
      }

      // ── Fallback: si por algún motivo no tenemos la prueba original, generar desde cero ──
      var refsLiteral = '';
      if (ctx.materialReferencia && ctx.materialReferencia.trim().length > 5) {
          refsLiteral = '\nMATERIAL DE REFERENCIA aportado por el docente:\n"""\n' + ctx.materialReferencia.trim() + '\n"""\n';
      }

      return 'Actúa como un Educador Diferencial experto, Coordinador PIE y evaluador alineado a los Decretos 83 y 67 del MINEDUC Chile. ' +
      'Tu tarea es generar un instrumento de evaluación sumativa adaptado para un estudiante con Necesidades Educativas Especiales (NEE).\n\n' +

      'INSTITUCIÓN: ' + ctx.nombreInst + '\n' +
      'PROFESOR: ' + (ctx.profesor || 'Docente del curso') + '\n\n' +

      '═══════════════════════════════════════════════\n' +
      'DATOS DE LA EVALUACIÓN ORIGINAL\n' +
      '═══════════════════════════════════════════════\n' +
      '• Asignatura: ' + ctx.modNombre + '\n' +
      '• Nivel: ' + ctx.cursoTexto + '\n' +
      '• Objetivo(s) de Aprendizaje (OA):\n' + ctx.oaTexto + '\n' +
      '• Tema Específico: ' + ctx.contenido + '\n' +
      '• Dificultad de la prueba original: ' + ctx.difTexto + '\n' +
      (ctx.valoresStr ? '• Valores institucionales transversales: ' + ctx.valoresStr + '\n' : '') +
      refsLiteral +

      '\n═══════════════════════════════════════════════\n' +
      'DATOS DEL ESTUDIANTE (DIAGNÓSTICO PIE)\n' +
      '═══════════════════════════════════════════════\n' +
      '• Diagnóstico NEE: ' + diag + '\n' +
      '• Tipo de Adecuación: ' + adeNombre + '\n' +
      (obs ? '• Observaciones adicionales del estudiante:\n  ' + obs + '\n' : '') +

      '\n═══════════════════════════════════════════════\n' +
      'ESTRUCTURA Y REGLAS PARA LA CREACIÓN DEL INSTRUMENTO DIFERENCIADO\n' +
      '═══════════════════════════════════════════════\n\n' +

      '1) ORIENTACIONES PIE (Para el docente):\n' +
      'Redacta un breve párrafo (3–5 líneas) indicando qué estrategias específicas se utilizaron en esta prueba para atender al diagnóstico ' + diag + ' (por ejemplo: apoyo visual, segmentación de instrucciones, reducción de distractores, banco de palabras, iniciadores de oración, andamiaje, tiempos extendidos, etc.). Esta sección va al INICIO del documento, claramente diferenciada.\n\n' +

      '2) EL INSTRUMENTO ADAPTADO (Para el estudiante):\n' +
      'Adapta la prueba utilizando lenguaje directo, instrucciones parceladas (paso a paso) y destacando en <strong>negrita</strong> las palabras clave de instrucción (ej: <strong>subraya</strong>, <strong>marca</strong>, <strong>explica</strong>).\n\n' +

      // ── Construcción dinámica según los tipos que el profe eligió ──
      (function() {
          var counts = ctx.itemCounts || {};
          // Mapeo: tipo del formulario → reglas PIE específicas
          var REGLAS = {
              alternativas: {
                  titulo: 'Selección Múltiple Adaptada',
                  descripcion: function(n) {
                      return 'Genera ' + (n || 5) + ' preguntas. Regla PIE: reduce a SOLO 3 alternativas (A, B, C). Elimina dobles negaciones y distractores capciosos. Oraciones cortas y directas.';
                  }
              },
              vf: {
                  titulo: 'Verdadero o Falso Amigable',
                  descripcion: function(n) {
                      return 'Genera ' + (n || 4) + ' afirmaciones claras y literales (sin sarcasmos, sin lenguaje figurado). Regla PIE: NO exijas justificación de cada falsa; o bien pide que el estudiante elija UNA y justifique solo esa.';
                  }
              },
              completar: {
                  titulo: 'Completar con Apoyo Visual',
                  descripcion: function(n) {
                      return 'Párrafo breve con ' + (n || 4) + ' espacios en blanco. Regla PIE: incluye un "banco de palabras" ARRIBA del texto con las opciones (en tabla o caja claramente delimitada) para que el estudiante seleccione visualmente.';
                  }
              },
              emparejar: {
                  titulo: 'Términos Pareados Reducidos',
                  descripcion: function(n) {
                      return '2 columnas, MÁXIMO ' + Math.min(n || 4, 6) + ' conceptos. Regla PIE: descripciones directas. ' + (diag === 'TEA' || diag === 'Dislexia' ? 'IMPORTANTE diag ' + diag + ': sugiere unir con líneas de colores diferentes.' : 'Si el estudiante tuviera TEA o Dislexia, sugiere unir con líneas de colores.');
                  }
              },
              caso: {
                  titulo: 'Análisis de Caso Guiado',
                  descripcion: function(n) {
                      return 'Plantea ' + (n || 1) + ' caso(s) o problema(s). Regla PIE: SEGMENTA en 3 pasos consecutivos. Paso 1: identifica datos. Paso 2: ¿qué concepto/fórmula usar? Paso 3: resuelve.';
                  }
              },
              desarrollo: {
                  titulo: 'Desarrollo con Andamiaje',
                  descripcion: function(n) {
                      return (n || 1) + ' pregunta(s) de desarrollo. Regla PIE: incluye "iniciadores de oraciones" (ej: "Yo creo que la causa fue ______ porque…"). ' + (ade === 'significativa' ? 'Adecuación Significativa: permite EXPLÍCITAMENTE responder con dibujo o esquema simple si el alumno lo prefiere.' : 'Adecuación de Acceso: mantén exigencia conceptual del OA.');
                  }
              },
              corta: {
                  titulo: 'Respuesta Corta Guiada',
                  descripcion: function(n) {
                      return (n || 4) + ' preguntas de respuesta corta (1-2 líneas). Regla PIE: oraciones simples como pregunta, con palabra clave en <strong>negrita</strong>. Incluye 1-2 ejemplos de respuesta esperada al inicio para que el estudiante entienda el formato.';
                  }
              }
          };
          // Orden de aparición (mismo orden estándar pedagógico)
          var ORDEN = ['alternativas','vf','completar','emparejar','corta','caso','desarrollo'];
          var roman = ['I','II','III','IV','V','VI','VII'];
          var bloque = '';
          var idx = 0;
          ORDEN.forEach(function(tipo) {
              var cantidad = counts[tipo] || 0;
              if (cantidad <= 0) return;
              var regla = REGLAS[tipo];
              if (!regla) return;
              bloque += '   • ÍTEM ' + roman[idx] + ' — ' + regla.titulo + ': ' + regla.descripcion(cantidad) + '\n\n';
              idx++;
          });
          // Fallback: si no se eligió ningún tipo (raro), generar solo SM
          if (!bloque) {
              bloque = '   • ÍTEM I — Selección Múltiple Adaptada: 5 preguntas. Regla PIE: 3 alternativas (A, B, C), sin distractores capciosos.\n\n';
          }
          return 'Genera EXACTAMENTE los siguientes ítems adaptados (solo los que se listan, NO agregues más tipos):\n\n' + bloque;
      })() +

      '3) PAUTA DE CORRECCIÓN DIFERENCIADA (al final del documento, en una sección "Para el docente / PIE"):\n' +
      '   • Entrega las RESPUESTAS EXACTAS para los ítems I a V.\n' +
      '   • Para el ítem VI (desarrollo), entrega una RÚBRICA flexible que valore el esfuerzo y la comprensión del concepto central por sobre la ortografía o redacción, a menos que la ortografía sea el objetivo específico evaluado. La rúbrica debe tener al menos 3 niveles (Logrado / Medianamente logrado / Por lograr) con criterios observables.\n\n' +

      _promptReglasComunes() +
      '\nGenera ahora SOLO el cuerpo HTML del documento siguiendo EXACTAMENTE esta estructura: ' +
      '(1) Encabezado institucional con título "EVALUACIÓN DIFERENCIADA"; ' +
      '(2) Sección "Orientaciones PIE para el docente"; ' +
      '(3) Sección "Instrumento adaptado para el estudiante" con SOLO los ítems listados arriba (NO agregues más tipos de ítem, respeta exactamente los tipos que el profe eligió); ' +
      '(4) Sección "Pauta de corrección diferenciada (uso del docente / PIE)" con respuestas exactas y, si hubo ítems de desarrollo, una rúbrica de 3 niveles (Logrado / Medianamente logrado / Por lograr). ' +
      'NO incluyas Tabla de Especificaciones tipo prueba sumativa estándar (ese instrumento no aplica para evaluaciones diferenciadas).';
  }

  /**
   * Prompt genérico (fallback) para tipos aún no rediseñados.
   * Mantiene el comportamiento previo.
   */
  function _promptGenerico(ctx) {
      var counts = ctx.itemCounts || {};
      var distLines = [];
      var labels = { sm:'Selección múltiple', vf:'Verdadero/Falso', completar:'Completar', emparejar:'Términos pareados', aplicacion:'Aplicación / ejercicio práctico', caso:'Análisis de caso', desarrollo:'Desarrollo / argumentación' };
      for (var k in counts) {
          if (counts.hasOwnProperty(k) && counts[k] > 0) distLines.push('  · ' + (labels[k] || k) + ': ' + counts[k] + ' ítem(es)');
      }
      var distBlock = distLines.length ? ('DISTRIBUCIÓN POR TIPO DE ÍTEM (respétala estrictamente):\n' + distLines.join('\n') + '\n') : '';
      var nAlt = ctx.cantAlternativas || 4;
      var letrasAlt = ['A','B','C','D','E'].slice(0, nAlt).join(', ');
      var refsLiteral = '';
      if (ctx.materialReferencia && ctx.materialReferencia.trim().length > 5) {
          refsLiteral = '\nPREGUNTAS O EJERCICIOS QUE DEBEN INCLUIRSE LITERALMENTE (sin reescribir):\n"""\n' + ctx.materialReferencia.trim() + '\n"""\n';
      }
      return 'Eres un experto en educación chilena MINEDUC con conocimiento del currículum nacional vigente. ' +
      'Genera el CUERPO de un documento educativo en HTML para imprimir en clase.\n\n' +
      _promptDatos(ctx) +
      (ctx.bloomNames ? 'NIVELES COGNITIVOS BLOOM: ' + ctx.bloomNames + '\n' : '') +
      (ctx.tiposNames ? 'TIPOS DE PREGUNTAS: ' + ctx.tiposNames + '\n' : '') +
      'CANTIDAD TOTAL DE PREGUNTAS/ÍTEMS: ' + ctx.cantPreg + ' (máximo permitido: 40)\n' +
      'CANTIDAD DE ALTERNATIVAS POR PREGUNTA DE SELECCIÓN MÚLTIPLE: ' + nAlt + ' (' + letrasAlt + ')\n' +
      distBlock +
      'PUNTAJE TOTAL: ' + ctx.puntaje + ' puntos\n' +
      refsLiteral + '\n' +
      'ESTRUCTURA SUGERIDA (adáptala al tipo): 1) instrucciones generales breves, 2) marco teórico/contexto si aplica, 3) actividades/preguntas/ítems numerados respetando la distribución arriba, 4) cierre o autoevaluación.\n' +
      '- Para selección múltiple: incluye exactamente ' + nAlt + ' alternativas (' + letrasAlt + ') con texto real, una correcta marcada SOLO en una clave de respuestas al final entre comentarios <!-- -->.\n' +
      '- Para verdadero/falso: escribe la afirmación completa.\n' +
      (ctx.valoresStr ? '- Integra las actitudes MBE/OAT (' + ctx.valoresStr + ') de forma natural en las consignas.\n' : '') +
      '\n' + _promptReglasComunes() +
      '\nGenera ahora SOLO el cuerpo del documento:';
  }

  /**
   * Dispatcher: devuelve el prompt apropiado para el tipo de documento.
   * Si el profe tiene formatoPAES habilitado Y eligió formato 'paes',
   * usa prompts PAES por competencia para prueba/evaluacion/guia.
   */
  function _buildPromptPorTipo(tipo, ctx) {
      // Atajo PAES (solo para tipos compatibles)
      if (ctx && ctx.formatoActivo === 'paes' && ['prueba','evaluacion','guia'].indexOf(tipo) !== -1) {
          return _promptPAES(tipo, ctx);
      }
      // Atajo SIMCE (solo para tipos compatibles)
      if (ctx && ctx.formatoActivo === 'simce' && ['prueba','evaluacion','guia'].indexOf(tipo) !== -1) {
          return _promptSIMCE(tipo, ctx);
      }
      if (tipo === 'guia')         return _promptGuia(ctx);
      if (tipo === 'apunte')       return _promptApunte(ctx);
      if (tipo === 'evaluacion')   return _promptEvaluacion(ctx);
      if (tipo === 'prueba')       return _promptPrueba(ctx);
      // 'control' usa el prompt genérico. _promptDiferenciada se invoca solo
      // desde el flujo dual de Prueba (toggle PIE adjunto), no como tipo standalone.
      return _promptGenerico(ctx);
  }

  // ─────────────────────────────────────────────────────────
  //  PROMPT PAES — pruebas, evaluaciones, guías de entrenamiento
  //  Soporta competencias: lectora, m1, m2, ciencias, historia
  // ─────────────────────────────────────────────────────────
  var PAES_INFO = {
    lectora:  { nombre:'Competencia Lectora',           ejes:'Localizar / Interpretar y relacionar / Reflexionar',                             alt:5, instr:'Estímulos textuales (literarios, no literarios, infografías, gráficos). Cada estímulo con 4–8 preguntas asociadas.' },
    m1:       { nombre:'Matemática M1 (común)',         ejes:'Números / Álgebra y Funciones / Geometría / Probabilidad y Estadística',         alt:5, instr:'Contextos cotidianos chilenos, tablas y gráficos. Habilidades: resolver problemas, modelar, representar, argumentar.' },
    m2:       { nombre:'Matemática M2 (electivo)',      ejes:'Números complejos / Álgebra y funciones avanzado / Geometría / Estadística inferencial', alt:5, instr:'Contextos disciplinares más abstractos. Habilidades superiores: argumentar y demostrar.' },
    ciencias: { nombre:'Ciencias (Bio/Fís/Quím)',       ejes:'Habilidades científicas / Biología / Física / Química',                          alt:5, instr:'Estímulos: experimentos, datos, gráficos, esquemas. Habilidades: interpretar evidencia, formular hipótesis, modelar.' },
    historia: { nombre:'Historia y Cs Sociales',        ejes:'Pensamiento histórico / Geográfico / Formación ciudadana / Análisis de fuentes', alt:5, instr:'Fuentes primarias y secundarias: documentos, mapas, gráficos. Habilidades: análisis de fuentes, multicausalidad, perspectivas históricas.' },
    ingles:   { nombre:'Inglés — Reading Comprehension', ejes:'Reading for gist / Specific information / Inference / Vocab in context / Author intent', alt:5, instr:'Textos auténticos en inglés (200-400 palabras, B1-B2 MCER). 4-6 preguntas por texto en inglés con 5 alternativas en inglés. Estructura tipo PAES.' }
  };
  function _promptPAES(tipo, ctx) {
    var compKey = (ctx.competenciaPaes || 'lectora').toLowerCase();
    var comp    = PAES_INFO[compKey] || PAES_INFO.lectora;
    var nItems  = ctx.cantPreg || (compKey === 'lectora' ? 12 : 15);
    var tipoLabel = { prueba:'PRUEBA PAES', evaluacion:'EVALUACIÓN TIPO PAES', guia:'GUÍA DE ENTRENAMIENTO PAES' }[tipo] || 'INSTRUMENTO PAES';
    var taxLine = '';
    if (ctx.taxonomia === 'marzano') {
      taxLine = '\nNIVELES COGNITIVOS A APLICAR: Recuperación, Comprensión, Análisis, Utilización del Conocimiento. Distribuye los ítems en estos niveles.';
    } else if (ctx.bloomNames) {
      taxLine = '\nNIVELES COGNITIVOS A APLICAR: ' + ctx.bloomNames + '.';
    }
    var instrucciones =
      'Eres especialista en evaluación PAES (DEMRE, Chile). Construyes ítems alineados con el formato oficial vigente.\n' +
      'Competencia: ' + comp.nombre + '\n' +
      'Ejes a cubrir: ' + comp.ejes + '\n' +
      'Formato obligatorio: ' + comp.instr + ' Cada ítem con ' + comp.alt + ' alternativas (A–E), solo una correcta.\n' +
      'No se descuenta puntaje por respuestas incorrectas (PAES vigente).' + taxLine + '\n\n' +
      '── DATOS DEL DOCUMENTO ──\n' +
      'Institución: ' + (ctx.nombreInst || '_____') + '\n' +
      'Profesor(a): ' + (ctx.profesor || '_____') + '\n' +
      'Asignatura/Módulo: ' + (ctx.modNombre || '_____') + '\n' +
      'Curso/Nivel: ' + (ctx.cursoTexto || '_____') + '\n' +
      (ctx.contenido ? 'Contenido específico: ' + ctx.contenido + '\n' : '') +
      (ctx.oaTexto   ? '\nOA(s) Mineduc:\n' + ctx.oaTexto + '\n' : '') +
      (ctx.valoresStr ? '\nValores institucionales a incorporar (cuando sea natural): ' + ctx.valoresStr + '\n' : '') +
      (ctx.materialReferencia ? '\nMaterial / referencia literal a incluir tal cual:\n' + ctx.materialReferencia + '\n' : '') +
      '\nTotal de ítems requeridos: ' + nItems +
      '\nDificultad: ' + (ctx.difTexto || ctx.dificultad || 'intermedio') +
      '\n\n── ESTRUCTURA OBLIGATORIA DEL DOCUMENTO HTML ──\n' +
      '1. Encabezado institucional + datos del estudiante (nombre, curso, fecha).\n' +
      '2. INSTRUCCIONES GENERALES (cómo responder, no se descuenta puntaje, tiempo sugerido).\n' +
      (compKey === 'lectora'
        ? '3. Para cada estímulo: bloque <h2>TEXTO N — [título / tipo]</h2> con texto de 250–450 palabras, luego sus 4–8 preguntas. Repetir hasta sumar ' + nItems + ' ítems.\n'
        : compKey === 'ciencias'
          ? '3. Al menos 2 estímulos (experimento, tabla de datos, gráfico, esquema): <h2>ESTÍMULO N — [título]</h2> con descripción ≥120 palabras, luego sus preguntas (3–5 por estímulo).\n'
          : compKey === 'historia'
            ? '3. Fuentes primarias y secundarias (documentos, mapas, gráficos): <h2>FUENTE N — [autor/año/tipo]</h2> con cita o descripción 100–300 palabras, luego sus preguntas (2–5).\n'
            : compKey === 'ingles'
              ? '3. Textos en inglés (200-400 palabras, nivel B1-B2 MCER, géneros variados: article / blog / email / advertisement / infographic / literary fragment): <h2>TEXT N — [title / genre]</h2>. Cada texto con 4-6 preguntas IN ENGLISH con 5 alternatives IN ENGLISH. Las preguntas evalúan: gist, specific information, inference, vocab in context, author intent.\n'
            : '3. Distribuir ítems entre los ejes mencionados. Al menos un tercio con contexto/estímulo (tabla, gráfico, situación cotidiana).\n'
      ) +
      '4. Cada ítem: enunciado claro + 5 alternativas A) B) C) D) E). Distractores plausibles (errores conceptuales típicos).\n' +
      '5. <h2>CLAVE DE RESPUESTAS</h2>: tabla compacta con N° y letra correcta.\n' +
      '6. <h2>TABLA DE ESPECIFICACIONES</h2>: columnas <strong>N°</strong>, <strong>Eje PAES</strong>, <strong>Habilidad</strong>, <strong>Dificultad (F/M/D)</strong>, <strong>OA Mineduc</strong>, <strong>Nivel cognitivo</strong>.\n' +
      '7. <h2>JUSTIFICACIÓN / RESOLUCIÓN</h2>: para cada ítem, breve justificación de la clave correcta (1–3 líneas).\n\n' +
      'IMPORTANTE: Devuelve SOLO HTML del cuerpo (no <html>, <head>, <body>, ni marcadores de código).\n' +
      'Usa <h1> para el título, <h2> para secciones, <p>, <ol>/<ul>, <table>, <strong>. Mantén el documento legible y listo para imprimir.\n' +
      _promptFormatoHTML() +
      '\nGenera ahora el documento completo:';
    return instrucciones;
  }


  // ─────────────────────────────────────────────────────────
  //  PROMPT SIMCE — pruebas, evaluaciones, guías de entrenamiento
  //  Agencia de Calidad de la Educación (Chile).
  //  Pruebas: lectura, matematica, ciencias, historia.
  //  Niveles habituales: 4°B, 6°B, 8°B, 2°M.
  // ─────────────────────────────────────────────────────────
  var SIMCE_INFO = {
    lectura:    { nombre:'Comprensión de Lectura', ejes:'Localizar información / Relacionar e interpretar / Reflexionar sobre el texto', instr:'Textos literarios (cuentos, fábulas, poemas) y no literarios (noticias, infografías, instructivos, afiches). Cada texto con 4-8 preguntas asociadas.' },
    matematica: { nombre:'Matemática', ejes:'Números y operaciones / Patrones y álgebra / Geometría / Medición / Datos y probabilidades', instr:'Contextos cotidianos chilenos con tablas y gráficos. Habilidades: resolver problemas, representar, modelar y argumentar.' },
    ciencias:   { nombre:'Ciencias Naturales', ejes:'Ciencias de la Vida / Ciencias Físicas y Químicas / Ciencias de la Tierra y el Universo', instr:'Estímulos científicos: experimentos, tablas de datos, gráficos, esquemas. Habilidades de investigación científica: observar, predecir, interpretar evidencia, concluir.' },
    historia:   { nombre:'Historia, Geografía y Cs. Sociales', ejes:'Historia / Geografía / Formación Ciudadana / Economía', instr:'Fuentes variadas: mapas, líneas de tiempo, documentos, imágenes, gráficos. Habilidades: pensamiento temporal y espacial, análisis de fuentes, pensamiento crítico.' }
  };
  function _promptSIMCE(tipo, ctx) {
    var pruebaKey = (ctx.pruebaSimce || 'lectura').toLowerCase();
    var prueba    = SIMCE_INFO[pruebaKey] || SIMCE_INFO.lectura;
    var nItems    = ctx.cantPreg || 15;
    var tipoLabel = { prueba:'PRUEBA SIMCE', evaluacion:'EVALUACIÓN TIPO SIMCE', guia:'GUÍA DE ENTRENAMIENTO SIMCE' }[tipo] || 'INSTRUMENTO SIMCE';
    var taxLine = '';
    if (ctx.taxonomia === 'marzano') {
      taxLine = '\nNIVELES COGNITIVOS A APLICAR: Recuperación, Comprensión, Análisis, Utilización del Conocimiento. Distribuye los ítems en estos niveles.';
    } else if (ctx.bloomNames) {
      taxLine = '\nNIVELES COGNITIVOS A APLICAR: ' + ctx.bloomNames + '.';
    }
    var instrucciones =
      'Eres especialista en evaluación SIMCE (Agencia de Calidad de la Educación, Chile). Construyes ítems alineados con el formato oficial de las pruebas SIMCE y los Estándares de Aprendizaje del Mineduc.\n' +
      'Prueba SIMCE: ' + prueba.nombre + '\n' +
      'Ejes a cubrir: ' + prueba.ejes + '\n' +
      'Formato obligatorio: ' + prueba.instr + ' Cada ítem de selección múltiple con 4 alternativas (A-D), solo una correcta.\n' +
      'No se descuenta puntaje por respuestas incorrectas. Los ítems deben permitir clasificar el desempeño en los niveles de los Estándares de Aprendizaje: Insuficiente, Elemental y Adecuado.' + taxLine + '\n\n' +
      '── DATOS DEL DOCUMENTO ──\n' +
      'Institución: ' + (ctx.nombreInst || '_____') + '\n' +
      'Profesor(a): ' + (ctx.profesor || '_____') + '\n' +
      'Asignatura/Módulo: ' + (ctx.modNombre || '_____') + '\n' +
      'Curso/Nivel: ' + (ctx.cursoTexto || '_____') + '\n' +
      (ctx.contenido ? 'Contenido específico: ' + ctx.contenido + '\n' : '') +
      (ctx.oaTexto   ? '\nOA(s) Mineduc:\n' + ctx.oaTexto + '\n' : '') +
      (ctx.valoresStr ? '\nValores institucionales a incorporar (cuando sea natural): ' + ctx.valoresStr + '\n' : '') +
      (ctx.materialReferencia ? '\nMaterial / referencia literal a incluir tal cual:\n' + ctx.materialReferencia + '\n' : '') +
      '\nTotal de ítems requeridos: ' + nItems +
      '\nDificultad: ' + (ctx.difTexto || ctx.dificultad || 'intermedio') +
      '\n\n── ESTRUCTURA OBLIGATORIA DEL DOCUMENTO HTML ──\n' +
      '1. Encabezado institucional + datos del estudiante (nombre, curso, fecha).\n' +
      '2. INSTRUCCIONES GENERALES (cómo marcar respuestas, no se descuenta puntaje, tiempo sugerido).\n' +
      (pruebaKey === 'lectura'
        ? '3. Para cada texto: bloque <h2>TEXTO N — [título / tipo: literario o no literario]</h2> con texto de 200-400 palabras adecuado al nivel, luego sus 4-8 preguntas. Incluir al menos un texto literario y uno no literario. Repetir hasta sumar ' + nItems + ' ítems.\n'
        : pruebaKey === 'ciencias'
          ? '3. Al menos 2 estímulos científicos (experimento, tabla de datos, gráfico, esquema): <h2>ESTÍMULO N — [título]</h2> con descripción >=100 palabras, luego sus preguntas (3-5 por estímulo).\n'
          : pruebaKey === 'historia'
            ? '3. Fuentes variadas (mapas, líneas de tiempo, documentos, imágenes descritas, gráficos): <h2>FUENTE N — [tipo / referencia]</h2> con descripción 80-250 palabras, luego sus preguntas (2-5).\n'
            : '3. Distribuir ítems entre los ejes mencionados. Al menos un tercio con contexto/estímulo (tabla, gráfico, situación cotidiana chilena).\n'
      ) +
      '4. Cada ítem de selección múltiple: enunciado claro y adecuado al nivel + 4 alternativas A) B) C) D). Distractores plausibles (errores conceptuales típicos del nivel).\n' +
      '5. Incluir 1-2 preguntas de respuesta abierta/construida al final (excepto en Matemática, donde son de desarrollo): <h3>PREGUNTA DE DESARROLLO</h3> con espacio para responder.\n' +
      '6. <h2>CLAVE DE RESPUESTAS</h2>: tabla compacta con N° y letra correcta.\n' +
      '7. <h2>TABLA DE ESPECIFICACIONES</h2>: columnas <strong>N°</strong>, <strong>Eje SIMCE</strong>, <strong>Habilidad</strong>, <strong>Dificultad (F/M/D)</strong>, <strong>OA Mineduc</strong>, <strong>Nivel de logro esperado (Insuficiente/Elemental/Adecuado)</strong>.\n' +
      '8. <h2>JUSTIFICACIÓN / RESOLUCIÓN</h2>: para cada ítem, breve justificación de la clave correcta (1-3 líneas).\n\n' +
      'IMPORTANTE: Devuelve SOLO HTML del cuerpo (no <html>, <head>, <body>, ni marcadores de código).\n' +
      'Usa <h1> para el título, <h2> para secciones, <p>, <ol>/<ul>, <table>, <strong>. Mantén el documento legible y listo para imprimir.\n' +
      _promptFormatoHTML() +
      '\nGenera ahora el documento completo:';
    return instrucciones;
  }

  // =============================================
  // GENERADOR: CREAR CON IA
  // =============================================
  function generarConIA() {
      if (!tipoDocSeleccionado) { setIAStatus('error', '&#10007; Selecciona el tipo de documento primero.'); return; }

      var user     = _matUser || {};

      // ── Fase 8: detectar modo por lo que el user eligió en el dropdown
      //    unificado (asig:: o mod::), NO por tipoProfesor (que puede ser
      //    'media' aunque el user haya elegido un módulo TP).
      var selUnif = document.getElementById('selectAsigOModMat');
      var valUnif = selUnif ? selUnif.value : '';
      var isTP;
      if (valUnif.indexOf('mod::') === 0) {
          isTP = true;
          // Si el user eligió módulo TP, asegurar user.especialidad correcto
          var partes = valUnif.split('::');
          if (partes[1] && typeof CCTPCatalogo !== 'undefined' && CCTPCatalogo.SLUG_CURRICULA[partes[1]]) {
              user.especialidad = CCTPCatalogo.SLUG_CURRICULA[partes[1]];
          }
      } else if (valUnif.indexOf('asig::') === 0) {
          isTP = false;
      } else {
          // Fallback legacy
          isTP = user.tipoProfesor === 'tecnico';
      }

      var curso    = document.getElementById('selectCurso').value;
      var contenido = document.getElementById('inputContenido').value;
      var dificultad= document.getElementById('selectDificultad').value;
      var profesor = document.getElementById('inputProfesor').value;
      var cursoTexto = typeof CURRICULA_CHILE !== 'undefined' ? CURRICULA_CHILE.getNivelLabel(curso) : curso;

      if (!curso) { setIAStatus('error', '&#10007; Selecciona el curso/nivel primero.'); return; }

      // Recolectar OAs y contenido curricular
      var oaTexto = '';
      var asigNombre = '';
      var modNombre = '';
      if (!isTP) {
          asigNombre = document.getElementById('selectAsignatura') ? document.getElementById('selectAsignatura').value : '';
          var oasReg = [];
          document.querySelectorAll('#listaOAMineduc .oaRegCheck:checked').forEach(function(cb) {
              oasReg.push(cb.value + ': ' + cb.getAttribute('data-desc'));
          });
          if (!asigNombre) { setIAStatus('error', '&#10007; Selecciona la asignatura.'); return; }
          if (!oasReg.length) { setIAStatus('error', '&#10007; Selecciona al menos un OA Mineduc.'); return; }
          oaTexto = oasReg.join('\n');
          modNombre = asigNombre;
      } else {
          var modId = document.getElementById('selectModulo').value;
          var oaId  = document.getElementById('selectOA').value;
          var aeNum = document.getElementById('selectAE').value;
          if (!modId || !oaId) { setIAStatus('error', '&#10007; Selecciona M\u00f3dulo y OA.'); return; }
          var _modsTP = (typeof getCurriculaModulos === 'function') ? getCurriculaModulos(user.especialidad || '') : {};
          var mod = _modsTP[modId];
          modNombre = mod ? mod.nombre : modId;
          var aeTxt  = (mod && mod.aes && mod.aes[aeNum]) ? mod.aes[aeNum].texto : '';
          var oaTxt  = (mod && mod.oas) ? (mod.oas[oaId] || oaId) : oaId;
          var ceTexts = [];
          document.querySelectorAll('#listaCE input:checked').forEach(function(cb) {
              var k = cb.value;
              if (mod && mod.aes && mod.aes[aeNum] && mod.aes[aeNum].ces && mod.aes[aeNum].ces[k]) {
                  ceTexts.push(k + ': ' + mod.aes[aeNum].ces[k].texto);
              }
          });
          oaTexto = oaId + ': ' + oaTxt + (aeTxt ? '\nAE ' + aeNum + ': ' + aeTxt : '') + (ceTexts.length ? '\nCriterios:\n' + ceTexts.join('\n') : '');
          var _espLabel = '';
          if (typeof CCTPCatalogo !== 'undefined' && user.especialidades && user.especialidades[0]) {
              _espLabel = CCTPCatalogo.labelEspecialidad(user.especialidades[0]);
          } else if (typeof CCTPCatalogo !== 'undefined' && user.especialidad) {
              // Buscar el ID interno a partir del slug
              var _idInt = Object.keys(CCTPCatalogo.SLUG_CURRICULA).find(function (k) {
                  return CCTPCatalogo.SLUG_CURRICULA[k] === user.especialidad;
              });
              _espLabel = _idInt ? CCTPCatalogo.labelEspecialidad(_idInt) : user.especialidad;
          } else {
              _espLabel = user.especialidad || '';
          }
          asigNombre = 'Especialidad ' + _espLabel + ' EMTP';
      }

      var valoresArr = [];
      document.querySelectorAll('#valoresSalesianos input:checked').forEach(function(cb){ valoresArr.push(cb.value); });

      var evalOpts = getEvalOpciones();
      var bloomNames = evalOpts.bloomLevels.map(function(l){ return BLOOM_LABELS[l] || l; }).join(', ');
      var tiposNames = evalOpts.tiposPreg.map(function(t){
          return {sm:'selecci\u00f3n m\u00faltiple', vf:'verdadero/falso', desarrollo:'desarrollo', completar:'completar', emparejar:'relacionar', caso:'an\u00e1lisis de caso'}[t] || t;
      }).join(', ');

      var tipoNombre = {
          guia: 'Gu\u00eda de Aprendizaje',
          apunte: 'Apunte de Clase',
          evaluacion: 'Gu\u00eda de Ejercicios',
          prueba: 'Prueba Formal Sumativa',
          control: 'Control R\u00e1pido Formativo'
      }[tipoDocSeleccionado] || tipoDocSeleccionado;

      var difTexto = { basico:'b\u00e1sico (primer acercamiento al tema, lenguaje simple)', intermedio:'intermedio (aplicaci\u00f3n pr\u00e1ctica, lenguaje t\u00e9cnico moderado)', avanzado:'avanzado (an\u00e1lisis cr\u00edtico, resoluci\u00f3n de problemas complejos)' }[dificultad] || dificultad;

      var nombreInst = _nombreInstitucion() || 'la institución educativa';

      // Material/preguntas literales que el docente quiera incluir tal cual
      var materialReferencia = '';
      var refEl = document.getElementById('materialReferencia');
      if (refEl) materialReferencia = (refEl.value || '').trim();

      // Configuración de Guía de Ejercicios (cantidad + habilidad)
      var habilidad = '';
      var habilidadDetalle = '';
      var cantEjercicios = 0;
      if (tipoDocSeleccionado === 'evaluacion') {
          var habEl = document.getElementById('ejHabilidad');
          habilidad = habEl ? (habEl.value || '').trim() : '';
          var habDetEl = document.getElementById('ejHabilidadDetalle');
          habilidadDetalle = habDetEl ? (habDetEl.value || '').trim() : '';
          var cantEl = document.getElementById('ejCantidad');
          cantEjercicios = cantEl ? (parseInt(cantEl.value, 10) || 15) : 15;
      }

      // Datos PIE (legacy — solo se usaban cuando 'diferenciada' era tipo standalone;
      // ahora la diferenciada vive como toggle dentro de Prueba Formal y se maneja
      // por _generarPIEAdjunta() con paneles por NEE).
      var pieDiagnostico   = '';
      var pieAdecuacion    = 'acceso';
      var pieObservaciones = '';

      // ── Flags PAES / Taxonomía ──
      // Se activan según permisos del profe + lo que eligió en los selectores.
      var _selFormato = document.getElementById('selFormatoMaterial');
      var _selCompPAES = document.getElementById('selCompPAES');
      var _selPruebaSIMCE = document.getElementById('selPruebaSIMCE');
      var _selTax     = document.getElementById('selTaxonomia');
      var _formatoSel = _selFormato ? _selFormato.value : 'estandar';
      var _formatoActivo = 'estandar';
      if (user.formatoPAES  && _formatoSel === 'paes')  _formatoActivo = 'paes';
      if (user.formatoSIMCE && _formatoSel === 'simce') _formatoActivo = 'simce';
      var _competenciaPaes = _selCompPAES ? (_selCompPAES.value || 'lectora') : 'lectora';
      var _pruebaSimce = _selPruebaSIMCE ? (_selPruebaSIMCE.value || 'lectura') : 'lectura';
      var _taxonomia  = (user.taxonomiaMarzano && _selTax && _selTax.value === 'marzano') ? 'marzano' : 'bloom';

      // Si la taxonomía elegida es Marzano, reemplazar los nombres Bloom por niveles Marzano correspondientes
      var bloomNamesFinal = bloomNames;
      if (_taxonomia === 'marzano') {
          var MARZANO_LABELS_TXT = {
              recordar:   'Recuperación (Marzano nivel 1)',
              comprender: 'Comprensión (Marzano nivel 2)',
              aplicar:    'Utilización del conocimiento (Marzano nivel 4)',
              analizar:   'Análisis (Marzano nivel 3)',
              evaluar:    'Análisis – evaluar (Marzano nivel 3)',
              crear:      'Utilización del conocimiento – crear (Marzano nivel 4)'
          };
          bloomNamesFinal = evalOpts.bloomLevels.map(function(l){ return MARZANO_LABELS_TXT[l] || l; }).join(', ');
      }

      // Construir contexto único para los builders de prompt
      var ctxPrompt = {
          tipoDocSel: tipoDocSeleccionado,
          tipoNombre: tipoNombre,
          nombreInst: nombreInst,
          modNombre:  modNombre,
          cursoTexto: cursoTexto,
          contenido:  contenido,
          oaTexto:    oaTexto,
          profesor:   profesor,
          difTexto:   difTexto,
          dificultad: dificultad,
          bloomNames: bloomNamesFinal,
          tiposNames: tiposNames,
          cantPreg:   evalOpts.cantPreg || 10,
          puntaje:    evalOpts.puntaje  || 40,
          itemCounts: evalOpts.itemCounts || {},
          cantAlternativas: evalOpts.cantAlternativas || 4,
          materialReferencia: materialReferencia,
          valoresStr: (valoresArr && valoresArr.length) ? valoresArr.join(', ') : '',
          valoresArr: valoresArr || [],
          habilidad:        habilidad,
          habilidadDetalle: habilidadDetalle,
          cantEjercicios:   cantEjercicios,
          pieDiagnostico:   pieDiagnostico,
          pieAdecuacion:    pieAdecuacion,
          pieObservaciones: pieObservaciones,
          // ── Nuevos: capacidades PAES / SIMCE / Marzano ──
          formatoActivo:    _formatoActivo,     // 'paes' | 'simce' | 'estandar'
          competenciaPaes:  _competenciaPaes,   // 'lectora' | 'm1' | 'm2' | 'ciencias' | 'historia'
          pruebaSimce:      _pruebaSimce,       // 'lectura' | 'matematica' | 'ciencias' | 'historia'
          taxonomia:        _taxonomia          // 'bloom' | 'marzano'
      };

      var prompt = _buildPromptPorTipo(tipoDocSeleccionado, ctxPrompt);

      // Cargar configuración IA desde Firestore y ejecutar
      setIAStatus('loading', '<span class=\"ia-spinner\">&#9696;</span> Cargando configuraci\u00f3n...');
      document.getElementById('btnIA').disabled = true;

      // SEGURIDAD: ya no leemos API keys desde Firestore. La generación
      // pasa por /api/ia-asistente (Vercel serverless) que tiene la key
      // en variables de entorno y nunca la expone al cliente.
      setIAStatus('loading', '<span class=\"ia-spinner\">&#9696;</span> Generando, espera un momento...');
      document.getElementById('btnIA').disabled = true;
      // Llamada con 1 reintento autom\u00e1tico en 502/504 (timeout de hosting)
      function _llamarIA(reintento) {
          return fetch(window.IA_ENDPOINT || '/api/ia-asistente', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  tipo: 'raw',
                  datos: { prompt: prompt, maxTokens: 16384, temperature: 0.7 }
              })
          }).then(function(res) {
              return res.text().then(function(txt) {
                  var data;
                  try { data = JSON.parse(txt); } catch (_) { data = null; }
                  // Si la respuesta es 5xx (server error o timeout), reintentar 1 vez
                  if (res.status >= 500 && res.status < 600 && !reintento) {
                      setIAStatus('loading', '<span class="ia-spinner">&#9696;</span> Servidor lento, reintentando\u2026');
                      return new Promise(function(r){ setTimeout(r, 3000); })
                             .then(function(){ return _llamarIA(true); });
                  }
                  if (data) return data;  // JSON v\u00e1lido (puede ser error o resultado)
                  // No es JSON \u2192 mensaje \u00fatil seg\u00fan status
                  if (res.status === 504 || res.status === 502) {
                      throw new Error('El servidor tard\u00f3 demasiado. Intent\u00e1 de nuevo, o reduc\u00ed cantidad de preguntas a 20-25.');
                  }
                  if (res.status === 500) {
                      throw new Error('Error interno del servidor (500). Intent\u00e1 de nuevo en 30 segundos.');
                  }
                  throw new Error('Respuesta inv\u00e1lida del servidor (HTTP ' + res.status + ').');
              });
          });
      }
      Promise.resolve()
          .then(function() { return _llamarIA(false); })
              .then(function(data) {
                  document.getElementById('btnIA').disabled = false;
                  if (data.error) {
                      var msg = (typeof data.error === 'string') ? data.error
                                : (data.error.message || JSON.stringify(data.error));
                      var hint = '';
                      if (/RESOURCE_EXHAUSTED|quota/i.test(msg)) {
                          hint = '<br><br>&#128161; <strong>Cuota de la IA agotada.</strong> Intenta de nuevo m\u00e1s tarde o pide al admin revisar la configuraci\u00f3n.';
                      } else if (/API_KEY_INVALID|invalid|no configurada/i.test(msg)) {
                          hint = '<br><br>&#128161; La API key del servicio est\u00e1 mal configurada en el servidor. Avisa al administrador.';
                      }
                      setIAStatus('error', '&#10007; Error de la IA: ' + msg + hint);
                      return;
                  }
                  var text = data.resultado || '';
                  if (!text) {
                      setIAStatus('error', '&#10007; La IA no devolvi\u00f3 contenido. Intenta de nuevo.');
                      return;
                  }
                  text = text.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```\s*$/i, '').trim();
                  // Si la IA igual envió documento completo, extraer solo el body
                  var mBody = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                  if (mBody) text = mBody[1].trim();
                  // Quitar <html>/<head>/<style> sueltos por si vinieron sin <body>
                  text = text.replace(/<!doctype[^>]*>/gi, '')
                             .replace(/<\/?html[^>]*>/gi, '')
                             .replace(/<head[\s\S]*?<\/head>/gi, '')
                             .replace(/<style[\s\S]*?<\/style>/gi, '')
                             .replace(/<\/?body[^>]*>/gi, '')
                             .trim();
                  // Quitar el primer <h1> que contenga el título del doc (la IA a veces no obedece)
                  text = text.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();

                  // ── DEFENSA ANTI-DEGENERACIÓN ──
                  // La IA a veces entra en loop generando miles de "_____" o "-----".
                  // Cortamos cualquier secuencia >80 a un máximo razonable.
                  text = text.replace(/_{80,}/g, '_'.repeat(60))
                             .replace(/-{80,}/g, '-'.repeat(60))
                             .replace(/\*{80,}/g, '*'.repeat(40))
                             .replace(/\.{80,}/g, '.'.repeat(40))
                             .replace(/={80,}/g, '='.repeat(40))
                             .replace(/(<br\s*\/?>\s*){10,}/gi, '<br><br>');

                  // Construir título del documento (lo que va en la barra azul oscuro)
                  var tituloDoc = (contenido || tipoNombre || 'Documento').toString();
                  if (tituloDoc.length > 90) {
                      var corte = tituloDoc.lastIndexOf(' ', 90);
                      tituloDoc = tituloDoc.substring(0, corte > 50 ? corte : 90) + '…';
                  }

                  var headerHtml = headerInstitucional(tipoNombre) +
                                   tituloBar(tituloDoc) +
                                   metaTabla({ profesor: profesor, curso: cursoTexto });

                  document.getElementById('docPreview').innerHTML = headerHtml + text + pieDoc();
                  // Renderizar MathJax si la IA escribió LaTeX inline o display
                  if (window.MathJax && MathJax.typesetPromise) {
                      try { MathJax.typesetPromise([document.getElementById('docPreview')]).catch(function(){}); } catch (e) {}
                  }
                  document.getElementById('docGenerado').classList.add('visible');
                  document.getElementById('docGenerado').scrollIntoView({ behavior: 'smooth' });
                  setIAStatus('ok', '&#10003; Documento generado con IA exitosamente. Puedes imprimirlo o publicarlo en la Biblioteca.');
                  try { if (typeof ELDB !== 'undefined' && ELDB.actividad) ELDB.actividad.log('generar_material_ia', { tipoDoc: tipoDocSeleccionado, tipoNombre: tipoNombre, curso: cursoTexto, asignatura: modNombre, contenido: (contenido || '').slice(0, 100) }); } catch (e) {}

                  // \u2500\u2500 Generaci\u00f3n dual: si es Prueba y el toggle PIE est\u00e1 marcado, generar tambi\u00e9n la versi\u00f3n adaptada \u2500\u2500
                  // (apiKey/modelo ya no se pasan: _generarPIEAdjunta usa window.IA_ENDPOINT internamente)
                  var chkPIE = document.getElementById('chkAdjuntarPIE');
                  if (tipoDocSeleccionado === 'prueba' && chkPIE && chkPIE.checked) {
                      // Capturar el HTML de la prueba est\u00e1ndar reci\u00e9n generada
                      // para que las versiones PIE sean ADAPTACIONES de la misma
                      // prueba, no documentos generados desde cero.
                      var pruebaOriginalHTML = (document.getElementById('docPreview') || {}).innerHTML || '';
                      _generarPIEAdjunta({
                          ctxBase: ctxPrompt,
                          tipoNombre: tipoNombre,
                          cursoTexto: cursoTexto,
                          profesor: profesor,
                          contenido: contenido,
                          pruebaOriginalHTML: pruebaOriginalHTML
                      });
                  }
              })
              .catch(function(err) {
                  document.getElementById('btnIA').disabled = false;
                  setIAStatus('error', '&#10007; Error de conexi\u00f3n: ' + err.message);
              });
  }
  /**
   * Genera UNA O VARIAS versiones PIE (Evaluación Diferenciada) ANEXAS a una prueba
   * ya emitida. Itera sobre los diagnósticos NEE marcados en pieDiagGrid: hace una
   * llamada IA por cada uno y concatena cada resultado al docPreview con su
   * propio cabezal indicando el diagnóstico.
   */
  function _generarPIEAdjunta(opts) {
      // Recolectar todos los diagnósticos marcados (multi-NEE)
      var checks = document.querySelectorAll('input[name="pruebaPieDiag"]:checked');
      var diagnosticos = [];
      for (var i = 0; i < checks.length; i++) diagnosticos.push(checks[i].value);
      if (!diagnosticos.length) {
          setIAStatus('error', '&#10007; Marcaste "Generar también versión PIE" pero no seleccionaste ningún diagnóstico NEE. Marca al menos uno y vuelve a generar.');
          return;
      }
      // Adecuación general (fallback) — el panel por NEE tiene su propio campo y manda
      var adeRadio = document.querySelector('input[name="pruebaPieAdecuacion"]:checked');
      var adecuacionGeneral = adeRadio ? adeRadio.value : 'acceso';
      var obsEl = document.getElementById('pruebaPieObservaciones');
      var observaciones = obsEl ? (obsEl.value || '').trim() : '';

      var BLOOM_LBL = (typeof BLOOM_LABELS !== 'undefined') ? BLOOM_LABELS : { 1:'Recordar', 2:'Comprender', 3:'Aplicar', 4:'Analizar', 5:'Evaluar', 6:'Crear' };
      var TIPO_LBL = { sm:'selección múltiple', vf:'verdadero/falso', desarrollo:'desarrollo', completar:'completar', emparejar:'relacionar', caso:'análisis de caso', aplicacion:'aplicación' };

      // Construye el ctxPIE específico para cada NEE leyendo SU panel propio
      function _buildCtxPIE(diag) {
          var ctxPIE = {};
          for (var k in opts.ctxBase) ctxPIE[k] = opts.ctxBase[k];
          // Configuración propia de esta NEE (cantidad, puntaje, alternativas, Bloom, tipos, adecuación)
          var optsPIE = (typeof getEvalOpcionesPIE === 'function') ? getEvalOpcionesPIE(diag) : null;
          var adecuacion = (optsPIE && optsPIE.tipoAdecuacion) ? optsPIE.tipoAdecuacion : adecuacionGeneral;
          ctxPIE.tipoDocSel       = 'diferenciada';
          ctxPIE.tipoNombre       = 'Evaluación Diferenciada (PIE) — ' + diag;
          ctxPIE.pieDiagnostico   = diag;
          ctxPIE.pieAdecuacion    = adecuacion;
          ctxPIE.pieObservaciones = observaciones;
          // ── La prueba estándar generada (HTML) viaja al prompt para que
          //    la versión PIE sea una ADAPTACIÓN, no una nueva prueba.
          ctxPIE.pruebaOriginalHTML = opts.pruebaOriginalHTML || '';
          if (optsPIE) {
              ctxPIE.cantPreg          = optsPIE.cantPreg;
              ctxPIE.puntaje           = optsPIE.puntaje;
              ctxPIE.cantAlternativas  = optsPIE.cantAlternativas;
              ctxPIE.itemCounts        = optsPIE.itemCounts;
              ctxPIE.bloomNames = optsPIE.bloomLevels.map(function(l){ return BLOOM_LBL[l] || l; }).join(', ');
              ctxPIE.tiposNames = optsPIE.tiposPreg.map(function(t){ return TIPO_LBL[t] || t; }).join(', ');
          }
          return { ctx: ctxPIE, adecuacion: adecuacion };
      }

      // SEGURIDAD: ya no usamos opts.apiKey/opts.modelo directos. Vamos al endpoint.
      var url = window.IA_ENDPOINT || '/api/ia-asistente';
      var preview = document.getElementById('docPreview');

      // Generar secuencialmente cada versión PIE para no saturar la API
      function _generarUna(idx) {
          if (idx >= diagnosticos.length) {
              setIAStatus('ok', '&#10003; ¡Listo! Se generó la prueba estándar y ' + diagnosticos.length +
                  ' versión' + (diagnosticos.length > 1 ? 'es' : '') + ' adaptada' + (diagnosticos.length > 1 ? 's' : '') +
                  ' (PIE): ' + diagnosticos.join(', ') + '. Cada versión está separada por un salto de página.');
              return;
          }
          var diag = diagnosticos[idx];
          setIAStatus('loading', '<span class="ia-spinner">⠿</span> Generando versión PIE ' + (idx + 1) + ' de ' + diagnosticos.length + ' (' + diag + ')…');
          var built = _buildCtxPIE(diag);
          var ctxPIE = built.ctx;
          var adecuacion = built.adecuacion;
          var promptPIE = _promptDiferenciada(ctxPIE);
          var body = JSON.stringify({
              tipo: 'raw',
              datos: { prompt: promptPIE, maxTokens: 16384, temperature: 0.7 }
          });

          fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body })
              .then(function(res){ return res.json(); })
              .then(function(data){
                  if (data.error) {
                      var emsg = (typeof data.error === 'string') ? data.error : (data.error.message || '');
                      setIAStatus('error', '&#10007; Falló la versión PIE para ' + diag + ': ' + emsg);
                      return;
                  }
                  var text = data.resultado || '';
                  if (!text) { setIAStatus('error', '&#10007; La IA no devolvió la versión PIE para ' + diag + '.'); return; }
                  text = text.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```\s*$/i, '').trim();
                  var mBody = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                  if (mBody) text = mBody[1].trim();
                  text = text.replace(/<!doctype[^>]*>/gi, '')
                             .replace(/<\/?html[^>]*>/gi, '')
                             .replace(/<head[\s\S]*?<\/head>/gi, '')
                             .replace(/<style[\s\S]*?<\/style>/gi, '')
                             .replace(/<\/?body[^>]*>/gi, '')
                             .trim();
                  text = text.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();

                  var divisor = '<div style="page-break-before:always"></div>' +
                                '<div style="margin-top:36px;padding:20px 22px;border-radius:14px;background:linear-gradient(135deg,rgba(244,114,182,.10),rgba(124,58,237,.08));border:2px dashed rgba(244,114,182,.4);text-align:center;font-size:.95rem;color:#f1d6e8;">' +
                                '⚇ <strong>Versión PIE ' + (idx + 1) + ' de ' + diagnosticos.length + '</strong> — Adecuación ' + (adecuacion === 'significativa' ? 'Significativa / PACI' : 'Solo de Acceso') + ' para diagnóstico <strong>' + diag + '</strong>. ' +
                                'Mismos OAs y contenido que la prueba estándar.' +
                                '</div>';
                  var headerPIE = headerInstitucional('Evaluación Diferenciada (PIE) — ' + diag) +
                                  tituloBar((opts.contenido || 'Evaluación Diferenciada').toString().substring(0, 90)) +
                                  metaTabla({ profesor: opts.profesor, curso: opts.cursoTexto });
                  preview.innerHTML += divisor + headerPIE + text + pieDoc();
                  // Avanzar al siguiente
                  _generarUna(idx + 1);
              })
              .catch(function(err){
                  setIAStatus('error', '&#10007; Falló la versión PIE para ' + diag + ': ' + err.message);
              });
      }
      _generarUna(0);
  }

  function setIAStatus(tipo, msg) {
      var el = document.getElementById('iaStatus');
      if (el) {
          el.style.display = 'block';
          el.className = 'ia-status ' + tipo;
          el.innerHTML = msg;
      }
      // Sincronizar con el FAB flotante
      var fabSt = document.getElementById('fabStatus');
      if (fabSt) {
          fabSt.style.display = 'block';
          fabSt.style.borderColor = tipo === 'error' ? 'rgba(239,68,68,.5)'
                                  : tipo === 'success' ? 'rgba(34,197,94,.5)'
                                  : tipo === 'loading' ? 'rgba(124,58,237,.5)'
                                  : 'rgba(148,163,184,.25)';
          fabSt.innerHTML = msg;
      }
      var fabBtn = document.getElementById('fabIA');
      if (fabBtn) fabBtn.disabled = (tipo === 'loading');
  }

  // Exposición global
  window._promptReglasComunes  = _promptReglasComunes;
  window._promptFormatoHTML    = _promptFormatoHTML;
  window._promptDatos          = _promptDatos;
  window._promptGuia           = _promptGuia;
  window._promptApunte         = _promptApunte;
  window._distribuirPuntaje    = _distribuirPuntaje;
  window._promptPrueba         = _promptPrueba;
  window._promptEvaluacion     = _promptEvaluacion;
  window._promptDiferenciada   = _promptDiferenciada;
  window._promptGenerico       = _promptGenerico;
  window._buildPromptPorTipo   = _buildPromptPorTipo;
  window.PAES_INFO             = PAES_INFO;
  window._promptPAES           = _promptPAES;
  window._promptSIMCE          = _promptSIMCE;
  window.generarConIA          = generarConIA;
  window._generarPIEAdjunta    = _generarPIEAdjunta;
  window.setIAStatus           = setIAStatus;
})();
