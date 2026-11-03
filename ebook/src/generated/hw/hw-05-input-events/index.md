# HW-05 — Discrete inputs (touch / keys)

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-05` · **Folder:** `hw-05-input-events`

```text
# from workshop root
scripts\run.cmd hw-05
# Unix: ./scripts/run hw-05
# prerequisite: scripts/start-bridge running; sim closed
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-05-input-events/README.md</code></p>

</div>


## Goal

Treat button/touch as **events on topics**, not host-side GPIO polling.

## Learning outcomes

- Subscribe to touch/UI event topics  
- Match host log lines to physical presses  
- Optional duration arg for non-interactive runs  

## Prerequisites

- HW-00/01 (BTN cap helpful)  
- Ebook: [`ch04-board-on-graph.md`](../../../chapters/ch04-board-on-graph.md)

## Topics

`/robot/01/input/touch`, `/robot/01/display/ui/event` (as available).

## Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


### Windows (PowerShell)

```powershell
python labs\hw\hw-05-input-events\starter\touch_watch.py
python labs\hw\hw-05-input-events\starter\touch_watch.py 10
```

### Linux / macOS (bash)

```bash
python labs/hw/hw-05-input-events/starter/touch_watch.py
python labs/hw/hw-05-input-events/starter/touch_watch.py 10
```

Press/short/long on the device; watch host prints.

## Expected output

```text
watching /robot/01/input/touch + … 
touch gest=0 [id=… DOWN (x,y)]
touch gest=0 [id=… UP (x,y)]
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No events | Caps lack BTN/touch; bridge; wrong connect |
| Script hangs forever | Pass seconds arg or Ctrl-C |

## Done when

Host log shows events that match your presses.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-05-input-events/CHECKLIST.md</code></p>

### HW-05 checklist

- [ ] Events appear on host when interacting with the board
- [ ] Can explain event vs continuous sensor stream
