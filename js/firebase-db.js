/**
 * firebase-db.js
 * Click&Clase — Operaciones Firestore (base de datos)
 *
 * Módulos:
 *  - ELDB.materiales   → guardar, listar, eliminar materiales
 *  - ELDB.planificaciones → guardar, listar, eliminar planificaciones
 *  - ELDB.evaluaciones → guardar, listar, ranking
 *  - ELDB.usuarios     → obtener, actualizar perfil
 *  - ELDB.codigos      → códigos de acceso
 */

// ────────────────────────────────────────────────────────────
//  Helpers globales de tipo de profesor (compatibilidad legacy)
//  Acepta `tipoProfesor` (string) y/o `tiposProfesor` (array)
//  Valores válidos: 'basica' | 'media' | 'tecnico'
// ────────────────────────────────────────────────────────────
(function() {
  function getTiposProfesor(user) {
    if (!user) return [];
    if (Array.isArray(user.tiposProfesor) && user.tiposProfesor.length) {
      return user.tiposProfesor.slice();
    }
    if (user.tipoProfesor) return [user.tipoProfesor];
    return [];
  }
  window.getTiposProfesor = getTiposProfesor;
  window.profEsTP     = function(user) { return getTiposProfesor(user).indexOf('tecnico') !== -1; };
  window.profEsBasica = function(user) { return getTiposProfesor(user).indexOf('basica')  !== -1; };
  window.profEsMedia  = function(user) { return getTiposProfesor(user).indexOf('media')   !== -1; };
  // Etiqueta legible para mostrar en UI
  window.tiposProfesorLabel = function(user) {
    var t = getTiposProfesor(user);
    var labels = { basica: '📚 Básica', media: '🎓 Plan Común', tecnico: '⚙️ EMTP' };
    return t.map(function(k) { return labels[k] || k; }).join(' + ') || '—';
  };
})();

