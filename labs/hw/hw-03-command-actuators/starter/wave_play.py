#!/usr/bin/env python3
"""Wave play — drive the onboard wave synth (0x83 WaveCmd).

    ROBOTOS_CONNECT=tcp/<host>:7447 python labs/hw/hw-03-command-actuators/starter/wave_play.py \\
        [--ch N] [--shape sin|square|tri|saw] [--hz F] [--amp A] \\
        [--offset O] [--cycles N] [--off]

    channel: 0..2 or 255=all (default 255)
    shape:   sin=0 square=1 tri=2 saw=3 (default sin)
    cycles:  0=free-run (default), N=burst then stop
    --off:   disable (hold at offset)
"""

from pathlib import Path
import argparse
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
from robotos.messages.robotos.serial.v1.serial_pb2 import WaveCmd

from labs.common.node_util import settle

TOPIC = "/robot/01/effect/wave/cmd"
SHAPES = {"sin": 0, "square": 1, "tri": 2, "saw": 3}


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--ch", type=int, default=255)
    p.add_argument("--shape", choices=SHAPES, default="sin")
    p.add_argument("--hz", type=float, default=440.0)
    p.add_argument("--amp", type=float, default=0.5)
    p.add_argument("--offset", type=float, default=0.5)
    p.add_argument("--phase", type=float, default=0.0)
    p.add_argument("--cycles", type=int, default=0)
    p.add_argument("--off", action="store_true")
    args = p.parse_args()

    cmd = WaveCmd(
        channel=args.ch,
        shape=SHAPES[args.shape],
        cycles=args.cycles,
        freq_hz=args.hz,
        amplitude=args.amp,
        offset=args.offset,
        phase_deg=args.phase,
        enable=not args.off,
    )
    with robotos.Node("py_wave_play") as node:
        pub = node.create_publisher(TOPIC, WaveCmd)
        settle(0.5)
        pub.publish(cmd)
        time.sleep(0.3)
        print(
            f"wave ch={cmd.channel} shape={args.shape} "
            f"{cmd.freq_hz}Hz enable={cmd.enable}"
        )


if __name__ == "__main__":
    main()
