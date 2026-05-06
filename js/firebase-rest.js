/**
 * firebase-rest.js
 * Click&Clase — Cliente Firestore via REST API (reemplaza el SDK de Firestore)
 *
 * Por qué esto existe:
 *   El SDK de Firestore usa gRPC-Web / long-polling a firestore.googleapis.com
 *   y en algunos entornos no puede conectar ("client is offline").
 *   La REST API de Firestore usa HTTPS puro (igual que Firebase Auth) y siempre funciona.
 *
 * API pública — idéntica al SDK de Firestore compat:
 *   EL_DB.collection(name)
 *     .doc(id)   → .get()  .set(data)  .update(data)  .delete()
 *     .add(data)
 *     .where(field, op, value)
 *     .orderBy(field, dir?)
 *     .limit(n)
 *     .get()
 *     .onSnapshot(callback)   ← polling cada 8 s como fallback
 *   EL_DB.batch()
 *     .set(docRef, data)  .update(docRef, data)  .delete(docRef)
 *     .commit()
 *   EL_DB.FieldValue.serverTimestamp()
 *   EL_DB.FieldValue.increment(n)
 *
 * Compatibilidad con firebase-db.js:
 *   firebase.firestore.FieldValue  →  apunta a EL_DB.FieldValue
 */

var EL_DB = (function () {
  'use strict';

  // ── Configuración ────────────────────────────────────────────
  var _project = null;
  var _baseUrl  = null;

  function _init(projectId) {
    _project = projectId;
    _baseUrl  = 'https://firestore.googleapis.com/v1/projects/' + projectId +
                '/databases/(default)/documents';
  }

  // ── Token de autenticación ───────────────────────────────────
  function _getToken() {
    if (window.EL_AUTH && window.EL_AUTH.currentUser) {
      return window.EL_AUTH.currentUser.getIdToken(false);
    }
    return Promise.resolve(null);
  }

  // ── fetch con auth ───────────────────────────────────────────
  function _fetch(url, opts) {
    return _getToken().then(function (token) {
      opts = opts || {};
      opts.headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
      if (token) opts.headers['Authorization'] = 'Bearer ' + token;
      return fetch(url, opts);
    }).then(function (res) { return res.json(); });
  }

  // ── Convertir JS → Firestore REST ────────────────────────────
  function _toFSV(v) {
    if (v === null || v === undefined)             return { nullValue: null };
    if (v && v.__fsType === 'serverTimestamp')     return { timestampValue: new Date().toISOString() };
    if (v && v.__fsType === 'increment')           return null; // manejado como transform
    if (typeof v === 'boolean')                    return { booleanValue: v };
    if (typeof v === 'number')
      return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
    if (typeof v === 'string')                     return { stringValue: v };
    if (v instanceof Date)                         return { timestampValue: v.toISOString() };
    if (Array.isArray(v))
      return { arrayValue: { values: v.filter(function(x){return x!=null;}).map(_toFSV) } };
    if (typeof v === 'object') {
      var fields = {};
      Object.keys(v).forEach(function (k) { fields[k] = _toFSV(v[k]); });
      return { mapValue: { fields: fields } };
    }
    return { stringValue: String(v) };
  }

  // ── Convertir Firestore REST → JS ────────────────────────────
  function _fromFSV(fsv) {
    if (!fsv) return null;
    if ('nullValue'      in fsv) return null;
    if ('booleanValue'   in fsv) return fsv.booleanValue;
    if ('integerValue'   in fsv) return parseInt(fsv.integerValue, 10);
    if ('doubleValue'    in fsv) return fsv.doubleValue;
    if ('stringValue'    in fsv) return fsv.stringValue;
    if ('timestampValue' in fsv) return fsv.timestampValue;
    if ('referenceValue' in fsv) return fsv.referenceValue;
    if ('arrayValue'     in fsv)
      return ((fsv.arrayValue && fsv.arrayValue.values) || []).map(_fromFSV);
    if ('mapValue' in fsv)       return _fromFSFields((fsv.mapValue && fsv.mapValue.fields) || {});
    return null;
  }

  function _fromFSFields(fields) {
    var obj = {};
    if (fields) Object.keys(fields).forEach(function (k) { obj[k] = _fromFSV(fields[k]); });
    return obj;
  }

  function _toFSDoc(data) {
    var fields = {};
    Object.keys(data).forEach(function (k) {
      var v = data[k];
      if (v && v.__fsType !== 'increment') fields[k] = _toFSV(v);
    });
    return { fields: fields };
  }

  function _docId(name) {
    return name ? name.split('/').pop() : _genId();
  }

  // ── Genera ID aleatorio (20 chars, igual que Firestore auto-id) ──
  function _genId() {
    var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var id = '';
    for (var i = 0; i < 20; i++) id += c[Math.floor(Math.random() * c.length)];
    return id;
  }

  // ── Operadores de query ──────────────────────────────────────
  var _OPS = {
    '==':              'EQUAL',
    '!=':              'NOT_EQUAL',
    '>':               'GREATER_THAN',
    '>=':              'GREATER_THAN_OR_EQUAL',
    '<':               'LESS_THAN',
    '<=':              'LESS_THAN_OR_EQUAL',
    'array-contains':  'ARRAY_CONTAINS',
    'in':              'IN',
    'not-in':          'NOT_IN'
  };

  // ════════════════════════════════════════════════════════════
  //  DocumentReference
  // ════════════════════════════════════════════════════════════
  // fullPath: complete path including any parent segments, e.g. "col/id" or "col/id/sub/subId"
  function DocRef(fullPath, docId) {
    // Support both DocRef(collName, id) and DocRef(fullPath) where fullPath already includes the id
    if (docId !== undefined) {
      this.id   = docId;
      this.path = fullPath + '/' + docId;
    } else {
      // fullPath is already the complete document path
      var parts  = fullPath.split('/');
      this.id    = parts[parts.length - 1];
      this.path  = fullPath;
    }
    this.collName = this.path.split('/').slice(0, -1).join('/'); // parent collection path
  }

  /** Returns a subcollection reference under this document */
  DocRef.prototype.collection = function (subCollName) {
    return new CollRef(subCollName, this.path);
  };

  /** GET — retorna { exists, id, data() } */
  DocRef.prototype.get = function () {
    var self = this;
    return _fetch(_baseUrl + '/' + self.path).then(function (data) {
      if (data.error) {
        var code = data.error.code || 0;
        var status = data.error.status || '';
        if (code === 404 || code === 5 || status === 'NOT_FOUND') {
          return { exists: false, id: self.id, data: function () { return null; } };
        }
        var err = new Error(data.error.message || JSON.stringify(data.error));
        err.code = status;
        throw err;
      }
      var docData = _fromFSFields(data.fields);
      return { exists: true, id: self.id, data: function () { return docData; } };
    });
  };

  /** SET (reemplaza el documento completo) */
  DocRef.prototype.set = function (data) {
    var self = this;
    return _fetch(_baseUrl + '/' + self.path, {
      method: 'PATCH',
      body:   JSON.stringify(_toFSDoc(data))
    }).then(function (result) {
      if (result && result.error)
        throw new Error(result.error.message || JSON.stringify(result.error));
      return result;
    });
  };

  /** UPDATE (actualiza campos específicos + soporta increment) */
  DocRef.prototype.update = function (data) {
    var self    = this;
    var incrMap = {};
    var regular = {};

    Object.keys(data).forEach(function (k) {
      var v = data[k];
      if (v && v.__fsType === 'increment') incrMap[k] = v.__fsValue;
      else                                  regular[k]  = v;
    });

    var docPath = 'projects/' + _project + '/databases/(default)/documents/' + self.path;
    var writes  = [];

    // Campos regulares con updateMask
    if (Object.keys(regular).length > 0) {
      writes.push({
        update:     Object.assign({ name: docPath }, _toFSDoc(regular)),
        updateMask: { fieldPaths: Object.keys(regular) }
      });
    }

    // Transforms para increment
    if (Object.keys(incrMap).length > 0) {
      writes.push({
        transform: {
          document: docPath,
          fieldTransforms: Object.keys(incrMap).map(function (k) {
            var n = incrMap[k];
            return {
              fieldPath: k,
              increment: Number.isInteger(n) ? { integerValue: String(n) } : { doubleValue: n }
            };
          })
        }
      });
    }

    // Si no hay nada que hacer
    if (writes.length === 0) return Promise.resolve();

    return _fetch('https://firestore.googleapis.com/v1/projects/' + _project +
                  '/databases/(default)/documents:commit', {
      method: 'POST',
      body:   JSON.stringify({ writes: writes })
    }).then(function (result) {
      if (result && result.error)
        throw new Error(result.error.message || JSON.stringify(result.error));
      return result;
    });
  };

  /** DELETE */
  DocRef.prototype.delete = function () {
    var self = this;
    return _fetch(_baseUrl + '/' + self.path, { method: 'DELETE' })
      .then(function (result) {
        if (result && result.error)
          throw new Error(result.error.message || JSON.stringify(result.error));
        return result;
      });
  };

  // ════════════════════════════════════════════════════════════
  //  CollectionReference
  //  parentPath: full path of the parent document for subcollections (optional)
  // ════════════════════════════════════════════════════════════
  function CollRef(collName, parentPath) {
    this.collName   = collName;
    this.parentPath = parentPath || null; // e.g. "calendarios_docentes/uid123"
    this._filters   = [];
    this._orders    = [];
    this._limitVal  = null;
  }

  CollRef.prototype._fullCollPath = function () {
    return this.parentPath ? this.parentPath + '/' + this.collName : this.collName;
  };

  CollRef.prototype.doc = function (id) {
    var docPath = this._fullCollPath() + '/' + (id || _genId());
    return new DocRef(docPath);
  };

  CollRef.prototype.add = function (data) {
    // POST genera auto-ID en el servidor
    var self = this;
    return _fetch(_baseUrl + '/' + self._fullCollPath(), {
      method: 'POST',
      body:   JSON.stringify(_toFSDoc(data))
    }).then(function (result) {
      if (result && result.error)
        throw new Error(result.error.message || JSON.stringify(result.error));
      var id = _docId(result.name);
      return { id: id };
    });
  };

  CollRef.prototype._clone = function () {
    var c       = new CollRef(this.collName, this.parentPath);
    c._filters  = this._filters.slice();
    c._orders   = this._orders.slice();
    c._limitVal = this._limitVal;
    return c;
  };

  CollRef.prototype.where = function (field, op, value) {
    var c      = this._clone();
    c._filters = this._filters.concat([{ field: field, op: op, value: value }]);
    return c;
  };

  CollRef.prototype.orderBy = function (field, dir) {
    var c     = this._clone();
    c._orders = this._orders.concat([{
      field:     field,
      direction: (dir === 'asc') ? 'ASCENDING' : 'DESCENDING'
    }]);
    return c;
  };

  CollRef.prototype.limit = function (n) {
    var c       = this._clone();
    c._limitVal = n;
    return c;
  };

  CollRef.prototype.get = function () {
    var self    = this;
    // For subcollections: query runs relative to parent document path
    var queryBase = self.parentPath
      ? _baseUrl + '/' + self.parentPath + ':runQuery'
      : _baseUrl + ':runQuery';
    var sq = { from: [{ collectionId: self.collName }] };

    // Filtros
    if (self._filters.length === 1) {
      var f = self._filters[0];
      sq.where = {
        fieldFilter: {
          field: { fieldPath: f.field },
          op:    _OPS[f.op] || 'EQUAL',
          value: _toFSV(f.value)
        }
      };
    } else if (self._filters.length > 1) {
      sq.where = {
        compositeFilter: {
          op:      'AND',
          filters: self._filters.map(function (f) {
            return {
              fieldFilter: {
                field: { fieldPath: f.field },
                op:    _OPS[f.op] || 'EQUAL',
                value: _toFSV(f.value)
              }
            };
          })
        }
      };
    }

    // Orden
    if (self._orders.length > 0) {
      sq.orderBy = self._orders.map(function (o) {
        return { field: { fieldPath: o.field }, direction: o.direction };
      });
    }

    if (self._limitVal) sq.limit = self._limitVal;

    return _fetch(queryBase, {
      method: 'POST',
      body:   JSON.stringify({ structuredQuery: sq })
    }).then(function (results) {
      if (!Array.isArray(results)) {
        if (results && results.error) {
          // 400 = index requerido o colección vacía — devolver vacío silenciosamente
          var code = results.error.code || 0;
          if (code === 400 || code === 9) return _makeSnap([]);
          throw new Error(results.error.message || JSON.stringify(results.error));
        }
        return _makeSnap([]);
      }
      var docs = results
        .filter(function (r) { return r.document; })
        .map(function (r) {
          var id      = _docId(r.document.name);
          var docData = _fromFSFields(r.document.fields);
          return {
            exists: true,
            id:     id,
            data:   function () { return docData; }
          };
        });
      return _makeSnap(docs);
    });
  };

  /** onSnapshot: polling cada 8 s (REST no soporta streams) */
  CollRef.prototype.onSnapshot = function (callback) {
    var self   = this._clone();
    var active = true;
    function poll() {
      if (!active) return;
      self.get().then(function (snap) {
        callback(snap);
      }).catch(function (e) {
        console.warn('[EL_DB] onSnapshot error:', e.message);
      }).then(function () {
        if (active) setTimeout(poll, 8000);
      });
    }
    setTimeout(poll, 200);
    return function () { active = false; };   // unsubscribe
  };

  function _makeSnap(docs) {
    return {
      empty:   docs.length === 0,
      size:    docs.length,
      docs:    docs,
      forEach: function (fn) { docs.forEach(fn); }
    };
  }

  // ════════════════════════════════════════════════════════════
  //  WriteBatch
  // ════════════════════════════════════════════════════════════
  function Batch() { this._writes = []; }

  Batch.prototype.set = function (docRef, data) {
    var docPath = 'projects/' + _project + '/databases/(default)/documents/' + docRef.path;
    this._writes.push({ update: Object.assign({ name: docPath }, _toFSDoc(data)) });
    return this;
  };

  Batch.prototype.update = function (docRef, data) {
    var docPath = 'projects/' + _project + '/databases/(default)/documents/' + docRef.path;
    var incrMap = {};
    var regular = {};
    Object.keys(data).forEach(function (k) {
      var v = data[k];
      if (v && v.__fsType === 'increment') incrMap[k] = v.__fsValue;
      else                                  regular[k]  = v;
    });

    if (Object.keys(regular).length > 0) {
      this._writes.push({
        update:     Object.assign({ name: docPath }, _toFSDoc(regular)),
        updateMask: { fieldPaths: Object.keys(regular) }
      });
    }
    if (Object.keys(incrMap).length > 0) {
      this._writes.push({
        transform: {
          document: docPath,
          fieldTransforms: Object.keys(incrMap).map(function (k) {
            var n = incrMap[k];
            return {
              fieldPath: k,
              increment: Number.isInteger(n) ? { integerValue: String(n) } : { doubleValue: n }
            };
          })
        }
      });
    }
    return this;
  };

  Batch.prototype.delete = function (docRef) {
    var docPath = 'projects/' + _project + '/databases/(default)/documents/' + docRef.path;
    this._writes.push({ delete: docPath });
    return this;
  };

  Batch.prototype.commit = function () {
    var self = this;
    return _fetch('https://firestore.googleapis.com/v1/projects/' + _project +
                  '/databases/(default)/documents:commit', {
      method: 'POST',
      body:   JSON.stringify({ writes: self._writes })
    }).then(function (result) {
      if (result && result.error)
        throw new Error(result.error.message || JSON.stringify(result.error));
      return result;
    });
  };

  // ════════════════════════════════════════════════════════════
  //  FieldValue sentinels  (compatibles con firebase-db.js)
  // ════════════════════════════════════════════════════════════
  var FieldValue = {
    serverTimestamp: function () { return { __fsType: 'serverTimestamp' }; },
    increment:       function (n) { return { __fsType: 'increment', __fsValue: n }; }
  };

  // ════════════════════════════════════════════════════════════
  //  API pública
  // ════════════════════════════════════════════════════════════
  return {
    _init:      _init,
    collection: function (name) { return new CollRef(name); },
    batch:      function () { return new Batch(); },
    FieldValue: FieldValue
  };
})();

// Nota: firebase-db.js usa EL_DB.FieldValue directamente (ya actualizado).
// No se necesita parche de compatibilidad con firebase.firestore.FieldValue.
