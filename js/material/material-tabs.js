/* ════════════════════════════════════════════════════════════════════
 *  material-tabs.js — Click&Clase
 *  Tabs Estándar | NEE en el resultado, modal de previsualización,
 *  y descargas Word/PDF por versión.
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var _versionActiva = 'estandar';

  function _hayVersionPIE() {
    var prev = document.getElementById('docPreview');
    if (!prev) return false;
    return !!prev.querySelector('.doc-seccion-pie, .doc-version-tag:not(.doc-version-tag--prof)');
  }

  function _aplicarFiltro(v) {
    var prev = document.getElementById('docPreview');
    if (!prev) return;
    prev.classList.remove('mat-show-estandar', 'mat-show-nee');
    prev.classList.add(v === 'nee' ? 'mat-show-nee' : 'mat-show-estandar');
  }

  function _cloneFiltrado(v) {
    var prev = document.getElementById('docPreview');
    if (!prev) return null;
    var clone = prev.cloneNode(true);
    var nodos = Array.prototype.slice.call(clone.children);
    var actualEsPIE = false;
    nodos.forEach(function (n) {
      var esTagPIE  = n.classList && n.classList.contains('doc-version-tag') && !n.classList.contains('doc-version-tag--prof');
      var esTagProf = n.classList && n.classList.contains('doc-version-tag--prof');
      if (esTagPIE) actualEsPIE = true;
      else if (esTagProf) actualEsPIE = false;
      var esContenedorPIE = n.classList && n.classList.contains('doc-seccion-pie');
      var perteneceA = (actualEsPIE || esContenedorPIE) ? 'nee' : 'estandar';
      if (perteneceA !== v) n.remove();
    });
    return clone;
  }

  function cambiarVersion(v) {
    _versionActiva = (v === 'nee') ? 'nee' : 'estandar';
    var tabs = document.querySelectorAll('#docTabs .doc-tab');
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-version') === _versionActiva);
    });
    _aplicarFiltro(_versionActiva);
  }

  function refrescarTabs() {
    var tabNEE = document.getElementById('docTabNEE');
    var hayPIE = _hayVersionPIE();
    if (tabNEE) tabNEE.style.display = hayPIE ? '' : 'none';
    if (!hayPIE && _versionActiva === 'nee') cambiarVersion('estandar');
    _aplicarFiltro(_versionActiva);
  }

  function previsualizarVersion() {
    var clone = _cloneFiltrado(_versionActiva);
    if (!clone || !clone.innerHTML.trim()) {
      if (typeof showToast === 'function') showToast('Esa versión no tiene contenido aún.', 'warn');
      return;
    }
    var modal = document.getElementById('docPreviewModal');
    var body  = document.getElementById('docModalBody');
    var title = document.getElementById('docModalTitle');
    if (!modal || !body) return;
    body.innerHTML = clone.innerHTML;
    if (title) title.textContent = 'Previsualización · Versión ' + (_versionActiva === 'nee' ? 'NEE / PIE' : 'estándar');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (window.MathJax && MathJax.typesetPromise) {
      try { MathJax.typesetPromise([body]).catch(function () {}); } catch (e) {}
    }
  }

  function cerrarPreviewModal() {
    var modal = document.getElementById('docPreviewModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function descargarWordVersion() {
    var clone = _cloneFiltrado(_versionActiva);
    if (!clone || !clone.innerHTML.trim()) {
      if (typeof showToast === 'function') showToast('Esa versión no tiene contenido aún.', 'warn');
      return;
    }
    if (typeof descargarDoc !== 'function') return;
    descargarDoc({ sourceEl: clone, suffix: _versionActiva === 'nee' ? 'PIE' : null });
  }

  function descargarPDFVersion() {
    var clone = _cloneFiltrado(_versionActiva);
    if (!clone || !clone.innerHTML.trim()) {
      if (typeof showToast === 'function') showToast('Esa versión no tiene contenido aún.', 'warn');
      return;
    }
    if (typeof descargarPDF !== 'function') return;
    descargarPDF({ sourceEl: clone, suffix: _versionActiva === 'nee' ? 'PIE' : null });
  }

  window.cambiarVersion        = cambiarVersion;
  window.refrescarTabs         = refrescarTabs;
  window.previsualizarVersion  = previsualizarVersion;
  window.cerrarPreviewModal    = cerrarPreviewModal;
  window.descargarWordVersion  = descargarWordVersion;
  window.descargarPDFVersion   = descargarPDFVersion;

  window.addEventListener('DOMContentLoaded', function () {
    var css = [
      '#docTabs { display:flex; gap:4px; margin-bottom:14px; padding:4px; background:rgba(15,23,42,.55); border-radius:10px; width:fit-content; }',
      '#docTabs .doc-tab { background:transparent; border:none; color:#94a3b8; padding:8px 18px; border-radius:8px; cursor:pointer; font-size:.88rem; font-weight:600; transition:.15s; }',
      '#docTabs .doc-tab:hover { color:#e2e8f0; background:rgba(255,255,255,.04); }',
      '#docTabs .doc-tab.active { background:linear-gradient(135deg,#7c3aed,#6366f1); color:#fff; box-shadow:0 4px 10px -2px rgba(124,58,237,.5); }',
      '#docPreview.mat-show-estandar .doc-seccion-pie { display:none !important; }',
      '#docPreview.mat-show-nee .doc-seccion-pie { display:revert !important; }',
      '#docPreviewModal { position:fixed; inset:0; z-index:2000; align-items:center; justify-content:center; padding:24px; display:none; }',
      '#docPreviewModal .doc-modal-overlay { position:absolute; inset:0; background:rgba(2,6,23,.85); backdrop-filter:blur(4px); }',
      '#docPreviewModal .doc-modal-content { position:relative; background:#fff; color:#1a1a2e; border-radius:14px; box-shadow:0 30px 60px -10px rgba(0,0,0,.6); width:min(950px,95vw); max-height:90vh; display:flex; flex-direction:column; }',
      '#docPreviewModal .doc-modal-header { display:flex; align-items:center; justify-content:space-between; padding:14px 22px; border-bottom:1px solid #e2e8f0; gap:12px; }',
      '#docPreviewModal .doc-modal-header h3 { margin:0; font-size:1.05rem; color:#1e2a44; }',
      '#docPreviewModal .doc-modal-header button.close { background:transparent; border:1px solid #cbd5e1; color:#475569; padding:5px 11px; border-radius:8px; cursor:pointer; font-size:.95rem; }',
      '#docPreviewModal .doc-modal-body { padding:24px 28px; overflow:auto; flex:1; }',
      '#docPreviewModal .doc-modal-actions { padding:12px 22px; border-top:1px solid #e2e8f0; display:flex; gap:8px; justify-content:flex-end; background:#f8fafc; border-radius:0 0 14px 14px; }',
      '#docPreviewModal .doc-modal-actions button { padding:8px 16px; border-radius:8px; border:1px solid; cursor:pointer; font-size:.86rem; font-weight:600; }',
      '#docPreviewModal .doc-modal-actions .btn-word { background:#dbeafe; border-color:#93c5fd; color:#1e40af; }',
      '#docPreviewModal .doc-modal-actions .btn-pdf { background:#fee2e2; border-color:#fca5a5; color:#991b1b; }',
      '@media (max-width: 640px) { #docPreviewModal .doc-modal-content { width:100vw; max-height:100vh; border-radius:0; } #docPreviewModal { padding:0; } }'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'mat-tabs-style';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var m = document.getElementById('docPreviewModal');
        if (m && m.style.display !== 'none') cerrarPreviewModal();
      }
    });

    var prev = document.getElementById('docPreview');
    if (prev && 'MutationObserver' in window) {
      var debouncer = null;
      var mo = new MutationObserver(function () {
        clearTimeout(debouncer);
        debouncer = setTimeout(refrescarTabs, 250);
      });
      mo.observe(prev, { childList: true, subtree: true });
    }
    refrescarTabs();
  });
})();
