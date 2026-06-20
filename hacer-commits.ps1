# ====================================================================
#  hacer-commits.ps1 - Click&Clase
#  Limpia locks, repara indice y crea los 2 commits pendientes + push.
#  Ejecutar desde PowerShell (no como Admin) parado en la carpeta del repo.
#
#  Uso:
#    cd "C:\Users\electronica9\Desktop\Proyectos AVANTI\electrolearn"
#    powershell -ExecutionPolicy Bypass -File .\hacer-commits.ps1
# ====================================================================

$ErrorActionPreference = 'Stop'

function Write-Step {
  param([string]$msg, [string]$color = 'Cyan')
  Write-Host ""
  Write-Host "--- $msg ---" -ForegroundColor $color
}

# Estar parado en la raiz del repo
$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $repo
Write-Host "Repo: $repo" -ForegroundColor DarkGray

# Autodetectar git si no esta en PATH
function Find-Git {
  $cmd = Get-Command git -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Path }
  $candidatos = @(
    'C:\Program Files\Git\cmd\git.exe',
    'C:\Program Files\Git\bin\git.exe',
    'C:\Program Files (x86)\Git\cmd\git.exe',
    'C:\Program Files (x86)\Git\bin\git.exe',
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe",
    "$env:USERPROFILE\AppData\Local\Programs\Git\cmd\git.exe"
  )
  foreach ($p in $candidatos) { if (Test-Path $p) { return $p } }
  # Buscar GitHub Desktop
  $ghd = Get-ChildItem "$env:LOCALAPPDATA\GitHubDesktop\app-*\resources\app\git\cmd\git.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($ghd) { return $ghd.FullName }
  return $null
}

$gitExe = Find-Git
if (-not $gitExe) {
  throw "No encuentro git.exe. Instala Git for Windows desde https://git-scm.com/download/win y vuelve a correr el script."
}
Write-Host "Git: $gitExe" -ForegroundColor DarkGray

# Agregar la carpeta de git al PATH de esta sesion para que sub-comandos lo vean
$env:PATH = "$([System.IO.Path]::GetDirectoryName($gitExe));$env:PATH"

# -- 0. Limpiar locks huerfanos ---------------------------------------
Write-Step 'Paso 0 - Limpiar locks huerfanos de .git'
$locks = @(
  '.git\index.lock',
  '.git\HEAD.lock',
  '.git\refs\heads\main.lock',
  '.git\worktrees\electrolearn-wt\index.lock',
  '.git\worktrees\electrolearn-wt\HEAD.lock',
  '.git\worktrees\electrolearn-wt\locked'
)
foreach ($l in $locks) {
  if (Test-Path $l) {
    try { Remove-Item -Force $l; Write-Host "  borrado: $l" -ForegroundColor Yellow }
    catch { Write-Host "  no se pudo borrar: $l ($_)" -ForegroundColor Red }
  }
}

# Quitar el worktree huerfano que el sandbox dejo tirado
if (Test-Path '.git\worktrees\electrolearn-wt') {
  try {
    git worktree remove --force electrolearn-wt 2>$null
    if (Test-Path '.git\worktrees\electrolearn-wt') {
      Remove-Item -Recurse -Force '.git\worktrees\electrolearn-wt'
    }
    Write-Host "  worktree huerfano eliminado" -ForegroundColor Yellow
  } catch { Write-Host "  worktree no removible: $_" -ForegroundColor Red }
}

# -- 1. Reparar indice corrupto ---------------------------------------
Write-Step 'Paso 1 - Reparar indice (git reset --mixed HEAD)'
git reset --mixed HEAD
if ($LASTEXITCODE -ne 0) { throw "git reset fallo - abortando." }

# Verificar que git ve los archivos del repo
$files = (git ls-files | Measure-Object).Count
Write-Host "  archivos en indice: $files" -ForegroundColor Green
if ($files -lt 50) { throw "Indice vacio o muy chico - algo esta mal, abortando." }

# Mostrar resumen breve
Write-Step 'Paso 2 - Estado actual'
git status --short | Select-Object -First 30

# -- 3. Commit 1 - Especialidades TP + Mencion ------------------------
Write-Step 'Paso 3 - Commit 1: especialidades TP + selectores de Mencion'

