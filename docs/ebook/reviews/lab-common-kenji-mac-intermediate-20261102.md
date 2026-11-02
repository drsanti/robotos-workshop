# Persona review — Kenji (`mac-intermediate`) — `labs/common` helpers

**Date:** 2026-11-02  
**OS lens:** macOS Apple Silicon — bash/`python3` fine; no hand-holding on `cd`  
**Skill lens:** CS undergrad — contracts (`/robot/01/*`), schema imports, Native≠Mock; little robotics  
**Scope:** Proposed `labs/common` design (locked 1A+2A + fine-tunes); skimmed `fsm_drive.py`, `sense.py`, `monitor.py`, plus `drive_forward.py` / `avoid_front.py` / `caps_probe.py`  
**Role:** Would I still *see* the graph API, or is plumbing swallowed into magic?

**Verdict:** **APPROVE_WITH_CHANGES**

---

## 1. Pedagogy — hide graph API vs cut boilerplate

### What I need to still see in the starter

| Keep in starter | Why (Kenji) |
|-----------------|-------------|
| `with robotos.Node(...)` | This *is* “I am a node on the graph.” |
| `create_publisher` / `create_subscriber` + topic constants | Contract teaching (`/robot/01/cmd_vel`, `/scan`, …) |
| Message type imports (`Twist`, `LaserScan`, `BoardInfo`, …) | Schema story; ebook already points at these lines |
| `sub.on_message(...)` (or an obvious one-liner that still names it) | Pub/sub callback model — MW lesson, reused in WH |
| Lab logic (thresholds, FSM, caps yes/no print, rate `for` loop in WH-01) | That is the assignment, not plumbing |

The locked pedagogy (**Node stays; plumbing moves**) matches that. Fine-tunes that **keep WH-01’s publish `for`-loop** and **HW-01’s caps print loop** in the starter are the right calls — those loops *are* the labs.

### Boilerplate I am happy to lose

- Duplicated `yaw_from_quat` (WH-02 / WH-04) — formula belongs in theory/ebook once; copy-paste across starters teaches nothing new after the first sighting.
- `threading.Event` + `box` in HW-01 — real robotics pattern, but HW-01’s outcome is “decode caps,” not “hand-roll a waiter.” `wait_for_message` is fair.
- Caps bit table constants — data, not a concept; fine in `CAPS_BITS`.
- `Twist(linear={"x": ...}, angular={"z": ...})` sugar via `make_twist` / `zero_twist` — OK **if** WH-01 still constructs or clearly uses Twist in the visible loop so I don’t forget the schema fields.

### Where the design still over-hides (relative to the plan draft)

The original plan also floated `rate_loop` / `run_until_interrupt` / `attach_scan` / `rate_publish`. Fine-tunes correctly killed fat `rate_publish` for WH-01. I would **also** keep these out of v1 (or unused by pilots):

| Helper | Risk |
|--------|------|
| `attach_scan(sub)` | Hides `on_message` — the thing MW-01 taught me |
| `run_until_interrupt(fn)` | Hides Ctrl-C + zero-Twist shutdown habit in WH-03/05/06 |
| `rate_loop(hz)` wrapping the whole control body | Turns avoid/FSM into “call this framework”; control loop should stay visible |

`settle(0.8)` is fine **only if** the call site still says *why* (discovery / matching). Today’s comment `# discovery settle` is the lesson; a bare `settle()` with no comment teaches “magic sleep.”

### Skim verdict: what should / shouldn’t move

| File | Move to common? | Leave in starter |
|------|-----------------|------------------|
| **mw-01 `monitor.py`** | **Nothing.** Already short; it *is* the pub/sub teaching artifact. No MW churn — agree. |
| **wh-02 `sense.py`** | `yaw_from_quat` only (shared with square). Optional tiny pose helper later. | Explicit `latest_odom` / `latest_scan` + both `on_message` handlers — first “latest sample” lab; don’t force `LatestScan` here. |
| **wh-06 `fsm_drive.py`** | Optional `LatestScan` (or shared R/F/L buffer helper) + `settle` + `make_twist`/`zero_twist`. | Entire FSM (`CRUISE`/`AVOID`/`RECOVER`), threshold compares, transition prints, `while True` + Ctrl-C zero. |

Net: design does **not** hide too much graph API *if* fine-tunes stick and `attach_scan` / interrupt wrappers stay non-goals. It still leaves a bit of good boilerplate (control loops, dual latest-msg in WH-02) — that is correct, not “not enough extraction.”

