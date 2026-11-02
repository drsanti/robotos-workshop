# Lab WH-04 — Square path (open loop)

## Goal

Drive an approximate square using timed `linear.x` / `angular.z` segments; compare to odom.

## Learning outcomes

- Build an open-loop timed sequence within contract clamps  
- Measure start/end odom and report closure error honestly  
- Contrast with WH-03 feedback near obstacles  

## Prerequisites

- WH-00…03; External + Native + Connect; PATH + `.venv`  
- Ebook: [`ch05-feedback-control.md`](../../../docs/ebook/chapters/ch05-feedback-control.md) (open vs closed)

## Run

### Windows (PowerShell)

```powershell
python labs\wh\wh-04-square-path\starter\square.py
python labs\wh\wh-04-square-path\starter\square.py --side 0.8 --vx 0.2
```

### Linux / macOS (bash)

```bash
python labs/wh/wh-04-square-path/starter/square.py
python labs/wh/wh-04-square-path/starter/square.py --side 0.8 --vx 0.2
```

## Spec (minimum)

1. Choose `v` and `ω` within contract clamps.  
2. Sequence: forward → turn 90° → repeat ×4.  
3. Log start/end odom pose; report how far the path closed.

## Notes

Open loop will drift — grading is “attempted square + honest odom delta,” not millimeter closure. Obstacles make timed squares worse; that is the lesson vs WH-03.

## Expected output

Script completes four sides; you record Δx/Δy (and yaw) start→end.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Hits shelf mid-square | Clearer space or slower `--vx`; expect failure vs feedback |
| No motion | External mode; timeout / publish inside starter |

## Done when

You can explain why WH-03 (feedback) and WH-04 (open loop) behave differently near obstacles.

See [CHECKLIST.md](CHECKLIST.md).
