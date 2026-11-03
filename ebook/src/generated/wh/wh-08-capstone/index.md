# Lab WH-08 — Capstone challenge

<div class="ebook-run">

**Track:** `wh` (Warehouse) · **Lab:** `wh-08` · **Folder:** `wh-08-capstone`

```text
# from workshop root
scripts\run.cmd wh-08
# Unix: ./scripts/run wh-08
# prerequisite: warehouse sim running (scripts/start-here)
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-08-capstone/README.md</code></p>

</div>


## Goal

Apply WH skills on a timed warehouse task. Pairs allowed. **Contract topics only.**

## Learning outcomes

- Pick a track and ship a working External/Native run  
- Deliver script + evidence + honest tuning note  

## Prerequisites

- WH-03…07 as needed for your track  
- Ebook: Ch.5 / Ch.8 / Ch.9  
- Contract: [`docs/p0-contract.md`](../../../docs/p0-contract.md)

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

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-08-capstone/CHECKLIST.md</code></p>

### Lab 08 checklist

- [ ] Track chosen (A / B / C)
- [ ] Scored run under External + Native
- [ ] Evidence attached (log or bag)
- [ ] Short failure/tune note written
