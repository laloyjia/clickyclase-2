/**
 * catalogo-asignaturas-maestro.js — Click&Clase
 * ═══════════════════════════════════════════════════════════════
 * CATÁLOGO ÚNICO Y CANÓNICO de asignaturas del sistema.
 *
 * Reemplaza los múltiples catálogos dispersos que existían:
 *   • panel-superadmin-colegio.html:ASIGNATURAS
 *   • js/curricula-chile.js:CURRICULA_PLAN_COMUN
 *   • js/modal-usuario-unificado.js:ASIGNATURAS_PC
 *   • Referencias sueltas en cada panel
 *
 * ESTRUCTURA de cada asignatura:
 *   {
 *     id:      'fisica'          // Identificador canónico (snake_case)
 *     nombre:  'Física'          // Nombre bonito para UI
 *     sigla:   'FIS'             // Sigla MINEDUC oficial
 *     grupo:   'parvularia'|'general'|'media'|'electivo'|'tp'
 *     niveles: ['1m','2m']       // Niveles válidos
 *     tipo:    'plan_comun'|'electivo'|'tp'
 *     base:    'fisica'          // Solo para electivos: asignatura FG relacionada
 *     curriculumFile: 'fisica.js'// Nombre del archivo js/curricula/plan-comun/
 *     tieneOAsCargados: true     // Si el archivo curriculum tiene OAs cargados
 *     ordenSort: 1               // Orden de aparición en listas
 *   }
 *
 * API pública: usar `CCAsig` (js/cc-asig.js), no acceder directo a este objeto.
 */
