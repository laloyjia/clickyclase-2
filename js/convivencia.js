/**
 * convivencia.js — Click&Clase
 *
 * Módulo para el Equipo de Convivencia Escolar: entrevistas con
 * apoderados y alumnos, intervenciones, seguimiento de casos.
 *
 * Modelo:
 *
 *   entrevistas_convivencia/{entId} = {
 *     entId, liceoSlug, tipo ('apoderado' | 'estudiante' | 'grupo' | 'reunion_equipo'),
 *     cursoId, cursoNombre, estudianteOrdinal, estudianteNombre,
 *     participantes: [{nombre, rol}],
 *     profesionalUid, profesionalNombre, profesionalRol,
 *     motivo (categoria), motivoDetalle,
 *     resumen, acuerdos, seguimientoRequerido, proximaReunion,
 *     estado, gravedad ('leve'|'grave'|'gravisima'|''),
 *     medida ('conversacion'|'compromiso_escrito'|'suspension'|'condicionalidad'|
 *              'expulsion'|'derivacion'|'ninguna'),
 *     confidencial,
 *     fecha, creadoEn, actualizadoEn
 *   }
 *
 * Motivos convivencia (Reglamento Interno):
 *   - agresion_fisica, agresion_verbal, bullying, ciberbullying,
 *     dano_material, discriminacion, indisciplina_aula,
 *     inasistencia_reiterada, uniforme_presentacion, apoyo_familia,
 *     porte_sustancias, embarazo, otro.
 */

