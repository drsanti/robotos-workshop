# Student helpers (`scripts/`)

All day-1 shortcuts live here (not in the workshop root).

| Script | OS | What it does |
|--------|-----|----------------|
| [`start-here.cmd`](start-here.cmd) | Windows | PATH + first-time `.venv`/wheel + start sim + open a ready cmd window |
| [`start-bridge.cmd`](start-bridge.cmd) | Windows | Second window: `serial-bridge` for HW labs |
| [`start-here.sh`](start-here.sh) / [`start-here.command`](start-here.command) | macOS / Linux | Same idea in Terminal / Finder |
| [`start-bridge.sh`](start-bridge.sh) | macOS / Linux | Board bridge |
| [`run.cmd`](run.cmd) / [`run`](run) / [`run.py`](run.py) | All | Run a lab by short id: `scripts\run.cmd wh-01` |

## Class flow (VS Code)

1. Open the **workshop root** folder in VS Code.  
2. Once: double-click `scripts\start-here.cmd` (or `./scripts/start-here.sh`).  
3. **Terminal → New Terminal** — `robotos` is already on PATH (`.vscode/settings.json`).  
4. WH / MW: `scripts\run.cmd wh-01` (etc.).  
5. **HW (two clicks):** close sim → `scripts\start-bridge.cmd` →  
   `scripts\run.cmd hw-01`  
   (`run` auto-sets `ROBOTOS_CONNECT` for `hw-*`; no env typing.)

Details: [`../SETUP.md`](../SETUP.md) · ebook Ch.0.
