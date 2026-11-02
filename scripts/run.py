#!/usr/bin/env python3
"""Run a lab starter from the workshop root.

Examples:
  python scripts/run.py list
  python scripts/run.py wh-01
  python scripts/run.py wh-01 --vx 0.2 --seconds 3
  python scripts/run.py hw-01
  python scripts/run.py hw-02 imu_watch
  python scripts/run.py hw-03 led_fx

HW ids auto-set ROBOTOS_CONNECT=tcp/127.0.0.1:7447 when unset
(start-bridge must already be running; close warehouse sim first).

Windows:  scripts\\run.cmd wh-01
macOS:    ./scripts/run wh-01
"""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path


def workshop_root() -> Path:
    here = Path(__file__).resolve().parent
    root = here.parent
    if not (root / "SETUP.md").is_file() or not (root / "labs").is_dir():
        sys.exit("scripts/run.py must live inside robotos-workshop (next to SETUP.md).")
    return root


def discover_labs(root: Path) -> dict[str, Path]:
    """Map short id (wh-01) → lab folder (labs/wh/wh-01-drive-twist)."""
    out: dict[str, Path] = {}
    labs = root / "labs"
    for track in ("mw", "wh", "hw"):
        track_dir = labs / track
        if not track_dir.is_dir():
            continue
        for lab in sorted(track_dir.iterdir()):
            if not lab.is_dir() or not lab.name.startswith(f"{track}-"):
                continue
            parts = lab.name.split("-")
            if len(parts) < 2:
                continue
            short = f"{parts[0]}-{parts[1]}"
            out[short] = lab
    return out


def starters_in(lab: Path) -> list[Path]:
    starter = lab / "starter"
    if not starter.is_dir():
        return []
    return sorted(p for p in starter.glob("*.py") if p.is_file())


def print_list(labs: dict[str, Path]) -> None:
    print("Lab id     starters")
    print("---------  --------")
    for short, lab in sorted(labs.items()):
        pys = starters_in(lab)
        if not pys:
            print(f"{short:9}  (no starter/*.py — checklist / CLI only)")
            continue
        names = ", ".join(p.stem for p in pys)
        print(f"{short:9}  {names}")
    print()
    print("Run:  scripts\\run.cmd <lab-id> [starter] [args…]")
    print("      ./scripts/run <lab-id> [starter] [args…]")


def resolve_script(lab: Path, short: str, starter_name: str | None) -> Path:
    pys = starters_in(lab)
    if not pys:
        sys.exit(f"No starter/*.py under labs/.../{lab.name}")
    if starter_name:
        stem = starter_name.removesuffix(".py")
        for p in pys:
            if p.stem == stem:
                return p
        avail = ", ".join(p.stem for p in pys)
        sys.exit(f"Unknown starter {starter_name!r}. Available: {avail}")
    if len(pys) == 1:
        return pys[0]
    avail = ", ".join(p.stem for p in pys)
    sys.exit(
        f"Lab {short} has multiple starters — pick one of: {avail}\n"
        f"Example: scripts\\run.cmd {short} {pys[0].stem}"
    )


def main(argv: list[str]) -> int:
    root = workshop_root()
    labs = discover_labs(root)

    if not argv or argv[0] in ("list", "ls", "-l", "--list", "-h", "--help"):
        if argv and argv[0] in ("-h", "--help"):
            print(__doc__)
            print()
        print_list(labs)
        return 0

    short = argv[0].lower()
    if short not in labs:
        print(f"Unknown lab id: {argv[0]}", file=sys.stderr)
        print("Try: scripts\\run.cmd list", file=sys.stderr)
        return 1

    rest = argv[1:]
    starter_name: str | None = None
    stems = {p.stem for p in starters_in(labs[short])}
    if rest and not rest[0].startswith("-"):
        cand = rest[0].removesuffix(".py")
        if cand in stems or len(stems) > 1:
            starter_name = cand
            rest = rest[1:]

    script = resolve_script(labs[short], short, starter_name)

    py = sys.executable
    venv_win = root / ".venv" / "Scripts" / "python.exe"
    venv_unix = root / ".venv" / "bin" / "python"
    if venv_win.is_file():
        py = str(venv_win)
    elif venv_unix.is_file():
        py = str(venv_unix)

    cmd = [py, str(script), *rest]
    print(f"+ {' '.join(cmd)}", flush=True)
    env = os.environ.copy()
    env["PYTHONPATH"] = str(root) + os.pathsep + env.get("PYTHONPATH", "")

    # HW labs talk to serial-bridge (LISTEN :7447). Students should not have to
    # type ROBOTOS_CONNECT every time — set a default if unset.
    if short.startswith("hw-") and not env.get("ROBOTOS_CONNECT"):
        env["ROBOTOS_CONNECT"] = "tcp/127.0.0.1:7447"
        print(
            "(auto) ROBOTOS_CONNECT=tcp/127.0.0.1:7447  "
            "— leave scripts/start-bridge running; close warehouse sim first",
            flush=True,
        )

    return subprocess.call(cmd, cwd=str(root), env=env)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
