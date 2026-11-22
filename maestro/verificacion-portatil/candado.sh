#!/usr/bin/env bash
# Candado de verificación: falla si alguna carpeta de video no tiene verificacion.md cuya ÚLTIMA línea con texto sea
# "VEREDICTO: APROBADO", o si el archivo todavía tiene una fila con ❌ o ⚠️ en la ronda final.
# Uso: bash candado.sh <carpeta-de-video> [<otra> ...]
# Exentos (videos viejos sin verificar): una clave por línea en el archivo de $EXENTOS (por defecto, exentos.txt junto a este script).
set -u
AQUI=$(cd "$(dirname "$0")" && pwd)
EXENTOS=${EXENTOS:-$AQUI/exentos.txt}
MAL=0
[ $# -gt 0 ] || { echo "Uso: bash candado.sh <carpeta-de-video> [...]"; exit 2; }
for d in "$@"; do
  d=${d%/}; k=$(basename "$d")
  if [ -f "$EXENTOS" ] && grep -qxF "$k" "$EXENTOS"; then echo "· $k: exento"; continue; fi
  f="$d/verificacion.md"
  if [ ! -f "$f" ]; then echo "✗ $k: falta verificacion.md"; MAL=1; continue; fi
  ult=$(grep -v '^[[:space:]]*$' "$f" | tail -n 1 | tr -d '\r' | sed 's/[[:space:]]*$//')
  if [ "$ult" != "VEREDICTO: APROBADO" ]; then
    echo "✗ $k: la última línea de verificacion.md no es «VEREDICTO: APROBADO»"; MAL=1; continue
  fi
  # La ronda final (desde el último encabezado «## ») no puede tener filas con ❌ o ⚠️ como veredicto.
  final=$(awk '/^## /{buf=""} {buf=buf $0 "\n"} END{printf "%s", buf}' "$f")
  if printf '%s' "$final" | grep -E '^\|' | awk -F'|' 'NF>4 {print $4}' | grep -qE '❌|⚠️'; then
    echo "✗ $k: la ronda final todavía tiene ❌ o ⚠️"; MAL=1; continue
  fi
  echo "✓ $k: aprobado"
done
exit $MAL
