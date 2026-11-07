# Curriculum — content map (theory + practice)

Map of concepts → reading → labs. Your instructor sets the day-by-day schedule.

**Rule:** every concept has a **theory note** and a **practice lab** (except TF / QoS, which are theory + CLI/discussion until a dedicated exercise is added).

Ebook chapters: [`ebook/chapters/`](ebook/chapters/). Warehouse topics: [`p0-contract.md`](p0-contract.md).

---

## Track MW — Middleware (laptop graph)

| Concept | Theory | Practice lab |
|---------|--------|--------------|
| Why ROS-style architecture | [`theory/01-graph-topics.md`](theory/01-graph-topics.md), [`theory/13-digital-twin.md`](theory/13-digital-twin.md) | [`labs/mw/mw-00-getting-started`](../labs/mw/mw-00-getting-started/) |
| Graph, nodes, topics | [`theory/01-graph-topics.md`](theory/01-graph-topics.md) | MW-00 + MW-01 |
| Messages & schema | [`theory/07-messages-schema.md`](theory/07-messages-schema.md) | [`labs/mw/mw-01-pub-sub`](../labs/mw/mw-01-pub-sub/) |
| Publish / subscribe | `01`, `07` | MW-01 (`sim_sensor` / `monitor`) |
| Observe & debug | [`theory/11-observe-qos.md`](theory/11-observe-qos.md) | MW-00/01 CLI (`list`, `echo`, `doctor`) |
| Services | [`theory/08-services.md`](theory/08-services.md) | [`labs/mw/mw-02-services`](../labs/mw/mw-02-services/) |
| Actions | [`theory/09-actions.md`](theory/09-actions.md) | [`labs/mw/mw-03-actions`](../labs/mw/mw-03-actions/) |
| Parameters | [`theory/10-params-lifecycle.md`](theory/10-params-lifecycle.md) | [`labs/mw/mw-04-parameters`](../labs/mw/mw-04-parameters/) |
| Lifecycle | `10` | MW-04 (CLI lifecycle) |
| QoS & determinism | `11` | Discussion + CLI QoS flags where available |
| TF / frames | [`theory/12-tf-frames.md`](theory/12-tf-frames.md) | Conceptual; reinforced in WH odom `frame_id` |
| Record / replay | [`theory/06-bags-evidence.md`](theory/06-bags-evidence.md) | [`labs/mw/mw-05-record-replay`](../labs/mw/mw-05-record-replay/) |
| Digital twin (mini) | [`theory/13-digital-twin.md`](theory/13-digital-twin.md) | [`labs/mw/mw-06-mini-twin`](../labs/mw/mw-06-mini-twin/) |

**Suggested MW order:** 00 → 01 → 02 → 03 → 04 → 05 → 06 (dependencies: pub/sub before bags; twin after pub/sub).

---

## Track WH — Warehouse sim (applied autonomy)

| Concept | Theory | Practice lab |
|---------|--------|--------------|
| Warehouse teaching contract | [`p0-contract.md`](p0-contract.md) | [`labs/wh/wh-00-hello-graph`](../labs/wh/wh-00-hello-graph/) |
| Twist & control ownership | [`theory/02-twist-control.md`](theory/02-twist-control.md) | [`labs/wh/wh-01-drive-twist`](../labs/wh/wh-01-drive-twist/) |
| Odometry & scan | [`theory/03-odometry-scan.md`](theory/03-odometry-scan.md) | [`labs/wh/wh-02-sense-odom-scan`](../labs/wh/wh-02-sense-odom-scan/) |
| Closed-loop (bang-bang) | [`theory/04-feedback-control.md`](theory/04-feedback-control.md) | [`labs/wh/wh-03-avoid-front`](../labs/wh/wh-03-avoid-front/) |
| Open-loop limits | `04` | [`labs/wh/wh-04-square-path`](../labs/wh/wh-04-square-path/) |
| Wall following | [`theory/05-wall-follow-fsm.md`](theory/05-wall-follow-fsm.md) | [`labs/wh/wh-05-wall-follow`](../labs/wh/wh-05-wall-follow/) |
| State machines | `05` | [`labs/wh/wh-06-state-machine`](../labs/wh/wh-06-state-machine/) |
| Evidence on the sim | `06` | [`labs/wh/wh-07-record-bag`](../labs/wh/wh-07-record-bag/) |
| Capstone / integration | rubric in lab README | [`labs/wh/wh-08-capstone`](../labs/wh/wh-08-capstone/) |
| Other sim kinds (arm/car/drone) | demo talk | Manual teleop only (not graded) — **graded labs planned later** |

