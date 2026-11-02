# Persona review — Aisha (`linux-advanced`) — labs/common packaging — 2026-11-02

**Persona:** Ubuntu 24.04 daily CLI; expects precise import/run stories, no silent failures, bash-first examples.  
**Scope:** Proposed `labs/` package + `labs/common/*` + `pathsetup` (walk parents for `SETUP.md`, insert workshop root on `sys.path`). Day-1: no `pip install -e`. Assemble already copies `labs/`. Lean `__init__` (no eager protobuf).  
**Verdict:** **APPROVE_WITH_CHANGES**

The packaging idea fits a zip-based workshop. The draft bootstrap in the plan (`from labs.common.pathsetup import …` as the *first* import) is broken: workshop root is not on `sys.path` yet when you run a starter as a script. Fix that, add a clear failure message, and smoke the cwd matrix on Linux after unzip — then ship.

---

## 1. Will the `sys.path` hack survive zip + cwd variants?

### What actually happens today

Running:

```bash
python3 labs/wh/wh-01-drive-twist/starter/drive_forward.py
```

sets `sys.path[0]` to the **script directory** (`…/starter`), not the workshop root. Same if you `cd` into `starter/` and run `python3 drive_forward.py`. So `import labs` / `import labs.common` fails unless something inserts the root first. Landmark + walk is the right *class* of fix; fixed `Path(__file__).parents[N]` is not (and the plan’s `parents[3]` sketch is already one level short — that lands on `labs/`, not the root).

### Zip / assemble survival — generally yes

| Fact | Implication |
|------|-------------|
| `assemble.ps1` / `assemble.sh` copy whole `labs/` | New `labs/__init__.py` + `labs/common/**` land in the student zip with no assemble change. |
| `SETUP.md` is copied to zip root | Landmark for the walk survives staging. |
| Layout is `SETUP.md` sibling of `labs/` | Walk from `__file__` up finds root in ≤5 parents from any current starter. |

### Failure modes (ranked)

| # | Mode | Symptom | Severity |
|---|------|---------|----------|
| F1 | **Chicken-and-egg bootstrap** — starter does `from labs.common.pathsetup import ensure_…` *before* root is on `sys.path` | `ModuleNotFoundError: labs` on every machine, every cwd | **Blocker** (plan as written) |
| F2 | Walk based on **`cwd`** instead of **`Path(__file__).resolve()`** | Works only when cwd is under the tree; IDE “Run” / absolute path from `$HOME` fails | Blocker if implemented wrong |
| F3 | Student **deletes / never unzips `SETUP.md`**, or cds into a partial copy | Walk never finds root → need loud `SystemExit`, not a bare import error | High |
| F4 | **Extra `SETUP.md`** copied into `starter/` or a lab folder | Walk stops too early; root is wrong; `labs` still missing or wrong tree | Medium (document: landmark must sit next to `labs/`) |
| F5 | **Nested unzip** (`…/robotos-workshop/robotos-workshop/`) — student runs from outer empty shell | No `SETUP.md` beside their `labs/` → same as F3 | Medium (already a SETUP unpack footgun) |
| F6 | Symlink / bind-mount lab tree without `resolve()` | Walk follows logical parents oddly | Low on class images; use `.resolve()` |
| F7 | Case-only mismatch (`setup.md`) after a case-insensitive edit | Linux: landmark miss | Low; match exact `SETUP.md` |
| F8 | Hyphenated lab dirs (`wh-01-…`) | Irrelevant for `import labs.common.*`; they are not importable packages — fine | None if we never `python -m labs.wh.wh-01-…` |
| F9 | Lean `__init__` violated (eager `*_pb2` re-exports) | MW/HW import tax / slower fail / confusing traceback | Pedagogy + perf; keep lean |

**Bottom line:** Zip + `assemble` are fine. Cwd variants are fine **if and only if** bootstrap uses `__file__` + walk **before** any `labs.*` import. The plan’s “better” import-first snippet must not ship.

