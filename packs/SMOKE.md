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

## Windows next (agent on Windows PC)

| Check | Expect |
|-------|--------|
| Pull `robotos-sim` + `robotos-workshop` `main` | includes `426e23b` / WH-05 fix |
| `npm run tauri:build` → replace `code/robotos-sim-v0.1.0-windows-x64/` | new exe |
| WH-01 `drive_forward.py` | robot moves ~1 m; Log `native cmd ←` |
| Badge / Session transport | **NATIVE** not hardcoded MOCK |

## 2026-11-02 macos follow-ups

| Item | Status |
|------|--------|
| WH-05 wall-follow (after steering fix) | **PASS** (manual) |
| macOS `serial-bridge` in CLI pack | **PASS** — `code/robotos-v0.3.0-macos-arm64/bin/serial-bridge` |
