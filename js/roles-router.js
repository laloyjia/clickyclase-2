/**
 * roles-router.js — Click&Clase
 *
 * Router post-login: cuando un usuario se autentica, decide a qué panel
 * mandarlo según sus roles. Si tiene múltiples roles, elige el de mayor
 * prioridad. Si es primera vez (roles vacío), lo manda a completar perfil.
 *
 * También ofrece un "switcher" de rol para usuarios con múltiples roles,
 * para que puedan cambiar de vista sin cerrar sesión.
 *
 * Dependencias globales:
 *   - ELAuth (firebase-auth.js)
 *   - CCRoles (roles-permissions.js)
 *   - EL_ROLES_PANEL, EL_ROLES_LABEL (firebase-config.js)
 *
 * Uso mínimo en cada panel-*.html:
 *   <script src="js/roles-router.js"></script>
 *   <script>
 *     CCRouter.guardPanel('utp');  // requiere rol utp (o admin/director/rector)
 *   </script>
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'cc_rol_activo';

  /**
   * Rol actualmente activo del usuario. Persiste en localStorage para que
   * sobreviva refresco de página. Si no hay uno guardado, usa el principal.
   */
  function getRolActivo(user) {
    var guardado;
    try { guardado = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (guardado && CCRoles.tieneRol(user, guardado)) return guardado;
    return CCRoles.rolPrincipal(user);
  }

  /**
   * Cambia el rol activo del usuario y redirige al panel correspondiente.
   */
  function setRolActivo(user, roleId) {
    if (!CCRoles.tieneRol(user, roleId)) {
      console.warn('[CCRouter] usuario no tiene rol', roleId);
      return;
    }
    try { localStorage.setItem(STORAGE_KEY, roleId); } catch (e) {}
    var panel = (typeof EL_ROLES_PANEL !== 'undefined') ? EL_ROLES_PANEL[roleId] : null;
    if (panel) window.location.href = panel;
  }

  /**
   * Redirige al panel correcto para el usuario. Usado post-login.
   */
  function redirigirAPanelDefault(user) {
    var rol = getRolActivo(user);
    var mapa = (typeof EL_ROLES_PANEL !== 'undefined') ? EL_ROLES_PANEL : {};
    var destino = mapa[rol] || 'panel-profesor.html';
    // Evitar loops si ya estamos en el panel
    var actual = (window.location.pathname || '').split('/').pop();
    if (actual !== destino) window.location.href = destino;
  }

  /**
   * Guardia de acceso para páginas de panel. Se llama al inicio de cada
   * panel-*.html. Si el usuario no tiene el rol requerido (o alguno de
   * los alternativos válidos), lo redirige a su panel principal.
   *
   * @param {string|string[]} rolesRequeridos  Rol o roles que dan acceso.
   * @param {object} opts  { fallback: 'panel-profesor.html' }
   */
  function guardPanel(rolesRequeridos, opts) {
    opts = opts || {};
    var roles = Array.isArray(rolesRequeridos) ? rolesRequeridos : [rolesRequeridos];
    if (typeof ELAuth === 'undefined' || !ELAuth.onUserReady) {
      console.warn('[CCRouter] ELAuth no está cargado');
      return;
    }
    ELAuth.onUserReady(function (user) {
      if (!user) {
        window.location.href = 'login.html';
        return;
      }
      // Admin de plataforma pasa siempre
      if (CCRoles.esAdminPlataforma(user)) return;
      // Verificar rol requerido
      if (CCRoles.tieneAlgunRol(user, roles)) return;
      // Sin permiso → mandarlo a su panel principal
      console.warn('[CCRouter] usuario sin rol', roles, '→ redirigiendo a su panel');
      var destino = CCRoles.panelDefault(user) || opts.fallback || 'panel-profesor.html';
      window.location.href = destino;
    });
  }

  /**
   * Renderiza un switcher de rol dentro de un contenedor. Solo aparece si
   * el usuario tiene ≥2 roles. Al cambiar de rol, guarda en localStorage
   * y redirige.
   *
   * @param {string} containerId  ID del elemento donde inyectar el select
   * @param {object} user
   */
  function renderSwitcher(containerId, user) {
    var cont = document.getElementById(containerId);
    if (!cont || !user) return;
    var roles = CCRoles.listarRoles(user);
    if (roles.length < 2) { cont.style.display = 'none'; return; }
    var activo = getRolActivo(user);
    var labels = (typeof EL_ROLES_LABEL !== 'undefined') ? EL_ROLES_LABEL : {};
    var html = '<label style="font-size:.78rem;color:var(--muted);margin-right:6px">Ver como:</label>' +
               '<select id="ccRolSwitcher" style="padding:5px 10px;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid rgba(148,163,184,.25);color:#e5e7eb;font-size:.85rem">';
    roles.forEach(function (r) {
      var sel = (r === activo) ? ' selected' : '';
      html += '<option value="' + r + '"' + sel + '>' + (labels[r] || r) + '</option>';
    });
    html += '</select>';
    cont.innerHTML = html;
    var sel = document.getElementById('ccRolSwitcher');
    if (sel) sel.addEventListener('change', function () {
      setRolActivo(user, sel.value);
    });
  }

  /** ── API pública ── */
  window.CCRouter = {
    getRolActivo:            getRolActivo,
    setRolActivo:            setRolActivo,
    redirigirAPanelDefault:  redirigirAPanelDefault,
    guardPanel:              guardPanel,
    renderSwitcher:          renderSwitcher
  };
})();
