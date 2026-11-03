# Lab WH-05 — Wall follow

<div class="ebook-run">

**Track:** `wh` (Warehouse) · **Lab:** `wh-05` · **Folder:** `wh-05-wall-follow`

```text
# from workshop root
scripts\run.cmd wh-05
# Unix: ./scripts/run wh-05
# prerequisite: warehouse sim running (scripts/start-here)
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-05-wall-follow/README.md</code></p>

</div>


## Goal

Follow a wall using the three rangers (default: **right** wall).

## Learning outcomes

- Hold side range near a target band with a steering gain  
- Interrupt follow when front is blocked  
- Keep `cmd_vel` flowing (≥ ~10 Hz; starter 20 Hz)  

## Prerequisites

- WH-03; External + Native + Connect  
- Ebook: [`ch08-wall-follow-fsm.md`](../../../chapters/ch08-wall-follow-fsm.md)  
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

Start near a rack aisle (Reset leaves you in open floor at ~2 m, 2 m — drive
toward a brown shelf first, or the side ranger stays at max range and steering
saturates into a circle).

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
| Oscillates | Lower `--k` |
| Leaves wall | Raise `--k` / check `--side` |
| Hits corners | `--front-stop` too small |

## Done when

You can lap a shelf aisle for ≥60 s without tunneling or spinning forever.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-05-wall-follow/CHECKLIST.md</code></p>

### Lab 05 checklist

- [ ] Side range used for steering (not only front)
- [ ] Front obstacle still handled
- [ ] ≥60 s continuous run without tunnel
