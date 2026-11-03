# Lab WH-00 — Hello graph

<div class="ebook-run">

**Track:** `wh` (Warehouse) · **Lab:** `wh-00` · **Folder:** `wh-00-hello-graph`

```text
# from workshop root
scripts\run.cmd wh-00
# Unix: ./scripts/run wh-00
# prerequisite: warehouse sim running (scripts/start-here)
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-00-hello-graph/README.md</code></p>

</div>


## Goal

Confirm pack tools see the same graph as **robotos-sim**.

## Prerequisites

- [`SETUP.md`](../../../../SETUP.md) complete (PATH + venv), or `scripts/start-here` once  
- Sim launched and **Connected** (**Native**) — see SETUP §4  
- Ebook: [`ch01-graph-nodes-topics.md`](../../../chapters/ch01-graph-nodes-topics.md)

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

---

## Checklist

<p class="ebook-source"><strong>Source:</strong> <code>labs/wh/wh-00-hello-graph/CHECKLIST.md</code></p>

### Lab 00 checklist

- [ ] `robotos --help` works from pack PATH
- [ ] Sim Connect shows healthy (Native)
- [ ] `robotos topic list` shows activity after Connect
- [ ] `robotos topic echo /robot/01/odom --count 5` prints decoded poses (Manual nudge OK)
- [ ] Switched back to **External** for later labs
