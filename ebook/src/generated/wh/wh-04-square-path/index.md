# Lab WH-04 — Square path (open loop)

<div class="ebook-run">

**Track:** `wh` (Warehouse) · **Lab:** `wh-04` · **Folder:** `wh-04-square-path`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd wh-04
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-04
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-04
```

---

Prerequisite: warehouse sim running (`scripts/start-here`).

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-04-square-path/README.md</code></p>

</div>


## Goal

Drive an approximate square using timed `linear.x` / `angular.z` segments; compare to odom.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Build an open-loop timed sequence within contract clamps  
- Measure start/end odom and report closure error honestly  
- Contrast with WH-03 feedback near obstacles  

## Prerequisites

- WH-00…03; External + Native + Connect; paste this page's command block in this window  
- Ebook: [`ch05-feedback-control.md`](../../../chapters/ch05-feedback-control.md) (open vs closed)

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
python labs\wh\wh-04-square-path\starter\square.py
python labs\wh\wh-04-square-path\starter\square.py --side 0.8 --vx 0.2
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
python labs/wh/wh-04-square-path/starter/square.py
python labs/wh/wh-04-square-path/starter/square.py --side 0.8 --vx 0.2
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
python labs/wh/wh-04-square-path/starter/square.py
python labs/wh/wh-04-square-path/starter/square.py --side 0.8 --vx 0.2
```

---

## Spec (minimum)

1. Choose `v` and `ω` within contract clamps.  
2. Sequence: forward → turn 90° → repeat ×4.  
3. Log start/end odom pose; report how far the path closed.

## Notes

Open loop will drift — grading is “attempted square + honest odom delta,” not millimeter closure. Obstacles make timed squares worse; that is the lesson vs WH-03.

## Expected output

Script completes four sides; you record Δx/Δy (and yaw) start→end.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Hits shelf mid-square | Clearer space or slower `--vx`; expect failure vs feedback |
| No motion | External mode; timeout / publish inside starter |

## Done when

You can explain why WH-03 (feedback) and WH-04 (open loop) behave differently near obstacles.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-04-square-path/CHECKLIST.md</code></p>

### Lab 04 checklist

- [ ] Four drive+turn segments complete
- [ ] Start/end odom printed
- [ ] Notes closure error (expected non-zero)
