# Persona re-review — Kenji (`mac-intermediate`)

**Date:** 2026-11-02 (post–ebook upgrade)  
**Prior review:** [`mac-intermediate-kenji-20261102.md`](mac-intermediate-kenji-20261102.md)  
**OS lens:** macOS Apple Silicon (`macos-arm64`), Terminal / zsh, `python3`, Gatekeeper  
**Skill lens:** CS undergrad — fine with bash/git; little robotics; needs contracts, Native≠Mock, schema names  
**Scope (this pass):** `SETUP.md` (macOS), `docs/ebook/chapters/ch00-setup-your-machine.md`, `docs/p0-contract.md`, `labs/wh/wh-01-drive-twist/README.md`, `labs/mw/mw-01-pub-sub/README.md`; spot-check `code/NOTES.txt`  
**Verdict:** **PARTIAL** for macOS day-1 unsupervised success.

I can get through PATH + venv + Native≠Mock + MW-01 bash now without inventing commands. I still risk pasting **linux-x64** on smoke/HW, launching the **wrong sim binary** from Ch.0, and trusting a **Windows-stamped `NOTES.txt`**. Gatekeeper is mentioned but thin / misplaced.

---

## Delta vs prior review

| Prior blocker | Status after upgrade |
|---------------|----------------------|
| SETUP PATH example was `linux-x64` with only a comment | **Fixed** — dedicated `### macOS Apple Silicon` fence with `macos-arm64` |
| Smoke was PowerShell-only / instructor `d:\CODE\…` | **Fixed** — bash smoke twin + `YOUR_WORKSHOP_DIR`; absolute Win path gone |
| Mixed `python` / backslash wheel fence | **Fixed** — separate bash block; `python3 -m venv`; forward-slash wheel glob |
| No Gatekeeper | **Improved** — SETUP §4 one-liner + troubleshooting row; Ch.0 callout under PATH |
| Lab / MW PowerShell-only | **Mostly fixed** — WH-01 + MW-01 have Linux/macOS bash fences |
| `python` in macOS lab fences | **Softened** — after `source .venv/bin/activate`, `python` is fine for me; still fragile if I skip activate |
| NOTES.txt Windows drop | **Still a blocker** — workspace `code/NOTES.txt` is `OS/arch: windows-x64` |
| Native≠Mock unexplained | **Fixed** in `p0-contract.md` (table + prose); SETUP points at graded Native |
| WH/MW ebook quality bar | **Partial** — MW-01 gained outcomes/arch/troubleshoot; WH-01 still thin |

---

## 1. Stuck points (remaining)

### Blocker

| Quote / cue | File | Why I still stop |
|-------------|------|------------------|
| `OS/arch: windows-x64` + `pip install code\robotos-0.3.0-py3-none-win_amd64.whl` + PowerShell activate | `code/NOTES.txt` | If my Mac zip still ships this file, section A is a Windows cheat sheet. B2 helps HW only. Pack stamp must be `macos-arm64` (or omit NOTES from shared tree and generate per drop). |
| Smoke bash defaults to `…-linux-x64` with comment `# linux-x64 — or macos-arm64 folder name on Mac` | `SETUP.md` §5 | Same paste trap as the old §2. I will run smoke with the wrong folder after doing §2 correctly. |
| HW bash Terminal A/B also default `linux-x64` (`# or macos-arm64`) | `SETUP.md` §7 | Day-1 WH may skip this; still wrong when I open NOTES/SETUP for board week. |
| Ch.0 sim launch: `./code/robotos-sim-v0.1.0-linux-x64/robotos-sim &` only | `ch00` §6.5 | No `macos-arm64` twin. Gatekeeper note is under §6.3 PATH, not next to first launch — easy to miss when the binary “won’t open.” |

### Confusing

| Quote / cue | File | Why I hesitate |
|-------------|------|----------------|
| Gatekeeper: “Privacy & Security → allow / Open” (one line) | `SETUP.md` §4 | Enough that I know the *category* of fix; not enough for “cannot be opened because Apple cannot check…” (right-click → Open once). Ch.0 is slightly better. |
| Smoke / labs use `python` on bash after activate | SETUP §5, WH-01, MW-01 | Fine inside `.venv`. If I open a fresh tab and forget activate, I hit `command not found: python` — troubleshooting row exists, but fences could say `python3` for Unix. |
| Ch.0 glossary: Native / External, no Mock | `ch00` Glossary | Contract page explains Mock; Ch.0 does not. Cross-link is OK if I open p0-contract. |
| WH-01 “Goal” only — no outcomes / diagram / walkthrough / ≥3 troubleshooting | `labs/wh/wh-01-drive-twist/README.md` | Day-1 smoke is covered by Ch.0; as a graded lab sheet I still lean on starter + Ch.0 preview table. |

### Nice-to-have

| Quote / cue | File | Note |
|-------------|------|------|
| MW-01 has flowchart + dual OS fences + expected output + troubleshooting | `mw-01-pub-sub/README.md` | Good day-1 MW path. Still no `sequenceDiagram` (STYLE prefers it for ≥2 processes). |
| `python3 -m venv` then `python -m pip` | SETUP / Ch.0 | Correct pattern after activate; call that out once so novices don’t think inconsistency is a typo. |
| Wheel install `code/robotos-0.3.0-*.whl` | SETUP §3 bash | Fine if only one wheel; if a multi-OS tree is ever shipped, glob could grab the wrong tag — prefer `*macosx*` on Mac. |

