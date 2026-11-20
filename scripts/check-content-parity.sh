#!/usr/bin/env bash
# ISC-12: every pre-refactor skill, project and certification still renders,
# same names and same order. Server-renders the real components; this is
# evidence about content, never about layout or appearance.
set -euo pipefail
cd "$(dirname "$0")/.."
bunx vite build --ssr scripts/ssr-render.tsx --outDir .harness/ssr --logLevel error >/dev/null
bun .harness/ssr/ssr-render.js > .harness/rendered.html
/usr/bin/python3 -I scripts/parity.py
