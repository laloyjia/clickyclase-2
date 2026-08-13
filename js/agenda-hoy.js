/**
 * agenda-hoy.js — Click&Clase
 * Módulo autocontenido para el dashboard del docente.
 *
 *   CCAgenda.montar(dayElId, monthElId)
 *
 * Pinta dos vistas alimentadas por CCHorarios (horario del docente):
 *   1) Agenda del día: bloques del horario del día seleccionado, por hora,
 *      con navegación ‹ › / Hoy y una línea de "ahora".
 *   2) Mini-calendario mensual: día de hoy resaltado, puntos en los días
 *      que tienen clases según el horario semanal; click en un día actualiza
 *      la agenda; ‹ › cambian de mes.
 *
 * No toca reglas ni colecciones nuevas. Si el docente no tiene horario
 * (p. ej. independiente sin liceo), muestra un estado vacío claro.
 */
(function () {
  'use strict';

  var _dayEl = null, _monthEl = null;
  var _sel = new Date();           // día seleccionado en la agenda
  var _mesRef = new Date();        // mes visible en el mini-calendario
  var _semanaCache = null;         // {lunes:[...],...} para puntos del mini-mes
  var MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  var DOW = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  var DIA_KEY = { 1:'lunes', 2:'martes', 3:'miercoles', 4:'jueves', 5:'viernes' };

  function _esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function _ymd(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
  function _esHoy(d) { var h = new Date(); return d.getFullYear()===h.getFullYear() && d.getMonth()===h.getMonth() && d.getDate()===h.getDate(); }
  function _mismosDia(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

  // ── Agenda del día ─────────────────────────────────────────────
  function _renderDia() {
    if (!_dayEl) return;
    var esFinDe = (_sel.getDay() === 0 || _sel.getDay() === 6);
    var head =
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:8px;flex-wrap:wrap">' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<button class="ag-prev" aria-label="Día anterior" title="Día anterior" style="border:1px solid #e2e8f0;background:#fff;border-radius:8px;width:30px;height:30px;cursor:pointer;font-size:1rem;color:#334155">‹</button>' +
          '<span style="font-weight:700;color:#0f172a;font-size:.95rem">' + DOW[_sel.getDay()] + ' ' + _sel.getDate() + ' ' + MESES[_sel.getMonth()] + '</span>' +
          (_esHoy(_sel) ? '<span style="background:#7c3aed;color:#fff;border-radius:20px;padding:1px 9px;font-size:.7rem;font-weight:700">Hoy</span>' : '') +
          '<button class="ag-next" aria-label="Día siguiente" title="Día siguiente" style="border:1px solid #e2e8f0;background:#fff;border-radius:8px;width:30px;height:30px;cursor:pointer;font-size:1rem;color:#334155">›</button>' +
        '</div>' +
        '<button class="ag-hoy" aria-label="Ir a hoy" style="border:1px solid #e2e8f0;background:#fff;border-radius:8px;padding:5px 12px;cursor:pointer;font-size:.78rem;color:#334155">Hoy</button>' +
      '</div>';
    _dayEl.innerHTML = head + '<div class="ag-body" style="min-height:60px"><div style="color:#94a3b8;font-size:.85rem;padding:12px 0">⏳ Cargando…</div></div>';
    _dayEl.querySelector('.ag-prev').addEventListener('click', function(){ _sel.setDate(_sel.getDate()-1); _mesRef = new Date(_sel); _renderDia(); _renderMes(); });
    _dayEl.querySelector('.ag-next').addEventListener('click', function(){ _sel.setDate(_sel.getDate()+1); _mesRef = new Date(_sel); _renderDia(); _renderMes(); });
    _dayEl.querySelector('.ag-hoy').addEventListener('click', function(){ _sel = new Date(); _mesRef = new Date(); _renderDia(); _renderMes(); });

    var body = _dayEl.querySelector('.ag-body');
    if (esFinDe) { body.innerHTML = '<div style="color:#94a3b8;font-size:.85rem;padding:14px 0;text-align:center">🌤️ Fin de semana — sin clases.</div>'; return; }
    if (!(window.CCHorarios && CCHorarios.clasesDelDia)) { body.innerHTML = '<div style="color:#94a3b8;font-size:.85rem;padding:14px 0">Horario no disponible.</div>'; return; }

    CCHorarios.clasesDelDia(_ymd(_sel)).then(function (items) {
      var clases = (items || []).filter(function (x) { return x.bloque && x.bloque.tipo === 'clase' && x.entrada && (x.entrada.asignatura || x.entrada.cursoNombre); });
      if (!clases.length) {
        body.innerHTML = '<div style="color:#94a3b8;font-size:.85rem;padding:14px 0;text-align:center">📭 Sin clases agendadas este día.' +
          '<div style="font-size:.75rem;margin-top:4px">El horario lo define UTP en el panel de horarios.</div></div>';
        return;
      }
      var ahora = new Date();
      var nowMin = ahora.getHours()*60 + ahora.getMinutes();
      var esDiaHoy = _esHoy(_sel);
      body.innerHTML = clases.map(function (c) {
        var hi = c.bloque.horaInicio || '', hf = c.bloque.horaFin || '';
        var enCurso = false;
        if (esDiaHoy && hi && hf) {
          var mi = _min(hi), mf = _min(hf);
          enCurso = nowMin >= mi && nowMin < mf;
        }
        var asig = c.entrada.asignatura || 'Clase';
        var curso = c.entrada.cursoNombre || '';
        return '<div style="display:flex;gap:10px;align-items:stretch;margin-bottom:6px">' +
            '<div style="width:52px;flex:none;text-align:right;font-size:.72rem;color:' + (enCurso ? '#dc2626' : '#94a3b8') + ';font-weight:' + (enCurso ? '700' : '400') + ';padding-top:6px">' + _esc(hi) + '</div>' +
            '<div style="flex:1;background:#fef9e7;border:1px solid ' + (enCurso ? '#f59e0b' : '#fde68a') + ';border-radius:8px;padding:7px 10px">' +
              '<div style="font-weight:600;color:#854d0e;font-size:.84rem">' + _esc(asig) + (curso ? ' <span style="color:#a16207;font-weight:500">· ' + _esc(curso) + '</span>' : '') + '</div>' +
              '<div style="font-size:.72rem;color:#a16207">' + _esc(hi) + '–' + _esc(hf) + (enCurso ? ' · <b>en curso</b>' : '') + '</div>' +
            '</div>' +
          '</div>';
      }).join('');
    }).catch(function () {
      body.innerHTML = '<div style="color:#94a3b8;font-size:.85rem;padding:14px 0">No se pudo cargar el horario.</div>';
    });
  }

  function _min(hhmm) { var p = String(hhmm).split(':'); return (parseInt(p[0],10)||0)*60 + (parseInt(p[1],10)||0); }

  // ── Mini-calendario mensual ────────────────────────────────────
  function _diasConClase() {
    // Set de weekdays (getDay) que tienen clases en el horario semanal.
    if (_semanaCache) return Promise.resolve(_semanaCache);
    if (!(window.CCHorarios && CCHorarios.getHorarioDocente)) return Promise.resolve({});
    return CCHorarios.getHorarioDocente().then(function (hor) {
      var set = {};
      var map = { lunes:1, martes:2, miercoles:3, jueves:4, viernes:5 };
      Object.keys(map).forEach(function (k) {
        if (hor && hor.semana && (hor.semana[k] || []).length) set[map[k]] = true;
      });
      _semanaCache = set;
      return set;
    }).catch(function () { return {}; });
  }

  function _renderMes() {
    if (!_monthEl) return;
    _diasConClase().then(function (conClase) {
      var y = _mesRef.getFullYear(), m = _mesRef.getMonth();
      var primero = new Date(y, m, 1);
      var offset = (primero.getDay() + 6) % 7;  // lunes = 0
      var diasMes = new Date(y, m+1, 0).getDate();
      var celdas = [];
      for (var i = 0; i < offset; i++) celdas.push(null);
      for (var d = 1; d <= diasMes; d++) celdas.push(new Date(y, m, d));
      var hoy = new Date();
      var head = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">' +
          '<button class="mc-prev" aria-label="Mes anterior" title="Mes anterior" style="border:1px solid #e2e8f0;background:#fff;border-radius:8px;width:28px;height:28px;cursor:pointer;color:#334155">‹</button>' +
          '<span style="font-weight:700;color:#0f172a;font-size:.9rem">' + MESES[m] + ' ' + y + '</span>' +
          '<button class="mc-next" aria-label="Mes siguiente" title="Mes siguiente" style="border:1px solid #e2e8f0;background:#fff;border-radius:8px;width:28px;height:28px;cursor:pointer;color:#334155">›</button>' +
        '</div>';
      var dow = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:.68rem;color:#94a3b8;text-align:center;margin-bottom:3px">' +
        ['L','M','X','J','V','S','D'].map(function(x){return '<span>'+x+'</span>';}).join('') + '</div>';
      var grid = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center">' +
        celdas.map(function (c) {
          if (!c) return '<span></span>';
          var esHoy = _mismosDia(c, hoy);
          var esSel = _mismosDia(c, _sel);
          var finde = (c.getDay() === 0 || c.getDay() === 6);
          var tieneClase = !!conClase[c.getDay()] && !finde;
          var bg = esHoy ? 'background:#7c3aed;color:#fff;' : (esSel ? 'background:#ede9fe;color:#6d28d9;' : '');
          var col = esHoy ? '#fff' : (finde ? '#f87171' : '#334155');
          return '<span class="mc-d" data-ymd="' + _ymd(c) + '" style="cursor:pointer;font-size:.76rem;border-radius:50%;width:24px;height:24px;line-height:24px;margin:0 auto;position:relative;color:' + col + ';' + bg + '">' + c.getDate() +
            (tieneClase && !esHoy ? '<span style="position:absolute;bottom:1px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:#f59e0b"></span>' : '') +
            '</span>';
        }).join('') + '</div>';
      _monthEl.innerHTML = head + dow + grid;
      _monthEl.querySelector('.mc-prev').addEventListener('click', function(){ _mesRef = new Date(y, m-1, 1); _renderMes(); });
      _monthEl.querySelector('.mc-next').addEventListener('click', function(){ _mesRef = new Date(y, m+1, 1); _renderMes(); });
      Array.prototype.forEach.call(_monthEl.querySelectorAll('.mc-d'), function (el) {
        el.addEventListener('click', function () {
          var p = el.getAttribute('data-ymd').split('-');
          _sel = new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10));
          _renderDia(); _renderMes();
        });
      });
    });
  }

  function montar(dayElId, monthElId) {
    _dayEl = document.getElementById(dayElId);
    _monthEl = document.getElementById(monthElId);
    _sel = new Date(); _mesRef = new Date(); _semanaCache = null;
    _renderDia();
    _renderMes();
  }

  window.CCAgenda = { montar: montar };
})();
