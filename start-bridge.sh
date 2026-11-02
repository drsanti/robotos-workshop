#!/usr/bin/env bash
# Second terminal for HW labs — leave running while labs use start-here.sh.

set -euo pipefail
cd "$(dirname "$0")"

ROOT="$PWD"
if [[ -d "$ROOT/code/robotos-v0.3.0-macos-arm64/bin" ]]; then
  OS_BIN="$ROOT/code/robotos-v0.3.0-macos-arm64/bin"
elif [[ -d "$ROOT/code/robotos-v0.3.0-linux-x64/bin" ]]; then
  OS_BIN="$ROOT/code/robotos-v0.3.0-linux-x64/bin"
else
  echo "Missing code/robotos-v0.3.0-*/bin"
  exit 1
fi

export PATH="$OS_BIN:$PATH"
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x "$OS_BIN/serial-bridge" 2>/dev/null || true

echo
echo " robotos-workshop — serial-bridge (board)"
echo " ----------------------------------------"
echo " Plug in USB. Leave this window open. Labs: ./start-here.sh"
echo " If auto fails: serial-bridge --port /dev/cu.usbmodemXXXX ..."
echo

exec serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all \
  --probe-settle-ms 2000 --probe-ms 5000
