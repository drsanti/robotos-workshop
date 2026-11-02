# Persona review — Maya (`win-novice`) on instructor theory cards

**Date:** 2026-11-02  
**Reviewer lens:** Maya — Windows 11 novice; peeks at `docs/theory/*` when a lab says “Further reading / theory.” Panics at jargon without a one-line gloss.  
**Scope (edited in place):**  
`docs/theory/01-graph-topics.md`, `02-twist-control.md`, `03-odometry-scan.md`, `04-feedback-control.md`, `05-wall-follow-fsm.md`, `07-messages-schema.md`  
**Role reminder (STYLE.md):** theory = **instructor short notes** (live lecture cards), not ebook chapters. Canonical student depth = `docs/ebook/chapters/`.

---

## Verdict: **PASS**

The assigned set is now fit for **live lecture cards** and for lab **Further reading** links: each file has who/when, ebook + lab links, student-voice outcomes, glossed talking points, a board sketch, check Qs with expected answers, and a mini-glossary. Notes stay short (no 1.5k-word chapter expansion). No Windows procedure dumps or author machine paths.

---

## Before → after (issues fixed)

| File | Before (Maya panic / gap) | After |
|------|---------------------------|--------|
| `01-graph-topics.md` | Outcomes were instructor “can say…”; no lab links; jargon (node/schema/Native) barely glossed; check Qs incomplete answers; no glossary | Who/when + MW-00/01 + WH-00 links; student outcomes; glosses; Mermaid+ASCII; 3 checks with answers; glossary |
| `02-twist-control.md` | Ebook link OK; no lab path; no board/Mermaid; thin outcomes; no glossary | WH-01 link; demo kept; board + Mermaid; timeout/ownership glossed; glossary |
| `03-odometry-scan.md` | No lab link; pitfalls OK but no glossary; yaw/quaternion unexplained for peekers | WH-02 link; indices emphasized; glossary; fuller checks |
| `04-feedback-control.md` | Labs named vaguely “03–04”; ebook OK; no Mermaid; no glossary | Explicit WH-03/WH-04 links; Mermaid open vs closed; chatter + timeout checks; glossary |
| `05-wall-follow-fsm.md` | Weakest structure: no outcomes block, no lab links, no board, checks without full answers | Full card template; WH-05/06; stateDiagram; outcomes + glossary |
| `07-messages-schema.md` | Bare bullets; **no ebook link**; Day tag only; one check | Linked to Ch.1 schemas § + MW-01; outcomes; board; glossary; notes no separate Ch.07 |

---

## Quality-bar scorecard (after)

| Criterion | 01 | 02 | 03 | 04 | 05 | 07 |
|-----------|----|----|----|----|----|-----|
| Title + who/when | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ebook chapter link | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (→ Ch.1) |
| Practice lab link(s) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Outcomes 2–4 (student voice) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Talking points + gloss | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Board sketch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Check Qs + expected answers | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mini-glossary | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Short (not ebook-length) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| No Win-only dumps / author paths | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Remaining gaps (acceptable / out of scope)

1. **No dedicated ebook chapter for messages-only** — `07` correctly points at Ch.1; a future “Ch. messages” is optional, not required for PASS.  
2. **Maya still needs lab/SETUP procedures elsewhere** — theory correctly does *not* teach PowerShell; if she only reads theory she still cannot run a lab (by design).  
3. **Other theory files** (`06`, `08`–`14`) were **not** in this edit set; same upgrade pattern should be applied later for curriculum consistency.  
4. **Thai gloss callouts** — optional per STYLE; not added (English one-line glosses are enough for lecture cards).  
5. **Screenshots** — not appropriate for instructor cards; ebook/labs own “you should see…”.

---

## Fit for use

| Use | Fit? |
|-----|------|
| Live lecture / board talk | **Yes** — timed, numbered points, sketches |
| Lab “Further reading” / theory link | **Yes** — relative paths to ebook + matching labs |
| Replace ebook chapters | **No** — intentionally short; students should open `docs/ebook/chapters/` for depth |

---

## Top fixes applied (summary)

1. Uniform lecture-card template on all six files.  
2. Fixed/added relative links to ebook chapters and practice labs.  
3. Student-voice learning outcomes + first-use jargon glosses (Maya peek-safe).  
4. Board sketches (ASCII + small Mermaid) everywhere, including former weak `05` / `07`.  
5. Check questions with brief expected answers + mini-glossaries; rebuilt thin `07-messages-schema.md`.
