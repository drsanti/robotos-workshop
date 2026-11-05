# Labs

<div class="ebook-run">

**Section:** `labs/` · all practice labs live under `mw/`, `wh/`, `hw/`

Paste the whole block. YOUR_WORKSHOP_DIR contains SETUP.md.

**Windows (PowerShell)**

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
scripts\run.cmd list
```

**macOS Apple Silicon**

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run list
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/README.md</code></p>

</div>


| Folder | Track | Labs |
|--------|-------|------|
| [`mw/`](../tracks/mw.md) | Middleware | `mw-00` … `mw-06` |
| [`wh/`](../tracks/wh.md) | Warehouse sim | `wh-00` … `wh-08` |
| [`hw/`](hw/index.md) | ESP32-S3 board (`es3c28p` / `ws28p`) | `hw-00` … `hw-07` — see [`hw/README.md`](hw/index.md) |
| [`common/`](common/index.md) | Shared helpers | Plumbing only — **do not edit** |

Content map: [`docs/lab-outline.md`](../../../docs/lab-outline.md).  
Helper rules: [`common/README.md`](common/index.md).

## Running starters

Open the lab README (`labs/wh/wh-01-drive-twist/README.md` and the others). Paste the **whole** block for your computer. The first lines are `cd`, PATH, and `.venv`. A new window does not keep them.

`scripts\run.cmd wh-01` and `python labs/...` fail with "not found" when those first lines were skipped.

Starters that use `labs.common` put the workshop root on `sys.path` automatically (walk for `SETUP.md`).  
If you see `ModuleNotFoundError: No module named 'labs'`, you are not inside a workshop tree that contains `SETUP.md` next to `labs/`.
