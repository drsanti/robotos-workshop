"""Small node lifecycle helpers (not a framework)."""

from __future__ import annotations

import time


def settle(seconds: float = 0.8) -> None:
    """Pause after creating pubs/subs so discovery can settle (same idea as CLI)."""
    time.sleep(seconds)
