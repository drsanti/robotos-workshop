# HW-01 — Capability probe

## Goal

Read `BoardInfo.caps` and know which demos apply on **this** board.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/README.md) first, then come back and paste the block again.

## Learning outcomes

- Wait for `/robot/01/sys/board` and decode the caps bitfield  
- Map yes/no flags to later labs (LED, IMU, …)  

## Theory

Same board family, different peripherals — **probe before commanding**.  
Ebook walkthrough: [`ch04-board-on-graph.md`](../../../docs/ebook/chapters/ch04-board-on-graph.md) §2.2 / §7.

| Bit | Name | Example lab |
|-----|------|-------------|
| `0x01` | LED | HW-03 `led_fx` |
| `0x02` | MIC | stretch / `mic_dump` |
| `0x04` | IMU | HW-02 `imu_watch` |
| `0x08` | RTC | time sync |
| `0x10` | BATT | HW-02 `board_watch` |
| `0x20` | BTN | HW-05 |

## Prerequisites

- Close warehouse **sim** (port clash with bridge)  
- Board USB plugged (`es3c28p` or `ws28p`)

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### **B — probe** (a second window, after the bridge is running). Paste the whole block

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd hw-01
```

`run` sets `ROBOTOS_CONNECT` for you on `hw-*` labs.

### Manual fallback (if a TA asks)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
python labs\hw\hw-01-caps-probe\starter\caps_probe.py
```

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### **B — probe** (a second window, after the bridge is running). Paste the whole block

**A — bridge** (leave open): `./scripts/start-bridge.sh`

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-01
```

`run` sets `ROBOTOS_CONNECT` for you on `hw-*` labs.

### Manual fallback (if a TA asks)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
python labs/hw/hw-01-caps-probe/starter/caps_probe.py
```

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### **B — probe** (a second window, after the bridge is running). Paste the whole block

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-01
```

`run` sets `ROBOTOS_CONNECT` for you on `hw-*` labs.

### Manual fallback (if a TA asks)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
python labs/hw/hw-01-caps-probe/starter/caps_probe.py
```

---

## Code notes (`caps_probe.py`)

- Inline walk for `SETUP.md` then `from labs.common…` (do not edit the path block)  
- `wait_for_message` (in `labs.common`) — waits for the next sparse BoardInfo sample  
- `CAPS_BITS` table lives in `labs.common.caps` — **yes/no print loop stays in the starter**  
- Prints `hw_model`, `fw_version`, `caps=0x..`

## Expected output

Class has **two** SKUs — flash
`fw/{es3c28p|ws28p}/` with **esptool** (see [`fw/README.md`](../../../fw/README.md)) to match the
hardware (see [`labs/hw/README.md`](../README.md)).

**`ws28p`** (IMU + RTC; no LED/mic) — example:

```text
waiting for /robot/01/sys/board ...
hw_model=ws28p uuid=… fw=robotos-fw/0.3.0 caps=0x3c
  [no ] LED  -> led_fx
  [no ] MIC  -> stretch / mic_dump
  [yes] IMU  -> imu_watch
  [yes] RTC  -> time_sync (RTC persist)
  [yes] BATT -> board_watch
  [yes] BTN  -> touch_watch / keys
```

**`es3c28p`** (LED + mic; no IMU/RTC) — expect `hw_model=es3c28p`, `caps≈0x33`,
LED/MIC **yes**, IMU/RTC **no**.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Timeout / no BoardInfo | Bridge up? USB? Same `ROBOTOS_CONNECT` host/port |
| Caps all `no` | Unexpected firmware — check `fw_version` |
| Import errors / `robotos` | Activate `.venv` + pack wheel |
| `ModuleNotFoundError: labs` | Terminal must be inside the workshop tree (`SETUP.md` + `labs/`); see [`labs/common/README.md`](../../common/README.md) |

## Done when

Printed `caps=0x..` and yes/no for LED / IMU / MIC / etc.

See [CHECKLIST.md](CHECKLIST.md).
