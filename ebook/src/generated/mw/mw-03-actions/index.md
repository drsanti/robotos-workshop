# MW-03 — Actions

<div class="ebook-run">

**Track:** `mw` (Middleware) · **Lab:** `mw-03` · **Folder:** `mw-03-actions`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd mw-03
```

---

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-03
```

---

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-03
```

---

<p class="ebook-source"><strong>Source:</strong> <code>labs/mw/mw-03-actions/README.md</code></p>

</div>


## Goal

Run a long-running **action** (`/machine/01/cycle`) with feedback, then a result.

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/index.md) first, then come back and paste the block again.

## Learning outcomes

- Start action server + client  
- Read multiple feedback lines before the final result  
- Contrast with MW-02 services  

## Prerequisites

- MW-02; paste this page's command block in **both** windows  
- Ebook: [`ch07-actions.md`](../../../chapters/ch07-actions.md)  
- Theory: [`docs/theory/09-actions.md`](../../../docs/theory/09-actions.md)

## Architecture

```mermaid
flowchart LR
  client[cycle_client.py] -->|goal| act["/machine/01/cycle"]
  server[cycle_server.py] --> act
  act -->|feedback*| client
  act -->|result| client
```

## Windows

Use **PowerShell**. Follow this section from the first block to the last.

If `Activate.ps1` is blocked, run this once, then paste the lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

> **Preferred runner** (workshop root): this lab has multiple starters — `scripts\run.cmd mw-03 <starter>`. Starters: `cycle_server / cycle_client`. List: `scripts\run.cmd list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

### Terminal A — server

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\mw\mw-03-actions\starter\cycle_server.py
```

### Terminal B — client

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\mw\mw-03-actions\starter\cycle_client.py
```

Stretch: cancel mid-cycle from a second client / CLI if the pack supports it.

---

## macOS

Use **Terminal** on Apple Silicon (zsh or bash). Follow this section from the first block to the last.

> **Preferred runner** (workshop root): this lab has multiple starters — `./scripts/run mw-03 <starter>`. Starters: `cycle_server / cycle_client`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

### Terminal A — server

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-03-actions/starter/cycle_server.py
```

### Terminal B — client

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-03-actions/starter/cycle_client.py
```

Stretch: cancel mid-cycle from a second client / CLI if the pack supports it.

---

## Linux

Use **bash**. Follow this section from the first block to the last. Skip it when `code/robotos-v0.3.0-linux-x64` is not in your drop.

> **Preferred runner** (workshop root): this lab has multiple starters — `./scripts/run mw-03 <starter>`. Starters: `cycle_server / cycle_client`. List: `./scripts/run list`. Paste the whole block below, including the first lines. A new window needs the whole block again.

### Terminal A — server

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-03-actions/starter/cycle_server.py
```

### Terminal B — client

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/mw/mw-03-actions/starter/cycle_client.py
```

Stretch: cancel mid-cycle from a second client / CLI if the pack supports it.

---

## Expected output

Feedback `step i/5`, then a final `cycle complete` (or `aborted` if cancelled).

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| No progress | Server not up; same mesh as client |
| Import errors | Pack wheel / `.venv` |

## Done when

You see multiple feedback lines and a final result.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/mw/mw-03-actions/CHECKLIST.md</code></p>

### MW-03 checklist

- [ ] Goal accepted
- [ ] Feedback printed
- [ ] Result received
