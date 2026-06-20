#!/usr/bin/env bash
# =====================================================================
#  hacer-commits.sh  --  Click&Clase
#  Para correr desde Git Bash (MINGW64).
#  Limpia locks, repara indice y hace los 2 commits pendientes + push.
#
#  Uso (en Git Bash):
#    cd "/c/Users/electronica9/Desktop/Proyectos AVANTI/electrolearn"
#    bash hacer-commits.sh
# =====================================================================

set -e

REPO="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO"

step() {
  echo
  echo "--- $1 ---"
}

# -- 0. Limpiar locks huerfanos ---------------------------------------
step "Paso 0 - Limpiar locks huerfanos"
for l in \
  ".git/index.lock" \
  ".git/HEAD.lock" \
  ".git/refs/heads/main.lock" \
  ".git/worktrees/electrolearn-wt/index.lock" \
  ".git/worktrees/electrolearn-wt/HEAD.lock" \
  ".git/worktrees/electrolearn-wt/locked"
do
  if [ -e "$l" ]; then
    if rm -f "$l" 2>/dev/null; then
      echo "  borrado: $l"
    else
      echo "  no se pudo borrar: $l"
    fi
  fi
done

# Quitar worktree huerfano dejado por el sandbox
if [ -d ".git/worktrees/electrolearn-wt" ]; then
  git worktree remove --force electrolearn-wt 2>/dev/null || true
  rm -rf ".git/worktrees/electrolearn-wt" 2>/dev/null || true
  echo "  worktree huerfano eliminado"
fi

# -- 1. Reparar indice corrupto ---------------------------------------
step "Paso 1 - Reparar indice (git reset --mixed HEAD)"
git reset --mixed HEAD

files=$(git ls-files | wc -l)
echo "  archivos en indice: $files"
if [ "$files" -lt 50 ]; then
  echo "ERROR: indice vacio o muy chico. Abortando."
  exit 1
fi

step "Paso 2 - Estado actual"
git status --short | head -30

# -- 3. Commit 1 - Especialidades TP + Mencion ------------------------
step "Paso 3 - Commit 1: especialidades TP + selectores de Mencion"

COMMIT1_FILES=(
  ".gitignore"
  "js/curricula-chile.js"
  "js/firebase-auth.js"
  "js/curricula/plan-comun/artes.js"
  "js/curricula/plan-comun/ciencias.js"
  "js/curricula/plan-comun/ed-fisica.js"
  "js/curricula/plan-comun/historia.js"
  "js/curricula/tp/datos-administracion.js"
  "js/curricula/tp/datos-construccion.js"
  "js/curricula/tp/datos-contabilidad.js"
  "js/curricula/tp/datos-mecanica-industrial.js"
  "js/curricula/tp/datos-acuicultura.js"
  "js/curricula/tp/datos-agropecuaria.js"
  "js/curricula/tp/datos-asistencia-geologia.js"
  "js/curricula/tp/datos-atencion-adulto-mayor.js"
  "js/curricula/tp/datos-atencion-enfermeria.js"
  "js/curricula/tp/datos-atencion-parvulos.js"
  "js/curricula/tp/datos-conectividad-redes.js"
  "js/curricula/tp/datos-construcciones-metalicas.js"
  "js/curricula/tp/datos-dibujo-tecnico.js"
  "js/curricula/tp/datos-edificacion.js"
  "js/curricula/tp/datos-elaboracion-alimentos.js"
  "js/curricula/tp/datos-explotacion-minera.js"
  "js/curricula/tp/datos-forestal.js"
  "js/curricula/tp/datos-gastronomia.js"
  "js/curricula/tp/datos-instalaciones-sanitarias.js"
  "js/curricula/tp/datos-logistica.js"
  "js/curricula/tp/datos-mantenimiento-aeronaves.js"
  "js/curricula/tp/datos-metalurgia-extractiva.js"
  "js/curricula/tp/datos-montaje-industrial.js"
  "js/curricula/tp/datos-muebles-madera.js"
  "js/curricula/tp/datos-operacion-plantas-quimicas.js"
  "js/curricula/tp/datos-operacion-portuaria.js"
  "js/curricula/tp/datos-pesqueria.js"
  "js/curricula/tp/datos-productos-madera.js"
  "js/curricula/tp/datos-programacion.js"
  "js/curricula/tp/datos-quimica-industrial.js"
  "js/curricula/tp/datos-refrigeracion-climatizacion.js"
  "js/curricula/tp/datos-secretariado.js"
  "js/curricula/tp/datos-servicios-hoteleros.js"
  "js/curricula/tp/datos-servicios-turismo.js"
  "js/curricula/tp/datos-tejido.js"
  "js/curricula/tp/datos-telecomunicaciones.js"
  "js/curricula/tp/datos-terminaciones-construccion.js"
  "js/curricula/tp/datos-tripulacion-naves.js"
  "js/curricula/tp/datos-vestuario-confeccion.js"
  "planificacion.html"
  "material.html"
)

