# HW-03 — Command the board

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-03` · **Folder:** `hw-03-command-actuators`

```text
# from workshop root
scripts\run.cmd hw-03
# Unix: ./scripts/run hw-03
# prerequisite: scripts/start-bridge running; sim closed
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-03-command-actuators/README.md</code></p>

</div>


## Goal

Publish actuator commands and see/hear the effect.

## Learning outcomes

- Check HW-01 caps before LED demos  
- Publish LED fx and/or wave commands with bridge `--cmd-topic all`  
- Turn effectors **off** cleanly when finished  

## Prerequisites

- HW-00 bridge with `--cmd-topic all`; HW-01 caps  
- `ROBOTOS_CONNECT` + PATH + `.venv`  
- Ebook: [`ch04-board-on-graph.md`](../../../chapters/ch04-board-on-graph.md) (command vs read)

## Topics (examples)

| Topic | Starter |
|-------|---------|
| `/robot/01/actuator/led/fx` | `led_fx.py` (needs LED cap) |
| `/robot/01/effect/wave/cmd` | `wave_play.py` (often available even without LED) |

## Practice

> **Preferred runner** (workshop root): this lab has multiple starters — `scripts\run.cmd hw-03 <starter>` (Windows) or `./scripts/run hw-03 <starter>` (macOS/Linux). Starters: `led_fx / wave_play`. List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


**LED** (caps LED — often `es3c28p`; **no** on many `ws28p`):

### Windows (PowerShell)

```powershell
python labs\hw\hw-03-command-actuators\starter\led_fx.py solid 0 40 0
python labs\hw\hw-03-command-actuators\starter\led_fx.py blink 5 120 120 255 0 0
python labs\hw\hw-03-command-actuators\starter\led_fx.py off
```

### Linux / macOS (bash)

```bash
python labs/hw/hw-03-command-actuators/starter/led_fx.py solid 0 40 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py blink 5 120 120 255 0 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py off
```

**Wave / tone** (both variants typically):

### Windows (PowerShell)

```powershell
python labs\hw\hw-03-command-actuators\starter\wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs\hw\hw-03-command-actuators\starter\wave_play.py --off
```

### Linux / macOS (bash)

```bash
python labs/hw/hw-03-command-actuators/starter/wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs/hw/hw-03-command-actuators/starter/wave_play.py --off
```

## Expected results

LED variant: visible solid/blink then off.  
Wave: audible/visible wave activity then `--off`.  
If LED cap is `no`, wave still counts for “command path works.”

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| LED no-op | Caps lack LED — use wave; confirm `--cmd-topic all` |
| Nothing happens | Bridge down; `ROBOTOS_CONNECT`; wrong robot-id |
| Port / permission | See HW-00 |

## Done when

You can turn an effector on and off from Python (not only from a board UI).

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-03-command-actuators/CHECKLIST.md</code></p>

### HW-03 checklist

- [ ] One actuator command visibly/audibly worked
- [ ] Clean off/stop sent afterward
