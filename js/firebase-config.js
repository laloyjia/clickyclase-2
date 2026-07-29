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
  profesor:       'dashboard-profesor.html',
  jefe_curso:     'dashboard-profesor.html',
  amb_enc:        'panel-ambiente.html',
  amb_prof:       'panel-ambiente-prof.html',
  aps_enc:        'panel-apoyo.html',
  aps_prof:       'panel-apoyo-prof.html',
  pie_enc:        'panel-pie.html',
  pie_edu:        'panel-pie-edu.html',
  estudiante:     'dashboard.html',
  apoderado:      'dashboard.html'
};

// Prioridad de rol para elegir panel por defecto cuando el usuario tiene
// múltiples roles. Índice bajo = más importante.
// Nota Fase 8: admin_colegio arriba de director/rector porque quien administra
// el colegio (crea usuarios, gestiona cursos) NECESITA caer al panel de admin
// del colegio como landing, no al dashboard académico.
var EL_ROLES_PRIORIDAD = [
  'admin',            // 0 — nunca hay otro por encima
  'admin_colegio',    // 1 — quien administra el colegio (Fase 8)
  'director',         // 2
  'rector',           // 3
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

// ═══════════════════════════════════════════════════════════════════
//  FULL WIDTH + RESPONSIVE INJECTOR
//  1) Fuerza que TODA página aproveche el 100% del viewport.
//  2) Optimiza para móviles y tablets (mobile-first breakpoints).
//  3) Inyecta un botón hamburguesa auto si hay sidebar y no lo tiene.
// ═══════════════════════════════════════════════════════════════════
(function injectResponsiveCSS() {
  if (document.getElementById('cc-full-width-css')) return;
  var css = [
    /* ═══ Full width (desktop y arriba) ═══ */
    ':root { --cc-page-pad: clamp(16px, 3vw, 40px); }',
    '.container, .wrapper, .wrap, .page-wrap, .main-wrap, .app-container,',
    '.layout-container, .bib-container, .dash-wrap, .pt-wrap, .u-wrap,',
    '.h-wrap, .m-wrap, .d-wrap, .pl-wrap, .pricing-wrap, .plans-wrap,',
    '.index-wrap, .super-wrap {',
    '  max-width: none !important; width: 100% !important;',
    '  margin-left: 0 !important; margin-right: 0 !important;',
    '  padding-left: var(--cc-page-pad) !important;',
    '  padding-right: var(--cc-page-pad) !important;',
    '  box-sizing: border-box !important;',
    '}',
    'main.main, main.main-pro, main.main-content, main.page-content {',
    '  max-width: none !important; width: auto !important;',
    '  padding-left: var(--cc-page-pad); padding-right: var(--cc-page-pad);',
    '  box-sizing: border-box;',
    '}',
    'nav.navbar, .navbar, .topbar, .nav-pro {',
    '  max-width: none !important; width: 100% !important;',
    '}',
    '.navbar > .container, .nav-inner, .nav-pro-inner {',
    '  max-width: none !important; width: 100% !important;',
    '}',
    '.layout-pro > .main-pro { max-width: none !important; width: auto !important; }',
    '.card-login, .card-signup, .auth-card, .error-page,',
    '.wizard-card, .signup-wizard { max-width: 520px !important; margin-left: auto !important; margin-right: auto !important; }',
    '.cc-ia-widget, .ia-widget-panel, #iaWidget, .ia-fab {',
    '  max-width: 420px !important; width: auto !important;',
    '}',

    /* ═══ TABLET (max-width: 980px) ═══ */
    '@media (max-width: 980px) {',
    '  :root { --cc-page-pad: 16px; }',
    '  /* Sidebar → drawer lateral */',
    '  .side-pro, aside.sidebar, .sidebar, #sidebar, #sidebarProf {',
    '    position: fixed !important; top: 0 !important; left: 0 !important;',
    '    bottom: 0 !important; height: 100vh !important;',
    '    width: 85vw !important; max-width: 320px !important;',
    '    transform: translateX(-100%); transition: transform .28s ease;',
    '    z-index: 1000 !important; box-shadow: 8px 0 32px rgba(0,0,0,.24);',
    '    overflow-y: auto;',
    '  }',
    '  .side-pro.open, aside.sidebar.open, .sidebar.open,',
    '  #sidebar.open, #sidebarProf.open { transform: translateX(0) !important; }',
    '  /* Overlay al abrir drawer */',
    '  .cc-drawer-overlay { position: fixed; inset: 0; background: rgba(12,30,59,.55); z-index: 999; opacity: 0; pointer-events: none; transition: opacity .28s; }',
    '  .cc-drawer-overlay.open { opacity: 1; pointer-events: auto; }',
    '  /* Main sin margen izquierdo cuando sidebar está oculto */',
    '  .layout-pro > .main-pro, main.main, main.main-pro {',
    '    margin-left: 0 !important; padding-left: 16px !important; padding-right: 16px !important;',
    '  }',
    '  /* Botón hamburguesa visible */',
    '  .btn-hamb, .cc-hamb-auto {',
    '    display: inline-flex !important; position: fixed !important;',
    '    top: 12px !important; left: 12px !important; z-index: 1001 !important;',
    '    width: 44px; height: 44px; align-items: center; justify-content: center;',
    '    background: #fff; border: 1px solid rgba(37,99,235,.20); border-radius: 10px;',
    '    box-shadow: 0 4px 14px rgba(37,99,235,.14); cursor: pointer;',
    '  }',
    '  /* Grids grandes a 2 columnas */',
    '  .grid-4, .cards-grid, .kpis-grid, .stats-grid,',
    '  .hero-stats, .stat-row, .accesos-grid {',
    '    grid-template-columns: repeat(2, 1fr) !important;',
    '  }',
    '  /* Cards con menos padding */',
    '  .card, .card-pro, .section-pro { padding: 16px !important; }',
    '  /* Fuente hero más pequeña */',
    '  h1, .hero h1 { font-size: clamp(1.4rem, 5vw, 2rem) !important; line-height: 1.2 !important; }',
    '}',

    /* ═══ MOBILE (max-width: 640px) ═══ */
    '@media (max-width: 640px) {',
    '  :root { --cc-page-pad: 12px; }',
    '  /* Todo a 1 columna */',
    '  .grid-2, .grid-3, .grid-4, .cards-grid, .kpis-grid,',
    '  .stats-grid, .hero-stats, .stat-row, .accesos-grid,',
    '  .features, .features-grid, .pricing-grid, .plans-grid,',
    '  .hero-prof, .hero-cta, .row2 {',
    '    grid-template-columns: 1fr !important;',
    '    display: grid !important; gap: 12px !important;',
    '  }',
    '  /* Nav-bar compacto */',
    '  nav.navbar, .navbar, .nav-pro, .top-nav {',
    '    padding: 10px 12px !important; flex-wrap: wrap;',
    '  }',
    '  .nav-links { flex-wrap: wrap; gap: 8px !important; }',
    '  .nav-links a { padding: 6px 10px !important; font-size: .85rem !important; }',
    '  /* Botones más grandes para dedos */',
    '  .btn, button.btn, .btn-pro, .btn-primary, .btn-secondary,',
    '  input[type="submit"], input[type="button"] {',
    '    min-height: 44px; padding: 10px 16px !important; font-size: .92rem !important;',
    '  }',
    '  /* Tablas → scroll horizontal */',
    '  table { display: block; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch; }',
    '  /* Formularios stackeados */',
    '  .form-row, .fld-row, .row-2col, .row2 {',
    '    grid-template-columns: 1fr !important; flex-direction: column !important;',
    '  }',
    '  input, select, textarea { width: 100% !important; box-sizing: border-box; font-size: 16px !important; }',
    '  /* Modales full-screen en móvil */',
    '  [class*="modal-bg"], [class*="modal-overlay"] { padding: 8px !important; align-items: flex-start !important; }',
    '  [class*="modal-content"], [class*="modal-body"], .modal-box {',
    '    max-width: 100% !important; width: 100% !important;',
    '    max-height: 96vh !important; margin-top: 12px !important;',
    '  }',
    '  /* Fuentes fluidas */',
    '  h1, .hero h1 { font-size: clamp(1.3rem, 6vw, 1.8rem) !important; }',
    '  h2 { font-size: clamp(1.05rem, 4.5vw, 1.4rem) !important; }',
    '  h3 { font-size: clamp(.95rem, 4vw, 1.15rem) !important; }',
    '  p, li { font-size: .92rem !important; line-height: 1.55 !important; }',
    '  /* Widget IA full-width en móvil */',
    '  .cc-ia-widget, .ia-widget-panel, #iaWidget {',
    '    max-width: 100vw !important; width: 100vw !important;',
    '    height: 100vh !important; max-height: 100vh !important;',
    '    top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;',
    '    border-radius: 0 !important;',
    '  }',
    '  /* KPIs y stats compactos */',
    '  .kpi, .stat-pro { padding: 12px !important; }',
    '  .kpi .v, .stat-num { font-size: 1.4rem !important; }',
    '  /* Card headers apilados */',
    '  .card-h, .page-h, .header-row {',
    '    flex-direction: column !important; align-items: flex-start !important; gap: 8px !important;',
    '  }',
    '  /* Chips y tags con wrap */',
    '  .chips, .tags-row { flex-wrap: wrap !important; }',
    '  /* Ocultar elementos "decorativos" en móvil */',
    '  .bg-orbs, .bg-mesh, .hero-decoration { display: none !important; }',
    '}',

    /* ═══ TOUCH (cualquier dispositivo touch) ═══ */
    '@media (hover: none) and (pointer: coarse) {',
    '  /* Áreas de touch más grandes */',
    '  a, button, [role="button"], [onclick] { min-height: 40px; touch-action: manipulation; }',
    '  /* Sin hover elevado en touch */',
    '  .card:hover, .btn:hover { transform: none !important; }',
    '}'
  ].join('\n');

  var style = document.createElement('style');
  style.id = 'cc-full-width-css';
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();

// ═══════════════════════════════════════════════════════════════════
//  HAMBURGUESA AUTO — si la página tiene sidebar pero no hay botón
//  hamburguesa visible, lo creamos automáticamente en móvil.
// ═══════════════════════════════════════════════════════════════════
(function autoHamb() {
  function init() {
    var sidebar = document.querySelector('.side-pro, aside.sidebar, .sidebar, #sidebar, #sidebarProf');
    if (!sidebar) return;
    // Ya existe hamburguesa manual?
    if (document.querySelector('.btn-hamb')) {
      wireHamb(document.querySelector('.btn-hamb'), sidebar);
      return;
    }
    // Crear uno auto
    var btn = document.createElement('button');
    btn.className = 'cc-hamb-auto';
    btn.setAttribute('aria-label', 'Abrir menú');
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>';
    document.body.appendChild(btn);
    wireHamb(btn, sidebar);
  }

  function wireHamb(btn, sidebar) {
    // Overlay
    var overlay = document.querySelector('.cc-drawer-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'cc-drawer-overlay';
      document.body.appendChild(overlay);
    }
    function toggle(open) {
      var willOpen = open == null ? !sidebar.classList.contains('open') : open;
      sidebar.classList.toggle('open', willOpen);
      overlay.classList.toggle('open', willOpen);
    }
    btn.addEventListener('click', function(e) { e.preventDefault(); toggle(); });
    overlay.addEventListener('click', function() { toggle(false); });
    // Cerrar al clickear un link del sidebar (mejora UX en drawer)
    sidebar.addEventListener('click', function(e) {
      if (e.target.closest('a[href]')) setTimeout(function(){ toggle(false); }, 80);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ============================================================
   CCNombre — Parser universal de nombres chilenos
   Convención MINEDUC/libro de clases: NOMBRE(S) APELLIDO_P APELLIDO_M
   Ordena por primer apellido (estándar de nómina chilena).
   ============================================================ */
(function () {
  'use strict';

  // Partículas que se pegan al apellido siguiente ("de la Torre", "del Río",
  // "van der Berg"). No las contamos como apellido independiente.
  var PARTICULAS = { 'de': 1, 'del': 1, 'la': 1, 'las': 1, 'los': 1,
                     'da': 1, 'do': 1, 'dos': 1, 'san': 1, 'santa': 1,
                     'von': 1, 'van': 1, 'der': 1, 'di': 1, 'mac': 1, 'mc': 1 };

  function _norm(s) {
    return String(s || '').trim().replace(/\s+/g, ' ');
  }

  /**
   * Parsea un string tipo "Alonso Castillo Castro" o "María José López Silva"
   * Devuelve: { nombres, apellidos, primerApellido, apellidoPaterno, apellidoMaterno }
   *
   * Reglas:
   *   - 1 palabra                         → todo va a nombres
   *   - 2 palabras                        → nombres + apellido paterno
   *   - 3 palabras                        → 1 nombre + apellidoP + apellidoM
   *   - 4 palabras                        → 2 nombres + apellidoP + apellidoM
   *   - 5+ palabras                       → resto de nombres + últimos 2 apellidos
   *   - Partículas ("de la", "del", "van der") se anexan al apellido siguiente.
   */
  function parse(str) {
    var s = _norm(str);
    var out = { nombres: '', apellidos: '', primerApellido: '',
                apellidoPaterno: '', apellidoMaterno: '',
                completo: s, natural: s };
    if (!s) return out;

    var parts = s.split(' ');

    // ── 1 palabra: solo nombre ──────────────────────────────────
    if (parts.length === 1) {
      out.nombres = s;
      out.natural = s;
      return out;
    }

    // ── 2 palabras: nombre + apellido paterno ──────────────────
    if (parts.length === 2) {
      out.nombres         = parts[0];
      out.apellidoPaterno = parts[1];
      out.apellidos       = parts[1];
      out.primerApellido  = parts[1];
      out.natural         = parts[1] + ', ' + parts[0];
      return out;
    }

    // ── 3+ palabras: última = apellido materno (con partículas),
    //    penúltima = apellido paterno (con partículas),
    //    lo demás = nombres. Convención MINEDUC chilena.
    function _apellidoDesdeAtras(arr, offsetIzq) {
      // Toma un token del final. Si a su izquierda hay partículas ("de", "la",
      // "del", "van", "der"...) también las anexa. Devuelve nuevo offset izq.
      if (offsetIzq < 0) return { texto: '', nuevoOffset: -1 };
      var out = [arr[offsetIzq]];
      var i = offsetIzq - 1;
      while (i >= 0 && PARTICULAS[arr[i].toLowerCase()]) {
        out.unshift(arr[i]);
        i--;
      }
      return { texto: out.join(' '), nuevoOffset: i };
    }

    var mat = _apellidoDesdeAtras(parts, parts.length - 1);
    var pat = _apellidoDesdeAtras(parts, mat.nuevoOffset);
    // Los tokens restantes al inicio son nombres (uno o más).
    var nombresTokens = parts.slice(0, pat.nuevoOffset + 1);
    var nombres = nombresTokens.join(' ');

    // Guardarrail SOLO cuando realmente no quedaron nombres (nombre de 2 tokens
    // "de la Torre" tipo caso raro). En ese caso preferimos preservar los dos
    // apellidos y dejar el primer nombre vacío en vez de perder tokens.
    if (!nombres && pat.texto && mat.texto) {
      // Nada que mover: sólo hay 2 apellidos, no hay nombre.
      // Dejar vacío mejor que colapsar.
    }

    out.nombres         = nombres;
    out.apellidoPaterno = pat.texto || '';
    out.apellidoMaterno = mat.texto || '';
    out.apellidos       = (out.apellidoPaterno +
                          (out.apellidoMaterno ? ' ' + out.apellidoMaterno : '')).trim();
    out.primerApellido  = out.apellidoPaterno || out.apellidoMaterno || '';
    out.natural         = out.apellidos
      ? (out.apellidos + (out.nombres ? ', ' + out.nombres : ''))
      : out.nombres;
    return out;
  }

  /**
   * Comparador para Array.sort() — ordena estilo libro de clases chileno:
   * primer apellido → segundo apellido → nombre.
   * Acepta strings o objetos con .nombre / .nombreCompleto / .nombres+.apellidos
   */
  function comparar(a, b) {
    return claveOrden(a).localeCompare(claveOrden(b), 'es', { sensitivity: 'base' });
  }

  function claveOrden(x) {
    if (x == null) return '';
    if (typeof x === 'string') {
      var p = parse(x);
      return (p.apellidoPaterno + ' ' + p.apellidoMaterno + ' ' + p.nombres).trim();
    }
    // Objeto: usar apellidos+nombres si vienen separados, si no, parsear
    if (x.apellidoPaterno || x.apellidoP) {
      return ((x.apellidoPaterno || x.apellidoP || '') + ' ' +
              (x.apellidoMaterno || x.apellidoM || '') + ' ' +
              (x.nombres || x.nombre || '')).trim();
    }
    var src = x.nombreCompleto || x.nombre || '';
    return claveOrden(src);
  }

  /** "Yáñez Díaz, Bárbara" — formato natural chileno */
  function natural(str) { return parse(str).natural; }

  window.CCNombre = {
    parse:      parse,
    comparar:   comparar,
    claveOrden: claveOrden,
    natural:    natural
  };
})();

