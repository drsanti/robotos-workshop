# Persona review — Maya (`win-novice`) on `labs/common` refactor

**Date:** 2026-11-02  
**Reviewer lens:** Maya — Windows 11 university laptop; never lived in PowerShell before this course; afraid of red text and “breaking” the PC. Goals: pass WH labs; copy-paste only; “you should see…”.  
**Scope:** Proposed design only (locked + fine-tunes). **No code implemented.** Sample starters read as-today:  
`labs/hw/hw-01-caps-probe/starter/caps_probe.py`,  
`labs/wh/wh-01-drive-twist/starter/drive_forward.py`,  
`labs/wh/wh-03-avoid-front/starter/avoid_front.py`,  
plus `labs/README.md`, WH-01 / HW-01 READMEs (run cwd), and theory note that “starter has `yaw_from_quat`”.  
**Role:** students must **not** be asked to edit `labs/common`.

---

## 1. Verdict: **APPROVE_WITH_CHANGES**

The pedagogy locks are right for me: keep `robotos.Node`, `create_publisher` / `create_subscriber`, `on_message`, topic constants, message types, and the lab loop (WH-01 `for` publish; HW-01 yes/no caps print; avoid threshold logic) **in the starter I open**. Moving only wait/settle/Twist helpers/`LatestScan`/`yaw_from_quat`/`CAPS_BITS` into `labs/common/` is fine **if** the first red traceback I hit is teachable and the README still tells me exactly one paste path.

I do **not** REJECT — hiding the publish loop behind `rate_publish()` or moving the caps yes/no print would. I also do **not** plain APPROVE until path bootstrap + docs catch Maya’s panic list below.

Pilot order (caps_probe → drive_forward → avoid_front; then WH/HW sweep; leave short MW alone) is good: I meet the new import on labs I already struggle with, not on day-1 MW.

---

## 2. Panic triggers (Maya)

| Trigger | What I see / think | Why I stop |
|---------|-------------------|------------|
| **`ModuleNotFoundError: No module named 'labs'`** (or `labs.common`) | Red traceback; file “works” yesterday without that line | I do not know packages, `PYTHONPATH`, or that `labs` must be a folder next to `SETUP.md`. I will reinstall the wheel or re-activate venv and still fail. |
| **Pathsetup silent / wrong root** | Walk for `SETUP.md` finds nothing, or finds a random nested copy | Cryptic exit or imports half-work. I need a **one-line English** failure: “Run from the workshop folder that contains SETUP.md (see lab README).” |
| **“Where is the code?”** | Starter shrunk; ebook/theory still says “starter has `yaw_from_quat`” / code walkthrough lists only in-file pieces | I open `drive_forward.py` / `avoid_front.py` / `sense.py` for the lecture demo and the helper is gone. I think I have the wrong zip. |
| **`ImportError` deep in `labs/common/...`** | Stack frames under a folder I was told not to edit | Panic: “did I break common?” Docs must say: **do not edit common**; if red text mentions `labs\common`, re-run PATH + venv + paste the lab Run block from root. |
| **Cwd contradiction** | WH-01 README today: stay in root, **do not** `cd` into `starter\`. Design: `python labs/...` **or** from `starter/` | I will half-follow both. Pick **one recommended** Windows paste for Maya (workshop root). “Also works from starter” is optional footnote, not two equal fences. |
| **Heavy / magic `__init__.py` re-exports** | `from labs.common import *` or names I never see defined | I cannot grep the starter for `LatestScan`. Explicit `from labs.common.scan import LatestScan` is the locked choice — keep it. |
| **Too many bootstrap lines** | 15+ lines of `sys.path` before `import robotos` | I assume that block is the assignment and start editing it. Cap it; mark **do not edit**. |

Persona baseline panics still apply (ExecutionPolicy, `python` Store picker, `command not found`) — this refactor must not add a **fourth** environment concept without a copy-paste fix row.

---

## 3. Concrete suggestions

### Bootstrap wording (starter top)

Keep pathsetup **≤ ~6 lines**, identical across pilot labs, with a student-safe comment. Example shape (design intent, not a patch):

```python
# Workshop path (do not edit) — finds the folder that contains SETUP.md
from labs.common.pathsetup import ensure_workshop_root_on_path
ensure_workshop_root_on_path()
```

Or inline walk **only if** it stays short (same line budget). Prefer a **named helper** so the scary walk lives in common, not in every starter I stare at.

**Fail loudly in English** if `SETUP.md` is not found — no empty `sys.path` tweak and a later `labs` import error.

### How many lines of pathsetup is OK?

| Lines in the starter file | Maya OK? |
|---------------------------|----------|
| **2–4** (import helper + call + 1 comment) | **Yes** — ideal |
| **5–8** (tiny inline walk + comment) | Acceptable if identical everywhere |
| **9+** or custom per lab | **No** — I will edit or delete it |

Do **not** ask me to set `PYTHONPATH` by hand in PowerShell for normal labs.

### README / `labs/README.md`

1. **`labs/README.md`:** add one row/note: `common/` = shared plumbing for starters; **students do not open or edit it** (unless a TA says so).  
2. **Pilot lab Run sections:** keep the **primary** PowerShell fence from workshop root (current WH-01 style). Optionally one italic line: “Advanced: running inside `starter\` also works; pathsetup finds `SETUP.md` upward.”  
3. **Code walkthrough tables:** list what stayed visible (`Node`, publish loop, yes/no print) and one row: “Settle / wait / scan helper → `labs.common` (you do not edit).”  
4. **Troubleshooting:** new row — `ModuleNotFoundError: labs` → you are not under the unzip that contains `SETUP.md` + `labs\`; paste the Run block from the lab README; do not edit `labs\common`.  
5. **Theory / ebook:** anywhere that says “starter has `yaw_from_quat`” must say “imported from `labs.common`” (or keep a **one-line call + comment** in the starter so the name still appears in the file I open for WH-02/04).

### Import style

Lean `__init__.py` (no heavy re-exports) matches Maya: I only understand names I see in the starter. Prefer:

`from labs.common.scan import LatestScan`  
not `from labs.common import LatestScan` unless the name is trivial and documented in the lab README.

---

## 4. What must stay in the starter so I still learn

| Must stay visible in starter | Why (Maya / WH pass) |
|------------------------------|----------------------|
| `import robotos` + `robotos.Node(...)` | This is the graph; I need to see the `with` block. |
| `create_publisher` / `create_subscriber` | Lab outcome language matches the code I paste/run. |
| `on_message(...)` (where used) | HW-01 / avoid teach callbacks; don’t hide behind a black-box wait that never shows the callback pattern in the starter. |
| Topic string constants (`TOPIC`, `TOPIC_CMD`, …) | I match CLI `topic list` / contract names. |
| Message type imports (`Twist`, `LaserScan`, `BoardInfo`, …) | Schema names appear in the file I submit/show. |
| **WH-01:** the `for i in range(n): pub.publish(...); sleep` loop + final zero | Teaching “keep publishing”; **do not** wrap in `rate_publish()`. |
| **HW-01:** the yes/no `print` loop over bits (`info.caps & bit`) | Learning outcome is decode caps; table data may live in common, **print logic stays**. |
| **avoid_front:** threshold / turn-vs-creep decision + publish loop | Lab logic, not plumbing. |
| Argparse / flags that the README teaches | I change motion without editing “scary” internals. |

**OK to move (plumbing only):** settle `sleep(0.8)`, `wait_for_message` helper, `make_twist` / zero helper, `LatestScan` R/F/L holder, `yaw_from_quat`, `CAPS_BITS` table data.

**Still show a breadcrumb:** after a move, either a one-line use (`scan = LatestScan(...); front = scan.front`) or a comment `# front range: see labs.common.scan.LatestScan` so “where is the code?” has an answer inside the starter.

