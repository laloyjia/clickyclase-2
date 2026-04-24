/* ============================================
   ElectroLearn — Gamificacion v1.0
   Especialidad Electronica
   ============================================ */

// ================================================
// SISTEMA DE NIVELES
// ================================================
var NIVELES = [
    { min: 0,    nombre: 'Aprendiz',     icon: '⚡', color: '#94a3b8', desc: 'Estas comenzando tu camino tecnico' },
    { min: 150,  nombre: 'Tecnico',      icon: '🔧', color: '#60a5fa', desc: 'Dominas los fundamentos basicos' },
    { min: 400,  nombre: 'Especialista', icon: '🔌', color: '#34d399', desc: 'Aplicas conocimientos con confianza' },
    { min: 800,  nombre: 'Experto',      icon: '💡', color: '#f59e0b', desc: 'Analiza y resuelve problemas complejos' },
    { min: 1500, nombre: 'Maestro',      icon: '⭐', color: '#a78bfa', desc: 'Dominio completo de la especialidad' }
];

// ================================================
// INSIGNIAS / BADGES
// ================================================
var INSIGNIAS = [
    {
        id: 'primer_paso', nombre: 'Primer Paso', icon: '🎯', color: '#60a5fa',
        desc: 'Completaste tu primera evaluacion',
        condicion: function(u) { return (u.completedQuizzes || []).length >= 1; }
    },
    {
        id: 'xp_100', nombre: 'Centenario', icon: '⚡', color: '#f59e0b',
        desc: 'Alcanzaste 100 puntos XP',
        condicion: function(u) { return (u.xp || 0) >= 100; }
    },
    {
        id: 'xp_400', nombre: 'Especialista XP', icon: '🔌', color: '#34d399',
        desc: 'Alcanzaste 400 puntos XP',
        condicion: function(u) { return (u.xp || 0) >= 400; }
    },
    {
        id: 'xp_1500', nombre: 'Maestro Salesiano', icon: '⭐', color: '#a78bfa',
        desc: 'Alcanzaste 1500 puntos XP: eres un Maestro',
        condicion: function(u) { return (u.xp || 0) >= 1500; }
    },
    {
        id: 'perfecto', nombre: 'Perfecto!', icon: '💯', color: '#f43f5e',
        desc: 'Obtuviste 100% en una evaluacion',
        condicion: function(u) { return (u.completedQuizzes || []).some(function(q) { return q.score === 100; }); }
    },
    {
        id: 'sobre_6', nombre: 'Excelencia', icon: '🏆', color: '#f59e0b',
        desc: 'Obtuviste nota 6.0 o superior',
        condicion: function(u) { return (u.completedQuizzes || []).some(function(q) { return (q.nota || 0) >= 6.0; }); }
    },
    {
        id: 'cinco_eval', nombre: 'Constante', icon: '🔥', color: '#ef4444',
        desc: 'Completaste 5 evaluaciones',
        condicion: function(u) { return (u.completedQuizzes || []).length >= 5; }
    },
    {
        id: 'diez_eval', nombre: 'Incansable', icon: '💪', color: '#8b5cf6',
        desc: 'Completaste 10 evaluaciones',
        condicion: function(u) { return (u.completedQuizzes || []).length >= 10; }
    },
    {
        id: 'tres_modulos', nombre: 'Explorador', icon: '🗺️', color: '#06b6d4',
        desc: 'Evaluado en 3 modulos diferentes',
        condicion: function(u) {
            var mods = {};
            (u.completedQuizzes || []).forEach(function(q) { if (q.modulo) mods[q.modulo] = 1; });
            return Object.keys(mods).length >= 3;
        }
    },
    {
        id: 'racha_3', nombre: 'En Racha', icon: '🎯', color: '#10b981',
        desc: '3 evaluaciones aprobadas seguidas (nota >= 4.0)',
        condicion: function(u) {
            var qs = (u.completedQuizzes || []);
            var racha = 0;
            for (var i = qs.length - 1; i >= 0; i--) {
                if ((qs[i].nota || 0) >= 4.0) racha++;
                else break;
            }
            return racha >= 3;
        }
    },
    {
        id: 'salesiano', nombre: 'Espiritu Salesiano', icon: '🕊️', color: '#f97316',
        desc: 'Completaste una evaluacion con nota maxima en un modulo de 4to Medio',
        condicion: function(u) {
            return (u.completedQuizzes || []).some(function(q) {
                return q.score === 100 && (q.nivel === '4to' || q.curso === '4to Medio E');
            });
        }
    },
    {
        id: 'veloz', nombre: 'Veloz', icon: '⚡', color: '#eab308',
        desc: 'Completaste una evaluacion en menos de 5 minutos con 80%+',
        condicion: function(u) {
            return (u.completedQuizzes || []).some(function(q) {
                return q.tiempoSegundos && q.tiempoSegundos < 300 && q.score >= 80;
            });
        }
    }
];

