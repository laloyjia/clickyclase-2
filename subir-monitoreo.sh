#!/usr/bin/env bash
# =====================================================================
#  subir-monitoreo.sh  --  Click&Clase
#  Commit + push del sistema de Monitoreo en vivo.
#
#  Uso (en Git Bash):
#    cd "/c/Users/electronica9/Desktop/Proyectos AVANTI/electrolearn"
#    bash subir-monitoreo.sh
# =====================================================================

set -e

REPO="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO"

step() {
  echo
  echo "--- $1 ---"
}

# -- 0. Limpiar locks huerfanos (por las dudas) -----------------------
step "Paso 0 - Limpiar locks huerfanos"
for l in ".git/index.lock" ".git/HEAD.lock" ".git/refs/heads/main.lock"; do
  if [ -e "$l" ]; then
    rm -f "$l" 2>/dev/null && echo "  borrado: $l" || echo "  no se pudo borrar: $l"
  fi
done

# -- 1. Estado actual --------------------------------------------------
step "Paso 1 - Estado actual"
git status --short | head -30

# -- 2. Stage archivos del feature ------------------------------------
step "Paso 2 - Stage archivos del Monitoreo"

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
  else
    echo "  no encontrado, se omite: $f"
  fi
done

git add -- "${EXISTING[@]}"

# -- 3. Commit --------------------------------------------------------
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
  + Feed de eventos con badges de color por tipo (login, generar, guardar,
    descargar, admin) y filtro por categoria.
  + Heartbeat tambien activo en admin para que el admin aparezca online.

- js/firebase-db.js
  Agrega 4 tipos al diccionario ACTIVIDAD_TIPOS: guardar_nomina,
  guardar_notas, guardar_asistencia, refinar_material_ia.

- listas-curso.html
  + Heartbeat con label 'Libro de clases'.
  + logEvent al guardar nomina, notas y asistencia.

- material.html, planificacion.html, dashboard-profesor.html,
  biblioteca.html, evaluaciones.html
  + Heartbeat con su label correspondiente. Los logEvents de
    'generar_material_ia', 'crear_planificacion', etc., ya existian.

Notas:
- No se modifican las firestore.rules: lastSeen/currentPage no estan en
  la lista de campos protegidos, asi que el dueno ya puede actualizarlos.
- onSnapshot del proyecto es polling REST cada 8 s, no streaming real;
  suficiente para monitoreo, mas barato en cuota."

echo "  OK - Commit listo"

# -- 4. Resumen pre-push ----------------------------------------------
step "Paso 4 - Resumen antes de empujar"
git log --oneline origin/main..HEAD

# -- 5. Push ----------------------------------------------------------
step "Paso 5 - git push origin main"
git push origin main
echo
echo "OK - TODO LISTO - Monitoreo en vivo subido a origin/main"
