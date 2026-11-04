#!/usr/bin/env python3
"""Check the warehouse sim graph is up before running a lab.

    python check_sim.py

Exit 0 and print OK when /robot/01/cmd_vel, odom and scan are all listed;
exit 1 with a NOT READY reason otherwise.
"""

from __future__ import annotations

import shutil
import subprocess
import sys

NEEDED = ("/robot/01/cmd_vel", "/robot/01/odom", "/robot/01/scan")


def main() -> int:
    exe = shutil.which("robotos")
    if exe is None:
        print("NOT READY: `robotos` is not on PATH (open a VS Code terminal in the workshop, or see SETUP.md).")
        return 1
    try:
        out = subprocess.run(
            [exe, "topic", "list"], capture_output=True, text=True, timeout=10
        ).stdout
    except subprocess.TimeoutExpired:
        print("NOT READY: `robotos topic list` timed out.")
        return 1
    missing = [t for t in NEEDED if t not in out]
    if missing:
        print("NOT READY: missing topics " + ", ".join(missing) + " (is the sim running with External + Native + Connect?)")
        return 1
    print("OK: " + ", ".join(NEEDED))
    return 0


if __name__ == "__main__":
    sys.exit(main())