$commit1Files = @(
  '.gitignore',
  'js\curricula-chile.js',
  'js\firebase-auth.js',
  'js\curricula\plan-comun\artes.js',
  'js\curricula\plan-comun\ciencias.js',
  'js\curricula\plan-comun\ed-fisica.js',
  'js\curricula\plan-comun\historia.js',
  'js\curricula\tp\datos-administracion.js',
  'js\curricula\tp\datos-construccion.js',
  'js\curricula\tp\datos-contabilidad.js',
  'js\curricula\tp\datos-mecanica-industrial.js',
  'js\curricula\tp\datos-acuicultura.js',
  'js\curricula\tp\datos-agropecuaria.js',
  'js\curricula\tp\datos-asistencia-geologia.js',
  'js\curricula\tp\datos-atencion-adulto-mayor.js',
  'js\curricula\tp\datos-atencion-enfermeria.js',
  'js\curricula\tp\datos-atencion-parvulos.js',
  'js\curricula\tp\datos-conectividad-redes.js',
  'js\curricula\tp\datos-construcciones-metalicas.js',
  'js\curricula\tp\datos-dibujo-tecnico.js',
  'js\curricula\tp\datos-edificacion.js',
  'js\curricula\tp\datos-elaboracion-alimentos.js',
  'js\curricula\tp\datos-explotacion-minera.js',
  'js\curricula\tp\datos-forestal.js',
  'js\curricula\tp\datos-gastronomia.js',
  'js\curricula\tp\datos-instalaciones-sanitarias.js',
  'js\curricula\tp\datos-logistica.js',
  'js\curricula\tp\datos-mantenimiento-aeronaves.js',
  'js\curricula\tp\datos-metalurgia-extractiva.js',
  'js\curricula\tp\datos-montaje-industrial.js',
  'js\curricula\tp\datos-muebles-madera.js',
  'js\curricula\tp\datos-operacion-plantas-quimicas.js',
  'js\curricula\tp\datos-operacion-portuaria.js',
  'js\curricula\tp\datos-pesqueria.js',
  'js\curricula\tp\datos-productos-madera.js',
  'js\curricula\tp\datos-programacion.js',
  'js\curricula\tp\datos-quimica-industrial.js',
  'js\curricula\tp\datos-refrigeracion-climatizacion.js',
  'js\curricula\tp\datos-secretariado.js',
  'js\curricula\tp\datos-servicios-hoteleros.js',
  'js\curricula\tp\datos-servicios-turismo.js',
  'js\curricula\tp\datos-tejido.js',
  'js\curricula\tp\datos-telecomunicaciones.js',
  'js\curricula\tp\datos-terminaciones-construccion.js',
  'js\curricula\tp\datos-tripulacion-naves.js',
  'js\curricula\tp\datos-vestuario-confeccion.js',
  'planificacion.html',
  'material.html'
)

# Filtrar solo los que existen
$existing = $commit1Files | Where-Object { Test-Path (Join-Path $repo $_) }
$missing  = $commit1Files | Where-Object { -not (Test-Path (Join-Path $repo $_)) }
if ($missing) {
  Write-Host "  Archivos no encontrados (se omiten):" -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
}

git add -- $existing
if ($LASTEXITCODE -ne 0) { throw "git add commit 1 fallo." }

$msg1 = @"
feat(curricula+tp): 33 especialidades TP cargadas y selectores de Mencion

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
- .gitignore: ignora 'nul' (artefacto Windows).
"@

git commit -m $msg1
if ($LASTEXITCODE -ne 0) { throw "git commit 1 fallo." }
Write-Host "  OK - Commit 1 listo" -ForegroundColor Green

# -- 4. Commit 2 - Libro de clases + Comunicados ----------------------
Write-Step 'Paso 4 - Commit 2: libro de clases (comunicados, nomina, notas, asistencia)'

$commit2Files = @(
  'firestore.rules',
  'listas-curso.html',
  'admin.html',
  'dashboard-profesor.html',
  'index.html'
)
$existing2 = $commit2Files | Where-Object { Test-Path (Join-Path $repo $_) }
git add -- $existing2
if ($LASTEXITCODE -ne 0) { throw "git add commit 2 fallo." }

$msg2 = @"
feat(libro-clases): comunicados + nomina + notas + asistencia diaria

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

index.html: ajustes menores de la landing.
"@

git commit -m $msg2
if ($LASTEXITCODE -ne 0) { throw "git commit 2 fallo." }
Write-Host "  OK - Commit 2 listo" -ForegroundColor Green

# -- 5. Resumen pre-push ----------------------------------------------
Write-Step 'Paso 5 - Resumen antes de empujar'
git log --oneline origin/main..HEAD
Write-Host ""

# -- 6. Push ----------------------------------------------------------
Write-Step 'Paso 6 - git push origin main'
git push origin main
if ($LASTEXITCODE -ne 0) { throw "git push fallo - revisa credenciales y vuelve a correr solo: git push origin main" }
Write-Host ""
Write-Host "OK - TODO LISTO - los dos commits estan en origin/main" -ForegroundColor Green
