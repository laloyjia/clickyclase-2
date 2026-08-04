/**
 * ppt-generator.js — Click&Clase
 * ────────────────────────────────────────────────────────────────
 * Generador de presentaciones .pptx con IA integrada.
 *
 * STACK (100% gratis en Fase 1):
 *  1) Gemini (vía /api/ia-asistente)  → JSON estructurado de la presentación
 *  2) Pollinations.ai (Flux Schnell)  → imágenes generadas (sin API key)
 *  3) Unsplash Source (fallback)      → imágenes stock
 *  4) PptxGenJS (CDN)                 → empaquetado del .pptx
 *
 * Uso:
 *   const ppt = new CCPptGenerator({ tema, curso, asignatura, nSlides, estilo, oa, imagenes });
 *   await ppt.generar();          // JSON con la estructura (editable)
 *   ppt.editar(index, {...});     // Editar un slide antes de compilar
 *   const blob = await ppt.compilar(); // Blob .pptx listo para descargar
 *   ppt.descargar('nombre.pptx');
 *
 * Requisito: cargar PptxGenJS antes:
 *   <script src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"></script>
 */
(function () {
  'use strict';

  var POLLINATIONS_URL = 'https://image.pollinations.ai/prompt/';
  // Openverse: API PÚBLICA sin key, CORS habilitado, agrega Flickr + Wikimedia +
  // Museos (Smithsonian, MET, etc). Solo devuelve imágenes con licencia libre.
  // Es la MEJOR fuente de fotos reales educativas para presentaciones. La usamos
  // como fuente principal reemplazando a Unsplash Source (que quedó deprecado
  // en 2024 y ahora bloquea CORS).
  var OPENVERSE_API = 'https://api.openverse.org/v1/images/';
  // Wikimedia Commons: API pública sin key, CORS permitido con origin=*.
  // Usamos como fallback secundario porque su buscador es más restrictivo.
  var WIKIMEDIA_API = 'https://commons.wikimedia.org/w/api.php';

  // Paletas por estilo pedagógico (bg, primary, accent, text, muted, soft = fondo suave)
  // Cada estilo tiene VARIANTES de color que se eligen aleatoriamente por generación.
  var TEMAS_COLOR = {
    didactica: [
      { bg:'FFFFFF', primary:'2563EB', accent:'0EA5E9', text:'0C1E3B', muted:'64748B', soft:'F0F7FF' },
      { bg:'FFFFFF', primary:'1D4ED8', accent:'38BDF8', text:'0B1229', muted:'475569', soft:'EFF6FF' },
      { bg:'FFFFFF', primary:'4338CA', accent:'6366F1', text:'1E1B4B', muted:'64748B', soft:'EEF2FF' }
    ],
    formal: [
      { bg:'FFFFFF', primary:'0F172A', accent:'1E40AF', text:'0F172A', muted:'64748B', soft:'F8FAFC' },
      { bg:'FFFFFF', primary:'1E293B', accent:'475569', text:'0F172A', muted:'64748B', soft:'F1F5F9' },
      { bg:'FFFFFF', primary:'134E4A', accent:'0F766E', text:'042F2E', muted:'475569', soft:'F0FDFA' }
    ],
    interactiva: [
      { bg:'FFFFFF', primary:'0F766E', accent:'14B8A6', text:'0C1E3B', muted:'475569', soft:'F0FDFA' },
      { bg:'FFFFFF', primary:'059669', accent:'34D399', text:'064E3B', muted:'475569', soft:'ECFDF5' },
      { bg:'FFFFFF', primary:'0891B2', accent:'22D3EE', text:'083344', muted:'475569', soft:'ECFEFF' }
    ],
    calida: [
      { bg:'FFFFFF', primary:'C2410C', accent:'F97316', text:'431407', muted:'78350F', soft:'FFF7ED' },
      { bg:'FFFFFF', primary:'B45309', accent:'F59E0B', text:'451A03', muted:'78350F', soft:'FFFBEB' },
      { bg:'FFFFFF', primary:'BE185D', accent:'EC4899', text:'500724', muted:'831843', soft:'FDF2F8' }
    ]
  };

  // Patrones de fondo (variantes visuales por generación) — VISIBLES
  var PATRONES_FONDO = [
    'banda-izquierda',   // Franja vertical de 0.5" a la izquierda en color primary
    'header-tinted',     // Todo el tercio superior con color soft de fondo
    'cuadro-esquina',    // Cuadrado grande de color soft en esquina inferior derecha
    'doble-franja',      // Dos franjas horizontales soft (una arriba y otra abajo)
    'fondo-crema'        // Fondo entero color soft (no blanco)
  ];

  // Saneo de strings: elimina caracteres de control que rompen el XML del pptx.
  // XML 1.0 solo permite: \t, \n, \r, [0x20-0xD7FF, 0xE000-0xFFFD, 0x10000-0x10FFFF]
  function _sanit(s) {
    if (s == null) return '';
    return String(s).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  }
  function _sanitEstructura(e) {
    if (!e || typeof e !== 'object') return e;
    e.titulo    = _sanit(e.titulo);
    e.subtitulo = _sanit(e.subtitulo);
    if (e.portada) { e.portada.resumen = _sanit(e.portada.resumen); e.portada.sugerenciaImagen = _sanit(e.portada.sugerenciaImagen); }
    if (Array.isArray(e.aprendizajes)) e.aprendizajes = e.aprendizajes.map(_sanit);
    if (Array.isArray(e.slides)) e.slides.forEach(function(s){
      s.titulo         = _sanit(s.titulo);
      s.momento        = _sanit(s.momento);
      s.notasProfesor  = _sanit(s.notasProfesor);
      s.sugerenciaImagen = _sanit(s.sugerenciaImagen);
      if (Array.isArray(s.bullets)) s.bullets = s.bullets.map(_sanit).filter(Boolean);
    });
    if (e.actividad) { e.actividad.titulo = _sanit(e.actividad.titulo); e.actividad.descripcion = _sanit(e.actividad.descripcion); e.actividad.tiempo = _sanit(e.actividad.tiempo); }
    if (e.cierre) { e.cierre.titulo = _sanit(e.cierre.titulo); if (Array.isArray(e.cierre.preguntas)) e.cierre.preguntas = e.cierre.preguntas.map(_sanit).filter(Boolean); }
    return e;
  }

  function CCPptGenerator(config) {
    this.config = Object.assign({
      tema:        '',        // "La célula: estructura y función"
      curso:       '',        // "7° Básico"
      asignatura:  '',        // "Ciencias Naturales"
      nSlides:     10,        // 5 a 25
      estilo:      'didactica', // didactica | formal | interactiva | calida
      oa:          '',        // Objetivo de aprendizaje MINEDUC
      imagenes:    'ia',      // 'web' | 'ia' | 'stock' | 'ambas' | 'ninguna'
      palabrasClaveImg: '',   // Palabras clave del docente EN INGLÉS (opcional).
      // Google Custom Search API (opcional, para modo 'google').
      // Setup del user: crear en console.cloud.google.com + programmablesearchengine.google.com
      // 100 queries/día gratis, sin costo.
      googleCseApiKey: '',
      googleCseId: '',
      profesorNombre: '',
      liceoNombre: '',
      instrucciones: ''       // Instrucciones extra del docente
    }, config || {});
    this.estructura = null;
    this.imagenesGeneradas = {};  // slideIdx → dataURL
  }

  // ── Paso 1: Gemini → JSON estructura ─────────────────────
  CCPptGenerator.prototype.generar = function () {
    var self = this;
    var prompt = this._construirPromptGemini();
    // Usar wrapper de cuota si está disponible (verifica límite + adjunta token)
    var _fetchFn = (window.CCCuotaIA && window.CCCuotaIA.wrapFetch) ? window.CCCuotaIA.wrapFetch : fetch;
    return _fetchFn('/api/ia-asistente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'raw',
        datos: {
          modelo: 'gemini-3.6-flash',
          prompt: prompt,
          maxTokens: 8000
        }
      })
    })
    .then(function (r) {
      if (!r.ok) return r.text().then(function(t){ throw new Error('HTTP ' + r.status + ' · ' + t.slice(0,200)); });
      return r.json();
    })
    .then(function (data) {
      var texto = data.resultado || data.texto || data.text || data.contenido || data.result || data.content || '';
      if (!texto && data.candidates && data.candidates[0]) {
        texto = (data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) || '';
      }
      if (!texto) {
        console.error('[PPT] respuesta vacía del endpoint:', data);
        throw new Error('El endpoint IA devolvió respuesta vacía. Verificá que la Cloud Function esté desplegada con la última versión.');
      }
      // Extraer JSON del texto (Gemini a veces envuelve con ```json)
      var m = texto.match(/```json\s*([\s\S]*?)\s*```/);
      if (m) texto = m[1];
      else {
        var i1 = texto.indexOf('{'), i2 = texto.lastIndexOf('}');
        if (i1 >= 0 && i2 > i1) texto = texto.substring(i1, i2 + 1);
      }
      try {
        self.estructura = JSON.parse(texto);
      } catch (e) {
        throw new Error('La IA devolvió un JSON inválido: ' + e.message);
      }
      // Sanear caracteres de control que romperían el XML del pptx
      self.estructura = _sanitEstructura(self.estructura);
      return self.estructura;
    });
  };

  CCPptGenerator.prototype._construirPromptGemini = function () {
    var c = this.config;
    var nContenido = Math.max(3, c.nSlides - 4);
    return [
      'Eres un asesor pedagógico experto en el currículum chileno MINEDUC, en didáctica de aula',
      'y en Diseño Universal para el Aprendizaje (DUA). Diseña una presentación de clase real,',
      'lista para proyectar, para un docente chileno, con estos datos:',
      '',
      '• Tema: ' + c.tema,
      '• Asignatura: ' + c.asignatura,
      '• Curso: ' + c.curso,
      '• N° de diapositivas: ' + c.nSlides,
      '• Estilo pedagógico: ' + c.estilo,
      c.oa ? '• Objetivo/Aprendizaje MINEDUC (ÁNCLA TODO a esto): ' + c.oa : '',
      c.instrucciones ? '• Instrucciones adicionales: ' + c.instrucciones : '',
      '',
      'RESPONDE EN JSON ESTRICTO con esta estructura (sin markdown, sin explicación):',
      '{',
      '  "titulo": "Título general de la clase",',
      '  "subtitulo": "Curso · Asignatura",',
      '  "portada": { "resumen": "1 frase que engancha y resume la clase", "sugerenciaImagen": "prompt en inglés para imagen de portada, estilo educativo, sin texto" },',
      '  "aprendizajes": ["OA/AE: <texto del objetivo aterrizado a esta clase>", "Indicador de evaluación: <qué evidencia demuestra el logro>"],',
      '  "slides": [',
      '    { "momento": "Inicio | Desarrollo | Práctica guiada | Cierre", "titulo": "Título del slide", "bullets": ["punto 1", "punto 2"], "notasProfesor": "Guion para exponer + 1 pregunta para hacer a la clase + tiempo sugerido (ej: 5 min).", "sugerenciaImagen": "palabras clave en inglés" },',
      '    ...',
      '  ],',
      '  "actividad": { "titulo": "Actividad de aula", "descripcion": "Instrucción clara para el estudiante.\\nMateriales: ...\\nCriterios de logro: ...\\nDiferenciación (DUA/NEE): ...", "tiempo": "15 min" },',
      '  "cierre": { "titulo": "Cierre de la clase", "preguntas": ["pregunta de recuerdo", "pregunta de aplicación", "pregunta de análisis/creación"] }',
      '}',
      '',
      '════ SECUENCIA DIDÁCTICA (obligatoria) ════',
      'Los slides de contenido DEBEN seguir un arco pedagógico y cada uno lleva su "momento":',
      '  1) INICIO: activa conocimientos previos y motiva (pregunta gancho, situación cotidiana, ¿qué sabemos ya?).',
      '  2) DESARROLLO: presenta el contenido nuevo de forma progresiva, de lo simple a lo complejo.',
      '  3) PRÁCTICA GUIADA: un ejemplo resuelto paso a paso o un ejercicio modelado por el docente.',
      '  4) El slide de CIERRE lo cubre el bloque "cierre".',
      c.estilo ? ('Adapta el tono y la profundidad al estilo pedagógico "' + c.estilo + '".') : '',
      'Reparte los ' + nContenido + ' slides de contenido: ~1 de inicio, la mayoría de desarrollo, ~1 de práctica guiada.',
      '',
      '════ ANCLAJE CURRICULAR ════',
      c.oa ? '- TODO slide debe servir al objetivo indicado arriba; no incluyas relleno que no aporte al OA/AE.' : '- Define un foco de aprendizaje claro y coherente con el nivel.',
      '- "aprendizajes" debe incluir el objetivo aterrizado a ESTA clase y al menos 1 indicador de evaluación observable.',
      '- Vocabulario y ejemplos ajustados al nivel del curso (' + c.curso + ').',
      (this._nivelDe() === 'infantil'
        ? '- AUDIENCIA: NIÑOS (parvularia / 1°-4° básico). Lenguaje muy simple y cercano, frases cortas, tono lúdico y motivador, muchos ejemplos concretos y cotidianos; nada de tecnicismos ni textos largos. Bullets breves.'
        : this._nivelDe() === 'media'
          ? '- AUDIENCIA: adolescentes (enseñanza media). Puedes profundizar, usar vocabulario técnico apropiado y ejemplos más elaborados.'
          : '- AUDIENCIA: 2° ciclo básico (5°-8°). Lenguaje claro y ejemplos concretos, con algo más de profundidad que en los primeros años.'),
      '',
      '════ VARIEDAD COGNITIVA Y EJEMPLOS ════',
      '- Combina niveles de pensamiento: recordar, comprender, aplicar, analizar y crear (sin nombrar taxonomías).',
      '- Usa ejemplos CONCRETOS y contextualizados a Chile y a la vida del estudiante (lugares, situaciones, oficios, cultura chilena) cuando sea pertinente.',
      '- Las preguntas del cierre deben ir de menor a mayor exigencia cognitiva.',
      '',
      '════ NOTAS Y ACTIVIDAD ════',
      '- notasProfesor: español chileno, tono cercano; incluye qué decir, UNA pregunta para lanzar a la clase y un tiempo sugerido.',
      '- actividad.descripcion: además de la instrucción, agrega líneas para Materiales, Criterios de logro y Diferenciación (DUA/NEE), separadas por salto de línea (\\n).',
      '',
      '════ REGLAS DE FORMATO ════',
      '- Bullets: máximo 5 por slide, cada uno máx 12 palabras.',
      '- sugerenciaImagen: PALABRAS CLAVE ESPECÍFICAS EN INGLÉS (2 a 3 palabras MÁX) que existan como FOTO REAL. Objeto CONCRETO, no concepto abstracto.',
      '  Ejemplos BUENOS: "npn transistor", "human heart", "roman colosseum", "solar panel", "microscope cell".',
      '  Ejemplos MALOS: "abstract concept illustration", "modern educational design", "colorful diagram".',
      '  Para conceptos abstractos usa el objeto físico más representativo (ej: "flujo de corriente" → "electric wire", "democracia" → "voting box").',
      '  Cada slide DEBE tener una sugerenciaImagen DISTINTA a las demás. VARIEDAD.',
      '- N° total de slides = ' + c.nSlides + ' (portada + OA + contenido + actividad + cierre).',
      '- Distribución: 1 portada + 1 OA + ' + nContenido + ' contenido + 1 actividad + 1 cierre.',
      '',
      'DEVUELVE SOLO EL JSON, nada más.'
    ].filter(Boolean).join('\n');
  };

  // Detecta el nivel a partir del curso (texto libre): 'infantil' (pre-básica y
  // 1°-4° básico), 'basica2' (5°-8° básico) o 'media'.
  CCPptGenerator.prototype._nivelDe = function () {
    var t = String(this.config.curso || '').toLowerCase();
    if (/nt1|nt2|pre.?k|k[ií]nder|p[aá]rvul|transici/.test(t)) return 'infantil';
    if (/medi|\b[1-4]\s*[°º]?\s*m\b|\bem\b/.test(t)) return 'media';
    var m = t.match(/(\d)\s*[°ºa]?\s*b/);   // "3° básico", "3b", "3ª básico"
    if (m) { var n = parseInt(m[1], 10); return n <= 4 ? 'infantil' : 'basica2'; }
    var soloNum = t.match(/^\s*(\d)\b/);      // "3", "3ªE" → asumir básica
    if (soloNum) { var n2 = parseInt(soloNum[1], 10); return n2 <= 4 ? 'infantil' : 'basica2'; }
    return 'media';
  };

  // Elige el ESTILO visual de forma ALEATORIA, sesgado por el nivel:
  //   infantil → cálido/interactivo (colorido y dinámico, ideal para niños)
  //   basica2  → mezcla equilibrada
  //   media    → didáctico/formal (sobrio y profesional)
  // Ya no depende de ningún selector; varía en cada presentación.
  CCPptGenerator.prototype._elegirEstilo = function () {
    var poolPorNivel = {
      infantil: ['calida','interactiva','calida','interactiva','didactica'],
      basica2:  ['interactiva','didactica','calida','interactiva','formal'],
      media:    ['didactica','formal','interactiva','didactica','formal']
    };
    var pool = poolPorNivel[this._nivelDe()] || poolPorNivel.media;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // ── Paso 2: Descargar imágenes ────────────────────────────
  // Descarga una imagen desde una URL específica y la convierte a dataURL.
  // Valida que el content-type sea image/* y que el blob tenga tamaño > 1KB
  // (Pollinations a veces devuelve 200 con página HTML de error).
  CCPptGenerator.prototype._fetchDataUrl = function (url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      var ct = r.headers.get('content-type') || '';
      if (ct.indexOf('image/') !== 0) throw new Error('content-type no es imagen: ' + ct);
      return r.blob();
    }).then(function (blob) {
      if (!blob || blob.size < 1024) throw new Error('blob demasiado chico: ' + (blob ? blob.size : 0) + ' bytes');
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          var d = reader.result;
          // Doble validación: el dataURL debe empezar con data:image/
          if (typeof d !== 'string' || d.indexOf('data:image/') !== 0) {
            reject(new Error('dataURL inválido'));
            return;
          }
          resolve(d);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    });
  };

  // Limpia el prompt: quita palabras vacías de estilo y deja solo los sustantivos
  // clave. Esto mejora dramáticamente los resultados de búsqueda.
  function _limpiarPrompt(p) {
    return String(p || '')
      .replace(/\b(no text|educational|illustration|style|high quality|clean|modern|beautiful|colorful|simple|abstract|concept|showing|of|the|a|an|with)\b/gi, ' ')
      .replace(/[^\w\sÀ-ÿ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Busca en Google Images vía Custom Search JSON API. Requiere que el user haya
  // configurado sus credenciales (googleCseApiKey + googleCseId). 100 queries/día
  // gratis. Es la fuente MÁS RELEVANTE porque son literalmente resultados de Google.
  // Docs: https://developers.google.com/custom-search/v1/using_rest
  CCPptGenerator.prototype._buscarGoogleCSE = function (query) {
    var apiKey = this.config.googleCseApiKey;
    var cseId  = this.config.googleCseId;
    if (!apiKey || !cseId) return Promise.resolve(null);
    var q = _limpiarPrompt(query);
    if (!q) return Promise.resolve(null);
    var params = new URLSearchParams({
      key: apiKey, cx: cseId, q: q,
      searchType: 'image',
      num: '10',
      safe: 'active',           // filtro seguro (obligatorio para uso educativo)
      imgSize: 'large',         // preferir grandes (mejor calidad)
      imgType: 'photo',         // preferir fotos (no clipart/lineart)
      rights: 'cc_publicdomain,cc_attribute,cc_sharealike'   // licencias libres cuando sea posible
    });
    return fetch('https://www.googleapis.com/customsearch/v1?' + params.toString())
      .then(function (r) {
        if (!r.ok) {
          return r.json().then(function (err) {
            throw new Error('Google CSE ' + r.status + ': ' + ((err.error && err.error.message) || 'error'));
          });
        }
        return r.json();
      })
      .then(function (data) {
        if (!data.items || !data.items.length) return null;
        // Elegir aleatorio entre los top 3 para variedad
        var top = data.items.slice(0, 3);
        var elegida = top[Math.floor(Math.random() * top.length)];
        return elegida.link;
      })
      .catch(function (e) {
        console.warn('[PPT] Google CSE:', e.message);
        return null;
      });
  };

  // Busca la imagen destacada del artículo Wikipedia del concepto. Es la fuente
  // MÁS RELEVANTE para conceptos educativos concretos (transistor, célula,
  // revolución francesa, etc.) porque devuelve la imagen que los editores de
  // Wikipedia eligieron como representativa del artículo.
  // API sin key, CORS OK via origin=*.
  CCPptGenerator.prototype._buscarWikipediaArticulo = function (query) {
    var q = _limpiarPrompt(query);
    if (!q) return Promise.resolve(null);
    // Buscar el artículo más relevante y obtener su pageimage
    var params = new URLSearchParams({
      action: 'query', format: 'json', origin: '*',
      generator: 'search', gsrsearch: q, gsrlimit: '3',
      prop: 'pageimages', piprop: 'thumbnail|original',
      pithumbsize: '1024', pilimit: '3'
    });
    return fetch('https://en.wikipedia.org/w/api.php?' + params.toString())
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.query || !data.query.pages) return null;
        var pages = Object.values(data.query.pages);
        // Filtrar solo los que tienen imagen destacada
        var conImg = pages.filter(function (p) {
          return p.thumbnail && p.thumbnail.source;
        });
        if (conImg.length === 0) return null;
        // El primer resultado del ranking (index más bajo)
        conImg.sort(function (a, b) { return (a.index || 0) - (b.index || 0); });
        return conImg[0].thumbnail.source;
      })
      .catch(function () { return null; });
  };

  // Busca imagen en Openverse (agrega Flickr, Wikimedia, museos). API PÚBLICA
  // sin key, CORS OK. Devuelve URL de una foto real o null.
  CCPptGenerator.prototype._buscarOpenverse = function (query) {
    var q = _limpiarPrompt(query);
    if (!q) return Promise.resolve(null);
    // Toma solo las primeras 3 palabras (búsqueda más específica = mejores resultados)
    q = q.split(/\s+/).slice(0, 3).join(' ');
    var params = new URLSearchParams({
      q: q,
      page_size: '10',
      license_type: 'commercial',
      mature: 'false',
      format: 'json',
      // Preferir imágenes de tamaño mediano (evitar thumbnails minúsculos)
      size: 'medium,large'
    });
    return fetch(OPENVERSE_API + '?' + params.toString(), {
      headers: { 'Accept': 'application/json' }
    })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.results || !data.results.length) return null;
        // Filtrar candidatos con URL válida (thumbnail o URL directa)
        var candidatos = data.results.filter(function (img) {
          return img.thumbnail || img.url;
        });
        if (candidatos.length === 0) return null;
        // Elegir uno al azar entre los top 5 (variedad entre generaciones)
        var top = candidatos.slice(0, 5);
        var elegida = top[Math.floor(Math.random() * top.length)];
        return elegida.thumbnail || elegida.url;
      })
      .catch(function (e) {
        console.warn('[PPT] Openverse error:', e.message);
        return null;
      });
  };

  // Busca imagen en Wikimedia Commons (fallback). Devuelve URL de la mejor
  // imagen o null.
  CCPptGenerator.prototype._buscarWikimedia = function (query) {
    var q = _limpiarPrompt(query);
    if (!q) return Promise.resolve(null);
    // Solo primeras 3 palabras clave
    q = q.split(/\s+/).slice(0, 3).join(' ');
    var params = new URLSearchParams({
      action: 'query', format: 'json', origin: '*',
      generator: 'search', gsrnamespace: '6',
      gsrsearch: 'filetype:bitmap ' + q, gsrlimit: '10',
      prop: 'imageinfo', iiprop: 'url|size|mime',
      iiurlwidth: '1024'
    });
    return fetch(WIKIMEDIA_API + '?' + params.toString())
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.query || !data.query.pages) return null;
        var pages = Object.values(data.query.pages);
        var candidatos = pages.filter(function (p) {
          if (!p.imageinfo || !p.imageinfo[0]) return false;
          var info = p.imageinfo[0];
          var mime = info.mime || '';
          if (mime.indexOf('image/jpeg') !== 0 && mime.indexOf('image/png') !== 0) return false;
          if (!info.size || info.size < 10000) return false;
          return true;
        });
        if (candidatos.length === 0) return null;
        var elegida = candidatos[0].imageinfo[0];
        return elegida.thumburl || elegida.url;
      })
      .catch(function () { return null; });
  };

  // Combina el prompt de este slide con las palabras clave del docente.
  // NUEVA LÓGICA: si el docente escribió palabras separadas por comas, se rota
  // UNA distinta por slide. La sugerencia específica del slide se PRESERVA.
  //   • Sin palabras del docente → usa solo sugerenciaImagen del slide
  //   • Con "kw1, kw2, kw3" → slide 0 usa "kw1", slide 1 usa "kw2", etc.
  //   • Con palabra única "transistor" → se usa como contexto en todos
  // Así se evita que todas las búsquedas devuelvan la misma imagen.
  CCPptGenerator.prototype._promptEnriquecido = function (promptSlide, idxSlide) {
    var kwRaw = String(this.config.palabrasClaveImg || '').trim();
    var promptBase = String(promptSlide || '').trim();
    if (!kwRaw) return promptBase;
    var partes = kwRaw.split(/[,;\n]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (partes.length === 0) return promptBase;
    if (partes.length === 1) {
      // Palabra única: contexto general que se suma al específico del slide
      return partes[0] + ' ' + promptBase;
    }
    // Múltiples: rotar por índice. La palabra del docente MANDA (más específica
    // que la sugerencia genérica de Gemini).
    var i = (typeof idxSlide === 'number' ? idxSlide : 0) % partes.length;
    return partes[i];
  };

  // Selecciona la fuente y hace fallback en cadena hasta obtener imagen válida.
  CCPptGenerator.prototype._descargarImagen = function (prompt, modo, idxSlide) {
    var self = this;
    var q = this._promptEnriquecido(prompt, idxSlide);
    console.log('[PPT] Búsqueda slide ' + idxSlide + ':', q);
    // Para Pollinations: enriquecer prompt pidiendo estilo fotográfico
    var promptRico = q + ', professional photograph, high detail, sharp focus, educational, real photo';
    var urlPollinations = POLLINATIONS_URL + encodeURIComponent(promptRico) +
      '?width=1024&height=576&model=flux&nologo=true&enhance=true';

    function viaGoogle() {
      return self._buscarGoogleCSE(q).then(function (url) {
        if (!url) return Promise.reject(new Error('sin resultado google'));
        return self._fetchDataUrl(url);
      });
    }
    function viaWikipedia() {
      return self._buscarWikipediaArticulo(q).then(function (url) {
        if (!url) return Promise.reject(new Error('sin artículo wikipedia'));
        return self._fetchDataUrl(url);
      });
    }
    function viaOpenverse() {
      return self._buscarOpenverse(q).then(function (url) {
        if (!url) return Promise.reject(new Error('sin resultados openverse'));
        return self._fetchDataUrl(url);
      });
    }
    function viaWikimedia() {
      return self._buscarWikimedia(q).then(function (url) {
        if (!url) return Promise.reject(new Error('sin resultados wikimedia'));
        return self._fetchDataUrl(url);
      });
    }
    function viaPollinations() { return self._fetchDataUrl(urlPollinations); }

    // Serper.dev (Google Imágenes real) vía proxy serverless — la key vive en el
    // servidor (Firestore sistema/gemini.serperKey), ningún docente configura nada.
    // Devuelve una lista de URLs; probamos cada una hasta que descargue bien.
    function viaSerper() {
      // Reutiliza la función pública iaAsistente (accion:'imgSearch') para no
      // requerir permisos IAM de una función nueva.
      return fetch('/api/ia-asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'imgSearch', q: q })
      })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var urls = (data && data.images) || [];
        if (!urls.length) return Promise.reject(new Error('serper sin resultados'));
        // Barajar los resultados para que dos generaciones del mismo tema NO
        // usen siempre la misma imagen. Tomamos de los primeros ~8 (los más
        // relevantes) pero en orden aleatorio.
        urls = urls.slice(0, 8);
        for (var j = urls.length - 1; j > 0; j--) {
          var k = Math.floor(Math.random() * (j + 1));
          var tmp = urls[j]; urls[j] = urls[k]; urls[k] = tmp;
        }
        // Descargar cada imagen A TRAVÉS DEL SERVIDOR (evita CORS/Mixed-Content):
        // pedimos a la función que baje la URL y nos la devuelva como dataURL.
        var i = 0;
        function tryNext() {
          if (i >= urls.length) return Promise.reject(new Error('serper: ninguna descargable'));
          var u = urls[i++];
          return fetch('/api/ia-asistente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accion: 'fetchImg', url: u })
          })
          .then(function (r) { return r.json(); })
          .then(function (resp) {
            var d = resp && resp.dataUrl;
            if (typeof d === 'string' && d.indexOf('data:image/') === 0) return d;
            throw new Error(resp && resp.error ? resp.error : 'sin dataUrl');
          })
          .catch(tryNext);
        }
        return tryNext();
      });
    }

    // Cadena de fallback según modo. Serper (Google Imágenes) va primero en los
    // modos de fotos reales; si no hay key o falla, cae a las fuentes gratuitas.
    var pasos;
    if (modo === 'google' || modo === 'web' || modo === 'stock') {
      pasos = [viaSerper, viaWikipedia, viaOpenverse, viaWikimedia, viaPollinations];
    } else {
      // Modo IA: Pollinations primero, luego Serper y libres.
      pasos = [viaPollinations, viaSerper, viaWikipedia, viaOpenverse];
    }

    function intentar(i) {
      if (i >= pasos.length) return Promise.resolve(null);
      return pasos[i]().catch(function (err) {
        console.warn('[PPT] intento ' + (i + 1) + '/' + pasos.length + ' (' + (err && err.message || err) + ')');
        return intentar(i + 1);
      });
    }
    return intentar(0);
  };

  // Descarga SECUENCIAL con delay entre imágenes para evitar 429.
  CCPptGenerator.prototype._descargarTodasImagenes = function (onProgress) {
    var self = this;
    if (this.config.imagenes === 'ninguna' || !this.estructura) return Promise.resolve();
    var slides = this.estructura.slides || [];
    var tareas = [];
    // Portada (idxSlide = -1 para que use la primera palabra clave del docente)
    if (this.estructura.portada && this.estructura.portada.sugerenciaImagen) {
      tareas.push({ key: 'portada', prompt: this.estructura.portada.sugerenciaImagen, modo: this._modoImagen('portada'), idx: 0 });
    }
    // Slides (cada uno con su idx, para que rote las palabras clave del docente)
    slides.forEach(function (s, i) {
      if (s.sugerenciaImagen) tareas.push({ key: i, prompt: s.sugerenciaImagen, modo: self._modoImagen(i), idx: i + 1 });
    });
    var total = tareas.length;
    var hecho = 0;
    function tick() { hecho++; if (typeof onProgress === 'function') onProgress(hecho, total); }
    function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    // Ejecutar secuencial con delay 700ms entre requests (evita 429 en Pollinations).
    return tareas.reduce(function (chain, t) {
      return chain.then(function () {
        return self._descargarImagen(t.prompt, t.modo, t.idx).then(function (img) {
          if (img) self.imagenesGeneradas[t.key] = img;
          tick();
          return sleep(700);
        });
      });
    }, Promise.resolve());
  };

  CCPptGenerator.prototype._modoImagen = function (idx) {
    if (this.config.imagenes === 'stock')  return 'stock';
    if (this.config.imagenes === 'ia')     return 'ia';
    if (this.config.imagenes === 'web')    return 'web';    // Wikipedia + Openverse + ...
    if (this.config.imagenes === 'google') return 'google'; // Google Custom Search
    // 'ambas': portada IA + contenido intercalado IA/stock
    if (idx === 'portada') return 'ia';
    return (typeof idx === 'number' && idx % 2 === 0) ? 'ia' : 'stock';
  };

  // ── Paso 3: PptxGenJS → .pptx ─────────────────────────────
  CCPptGenerator.prototype.compilar = function (onProgress) {
    var self = this;
    if (!this.estructura) throw new Error('Primero llamá generar()');
    if (typeof PptxGenJS === 'undefined') throw new Error('PptxGenJS no está cargado (verificá CDN)');
    // Verificar API mínima
    try {
      var _t = new PptxGenJS();
      if (typeof _t.addSlide !== 'function' || typeof _t.write !== 'function') {
        throw new Error('PptxGenJS cargado incorrectamente (falta addSlide/write)');
      }
    } catch (e) { throw new Error('PptxGenJS falla al instanciar: ' + e.message); }

    return this._descargarTodasImagenes(onProgress).then(function () {
      // ═══ DISEÑO MEJORADO · con backgrounds, franjas de color y footer ═══
      var pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';
      pptx.author = self.config.profesorNombre || 'Click&Clase';
      pptx.title  = self.estructura.titulo || 'Presentación';

      // ═══ ALEATORIEDAD POR GENERACIÓN ═══
      // El ESTILO se elige solo, ALEATORIO pero sesgado por el nivel del curso
      // (infantil/básica → vivo y dinámico; media → sobrio/profesional). Además
      // se elige una variante de color, un patrón de fondo y una transición base.
      // Elegir diseño evitando repetir el de la generación anterior (variedad real).
      var _ultimo = '';
      try { _ultimo = localStorage.getItem('cc_ppt_ultimo_diseno') || ''; } catch (e) {}
      var estiloElegido, idxVariante, patronFondo, firma, _intentos = 0;
      do {
        estiloElegido = self._elegirEstilo();
        var _vt = TEMAS_COLOR[estiloElegido] || TEMAS_COLOR.didactica;
        idxVariante = Math.floor(Math.random() * _vt.length);
        patronFondo = PATRONES_FONDO[Math.floor(Math.random() * PATRONES_FONDO.length)];
        firma = estiloElegido + '|' + idxVariante + '|' + patronFondo;
      } while (firma === _ultimo && ++_intentos < 6);
      try { localStorage.setItem('cc_ppt_ultimo_diseno', firma); } catch (e) {}
      self.config.estilo = estiloElegido; // reflejar para transiciones y prompt
      var variantesTema = TEMAS_COLOR[estiloElegido] || TEMAS_COLOR.didactica;
      var color = variantesTema[idxVariante];
      self._diseno = { color: color, patron: patronFondo, variante: idxVariante };
      console.log('[PPT] Diseño aleatorio · nivel=' + self._nivelDe() + ' estilo=' + estiloElegido + ' variante=' + idxVariante + ' patrón=' + patronFondo);

      var totalSlides = (self.estructura.slides || []).length;
      var pieDocente = (self.config.profesorNombre || '') + '  ·  ' + (self.config.liceoNombre || 'Click&Clase');

      // Helper: pinta el patrón de fondo decorativo. IMPORTANTE: los patrones
      // se pintan ANTES del contenido para que queden debajo (visualmente).
      // Todos son claramente visibles a diferencia entre generaciones.
      function pintarPatron(slide, esPortada) {
        // IMPORTANTE: ningún patrón invade el área del footer (y=5.35 a 5.63)
        // ni el área del encabezado (y=0 a 0.15).
        try {
          if (patronFondo === 'banda-izquierda') {
            // Franja vertical de 0.5" en color primary (a la izquierda), sin footer
            slide.addShape(pptx.ShapeType.rect, {
              x: 0, y: 0.15, w: 0.5, h: 5.2,
              fill: { color: color.primary }, line: { type: 'none' }
            });
          } else if (patronFondo === 'header-tinted') {
            // Tercio superior con color soft de fondo
            slide.addShape(pptx.ShapeType.rect, {
              x: 0, y: 0.15, w: 10, h: 1.35,
              fill: { color: color.soft }, line: { type: 'none' }
            });
          } else if (patronFondo === 'cuadro-esquina') {
            // Cuadrado grande de color soft en esquina inferior derecha
            slide.addShape(pptx.ShapeType.rect, {
              x: 7.5, y: 3.5, w: 2.5, h: 1.85,
              fill: { color: color.soft }, line: { type: 'none' }
            });
          } else if (patronFondo === 'doble-franja') {
            // Dos franjas soft: una en el header + una entre contenido y footer
            slide.addShape(pptx.ShapeType.rect, {
              x: 0, y: 0.15, w: 10, h: 0.7,
              fill: { color: color.soft }, line: { type: 'none' }
            });
            slide.addShape(pptx.ShapeType.rect, {
              x: 0, y: 4.75, w: 10, h: 0.6,
              fill: { color: color.soft }, line: { type: 'none' }
            });
          } else if (patronFondo === 'fondo-crema') {
            // Rectángulo full-slide en color soft (excluyendo header y footer)
            slide.addShape(pptx.ShapeType.rect, {
              x: 0, y: 0.15, w: 10, h: 5.2,
              fill: { color: color.soft }, line: { type: 'none' }
            });
          }
        } catch (e) { console.warn('[PPT] patrón fondo falló:', e.message); }
      }

      // Helper: agregar franja de color en un slide (barra decorativa)
      // Sin line (border) para evitar renderizado inesperado de PowerPoint.
      function franja(slide, x, y, w, h, colorHex) {
        try {
          slide.addShape(pptx.ShapeType.rect, {
            x: x, y: y, w: w, h: h,
            fill: { color: colorHex },
            line: { type: 'none' }
          });
        } catch (e) { console.warn('[PPT] franja falló:', e.message); }
      }
      // Helper: footer compacto con nombre docente + número página
      function footer(slide, pagIdx, pagTotal) {
        franja(slide, 0, 5.35, 10, 0.28, color.primary);
        slide.addText(pieDocente, {
          x: 0.35, y: 5.35, w: 6.5, h: 0.28,
          fontSize: 9, color: 'FFFFFF', valign: 'middle', fontFace: 'Calibri'
        });
        if (pagIdx && pagTotal) {
          slide.addText(pagIdx + ' / ' + pagTotal, {
            x: 8.3, y: 5.35, w: 1.4, h: 0.28,
            fontSize: 9, color: 'FFFFFF', bold: true, align: 'right', valign: 'middle', fontFace: 'Calibri'
          });
        }
      }
      // Helper: encabezado consistente. UN SOLO objeto para la pill (fill+texto
      // combinados) para evitar overlap raro con animaciones. Parámetro opcional
      // pillColor permite variar el color de la pill por slide.
      function encabezado(slide, categoria, titulo, pillColor) {
        franja(slide, 0, 0, 10, 0.15, color.primary);
        var pill = pillColor || color.accent;
        if (categoria) {
          try {
            slide.addText(categoria, {
              shape: pptx.ShapeType.rect,
              x: 0.4, y: 0.4, w: 1.6, h: 0.32,
              fontSize: 11, bold: true, color: 'FFFFFF',
              align: 'center', valign: 'middle', fontFace: 'Calibri',
              fill: { color: pill }, line: { type: 'none' }
            });
          } catch (e) {
            franja(slide, 0.4, 0.4, 1.6, 0.32, pill);
            slide.addText(categoria, {
              x: 0.4, y: 0.4, w: 1.6, h: 0.32, fontSize: 11, bold: true,
              color: 'FFFFFF', align: 'center', valign: 'middle', fontFace: 'Calibri'
            });
          }
        }
        var titY = categoria ? 0.85 : 0.4;
        slide.addText(titulo || '', {
          x: 0.4, y: titY, w: 9.2, h: 0.6, fontSize: 24, bold: true,
          color: color.primary, valign: 'middle', fontFace: 'Calibri'
        });
        franja(slide, 0.4, titY + 0.65, 9.2, 0.03, color.accent);
      }

      // ── PORTADA ──
      var p1 = pptx.addSlide();
      p1.background = { color: color.soft };
      pintarPatron(p1, true);
      // Franja superior y línea acento (sin franja lateral grande que tapa)
      franja(p1, 0, 0, 10, 0.25, color.primary);
      franja(p1, 0, 5.38, 10, 0.25, color.accent);

      p1.addText(self.estructura.titulo || 'Presentación', {
        x: 0.7, y: 1.4, w: 8.6, h: 1.6, fontSize: 40, bold: true,
        color: color.primary, align: 'left', valign: 'middle', fontFace: 'Calibri'
      });
      // Línea separadora bajo el título
      franja(p1, 0.7, 3.05, 3, 0.05, color.accent);

      p1.addText(self.estructura.subtitulo || (self.config.asignatura + ' · ' + self.config.curso), {
        x: 0.7, y: 3.25, w: 8.6, h: 0.5, fontSize: 18, color: color.text, align: 'left', fontFace: 'Calibri'
      });
      if (self.estructura.portada && self.estructura.portada.resumen) {
        p1.addText(self.estructura.portada.resumen, {
          x: 0.7, y: 3.85, w: 8.6, h: 0.9, fontSize: 13,
          color: color.muted, align: 'left', italic: true, fontFace: 'Calibri'
        });
      }
      p1.addText(pieDocente, {
        x: 0.7, y: 4.85, w: 8.6, h: 0.3, fontSize: 11,
        color: color.primary, bold: true, align: 'left', fontFace: 'Calibri'
      });

      // ── OA / APRENDIZAJES ──
      if (self.estructura.aprendizajes && self.estructura.aprendizajes.length) {
        var pOA = pptx.addSlide();
        pOA.background = { color: color.bg };
        pintarPatron(pOA, false);
        encabezado(pOA, 'OA', 'Objetivo de la clase');
        var oaBullets = self.estructura.aprendizajes;
        var cfgOA = ajustarTexto(oaBullets, false);
        var oaText = oaBullets.map(function (a) { return '▸  ' + a; }).join(cfgOA.sep);
        // Card con background suave
        franja(pOA, 0.4, 1.6, 9.2, 3.6, color.soft);
        pOA.addText(oaText, {
          x: 0.7, y: 1.75, w: 8.6, h: 3.35, fontSize: cfgOA.fs, color: color.text,
          valign: 'top', fontFace: 'Calibri', paraSpaceAfter: cfgOA.sp
        });
        footer(pOA, 1, totalSlides + 3);
      }

      // ── ÍNDICE (nuevo, después de OA) ──
      if ((self.estructura.slides || []).length >= 4) {
        var pIx = pptx.addSlide();
        pIx.background = { color: color.bg };
        pintarPatron(pIx, false);
        encabezado(pIx, 'ÍNDICE', 'Recorrido de la clase');
        var indiceLines = (self.estructura.slides || []).map(function(s, i) {
          var num = String(i + 1).padStart(2, '0');
          return num + '.  ' + (s.titulo || 'Diapositiva ' + (i+1));
        }).join('\n');
        var fsIndex = (self.estructura.slides.length > 12) ? 12 : (self.estructura.slides.length > 8) ? 13 : 15;
        pIx.addText(indiceLines, {
          x: 0.7, y: 1.75, w: 8.6, h: 3.4, fontSize: fsIndex, color: color.text,
          valign: 'top', fontFace: 'Calibri', paraSpaceAfter: 4
        });
        footer(pIx, 2, totalSlides + 4);
      }

      // ── CONTENIDO (slides) ──
      // Helper: calcula fontSize + spacing según CANTIDAD y LARGO de bullets
      // para que el texto SIEMPRE quepa sin cortarse.
      function ajustarTexto(bullets, conImagen) {
        var n = bullets.length;
        var largoProm = 0;
        bullets.forEach(function (b) { largoProm += (b || '').length; });
        largoProm = n ? Math.round(largoProm / n) : 0;
        // "grande" si promedio > 70 chars, "mediano" si > 40, chico si <
        var factorLargo = largoProm > 70 ? -2 : (largoProm > 40 ? -1 : 0);
        var factorSpacing = largoProm > 70 ? -2 : (largoProm > 40 ? 0 : 2);

        var base;
        if (conImagen) {
          if (n <= 3)      base = { fs: 16, sp: 12, sep: '\n\n' };
          else if (n <= 4) base = { fs: 15, sp: 8,  sep: '\n\n' };
          else if (n <= 5) base = { fs: 14, sp: 6,  sep: '\n' };
          else             base = { fs: 12, sp: 4,  sep: '\n' };
        } else {
          if (n <= 3)      base = { fs: 20, sp: 14, sep: '\n\n' };
          else if (n <= 4) base = { fs: 18, sp: 10, sep: '\n\n' };
          else if (n <= 5) base = { fs: 16, sp: 8,  sep: '\n' };
          else if (n <= 6) base = { fs: 15, sp: 6,  sep: '\n' };
          else             base = { fs: 13, sp: 4,  sep: '\n' };
        }
        // Ajustar por largo
        base.fs = Math.max(10, base.fs + factorLargo);
        base.sp = Math.max(2,  base.sp + factorSpacing);
        // Si es texto muy largo Y muchos bullets, forzar separador simple
        if (n >= 5 || largoProm > 60) base.sep = '\n';
        return base;
      }
      // Helper: elige tamaño de fuente para textos "libres" (párrafos únicos)
      // según largo total en caracteres. Se usa en OA/actividad/cierre.
      function fsPorLargo(texto, altoDisponibleIn, anchoDisponibleIn) {
        var chars = (texto || '').length;
        // Aproximación: cada char ocupa ~fs*0.15/72 pulgadas de ancho.
        // Área disponible en "chars ~ area * 60"
        var areaIn2 = (altoDisponibleIn || 3) * (anchoDisponibleIn || 8);
        var densidad = chars / areaIn2;   // chars por pulgada cuadrada
        if (densidad > 70) return 12;
        if (densidad > 45) return 14;
        if (densidad > 25) return 16;
        return 18;
      }

      // Coloca una imagen dentro de un MARCO blanco tipo "figura": tarjeta
      // blanca con borde suave y sombra, y la imagen CONTENIDA (sin recortar ni
      // deformar). Así cualquier imagen —diagrama, foto o captura— se ve prolija
      // y pareja, en vez de recortada o pegada sobre el fondo.
      function imagenEnMarco(slide, dataUrl, x, y, w, h) {
        try {
          slide.addShape(pptx.ShapeType.roundRect, {
            x: x, y: y, w: w, h: h, rectRadius: 0.06,
            fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1 },
            shadow: { type: 'outer', color: '94A3B8', blur: 5, offset: 2, angle: 90, opacity: 0.3 }
          });
        } catch (e) { /* si roundRect no está, seguimos sin marco */ }
        var pad = 0.14;
        slide.addImage({
          data: dataUrl,
          x: x + pad, y: y + pad, w: w - pad * 2, h: h - pad * 2,
          sizing: { type: 'contain', w: w - pad * 2, h: h - pad * 2 }
        });
      }

      (self.estructura.slides || []).forEach(function (s, i) {
        var ps = pptx.addSlide();
        ps.background = { color: color.bg };
        pintarPatron(ps, false);

        // Encabezado con número. La pill alterna entre 3 colores por slide para
        // dar ritmo visual dentro de la misma PPT (accent → primary → text_muted).
        var num = String(i + 1).padStart(2, '0');
        // Si la IA marcó el momento didáctico, lo mostramos en la pill (INICIO · 01).
        var categoria = s.momento ? (String(s.momento).toUpperCase() + ' · ' + num) : num;
        var pillsPorSlide = [color.accent, color.primary, color.muted];
        var pillColor = pillsPorSlide[i % pillsPorSlide.length];
        encabezado(ps, categoria, s.titulo || ('Diapositiva ' + (i + 1)), pillColor);

        var tieneImg = !!self.imagenesGeneradas[i];
        var bulletsArr = s.bullets || [];
        var cfg = ajustarTexto(bulletsArr, tieneImg);
        var bullets = bulletsArr.map(function (b) { return '▸  ' + b; }).join(cfg.sep);

        // Área de contenido: y=1.6 (bajo el encabezado) hasta 5.2 (arriba del footer)
        var yContent = 1.6;
        var hContent = 3.6;

        if (tieneImg) {
          try {
            // 3 layouts alternados por slide (i % 3) para dinamismo:
            //   0 → texto IZQ + imagen DER (clásico)
            //   1 → imagen IZQ + texto DER (invertido)
            //   2 → imagen ARRIBA + texto ABAJO (horizontal)
            var layoutIdx = i % 3;
            if (layoutIdx === 0) {
              // Texto izquierda, imagen derecha (en marco)
              franja(ps, 0.4, yContent, 5.25, hContent, color.soft);
              ps.addText(bullets, {
                x: 0.6, y: yContent + 0.1, w: 4.85, h: hContent - 0.2, fontSize: cfg.fs,
                color: color.text, valign: 'top', fontFace: 'Calibri', paraSpaceAfter: cfg.sp
              });
              imagenEnMarco(ps, self.imagenesGeneradas[i], 5.75, yContent, 4.05, hContent);
            } else if (layoutIdx === 1) {
              // Imagen izquierda (en marco), texto derecha
              imagenEnMarco(ps, self.imagenesGeneradas[i], 0.4, yContent, 4.05, hContent);
              franja(ps, 4.7, yContent, 5.1, hContent, color.soft);
              ps.addText(bullets, {
                x: 4.9, y: yContent + 0.1, w: 4.7, h: hContent - 0.2, fontSize: cfg.fs,
                color: color.text, valign: 'top', fontFace: 'Calibri', paraSpaceAfter: cfg.sp
              });
            } else {
              // Imagen arriba (en marco), texto abajo
              var hImg = hContent * 0.55;
              var hTxt = hContent - hImg - 0.1;
              imagenEnMarco(ps, self.imagenesGeneradas[i], 2.2, yContent, 5.6, hImg);
              franja(ps, 0.4, yContent + hImg + 0.1, 9.2, hTxt, color.soft);
              // Ajustar texto: menos alto disponible ⇒ fuente más chica
              var cfgH = ajustarTexto(bulletsArr, true);
              cfgH.fs = Math.max(11, cfgH.fs - 2);
              var bulletsH = bulletsArr.map(function (b) { return '▸  ' + b; }).join(cfgH.sep);
              ps.addText(bulletsH, {
                x: 0.6, y: yContent + hImg + 0.2, w: 9, h: hTxt - 0.2, fontSize: cfgH.fs,
                color: color.text, valign: 'top', fontFace: 'Calibri', paraSpaceAfter: cfgH.sp
              });
            }
          } catch (e) {
            console.warn('[PPT] falló addImage slide ' + i + ':', e.message);
            franja(ps, 0.4, yContent, 9.2, hContent, color.soft);
            ps.addText(bullets, { x: 0.7, y: yContent + 0.1, w: 8.6, h: hContent - 0.2, fontSize: cfg.fs, color: color.text, valign: 'top', fontFace: 'Calibri', paraSpaceAfter: cfg.sp });
          }
        } else {
          franja(ps, 0.4, yContent, 9.2, hContent, color.soft);
          ps.addText(bullets, {
            x: 0.7, y: yContent + 0.1, w: 8.6, h: hContent - 0.2, fontSize: cfg.fs, color: color.text,
            valign: 'top', fontFace: 'Calibri', paraSpaceAfter: cfg.sp
          });
        }
        footer(ps, i + 3, totalSlides + 4);
        if (s.notasProfesor) {
          try { ps.addNotes(s.notasProfesor); } catch (e) { console.warn('[PPT] falló addNotes:', e.message); }
        }
      });

      // ── ACTIVIDAD ──
      if (self.estructura.actividad) {
        var pA = pptx.addSlide();
        pA.background = { color: color.bg };
        pintarPatron(pA, false);
        encabezado(pA, 'ACTIVIDAD', self.estructura.actividad.titulo || 'Actividad de aula');
        // Card con background suave
        franja(pA, 0.4, 1.6, 9.2, 3.2, color.soft);
        var descAct = self.estructura.actividad.descripcion || '';
        pA.addText(descAct, {
          x: 0.7, y: 1.75, w: 8.6, h: 2.9,
          fontSize: fsPorLargo(descAct, 2.9, 8.6),
          color: color.text, valign: 'top', fontFace: 'Calibri', paraSpaceAfter: 8
        });
        if (self.estructura.actividad.tiempo) {
          pA.addText('Tiempo estimado: ' + self.estructura.actividad.tiempo, {
            x: 0.7, y: 4.9, w: 6, h: 0.35, fontSize: 13, color: color.primary, bold: true, fontFace: 'Calibri'
          });
        }
        footer(pA, totalSlides + 3, totalSlides + 4);
      }

      // ── CIERRE ──
      if (self.estructura.cierre) {
        var pC = pptx.addSlide();
        pC.background = { color: color.primary };
        // (Cierre usa fondo primario oscuro, no aplica patrón decorativo)
        // Marco decorativo
        franja(pC, 0.5, 0.5, 9, 0.05, color.accent);
        franja(pC, 0.5, 5.08, 9, 0.05, color.accent);

        pC.addText(self.estructura.cierre.titulo || 'Cierre de la clase', {
          x: 0.5, y: 1.4, w: 9, h: 1, fontSize: 34, bold: true,
          color: 'FFFFFF', align: 'center', valign: 'middle', fontFace: 'Calibri'
        });
        if (self.estructura.cierre.preguntas && self.estructura.cierre.preguntas.length) {
          var pregArr = self.estructura.cierre.preguntas;
          var cfgP = ajustarTexto(pregArr, false);
          var pregs = pregArr.map(function (p) { return '• ' + p; }).join(cfgP.sep);
          pC.addText(pregs, {
            x: 1.5, y: 2.7, w: 7, h: 2, fontSize: Math.min(18, cfgP.fs + 2),
            color: 'FFFFFF', align: 'center', valign: 'top', fontFace: 'Calibri',
            paraSpaceAfter: cfgP.sp
          });
        }
        pC.addText(pieDocente, {
          x: 0.5, y: 5.2, w: 9, h: 0.3, fontSize: 10,
          color: 'FFFFFF', italic: true, align: 'center', fontFace: 'Calibri'
        });
      }

      self._pptxListo = pptx;
      return pptx;
    });
  };

  // ── Paso 4: Descargar en el navegador ─────────────────────
  // Flujo:
  //  1) Compilar con PptxGenJS
  //  2) Generar blob con write({outputType:'blob'})
  //  3) POST-PROCESAR con JSZip: inyectar <p:transition> en cada slide XML
  //  4) Regenerar blob con MIME correcto y descargar
  CCPptGenerator.prototype.descargar = function (nombreArchivo, onProgress) {
    var self = this;
    return this.compilar(onProgress).then(function (pptx) {
      var fileName = nombreArchivo || self._nombreArchivoDefault();
      console.log('[PPT] Generando blob con transiciones ·', fileName);
      // Generar blob de pptx (sin transiciones aún)
      return pptx.write({ outputType: 'blob' }).then(function (blob) {
        return self._inyectarTransiciones(blob);
      }).then(function (blobFinal) {
        console.log('[PPT] ✓ Blob final ·', Math.round(blobFinal.size / 1024) + ' KB');
        // Descargar con MIME explícito
        var mime = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        var url = URL.createObjectURL(new Blob([blobFinal], { type: mime }));
        var a = document.createElement('a');
        a.href = url; a.download = fileName;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
        return fileName;
      });
    });
  };

  // Post-procesar el .pptx (ZIP) para inyectar <p:transition> Y <p:timing> (animaciones)
  // en cada slideN.xml. Usa JSZip incluido en el bundle de PptxGenJS.
  CCPptGenerator.prototype._inyectarTransiciones = function (blob) {
    var self = this;
    var JSZipRef = window.JSZip || (window.PptxGenJS && window.PptxGenJS.JSZip);
    if (!JSZipRef) {
      console.warn('[PPT] JSZip no disponible, transiciones/animaciones omitidas');
      return Promise.resolve(blob);
    }
    // Catálogo de transiciones + peso por estilo (didáctica prefiere suaves,
    // interactiva prefiere dinámicas)
    var TRANSICIONES_TODAS = [
      '<p:fade/>',
      '<p:push dir="l"/>',  '<p:push dir="r"/>',  '<p:push dir="u"/>',  '<p:push dir="d"/>',
      '<p:wipe dir="l"/>',  '<p:wipe dir="r"/>',
      '<p:cover dir="l"/>', '<p:cover dir="d"/>',
      '<p:split dir="in" orient="horz"/>',
      '<p:split dir="out" orient="vert"/>',
      '<p:dissolve/>',
      '<p:zoom/>'
    ];
    // Sub-selección según estilo (para respetar el "clima" del PPT)
    var TRANSICIONES_POR_ESTILO = {
      didactica:   ['<p:fade/>','<p:push dir="l"/>','<p:wipe dir="l"/>','<p:cover dir="l"/>','<p:dissolve/>'],
      formal:      ['<p:fade/>','<p:wipe dir="l"/>','<p:cover dir="d"/>','<p:dissolve/>'],
      interactiva: TRANSICIONES_TODAS,
      calida:      ['<p:fade/>','<p:zoom/>','<p:push dir="r"/>','<p:cover dir="l"/>','<p:split dir="in" orient="horz"/>']
    };
    var pool = TRANSICIONES_POR_ESTILO[self.config.estilo] || TRANSICIONES_TODAS;
    // ÚNICA transición por generación: se elige aleatoria y se aplica a TODOS los slides
    // (más coherencia visual dentro de la misma PPT; cada nueva PPT elige otra).
    var xmlTransFija = pool[Math.floor(Math.random() * pool.length)];
    var transXmlFinal = '<p:transition spd="med" advClick="1">' + xmlTransFija + '</p:transition>';
    console.log('[PPT] Transición elegida para esta generación:', xmlTransFija);

    // Preset de animación ÚNICO por generación (se guarda en self._diseno para
    // que _generarTimingParaSlide lo use en todos los slides).
    var PRESETS_ANIM = [
      { id: 10, sub: 0,  nombre: 'Fade' },
      { id: 1,  sub: 0,  nombre: 'Appear' },
      { id: 2,  sub: 4,  nombre: 'Fly In desde abajo' },
      { id: 2,  sub: 8,  nombre: 'Fly In desde izquierda' },
      { id: 22, sub: 8,  nombre: 'Wipe desde izquierda' },
      { id: 12, sub: 8,  nombre: 'Peek desde izquierda' },
      { id: 4,  sub: 16, nombre: 'Box in' }
    ];
    var presetAnim = PRESETS_ANIM[Math.floor(Math.random() * PRESETS_ANIM.length)];
    self._diseno = self._diseno || {};
    self._diseno.presetAnim = presetAnim;
    console.log('[PPT] Animación elegida para esta generación:', presetAnim.nombre);

    return JSZipRef.loadAsync(blob).then(function (zip) {
      var slideFiles = Object.keys(zip.files).filter(function (name) {
        return /^ppt\/slides\/slide\d+\.xml$/.test(name);
      });
      console.log('[PPT] Inyectando transición + animaciones en ' + slideFiles.length + ' slides');
      var promesas = slideFiles.map(function (name) {
        return zip.file(name).async('string').then(function (xml) {
          var nuevoXml = xml;
          // 1) Transición entre slides (misma para toda la PPT)
          if (nuevoXml.indexOf('<p:transition') === -1) {
            nuevoXml = nuevoXml.replace('</p:sld>', transXmlFinal + '</p:sld>');
          }
          // 2) Timing con animaciones (solo shapes de texto, no decorativos)
          if (nuevoXml.indexOf('<p:timing') === -1) {
            var timingXml = self._generarTimingParaSlide(nuevoXml);
            if (timingXml) {
              nuevoXml = nuevoXml.replace('</p:sld>', timingXml + '</p:sld>');
            }
          }
          zip.file(name, nuevoXml);
        });
      });
      return Promise.all(promesas).then(function () {
        return zip.generateAsync({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 }
        });
      });
    }).catch(function (err) {
      console.warn('[PPT] Fallo al inyectar transiciones/animaciones:', err.message);
      return blob;
    });
  };

  // Genera un bloque <p:timing> con animación para los shapes CON TEXTO REAL
  // (excluye franjas/decoraciones sin texto que causaban artifacts "fantasma").
  // Usa el preset guardado en self._diseno.presetAnim (mismo para toda la PPT).
  // Todos entran con afterEffect (auto, sin clic), escalonados 300ms.
  CCPptGenerator.prototype._generarTimingParaSlide = function (slideXml) {
    // Parseo shape-por-shape: por cada <p:sp>...</p:sp> extraigo el id y
    // verifico si tiene <a:t>...</a:t> con contenido no vacío. Solo esos animo.
    var ids = [];
    var reShape = /<p:sp>[\s\S]*?<\/p:sp>/g;
    var shapeMatch;
    while ((shapeMatch = reShape.exec(slideXml)) !== null) {
      var shapeXml = shapeMatch[0];
      var idMatch = shapeXml.match(/<p:cNvPr\s+id="(\d+)"/);
      if (!idMatch) continue;
      var id = parseInt(idMatch[1], 10);
      if (id <= 1) continue;
      // Extraer texto real (concatenar todos los <a:t>...</a:t>)
      var textos = shapeXml.match(/<a:t[^>]*>([^<]*)<\/a:t>/g) || [];
      var textoTotal = textos.map(function (t) {
        var m = t.match(/<a:t[^>]*>([^<]*)<\/a:t>/);
        return m ? m[1] : '';
      }).join('').trim();
      // FILTROS de exclusión (evitar animar decoraciones o textos cortos):
      // 1) Texto muy corto (pills "01", "OA", números de página, "3 / 8")
      if (textoTotal.length < 15) continue;
      // 2) Shape con fill sólido en spPr = pill/franja decorativa con texto
      //    (los TextBox limpios NO tienen <a:solidFill> en <p:spPr>)
      var spPrMatch = shapeXml.match(/<p:spPr>[\s\S]*?<\/p:spPr>/);
      if (spPrMatch && spPrMatch[0].indexOf('<a:solidFill') !== -1) continue;
      // 3) Textos del footer (contienen el nombre del docente o Click&Clase)
      if (textoTotal.indexOf('Click&Clase') !== -1) continue;
      if (ids.indexOf(id) === -1) ids.push(id);
    }
    if (ids.length === 0) return '';
    // Limitar a 5 objetos animados por slide (evita saturar visualmente)
    if (ids.length > 5) ids = ids.slice(0, 5);

    // Preset fijo por generación (mismo para toda la PPT)
    var preset = (this._diseno && this._diseno.presetAnim) || { id: 10, sub: 0 };

    var seqId = 2;
    function nextId(){ seqId++; return seqId; }

    // Todas las animaciones son afterEffect (automáticas) con delay escalonado.
    // SOLO usamos <p:set> style.visibility=visible — PowerPoint interpreta el
    // presetID/presetSubtype y aplica el efecto visual correcto SIN necesidad
    // del <p:anim> manual (que deformaba el ancho del shape con ppt_w).
    var animsXml = ids.map(function (spId, idx) {
      var delay = String(200 + idx * 300);
      return '' +
        '<p:par>' +
          '<p:cTn id="' + nextId() + '" fill="hold">' +
            '<p:stCondLst><p:cond delay="indefinite"/></p:stCondLst>' +
            '<p:childTnLst>' +
              '<p:par>' +
                '<p:cTn id="' + nextId() + '" fill="hold">' +
                  '<p:stCondLst><p:cond delay="0"/></p:stCondLst>' +
                  '<p:childTnLst>' +
                    '<p:par>' +
                      '<p:cTn id="' + nextId() + '" presetID="' + preset.id + '" presetClass="entr" presetSubtype="' + preset.sub + '" fill="hold" grpId="0" nodeType="afterEffect">' +
                        '<p:stCondLst><p:cond delay="' + delay + '"/></p:stCondLst>' +
                        '<p:childTnLst>' +
                          '<p:set>' +
                            '<p:cBhvr>' +
                              '<p:cTn id="' + nextId() + '" dur="1" fill="hold">' +
                                '<p:stCondLst><p:cond delay="0"/></p:stCondLst>' +
                              '</p:cTn>' +
                              '<p:tgtEl><p:spTgt spid="' + spId + '"/></p:tgtEl>' +
                              '<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst>' +
                            '</p:cBhvr>' +
                            '<p:to><p:strVal val="visible"/></p:to>' +
                          '</p:set>' +
                        '</p:childTnLst>' +
                      '</p:cTn>' +
                    '</p:par>' +
                  '</p:childTnLst>' +
                '</p:cTn>' +
              '</p:par>' +
            '</p:childTnLst>' +
          '</p:cTn>' +
        '</p:par>';
    }).join('');

    // Envolver en la estructura completa de timing
    return '' +
      '<p:timing>' +
        '<p:tnLst>' +
          '<p:par>' +
            '<p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot">' +
              '<p:childTnLst>' +
                '<p:seq concurrent="1" nextAc="seek">' +
                  '<p:cTn id="' + nextId() + '" dur="indefinite" nodeType="mainSeq">' +
                    '<p:childTnLst>' + animsXml + '</p:childTnLst>' +
                  '</p:cTn>' +
                  '<p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>' +
                  '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst>' +
                '</p:seq>' +
              '</p:childTnLst>' +
            '</p:cTn>' +
          '</p:par>' +
        '</p:tnLst>' +
      '</p:timing>';
  };

  CCPptGenerator.prototype._nombreArchivoDefault = function () {
    var t = (this.estructura && this.estructura.titulo) || this.config.tema || 'presentacion';
    var slug = t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
    var f = new Date().toISOString().slice(0, 10);
    return slug + '_' + f + '.pptx';
  };

  // ── Editar un slide antes de compilar ─────────────────────
  CCPptGenerator.prototype.editar = function (idx, cambios) {
    if (!this.estructura || !this.estructura.slides || !this.estructura.slides[idx]) return;
    Object.assign(this.estructura.slides[idx], cambios);
  };

  window.CCPptGenerator = CCPptGenerator;
})();
