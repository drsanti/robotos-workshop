# P0 Warehouse — topic contract

One-page reference for WH labs (what to publish and subscribe).

## Quick view

| | |
|--|--|
| Robot | `01` |
| Drive | Publish `robotos.geometry.v1.Twist` → `/robot/01/cmd_vel` |
| Sense pose | Subscribe `robotos.nav.v1.Odometry` ← `/robot/01/odom` |
| Sense obstacles | Subscribe `robotos.sensor.v1.LaserScan` ← `/robot/01/scan` (3 ranges: right, front, left) |
| Sim UI | **External** control + **Native** transport + **Connect** |
| Timeout | Stop publishing → stop within **500 ms** |

### Twist fields that matter

- `linear.x` — m/s forward  
- `angular.z` — rad/s yaw  

Defaults clamp: `|v| ≤ 0.5`, `|ω| ≤ 1.5`.

### Laser indices

| `ranges[i]` | Direction |
|-------------|-----------|
| 0 | right (−90°) |
| 1 | front (0°) |
| 2 | left (+90°) |

### Modes — do not confuse these

| Mode | Use in labs? |
|------|----------------|
| Manual + keyboard | Teleop demo only — your Python `cmd_vel` does **not** own motion |
| External + Native | **Graded path** — your node is on the real graph; sim applies your Twists |
| Mock | UI fakes a learner — robot may move **without** proving your script joined the graph |
| UI “Bridge” (web demo) | Not used in graded WH labs — **not** the HW tool `serial-bridge` |

**Native ≠ Mock:** Native means the warehouse node participates on the same mesh as `robotos` CLI and your Python. Mock is for demos when no student code is required.

## Quick smoke check

1. Follow [`SETUP.md`](../SETUP.md) (PATH + `.venv`).  
2. Start **robotos-sim**, Warehouse → **External** → **Native** → **Connect**.  
3. Publish `linear.x = 0.2` for ~5 s → about 1 m on odom.  
4. Echo odom + scan while moving; front range drops near walls.
