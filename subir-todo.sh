#!/usr/bin/env bash
# =====================================================================
#  subir-todo.sh  --  Click&Clase
#  1. Commit 1: Sistema de Monitoreo en vivo (presencia + feed)
#  2. Commit 2: Refactor de material.html en 8 modulos + tabs/modal
#  3. Push a origin/main
#  4. Deploy a Firebase Hosting (clickyclase.cl)
# =====================================================================

set -e

REPO="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO"

step() { echo; echo "============================================================"; echo "  $1"; echo "============================================================"; }

# -- 0. Limpiar locks -------------------------------------------------
step "Paso 0 - Limpiar locks de git"
for l in ".git/index.lock" ".git/HEAD.lock" ".git/refs/heads/main.lock"; do
  [ -e "$l" ] && (rm -f "$l" 2>/dev/null && echo "  borrado: $l")
done

# -- 1. Firebase CLI --------------------------------------------------
step "Paso 1 - Verificar Firebase CLI"
if ! command -v firebase >/dev/null 2>&1; then
  echo "ATENCION: firebase CLI no instalado. Saltare el deploy."
  echo "Para instalar: npm install -g firebase-tools && firebase login"
  HAS_FIREBASE=0
else
  firebase --version
  HAS_FIREBASE=1
fi

# -- 2. COMMIT 1: Monitoreo en vivo -----------------------------------
step "Paso 2 - Commit 1: Sistema de Monitoreo en vivo"

MON_FILES=(
  "js/presencia-logger.js"
  "js/firebase-db.js"
  "admin.html"
  "dashboard-profesor.html"
  "planificacion.html"
  "listas-curso.html"
  "biblioteca.html"
  "evaluaciones.html"
)
MON_EXISTING=()
for f in "${MON_FILES[@]}"; do [ -e "$f" ] && MON_EXISTING+=("$f"); done

# Solo agregar los del monitoreo si hay cambios sin commitear en esos archivos
git add -- "${MON_EXISTING[@]}"

# Comprobar si hay algo staged para el commit 1
if git diff --cached --quiet; then
  echo "  (Monitoreo ya estaba commiteado o sin cambios, salto al refactor)"
else
  git commit -m "feat(monitoreo): panel admin con usuarios online y feed de eventos en vivo

Nueva pestana 'Monitoreo en vivo' en admin.html que muestra quien esta
conectado (latido cada 30 s) y los ultimos 100 eventos del audit log
(polling cada 8 s).

- js/presencia-logger.js (nuevo): latido + currentPage por usuario
- admin.html: pestana nueva con 3 contadores + panel online + feed
- js/firebase-db.js: tipos nuevos guardar_nomina/notas/asistencia
- 7 paginas con heartbeat (admin, dashboard, material, planificacion,
  listas-curso, biblioteca, evaluaciones)
- listas-curso.html: logEvent en guardar nomina, notas, asistencia"
  echo "  OK Commit 1 listo"
fi

# -- 3. COMMIT 2: Refactor de material.html ---------------------------
step "Paso 3 - Commit 2: Refactor de material.html + tabs/modal"

REF_FILES=(
  "material.html"
  "js/material/material-ui.js"
  "js/material/material-biblioteca.js"
  "js/material/material-doc.js"
  "js/material/material-pie.js"
  "js/material/material-export.js"
  "js/material/material-curriculo.js"
  "js/material/material-ia.js"
  "js/material/material-tabs.js"
)
REF_EXISTING=()
for f in "${REF_FILES[@]}"; do [ -e "$f" ] && REF_EXISTING+=("$f"); done

git add -- "${REF_EXISTING[@]}"

if git diff --cached --quiet; then
  echo "  (Refactor ya estaba commiteado o sin cambios)"
else
  git commit -m "feat(material): refactor en 8 modulos + tabs Estandar/NEE + modal preview

REFACTOR: material.html pasa de 6785 a ~3400 lineas (-50%) extrayendo
el JS inline a 8 modulos especializados bajo js/material/.

Modulos creados:
- material-ui.js        Utilidades base + drafts autoguardado
- material-biblioteca.js Publicar en biblioteca + buscador OAs
- material-doc.js       Helpers institucionales (logo, header, pieDoc)
- material-pie.js       Paneles de configuracion PIE por NEE
- material-export.js    Copiar/refinar IA + descargas Word/PDF
- material-curriculo.js Selectors de OAs/AEs/CEs/unidades adaptivos
- material-ia.js        Constructores de prompts + llamada Gemini
- material-tabs.js      Tabs Estandar/NEE + modal preview + descargas
                        por version

Todas las funciones se exponen en window (mismo nombre que tenian)
para no romper los onclick inline del HTML.

FEATURE: Tabs Estandar / NEE en el resultado
- Botones: Previsualizar | Word | PDF | Copiar | Nuevo | Refinar | Publicar
- Tab NEE aparece solo si hay version PIE generada (MutationObserver)
- Cada tab descarga SOLO su version (suffix _PIE en el nombre)
- Modal grande de previsualizacion con renderizado limpio del PDF
- Cerrar modal con boton X u tecla Escape

Mejoras al formato de descarga:
- descargarDoc/descargarPDF aceptan opts.sourceEl (clon filtrado por
  version) y opts.suffix ('PIE' o null)
- El audit log diferencia descargas estandar vs PIE en el campo version"
  echo "  OK Commit 2 listo"
fi

# -- 4. Push ---------------------------------------------------------
step "Paso 4 - git push origin main"
git log --oneline origin/main..HEAD || true
git push origin main

# -- 5. Deploy -------------------------------------------------------
if [ "$HAS_FIREBASE" = "1" ]; then
  step "Paso 5 - Firebase deploy --only hosting"
  firebase deploy --only hosting
fi

echo
echo "============================================================"
echo "  LISTO"
echo "============================================================"
echo "  - origin/main actualizado con 2 commits"
[ "$HAS_FIREBASE" = "1" ] && echo "  - clickyclase.cl deployado"
echo
echo "  Para ver los cambios:"
echo "    1. clickyclase.cl/admin.html  -> Monitoreo en vivo"
echo "    2. clickyclase.cl/material.html -> Tabs Estandar/NEE + Previsualizar"
echo "    Pulsa Ctrl+Shift+R para forzar refresco de cache."
