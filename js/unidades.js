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
  var NIVELES_STD = [
    ['NT1','Pre-Kínder (NT1)'],['NT2','Kínder (NT2)'],
    ['1B','1° Básico'],['2B','2° Básico'],['3B','3° Básico'],['4B','4° Básico'],
    ['5B','5° Básico'],['6B','6° Básico'],['7B','7° Básico'],['8B','8° Básico'],
    ['1M','1° Medio'],['2M','2° Medio'],['3M','3° Medio'],['4M','4° Medio']
  ];
  var EVAL_TIPOS = ['Prueba de unidad','Prueba parcial','Control','Trabajo de investigación','Proyecto','Presentación / disertación','Portafolio','Guía evaluada','Ensayo','Informe de laboratorio','Taller práctico','Evaluación de desempeño','Coevaluación','Autoevaluación'];
  var EVAL_INSTR = ['Rúbrica','Lista de cotejo','Escala de apreciación','Pauta de corrección','Prueba escrita','Cuestionario','Ticket de salida','Registro de observación'];
  var _cache = null;         // lista de unidades cargadas
  var _clasesByU = {};       // clases (planificaciones) indexadas por unidadId
  var _editId = null;        // id de la unidad en edición (null = nueva)
  var _d = null;             // borrador en edición

  function _uid() { return (window.ELAuth && ELAuth.user && ELAuth.user.uid) || ''; }
  function _user() { return (window.ELAuth && ELAuth.user) || {}; }
  function _esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function _nuevoBorrador() {
    return { titulo:'', numero:'', asignatura:'', asignaturaId:'', nivel:'', nivelId:'', curso:'', semanas:'', fechaInicio:'', fechaFin:'', horas:'',
             aprendizajes:[], criterios:[], oag:[], contenidos:'', actividades:'',
             evaluaciones:[], _selOA:'', _selAE:'' };
  }

  // Áreas asignadas al docente: asignaturas de plan común + módulos TP + niveles.
  // Sirve para ofrecer como opciones en el formulario (no obliga: se puede escribir).
  function _areasDocente() {
    var u = _user();
    var asigs = [], vistos = {};
    function pushA(value, label) {
      if (!value) return; var k = 'a' + value; if (vistos[k]) return; vistos[k] = true;
      asigs.push({ value: String(value), label: label || String(value) });
    }
    (u.asignaturas || []).forEach(function (a) {
      var lbl = (window.CCAsig && CCAsig.getNombre) ? CCAsig.getNombre(a) : a;
      pushA(a, lbl);
    });
    if (u.asignatura) pushA(u.asignatura, (window.CCAsig && CCAsig.getNombre) ? CCAsig.getNombre(u.asignatura) : u.asignatura);
    // Especialidad resuelta desde el campo singular o el array (schemas mezclados).
    var espUser = u.especialidad || (Array.isArray(u.especialidades) && u.especialidades[0]) || '';
    function _pushMod(esp, modId) {
      if (esp) {
        var eL = (window.CCTPCatalogo && CCTPCatalogo.labelEspecialidad) ? CCTPCatalogo.labelEspecialidad(esp) : esp;
        var mL = (window.CCTPCatalogo && CCTPCatalogo.labelModulo) ? CCTPCatalogo.labelModulo(esp, modId) : modId;
        pushA('mod:' + esp + ':' + modId, eL + ' — ' + mL);
      } else {
        // Sin especialidad conocida: mostramos el módulo igual (valor = id crudo).
        pushA(String(modId), 'Módulo ' + modId);
      }
    }
    // Módulos TP (formato nuevo modulosTP:{esp:[mods]})
    var mods = u.modulosTP || {};
    var _huboModulosTP = false;
    Object.keys(mods).forEach(function (esp) {
      (mods[esp] || []).forEach(function (modId) { _huboModulosTP = true; _pushMod(esp, modId); });
    });
    // TP legacy: modulos[] (aunque falte especialidad). Solo si modulosTP no los cubrió.
    if (!_huboModulosTP && Array.isArray(u.modulos)) {
      u.modulos.forEach(function (modId) { _pushMod(espUser, modId); });
    }
    var nivs = (u.niveles || []).map(function (n) {
      return { value: n, label: (window.CURRICULA_CHILE && CURRICULA_CHILE.getNivelLabel) ? CURRICULA_CHILE.getNivelLabel(n) : n };
    });
    var cursos = (u.cursos || []).map(function (c) { return { value: String(c), label: String(c) }; });
    return { asignaturas: asigs, niveles: nivs, cursos: cursos };
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
  // Devuelve { oas, aes, ces } del currículo para una asignatura/módulo + nivel.
  function _curriculoDe(asig, nivel) {
    var r = { oas: [], aes: [], ces: [] };
    try {
      // Módulo TP ('mod:esp:modId') → OA + AE + CE del módulo.
      if (typeof asig === 'string' && asig.indexOf('mod:') === 0 && window.CURRICULA_CHILE && CURRICULA_CHILE.getModuloCompat) {
        var p = asig.split(':'); var mod = CURRICULA_CHILE.getModuloCompat(p[1], p[2]);
        if (mod) {
          if (mod.oas) Object.keys(mod.oas).forEach(function (k) { r.oas.push(k + ': ' + (mod.oas[k] || '')); });
          if (mod.aes) Object.keys(mod.aes).forEach(function (k) {
            var ae = mod.aes[k];
            var num = (typeof k === 'string' && k.indexOf('OA') === 0) ? k.replace('OA', '') : k;
            r.aes.push('AE ' + num + ': ' + (ae.texto || ''));
            if (ae.ces) Object.keys(ae.ces).forEach(function (ck) { r.ces.push(ck + ': ' + (ae.ces[ck].texto || '')); });
          });
        }
        return r;
      }
      // Plan común → OAs.
      var raw = null;
      if (window.CCAsig && CCAsig.getOAs) raw = CCAsig.getOAs(asig, nivel);
      if ((!raw || !raw.length) && window.CURRICULA_CHILE && CURRICULA_CHILE.getOAs) raw = CURRICULA_CHILE.getOAs(asig, nivel);
      (raw || []).forEach(function (o) {
        if (typeof o === 'string') r.oas.push(o);
        else if (o && (o.codigo || o.oa || o.texto)) r.oas.push(((o.codigo || o.oa || '') + (o.texto ? ': ' + o.texto : '')).trim());
      });
    } catch (e) { /* best-effort */ }
    return r;
  }

  // Lee la asignatura/nivel actuales (select o "otra") para consultar el currículo.
  function _lookupActual() {
    var aSel = document.getElementById('cu-asig'), nSel = document.getElementById('cu-nivel');
    return {
      asig: (aSel.value && aSel.value !== '__otra__') ? aSel.value : document.getElementById('cu-asig-otra').value.trim(),
      nivel: (nSel.value && nSel.value !== '__otra__') ? nSel.value : document.getElementById('cu-nivel-otra').value.trim()
    };
  }

  // Panel de selección múltiple (casillas) inyectado bajo el campo.
  function _renderPicker(containerId, titulo, items, targetArr) {
    var el = document.getElementById(containerId); if (!el) return;
    if (!items.length) { el.innerHTML = '<div style="font-size:.82rem;color:#b45309;margin-top:6px">No se encontró currículo para esa asignatura/nivel. Escríbelos a mano, o elige la asignatura/módulo del desplegable.</div>'; return; }
    el.innerHTML = '<div style="border:1px solid #c7d2fe;background:#eef2ff;border-radius:8px;padding:10px;margin-top:6px">' +
      '<div style="font-weight:600;font-size:.8rem;margin-bottom:6px;color:#3730a3">' + _esc(titulo) + ' — marca los que quieras agregar:</div>' +
      '<div style="max-height:200px;overflow:auto">' +
        items.map(function (t, i) { return '<label style="display:flex;gap:6px;align-items:flex-start;font-size:.82rem;padding:3px 0;cursor:pointer"><input type="checkbox" class="cu-pk" value="' + i + '" style="margin-top:3px"><span>' + _esc(t) + '</span></label>'; }).join('') +
      '</div>' +
      '<div style="text-align:right;margin-top:6px"><button type="button" id="cu-pk-add" style="' + BTN + ';background:#4f46e5;color:#fff;padding:6px 12px;font-size:.82rem">Agregar seleccionados</button> <button type="button" id="cu-pk-close" style="' + BTN + ';background:#fff;border:1px solid #cbd5e1;color:#475569;padding:6px 12px;font-size:.82rem">Cerrar</button></div>' +
    '</div>';
    document.getElementById('cu-pk-add').addEventListener('click', function () {
      Array.prototype.forEach.call(el.querySelectorAll('.cu-pk:checked'), function (cb) {
        var t = items[parseInt(cb.value, 10)]; if (t && targetArr.indexOf(t) === -1) targetArr.push(t);
      });
      el.innerHTML = ''; _renderChips();
    });
    document.getElementById('cu-pk-close').addEventListener('click', function () { el.innerHTML = ''; });
  }

  // Datos del módulo TP seleccionado (para la cascada OA→AE→CE→OAG).
  function _modData() {
    var aSel = document.getElementById('cu-asig');
    var v = aSel ? aSel.value : '';
    if (v && v.indexOf('mod:') === 0 && window.CURRICULA_CHILE && CURRICULA_CHILE.getModuloCompat) {
      var p = v.split(':'); try { return CURRICULA_CHILE.getModuloCompat(p[1], p[2]); } catch (e) {}
    }
    return null;
  }

  // Cascada de currículo (para módulos TP): OA → AE → CE (+OAG) → "Agregar a la unidad".
  function _renderCascada() {
    var el = document.getElementById('cu-cascada'); if (!el) return;
    var mod = _modData();
    if (!mod || !mod.oas) {
      el.innerHTML = '<div style="font-size:.82rem;color:#64748b;margin:2px 0 6px">Elige un módulo TP arriba para cargar OA/AE/CE en cascada, o escribe los aprendizajes/criterios a mano abajo.</div>';
      return;
    }
    // Colapsada: mostrar solo un botón para reabrir (se colapsa al agregar).
    if (_d._cascadaAbierta === false) {
      el.innerHTML = '<div style="margin:2px 0 6px"><button type="button" id="cu-cas-open" style="' + BTN + ';background:#eef2ff;color:#4338ca;padding:8px 14px;font-size:.82rem">➕ Agregar OA / AE / CE del currículo</button></div>';
      document.getElementById('cu-cas-open').addEventListener('click', function () { _d._cascadaAbierta = true; _renderCascada(); });
      return;
    }
    var oaKeys = Object.keys(mod.oas);
    var aeKeys = mod.aes ? Object.keys(mod.aes) : [];
    var selAE = _d._selAE;
    var ces = (selAE && mod.aes && mod.aes[selAE] && mod.aes[selAE].ces) ? mod.aes[selAE].ces : null;
    var html = '<div style="border:1px solid #c7d2fe;background:#f5f7ff;border-radius:8px;padding:10px;margin:2px 0 6px">' +
      '<div style="font-weight:600;font-size:.8rem;color:#3730a3;margin-bottom:6px">Currículo del módulo (cascada)</div>' +
      '<label style="' + LB + ';margin-top:0">Objetivo de aprendizaje (OA)</label>' +
      '<select id="cu-cas-oa" style="' + IN + '"><option value="">— Selecciona OA —</option>' + oaKeys.map(function (k) { return '<option value="' + _esc(k) + '"' + (_d._selOA === k ? ' selected' : '') + '>' + _esc(k + ': ' + (mod.oas[k] || '')) + '</option>'; }).join('') + '</select>' +
      '<label style="' + LB + '">Aprendizaje esperado (AE)</label>' +
      '<select id="cu-cas-ae" style="' + IN + '"><option value="">— Selecciona AE —</option>' + aeKeys.map(function (k) { var num = (typeof k === 'string' && k.indexOf('OA') === 0) ? k.replace('OA', '') : k; return '<option value="' + _esc(k) + '"' + (selAE === k ? ' selected' : '') + '>' + _esc('AE ' + num + ': ' + ((mod.aes[k] && mod.aes[k].texto) || '')) + '</option>'; }).join('') + '</select>';
    if (ces) {
      html += '<label style="' + LB + '">Criterios de evaluación (CE)</label><div style="max-height:150px;overflow:auto">';
      Object.keys(ces).forEach(function (ck) { html += '<label style="display:flex;gap:6px;font-size:.82rem;padding:2px 0;cursor:pointer"><input type="checkbox" class="cu-cas-ce" value="' + _esc(ck) + '" checked style="margin-top:3px"><span><b>' + _esc(ck) + '</b> — ' + _esc(ces[ck].texto || '') + '</span></label>'; });
      html += '</div>';
    }
    html += '<div style="text-align:right;margin-top:8px"><button type="button" id="cu-cas-add" style="' + BTN + ';background:#4f46e5;color:#fff;padding:7px 14px;font-size:.82rem">➕ Agregar a la unidad</button></div></div>';
    el.innerHTML = html;
    document.getElementById('cu-cas-oa').addEventListener('change', function () { _d._selOA = this.value; _renderCascada(); });
    document.getElementById('cu-cas-ae').addEventListener('change', function () { _d._selAE = this.value; _renderCascada(); });
    var addBtn = document.getElementById('cu-cas-add');
    if (addBtn) addBtn.addEventListener('click', function () {
      var m = _modData(); if (!m) return;
      var oa = _d._selOA, ae = _d._selAE;
      if (oa && m.oas[oa]) { var t = oa + ': ' + m.oas[oa]; if (_d.aprendizajes.indexOf(t) === -1) _d.aprendizajes.push(t); }
      if (ae && m.aes && m.aes[ae]) {
        var num = (ae.indexOf('OA') === 0) ? ae.replace('OA', '') : ae;
        var tae = 'AE ' + num + ': ' + (m.aes[ae].texto || ''); if (_d.aprendizajes.indexOf(tae) === -1) _d.aprendizajes.push(tae);
        var aeCes = m.aes[ae].ces || {};
        Array.prototype.forEach.call(el.querySelectorAll('.cu-cas-ce:checked'), function (cb) {
          var ck = cb.value, tc = ck + ': ' + ((aeCes[ck] && aeCes[ck].texto) || '');
          if (_d.criterios.indexOf(tc) === -1) _d.criterios.push(tc);
          if (aeCes[ck] && aeCes[ck].oag) aeCes[ck].oag.forEach(function (g) { if (_d.oag.indexOf(g) === -1) _d.oag.push(g); });
        });
      }
      _renderChips();
      _d._cascadaAbierta = false; _d._selOA = ''; _d._selAE = '';  // colapsar tras agregar
      _renderCascada();
    });
  }

  // Evaluaciones múltiples (filas repetibles con tipo + instrumento + fecha).
  function _renderEvals() {
    var el = document.getElementById('cu-evals'); if (!el) return;
    var tOpts = EVAL_TIPOS.map(function (t) { return '<option>' + _esc(t) + '</option>'; }).join('');
    var iOpts = EVAL_INSTR.map(function (t) { return '<option>' + _esc(t) + '</option>'; }).join('');
    var rows = _d.evaluaciones.map(function (ev, i) {
      return '<div style="display:grid;grid-template-columns:1fr 1fr 130px auto;gap:8px;margin-bottom:6px;align-items:center">' +
        '<select class="cu-ev-t" data-i="' + i + '" style="' + IN + '"><option value="">Tipo…</option>' + tOpts.replace('>' + _esc(ev.tipo || '') + '<', ' selected>' + _esc(ev.tipo || '') + '<') + '</select>' +
        '<select class="cu-ev-i" data-i="' + i + '" style="' + IN + '"><option value="">Instrumento…</option>' + iOpts.replace('>' + _esc(ev.instrumento || '') + '<', ' selected>' + _esc(ev.instrumento || '') + '<') + '</select>' +
        '<input class="cu-ev-f" data-i="' + i + '" type="date" style="' + IN + '" value="' + _esc(ev.fecha || '') + '">' +
        '<button type="button" class="cu-ev-rm" data-i="' + i + '" title="Quitar" style="background:none;border:none;color:#b91c1c;cursor:pointer;font-weight:700;font-size:1rem">✕</button>' +
      '</div>';
    }).join('');
    el.innerHTML = rows + '<button type="button" id="cu-ev-add" style="' + BTN + ';background:#e0e7ff;color:#3730a3;padding:7px 12px;font-size:.82rem;margin-top:4px">➕ Agregar evaluación</button>';
    function sync() {
      _d.evaluaciones = [];
      Array.prototype.forEach.call(el.querySelectorAll('.cu-ev-t'), function (t) {
        var i = t.getAttribute('data-i');
        var inst = el.querySelector('.cu-ev-i[data-i="' + i + '"]');
        var f = el.querySelector('.cu-ev-f[data-i="' + i + '"]');
        _d.evaluaciones.push({ tipo: t.value, instrumento: inst ? inst.value : '', fecha: f ? f.value : '' });
      });
    }
    Array.prototype.forEach.call(el.querySelectorAll('.cu-ev-t,.cu-ev-i,.cu-ev-f'), function (inp) { inp.addEventListener('change', sync); });
    Array.prototype.forEach.call(el.querySelectorAll('.cu-ev-rm'), function (btn) {
      btn.addEventListener('click', function () { sync(); _d.evaluaciones.splice(parseInt(btn.getAttribute('data-i'), 10), 1); _renderEvals(); });
    });
    document.getElementById('cu-ev-add').addEventListener('click', function () { sync(); _d.evaluaciones.push({ tipo: '', instrumento: '', fecha: '' }); _renderEvals(); });
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
  // Render objetivo: 'cu-box' = modal (por defecto); o un contenedor inline (sección fija).
  var _targetId = 'cu-box';
  var _inlineSection = null;
  var _inlinePermanente = false;
  function _cerrar() {
    if (_targetId === 'cu-box') { var ov = document.getElementById('cu-ov'); if (ov) ov.style.display = 'none'; }
    else if (_inlinePermanente) { _renderLista(); }   // permanente: no ocultar, volver a la lista
    else if (_inlineSection) { _inlineSection.style.display = 'none'; }
  }
  function _box() { return document.getElementById(_targetId); }

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
      _cache = items; _clasesByU = byU;
      var cont = document.getElementById('cu-list');
      if (!items.length) {
        cont.innerHTML = '<div style="text-align:center;color:#64748b;padding:30px 10px"><div style="font-size:2rem">📭</div><p>Aún no tienes unidades. Crea la primera con “+ Nueva unidad”.</p></div>';
        return;
      }
      var _card = function (u) {
        var dur = [u.semanas ? u.semanas + ' sem' : '', (u.fechaInicio || u.fechaFin) ? ((u.fechaInicio||'') + ' → ' + (u.fechaFin||'')) : '', u.horas ? u.horas + ' hrs' : ''].filter(Boolean).join(' · ');
        var nAE = (u.aprendizajes || []).length, nCE = (u.criterios || []).length;
        var clases = (byU[u.id] || []).slice();
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
            '<div style="font-size:.82rem;color:#64748b;margin-top:2px">' + _esc([u.nivel, u.curso].filter(Boolean).join(' · ')) + (dur ? ' · ' + _esc(dur) : '') + '</div>' +
            '<div style="font-size:.78rem;color:#94a3b8;margin-top:3px">' + nAE + ' aprendizajes · ' + nCE + ' criterios · <b style="color:#4f46e5">' + clases.length + ' clase' + (clases.length === 1 ? '' : 's') + '</b></div></div>' +
            '<div style="white-space:nowrap">' +
              '<button data-id="' + u.id + '" class="cu-gen" style="' + BTN + ';background:#ede9fe;color:#6d28d9;padding:5px 10px;font-size:.8rem">⚡ Generar clases</button> ' +
              '<button data-id="' + u.id + '" class="cu-plan" style="' + BTN + ';background:#dbeafe;color:#1e40af;padding:5px 10px;font-size:.8rem">🗓 Planificar clase</button> ' +
              '<button data-id="' + u.id + '" class="cu-doc" style="' + BTN + ';background:#eff6ff;color:#1d4ed8;padding:5px 10px;font-size:.8rem">📄 Word</button> ' +
              '<button data-id="' + u.id + '" class="cu-edit" style="' + BTN + ';background:#fff;border:1px solid #cbd5e1;color:#334155;padding:5px 10px;font-size:.8rem">✏️ Editar</button> ' +
              '<button data-id="' + u.id + '" class="cu-del" style="' + BTN + ';background:#fee2e2;color:#b91c1c;padding:5px 10px;font-size:.8rem">🗑️</button>' +
            '</div>' +
          '</div>' + clasesHtml + '</div>';
      };
      // Agrupar por módulo / asignatura (plan anual por módulo).
      var grupos = {};
      items.forEach(function (u) { var k = u.asignatura || 'Sin módulo / asignatura'; (grupos[k] = grupos[k] || []).push(u); });
      var gkeys = Object.keys(grupos).sort(function (a, b) { return a.localeCompare(b, 'es'); });
      cont.innerHTML = gkeys.map(function (mod) {
        return '<div style="margin-bottom:16px">' +
          '<div style="font-weight:700;color:#1e40af;font-size:.9rem;display:flex;align-items:center;gap:6px;margin-bottom:8px;padding-bottom:5px;border-bottom:2px solid #dbeafe"><span>📦</span><span>' + _esc(mod) + '</span><span style="color:#94a3b8;font-weight:400;font-size:.8rem">(' + grupos[mod].length + ')</span></div>' +
          grupos[mod].map(_card).join('') +
        '</div>';
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
      Array.prototype.forEach.call(cont.querySelectorAll('.cu-plan'), function (btn) {
        btn.addEventListener('click', function () { _planificarDeUnidad(btn.getAttribute('data-id')); });
      });
      Array.prototype.forEach.call(cont.querySelectorAll('.cu-doc'), function (btn) {
        btn.addEventListener('click', function () { _exportarUnidad(btn.getAttribute('data-id')); });
      });
      Array.prototype.forEach.call(cont.querySelectorAll('.cu-gen'), function (btn) {
        btn.addEventListener('click', function () { _modalGenerarClases(btn.getAttribute('data-id')); });
      });
    }).catch(function (e) {
      var cont = document.getElementById('cu-list');
      if (cont) cont.innerHTML = '<p style="color:#b91c1c">Error al cargar: ' + _esc(e && e.message) + '</p>';
    });
  }

  // ---- Exportar planificación de unidad a Word (.doc) --------------------
  function _exportarUnidad(uid) {
    var u = (_cache || []).filter(function (x) { return x.id === uid; })[0];
    if (!u) return;
    var user = _user();
    var esc = _esc;
    var clases = (_clasesByU[uid] || []).slice().sort(function (a, b) {
      return String(a.fecha || '').localeCompare(String(b.fecha || ''));
    });
    function li(arr) {
      return (arr && arr.length)
        ? '<ul>' + arr.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'
        : '<p style="color:#666">—</p>';
    }
    function txt(s) { return esc(s || '').replace(/\n/g, '<br>') || '—'; }
    var evalRows = (u.evaluaciones || []).map(function (ev) {
      return '<tr><td>' + esc(ev.tipo || '—') + '</td><td>' + esc(ev.instrumento || '—') + '</td><td>' + esc(ev.fecha || '—') + '</td></tr>';
    }).join('') || '<tr><td colspan="3" style="color:#666">Sin evaluaciones</td></tr>';
    var clasesRows = clases.map(function (c) {
      var f = c.fecha ? c.fecha : '—';
      var tit = (c.titulo || c.tema || 'Clase').replace(/^Planificaci[oó]n\s*/i, '');
      return '<tr><td>' + esc(f) + '</td><td>' + esc(tit) + '</td><td>' + esc(c.horas || c.horasPedagogicas || '') + '</td></tr>';
    }).join('') || '<tr><td colspan="3" style="color:#666">Sin clases planificadas aún</td></tr>';
    var dur = [
      u.semanas ? u.semanas + ' semanas' : '',
      u.horas ? u.horas + ' horas' : '',
      (u.fechaInicio || u.fechaFin) ? ((u.fechaInicio || '¿?') + ' → ' + (u.fechaFin || '¿?')) : ''
    ].filter(Boolean).join(' · ') || '—';
    var html = '<html><head><meta charset="utf-8"><style>' +
      'body{font-family:Calibri,Arial,sans-serif;color:#1e2a44;font-size:11pt;}' +
      'h1{font-size:15pt;text-align:center;}' +
      'h2{font-size:12pt;color:#185FA5;border-bottom:1pt solid #c8cdd2;padding-bottom:3pt;margin:14pt 0 4pt;}' +
      'table{width:100%;border-collapse:collapse;margin:6pt 0;}' +
      'th,td{border:1pt solid #4a5560;padding:4pt 7pt;text-align:left;font-size:10pt;vertical-align:top;}' +
      'th{background:#eef2f7;}' +
      '.meta th,.meta td{border:1pt solid #c8cdd2;}' +
      'ul{margin:4pt 0 4pt 16pt;}' +
      '.tit{background:#1e2a44;color:#fff;text-align:center;font-weight:700;padding:6pt;letter-spacing:1pt;text-transform:uppercase;margin:6pt 0;}' +
      '</style></head><body>' +
      '<div style="text-align:center;font-weight:700;font-size:13pt;">' + esc(user.liceoNombre || user.liceoSlug || 'Click&Clase') + '</div>' +
      '<div class="tit">Planificación de Unidad</div>' +
      '<table class="meta">' +
        '<tr><th>Unidad</th><td>' + (u.numero ? ('N° ' + esc(u.numero) + ' · ') : '') + esc(u.titulo || '') + '</td><th>Módulo / Asignatura</th><td>' + esc(u.asignatura || '—') + '</td></tr>' +
        '<tr><th>Nivel</th><td>' + esc(u.nivel || '—') + '</td><th>Curso</th><td>' + esc(u.curso || '—') + '</td></tr>' +
        '<tr><th>Duración</th><td>' + esc(dur) + '</td><th>Docente</th><td>' + esc(user.nombre || user.email || '—') + '</td></tr>' +
      '</table>' +
      '<h2>Aprendizajes esperados (OA / AE)</h2>' + li(u.aprendizajes) +
      '<h2>Criterios de evaluación</h2>' + li(u.criterios) +
      (u.oag && u.oag.length ? ('<h2>Aprendizajes genéricos (OAG)</h2>' + li(u.oag)) : '') +
      '<h2>Contenidos / temas</h2><p>' + txt(u.contenidos) + '</p>' +
      '<h2>Actividades clave</h2><p>' + txt(u.actividades) + '</p>' +
      '<h2>Evaluaciones</h2><table><tr><th>Tipo</th><th>Instrumento</th><th>Fecha</th></tr>' + evalRows + '</table>' +
      '<h2>Clases planificadas</h2><table><tr><th>Fecha</th><th>Clase</th><th>Horas</th></tr>' + clasesRows + '</table>' +
      '<p style="margin-top:16pt;font-size:8.5pt;color:#888;text-align:right;">Generado con Click&Clase · ' + new Date().toLocaleDateString('es-CL') + '</p>' +
      '</body></html>';
    try {
      var blob = new Blob(['﻿', html], { type: 'application/msword' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = ('Unidad-' + (u.numero || '') + '-' + (u.titulo || 'unidad'))
        .replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') + '.doc';
      document.body.appendChild(a); a.click();
      setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(a.href); }, 500);
      if (typeof showToast === 'function') showToast('Planificación descargada en Word (.doc).', 'success');
    } catch (e) {
      alert('No se pudo exportar: ' + (e && e.message));
    }
  }

  // ---- Generar clases automáticamente desde una unidad -------------------
  function _addDias(fechaYMD, n) {
    var d = fechaYMD ? new Date(fechaYMD + 'T00:00:00') : new Date();
    if (isNaN(d.getTime())) d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  function _modalGenerarClases(uid) {
    var u = (_cache || []).filter(function (x) { return x.id === uid; })[0];
    if (!u) return;
    var yaTiene = (_clasesByU[uid] || []).length;
    var nDef = parseInt(u.semanas, 10) || 4;
    var hDef = (parseInt(u.horas, 10) && nDef) ? Math.max(1, Math.round(parseInt(u.horas, 10) / nDef)) : (parseInt(u.horas, 10) || 2);
    var iniDef = u.fechaInicio || new Date().toISOString().slice(0, 10);
    var ov = document.createElement('div');
    ov.id = 'cu-gen-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px';
    ov.innerHTML =
      '<div style="background:#fff;border-radius:14px;max-width:440px;width:100%;padding:20px 22px;box-shadow:0 20px 50px rgba(0,0,0,.3)">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">' +
          '<h3 style="margin:0;font-size:1.1rem;color:#0f172a">⚡ Generar clases</h3>' +
          '<button id="cu-gen-x" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b">✕</button>' +
        '</div>' +
        '<p style="margin:0 0 12px;font-size:.85rem;color:#64748b">Unidad <b>' + _esc(u.titulo || '') + '</b> · ' + _esc(u.asignatura || '') + (u.nivel ? ' · ' + _esc(u.nivel) : '') + '</p>' +
        (yaTiene ? '<div style="background:#fef9c3;border:1px solid #fde68a;color:#854d0e;border-radius:8px;padding:7px 10px;font-size:.8rem;margin-bottom:10px">Esta unidad ya tiene ' + yaTiene + ' clase(s). Las nuevas se agregarán, no reemplazan.</div>' : '') +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
          '<div><label style="' + LB + '">N° de clases</label><input id="cu-gen-n" type="number" min="1" max="60" value="' + nDef + '" style="' + IN + '"></div>' +
          '<div><label style="' + LB + '">Horas por clase</label><input id="cu-gen-h" type="number" min="1" value="' + hDef + '" style="' + IN + '"></div>' +
          '<div><label style="' + LB + '">Primera clase</label><input id="cu-gen-ini" type="date" value="' + _esc(iniDef) + '" style="' + IN + '"></div>' +
          '<div><label style="' + LB + '">Cada (días)</label><input id="cu-gen-cada" type="number" min="1" value="7" style="' + IN + '"></div>' +
        '</div>' +
        '<p style="font-size:.76rem;color:#94a3b8;margin:8px 0 14px">Se crearán N clases enlazadas a la unidad, con fechas espaciadas y los aprendizajes/criterios de la unidad. Luego puedes editar cada una.</p>' +
        '<div id="cu-gen-msg" style="display:none;font-size:.82rem;margin-bottom:10px"></div>' +
        '<div style="display:flex;justify-content:flex-end;gap:8px">' +
          '<button id="cu-gen-cancel" style="' + BTN + ';background:#f1f5f9;color:#475569;padding:8px 14px">Cancelar</button>' +
          '<button id="cu-gen-ok" style="' + BTN + ';background:#7c3aed;color:#fff;padding:8px 16px;font-weight:700">Generar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    function cerrar() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    ov.addEventListener('click', function (e) { if (e.target === ov) cerrar(); });
    document.getElementById('cu-gen-x').addEventListener('click', cerrar);
    document.getElementById('cu-gen-cancel').addEventListener('click', cerrar);
    document.getElementById('cu-gen-ok').addEventListener('click', function () {
      var n = parseInt(document.getElementById('cu-gen-n').value, 10) || 0;
      var h = document.getElementById('cu-gen-h').value || '';
      var ini = document.getElementById('cu-gen-ini').value || new Date().toISOString().slice(0, 10);
      var cada = parseInt(document.getElementById('cu-gen-cada').value, 10) || 7;
      var msg = document.getElementById('cu-gen-msg');
      if (n < 1 || n > 60) { msg.style.display = 'block'; msg.style.color = '#b91c1c'; msg.textContent = 'Indica entre 1 y 60 clases.'; return; }
      var btnOk = document.getElementById('cu-gen-ok');
      btnOk.disabled = true; btnOk.textContent = 'Generando…';
      _generarClases(u, n, h, ini, cada).then(function (creadas) {
        cerrar();
        if (typeof showToast === 'function') showToast('Se generaron ' + creadas + ' clases para la unidad.', 'success');
        _renderLista();
      }).catch(function (e) {
        btnOk.disabled = false; btnOk.textContent = 'Generar';
        msg.style.display = 'block'; msg.style.color = '#b91c1c'; msg.textContent = 'Error: ' + (e && e.message);
      });
    });
  }

  function _generarClases(u, n, horas, iniYMD, cadaDias) {
    if (!(window.ELDB && ELDB.planificaciones && ELDB.planificaciones.guardar)) {
      return Promise.reject(new Error('ELDB.planificaciones no disponible'));
    }
    var user = _user();
    var asigId = u.asignaturaId || u.asignatura || '';
    var esMod = typeof asigId === 'string' && asigId.indexOf('mod:') === 0;
    var modId = esMod ? asigId.split(':')[2] : '';
    var esp = esMod ? asigId.split(':')[1] : (u.especialidad || (user.especialidades && user.especialidades[0]) || '');
    var asigLabel = u.asignatura || '';
    var nivelVal = u.nivelId || u.nivel || '';
    var apr = (u.aprendizajes || []);
    var cri = (u.criterios || []);
    var aprHtml = apr.length ? '<h3>Aprendizajes (de la unidad)</h3><ul>' + apr.map(function (t) { return '<li>' + _esc(t) + '</li>'; }).join('') + '</ul>' : '';
    var criHtml = cri.length ? '<h3>Criterios de evaluación</h3><ul>' + cri.map(function (t) { return '<li>' + _esc(t) + '</li>'; }).join('') + '</ul>' : '';
    var tasks = [];
    for (var i = 0; i < n; i++) {
      (function (idx) {
        var fechaYMD = _addDias(iniYMD, cadaDias * idx);
        var fechaISO = new Date(fechaYMD + 'T00:00:00').toISOString();
        var titulo = 'Clase ' + (idx + 1) + ' — ' + (u.titulo || 'Unidad');
        var cursoLabel = u.nivel || nivelVal || '';
        var contenido =
          '<h2>' + _esc(titulo) + '</h2>' +
          '<p><strong>Unidad:</strong> ' + _esc(u.titulo || '') + (u.numero ? ' (N° ' + _esc(u.numero) + ')' : '') +
          ' | <strong>' + (esMod ? 'Módulo' : 'Asignatura') + ':</strong> ' + _esc(asigLabel) +
          (cursoLabel ? ' | <strong>Nivel:</strong> ' + _esc(cursoLabel) : '') +
          (horas ? ' | <strong>Horas:</strong> ' + _esc(horas) : '') + '</p>' +
          aprHtml + criHtml +
          '<p style="color:#64748b"><em>Clase generada automáticamente desde la unidad. Edítala para completar inicio/desarrollo/cierre, actividades y evaluación.</em></p>';
        var entrada = {
          id: 'plan_' + Date.now() + '_' + idx,
          tipo: 'planificacion',
          titulo: titulo,
          modulo: modId,
          asignatura: asigLabel,
          nivel: nivelVal,
          curso: u.curso || '',
          fecha: fechaISO,
          fechaClase: fechaISO,
          profesor: user.nombre || user.email || '—',
          horas: String(horas || ''),
          unidadId: u.id,
          unidadNombre: (u.numero ? 'Unidad ' + u.numero + ' · ' : '') + (u.titulo || ''),
          descripcion: asigLabel + (cursoLabel ? ' — ' + cursoLabel : '') + ' — ' + (horas ? horas + ' horas' : '') + ' · desde unidad',
          contenido: contenido,
          uid: user.uid || '',
          email: user.email || '',
          especialidad: esp || '',
          tipoProfesor: user.tipoProfesor || '',
          autogenerada: true
        };
        var p = ELDB.planificaciones.guardar(entrada).then(function (saved) {
          try {
            var planId = (saved && saved.id) || entrada.id;
            if (user.uid && ELDB.calendario && ELDB.calendario.upsertDesdeOrigen) {
              ELDB.calendario.upsertDesdeOrigen({
                uid: user.uid, origenTipo: 'planificacion', origenId: planId,
                titulo: titulo, fecha: fechaYMD, tipo: 'planificacion',
                asignatura: asigLabel || modId || '',
                descripcion: 'Clase de unidad · ' + (cursoLabel || '') + (horas ? ' · ' + horas + ' h' : ''),
                email: user.email || ''
              });
            }
          } catch (e) { /* no-fatal */ }
          return saved;
        });
        tasks.push(p);
      })(i);
    }
    return Promise.all(tasks).then(function (r) { return r.length; });
  }

  function _cargarBorrador(u) {
    var evs = Array.isArray(u.evaluaciones) ? u.evaluaciones.slice()
            : (u.evaluacion && (u.evaluacion.tipo || u.evaluacion.instrumento || u.evaluacion.fecha)) ? [u.evaluacion] : [];
    return {
      titulo: u.titulo || '', numero: u.numero || '', asignatura: u.asignatura || '', asignaturaId: u.asignaturaId || '', nivel: u.nivel || '', nivelId: u.nivelId || '', curso: u.curso || '',
      semanas: u.semanas || '', fechaInicio: u.fechaInicio || '', fechaFin: u.fechaFin || '', horas: u.horas || '',
      aprendizajes: (u.aprendizajes || []).slice(), criterios: (u.criterios || []).slice(), oag: (u.oag || []).slice(),
      contenidos: u.contenidos || '', actividades: u.actividades || '',
      evaluaciones: evs, _selOA: '', _selAE: ''
    };
  }

  // ── Vista FORMULARIO ─────────────────────────────────────────
  function _renderForm() {
    var b = _box(); if (!b) return;
    if (!_d) _d = _nuevoBorrador();
    // Prefijar asignatura/nivel del usuario si están vacíos y hay datos.
    var u = _user();
    var _areas = _areasDocente();
    // Asignaturas: opciones del docente + "escribir otra".
    var _asigEnLista = _areas.asignaturas.some(function (o) { return o.value === _d.asignaturaId; });
    var _asigOtraSel = !!(_d.asignatura && !_asigEnLista);
    var _asigOpts = _areas.asignaturas.map(function (o) { return '<option value="' + _esc(o.value) + '"' + (_d.asignaturaId === o.value ? ' selected' : '') + '>' + _esc(o.label) + '</option>'; }).join('') +
      '<option value="__otra__"' + (_asigOtraSel ? ' selected' : '') + '>✎ Escribir otra…</option>';
    // Niveles: SOLO los asignados al docente (+ "otro" como escape).
    var _nivLista = _areas.niveles.slice();
    var _nivEnLista = _nivLista.some(function (o) { return o.value === _d.nivelId || o.label === _d.nivel; });
    var _nivOtraSel = !!(_d.nivel && !_nivEnLista);
    var _nivOpts = _nivLista.map(function (o) { return '<option value="' + _esc(o.value) + '"' + ((_d.nivelId === o.value || _d.nivel === o.label) ? ' selected' : '') + '>' + _esc(o.label) + '</option>'; }).join('') +
      '<option value="__otra__"' + (_nivOtraSel ? ' selected' : '') + '>✎ Escribir otro…</option>';
    var _cursoOpts = _areas.cursos.map(function (o) { return '<option value="' + _esc(o.value) + '"' + (_d.curso === o.value ? ' selected' : '') + '>' + _esc(o.label) + '</option>'; }).join('');

    b.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '<h2 style="margin:0;font-size:1.2rem;color:#0f172a">' + (_editId ? '✏️ Editar unidad' : '📝 Nueva unidad') + '</h2>' +
        '<button id="cu-x2" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b">✕</button>' +
      '</div>' +
      '<div id="cu-msg" style="display:none;border-radius:8px;padding:8px 11px;font-size:.85rem;margin-bottom:10px"></div>' +

      '<div style="display:grid;grid-template-columns:' + (_areas.cursos.length ? '1fr 70px 160px' : '1fr 70px') + ';gap:10px">' +
        '<div><label style="' + LB + '">Nombre de la unidad *</label><input id="cu-titulo" style="' + IN + '" value="' + _esc(_d.titulo) + '" placeholder="Ej: Circuitos de conmutación"></div>' +
        '<div><label style="' + LB + '">N°</label><input id="cu-num" type="number" min="1" style="' + IN + '" value="' + _esc(_d.numero) + '"></div>' +
        (_areas.cursos.length ? ('<div><label style="' + LB + '">Curso</label><select id="cu-curso" style="' + IN + '"><option value="">— Curso —</option>' + _cursoOpts + '</select></div>') : '') +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
        '<div><label style="' + LB + '">Asignatura / Módulo</label>' +
          '<select id="cu-asig" style="' + IN + '"><option value="">— Selecciona —</option>' + _asigOpts + '</select>' +
          '<input id="cu-asig-otra" style="' + IN + ';margin-top:5px;display:' + (_asigOtraSel ? 'block' : 'none') + '" placeholder="Escribe la asignatura o módulo" value="' + _esc(_asigOtraSel ? _d.asignatura : '') + '"></div>' +
        '<div><label style="' + LB + '">Nivel</label>' +
          '<select id="cu-nivel" style="' + IN + '"><option value="">— Selecciona —</option>' + _nivOpts + '</select>' +
          '<input id="cu-nivel-otra" style="' + IN + ';margin-top:5px;display:' + (_nivOtraSel ? 'block' : 'none') + '" placeholder="Ej: 3° Medio" value="' + _esc(_nivOtraSel ? _d.nivel : '') + '"></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:84px 84px 1fr 1fr;gap:10px">' +
        '<div><label style="' + LB + '">Semanas</label><input id="cu-sem" type="number" min="0" style="' + IN + '" value="' + _esc(_d.semanas) + '"></div>' +
        '<div><label style="' + LB + '">Horas</label><input id="cu-horas" type="number" min="0" style="' + IN + '" value="' + _esc(_d.horas) + '"></div>' +
        '<div><label style="' + LB + '">Inicio</label><input id="cu-ini" type="date" style="' + IN + '" value="' + _esc(_d.fechaInicio) + '"></div>' +
        '<div><label style="' + LB + '">Término</label><input id="cu-fin" type="date" style="' + IN + '" value="' + _esc(_d.fechaFin) + '"></div>' +
      '</div>' +

      '<div id="cu-cascada"></div>' +

      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
        '<div><label style="' + LB + '">Aprendizajes (OA/AE)</label><div id="cu-ae"></div></div>' +
        '<div><label style="' + LB + '">Criterios de evaluación</label><div id="cu-ce"></div></div>' +
      '</div>' +

      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">' +
        '<div><label style="' + LB + '">Contenidos / temas</label><textarea id="cu-cont" rows="2" style="' + IN + '">' + _esc(_d.contenidos) + '</textarea></div>' +
        '<div><label style="' + LB + '">Actividades clave</label><textarea id="cu-act" rows="2" style="' + IN + '">' + _esc(_d.actividades) + '</textarea></div>' +
      '</div>' +

      '<label style="' + LB + '">Evaluaciones de la unidad</label>' +
      '<div id="cu-evals"></div>' +

      '<div style="display:flex;justify-content:space-between;gap:8px;margin-top:18px">' +
        '<button id="cu-volver" style="' + BTN + ';background:#fff;border:1px solid #cbd5e1;color:#475569">← Volver</button>' +
        '<button id="cu-save" style="' + BTN + ';background:#2563EB;color:#fff">💾 Guardar unidad</button>' +
      '</div>';

    document.getElementById('cu-x2').addEventListener('click', _cerrar);
    document.getElementById('cu-volver').addEventListener('click', _renderLista);
    document.getElementById('cu-save').addEventListener('click', _guardarForm);
    _renderChips();

    document.getElementById('cu-asig').addEventListener('change', function () {
      document.getElementById('cu-asig-otra').style.display = (this.value === '__otra__') ? 'block' : 'none';
      _d._selOA = ''; _d._selAE = ''; _renderCascada();  // recargar cascada del nuevo módulo
    });
    document.getElementById('cu-nivel').addEventListener('change', function () {
      document.getElementById('cu-nivel-otra').style.display = (this.value === '__otra__') ? 'block' : 'none';
    });
    _renderCascada();
    _renderEvals();
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
    var lk = _lookupActual();
    var cur = _curriculoDe(lk.asig, lk.nivel);
    _renderPicker('cu-ae-picker', 'Objetivos y aprendizajes (OA/AE)', cur.oas.concat(cur.aes), _d.aprendizajes);
  }
  function _abrirCurriculoCE() {
    var lk = _lookupActual();
    var cur = _curriculoDe(lk.asig, lk.nivel);
    _renderPicker('cu-ce-picker', 'Criterios de evaluación (CE)', cur.ces, _d.criterios);
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
    var aSel = document.getElementById('cu-asig'), nSel = document.getElementById('cu-nivel');
    var asignatura, asignaturaId, nivel, nivelId;
    if (aSel.value === '__otra__') { asignatura = document.getElementById('cu-asig-otra').value.trim(); asignaturaId = ''; }
    else if (aSel.value) { asignatura = aSel.options[aSel.selectedIndex].text; asignaturaId = aSel.value; }
    else { asignatura = ''; asignaturaId = ''; }
    if (nSel.value === '__otra__') { nivel = document.getElementById('cu-nivel-otra').value.trim(); nivelId = ''; }
    else if (nSel.value) { nivel = nSel.options[nSel.selectedIndex].text; nivelId = nSel.value; }
    else { nivel = ''; nivelId = ''; }
    var cursoEl = document.getElementById('cu-curso');
    // Leer evaluaciones múltiples directamente del DOM (por si falta un change).
    var evs = [];
    var evEl = document.getElementById('cu-evals');
    if (evEl) Array.prototype.forEach.call(evEl.querySelectorAll('.cu-ev-t'), function (t) {
      var i = t.getAttribute('data-i');
      var inst = evEl.querySelector('.cu-ev-i[data-i="' + i + '"]');
      var f = evEl.querySelector('.cu-ev-f[data-i="' + i + '"]');
      var tipo = t.value, instr = inst ? inst.value : '', fe = f ? f.value : '';
      if (tipo || instr || fe) evs.push({ tipo: tipo, instrumento: instr, fecha: fe });
    });
    var datos = {
      tipo: 'unidad',
      titulo: _d.titulo,
      numero: document.getElementById('cu-num').value.trim(),
      asignatura: asignatura,
      asignaturaId: asignaturaId,
      nivel: nivel,
      nivelId: nivelId,
      curso: cursoEl ? cursoEl.value : (_d.curso || ''),
      semanas: document.getElementById('cu-sem').value.trim(),
      horas: document.getElementById('cu-horas').value.trim(),
      fechaInicio: document.getElementById('cu-ini').value,
      fechaFin: document.getElementById('cu-fin').value,
      aprendizajes: _d.aprendizajes.slice(),
      criterios: _d.criterios.slice(),
      oag: _d.oag.slice(),
      contenidos: document.getElementById('cu-cont').value.trim(),
      actividades: document.getElementById('cu-act').value.trim(),
      evaluaciones: evs
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

  // Enlace con planificaciones: cierra el panel de unidades y deja el
  // formulario de planificación de clase con esta unidad pre-seleccionada.
  function _planificarDeUnidad(id) {
    var sel = document.getElementById('selectMiUnidad');
    // Si no estamos en la página de planificación (p. ej. el dashboard), ir a ella con la unidad.
    if (!sel) { window.location.href = 'planificacion.html?unidad=' + encodeURIComponent(id); return; }
    _cerrar();
    poblarSelect('selectMiUnidad', id);
    var ancla = document.getElementById('selectCurso') || document.querySelector('.planificador-header') || document.body;
    try { ancla.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
  }

  function abrir() { _targetId = 'cu-box'; _ensureModal(); document.getElementById('cu-ov').style.display = 'flex'; _renderLista(); }

  // Montar el panel como SECCIÓN FIJA dentro de la página (no modal).
  //   sectionId: contenedor que se muestra/oculta.  contentId: dónde se renderiza.
  function montar(sectionId, contentId, permanente) {
    var sec = document.getElementById(sectionId);
    var cont = document.getElementById(contentId);
    if (!sec || !cont) return;
    _inlineSection = sec;
    _targetId = contentId;
    _inlinePermanente = !!permanente;
    sec.style.display = '';
    _renderLista();
    if (!permanente) { try { sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {} }
  }

  // Abre el formulario de NUEVA unidad ya prellenado con un módulo/asignatura.
  // pref = { asignatura, asignaturaId, nivel, nivelId, curso }
  function nuevaUnidad(pref) {
    pref = pref || {};
    _editId = null;
    _d = _nuevoBorrador();
    if (pref.asignaturaId) _d.asignaturaId = String(pref.asignaturaId);
    if (pref.asignatura)   _d.asignatura   = String(pref.asignatura);
    if (pref.nivel)        _d.nivel        = String(pref.nivel);
    if (pref.nivelId)      _d.nivelId      = String(pref.nivelId);
    if (pref.curso)        _d.curso        = String(pref.curso);
    _renderForm();
    var t = document.getElementById('cu-titulo');
    if (t && t.scrollIntoView) { try { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); t.focus(); } catch (e) {} }
  }

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

  window.CCUnidades = { abrir: abrir, montar: montar, listar: listar, poblarSelect: poblarSelect, nuevaUnidad: nuevaUnidad };
})();
