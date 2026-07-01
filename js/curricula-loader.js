/**
 * curricula-loader.js — Click&Clase
 * Carga el currículum oficial chileno (Plan Común Mineduc + motor CURRICULA_CHILE)
 * para los paneles nuevos, sin tener que listar 20 <script> en cada HTML.
 *
 * Inyecta los archivos en el orden correcto y expone:
 *   window.CURRICULA_READY  → Promise que resuelve con window.CURRICULA_CHILE
 *
 * Uso en un panel:
 *   <script src="js/curricula-loader.js"></script>
 *   ...
 *   CURRICULA_READY.then(function (CUR) { ...usar CUR.getAsignaturas('basica')... });
 */
(function () {
  if (window.CURRICULA_READY) return; // ya cargado

  var PC = 'js/curricula/plan-comun/';
  // _comun primero; index al final; curricula-chile.js cierra.
  var files = [
    PC + '_comun.js',
    PC + 'lenguaje.js', PC + 'matematica.js', PC + 'historia.js',
    PC + 'ciencias.js', PC + 'biologia.js', PC + 'fisica.js', PC + 'quimica.js',
    PC + 'ingles.js', PC + 'ed-fisica.js', PC + 'artes.js', PC + 'musica.js',
    PC + 'tecnologia.js', PC + 'orientacion.js', PC + 'filosofia.js',
    PC + 'ed-ciudadana.js', PC + 'ciencias-ciudadania.js',
    PC + 'index.js',
    'js/curricula-chile.js'
  ];

  window.CURRICULA_READY = new Promise(function (resolve) {
    var i = 0;
    function next() {
      if (i >= files.length) { resolve(window.CURRICULA_CHILE || null); return; }
      var s = document.createElement('script');
      s.src = files[i++];
      s.onload = next;
      s.onerror = next; // si falta un archivo, seguimos igual (fallback legacy)
      document.head.appendChild(s);
    }
    next();
  });

  // Carga perezosa de los datos TP (especialidades y modulos). Son ~44 archivos,
  // asi que solo se cargan cuando alguien los pide (p. ej. el explorador TP del admin).
  var _tpPromise = null;
  window.loadCurriculaTP = function () {
    if (_tpPromise) return _tpPromise;
    var TP = 'js/curricula/tp/datos-';
    var names = [
      'acuicultura', 'administracion', 'agropecuaria', 'asistencia-geologia',
      'atencion-adulto-mayor', 'atencion-enfermeria', 'atencion-parvulos',
      'conectividad-redes', 'construccion', 'construcciones-metalicas',
      'contabilidad', 'dibujo-tecnico', 'edificacion', 'elaboracion-alimentos',
      'electricidad', 'electronica', 'explotacion-minera', 'forestal',
      'gastronomia', 'grafica', 'instalaciones-sanitarias', 'logistica',
      'mantenimiento-aeronaves', 'mecanica-automotriz', 'mecanica-industrial',
      'metalurgia-extractiva', 'montaje-industrial', 'muebles-madera',
      'operacion-plantas-quimicas', 'operacion-portuaria', 'pesqueria',
      'productos-madera', 'programacion', 'quimica-industrial',
      'refrigeracion-climatizacion', 'secretariado', 'servicios-hoteleros',
      'servicios-turismo', 'tejido', 'telecomunicaciones',
      'terminaciones-construccion', 'tripulacion-naves', 'ventas',
      'vestuario-confeccion'
    ];
    _tpPromise = window.CURRICULA_READY.then(function () {
      return new Promise(function (resolve) {
        var i = 0;
        function next() {
          if (i >= names.length) { resolve(window.CURRICULA_CHILE || null); return; }
          var s = document.createElement('script');
          s.src = TP + names[i++] + '.js';
          s.onload = next; s.onerror = next;
          document.head.appendChild(s);
        }
        next();
      });
    });
    return _tpPromise;
  };

  // Helper de conveniencia: lista canonica de asignaturas del curriculo nacional
  // (basica + media unificada), con sigla y niveles. Util para el panel admin.
  window.getCurriculumNacional = function () {
    return window.CURRICULA_READY.then(function (CUR) {
      if (!CUR) return { asignaturas: [], niveles: [] };
      var byName = {}, lista = [];
      ['basica', 'media'].forEach(function (tramo) {
        (CUR.getAsignaturas(tramo) || []).forEach(function (a) {
          var k = (a.nombre || '').trim();
          if (!k) return;
          if (!byName[k]) { byName[k] = { nombre: a.nombre, sigla: a.sigla, niveles: [] }; lista.push(byName[k]); }
          (a.niveles || []).forEach(function (n) { if (byName[k].niveles.indexOf(n) === -1) byName[k].niveles.push(n); });
        });
      });
      var niveles = (CUR.getAllNiveles() || []).map(function (n) { return CUR.getNivelLabel(n); });
      return { asignaturas: lista, niveles: niveles };
    });
  };
})();
