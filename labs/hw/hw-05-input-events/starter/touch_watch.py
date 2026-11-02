#!/usr/bin/env python3
"""Touch watch — print TouchEvent (+ UiEvent) from the board.

    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-05-input-events/starter/touch_watch.py [seconds]

Touch the LCD. Ctrl-C to stop.
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
from robotos.messages.robotos.serial.v1.serial_pb2 import TouchEvent, UiEvent

from labs.common.loop import idle

TOUCH = "/robot/01/input/touch"
UI = "/robot/01/display/ui/event"

EV = {0: "UP", 1: "DOWN", 2: "MOVE"}


def main() -> None:
    seconds = float(sys.argv[1]) if len(sys.argv) > 1 else 0.0

    with robotos.Node("py_touch_watch") as node:
        touch = node.create_subscriber(TOUCH, TouchEvent)
        ui = node.create_subscriber(UI, UiEvent)

        def on_touch(m: TouchEvent, _meta: dict) -> None:
            pts = ", ".join(
                f"id={p.id} {EV.get(p.event, p.event)} ({p.x},{p.y})"
                for p in m.points
            )
            print(f"touch gest={m.gesture} [{pts}]")

        def on_ui(m: UiEvent, _meta: dict) -> None:
            print(f"ui kind={m.kind} page={m.page_id} name={m.name!r} rc={m.rc}")

        touch.on_message(on_touch)
        ui.on_message(on_ui)
        print(
            f"watching {TOUCH} + {UI} — Ctrl-C to stop"
            + (f" ({seconds:g}s)" if seconds else "")
        )
        idle(seconds if seconds > 0 else None)


if __name__ == "__main__":
    main()
