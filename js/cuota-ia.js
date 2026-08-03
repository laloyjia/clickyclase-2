/**
 * cuota-ia.js — Click&Clase
 * ─────────────────────────────────────────────────────────────
 * Enforcement de límites de generación IA por colegio y por docente.
 *
 * Los límites se configuran en `liceos/{slug}`:
 *   - limiteGeneracionesMes:     total del colegio por mes (null = ilimitado)
 *   - limiteGeneracionesDocente: por docente por mes (null = sin cuota individual)
 *
 * El consumo se cuenta sumando materiales + planificaciones con `creadoEn` del mes.
 *
 * API pública:
 *   window.CCCuotaIA.verificar()         → Promise<{ok, razon, consumo, limite}>
 *   window.CCCuotaIA.mostrarBloqueado(info)  → muestra modal amigable
 *   window.CCCuotaIA.wrapFetch(url, options) → wrapper que verifica antes de llamar
 *   window.CCCuotaIA.invalidarCache()    → forzar recount la próxima vez
 *   window.CCCuotaIA.consumoDetallado()  → Promise<{colegio, docente}>
 *
 * Uso típico:
 *   CCCuotaIA.verificar().then(function(r){
 *     if (!r.ok) { CCCuotaIA.mostrarBloqueado(r); return; }
 *     // proceder con la generación
 *   });
 */
