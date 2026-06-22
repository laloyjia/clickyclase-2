# Click&Clase — Hoja de ruta de mejoras

Listado de mejoras visuales y funcionales para dejar la plataforma lista y
funcional para **todos los colegios**. Ordenado por prioridad: primero las
fundaciones técnicas, luego las mejoras transversales y por panel.

---

## 1. Fundaciones (lo que hace que sea un producto real)

Estas son la base; sin ellas el resto son maquetas bonitas.

1. **Persistencia en Firestore (multi-usuario).** Hoy calendario, documentos,
   casos y planes viven en el navegador (localStorage). Migrar a Firestore con
   el modelo por colegio:
   - `organizaciones/{orgId}/config` → calendario, lineamientos, branding.
   - `organizaciones/{orgId}/documentos` → texto de PEI, reglamentos, protocolos.
   - `organizaciones/{orgId}/casos`, `/planes`, `/informes`, `/estudiantes`, `/cursos`.
   Así los datos se comparten entre todo el personal y persisten.
2. **Aislamiento por colegio (reglas multi-tenant).** Aplicar en producción las
   reglas que ya validamos en el emulador: cada quien solo ve los datos de su
   colegio; el diagnóstico clínico separado de la adecuación.
3. **Custom claims en el token** (`orgId`, `rol`, `seg`) para que las reglas y el
   enrutamiento no dependan de leer Firestore en cada consulta.
4. **Conectar el serverless de IA a las keys de Firestore** con una cuenta de
   servicio en Vercel, para que el panel de admin controle la clave de verdad.
5. **Almacenamiento de archivos** (Firebase Storage) para subir los PDF/Word
   reales (PEI, protocolos, informes firmados), no solo su texto.
6. **Notificaciones** internas (alertas que avisan al personal: caso asignado,
   plan por revisar, contrato por vencer) y por correo.

## 2. Seguridad y cumplimiento

7. **Forzar cambio de contraseña** en el primer ingreso de cada cargo creado.
8. **Registro de auditoría** (quién vio/editó datos sensibles) — exigible por la
   ley de datos para diagnósticos PIE y antecedentes psicosociales.
9. **Roles y permisos finos** (campo a campo): el profesor ve la adecuación, no
   el diagnóstico clínico; convivencia ve lo conductual, etc.
10. **Consentimiento y política de privacidad** acorde a la Ley 19.628 y la nueva
    Ley de Protección de Datos.
11. **Respaldo y exportación** de todos los datos del colegio.

## 3. Mejoras transversales (todos los paneles)

**Visuales**
12. Modo **claro/oscuro** conmutable (hoy es claro fijo).
13. **Branding por colegio**: logo y color institucional aplicados en todos los paneles.
14. **Responsivo móvil real** (sidebar colapsable, tablas con scroll, cards apiladas).
15. **Estados vacíos** ilustrados ("aún no hay casos", "sin material") en vez de tablas vacías.
16. **Skeletons / spinners** de carga mientras llegan los datos de Firestore.
17. **Accesibilidad**: contraste AA, navegación por teclado, etiquetas ARIA, foco visible.
18. **Avatares con iniciales** y color por persona; encabezados con miga de pan (breadcrumb).

**Funcionales**
19. **Buscador global** y filtros por columna (estado, fecha, responsable) en todas las tablas.
20. **Ordenar tablas** por columna; **paginación** cuando hay muchos registros.
21. **Edición en línea** de filas (no solo importar): agregar/editar/eliminar registros.
22. **Exportar a Excel/PDF** cualquier tabla, no solo importar.
23. **Importación robusta**: validación de columnas, vista previa antes de confirmar, manejo de errores por fila.
24. **Calendario institucional** compartido y editable, visible en el panel de cada cargo.
25. **Historial de cambios** por registro (quién y cuándo).

## 4. Mejoras por panel

