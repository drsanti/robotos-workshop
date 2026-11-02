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

**Two SKUs** (flash the matching folder; do not mix bins):

| Board | Prebuilt firmware | Typical caps | Class focus |
|-------|-------------------|--------------|-------------|
| **`es3c28p`** (Ternion) | `hardware-interface-workshop/firmware-prebuilt/es3c28p/` | `≈ 0x33` | LED + mic (+ keys/batt/wave) |
| **`ws28p`** (Waveshare) | `hardware-interface-workshop/firmware-prebuilt/ws28p/` | `≈ 0x3c` | IMU + RTC (+ keys/batt/wave; **no** LED/mic) |

Students: run **HW-01** and follow caps — LED labs need `es3c28p`; IMU labs need `ws28p`.  
Details: [`labs/hw/README.md`](../labs/hw/README.md).

Student path (no env typing — `run` sets `ROBOTOS_CONNECT` for `hw-*`):

1. Close warehouse sim.  
2. Plug USB → `scripts\start-bridge.cmd` / `./scripts/start-bridge.sh` (leave open).  
3. VS Code terminal: `scripts\run.cmd hw-01` / `./scripts/run hw-01`
### This room (instructor fill-in)

| Item | Value |
|------|--------|
| Board SKU today | `es3c28p` / `ws28p` / mixed |
| USB Serial COM / `cu.*` | e.g. `COM17` (Device Manager / System Information) |
| If `--port auto` skips the board | `serial-bridge --port COMx --baud 921600 --robot-id 01 --cmd-topic all` |
| Wi‑Fi / other | — |

## Optional — board Wi‑Fi (not graded)

Windows pack includes `wifi-cfg`. Bridge running, then:

```text
scripts\wifi-cfg.cmd --ssid YOUR_SSID --pass YOUR_PASSWORD --connect tcp/PC_LAN_IP:7447
```

Use the PC LAN IP (`ipconfig`), not `127.0.0.1`. Status: `scripts\run.cmd hw-02 board_watch`.

## Tracks order

**MW → WH → HW** unless you say otherwise. No graded arm / car / drone labs this term.

## Instructor smoke (re-check before class)

See [`SMOKE.md`](SMOKE.md). Quick Windows path: start-here → `run wh-01` → close sim → start-bridge → `run hw-01`.
