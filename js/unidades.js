/**
 * unidades.js — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Módulo de UNIDADES DE APRENDIZAJE. Permite al docente crear, listar,
 * editar y eliminar sus unidades, con: nombre + N° + duración (semanas,
 * fechas, horas), aprendizajes esperados (OA/AE), criterios de evaluación
 * (CE), contenidos, actividades y evaluación de la unidad.
 *
 * Los AE/CE pueden cargarse del currículo oficial (best-effort, si están
 * disponibles CCAsig / CURRICULA_CHILE) y editarse libremente.
 *
 * Se guardan en la colección `planificaciones` con tipo:'unidad' → reutiliza
 * las reglas y permisos que ya existen (no requiere cambios en firestore.rules).
 * Las unidades agrupan las planificaciones de clase (cada clase puede indicar
 * su unidadId).  ← el enlace clase→unidad se conecta en el panel de clase.
 *
 * API:  CCUnidades.abrir()   → abre el modal "Mis Unidades"
 *       CCUnidades.listar()  → Promise<[unidades]> (para poblar selectores)
 */
(function () {
  'use strict';

  var COLL = 'planificaciones';
  var _cache = null;         // lista de unidades cargadas
  var _editId = null;        // id de la unidad en edición (null = nueva)
  var _d = null;             // borrador en edición

  function _uid() { return (window.ELAuth && ELAuth.user && ELAuth.user.uid) || ''; }
  function _user() { return (window.ELAuth && ELAuth.user) || {}; }
  function _esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function _nuevoBorrador() {
    return { titulo:'', numero:'', asignatura:'', nivel:'', semanas:'', fechaInicio:'', fechaFin:'', horas:'',
             aprendizajes:[], criterios:[], contenidos:'', actividades:'',
             evaluacion:{ tipo:'', instrumento:'', fecha:'' } };
  }

  // ── Datos: guardar / listar / actualizar / eliminar ──────────
  function guardar(datos) {
    if (_editId) {
      // Edición: update seguro (updateMask), NUNCA set().
      if (typeof EL_DB === 'undefined') return Promise.reject(new Error('DB no disponible'));
      return EL_DB.collection(COLL).doc(_editId).update(datos).then(function () {
        return Object.assign({ id: _editId }, datos);
      });
    }
    // Nueva: reutiliza ELDB.planificaciones.guardar (agrega autor/liceo/visibilidad).
    if (!(window.ELDB && ELDB.planificaciones && ELDB.planificaciones.guardar)) {
      return Promise.reject(new Error('ELDB.planificaciones no disponible'));
    }
    return ELDB.planificaciones.guardar(datos);
  }

  function listar() {
    if (!(window.ELDB && ELDB.planificaciones && ELDB.planificaciones.listar)) return Promise.resolve([]);
    return ELDB.planificaciones.listar({ uid: _uid() }).then(function (items) {
      return (items || []).filter(function (p) { return p.tipo === 'unidad' && p.activo !== false; })
        .sort(function (a, b) { return (parseInt(a.numero,10)||99) - (parseInt(b.numero,10)||99); });
    });
  }

  function eliminar(id) {
    if (typeof EL_DB === 'undefined') return Promise.reject(new Error('DB no disponible'));
    return EL_DB.collection(COLL).doc(id).update({ activo: false });
  }

  // Clases (planificaciones) del docente vinculadas a una unidad, indexadas por unidadId.
  function _clasesPorUnidad() {
    if (!(window.ELDB && ELDB.planificaciones && ELDB.planificaciones.listar)) return Promise.resolve({});
    return ELDB.planificaciones.listar({ uid: _uid() }).then(function (items) {
      var byU = {};
      (items || []).forEach(function (p) {
        if (p.tipo === 'planificacion' && p.unidadId && p.activo !== false) {
          (byU[p.unidadId] = byU[p.unidadId] || []).push(p);
        }
      });
      return byU;
    }).catch(function () { return {}; });
  }

  // Todas las clases (planificaciones) del docente, ordenadas por fecha.
  function _todasLasClases() {
    if (!(window.ELDB && ELDB.planificaciones && ELDB.planificaciones.listar)) return Promise.resolve([]);
    return ELDB.planificaciones.listar({ uid: _uid() }).then(function (items) {
      return (items || []).filter(function (p) { return p.tipo === 'planificacion' && p.activo !== false; })
        .sort(function (a, b) { return String(a.fecha || '').localeCompare(String(b.fecha || '')); });
    }).catch(function () { return []; });
  }

  // ── Currículo (best-effort): sugerir OA por asignatura + nivel ─
  function sugerirOAs(asig, nivel) {
    var out = [];
    try {
      var raw = null;
      if (window.CCAsig && CCAsig.getOAs) raw = CCAsig.getOAs(asig, nivel);
      if ((!raw || !raw.length) && window.CURRICULA_CHILE && CURRICULA_CHILE.getOAs) raw = CURRICULA_CHILE.getOAs(asig, nivel);
      (raw || []).forEach(function (o) {
        if (typeof o === 'string') out.push(o);
        else if (o && (o.codigo || o.oa || o.texto)) out.push(((o.codigo || o.oa || '') + (o.texto ? ': ' + o.texto : '')).trim());
      });
    } catch (e) { /* best-effort */ }
    return out;
  }

  // ── Modal ────────────────────────────────────────────────────
  function _ensureModal() {
    if (document.getElementById('cu-ov')) return;
    var ov = document.createElement('div');
    ov.id = 'cu-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147481000;background:rgba(15,23,42,.55);display:none;align-items:flex-start;justify-content:center;padding:24px;overflow:auto;font-family:system-ui,-apple-system,sans-serif';
    ov.innerHTML = '<div id="cu-box" style="background:#fff;max-width:820px;width:100%;border-radius:16px;box-shadow:0 20px 60px -20px rgba(15,23,42,.5);padding:24px;margin:auto"></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) _cerrar(); });
  }
  function _cerrar() { var ov = document.getElementById('cu-ov'); if (ov) ov.style.display = 'none'; }
  function _box() { return document.getElementById('cu-box'); }

  var IN = 'width:100%;padding:8px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:.9rem;box-sizing:border-box';
  var LB = 'font-weight:600;font-size:.8rem;display:block;margin:10px 0 4px;color:#334155';
  var BTN = 'border:none;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer';

  // ── Vista LISTA ──────────────────────────────────────────────
  function _renderLista() {
    var b = _box(); if (!b) return;
    b.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
        '<h2 style="margin:0;font-size:1.25rem;color:#0f172a">📚 Mis Unidades de Aprendizaje</h2>' +
        '<div><button id="cu-cal" style="' + BTN + ';background:#eef2ff;color:#4338ca;margin-right:8px">🗓 Calendario</button>' +
        '<button id="cu-nueva" style="' + BTN + ';background:#2563EB;color:#fff;margin-right:8px">+ Nueva unidad</button>' +
        '<button id="cu-x" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b">✕</button></div>' +
      '</div>' +
      '<div id="cu-list"><p style="color:#64748b">Cargando…</p></div>';
    document.getElementById('cu-x').addEventListener('click', _cerrar);
    document.getElementById('cu-cal').addEventListener('click', _renderCalendario);
    document.getElementById('cu-nueva').addEventListener('click', function () { _editId = null; _d = _nuevoBorrador(); _renderForm(); });

    Promise.all([listar(), _clasesPorUnidad()]).then(function (res) {
      var items = res[0], byU = res[1] || {};
      _cache = items;
      var cont = document.getElementById('cu-list');
      if (!items.length) {
        cont.innerHTML = '<div style="text-align:center;color:#64748b;padding:30px 10px"><div style="font-size:2rem">📭</div><p>Aún no tienes unidades. Crea la primera con “+ Nueva unidad”.</p></div>';
        return;
      }
      cont.innerHTML = items.map(function (u) {
        var dur = [u.semanas ? u.semanas + ' sem' : '', (u.fechaInicio || u.fechaFin) ? ((u.fechaInicio||'') + ' → ' + (u.fechaFin||'')) : '', u.horas ? u.horas + ' hrs' : ''].filter(Boolean).join(' · ');
        var nAE = (u.aprendizajes || []).length, nCE = (u.criterios || []).length;
        var clases = byU[u.id] || [];
        clases.sort(function (a, b) { return String(a.fecha || '').localeCompare(String(b.fecha || '')); });
        var clasesHtml = clases.length
          ? '<div style="margin-top:8px;border-top:1px dashed #e2e8f0;padding-top:7px">' +
              clases.map(function (c) {
                var f = c.fecha ? new Date(c.fecha).toLocaleDateString('es-CL') : '';
                return '<div style="font-size:.8rem;color:#475569;padding:2px 0">🗓 ' + (f ? '<b>' + _esc(f) + '</b> · ' : '') + _esc((c.titulo || 'Clase').replace(/^Planificación\s*/, '')) + (c.horas ? ' · ' + _esc(c.horas) + ' h' : '') + '</div>';
              }).join('') +
            '</div>'
          : '';
        return '<div style="border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-bottom:10px">' +
          '<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">' +
            '<div style="flex:1"><div style="font-weight:700;color:#0f172a">' + (u.numero ? 'Unidad ' + _esc(u.numero) + ' · ' : '') + _esc(u.titulo || 'Sin título') + '</div>' +
            '<div style="font-size:.82rem;color:#64748b;margin-top:2px">' + _esc([u.asignatura, u.nivel].filter(Boolean).join(' · ')) + (dur ? ' · ' + _esc(dur) : '') + '</div>' +
            '<div style="font-size:.78rem;color:#94a3b8;margin-top:3px">' + nAE + ' aprendizajes · ' + nCE + ' criterios · <b style="color:#4f46e5">' + clases.length + ' clase' + (clases.length === 1 ? '' : 's') + '</b></div></div>' +
            '<div style="white-space:nowrap">' +
              '<button data-id="' + u.id + '" class="cu-edit" style="' + BTN + ';background:#fff;border:1px solid #cbd5e1;color:#334155;padding:5px 10px;font-size:.8rem">✏️ Editar</button> ' +
              '<button data-id="' + u.id + '" class="cu-del" style="' + BTN + ';background:#fee2e2;color:#b91c1c;padding:5px 10px;font-size:.8rem">🗑️</button>' +
            '</div>' +
          '</div>' + clasesHtml + '</div>';
      }).join('');
      Array.prototype.forEach.call(cont.querySelectorAll('.cu-edit'), function (btn) {
        btn.addEventListener('click', function () {
          var u = _cache.filter(function (x) { return x.id === btn.getAttribute('data-id'); })[0];
          if (u) { _editId = u.id; _d = _cargarBorrador(u); _renderForm(); }
        });
      });
      Array.prototype.forEach.call(cont.querySelectorAll('.cu-del'), function (btn) {
        btn.addEventListener('click', function () {
          if (!confirm('¿Eliminar esta unidad?')) return;
          eliminar(btn.getAttribute('data-id')).then(_renderLista);
        });
      });
    }).catch(function (e) {
      var cont = document.getElementById('cu-list');
      if (cont) cont.innerHTML = '<p style="color:#b91c1c">Error al cargar: ' + _esc(e && e.message) + '</p>';
    });
  }

  function _cargarBorrador(u) {
    return {
      titulo: u.titulo || '', numero: u.numero || '', asignatura: u.asignatura || '', nivel: u.nivel || '',
      semanas: u.semanas || '', fechaInicio: u.fechaInicio || '', fechaFin: u.fechaFin || '', horas: u.horas || '',
      aprendizajes: (u.aprendizajes || []).slice(), criterios: (u.criterios || []).slice(),
      contenidos: u.contenidos || '', actividades: u.actividades || '',
      evaluacion: Object.assign({ tipo:'', instrumento:'', fecha:'' }, u.evaluacion || {})
    };
  }

  // ── Vista FORMULARIO ─────────────────────────────────────────
  function _renderForm() {
    var b = _box(); if (!b) return;
    if (!_d) _d = _nuevoBorrador();
    // Prefijar asignatura/nivel del usuario si están vacíos y hay datos.
    var u = _user();
    if (!_d.asignatura && u.asignaturas && u.asignaturas.length) _d.asignatura = u.asignaturas[0];

    b.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<h2 style="margin:0;font-size:1.2rem;color:#0f172a">' + (_editId ? '✏️ Editar unidad' : '📝 Nueva unidad') + '</h2>' +
        '<button id="cu-x2" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b">✕</button>' +
      '</div>' +
      '<div id="cu-msg" style="display:none;border-radius:8px;padding:8px 11px;font-size:.85rem;margin-bottom:10px"></div>' +

      '<div style="display:grid;grid-template-columns:3fr 1fr;gap:10px">' +
        '<div><label style="' + LB + '">Nombre de la unidad *</label><input id="cu-titulo" style="' + IN + '" value="' + _esc(_d.titulo) + '" placeholder="Ej: Circuitos de conmutación"></div>' +
        '<div><label style="' + LB + '">N°</label><input id="cu-num" type="number" min="1" style="' + IN + '" value="' + _esc(_d.numero) + '"></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
        '<div><label style="' + LB + '">Asignatura / Módulo</label><input id="cu-asig" style="' + IN + '" value="' + _esc(_d.asignatura) + '"></div>' +
        '<div><label style="' + LB + '">Nivel / Curso</label><input id="cu-nivel" style="' + IN + '" value="' + _esc(_d.nivel) + '" placeholder="Ej: 3° Medio"></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px">' +
        '<div><label style="' + LB + '">Semanas</label><input id="cu-sem" type="number" min="0" style="' + IN + '" value="' + _esc(_d.semanas) + '"></div>' +
        '<div><label style="' + LB + '">Horas</label><input id="cu-horas" type="number" min="0" style="' + IN + '" value="' + _esc(_d.horas) + '"></div>' +
        '<div><label style="' + LB + '">Inicio</label><input id="cu-ini" type="date" style="' + IN + '" value="' + _esc(_d.fechaInicio) + '"></div>' +
        '<div><label style="' + LB + '">Término</label><input id="cu-fin" type="date" style="' + IN + '" value="' + _esc(_d.fechaFin) + '"></div>' +
      '</div>' +

      '<label style="' + LB + '">Aprendizajes esperados (OA/AE)</label>' +
      '<div id="cu-ae"></div>' +
      '<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">' +
        '<input id="cu-ae-in" style="' + IN + ';flex:1;min-width:200px" placeholder="Escribe un aprendizaje y presiona Agregar">' +
        '<button id="cu-ae-add" style="' + BTN + ';background:#e0e7ff;color:#3730a3;padding:8px 12px">+ Agregar</button>' +
        '<button id="cu-ae-cur" style="' + BTN + ';background:#dcfce7;color:#166534;padding:8px 12px">📘 Del currículo</button>' +
      '</div>' +

      '<label style="' + LB + '">Criterios de evaluación (CE / indicadores)</label>' +
      '<div id="cu-ce"></div>' +
      '<div style="display:flex;gap:6px;margin-top:6px">' +
        '<input id="cu-ce-in" style="' + IN + ';flex:1" placeholder="Escribe un criterio y presiona Agregar">' +
        '<button id="cu-ce-add" style="' + BTN + ';background:#e0e7ff;color:#3730a3;padding:8px 12px">+ Agregar</button>' +
      '</div>' +

      '<label style="' + LB + '">Contenidos / temas</label>' +
      '<textarea id="cu-cont" rows="2" style="' + IN + '">' + _esc(_d.contenidos) + '</textarea>' +
      '<label style="' + LB + '">Actividades clave</label>' +
      '<textarea id="cu-act" rows="2" style="' + IN + '">' + _esc(_d.actividades) + '</textarea>' +

      '<label style="' + LB + '">Evaluación de la unidad</label>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">' +
        '<input id="cu-ev-tipo" style="' + IN + '" value="' + _esc(_d.evaluacion.tipo) + '" placeholder="Tipo (ej: Prueba de unidad)">' +
        '<input id="cu-ev-inst" style="' + IN + '" value="' + _esc(_d.evaluacion.instrumento) + '" placeholder="Instrumento (ej: Rúbrica)">' +
        '<input id="cu-ev-fecha" type="date" style="' + IN + '" value="' + _esc(_d.evaluacion.fecha) + '">' +
      '</div>' +

      '<div style="display:flex;justify-content:space-between;gap:8px;margin-top:18px">' +
        '<button id="cu-volver" style="' + BTN + ';background:#fff;border:1px solid #cbd5e1;color:#475569">← Volver</button>' +
        '<button id="cu-save" style="' + BTN + ';background:#2563EB;color:#fff">💾 Guardar unidad</button>' +
      '</div>';

    document.getElementById('cu-x2').addEventListener('click', _cerrar);
    document.getElementById('cu-volver').addEventListener('click', _renderLista);
    document.getElementById('cu-save').addEventListener('click', _guardarForm);
    _renderChips();

    document.getElementById('cu-ae-add').addEventListener('click', function () {
      var v = document.getElementById('cu-ae-in').value.trim();
      if (v) { _d.aprendizajes.push(v); document.getElementById('cu-ae-in').value = ''; _renderChips(); }
    });
    document.getElementById('cu-ce-add').addEventListener('click', function () {
      var v = document.getElementById('cu-ce-in').value.trim();
      if (v) { _d.criterios.push(v); document.getElementById('cu-ce-in').value = ''; _renderChips(); }
    });
    document.getElementById('cu-ae-cur').addEventListener('click', _abrirCurriculo);
  }

  function _renderChips() {
    _chipBox('cu-ae', _d.aprendizajes);
    _chipBox('cu-ce', _d.criterios);
  }
  function _chipBox(id, arr) {
    var el = document.getElementById(id); if (!el) return;
    if (!arr.length) { el.innerHTML = '<span style="color:#94a3b8;font-size:.82rem">Ninguno agregado.</span>'; return; }
    el.innerHTML = arr.map(function (t, i) {
      return '<div style="display:flex;gap:8px;align-items:flex-start;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:6px 10px;margin-bottom:5px;font-size:.85rem">' +
        '<span style="flex:1">' + _esc(t) + '</span>' +
        '<button data-box="' + id + '" data-i="' + i + '" class="cu-rm" style="background:none;border:none;color:#b91c1c;cursor:pointer;font-weight:700">✕</button></div>';
    }).join('');
    Array.prototype.forEach.call(el.querySelectorAll('.cu-rm'), function (btn) {
      btn.addEventListener('click', function () {
        var tgt = btn.getAttribute('data-box') === 'cu-ae' ? _d.aprendizajes : _d.criterios;
        tgt.splice(parseInt(btn.getAttribute('data-i'), 10), 1); _renderChips();
      });
    });
  }

  function _abrirCurriculo() {
    _d.asignatura = document.getElementById('cu-asig').value.trim();
    _d.nivel = document.getElementById('cu-nivel').value.trim();
    var oas = sugerirOAs(_d.asignatura, _d.nivel);
    if (!oas.length) { _msg('No se encontraron OA del currículo para esa asignatura/nivel. Puedes escribirlos manualmente.', false); return; }
    var picked = window.prompt('OA disponibles (' + oas.length + '). Escribe los números separados por coma para agregarlos:\n\n' +
      oas.map(function (o, i) { return (i + 1) + '. ' + (o.length > 90 ? o.slice(0, 90) + '…' : o); }).join('\n'));
    if (!picked) return;
    picked.split(',').forEach(function (n) {
      var idx = parseInt(n.trim(), 10) - 1;
      if (idx >= 0 && idx < oas.length && _d.aprendizajes.indexOf(oas[idx]) === -1) _d.aprendizajes.push(oas[idx]);
    });
    _renderChips();
  }

  function _msg(txt, ok) {
    var m = document.getElementById('cu-msg'); if (!m) return;
    m.style.display = 'block';
    m.style.background = ok ? '#dcfce7' : '#fee2e2';
    m.style.color = ok ? '#166534' : '#991b1b';
    m.textContent = txt;
  }

  function _guardarForm() {
    _d.titulo = document.getElementById('cu-titulo').value.trim();
    if (!_d.titulo) { _msg('Ponle un nombre a la unidad.', false); return; }
    var datos = {
      tipo: 'unidad',
      titulo: _d.titulo,
      numero: document.getElementById('cu-num').value.trim(),
      asignatura: document.getElementById('cu-asig').value.trim(),
      nivel: document.getElementById('cu-nivel').value.trim(),
      semanas: document.getElementById('cu-sem').value.trim(),
      horas: document.getElementById('cu-horas').value.trim(),
      fechaInicio: document.getElementById('cu-ini').value,
      fechaFin: document.getElementById('cu-fin').value,
      aprendizajes: _d.aprendizajes.slice(),
      criterios: _d.criterios.slice(),
      contenidos: document.getElementById('cu-cont').value.trim(),
      actividades: document.getElementById('cu-act').value.trim(),
      evaluacion: {
        tipo: document.getElementById('cu-ev-tipo').value.trim(),
        instrumento: document.getElementById('cu-ev-inst').value.trim(),
        fecha: document.getElementById('cu-ev-fecha').value
      }
    };
    var btn = document.getElementById('cu-save');
    btn.disabled = true; btn.textContent = 'Guardando…';
    guardar(datos).then(function () {
      _msg('✅ Unidad guardada.', true);
      setTimeout(_renderLista, 700);
    }).catch(function (e) {
      _msg('❌ Error: ' + (e && e.message ? e.message : e), false);
      btn.disabled = false; btn.textContent = '💾 Guardar unidad';
    });
  }

  // ── Vista CALENDARIO (agenda de clases por fecha, color por unidad) ──
  function _renderCalendario() {
    var b = _box(); if (!b) return;
    b.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
        '<h2 style="margin:0;font-size:1.2rem;color:#0f172a">🗓 Calendario de clases</h2>' +
        '<div><button id="cu-back" style="' + BTN + ';background:#fff;border:1px solid #cbd5e1;color:#334155;margin-right:8px">← Unidades</button>' +
        '<button id="cu-x3" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b">✕</button></div>' +
      '</div>' +
      '<div id="cu-cal-body"><p style="color:#64748b">Cargando…</p></div>';
    document.getElementById('cu-x3').addEventListener('click', _cerrar);
    document.getElementById('cu-back').addEventListener('click', _renderLista);

    Promise.all([_todasLasClases(), listar()]).then(function (res) {
      var clases = res[0], unidades = res[1] || [];
      var body = document.getElementById('cu-cal-body');
      var PAL = ['#4f46e5', '#0ea5e9', '#059669', '#d97706', '#db2777', '#7c3aed', '#0891b2'];
      var colorDe = {};
      unidades.forEach(function (u, i) { colorDe[u.id] = PAL[i % PAL.length]; });
      if (!clases.length) {
        body.innerHTML = '<div style="text-align:center;color:#64748b;padding:30px"><div style="font-size:2rem">🗓</div><p>Aún no hay clases planificadas. Planifica una clase (con fecha y unidad) y aparecerá aquí.</p></div>';
        return;
      }
      var grupos = {};
      clases.forEach(function (c) {
        var d = c.fecha ? new Date(c.fecha) : null;
        var key = (d && !isNaN(d.getTime())) ? d.toISOString().slice(0, 10) : 'sin-fecha';
        (grupos[key] = grupos[key] || []).push(c);
      });
      var keys = Object.keys(grupos).sort();
      body.innerHTML = keys.map(function (k) {
        var fechaLbl = (k === 'sin-fecha') ? 'Sin fecha'
          : new Date(k + 'T00:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
        var cards = grupos[k].map(function (c) {
          var col = colorDe[c.unidadId] || '#94a3b8';
          var uni = c.unidadNombre ? _esc(c.unidadNombre) : 'Sin unidad';
          return '<div style="border-left:4px solid ' + col + ';background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px 12px;margin-bottom:6px">' +
            '<div style="font-weight:600;color:#0f172a;font-size:.88rem">' + _esc((c.titulo || 'Clase').replace(/^Planificación\s*/, '')) + '</div>' +
            '<div style="font-size:.78rem;color:#64748b;margin-top:2px"><span style="color:' + col + ';font-weight:600">' + uni + '</span>' + (c.horas ? ' · ' + _esc(c.horas) + ' h' : '') + (c.nivel ? ' · ' + _esc(c.nivel) : '') + '</div>' +
          '</div>';
        }).join('');
        return '<div style="margin-bottom:14px"><div style="font-weight:700;color:#334155;font-size:.9rem;text-transform:capitalize;border-bottom:2px solid #e2e8f0;padding-bottom:4px;margin-bottom:8px">' + _esc(fechaLbl) + '</div>' + cards + '</div>';
      }).join('');
    }).catch(function (e) {
      var body = document.getElementById('cu-cal-body'); if (body) body.innerHTML = '<p style="color:#b91c1c">Error: ' + _esc(e && e.message) + '</p>';
    });
  }

  function abrir() { _ensureModal(); document.getElementById('cu-ov').style.display = 'flex'; _renderLista(); }

  // Poblar un <select> con las unidades del docente (para vincular una clase).
  function poblarSelect(selId, selectedId) {
    var sel = document.getElementById(selId); if (!sel) return;
    var cur = selectedId || sel.value;
    listar().then(function (items) {
      sel.innerHTML = '<option value="">— Sin unidad —</option>' +
        (items || []).map(function (u) {
          return '<option value="' + _esc(u.id) + '"' + (cur === u.id ? ' selected' : '') + '>' +
            (u.numero ? 'U' + _esc(u.numero) + ' · ' : '') + _esc(u.titulo || 'Sin título') + '</option>';
        }).join('');
    }).catch(function () {});
  }

  window.CCUnidades = { abrir: abrir, listar: listar, poblarSelect: poblarSelect };
})();
