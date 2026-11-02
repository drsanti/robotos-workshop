# Lab WH-05 — Wall follow

## Goal

Follow a wall using the three rangers (default: **right** wall).

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
python labs\wh\wh-05-wall-follow\starter\wall_follow.py --target 0.7 --k 1.0
```

## Run

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


### Windows (PowerShell)

```powershell
python labs\wh\wh-05-wall-follow\starter\wall_follow.py
python labs\wh\wh-05-wall-follow\starter\wall_follow.py --side left --target 0.7 --k 1.0
```

### Linux / macOS (bash)

```bash
python labs/wh/wh-05-wall-follow/starter/wall_follow.py
python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side left --target 0.7 --k 0.8
```

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
