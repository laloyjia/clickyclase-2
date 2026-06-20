#!/usr/bin/env bash
# =====================================================================
#  subir-y-deploy.sh  --  Click&Clase
#  1. Commit + push del Monitoreo en vivo a origin/main (GitHub).
#  2. Deploy de hosting a Firebase (clickyclase.cl).
#
#  Uso (en Git Bash):
#    cd "/c/Users/electronica9/Desktop/Proyectos AVANTI/electrolearn"
#    bash subir-y-deploy.sh
# =====================================================================

set -e

REPO="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO"

step() {
  echo
  echo "============================================================"
  echo "  $1"
  echo "============================================================"
}

# -- 0. Limpiar locks huerfanos ---------------------------------------
step "Paso 0 - Limpiar locks huerfanos de git"
for l in ".git/index.lock" ".git/HEAD.lock" ".git/refs/heads/main.lock"; do
  if [ -e "$l" ]; then
    rm -f "$l" 2>/dev/null && echo "  borrado: $l" || echo "  no se pudo borrar: $l"
  fi
done

# -- 1. Verificar firebase CLI ----------------------------------------
step "Paso 1 - Verificar Firebase CLI"
if ! command -v firebase >/dev/null 2>&1; then
  echo "ERROR: el comando 'firebase' no esta instalado."
  echo "Para instalar: npm install -g firebase-tools"
  echo "Despues: firebase login"
  exit 1
fi
firebase --version

# -- 2. Stage archivos del feature ------------------------------------
step "Paso 2 - Stage archivos del Monitoreo en vivo"
FILES=(
  "js/presencia-logger.js"
  "js/firebase-db.js"
  "admin.html"
  "dashboard-profesor.html"
  "material.html"
  "planificacion.html"
  "listas-curso.html"
  "biblioteca.html"
  "evaluaciones.html"
)
EXISTING=()
for f in "${FILES[@]}"; do
  if [ -e "$f" ]; then
    EXISTING+=("$f")
    echo "  + $f"
  else
    echo "  ! no encontrado: $f"
  fi
done

# Solo si hay cambios:
if [ -n "$(git status --porcelain ${EXISTING[@]})" ]; then
  git add -- "${EXISTING[@]}"

  # -- 3. Commit -------------------------------------------------------
  step "Paso 3 - Commit"
  git commit -m "feat(monitoreo): panel admin con usuarios online y feed de eventos en vivo

Nueva pestana 'Monitoreo en vivo' en admin.html que muestra quien esta
conectado en este momento (latido cada 30 s) y los ultimos 100 eventos
del audit log en tiempo real (polling cada 8 s).

Componentes:

- js/presencia-logger.js (nuevo)
  Modulo compartido que escribe usuarios/{uid}.lastSeen + currentPage
  + currentPageLabel cada 30 s desde cada profe autenticado. Pausa el
  latido si la pestana lleva mas de 90 s oculta y marca lastSeen vieja
  al cerrar pestana (beforeunload) para que desaparezca rapido del panel.

- admin.html
  + Nav item 'Monitoreo en vivo' con badge de count online.
  + Seccion con 3 contadores (online ahora / eventos 5 min / generaciones hoy)
  + Panel 'Profesores online ahora' con nombre, email, rol, pagina actual
    y tiempo desde el ultimo latido. Punto verde pulsante.
  + Feed de eventos con badges de color por tipo y filtro por categoria.

- js/firebase-db.js
  Agrega 4 tipos al diccionario ACTIVIDAD_TIPOS: guardar_nomina,
  guardar_notas, guardar_asistencia, refinar_material_ia.

- listas-curso.html
  + Heartbeat con label 'Libro de clases'.
  + logEvent al guardar nomina, notas y asistencia.

- material.html, planificacion.html, dashboard-profesor.html,
  biblioteca.html, evaluaciones.html
  + Heartbeat con su label correspondiente.

Notas:
- No se modifican firestore.rules: lastSeen/currentPage no estan en
  la lista de campos protegidos.
- onSnapshot del proyecto es polling REST cada 8 s, no streaming real;
  suficiente para monitoreo, mas barato en cuota."

  # -- 4. Push --------------------------------------------------------
  step "Paso 4 - git push origin main"
  git push origin main
else
  echo
  echo "  (no hay cambios para commitear, los archivos ya estan en HEAD)"
fi

# -- 5. Deploy a Firebase Hosting -------------------------------------
step "Paso 5 - Firebase Hosting deploy (clickyclase.cl)"
firebase deploy --only hosting

echo
echo "============================================================"
echo "  OK - TODO LISTO"
echo "============================================================"
echo "  GitHub: origin/main actualizado"
echo "  Sitio en vivo: https://clickyclase.cl/admin.html"
echo
echo "  Para ver los cambios:"
echo "    1. Abre clickyclase.cl/admin.html"
echo "    2. Pulsa Ctrl + Shift + R (hard refresh)"
echo "    3. Mira la sidebar: aparece 'Monitoreo en vivo'"
