"""Twist construction helpers — starters still own publish loops."""

from __future__ import annotations

from robotos.messages.robotos.geometry.v1.geometry_pb2 import Twist


def make_twist(vx: float = 0.0, wz: float = 0.0) -> Twist:
    return Twist(linear={"x": float(vx)}, angular={"z": float(wz)})


def zero_twist() -> Twist:
    return Twist()
