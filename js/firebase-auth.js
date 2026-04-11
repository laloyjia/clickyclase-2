/**
 * firebase-auth.js
 * ElectroLearn — Autenticación y gestión de usuarios con Firebase
 *
 * Funciones principales:
 *  - ELAuth.login(email, password)
 *  - ELAuth.logout()
 *  - ELAuth.getCurrentUser()            → Promise<userDoc>
 *  - ELAuth.onUserReady(callback)       → llamado cuando el usuario está listo
 *  - ELAuth.adminCrearProfesor(data)    → solo admin: crea cuenta de profesor
 *  - ELAuth.adminCrearEstudiante(data)  → solo admin: crea cuenta de estudiante
 *  - ELAuth.adminCambiarPassword(uid, newPass)
 *  - ELAuth.requireAuth(allowedRoles)   → redirige si no está autenticado/autorizado
 */

var ELAuth = (function() {
  'use strict';

  // ── Caché del usuario actual en memoria ──────────────────────
  var _currentUser = null;   // objeto Firestore del usuario
  var _firebaseUser = null;  // objeto Firebase Auth
  var _readyCallbacks = [];
  var _authReady = false;

  // ── Escuchar cambios de autenticación ───────────────────────
  function _initAuthListener() {
    if (!window.EL_AUTH) {
      console.error('[ELAuth] EL_AUTH no disponible. ¿Se cargó firebase-config.js?');
      return;
    }

    EL_AUTH.onAuthStateChanged(function(fbUser) {
      if (fbUser) {
        _firebaseUser = fbUser;
        // Cargar datos del usuario desde Firestore
        EL_DB.collection(EL_COLLECTIONS.USERS).doc(fbUser.uid)
          .get()
          .then(function(doc) {
            if (doc.exists) {
              _currentUser = Object.assign({ uid: fbUser.uid, email: fbUser.email }, doc.data());
            } else {
              // Usuario en Auth pero no en Firestore → crear documento básico
              _currentUser = {
                uid: fbUser.uid,
                email: fbUser.email,
                nombre: fbUser.displayName || fbUser.email.split('@')[0],
                role: EL_ROLES.ESTUDIANTE,
                xp: 0,
                nivel: 1,
                badges: [],
                evaluaciones: [],
                creadoEn: new Date().toISOString()
              };
              EL_DB.collection(EL_COLLECTIONS.USERS).doc(fbUser.uid).set(_currentUser);
            }
            _authReady = true;
            _readyCallbacks.forEach(function(cb) { cb(_currentUser); });
            _readyCallbacks = [];
          })
          .catch(function(err) {
            console.error('[ELAuth] Error cargando perfil:', err);
            _currentUser = null;
            _authReady = true;
            _readyCallbacks.forEach(function(cb) { cb(null); });
            _readyCallbacks = [];
          });
      } else {
        _firebaseUser = null;
        _currentUser = null;
        _authReady = true;
        _readyCallbacks.forEach(function(cb) { cb(null); });
        _readyCallbacks = [];
      }
    });
  }

  // ── Login ────────────────────────────────────────────────────
  function login(email, password) {
    return EL_AUTH.signInWithEmailAndPassword(email, password)
      .then(function(cred) {
        return EL_DB.collection(EL_COLLECTIONS.USERS).doc(cred.user.uid).get();
      })
      .then(function(doc) {
        if (doc.exists) {
          _currentUser = Object.assign({ uid: _firebaseUser ? _firebaseUser.uid : '' }, doc.data());
        }
        return _currentUser;
      });
  }

  // ── Logout ───────────────────────────────────────────────────
  function logout() {
    _currentUser = null;
    _firebaseUser = null;
    return EL_AUTH.signOut().then(function() {
      window.location.href = 'index.html';
    });
  }

  // ── Obtener usuario actual (Promise) ─────────────────────────
  function getCurrentUser() {
    if (_authReady) return Promise.resolve(_currentUser);
    return new Promise(function(resolve) {
      _readyCallbacks.push(resolve);
    });
  }

  // ── Callback cuando el usuario esté listo ───────────────────
  function onUserReady(callback) {
    if (_authReady) {
      callback(_currentUser);
    } else {
      _readyCallbacks.push(callback);
    }
  }

  // ── Verificar autenticación y rol ───────────────────────────
  /**
   * @param {string[]} allowedRoles - ej: ['admin','profesor']
   * @param {string} redirectTo - página de destino si no autorizado
   */
  function requireAuth(allowedRoles, redirectTo) {
    redirectTo = redirectTo || 'index.html';
    onUserReady(function(user) {
      if (!user) {
        window.location.href = redirectTo;
        return;
      }
      if (allowedRoles && allowedRoles.length > 0) {
        var allowed = allowedRoles.indexOf(user.role) !== -1
          || user.email === EL_ADMIN_EMAIL;
        if (!allowed) {
          alert('No tienes permisos para acceder a esta sección.');
          window.location.href = 'dashboard.html';
        }
      }
    });
  }

  // ── Crear usuario (solo admin, vía REST Identity Toolkit) ────
  /**
   * Firebase Admin SDK no está disponible en el cliente, pero podemos usar
   * la REST API de Firebase Authentication para crear usuarios.
   *
   * IMPORTANTE: Esto requiere que el proyecto tenga activada la API
   * "Identity Toolkit API" (está activa por defecto en Firebase).
   *
   * @param {object} data { nombre, email, password, role, especialidad, asignaturas, niveles, ... }
   */
  function _crearUsuarioFirebase(data) {
    if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey) {
      return Promise.reject(new Error('FIREBASE_CONFIG no configurado'));
    }

    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FIREBASE_CONFIG.apiKey;

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        displayName: data.nombre,
        returnSecureToken: false
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
      if (result.error) {
        var msg = result.error.message;
        if (msg === 'EMAIL_EXISTS') throw new Error('Ya existe una cuenta con ese correo.');
        if (msg === 'WEAK_PASSWORD : Password should be at least 6 characters') throw new Error('La contraseña debe tener al menos 6 caracteres.');
        throw new Error(msg);
      }

      var uid = result.localId;

      // Crear documento en Firestore
      var perfil = {
        uid:          uid,
        nombre:       data.nombre,
        email:        data.email,
        role:         data.role || EL_ROLES.PROFESOR,
        especialidad: data.especialidad || '',
        asignaturas:  data.asignaturas  || [],
        niveles:      data.niveles      || [],
        modulos:      data.modulos      || [],
        seccion:      data.seccion      || '',
        xp:           0,
        nivel:        1,
        badges:       [],
        evaluaciones: [],
        activo:       true,
        creadoEn:     new Date().toISOString(),
        creadoPor:    _currentUser ? _currentUser.email : 'admin'
      };

      return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid).set(perfil)
        .then(function() { return perfil; });
    });
  }

  function adminCrearProfesor(data) {
    if (!_currentUser || (_currentUser.role !== EL_ROLES.ADMIN && _currentUser.email !== EL_ADMIN_EMAIL)) {
      return Promise.reject(new Error('Solo el administrador puede crear profesores.'));
    }
    data.role = EL_ROLES.PROFESOR;
    return _crearUsuarioFirebase(data);
  }

  function adminCrearEstudiante(data) {
    if (!_currentUser || (_currentUser.role !== EL_ROLES.ADMIN && _currentUser.email !== EL_ADMIN_EMAIL)) {
      return Promise.reject(new Error('Solo el administrador puede crear estudiantes.'));
    }
    data.role = EL_ROLES.ESTUDIANTE;
    return _crearUsuarioFirebase(data);
  }

  // ── Cambiar contraseña de un usuario (via REST) ───────────────
  function adminCambiarPassword(uid, newPassword) {
    if (!_currentUser || (_currentUser.role !== EL_ROLES.ADMIN && _currentUser.email !== EL_ADMIN_EMAIL)) {
      return Promise.reject(new Error('Solo el administrador puede cambiar contraseñas.'));
    }

    // Primero necesitamos el idToken del admin para usar la REST API
    return _firebaseUser.getIdToken(true)
      .then(function(idToken) {
        // Usar la API de actualización de cuenta
        var url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + FIREBASE_CONFIG.apiKey;
        return fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken: idToken,
            // Nota: solo el propio usuario puede cambiar su contraseña vía cliente
            // Para cambio por admin, se necesita Firebase Admin SDK (Cloud Function)
            // Esta función está preparada para cuando se agregue una Cloud Function
            password: newPassword,
            returnSecureToken: true
          })
        })
        .then(function(res) { return res.json(); })
        .then(function(result) {
          if (result.error) throw new Error(result.error.message);
          return result;
        });
      });
  }

  // ── Obtener todos los usuarios (solo admin) ──────────────────
  function adminGetUsuarios(filtros) {
    filtros = filtros || {};
    var query = EL_DB.collection(EL_COLLECTIONS.USERS);

    if (filtros.role) query = query.where('role', '==', filtros.role);
    if (filtros.activo !== undefined) query = query.where('activo', '==', filtros.activo);

    return query.get().then(function(snapshot) {
      var users = [];
      snapshot.forEach(function(doc) {
        users.push(Object.assign({ uid: doc.id }, doc.data()));
      });
      return users;
    });
  }

  // ── Actualizar perfil de usuario ─────────────────────────────
  function updateUserProfile(uid, datos) {
    return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid).update(datos);
  }

  // ── Desactivar usuario ───────────────────────────────────────
  function adminDesactivarUsuario(uid) {
    return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid).update({ activo: false });
  }

  // ── Inicializar ──────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initAuthListener);
  } else {
    // Firebase ya disponible si los scripts CDN cargan síncronamente
    setTimeout(_initAuthListener, 0);
  }

  // ── API pública ──────────────────────────────────────────────
  return {
    login:                 login,
    logout:                logout,
    getCurrentUser:        getCurrentUser,
    onUserReady:           onUserReady,
    requireAuth:           requireAuth,
    adminCrearProfesor:    adminCrearProfesor,
    adminCrearEstudiante:  adminCrearEstudiante,
    adminCambiarPassword:  adminCambiarPassword,
    adminGetUsuarios:      adminGetUsuarios,
    updateUserProfile:     updateUserProfile,
    adminDesactivarUsuario:adminDesactivarUsuario,
    get user() { return _currentUser; }
  };
})();
