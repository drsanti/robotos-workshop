# Persona re-review — Maya (`win-novice`)

**Date:** 2026-11-02 (after ebook upgrade)  
**Prior review:** [`win-novice-maya-20261102.md`](win-novice-maya-20261102.md) — **FAIL**  
**OS:** Windows 11 (university laptop image)  
**Reviewed (upgrade set only):**  
`SETUP.md`, `docs/ebook/chapters/ch00-setup-your-machine.md`,  
`labs/mw/mw-01-pub-sub/README.md`, `labs/wh/wh-01-drive-twist/README.md`  
**Lens:** Never opened PowerShell before. Afraid of red text / breaking the PC. Needs “what is a terminal,” copy-paste blocks, “you should see…,” ExecutionPolicy help, where the unzip went.

**Verdict: PARTIAL** for unsupervised day-1.

I can now **open PowerShell, set PATH, survive ExecutionPolicy, install the Windows wheel, launch the sim, and run the smoke / WH-01 / MW-01 commands** if I follow Ch.0 + SETUP carefully. I still **cannot** treat WH-01 (and fully MW-01) as ebook-ready lab sheets, and a few Windows-novice traps remain. Not a clean **PASS**; not the old stranded-before-step-2 **FAIL**.

---

## 1. Stuck points (remaining)

Ranked **Blocker** / **Confusing** / **Nice-to-have**. Quotes are exact from the upgrade set.

### Blocker

| # | Quote / location | Why I still stop (or fail unsupervised) |
|---|------------------|------------------------------------------|
| B1 | WH-01 README has **no Troubleshooting** section | If `robotos` / `python` missing, robot ignores Twist, or red ImportError — this lab sheet does not rescue me. SETUP/Ch.0 tables help only if I remember to leave the lab page. |
| B2 | WH-01 missing architecture / sequence / code walkthrough / glossary / learning outcomes | Against STYLE + skill quality bar the lab still fails ebook-ready. I can paste Run commands after SETUP, but I do not learn *why* the rate loop / zero Twist matter from **this** sheet (preview lives only in Ch.0 §7). |
| B3 | MW-01: “Open **two** terminals… (see SETUP)” (`mw-01` Practice) | Still no “Start → PowerShell **again** = second window.” I may reuse one window, Ctrl-C the publisher, then wonder why monitor is empty. |
| B4 | Sim UI: “Confirm … **NATIVE**” / “Warehouse → Native → External → Connect” (`SETUP` §4; Ch.0 §5.5) | Still no screenshot or labeled “you should see this button.” I remain afraid to click the wrong mode. Softened but not gone. |

### Confusing

| # | Quote / location | Why I hesitate |
|---|------------------|----------------|
| C1 | `cd YOUR_WORKSHOP_DIR` (`SETUP.md`) | Better than `<robotos-workshop>`, but I might still type the words `YOUR_WORKSHOP_DIR` literally. Ch.0’s `C:\robotos-workshop` + “change to YOUR unzip folder” is clearer; SETUP and Ch.0 disagree on how explicit the example is. |
| C2 | `python -m pip install (Get-Item .\code\robotos-0.3.0-*-win_amd64.whl).FullName` (Ch.0 §5.4) | Clever, but if `Get-Item` matches nothing I get a scary PowerShell error. SETUP’s exact `.\code\robotos-0.3.0-py3-none-win_amd64.whl` is safer for me. |
| C3 | Python “from python.org… Add to PATH” (SETUP / Ch.0) | No named fix for the **Microsoft Store** “which app?” picker or `py -3` fallback. University image panic remains possible. |
| C4 | MW-01 paths assume workshop **root** cwd after “see SETUP” | If I `cd` into `labs\mw\mw-01-pub-sub` thinking “lab folder,” `python labs\mw\...` fails. No `cd YOUR_WORKSHOP_DIR` paste in the lab itself. |
| C5 | WH-01 links `starter/README.md` for “Details / CLI hex” | Same advanced hex / backtick risk as before if I open it. Lab now correctly says flags are enough — good — but the link still invites freeze. |
| C6 | MW-01 theory is only a link to `docs/theory/07-messages-schema.md` | No in-lab theory bite / glossary (`publisher`, `subscriber`, `Imu`). Skill wants depth on the lab sheet, not “go read instructor notes.” |
| C7 | MW-01 has flowchart but **no** `sequenceDiagram` | Two processes interact — skill asks for sequence when ≥2 processes. |

