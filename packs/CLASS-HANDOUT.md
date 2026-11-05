# Class handout — robotos-workshop

**Repo (source of truth):** https://github.com/drsanti/robotos-workshop  

**Student IDE:** VS Code · open the workshop folder as the workspace.

## What to give students

| OS | Drop (local `drops/`, gitignored) |
|----|-----------------------------------|
| Windows x64 | `robotos-workshop-windows-x64-20261102-1702.zip` |
| macOS Apple Silicon | `robotos-workshop-macos-arm64-20261102-1702.zip` |

Or clone the GitHub repo (already includes `code/` packs for Win + Mac).

## Boards

**Two SKUs** (flash the matching folder; do not mix bins):

| Board | Prebuilt firmware | Typical caps | Class focus |
|-------|-------------------|--------------|-------------|
| **`es3c28p`** (Ternion) | `hardware-interface-workshop/firmware-prebuilt/es3c28p/` | `≈ 0x33` | LED + mic (+ keys/batt/wave) |
| **`ws28p`** (Waveshare) | `hardware-interface-workshop/firmware-prebuilt/ws28p/` | `≈ 0x3c` | IMU + RTC (+ keys/batt/wave; **no** LED/mic) |

Students run **HW-01** and follow caps. LED labs need `es3c28p`. IMU labs need `ws28p`. Details: [`labs/hw/README.md`](../labs/hw/README.md).

## Windows

Day 1:

1. Unzip / clone → open the folder in VS Code.
2. Double-click `scripts\start-here.cmd`.
3. VS Code → **Terminal → New Terminal** (PowerShell).
4. `robotos topic list` → expect `/robot/01/cmd_vel`, `odom`, `scan`.
5. `scripts\run.cmd wh-01`

Board labs. Close the sim and plug in USB. `run` sets `ROBOTOS_CONNECT` for `hw-*`.

1. `scripts\start-bridge.cmd` (leave open). If auto-detect misses the port: `serial-bridge --port COMx --baud 921600 --robot-id 01 --cmd-topic all`.
2. Second window: `scripts\run.cmd hw-01`

Optional Wi-Fi (not graded). Bridge already running. Use the PC LAN IP from `ipconfig`, and set the Wi-Fi profile to **Private** if `zenoh` stays false.

```text
scripts\wifi-cfg.cmd --ssid YOUR_SSID --pass YOUR_PASSWORD --connect tcp/PC_LAN_IP:7447
scripts\run.cmd hw-02 board_watch
```

Expect `state=3` / `zenoh=True`.

---

## macOS

Day 1:

1. Unzip / clone → open the folder in VS Code.
2. Double-click `scripts/start-here.command` (Gatekeeper: right-click → Open once).
3. VS Code → **Terminal → New Terminal**.
4. `robotos topic list` → expect `/robot/01/cmd_vel`, `odom`, `scan`.
5. `./scripts/run wh-01`

Board labs. Close the sim and plug in USB.

1. `./scripts/start-bridge.sh` (leave open). Pin the path from `[auto] selected` if auto-detect skips `cu.usbmodem`.
2. Second window: `./scripts/run hw-01`

---

## Linux

Skip this section when the drop has no `code/robotos-v0.3.0-linux-x64`.

Day 1:

1. `./scripts/start-here.sh` from the workshop folder.
2. `robotos topic list` → expect `/robot/01/cmd_vel`, `odom`, `scan`.
3. `./scripts/run wh-01`

Board labs. Close the sim and plug in USB.

1. `./scripts/start-bridge.sh` (leave open). If auto-detect misses the board, add `--port /dev/ttyACM0`.
2. Second window: `./scripts/run hw-01`

---

### This room (instructor fill-in)

| Item | Value |
|------|--------|
| Board SKU today | `es3c28p` / `ws28p` / mixed |
| USB serial port | |
| Wi‑Fi / other | — |

## Tracks order

**MW → WH → HW** unless you say otherwise. No graded arm / car / drone labs this term.

## Instructor smoke (re-check before class)

See [`SMOKE.md`](SMOKE.md). Quick Windows path: start-here → `run wh-01` → close sim → start-bridge → `run hw-01`.
