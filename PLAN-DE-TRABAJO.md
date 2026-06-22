# Click&Clase — Plan de trabajo y progreso

Plan de ejecución de las 62 mejoras (ver `MEJORAS-CLICKYCLASE.md`), organizado en
sprints con orden lógico y dependencias. Marca `[x]` lo que se vaya completando.

Leyenda de estado: `[x]` hecho · `[~]` parcial · `[ ]` pendiente.

---

## Estado actual (lo ya construido)

- [x] 11 paneles por rol, tema claro unificado (`css/panel.css`).
- [x] Login enruta cada rol a su panel; admin crea cargos.
- [x] Admin: configuración de IA (keys + modelo) en Firestore; lista de usuarios.
- [x] IA: plan de acción (convivencia), informe psicosocial, actividad/informe PIE,
      material del profesor — todo editable y exportable a Word.
- [~] Persistencia Firestore: **calendario y documentos** compartidos (paso 1 hecho).
- [ ] Persistencia Firestore: casos, planes, informes, estudiantes (paso 2).
- [ ] Serverless de IA leyendo keys desde Firestore (paso 3).

---

## Sprint 1 — Fundaciones de datos  (la base de todo)

Objetivo: que todos los datos persistan y se compartan por colegio.
Puntos del listado: 1, 2, 3, 4, 5, 6.

- [~] (1) Calendario y documentos en Firestore.
- [ ] (1) Casos, planes, informes, estudiantes, cursos en Firestore (por panel).
- [ ] (2) Reglas multi-tenant en producción (aislamiento por colegio).
- [ ] (3) Custom claims (orgId, rol, seg) en el token.
- [ ] (4) Serverless de IA leyendo keys desde Firestore (cuenta de servicio).
- [ ] (5) Firebase Storage para subir PDF/Word reales.
- [ ] (6) Notificaciones internas (caso asignado, plan por revisar, etc.).

Criterio de listo: un dato creado por un usuario lo ven los demás de su colegio,
desde cualquier equipo, y solo de su colegio.

## Sprint 2 — Seguridad y cumplimiento

Puntos: 7, 8, 9, 10, 11.

- [ ] (7) Forzar cambio de contraseña en el primer ingreso.
- [ ] (8) Registro de auditoría (acceso a datos sensibles).
- [ ] (9) Permisos finos campo a campo (adecuación vs diagnóstico).
- [ ] (10) Consentimiento y política de privacidad (Ley 19.628 / nueva ley).
- [ ] (11) Respaldo y exportación de datos del colegio.

## Sprint 3 — Mejoras transversales (todos los paneles)

Puntos: 12–25.

- [ ] (12) Modo claro/oscuro conmutable.
- [ ] (13) Branding por colegio (logo y color).
- [ ] (14) Responsivo móvil real.
- [ ] (15) Estados vacíos ilustrados.
- [ ] (16) Skeletons/spinners de carga.
- [ ] (17) Accesibilidad (contraste, teclado, ARIA).
- [ ] (18) Avatares y breadcrumb.
- [ ] (19) Buscador y filtros por columna en todas las tablas.
- [ ] (20) Ordenar y paginar tablas.
- [ ] (21) Edición en línea (agregar/editar/eliminar).
- [ ] (22) Exportar tablas a Excel/PDF.
- [ ] (23) Importación robusta (validación + vista previa).
- [ ] (24) Calendario institucional editable y visible para todos.
- [ ] (25) Historial de cambios por registro.

## Sprint 4 — Mejoras por panel

Se ejecuta panel por panel, priorizando el rol más usado (Profesor → Director → UTP → áreas).
Puntos: 26–53.

- [ ] Administrador (26–30): colegios, editar/desactivar usuarios, dashboard de uso, planes/facturación, soporte.
- [ ] Director (31–34): subida real de PEI, indicadores Mineduc, alertas legales, cumplimiento por área.
- [ ] UTP (35–38): aprobar/observar planificaciones (notifica al profesor), cobertura real, calendario de evaluaciones, acompañamiento.
- [ ] Profesor (39–42): IA ligada al currículum, libro de clases, anotaciones→derivación, biblioteca compartida.
- [ ] Convivencia (43–46): plantilla institucional, línea de tiempo del caso, protocolos guiados, clima escolar.
- [ ] Apoyo psicosocial (47–49): plantillas de informe, red de derivación, agenda.
- [ ] PIE (50–53): PACI ligado al estudiante, control de cupos (Decreto 170), reevaluaciones, carpeta digital.

## Sprint 5 — Inteligencia Artificial avanzada

Puntos: 54–57.

- [ ] (54) IA con búsqueda semántica (RAG) sobre documentos largos.
- [ ] (55) Plantillas institucionales de salida.
- [ ] (56) Asistente por rol (chat según reglamento/normativa).
- [ ] (57) Control de costos (límites, caché, modelo).

## Sprint 6 — Plataforma / SaaS

Puntos: 58–62.

- [ ] (58) Onboarding de colegios.
- [ ] (59) Autoservicio para profesores independientes.
- [ ] (60) Multi-idioma / configuración regional.
- [ ] (61) PWA/app + rendimiento.
- [ ] (62) Página pública con planes, demo y registro.

---

## Cómo avanzamos (método)

1. Tomamos **un sprint a la vez**, y dentro de él **un punto a la vez**.
2. Yo implemento → tú **pruebas en clickyclase-2** → confirmamos → marcamos `[x]`.
3. Al cerrar cada sprint, corremos el **checklist de pruebas** completo.
4. Solo entonces pasamos al siguiente sprint.

Prioridad recomendada para empezar: **terminar Sprint 1** (casos/planes/informes a
Firestore + serverless de IA conectado), porque desbloquea todo lo demás.
