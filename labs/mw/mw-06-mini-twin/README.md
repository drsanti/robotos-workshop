# MW-06 — Mini digital twin

## Goal

Run a plant (`machine.py`) and a twin (`twin.py`) on shared cmd/state topics.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/README.md) first, then come back and paste the block again.

On Windows, if `Activate.ps1` is blocked, run this once and then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Use the Linux block only when `code/robotos-v0.3.0-linux-x64` is in your drop. This class drop is Windows and macOS.

## Learning outcomes

- Twin uses the **same** topic names as the plant  
- START/STOP changes reported “speed”  
- Bridge mentally to warehouse sim as a 3D twin  

## Prerequisites

- MW-01; Ebook: [`ch11-digital-twin.md`](../../../docs/ebook/chapters/ch11-digital-twin.md)  
- Theory: [`docs/theory/13-digital-twin.md`](../../../docs/theory/13-digital-twin.md)

## Architecture

```mermaid
flowchart LR
  machine[machine.py] -->|/machine/01/state| twin[twin.py]
  twin -->|/machine/01/cmd| machine
```

## Practice

> **Preferred runner** (workshop root): this lab has multiple starters — `scripts\run.cmd mw-06 <starter>` (Windows) or `./scripts/run mw-06 <starter>` (macOS/Linux). Starters: `machine / twin`. List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.


### Terminal A — plant

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\mw\mw-06-mini-twin\starter\machine.py
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-06-mini-twin/starter/machine.py
```

**Linux (bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-06-mini-twin/starter/machine.py
```


### Terminal B — twin

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\mw\mw-06-mini-twin\starter\twin.py
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-06-mini-twin/starter/twin.py
```

**Linux (bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-06-mini-twin/starter/twin.py
```


Topics: `/machine/01/state`, `/machine/01/cmd` (Imu used as a simple stand-in payload).

## Expected output

Twin prints rising/falling “speed” after START/STOP.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Twin silent | Start machine first; same env |
| No speed change | Cmd not reaching plant |

## Bridge

Next: **warehouse sim** is the same idea with a 3D plant (`robotos_sim`). Future: board↔sim fusion (BACKLOG P3).

## Done when

Twin prints rising/falling “speed” after START/STOP.

See [CHECKLIST.md](CHECKLIST.md).
