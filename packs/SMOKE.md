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

Notes: First `tauri build` DMG hit `hdiutil … Resource busy` (`.app` still good). Rebuild afternoon: full `.app`+DMG OK; transport badges fixed. Stale `any` wheel (Oct 16) lacked `geometry_pb2` — rebuilt from `robotos` interfaces + copied into `code/`.
