#!/usr/bin/env python3
"""Lab 02 — print odom pose + 3-beam scan.

    python labs/wh/wh-02-sense-odom-scan/starter/sense.py
"""

from __future__ import annotations

from pathlib import Path
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
from robotos.messages.robotos.nav.v1.nav_pb2 import Odometry
from robotos.messages.robotos.sensor.v1.laser_pb2 import LaserScan

from labs.common.odom import yaw_from_quat

TOPIC_ODOM = "/robot/01/odom"
TOPIC_SCAN = "/robot/01/scan"


def main() -> None:
    latest_odom: Odometry | None = None
    latest_scan: LaserScan | None = None

    with robotos.Node("lab02_sense") as node:
        odom_sub = node.create_subscriber(TOPIC_ODOM, Odometry)
        scan_sub = node.create_subscriber(TOPIC_SCAN, LaserScan)

        def on_odom(msg: Odometry, _meta: dict) -> None:
            nonlocal latest_odom
            latest_odom = msg

        def on_scan(msg: LaserScan, _meta: dict) -> None:
            nonlocal latest_scan
            latest_scan = msg

        odom_sub.on_message(on_odom)
        scan_sub.on_message(on_scan)
        print("listening odom+scan — Ctrl-C to stop")
        try:
            while True:
                line = []
                if latest_odom and latest_odom.pose:
                    pos = latest_odom.pose.position
                    ori = latest_odom.pose.orientation
                    yaw = yaw_from_quat(ori.x, ori.y, ori.z, ori.w)
                    line.append(f"x={pos.x:.2f} y={pos.y:.2f} yaw={yaw:.2f}")
                else:
                    line.append("odom=?")
                if latest_scan and len(latest_scan.ranges) >= 3:
                    r, f, l = (
                        latest_scan.ranges[0],
                        latest_scan.ranges[1],
                        latest_scan.ranges[2],
                    )
                    line.append(f"R={r:.2f} F={f:.2f} L={l:.2f}")
                else:
                    line.append("scan=?")
                print("  ".join(line), flush=True)
                time.sleep(0.2)
        except KeyboardInterrupt:
            print()


if __name__ == "__main__":
    main()
