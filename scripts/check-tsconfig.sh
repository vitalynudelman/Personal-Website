#!/usr/bin/env bash
# ISC-8: tsconfig targets a modern ES version in strict mode.
set -euo pipefail
cd "$(dirname "$0")/.."
target=$(grep -oE '"target"[[:space:]]*:[[:space:]]*"[^"]+"' tsconfig.json | grep -oE '"[^"]+"$' | tr -d '"')
strict=$(grep -oE '"strict"[[:space:]]*:[[:space:]]*(true|false)' tsconfig.json | grep -oE '(true|false)$')
case "$target" in
  ES2022|ES2023|ES2024|ESNext) ;;
  *) echo "FAIL: target is '$target', expected ES2022 or later"; exit 1 ;;
esac
[ "$strict" = "true" ] || { echo "FAIL: strict is '$strict'"; exit 1; }
echo "PASS: target=$target strict=$strict"
