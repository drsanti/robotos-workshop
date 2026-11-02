"""Canonical workshop-root finder (mirror of the inline starter snippet).

Starters must paste the inline walk *before* importing ``labs.common`` —
they cannot call this module first (chicken/egg). This file exists so
agents/tests can reuse the same landmark logic once root is importable,
and so README can point at one source of truth for the algorithm.
"""

from __future__ import annotations

import sys
from pathlib import Path


def find_workshop_root(start: Path | None = None) -> Path:
    """Walk parents until ``SETUP.md`` is found."""
    cur = (start or Path.cwd()).resolve()
    if cur.is_file():
        cur = cur.parent
    for _ in range(12):
        if (cur / "SETUP.md").is_file():
            return cur
        if cur.parent == cur:
            break
        cur = cur.parent
    raise FileNotFoundError(
        "Cannot find workshop SETUP.md — open a terminal in the robotos-workshop folder "
        "(the one that contains SETUP.md and labs/)."
    )


def ensure_workshop_root_on_path(start: Path | None = None) -> Path:
    """Insert workshop root at front of ``sys.path``; return the root path."""
    root = find_workshop_root(start)
    s = str(root)
    if s not in sys.path:
        sys.path.insert(0, s)
    return root
