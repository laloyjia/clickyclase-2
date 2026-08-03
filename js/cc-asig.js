/**
 * cc-asig.js — Click&Clase
 * ═══════════════════════════════════════════════════════════════
 * API ÚNICA para trabajar con asignaturas. Consulta el catálogo maestro
 * (js/catalogo-asignaturas-maestro.js) y los archivos de currículum.
 *
 * USO:
 *   CCAsig.getById(id)               → { id, nombre, sigla, grupo, ... }
 *   CCAsig.getAll()                  → todos los items
 *   CCAsig.getByGrupo('electivo')    → filtrar por grupo
 *   CCAsig.getPorNivel('3m')         → asigs válidas para ese nivel
 *   CCAsig.getNombre(id)             → "Física (Plan Diferenciado HC)"
 *   CCAsig.getSigla(id)              → "FHC"
 *   CCAsig.getBase(id)               → 'fisica' (para electivos) o null
 *   CCAsig.esElectivo(id)            → boolean
 *   CCAsig.tieneOAs(id)              → boolean (si el currículum está cargado)
 *   CCAsig.getOAs(id, nivel)         → array de OA (usa base para electivos)
 *   CCAsig.getUnidades(id, nivel)    → array de unidades
 *   CCAsig.normalizarId(algo)        → resuelve alias, cruces, etc.
 *   CCAsig.parseCruce('el_fis_hc__3m') → { asigId:'el_fis_hc', nivel:'3m' }
 */
