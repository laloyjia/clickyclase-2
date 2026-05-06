/**
 * Click&Clase — Catálogo de colegios / liceos
 * ---------------------------------------------
 * Fuente de verdad: colección Firestore `liceos` (vía ELDB.liceos).
 * Fallback: array `COLEGIOS_REG` hardcodeado (semilla mínima),
 * útil cuando aún no se cargó la colección o no hay autenticación.
 *
 * Para cargar el catálogo desde Firestore (idealmente al inicio del app):
 *   await ELColegios.cargar();
 *
 * Para registrar un colegio nuevo (panel admin):
 *   ELDB.liceos.crear({ slug, nombre, rbd, comuna, ... });
 *
 * Convención de logos:
 *   `assets/logos/colegios/<slug>.png` (preferente) o `default.svg`.
 */
(function () {
  'use strict';

  // Semilla local. Solo se usa cuando el catálogo Firestore aún no se cargó
  // o cuando el cliente no tiene auth. Mantener mínimo.
  var COLEGIOS_REG = [
    {
      slug: 'salesianos-talca',
      nombre: 'Liceo Salesiano de Talca',
      alias: ['salesiano talca', 'colegio salesianos talca', 'liceo salesianos talca']
    }
    // Más liceos: agregarlos por la UI admin (Firestore).
  ];

  // Cache en memoria del catálogo cargado desde Firestore.
  // Si _cache !== null, usamos _cache; si es null, caemos a COLEGIOS_REG.
  var _cache = null;
  var _cargandoPromise = null;

  function _norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function slugify(s) {
    return _norm(s).replace(/\s+/g, '-');
  }

  /** Devuelve la lista activa del catálogo (Firestore si ya está cargado, si no la semilla). */
  function _catalogo() {
    if (_cache && _cache.length) return _cache;
    return COLEGIOS_REG;
  }

  /**
   * Carga el catálogo desde Firestore y lo cachea.
   * Devuelve la lista cacheada. Si Firestore falla, mantiene la semilla.
   */
  function cargar(forzar) {
    if (_cache && !forzar) return Promise.resolve(_cache);
    if (_cargandoPromise && !forzar) return _cargandoPromise;

    if (typeof ELDB === 'undefined' || !ELDB.liceos || typeof ELDB.liceos.listar !== 'function') {
      // ELDB no disponible (página sin autenticar). Devolver semilla.
      return Promise.resolve(COLEGIOS_REG);
    }

    // Pedimos TODO (incluidos inactivos) y filtramos en JS — evita depender
    // del where('activo','==',true) en REST que a veces devuelve vacío.
    _cargandoPromise = ELDB.liceos.listar(true)
      .then(function (lista) {
        var activos = (lista || []).filter(function (l) { return l && l.activo !== false; });
        if (activos.length) {
          _cache = activos;
        } else {
          // Firestore vacío (primera vez). Mantener semilla y proponer seed.
          _cache = COLEGIOS_REG.slice();
        }
        _cargandoPromise = null;
        return _cache;
      })
      .catch(function (err) {
        console.warn('[ELColegios] No se pudo cargar liceos desde Firestore:', err && err.message);
        _cargandoPromise = null;
        return COLEGIOS_REG;
      });
    return _cargandoPromise;
  }

  /** Limpia la cache para forzar una recarga en la próxima consulta. */
  function invalidarCache() {
    _cache = null;
    _cargandoPromise = null;
  }

  function buscarColegio(input) {
    if (!input) return null;
    var n = _norm(input);
    if (!n) return null;
    var lista = _catalogo();
    for (var i = 0; i < lista.length; i++) {
      var c = lista[i];
      if (_norm(c.nombre) === n || c.slug === n) return c;
      if (Array.isArray(c.alias)) {
        for (var j = 0; j < c.alias.length; j++) {
          if (_norm(c.alias[j]) === n) return c;
        }
      }
    }
    // Match parcial
    for (var k = 0; k < lista.length; k++) {
      var c2 = lista[k];
      if (_norm(c2.nombre).indexOf(n) !== -1 || n.indexOf(_norm(c2.nombre)) !== -1) return c2;
    }
    return null;
  }

  /** Devuelve la lista actual (sincrónica). */
  function listar() {
    return _catalogo().slice();
  }

  /**
   * Devuelve la URL del logo del colegio asociado al profesor (o un objeto user-like).
   * Acepta:
   *   - user.liceoSlug / user.colegioSlug (preferente)
   *   - user.colegio (string, nombre libre o slug)
   * Si no se encuentra, devuelve la ruta a default.svg.
   */
  function resolverLogoColegio(user) {
    user = user || {};
    var slug = user.liceoSlug || user.colegioSlug || '';
    var nombre = user.liceoNombre || user.colegioNombre || user.colegio || '';
    var found = null;
    var lista = _catalogo();
    if (slug) {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].slug === slug) { found = lista[i]; break; }
      }
    }
    if (!found && nombre) found = buscarColegio(nombre);

    if (found) {
      return {
        url:         found.logoPath || ('assets/logos/colegios/' + found.slug + '.png'),
        urlFallback: 'assets/logos/colegios/default.svg',
        slug:        found.slug,
        nombre:      found.nombre
      };
    }
    var auto = slugify(nombre);
    if (auto) {
      return {
        url:         'assets/logos/colegios/' + auto + '.png',
        urlFallback: 'assets/logos/colegios/default.svg',
        slug:        auto,
        nombre:      nombre
      };
    }
    return {
      url:         'assets/logos/colegios/default.svg',
      urlFallback: 'assets/logos/colegios/default.svg',
      slug:        '',
      nombre:      nombre || ''
    };
  }

  /**
   * Construye un <img> tag con onerror -> fallback al logo por defecto.
   */
  function logoImgTag(user, opts) {
    opts = opts || {};
    var info = resolverLogoColegio(user);
    var alt = info.nombre || 'Logo institucional';
    var cls = opts.className || 'doc-logo';
    var size = opts.size || 64;
    return '<img class="' + cls + '" alt="' + alt.replace(/"/g, '&quot;') + '" ' +
           'src="' + info.url + '" ' +
           'onerror="this.onerror=null;this.src=\'' + info.urlFallback + '\';" ' +
           'style="width:' + size + 'px;height:' + size + 'px;object-fit:contain;">';
  }

  /**
   * Devuelve el nombre oficial que debe imprimirse en el documento.
   * Prioriza liceoNombre/colegioNombre si están cargados; cae a colegio (campo libre) o a string vacío.
   */
  function nombreColegio(user) {
    user = user || {};
    if (user.liceoNombre)   return user.liceoNombre;
    if (user.colegioNombre) return user.colegioNombre;
    var fuente = user.colegio || user.liceoSlug || user.colegioSlug || '';
    if (fuente) {
      var c = buscarColegio(fuente);
      if (c) return c.nombre;
      return fuente;
    }
    return '';
  }

  /**
   * Helper: dada una lista de slugs (los liceos asignados al profesor),
   * devuelve los objetos completos del catálogo.
   */
  function porSlugs(slugs) {
    if (!Array.isArray(slugs) || !slugs.length) return [];
    var lista = _catalogo();
    var out = [];
    slugs.forEach(function (sl) {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].slug === sl) { out.push(lista[i]); break; }
      }
    });
    return out;
  }

  // Export
  var api = {
    COLEGIOS_REG:       COLEGIOS_REG,
    cargar:             cargar,
    invalidarCache:     invalidarCache,
    listar:             listar,
    porSlugs:           porSlugs,
    slugify:            slugify,
    buscarColegio:      buscarColegio,
    resolverLogoColegio:resolverLogoColegio,
    logoImgTag:         logoImgTag,
    nombreColegio:      nombreColegio
  };

  if (typeof window !== 'undefined') {
    window.ELColegios = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})();
