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

## Hint

Too far from wall → forward + turn toward wall.  
Too close → turn away.  
Front blocked → hard turn / spin away from wall side.

## Run

### Windows (PowerShell)

```powershell
python labs\wh\wh-05-wall-follow\starter\wall_follow.py
python labs\wh\wh-05-wall-follow\starter\wall_follow.py --side left --target 0.7 --k 1.0
```

### Linux / macOS (bash)

```bash
python labs/wh/wh-05-wall-follow/starter/wall_follow.py
python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side left --target 0.7 --k 1.0
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
