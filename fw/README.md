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
  rb / rb.cmd              # wrappers → rbdev/<os>/ (Windows: rb.cmd)
  rbdev/
    windows/rbdev.exe
    mac/rbdev
    linux/rbdev
  es3c28p/
    bootloader.bin
    partition-table.bin
    robotos_board.bin
    flash_args
    flasher_args.json
  ws28p/
    … (same filenames)
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

## Flash (students — no ESP-IDF required)

### Preferred: `rb` / `rb.cmd` → `flash-bin`

Needs Python + `esptool` only. From the **workshop root** (folder with
`SETUP.md`):

```powershell
# Once per PowerShell window (avoids "not digitally signed"):
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# once per PC
python -m pip install --user esptool

cd YOUR_WORKSHOP_DIR\fw
.\rb config --port COMx --board es3c28p   # or ws28p — YOUR port
.\rb flash-bin
```

```bash
# macOS / Linux
python3 -m pip install --user esptool
cd YOUR_WORKSHOP_DIR/fw
chmod +x rbdev/mac/rbdev rbdev/linux/rbdev rb 2>/dev/null || true
./rb config --port /dev/cu.usbmodemXXXX --board es3c28p
./rb flash-bin
```

The wrappers inject `--dir` so bins are taken from `fw/<board>/` in this pack
(even though stock `rbdev` looks for `firmware-prebuilt/` under other workshops).

`flash-bin` does **not** build firmware; it runs `esptool` against
`es3c28p/` or `ws28p/` `flash_args`.

### Manual: `esptool` only

```bash
python3 -m pip install --user esptool
cd YOUR_WORKSHOP_DIR/fw/es3c28p   # or: ws28p
python3 -m esptool --chip esp32s3 -p PORT write-flash "@flash_args"
```

```powershell
cd YOUR_WORKSHOP_DIR\fw\es3c28p   # or: ws28p
python -m pip install --user esptool
python -m esptool --chip esp32s3 -p COM17 write-flash "@flash_args"
```

Explicit offsets (same layout in either folder):

```bash
python3 -m esptool --chip esp32s3 -p PORT -b 460800 \
  --before default-reset --after hard-reset \
  write-flash --flash-mode dio --flash-size 2MB --flash-freq 80m \
  0x0 bootloader.bin \
  0x8000 partition-table.bin \
  0x10000 robotos_board.bin
```

## Instructors / rebuild

Refresh bins from the private firmware tree (ESP-IDF shell), then copy into
this `fw/` folder (or re-copy from `hardware-interface-workshop/firmware-prebuilt`).
See the HI workshop / `firmware-esp32-s3-dev` ship scripts.
