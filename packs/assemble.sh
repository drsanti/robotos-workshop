#!/usr/bin/env bash
# Stage a student drop (bash twin of assemble.ps1).
# Example (macos-arm64):
#   ./packs/assemble.sh \
#     --robotos /path/to/robotos-v0.3.0-macos-arm64 \
#     --wheel /path/to/robotos-0.3.0-*-macosx*.whl \
#     --sim /path/to/robotos-sim-v0.1.0-macos-arm64 \
#     --serial-bridge /path/to/serial-bridge \
#     --os-arch macos-arm64 \
#     --out ~/drops/robotos-workshop-macos-arm64

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ROBOTOS=""
WHEEL=""
SIM=""
BRIDGE=""
OUT=""
NOTES=""
OS_ARCH=""

usage() {
  sed -n '2,14p' "$0" | sed 's/^# \?//'
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --robotos) ROBOTOS="$2"; shift 2 ;;
    --wheel) WHEEL="$2"; shift 2 ;;
    --sim) SIM="$2"; shift 2 ;;
    --serial-bridge) BRIDGE="$2"; shift 2 ;;
    --out) OUT="$2"; shift 2 ;;
    --notes) NOTES="$2"; shift 2 ;;
    --os-arch) OS_ARCH="$2"; shift 2 ;;
    -h|--help) usage ;;
    *) echo "Unknown arg: $1" >&2; usage ;;
  esac
done

[[ -n "$ROBOTOS" && -n "$WHEEL" && -n "$OUT" ]] || usage
[[ -d "$ROBOTOS" ]] || { echo "Missing robotos dist: $ROBOTOS" >&2; exit 1; }
[[ -f "$WHEEL" ]] || { echo "Missing wheel: $WHEEL" >&2; exit 1; }
[[ ! -e "$OUT" ]] || { echo "OutDir already exists: $OUT (refuse to overwrite)" >&2; exit 1; }

mkdir -p "$OUT"
echo "Staging curriculum → $OUT"
cp "$ROOT/README.md" "$ROOT/SETUP.md" "$OUT/"
[[ -f "$ROOT/.gitignore" ]] && cp "$ROOT/.gitignore" "$OUT/"
for f in start-here.cmd start-bridge.cmd start-here.sh start-bridge.sh start-here.command; do
  [[ -f "$ROOT/$f" ]] && cp "$ROOT/$f" "$OUT/"
done
[[ -d "$ROOT/.vscode" ]] && cp -R "$ROOT/.vscode" "$OUT/.vscode"
chmod +x "$OUT/start-here.sh" "$OUT/start-bridge.sh" "$OUT/start-here.command" 2>/dev/null || true
cp -R "$ROOT/docs" "$OUT/docs"
cp -R "$ROOT/labs" "$OUT/labs"

CODE="$OUT/code"
mkdir -p "$CODE"
ROB_NAME="$(basename "$(cd "$ROBOTOS" && pwd)")"
echo "Copy robotos pack $ROB_NAME"
cp -R "$ROBOTOS" "$CODE/$ROB_NAME"
cp "$WHEEL" "$CODE/$(basename "$WHEEL")"

if [[ -n "$BRIDGE" ]]; then
  [[ -f "$BRIDGE" ]] || { echo "Missing serial-bridge: $BRIDGE" >&2; exit 1; }
  cp "$BRIDGE" "$CODE/$ROB_NAME/bin/"
  chmod +x "$CODE/$ROB_NAME/bin/$(basename "$BRIDGE")" || true
fi

if [[ -n "$SIM" ]]; then
  [[ -d "$SIM" ]] || { echo "Missing sim dist: $SIM" >&2; exit 1; }
  SIM_NAME="$(basename "$(cd "$SIM" && pwd)")"
  echo "Copy sim pack $SIM_NAME"
  cp -R "$SIM" "$CODE/$SIM_NAME"
fi

if [[ -z "$NOTES" && -n "$OS_ARCH" ]]; then
  AUTO="$ROOT/packs/NOTES.${OS_ARCH}.txt"
  [[ -f "$AUTO" ]] && NOTES="$AUTO" && echo "NOTES auto-selected for --os-arch $OS_ARCH → $AUTO"
fi
NOTES="${NOTES:-$ROOT/packs/NOTES.template.txt}"
[[ -f "$NOTES" ]] || { echo "Missing NOTES template: $NOTES" >&2; exit 1; }
cp "$NOTES" "$CODE/NOTES.txt"
echo "NOTES.txt ← $NOTES"

if [[ -n "$OS_ARCH" ]]; then
  echo "OS/arch stamp: $OS_ARCH" > "$CODE/OS_ARCH.txt"
fi

# Restore execute bits commonly stripped by zip on Windows hosts
chmod +x "$CODE/$ROB_NAME/bin/"* 2>/dev/null || true
if [[ -n "$SIM" ]]; then
  chmod +x "$CODE/$SIM_NAME/robotos-sim" 2>/dev/null || true
  chmod +x "$CODE/$SIM_NAME/robotos-sim.app/Contents/MacOS/"* 2>/dev/null || true
fi

echo "Done. Zip $OUT for students when ready."
echo "Student post-unzip (macOS/Linux): chmod +x code/robotos-v*/bin/* code/robotos-sim-v*/robotos-sim"
echo "Tree (depth 2):"
find "$OUT" -maxdepth 2 -print | head -n 80
