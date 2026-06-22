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

  return { getCalendario: getCalendario, setCalendario: setCalendario, getDocs: getDocs, setDocText: setDocText, getTabla: getTabla, setTabla: setTabla, hydrate: hydrate };
})();