---

## 5. Top 5 — must-fix / nice-to-have

### Must-fix

1. **Maya-safe bootstrap** — 2–4 starter lines, identical in pilots; English error if `SETUP.md` not found; never require hand-set `PYTHONPATH` for the happy path.  
2. **Docs cwd story** — primary Run = workshop root (current WH-01); resolve contradiction with “also from starter/”; add `ModuleNotFoundError: labs` troubleshooting row on pilot READMEs.  
3. **Pedagogy locks enforced in pilots** — WH-01 publish `for`-loop stays; HW-01 yes/no print stays; no `rate_publish()` teaching hide.  
4. **`labs/README.md` + lab walkthrough** — state that students do **not** edit `labs/common`; walkthrough lists what moved vs what stayed.  
5. **Cross-doc rename** — theory/ebook “starter has `yaw_from_quat`” (and similar) updated so I don’t hunt a missing function and assume a bad pack.

### Nice-to-have

1. Fail message prints the directory it searched from (so a TA can see I double-clicked from Downloads).  
2. Starter comment above common imports: “Shared helpers — do not edit `labs/common`.”  
3. Keep MW starters unchanged (as planned) so day-1 pub/sub doesn’t add pathsetup noise.  
4. After pilot, same bootstrap snippet only — no per-lab variants when sweeping WH/HW.  
5. Optional tiny `labs/common/README.md` one paragraph for TAs (“not a student exercise”).

---

## Fit for Maya class day (after changes)

| Question | Answer |
|----------|--------|
| Can I still learn Twist publish / caps decode / avoid logic? | **Yes**, if locks hold. |
| Will `python labs\...\starter\foo.py` from root keep working? | **Must** — that is my only confident paste today. |
| Should I open `labs/common`? | **No** — say so in `labs/README.md`. |
| Ship without README/theory updates? | **No** — that is an APPROVE_WITH_CHANGES blocker for me. |

---

## Summary for authors

**Verdict: APPROVE_WITH_CHANGES.**  
Top suggestions: (1) tiny identical pathsetup + English failure, (2) root-first Run docs + `labs` import troubleshooting, (3) keep publish loop / caps print visible and update “starter has helper” docs so I still know where the code went.
