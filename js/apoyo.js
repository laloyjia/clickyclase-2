/**
 * apoyo.js — Click&Clase
 *
 * Módulo para el equipo de Apoyo Psicosocial (psicólogos y trabajadores
 * sociales) — gestión de casos, intervenciones y fichas por estudiante.
 *
 * Modelos:
 *
 *   intervenciones_apoyo/{intId} = {
 *     intId, liceoSlug,
 *     estudianteOrdinal, estudianteNombre, cursoId, cursoNombre,
 *     profesionalUid, profesionalNombre, profesionalRol ('psicologo'|'ts'|'otro'),
 *     tipo ('individual' | 'grupal' | 'preventiva' | 'derivacion'),
 *     motivo (categoria: 'emocional' | 'familiar' | 'academico' | 'conductual' |
 *             'salud' | 'convivencia' | 'sospecha_vulneracion' | 'otro'),
 *     motivoDetalle (texto libre),
 *     resumen (relato de la sesión, texto libre),
 *     compromisos (acuerdos con el estudiante/familia),
 *     seguimientoRequerido (bool),
 *     proximaSesion (fecha),
 *     estado ('abierto' | 'seguimiento' | 'cerrado' | 'derivado'),
 *     derivadoA ('pie' | 'convivencia' | 'externo' | ''),
 *     confidencial (bool),
 *     fecha, creadoEn, actualizadoEn
 *   }
 *
 *   apoyo_fichas/{fichaId = liceoSlug-cursoId-ordinal} = {
 *     ficha unica por estudiante con datos globales (no la lista de intervenciones).
 *     resumen del caso, red de apoyo familiar, situacion vital, alertas.
 *   }
 *
 * Datos MUY sensibles. Firestore Rules restringen acceso solo a:
 *   - equipo apoyo psicosocial mismo liceo
 *   - directivos mismo liceo
 *   - admin plataforma
 */

