# MW-04 — Parameters (& lifecycle)

## Goal

Change live node config with `robotos param` while `tuning_node` runs.

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

- Declare/read params from a node  
- `list` / `get` / `set` from a second terminal  
- Optional: peek at lifecycle CLI  

## Prerequisites

- MW-00…02; paste this page's command block in **both** windows  
- Ebook: [`ch10-params-lifecycle.md`](../../../docs/ebook/chapters/ch10-params-lifecycle.md)  
- Theory: [`docs/theory/10-params-lifecycle.md`](../../../docs/theory/10-params-lifecycle.md)

## Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.


### Terminal A — node

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\mw\mw-04-parameters\starter\tuning_node.py
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-04-parameters/starter/tuning_node.py
```

**Linux (bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-04-parameters/starter/tuning_node.py
```


### Terminal B — CLI

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint
```

**Linux (bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint
```


Lifecycle: `robotos lifecycle --help` and pack NOTES for get/set state.

## Expected output

Node printout shows `setpoint` / `mode` updating after CLI set.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Node missing from `param list` | A not running; name typo |
| Set fails | Type/allow rules — see CLI error |
| command not found | Paste this page's command block again in this window |

## Done when

Live `setpoint` / `mode` printout changes after a CLI set.

See [CHECKLIST.md](CHECKLIST.md).
