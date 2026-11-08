#!/usr/bin/env bash
# Local companion for interactive docs (terminals + Live). Leave running while using the site.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -d "$ROOT/code/robotos-v0.3.0-macos-arm64/bin" ]]; then
  OS_BIN="$ROOT/code/robotos-v0.3.0-macos-arm64/bin"
elif [[ -d "$ROOT/code/robotos-v0.3.0-linux-x64/bin" ]]; then
  OS_BIN="$ROOT/code/robotos-v0.3.0-linux-x64/bin"
else
  echo "Missing code/robotos-v0.3.0-*/bin"
  exit 1
fi

export PATH="$OS_BIN:$PATH"
chmod +x "$OS_BIN/workshop-host" 2>/dev/null || true

if ! command -v workshop-host >/dev/null 2>&1; then
  echo "docs companion (workshop-host) is not in this pack."
  echo "Docs still work Copy-only: https://drsanti.github.io/robotos-workshop-docs/"
  echo "Ask your instructor if you need Connect / Run."
  exit 1
fi

echo
echo " robotos-workshop — docs companion"
echo " --------------------------------"
echo " Leave this window open."
echo " Look for the yellow Bearer token in the cyan box (once, after startup)."
echo " Site: https://drsanti.github.io/robotos-workshop-docs/"
echo " Labs/bridge: start-here / start-bridge as usual."
echo
echo " Binary: workshop-host (local helper for Connect / Run / Live)"
echo

HOST_PORT=7420
if command -v lsof >/dev/null 2>&1; then
  BUSY="$(lsof -nP -iTCP:"$HOST_PORT" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$BUSY" ]]; then
    echo "error: port $HOST_PORT is already in use (docs companion needs it)." >&2
    echo "$BUSY" >&2
    echo >&2
    echo "  robotos-studio uses :7421 — if you see studio-host above, stop Studio's host" >&2
    echo "  (Ctrl+C in that terminal) or: kill \$(lsof -t -iTCP:$HOST_PORT -sTCP:LISTEN)" >&2
    echo "  Then run ./scripts/start-host.sh again." >&2
    exit 1
  fi
fi

# Quiet Zenoh so the token banner stays readable (scout WARN is noise for class).
export RUST_LOG="${RUST_LOG:-workshop_host=info,robotos=warn,zenoh=error}"

exec workshop-host \
  --workshop-root "$ROOT" \
  --api-only \
  --docs-origin "https://drsanti.github.io/robotos-workshop-docs"
