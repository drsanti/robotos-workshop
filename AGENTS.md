# AGENTS.md — robotos-workshop

Student curriculum + **prebuilt** `code/` packs. Source for the sim is **not**
here — it lives in private `robotos-sim`.

## Sibling layout

```text
<parent>/
  robotos/
  robotos-sim/        # private — build packs from here
  robotos-workshop/   # this repo
```

## NEXT (2026-11-03) — continuing on macOS

Windows sim pack in `code/robotos-sim-v0.1.0-windows-x64/` is **current**
(Phase 2 UX, L/R, aisle spawn).

**macOS pack is stale.** Rebuild on Apple Silicon:

1. Open **`../robotos-sim/docs/MACOS-AGENT-HANDOFF.md`** (canonical steps).  
2. Build + stage into `code/robotos-sim-v0.1.0-macos-arm64/`.  
3. Smoke WH-01 + WH-05; append [`packs/SMOKE.md`](packs/SMOKE.md).  
4. Commit pack + SMOKE; push. No AI Co-authored-by trailers.

## WH-05 quick smoke (after Reset in aisle)

```bash
python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side right --target 0.7 --k 0.6
```

Expect status `follow` with side ≈ 0.5–0.9 (not perpetual `seek-no-wall` / open-floor circles).

## Do not

- Vendor `robotos-sim` or Ternion source into this repo  
- Rename `robotos-sim-v0.1.0-*` folders (SETUP paths)  
- Commit `.instructor/`, `.prompt/`, or local agent scratch  
