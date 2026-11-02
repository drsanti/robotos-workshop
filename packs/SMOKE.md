# Smoke log (maintainers)

## 2026-11-02 windows-x64

| Check | Result |
|-------|--------|
| Wheel build with `geometry` / `nav` / `laser` pb2 | PASS |
| Twist pub/sub roundtrip (two Python nodes) | PASS |
| `assemble.ps1` + zip | PASS |
| Desktop auto-bootstrap External+Native+Connect | PASS (`bootstrapTauriWorkshop`) |
| `robotos node list` shows `robotos_sim` (3 endpoints) | PASS |
| `topic list` cmd_vel / odom / scan | PASS |
| Lab 01 drive: odom x 3.01 → 3.77 in ~3 s @ 0.25 m/s | PASS |
| Lab 02 / 03 starters | run after Lab 01 (see session) |

## macos-arm64 (pending — build on Mac)

Follow [`../../robotos-sim/docs/workshop-bundle-building.md`](../../robotos-sim/docs/workshop-bundle-building.md). Fill after Gatekeeper + WH-01 smoke:

| Check | Result |
|-------|--------|
| `npm run tauri:build` on Apple Silicon | |
| Stage `robotos-sim-v0.1.0-macos-arm64/` | |
| Gatekeeper right-click Open / Allow | |
| Auto External+Native+Connect | |
| `topic list` cmd_vel / odom / scan | |
| WH-01 `drive_forward.py` | |

## linux-x64 (pending — build on Linux/CI, not Mac)

| Check | Result |
|-------|--------|
| `npm run tauri:build` on Linux | |
| Stage `robotos-sim-v0.1.0-linux-x64/` | |
| Auto External+Native+Connect | |
| `topic list` + WH-01 drive | |
