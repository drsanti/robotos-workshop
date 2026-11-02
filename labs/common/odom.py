"""Odometry pose helpers."""

from __future__ import annotations

import math
from typing import Any


def yaw_from_quat(x: float, y: float, z: float, w: float) -> float:
    """Planar yaw (z-up) from quaternion."""
    return math.atan2(2.0 * (w * z + x * y), 1.0 - 2.0 * (y * y + z * z))


def pose_xy_yaw(odom: Any) -> tuple[float, float, float] | None:
    """Return ``(x, y, yaw)`` from an Odometry message, or None if pose missing."""
    if not odom or not odom.pose:
        return None
    pos = odom.pose.position
    ori = odom.pose.orientation
    yaw = yaw_from_quat(ori.x, ori.y, ori.z, ori.w)
    return float(pos.x), float(pos.y), float(yaw)
