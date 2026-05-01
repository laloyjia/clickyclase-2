// =============================================================================
//  PLAN COMÚN — Tecnología
//  Archivo: js/curricula/plan-comun/tecnologia.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['tecnologia'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['tecnologia'] = {
  nombre: 'Tecnología',
  sigla:  'TEC',
  niveles: ['1B','2B','3B','4B','5B','6B','7B','8B','1M','2M'],
  unidades: {
    '1B': ['Objetos tecnológicos del hogar','Materiales básicos','Diseño simple'],
    '2B': ['Tecnología en mi vida','Construcción básica','Resolución de problemas'],
    '3B': ['Sistemas tecnológicos','Materiales y procesos','Diseño y construcción'],
    '4B': ['Tecnología y sociedad','Energía en tecnología','Proyecto tecnológico'],
    '5B': ['Diseño técnico','Circuitos básicos','Innovación tecnológica'],
    '6B': ['TIC básicas','Automatización simple','Impacto tecnológico'],
    '7B': ['Programación básica','Robótica educativa','Tecnología y empleo'],
    '8B': ['Pensamiento computacional','Proyectos tecnológicos','Tecnología sustentable'],
    '1M': ['Pensamiento computacional','Programación básica (Python/Scratch)','Tecnología y sociedad'],
    '2M': ['Desarrollo de proyectos digitales','Ciberseguridad básica','Emprendimiento tecnológico']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases (DS 439/2012 + DS 369/2015).
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    // ── 1°B — DS 2960/2012 ─ 6 OAs (Diseñar 1-4, TIC 5-6)
    '1B': [
      {codigo:'OA1', eje:'Diseñar, hacer y probar', descripcion:'Crear diseños de objetos tecnológicos, representando sus ideas a través de dibujos a mano alzada o modelos concretos, desde sus propias experiencias y tópicos de otras asignaturas, con orientación del profesor.'},
      {codigo:'OA2', eje:'Diseñar, hacer y probar', descripcion:'Distinguir las tareas para elaborar un objeto tecnológico, identificando los materiales y las herramientas necesarias en cada una de ellas para lograr el resultado deseado.'},
      {codigo:'OA3', eje:'Diseñar, hacer y probar', descripcion:'Elaborar un objeto tecnológico según indicaciones del profesor, seleccionando y experimentando con: técnicas y herramientas para medir, cortar, plegar, unir, pegar, pintar, entre otras; materiales como papeles, fibras, plásticos, desechos, entre otros.'},
      {codigo:'OA4', eje:'Diseñar, hacer y probar', descripcion:'Probar y explicar los resultados de los trabajos propios y de otros, de forma individual o en equipos, dialogando sobre sus ideas e identificando lo que podría hacerse de otra manera.'},
      {codigo:'OA5', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar software de dibujo para crear y representar ideas por medio de imágenes, guiados por el docente.'},
      {codigo:'OA6', eje:'Tecnologías de la información y la comunicación', descripcion:'Explorar y usar una variedad de software educativos (simuladores, libros digitales, interactivos y creativos, entre otros) para lograr aprendizajes significativos y una interacción apropiada con las TIC.'}
    ],
    // ── 2°B — DS 2960/2012 ─ 7 OAs (Diseñar 1-4, TIC 5-7)
    '2B': [
      {codigo:'OA1', eje:'Diseñar, hacer y probar', descripcion:'Crear diseños de objetos tecnológicos, representando sus ideas a través de dibujos a mano alzada o modelos concretos, desde ámbitos cercanos y tópicos de otras asignaturas, con orientación del profesor.'},
      {codigo:'OA2', eje:'Diseñar, hacer y probar', descripcion:'Organizar las tareas para elaborar un objeto tecnológico, distinguiendo las acciones, los materiales y las herramientas necesarias para lograr el resultado deseado.'},
      {codigo:'OA3', eje:'Diseñar, hacer y probar', descripcion:'Elaborar un objeto tecnológico según indicaciones del profesor, seleccionando y experimentando con: técnicas y herramientas para medir, cortar, plegar, unir, pegar, pintar, entre otras; materiales como papeles, cartones, fibras, plásticos, desechos, entre otros.'},
      {codigo:'OA4', eje:'Diseñar, hacer y probar', descripcion:'Probar y explicar los resultados de los trabajos propios y de otros, de forma individual o en equipos, dialogando sobre sus ideas y señalando cómo podría mejorar el trabajo en el futuro.'},
      {codigo:'OA5', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar software de dibujo para crear y representar diferentes ideas por medio de imágenes.'},
      {codigo:'OA6', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar procesador de textos para crear, editar y guardar información.'},
      {codigo:'OA7', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar internet para acceder y extraer información siguiendo las indicaciones del profesor y considerando la seguridad de la fuente.'}
    ],
    // ── 3°B — DS 2960/2012 ─ 7 OAs (Diseñar 1-4, TIC 5-7)
    '3B': [
      {codigo:'OA1', eje:'Diseñar, hacer y probar', descripcion:'Crear diseños de objetos o sistemas tecnológicos simples para resolver problemas: desde diversos ámbitos tecnológicos y tópicos de otras asignaturas; representando sus ideas a través de dibujos a mano alzada, modelos concretos o usando TIC; explorando y combinando productos existentes.'},
      {codigo:'OA2', eje:'Diseñar, hacer y probar', descripcion:'Planificar la elaboración de un objeto tecnológico, incorporando la secuencia de acciones, materiales, herramientas, técnicas y medidas de seguridad necesarias para lograr el resultado deseado.'},
      {codigo:'OA3', eje:'Diseñar, hacer y probar', descripcion:'Elaborar un objeto tecnológico para resolver problemas, seleccionando y demostrando dominio de: técnicas y herramientas para medir, marcar, cortar, plegar, unir, pegar, pintar, entre otras; materiales como papeles, cartones, fibras, plásticos, cerámicos, desechos, entre otros.'},
      {codigo:'OA4', eje:'Diseñar, hacer y probar', descripcion:'Probar y evaluar la calidad de los trabajos propios o de otros, de forma individual o en equipos, aplicando criterios técnicos, medioambientales y de seguridad y dialogando sobre sus resultados e ideas de mejoramiento.'},
      {codigo:'OA5', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar software de presentación para organizar y comunicar ideas para diferentes propósitos.'},
      {codigo:'OA6', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar procesador de textos para crear, editar, dar formato y guardar información.'},
      {codigo:'OA7', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar internet y buscadores para localizar, extraer y almacenar información, considerando la seguridad de la fuente.'}
    ],
    // ── 4°B — DS 2960/2012 ─ 7 OAs (Diseñar 1-4, TIC 5-7)
    '4B': [
      {codigo:'OA1', eje:'Diseñar, hacer y probar', descripcion:'Crear diseños de objetos o sistemas tecnológicos simples para resolver problemas: desde diversos ámbitos tecnológicos y tópicos de otras asignaturas; representando sus ideas a través de dibujos a mano alzada, dibujo técnico o usando TIC; explorando y transformando productos existentes.'},
      {codigo:'OA2', eje:'Diseñar, hacer y probar', descripcion:'Planificar la elaboración de un objeto tecnológico, incorporando la secuencia de acciones, materiales, herramientas, técnicas y medidas de seguridad necesarias para lograr el resultado deseado, y discutiendo las implicancias ambientales de los recursos utilizados.'},
      {codigo:'OA3', eje:'Diseñar, hacer y probar', descripcion:'Elaborar un objeto tecnológico para resolver problemas, seleccionando y demostrando dominio de: técnicas y herramientas para medir, marcar, cortar, unir, pintar, perforar, serrar, plegar y pegar, entre otras; materiales como papeles, cartones, maderas, fibras, plásticos, cerámicos, desechos, entre otros.'},
      {codigo:'OA4', eje:'Diseñar, hacer y probar', descripcion:'Probar y evaluar la calidad de los trabajos propios o de otros, de forma individual o en equipos, aplicando criterios de funcionamiento, técnicos, medioambientales y de seguridad, y dialogando sobre sus resultados e ideas de mejoramiento.'},
      {codigo:'OA5', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar software para organizar y comunicar ideas e información con diferentes propósitos mediante: programas de presentación para mostrar imágenes, diagramas y textos, entre otros; hojas de cálculo para ordenar datos y elaborar gráficos simples.'},
      {codigo:'OA6', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar procesador de textos para crear, editar, dar formato, incorporar elementos de diseño y guardar un documento.'},
      {codigo:'OA7', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar internet y buscadores para localizar, extraer, evaluar y almacenar información, considerando la seguridad de la fuente.'}
    ],
    // ── 5°B — DS 2960/2012 ─ 7 OAs (Diseñar 1-4, TIC 5-7)
    '5B': [
      {codigo:'OA1', eje:'Diseñar, hacer y probar', descripcion:'Crear diseños de objetos o sistemas tecnológicos para resolver problemas o aprovechar oportunidades: desde diversos ámbitos tecnológicos y tópicos de otras asignaturas; representando sus ideas a través de dibujos a mano alzada, dibujo técnico o usando TIC; analizando y modificando productos.'},
      {codigo:'OA2', eje:'Diseñar, hacer y probar', descripcion:'Planificar la elaboración de objetos tecnológicos, incorporando la secuencia de acciones, materiales, herramientas, técnicas y medidas de seguridad necesarias o alternativas para lograr el resultado deseado, discutiendo las implicancias ambientales y sociales de los recursos utilizados.'},
      {codigo:'OA3', eje:'Diseñar, hacer y probar', descripcion:'Elaborar un producto tecnológico para resolver problemas y aprovechar oportunidades, seleccionando y demostrando dominio en el uso de: técnicas y herramientas para medir, marcar, cortar, unir, pegar, mezclar, lijar, serrar, perforar y pintar, entre otras; materiales como papeles, cartones, maderas, fibras, plásticos, cerámicos, metales, desechos, entre otros.'},
      {codigo:'OA4', eje:'Diseñar, hacer y probar', descripcion:'Probar y evaluar la calidad de los trabajos propios o de otros, de forma individual o en equipos, aplicando criterios de funcionamiento, técnicos, medioambientales, estéticos y de seguridad, y dialogando sobre sus resultados e ideas de mejoramiento.'},
      {codigo:'OA5', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar software para organizar y comunicar los resultados de investigaciones e intercambiar ideas con diferentes propósitos, mediante: programas de presentación para mostrar imágenes, diagramas y textos, entre otros; hojas de cálculo para elaborar tablas de doble entrada y gráficos de barra y línea, entre otros.'},
      {codigo:'OA6', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar procesador de textos para crear, editar, dar formato, incorporar elementos de diseño y guardar un documento.'},
      {codigo:'OA7', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar internet y comunicación en línea para compartir información de diferente carácter con otras personas, considerando la seguridad de la fuente y las normas de privacidad.'}
    ],
    // ── 6°B — DS 2960/2012 ─ 7 OAs (Diseñar 1-4, TIC 5-7)
    '6B': [
      {codigo:'OA1', eje:'Diseñar, hacer y probar', descripcion:'Crear diseños de objetos y sistemas tecnológicos para resolver problemas o aprovechar oportunidades: desde diversos ámbitos tecnológicos determinados y tópicos de otras asignaturas; representando sus ideas a través de dibujos a mano alzada, dibujo técnico o usando TIC; innovando con productos.'},
      {codigo:'OA2', eje:'Diseñar, hacer y probar', descripcion:'Planificar la elaboración de objetos o servicios tecnológicos, incorporando la secuencia de acciones, tiempos, costos y recursos necesarios o alternativos para lograr el resultado deseado, y discutiendo las implicancias ambientales y sociales de los elementos considerados.'},
      {codigo:'OA3', eje:'Diseñar, hacer y probar', descripcion:'Elaborar un producto tecnológico para resolver problemas y aprovechar oportunidades, seleccionando y demostrando dominio en el uso de: técnicas y herramientas para medir, marcar, cortar, unir, pegar, perforar, mezclar, lijar, serrar y pintar, entre otras; materiales como papeles, cartones, maderas, fibras, plásticos, cerámicos, metales, desechos, entre otros.'},
      {codigo:'OA4', eje:'Diseñar, hacer y probar', descripcion:'Probar y evaluar la calidad de los trabajos propios o de otros, de forma individual o en equipos, aplicando criterios de funcionamiento, técnicos, medioambientales, estéticos y de seguridad, dialogando sobre sus resultados y aplicando correcciones según corresponda.'},
      {codigo:'OA5', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar software para organizar y comunicar los resultados de investigaciones e intercambiar ideas con diferentes propósitos, mediante: programas de presentación para mostrar imágenes, diagramas y textos, entre otros; hojas de cálculo para elaborar tablas de doble entrada y diseñar gráficos de barra simple y doble, circulares y de línea, entre otros.'},
      {codigo:'OA6', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar procesador de textos para crear, editar, dar formato, incorporar elementos de diseño, revisar y guardar un documento.'},
      {codigo:'OA7', eje:'Tecnologías de la información y la comunicación', descripcion:'Usar internet y comunicación en línea para compartir y publicar información de diferente carácter con otras personas, considerando la seguridad de la fuente y las normas de privacidad y de uso.'}
    ],
    // ── 7°B — DS 369/2015 ─ 6 OAs (focus reparación, adaptación, mejora)
    '7B': [
      {codigo:'OA1', eje:'Resolución de problemas tecnológicos', descripcion:'Identificar necesidades personales o grupales del entorno cercano que impliquen soluciones de reparación, adaptación o mejora, reflexionando acerca de sus posibles aportes.'},
      {codigo:'OA2', eje:'Resolución de problemas tecnológicos', descripcion:'Diseñar e implementar soluciones que respondan a las necesidades de reparación, adaptación o mejora de objetos o entornos, haciendo uso eficiente de recursos materiales, energéticos y digitales.'},
      {codigo:'OA3', eje:'Resolución de problemas tecnológicos', descripcion:'Evaluar soluciones implementadas como respuesta a las necesidades de reparación, adaptación o mejora de objetos o entornos, aplicando criterios propios y técnicos.'},
      {codigo:'OA4', eje:'Resolución de problemas tecnológicos', descripcion:'Comunicar el diseño, la planificación u otros procesos de la resolución de necesidades de reparación, adaptación o mejora de objetos o entornos, utilizando herramientas TIC, considerando el objetivo, la audiencia y aspectos éticos.'},
      {codigo:'OA5', eje:'Tecnología, ambiente y sociedad', descripcion:'Contrastar soluciones tecnológicas existentes de reparación, adaptación o mejora identificando las necesidades a las que respondieron y el contexto en que fueron desarrolladas.'},
      {codigo:'OA6', eje:'Tecnología, ambiente y sociedad', descripcion:'Caracterizar algunos de los efectos que han tenido las soluciones tecnológicas existentes de reparación, adaptación o mejora, considerando aspectos sociales y ambientales.'}
    ],
    // ── 8°B — DS 369/2015 ─ 6 OAs (focus creación de productos)
    '8B': [
      {codigo:'OA1', eje:'Resolución de problemas tecnológicos', descripcion:'Identificar oportunidades o necesidades personales, grupales o locales que impliquen la creación de un producto tecnológico, reflexionando acerca de sus posibles aportes.'},
      {codigo:'OA2', eje:'Resolución de problemas tecnológicos', descripcion:'Diseñar y crear un producto tecnológico que atienda a la oportunidad o necesidad establecida, respetando criterios de eficiencia y sustentabilidad, y utilizando herramientas TIC en distintas etapas del proceso.'},
      {codigo:'OA3', eje:'Resolución de problemas tecnológicos', descripcion:'Evaluar el producto tecnológico creado, aplicando criterios propios y técnicos, y proponer mejoras asociadas tanto a los procesos como al producto final.'},
      {codigo:'OA4', eje:'Resolución de problemas tecnológicos', descripcion:'Comunicar el diseño, la planificación u otros procesos de la creación de productos tecnológicos, utilizando herramientas TIC, considerando diferentes tipos de objetivos y audiencias, y teniendo en cuenta aspectos éticos.'},
      {codigo:'OA5', eje:'Tecnología, ambiente y sociedad', descripcion:'Examinar soluciones tecnológicas existentes que respondan a las oportunidades o necesidades establecidas, considerando los destinatarios, aspectos técnicos y funcionales.'},
      {codigo:'OA6', eje:'Tecnología, ambiente y sociedad', descripcion:'Establecer impactos positivos y/o negativos de las soluciones tecnológicas analizadas, considerando aspectos éticos, ambientales y sociales, entre otros.'}
    ],
    // ── 1°M Educación Tecnológica — DS 369/2015 ─ 6 OAs (focus servicios)
    '1M': [
      {codigo:'OA1', eje:'Resolución de problemas tecnológicos', descripcion:'Identificar oportunidades o necesidades personales, grupales o locales que impliquen la creación de un servicio, utilizando recursos digitales u otros medios.'},
      {codigo:'OA2', eje:'Resolución de problemas tecnológicos', descripcion:'Desarrollar un servicio que implique la utilización de recursos digitales u otros medios, considerando aspectos éticos, sus potenciales impactos y normas de cuidado y seguridad.'},
      {codigo:'OA3', eje:'Resolución de problemas tecnológicos', descripcion:'Evaluar el servicio desarrollado considerando criterios propios, técnicos y valóricos, y proponer mejoras asociadas tanto a los procesos como al producto final.'},
      {codigo:'OA4', eje:'Resolución de problemas tecnológicos', descripcion:'Comunicar el diseño, la planificación u otros procesos del desarrollo de un servicio, utilizando herramientas TIC, considerando diferentes tipos de objetivos y audiencias y teniendo en cuenta aspectos éticos.'},
      {codigo:'OA5', eje:'Tecnología, ambiente y sociedad', descripcion:'Analizar las formas en que los productos tecnológicos y los entornos evolucionan, caracterizando los diversos factores que influyen en ese cambio.'},
      {codigo:'OA6', eje:'Tecnología, ambiente y sociedad', descripcion:'Inferir, basándose en la evolución de los productos tecnológicos y los entornos, los efectos positivos o negativos que estos han tenido en la sociedad.'}
    ],
    // ── 2°M Educación Tecnológica — DS 369/2015 ─ 6 OAs (focus sustentabilidad)
    '2M': [
      {codigo:'OA1', eje:'Resolución de problemas tecnológicos', descripcion:'Identificar necesidades que impliquen la reducción de efectos perjudiciales relacionados con el uso de recursos energéticos y materiales en una perspectiva de sustentabilidad.'},
      {codigo:'OA2', eje:'Resolución de problemas tecnológicos', descripcion:'Proponer soluciones que apunten a resolver necesidades de reducción de efectos perjudiciales relacionados con el uso de recursos energéticos y materiales en una perspectiva de sustentabilidad, utilizando herramientas TIC colaborativas de producción, edición, publicación y comunicación.'},
      {codigo:'OA3', eje:'Resolución de problemas tecnológicos', descripcion:'Evaluar las propuestas de soluciones que apunten a resolver necesidades de reducción de efectos perjudiciales relacionados con el uso de recursos energéticos y materiales considerando aspectos o dilemas éticos, legales, económicos, ambientales y sociales.'},
      {codigo:'OA4', eje:'Resolución de problemas tecnológicos', descripcion:'Comunicar propuestas de soluciones para reducir los efectos perjudiciales proyectando posibles escenarios de cambio y sus impactos, utilizando herramientas TIC, considerando diferentes tipos de objetivos y audiencias, teniendo en cuenta aspectos éticos y aplicando normas de cuidado y seguridad.'},
      {codigo:'OA5', eje:'Tecnología, ambiente y sociedad', descripcion:'Evaluar críticamente cómo las innovaciones tecnológicas actuales afectan a la sociedad y al ambiente, considerando criterios éticos, económicos, ambientales y sociales.'},
      {codigo:'OA6', eje:'Tecnología, ambiente y sociedad', descripcion:'Proyectar escenarios de posibles impactos positivos y/o negativos de las innovaciones tecnológicas actuales en ámbitos personales, sociales, ambientales, legales, económicos u otros.'}
    ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Identificar oportunidades y problemas','Diseñar y hacer','Evaluar impactos y mejorar']
};

