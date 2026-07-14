/**
 * tp-catalogo.js — Click&Clase Fase 8.10
 *
 * ADAPTADOR al catálogo oficial en `window.CURRICULA_FULL` (cargado por
 * curricula-loader.js → loadCurriculaTP()). Traduce entre los IDs internos
 * de especialidades (tp_mec_auto, tp_electronica, ...) y los slugs del
 * catálogo Mineduc (mecanica-automotriz, electronica, ...).
 *
 * NO duplica datos: si la especialidad tiene su archivo en
 * js/curricula/tp/datos-*.js, devuelve sus módulos reales con OAs, AEs y CEs.
 * Si no existe archivo para esa especialidad, devuelve una lista mínima.
 *
 * API:
 *   CCTPCatalogo.modulos('tp_mec_auto')                 → array de {id, nombre, nivel, horas, ...}
 *   CCTPCatalogo.moduloCompleto('tp_mec_auto','MA1')    → objeto completo con oas/aes/ces
 *   CCTPCatalogo.labelModulo('tp_mec_auto','MA1')       → 'Ajuste de Motores'
 *   CCTPCatalogo.labelEspecialidad('tp_mec_auto')       → 'Mecánica Automotriz'
 *   CCTPCatalogo.cargarCatalogo()                       → Promise<>, invoca loadCurriculaTP si existe
 */