**Suggested WH order:** 00 → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08.  
Requires MW fluency with topics (at least MW-00/01) before WH-00.

---

## Track HW — ESP32-S3 board (sense + control)

Host Python/CLI ↔ board on the robotos graph (serial-bridge / pack NOTES).  
Firmware is **preflashed**; students do not build IDF in these labs.

**Board SKUs:** **`es3c28p`** (Ternion — LED+mic) and **`ws28p`** (Waveshare — IMU+RTC).  
Prebuilt bins: [`fw/es3c28p/`](../fw/es3c28p/) and [`fw/ws28p/`](../fw/ws28p/)
(see [`fw/README.md`](../fw/README.md)). Caps differ — see [`labs/hw/README.md`](../labs/hw/README.md).

| Concept | Theory | Practice lab |
|---------|--------|--------------|
| Board as a node | [`theory/14-board-on-graph.md`](theory/14-board-on-graph.md) | [`labs/hw/hw-00-board-connect`](../labs/hw/hw-00-board-connect/) |
| Capability discovery | `14` | [`labs/hw/hw-01-caps-probe`](../labs/hw/hw-01-caps-probe/) |
| Read sensors (IMU, batt, …) | `14` | [`labs/hw/hw-02-read-sensors`](../labs/hw/hw-02-read-sensors/) |
| Command actuators (LED, wave) | `14` | [`labs/hw/hw-03-command-actuators`](../labs/hw/hw-03-command-actuators/) |
| Board parameters / NVM | [`theory/10-params-lifecycle.md`](theory/10-params-lifecycle.md) | [`labs/hw/hw-04-board-params`](../labs/hw/hw-04-board-params/) |
| Input events (touch/keys) | `14` | [`labs/hw/hw-05-input-events`](../labs/hw/hw-05-input-events/) |
| Record real silicon | [`theory/06-bags-evidence.md`](theory/06-bags-evidence.md) | [`labs/hw/hw-06-record-board`](../labs/hw/hw-06-record-board/) |
| Closed loop sense→actuate | feedback ideas in `04` | [`labs/hw/hw-07-sense-actuate`](../labs/hw/hw-07-sense-actuate/) |

**Suggested HW order:** 00 → 01 → 02 → 03 → 04 → 05 → 06 → 07.  
Requires MW-00/01. Caps vary by board variant — always run HW-01.

---

## Lab folder index

```text
labs/
  mw/   mw-00 … mw-06/     # middleware
  wh/   wh-00 … wh-08/     # warehouse
  hw/   hw-00 … hw-07/     # ESP32-S3 board
```

Each lab: `README.md` + `CHECKLIST.md`; starters under `starter/` where applicable.

---

## Out of this pack

- Building/flashing firmware from source (use prebuilt + instructor flash)  
- Full TF tree publisher lab, deep QoS bake-offs → optional later  

---

## Future curriculum (planned — not in this drop)

Track these when expanding beyond the current MW / WH / HW set. Also listed in [`ebook/BACKLOG.md`](ebook/BACKLOG.md) §P3.

### Other sim kinds (graded labs)

Today: warehouse only (`wh-*` on `/robot/01/*`). Later add dedicated lab tracks (names TBD), each with theory + practice + ebook chapter:

| Kind | Intent (draft) |
|------|----------------|
| **Car / AGV** | Ackermann or differential outdoor/warehouse-yard contract; speed/steer topics |
| **Robot arm** | Joint / end-effector command + state; simple pick sequence |
| **Drone / VTOL** | Attitude or body-rate cmds + IMU/pose stream; altitude hold toy lab |

Until then: instructor demo / Manual teleop only — not graded.

### Board ↔ `robotos-sim` fusion

Today: HW (serial-bridge) and WH (sim) are **separate** graphs for students. Later:

| Idea | Intent (draft) |
|------|----------------|
| **IMU → 3D scene** | Board `/robot/01/sensor/imu` (or remapped topic) drives a pose/attitude widget or avatar in the sim UI |
| **Twin overlay** | Same teaching contract as WH, but sensor truth partially from silicon |
| **Record both** | Bag that includes board IMU + sim odom/scan for offline replay |

Requires sim features (subscribe external IMU / overlay) plus a new lab folder (e.g. `labs/hx-` or `labs/twin-`) and SETUP notes for running **bridge + sim** together without `ROBOTOS_*` conflicts.

