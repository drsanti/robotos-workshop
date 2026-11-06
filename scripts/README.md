# Student helpers (`scripts/`)

All day-1 shortcuts live here (not in the workshop root).

Details: [`../SETUP.md`](../SETUP.md) · ebook Ch.0.

## Windows

| Script | What it does |
|--------|----------------|
| [`start-here.cmd`](start-here.cmd) | First time: `.venv`, wheel, sim, and a ready window |
| [`start-bridge.cmd`](start-bridge.cmd) | Second window: `serial-bridge` for HW labs |
| [`start-host.cmd`](start-host.cmd) | Interactive docs Connect (`workshop-host.exe` on `:7420`) |
| [`run.cmd`](run.cmd) | Run a lab: `scripts\run.cmd wh-01` |
| [`wifi-cfg.cmd`](wifi-cfg.cmd) | Optional: push SSID/password. Needs the bridge |

1. Open the workshop root (it contains `SETUP.md`) in PowerShell.
2. Once: double-click `scripts\start-here.cmd`.
3. Every new window starts blank. Paste the lab README's whole block.
4. WH / MW: that block ends with `scripts\run.cmd wh-01`.
5. HW: close the sim, start `scripts\start-bridge.cmd`, then paste the HW lab block in a second window.
6. Optional docs Connect: `scripts\start-host.cmd` → yellow Bearer token → paste at https://drsanti.github.io/robotos-workshop-docs/

---

## macOS

| Script | What it does |
|--------|----------------|
| [`start-here.sh`](start-here.sh) / [`start-here.command`](start-here.command) | First time: `.venv`, wheel, and the sim |
| [`start-bridge.sh`](start-bridge.sh) | Board bridge |
| [`start-host.sh`](start-host.sh) / [`start-host.command`](start-host.command) | Interactive docs Connect (`workshop-host` on `:7420`) |
| [`run`](run) | Run a lab: `./scripts/run wh-01` |

1. Open the workshop root in Terminal.
2. Once: `./scripts/start-here.sh` after `cd` to that folder, or double-click `start-here.command`.
3. Every new window starts blank. Paste the lab README's whole block.
4. WH / MW: that block ends with `./scripts/run wh-01`.
5. HW: close the sim, run `./scripts/start-bridge.sh`, then paste the HW lab block in a second window.
6. Optional docs Connect: `./scripts/start-host.sh` → yellow Bearer token → paste at https://drsanti.github.io/robotos-workshop-docs/

---

## Linux

| Script | What it does |
|--------|----------------|
| [`start-here.sh`](start-here.sh) | First time: `.venv` and wheel, when the Linux pack is in the drop |
| [`start-bridge.sh`](start-bridge.sh) | Board bridge |
| [`run`](run) | Run a lab: `./scripts/run wh-01` |

Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

1. Open the workshop root in a terminal.
2. Once: `./scripts/start-here.sh` after `cd` to that folder.
3. Every new window starts blank. Paste the lab README's whole block.
4. WH / MW: that block ends with `./scripts/run wh-01`.
5. HW: close the sim, run `./scripts/start-bridge.sh`, then paste the HW lab block in a second window.

---
