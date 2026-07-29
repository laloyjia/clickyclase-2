/**
 * horarios.js — Sistema de horarios institucionales Click&Clase
 *
 * CRUD de bloques del liceo y horarios docentes.
 *
 * MODELO Firestore:
 *   bloques_liceo/{liceoSlug}
 *     { liceoSlug, bloques: [
 *         { id, orden, horaInicio, horaFin, nombre, tipo:'clase'|'recreo'|'almuerzo' }
 *       ]}
 *   horarios/{liceoSlug}_{docenteUid}
 *     { liceoSlug, docenteUid, docenteNombre, docenteEmail,
 *       semana: {
 *         lunes:  [{ bloqueId, cursoId, cursoNombre, asignatura, sala? }],
 *         martes: [...],
 *         miercoles: [...],
 *         jueves: [...],
 *         viernes: [...],
 *         sabado: []
 *       },
 *       actualizadoEn }
 */
(function () {
  'use strict';

  var DIAS = ['lunes','martes','miercoles','jueves','viernes'];
  var DIAS_LABEL = {
    lunes:'Lunes', martes:'Martes', miercoles:'Miércoles',
    jueves:'Jueves', viernes:'Viernes'
  };
  var DIA_ISO = { 1:'lunes', 2:'martes', 3:'miercoles', 4:'jueves', 5:'viernes', 6:'domingo', 0:'domingo' };

  // Bloques por defecto para colegios chilenos (jornada mañana + tarde).
  // Solo se usan cuando el UTP no ha creado los del liceo todavía.
  // Jornada chilena estándar: 45min de clase + 15min recreo
  // Mañana: 4 bloques + 2 recreos + 45min almuerzo + 4 bloques tarde
  var BLOQUES_DEFAULT = [
    { id:'b1', orden:1,  horaInicio:'08:00', horaFin:'08:45', nombre:'1° bloque', tipo:'clase' },
    { id:'r1', orden:2,  horaInicio:'08:45', horaFin:'09:00', nombre:'Recreo',    tipo:'recreo' },
    { id:'b2', orden:3,  horaInicio:'09:00', horaFin:'09:45', nombre:'2° bloque', tipo:'clase' },
    { id:'b3', orden:4,  horaInicio:'09:45', horaFin:'10:30', nombre:'3° bloque', tipo:'clase' },
    { id:'r2', orden:5,  horaInicio:'10:30', horaFin:'10:45', nombre:'Recreo',    tipo:'recreo' },
    { id:'b4', orden:6,  horaInicio:'10:45', horaFin:'11:30', nombre:'4° bloque', tipo:'clase' },
    { id:'b5', orden:7,  horaInicio:'11:30', horaFin:'12:15', nombre:'5° bloque', tipo:'clase' },
    { id:'r3', orden:8,  horaInicio:'12:15', horaFin:'12:30', nombre:'Recreo',    tipo:'recreo' },
    { id:'b6', orden:9,  horaInicio:'12:30', horaFin:'13:15', nombre:'6° bloque', tipo:'clase' },
    { id:'al', orden:10, horaInicio:'13:15', horaFin:'14:00', nombre:'Almuerzo',  tipo:'almuerzo' },
    { id:'b7', orden:11, horaInicio:'14:00', horaFin:'14:45', nombre:'7° bloque', tipo:'clase' },
    { id:'r4', orden:12, horaInicio:'14:45', horaFin:'15:00', nombre:'Recreo',    tipo:'recreo' },
    { id:'b8', orden:13, horaInicio:'15:00', horaFin:'15:45', nombre:'8° bloque', tipo:'clase' }
  ];

  function _user() { return (window.ELAuth && ELAuth.user) || {}; }
  function _liceo() { return _user().liceoSlug || ''; }
  function _uid()   { return _user().uid || ''; }

  // ── Bloques del liceo ──────────────────────────────────────────
  function getBloques(liceoSlug) {
    liceoSlug = liceoSlug || _liceo();
    if (!liceoSlug) return Promise.resolve(BLOQUES_DEFAULT.slice());
    return EL_DB.collection('bloques_liceo').doc(liceoSlug).get().then(function (snap) {
      if (snap.exists && snap.data() && Array.isArray(snap.data().bloques) && snap.data().bloques.length) {
        return snap.data().bloques.slice().sort(function(a,b){ return (a.orden||0) - (b.orden||0); });
      }
      return BLOQUES_DEFAULT.slice();
    }).catch(function () { return BLOQUES_DEFAULT.slice(); });
  }

  function guardarBloques(liceoSlug, bloques) {
    liceoSlug = liceoSlug || _liceo();
    if (!liceoSlug) return Promise.reject(new Error('liceo requerido'));
    var doc = {
      liceoSlug:     liceoSlug,
      bloques:       bloques || [],
      actualizadoEn: new Date().toISOString(),
      actualizadoPor: _user().email || ''
    };
    return EL_DB.collection('bloques_liceo').doc(liceoSlug).set(doc);
  }

  // ── Horario de un docente ──────────────────────────────────────
  function _horarioId(liceoSlug, docenteUid) {
    return (liceoSlug || _liceo()) + '__' + (docenteUid || _uid());
  }

  function getHorarioDocente(docenteUid, liceoSlug) {
    var id = _horarioId(liceoSlug, docenteUid);
    return EL_DB.collection('horarios').doc(id).get().then(function (snap) {
      if (snap.exists) return snap.data();
      return { liceoSlug: liceoSlug || _liceo(), docenteUid: docenteUid || _uid(),
               semana: _semanaVacia() };
    }).catch(function () {
      return { liceoSlug: liceoSlug || _liceo(), docenteUid: docenteUid || _uid(),
               semana: _semanaVacia() };
    });
  }

  function _semanaVacia() {
    var s = {};
    DIAS.forEach(function (d) { s[d] = []; });
    return s;
  }

  /**
   * Guarda el horario completo de un docente.
   * @param opts { docenteUid, docenteNombre, docenteEmail, liceoSlug, semana }
   */
  function guardarHorarioDocente(opts) {
    opts = opts || {};
    var liceoSlug  = opts.liceoSlug || _liceo();
    var docenteUid = opts.docenteUid;
    if (!liceoSlug)  return Promise.reject(new Error('liceo requerido'));
    if (!docenteUid) return Promise.reject(new Error('docenteUid requerido'));
    var id = _horarioId(liceoSlug, docenteUid);
    var doc = {
      liceoSlug:      liceoSlug,
      docenteUid:     docenteUid,
      docenteNombre:  opts.docenteNombre || '',
      docenteEmail:   opts.docenteEmail || '',
      semana:         opts.semana || _semanaVacia(),
      actualizadoEn:  new Date().toISOString(),
      actualizadoPor: _user().email || ''
    };
    return EL_DB.collection('horarios').doc(id).set(doc);
  }

  /**
   * Devuelve los bloques del día actual del docente autenticado, ya combinados
   * con los bloques del liceo (para incluir horaInicio/horaFin).
   * Ideal para "clases de hoy".
   * @returns Promise<[{ bloque, entrada }]>  bloque = {id,horaInicio,horaFin,...} · entrada = {cursoId, asignatura, ...}
   */
  function clasesDelDia(fechaISO) {
    var f = fechaISO ? new Date(fechaISO) : new Date();
    var diaKey = DIA_ISO[f.getDay()] || 'lunes';
    if (diaKey === 'domingo') return Promise.resolve([]);
    return Promise.all([getBloques(), getHorarioDocente()]).then(function (arr) {
      var bloques = arr[0]; var hor = arr[1];
      var dia = (hor.semana && hor.semana[diaKey]) || [];
      var mapa = {};
      bloques.forEach(function (b) { mapa[b.id] = b; });
      var out = [];
      dia.forEach(function (e) {
        var b = mapa[e.bloqueId];
        if (b) out.push({ bloque: b, entrada: e, dia: diaKey });
      });
      // Ordenar por hora
      out.sort(function (a, b) { return String(a.bloque.horaInicio).localeCompare(String(b.bloque.horaInicio)); });
      return out;
    });
  }

  /**
   * Devuelve la grilla completa del docente para renderizar la vista SEMANA.
   * @returns Promise<{ bloques: [...], semana: { lunes:[{bloque,entrada}], ...} }>
   */
  function gridSemanaDocente(docenteUid, liceoSlug) {
    return Promise.all([
      getBloques(liceoSlug),
      getHorarioDocente(docenteUid, liceoSlug)
    ]).then(function (arr) {
      var bloques = arr[0]; var hor = arr[1];
      var mapa = {};
      bloques.forEach(function (b) { mapa[b.id] = b; });
      var semana = {};
      DIAS.forEach(function (d) {
        var lst = (hor.semana && hor.semana[d]) || [];
        semana[d] = lst.map(function (e) {
          var b = mapa[e.bloqueId];
          return b ? { bloque: b, entrada: e } : null;
        }).filter(function (x) { return !!x; });
        semana[d].sort(function (a, b) {
          return String(a.bloque.horaInicio).localeCompare(String(b.bloque.horaInicio));
        });
      });
      return { bloques: bloques, semana: semana, horario: hor };
    });
  }

  window.CCHorarios = {
    DIAS:                  DIAS,
    DIAS_LABEL:            DIAS_LABEL,
    DIA_ISO:               DIA_ISO,
    BLOQUES_DEFAULT:       BLOQUES_DEFAULT,
    getBloques:            getBloques,
    guardarBloques:        guardarBloques,
    getHorarioDocente:     getHorarioDocente,
    guardarHorarioDocente: guardarHorarioDocente,
    clasesDelDia:          clasesDelDia,
    gridSemanaDocente:     gridSemanaDocente
  };
})();
