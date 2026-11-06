#!/usr/bin/env bash
# Serve the offline interactive docs from this pack (correct web root).
# Port 5510 — avoid 5500 (Cursor/VS Code Live Preview default = workspace root).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/online-docs"
if [[ ! -f index.html ]]; then
  echo "online-docs/index.html missing from this pack."
  echo "Use https://drsanti.github.io/robotos-workshop-docs/ or ask your instructor."
  exit 1
fi
echo
echo " Offline docs - http://127.0.0.1:5510/#/setup"
echo " Serving: $PWD"
echo " Leave this window open. Ctrl+C to stop."
echo " (Not port 5500 - that is often Live Preview on the wrong folder.)"
echo
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server 5510
fi
if command -v python >/dev/null 2>&1; then
  exec python -m http.server 5510
fi
exec npx --yes serve . -p 5510
