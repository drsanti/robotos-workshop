#!/usr/bin/env python3
"""Lab 03 — bang-bang: creep forward, stop/turn if front range is close.

    python labs/wh/wh-03-avoid-front/starter/avoid_front.py
    python labs/wh/wh-03-avoid-front/starter/avoid_front.py --threshold 0.6
"""

from __future__ import annotations

from pathlib import Path
import argparse
import sys
import time

# Workshop root on sys.path before importing labs.common (do not edit)
_root = Path(__file__).resolve().parent
while _root != _root.parent and not (_root / "SETUP.md").is_file():
    _root = _root.parent
if not (_root / "SETUP.md").is_file():
    raise SystemExit(
        "Cannot find workshop SETUP.md — open a terminal in the robotos-workshop folder "
        "(the one that contains SETUP.md and labs/)."
    )
sys.path.insert(0, str(_root))

import robotos
from robotos.messages.robotos.geometry.v1.geometry_pb2 import Twist
from robotos.messages.robotos.sensor.v1.laser_pb2 import LaserScan

from labs.common.node_util import settle
from labs.common.scan import LatestScan
from labs.common.twist import make_twist, zero_twist

TOPIC_CMD = "/robot/01/cmd_vel"
TOPIC_SCAN = "/robot/01/scan"
RATE_HZ = 20.0


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--threshold", type=float, default=0.6, help="front stop [m]")
    p.add_argument("--vx", type=float, default=0.15)
    p.add_argument("--wz", type=float, default=0.6, help="spin when blocked")
    args = p.parse_args()

    scan = LatestScan()

    with robotos.Node("lab03_avoid") as node:
        pub = node.create_publisher(TOPIC_CMD, Twist)
        sub = node.create_subscriber(TOPIC_SCAN, LaserScan)
        scan.attach(sub)
        settle()
        print(f"avoid loop threshold={args.threshold} m — Ctrl-C to stop")
        period = 1.0 / RATE_HZ
        try:
            while True:
                # Control law stays here (lab objective)
                if scan.front < args.threshold:
                    turn = args.wz if scan.left >= scan.right else -args.wz
                    cmd = make_twist(wz=turn)
                else:
                    cmd = make_twist(vx=args.vx)
                pub.publish(cmd)
                time.sleep(period)
        except KeyboardInterrupt:
            pub.publish(zero_twist())
            print("\nstopped")


if __name__ == "__main__":
    main()
