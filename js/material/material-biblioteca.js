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
      email:        currentUserData.email || '',
      asignatura:   asigGuardar,
      electivoHC:   electivoHCGuardar || '',
      especialidad: currentUserData.especialidad || '',
      tipoProfesor: currentUserData.tipoProfesor || ''
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
