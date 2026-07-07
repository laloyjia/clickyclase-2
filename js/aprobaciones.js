/**
 * aprobaciones.js — Click&Clase
 *
 * Módulo de flujo de aprobación para materiales, planificaciones y
 * evaluaciones. Estados:
 *
 *   borrador → enviada → en_revision → aprobada
 *                                    ↘ devuelta → borrador (retomar)
 *
 * El docente crea en `borrador`, envía a revisión (pasa a `enviada`).
 * El encargado la toma (`en_revision`) y decide: aprobar (`aprobada`) o
 * devolver con observaciones (`devuelta`). Si vuelve devuelta, el docente
 * puede retomarla, editarla y reenviarla.
 *
 * Cada cambio agrega un evento al `historial[]` para trazabilidad.
 *
 * Dependencias globales:
 *   - EL_DB (firebase-rest.js)
 *   - ELAuth / ELDB (firebase-auth.js / firebase-db.js)
 *   - CCRoles (roles-permissions.js)
 */

(function () {
  'use strict';

  // ─── Estados posibles ───────────────────────────────────────
  var ESTADOS = {
    BORRADOR:     'borrador',
    ENVIADA:      'enviada',
    EN_REVISION:  'en_revision',
    APROBADA:     'aprobada',
    DEVUELTA:     'devuelta'
  };

  // ─── Acciones del historial ─────────────────────────────────
  var ACCIONES = {
    CREACION:      'creacion',
    ENVIO:         'envio',
    REENVIO:       'reenvio',
    INICIO_REV:    'inicio_revision',
    APROBACION:    'aprobacion',
    DEVOLUCION:    'devolucion',
    RETOMAR:       'retomar_borrador',
    REABRIR:       'reabrir'   // admin/director puede reabrir una aprobada
  };

  // ─── Colecciones donde aplica el flujo ──────────────────────
  var COLECCIONES_APROBABLES = ['materiales','planificaciones','evaluaciones'];

  // ─── Etiquetas UI ───────────────────────────────────────────
  var ESTADO_LABELS = {
    borrador:     'Borrador',
    enviada:      'Enviada a revisión',
    en_revision:  'En revisión',
    aprobada:     'Aprobada',
    devuelta:     'Devuelta con observaciones'
  };

  var ESTADO_COLORS = {
    borrador:     { fg: '#94a3b8', bg: 'rgba(148,163,184,.12)', border: 'rgba(148,163,184,.35)' },
    enviada:      { fg: '#67e8f9', bg: 'rgba(34,211,238,.12)',  border: 'rgba(34,211,238,.35)'  },
    en_revision:  { fg: '#fbbf24', bg: 'rgba(251,191,36,.12)',  border: 'rgba(251,191,36,.35)'  },
    aprobada:     { fg: '#86efac', bg: 'rgba(34,197,94,.12)',   border: 'rgba(34,197,94,.35)'   },
    devuelta:     { fg: '#fca5a5', bg: 'rgba(239,68,68,.12)',   border: 'rgba(239,68,68,.35)'   }
  };

  var ACCION_LABELS = {
    creacion:         'Creó el documento',
    envio:            'Envió a revisión',
    reenvio:          'Reenvió a revisión (tras devolución)',
    inicio_revision:  'Inició revisión',
    aprobacion:       'Aprobó',
    devolucion:       'Devolvió con observaciones',
    retomar_borrador: 'Retomó como borrador',
    reabrir:          'Reabrió el documento aprobado'
  };

  // ─── Helpers ────────────────────────────────────────────────

  function _uidActual() {
    return (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : '';
  }
  function _userActual() {
    return (window.ELAuth && ELAuth.user) ? ELAuth.user : null;
  }
  function _nombreActual() {
    var u = _userActual();
    if (!u) return '';
    return u.nombre || u.displayName || (u.email ? u.email.split('@')[0] : '');
  }

  function _validarColeccion(nombre) {
    if (COLECCIONES_APROBABLES.indexOf(nombre) === -1) {
      throw new Error('Colección no soportada por aprobaciones: ' + nombre);
    }
  }

  function _nuevoEvento(accion, comentario) {
    var u = _userActual() || {};
    return {
      fecha:       new Date().toISOString(),
      quienUid:    u.uid || '',
      quienEmail:  u.email || '',
      quienNombre: _nombreActual(),
      accion:      accion,
      comentario:  comentario || ''
    };
  }

  function _actividadLog(tipo, meta) {
    try {
      if (window.ELDB && ELDB.actividad && ELDB.actividad.log) {
        ELDB.actividad.log(tipo, meta || {});
      }
    } catch (e) { /* silencio */ }
  }

  // ─── Operaciones sobre un documento ─────────────────────────

  /**
   * Marca un documento nuevo con el estado inicial `borrador` y agrega
   * el primer evento del historial. Se llama al momento de guardar por
   * primera vez desde el generador de material/planificación.
   *
   * @param {object} datos  El objeto que se va a guardar en Firestore
   * @returns {object}      El mismo objeto con campos de aprobación agregados
   */
  function marcarComoBorrador(datos) {
    datos = datos || {};
    var u = _userActual() || {};
    datos.estado = ESTADOS.BORRADOR;
    datos.estadoFecha = new Date().toISOString();
    datos.autorUid = datos.autorUid || datos.uid || u.uid || '';
    datos.autorNombre = datos.autorNombre || _nombreActual();
    datos.autorEmail = datos.autorEmail || u.email || '';
    datos.liceoSlug = datos.liceoSlug || u.liceoSlug || u.liceoPrincipal || '';
    datos.historial = datos.historial || [];
    if (datos.historial.length === 0) {
      datos.historial.push(_nuevoEvento(ACCIONES.CREACION));
    }
    return datos;
  }

  /**
   * El autor envía el documento a revisión. Estado pasa a `enviada`.
   * Si venía de `devuelta`, es un reenvío.
   *
   * @param {string} coleccion   'materiales' | 'planificaciones' | 'evaluaciones'
   * @param {string} docId
   * @param {string} comentarioAutor  Comentario opcional al enviar
   * @returns Promise<void>
   */
  function enviarARevision(coleccion, docId, comentarioAutor) {
    _validarColeccion(coleccion);
    var ref = EL_DB.collection(coleccion).doc(docId);
    return ref.get().then(function (snap) {
      if (!snap.exists) throw new Error('Documento no encontrado');
      var d = snap.data() || {};
      var esReenvio = (d.estado === ESTADOS.DEVUELTA);
      var estadoActual = d.estado || ESTADOS.BORRADOR;
      if (estadoActual !== ESTADOS.BORRADOR && estadoActual !== ESTADOS.DEVUELTA) {
        throw new Error('Solo se puede enviar desde borrador o devuelta. Estado actual: ' + estadoActual);
      }
      if (d.autorUid && d.autorUid !== _uidActual()) {
        throw new Error('Solo el autor puede enviar el documento a revisión');
      }
      var historial = Array.isArray(d.historial) ? d.historial.slice() : [];
      historial.push(_nuevoEvento(esReenvio ? ACCIONES.REENVIO : ACCIONES.ENVIO, comentarioAutor));
      var update = {
        estado:        ESTADOS.ENVIADA,
        estadoFecha:   new Date().toISOString(),
        enviadoEn:     d.enviadoEn || new Date().toISOString(),
        reenviadoEn:   esReenvio ? new Date().toISOString() : (d.reenviadoEn || null),
        historial:     historial,
        // Al reenviar limpiamos observaciones anteriores para que quede claro
        ultimasObservaciones: esReenvio ? '' : (d.ultimasObservaciones || '')
      };
      return ref.update(update).then(function () {
        _actividadLog('envio_revision', {
          coleccion: coleccion, docId: docId,
          reenvio: esReenvio,
          liceoSlug: d.liceoSlug || ''
        });
      });
    });
  }

  /**
   * El revisor toma la responsabilidad del documento. Estado pasa a
   * `en_revision`. Marca al revisor.
   */
  function iniciarRevision(coleccion, docId) {
    _validarColeccion(coleccion);
    var ref = EL_DB.collection(coleccion).doc(docId);
    return ref.get().then(function (snap) {
      if (!snap.exists) throw new Error('Documento no encontrado');
      var d = snap.data() || {};
      if (d.estado !== ESTADOS.ENVIADA) {
        throw new Error('Solo se puede iniciar revisión sobre un doc enviado. Estado: ' + d.estado);
      }
      var u = _userActual() || {};
      if (window.CCRoles && !CCRoles.puedeAprobarMaterial(u)) {
        throw new Error('No tenés permiso para revisar material');
      }
      var historial = Array.isArray(d.historial) ? d.historial.slice() : [];
      historial.push(_nuevoEvento(ACCIONES.INICIO_REV));
      var update = {
        estado:         ESTADOS.EN_REVISION,
        estadoFecha:    new Date().toISOString(),
        revisorUid:     u.uid || '',
        revisorEmail:   u.email || '',
        revisorNombre:  _nombreActual(),
        historial:      historial
      };
      return ref.update(update);
    });
  }

  /**
   * El revisor aprueba el documento. Estado pasa a `aprobada`.
   * @param {string} comentario  Comentario opcional del revisor
   */
  function aprobar(coleccion, docId, comentario) {
    _validarColeccion(coleccion);
    var ref = EL_DB.collection(coleccion).doc(docId);
    return ref.get().then(function (snap) {
      if (!snap.exists) throw new Error('Documento no encontrado');
      var d = snap.data() || {};
      if (d.estado !== ESTADOS.EN_REVISION && d.estado !== ESTADOS.ENVIADA) {
        throw new Error('Solo se puede aprobar desde enviada o en_revision. Estado: ' + d.estado);
      }
      var u = _userActual() || {};
      if (window.CCRoles && !CCRoles.puedeAprobarMaterial(u)) {
        throw new Error('No tenés permiso para aprobar material');
      }
      var historial = Array.isArray(d.historial) ? d.historial.slice() : [];
      historial.push(_nuevoEvento(ACCIONES.APROBACION, comentario));
      var update = {
        estado:         ESTADOS.APROBADA,
        estadoFecha:    new Date().toISOString(),
        aprobadoEn:     new Date().toISOString(),
        revisorUid:     u.uid || '',
        revisorEmail:   u.email || '',
        revisorNombre:  _nombreActual(),
        historial:      historial
      };
      return ref.update(update).then(function () {
        _actividadLog('aprobacion_material', {
          coleccion: coleccion, docId: docId,
          liceoSlug: d.liceoSlug || '',
          autorUid: d.autorUid || ''
        });
      });
    });
  }

  /**
   * El revisor devuelve el documento con observaciones. Estado pasa a
   * `devuelta`. Las observaciones quedan en `ultimasObservaciones` y en
   * el historial.
   * @param {string} observaciones  Comentario del revisor (obligatorio)
   */
  function devolver(coleccion, docId, observaciones) {
    _validarColeccion(coleccion);
    observaciones = (observaciones || '').trim();
    if (!observaciones) throw new Error('Las observaciones son obligatorias al devolver');
    var ref = EL_DB.collection(coleccion).doc(docId);
    return ref.get().then(function (snap) {
      if (!snap.exists) throw new Error('Documento no encontrado');
      var d = snap.data() || {};
      if (d.estado !== ESTADOS.EN_REVISION && d.estado !== ESTADOS.ENVIADA) {
        throw new Error('Solo se puede devolver desde enviada o en_revision');
      }
      var u = _userActual() || {};
      if (window.CCRoles && !CCRoles.puedeAprobarMaterial(u)) {
        throw new Error('No tenés permiso para devolver material');
      }
      var historial = Array.isArray(d.historial) ? d.historial.slice() : [];
      historial.push(_nuevoEvento(ACCIONES.DEVOLUCION, observaciones));
      var update = {
        estado:                 ESTADOS.DEVUELTA,
        estadoFecha:            new Date().toISOString(),
        devueltoEn:             new Date().toISOString(),
        revisorUid:             u.uid || '',
        revisorNombre:          _nombreActual(),
        ultimasObservaciones:   observaciones,
        historial:              historial
      };
      return ref.update(update).then(function () {
        _actividadLog('devolucion_material', {
          coleccion: coleccion, docId: docId,
          liceoSlug: d.liceoSlug || '',
          autorUid: d.autorUid || ''
        });
      });
    });
  }

  /**
   * El autor retoma un doc devuelto y lo vuelve a `borrador` para editarlo.
   */
  function retomarBorrador(coleccion, docId) {
    _validarColeccion(coleccion);
    var ref = EL_DB.collection(coleccion).doc(docId);
    return ref.get().then(function (snap) {
      if (!snap.exists) throw new Error('Documento no encontrado');
      var d = snap.data() || {};
      if (d.estado !== ESTADOS.DEVUELTA) {
        throw new Error('Solo se puede retomar un documento devuelto');
      }
      if (d.autorUid && d.autorUid !== _uidActual()) {
        throw new Error('Solo el autor puede retomar el documento');
      }
      var historial = Array.isArray(d.historial) ? d.historial.slice() : [];
      historial.push(_nuevoEvento(ACCIONES.RETOMAR));
      var update = {
        estado:       ESTADOS.BORRADOR,
        estadoFecha:  new Date().toISOString(),
        historial:    historial
      };
      return ref.update(update).then(function () {
        _actividadLog('retomar_borrador', {
          coleccion: coleccion, docId: docId,
          liceoSlug: d.liceoSlug || ''
        });
      });
    });
  }

  /**
   * Admin o directivo puede reabrir un documento aprobado (por si hay
   * un error y hay que corregir después de haberlo aprobado).
   */
  function reabrir(coleccion, docId, motivo) {
    _validarColeccion(coleccion);
    motivo = (motivo || '').trim();
    if (!motivo) throw new Error('El motivo de reapertura es obligatorio');
    var ref = EL_DB.collection(coleccion).doc(docId);
    return ref.get().then(function (snap) {
      if (!snap.exists) throw new Error('Documento no encontrado');
      var d = snap.data() || {};
      if (d.estado !== ESTADOS.APROBADA) {
        throw new Error('Solo se puede reabrir un documento aprobado');
      }
      var u = _userActual() || {};
      if (window.CCRoles && !CCRoles.esAdminPlataforma(u) && !CCRoles.esDirectivo(u)) {
        throw new Error('Solo admin o directivo puede reabrir un documento aprobado');
      }
      var historial = Array.isArray(d.historial) ? d.historial.slice() : [];
      historial.push(_nuevoEvento(ACCIONES.REABRIR, motivo));
      var update = {
        estado:       ESTADOS.EN_REVISION,
        estadoFecha:  new Date().toISOString(),
        historial:    historial
      };
      return ref.update(update);
    });
  }

  // ─── Listados para bandejas ─────────────────────────────────

  /**
   * Lista los documentos pendientes de revisión (estados `enviada` o
   * `en_revision`) del liceo del revisor. Para la bandeja del revisor.
   *
   * @param {object} opts   { liceoSlug, limit=100, coleccion? }
   * @returns Promise<Array>  Array plano de docs con { coleccion, id, ...data }
   */
  function listarPendientesRevision(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug || '';
    if (!liceoSlug) {
      var u = _userActual() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    var colecciones = opts.coleccion ? [opts.coleccion] : COLECCIONES_APROBABLES;
    var promesas = colecciones.map(function (col) {
      return EL_DB.collection(col).get().then(function (snap) {
        var items = [];
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          // Filtrar por liceo y estado
          var esPendiente = (d.estado === ESTADOS.ENVIADA || d.estado === ESTADOS.EN_REVISION);
          var esMismoLiceo = (!liceoSlug) || (d.liceoSlug === liceoSlug);
          if (esPendiente && esMismoLiceo) {
            items.push(Object.assign({ coleccion: col, id: doc.id }, d));
          }
        });
        return items;
      }).catch(function () { return []; });
    });
    return Promise.all(promesas).then(function (arrs) {
      var todo = [].concat.apply([], arrs);
      todo.sort(function (a, b) {
        return String(b.estadoFecha || '').localeCompare(String(a.estadoFecha || ''));
      });
      return todo.slice(0, opts.limit || 100);
    });
  }

  /**
   * Lista los envíos del docente autenticado (todos sus documentos con
   * estado != borrador). Para el panel del profesor.
   */
  function listarMisEnvios(opts) {
    opts = opts || {};
    var uid = opts.uid || _uidActual();
    if (!uid) return Promise.resolve([]);
    var colecciones = opts.coleccion ? [opts.coleccion] : COLECCIONES_APROBABLES;
    var promesas = colecciones.map(function (col) {
      return EL_DB.collection(col).get().then(function (snap) {
        var items = [];
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (d.autorUid === uid && d.estado && d.estado !== ESTADOS.BORRADOR) {
            items.push(Object.assign({ coleccion: col, id: doc.id }, d));
          }
        });
        return items;
      }).catch(function () { return []; });
    });
    return Promise.all(promesas).then(function (arrs) {
      var todo = [].concat.apply([], arrs);
      todo.sort(function (a, b) {
        return String(b.estadoFecha || '').localeCompare(String(a.estadoFecha || ''));
      });
      return todo.slice(0, opts.limit || 100);
    });
  }

  /**
   * Estadísticas para dashboard de UTP: cuántos docs por estado en su liceo.
   */
  function estadisticasLiceo(liceoSlug) {
    if (!liceoSlug) {
      var u = _userActual() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    var promesas = COLECCIONES_APROBABLES.map(function (col) {
      return EL_DB.collection(col).get().then(function (snap) {
        var stats = { borrador: 0, enviada: 0, en_revision: 0, aprobada: 0, devuelta: 0, sin_estado: 0 };
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          var est = d.estado || 'sin_estado';
          if (!(est in stats)) stats[est] = 0;
          stats[est]++;
        });
        return { coleccion: col, stats: stats };
      }).catch(function () { return { coleccion: col, stats: {} }; });
    });
    return Promise.all(promesas);
  }

  // ─── Helpers de UI ──────────────────────────────────────────

  function getEstadoLabel(estado) {
    return ESTADO_LABELS[estado] || 'Sin estado';
  }

  function getEstadoBadgeHTML(estado) {
    var c = ESTADO_COLORS[estado] || ESTADO_COLORS.borrador;
    var lbl = getEstadoLabel(estado);
    return '<span style="display:inline-block;padding:3px 10px;border-radius:999px;' +
           'background:' + c.bg + ';color:' + c.fg + ';border:1px solid ' + c.border + ';' +
           'font-size:.72rem;font-weight:600;letter-spacing:.5px;text-transform:uppercase">' +
           lbl + '</span>';
  }

  function getAccionLabel(accion) {
    return ACCION_LABELS[accion] || accion;
  }

  /**
   * Renderiza el historial de un documento como HTML.
   */
  function renderHistorialHTML(historial) {
    if (!Array.isArray(historial) || !historial.length) {
      return '<p style="color:var(--muted);font-style:italic;font-size:.85rem">Sin historial</p>';
    }
    var items = historial.slice().reverse().map(function (h) {
      var d = new Date(h.fecha);
      var fecha = isNaN(d) ? h.fecha : d.toLocaleString('es-CL', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
      var quien = h.quienNombre || h.quienEmail || 'usuario';
      var accion = getAccionLabel(h.accion);
      var coment = h.comentario ? ('<div style="font-size:.82rem;color:var(--muted);margin-top:4px;font-style:italic">"' + _esc(h.comentario) + '"</div>') : '';
      return '<div style="padding:8px 12px;border-left:2px solid rgba(148,163,184,.3);margin-bottom:8px">' +
             '<div style="font-size:.85rem"><strong>' + _esc(quien) + '</strong> — ' + _esc(accion) + '</div>' +
             '<div style="font-size:.72rem;color:var(--muted)">' + _esc(fecha) + '</div>' +
             coment + '</div>';
    });
    return items.join('');
  }

  function _esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ─── Wrappers convenience ───────────────────────────────────

  var _wrap = {};
  COLECCIONES_APROBABLES.forEach(function (col) {
    _wrap[col] = {
      enviarARevision:    function (id, comentario) { return enviarARevision(col, id, comentario); },
      iniciarRevision:    function (id)            { return iniciarRevision(col, id); },
      aprobar:            function (id, coment)    { return aprobar(col, id, coment); },
      devolver:           function (id, obs)       { return devolver(col, id, obs); },
      retomarBorrador:    function (id)            { return retomarBorrador(col, id); },
      reabrir:            function (id, motivo)    { return reabrir(col, id, motivo); }
    };
  });

  // ─── API pública ────────────────────────────────────────────
  window.CCAprobaciones = {
    // Constantes
    ESTADOS:                   ESTADOS,
    ACCIONES:                  ACCIONES,
    COLECCIONES_APROBABLES:    COLECCIONES_APROBABLES,
    // Marcar inicial
    marcarComoBorrador:        marcarComoBorrador,
    // Operaciones genéricas
    enviarARevision:           enviarARevision,
    iniciarRevision:           iniciarRevision,
    aprobar:                   aprobar,
    devolver:                  devolver,
    retomarBorrador:           retomarBorrador,
    reabrir:                   reabrir,
    // Listados
    listarPendientesRevision:  listarPendientesRevision,
    listarMisEnvios:           listarMisEnvios,
    estadisticasLiceo:         estadisticasLiceo,
    // UI helpers
    getEstadoLabel:            getEstadoLabel,
    getEstadoBadgeHTML:        getEstadoBadgeHTML,
    getAccionLabel:            getAccionLabel,
    renderHistorialHTML:       renderHistorialHTML,
    // Shortcuts por colección: CCAprobaciones.materiales.aprobar(docId, ...)
    materiales:                _wrap.materiales,
    planificaciones:           _wrap.planificaciones,
    evaluaciones:              _wrap.evaluaciones
  };
})();
