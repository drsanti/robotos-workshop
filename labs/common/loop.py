"""Idle / watch loops — not a robot control framework."""

from __future__ import annotations

import time


def idle(seconds: float | None = None) -> None:
    """Block until Ctrl-C, or until ``seconds`` elapse when ``seconds > 0``."""
    deadline = time.monotonic() + seconds if seconds and seconds > 0 else None
    try:
        while deadline is None or time.monotonic() < deadline:
            time.sleep(0.2)
    except KeyboardInterrupt:
        pass
