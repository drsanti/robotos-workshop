# robotos-workshop

Class drop for **robotos**: middleware labs, warehouse sim, and ESP32-S3 board
work. Clone or unzip **this repo only** — CLI, Python wheel(s), and sim are
already under `code/`. You do **not** need the private `robotos` / `robotos-sim`
source repos.

**Supported now:** Windows x64 and macOS Apple Silicon. Linux packs are not
shipped yet.

## Students — start here

Class machines use **VS Code**. Open **this folder** as the workspace
(`File → Open Folder…` → the `robotos-workshop` folder).

### Recommended (Windows + VS Code)

1. **Once per machine:** double-click [`start-here.cmd`](start-here.cmd)  
   — creates `.venv`, installs the wheel, starts the warehouse sim.  
   You can close that cmd window afterward if you prefer VS Code.
2. In VS Code: **Terminal → New Terminal**.  
   `robotos` is already on PATH (workspace settings). If VS Code asks you to
   pick a Python interpreter, choose `.venv`.
3. Check: `robotos topic list` → `/robot/01/cmd_vel`, `odom`, `scan`.
4. Run a lab starter (from workshop root):

   ```text
   scripts\run.cmd list
   scripts\run.cmd wh-01
   scripts\run.cmd hw-02 imu_watch
   ```

5. **Board labs (HW):** double-click [`start-bridge.cmd`](start-bridge.cmd) and
   leave that window open; keep using the VS Code terminal for Python labs.

| OS | Helper |
|----|--------|
| **Windows** | [`start-here.cmd`](start-here.cmd) · HW: [`start-bridge.cmd`](start-bridge.cmd) |
| **macOS** | [`start-here.command`](start-here.command) / `./start-here.sh` · HW: `./start-bridge.sh` |

Full manual steps: [`SETUP.md`](SETUP.md) · ebook [Ch.0](docs/ebook/chapters/ch00-setup-your-machine.md).

### Windows quick smoke (manual PowerShell — optional)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
Start-Process .\code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe
robotos topic list   # expect /robot/01/cmd_vel|odom|scan
```

In a **VS Code** terminal you usually **skip** the `$env:PATH = …` line (settings
already add it). Do **not** restart the sim every time you open a terminal.

### macOS quick smoke (manual)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
open ./code/robotos-sim-v0.1.0-macos-arm64/robotos-sim.app
# Gatekeeper first launch: right-click → Open if blocked
robotos topic list   # expect /robot/01/cmd_vel|odom|scan
```

```text
code/
  NOTES.txt
  robotos-v0.3.0-windows-x64/          + robotos-0.3.0-py3-none-win_amd64.whl
  robotos-sim-v0.1.0-windows-x64/
  robotos-v0.3.0-macos-arm64/          + robotos-0.3.0-py3-none-any.whl
  robotos-sim-v0.1.0-macos-arm64/
```

## Tracks

Typical order if your instructor does not specify otherwise: **MW → WH → HW**.

| Track | Labs | Focus |
|-------|------|--------|
| **MW** | `mw-00` … `mw-06` | Middleware patterns on the laptop graph |
| **WH** | `wh-00` … `wh-08` | Warehouse sim on `/robot/01/*` |
| **HW** | `hw-00` … `hw-07` | ESP32-S3: probe, sense, actuate, params, bag, closed loop |

Each concept has a short theory note and a practice lab
([`docs/lab-outline.md`](docs/lab-outline.md)).

## What’s in this folder

| Path | For students |
|------|----------------|
| [`start-here.cmd`](start-here.cmd) / [`start-here.sh`](start-here.sh) | One-click lab terminal (PATH + venv + sim) |
| [`start-bridge.cmd`](start-bridge.cmd) / [`start-bridge.sh`](start-bridge.sh) | Second window for board `serial-bridge` |
| [`scripts/run.cmd`](scripts/run.cmd) / [`scripts/run`](scripts/run) | `scripts\run.cmd wh-01` — run a lab by short id |
| [`SETUP.md`](SETUP.md) | PATH, wheel, sim, serial-bridge (full manual) |
| [`docs/ebook/`](docs/ebook/) | Ebook chapters (start at Ch.0) |
| [`labs/mw/`](labs/mw/), [`labs/wh/`](labs/wh/), [`labs/hw/`](labs/hw/) | Lab sheets + starters |
| [`code/`](code/) | Prebuilt CLI, wheels, sim |
| [`docs/lab-outline.md`](docs/lab-outline.md) | Concept → theory → lab map |
| [`docs/p0-contract.md`](docs/p0-contract.md) | Warehouse topic names |

Instructor talking points (optional): [`docs/theory/`](docs/theory/).

## Instructors

- Keep `code/` self-contained for every OS you teach (this public tree is the
  student drop).
- Class zip recipe: [`packs/LAYOUT.md`](packs/LAYOUT.md) + `packs/assemble.ps1`
  / `assemble.sh`.
- Smoke log: [`packs/SMOKE.md`](packs/SMOKE.md).
- Rebuild CLI/sim only from the private source repos when you have that
  monorepo checkout — students never need those links.

## License

Closed / workshop use.
