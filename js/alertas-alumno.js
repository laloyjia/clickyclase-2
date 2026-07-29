/**
 * alertas-alumno.js — Click&Clase Fase 9
 *
 * Sistema MVP de alertas de alumno. Genera link WhatsApp/Gmail
 * pre-armado y registra la alerta en Firestore.
 *
 * Modelo (alertas_alumno/{id}):
 *   alumnoRut, alumnoNombre, cursoId, liceoSlug
 *   profesorUid, profesorNombre
 *   motivo:       'academica' | 'conductual' | 'asistencia' | 'emocional' | 'salud' | 'otra'
 *   descripcion:  string libre
 *   destinatarios: array de strings ['apoderado', 'jefe_curso', 'convivencia', 'pie']
 *   metodo:       'whatsapp' | 'gmail' | 'copiar'
 *   telefonoApoderado, emailApoderado (opcional)
 *   estado:       'enviada' | 'pendiente'
 *   fecha, respondida (bool)
 */
(function () {
  'use strict';

  var COL = 'alertas_alumno';

  var MOTIVOS = [
    { id: 'academica',  label: 'Rendimiento académico',   ico: '📚', color: '#f59e0b' },
    { id: 'conductual', label: 'Conducta / disciplina',   ico: '⚠',  color: '#ef4444' },
    { id: 'asistencia', label: 'Asistencia irregular',    ico: '📅', color: '#8b5cf6' },
    { id: 'emocional',  label: 'Estado emocional',        ico: '💙', color: '#22d3ee' },
    { id: 'salud',      label: 'Salud',                   ico: '🏥', color: '#10b981' },
    { id: 'otra',       label: 'Otra',                    ico: '📌', color: '#94a3b8' }
  ];

  var DESTINATARIOS = [
    { id: 'apoderado',   label: 'Apoderado' },
    { id: 'jefe_curso',  label: 'Profesor Jefe' },
    { id: 'convivencia', label: 'Encargado Convivencia' },
    { id: 'pie',         label: 'Coordinador PIE' }
  ];

  function _user()  { return (window.ELAuth && ELAuth.user) || {}; }
  function _liceo() { return _user().liceoSlug || ''; }

  /**
   * Genera el texto pre-armado del mensaje.
   */
  function generarMensaje(datos) {
    var motivo = MOTIVOS.find(function (m) { return m.id === datos.motivo; });
    var motivoLabel = motivo ? motivo.label : datos.motivo;
    var lineas = [];
    lineas.push('*Alerta escolar — Click&Clase*');
    lineas.push('');
    lineas.push('Estudiante: *' + datos.alumnoNombre + '*');
    if (datos.cursoNombre) lineas.push('Curso: ' + datos.cursoNombre);
    lineas.push('Motivo: ' + motivoLabel);
    lineas.push('');
    lineas.push(datos.descripcion);
    lineas.push('');
    lineas.push('— ' + (_user().nombre || _user().email || 'Docente'));
    if (datos.liceoNombre) lineas.push(datos.liceoNombre);
    return lineas.join('\n');
  }

  /**
   * Genera link de WhatsApp con el mensaje pre-armado.
   * @param {string} telefono - formato +56912345678 o 56912345678
   * @param {string} mensaje
   */
  function linkWhatsApp(telefono, mensaje) {
    var telClean = String(telefono || '').replace(/[^0-9+]/g, '');
    if (telClean.startsWith('+')) telClean = telClean.substring(1);
    if (!telClean.startsWith('56') && telClean.length === 9) telClean = '56' + telClean;
    return 'https://wa.me/' + telClean + '?text=' + encodeURIComponent(mensaje);
  }

  /**
   * Genera link mailto: con asunto y cuerpo pre-armados.
   */
  function linkGmail(email, asunto, cuerpo) {
    return 'mailto:' + encodeURIComponent(email || '') +
           '?subject=' + encodeURIComponent(asunto) +
           '&body=' + encodeURIComponent(cuerpo);
  }

  /**
   * Copiar texto al clipboard.
   */
  function copiarAlPortapapeles(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto);
    }
    return Promise.reject(new Error('Clipboard API no disponible'));
  }

  /**
   * Registra la alerta en Firestore.
   */
  function registrar(datos) {
    if (!datos.alumnoRut || !datos.motivo || !datos.descripcion) {
      return Promise.reject(new Error('Faltan datos obligatorios'));
    }
    var u = _user();
    var doc = {
      alumnoRut:         String(datos.alumnoRut),
      alumnoNombre:      datos.alumnoNombre || '',
      cursoId:           datos.cursoId || '',
      cursoNombre:       datos.cursoNombre || '',
      liceoSlug:         _liceo(),
      profesorUid:       u.uid || '',
      profesorNombre:    u.nombre || u.email || '',
      motivo:            datos.motivo,
      descripcion:       datos.descripcion.trim(),
      destinatarios:     Array.isArray(datos.destinatarios) ? datos.destinatarios : [],
      metodo:            datos.metodo || 'copiar',
      telefonoApoderado: datos.telefonoApoderado || '',
      emailApoderado:    datos.emailApoderado || '',
      estado:            'enviada',
      respondida:        false,
      fecha:             new Date().toISOString()
    };
    return EL_DB.collection(COL).add(doc).then(function (ref) {
      return Object.assign({ id: ref.id }, doc);
    });
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

  function motivoInfo(id) { return MOTIVOS.find(function (m) { return m.id === id; }); }

  /**
   * Lista todas las alertas del profesor actual (o de todo el liceo si es admin/directivo).
   */
  function listarPorProfesor(uid) {
    var targetUid = uid || _user().uid;
    var esDirectivo = _user().role === 'admin' ||
      (_user().roles && (_user().roles.admin || _user().roles.director || _user().roles.rector || _user().roles.utp || _user().roles.admin_colegio));
    var q = EL_DB.collection(COL);
    if (!esDirectivo && targetUid) q = q.where('profesorUid', '==', targetUid);
    return q.get().then(function (snap) {
      var arr = [];
      snap.forEach(function (d) {
        var data = d.data();
        if (data.liceoSlug !== _liceo() && !esDirectivo) return;
        arr.push(Object.assign({ id: d.id }, data));
      });
      arr.sort(function (a, b) { return (b.fecha || '').localeCompare(a.fecha || ''); });
      return arr;
    });
  }

  window.CCAlertasAlumno = {
    MOTIVOS:              MOTIVOS,
    DESTINATARIOS:        DESTINATARIOS,
    generarMensaje:       generarMensaje,
    linkWhatsApp:         linkWhatsApp,
    linkGmail:            linkGmail,
    copiarAlPortapapeles: copiarAlPortapapeles,
    registrar:            registrar,
    listarPorAlumno:      listarPorAlumno,
    listarPorProfesor:    listarPorProfesor,
    motivoInfo:           motivoInfo
  };
})();
