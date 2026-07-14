/**
 * personal.js — Click&Clase Fase 8
 *
 * Gestión del personal de UN colegio. Uso por el admin_colegio (rector/
 * director) desde panel-admin-colegio.html. Todas las operaciones son
 * ancladas a su liceoSlug — el rector NO puede tocar personal de otros
 * colegios (enforcement en rules Firestore + guardas en cliente).
 *
 * API pública:
 *   CCPersonal.ROLES_ASIGNABLES         Lista de roles que el rector puede asignar
 *   CCPersonal.ROLES_ADMIN              Roles administrativos (director, rector...)
 *   CCPersonal.listarMiembros(slug)     Todos los usuarios del liceo
 *   CCPersonal.contarMiembros(slug)     { total, activos, porRol: {...} }
 *   CCPersonal.crearMiembro(slug, datos, opts)  Crea Auth + Firestore
 *   CCPersonal.actualizarMiembro(uid, cambios)
 *   CCPersonal.desactivar(uid)
 *   CCPersonal.reactivar(uid)
 *   CCPersonal.resetearPassword(uid)    Genera nueva password temporal
 *   CCPersonal.generarPassword()
 */

(function () {
  'use strict';

  var COL_USERS = 'usuarios';

  // ── Catálogo de roles que un admin_colegio puede asignar ──
  // (Excluye 'admin' de plataforma; solo Eduardo desde SuperAdmin)
  var ROLES_ASIGNABLES = [
    { id: 'director',       label: 'Director/a',                     ico: '🎓', grupo: 'directivo' },
    { id: 'rector',         label: 'Rector/a',                       ico: '✝',  grupo: 'directivo' },
    { id: 'utp',            label: 'Jefe/a UTP',                     ico: '📋', grupo: 'directivo' },
    { id: 'encargado_area', label: 'Encargado/a de área',            ico: '🎯', grupo: 'directivo' },
    { id: 'profesor',       label: 'Profesor/a de asignatura',       ico: '👨‍🏫', grupo: 'aula' },
    { id: 'jefe_curso',     label: 'Profesor/a jefe',                ico: '📚', grupo: 'aula' },
    { id: 'pie_enc',        label: 'Coordinador/a PIE',              ico: '♿', grupo: 'pie' },
    { id: 'pie_edu',        label: 'Educador/a diferencial',         ico: '♿', grupo: 'pie' },
    { id: 'aps_enc',        label: 'Encargado/a Apoyo Psicosocial',  ico: '💙', grupo: 'apoyo' },
    { id: 'aps_prof',       label: 'Profesional Apoyo (psic/TS)',    ico: '💙', grupo: 'apoyo' },
    { id: 'amb_enc',        label: 'Encargado/a Convivencia',        ico: '🤝', grupo: 'convivencia' },
    { id: 'amb_prof',       label: 'Profesional Convivencia',        ico: '🤝', grupo: 'convivencia' }
  ];
  var ROLES_ADMIN = ['director', 'rector', 'admin_colegio'];

  // ── Firebase secondary app para crear usuarios sin cerrar sesión ──
  var _secondaryApp = null;
  function _getSecondaryAuth() {
    if (typeof firebase === 'undefined') throw new Error('Firebase SDK no cargado');
    if (!_secondaryApp) {
      var existing = firebase.apps.filter(function (a) { return a.name === '_ccSecondary'; });
      _secondaryApp = existing.length ? existing[0]
                      : firebase.initializeApp(FIREBASE_CONFIG, '_ccSecondary');
    }
    return _secondaryApp.auth();
  }

  function generarPassword() {
    var mayus = 'ABCDEFGHJKMNPQRSTUVWXYZ';
    var minus = 'abcdefghijkmnpqrstuvwxyz';
    var digs  = '23456789';
    var esp   = '!@#$%';
    var pool  = mayus + minus + digs + esp;
    var pw = mayus[Math.floor(Math.random() * mayus.length)] +
             digs[Math.floor(Math.random() * digs.length)] +
             esp[Math.floor(Math.random() * esp.length)];
    for (var i = 3; i < 12; i++) pw += pool[Math.floor(Math.random() * pool.length)];
    return pw.split('').sort(function () { return 0.5 - Math.random(); }).join('');
  }

  // ── Listar miembros del liceo ──
  function listarMiembros(liceoSlug) {
    if (!liceoSlug) return Promise.reject(new Error('liceoSlug requerido'));
    return EL_DB.collection(COL_USERS).where('liceoSlug', '==', liceoSlug).get()
      .then(function (snap) {
        var arr = [];
        snap.forEach(function (doc) {
          arr.push(Object.assign({}, doc.data(), { id: doc.id, uid: doc.id }));
        });
        arr.sort(function (a, b) {
          return (a.nombre || a.email || '').localeCompare(b.nombre || b.email || '');
        });
        return arr;
      });
  }

  // ── Contar miembros con desglose por rol ──
  function contarMiembros(liceoSlug) {
    return listarMiembros(liceoSlug).then(function (arr) {
      var res = { total: arr.length, activos: 0, inactivos: 0, porRol: {} };
      ROLES_ASIGNABLES.forEach(function (r) { res.porRol[r.id] = 0; });
      arr.forEach(function (u) {
        if (u.activo === false) res.inactivos++;
        else res.activos++;
        var roles = _rolesDe(u);
        roles.forEach(function (rid) {
          if (res.porRol[rid] === undefined) res.porRol[rid] = 0;
          res.porRol[rid]++;
        });
      });
      return res;
    });
  }

  function _rolesDe(u) {
    if (!u) return [];
    if (u.roles && typeof u.roles === 'object' && !Array.isArray(u.roles)) {
      return Object.keys(u.roles);
    }
    if (u.role && typeof u.role === 'string') return [u.role];
    return [];
  }

  // ── Crear miembro nuevo ──
  //
  //   datos = { nombre, email, telefono, rut, roles: [ids], cargo }
  //   opts  = { limiteUsuarios: 100, actual: 45 }  // para enforcement
  //
  //   Retorna: { uid, email, password }  (password temporal generada)
  function crearMiembro(liceoSlug, datos, opts) {
    if (!liceoSlug) return Promise.reject(new Error('liceoSlug requerido'));
    if (!datos || !datos.email || !datos.nombre) {
      return Promise.reject(new Error('nombre y email son obligatorios'));
    }
    if (!Array.isArray(datos.roles) || datos.roles.length === 0) {
      return Promise.reject(new Error('Elegí al menos un rol'));
    }

    // Enforcement de límite (soft, el rules también lo debería validar server-side)
    opts = opts || {};
    if (opts.limiteUsuarios && opts.actual >= opts.limiteUsuarios) {
      return Promise.reject(new Error(
        'Límite alcanzado: ' + opts.actual + '/' + opts.limiteUsuarios +
        ' asientos usados. Contactá a soporte para ampliar tu plan.'
      ));
    }

    // Password: si viene 'password' en datos, usar esa; si viene 'usarRutComoPass' y hay RUT,
    // limpiar el RUT (sin puntos ni guiones) y usarlo; si no, generar aleatoria.
    var passwordTemp;
    if (datos.password && datos.password.length >= 6) {
      passwordTemp = datos.password;
    } else if (datos.usarRutComoPass && datos.rut) {
      passwordTemp = String(datos.rut).replace(/[.\-\s]/g, '');
      if (passwordTemp.length < 6) passwordTemp = passwordTemp + '2026';
    } else {
      passwordTemp = generarPassword();
    }
    var newUid = null;

    // 1) Crear Auth con app secundaria (no cierra sesión del rector)
    var secondaryAuth = _getSecondaryAuth();
    return secondaryAuth.createUserWithEmailAndPassword(datos.email, passwordTemp)
      .then(function (cred) {
        newUid = cred.user.uid;
        return secondaryAuth.signOut();
      })
      .then(function () {
        // 2) Construir mapa de roles
        var rolesMap = {};
        datos.roles.forEach(function (rid) { rolesMap[rid] = {}; });
        // Rol legacy (para retrocompat): el primer rol de la lista
        var rolLegacy = datos.roles[0];

        // 3) Crear doc Firestore
        var asigsArr = Array.isArray(datos.asignaturas) ? datos.asignaturas
                       : (datos.asignatura ? [datos.asignatura] : []);
        var espsArr  = Array.isArray(datos.especialidades) ? datos.especialidades
                       : (datos.especialidad ? [datos.especialidad] : []);
        var userDoc = {
          uid:            newUid,
          email:          datos.email,
          nombre:         datos.nombre,
          telefono:       datos.telefono || '',
          rut:            datos.rut || '',
          role:           rolLegacy,           // legacy string
          roles:          rolesMap,             // formato nuevo
          liceoSlug:      liceoSlug,
          cargo:          datos.cargo || '',       // opcional (legacy)
          asignaturas:    asigsArr,                 // ARRAY nuevo
          especialidades: espsArr,                  // ARRAY nuevo
          asignatura:     asigsArr[0] || '',        // primer valor (retrocompat)
          especialidad:   espsArr[0] || '',         // primer valor (retrocompat)
          activo:         true,
          primerIngreso:  true,
          creadoEn:       new Date().toISOString(),
          creadoPor:      (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : '',
          xp: 0, nivel: 1, badges: [], evaluaciones: []
        };
        return EL_DB.collection(COL_USERS).doc(newUid).set(userDoc)
          .then(function () {
            return { uid: newUid, email: datos.email, password: passwordTemp };
          });
      });
  }

  // ── Actualizar miembro (nombre, roles, cargo, teléfono) ──
  //   NO cambia email ni password ni liceoSlug (para eso hay funciones aparte)
  function actualizarMiembro(uid, cambios) {
    if (!uid) return Promise.reject(new Error('uid requerido'));

    var permitidos = ['nombre', 'telefono', 'rut', 'cargo', 'activo'];
    var update = {};
    permitidos.forEach(function (k) {
      if (cambios[k] !== undefined) update[k] = cambios[k];
    });

    // Asignaturas como array
    if (Array.isArray(cambios.asignaturas)) {
      update.asignaturas = cambios.asignaturas;
      update.asignatura  = cambios.asignaturas[0] || '';
    } else if (cambios.asignatura !== undefined) {
      update.asignaturas = cambios.asignatura ? [cambios.asignatura] : [];
      update.asignatura  = cambios.asignatura || '';
    }

    // Especialidades como array
    if (Array.isArray(cambios.especialidades)) {
      update.especialidades = cambios.especialidades;
      update.especialidad   = cambios.especialidades[0] || '';
    } else if (cambios.especialidad !== undefined) {
      update.especialidades = cambios.especialidad ? [cambios.especialidad] : [];
      update.especialidad   = cambios.especialidad || '';
    }

    // Roles: si se pasa array, reconstruimos el map
    if (Array.isArray(cambios.roles)) {
      var rolesMap = {};
      cambios.roles.forEach(function (rid) { rolesMap[rid] = {}; });
      update.roles = rolesMap;
      update.role = cambios.roles[0];   // legacy
    }

    update.actualizadoEn = new Date().toISOString();

    return EL_DB.collection(COL_USERS).doc(uid).update(update);
  }

  // ── Desactivar / reactivar ──
  function desactivar(uid) {
    return actualizarMiembro(uid, { activo: false });
  }
  function reactivar(uid) {
    return actualizarMiembro(uid, { activo: true });
  }

  // ── Resetear password (requiere admin SDK server-side normalmente).
  //     En cliente solo generamos una password nueva y marcamos primerIngreso,
  //     el usuario cambia la clave real desde Firebase Auth con "olvidaste
  //     contraseña". Alternativa: reautenticar como admin y updatePassword,
  //     pero eso requiere Cloud Function. Por ahora devolvemos password
  //     GENERADA que hay que setear manualmente en Firebase Auth Console.
  //     TODO en Fase 8.4: Cloud Function que resetea la password real.
  function resetearPassword(uid) {
    var pw = generarPassword();
    return EL_DB.collection(COL_USERS).doc(uid).update({
      primerIngreso: true,
      passwordResetSolicitadoEn: new Date().toISOString()
    }).then(function () {
      return { uid: uid, passwordSugerida: pw, requiereManual: true };
    });
  }

  // ── API pública ──
  window.CCPersonal = {
    ROLES_ASIGNABLES:  ROLES_ASIGNABLES,
    ROLES_ADMIN:       ROLES_ADMIN,
    generarPassword:   generarPassword,
    listarMiembros:    listarMiembros,
    contarMiembros:    contarMiembros,
    crearMiembro:      crearMiembro,
    actualizarMiembro: actualizarMiembro,
    desactivar:        desactivar,
    reactivar:         reactivar,
    resetearPassword:  resetearPassword
  };
})();
