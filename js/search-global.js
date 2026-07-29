/**
 * search-global.js — Click&Clase
 * ────────────────────────────────────────────────────────────────
 * Búsqueda global tipo Cmd/Ctrl+K.
 * Encuentra alumnos, materiales, planificaciones, módulos y cursos
 * en tiempo real con navegación por teclado.
 *
 * Uso: <script src="js/search-global.js" defer></script>
 * Auto-inicializa al DOMContentLoaded si hay usuario logueado.
 */
(function (global) {
  'use strict';

  // No cargar en páginas públicas
  var _publicPages = ['index.html','login.html','planes.html','pricing.html','signup.html','preview-guia.html',''];
  var _currentPage = (location.pathname || '').split('/').pop().toLowerCase();
  if (_publicPages.indexOf(_currentPage) !== -1) return;

  // ── Estado ──
  var _open = false;
  var _cache = { alumnos: [], materiales: [], planificaciones: [], cursos: [], modulos: [] };
  var _loaded = false;
  var _loading = false;
  var _selectedIdx = 0;
  var _lastResults = [];
  var _searchDebounce = null;

  var _rootEl, _overlayEl, _modalEl, _inputEl, _bodyEl, _footerEl;

  // ═════════════════════════════════════════════════════════════
  //  CSS
  // ═════════════════════════════════════════════════════════════
  var CSS = `
  .cc-sg-overlay {
    position: fixed; inset: 0;
    background: rgba(12,30,59,.45);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 9990;
    display: none;
    animation: ccSgFade .18s ease;
  }
  .cc-sg-overlay.show { display: block; }
  @keyframes ccSgFade { from { opacity: 0; } to { opacity: 1; } }

  .cc-sg-modal {
    position: fixed;
    top: 12vh; left: 50%;
    transform: translateX(-50%);
    width: 620px; max-width: calc(100vw - 32px);
    max-height: 70vh;
    background: #FFFFFF;
    border-radius: 18px;
    box-shadow:
      0 32px 60px rgba(37,99,235,.22),
      0 12px 30px rgba(37,99,235,.14),
      0 0 0 1px rgba(37,99,235,.08);
    z-index: 9991;
    display: none;
    flex-direction: column;
    overflow: hidden;
    color: #0C1E3B;
    animation: ccSgIn .22s cubic-bezier(.34,1.56,.64,1);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .cc-sg-modal.show { display: flex; }
  @keyframes ccSgIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(.97); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1); }
  }

  /* ── Input ── */
  .cc-sg-input-row {
    display: flex; align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid rgba(37,99,235,.10);
    gap: 12px;
  }
  .cc-sg-icon {
    font-size: 1.1rem; color: #64748B;
    flex-shrink: 0;
  }
  .cc-sg-input {
    flex: 1;
    border: 0;
    outline: none;
    font-size: 1rem;
    font-family: inherit;
    color: #0C1E3B;
    background: transparent;
    padding: 4px 0;
  }
  .cc-sg-input::placeholder { color: #94A3B8; }
  .cc-sg-esc {
    background: rgba(37,99,235,.06);
    border: 1px solid rgba(37,99,235,.14);
    border-radius: 6px;
    padding: 3px 8px;
    font-size: .68rem;
    color: #475569;
    font-family: 'SF Mono', Menlo, monospace;
    font-weight: 600;
    flex-shrink: 0;
  }

  /* ── Body / resultados ── */
  .cc-sg-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
    min-height: 60px;
  }
  .cc-sg-body::-webkit-scrollbar { width: 6px; }
  .cc-sg-body::-webkit-scrollbar-thumb {
    background: rgba(37,99,235,.20);
    border-radius: 6px;
  }

  .cc-sg-cat {
    padding: 8px 18px 4px;
    font-size: .68rem;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #475569;
    font-weight: 700;
  }

  .cc-sg-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 18px;
    cursor: pointer;
    transition: background .12s;
    border-left: 3px solid transparent;
    text-decoration: none;
    color: inherit;
  }
  .cc-sg-item:hover, .cc-sg-item.active {
    background: rgba(37,99,235,.08);
    border-left-color: #2563EB;
  }
  .cc-sg-item-icon {
    width: 34px; height: 34px;
    border-radius: 10px;
    display: grid; place-items: center;
    font-size: 1rem;
    flex-shrink: 0;
    background: linear-gradient(135deg, rgba(37,99,235,.10), rgba(56,189,248,.06));
    color: #1D4ED8;
  }
  .cc-sg-item.mat  .cc-sg-item-icon { background: linear-gradient(135deg, rgba(5,150,105,.12), rgba(52,211,153,.06));  color: #059669; }
  .cc-sg-item.plan .cc-sg-item-icon { background: linear-gradient(135deg, rgba(220,38,38,.12), rgba(251,113,133,.06)); color: #DC2626; }
  .cc-sg-item.curs .cc-sg-item-icon { background: linear-gradient(135deg, rgba(245,158,11,.12), rgba(251,191,36,.06)); color: #B45309; }
  .cc-sg-item.mod  .cc-sg-item-icon { background: linear-gradient(135deg, rgba(37,99,235,.12), rgba(96,165,250,.06));  color: #1D4ED8; }

  .cc-sg-item-body { flex: 1; min-width: 0; }
  .cc-sg-item-title {
    font-size: .92rem; font-weight: 700; color: #0C1E3B;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    line-height: 1.25;
  }
  .cc-sg-item-sub {
    font-size: .74rem; color: #475569;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-top: 2px;
  }
  .cc-sg-item-tag {
    font-size: .64rem; font-weight: 800;
    padding: 3px 8px; border-radius: 999px;
    text-transform: uppercase; letter-spacing: .06em;
    background: rgba(37,99,235,.10); color: #1D4ED8;
    flex-shrink: 0;
  }

  .cc-sg-item mark {
    background: rgba(245,158,11,.28);
    color: inherit;
    padding: 0 2px;
    border-radius: 3px;
    font-weight: 700;
  }

  /* ── Estado vacío ── */
  .cc-sg-empty {
    padding: 32px 20px;
    text-align: center;
    color: #475569;
  }
  .cc-sg-empty-emoji { font-size: 2rem; margin-bottom: 8px; display: block; }
  .cc-sg-empty p { font-size: .86rem; margin: 0; line-height: 1.5; }

  .cc-sg-hint {
    padding: 16px 18px;
    color: #64748B;
    font-size: .82rem;
    text-align: center;
  }
  .cc-sg-hint kbd {
    background: rgba(37,99,235,.08);
    border: 1px solid rgba(37,99,235,.16);
    border-radius: 5px;
    padding: 2px 6px;
    font-size: .72rem;
    font-family: 'SF Mono', Menlo, monospace;
    margin: 0 3px;
    color: #1D4ED8;
    font-weight: 600;
  }

  .cc-sg-loading {
    padding: 24px; text-align: center;
    color: #475569;
  }
  .cc-sg-loading::before {
    content: ''; display: inline-block;
    width: 18px; height: 18px;
    border: 2.5px solid rgba(37,99,235,.20);
    border-top-color: #2563EB;
    border-radius: 50%;
    animation: ccSgSpin .7s linear infinite;
    margin-right: 8px;
    vertical-align: -4px;
  }
  @keyframes ccSgSpin { to { transform: rotate(360deg); } }

  /* ── Footer ── */
  .cc-sg-footer {
    padding: 8px 18px;
    border-top: 1px solid rgba(37,99,235,.10);
    display: flex; align-items: center; justify-content: space-between;
    font-size: .72rem;
    color: #64748B;
    background: #F8FAFF;
  }
  .cc-sg-footer .cc-sg-shortcuts { display: flex; gap: 14px; align-items: center; }
  .cc-sg-footer kbd {
    background: #FFFFFF;
    border: 1px solid rgba(37,99,235,.20);
    border-radius: 5px;
    padding: 2px 6px;
    font-size: .68rem;
    font-family: 'SF Mono', Menlo, monospace;
    color: #1D4ED8;
    font-weight: 600;
  }
  .cc-sg-footer .brand {
    font-family: 'Space Grotesk','Inter', sans-serif;
    font-weight: 700;
    background: linear-gradient(135deg, #2563EB, #38BDF8);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 640px) {
    .cc-sg-modal {
      top: 4vh; left: 8px; right: 8px;
      transform: none; width: auto;
      max-height: 92vh;
    }
    @keyframes ccSgIn {
      from { opacity: 0; transform: translateY(-10px) scale(.97); }
      to   { opacity: 1; transform: translateY(0)     scale(1); }
    }
    .cc-sg-modal.show { transform: none; }
  }
  `;

  // ═════════════════════════════════════════════════════════════
  //  HTML
  // ═════════════════════════════════════════════════════════════
  var HTML = `
  <div class="cc-sg-overlay" id="ccSgOverlay"></div>
  <div class="cc-sg-modal" id="ccSgModal" role="dialog" aria-modal="true" aria-label="Búsqueda global">
    <div class="cc-sg-input-row">
      <span class="cc-sg-icon">🔍</span>
      <input
        class="cc-sg-input"
        id="ccSgInput"
        type="text"
        placeholder="Buscar alumnos, materiales, planes, módulos, cursos…"
        autocomplete="off"
        spellcheck="false">
      <span class="cc-sg-esc">esc</span>
    </div>
    <div class="cc-sg-body" id="ccSgBody"></div>
    <div class="cc-sg-footer">
      <span class="cc-sg-shortcuts">
        <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
        <span><kbd>↵</kbd> abrir</span>
        <span><kbd>esc</kbd> cerrar</span>
      </span>
      <span class="brand">Click&Clase</span>
    </div>
  </div>
  `;

  // ═════════════════════════════════════════════════════════════
  //  Helpers
  // ═════════════════════════════════════════════════════════════
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function norm(s) {
    return String(s || '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, ''); // sin tildes
  }
  function highlight(txt, q) {
    if (!q) return esc(txt);
    var s = esc(txt);
    var qn = norm(q);
    var tn = norm(txt);
    var i = tn.indexOf(qn);
    if (i === -1) return s;
    return esc(txt.substring(0, i)) +
           '<mark>' + esc(txt.substring(i, i + q.length)) + '</mark>' +
           esc(txt.substring(i + q.length));
  }

  // ═════════════════════════════════════════════════════════════
  //  Cargar datos (lazy — solo al abrir la 1ª vez)
  // ═════════════════════════════════════════════════════════════
  function cargarDatos() {
    if (_loaded || _loading) return Promise.resolve();
    if (!global.EL_DB || !global.ELAuth) return Promise.resolve();
    _loading = true;

    return new Promise(function (resolve) {
      ELAuth.onUserReady(function (user) {
        if (!user) { _loading = false; resolve(); return; }
        var liceo = user.liceoSlug || '';

        // Cargas en paralelo, silenciando errores individuales
        var promesas = [];

        // Alumnos: colección estudiantes (o cursos)
        promesas.push(
          EL_DB.collection('cursos').get()
            .then(function (snap) {
              var alumnos = [];
              snap.forEach(function (d) {
                var c = d.data();
                if (liceo && c.liceoSlug !== liceo) return;
                var lista = c.estudiantes || c.roster || [];
                if (!Array.isArray(lista)) return;
                lista.forEach(function (e) {
                  var nombre = e.nombre || (e.nombres ? (e.nombres + ' ' + (e.apellido_p || '')) : '');
                  if (!nombre.trim()) return;
                  alumnos.push({
                    id:     e.rut || e.uid || nombre,
                    tipo:   'alumno',
                    titulo: nombre.trim(),
                    sub:    (c.nombreCompleto || (c.nivel + c.letra)) + (c.nivel ? ' · ' + c.nivel : ''),
                    href:   'ficha-alumno.html?estUid=' + encodeURIComponent(e.rut || e.uid || '')
                  });
                });
              });
              _cache.alumnos = alumnos;
            })
            .catch(function () {})
        );

        // Materiales
        if (global.ELDB && ELDB.materiales) {
          promesas.push(
            ELDB.materiales.listar({ profesor: user.email }).then(function (mats) {
              _cache.materiales = (mats || []).map(function (m) {
                return {
                  id:     m.id || m.titulo,
                  tipo:   'material',
                  titulo: m.titulo || 'Sin título',
                  sub:    (m.tipo || 'material') + (m.asignatura ? ' · ' + m.asignatura : '') + (m.modulo ? ' · ' + m.modulo : ''),
                  href:   'biblioteca.html?mat=' + encodeURIComponent(m.id || '')
                };
              });
            }).catch(function () {})
          );

          // Planificaciones
          if (ELDB.planificaciones) {
            promesas.push(
              ELDB.planificaciones.listar({ profesor: user.email }).then(function (plans) {
                _cache.planificaciones = (plans || []).map(function (p) {
                  return {
                    id:     p.id || p.titulo,
                    tipo:   'planificacion',
                    titulo: p.titulo || 'Planificación',
                    sub:    (p.asignatura || p.modulo || '—') + (p.fechaClase ? ' · ' + p.fechaClase : ''),
                    href:   'planificacion.html?plan=' + encodeURIComponent(p.id || '')
                  };
                });
              }).catch(function () {})
            );
          }
        }

        // Cursos del docente
        promesas.push(
          EL_DB.collection('cursos').get().then(function (snap) {
            var cursos = [];
            snap.forEach(function (d) {
              var c = d.data();
              if (liceo && c.liceoSlug !== liceo) return;
              cursos.push({
                id:     d.id,
                tipo:   'curso',
                titulo: c.nombreCompleto || (c.nivel + c.letra),
                sub:    (c.totalEstudiantes || 0) + ' estudiantes' + (c.jefeNombre ? ' · Jefe: ' + c.jefeNombre : ''),
                href:   'listas-curso.html?curso=' + encodeURIComponent(d.id)
              });
            });
            _cache.cursos = cursos;
          }).catch(function () {})
        );

        // Módulos TP
        promesas.push(
          new Promise(function (r) {
            var mods = [];
            if (user.modulosTP && typeof global.CCTPCatalogo !== 'undefined') {
              Object.keys(user.modulosTP).forEach(function (espId) {
                var ids = user.modulosTP[espId] || [];
                ids.forEach(function (mid) {
                  var m = CCTPCatalogo.moduloCompleto(espId, mid);
                  mods.push({
                    id:     espId + '/' + mid,
                    tipo:   'modulo',
                    titulo: m ? m.nombre : mid,
                    sub:    'Módulo TP · ' + CCTPCatalogo.labelEspecialidad(espId),
                    href:   'material.html?esp=' + encodeURIComponent(espId) + '&mod=' + encodeURIComponent(mid)
                  });
                });
              });
            }
            if (Array.isArray(user.asignaturas)) {
              user.asignaturas.forEach(function (a) {
                mods.push({
                  id:     'asig-' + a,
                  tipo:   'modulo',
                  titulo: a,
                  sub:    'Asignatura Plan Común',
                  href:   'material.html?asig=' + encodeURIComponent(a)
                });
              });
            }
            _cache.modulos = mods;
            r();
          })
        );

        Promise.all(promesas).then(function () {
          _loading = false;
          _loaded = true;
          resolve();
        });
      });
    });
  }

  // ═════════════════════════════════════════════════════════════
  //  Búsqueda
  // ═════════════════════════════════════════════════════════════
  function buscar(query) {
    var q = norm(query.trim());
    if (!q) return [];
    var results = [];
    var todos = [
      { arr: _cache.alumnos,        cat: 'Alumnos',        icon: '👤', clase: '' },
      { arr: _cache.materiales,     cat: 'Materiales',     icon: '📄', clase: 'mat' },
      { arr: _cache.planificaciones,cat: 'Planificaciones',icon: '📅', clase: 'plan'},
      { arr: _cache.cursos,         cat: 'Cursos',         icon: '🎓', clase: 'curs'},
      { arr: _cache.modulos,        cat: 'Módulos y asignaturas', icon: '📚', clase: 'mod' }
    ];
    todos.forEach(function (grupo) {
      grupo.arr.forEach(function (it) {
        var t = norm(it.titulo);
        var s = norm(it.sub);
        if (t.indexOf(q) !== -1 || s.indexOf(q) !== -1) {
          results.push(Object.assign({}, it, { cat: grupo.cat, icon: grupo.icon, clase: grupo.clase }));
        }
      });
    });
    // Limita a 30 resultados
    return results.slice(0, 30);
  }

  // ═════════════════════════════════════════════════════════════
  //  Render resultados
  // ═════════════════════════════════════════════════════════════
  function render(query) {
    if (!_bodyEl) return;
    var q = query.trim();

    if (_loading) {
      _bodyEl.innerHTML = '<div class="cc-sg-loading">Cargando datos…</div>';
      return;
    }
    if (!q) {
      _bodyEl.innerHTML =
        '<div class="cc-sg-hint">' +
          '<strong>Empezá a escribir</strong> para buscar en tu colegio.<br><br>' +
          'Encontrás alumnos, materiales, planificaciones, módulos y cursos.<br>' +
          '<span style="color:#94A3B8;font-size:.78rem">Atajo: <kbd>Ctrl</kbd><kbd>K</kbd> o <kbd>⌘</kbd><kbd>K</kbd></span>' +
        '</div>';
      _lastResults = [];
      return;
    }

    var results = buscar(q);
    _lastResults = results;
    _selectedIdx = 0;

    if (!results.length) {
      _bodyEl.innerHTML =
        '<div class="cc-sg-empty">' +
          '<span class="cc-sg-empty-emoji">🔍</span>' +
          '<p>Sin resultados para "<strong>' + esc(q) + '</strong>".<br>Probá otra palabra o revisa la ortografía.</p>' +
        '</div>';
      return;
    }

    // Agrupar por categoría
    var byCat = {};
    results.forEach(function (r) {
      if (!byCat[r.cat]) byCat[r.cat] = [];
      byCat[r.cat].push(r);
    });

    var html = '';
    var globalIdx = 0;
    Object.keys(byCat).forEach(function (cat) {
      html += '<div class="cc-sg-cat">' + esc(cat) + '</div>';
      byCat[cat].forEach(function (r) {
        var idx = globalIdx++;
        html +=
          '<a class="cc-sg-item ' + r.clase + '" data-idx="' + idx + '" data-href="' + esc(r.href) + '">' +
            '<div class="cc-sg-item-icon">' + r.icon + '</div>' +
            '<div class="cc-sg-item-body">' +
              '<div class="cc-sg-item-title">' + highlight(r.titulo, q) + '</div>' +
              '<div class="cc-sg-item-sub">' + highlight(r.sub, q) + '</div>' +
            '</div>' +
            '<span class="cc-sg-item-tag">' + esc(r.tipo) + '</span>' +
          '</a>';
      });
    });
    _bodyEl.innerHTML = html;

    // Wire clicks
    _bodyEl.querySelectorAll('.cc-sg-item').forEach(function (el) {
      el.addEventListener('click', function () {
        seleccionar(parseInt(el.getAttribute('data-idx'), 10));
      });
      el.addEventListener('mouseenter', function () {
        setSelected(parseInt(el.getAttribute('data-idx'), 10));
      });
    });

    setSelected(0);
  }

  function setSelected(idx) {
    if (!_lastResults.length) return;
    if (idx < 0) idx = _lastResults.length - 1;
    if (idx >= _lastResults.length) idx = 0;
    _selectedIdx = idx;
    _bodyEl.querySelectorAll('.cc-sg-item').forEach(function (el) {
      var i = parseInt(el.getAttribute('data-idx'), 10);
      if (i === idx) {
        el.classList.add('active');
        // Auto-scroll si el elemento está fuera de vista
        var r = el.getBoundingClientRect();
        var b = _bodyEl.getBoundingClientRect();
        if (r.top < b.top) el.scrollIntoView({ block: 'nearest' });
        if (r.bottom > b.bottom) el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('active');
      }
    });
  }

  function seleccionar(idx) {
    var r = _lastResults[idx];
    if (!r) return;
    cerrar();
    if (r.href) window.location.href = r.href;
  }

  // ═════════════════════════════════════════════════════════════
  //  Open / close
  // ═════════════════════════════════════════════════════════════
  function abrir() {
    if (_open) return;
    _open = true;
    _overlayEl.classList.add('show');
    _modalEl.classList.add('show');
    if (_inputEl) { _inputEl.value = ''; _inputEl.focus(); }
    // Cargar datos y renderizar hint
    cargarDatos().then(function () { render(''); });
    render('');
  }
  function cerrar() {
    if (!_open) return;
    _open = false;
    _overlayEl.classList.remove('show');
    _modalEl.classList.remove('show');
  }

  // ═════════════════════════════════════════════════════════════
  //  Init
  // ═════════════════════════════════════════════════════════════
  function init() {
    if (document.getElementById('ccSgModal')) return;

    var style = document.createElement('style');
    style.id = 'cc-sg-css';
    style.textContent = CSS;
    document.head.appendChild(style);

    _rootEl = document.createElement('div');
    _rootEl.id = 'cc-sg-root';
    _rootEl.innerHTML = HTML;
    document.body.appendChild(_rootEl);

    _overlayEl = document.getElementById('ccSgOverlay');
    _modalEl   = document.getElementById('ccSgModal');
    _inputEl   = document.getElementById('ccSgInput');
    _bodyEl    = document.getElementById('ccSgBody');

    _overlayEl.addEventListener('click', cerrar);

    _inputEl.addEventListener('input', function () {
      clearTimeout(_searchDebounce);
      var v = _inputEl.value;
      _searchDebounce = setTimeout(function () { render(v); }, 120);
    });

    _inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(_selectedIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(_selectedIdx - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); seleccionar(_selectedIdx); }
    });

    // Atajo global Ctrl+K / Cmd+K
    document.addEventListener('keydown', function (e) {
      var esCmdK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
      if (esCmdK) {
        e.preventDefault();
        _open ? cerrar() : abrir();
      } else if (e.key === 'Escape' && _open) {
        cerrar();
      }
    });

    global.CCSearch = { abrir: abrir, cerrar: cerrar, refresh: function() { _loaded = false; _loading = false; } };
    console.log('[search-global] listo — Ctrl+K / Cmd+K');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
