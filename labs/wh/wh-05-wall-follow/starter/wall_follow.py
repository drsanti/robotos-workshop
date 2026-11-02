#!/usr/bin/env python3
"""Lab 05 — simple wall follower (tune gains in the warehouse).

    python labs/wh/wh-05-wall-follow/starter/wall_follow.py
    python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side left --target 0.7 --k 0.8

Sim Reset should place you in the aisle west of the first rack (right ~0.7 m).
If status shows the wall on the other side, flip --side or re-seat with Manual.
"""

from __future__ import annotations

from pathlib import Path
import argparse
import math
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

# Side free if reading missing or near ranger max (3 m sides / 4 m front).
NO_WALL_M = 2.5


def _finite(x: float) -> float:
    return x if math.isfinite(x) else float("inf")


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
    other_i = 2 if args.side == "right" else 0
    # +wz turns left (CCW). Right-wall: too far → −wz (turn toward wall).
    sign = 1.0 if args.side == "right" else -1.0

    with robotos.Node("lab05_wall") as node:
        pub = node.create_publisher(TOPIC_CMD, Twist)
        sub = node.create_subscriber(TOPIC_SCAN, LaserScan)
        scan.attach(sub)
        settle()
        print(
            f"wall-follow side={args.side} target={args.target} k={args.k} — Ctrl-C\n"
            f"Reset sim into the rack aisle, External mode, then run. "
            f"Status prints every 0.5 s."
        )
        period = 1.0 / RATE_HZ
        last_log = 0.0
        warned_other = False
        try:
            while True:
                front = _finite(scan.front)
                side = _finite(scan.ranges[side_i])
                other = _finite(scan.ranges[other_i])
                now = time.monotonic()

                if front < args.front_stop:
                    mode = "front-avoid"
                    wz = sign * 0.9
                    cmd = make_twist(wz=wz)
                elif side >= NO_WALL_M:
                    mode = "seek-no-wall"
                    # Mild turn toward the follow side; do not saturate into circles.
                    wz = -sign * 0.2
                    cmd = make_twist(vx=args.vx, wz=wz)
                    if (
                        not warned_other
                        and other < 1.2
                        and math.isfinite(other)
                    ):
                        print(
                            f"\nnote: wall on the OTHER side "
                            f"({('left' if args.side == 'right' else 'right')}≈{other:.2f} m) "
                            f"— try --side {('left' if args.side == 'right' else 'right')} "
                            f"or Manual-reseat parallel to the rack.\n"
                        )
                        warned_other = True
                else:
                    mode = "follow"
                    err = args.target - side
                    wz = sign * (args.k * err)
                    wz = max(-1.2, min(1.2, wz))
                    cmd = make_twist(vx=args.vx, wz=wz)

                pub.publish(cmd)

                if now - last_log >= 0.5:
                    last_log = now
                    print(
                        f"{mode:14s}  R={scan.right:5.2f}  F={front:5.2f}  "
                        f"L={scan.left:5.2f}  side={side:5.2f}  wz={wz:+5.2f}"
                    )
                time.sleep(period)
        except KeyboardInterrupt:
            pub.publish(zero_twist())
            print("stopped")


if __name__ == "__main__":
    main()
