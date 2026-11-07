# Prebuilt firmware (`fw/`)

Flashable board images for this student pack — **no ESP-IDF required**.
Copied from the instructor `hardware-interface-workshop/firmware-prebuilt`
tree. Built from the ESP32-S3 `robotos_board` app.

| Folder                 | `-DBOARD=` | Caps focus                                    |
| ---------------------- | ---------- | --------------------------------------------- |
| [`es3c28p/`](es3c28p/) | `es3c28p`  | RGB LED + mic (`caps=0x33`, default)          |
| [`ws28p/`](ws28p/)     | `ws28p`    | IMU + RTC (`caps=0x3c`; **no** RGB LED / mic) |

Pick the board under interactive docs **Your setup → Your board**, or flash
the matching folder below. Run HW-01 and follow the caps it prints.

## Layout

```
fw/
  README.md
  es3c28p/                 # bins + flash_args
  ws28p/
  rb / rb.cmd              # optional wrappers → rbdev/<os>/
  rbdev/                   # optional OS flash CLI (may be blocked by Gatekeeper / SmartScreen)
```

## Serial port names

Replace `PORT` below with your board’s USB-Serial/JTAG device:

| OS      | Typical device                                                              |
| ------- | --------------------------------------------------------------------------- |
| Windows | `COM3`, `COM17`, … (Device Manager → Ports)                                 |
| macOS   | `/dev/cu.usbmodem*` or `/dev/cu.usbserial*`                                 |
| Linux   | `/dev/ttyACM0` or `/dev/ttyUSB0` (add user to `dialout` / `uucp` if needed) |

Quit any serial monitor or IDE monitor before flashing. With workshop-host
Connected, you can also pin the port under **Your setup → Serial port**.

## Flash (students — default: `esptool`)

**Use this path first.** It only needs Python + `esptool` — no unsigned
binaries, no Gatekeeper / SmartScreen fights.

Install once:

```bash
# macOS / Linux
python3 -m pip install --user esptool
```

```powershell
# Windows PowerShell
python -m pip install --user esptool
```

Flash (from the workshop root — folder with `SETUP.md`). Use `es3c28p` or
`ws28p` to match your board:

```bash
# macOS / Linux — example port; use yours
cd YOUR_WORKSHOP_DIR/fw/es3c28p
python3 -m esptool --chip esp32s3 -p /dev/cu.usbmodemXXXX write-flash "@flash_args"
```

```powershell
# Windows — example COM port; use yours from Device Manager
cd YOUR_WORKSHOP_DIR\fw\es3c28p
python -m esptool --chip esp32s3 -p COM17 write-flash "@flash_args"
```

`@flash_args` reads offsets from the file in that folder. Equivalent explicit
form (same layout in either board folder):

```bash
python3 -m esptool --chip esp32s3 -p PORT -b 460800 \
  --before default-reset --after hard-reset \
  write-flash --flash-mode dio --flash-size 2MB --flash-freq 80m \
  0x0 bootloader.bin \
  0x8000 partition-table.bin \
  0x10000 robotos_board.bin
```

## Optional: `rb` / `rbdev`

Convenience only. On some machines the prebuilt `rbdev` binary is blocked
(macOS Gatekeeper, Windows SmartScreen / execution policy). If that happens,
**go back to esptool above** — do not spend class time fighting the helper.

```bash
cd YOUR_WORKSHOP_DIR/fw
./rb config --port /dev/cu.usbmodemXXXX --board es3c28p
./rb flash-bin
```

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd YOUR_WORKSHOP_DIR\fw
.\rb config --port COMx --board es3c28p
.\rb flash-bin
```

Or call the OS binary with an explicit board folder:

```bash
./rbdev/mac/rbdev flash-bin --dir es3c28p -p /dev/cu.usbmodemXXXX
```

Details: [`rbdev/README.md`](rbdev/README.md).

## Instructors / rebuild

Refresh bins from the private firmware tree (ESP-IDF shell), then copy into
this `fw/` folder (or re-copy from `hardware-interface-workshop/firmware-prebuilt`).
See the HI workshop / `firmware-esp32-s3-dev` ship scripts.
