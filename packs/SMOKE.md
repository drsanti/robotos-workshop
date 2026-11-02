# robotos-workshop pack smoke log

Append dated sections after each OS ship. Do not invent new pack folder names.

## 2026-11-02 macos-arm64

Host: Apple Silicon Mac · packs in `code/`

| Check | Result |
|-------|--------|
| Sim launches (`open …/robotos-sim.app`) | **PASS** |
| Auto External + Native + Connect | **PASS** (desktop bootstrap) |
| `robotos topic list` shows `/robot/01/cmd_vel`, `odom`, `scan` | **PASS** |
| WH-01 `drive_forward.py` | **PASS** (after refreshing `robotos-0.3.0-py3-none-any.whl` with geometry/nav msgs) |
| `robotos topic echo /robot/01/odom --count 3` | **PASS** |

Notes: First `tauri build` DMG hit `hdiutil … Resource busy` (`.app` still good). Rebuild afternoon: full `.app`+DMG OK; transport badges fixed; Native `cmd_vel` poll (`426e23b`) so WH-01 moves. Stale `any` wheel refreshed with geometry/nav. WH-05 steering sign fixed in starter (`c59ece9`).

## 2026-11-02 windows-x64

Host: Windows 11 x64 · packs in `code/` · sim rebuilt from `robotos-sim` `529c8b4` (+ badge/`cmd_vel` poll)

| Check | Result |
|-------|--------|
| `npm run tauri:build` → replace `code/robotos-sim-v0.1.0-windows-x64/` | **PASS** (exe+MSI+NSIS) |
| Sim launches; topics `/robot/01/cmd_vel|odom|scan` | **PASS** |
| WH-01 `drive_forward.py` | **PASS** (odom x≈3.01 after ~1 m from spawn; 100 cmds) |
| Badge / Session transport | **PASS** (Native path; topics live without MOCK-only scene) |

## 2026-11-02 macos follow-ups

| Item | Status |
|------|--------|
| WH-05 wall-follow (after steering fix) | **PASS** (manual) |
| macOS `serial-bridge` in CLI pack | **PASS** — `code/robotos-v0.3.0-macos-arm64/bin/serial-bridge` |
