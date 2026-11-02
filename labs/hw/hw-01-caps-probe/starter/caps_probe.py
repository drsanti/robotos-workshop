#!/usr/bin/env python3
"""Caps probe — wait for BoardInfo and print which demos apply.

    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-01-caps-probe/starter/caps_probe.py

Bits (firmware board.h / board-matrix.md):
  LED=0x01 MIC=0x02 IMU=0x04 RTC=0x08 BATT=0x10 BTN=0x20
"""

from pathlib import Path
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
from robotos.messages.robotos.serial.v1.serial_pb2 import BoardInfo

from labs.common.caps import CAPS_BITS
from labs.common.wait import wait_for_message

TOPIC = "/robot/01/sys/board"


def main() -> None:
    with robotos.Node("py_caps_probe") as node:
        sub = node.create_subscriber(TOPIC, BoardInfo)
        print(f"waiting for {TOPIC} ...", flush=True)
        try:
            info = wait_for_message(sub, timeout=15.0)
        except TimeoutError:
            sys.exit("no BoardInfo received — is serial-bridge up?")
        print(
            f"hw_model={info.hw_model} uuid={info.uuid} "
            f"fw={info.fw_version} caps=0x{info.caps:02x}",
            flush=True,
        )
        # Learning outcome: read each bit yourself
        for bit, name, demo in CAPS_BITS:
            mark = "yes" if info.caps & bit else "no "
            print(f"  [{mark}] {name:4} -> {demo}", flush=True)
        print("shared: sfx_compose, wave_play, param_getset, board_watch", flush=True)


if __name__ == "__main__":
    main()
