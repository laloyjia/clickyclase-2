/* ════════════════════════════════════════════════════════════════════
 *  material-biblioteca.js — Click&Clase
 *  - guardarEnBiblioteca / mostrarSaveMsg: publica el documento generado
 *    en Firestore (colección materiales) con fallback a localStorage, y
 *    agenda evento en el calendario del docente cuando aplica.
 *  - _filterOAs / _clearOASearch: buscador del listado de OAs Mineduc.
 *
 *  Las funciones quedan en window scope; dependen de variables globales
 *  (_matUser, tipoDocSeleccionado, showToast, CURRICULA_CHILE, MODULOS,
 *  ELAuth, ELDB, ELUI) que el resto de material.html provee.
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // =============================================
  // MODAL DE VISIBILIDAD (Fase 10)
  // =============================================
  function _pedirVisibilidad() {
    return new Promise(function (resolve) {
      // Si ya existe, lo removemos
      var prev = document.getElementById('modalVisibilidad');
      if (prev) prev.remove();

      var wrap = document.createElement('div');
      wrap.id = 'modalVisibilidad';
      wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
      wrap.innerHTML =
        '<div style="background:#151b35;border:1px solid rgba(148,163,184,.22);border-radius:20px;max-width:520px;width:100%;padding:32px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:Inter,system-ui,sans-serif;color:#f1f5f9">' +
          '<div style="font-size:1.35rem;font-weight:800;margin-bottom:6px">📢 ¿Con quién compartís este material?</div>' +
          '<div style="color:#94a3b8;font-size:.9rem;margin-bottom:22px">Podés elegir el nivel de visibilidad. Los directivos y UTP siempre pueden verlo.</div>' +
          '<div id="visOpciones" style="display:flex;flex-direction:column;gap:10px">' +
            _opcionVisibilidad('liceo',        '🏫', 'Todo el colegio',   'Cualquier docente del liceo puede verlo. Ideal para material terminado y aprobado.', true) +
            _opcionVisibilidad('departamento', '👥', 'Mi departamento',    'Solo profesores de tu misma asignatura/especialidad. Perfecto para materiales por área.', false) +
            _opcionVisibilidad('privada',      '🔒', 'Solo yo (borrador)', 'Nadie más lo ve. Útil para borradores en proceso. Podés cambiarlo después.', false) +
          '</div>' +
          '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">' +
            '<button id="visCancel" style="padding:10px 18px;background:transparent;border:1px solid rgba(148,163,184,.3);color:#cbd5e1;border-radius:10px;cursor:pointer;font-weight:600">Cancelar</button>' +
            '<button id="visOk" style="padding:10px 20px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:700">💾 Publicar</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(wrap);

      // Bind selección
      var opciones = wrap.querySelectorAll('[data-vis]');
      opciones.forEach(function (op) {
        op.addEventListener('click', function () {
          opciones.forEach(function (o) {
            o.style.background = 'rgba(255,255,255,.03)';
            o.style.borderColor = 'rgba(148,163,184,.15)';
          });
          op.style.background = 'rgba(139,92,246,.12)';
          op.style.borderColor = '#8b5cf6';
          op.dataset.selected = 'true';
        });
      });

      // Bind botones
      wrap.querySelector('#visCancel').addEventListener('click', function () { wrap.remove(); resolve(null); });
      wrap.querySelector('#visOk').addEventListener('click', function () {
        var sel = wrap.querySelector('[data-selected="true"]');
        var vis = sel ? sel.getAttribute('data-vis') : 'liceo';
        wrap.remove(); resolve(vis);
      });
    });
  }

  function _opcionVisibilidad(id, ico, titulo, sub, seleccionada) {
    return '<div data-vis="' + id + '"' + (seleccionada ? ' data-selected="true"' : '') +
      ' style="padding:14px 16px;background:' + (seleccionada ? 'rgba(139,92,246,.12)' : 'rgba(255,255,255,.03)') +
      ';border:1px solid ' + (seleccionada ? '#8b5cf6' : 'rgba(148,163,184,.15)') +
      ';border-radius:12px;cursor:pointer;transition:all .15s;display:flex;gap:14px;align-items:flex-start">' +
        '<div style="font-size:1.4rem">' + ico + '</div>' +
        '<div style="flex:1"><div style="font-weight:700;font-size:.98rem;margin-bottom:2px">' + titulo + '</div>' +
        '<div style="color:#94a3b8;font-size:.82rem;line-height:1.4">' + sub + '</div></div>' +
      '</div>';
  }

  // =============================================
  // GUARDAR EN BIBLIOTECA
  // =============================================
  function guardarEnBiblioteca() {
    var preview = document.getElementById('docPreview');
    if (!preview || !preview.innerHTML.trim()) {
      mostrarSaveMsg('⚠️ Primero genera un documento.', '#f59e0b'); return;
    }
    var currentUserData = (typeof _matUser !== 'undefined' && _matUser) || (window.ELAuth && ELAuth.user) || null;
    if (!currentUserData || !currentUserData.uid) {
      mostrarSaveMsg('⚠️ Debes iniciar sesión para publicar.', '#f59e0b');
      return;
    }

    // Fase 10: pedir visibilidad antes de guardar
    _pedirVisibilidad().then(function (visibilidad) {
      if (!visibilidad) { mostrarSaveMsg('Cancelado.', '#94a3b8'); return; }
      _hacerGuardar(preview, currentUserData, visibilidad);
    });
  }

  function _hacerGuardar(preview, currentUserData, visibilidad) {
    var selMod = document.getElementById('selectModulo');
    var selAE  = document.getElementById('selectAE');
    var selOA  = document.getElementById('selectOA');
    var selCur = document.getElementById('selectCurso');
    var inProf = document.getElementById('inputProfesor');
    var modId   = selMod ? selMod.value : '';
    var aeNum   = selAE ? selAE.value : '';
    var oaId    = selOA ? selOA.value : '';
    var curso   = selCur ? selCur.value : '';
    var prof    = (inProf && inProf.value) || currentUserData.nombre || currentUserData.name || '—';
    var tipo    = (typeof tipoDocSeleccionado !== 'undefined' && tipoDocSeleccionado) || 'guia';
    var tipos   = {guia:'Guía de Aprendizaje',apunte:'Apunte de Clase',evaluacion:'Guía de Ejercicios',prueba:'Prueba Formal',control:'Control Rápido'};
    var _modsRef = (typeof getCurriculaModulos === 'function')
      ? getCurriculaModulos((document.getElementById('selectEspecialidad') ? document.getElementById('selectEspecialidad').value : '') || '')
      : (typeof MODULOS !== 'undefined' ? MODULOS : {});
    var modNom  = modId && _modsRef[modId] ? _modsRef[modId].nombre : modId;
    var titulo  = (tipos[tipo]||tipo) + ' — ' + (modNom||modId) + (aeNum ? ' · AE' + aeNum : '');

    var entrada = {
      id:          'mat_' + Date.now(),
      tipo:        tipo,
      titulo:      titulo,
      modulo:      modId,
      ae:          aeNum,
      oa:          oaId,
      curso:       typeof CURRICULA_CHILE !== 'undefined' ? CURRICULA_CHILE.getNivelLabel(curso) : curso,
      nivel:       curso,
      profesor:    prof,
      fecha:       new Date().toISOString(),
      contenido:   preview.innerHTML,
      descripcion: (modNom||modId) + (aeNum ? ' · AE' + aeNum : '') + (oaId ? ' · ' + oaId : '')
    };

    var isTPGuardar = currentUserData.tipoProfesor === 'tecnico';
    var asigGuardar = isTPGuardar
      ? (currentUserData.especialidad || '')
      : (document.getElementById('selectAsignatura') ? document.getElementById('selectAsignatura').value : (currentUserData.asignaturas && currentUserData.asignaturas[0]) || '');
    var electivoHCGuardar = isTPGuardar
      ? ''
      : (document.getElementById('selectElectivoHC') ? document.getElementById('selectElectivoHC').value : '');
    Object.assign(entrada, {
      uid:          currentUserData.uid || '',
      autorUid:     currentUserData.uid || '',
      autorNombre:  currentUserData.nombre || currentUserData.name || currentUserData.email || '',
      email:        currentUserData.email || '',
      liceoSlug:    currentUserData.liceoSlug || '',
      asignatura:   asigGuardar,
      electivoHC:   electivoHCGuardar || '',
      especialidad: currentUserData.especialidad || '',
      tipoProfesor: currentUserData.tipoProfesor || '',
      // Fase 10: departamento (grupo del material) + visibilidad
      departamento: (currentUserData.especialidad || asigGuardar || 'general').toString().toLowerCase().trim(),
      visibilidad:  visibilidad
    });

    var guardarPromesa;
    if (window.ELDB && typeof ELDB.materiales !== 'undefined') {
      guardarPromesa = ELDB.materiales.guardar(entrada);
    } else {
      var mats = JSON.parse(localStorage.getItem('electrolearn_materiales') || '[]');
      mats.push(entrada);
      localStorage.setItem('electrolearn_materiales', JSON.stringify(mats));
      guardarPromesa = Promise.resolve(entrada);
    }

    guardarPromesa
      .then(function (saved) {
        var esEvaluable = (entrada.tipo === 'prueba' || entrada.tipo === 'evaluacion' || entrada.tipo === 'control');
        var msgExtra = '';
        if (esEvaluable) {
          try {
            var matId = (saved && saved.id) || entrada.id;
            if (currentUserData.uid && window.ELDB && ELDB.calendario && ELDB.calendario.upsertDesdeOrigen) {
              var d7 = new Date(); d7.setDate(d7.getDate() + 7);
              var fechaDefault = d7.toISOString().slice(0, 10);
              ELDB.calendario.upsertDesdeOrigen({
                uid:         currentUserData.uid,
                origenTipo:  'material',
                origenId:    matId,
                titulo:      entrada.titulo || (entrada.tipo + ' · ' + (entrada.asignatura || '')),
                fecha:       fechaDefault,
                tipo:        entrada.tipo,
                asignatura:  entrada.asignatura || entrada.modulo || '',
                descripcion: (entrada.descripcion || '') + ' (Fecha tentativa — edítala desde el calendario)',
                email:       currentUserData.email || ''
              });
              msgExtra = ' Agendada en tu calendario para ' + fechaDefault + '.';
            }
          } catch (eCal) { console.warn('[Click&Clase] No se pudo agendar en calendario:', eCal); }
        }
        mostrarSaveMsg('✅ Publicado en la Biblioteca.' + msgExtra + ' <a href="biblioteca.html" style="color:#a5b4fc;margin-left:6px;">Ver biblioteca →</a>' + (esEvaluable ? ' <a href="dashboard-profesor.html#calendario" style="color:#a5b4fc;margin-left:6px;">Ver calendario →</a>' : ''), '#34d399');
        if (typeof showToast === 'function') showToast('Material publicado ✓', 'success');
        try { if (typeof ELDB !== 'undefined' && ELDB.actividad) ELDB.actividad.log('publicar_biblioteca', { titulo: (entrada && entrada.titulo) || '', tipo: (entrada && entrada.tipo) || tipoDocSeleccionado }); } catch (e) {}
        if (window.ELUI && ELUI.confetti) { try { ELUI.confetti({ amount: 80 }); } catch (e) {} }
      })
      .catch(function (err) {
        console.warn('[Click&Clase] Firebase no disponible, guardando localmente:', err);
        try {
          var mats = JSON.parse(localStorage.getItem('electrolearn_materiales') || '[]');
          mats.push(entrada);
          localStorage.setItem('electrolearn_materiales', JSON.stringify(mats));
        } catch (e) {}
        mostrarSaveMsg('✅ Publicado localmente. <a href="biblioteca.html" style="color:#a5b4fc;margin-left:6px;">Ver biblioteca →</a>', '#34d399');
        if (typeof showToast === 'function') showToast('Publicado localmente.', 'info');
      });
  }

  function mostrarSaveMsg(html, color) {
    var el = document.getElementById('saveMsg');
    if (!el) return;
    el.innerHTML = html;
    el.style.display = 'block';
    el.style.background = color + '18';
    el.style.border = '1px solid ' + color + '44';
    el.style.color = color;
    setTimeout(function () { el.style.display = 'none'; }, 8000);
  }

  // =========================================================
  //  BUSCADOR DE OAs (filtra dinámicamente la lista de OA Mineduc)
  // =========================================================
  function _filterOAs(query) {
    var q = (query || '').trim().toLowerCase();
    var lista = document.getElementById('listaOAMineduc');
    var info = document.getElementById('oaSearchInfo');
    var clearBtn = document.getElementById('oaSearchClear');
    if (!lista) return;

    var labels = lista.querySelectorAll('label');
    if (!labels.length) {
      if (info) info.style.display = 'none';
      return;
    }

    if (!q) {
      for (var i = 0; i < labels.length; i++) labels[i].style.display = '';
      if (info) info.style.display = 'none';
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }

    var visible = 0;
    var checkedHidden = 0;
    for (var j = 0; j < labels.length; j++) {
      var label = labels[j];
      var txt = label.textContent.toLowerCase();
      var inp = label.querySelector('.oaRegCheck');
      var desc = inp ? (inp.getAttribute('data-desc') || '').toLowerCase() : '';
      var match = txt.indexOf(q) !== -1 || desc.indexOf(q) !== -1;
      if (match) {
        label.style.display = '';
        visible++;
      } else {
        label.style.display = 'none';
        if (inp && inp.checked) checkedHidden++;
      }
    }
    if (info) {
      info.style.display = 'block';
      var msg = visible + ' OA' + (visible !== 1 ? 's' : '') + ' coincide' + (visible !== 1 ? 'n' : '') + ' con "' + q + '"';
      if (checkedHidden > 0) msg += ' · ⚠ ' + checkedHidden + ' OA' + (checkedHidden > 1 ? 's' : '') + ' marcado' + (checkedHidden > 1 ? 's' : '') + ' está' + (checkedHidden > 1 ? 'n' : '') + ' oculto' + (checkedHidden > 1 ? 's' : '');
      info.textContent = msg;
      info.style.color = checkedHidden > 0 ? '#fbbf24' : '#86efac';
    }
    if (clearBtn) clearBtn.style.display = 'block';
  }

  function _clearOASearch() {
    var input = document.getElementById('oaSearch');
    if (input) {
      input.value = '';
      _filterOAs('');
      input.focus();
    }
  }

  // Expose en window
  window.guardarEnBiblioteca = guardarEnBiblioteca;

  // ═════════════════════════════════════════════════════════════
  //  ENVIAR A UTP DESDE EL EDITOR
  //  Guarda el material y lo marca con estado 'enviada' para
  //  que aparezca en la Bandeja de Revisión del UTP.
  // ═════════════════════════════════════════════════════════════
  function enviarAUtpDesdeEditor() {
    var preview = document.getElementById('docPreview');
    if (!preview || !preview.innerHTML.trim()) {
      mostrarSaveMsg('⚠️ Primero generá el documento con IA.', '#f59e0b'); return;
    }
    var currentUserData = (typeof _matUser !== 'undefined' && _matUser) || (window.ELAuth && ELAuth.user) || null;
    if (!currentUserData || !currentUserData.uid) {
      mostrarSaveMsg('⚠️ Debes iniciar sesión.', '#f59e0b'); return;
    }
    if (!confirm('¿Enviar este material al UTP para revisión?\n\nEl UTP podrá aprobarlo o devolverlo con comentarios.')) return;

    var selMod = document.getElementById('selectModulo');
    var selAE  = document.getElementById('selectAE');
    var selOA  = document.getElementById('selectOA');
    var selCur = document.getElementById('selectCurso');
    var inProf = document.getElementById('inputProfesor');
    var modId   = selMod ? selMod.value : '';
    var aeNum   = selAE ? selAE.value : '';
    var oaId    = selOA ? selOA.value : '';
    var curso   = selCur ? selCur.value : '';
    var prof    = (inProf && inProf.value) || currentUserData.nombre || currentUserData.name || '—';
    var tipo    = (typeof tipoDocSeleccionado !== 'undefined' && tipoDocSeleccionado) || 'guia';
    var tipos   = {guia:'Guía de Aprendizaje',apunte:'Apunte de Clase',evaluacion:'Guía de Ejercicios',prueba:'Prueba Formal',control:'Control Rápido'};
    var _modsRef = (typeof getCurriculaModulos === 'function')
      ? getCurriculaModulos((document.getElementById('selectEspecialidad') ? document.getElementById('selectEspecialidad').value : '') || '')
      : (typeof MODULOS !== 'undefined' ? MODULOS : {});
    var modNom  = modId && _modsRef[modId] ? _modsRef[modId].nombre : modId;
    var titulo  = (tipos[tipo]||tipo) + ' — ' + (modNom||modId) + (aeNum ? ' · AE' + aeNum : '');
    var asig = currentUserData.tipoProfesor === 'tecnico'
      ? (currentUserData.especialidad || '')
      : (document.getElementById('selectAsignatura') ? document.getElementById('selectAsignatura').value : (currentUserData.asignaturas && currentUserData.asignaturas[0]) || '');

    var doc = {
      titulo:       titulo,
      tipo:         tipo,
      asignatura:   asig,
      modulo:       modId,
      nivel:        curso,
      ae:           aeNum, oa: oaId,
      profesor:     prof,
      autorUid:     currentUserData.uid,
      autorNombre:  currentUserData.nombre || prof,
      uid:          currentUserData.uid,
      liceoSlug:    currentUserData.liceoSlug || currentUserData.liceoPrincipal || '',
      visibilidad:  'liceo',
      contenido:    preview.innerHTML,
      estado:       'enviada',
      enviadoEn:    new Date().toISOString(),
      estadoFecha:  new Date().toISOString(),
      creadoEn:     new Date().toISOString()
    };

    mostrarSaveMsg('📤 Enviando a UTP…', '#a5b4fc');
    EL_DB.collection('materiales').add(doc).then(function(){
      mostrarSaveMsg('✅ Enviado al UTP. Aparecerá en su Bandeja de Revisión.', '#34d399');
    }).catch(function(err){
      console.error('[enviarAUtpDesdeEditor]', err);
      mostrarSaveMsg('❌ Error al enviar: ' + (err.message || err), '#f87171');
    });
  }
  window.enviarAUtpDesdeEditor = enviarAUtpDesdeEditor;
  window.mostrarSaveMsg      = mostrarSaveMsg;
  window._filterOAs          = _filterOAs;
  window._clearOASearch      = _clearOASearch;

  // Wireup buscador OAs (debounce 150ms)
  window.addEventListener('load', function () {
    var input = document.getElementById('oaSearch');
    if (!input) return;
    var t = null;
    input.addEventListener('input', function (e) {
      clearTimeout(t);
      t = setTimeout(function () { _filterOAs(e.target.value); }, 150);
    });
    var resetters = ['selectAsignatura', 'selectCurso', 'selectNivel'];
    for (var i = 0; i < resetters.length; i++) {
      var el = document.getElementById(resetters[i]);
      if (el) el.addEventListener('change', function () {
        if (input) input.value = '';
        setTimeout(function () { _filterOAs(''); }, 100);
      });
    }
  });
})();
