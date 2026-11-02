#!/usr/bin/env python3
"""Lab 04 — open-loop square using timed Twist segments.

    python labs/wh/wh-04-square-path/starter/square.py
    python labs/wh/wh-04-square-path/starter/square.py --side 1.0 --vx 0.25
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
from robotos.messages.robotos.nav.v1.nav_pb2 import Odometry

from labs.common.node_util import settle
from labs.common.odom import yaw_from_quat
from labs.common.twist import make_twist, zero_twist

TOPIC_CMD = "/robot/01/cmd_vel"
TOPIC_ODOM = "/robot/01/odom"
RATE_HZ = 20.0


def publish_for(pub, twist: Twist, seconds: float) -> None:
    period = 1.0 / RATE_HZ
    n = max(1, int(seconds * RATE_HZ))
    for _ in range(n):
        pub.publish(twist)
        time.sleep(period)


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--side", type=float, default=1.0, help="side length [m]")
    p.add_argument("--vx", type=float, default=0.25)
    p.add_argument("--wz", type=float, default=0.8)
    args = p.parse_args()

    drive_t = args.side / max(args.vx, 1e-6)
    turn_t = (math.pi / 2.0) / max(args.wz, 1e-6)

    latest: Odometry | None = None

    with robotos.Node("lab04_square") as node:
        pub = node.create_publisher(TOPIC_CMD, Twist)
        sub = node.create_subscriber(TOPIC_ODOM, Odometry)

        def on_odom(msg: Odometry, _meta: dict) -> None:
            nonlocal latest
            latest = msg

        sub.on_message(on_odom)
        settle()

        def pose_str() -> str:
            if not latest or not latest.pose:
                return "?"
            pos = latest.pose.position
            ori = latest.pose.orientation
            yaw = yaw_from_quat(ori.x, ori.y, ori.z, ori.w)
            return f"x={pos.x:.2f} y={pos.y:.2f} yaw={yaw:.2f}"

        print(f"start {pose_str()}")
        for i in range(4):
            print(f"leg {i + 1}: drive {drive_t:.2f}s")
            publish_for(pub, make_twist(vx=args.vx), drive_t)
            print(f"leg {i + 1}: turn  {turn_t:.2f}s")
            publish_for(pub, make_twist(wz=args.wz), turn_t)
        pub.publish(zero_twist())
        time.sleep(0.3)
        print(f"end   {pose_str()}")


if __name__ == "__main__":
    main()
