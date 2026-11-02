# Labs

| Folder | Track | Labs |
|--------|-------|------|
| [`mw/`](mw/) | Middleware | `mw-00` … `mw-06` |
| [`wh/`](wh/) | Warehouse sim | `wh-00` … `wh-08` |
| [`hw/`](hw/) | ESP32-S3 board | `hw-00` … `hw-07` |
| [`common/`](common/) | Shared helpers | Plumbing only — **do not edit** |

Content map: [`docs/lab-outline.md`](../docs/lab-outline.md).  
Helper rules: [`common/README.md`](common/README.md).

## Running starters

From the **workshop root** (folder with `SETUP.md` and `labs/`):

```text
scripts\run.cmd list          # Windows — see lab ids
scripts\run.cmd wh-01
scripts\run.cmd wh-01 --vx 0.2
scripts\run.cmd hw-02 imu_watch

./scripts/run list            # macOS / Linux
./scripts/run wh-01
```

Or call Python directly:

```text
python labs/wh/wh-01-drive-twist/starter/drive_forward.py
```

Starters that use `labs.common` put the workshop root on `sys.path` automatically (walk for `SETUP.md`).  
If you see `ModuleNotFoundError: No module named 'labs'`, you are not inside a workshop tree that contains `SETUP.md` next to `labs/`.
