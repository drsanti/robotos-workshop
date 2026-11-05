# MW-05 — Record & replay

<div class="ebook-run">

**Track:** `mw` (Middleware) · **Lab:** `mw-05` · **Folder:** `mw-05-record-replay`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd mw-05
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-05
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-05
```

---

<p class="ebook-source"><strong>Source:</strong> <code>labs/mw/mw-05-record-replay/README.md</code></p>

</div>


## Goal

Record `/machine/01/sensor/imu` from MW-01’s publisher, inspect, optionally replay.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Same bag workflow as Ch.9 / WH-07, on the laptop graph  
- Confirm non-zero Imu counts in `bag info`  

## Prerequisites

- MW-01 starters  
- Ebook: [`ch09-bags-evidence.md`](../../../chapters/ch09-bags-evidence.md)

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 1. Terminal A — publisher. Leave it running. Paste the whole block in that window

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>`. List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\mw\mw-01-pub-sub\starter\sim_sensor.py
```

### 2. Terminal B — record

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag
```

3. Replay per pack docs; optionally run `monitor.py` during replay.

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### 1. Terminal A — publisher. Leave it running. Paste the whole block in that window

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-01-pub-sub/starter/sim_sensor.py
```

### 2. Terminal B — record

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag
```

3. Replay per pack docs; optionally run `monitor.py` during replay.

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### 1. Terminal A — publisher. Leave it running. Paste the whole block in that window

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-01-pub-sub/starter/sim_sensor.py
```

### 2. Terminal B — record

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag
```

3. Replay per pack docs; optionally run `monitor.py` during replay.

---

## Expected output

`bag info` shows Imu topic with non-zero count.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Empty bag | `sim_sensor` not running |
| Wrong topic | Must be `/machine/01/sensor/imu` (not `/robot/01/…`) |

## Done when

`bag info` shows the Imu topic and a non-zero message count.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/mw/mw-05-record-replay/CHECKLIST.md</code></p>

### MW-05 checklist

- [ ] Recorded while publisher ran
- [ ] `bag info` OK
- [ ] Attempted replay or documented pack limitation
