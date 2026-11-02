# Theory — ESP32-S3 board on the graph

**For:** HW track open → HW-00 / HW-01  
**Time:** ~30 min

> **Instructor card** (live lecture). Full student reading:  
> [`docs/ebook/chapters/ch04-board-on-graph.md`](../ebook/chapters/ch04-board-on-graph.md)

## Outcomes

Students can: place MCU + `serial-bridge` + CLI as three graph pieces; assign **LISTEN** vs **CONNECT**; name `/robot/01/sys/board` as the heartbeat; probe `caps` before actuators; recall Linux `dialout` as the serial-permission fix.

## Talking points

1. **Board = real node** — same `/robot/01/…` contracts as sim/MW demos; silicon instead of `sim_sensor.py`.  
2. **Three pieces:** MCU firmware (UART) ↔ **`serial-bridge`** (USB ↔ topics) ↔ student CLI/Python.  
3. **LISTEN vs CONNECT (do not confuse):**  
   - Bridge: `ROBOTOS_LISTEN=tcp/0.0.0.0:7447` (accepts peers).  
   - Labs / `robotos` / starters: `ROBOTOS_CONNECT=tcp/127.0.0.1:7447`.  
   - Never set both to the same endpoint in one process (self-connect mess).  
4. **Heartbeat topic:** `/robot/01/sys/board` carries `BoardInfo` (`hw_model`, `fw_version`, **`caps`**). Empty `topic list` with a powered board ⇒ bridge not up, wrong connect, or firmware quiet — not “Zenoh is dead.”  
5. **Two SKUs + caps first:** `es3c28p` (Ternion — LED+mic, `caps≈0x33`) vs `ws28p` (Waveshare — IMU+RTC, `caps≈0x3c`, no LED/mic). Prebuilt: `hardware-interface-workshop/firmware-prebuilt/{es3c28p,ws28p}/`. Probe HW-01 before LED/IMU labs. Bits: `0x01` LED, `0x02` MIC, `0x04` IMU, `0x08` RTC, `0x10` BATT, `0x20` BTN.  
6. **Read vs command:** subscribe sensors (`…/sensor/imu`, `…/sys/board`); publish actuators. Bridge needs `--cmd-topic all` for LED/wave/params.  
7. **Linux one-liner (not a SETUP dump):** USB open fails with *Permission denied* → `sudo usermod -aG dialout $USER`, then **log out/in**. Device node is `/dev/ttyACM*` (or `ttyUSB*`), not `COMx`. Prefer `chmod +x` on `serial-bridge` if unzip stripped the bit. Full PATH/pack steps live in SETUP / NOTES — don’t re-teach the whole install here.

## Board sketch

```text
[ESP32-S3 FW] --USB UART--> [serial-bridge LISTEN :7447]
                                   |
                                   v
                          /robot/01/sys/board  (+ imu, …)
                                   ^
                                   |
                    [robotos / caps_probe CONNECT]
```

## Demo cue (3 min)

Terminal A: bridge with LISTEN + `--port auto` (or `/dev/ttyACM0`).  
Terminal B: CONNECT → `topic echo /robot/01/sys/board --count 3` → run `caps_probe.py`.

## Check questions

- Who sets `ROBOTOS_LISTEN` — bridge or lab script? (**Bridge.**)  
- Why empty `topic list` with a powered board? (Bridge down / wrong CONNECT / firmware not talking.)  
- What does `caps & 0x04` tell you? (**IMU present** — safe to run HW-02 `imu_watch`.)  
- Linux: bridge “finds nothing” or Permission denied — first check? (**`dialout` + re-login; then port node.**)

## Labs

- [`labs/hw/hw-00-board-connect/`](../../labs/hw/hw-00-board-connect/)  
- [`labs/hw/hw-01-caps-probe/`](../../labs/hw/hw-01-caps-probe/)  
- Later: HW-02 sensors, HW-03 actuators (if caps allow), HW-06 board bag

## Glossary

| Term | Meaning |
|------|---------|
| serial-bridge | Host binary: USB UART ↔ robotos topics |
| `ROBOTOS_LISTEN` | This process accepts mesh peers (bridge) |
| `ROBOTOS_CONNECT` | This process joins an existing listener (labs) |
| BoardInfo / caps | Status message; bitmask of peripherals on *this* board |
| dialout | Linux group required for non-root serial device access |
