# HW-05 — Discrete inputs (touch / keys)

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-05` · **Folder:** `hw-05-input-events`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd hw-05
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-05
```

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-05
```

Prerequisite: serial bridge running, warehouse sim closed.

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-05-input-events/README.md</code></p>

</div>


## Goal

Treat button/touch as **events on topics**, not host-side GPIO polling.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

On Windows, if `Activate.ps1` is blocked, run this once and then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Use the Linux block only when `code/robotos-v0.3.0-linux-x64` is in your drop. This class drop is Windows and macOS.

## Learning outcomes

- Subscribe to touch/UI event topics  
- Match host log lines to physical presses  
- Optional duration arg for non-interactive runs  

## Prerequisites

- HW-00/01 (BTN cap helpful)  
- Ebook: [`ch04-board-on-graph.md`](../../../chapters/ch04-board-on-graph.md)

## Topics

`/robot/01/input/touch`, `/robot/01/display/ui/event` (as available).

## Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.


### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\hw\hw-05-input-events\starter\touch_watch.py
python labs\hw\hw-05-input-events\starter\touch_watch.py 10
```

### macOS Apple Silicon (zsh or bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-05-input-events/starter/touch_watch.py
python labs/hw/hw-05-input-events/starter/touch_watch.py 10
```

### Linux (bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-05-input-events/starter/touch_watch.py
python labs/hw/hw-05-input-events/starter/touch_watch.py 10
```


Press/short/long on the device; watch host prints.

## Expected output

```text
watching /robot/01/input/touch + … 
touch gest=0 [id=… DOWN (x,y)]
touch gest=0 [id=… UP (x,y)]
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No events | Caps lack BTN/touch; bridge; wrong connect |
| Script hangs forever | Pass seconds arg or Ctrl-C |

## Done when

Host log shows events that match your presses.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-05-input-events/CHECKLIST.md</code></p>

### HW-05 checklist

- [ ] Events appear on host when interacting with the board
- [ ] Can explain event vs continuous sensor stream
