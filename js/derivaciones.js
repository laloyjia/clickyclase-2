/**
 * derivaciones.js — Click&Clase Fase 9
 *
 * Derivación formal de un alumno a un equipo especializado
 * (Apoyo Psicosocial, Convivencia, PIE). Solo profesores jefes.
 *
 * Modelo (derivaciones_alumno/{id}):
 *   alumnoRut, alumnoNombre, cursoId, liceoSlug
 *   profesorUid, profesorNombre (autor: jefe de curso)
 *   destino:  'apoyo' | 'convivencia' | 'pie'
 *   motivo:   string (predefinido según destino)
 *   descripcion:  string libre
 *   urgencia: 'baja' | 'media' | 'alta'
 *   estado:   'pendiente' | 'en_atencion' | 'atendida' | 'derivada'
 *   fecha, atendidaEn, atendidaPor
 *
 * Al crear una derivación, también genera automáticamente la entrada
 * correspondiente en la colección del equipo destino con origenDerivacion.
 */
(function () {
  'use strict';

  var COL = 'derivaciones_alumno';

  var DESTINOS = [
    { id: 'apoyo',       label: 'Apoyo Psicosocial',   ico: '💙', color: '#22d3ee', coleccion: 'intervenciones_apoyo' },
    { id: 'convivencia', label: 'Convivencia Escolar', ico: '🤝', color: '#f97316', coleccion: 'entrevistas_convivencia' },
    { id: 'pie',         label: 'PIE',                 ico: '♿', color: '#8b5cf6', coleccion: 'pie_estudiantes' }
  ];

  var URGENCIAS = [
    { id: 'baja',   label: 'Baja',   color: '#94a3b8' },
    { id: 'media',  label: 'Media',  color: '#f59e0b' },
    { id: 'alta',   label: 'Alta',   color: '#ef4444' }
  ];

  var MOTIVOS_POR_DESTINO = {
    apoyo: [
      { id: 'emocional',       label: 'Situación emocional' },
      { id: 'familiar',        label: 'Situación familiar' },
      { id: 'academico',       label: 'Bajo rendimiento persistente' },
      { id: 'conductual',      label: 'Cambio conductual' },
      { id: 'salud',           label: 'Situación de salud' },
      { id: 'vulneracion',     label: 'Sospecha de vulneración de derechos' }
    ],
    convivencia: [
      { id: 'agresion_fisica', label: 'Agresión física' },
      { id: 'bullying',        label: 'Acoso escolar / bullying' },
      { id: 'ciberbullying',   label: 'Ciberacoso' },
      { id: 'discriminacion',  label: 'Discriminación' },
      { id: 'reiterada_falta', label: 'Faltas reiteradas' },
      { id: 'incumplimiento',  label: 'Incumplimiento reglamento' }
    ],
    pie: [
      { id: 'diagnostico_prev','label': 'Diagnóstico previo (NEE)' },
      { id: 'sospecha_dea',    label: 'Sospecha de DEA (Trastorno Aprendizaje)' },
      { id: 'sospecha_tdah',   label: 'Sospecha TDAH' },
      { id: 'sospecha_tea',    label: 'Sospecha TEA' },
      { id: 'adecuaciones',    label: 'Necesita adecuaciones curriculares' },
      { id: 'evaluacion',      label: 'Requiere evaluación diagnóstica' }
    ]
  };

  function _user()  { return (window.ELAuth && ELAuth.user) || {}; }
  function _liceo() { return _user().liceoSlug || ''; }

  /**
   * Crea una derivación + entrada automática en la colección del destino.
   */
  function crear(datos) {
    if (!datos.alumnoRut || !datos.destino || !datos.motivo) {
      return Promise.reject(new Error('Faltan datos obligatorios'));
    }
    var destino = DESTINOS.find(function (d) { return d.id === datos.destino; });
    if (!destino) return Promise.reject(new Error('Destino inválido'));

    var u = _user();
    var doc = {
      alumnoRut:      String(datos.alumnoRut),
      alumnoNombre:   datos.alumnoNombre || '',
      cursoId:        datos.cursoId || '',
      liceoSlug:      _liceo(),
      profesorUid:    u.uid || '',
      profesorNombre: u.nombre || u.email || '',
      destino:        datos.destino,
      motivo:         datos.motivo,
      motivoDetalle:  datos.motivoDetalle || '',
      descripcion:    (datos.descripcion || '').trim(),
      urgencia:       datos.urgencia || 'media',
      estado:         'pendiente',
      fecha:          new Date().toISOString(),
      atendidaEn:     null,
      atendidaPor:    null
    };

    // 1) Crear la derivación
    return EL_DB.collection(COL).add(doc).then(function (ref) {
      var derId = ref.id;
      // 2) Crear entrada automática en el equipo destino
      return _crearEntradaEnDestino(destino, doc, derId).then(function () {
        return Object.assign({ id: derId }, doc);
      }).catch(function (err) {
        console.warn('[Derivaciones] Fallo entrada auto en destino:', err);
        return Object.assign({ id: derId }, doc);
      });
    });
  }

  function _crearEntradaEnDestino(destino, der, derId) {
    var origen = {
      derivadoDe:      der.profesorNombre,
      derivadoDeUid:   der.profesorUid,
      derivacionId:    derId,
      motivoDerivacion:der.motivo,
      urgencia:        der.urgencia
    };
    var u = _user();

    if (destino.id === 'apoyo') {
      return EL_DB.collection('intervenciones_apoyo').add({
        alumnoRut:        der.alumnoRut,
        alumnoNombre:     der.alumnoNombre,
        cursoId:          der.cursoId,
        liceoSlug:        der.liceoSlug,
        profesionalUid:   '',    // se llena cuando la toma un profesional
        profesionalRol:   'aps_prof',
        tipo:             'derivacion',
        motivo:           der.motivo,
        resumen:          der.descripcion,
        estado:           'abierto',
        origenDerivacion: origen,
        fecha:            der.fecha,
        creadoEn:         der.fecha
      });
    }
    if (destino.id === 'convivencia') {
      return EL_DB.collection('entrevistas_convivencia').add({
        alumnoRut:        der.alumnoRut,
        alumnoNombre:     der.alumnoNombre,
        cursoId:          der.cursoId,
        liceoSlug:        der.liceoSlug,
        profesionalUid:   '',
        motivo:           der.motivo,
        gravedad:         der.urgencia === 'alta' ? 'grave' : 'leve',
        resumen:          der.descripcion,
        estado:           'abierto',
        origenDerivacion: origen,
        fecha:            der.fecha,
        creadoEn:         der.fecha
      });
    }
    if (destino.id === 'pie') {
      // PIE usa alumnoRut como docId
      return EL_DB.collection('pie_estudiantes').doc(der.alumnoRut).set({
        alumnoRut:        der.alumnoRut,
        alumnoNombre:     der.alumnoNombre,
        cursoId:          der.cursoId,
        liceoSlug:        der.liceoSlug,
        estadoDerivacion: 'pendiente_evaluacion',
        origenDerivacion: origen,
        motivoDerivacion: der.motivo,
        descripcion:      der.descripcion,
        derivadoEn:       der.fecha
      }, { merge: true });
    }
    return Promise.resolve();
  }

  function listarPorAlumno(alumnoRut) {
    if (!alumnoRut) return Promise.resolve([]);
    return EL_DB.collection(COL)
      .where('alumnoRut', '==', String(alumnoRut))
      .get()
      .then(function (snap) {
        var arr = [];
        snap.forEach(function (d) {
          var data = d.data();
          if (data.liceoSlug !== _liceo() && (_user().role !== 'admin')) return;
          arr.push(Object.assign({ id: d.id }, data));
        });
        arr.sort(function (a, b) { return (b.fecha || '').localeCompare(a.fecha || ''); });
        return arr;
      });
  }

  function destinoInfo(id) { return DESTINOS.find(function (d) { return d.id === id; }); }
  function motivosPara(destinoId) { return MOTIVOS_POR_DESTINO[destinoId] || []; }

  /**
   * Lista derivaciones creadas por el profesor actual (para jefes de curso).
   */
  function listarPorProfesor(uid) {
    var targetUid = uid || _user().uid;
    return EL_DB.collection(COL).where('profesorUid', '==', targetUid).get().then(function (snap) {
      var arr = [];
      snap.forEach(function (d) {
        var data = d.data();
        if (data.liceoSlug !== _liceo()) return;
        arr.push(Object.assign({ id: d.id }, data));
      });
      arr.sort(function (a, b) { return (b.fecha || '').localeCompare(a.fecha || ''); });
      return arr;
    });
  }

  /**
   * Lista derivaciones recibidas en un destino (para coord Apoyo/Convivencia/PIE).
   */
  function listarPorDestino(destinoId) {
    return EL_DB.collection(COL).where('destino', '==', destinoId).get().then(function (snap) {
      var arr = [];
      snap.forEach(function (d) {
        var data = d.data();
        if (data.liceoSlug !== _liceo()) return;
        arr.push(Object.assign({ id: d.id }, data));
      });
      // Prioridad: alta > media > baja, luego por fecha desc
      var prio = { alta: 0, media: 1, baja: 2 };
      arr.sort(function (a, b) {
        var d1 = (prio[a.urgencia] || 3) - (prio[b.urgencia] || 3);
        if (d1 !== 0) return d1;
        return (b.fecha || '').localeCompare(a.fecha || '');
      });
      return arr;
    });
  }

  /**
   * Actualizar estado de la derivación (pendiente → en_atencion → atendida).
   */
  function actualizarEstado(derId, nuevoEstado) {
    var u = _user();
    var update = { estado: nuevoEstado, actualizadoEn: new Date().toISOString() };
    if (nuevoEstado === 'atendida') {
      update.atendidaEn  = new Date().toISOString();
      update.atendidaPor = u.nombre || u.email || u.uid || 'coordinador';
    }
    return EL_DB.collection(COL).doc(derId).update(update);
  }

  window.CCDerivaciones = {
    DESTINOS:            DESTINOS,
    URGENCIAS:           URGENCIAS,
    MOTIVOS_POR_DESTINO: MOTIVOS_POR_DESTINO,
    crear:               crear,
    listarPorAlumno:     listarPorAlumno,
    listarPorProfesor:   listarPorProfesor,
    listarPorDestino:    listarPorDestino,
    actualizarEstado:    actualizarEstado,
    destinoInfo:         destinoInfo,
    motivosPara:         motivosPara
  };
})();
