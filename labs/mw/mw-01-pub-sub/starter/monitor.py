#!/usr/bin/env python3
"""Workshop 02 — subscriber printing Imu values as they arrive.

    python monitor.py           # until Enter
    python monitor.py 5         # ~5 seconds then exit
"""
from __future__ import annotations

import sys
import time

import robotos
from robotos.messages.robotos.sensor.v1.imu_pb2 import Imu

TOPIC = "/machine/01/sensor/imu"


def main() -> None:
    seconds = float(sys.argv[1]) if len(sys.argv) > 1 else None
    with robotos.Node("monitor") as node:
        sub = node.create_subscriber(TOPIC, Imu)
        sub.on_message(
            lambda msg, meta: print(
                f"acc.z={msg.acceleration.z:.2f}  "
                f"gyro.x={msg.angular_velocity.x:+.3f}",
                flush=True,
            )
        )
        if seconds is None:
            input("subscribed — press Enter to stop")
            return
        print(f"subscribed — {seconds:g}s", flush=True)
        deadline = time.monotonic() + seconds
        while time.monotonic() < deadline:
            time.sleep(0.2)


if __name__ == "__main__":
    main()
