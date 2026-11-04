#!/usr/bin/env bash
# macOS / Linux — from workshop root:
#   chmod +x scripts/start-here.sh && ./scripts/start-here.sh
# Or double-click scripts/start-here.command on macOS.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -d "$ROOT/code/robotos-v0.3.0-macos-arm64/bin" ]]; then
  OS_BIN="$ROOT/code/robotos-v0.3.0-macos-arm64/bin"
  WHEEL=( "$ROOT"/code/robotos-0.3.0-py3-none-any.whl )
  SIM_APP="$ROOT/code/robotos-sim-v0.1.0-macos-arm64/robotos-sim.app"
elif [[ -d "$ROOT/code/robotos-v0.3.0-linux-x64/bin" ]]; then
  OS_BIN="$ROOT/code/robotos-v0.3.0-linux-x64/bin"
  WHEEL=( "$ROOT"/code/robotos-0.3.0-*-manylinux*.whl )
  SIM_APP=""
else
  echo "Missing code/robotos-v0.3.0-*/bin — unzip the full workshop pack."
  exit 1
fi

export PATH="$OS_BIN:$PATH"
chmod +x "$OS_BIN"/* 2>/dev/null || true

echo
echo " robotos-workshop"
echo " ----------------"
echo " PATH set for this shell only. Run ./scripts/start-here.sh again in a new terminal."
echo

if [[ ! -x .venv/bin/python ]]; then
  echo " First time: creating .venv and installing wheel ..."
  python3 -m venv .venv
  # shellcheck disable=SC1091
  source .venv/bin/activate
  python -m pip install -U pip
  python -m pip install "${WHEEL[0]}"
  echo " .venv ready."
  echo
else
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

if [[ -d "$SIM_APP" ]]; then
  echo " Starting warehouse sim ..."
  open "$SIM_APP" || true
  echo
fi

echo " Quick checks:"
echo "   robotos version"
echo "   robotos topic list"
echo
echo " Example:"
echo "   ./scripts/run wh-01"
echo
echo " Board labs: ./scripts/start-bridge.sh in a second Terminal."
echo " Full guide: SETUP.md"
echo

exec "$SHELL"
