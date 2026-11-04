#!/usr/bin/env python3
"""AI-07 — MCP server that lets an AI agent see and drive the warehouse robot.

The agent app starts this file itself (stdio transport) from `.mcp.json`.
To check it by hand:

    python special/ai-coding/labs/ai-07-mcp-server/starter/robotos_mcp.py --self-test

stdout is the MCP channel. Never print() to stdout here — log to stderr.
"""

from __future__ import annotations

from pathlib import Path
import argparse
import math
import shutil
import subprocess
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
from robotos.messages.robotos.geometry.v1.geometry_pb2 import Twist
from robotos.messages.robotos.sensor.v1.laser_pb2 import LaserScan

from mcp.server import MCPServer

from labs.common.node_util import settle
from labs.common.scan import LatestScan
from labs.common.twist import make_twist, zero_twist

TOPIC_CMD = "/robot/01/cmd_vel"
TOPIC_SCAN = "/robot/01/scan"
RATE_HZ = 20.0

# Safety limits live in the server, not in the prompt (theory card 07).
MAX_VX = 0.3  # m/s
MAX_WZ = 1.0  # rad/s
MAX_SECONDS = 5.0

mcp = MCPServer(
    "robotos",
    instructions=(
        "Tools for the robotos warehouse sim robot /robot/01. "
        "Call read_scan before driving forward; ranges are in metres."
    ),
)


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


@mcp.tool()
def topic_list() -> str:
    """List topics on the robotos graph (same as `robotos topic list`).

    Use this first to check the warehouse sim is running: expect
    /robot/01/cmd_vel, /robot/01/odom and /robot/01/scan.
    """
    exe = shutil.which("robotos")
    if exe is None:
        return "error: robotos CLI not on PATH"
    try:
        out = subprocess.run(
            [exe, "topic", "list"], capture_output=True, text=True, timeout=10
        )
    except subprocess.TimeoutExpired:
        return "error: robotos topic list timed out"
    # The CLI mixes Zenoh log lines into stdout; keep only the table.
    rows = [
        line for line in out.stdout.splitlines()
        if line.startswith("TOPIC") or line.startswith("/")
    ]
    return "\n".join(rows) or "(no topics)"


@mcp.tool()
def read_scan(timeout_s: float = 2.0) -> dict:
    """Read the latest three-beam laser scan of robot 01.

    Returns right / front / left ranges in metres (inf = nothing in range).
    """
    scan = LatestScan()
    with robotos.Node("ai07_mcp_scan") as node:
        sub = node.create_subscriber(TOPIC_SCAN, LaserScan)
        scan.attach(sub)
        deadline = time.monotonic() + max(0.1, min(timeout_s, 5.0))
        while time.monotonic() < deadline and not any(
            math.isfinite(r) for r in scan.ranges
        ):
            time.sleep(0.05)
    if not any(math.isfinite(r) for r in scan.ranges):
        return {"error": "no scan received — is the sim running and connected?"}
    return {"right": scan.right, "front": scan.front, "left": scan.left}


@mcp.tool()
def drive(vx: float, wz: float, seconds: float) -> str:
    """Drive robot 01 for a short time, then stop.

    vx: forward speed in m/s (negative = backwards)
    wz: turn rate in rad/s (positive = left)
    seconds: how long to drive
    """
    # TODO (lab step 4): clamp vx, wz and seconds to MAX_VX / MAX_WZ /
    # MAX_SECONDS, and say in the return text when a value was clamped.

    # TODO (lab step 5): refuse to drive forward (vx > 0) when the front
    # range is below 0.5 m. Hint: reuse read_scan().

    with robotos.Node("ai07_mcp_drive") as node:
        pub = node.create_publisher(TOPIC_CMD, Twist)
        settle()
        period = 1.0 / RATE_HZ
        end = time.monotonic() + seconds
        try:
            while time.monotonic() < end:
                pub.publish(make_twist(vx=vx, wz=wz))
                time.sleep(period)
        finally:
            # Always leave the robot stopped, even on error.
            pub.publish(zero_twist())
    return f"drove vx={vx} wz={wz} for {seconds} s, then stopped"


def self_test() -> int:
    """Print the tool list and one topic_list call (no agent needed)."""
    import asyncio

    tools = asyncio.run(mcp.list_tools())
    for t in tools:
        log(f"tool: {t.name} — {(t.description or '').splitlines()[0]}")
    log("topic_list() →\n" + topic_list())
    return 0


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--self-test", action="store_true", help="list tools and exit")
    args = p.parse_args()
    if args.self_test:
        sys.exit(self_test())
    log("robotos MCP server on stdio")
    mcp.run()
