#!/usr/bin/env bash
# ISC-29: a flex item defaults to min-width:auto and refuses to shrink below
# its own text, which is how "Elasticsearch" escaped its skill chip. Any flex
# row that holds a variable-length label must declare min-width:0 on it.
#
# Variable-length labels are the ones rendered from src/content/, so this
# checks the component stylesheets that pair a flex row with content data.
set -euo pipefail
cd "$(dirname "$0")/.."

fail=0
for component in Skills Certifications Contact; do
  css=$(find "src/components/$component" -name '*.module.css' 2>/dev/null | head -1)
  [ -n "$css" ] || { echo "FAIL: no stylesheet for $component"; fail=1; continue; }
  if ! grep -q 'display: flex' "$css"; then
    echo "SKIP: $component has no flex row"
    continue
  fi
  if grep -q 'min-width: 0' "$css"; then
    echo "PASS: $css guards its label with min-width: 0"
  else
    echo "FAIL: $css has a flex row but no min-width: 0 guard on its label"
    fail=1
  fi
done

exit $fail
