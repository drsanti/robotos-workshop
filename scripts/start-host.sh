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
  echo "workshop-host is not in this pack."
  echo "Docs still work Copy-only: https://drsanti.github.io/robotos-workshop-docs/"
  echo "Ask your instructor if you need Connect / Run."
  exit 1
fi

echo
echo " robotos-workshop — workshop-host (interactive docs)"
echo " -------------------------------------------------"
echo " Leave this window open."
echo " Look for the yellow Bearer token in the cyan box below"
echo " (printed again after Zenoh settles)."
echo " Site: https://drsanti.github.io/robotos-workshop-docs/"
echo " Labs/bridge: start-here / start-bridge as usual."
echo

# Quiet Zenoh so the token banner stays readable.
export RUST_LOG="${RUST_LOG:-workshop_host=info,robotos=warn,zenoh=warn}"

exec workshop-host \
  --workshop-root "$ROOT" \
  --api-only \
  --docs-origin "https://drsanti.github.io/robotos-workshop-docs"
