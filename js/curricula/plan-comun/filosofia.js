// =============================================================================
//  PLAN COMÚN — Filosofía
//  Archivo: js/curricula/plan-comun/filosofia.js
//
//  Fuente: Bases Curriculares Mineduc DS 193/2019 — Formación General 3°-4° Medio.
//          Programas de Estudio, febrero 2021.
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['filosofia'] = {
//      nombre, sigla, niveles,
//      unidades: { '3M': [...], '4M': [...] },
//      oas: { '3M': [...], '4M': [...] },
//      actitudes, habilidades,
//      electivos: { 'filosofia-politica': {...}, 'seminario-de-filosofia': {...} }
//    }
//
//  Las Bases prescriben OAs de dos naturalezas:
//   · Habilidades (a-d): comunes a 3°M y 4°M y a los electivos HC.
//   · Conocimiento y comprensión (1-N): específicos de cada nivel/electivo.
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['filosofia'] = {
  nombre: 'Filosofía',
  sigla:  'FIL',
  niveles: ['3M','4M'],
  unidades: {
    '3M': ['La filosofía nos permite cuestionar rigurosamente la realidad y a nosotros mismos','La realidad, el cambio y el sentido de la vida','El conocimiento, la ciencia y la verdad','Diálogo y conocimiento colectivo'],
    '4M': ['La filosofía permite cuestionar el conocimiento y las acciones del ser humano','La ética permite evaluar y mejorar los supuestos de nuestros actos','Comprensión de problemas éticos y políticos contemporáneos','El impacto de la filosofía en la vida cotidiana']
  },
  oas: {
    // ── 3°M FG — DS 193/2019 ─ 10 OAs (Habilidades a-d, Conocimiento y comprensión 1-6)
    '3M': [
      {codigo:'OAa', eje:'Habilidades', descripcion:'Formular preguntas significativas para su vida a partir del análisis de conceptos y teorías filosóficas, poniendo en duda aquello que aparece como "cierto" o "dado" y proyectando diversas respuestas posibles.'},
      {codigo:'OAb', eje:'Habilidades', descripcion:'Analizar y fundamentar problemas presentes en textos filosóficos, considerando sus supuestos, conceptos, métodos de razonamiento e implicancias en la vida cotidiana.'},
      {codigo:'OAc', eje:'Habilidades', descripcion:'Participar en diálogos sobre grandes problemas de la filosofía pertinentes para sus contextos, sostenidos a partir de argumentos de los distintos participantes, utilizando métodos de razonamiento filosófico y valorando la controversia y la diversidad como factores fundamentales para el desarrollo del pensamiento.'},
      {codigo:'OAd', eje:'Habilidades', descripcion:'Elaborar visiones personales respecto de problemas filosóficos a partir de las perspectivas de diversos filósofos, siendo capaces tanto de reconstruir sus fundamentos como de cuestionarlos y plantear nuevos puntos de vista.'},
      {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Describir las características del quehacer filosófico, considerando el problema de su origen y sentido, e identificando algunas de sus grandes preguntas y temas.'},
      {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Analizar y fundamentar diversas perspectivas filosóficas, considerando posibles relaciones con la cotidianidad, así como normas, valores, creencias y visiones de mundo de los pensadores que las desarrollaron.'},
      {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Formular preguntas filosóficas referidas al ser y la naturaleza de la realidad que sean significativas para su vida, considerando conceptos y teorías ontológicas fundamentales.'},
      {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Formular preguntas filosóficas referidas al conocimiento, la ciencia y la verdad que sean significativas para su vida, considerando conceptos y teorías epistemológicas fundamentales.'},
      {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Dialogar sobre grandes problemas de la ontología y/o la epistemología, confrontando diversas perspectivas filosóficas y fundamentando visiones personales.'},
      {codigo:'OA6', eje:'Conocimiento y comprensión', descripcion:'Aplicar principios y herramientas elementales de argumentación en el diálogo, la escritura y diferentes contextos, considerando la consistencia y la rigurosidad lógica, la identificación de razonamientos válidos e inválidos y métodos de razonamiento filosófico.'}
    ],
    // ── 4°M FG — DS 193/2019 ─ 9 OAs (Habilidades a-d, Conocimiento y comprensión 1-5)
    '4M': [
      {codigo:'OAa', eje:'Habilidades', descripcion:'Formular preguntas significativas para su vida a partir del análisis de conceptos y teorías filosóficas, poniendo en duda aquello que aparece como "cierto" o "dado" y proyectando diversas respuestas posibles.'},
      {codigo:'OAb', eje:'Habilidades', descripcion:'Analizar y fundamentar problemas presentes en textos filosóficos, considerando sus supuestos, conceptos, métodos de razonamiento e implicancias en la vida cotidiana.'},
      {codigo:'OAc', eje:'Habilidades', descripcion:'Participar en diálogos sobre grandes problemas de la filosofía pertinentes para sus contextos, sostenidos a partir de argumentos de los distintos participantes, utilizando métodos de razonamiento filosófico y valorando la controversia y la diversidad como factores fundamentales para el desarrollo del pensamiento.'},
      {codigo:'OAd', eje:'Habilidades', descripcion:'Elaborar visiones personales respecto de problemas filosóficos a partir de las perspectivas de diversos filósofos, siendo capaces tanto de reconstruir sus fundamentos como de cuestionarlos y plantear nuevos puntos de vista.'},
      {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Explicar los alcances, límites y fines del quehacer filosófico, considerando sus aportes al conocimiento y la acción, así como su relación con otras disciplinas y formas del saber.'},
      {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Formular preguntas filosóficas referidas a la praxis que sean significativas para su vida, considerando teorías éticas fundamentales y conceptos como la justicia, la libertad y la igualdad.'},
      {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Dialogar sobre problemas contemporáneos de la ética y la política, confrontando diversas perspectivas filosóficas y fundamentando visiones personales.'},
      {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Evaluar diferentes tipos de argumentos presentes en textos filosóficos y fundamentar su validez o carácter falaz, considerando referentes teóricos, empíricos y del sentido común para apoyar o refutar una tesis.'},
      {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Evaluar el impacto de ideas filosóficas relacionadas con la ontología, la epistemología y la ética en cuestiones actuales de la cultura, el mundo laboral, la tecnología, la política, las artes, entre otras posibilidades, utilizando diferentes formas de expresión y representación de ideas.'}
    ]
  },
  actitudes:   [],  // hereda de _comun (Habilidades para el siglo XXI)
  habilidades: ['Problematizar y argumentar','Dialogar filosóficamente','Interpretar textos filosóficos','Aplicar categorías filosóficas a la realidad'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVOS DIFERENCIADOS HC (3°M y 4°M) — DS 193/2019
  //  Mismos OAs para 3°M y 4°M (las Bases no diferencian por nivel).
  // ────────────────────────────────────────────────────────────────────
  electivos: {
    'filosofia-politica': {
      nombre:  'Filosofía Política',
      sigla:   'FPO',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Problemas políticos contemporáneos','Poder y bien común','Justicia, libertad e igualdad','Diálogo filosófico-político'],
        '4M': ['Problemas políticos contemporáneos','Poder y bien común','Justicia, libertad e igualdad','Diálogo filosófico-político']
      },
      oas: {
        '3M': [
          {codigo:'OAa', eje:'Habilidades', descripcion:'Formular preguntas significativas para su vida a partir del análisis de conceptos y teorías filosóficas, poniendo en duda aquello que aparece como "cierto" o "dado" y proyectando diversas respuestas posibles.'},
          {codigo:'OAb', eje:'Habilidades', descripcion:'Analizar y fundamentar problemas presentes en textos filosóficos, considerando sus supuestos, conceptos, métodos de razonamiento e implicancias en la vida cotidiana.'},
          {codigo:'OAc', eje:'Habilidades', descripcion:'Participar en diálogos sobre grandes problemas de la filosofía pertinentes para sus contextos, sostenidos a partir de argumentos de los distintos participantes, utilizando métodos de razonamiento filosófico y valorando la controversia y la diversidad como factores fundamentales para el desarrollo del pensamiento.'},
          {codigo:'OAd', eje:'Habilidades', descripcion:'Elaborar visiones personales respecto de problemas filosóficos a partir de las perspectivas de diversos filósofos, siendo capaces tanto de reconstruir sus fundamentos como de cuestionarlos y plantear nuevos puntos de vista.'},
          {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Formular preguntas e hipótesis acerca de un problema político a partir de la lectura de textos filosóficos fundamentales, considerando diversas perspectivas y métodos propios de la disciplina.'},
          {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Evaluar críticamente, desde el horizonte del bien común, las relaciones de poder y su expresión tanto en la institucionalidad política como entre los individuos de una sociedad en contextos de la vida cotidiana.'},
          {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Examinar críticamente textos de la tradición filosófica que expresen diversas perspectivas sobre la justicia, la libertad, la responsabilidad, la igualdad y la felicidad, considerando cómo estos conceptos se relacionan con diversas visiones del ser humano, la ética y la política.'},
          {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Participar activamente en diálogos filosóficos acerca de las formas de organización del poder en la sociedad, sus fundamentos y finalidades, tomando en cuenta diversas posiciones acerca del Estado, los actores sociales y las instituciones.'},
          {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Investigar problemas sociales relacionados con sus contextos y la desigualdad de género, considerando diversas perspectivas filosóficas, cuidando la rigurosidad argumentativa, proponiendo soluciones para su mejora y utilizando diferentes formas de expresión.'},
          {codigo:'OA6', eje:'Conocimiento y comprensión', descripcion:'Distinguir argumentos válidos o falaces, a fin de comparar razonamientos filosóficos relativos al poder y la política desde diversas corrientes de pensamiento filosófico y posicionarse de modo consistente frente a ellos.'}
        ],
        '4M': [
          {codigo:'OAa', eje:'Habilidades', descripcion:'Formular preguntas significativas para su vida a partir del análisis de conceptos y teorías filosóficas, poniendo en duda aquello que aparece como "cierto" o "dado" y proyectando diversas respuestas posibles.'},
          {codigo:'OAb', eje:'Habilidades', descripcion:'Analizar y fundamentar problemas presentes en textos filosóficos, considerando sus supuestos, conceptos, métodos de razonamiento e implicancias en la vida cotidiana.'},
          {codigo:'OAc', eje:'Habilidades', descripcion:'Participar en diálogos sobre grandes problemas de la filosofía pertinentes para sus contextos, sostenidos a partir de argumentos de los distintos participantes, utilizando métodos de razonamiento filosófico y valorando la controversia y la diversidad como factores fundamentales para el desarrollo del pensamiento.'},
          {codigo:'OAd', eje:'Habilidades', descripcion:'Elaborar visiones personales respecto de problemas filosóficos a partir de las perspectivas de diversos filósofos, siendo capaces tanto de reconstruir sus fundamentos como de cuestionarlos y plantear nuevos puntos de vista.'},
          {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Formular preguntas e hipótesis acerca de un problema político a partir de la lectura de textos filosóficos fundamentales, considerando diversas perspectivas y métodos propios de la disciplina.'},
          {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Evaluar críticamente, desde el horizonte del bien común, las relaciones de poder y su expresión tanto en la institucionalidad política como entre los individuos de una sociedad en contextos de la vida cotidiana.'},
          {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Examinar críticamente textos de la tradición filosófica que expresen diversas perspectivas sobre la justicia, la libertad, la responsabilidad, la igualdad y la felicidad, considerando cómo estos conceptos se relacionan con diversas visiones del ser humano, la ética y la política.'},
          {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Participar activamente en diálogos filosóficos acerca de las formas de organización del poder en la sociedad, sus fundamentos y finalidades, tomando en cuenta diversas posiciones acerca del Estado, los actores sociales y las instituciones.'},
          {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Investigar problemas sociales relacionados con sus contextos y la desigualdad de género, considerando diversas perspectivas filosóficas, cuidando la rigurosidad argumentativa, proponiendo soluciones para su mejora y utilizando diferentes formas de expresión.'},
          {codigo:'OA6', eje:'Conocimiento y comprensión', descripcion:'Distinguir argumentos válidos o falaces, a fin de comparar razonamientos filosóficos relativos al poder y la política desde diversas corrientes de pensamiento filosófico y posicionarse de modo consistente frente a ellos.'}
        ]
      }
    },
    'seminario-de-filosofia': {
      nombre:  'Seminario de Filosofía',
      sigla:   'SFI',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Filosofar es preguntar y evaluar respuestas','Fuentes primarias y secundarias','Devenir histórico de un problema filosófico','Construcción de visiones personales fundamentadas'],
        '4M': ['Filosofar es preguntar y evaluar respuestas','Fuentes primarias y secundarias','Devenir histórico de un problema filosófico','Construcción de visiones personales fundamentadas']
      },
      oas: {
        '3M': [
          {codigo:'OAa', eje:'Habilidades', descripcion:'Formular preguntas significativas para su vida a partir del análisis de conceptos y teorías filosóficas, poniendo en duda aquello que aparece como "cierto" o "dado" y proyectando diversas respuestas posibles.'},
          {codigo:'OAb', eje:'Habilidades', descripcion:'Analizar y fundamentar problemas presentes en textos filosóficos, considerando sus supuestos, conceptos, métodos de razonamiento e implicancias en la vida cotidiana.'},
          {codigo:'OAc', eje:'Habilidades', descripcion:'Participar en diálogos sobre grandes problemas de la filosofía pertinentes para sus contextos, sostenidos a partir de argumentos de los distintos participantes, utilizando métodos de razonamiento filosófico y valorando la controversia y la diversidad como factores fundamentales para el desarrollo del pensamiento.'},
          {codigo:'OAd', eje:'Habilidades', descripcion:'Elaborar visiones personales respecto de problemas filosóficos a partir de las perspectivas de diversos filósofos, siendo capaces tanto de reconstruir sus fundamentos como de cuestionarlos y plantear nuevos puntos de vista.'},
          {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Explicar textos filosóficos que aborden un problema presente en la historia de la filosofía, considerando sus antecedentes, principales planteamientos, supuestos y contexto sociocultural.'},
          {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Evaluar y contrastar métodos de razonamiento para abordar un concepto o problema filosófico.'},
          {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Analizar el devenir de un problema filosófico presente en la historia de la filosofía, considerando sus continuidades, cambios e impactos en la sociedad, y utilizando diversas formas de expresión.'},
          {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Participar activamente en diálogos filosóficos sobre preguntas y/o conceptos filosóficos, y su relación tanto con su vida como con fenómenos sociales y culturales contemporáneos.'},
          {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Formular una tesis filosófica con respecto a un problema relevante para su contexto, a partir de una investigación sobre diversas perspectivas filosóficas presentes en la historia de la filosofía.'}
        ],
        '4M': [
          {codigo:'OAa', eje:'Habilidades', descripcion:'Formular preguntas significativas para su vida a partir del análisis de conceptos y teorías filosóficas, poniendo en duda aquello que aparece como "cierto" o "dado" y proyectando diversas respuestas posibles.'},
          {codigo:'OAb', eje:'Habilidades', descripcion:'Analizar y fundamentar problemas presentes en textos filosóficos, considerando sus supuestos, conceptos, métodos de razonamiento e implicancias en la vida cotidiana.'},
          {codigo:'OAc', eje:'Habilidades', descripcion:'Participar en diálogos sobre grandes problemas de la filosofía pertinentes para sus contextos, sostenidos a partir de argumentos de los distintos participantes, utilizando métodos de razonamiento filosófico y valorando la controversia y la diversidad como factores fundamentales para el desarrollo del pensamiento.'},
          {codigo:'OAd', eje:'Habilidades', descripcion:'Elaborar visiones personales respecto de problemas filosóficos a partir de las perspectivas de diversos filósofos, siendo capaces tanto de reconstruir sus fundamentos como de cuestionarlos y plantear nuevos puntos de vista.'},
          {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Explicar textos filosóficos que aborden un problema presente en la historia de la filosofía, considerando sus antecedentes, principales planteamientos, supuestos y contexto sociocultural.'},
          {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Evaluar y contrastar métodos de razonamiento para abordar un concepto o problema filosófico.'},
          {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Analizar el devenir de un problema filosófico presente en la historia de la filosofía, considerando sus continuidades, cambios e impactos en la sociedad, y utilizando diversas formas de expresión.'},
          {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Participar activamente en diálogos filosóficos sobre preguntas y/o conceptos filosóficos, y su relación tanto con su vida como con fenómenos sociales y culturales contemporáneos.'},
          {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Formular una tesis filosófica con respecto a un problema relevante para su contexto, a partir de una investigación sobre diversas perspectivas filosóficas presentes en la historia de la filosofía.'}
        ]
      }
    }
  }
};
