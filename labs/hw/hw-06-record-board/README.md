# HW-06 — Record board topics

## Goal

Record live board topics to a `.rbag` and inspect with `bag info`.

## Learning outcomes

- Same evidence workflow as WH-07, on silicon  
- Choose topics your **caps** actually publish  

## Prerequisites

- HW-00 streaming (or HW-02 watchers)  
- Ebook: [`ch09-bags-evidence.md`](../../../docs/ebook/chapters/ch09-bags-evidence.md)

## Practice

1. Leave the board streaming (or run HW-02).  
2. Record:

### Windows (PowerShell)

```powershell
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag
```

### Linux / macOS (bash)

```bash
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag
```

Adjust the topic list to what your caps publish (no IMU → drop that topic; add battery if useful).

## Expected output

`bag info` shows board topics with non-zero counts.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Empty bag | Bridge down; `ROBOTOS_CONNECT`; no publisher |
| IMU missing | Caps lack IMU — record `sys/board` / battery instead |

## Done when

`bag info` shows real board topics with non-zero counts.

See [CHECKLIST.md](CHECKLIST.md).
