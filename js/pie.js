/**
 * pie.js — Click&Clase
 *
 * Módulo del Programa de Integración Escolar (PIE):
 *   - Registro de educadoras diferenciales
 *   - Ficha PIE por estudiante (diagnóstico, decreto, adecuaciones)
 *   - Generador de adecuaciones curriculares con IA
 *   - Reportes para SIGE
 *
 * Marco legal:
 *   - Decreto 170/2010 (Mineduc): NEE Permanentes y Transitorias
 *   - Decreto 83/2015 (Mineduc): Diversificación de la Enseñanza (DUA + adecuaciones)
 *   - Decreto 67/2018 (Mineduc): Evaluación y calificación
 *
 * Modelos:
 *   pie_estudiantes/{estUid} = {
 *     estUid (liceoSlug-cursoId-estOrdinal), liceoSlug,
 *     cursoId, cursoNombre, estudianteOrdinal, estudianteNombre,
 *     diagnostico ('tdah'|'tea'|'dislexia'|'discalculia'|...),
 *     decreto ('170_permanente'|'170_transitoria'|'83'|'ambos'),
 *     tipoNEE ('permanente'|'transitoria'|'na'),
 *     dominios: [ ... categoria de necesidades ... ],
 *     adecuaciones: [{ tipo, dominio, descripcion, aplicaAsignaturas, activa, creadoEn }],
 *     educadoraUid, educadoraNombre,
 *     profesionalesExternos: [{ nombre, rol, contacto }],
 *     fechaIngresoPIE, fechaEgresoPIE,
 *     estadoPIE ('activo'|'egresado'|'suspendido'),
 *     confidencial, resumenCaso,
 *     creadoEn, actualizadoEn
 *   }
 *
 *   pie_sesiones/{sesId} = {
 *     sesId, liceoSlug, pieEstUid (referencia a la ficha),
 *     educadoraUid, educadoraNombre,
 *     fecha, tipo ('individual'|'grupal_pie'|'coenseñanza'|'evaluacion_dua'),
 *     asignatura, tema, actividades, logros, observaciones,
 *     asistenciaEstudiante, proximaSesion
 *   }
 */

