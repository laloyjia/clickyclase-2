/**
 * anotaciones.js — Click&Clase Fase 9
 *
 * CRUD de anotaciones por alumno. Cada anotación registra un evento
 * pedagógico o conductual observado por un docente sobre un estudiante.
 *
 * Modelo (anotaciones_alumno/{id}):
 *   alumnoRut, alumnoNombre, cursoId, liceoSlug
 *   profesorUid, profesorNombre, profesorRol
 *   tipo:      'positiva' | 'negativa' | 'neutra'
 *   categoria: 'academica' | 'conductual' | 'actitudinal' | 'asistencia' | 'colaboracion' | 'otra'
 *   descripcion:  string libre
 *   visibleApoderado:  bool (el profesor decide)
 *   fecha:        ISO string
 *   creadoEn:     ISO string
 */
(function () {
  'use strict';

  var COL = 'anotaciones_alumno';

  var TIPOS = [
    { id: 'positiva', label: 'Positiva',  ico: '👍', color: '#22c55e' },
    { id: 'neutra',   label: 'Neutra',    ico: '📝', color: '#94a3b8' },
    { id: 'negativa', label: 'Negativa',  ico: '⚠',  color: '#ef4444' }
  ];

  var CATEGORIAS = [
    { id: 'academica',    label: 'Académica',   ico: '📚' },
    { id: 'conductual',   label: 'Conductual',  ico: '🎭' },
    { id: 'actitudinal',  label: 'Actitudinal', ico: '💪' },
    { id: 'asistencia',   label: 'Asistencia',  ico: '📅' },
    { id: 'colaboracion', label: 'Colaboración',ico: '🤝' },
    { id: 'otra',         label: 'Otra',        ico: '📌' }
  ];

  function _user() { return (window.ELAuth && ELAuth.user) || {}; }

  function _uid()    { return _user().uid || ''; }
  function _nombre() { var u = _user(); return u.nombre || u.email || ''; }
  function _liceo()  { return _user().liceoSlug || ''; }
  function _rol()    {
    var u = _user();
    if (u.role) return u.role;
    if (u.roles) return Object.keys(u.roles)[0] || '';
    return '';
  }

  /**
   * Crear anotación nueva.
   * @param {object} datos { alumnoRut, alumnoNombre, cursoId, tipo, categoria,
   *                        descripcion, visibleApoderado, fecha? }
   */
  function crear(datos) {
    if (!datos.alumnoRut || !datos.alumnoNombre) return Promise.reject(new Error('Alumno requerido'));
    if (!datos.descripcion || !datos.descripcion.trim()) return Promise.reject(new Error('Descripción requerida'));

    var doc = {
      alumnoRut:        String(datos.alumnoRut),
      alumnoNombre:     String(datos.alumnoNombre),
      cursoId:          datos.cursoId || '',
      liceoSlug:        _liceo(),
      profesorUid:      _uid(),
      profesorNombre:   _nombre(),
      profesorRol:      _rol(),
      tipo:             datos.tipo || 'neutra',
      categoria:        datos.categoria || 'otra',
      descripcion:      datos.descripcion.trim(),
      visibleApoderado: !!datos.visibleApoderado,
      fecha:            datos.fecha || new Date().toISOString(),
      creadoEn:         new Date().toISOString()
    };
    return EL_DB.collection(COL).add(doc).then(function (ref) {
      return Object.assign({ id: ref.id }, doc);
    });
  }

  /**
   * Listar anotaciones por alumno (RUT) del liceo actual.
   */
  function listarPorAlumno(alumnoRut, opts) {
    opts = opts || {};
    var alumnoUid = opts.alumnoUid || null;
    if (!alumnoRut && !alumnoUid) return Promise.resolve([]);

    var arr = [];
    var vistos = {}; // dedup

    function _push(d) {
      if (vistos[d.id]) return;
      vistos[d.id] = true;
      var data = d.data();
      if (data.liceoSlug && data.liceoSlug !== _liceo() && _rol() !== 'admin') return;
      arr.push(Object.assign({ id: d.id }, data));
    }

    // Fuente 1: colección legacy anotaciones_alumno
    var p1 = alumnoRut
      ? EL_DB.collection(COL).where('alumnoRut', '==', String(alumnoRut)).get()
          .then(function(snap){ snap.forEach(_push); }).catch(function(){})
      : Promise.resolve();

    // Fuente 2: colección nueva anotaciones (raíz del seed) por rut
    var p2 = alumnoRut
      ? EL_DB.collection('anotaciones').where('alumnoRut', '==', String(alumnoRut)).get()
          .then(function(snap){ snap.forEach(_push); }).catch(function(){})
      : Promise.resolve();

    // Fuente 3: colección nueva anotaciones por uid (si tenemos)
    var p3 = alumnoUid
      ? EL_DB.collection('anotaciones').where('alumnoUid', '==', String(alumnoUid)).get()
          .then(function(snap){ snap.forEach(_push); }).catch(function(){})
      : Promise.resolve();

    return Promise.all([p1, p2, p3]).then(function () {
      arr.sort(function (a, b) {
        return String(b.fecha || b.creadoEn || '').localeCompare(String(a.fecha || a.creadoEn || ''));
      });
      if (opts.tipo) arr = arr.filter(function (x) { return x.tipo === opts.tipo; });
      if (opts.categoria) arr = arr.filter(function (x) { return x.categoria === opts.categoria; });
      return arr;
    });
  }

  /**
   * Listar anotaciones por curso (para vista de profesor jefe).
   */
  function listarPorCurso(cursoId) {
    if (!cursoId) return Promise.resolve([]);
    return EL_DB.collection(COL)
      .where('cursoId', '==', cursoId)
      .get()
      .then(function (snap) {
        var arr = [];
        snap.forEach(function (d) {
          var data = d.data();
          if (data.liceoSlug !== _liceo() && _rol() !== 'admin') return;
          arr.push(Object.assign({ id: d.id }, data));
        });
        arr.sort(function (a, b) { return (b.fecha || '').localeCompare(a.fecha || ''); });
        return arr;
      });
  }

  /**
   * Editar (solo el autor).
   */
  function editar(anoId, cambios) {
    var permitidos = ['tipo', 'categoria', 'descripcion', 'visibleApoderado', 'fecha'];
    var update = { actualizadoEn: new Date().toISOString() };
    permitidos.forEach(function (k) {
      if (cambios[k] !== undefined) update[k] = cambios[k];
    });
    return EL_DB.collection(COL).doc(anoId).update(update);
  }

  /**
   * Eliminar (solo el autor).
   */
  function eliminar(anoId) {
    return EL_DB.collection(COL).doc(anoId).delete();
  }

  // Helpers UI
  function tipoInfo(id)      { return TIPOS.find(function (t) { return t.id === id; }); }
  function categoriaInfo(id) { return CATEGORIAS.find(function (c) { return c.id === id; }); }

  window.CCAnotaciones = {
    TIPOS:            TIPOS,
    CATEGORIAS:       CATEGORIAS,
    crear:            crear,
    listarPorAlumno:  listarPorAlumno,
    listarPorCurso:   listarPorCurso,
    editar:           editar,
    eliminar:         eliminar,
    tipoInfo:         tipoInfo,
    categoriaInfo:    categoriaInfo
  };
})();
