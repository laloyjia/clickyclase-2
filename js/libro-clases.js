/**
 * libro-clases.js — Click&Clase
 *
 * Registro diario de una clase: fecha + curso + asignatura + docente,
 * más asistencia por estudiante y contenido del día.
 *
 * Modelo:
 *   libro_clases/{regId} = {
 *     regId, liceoSlug, cursoId, cursoNombre,
 *     asignatura, docenteUid, docenteNombre, docenteEmail,
 *     fecha ('2026-05-16'), hora inicio/fin,
 *     contenidoDelDia, observacionesGenerales,
 *     asistencia: [{ ordinal, nombreCompleto, estado, motivo?, horaLlegada? }],
 *     totalPresentes, totalAusentes, totalAtrasados, totalJustificados,
 *     firmado, firmadoEn, firmaHash,
 *     creadoEn, actualizadoEn
 *   }
 *
 * regId único: "<cursoId>-<asignatura>-<fecha>" para que un docente no
 * pueda hacer 2 registros de la misma clase el mismo día.
 */

(function () {
  'use strict';

  var ESTADOS_ASIST = ['P','A','T','J'];  // Presente / Ausente / aTrasado / Justificado
  var ESTADO_LABEL  = { P: 'Presente', A: 'Ausente', T: 'Atrasado', J: 'Justificado' };
  var ESTADO_COLOR  = {
    P: '#86efac', A: '#fca5a5', T: '#fbbf24', J: '#93c5fd'
  };

  function _uid() { return (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : ''; }
  function _user() { return (window.ELAuth && ELAuth.user) ? ELAuth.user : null; }
  function _nombre() {
    var u = _user() || {};
    return u.nombre || u.displayName || (u.email ? u.email.split('@')[0] : '');
  }

  /**
   * regId único para un curso+asignatura+fecha.
   */
  function regIdSlug(cursoId, asignatura, fecha) {
    var asigSlug = String(asignatura || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g,'');
    return cursoId + '-' + asigSlug + '-' + fecha;
  }

  /**
   * Crea o abre un registro para la clase de hoy en un curso+asignatura.
   * Si ya existe, devuelve el registro existente para continuar editando.
   * Si no existe, lo crea con estado inicial (todos ausentes por defecto).
   *
   * @param {object} opts { cursoId, asignatura, fecha }
   */
  function abrirOCrearRegistro(opts) {
    opts = opts || {};
    if (!opts.cursoId) throw new Error('cursoId requerido');
    if (!opts.asignatura) throw new Error('asignatura requerida');
    var fecha = opts.fecha || _hoyISO();
    var regId = regIdSlug(opts.cursoId, opts.asignatura, fecha);
    var ref = EL_DB.collection('libro_clases').doc(regId);

    return ref.get().then(function (snap) {
      if (snap.exists) return snap.data();
      // No existe: obtener el curso para armar el roster inicial
      return EL_DB.collection('cursos').doc(opts.cursoId).get().then(function (cs) {
        if (!cs.exists) throw new Error('Curso no encontrado');
        var curso = cs.data();
        var u = _user() || {};
        var doc = {
          regId:            regId,
          liceoSlug:        curso.liceoSlug,
          cursoId:          opts.cursoId,
          cursoNombre:      curso.nombreCompleto,
          asignatura:       opts.asignatura,
          docenteUid:       u.uid || '',
          docenteEmail:     u.email || '',
          docenteNombre:    _nombre(),
          fecha:            fecha,
          horaInicio:       opts.horaInicio || '',
          horaFin:          opts.horaFin || '',
          contenidoDelDia:  '',
          observacionesGenerales: '',
          asistencia:       _rosterInicial(curso.estudiantes || []),
          totalPresentes:   0,
          totalAusentes:    (curso.estudiantes || []).length,
          totalAtrasados:   0,
          totalJustificados:0,
          firmado:          false,
          firmadoEn:        null,
          firmaHash:        '',
          creadoEn:         new Date().toISOString(),
          actualizadoEn:    new Date().toISOString()
        };
        return ref.set(doc).then(function () { return doc; });
      });
    });
  }

  /**
   * Guarda cambios en asistencia y contenido. No firma.
   */
  function guardar(regId, cambios) {
    cambios = cambios || {};
    var permitido = ['contenidoDelDia','observacionesGenerales','asistencia','horaInicio','horaFin'];
    var upd = {};
    permitido.forEach(function (k) { if (k in cambios) upd[k] = cambios[k]; });
    if (upd.asistencia) {
      // Recalcular totales
      var t = { P:0, A:0, T:0, J:0 };
      upd.asistencia.forEach(function (a) { if (a.estado in t) t[a.estado]++; });
      upd.totalPresentes    = t.P;
      upd.totalAusentes     = t.A;
      upd.totalAtrasados    = t.T;
      upd.totalJustificados = t.J;
    }
    upd.actualizadoEn = new Date().toISOString();
    return EL_DB.collection('libro_clases').doc(regId).update(upd);
  }

  /**
   * Firma el registro. Después de firmado no se puede editar más
   * (regla de Firestore). El "hash" es informativo (no criptográfico).
   */
  function firmar(regId) {
    var ref = EL_DB.collection('libro_clases').doc(regId);
    return ref.get().then(function (snap) {
      if (!snap.exists) throw new Error('Registro no encontrado');
      var d = snap.data() || {};
      if (d.firmado) throw new Error('El registro ya está firmado');
      if ((d.docenteUid || '') !== _uid()) throw new Error('Solo el docente que hizo la clase puede firmar');
      var u = _user() || {};
      var hash = _firmaHashSimple(regId, u.email || '', new Date().toISOString());
      var upd = {
        firmado:       true,
        firmadoEn:     new Date().toISOString(),
        firmadoPor:    u.email || '',
        firmadoPorUid: u.uid || '',
        firmaHash:     hash,
        actualizadoEn: new Date().toISOString()
      };
      return ref.update(upd).then(function () {
        _log('firmar_clase', { regId: regId, cursoId: d.cursoId, asignatura: d.asignatura });
        return hash;
      });
    });
  }

  /**
   * Lista registros del docente autenticado (o del uid indicado) filtrando
   * por rango de fechas, curso o asignatura.
   */
  function listarRegistros(opts) {
    opts = opts || {};
    var uid = opts.docenteUid || _uid();
    return EL_DB.collection('libro_clases').get().then(function (snap) {
      var items = [];
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (uid && d.docenteUid !== uid && !opts.todosDocentes) return;
        if (opts.cursoId && d.cursoId !== opts.cursoId) return;
        if (opts.asignatura && d.asignatura !== opts.asignatura) return;
        if (opts.desde && d.fecha < opts.desde) return;
        if (opts.hasta && d.fecha > opts.hasta) return;
        if (opts.liceoSlug && d.liceoSlug !== opts.liceoSlug) return;
        items.push(d);
      });
      items.sort(function (a, b) { return String(b.fecha || '').localeCompare(a.fecha || ''); });
      return items;
    });
  }

  /**
   * Estadísticas de asistencia de un curso en un rango de fechas.
   * @param {object} opts { cursoId, desde, hasta }
   * @returns Promise<{ porEstudiante: [{ordinal, nombreCompleto, P, A, T, J, totalDias, porcentajeAsistencia}], totales: {P,A,T,J} }>
   */
  function estadisticasCurso(opts) {
    opts = opts || {};
    if (!opts.cursoId) throw new Error('cursoId requerido');
    return listarRegistros({ cursoId: opts.cursoId, desde: opts.desde, hasta: opts.hasta, todosDocentes: true })
      .then(function (regs) {
        var porEstudiante = {};
        var totales = { P:0, A:0, T:0, J:0 };
        regs.forEach(function (r) {
          (r.asistencia || []).forEach(function (a) {
            var key = a.ordinal;
            if (!porEstudiante[key]) {
              porEstudiante[key] = {
                ordinal: a.ordinal, nombreCompleto: a.nombreCompleto,
                P: 0, A: 0, T: 0, J: 0, totalDias: 0
              };
            }
            if (a.estado in totales) totales[a.estado]++;
            var e = porEstudiante[key];
            if (a.estado in e) e[a.estado]++;
            e.totalDias++;
          });
        });
        var lista = Object.values(porEstudiante).map(function (e) {
          var pres = e.P + e.T;  // presente o atrasado cuentan como asistencia
          e.porcentajeAsistencia = e.totalDias > 0
            ? Math.round((pres / e.totalDias) * 100)
            : 0;
          return e;
        });
        lista.sort(function (a, b) { return a.ordinal - b.ordinal; });
        return { porEstudiante: lista, totales: totales, totalDias: regs.length };
      });
  }

  // ─── Helpers privados ──────────────────────────────────────

  function _hoyISO() {
    var d = new Date();
    var m = String(d.getMonth()+1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + dd;
  }

  function _rosterInicial(estudiantes) {
    return (estudiantes || []).map(function (e) {
      var nom = ((e.apellidoP || '') + (e.apellidoM ? ' ' + e.apellidoM : '') +
                 (e.nombre ? ', ' + e.nombre : '')).trim();
      return {
        ordinal:        e.ordinal,
        nombreCompleto: nom,
        estado:         'A',   // Por defecto ausente hasta que docente marque
        motivo:         '',
        horaLlegada:    ''
      };
    });
  }

  /**
   * Hash simple estilo checksum. NO criptográfico. Solo indicativo.
   */
  function _firmaHashSimple(regId, email, ts) {
    var s = regId + '|' + email + '|' + ts;
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return 'cc-' + Math.abs(h).toString(16).padStart(8, '0');
  }

  function _log(tipo, meta) {
    try { if (window.ELDB && ELDB.actividad && ELDB.actividad.log) ELDB.actividad.log(tipo, meta || {}); } catch (e) {}
  }

  // ─── API pública ───────────────────────────────────────────
  window.CCLibroClases = {
    ESTADOS_ASIST:      ESTADOS_ASIST,
    ESTADO_LABEL:       ESTADO_LABEL,
    ESTADO_COLOR:       ESTADO_COLOR,
    regIdSlug:          regIdSlug,
    abrirOCrearRegistro: abrirOCrearRegistro,
    guardar:            guardar,
    firmar:             firmar,
    listarRegistros:    listarRegistros,
    estadisticasCurso:  estadisticasCurso
  };
})();
