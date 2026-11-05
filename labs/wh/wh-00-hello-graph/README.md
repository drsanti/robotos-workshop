# Lab WH-00 — Hello graph

## Goal

Confirm pack tools see the same graph as **robotos-sim**.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/README.md) first, then come back and paste the block again.

On Windows, if `Activate.ps1` is blocked, run this once and then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Use the Linux block only when `code/robotos-v0.3.0-linux-x64` is in your drop. This class drop is Windows and macOS.

## Prerequisites

- Sim is running. Paste this page's command block in this window. Full machine setup is [`SETUP.md`](../../../SETUP.md) if MW-00 is not done  
- Sim launched and **Connected** (**Native**) — see SETUP §4  
- Ebook: [`ch01-graph-nodes-topics.md`](../../../docs/ebook/chapters/ch01-graph-nodes-topics.md)

## Steps

Paste the whole block for your computer. There is no starter script for WH-00.

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos topic list
robotos topic echo /robot/01/odom --count 5
```

### macOS Apple Silicon (zsh or bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos topic list
robotos topic echo /robot/01/odom --count 5
```

### Linux (bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos topic list
robotos topic echo /robot/01/odom --count 5
```


**Expect:** list includes `/robot/01/cmd_vel`, `/robot/01/odom`, `/robot/01/scan`. Echo prints odometry (move the robot in Manual briefly if idle).

Before WH-01: set sim to **External** (desktop builds often already did; confirm UI).

## Done when

You can explain which process is the sim node and which topics are in vs out ([contract](../../../docs/p0-contract.md)).

See [CHECKLIST.md](CHECKLIST.md).
