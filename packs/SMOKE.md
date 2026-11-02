# robotos-workshop pack smoke log

Append dated sections after each OS ship. Do not invent new pack folder names.

## 2026-11-02 macos-arm64

Host: Apple Silicon Mac · packs in `code/`

| Check | Result |
|-------|--------|
| Sim launches (`open …/robotos-sim.app`) | **PASS** |
| Auto External + Native + Connect | **PASS** (desktop bootstrap) |
| `robotos topic list` shows `/robot/01/cmd_vel`, `odom`, `scan` | **PASS** |
| WH-01 `drive_forward.py` | **SKIP** — workshop curriculum / labs not in repo yet |
| `robotos node list` | not required once topics PASS |

Notes: First `tauri build` DMG hit `hdiutil … Resource busy` (`.app` still good). Rebuild 2026-11-02 afternoon: full `.app`+DMG OK; scene/session transport labels fixed (no longer hardcode MOCK while Native is active).
