/**
 * pin-firma.js — Sistema de PIN de firma para docentes (Click&Clase)
 *
 * Cada docente tiene un PIN personal de 6 dígitos que valida su identidad
 * al firmar el libro de clases. Análogo al sistema de LIRMI.
 *
 * MODELO en usuarios/{uid}:
 *   pinFirmaHash:  string (SHA-256 hex del salt+pin)
 *   pinFirmaSalt:  string (16 chars aleatorios)
 *   pinFirmaSetAt: ISO string (cuando el admin generó/reseteó)
 *
 * FLUJO:
 *   1. Admin genera PIN → hash+salt guardados en usuarios/{uid}
 *      → PIN plaintext se muestra al admin UNA vez (para entregar al profe)
 *   2. Profe firma clase → modal pide PIN
 *      → se lee usuarios/{authUid} (solo lectura del propio doc, permitido)
 *      → se hashea PIN ingresado con el salt guardado
 *      → si coincide con pinFirmaHash → firma OK
 *
 * SEGURIDAD:
 *   - SHA-256 con salt de 16 chars (Web Crypto API)
 *   - PIN nunca se transmite en claro más que en el paso admin→profe
 *   - No hay reversibilidad; el admin debe REGENERAR si el profe olvida el PIN
 *   - Firestore rule: cada usuario lee solo su propio doc (ya vigente)
 */
