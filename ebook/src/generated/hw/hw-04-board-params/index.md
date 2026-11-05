# HW-04 — Board parameters

<div class="ebook-run">

**Track:** `hw` (Hardware) · **Lab:** `hw-04` · **Folder:** `hw-04-board-params`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd hw-04
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-04
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-04
```

---

Prerequisite: serial bridge running, warehouse sim closed.

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/hw-04-board-params/README.md</code></p>

</div>


## Goal

List / get / set board parameters (optional persist to NVM).

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Use the same param idea as MW-04 on silicon  
- Confirm get-after-set; stretch persist across unplug  

## Prerequisites

- HW-00 bridge with `--cmd-topic all`; HW-01  
- Ebook: [`ch10-params-lifecycle.md`](../../../chapters/ch10-params-lifecycle.md)  
- Theory: [`docs/theory/10-params-lifecycle.md`](../../../docs/theory/10-params-lifecycle.md)

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>`. List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\hw\hw-04-board-params\starter\param_getset.py list
python labs\hw\hw-04-board-params\starter\param_getset.py get <name>
python labs\hw\hw-04-board-params\starter\param_getset.py set <name> <value>
python labs\hw\hw-04-board-params\starter\param_getset.py set <name> <value> --persist
```

Replace `<name>` / `<value>` from `list` output (e.g. uplink / wifi fields as shipped).

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

### Practice

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-04-board-params/starter/param_getset.py list
python labs/hw/hw-04-board-params/starter/param_getset.py get <name>
python labs/hw/hw-04-board-params/starter/param_getset.py set <name> <value>
python labs/hw/hw-04-board-params/starter/param_getset.py set <name> <value> --persist
```

Replace `<name>` / `<value>` from `list` output (e.g. uplink / wifi fields as shipped).

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

### Practice

> **Preferred runner** (workshop root): `./scripts/run <lab-id>`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-04-board-params/starter/param_getset.py list
python labs/hw/hw-04-board-params/starter/param_getset.py get <name>
python labs/hw/hw-04-board-params/starter/param_getset.py set <name> <value>
python labs/hw/hw-04-board-params/starter/param_getset.py set <name> <value> --persist
```

Replace `<name>` / `<value>` from `list` output (e.g. uplink / wifi fields as shipped).

---

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
