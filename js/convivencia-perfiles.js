/**
 * convivencia-perfiles.js — Click&Clase
 * ────────────────────────────────────────────────────────────────
 * Configuración por PERFIL dentro del rol amb_prof.
 * Mediador Escolar → foco en mediación restaurativa, acuerdos, prácticas circulares.
 * Inspector → foco en registro de faltas en aula/patio, medidas formativas, protocolo cotidiano.
 * Orientador → foco en acompañamiento, formación valórica, orientación vocacional.
 */
(function () {
  'use strict';

  var PERFILES = {

    /* 🤝 MEDIADOR/A ESCOLAR — foco restaurativo */
    mediador: {
      id: 'mediador',
      etiqueta: 'Mediador/a Escolar',
      nombreCorto: 'Mediador/a',
      icono: '🤝',
      tema: { primary:'#0F766E', accent:'#14b8a6' },
      terminologia: { intervencion: 'mediación', registro: 'acta de mediación' },
      motivos: [
        { v:'conflicto_pares',    t:'⚔ Conflicto entre pares' },
        { v:'agresion_verbal',    t:'💬 Agresión verbal / insultos' },
        { v:'bullying',           t:'🚫 Bullying (Ley 20536)' },
        { v:'ciberbullying',      t:'📱 Ciberbullying' },
        { v:'discriminacion',     t:'⚠ Discriminación' },
        { v:'exclusion',          t:'🚷 Exclusión social' },
        { v:'discusion_docente',  t:'👨‍🏫 Conflicto con docente' },
        { v:'rumores',            t:'👂 Rumores / difamación' },
        { v:'redes_sociales',     t:'📲 Conflicto redes sociales' },
        { v:'apoderados',         t:'👨‍👩‍👧 Conflicto con apoderados' },
        { v:'otro',               t:'Otro' }
      ],
      seccionExtra: {
        id: 'mediaciones',
        titulo: 'Actas de mediación',
        icono: '🤝',
        subtitulo: 'Prácticas restaurativas · acuerdos entre partes · seguimientos',
        campos: [
          { key:'parteA', label:'Parte A', tipo:'text', placeholder:'Nombre completo' },
          { key:'parteB', label:'Parte B', tipo:'text', placeholder:'Nombre completo' },
          { key:'hechos',  label:'Hechos que motivaron la mediación', tipo:'textarea', placeholder:'Relato consensuado por ambas partes' },
          { key:'acuerdos', label:'Acuerdos alcanzados', tipo:'textarea', placeholder:'Acuerdos concretos, medibles y con plazo' },
          { key:'seguimiento', label:'Fecha próxima reunión de seguimiento', tipo:'date' }
        ]
      },
      herramientasRapidas: [
        { icono:'⭕', txt:'Iniciar círculo restaurativo',   accion:'mediacion_circulo' },
        { icono:'🤝', txt:'Nueva mediación entre pares',    accion:'perfil_nuevo' },
        { icono:'📞', txt:'Coordinar con apoderados',       accion:'perfil_pre:tipoGestion=citacion' },
        { icono:'📋', txt:'Acta de acuerdos',               accion:'perfil_nuevo' }
      ]
    },

    /* 👮 INSPECTOR/A — foco en registro cotidiano y aula/patio */
    inspector: {
      id: 'inspector',
      etiqueta: 'Inspector/a General',
      nombreCorto: 'Inspector/a',
      icono: '👮',
      tema: { primary:'#B45309', accent:'#F59E0B' },
      terminologia: { intervencion: 'observación', registro: 'anotación disciplinaria' },
      motivos: [
        { v:'indisciplina_aula',    t:'📢 Indisciplina en aula' },
        { v:'atraso',               t:'⏰ Atraso reiterado' },
        { v:'inasistencia',         t:'🚪 Inasistencia sin justificar' },
        { v:'uniforme',             t:'👕 Uniforme / presentación personal' },
        { v:'dano_material',        t:'🔨 Daño a material del colegio' },
        { v:'salida_no_autorizada', t:'🚨 Salida no autorizada' },
        { v:'porte_celular',        t:'📱 Uso indebido de celular' },
        { v:'palabras_soeces',      t:'💬 Palabras soeces' },
        { v:'conducta_patio',       t:'⚽ Conducta en patio / recreo' },
        { v:'copia_evaluacion',     t:'📝 Copia en evaluación' },
        { v:'agresion_fisica',      t:'⚠ Agresión física' },
        { v:'porte_sustancias',     t:'💊 Porte de sustancias' },
        { v:'otro',                 t:'Otro' }
      ],
      seccionExtra: {
        id: 'anotaciones_disciplinarias',
        titulo: 'Anotaciones disciplinarias',
        icono: '📢',
        subtitulo: 'Registro de faltas cotidianas · medidas formativas · seguimiento',
        campos: [
          { key:'tipoFalta',     label:'Tipo de falta', tipo:'select', opciones:[
            { v:'leve',      t:'🟢 Leve' },
            { v:'grave',     t:'🟠 Grave' },
            { v:'gravisima', t:'🔴 Gravísima' }
          ]},
          { key:'lugar',         label:'Lugar del hecho', tipo:'text', placeholder:'Aula, patio, comedor, pasillo…' },
          { key:'descripcion',   label:'Descripción del hecho', tipo:'textarea', placeholder:'Relato objetivo del comportamiento observado' },
          { key:'medidaFormativa', label:'Medida formativa aplicada', tipo:'textarea', placeholder:'Reflexión, servicio comunitario, disculpa formal…' },
          { key:'notificoApo',   label:'¿Notificó al apoderado?', tipo:'select', opciones:[{v:'si',t:'Sí'},{v:'no',t:'No, pendiente'}]}
        ]
      },
      herramientasRapidas: [
        { icono:'📢', txt:'Nueva anotación disciplinaria', accion:'perfil_nuevo' },
        { icono:'⏰', txt:'Registrar atraso',              accion:'perfil_pre:tipoFalta=leve' },
        { icono:'📞', txt:'Citar apoderado urgente',       accion:'perfil_pre:notificoApo=si' },
        { icono:'⚖', txt:'Aplicar protocolo (bullying/drogas)', accion:'aplicar_protocolo' }
      ]
    },

    /* 🧭 ORIENTADOR/A */
    orientador: {
      id: 'orientador',
      etiqueta: 'Orientador/a',
      nombreCorto: 'Orientador/a',
      icono: '🧭',
      tema: { primary:'#7C3AED', accent:'#A855F7' },
      terminologia: { intervencion: 'orientación', registro: 'sesión de orientación' },
      motivos: [
        { v:'orientacion_vocacional', t:'🎯 Orientación vocacional' },
        { v:'formacion_valorica',     t:'💛 Formación valórica' },
        { v:'clima_curso',            t:'🏫 Clima de curso' },
        { v:'proyecto_vida',          t:'🌟 Proyecto de vida' },
        { v:'habilidades_socio',      t:'🤝 Habilidades socioemocionales' },
        { v:'transicion_educativa',   t:'🎓 Transición educativa' },
        { v:'otro',                   t:'Otro' }
      ],
      seccionExtra: {
        id: 'orientaciones',
        titulo: 'Sesiones de orientación',
        icono: '🧭',
        subtitulo: 'Individuales y grupales · formación valórica · orientación vocacional',
        campos: [
          { key:'modalidad', label:'Modalidad', tipo:'select', opciones:[
            { v:'individual', t:'Individual' },
            { v:'grupo',      t:'Grupo (curso completo)' },
            { v:'taller',     t:'Taller temático' }
          ]},
          { key:'objetivo',    label:'Objetivo de la sesión', tipo:'text' },
          { key:'contenidos',  label:'Contenidos abordados', tipo:'textarea' },
          { key:'compromisos', label:'Compromisos', tipo:'textarea' }
        ]
      },
      herramientasRapidas: [
        { icono:'🧭', txt:'Nueva sesión de orientación',    accion:'perfil_nuevo' },
        { icono:'🎯', txt:'Aplicar orientación vocacional', accion:'perfil_pre:modalidad=individual' },
        { icono:'👥', txt:'Taller grupal',                  accion:'perfil_pre:modalidad=taller' }
      ]
    },

    default: {
      id: 'default',
      etiqueta: 'Profesional Convivencia',
      nombreCorto: 'Equipo Convivencia',
      icono: '🤝',
      tema: { primary:'#f97316', accent:'#DC2626' },
      terminologia: { intervencion: 'intervención', registro: 'registro' },
      motivos: [
        { v:'agresion_fisica',    t:'⚠ Agresión física' },
        { v:'agresion_verbal',    t:'💬 Agresión verbal' },
        { v:'bullying',           t:'🚫 Bullying' },
        { v:'ciberbullying',      t:'📱 Ciberbullying' },
        { v:'dano_material',      t:'🔨 Daño material' },
        { v:'discriminacion',     t:'⚠ Discriminación' },
        { v:'indisciplina_aula',  t:'📢 Indisciplina' },
        { v:'inasistencia',       t:'🚪 Inasistencia' },
        { v:'uniforme',           t:'👕 Uniforme' },
        { v:'porte_sustancias',   t:'💊 Porte sustancias' },
        { v:'otro',               t:'Otro' }
      ],
      seccionExtra: null,
      herramientasRapidas: []
    }
  };

  function detectar(user) {
    if (!user) return PERFILES.default;
    var prof = (user.profesion || user.cargo || '').toLowerCase().trim();
    if (!prof) return PERFILES.default;
    if (prof.indexOf('mediador') === 0 || prof.indexOf('mediadora') === 0) return PERFILES.mediador;
    if (prof.indexOf('inspector') === 0)                                   return PERFILES.inspector;
    if (prof.indexOf('orientador') === 0)                                  return PERFILES.orientador;
    return PERFILES.default;
  }
  function aplicarTema(p) {
    if (!p || !p.tema) return;
    var root = document.documentElement;
    root.style.setProperty('--perfil-primary', p.tema.primary);
    root.style.setProperty('--perfil-accent',  p.tema.accent);
  }

  window.CCAmbPerfil = { detectar: detectar, aplicarTema: aplicarTema, perfiles: PERFILES };
})();
