/**
 * firebase-auth.js
 * Click&Clase — Autenticación y gestión de usuarios con Firebase
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

  // Reintentar fetch de Firestore cuando el cliente está offline (timing issue)
  function _fetchUserDocConReintentos(uid, intentos) {
    intentos = intentos || 0;
    return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid).get()
      .catch(function(err) {
        var esOffline = err.message && (err.message.indexOf('offline') !== -1 || err.code === 'unavailable');
        if (esOffline && intentos < 6) {
          console.log('[ELAuth] Firestore offline, reintentando en 2s... (' + (intentos+1) + '/6)');
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              _fetchUserDocConReintentos(uid, intentos + 1).then(resolve).catch(reject);
            }, 2000);
          });
        }
        throw err;
      });
  }

    EL_AUTH.onAuthStateChanged(function(fbUser) {
      if (fbUser) {
        _firebaseUser = fbUser;
        // Cargar datos del usuario desde Firestore (con reintentos si está offline)
        _fetchUserDocConReintentos(fbUser.uid)
          .then(function(doc) {
            if (doc.exists) {
              _currentUser = Object.assign({}, doc.data(), { uid: fbUser.uid, email: fbUser.email });
              // Guardar rol en localStorage como caché de respaldo para modo offline
              try { localStorage.setItem('el_user_role_' + fbUser.uid, _currentUser.role || EL_ROLES.ESTUDIANTE); } catch(e) {}
            } else {
              // Usuario en Auth pero no en Firestore → crear documento básico
              var adminEmailsList = window.EL_ADMIN_EMAILS || [window.EL_ADMIN_EMAIL];
              var esAdminEmail = adminEmailsList.indexOf(fbUser.email) !== -1;
              // Recuperar rol desde localStorage si fue guardado en sesión anterior
              var _rolCacheNew = null;
              try {
                var _cached = localStorage.getItem('el_user_role_' + fbUser.uid);
                if (_cached && _cached !== EL_ROLES.ESTUDIANTE) _rolCacheNew = _cached;
              } catch(e) {}
              var _rolInicial = esAdminEmail ? EL_ROLES.ADMIN : (_rolCacheNew || EL_ROLES.ESTUDIANTE);
              _currentUser = {
                uid: fbUser.uid,
                email: fbUser.email,
                nombre: fbUser.displayName || fbUser.email.split('@')[0],
                role: _rolInicial,
                xp: 0,
                nivel: 1,
                badges: [],
                evaluaciones: [],
                activo: true,
                creadoEn: new Date().toISOString()
              };
              EL_DB.collection(EL_COLLECTIONS.USERS).doc(fbUser.uid).set(_currentUser)
                .then(function() {
                  console.log('[ELAuth] ✅ Documento creado automáticamente para:', fbUser.email, '| rol:', _currentUser.role);
                })
                .catch(function(err) {
                  console.warn('[ELAuth] No se pudo guardar perfil en Firestore:', err.message);
                });
            }
            _authReady = true;
            _readyCallbacks.forEach(function(cb) { cb(_currentUser); });
            _readyCallbacks = [];
          })
          .catch(function(err) {
            console.warn('[ELAuth] Firestore no disponible:', err.message);
            // IMPORTANTE: Si _currentUser ya existe (sesión activa), NO degradar el rol.
            // Solo asignar perfil básico si no hay ninguna sesión previa.
            if (_currentUser && _currentUser.uid === fbUser.uid) {
              // Ya tenemos datos del usuario — Firestore falló pero la sesión está intacta.
              console.log('[ELAuth] Manteniendo sesión existente para:', fbUser.email, '| rol:', _currentUser.role);
              _authReady = true;
              _readyCallbacks.forEach(function(cb) { cb(_currentUser); });
              _readyCallbacks = [];
              return;
            }
            var adminEmails = window.EL_ADMIN_EMAILS || [EL_ADMIN_EMAIL];
            var esAdmin = adminEmails.indexOf(fbUser.email) !== -1;
            // Intentar recuperar rol desde localStorage como respaldo adicional
            var rolCache = null;
            try {
              var cached = localStorage.getItem('el_user_role_' + fbUser.uid);
              if (cached) rolCache = cached;
            } catch(e) {}
            _currentUser = {
              uid:    fbUser.uid,
              email:  fbUser.email,
              nombre: fbUser.displayName || fbUser.email.split('@')[0],
              role:   esAdmin ? EL_ROLES.ADMIN : (rolCache || EL_ROLES.ESTUDIANTE),
              xp: 0, nivel: 1, badges: [], evaluaciones: [],
              _offlineMode: true
            };
            _authReady = true;
            _readyCallbacks.forEach(function(cb) { cb(_currentUser); });
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
        _firebaseUser = cred.user;
        // Intentar cargar perfil Firestore, pero no fallar si no está disponible
        return EL_DB.collection(EL_COLLECTIONS.USERS).doc(cred.user.uid).get()
          .catch(function() { return null; }); // Firestore offline → continuar igual
      })
      .then(function(doc) {
        if (doc && doc.exists) {
          _currentUser = Object.assign({}, doc.data(), { uid: _firebaseUser.uid, email: _firebaseUser.email });
        } else if (doc && !doc.exists) {
          // Doc no existe → crear con rol correcto
          var adminEmailsLogin = window.EL_ADMIN_EMAILS || [window.EL_ADMIN_EMAIL];
          var esAdminLogin = adminEmailsLogin.indexOf(_firebaseUser.email) !== -1;
          _currentUser = {
            uid: _firebaseUser.uid, email: _firebaseUser.email,
            nombre: _firebaseUser.displayName || _firebaseUser.email.split('@')[0],
            role: esAdminLogin ? EL_ROLES.ADMIN : EL_ROLES.ESTUDIANTE,
            xp: 0, nivel: 1, badges: [], evaluaciones: [], activo: true,
            creadoEn: new Date().toISOString()
          };
          EL_DB.collection(EL_COLLECTIONS.USERS).doc(_firebaseUser.uid).set(_currentUser)
            .catch(function(err) { console.warn('[ELAuth] No se pudo crear perfil:', err.message); });
        } else if (!_currentUser) {
          // Perfil de respaldo si Firestore no responde
          var adminEmails = window.EL_ADMIN_EMAILS || [window.EL_ADMIN_EMAIL];
          var esAdmin = adminEmails.indexOf(_firebaseUser.email) !== -1;
          _currentUser = {
            uid: _firebaseUser.uid, email: _firebaseUser.email,
            nombre: _firebaseUser.email.split('@')[0],
            role: esAdmin ? EL_ROLES.ADMIN : EL_ROLES.ESTUDIANTE,
            xp: 0, nivel: 1, badges: [], evaluaciones: [], _offlineMode: true
          };
        }
        // Audit log fire-and-forget
        try { if (typeof ELDB !== 'undefined' && ELDB.actividad) ELDB.actividad.log('login', { rol: _currentUser && _currentUser.role }); } catch (e) {}
        return _currentUser;
      })
      .catch(function(err) {
        // Log de intento fallido (sin contraseña, solo email)
        try {
          if (typeof EL_DB !== 'undefined' && EL_DB.collection) {
            EL_DB.collection(EL_COLLECTIONS.ACTIVIDAD).add({
              uid: '', userEmail: email || '', userNombre: '',
              tipo: 'login_fallido', tipoLabel: 'Intento de login fallido',
              meta: { errorCode: err && err.code, errorMsg: err && err.message },
              ts: new Date().toISOString(), tsNum: Date.now()
            }).then(function () {
              // Tras registrar el fallo, chequear racha de brute-force.
              try {
                if (typeof ELDB !== 'undefined' && ELDB.actividad && ELDB.actividad.chequeoBruteForce) {
                  ELDB.actividad.chequeoBruteForce(email, { umbral: 10, ventanaMin: 15 });
                }
              } catch (e2) {}
            }).catch(function(){});
          }
        } catch (e) {}
        throw err;
      });
  }

  // ── Logout ───────────────────────────────────────────────────
  function logout() {
    // Audit log antes de limpiar la sesión
    try { if (typeof ELDB !== 'undefined' && ELDB.actividad) ELDB.actividad.log('logout', {}); } catch (e) {}
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
        var adminEmails = window.EL_ADMIN_EMAILS || [EL_ADMIN_EMAIL];
        var allowed = allowedRoles.indexOf(user.role) !== -1
          || adminEmails.indexOf(user.email) !== -1;
        if (!allowed) {
          // Redirigir según rol: profesores/admins van a su dashboard, estudiantes al suyo
          var esProfeOAdmin = user.role === 'profesor' || user.role === 'admin'
            || adminEmails.indexOf(user.email) !== -1;
          window.location.href = esProfeOAdmin ? 'dashboard-profesor.html' : 'dashboard.html';
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
        returnSecureToken: true
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
      if (result.error) {
        var msg = result.error.message;
        if (msg === 'EMAIL_EXISTS') throw new Error('Ya existe una cuenta con ese correo.');
        if (msg.includes('WEAK_PASSWORD')) throw new Error('La contraseña debe tener al menos 6 caracteres.');
        throw new Error(msg);
      }

      var uid = result.localId;
      if (!uid) throw new Error('No se obtuvo UID del usuario creado.');

      // Crear documento en Firestore (como admin autenticado)
      // Normalizar tipos: si vino `tiposProfesor` (array) lo usamos; si no, derivamos de `tipoProfesor`.
      var _tipos = Array.isArray(data.tiposProfesor) && data.tiposProfesor.length
                   ? data.tiposProfesor.slice()
                   : (data.tipoProfesor ? [data.tipoProfesor] : []);
      var perfil = {
        uid:             uid,
        nombre:          data.nombre,
        email:           data.email,
        role:            data.role || EL_ROLES.PROFESOR,
        tipoProfesor:    data.tipoProfesor || (_tipos[0] || ''),  // legacy string (primer tipo)
        tiposProfesor:   _tipos,                                  // nuevo array multi-tipo
        especialidad:    data.especialidad || '',
        asignaturas:     data.asignaturas  || [],
        niveles:         data.niveles      || [],
        modulos:         data.modulos      || [],
        seccion:         data.seccion      || '',
        cursos:          data.cursos       || [],
        liceos:          Array.isArray(data.liceos) ? data.liceos : [],
        liceoPrincipal:  data.liceoPrincipal || (Array.isArray(data.liceos) && data.liceos.length ? data.liceos[0] : ''),
        permisos:        data.permisos     || { planificar: true, crearMaterial: true },
        formatoPAES:     !!data.formatoPAES,        // habilita formato PAES en pruebas/eval/guías
        taxonomiaMarzano:!!data.taxonomiaMarzano,   // habilita taxonomía Marzano (además de Bloom)
        xp:              0,
        nivel:           1,
        badges:          [],
        evaluaciones:    [],
        activo:          true,
        primerIngreso:   true,           // obliga cambio de contraseña al primer ingreso
        creadoEn:        new Date().toISOString(),
        creadoPor:       _currentUser ? _currentUser.email : 'admin'
      };

      console.log('[ELAuth] Creando doc Firestore para uid:', uid);
      return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid).set(perfil)
        .then(function() {
          console.log('[ELAuth] ✅ Perfil creado en Firestore:', perfil.email);
          return perfil;
        })
        .catch(function(err) {
          console.error('[ELAuth] ❌ Error escribiendo Firestore:', err.code, err.message);
          throw new Error('Usuario creado en Auth pero falló Firestore: ' + err.message + '. Verifica las Reglas de Firestore.');
        });
    });
  }

  function adminCrearProfesor(data) {
    if (!_currentUser || (_currentUser.role !== EL_ROLES.ADMIN && !(window.EL_ADMIN_EMAILS||[EL_ADMIN_EMAIL]).includes(_currentUser.email))) {
      return Promise.reject(new Error('Solo el administrador puede crear profesores.'));
    }
    data.role = EL_ROLES.PROFESOR;
    return _crearUsuarioFirebase(data);
  }

  function adminCrearEstudiante(data) {
    if (!_currentUser || (_currentUser.role !== EL_ROLES.ADMIN && !(window.EL_ADMIN_EMAILS||[EL_ADMIN_EMAIL]).includes(_currentUser.email))) {
      return Promise.reject(new Error('Solo el administrador puede crear estudiantes.'));
    }
    data.role = EL_ROLES.ESTUDIANTE;
    return _crearUsuarioFirebase(data);
  }

  // ── Cambiar contraseña de un usuario (via REST) ───────────────
  function adminCambiarPassword(uid, newPassword) {
    if (!_currentUser || (_currentUser.role !== EL_ROLES.ADMIN && !(window.EL_ADMIN_EMAILS||[EL_ADMIN_EMAIL]).includes(_currentUser.email))) {
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
