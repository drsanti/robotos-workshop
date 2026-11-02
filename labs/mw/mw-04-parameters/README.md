# MW-04 — Parameters (& lifecycle)

## Goal

Change live node config with `robotos param` while `tuning_node` runs.

## Learning outcomes

- Declare/read params from a node  
- `list` / `get` / `set` from a second terminal  
- Optional: peek at lifecycle CLI  

## Prerequisites

- MW-00…02; PATH + `.venv` in both terminals  
- Ebook: [`ch10-params-lifecycle.md`](../../../docs/ebook/chapters/ch10-params-lifecycle.md)  
- Theory: [`docs/theory/10-params-lifecycle.md`](../../../docs/theory/10-params-lifecycle.md)

## Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


### Terminal A — node

**Windows (PowerShell)**

```powershell
python labs\mw\mw-04-parameters\starter\tuning_node.py
```

**Linux / macOS (bash)**

```bash
python labs/mw/mw-04-parameters/starter/tuning_node.py
```

### Terminal B — CLI

**Windows (PowerShell)**

```powershell
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint
```

**Linux / macOS (bash)**

```bash
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint
```

Lifecycle: `robotos lifecycle --help` and pack NOTES for get/set state.

## Expected output

Node printout shows `setpoint` / `mode` updating after CLI set.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Node missing from `param list` | A not running; name typo |
| Set fails | Type/allow rules — see CLI error |
| command not found | PATH + `.venv` |

## Done when

Live `setpoint` / `mode` printout changes after a CLI set.

See [CHECKLIST.md](CHECKLIST.md).
