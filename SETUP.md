# SETUP — student machine

Interactive follow-along (optional): https://drsanti.github.io/robotos-workshop-docs/

1. Open **Your setup** → set **OS** + **Workshop folder** (path to this pack).
2. For Run / terminals / Live: run `./scripts/start-host.sh` (Windows: `scripts\start-host.cmd`), paste the **Bearer token** from that window, then **Connect**.
3. Copy-only still works without the host.

Follow **one** section and stop at the end of it.

| Your computer | Read only this |
|---------------|----------------|
| Windows | [Windows](#windows) |
| macOS | [macOS](#macos) |
| Linux | [Linux](#linux) |

`YOUR_WORKSHOP_DIR` is the folder that contains this file, `code/`, and `labs/`. Use a short path without spaces.

Unzip so you see:

```text
robotos-workshop/
  SETUP.md
  scripts/
  labs/
  code/
    robotos-v0.3.0-<os>-<arch>/
    robotos-0.3.0-*.whl
    robotos-sim-v<ver>-<os>-<arch>/
    NOTES.txt
```

- **MW** labs use the CLI and Python. The sim is optional.
- **WH** labs need the warehouse sim when your pack includes it.
- **HW** labs need the board and `serial-bridge`. Close the sim first. The sim and the bridge both use port `7447`.

Two boards. Flash the matching folder. Run HW-01 and follow the caps it prints.

| Board | Firmware | Typical caps | Notes |
|-------|----------|--------------|-------|
| `es3c28p` | `hardware-interface-workshop/firmware-prebuilt/es3c28p/` | `≈ 0x33` | LED + mic |
| `ws28p` | `hardware-interface-workshop/firmware-prebuilt/ws28p/` | `≈ 0x3c` | IMU + RTC; no LED/mic |

Lab map: [`docs/lab-outline.md`](docs/lab-outline.md). Each lab sheet repeats the setup lines, because a new window forgets them.

`robotos` is a file in `code/…/bin`. It is not installed on the computer. Paste each block in full. A new window needs the block again.

## Windows

Use **PowerShell**. Press the `Win` key, type `PowerShell`, and press `Enter`. Stay in this section until you are done.

### 1. Check `robotos`

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
Get-Command robotos
robotos version
```

Expect `robotos 0.3.0` (any `0.3.x` is fine).

Once per machine you can double-click [`scripts/start-here.cmd`](scripts/start-here.cmd). That creates `.venv`, installs the wheel, and starts the sim. The next PowerShell window is still blank. Paste the blocks below again.

### 2. Python

Python 3.10 or newer, from python.org. Tick **Add python.exe to PATH** during install.

```powershell
cd YOUR_WORKSHOP_DIR
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -U pip
python -m pip install .\code\robotos-0.3.0-py3-none-win_amd64.whl
python -c "import robotos; print(robotos.Node.version())"
```

If `.venv` already exists, start at `.\.venv\Scripts\Activate.ps1`. The prompt should show `(.venv)`.

If `Activate.ps1` is blocked, run this once, then activate again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

If the wheel name differs, run `Get-ChildItem .\code\*.whl` and install that file. Use the `win_amd64` wheel.

### 3. Warehouse sim

WH labs need the sim. MW and HW do not.

```powershell
cd YOUR_WORKSHOP_DIR
Start-Process .\code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe
```

Or double-click `robotos-sim.exe` in that folder. Confirm the window says connected / **NATIVE**. If it does not: **Warehouse → Native → External → Connect**. Graded WH labs use Native, not Mock. Do not restart the sim every time you open PowerShell.

### 4. Smoke test

The sim must already be connected.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
robotos topic list
scripts\run.cmd wh-01
```

`topic list` shows `/robot/01/cmd_vel`, `/robot/01/odom`, and `/robot/01/scan`. WH-01 moves the robot about 1 m. Use PowerShell for these commands. Git Bash rewrites paths that start with `/robot/`.

Optional, same window:

```powershell
robotos topic echo /robot/01/odom --count 5
```

### 5. Board (HW labs)

Close the sim first. Two windows.

**Window A — bridge.** Leave it open. Or double-click [`scripts/start-bridge.cmd`](scripts/start-bridge.cmd).

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
$env:ROBOTOS_LISTEN = "tcp/0.0.0.0:7447"
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
```

If auto-detect misses the USB port, add `--probe-settle-ms 2000 --probe-ms 5000`, or set `--port COM17` to the COM port shown in **Device Manager**. `serial-bridge.exe` is next to `robotos.exe`.

**Window B — labs.** A second PowerShell. Do not reuse window A.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
Remove-Item Env:ROBOTOS_LISTEN -ErrorAction SilentlyContinue
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
.\.venv\Scripts\Activate.ps1
robotos topic echo /robot/01/sys/board --count 3
scripts\run.cmd hw-01
```

Run HW-01 before LED or IMU labs. Follow the caps it prints.

### If something fails

| What you see | What to do |
|--------------|------------|
| `robotos` not found | Paste section 1 again in **this** window |
| `Activate.ps1` blocked | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, then activate again |
| Wheel “not supported” | Install `code\robotos-0.3.0-py3-none-win_amd64.whl` |
| `scripts\run.cmd` fails | `cd` to the folder that contains `SETUP.md`, then activate `.venv` |
| `no topics announced` | Sim not connected, or the bridge is down |
| Robot does not move | In the sim: **External**, then **Native**. Keep publishing |
| HW-01 waits forever | Close the sim. Start window A again |
| `CONNECTION_TO_SELF` | Window B must run `Remove-Item Env:ROBOTOS_LISTEN`. Do not listen and connect in one window |
| Git Bash breaks `/robot/...` | Use **PowerShell** |
| Board silent / port busy | Check USB, close other serial programs, set `--port COMx` |
| LED lab does nothing | That board has no LED. Use the other board, or a non-LED lab |
| IMU timeout | That board has no IMU. Use `board_watch` |
| `ModuleNotFoundError: labs` | The window is not in the workshop folder |

End of the Windows section.

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Stay in this section until you are done.

### 1. Check `robotos`

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
chmod +x code/robotos-v0.3.0-macos-arm64/bin/* 2>/dev/null || true
robotos version
```

Expect `robotos 0.3.0` (any `0.3.x` is fine). A new terminal needs this block again.

Once per machine you can double-click [`scripts/start-here.command`](scripts/start-here.command), or run `./scripts/start-here.sh` from this folder. That creates `.venv`, installs the wheel, and opens the sim. The next terminal is still blank. Paste the blocks below again.

### 2. Python

Python 3.10 or newer.

```bash
cd YOUR_WORKSHOP_DIR
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install code/robotos-0.3.0-py3-none-any.whl
python -c "import robotos; print(robotos.Node.version())"
```

If `.venv` already exists, start at `source .venv/bin/activate`. Do not install the `win_amd64` wheel.

### 3. Warehouse sim

```bash
cd YOUR_WORKSHOP_DIR
open code/robotos-sim-v0.1.0-macos-arm64/robotos-sim.app
```

The first launch may say the app cannot be opened. In **Finder**, right-click the app and choose **Open**, or allow it under **System Settings → Privacy & Security**. Confirm connected / **NATIVE**. If not: **Warehouse → Native → External → Connect**. Do not restart the sim every time you open **Terminal**.

### 4. Smoke test

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list
./scripts/run wh-01
```

`topic list` shows `/robot/01/cmd_vel`, `/robot/01/odom`, and `/robot/01/scan`. WH-01 moves the robot about 1 m.

### 5. Board (HW labs)

Close the sim first. Two windows.

**Window A — bridge.** Leave it open. Or run `./scripts/start-bridge.sh` from this folder.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x code/robotos-v0.3.0-macos-arm64/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
```

Auto-detect can skip `/dev/cu.usbmodem*` (`no workshop frame`) and select `/dev/tty.usbmodem…`. Pin the path from the line `[auto] selected`. On the class Mac that path was `/dev/tty.usbmodem101`.

**Window B — labs.** A second terminal.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
unset ROBOTOS_LISTEN
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
robotos topic echo /robot/01/sys/board --count 3
./scripts/run hw-01
```

Run HW-01 before LED or IMU labs. A `ws28p` board prints `caps=0x3c`.

### If something fails

| What you see | What to do |
|--------------|------------|
| `robotos` not found | Paste section 1 again in **this** terminal |
| `python` not found | Use `python3`, then `source .venv/bin/activate` |
| Wheel “not supported” | Install `code/robotos-0.3.0-py3-none-any.whl` |
| `./scripts/run` fails | `cd` to the folder that contains `SETUP.md`, then activate `.venv` |
| “cannot be opened” | **Privacy & Security** → allow `robotos-sim` |
| `no topics announced` | Sim not connected, or the bridge is down |
| Robot does not move | In the sim: **External**, then **Native**. Keep publishing |
| HW-01 waits forever | Close the sim. Start window A again |
| `CONNECTION_TO_SELF` | Window B must `unset ROBOTOS_LISTEN` |
| Auto skips `cu.usbmodem` | Use the `/dev/tty.usbmodem…` path from `[auto] selected` |
| Board silent / port busy | USB, close other serial programs |
| LED lab does nothing | That board has no LED |
| IMU timeout | That board has no IMU. Use `board_watch` |
| `ModuleNotFoundError: labs` | The terminal is not in the workshop folder |

End of the macOS section.

---

## Linux

Use **bash**. Stay in this section until you are done. This class drop often has no `code/robotos-v0.3.0-linux-x64` folder. If `ls code` does not show it, this section does not apply.

### 1. Check `robotos`

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
chmod +x code/robotos-v0.3.0-linux-x64/bin/* 2>/dev/null || true
robotos version
```

Expect `robotos 0.3.0` (any `0.3.x` is fine). A new terminal needs this block again.

### 2. Python

Python 3.10 or newer. On Ubuntu: `sudo apt install python3 python3-venv`.

```bash
cd YOUR_WORKSHOP_DIR
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install code/robotos-0.3.0-py3-none-any.whl
python -c "import robotos; print(robotos.Node.version())"
```

If `.venv` already exists, start at `source .venv/bin/activate`. Do not install the `win_amd64` wheel.

### 3. Warehouse sim

WH labs need a sim binary. This class drop ships Windows and macOS sims. If `code/robotos-sim-v0.1.0-linux-x64` is missing, skip WH and do MW or HW.

```bash
cd YOUR_WORKSHOP_DIR
chmod +x code/robotos-sim-v0.1.0-linux-x64/robotos-sim
./code/robotos-sim-v0.1.0-linux-x64/robotos-sim &
```

Confirm connected / **NATIVE**. If not: **Warehouse → Native → External → Connect**.

### 4. Smoke test

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
robotos topic list
./scripts/run wh-01
```

`topic list` shows `/robot/01/cmd_vel`, `/robot/01/odom`, and `/robot/01/scan`. WH-01 moves the robot about 1 m.

### 5. Board (HW labs)

Close the sim first. Serial access needs the `dialout` group. Run this once, then log out and back in:

```bash
sudo usermod -aG dialout $USER
```

Check with `groups | grep dialout` and `ls -l /dev/ttyACM*`. Do not use `sudo serial-bridge` in place of that.

**Window A — bridge.** Leave it open.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x code/robotos-v0.3.0-linux-x64/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
```

If auto-detect misses the board, add `--port /dev/ttyACM0`.

**Window B — labs.** A second terminal.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
unset ROBOTOS_LISTEN
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
robotos topic echo /robot/01/sys/board --count 3
./scripts/run hw-01
```

Run HW-01 before LED or IMU labs.

### If something fails

| What you see | What to do |
|--------------|------------|
| `robotos` not found | Paste section 1 again in **this** terminal. `chmod +x` the files in `code/robotos-v0.3.0-linux-x64/bin` |
| `python` not found | Use `python3`, then `source .venv/bin/activate` |
| Wheel “not supported” | Install `code/robotos-0.3.0-py3-none-any.whl` |
| `./scripts/run` fails | `cd` to the folder that contains `SETUP.md`, then activate `.venv` |
| Permission denied on `/dev/ttyACM*` | `dialout` group, then log out and back in |
| `no topics announced` | Sim not connected, or the bridge is down |
| HW-01 waits forever | Close the sim. Start window A again |
| `CONNECTION_TO_SELF` | Window B must `unset ROBOTOS_LISTEN` |
| Board silent / port busy | USB, close other serial programs, `--port /dev/ttyACM0` |
| `ModuleNotFoundError: labs` | The terminal is not in the workshop folder |

End of the Linux section.

---

