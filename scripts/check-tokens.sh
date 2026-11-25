#!/usr/bin/env bash
# ISC-18: the token file defines both themes and the four token families.
set -euo pipefail
cd "$(dirname "$0")/.."
f=src/styles/tokens.css
[ -f "$f" ] || { echo "FAIL: $f missing"; exit 1; }
fail=0
for probe in ':root' '\[data-theme=.dark.\]' '--space-4:' '--text-base:' '--radius-md:' '--accent:' '--bg:'; do
  grep -qE -- "$probe" "$f" || { echo "FAIL: $f has no $probe"; fail=1; }
done
[ $fail -eq 0 ] && echo "PASS: $f defines both themes and the colour, space, type and radius families"
exit $fail
