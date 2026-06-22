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

  window.addEventListener('load', function () {
    try { injectToggle(); } catch (e) {}
    try { injectBurger(); } catch (e) {}
    try { injectExport(); } catch (e) {}
    try { emptyStates(); } catch (e) {}
  });
})();
