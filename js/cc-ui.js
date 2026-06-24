/**
 * cc-ui.js — Click&Clase
 * Mejoras transversales de interfaz para todos los paneles:
 *  - Conmutador de tema claro/oscuro (persistente).
 *  - Botón "Excel" para exportar cualquier tabla.
 * Se inyecta solo; si algo no aplica, no hace nada (seguro).
 */
(function () {
  // Aplicar tema guardado lo antes posible (evita parpadeo)
  try { var t = localStorage.getItem('cc_theme'); if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch (e) {}
  // Aplicar color institucional (branding) si está en caché
  function applyBranding(br) {
    if (!br) return;
    if (br.color) { document.documentElement.style.setProperty('--primary', br.color); document.documentElement.style.setProperty('--primary-light', br.color); }
  }
  try { applyBranding(JSON.parse(localStorage.getItem('cc_branding') || 'null')); } catch (e) {}

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

  function injectToggle() {
    var bar = document.querySelector('.topbar');
    if (!bar || document.getElementById('cc-theme-btn')) return;
    var b = document.createElement('button');
    b.id = 'cc-theme-btn'; b.className = 'cc-iconbtn'; b.title = 'Cambiar tema claro/oscuro';
    b.innerHTML = '<span class="material-symbols-outlined">' + (isDark() ? 'light_mode' : 'dark_mode') + '</span>';
    b.addEventListener('click', function () {
      var dark = !isDark();
      if (dark) document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('cc_theme', dark ? 'dark' : 'light'); } catch (e) {}
      b.querySelector('.material-symbols-outlined').textContent = dark ? 'light_mode' : 'dark_mode';
    });
    var right = bar.querySelector('.usr') || bar.querySelector('.switcher') || bar.lastElementChild;
    if (right && right !== bar) right.insertBefore(b, right.firstChild);
    else bar.appendChild(b);
  }

  function injectExport() {
    if (typeof XLSX === 'undefined') return;
    document.querySelectorAll('.card').forEach(function (card) {
      var table = card.querySelector('table');
      var tools = card.querySelector('.cardhead .tools');
      if (!table || !tools || tools.querySelector('.cc-exp')) return;
      var b = document.createElement('button');
      b.className = 'btn ghost sm cc-exp';
      b.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px">file_download</span> Excel';
      b.addEventListener('click', function () {
        try { var wb = XLSX.utils.table_to_book(table); XLSX.writeFile(wb, 'click-y-clase-export.xlsx'); } catch (e) {}
      });
      tools.appendChild(b);
    });
  }

  // (14) Menú lateral en móvil — botón hamburguesa
  function injectBurger() {
    var bar = document.querySelector('.topbar'); var side = document.querySelector('.sidebar');
    if (!bar || !side || document.getElementById('cc-burger')) return;
    var b = document.createElement('button');
    b.id = 'cc-burger'; b.className = 'cc-iconbtn cc-burger'; b.title = 'Menú';
    b.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    b.addEventListener('click', function () { side.classList.toggle('cc-open'); });
    var first = bar.firstElementChild;
    if (first) first.insertBefore(b, first.firstChild); else bar.appendChild(b);
    side.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.nav-item')) side.classList.remove('cc-open'); });
  }

  // (20) Ordenar tablas por columna (delegación: sobrevive a re-renders)
  document.addEventListener('click', function (e) {
    var th = e.target.closest && e.target.closest('th'); if (!th) return;
    var table = th.closest('table'); if (!table) return;
    var tbody = table.querySelector('tbody'); if (!tbody) return;
    var idx = Array.prototype.indexOf.call(th.parentNode.children, th);
    var asc = th.getAttribute('data-asc') !== '1';
    Array.prototype.forEach.call(th.parentNode.children, function (x) { x.removeAttribute('data-asc'); });
    th.setAttribute('data-asc', asc ? '1' : '0');
    var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
    rows.sort(function (a, b) {
      var ta = (a.children[idx] ? a.children[idx].textContent : '').trim();
      var tb = (b.children[idx] ? b.children[idx].textContent : '').trim();
      var na = parseFloat(ta.replace(',', '.')), nb = parseFloat(tb.replace(',', '.'));
      var cmp = (!isNaN(na) && !isNaN(nb)) ? (na - nb) : ta.localeCompare(tb, 'es');
      return asc ? cmp : -cmp;
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
  });

  // (15) Estados vacíos: placeholder amable cuando una tabla no tiene filas
  function watchEmpty(tb) {
    function check() {
      var real = tb.querySelectorAll('tr:not(.cc-empty)').length;
      var ph = tb.querySelector('tr.cc-empty');
      if (real === 0 && !ph) {
        var table = tb.closest('table');
        var cols = table ? (table.querySelectorAll('thead th').length || 1) : 1;
        var tr = document.createElement('tr'); tr.className = 'cc-empty';
        tr.innerHTML = '<td colspan="' + cols + '" style="text-align:center;color:var(--muted);padding:22px"><span class="material-symbols-outlined" style="font-size:30px;opacity:.5;display:block;margin-bottom:6px">inbox</span>Sin registros aún.</td>';
        tb.appendChild(tr);
      } else if (real > 0 && ph) { ph.remove(); }
    }
    try { new MutationObserver(check).observe(tb, { childList: true }); } catch (e) {}
    check();
  }
  function emptyStates() { document.querySelectorAll('tbody').forEach(watchEmpty); }

  // Botón "Copiar" en los resultados de IA (textareas dentro de .modal)
  function injectCopy() {
    document.querySelectorAll('.modal textarea').forEach(function (ta) {
      if (ta.dataset.ccCopy) return; ta.dataset.ccCopy = '1';
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'btn ghost sm'; b.style.marginTop = '8px';
      b.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px">content_copy</span> Copiar texto';
      b.addEventListener('click', function () {
        try {
          if (navigator.clipboard) navigator.clipboard.writeText(ta.value);
          else { ta.select(); document.execCommand('copy'); }
          b.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px">check</span> Copiado';
          setTimeout(function () { b.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px">content_copy</span> Copiar texto'; }, 1500);
        } catch (e) {}
      });
      ta.parentNode.insertBefore(b, ta.nextSibling);
    });
  }

  // (17) Accesibilidad: navegar el menú con teclado (Enter/Espacio)
  function a11y() {
    document.querySelectorAll('.nav-item').forEach(function (n) { if (!n.getAttribute('tabindex')) n.setAttribute('tabindex', '0'); });
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.classList && e.target.classList.contains('nav-item')) { e.preventDefault(); e.target.click(); }
    });
  }

  // (21) Gestión en línea genérica (agregar / editar / eliminar) para tablas.
  // Un panel la activa con: window.CC_REG = REG; window.CC_RENDER = renderTable; window.CC_PREFIX = 'amb';
  function crud() {
    if (typeof window.CC_REG === 'undefined' || typeof window.CC_RENDER !== 'function') return;
    var REG = window.CC_REG, render = window.CC_RENDER, prefix = window.CC_PREFIX || '';
    function persist(key) { if (window.ccStore) { try { ccStore.setTabla((window.CC_PREFIX || prefix) + '_' + key, REG[key].rows); } catch (e) {} } }
    window.ccAdd = function (key) {
      if (!REG[key]) return;
      var n = (REG[key].headers && REG[key].headers.length) || (REG[key].rows[0] ? REG[key].rows[0].length : 3);
      var row = []; for (var x = 0; x < n; x++) row.push(x === 0 ? '(nuevo)' : '');
      REG[key].rows.push(row); render(key); persist(key);
    };
    window.ccDel = function (key, i) { if (!REG[key]) return; REG[key].rows.splice(i, 1); render(key); persist(key); };

    function enhance() {
      document.querySelectorAll('tbody[id^="tb-"]').forEach(function (tb) {
        var key = tb.id.slice(3); if (!REG[key]) return;
        Array.prototype.forEach.call(tb.querySelectorAll('tr'), function (tr, ri) {
          if (tr.classList.contains('cc-empty') || tr.dataset.ccCrud) return;
          tr.dataset.ccCrud = '1';
          Array.prototype.forEach.call(tr.children, function (td, ci) {
            td.setAttribute('contenteditable', 'true'); td.dataset.k = key; td.dataset.i = ri; td.dataset.c = ci; td.style.outline = 'none';
          });
          var del = document.createElement('td'); del.style.width = '34px'; del.style.textAlign = 'center';
          del.innerHTML = '<button onclick="ccDel(\'' + key + '\',' + ri + ')" title="Eliminar fila" style="background:none;border:none;color:var(--muted);cursor:pointer"><span class="material-symbols-outlined" style="font-size:17px">close</span></button>';
          tr.appendChild(del);
        });
        var card = tb.closest('.card'); var tools = card && card.querySelector('.cardhead .tools');
        if (tools && !tools.querySelector('.cc-add')) {
          var b = document.createElement('button'); b.className = 'btn ghost sm cc-add';
          b.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px">add</span> Agregar';
          b.addEventListener('click', function () { window.ccAdd(key); });
          tools.insertBefore(b, tools.firstChild);
        }
      });
    }
    document.addEventListener('focusout', function (e) {
      var td = e.target; if (!td || !td.dataset || td.dataset.k === undefined) return;
      var k = td.dataset.k, i = +td.dataset.i, c = +td.dataset.c;
      if (REG[k] && REG[k].rows[i]) { REG[k].rows[i][c] = td.textContent.trim(); persist(k); }
    });
    enhance();
    try { new MutationObserver(function () { enhance(); }).observe(document.querySelector('.main') || document.body, { childList: true, subtree: true }); } catch (e) {}
  }

  window.addEventListener('load', function () {
    try { injectToggle(); } catch (e) {}
    try { injectBurger(); } catch (e) {}
    try { injectExport(); } catch (e) {}
    try { emptyStates(); } catch (e) {}
    try { injectCopy(); } catch (e) {}
    try { a11y(); } catch (e) {}
    try { crud(); } catch (e) {}
    try { if (window.ccStore && ccStore.getBranding) ccStore.getBranding().then(applyBranding).catch(function () {}); } catch (e) {}
  });
})();