### Nice-to-have

| # | Location | Note |
|---|----------|------|
| N1 | Ch.0 / SETUP sim steps | One screenshot of Native + External + Connected would clear B4. |
| N2 | All four docs | Thai gloss for terminal / venv / topic still calming. |
| N3 | WH-01 Expect line | Paste the full 2-line transcript from Ch.0 §8 into the lab (“`done — 100 cmds + zero`”). |
| N4 | MW-01 | Explicit PATH + `Activate.ps1` fences copied into Terminal A/B (not only “see SETUP”). |

---

## 2. What improved (vs prior FAIL)

Mapped to old blockers in `win-novice-maya-20261102.md`:

| Prior | Status after upgrade |
|-------|----------------------|
| B1 Open PowerShell | **Fixed** — SETUP §2 + Ch.0 §5.1 |
| B2 `cd <…>` / unknown unzip | **Mostly fixed** — `YOUR_WORKSHOP_DIR` + Ch.0 concrete `C:\…`; residual C1 |
| B3 ExecutionPolicy | **Fixed** — SETUP §3 + troubleshooting row; Ch.0 §5.4 + table |
| B4 Store / missing Python | **Improved** — python.org + Add to PATH; Store picker still unnamed |
| B5 Wildcard wheel | **Fixed** in SETUP (exact `win_amd64`); Ch.0 uses Get-Item pattern |
| B6 Sim glob / no `.exe` | **Fixed** — double-click / `Start-Process` + concrete folder name in Ch.0 |
| B7 Native/External UI | **Improved** — clearer steps; still no screenshot (B4) |
| B8 Author `d:\CODE\…` smoke path | **Fixed** — `YOUR_WORKSHOP_DIR` / no instructor absolute path in smoke |
| B9 WH-01 bash-only Run | **Fixed** — labeled PowerShell + bash fences; flags vs edit clarified |
| B10 MW-01 two terminals / freeze / Ctrl-C | **Mostly fixed** — two terminals called out, expected output, Ctrl-C row; opening 2nd window still weak (B3) |
| C1 Mixed shells in one fence | **Fixed** — OS forks separated |
| Mixed SETUP theory / Ch.0 | **New win** — Ch.0 is a real student chapter (LO, diagrams, transcripts, glossary) |

**SETUP** is now a usable fast path that **points novices to Ch.0** first. That single link changes my day-1 survival.

---

## 3. Missing for ebook (quality bar scorecard)

Per skill: Learning outcomes, Prerequisites, Theory depth, Architecture, Sequence, OS forks, Code walkthrough, Expected output, Troubleshooting (≥3), Check yourself, Glossary.

| Doc | LO | Prereq | Theory | Arch | Seq | Win/bash | Code walk | Expected | Trouble (≥3) | Check | Glossary | Ebook-ready? |
|-----|----|--------|--------|------|-----|----------|-----------|----------|--------------|-------|----------|--------------|
| `SETUP.md` | ✗ | partial | via Ch.0 link | ✗ | ✗ | ✓ | ✗ | ✓ better | ✓ (incl. ExecutionPolicy) | ✗ | ✗ | **Fast path OK** if Ch.0 is mandatory for novices |
| `ch00-setup-your-machine.md` | ✓ | ✓ | ✓ | ✓ Mermaid | ✓ Mermaid | ✓ | ✓ preview | ✓ transcripts | ✓ | ✓ | ✓ | **Yes** |
| `mw-01` README | ✓ | ✓ | link only | ✓ flowchart | ✗ | ✓ | ✗ | ✓ | ✓ (4) | Done when / checklist | ✗ | **Almost** — needs seq + walk + theory bite + glossary |
| `wh-01` README | ✗ (goal only) | ✓ | link only | ✗ | ✗ | ✓ | ✗ | thin | ✗ | checklist only | ✗ | **No** |