// ================================================
// FUNCIONES DE NIVEL
// ================================================
function calcularNivel(xp) {
    var nivel = NIVELES[0];
    for (var i = NIVELES.length - 1; i >= 0; i--) {
        if (xp >= NIVELES[i].min) {
            nivel = NIVELES[i];
            break;
        }
    }
    return nivel;
}

function xpParaSiguienteNivel(xp) {
    for (var i = 0; i < NIVELES.length - 1; i++) {
        if (xp < NIVELES[i + 1].min) {
            return { actual: NIVELES[i], siguiente: NIVELES[i + 1], xpFalta: NIVELES[i + 1].min - xp };
        }
    }
    return { actual: NIVELES[NIVELES.length - 1], siguiente: null, xpFalta: 0 };
}

function porcentajeNivel(xp) {
    for (var i = 0; i < NIVELES.length - 1; i++) {
        if (xp < NIVELES[i + 1].min) {
            var rango = NIVELES[i + 1].min - NIVELES[i].min;
            var progreso = xp - NIVELES[i].min;
            return Math.round((progreso / rango) * 100);
        }
    }
    return 100;
}

// ================================================
// FUNCIONES DE INSIGNIAS
// ================================================
function verificarInsignias(user) {
    var nuevas = [];
    var actuales = user.badges || [];
    INSIGNIAS.forEach(function(ins) {
        if (actuales.indexOf(ins.id) === -1 && ins.condicion(user)) {
            actuales.push(ins.id);
            nuevas.push(ins);
        }
    });
    user.badges = actuales;
    return nuevas;
}

function getInsigniaById(id) {
    return INSIGNIAS.find(function(i) { return i.id === id; }) || null;
}

// ================================================
// CALCULAR XP DE UN QUIZ
// ================================================
function calcularXPQuiz(score, numPreguntas, tiempoSegundos) {
    var base = Math.round((score / 100) * numPreguntas * 12);
    var bonus = 0;
    var detalle = [];

    detalle.push({ label: 'Respuestas correctas', xp: base });

    if (score >= 80) {
        bonus += 50;
        detalle.push({ label: '¡Bonus por 80%+!', xp: 50 });
    }
    if (score === 100) {
        bonus += 100;
        detalle.push({ label: '¡Bonus puntuación perfecta!', xp: 100 });
    }
    if (tiempoSegundos && tiempoSegundos < 300 && score >= 80) {
        bonus += 30;
        detalle.push({ label: 'Bonus velocidad (<5 min)', xp: 30 });
    }

    return { total: base + bonus, base: base, bonus: bonus, detalle: detalle };
}

// ================================================
// NOTA CHILENA (escala 1.0 - 7.0)
// ================================================
function calcularNota(score) {
    // Escala chilena estandar: nota minima de aprobacion = 4.0 con 60%
    if (score < 10) return 1.0;
    var nota = 1.0 + (6.0 * score / 100);
    return Math.round(nota * 10) / 10;
}

// ================================================
// PROGRESO POR MODULO
// ================================================
function getProgresoModulo(user, modId) {
    var quizzes = (user.completedQuizzes || []).filter(function(q) { return q.modulo === modId; });
    if (quizzes.length === 0) return { evaluaciones: 0, promedioScore: 0, promedioNota: 0, mejor: 0 };
    var total = quizzes.reduce(function(s, q) { return s + q.score; }, 0);
    var notas = quizzes.reduce(function(s, q) { return s + (q.nota || 1.0); }, 0);
    var mejor = quizzes.reduce(function(m, q) { return Math.max(m, q.score); }, 0);
    return {
        evaluaciones: quizzes.length,
        promedioScore: Math.round(total / quizzes.length),
        promedioNota: Math.round((notas / quizzes.length) * 10) / 10,
        mejor: mejor
    };
}

