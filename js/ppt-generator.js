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
  var UNSPLASH_URL     = 'https://source.unsplash.com/1600x900/?';

  // Paletas por estilo pedagógico
  var TEMAS_COLOR = {
    didactica:   { bg:'FFFFFF', primary:'2563EB', accent:'0EA5E9', text:'0C1E3B', muted:'475569' },
    formal:      { bg:'FFFFFF', primary:'0F172A', accent:'1E40AF', text:'0F172A', muted:'475569' },
    interactiva: { bg:'FFFFFF', primary:'0F766E', accent:'14B8A6', text:'0C1E3B', muted:'334155' },
    calida:      { bg:'FFFFFF', primary:'C2410C', accent:'F97316', text:'431407', muted:'78350F' }
  };

  function CCPptGenerator(config) {
    this.config = Object.assign({
      tema:        '',        // "La célula: estructura y función"
      curso:       '',        // "7° Básico"
      asignatura:  '',        // "Ciencias Naturales"
      nSlides:     10,        // 5 a 25
      estilo:      'didactica', // didactica | formal | interactiva | calida
      oa:          '',        // Objetivo de aprendizaje MINEDUC
      imagenes:    'ia',      // 'ia' (Pollinations) | 'stock' (Unsplash) | 'ambas' | 'ninguna'
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
    return fetch('/api/ia-asistente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'raw',
        datos: {
          modelo: 'gemini-2.5-flash',
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
      var texto = data.texto || data.text || data.contenido || data.result || data.content || '';
      if (!texto && data.candidates && data.candidates[0]) {
        texto = (data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) || '';
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
      return self.estructura;
    });
  };

  CCPptGenerator.prototype._construirPromptGemini = function () {
    var c = this.config;
    return [
      'Eres un asesor pedagógico experto en currículum chileno MINEDUC.',
      'Diseña una presentación de clase profesional para un docente chileno con los siguientes datos:',
      '',
      '• Tema: ' + c.tema,
      '• Asignatura: ' + c.asignatura,
      '• Curso: ' + c.curso,
      '• N° de diapositivas: ' + c.nSlides,
      '• Estilo pedagógico: ' + c.estilo,
      c.oa ? '• Objetivo de Aprendizaje MINEDUC: ' + c.oa : '',
      c.instrucciones ? '• Instrucciones adicionales: ' + c.instrucciones : '',
      '',
      'RESPONDE EN JSON ESTRICTO con esta estructura (sin markdown, sin explicación):',
      '{',
      '  "titulo": "Título general de la clase",',
      '  "subtitulo": "Curso · Asignatura",',
      '  "portada": { "resumen": "1 frase que resume la clase", "sugerenciaImagen": "prompt en inglés para imagen de portada, estilo educativo, sin texto" },',
      '  "aprendizajes": ["OA que se abordará", "IE que se evaluará"],',
      '  "slides": [',
      '    { "titulo": "Título del slide", "bullets": ["punto 1", "punto 2", "punto 3"], "notasProfesor": "Guion detallado en español para exponer, 2-3 oraciones", "sugerenciaImagen": "prompt en inglés educativo sin texto, o palabras clave si busca stock" },',
      '    ...',
      '  ],',
      '  "actividad": { "titulo": "Actividad de aula", "descripcion": "Instrucción clara para el estudiante", "tiempo": "15 min" },',
      '  "cierre": { "titulo": "Cierre de la clase", "preguntas": ["¿Qué aprendí?", "¿Cómo lo aplico?"] }',
      '}',
      '',
      'REGLAS OBLIGATORIAS:',
      '- Bullets: máximo 5 por slide, cada uno máx 12 palabras.',
      '- notasProfesor: siempre en español chileno, tono cercano, orientado al docente.',
      '- sugerenciaImagen: SIEMPRE en inglés (para Flux/Unsplash), evocativo, educativo, SIN pedir texto en la imagen.',
      '- N° total de slides = ' + c.nSlides + ' (contando portada + contenido + actividad + cierre).',
      '- Distribución sugerida: 1 portada + 1 OA + ' + Math.max(3, c.nSlides - 4) + ' contenido + 1 actividad + 1 cierre.',
      '- NO incluir taxonomías por nombre (Bloom, Marzano); usar niveles cognitivos si aplica.',
      '- Vocabulario adecuado al nivel del curso.',
      '',
      'DEVUELVE SOLO EL JSON, nada más.'
    ].filter(Boolean).join('\n');
  };

  // ── Paso 2: Descargar imágenes ────────────────────────────
  CCPptGenerator.prototype._descargarImagen = function (prompt, modo) {
    var url;
    if (modo === 'stock') {
      // Unsplash: keywords separadas por coma
      var keywords = prompt.split(/\s+/).slice(0, 5).join(',');
      url = UNSPLASH_URL + encodeURIComponent(keywords);
    } else {
      // Pollinations Flux: prompt completo, calidad enhanced
      url = POLLINATIONS_URL + encodeURIComponent(prompt) +
            '?width=1024&height=576&model=flux&enhance=true&nologo=true';
    }
    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.blob();
      })
      .then(function (blob) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function () { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
      .catch(function (err) {
        console.warn('[PPT] Falló imagen:', prompt, err.message);
        return null;
      });
  };

  CCPptGenerator.prototype._descargarTodasImagenes = function (onProgress) {
    var self = this;
    if (this.config.imagenes === 'ninguna' || !this.estructura) return Promise.resolve();
    var promesas = [];
    var slides = this.estructura.slides || [];
    var total = slides.length + 1; // +1 portada
    var hecho = 0;
    function tick() {
      hecho++;
      if (typeof onProgress === 'function') onProgress(hecho, total);
    }
    // Portada
    if (this.estructura.portada && this.estructura.portada.sugerenciaImagen) {
      promesas.push(
        this._descargarImagen(this.estructura.portada.sugerenciaImagen, this._modoImagen('portada'))
          .then(function (img) { self.imagenesGeneradas.portada = img; tick(); })
      );
    } else tick();
    // Slides
    slides.forEach(function (s, i) {
      if (s.sugerenciaImagen) {
        promesas.push(
          self._descargarImagen(s.sugerenciaImagen, self._modoImagen(i))
            .then(function (img) { self.imagenesGeneradas[i] = img; tick(); })
        );
      } else tick();
    });
    return Promise.all(promesas);
  };

  CCPptGenerator.prototype._modoImagen = function (idx) {
    if (this.config.imagenes === 'stock') return 'stock';
    if (this.config.imagenes === 'ia') return 'ia';
    // 'ambas': portada IA + contenido intercalado
    if (idx === 'portada') return 'ia';
    return (typeof idx === 'number' && idx % 2 === 0) ? 'ia' : 'stock';
  };

  // ── Paso 3: PptxGenJS → .pptx ─────────────────────────────
  CCPptGenerator.prototype.compilar = function (onProgress) {
    var self = this;
    if (!this.estructura) throw new Error('Primero llamá generar()');
    if (typeof PptxGenJS === 'undefined') throw new Error('PptxGenJS no está cargado');

    return this._descargarTodasImagenes(onProgress).then(function () {
      var pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';
      pptx.author = self.config.profesorNombre || 'Click&Clase';
      pptx.company = self.config.liceoNombre || 'Click&Clase';
      pptx.title = self.estructura.titulo || 'Presentación';
      pptx.subject = self.config.asignatura || '';

      var color = TEMAS_COLOR[self.config.estilo] || TEMAS_COLOR.didactica;

      // ── PORTADA ──
      var p1 = pptx.addSlide();
      p1.background = { color: color.bg };
      if (self.imagenesGeneradas.portada) {
        p1.addImage({ data: self.imagenesGeneradas.portada, x:0, y:0, w:10, h:5.63, sizing:{ type:'cover', w:10, h:5.63 } });
        // Overlay oscuro para legibilidad
        p1.addShape('rect', { x:0, y:0, w:10, h:5.63, fill:{ color:'000000', transparency:55 }, line:{ type:'none' } });
        p1.addText(self.estructura.titulo || 'Presentación', { x:0.5, y:2, w:9, h:1.2, fontSize:44, bold:true, color:'FFFFFF', align:'center', fontFace:'Calibri' });
        p1.addText(self.estructura.subtitulo || (self.config.asignatura + ' · ' + self.config.curso), { x:0.5, y:3.2, w:9, h:0.6, fontSize:20, color:'FFFFFF', align:'center', fontFace:'Calibri' });
        if (self.estructura.portada && self.estructura.portada.resumen) {
          p1.addText(self.estructura.portada.resumen, { x:0.5, y:3.9, w:9, h:0.8, fontSize:14, color:'FFFFFF', align:'center', italic:true, fontFace:'Calibri' });
        }
      } else {
        // Sin imagen: barra de color superior + título
        p1.addShape('rect', { x:0, y:0, w:10, h:1.2, fill:{ color:color.primary }, line:{ type:'none' } });
        p1.addText(self.estructura.titulo || 'Presentación', { x:0.5, y:1.8, w:9, h:1.3, fontSize:40, bold:true, color:color.text, align:'center' });
        p1.addText(self.estructura.subtitulo || (self.config.asignatura + ' · ' + self.config.curso), { x:0.5, y:3.1, w:9, h:0.6, fontSize:20, color:color.muted, align:'center' });
        if (self.estructura.portada && self.estructura.portada.resumen) {
          p1.addText(self.estructura.portada.resumen, { x:0.5, y:3.8, w:9, h:0.8, fontSize:14, color:color.muted, align:'center', italic:true });
        }
      }
      p1.addText((self.config.profesorNombre || 'Click&Clase') + ' · ' + (self.config.liceoNombre || 'Colegio'), { x:0.5, y:5.15, w:9, h:0.3, fontSize:10, color:'FFFFFF', align:'center' });

      // ── OA / APRENDIZAJES ──
      if (self.estructura.aprendizajes && self.estructura.aprendizajes.length) {
        var pOA = pptx.addSlide();
        pOA.background = { color: color.bg };
        pOA.addShape('rect', { x:0, y:0, w:10, h:0.5, fill:{ color:color.primary }, line:{ type:'none' } });
        pOA.addText('🎯 Objetivo de la clase', { x:0.5, y:0.7, w:9, h:0.6, fontSize:28, bold:true, color:color.text });
        var oaTxt = self.estructura.aprendizajes.map(function (a, i) { return { text:'• ' + a, options:{ fontSize:18, color:color.text, breakLine:true, paraSpaceAfter:12 } }; });
        pOA.addText(oaTxt, { x:0.7, y:1.6, w:8.6, h:3.5 });
        pOA.addText('Click&Clase · ' + (self.config.liceoNombre || ''), { x:0.5, y:5.15, w:9, h:0.3, fontSize:9, color:color.muted, align:'right' });
      }

      // ── CONTENIDO (slides) ──
      (self.estructura.slides || []).forEach(function (s, i) {
        var ps = pptx.addSlide();
        ps.background = { color: color.bg };
        var tieneImg = !!self.imagenesGeneradas[i];

        // Barra superior con número
        ps.addShape('rect', { x:0, y:0, w:10, h:0.5, fill:{ color:color.primary }, line:{ type:'none' } });
        ps.addText((i + 1) + ' / ' + self.estructura.slides.length, { x:8.5, y:0.05, w:1.3, h:0.4, fontSize:12, color:'FFFFFF', bold:true, align:'right' });

        // Título
        ps.addText(s.titulo || 'Diapositiva', { x:0.5, y:0.7, w:9, h:0.6, fontSize:26, bold:true, color:color.text });

        // Layout: si hay imagen, texto a la izquierda + imagen a la derecha
        if (tieneImg) {
          var bulletsData = (s.bullets || []).map(function (b) { return { text:b, options:{ fontSize:16, color:color.text, bullet:{ code:'25CF' }, paraSpaceAfter:8 } }; });
          ps.addText(bulletsData, { x:0.5, y:1.5, w:5, h:3.6 });
          ps.addImage({ data: self.imagenesGeneradas[i], x:5.8, y:1.5, w:3.8, h:3.6, sizing:{ type:'cover', w:3.8, h:3.6 } });
        } else {
          var bulletsFull = (s.bullets || []).map(function (b) { return { text:b, options:{ fontSize:18, color:color.text, bullet:{ code:'25CF' }, paraSpaceAfter:10 } }; });
          ps.addText(bulletsFull, { x:0.7, y:1.5, w:8.6, h:3.6 });
        }

        // Pie
        ps.addText(self.estructura.titulo || '', { x:0.5, y:5.15, w:9, h:0.3, fontSize:9, color:color.muted });

        // Notas del profesor
        if (s.notasProfesor) ps.addNotes(s.notasProfesor);
      });

      // ── ACTIVIDAD ──
      if (self.estructura.actividad) {
        var pA = pptx.addSlide();
        pA.background = { color: color.bg };
        pA.addShape('rect', { x:0, y:0, w:10, h:5.63, fill:{ color:color.accent, transparency:92 }, line:{ type:'none' } });
        pA.addShape('rect', { x:0, y:0, w:10, h:0.5, fill:{ color:color.accent }, line:{ type:'none' } });
        pA.addText('✏ Actividad de aula', { x:0.5, y:0.7, w:9, h:0.6, fontSize:28, bold:true, color:color.text });
        pA.addText(self.estructura.actividad.titulo || '', { x:0.5, y:1.6, w:9, h:0.6, fontSize:22, bold:true, color:color.primary });
        pA.addText(self.estructura.actividad.descripcion || '', { x:0.5, y:2.5, w:9, h:2.2, fontSize:16, color:color.text });
        if (self.estructura.actividad.tiempo) {
          pA.addText('⏱ ' + self.estructura.actividad.tiempo, { x:0.5, y:4.8, w:3, h:0.4, fontSize:14, color:color.primary, bold:true });
        }
      }

      // ── CIERRE ──
      if (self.estructura.cierre) {
        var pC = pptx.addSlide();
        pC.background = { color: color.primary };
        pC.addText(self.estructura.cierre.titulo || '¡Gracias!', { x:0.5, y:1.8, w:9, h:1, fontSize:36, bold:true, color:'FFFFFF', align:'center' });
        var pregs = (self.estructura.cierre.preguntas || []).map(function (p) { return { text:'• ' + p, options:{ fontSize:20, color:'FFFFFF', breakLine:true, paraSpaceAfter:14 } }; });
        if (pregs.length) pC.addText(pregs, { x:1.5, y:3, w:7, h:2, align:'center' });
        pC.addText('Click&Clase · ' + (self.config.liceoNombre || ''), { x:0.5, y:5.15, w:9, h:0.3, fontSize:10, color:'FFFFFF', align:'center', italic:true });
      }

      return pptx.write({ outputType: 'blob' });
    });
  };

  // ── Paso 4: Descargar en el navegador ─────────────────────
  CCPptGenerator.prototype.descargar = function (nombreArchivo, onProgress) {
    var self = this;
    return this.compilar(onProgress).then(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = nombreArchivo || (self._nombreArchivoDefault());
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      return blob;
    });
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