---

## 4. Rewrite snippets (short — not curriculum rewrite)

### 4.1 SETUP — make the `cd` foolproof

```markdown
Replace `YOUR_WORKSHOP_DIR` with your real folder, for example:

```powershell
cd C:\robotos-workshop
```

Do **not** type the words `YOUR_WORKSHOP_DIR`.
```

### 4.2 MW-01 — second window + paste PATH

```markdown
**Terminal A:** Win → PowerShell (first window).  
**Terminal B:** Win → PowerShell **again** (second window).  
In **each** window, from workshop root:

```powershell
cd C:\robotos-workshop   # your path
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
```
```

Add a Mermaid `sequenceDiagram` (sensor → topic → monitor) and 4–6 line walkthrough of `sim_sensor.py` / `monitor.py`.

### 4.3 WH-01 — minimum to clear lab quality bar

Add: Learning outcomes; small flowchart (script → `/robot/01/cmd_vel` → sim); sequence (Connect → publish → odom); Ch.0-style walkthrough table; full expected transcript; ≥3 troubleshooting rows; Check yourself; glossary (`Twist`, `cmd_vel`, External). Keep the existing PowerShell Run blocks.

### 4.4 Ch.0 wheel line (optional align with SETUP)

Prefer the exact filename fence from SETUP for Windows novices; keep `Get-ChildItem .\code\*.whl` as fallback.

---

## 5. Pass criteria — still unmet?

From prior review §4 (Maya unsupervised). Scope = this upgrade set (+ what it enables).

| # | Criterion | After upgrade |
|---|-----------|---------------|
| 1 | Open PowerShell; `cd` real unpack path | **Met** (Ch.0 + SETUP); watch literal `YOUR_WORKSHOP_DIR` |
| 2 | PATH + `robotos version` success | **Met** |
| 3 | venv + ExecutionPolicy + exact win wheel + import | **Met** in docs; Store-Python edge still soft |
| 4 | Double-click / start sim; recognize Native/External/Connected | **Partial** — steps yes, screenshot no |
| 5 | WH-00 topic list / echo | *Out of this file set* |
| 6 | WH-01 PowerShell; ~1 m move; understand rate + zero | **Partial** — Run/OS fork **met**; understanding + recovery **unmet** on lab sheet |
| 7 | MW-00 empty list meaning | *Out of this file set* |
| 8 | MW-01 two windows; pub left running; Ctrl-C; monitor prints | **Mostly met** — missing explicit “open second PowerShell” |
| 9 | Every lab sheet hits STYLE/skill quality bar | **Unmet** — WH-01 fails; MW-01 close but incomplete |
| 10 | Likely red-text failures documented with one-line fixes | **Met** for SETUP/Ch.0; **unmet** on WH-01 sheet |

---

## 6. Bottom line

- **Ch.0:** ship-quality for a Windows novice zero-to-smoke path.  
- **SETUP:** acceptable class-day twin **because** it links Ch.0 and fixed PATH / ExecutionPolicy / wheel / OS forks / author path.  
- **MW-01:** runnable for me with coaching-level gaps (second window, seq, walkthrough, glossary).  
- **WH-01:** commands fixed; **ebook lab sheet still incomplete** (no trouble table, diagrams, walkthrough, LO, glossary).

**PARTIAL** — I survive day-1 setup and can drive the canned scripts; I do not yet have unsupervised, ebook-complete WH-01 (and fully MW-01) without asking a TA when something goes red.
