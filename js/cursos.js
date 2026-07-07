/**
 * cursos.js — Click&Clase
 *
 * Módulo de gestión de cursos y roster de estudiantes.
 *
 * Modelo de datos:
 *
 *   cursos/{cursoId} = {
 *     cursoId, liceoSlug, nivel ('1B'..'4M'), letra ('A'..), anio,
 *     nombreCompleto ('3° Medio A'), especialidad?, mencion?,
 *     jefeUid, jefeNombre,
 *     asignaturasAsignadas: [{ asignatura, docenteUid, docenteNombre,
 *                             horasSemanales }],
 *     estudiantes: [
 *       { ordinal, nombre, apellidoP, apellidoM, rut, sexo, fechaNac?,
 *         activo, uid?, apoderadoNombre?, apoderadoTelefono?, apoderadoEmail? }
 *     ],
 *     totalEstudiantes, activo, creadoEn, actualizadoEn, creadoPor
 *   }
 *
 * Dependencias globales:
 *   - EL_DB, ELAuth, ELDB (actividad)
 *   - CCRoles (roles-permissions.js)
 */

(function () {
  'use strict';

  var NIVELES_VALIDOS = [
    '1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'
  ];

  // ─── Helpers ────────────────────────────────────────────────

  function _uidActual() {
    return (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : '';
  }
  function _userActual() {
    return (window.ELAuth && ELAuth.user) ? ELAuth.user : null;
  }
  function _nombreActual() {
    var u = _userActual() || {};
    return u.nombre || u.displayName || (u.email ? u.email.split('@')[0] : '');
  }

  /**
   * Slug único de curso: "<liceoSlug>-<nivelLC>-<letraLC>-<anio>"
   * Ej: "salesianos-talca-3m-a-2026"
   */
  function cursoIdSlug(liceoSlug, nivel, letra, anio) {
    return String(liceoSlug || '').toLowerCase() + '-' +
           String(nivel || '').toLowerCase() + '-' +
           String(letra || '').toLowerCase() + '-' +
           String(anio || new Date().getFullYear());
  }

  /**
   * "3° Medio A", "1° Básico B", etc. según nivel + letra.
   */
  function nombreCompleto(nivel, letra) {
    if (!nivel) return '';
    var num = nivel.charAt(0);
    var tramo = (nivel.charAt(1) === 'B') ? 'Básico' : 'Medio';
    return num + '° ' + tramo + ' ' + (letra || '').toUpperCase();
  }

  /**
   * Valida un RUT chileno básico (formato + dígito verificador).
   * Acepta "12.345.678-9" o "12345678-9" o "123456789".
   */
  function validarRut(rut) {
    if (!rut) return false;
    var limpio = String(rut).replace(/[.-]/g, '').toUpperCase();
    if (!/^[0-9]+[0-9K]$/.test(limpio)) return false;
    var cuerpo = limpio.slice(0, -1);
    var dv = limpio.slice(-1);
    var suma = 0, mul = 2;
    for (var i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * mul;
      mul = (mul === 7) ? 2 : mul + 1;
    }
    var resto = 11 - (suma % 11);
    var dvEsperado = resto === 11 ? '0' : (resto === 10 ? 'K' : String(resto));
    return dv === dvEsperado;
  }

  /**
   * Formatea RUT: "12.345.678-9"
   */
  function formatearRut(rut) {
    if (!rut) return '';
    var limpio = String(rut).replace(/[.-]/g, '').toUpperCase();
    if (limpio.length < 2) return rut;
    var cuerpo = limpio.slice(0, -1);
    var dv = limpio.slice(-1);
    var conPuntos = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return conPuntos + '-' + dv;
  }

  // ─── CRUD de cursos ────────────────────────────────────────

  /**
   * Crea un nuevo curso.
   * @param {object} datos { liceoSlug, nivel, letra, anio, jefeUid, jefeNombre,
   *                        especialidad?, mencion? }
   */
  function crearCurso(datos) {
    datos = datos || {};
    if (!datos.liceoSlug) throw new Error('liceoSlug es obligatorio');
    if (NIVELES_VALIDOS.indexOf(datos.nivel) === -1) throw new Error('Nivel inválido: ' + datos.nivel);
    if (!datos.letra) throw new Error('Letra es obligatoria');
    datos.anio = datos.anio || new Date().getFullYear();
    var cursoId = cursoIdSlug(datos.liceoSlug, datos.nivel, datos.letra, datos.anio);
    var u = _userActual() || {};
    var ahora = new Date().toISOString();
    var doc = {
      cursoId:              cursoId,
      liceoSlug:            datos.liceoSlug,
      nivel:                datos.nivel,
      letra:                String(datos.letra).toUpperCase(),
      anio:                 datos.anio,
      nombreCompleto:       nombreCompleto(datos.nivel, datos.letra),
      especialidad:         datos.especialidad || '',
      mencion:              datos.mencion || '',
      jefeUid:              datos.jefeUid || '',
      jefeNombre:           datos.jefeNombre || '',
      asignaturasAsignadas: [],
      estudiantes:          [],
      totalEstudiantes:     0,
      activo:               true,
      creadoEn:             ahora,
      actualizadoEn:        ahora,
      creadoPor:            u.uid || '',
      creadoPorNombre:      _nombreActual()
    };
    return EL_DB.collection('cursos').doc(cursoId).set(doc)
      .then(function () { _log('crear_curso', { cursoId: cursoId, liceoSlug: datos.liceoSlug }); return doc; });
  }

  /**
   * Actualizar metadata del curso (no toca estudiantes ni asignaturas).
   */
  function actualizarCurso(cursoId, cambios) {
    cambios = cambios || {};
    cambios.actualizadoEn = new Date().toISOString();
    // Bloquear campos inmutables
    delete cambios.cursoId; delete cambios.creadoEn; delete cambios.creadoPor;
    return EL_DB.collection('cursos').doc(cursoId).update(cambios)
      .then(function () { _log('editar_curso', { cursoId: cursoId }); });
  }

  function obtenerCurso(cursoId) {
    return EL_DB.collection('cursos').doc(cursoId).get()
      .then(function (snap) {
        if (!snap.exists) return null;
        return snap.data();
      });
  }

  /**
   * Lista los cursos del liceo del usuario actual (o del liceoSlug indicado).
   */
  function listarCursos(opts) {
    opts = opts || {};
    var liceo = opts.liceoSlug;
    if (!liceo) {
      var u = _userActual() || {};
      liceo = u.liceoSlug || u.liceoPrincipal || '';
    }
    return EL_DB.collection('cursos').get().then(function (snap) {
      var items = [];
      snap.forEach(function (doc) {
        var d = doc.data();
        if (!liceo || d.liceoSlug === liceo) {
          if (opts.soloActivos === false || d.activo !== false) items.push(d);
        }
      });
      items.sort(function (a, b) {
        if (a.anio !== b.anio) return b.anio - a.anio;
        var na = NIVELES_VALIDOS.indexOf(a.nivel);
        var nb = NIVELES_VALIDOS.indexOf(b.nivel);
        if (na !== nb) return na - nb;
        return (a.letra || '').localeCompare(b.letra || '');
      });
      return items;
    });
  }

  /**
   * Cursos donde el usuario es jefe de curso o docente asignado en alguna asig.
   */
  function misCursos(uid) {
    uid = uid || _uidActual();
    if (!uid) return Promise.resolve([]);
    return listarCursos().then(function (cursos) {
      return cursos.filter(function (c) {
        if (c.jefeUid === uid) return true;
        return (c.asignaturasAsignadas || []).some(function (a) { return a.docenteUid === uid; });
      });
    });
  }

  // ─── Roster de estudiantes ─────────────────────────────────

  /**
   * Agrega un estudiante al roster. Le asigna un ordinal (número de lista).
   */
  function agregarEstudiante(cursoId, estudiante) {
    return obtenerCurso(cursoId).then(function (c) {
      if (!c) throw new Error('Curso no encontrado');
      var lista = Array.isArray(c.estudiantes) ? c.estudiantes.slice() : [];
      var ordinal = _proximoOrdinal(lista);
      var est = {
        ordinal:         ordinal,
        nombre:          (estudiante.nombre || '').trim(),
        apellidoP:       (estudiante.apellidoP || '').trim(),
        apellidoM:       (estudiante.apellidoM || '').trim(),
        rut:             (estudiante.rut ? formatearRut(estudiante.rut) : ''),
        rutValido:       estudiante.rut ? validarRut(estudiante.rut) : false,
        sexo:            estudiante.sexo || '',
        fechaNac:        estudiante.fechaNac || '',
        activo:          true,
        uid:             estudiante.uid || '',
        apoderadoNombre: estudiante.apoderadoNombre || '',
        apoderadoTel:    estudiante.apoderadoTel || '',
        apoderadoEmail:  estudiante.apoderadoEmail || ''
      };
      lista.push(est);
      lista.sort(_ordenAlfabetico);
      lista = _reasignarOrdinales(lista);
      return _guardarRoster(cursoId, lista);
    });
  }

  function actualizarEstudiante(cursoId, ordinal, cambios) {
    return obtenerCurso(cursoId).then(function (c) {
      if (!c) throw new Error('Curso no encontrado');
      var lista = Array.isArray(c.estudiantes) ? c.estudiantes.slice() : [];
      var idx = lista.findIndex(function (e) { return e.ordinal === ordinal; });
      if (idx === -1) throw new Error('Estudiante no encontrado');
      lista[idx] = Object.assign({}, lista[idx], cambios || {});
      if (cambios && cambios.rut) {
        lista[idx].rut = formatearRut(cambios.rut);
        lista[idx].rutValido = validarRut(cambios.rut);
      }
      // Reordenar por apellido y renumerar
      lista.sort(_ordenAlfabetico);
      lista = _reasignarOrdinales(lista);
      return _guardarRoster(cursoId, lista);
    });
  }

  function eliminarEstudiante(cursoId, ordinal) {
    return obtenerCurso(cursoId).then(function (c) {
      if (!c) throw new Error('Curso no encontrado');
      var lista = (Array.isArray(c.estudiantes) ? c.estudiantes : [])
        .filter(function (e) { return e.ordinal !== ordinal; });
      lista = _reasignarOrdinales(lista);
      return _guardarRoster(cursoId, lista);
    });
  }

  /**
   * Importa estudiantes desde CSV. Formato esperado:
   *   nombre,apellido_p,apellido_m,rut,sexo,fecha_nac
   * Reemplaza el roster completo.
   */
  function importarEstudiantesCSV(cursoId, csvTexto, opts) {
    opts = opts || {};
    var lineas = String(csvTexto || '').split(/\r?\n/).filter(function (l) { return l.trim(); });
    if (lineas.length === 0) throw new Error('CSV vacío');
    // Detectar header
    var primera = lineas[0].toLowerCase();
    var tieneHeader = /nombre|apellido|rut/.test(primera);
    var datos = tieneHeader ? lineas.slice(1) : lineas;
    var lista = [];
    datos.forEach(function (linea) {
      var cols = _parseCSVRow(linea);
      if (cols.length < 2) return;
      var est = {
        ordinal:   0,  // se asigna después
        nombre:    (cols[0] || '').trim(),
        apellidoP: (cols[1] || '').trim(),
        apellidoM: (cols[2] || '').trim(),
        rut:       formatearRut((cols[3] || '').trim()),
        rutValido: cols[3] ? validarRut(cols[3]) : false,
        sexo:      (cols[4] || '').trim(),
        fechaNac:  (cols[5] || '').trim(),
        activo:    true
      };
      if (est.nombre || est.apellidoP) lista.push(est);
    });
    if (lista.length === 0) throw new Error('No se pudieron parsear estudiantes del CSV');
    lista.sort(_ordenAlfabetico);
    lista = _reasignarOrdinales(lista);
    return _guardarRoster(cursoId, lista, opts.reemplazar !== false);
  }

  // ─── Asignaturas asignadas ─────────────────────────────────

  /**
   * Asigna una asignatura a un docente en el curso.
   * Si ya existe la asignatura, actualiza el docente.
   */
  function asignarAsignatura(cursoId, asig) {
    if (!asig || !asig.asignatura) throw new Error('asignatura es obligatoria');
    return obtenerCurso(cursoId).then(function (c) {
      if (!c) throw new Error('Curso no encontrado');
      var lista = Array.isArray(c.asignaturasAsignadas) ? c.asignaturasAsignadas.slice() : [];
      var idx = lista.findIndex(function (a) { return a.asignatura === asig.asignatura; });
      var reg = {
        asignatura:      asig.asignatura,
        docenteUid:      asig.docenteUid || '',
        docenteNombre:   asig.docenteNombre || '',
        docenteEmail:    asig.docenteEmail || '',
        horasSemanales:  asig.horasSemanales || 0
      };
      if (idx === -1) lista.push(reg); else lista[idx] = reg;
      return EL_DB.collection('cursos').doc(cursoId).update({
        asignaturasAsignadas: lista,
        actualizadoEn:        new Date().toISOString()
      }).then(function () { _log('asignar_asignatura', { cursoId: cursoId, asignatura: asig.asignatura }); });
    });
  }

  function desasignarAsignatura(cursoId, asignatura) {
    return obtenerCurso(cursoId).then(function (c) {
      if (!c) throw new Error('Curso no encontrado');
      var lista = (c.asignaturasAsignadas || [])
        .filter(function (a) { return a.asignatura !== asignatura; });
      return EL_DB.collection('cursos').doc(cursoId).update({
        asignaturasAsignadas: lista,
        actualizadoEn:        new Date().toISOString()
      });
    });
  }

  // ─── Helpers privados ──────────────────────────────────────

  function _proximoOrdinal(lista) {
    var max = 0;
    (lista || []).forEach(function (e) { if (e.ordinal > max) max = e.ordinal; });
    return max + 1;
  }

  function _reasignarOrdinales(lista) {
    return lista.map(function (e, i) { return Object.assign({}, e, { ordinal: i + 1 }); });
  }

  function _ordenAlfabetico(a, b) {
    var na = ((a.apellidoP || '') + ' ' + (a.apellidoM || '') + ' ' + (a.nombre || '')).toLowerCase();
    var nb = ((b.apellidoP || '') + ' ' + (b.apellidoM || '') + ' ' + (b.nombre || '')).toLowerCase();
    return na.localeCompare(nb);
  }

  function _guardarRoster(cursoId, lista) {
    return EL_DB.collection('cursos').doc(cursoId).update({
      estudiantes:      lista,
      totalEstudiantes: lista.length,
      actualizadoEn:    new Date().toISOString()
    }).then(function () { _log('editar_roster', { cursoId: cursoId, total: lista.length }); });
  }

  /**
   * Parseador CSV simple: soporta comas dentro de comillas dobles.
   */
  function _parseCSVRow(linea) {
    var res = []; var actual = ''; var enComilla = false;
    for (var i = 0; i < linea.length; i++) {
      var ch = linea.charAt(i);
      if (ch === '"') { enComilla = !enComilla; continue; }
      if ((ch === ',' || ch === ';') && !enComilla) {
        res.push(actual); actual = ''; continue;
      }
      actual += ch;
    }
    res.push(actual);
    return res;
  }

  function _log(tipo, meta) {
    try {
      if (window.ELDB && ELDB.actividad && ELDB.actividad.log) {
        ELDB.actividad.log(tipo, meta || {});
      }
    } catch (e) {}
  }

  // ─── API pública ───────────────────────────────────────────
  window.CCCursos = {
    NIVELES_VALIDOS:      NIVELES_VALIDOS,
    cursoIdSlug:          cursoIdSlug,
    nombreCompleto:       nombreCompleto,
    validarRut:           validarRut,
    formatearRut:         formatearRut,
    // CRUD
    crearCurso:           crearCurso,
    actualizarCurso:      actualizarCurso,
    obtenerCurso:         obtenerCurso,
    listarCursos:         listarCursos,
    misCursos:            misCursos,
    // Roster
    agregarEstudiante:    agregarEstudiante,
    actualizarEstudiante: actualizarEstudiante,
    eliminarEstudiante:   eliminarEstudiante,
    importarEstudiantesCSV: importarEstudiantesCSV,
    // Asignaturas
    asignarAsignatura:    asignarAsignatura,
    desasignarAsignatura: desasignarAsignatura
  };
})();
