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

Open the lab README (`labs/wh/wh-01-drive-twist/README.md` and the others). Paste the **whole** block for your computer. The first lines are `cd`, PATH, and `.venv`. A new window does not keep them.

`scripts\run.cmd wh-01` and `python labs/...` fail with "not found" when those first lines were skipped.

Starters that use `labs.common` put the workshop root on `sys.path` automatically (walk for `SETUP.md`).  
If you see `ModuleNotFoundError: No module named 'labs'`, you are not inside a workshop tree that contains `SETUP.md` next to `labs/`.
