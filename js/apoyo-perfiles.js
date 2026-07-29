/**
 * apoyo-perfiles.js — Click&Clase
 * ────────────────────────────────────────────────────────────────
 * Configuración por PROFESIÓN dentro del rol aps_prof.
 * Cada perfil tiene sus propios motivos, terminología, secciones
 * específicas y tema de color, para que un(a) psicólogo(a) vea un
 * panel enfocado en salud mental, un(a) trabajador(a) social vea
 * uno enfocado en dimensión sociofamiliar y una psicopedagoga vea
 * uno enfocado en dificultades de aprendizaje.
 *
 * Uso desde panel-apoyo-prof.html:
 *   var perfil = CCApoyoPerfil.detectar(ELAuth.user);
 *   var motivos = perfil.motivos;
 *   var tema = perfil.tema;
 *   ...
 */
(function () {
  'use strict';

  var PERFILES = {

    /* ══════════════════════════════════════════
       🧠 PSICÓLOGO/A
       ══════════════════════════════════════════ */
    psicologo: {
      id: 'psicologo',
      etiqueta: 'Psicólogo/a APS',
      nombreCorto: 'Psicólogo/a',
      icono: '🧠',
      tema: { primary:'#7C3AED', accent:'#A855F7', tono:'violeta' },
      terminologia: {
        atendido: 'paciente',
        atendidoPlural: 'pacientes',
        sesion: 'sesión clínica',
        registro: 'registro clínico'
      },
      motivos: [
        { v:'emocional',         t:'😔 Angustia · tristeza · regulación emocional' },
        { v:'ansiedad',          t:'😰 Ansiedad · pánico' },
        { v:'depresion',         t:'💧 Sospecha depresión' },
        { v:'ideacion_suicida',  t:'💭 Ideación suicida' },
        { v:'autolesion',        t:'🩸 Autolesión' },
        { v:'duelo',             t:'🌑 Duelo / pérdida' },
        { v:'trauma',            t:'⚡ Trauma / evento crítico' },
        { v:'conductual',        t:'🎭 Trastornos de conducta' },
        { v:'salud_mental',      t:'🩺 Salud mental (derivación)' },
        { v:'convivencia',       t:'👥 Conflicto interpersonal' },
        { v:'sospecha_vulneracion', t:'🚨 Sospecha vulneración' },
        { v:'violencia',         t:'⚠ Violencia' },
        { v:'abuso',             t:'🚫 Abuso' },
        { v:'otro',              t:'Otro' }
      ],
      seccionExtra: {
        id: 'evaluaciones',
        titulo: 'Mis evaluaciones psicológicas',
        icono: '🧪',
        subtitulo: 'Test aplicados, informes psicológicos e intervenciones terapéuticas',
        campos: [
          { key:'instrumento', label:'Instrumento aplicado', tipo:'text',   placeholder:'Ej: WISC-V, BDI-II, STAI, K-BIT…' },
          { key:'objetivo',    label:'Objetivo evaluación',  tipo:'text',   placeholder:'Ej: diagnóstico diferencial ansiedad/depresión' },
          { key:'hallazgos',   label:'Hallazgos principales',tipo:'textarea', placeholder:'Puntuaciones, observaciones, hipótesis diagnóstica…' },
          { key:'orientacion', label:'Orientaciones',        tipo:'textarea', placeholder:'Recomendaciones para docentes, familia, derivaciones…' }
        ]
      },
      herramientasRapidas: [
        { icono:'📊', txt:'PSC-17 · Tamizaje JUNAEB (HpV)', accion:'instrumento:PSC17' },
        { icono:'📢', txt:'Denuncia Ley 21430 · Vulneración', accion:'formato:denuncia21430' },
        { icono:'🎯', txt:'Plan de Intervención Psicosocial', accion:'plan_intervencion' },
        { icono:'📞', txt:'Coordinar con COSAM · Red MINSAL', accion:'coord_red:COSAM' },
        { icono:'📋', txt:'Ficha derivación HpV · JUNAEB', accion:'formato:derivacion_hpv' },
        { icono:'🧠', txt:'Escalas clínicas complementarias (PHQ-9 / GAD-7)', accion:'escala' }
      ]
    },

    /* ══════════════════════════════════════════
       🤝 TRABAJADOR/A SOCIAL
       ══════════════════════════════════════════ */
    ts: {
      id: 'ts',
      etiqueta: 'Trabajador/a Social APS',
      nombreCorto: 'Trabajador/a Social',
      icono: '🤝',
      tema: { primary:'#059669', accent:'#10B981', tono:'esmeralda' },
      terminologia: {
        atendido: 'estudiante y familia',
        atendidoPlural: 'familias acompañadas',
        sesion: 'intervención sociofamiliar',
        registro: 'informe social'
      },
      motivos: [
        { v:'vulneracion',       t:'🚨 Vulneración de derechos' },
        { v:'violencia',         t:'⚠ Violencia intrafamiliar' },
        { v:'abuso',             t:'🚫 Abuso' },
        { v:'ausentismo',        t:'🚪 Ausentismo escolar' },
        { v:'situacion_familiar',t:'👨‍👩‍👧 Situación familiar compleja' },
        { v:'vivienda',          t:'🏠 Vivienda / desahucio' },
        { v:'salud',             t:'🩺 Situación de salud familiar' },
        { v:'consumo',           t:'🍶 Consumo problemático (familia o NNA)' },
        { v:'economico',         t:'💰 Vulnerabilidad económica' },
        { v:'migracion',         t:'🌍 Situación migratoria' },
        { v:'proteccion',        t:'🛡 Derivación a red de protección' },
        { v:'beneficios',        t:'📋 Tramitación de beneficios' },
        { v:'otro',              t:'Otro' }
      ],
      seccionExtra: {
        id: 'visitas',
        titulo: 'Visitas domiciliarias y gestiones',
        icono: '🏠',
        subtitulo: 'Registro de visitas, denuncias, gestiones con red externa y BPS',
        campos: [
          { key:'tipoGestion', label:'Tipo de gestión', tipo:'select', opciones:[
            { v:'visita',     t:'🏠 Visita domiciliaria' },
            { v:'denuncia',   t:'📢 Denuncia formal' },
            { v:'red_externa',t:'📞 Gestión red externa' },
            { v:'beneficio',  t:'💰 Tramitación beneficio' },
            { v:'derivacion', t:'↗ Derivación institucional' }
          ]},
          { key:'organismo',    label:'Organismo / destino',      tipo:'text',   placeholder:'OPD, PPF, CESFAM, Tribunales, JUNAEB, municipio…' },
          { key:'direccion',    label:'Dirección visitada',       tipo:'text',   placeholder:'Solo si fue visita' },
          { key:'observaciones',label:'Observaciones y hallazgos',tipo:'textarea', placeholder:'Descripción de la situación observada, condiciones habitacionales, dinámica familiar…' },
          { key:'compromisos',  label:'Compromisos y plazos',     tipo:'textarea', placeholder:'Qué se acordó, con quién, para cuándo…' }
        ]
      },
      herramientasRapidas: [
        { icono:'📢', txt:'Denuncia Ley 21430 · Vulneración de derechos', accion:'formato:denuncia21430' },
        { icono:'🏠', txt:'Registrar visita domiciliaria', accion:'perfil_pre:tipoGestion=visita' },
        { icono:'📞', txt:'Coordinar con OPD · SENAME', accion:'coord_red:OPD' },
        { icono:'⚖', txt:'Oficio a Tribunales de Familia', accion:'coord_red:Tribunales de Familia' },
        { icono:'📋', txt:'Ficha derivación HpV · JUNAEB', accion:'formato:derivacion_hpv' },
        { icono:'💰', txt:'Tramitar beneficio (JUNAEB, RSH, BAES)', accion:'perfil_pre:tipoGestion=beneficio' }
      ]
    },

    /* ══════════════════════════════════════════
       📚 PSICOPEDAGOGO/A
       ══════════════════════════════════════════ */
    psicopedagogo: {
      id: 'psicopedagogo',
      etiqueta: 'Psicopedagogo/a APS',
      nombreCorto: 'Psicopedagogo/a',
      icono: '📚',
      tema: { primary:'#0369A1', accent:'#0EA5E9', tono:'azul' },
      terminologia: {
        atendido: 'estudiante',
        atendidoPlural: 'estudiantes',
        sesion: 'sesión psicopedagógica',
        registro: 'informe psicopedagógico'
      },
      motivos: [
        { v:'dea_lectura',       t:'📖 Dificultad de lectoescritura' },
        { v:'dea_matematica',    t:'🔢 Dificultad matemática (discalculia)' },
        { v:'atencion',          t:'🎯 Atención / concentración' },
        { v:'motivacion',        t:'✨ Motivación escolar' },
        { v:'habitos_estudio',   t:'📅 Hábitos y técnicas de estudio' },
        { v:'lenguaje',          t:'🗣 Lenguaje / comprensión' },
        { v:'memoria',           t:'🧠 Memoria de trabajo' },
        { v:'funcion_ejecutiva', t:'⚙ Función ejecutiva / planificación' },
        { v:'rendimiento',       t:'📉 Bajo rendimiento generalizado' },
        { v:'orientacion_docente', t:'👨‍🏫 Orientación a docente' },
        { v:'evaluacion_dif',    t:'📝 Evaluación diferenciada' },
        { v:'coord_pie',         t:'🧩 Coordinación con PIE' },
        { v:'otro',              t:'Otro' }
      ],
      seccionExtra: {
        id: 'planes_apoyo',
        titulo: 'Planes de apoyo psicopedagógico',
        icono: '📋',
        subtitulo: 'Evaluaciones, estrategias DUA y planes de apoyo por estudiante',
        campos: [
          { key:'asignatura', label:'Asignatura(s) afectada(s)', tipo:'text', placeholder:'Ej: Lenguaje, Matemática' },
          { key:'evaluacion', label:'Evaluación psicopedagógica aplicada', tipo:'text', placeholder:'Ej: EVALUA-8, PROLEC, BENHALE…' },
          { key:'nivel',      label:'Nivel de descubrimiento', tipo:'select', opciones:[
            { v:'esperado', t:'✓ Dentro del rango esperado' },
            { v:'leve',     t:'🟡 Descenso leve' },
            { v:'moderado', t:'🟠 Descenso moderado' },
            { v:'severo',   t:'🔴 Descenso severo' }
          ]},
          { key:'estrategias', label:'Estrategias remediales (DUA)', tipo:'textarea', placeholder:'Enfoque multimodal, andamiaje, adecuaciones metodológicas…' },
          { key:'coordDocente', label:'Coordinación con docente(s)', tipo:'textarea', placeholder:'Con qué docente, qué acordaron, seguimiento…' }
        ]
      },
      herramientasRapidas: [
        { icono:'🧩', txt:'FUDEI · Derivación PIE (Decreto 170)', accion:'formato:fudei' },
        { icono:'📄', txt:'PACI resumido (Decreto 83/2015)', accion:'formato:paci' },
        { icono:'📝', txt:'Evaluación psicopedagógica integral', accion:'perfil_nuevo' },
        { icono:'🎯', txt:'Biblioteca estrategias DUA (Decreto 83)', accion:'dua_biblioteca' },
        { icono:'📋', txt:'Ficha derivación HpV · JUNAEB', accion:'formato:derivacion_hpv' }
      ]
    },

    /* ══════════════════════════════════════════
       ✋ TERAPEUTA OCUPACIONAL
       ══════════════════════════════════════════ */
    terapeuta: {
      id: 'terapeuta',
      etiqueta: 'Terapeuta Ocupacional APS',
      nombreCorto: 'Terapeuta Ocupacional',
      icono: '✋',
      tema: { primary:'#EA580C', accent:'#FB923C', tono:'naranja' },
      terminologia: { atendido:'estudiante', atendidoPlural:'estudiantes', sesion:'sesión TO', registro:'registro TO' },
      motivos: [
        { v:'psicomotricidad', t:'🤸 Psicomotricidad' },
        { v:'sensorial',       t:'👐 Integración sensorial' },
        { v:'autonomia',       t:'🎯 Autonomía / AVD' },
        { v:'grafomotricidad', t:'✍ Grafomotricidad' },
        { v:'juego',           t:'🎲 Juego y participación social' },
        { v:'otro',            t:'Otro' }
      ],
      seccionExtra: null,
      herramientasRapidas: [
        { icono:'🤸', txt:'Registrar sesión TO', accion:'nueva_intervencion' },
        { icono:'👐', txt:'Perfil sensorial', accion:'nueva_intervencion' }
      ]
    },

    /* ══════════════════════════════════════════
       🗣 FONOAUDIÓLOGO/A
       ══════════════════════════════════════════ */
    fonoaudiologo: {
      id: 'fonoaudiologo',
      etiqueta: 'Fonoaudiólogo/a APS',
      nombreCorto: 'Fonoaudiólogo/a',
      icono: '🗣',
      tema: { primary:'#DB2777', accent:'#F472B6', tono:'rosa' },
      terminologia: { atendido:'estudiante', atendidoPlural:'estudiantes', sesion:'sesión fonoaudiológica', registro:'informe fono' },
      motivos: [
        { v:'articulacion',   t:'🗣 Articulación / fonología' },
        { v:'lenguaje_exp',   t:'💬 Lenguaje expresivo' },
        { v:'lenguaje_comp',  t:'👂 Lenguaje comprensivo' },
        { v:'voz',            t:'🎤 Trastornos de voz' },
        { v:'deglucion',      t:'🍽 Deglución' },
        { v:'otro',           t:'Otro' }
      ],
      seccionExtra: null,
      herramientasRapidas: [
        { icono:'🗣', txt:'Evaluación fono', accion:'nueva_intervencion' },
        { icono:'📋', txt:'Plan de trabajo fono', accion:'nueva_intervencion' }
      ]
    },

    /* ══════════════════════════════════════════
       DEFAULT (sin profesión definida)
       ══════════════════════════════════════════ */
    default: {
      id: 'default',
      etiqueta: 'Profesional APS',
      nombreCorto: 'Equipo APS',
      icono: '💙',
      tema: { primary:'#14b8a6', accent:'#0EA5E9', tono:'teal' },
      terminologia: { atendido:'estudiante', atendidoPlural:'estudiantes', sesion:'intervención', registro:'registro' },
      motivos: [
        { v:'emocional',   t:'😔 Emocional' },
        { v:'familiar',    t:'👨‍👩‍👧 Familiar' },
        { v:'academico',   t:'📚 Académico' },
        { v:'conductual',  t:'🎭 Conductual' },
        { v:'salud',       t:'🩺 Salud' },
        { v:'convivencia', t:'👥 Convivencia' },
        { v:'sospecha_vulneracion', t:'🚨 Sospecha de vulneración' },
        { v:'otro',        t:'Otro' }
      ],
      seccionExtra: null,
      herramientasRapidas: []
    }
  };

  // ── Detección de perfil según el campo `profesion` del usuario ──
  function detectar(user) {
    if (!user) return PERFILES.default;
    var prof = (user.profesion || user.cargo || '').toLowerCase().trim();
    if (!prof) return PERFILES.default;

    // Coincidencias flexibles (case-insensitive, incluye variantes de género)
    if (prof.indexOf('psicólog') === 0 || prof.indexOf('psicolog') === 0)   return PERFILES.psicologo;
    if (prof.indexOf('trabajador') === 0 || prof.indexOf('trabajadora') === 0) return PERFILES.ts;
    if (prof.indexOf('psicopedag') === 0)                                    return PERFILES.psicopedagogo;
    if (prof.indexOf('terapeut') === 0)                                      return PERFILES.terapeuta;
    if (prof.indexOf('fonoaud') === 0)                                       return PERFILES.fonoaudiologo;

    return PERFILES.default;
  }

  // ── Aplicar tema de color al DOM ──
  function aplicarTema(perfil) {
    if (!perfil || !perfil.tema) return;
    var root = document.documentElement;
    root.style.setProperty('--perfil-primary', perfil.tema.primary);
    root.style.setProperty('--perfil-accent',  perfil.tema.accent);
  }

  // ── Lista completa de perfiles (útil para pickers en admin) ──
  function listar() {
    return Object.keys(PERFILES).filter(function(k){ return k !== 'default'; }).map(function(k){ return PERFILES[k]; });
  }

  window.CCApoyoPerfil = {
    detectar: detectar,
    aplicarTema: aplicarTema,
    listar: listar,
    perfiles: PERFILES
  };
})();
