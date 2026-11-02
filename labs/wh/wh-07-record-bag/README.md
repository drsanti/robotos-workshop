# Lab WH-07 — Record / inspect

## Goal

Capture a short bag of warehouse telemetry while a behavior runs, then inspect it.

## Learning outcomes

- Record odom + scan during WH-03 or WH-05  
- Show `bag info` as evidence  
- Pick topics that match the claim  

## Prerequisites

- Behavior lab ready; sim Connected  
- Ebook: [`ch09-bags-evidence.md`](../../../docs/ebook/chapters/ch09-bags-evidence.md)  
- Theory: [`docs/theory/06-bags-evidence.md`](../../../docs/theory/06-bags-evidence.md)

Exact CLI flags follow your pack — check `robotos --help` / `NOTES.txt`.

## Typical flow

1. Sim Connected (Native / External).  
2. Terminal A — start WH-03 or WH-05 (`scripts\run.cmd wh-03` / `wh-05`, or
   `./scripts/run …`).  
3. Terminal B — record:

### Windows (PowerShell)

```powershell
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag
```

### Linux / macOS (bash)

```bash
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag
```

4. Note: bag path, duration, topics, approximate message counts.

## Expected output

`bag info` lists `/robot/01/odom` and `/robot/01/scan` with non-zero counts.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Empty / tiny bag | Behavior not publishing; topics misspelled |
| No scan in bag | Add `/robot/01/scan` to the record list |
| Pack lacks record | Fall back: save 20 lines of WH-02 printout to a text file |

## Done when

You can show the instructor `bag info` (or equivalent) for a run you drove.

See [CHECKLIST.md](CHECKLIST.md).
