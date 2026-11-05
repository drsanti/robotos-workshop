# Lab WH-07 — Record / inspect

<div class="ebook-run">

**Track:** `wh` (Warehouse) · **Lab:** `wh-07` · **Folder:** `wh-07-record-bag`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd wh-07
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-07
```

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-07
```

Prerequisite: warehouse sim running (`scripts/start-here`).

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-07-record-bag/README.md</code></p>

</div>


## Goal

Capture a short bag of warehouse telemetry while a behavior runs, then inspect it.

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

- Record odom + scan during WH-03 or WH-05  
- Show `bag info` as evidence  
- Pick topics that match the claim  

## Prerequisites

- Behavior lab ready; sim Connected  
- Ebook: [`ch09-bags-evidence.md`](../../../chapters/ch09-bags-evidence.md)  
- Theory: [`docs/theory/06-bags-evidence.md`](../../../docs/theory/06-bags-evidence.md)

Exact CLI flags follow your pack — check `robotos --help` / `NOTES.txt`.

## Typical flow

1. Sim Connected (Native / External).  
2. Terminal A — start WH-03 or WH-05 (`scripts\run.cmd wh-03` / `wh-05`, or
   `./scripts/run …`).  
3. Terminal B — record:

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag
```

### macOS Apple Silicon (zsh or bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag
```

### Linux (bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag
```


4. Note: bag path, duration, topics, approximate message counts.

## Expected output

`bag info` lists `/robot/01/odom` and `/robot/01/scan` with non-zero counts.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Empty / tiny bag | Behavior not publishing; topics misspelled |
| No scan in bag | Add `/robot/01/scan` to the record list |
| Pack lacks record | Fall back: save 20 lines of WH-02 printout to a text file |

## Done when

You can show the instructor `bag info` (or equivalent) for a run you drove.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-07-record-bag/CHECKLIST.md</code></p>

### Lab 07 checklist

- [ ] Recording while robot moves
- [ ] `bag info` (or text log) shows odom and/or scan
- [ ] File saved with a clear name (`run1…`)
