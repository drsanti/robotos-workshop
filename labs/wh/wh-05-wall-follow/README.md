# Lab WH-05 — Wall follow

## Goal

Follow a wall using the three rangers (default: **right** wall).

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/README.md) first, then come back and paste the block again.

## Learning outcomes

- Hold side range near a target band with a steering gain  
- Interrupt follow when front is blocked  
- Keep `cmd_vel` flowing (≥ ~10 Hz; starter 20 Hz)  

## Prerequisites

- WH-03; External + Native + Connect  
- Ebook: [`ch08-wall-follow-fsm.md`](../../../docs/ebook/chapters/ch08-wall-follow-fsm.md)  
- Theory: [`docs/theory/05-wall-follow-fsm.md`](../../../docs/theory/05-wall-follow-fsm.md)

## Spec (minimum)

- Keep side range near **0.5–0.9 m** (tune `--target`).  
- If front `ranges[1]` close → turn away (same idea as WH-03).  
- Continuous publish so timeout does not kill you.

## Starter defaults

| Flag | Default | Role |
|------|---------|------|
| `--side` | `right` | Wall to follow (`left` / `right`) |
| `--target` | `0.7` | Desired side range [m] |
| `--front-stop` | `0.55` | Front range → spin away [m] |
| `--vx` | `0.18` | Cruise speed [m/s] |
| `--k` | `1.2` | Steering gain on range error |

`wz ≈ side_sign × k × (target − side_range)`, clamped to ±1.2 rad/s.  
Oscillates → lower `--k` (try `0.8`). Leaves wall → raise `--k` or check `--side`.

## Hint

Too far from wall → forward + turn **toward** wall.  
Too close → turn **away**.  
Front blocked → hard turn / spin away from wall side.

**Setup:** Sim **Reset** should seat you in the aisle west of the first rack
(right ranger ~0.7 m, heading up the aisle). Use **External**, then run the
default **right** wall command. Status prints `follow` when locked; `seek-no-wall`
means that side is free — if it notes “wall on the OTHER side”, flip `--side`
or Manual-reseat.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\wh\wh-05-wall-follow\starter\wall_follow.py --target 0.7 --k 1.0
```

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Run

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>`. List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\wh\wh-05-wall-follow\starter\wall_follow.py
python labs\wh\wh-05-wall-follow\starter\wall_follow.py --side left --target 0.7 --k 1.0
```

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### Run

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-05-wall-follow/starter/wall_follow.py
python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side left --target 0.7 --k 0.8
```

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### Run

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-05-wall-follow/starter/wall_follow.py
python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side left --target 0.7 --k 0.8
```

---

## Expected behavior

Lap a shelf aisle ≥60 s without tunneling or spinning forever.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Spins / circles in open | Drive to a rack aisle first; watch for `seek-no-wall` in the status line |
| Status shows side ≈ 3.0 | No wall on that side — wrong `--side` or still in open floor |
| Oscillates | Lower `--k` |
| Leaves wall | Raise `--k` / check `--side` |
| Hits corners | `--front-stop` too small |
| `front-avoid` forever | Point down the aisle, not into the rack |

## Done when

You can lap a shelf aisle for ≥60 s without tunneling or spinning forever.

See [CHECKLIST.md](CHECKLIST.md).