(function () {
  'use strict';

  var C = [
    // ═══════════════════════════════════════════════════════════════
    // EDUCACIÓN PARVULARIA
    // ═══════════════════════════════════════════════════════════════
    { id:'parvularia', nombre:'Educación Parvularia', sigla:'PARV', grupo:'parvularia', tipo:'plan_comun', niveles:['nt1','nt2'], curriculumFile:'parvularia.js', tieneOAsCargados:true, ordenSort:1 },

    // ═══════════════════════════════════════════════════════════════
    // PLAN COMÚN — Formación General (Básica + Media)
    // ═══════════════════════════════════════════════════════════════
    { id:'lenguaje',     nombre:'Lenguaje y Comunicación',       sigla:'LEN', grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m'], curriculumFile:'lenguaje.js', tieneOAsCargados:true, ordenSort:10 },
    { id:'ling_liter',   nombre:'Lengua y Literatura',           sigla:'LEN', grupo:'media',   tipo:'plan_comun', niveles:['3m','4m'], base:'lenguaje', curriculumFile:'lenguaje.js', tieneOAsCargados:true, ordenSort:11 },
    { id:'matematica',   nombre:'Matemática',                    sigla:'MAT', grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m','3m','4m'], curriculumFile:'matematica.js', tieneOAsCargados:true, ordenSort:20 },
    { id:'ciencias_nat', nombre:'Ciencias Naturales',            sigla:'CN',  grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m'], curriculumFile:'ciencias.js', tieneOAsCargados:true, ordenSort:30 },
    { id:'biologia',     nombre:'Biología',                      sigla:'BIO', grupo:'media',   tipo:'plan_comun', niveles:['1m','2m'], base:'ciencias_nat', curriculumFile:'biologia.js', tieneOAsCargados:true, ordenSort:31 },
    { id:'fisica',       nombre:'Física',                        sigla:'FIS', grupo:'media',   tipo:'plan_comun', niveles:['1m','2m'], base:'ciencias_nat', curriculumFile:'fisica.js', tieneOAsCargados:true, ordenSort:32 },
    { id:'quimica',      nombre:'Química',                       sigla:'QUI', grupo:'media',   tipo:'plan_comun', niveles:['1m','2m'], base:'ciencias_nat', curriculumFile:'quimica.js', tieneOAsCargados:true, ordenSort:33 },
    { id:'historia',     nombre:'Historia, Geografía y CCSS',    sigla:'HIS', grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m','3m','4m'], curriculumFile:'historia.js', tieneOAsCargados:true, ordenSort:40 },
    { id:'ed_ciudadana', nombre:'Educación Ciudadana',           sigla:'EC',  grupo:'media',   tipo:'plan_comun', niveles:['3m','4m'], curriculumFile:'ed-ciudadana.js', tieneOAsCargados:true, ordenSort:41 },
    { id:'cs_ciudadania',nombre:'Ciencias para la Ciudadanía',   sigla:'CC',  grupo:'media',   tipo:'plan_comun', niveles:['3m','4m'], curriculumFile:'ciencias-ciudadania.js', tieneOAsCargados:true, ordenSort:42 },
    { id:'ingles',       nombre:'Inglés',                        sigla:'ING', grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m','3m','4m'], curriculumFile:'ingles.js', tieneOAsCargados:true, ordenSort:50 },
    { id:'ed_fisica',    nombre:'Educación Física y Salud',      sigla:'EF',  grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m','3m','4m'], curriculumFile:'ed-fisica.js', tieneOAsCargados:true, ordenSort:60 },
    { id:'artes_vis',    nombre:'Artes Visuales',                sigla:'AV',  grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m'], curriculumFile:'artes.js', tieneOAsCargados:true, ordenSort:70 },
    { id:'musica',       nombre:'Música',                        sigla:'MU',  grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m'], curriculumFile:'musica.js', tieneOAsCargados:true, ordenSort:71 },
    { id:'tecnologia',   nombre:'Tecnología',                    sigla:'TEC', grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m'], curriculumFile:'tecnologia.js', tieneOAsCargados:true, ordenSort:80 },
    { id:'orientacion',  nombre:'Orientación',                   sigla:'OR',  grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m'], curriculumFile:'orientacion.js', tieneOAsCargados:true, ordenSort:90 },
    { id:'consejo_curso',nombre:'Consejo de Curso',              sigla:'CC',  grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m','3m','4m'], curriculumFile:'consejo-curso.js', tieneOAsCargados:true, ordenSort:91 },
    { id:'religion',     nombre:'Religión',                      sigla:'REL', grupo:'general', tipo:'plan_comun', niveles:['1b','2b','3b','4b','5b','6b','7b','8b','1m','2m','3m','4m'], tieneOAsCargados:false, ordenSort:95 },
    { id:'filosofia',    nombre:'Filosofía',                     sigla:'FIL', grupo:'media',   tipo:'plan_comun', niveles:['3m','4m'], curriculumFile:'filosofia.js', tieneOAsCargados:true, ordenSort:100 },
    { id:'artes_esc',    nombre:'Artes Escénicas (Teatro y Danza)', sigla:'AE', grupo:'media', tipo:'plan_comun', niveles:['3m','4m'], base:'artes_vis', tieneOAsCargados:false, ordenSort:75 },

    // ═══════════════════════════════════════════════════════════════
    // ELECTIVOS HC (3° y 4° Medio Científico-Humanista)
    // curriculoKey = 'padre:hijo' donde:
    //   padre = key en CURRICULA_PLAN_COMUN (ej: 'fisica')
    //   hijo  = key en padre.electivos (ej: 'fisica-hc')
    // ═══════════════════════════════════════════════════════════════
    // Lengua y Literatura — 3 electivos, 2 cargados
    { id:'el_lee',     nombre:'Lectura y Escritura Especializadas',                  sigla:'LEE', grupo:'electivo', tipo:'electivo', base:'ling_liter', niveles:['3m','4m'], curriculoKey:'lenguaje:lectura-y-escritura-especializadas', tieneOAsCargados:true, ordenSort:200 },
    { id:'el_tlit',    nombre:'Taller de Literatura',                                sigla:'TLI', grupo:'electivo', tipo:'electivo', base:'ling_liter', niveles:['3m','4m'], curriculoKey:'lenguaje:taller-de-literatura', tieneOAsCargados:true, ordenSort:201 },
    { id:'el_pad',     nombre:'Participación y Argumentación en Democracia',         sigla:'PAD', grupo:'electivo', tipo:'electivo', base:'ling_liter', niveles:['3m','4m'], curriculoKey:'lenguaje:participacion-y-argumentacion-en-democracia', tieneOAsCargados:true, ordenSort:202 },
    // Matemática — 4 electivos, 2 cargados
    { id:'el_geo3d',   nombre:'Geometría 3D',                                        sigla:'G3D', grupo:'electivo', tipo:'electivo', base:'matematica', niveles:['3m','4m'], curriculoKey:'matematica:geometria3d', tieneOAsCargados:true, ordenSort:210 },
    { id:'el_limi',    nombre:'Límites, Derivadas e Integrales',                     sigla:'LDI', grupo:'electivo', tipo:'electivo', base:'matematica', niveles:['3m','4m'], curriculoKey:'matematica:limites-derivadas-integrales', tieneOAsCargados:true, ordenSort:211 },
    { id:'el_prob',    nombre:'Probabilidades y Estadística Descriptiva/Inferencial',sigla:'PED', grupo:'electivo', tipo:'electivo', base:'matematica', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:212 },
    { id:'el_pcp',     nombre:'Pensamiento Computacional y Programación',            sigla:'PCP', grupo:'electivo', tipo:'electivo', base:'matematica', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:213 },
    // Historia y Ciencias Sociales — 4 electivos, 0 cargados (usa base historia)
    { id:'el_cla',     nombre:'Chile y la Región Latinoamericana',                   sigla:'CLA', grupo:'electivo', tipo:'electivo', base:'historia', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:220 },
    { id:'el_mug',     nombre:'Comprensión Histórica del Mundo Global',              sigla:'MUG', grupo:'electivo', tipo:'electivo', base:'historia', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:221 },
    { id:'el_gts',     nombre:'Geografía, Territorio y Desafíos Socioambientales',   sigla:'GTS', grupo:'electivo', tipo:'electivo', base:'historia', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:222 },
    { id:'el_ecs',     nombre:'Economía y Sociedad',                                 sigla:'ECS', grupo:'electivo', tipo:'electivo', base:'historia', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:223 },
    // Ciencias — 5 electivos, 4 cargados
    { id:'el_bec',     nombre:'Biología de los Ecosistemas',                         sigla:'BEC', grupo:'electivo', tipo:'electivo', base:'biologia', niveles:['3m','4m'], curriculoKey:'biologia:biologia-de-los-ecosistemas', tieneOAsCargados:true, ordenSort:230 },
    { id:'el_bcm',     nombre:'Biología Celular y Molecular',                        sigla:'BCM', grupo:'electivo', tipo:'electivo', base:'biologia', niveles:['3m','4m'], curriculoKey:'biologia:biologia-celular-y-molecular', tieneOAsCargados:true, ordenSort:231 },
    { id:'el_csa',     nombre:'Ciencias de la Salud',                                sigla:'CSA', grupo:'electivo', tipo:'electivo', base:'biologia', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:232 },
    { id:'el_fis_hc',  nombre:'Física (Plan Diferenciado HC)',                       sigla:'FHC', grupo:'electivo', tipo:'electivo', base:'fisica', niveles:['3m','4m'], curriculoKey:'fisica:fisica-hc', tieneOAsCargados:true, ordenSort:233 },
    { id:'el_qui_hc',  nombre:'Química (Plan Diferenciado HC)',                      sigla:'QHC', grupo:'electivo', tipo:'electivo', base:'quimica', niveles:['3m','4m'], curriculoKey:'quimica:quimica-hc', tieneOAsCargados:true, ordenSort:234 },
    // Artes — 2 electivos, 0 cargados
    { id:'el_avm',     nombre:'Artes Visuales, Audiovisuales y Multimediales',       sigla:'AVM', grupo:'electivo', tipo:'electivo', base:'artes_vis', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:240 },
    { id:'el_dar',     nombre:'Diseño y Arquitectura',                               sigla:'DAR', grupo:'electivo', tipo:'electivo', base:'artes_vis', niveles:['3m','4m'], tieneOAsCargados:false, ordenSort:241 },
    // Música — 2 electivos, 2 cargados
    { id:'el_ccm',     nombre:'Creación y Composición Musical',                      sigla:'CCM', grupo:'electivo', tipo:'electivo', base:'musica', niveles:['3m','4m'], curriculoKey:'musica:creacion-y-composicion-musical', tieneOAsCargados:true, ordenSort:242 },
    { id:'el_imu',     nombre:'Interpretación Musical',                              sigla:'IMU', grupo:'electivo', tipo:'electivo', base:'musica', niveles:['3m','4m'], curriculoKey:'musica:interpretacion-musical', tieneOAsCargados:true, ordenSort:243 },
    // Filosofía — 3 electivos, 3 cargados
    { id:'el_fpo',     nombre:'Filosofía Política',                                  sigla:'FPO', grupo:'electivo', tipo:'electivo', base:'filosofia', niveles:['3m','4m'], curriculoKey:'filosofia:filosofia-politica', tieneOAsCargados:true, ordenSort:250 },
    { id:'el_sfi',     nombre:'Seminario de Filosofía',                              sigla:'SFI', grupo:'electivo', tipo:'electivo', base:'filosofia', niveles:['3m','4m'], curriculoKey:'filosofia:seminario-de-filosofia', tieneOAsCargados:true, ordenSort:251 },
    { id:'el_est',     nombre:'Estética',                                            sigla:'EST', grupo:'electivo', tipo:'electivo', base:'filosofia', niveles:['3m','4m'], curriculoKey:'filosofia:estetica', tieneOAsCargados:true, ordenSort:252 },
    // Ed. Física — 2 electivos, 2 cargados
    { id:'el_efs1',    nombre:'Ed. Física y Salud — Programa 1',                    sigla:'EF1', grupo:'electivo', tipo:'electivo', base:'ed_fisica', niveles:['3m','4m'], curriculoKey:'ed_fisica:educacion-fisica-y-salud-1', tieneOAsCargados:true, ordenSort:260 },
    { id:'el_efs2',    nombre:'Ed. Física y Salud — Programa 2',                    sigla:'EF2', grupo:'electivo', tipo:'electivo', base:'ed_fisica', niveles:['3m','4m'], curriculoKey:'ed_fisica:educacion-fisica-y-salud-2', tieneOAsCargados:true, ordenSort:261 }
  ];

  // Alias legacy → id canónico (para migrar datos viejos)
  var ALIAS = {
    'ciencias_naturales': 'ciencias_nat',
    'lengua_literatura':  'ling_liter',
    'artes_visuales':     'artes_vis',
    'artes_escenicas':    'artes_esc',
    'ed_fisica_salud':    'ed_fisica',
    'educacion_fisica':   'ed_fisica',
    'historia_geografia': 'historia',
    'formacion_ciudadana':'ed_ciudadana',
    'lenguaje_comunicacion':'lenguaje'
  };

  window.CC_CATALOGO_ASIGNATURAS = C;
  window.CC_ASIG_ALIASES = ALIAS;
})();