**Administrador**
26. Gestión completa de **colegios** (crear, suspender, plan, branding) desde Firestore.
27. **Editar y desactivar** usuarios (hoy solo crear); reset de contraseña; reasignar cargo/segmento.
28. **Dashboard de uso**: generaciones de IA por colegio, usuarios activos, consumo de cuota.
29. **Planes y facturación** (Básico / Pro / Dedicado) y control de límites por plan.
30. **Panel de soporte**: tickets, estado del sistema, logs de error.

**Director**
31. Subida real de los documentos PEI/reglamentos (Storage) con control de versiones.
32. **Indicadores Mineduc/Agencia de Calidad**: asistencia, retención, repitencia, SEP, con metas.
33. Alertas legales automáticas (contratos por vencer, evaluación docente, documentos vencidos).
34. Vista consolidada de **cumplimiento por área** con semáforo y enlaces a la tarea.

**Encargado pedagógico (UTP)**
35. **Aprobar/observar planificaciones** con comentario que llega al profesor (ya prototipado).
36. **Cobertura curricular** alimentada del currículum nacional real por nivel/asignatura.
37. Calendario de **evaluaciones** por ciclo con detección de choques (dos pruebas el mismo día).
38. **Acompañamiento docente**: pauta de observación de aula y retroalimentación.

**Profesor**
39. **Generador de material con IA** conectado al currículum (OA reales por asignatura/nivel).
40. **Libro de clases**: notas, asistencia y promedios calculados; alertas de riesgo.
41. **Anotaciones** vinculadas al reglamento; derivación a convivencia con un clic.
42. **Biblioteca** personal y compartida del colegio (reutilizar material entre profesores).

**Convivencia / Ambiente**
43. **Plan de acción con IA** (ya hecho): mejorar con plantilla institucional editable y firma.
44. Línea de tiempo del **caso** (entrevistas, medidas, seguimiento) y cierre formal.
45. **Protocolos guiados** paso a paso según el tipo de caso (acoso, maltrato, etc.).
46. Encuesta de **clima escolar** y tablero de indicadores.

**Apoyo psicosocial**
47. **Informe psicosocial con IA** (ya hecho): plantillas por tipo (derivación, seguimiento).
48. **Red de derivación** (OPD, CESFAM, Mejor Niñez) con seguimiento del estado.
49. Agenda de atenciones y recordatorios.

**PIE / Educación diferencial**
50. **PACI y actividades con IA** (ya hecho): ligar a la ficha del estudiante y al Decreto 83.
51. **Control de cupos por curso** (Decreto 170) con alerta cuando se supera.
52. Calendario de **reevaluaciones** con aviso anticipado.
53. Carpeta digital por estudiante con todo su historial PIE.

## 5. Inteligencia Artificial

54. **IA basada en los documentos del colegio** (ya iniciado) — robustecer con búsqueda
    semántica (RAG) cuando los documentos son largos.
55. **Plantillas institucionales** de salida (el colegio sube su formato y la IA lo respeta).
56. **Asistente por rol** (chat) que responde según el reglamento y la normativa.
57. **Control de costos**: límites por usuario/colegio, caché de respuestas, elección de modelo.

## 6. Plataforma / SaaS

58. **Onboarding de colegios**: alta guiada (datos, RBD, branding, importar nóminas).
59. **Autoservicio para profesores independientes** (registro, pago, espacio personal).
60. **Multi-idioma** preparado (es-CL base) y configuración regional.
61. **PWA / app** instalable; rendimiento (lazy-load, code splitting de los paneles).
62. **Página pública** (clickyclase.cl) con planes, demo y registro.

---

### Sugerencia de orden de ejecución

1) Fundaciones (1–6) → 2) Seguridad básica (7–11) → 3) Transversales clave
(19–24) → 4) Mejoras por panel del rol que más se use → 5) IA avanzada →
6) SaaS. Cada bloque se entrega y se prueba antes de pasar al siguiente.