// ================================================
// ACTUALIZAR USUARIO EN LOCALSTORAGE
// ================================================
function updateUser(updatedUser) {
    // Actualizar en lista de usuarios
    var users = JSON.parse(localStorage.getItem('electrolearn_users') || '[]');
    var idx = users.findIndex(function(u) { return u.email === updatedUser.email; });
    if (idx >= 0) {
        users[idx] = updatedUser;
        localStorage.setItem('electrolearn_users', JSON.stringify(users));
    }
    // Actualizar sesion actual
    if (localStorage.getItem('electrolearn_current')) {
        var current = JSON.parse(localStorage.getItem('electrolearn_current'));
        if (current.email === updatedUser.email) {
            localStorage.setItem('electrolearn_current', JSON.stringify(updatedUser));
        }
    }
}

// ================================================
// GUARDAR RESULTADO DE QUIZ
// ================================================
function guardarResultadoQuiz(user, resultado) {
    if (!user.completedQuizzes) user.completedQuizzes = [];
    user.completedQuizzes.push(resultado);

    // Actualizar XP
    var xpGanado = calcularXPQuiz(resultado.score, resultado.total, resultado.tiempoSegundos);
    user.xp = (user.xp || 0) + xpGanado.total;

    // Actualizar nivel
    var nivelNuevo = calcularNivel(user.xp);
    user.level = nivelNuevo.nombre;

    // Verificar insignias
    var nuevasInsignias = verificarInsignias(user);

    // Guardar
    updateUser(user);

    return { xpGanado: xpGanado, nuevasInsignias: nuevasInsignias, nivelNuevo: nivelNuevo };
}

// ================================================
// OBTENER TODOS LOS USUARIOS (para ranking)
// ================================================
function getTodosUsuarios() {
    return JSON.parse(localStorage.getItem('electrolearn_users') || '[]')
        .filter(function(u) { return u.role !== 'profesor'; })
        .sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
}

function getTodosConProfesor() {
    return JSON.parse(localStorage.getItem('electrolearn_users') || '[]')
        .sort(function(a, b) { return (b.xp || 0) - (a.xp || 0); });
}

// ================================================
// GENERADOR DE PREGUNTAS CURRICULARES
// ================================================
function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

var DISTRACTORES_GENERICOS = [
    'Verificar el estado de los equipos de oficina y realizar un inventario administrativo.',
    'Disenar estrategias de marketing para productos electronicos de consumo masivo.',
    'Realizar calculos de resistencia de materiales en estructuras de hormigon armado.',
    'Aplicar tecnicas de cultivo hidropónico en sistemas agrícolas intensivos.',
    'Gestionar contratos de arrendamiento y elaborar informes de tasacion inmobiliaria.',
    'Elaborar planes de comunicacion para campanas publicitarias en redes sociales.',
    'Aplicar tecnicas de soldadura TIG en estructuras metalicas de gran formato.',
    'Disenar planos arquitectonicos para edificios de uso habitacional.',
    'Gestionar inventarios de repuestos automotrices en talleres mecanicos.',
    'Redactar documentos legales y contratos de prestacion de servicios.'
];

function getDistractor(usados, todos) {
    var disponibles = todos.filter(function(d) { return usados.indexOf(d) === -1; });
    if (disponibles.length === 0) disponibles = DISTRACTORES_GENERICOS;
    var idx = Math.floor(Math.random() * disponibles.length);
    return disponibles[idx];
}