(function () {
  'use strict';

  var CHARS_SALT = 'abcdefghijklmnopqrstuvwxyz0123456789';

  function _bufToHex(buf) {
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  }

  /**
   * Hashea un PIN con salt usando SHA-256.
   * @returns Promise<string> hash hex
   */
  function hash(pin, salt) {
    if (!window.crypto || !window.crypto.subtle) {
      return Promise.reject(new Error('Web Crypto no disponible'));
    }
    var enc = new TextEncoder();
    var data = enc.encode(String(salt || '') + '|' + String(pin || ''));
    return window.crypto.subtle.digest('SHA-256', data).then(_bufToHex);
  }

  /** Genera un PIN aleatorio de 6 dígitos (100000..999999). */
  function generarPin() {
    // Usar crypto.getRandomValues para PIN de calidad
    var arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    var n = 100000 + (arr[0] % 900000);
    return String(n);
  }

  /** Genera un salt aleatorio de 16 caracteres. */
  function generarSalt() {
    var arr = new Uint8Array(16);
    window.crypto.getRandomValues(arr);
    var out = '';
    for (var i = 0; i < arr.length; i++) {
      out += CHARS_SALT.charAt(arr[i] % CHARS_SALT.length);
    }
    return out;
  }

  /**
   * Genera un PIN nuevo, lo hashea y actualiza el usuario en Firestore.
   * @returns Promise<{pin, salt, hashHex}> con el PIN plaintext para mostrar al admin.
   */
  function generarYGuardarParaUsuario(uid) {
    if (!uid) return Promise.reject(new Error('uid requerido'));
    if (typeof EL_DB === 'undefined') return Promise.reject(new Error('EL_DB no disponible'));
    var pin = generarPin();
    var salt = generarSalt();
    return hash(pin, salt).then(function (hashHex) {
      return EL_DB.collection('usuarios').doc(uid).update({
        pinFirmaHash:  hashHex,
        pinFirmaSalt:  salt,
        pinFirmaSetAt: new Date().toISOString()
      }).then(function () {
        return { pin: pin, salt: salt, hashHex: hashHex };
      });
    });
  }

  /**
   * Valida un PIN ingresado contra el hash guardado del usuario actual.
   * @param usuarioDoc { pinFirmaHash, pinFirmaSalt } (leído de usuarios/{authUid})
   * @param pinIngresado string
   * @returns Promise<boolean>
   */
  function validar(usuarioDoc, pinIngresado) {
    if (!usuarioDoc || !usuarioDoc.pinFirmaHash) return Promise.resolve(false);
    if (!pinIngresado) return Promise.resolve(false);
    return hash(pinIngresado, usuarioDoc.pinFirmaSalt || '').then(function (h) {
      return h === usuarioDoc.pinFirmaHash;
    });
  }

  /**
   * Cambio de PIN por el propio profesor. Requiere PIN actual + nuevo.
   * @returns Promise<{pin}> con el nuevo PIN plaintext.
   */
  function cambiarMiPin(uid, pinActual, pinNuevo) {
    if (!uid) return Promise.reject(new Error('uid requerido'));
    if (!pinNuevo || pinNuevo.length < 4) return Promise.reject(new Error('PIN nuevo debe tener al menos 4 dígitos'));
    return EL_DB.collection('usuarios').doc(uid).get().then(function (snap) {
      if (!snap.exists) throw new Error('Usuario no encontrado');
      var u = snap.data();
      if (!u.pinFirmaHash) throw new Error('No tienes PIN asignado. Pedile al director que lo genere.');
      return validar(u, pinActual).then(function (ok) {
        if (!ok) throw new Error('PIN actual incorrecto');
        var salt = generarSalt();
        return hash(pinNuevo, salt).then(function (hashHex) {
          return EL_DB.collection('usuarios').doc(uid).update({
            pinFirmaHash:  hashHex,
            pinFirmaSalt:  salt,
            pinFirmaSetAt: new Date().toISOString()
          }).then(function () { return { pin: pinNuevo }; });
        });
      });
    });
  }

  /**
   * Modal reutilizable: pide un PIN al usuario actual y devuelve Promise<true>
   * si es correcto. Usa el usuario en ELAuth.user. Rechaza si cancela.
   */
  function pedirYValidar(opts) {
    opts = opts || {};
    var mensaje = opts.mensaje || 'Ingresá tu PIN de firma para continuar:';
    var titulo  = opts.titulo || '🔐 Firma con PIN';
    var user = (window.ELAuth && ELAuth.user) || null;
    if (!user || !user.uid) return Promise.reject(new Error('Usuario no autenticado'));

    return EL_DB.collection('usuarios').doc(user.uid).get().then(function (snap) {
      if (!snap.exists || !snap.data().pinFirmaHash) {
        alert('Aún no tienes PIN de firma asignado.\n\nPedile al director de tu colegio que te genere uno desde el panel de administración.');
        throw new Error('sin_pin');
      }
      var u = snap.data();
      return _showPinModal(titulo, mensaje).then(function (pin) {
        if (!pin) throw new Error('cancelado');
        return validar(u, pin).then(function (ok) {
          if (!ok) {
            alert('❌ PIN incorrecto. Volvé a intentar.');
            throw new Error('pin_incorrecto');
          }
          return true;
        });
      });
    });
  }

  function _showPinModal(titulo, mensaje) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);' +
        'display:flex;align-items:center;justify-content:center;z-index:99999;' +
        'font-family:"Segoe UI",Roboto,Arial,sans-serif';
      ov.innerHTML =
        '<div style="background:#fff;border-radius:14px;padding:22px 24px;min-width:320px;' +
        'max-width:92vw;box-shadow:0 20px 60px rgba(0,0,0,.35)">' +
          '<h3 style="margin:0 0 8px;font-size:1.1rem;color:#0C1E3B">' + titulo + '</h3>' +
          '<p style="margin:0 0 14px;color:#475569;font-size:.9rem">' + mensaje + '</p>' +
          '<input id="_pfInput" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" ' +
            'autocomplete="off" placeholder="••••••" ' +
            'style="width:100%;padding:12px 14px;font-size:1.4rem;letter-spacing:.5em;' +
            'text-align:center;border:2px solid #2563EB;border-radius:10px;background:#F0F7FF;' +
            'color:#0C1E3B;font-family:monospace">' +
          '<div style="display:flex;gap:10px;margin-top:14px;justify-content:flex-end">' +
            '<button id="_pfCancel" style="padding:10px 18px;border-radius:8px;border:1px solid #e2e8f0;' +
              'background:#fff;color:#334155;cursor:pointer;font-weight:600">Cancelar</button>' +
            '<button id="_pfOk" style="padding:10px 22px;border-radius:8px;border:none;' +
              'background:linear-gradient(135deg,#2563EB,#38BDF8);color:#fff;cursor:pointer;font-weight:700">Firmar</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(ov);
      var inp = ov.querySelector('#_pfInput');
      inp.focus();
      function cerrar(val) { document.body.removeChild(ov); resolve(val); }
      ov.querySelector('#_pfCancel').onclick = function () { cerrar(null); };
      ov.querySelector('#_pfOk').onclick     = function () { cerrar(inp.value.trim()); };
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') cerrar(inp.value.trim());
        if (e.key === 'Escape') cerrar(null);
      });
    });
  }

  window.CCPinFirma = {
    hash:                     hash,
    generarPin:               generarPin,
    generarSalt:              generarSalt,
    generarYGuardarParaUsuario: generarYGuardarParaUsuario,
    validar:                  validar,
    cambiarMiPin:             cambiarMiPin,
    pedirYValidar:            pedirYValidar
  };
})();
