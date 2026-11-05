# Lab WH-06 — State machine

<div class="ebook-run">

**Track:** `wh` (Warehouse) · **Lab:** `wh-06` · **Folder:** `wh-06-state-machine`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd wh-06
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-06
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-06
```

---

Prerequisite: warehouse sim running (`scripts/start-here`).

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-06-state-machine/README.md</code></p>

</div>


## Goal

Replace ad-hoc if/else with an explicit **FSM** and print state changes.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Define ≥3 named states with clear entry/exit  
- Log every transition  
- Escape “stuck” instead of chatter  

## Prerequisites

- WH-03 / WH-05 helpful  
- Ebook: [`ch08-wall-follow-fsm.md`](../../../chapters/ch08-wall-follow-fsm.md)

## Suggested states

| State | Behavior |
|-------|----------|
| `CRUISE` | Drive forward slowly |
| `AVOID` | Front blocked → turn |
| `FOLLOW` | (optional) side logic from WH-05 |
| `RECOVER` | Spin / back off if stuck (front+sides all close) |

## Spec (minimum)

- At least **3** states.  
- Log every transition: `t=… CRUISE → AVOID`.  
- Respect cmd_vel timeout (publish in a loop).

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
python labs\wh\wh-06-state-machine\starter\fsm_drive.py
```

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### Run

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-06-state-machine/starter/fsm_drive.py
```

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### Run

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-06-state-machine/starter/fsm_drive.py
```

---

## Expected output

Readable transition lines over a ≥90 s run; no freeze in one bad state.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No transitions printed | Logging missing; thresholds never fire |
| Stuck in AVOID | Add RECOVER when all ranges tight |
| Timeout stops | Raise publish rate |

## Done when

A 90 s run shows readable transitions and no freeze in one bad state.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-06-state-machine/CHECKLIST.md</code></p>

### Lab 06 checklist

- [ ] ≥3 named states
- [ ] Transitions printed
- [ ] 90 s run without permanent stuck state
