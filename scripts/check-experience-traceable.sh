#!/usr/bin/env bash
# ISC-30: every role, date range and bullet in the Experience section appears
# in the resume the site serves, so the two surfaces cannot tell different
# stories. The site may say less than the CV; it may never say more.
set -euo pipefail
cd "$(dirname "$0")/.."

reference="${RESUME_SOURCE_DOCX:-$HOME/projects/life/Resume/resume_softwaredev/Vitaly_Nudelman_Resume_SWDev_FullCycle_v12.docx}"
if [ ! -f "$reference" ]; then
  echo "SKIP: source CV not reachable at $reference (set RESUME_SOURCE_DOCX)"
  exit 2
fi

mkdir -p .harness
textutil -convert txt -stdout "$reference" > .harness/resume.txt
/usr/bin/python3 -I scripts/traceable.py
