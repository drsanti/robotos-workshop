"""Wait for a single message on a subscriber (sparse topics)."""

from __future__ import annotations

import threading
from typing import Any, TypeVar

T = TypeVar("T")


def wait_for_message(sub: Any, timeout: float = 15.0) -> Any:
    """Block until ``sub`` delivers one message via ``on_message``, or raise.

    Prefer this over busy ``recv()`` for infrequent pubs (e.g. BoardInfo).
    """
    got = threading.Event()
    box: dict[str, Any] = {}

    def _on(msg: Any, _meta: dict) -> None:
        box["msg"] = msg
        got.set()

    sub.on_message(_on)
    if not got.wait(timeout):
        raise TimeoutError(
            f"no message within {timeout:g}s — is the publisher / bridge up?"
        )
    return box["msg"]
