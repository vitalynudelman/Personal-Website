#!/usr/bin/env bash
# Stop only the dev server this harness started.
set -euo pipefail
cd "$(dirname "$0")/.."
pidfile=.harness/dev.pid
[ -f "$pidfile" ] || { echo "no dev server recorded"; exit 0; }
pid=$(cat "$pidfile")
if kill -0 "$pid" 2>/dev/null; then
  kill "$pid"
  echo "stopped dev server (pid $pid)"
else
  echo "dev server (pid $pid) already gone"
fi
rm -f "$pidfile"
