/**
 * ia-widget.js — Click&Clase
 * ────────────────────────────────────────────────────────────────
 * Widget flotante "Preguntá a Click&Clase" con chat IA.
 * Self-contained: inyecta su propio CSS + HTML + lógica.
 *
 * Uso: <script src="js/ia-widget.js" defer></script>
 * El widget se auto-inicializa cuando DOMContentLoaded + hay user.
 *
 * Reutiliza /api/ia-asistente (window.IA_ENDPOINT) con tipo:'chat'.
 * Si el backend aún no soporta 'chat', el servidor puede caer a un
 * modo genérico usando datos.prompt como mensaje libre.
 */
(function (global) {
  'use strict';

  // No cargar el widget en páginas públicas (login, index, planes, pricing, signup)
  var _publicPages = ['index.html','login.html','planes.html','pricing.html','signup.html','preview-guia.html',''];
  var _currentPage = (location.pathname || '').split('/').pop().toLowerCase();
  if (_publicPages.indexOf(_currentPage) !== -1) return;

  // ── Estado ──
  var _mensajes = [];       // {rol:'user'|'assistant', texto:'...', ts:Date}
  var _cargando = false;
  var _open = false;
  var _rootEl = null;
  var _chatEl = null;
  var _inputEl = null;
  var _fabEl = null;
  var _bodyEl = null;

  // Sugerencias iniciales (mostradas cuando la conversación está vacía)
  var _sugerencias = [
    '💡 Dame 3 estrategias para motivar a un curso desmotivado',
    '📝 Ayudame a redactar una rúbrica de evaluación',
    '🎯 Sugerime actividades dinámicas para iniciar una clase',
    '🧠 Cómo diferenciar la enseñanza para estudiantes con distintos ritmos'
  ];

  // ═════════════════════════════════════════════════════════════
  //  CSS inyectado
  // ═════════════════════════════════════════════════════════════
  var CSS = `
  /* ── Botón flotante ── */
  .cc-ia-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563EB 0%, #38BDF8 100%);
    border: none;
    color: #fff;
    font-size: 1.55rem;
    box-shadow:
      0 10px 32px rgba(37,99,235,.42),
      0 3px 10px rgba(37,99,235,.28),
      inset 0 1px 0 rgba(255,255,255,.25);
    cursor: pointer;
    z-index: 9998;
    display: grid;
    place-items: center;
    transition: transform .22s cubic-bezier(.4,0,.2,1), box-shadow .3s;
    animation: ccIaPulse 2.8s ease-in-out infinite;
  }
  .cc-ia-fab:hover {
    transform: translateY(-3px) scale(1.06);
    box-shadow:
      0 14px 40px rgba(37,99,235,.55),
      0 4px 14px rgba(37,99,235,.35);
  }
  .cc-ia-fab.is-open { transform: scale(.9); opacity: 0; pointer-events: none; }
  @keyframes ccIaPulse {
    0%,100% { box-shadow: 0 10px 32px rgba(37,99,235,.42), 0 3px 10px rgba(37,99,235,.28), 0 0 0 0 rgba(37,99,235,.28); }
    50%     { box-shadow: 0 10px 32px rgba(37,99,235,.42), 0 3px 10px rgba(37,99,235,.28), 0 0 0 14px rgba(37,99,235,0); }
  }
  .cc-ia-fab .cc-ia-fab-badge {
    position: absolute; top: -4px; right: -4px;
    background: #DC2626; color: #fff;
    min-width: 20px; height: 20px; border-radius: 999px;
    font-size: .68rem; font-weight: 800;
    display: grid; place-items: center;
    box-shadow: 0 4px 10px rgba(220,38,38,.4);
    border: 2px solid #fff;
  }

  /* ── Backdrop click-to-close (opcional, ligero) ── */
  .cc-ia-backdrop {
    position: fixed; inset: 0;
    background: transparent;
    z-index: 9998;
    display: none;
  }
  .cc-ia-backdrop.show { display: block; }

  /* ── Chat panel ── */
  .cc-ia-chat {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 380px;
    max-width: calc(100vw - 32px);
    height: 560px;
    max-height: calc(100vh - 48px);
    background: #FFFFFF;
    border: 1px solid rgba(37,99,235,.15);
    border-radius: 22px;
    box-shadow:
      0 32px 60px rgba(37,99,235,.22),
      0 12px 30px rgba(37,99,235,.14),
      0 0 0 1px rgba(37,99,235,.05);
    z-index: 9999;
    display: none;
    flex-direction: column;
    overflow: hidden;
    color: #0C1E3B;
    animation: ccIaSlideIn .28s cubic-bezier(.34,1.56,.64,1);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .cc-ia-chat.show { display: flex; }
  @keyframes ccIaSlideIn {
    from { opacity: 0; transform: translateY(20px) scale(.96); }
    to   { opacity: 1; transform: translateY(0)     scale(1); }
  }

  /* ── Header ── */
  .cc-ia-header {
    padding: 16px 18px;
    background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 60%, #38BDF8 100%);
    color: #fff;
    display: flex; align-items: center; gap: 12px;
    position: relative;
    overflow: hidden;
  }
  .cc-ia-header::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,.14), transparent 55%);
    pointer-events: none;
  }
  .cc-ia-header-icon {
    width: 40px; height: 40px; border-radius: 12px;
    background: rgba(255,255,255,.18);
    display: grid; place-items: center; font-size: 1.2rem;
    flex-shrink: 0;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,.24);
  }
  .cc-ia-header-txt { flex: 1; min-width: 0; }
  .cc-ia-header-tit {
    font-family: 'Space Grotesk','Inter', sans-serif;
    font-weight: 800; font-size: 1rem; letter-spacing: -.01em;
  }
  .cc-ia-header-sub {
    font-size: .74rem; opacity: .88; margin-top: 2px;
    display: inline-flex; align-items: center; gap: 5px;
  }
  .cc-ia-header-sub::before {
    content: ''; width: 7px; height: 7px; border-radius: 999px;
    background: #34d399; box-shadow: 0 0 8px rgba(52,211,153,.65);
  }
  .cc-ia-header-btns { display: flex; gap: 6px; }
  .cc-ia-hbtn {
    background: rgba(255,255,255,.15);
    border: 0; color: #fff;
    width: 34px; height: 34px; border-radius: 10px;
    font-size: .95rem; cursor: pointer;
    transition: background .18s;
    display: grid; place-items: center;
  }
  .cc-ia-hbtn:hover { background: rgba(255,255,255,.28); }

  /* ── Body / lista de mensajes ── */
  .cc-ia-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 14px 4px;
    background:
      linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%);
    scroll-behavior: smooth;
  }
  .cc-ia-body::-webkit-scrollbar { width: 6px; }
  .cc-ia-body::-webkit-scrollbar-thumb {
    background: rgba(37,99,235,.25);
    border-radius: 6px;
  }

  /* ── Estado vacío + sugerencias ── */
  .cc-ia-empty {
    text-align: center;
    padding: 14px 8px 4px;
  }
  .cc-ia-empty-emoji {
    font-size: 2.4rem; margin-bottom: 6px;
    display: inline-block;
    animation: ccIaBounce 2.2s ease-in-out infinite;
  }
  @keyframes ccIaBounce {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-6px); }
  }
  .cc-ia-empty h4 {
    font-size: 1.02rem; font-weight: 800;
    color: #0C1E3B; margin: 0 0 5px;
    font-family: 'Space Grotesk','Inter', sans-serif;
  }
  .cc-ia-empty p {
    font-size: .84rem; color: #475569;
    line-height: 1.5; margin: 0 0 14px;
  }
  .cc-ia-sugerencias {
    display: flex; flex-direction: column; gap: 8px;
    margin-top: 4px;
  }
  .cc-ia-sug {
    background: #FFFFFF;
    border: 1px solid rgba(37,99,235,.18);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: .84rem;
    color: #334155;
    cursor: pointer;
    text-align: left;
    transition: all .18s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 2px 6px rgba(37,99,235,.05);
    font-family: inherit;
    line-height: 1.4;
  }
  .cc-ia-sug:hover {
    background: rgba(37,99,235,.06);
    border-color: rgba(37,99,235,.35);
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(37,99,235,.10);
    color: #1D4ED8;
  }

  /* ── Mensajes ── */
  .cc-ia-msg {
    display: flex; gap: 8px; margin-bottom: 12px;
    animation: ccIaMsgIn .22s ease-out;
  }
  @keyframes ccIaMsgIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cc-ia-msg-av {
    width: 30px; height: 30px; border-radius: 10px;
    display: grid; place-items: center;
    font-size: .8rem; font-weight: 800;
    flex-shrink: 0;
  }
  .cc-ia-msg.user { flex-direction: row-reverse; }
  .cc-ia-msg.user .cc-ia-msg-av {
    background: linear-gradient(135deg, #2563EB, #38BDF8);
    color: #fff;
    box-shadow: 0 4px 10px rgba(37,99,235,.28);
  }
  .cc-ia-msg.assistant .cc-ia-msg-av {
    background: linear-gradient(135deg, #F59E0B, #DC2626);
    color: #fff;
    font-size: .95rem;
    box-shadow: 0 4px 10px rgba(245,158,11,.28);
  }
  .cc-ia-msg-txt {
    max-width: 82%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: .88rem;
    line-height: 1.55;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #0C1E3B;
  }
  .cc-ia-msg.user .cc-ia-msg-txt {
    background: linear-gradient(135deg, #2563EB, #1D4ED8);
    color: #fff;
    border-bottom-right-radius: 4px;
    box-shadow: 0 4px 12px rgba(37,99,235,.22);
  }
  .cc-ia-msg.assistant .cc-ia-msg-txt {
    background: #FFFFFF;
    border: 1px solid rgba(37,99,235,.14);
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 6px rgba(37,99,235,.05);
  }
  .cc-ia-msg.assistant .cc-ia-msg-txt strong { color: #1D4ED8; }
  .cc-ia-msg.assistant .cc-ia-msg-txt code {
    background: rgba(37,99,235,.09);
    padding: 1px 6px; border-radius: 5px;
    font-family: 'SF Mono', Menlo, monospace;
    font-size: .82rem;
  }

  /* ── Loading dots ── */
  .cc-ia-loading {
    display: inline-flex; gap: 5px; padding: 4px 0;
  }
  .cc-ia-loading span {
    width: 7px; height: 7px; border-radius: 50%;
    background: rgba(37,99,235,.5);
    animation: ccIaDot 1.2s ease-in-out infinite;
  }
  .cc-ia-loading span:nth-child(2) { animation-delay: .18s; }
  .cc-ia-loading span:nth-child(3) { animation-delay: .36s; }
  @keyframes ccIaDot {
    0%,80%,100% { transform: scale(.6); opacity: .5; }
    40%         { transform: scale(1);  opacity: 1; }
  }

  /* ── Footer con input ── */
  .cc-ia-footer {
    padding: 12px 14px;
    background: #FFFFFF;
    border-top: 1px solid rgba(37,99,235,.10);
    display: flex; gap: 8px; align-items: flex-end;
  }
  .cc-ia-input {
    flex: 1;
    resize: none;
    border: 1.5px solid rgba(37,99,235,.14);
    border-radius: 14px;
    padding: 10px 14px;
    font-family: inherit;
    font-size: .88rem;
    color: #0C1E3B;
    background: #F8FAFF;
    outline: none;
    max-height: 100px;
    min-height: 42px;
    line-height: 1.45;
    transition: border-color .18s, box-shadow .18s;
  }
  .cc-ia-input::placeholder { color: #64748B; }
  .cc-ia-input:focus {
    border-color: #2563EB;
    box-shadow: 0 0 0 3px rgba(37,99,235,.14);
    background: #FFFFFF;
  }
  .cc-ia-send {
    width: 44px; height: 44px; border-radius: 12px;
    background: linear-gradient(135deg, #2563EB, #1D4ED8);
    color: #fff; border: 0;
    font-size: 1.05rem;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(37,99,235,.32);
    transition: transform .12s, box-shadow .2s;
    flex-shrink: 0;
    display: grid; place-items: center;
  }
  .cc-ia-send:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(37,99,235,.42);
  }
  .cc-ia-send:disabled { opacity: .45; cursor: not-allowed; }

  /* ── Mensaje de error ── */
  .cc-ia-error {
    padding: 10px 14px;
    background: rgba(220,38,38,.07);
    border: 1px solid rgba(220,38,38,.24);
    border-radius: 12px;
    color: #B91C1C;
    font-size: .82rem;
    margin-bottom: 12px;
    display: flex; align-items: center; gap: 8px;
  }

  /* ── Responsive mobile ── */
  @media (max-width: 480px) {
    .cc-ia-chat {
      right: 8px; left: 8px; bottom: 8px;
      width: auto; height: calc(100vh - 16px);
      border-radius: 18px;
    }
    .cc-ia-fab { right: 16px; bottom: 16px; }
  }
  `;

  // ═════════════════════════════════════════════════════════════
  //  HTML template
  // ═════════════════════════════════════════════════════════════
  var HTML = `
  <button class="cc-ia-fab" id="ccIaFab" type="button" aria-label="Abrir asistente IA" title="Preguntá a Click&Clase (IA)">
    ⚡
  </button>
  <div class="cc-ia-backdrop" id="ccIaBackdrop"></div>
  <div class="cc-ia-chat" id="ccIaChat" role="dialog" aria-modal="true" aria-label="Chat asistente IA">
    <div class="cc-ia-header">
      <div class="cc-ia-header-icon">🤖</div>
      <div class="cc-ia-header-txt">
        <div class="cc-ia-header-tit">Preguntá a Click&Clase</div>
        <div class="cc-ia-header-sub">Asistente pedagógico con IA</div>
      </div>
      <div class="cc-ia-header-btns">
        <button class="cc-ia-hbtn" id="ccIaClear" type="button" title="Limpiar conversación" aria-label="Limpiar">🗑</button>
        <button class="cc-ia-hbtn" id="ccIaClose" type="button" title="Cerrar" aria-label="Cerrar">×</button>
      </div>
    </div>
    <div class="cc-ia-body" id="ccIaBody"></div>
    <div class="cc-ia-footer">
      <textarea
        class="cc-ia-input"
        id="ccIaInput"
        placeholder="Preguntá lo que necesites…"
        rows="1"
        maxlength="2000"></textarea>
      <button class="cc-ia-send" id="ccIaSend" type="button" title="Enviar" aria-label="Enviar">➤</button>
    </div>
  </div>
  `;

  // ═════════════════════════════════════════════════════════════
  //  Helpers
  // ═════════════════════════════════════════════════════════════
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Formato simple: **negrita**, `código`, saltos de línea
  function fmtTexto(t) {
    var s = esc(t);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    return s;
  }

  function scrollBottom() {
    if (_bodyEl) _bodyEl.scrollTop = _bodyEl.scrollHeight;
  }

  // ═════════════════════════════════════════════════════════════
  //  Render
  // ═════════════════════════════════════════════════════════════
  function renderBody() {
    if (!_bodyEl) return;

    if (_mensajes.length === 0) {
      _bodyEl.innerHTML =
        '<div class="cc-ia-empty">' +
          '<div class="cc-ia-empty-emoji">👋</div>' +
          '<h4>¡Hola docente!</h4>' +
          '<p>Preguntame lo que necesites: OAs, rúbricas, actividades, planificaciones, dudas pedagógicas.</p>' +
          '<div class="cc-ia-sugerencias">' +
            _sugerencias.map(function (s) {
              return '<button class="cc-ia-sug" type="button" data-sug="' + esc(s) + '">' + esc(s) + '</button>';
            }).join('') +
          '</div>' +
        '</div>';
      // wire sugerencias
      _bodyEl.querySelectorAll('.cc-ia-sug').forEach(function (btn) {
        btn.addEventListener('click', function () {
          // Quita el emoji inicial "🎯 " para dejar la pregunta limpia
          var txt = btn.getAttribute('data-sug') || '';
          var limpio = txt.replace(/^[^\w]+\s*/, '');
          enviarMensaje(limpio);
        });
      });
      return;
    }

    var html = _mensajes.map(function (m) {
      var av = m.rol === 'user' ? 'E' : '🤖';
      var txt = m.esError
        ? '<div class="cc-ia-error">⚠️ ' + esc(m.texto) + '</div>'
        : fmtTexto(m.texto);
      return '<div class="cc-ia-msg ' + m.rol + '">' +
        '<div class="cc-ia-msg-av">' + av + '</div>' +
        '<div class="cc-ia-msg-txt">' + txt + '</div>' +
      '</div>';
    }).join('');

    if (_cargando) {
      html += '<div class="cc-ia-msg assistant">' +
        '<div class="cc-ia-msg-av">🤖</div>' +
        '<div class="cc-ia-msg-txt">' +
          '<div class="cc-ia-loading"><span></span><span></span><span></span></div>' +
        '</div>' +
      '</div>';
    }

    _bodyEl.innerHTML = html;
    scrollBottom();
  }

  // ═════════════════════════════════════════════════════════════
  //  Envío de mensajes
  // ═════════════════════════════════════════════════════════════
  function enviarMensaje(texto) {
    texto = String(texto || '').trim();
    if (!texto || _cargando) return;

    _mensajes.push({ rol: 'user', texto: texto, ts: new Date() });
    _cargando = true;
    renderBody();
    if (_inputEl) { _inputEl.value = ''; autoResize(); }

    // Endpoint: si se abrió por file:// (doble click), rutas relativas fallan.
    // Detectamos y hacemos fallback a producción para permitir testing local.
    var endpoint = global.IA_ENDPOINT || '/api/ia-asistente';
    if (endpoint.charAt(0) === '/' && location.protocol === 'file:') {
      endpoint = 'https://clickyclase.cl' + endpoint;
    }

    // Construir contexto de conversación (últimos 6 mensajes para no gastar tokens)
    var contexto = _mensajes.slice(-6).filter(function (m) { return m && m.rol && m.texto; });

    // Prompt completo pre-armado (compatible con backends viejos que usan tipo:'raw')
    var systemPrompt = 'Sos "Click&Clase", un asistente pedagógico experto en el currículum Mineduc de Chile (Plan Común y Formación Diferenciada Técnico-Profesional). ' +
      'Ayudás a docentes chilenos con dudas rápidas, actividades, rúbricas, OAs, y estrategias de aula.\n\n' +
      'Estilo:\n' +
      '- Español chileno neutro y cercano.\n' +
      '- Respuestas concisas y accionables (máximo 250 palabras salvo que pidan detalle).\n' +
      '- Usá **negrita** para conceptos clave, `código` para códigos de OA (ej: `OA 05`).\n' +
      '- Cuando sugieras actividades, listalas numeradas con nombre + descripción breve + tiempo estimado.\n' +
      '- Nunca inventes OAs o AEs que no existen.\n' +
      '- Si te preguntan algo fuera del ámbito docente, redirigí amablemente al tema educativo.';

    var historialTexto = contexto
      .filter(function (m) { return m.texto !== texto; }) // no dupliques la actual
      .map(function (m) { return (m.rol === 'user' ? 'DOCENTE: ' : 'ASISTENTE: ') + m.texto; })
      .join('\n\n');

    var promptCompleto = systemPrompt + '\n\n' +
      (historialTexto ? 'Conversación previa:\n' + historialTexto + '\n\n' : '') +
      'DOCENTE: ' + texto + '\n\nASISTENTE:';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Uso tipo:'raw' que ya existe en el backend + envío el prompt ya armado.
        // Así funciona sin necesidad de redeploy de functions.
        tipo: 'raw',
        datos: {
          prompt:      promptCompleto,
          mensaje:     texto,
          historial:   contexto,
          maxTokens:   1024,
          temperature: 0.72
        }
      })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('El servidor respondió ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data.error) throw new Error(data.error);
        var respuesta = data.resultado || data.respuesta || data.text || '';
        if (!respuesta) throw new Error('Respuesta vacía del asistente.');
        _mensajes.push({ rol: 'assistant', texto: respuesta, ts: new Date() });
      })
      .catch(function (err) {
        console.error('[ia-widget] error:', err);
        var msg = (err && err.message) || 'No pude responder ahora.';
        // Mensajes amigables según tipo de error
        if (msg.indexOf('Failed to fetch') !== -1 || msg.indexOf('CONNECTION') !== -1) {
          msg = 'No hay conexión. Revisá tu red y volvé a intentar.';
        } else if (msg.indexOf('500') !== -1 || msg.indexOf('503') !== -1) {
          msg = 'El asistente está sobrecargado. Intentá en unos segundos.';
        } else if (msg.indexOf('404') !== -1) {
          msg = 'El endpoint /api/ia-asistente no está desplegado. Contactá al admin.';
        }
        _mensajes.push({ rol: 'assistant', texto: msg, ts: new Date(), esError: true });
      })
      .then(function () {
        _cargando = false;
        renderBody();
        guardarHistorialLocal();
      });
  }

  // ═════════════════════════════════════════════════════════════
  //  Persistencia (localStorage por sesión, se limpia al cerrar tab)
  // ═════════════════════════════════════════════════════════════
  var STORAGE_KEY = 'cc_ia_widget_hist';
  function guardarHistorialLocal() {
    try {
      // Solo últimos 20 mensajes para no explotar localStorage
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(_mensajes.slice(-20)));
    } catch (e) {}
  }
  function cargarHistorialLocal() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr)) _mensajes = arr;
      }
    } catch (e) {}
  }

  function limpiarConversacion() {
    _mensajes = [];
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
    renderBody();
  }

  // ═════════════════════════════════════════════════════════════
  //  Open / close
  // ═════════════════════════════════════════════════════════════
  function toggle() { _open ? cerrar() : abrir(); }
  function abrir() {
    if (_open) return;
    _open = true;
    _chatEl.classList.add('show');
    _fabEl.classList.add('is-open');
    document.getElementById('ccIaBackdrop').classList.add('show');
    setTimeout(function () { if (_inputEl) _inputEl.focus(); }, 220);
    renderBody();
  }
  function cerrar() {
    if (!_open) return;
    _open = false;
    _chatEl.classList.remove('show');
    _fabEl.classList.remove('is-open');
    document.getElementById('ccIaBackdrop').classList.remove('show');
  }

  // ═════════════════════════════════════════════════════════════
  //  Auto-resize del textarea
  // ═════════════════════════════════════════════════════════════
  function autoResize() {
    if (!_inputEl) return;
    _inputEl.style.height = 'auto';
    _inputEl.style.height = Math.min(_inputEl.scrollHeight, 100) + 'px';
  }

  // ═════════════════════════════════════════════════════════════
  //  Init
  // ═════════════════════════════════════════════════════════════
  function init() {
    if (document.getElementById('ccIaFab')) return; // ya inyectado

    // Inyectar CSS
    var style = document.createElement('style');
    style.id = 'cc-ia-widget-css';
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inyectar HTML
    _rootEl = document.createElement('div');
    _rootEl.id = 'cc-ia-widget-root';
    _rootEl.innerHTML = HTML;
    document.body.appendChild(_rootEl);

    _fabEl = document.getElementById('ccIaFab');
    _chatEl = document.getElementById('ccIaChat');
    _bodyEl = document.getElementById('ccIaBody');
    _inputEl = document.getElementById('ccIaInput');

    // Cargar historial de la sesión
    cargarHistorialLocal();

    // Wiring
    _fabEl.addEventListener('click', abrir);
    document.getElementById('ccIaClose').addEventListener('click', cerrar);
    document.getElementById('ccIaClear').addEventListener('click', limpiarConversacion);
    document.getElementById('ccIaBackdrop').addEventListener('click', cerrar);

    _inputEl.addEventListener('input', autoResize);
    _inputEl.addEventListener('keydown', function (e) {
      // Enter envía, Shift+Enter salto de línea
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviarMensaje(_inputEl.value);
      }
    });
    document.getElementById('ccIaSend').addEventListener('click', function () {
      enviarMensaje(_inputEl.value);
    });

    // Esc cierra el chat
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && _open) cerrar();
    });

    // API pública
    global.CCIaWidget = {
      abrir:    abrir,
      cerrar:   cerrar,
      toggle:   toggle,
      preguntar: function (texto) {
        abrir();
        enviarMensaje(texto);
      },
      limpiar:  limpiarConversacion
    };

    console.log('[ia-widget] listo');
  }

  // Init cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
