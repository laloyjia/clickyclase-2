/**
 * firebase-config.js
 * ElectroLearn — Configuración Firebase
 * Proyecto: planificatuclase
 *
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Ve a https://console.firebase.google.com
 * 2. Selecciona tu proyecto "planificatuclase"
 * 3. Haz clic en el ícono </> (Web app)
 * 4. Copia los valores de firebaseConfig y pégalos abajo
 */

// ─────────────────────────────────────────────────────────────
//  Reemplaza estos valores con los de tu proyecto Firebase
// ─────────────────────────────────────────────────────────────
var FIREBASE_CONFIG = {
  apiKey:            "AIzaSyA7OLQZAGLkfK40Tus_kwOaz5V6cC22Plo",
  authDomain:        "planificatuclase-c593c.firebaseapp.com",
  projectId:         "planificatuclase-c593c",
  storageBucket:     "planificatuclase-c593c.firebasestorage.app",
  messagingSenderId: "732658045220",
  appId:             "1:732658045220:web:569d5f0895845abcf723b1"
};

// ─────────────────────────────────────────────────────────────
//  Inicialización (Firebase v9 compat — funciona sin bundler)
// ─────────────────────────────────────────────────────────────
(function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('[ElectroLearn] Firebase SDK no cargado. Verifica que los scripts CDN estén antes de firebase-config.js');
    return;
  }

  // Evitar doble inicialización (al navegar entre páginas)
  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
    console.log('[ElectroLearn] Firebase inicializado ✔');
  }

  // Exponer referencias globales
  window.EL_DB   = firebase.firestore();
  window.EL_AUTH = firebase.auth();

  // Persistencia de sesión: LOCAL = persiste al cerrar el navegador
  window.EL_AUTH.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(function(err) {
      console.warn('[ElectroLearn] No se pudo configurar persistencia:', err.message);
    });

  // Habilitar caché offline de Firestore
  window.EL_DB.enablePersistence({ synchronizeTabs: true })
    .catch(function(err) {
      if (err.code === 'failed-precondition') {
        console.warn('[ElectroLearn] Persistencia offline no disponible (múltiples pestañas)');
      } else if (err.code === 'unimplemented') {
        console.warn('[ElectroLearn] Persistencia offline no soportada por este navegador');
      }
    });
})();

// ─────────────────────────────────────────────────────────────
//  Constantes globales de la app
// ─────────────────────────────────────────────────────────────
var EL_VERSION   = '2.0.0';
var EL_APP_NAME  = 'ElectroLearn';
var EL_ADMIN_EMAIL = 'profesor@electrolearn.cl';

// Roles disponibles
var EL_ROLES = {
  ADMIN:      'admin',
  PROFESOR:   'profesor',
  ESTUDIANTE: 'estudiante'
};

// Colecciones Firestore
var EL_COLLECTIONS = {
  USERS:          'usuarios',
  MATERIALES:     'materiales',
  PLANIFICACIONES:'planificaciones',
  EVALUACIONES:   'evaluaciones',
  CODIGOS:        'codigos_acceso',
  CURRICULA:      'curricula'
};
