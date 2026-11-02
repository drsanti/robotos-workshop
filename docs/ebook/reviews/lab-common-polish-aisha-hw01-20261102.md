# Persona re-review — Aisha (`linux-advanced`) — HW-01 after `labs.common` — 2026-11-02

**Persona:** Ubuntu 24.04; daily terminal; wants precise bash + loud failures; hates PowerShell-only docs and silent import breaks.  
**Scope:** Post-refactor HW-01 (`README`, `starter/caps_probe.py`) + `labs/common/{wait,caps}.py` + ebook `ch04` §7.  
**Verdict:** **PASS**

Refactor kept the teaching surface where it belongs. Sparse wait and bit-table data moved; yes/no decode loop stayed in the starter. Linux bash fence is complete again. Path bootstrap from `__file__` survives a normal zip unzip without `PYTHONPATH`.

---

## Checklist

| Check | Result | Notes |
|-------|--------|-------|
| `wait_for_message` vs learning outcome | **OK** | Outcome is wait + decode caps. Starter still calls `wait_for_message` and owns `info.caps & bit`. Event/`box` plumbing is not the lab point — fair in `labs.common.wait`. Timeout → clear exit string. |
| `CAPS_BITS` vs print loop | **OK** | Table-only in `caps.py`; starter keeps the for-loop + yes/no marks. Matches `labs/common/README.md` “must stay in starters.” No `print_caps` / RobotApp. |
| Bash fences complete | **OK** | Linux + macOS Terminal B blocks restate `cd`, pack `PATH`, `ROBOTOS_CONNECT`, `.venv`, then `python labs/hw/…` (forward slashes). Earlier C3 (CONNECT-only fence) is fixed. |
| Path bootstrap on Linux unzip | **OK** | Inline walk from `Path(__file__).resolve()` for `SETUP.md`, then `sys.path.insert` **before** `labs.common` imports. Works from workshop root or `starter/` cwd; no chicken-egg `from labs.common.pathsetup`. Loud `SystemExit` if landmark missing. |

---

## Detail

### Learning / common split

- **Move OK:** `wait_for_message` — BoardInfo is sparse; hand-rolling `threading.Event` every lab is noise.  
- **Stay OK:** yes/no print — that *is* the caps decode outcome.  
- **ch04 §7** correctly documents both (`labs.common.wait` / `CAPS_BITS` + loop in starter).

### Bootstrap residual (non-blocking)

Prior packaging review asked for landmark `SETUP.md` **and** `(root / "labs").is_dir()`. Ship uses `SETUP.md` only. Fine for assemble/zip (sibling layout). Residual risk: a stray `SETUP.md` under a lab folder stops the walk early — document already says open the folder that contains `SETUP.md` and `labs/`. Not a HW-01 FAIL.

### Docs drift fixed this pass

| Item | Change |
|------|--------|
| HW-01 Theory + ch04 §2.2 MIC row | Was “stretch” only; print/`CAPS_BITS` say `mic_dump` → aligned to `stretch / mic_dump` (2 lines). |

### Nit (no code change)

- After `source .venv`, `python` is correct; bare Ubuntu without venv still wants `python3` — fence already activates venv.  
- Dialout/`Permission denied` lives in ch04 / HW-00; HW-01 table omits it — acceptable cross-ref, not a regress.

---

## Verdict rationale

| Bar | Met? |
|-----|------|
| Pedagogy locks (print loop in starter; no RobotApp) | Yes |
| Linux can copy-paste Terminal B and run | Yes |
| Unzip + `__file__` bootstrap without day-1 editable install | Yes |
| Ebook §7 matches starter/common | Yes |

**PASS** — ship HW-01 as-is aside from the MIC table alignment above.
