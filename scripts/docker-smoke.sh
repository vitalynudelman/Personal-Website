#!/usr/bin/env bash
# ISC-25: the image builds and the container serves the site.
set -euo pipefail
cd "$(dirname "$0")/.."
tag=personal-website:smoke
name=personal-website-smoke
port=${SMOKE_PORT:-8099}

cleanup() { docker rm -f "$name" >/dev/null 2>&1 || true; }
trap cleanup EXIT

docker build -t "$tag" . >/dev/null
cleanup
docker run -d --name "$name" -p "$port:80" "$tag" >/dev/null

for _ in $(seq 1 20); do
  if curl -sfI "http://localhost:$port/" >/dev/null 2>&1; then break; fi
  sleep 0.5
done

headers=$(curl -sfI "http://localhost:$port/")
echo "$headers" | grep -qi 'content-type: text/html' || { echo "FAIL: / is not text/html"; echo "$headers"; exit 1; }
curl -sfI "http://localhost:$port/resume/resume.pdf" | grep -qi 'application/pdf' || { echo "FAIL: resume not served as PDF"; exit 1; }
curl -sfI "http://localhost:$port/assets/" >/dev/null 2>&1 || true
echo "PASS: image builds, / returns text/html, resume returns application/pdf"
