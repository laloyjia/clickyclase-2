/* ════════════════════════════════════════════════════════════════════
 *  material-export.js — Click&Clase
 *  Acciones sobre el documento generado:
 *   - copiarDocumento, nuevoDocumento (botones de resultado)
 *   - Refinamiento conversacional con IA: abrirRefinarIA, cerrarRefinarIA,
 *     aplicarSugerenciaRefinamiento, aplicarRefinamiento, deshacerRefinamiento
 *   - Helpers de exportación: _embedearImagenesBase64, _limpiarBodyIA,
 *     _estilosImpresion, _prepararCloneExport, _tituloExport, _nombreArchivoExport
 *   - Descargas: descargarDoc (Word), descargarPDF
 *
 *  Dependencias globales: showToast, ELDB, ELUI, MathJax, IA_ENDPOINT,
 *  DOM ids (docGenerado, docPreview, saveMsg, refinarPanel, refinarInstr,
 *  refinarStatus, refinarChips, btnAplicarIA, btnDeshacerIA).
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function copiarDocumento() {
    var preview = document.getElementById('docPreview');
    if (!preview) return;
    var texto = preview.innerText || preview.textContent || '';
    if (!texto.trim()) { if (typeof showToast === 'function') showToast('No hay documento que copiar.', 'warn'); return; }
    function ok() { if (typeof showToast === 'function') showToast('Documento copiado al portapapeles ✓', 'success'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(ok).catch(function () {
        if (typeof showToast === 'function') showToast('No se pudo copiar. Selecciona y copia manualmente.', 'error');
      });
    } else {
      try {
        var ta = document.createElement('textarea');
        ta.value = texto;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        ok();
      } catch (e) {
        if (typeof showToast === 'function') showToast('No se pudo copiar.', 'error');
      }
    }
  }

  function nuevoDocumento() {
    var dg = document.getElementById('docGenerado');
    if (dg) dg.classList.remove('visible');
    var saveMsg = document.getElementById('saveMsg');
    if (saveMsg) saveMsg.style.display = 'none';
    _iaHistorial = [];
    var btnDes = document.getElementById('btnDeshacerIA'); if (btnDes) btnDes.disabled = true;
    cerrarRefinarIA();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ═══════════════════════════════════════════════════════════
  //  REFINAMIENTO CONVERSACIONAL DEL DOCUMENTO CON IA
  // ═══════════════════════════════════════════════════════════
  var _iaHistorial = [];
  var _IA_SUGERENCIAS = [
    { label: '⬇ Más corto',         text: 'Acorta el documento a la mitad manteniendo lo esencial' },
    { label: '⬆ Más largo',         text: 'Amplía el desarrollo agregando más explicaciones y ejemplos' },
    { label: '🔥 Más difícil',      text: 'Aumenta la dificultad de todas las preguntas/actividades un nivel' },
    { label: '🧒 Más fácil',        text: 'Baja la dificultad y simplifica el lenguaje para que sea más accesible' },
    { label: '➕ Agregar pregunta', text: 'Agrega una pregunta nueva de aplicación a la vida real al final' },
    { label: '🌎 Contexto chileno', text: 'Adapta los ejemplos y situaciones al contexto chileno (lugares, monedas, costumbres)' },
    { label: '📋 Agregar rúbrica',  text: 'Agrega al final una rúbrica de evaluación con 4 niveles de logro' },
    { label: '🎯 Más OA-alineado',  text: 'Refuerza la alineación con los OA citados explicitando los indicadores en cada actividad' }
  ];

  function abrirRefinarIA() {
    var preview = document.getElementById('docPreview');
    if (!preview || !(preview.innerHTML || '').trim()) {
      if (typeof showToast === 'function') showToast('Primero genera un documento.', 'warn');
      else alert('Primero genera un documento.');
      return;
    }
    var panel = document.getElementById('refinarPanel');
    if (!panel) return;
    var chipsBox = document.getElementById('refinarChips');
    if (chipsBox && !chipsBox.innerHTML) {
      chipsBox.innerHTML = _IA_SUGERENCIAS.map(function (s) {
        return '<button type="button" onclick="aplicarSugerenciaRefinamiento(\'' + s.text.replace(/'/g, "\\'") + '\')" ' +
          'style="background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.35);color:#c4b5fd;padding:5px 10px;border-radius:14px;font-size:.74rem;cursor:pointer;transition:.15s" ' +
          'onmouseover="this.style.background=\'rgba(167,139,250,.22)\'" onmouseout="this.style.background=\'rgba(167,139,250,.12)\'">' +
          s.label + '</button>';
      }).join('');
    }
    panel.style.display = 'block';
    setTimeout(function () {
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var ta = document.getElementById('refinarInstr');
      if (ta) ta.focus();
    }, 100);
  }

  function cerrarRefinarIA() {
    var panel = document.getElementById('refinarPanel');
    if (panel) panel.style.display = 'none';
    var status = document.getElementById('refinarStatus');
    if (status) status.style.display = 'none';
  }

  function aplicarSugerenciaRefinamiento(texto) {
    var ta = document.getElementById('refinarInstr');
    if (!ta) return;
    ta.value = texto;
    ta.focus();
  }

  function _refinarSetStatus(html, color) {
    var el = document.getElementById('refinarStatus');
    if (!el) return;
    el.innerHTML = html;
    el.style.display = 'block';
    el.style.background = color + '18';
    el.style.border = '1px solid ' + color + '44';
    el.style.color = color;
  }

  function aplicarRefinamiento() {
    var ta = document.getElementById('refinarInstr');
    var preview = document.getElementById('docPreview');
    var btn = document.getElementById('btnAplicarIA');
    var btnDes = document.getElementById('btnDeshacerIA');
    if (!ta || !preview) return;

    var instruccion = (ta.value || '').trim();
    if (!instruccion) { _refinarSetStatus('⚠️ Escribe una instrucción o elige una sugerencia.', '#f59e0b'); return; }
    var contenidoActual = preview.innerHTML || '';
    if (!contenidoActual.trim()) { _refinarSetStatus('⚠️ No hay documento para refinar.', '#f59e0b'); return; }

    btn.disabled = true;
    var btnTxt = btn.innerHTML;
    btn.innerHTML = '<span class="ia-spin"></span> Aplicando…';
    _refinarSetStatus('⏳ La IA está modificando el documento…', '#a5b4fc');

    fetch(window.IA_ENDPOINT || '/api/ia-asistente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'refinar', datos: { contenidoActual: contenidoActual, instruccion: instruccion } })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.error) throw new Error(data.error);
        var nuevo = String(data.resultado || '').trim();
        if (!nuevo) throw new Error('La IA no devolvió contenido.');
        nuevo = nuevo.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```\s*$/i, '');
        _iaHistorial.push(contenidoActual);
        if (_iaHistorial.length > 20) _iaHistorial.shift();
        preview.innerHTML = nuevo;
        if (window.MathJax && MathJax.typesetPromise) {
          try { MathJax.typesetPromise([preview]).catch(function () {}); } catch (e) {}
        }
        if (btnDes) btnDes.disabled = false;
        _refinarSetStatus('✅ Cambio aplicado. Puedes deshacer si no te gusta o pedir otro ajuste.', '#34d399');
        ta.value = '';
        try { if (typeof ELDB !== 'undefined' && ELDB.actividad) ELDB.actividad.log('refinar_material_ia', { instruccion: instruccion.slice(0, 200) }); } catch (e) {}
        if (window.ELUI && ELUI.confetti) { try { ELUI.confetti({ amount: 30 }); } catch (e) {} }
      })
      .catch(function (err) {
        _refinarSetStatus('❌ Error: ' + (err && err.message ? err.message : 'no se pudo refinar.'), '#f87171');
      })
      .finally(function () {
        btn.disabled = false;
        btn.innerHTML = btnTxt;
      });
  }

  function deshacerRefinamiento() {
    if (!_iaHistorial.length) return;
    var preview = document.getElementById('docPreview');
    if (!preview) return;
    var prev = _iaHistorial.pop();
    preview.innerHTML = prev;
    var btnDes = document.getElementById('btnDeshacerIA');
    if (btnDes) btnDes.disabled = (_iaHistorial.length === 0);
    _refinarSetStatus('↶ Volviste a la versión anterior.', '#a5b4fc');
  }

  // ════════════ Helpers compartidos por descarga Word y PDF ════════════
  function _embedearImagenesBase64(rootEl) {
    var imgs = rootEl.querySelectorAll('img');
    var promesas = [];
    imgs.forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (!src || src.indexOf('data:') === 0) return;
      promesas.push(new Promise(function (resolve) {
        var nuevo = new Image();
        nuevo.crossOrigin = 'anonymous';
        nuevo.onload = function () {
          try {
            var w = nuevo.naturalWidth || 256;
            var h = nuevo.naturalHeight || 256;
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(nuevo, 0, 0);
            var dataUrl = canvas.toDataURL('image/png');
            img.setAttribute('src', dataUrl);
          } catch (e) { /* tainted canvas o cors fail */ }
          resolve();
        };
        nuevo.onerror = function () { resolve(); };
        try { nuevo.src = new URL(src, window.location.href).href; }
        catch (_) { resolve(); }
      }));
    });
    return Promise.all(promesas);
  }

  function _limpiarBodyIA(rootEl) {
    var paragrafos = rootEl.querySelectorAll('p, div');
    paragrafos.forEach(function (p) {
      if (p.closest('.doc-header-inst') || p.closest('.doc-titulo-bar') || p.closest('table.doc-meta')) return;
      var txt = (p.textContent || '').trim();
      if (!txt || txt.length > 200) return;
      var pat = /^(LICEO|COLEGIO|ESCUELA|INSTITUTO)\b[^\n]{0,150}$/i;
      if (pat.test(txt) && p.parentElement && p.parentElement.children.length <= 5) {
        p.remove();
      }
    });
    var tablas = rootEl.querySelectorAll('table');
    tablas.forEach(function (t) {
      if (t.classList.contains('doc-meta')) return;
      var th = t.querySelectorAll('th, td');
      if (th.length < 4 || th.length > 16) return;
      var headers = [];
      for (var i = 0; i < Math.min(th.length, 16); i++) headers.push((th[i].textContent || '').toLowerCase().trim());
      var unidos = headers.join('|');
      var triggers = ['nombre', 'estudiante', 'curso', 'profesor', 'fecha', 'puntaje', 'nota', 'duraci'];
      var hits = triggers.filter(function (t2) { return unidos.indexOf(t2) !== -1; }).length;
      if (hits >= 3) t.remove();
    });
    var tipoBar = rootEl.querySelector('.doc-titulo-bar');
    var tipoTxt = tipoBar ? (tipoBar.textContent || '').toLowerCase().trim() : '';
    if (tipoTxt) {
      rootEl.querySelectorAll('h1, h2').forEach(function (h) {
        if (h.closest('.doc-header-inst') || h.closest('.doc-titulo-bar')) return;
        var ht = (h.textContent || '').toLowerCase().trim();
        if (ht && (ht === tipoTxt || (ht.length < 80 && tipoTxt.indexOf(ht) !== -1))) h.remove();
      });
    }
    return rootEl;
  }

  function _estilosImpresion() {
    return '' +
      '<style>' +
      '@page { size: A4; margin: 2cm; }' +
      'body { font-family: "Segoe UI", Calibri, Arial, sans-serif; font-size: 11pt; color: #1a1a2e; line-height: 1.55; }' +
      'h1 { font-size: 16pt; color: #1e2a44; border-bottom: 2px solid #6C5CE7; padding-bottom: 4pt; page-break-after: avoid; }' +
      'h2 { font-size: 13pt; color: #6C5CE7; border-left: 3pt solid #6C5CE7; padding-left: 6pt; margin-top: 14pt; page-break-after: avoid; }' +
      'h3 { font-size: 11.5pt; color: #2d3436; margin-top: 10pt; page-break-after: avoid; }' +
      'p, li, td, th { font-size: 10.5pt; }' +
      'table { width: 100%; border-collapse: collapse; margin: 8pt 0; }' +
      'th { background: #6C5CE7; color: #fff; padding: 5pt 7pt; text-align: left; font-size: 10pt; }' +
      'td { border: 1pt solid #c8cdd2; padding: 4pt 7pt; }' +
      'img { max-width: 100%; height: auto; }' +
      '.doc-header-inst { display: table; width: 100%; margin-bottom: 8pt; border-bottom: 1pt solid #c8cdd2; padding-bottom: 6pt; page-break-after: avoid; }' +
      '.doc-header-inst .doc-logo-wrap, .doc-header-inst .doc-inst-text, .doc-header-inst .doc-spacer { display: table-cell; vertical-align: middle; }' +
      '.doc-header-inst .doc-logo-wrap { width: 80pt; }' +
      '.doc-header-inst .doc-logo { max-width: 70pt; max-height: 70pt; }' +
      '.doc-header-inst .doc-inst-text { text-align: center; }' +
      '.doc-header-inst .doc-liceo { font-family: Georgia, "Times New Roman", serif; font-size: 16pt; font-weight: 700; color: #4a5560; }' +
      '.doc-header-inst .doc-tipo { font-size: 10pt; font-weight: 600; color: #6b7480; letter-spacing: 1pt; text-transform: uppercase; margin-top: 2pt; }' +
      '.doc-header-inst .doc-spacer { width: 80pt; }' +
      '.doc-titulo-bar { background: #1e2a44; color: #fff; text-align: center; font-weight: 700; font-size: 12pt; letter-spacing: 1pt; padding: 6pt 10pt; margin: 6pt 0; text-transform: uppercase; page-break-after: avoid; }' +
      'table.doc-meta { page-break-inside: avoid; }' +
      'table.doc-meta th { background: #fff; color: #1e2a44; text-transform: uppercase; font-size: 8.5pt; border: 1pt solid #4a5560; }' +
      'table.doc-meta td { background: #fff; border: 1pt solid #4a5560; }' +
      '.recuadro-importante, .recuadro, .recuadro-seguridad { page-break-inside: avoid; }' +
      '.recuadro-importante { background: #fff3e0; border-left: 3pt solid #ff9800; padding: 6pt 9pt; margin: 8pt 0; }' +
      '.recuadro { background: #f0f4ff; border-left: 3pt solid #6C5CE7; padding: 6pt 9pt; margin: 8pt 0; }' +
      '.recuadro-seguridad { background: #ffebee; border-left: 3pt solid #c62828; padding: 6pt 9pt; margin: 8pt 0; }' +
      '.linea-escribir { border-bottom: 1pt solid #555; height: 14pt; margin: 4pt 0; }' +
      '.pie-pagina { margin-top: 14pt; padding-top: 6pt; border-top: 1pt solid #c8cdd2; text-align: center; font-size: 8.5pt; color: #6b7480; }' +
      '.bloom-tag { display: inline-block; padding: 1pt 6pt; border-radius: 8pt; font-size: 8pt; font-weight: 700; margin-right: 4pt; background: #ede7f6; color: #4527a0; }' +
      '.doc-version-tag { display: inline-block; margin: 0 0 8pt 0; padding: 3pt 9pt; background: #dcfce7; color: #166534; border: 1pt solid #16a34a; border-radius: 999pt; font-size: 9pt; font-weight: 700; letter-spacing: .5pt; text-transform: uppercase; }' +
      '.doc-version-tag--prof { background: #ede7f6; color: #4527a0; border-color: #6C5CE7; }' +
      '.page-break { page-break-before: always; mso-special-character: line-break; height: 0; border: none; margin: 0; }' +
      'pre, blockquote { page-break-inside: avoid; }' +
      'li { orphans: 2; widows: 2; }' +
      'p { orphans: 2; widows: 2; margin: 5pt 0; }' +
      '.frac { display: inline-block; vertical-align: middle; text-align: center; line-height: 1.1; margin: 0 2pt; }' +
      '.frac .num { display: block; border-bottom: 1pt solid #1a1a2e; padding: 0 3pt 1pt; }' +
      '.frac .den { display: block; padding: 1pt 3pt 0; }' +
      '.sqrt-root { display: inline-block; vertical-align: middle; }' +
      '.sqrt-root .rad { border-top: 1pt solid #1a1a2e; padding: 0 2pt; margin-left: 1pt; }' +
      '.math-display { display: block; text-align: center; font-size: 12pt; margin: 6pt 0; padding: 5pt 8pt; background: #f6f4ff; border-left: 3pt solid #6C5CE7; }' +
      'table.mat-sistema { display: inline-table; border: none; border-left: 1.5pt solid #1a1a2e; padding-left: 4pt; margin: 0 4pt; }' +
      'table.mat-sistema td { border: none !important; padding: 1pt 5pt; background: transparent !important; }' +
      'sup, sub { font-size: 75%; line-height: 0; }' +
      '</style>';
  }

  function _prepararCloneExport(sourceEl) {
    var preview = sourceEl || document.getElementById('docPreview');
    if (!preview || !(preview.innerHTML || '').trim()) return Promise.reject(new Error('vacío'));
    var clone = preview.cloneNode(true);

    clone.querySelectorAll('mjx-container').forEach(function (mjx) {
      var latex = '';
      var prev = mjx.previousElementSibling;
      if (prev && prev.tagName && prev.tagName.toLowerCase() === 'script' && /math\/tex/i.test(prev.getAttribute('type') || '')) {
        latex = prev.textContent || '';
      }
      if (!latex) latex = mjx.getAttribute('aria-label') || mjx.textContent || '';
      latex = String(latex).replace(/^\s*[$\\][\(\[]\s*/, '').replace(/\s*[\\][\)\]]\s*$/, '').replace(/^\$+|\$+$/g, '').trim();
      var isDisplay = (mjx.getAttribute('display') === 'true') || (mjx.matches && mjx.matches('[jax][display]'));
      var rep = document.createElement(isDisplay ? 'p' : 'span');
      if (isDisplay) rep.setAttribute('class', 'math-display');
      rep.textContent = latex;
      mjx.parentNode.replaceChild(rep, mjx);
    });
    clone.querySelectorAll('script[type^="math/tex"]').forEach(function (s) { s.remove(); });

    _limpiarBodyIA(clone);

    return _embedearImagenesBase64(clone).then(function () { return clone; });
  }

  function _tituloExport(sourceEl) {
    var src = sourceEl || document.getElementById('docPreview');
    var titulo = (src && src.querySelector('.doc-titulo-bar') ? src.querySelector('.doc-titulo-bar').textContent : '')
              || (src && src.querySelector('.doc-tipo') ? src.querySelector('.doc-tipo').textContent : '')
              || 'Documento Click&Clase';
    return (titulo || '').toString().trim().slice(0, 80) || 'Documento';
  }

  function _nombreArchivoExport(sourceEl) {
    var t = _tituloExport(sourceEl);
    return t.replace(/[^a-zA-Z0-9_\-À-ſ\s]/g, '').replace(/\s+/g, '_').slice(0, 60) || 'documento';
  }

  function descargarDoc(opts) {
    opts = opts || {};
    var preview = opts.sourceEl || document.getElementById('docPreview');
    if (!preview || !(preview.innerHTML || '').trim()) {
      if (typeof showToast === 'function') showToast('Genera primero un documento para descargarlo.', 'warn');
      return;
    }
    var titulo = _tituloExport(preview);
    if (typeof showToast === 'function') showToast('Preparando documento Word...', 'info');

    _prepararCloneExport(preview).then(function (clone) {
      var head = '<head><meta charset="utf-8"><title>' + titulo.replace(/[<>"]/g, '') + '</title>' + _estilosImpresion() + '</head>';
      var body = '<body>' + clone.innerHTML + '</body>';
      var html = '<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' + head + body + '</html>';
      var blob = new Blob(['﻿', html], { type: 'application/msword' });
      var url = URL.createObjectURL(blob);
      var fname = _nombreArchivoExport(preview);
      if (opts.suffix) fname += '_' + opts.suffix;
      var a = document.createElement('a');
      a.href = url;
      a.download = fname + '.doc';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(url);
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 200);
      if (typeof showToast === 'function') showToast('Documento descargado en formato Word (.doc).', 'success');
      try { if (typeof ELDB !== 'undefined' && ELDB.actividad) ELDB.actividad.log('descargar_word', { titulo: titulo, version: opts.suffix || 'estandar' }); } catch (e) {}
    }).catch(function (err) {
      if (typeof showToast === 'function') showToast('Error preparando el documento: ' + (err && err.message || 'desconocido'), 'error');
    });
  }

  function descargarPDF(opts) {
    opts = opts || {};
    var preview = opts.sourceEl || document.getElementById('docPreview');
    if (!preview || !(preview.innerHTML || '').trim()) {
      if (typeof showToast === 'function') showToast('Genera primero un documento para descargarlo.', 'warn');
      return;
    }
    var titulo = _tituloExport(preview);
    if (typeof showToast === 'function') showToast('Preparando PDF...', 'info');

    _prepararCloneExport(preview).then(function (clone) {
      var w = window.open('', '_blank', 'width=900,height=1100');
      if (!w) {
        if (typeof showToast === 'function') showToast('Tu navegador bloqueo la ventana. Permiti pop-ups para descargar PDF.', 'warn');
        return;
      }
      var head = '<head><meta charset="utf-8"><title>' + titulo.replace(/[<>"]/g, '') + '</title>' + _estilosImpresion() + '</head>';
      var instrucciones = '<div style="background:#1e2a44;color:#fff;padding:14px 20px;margin:0 0 16px 0;border-radius:8px;font-family:Segoe UI,Arial,sans-serif;font-size:12pt;text-align:center" class="no-print">' +
        'Se abrira el dialogo de impresion. Elegi <strong>"Guardar como PDF"</strong> como destino y haz clic en <strong>Guardar</strong>.' +
        '</div>' +
        '<style>@media print { .no-print { display:none !important; } }</style>';
      var body = '<body>' + instrucciones + clone.innerHTML + '</body>';
      w.document.open();
      w.document.write('<!DOCTYPE html><html>' + head + body + '</html>');
      w.document.close();
      setTimeout(function () {
        try { w.focus(); w.print(); }
        catch (e) { if (typeof showToast === 'function') showToast('No se pudo abrir el dialogo de impresion: ' + e.message, 'error'); }
      }, 600);
      try { if (typeof ELDB !== 'undefined' && ELDB.actividad) ELDB.actividad.log('descargar_word', { titulo: titulo, formato: 'pdf', version: opts.suffix || 'estandar' }); } catch (e) {}
    }).catch(function (err) {
      if (typeof showToast === 'function') showToast('Error preparando el PDF: ' + (err && err.message || 'desconocido'), 'error');
    });
  }

  function mostrarToast(msg) { if (typeof showToast === 'function') showToast(msg, 'info'); }

  // Expose globalmente
  window.copiarDocumento              = copiarDocumento;
  window.nuevoDocumento               = nuevoDocumento;
  window.abrirRefinarIA               = abrirRefinarIA;
  window.cerrarRefinarIA              = cerrarRefinarIA;
  window.aplicarSugerenciaRefinamiento = aplicarSugerenciaRefinamiento;
  window.aplicarRefinamiento          = aplicarRefinamiento;
  window.deshacerRefinamiento         = deshacerRefinamiento;
  window._embedearImagenesBase64      = _embedearImagenesBase64;
  window._limpiarBodyIA               = _limpiarBodyIA;
  window._estilosImpresion            = _estilosImpresion;
  window._prepararCloneExport         = _prepararCloneExport;
  window._tituloExport                = _tituloExport;
  window._nombreArchivoExport         = _nombreArchivoExport;
  window.descargarDoc                 = descargarDoc;
  window.descargarPDF                 = descargarPDF;
  window.mostrarToast                 = mostrarToast;
})();
