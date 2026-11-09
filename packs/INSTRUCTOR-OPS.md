# TA recovery card — print one per table

Students: interactive docs + local **docs companion** (`workshop-host`).  
Site: https://drsanti.github.io/robotos-workshop-docs/

## 30-second map

| Thing | Means |
|-------|--------|
| **Machine install** | SETUP / `#/setup` — PATH, venv, flash |
| **Companion** | Gear panel — token Connect for Run / dock / Live |
| Dock **bridge** | Terminal A — `serial-bridge` (persistent) |
| Dock **labs** | Terminal B — CLI / Python oneshots |
| Companion port | **`:7420`** only (Studio is **`:7421`** — do not mix) |

Run chips say **→ labs** / **→ bridge**. “Run did nothing” → open the matching tab.

## First ask (in order)

1. **Connected?** Dock strip / Companion green. Else: pack root → `./scripts/start-host.sh` (Win: `scripts\start-host.cmd`) → paste Bearer → Connect `http://127.0.0.1:7420`.
2. **Workshop folder set?** Literal `YOUR_WORKSHOP_DIR` in a command → Companion → Folder.
3. **Wrong tab?** Bridge fences need **bridge**; CLI needs **labs**.
4. **Busy yellow?** Prefer **Stop** (interrupt). **Reconnect** if the pane dropped but the host PTY lives. **Kill** last (wipes scrollback).

## Recovery ladder

| Action | When |
|--------|------|
| **Stop** | Job still running; oneshot blocked; yellow busy |
| **Reconnect** | “Terminal disconnected” strip; companion still Connected |
| **Kill / Reset** | Shell wedged after Stop failed |

Busy coach offers **Stop bridge** or **Run in labs** — follow that, don’t invent Kill first.

## Quick triage

| See | Do |
|-----|-----|
| Grey Run / not connected | start-host **:7420** + token (not Studio :7421) |
| Token rejected | Fresh Bearer from host window / `.host-token` |
| Port in use on start-host | Free **7420**; Studio may stay on 7421 |
| Wrong tab / “did nothing” | Dock → **labs** or **bridge** matching the chip |
| Busy / 409 | Stop that tab, or re-run in **labs** |
| No BoardInfo / empty topics | Bridge still up? USB? Companion → board + serial pin |
| Blank board / flash | Setup flash mini-flow or `fw/<sku>/` — **ws28p** ≠ **es3c28p** bins |
| WH odom=`?` / robot idle | Companion → Mesh **WH** + Start sim (LISTEN `:7447`). Labs: `unset ROBOTOS_LISTEN` + `ROBOTOS_CONNECT=tcp/127.0.0.1:7447` |
| HW waits forever / only WH topics | Companion → Mesh **HW** (or Stop sim) before Start bridge — LISTEN is exclusive unless **Twin** |
| Twin / board↔sim | Mesh **Twin**: Start sim first, then Start bridge (CONNECT). Same topics on one graph |
| TTY blank, host OK | **Reconnect terminal** — do not restart companion first |
| Pack vs SPA drift | Prefer Pages/#/setup; pack SETUP for offline only |

## Mesh mode (`:7447`)

Companion selector **WH / HW / Twin** (after Connect). One LISTEN owner unless Twin (sim LISTENs, bridge CONNECTs).

| Mode | Who LISTENs | Bridge | Student shell |
|------|-------------|--------|---------------|
| **WH** | Sim (`ROBOTOS_LISTEN=tcp/0.0.0.0:7447`) | Off | `unset ROBOTOS_LISTEN` · `ROBOTOS_CONNECT=tcp/127.0.0.1:7447` |
| **HW** | `serial-bridge` LISTEN | On | Same CONNECT; **`run hw-*` auto-unsets leaked LISTEN** |
| **Twin** | Sim | On (**CONNECT**) | Same CONNECT; board + sim share topics |

If the sim window says NATIVE · connected but `lsof -iTCP:7447` shows nothing, use Companion **Start sim** (or relaunch with LISTEN set). Badge-only “connected” without TCP LISTEN → odom stays `?`.

## HW serial (this room)

- Prefer **Companion → Serial port** so Copy/Run rewrite `--port`.
- Or use the path from bridge **`[auto] selected`** — differs by machine (do not memorize one `usbmodem*` example).
- **ws28p** ≈ caps `0x3c` (IMU; no LED). **es3c28p** ≈ `0x33` (LED). Caps decide which HW labs apply.

## Class URL flags

| Query | Effect |
|-------|--------|
| `?classLock=1` | Lock appearance + terminal font/prompt |
| `?projector=1` | Higher contrast / larger type |
| `?screenReader=1` | xterm accessible buffer |

## Measure the room

Print **[hand-raise tally](https://github.com/drsanti/robotos-workshop-tools/blob/main/docs/hand-raise-tally.md)** (or copy from tools `docs/`). One tick per blocked hand-raise: T token · F folder · W wrong tab · B busy · S serial · X flash · R reconnect · P pack · O other.

## Maintainer / Windows agent

If Companion on Windows lacks Mesh **Twin** / Start sim / ready coach: the pack `.exe` is stale. On a Windows machine follow private tools **`WINDOWS-SHIP.md`** / **`AGENTS.md`** (`ship-host.ps1`), then commit the new `workshop-host.exe` here.

## Links

- Tools instructor ops (long form): https://github.com/drsanti/robotos-workshop-tools/blob/main/docs/instructor-ops.md  
- Class handout: [`CLASS-HANDOUT.md`](./CLASS-HANDOUT.md) · Board flash: `fw/README.md`
