# MW-05 — Record & replay

## Goal

Record `/machine/01/sensor/imu` from MW-01’s publisher, inspect, optionally replay.

## Learning outcomes

- Same bag workflow as Ch.9 / WH-07, on the laptop graph  
- Confirm non-zero Imu counts in `bag info`  

## Prerequisites

- MW-01 starters  
- Ebook: [`ch09-bags-evidence.md`](../../../docs/ebook/chapters/ch09-bags-evidence.md)

## Practice

> **Preferred runner** (workshop root): `scripts\run.cmd <lab-id>` (Windows) or `./scripts/run <lab-id>` (macOS/Linux). List: `scripts\run.cmd list`. The `python labs/...` lines below still work.


1. Terminal A — publisher (workshop root, PATH + venv):

**Windows:** `python labs\mw\mw-01-pub-sub\starter\sim_sensor.py`  
**Unix:** `python labs/mw/mw-01-pub-sub/starter/sim_sensor.py`

2. Terminal B — record:

### Windows (PowerShell)

```powershell
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag
```

### Linux / macOS (bash)

```bash
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag
```

3. Replay per pack docs; optionally run `monitor.py` during replay.

## Expected output

`bag info` shows Imu topic with non-zero count.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Empty bag | `sim_sensor` not running |
| Wrong topic | Must be `/machine/01/sensor/imu` (not `/robot/01/…`) |

## Done when

`bag info` shows the Imu topic and a non-zero message count.

See [CHECKLIST.md](CHECKLIST.md).
