# HW track — ESP32-S3 board

<div class="ebook-run">

**Track:** `hw` · board labs via serial-bridge

Close the sim first. Paste the whole block in the bridge window, then paste the lab block in a second window.

**Windows (PowerShell)** — bridge window:

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
scripts\start-bridge.cmd
```

**macOS Apple Silicon** — bridge window:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
./scripts/start-bridge.sh
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
