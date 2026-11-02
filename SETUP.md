# SETUP — student machine

Week03-style: activate **your OS** folder under `code/`, install the matching wheel, then labs.

**New to terminals?** Start with the full guide:  
[`docs/ebook/chapters/ch00-setup-your-machine.md`](docs/ebook/chapters/ch00-setup-your-machine.md)  
(how to open PowerShell/Terminal, diagrams, ExecutionPolicy, Gatekeeper).

- **MW labs:** CLI + Python (sim optional).  
- **WH labs:** also start warehouse desktop sim (section 4).  
- **HW labs:** board + serial-bridge (section 7); sim not required.

Replace `YOUR_WORKSHOP_DIR` below with the folder where you unzipped this drop  
(example Windows: `C:\robotos-workshop` — **not** an instructor’s `D:\CODE\…` path).

## 1. Unpack

Unzip so you see:

```text
robotos-workshop/
  SETUP.md
  docs/
  labs/
  code/
    robotos-v0.3.0-<os>-<arch>/     # CLI + libs
    robotos-0.3.0-*.whl             # Python SDK (this OS)
    robotos-sim-v<ver>-<os>-<arch>/ # desktop sim (when shipped)
    NOTES.txt
```

Prefer a short path **without spaces**.

## 2. PATH + `robotos version`

### Windows — open PowerShell first

`Win` key → type `PowerShell` → Enter. Then:

```powershell
cd YOUR_WORKSHOP_DIR
$os = "robotos-v0.3.0-windows-x64"
$env:PATH = "$PWD\code\$os\bin;$env:PATH"
Get-Command robotos
robotos version
```

PATH lasts only for **this** window — new window → run PATH lines again.

### Linux x64

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
chmod +x code/robotos-v0.3.0-linux-x64/bin/* 2>/dev/null || true
robotos version
```

### macOS Apple Silicon

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
chmod +x code/robotos-v0.3.0-macos-arm64/bin/* 2>/dev/null || true
robotos version
```

Follow `code/NOTES.txt` if the pack starts a router/daemon first.

## 3. Python SDK

Need Python **3.10+**. On Windows, install from python.org and tick **Add python.exe to PATH**. On Ubuntu you may need `sudo apt install python3 python3-venv`.

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If activation fails with **ExecutionPolicy**:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then retry `Activate.ps1`. Prompt should show `(.venv)`.

```powershell
python -m pip install -U pip
python -m pip install .\code\robotos-0.3.0-py3-none-win_amd64.whl
python -c "import robotos; print(robotos.Node.version())"
```

(If the wheel filename differs, `Get-ChildItem .\code\*.whl` and install that file.)

### Linux x64 (bash)

```bash
cd YOUR_WORKSHOP_DIR
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
# Prefer the exact name printed in NOTES.txt for your pack. Tag-safe pick:
python -m pip install code/robotos-0.3.0-*-manylinux*.whl
# If your drop ships a pure Python wheel instead:
# python -m pip install code/robotos-0.3.0-py3-none-any.whl
python -c "import robotos; print(robotos.Node.version())"
```

### macOS Apple Silicon (bash)

```bash
cd YOUR_WORKSHOP_DIR
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install code/robotos-0.3.0-*-macosx*.whl
# or: python -m pip install code/robotos-0.3.0-py3-none-any.whl
python -c "import robotos; print(robotos.Node.version())"
```

Do **not** install a `win_amd64` wheel on Linux/macOS. If `ls code/*.whl` shows more than one file, pick the tag that matches your OS.

## 4. Start warehouse sim

**Pack honesty:** WH labs need `code/robotos-sim-v*/` for **your** OS.
Windows x64 and macOS arm64 sims ship in this drop. If your zip is **Linux-only**
or the sim folder is missing, **skip WH** and do **MW** / **HW** instead.
MW/HW do not require the desktop sim.

When the sim **is** present:

1. Open `code/robotos-sim-v*/` for **your** OS.  
   - **Windows:** double-click `robotos-sim.exe` (or `Start-Process .\code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe`).  
   - **Linux:** `chmod +x code/robotos-sim-v0.1.0-linux-x64/robotos-sim && ./code/robotos-sim-v0.1.0-linux-x64/robotos-sim &`  
   - **macOS:** `chmod +x code/robotos-sim-v0.1.0-macos-arm64/robotos-sim && open code/robotos-sim-v0.1.0-macos-arm64/robotos-sim`  
     (or right-click the app/binary → **Open** the first time). If blocked: System Settings → Privacy & Security → Allow.  
2. Desktop builds **auto-select External + Native and Connect**. Confirm the UI shows connected / **NATIVE**.  
3. If you disconnected or used Mock/Manual: **Warehouse → Native → External → Connect**.  

Graded WH labs use the **real graph** (Native), not Mock.

## 5. Smoke

Sim must already be **Native → External → Connect** (section 4).

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
robotos topic list
python labs\wh\wh-01-drive-twist\starter\drive_forward.py
```

