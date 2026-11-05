# Student helpers (`scripts/`)

All day-1 shortcuts live here (not in the workshop root).

| Script | OS | What it does |
|--------|-----|----------------|
| [`start-here.cmd`](start-here.cmd) | Windows | PATH + first-time `.venv`/wheel + start sim + open a ready cmd window |
| [`start-bridge.cmd`](start-bridge.cmd) | Windows | Second window: `serial-bridge` for HW labs |
| [`start-here.sh`](start-here.sh) / [`start-here.command`](start-here.command) | macOS / Linux | Same idea in Terminal / Finder |
| [`start-bridge.sh`](start-bridge.sh) | macOS / Linux | Board bridge |
| [`run.cmd`](run.cmd) / [`run`](run) / [`run.py`](run.py) | All | Run a lab by short id: `scripts\run.cmd wh-01` |
| [`wifi-cfg.cmd`](wifi-cfg.cmd) | Windows | Optional: push SSID/password + zenoh `--connect` (needs `start-bridge`) |
## Class flow

1. Open the **workshop root** folder (it contains `SETUP.md`). Any terminal works: PowerShell, Terminal, Cursor, or VS Code.  
2. Once: double-click `scripts\start-here.cmd` (Windows) or `./scripts/start-here.sh` (macOS, after `cd` to the workshop root).  
3. Every new window starts blank. Paste the lab README's whole block, including `cd` and the PATH line. Do not assume VS Code already set PATH.  
4. WH / MW: that block ends with `scripts\run.cmd wh-01` (Windows) or `./scripts/run wh-01` (macOS).  
5. **HW:** close the sim, start the bridge (`scripts\start-bridge.cmd` or `./scripts/start-bridge.sh` from the workshop root), then paste the HW lab block in a second window. `run` sets `ROBOTOS_CONNECT` for `hw-*`.

Details: [`../SETUP.md`](../SETUP.md) · ebook Ch.0.
