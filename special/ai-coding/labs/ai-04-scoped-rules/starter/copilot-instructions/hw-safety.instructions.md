---
applyTo: "labs/hw/**"
---

# HW safety (ESP32-S3 board labs)

Canary: start every reply that touches files under `labs/hw/` with `[HW-SAFETY]`.

- Actuator commands (LED, buzzer, motors) must be clamped to the range the lab README gives.
- Publish actuator commands at ≤ 20 Hz.
- On Ctrl-C, send the "off"/zero command before exiting.
- Board labs need `scripts/start-bridge` running and the warehouse sim closed.

## TODO: add 3 rules of your own (from labs/hw/README.md)
