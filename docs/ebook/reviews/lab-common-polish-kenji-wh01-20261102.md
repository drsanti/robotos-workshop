# Persona review — Kenji (`mac-intermediate`) — WH-01 + `labs.common` polish

**Date:** 2026-11-02  
**OS lens:** macOS — `python3` from workshop root or `starter/`  
**Skill lens:** CS undergrad — need to *see* Node / topic / Twist; helpers OK if they don’t swallow the graph  
**Scope:** Post-refactor spot-check — `drive_forward.py`, skim `avoid_front.py`, `labs/common/README.md`, ch01 §7 walkthrough  
**Role:** Do bootstrap/helpers hide the graph, or do docs lie?

**Verdict:** **PASS**

---

## 1. WH-01 `drive_forward.py` — still a graph lesson?

| Must see | Present? |
|----------|----------|
| Inline `SETUP.md` walk **before** `labs.common` import | Yes — identical to README |
| `with robotos.Node(...)` | Yes |
| `create_publisher(TOPIC, Twist)` + topic constant | Yes |
| Message type import (`Twist`) | Yes |
| Timed `for` publish loop + final zero | Yes — comment: “Teaching loop… (do not hide this)” |
| No `rate_publish` / Node-hiding wrapper | Yes |

`make_twist` / `zero_twist` / `settle` are sugar around construction and discovery pause. The streaming publish loop stays in the starter. **Does not hide the graph.**

Tiny polish applied: call-site comment on `settle()` so it matches ch01 (“discovery settle”) and doesn’t read as a magic sleep.

## 2. Skim WH-03 `avoid_front.py`

Node, pub, sub, topic strings, and the bang-bang control law stay in the starter. `LatestScan` + `scan.attach(sub)` is a one-liner over `on_message` — mild API smell vs an explicit `sub.on_message(scan.on_message)`, but the callback name is still `on_message` and the **control loop is visible**. Acceptable for WH-03+; not a WH-01 fail.

## 3. `labs/common/README.md`

Matches shipped surface and pedagogy lock:

- Bootstrap chicken-egg documented correctly (paste block first).  
- “What must stay in starters” includes WH-01 timed loop.  
- Forbidden: `RobotApp`, `rate_publish`, day-1 editable install — consistent with code.

No lie vs WH-01 / common as checked.

## 4. Ch01 walkthrough (§7)

Snippet matches `drive_forward.py` structure (`Node` → `create_publisher` → `settle` → `make_twist` → teaching `for` → `zero_twist`). Table correctly attributes `settle()` to `labs.common` and stresses the timed loop stays in the starter. **Docs do not claim the publish loop lives in common.**

---

## Verdict

**PASS** — WH-01 still teaches the graph; common helpers cut Twist/discovery boilerplate without swallowing Node/pub/loop; README + ch01 walkthrough align with the starter.

No further action required for this spot-check beyond the one-line `settle()` comment in `drive_forward.py`.
