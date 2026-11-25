#!/usr/bin/env bash
# ISC-26: dependencies install before application source is copied.
set -euo pipefail
cd "$(dirname "$0")/.."
install_line=$(grep -n '^RUN bun install' Dockerfile | head -1 | cut -d: -f1 || true)
source_line=$(grep -n '^COPY \. \.' Dockerfile | head -1 | cut -d: -f1 || true)
manifest_line=$(grep -n '^COPY package.json bun.lock' Dockerfile | head -1 | cut -d: -f1 || true)
for v in manifest_line install_line source_line; do
  [ -n "${!v}" ] || { echo "FAIL: Dockerfile has no $v step"; exit 1; }
done
[ "$manifest_line" -lt "$install_line" ] && [ "$install_line" -lt "$source_line" ] || {
  echo "FAIL: order is manifest=$manifest_line install=$install_line source=$source_line"; exit 1; }
echo "PASS: manifest ($manifest_line) -> install ($install_line) -> source ($source_line)"
