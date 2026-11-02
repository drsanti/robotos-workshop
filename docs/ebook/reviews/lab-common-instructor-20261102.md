# Instructor review — `labs/common` helper plan

**Date:** 2026-11-02  
**Role:** Robotics middleware workshop instructor (curriculum / lab design)  
**Scope:** Proposed shared `labs/common` for plumbing only; Node stays visible;
fine-tunes keep WH-01 rate loop and HW-01 caps print; `pathsetup` bootstrap;
pilot `caps_probe` + `drive_forward` + `avoid_front`; then WH/HW sweep; leave
short MW alone.  
**Evidence read:** [`docs/ebook/STYLE.md`](../STYLE.md) (lab-sheet quality bar),
[`docs/lab-outline.md`](../../lab-outline.md), starters:

| Lab | Starter |
|-----|---------|
| MW-01 | `monitor.py`, `sim_sensor.py` |
| WH-01 | `drive_forward.py` |
| WH-03 | `avoid_front.py` |
| HW-01 | `caps_probe.py` |
| HW-02 | `imu_watch.py` (spot-check) |

**Do not implement** from this review — design gate only.

---

## 1. Teaching goals alignment

What this workshop must still force students to **write or read in the starter**,
even after `labs/common` exists:

| Must remain in the student-facing script | Why (curriculum) |
|------------------------------------------|------------------|
| `with robotos.Node("…") as node:` | Graph literacy: a process is a named node |
| `create_publisher` / `create_subscriber` (and MW: `call` / action / param APIs) | Students must see typed endpoints, not a hidden bus |
| Schema imports (`Twist`, `LaserScan`, `BoardInfo`, `Imu`, …) | Messages are contracts (`theory/07`) |
| Literal topic strings (`/robot/01/cmd_vel`, `/robot/01/scan`, `/robot/01/sys/board`) | Teaching contract / WH wire names; CLI `echo` maps 1:1 |
| WH-01: explicit rate loop + final `Twist()` zero | Control ownership + timeout story (`theory/02`) |
| WH-03+: control law / FSM body (threshold, gains, states) | Feedback / wall / FSM outcomes (`theory/04`–`05`) |
| HW-01: bit decode + yes/no → demo mapping print | Capability discovery before command (`theory/14`) |
| `on_message` vs `recv` where the lab teaches that choice | Sparse BoardInfo vs streaming IMU — intentional contrast |

Safe to factor into `labs/common` (plumbing students currently copy-paste without
learning from the duplication):

- Workshop-root `sys.path` / import bootstrap so `from labs.common…` works when
  running `python labs/…/starter/foo.py` from pack root
- Optional discovery settle sleep (the repeated `time.sleep(0.8)` comment)
- Tiny twist helpers only if they do **not** replace the WH-01 loop itself
  (e.g. `make_twist(vx=…, wz=…)` that still returns a `Twist` the student publishes)
- Shared constants *as references* (rate Hz, default settle) — starters may still
  shadow locally for readability in early labs

**Alignment with STYLE / lab sheets:** ebook walkthroughs quote real starter
paths and explain **why** each block exists (rate loop, zero Twist, schema
import). If common swallows those blocks, Ch.0 / Ch.2 / lab README tables become
lies. Any helper use must stay one-liners students can still map to the walkthrough.

**Leave short MW alone — agree.** MW-01/02/03 starters are already short and are
the first place students see Node/pub/sub/service. Factoring them into helpers
would cut the pedagogical signal with almost no DRY win.

---

## 2. Anti-patterns to forbid in `labs/common`

Hard forbid for v1 (and document in a one-page `labs/common/README.md`):

| Anti-pattern | Reason |
|--------------|--------|
| **`RobotApp` / base class / inheritance** | Hides Node lifecycle; students subclass “framework” instead of learning middleware |
| **`run_control_loop(callback)` that owns rate + stop** | Steals WH-01/03 learning outcomes; Ctrl-C / zero Twist becomes magic |
| **`WarehouseRobot` / `BoardClient` façade** | Hides topics, schemas, and publisher/subscriber creation |
| **Auto-topic registry / remapping layer** | Breaks contract teaching (`p0-contract`, CLI `topic list`) |
| **Silent env / connect configuration** | Students must still set `ROBOTOS_*` / PATH per SETUP; helpers must not “fix” connectivity |
| **Busy `spin()` that blocks without a visible student loop** | Obscures rate vs callback vs `recv` differences |
| **Bundling control laws** (avoid, wall, square, FSM) | Autonomy content belongs in the lab starter |
| **Caps decoding that prints the HW-01 table** | Probe *output* is the lab deliverable |
| **Pytest / CLI wrappers as the only way to run demos** | Lab sheets and STYLE assume `python labs/…/starter/….py` |
| **Deep package with many modules on day one** | Import maze; novices already struggle with cwd / venv |

Soft forbid (allowed only with instructor-facing docs, not student imports in
early labs): logging facades, QoS presets, bag helpers — those belong with MW-05 /
WH-07 when those labs need them, not in a shared v1 “robot kit.”

---

## 3. Suggested public API surface (minimal v1)

Keep the surface **tiny**, function-oriented, no classes required:

```text
labs/common/
  __init__.py          # re-export only the stable v1 names below
  pathsetup.py         # side-effect-safe bootstrap
  settle.py            # discovery wait
  twist_util.py        # optional; WH only if needed after pilot
  README.md            # what is / is not allowed here
```

### v1 functions (proposed)

