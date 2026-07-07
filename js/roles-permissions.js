/**
 * roles-permissions.js — Click&Clase
 *
 * Sistema de roles múltiples con retro-compatibilidad para roles legacy.
 *
 * Un usuario en Firestore usuarios/{uid} puede tener:
 *   (A) LEGACY: role: 'profesor' (string)
 *   (B) NUEVO:  roles: { profesor: {...}, jefe_curso: { curso: '3M-A' } }
 *
 * Los helpers de este archivo aceptan ambos formatos y devuelven siempre
 * el nuevo formato normalizado.
 *
 * Dependencias globales: EL_ROLES, EL_ROLES_PANEL, EL_ROLES_PRIORIDAD.
 */

(function () {
  'use strict';

  /**
   * Normaliza el campo de roles de un usuario. Devuelve siempre un objeto
   * { <roleId>: { ...datos } }. Retro-compatible con `role: 'string'`.
   *
   * @param {object} user  Documento de usuarios/{uid} (o _currentUser).
   * @returns {object}     { <roleId>: datosRol }
   */
  function normalizarRoles(user) {
    if (!user) return {};
    if (user.roles && typeof user.roles === 'object' && !Array.isArray(user.roles)) {
      return user.roles;
    }
    // Legacy: `role` como string único
    if (user.role && typeof user.role === 'string') {
      var r = {};
      r[user.role] = {};
      return r;
    }
    return {};
  }

  /**
   * ¿El usuario tiene este rol específico?
   * @param {object} user
   * @param {string} roleId  Ej: 'utp', 'profesor', 'admin'
   * @returns {boolean}
   */
  function tieneRol(user, roleId) {
    var roles = normalizarRoles(user);
    return Object.prototype.hasOwnProperty.call(roles, roleId);
  }

  /**
   * ¿El usuario tiene cualquiera de estos roles?
   * @param {object} user
   * @param {string[]} rolesIds
   */
  function tieneAlgunRol(user, rolesIds) {
    if (!Array.isArray(rolesIds)) return false;
    for (var i = 0; i < rolesIds.length; i++) {
      if (tieneRol(user, rolesIds[i])) return true;
    }
    return false;
  }

  /**
   * Lista los roles del usuario como array de IDs, ordenados por prioridad
   * (más importante primero).
   * @param {object} user
   * @returns {string[]}
   */
  function listarRoles(user) {
    var roles = normalizarRoles(user);
    var ids = Object.keys(roles);
    var prioridad = (typeof EL_ROLES_PRIORIDAD !== 'undefined') ? EL_ROLES_PRIORIDAD : [];
    return ids.sort(function (a, b) {
      var ia = prioridad.indexOf(a); if (ia === -1) ia = 999;
      var ib = prioridad.indexOf(b); if (ib === -1) ib = 999;
      return ia - ib;
    });
  }

  /**
   * Rol principal del usuario: el de mayor prioridad de los que tiene.
   * @param {object} user
   * @returns {string|null}
   */
  function rolPrincipal(user) {
    var arr = listarRoles(user);
    return arr.length ? arr[0] : null;
  }

  /**
   * Panel destino según rol principal. Usado por roles-router.js para
   * redirección post-login.
   * @param {object} user
   * @returns {string} URL relativa (ej: 'panel-utp.html')
   */
  function panelDefault(user) {
    var rol = rolPrincipal(user);
    if (!rol) return 'panel-profesor.html';
    var mapa = (typeof EL_ROLES_PANEL !== 'undefined') ? EL_ROLES_PANEL : {};
    return mapa[rol] || 'panel-profesor.html';
  }

  /**
   * ¿Es admin de plataforma? Los admins ven todo, todos los liceos.
   * @param {object} user
   */
  function esAdminPlataforma(user) {
    return tieneRol(user, EL_ROLES.ADMIN);
  }

  /**
   * ¿Es directivo de un colegio? (director, rector, admin_colegio, utp).
   * Estos ven todo dentro de su liceo.
   * @param {object} user
   */
  function esDirectivo(user) {
    return tieneAlgunRol(user, [
      EL_ROLES.DIRECTOR, EL_ROLES.RECTOR,
      EL_ROLES.ADMIN_COLEGIO, EL_ROLES.UTP
    ]);
  }

  /**
   * ¿Puede aprobar planificaciones/pruebas de docentes de su área?
   * @param {object} user
   */
  function puedeAprobarMaterial(user) {
    return tieneAlgunRol(user, [
      EL_ROLES.ADMIN, EL_ROLES.DIRECTOR, EL_ROLES.RECTOR,
      EL_ROLES.UTP, EL_ROLES.ENCARGADO_AREA
    ]);
  }

  /**
   * ¿Es equipo de apoyo psicosocial?
   * @param {object} user
   */
  function esEquipoApoyo(user) {
    return tieneAlgunRol(user, [EL_ROLES.APS_ENCARGADO, EL_ROLES.APS_PROFESIONAL]);
  }

  /**
   * ¿Es equipo de convivencia?
   * @param {object} user
   */
  function esEquipoConvivencia(user) {
    return tieneAlgunRol(user, [EL_ROLES.AMB_ENCARGADO, EL_ROLES.AMB_PROFESIONAL]);
  }

  /**
   * ¿Es equipo PIE?
   * @param {object} user
   */
  function esEquipoPIE(user) {
    return tieneAlgunRol(user, [EL_ROLES.PIE_ENCARGADO, EL_ROLES.PIE_EDUCADORA]);
  }

  /**
   * ¿Puede ver datos sensibles de un estudiante? (Fichas psicosociales,
   * diagnóstico PIE, entrevistas de convivencia).
   * @param {object} user
   */
  function puedeVerDatosSensibles(user) {
    return tieneAlgunRol(user, [
      EL_ROLES.ADMIN, EL_ROLES.DIRECTOR, EL_ROLES.RECTOR,
      EL_ROLES.UTP, EL_ROLES.APS_ENCARGADO, EL_ROLES.APS_PROFESIONAL,
      EL_ROLES.AMB_ENCARGADO, EL_ROLES.AMB_PROFESIONAL,
      EL_ROLES.PIE_ENCARGADO, EL_ROLES.PIE_EDUCADORA
    ]);
  }

  /**
   * Áreas que este usuario supervisa (si es ENCARGADO_AREA).
   * @param {object} user
   * @returns {string[]}
   */
  function areasSupervisa(user) {
    var roles = normalizarRoles(user);
    var datos = roles[EL_ROLES.ENCARGADO_AREA];
    if (!datos || !Array.isArray(datos.areas)) return [];
    return datos.areas;
  }

  /**
   * Cursos donde este usuario es jefe de curso.
   * @param {object} user
   * @returns {string[]}   Array de cursoId
   */
  function cursosJefatura(user) {
    var roles = normalizarRoles(user);
    var datos = roles[EL_ROLES.JEFE_CURSO];
    if (!datos || !Array.isArray(datos.cursos)) return [];
    return datos.cursos;
  }

  /**
   * ¿El usuario A (viewer) puede acceder a los datos del usuario B (target)?
   * Reglas:
   *  - admin plataforma → sí a todos
   *  - directivo del mismo liceo → sí a todos de su liceo
   *  - equipo apoyo/PIE/convivencia mismo liceo → sí (para intervenciones)
   *  - profesor → solo a estudiantes de sus cursos (verificación aparte)
   *  - self → sí
   */
  function puedeVerUsuario(viewer, target) {
    if (!viewer || !target) return false;
    if (viewer.uid && viewer.uid === target.uid) return true;
    if (esAdminPlataforma(viewer)) return true;
    if (viewer.liceoSlug !== target.liceoSlug) return false;
    if (esDirectivo(viewer)) return true;
    if (esEquipoApoyo(viewer) || esEquipoPIE(viewer) || esEquipoConvivencia(viewer)) return true;
    return false;
  }

  /** ── API pública ── */
  window.CCRoles = {
    normalizarRoles:       normalizarRoles,
    tieneRol:              tieneRol,
    tieneAlgunRol:         tieneAlgunRol,
    listarRoles:           listarRoles,
    rolPrincipal:          rolPrincipal,
    panelDefault:          panelDefault,
    esAdminPlataforma:     esAdminPlataforma,
    esDirectivo:           esDirectivo,
    puedeAprobarMaterial:  puedeAprobarMaterial,
    esEquipoApoyo:         esEquipoApoyo,
    esEquipoConvivencia:   esEquipoConvivencia,
    esEquipoPIE:           esEquipoPIE,
    puedeVerDatosSensibles:puedeVerDatosSensibles,
    areasSupervisa:        areasSupervisa,
    cursosJefatura:        cursosJefatura,
    puedeVerUsuario:       puedeVerUsuario
  };
})();
