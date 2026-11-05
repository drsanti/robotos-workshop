# HW track — ESP32-S3 board

Host Python/CLI ↔ board on the robotos graph via `serial-bridge`.

## Two board variants

Firmware images (instructor flash; students usually get a preflashed board):

| `hw_model` | Product | Prebuilt bins | Typical `caps` | Strong at |
|------------|---------|---------------|----------------|-----------|
| **`es3c28p`** | Ternion ESP32-S3 | `hardware-interface-workshop/firmware-prebuilt/es3c28p/` | `≈ 0x33` | RGB LED + mic |
| **`ws28p`** | Waveshare ESP32-S3-Touch-LCD-2.8 | `hardware-interface-workshop/firmware-prebuilt/ws28p/` | `≈ 0x3c` | IMU + RTC |

| Feature | `es3c28p` | `ws28p` |
|---------|-----------|---------|
| RGB LED | yes | no |
| Microphone | yes | no |
| IMU | no | yes |
| RTC | no | yes |
| Speaker / keys / battery | yes | yes |

**Always run HW-01 first** and branch labs on caps — do not assume LED or IMU.

## Lab order

`hw-00` → `hw-01` → `hw-02` … → `hw-07` (see [`docs/lab-outline.md`](../../docs/lab-outline.md)).

## Windows

Optional, not graded. The bridge must already be running. `wifi-cfg.exe` is in the Windows pack.

```text
scripts\wifi-cfg.cmd --enable
scripts\wifi-cfg.cmd --ssid YOUR_SSID --pass YOUR_PASSWORD --connect tcp/PC_LAN_IP:7447
scripts\run.cmd hw-02 board_watch
```

Details: `code/NOTES.txt` section D.

---

## macOS

This optional Wi-Fi step is not in the macOS pack. Skip it and continue with the HW labs.

---

## Linux

This optional Wi-Fi step is not in the Linux pack. Skip it and continue with the HW labs.

---
