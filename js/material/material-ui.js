/* ════════════════════════════════════════════════════════════════════
 *  material-ui.js — Click&Clase
 *  Utilidades de UI para material.html:
 *   - Borradores auto-guardados (LocalStorage)
 *
 *  Las funciones quedan en window scope (sin namespace) para mantener
 *  compatibilidad con los onclick="..." inline del HTML y con el resto
 *  del JS de material.html que aún no se ha refactoreado.
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // =========================================================
  //  UTILIDADES BASE DE UI
  //  Usadas por todos los módulos. Por eso van primero en material-ui.js
  //  (que se carga antes que los demás módulos).
  // =========================================================
  function escTxt(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function showToast(msg, type) {
    if (window.ELUI && ELUI.toast) { ELUI.toast(msg, { type: type || 'info' }); return; }
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(function () { toast.classList.remove('visible'); }, 2800);
  }
  function confirmPro(opts) {
    if (window.ELUI && ELUI.confirm) return ELUI.confirm(opts || {});
    return Promise.resolve(window.confirm((opts && (opts.message || opts.title)) || '¿Confirmar?'));
  }
  function toggleCheckItem(checkbox) {
    var parent = checkbox.closest('.checkbox-item') || checkbox.closest('.bloom-item') || checkbox.closest('.tipo-preg-item');
    if (!parent) return;
    if (checkbox.checked) parent.classList.add('checked');
    else parent.classList.remove('checked');
  }
  function seleccionarTipo(card, tipo) {
    var cards = document.querySelectorAll('.tipo-doc-card');
    for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
    card.classList.add('selected');
    window.tipoDocSeleccionado = tipo;
    if (typeof _matAjustarCapacidadesUI === 'function') _matAjustarCapacidadesUI();
    var cfgEval = document.getElementById('cfgEval');
    var cfgRefs = document.getElementById('cfgRefs');
    var cfgHab  = document.getElementById('cfgHabilidad');
    var esEval  = (tipo === 'prueba' || tipo === 'control');
    var esGEjer = (tipo === 'evaluacion');
    if (cfgEval) cfgEval.style.display = esEval ? '' : 'none';
    if (cfgRefs) cfgRefs.style.display = esEval ? '' : 'none';
    if (cfgHab)  cfgHab.style.display  = esGEjer ? '' : 'none';
    var pruebaConPIE = document.getElementById('pruebaConPIE');
    if (pruebaConPIE) pruebaConPIE.style.display = (tipo === 'prueba') ? '' : 'none';
    var cantInput = document.getElementById('inputCantPreg');
    if (cantInput) {
      cantInput.max = 40;
      if (parseInt(cantInput.value, 10) > 40) cantInput.value = 40;
    }
    actualizarTotalItems();
  }
  function actualizarTotalItems() {
    var tabla = document.getElementById('tiposPregTabla');
    if (!tabla) return;
    var inputs = tabla.querySelectorAll('input[data-cantitem]');
    var suma = 0;
    for (var i = 0; i < inputs.length; i++) {
      var n = parseInt(inputs[i].value, 10);
      if (!isNaN(n) && n > 0) suma += n;
    }
    var spanT = document.getElementById('cfgTotalItems');
    if (spanT) spanT.textContent = suma;
    var pill = document.getElementById('cfgPillTotal');
    if (pill) pill.textContent = suma + ' por ítem';
    var totalGeneral = parseInt((document.getElementById('inputCantPreg') || {}).value, 10) || 0;
    var msg = document.getElementById('cfgTotalMsg');
    if (suma > 40) {
      spanT && spanT.classList.add('invalid');
      if (msg) msg.innerHTML = '<span style="color:#ef4444;font-weight:600;">⚠ La suma supera el máximo permitido (40 preguntas).</span>';
    } else if (suma !== totalGeneral && totalGeneral > 0) {
      spanT && spanT.classList.remove('invalid');
      if (msg) msg.innerHTML = '<span style="color:#f59e0b;">La suma por ítem (' + suma + ') no coincide con el total general (' + totalGeneral + '). Si dejas las cantidades por ítem en 0, se distribuirán automáticamente.</span>';
    } else {
      spanT && spanT.classList.remove('invalid');
      if (msg) msg.textContent = 'Suma por ítem coincide con el total general. Listo para generar.';
    }
  }

  window.escTxt              = escTxt;
  window.showToast           = showToast;
  window.confirmPro          = confirmPro;
  window.toggleCheckItem     = toggleCheckItem;
  window.seleccionarTipo     = seleccionarTipo;
  window.actualizarTotalItems = actualizarTotalItems;

  // =========================================================
  //  BORRADOR AUTOGUARDADO (LocalStorage)
  //  Guarda el estado del formulario cada 5s para no perder
  //  configuraciones a media composición. Restaura al cargar.
  // =========================================================
  var _DRAFT_KEY = 'cc_material_draft_v1';
  var _DRAFT_INTERVAL = 5000; // ms

  function _draftCapture() {
    var draft = {};
    // Inputs <input>, <select>, <textarea> con id (excluir contraseñas y oculto sensible)
    var fields = document.querySelectorAll('input[id], select[id], textarea[id]');
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.type === 'password' || f.type === 'file' || f.type === 'submit' || f.type === 'button') continue;
      if (f.type === 'checkbox' || f.type === 'radio') {
        draft['_' + f.id + '_chk'] = f.checked;
      } else {
        draft[f.id] = f.value;
      }
    }
    // Checkboxes sin id pero con name (ej: OAs Mineduc, valores, NEEs)
    var nameChecks = document.querySelectorAll('input[type="checkbox"][name], input[type="radio"][name]');
    for (var j = 0; j < nameChecks.length; j++) {
      var el = nameChecks[j];
      var key = '__chk_' + el.name + '__' + (el.value || '');
      draft[key] = el.checked;
    }
    // Tipo de documento seleccionado
    if (typeof tipoDocSeleccionado !== 'undefined') draft.__tipoDocSel = tipoDocSeleccionado;
    // OAs Mineduc marcados
    var oaChecks = document.querySelectorAll('#listaOAMineduc .oaRegCheck:checked');
    var oasMineduc = [];
    for (var k = 0; k < oaChecks.length; k++) {
      oasMineduc.push({ codigo: oaChecks[k].value, desc: oaChecks[k].getAttribute('data-desc') || '' });
    }
    draft.__oasMineducSel = oasMineduc;
    draft.__ts = Date.now();
    return draft;
  }

  function _draftSave() {
    try {
      var draft = _draftCapture();
      localStorage.setItem(_DRAFT_KEY, JSON.stringify(draft));
      var ind = document.getElementById('draftIndicator');
      if (ind) {
        ind.textContent = '💾 Borrador guardado · ' + new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        ind.style.display = 'inline-flex';
      }
    } catch (e) { /* localStorage lleno o no disponible */ }
  }

  function _draftRestore() {
    try {
      var raw = localStorage.getItem(_DRAFT_KEY);
      if (!raw) return false;
      var draft = JSON.parse(raw);
      if (!draft || !draft.__ts) return false;
      for (var key in draft) {
        if (key.indexOf('__') === 0 || key.indexOf('_') === 0) continue;
        var el = document.getElementById(key);
        if (el) {
          var t = el.type || el.tagName.toLowerCase();
          if (t === 'checkbox' || t === 'radio') {
            if (draft['_' + key + '_chk'] != null) el.checked = !!draft['_' + key + '_chk'];
          } else if (t === 'select-one' || t === 'select') {
            el.value = draft[key];
            el.dispatchEvent(new Event('change', { bubbles: true }));
          } else {
            el.value = draft[key];
          }
        }
      }
      if (draft.__tipoDocSel) {
        var tarjeta = document.querySelector('.tipo-doc-card[data-tipo="' + draft.__tipoDocSel + '"]');
        if (tarjeta && typeof seleccionarTipo === 'function') {
          seleccionarTipo(tarjeta, draft.__tipoDocSel);
        }
      }
      for (var k in draft) {
        if (k.indexOf('__chk_') === 0) {
          var rest = k.substring(6);
          var sep = rest.lastIndexOf('__');
          if (sep === -1) continue;
          var nm = rest.substring(0, sep);
          var val = rest.substring(sep + 2);
          var els = document.querySelectorAll('input[name="' + nm + '"][value="' + val + '"]');
          for (var i = 0; i < els.length; i++) els[i].checked = !!draft[k];
        }
      }
      return draft.__ts;
    } catch (e) { return false; }
  }

  function _draftHasContent() {
    try {
      var raw = localStorage.getItem(_DRAFT_KEY);
      if (!raw) return null;
      var draft = JSON.parse(raw);
      if (!draft || !draft.__ts) return null;
      var hasContent = !!draft.__tipoDocSel ||
        (draft.__oasMineducSel && draft.__oasMineducSel.length > 0) ||
        (draft.inputContenido && draft.inputContenido.trim().length > 5);
      return hasContent ? draft.__ts : null;
    } catch (e) { return null; }
  }

  function _draftClear() {
    try {
      localStorage.removeItem(_DRAFT_KEY);
      var ind = document.getElementById('draftIndicator');
      if (ind) ind.style.display = 'none';
      if (typeof showToast === 'function') showToast('Borrador descartado.', 'info');
    } catch (e) { }
  }

  function _draftRestoreUI() {
    var ts = _draftHasContent();
    if (!ts) return;
    var fecha = new Date(ts).toLocaleString('es-CL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    var banner = document.createElement('div');
    banner.id = 'draftRestoreBanner';
    banner.style.cssText = 'position:fixed;top:90px;left:50%;transform:translateX(-50%);z-index:980;background:linear-gradient(135deg,rgba(124,58,237,.95),rgba(34,211,238,.85));color:#fff;padding:14px 22px;border-radius:14px;box-shadow:0 18px 40px -10px rgba(0,0,0,.5);font-size:.92rem;display:flex;align-items:center;gap:14px;backdrop-filter:blur(10px);max-width:600px;';
    banner.innerHTML =
      '<span style="font-size:1.3rem;">💾</span>' +
      '<div style="flex:1">Tienes un borrador guardado del ' + fecha + '. ¿Quieres restaurarlo?</div>' +
      '<button id="btnDraftRestore" style="background:#fff;color:#7c3aed;border:0;padding:8px 14px;border-radius:8px;font-weight:700;cursor:pointer;">Restaurar</button>' +
      '<button id="btnDraftDiscard" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);padding:8px 14px;border-radius:8px;font-weight:600;cursor:pointer;">Descartar</button>';
    document.body.appendChild(banner);
    document.getElementById('btnDraftRestore').addEventListener('click', function () {
      var ts2 = _draftRestore();
      if (ts2 && typeof showToast === 'function') showToast('Borrador restaurado ✓', 'success');
      banner.remove();
    });
    document.getElementById('btnDraftDiscard').addEventListener('click', function () {
      _draftClear();
      banner.remove();
    });
    setTimeout(function () { if (banner.parentNode) banner.remove(); }, 30000);
  }

  function _draftMountIndicator() {
    var fab = document.getElementById('matFAB');
    if (!fab) return;
    var ind = document.createElement('div');
    ind.id = 'draftIndicator';
    ind.style.cssText = 'display:none;align-items:center;justify-content:center;font-size:.74rem;color:#94a3b8;background:rgba(15,23,42,.85);border:1px solid rgba(148,163,184,.18);border-radius:10px;padding:6px 10px;backdrop-filter:blur(8px);';
    fab.appendChild(ind);
  }

  // Expose en window para que el HTML inline pueda llamarlas
  window._draftCapture       = _draftCapture;
  window._draftSave          = _draftSave;
  window._draftRestore       = _draftRestore;
  window._draftHasContent    = _draftHasContent;
  window._draftClear         = _draftClear;
  window._draftRestoreUI     = _draftRestoreUI;
  window._draftMountIndicator = _draftMountIndicator;

  // Wireup
  window.addEventListener('load', function () {
    _draftMountIndicator();
    setTimeout(_draftRestoreUI, 800);
    setInterval(_draftSave, _DRAFT_INTERVAL);
    var saveTimer = null;
    document.addEventListener('input', function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(_draftSave, 1000);
    });
    document.addEventListener('change', function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(_draftSave, 600);
    });
  });
})();
