# Lab WH-06 — State machine

## Goal

Replace ad-hoc if/else with an explicit **FSM** and print state changes.

## Learning outcomes

- Define ≥3 named states with clear entry/exit  
- Log every transition  
- Escape “stuck” instead of chatter  

## Prerequisites

- WH-03 / WH-05 helpful  
- Ebook: [`ch08-wall-follow-fsm.md`](../../../docs/ebook/chapters/ch08-wall-follow-fsm.md)

## Suggested states

| State | Behavior |
|-------|----------|
| `CRUISE` | Drive forward slowly |
| `AVOID` | Front blocked → turn |
| `FOLLOW` | (optional) side logic from WH-05 |
| `RECOVER` | Spin / back off if stuck (front+sides all close) |

## Spec (minimum)

- At least **3** states.  
- Log every transition: `t=… CRUISE → AVOID`.  
- Respect cmd_vel timeout (publish in a loop).

## Run

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


### Windows (PowerShell)

```powershell
python labs\wh\wh-06-state-machine\starter\fsm_drive.py
```

### Linux / macOS (bash)

```bash
python labs/wh/wh-06-state-machine/starter/fsm_drive.py
```

## Expected output

Readable transition lines over a ≥90 s run; no freeze in one bad state.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No transitions printed | Logging missing; thresholds never fire |
| Stuck in AVOID | Add RECOVER when all ranges tight |
| Timeout stops | Raise publish rate |

## Done when

A 90 s run shows readable transitions and no freeze in one bad state.

See [CHECKLIST.md](CHECKLIST.md).
