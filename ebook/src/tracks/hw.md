# Hardware labs (HW)

The full track sheet (board variants, caps, Wi‑Fi notes) is staged from
[`labs/hw/README.md`](../generated/hw/index.md) — open that page in the sidebar
under **Hardware labs**.

Practice labs: `hw-00` … `hw-07` (each README + CHECKLIST).

## Windows

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
scripts\start-bridge.cmd
```

Second window:

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd hw-01
```

---

## macOS

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
./scripts/start-bridge.sh
```

Second window:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-01
```

---

## Linux

Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
./scripts/start-bridge.sh
```

Second window:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-01
```

---
