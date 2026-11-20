#!/usr/bin/env bash
# ISC-11: no skill, project or certification literal survives inside a component.
set -euo pipefail
cd "$(dirname "$0")/.."
# One representative literal per content type, taken from the captured baseline.
needles=('Kubernetes' 'Elasticdump GUI' 'AWS Certified Solutions Architect' 'complete-pipeline-jenkins')
fail=0
for needle in "${needles[@]}"; do
  if hits=$(grep -rln -- "$needle" src/components src/pages 2>/dev/null); then
    echo "FAIL: content literal '$needle' still in: $hits"
    fail=1
  fi
done
[ $fail -eq 0 ] && echo "PASS: no content literals in src/components or src/pages"
exit $fail
