#!/usr/bin/env python3
"""Param get/set/list — MCU runtime params (0x8a / 0x29).

    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-04-board-params/starter/param_getset.py list
    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-04-board-params/starter/param_getset.py get <name>
    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-04-board-params/starter/param_getset.py set <name> <value> [--persist]

Listens briefly for ParamEvent replies. Param set differs by board
(e.g. mic.* only on es3c28p; rtc.time on ws28p).
"""

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
from robotos.messages.robotos.serial.v1.serial_pb2 import ParamCmd, ParamEvent

from labs.common.node_util import settle

CMD = "/robot/01/param/cmd"
EVT = "/robot/01/param/event"


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    op_name = sys.argv[1]
    if op_name == "list":
        op, name, value = 2, "", ""
    elif op_name == "get" and len(sys.argv) >= 3:
        op, name, value = 0, sys.argv[2], ""
    elif op_name == "set" and len(sys.argv) >= 4:
        persist = "--persist" in sys.argv
        op = 3 if persist else 1
        name, value = sys.argv[2], sys.argv[3]
    else:
        sys.exit(__doc__)

    with robotos.Node("py_param_getset") as node:
        pub = node.create_publisher(CMD, ParamCmd)
        sub = node.create_subscriber(EVT, ParamEvent)

        def on_evt(m: ParamEvent, _meta: dict) -> None:
            print(f"param {m.name}={m.value!r} type={m.type} rc={m.rc}")

        sub.on_message(on_evt)
        settle(0.5)
        pub.publish(ParamCmd(op=op, name=name, value=value))
        print(f"sent ParamCmd op={op} name={name!r}")
        time.sleep(1.5)


if __name__ == "__main__":
    main()
