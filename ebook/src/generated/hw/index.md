# HW track — ESP32-S3 board

<div class="ebook-run">

**Track:** `hw` · board labs via serial-bridge

```text
scripts\start-bridge.cmd
scripts\run.cmd hw-01
# Unix: ./scripts/start-bridge.sh && ./scripts/run hw-01
```

<p class="ebook-source"><strong>Source:</strong> <code>labs/hw/README.md</code></p>

</div>


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

## Optional: board Wi‑Fi

Not graded. With `scripts/start-bridge` running (Windows pack includes `wifi-cfg.exe`):

```text
scripts\wifi-cfg.cmd --enable
scripts\wifi-cfg.cmd --ssid YOUR_SSID --pass YOUR_PASSWORD --connect tcp/PC_LAN_IP:7447
scripts\run.cmd hw-02 board_watch
```

Details: `code/NOTES.txt` section D · rebuild: `cargo build --release -p serial-bridge --bin wifi-cfg`.
