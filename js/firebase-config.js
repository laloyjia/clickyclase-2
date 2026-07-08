/**
 * firebase-config.js
 * Click&Clase — Configuración Firebase
 * Proyecto: electrolearn-prod  (entorno de producción, dominio clickyclase.cl)
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
  appId:             "1:537489844804:web:cf468785e90aeed3362a11",
  measurementId:     "G-00639SFZBC"
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

// ─────────────────────────────────────────────────────────────
//  ENDPOINT IA — ahora vive como Firebase Cloud Function bajo
//  el mismo dominio (clickyclase.cl), con rewrite configurado en
//  firebase.json: /api/ia-asistente → iaAsistente function.
//
//  Como todo va al mismo dominio, ya no hace falta URL absoluta.
// ─────────────────────────────────────────────────────────────
window.IA_ENDPOINT = '/api/ia-asistente';

// Correos de administrador
var EL_ADMIN_EMAIL  = 'eduyanezjara@gmail.com';
var EL_ADMIN_EMAILS = [
  'eduyanezjara@gmail.com',
  'eyanez@salesianostalca.cl'
];

// ─────────────────────────────────────────────────────────────
//  Roles del sistema Click&Clase
//
//  Cada usuario en usuarios/{uid} tiene:
//   - roles: { <roleId>: { ...datos específicos } }
//   - liceoSlug: 'salesianos-talca' (multi-tenant)
//
//  Retrocompatibilidad: si el doc tiene `role: 'admin'` (string legacy),
//  se lo interpreta como { roles: { admin: {} } }. Ver firebase-auth.js.
// ─────────────────────────────────────────────────────────────
var EL_ROLES = {
  // Rol de plataforma (nivel Click&Clase, no de un colegio específico)
  ADMIN:            'admin',

  // Roles institucionales (nivel colegio/liceo completo)
  DIRECTOR:         'director',
  RECTOR:           'rector',
  ADMIN_COLEGIO:    'admin_colegio',
  UTP:              'utp',
  ENCARGADO_AREA:   'encargado_area',

  // Roles de aula
  PROFESOR:         'profesor',
  JEFE_CURSO:       'jefe_curso',

  // Roles de convivencia y apoyo
  AMB_ENCARGADO:    'amb_enc',
  AMB_PROFESIONAL:  'amb_prof',
  APS_ENCARGADO:    'aps_enc',
  APS_PROFESIONAL:  'aps_prof',

  // Roles PIE
  PIE_ENCARGADO:    'pie_enc',
  PIE_EDUCADORA:    'pie_edu',

  // Rol externo (Fase futura)
  ESTUDIANTE:       'estudiante',
  APODERADO:        'apoderado'
};

// Áreas dentro de un colegio (para ENCARGADO_AREA)
var EL_AREAS = {
  PRE_KINDER:      'pre_kinder',
  PRIMER_CICLO:    'primer_ciclo',    // 1° a 4° básico
  SEGUNDO_CICLO:   'segundo_ciclo',   // 5° a 8° básico
  MEDIA_HC:        'media_hc',        // 1°-4° medio HC
  MEDIA_TP:        'media_tp',        // 1°-4° medio TP
  ESPECIALIDAD_TP: 'especialidad_tp'  // Encargado de una especialidad TP
};

// Etiquetas amigables por rol (para UI)
var EL_ROLES_LABEL = {
  admin:          'Administrador de plataforma',
  director:       'Director',
  rector:         'Rector',
  admin_colegio:  'Administrador de colegio',
  utp:            'Jefe/a UTP',
  encargado_area: 'Encargado/a de área',
  profesor:       'Profesor/a',
  jefe_curso:     'Profesor/a jefe',
  amb_enc:        'Encargado/a de Convivencia',
  amb_prof:       'Profesional de Convivencia',
  aps_enc:        'Encargado/a de Apoyo Psicosocial',
  aps_prof:       'Profesional de Apoyo Psicosocial',
  pie_enc:        'Coordinador/a PIE',
  pie_edu:        'Educador/a Diferencial',
  estudiante:     'Estudiante',
  apoderado:      'Apoderado/a'
};

// Rol → panel dedicado. Usado por roles-router.js.
var EL_ROLES_PANEL = {
  admin:          'panel-superadmin.html',   // Fase 7: SuperAdmin como landing principal
  director:       'panel-director.html',
  rector:         'panel-rector.html',
  admin_colegio:  'panel-admin-colegio.html',
  utp:            'panel-utp.html',
  encargado_area: 'panel-utp.html',
  profesor:       'panel-profesor.html',
  jefe_curso:     'panel-profesor.html',
  amb_enc:        'panel-ambiente.html',
  amb_prof:       'panel-ambiente-prof.html',
  aps_enc:        'panel-apoyo.html',
  aps_prof:       'panel-apoyo-prof.html',
  pie_enc:        'panel-pie.html',
  pie_edu:        'panel-pie-edu.html',
  estudiante:     'panel-profesor.html',
  apoderado:      'panel-profesor.html'
};

// Prioridad de rol para elegir panel por defecto cuando el usuario tiene
// múltiples roles. Índice bajo = más importante.
var EL_ROLES_PRIORIDAD = [
  'admin',            // 0 — nunca hay otro por encima
  'director',         // 1
  'rector',           // 2
  'admin_colegio',    // 3
  'utp',              // 4
  'encargado_area',   // 5
  'pie_enc',          // 6
  'aps_enc',          // 7
  'amb_enc',          // 8
  'jefe_curso',       // 9
  'profesor',         // 10
  'pie_edu',          // 11
  'aps_prof',         // 12
  'amb_prof',         // 13
  'apoderado',        // 14
  'estudiante'        // 15 — nunca hay otro por debajo
];

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
  PLANES:          'planes',           // Fase 7 — catálogo comercial
  CONTACTOS_LEADS: 'contactos_leads',  // Fase 7 — form 'Solicitar demo'
  PAGOS_LICEO:     'pagos_liceo',      // Fase 7 — historial de facturación
  ACTIVIDAD:       'actividad'  // Audit log: 1 doc por evento del usuario
};

// Definición canónica de features por plan (usado en runtime para
// habilitar/deshabilitar módulos según el plan contratado por el liceo).
var EL_PLAN_FEATURES = {
  basic: [
    'planificaciones', 'libro_clases', 'notas', 'asistencia',
    'materiales', 'reportes_utp', 'panel_director_basico'
  ],
  pro: [
    'planificaciones', 'libro_clases', 'notas', 'asistencia',
    'materiales', 'reportes_utp', 'panel_director_basico',
    'ia_asistente', 'dashboards_avanzados', 'aprobaciones', 'panel_rector'
  ],
  enterprise: [
    'planificaciones', 'libro_clases', 'notas', 'asistencia',
    'materiales', 'reportes_utp', 'panel_director_basico',
    'ia_asistente', 'dashboards_avanzados', 'aprobaciones', 'panel_rector',
    'apoyo_psicosocial', 'convivencia', 'pie_completo', 'exportes_avanzados'
  ]
};

// Precios de referencia (CLP anual). Editables al crear cada colegio
// para negociar caso a caso.
var EL_PLAN_PRECIOS = {
  basic:       800000,
  pro:        1500000,
  enterprise: 2500000
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