function generarBancoPreguntas(mod, ae, aeNum, oaId) {
    var banco = [];
    var ceKeys = Object.keys(ae.ces);

    // Textos de todos los AEs del modulo para distractores
    var todosAETextos = Object.values(mod.aes)
        .filter(function(a) { return a.texto !== ae.texto; })
        .map(function(a) { return a.texto.substring(0, 120); });

    // Textos de todos los CEs de este AE
    var todosCETextos = ceKeys.map(function(k) { return ae.ces[k].texto; });

    // --- TIPO 1: Identificar CE correcto (1 preg por CE, max 5) ---
    ceKeys.slice(0, 5).forEach(function(ceKey) {
        var ceTexto = ae.ces[ceKey].texto;
        var otros = todosCETextos.filter(function(t) { return t !== ceTexto; });
        var distractores = [];
        // Tomar hasta 2 CEs de este AE como distractores
        distractores = distractores.concat(otros.slice(0, 2));
        // Completar con distractores genericos
        while (distractores.length < 3) {
            distractores.push(DISTRACTORES_GENERICOS[distractores.length]);
        }
        banco.push({
            tipo: 'mc', puntos: 10,
            pregunta: 'El criterio de evaluacion <strong>' + ceKey + '</strong> del AE ' + aeNum +
                      ' (Modulo ' + mod.num + ' &ndash; ' + mod.nombre + ') establece que el estudiante debe:',
            opciones: shuffle([ceTexto].concat(distractores.slice(0, 3))),
            correcta: ceTexto,
            explicacion: '&#128218; El <strong>' + ceKey + '</strong> del AE ' + aeNum + ' establece: <em>&ldquo;' + ceTexto + '&rdquo;</em>'
        });
    });

    // --- TIPO 2: Identificar el AE correcto ---
    banco.push({
        tipo: 'mc', puntos: 10,
        pregunta: '¿Cual de las siguientes opciones describe correctamente el <strong>Aprendizaje Esperado ' + aeNum + '</strong> del ' + oaId + ' en el modulo ' + mod.nombre + '?',
        opciones: shuffle([
            ae.texto.substring(0, 110) + (ae.texto.length > 110 ? '...' : ''),
            todosAETextos.length > 0 ? todosAETextos[0].substring(0, 110) + '...' : DISTRACTORES_GENERICOS[0],
            todosAETextos.length > 1 ? todosAETextos[1].substring(0, 110) + '...' : DISTRACTORES_GENERICOS[1],
            DISTRACTORES_GENERICOS[2]
        ]),
        correcta: ae.texto.substring(0, 110) + (ae.texto.length > 110 ? '...' : ''),
        explicacion: 'El AE ' + aeNum + ' del ' + oaId + ' establece: <em>&ldquo;' + ae.texto + '&rdquo;</em>'
    });

    // --- TIPO 3: Verdadero/Falso sobre CEs ---
    ceKeys.slice(0, 3).forEach(function(ceKey, i) {
        var ceTexto = ae.ces[ceKey].texto;
        if (i % 2 === 0) {
            // Verdadera
            banco.push({
                tipo: 'vf', puntos: 10,
                pregunta: 'El criterio <strong>' + ceKey + '</strong> del AE ' + aeNum + ' establece que el estudiante debe:',
                afirmacion: '&ldquo;' + ceTexto.substring(0, 150) + (ceTexto.length > 150 ? '...' : '') + '&rdquo;',
                correcta: true,
                explicacion: '&#9989; Verdadero. Esta es la descripcion exacta del ' + ceKey + ' segun el curriculum oficial Mineduc.'
            });
        } else {
            // Falsa (el CE es obligatorio, no opcional)
            banco.push({
                tipo: 'vf', puntos: 10,
                pregunta: 'Respecto al AE ' + aeNum + ' del modulo ' + mod.nombre + ':',
                afirmacion: '&ldquo;El criterio ' + ceKey + ' es opcional y el estudiante puede omitirlo si demuestra dominio en los otros criterios.&rdquo;',
                correcta: false,
                explicacion: '&#10060; Falso. El ' + ceKey + ' es un criterio de evaluacion <strong>obligatorio</strong> establecido en el curriculum Mineduc. Todos los criterios deben ser demostrados.'
            });
        }
    });

    // --- TIPO 4: OAG asociado ---
    var ceConOAG = ceKeys.find(function(k) { return ae.ces[k].oag && ae.ces[k].oag.length > 0; });
    if (ceConOAG && typeof OAG_DEFINICIONES !== 'undefined') {
        var oagCorrectos = ae.ces[ceConOAG].oag;
        var oagId = oagCorrectos[0];
        if (OAG_DEFINICIONES[oagId]) {
            banco.push({
                tipo: 'mc', puntos: 10,
                pregunta: 'El criterio <strong>' + ceConOAG + '</strong> del AE ' + aeNum + ' esta asociado a un Objetivo de Aprendizaje Generico (OAG). ¿Cual de los siguientes OAG corresponde?',
                opciones: shuffle([
                    'OAG ' + oagId + ': ' + OAG_DEFINICIONES[oagId].substring(0, 80),
                    'OAG A: Comunicacion oral y escrita en contextos tecnicos y profesionales del area',
                    'OAG H: Matematica aplicada a la resolucion de problemas de la especialidad',
                    'OAG K: Prevencion de riesgos y seguridad laboral en el area de desempeno'
                ]),
                correcta: 'OAG ' + oagId + ': ' + OAG_DEFINICIONES[oagId].substring(0, 80),
                explicacion: 'El <strong>OAG ' + oagId + '</strong> corresponde a: <em>' + OAG_DEFINICIONES[oagId] + '</em>'
            });
        }
    }

    // --- TIPO 5: Contexto del modulo ---
    banco.push({
        tipo: 'mc', puntos: 10,
        pregunta: '¿A que nivel de ensenanza corresponde el modulo <strong>' + mod.nombre + '</strong> (' + mod.num + ') de la especialidad de Electronica?',
        opciones: shuffle([
            (mod.nivel === '3ro' ? '3ro Medio TP &ndash; Electronica' : '4to Medio TP &ndash; Electronica'),
            '1ro Medio &ndash; Formacion General Obligatoria',
            '2do Medio &ndash; Exploracion Vocacional',
            'Nivel Tecnico Superior (CFT o IP)'
        ]),
        correcta: (mod.nivel === '3ro' ? '3ro Medio TP &ndash; Electronica' : '4to Medio TP &ndash; Electronica'),
        explicacion: 'El modulo <strong>' + mod.num + ' &ndash; ' + mod.nombre + '</strong> corresponde a <strong>' +
            (mod.nivel === '3ro' ? '3ro Medio' : '4to Medio') + '</strong> de la Formacion Diferenciada TP de Electronica, con ' + mod.horas + ' horas totales.'
    });

    // --- TIPO 6: Seguridad (siempre relevante) ---
    banco.push({
        tipo: 'mc', puntos: 10,
        pregunta: 'Al realizar actividades practicas en el taller de electronica correspondientes al modulo <strong>' + mod.nombre + '</strong>, el EPP (Elementos de Proteccion Personal) minimo obligatorio incluye:',
        opciones: [
            'Lentes de seguridad, guantes dielectricos y delantal de laboratorio.',
            'Solo guantes de latex descartables y ropa casual.',
            'Casco de obra, botas de punta de acero y chaleco reflectante.',
            'Protector auditivo y mascarilla N95 unicamente.'
        ],
        correcta: 'Lentes de seguridad, guantes dielectricos y delantal de laboratorio.',
        explicacion: '&#9888; Para trabajo en taller electronico es obligatorio: <strong>lentes de seguridad</strong> (proteccion ocular), <strong>guantes dielectricos</strong> (proteccion contra descarga electrica) y <strong>delantal de laboratorio</strong>. El incumplimiento de estas normas puede resultar en accidentes graves.'
    });

    // --- TIPO 7: Aplicacion practica ---
    if (ceKeys.length > 0) {
        var ceRef = ae.ces[ceKeys[0]].texto.substring(0, 80);
        banco.push({
            tipo: 'mc', puntos: 10,
            pregunta: 'Para demostrar el logro del criterio <strong>' + ceKeys[0] + '</strong> (&ldquo;' + ceRef + '...&rdquo;), la evidencia mas adecuada seria:',
            opciones: shuffle([
                'Una actividad practica en el taller donde el estudiante ejecuta el procedimiento y registra sus mediciones.',
                'Un resumen escrito sobre la historia de la electronica en Chile.',
                'Una presentacion oral sobre las empresas del sector sin actividad practica.',
                'Un collage con recortes de revistas tecnicas sobre el tema.'
            ]),
            correcta: 'Una actividad practica en el taller donde el estudiante ejecuta el procedimiento y registra sus mediciones.',
            explicacion: 'Los criterios de evaluacion del curriculum EMTP se demuestran principalmente con <strong>evidencia practica observable</strong>: ejecucion de procedimientos, mediciones registradas y resultados verificables.'
        });
    }

    return shuffle(banco);
}
