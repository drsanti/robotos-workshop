#!/usr/bin/env python3
"""Board watch — battery, wifi, and BoardInfo streams.

    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-02-read-sensors/starter/board_watch.py [seconds]

Prints MCU->host telemetry the serial-bridge republishes. Ctrl-C to stop.
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
from robotos.messages.robotos.serial.v1.serial_pb2 import (
    BatteryStatus,
    BoardInfo,
    WifiStatus,
)

from labs.common.loop import idle

BATT = "/robot/01/sensor/battery"
WIFI = "/robot/01/net/wifi"
BOARD = "/robot/01/sys/board"


def main() -> None:
    seconds = float(sys.argv[1]) if len(sys.argv) > 1 else 0.0

    with robotos.Node("py_board_watch") as node:
        batt = node.create_subscriber(BATT, BatteryStatus)
        wifi = node.create_subscriber(WIFI, WifiStatus)
        board = node.create_subscriber(BOARD, BoardInfo)

        def on_batt(m: BatteryStatus, _meta: dict) -> None:
            print(f"battery {m.mv} mV {m.pct}%")

        def on_wifi(m: WifiStatus, _meta: dict) -> None:
            print(
                f"wifi state={m.state} ssid={m.ssid!r} rssi={m.rssi} "
                f"ip={m.ip} zenoh={m.zenoh_up}"
            )

        def on_board(m: BoardInfo, _meta: dict) -> None:
            print(
                f"board model={m.hw_model} uuid={m.uuid} mac={m.mac} "
                f"caps=0x{m.caps:02x} synced={m.synced} "
                f"up={m.uptime_ns / 1e9:.1f}s"
            )

        batt.on_message(on_batt)
        wifi.on_message(on_wifi)
        board.on_message(on_board)
        print(
            "watching battery/wifi/board — Ctrl-C to stop"
            + (f" ({seconds:g}s)" if seconds else "")
        )
        idle(seconds if seconds > 0 else None)


if __name__ == "__main__":
    main()
