# Click&Clase — Checklist de pruebas (clickyclase-2)

Prueba todo de una pasada. Marca `[x]` lo que funcione, anota lo que falle.
Requisitos previos: reglas de Firestore publicadas (las del panel de admin) y
`GEMINI_API_KEY` configurada en Vercel.

Todos los usuarios: contraseña `Demo1234!`. Entra siempre por `login.html`.

## 1. Acceso y enrutamiento por rol
- [ ] `admin@clickyclase.cl` → abre **panel-admin**.
- [ ] `director@colegio-demo.cl` → abre **panel-director**.
- [ ] `utp.tp@colegio-demo.cl` → abre **panel-utp bloqueado en Técnico Profesional** (sin selector).
- [ ] `profesor@colegio-demo.cl` → abre **panel-profesor**.
- [ ] `ambiente@colegio-demo.cl` → **convivencia**; `ambiente.prof@…` → **prof. convivencia**.
- [ ] `apoyo@colegio-demo.cl` → **apoyo**; `apoyo.prof@…` → **prof. apoyo**.
- [ ] `pie.encargada@colegio-demo.cl` → **PIE**; `pie.educadora@…` → **educadora PIE**.
- [ ] Cada panel abre sin errores y se ve con el tema claro.

## 2. Admin (control total)
- [ ] La lista de **Usuarios** muestra los usuarios reales de Firestore.
- [ ] **Crear cargo**: crea un usuario nuevo (ej. un director de prueba) → aparece en la lista.
- [ ] **Configuración IA**: agrega una API Key y elige modelo → se guarda (recarga y sigue ahí).

## 3. Calendario compartido (Firestore)
- [ ] Como **Director** → Calendario → Importar un Excel/Word con actividades.
- [ ] Cierra sesión, entra como **Profesor** (otra ventana/incógnito) → "Calendario del colegio" muestra lo que cargó el director.
- [ ] Lo mismo se ve en convivencia, apoyo, PIE, educadora PIE, UTP.

## 4. Documentos institucionales + IA
- [ ] Como **Director** → Lineamientos/PEI → sube un `.docx` o `.txt` en un documento → "cargado y leído por la IA".
- [ ] Como **Convivencia** → Casos → clic en un caso → "Generar con IA": el plan se basa en el documento + normativa, sale editable.
- [ ] **Exportar a Word** descarga el plan. **Guardar como plan** lo agrega a Planes de acción.

## 5. Persistencia de datos (se comparte entre usuarios)
- [ ] En **Convivencia**, importa casos por Excel → recarga la página → los casos siguen.
- [ ] Entra como **Prof. convivencia** (mismo colegio) → ve los datos guardados.
- [ ] **Profesor**: genera material con IA → "Guardar en biblioteca" → recarga → sigue en Biblioteca.
- [ ] **UTP**: en un ciclo, aprueba una planificación → recarga → el estado se mantiene.
- [ ] **PIE / Educadora PIE**: genera una actividad/informe con IA → recarga → persiste.

## 6. IA por rol
- [ ] **Profesor**: genera planificación/guía/prueba (debe traer contenido real).
- [ ] **Prof. apoyo psicosocial**: genera informe psicosocial.
- [ ] **Educadora PIE**: genera actividad según diagnóstico / informe / adecuación.
- [ ] Si la IA da error, revisar que `GEMINI_API_KEY` esté en Vercel.

## 7. General
- [ ] Buscador de tablas filtra en todas las secciones.
- [ ] Importar/Plantilla funciona en las secciones con datos.
- [ ] Alertas del resumen son clickeables y llevan a su sección.
- [ ] "Salir" vuelve al login.

---

### Si algo falla
Anota: rol, panel, sección, y qué pasó (pantalla en blanco, error en consola F12,
botón sin efecto). Con eso lo corregimos puntualmente.
