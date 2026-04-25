/**
 * ElectroLearn — Catálogo de colegios / liceos
 * ---------------------------------------------
 * - `COLEGIOS_REG`: lista de instituciones registradas con slug + nombre oficial.
 *   El slug se usa para resolver el logo en `assets/logos/colegios/<slug>.png`.
 * - Si un profesor escribe un nombre libre que no está en el catálogo, se hace
 *   un slugify automático para intentar localizar un logo. Si no hay archivo,
 *   se usa `default.svg`.
 *
 * Para registrar un colegio nuevo:
 *   1. Subir el archivo `<slug>.png` a `assets/logos/colegios/`.
 *   2. Agregar una entrada `{ slug, nombre, alias?: [] }` en `COLEGIOS_REG`.
 */
(function () {
  'use strict';

  var COLEGIOS_REG = [
    {
      slug: 'salesianos-talca',
      nombre: 'Liceo Salesiano de Talca',
      alias: ['salesiano talca', 'colegio salesianos talca', 'liceo salesianos talca']
    }
    // Agregar más colegios aquí…
  ];

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

  function buscarColegio(input) {
    if (!input) return null;
    var n = _norm(input);
    if (!n) return null;
    for (var i = 0; i < COLEGIOS_REG.length; i++) {
      var c = COLEGIOS_REG[i];
      if (_norm(c.nombre) === n || c.slug === n) return c;
      if (Array.isArray(c.alias)) {
        for (var j = 0; j < c.alias.length; j++) {
          if (_norm(c.alias[j]) === n) return c;
        }
      }
    }
    // Match parcial
    for (var k = 0; k < COLEGIOS_REG.length; k++) {
      var c2 = COLEGIOS_REG[k];
      if (_norm(c2.nombre).indexOf(n) !== -1 || n.indexOf(_norm(c2.nombre)) !== -1) return c2;
    }
    return null;
  }

  /**
   * Devuelve la URL del logo del colegio asociado al profesor (o un objeto user-like).
   * Acepta:
   *   - user.colegioSlug (preferente)
   *   - user.colegio (string, nombre libre o slug)
   * Si no se encuentra, devuelve la ruta a default.svg.
   *
   * Retorna { url, slug, nombre }
   */
  function resolverLogoColegio(user) {
    user = user || {};
    var slug = user.colegioSlug || '';
    var nombre = user.colegioNombre || user.colegio || '';
    var found = null;
    if (slug) {
      for (var i = 0; i < COLEGIOS_REG.length; i++) {
        if (COLEGIOS_REG[i].slug === slug) { found = COLEGIOS_REG[i]; break; }
      }
    }
    if (!found && nombre) found = buscarColegio(nombre);

    if (found) {
      return {
        url: 'assets/logos/colegios/' + found.slug + '.png',
        urlFallback: 'assets/logos/colegios/default.svg',
        slug: found.slug,
        nombre: found.nombre
      };
    }
    // Sin match en el catálogo: intentar slug autogenerado
    var auto = slugify(nombre);
    if (auto) {
      return {
        url: 'assets/logos/colegios/' + auto + '.png',
        urlFallback: 'assets/logos/colegios/default.svg',
        slug: auto,
        nombre: nombre
      };
    }
    return {
      url: 'assets/logos/colegios/default.svg',
      urlFallback: 'assets/logos/colegios/default.svg',
      slug: '',
      nombre: nombre || ''
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
   * Prioriza colegioNombre si está cargado; cae a colegio (campo libre) o a string vacío.
   */
  function nombreColegio(user) {
    user = user || {};
    if (user.colegioNombre) return user.colegioNombre;
    if (user.colegio) {
      var c = buscarColegio(user.colegio);
      if (c) return c.nombre;
      return user.colegio;
    }
    return '';
  }

  // Export
  var api = {
    COLEGIOS_REG: COLEGIOS_REG,
    slugify: slugify,
    buscarColegio: buscarColegio,
    resolverLogoColegio: resolverLogoColegio,
    logoImgTag: logoImgTag,
    nombreColegio: nombreColegio
  };

  if (typeof window !== 'undefined') {
    window.ELColegios = api;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})();
