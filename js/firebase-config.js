/**
 * firebase-config.js
 * Click&Clase — Configuración Firebase
 * Proyecto: electrolearn-prod
 *
 * IMPORTANTE: EL_DB ya NO usa el SDK de Firestore (que da "client is offline").
 * EL_DB es inicializado en firebase-rest.js via Firestore REST API (HTTPS puro).
 * Este archivo solo inicializa Firebase App + Auth (que sí funcionan).
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
//  Inicialización: Firebase App + Auth solamente
//  (Firestore SDK removido — se usa firebase-rest.js en su lugar)
// ─────────────────────────────────────────────────────────────
(function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('[Click&Clase] Firebase SDK no cargado.');
    return;
  }
  if (!firebase.apps || firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG);
    console.log('[Click&Clase] Firebase inicializado (App + Auth) OK');
  }

  // Solo Auth — NO inicializamos Firestore SDK (da "client is offline")
  window.EL_AUTH = firebase.auth();
  window.EL_AUTH.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(function (err) {
      console.warn('[Click&Clase] Persistencia Auth:', err.message);
    });

  // EL_DB lo inicializa firebase-rest.js (debe cargarse después de este script)
  // _init() se llama al final de este archivo una vez que EL_DB esté disponible
})();

// ─────────────────────────────────────────────────────────────
//  Constantes globales de la app
// ─────────────────────────────────────────────────────────────
var EL_VERSION  = '2.1.0';
var EL_APP_NAME = 'Click&Clase';

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
  RECURSOS:        'recursos_curricula',
  LICEOS:          'liceos',
  ACTIVIDAD:       'actividad'  // Audit log: 1 doc por evento del usuario
};

// ─────────────────────────────────────────────────────────────
//  Activar el cliente REST de Firestore
//  (EL_DB se declara en firebase-rest.js, que debe cargarse ANTES)
//  Si por algún motivo ya está declarado, solo llamamos _init()
// ─────────────────────────────────────────────────────────────
(function activarRestDB() {
  if (typeof EL_DB !== 'undefined' && typeof EL_DB._init === 'function') {
    EL_DB._init(FIREBASE_CONFIG.projectId);
    console.log('[Click&Clase] EL_DB REST activado para proyecto:', FIREBASE_CONFIG.projectId);
  } else {
    // EL_DB aún no está cargado (orden de scripts incorrecto)
    // Programamos la activación para cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function () {
      if (typeof EL_DB !== 'undefined' && typeof EL_DB._init === 'function') {
        EL_DB._init(FIREBASE_CONFIG.projectId);
        console.log('[Click&Clase] EL_DB REST activado (deferred)');
      } else {
        console.error('[Click&Clase] EL_DB no disponible — ¿se cargó firebase-rest.js?');
      }
    });
  }
})();
