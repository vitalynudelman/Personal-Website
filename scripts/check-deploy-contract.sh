#!/usr/bin/env bash
# ISC-27: image tags, registry login and the SSH deploy step are unchanged from main.
set -euo pipefail
cd "$(dirname "$0")/.."
base="${1:-origin/main}"
wf=.github/workflows/deploy.yaml
pattern='personal-website:|docker/login-action|docker/build-push-action|appleboy/ssh-action|docker compose|peter-evans/create-pull-request|gh pr merge'
changed=$(git diff "$base" -- "$wf" | grep -E "^[-+]" | grep -vE '^(\+\+\+|---)' | grep -E "$pattern" || true)
if [ -n "$changed" ]; then
  echo "FAIL: deploy-contract lines changed vs $base:"
  echo "$changed"
  exit 1
fi
echo "PASS: no tag, login, build-push, PR or deploy line differs from $base"
