# Persona re-review — Maya (`win-novice`) on WH-01 after `labs.common`

**Date:** 2026-11-02  
**Reviewer lens:** Maya — Windows 11; never lived in PowerShell; copy-paste only; panics on red text.  
**Scope:** WH-01 after `labs.common` polish (not a full day-1 SETUP re-audit).  
**Read:** `labs/wh/wh-01-drive-twist/README.md`, `starter/drive_forward.py`, `labs/common/README.md` (skim), `docs/ebook/chapters/ch02-twist-control.md` §7 (+ §9).  
**Prior design review:** [`lab-common-maya-win-novice-20261102.md`](lab-common-maya-win-novice-20261102.md).

**Verdict: PARTIAL**

I can paste the workshop-root PowerShell fences and complete the lab motion tasks. The publish `for` loop is still in the starter (pedagogy lock holds). `ModuleNotFoundError: labs` is covered on the lab sheet. I am still confused by bootstrap / helper jargon and by the advanced `starter/README.md` cwd story until the small doc fixes below — not a clean unsupervised **PASS**, not a refactor **FAIL**.

---

## Check answers (Maya)

| Check | Result |
|-------|--------|
| Run from workshop root? | **Yes.** README: stay in root; do **not** `cd` into `starter\`. PowerShell fences are copy-pasteable. |
| Path-walk / `settle` / `make_twist` confuse? | **Yes, before polish.** “Path walk” / “discovery settle” are CS words. I need “do not edit / do not open that folder.” Helpers themselves are fine if I never open `labs/common`. |
| Publish `for` loop still visible? | **Yes.** Starter keeps `for _i in range(n): pub.publish(msg); sleep` + final `zero_twist()` with teaching comment. |
| `ModuleNotFoundError: labs` covered? | **Lab README: yes** (troubleshooting row). **Ch.02 §9: was missing** → fixed in this pass. |

Import smoke (workshop root, `.venv`): `labs.common` (`settle`, `make_twist`) imports OK; starter parses.

---

## Stuck points

### Blocker (for clean PASS)

| # | Where | Why I still hesitate |
|---|-------|----------------------|
| B1 | `drive_forward.py` top ~10-line `while` + `sys.path` | Looks like “the assignment.” Comment says do not edit + English `SystemExit` — good — but length still scares me vs prior “2–4 line ideal.” Acceptable only if docs say ignore it. |
| B2 | Ch.02 §7 / walkthrough jargon (pre-fix) | “Discovery settle” / “path walk” without plain English → I think I must understand `labs.common` to pass. |

### Confusing

| # | Where | Note |
|---|-------|------|
| C1 | `starter/README.md` (pre-fix) | Said “from this directory” while parent says root-only — I would `cd` into `starter\` and break the story. |
| C2 | `settle()` name | I do not know “discovery.” One table phrase (“brief wait”) is enough; I must not open `node_util.py`. |
| C3 | Optional link to starter README for CLI hex | Still invites hex/backtick freeze if I follow every link. |

### Nice-to-have

| # | Note |
|---|------|
| N1 | Fail message could print “searched from: …” for TAs. |
| N2 | Thai gloss for `settle` / workshop root still calming. |

---

## What works (vs design must-fixes)

| Must-fix from prior design review | WH-01 status |
|------------------------------------|--------------|
| Root-first Run fences | **Done** |
| `ModuleNotFoundError: labs` row on lab README | **Done** |
| Walkthrough: what stayed vs `labs.common` | **Done** (wording polished this pass) |
| WH-01 publish loop not hidden | **Done** — no `rate_publish()` |
| English failure if no `SETUP.md` | **Done** in starter |
| Students do not edit `labs.common` | Stated in lab walkthrough + `labs/common/README.md` (TA audience) |

---

## Concrete fixes

### Applied this pass (≤10 lines each; no `labs.common` redesign)

1. **`labs/wh/wh-01-drive-twist/README.md`** — walkthrough table: plain “block that finds SETUP.md” / “do not open that folder” instead of “path walk” / vague plumbing.  
2. **`docs/ebook/chapters/ch02-twist-control.md` §7** — path bootstrap + `make_twist` rows; drop “discovery settle” jargon.  
3. **Ch.02 §9** — add `ModuleNotFoundError: labs` → workshop root.  
4. **`starter/README.md`** — prefer parent README from workshop root; mark same-folder run as advanced.  
5. **`drive_forward.py`** — one comment above common imports: shared helpers, do not edit `labs/common`.

### Remaining (authors; optional)

| Fix | Why |
|-----|-----|
| Shrink bootstrap toward a 2–4 line helper **or** keep inline but identical + bold “ignore this block” in every WH/HW walkthrough | B1 length still Maya-heavy |
| Do not deep-link novices into starter CLI hex from the main Run section | C3 |

---

## Scorecard (WH-01 lab sheet only)

| Item | OK? |
|------|-----|
| Learning outcomes / Run from root / Expected / Troubleshooting incl. `labs` | Yes |
| Code walkthrough names helpers without sending me into `labs/common` | Yes (after polish) |
| Pedagogy: timed publish loop + final zero in starter | Yes |
| Ch.02 §7 aligned with starter | Yes (after polish) |
| Zero jargon panic for win-novice | Partial — settle name remains; mitigated by table |

---

## Summary for authors

**Verdict: PARTIAL.** Root run + visible publish loop + lab-sheet `ModuleNotFoundError: labs` meet the refactor teaching goals. Maya still trips on bootstrap length and helper jargon; small README/ch02/starter wording fixes applied this pass. Remaining for a clean **PASS**: treat the path block as “ignore,” avoid novice hex deep-links, optional shorter bootstrap later — **do not** redesign `labs.common`.
