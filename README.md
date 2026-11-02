# robotos-workshop

Class drop for **robotos**: middleware labs, warehouse sim, and ESP32-S3 board
work. Clone or unzip **this repo only** — CLI, Python wheel(s), and sim are
already under `code/`. You do **not** need the private `robotos` / `robotos-sim`
source repos.

**Supported now:** Windows x64 and macOS Apple Silicon. Linux packs are not
shipped yet.

## Students — start here

1. Follow [`SETUP.md`](SETUP.md) for your OS  
   (new to terminals? ebook [Ch.0 — setup](docs/ebook/chapters/ch00-setup-your-machine.md)).
2. Put `code/robotos-v0.3.0-<your-os>/bin` on `PATH`, create a venv, install the
   matching wheel from `code/`:
   - Windows: `robotos-0.3.0-py3-none-win_amd64.whl`
   - macOS: `robotos-0.3.0-py3-none-any.whl` (Apple Silicon native lib)
3. Warehouse (WH) labs: start the sim for your OS, then connect as SETUP describes.
4. Smoke: `robotos topic list` should list `/robot/01/cmd_vel`, `odom`, and `scan`.
5. Open labs under `labs/mw`, `labs/wh`, or `labs/hw` as your instructor assigns —
   with ebook chapters in [`docs/ebook/chapters/`](docs/ebook/chapters/).

### Windows quick smoke

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
Start-Process .\code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe
robotos topic list   # expect /robot/01/cmd_vel|odom|scan
```

### macOS quick smoke

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
| [`SETUP.md`](SETUP.md) | PATH, wheel, sim, serial-bridge |
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