---

## 2. Missing for ebook (scoped quality bar)

| Artifact | Day-1 macOS usable? | Ebook bar notes |
|----------|---------------------|-----------------|
| `SETUP.md` | **Mostly yes** | Fast path OK; residual linux-x64 defaults in §5/§7; Gatekeeper thin |
| `ch00-setup-your-machine.md` | **Yes with caveats** | Meets template (outcomes → glossary). §6.5 sim path is Linux-only; Gatekeeper not in troubleshooting table; Mock absent from glossary |
| `docs/p0-contract.md` | **Yes as cheat sheet** | Native≠Mock + UI “Bridge” ≠ serial-bridge clarified. Still not a full chapter (no Mermaid); fine as contract |
| WH-01 README | **Runnable** | Bash fence + expect line. Fails ebook lab bar: no learning outcomes, architecture, sequence, code walkthrough, troubleshooting ≥3, glossary |
| MW-01 README | **Yes** | Outcomes, prereqs, flowchart, Win+bash, expected output, troubleshooting. Gaps: sequence diagram, code walkthrough, check-yourself, glossary |
| `code/NOTES.txt` | **No for Mac** | Still windows-x64 stamped |

### Focus gaps left (Kenji)

1. **Pack identity consistency** — §2 is correct; §5/§7/Ch.0 §6.5 still teach `linux-x64` as the pasteable default.  
2. **NOTES stamp** — Mac drop must not open with `windows-x64` / `win_amd64` / `Activate.ps1` in section A.  
3. **Gatekeeper at launch time** — move/repeat allow steps beside `robotos-sim` first run; add troubleshooting row in Ch.0.  
4. **WH-01 lab sheet** — expand toward STYLE lab quality (or explicitly defer to a chapter) before calling the ebook WH path done.

---

## 3. Rewrite snippets (short)

### SETUP.md §5 — macOS smoke twin (don’t comment-swap)

```bash
# macOS Apple Silicon
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list
python3 labs/wh/wh-01-drive-twist/starter/drive_forward.py
```

(Keep a separate Linux fence with `linux-x64` — same pattern as §2.)

### ch00 §6.5 — Apple Silicon sim + Gatekeeper

```bash
chmod +x code/robotos-sim-v0.1.0-macos-arm64/robotos-sim 2>/dev/null || true
./code/robotos-sim-v0.1.0-macos-arm64/robotos-sim &
```

> **macOS only:** if the OS says the app “cannot be opened” / developer cannot be verified → right-click the app → **Open** once, or System Settings → Privacy & Security → Allow. Then confirm **External + Native + Connected**.

### code/NOTES.txt (macos-arm64 stamp)

When building the Mac drop, generate from `packs/NOTES.template.txt`:

```text
OS/arch:    macos-arm64
robotos-sim: code/robotos-sim-v0.1.0-macos-arm64/robotos-sim
Python:
  python3 -m venv .venv
  source .venv/bin/activate
  pip install code/robotos-0.3.0-*-macosx_*.whl
```

### WH-01 — minimal outcomes + troubleshooting (lab sheet)

```markdown
## Learning outcomes
- Publish `robotos.geometry.v1.Twist` on `/robot/01/cmd_vel` at ≥2 Hz
- Explain why External+Native is required (vs Manual / Mock)

## Troubleshooting
| Symptom | Fix |
| no motion | UI still Manual, or sim not Connected |
| stops early | publish rate / 500 ms timeout — keep the loop |
| `python: command not found` | `source .venv/bin/activate` or use `python3` |
```

---

## 4. Pass criteria — unsupervised macOS day-1

Mark **PASS** for this persona when:

1. Every copy-paste PATH/smoke/sim path for Mac uses **`macos-arm64`** (no “or swap the folder” comments as the only Mac path).  
2. **`code/NOTES.txt` in the Mac zip** matches macos-arm64 (wheel, activate, sim binary) — not a Windows leftover.  
3. **Gatekeeper** appears at first `robotos-sim` launch (Ch.0 + SETUP) with right-click Open / Privacy & Security, plus a troubleshooting row.  
4. Smoke: `robotos version` → `topic list` shows `/robot/01/*` → drive script moves ~1 m; expected transcripts already in Ch.0.  
5. **Native≠Mock** remains in p0-contract (done) and is linked from SETUP/Ch.0 glossary or troubleshooting.  
6. MW-01 bash twin remains (done); optional: add sequence + `python3` in Unix fences.

Until 1–3 land: **PARTIAL** — day-1 is teachable with a careful student, still fail-prone on paste + NOTES + first Gatekeeper hit.

---

## Appendix — files reviewed this pass

- `SETUP.md`  
- `docs/ebook/chapters/ch00-setup-your-machine.md`  
- `docs/p0-contract.md`  
- `labs/wh/wh-01-drive-twist/README.md`  
- `labs/mw/mw-01-pub-sub/README.md`  
- Spot-check: `code/NOTES.txt`, `packs/NOTES.template.txt`  
- Prior: `docs/ebook/reviews/mac-intermediate-kenji-20261102.md`
