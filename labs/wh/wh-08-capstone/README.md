# Lab WH-08 — Capstone challenge

## Goal

Apply WH skills on a timed warehouse task. Pairs allowed. **Contract topics only.**

## This window forgets

`robotos` is not installed on the computer. The program is a file in `code/…/bin` inside the workshop folder. Lab `python` is the `.venv` in that same folder. A new Terminal, PowerShell, Cursor, or VS Code window starts blank and does not remember them.

Every command block on this page begins with the lines for your computer. Paste the **whole** block. If you open another window, paste the whole block again.

`YOUR_WORKSHOP_DIR` is the folder that contains `SETUP.md`, `code/`, and `labs/`. If `dir` or `ls` does not show those names, you are in the wrong folder. If activate says `.venv` does not exist, do the Python SDK check in [MW-00](../../mw/mw-00-getting-started/README.md) first, then come back and paste the block again.


## Learning outcomes

- Pick a track and ship a working External/Native run  
- Deliver script + evidence + honest tuning note  

## Prerequisites

- WH-03…07 as needed for your track  
- Ebook: Ch.5 / Ch.8 / Ch.9  
- Contract: [`docs/p0-contract.md`](../../../docs/p0-contract.md)


## Windows

Use **PowerShell**. This capstone adds no new command. Run your script in the window you already set up for the earlier warehouse labs.

If `Activate.ps1` is blocked, run this once, then paste the earlier lab block again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## macOS

Use **Terminal** on Apple Silicon. This capstone adds no new command. Run your script in the window you already set up for the earlier warehouse labs.

---

## Linux

Use **bash**. This capstone adds no new command. Run your script in the window you already set up for the earlier warehouse labs. Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

---

## Tracks (pick one)

| Track | Pass bar |
|-------|----------|
| **A — Patrol** | Leave start, move through open space, return near start (use odom); survive **90 s** |
| **B — Clear aisle** | Follow aisle end-to-end (wall-follow OK); clean stop |
| **C — Instructor goal** | Reach a marked region announced in class |

## Deliverables

1. Script you ran (WH-05/06 fork or new).  
2. Evidence: terminal log with states **or** WH-07 bag / `bag info`.  
3. 3-sentence note: what failed and what you would tune.

## Rules

- External + Native only for the scored run.  
- No Manual keyboard during the scored 90 s (setup Manual OK).  
- Reset allowed **once** before the scored clock starts.

## Rubric (summary)

| Weight | Look for |
|--------|----------|
| Task | Track bar met |
| Survival | No endless spin / freeze |
| Evidence | Bag or transition log present |
| Honesty | Note names a real next tune |

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Scored run ignored cmds | Still Manual — switch External |
| Weak evidence | Record odom+scan while scoring |
| Instant fail into wall | Rehearse WH-03/05 first |

## Done when

Deliverables submitted per instructor; checklist ticked.

See [CHECKLIST.md](CHECKLIST.md) and [`docs/lab-outline.md`](../../../docs/lab-outline.md).
