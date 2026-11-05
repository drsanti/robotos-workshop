# HW-06 — Record board topics

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-06` · **Folder:** `hw-06-record-board`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd hw-06
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-06
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-06
```

---

Prerequisite: serial bridge running, warehouse sim closed.

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-06-record-board/README.md</code></p>

</div>


## Goal

Record live board topics to a `.rbag` and inspect with `bag info`.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Same evidence workflow as WH-07, on silicon  
- Choose topics your **caps** actually publish  

## Prerequisites

- HW-00 streaming (or HW-02 watchers)  
- Ebook: [`ch09-bags-evidence.md`](../../../chapters/ch09-bags-evidence.md)

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 2. Record

1. Leave the board streaming (or run HW-02).

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag
```

Adjust the topic list to what your caps publish (no IMU → drop that topic; add battery if useful).

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### 2. Record

1. Leave the board streaming (or run HW-02).

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag
```

Adjust the topic list to what your caps publish (no IMU → drop that topic; add battery if useful).

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### 2. Record

1. Leave the board streaming (or run HW-02).

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag
```

Adjust the topic list to what your caps publish (no IMU → drop that topic; add battery if useful).

---

## Expected output

`bag info` shows board topics with non-zero counts.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Empty bag | Bridge down; `ROBOTOS_CONNECT`; no publisher |
| IMU missing | Caps lack IMU — record `sys/board` / battery instead |

## Done when

`bag info` shows real board topics with non-zero counts.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-06-record-board/CHECKLIST.md</code></p>

### HW-06 checklist

- [ ] Bag from live board
- [ ] `bag info` OK
