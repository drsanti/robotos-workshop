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

## 2026-11-02 class zips

Assembled under `drops/` (gitignored):

| Zip | Notes |
|-----|-------|
| `robotos-workshop-windows-x64-20261102.zip` | CLI + win wheel + sim + serial-bridge `--port auto` |
| `robotos-workshop-macos-arm64-20261102.zip` | CLI + `py3-none-any` wheel + sim + Mac serial-bridge |

Maya WH-01/ch02 ignore-bootstrap wording landed same day.

## 2026-11-02 student helpers + docs

| Item | Status |
|------|--------|
| `scripts/start-here`, `start-bridge`, `run` (+ `.vscode` PATH) | **Shipped** in tree |
| Docs prefer helpers: README, SETUP, ch00/ch01, NOTES.*, lab sheets | **Updated** |
| Re-zip student drops after this doc pass | **Done** (afternoon refresh) |

## 2026-11-02 afternoon — re-zip + Maya helper smoke

Handout: [`CLASS-HANDOUT.md`](CLASS-HANDOUT.md).

| Check | Result |
|-------|--------|
| Assemble Win + Mac from in-repo `code/` → `drops/*-20261102.zip` | **PASS** (~71 MB each; includes `scripts/`, `.vscode/`) |
| `robotos topic list` (sim) shows cmd_vel/odom/scan | **PASS** |
| `scripts\run.cmd wh-01` | **PASS** (100 cmds + zero) |
| HW: bridge on **COM17** + `ROBOTOS_CONNECT` + `scripts\run.cmd hw-01` | **PASS** (`ws28p` caps=`0x3c`) after **closing sim** |

Notes: With warehouse sim still bound on `:7447`, `ROBOTOS_CONNECT=tcp/127.0.0.1:7447` can hit the **sim** instead of the bridge — topic list shows only WH topics and `hw-01` waits forever. Class tip: **close sim before start-bridge** (handout). `--port auto` still flaky on this host; pin `COM17` when needed.

### macOS parity checklist (run on a Mac before class)

- [ ] Unzip `robotos-workshop-macos-arm64-20261102.zip`  
- [ ] Gatekeeper: right-click `scripts/start-here.command` → Open; same for `robotos-sim.app` if blocked  
- [ ] `chmod +x` on `code/robotos-v*/bin/*` if zip stripped execute bits  
- [ ] `./scripts/run wh-01` moves the robot  
- [ ] `./scripts/start-bridge.sh` + `./scripts/run hw-01` with board  

## 2026-11-02 windows-x64 HW (board on desk)

Host: Windows 11 · board **ws28p** on **COM17** · `serial-bridge --port COM17 --baud 921600 --cmd-topic all` · `ROBOTOS_LISTEN=tcp/0.0.0.0:7447`

| Check | Result |
|-------|--------|
| Bridge up; heartbeats | **PASS** |
| `robotos topic list` shows `/robot/01/sys/board`, IMU, battery, … | **PASS** |
| HW-01 `caps_probe.py` | **PASS** — `hw_model=ws28p` `fw=robotos-fw/0.3.0` `caps=0x3c` (IMU/RTC/BATT/BTN yes; LED/MIC no) |

Notes: `--port auto` with default `probe_ms=2500` **skipped COM17** (“no workshop frame”); explicit `--port COM17 --settle-ms 3500` worked. Prefer COM path on this host or raise `--probe-ms` / `--probe-settle-ms` for auto.