---

## 2. API shape suggestions

### Prefer

```text
labs/common/
  pathsetup.py     # see Risks — bootstrap must not assume import works
  wait.py          # wait_for_message(sub, timeout: float) -> Msg
  node_util.py     # settle(seconds: float = 0.8)
  twist.py         # make_twist(*, vx=0.0, wz=0.0) -> Twist; zero_twist() -> Twist
  scan.py          # LatestScan  (optional for WH-03+)
  odom.py          # yaw_from_quat(x,y,z,w) -> float
  caps.py          # CAPS_BITS: sequence of (bit, name, demo)
```

Lean imports (`from labs.common.scan import LatestScan`, not star-import from a fat `__init__`) — **approve.** Protobuf pull-in on every MW script would annoy me and slow “hello subscriber.”

### Naming / contracts

| Proposed | Kenji note |
|----------|------------|
| `wait_for_message(sub, timeout)` | Good name. Prefer **raise** with a clear message on timeout (HW-01 already `sys.exit("no BoardInfo…")`) over silent `None` — don’t make me forget to check. Document that it uses `on_message` + Event under the hood so I can still explain it. |
| `settle(seconds=0.8)` | OK. Call-site comment required: `# discovery settle`. Alternate name `settle_discovery` if you want the why in the identifier. |
| `make_twist` / `zero_twist` | Clear. Avoid `TwistBuilder` / kwargs soup. Keep constructing fields I already know (`linear.x`, `angular.z`). |
| `LatestScan` | Useful for WH-03/05/06 where the same mutable R/F/L buffer repeats. Expose `.r`, `.f`, `.l` (or index 0/1/2 matching the 3-beam contract) **and** keep attaching via visible `sub.on_message(scan.update)` — not a hidden attach. |
| `LatestScan` vs plain list | For WH-02, **prefer plain `latest_*: Msg \| None`** — I am learning “callback overwrites a variable.” A class there jumps the gun. For avoid/wall/FSM, a small class beats three magic indices *if* README/ebook still says ranges[0]=R, [1]=F, [2]=L. |
| `yaw_from_quat` | Keep exact name; theory/ebook already cite it. Signature `(x,y,z,w)` matching starter — don’t take a quaternion message object and hide field access on day 1. |
| `CAPS_BITS` | Table only. **Do not** ship `print_caps` / `format_caps_lines` as the HW-01 body — print loop stays in starter (fine-tune). |

### What I would *not* put in the public surface (v1)

- `rate_publish` / generic `rate_loop` as the WH-01 path  
- `WorkshopNode` / `RobotApp` base class  
- Anything that creates the `Node` for me  
- Eager re-exports of every helper + all pb2 types from `labs.common`

---

## 3. Risks

### 1. Magic `pathsetup` (highest — real CS footgun)

Proposed starter pattern:

```python
from labs.common.pathsetup import ensure_workshop_root_on_path
ensure_workshop_root_on_path()
```

When I run `python3 labs/wh/wh-01-drive-twist/starter/drive_forward.py`, Python puts **`starter/`** on `sys.path[0]`, not the workshop root. So `import labs.common...` **fails before** `ensure_*` can run. Same if I `cd` into `starter/` (which the fine-tune says should work).

Walking parents for `SETUP.md` is a good *locator*, but the first import cannot be `labs.common.*` unless root is already on the path.

**Fix I expect:** a **copy-paste identical** 5–8 line inline bootstrap *before* any `labs.common` import (walk for `SETUP.md`, `sys.path.insert`), **or** load `pathsetup.py` by file path / `importlib` without the `labs` package. Document both “from workshop root” and “from `starter/`” with `python3` on macOS.

Also: marker file `SETUP.md` must exist in every student zip at the same relative place. If someone deletes it or runs a partial copy, helpers vanish with a confusing `ModuleNotFoundError: labs`.

### 2. Circular / heavy imports

Low if `__init__.py` stays lean and modules import pb2 only where needed (`twist.py` → Twist, `scan.py` → LaserScan). Risk rises if `labs.common` starts importing lab starters or a mega `__init__` re-exports everything. Don’t.

### 3. Over-abstraction

`LatestScan` + `attach_scan` + `run_until_interrupt` together become a mini-framework. Then WH-06 stops looking like “FSM on topics” and looks like “call library.” Cap the surface; prefer functions; one small class max for scan.

