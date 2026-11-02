# Class handout — robotos-workshop

**Repo (source of truth):** https://github.com/drsanti/robotos-workshop  

**Student IDE:** VS Code · open the workshop folder as the workspace.

## What to give students

| OS | Drop (local `drops/`, gitignored) |
|----|-----------------------------------|
| Windows x64 | `robotos-workshop-windows-x64-20261102.zip` |
| macOS Apple Silicon | `robotos-workshop-macos-arm64-20261102.zip` |

Or clone the GitHub repo (already includes `code/` packs for Win + Mac).

## Day-1 (5 minutes)

1. Unzip / clone → open folder in VS Code.  
2. **Windows:** double-click `scripts\start-here.cmd`  
   **macOS:** double-click `scripts/start-here.command` (Gatekeeper: right-click → Open once).  
3. VS Code → **Terminal → New Terminal**  
4. `robotos topic list` → expect `/robot/01/cmd_vel`, `odom`, `scan`  
5. `scripts\run.cmd wh-01` or `./scripts/run wh-01`

## Board labs (HW)

1. Prefer **closing the warehouse sim** first (avoids port `7447` fighting the bridge).  
2. Plug USB → **Windows:** `scripts\start-bridge.cmd` · **macOS:** `./scripts/start-bridge.sh`  
3. Leave bridge window open.  
4. Labs terminal: `scripts\run.cmd hw-01` / `./scripts/run hw-01`

### This room (instructor fill-in)

| Item | Value |
|------|--------|
| USB Serial COM / `cu.*` | e.g. `COM17` (Device Manager / System Information) |
| If `--port auto` skips the board | `serial-bridge --port COMx --baud 921600 --robot-id 01 --cmd-topic all` |
| Wi‑Fi / other | — |

## Tracks order

**MW → WH → HW** unless you say otherwise. No graded arm / car / drone labs this term.

## Instructor smoke (re-check before class)

See [`SMOKE.md`](SMOKE.md). Quick Windows path: start-here → `run wh-01` → close sim → start-bridge → `run hw-01`.
