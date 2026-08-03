/**
 * modal-usuario-unificado.js — Click&Clase
 * ═══════════════════════════════════════════════════════════════
 * Componente unificado para CREAR o EDITAR usuarios en 1 pantalla.
 * Reemplaza los modales dispersos de admin.html, panel-superadmin-colegio.html,
 * panel-admin-colegio.html.
 *
 * Soporta:
 *   • Alta de usuario con o sin colegio asignado
 *     (docente individual que contrata el servicio → sin colegio o "individual")
 *   • Selección múltiple de roles (profesor + jefe_curso + utp, etc.)
 *   • Selección múltiple de asignaturas Plan Común + módulos TP
 *   • Selección múltiple de niveles
 *   • Especialidad TP con módulos si aplica
 *
 * Uso:
 *   ELModalUsuario.abrir({
 *     modo:        'crear' | 'editar',              // Por defecto 'crear'
 *     usuario:     { uid, nombre, email, ... },     // Solo si modo='editar'
 *     colegios:    [{ slug, nombre }],              // Lista de colegios para el dropdown
 *     colegioSlug: 'demo',                          // Preseleccionar colegio (opcional)
 *     colegioBloqueado: true,                       // Dropdown deshabilitado (admin_colegio)
 *     permitirSinColegio: true,                     // Muestra opción "Individual"
 *     catalogoCruces: ['matematica__8B', ...],      // Si viene: usar cruces asig+nivel
 *                                                    // del colegio (superadmin-colegio)
 *     asignaturasCatalogo: { id: 'label', ... },    // Override del catálogo de asignaturas
 *     onGuardar:   async (datos) => { ... }         // Callback que persiste. Recibe:
 *                                                    //   { nombre, email, password, cargo,
 *                                                    //     colegioSlug, roles[], profesion,
 *                                                    //     asignaturas[], niveles[], especialidadTP,
 *                                                    //     asignaturasCruces[], cursosJefatura[] }
 *   });
 *
 * Requiere en el DOM: ninguna dependencia HTML previa (se inyecta).
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // Catálogos
  // ═══════════════════════════════════════════════════════════════

  // Roles del sistema (id: label + icono + color badge)
  var ROLES = [
    { id: 'profesor',        label: 'Profesor',              icono: '📚', color: '#2563EB' },
    { id: 'jefe_curso',      label: 'Profesor Jefe',         icono: '⭐', color: '#7C3AED' },
    { id: 'utp',             label: 'Jefe UTP',              icono: '📋', color: '#0891B2' },
    { id: 'director',        label: 'Director/a',            icono: '🎯', color: '#0F172A' },
    { id: 'rector',          label: 'Rector/a',              icono: '🏛️', color: '#0F172A' },
    { id: 'admin_colegio',   label: 'Admin del Colegio',     icono: '🛡️', color: '#059669' },
    { id: 'encargado_area',  label: 'Encargado/a de Área',   icono: '📁', color: '#0891B2' },
    { id: 'pie_enc',         label: 'PIE — Encargado/a',     icono: '✨', color: '#059669' },
    { id: 'pie_edu',         label: 'PIE — Educador/a',      icono: '🎓', color: '#059669' },
    { id: 'aps_enc',         label: 'Apoyo — Encargado/a',   icono: '💚', color: '#14B8A6' },
    { id: 'aps_prof',        label: 'Apoyo — Profesional',   icono: '🧠', color: '#14B8A6' },
    { id: 'amb_enc',         label: 'Convivencia — Encargado/a', icono: '🕊️', color: '#F59E0B' },
    { id: 'amb_prof',        label: 'Convivencia — Profesional', icono: '⚖️', color: '#F59E0B' },
    { id: 'admin',           label: 'Admin Plataforma',      icono: '👑', color: '#DC2626' }
  ];

  // Profesiones que puede tener un aps_prof / pie_edu / amb_prof (afecta panel específico)
  var PROFESIONES = [
    'Psicólogo/a', 'Trabajador/a Social', 'Psicopedagogo/a', 'Fonoaudiólogo/a',
    'Educador/a Diferencial', 'Terapeuta Ocupacional', 'Kinesiólogo/a',
    'Orientador/a', 'Mediador/a Escolar', 'Inspector/a', 'Otro'
  ];

  // Asignaturas Plan Común (id → label)
  var ASIGNATURAS_PC = {
    lenguaje:       'Lenguaje y Comunicación',
    ling_liter:     'Lengua y Literatura',
    matematica:     'Matemática',
    historia:       'Historia, Geografía y Cs. Sociales',
    ed_ciudadana:   'Educación Ciudadana',
    ciencias_nat:   'Ciencias Naturales',
    biologia:       'Biología',
    fisica:         'Física',
    quimica:        'Química',
    ingles:         'Inglés',
    ed_fisica:      'Educación Física y Salud',
    artes_vis:      'Artes Visuales',
    musica:         'Música',
    tecnologia:     'Tecnología',
    filosofia:      'Filosofía',
    religion:       'Religión',
    orientacion:    'Orientación',
    cs_ciudadania:  'Ciencias para la Ciudadanía',
    artes_esc:      'Artes Escénicas'
  };

  // Especialidades TP (id → label)
  var ESPECIALIDADES_TP = {
    tp_administracion:  'Administración',
    tp_agropecuaria:    'Agropecuaria',
    tp_elab_alim:       'Elaboración Industrial de Alimentos',
    tp_gastronomia:     'Gastronomía',
    tp_ventas:          'Ventas',
    tp_contabilidad:    'Contabilidad',
    tp_logistica:       'Logística',
    tp_confeccion:      'Vestuario y Confección Textil',
    tp_edificacion:     'Edificación',
    tp_sanitarias:      'Instalaciones Sanitarias',
    tp_refrig:          'Refrigeración y Climatización',
    tp_electricidad:    'Electricidad',
    tp_electronica:     'Electrónica',
    tp_telecom:         'Telecomunicaciones',
    tp_mec_auto:        'Mecánica Automotriz',
    tp_mec_ind:         'Mecánica Industrial',
    tp_enfermeria:      'Atención de Enfermería',
    tp_parvulos:        'Atención de Párvulos',
    tp_adulto_mayor:    'Atención de Adulto Mayor'
  };

  var NIVELES = [
    { id: 'NT1', label: 'NT1' }, { id: 'NT2', label: 'NT2' },
    { id: '1B',  label: '1° Básico' }, { id: '2B', label: '2° Básico' },
    { id: '3B',  label: '3° Básico' }, { id: '4B', label: '4° Básico' },
    { id: '5B',  label: '5° Básico' }, { id: '6B', label: '6° Básico' },
    { id: '7B',  label: '7° Básico' }, { id: '8B', label: '8° Básico' },
    { id: '1M',  label: '1° Medio' },  { id: '2M', label: '2° Medio' },
    { id: '3M',  label: '3° Medio' },  { id: '4M', label: '4° Medio' }
  ];

  // ═══════════════════════════════════════════════════════════════
  // Estado interno
  // ═══════════════════════════════════════════════════════════════
  var estado = {};

  // ═══════════════════════════════════════════════════════════════
  // Renderizado (helpers)
  // ═══════════════════════════════════════════════════════════════
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  }); }

  function renderRoles(seleccionados) {
    return ROLES.map(function (r) {
      var checked = seleccionados.indexOf(r.id) !== -1;
      return '<label class="mu-check" data-role="'+r.id+'" style="'+
        'display:flex;gap:8px;align-items:center;padding:8px 10px;border-radius:8px;cursor:pointer;'+
        'border:1.5px solid '+(checked?r.color:'rgba(0,0,0,.12)')+';'+
        'background:'+(checked?r.color+'15':'transparent')+';font-size:.85rem;'+
        'transition:all .15s">'+
        '<input type="checkbox" '+(checked?'checked':'')+' data-role="'+r.id+'" style="margin:0">'+
        '<span>'+r.icono+' '+esc(r.label)+'</span></label>';
    }).join('');
  }

  function renderAsignaturas(seleccionadas) {
    var pcHtml = Object.keys(ASIGNATURAS_PC).map(function (id) {
      var checked = seleccionadas.indexOf(id) !== -1;
      return '<label class="mu-asig" style="'+
        'display:flex;gap:6px;align-items:center;padding:6px 10px;border-radius:6px;cursor:pointer;'+
        'border:1px solid '+(checked?'#0EA5E9':'rgba(0,0,0,.1)')+';'+
        'background:'+(checked?'#EFF6FF':'transparent')+';font-size:.78rem">'+
        '<input type="checkbox" '+(checked?'checked':'')+' data-asig="'+id+'" style="margin:0">'+
        esc(ASIGNATURAS_PC[id])+'</label>';
    }).join('');
    return pcHtml;
  }

  function renderEspecialidadesTP(seleccionada) {
    var opts = '<option value="">— Ninguna (no dicta TP) —</option>' +
      Object.keys(ESPECIALIDADES_TP).map(function (id) {
        return '<option value="'+id+'"'+(seleccionada===id?' selected':'')+'>'+esc(ESPECIALIDADES_TP[id])+'</option>';
      }).join('');
    return opts;
  }

  // Renderiza cruces asig__nivel del colegio como checkboxes agrupados por asignatura
  function renderCruces(catalogoCruces, seleccionados) {
    if (!catalogoCruces || !catalogoCruces.length) {
      return '<div style="grid-column:1/-1;color:#94a3b8;font-size:.82rem;padding:14px;text-align:center;background:#fff;border-radius:6px">' +
             '⚠️ Este colegio no tiene asignaturas configuradas.<br>' +
             'Andá a la pestaña "Asignaturas y niveles" y configuralas primero.</div>';
    }
    var sel = new Set(seleccionados || []);
    // Agrupar por asignatura para render más limpio
    var porAsig = {};
    catalogoCruces.forEach(function (k) {
      var p = String(k).split('__');
      var asigId = p[0], nivel = p[1] || '';
      if (!porAsig[asigId]) porAsig[asigId] = [];
      porAsig[asigId].push({ cruce: k, nivel: nivel });
    });
    // Etiqueta legible de la asignatura
    function labelAsig(id) {
      var cat = window.ELModalUsuario && window.ELModalUsuario.ASIGNATURAS_PC || ASIGNATURAS_PC;
      return cat[id] || id;
    }
    var html = '';
    Object.keys(porAsig).sort().forEach(function (asigId) {
      html += '<div style="grid-column:1/-1;font-size:.72rem;font-weight:700;color:#64748b;padding:6px 4px 2px;text-transform:uppercase;letter-spacing:.03em">' +
              esc(labelAsig(asigId)) + '</div>';
      porAsig[asigId].forEach(function (item) {
        var checked = sel.has(item.cruce);
        html += '<label class="mu-cruce" style="' +
          'display:flex;gap:6px;align-items:center;padding:6px 10px;border-radius:6px;cursor:pointer;' +
          'border:1px solid ' + (checked ? '#0EA5E9' : 'rgba(0,0,0,.1)') + ';' +
          'background:' + (checked ? '#EFF6FF' : 'transparent') + ';font-size:.78rem">' +
          '<input type="checkbox" ' + (checked ? 'checked' : '') + ' data-cruce="' + esc(item.cruce) + '" style="margin:0">' +
          esc(item.nivel) + '</label>';
      });
    });
    return html;
  }

  function renderNiveles(seleccionados) {
    return NIVELES.map(function (n) {
      var checked = seleccionados.indexOf(n.id) !== -1;
      return '<label style="display:flex;gap:5px;align-items:center;padding:5px 9px;border-radius:5px;cursor:pointer;'+
        'border:1px solid '+(checked?'#0EA5E9':'rgba(0,0,0,.1)')+';'+
        'background:'+(checked?'#EFF6FF':'transparent')+';font-size:.78rem">'+
        '<input type="checkbox" '+(checked?'checked':'')+' data-nivel="'+n.id+'" style="margin:0">'+
        esc(n.label)+'</label>';
    }).join('');
  }

  function renderColegios(colegios, slugSeleccionado, permitirSinColegio) {
    var opts = '';
    if (permitirSinColegio) {
      opts += '<option value="__individual__"'+
        (slugSeleccionado==='__individual__'?' selected':'')+
        '>👤 Individual (sin colegio)</option>';
    }
    opts += (colegios || []).map(function (c) {
      return '<option value="'+esc(c.slug)+'"'+
        (c.slug===slugSeleccionado?' selected':'')+
        '>🏫 '+esc(c.nombre || c.slug)+'</option>';
    }).join('');
    return opts;
  }

  function renderProfesiones(sel) {
    return '<option value="">— Ninguna —</option>' +
      PROFESIONES.map(function (p) {
        return '<option value="'+esc(p)+'"'+(p===sel?' selected':'')+'>'+esc(p)+'</option>';
      }).join('');
  }

  // ═══════════════════════════════════════════════════════════════
  // Modal HTML
  // ═══════════════════════════════════════════════════════════════
  function abrirModal() {
    cerrarModal();  // Idempotente
    var u = estado.usuario || {};
    var esEditar = estado.modo === 'editar';
    var roles = u.rolesArr || (u.role ? [u.role] : ['profesor']);
    var asigs = u.asignaturas || [];
    var niveles = u.niveles || [];
    var espTP = (u.especialidades && u.especialidades[0]) || u.especialidad || '';
    var colegioSel = estado.colegioSlug || u.liceoSlug || (estado.permitirSinColegio ? '__individual__' : '');
    var profesion = u.profesion || '';

    var html =
      '<div id="muMask" style="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:11000;'+
      'display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto">'+
        '<div style="background:#fff;border-radius:16px;max-width:820px;width:100%;'+
        'max-height:92vh;overflow:auto;padding:26px">'+

          // Header
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">'+
            '<h2 style="margin:0;font-size:1.25rem;color:#0C1E3B">'+
              (esEditar ? '✏️ Editar usuario' : '➕ Nuevo usuario') +
            '</h2>'+
            '<button onclick="ELModalUsuario.cerrar()" style="background:none;border:0;'+
            'font-size:1.6rem;cursor:pointer;color:#64748b;line-height:1">×</button>'+
          '</div>'+

          // Sección 1: DATOS BÁSICOS
          '<div style="margin-bottom:18px">'+
            '<div style="font-weight:700;font-size:.78rem;color:#64748b;'+
            'letter-spacing:.06em;margin-bottom:8px">👤 DATOS BÁSICOS</div>'+
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
              '<div style="grid-column:1/-1"><label style="font-size:.8rem;font-weight:600;display:block;margin-bottom:3px">Nombre completo *</label>'+
                '<input id="muNombre" type="text" value="'+esc(u.nombre)+'" placeholder="María Pérez González" style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem"></div>'+
              '<div><label style="font-size:.8rem;font-weight:600;display:block;margin-bottom:3px">Email *</label>'+
                '<input id="muEmail" type="email" value="'+esc(u.email)+'" placeholder="maria@colegio.cl" '+(esEditar?'disabled':'')+' style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem'+(esEditar?';background:#f1f5f9;color:#64748b':'')+'"></div>'+
              '<div><label style="font-size:.8rem;font-weight:600;display:block;margin-bottom:3px">'+(esEditar?'Nueva contraseña (opcional)':'Contraseña *')+'</label>'+
                '<input id="muPass" type="text" value="" placeholder="'+(esEditar?'dejar vacío para no cambiar':'mín. 6 caracteres')+'" style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem;font-family:monospace"></div>'+
              '<div style="grid-column:1/-1"><label style="font-size:.8rem;font-weight:600;display:block;margin-bottom:3px">Cargo (opcional)</label>'+
                '<input id="muCargo" type="text" value="'+esc(u.cargo)+'" placeholder="Ej: Coordinadora de Ciclo Básico" style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem"></div>'+
            '</div>'+
          '</div>'+

          // Sección 2: COLEGIO
          '<div style="margin-bottom:18px">'+
            '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em;margin-bottom:8px">🏫 COLEGIO'+
              (estado.colegioBloqueado ? ' <span style="font-weight:400;color:#94a3b8">(fijo)</span>' : '') +
            '</div>'+
            '<select id="muColegio" '+(estado.colegioBloqueado?'disabled':'')+' style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem'+(estado.colegioBloqueado?';background:#f1f5f9;color:#64748b;cursor:not-allowed':'')+'">'+
              renderColegios(estado.colegios, colegioSel, estado.permitirSinColegio && !estado.colegioBloqueado)+
            '</select>'+
            (estado.permitirSinColegio && !estado.colegioBloqueado ?
              '<div style="font-size:.72rem;color:#64748b;margin-top:4px">💡 "Individual" = docente sin colegio (uso personal / contratación individual del servicio)</div>' : '')+
          '</div>'+

          // Sección 3: ROLES
          '<div style="margin-bottom:18px">'+
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'+
              '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em">🎯 ROLES <span style="color:#DC2626">*</span> <span style="font-weight:400;color:#94a3b8">(seleccioná uno o más)</span></div>'+
              '<div style="display:flex;gap:6px">'+
                '<button type="button" onclick="ELModalUsuario._todos(\'role\')" style="font-size:.7rem;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer">Ninguno</button>'+
              '</div>'+
            '</div>'+
            '<div id="muRolesGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:6px">'+
              renderRoles(roles)+
            '</div>'+
          '</div>'+

          // Sección 4: PROFESION (solo si tiene rol PIE/APS/AMB)
          '<div id="muProfesionBox" style="margin-bottom:18px;display:none">'+
            '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em;margin-bottom:8px">🩺 PROFESIÓN <span style="font-weight:400;color:#94a3b8">(si aplica: psicólogo, fonoaudiólogo, etc.)</span></div>'+
            '<select id="muProfesion" style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem">'+
              renderProfesiones(profesion)+
            '</select>'+
          '</div>'+

          // Sección 5-7: ASIGNATURAS/NIVELES (modo cruces vs modo plano)
          (estado.catalogoCruces ?
            // ── MODO CRUCES: asig+nivel del colegio ──
            ('<div style="margin-bottom:18px">'+
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'+
                '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em">📖 ASIGNATURAS QUE DICTA <span style="font-weight:400;color:#94a3b8">(las del colegio, por nivel)</span></div>'+
                '<div style="display:flex;gap:6px">'+
                  '<button type="button" onclick="ELModalUsuario._todos(\'cruce\',true)" style="font-size:.7rem;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer">Todas</button>'+
                  '<button type="button" onclick="ELModalUsuario._todos(\'cruce\',false)" style="font-size:.7rem;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer">Ninguna</button>'+
                '</div>'+
              '</div>'+
              '<div id="muCrucesGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:5px;max-height:250px;overflow-y:auto;padding:8px;background:#f8fafc;border-radius:6px">'+
                renderCruces(estado.catalogoCruces, u.asignaturasCruces || u.cruces || [])+
              '</div>'+
            '</div>'+
            '<div style="margin-bottom:18px">'+
              '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em;margin-bottom:8px">⚙️ ESPECIALIDAD TP <span style="font-weight:400;color:#94a3b8">(opcional)</span></div>'+
              '<select id="muEspTP" style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem">'+
                renderEspecialidadesTP(espTP)+
              '</select>'+
            '</div>')
          :
            // ── MODO PLANO: asignaturas + niveles separados ──
            ('<div style="margin-bottom:18px">'+
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'+
                '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em">📖 ASIGNATURAS QUE DICTA <span style="font-weight:400;color:#94a3b8">(Plan Común)</span></div>'+
                '<div style="display:flex;gap:6px">'+
                  '<button type="button" onclick="ELModalUsuario._todos(\'asig\',true)" style="font-size:.7rem;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer">Todas</button>'+
                  '<button type="button" onclick="ELModalUsuario._todos(\'asig\',false)" style="font-size:.7rem;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer">Ninguna</button>'+
                '</div>'+
              '</div>'+
              '<div id="muAsigsGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:5px;max-height:180px;overflow-y:auto;padding:5px;background:#f8fafc;border-radius:6px">'+
                renderAsignaturas(asigs)+
              '</div>'+
            '</div>'+
            '<div style="margin-bottom:18px">'+
              '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em;margin-bottom:8px">⚙️ ESPECIALIDAD TÉCNICO-PROFESIONAL <span style="font-weight:400;color:#94a3b8">(si dicta módulos TP)</span></div>'+
              '<select id="muEspTP" style="width:100%;padding:9px 11px;border-radius:6px;border:1px solid rgba(0,0,0,.15);font-size:.9rem">'+
                renderEspecialidadesTP(espTP)+
              '</select>'+
            '</div>'+
            '<div style="margin-bottom:18px">'+
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'+
                '<div style="font-weight:700;font-size:.78rem;color:#64748b;letter-spacing:.06em">🎒 NIVELES QUE DICTA</div>'+
                '<div style="display:flex;gap:6px">'+
                  '<button type="button" onclick="ELModalUsuario._todos(\'nivel\',true)" style="font-size:.7rem;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer">Todos</button>'+
                  '<button type="button" onclick="ELModalUsuario._todos(\'nivel\',false)" style="font-size:.7rem;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;background:#f8fafc;cursor:pointer">Ninguno</button>'+
                '</div>'+
              '</div>'+
              '<div id="muNivelesGrid" style="display:flex;flex-wrap:wrap;gap:6px">'+
                renderNiveles(niveles)+
              '</div>'+
            '</div>')
          )+

          // Mensaje de resultado
          '<div id="muMsg" style="margin-top:12px;min-height:22px;font-size:.85rem"></div>'+

          // Botones
          '<div style="display:flex;gap:8px;justify-content:flex-end;padding-top:14px;border-top:1px solid rgba(0,0,0,.08)">'+
            '<button onclick="ELModalUsuario.cerrar()" style="padding:9px 16px;border:1px solid #cbd5e1;background:#fff;border-radius:8px;cursor:pointer">Cancelar</button>'+
            '<button id="muBtnGuardar" onclick="ELModalUsuario._guardar()" style="padding:9px 20px;border:0;background:linear-gradient(135deg,#14b8a6,#0EA5E9);color:#fff;border-radius:8px;cursor:pointer;font-weight:700">'+
              (esEditar ? '💾 Guardar cambios' : '✅ Crear usuario') +
            '</button>'+
          '</div>'+

        '</div>'+
      '</div>';

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstChild);

    // Bindear cambio de roles → mostrar/ocultar profesión
    bindRolesChange();
    actualizarVisibilidadProfesion();
  }

  function cerrarModal() {
    var m = document.getElementById('muMask');
    if (m) m.remove();
  }

  function bindRolesChange() {
    var grid = document.getElementById('muRolesGrid');
    if (!grid) return;
    grid.addEventListener('change', function () {
      actualizarVisibilidadProfesion();
      // Re-renderizar solo el bloque de roles para actualizar bordes/colores visuales
      var roles = obtenerRolesSeleccionados();
      grid.innerHTML = renderRoles(roles);
    });
  }

  function actualizarVisibilidadProfesion() {
    var roles = obtenerRolesSeleccionados();
    var rolesConProfesion = ['pie_enc','pie_edu','aps_enc','aps_prof','amb_enc','amb_prof'];
    var mostrar = roles.some(function (r) { return rolesConProfesion.indexOf(r) !== -1; });
    var box = document.getElementById('muProfesionBox');
    if (box) box.style.display = mostrar ? 'block' : 'none';
  }

  function obtenerRolesSeleccionados() {
    var inputs = document.querySelectorAll('#muRolesGrid input[data-role]:checked');
    return Array.prototype.slice.call(inputs).map(function (i) { return i.getAttribute('data-role'); });
  }

  function obtenerAsignaturasSeleccionadas() {
    var inputs = document.querySelectorAll('#muAsigsGrid input[data-asig]:checked');
    return Array.prototype.slice.call(inputs).map(function (i) { return i.getAttribute('data-asig'); });
  }

  function obtenerNivelesSeleccionados() {
    var inputs = document.querySelectorAll('#muNivelesGrid input[data-nivel]:checked');
    return Array.prototype.slice.call(inputs).map(function (i) { return i.getAttribute('data-nivel'); });
  }
  function obtenerCrucesSeleccionados() {
    var inputs = document.querySelectorAll('#muCrucesGrid input[data-cruce]:checked');
    return Array.prototype.slice.call(inputs).map(function (i) { return i.getAttribute('data-cruce'); });
  }

  function toggleTodos(tipo, valor) {
    var sel = tipo === 'role' ? '#muRolesGrid'
            : tipo === 'asig' ? '#muAsigsGrid'
            : tipo === 'cruce' ? '#muCrucesGrid'
            : '#muNivelesGrid';
    var attr = tipo === 'role' ? 'data-role'
             : tipo === 'asig' ? 'data-asig'
             : tipo === 'cruce' ? 'data-cruce'
             : 'data-nivel';
    var inputs = document.querySelectorAll(sel + ' input[' + attr + ']');
    Array.prototype.forEach.call(inputs, function (i) { i.checked = !!valor; });
    if (tipo === 'role') {
      var grid = document.getElementById('muRolesGrid');
      var roles = obtenerRolesSeleccionados();
      grid.innerHTML = renderRoles(roles);
      actualizarVisibilidadProfesion();
    }
  }

  function mensaje(html, tipo) {
    var m = document.getElementById('muMsg');
    if (!m) return;
    var color = tipo === 'error' ? '#dc2626' : tipo === 'ok' ? '#059669' : '#64748b';
    m.innerHTML = '<span style="color:'+color+'">'+html+'</span>';
  }

  function guardar() {
    var nombre  = (document.getElementById('muNombre').value || '').trim();
    var email   = (document.getElementById('muEmail').value || '').trim().toLowerCase();
    var pass    = (document.getElementById('muPass').value || '').trim();
    var cargo   = (document.getElementById('muCargo').value || '').trim();
    var colegio = (document.getElementById('muColegio').value || '').trim();
    var profesion = (document.getElementById('muProfesion') && document.getElementById('muProfesion').value) || '';
    var espTP   = (document.getElementById('muEspTP').value || '').trim();
    var roles   = obtenerRolesSeleccionados();
    var asigs   = obtenerAsignaturasSeleccionadas();
    var niveles = obtenerNivelesSeleccionados();
    var cruces  = obtenerCrucesSeleccionados();

    // Validaciones
    if (!nombre) return mensaje('⚠️ Nombre requerido.', 'error');
    if (!email || email.indexOf('@') === -1) return mensaje('⚠️ Email inválido.', 'error');
    if (estado.modo !== 'editar' && (!pass || pass.length < 6))
      return mensaje('⚠️ Contraseña de mínimo 6 caracteres.', 'error');
    if (roles.length === 0) return mensaje('⚠️ Marcá al menos un rol.', 'error');
    if (!colegio) return mensaje('⚠️ Elegí un colegio (o marcá Individual).', 'error');

    // Construir payload
    var datos = {
      nombre: nombre,
      email: email,
      password: pass || undefined,
      cargo: cargo,
      colegioSlug: colegio === '__individual__' ? '' : colegio,
      esIndividual: colegio === '__individual__',
      roles: roles,
      rolPrincipal: roles[0],   // primero = principal
      profesion: profesion || undefined,
      asignaturas: asigs,
      niveles: niveles,
      asignaturasCruces: cruces,   // modo cruces (asig__nivel)
      especialidadTP: espTP || undefined
    };
    // Si estamos en modo cruces y hay cruces marcados, derivar asignaturas y niveles del cruce
    if (estado.catalogoCruces && cruces.length > 0) {
      var asigsSet = new Set(), nivsSet = new Set();
      cruces.forEach(function (k) {
        var p = String(k).split('__');
        if (p[0]) asigsSet.add(p[0]);
        if (p[1]) nivsSet.add(p[1]);
      });
      datos.asignaturas = Array.from(asigsSet);
      datos.niveles = Array.from(nivsSet);
    }

    // Modo editar: pasar uid
    if (estado.modo === 'editar' && estado.usuario && estado.usuario.uid) {
      datos.uid = estado.usuario.uid;
    }

    // Disable botón y llamar callback
    var btn = document.getElementById('muBtnGuardar');
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    mensaje('💾 Guardando...');

    Promise.resolve(estado.onGuardar ? estado.onGuardar(datos) : null)
      .then(function () {
        mensaje('✓ Guardado correctamente.', 'ok');
        setTimeout(cerrarModal, 800);
      })
      .catch(function (e) {
        mensaje('✗ ' + (e.message || e), 'error');
        if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
      });
  }

  // ═══════════════════════════════════════════════════════════════
  // API pública
  // ═══════════════════════════════════════════════════════════════
  window.ELModalUsuario = {
    abrir: function (config) {
      estado = Object.assign({
        modo: 'crear',
        usuario: null,
        colegios: [],
        colegioSlug: null,
        permitirSinColegio: true,
        onGuardar: null
      }, config || {});
      abrirModal();
    },
    cerrar: cerrarModal,
    _guardar: guardar,
    _todos: toggleTodos,
    // Exponer catálogos por si alguna vista los necesita
    ROLES: ROLES,
    ASIGNATURAS_PC: ASIGNATURAS_PC,
    ESPECIALIDADES_TP: ESPECIALIDADES_TP,
    PROFESIONES: PROFESIONES,
    NIVELES: NIVELES
  };
})();
