# Middleware labs (MW)

Laptop-only graph patterns: CLI, pub/sub, services, actions, parameters, bags,
and a mini digital twin. No warehouse sim or board required for most MW labs
(MW-06 may use twin topics — follow the lab sheet).

## Lab index

| Lab | Focus |
|-----|--------|
| `mw-00` | Getting started — CLI smoke |
| `mw-01` | Publish / subscribe |
| `mw-02` | Services |
| `mw-03` | Actions |
| `mw-04` | Parameters & lifecycle |
| `mw-05` | Record / replay |
| `mw-06` | Mini twin |

## Windows

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd mw-00
```

---

## macOS

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-00
```

---

## Linux

Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-00
```

---

Source of truth: `labs/mw/*/README.md`.
