# robotos-workshop

Class drop for **robotos**: middleware labs, warehouse sim, and ESP32-S3 board
work. Clone or unzip **this repo only** — CLI, Python wheel(s), and sim are
already under `code/`. You do **not** need the private `robotos` / `robotos-sim`
source repos.

**Supported now:** Windows x64 and macOS Apple Silicon. Linux packs are not
shipped yet.

## Students — start here

`YOUR_WORKSHOP_DIR` is this folder: it contains `SETUP.md`, `code/`, and `labs/`.

`robotos` is a file inside `code/…/bin`. It is not installed on the computer. A new PowerShell, Terminal, Cursor, or VS Code window does not remember it. Every command block below starts with `cd` and the PATH line for your computer. Paste the **whole** block. If you open another window, paste the whole block again. Do not skip the PATH line.

Each lab sheet repeats those same first lines. Open the lab README and paste its block. Do not type only the last line.

### Once per machine

| OS | What to double-click |
|----|----------------------|
| **Windows** | [`scripts/start-here.cmd`](scripts/start-here.cmd) — creates `.venv`, installs the wheel, starts the warehouse sim |
| **macOS** | [`scripts/start-here.command`](scripts/start-here.command) (or `./scripts/start-here.sh` from a terminal that is already in this folder) |

You can close that helper window. The next terminal is blank again.

### Check the CLI

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos topic list
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos topic list
```

With the sim running, expect `/robot/01/cmd_vel`, `odom`, and `scan`. An empty list means the sim is not running. It does not mean you typed the command wrong.

### Run a lab

Open that lab's README and paste its block. Example after the PATH lines above, in the **same** window:

**Windows:** `.\.venv\Scripts\Activate.ps1` then `scripts\run.cmd wh-01`  
**macOS:** `source .venv/bin/activate` then `./scripts/run wh-01`

If activate says `.venv` does not exist, do [MW-00](labs/mw/mw-00-getting-started/README.md) first.

**Board labs (HW):** close the sim. Windows: double-click [`scripts/start-bridge.cmd`](scripts/start-bridge.cmd) and leave it open. macOS: in a terminal, `cd YOUR_WORKSHOP_DIR` then `./scripts/start-bridge.sh`. Then open the HW lab README and paste its block in a **second** window.

| OS | Helper |
|----|--------|
| **Windows** | [`scripts/start-here.cmd`](scripts/start-here.cmd) · HW: [`scripts/start-bridge.cmd`](scripts/start-bridge.cmd) |
| **macOS** | [`scripts/start-here.command`](scripts/start-here.command) / `./scripts/start-here.sh` · HW: `./scripts/start-bridge.sh` |

Full manual steps: [`SETUP.md`](SETUP.md) · ebook [Ch.0](docs/ebook/chapters/ch00-setup-your-machine.md).

### Windows quick smoke (manual PowerShell — optional)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
Start-Process .\code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe
robotos topic list   # expect /robot/01/cmd_vel|odom|scan
```

Do **not** skip `$env:PATH`. Do **not** restart the sim every time you open a terminal. A new terminal still needs `cd` and the PATH line.

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
| **HW** | `hw-00` … `hw-07` | ESP32-S3 (`es3c28p` / `ws28p`): probe, sense, actuate, params, bag, closed loop — [`labs/hw/README.md`](labs/hw/README.md) |

Each concept has a short theory note and a practice lab
([`docs/lab-outline.md`](docs/lab-outline.md)).

## What’s in this folder

| Path | For students |
|------|----------------|
| [`scripts/`](scripts/) | `start-here` / `start-bridge` / `run` — all student helpers |
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
