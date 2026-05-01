// =============================================================================
//  PLAN COMÚN — Educación Ciudadana
//  Archivo: js/curricula/plan-comun/ed-ciudadana.js
//
//  Fuente: Bases Curriculares Mineduc DS 193/2019 — Formación General 3°-4° Medio.
//
//  Estructura estándar:
//    window.CURRICULA_PLAN_COMUN['ed-ciudadana'] = {
//      nombre, sigla, niveles,
//      unidades: { '3M': [...], '4M': [...] },
//      oas: { '3M': [...], '4M': [...] },
//      actitudes: [...],
//      habilidades: [...]
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['ed-ciudadana'] = {
  nombre: 'Educación Ciudadana',
  sigla:  'EC',
  niveles: ['3M','4M'],
  unidades: {
    '3M': ['Estado, democracia y ciudadanía','Estado, mercado y bien común','Derechos humanos y participación','Espacio geográfico y justicia social'],
    '4M': ['Participación ciudadana y solución de problemas','Modelos de desarrollo y sustentabilidad','Derechos laborales y movimientos sociales','Medios, tecnologías y vida democrática']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs oficiales — DS 193/2019 FG 3°-4° Medio.
  //  Programas de Estudio Mineduc, febrero 2021.
  //  Las Bases prescriben OAs de dos naturalezas:
  //   · Habilidades (a-g): comunes a 3°M y 4°M y a Historia FG.
  //   · Conocimiento y comprensión (1-8): específicos de cada nivel.
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    // ── 3°M FG — DS 193/2019 ─ 15 OAs (Habilidades a-g, Conocimiento y comprensión 1-8)
    '3M': [
      {codigo:'OAa', eje:'Habilidades', descripcion:'Investigar sobre la realidad considerando: formulación de preguntas o problemas de investigación a partir de la observación de fenómenos; levantamiento de información a partir de métodos y técnicas propias de historia, geografía, economía y otras ciencias sociales; análisis crítico de las evidencias y evaluación de su validez, considerando su uso ético para respaldar opiniones; definición del marco teórico, del estado de la cuestión y de los conceptos disciplinares del tema a investigar; análisis de las propias conclusiones en relación con los supuestos iniciales.'},
      {codigo:'OAb', eje:'Habilidades', descripcion:'Hacer conexiones entre fenómenos, acontecimientos y/o procesos de la realidad considerando conceptos como multidimensionalidad, multicausalidad y multiescalaridad, temporalidad, y variables y patrones.'},
      {codigo:'OAc', eje:'Habilidades', descripcion:'Elaborar interpretaciones y argumentos, basados en fuentes variadas y pertinentes, haciendo uso ético de la información.'},
      {codigo:'OAd', eje:'Habilidades', descripcion:'Analizar interpretaciones y perspectivas de diversas fuentes, considerando propósito, intencionalidad, enfoque y contexto del autor, y las preguntas que intenta responder.'},
      {codigo:'OAe', eje:'Habilidades', descripcion:'Evaluar la validez de las propias interpretaciones sobre acontecimientos, fenómenos y procesos estudiados, a través del diálogo y el uso de fuentes.'},
      {codigo:'OAf', eje:'Habilidades', descripcion:'Elaborar juicios éticos de manera rigurosa y basados en conocimiento disciplinar sobre hitos, fenómenos, procesos, ideas, acciones de personas, entre otros.'},
      {codigo:'OAg', eje:'Habilidades', descripcion:'Comunicar explicaciones, conclusiones u opiniones fundamentadas haciendo uso de lenguaje, las normas y convenciones de la disciplina.'},
      {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Identificar los fundamentos, atributos y dimensiones de la democracia y la ciudadanía, considerando las libertades fundamentales de las personas como un principio de estas y reconociendo sus implicancias en los deberes del Estado y en los derechos y responsabilidades ciudadanas.'},
      {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Investigar, a partir de casos de interés público, los mecanismos de acceso a la justicia y las principales características del sistema judicial, para fortalecer estrategias de resguardo de las libertades fundamentales, los propios derechos y los de la comunidad.'},
      {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Reflexionar personal y grupalmente sobre riesgos para la democracia en Chile y el mundo, tales como el fenómeno de la desafección política, la desigualdad, la corrupción, el narcotráfico, la violencia, entre otros.'},
      {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Evaluar las relaciones entre el Estado y el mercado, considerando temas como sueldos justos, productividad, carga tributaria, comercio justo, probidad, desarrollo sustentable, riqueza y pobreza.'},
      {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Promover el reconocimiento, la defensa y exigibilidad de los derechos humanos en la vida cotidiana, considerando los principios de universalidad, indivisibilidad, inalienabilidad, igualdad y no discriminación que los sustentan.'},
      {codigo:'OA6', eje:'Conocimiento y comprensión', descripcion:'Reflexionar personal y grupalmente sobre diversas formas de participación y su aporte al fortalecimiento del bien común, considerando experiencias personales, fenómenos sociales contemporáneos y las perspectivas del republicanismo, el liberalismo, y el comunitarismo.'},
      {codigo:'OA7', eje:'Conocimiento y comprensión', descripcion:'Distinguir relaciones políticas, económicas y socioculturales que configuran el territorio en distintas escalas, proponiendo alternativas para avanzar en justicia social y ambiental.'},
      {codigo:'OA8', eje:'Conocimiento y comprensión', descripcion:'Participar en distintas instancias escolares de ejercicio democrático, reconociendo la necesidad de organizar socialmente la vida en comunidad, a fin de fortalecer una sana convivencia que resguarde las libertades fundamentales y el bien común.'}
    ],
    // ── 4°M FG — DS 193/2019 ─ 15 OAs (Habilidades a-g, Conocimiento y comprensión 1-8)
    '4M': [
      {codigo:'OAa', eje:'Habilidades', descripcion:'Investigar sobre la realidad considerando: formulación de preguntas o problemas de investigación a partir de la observación de fenómenos; levantamiento de información a partir de métodos y técnicas propias de historia, geografía, economía y otras ciencias sociales; análisis crítico de las evidencias y evaluación de su validez, considerando su uso ético para respaldar opiniones; definición del marco teórico, del estado de la cuestión y de los conceptos disciplinares del tema a investigar; análisis de las propias conclusiones en relación con los supuestos iniciales.'},
      {codigo:'OAb', eje:'Habilidades', descripcion:'Hacer conexiones entre fenómenos, acontecimientos y/o procesos de la realidad considerando conceptos como multidimensionalidad, multicausalidad y multiescalaridad, temporalidad, y variables y patrones.'},
      {codigo:'OAc', eje:'Habilidades', descripcion:'Elaborar interpretaciones y argumentos, basados en fuentes variadas y pertinentes, haciendo uso ético de la información.'},
      {codigo:'OAd', eje:'Habilidades', descripcion:'Analizar interpretaciones y perspectivas de diversas fuentes, considerando propósito, intencionalidad, enfoque y contexto del autor, y las preguntas que intenta responder.'},
      {codigo:'OAe', eje:'Habilidades', descripcion:'Evaluar la validez de las propias interpretaciones sobre acontecimientos, fenómenos y procesos estudiados, a través del diálogo y el uso de fuentes.'},
      {codigo:'OAf', eje:'Habilidades', descripcion:'Elaborar juicios éticos de manera rigurosa y basados en conocimiento disciplinar sobre hitos, fenómenos, procesos, ideas, acciones de personas, entre otros.'},
      {codigo:'OAg', eje:'Habilidades', descripcion:'Comunicar explicaciones, conclusiones u opiniones fundamentadas haciendo uso de lenguaje, las normas y convenciones de la disciplina.'},
      {codigo:'OA1', eje:'Conocimiento y comprensión', descripcion:'Evaluar las características y funcionamiento de la institucionalidad democrática, las formas de representación y su impacto en la distribución del poder en la sociedad, a la luz del bien común, la cohesión y justicia social.'},
      {codigo:'OA2', eje:'Conocimiento y comprensión', descripcion:'Participar de forma corresponsable y ética en la búsqueda de estrategias y soluciones a desafíos, problemas y conflictos en diversas escalas, que impliquen armonizar desarrollo, democracia, equidad y sustentabilidad.'},
      {codigo:'OA3', eje:'Conocimiento y comprensión', descripcion:'Analizar el impacto de diversos modelos de desarrollo y las políticas económicas en la vida cotidiana y en el cambio climático, en función de la sustentabilidad y del aseguramiento de una vida digna y justa para todos y todas con condiciones para el desarrollo personal y colectivo.'},
      {codigo:'OA4', eje:'Conocimiento y comprensión', descripcion:'Comprender la importancia de los derechos laborales en Chile, considerando las principales tendencias globales y nacionales, la evolución de los mecanismos institucionales que buscan resguardarlos y los aportes de los movimientos y organizaciones sociales a su fortalecimiento.'},
      {codigo:'OA5', eje:'Conocimiento y comprensión', descripcion:'Relacionar de manera fundamentada los conceptos libertad, igualdad y solidaridad, con desafíos y problemas de la democracia como la desigualdad y superación de la pobreza, la equidad de género, la inclusión, la diversidad étnica, cultural y sexual, entre otras.'},
      {codigo:'OA6', eje:'Conocimiento y comprensión', descripcion:'Evaluar oportunidades y riesgos de los medios de comunicación masiva y del uso de las nuevas tecnologías de la información en el marco de una sociedad democrática, reflexionando personal y grupalmente sobre sus implicancias en la participación ciudadana y en el resguardo de la vida privada.'},
      {codigo:'OA7', eje:'Conocimiento y comprensión', descripcion:'Proponer formas de organización del territorio y del espacio público que promuevan la acción colectiva, la interculturalidad, la inclusión de la diversidad y el mejoramiento de la vida comunitaria.'},
      {codigo:'OA8', eje:'Conocimiento y comprensión', descripcion:'Tomar decisiones fundadas en principios éticos, valores y virtudes públicas en las prácticas ciudadanas, resguardando la dignidad del otro y la vida en democracia.'}
    ]
  },
  actitudes:   [],  // hereda de _comun (Habilidades para el siglo XXI)
  habilidades: ['Investigación','Pensamiento crítico','Comunicación']
};
