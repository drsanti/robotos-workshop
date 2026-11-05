# Warehouse labs (WH)

Applied autonomy on the warehouse simulator. Topics follow the teaching
contract on `/robot/01/*` (`cmd_vel`, `odom`, `scan`).

## Prerequisites

- Ch.0 / `scripts/start-here` completed
- Sim running (start-here launches it; do not restart every terminal)
- MW-00 / MW-01 fluency with topics

## Lab index

| Lab | Focus |
|-----|--------|
| `wh-00` | Hello graph |
| `wh-01` | Drive with Twist |
| `wh-02` | Sense odom + scan |
| `wh-03` | Avoid front |
| `wh-04` | Square path (open loop) |
| `wh-05` | Wall follow |
| `wh-06` | State machine |
| `wh-07` | Record bag |
| `wh-08` | Capstone |

## Windows

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd wh-01
```

---

## macOS

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-01
```

---

## Linux

Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-01
```

---

Source of truth: `labs/wh/*/README.md` · contract: `docs/p0-contract.md`.
