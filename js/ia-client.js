/**
 * ia-client.js
 * Click&Clase — Cliente frontend para el asistente IA
 * Llama a /api/ia-asistente (Vercel serverless) — la API key NUNCA llega al browser
 */

var ELAsistente = (function () {
  'use strict';

  var _endpoint = '/api/ia-asistente';

  /**
   * Genera contenido con IA
   * @param {string} tipo  - 'planificacion'|'guia'|'prueba'|'apunte'|'revision'|'taller'
   * @param {object} datos - Campos del formulario (asignatura, nivel, oa, horas, tema, etc.)
   * @returns {Promise<string>} Texto generado
   */
  function generar(tipo, datos) {
    return fetch(_endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ tipo: tipo, datos: datos })
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.error) throw new Error(data.error);
      return data.resultado || '';
    });
  }

  /**
   * Muestra el panel de IA en un contenedor dado
   * @param {object} opts
   *   opts.tipo        - tipo de herramienta
   *   opts.datos       - función que retorna los datos del formulario actual
   *   opts.targetId    - ID del textarea donde se vuelca el resultado
   *   opts.btnId       - ID del botón que activa el asistente
   *   opts.notifId     - ID del elemento de notificación (opcional)
   */
  function activar(opts) {
    var btn = document.getElementById(opts.btnId);
    if (!btn) return;

    btn.addEventListener('click', function () {
      var datos = typeof opts.datos === 'function' ? opts.datos() : opts.datos;

      // Validar que hay al menos algo de contexto
      var hayContexto = Object.values(datos).some(function (v) { return v && String(v).trim(); });
      if (!hayContexto) {
        _showNotif(opts.notifId, '⚠️ Completa al menos algunos campos antes de usar el asistente IA', 'warn');
        return;
      }

      btn.disabled = true;
      btn.innerHTML = '<span class="ia-spin"></span> Generando…';

      generar(opts.tipo, datos)
        .then(function (texto) {
          var target = document.getElementById(opts.targetId);
          if (target) {
            target.value = texto;
            target.dispatchEvent(new Event('input')); // Actualiza contadores si los hay
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          _showNotif(opts.notifId, '✅ Borrador generado. Revisa y edita según necesites.', 'ok');
        })
        .catch(function (err) {
          _showNotif(opts.notifId, '❌ Error IA: ' + err.message, 'err');
        })
        .then(function () {
          btn.disabled = false;
          btn.innerHTML = '✨ Generar con IA';
        });
    });
  }

  function _showNotif(id, msg, tipo) {
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.className = 'notif ' + (tipo === 'ok' ? 'ok' : tipo === 'warn' ? 'warn' : 'err') + ' show';
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('show'); }, 6000);
  }

  // CSS del spinner IA (inyectado una vez)
  (function injectCSS() {
    if (document.getElementById('ia-client-css')) return;
    var s = document.createElement('style');
    s.id = 'ia-client-css';
    s.textContent = [
      '.ia-spin{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);',
      'border-top-color:#fff;border-radius:50%;animation:ia-spin-anim .6s linear infinite;vertical-align:middle;margin-right:6px}',
      '@keyframes ia-spin-anim{to{transform:rotate(360deg)}}',
      '.btn-ia{background:linear-gradient(135deg,#7c3aed,#6366f1);color:#fff;border:none;',
      'padding:10px 18px;border-radius:8px;cursor:pointer;font-size:.875rem;font-weight:600;',
      'display:inline-flex;align-items:center;gap:6px;transition:opacity .2s}',
      '.btn-ia:hover{opacity:.88}.btn-ia:disabled{opacity:.5;cursor:not-allowed}',
      '.notif.warn{background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.35);color:#f59e0b}'
    ].join('');
    document.head.appendChild(s);
  })();

  return { generar: generar, activar: activar };
})();
