/**
 * firebase-db.js
 * ElectroLearn — Operaciones Firestore (base de datos)
 *
 * Módulos:
 *  - ELDB.materiales   → guardar, listar, eliminar materiales
 *  - ELDB.planificaciones → guardar, listar, eliminar planificaciones
 *  - ELDB.evaluaciones → guardar, listar, ranking
 *  - ELDB.usuarios     → obtener, actualizar perfil
 *  - ELDB.codigos      → códigos de acceso
 */

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
      var query = EL_DB.collection(EL_COLLECTIONS.MATERIALES).where('activo', '==', true);

      if (filtros.profesor)    query = query.where('email',       '==', filtros.profesor);
      if (filtros.modulo)      query = query.where('modulo',      '==', filtros.modulo);
      if (filtros.tipo)        query = query.where('tipo',        '==', filtros.tipo);
      if (filtros.curso)       query = query.where('curso',       '==', filtros.curso);
      if (filtros.asignatura)  query = query.where('asignatura',  '==', filtros.asignatura);
      if (filtros.especialidad)query = query.where('especialidad','==', filtros.especialidad);

      return query.orderBy('publicadoEn', 'desc').get()
        .then(function(snap) {
          var items = [];
          snap.forEach(function(doc) { items.push(Object.assign({ id: doc.id }, doc.data())); });
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
      // Soft delete
      return EL_DB.collection(EL_COLLECTIONS.MATERIALES).doc(id).update({ activo: false });
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
      var query = EL_DB.collection(EL_COLLECTIONS.PLANIFICACIONES).where('activo', '==', true);

      if (filtros.profesor)    query = query.where('email',    '==', filtros.profesor);
      if (filtros.modulo)      query = query.where('modulo',   '==', filtros.modulo);
      if (filtros.asignatura)  query = query.where('asignatura','==', filtros.asignatura);
      if (filtros.mes) {
        var inicio = new Date(filtros.mes + '-01').toISOString();
        var fin    = new Date(filtros.mes + '-31').toISOString();
        query = query.where('fechaClase', '>=', inicio).where('fechaClase', '<=', fin);
      }

      return query.orderBy('publicadoEn', 'desc').get()
        .then(function(snap) {
          var items = [];
          snap.forEach(function(doc) { items.push(Object.assign({ id: doc.id }, doc.data())); });
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
      return EL_DB.collection(EL_COLLECTIONS.PLANIFICACIONES).doc(id).update({ activo: false });
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
      var query = EL_DB.collection(EL_COLLECTIONS.LICEOS);
      if (!incluirInactivos) query = query.where('activo', '==', true);
      return query.orderBy('nombre', 'asc').get()
        .then(function (snap) {
          var items = [];
          snap.forEach(function (doc) {
            items.push(Object.assign({ slug: doc.id }, doc.data()));
          });
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

  return {
    materiales:      materiales,
    planificaciones: planificaciones,
    evaluaciones:    evaluaciones,
    usuarios:        usuarios,
    codigos:         codigos,
    migracion:       migracion,
    recursos:        recursos,
    liceos:          liceos
  };
})();