(function () {
  'use strict';

  var CACHE_MS = 60000;   // 60 s
  var _cache = null;      // { ts, info }

  function _mes() {
    return new Date().toISOString().slice(0, 7);   // "2026-08"
  }

  function _user() {
    return (window.ELAuth && ELAuth.user) || null;
  }

  // Cuenta docs en una colección para un liceo + mes actual (opcional: filtrar por uid)
  function _contar(coleccion, liceoSlug, docenteUid) {
    if (!window.EL_DB || !liceoSlug) return Promise.resolve(0);
    var mes = _mes();
    return EL_DB.collection(coleccion).get().then(function (snap) {
      var n = 0;
      snap.forEach(function (d) {
        var x = d.data();
        if (!x) return;
        if (x.liceoSlug !== liceoSlug) return;
        var f = String(x.creadoEn || x.fecha || x.createdAt || '').slice(0, 7);
        if (f !== mes) return;
        if (docenteUid) {
          var uid = x.autorUid || x.profesorUid || x.docenteUid || x.creadoPorUid;
          if (uid !== docenteUid) return;
        }
        n++;
      });
      return n;
    }).catch(function () { return 0; });
  }

  // Cargar liceo con sus límites
  function _cargarLiceo(slug) {
    if (!slug || !window.EL_DB) return Promise.resolve(null);
    return EL_DB.collection('liceos').doc(slug).get().then(function (d) {
      return d.exists ? d.data() : null;
    }).catch(function () { return null; });
  }

  /**
   * Verificar cuota. Devuelve promesa con:
   *   { ok:boolean, razon?, consumoTotal, consumoDocente, limiteTotal, limiteDocente }
   * Si el user es individual (sin liceo) → ok:true (sin límites)
   * Cachea por 60s.
   */
  function verificar() {
    if (_cache && (Date.now() - _cache.ts) < CACHE_MS) {
      return Promise.resolve(_cache.info);
    }
    var u = _user();
    if (!u) return Promise.resolve({ ok: true, razon: 'sin usuario' });
    var liceoSlug = u.liceoSlug || (u.liceos && u.liceos[0]) || '';
    if (!liceoSlug) return Promise.resolve({ ok: true, razon: 'individual (sin colegio)' });

    return Promise.all([
      _cargarLiceo(liceoSlug),
      _contar('materiales', liceoSlug),
      _contar('planificaciones', liceoSlug),
      _contar('materiales', liceoSlug, u.uid),
      _contar('planificaciones', liceoSlug, u.uid)
    ]).then(function (r) {
      var liceo = r[0] || {};
      var consumoTotal = (r[1] || 0) + (r[2] || 0);
      var consumoDocente = (r[3] || 0) + (r[4] || 0);
      var limiteTotal = liceo.limiteGeneracionesMes;
      var limiteDocente = liceo.limiteGeneracionesDocente;
      var info = {
        ok: true,
        consumoTotal: consumoTotal,
        consumoDocente: consumoDocente,
        limiteTotal: (limiteTotal != null && !isNaN(limiteTotal)) ? Number(limiteTotal) : null,
        limiteDocente: (limiteDocente != null && !isNaN(limiteDocente)) ? Number(limiteDocente) : null,
        liceoNombre: liceo.nombre || liceoSlug
      };
      if (info.limiteDocente != null && consumoDocente >= info.limiteDocente) {
        info.ok = false;
        info.razon = 'docente';
      } else if (info.limiteTotal != null && consumoTotal >= info.limiteTotal) {
        info.ok = false;
        info.razon = 'colegio';
      }
      _cache = { ts: Date.now(), info: info };
      return info;
    });
  }

  function invalidarCache() { _cache = null; }

  // Modal amigable cuando la cuota fue alcanzada
  function mostrarBloqueado(info) {
    var prev = document.getElementById('cuotaBloqueadoMask');
    if (prev) prev.remove();
    var titulo, msg, ico = '⛔';
    if (info.razon === 'docente') {
      titulo = 'Alcanzaste tu cuota mensual de generaciones IA';
      msg = 'Este mes ya generaste <b>' + info.consumoDocente + '</b> documentos con IA.<br>' +
            'Tu cuota individual es de <b>' + info.limiteDocente + '</b> por mes.<br><br>' +
            '<span style="color:#64748b">La cuota se reinicia el 1° del próximo mes.<br>' +
            'Si necesitás más, contactá al administrador del colegio.</span>';
    } else if (info.razon === 'colegio') {
      titulo = 'El colegio alcanzó su cuota mensual de IA';
      msg = 'Este mes el colegio ya generó <b>' + info.consumoTotal + '</b> documentos con IA.<br>' +
            'El límite del plan es <b>' + info.limiteTotal + '</b> por mes.<br><br>' +
            '<span style="color:#64748b">La cuota se reinicia el 1° del próximo mes.<br>' +
            'Contactá al administrador para ampliar el plan si necesitás más.</span>';
    } else {
      titulo = 'No se pudo verificar tu cuota IA';
      msg = info.razon || 'Error desconocido.';
    }
    var wrap = document.createElement('div');
    wrap.id = 'cuotaBloqueadoMask';
    wrap.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:11500;display:flex;align-items:center;justify-content:center;padding:20px';
    wrap.innerHTML =
      '<div style="background:#fff;border-radius:16px;max-width:480px;width:100%;padding:0;overflow:hidden">'+
        '<div style="background:linear-gradient(135deg,#F59E0B,#DC2626);padding:20px 22px;color:#fff;text-align:center">'+
          '<div style="font-size:2.4rem">'+ico+'</div>'+
          '<h3 style="margin:8px 0 0;font-size:1.1rem;color:#fff">'+titulo+'</h3>'+
        '</div>'+
        '<div style="padding:20px 22px;font-size:.9rem;color:#0C1E3B;line-height:1.55">'+
          msg+
        '</div>'+
        '<div style="padding:14px 22px;background:#f8fafc;border-top:1px solid rgba(0,0,0,.06);text-align:right">'+
          '<button onclick="document.getElementById(\'cuotaBloqueadoMask\').remove()" '+
            'style="padding:9px 18px;border:0;background:#0EA5E9;color:#fff;border-radius:8px;cursor:pointer;font-weight:700">Entendido</button>'+
        '</div>'+
      '</div>';
    document.body.appendChild(wrap);
  }

  /**
   * Wrapper de fetch al endpoint IA. Verifica cuota antes de llamar.
   * Si excede, rechaza con Error y muestra modal.
   * Si el backend devuelve 429, también muestra modal.
   *
   * Uso:
   *   CCCuotaIA.wrapFetch('/api/ia-asistente', {method:'POST', body:...})
   *     .then(...)
   */
  function wrapFetch(url, options) {
    return verificar().then(function (info) {
      if (!info.ok) {
        mostrarBloqueado(info);
        var e = new Error('CUOTA_EXCEDIDA');
        e.info = info;
        throw e;
      }
      // Adjuntar ID token si está disponible (para verificación backend)
      var pToken = Promise.resolve(null);
      if (window.ELAuth && ELAuth._firebaseUser && typeof ELAuth._firebaseUser.getIdToken === 'function') {
        pToken = ELAuth._firebaseUser.getIdToken().catch(function(){return null;});
      } else if (window.firebase && firebase.auth && firebase.auth().currentUser) {
        pToken = firebase.auth().currentUser.getIdToken().catch(function(){return null;});
      }
      return pToken.then(function (token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        if (token) options.headers['Authorization'] = 'Bearer ' + token;
        return fetch(url, options).then(function (r) {
          if (r.status === 429) {
            return r.json().catch(function(){return{};}).then(function (data) {
              var backInfo = data.info || info;
              backInfo.ok = false;
              backInfo.razon = data.razon || backInfo.razon || 'cuota';
              mostrarBloqueado(backInfo);
              invalidarCache();
              var e = new Error('CUOTA_EXCEDIDA_BACKEND');
              e.info = backInfo;
              throw e;
            });
          }
          return r;
        });
      });
    });
  }

  function consumoDetallado() {
    return verificar();
  }

  window.CCCuotaIA = {
    verificar: verificar,
    mostrarBloqueado: mostrarBloqueado,
    wrapFetch: wrapFetch,
    invalidarCache: invalidarCache,
    consumoDetallado: consumoDetallado
  };
})();
