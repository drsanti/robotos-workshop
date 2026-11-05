# Labs

| Folder | Track | Labs |
|--------|-------|------|
| [`mw/`](mw/) | Middleware | `mw-00` … `mw-06` |
| [`wh/`](wh/) | Warehouse sim | `wh-00` … `wh-08` |
| [`hw/`](hw/) | ESP32-S3 board (`es3c28p` / `ws28p`) | `hw-00` … `hw-07` — see [`hw/README.md`](hw/README.md) |
| [`common/`](common/) | Shared helpers | Plumbing only — **do not edit** |

Content map: [`docs/lab-outline.md`](../docs/lab-outline.md).  
Helper rules: [`common/README.md`](common/README.md).

## Running starters

Open the lab README and paste the **whole** block in your section. A new window does not keep `cd`, PATH, or `.venv`.

## Windows

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd wh-01
```

---

## macOS

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-01
```

---

## Linux

Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-01
```

---

Starters that use `labs.common` put the workshop root on `sys.path` automatically (walk for `SETUP.md`).  
If you see `ModuleNotFoundError: No module named 'labs'`, you are not inside a workshop tree that contains `SETUP.md` next to `labs/`.
