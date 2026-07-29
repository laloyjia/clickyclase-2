// =============================================================================
//  PLAN COMÚN — Consejo de Curso
//  Archivo: js/curricula/plan-comun/consejo-curso.js
//
//  Fuente: MINEDUC — Bases Curriculares transversales + Reglamento de
//          Convivencia Escolar (Ley 20.536). Consejo de Curso es una instancia
//          transversal presente en TODOS los niveles (1°B a 4°M) donde el
//          profesor jefe trabaja: convivencia, participación, autogestión,
//          proyecto de vida y clima escolar.
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['consejo-curso'] = {
  nombre: 'Consejo de Curso',
  sigla:  'CC',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M','3M','4M'],

  unidades: {
    '1B': ['Convivencia y buen trato','Participación en el curso','Autoconocimiento y emociones'],
    '2B': ['Convivencia y buen trato','Participación en el curso','Autoconocimiento y emociones'],
    '3B': ['Convivencia y resolución de conflictos','Participación democrática','Hábitos de estudio y autocuidado'],
    '4B': ['Convivencia y resolución de conflictos','Participación democrática','Hábitos de estudio y autocuidado'],
    '5B': ['Liderazgo y participación','Convivencia escolar','Autoconocimiento y proyecto de vida'],
    '6B': ['Liderazgo y participación','Convivencia escolar','Autoconocimiento y proyecto de vida'],
    '7B': ['Identidad y autoconocimiento','Convivencia y ciudadanía','Autogestión académica','Proyecto personal'],
    '8B': ['Identidad y autoconocimiento','Convivencia y ciudadanía','Autogestión académica','Proyecto personal'],
    '1M': ['Convivencia democrática','Autoconocimiento y afectividad','Autogestión académica','Vida saludable y prevención'],
    '2M': ['Convivencia democrática','Autoconocimiento y afectividad','Autogestión académica','Vida saludable y prevención'],
    '3M': ['Proyecto de vida y orientación vocacional','Convivencia y liderazgo','Autogestión académica y transición','Ciudadanía y participación'],
    '4M': ['Proyecto de vida y transición postsecundaria','Convivencia y clima final','Cierre de ciclo y evaluación','Ciudadanía y participación']
  },

  oas: (function() {
    // Los OAs de Consejo de Curso son transversales y se ajustan por ciclo
    // Se usan como marco pedagógico para las sesiones semanales del profesor jefe.

    var oasBasica1a4 = [
      { codigo: 'CC1', eje: 'Convivencia',       descripcion: 'Reconocer y respetar las normas básicas de convivencia del curso y del establecimiento.' },
      { codigo: 'CC2', eje: 'Convivencia',       descripcion: 'Practicar el buen trato con compañeros, docentes y personal del colegio.' },
      { codigo: 'CC3', eje: 'Participación',     descripcion: 'Participar activamente en la organización y actividades del curso.' },
      { codigo: 'CC4', eje: 'Autoconocimiento',  descripcion: 'Identificar sus emociones y aprender a expresarlas de manera adecuada.' },
      { codigo: 'CC5', eje: 'Hábitos',           descripcion: 'Desarrollar hábitos de responsabilidad, puntualidad y cuidado de sus materiales.' }
    ];

    var oasBasica5a8 = [
      { codigo: 'CC1', eje: 'Convivencia',       descripcion: 'Aplicar estrategias de resolución pacífica de conflictos entre pares.' },
      { codigo: 'CC2', eje: 'Convivencia',       descripcion: 'Valorar la diversidad y practicar la no discriminación en el curso.' },
      { codigo: 'CC3', eje: 'Participación',     descripcion: 'Ejercer roles de representación (delegado, encargado) y participar en la directiva del curso.' },
      { codigo: 'CC4', eje: 'Participación',     descripcion: 'Proponer y organizar iniciativas colectivas para mejorar el ambiente escolar.' },
      { codigo: 'CC5', eje: 'Autoconocimiento',  descripcion: 'Reflexionar sobre sus fortalezas, dificultades y proyecto personal.' },
      { codigo: 'CC6', eje: 'Hábitos',           descripcion: 'Analizar y mejorar sus hábitos de estudio, organización del tiempo y autocuidado.' },
      { codigo: 'CC7', eje: 'Ciudadanía',        descripcion: 'Comprender el rol de la participación democrática en la comunidad escolar.' }
    ];

    var oasMedia1a2 = [
      { codigo: 'CC1', eje: 'Convivencia',       descripcion: 'Analizar situaciones de convivencia del curso y proponer soluciones colectivas basadas en el diálogo y el respeto.' },
      { codigo: 'CC2', eje: 'Convivencia',       descripcion: 'Aplicar los protocolos de convivencia escolar y participar en procesos de mediación entre pares.' },
      { codigo: 'CC3', eje: 'Participación',     descripcion: 'Organizar la directiva del curso y liderar iniciativas colectivas que aporten al clima escolar.' },
      { codigo: 'CC4', eje: 'Autoconocimiento',  descripcion: 'Reflexionar sobre su identidad, valores, intereses vocacionales y proyecto de vida.' },
      { codigo: 'CC5', eje: 'Autogestión',       descripcion: 'Planificar sus tiempos de estudio, priorizar tareas y desarrollar hábitos de autoevaluación académica.' },
      { codigo: 'CC6', eje: 'Vida saludable',    descripcion: 'Analizar factores de riesgo (consumo, salud mental, RRSS) y promover prácticas de vida saludable.' },
      { codigo: 'CC7', eje: 'Ciudadanía',        descripcion: 'Ejercer una ciudadanía activa en la comunidad escolar mediante la participación democrática y la deliberación.' }
    ];

    var oasMedia3a4 = [
      { codigo: 'CC1', eje: 'Proyecto de vida',  descripcion: 'Elaborar y ajustar su proyecto de vida considerando intereses, aptitudes, contexto y opciones post-secundarias (universidad, IP, CFT, mundo laboral, servicio militar).' },
      { codigo: 'CC2', eje: 'Proyecto de vida',  descripcion: 'Explorar la oferta académica y laboral chilena: PAES, becas y créditos (Junaeb, gratuidad), FUAS, DEMRE, procesos de postulación.' },
      { codigo: 'CC3', eje: 'Convivencia',       descripcion: 'Consolidar prácticas de convivencia democrática y resolución de conflictos en la etapa final del ciclo escolar.' },
      { codigo: 'CC4', eje: 'Convivencia',       descripcion: 'Analizar críticamente su rol como líderes referentes del establecimiento para los cursos menores.' },
      { codigo: 'CC5', eje: 'Autogestión',       descripcion: 'Fortalecer estrategias de autogestión académica frente a evaluaciones finales y procesos de admisión.' },
      { codigo: 'CC6', eje: 'Autogestión',       descripcion: 'Desarrollar competencias socioemocionales para gestionar el estrés, la ansiedad y la incertidumbre del cierre de ciclo.' },
      { codigo: 'CC7', eje: 'Ciudadanía',        descripcion: 'Participar como agentes activos en procesos ciudadanos (elecciones, plebiscitos, procesos comunales) próximos a la mayoría de edad.' },
      { codigo: 'CC8', eje: 'Cierre de ciclo',   descripcion: 'Reflexionar sobre el proceso escolar completo: aprendizajes, vínculos, cierre simbólico y proyección al futuro.' }
    ];

    return {
      '1B': oasBasica1a4, '2B': oasBasica1a4, '3B': oasBasica1a4, '4B': oasBasica1a4,
      '5B': oasBasica5a8, '6B': oasBasica5a8, '7B': oasBasica5a8, '8B': oasBasica5a8,
      '1M': oasMedia1a2, '2M': oasMedia1a2,
      '3M': oasMedia3a4, '4M': oasMedia3a4
    };
  })()
};
