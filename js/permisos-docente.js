/**
 * permisos-docente.js — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Componente UNIFICADO para asignar clases a un docente. Porta la lógica
 * completa y probada del panel Admin (modalPermProf), en un módulo reutilizable.
 *
 * Asigna: tipo de docente, asignaturas (plan común/básica/media/parvularia),
 * especialidad + mención + módulos TP, niveles, clases (cursos), permisos
 * (planificar/material), formatos PAES/SIMCE, taxonomía Marzano, y las
 * transversales Orientación / Consejo de Curso.
 *
 * Datos de currículum: usa CURRICULA_CHILE (motor estático) →
 *   getAsignaturas(tipo), getEspecialidades(), getModulos(key).
 * El listado de módulos NO depende de la carga async de los 44 datos-*.js;
 * si CURRICULA_FULL está disponible se usan además las menciones.
 *
 * Guarda con ELDB.usuarios.actualizar (update seguro con updateMask — NUNCA
 * set(), para no borrar campos del documento).
 *
 * Requiere en la página: firebase-db.js (ELDB) y curricula-loader.js
 * (que carga curricula-chile.js y expone loadCurriculaTP/CURRICULA_READY).
 *
 * API:  PermisosDocente.abrir(uid, userObj, onSaved?)
 */
(function () {
  'use strict';

  var _uid = null, _onSaved = null;
  var _d = { tipo:'', asignaturas:[], niveles:[], especialidad:'', mencion:'', modulos:[], cursos:[] };

  var NIVELES = {
    parvularia: [['NT1','Pre-Kínder (NT1)'],['NT2','Kínder (NT2)']],
    basica:     [['1B','1°'],['2B','2°'],['3B','3°'],['4B','4°'],['5B','5°'],['6B','6°'],['7B','7°'],['8B','8°']],
    media:      [['1M','1° Medio'],['2M','2° Medio'],['3M','3° Medio'],['4M','4° Medio']],
    tecnico:    [['3M','3° Medio'],['4M','4° Medio']]
  };

  function _cur(){ return (typeof CURRICULA_CHILE !== 'undefined') ? CURRICULA_CHILE : null; }
  function _esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function _toggle(arr,val,on){ var i=arr.indexOf(val); if(on&&i===-1)arr.push(val); else if(!on&&i!==-1)arr.splice(i,1); }

  // ── Modal (se inyecta una sola vez) ──────────────────────────
  function _ensureModal() {
    if (document.getElementById('pd-ov')) return;
    var ov = document.createElement('div');
    ov.id = 'pd-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:2147482000;background:rgba(15,23,42,.5);display:none;align-items:center;justify-content:center;padding:20px;font-family:system-ui,-apple-system,sans-serif';
    ov.innerHTML =
      '<div style="background:#fff;max-width:600px;width:100%;max-height:90vh;overflow:auto;border-radius:16px;box-shadow:0 20px 60px -20px rgba(15,23,42,.5);padding:24px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">' +
          '<h2 style="margin:0;font-size:1.2rem;color:#0f172a">🔑 Asignar clases al docente</h2>' +
          '<button id="pd-x" style="background:none;border:none;font-size:1.3rem;cursor:pointer;color:#64748b">✕</button>' +
        '</div>' +
        '<div id="pd-info" style="background:#f1f5f9;border-radius:8px;padding:9px 12px;font-size:.85rem;margin-bottom:14px;color:#334155"></div>' +
        '<div id="pd-msg" style="display:none;border-radius:8px;padding:9px 12px;font-size:.85rem;margin-bottom:12px"></div>' +
        '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:5px">Tipo de docente</label>' +
        '<select id="pd-tipo" style="width:100%;padding:9px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:.9rem;margin-bottom:14px">' +
          '<option value="">— Seleccionar —</option>' +
          '<option value="parvularia">🧸 Educación Parvularia (NT1/NT2)</option>' +
          '<option value="basica">📚 Educación Básica</option>' +
          '<option value="media">🎓 Plan Común (Media)</option>' +
          '<option value="tecnico">⚙️ Técnico-Profesional (EMTP)</option>' +
        '</select>' +
        '<div id="pd-asig"></div>' +
        '<label style="font-weight:600;font-size:.82rem;display:block;margin:14px 0 5px">📋 Clase(s) asignada(s)</label>' +
        '<input id="pd-cursos" placeholder="ej: 3° Medio A, 4° Medio B" style="width:100%;padding:9px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:.9rem;margin-bottom:14px">' +
        '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:7px">🔐 Permisos</label>' +
        '<div style="display:flex;gap:18px;flex-wrap:wrap;margin-bottom:14px">' +
          '<label style="display:flex;align-items:center;gap:6px;font-size:.85rem;cursor:pointer"><input type="checkbox" id="pd-plan" checked> 📅 Puede planificar</label>' +
          '<label style="display:flex;align-items:center;gap:6px;font-size:.85rem;cursor:pointer"><input type="checkbox" id="pd-mat" checked> 📚 Puede crear material</label>' +
        '</div>' +
        '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:7px">📚 Asignaturas transversales</label>' +
        '<div style="display:flex;flex-direction:column;gap:7px;margin-bottom:14px">' +
          '<label style="display:flex;align-items:center;gap:8px;font-size:.83rem;cursor:pointer;padding:7px 11px;background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.20);border-radius:8px"><input type="checkbox" id="pd-orient"><span>🧭 <strong>Orientación</strong> — puede planificar y dar Orientación.</span></label>' +
          '<label style="display:flex;align-items:center;gap:8px;font-size:.83rem;cursor:pointer;padding:7px 11px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.20);border-radius:8px"><input type="checkbox" id="pd-consejo"><span>📋 <strong>Consejo de Curso</strong> — típicamente profesores jefes.</span></label>' +
        '</div>' +
        '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:7px">🎯 Capacidades pedagógicas avanzadas</label>' +
        '<div style="display:flex;flex-direction:column;gap:7px;margin-bottom:18px">' +
          '<label style="display:flex;align-items:center;gap:8px;font-size:.83rem;cursor:pointer;padding:7px 11px;background:rgba(37,99,235,.06);border:1px solid rgba(37,99,235,.18);border-radius:8px"><input type="checkbox" id="pd-paes"><span>🎓 <strong>Formato PAES</strong></span></label>' +
          '<label style="display:flex;align-items:center;gap:8px;font-size:.83rem;cursor:pointer;padding:7px 11px;background:rgba(74,222,128,.06);border:1px solid rgba(74,222,128,.18);border-radius:8px"><input type="checkbox" id="pd-simce"><span>📊 <strong>Formato SIMCE</strong></span></label>' +
          '<label style="display:flex;align-items:center;gap:8px;font-size:.83rem;cursor:pointer;padding:7px 11px;background:rgba(34,211,238,.06);border:1px solid rgba(34,211,238,.18);border-radius:8px"><input type="checkbox" id="pd-marzano"><span>🧠 <strong>Taxonomía Marzano</strong></span></label>' +
        '</div>' +
        '<div style="display:flex;justify-content:flex-end;gap:8px">' +
          '<button id="pd-cancel" style="background:#fff;border:1px solid #cbd5e1;color:#475569;border-radius:8px;padding:9px 16px;font-weight:600;cursor:pointer">Cancelar</button>' +
          '<button id="pd-save" style="background:#2563EB;border:none;color:#fff;border-radius:8px;padding:9px 20px;font-weight:700;cursor:pointer">💾 Guardar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    document.getElementById('pd-x').addEventListener('click', _cerrar);
    document.getElementById('pd-cancel').addEventListener('click', _cerrar);
    document.getElementById('pd-tipo').addEventListener('change', function(){ _d.tipo=this.value; _d.especialidad=''; _d.mencion=''; _d.modulos=[]; _buildAsig(); });
    document.getElementById('pd-save').addEventListener('click', _guardar);
    ov.addEventListener('click', function(e){ if(e.target===ov) _cerrar(); });
  }

  function _cerrar(){ var ov=document.getElementById('pd-ov'); if(ov) ov.style.display='none'; }
  function _msg(txt, ok){ var m=document.getElementById('pd-msg'); m.style.display='block'; m.style.background=ok?'#dcfce7':'#fee2e2'; m.style.color=ok?'#166534':'#991b1b'; m.textContent=txt; }

  // ── Sección de asignaturas / especialidad según tipo ─────────
  function _buildAsig() {
    var sec = document.getElementById('pd-asig');
    var cur = _cur();
    var t = _d.tipo;
    if (!t) { sec.innerHTML = '<p style="color:#64748b;font-size:.85rem">Elige un tipo de docente para ver las opciones.</p>'; return; }

    // Necesitamos el motor de currículum. Si aún no cargó, esperamos y reintentamos.
    if (!(cur && cur.getEspecialidades) && window.CURRICULA_READY) {
      sec.innerHTML = '<p style="color:#64748b;font-size:.85rem">⏳ Cargando currículum…</p>';
      window.CURRICULA_READY.then(function(){ _buildAsig(); });
      return;
    }
    if (!cur) { sec.innerHTML = '<p style="color:#b45309;font-size:.83rem">⚠ No se pudo cargar el currículum. Verifica que la página incluya curricula-loader.js.</p>'; return; }

    var html = '';
    if (t === 'tecnico') {
      html += '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:5px">Especialidad EMTP</label>';
      html += '<select id="pd-esp" style="width:100%;padding:9px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:.9rem;margin-bottom:12px"><option value="">— Selecciona —</option>' + _especialidadOptions(_d.especialidad) + '</select>';
      html += '<div id="pd-mods"></div>';
    } else {
      var asigs = (cur.getAsignaturas ? cur.getAsignaturas(t) : []) || [];
      html += '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:6px">Asignaturas</label>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">';
      asigs.forEach(function(a){
        var nom = a.nombre || a;
        var on = _d.asignaturas.indexOf(nom) !== -1;
        html += '<label style="display:inline-flex;align-items:center;gap:5px;font-size:.82rem;background:'+(on?'#dbeafe':'#f8fafc')+';border:1px solid '+(on?'#93c5fd':'#e2e8f0')+';border-radius:8px;padding:5px 9px;cursor:pointer">'+
          '<input type="checkbox" class="pd-a" value="'+_esc(nom)+'"'+(on?' checked':'')+'>'+_esc(nom)+'</label>';
      });
      if (!asigs.length) html += '<span style="color:#b45309;font-size:.82rem">No hay asignaturas para este nivel.</span>';
      html += '</div>';
    }

    // Niveles
    var nivs = NIVELES[t] || [];
    if (nivs.length) {
      html += '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:6px">Niveles</label><div style="display:flex;flex-wrap:wrap;gap:6px">';
      nivs.forEach(function(p){
        var on = _d.niveles.indexOf(p[0]) !== -1;
        html += '<label style="display:inline-flex;align-items:center;gap:5px;font-size:.82rem;background:'+(on?'#dbeafe':'#f8fafc')+';border:1px solid '+(on?'#93c5fd':'#e2e8f0')+';border-radius:8px;padding:5px 9px;cursor:pointer">'+
          '<input type="checkbox" class="pd-n" value="'+p[0]+'"'+(on?' checked':'')+'>'+_esc(p[1])+'</label>';
      });
      html += '</div>';
    }
    sec.innerHTML = html;

    Array.prototype.forEach.call(sec.querySelectorAll('.pd-a'), function(cb){ cb.addEventListener('change', function(){ _toggle(_d.asignaturas, cb.value, cb.checked); }); });
    Array.prototype.forEach.call(sec.querySelectorAll('.pd-n'), function(cb){ cb.addEventListener('change', function(){ _toggle(_d.niveles, cb.value, cb.checked); }); });
    var espSel = document.getElementById('pd-esp');
    if (espSel) {
      espSel.addEventListener('change', function(){ if(this.value!==_d.especialidad){ _d.especialidad=this.value; _d.mencion=''; _d.modulos=[]; } _buildMods(); });
      if (_d.especialidad) _buildMods();
    }
  }

  // <optgroup> de especialidades agrupadas por sector (igual que el admin).
  function _especialidadOptions(selKey) {
    var cur = _cur();
    var esps = (cur && cur.getEspecialidades) ? (cur.getEspecialidades() || []) : [];
    esps = esps.filter(function(e){ return e.key !== 'construccion'; });
    var bySec = {};
    esps.forEach(function(e){ var s=e.sector||'Otros'; (bySec[s]=bySec[s]||[]).push(e); });
    var html = '';
    Object.keys(bySec).sort(function(a,b){ return a.localeCompare(b,'es'); }).forEach(function(sec){
      html += '<optgroup label="✨ '+_esc(sec)+'">';
      bySec[sec].sort(function(a,b){ return a.nombre.localeCompare(b.nombre,'es'); }).forEach(function(e){
        html += '<option value="'+_esc(e.key)+'"'+(selKey===e.key?' selected':'')+'>'+_esc(e.nombre)+'</option>';
      });
      html += '</optgroup>';
    });
    return html;
  }

  // Módulos (con menciones si CURRICULA_FULL está cargado). Igual que _renderModsUI del admin.
  function _buildMods() {
    var box = document.getElementById('pd-mods');
    if (!box) return;
    var cur = _cur();
    var key = _d.especialidad;
    if (!key) { box.innerHTML = ''; return; }

    var data = (window.CURRICULA_FULL && window.CURRICULA_FULL[key]) || null;
    var menciones = (data && data.menciones) || null;
    var html = '';
    if (menciones && menciones.length) {
      if (!_d.mencion || menciones.indexOf(_d.mencion) === -1) _d.mencion = menciones[0];
      html += '<label style="font-weight:600;font-size:.82rem;display:block;margin-bottom:5px">Mención</label>';
      html += '<select id="pd-menc" style="width:100%;padding:9px 11px;border:1px solid #cbd5e1;border-radius:8px;font-size:.9rem;margin-bottom:10px">';
      menciones.forEach(function(mn){ html += '<option value="'+_esc(mn)+'"'+(mn===_d.mencion?' selected':'')+'>'+_esc(mn)+'</option>'; });
      html += '</select>';
    } else { _d.mencion = ''; }

    // Módulos: preferir CURRICULA_FULL; fallback al catálogo estático getModulos().
    var out = [];
    if (data && data.modulos) {
      Object.keys(data.modulos).forEach(function(mk){
        var m = data.modulos[mk];
        if (_d.mencion && m.mencion && m.mencion !== _d.mencion) return;
        out.push(m);
      });
    }
    if (!out.length && cur && cur.getModulos) out = cur.getModulos(key) || [];

    html += '<label style="font-weight:600;font-size:.82rem;display:block;margin:4px 0 6px">Módulos</label><div style="display:flex;flex-direction:column;gap:5px;margin-bottom:12px">';
    if (!out.length) {
      html += '<span style="color:#b45309;font-size:.82rem">No se encontraron módulos para esta especialidad.</span>';
    } else {
      out.forEach(function(m){
        var num = m.num || m.id;
        var on = _d.modulos.indexOf(num) !== -1;
        html += '<label style="display:flex;align-items:center;gap:7px;font-size:.82rem;background:'+(on?'#dbeafe':'#f8fafc')+';border:1px solid '+(on?'#93c5fd':'#e2e8f0')+';border-radius:8px;padding:6px 10px;cursor:pointer">'+
          '<input type="checkbox" class="pd-m" value="'+_esc(num)+'"'+(on?' checked':'')+'><span>'+_esc(num)+' – '+_esc(m.nombre)+(m.nivel?' · '+_esc(m.nivel):'')+'</span></label>';
      });
    }
    html += '</div>';
    box.innerHTML = html;

    var mencSel = document.getElementById('pd-menc');
    if (mencSel) mencSel.addEventListener('change', function(){ _d.mencion=this.value; _d.modulos=[]; _buildMods(); });
    Array.prototype.forEach.call(box.querySelectorAll('.pd-m'), function(cb){ cb.addEventListener('change', function(){ _toggle(_d.modulos, cb.value, cb.checked); }); });
  }

  // ── Guardar (update seguro; mismo modelo de datos que admin) ──
  function _guardar() {
    if (!_uid) return;
    if (typeof ELDB === 'undefined' || !ELDB.usuarios || !ELDB.usuarios.actualizar) { _msg('No se pudo guardar: ELDB.usuarios no disponible.', false); return; }
    var btn = document.getElementById('pd-save');
    btn.disabled = true; btn.textContent = 'Guardando…';

    var esTP = _d.tipo === 'tecnico';
    var cursos = document.getElementById('pd-cursos').value.split(',').map(function(s){return s.trim();}).filter(Boolean);
    var niveles = _d.niveles.slice();
    if (_d.tipo !== 'parvularia') niveles = niveles.filter(function(n){ return n!=='NT1' && n!=='NT2'; });

    var asigsClean = esTP ? [] : _d.asignaturas.slice();
    var espClean   = esTP ? _d.especialidad : '';
    var mencClean  = esTP ? _d.mencion : '';
    var modsClean  = esTP ? _d.modulos.slice() : [];

    var datos = {
      tipoProfesor:   _d.tipo,
      asignaturas:    asigsClean,
      niveles:        niveles,
      especialidad:   espClean,
      especialidades: espClean ? [espClean] : [],
      mencion:        mencClean,
      modulos:        modsClean,
      modulosTP:      espClean ? (function(){ var m={}; m[espClean]=modsClean; return m; })() : {},
      cursos:         cursos,
      permisos: {
        planificar:    document.getElementById('pd-plan').checked,
        crearMaterial: document.getElementById('pd-mat').checked
      },
      formatoPAES:      document.getElementById('pd-paes').checked,
      formatoSIMCE:     document.getElementById('pd-simce').checked,
      taxonomiaMarzano: document.getElementById('pd-marzano').checked,
      puedeOrientacion:  document.getElementById('pd-orient').checked,
      puedeConsejoCurso: document.getElementById('pd-consejo').checked
    };

    ELDB.usuarios.actualizar(_uid, datos)
      .then(function(){
        _msg('✅ Asignación guardada correctamente.', true);
        if (typeof _onSaved === 'function') { try { _onSaved(_uid, datos); } catch(e){} }
        setTimeout(_cerrar, 1200);
      })
      .catch(function(e){ _msg('❌ Error: ' + (e && e.message ? e.message : e), false); })
      .then(function(){ btn.disabled=false; btn.textContent='💾 Guardar'; });
  }

  function abrir(uid, u, onSaved) {
    u = u || {};
    _uid = uid; _onSaved = onSaved || null;
    _d = {
      tipo:         u.tipoProfesor || '',
      asignaturas:  (u.asignaturas || []).slice(),
      niveles:      (u.niveles || []).slice(),
      especialidad: u.especialidad || (u.especialidades && u.especialidades[0]) || '',
      mencion:      u.mencion || '',
      modulos:      (u.modulos || []).slice(),
      cursos:       (u.cursos || []).slice()
    };
    _ensureModal();
    // Precargar datos TP completos (menciones) en segundo plano; no bloquea.
    if (typeof window.loadCurriculaTP === 'function') { try { window.loadCurriculaTP(); } catch(e){} }
    document.getElementById('pd-info').innerHTML = '<strong>'+_esc(u.nombre||'Sin nombre')+'</strong> · '+_esc(u.email||'');
    document.getElementById('pd-msg').style.display = 'none';
    document.getElementById('pd-tipo').value = _d.tipo;
    document.getElementById('pd-cursos').value = (_d.cursos||[]).join(', ');
    document.getElementById('pd-plan').checked = u.permisos ? u.permisos.planificar !== false : true;
    document.getElementById('pd-mat').checked  = u.permisos ? u.permisos.crearMaterial !== false : true;
    document.getElementById('pd-orient').checked  = !!u.puedeOrientacion;
    document.getElementById('pd-consejo').checked = !!u.puedeConsejoCurso;
    document.getElementById('pd-paes').checked    = !!u.formatoPAES;
    document.getElementById('pd-simce').checked   = !!u.formatoSIMCE;
    document.getElementById('pd-marzano').checked = !!u.taxonomiaMarzano;
    _buildAsig();
    document.getElementById('pd-ov').style.display = 'flex';
  }

  window.PermisosDocente = { abrir: abrir };
})();
