# Starter — drive forward

Use the parent [lab README](../README.md). It has the full setup. These blocks are the same commands with the starter path filled in.

## Windows

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
python labs\wh\wh-01-drive-twist\starter\drive_forward.py
python labs\wh\wh-01-drive-twist\starter\drive_forward.py --wz 0.5 --vx 0 --seconds 2
```

CLI alternative (hex Twist `linear.x = 0.2`):

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
robotos topic pub /robot/01/cmd_vel `
  --schema robotos.geometry.v1.Twist `
  --data-hex 0a09099a9999999999c93f `
  --count 100 --rate 20 --allow-commands
```

---

## macOS

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-01-drive-twist/starter/drive_forward.py
python labs/wh/wh-01-drive-twist/starter/drive_forward.py --wz 0.5 --vx 0 --seconds 2
```

CLI alternative (hex Twist `linear.x = 0.2`):

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos topic pub /robot/01/cmd_vel \
  --schema robotos.geometry.v1.Twist \
  --data-hex 0a09099a9999999999c93f \
  --count 100 --rate 20 --allow-commands
```

---

## Linux

Skip this section when `code/robotos-v0.3.0-linux-x64` is not in your drop.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-01-drive-twist/starter/drive_forward.py
python labs/wh/wh-01-drive-twist/starter/drive_forward.py --wz 0.5 --vx 0 --seconds 2
```

CLI alternative (hex Twist `linear.x = 0.2`):

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos topic pub /robot/01/cmd_vel \
  --schema robotos.geometry.v1.Twist \
  --data-hex 0a09099a9999999999c93f \
  --count 100 --rate 20 --allow-commands
```

---
