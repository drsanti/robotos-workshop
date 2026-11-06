# robotos-workshop

Class drop for **robotos**: middleware labs, warehouse sim, and ESP32-S3 board
work. Clone or unzip **this repo only** — CLI, Python wheel(s), and sim are
already under `code/`. You do **not** need the private `robotos` / `robotos-sim`
source repos.

**Supported now:** Windows x64 and macOS Apple Silicon. Linux packs are not
shipped yet.

## Students — start here

`YOUR_WORKSHOP_DIR` is this folder: it contains `SETUP.md`, `code/`, and `labs/`.

`robotos` is a file inside `code/…/bin`. It is not installed on the computer. A new window does not remember it. Paste the **whole** block in your section. If you open another window, paste the whole block again.

Each lab sheet repeats those same first lines. Full manual steps: [`SETUP.md`](SETUP.md) · ebook [Ch.0](docs/ebook/chapters/ch00-setup-your-machine.md).

## Windows

Use **PowerShell**. Stay in this section until you are done.

Once: double-click [`scripts/start-here.cmd`](scripts/start-here.cmd). That creates `.venv`, installs the wheel, and starts the sim. You can close that helper window. The next PowerShell window is blank again.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
robotos topic list
scripts\run.cmd wh-01
```

With the sim running, expect `/robot/01/cmd_vel`, `odom`, and `scan`. An empty list means the sim is not running.

If activate says `.venv` does not exist, do [MW-00](labs/mw/mw-00-getting-started/README.md) first.

Board labs: close the sim, double-click [`scripts/start-bridge.cmd`](scripts/start-bridge.cmd), and leave it open. Paste the HW lab block in a second window.

Optional smoke, same window. Do not restart the sim every time you open PowerShell.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
Start-Process .\code\robotos-sim-v0.1.0-windows-x64\robotos-sim.exe
robotos topic list
```

```text
code/
  NOTES.txt
  robotos-v0.3.0-windows-x64/
  robotos-0.3.0-py3-none-win_amd64.whl
  robotos-sim-v0.1.0-windows-x64/
```

---

## macOS

Use **Terminal** on Apple Silicon. Stay in this section until you are done.

Once: double-click [`scripts/start-here.command`](scripts/start-here.command), or run `./scripts/start-here.sh` from this folder. You can close that helper window. The next Terminal window is blank again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list
./scripts/run wh-01
```

With the sim running, expect `/robot/01/cmd_vel`, `odom`, and `scan`. An empty list means the sim is not running.

If activate says `.venv` does not exist, do [MW-00](labs/mw/mw-00-getting-started/README.md) first.

Board labs: close the sim. In a terminal, `cd YOUR_WORKSHOP_DIR` then `./scripts/start-bridge.sh`. Leave it open. Paste the HW lab block in a second window.

Optional smoke, same window. The first launch may need a right-click → **Open**.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
open ./code/robotos-sim-v0.1.0-macos-arm64/robotos-sim.app
robotos topic list
```

```text
code/
  NOTES.txt
  robotos-v0.3.0-macos-arm64/
  robotos-0.3.0-py3-none-any.whl
  robotos-sim-v0.1.0-macos-arm64/
```

---

## Linux

Use **bash**. Stay in this section until you are done. Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
robotos topic list
./scripts/run wh-01
```

Board labs: close the sim, run `./scripts/start-bridge.sh` from this folder, and leave it open. Paste the HW lab block in a second window.

---

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
| [`scripts/`](scripts/) | `start-here` / `start-bridge` / `start-host` / `run` — student helpers |
| [`SETUP.md`](SETUP.md) | PATH, wheel, sim, serial-bridge (full manual) |
| [`docs/ebook/`](docs/ebook/) | Ebook chapters (start at Ch.0) |
| [`labs/mw/`](labs/mw/), [`labs/wh/`](labs/wh/), [`labs/hw/`](labs/hw/) | Lab sheets + starters |
| [`code/`](code/) | Prebuilt CLI, wheels, sim |
| [`docs/lab-outline.md`](docs/lab-outline.md) | Concept → theory → lab map |
| [`docs/p0-contract.md`](docs/p0-contract.md) | Warehouse topic names |
| Interactive docs (optional) | https://drsanti.github.io/robotos-workshop-docs/ |

Instructor talking points (optional): [`docs/theory/`](docs/theory/).

## Instructors

- Keep `code/` self-contained for every OS you teach (this public tree is the
  student drop).
- Class zip recipe: [`packs/LAYOUT.md`](packs/LAYOUT.md) + `packs/assemble.ps1`
  / `assemble.sh`.
- Smoke log: [`packs/SMOKE.md`](packs/SMOKE.md).
- Rebuild CLI/sim only from the private source repos when you have that
  monorepo checkout — students never need those links.
- Interactive docs **source** + `workshop-host` source live in private
  `robotos-workshop-tools/`. Students get the public Pages site and/or a
  prebuilt `workshop-host` under `code/robotos-v*/bin/` (see tools
  `PUBLISH.md`). Rebuild Windows `.exe` on a Windows host:
  tools `WINDOWS-SHIP.md` → `.\scripts\ship-host.ps1`.

## License

Closed / workshop use.
