// =============================================================================
//  PLAN COMÚN — Orientación
//  Archivo: js/curricula/plan-comun/orientacion.js
//
//  Fuente: Bases Curriculares Mineduc — DS 439/2012 (1°B-6°B) +
//          DS 369/2015 (7°B-2°M). Orientación NO existe como asignatura propia
//          en 3°M-4°M; ahí su rol lo cumple Consejo de Curso y los objetivos
//          transversales del Plan Diferenciado.
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['orientacion'] = {
  nombre: 'Orientación',
  sigla:  'ORI',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  unidades: {
    '1B': ['Grupos de pertenencia y afecto','Emociones y resolución de conflictos'],
    '2B': ['Grupos de pertenencia y afecto','Emociones y resolución de conflictos'],
    '3B': ['Autoconocimiento y afectividad','Emociones y resolución de conflictos'],
    '4B': ['Autoconocimiento y convivencia','Emociones, afectividad y pubertad'],
    '5B': ['Autoestima y valoración personal','Emociones y resolución de conflictos','Afectividad y autocuidado','Prevención y vida saludable'],
    '6B': ['Autoestima y valoración personal','Emociones y resolución de conflictos','Afectividad y autocuidado','Prevención y vida saludable'],
    '7B': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje'],
    '8B': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje'],
    '1M': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje'],
    '2M': ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje']
  },
  oas: {
    '1B': [
      { codigo: 'OA1', eje: 'Crecimiento Personal',        descripcion: 'Observar, describir y valorar sus características personales, sus habilidades e intereses.' },
      { codigo: 'OA2', eje: 'Crecimiento Personal',        descripcion: 'Identificar emociones experimentadas por ellos y por los demás y distinguir diversas formas de expresarlas.' },
      { codigo: 'OA3', eje: 'Crecimiento Personal',        descripcion: 'Observar, describir y valorar las expresiones de afecto y cariño que dan y reciben en los ámbitos familiar, escolar y social.' },
      { codigo: 'OA4', eje: 'Crecimiento Personal',        descripcion: 'Identificar y practicar, en forma guiada, conductas protectoras y de autocuidado (higiene, descanso, alimentación, resguardo del cuerpo e intimidad).' },
      { codigo: 'OA5', eje: 'Relaciones Interpersonales',  descripcion: 'Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (buen trato, escucha, compartir con pares).' },
      { codigo: 'OA6', eje: 'Relaciones Interpersonales',  descripcion: 'Identificar conflictos que surgen entre pares y practicar formas de solucionarlos (escuchar al otro, ponerse en su lugar, buscar un acuerdo).' },
      { codigo: 'OA7', eje: 'Participación y Pertenencia', descripcion: 'Reconocer, describir y valorar sus grupos de pertenencia (familia, curso, pares) y participar activamente en ellos.' },
      { codigo: 'OA8', eje: 'Trabajo Escolar',             descripcion: 'Practicar hábitos y actitudes que favorezcan el proceso de aprendizaje (útiles escolares, orden, identificar nuevos aprendizajes).' }
    ],
    '2B': [
      { codigo: 'OA1', eje: 'Crecimiento Personal',        descripcion: 'Observar, describir y valorar sus características personales, sus habilidades e intereses.' },
      { codigo: 'OA2', eje: 'Crecimiento Personal',        descripcion: 'Identificar emociones experimentadas por ellos y por los demás y distinguir diversas formas de expresarlas.' },
      { codigo: 'OA3', eje: 'Crecimiento Personal',        descripcion: 'Observar, describir y valorar las expresiones de afecto y cariño que dan y reciben en los ámbitos familiar, escolar y social.' },
      { codigo: 'OA4', eje: 'Crecimiento Personal',        descripcion: 'Identificar y practicar, en forma guiada, conductas protectoras y de autocuidado (higiene, descanso, alimentación, resguardo del cuerpo e intimidad).' },
      { codigo: 'OA5', eje: 'Relaciones Interpersonales',  descripcion: 'Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (buen trato, escucha, compartir con pares).' },
      { codigo: 'OA6', eje: 'Relaciones Interpersonales',  descripcion: 'Identificar conflictos que surgen entre pares y practicar formas de solucionarlos (escuchar al otro, ponerse en su lugar, buscar un acuerdo).' },
      { codigo: 'OA7', eje: 'Participación y Pertenencia', descripcion: 'Reconocer, describir y valorar sus grupos de pertenencia (familia, curso, pares) y participar activamente en ellos.' },
      { codigo: 'OA8', eje: 'Trabajo Escolar',             descripcion: 'Practicar hábitos y actitudes que favorezcan el proceso de aprendizaje (útiles escolares, orden, identificar nuevos aprendizajes).' }
    ],
    '3B': [
      { codigo: 'OA1', eje: 'Crecimiento Personal',        descripcion: 'Observar, describir y valorar sus características, habilidades y fortalezas, y proponerse acciones concretas para superarse.' },
      { codigo: 'OA2', eje: 'Crecimiento Personal',        descripcion: 'Identificar y aceptar sus propias emociones y las de los demás, y practicar estrategias personales de manejo emocional.' },
      { codigo: 'OA3', eje: 'Crecimiento Personal',        descripcion: 'Reconocer y valorar la sexualidad como expresión de amor, vínculo e intimidad entre dos personas y como gestora de su propia vida.' },
      { codigo: 'OA4', eje: 'Crecimiento Personal',        descripcion: 'Identificar y practicar en forma autónoma conductas protectoras y de autocuidado (higiene, descanso, alimentación, resguardo del cuerpo, prevención de drogas).' },
      { codigo: 'OA5', eje: 'Relaciones Interpersonales',  descripcion: 'Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, no discriminación, respetar ambiente de aprendizaje).' },
      { codigo: 'OA6', eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos entre pares en forma guiada y aplicar estrategias diversas de resolución de problemas.' },
      { codigo: 'OA7', eje: 'Participación y Pertenencia', descripcion: 'Participar en forma guiada en la comunidad escolar y en la organización del curso (proponer iniciativas, asumir responsabilidades, respetar derechos).' },
      { codigo: 'OA8', eje: 'Trabajo Escolar',             descripcion: 'Manifestar hábitos y actitudes de esfuerzo e interés que favorezcan el aprendizaje (puntualidad, organización, honestidad, curiosidad intelectual).' }
    ],
    '4B': [
      { codigo: 'OA1', eje: 'Crecimiento Personal',        descripcion: 'Observar, describir y valorar sus características, habilidades y fortalezas, y proponerse acciones concretas para superarse.' },
      { codigo: 'OA2', eje: 'Crecimiento Personal',        descripcion: 'Identificar y aceptar sus propias emociones y practicar estrategias de manejo emocional (esperar, escuchar al otro, considerar su impacto en los demás).' },
      { codigo: 'OA3', eje: 'Crecimiento Personal',        descripcion: 'Reconocer y valorar la sexualidad como expresión de amor, vínculo e intimidad entre dos personas y como gestora de su propia vida.' },
      { codigo: 'OA4', eje: 'Crecimiento Personal',        descripcion: 'Reconocer y valorar el proceso de desarrollo afectivo y sexual, describiendo los cambios físicos y afectivos que ocurren en la pubertad.' },
      { codigo: 'OA5', eje: 'Crecimiento Personal',        descripcion: 'Identificar y practicar en forma autónoma conductas protectoras y de autocuidado (higiene, descanso, intimidad, prevención de drogas y abuso).' },
      { codigo: 'OA6', eje: 'Relaciones Interpersonales',  descripcion: 'Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, no violencia, no discriminación).' },
      { codigo: 'OA7', eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos entre pares en forma guiada y aplicar estrategias diversas de resolución de problemas.' },
      { codigo: 'OA8', eje: 'Participación y Pertenencia', descripcion: 'Participar en forma guiada en la comunidad escolar y en la organización del curso mediante diálogo y toma de decisiones democráticas.' },
      { codigo: 'OA9', eje: 'Trabajo Escolar',             descripcion: 'Manifestar hábitos y actitudes de esfuerzo e interés que favorezcan el aprendizaje (puntualidad, organización, honestidad, curiosidad intelectual).' }
    ],
    '5B': [
      { codigo: 'OA1', eje: 'Crecimiento Personal',        descripcion: 'Demostrar una valoración positiva de sí mismo reconociendo habilidades, fortalezas y aspectos que requiera superar.' },
      { codigo: 'OA2', eje: 'Crecimiento Personal',        descripcion: 'Distinguir y describir emociones y reconocer y practicar formas apropiadas de expresarlas, considerando su impacto en sí mismo y en otros.' },
      { codigo: 'OA3', eje: 'Crecimiento Personal',        descripcion: 'Reconocer y valorar el proceso de desarrollo afectivo y sexual y los cambios físicos, afectivos y sociales de la pubertad.' },
      { codigo: 'OA4', eje: 'Crecimiento Personal',        descripcion: 'Practicar en forma autónoma conductas protectoras y de autocuidado (intimidad, redes sociales, fuentes de información confiables, comunicación familiar).' },
      { codigo: 'OA5', eje: 'Crecimiento Personal',        descripcion: 'Reconocer causas y consecuencias del consumo de drogas (tabaco, alcohol, marihuana), identificar factores preventivos y proponer estrategias de enfrentamiento.' },
      { codigo: 'OA6', eje: 'Relaciones Interpersonales',  descripcion: 'Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, rechazo a la violencia y la discriminación).' },
      { codigo: 'OA7', eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos de convivencia en forma autónoma, seleccionando y aplicando diversas estrategias de resolución de problemas.' },
      { codigo: 'OA8', eje: 'Participación y Pertenencia', descripcion: 'Participar activa y colaborativamente en la comunidad escolar y en la organización del curso mediante diálogo y toma de decisiones democráticas.' },
      { codigo: 'OA9', eje: 'Trabajo Escolar',             descripcion: 'Practicar en forma autónoma y perseverante hábitos y actitudes que favorezcan el aprendizaje (metas, organización del tiempo, trabajo colaborativo, honestidad).' }
    ],
    '6B': [
      { codigo: 'OA1', eje: 'Crecimiento Personal',        descripcion: 'Demostrar una valoración positiva de sí mismo reconociendo habilidades, fortalezas y aspectos que requiera superar.' },
      { codigo: 'OA2', eje: 'Crecimiento Personal',        descripcion: 'Distinguir y describir emociones y reconocer y practicar formas apropiadas de expresarlas, considerando su impacto en sí mismo y en otros.' },
      { codigo: 'OA3', eje: 'Crecimiento Personal',        descripcion: 'Reconocer y valorar el proceso de desarrollo afectivo y sexual y los cambios físicos, afectivos y sociales de la pubertad.' },
      { codigo: 'OA4', eje: 'Crecimiento Personal',        descripcion: 'Practicar en forma autónoma conductas protectoras y de autocuidado (intimidad, redes sociales, fuentes de información confiables, comunicación familiar).' },
      { codigo: 'OA5', eje: 'Crecimiento Personal',        descripcion: 'Reconocer causas y consecuencias del consumo de drogas (tabaco, alcohol, marihuana), identificar factores preventivos y proponer estrategias de enfrentamiento.' },
      { codigo: 'OA6', eje: 'Relaciones Interpersonales',  descripcion: 'Manifestar actitudes de solidaridad y respeto que favorezcan la convivencia (empatía, buen trato, rechazo a la violencia y la discriminación).' },
      { codigo: 'OA7', eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos de convivencia en forma autónoma, seleccionando y aplicando diversas estrategias de resolución de problemas.' },
      { codigo: 'OA8', eje: 'Participación y Pertenencia', descripcion: 'Participar activa y colaborativamente en la comunidad escolar y en la organización del curso mediante diálogo y toma de decisiones democráticas.' },
      { codigo: 'OA9', eje: 'Trabajo Escolar',             descripcion: 'Practicar en forma autónoma y perseverante hábitos y actitudes que favorezcan el aprendizaje (metas, organización del tiempo, trabajo colaborativo, honestidad).' }
    ],
    '7B': [
      { codigo: 'OA1',  eje: 'Crecimiento Personal',        descripcion: 'Construir representaciones positivas de sí mismos incorporando características, motivaciones, intereses y capacidades, considerando los cambios de la adolescencia.' },
      { codigo: 'OA2',  eje: 'Crecimiento Personal',        descripcion: 'Analizar la importancia de integrar las dimensiones de la sexualidad, el cuidado del cuerpo y la intimidad, discriminando formas de relacionarse con respeto.' },
      { codigo: 'OA3',  eje: 'Bienestar y Autocuidado',     descripcion: 'Identificar situaciones que expongan a adolescentes a riesgos (sustancias nocivas, conductas sexuales riesgosas, violencia) y desarrollar estrategias de protección.' },
      { codigo: 'OA4',  eje: 'Bienestar y Autocuidado',     descripcion: 'Integrar acciones cotidianas que favorezcan el bienestar y la vida saludable en el plano personal y en la comunidad escolar.' },
      { codigo: 'OA5',  eje: 'Relaciones Interpersonales',  descripcion: 'Analizar sus relaciones atendiendo a principios de igualdad, dignidad, inclusión y no discriminación, y reconocer su impacto en el bienestar de las personas.' },
      { codigo: 'OA6',  eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos y desacuerdos a través del diálogo, la escucha empática y la búsqueda de soluciones respetuosas y sin violencia.' },
      { codigo: 'OA7',  eje: 'Pertenencia y Participación', descripcion: 'Reconocer intereses y necesidades compartidas con su grupo de pertenencia y colaborar para alcanzar metas comunes valorando el trabajo en equipo.' },
      { codigo: 'OA8',  eje: 'Pertenencia y Participación', descripcion: 'Elaborar acuerdos para fines compartidos utilizando espacios de participación democrática como Consejo de Curso, respetando la diversidad de opiniones.' },
      { codigo: 'OA9',  eje: 'Gestión del Aprendizaje',     descripcion: 'Reconocer sus intereses, motivaciones y capacidades, comprendiendo la relevancia del aprendizaje escolar para elaborar sus proyectos personales.' },
      { codigo: 'OA10', eje: 'Gestión del Aprendizaje',     descripcion: 'Gestionar de manera autónoma su proceso de aprendizaje mediante el establecimiento de metas progresivas, monitoreo de logros y redefinición de acciones.' }
    ],
    '8B': [
      { codigo: 'OA1',  eje: 'Crecimiento Personal',        descripcion: 'Construir representaciones positivas de sí mismos incorporando características, motivaciones, intereses y capacidades, considerando los cambios de la adolescencia.' },
      { codigo: 'OA2',  eje: 'Crecimiento Personal',        descripcion: 'Analizar la importancia de integrar las dimensiones de la sexualidad, el cuidado del cuerpo y la intimidad, discriminando formas de relacionarse con respeto.' },
      { codigo: 'OA3',  eje: 'Bienestar y Autocuidado',     descripcion: 'Identificar situaciones que expongan a adolescentes a riesgos (sustancias nocivas, conductas sexuales riesgosas, violencia) y desarrollar estrategias de protección.' },
      { codigo: 'OA4',  eje: 'Bienestar y Autocuidado',     descripcion: 'Integrar acciones cotidianas que favorezcan el bienestar y la vida saludable en el plano personal y en la comunidad escolar.' },
      { codigo: 'OA5',  eje: 'Relaciones Interpersonales',  descripcion: 'Analizar sus relaciones atendiendo a principios de igualdad, dignidad, inclusión y no discriminación, y reconocer su impacto en el bienestar de las personas.' },
      { codigo: 'OA6',  eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos y desacuerdos a través del diálogo, la escucha empática y la búsqueda de soluciones respetuosas y sin violencia.' },
      { codigo: 'OA7',  eje: 'Pertenencia y Participación', descripcion: 'Reconocer intereses y necesidades compartidas con su grupo de pertenencia y colaborar para alcanzar metas comunes valorando el trabajo en equipo.' },
      { codigo: 'OA8',  eje: 'Pertenencia y Participación', descripcion: 'Elaborar acuerdos para fines compartidos utilizando espacios de participación democrática como Consejo de Curso, respetando la diversidad de opiniones.' },
      { codigo: 'OA9',  eje: 'Gestión del Aprendizaje',     descripcion: 'Reconocer sus intereses, motivaciones y capacidades, comprendiendo la relevancia del aprendizaje escolar para elaborar sus proyectos personales.' },
      { codigo: 'OA10', eje: 'Gestión del Aprendizaje',     descripcion: 'Gestionar de manera autónoma su proceso de aprendizaje mediante el establecimiento de metas progresivas, monitoreo de logros y redefinición de acciones.' }
    ],
    '1M': [
      { codigo: 'OA1',  eje: 'Crecimiento Personal',        descripcion: 'Construir una identidad personal y social fundamentada en la confianza en sí mismos, en la valoración de sus características personales y en la integración de los cambios físicos, afectivos y sociales propios de la adolescencia.' },
      { codigo: 'OA2',  eje: 'Crecimiento Personal',        descripcion: 'Integrar en su propia identidad las dimensiones afectiva, valórica, espiritual y de la sexualidad, valorando la dignidad de toda persona y la diversidad como expresión de la condición humana.' },
      { codigo: 'OA3',  eje: 'Bienestar y Autocuidado',     descripcion: 'Promover y desarrollar acciones de autocuidado y vida saludable, identificando y previniendo situaciones de riesgo asociadas a consumo de sustancias, conductas sexuales irresponsables, violencia y uso problemático de redes sociales.' },
      { codigo: 'OA4',  eje: 'Bienestar y Autocuidado',     descripcion: 'Analizar el rol que cumplen la familia, los pares y la comunidad como factores protectores del bienestar físico, emocional y social en la adolescencia.' },
      { codigo: 'OA5',  eje: 'Relaciones Interpersonales',  descripcion: 'Establecer relaciones interpersonales basadas en el respeto, la inclusión, la dignidad humana, la no discriminación y el cuidado del otro, en distintos contextos (familia, escuela, pares, redes sociales).' },
      { codigo: 'OA6',  eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos personales y grupales aplicando estrategias de diálogo, empatía, negociación y mediación, considerando el bien común y la búsqueda de acuerdos respetuosos.' },
      { codigo: 'OA7',  eje: 'Pertenencia y Participación', descripcion: 'Participar activamente en la comunidad escolar y social, valorando la diversidad, el bien común y los mecanismos de participación democrática (Consejo de Curso, Centro de Alumnos, organizaciones juveniles).' },
      { codigo: 'OA8',  eje: 'Pertenencia y Participación', descripcion: 'Promover acciones colectivas para el bienestar de la comunidad y la defensa de los derechos propios y de los demás, comprendiendo el sentido de la responsabilidad social y ciudadana.' },
      { codigo: 'OA9',  eje: 'Gestión del Aprendizaje',     descripcion: 'Gestionar de manera autónoma su proceso de aprendizaje mediante la definición de metas, la planificación de tareas, el monitoreo de logros y la evaluación crítica de resultados.' },
      { codigo: 'OA10', eje: 'Gestión del Aprendizaje',     descripcion: 'Reflexionar sobre sus intereses, motivaciones, capacidades y proyecto personal, reconociendo la relevancia del aprendizaje escolar para la construcción de su proyecto de vida.' }
    ],
    '2M': [
      { codigo: 'OA1',  eje: 'Crecimiento Personal',        descripcion: 'Consolidar una identidad personal y social autónoma, integrando los cambios afectivos, sexuales y sociales de la adolescencia, y valorando la dignidad y diversidad humana.' },
      { codigo: 'OA2',  eje: 'Crecimiento Personal',        descripcion: 'Integrar críticamente las dimensiones afectiva, valórica, espiritual y de la sexualidad en sus decisiones cotidianas, ejerciendo responsabilidad sobre sí mismos y los demás.' },
      { codigo: 'OA3',  eje: 'Bienestar y Autocuidado',     descripcion: 'Anticipar y prevenir situaciones de riesgo para la salud física y mental (consumo de sustancias, violencia, conductas sexuales irresponsables, sobreexposición digital), diseñando estrategias personales y colectivas de protección.' },
      { codigo: 'OA4',  eje: 'Bienestar y Autocuidado',     descripcion: 'Promover una vida activa y saludable que integre alimentación, descanso, actividad física, salud mental y redes de apoyo, evaluando el rol de la familia y la comunidad como factores protectores.' },
      { codigo: 'OA5',  eje: 'Relaciones Interpersonales',  descripcion: 'Cultivar relaciones interpersonales basadas en la igualdad de género, la inclusión, el respeto a la diversidad y la no violencia, en todos los ámbitos de su vida.' },
      { codigo: 'OA6',  eje: 'Relaciones Interpersonales',  descripcion: 'Resolver conflictos de manera autónoma mediante diálogo, escucha activa, empatía y mediación, considerando el contexto, el bien común y el respeto a los derechos de las personas.' },
      { codigo: 'OA7',  eje: 'Pertenencia y Participación', descripcion: 'Ejercer una ciudadanía activa, informada y responsable, participando en su comunidad escolar y social, valorando el aporte de la deliberación democrática a la construcción del bien común.' },
      { codigo: 'OA8',  eje: 'Pertenencia y Participación', descripcion: 'Liderar y colaborar en acciones colectivas que promuevan los derechos humanos, la inclusión, el cuidado del medio ambiente y la defensa de los derechos propios y de los demás.' },
      { codigo: 'OA9',  eje: 'Gestión del Aprendizaje',     descripcion: 'Gestionar autónomamente el propio aprendizaje considerando contextos cambiantes, definiendo metas a corto y mediano plazo, evaluando avances y reformulando estrategias cuando sea necesario.' },
      { codigo: 'OA10', eje: 'Gestión del Aprendizaje',     descripcion: 'Elaborar un proyecto de vida que integre intereses, motivaciones, capacidades y opciones académicas y vocacionales para el Plan Diferenciado de 3°M y 4°M y la transición a la educación superior o el mundo del trabajo.' }
    ]
  },
  actitudes:   [],
  habilidades: ['Crecimiento personal','Bienestar y autocuidado','Relaciones interpersonales','Pertenencia y participación democrática','Gestión y proyección del aprendizaje']
};