### 4. Docs drift

Ebook / theory still say “starter has `yaw_from_quat`.” After extract, walkthroughs must say `labs.common.odom.yaw_from_quat` (or show the import). Fine-tune “update Code notes on pilot labs” — do it or I grep the wrong file.

### 5. “Don’t edit common” vs curiosity

I’m the student who opens every package. README must say: **read-only workshop plumbing; lab grade = starter.** If an exercise asks me to change avoid thresholds, put them in the starter args — not buried in common.

### 6. macOS run story

Helpers don’t fix Gatekeeper / wheel arch, but docs for pilots should keep `python3` and bash paths. A `sys.path` failure on day 1 will look like “robotos is broken” when it’s really bootstrap.

---

## 4. Alternative I prefer (and why reject others)

### Preferred: locked plan + thin v1 surface + fixed bootstrap

Same as locked **1A + 2A** and fine-tunes, with:

1. Inline (or non-`labs`-import) path bootstrap.  
2. v1 helpers only: `wait_for_message`, `settle`, `make_twist`/`zero_twist`, `yaw_from_quat`, `CAPS_BITS`, optional `LatestScan` **without** `attach_scan`.  
3. Pilot HW-01 / WH-01 / WH-03 → sweep WH sense/motion + HW waiters; **no MW**.  
4. WH-02 keeps explicit latest variables; introduce `LatestScan` at WH-03+.

### Rejected alternatives

| Alternative | Why reject |
|-------------|------------|
| **B: hide Node behind `WorkshopApp` / `run_lab()`** | I never learn the graph. Panic later when HW/MW differ. |
| **Per-track `wh/_lib` + `hw/_lib`** | Duplicate `yaw`/`settle`/`wait`; two import stories; I’m CS enough to handle one package. |
| **No common — keep copy-paste** | Fine for MW-01; painful by WH-05/06 + HW-01. Drift on settle time and quat formula is already real. |
| **`pip install -e .` day-1** | Extra fail mode for classmates on Windows; I can do it, course shouldn’t require it for Hello Twist. |
| **Force `LatestScan` on WH-02** | Steals the first “mutable latest message” lesson. |

---

## 5. Verdict + ranked recommendations

**Verdict: APPROVE_WITH_CHANGES**

Direction is right: one `labs/common`, Node/pub/sub visible, lab objectives in starters, no MW churn, common not student-edited, pilot-then-sweep. I would use this as Kenji **after** the bootstrap bug and a tighter v1 API freeze.

### Ranked recommendations

1. **Fix pathsetup chicken-egg** — cannot `from labs.common.pathsetup import …` before root is on `sys.path`; use identical inline walk-for-`SETUP.md` (or equivalent) then import helpers. Document `python3` from root *and* from `starter/`.  
2. **Freeze v1 surface** — ship `wait_for_message`, `settle`, twist helpers, `yaw_from_quat`, `CAPS_BITS`, optional `LatestScan`; **defer/forbid** `attach_scan`, `run_until_interrupt`, fat `rate_publish`/`rate_loop` as the teaching path.  
3. **Pedagogy split for scan state** — WH-02 keeps plain `latest_odom` / `latest_scan`; WH-03+ may use `LatestScan` with **visible** `on_message(scan.update)`; keep discovery comment next to every `settle(...)`.  
4. **HW-01 / WH-01 fine-tunes stay non-negotiable** — caps print loop and publish `for`-loop remain in starters; common only waiter + bits / settle + twist sugar.  
5. **Update pilot Code notes + ebook line citations** when helpers move; mark `labs/common/README.md` read-only for students.

### Skim one-liners (for implementers)

- **mw-01 `monitor.py`:** do not touch.  
- **wh-02 `sense.py`:** extract `yaw_from_quat` only.  
- **wh-06 `fsm_drive.py`:** optional `LatestScan` + twist/settle; FSM + loop stay.

---

## 6. Summary for parent agent

**Verdict:** APPROVE_WITH_CHANGES  

**Top 3 API/design notes:**

1. Path bootstrap must run *before* any `labs.common` import (script dir ≠ workshop root on `sys.path`).  
2. Keep graph API + control loops visible; helpers = waiter, settle, twist sugar, yaw, caps table, optional `LatestScan` — not attach/interrupt frameworks.  
3. Don’t force `LatestScan` on WH-02; leave MW alone; WH-01 loop + HW-01 caps print stay in starters.