(function () {
  'use strict';

  var TIPOS = {
    APODERADO:       'apoderado',
    ESTUDIANTE:      'estudiante',
    GRUPO:           'grupo',
    REUNION_EQUIPO:  'reunion_equipo'
  };
  var TIPO_LABEL = {
    apoderado:       'Con apoderado',
    estudiante:      'Con estudiante',
    grupo:           'Grupal',
    reunion_equipo:  'Reunión de equipo'
  };

  var MOTIVOS = {
    AGRESION_FISICA:      'agresion_fisica',
    AGRESION_VERBAL:      'agresion_verbal',
    BULLYING:             'bullying',
    CIBERBULLYING:        'ciberbullying',
    DANO_MATERIAL:        'dano_material',
    DISCRIMINACION:       'discriminacion',
    INDISCIPLINA_AULA:    'indisciplina_aula',
    INASISTENCIA:         'inasistencia_reiterada',
    UNIFORME:             'uniforme_presentacion',
    APOYO_FAMILIA:        'apoyo_familia',
    PORTE_SUSTANCIAS:     'porte_sustancias',
    EMBARAZO:             'embarazo',
    OTRO:                 'otro'
  };
  var MOTIVO_LABEL = {
    agresion_fisica:        'Agresión física',
    agresion_verbal:        'Agresión verbal',
    bullying:               'Bullying',
    ciberbullying:          'Ciberbullying',
    dano_material:          'Daño material',
    discriminacion:         'Discriminación',
    indisciplina_aula:      'Indisciplina en aula',
    inasistencia_reiterada: 'Inasistencia reiterada',
    uniforme_presentacion:  'Uniforme y presentación',
    apoyo_familia:          'Apoyo a familia',
    porte_sustancias:       'Porte de sustancias',
    embarazo:               'Embarazo',
    otro:                   'Otro'
  };
  var MOTIVO_COLOR = {
    agresion_fisica:        '#ef4444',
    agresion_verbal:        '#f87171',
    bullying:               '#ef4444',
    ciberbullying:          '#f97316',
    dano_material:          '#fbbf24',
    discriminacion:         '#ef4444',
    indisciplina_aula:      '#c4b5fd',
    inasistencia_reiterada: '#fbbf24',
    uniforme_presentacion:  '#94a3b8',
    apoyo_familia:          '#93c5fd',
    porte_sustancias:       '#ef4444',
    embarazo:               '#f9a8d4',
    otro:                   '#94a3b8'
  };

  var GRAVEDADES = { LEVE: 'leve', GRAVE: 'grave', GRAVISIMA: 'gravisima' };
  var GRAVEDAD_LABEL = { leve: 'Leve', grave: 'Grave', gravisima: 'Gravísima' };
  var GRAVEDAD_COLOR = {
    leve:      { bg: 'rgba(251,191,36,.12)', fg: '#fbbf24', border: 'rgba(251,191,36,.35)' },
    grave:     { bg: 'rgba(249,115,22,.15)', fg: '#fb923c', border: 'rgba(249,115,22,.4)' },
    gravisima: { bg: 'rgba(239,68,68,.18)',  fg: '#f87171', border: 'rgba(239,68,68,.4)' }
  };

  var MEDIDAS = {
    CONVERSACION:         'conversacion',
    COMPROMISO_ESCRITO:   'compromiso_escrito',
    SUSPENSION:           'suspension',
    CONDICIONALIDAD:      'condicionalidad',
    EXPULSION:            'expulsion',
    DERIVACION:           'derivacion',
    NINGUNA:              'ninguna'
  };
  var MEDIDA_LABEL = {
    conversacion:       'Conversación reflexiva',
    compromiso_escrito: 'Compromiso escrito',
    suspension:         'Suspensión de clases',
    condicionalidad:    'Matrícula condicional',
    expulsion:          'Expulsión (proceso Mineduc)',
    derivacion:         'Derivación a equipo',
    ninguna:            'Ninguna medida'
  };

  var ESTADOS = { ABIERTO: 'abierto', SEGUIMIENTO: 'seguimiento', CERRADO: 'cerrado', DERIVADO: 'derivado' };
  var ESTADO_LABEL = { abierto: 'Abierto', seguimiento: 'En seguimiento', cerrado: 'Cerrado', derivado: 'Derivado' };
  var ESTADO_COLOR = {
    abierto:     { bg: 'rgba(124,58,237,.15)', fg: '#c4b5fd', border: 'rgba(124,58,237,.35)' },
    seguimiento: { bg: 'rgba(251,191,36,.15)', fg: '#fbbf24', border: 'rgba(251,191,36,.35)' },
    cerrado:     { bg: 'rgba(148,163,184,.12)', fg: '#94a3b8', border: 'rgba(148,163,184,.35)' },
    derivado:    { bg: 'rgba(34,211,238,.12)', fg: '#67e8f9', border: 'rgba(34,211,238,.35)' }
  };

  function _uid() { return (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : ''; }
  function _user() { return (window.ELAuth && ELAuth.user) ? ELAuth.user : null; }
  function _nombre() {
    var u = _user() || {};
    return u.nombre || u.displayName || (u.email ? u.email.split('@')[0] : '');
  }
  function _idAuto() { return 'ent-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8); }

  // ─── Entrevistas / intervenciones ──────────────────────────

  function registrarEntrevista(datos) {
    datos = datos || {};
    if (!datos.motivo) throw new Error('motivo requerido');
    if (!datos.resumen || datos.resumen.trim().length < 3) throw new Error('resumen requerido');
    var u = _user() || {};
    var entId = _idAuto();
    var doc = {
      entId:              entId,
      liceoSlug:          datos.liceoSlug || u.liceoSlug || u.liceoPrincipal || '',
      tipo:               datos.tipo || TIPOS.APODERADO,
      cursoId:            datos.cursoId || '',
      cursoNombre:        datos.cursoNombre || '',
      estudianteOrdinal:  datos.estudianteOrdinal || null,
      estudianteNombre:   datos.estudianteNombre || '',
      participantes:      Array.isArray(datos.participantes) ? datos.participantes : [],
      profesionalUid:     u.uid || '',
      profesionalNombre:  _nombre(),
      profesionalEmail:   u.email || '',
      profesionalRol:     datos.profesionalRol || 'convivencia',
      motivo:             datos.motivo,
      motivoDetalle:      datos.motivoDetalle || '',
      resumen:            datos.resumen.trim(),
      acuerdos:           datos.acuerdos || '',
      seguimientoRequerido: datos.seguimientoRequerido === true,
      proximaReunion:     datos.proximaReunion || '',
      estado:             datos.estado || ESTADOS.ABIERTO,
      gravedad:           datos.gravedad || '',
      medida:             datos.medida || MEDIDAS.NINGUNA,
      confidencial:       datos.confidencial === true,
      fecha:              datos.fecha || new Date().toISOString().slice(0, 10),
      creadoEn:           new Date().toISOString(),
      actualizadoEn:      new Date().toISOString()
    };
    return EL_DB.collection('entrevistas_convivencia').doc(entId).set(doc)
      .then(function () {
        _log('registrar_entrevista_convivencia', {
          entId: entId, tipo: doc.tipo, motivo: doc.motivo,
          gravedad: doc.gravedad, medida: doc.medida,
          estudianteOrdinal: doc.estudianteOrdinal,
          liceoSlug: doc.liceoSlug
        });
        return doc;
      });
  }

  function actualizarEntrevista(entId, cambios) {
    cambios = cambios || {};
    cambios.actualizadoEn = new Date().toISOString();
    delete cambios.entId; delete cambios.creadoEn; delete cambios.profesionalUid;
    return EL_DB.collection('entrevistas_convivencia').doc(entId).update(cambios);
  }

  function obtenerEntrevista(entId) {
    return EL_DB.collection('entrevistas_convivencia').doc(entId).get()
      .then(function (s) { return s.exists ? s.data() : null; });
  }

  function listarEntrevistas(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    return EL_DB.collection('entrevistas_convivencia').get().then(function (snap) {
      var items = [];
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (opts.profesionalUid && d.profesionalUid !== opts.profesionalUid) return;
        if (opts.cursoId && d.cursoId !== opts.cursoId) return;
        if (opts.estudianteOrdinal && d.estudianteOrdinal !== opts.estudianteOrdinal) return;
        if (opts.estado && d.estado !== opts.estado) return;
        if (opts.motivo && d.motivo !== opts.motivo) return;
        if (opts.tipo && d.tipo !== opts.tipo) return;
        if (opts.gravedad && d.gravedad !== opts.gravedad) return;
        if (opts.desde && d.fecha < opts.desde) return;
        if (opts.hasta && d.fecha > opts.hasta) return;
        items.push(d);
      });
      items.sort(function (a, b) { return String(b.fecha || '').localeCompare(String(a.fecha || '')); });
      return items;
    });
  }

  // ─── KPIs ──────────────────────────────────────────────────

  function kpisConvivencia(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    return EL_DB.collection('entrevistas_convivencia').get().then(function (snap) {
      var mesActual = new Date().toISOString().slice(0, 7);
      var out = {
        totalAbiertos:     0, totalSeguimiento: 0, totalCerrados: 0, totalDerivados: 0,
        entrevistasMes:    0,
        porMotivo:         {}, porTipo: {}, porGravedad: { leve: 0, grave: 0, gravisima: 0 },
        porProfesional:    {},
        entrevistasApoderados: 0, entrevistasEstudiantes: 0,
        casosGravesActivos:    0,
        estudiantesUnicos: {}
      };
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (d.estado === 'abierto') out.totalAbiertos++;
        if (d.estado === 'seguimiento') out.totalSeguimiento++;
        if (d.estado === 'cerrado') out.totalCerrados++;
        if (d.estado === 'derivado') out.totalDerivados++;
        if ((d.fecha || '').slice(0, 7) === mesActual) out.entrevistasMes++;
        out.porMotivo[d.motivo] = (out.porMotivo[d.motivo] || 0) + 1;
        out.porTipo[d.tipo] = (out.porTipo[d.tipo] || 0) + 1;
        if (d.gravedad && d.gravedad in out.porGravedad) out.porGravedad[d.gravedad]++;
        if (d.tipo === 'apoderado') out.entrevistasApoderados++;
        if (d.tipo === 'estudiante') out.entrevistasEstudiantes++;
        if (d.profesionalUid) {
          if (!out.porProfesional[d.profesionalUid]) {
            out.porProfesional[d.profesionalUid] = { nombre: d.profesionalNombre, cantidad: 0 };
          }
          out.porProfesional[d.profesionalUid].cantidad++;
        }
        if ((d.gravedad === 'grave' || d.gravedad === 'gravisima') &&
            (d.estado === 'abierto' || d.estado === 'seguimiento')) out.casosGravesActivos++;
        if (d.estudianteOrdinal) {
          out.estudiantesUnicos[d.cursoId + '-' + d.estudianteOrdinal] = true;
        }
      });
      out.estudiantesConCaso = Object.keys(out.estudiantesUnicos).length;
      delete out.estudiantesUnicos;
      return out;
    });
  }

  /**
   * Detecta reincidencia: estudiantes con >= 3 entrevistas en el semestre.
   */
  function reincidentes(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    var sem = new Date().getMonth() + 1 <= 6 ? 1 : 2;
    var anio = new Date().getFullYear();
    var desde = sem === 1 ? anio + '-01-01' : anio + '-07-01';
    var hasta = sem === 1 ? anio + '-06-30' : anio + '-12-31';
    return EL_DB.collection('entrevistas_convivencia').get().then(function (snap) {
      var porEst = {};
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (!d.estudianteOrdinal) return;
        if (d.fecha < desde || d.fecha > hasta) return;
        var k = d.cursoId + '-' + d.estudianteOrdinal;
        if (!porEst[k]) porEst[k] = {
          cursoId: d.cursoId, cursoNombre: d.cursoNombre,
          ordinal: d.estudianteOrdinal, nombre: d.estudianteNombre,
          cantidad: 0, motivos: {}, ultimaFecha: ''
        };
        porEst[k].cantidad++;
        porEst[k].motivos[d.motivo] = (porEst[k].motivos[d.motivo] || 0) + 1;
        if (d.fecha > porEst[k].ultimaFecha) porEst[k].ultimaFecha = d.fecha;
      });
      var lista = Object.values(porEst).filter(function (x) { return x.cantidad >= 3; });
      lista.sort(function (a, b) { return b.cantidad - a.cantidad; });
      return lista;
    });
  }

  // ─── UI helpers ─────────────────────────────────────────────

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
  function badgeGravedadHTML(g) {
    if (!g) return '';
    var c = GRAVEDAD_COLOR[g];
    if (!c) return '';
    return '<span style="display:inline-block;padding:2px 8px;border-radius:4px;' +
           'background:' + c.bg + ';color:' + c.fg + ';border:1px solid ' + c.border + ';' +
           'font-size:.68rem;font-weight:700;text-transform:uppercase">' + (GRAVEDAD_LABEL[g] || g) + '</span>';
  }

  function _log(tipo, meta) {
    try { if (window.ELDB && ELDB.actividad && ELDB.actividad.log) ELDB.actividad.log(tipo, meta || {}); } catch (e) {}
  }

  // ─── API pública ────────────────────────────────────────────
  window.CCConvivencia = {
    TIPOS: TIPOS, TIPO_LABEL: TIPO_LABEL,
    MOTIVOS: MOTIVOS, MOTIVO_LABEL: MOTIVO_LABEL, MOTIVO_COLOR: MOTIVO_COLOR,
    GRAVEDADES: GRAVEDADES, GRAVEDAD_LABEL: GRAVEDAD_LABEL,
    MEDIDAS: MEDIDAS, MEDIDA_LABEL: MEDIDA_LABEL,
    ESTADOS: ESTADOS, ESTADO_LABEL: ESTADO_LABEL,
    registrarEntrevista: registrarEntrevista,
    actualizarEntrevista: actualizarEntrevista,
    obtenerEntrevista: obtenerEntrevista,
    listarEntrevistas: listarEntrevistas,
    kpisConvivencia: kpisConvivencia,
    reincidentes: reincidentes,
    badgeEstadoHTML: badgeEstadoHTML,
    badgeMotivoHTML: badgeMotivoHTML,
    badgeGravedadHTML: badgeGravedadHTML
  };
})();