### Required bootstrap shape (change request)

Identical preamble in every refactored starter (or a tiny helper loaded by **file path**, not by package import):

1. Start from `Path(__file__).resolve().parent`.
2. Walk parents (cap ~8–10) until `(p / "SETUP.md").is_file()` **and** `(p / "labs").is_dir()`.
3. `sys.path.insert(0, str(p))` if absent.
4. *Then* `from labs.common.… import …`.
5. On failure: `SystemExit` with `__file__`, `cwd`, and “unzip so `SETUP.md` sits next to `labs/`”.

`labs/common/pathsetup.py` can own the function for DRY **after** root is insertable, or starters can `importlib.util` load that file by walking for `labs/common/pathsetup.py`. Do **not** teach `import labs.common.pathsetup` as line 1.

---

## 2. Alternatives — recommend one for this workshop

| Approach | Pros | Cons for day-1 multi-OS class | Verdict |
|----------|------|-------------------------------|---------|
| **`__file__` + `SETUP.md` walk** (proposed, fixed order) | No extra SETUP step; survives root / `starter/` / absolute path; zip-native; identical snippet | Slightly “magic”; must not walk on `cwd` | **Recommend as primary** |
| **`export PYTHONPATH="$PWD"`** (workshop root) | Honest Linux mental model; no code hack | Forgotten every new terminal (same class of bug as PATH); Maya/Priya miss it; IDE Run often ignores shell env | Optional **secondary** one-liner in SETUP for advanced users only — not primary |
| **`python -m labs.…`** | Clean packaging story in industry | Lab folder names have **hyphens** → illegal module path without mass rename; fights current README commands | **Reject** for v1 |
| **`sitecustomize` / `.pth` in `.venv`** | Transparent once activated | Absolute path breaks if folder moves; venv recreate drops it; hidden; OS-specific site-packages path; smells like `pip install -e` | **Reject** as primary |
| **`pip install -e .`** | Proper packaging | Explicitly out of scope for day-1; wheel/`robotos` story already confuses novices | **Reject** for class day |

**Packaging recommendation:** Keep **pathsetup via `__file__` + `SETUP.md` (+ `labs/` dir) walk** as the only required mechanism. Optionally document for Linux advanced:

```bash
cd /path/to/workshop   # folder with SETUP.md
export PYTHONPATH="$PWD${PYTHONPATH:+:$PYTHONPATH}"
```

as a belt — never as the thing Maya must remember. Do not restructure for `python -m` until/unless lab directories are renamed.

Lean `labs/__init__.py` and lean `labs/common/__init__.py` (no protobuf re-exports): **approve**. Prefer explicit `from labs.common.scan import LatestScan`.

---

## 3. chmod / venv — and Linux-specific footguns

### Irrelevant (good)

- **`chmod +x` on `labs/**/*.py`:** not required when docs use `python3 path/to/script.py` (current lab sheets). Shebang `./drive_forward.py` would need `+x`; don’t switch docs to that for day-1.
- **Zip stripping execute bits:** hurts `code/robotos-v*/bin/*` and sim — already a LAYOUT/SETUP issue — **not** this package story.
- **Editable install / venv site-packages:** `labs.common` stays in the tree; activating `.venv` installs `robotos` only. That asymmetry is fine if pathsetup is correct.

### Linux footguns to handle in code/docs

| Footgun | Mitigation |
|---------|------------|
| Bare `python` missing on Ubuntu | Lab fences: `python3` (persona panic if Windows-only `python`) |
| `ModuleNotFoundError: labs` vs `robotos` | Troubleshooting table: labs → bootstrap / unpack; robotos → venv + wheel |
| Case-sensitive `SETUP.md` | Exact name in walk |
| Symlinks | `Path(__file__).resolve()` |
| Cursor/VS Code “Run Python File” (cwd = `starter/`) | Why `__file__` walk is mandatory; proves the “from starter/” claim |
| Student pastes PowerShell `labs\…` paths | Bash fences already in WH-01 — keep them when adding Code notes for common |
| Shadowing / junk on `sys.path` | Insert workshop root at 0; don’t append |

