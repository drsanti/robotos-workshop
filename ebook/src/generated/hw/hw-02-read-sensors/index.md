# HW-02 — Read sensors from the board

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-02` · **Folder:** `hw-02-read-sensors`

```text
# from workshop root
scripts\run.cmd hw-02
# Unix: ./scripts/run hw-02
# prerequisite: scripts/start-bridge running; sim closed
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-02-read-sensors/README.md</code></p>

</div>


## Goal

Subscribe to live telemetry the MCU publishes (IMU and/or board status).

## Learning outcomes

- Choose IMU vs board_watch based on **HW-01 caps**  
- Print live accel/gyro or battery/board fields  
- Confirm values change when you tilt the board (IMU)  

## Prerequisites

- HW-00 bridge up; HW-01 caps known (`IMU=0x04`, `BATT=0x10`, …)  
- PATH + `.venv` + `ROBOTOS_CONNECT`  
- Ebook: [`ch04-board-on-graph.md`](../../../chapters/ch04-board-on-graph.md)

## Topics

| Topic | Typical use |
|-------|-------------|
| `/robot/01/sensor/imu` | `imu_watch.py` (needs IMU cap) |
| `/robot/01/sensor/battery` | `board_watch.py` |
| `/robot/01/sys/board` | `board_watch.py` |

## Architecture

```mermaid
flowchart LR
  mcu[MCU] --> bridge[serial-bridge]
  bridge --> imu["/robot/01/sensor/imu"]
  bridge --> board["/robot/01/sys/board"]
  imu --> watch[imu_watch.py]
  board --> bwatch[board_watch.py]
```

## Practice

> **Preferred runner** (workshop root): this lab has multiple starters — `scripts\run.cmd hw-02 <starter>` (Windows) or `./scripts/run hw-02 <starter>` (macOS/Linux). Starters: `imu_watch / board_watch`. List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


### IMU (needs IMU cap — often `ws28p`)

**Windows (PowerShell)**

```powershell
python labs\hw\hw-02-read-sensors\starter\imu_watch.py 10
```

**Linux / macOS (bash)**

```bash
python labs/hw/hw-02-read-sensors/starter/imu_watch.py 10
```

### Battery / Wi‑Fi / board info

**Windows (PowerShell)**

```powershell
python labs\hw\hw-02-read-sensors\starter\board_watch.py 15
```

**Linux / macOS (bash)**

```bash
python labs/hw/hw-02-read-sensors/starter/board_watch.py 15
```

## Expected output (IMU)

```text
watching /robot/01/sensor/imu — Ctrl-C to stop (10s)
a=(+0.12,+0.05,+9.81) g=(+0.001,-0.002,+0.000)
```

Tilt the board — acceleration vector should move off “table flat.”

## Code notes (`imu_watch.py`)

- Optional duration argument (seconds); omit to run until Ctrl-C  
- `sub.recv(timeout_ms=2000)` with timeout message if quiet  
- Prints accel + gyro triples each sample  

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Timeouts forever | Caps lack IMU; bridge down; wrong `ROBOTOS_CONNECT` |
| Flat values never change | Stub board / wrong variant — check HW-01 `hw_model` |
| ImportError | `.venv` + wheel |

## Done when

You print changing sensor values while tilting (IMU) or see battery/board updates.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-02-read-sensors/CHECKLIST.md</code></p>

### HW-02 checklist

- [ ] At least one sensor stream printing
- [ ] Can name the topic + schema used
