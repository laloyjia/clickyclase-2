/**
 * firebase-config.js
 * ElectroLearn — Configuración Firebase
 * Proyecto: electrolearn-prod
 */

// ─────────────────────────────────────────────────────────────
//  Configuración del proyecto Firebase
// ─────────────────────────────────────────────────────────────
var FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBnF5NyEVijpds9EnEC5XiiYl31tvJ4Y5M",
  authDomain:        "electrolearn-prod.firebaseapp.com",
  projectId:         "electrolearn-prod",
  storageBucket:     "electrolearn-prod.firebasestorage.app",
  messagingSenderId: "537489844804",
  appId:             "1:537489844804:web:cf468785e90aeed3362a11"
};

// ─────────────────────────────────────────────────────────────
//  Inicialización (Firebase v9 compat — funciona sin bundler)
// ─────────────────────────────────────────────────────────────
(function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('[ElectroLearn] Firebase SDK no cargado.');
    return;
  }
  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
    console.log('[ElectroLearn] Firebase inicializado ✔');
  }
  window.EL_DB   = firebase.firestore();
  window.EL_DB.settings({
    experimentalForceLongPolling: true,
    merge: true
  });
  window.EL_AUTH = firebase.auth();
  window.EL_AUTH.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(function(err) {
      console.warn('[ElectroLearn] Persistencia:', err.message);
    });
})();

// ─────────────────────────────────────────────────────────────
//  Constantes globales de la app
// ─────────────────────────────────────────────────────────────
var EL_VERSION  = '2.0.0';
var EL_APP_NAME = 'ElectroLearn';

// Correos de administrador
var EL_ADMIN_EMAIL  = 'eduyanezjara@gmail.com';
var EL_ADMIN_EMAILS = [
  'eduyanezjara@gmail.com',
  'eyanez@salesianostalca.cl'
];

// Roles disponibles
var EL_ROLES = {
  ADMIN:      'admin',
  PROFESOR:   'profesor',
  ESTUDIANTE: 'estudiante'
};

// Colecciones Firestore
var EL_COLLECTIONS = {
  USERS:           'usuarios',
  MATERIALES:      'materiales',
  PLANIFICACIONES: 'planificaciones',
  EVALUACIONES:    'evaluaciones',
  CODIGOS:         'codigos_acceso',
  CURRICULA:       'curricula',
  RECURSOS:        'recursos_curricula'
};