(function () {
  'use strict';

  function _cat() { return window.CC_CATALOGO_ASIGNATURAS || []; }
  function _alias() { return window.CC_ASIG_ALIASES || {}; }

  // Índice O(1) por id, se construye una vez
  var _idx = null;
  function _index() {
    if (_idx) return _idx;
    _idx = {};
    _cat().forEach(function (a) { _idx[a.id] = a; });
    return _idx;
  }
  // Invalidar índice si el catálogo cambia (raro pero por si acaso)
  window.CCAsigResetCache = function () { _idx = null; };

  // Normalizar cualquier input a un ID canónico
  //   'el_fis_hc__3m'    → 'el_fis_hc'
  //   'ciencias_naturales' → 'ciencias_nat' (alias)
  //   'FISICA'           → 'fisica' (lowercase)
  //   'Física'           → 'fisica' (busqueda por nombre)
  function normalizarId(input) {
    if (!input) return null;
    var s = String(input).trim();
    // 1) Si viene cruce asig__nivel, quedarnos con la parte asig
    if (s.indexOf('__') !== -1) s = s.split('__')[0];
    var lower = s.toLowerCase();
    // 2) Match directo
    if (_index()[lower]) return lower;
    // 3) Alias
    if (_alias()[lower]) return _alias()[lower];
    // 4) Búsqueda por nombre (fuzzy)
    var norm = lower.normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (var id in _index()) {
      var it = _index()[id];
      var nombreNorm = String(it.nombre).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      if (nombreNorm === norm) return id;
    }
    // 5) No encontrado
    return null;
  }

  function parseCruce(input) {
    if (!input) return { asigId: null, nivel: null };
    var s = String(input);
    if (s.indexOf('__') === -1) return { asigId: normalizarId(s), nivel: null };
    var parts = s.split('__');
    return { asigId: normalizarId(parts[0]), nivel: (parts[1] || '').toLowerCase() };
  }

  function getById(id) {
    var canon = normalizarId(id);
    return canon ? _index()[canon] || null : null;
  }

  function getAll() { return _cat().slice(); }

  function getByGrupo(grupo) {
    return _cat().filter(function (a) { return a.grupo === grupo; });
  }

  function getByTipo(tipo) {
    return _cat().filter(function (a) { return a.tipo === tipo; });
  }

  function getPorNivel(nivel) {
    if (!nivel) return [];
    var nlow = String(nivel).toLowerCase();
    return _cat().filter(function (a) { return (a.niveles || []).indexOf(nlow) !== -1; });
  }

  function getNombre(id) {
    var a = getById(id);
    return a ? a.nombre : String(id || '');
  }
  function getSigla(id) {
    var a = getById(id);
    return a ? a.sigla : '';
  }
  function getBase(id) {
    var a = getById(id);
    return a && a.base ? a.base : null;
  }
  function esElectivo(id) {
    var a = getById(id);
    return !!(a && a.tipo === 'electivo');
  }
  function tieneOAs(id) {
    var a = getById(id);
    return !!(a && a.tieneOAsCargados);
  }

  // Normalizar nivel al formato del catálogo (los archivos usan '3M', '4M', el resto '1B'..)
  function _nivelCat(nlow) {
    var s = String(nlow || '').toLowerCase();
    // Los niveles de básica/parvularia son lowercase ('1b','nt1'). Media son UPPER ('1M','2M','3M','4M').
    if (/^[1-4]m$/.test(s)) return s.toUpperCase();
    return s;
  }

  // OAs: si es electivo cargado → usar curriculoKey. Sino, fallback a base.
  function getOAs(id, nivel) {
    if (!nivel) return [];
    var a = getById(id);
    if (!a) return [];
    var nlow = String(nivel).toLowerCase();
    if ((a.niveles || []).indexOf(nlow) === -1) return [];
    var nivelCat = _nivelCat(nlow);

    var CC = window.CURRICULA_CHILE;
    if (!CC) return [];

    // 1) Si tiene curriculoKey (electivo con OAs en padre.electivos[hijo])
    if (a.curriculoKey && CC.getOAsByKey) {
      var oas1 = CC.getOAsByKey(a.curriculoKey, nivelCat) || [];
      if (oas1.length) return oas1;
    }
    // 2) Asignatura del plan común (usa el id directamente)
    if (a.tieneOAsCargados && !a.curriculoKey && CC.getOAs) {
      var oas2 = CC.getOAs(a.id, nivelCat) || [];
      if (oas2.length) return oas2;
    }
    // 3) Fallback: usar OAs de la base (marcados como _deBase)
    if (a.base) {
      var b = getById(a.base);
      if (b && b.tieneOAsCargados && CC.getOAs) {
        var oasBase = CC.getOAs(b.id, nivelCat) || [];
        return oasBase.map(function (o) { return Object.assign({}, o, { _deBase: true, _baseAsig: b.nombre }); });
      }
    }
    return [];
  }

  function getUnidades(id, nivel) {
    if (!nivel) return [];
    var a = getById(id);
    if (!a) return [];
    var nlow = String(nivel).toLowerCase();
    if ((a.niveles || []).indexOf(nlow) === -1) return [];
    var nivelCat = _nivelCat(nlow);
    var CC = window.CURRICULA_CHILE;
    if (!CC) return [];

    if (a.curriculoKey && CC.getUnidadesByKey) {
      var u1 = CC.getUnidadesByKey(a.curriculoKey, nivelCat) || [];
      if (u1.length) return u1;
    }
    if (a.tieneOAsCargados && !a.curriculoKey && CC.getUnidades) {
      var u2 = CC.getUnidades(a.id, nivelCat) || [];
      if (u2.length) return u2;
    }
    if (a.base) {
      var b = getById(a.base);
      if (b && b.tieneOAsCargados && CC.getUnidades) {
        return CC.getUnidades(b.id, nivelCat) || [];
      }
    }
    return [];
  }

  // Etiqueta legible para nivel (1b → "1° Básico")
  function labelNivel(nivel) {
    var LABELS = { nt1:'Pre-Kínder', nt2:'Kínder',
      '1b':'1° Básico','2b':'2° Básico','3b':'3° Básico','4b':'4° Básico',
      '5b':'5° Básico','6b':'6° Básico','7b':'7° Básico','8b':'8° Básico',
      '1m':'1° Medio','2m':'2° Medio','3m':'3° Medio','4m':'4° Medio' };
    return LABELS[String(nivel || '').toLowerCase()] || String(nivel || '');
  }

  window.CCAsig = {
    getById: getById,
    getAll: getAll,
    getByGrupo: getByGrupo,
    getByTipo: getByTipo,
    getPorNivel: getPorNivel,
    getNombre: getNombre,
    getSigla: getSigla,
    getBase: getBase,
    esElectivo: esElectivo,
    tieneOAs: tieneOAs,
    getOAs: getOAs,
    getUnidades: getUnidades,
    normalizarId: normalizarId,
    parseCruce: parseCruce,
    labelNivel: labelNivel
  };
})();
