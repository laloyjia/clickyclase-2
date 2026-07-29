#!/bin/bash
# es-chileno.sh — Argentinismos → español chileno.
# Uso:
#   bash scripts/es-chileno.sh            # dry-run: lista archivos afectados
#   bash scripts/es-chileno.sh --commit   # aplica cambios in-place

set -e
COMMIT=""
[ "$1" = "--commit" ] && COMMIT="1"

cd "$(dirname "$0")/.."
ROOT="$PWD"

# Sed script único (más rápido que loop de patrones).
SED_SCRIPT='
s/\bvos\b/tú/g
s/\bsos\b/eres/g
s/\bpodés\b/puedes/g
s/\btenés\b/tienes/g
s/\bquerés\b/quieres/g
s/\bnecesitás\b/necesitas/g
s/\bdebés\b/debes/g
s/\bponés\b/pones/g
s/\bsabés\b/sabes/g
s/\bhacé\b/haz/g
s/\bandá\b/anda/g
s/\bcorré\b/corre/g
s/\bavisame\b/avísame/g
s/\bpegame\b/mándame/g
s/\bdecime\b/dime/g
s/\bcontame\b/cuéntame/g
s/\bdecí\b/di/g
s/\bfijate\b/fíjate/g
s/\bprobá\b/prueba/g
s/\bcliqueá\b/haz clic/g
s/\bclickeá\b/haz clic/g
s/\bmirá\b/mira/g
s/\bborrá\b/borra/g
s/\belegí\b/elige/g
s/\bcopiá\b/copia/g
s/\beditá\b/edita/g
s/\bejecutá\b/ejecuta/g
s/\brevisá\b/revisa/g
s/\bcontinuá\b/continúa/g
s/\bfirmá\b/firma/g
s/\bcreá\b/crea/g
s/\benviá\b/envía/g
s/\bconfirmá\b/confirma/g
s/\bcompartí\b/comparte/g
s/\bdescargá\b/descarga/g
s/\bsubí\b/sube/g
s/\bcerrá\b/cierra/g
s/\babrí\b/abre/g
s/\bagregá\b/agrega/g
s/\basigná\b/asigna/g
s/\bmarcá\b/marca/g
s/\bdejá\b/deja/g
s/\btomá\b/toma/g
s/\bempezá\b/empieza/g
s/\bterminá\b/termina/g
s/\bactualizá\b/actualiza/g
s/\btocá\b/toca/g
s/\bavanzá\b/avanza/g
s/\bordená\b/ordena/g
s/\bguardá\b/guarda/g
s/\brellená\b/rellena/g
'

# Regex OR con todos los términos para detectar rápido
DETECT='\b(vos|sos|podés|tenés|querés|necesitás|debés|ponés|sabés|hacé|andá|corré|avisame|pegame|decime|contame|decí|fijate|probá|cliqueá|clickeá|mirá|borrá|elegí|copiá|editá|ejecutá|revisá|continuá|firmá|creá|enviá|confirmá|compartí|descargá|subí|cerrá|abrí|agregá|asigná|marcá|dejá|tomá|empezá|terminá|actualizá|tocá|avanzá|ordená|guardá|rellená)\b'

echo "▶ Modo: $([ -n "$COMMIT" ] && echo 'COMMIT (aplica)' || echo 'DRY-RUN (solo lista)')"
echo ""

# 1. Detectar archivos afectados con grep. Usar -prune para saltar node_modules
#    ANTES de entrar (mucho más rápido que -not -path).
AFECTADOS=$(find . \( -name "node_modules" -o -name ".git" -o -name "output" \) -prune \
  -o -type f \( -name "*.html" -o -name "*.js" -o -name "*.md" \) -print 2>/dev/null \
  | xargs grep -lE "$DETECT" 2>/dev/null || true)

if [ -z "$AFECTADOS" ]; then
  echo "✓ No hay argentinismos que reemplazar."
  exit 0
fi

N=$(echo "$AFECTADOS" | wc -l)
echo "▶ Archivos afectados: $N"
echo "$AFECTADOS" | sed 's|^\./|   |'
echo ""

if [ -z "$COMMIT" ]; then
  echo "✓ DRY-RUN. Nada se guardó."
  echo "  Aplicar: bash scripts/es-chileno.sh --commit"
  exit 0
fi

# 2. Aplicar sed in-place a los afectados.
echo "▶ Aplicando cambios…"
echo "$AFECTADOS" | while read -r f; do
  [ -z "$f" ] && continue
  sed -i -E "$SED_SCRIPT" "$f"
done
echo "✓ Cambios aplicados en $N archivos."
