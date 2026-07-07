/**
 * dashboard.js — Click&Clase
 *
 * Helpers para calcular estadísticas agregadas del colegio para los
 * dashboards de Director, Rector, UTP y Admin Colegio.
 *
 * Todas las funciones filtran por liceoSlug para respetar multi-tenant.
 *
 * Dependencias globales:
 *   - EL_DB
 *   - CCCursos, CCLibroClases, CCNotas, CCAprobaciones (si están cargados)
 */

(function () {
  'use strict';

  function _liceoDelUser() {
    if (!window.ELAuth || !ELAuth.user) return '';
    var u = ELAuth.user;
    return u.liceoSlug || u.liceoPrincipal || '';
  }

  function _hoyISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  function _diasAtras(dias) {
    var d = new Date(); d.setDate(d.getDate() - dias);
    return d.toISOString().slice(0, 10);
  }

  function _inicioSemanaISO() {
    var d = new Date();
    var day = d.getDay() || 7; // lunes=1..domingo=7
    d.setDate(d.getDate() - day + 1);
    return d.toISOString().slice(0, 10);
  }

  // ═══════════════════════════════════════════════════════════
  //  KPIs GLOBALES DEL COLEGIO
  // ═══════════════════════════════════════════════════════════

  /**
   * KPIs institucionales de alto nivel para el dashboard.
   *
   * @param {string} liceoSlug (opcional; usa el del user si no)
   * @returns Promise<{
   *   cursos, docentes, estudiantes,
   *   planTotales, planAprobadas, planPendientes,
   *   asistenciaHoy, promedioColegio
   * }>
   */
  function kpisInstitucionales(liceoSlug) {
    liceoSlug = liceoSlug || _liceoDelUser();
    var out = {
      cursos: 0, docentes: 0, estudiantes: 0,
      planTotales: 0, planAprobadas: 0, planPendientes: 0,
      registrosHoy: 0, asistenciaGlobal: 0,
      promedioColegio: 0
    };
    var promesas = [
      // Cursos y estudiantes
      EL_DB.collection('cursos').get().then(function (snap) {
        var cursos = 0, estudiantes = 0, docSet = {};
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.activo === false) return;
          cursos++;
          estudiantes += (d.totalEstudiantes || (d.estudiantes || []).length);
          (d.asignaturasAsignadas || []).forEach(function (a) {
            if (a.docenteUid) docSet[a.docenteUid] = true;
          });
          if (d.jefeUid) docSet[d.jefeUid] = true;
        });
        out.cursos = cursos;
        out.docentes = Object.keys(docSet).length;
        out.estudiantes = estudiantes;
      }),
      // Planificaciones
      EL_DB.collection('planificaciones').get().then(function (snap) {
        var t = 0, aprob = 0, pend = 0;
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          t++;
          if (d.estado === 'aprobada') aprob++;
          if (d.estado === 'enviada' || d.estado === 'en_revision') pend++;
        });
        out.planTotales = t;
        out.planAprobadas = aprob;
        out.planPendientes = pend;
      }),
      // Registros de hoy y asistencia agregada
      EL_DB.collection('libro_clases').get().then(function (snap) {
        var hoy = _hoyISO();
        var regsHoy = 0, tP = 0, tA = 0, tT = 0;
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.fecha === hoy) regsHoy++;
          tP += (d.totalPresentes || 0);
          tA += (d.totalAusentes || 0);
          tT += (d.totalAtrasados || 0);
        });
        out.registrosHoy = regsHoy;
        var totalAsist = tP + tA;
        out.asistenciaGlobal = totalAsist > 0 ? Math.round(((tP + tT) / totalAsist) * 100) : 0;
      }),
      // Promedio general del colegio (semestre actual)
      EL_DB.collection('notas').get().then(function (snap) {
        var sem = new Date().getMonth() + 1 <= 6 ? 1 : 2;
        var sumaProd = 0, sumaPond = 0;
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.semestre !== sem) return;
          var p = parseInt(d.ponderacion || 0, 10);
          sumaProd += (d.nota || 0) * p;
          sumaPond += p;
        });
        out.promedioColegio = sumaPond > 0 ? Math.round((sumaProd / sumaPond) * 10) / 10 : 0;
      })
    ];
    return Promise.all(promesas).then(function () { return out; });
  }

  // ═══════════════════════════════════════════════════════════
  //  ASISTENCIA POR CURSO (para gráfico)
  // ═══════════════════════════════════════════════════════════

  /**
   * Agrupa asistencia por curso (últimos N días).
   * @returns Promise<Array<{cursoId, cursoNombre, porcentaje, totalDias}>>
   */
  function asistenciaPorCurso(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug || _liceoDelUser();
    var desde = opts.desde || _diasAtras(30);
    return EL_DB.collection('libro_clases').get().then(function (snap) {
      var porCurso = {};
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (d.fecha < desde) return;
        var k = d.cursoId;
        if (!porCurso[k]) porCurso[k] = { cursoId: k, cursoNombre: d.cursoNombre, P: 0, A: 0, T: 0, J: 0, totalDias: 0 };
        porCurso[k].P += (d.totalPresentes || 0);
        porCurso[k].A += (d.totalAusentes || 0);
        porCurso[k].T += (d.totalAtrasados || 0);
        porCurso[k].J += (d.totalJustificados || 0);
        porCurso[k].totalDias++;
      });
      var arr = Object.values(porCurso).map(function (x) {
        var total = x.P + x.A;
        x.porcentaje = total > 0 ? Math.round(((x.P + x.T) / total) * 100) : 0;
        return x;
      });
      arr.sort(function (a, b) { return a.porcentaje - b.porcentaje; });
      return arr;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  PARTICIPACIÓN DOCENTE (últimos 7 días)
  // ═══════════════════════════════════════════════════════════

  /**
   * Cantidad de material generado (planificaciones + materiales + evaluaciones)
   * por día en los últimos N días.
   * @returns Promise<Array<{fecha, cantidad}>>
   */
  function participacionDocentePorDia(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug || _liceoDelUser();
    var dias = opts.dias || 7;
    var desde = _diasAtras(dias);
    var COLS = ['planificaciones','materiales','evaluaciones'];
    return Promise.all(COLS.map(function (col) {
      return EL_DB.collection(col).get().then(function (snap) {
        var out = [];
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          var f = (d.creadoEn || d.estadoFecha || '').slice(0, 10);
          if (f && f >= desde) out.push(f);
        });
        return out;
      }).catch(function () { return []; });
    })).then(function (arrs) {
      var todo = [].concat.apply([], arrs);
      var porDia = {};
      // Inicializar con los últimos N días
      for (var i = 0; i < dias; i++) {
        var d = new Date(); d.setDate(d.getDate() - i);
        var f = d.toISOString().slice(0, 10);
        porDia[f] = 0;
      }
      todo.forEach(function (f) { if (f in porDia) porDia[f]++; });
      var res = Object.keys(porDia).sort().map(function (f) {
        return { fecha: f, cantidad: porDia[f] };
      });
      return res;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  ALERTAS
  // ═══════════════════════════════════════════════════════════

  /**
   * Consolidado de alertas del colegio:
   *  - Docentes sin planificar esta semana
   *  - Planificaciones pendientes de revisión hace >5 días
   *  - Estudiantes en riesgo académico (promedio <4.5)
   *  - Estudiantes con baja asistencia (<80%)
   */
  function alertas(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug || _liceoDelUser();
    var out = {
      docSinPlanificar:   [],
      revisionAtrasada:   [],
      estudiantesRiesgo:  [],
      bajaAsistencia:     []
    };

    var inicioSem = _inicioSemanaISO();
    var hace5dias = _diasAtras(5);
    var hace30dias = _diasAtras(30);

    var promesas = [
      // 1) Docentes que crearon planificaciones esta semana → los que NO están en la lista son "sin planificar"
      Promise.all([
        EL_DB.collection('cursos').get(),
        EL_DB.collection('planificaciones').get()
      ]).then(function (arr) {
        var docentes = {};
        arr[0].forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.activo === false) return;
          (d.asignaturasAsignadas || []).forEach(function (a) {
            if (a.docenteUid) docentes[a.docenteUid] = { uid: a.docenteUid, nombre: a.docenteNombre, asignatura: a.asignatura, curso: d.nombreCompleto };
          });
        });
        var planificaron = {};
        arr[1].forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          var creado = (d.creadoEn || '').slice(0, 10);
          if (creado >= inicioSem && d.autorUid) planificaron[d.autorUid] = true;
        });
        Object.values(docentes).forEach(function (d) {
          if (!planificaron[d.uid]) out.docSinPlanificar.push(d);
        });
      }),

      // 2) Planificaciones pendientes hace >5 días
      EL_DB.collection('planificaciones').get().then(function (snap) {
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.estado !== 'enviada' && d.estado !== 'en_revision') return;
          var enviado = (d.enviadoEn || d.estadoFecha || '').slice(0, 10);
          if (enviado && enviado <= hace5dias) {
            out.revisionAtrasada.push({
              id: doc.id, titulo: d.titulo || d.tema || '(sin título)',
              autor: d.autorNombre, curso: d.curso, enviadoEn: enviado,
              estado: d.estado
            });
          }
        });
      }),

      // 3 y 4) Riesgo académico y baja asistencia por curso
      EL_DB.collection('cursos').get().then(function (snap) {
        var cursosProm = [];
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.activo === false) return;
          if (window.CCNotas) {
            cursosProm.push(CCNotas.reporteRiesgo(d.cursoId, new Date().getMonth() + 1 <= 6 ? 1 : 2).then(function (r) {
              (r || []).forEach(function (x) {
                out.estudiantesRiesgo.push({
                  ordinal: x.ordinal, nombre: x.nombre, asignatura: x.asignatura,
                  promedio: x.promedio, cursoNombre: d.nombreCompleto, aprobado: x.aprobado
                });
              });
            }).catch(function(){}));
          }
          if (window.CCLibroClases) {
            cursosProm.push(CCLibroClases.estadisticasCurso({ cursoId: d.cursoId, desde: hace30dias })
              .then(function (est) {
                (est.porEstudiante || []).forEach(function (e) {
                  if (e.totalDias > 0 && e.porcentajeAsistencia < 80) {
                    out.bajaAsistencia.push({
                      ordinal: e.ordinal, nombre: e.nombreCompleto,
                      cursoNombre: d.nombreCompleto,
                      porcentajeAsistencia: e.porcentajeAsistencia,
                      diasClase: e.totalDias
                    });
                  }
                });
              }).catch(function(){}));
          }
        });
        return Promise.all(cursosProm);
      })
    ];

    return Promise.all(promesas).then(function () {
      // Ordenar cada lista
      out.estudiantesRiesgo.sort(function (a, b) { return a.promedio - b.promedio; });
      out.bajaAsistencia.sort(function (a, b) { return a.porcentajeAsistencia - b.porcentajeAsistencia; });
      return out;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  Cobertura curricular por curso
  // ═══════════════════════════════════════════════════════════

  /**
   * Cuenta planificaciones aprobadas por curso como proxy de cobertura.
   */
  function coberturaPorCurso(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug || _liceoDelUser();
    return Promise.all([
      EL_DB.collection('cursos').get(),
      EL_DB.collection('planificaciones').get()
    ]).then(function (arr) {
      var porCurso = {};
      arr[0].forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (d.activo === false) return;
        porCurso[d.cursoId] = { cursoId: d.cursoId, cursoNombre: d.nombreCompleto, aprobadas: 0, totales: 0 };
      });
      arr[1].forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        // Usar curso o cursoTexto para matchear con el listado de cursos
        var matched = null;
        Object.values(porCurso).forEach(function (c) {
          if (!matched && d.curso && c.cursoNombre &&
              c.cursoNombre.toLowerCase().indexOf(String(d.curso).toLowerCase()) !== -1) matched = c;
        });
        if (matched) {
          matched.totales++;
          if (d.estado === 'aprobada') matched.aprobadas++;
        }
      });
      var arr2 = Object.values(porCurso);
      arr2.forEach(function (c) {
        c.porcentaje = c.totales > 0 ? Math.round((c.aprobadas / c.totales) * 100) : 0;
      });
      arr2.sort(function (a, b) { return b.porcentaje - a.porcentaje; });
      return arr2;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  API pública
  // ═══════════════════════════════════════════════════════════
  window.CCDashboard = {
    kpisInstitucionales:      kpisInstitucionales,
    asistenciaPorCurso:       asistenciaPorCurso,
    participacionDocentePorDia: participacionDocentePorDia,
    alertas:                  alertas,
    coberturaPorCurso:        coberturaPorCurso
  };
})();
