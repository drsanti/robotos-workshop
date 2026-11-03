# `labs.common` — workshop plumbing

<div class="ebook-run">

**Section:** `labs/common` · shared helpers (students do not edit)

```text
# imported by starters via labs.common.*
# see this page for the bootstrap sys.path block
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/common/README.md</code></p>

</div>


**Audience:** instructors / agents. **Students do not edit these files.**

Helpers remove repeated boilerplate (wait-for-one message, discovery settle,
twist construction, yaw math, caps bit table, optional scan buffer). Lab
**objective** code stays in each `starter/*.py`.

## Bootstrap (required in every starter that imports here)

`sys.path[0]` is the script’s directory (`starter/`), not the workshop root —
so you **cannot** `from labs.common…` first. Paste this **identical** block
before any `labs.common` import:

```python
from pathlib import Path
import sys

_root = Path(__file__).resolve().parent
while _root != _root.parent and not (_root / "SETUP.md").is_file():
    _root = _root.parent
if not (_root / "SETUP.md").is_file():
    raise SystemExit(
        "Cannot find workshop SETUP.md — open a terminal in the robotos-workshop folder "
        "(the one that contains SETUP.md and labs/)."
    )
sys.path.insert(0, str(_root))
```

Then: `from labs.common.wait import wait_for_message` (etc.).

Primary run: from workshop root  
`scripts\run.cmd wh-01` / `./scripts/run wh-01`  
(or `python labs/wh/wh-01-drive-twist/starter/drive_forward.py`)

## What belongs here

| Module | Helpers |
|--------|---------|
| `wait.py` | `wait_for_message(sub, timeout=…)` |
| `node_util.py` | `settle(seconds=0.8)` |
| `loop.py` | `idle(seconds=None)` — watch loops until Ctrl-C |
| `twist.py` | `make_twist(vx=, wz=)`, `zero_twist()` |
| `odom.py` | `yaw_from_quat`, `pose_xy_yaw` |
| `caps.py` | `CAPS_BITS` |
| `scan.py` | optional `LatestScan` |

## What must stay in starters

- `robotos.Node`, topic strings, message type imports  
- WH-01 timed publish `for` loop + final zero  
- HW-01 yes/no caps print loop  
- Control laws (avoid / wall-follow / FSM)

## Forbidden

- `RobotApp` / “run my robot” base classes  
- Hiding WH-01’s publish loop behind `rate_publish()`  
- Day-1 `pip install -e` requirement  
