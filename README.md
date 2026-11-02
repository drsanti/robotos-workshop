# robotos-workshop

Closed-source **lab packs** and **theory + practice** curriculum for robotos.

**Content goal:** middleware concepts, warehouse-sim autonomy, **and ESP32-S3 board labs** (read sensors + command actuators) — instructor owns scheduling.

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
| [`packs/`](packs/) | Assemble recipe — start at [`packs/LAYOUT.md`](packs/LAYOUT.md) |
| [`code/`](code/) | Binaries at ship time |

## Tracks

| Track | Labs | Focus |
|-------|------|--------|
| **MW** | `mw-00` … `mw-06` | Middleware patterns on the laptop graph |
| **WH** | `wh-00` … `wh-08` | Warehouse sim on `/robot/01/*` |
| **HW** | `hw-00` … `hw-07` | ESP32-S3: probe, sense, actuate, params, bag, closed loop |

Format: theory note → practice lab for each concept ([`docs/lab-outline.md`](docs/lab-outline.md)).

## Maintainer / agents

- Assemble student zip: [`packs/LAYOUT.md`](packs/LAYOUT.md) + `packs/assemble.ps1`
- **Build Mac/Linux warehouse sim packs (P2.1):** follow sibling
  [`robotos-sim/docs/workshop-bundle-building.md`](../robotos-sim/docs/workshop-bundle-building.md)
  (Mac → `macos-arm64` only; Linux/CI → `linux-x64`; do not cross-build Tauri)
- CLI + wheels: [`robotos/docs/workshop-bundle-building.md`](../robotos/docs/workshop-bundle-building.md)
- Smoke log: [`packs/SMOKE.md`](packs/SMOKE.md)

## License

Closed / workshop use.
