robotos-sim v0.1.0 (macos-arm64)
================================
Built: 2026-11-10 (ADR-0006 Y-up + Phase 2 UX)
Git: robotos-sim dbeed03

Run:  open ./robotos-sim.app
  or: ./robotos-sim
  or: right-click robotos-sim.app → Open (Gatekeeper first launch)

World frame: Y-up (floor XZ). HUD shows x / z / yaw.
ROS odom wire still uses x/y with y ← −z_m.

Warehouse teaching contract: /robot/01/cmd_vel|odom|scan
Connect: Native → External → Connect (or follow SETUP.md).
Optional installers under installers/ (DMG may be absent if bundle step failed).
