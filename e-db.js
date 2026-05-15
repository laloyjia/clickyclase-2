warning: in the working copy of 'js/firebase-db.js', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/js/firebase-db.js b/js/firebase-db.js[m
[1mindex 03b7ac0..1e0b773 100644[m
[1m--- a/js/firebase-db.js[m
[1m+++ b/js/firebase-db.js[m
[36m@@ -556,12 +556,35 @@[m [mvar ELDB = (function() {[m
     log: function (tipo, meta) {[m
       try {[m
         if (!EL_DB || !EL_DB.collection) return Promise.resolve(null);[m
[31m-        var user = (typeof ELAuth !== 'undefined' && ELAuth.usuario) ? ELAuth.usuario : null;[m
[32m+[m[32m        // ELAuth expone el usuario como `user` (no `usuario`). Fallback al Firebase Auth nativo.[m
[32m+[m[32m        var user = null;[m
[32m+[m[32m        try {[m
[32m+[m[32m          if (typeof ELAuth !== 'undefined' && ELAuth.user) {[m
[32m+[m[32m            user = ELAuth.user;[m
[32m+[m[32m          } else if (typeof EL_AUTH !== 'undefined' && EL_AUTH.currentUser) {[m
[32m+[m[32m            var fb = EL_AUTH.currentUser;[m
[32m+[m[32m            user = {[m
[32m+[m[32m              uid: fb.uid,[m
[32m+[m[32m              email: fb.email || '',[m
[32m+[m[32m              nombre: fb.displayName || (fb.email ? fb.email.split('@')[0] : '')[m
[32m+[m[32m            };[m
[32m+[m[32m          }[m
[32m+[m[32m        } catch (eUser) { user = null; }[m
         var nowIso = new Date().toISOString();[m
[32m+[m[32m        // Derivar nombre: nombre > displayName > parte antes del @ del email[m
[32m+[m[32m        var _nombreFinal = '';[m
[32m+[m[32m        if (user) {[m
[32m+[m[32m          _nombreFinal = user.nombre || user.displayName || '';[m
[32m+[m[32m          if (!_nombreFinal && user.email) {[m
[32m+[m[32m            _nombreFinal = String(user.email).split('@')[0][m
[32m+[m[32m              .replace(/[._-]+/g, ' ')[m
[32m+[m[32m              .replace(/\b\w/g, function (c) { return c.toUpperCase(); });[m
[32m+[m[32m          }[m
[32m+[m[32m        }[m
         var entrada = {[m
           uid:        user ? (user.uid || '') : '',[m
           userEmail:  user ? (user.email || '') : '',[m
[31m-          userNombre: user ? (user.nombre || user.displayName || '') : '',[m
[32m+[m[32m          userNombre: _nombreFinal,[m
           tipo:       tipo || 'desconocido',[m
           tipoLabel:  ACTIVIDAD_TIPOS[tipo] || tipo,[m
           meta:       meta || {},[m
