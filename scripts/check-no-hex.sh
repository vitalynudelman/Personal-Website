#!/usr/bin/env bash
# ISC-20: no raw colour literal lives anywhere under src/ except the token file.
set -euo pipefail
cd "$(dirname "$0")/.."
hits=$(grep -rnE '#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(' src \
        --include='*.css' --include='*.ts' --include='*.tsx' \
        | grep -v '^src/styles/tokens.css:' \
        | grep -vE '#[0-9a-fA-F]*[g-zG-Z]' || true)
if [ -n "$hits" ]; then
  echo "FAIL: colour literals outside tokens.css:"
  echo "$hits"
  exit 1
fi
echo "PASS: every colour under src/ comes from tokens.css"
