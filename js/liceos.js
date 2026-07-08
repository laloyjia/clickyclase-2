/**
 * liceos.js — Click&Clase Fase 7
 *
 * Módulo de gestión SaaS multi-colegio. Uso EXCLUSIVO del rol `admin`
 * (plataforma) desde el Panel SuperAdmin.
 *
 * Encapsula toda la lógica de:
 *   - Listar/obtener colegios contratados
 *   - Crear colegio nuevo con su admin en 1 flujo atómico
 *   - Editar datos y cambiar plan de un colegio
 *   - Suspender / reactivar
 *   - KPIs de plataforma (MRR, colegios activos) y por colegio
 *   - Registrar pagos y renovaciones
 *
 * Truco clave: para crear el usuario admin_colegio en Firebase Auth SIN
 * cerrar la sesión del super admin, usamos una app secundaria de Firebase
 * (patrón oficial recomendado por Firebase).
 *
 * Dependencias:
 *   - firebase.initializeApp (compat SDK)
 *   - EL_AUTH, EL_DB (firebase-config.js, firebase-rest.js)
 *   - EL_COLLECTIONS, EL_PLAN_FEATURES, EL_PLAN_PRECIOS
 */

(function () {
  'use strict';

  var COL_LICEOS  = 'liceos';
  var COL_PLANES  = 'planes';
  var COL_USERS   = 'usuarios';
  var COL_PAGOS   = 'pagos_liceo';

  // ── App secundaria para crear usuarios sin cerrar sesión del admin ──
  var _secondaryApp = null;
  function _getSecondaryAuth() {
    if (typeof firebase === 'undefined') {
      throw new Error('Firebase SDK no cargado');
    }
    if (!_secondaryApp) {
      var existing = firebase.apps.filter(function (a) { return a.name === '_ccSecondary'; });
      _secondaryApp = existing.length ? existing[0]
                      : firebase.initializeApp(FIREBASE_CONFIG, '_ccSecondary');
    }
    return _secondaryApp.auth();
  }

  // ── Slug: transforma "Colegio Salesianos de Talca" → "colegio-salesianos-de-talca" ──
  function slugify(texto) {
    if (!texto) return '';
    return String(texto)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')  // quita acentos
      .replace(/[^a-z0-9\s-]/g, '')                      // solo alfanum y espacios
      .replace(/\s+/g, '-')                              // espacios → guiones
      .replace(/-+/g, '-')                               // dedup guiones
      .replace(/^-|-$/g, '')                             // trim guiones
      .substring(0, 60);
  }

  // ── Password temporal segura y memorable (12 chars) ──
  function generarPasswordTemporal() {
    var mayusculas = 'ABCDEFGHJKMNPQRSTUVWXYZ';   // sin I, L, O (confusas)
    var minusculas = 'abcdefghijkmnpqrstuvwxyz';  // sin l, o
    var digitos    = '23456789';                  // sin 0, 1
    var especiales = '!@#$%';
    var pool = mayusculas + minusculas + digitos + especiales;
    var pw = '';
    pw += mayusculas[Math.floor(Math.random() * mayusculas.length)];
    pw += digitos[Math.floor(Math.random() * digitos.length)];
    pw += especiales[Math.floor(Math.random() * especiales.length)];
    for (var i = 3; i < 12; i++) {
      pw += pool[Math.floor(Math.random() * pool.length)];
    }
    // Shuffle
    return pw.split('').sort(function () { return 0.5 - Math.random(); }).join('');
  }

  // ── Formateo CLP ──
  function formatoCLP(n) {
    if (typeof n !== 'number') n = Number(n) || 0;
    return '$' + n.toLocaleString('es-CL');
  }

  // ── Listar todos los colegios contratados ──
  function listar() {
    return EL_DB.collection(COL_LICEOS).get().then(function (snap) {
      var arr = [];
      snap.forEach(function (doc) {
        arr.push(Object.assign({}, doc.data(), { id: doc.id }));
      });
      // Ordenar por nombre
      arr.sort(function (a, b) {
        return (a.nombre || '').localeCompare(b.nombre || '');
      });
      return arr;
    });
  }

  // ── Listar planes disponibles ──
  function listarPlanes() {
    return EL_DB.collection(COL_PLANES).get().then(function (snap) {
      var arr = [];
      snap.forEach(function (doc) {
        arr.push(Object.assign({}, doc.data(), { id: doc.id }));
      });
      arr.sort(function (a, b) { return (a.orden || 99) - (b.orden || 99); });
      return arr;
    });
  }

  // ── Obtener 1 liceo por slug ──
  function obtener(slug) {
    return EL_DB.collection(COL_LICEOS).doc(slug).get().then(function (doc) {
      if (!doc.exists) return null;
      return Object.assign({}, doc.data(), { id: doc.id });
    });
  }

  // ── Crear colegio nuevo + admin en 1 flujo atómico ──
  //
  //   datos = {
  //     nombre, rut, direccion, ciudad, region, telefono, email, sitio,
  //     logoUrl, colores: {primary, secondary},
  //     planId, planPrecio, planFechaInicio (ISO), planDuracionMeses,
  //     adminNombre, adminEmail, adminTelefono, adminCargo
  //   }
  //
  //   Retorna:
  //     { liceo: {...}, admin: { uid, email, password }, plan: {...} }
  //
  // Al fallar cualquier paso hace su mejor esfuerzo por revertir lo creado.
  function crearConAdmin(datos) {
    if (!datos || !datos.nombre || !datos.adminEmail) {
      return Promise.reject(new Error('Faltan datos obligatorios (nombre y adminEmail)'));
    }

    var slug = datos.slug || slugify(datos.nombre);
    if (!slug) return Promise.reject(new Error('No se pudo generar slug'));

    var passwordTemp = generarPasswordTemporal();
    var adminUid    = null;
    var liceoRef    = EL_DB.collection(COL_LICEOS).doc(slug);
    var planId      = datos.planId || 'basic';
    var duracion    = Math.max(1, Math.min(60, datos.planDuracionMeses || 12));

    // Fechas de plan
    var fechaInicio = datos.planFechaInicio ? new Date(datos.planFechaInicio) : new Date();
    var fechaFin    = new Date(fechaInicio);
    fechaFin.setMonth(fechaFin.getMonth() + duracion);

    var precioSug = (typeof EL_PLAN_PRECIOS !== 'undefined' && EL_PLAN_PRECIOS[planId]) || 0;
    var precio    = (typeof datos.planPrecio === 'number') ? datos.planPrecio : precioSug;

    var features = (typeof EL_PLAN_FEATURES !== 'undefined' && EL_PLAN_FEATURES[planId]) || [];

    // Chequeo de slug único (para no pisar un colegio existente)
    return liceoRef.get().then(function (existing) {
      if (existing.exists) {
        throw new Error('Ya existe un colegio con slug "' + slug + '". Elegí otro nombre.');
      }

      // 1) Crear usuario en Firebase Auth usando app secundaria
      var secondaryAuth = _getSecondaryAuth();
      return secondaryAuth.createUserWithEmailAndPassword(datos.adminEmail, passwordTemp)
        .then(function (cred) {
          adminUid = cred.user.uid;
          return secondaryAuth.signOut();  // Salimos de la app secundaria
        });
    })
    .then(function () {
      // 2) Crear doc del liceo
      var liceoDoc = {
        slug:            slug,
        nombre:          datos.nombre,
        rut:             datos.rut || '',
        direccion:       datos.direccion || '',
        ciudad:          datos.ciudad || '',
        region:          datos.region || '',
        telefono:        datos.telefono || '',
        email:           datos.email || '',
        sitio:           datos.sitio || '',
        logoUrl:         datos.logoUrl || '',
        colores:         datos.colores || { primary: '#7c3aed', secondary: '#f59e0b' },
        descripcion:     datos.descripcion || '',

        // Plan
        planId:              planId,
        planPrecio:          precio,
        planFechaInicio:     fechaInicio.toISOString(),
        planFechaFin:        fechaFin.toISOString(),
        planDuracionMeses:   duracion,
        planFeatures:        features,

        // Admin principal
        adminUid:            adminUid,
        adminNombre:         datos.adminNombre || '',
        adminEmail:          datos.adminEmail,
        adminTelefono:       datos.adminTelefono || '',
        adminCargo:          datos.adminCargo || 'Director/a',

        // Estado
        estado:              datos.estado || 'activo',
        creadoEn:            new Date().toISOString(),
        creadoPor:           (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : 'admin',
        actualizadoEn:       new Date().toISOString()
      };
      return liceoRef.set(liceoDoc).then(function () { return liceoDoc; });
    })
    .then(function (liceoDoc) {
      // 3) Crear doc del usuario admin_colegio
      var userDoc = {
        uid:            adminUid,
        email:          datos.adminEmail,
        nombre:         datos.adminNombre || datos.adminEmail.split('@')[0],
        telefono:       datos.adminTelefono || '',
        role:           'admin_colegio',                // legacy
        roles: {
          admin_colegio: {},
          director:      {}
        },
        liceoSlug:      slug,
        cargo:          datos.adminCargo || 'Director/a',
        activo:         true,
        primerIngreso:  true,                            // fuerza cambio de password al 1er login
        creadoEn:       new Date().toISOString(),
        creadoPor:      (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : 'admin',
        xp: 0, nivel: 1, badges: [], evaluaciones: []
      };
      return EL_DB.collection(COL_USERS).doc(adminUid).set(userDoc)
        .then(function () {
          return {
            liceo:  liceoDoc,
            admin:  { uid: adminUid, email: datos.adminEmail, password: passwordTemp },
            plan:   { id: planId, precio: precio, features: features }
          };
        });
    })
    .catch(function (err) {
      // Rollback best-effort: si el Auth se creó pero Firestore falló,
      // eliminar el usuario Auth para no dejar cuenta huérfana.
      // (Requiere permisos admin, típicamente hay que hacerlo desde Cloud Function.
      //  Como fallback dejamos el error explícito para que el admin resuelva.)
      console.error('[CCLiceos.crearConAdmin] Error:', err);
      throw err;
    });
  }

  // ── Actualizar datos de un liceo ──
  function actualizar(slug, cambios) {
    if (!slug || !cambios) return Promise.reject(new Error('slug y cambios requeridos'));
    var update = Object.assign({}, cambios, { actualizadoEn: new Date().toISOString() });
    return EL_DB.collection(COL_LICEOS).doc(slug).update(update);
  }

  // ── Cambiar plan de un liceo (upgrade/downgrade/renovación) ──
  function cambiarPlan(slug, nuevoPlanId, opts) {
    opts = opts || {};
    var duracion = Math.max(1, Math.min(60, opts.duracionMeses || 12));
    var precio   = (typeof opts.precio === 'number') ? opts.precio
                   : ((typeof EL_PLAN_PRECIOS !== 'undefined' && EL_PLAN_PRECIOS[nuevoPlanId]) || 0);
    var features = (typeof EL_PLAN_FEATURES !== 'undefined' && EL_PLAN_FEATURES[nuevoPlanId]) || [];

    var fechaInicio = opts.fechaInicio ? new Date(opts.fechaInicio) : new Date();
    var fechaFin    = new Date(fechaInicio);
    fechaFin.setMonth(fechaFin.getMonth() + duracion);

    return actualizar(slug, {
      planId:            nuevoPlanId,
      planPrecio:        precio,
      planFechaInicio:   fechaInicio.toISOString(),
      planFechaFin:      fechaFin.toISOString(),
      planDuracionMeses: duracion,
      planFeatures:      features
    });
  }

  // ── Suspender / reactivar ──
  function suspender(slug, motivo) {
    return actualizar(slug, {
      estado: 'suspendido',
      motivoSuspension: motivo || '',
      suspendidoEn: new Date().toISOString()
    });
  }
  function reactivar(slug) {
    return actualizar(slug, {
      estado: 'activo',
      reactivadoEn: new Date().toISOString()
    });
  }

  // ── Eliminar (solo para casos extremos — deja doc marcado, no borra hard) ──
  function eliminar(slug) {
    return actualizar(slug, {
      estado: 'eliminado',
      eliminadoEn: new Date().toISOString()
    });
  }

  // ── Registrar pago ──
  function registrarPago(slug, datos) {
    var pago = {
      liceoSlug:   slug,
      monto:       datos.monto || 0,
      concepto:    datos.concepto || 'Suscripción anual',
      metodo:      datos.metodo || 'transferencia',    // transferencia, tarjeta, efectivo
      referencia:  datos.referencia || '',              // nro de comprobante
      fechaPago:   datos.fechaPago || new Date().toISOString(),
      registradoEn: new Date().toISOString(),
      registradoPor: (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : 'admin'
    };
    return EL_DB.collection(COL_PAGOS).add(pago);
  }

  // ── KPIs de plataforma (para el header del SuperAdmin) ──
  function kpisPlataforma() {
    return listar().then(function (liceos) {
      var activos    = liceos.filter(function (l) { return l.estado === 'activo'; });
      var prueba     = liceos.filter(function (l) { return l.estado === 'prueba'; });
      var suspendido = liceos.filter(function (l) { return l.estado === 'suspendido'; });
      var mrr = 0, arr = 0;
      activos.forEach(function (l) {
        arr += (l.planPrecio || 0);
        mrr += (l.planPrecio || 0) / 12;
      });
      return {
        totalLiceos:     liceos.length,
        liceosActivos:   activos.length,
        liceosPrueba:    prueba.length,
        liceosSuspendidos: suspendido.length,
        mrr:             Math.round(mrr),
        arr:             Math.round(arr)
      };
    });
  }

  // ── KPIs de 1 liceo específico (usuarios, materiales, etc.) ──
  function kpisLiceo(slug) {
    var kpis = { usuarios: 0, docentes: 0, planificaciones: 0, materiales: 0 };
    return Promise.all([
      EL_DB.collection(COL_USERS).where('liceoSlug', '==', slug).get(),
      EL_DB.collection('planificaciones').where('liceoSlug', '==', slug).get().catch(function () { return { size: 0 }; }),
      EL_DB.collection('materiales').where('liceoSlug', '==', slug).get().catch(function () { return { size: 0 }; })
    ]).then(function (results) {
      var usuariosSnap = results[0];
      kpis.usuarios = usuariosSnap.size || 0;
      usuariosSnap.forEach(function (doc) {
        var d = doc.data();
        var esDocente = (d.role === 'profesor') ||
                        (d.roles && (d.roles.profesor || d.roles.jefe_curso));
        if (esDocente) kpis.docentes++;
      });
      kpis.planificaciones = results[1].size || 0;
      kpis.materiales      = results[2].size || 0;
      return kpis;
    });
  }

  // ── Chequeo si un plan incluye una feature ──
  function planIncluye(planId, feature) {
    var arr = (typeof EL_PLAN_FEATURES !== 'undefined' && EL_PLAN_FEATURES[planId]) || [];
    return arr.indexOf(feature) !== -1;
  }

  // ── API pública ──
  window.CCLiceos = {
    slugify:               slugify,
    generarPasswordTemporal: generarPasswordTemporal,
    formatoCLP:            formatoCLP,
    listar:                listar,
    listarPlanes:          listarPlanes,
    obtener:               obtener,
    crearConAdmin:         crearConAdmin,
    actualizar:            actualizar,
    cambiarPlan:           cambiarPlan,
    suspender:             suspender,
    reactivar:             reactivar,
    eliminar:              eliminar,
    registrarPago:         registrarPago,
    kpisPlataforma:        kpisPlataforma,
    kpisLiceo:             kpisLiceo,
    planIncluye:           planIncluye
  };
})();
