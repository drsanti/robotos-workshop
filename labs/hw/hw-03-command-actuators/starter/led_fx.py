#!/usr/bin/env python3
"""LED effects — drive the board's WS2812 through the mesh.

Requires caps LED=0x01 (es3c28p). No-op / unused on ws28p.

    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-03-command-actuators/starter/led_fx.py <mode> [args]

    solid r g b                    steady color
    off                            led off
    blink N on_ms off_ms [r g b]   flash N times, t_on/t_off in ms
    fade  N in_ms out_ms [r g b]   fade in/out N times
    rainbow [period_ms]            free-run hue cycle

    Segment model (firmware fx module): a cycle is
    [delay][on][off][end] — delay is per-channel phase shift.
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
from robotos.messages.robotos.serial.v1.serial_pb2 import LedFx

from labs.common.node_util import settle

FX = "/robot/01/actuator/led/fx"
OFF, SOLID, BLINK, FADE, RAINBOW = range(5)


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    mode, args = sys.argv[1], [int(a) for a in sys.argv[2:]]
    n = lambda i, d: args[i] if len(args) > i else d

    with robotos.Node("py_led_fx") as node:
        led = node.create_publisher(FX, LedFx)
        settle(0.5)

        if mode == "solid":
            led.publish(LedFx(effect=SOLID, r=n(0, 0), g=n(1, 0),
                              b=n(2, 0)))
        elif mode == "off":
            led.publish(LedFx(effect=OFF))
        elif mode == "blink":
            led.publish(LedFx(effect=BLINK,
                              r=n(3, 255), g=n(4, 0), b=n(5, 0),
                              n=n(0, 3), on_ms=n(1, 150),
                              off_ms=n(2, 150)))
        elif mode == "fade":
            led.publish(LedFx(effect=FADE,
                              r=n(3, 255), g=n(4, 255), b=n(5, 255),
                              n=n(0, 3), on_ms=n(1, 400),
                              off_ms=n(2, 400)))
        elif mode == "rainbow":
            led.publish(LedFx(effect=RAINBOW, on_ms=n(0, 0) // 2,
                              off_ms=n(0, 0) // 2))
        else:
            sys.exit(__doc__)

        time.sleep(0.3)
        print(f"{mode} sent — watch the LED")


if __name__ == "__main__":
    main()