| Symbol | Signature (sketch) | Used by |
|--------|--------------------|---------|
| `ensure_lab_imports()` | `() -> None` | First line of pilots that need `labs.common`; or invoked by `pathsetup` |
| `workshop_root()` | `() -> Path` | Debug / rare path needs |
| `discovery_settle(seconds: float = 0.8)` | `() -> None` | WH pubs after `create_publisher` |
| `twist(vx: float = 0.0, wz: float = 0.0) -> Twist` | optional | WH-03+ only if it shortens noise without hiding publish |

### Explicitly **not** in v1

- `create_cmd_vel_pub(node)`, `subscribe_scan(node, buffer)`, `wait_board_info(…)`
- Rate loops, KeyboardInterrupt handlers, argparse templates
- Caps bit tables / BoardInfo pretty-printers
- Anything MW-specific (echo client retry lives in MW-02 starter)

### `pathsetup` rules

- Idempotent; safe if called twice  
- Must work when cwd is workshop root (canonical per lab READMEs)  
- Document failure mode if student `cd`s into `starter/` (current docs say don’t)  
- Prefer inserting workshop root on `sys.path` over fragile relative imports  
- Do **not** install packages or mutate `ROBOTOS_CONNECT`

### Pilot acceptance (code + docs)

After changing a pilot starter, the lab README **Code walkthrough** table must
still name Node, schema, topic, loop/zero or caps print as **lines in that
file**, not “see `labs.common`.”

---

## 4. Rollout / grading impact

### Rubrics / checklists today

Checklists are **behavioral**, not line-count based:

- WH-01: moves ~1 m, stops, yaw-only  
- WH-03: continuous loop, reacts to front, Ctrl-C stops  
- HW-01: BoardInfo received; know your caps  

So **rubrics do not break** if helpers only remove duplicated settle/path noise.
They **do** break if TAs start grading “used RobotApp correctly” or if expected
transcripts change (HW-01 print format, WH-01 `done — N cmds + zero` line).

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Import / pathsetup fails on student machines | Day-1 red text (Maya FAIL mode) | Pilot on Windows zip + document “run from workshop root”; add troubleshooting row |
| Walkthrough tables stale after refactor | STYLE quality bar FAIL | Update README + ebook chapter in same PR as starter |
| Over-eager WH sweep | Wall/FSM labs lose visible Node patterns | Sweep only settle + pathsetup; leave control bodies |
| MW left alone but students copy WH helpers into MW | Confusion on `/machine` vs `/robot` | README: “WH/HW only; do not use in MW-00…04” |
| Expected output drift | Checklist “Done when” ambiguity | Freeze pilot stdout formats |

### Suggested rollout (agrees with proposal, with gates)

1. **Land `pathsetup` + `discovery_settle` only** + README anti-pattern list  
2. **Pilot three starters:** `drive_forward`, `avoid_front`, `caps_probe`  
   - WH-01: keep full publish loop + zero in-file  
   - HW-01: keep caps print loop in-file  
   - WH-03: keep bang-bang body in-file; may call `discovery_settle` / `twist`  
3. Re-run one persona smoke (Windows) on those three labs  
4. WH/HW sweep for settle/pathsetup only  
5. **Do not** touch short MW in this pass  

Grading: no checklist edits required for v1. Optionally add one instructor note:
“Starter may import `labs.common` for settle/path only; Node and topics must
remain visible.”

---

## 5. Verdict + must-change before implement

### Verdict

**Conditional go** — shared plumbing is justified (repeated `sleep(0.8)`, path
pain once `labs.common` exists), and the proposal’s constraints (Node visible,
WH-01 loop / HW-01 caps print stay, MW alone, narrow pilot) match teaching goals.

**Not a go** if implementers expand into a mini robot framework. The failure mode
for this curriculum is hiding the graph, not too much boilerplate.

### Must-change / must-specify before any code lands

1. **Write `labs/common/README.md` first** with the forbid list in §2 (especially
   no `RobotApp`, no control-loop host, no topic façades).  
2. **Cap v1 API** to pathsetup + `discovery_settle` (+ optional `twist()` only if
   a pilot PR shows clear line savings without hiding publish). No subscriber
   buffers or BoardInfo waiters in v1.  
3. **Preserve WH-01 and HW-01 student-visible algorithms and stdout** — refactor
   is not allowed to change expected transcripts used in lab sheets / ebook.  
4. **Same-PR doc sync:** lab README walkthrough + any Ch.0/Ch.2 quoted snippets
   for touched pilots (STYLE: quote real starter paths).  
5. **Import story on Windows class image:** prove
   `python labs\wh\wh-01-drive-twist\starter\drive_forward.py` from workshop
   root with only the documented SETUP env — no extra `PYTHONPATH` for students.  
6. **Explicit non-goals in the implementation ticket:** no MW changes; no WH-05/06
   control extraction; no grading rubric rewrite.

### Nice-to-have (not blocking)

- Instructor “diff budget”: pilot PR should shrink each starter by settle/path
  lines only (roughly ≤5–10 net lines removed), not half the file  
- Add one troubleshooting row: `ModuleNotFoundError: labs` → cwd / pathsetup  

---

## Summary for implementers

Plumbing-only `labs/common` is pedagogically sound **if** it stays a 2–3 function
kit. Students must still author Node, schemas, topics, WH rate/stop, WH control
laws, and HW caps printing. Forbid framework base classes. Pilot three files,
freeze stdout, sync walkthroughs, then sweep WH/HW — leave MW alone.
