#!/usr/bin/env bash
# Second terminal for HW labs — leave running while labs use start-here / VS Code.

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
# Listen-only: leftover ROBOTOS_CONNECT can pin the session to localhost
# and block board Wi-Fi zenoh clients.
unset ROBOTOS_CONNECT || true
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x "$OS_BIN/serial-bridge" 2>/dev/null || true

echo
echo " robotos-workshop — serial-bridge (board)"
echo " ----------------------------------------"
echo " Prefer closing the warehouse sim first (avoids port 7447 clash)."
echo " Plug in USB. Leave this window open. Labs: ./scripts/start-here.sh"
echo " If auto skips cu.usbmodem*, pin the [auto] selected path (often /dev/tty.usbmodem*)."
echo " Board Wi-Fi zenoh: wifi-cfg --connect tcp/PC_LAN_IP:7447"
echo

exec serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all \
  --probe-settle-ms 2000 --probe-ms 5000
