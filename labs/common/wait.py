"""Wait for a single message on a subscriber (sparse topics)."""

from __future__ import annotations

from typing import Any


def wait_for_message(sub: Any, timeout: float = 15.0) -> Any:
    """Block until ``sub.recv`` returns one message, or raise TimeoutError.

    Sparse topics such as BoardInfo are not latched, so this waits for the
    next sample. ``recv`` is the path that delivers on the class Python.
    """
    return sub.recv(timeout_ms=max(1, int(timeout * 1000)))