(function () {
  'use strict';

  var TIPOS = {
    INDIVIDUAL: 'individual',
    GRUPAL:     'grupal',
    PREVENTIVA: 'preventiva',
    DERIVACION: 'derivacion'
  };
  var TIPO_LABEL = {
    individual: 'Individual',
    grupal:     'Grupal',
    preventiva: 'Preventiva',
    derivacion: 'Derivación'
  };

  var MOTIVOS = {
    EMOCIONAL:            'emocional',
    FAMILIAR:             'familiar',
    ACADEMICO:            'academico',
    CONDUCTUAL:           'conductual',
    SALUD:                'salud',
    CONVIVENCIA:          'convivencia',
    SOSPECHA_VULNERACION: 'sospecha_vulneracion',
    OTRO:                 'otro'
  };
  var MOTIVO_LABEL = {
    emocional:            'Emocional',
    familiar:             'Familiar',
    academico:            'Académico',
    conductual:           'Conductual',
    salud:                'Salud',
    convivencia:          'Convivencia',
    sospecha_vulneracion: 'Sospecha de vulneración',
    otro:                 'Otro'
  };
  var MOTIVO_COLOR = {
    emocional:            '#c4b5fd',
    familiar:             '#f9a8d4',
    academico:            '#67e8f9',
    conductual:           '#fbbf24',
    salud:                '#86efac',
    convivencia:          '#93c5fd',
    sospecha_vulneracion: '#fca5a5',
    otro:                 '#94a3b8'
  };

  var ESTADOS = {
    ABIERTO:      'abierto',
    SEGUIMIENTO:  'seguimiento',
    CERRADO:      'cerrado',
    DERIVADO:     'derivado'
  };
  var ESTADO_LABEL = {
    abierto:     'Abierto',
    seguimiento: 'En seguimiento',
    cerrado:     'Cerrado',
    derivado:    'Derivado'
  };
  var ESTADO_COLOR = {
    abierto:     { bg: 'rgba(124,58,237,.15)', fg: '#c4b5fd', border: 'rgba(124,58,237,.35)' },
    seguimiento: { bg: 'rgba(251,191,36,.15)', fg: '#fbbf24', border: 'rgba(251,191,36,.35)' },
    cerrado:     { bg: 'rgba(148,163,184,.12)', fg: '#94a3b8', border: 'rgba(148,163,184,.35)' },
    derivado:    { bg: 'rgba(34,211,238,.12)', fg: '#67e8f9', border: 'rgba(34,211,238,.35)' }
  };

  var DERIVA_A = {
    PIE:         'pie',
    CONVIVENCIA: 'convivencia',
    EXTERNO:     'externo'
  };

  function _uid() { return (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : ''; }
  function _user() { return (window.ELAuth && ELAuth.user) ? ELAuth.user : null; }
  function _nombre() {
    var u = _user() || {};
    return u.nombre || u.displayName || (u.email ? u.email.split('@')[0] : '');
  }

  function _idAuto() { return 'int-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8); }
  function _fichaId(liceoSlug, cursoId, ordinal) {
    return liceoSlug + '-' + cursoId + '-est' + ordinal;
  }

  // ═══════════════════════════════════════════════════════════
  //  Intervenciones
  // ═══════════════════════════════════════════════════════════

  /**
   * Registra una nueva intervención.
   */
  function registrarIntervencion(datos) {
    datos = datos || {};
    if (!datos.tipo) datos.tipo = TIPOS.INDIVIDUAL;
    if (!datos.motivo) throw new Error('motivo requerido');
    if (!datos.resumen || datos.resumen.trim().length < 3) throw new Error('resumen requerido');

    var u = _user() || {};
    var intId = _idAuto();
    var doc = {
      intId:              intId,
      liceoSlug:          datos.liceoSlug || u.liceoSlug || u.liceoPrincipal || '',
      estudianteOrdinal:  datos.estudianteOrdinal || null,
      estudianteNombre:   datos.estudianteNombre || '',
      cursoId:            datos.cursoId || '',
      cursoNombre:        datos.cursoNombre || '',
      profesionalUid:     u.uid || '',
      profesionalNombre:  _nombre(),
      profesionalEmail:   u.email || '',
      profesionalRol:     datos.profesionalRol || 'psicologo',
      tipo:               datos.tipo,
      motivo:             datos.motivo,
      motivoDetalle:      datos.motivoDetalle || '',
      resumen:            datos.resumen.trim(),
      compromisos:        datos.compromisos || '',
      seguimientoRequerido: datos.seguimientoRequerido === true,
      proximaSesion:      datos.proximaSesion || '',
      estado:             datos.estado || ESTADOS.ABIERTO,
      derivadoA:          datos.derivadoA || '',
      confidencial:       datos.confidencial === true,
      fecha:              datos.fecha || new Date().toISOString().slice(0, 10),
      creadoEn:           new Date().toISOString(),
      actualizadoEn:      new Date().toISOString()
    };
    return EL_DB.collection('intervenciones_apoyo').doc(intId).set(doc)
      .then(function () {
        _log('registrar_intervencion_apoyo', {
          intId: intId, tipo: doc.tipo, motivo: doc.motivo,
          estudianteOrdinal: doc.estudianteOrdinal,
          liceoSlug: doc.liceoSlug
        });
        return doc;
      });
  }

  function actualizarIntervencion(intId, cambios) {
    cambios = cambios || {};
    cambios.actualizadoEn = new Date().toISOString();
    delete cambios.intId; delete cambios.creadoEn; delete cambios.profesionalUid;
    return EL_DB.collection('intervenciones_apoyo').doc(intId).update(cambios);
  }

  function obtenerIntervencion(intId) {
    return EL_DB.collection('intervenciones_apoyo').doc(intId).get().then(function (s) {
      return s.exists ? s.data() : null;
    });
  }

  /**
   * Lista intervenciones filtrando por profesional, curso, estudiante,
   * estado, motivo, rango de fechas.
   */
  function listarIntervenciones(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    return EL_DB.collection('intervenciones_apoyo').get().then(function (snap) {
      var items = [];
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (opts.profesionalUid && d.profesionalUid !== opts.profesionalUid) return;
        if (opts.cursoId && d.cursoId !== opts.cursoId) return;
        if (opts.estudianteOrdinal && d.estudianteOrdinal !== opts.estudianteOrdinal) return;
        if (opts.estado && d.estado !== opts.estado) return;
        if (opts.motivo && d.motivo !== opts.motivo) return;
        if (opts.desde && d.fecha < opts.desde) return;
        if (opts.hasta && d.fecha > opts.hasta) return;
        items.push(d);
      });
      items.sort(function (a, b) { return String(b.fecha || '').localeCompare(String(a.fecha || '')); });
      return items;
    });
  }

  /**
   * Historial completo de intervenciones de un estudiante.
   */
  function historialEstudiante(cursoId, ordinal) {
    return listarIntervenciones({ cursoId: cursoId, estudianteOrdinal: ordinal });
  }

  // ═══════════════════════════════════════════════════════════
  //  Fichas de estudiante
  // ═══════════════════════════════════════════════════════════

  /**
   * Crear o actualizar ficha del estudiante con datos globales del caso.
   */
  function guardarFicha(datos) {
    datos = datos || {};
    if (!datos.cursoId || !datos.estudianteOrdinal) throw new Error('cursoId y ordinal requeridos');
    var u = _user() || {};
    var liceoSlug = datos.liceoSlug || u.liceoSlug || u.liceoPrincipal || '';
    var fichaId = _fichaId(liceoSlug, datos.cursoId, datos.estudianteOrdinal);
    var ahora = new Date().toISOString();
    var payload = {
      fichaId:            fichaId,
      liceoSlug:          liceoSlug,
      cursoId:            datos.cursoId,
      cursoNombre:        datos.cursoNombre || '',
      estudianteOrdinal:  datos.estudianteOrdinal,
      estudianteNombre:   datos.estudianteNombre || '',
      resumenCaso:        datos.resumenCaso || '',
      redApoyoFamiliar:   datos.redApoyoFamiliar || '',
      situacionVital:     datos.situacionVital || '',
      alertas:            datos.alertas || [],
      diagnosticoBase:    datos.diagnosticoBase || '',
      derivacionesActivas: datos.derivacionesActivas || [],
      profesionalReferente: datos.profesionalReferente || u.uid || '',
      profesionalNombre:  datos.profesionalNombre || _nombre(),
      confidencial:       datos.confidencial === true,
      actualizadoEn:      ahora,
      actualizadoPor:     u.uid || ''
    };
    // Firestore no soporta "upsert" con doc.set() sin borrar campos existentes.
    // Usamos set con merge:true equivalente via update-then-set-if-fails.
    return EL_DB.collection('apoyo_fichas').doc(fichaId).get().then(function (s) {
      if (s.exists) {
        return EL_DB.collection('apoyo_fichas').doc(fichaId).update(payload);
      } else {
        payload.creadoEn = ahora;
        payload.creadoPor = u.uid || '';
        return EL_DB.collection('apoyo_fichas').doc(fichaId).set(payload);
      }
    }).then(function () { return payload; });
  }

  function obtenerFicha(cursoId, ordinal, liceoSlug) {
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    var fichaId = _fichaId(liceoSlug, cursoId, ordinal);
    return EL_DB.collection('apoyo_fichas').doc(fichaId).get().then(function (s) {
      return s.exists ? s.data() : null;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  Estadísticas y consolidados
  // ═══════════════════════════════════════════════════════════

  /**
   * KPIs del equipo apoyo:
   *  - Casos activos, en seguimiento, cerrados
   *  - Intervenciones este mes
   *  - Distribución por motivo
   */
  function kpisApoyo(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    return EL_DB.collection('intervenciones_apoyo').get().then(function (snap) {
      var mesActual = new Date().toISOString().slice(0, 7);
      var kpis = {
        totalActivos:      0,
        totalSeguimiento:  0,
        totalCerrados:     0,
        totalDerivados:    0,
        intervencionesMes: 0,
        porMotivo:         {},
        porTipo:           {},
        porProfesional:    {},
        estudiantesUnicos: {}
      };
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (d.estado === 'abierto') kpis.totalActivos++;
        if (d.estado === 'seguimiento') kpis.totalSeguimiento++;
        if (d.estado === 'cerrado') kpis.totalCerrados++;
        if (d.estado === 'derivado') kpis.totalDerivados++;
        if ((d.fecha || '').slice(0, 7) === mesActual) kpis.intervencionesMes++;
        kpis.porMotivo[d.motivo] = (kpis.porMotivo[d.motivo] || 0) + 1;
        kpis.porTipo[d.tipo] = (kpis.porTipo[d.tipo] || 0) + 1;
        if (d.profesionalUid) {
          if (!kpis.porProfesional[d.profesionalUid]) {
            kpis.porProfesional[d.profesionalUid] = { nombre: d.profesionalNombre, cantidad: 0 };
          }
          kpis.porProfesional[d.profesionalUid].cantidad++;
        }
        if (d.estudianteOrdinal) {
          kpis.estudiantesUnicos[d.cursoId + '-' + d.estudianteOrdinal] = true;
        }
      });
      kpis.estudiantesConCaso = Object.keys(kpis.estudiantesUnicos).length;
      delete kpis.estudiantesUnicos;
      return kpis;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  UI helpers
  // ═══════════════════════════════════════════════════════════

  function badgeEstadoHTML(estado) {
    var c = ESTADO_COLOR[estado] || ESTADO_COLOR.abierto;
    var lbl = ESTADO_LABEL[estado] || estado;
    return '<span style="display:inline-block;padding:2px 8px;border-radius:999px;' +
           'background:' + c.bg + ';color:' + c.fg + ';border:1px solid ' + c.border + ';' +
           'font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px">' + lbl + '</span>';
  }

  function badgeMotivoHTML(motivo) {
    var col = MOTIVO_COLOR[motivo] || '#94a3b8';
    var lbl = MOTIVO_LABEL[motivo] || motivo;
    return '<span style="display:inline-block;padding:2px 8px;border-radius:4px;' +
           'background:' + col + '22;color:' + col + ';border:1px solid ' + col + '55;' +
           'font-size:.7rem;font-weight:600">' + lbl + '</span>';
  }

  function _log(tipo, meta) {
    try { if (window.ELDB && ELDB.actividad && ELDB.actividad.log) ELDB.actividad.log(tipo, meta || {}); } catch (e) {}
  }

  // ═══════════════════════════════════════════════════════════
  //  API pública
  // ═══════════════════════════════════════════════════════════
  window.CCApoyo = {
    // Constantes
    TIPOS:              TIPOS,
    TIPO_LABEL:         TIPO_LABEL,
    MOTIVOS:            MOTIVOS,
    MOTIVO_LABEL:       MOTIVO_LABEL,
    MOTIVO_COLOR:       MOTIVO_COLOR,
    ESTADOS:            ESTADOS,
    ESTADO_LABEL:       ESTADO_LABEL,
    DERIVA_A:           DERIVA_A,
    // Intervenciones
    registrarIntervencion: registrarIntervencion,
    actualizarIntervencion: actualizarIntervencion,
    obtenerIntervencion:   obtenerIntervencion,
    listarIntervenciones:  listarIntervenciones,
    historialEstudiante:   historialEstudiante,
    // Fichas
    guardarFicha:          guardarFicha,
    obtenerFicha:          obtenerFicha,
    // Stats
    kpisApoyo:             kpisApoyo,
    // UI
    badgeEstadoHTML:       badgeEstadoHTML,
    badgeMotivoHTML:       badgeMotivoHTML
  };
})();
