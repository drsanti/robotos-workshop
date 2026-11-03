# HW-04 — Board parameters

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-04` · **Folder:** `hw-04-board-params`

```text
# from workshop root
scripts\run.cmd hw-04
# Unix: ./scripts/run hw-04
# prerequisite: scripts/start-bridge running; sim closed
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-04-board-params/README.md</code></p>

</div>


## Goal

List / get / set board parameters (optional persist to NVM).

## Learning outcomes

- Use the same param idea as MW-04 on silicon  
- Confirm get-after-set; stretch persist across unplug  

## Prerequisites

- HW-00 bridge with `--cmd-topic all`; HW-01  
- Ebook: [`ch10-params-lifecycle.md`](../../../chapters/ch10-params-lifecycle.md)  
- Theory: [`docs/theory/10-params-lifecycle.md`](../../../docs/theory/10-params-lifecycle.md)

## Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


### Windows (PowerShell)

```powershell
python labs\hw\hw-04-board-params\starter\param_getset.py list
python labs\hw\hw-04-board-params\starter\param_getset.py get <name>
python labs\hw\hw-04-board-params\starter\param_getset.py set <name> <value>
python labs\hw\hw-04-board-params\starter\param_getset.py set <name> <value> --persist
```

### Linux / macOS (bash)

```bash
python labs/hw/hw-04-board-params/starter/param_getset.py list
python labs/hw/hw-04-board-params/starter/param_getset.py get <name>
python labs/hw/hw-04-board-params/starter/param_getset.py set <name> <value>
python labs/hw/hw-04-board-params/starter/param_getset.py set <name> <value> --persist
```

Replace `<name>` / `<value>` from `list` output (e.g. uplink / wifi fields as shipped).

## Expected output

`list` prints names; `get` after `set` shows the new value.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Empty list / timeout | Bridge + `ROBOTOS_CONNECT`; `--cmd-topic all` |
| Persist ignored | Param not NVM-backed on this firmware |
| Set rejected | Type/range — read command error |

## Done when

A get after set shows the new value; stretch = unplug/replug and re-get a persisted param.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-04-board-params/CHECKLIST.md</code></p>

### HW-04 checklist

- [ ] `list` shows params
- [ ] `set` + `get` roundtrip
- [ ] (stretch) persist across power cycle
