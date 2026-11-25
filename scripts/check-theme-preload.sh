#!/usr/bin/env bash
# ISC-14: the theme is set on <html> by an inline script before the app bundle loads.
set -euo pipefail
cd "$(dirname "$0")/.."
target="${1:-index.html}"
inline=$(grep -n 'documentElement.dataset.theme' "$target" | head -1 | cut -d: -f1 || true)
bundle=$(grep -nE '<script[^>]+type="module"' "$target" | head -1 | cut -d: -f1 || true)
[ -n "$inline" ] || { echo "FAIL: no inline theme script in $target"; exit 1; }
[ -n "$bundle" ] || { echo "FAIL: no module script in $target"; exit 1; }
[ "$inline" -lt "$bundle" ] || { echo "FAIL: theme script (line $inline) does not precede the bundle (line $bundle)"; exit 1; }
echo "PASS: $target sets the theme at line $inline, before the bundle at line $bundle"
