# Lab WH-06 — State machine

<div class="ebook-run">

**Track:** `wh` (Warehouse) · **Lab:** `wh-06` · **Folder:** `wh-06-state-machine`

```text
# from workshop root
scripts\run.cmd wh-06
# Unix: ./scripts/run wh-06
# prerequisite: warehouse sim running (scripts/start-here)
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-06-state-machine/README.md</code></p>

</div>


## Goal

Replace ad-hoc if/else with an explicit **FSM** and print state changes.

## Learning outcomes

- Define ≥3 named states with clear entry/exit  
- Log every transition  
- Escape “stuck” instead of chatter  

## Prerequisites

- WH-03 / WH-05 helpful  
- Ebook: [`ch08-wall-follow-fsm.md`](../../../chapters/ch08-wall-follow-fsm.md)

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

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-06-state-machine/CHECKLIST.md</code></p>

### Lab 06 checklist

- [ ] ≥3 named states
- [ ] Transitions printed
- [ ] 90 s run without permanent stuck state
