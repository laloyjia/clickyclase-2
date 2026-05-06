/* ============================================================
   Click&Clase — UI utilities premium
   Toasts, confirmaciones, sanitización, confetti, count-up,
   tilt/glow para tarjetas y helpers reutilizables.
   Cargar después de styles.css y antes de scripts de página.
   ============================================================ */
(function (global) {
  'use strict';

  // -------------------------------------------------------- toasts
  function ensureHost() {
    let host = document.getElementById('el-toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'el-toast-host';
      host.className = 'toast-host';
      document.body.appendChild(host);
    }
    return host;
  }
  const ICONS = {
    success: '✓',
    error:   '✕',
    info:    'i',
    warn:    '!'
  };
  function toast(message, opts = {}) {
    const host = ensureHost();
    const type = ['success','error','info','warn'].includes(opts.type) ? opts.type : 'info';
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.setAttribute('role', type === 'error' ? 'alert' : 'status');
    el.innerHTML = `
      <div class="toast-ico">${ICONS[type]}</div>
      <div class="toast-body" style="flex:1; line-height:1.3;"></div>
      <button aria-label="Cerrar" style="background:transparent;border:0;color:inherit;cursor:pointer;font-size:1rem;opacity:.6">×</button>
    `;
    el.querySelector('.toast-body').textContent = message;
    el.querySelector('button').onclick = () => closeToast(el);
    host.appendChild(el);
    const ttl = opts.duration || 3500;
    const timer = setTimeout(() => closeToast(el), ttl);
    el._timer = timer;
    return el;
  }
  function closeToast(el) {
    if (!el || !el.parentNode) return;
    clearTimeout(el._timer);
    el.classList.add('out');
    setTimeout(() => el.remove(), 250);
  }

  // -------------------------------------------------------- confirm modal premium (Promise)
  function confirmDialog({ title = '¿Confirmar acción?', message = '', okText = 'Confirmar', cancelText = 'Cancelar', danger = false } = {}) {
    return new Promise((resolve) => {
      const back = document.createElement('div');
      back.className = 'modal-pro-backdrop';
      back.innerHTML = `
        <div class="modal-pro" role="dialog" aria-modal="true">
          <h3></h3>
          <p></p>
          <div class="modal-actions">
            <button class="btn-pro ghost" data-act="cancel"></button>
            <button class="btn-pro ${danger ? 'warm' : 'primary'}" data-act="ok"></button>
          </div>
        </div>`;
      back.querySelector('h3').textContent = title;
      back.querySelector('p').textContent  = message;
      back.querySelector('[data-act="cancel"]').textContent = cancelText;
      back.querySelector('[data-act="ok"]').textContent     = okText;

      function close(val) {
        document.removeEventListener('keydown', onKey);
        back.remove();
        document.body.classList.remove('no-scroll');
        resolve(val);
      }
      function onKey(e) {
        if (e.key === 'Escape') close(false);
        if (e.key === 'Enter')  close(true);
      }
      back.addEventListener('click', (e) => { if (e.target === back) close(false); });
      back.querySelector('[data-act="cancel"]').onclick = () => close(false);
      back.querySelector('[data-act="ok"]').onclick     = () => close(true);
      document.addEventListener('keydown', onKey);
      document.body.classList.add('no-scroll');
      document.body.appendChild(back);

      // foco inicial
      setTimeout(() => back.querySelector('[data-act="ok"]').focus(), 50);
    });
  }

  // -------------------------------------------------------- focus trap helper para modales propios
  function trapFocus(modalEl) {
    const focusables = modalEl.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return () => {};
    const first = focusables[0], last = focusables[focusables.length - 1];
    function onKey(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    modalEl.addEventListener('keydown', onKey);
    first.focus();
    return () => modalEl.removeEventListener('keydown', onKey);
  }

  // -------------------------------------------------------- sanitización HTML básica
  // Permite tags inocuos pero remueve <script>, atributos on*, javascript: y <iframe>/<object>/<embed>.
  function sanitize(html) {
    if (typeof html !== 'string') return '';
    const tmpl = document.createElement('template');
    tmpl.innerHTML = html;
    const walker = document.createTreeWalker(tmpl.content, NodeFilter.SHOW_ELEMENT);
    const dropTags = new Set(['SCRIPT','IFRAME','OBJECT','EMBED','LINK','META','STYLE']);
    const toDrop = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (dropTags.has(node.tagName)) { toDrop.push(node); continue; }
      // limpia atributos on* y javascript:
      [...node.attributes].forEach(attr => {
        const n = attr.name.toLowerCase();
        const v = (attr.value || '').toLowerCase().trim();
        if (n.startsWith('on') || (['href','src','xlink:href','formaction'].includes(n) && v.startsWith('javascript:'))) {
          node.removeAttribute(attr.name);
        }
      });
    }
    toDrop.forEach(n => n.remove());
    return tmpl.innerHTML;
  }

  // -------------------------------------------------------- count-up animado
  function countUp(el, target, { duration = 900, decimals = 0, prefix = '', suffix = '' } = {}) {
    if (!el) return;
    const t0 = performance.now();
    const start = parseFloat(el.dataset.cuStart || '0') || 0;
    const end = Number(target);
    if (!Number.isFinite(end)) { el.textContent = `${prefix}${target}${suffix}`; return; }
    function frame(now) {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = start + (end - start) * eased;
      el.textContent = `${prefix}${val.toFixed(decimals)}${suffix}`;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // -------------------------------------------------------- confetti ligero (canvas-less)
  function confetti({ amount = 90, duration = 2200, colors = ['#7c3aed','#22d3ee','#f472b6','#fcd34d','#34d399'] } = {}) {
    const host = document.createElement('div');
    host.className = 'confetti-host';
    document.body.appendChild(host);
    for (let i = 0; i < amount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const x = Math.random() * 100;
      const dx = (Math.random() - 0.5) * 240;
      const delay = Math.random() * 350;
      const dur = duration + Math.random() * 600;
      piece.style.left = `${x}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--dx', `${dx}px`);
      piece.style.animationDuration = `${dur}ms`;
      piece.style.animationDelay = `${delay}ms`;
      piece.style.transform = `translateY(-20px) rotate(${Math.random() * 360}deg)`;
      host.appendChild(piece);
    }
    setTimeout(() => host.remove(), duration + 1200);
  }

  // -------------------------------------------------------- mouse-glow para tarjetas .card-pro
  function bindCardGlow(scope = document) {
    scope.querySelectorAll('.card-pro, .stat-pro').forEach(card => {
      if (card.dataset.glowBound) return;
      card.dataset.glowBound = '1';
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  }

  // -------------------------------------------------------- safe email helpers
  function safeEmailHandle(email, fallback = 'usuario') {
    if (!email || typeof email !== 'string') return fallback;
    const at = email.indexOf('@');
    return at > 0 ? email.slice(0, at) : email || fallback;
  }
  function initials(text, max = 2) {
    if (!text) return '·';
    return text.trim().split(/\s+/).map(p => p[0]).join('').slice(0, max).toUpperCase();
  }

  // -------------------------------------------------------- skeleton helpers
  function skeletonGrid(host, items = 6, opts = {}) {
    if (!host) return;
    host.innerHTML = '';
    for (let i = 0; i < items; i++) {
      const sk = document.createElement('div');
      sk.className = 'skeleton skeleton-card';
      sk.style.minHeight = (opts.h || 110) + 'px';
      host.appendChild(sk);
    }
  }

  // -------------------------------------------------------- mobile sidebar drawer
  function bindSidebarDrawer({ sidebarSelector = '.side-pro', hambSelector = '.btn-hamb' } = {}) {
    const side = document.querySelector(sidebarSelector);
    const hamb = document.querySelector(hambSelector);
    if (!side || !hamb) return;
    hamb.addEventListener('click', () => side.classList.toggle('is-open'));
    side.addEventListener('click', (e) => { if (e.target.matches('.side-item')) side.classList.remove('is-open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') side.classList.remove('is-open'); });
  }

  // -------------------------------------------------------- bootstrap auto-glow on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bindCardGlow());
  } else {
    bindCardGlow();
  }

  global.ELUI = {
    toast, closeToast, confirm: confirmDialog, trapFocus,
    sanitize, countUp, confetti, bindCardGlow,
    safeEmailHandle, initials, skeletonGrid, bindSidebarDrawer
  };
})(window);