(function () {
  'use strict';

  // Etiquetas legibles de especialidades (para UI)
  var ESPECIALIDAD_LABELS = {
    tp_administracion: 'Administración', tp_agropecuaria: 'Agropecuaria',
    tp_elab_alim: 'Elaboración Industrial de Alimentos', tp_serv_alim: 'Servicios de Alimentación Colectiva',
    tp_gastronomia: 'Gastronomía',
    tp_ventas: 'Ventas', tp_contabilidad: 'Contabilidad', tp_logistica: 'Logística',
    tp_confeccion: 'Vestuario y Confección Textil',
    tp_const_metal: 'Construcciones Metálicas', tp_edificacion: 'Edificación',
    tp_sanitarias: 'Instalaciones Sanitarias', tp_montaje: 'Montaje Industrial',
    tp_obras_viales: 'Obras Viales y de Infraestructura', tp_refrig: 'Refrigeración y Climatización',
    tp_terminaciones: 'Terminaciones de Construcción',
    tp_electricidad: 'Electricidad', tp_electronica: 'Electrónica', tp_telecom: 'Telecomunicaciones',
    tp_dibujo: 'Dibujo Técnico', tp_grafica: 'Gráfica',
    tp_turismo: 'Servicios de Turismo', tp_hoteleria: 'Servicios Hoteleros',
    tp_forestal: 'Forestal', tp_madera: 'Productos de la Madera',
    tp_acuicultura: 'Acuicultura', tp_naves: 'Naves Mercantes y Especiales',
    tp_op_portuaria: 'Operación Portuaria', tp_pesqueria: 'Pesquería',
    tp_tripulacion: 'Tripulación de Naves Mercantes',
    tp_mec_auto: 'Mecánica Automotriz', tp_mec_ind: 'Mecánica Industrial', tp_matriceria: 'Matricería',
    tp_explot_min: 'Explotación Minera', tp_metalurgia: 'Metalurgia Extractiva', tp_geologia: 'Asistencia en Geología',
    tp_lab_quim: 'Laboratorio Químico', tp_planta_quim: 'Operación de Planta Química',
    tp_enfermeria: 'Atención de Enfermería', tp_adulto_mayor: 'Atención de Adulto Mayor', tp_parvulos: 'Atención de Párvulos'
  };

  // Mapeo id interno → slug del catálogo CURRICULA_FULL
  var SLUG_CURRICULA = {
    tp_administracion:  'administracion',
    tp_agropecuaria:    'agropecuaria',
    tp_elab_alim:       'elaboracion-alimentos',
    tp_gastronomia:     'gastronomia',
    tp_ventas:          'ventas',
    tp_contabilidad:    'contabilidad',
    tp_logistica:       'logistica',
    tp_confeccion:      'vestuario-confeccion',
    tp_const_metal:     'construcciones-metalicas',
    tp_edificacion:     'edificacion',
    tp_sanitarias:      'instalaciones-sanitarias',
    tp_montaje:         'montaje-industrial',
    tp_refrig:          'refrigeracion-climatizacion',
    tp_terminaciones:   'terminaciones-construccion',
    tp_electricidad:    'electricidad',
    tp_electronica:     'electronica',
    tp_telecom:         'telecomunicaciones',
    tp_dibujo:          'dibujo-tecnico',
    tp_grafica:         'grafica',
    tp_turismo:         'servicios-turismo',
    tp_hoteleria:       'servicios-hoteleros',
    tp_forestal:        'forestal',
    tp_madera:          'productos-madera',
    tp_acuicultura:     'acuicultura',
    tp_op_portuaria:    'operacion-portuaria',
    tp_pesqueria:       'pesqueria',
    tp_tripulacion:     'tripulacion-naves',
    tp_mec_auto:        'mecanica-automotriz',
    tp_mec_ind:         'mecanica-industrial',
    tp_explot_min:      'explotacion-minera',
    tp_metalurgia:      'metalurgia-extractiva',
    tp_geologia:        'asistencia-geologia',
    tp_lab_quim:        'quimica-industrial',
    tp_planta_quim:     'operacion-plantas-quimicas',
    tp_enfermeria:      'atencion-enfermeria',
    tp_adulto_mayor:    'atencion-adulto-mayor',
    tp_parvulos:        'atencion-parvulos'
    // Sin catálogo específico (fallback genérico): tp_serv_alim, tp_obras_viales,
    // tp_naves, tp_matriceria
  };

  // Módulos genéricos para especialidades sin catálogo específico
  var MODULOS_GENERICOS = [
    { id: 'gen_teorico',    num: 'GEN1', nombre: 'Fundamentos de la especialidad',        nivel: '3M', horas: 152 },
    { id: 'gen_practico',   num: 'GEN2', nombre: 'Práctica profesional',                  nivel: '3M', horas: 152 },
    { id: 'gen_seguridad',  num: 'GEN3', nombre: 'Seguridad y prevención de riesgos',     nivel: '3M', horas: 76  },
    { id: 'gen_normativa',  num: 'GEN4', nombre: 'Normativa vigente',                     nivel: '4M', horas: 76  },
    { id: 'gen_emprender',  num: 'GEN5', nombre: 'Emprendimiento y empleabilidad',        nivel: '4M', horas: 76  }
  ];

  // Obtener catálogo raw de la especialidad (nulo si no cargado)
  function _rawEspecialidad(especialidadId) {
    var slug = SLUG_CURRICULA[especialidadId];
    if (!slug) return null;
    if (!window.CURRICULA_FULL || !window.CURRICULA_FULL[slug]) return null;
    return window.CURRICULA_FULL[slug];
  }

  // Módulos formateados (id, num, nombre, nivel, horas)
  function modulos(especialidadId) {
    var raw = _rawEspecialidad(especialidadId);
    if (!raw || !raw.modulos) return MODULOS_GENERICOS;
    var out = [];
    Object.keys(raw.modulos).forEach(function (k) {
      var m = raw.modulos[k];
      out.push({
        id:     k,                          // ej: 'MA1'
        num:    m.num || k,
        nombre: m.nombre || k,
        nivel:  m.nivel || '',
        horas:  m.horas || 0
      });
    });
    // Ordenar por nivel (3M antes que 4M) y luego por num
    var ORD = ['1M', '2M', '3M', '4M', ''];
    out.sort(function (a, b) {
      var na = ORD.indexOf(a.nivel), nb = ORD.indexOf(b.nivel);
      if (na !== nb) return na - nb;
      return (a.num || '').localeCompare(b.num || '');
    });
    return out;
  }

  // Módulo completo con OAs, AEs, CEs
  function moduloCompleto(especialidadId, moduloId) {
    var raw = _rawEspecialidad(especialidadId);
    if (!raw || !raw.modulos || !raw.modulos[moduloId]) return null;
    return raw.modulos[moduloId];
  }

  function labelModulo(especialidadId, moduloId) {
    var raw = _rawEspecialidad(especialidadId);
    if (raw && raw.modulos && raw.modulos[moduloId]) {
      return raw.modulos[moduloId].nombre || moduloId;
    }
    var gen = MODULOS_GENERICOS.find(function (m) { return m.id === moduloId; });
    return gen ? gen.nombre : moduloId;
  }

  function labelEspecialidad(especialidadId) {
    return ESPECIALIDAD_LABELS[especialidadId] || especialidadId;
  }

  function todasLasEspecialidades() {
    return Object.keys(ESPECIALIDAD_LABELS);
  }

  // Carga perezosa del catálogo TP (invoca loadCurriculaTP si existe)
  function cargarCatalogo() {
    if (typeof window.loadCurriculaTP === 'function') {
      return window.loadCurriculaTP();
    }
    return Promise.resolve(window.CURRICULA_FULL || null);
  }

  window.CCTPCatalogo = {
    ESPECIALIDAD_LABELS:     ESPECIALIDAD_LABELS,
    SLUG_CURRICULA:          SLUG_CURRICULA,
    modulos:                 modulos,
    moduloCompleto:          moduloCompleto,
    labelModulo:             labelModulo,
    labelEspecialidad:       labelEspecialidad,
    todasLasEspecialidades:  todasLasEspecialidades,
    cargarCatalogo:          cargarCatalogo
  };
})();