EXISTING=()
for f in "${COMMIT1_FILES[@]}"; do
  if [ -e "$f" ]; then
    EXISTING+=("$f")
  else
    echo "  no encontrado, se omite: $f"
  fi
done

git add -- "${EXISTING[@]}"

git commit -m "feat(curricula+tp): 33 especialidades TP cargadas y selectores de Mencion

Click&Clase pasa de cubrir solo Plan Comun a tener el curriculo TP
chileno completo: se cargan 27 especialidades nuevas con sus modulos
y aprendizajes esperados oficiales del Mineduc, y se amplian las 4 ya
existentes (Administracion, Construccion, Contabilidad, Mecanica
Industrial) con sus menciones reales.

Cambios:
- 27 archivos js/curricula/tp/datos-*.js nuevos (catalogos JSON con
  modulos + OAs por especialidad).
- Re-escritura de js/curricula-chile.js como registro central.
- js/firebase-auth.js: campos 'mencion' y 'formatoSIMCE' en el perfil.
- planificacion.html y material.html: selector de Mencion que aparece
  solo cuando la especialidad TP elegida lo tiene, con pre-seleccion
  desde el perfil del profesor.
- Ajustes menores en plan-comun (artes, ciencias, ed-fisica, historia).
- .gitignore: ignora 'nul' (artefacto Windows)."

echo "  OK - Commit 1 listo"

# -- 4. Commit 2 - Libro de clases + Comunicados ----------------------
step "Paso 4 - Commit 2: libro de clases (comunicados, nomina, notas, asistencia)"

COMMIT2_FILES=(
  "firestore.rules"
  "listas-curso.html"
  "admin.html"
  "dashboard-profesor.html"
  "index.html"
)

EXISTING2=()
for f in "${COMMIT2_FILES[@]}"; do
  if [ -e "$f" ]; then
    EXISTING2+=("$f")
  fi
done

git add -- "${EXISTING2[@]}"

git commit -m "feat(libro-clases): comunicados + nomina + notas + asistencia diaria

Cierra el ciclo del docente: planificar -> crear material -> registrar
notas y asistencia, en una sola plataforma.

Reglas Firestore (firestore.rules):
- anuncios: admin escribe, autenticados leen.
- listas_curso, notas_curso, asistencia_curso: doc por profesorUid;
  solo dueno o admin lee/edita.
- Default-deny final intacto.

Nuevo modulo: listas-curso.html (libro de clases por curso)
- Tabs Nomina / Notas / Estadisticas / Asistencia.
- Nomina: importa Excel (detecta columnas Nombre y RUT), carga manual.
- Notas: 1.0 a 7.0, Enter para saltar al siguiente, dos promedios
  (aproximado y exacto), division por semestres.
- Estadisticas: aprobados/reprobados, distribucion, graficos Chart.js.
- Asistencia: 4 estados (P/A/T/J), boton 'Todos presentes',
  porcentaje automatico por estudiante.

Dashboard profesor (dashboard-profesor.html):
- Panel Avisos con badge de no-leidos.
- Mensaje de bienvenida en el primer ingreso.
- Tarjeta Libro de clases que enlaza a listas-curso.html.
- Engancha los 27 nuevos scripts datos-*.js para que las especialidades
  TP esten disponibles.

Admin (admin.html):
- Seccion Comunicados con CRUD completo de anuncios.
- Selector de mencion en formularios de profesor.

index.html: ajustes menores de la landing."

echo "  OK - Commit 2 listo"

# -- 5. Resumen pre-push ----------------------------------------------
step "Paso 5 - Resumen antes de empujar"
git log --oneline origin/main..HEAD

# -- 6. Push ----------------------------------------------------------
step "Paso 6 - git push origin main"
git push origin main
echo
echo "OK - TODO LISTO - los dos commits estan en origin/main"
