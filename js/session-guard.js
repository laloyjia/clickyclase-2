/**
 * session-guard.js — Click&Clase
 * ────────────────────────────────────────────────────────────────
 * Guardián global de sesión que corrige 3 problemas críticos:
 *   1) Los links "Salir" (a href="login.html") NO invocaban signOut(),
 *      por lo que el token Firebase quedaba vivo y el usuario podía
 *      volver escribiendo la URL. Ahora se intercepta el click.
 *   2) Al usar "atrás" del navegador tras logout, la página cacheada
 *      se mostraba brevemente. Ahora forzamos reload si detectamos
 *      que no hay sesión activa.
 *   3) Botones "Volver al Panel Docente" que rompen si el user no
 *      tiene rol profesor — ahora se enruta al dashboard correcto.
 *
 * Se auto-inicializa al cargar. Cargar con defer al final del body:
 *   <script src="js/session-guard.js" defer></script>
 */
(function () {
  'use strict';

  var PUBLIC = ['index.html','login.html','planes.html','pricing.html','signup.html','preview-guia.html',''];
  var page = (location.pathname || '').split('/').pop().toLowerCase();
  var esPublica = PUBLIC.indexOf(page) !== -1;

  // ── 1. Interceptar clicks en links "Salir" y ejecutar logout real ──
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a');
    if (!a) return;
    var esSalir = a.classList.contains('salir')
      || (a.textContent || '').trim().toLowerCase() === 'salir'
      || (a.textContent || '').trim().toLowerCase() === 'cerrar sesión'
      || (a.textContent || '').trim().toLowerCase() === 'cerrar sesion';
    var href = (a.getAttribute('href') || '').toLowerCase();
    var esLoginLink = href === 'login.html' || href.endsWith('/login.html');
    if (esSalir || (esLoginLink && !esPublica)) {
      ev.preventDefault();
      _cerrarSesion();
    }
  }, true);

  function _cerrarSesion() {
    // Marcar que se hizo logout para que pageshow lo detecte
    try { sessionStorage.setItem('cc_loggedOut', '1'); } catch(_) {}
    try {
      // Limpiar estado interno de la app (después de marcar el flag)
      try { localStorage.removeItem('cc_lastRole'); } catch(_) {}
      // Reemplazar la entrada actual del historial ANTES de irse
      // → así al presionar "atrás" no vuelve al panel
      try { history.replaceState(null, '', 'login.html'); } catch(_) {}
      // Firebase signOut si está disponible
      if (window.ELAuth && typeof ELAuth.logout === 'function') {
        return ELAuth.logout();
      }
      if (window.firebase && firebase.auth) {
        return firebase.auth().signOut().finally(function () {
          window.location.replace('login.html');
        });
      }
      window.location.replace('login.html');
    } catch (e) {
      console.warn('[session-guard] cerrar sesión:', e);
      window.location.replace('login.html');
    }
  }

  // ── 2. bfcache: al volver con "atrás" verificar sesión ──
  // Si hay sesión activa Y se hizo logout intencional, redirigir a login.
  // Si NO hay sesión, redirigir a login. Si hay sesión y no hubo logout,
  // NO recargar (mantiene la performance del bfcache).
  window.addEventListener('pageshow', function (ev) {
    if (esPublica) return;
    if (!ev.persisted) return; // solo si viene del bfcache
    // Si el usuario hizo logout hace un rato, forzar volver a login
    var loggedOut = false;
    try { loggedOut = sessionStorage.getItem('cc_loggedOut') === '1'; } catch(_){}
    if (loggedOut) {
      try { sessionStorage.removeItem('cc_loggedOut'); } catch(_){}
      window.location.replace('login.html');
      return;
    }
    // Verificar auth Firebase; si NO hay sesión, ir a login. Si hay, dejar la página como está.
    try {
      var fbUser = window.firebase && firebase.auth && firebase.auth().currentUser;
      var elUser = window.ELAuth && (ELAuth.user || ELAuth._firebaseUser);
      if (!fbUser && !elUser) window.location.replace('login.html');
    } catch (_) {}
  });

  // ── 3. Redirigir botones "Volver al Panel Docente" al panel correcto ──
  // Si el user no es profesor/jefe_curso, no debe ir a dashboard-profesor.html
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a');
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href !== 'dashboard-profesor.html' && href !== '/dashboard-profesor.html') return;
    var u = (window.ELAuth && ELAuth.user) || null;
    if (!u) return; // sin user, el requireAuth lo maneja después
    var rol = u.role || '';
    if (rol === 'profesor' || rol === 'jefe_curso' || rol === 'admin') return;
    // Otros roles: enrutar al panel apropiado
    ev.preventDefault();
    var destino = 'dashboard-profesor.html';
    if (window.CCRoles && typeof CCRoles.panelDefault === 'function') {
      destino = CCRoles.panelDefault(u) || destino;
    } else {
      var MAP = {
        utp:'panel-utp.html', director:'panel-director.html', rector:'panel-director.html',
        admin_colegio:'panel-admin-colegio.html', pie_enc:'panel-pie.html', pie_edu:'panel-pie-edu.html',
        aps_enc:'panel-apoyo.html', aps_prof:'panel-apoyo-prof.html',
        amb_enc:'panel-ambiente.html', amb_prof:'panel-ambiente-prof.html'
      };
      destino = MAP[rol] || destino;
    }
    window.location.href = destino;
  }, true);

  // ── 4. Auto-logout por inactividad (opcional, 60 min) ──
  // Solo en páginas privadas. Se reinicia con cualquier interacción.
  if (!esPublica) {
    var TIMEOUT_MIN = 60;
    var _t;
    function _reset() {
      clearTimeout(_t);
      _t = setTimeout(function () {
        alert('Tu sesión expiró por inactividad. Iniciá sesión nuevamente.');
        _cerrarSesion();
      }, TIMEOUT_MIN * 60 * 1000);
    }
    ['mousedown','keydown','touchstart','scroll'].forEach(function (ev) {
      window.addEventListener(ev, _reset, { passive: true });
    });
    _reset();
  }

  // Exponer helper por si algún panel quiere llamarlo directo
  window.CCSessionGuard = { logout: _cerrarSesion };
})();
