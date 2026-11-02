# Ebook / student-doc backlog

Synthesized from persona reviews (2026-11-02):

- [Maya `win-novice`](reviews/win-novice-maya-20261102.md) — **FAIL** unsupervised SETUP→WH/MW  
- [Kenji `mac-intermediate`](reviews/mac-intermediate-kenji-20261102.md) — **not ebook-ready**; macOS PATH/smoke gaps  
- [Aisha `linux-advanced`](reviews/linux-advanced-aisha-20261102.md) — **FAIL** Linux HW path; NOTES Windows-only  

Canonical long-form drafts already started: Ch.0 / Ch.1 under `chapters/`.  
Class-day `SETUP.md` + lab READMEs still need to catch up.

---

## P0 — ship blockers (any OS student stranded)

| ID | Action | Source |
|----|--------|--------|
| P0.1 | **SETUP.md:** remove author path `d:\CODE\…`; dual smoke fences (PowerShell + bash); never mix shells in one fence | Maya B8, Kenji smoke, Aisha B6 |
| P0.2 | **SETUP.md:** explicit `macos-arm64` PATH example (not only `linux-x64` + comment) | Kenji B1 |
| P0.3 | **SETUP.md:** open-terminal steps; ExecutionPolicy row; exact `win_amd64` wheel name; double-click `robotos-sim.exe` | Maya B1–B6 |
| P0.4 | **SETUP.md:** `python3` + `chmod +x`; Linux dialout troubleshooting; no `.exe`-only bridge wording | Aisha B4–B5, C1 |
| P0.5 | ~~**Ship OS-stamped NOTES**~~ **done** — `packs/NOTES.{windows-x64,macos-arm64,linux-x64}.txt`; assemble `-OsArch` / `--os-arch` auto-picks | Aisha B1, Kenji NOTES |
| P0.6 | **Lab READMEs (MW/WH/HW):** always PowerShell **and** bash fences; `cd` to lab root; PATH+venv reminder; `python3` on Unix | All three |
| P0.7 | **WH-01 README:** replace bash-only run block with dual OS; don’t require `cd starter` without full path option | Maya B9 |

## P1 — ebook depth (STYLE quality bar)

| ID | Action |
|----|--------|
| P1.1 | Expand `docs/theory/02`…`14` → `docs/ebook/chapters/ch02+` (1.5–3.5k words, Mermaid arch + sequence) |
| P1.2 | Upgrade every `labs/{mw,wh,hw}/*/README.md` to lab-sheet bar: outcomes, diagrams, code walkthrough, expected transcript, ≥3 troubleshooting rows, checklist/glossary |
| P1.3 | WH-00/01 + MW-00/01 first (Maya’s path); then HW-00…02 (Aisha); then remaining labs |
| P1.4 | p0-contract: Native≠Mock explanation + sequence; disambiguate UI “Bridge” vs `serial-bridge` | Kenji |
| P1.5 | Caps bits + `caps_probe.py` line walkthrough in HW-01 / board chapter | Aisha |
| P1.6 | Gatekeeper section in Ch.0 / SETUP §4 for macOS | Kenji |

## P2 — packaging / maintainer

| ID | Action |
|----|--------|
| P2.1 | macOS + **Windows** sim packs shipped (2026-11-02); Linux deferred — playbook: [`robotos-sim/docs/workshop-bundle-building.md`](../../../robotos-sim/docs/workshop-bundle-building.md) |
| P2.2 | ~~`assemble.sh` + execute-bit docs~~ **done** (`packs/assemble.sh`, `LAYOUT.md`) |
| P2.3 | ~~Re-run persona skill~~ polish 2026-11-02: Kenji/Aisha **PASS**; Maya **PARTIAL**→plain-English WH-01 + ch02; EPUB Mermaid notes (`PUBLISHING.md` / `build-epub.ps1`) |

## Suggested work order

1. ~~P0.1–P0.4 + P0.7 (SETUP + WH-01)~~ **done**  
2. ~~P0.6 dual-OS lab fences~~ **done**; ~~P0.5 per-OS NOTES~~ **done** (`packs/NOTES.{windows-x64,macos-arm64,linux-x64}.txt` + assemble auto-pick)  
3. ~~P1.3 core lab sheets~~ **done**; ~~P1.1 chapters~~ **done**; ~~theory cards~~ **done** (2026-11-02)  
4. ~~P2.2 `assemble.sh` + execute-bit docs~~ **done**  
5. ~~**P2.1:** Mac + Windows sim packs~~ **done** (2026-11-02); Linux deferred  

6. Optional: refresh Windows student zip after doc clusters; deepen lab sheets only if new persona FAIL  



## P3 — future curriculum (explicitly deferred)

See also [`docs/lab-outline.md`](../lab-outline.md) §Future curriculum.

| ID | Item | Notes |
|----|------|--------|
| P3.1 | **Graded car / AGV labs** | New track + topic contract; not warehouse `wh-*` |
| P3.2 | **Graded robot-arm labs** | Joint/EE command + state; pick sequence |
| P3.3 | **Graded drone labs** | Attitude/body-rate + IMU/pose; altitude-hold toy |
| P3.4 | **Board IMU → sim 3D scene** | Fusion lab: serial-bridge IMU overlays / drives avatar in `robotos-sim` |
| P3.5 | **HW+WH twin / co-bag** | Shared graph or remapped topics; bag board + sim together |
| P3.6 | Sim product work for P3.4–P3.5 | External IMU subscribe, overlay UI, documented multi-process SETUP |

Do **not** block current ebook P0/P1 on these.

## Already done (do not redo)

- Persona skill + `personas.md` + `STYLE.md`  
- Ebook Ch.0–13 drafts + `PUBLISHING.md` (Pandoc TOC)  
- Lab sheets upgraded across all three tracks  
- **Theory instructor cards** (`docs/theory/01`–`14` + `README.md`) upgraded to lecture-card bar — Maya/Kenji/Aisha reviews 2026-11-02  
- Per-OS NOTES + `assemble.sh` / `-OsArch` auto-pick; Windows student zip refreshed 2026-11-02  
- **`labs/common` helpers** (settle / wait / twist / scan / caps / idle) + WH/HW starter refactor; MW left short; ebook walkthroughs synced 2026-11-02  



- SETUP dual-OS rewrite; WH-01 dual-OS; p0 Native≠Mock note  
- Lab folder layout `labs/{mw,wh,hw}/`  
- Dual-OS command fences across MW/WH/HW READMEs (workshop-root paths)  
- Future P3 car/arm/drone + board↔sim fusion noted in lab-outline  
