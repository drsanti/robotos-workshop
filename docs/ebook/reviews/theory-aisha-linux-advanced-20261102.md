# Persona review — theory cards — Aisha (`linux-advanced`) — 2026-11-02

**Persona:** Ubuntu 24.04 CLI power user; wants precision (dialout, bag paths, board topics); allergic to Windows-only or hand-wavy HW notes.  
**Role reminder:** `docs/theory/*` = instructor short cards; ebook chapters = canonical student depth (`STYLE.md`).  
**Edited this pass:** `06-bags-evidence.md`, `14-board-on-graph.md`, `docs/theory/README.md` (new index).  
**Did not edit:** `01`–`05`, `07`–`13` (other agents / leave intact).

**Verdict:** **Pass for instructor use on bags + board** after this upgrade. Cards now carry outcomes, LISTEN/CONNECT, `/robot/01/sys/board`, caps pointer, dialout one-liner, evidence/replay caveats, and lab+ebook links. **Whole `theory/` set is only partially coherent** until 07–13 (and thinner Day-2 cards) get the same bar — numbering vs ebook is already documented in the new README.

---

## 1. Assigned cards — before → after

### `06-bags-evidence.md`

| Gap (before) | Fix |
|--------------|-----|
| No outcomes; thin bullets | Outcomes + talking points for grading culture |
| No bag path / cwd cue | Explicit: file lands relative to record cwd |
| Warehouse-only vibe | Links MW-05, WH-07, HW-06; caps-aware topic pick for board |
| Replay mentioned once | Dedicated “replay ≠ live” + check Q on empty HW bag |
| No sketch / glossary / lab block | Added |

**Aisha lens:** Commands stay OS-neutral (`robotos record` / `bag info`). No PowerShell dump. Points graders at the actual `.rbag` path — silent “where did my bag go?” was a real annoyance.

### `14-board-on-graph.md`

| Gap (before) | Fix |
|--------------|-----|
| “use CONNECT as in NOTES” (Win-circular) | LISTEN vs CONNECT table in talking points |
| No `/robot/01/sys/board` callout | Heartbeat topic named |
| Caps table only; no “pointer” framing | Short bit list + “full table in ebook/HW-01” |
| No dialout | One-liner + `/dev/ttyACM*` — **not** a SETUP dump |
| No outcomes / sketch / labs / glossary | Added |

**Aisha lens:** Dialout + device node without pasting the whole bash PATH block. Caps bits stay a pointer so the card doesn’t rot when the HW-01 table updates. Self-connect warning kept explicit (Leo panic; Aisha catches it too).

### `docs/theory/README.md`

- States theory = instructor cards / ebook = student reading / labs = procedures.  
- Index **01–14** with one-line purpose, ebook link, lab link(s).  
- Flags theory↔ebook number skew and missing dedicated chapter for **07**.  
- Suggested lecture order for Day 1 / Day 2 / HW.

---

## 2. Whole `theory/` coherence (observed, not edited)

Gold bar (from `01-graph-topics.md` + this pass): **outcomes · talking points · sketch · check Qs · ebook + lab links · glossary if jargon-heavy**.

| Card | Coherent enough? | Gap for Aisha / instructors (others should fix) |
|------|------------------|--------------------------------------------------|
| 01 | Strong | Good template; already links ebook |
| 02 | Strong | Fine; timeout story is precise |
| 03 | Strong | Fine |
| 04 | Strong | Sketch present |
| 05 | Medium | Bullets only; no Outcomes header / no lab links block |
| **06** | **Upgraded** | — |
| 07 | Weak | No ebook link; no Outcomes/sketch; schema depth lives in ch01 — README notes orphan |
| 08 | Medium | Points + check only; add Outcomes + lab link |
| 09 | Medium | Same |
| 10 | Medium–weak | No Outcomes/sketch/lab; params vs topic Q is good |
| 11 | Medium–weak | Observe list is useful; QoS still hand-wavy (presets named, no when-to-pick) |
| 12 | Medium | Sketch OK; no lab (concept-only — OK if README says so) |
| 13 | Medium | Twin story OK; no Outcomes |
| **14** | **Upgraded** | — |

**Cross-set issues (do not block bags/board cards):**

1. **Numbering skew** (theory 04→ch05, 05→ch08, 08→ch06, …) — README documents it; instructors still confuse “theory 08” with “chapter 8.”  
2. **07-messages-schema** has no dedicated ebook chapter — either fold into ch01 firmly or add a short ch.  
3. **Day-2 MW cards (08–11)** lack the Outcomes/lab footer that WH cards mostly have — set feels two-tier.  
4. **HW path elsewhere** (SETUP/NOTES) may still be Windows-first; theory 14 no longer depends on NOTES for LISTEN/CONNECT truth.  
5. No theory card explicitly ties **WH-08 capstone rubric** beyond 06’s lab list — fine if capstone brief uses 06.

---

## 3. Stuck / panic triggers (theory scope only)

| Severity | Item | Status after this pass |
|----------|------|------------------------|
| Blocker | Theory 14 deferred all env to Windows NOTES | **Fixed** — LISTEN/CONNECT on the card |
| Blocker | No dialout on HW theory | **Fixed** — one-liner |
| Confusing | Bags card ignored HW-06 / caps | **Fixed** |
| Confusing | theory/README missing → no map of 01–14 | **Fixed** |
| Nice-to-have | 07 orphan chapter; 08–11 missing Outcomes | Open for other editors |

---

## 4. Check against quality bar (edited files)

| Element | 06 | 14 | README |
|---------|----|----|--------|
| Outcomes | ✓ | ✓ | n/a (index) |
| Talking points | ✓ | ✓ | — |
| Sketch | ✓ | ✓ | — |
| Check Qs | ✓ | ✓ | — |
| Ebook link | ✓ | ✓ | all rows |
| Lab links | ✓ | ✓ | all rows |
| Glossary | ✓ | ✓ | role table |
| Linux precision | path/cwd | dialout + ttyACM | notes skew |

---

## 5. Recommendation

Ship **06**, **14**, and **README** with the next instructor pack. Ask owners of **05, 07–13** to match the Outcomes + lab-footer pattern; prioritize **07** (ebook orphan) and **10/11** (thin Day-2). Do not expand theory cards into ebook-length chapters — push depth to `docs/ebook/chapters/` only.
