# Lab WH-00 — Hello graph

## Goal

Confirm pack tools see the same graph as **robotos-sim**.

## Prerequisites

- [`SETUP.md`](../../../SETUP.md) complete (PATH + venv), or `scripts/start-here` once  
- Sim launched and **Connected** (**Native**) — see SETUP §4  
- Ebook: [`ch01-graph-nodes-topics.md`](../../../docs/ebook/chapters/ch01-graph-nodes-topics.md)

## Steps

Workshop root; PATH active in this terminal (VS Code new terminal after
`scripts/start-here` is enough — no starter script for WH-00).

### Windows (PowerShell)

```powershell
robotos topic list
robotos topic echo /robot/01/odom --count 5
```

### Linux / macOS (bash)

```bash
robotos topic list
robotos topic echo /robot/01/odom --count 5
```

**Expect:** list includes `/robot/01/cmd_vel`, `/robot/01/odom`, `/robot/01/scan`. Echo prints odometry (move the robot in Manual briefly if idle).

Before WH-01: set sim to **External** (desktop builds often already did; confirm UI).

## Done when

You can explain which process is the sim node and which topics are in vs out ([contract](../../../docs/p0-contract.md)).

See [CHECKLIST.md](CHECKLIST.md).
