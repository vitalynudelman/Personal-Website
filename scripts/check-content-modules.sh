#!/usr/bin/env bash
# ISC-10: content modules exist and each exports a typed array.
set -euo pipefail
cd "$(dirname "$0")/.."
fail=0
check() {
  local file="src/content/$1.ts" sym="$2" iface="$3"
  [ -f "$file" ] || { echo "FAIL: $file missing"; fail=1; return; }
  grep -qE "^export const $sym: ${iface}\[\] = \[" "$file" || { echo "FAIL: $file has no 'export const $sym: ${iface}[]'"; fail=1; return; }
  grep -qE "^export interface $iface \{" "$file" || { echo "FAIL: $file has no 'export interface $iface'"; fail=1; return; }
  echo "PASS: $file exports $sym: ${iface}[]"
}
check skills skills Skill
check experience experience Role
check certifications certifications Certification
exit $fail
