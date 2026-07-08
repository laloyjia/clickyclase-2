/**
 * inicializar-planes.mjs — Click&Clase (electrolearn-prod)
 *
 * Crea los 3 planes comerciales en la colección `planes` de Firestore.
 * Idempotente: si un plan ya existe, hace merge (no destruye personalizaciones).
 *
 * Planes:
 *   - basic       $800.000 CLP/año — Docencia esencial
 *   - pro       $1.500.000 CLP/año — Docencia + IA + Dashboards
 *   - enterprise $2.500.000 CLP/año — Ecosistema completo (PIE + Apoyo + Convivencia)
 *
 * Requisitos:
 *   serviceAccountKey.json de electrolearn-prod en esta carpeta.
 *
 * Ejecutar:
 *   node inicializar-planes.mjs
 */

import admin from 'firebase-admin';
import { readFileSync } from 'node:fs';

const cred = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url)));
admin.initializeApp({ credential: admin.credential.cert(cred) });
const db = admin.firestore();

const PLANES = [
  {
    id:              'basic',
    nombre:          'Basic',
    descripcion:     'Docencia esencial',
    subtitulo:       'Todo lo que un colegio necesita para digitalizar su enseñanza diaria.',
    precioAnual:     800000,
    monedaPrecio:    'CLP',
    limiteUsuarios:  15,
    limiteCursos:    12,
    features:        [
      'planificaciones',
      'libro_clases',
      'notas',
      'asistencia',
      'materiales',
      'reportes_utp',
      'panel_director_basico'
    ],
    modulosIncluidos: [
      'Planificación de clases',
      'Libro de clases digital',
      'Registro de calificaciones',
      'Reportes UTP mensuales'
    ],
    modulosNoIncluidos: [
      'Asistente de IA',
      'PIE / Apoyo Psicosocial',
      'Panel Convivencia'
    ],
    color:           '#22c55e',       // verde
    destacado:       false,
    orden:           1
  },
  {
    id:              'pro',
    nombre:          'Pro',
    descripcion:     'Docencia + IA + Analíticas',
    subtitulo:       'Suma inteligencia artificial y dashboards estratégicos para directivos.',
    precioAnual:     1500000,
    monedaPrecio:    'CLP',
    limiteUsuarios:  40,
    limiteCursos:    30,
    features:        [
      'planificaciones',
      'libro_clases',
      'notas',
      'asistencia',
      'materiales',
      'reportes_utp',
      'panel_director_basico',
      'ia_asistente',
      'dashboards_avanzados',
      'aprobaciones',
      'panel_rector'
    ],
    modulosIncluidos: [
      'Todo lo del plan Basic',
      'Asistente IA (planifica, corrige, sugiere)',
      'Dashboards Director & Rector',
      'Flujo aprobación de material'
    ],
    modulosNoIncluidos: [
      'PIE / Apoyo Psicosocial',
      'Panel Convivencia'
    ],
    color:           '#7c3aed',       // violeta — el destacado
    destacado:       true,
    orden:           2
  },
  {
    id:              'enterprise',
    nombre:          'Enterprise',
    descripcion:     'Ecosistema completo',
    subtitulo:       'Toda la plataforma con PIE, Apoyo Psicosocial y Convivencia integrados.',
    precioAnual:     2500000,
    monedaPrecio:    'CLP',
    limiteUsuarios:  999,             // sin límite práctico
    limiteCursos:    999,
    features:        [
      'planificaciones',
      'libro_clases',
      'notas',
      'asistencia',
      'materiales',
      'reportes_utp',
      'panel_director_basico',
      'ia_asistente',
      'dashboards_avanzados',
      'aprobaciones',
      'panel_rector',
      'apoyo_psicosocial',
      'convivencia',
      'pie_completo',
      'exportes_avanzados'
    ],
    modulosIncluidos: [
      'Todo lo del plan Pro',
      'PIE completo (adecuaciones + IA)',
      'Apoyo Psicosocial',
      'Panel Convivencia Escolar',
      'Reportes avanzados con exportación'
    ],
    modulosNoIncluidos: [],
    color:           '#f59e0b',       // dorado
    destacado:       false,
    orden:           3
  }
];

async function main() {
  console.log('\n────────────────────────────────────────────');
  console.log('  Inicializando planes en electrolearn-prod');
  console.log('────────────────────────────────────────────\n');

  for (const p of PLANES) {
    await db.collection('planes').doc(p.id).set({
      ...p,
      actualizadoEn: new Date().toISOString()
    }, { merge: true });
    console.log('  ✓ ' + p.nombre.padEnd(11) + ' → CLP ' + p.precioAnual.toLocaleString('es-CL') + '/año');
  }

  console.log('\n  Total planes cargados: ' + PLANES.length + '\n');
  process.exit(0);
}

main().catch(function (err) {
  console.error('\n✗ ERROR:', err.message);
  process.exit(1);
});
