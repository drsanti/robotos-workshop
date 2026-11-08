#!/usr/bin/env python3
"""HW-07 — tilt (IMU) drives LED when LED cap exists; else prints TILT/LEVEL only.

    ROBOTOS_CONNECT=tcp/127.0.0.1:7447 python labs/hw/hw-07-sense-actuate/starter/sense_actuate.py

ws28p (IMU, no LED): console TILT/LEVEL is enough.
es3c28p with LED: tilt turns LED on; level turns it off.
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
from robotos.messages.robotos.serial.v1.serial_pb2 import BoardInfo, LedFx

from labs.common.loop import idle
from labs.common.node_util import settle
from labs.common.wait import wait_for_message

IMU = "/robot/01/sensor/imu"
BOARD = "/robot/01/sys/board"
LED = "/robot/01/actuator/led/fx"
OFF, SOLID = 0, 1
TILT_DEG = 25.0
CAP_LED = 0x01


def tilt_deg(ax: float, ay: float, az: float) -> float:
    # angle from +Z (level on table ≈ 0) — lab objective math stays here
    norm = math.sqrt(ax * ax + ay * ay + az * az) or 1.0
    c = max(-1.0, min(1.0, az / norm))
    return math.degrees(math.acos(c))


def main() -> None:
    tilted = False
    with robotos.Node("hw07_sense_actuate") as node:
        board_sub = node.create_subscriber(BOARD, BoardInfo)
        print(f"waiting for {BOARD} (caps) ...", flush=True)
        try:
            info = wait_for_message(board_sub, timeout=15.0)
        except TimeoutError:
            sys.exit("no BoardInfo — is serial-bridge up with --cmd-topic all?")
        has_led = bool(info.caps & CAP_LED)
        print(
            f"hw_model={info.hw_model} caps=0x{info.caps:02x} "
            f"LED={'yes' if has_led else 'no'}",
            flush=True,
        )

        sub = node.create_subscriber(IMU, Imu)
        led = node.create_publisher(LED, LedFx) if has_led else None
        settle(0.5)
        if has_led:
            print(f"tilt>{TILT_DEG}° → LED; level → off — Ctrl-C", flush=True)
        else:
            print(
                f"tilt>{TILT_DEG}° → print TILT/LEVEL (no LED on this board) — Ctrl-C",
                flush=True,
            )

        def on_imu(msg: Imu, _meta: dict) -> None:
            nonlocal tilted
            a = msg.acceleration
            ang = tilt_deg(a.x, a.y, a.z)
            now = ang > TILT_DEG
            if now == tilted:
                return
            tilted = now
            if now:
                print(f"TILT {ang:.0f}°", flush=True)
                if led is not None:
                    led.publish(LedFx(effect=SOLID, r=255, g=40, b=0))
            else:
                print(f"LEVEL {ang:.0f}°", flush=True)
                if led is not None:
                    led.publish(LedFx(effect=OFF))

        sub.on_message(on_imu)
        try:
            idle()
        finally:
            if led is not None:
                led.publish(LedFx(effect=OFF))
            print("\nstopped", flush=True)


if __name__ == "__main__":
    main()
