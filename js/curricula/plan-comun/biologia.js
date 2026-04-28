// =============================================================================
//  PLAN COMÚN — Biología
//  Archivo: js/curricula/plan-comun/biologia.js
//
//  Fuente: Bases Curriculares Mineduc (DS 439/2012 Básica, DS 369/2015 7°B–2°M,
//          DS 193/2019 3°M–4°M FG).
//
//  Estructura:
//    window.CURRICULA_PLAN_COMUN['biologia'] = {
//      nombre, sigla, tramo, niveles,
//      oas: { '1B': [ { codigo, eje, descripcion }, ... ], ... },
//      actitudes: [...],      // específicas de la asignatura (o heredadas de _comun)
//      habilidades: [...],    // ejes de habilidades de la asignatura
//      unidades: { '1B': [...] }  // opcional — a completar en Fase B
//    }
// =============================================================================

window.CURRICULA_PLAN_COMUN = window.CURRICULA_PLAN_COMUN || {};

CURRICULA_PLAN_COMUN['biologia'] = {
  nombre: 'Biología',
  sigla:  'BIO',
  niveles: ['1M','2M','3M','4M'],
  // 1M-2M forman parte de Ciencias Naturales (ver ciencias.js) — aquí se
  // mantiene la referencia para planificación por asignatura separada cuando
  // el establecimiento así lo organice. 3M-4M son Formación General FG (DS 193/2019).
  unidades: {
    '1M': ['Célula y sus procesos','Organismos y ambiente','Herencia y reproducción'],
    '2M': ['Genética molecular','Evolución','Ecosistemas y biodiversidad'],
    '3M': ['Fisiología humana','Neurociencia básica','Biotecnología'],
    '4M': ['Ecología y sustentabilidad','Biología molecular avanzada','Biotecnología y ética']
  },
  // ───────────────────────────────────────────────────────────────────────────
  //  OAs — schema: { codigo: 'OA1', eje: '...', descripcion: '...' }
  //  TODO: insertar OAs oficiales al subir Bases Curriculares (DS 369/2015 para
  //  1M-2M CN y DS 193/2019 para 3M-4M FG). Formato-ejemplo:
  //    { codigo:'OA1', eje:'Biología', descripcion:'Explicar...' }
  // ───────────────────────────────────────────────────────────────────────────
  oas: {
    '1M': [ /* TODO: OAs Biología 1°M (ver ciencias.js para CN) */ ],
    '2M': [ /* TODO: OAs Biología 2°M (ver ciencias.js para CN) */ ],
    '3M': [ /* TODO: OAs Biología 3°M FG DS 193/2019 */ ],
    '4M': [ /* TODO: OAs Biología 4°M FG DS 193/2019 */ ]
  },
  actitudes:   [],  // hereda de _comun
  habilidades: ['Observar y plantear preguntas', 'Planificar y conducir una investigación', 'Procesar, analizar e interpretar evidencia', 'Evaluar y comunicar'],

  // ────────────────────────────────────────────────────────────────────
  //  ELECTIVOS DIFERENCIADOS HC (3°M y 4°M) — DS 193/2019
  //  Programas de Estudio Mineduc, febrero 2021. Cada electivo agrupa OAs y
  //  unidades. Se exponen como sub-asignaturas:
  //    CURRICULA_PLAN_COMUN['biologia'].electivos['<key>']
  // ────────────────────────────────────────────────────────────────────
  electivos: {
    'biologia-de-los-ecosistemas': {
      nombre:  'Biología de los Ecosistemas',
      sigla:   'BEC',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Biodiversidad y evolución', 'Servicios ecosistémicos y bienestar humano', 'Cambio climático y resiliencia', 'Ciencia, tecnología y sustentabilidad'],
        '4M': ['Biodiversidad y evolución', 'Servicios ecosistémicos y bienestar humano', 'Cambio climático y resiliencia', 'Ciencia, tecnología y sustentabilidad']
      },
      // Las Bases Curriculares prescriben los mismos OAs para 3°M y 4°M.
      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Explicar el estado de la biodiversidad actual a partir de teorías y evidencias científicas sobre el origen de la vida, la evolución y la intervención humana.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Comprender la relación entre la biodiversidad, el funcionamiento de los sistemas naturales y la provisión de servicios que estos brindan al bienestar de las personas y la sociedad, considerando aspectos de bioenergética, dinámica de poblaciones y flujos de materia y energía como factores explicativos subyacentes.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Explicar los efectos del cambio climático sobre la biodiversidad, la productividad biológica y la resiliencia de los ecosistemas, así como sus consecuencias sobre los recursos naturales, las personas y el desarrollo sostenible.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Investigar y comunicar cómo la sociedad, mediante la ciencia y la tecnología, puede prevenir, mitigar o reparar los efectos del cambio climático sobre los componentes y procesos biológicos de los sistemas naturales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la biología con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales presentes en sistemas naturales, considerando las implicancias éticas, sociales y ambientales.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Explicar el estado de la biodiversidad actual a partir de teorías y evidencias científicas sobre el origen de la vida, la evolución y la intervención humana.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Comprender la relación entre la biodiversidad, el funcionamiento de los sistemas naturales y la provisión de servicios que estos brindan al bienestar de las personas y la sociedad, considerando aspectos de bioenergética, dinámica de poblaciones y flujos de materia y energía como factores explicativos subyacentes.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Explicar los efectos del cambio climático sobre la biodiversidad, la productividad biológica y la resiliencia de los ecosistemas, así como sus consecuencias sobre los recursos naturales, las personas y el desarrollo sostenible.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Investigar y comunicar cómo la sociedad, mediante la ciencia y la tecnología, puede prevenir, mitigar o reparar los efectos del cambio climático sobre los componentes y procesos biológicos de los sistemas naturales.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Valorar la importancia de la integración de los conocimientos de la biología con otras ciencias para el análisis y la propuesta de soluciones a problemas actuales presentes en sistemas naturales, considerando las implicancias éticas, sociales y ambientales.' }
        ]
      }
    },
    'biologia-celular-y-molecular': {
      nombre:  'Biología Celular y Molecular',
      sigla:   'BCM',
      tramo:   'media',
      niveles: ['3M', '4M'],
      unidades: {
        '3M': ['Historia y biomoléculas celulares', 'Dogma central y regulación génica', 'Proteínas y procesos celulares', 'Aplicaciones biotecnológicas'],
        '4M': ['Historia y biomoléculas celulares', 'Dogma central y regulación génica', 'Proteínas y procesos celulares', 'Aplicaciones biotecnológicas']
      },
      oas: {
        '3M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Investigar el desarrollo del conocimiento de biología celular y molecular a lo largo de la historia y su relación con diversas disciplinas como la química, la física y la matemática, entre otros.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Explicar la estructura y organización de la célula basado en biomoléculas, membranas y organelos, su reproducción, mantención y recambio, en procesos de metabolismo, motilidad y comunicación, como fundamento de la continuidad y evolución del fenómeno de la vida.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Analizar críticamente el significado biológico del dogma central de la biología molecular en relación al flujo de la información genética en células desde el ADN al ARN y a las proteínas.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Describir, sobre la base de evidencia, los mecanismos de regulación génica y explicar su relación con los procesos de diferenciación y proliferación celular en respuesta a estímulos ambientales, el envejecimiento y las enfermedades como el cáncer.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Explicar las relaciones entre estructuras y funciones de proteínas en procesos como la actividad enzimática, flujo de iones a través de membranas y cambios conformacionales en procesos de motilidad celular y contracción muscular.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el desarrollo del conocimiento de biología celular y molecular en Chile y el mundo, considerando diversas líneas de investigación y la relación entre ciencia, tecnología y sociedad.' },
          { codigo: 'OA7', eje: 'Conocimiento y comprensión', descripcion: 'Analizar aplicaciones biotecnológicas en diversas áreas como tratamientos para el cáncer, preservación y uso de células madre, y producción de organismos transgénicos, entre otros, y evaluar sus implicancias éticas, sociales y legales.' }
        ],
        '4M': [
          { codigo: 'OA1', eje: 'Conocimiento y comprensión', descripcion: 'Investigar el desarrollo del conocimiento de biología celular y molecular a lo largo de la historia y su relación con diversas disciplinas como la química, la física y la matemática, entre otros.' },
          { codigo: 'OA2', eje: 'Conocimiento y comprensión', descripcion: 'Explicar la estructura y organización de la célula basado en biomoléculas, membranas y organelos, su reproducción, mantención y recambio, en procesos de metabolismo, motilidad y comunicación, como fundamento de la continuidad y evolución del fenómeno de la vida.' },
          { codigo: 'OA3', eje: 'Conocimiento y comprensión', descripcion: 'Analizar críticamente el significado biológico del dogma central de la biología molecular en relación al flujo de la información genética en células desde el ADN al ARN y a las proteínas.' },
          { codigo: 'OA4', eje: 'Conocimiento y comprensión', descripcion: 'Describir, sobre la base de evidencia, los mecanismos de regulación génica y explicar su relación con los procesos de diferenciación y proliferación celular en respuesta a estímulos ambientales, el envejecimiento y las enfermedades como el cáncer.' },
          { codigo: 'OA5', eje: 'Conocimiento y comprensión', descripcion: 'Explicar las relaciones entre estructuras y funciones de proteínas en procesos como la actividad enzimática, flujo de iones a través de membranas y cambios conformacionales en procesos de motilidad celular y contracción muscular.' },
          { codigo: 'OA6', eje: 'Conocimiento y comprensión', descripcion: 'Analizar el desarrollo del conocimiento de biología celular y molecular en Chile y el mundo, considerando diversas líneas de investigación y la relación entre ciencia, tecnología y sociedad.' },
          { codigo: 'OA7', eje: 'Conocimiento y comprensión', descripcion: 'Analizar aplicaciones biotecnológicas en diversas áreas como tratamientos para el cáncer, preservación y uso de células madre, y producción de organismos transgénicos, entre otros, y evaluar sus implicancias éticas, sociales y legales.' }
        ]
      }
    }
  }
};

