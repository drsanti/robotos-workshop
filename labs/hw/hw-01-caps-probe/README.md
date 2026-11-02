# HW-01 — Capability probe

## Goal

Read `BoardInfo.caps` and know which demos apply on **this** board.

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

- HW-00: bridge still running (terminal A)  
- Terminal B: `ROBOTOS_CONNECT` + PATH + `.venv`  

## Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


### Windows (PowerShell)

```powershell
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"   # if not already set
python labs\hw\hw-01-caps-probe\starter\caps_probe.py
```

### Linux x64 (bash) — new Terminal B

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
python labs/hw/hw-01-caps-probe/starter/caps_probe.py
```

### macOS Apple Silicon (bash) — new Terminal B

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
python labs/hw/hw-01-caps-probe/starter/caps_probe.py
```

## Code notes (`caps_probe.py`)

- Inline walk for `SETUP.md` then `from labs.common…` (do not edit the path block)  
- `wait_for_message` (in `labs.common`) — sparse BoardInfo via `on_message`  
- `CAPS_BITS` table lives in `labs.common.caps` — **yes/no print loop stays in the starter**  
- Prints `hw_model`, `fw_version`, `caps=0x..`

## Expected output

Class has **two** SKUs — flash
`hardware-interface-workshop/firmware-prebuilt/{es3c28p|ws28p}/` to match the
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