No dialout/udev interaction with import path — out of scope here.

---

## 4. Testing checklist (CI / smoke)

Run after assemble **and** after a fresh unzip on Linux (do not only test the git checkout). Prefer import/help smokes that don’t need sim/board where possible; full pilots still need WH/HW.

### Bootstrap matrix (must all PASS)

| # | Command / setup | Expect |
|---|-----------------|--------|
| T1 | cwd = workshop root: `python3 labs/wh/wh-01-drive-twist/starter/drive_forward.py --help` (or `-c` import smoke) | Imports `labs.common`; exits 0 |
| T2 | cwd = `starter/`: `python3 drive_forward.py --help` | Same |
| T3 | cwd = `$HOME`: `python3 /abs/…/starter/drive_forward.py --help` | Same |
| T4 | cwd = workshop root, **rename/hide `SETUP.md`** | Non-zero + message mentioning `SETUP.md` / `labs/` — not raw `ModuleNotFoundError: labs` |
| T5 | Fresh zip from `assemble.sh` → unzip → T1–T3 | Same as git tree |
| T6 | `python3 -c "import labs.common; import labs.common.pathsetup"` from root after bootstrap path insert in a one-liner test harness | No protobuf import storm (lean `__init__`) |
| T7 | Pilot trio smoke: `drive_forward` (sim), `avoid_front` (sim), `caps_probe` (bridge) on linux-x64 when artifacts exist | Behavioral PASS; log in `packs/SMOKE.md` |
| T8 | Confirm `labs/common` present in staged drop (`test -f …/labs/common/pathsetup.py`) | Assemble regression |

### Nice-to-have

| # | Check |
|---|--------|
| T9 | Duplicate `SETUP.md` under `starter/` → either detect “SETUP.md without labs/” and keep walking, or document as unsupported |
| T10 | `PYTHONPATH` unset still passes T1–T3 (proves primary mechanism) |
| T11 | Windows twin of T1–T3 (path separators) so Maya’s path doesn’t diverge |

---

## 5. Verdict

**APPROVE_WITH_CHANGES**

Ship `labs/` + `labs/common` + landmark walk; do **not** require `pip install -e` or `python -m`.

### Changes required before implement

1. **Fix bootstrap order** — never `import labs.*` before root is on `sys.path`; walk from `__file__` with landmarks `SETUP.md` + `labs/`.
2. **Loud failure** if landmark missing (print `__file__` + cwd).
3. **Use `.resolve()`**; cap walk depth; prefer “keep walking if `SETUP.md` found without `labs/`” to blunt F4.
4. **Docs:** bash `python3` examples; troubleshooting row for `labs` vs `robotos` import errors; state that run-from-root **or** `starter/` both work *because of* bootstrap (update WH sheets that currently say “do not cd into starter” once true).
5. **Smoke T1–T6** on a Linux unzip before calling packaging done; add linux-x64 row when sim/bridge available (T7).

### Explicit non-blockers

- `assemble` already copies `labs/` — no change needed for packaging inclusion.
- Lean `__init__` — keep.
- chmod on lab `.py` — irrelevant for documented invoke style.

---

## Summary for synthesizer

| Item | Aisha |
|------|--------|
| Verdict | **APPROVE_WITH_CHANGES** |
| Packaging recommendation | **Primary:** `__file__`-based walk for `SETUP.md` + `labs/`, then `sys.path.insert(0, root)`. **Not** import-first `labs.common.pathsetup`. **Secondary only:** `PYTHONPATH=$PWD`. **Reject** `python -m` (hyphens), sitecustomize/`.pth`, and day-1 editable install. |
