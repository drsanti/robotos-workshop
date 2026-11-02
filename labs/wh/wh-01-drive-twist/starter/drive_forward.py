#!/usr/bin/env python3
"""Lab 01 — publish Twist on /robot/01/cmd_vel for a few seconds.

Prereq: sim Warehouse → External → Native → Connect.
Env: same ROBOTOS_* as CLI (pack SETUP).

    python labs/wh/wh-01-drive-twist/starter/drive_forward.py
    python labs/wh/wh-01-drive-twist/starter/drive_forward.py --vx 0.2 --seconds 5
    python labs/wh/wh-01-drive-twist/starter/drive_forward.py --wz 0.5 --seconds 2
"""

from __future__ import annotations

from pathlib import Path
import argparse
import sys
import time

# --- ignore this block (finds workshop root). Do not edit. ---
_root = Path(__file__).resolve().parent
while _root != _root.parent and not (_root / "SETUP.md").is_file():
    _root = _root.parent
if not (_root / "SETUP.md").is_file():
    raise SystemExit(
        "Cannot find workshop SETUP.md — open a terminal in the robotos-workshop folder "
        "(the one that contains SETUP.md and labs/)."
    )
sys.path.insert(0, str(_root))
# --- end ignore ---

import robotos
from robotos.messages.robotos.geometry.v1.geometry_pb2 import Twist

# Shared helpers — do not open or edit labs/common/
from labs.common.node_util import settle
from labs.common.twist import make_twist, zero_twist

TOPIC = "/robot/01/cmd_vel"
RATE_HZ = 20.0


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--vx", type=float, default=0.2, help="linear.x m/s")
    p.add_argument("--wz", type=float, default=0.0, help="angular.z rad/s")
    p.add_argument("--seconds", type=float, default=5.0)
    args = p.parse_args()

    period = 1.0 / RATE_HZ
    n = max(1, int(args.seconds * RATE_HZ))
    print(
        f"robotos {robotos.Node.version()} — pub Twist "
        f"vx={args.vx} wz={args.wz} for ~{args.seconds}s @ {RATE_HZ} Hz"
    )
    with robotos.Node("lab01_drive") as node:
        pub = node.create_publisher(TOPIC, Twist)
        settle()  # discovery settle (labs.common)
        msg = make_twist(vx=args.vx, wz=args.wz)
        # Teaching loop: steady rate + final zero (do not hide this)
        for _i in range(n):
            pub.publish(msg)
            time.sleep(period)
        pub.publish(zero_twist())
        print(f"done — {n} cmds + zero")


if __name__ == "__main__":
    main()
