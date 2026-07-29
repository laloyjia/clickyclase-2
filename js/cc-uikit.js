/**
 * cc-uikit.js — Sistema visual unificado Click&Clase (helpers de layout)
 *
 * Complemento de cc-ui.js (que ya maneja tema y export Excel).
 * Este archivo aporta helpers para HERO, KPI CARDS, EMPTY STATES,
 * SKELETON LOADERS, BADGES y TIMELINE — usados en los rediseños
 * del libro de clases, historial y notas.
 *
 * Uso:
 *   document.getElementById('root').innerHTML =
 *     CCKit.hero({emoji:'📖', title:'Libro de Clases', sub:'...'}) +
 *     CCKit.kpiRow([{emoji:'✅', label:'Firmadas', value:3, tone:'ok'}]) +
 *     CCKit.emptyState({emoji:'📭', title:'Sin datos', cta:{label:'Crear'}});
 */
(function () {
  'use strict';

  var CSS = [
    '/* ─── CCKit unified system ─── */',
    ':root{',
    '  --cck-hero-grad: linear-gradient(135deg,#EEF4FF 0%,#E0F2FE 100%);',
    '  --cck-primary:#2563EB; --cck-primary-2:#38BDF8;',
    '  --cck-ok:#059669; --cck-warn:#F59E0B; --cck-err:#DC2626; --cck-info:#1D4ED8;',
    '  --cck-muted:#64748B; --cck-panel:#FFFFFF; --cck-border:rgba(37,99,235,.14);',
    '}',

    /* Hero */
    '.cck-hero{background:var(--cck-hero-grad);border-radius:16px;padding:22px 26px;',
    '  margin:8px 0 22px;display:flex;align-items:flex-start;justify-content:space-between;',
    '  gap:20px;flex-wrap:wrap;border:1px solid var(--cck-border)}',
    '.cck-hero .h-left{display:flex;gap:14px;align-items:center;min-width:0;flex:1}',
    '.cck-hero .h-emoji{font-size:2.2rem;line-height:1;flex-shrink:0}',
    '.cck-hero h1{margin:0;font-size:1.55rem;font-weight:800;color:#0C1E3B;letter-spacing:-.01em}',
    '.cck-hero .h-sub{margin:4px 0 0;color:var(--cck-muted);font-size:.88rem}',
    '.cck-hero .h-actions{display:flex;gap:8px;flex-wrap:wrap}',
    '.cck-hero .h-actions .btn{padding:9px 16px;border-radius:9px;border:1px solid var(--cck-border);',
    '  background:#fff;color:#0C1E3B;font-weight:600;text-decoration:none;cursor:pointer;',
    '  font-size:.86rem;display:inline-flex;align-items:center;gap:6px;transition:.2s}',
    '.cck-hero .h-actions .btn:hover{border-color:var(--cck-primary);color:var(--cck-primary);transform:translateY(-1px)}',
    '.cck-hero .h-actions .btn.primary{background:linear-gradient(135deg,#2563EB,#38BDF8);color:#fff;border-color:transparent}',

    /* KPIs */
    '.cck-kpi-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:22px}',
    '.cck-kpi{background:#fff;border:1px solid var(--cck-border);border-radius:14px;padding:16px 18px;',
    '  position:relative;overflow:hidden;transition:.2s}',
    '.cck-kpi:hover{border-color:var(--cck-primary);transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,99,235,.08)}',
    '.cck-kpi::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--cck-primary)}',
    '.cck-kpi.ok::before{background:var(--cck-ok)} .cck-kpi.warn::before{background:var(--cck-warn)}',
    '.cck-kpi.err::before{background:var(--cck-err)} .cck-kpi.info::before{background:var(--cck-info)}',
    '.cck-kpi .k-emoji{font-size:1.4rem;line-height:1;margin-bottom:6px}',
    '.cck-kpi .k-value{font-size:1.8rem;font-weight:800;color:#0C1E3B;line-height:1;margin:4px 0 2px}',
    '.cck-kpi .k-label{font-size:.75rem;color:var(--cck-muted);font-weight:600;text-transform:uppercase;letter-spacing:.5px}',
    '.cck-kpi .k-hint{font-size:.75rem;color:var(--cck-muted);margin-top:6px}',

    /* Empty state didáctico */
    '.cck-empty{background:#fff;border:1px dashed var(--cck-border);border-radius:14px;padding:44px 24px;text-align:center}',
    '.cck-empty .e-emoji{font-size:3rem;line-height:1;margin-bottom:8px}',
    '.cck-empty h3{margin:8px 0 6px;color:#0C1E3B;font-size:1.1rem}',
    '.cck-empty p{margin:0 auto 14px;color:var(--cck-muted);max-width:420px;font-size:.9rem}',
    '.cck-empty .e-cta{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;',
    '  background:linear-gradient(135deg,#2563EB,#38BDF8);color:#fff;border:none;border-radius:9px;',
    '  font-weight:700;cursor:pointer;text-decoration:none;font-size:.9rem}',

    /* Skeleton loader */
    '.cck-sk{background:linear-gradient(90deg,rgba(226,232,240,.6),rgba(203,213,225,.9),rgba(226,232,240,.6));',
    '  background-size:200% 100%;animation:cck-sk-shine 1.4s infinite;border-radius:6px}',
    '@keyframes cck-sk-shine{0%{background-position:200% 0}100%{background-position:-200% 0}}',
    '.cck-sk-row{display:flex;gap:10px;padding:12px 0;align-items:center}',
    '.cck-sk-row .cck-sk:nth-child(1){width:44px;height:44px;border-radius:50%}',
    '.cck-sk-row .cck-sk:nth-child(2){flex:1;height:14px}',
    '.cck-sk-row .cck-sk:nth-child(3){width:80px;height:14px}',

    /* Badges */
    '.cck-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:999px;',
    '  font-size:.72rem;font-weight:700;line-height:1;text-transform:uppercase;letter-spacing:.4px}',
    '.cck-badge.ok{background:rgba(5,150,105,.12);color:#047857}',
    '.cck-badge.warn{background:rgba(245,158,11,.15);color:#B45309}',
    '.cck-badge.err{background:rgba(220,38,38,.12);color:#B91C1C}',
    '.cck-badge.info{background:rgba(37,99,235,.12);color:#1D4ED8}',
    '.cck-badge.gray{background:rgba(100,116,139,.12);color:#475569}',

    /* Card genérica */
    '.cck-card{background:#fff;border:1px solid var(--cck-border);border-radius:14px;padding:18px 20px;margin-bottom:14px}',
    '.cck-card h2{margin:0 0 12px;font-size:.85rem;text-transform:uppercase;letter-spacing:.6px;color:var(--cck-muted);font-weight:700}',

    /* Card CLASE del día */
    '.cck-clase-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}',
    '.cck-clase{background:#fff;border:1px solid var(--cck-border);border-radius:14px;padding:16px;',
    '  cursor:pointer;transition:.2s;position:relative;overflow:hidden;text-align:left;font:inherit;color:inherit;width:100%}',
    '.cck-clase:hover{border-color:var(--cck-primary);transform:translateY(-2px);',
    '  box-shadow:0 10px 24px rgba(37,99,235,.12)}',
    '.cck-clase.firmada{background:rgba(5,150,105,.03);border-color:rgba(5,150,105,.25)}',
    '.cck-clase.borrador{background:rgba(245,158,11,.03);border-color:rgba(245,158,11,.25)}',
    '.cck-clase .cl-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}',
    '.cck-clase .cl-curso{font-weight:800;color:#0C1E3B;font-size:1.05rem}',
    '.cck-clase .cl-asig{color:var(--cck-primary);font-weight:600;font-size:.88rem;margin-bottom:6px}',
    '.cck-clase .cl-meta{color:var(--cck-muted);font-size:.78rem;margin-top:8px;padding-top:8px;border-top:1px solid rgba(226,232,240,.7)}',

    /* Timeline card */
    '.cck-tl{background:#fff;border:1px solid var(--cck-border);border-radius:12px;padding:14px 18px;',
    '  margin-bottom:10px;display:grid;grid-template-columns:60px 1fr auto auto;gap:14px;align-items:center;transition:.2s}',
    '.cck-tl:hover{border-color:var(--cck-primary);transform:translateX(2px)}',
    '.cck-tl .tl-date{text-align:center;padding:8px;background:var(--cck-hero-grad);border-radius:10px}',
    '.cck-tl .tl-day{font-weight:800;font-size:1.4rem;color:#0C1E3B;line-height:1}',
    '.cck-tl .tl-mon{font-size:.7rem;color:var(--cck-muted);text-transform:uppercase;font-weight:700}',
    '.cck-tl .tl-info h4{margin:0 0 4px;color:#0C1E3B;font-size:.98rem}',
    '.cck-tl .tl-info p{margin:0;color:var(--cck-muted);font-size:.82rem}',
    '.cck-tl .tl-asist{display:flex;gap:8px;font-size:.72rem;font-weight:700}',
    '.cck-tl .tl-asist span{padding:2px 8px;border-radius:6px}',
    '.cck-tl .tl-asist .P{background:rgba(5,150,105,.15);color:#047857}',
    '.cck-tl .tl-asist .A{background:rgba(220,38,38,.12);color:#B91C1C}',
    '.cck-tl .tl-asist .T{background:rgba(245,158,11,.15);color:#B45309}',
    '.cck-tl .tl-asist .J{background:rgba(29,78,216,.12);color:#1E40AF}',
    '.cck-tl-week-title{margin:18px 0 8px;font-size:.78rem;color:var(--cck-muted);',
    '  font-weight:700;text-transform:uppercase;letter-spacing:.6px}',

    /* Widget IA no debe tapar botones críticos */
    '#ia-widget-btn,#ia-widget-btn-launcher,.ia-widget-fab,.ia-widget-launcher{',
    '  bottom:auto !important;top:78px !important;right:20px !important;z-index:80 !important}',

    /* Responsive */
    '@media(max-width:640px){',
    '  .cck-hero{padding:16px 18px}',
    '  .cck-hero h1{font-size:1.25rem}',
    '  .cck-tl{grid-template-columns:50px 1fr;gap:10px}',
    '  .cck-tl .tl-asist,.cck-tl .tl-actions{grid-column:1/-1;justify-content:flex-start}',
    '}'
  ].join('\n');

  function _injectCSS() {
    if (document.getElementById('cck-styles')) return;
    var s = document.createElement('style');
    s.id = 'cck-styles';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[<>&"]/g, function (c) {
      return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
    });
  }

  function hero(opts) {
    opts = opts || {};
    var actions = (opts.actions || []).map(function (a) {
      var cls = 'btn' + (a.primary ? ' primary' : '');
      var attrs = a.href ? 'href="' + esc(a.href) + '"' : 'onclick="' + (a.onclick || '') + '"';
      var tag = a.href ? 'a' : 'button';
      return '<' + tag + ' class="' + cls + '" ' + attrs + '>' + (a.emoji ? a.emoji + ' ' : '') + esc(a.label) + '</' + tag + '>';
    }).join('');
    return '<div class="cck-hero">' +
      '<div class="h-left">' +
        (opts.emoji ? '<div class="h-emoji">' + opts.emoji + '</div>' : '') +
        '<div><h1>' + esc(opts.title || '') + '</h1>' +
        (opts.sub ? '<p class="h-sub">' + esc(opts.sub) + '</p>' : '') + '</div>' +
      '</div>' +
      (actions ? '<div class="h-actions">' + actions + '</div>' : '') +
      '</div>';
  }

  function kpi(opts) {
    opts = opts || {};
    var cls = 'cck-kpi' + (opts.tone ? ' ' + opts.tone : '');
    return '<div class="' + cls + '">' +
      (opts.emoji ? '<div class="k-emoji">' + opts.emoji + '</div>' : '') +
      '<div class="k-label">' + esc(opts.label || '') + '</div>' +
      '<div class="k-value">' + (opts.value == null ? '—' : esc(opts.value)) + '</div>' +
      (opts.hint ? '<div class="k-hint">' + esc(opts.hint) + '</div>' : '') +
      '</div>';
  }

  function kpiRow(kpis) {
    return '<div class="cck-kpi-row">' + (kpis || []).map(kpi).join('') + '</div>';
  }

  function emptyState(opts) {
    opts = opts || {};
    var cta = '';
    if (opts.cta) {
      var attrs = opts.cta.href ? 'href="' + esc(opts.cta.href) + '"' : 'onclick="' + (opts.cta.onclick || '') + '"';
      var tag = opts.cta.href ? 'a' : 'button';
      cta = '<' + tag + ' class="e-cta" ' + attrs + '>' + (opts.cta.emoji ? opts.cta.emoji + ' ' : '') + esc(opts.cta.label) + '</' + tag + '>';
    }
    return '<div class="cck-empty">' +
      '<div class="e-emoji">' + (opts.emoji || '📭') + '</div>' +
      '<h3>' + esc(opts.title || 'Sin datos aún') + '</h3>' +
      (opts.body ? '<p>' + esc(opts.body) + '</p>' : '') +
      cta +
      '</div>';
  }

  function skeletonRows(n) {
    var out = '';
    for (var i = 0; i < (n || 3); i++) {
      out += '<div class="cck-sk-row"><div class="cck-sk"></div><div class="cck-sk"></div><div class="cck-sk"></div></div>';
    }
    return out;
  }

  function badge(opts) {
    opts = opts || {};
    return '<span class="cck-badge ' + (opts.tone || 'gray') + '">' + esc(opts.text || '') + '</span>';
  }

  window.CCKit = {
    hero:         hero,
    kpi:          kpi,
    kpiRow:       kpiRow,
    emptyState:   emptyState,
    skeletonRows: skeletonRows,
    badge:        badge,
    esc:          esc
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _injectCSS);
  } else {
    _injectCSS();
  }
})();
