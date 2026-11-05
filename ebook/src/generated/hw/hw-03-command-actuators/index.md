# HW-03 — Command the board

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-03` · **Folder:** `hw-03-command-actuators`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd hw-03
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-03
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-03
```

---

Prerequisite: serial bridge running, warehouse sim closed.

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-03-command-actuators/README.md</code></p>

</div>


## Goal

Publish actuator commands and see/hear the effect.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Check HW-01 caps before LED demos  
- Publish LED fx and/or wave commands with bridge `--cmd-topic all`  
- Turn effectors **off** cleanly when finished  

## Prerequisites

- HW-00 bridge with `--cmd-topic all`; HW-01 caps  
- Paste this page's command block (it sets PATH, `.venv`, and `ROBOTOS_CONNECT`)  
- Ebook: [`ch04-board-on-graph.md`](../../../chapters/ch04-board-on-graph.md) (command vs read)

## Topics (examples)

| Topic | Starter |
|-------|---------|
| `/robot/01/actuator/led/fx` | `led_fx.py` (needs LED cap) |
| `/robot/01/effect/wave/cmd` | `wave_play.py` (often available even without LED) |

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### **LED** (caps LED — often `es3c28p`; **no** on many `ws28p`)

> **Preferred runner** (workshop root): this lab has multiple starters — `scripts\run.cmd hw-03 <starter>`. Starters: `led_fx / wave_play`. List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\hw\hw-03-command-actuators\starter\led_fx.py solid 0 40 0
python labs\hw\hw-03-command-actuators\starter\led_fx.py blink 5 120 120 255 0 0
python labs\hw\hw-03-command-actuators\starter\led_fx.py off
```

### **Wave / tone** (both variants typically)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\hw\hw-03-command-actuators\starter\wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs\hw\hw-03-command-actuators\starter\wave_play.py --off
```

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### **LED** (caps LED — often `es3c28p`; **no** on many `ws28p`)

> **Preferred runner** (workshop root): this lab has multiple starters — `./scripts/run hw-03 <starter>`. Starters: `led_fx / wave_play`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/led_fx.py solid 0 40 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py blink 5 120 120 255 0 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py off
```

### **Wave / tone** (both variants typically)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs/hw/hw-03-command-actuators/starter/wave_play.py --off
```

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### **LED** (caps LED — often `es3c28p`; **no** on many `ws28p`)

> **Preferred runner** (workshop root): this lab has multiple starters — `./scripts/run hw-03 <starter>`. Starters: `led_fx / wave_play`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/led_fx.py solid 0 40 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py blink 5 120 120 255 0 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py off
```

### **Wave / tone** (both variants typically)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs/hw/hw-03-command-actuators/starter/wave_play.py --off
```

---

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
