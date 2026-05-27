/* ════════════════════════════════════════════════════════════════════
 *  material-pie.js — Click&Clase
 *  Paneles de configuración PIE (NEE) para pruebas adaptadas.
 *
 *  Cada diagnóstico marcado en el grid genera un panel con sus propios
 *  parámetros: cantidad de preguntas, puntaje, alternativas, niveles
 *  Bloom, distribución por tipo de ítem y tipo de adecuación. Estado
 *  preservado por slug del diagnóstico durante la sesión.
 *
 *  Expone:
 *   - _slugNEE, _buildPIEPanel, _togglePIEPanel, _capturarPIEState,
 *     _renderPIEPanels, _wirePIEinPrueba, getEvalOpcionesPIE
 *
 *  Depende de: toggleCheckItem (en material.html), DOM ids
 *  (piePanelsContainer, chkAdjuntarPIE, pruebaPIEFields, evalDual,
 *   evalColPIE, pruebaPieDiag, pieDiagCount).
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ─── Configuración independiente por cada NEE marcada ───
  var _PIE_PANEL_STATE = {}; // { 'TDAH': { cantPreg, puntaje, ... }, ... }

  // Defaults sugeridos por diagnóstico — el docente los puede modificar
  var _PIE_DEFAULTS = {
    'TDAH':                                  { cantPreg:8, puntaje:80, alt:'3', bloom:[1,2,3], items:{sm:5,vf:2,desarrollo:1}, ade:'acceso',         tip:'Atención fluctuante: instrucciones cortas y segmentadas, tareas breves.' },
    'TEA':                                   { cantPreg:8, puntaje:80, alt:'3', bloom:[1,2,3], items:{sm:5,vf:2,desarrollo:1}, ade:'acceso',         tip:'Lenguaje literal sin sarcasmo. Apoyo visual y rutinas predecibles.' },
    'Dislexia':                              { cantPreg:8, puntaje:80, alt:'3', bloom:[1,2,3], items:{sm:5,vf:2,emparejar:1},  ade:'acceso',         tip:'Tipografía clara, espacio entre líneas. Reducir lectura extensa.' },
    'Discalculia':                           { cantPreg:7, puntaje:70, alt:'3', bloom:[1,2],   items:{sm:4,aplicacion:2,vf:1}, ade:'acceso',         tip:'Calculadora autorizada. Problemas con datos explícitos.' },
    'Disgrafía':                             { cantPreg:8, puntaje:80, alt:'3', bloom:[1,2,3], items:{sm:5,vf:2,emparejar:1},  ade:'acceso',         tip:'Reducir respuestas escritas largas. Permitir respuesta oral o tipeada.' },
    'Discapacidad Intelectual Leve':         { cantPreg:6, puntaje:60, alt:'3', bloom:[1,2],   items:{sm:4,vf:1,emparejar:1},  ade:'significativa', tip:'Reducir contenido. Andamiaje fuerte y refuerzo visual.' },
    'Discapacidad Intelectual Moderada':     { cantPreg:5, puntaje:50, alt:'3', bloom:[1],     items:{sm:3,vf:1,emparejar:1},  ade:'significativa', tip:'Adecuación significativa: priorizar OAs nucleares con apoyo permanente.' },
    'TEL':                                   { cantPreg:7, puntaje:70, alt:'3', bloom:[1,2],   items:{sm:4,emparejar:2,vf:1},  ade:'acceso',         tip:'Reducir carga de comprensión lectora. Usar apoyos visuales.' },
    'Funcionamiento Intelectual Limítrofe':  { cantPreg:7, puntaje:70, alt:'3', bloom:[1,2],   items:{sm:4,vf:2,emparejar:1},  ade:'acceso',         tip:'Procesos más lentos: tiempo extendido y mediación.' },
    'Trastorno Emocional / Ansiedad':        { cantPreg:8, puntaje:80, alt:'4', bloom:[1,2,3], items:{sm:5,vf:2,desarrollo:1}, ade:'acceso',         tip:'Bajar la presión de tiempo. Ambiente tranquilo.' },
    'Discapacidad Auditiva':                 { cantPreg:8, puntaje:80, alt:'4', bloom:[1,2,3], items:{sm:5,vf:2,desarrollo:1}, ade:'acceso',         tip:'Instrucciones por escrito. Apoyo visual y lengua de señas si aplica.' },
    'Discapacidad Visual':                   { cantPreg:8, puntaje:80, alt:'4', bloom:[1,2,3], items:{sm:5,vf:2,desarrollo:1}, ade:'acceso',         tip:'Texto ampliado, alto contraste, lector de pantalla si aplica.' },
    'Discapacidad Motora':                   { cantPreg:8, puntaje:80, alt:'4', bloom:[1,2,3], items:{sm:5,vf:2,desarrollo:1}, ade:'acceso',         tip:'Permitir respuesta oral o tipeada. Tiempo extra para respuestas escritas.' },
    'Otro':                                  { cantPreg:8, puntaje:80, alt:'3', bloom:[1,2],   items:{sm:5,vf:2,desarrollo:1}, ade:'acceso',         tip:'' }
  };

  function _slugNEE(s) { return (s || '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function _buildPIEPanel(neeName) {
    var slug = _slugNEE(neeName);
    var def  = _PIE_DEFAULTS[neeName] || _PIE_DEFAULTS['Otro'];
    var saved = _PIE_PANEL_STATE[neeName] || null;
    var c = saved || def;
    var checkedB = function (n) { return (c.bloom || def.bloom).indexOf(n) !== -1; };
    function cant(t) { return (c.items && c.items[t] != null) ? c.items[t] : 0; }

    var html = '<div class="pie-panel" data-nee="' + neeName + '" id="piePanel-' + slug + '">' +
      '<div class="pie-panel-header" onclick="_togglePIEPanel(this)">' +
        '<div class="pie-panel-titulo">⚇ Adaptación: ' + neeName +
          '<span class="pie-tag" id="pieTag-' + slug + '">' + (c.cantPreg || def.cantPreg) + ' preg. · ' + (c.puntaje || def.puntaje) + ' pts</span>' +
        '</div>' +
        '<span class="pie-panel-toggle">▾</span>' +
      '</div>' +
      '<div class="pie-panel-body">' +
        (def.tip ? '<p class="cfg-hint" style="margin-top:0;font-size:.8rem;color:#cbd5e1;">💡 ' + def.tip + '</p>' : '') +
        '<div class="campo-row">' +
          '<div class="campo">' +
            '<label>Cantidad de preguntas</label>' +
            '<input type="number" min="1" max="40" step="1" value="' + (c.cantPreg || def.cantPreg) + '" data-pienee-cant data-nee-slug="' + slug + '">' +
          '</div>' +
          '<div class="campo">' +
            '<label>Puntaje total</label>' +
            '<input type="number" min="1" max="500" step="1" value="' + (c.puntaje || def.puntaje) + '" data-pienee-pts data-nee-slug="' + slug + '">' +
          '</div>' +
        '</div>' +
        '<div class="campo-row">' +
          '<div class="campo">' +
            '<label>Alternativas (Selección múltiple)</label>' +
            '<select data-pienee-alt data-nee-slug="' + slug + '">' +
              '<option value="3"' + ((c.alt || def.alt) === '3' ? ' selected' : '') + '>3 alternativas (A, B, C)</option>' +
              '<option value="4"' + ((c.alt || def.alt) === '4' ? ' selected' : '') + '>4 alternativas (A, B, C, D)</option>' +
              '<option value="5"' + ((c.alt || def.alt) === '5' ? ' selected' : '') + '>5 alternativas (A, B, C, D, E)</option>' +
            '</select>' +
          '</div>' +
          '<div class="campo">' +
            '<label>Tipo de adecuación</label>' +
            '<select data-pienee-ade data-nee-slug="' + slug + '">' +
              '<option value="acceso"' + ((c.ade || def.ade) === 'acceso' ? ' selected' : '') + '>Solo de Acceso</option>' +
              '<option value="significativa"' + ((c.ade || def.ade) === 'significativa' ? ' selected' : '') + '>Significativa / PACI</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
        '<div class="campo">' +
          '<label>Niveles cognitivos</label>' +
          '<div class="bloom-selector bloom-compact">' +
            '<label class="bloom-item bloom-1-item' + (checkedB(1) ? ' checked' : '') + '"><input type="checkbox" value="1"' + (checkedB(1) ? ' checked' : '') + ' data-pienee-bloom data-nee-slug="' + slug + '" onchange="toggleCheckItem(this)"> &#128309; Recordar</label>' +
            '<label class="bloom-item bloom-2-item' + (checkedB(2) ? ' checked' : '') + '"><input type="checkbox" value="2"' + (checkedB(2) ? ' checked' : '') + ' data-pienee-bloom data-nee-slug="' + slug + '" onchange="toggleCheckItem(this)"> &#128994; Comprender</label>' +
            '<label class="bloom-item bloom-3-item' + (checkedB(3) ? ' checked' : '') + '"><input type="checkbox" value="3"' + (checkedB(3) ? ' checked' : '') + ' data-pienee-bloom data-nee-slug="' + slug + '" onchange="toggleCheckItem(this)"> &#128993; Aplicar</label>' +
            '<label class="bloom-item bloom-4-item' + (checkedB(4) ? ' checked' : '') + '"><input type="checkbox" value="4"' + (checkedB(4) ? ' checked' : '') + ' data-pienee-bloom data-nee-slug="' + slug + '" onchange="toggleCheckItem(this)"> &#128308; Analizar</label>' +
            '<label class="bloom-item bloom-5-item' + (checkedB(5) ? ' checked' : '') + '"><input type="checkbox" value="5"' + (checkedB(5) ? ' checked' : '') + ' data-pienee-bloom data-nee-slug="' + slug + '" onchange="toggleCheckItem(this)"> &#128420; Evaluar</label>' +
          '</div>' +
        '</div>' +
        '<div class="campo">' +
          '<label>Distribución por tipo de ítem</label>' +
          '<table class="tipos-preg-tabla">' +
            '<thead><tr><th>Tipo de ítem</th><th style="width:90px;text-align:center;">Cantidad</th></tr></thead>' +
            '<tbody>' +
              '<tr><td>&#9673; Selección múltiple adaptada</td><td><input type="number" min="0" max="40" step="1" value="' + cant('sm') + '" data-pienee-item="sm" data-nee-slug="' + slug + '"></td></tr>' +
              '<tr><td>&#10003; V/F amigable</td><td><input type="number" min="0" max="40" step="1" value="' + cant('vf') + '" data-pienee-item="vf" data-nee-slug="' + slug + '"></td></tr>' +
              '<tr><td>&#9998; Completar (banco de palabras)</td><td><input type="number" min="0" max="40" step="1" value="' + cant('completar') + '" data-pienee-item="completar" data-nee-slug="' + slug + '"></td></tr>' +
              '<tr><td>&#8596; Pareados reducidos (≤4)</td><td><input type="number" min="0" max="40" step="1" value="' + cant('emparejar') + '" data-pienee-item="emparejar" data-nee-slug="' + slug + '"></td></tr>' +
              '<tr><td>&#129518; Aplicación guiada (3 pasos)</td><td><input type="number" min="0" max="40" step="1" value="' + cant('aplicacion') + '" data-pienee-item="aplicacion" data-nee-slug="' + slug + '"></td></tr>' +
              '<tr><td>&#128269; Análisis de caso simplificado</td><td><input type="number" min="0" max="40" step="1" value="' + cant('caso') + '" data-pienee-item="caso" data-nee-slug="' + slug + '"></td></tr>' +
              '<tr><td>&#9997; Desarrollo con andamiaje</td><td><input type="number" min="0" max="40" step="1" value="' + cant('desarrollo') + '" data-pienee-item="desarrollo" data-nee-slug="' + slug + '"></td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
      '</div>' +
    '</div>';
    return html;
  }

  function _togglePIEPanel(headerEl) {
    var panel = headerEl.parentNode;
    if (panel) panel.classList.toggle('collapsed');
  }

  function _capturarPIEState() {
    var panels = document.querySelectorAll('#piePanelsContainer .pie-panel');
    for (var i = 0; i < panels.length; i++) {
      var nee  = panels[i].getAttribute('data-nee');
      var st = {
        cantPreg: parseInt((panels[i].querySelector('[data-pienee-cant]') || {}).value, 10) || 0,
        puntaje:  parseInt((panels[i].querySelector('[data-pienee-pts]')  || {}).value, 10) || 0,
        alt:      ((panels[i].querySelector('[data-pienee-alt]') || {}).value || '3'),
        ade:      ((panels[i].querySelector('[data-pienee-ade]') || {}).value || 'acceso'),
        bloom: [],
        items: {}
      };
      var bChecks = panels[i].querySelectorAll('[data-pienee-bloom]:checked');
      for (var b = 0; b < bChecks.length; b++) st.bloom.push(parseInt(bChecks[b].value, 10));
      var iInputs = panels[i].querySelectorAll('[data-pienee-item]');
      for (var k = 0; k < iInputs.length; k++) {
        var t = iInputs[k].getAttribute('data-pienee-item');
        st.items[t] = parseInt(iInputs[k].value, 10) || 0;
      }
      _PIE_PANEL_STATE[nee] = st;
    }
  }

  function _renderPIEPanels() {
    _capturarPIEState();
    var container = document.getElementById('piePanelsContainer');
    if (!container) return;
    var checks = document.querySelectorAll('input[name="pruebaPieDiag"]:checked');
    if (!checks.length) {
      container.innerHTML = '<div id="piePanelsEmpty" style="padding:18px;border-radius:10px;background:rgba(244,114,182,.05);border:1px dashed rgba(244,114,182,.3);color:#cbd5e1;font-size:.85rem;text-align:center;">Marca uno o varios diagnósticos en el toggle <strong>"Generar también la versión adaptada (PIE)"</strong> para configurar cada versión adaptada por separado.</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < checks.length; i++) html += _buildPIEPanel(checks[i].value);
    container.innerHTML = html;
    var listenInputs = container.querySelectorAll('[data-pienee-cant], [data-pienee-pts]');
    for (var j = 0; j < listenInputs.length; j++) {
      listenInputs[j].addEventListener('input', function (e) {
        var slug = e.target.getAttribute('data-nee-slug');
        var panel = document.getElementById('piePanel-' + slug);
        if (!panel) return;
        var c = (panel.querySelector('[data-pienee-cant]') || {}).value || '?';
        var p = (panel.querySelector('[data-pienee-pts]')  || {}).value || '?';
        var tag = document.getElementById('pieTag-' + slug);
        if (tag) tag.textContent = c + ' preg. · ' + p + ' pts';
      });
    }
  }

  function _wirePIEinPrueba() {
    var chk = document.getElementById('chkAdjuntarPIE');
    if (!chk) return;
    chk.addEventListener('change', function () {
      var box = document.getElementById('pruebaPIEFields');
      if (box) box.style.display = chk.checked ? '' : 'none';
      var dual = document.getElementById('evalDual');
      var col  = document.getElementById('evalColPIE');
      if (col) col.style.display = chk.checked ? '' : 'none';
      if (dual) {
        if (chk.checked) dual.classList.add('with-pie');
        else dual.classList.remove('with-pie');
      }
      _renderPIEPanels();
    });
    var diagBoxes = document.querySelectorAll('input[name="pruebaPieDiag"]');
    function _refrescarConteoNEE() {
      var checked = document.querySelectorAll('input[name="pruebaPieDiag"]:checked').length;
      var el = document.getElementById('pieDiagCount');
      if (el) {
        if (checked === 0) {
          el.textContent = 'Selecciona al menos un diagnóstico para generar la(s) versión(es) PIE.';
          el.style.color = '#fca5a5';
        } else {
          el.textContent = checked + ' diagnóstico' + (checked > 1 ? 's' : '') + ' seleccionado' + (checked > 1 ? 's' : '') + '. Cada uno tendrá su propio panel de configuración abajo.';
          el.style.color = '#86efac';
        }
      }
      _renderPIEPanels();
    }
    for (var i = 0; i < diagBoxes.length; i++) {
      diagBoxes[i].addEventListener('change', _refrescarConteoNEE);
    }
    _refrescarConteoNEE();
  }

  function getEvalOpcionesPIE(neeName) {
    var slug = _slugNEE(neeName);
    var panel = document.getElementById('piePanel-' + slug);
    var def = _PIE_DEFAULTS[neeName] || _PIE_DEFAULTS['Otro'];
    if (!panel) {
      return {
        cantPreg: def.cantPreg,
        puntaje: def.puntaje,
        cantAlternativas: parseInt(def.alt, 10),
        bloomLevels: def.bloom.slice(),
        tiposPreg: Object.keys(def.items).filter(function (k) { return def.items[k] > 0; }),
        itemCounts: def.items,
        tipoAdecuacion: def.ade
      };
    }
    var cantPreg = parseInt((panel.querySelector('[data-pienee-cant]') || {}).value, 10) || def.cantPreg;
    var puntaje  = parseInt((panel.querySelector('[data-pienee-pts]')  || {}).value, 10) || def.puntaje;
    var cantAlt  = parseInt((panel.querySelector('[data-pienee-alt]') || {}).value, 10) || parseInt(def.alt, 10);
    var ade      = (panel.querySelector('[data-pienee-ade]') || {}).value || def.ade;
    var bloomLevels = [];
    var bChecks = panel.querySelectorAll('[data-pienee-bloom]:checked');
    for (var i = 0; i < bChecks.length; i++) bloomLevels.push(parseInt(bChecks[i].value, 10));
    var itemCounts = {};
    var tiposPreg = [];
    var iInputs = panel.querySelectorAll('[data-pienee-item]');
    for (var k = 0; k < iInputs.length; k++) {
      var t = iInputs[k].getAttribute('data-pienee-item');
      var v = parseInt(iInputs[k].value, 10) || 0;
      itemCounts[t] = v;
      if (v > 0) tiposPreg.push(t);
    }
    return {
      cantPreg: cantPreg,
      puntaje: puntaje,
      cantAlternativas: cantAlt,
      bloomLevels: bloomLevels.length ? bloomLevels : [1, 2],
      tiposPreg: tiposPreg.length ? tiposPreg : ['sm', 'vf'],
      itemCounts: itemCounts,
      tipoAdecuacion: ade
    };
  }

  // Expose globalmente
  window._slugNEE           = _slugNEE;
  window._buildPIEPanel     = _buildPIEPanel;
  window._togglePIEPanel    = _togglePIEPanel;
  window._capturarPIEState  = _capturarPIEState;
  window._renderPIEPanels   = _renderPIEPanels;
  window._wirePIEinPrueba   = _wirePIEinPrueba;
  window.getEvalOpcionesPIE = getEvalOpcionesPIE;
  window._PIE_DEFAULTS      = _PIE_DEFAULTS;
  window._PIE_PANEL_STATE   = _PIE_PANEL_STATE;
})();
