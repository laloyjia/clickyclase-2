/**
 * cc-store.js — Click&Clase
 * Conector de datos COMPARTIDOS del colegio (calendario y documentos).
 *
 * Estrategia segura: SIEMPRE responde con lo que haya en localStorage al
 * instante, y si Firestore está disponible (usuario autenticado) lo
 * sincroniza. Nunca lanza errores: si Firestore falla, sigue con localStorage.
 *
 * Guarda en:  organizaciones/{orgId}/config/calendario   { rowsJson }
 *             organizaciones/{orgId}/config/documentos    { docsJson }
 * (rows y docs van como JSON string para evitar limitaciones de Firestore
 *  con arreglos anidados.)
 */
var ccStore = (function () {
  var ORG = 'colegio-demo'; // colegio de prueba (multi-colegio real: leer del usuario)

  function _authReady() {
    return new Promise(function (res) {
      if (typeof window.EL_AUTH === 'undefined') { res(false); return; }
      if (window.EL_AUTH.currentUser) { res(true); return; }
      var done = false;
      try {
        window.EL_AUTH.onAuthStateChanged(function (u) { if (done) return; done = true; res(!!u); });
      } catch (e) { res(false); return; }
      setTimeout(function () {
        if (!done) { done = true; res(!!(window.EL_AUTH && window.EL_AUTH.currentUser)); }
      }, 4000);
    });
  }
  function lsGet(k, def) { try { return JSON.parse(localStorage.getItem(k) || def); } catch (e) { try { return JSON.parse(def); } catch (_) { return null; } } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function cfgDoc(name) { return EL_DB.collection('organizaciones').doc(ORG).collection('config').doc(name); }

  function getCalendario() {
    var local = lsGet('cc_calendario', '[]') || [];
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return local;
      return cfgDoc('calendario').get().then(function (d) {
        if (d.exists) { var v = d.data() || {}; if (v.rowsJson) { var rows = JSON.parse(v.rowsJson); lsSet('cc_calendario', rows); return rows; } }
        return local;
      }).catch(function () { return local; });
    });
  }
  function setCalendario(rows) {
    lsSet('cc_calendario', rows);
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return;
      return cfgDoc('calendario').set({ rowsJson: JSON.stringify(rows), updatedAt: new Date().toISOString() }).catch(function () {});
    });
  }
  function getDocs() {
    var local = lsGet('cc_docs', '{}') || {};
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return local;
      return cfgDoc('documentos').get().then(function (d) {
        if (d.exists) { var v = d.data() || {}; if (v.docsJson) { var docs = JSON.parse(v.docsJson); lsSet('cc_docs', docs); return docs; } }
        return local;
      }).catch(function () { return local; });
    });
  }
  function setDocText(title, text) {
    var docs = lsGet('cc_docs', '{}') || {}; docs[title] = text; lsSet('cc_docs', docs);
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return;
      return cfgDoc('documentos').set({ docsJson: JSON.stringify(docs), updatedAt: new Date().toISOString() }).catch(function () {});
    });
  }
  // ── Tablas de datos genéricas (casos, planes, estudiantes, etc.) ──
  // Guarda en organizaciones/{org}/datos/{key} como { rowsJson }.
  function getTabla(key) {
    var lk = 'cc_t_' + key;
    var local = lsGet(lk, 'null');
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return local;
      return EL_DB.collection('organizaciones').doc(ORG).collection('datos').doc(key).get().then(function (d) {
        if (d.exists) { var v = d.data() || {}; if (v.rowsJson) { var rows = JSON.parse(v.rowsJson); lsSet(lk, rows); return rows; } }
        return local;
      }).catch(function () { return local; });
    });
  }
  function setTabla(key, rows) {
    lsSet('cc_t_' + key, rows);
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return;
      return EL_DB.collection('organizaciones').doc(ORG).collection('datos').doc(key).set({ rowsJson: JSON.stringify(rows), updatedAt: new Date().toISOString() }).catch(function () {});
    });
  }
  // Hidrata todas las tablas de un objeto REG y persiste; helper para los paneles.
  function hydrate(prefix, REG, renderTable) {
    Object.keys(REG).forEach(function (k) {
      getTabla(prefix + '_' + k).then(function (rows) {
        if (rows && rows.length) { REG[k].rows = rows; try { renderTable(k); } catch (e) {} }
      }).catch(function () {});
    });
  }

  // ── Configuración arbitraria del colegio (academico, asignaciones, etc.) ──
  function getConfig(name) {
    var lk = 'cc_cfg_' + name;
    var local = lsGet(lk, 'null');
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return local;
      return cfgDoc(name).get().then(function (d) {
        if (d.exists) { var v = d.data() || {}; if (v.json) { var o = JSON.parse(v.json); lsSet(lk, o); return o; } }
        return local;
      }).catch(function () { return local; });
    });
  }
  function setConfig(name, obj) {
    lsSet('cc_cfg_' + name, obj);
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return;
      return cfgDoc(name).set({ json: JSON.stringify(obj), updatedAt: new Date().toISOString() }).catch(function () {});
    });
  }

  // ── Branding del colegio (color, nombre, logo) ──
  function getBranding() {
    var local = lsGet('cc_branding', 'null');
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return local;
      return EL_DB.collection('organizaciones').doc(ORG).collection('config').doc('branding').get().then(function (d) {
        if (d.exists) { var v = d.data() || {}; lsSet('cc_branding', v); return v; }
        return local;
      }).catch(function () { return local; });
    });
  }
  function setBranding(obj) {
    lsSet('cc_branding', obj);
    return _authReady().then(function (ok) {
      if (!ok || typeof EL_DB === 'undefined') return;
      return EL_DB.collection('organizaciones').doc(ORG).collection('config').doc('branding').set(obj).catch(function () {});
    });
  }

  // ── Guardia de rol: si el usuario logueado no corresponde a este panel,
  //   lo redirige a su propio panel. Sin sesión: deja pasar (vista demo).
  function guard(roles) {
    if (typeof ELAuth === 'undefined' || !ELAuth.onUserReady) return;
    var DEST = { admin: 'panel-admin.html', director: 'panel-director.html', utp: 'panel-utp.html', profesor: 'panel-profesor.html', amb_enc: 'panel-ambiente.html', amb_prof: 'panel-ambiente-prof.html', aps_enc: 'panel-apoyo.html', aps_prof: 'panel-apoyo-prof.html', pie_enc: 'panel-pie.html', pie_edu: 'panel-pie-edu.html' };
    var allow = (roles || []).concat(['admin', 'director']); // admin y dirección supervisan todo
    ELAuth.onUserReady(function (u) {
      if (!u || !u.role) return; // sin sesión: permitir vista de demostración
      if (allow.indexOf(u.role) === -1) { var d = DEST[u.role]; if (d) window.location.href = d; }
    });
  }

  return { getCalendario: getCalendario, setCalendario: setCalendario, getDocs: getDocs, setDocText: setDocText, getTabla: getTabla, setTabla: setTabla, hydrate: hydrate, getBranding: getBranding, setBranding: setBranding, guard: guard, getConfig: getConfig, setConfig: setConfig };
})();
