/* ════════════════════════════════════════════════════════════════════
 *  presencia-logger.js — Click&Clase
 *  Latido de presencia (online) — escribe usuarios/{uid}.lastSeen +
 *  currentPage + currentPageLabel cada 30 s para que el panel admin
 *  pueda mostrar quién está online y qué está mirando.
 *
 *  Los EVENTOS (login, generar material, etc.) usan ELDB.actividad.log()
 *  que ya existe en js/firebase-db.js — este módulo NO los duplica.
 *
 *  Uso desde cada página:
 *      <script src="js/presencia-logger.js"></script>
 *      <script>ELPresencia.start('Crear material');</script>
 *
 *  Requiere window.EL_DB y window.ELAuth ya cargados.
 * ════════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  var HEARTBEAT_MS = 30000;          // 30 s entre latidos
  var HIDDEN_GRACE_MS = 90000;        // 90 s con pestaña oculta = pausa
  var _user = null;
  var _label = '';
  var _path = '';
  var _timer = null;
  var _hiddenSince = null;
  var _started = false;

  function _now() { return new Date().toISOString(); }
  function _pagePath() {
    try { return location.pathname.split('/').pop() || 'index.html'; }
    catch (e) { return 'desconocido'; }
  }

  function _writeHeartbeat() {
    if (!_user || !global.EL_DB) return;
    var payload = {
      lastSeen:         _now(),
      lastSeenNum:      Date.now(),
      currentPage:      _path,
      currentPageLabel: _label
    };
    // update() es silencioso — no molesta al usuario con errores de telemetría.
    EL_DB.collection('usuarios').doc(_user.uid).update(payload)
      .catch(function (e) {
        if (global.console && console.debug) {
          console.debug('[presencia] heartbeat err:', e && e.message);
        }
      });
  }

  function _startTimer() {
    _stopTimer();
    _timer = setInterval(function () {
      if (_hiddenSince && (Date.now() - _hiddenSince) > HIDDEN_GRACE_MS) return;
      _writeHeartbeat();
    }, HEARTBEAT_MS);
  }
  function _stopTimer() {
    if (_timer) { clearInterval(_timer); _timer = null; }
  }

  function _onVisibilityChange() {
    if (document.hidden) {
      _hiddenSince = Date.now();
    } else {
      _hiddenSince = null;
      _writeHeartbeat();
    }
  }

  function _onBeforeUnload() {
    if (!_user || !global.EL_DB) return;
    try {
      // Marca lastSeen como antigua para que desaparezca del panel rápido.
      EL_DB.collection('usuarios').doc(_user.uid).update({
        lastSeen:         new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        lastSeenNum:      Date.now() - 5 * 60 * 1000,
        currentPage:      '',
        currentPageLabel: ''
      });
    } catch (e) { /* ignore */ }
  }

  function start(label) {
    if (_started) return;
    if (!global.ELAuth) {
      console.warn('[presencia] ELAuth no disponible — abortando');
      return;
    }
    _label = String(label || 'Página');
    _path = _pagePath();

    global.ELAuth.onUserReady(function (user) {
      if (!user) return;
      _user = user;
      _started = true;
      _writeHeartbeat();
      _startTimer();
      document.addEventListener('visibilitychange', _onVisibilityChange);
      window.addEventListener('beforeunload', _onBeforeUnload);
    });
  }

  // Etiqueta legible a partir del nombre del archivo (para fallback).
  function pageLabelFromPath(p) {
    var f = String(p || _pagePath()).toLowerCase();
    var map = {
      'index.html':              'Landing',
      'login.html':              'Login',
      'dashboard.html':          'Dashboard',
      'dashboard-profesor.html': 'Dashboard profesor',
      'planificacion.html':      'Planificación',
      'material.html':           'Crear material',
      'biblioteca.html':         'Biblioteca',
      'evaluaciones.html':       'Evaluaciones',
      'listas-curso.html':       'Libro de clases',
      'ranking.html':            'Ranking',
      'admin.html':              'Panel admin',
      'setup.html':              'Configuración'
    };
    return map[f] || f.replace(/\.html$/, '') || 'Página';
  }

  global.ELPresencia = {
    start: start,
    pageLabelFromPath: pageLabelFromPath
  };
})(typeof window !== 'undefined' ? window : this);
