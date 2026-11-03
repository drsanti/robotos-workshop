# Reading order

Suggested path for a full class. Skip board-specific HW steps when your SKU
lacks the feature (always run HW-01 and branch on caps).

## 1. Setup once

1. [Chapter 0 — Setup your machine](chapters/ch00-setup-your-machine.md)
2. Prefer `scripts/start-here` (then open a **VS Code** terminal)
3. Smoke: `robotos topic list` → expect `/robot/01/cmd_vel`, `odom`, `scan`

## 2. Chapters (concepts)

| Block | Chapters | Focus |
|-------|----------|--------|
| Graph basics | Ch.1 | Nodes, topics, messages |
| Drive & sense | Ch.2–3 | Twist ownership, odom, scan |
| Board on graph | Ch.4 | ESP32-S3 as a node |
| Control & patterns | Ch.5–8 | Feedback, services, actions, FSM |
| Evidence & ops | Ch.9–10 | Bags, parameters, lifecycle |
| Twin & debug | Ch.11–13 | Digital twin, QoS, TF frames |

## 3. Middleware track (`labs/mw`)

| Labs | Focus |
|------|--------|
| MW-00 → MW-01 | CLI + pub/sub |
| MW-02 → MW-04 | Services, actions, parameters |
| MW-05 → MW-06 | Bags, mini twin |

```text
scripts\run.cmd mw-00
# or: ./scripts/run mw-00
```

## 4. Warehouse track (`labs/wh`)

Requires MW fluency with topics (at least MW-00/01). Keep the sim running.

| Labs | Focus |
|------|--------|
| WH-00 → WH-02 | Hello graph, drive, sense |
| WH-03 → WH-06 | Avoid, square, wall-follow, FSM |
| WH-07 → WH-08 | Record bag, capstone |

```text
scripts\run.cmd wh-01
```

## 5. Hardware track (`labs/hw`)

Close the sim first. Leave `scripts/start-bridge` open. Caps differ by board
(`es3c28p` vs `ws28p`) — see [HW track](tracks/hw.md).

| Labs | Focus |
|------|--------|
| HW-00 → HW-01 | Connect + caps probe |
| HW-02 → HW-05 | Sensors, actuators, params, inputs |
| HW-06 → HW-07 | Record board, sense→actuate loop |

```text
scripts\run.cmd hw-01
```
