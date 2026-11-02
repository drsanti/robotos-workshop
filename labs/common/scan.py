"""Optional three-beam scan buffer (WH avoid / wall-follow). WH-02 may keep explicit on_scan."""

from __future__ import annotations

from typing import Any


class LatestScan:
    """Holds latest ``ranges[0/1/2]`` as right / front / left (P0 warehouse)."""

    def __init__(self) -> None:
        self.ranges: list[float] = [float("inf")] * 3

    def on_message(self, msg: Any, _meta: dict | None = None) -> None:
        if len(msg.ranges) >= 3:
            self.ranges[0] = float(msg.ranges[0])
            self.ranges[1] = float(msg.ranges[1])
            self.ranges[2] = float(msg.ranges[2])

    @property
    def right(self) -> float:
        return self.ranges[0]

    @property
    def front(self) -> float:
        return self.ranges[1]

    @property
    def left(self) -> float:
        return self.ranges[2]

    def attach(self, sub: Any) -> None:
        """``sub.on_message(self.on_message)`` — still visible as one line in starters."""
        sub.on_message(self.on_message)
