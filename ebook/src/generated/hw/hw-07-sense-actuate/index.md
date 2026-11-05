# HW-07 — Sense → actuate (closed loop on silicon)

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-07` · **Folder:** `hw-07-sense-actuate`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd hw-07
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-07
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-07
```

---

Prerequisite: serial bridge running, warehouse sim closed.

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-07-sense-actuate/README.md</code></p>

</div>


## Goal

One host node: **read a sensor**, **command an actuator** (WH-03 pattern on hardware).

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Branch on HW-01 caps (IMU+LED vs IMU-only vs LED-only)  
- Close a loop: tilt → LED / console state  
- Zero/off on exit when commanding LEDs  

## Prerequisites

- HW-01/02/03 as needed for your caps  
- Ebook: [`ch05-feedback-control.md`](../../../chapters/ch05-feedback-control.md) + [`ch04-board-on-graph.md`](../../../chapters/ch04-board-on-graph.md)

## Spec (minimum)

- If board has **IMU + LED**: tilt threshold → LED solid; level → off.  
- If **IMU only**: print `TILT` / `LEVEL` (no LED).  
- If **LED only**: map battery % or a param into color (instructor pick).

## Architecture

```mermaid
flowchart LR
  imu["/robot/01/sensor/imu"] --> node[sense_actuate.py]
  node -->|LedFx| led["/robot/01/actuator/led/fx"]
```

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Run

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>`. List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\hw\hw-07-sense-actuate\starter\sense_actuate.py
```

Needs caps matching your branch (probe with HW-01 first). On `ws28p`, expect IMU path + LED publish may be a no-op (no LED cap) — console `TILT`/`LEVEL` still counts.

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### Run

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-07-sense-actuate/starter/sense_actuate.py
```

Needs caps matching your branch (probe with HW-01 first). On `ws28p`, expect IMU path + LED publish may be a no-op (no LED cap) — console `TILT`/`LEVEL` still counts.

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### Run

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-07-sense-actuate/starter/sense_actuate.py
```

Needs caps matching your branch (probe with HW-01 first). On `ws28p`, expect IMU path + LED publish may be a no-op (no LED cap) — console `TILT`/`LEVEL` still counts.

---

## Expected output

```text
tilt>25.0° → LED; level → off — Ctrl-C
TILT 138°
LEVEL 12°
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No prints | Bridge / IMU cap / `ROBOTOS_CONNECT` |
| LED dark with TILT | No LED cap — OK; use console branch |
| Forgot `--cmd-topic all` | Restart bridge with flag |

## Done when

Physical motion (or chosen input) changes an actuator or clear console state without Manual board UI.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-07-sense-actuate/CHECKLIST.md</code></p>

### HW-07 checklist

- [ ] Caps checked (HW-01)
- [ ] Sensor subscription live
- [ ] Actuator or state output responds to sensor
