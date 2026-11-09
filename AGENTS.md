# AGENTS.md — robotos-workshop

Student curriculum + **prebuilt** `code/` packs. Interactive docs **source** is private
(`robotos-workshop-tools/online-docs`). Students use Pages or a shipped `online-docs/` dist.

## Sibling layout

```text
<parent>/
  robotos/                  # PRIVATE SDK
  robotos-workshop-tools/   # PRIVATE — companion + docs SPA source
  robotos-workshop/         # this repo (PUBLIC)
```

## NEXT (2026-11-09) — continue on Windows x64

macOS companion + Pages are current. **Windows `workshop-host.exe` is stale**
(`code/robotos-v0.3.0-windows-x64/bin/workshop-host.exe` predates mesh Twin APIs).

### Agent: do this on Windows

1. Open sibling tools repo → **`robotos-workshop-tools/AGENTS.md`** and **`WINDOWS-SHIP.md`**.
2. Pull all three siblings (`robotos-workshop`, `robotos-workshop-tools`, `robotos`).
3. Run `robotos-workshop-tools\scripts\ship-host.ps1` → refreshes this pack’s
   `code\robotos-v0.3.0-windows-x64\bin\workshop-host.exe`.
4. Smoke with `scripts\start-host.cmd` + https://drsanti.github.io/robotos-workshop-docs/
   Connect → Mesh **WH / HW / Twin** (see SETUP.md Twin topic map).
5. Commit **only** the new `.exe` (and any docs you intentionally update) in **this** repo; push `main`.

### Do not

- Rebuild or replace macOS binaries from Windows  
- Copy `robotos-workshop-tools` source into this repo or class zips  
- Vendor `robotos-sim` / Ternion source here  
- Rename `robotos-sim-v0.1.0-*` / `robotos-v0.3.0-*` folder names (SETUP paths)  
- Commit `.instructor/`, `.prompt/`, or local agent scratch  

### Mesh modes (student-facing)

| Mode | Who LISTENs `:7447` | Bridge | Use |
|------|---------------------|--------|-----|
| **WH** | robotos-sim | off | Warehouse labs |
| **HW** | serial-bridge | LISTEN | Board labs |
| **Twin** | robotos-sim | CONNECT | Board ↔ sim share topics |

Docs: `SETUP.md`, `packs/CLASS-HANDOUT.md`, `packs/INSTRUCTOR-OPS.md`.

## WH quick smoke (any OS, after sim LISTEN)

```bash
# or: scripts\run.cmd wh-01  on Windows
./scripts/run wh-01
```

## Rules

- English by default; Thai only if the user writes Thai  
- Commit only when asked; push when asked  
- No force-push to `main` unless explicitly requested  
