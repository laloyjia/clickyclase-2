/**
 * notas.js — Click&Clase
 *
 * Registro y cálculo de calificaciones (notas) con ponderación por
 * semestre y por asignatura. Sistema chileno: escala 1.0 a 7.0, con
 * decimal (5.4, 6.1, etc). Nota mínima aprobatoria: 4.0.
 *
 * Modelo:
 *   notas/{notaId} = {
 *     notaId, liceoSlug, cursoId,
 *     estudianteOrdinal, estudianteNombre,
 *     asignatura, docenteUid, docenteNombre,
 *     semestre (1 | 2), tipo ('coef1'|'coef2'|'semestral'|'final'),
 *     concepto ('Prueba unidad 1', 'Guía práctica', ...),
 *     nota (float 1.0-7.0), ponderacion (% del semestre),
 *     fechaEvaluacion,
 *     evaluacionId? (ref a doc de evaluaciones),
 *     observaciones,
 *     creadoEn, actualizadoEn
 *   }
 *
 * Cálculo de promedios: se hace on-the-fly desde la lista de notas
 * de cada estudiante para cada asignatura/semestre.
 */

(function () {
  'use strict';

  var TIPOS = {
    COEF1:     'coef1',
    COEF2:     'coef2',
    SEMESTRAL: 'semestral',
    FINAL:     'final'
  };

  var TIPO_LABEL = {
    coef1:     'Coeficiente 1',
    coef2:     'Coeficiente 2',
    semestral: 'Nota Semestral',
    final:     'Nota Final Anual'
  };

  var MIN = 1.0;
  var MAX = 7.0;
  var MIN_APROBADO = 4.0;

  function _uid() { return (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : ''; }
  function _user() { return (window.ELAuth && ELAuth.user) ? ELAuth.user : null; }
  function _nombre() {
    var u = _user() || {};
    return u.nombre || u.displayName || (u.email ? u.email.split('@')[0] : '');
  }

  function _validarNota(n) {
    var v = parseFloat(n);
    if (isNaN(v)) throw new Error('La nota no es un número válido');
    if (v < MIN || v > MAX) throw new Error('La nota debe estar entre ' + MIN + ' y ' + MAX);
    return Math.round(v * 10) / 10;  // Un decimal
  }

  /**
   * Registrar una nota para un estudiante.
   * @param {object} datos { cursoId, estudianteOrdinal, estudianteNombre,
   *                          asignatura, semestre, tipo, concepto, nota,
   *                          ponderacion, fechaEvaluacion, evaluacionId?,
   *                          observaciones? }
   */
  function registrarNota(datos) {
    datos = datos || {};
    if (!datos.cursoId) throw new Error('cursoId requerido');
    if (!datos.estudianteOrdinal) throw new Error('estudianteOrdinal requerido');
    if (!datos.asignatura) throw new Error('asignatura requerida');
    if (!datos.concepto) throw new Error('concepto requerido');
    if (!datos.semestre) datos.semestre = _semestreActual();
    if (!datos.tipo) datos.tipo = TIPOS.COEF1;
    datos.nota = _validarNota(datos.nota);
    datos.ponderacion = parseInt(datos.ponderacion || 20, 10);
    var u = _user() || {};
    var notaId = _idAuto();
    var doc = {
      notaId:            notaId,
      liceoSlug:         datos.liceoSlug || u.liceoSlug || u.liceoPrincipal || '',
      cursoId:           datos.cursoId,
      estudianteOrdinal: datos.estudianteOrdinal,
      estudianteNombre:  datos.estudianteNombre || '',
      asignatura:        datos.asignatura,
      docenteUid:        u.uid || '',
      docenteNombre:     _nombre(),
      semestre:          parseInt(datos.semestre, 10),
      tipo:              datos.tipo,
      concepto:          datos.concepto,
      nota:              datos.nota,
      ponderacion:       datos.ponderacion,
      fechaEvaluacion:   datos.fechaEvaluacion || _hoyISO(),
      evaluacionId:      datos.evaluacionId || '',
      observaciones:     datos.observaciones || '',
      creadoEn:          new Date().toISOString(),
      actualizadoEn:     new Date().toISOString()
    };
    return EL_DB.collection('notas').doc(notaId).set(doc)
      .then(function () {
        _log('registrar_nota', {
          cursoId: doc.cursoId, asignatura: doc.asignatura,
          estudianteOrdinal: doc.estudianteOrdinal, nota: doc.nota
        });
        return doc;
      });
  }

  /**
   * Actualizar una nota existente.
   */
  function actualizarNota(notaId, cambios) {
    cambios = cambios || {};
    if ('nota' in cambios) cambios.nota = _validarNota(cambios.nota);
    cambios.actualizadoEn = new Date().toISOString();
    delete cambios.notaId; delete cambios.creadoEn;
    return EL_DB.collection('notas').doc(notaId).update(cambios);
  }

  function eliminarNota(notaId) {
    return EL_DB.collection('notas').doc(notaId).delete()
      .then(function () { _log('eliminar_nota', { notaId: notaId }); });
  }

  /**
   * Lista notas del curso filtradas por asignatura y semestre.
   * @param {object} opts { cursoId, asignatura?, semestre?, estudianteOrdinal? }
   */
  function listarNotas(opts) {
    opts = opts || {};
    if (!opts.cursoId) throw new Error('cursoId requerido');
    return EL_DB.collection('notas').get().then(function (snap) {
      var items = [];
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (d.cursoId !== opts.cursoId) return;
        if (opts.asignatura && d.asignatura !== opts.asignatura) return;
        if (opts.semestre && d.semestre !== parseInt(opts.semestre, 10)) return;
        if (opts.estudianteOrdinal && d.estudianteOrdinal !== opts.estudianteOrdinal) return;
        items.push(d);
      });
      items.sort(function (a, b) { return String(b.fechaEvaluacion || '').localeCompare(a.fechaEvaluacion || ''); });
      return items;
    });
  }

  /**
   * Calcula el promedio ponderado de un estudiante en una asignatura y semestre.
   * @returns { promedio, notas, sumaPonderaciones, aprobado }
   */
  function calcularPromedio(notas) {
    if (!Array.isArray(notas) || !notas.length) {
      return { promedio: 0, notas: [], sumaPonderaciones: 0, aprobado: false };
    }
    var sumaProducto = 0, sumaPond = 0;
    notas.forEach(function (n) {
      var p = parseInt(n.ponderacion || 0, 10);
      sumaProducto += (n.nota || 0) * p;
      sumaPond += p;
    });
    var prom = sumaPond > 0 ? (sumaProducto / sumaPond) : 0;
    prom = Math.round(prom * 10) / 10;
    return {
      promedio:          prom,
      notas:             notas,
      sumaPonderaciones: sumaPond,
      aprobado:          prom >= MIN_APROBADO
    };
  }

  /**
   * Tabla de calificaciones del curso completo por asignatura y semestre.
   * Devuelve una matriz: filas = estudiantes, columnas = notas + promedio.
   */
  function tablaCalificaciones(opts) {
    opts = opts || {};
    if (!opts.cursoId) throw new Error('cursoId requerido');
    return Promise.all([
      EL_DB.collection('cursos').doc(opts.cursoId).get(),
      listarNotas(opts)
    ]).then(function (arr) {
      var cursoSnap = arr[0];
      var notas = arr[1];
      var curso = cursoSnap.exists ? cursoSnap.data() : null;
      if (!curso) throw new Error('Curso no encontrado');
      var estudiantes = curso.estudiantes || [];

      // Conceptos únicos ordenados por fecha
      var conceptosMap = {};
      notas.forEach(function (n) {
        if (!conceptosMap[n.concepto]) {
          conceptosMap[n.concepto] = { concepto: n.concepto, ponderacion: n.ponderacion, fecha: n.fechaEvaluacion, tipo: n.tipo };
        }
      });
      var conceptos = Object.values(conceptosMap).sort(function (a, b) {
        return String(a.fecha || '').localeCompare(b.fecha || '');
      });

      // Índice por estudiante+concepto
      var idx = {};
      notas.forEach(function (n) {
        idx[n.estudianteOrdinal + '|' + n.concepto] = n;
      });

      var filas = estudiantes.map(function (e) {
        var notasEst = [];
        var nombreCompleto = ((e.apellidoP || '') + ' ' + (e.apellidoM || '') + ', ' + (e.nombre || '')).trim();
        conceptos.forEach(function (c) {
          var n = idx[e.ordinal + '|' + c.concepto];
          notasEst.push(n ? n : null);
        });
        var solo = notasEst.filter(function (x) { return x; });
        var prom = calcularPromedio(solo);
        return {
          ordinal:        e.ordinal,
          nombreCompleto: nombreCompleto,
          notas:          notasEst,
          promedio:       prom.promedio,
          aprobado:       prom.aprobado,
          totalPonderaciones: prom.sumaPonderaciones
        };
      });

      return {
        curso:      curso,
        asignatura: opts.asignatura || '',
        semestre:   opts.semestre || _semestreActual(),
        conceptos:  conceptos,
        filas:      filas
      };
    });
  }

  /**
   * Reporte de riesgo académico: estudiantes con promedio bajo o
   * asignaturas con muchos reprobados.
   */
  function reporteRiesgo(cursoId, semestre) {
    return listarNotas({ cursoId: cursoId, semestre: semestre }).then(function (notas) {
      var porEstAsig = {};
      notas.forEach(function (n) {
        var k = n.estudianteOrdinal + '|' + n.asignatura;
        if (!porEstAsig[k]) porEstAsig[k] = { ordinal: n.estudianteOrdinal, nombre: n.estudianteNombre, asignatura: n.asignatura, notas: [] };
        porEstAsig[k].notas.push(n);
      });
      var enRiesgo = [];
      Object.values(porEstAsig).forEach(function (item) {
        var p = calcularPromedio(item.notas);
        if (p.promedio > 0 && p.promedio < MIN_APROBADO + 0.5) {
          enRiesgo.push({
            ordinal:    item.ordinal,
            nombre:     item.nombre,
            asignatura: item.asignatura,
            promedio:   p.promedio,
            aprobado:   p.aprobado,
            cantidadNotas: item.notas.length
          });
        }
      });
      enRiesgo.sort(function (a, b) { return a.promedio - b.promedio; });
      return enRiesgo;
    });
  }

  // ─── Helpers ───────────────────────────────────────────────

  function _semestreActual() {
    var m = new Date().getMonth() + 1;
    return m <= 6 ? 1 : 2;
  }

  function _hoyISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  function _idAuto() {
    return 'nota-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  }

  function _log(tipo, meta) {
    try { if (window.ELDB && ELDB.actividad && ELDB.actividad.log) ELDB.actividad.log(tipo, meta || {}); } catch (e) {}
  }

  // ─── API pública ───────────────────────────────────────────
  window.CCNotas = {
    TIPOS:              TIPOS,
    TIPO_LABEL:         TIPO_LABEL,
    MIN:                MIN,
    MAX:                MAX,
    MIN_APROBADO:       MIN_APROBADO,
    // CRUD
    registrarNota:      registrarNota,
    actualizarNota:     actualizarNota,
    eliminarNota:       eliminarNota,
    listarNotas:        listarNotas,
    // Cálculos y reportes
    calcularPromedio:   calcularPromedio,
    tablaCalificaciones: tablaCalificaciones,
    reporteRiesgo:      reporteRiesgo
  };
})();
