/* ════════════════════════════════════════════════════════════════════
 *  material-curriculo.js — Click&Clase
 *  Lógica de currículo adaptiva por tipo de profesor:
 *  - Resolución de sigla por asignatura (LEN, MAT, CIE, ...)
 *  - Inicialización del selector según TP/Plan Común
 *  - Carga de OAs, AEs, CEs, unidades, electivos HC
 *  - Capacidades PAES/SIMCE, badges, mención TP, filtros de módulos
 *
 *  Variable global _matUser vive en window y la setea el DOMContentLoaded
 *  handler de material.html cuando ELAuth entrega el usuario.
 * ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // _matUser es global (lo setea DOMContentLoaded en material.html).
  // Acceso unificado:
  function _u() { return window._matUser || null; }

  // =============================================
  // CURRÍCULO ADAPTIVO POR TIPO DE PROFESOR
  // =============================================
  if (typeof window._matUser === "undefined") window._matUser = null;

  var _SIGLA_MAP_MAT = {
      'lenguaje y comunicación':'LEN','lenguaje':'LEN','lengua y literatura':'LEN',
      'matemática':'MAT','matematica':'MAT',
      'ciencias naturales':'CN',
      'historia, geografía y cs':'HCS','historia':'HCS',
      'inglés':'ING','ingles':'ING',
      'biología':'BIO','biologia':'BIO',
      'física':'FIS','fisica':'FIS',
      'química':'QUI','quimica':'QUI',
      'educación física':'EFI','educacion fisica':'EFI',
      'artes visuales':'ART',
      'música':'MUS','musica':'MUS'
  };

  function _resolveAsigSiglaMat(nombre) {
      if (!nombre) return null;
      var k = nombre.trim().toLowerCase()
          .replace(/[áéíóúñ]/g, function(c){return {á:'a',é:'e',í:'i',ó:'o',ú:'u',ñ:'n'}[c]||c;});
      if (_SIGLA_MAP_MAT[k]) return _SIGLA_MAP_MAT[k];
      for (var key in _SIGLA_MAP_MAT) {
          if (k.indexOf(key) !== -1 || key.indexOf(k) !== -1) return _SIGLA_MAP_MAT[key];
      }
      return null;
  }

  function initCurriculoMat(user) {
      // DEBUG TEMPORAL — ver en consola del navegador (F12)
      console.log('[EL-DEBUG] initCurriculoMat user:', JSON.stringify({
          email: user.email, role: user.role,
          tipoProfesor: user.tipoProfesor,
          niveles: user.niveles,
          cursos: user.cursos,
          especialidad: user.especialidad,
          modulos: user.modulos,
          asignaturas: user.asignaturas
      }));

      // ── Normalizar campos: soporte para formato viejo (cursos/especialidad)
      //    y nuevo (tipoProfesor/niveles). Siempre trabajamos con el nuevo.
      var u = Object.assign({}, user);

      // ═════════════════════════════════════════════════════════════════
      // FASE 8 — ADAPTADOR: si el user viene con el schema nuevo
      // (especialidades[], modulosTP{}, cursosAsignados[]), derivar campos
      // legacy (tipoProfesor, especialidad, modulos, niveles, cursos) para
      // que el resto del código legacy siga funcionando.
      // ═════════════════════════════════════════════════════════════════
      var _tieneModulosTP    = u.modulosTP && Object.keys(u.modulosTP).length > 0;
      var _tieneEspsNuevas   = Array.isArray(u.especialidades) && u.especialidades.length > 0;
      var _tieneAsigsNuevas  = Array.isArray(u.asignaturas) && u.asignaturas.length > 0 && u.asignaturas.some(function(a){return typeof a === 'string';});
      var _tieneCursosNuevos = Array.isArray(u.cursosAsignados) && u.cursosAsignados.length > 0;

      // 1) tipoProfesor: si tiene TP → tecnico; si solo asignaturas → media
      if (!u.tipoProfesor) {
          if (_tieneEspsNuevas || _tieneModulosTP) u.tipoProfesor = 'tecnico';
          else if (_tieneAsigsNuevas) u.tipoProfesor = 'media';
      }

      // 2) especialidad legacy: primera de user.especialidades
      if (!u.especialidad && _tieneEspsNuevas) {
          u.especialidad = u.especialidades[0];
      }

      // 3) modulos legacy: aplanar user.modulosTP en array de IDs
      if ((!u.modulos || !u.modulos.length) && _tieneModulosTP) {
          u.modulos = [];
          Object.keys(u.modulosTP).forEach(function (espId) {
              (u.modulosTP[espId] || []).forEach(function (modId) {
                  u.modulos.push(modId);
              });
          });
      }

      // 4) niveles legacy: derivar de cursosAsignados (formato "liceo-1b-a-2026")
      //    o setear default según tipoProfesor si no hay cursos
      if ((!u.niveles || !u.niveles.length) && _tieneCursosNuevos) {
          var nivelesSet = {};
          u.cursosAsignados.forEach(function (cid) {
              // parsear nivel del ID: "colegio-demo1-1b-a-2026" → "1B"
              var partes = String(cid).split('-');
              // Buscar el pattern nivel (1b..4b, 1m..4m, nt1, nt2)
              partes.forEach(function (p) {
                  if (/^(nt[12]|[1-8]b|[1-4]m)$/.test(p)) {
                      nivelesSet[p.toUpperCase()] = true;
                  }
              });
          });
          u.niveles = Object.keys(nivelesSet);
      }
      // Fallback: si es TP y no tiene niveles, usar 3M+4M (típicos TP)
      if ((!u.niveles || !u.niveles.length) && u.tipoProfesor === 'tecnico') {
          u.niveles = ['3M', '4M'];
      }
      // Fallback: si es media/basica y no tiene niveles, poner rango completo
      if ((!u.niveles || !u.niveles.length) && u.tipoProfesor === 'media') {
          u.niveles = ['1M','2M','3M','4M'];
      }
      if ((!u.niveles || !u.niveles.length) && u.tipoProfesor === 'basica') {
          u.niveles = ['1B','2B','3B','4B','5B','6B','7B','8B'];
      }

      // 5) cursos legacy = cursosAsignados
      if ((!u.cursos || !u.cursos.length) && _tieneCursosNuevos) {
          u.cursos = u.cursosAsignados.slice();
      }
      // ═════════════════════════════════════════════════════════════════

      // Si no tiene tipoProfesor pero tiene especialidad → inferir TP
      if (!u.tipoProfesor && u.especialidad) {
          u.tipoProfesor = 'tecnico';
      }
      // Si no tiene niveles pero tiene cursos → usar cursos como niveles
      if ((!u.niveles || u.niveles.length === 0) && u.cursos && u.cursos.length > 0) {
          u.niveles = u.cursos.slice();
      }
      // Si es TP y no tiene asignaturas pero tiene especialidad → poner especialidad como asignatura
      if (u.tipoProfesor === 'tecnico' && (!u.asignaturas || u.asignaturas.length === 0) && u.especialidad) {
          u.asignaturas = [u.especialidad];
      }

      // Deduplicar asignaturas: básica y media usan a veces nombres
      // distintos para la misma asignatura (Lengua y Literatura vs
      // Lenguaje y Comunicación, etc.). Normalizamos al canónico.
      if (u.tipoProfesor !== 'tecnico' && u.asignaturas && u.asignaturas.length &&
          typeof CURRICULA_CHILE !== 'undefined' &&
          typeof CURRICULA_CHILE.nombreAsignaturaCanonico === 'function') {
          var _vistas = {};
          u.asignaturas = u.asignaturas.reduce(function(acc, a) {
              var canon = CURRICULA_CHILE.nombreAsignaturaCanonico(a);
              if (!_vistas[canon]) { _vistas[canon] = true; acc.push(canon); }
              return acc;
          }, []);
      }

      // Mostrar barra de contexto del profesor
      var tipos = { basica: '📚 Educación Básica', media: '🎓 Plan Común', tecnico: '⚙️ Técnico-Profesional' };
      var ctxBar = document.getElementById('contextoBar');
      if (ctxBar) {
          ctxBar.style.display = 'flex';
          document.getElementById('ctxNombre').textContent = u.nombre || u.email || '—';
          document.getElementById('ctxTipo').textContent = tipos[u.tipoProfesor] || '—';
          if (u.especialidad) document.getElementById('ctxEsp').textContent = '⚙️ ' + u.especialidad;
          if (u.asignaturas && u.asignaturas.length) document.getElementById('ctxEsp').textContent = u.asignaturas.join(', ');
          if (u.niveles && u.niveles.length) document.getElementById('ctxNiveles').textContent = 'Niveles: ' + u.niveles.join(', ');
      }
      var navInfo = document.getElementById('navProfesorInfo');
      if (navInfo) navInfo.textContent = u.nombre || '';

      // Detectar si es admin
      var _adminEmails2 = window.EL_ADMIN_EMAILS || (window.EL_ADMIN_EMAIL ? [window.EL_ADMIN_EMAIL] : []);
      var _esAdminMat   = _adminEmails2.indexOf(u.email) !== -1;

      // Para admin sin tipoProfesor: modo TP con todos los cursos disponibles
      // Para profesor sin perfil completo (falta tipoProfesor O niveles): mostrar aviso y bloquear
      var _tieneNiveles = u.niveles && Array.isArray(u.niveles) && u.niveles.length > 0;
      var sinPerfil = !_esAdminMat && (!u.tipoProfesor || !_tieneNiveles);

      if (sinPerfil) {
          // Armar mensaje según qué falta exactamente
          var _queFalta = '';
          if (!user.tipoProfesor && !_tieneNiveles) {
              _queFalta = 'Tu perfil docente no está configurado (falta tipo de enseñanza y niveles/cursos).';
          } else if (!user.tipoProfesor) {
              _queFalta = 'Tu perfil no tiene el tipo de enseñanza configurado.';
          } else {
              _queFalta = 'Tu perfil no tiene ningún curso/nivel asignado.';
          }
          // Mostrar banner de aviso prominente
          var ctx = document.getElementById('contextoBar');
          if (ctx) {
              ctx.style.display = 'flex';
              ctx.style.background = 'rgba(245,158,11,.12)';
              ctx.style.border = '1px solid rgba(245,158,11,.3)';
              ctx.style.borderRadius = '12px';
              ctx.innerHTML =
                  '<span style="font-size:1.2rem">⚠️</span>' +
                  '<div>' +
                  '<strong style="color:#fcd34d">' + _queFalta + '</strong>' +
                  '<span style="color:#94a3b8;font-size:.85rem;margin-left:8px">Pide al administrador que configure tu perfil desde Panel Admin → Profesores → 🔑 Permisos.</span>' +
                  '</div>';
          }
          showToast(_queFalta + ' Contacta al administrador.', 'warn');
          return; // salir de initCurriculoMat
      }

      var isTP = u.tipoProfesor === 'tecnico' || (_esAdminMat && !u.tipoProfesor);

      // Poblar selectCurso con los niveles asignados
      // Admin sin niveles → mostrar todos; Profesor → solo sus niveles asignados
      var selCurso = document.getElementById('selectCurso');
      selCurso.innerHTML = '<option value="">-- Seleccionar curso --</option>';
      var _nivelesUsar = (u.niveles && u.niveles.length > 0)
          ? u.niveles
          : (_esAdminMat && typeof CURRICULA_CHILE !== 'undefined'
             ? CURRICULA_CHILE.getAllNiveles()
             : []);
      _nivelesUsar.forEach(function(n) {
          var opt = document.createElement('option');
          opt.value = n;
          opt.textContent = (typeof CURRICULA_CHILE !== 'undefined') ? CURRICULA_CHILE.getNivelLabel(n) : n;
          selCurso.appendChild(opt);
      });
      if ((u.niveles || []).length === 1) selCurso.value = u.niveles[0];

      var campoAsig  = document.getElementById('campoAsignatura');
      var campoMod   = document.getElementById('campoModulo');
      var secTP      = document.getElementById('sec-tp-mat');
      var secReg     = document.getElementById('sec-regular-mat');

      if (isTP) {
          if (campoAsig)  campoAsig.style.display  = 'none';
          if (campoMod)   campoMod.style.display   = '';
          if (secTP)      secTP.style.display       = '';
          if (secReg)     secReg.style.display      = 'none';
          actualizarMencion();
          filtrarModulos();
      } else {
          if (campoAsig) campoAsig.style.display = '';
          if (campoMod)  campoMod.style.display  = 'none';
          if (secTP)     secTP.style.display      = 'none';
          if (secReg)    secReg.style.display     = '';

          var selAsig = document.getElementById('selectAsignatura');
          if (selAsig) {
              selAsig.innerHTML = '<option value="">-- Seleccionar asignatura --</option>';
              (u.asignaturas || []).forEach(function(a) {
                  var opt = document.createElement('option');
                  opt.value = a; opt.textContent = a;
                  selAsig.appendChild(opt);
              });
              if ((u.asignaturas || []).length === 1) selAsig.value = u.asignaturas[0];
          }
          if ((u.asignaturas || []).length === 1 && (u.niveles || []).length === 1) {
              cargarOAsRegularMat();
          }
      }
      // Actualizar _matUser con datos normalizados para que el resto de la página los use
      _matUser = u;
      // ── Activar capacidades pedagógicas avanzadas según permisos ──
      _matAjustarCapacidadesUI();
  }

  // Mapea las asignaturas del docente a las competencias PAES permitidas.
  // Devuelve un array con las keys habilitadas. Si no hay match seguro,
  // devuelve todas (fallback conservador).
  function _paesCompetenciasPermitidas(user) {
      var u = user || {};
      var asigs = (u.asignaturas || []).slice();
      if (u.tipoProfesor === 'tecnico' && u.especialidad) asigs.push(u.especialidad);
      // Limpieza: lowercase + sin acentos
      function _norm(s) {
          return String(s || '').toLowerCase()
              .normalize('NFD').replace(/[̀-ͯ]/g, '')
              .trim();
      }
      var permit = {};
      asigs.forEach(function(a) {
          var k = _norm(a);
          if (!k) return;
          // Inglés / English — competencia propia (no es Comp. Lectora en español)
          if (/(ingles|english)/.test(k)) { permit.ingles = true; return; }
          // Lenguaje / Lectora — Lenguaje, Lengua y Literatura, Comunicación, Literatura
          if (/(lengua|comunicac|literatura|lect|idioma)/.test(k)) permit.lectora = true;
          // Matemática → M1 (común) y M2 (electivo)
          if (/matemat/.test(k)) { permit.m1 = true; permit.m2 = true; }
          // Ciencias — Biología, Física, Química, Cs Naturales, Cs para la ciudadanía
          if (/(ciencia|biolog|fisic|quimic|natur)/.test(k)) permit.ciencias = true;
          // Historia / Cs Sociales — Historia, Geografía, Filosofía, Ed Ciudadana
          if (/(histor|geograf|sociales|ciudadan|filosof)/.test(k)) permit.historia = true;
      });
      var orden = ['lectora', 'm1', 'm2', 'ciencias', 'historia', 'ingles'];
      var arr = orden.filter(function(k) { return permit[k]; });
      // Fallback: si no mapeó nada (asignatura desconocida o profe sin asignaturas), mostrar todas
      return arr.length ? arr : orden.slice();
  }

  // Muestra/oculta los selectores PAES y Marzano según los permisos del profe
  // y el tipo de documento actualmente seleccionado.
  function _matAjustarCapacidadesUI() {
      var u = _matUser || {};
      var row = document.getElementById('rowCapAvanzadas');
      var fmtBox = document.getElementById('capFormatoBox');
      var taxBox = document.getElementById('capTaxonomiaBox');
      var compBox = document.getElementById('capCompPAESBox');
      if (!row) return;

      var tipoAplicaPAES = (window.tipoDocSeleccionado || '');
      var tiposCompatibles = ['prueba','evaluacion','guia'].indexOf(tipoAplicaPAES) !== -1;
      // Los formatos PAES y SIMCE solo aplican a prueba/evaluacion/guia
      var puedePAES  = !!u.formatoPAES  && tiposCompatibles;
      var puedeSIMCE = !!u.formatoSIMCE && tiposCompatibles;
      // Taxonomía Marzano aplica a cualquier tipo que admita taxonomía (todos excepto control quizá)
      var puedeMarzano = !!u.taxonomiaMarzano;

      // El box de Formato se muestra si tiene PAES o SIMCE
      if (fmtBox) fmtBox.style.display  = (puedePAES || puedeSIMCE) ? '' : 'none';
      if (taxBox) taxBox.style.display  = puedeMarzano ? '' : 'none';

      // Ocultar/mostrar opciones del selector de formato según permisos del profe
      var selFmt = document.getElementById('selFormatoMaterial');
      if (selFmt) {
          Array.prototype.forEach.call(selFmt.options, function(opt) {
              if (opt.value === 'paes')  { opt.hidden = !puedePAES;  opt.disabled = !puedePAES; }
              if (opt.value === 'simce') { opt.hidden = !puedeSIMCE; opt.disabled = !puedeSIMCE; }
          });
          // Si la opción seleccionada quedó oculta, volver a 'estandar'
          var optSel = selFmt.options[selFmt.selectedIndex];
          if (optSel && optSel.hidden) selFmt.value = 'estandar';
      }
      var formatoSel = selFmt ? selFmt.value : 'estandar';

      // El selector de competencia PAES solo se muestra si formato='paes'
      var mostrarComp = (puedePAES && formatoSel === 'paes');
      if (compBox) compBox.style.display = mostrarComp ? '' : 'none';

      // El selector de prueba SIMCE solo se muestra si formato='simce'
      var simceBox = document.getElementById('capPruebaSIMCEBox');
      var mostrarSimce = (puedeSIMCE && formatoSel === 'simce');
      if (simceBox) simceBox.style.display = mostrarSimce ? '' : 'none';

      // Filtrar opciones del selector según las asignaturas del profe
      var selComp = document.getElementById('selCompPAES');
      if (selComp && mostrarComp) {
          var permitidas = _paesCompetenciasPermitidas(u);
          var visibles = 0;
          Array.prototype.forEach.call(selComp.options, function(opt) {
              var ok = permitidas.indexOf(opt.value) !== -1;
              opt.hidden   = !ok;
              opt.disabled = !ok;
              if (ok) visibles++;
          });
          // Si el valor seleccionado quedó oculto, mover a la primera permitida
          if (selComp.options[selComp.selectedIndex] && selComp.options[selComp.selectedIndex].hidden) {
              for (var i = 0; i < selComp.options.length; i++) {
                  if (!selComp.options[i].hidden) { selComp.selectedIndex = i; break; }
              }
          }
          // Si hay solo una competencia disponible, dejar el select deshabilitado
          // (no se puede cambiar — la opción ya está fija) y agregar un hint visible.
          selComp.disabled = (visibles <= 1);
          var hintEl = document.getElementById('hintCompPAES');
          if (visibles === 1) {
              if (!hintEl) {
                  var hint = document.createElement('small');
                  hint.id = 'hintCompPAES';
                  hint.style.cssText = 'display:block;margin-top:4px;color:#a78bfa;font-size:.7rem';
                  hint.textContent = '🔒 Asignado automáticamente según tu asignatura';
                  compBox.appendChild(hint);
              }
          } else if (hintEl) {
              hintEl.remove();
          }
      }

      var algunoVisible = (puedePAES || puedeSIMCE || puedeMarzano);
      row.style.display = algunoVisible ? '' : 'none';
  }

  function onCambioFormatoMaterial() {
      _matAjustarCapacidadesUI();
  }
  window.onCambioFormatoMaterial = onCambioFormatoMaterial;

  function onCambioAsigNivelMat() {
      var user = _matUser || {};
      if (user.tipoProfesor === 'tecnico') {
          filtrarModulos();
      } else {
          actualizarElectivosHCMat();
          cargarOAsRegularMat();
      }
  }

  function onCambioElectivoHCMat() {
      cargarOAsRegularMat();
  }

  // Muestra/puebla selector de electivos HC sólo cuando aplica (3M/4M con electivos cargados)
  function actualizarElectivosHCMat() {
      var campo = document.getElementById('campoElectivoHC');
      var sel   = document.getElementById('selectElectivoHC');
      if (!campo || !sel) return;
      var asigNombre = document.getElementById('selectAsignatura') ? document.getElementById('selectAsignatura').value : '';
      var nivelRaw   = document.getElementById('selectCurso') ? document.getElementById('selectCurso').value : '';
      var sigla      = _resolveAsigSiglaMat(asigNombre);

      if ((nivelRaw !== '3M' && nivelRaw !== '4M') || !sigla ||
          typeof CURRICULA_CHILE === 'undefined' ||
          typeof CURRICULA_CHILE.getElectivosHC !== 'function') {
          campo.style.display = 'none';
          sel.value = '';
          return;
      }
      var electivos = (CURRICULA_CHILE.getElectivosHC(sigla) || []).filter(function(e) {
          if (e.niveles && e.niveles.indexOf(nivelRaw) === -1) return false;
          var oas = CURRICULA_CHILE.getOAsByKey(e.key, nivelRaw) || [];
          return oas.length > 0;
      });
      if (!electivos.length) {
          campo.style.display = 'none';
          sel.value = '';
          return;
      }
      var prev = sel.value;
      sel.innerHTML = '<option value="">📘 Formación General (Plan Común)</option>';
      electivos.forEach(function(e) {
          var opt = document.createElement('option');
          opt.value = e.key;
          opt.textContent = '🎯 ' + e.sigla + ' — ' + e.nombre;
          sel.appendChild(opt);
      });
      sel.value = electivos.some(function(e){return e.key === prev;}) ? prev : '';
      campo.style.display = '';
  }

  function cargarOAsRegularMat() {
      var container  = document.getElementById('listaOAMineduc');
      if (!container) return;
      var asigNombre = document.getElementById('selectAsignatura') ? document.getElementById('selectAsignatura').value : '';
      var nivel      = document.getElementById('selectCurso') ? document.getElementById('selectCurso').value : '';
      var sigla      = _resolveAsigSiglaMat(asigNombre);
      var electivoKey = document.getElementById('selectElectivoHC')
          ? document.getElementById('selectElectivoHC').value : '';

      // Resetear unidades y contador cada vez que cambia asig/nivel/electivo
      cargarUnidadesRegularMat(sigla, nivel, electivoKey);
      actualizarBadgeOAMat();

      if (!sigla || !nivel || typeof CURRICULA_CHILE === 'undefined') {
          container.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem">Selecciona asignatura y nivel.</span>';
          return;
      }
      var oas;
      if (electivoKey && typeof CURRICULA_CHILE.getOAsByKey === 'function') {
          oas = CURRICULA_CHILE.getOAsByKey(electivoKey, nivel);
      } else {
          oas = CURRICULA_CHILE.getOAs(sigla, nivel);
      }
      if (!oas || !oas.length) {
          container.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem">Sin OA para esta combinación.</span>';
          return;
      }
      var byEje = {};
      oas.forEach(function(o) { var e = o.eje || 'General'; if (!byEje[e]) byEje[e] = []; byEje[e].push(o); });
      var html = '';
      Object.keys(byEje).forEach(function(eje) {
          html += '<div style="font-size:.78rem;color:var(--muted,#888);font-weight:700;margin:8px 0 4px;text-transform:uppercase">' + eje + '</div>';
          byEje[eje].forEach(function(o) {
              var desc = o.desc || o.descripcion || '';
              var tip  = desc.replace(/"/g,'&quot;');
              html += '<label class="checkbox-item" title="' + tip + '" style="align-items:flex-start;gap:8px;width:100%">' +
                  '<input type="checkbox" class="oaRegCheck" value="' + o.codigo + '" data-desc="' + tip + '" onchange="toggleCheckItem(this); actualizarBadgeOAMat();">' +
                  '<span><strong>' + o.codigo + '</strong> — ' + (desc.slice(0,140) || '…') + (desc.length > 140 ? '…' : '') + '</span></label>';
          });
      });
      container.innerHTML = html;
  }

  // ─────────────────────────────────────────────────────────────────────
  // UNIDAD / TIEMPO — selector poblado desde plan común oficial (material)
  // ─────────────────────────────────────────────────────────────────────
  var TIEMPO_SUG_DEFAULT_MAT = '8 a 9 semanas';

  function cargarUnidadesRegularMat(sigla, nivel, electivoKey) {
      var sel = document.getElementById('selectUnidadReg');
      if (!sel) return;
      sel.innerHTML = '<option value="">-- Selecciona una unidad oficial --</option>';
      var nomInput = document.getElementById('inputUnidadRegNombre');
      var hidden   = document.getElementById('inputUnidadReg');
      var hint     = document.getElementById('hintUnidadReg');
      if (nomInput) { nomInput.value = ''; nomInput.style.display = 'none'; }
      if (hidden)   { hidden.value = ''; }
      if (hint)     { hint.style.display = 'none'; }

      if (!sigla || !nivel || typeof CURRICULA_CHILE === 'undefined') return;
      var unidades;
      if (electivoKey && typeof CURRICULA_CHILE.getUnidadesByKey === 'function') {
          unidades = CURRICULA_CHILE.getUnidadesByKey(electivoKey, nivel);
      } else {
          unidades = (typeof CURRICULA_CHILE.getUnidades === 'function')
              ? CURRICULA_CHILE.getUnidades(sigla, nivel)
              : [];
      }
      if (!unidades || !unidades.length) {
          var optManual = document.createElement('option');
          optManual.value = '__custom__';
          optManual.textContent = '✎ Escribir unidad personalizada…';
          sel.appendChild(optManual);
          return;
      }
      unidades.forEach(function(u, i) {
          var nombre = (typeof u === 'string') ? u : (u && u.nombre) || ('Unidad ' + (i+1));
          var opt = document.createElement('option');
          opt.value = nombre;
          opt.textContent = 'Unidad ' + (i+1) + ': ' + nombre;
          sel.appendChild(opt);
      });
      var optCustom = document.createElement('option');
      optCustom.value = '__custom__';
      optCustom.textContent = '✎ Escribir unidad personalizada…';
      sel.appendChild(optCustom);
  }

  function onCambioUnidadRegMat() {
      var sel       = document.getElementById('selectUnidadReg');
      var nomInput  = document.getElementById('inputUnidadRegNombre');
      var tiempoIn  = document.getElementById('inputTiempoReg');
      var hint      = document.getElementById('hintUnidadReg');
      var hintSug   = document.getElementById('hintTiempoSug');
      if (!sel) return;

      if (sel.value === '__custom__') {
          if (nomInput) { nomInput.style.display = ''; nomInput.value = ''; nomInput.focus(); }
      } else if (sel.value) {
          if (nomInput) { nomInput.style.display = 'none'; nomInput.value = sel.value; }
      } else {
          if (nomInput) { nomInput.style.display = 'none'; nomInput.value = ''; }
      }

      if (tiempoIn && !tiempoIn.value && sel.value && sel.value !== '__custom__') {
          tiempoIn.placeholder = 'Tiempo (ej: ' + TIEMPO_SUG_DEFAULT_MAT + ')';
          if (hint && hintSug) {
              hintSug.textContent = TIEMPO_SUG_DEFAULT_MAT;
              hint.style.display = '';
          }
      } else if (hint) {
          hint.style.display = 'none';
      }
      actualizarUnidadCompuestaMat();
  }

  function actualizarUnidadCompuestaMat() {
      var sel       = document.getElementById('selectUnidadReg');
      var nomInput  = document.getElementById('inputUnidadRegNombre');
      var tiempoIn  = document.getElementById('inputTiempoReg');
      var hidden    = document.getElementById('inputUnidadReg');
      if (!hidden) return;
      var nombre = '';
      if (sel && sel.value === '__custom__') {
          nombre = (nomInput && nomInput.value) ? nomInput.value.trim() : '';
      } else if (sel && sel.value) {
          if (nomInput && nomInput.style.display !== 'none' && nomInput.value) {
              nombre = nomInput.value.trim();
          } else {
              nombre = sel.value;
          }
      }
      var tiempo = (tiempoIn && tiempoIn.value) ? tiempoIn.value.trim() : '';
      var compuesto = '';
      if (nombre && tiempo)      compuesto = nombre + ' — ' + tiempo;
      else if (nombre)            compuesto = nombre;
      else if (tiempo)            compuesto = tiempo;
      hidden.value = compuesto;
  }

  // ─────────────────────────────────────────────────────────────────────
  // BADGES (contador en summary de cada dropdown)
  // ─────────────────────────────────────────────────────────────────────
  function _setBadgeMat(badgeId, count) {
      var b = document.getElementById(badgeId);
      if (!b) return;
      b.textContent = String(count);
      if (count > 0) b.classList.remove('empty');
      else           b.classList.add('empty');
  }
  function actualizarBadgeOAMat() {
      var n = document.querySelectorAll('#listaOAMineduc .oaRegCheck:checked').length;
      _setBadgeMat('badgeOAMineduc', n);
  }
  function actualizarBadgeValoresMat() {
      var n = document.querySelectorAll('#valoresSalesianos input[type="checkbox"]:checked').length;
      _setBadgeMat('badgeValores', n);
  }

  // Muestra el selector de mención sólo si la especialidad del profesor
  // tiene menciones definidas en CURRICULA_FULL. Lo deja en la primera mención.
  function actualizarMencion() {
      var campo = document.getElementById('campoMencion');
      var sel   = document.getElementById('selectMencion');
      if (!campo || !sel) return;
      var user   = _matUser || {};
      var espKey = (user.especialidad || '').toLowerCase();
      var data   = (window.CURRICULA_FULL && window.CURRICULA_FULL[espKey]) || null;
      var menciones = (data && data.menciones) || null;
      if (!menciones || !menciones.length) {
          campo.style.display = 'none';
          sel.innerHTML = '';
          return;
      }
      // Valor inicial: lo ya elegido, o la mención asignada al profesor por el admin.
      var previa = sel.value || (user.mencion || '');
      sel.innerHTML = '';
      menciones.forEach(function(mn) {
          var opt = document.createElement('option');
          opt.value = mn;
          opt.textContent = mn;
          sel.appendChild(opt);
      });
      if (previa && menciones.indexOf(previa) !== -1) sel.value = previa;
      campo.style.display = '';
  }

  function filtrarModulos() {
      var user = _matUser || {};
      var sel  = document.getElementById('selectModulo');
      if (!sel) return;
      sel.innerHTML = '<option value="">-- Seleccionar módulo --</option>';

      // NOTA: Para profesores TP no bloqueamos por nivel.
      // El nivel se usa para la planificación pero NO para filtrar módulos.
      // Mostramos todos los módulos asignados/disponibles siempre.

      var asignadosMods = user.modulos || [];
      var espKey = user.especialidad || '';

      function addOpt(num, nombre, horas, nivelMod) {
          var opt = document.createElement('option');
          opt.value = num;
          var nivelTag = nivelMod ? ' [' + nivelMod + ']' : '';
          opt.textContent = num + nivelTag + ' — ' + nombre + (horas ? '  (' + horas + 'h)' : '');
          sel.appendChild(opt);
      }

      var added = 0;

      // Prioridad 1: CURRICULA_FULL[especialidad] (datos completos por especialidad)
      var modulosFull = (typeof getCurriculaModulos === 'function')
          ? getCurriculaModulos(espKey)
          : (typeof MODULOS !== 'undefined' ? MODULOS : {});

      // Mención seleccionada: si la especialidad tiene menciones, se muestran
      // los módulos comunes (sin mención) + los de la mención elegida.
      var selMencionEl = document.getElementById('selectMencion');
      var selMencion   = selMencionEl ? selMencionEl.value : '';

      if (modulosFull && Object.keys(modulosFull).length > 0) {
          Object.keys(modulosFull).forEach(function(key) {
              var m = modulosFull[key];
              if (selMencion && m.mencion && m.mencion !== selMencion) return;
              if (asignadosMods.length === 0 || asignadosMods.indexOf(m.num) !== -1) {
                  addOpt(m.num, m.nombre, m.horas, m.nivel);
                  added++;
              }
          });
      }

      if (added === 0 && typeof CURRICULA_CHILE !== 'undefined') {
          if (espKey) {
              // Caso 2: especialidad conocida en CURRICULA_CHILE
              CURRICULA_CHILE.getModulos(espKey).forEach(function(m) {
                  if (asignadosMods.length === 0 || asignadosMods.indexOf(m.num) !== -1) {
                      addOpt(m.num, m.nombre, m.horas, m.nivel);
                      added++;
                  }
              });
          } else if (asignadosMods.length > 0) {
              // Caso 3: módulos asignados pero sin especialidad
              asignadosMods.forEach(function(modNum) {
                  var found = CURRICULA_CHILE.getModuloCompatByNum(modNum);
                  if (found) { addOpt(found.num, found.nombre, found.horas); added++; }
              });
          } else {
              // Caso 4: sin datos → mostrar todos los módulos de todas las especialidades
              CURRICULA_CHILE.getAllModulos().forEach(function(entry) {
                  addOpt(entry.mod.num, entry.espNombre + ' › ' + entry.mod.nombre, entry.mod.horas, entry.mod.nivel);
                  added++;
              });
          }
      }

      if (added === 0) {
          var opt = document.createElement('option');
          opt.disabled = true;
          opt.textContent = '⚠ Sin módulos disponibles — contacta al administrador';
          sel.appendChild(opt);
      }

      document.getElementById('selectOA').innerHTML = '<option value="">-- Selecciona un módulo primero --</option>';
      document.getElementById('infoOA').style.display = 'none';
      document.getElementById('selectAE').innerHTML = '<option value="">-- Selecciona un OA --</option>';
      document.getElementById('listaCE').innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">Selecciona un AE</span>';
      document.getElementById('listaOAG').innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">Se muestran automáticamente</span>';
  }

  function cargarOA() {
      var modId = document.getElementById('selectModulo').value;
      var sel = document.getElementById('selectOA');
      sel.innerHTML = '<option value="">-- Seleccionar OA --</option>';
      document.getElementById('infoOA').style.display = 'none';
      if (!modId) return;

      var mod = (typeof MODULOS !== 'undefined' && MODULOS[modId]) ? MODULOS[modId] : null;
      if (!mod && typeof CURRICULA_CHILE !== 'undefined') {
          var espKey = (_matUser && _matUser.especialidad) ? _matUser.especialidad : '';
          mod = espKey
              ? CURRICULA_CHILE.getModuloCompat(espKey, modId)
              : CURRICULA_CHILE.getModuloCompatByNum(modId);
      }
      if (!mod || !mod.oas) return;

      Object.keys(mod.oas).forEach(function(key) {
          var opt = document.createElement('option');
          opt.value = key;
          var textoOA = mod.oas[key] || key;
          opt.textContent = key + ': ' + (textoOA.length > 80 ? textoOA.slice(0, 80) + '...' : textoOA);
          sel.appendChild(opt);
      });
      document.getElementById('selectAE').innerHTML = '<option value="">-- Selecciona un OA --</option>';
      document.getElementById('listaCE').innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">Selecciona un AE</span>';
      document.getElementById('listaOAG').innerHTML = '';
  }

  function cargarAE() {
      var modId = document.getElementById('selectModulo').value;
      var oaId  = document.getElementById('selectOA').value;
      var sel   = document.getElementById('selectAE');
      sel.innerHTML = '<option value="">-- Seleccionar AE --</option>';
      if (!modId || !oaId) return;

      var mod = (typeof MODULOS !== 'undefined' && MODULOS[modId]) ? MODULOS[modId] : null;
      if (!mod && typeof CURRICULA_CHILE !== 'undefined') {
          var espKey = (_matUser && _matUser.especialidad) ? _matUser.especialidad : '';
          mod = espKey
              ? CURRICULA_CHILE.getModuloCompat(espKey, modId)
              : CURRICULA_CHILE.getModuloCompatByNum(modId);
      }
      if (!mod || !mod.oas) return;

      document.getElementById('infoOA').textContent = oaId + ': ' + (mod.oas[oaId] || '');
      document.getElementById('infoOA').style.display = 'block';
      var aeKeys = Object.keys(mod.aes);
      aeKeys.forEach(function(num) {
          var ae = mod.aes[num];
          var opt = document.createElement('option');
          opt.value = num;
          var txt = ae.texto || '';
          // Limpiar prefijo 'OA' de la clave (p.ej. 'OA1' → '1')
          var aeNum = (typeof num === 'string' && num.indexOf('OA') === 0) ? num.replace('OA', '') : num;
          opt.textContent = 'AE ' + aeNum + ': ' + (txt.length > 100 ? txt.slice(0, 100) + '...' : txt);
          sel.appendChild(opt);
      });
      document.getElementById('listaCE').innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">Selecciona un AE</span>';
      document.getElementById('listaOAG').innerHTML = '';
  }

  function cargarCE() {
      var modId    = document.getElementById('selectModulo').value;
      var aeNum    = document.getElementById('selectAE').value;
      var listaCE  = document.getElementById('listaCE');
      listaCE.innerHTML = '';
      if (!modId || !aeNum) return;

      var mod = (typeof MODULOS !== 'undefined' && MODULOS[modId]) ? MODULOS[modId] : null;
      if (!mod && typeof CURRICULA_CHILE !== 'undefined') {
          var espKey = (_matUser && _matUser.especialidad) ? _matUser.especialidad : '';
          mod = espKey
              ? CURRICULA_CHILE.getModuloCompat(espKey, modId)
              : CURRICULA_CHILE.getModuloCompatByNum(modId);
      }
      if (!mod || !mod.aes || !mod.aes[aeNum]) return;

      var ae = mod.aes[aeNum];
      Object.keys(ae.ces).forEach(function(key) {
          var ce = ae.ces[key];
          var item = document.createElement('label');
          item.className = 'checkbox-item ce-item checked';
          item.innerHTML = '<input type="checkbox" value="' + key + '" data-oag="' + ce.oag.join(',') + '" checked onchange="toggleCheckItem(this);actualizarOAG()"> <strong>' + key + '</strong> — ' + ce.texto;
          listaCE.appendChild(item);
      });
      actualizarOAG();
      if (typeof renderRecomendaciones === 'function') {
          renderRecomendaciones(modId, aeNum, document.getElementById('selectOA').value);
      }
  }

  // ── Helper: OAG de la especialidad activa ──────────────────
  function _getOAGDefs() {
      var espKey = (_matUser && _matUser.especialidad) ? _matUser.especialidad : '';
      if (typeof getCurriculaOAG === 'function') return getCurriculaOAG(espKey);
      return (typeof OAG_DEFINICIONES !== 'undefined') ? OAG_DEFINICIONES : {};
  }

  function actualizarOAG() {
      var listaOAG = document.getElementById('listaOAG');
      listaOAG.innerHTML = '';
      var checks = document.querySelectorAll('#listaCE input[type="checkbox"]:checked');
      var oagObj = {};
      for (var i = 0; i < checks.length; i++) {
          var oags = checks[i].getAttribute('data-oag');
          if (oags) { var arr = oags.split(','); for (var j = 0; j < arr.length; j++) oagObj[arr[j].trim()] = true; }
      }
      var oagOrd = Object.keys(oagObj).sort();
      if (oagOrd.length === 0) { listaOAG.innerHTML = '<span style="color:var(--text-muted);font-size:0.85rem;">Selecciona al menos un CE</span>'; return; }
      for (var i = 0; i < oagOrd.length; i++) {
          var tag = document.createElement('div');
          tag.className = 'oag-tag';
          tag.title = _getOAGDefs()[oagOrd[i]] || '';
          tag.textContent = oagOrd[i];
          listaOAG.appendChild(tag);
      }
  }

  // =============================================
  // GENERADOR INTELIGENTE DE MATERIAL EDUCATIVO
  // =============================================

  // Expose globalmente todas las funciones (mismo nombre que tenian en material.html)
  window._SIGLA_MAP_MAT          = _SIGLA_MAP_MAT;
  window._resolveAsigSiglaMat    = _resolveAsigSiglaMat;
  window.initCurriculoMat        = initCurriculoMat;
  window._paesCompetenciasPermitidas = _paesCompetenciasPermitidas;
  window._matAjustarCapacidadesUI    = _matAjustarCapacidadesUI;
  window.onCambioFormatoMaterial = onCambioFormatoMaterial;
  window.onCambioAsigNivelMat    = onCambioAsigNivelMat;
  window.onCambioElectivoHCMat   = onCambioElectivoHCMat;
  window.actualizarElectivosHCMat = actualizarElectivosHCMat;
  window.cargarOAsRegularMat     = cargarOAsRegularMat;
  window.cargarUnidadesRegularMat = cargarUnidadesRegularMat;
  window.onCambioUnidadRegMat    = onCambioUnidadRegMat;
  window.actualizarUnidadCompuestaMat = actualizarUnidadCompuestaMat;
  window.actualizarBadgeOAMat    = actualizarBadgeOAMat;
  window.actualizarBadgeValoresMat = actualizarBadgeValoresMat;
  window.actualizarMencion       = actualizarMencion;
  window.filtrarModulos          = filtrarModulos;
  window.cargarOA                = cargarOA;
  window.cargarAE                = cargarAE;
  window.cargarCE                = cargarCE;
  window.actualizarOAG           = actualizarOAG;
})();
