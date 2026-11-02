# Theory — Bags & evidence

**For:** Day 2 → MW-05 / WH-07 / HW-06 (+ WH-08 capstone brief)  
**Time:** ~25 min + capstone evidence brief ~20 min

> **Instructor card** (live lecture). Full student reading:  
> [`docs/ebook/chapters/ch09-bags-evidence.md`](../ebook/chapters/ch09-bags-evidence.md)

## Outcomes

Students can: name what a bag is; pick **minimum** topics that prove a claim; treat `bag info` as grading evidence; state why **replay ≠ live**.

## Talking points

1. **Bag** = time-ordered messages on chosen topics (warehouse: odom ± scan; MW: Imu; board: topics your `caps` actually publish).  
2. **Why record:** reproduce, grade, debug “it worked on my machine.” Vibes and viewport screenshots are weak.  
3. **What to record:** only topics that support the claim — not “everything.” Wall-follow needs **scan** (ranges); odom alone is weak. Board bags: match HW-01 caps (no IMU bit ⇒ don’t expect `/robot/01/sensor/imu`).  
4. **Where the file lands:** relative path from the cwd where `robotos record` ran (e.g. `run1.rbag`). Say the path out loud when demoing so graders know what to open.  
5. **Replay ≠ live** — clocks, sim Reset, Mid-session Connect, and missing publishers still matter. Replay is evidence *of that recording*, not a substitute for a live graph.  
6. **Capstone culture:** pass = **task + survival + artifact** (`bag info` or transition log). One lucky run without a log is weak; a failed run with a clear transition log can still teach. Honest “what I’d tune next” beats a fake perfect demo.

## Board sketch

```text
[behavior / sim_sensor / board] ──► topics ──► robotos record ──► run1.rbag
                                                              │
                                                     robotos bag info
                                                     (topics, duration, counts)
```

## Demo cue (2 min)

Terminal A: WH-03 or WH-05 (or `sim_sensor` / board streaming).  
Terminal B: `robotos record -o run1.rbag …` → Ctrl-C → `robotos bag info run1.rbag`. Point at non-zero counts.

## Check questions

- Bag has odom but no scan — can you grade wall-follow? (**Weakly** — no range proof.)  
- When is a viewport screenshot *not* enough evidence? (Any claim about ranges, rates, or transitions.)  
- Empty HW bag with a powered board — first three checks? (Bridge up; `ROBOTOS_CONNECT`; topics match caps.)

## Labs

- [`labs/mw/mw-05-record-replay/`](../../labs/mw/mw-05-record-replay/)  
- [`labs/wh/wh-07-record-bag/`](../../labs/wh/wh-07-record-bag/)  
- [`labs/hw/hw-06-record-board/`](../../labs/hw/hw-06-record-board/)  
- Capstone rubric: [`labs/wh/wh-08-capstone/`](../../labs/wh/wh-08-capstone/)

## Glossary

| Term | Meaning |
|------|---------|
| Bag / `.rbag` | File of time-ordered topic messages |
| Evidence | Artifact (`bag info`, transition log) that supports a lab claim |
| Replay | Play recorded messages back — not identical to a live session |
