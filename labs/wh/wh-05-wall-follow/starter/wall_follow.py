#!/usr/bin/env python3
"""Lab 05 — simple right-wall follower (tune gains in the warehouse).

    python labs/wh/wh-05-wall-follow/starter/wall_follow.py
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
    p.add_argument("--side", choices=("right", "left"), default="right")
    p.add_argument("--target", type=float, default=0.7, help="desired side range [m]")
    p.add_argument("--front-stop", type=float, default=0.55)
    p.add_argument("--vx", type=float, default=0.18)
    p.add_argument("--k", type=float, default=1.2, help="steering gain")
    args = p.parse_args()

    scan = LatestScan()
    side_i = 0 if args.side == "right" else 2
    sign = 1.0 if args.side == "right" else -1.0  # +wz turns left

    with robotos.Node("lab05_wall") as node:
        pub = node.create_publisher(TOPIC_CMD, Twist)
        sub = node.create_subscriber(TOPIC_SCAN, LaserScan)
        scan.attach(sub)
        settle()
        print(f"wall-follow side={args.side} target={args.target} — Ctrl-C")
        period = 1.0 / RATE_HZ
        try:
            while True:
                front = scan.front
                side = scan.ranges[side_i]
                if front < args.front_stop:
                    # Spin away from the followed wall (into the aisle).
                    cmd = make_twist(wz=sign * 0.9)
                else:
                    # err>0 → too close; err<0 → too far.
                    # +wz = turn left. Right-wall: too far → turn right (−wz).
                    err = args.target - side
                    wz = sign * (args.k * err)
                    wz = max(-1.2, min(1.2, wz))
                    cmd = make_twist(vx=args.vx, wz=wz)
                pub.publish(cmd)
                time.sleep(period)
        except KeyboardInterrupt:
            pub.publish(zero_twist())
            print("\nstopped")


if __name__ == "__main__":
    main()
