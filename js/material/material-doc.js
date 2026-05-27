/* ════════════════════════════════════════════════════════════════════
 *  material-doc.js — Click&Clase
 *  Helpers de plantilla de documentos generados:
 *   - lineas, cesLi (markup utilitario)
 *   - pieDoc (footer institucional)
 *   - _liceoActivoSlug / _nombreInstitucion / _logoTagInstitucion
 *   - _initSelectorLiceos / cambiarLiceoActivo
 *   - headerInstitucional / tituloBar / metaTabla
 *
 *  Dependencias globales: _matUser, ELColegios, document inputs
 *  (inputLiceo, selectLiceoProf, rowSelectorLiceo, dlColegios).
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function lineas(n) {
    var h = '';
    for (var i = 0; i < n; i++) h += '<div class="linea-escribir"></div>';
    return h;
  }
  function cesLi(ces) {
    return ces.map(function (c) {
      var parts = c.split(': ');
      return '<li style="margin-bottom:0.4rem;"><strong>' + parts[0] + ':</strong> ' + (parts[1] || c) + '</li>';
    }).join('');
  }
  function pieDoc() {
    var user = (typeof _matUser !== 'undefined' && _matUser) || {};
    var isTP = user.tipoProfesor === 'tecnico';
    var area = isTP ? ('Especialidad ' + (user.especialidad || 'TP') + ' EMTP') : (user.asignaturas && user.asignaturas.length ? user.asignaturas.join(', ') : 'Plan Comun');
    var nombreInst = _nombreInstitucion();
    var inst = nombreInst ? (nombreInst + ' &bull; ') : '';
    return '<div class="pie-pagina">' + inst + area + ' &bull; Click&Clase &bull; Material generado automaticamente &bull; Alineado al curriculum Mineduc</div>';
  }

  // ── Helpers institucionales (logo + nombre liceo + header) ──
  function _liceoActivoSlug() {
    var sel = document.getElementById('selectLiceoProf');
    if (sel && sel.value) return sel.value;
    var inEl = document.getElementById('inputLiceo');
    if (inEl && inEl.dataset && inEl.dataset.slug) return inEl.dataset.slug;
    var u = (typeof _matUser !== 'undefined' && _matUser) || {};
    return u.liceoPrincipal || u.liceoSlug || '';
  }

  function _nombreInstitucion() {
    var user = (typeof _matUser !== 'undefined' && _matUser) || {};
    var elIn = document.getElementById('inputLiceo');
    var manual = elIn ? (elIn.value || '').trim() : '';
    if (manual) return manual;
    if (window.ELColegios && ELColegios.nombreColegio) return ELColegios.nombreColegio(user) || '';
    return user.colegio || user.colegioNombre || '';
  }

  function _logoTagInstitucion(size) {
    var user = (typeof _matUser !== 'undefined' && _matUser) || {};
    var elIn = document.getElementById('inputLiceo');
    var manual = elIn ? (elIn.value || '').trim() : '';
    var slugActivo = _liceoActivoSlug();
    var pseudoUser;
    if (slugActivo) {
      pseudoUser = { liceoSlug: slugActivo, colegio: manual || user.colegio || '', colegioSlug: slugActivo };
    } else if (manual) {
      pseudoUser = { colegio: manual, colegioSlug: user.colegioSlug };
    } else {
      pseudoUser = user;
    }
    if (window.ELColegios && ELColegios.logoImgTag) {
      return ELColegios.logoImgTag(pseudoUser, { size: size || 64, className: 'doc-logo' });
    }
    return '<img class="doc-logo" alt="" src="assets/logos/colegios/default.svg" style="width:' + (size || 64) + 'px;height:' + (size || 64) + 'px;object-fit:contain;">';
  }

  function _initSelectorLiceos(user) {
    user = user || (typeof _matUser !== 'undefined' && _matUser) || {};
    var slugs = Array.isArray(user.liceos) ? user.liceos : [];
    if (!slugs.length && user.liceoSlug) slugs = [user.liceoSlug];
    var row = document.getElementById('rowSelectorLiceo');
    var sel = document.getElementById('selectLiceoProf');
    if (!row || !sel) return;

    var fetcher = (window.ELColegios && ELColegios.cargar)
      ? ELColegios.cargar(true)
      : Promise.resolve([]);
    fetcher.then(function (catalogo) {
      catalogo = (catalogo || []).filter(function (c) { return c.activo !== false; });

      var dl = document.getElementById('dlColegios');
      if (dl && catalogo.length) {
        dl.innerHTML = catalogo.map(function (c) {
          return '<option value="' + (c.nombre || '').replace(/"/g, '&quot;') + '">';
        }).join('');
      }

      var byslug = {};
      catalogo.forEach(function (c) { byslug[c.slug] = c; });

      var slugsParaSelect, etiquetaInfo, principal;
      if (slugs.length) {
        slugsParaSelect = slugs.filter(function (s) { return byslug[s]; });
        if (!slugsParaSelect.length) slugsParaSelect = slugs;
        principal = user.liceoPrincipal || slugsParaSelect[0];
        etiquetaInfo = (slugsParaSelect.length === 1)
          ? 'Liceo asignado al profesor (cámbialo solo si necesitas otro).'
          : 'El logo y nombre del liceo seleccionado aparecerán en el encabezado del documento.';
      } else if (catalogo.length) {
        slugsParaSelect = catalogo.map(function (c) { return c.slug; });
        principal = slugsParaSelect[0];
        etiquetaInfo = 'Tu perfil no tiene liceo asignado. Elige uno del catálogo o pídele al administrador que te asigne uno.';
      } else {
        row.style.display = 'none';
        return;
      }

      sel.innerHTML = slugsParaSelect.map(function (s) {
        var c = byslug[s];
        var nombre = c ? c.nombre : s;
        var sufijo = (s === (user.liceoPrincipal || '')) ? ' ★' : '';
        return '<option value="' + s + '"' + (s === principal ? ' selected' : '') + '>' + nombre + sufijo + '</option>';
      }).join('');
      var helpEl = row.querySelector('small');
      if (helpEl) helpEl.textContent = etiquetaInfo;
      row.style.display = '';
      cambiarLiceoActivo(sel.value);
    }).catch(function (e) {
      console.warn('[Material] No se pudo cargar catálogo de liceos:', e && e.message);
      row.style.display = 'none';
    });
  }

  function cambiarLiceoActivo(slug) {
    if (!slug) return;
    var inEl = document.getElementById('inputLiceo');
    if (!inEl) return;
    function _resolver(lista) {
      var c = (lista || []).filter(function (x) { return x.slug === slug; })[0];
      inEl.value = c ? c.nombre : slug;
      inEl.dataset.slug = slug;
    }
    if (window.ELColegios && ELColegios.listar) {
      var lista = ELColegios.listar();
      var c = lista.filter(function (x) { return x.slug === slug; })[0];
      if (c) { _resolver(lista); return; }
    }
    if (window.ELColegios && ELColegios.cargar) {
      ELColegios.cargar().then(_resolver).catch(function () { _resolver([]); });
    } else {
      _resolver([]);
    }
  }

  // Cuando el usuario edita el input a mano, limpiamos dataset.slug
  document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'inputLiceo') {
      if (window.ELColegios && ELColegios.listar && e.target.dataset.slug) {
        var c = ELColegios.listar().find
          ? ELColegios.listar().find(function (x) { return x.slug === e.target.dataset.slug; })
          : null;
        if (!c || c.nombre !== e.target.value) delete e.target.dataset.slug;
      }
    }
  });

  function headerInstitucional(tipoDoc) {
    var nombreInst = _nombreInstitucion() || 'Institución educativa';
    var logo = _logoTagInstitucion(78);
    return '<div class="doc-header-inst">' +
      '<div class="doc-logo-wrap">' + logo + '</div>' +
      '<div class="doc-inst-text">' +
        '<div class="doc-liceo">' + nombreInst + '</div>' +
        '<div class="doc-tipo">' + (tipoDoc || '') + '</div>' +
      '</div>' +
      '<div class="doc-spacer" aria-hidden="true"></div>' +
    '</div>';
  }

  function tituloBar(titulo) {
    return '<div class="doc-titulo-bar">' + (titulo || '') + '</div>';
  }

  function metaTabla(opts) {
    opts = opts || {};
    function _v(id) { var el = document.getElementById(id); return el ? (el.value || '').trim() : ''; }
    var codigo   = opts.codigo   || _v('inputCodigoDoc') || '';
    var duracion = opts.duracion || _v('inputDuracion')   || '';
    var profesor = opts.profesor || '';
    var curso    = opts.curso    || '';
    var puntaje  = opts.puntaje  || _v('inputPuntajeDoc') || '';
    var celda = function (v) { return v ? ('<td>' + v + '</td>') : '<td></td>'; };
    return '<table class="doc-meta">' +
      '<tr><th>Nombre de estudiante</th><td></td><th>Código</th>' + celda(codigo) + '</tr>' +
      '<tr><th>Nombre de estudiante</th><td></td><th>Duración</th>' + celda(duracion) + '</tr>' +
      '<tr><th>Nombre del profesor</th>' + celda(profesor) + '<th>Curso</th>' + celda(curso) + '</tr>' +
      '<tr><th>Fecha</th><td></td><th>Puntaje</th>' + celda(puntaje) + '</tr>' +
    '</table>';
  }

  // Expose en window
  window.lineas              = lineas;
  window.cesLi               = cesLi;
  window.pieDoc              = pieDoc;
  window._liceoActivoSlug    = _liceoActivoSlug;
  window._nombreInstitucion  = _nombreInstitucion;
  window._logoTagInstitucion = _logoTagInstitucion;
  window._initSelectorLiceos = _initSelectorLiceos;
  window.cambiarLiceoActivo  = cambiarLiceoActivo;
  window.headerInstitucional = headerInstitucional;
  window.tituloBar           = tituloBar;
  window.metaTabla           = metaTabla;
})();
