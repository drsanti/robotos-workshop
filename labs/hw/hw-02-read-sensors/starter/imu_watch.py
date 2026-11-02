#!/usr/bin/env python3
"""IMU watch — print live accel/gyro from the board (caps IMU=0x04).

    ROBOTOS_CONNECT=tcp/<host>:7447 python3 imu_watch.py [seconds]

ws28p: QMI8658. es3c28p: stub (no useful samples). Ctrl-C to stop.
"""

import sys
import time

import robotos
from robotos.messages.robotos.sensor.v1.imu_pb2 import Imu

TOPIC = "/robot/01/sensor/imu"


def main() -> None:
    seconds = float(sys.argv[1]) if len(sys.argv) > 1 else 0.0
    deadline = time.monotonic() + seconds if seconds > 0 else None

    with robotos.Node("py_imu_watch") as node:
        sub = node.create_subscriber(TOPIC, Imu)
        print(f"watching {TOPIC} — Ctrl-C to stop"
              + (f" ({seconds:g}s)" if seconds else ""))
        try:
            while deadline is None or time.monotonic() < deadline:
                try:
                    imu = sub.recv(timeout_ms=2000)
                except TimeoutError:
                    print("(timeout — still waiting)")
                    continue
                a, g = imu.acceleration, imu.angular_velocity
                print(
                    f"a=({a.x:+.2f},{a.y:+.2f},{a.z:+.2f}) "
                    f"g=({g.x:+.3f},{g.y:+.3f},{g.z:+.3f})"
                )
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
