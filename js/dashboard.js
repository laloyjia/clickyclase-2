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
      // Planificaciones — cuenta 'aprobada'/'activa'/'publicada' como aprobadas
      EL_DB.collection('planificaciones').get().then(function (snap) {
        var APROBADAS = ['aprobada','activa','publicada'];
        var PENDIENTES = ['enviada','en_revision','borrador'];
        var t = 0, aprob = 0, pend = 0;
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          t++;
          if (APROBADAS.indexOf(d.estado) !== -1) aprob++;
          else if (PENDIENTES.indexOf(d.estado) !== -1) pend++;
        });
        out.planTotales = t;
        out.planAprobadas = aprob;
        out.planPendientes = pend;
      }),
      // Clases dictadas hoy (libro_clases)
      EL_DB.collection('libro_clases').get().then(function (snap) {
        var hoy = _hoyISO();
        var regsHoy = 0;
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.fecha === hoy) regsHoy++;
        });
        out.registrosHoy = regsHoy;
      }).catch(function(){ out.registrosHoy = 0; }),
      // Asistencia global — lee de 2 colecciones (nueva "asistencia" + legacy "libro_clases")
      // Campos aceptados: singular (totalPresente) o plural (totalPresentes)
      Promise.all([
        EL_DB.collection('asistencia').get().catch(function(){ return { forEach: function(){} }; }),
        EL_DB.collection('libro_clases').get().catch(function(){ return { forEach: function(){} }; })
      ]).then(function(snaps) {
        var tP = 0, tA = 0, tT = 0;
        function _acumular(snap) {
          snap.forEach(function (doc) {
            var d = doc.data() || {};
            if (liceoSlug && d.liceoSlug !== liceoSlug) return;
            tP += (d.totalPresente || d.totalPresentes || 0);
            tA += (d.totalAusente  || d.totalAusentes  || 0);
            tT += (d.totalAtrasado || d.totalAtrasados || 0);
          });
        }
        _acumular(snaps[0]);  // colección nueva
        _acumular(snaps[1]);  // libro_clases legacy (algunos docs pueden tener asistencia también)
        var totalAsist = tP + tA;
        out.asistenciaGlobal = totalAsist > 0 ? Math.round(((tP + tT) / totalAsist) * 100) : 0;
      }).catch(function(){ out.asistenciaGlobal = 0; }),
      // Promedio general del colegio — tolera 2 shapes:
      //   legacy: doc con { nota, ponderacion, semestre }
      //   nuevo:  doc con { notas: [{nota, uid, nombre}], ponderacion, semestre }
      EL_DB.collection('notas').get().then(function (snap) {
        var sem = new Date().getMonth() + 1 <= 6 ? 1 : 2;
        var sumaProd = 0, sumaPond = 0;
        var sumaSimple = 0, countSimple = 0;
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          // Si el doc tiene semestre y no coincide, saltar; si no tiene, procesar
          if ('semestre' in d && d.semestre !== sem) return;
          var p = parseInt(d.ponderacion || 0, 10) || 1;
          // Shape nuevo: array de notas
          if (Array.isArray(d.notas) && d.notas.length) {
            d.notas.forEach(function(n){
              if (typeof n.nota === 'number') {
                sumaProd += n.nota * p;
                sumaPond += p;
                sumaSimple += n.nota;
                countSimple++;
              }
            });
          }
          // Shape legacy: nota directa
          else if (typeof d.nota === 'number') {
            sumaProd += d.nota * p;
            sumaPond += p;
            sumaSimple += d.nota;
            countSimple++;
          }
        });
        // Fallback: si ponderación no aporta, usar promedio simple
        var prom = sumaPond > 0 ? (sumaProd / sumaPond) : (countSimple > 0 ? (sumaSimple / countSimple) : 0);
        out.promedioColegio = Math.round(prom * 10) / 10;
      }).catch(function(){ out.promedioColegio = 0; })
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

    // Lee de ambas colecciones (nueva "asistencia" + legacy "libro_clases")
    return Promise.all([
      EL_DB.collection('asistencia').get().catch(function(){ return { forEach: function(){} }; }),
      EL_DB.collection('libro_clases').get().catch(function(){ return { forEach: function(){} }; })
    ]).then(function(snaps) {
      var porCurso = {};
      function _acumular(snap) {
        snap.forEach(function (doc) {
          var d = doc.data() || {};
          if (liceoSlug && d.liceoSlug !== liceoSlug) return;
          if (d.fecha < desde) return;
          var k = d.cursoId;
          if (!k) return;
          if (!porCurso[k]) porCurso[k] = { cursoId: k, cursoNombre: d.cursoNombre || k, P: 0, A: 0, T: 0, J: 0, totalDias: 0 };
          porCurso[k].P += (d.totalPresente || d.totalPresentes || 0);
          porCurso[k].A += (d.totalAusente  || d.totalAusentes  || 0);
          porCurso[k].T += (d.totalAtrasado || d.totalAtrasados || 0);
          porCurso[k].J += (d.totalJustificado || d.totalJustificados || 0);
          porCurso[k].totalDias++;
        });
      }
      _acumular(snaps[0]);
      _acumular(snaps[1]);
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
          // Fallback: usar doc.id si el campo cursoId no existe
          var _cursoId = d.cursoId || d.id || doc.id;
          if (!_cursoId) return;
          if (window.CCNotas) {
            cursosProm.push(CCNotas.reporteRiesgo(_cursoId, new Date().getMonth() + 1 <= 6 ? 1 : 2).then(function (r) {
              (r || []).forEach(function (x) {
                out.estudiantesRiesgo.push({
                  ordinal: x.ordinal, nombre: x.nombre, asignatura: x.asignatura,
                  promedio: x.promedio, cursoNombre: d.nombreCompleto, aprobado: x.aprobado
                });
              });
            }).catch(function(){}));
          }
          // Fallback / complemento: calcular riesgo desde el shape agrupado
          // (colección 'notas' con docs {cursoId, asignatura, notas: [{uid, nombre, nota}]})
          cursosProm.push(
            EL_DB.collection('notas')
              .where('cursoId', '==', _cursoId)
              .get()
              .then(function (nsnap) {
                if (nsnap.empty) return;
                // Agrupar por (alumno.uid + asignatura) para calcular promedio
                var acc = {};
                nsnap.forEach(function (ndoc) {
                  var nd = ndoc.data() || {};
                  if (!Array.isArray(nd.notas)) return;
                  var asig = nd.asignatura || 'General';
                  nd.notas.forEach(function (n) {
                    if (!n || typeof n.nota !== 'number') return;
                    var k = (n.uid || n.nombre || '_') + '|' + asig;
                    if (!acc[k]) acc[k] = { nombre: n.nombre, asignatura: asig, notas: [] };
                    acc[k].notas.push(n.nota);
                  });
                });
                Object.values(acc).forEach(function (item) {
                  if (!item.notas.length) return;
                  var suma = item.notas.reduce(function(a,b){ return a+b; }, 0);
                  var prom = Math.round((suma / item.notas.length) * 10) / 10;
                  // Consideramos "en riesgo" si promedio bajo 4.5 (aprobación es 4.0)
                  if (prom > 0 && prom < 4.5) {
                    // Evitar duplicados con CCNotas
                    if (!out.estudiantesRiesgo.some(function(x){
                      return x.nombre === item.nombre && x.asignatura === item.asignatura && x.cursoNombre === d.nombreCompleto;
                    })) {
                      out.estudiantesRiesgo.push({
                        ordinal: 0, nombre: item.nombre, asignatura: item.asignatura,
                        promedio: prom, cursoNombre: d.nombreCompleto, aprobado: prom >= 4.0
                      });
                    }
                  }
                });
              })
              .catch(function(e){ console.warn('[dashboard] notas', _cursoId, e); })
          );
          if (window.CCLibroClases) {
            cursosProm.push(CCLibroClases.estadisticasCurso({ cursoId: _cursoId, desde: hace30dias })
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
          // Fallback / complemento: calcular baja asistencia desde la colección 'asistencia' (raíz)
          // Esta colección guarda un doc por curso × día con registros[] de cada alumno
          cursosProm.push(
            EL_DB.collection('asistencia')
              .where('cursoId', '==', _cursoId)
              .get()
              .then(function (asnap) {
                if (asnap.empty) return;
                var porAlumno = {};
                asnap.forEach(function (adoc) {
                  var ad = adoc.data() || {};
                  if (ad.fecha < hace30dias) return;
                  var regs = Array.isArray(ad.registros) ? ad.registros : [];
                  regs.forEach(function (r) {
                    if (!porAlumno[r.uid]) porAlumno[r.uid] = { uid: r.uid, nombre: r.nombre, presente: 0, atrasado: 0, justificado: 0, ausente: 0, total: 0 };
                    porAlumno[r.uid][r.estado] = (porAlumno[r.uid][r.estado] || 0) + 1;
                    porAlumno[r.uid].total++;
                  });
                });
                Object.values(porAlumno).forEach(function (a) {
                  if (a.total <= 0) return;
                  var asistidos = a.presente + a.atrasado + a.justificado;
                  var porc = Math.round((asistidos / a.total) * 100);
                  if (porc < 80) {
                    // Evitar duplicados con CCLibroClases si ya lo agregó
                    if (!out.bajaAsistencia.some(function(x){ return x.nombre === a.nombre && x.cursoNombre === d.nombreCompleto; })) {
                      out.bajaAsistencia.push({
                        ordinal: 0, nombre: a.nombre,
                        cursoNombre: d.nombreCompleto,
                        porcentajeAsistencia: porc,
                        diasClase: a.total
                      });
                    }
                  }
                });
              })
              .catch(function(e){ console.warn('[dashboard] asistencia', _cursoId, e); })
          );
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
    // Estados que contamos como "aprobada" (activa=en uso, aprobada=validada UTP)
    var ESTADOS_APROBADOS = ['aprobada', 'activa', 'publicada'];
    return Promise.all([
      EL_DB.collection('cursos').get(),
      EL_DB.collection('planificaciones').get()
    ]).then(function (arr) {
      var porCurso = {};
      var cursosArr = [];
      arr[0].forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (d.activo === false) return;
        var _cursoId = d.cursoId || d.id || doc.id;
        var reg = {
          cursoId: _cursoId,
          cursoNombre: d.nombreCompleto || (d.nivel + d.letra) || _cursoId,
          nivel: d.nivel || '',
          letra: d.letra || '',
          aprobadas: 0, totales: 0
        };
        porCurso[_cursoId] = reg;
        cursosArr.push(reg);
      });
      arr[1].forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        var aprobada = ESTADOS_APROBADOS.indexOf(d.estado) !== -1;
        // Matcheo por múltiples criterios (cursoId directo > texto curso > nivel)
        var matched = null;
        if (d.cursoId && porCurso[d.cursoId]) {
          matched = porCurso[d.cursoId];
        } else if (d.curso) {
          for (var i = 0; i < cursosArr.length; i++) {
            if (cursosArr[i].cursoNombre.toLowerCase().indexOf(String(d.curso).toLowerCase()) !== -1) {
              matched = cursosArr[i]; break;
            }
          }
        } else if (d.nivel) {
          // Sin curso específico → cuenta para TODOS los cursos de ese nivel
          cursosArr.forEach(function(c){
            if (c.nivel === d.nivel) {
              c.totales++;
              if (aprobada) c.aprobadas++;
            }
          });
          return; // ya contó, no seguir
        }
        if (matched) {
          matched.totales++;
          if (aprobada) matched.aprobadas++;
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
