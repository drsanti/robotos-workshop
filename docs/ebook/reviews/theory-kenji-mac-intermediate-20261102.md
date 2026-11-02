# Persona review — Kenji (`mac-intermediate`) — theory cards 08–13

**Date:** 2026-11-02  
**OS lens:** macOS Apple Silicon — bash fine; no PowerShell-only dumps wanted  
**Skill lens:** CS undergrad — contracts (`/test/echo`, `/machine/01/*`, `/robot/01/*`), Native≠Mock, schema names; hates vague “robot metaphor” talk  
**Scope:** `docs/theory/08-services.md` … `13-digital-twin.md` (instructor short notes) vs ebook Ch.6/7/10–13 + labs MW-02…06  
**Role reminder:** theory = live lecture cards; ebook chapters = canonical student depth. Do not score theory as full chapters.

**Verdict:** **PASS** (after in-place upgrade this session)

---

## 1. Pre-upgrade state (why FAIL → work)

| File | Before | Kenji panic |
|------|--------|-------------|
| 08 services | 4 bullets, 1 unanswered check, no lab link, no `/test/echo` | “Service” as metaphor; no schema/`UNAVAILABLE` |
| 09 actions | Shape ok; no `/machine/01/cycle`, no Q answers | Would try to drive WH with “an action” |
| 10 params | Generic declare/get; no `tuning_node` / `setpoint` | Param vs config-topic still fuzzy |
| 11 observe/QoS | Tool names only; no Native≠Mock / Bridge≠serial-bridge | Empty list → blame Zenoh |
| 12 TF | Chain only; no WH-02 link; unanswered dock Q | “x=3” docking hand-wave |
| 13 twin | Twin idea ok; weak MW-06 names; twin≈sim mush | Different topics “still a twin?” |

None met the lecture-card quality bar (outcomes, lab link, named contracts, sequence, answered checks, confusion table).

---

## 2. Post-upgrade checklist

| # | Quality bar item | 08 | 09 | 10 | 11 | 12 | 13 |
|---|------------------|----|----|----|----|----|-----|
| 1 | Title + who/when | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 2 | Ebook chapter link | Ch.6 | Ch.7 | Ch.10 | Ch.12 | Ch.13 | Ch.11 |
| 3 | Practice lab link(s) | MW-02 | MW-03 | MW-04 (+HW-04) | MW-00 / live | WH-02 | MW-06 (+MW-05) |
| 4 | Outcomes 2–4 | 4 | 4 | 4 | 4 | 4 | 4 |
| 5 | Precise names | `/test/echo`, Echo* | `/machine/01/cycle` | `tuning_node`, setpoint/mode | `/robot/01/*`, `/machine/01/…` | odom frames | `/machine/01/state\|cmd` |
| 6 | Board / Mermaid | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 7 | Check Q **+ answers** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 8 | Common confusions | ✓ | ✓ | ✓ | Bridge/Mock | ✓ | twin≠Mock/sim |
| 9 | No PowerShell-only dumps | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| — | Stays short (not ebook-length) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Consistency with starters:** service `/test/echo` + `echo_pb2`; action `/machine/01/cycle` + feedback `step i/5`; params `setpoint`/`mode` + allow-remote; twin topics + Imu stand-in — match lab code.

---

## 3. Deltas applied (this session)

1. **Named every workshop contract** instead of robotics metaphors (service/action/param/twin topics + schemas).  
2. **Linked ebook + lab** on every card; params/twin point at HW-04 / bags / WH where useful.  
3. **Added outcomes, ASCII + Mermaid, answered checks, confusion tables.**  
4. **Called out Native≠Mock and UI Bridge ≠ `serial-bridge`** on observe + twin (and “N/A” on pure laptop MW-02/03/04).  
5. **Kept cards lecture-length** — depth left in Ch.6/7/10–13.

---

## 4. Remaining gaps (non-blocking)

| Gap | Severity | Note |
|-----|----------|------|
| Exact `robotos lifecycle` subcommands | Low | Still “`--help` / NOTES” — pack-version drift; OK for cards |
| Full TF publisher story | Low | Honest “out of pack”; WH-02 echo only |
| QoS preset enums | Low | Conceptual on purpose; `--help` for knobs |
| Live expected transcripts | Low | Belong in lab/ebook, not theory cards |
| Cross-link MW-05 on observe card | Nice | Bags observe path optional |

None block a PASS for **instructor short notes**.

---

## 5. Verdict rationale

- **PASS:** All six cards meet the theory quality bar and align with ebook + MW-02…06 names I need as Kenji.  
- Not scored as ebook chapters (STYLE.md): missing code walkthrough / dual-OS hands-on by design.  
- Earlier Kenji ebook review (`mac-intermediate-kenji-20261102.md`) still applies to SETUP/NOTES/labs elsewhere — **out of this theory scope**.

---

## 6. Top fixes delivered (summary for instructors)

1. Wired **exact names**: `/test/echo`, `/machine/01/cycle`, `tuning_node`/`setpoint`/`mode`, `/machine/01/state|cmd`, `/robot/01/odom` frames.  
2. Added **lab + ebook links** and **2–4 outcomes** on every card.  
3. Added **sequence/board sketches** (ASCII + Mermaid).  
4. **Answered** check questions; added **confusion tables** (esp. Native≠Mock, Bridge≠serial-bridge, twin≠second system).  
5. Kept notes **short** — no PowerShell dumps, no ebook-length expansion.
