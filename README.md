# robotos-workshop

Closed-source **lab packs** and **theory + practice** curriculum for robotos.

**Students only need this folder** — `code/` ships prebuilt CLI, wheel(s), and
warehouse sim. Do **not** clone `robotos` or `robotos-sim` source for class labs.

## Contents

| Path | Purpose |
|------|---------|
| [`docs/lab-outline.md`](docs/lab-outline.md) | Content map (concept → theory → lab) |
| [`docs/coverage.md`](docs/coverage.md) | Checklist vs `nd3/docs` week02–03 |
| [`docs/ebook/`](docs/ebook/) | **Student ebook chapters** + style + persona QA |
| [`docs/theory/`](docs/theory/) | Instructor talking points (short) |
| [`docs/p0-contract.md`](docs/p0-contract.md) | Warehouse topic contract |
| [`SETUP.md`](SETUP.md) | PATH, wheel, sim (see also ebook Ch.0) |
| [`labs/mw/`](labs/mw/) | Middleware labs (`mw-00` … `mw-06`) |
| [`labs/wh/`](labs/wh/) | Warehouse labs (`wh-00` … `wh-08`) |
| [`labs/hw/`](labs/hw/) | ESP32-S3 board labs (`hw-00` … `hw-07`) |
| [`packs/`](packs/) | Maintainer assemble recipe — [`packs/LAYOUT.md`](packs/LAYOUT.md) |
| [`code/`](code/) | **Shipped packs** — required; clone is self-contained |

```text
code/
  NOTES.txt
  robotos-v0.3.0-windows-x64/
  robotos-0.3.0-py3-none-win_amd64.whl
  robotos-sim-v0.1.0-windows-x64/
  robotos-v0.3.0-macos-arm64/
  robotos-sim-v0.1.0-macos-arm64/
  # linux-x64 + matching wheels when built
```

**Class OS focus:** Windows x64 + macOS arm64. Linux packs deferred for now.

## Tracks

| Track | Labs | Focus |
|-------|------|--------|
| **MW** | `mw-00` … `mw-06` | Middleware patterns on the laptop graph |
| **WH** | `wh-00` … `wh-08` | Warehouse sim on `/robot/01/*` |
| **HW** | `hw-00` … `hw-07` | ESP32-S3: probe, sense, actuate, params, bag, closed loop |

Format: theory note → practice lab for each concept ([`docs/lab-outline.md`](docs/lab-outline.md)).

## Students

Clone (or unzip) this repo and follow [`SETUP.md`](SETUP.md) for **your** OS.

### macOS quick smoke

```bash
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
open ./code/robotos-sim-v0.1.0-macos-arm64/robotos-sim.app
# Gatekeeper first launch: right-click → Open if blocked
robotos topic list   # expect /robot/01/cmd_vel|odom|scan
```

Install the matching wheel from `code/*.whl` (Windows: `win_amd64`; macOS wheel
added when packaged — until then use the Mac wheel from the instructor if
`SETUP.md` names one).

## Maintainer / agents

- Keep `code/` self-contained for every OS you teach; do not ship a docs-only tree
- Optional class zip: [`packs/LAYOUT.md`](packs/LAYOUT.md) + `packs/assemble.ps1`
- Sim builds: [`robotos-sim/docs/workshop-bundle-building.md`](../robotos-sim/docs/workshop-bundle-building.md)
- CLI + wheels: [`robotos/docs/workshop-bundle-building.md`](../robotos/docs/workshop-bundle-building.md)
- Smoke log: [`packs/SMOKE.md`](packs/SMOKE.md)

## License

Closed / workshop use.
