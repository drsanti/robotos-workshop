# HW-00 — Board on the graph

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-00` · **Folder:** `hw-00-board-connect`

```text
# from workshop root
scripts\run.cmd hw-00
# Unix: ./scripts/run hw-00
# prerequisite: scripts/start-bridge running; sim closed
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-00-board-connect/README.md</code></p>

</div>


## Goal

Bring the ESP32-S3 onto the robotos graph via `serial-bridge` and see `/robot/01/sys/board`.

## Learning outcomes

- Run bridge (listen) and lab terminal (connect) without env conflicts  
- Confirm board topics with `topic list` / `topic echo`  

## Theory

- Ebook: [`ch04-board-on-graph.md`](../../../chapters/ch04-board-on-graph.md)  
- Notes: [`docs/theory/14-board-on-graph.md`](../../../docs/theory/14-board-on-graph.md)

## Prerequisites

- ESP32-S3 workshop board + USB; firmware preflashed  
- [`code/NOTES.txt`](../../../code/NOTES.txt) section B / B2  
- [`SETUP.md`](../../../../SETUP.md) §7  

## Architecture

```mermaid
flowchart LR
  mcu[ESP32-S3] -->|USB UART| bridge[serial-bridge]
  bridge --> graph[Topics /robot/01/*]
  student[CLI / Python] --> graph
```

```mermaid
sequenceDiagram
  participant A as Terminal A bridge
  participant M as MCU
  participant B as Terminal B CLI
  A->>A: ROBOTOS_LISTEN :7447
  A->>M: USB open / probe
  M->>A: BoardInfo / sensors
  B->>A: ROBOTOS_CONNECT
  B->>B: topic echo sys/board
```

## Bridge (terminal A)

Leave this terminal open.

> **Preferred:** double-click `scripts\start-bridge.cmd` (Windows) or run
> `./scripts/start-bridge.sh` (macOS/Linux). Manual fences below if a TA asks.

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
$env:ROBOTOS_LISTEN = "tcp/0.0.0.0:7447"
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
# or: serial-bridge --port COM7 --baud 921600 --robot-id 01 --cmd-topic all
```

### Linux / macOS (bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"   # or macos-arm64
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x code/robotos-v*/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
# or: --port /dev/ttyACM0          (Linux)
# or: --port /dev/cu.usbmodem*     (macOS)
```

Linux permission denied → `sudo usermod -aG dialout $USER` then log out/in.

## Practice (terminal B)

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
.\.venv\Scripts\Activate.ps1
robotos node list
robotos topic list
robotos topic echo /robot/01/sys/board --count 3
```

### Linux / macOS (bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
robotos node list
robotos topic list
robotos topic echo /robot/01/sys/board --count 3
```

## Expected output

`topic list` shows `/robot/01/sys/board` (and often IMU/battery). Echo prints `BoardInfo { … }`.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No topics | Bridge down; `ROBOTOS_CONNECT` missing; USB |
| Port busy | Close serial monitors / other bridges |
| Linux access denied | `dialout` + re-login |
| Self-connect errors | Do not set LISTEN+CONNECT in the same process |

## Done when

You see board-related topics (at least `/robot/01/sys/board` or sensor streams).

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-00-board-connect/CHECKLIST.md</code></p>

### HW-00 checklist

- [ ] Bridge / connect env set
- [ ] `node list` or `topic list` shows board traffic
- [ ] Echoed at least one board/sys message
