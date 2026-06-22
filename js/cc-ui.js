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

  window.addEventListener('load', function () {
    try { injectToggle(); } catch (e) {}
    try { injectExport(); } catch (e) {}
  });
})();
