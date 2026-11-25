#!/usr/bin/env bash
# ISC-24: the served resume is byte-identical to the designated source CV.
set -euo pipefail
cd "$(dirname "$0")/.."
served=public/resume/resume.pdf
reference="${RESUME_SOURCE:-$HOME/projects/life/Resume/resume_softwaredev/Vitaly_Nudelman_Resume_SWDev_FullCycle_v12.pdf}"
[ -f "$served" ] || { echo "FAIL: $served is missing"; exit 1; }
if [ ! -f "$reference" ]; then
  echo "SKIP: reference CV not reachable at $reference (set RESUME_SOURCE)"
  exit 2
fi
a=$(shasum -a 256 "$served" | cut -d' ' -f1)
b=$(shasum -a 256 "$reference" | cut -d' ' -f1)
[ "$a" = "$b" ] || { echo "FAIL: served $a != reference $b"; exit 1; }
echo "PASS: served resume matches the reference CV ($a)"
