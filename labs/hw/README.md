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