var ELDB = (function() {
  'use strict';

  // ────────────────────────────────────────────────────────────
  //  MATERIALES
  // ────────────────────────────────────────────────────────────
  var materiales = {
    /**
     * Guardar material en Firestore
     * @param {object} data - { titulo, tipo, modulo, ae, oa, curso, contenido, descripcion, profesor, email }
     */
    guardar: function(data) {
      var entrada = Object.assign({}, data, {
        publicadoEn:  EL_DB.FieldValue.serverTimestamp(),
        fechaISO:     new Date().toISOString(),
        activo:       true,
        vistas:       0
      });
      return EL_DB.collection(EL_COLLECTIONS.MATERIALES).add(entrada)
        .then(function(ref) {
          return Object.assign({ id: ref.id }, entrada);
        });
    },

    /**
     * Listar materiales con filtros opcionales
     * @param {object} filtros - { profesor, modulo, tipo, curso, asignatura, especialidad }
     */
    listar: function(filtros) {
      filtros = filtros || {};
      // Evitamos índices compuestos: traemos todos los activos y filtramos en cliente.
      // Si la colección crece mucho (>2k docs), conviene crear índices en Firestore.
      return EL_DB.collection(EL_COLLECTIONS.MATERIALES).where('activo', '==', true).get()
        .then(function(snap) {
          var items = [];
          snap.forEach(function(doc) { items.push(Object.assign({ id: doc.id }, doc.data())); });
          // Normalizador (case-insensitive y trim para campos string)
          var eq = function(a, b) { return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase(); };
          if (filtros.profesor)     items = items.filter(function(m) { return eq(m.email, filtros.profesor) || (m.uid && m.uid === filtros.profesor); });
          if (filtros.uid)          items = items.filter(function(m) { return m.uid === filtros.uid; });
          if (filtros.modulo)       items = items.filter(function(m) { return m.modulo === filtros.modulo; });
          if (filtros.tipo)         items = items.filter(function(m) { return m.tipo === filtros.tipo; });
          if (filtros.curso)        items = items.filter(function(m) { return m.curso === filtros.curso || m.nivel === filtros.curso; });
          if (filtros.asignatura)   items = items.filter(function(m) { return eq(m.asignatura, filtros.asignatura); });
          if (filtros.especialidad) items = items.filter(function(m) { return eq(m.especialidad, filtros.especialidad); });
          // Orden descendente por fecha más fiable disponible
          items.sort(function(a, b) {
            var ta = (a.publicadoEn && a.publicadoEn.toMillis) ? a.publicadoEn.toMillis() : (a.fechaISO ? Date.parse(a.fechaISO) : 0);
            var tb = (b.publicadoEn && b.publicadoEn.toMillis) ? b.publicadoEn.toMillis() : (b.fechaISO ? Date.parse(b.fechaISO) : 0);
            return tb - ta;
          });
          return items;
        });
    },

    obtener: function(id) {
      return EL_DB.collection(EL_COLLECTIONS.MATERIALES).doc(id).get()
        .then(function(doc) {
          if (!doc.exists) throw new Error('Material no encontrado');
          return Object.assign({ id: doc.id }, doc.data());
        });
    },

    incrementarVistas: function(id) {
      return EL_DB.collection(EL_COLLECTIONS.MATERIALES).doc(id).update({
        vistas: EL_DB.FieldValue.increment(1)
      });
    },

    eliminar: function(id) {
      // Soft delete + sincronizar calendario del docente
      var ref = EL_DB.collection(EL_COLLECTIONS.MATERIALES).doc(id);
      return ref.get().then(function (doc) {
        var data = (doc && doc.exists) ? doc.data() : null;
        var uid = data && data.uid;
        var updP = ref.update({ activo: false });
        var calP = (uid && calendario && calendario.eliminarPorOrigen)
          ? calendario.eliminarPorOrigen(uid, id).catch(function(){ return 0; })
          : Promise.resolve(0);
        return Promise.all([updP, calP]).then(function (r) { return r[0]; });
      });
    },

    // Escuchar cambios en tiempo real
    escuchar: function(filtros, callback) {
      filtros = filtros || {};
      var query = EL_DB.collection(EL_COLLECTIONS.MATERIALES).where('activo', '==', true);
      if (filtros.profesor) query = query.where('email', '==', filtros.profesor);
      return query.orderBy('publicadoEn', 'desc')
        .onSnapshot(function(snap) {
          var items = [];
          snap.forEach(function(doc) { items.push(Object.assign({ id: doc.id }, doc.data())); });
          callback(items);
        });
    }
  };

  // ────────────────────────────────────────────────────────────
  //  PLANIFICACIONES
  // ────────────────────────────────────────────────────────────
  var planificaciones = {
    guardar: function(data) {
      var entrada = Object.assign({}, data, {
        publicadoEn: EL_DB.FieldValue.serverTimestamp(),
        fechaISO:    new Date().toISOString(),
        activo:      true
      });
      return EL_DB.collection(EL_COLLECTIONS.PLANIFICACIONES).add(entrada)
        .then(function(ref) {
          return Object.assign({ id: ref.id }, entrada);
        });
    },

    listar: function(filtros) {
      filtros = filtros || {};
      // Evitamos índices compuestos: traemos activos y filtramos en cliente.
      return EL_DB.collection(EL_COLLECTIONS.PLANIFICACIONES).where('activo', '==', true).get()
        .then(function(snap) {
          var items = [];
          snap.forEach(function(doc) { items.push(Object.assign({ id: doc.id }, doc.data())); });
          var eq = function(a, b) { return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase(); };
          if (filtros.profesor)    items = items.filter(function(p) { return eq(p.email, filtros.profesor) || (p.uid && p.uid === filtros.profesor); });
          if (filtros.uid)         items = items.filter(function(p) { return p.uid === filtros.uid; });
          if (filtros.modulo)      items = items.filter(function(p) { return p.modulo === filtros.modulo; });
          if (filtros.asignatura)  items = items.filter(function(p) { return eq(p.asignatura, filtros.asignatura); });
          if (filtros.mes) {
            var inicio = filtros.mes + '-01';
            var fin    = filtros.mes + '-31';
            items = items.filter(function(p) {
              var fc = (p.fechaClase || '').slice(0, 10);
              return fc >= inicio && fc <= fin;
            });
          }
          items.sort(function(a, b) {
            var ta = (a.publicadoEn && a.publicadoEn.toMillis) ? a.publicadoEn.toMillis() : (a.fechaISO ? Date.parse(a.fechaISO) : 0);
            var tb = (b.publicadoEn && b.publicadoEn.toMillis) ? b.publicadoEn.toMillis() : (b.fechaISO ? Date.parse(b.fechaISO) : 0);
            return tb - ta;
          });
          return items;
        });
    },

    obtener: function(id) {
      return EL_DB.collection(EL_COLLECTIONS.PLANIFICACIONES).doc(id).get()
        .then(function(doc) {
          if (!doc.exists) throw new Error('Planificación no encontrada');
          return Object.assign({ id: doc.id }, doc.data());
        });
    },

    eliminar: function(id) {
      // Soft delete + sincronizar calendario del docente
      var ref = EL_DB.collection(EL_COLLECTIONS.PLANIFICACIONES).doc(id);
      return ref.get().then(function (doc) {
        var data = (doc && doc.exists) ? doc.data() : null;
        var uid = data && data.uid;
        var updP = ref.update({ activo: false });
        var calP = (uid && calendario && calendario.eliminarPorOrigen)
          ? calendario.eliminarPorOrigen(uid, id).catch(function(){ return 0; })
          : Promise.resolve(0);
        return Promise.all([updP, calP]).then(function (r) { return r[0]; });
      });
    }
  };

  // ────────────────────────────────────────────────────────────
  //  EVALUACIONES
  // ────────────────────────────────────────────────────────────
  var evaluaciones = {
    /**
     * Registrar resultado de evaluación de un estudiante
     * @param {string} uid - UID del estudiante
     * @param {object} eval - { modulo, ae, oa, nota, respuestas, xpGanado, ... }
     */
    registrar: function(uid, evalData) {
      var entrada = Object.assign({}, evalData, {
        uid:        uid,
        realizadoEn: EL_DB.FieldValue.serverTimestamp(),
        fechaISO:   new Date().toISOString()
      });

      var batch = EL_DB.batch();

      // 1. Agregar documento de evaluación
      var evalRef = EL_DB.collection(EL_COLLECTIONS.EVALUACIONES).doc();
      batch.set(evalRef, entrada);

      // 2. Actualizar XP y estadísticas del usuario
      var userRef = EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid);
      batch.update(userRef, {
        xp:            EL_DB.FieldValue.increment(evalData.xpGanado || 0),
        totalEvals:    EL_DB.FieldValue.increment(1),
        ultimaEval:    new Date().toISOString()
      });

      return batch.commit().then(function() {
        return Object.assign({ id: evalRef.id }, entrada);
      });
    },

    listarDeUsuario: function(uid, limite) {
      limite = limite || 20;
      return EL_DB.collection(EL_COLLECTIONS.EVALUACIONES)
        .where('uid', '==', uid)
        .orderBy('realizadoEn', 'desc')
        .limit(limite)
        .get()
        .then(function(snap) {
          var items = [];
          snap.forEach(function(doc) { items.push(Object.assign({ id: doc.id }, doc.data())); });
          return items;
        });
    },

    // Ranking general
    obtenerRanking: function(limite) {
      limite = limite || 50;
      return EL_DB.collection(EL_COLLECTIONS.USERS)
        .where('role', '==', EL_ROLES.ESTUDIANTE)
        .where('xp', '>', 0)
        .orderBy('xp', 'desc')
        .limit(limite)
        .get()
        .then(function(snap) {
          var ranking = [];
          snap.forEach(function(doc) { ranking.push(Object.assign({ uid: doc.id }, doc.data())); });
          return ranking;
        });
    }
  };

  // ────────────────────────────────────────────────────────────
  //  USUARIOS
  // ────────────────────────────────────────────────────────────
  var usuarios = {
    obtener: function(uid) {
      return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid).get()
        .then(function(doc) {
          if (!doc.exists) return null;
          return Object.assign({ uid: doc.id }, doc.data());
        });
    },

    actualizar: function(uid, datos) {
      return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid).update(datos);
    },

    listarProfesores: function() {
      return EL_DB.collection(EL_COLLECTIONS.USERS)
        .where('role', '==', EL_ROLES.PROFESOR)
        .orderBy('nombre', 'asc')
        .get()
        .then(function(snap) {
          var lista = [];
          snap.forEach(function(doc) { lista.push(Object.assign({ uid: doc.id }, doc.data())); });
          return lista;
        });
    },

    listarTodos: function() {
      return EL_DB.collection(EL_COLLECTIONS.USERS)
        .orderBy('nombre', 'asc')
        .get()
        .then(function(snap) {
          var lista = [];
          snap.forEach(function(doc) { lista.push(Object.assign({ uid: doc.id }, doc.data())); });
          return lista;
        });
    },

    // Escuchar cambios en tiempo real de un usuario
    escuchar: function(uid, callback) {
      return EL_DB.collection(EL_COLLECTIONS.USERS).doc(uid)
        .onSnapshot(function(doc) {
          if (doc.exists) callback(Object.assign({ uid: doc.id }, doc.data()));
        });
    }
  };

  // ────────────────────────────────────────────────────────────
  //  CÓDIGOS DE ACCESO
  // ────────────────────────────────────────────────────────────
  var codigos = {
    crear: function(data) {
      var codigo = {
        codigo:    data.codigo || _generarCodigo(),
        role:      data.role || EL_ROLES.ESTUDIANTE,
        curso:     data.curso || '',
        asignatura:data.asignatura || '',
        usado:     false,
        creadoEn:  new Date().toISOString(),
        creadoPor: ELAuth.user ? ELAuth.user.email : 'admin'
      };
      return EL_DB.collection(EL_COLLECTIONS.CODIGOS).add(codigo)
        .then(function(ref) { return Object.assign({ id: ref.id }, codigo); });
    },

    validar: function(codigoStr) {
      return EL_DB.collection(EL_COLLECTIONS.CODIGOS)
        .where('codigo', '==', codigoStr)
        .where('usado', '==', false)
        .get()
        .then(function(snap) {
          if (snap.empty) throw new Error('Código inválido o ya utilizado.');
          var doc = snap.docs[0];
          return Object.assign({ id: doc.id }, doc.data());
        });
    },

    marcarUsado: function(id, uid) {
      return EL_DB.collection(EL_COLLECTIONS.CODIGOS).doc(id).update({
        usado:    true,
        usadoPor: uid,
        usadoEn:  new Date().toISOString()
      });
    },

    listar: function() {
      return EL_DB.collection(EL_COLLECTIONS.CODIGOS)
        .orderBy('creadoEn', 'desc')
        .get()
        .then(function(snap) {
          var lista = [];
          snap.forEach(function(doc) { lista.push(Object.assign({ id: doc.id }, doc.data())); });
          return lista;
        });
    }
  };

  function _generarCodigo() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var code = 'EL-';
    for (var i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // ────────────────────────────────────────────────────────────
  //  MIGRACIÓN DESDE LOCALSTORAGE (herramienta de transición)
  // ────────────────────────────────────────────────────────────
  var migracion = {
    /**
     * Migrar datos de localStorage a Firestore.
     * Ejecutar una sola vez después de configurar Firebase.
     */
    ejecutar: function() {
      var promesas = [];

      // Migrar materiales
      try {
        var mats = JSON.parse(localStorage.getItem('electrolearn_materiales') || '[]');
        mats.forEach(function(m) {
          promesas.push(
            EL_DB.collection(EL_COLLECTIONS.MATERIALES).add(Object.assign(m, {
              activo: true,
              migrado: true,
              publicadoEn: EL_DB.FieldValue.serverTimestamp()
            }))
          );
        });
      } catch(e) { console.warn('[ELDB] Error migrando materiales:', e); }

      // Migrar planificaciones
      try {
        var plans = JSON.parse(localStorage.getItem('electrolearn_planificaciones') || '[]');
        plans.forEach(function(p) {
          promesas.push(
            EL_DB.collection(EL_COLLECTIONS.PLANIFICACIONES).add(Object.assign(p, {
              activo: true,
              migrado: true,
              publicadoEn: EL_DB.FieldValue.serverTimestamp()
            }))
          );
        });
      } catch(e) { console.warn('[ELDB] Error migrando planificaciones:', e); }

      return Promise.all(promesas).then(function() {
        console.log('[ELDB] Migración completada: ' + promesas.length + ' documentos.');
        return promesas.length;
      });
    }
  };

  // ────────────────────────────────────────────────────────────
  //  RECURSOS CURRICULARES
  // ────────────────────────────────────────────────────────────
  var recursos = {
    guardar: function(data) {
      var entrada = Object.assign({}, data, {
        creadoEn: new Date().toISOString(),
        activo:   true
      });
      return EL_DB.collection(EL_COLLECTIONS.RECURSOS).add(entrada)
        .then(function(ref) { return Object.assign({ id: ref.id }, entrada); });
    },

    listar: function(filtros) {
      filtros = filtros || {};
      var query = EL_DB.collection(EL_COLLECTIONS.RECURSOS).where('activo', '==', true);
      if (filtros.tipoEns)    query = query.where('tipoEns',     '==', filtros.tipoEns);
      if (filtros.modulo)     query = query.where('modulo',      '==', filtros.modulo);
      if (filtros.especialidad) query = query.where('especialidad', '==', filtros.especialidad);
      return query.orderBy('creadoEn', 'desc').get()
        .then(function(snap) {
          var items = [];
          snap.forEach(function(doc) { items.push(Object.assign({ id: doc.id }, doc.data())); });
          return items;
        });
    },

    eliminar: function(id) {
      return EL_DB.collection(EL_COLLECTIONS.RECURSOS).doc(id).update({ activo: false });
    }
  };

  // ────────────────────────────────────────────────────────────
  //  LICEOS / COLEGIOS
  //  Documentos con id = slug (ej: 'salesianos-talca').
  //  Shape: { slug, nombre, rbd, comuna, region, dependencia,
  //           logoPath, alias[], activo, creadoEn, actualizadoEn,
  //           creadoPor }
  // ────────────────────────────────────────────────────────────
  var liceos = {
    /**
     * Lista todos los liceos. Si incluirInactivos=false (default),
     * filtra solo activos.
     */
    listar: function (incluirInactivos) {
      // NOTA: evitamos where('activo','==',true) porque en Firestore REST
      // a veces devuelve vacío si el campo no es estrictamente boolean,
      // o si falta un índice. Traemos TODO y filtramos en JS.
      var query = EL_DB.collection(EL_COLLECTIONS.LICEOS).orderBy('nombre', 'asc');
      return query.get()
        .then(function (snap) {
          var items = [];
          snap.forEach(function (doc) {
            items.push(Object.assign({ slug: doc.id }, doc.data()));
          });
          if (!incluirInactivos) {
            items = items.filter(function (l) { return l && l.activo !== false; });
          }
          return items;
        })
        .catch(function (err) {
          console.warn('[ELDB.liceos] No se pudo listar:', err && err.message);
          return [];
        });
    },

    /** Devuelve un liceo por slug o null si no existe. */
    obtener: function (slug) {
      if (!slug) return Promise.resolve(null);
      return EL_DB.collection(EL_COLLECTIONS.LICEOS).doc(slug).get()
        .then(function (doc) {
          if (!doc.exists) return null;
          return Object.assign({ slug: doc.id }, doc.data());
        })
        .catch(function (err) {
          console.warn('[ELDB.liceos] obtener', slug, err && err.message);
          return null;
        });
    },

    /**
     * Crea o sobrescribe un liceo. Usa el slug como ID del doc.
     * data: { slug, nombre, rbd?, comuna?, region?, dependencia?, logoPath?, alias? }
     */
    crear: function (data) {
      if (!data || !data.slug || !data.nombre) {
        return Promise.reject(new Error('slug y nombre son obligatorios'));
      }
      var slug = String(data.slug).trim().toLowerCase();
      var entrada = {
        slug:          slug,
        nombre:        String(data.nombre).trim(),
        rbd:           data.rbd          || '',
        comuna:        data.comuna       || '',
        region:        data.region       || '',
        dependencia:   data.dependencia  || '',
        logoPath:      data.logoPath     || ('assets/logos/colegios/' + slug + '.png'),
        alias:         Array.isArray(data.alias) ? data.alias : [],
        activo:        data.activo !== false,
        creadoEn:      new Date().toISOString(),
        actualizadoEn: new Date().toISOString(),
        creadoPor:     (window.ELAuth && window.ELAuth.user) ? window.ELAuth.user.email : 'admin'
      };
      return EL_DB.collection(EL_COLLECTIONS.LICEOS).doc(slug).set(entrada)
        .then(function () { return entrada; });
    },

    /** Actualiza campos de un liceo existente. */
    actualizar: function (slug, datos) {
      if (!slug) return Promise.reject(new Error('slug requerido'));
      var patch = Object.assign({}, datos, {
        actualizadoEn: new Date().toISOString()
      });
      // Nunca permitir cambiar el slug por update (es la id del doc)
      delete patch.slug;
      return EL_DB.collection(EL_COLLECTIONS.LICEOS).doc(slug).update(patch);
    },

    /** Soft delete: marca activo=false. */
    eliminar: function (slug) {
      if (!slug) return Promise.reject(new Error('slug requerido'));
      return EL_DB.collection(EL_COLLECTIONS.LICEOS).doc(slug).update({
        activo:        false,
        actualizadoEn: new Date().toISOString()
      });
    },

    /** Restaurar un liceo desactivado. */
    restaurar: function (slug) {
      if (!slug) return Promise.reject(new Error('slug requerido'));
      return EL_DB.collection(EL_COLLECTIONS.LICEOS).doc(slug).update({
        activo:        true,
        actualizadoEn: new Date().toISOString()
      });
    },

    /** Helper: convierte un texto libre a slug normalizado. */
    slugify: function (s) {
      return String(s || '')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }
  };

  // ============================================================
  //  ACTIVIDAD \u2014 audit log de eventos por usuario
  //
  //  Schema de cada documento:
  //    {
  //      uid, userEmail, userNombre,    // identidad
  //      tipo,                          // 'login' | 'generar_material_ia' | ...
  //      tipoLabel,                     // texto legible para el panel admin
  //      meta: { ... },                 // datos del evento
  //      liceoSlug,                     // si aplica
  //      ip,                            // best-effort (puede quedar vac\u00edo)
  //      ts,                            // ISO 8601
  //      tsNum                          // Date.now() para ordenar
  //    }
  //
  //  El log() es FIRE-AND-FORGET (no bloquea la UI ni propaga errores).
  // ============================================================
  var ACTIVIDAD_TIPOS = {
    'login':                       'Inicio de sesi\u00f3n',
    'logout':                      'Cierre de sesi\u00f3n',
    'login_fallido':               'Intento de login fallido',
    'generar_material_ia':         'Gener\u00f3 material con IA',
    'generar_material_plantilla':  'Gener\u00f3 material con plantilla',
    'generar_pie_adjunta':         'Gener\u00f3 versi\u00f3n PIE adaptada',
    'publicar_biblioteca':         'Public\u00f3 en biblioteca',
    'descargar_word':              'Descarg\u00f3 documento Word',
    'crear_planificacion':         'Cre\u00f3 planificaci\u00f3n',
    'editar_planificacion':        'Edit\u00f3 planificaci\u00f3n',
    'eliminar_planificacion':      'Elimin\u00f3 planificaci\u00f3n',
    'admin_crear_usuario':         'Admin: cre\u00f3 usuario',
    'admin_editar_usuario':        'Admin: edit\u00f3 usuario',
    'admin_eliminar_usuario':      'Admin: elimin\u00f3 usuario',
    'admin_crear_liceo':           'Admin: cre\u00f3 liceo',
    'admin_editar_liceo':          'Admin: edit\u00f3 liceo',
    'admin_generar_codigo':        'Admin: gener\u00f3 c\u00f3digo de acceso',
    'admin_cambiar_apikey':        'Admin: cambi\u00f3 API key IA',
    'visita_pagina':               'Visit\u00f3 p\u00e1gina',
    'alerta_seguridad':            'Alerta de seguridad',
    'sistema_purga':               'Sistema: purga autom\u00e1tica'
  };

  var actividad = {
    /**
     * Registra un evento. Fire-and-forget \u2014 nunca bloquea ni lanza error.
     * @param {string} tipo  Una de las claves de ACTIVIDAD_TIPOS.
     * @param {object} meta  (opcional) datos del evento (cantidad, IDs, etc.)
     */
    log: function (tipo, meta) {
      try {
        if (!EL_DB || !EL_DB.collection) return Promise.resolve(null);
        // ELAuth expone el usuario como `user` (no `usuario`). Fallback al Firebase Auth nativo.
        var user = null;
        try {
          if (typeof ELAuth !== 'undefined' && ELAuth.user) {
            user = ELAuth.user;
          } else if (typeof EL_AUTH !== 'undefined' && EL_AUTH.currentUser) {
            var fb = EL_AUTH.currentUser;
            user = {
              uid: fb.uid,
              email: fb.email || '',
              nombre: fb.displayName || (fb.email ? fb.email.split('@')[0] : '')
            };
          }
        } catch (eUser) { user = null; }
        var nowIso = new Date().toISOString();
        // Derivar nombre: nombre > displayName > parte antes del @ del email
        var _nombreFinal = '';
        if (user) {
          _nombreFinal = user.nombre || user.displayName || '';
          if (!_nombreFinal && user.email) {
            _nombreFinal = String(user.email).split('@')[0]
              .replace(/[._-]+/g, ' ')
              .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
          }
        }
        var entrada = {
          uid:        user ? (user.uid || '') : '',
          userEmail:  user ? (user.email || '') : '',
          userNombre: _nombreFinal,
          tipo:       tipo || 'desconocido',
          tipoLabel:  ACTIVIDAD_TIPOS[tipo] || tipo,
          meta:       meta || {},
          liceoSlug:  (user && user.liceoSlug) ? user.liceoSlug : '',
          ts:         nowIso,
          tsNum:      Date.now()
        };
        return EL_DB.collection(EL_COLLECTIONS.ACTIVIDAD).add(entrada)
          .catch(function (err) {
            // Silencio \u2014 el audit log no debe romper la UX si falla.
            if (typeof console !== 'undefined' && console.warn) {
              console.warn('[ELDB.actividad] log() fall\u00f3:', err && err.message);
            }
            return null;
          });
      } catch (e) {
        return Promise.resolve(null);
      }
    },

    /** Lista eventos con filtros. Solo para admin. */
    listar: function (opts) {
      opts = opts || {};
      var limit = opts.limit || 200;
      var query = EL_DB.collection(EL_COLLECTIONS.ACTIVIDAD).orderBy('tsNum', 'desc');
      // No aplicamos where() en server para evitar \u00edndices compuestos \u2014
      // filtramos en cliente que es m\u00e1s resiliente con el set inicial.
      return query.get()
        .then(function (snap) {
          var items = [];
          snap.forEach(function (doc) {
            items.push(Object.assign({ id: doc.id }, doc.data()));
          });
          // Filtros en cliente
          if (opts.uid)        items = items.filter(function (e) { return e.uid === opts.uid; });
          if (opts.userEmail)  items = items.filter(function (e) { return (e.userEmail || '').toLowerCase().indexOf(opts.userEmail.toLowerCase()) !== -1; });
          if (opts.tipo)       items = items.filter(function (e) { return e.tipo === opts.tipo; });
          if (opts.liceoSlug)  items = items.filter(function (e) { return e.liceoSlug === opts.liceoSlug; });
          if (opts.desde)      items = items.filter(function (e) { return e.tsNum >= opts.desde; });
          if (opts.hasta)      items = items.filter(function (e) { return e.tsNum <= opts.hasta; });
          return items.slice(0, limit);
        })
        .catch(function (err) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn('[ELDB.actividad] listar() fall\u00f3:', err && err.message);
          }
          return [];
        });
    },

    /** Conteo de eventos por tipo (para estad\u00edsticas r\u00e1pidas). */
    estadisticas: function () {
      return EL_DB.collection(EL_COLLECTIONS.ACTIVIDAD).get()
        .then(function (snap) {
          var stats = { total: 0, porTipo: {}, porUsuario: {}, porDia: {} };
          snap.forEach(function (doc) {
            var d = doc.data();
            stats.total++;
            stats.porTipo[d.tipo] = (stats.porTipo[d.tipo] || 0) + 1;
            var key = d.userEmail || d.uid || 'sin-id';
            stats.porUsuario[key] = (stats.porUsuario[key] || 0) + 1;
            var dia = (d.ts || '').substring(0, 10);
            if (dia) stats.porDia[dia] = (stats.porDia[dia] || 0) + 1;
          });
          return stats;
        })
        .catch(function () { return { total: 0, porTipo: {}, porUsuario: {}, porDia: {} }; });
    },

    /**
     * Purga eventos antiguos. Default 90 días para no llenar Firestore.
     * Ejecuta como mucho 1 vez cada 24h (controlado vía localStorage).
     * @param {number} dias  Días de retención (90 por defecto).
     * @param {boolean} forzar  Si true, ignora el throttle de 24h.
     * @returns {Promise<{ borrados:number, omitidos:boolean }>}
     */
    purgar: function (dias, forzar) {
      try {
        dias = (typeof dias === 'number' && dias > 0) ? dias : 90;
        // Throttle: solo 1 vez por día
        if (!forzar && typeof localStorage !== 'undefined') {
          var ultimaPurga = parseInt(localStorage.getItem('cc_purga_actividad_ts') || '0', 10);
          var unDia = 24 * 60 * 60 * 1000;
          if (ultimaPurga && (Date.now() - ultimaPurga) < unDia) {
            return Promise.resolve({ borrados: 0, omitidos: true });
          }
        }
        var corteTs = Date.now() - (dias * 24 * 60 * 60 * 1000);
        var coll = EL_DB.collection(EL_COLLECTIONS.ACTIVIDAD);
        // Limitamos a 500 docs por pase (Firestore batch max + cuota gentil)
        return coll.orderBy('tsNum', 'asc').get().then(function (snap) {
          var batch = []; var total = 0;
          snap.forEach(function (doc) {
            var d = doc.data();
            if (d && typeof d.tsNum === 'number' && d.tsNum < corteTs && total < 500) {
              batch.push(coll.doc(doc.id).delete().catch(function(){}));
              total++;
            }
          });
          if (total === 0) {
            try { localStorage.setItem('cc_purga_actividad_ts', String(Date.now())); } catch(e){}
            return { borrados: 0, omitidos: false };
          }
          return Promise.all(batch).then(function () {
            try { localStorage.setItem('cc_purga_actividad_ts', String(Date.now())); } catch(e){}
            // Registrar en el propio audit log
            try {
              actividad.log('sistema_purga', { borrados: total, diasRetencion: dias });
            } catch(e){}
            return { borrados: total, omitidos: false };
          });
        }).catch(function (err) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn('[ELDB.actividad] purgar() falló:', err && err.message);
          }
          return { borrados: 0, omitidos: false, error: err && err.message };
        });
      } catch (e) {
        return Promise.resolve({ borrados: 0, omitidos: false, error: e && e.message });
      }
    },

    /**
     * Detecta brute-force de login: si un mismo email tiene >= umbral
     * intentos fallidos en ventana de tiempo, registra una alerta_seguridad.
     * Llamar después de log('login_fallido').
     * @param {string} email
     * @param {object} opts  { umbral=10, ventanaMin=15 }
     * @returns {Promise<{ alerta:boolean, intentos:number }>}
     */
    chequeoBruteForce: function (email, opts) {
      try {
        if (!email) return Promise.resolve({ alerta: false, intentos: 0 });
        opts = opts || {};
        var umbral = opts.umbral || 10;
        var ventanaMs = (opts.ventanaMin || 15) * 60 * 1000;
        var desde = Date.now() - ventanaMs;
        var emailLow = email.toLowerCase();
        return EL_DB.collection(EL_COLLECTIONS.ACTIVIDAD)
          .orderBy('tsNum', 'desc').get()
          .then(function (snap) {
            var intentos = 0;
            var rachaVigente = true; // contamos sólo la racha consecutiva más reciente
            // snap viene desc por tsNum: el más reciente primero
            snap.forEach(function (doc) {
              if (!rachaVigente) return;
              var d = doc.data();
              if (!d || d.tsNum < desde) { rachaVigente = false; return; }
              if ((d.userEmail || '').toLowerCase() !== emailLow) return;
              if (d.tipo === 'login_fallido') {
                intentos++;
              } else if (d.tipo === 'login') {
                // Login exitoso rompe la racha
                rachaVigente = false;
              }
            });
            if (intentos >= umbral) {
              // Registrar alerta (fire-and-forget pero retornamos el flag)
              try {
                actividad.log('alerta_seguridad', {
                  motivo: 'brute_force_login',
                  emailObjetivo: email,
                  intentos: intentos,
                  ventanaMin: opts.ventanaMin || 15
                });
              } catch(e){}
              return { alerta: true, intentos: intentos };
            }
            return { alerta: false, intentos: intentos };
          })
          .catch(function () { return { alerta: false, intentos: 0 }; });
      } catch (e) {
        return Promise.resolve({ alerta: false, intentos: 0 });
      }
    },

    /** Lista alertas de seguridad activas (no atendidas) en últimas 24h. */
    listarAlertas: function (horas) {
      horas = horas || 24;
      var desde = Date.now() - (horas * 60 * 60 * 1000);
      return EL_DB.collection(EL_COLLECTIONS.ACTIVIDAD)
        .orderBy('tsNum', 'desc').get()
        .then(function (snap) {
          var items = [];
          snap.forEach(function (doc) {
            var d = doc.data();
            if (d && d.tipo === 'alerta_seguridad' && d.tsNum >= desde) {
              items.push(Object.assign({ id: doc.id }, d));
            }
          });
          return items;
        })
        .catch(function () { return []; });
    },

    /** Tipos disponibles, para el filtro del UI. */
    TIPOS: ACTIVIDAD_TIPOS
  };

  // ────────────────────────────────────────────────────────────
  //  CALENDARIO (eventos del docente)
  //  Colección: calendarios_docentes/{uid}/eventos
  //  Cada evento puede estar vinculado a una planificación o material
  //  mediante (origenTipo, origenId). Si existe un evento con ese par
  //  para el uid, hacemos UPDATE; si no, INSERT.
  // ────────────────────────────────────────────────────────────
  var calendario = {
    /**
     * Crea o actualiza un evento del calendario del docente vinculado a un origen.
     * @param {object} opts
     *   - uid          (string) UID del docente dueño del calendario [obligatorio]
     *   - origenTipo   (string) 'planificacion' | 'material' [obligatorio]
     *   - origenId     (string) ID del documento origen (planificación o material) [obligatorio]
     *   - titulo       (string)
     *   - fecha        (string) 'YYYY-MM-DD'
     *   - hora         (string) 'HH:MM' (opcional)
     *   - tipo         (string) 'planificacion' | 'evaluacion' | 'prueba' | 'guia' | 'otro'
     *   - asignatura   (string)
     *   - descripcion  (string)
     *   - email        (string)
     * @returns {Promise<{id:string, created:boolean}>}
     */
    upsertDesdeOrigen: function (opts) {
      opts = opts || {};
      if (!EL_DB || !EL_DB.collection) return Promise.resolve(null);
      if (!opts.uid || !opts.origenId || !opts.origenTipo) {
        console.warn('[ELDB.calendario] upsertDesdeOrigen: faltan uid/origenId/origenTipo');
        return Promise.resolve(null);
      }
      // Normalizar fecha a YYYY-MM-DD
      var fechaStr = opts.fecha || '';
      if (fechaStr && fechaStr.length > 10) fechaStr = fechaStr.slice(0, 10);
      if (!fechaStr) {
        var hoy = new Date();
        fechaStr = hoy.toISOString().slice(0, 10);
      }
      var nowIso = new Date().toISOString();
      var coll = EL_DB.collection('calendarios_docentes').doc(opts.uid).collection('eventos');

      // Buscar evento existente por (origenTipo, origenId)
      return coll.where('origenId', '==', opts.origenId).get()
        .then(function (snap) {
          var existente = null;
          snap.forEach(function (d) {
            var data = d.data() || {};
            if (data.origenTipo === opts.origenTipo) existente = { id: d.id, data: data };
          });
          var payload = {
            titulo:         opts.titulo || '(sin título)',
            fecha:          fechaStr,
            hora:           opts.hora || '',
            tipo:           opts.tipo || opts.origenTipo,
            asignatura:     opts.asignatura || '',
            descripcion:    opts.descripcion || '',
            uid:            opts.uid,
            email:          opts.email || '',
            origenTipo:     opts.origenTipo,
            origenId:       opts.origenId,
            actualizadoEn:  nowIso
          };
          if (existente) {
            return coll.doc(existente.id).update(payload)
              .then(function () { return { id: existente.id, created: false }; });
          } else {
            payload.creadoEn = nowIso;
            return coll.add(payload)
              .then(function (ref) { return { id: ref.id, created: true }; });
          }
        })
        .catch(function (err) {
          console.warn('[ELDB.calendario] upsertDesdeOrigen falló:', err && err.message);
          return null;
        });
    },

    /**
     * Elimina el evento del calendario vinculado a un origen.
     * No falla si no existe.
     */
    eliminarPorOrigen: function (uid, origenId) {
      if (!EL_DB || !EL_DB.collection || !uid || !origenId) return Promise.resolve(0);
      var coll = EL_DB.collection('calendarios_docentes').doc(uid).collection('eventos');
      return coll.where('origenId', '==', origenId).get()
        .then(function (snap) {
          var dels = [];
          snap.forEach(function (d) { dels.push(coll.doc(d.id).delete()); });
          return Promise.all(dels).then(function () { return dels.length; });
        })
        .catch(function (err) {
          console.warn('[ELDB.calendario] eliminarPorOrigen falló:', err && err.message);
          return 0;
        });
    },

    /** Lista los eventos del calendario de un docente. */
    listar: function (uid) {
      if (!EL_DB || !uid) return Promise.resolve([]);
      return EL_DB.collection('calendarios_docentes').doc(uid).collection('eventos').get()
        .then(function (snap) {
          var items = [];
          snap.forEach(function (d) { items.push(Object.assign({ id: d.id }, d.data())); });
          return items;
        })
        .catch(function () { return []; });
    }
  };

  return {
    materiales:      materiales,
    planificaciones: planificaciones,
    evaluaciones:    evaluaciones,
    usuarios:        usuarios,
    codigos:         codigos,
    migracion:       migracion,
    recursos:        recursos,
    liceos:          liceos,
    actividad:       actividad,
    calendario:      calendario
  };
})();