### Linux x64 (bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
robotos topic list
python labs/wh/wh-01-drive-twist/starter/drive_forward.py
```

### macOS Apple Silicon (bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list
python labs/wh/wh-01-drive-twist/starter/drive_forward.py
```

**Expect:** `topic list` shows `/robot/01/cmd_vel`, `/robot/01/odom`, `/robot/01/scan` (not `no topics announced`). Then `drive_forward.py` moves the robot ~1 m.

Optional:

```text
robotos topic echo /robot/01/odom --count 5
```

(On **Windows**, use PowerShell for topic paths — Git Bash rewrites `/robot/...`.)

## 6. Labs

Order / map: [`docs/lab-outline.md`](docs/lab-outline.md).  
Warehouse contract: [`docs/p0-contract.md`](docs/p0-contract.md).  
Ebook backlog / QA: [`docs/ebook/BACKLOG.md`](docs/ebook/BACKLOG.md).

## 7. ESP32-S3 board (HW labs)

Full copy-paste: [`code/NOTES.txt`](code/NOTES.txt) section B (must match **your** OS pack). Short form:

### Windows — Terminal A (bridge)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
$env:ROBOTOS_LISTEN = "tcp/0.0.0.0:7447"
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
```

### Windows — Terminal B (labs)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
.\.venv\Scripts\Activate.ps1
robotos topic echo /robot/01/sys/board --count 3
python labs\hw\hw-01-caps-probe\starter\caps_probe.py
```

Override port with `--port COM7` if auto-detect fails. Pack ships `serial-bridge.exe` next to `robotos.exe`.

### Linux x64 — Terminal A (bridge)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x code/robotos-v0.3.0-linux-x64/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
# or: --port /dev/ttyACM0
```

### macOS Apple Silicon — Terminal A (bridge)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x code/robotos-v0.3.0-macos-arm64/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
# or: --port /dev/cu.usbmodem*   # tab-complete
```

### Linux x64 — Terminal B (labs)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
robotos topic echo /robot/01/sys/board --count 3
python labs/hw/hw-01-caps-probe/starter/caps_probe.py
```

### macOS Apple Silicon — Terminal B (labs)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
robotos topic echo /robot/01/sys/board --count 3
python labs/hw/hw-01-caps-probe/starter/caps_probe.py
```

**Linux serial permission:** `sudo usermod -aG dialout $USER` then **log out and back in**.  
Self-check: `groups | grep dialout` and `ls -l /dev/ttyACM*`. Do **not** run `sudo serial-bridge` to paper over permissions — fix `dialout` instead.  
Always run HW-01 (caps) before LED/IMU labs.

## Troubleshooting

| Symptom | Check |
|---------|--------|
| `robotos` not found | PATH to `code/robotos-v*/bin` in **this** terminal; `chmod +x` on Linux/macOS |
| `Activate.ps1` blocked | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| wheel “not supported” | Wrong OS wheel — `win_amd64` / `macosx` / linux / `py3-none-any` |
| `python` not found (Unix) | Use `python3` / activate `.venv` |
| `no topics announced` | Sim not Connected **or** board bridge down / wrong `ROBOTOS_CONNECT` |
| Pub but no move (WH) | Still **Manual**; need **External**; keep publishing (≥ ~2 Hz) |
| Board silent / port busy | USB, flash, bridge `--cmd-topic`, caps; Linux `dialout` |
| LED lab no-op | Board without LED cap — use wave or swap variant |
| IMU timeout | Board without IMU cap — use `board_watch` instead |
| ImportError geometry/nav | Pack wheel older than geometry/nav codegen — get updated wheel |
| `ModuleNotFoundError: labs` | Open terminal in workshop root (`SETUP.md` + `labs/`); see `labs/common/README.md` |
| Git Bash topic paths (Windows) | Use **PowerShell** (Bash rewrites `/robot/...`) |
| macOS “cannot be opened” | Privacy & Security → allow `robotos-sim` |