(function () {
  'use strict';

  // ─── Diagnósticos según Decreto 170 ────────────────────────
  var DIAGNOSTICOS = {
    // NEE Transitorias
    TDAH:                'tdah',
    TEL:                 'tel',
    DISLEXIA:            'dislexia',
    DISCALCULIA:         'discalculia',
    DEA_LECTURA:         'dea_lectura',
    DEA_ESCRITURA:       'dea_escritura',
    DEA_MATEMATICA:      'dea_matematica',
    RANGO_LIMITROFE:     'rango_limitrofe',
    // NEE Permanentes
    DISCAPACIDAD_INTELECTUAL: 'discapacidad_intelectual',
    TEA:                 'tea',
    DISCAPACIDAD_AUDITIVA:    'discapacidad_auditiva',
    DISCAPACIDAD_VISUAL:      'discapacidad_visual',
    DISCAPACIDAD_MOTORA:      'discapacidad_motora',
    MULTIDEFICIT:        'multideficit',
    // Otros
    OTRO:                'otro'
  };

  var DIAGNOSTICO_LABEL = {
    tdah:                     'TDAH',
    tel:                      'TEL (Trastorno específico del Lenguaje)',
    dislexia:                 'Dislexia',
    discalculia:              'Discalculia',
    dea_lectura:              'DEA — Lectura',
    dea_escritura:            'DEA — Escritura',
    dea_matematica:           'DEA — Matemática',
    rango_limitrofe:          'Rango Limítrofe',
    discapacidad_intelectual: 'Discapacidad Intelectual',
    tea:                      'TEA (Trastorno Espectro Autista)',
    discapacidad_auditiva:    'Discapacidad Auditiva',
    discapacidad_visual:      'Discapacidad Visual',
    discapacidad_motora:      'Discapacidad Motora',
    multideficit:             'Multidéficit',
    otro:                     'Otro'
  };

  var NEE_TIPO = {
    tdah: 'transitoria', tel: 'transitoria',
    dislexia: 'transitoria', discalculia: 'transitoria',
    dea_lectura: 'transitoria', dea_escritura: 'transitoria', dea_matematica: 'transitoria',
    rango_limitrofe: 'transitoria',
    discapacidad_intelectual: 'permanente', tea: 'permanente',
    discapacidad_auditiva: 'permanente', discapacidad_visual: 'permanente',
    discapacidad_motora: 'permanente', multideficit: 'permanente',
    otro: 'na'
  };

  // ─── Decretos ──────────────────────────────────────────────
  var DECRETOS = {
    D170_PERMANENTE: '170_permanente',
    D170_TRANSITORIA: '170_transitoria',
    D83:             '83',
    D67:             '67',
    AMBOS_170_83:    'ambos_170_83'
  };
  var DECRETO_LABEL = {
    '170_permanente':  'Decreto 170 — NEE Permanente',
    '170_transitoria': 'Decreto 170 — NEE Transitoria',
    '83':              'Decreto 83 — Adecuaciones curriculares',
    '67':              'Decreto 67 — Evaluación diferenciada',
    'ambos_170_83':    'Decreto 170 + 83 combinados'
  };

  // ─── Tipos de adecuación (Decreto 83) ──────────────────────
  var TIPOS_ADEC = {
    ACCESO:          'acceso',
    OBJETIVOS:       'objetivos_aprendizaje',
    METODOLOGIA:     'metodologia',
    EVALUACION:      'evaluacion',
    TEMPORALIZACION: 'temporalizacion'
  };
  var TIPO_ADEC_LABEL = {
    acceso:                'Acceso',
    objetivos_aprendizaje: 'Objetivos de aprendizaje',
    metodologia:           'Metodología / DUA',
    evaluacion:            'Evaluación diferenciada',
    temporalizacion:       'Temporalización'
  };

  // ─── Estados de la ficha PIE ───────────────────────────────
  var ESTADOS_PIE = {
    ACTIVO:     'activo',
    EGRESADO:   'egresado',
    SUSPENDIDO: 'suspendido'
  };
  var ESTADO_PIE_LABEL = {
    activo:     'Activo en PIE',
    egresado:   'Egresado del PIE',
    suspendido: 'Suspendido'
  };
  var ESTADO_PIE_COLOR = {
    activo:     { bg: 'rgba(34,197,94,.15)', fg: '#86efac', border: 'rgba(34,197,94,.35)' },
    egresado:   { bg: 'rgba(148,163,184,.12)', fg: '#94a3b8', border: 'rgba(148,163,184,.35)' },
    suspendido: { bg: 'rgba(251,191,36,.15)', fg: '#fbbf24', border: 'rgba(251,191,36,.35)' }
  };

  // ─── Tipos de sesión ────────────────────────────────────────
  var TIPOS_SESION = {
    INDIVIDUAL:    'individual',
    GRUPAL:        'grupal_pie',
    COENSENANZA:   'coensenanza',
    EVAL_DUA:      'evaluacion_dua'
  };
  var TIPO_SESION_LABEL = {
    individual:      'Sesión individual',
    grupal_pie:      'Sesión grupal PIE',
    coensenanza:     'Co-enseñanza en aula',
    evaluacion_dua:  'Evaluación DUA'
  };

  function _uid() { return (window.ELAuth && ELAuth.user) ? ELAuth.user.uid : ''; }
  function _user() { return (window.ELAuth && ELAuth.user) ? ELAuth.user : null; }
  function _nombre() {
    var u = _user() || {};
    return u.nombre || u.displayName || (u.email ? u.email.split('@')[0] : '');
  }

  function _fichaId(liceoSlug, cursoId, ordinal) {
    return liceoSlug + '-' + cursoId + '-est' + ordinal;
  }

  function _idSesion() { return 'pieses-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8); }

  // ═══════════════════════════════════════════════════════════
  //  Fichas PIE de estudiantes
  // ═══════════════════════════════════════════════════════════

  function guardarFichaEstudiante(datos) {
    datos = datos || {};
    if (!datos.cursoId) throw new Error('cursoId requerido');
    if (!datos.estudianteOrdinal) throw new Error('ordinal requerido');
    if (!datos.diagnostico) throw new Error('diagnóstico requerido');

    var u = _user() || {};
    var liceoSlug = datos.liceoSlug || u.liceoSlug || u.liceoPrincipal || '';
    var estUid = _fichaId(liceoSlug, datos.cursoId, datos.estudianteOrdinal);
    var ahora = new Date().toISOString();

    var payload = {
      estUid:                estUid,
      liceoSlug:             liceoSlug,
      cursoId:               datos.cursoId,
      cursoNombre:           datos.cursoNombre || '',
      estudianteOrdinal:     datos.estudianteOrdinal,
      estudianteNombre:      datos.estudianteNombre || '',
      diagnostico:           datos.diagnostico,
      diagnosticoDetalle:    datos.diagnosticoDetalle || '',
      decreto:               datos.decreto || '170_transitoria',
      tipoNEE:               NEE_TIPO[datos.diagnostico] || 'na',
      dominios:              Array.isArray(datos.dominios) ? datos.dominios : [],
      adecuaciones:          Array.isArray(datos.adecuaciones) ? datos.adecuaciones : [],
      educadoraUid:          datos.educadoraUid || '',
      educadoraNombre:       datos.educadoraNombre || '',
      profesionalesExternos: Array.isArray(datos.profesionalesExternos) ? datos.profesionalesExternos : [],
      fechaIngresoPIE:       datos.fechaIngresoPIE || new Date().toISOString().slice(0, 10),
      fechaEgresoPIE:        datos.fechaEgresoPIE || '',
      estadoPIE:             datos.estadoPIE || ESTADOS_PIE.ACTIVO,
      confidencial:          datos.confidencial === true,
      resumenCaso:           datos.resumenCaso || '',
      actualizadoEn:         ahora,
      actualizadoPor:        u.uid || ''
    };

    return EL_DB.collection('pie_estudiantes').doc(estUid).get().then(function (s) {
      if (s.exists) {
        return EL_DB.collection('pie_estudiantes').doc(estUid).update(payload);
      } else {
        payload.creadoEn = ahora;
        payload.creadoPor = u.uid || '';
        return EL_DB.collection('pie_estudiantes').doc(estUid).set(payload);
      }
    }).then(function () {
      _log('guardar_ficha_pie', {
        estUid: estUid, diagnostico: payload.diagnostico,
        decreto: payload.decreto, liceoSlug: payload.liceoSlug
      });
      return payload;
    });
  }

  function obtenerFichaEstudiante(cursoId, ordinal, liceoSlug) {
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    var estUid = _fichaId(liceoSlug, cursoId, ordinal);
    return EL_DB.collection('pie_estudiantes').doc(estUid).get().then(function (s) {
      return s.exists ? s.data() : null;
    });
  }

  function obtenerFichaPorId(estUid) {
    return EL_DB.collection('pie_estudiantes').doc(estUid).get().then(function (s) {
      return s.exists ? s.data() : null;
    });
  }

  /**
   * Lista todas las fichas PIE del liceo.
   */
  function listarFichas(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    return EL_DB.collection('pie_estudiantes').get().then(function (snap) {
      var items = [];
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        if (opts.educadoraUid && d.educadoraUid !== opts.educadoraUid) return;
        if (opts.cursoId && d.cursoId !== opts.cursoId) return;
        if (opts.diagnostico && d.diagnostico !== opts.diagnostico) return;
        if (opts.decreto && d.decreto !== opts.decreto) return;
        if (opts.tipoNEE && d.tipoNEE !== opts.tipoNEE) return;
        if (opts.estadoPIE && d.estadoPIE !== opts.estadoPIE) return;
        items.push(d);
      });
      items.sort(function (a, b) { return String(a.estudianteNombre || '').localeCompare(b.estudianteNombre || ''); });
      return items;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  Sesiones PIE
  // ═══════════════════════════════════════════════════════════

  function registrarSesion(datos) {
    datos = datos || {};
    if (!datos.pieEstUid) throw new Error('pieEstUid requerido');
    if (!datos.tema && !datos.actividades) throw new Error('tema o actividades requeridos');
    var u = _user() || {};
    var sesId = _idSesion();
    var doc = {
      sesId:               sesId,
      liceoSlug:           datos.liceoSlug || u.liceoSlug || u.liceoPrincipal || '',
      pieEstUid:           datos.pieEstUid,
      educadoraUid:        u.uid || '',
      educadoraNombre:     _nombre(),
      fecha:               datos.fecha || new Date().toISOString().slice(0, 10),
      tipo:                datos.tipo || TIPOS_SESION.INDIVIDUAL,
      asignatura:          datos.asignatura || '',
      tema:                datos.tema || '',
      actividades:         datos.actividades || '',
      logros:              datos.logros || '',
      observaciones:       datos.observaciones || '',
      asistenciaEstudiante: datos.asistenciaEstudiante !== false,
      proximaSesion:       datos.proximaSesion || '',
      creadoEn:            new Date().toISOString()
    };
    return EL_DB.collection('pie_estudiantes').doc(datos.pieEstUid)
      .collection('sesiones').doc(sesId).set(doc)
      .then(function () {
        _log('registrar_sesion_pie', { sesId: sesId, pieEstUid: datos.pieEstUid });
        return doc;
      });
  }

  function listarSesiones(pieEstUid) {
    return EL_DB.collection('pie_estudiantes').doc(pieEstUid)
      .collection('sesiones').get().then(function (snap) {
        var items = [];
        snap.forEach(function (doc) { items.push(doc.data()); });
        items.sort(function (a, b) { return String(b.fecha || '').localeCompare(String(a.fecha || '')); });
        return items;
      }).catch(function () { return []; });
  }

  // ═══════════════════════════════════════════════════════════
  //  Adecuaciones curriculares (Decreto 83)
  // ═══════════════════════════════════════════════════════════

  /**
   * Agrega una adecuación a la ficha PIE.
   */
  function agregarAdecuacion(estUid, adec) {
    return EL_DB.collection('pie_estudiantes').doc(estUid).get().then(function (s) {
      if (!s.exists) throw new Error('Ficha no encontrada');
      var d = s.data();
      var lista = Array.isArray(d.adecuaciones) ? d.adecuaciones.slice() : [];
      lista.push(Object.assign({
        id:              'adec-' + Date.now(),
        activa:          true,
        creadoEn:        new Date().toISOString(),
        creadoPor:       _uid()
      }, adec || {}));
      return EL_DB.collection('pie_estudiantes').doc(estUid).update({
        adecuaciones: lista,
        actualizadoEn: new Date().toISOString()
      });
    });
  }

  function actualizarAdecuacion(estUid, adecId, cambios) {
    return EL_DB.collection('pie_estudiantes').doc(estUid).get().then(function (s) {
      if (!s.exists) throw new Error('Ficha no encontrada');
      var d = s.data();
      var lista = (d.adecuaciones || []).map(function (a) {
        return a.id === adecId ? Object.assign({}, a, cambios) : a;
      });
      return EL_DB.collection('pie_estudiantes').doc(estUid).update({
        adecuaciones: lista,
        actualizadoEn: new Date().toISOString()
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  Generación IA de adecuaciones curriculares
  // ═══════════════════════════════════════════════════════════

  /**
   * Llama al backend IA para generar sugerencias de adecuaciones
   * curriculares según el diagnóstico, curso y asignatura.
   *
   * @param {object} opts { diagnostico, decreto, curso, asignatura,
   *                         objetivo, dominios, temaEspecifico? }
   */
  function generarAdecuacionesIA(opts) {
    opts = opts || {};
    if (!opts.diagnostico) return Promise.reject(new Error('diagnóstico requerido'));

    var prompt = _buildPromptAdecuacion(opts);
    var endpoint = window.IA_ENDPOINT || '/api/ia-asistente';

    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'raw',
        datos: { prompt: prompt, maxTokens: 4096, temperature: 0.6 }
      })
    }).then(function (res) {
      return res.text().then(function (txt) {
        var data; try { data = JSON.parse(txt); } catch (_) { data = null; }
        if (!data) throw new Error('Respuesta inválida (HTTP ' + res.status + ')');
        return data;
      });
    }).then(function (data) {
      if (data.error) {
        var msg = (typeof data.error === 'string') ? data.error : (data.error.message || 'error IA');
        throw new Error(msg);
      }
      return { html: (data.resultado || '').trim() };
    });
  }

  function _buildPromptAdecuacion(opts) {
    var diagLbl = DIAGNOSTICO_LABEL[opts.diagnostico] || opts.diagnostico;
    var decLbl  = DECRETO_LABEL[opts.decreto] || opts.decreto || 'Decreto 83';
    return [
      'Eres un/a educador/a diferencial experto/a en Programa de Integración Escolar (PIE) del sistema chileno.',
      'Genera propuestas concretas de ADECUACIONES CURRICULARES para el siguiente estudiante:',
      '',
      'DATOS:',
      '- Diagnóstico principal: ' + diagLbl,
      opts.decreto ? '- Marco legal: ' + decLbl : '',
      opts.curso ? '- Curso: ' + opts.curso : '',
      opts.asignatura ? '- Asignatura: ' + opts.asignatura : '',
      opts.objetivo ? '- Objetivo de aprendizaje: ' + opts.objetivo : '',
      opts.temaEspecifico ? '- Tema específico: ' + opts.temaEspecifico : '',
      Array.isArray(opts.dominios) && opts.dominios.length
        ? '- Dominios de necesidad: ' + opts.dominios.join(', ') : '',
      '',
      'GENERA UNA RESPUESTA HTML CON:',
      '<h3>Adecuaciones de ACCESO</h3>',
      '<ul>...</ul>',
      '<h3>Adecuaciones de OBJETIVOS DE APRENDIZAJE</h3>',
      '<ul>...</ul>',
      '<h3>Adecuaciones METODOLÓGICAS (DUA)</h3>',
      '<ul>...</ul>',
      '<h3>Adecuaciones EVALUATIVAS (Decreto 67)</h3>',
      '<ul>...</ul>',
      '<h3>TEMPORALIZACIÓN</h3>',
      '<ul>...</ul>',
      '',
      'REGLAS:',
      '- Cada bullet debe ser una acción CONCRETA y OBSERVABLE.',
      '- Alineado con el diagnóstico y el marco de Decretos 83 y 170.',
      '- Sin recomendaciones genéricas.',
      '- En español chileno formal.',
      '- Responde SOLO con el HTML.'
    ].filter(function (x) { return x; }).join('\n');
  }

  // ═══════════════════════════════════════════════════════════
  //  Educadoras diferenciales
  // ═══════════════════════════════════════════════════════════

  /**
   * Lista los usuarios con rol pie_edu del mismo liceo.
   */
  function listarEducadoras(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    return EL_DB.collection('usuarios').get().then(function (snap) {
      var items = [];
      snap.forEach(function (doc) {
        var d = doc.data() || {};
        if (liceoSlug && d.liceoSlug !== liceoSlug) return;
        var esEdu = (d.role === 'pie_edu') ||
                    (d.roles && d.roles.pie_edu) ||
                    (d.roles && d.roles.pie_enc);
        if (esEdu) items.push({
          uid: d.uid || doc.id, nombre: d.nombre || d.displayName || d.email,
          email: d.email, rol: (d.role || 'pie_edu')
        });
      });
      return items;
    }).catch(function () { return []; });
  }

  // ═══════════════════════════════════════════════════════════
  //  KPIs
  // ═══════════════════════════════════════════════════════════

  function kpisPIE(opts) {
    opts = opts || {};
    var liceoSlug = opts.liceoSlug;
    if (!liceoSlug) {
      var u = _user() || {};
      liceoSlug = u.liceoSlug || u.liceoPrincipal || '';
    }
    return listarFichas({ liceoSlug: liceoSlug }).then(function (fichas) {
      var out = {
        totalFichas:      fichas.length,
        activos:          0, egresados: 0, suspendidos: 0,
        neePermanentes:   0, neeTransitorias: 0,
        porDiagnostico:   {},
        porCurso:         {},
        conAdecuaciones:  0
      };
      fichas.forEach(function (f) {
        if (f.estadoPIE === 'activo') out.activos++;
        if (f.estadoPIE === 'egresado') out.egresados++;
        if (f.estadoPIE === 'suspendido') out.suspendidos++;
        if (f.tipoNEE === 'permanente') out.neePermanentes++;
        if (f.tipoNEE === 'transitoria') out.neeTransitorias++;
        out.porDiagnostico[f.diagnostico] = (out.porDiagnostico[f.diagnostico] || 0) + 1;
        if (f.cursoNombre) {
          out.porCurso[f.cursoNombre] = (out.porCurso[f.cursoNombre] || 0) + 1;
        }
        if (Array.isArray(f.adecuaciones) && f.adecuaciones.length) out.conAdecuaciones++;
      });
      return out;
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  UI helpers
  // ═══════════════════════════════════════════════════════════

  function badgeEstadoPIE(estado) {
    var c = ESTADO_PIE_COLOR[estado] || ESTADO_PIE_COLOR.activo;
    var lbl = ESTADO_PIE_LABEL[estado] || estado;
    return '<span style="display:inline-block;padding:2px 8px;border-radius:999px;' +
           'background:' + c.bg + ';color:' + c.fg + ';border:1px solid ' + c.border + ';' +
           'font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px">' + lbl + '</span>';
  }

  function badgeDiagnostico(diag) {
    var lbl = DIAGNOSTICO_LABEL[diag] || diag;
    var tipo = NEE_TIPO[diag] || 'na';
    var color = tipo === 'permanente' ? '#f472b6' : '#c4b5fd';
    return '<span style="display:inline-block;padding:2px 8px;border-radius:4px;' +
           'background:' + color + '22;color:' + color + ';border:1px solid ' + color + '55;' +
           'font-size:.72rem;font-weight:600">' + lbl + '</span>';
  }

  function _log(tipo, meta) {
    try { if (window.ELDB && ELDB.actividad && ELDB.actividad.log) ELDB.actividad.log(tipo, meta || {}); } catch (e) {}
  }

  // ─── API pública ────────────────────────────────────────────
  window.CCPie = {
    DIAGNOSTICOS: DIAGNOSTICOS, DIAGNOSTICO_LABEL: DIAGNOSTICO_LABEL, NEE_TIPO: NEE_TIPO,
    DECRETOS: DECRETOS, DECRETO_LABEL: DECRETO_LABEL,
    TIPOS_ADEC: TIPOS_ADEC, TIPO_ADEC_LABEL: TIPO_ADEC_LABEL,
    ESTADOS_PIE: ESTADOS_PIE, ESTADO_PIE_LABEL: ESTADO_PIE_LABEL,
    TIPOS_SESION: TIPOS_SESION, TIPO_SESION_LABEL: TIPO_SESION_LABEL,
    // Fichas
    guardarFichaEstudiante: guardarFichaEstudiante,
    obtenerFichaEstudiante: obtenerFichaEstudiante,
    obtenerFichaPorId:      obtenerFichaPorId,
    listarFichas:           listarFichas,
    // Sesiones
    registrarSesion:        registrarSesion,
    listarSesiones:         listarSesiones,
    // Adecuaciones
    agregarAdecuacion:      agregarAdecuacion,
    actualizarAdecuacion:   actualizarAdecuacion,
    generarAdecuacionesIA:  generarAdecuacionesIA,
    // Educadoras
    listarEducadoras:       listarEducadoras,
    // Stats
    kpisPIE:                kpisPIE,
    // UI
    badgeEstadoPIE:         badgeEstadoPIE,
    badgeDiagnostico:       badgeDiagnostico
  };
})();
