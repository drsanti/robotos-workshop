#!/usr/bin/env python3
"""HW-07 — tilt (IMU) drives LED when both caps exist; else prints state.

    ROBOTOS_CONNECT=tcp/127.0.0.1:7447 python labs/hw/hw-07-sense-actuate/starter/sense_actuate.py
"""

from __future__ import annotations

from pathlib import Path
import math
import sys

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
from robotos.messages.robotos.sensor.v1.imu_pb2 import Imu
from robotos.messages.robotos.serial.v1.serial_pb2 import LedFx

from labs.common.loop import idle
from labs.common.node_util import settle

IMU = "/robot/01/sensor/imu"
LED = "/robot/01/actuator/led/fx"
OFF, SOLID = 0, 1
TILT_DEG = 25.0


def tilt_deg(ax: float, ay: float, az: float) -> float:
    # angle from +Z (level on table ≈ 0) — lab objective math stays here
    norm = math.sqrt(ax * ax + ay * ay + az * az) or 1.0
    c = max(-1.0, min(1.0, az / norm))
    return math.degrees(math.acos(c))


def main() -> None:
    tilted = False
    with robotos.Node("hw07_sense_actuate") as node:
        sub = node.create_subscriber(IMU, Imu)
        led = node.create_publisher(LED, LedFx)
        settle(0.5)
        print(f"tilt>{TILT_DEG}° → LED; level → off — Ctrl-C")

        def on_imu(msg: Imu, _meta: dict) -> None:
            nonlocal tilted
            a = msg.acceleration
            ang = tilt_deg(a.x, a.y, a.z)
            now = ang > TILT_DEG
            if now == tilted:
                return
            tilted = now
            if now:
                print(f"TILT {ang:.0f}°")
                led.publish(LedFx(effect=SOLID, r=255, g=40, b=0))
            else:
                print(f"LEVEL {ang:.0f}°")
                led.publish(LedFx(effect=OFF))

        sub.on_message(on_imu)
        try:
            idle()
        finally:
            led.publish(LedFx(effect=OFF))
            print("\nstopped")


if __name__ == "__main__":
    main()
