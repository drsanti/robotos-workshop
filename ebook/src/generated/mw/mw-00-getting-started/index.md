# MW-00 — Getting started

<div class="ebook-run">

**Track:** `mw` (Middleware) · **Lab:** `mw-00` · **Folder:** `mw-00-getting-started`

Paste the **whole** block for your computer. A new window does not keep PATH or `.venv`. `YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd mw-00
```

**macOS Apple Silicon (zsh or bash)**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-00
```

**Linux (bash)** — only if `code/robotos-v0.3.0-linux-x64` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-00
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/mw/mw-00-getting-started/README.md</code></p>

</div>


## Goal

Prove the CLI works on your machine before writing any Python.

## Theory first

- Ebook: [`docs/ebook/chapters/ch01-graph-nodes-topics.md`](../../../chapters/ch01-graph-nodes-topics.md)
- Short notes: [`docs/theory/01-graph-topics.md`](../../../docs/theory/01-graph-topics.md)

## Where to run this

Use any terminal: Terminal, iTerm, Cursor, or VS Code. Open it in the **workshop root**, the folder that contains `code/`, `labs/`, and `SETUP.md`.

`robotos` is not installed on the computer. It lives in `code/…/bin`. Each new terminal must be told to look there. A VS Code terminal opened on this folder sometimes does that for you. Every other terminal, including Cursor, does not. If you skip the `export` or `$env:PATH` line, the next command fails with `command not found: robotos`.

The PATH line lasts for **this window only**. A new window needs it again. Every later lab repeats the same first lines, because a new window forgets them.

## Practice

Replace nothing if you are already in the workshop root. `cd` to that folder first if the prompt shows some other path.

### macOS Apple Silicon (zsh or bash)

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos version
robotos doctor
robotos node list
robotos topic list
```

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos version
robotos doctor
robotos node list
robotos topic list
```

### Linux (bash)

Linux packs are not in the current class drop. If your drop has the folder:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos version
robotos doctor
robotos node list
robotos topic list
```

**Expect:** `robotos version` prints `robotos 0.3.0` (any `0.3.x` is fine). `node list` and `topic list` may be **empty** until the sim, the serial bridge, or MW-01 is running. An empty list is a valid quiet graph. It does not mean the CLI is broken.

Optional: `robotos ui` if the pack embeds the inspector.

## Python SDK check

The checklist also asks for a successful `import robotos`. Paste the whole block. Do not run `source .venv/bin/activate` before `.venv` exists.

### macOS Apple Silicon (zsh or bash)

```bash
cd YOUR_WORKSHOP_DIR
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install code/robotos-0.3.0-py3-none-any.whl
python -c "import robotos; print(robotos.Node.version())"
```

If `.venv` already exists, skip `python3 -m venv .venv` and start at `source .venv/bin/activate`.

### Linux (bash)

Only if `code/robotos-0.3.0-py3-none-any.whl` is in your drop:

```bash
cd YOUR_WORKSHOP_DIR
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install code/robotos-0.3.0-py3-none-any.whl
python -c "import robotos; print(robotos.Node.version())"
```

### Windows (PowerShell)

```powershell
cd YOUR_WORKSHOP_DIR
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -U pip
python -m pip install .\code\robotos-0.3.0-py3-none-win_amd64.whl
python -c "import robotos; print(robotos.Node.version())"
```

If activation is blocked, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, then activate again. The prompt should show `(.venv)`.

**Expect:** the import prints a version string. Do not install the Windows wheel on macOS or Linux.

Full setup, the sim, and the board bridge are in [`SETUP.md`](../../../../SETUP.md). This lab does not need the sim.

## Done when

CLI works and you can explain what an empty `topic list` means.

See [CHECKLIST.md](CHECKLIST.md).

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/mw/mw-00-getting-started/CHECKLIST.md</code></p>

### MW-00 checklist

- [ ] `robotos version` works
- [ ] venv imports `robotos`
- [ ] Can explain empty vs non-empty `topic list`
