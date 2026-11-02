"""Board capability bit table (HW-01 print loop stays in the starter)."""

from __future__ import annotations

# (bit, short name, example demo / lab)
CAPS_BITS: tuple[tuple[int, str, str], ...] = (
    (0x01, "LED", "led_fx"),
    (0x02, "MIC", "stretch / mic_dump"),
    (0x04, "IMU", "imu_watch"),
    (0x08, "RTC", "time_sync (RTC persist)"),
    (0x10, "BATT", "board_watch"),
    (0x20, "BTN", "touch_watch / keys"),
)
