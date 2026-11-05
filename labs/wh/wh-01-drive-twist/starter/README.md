# Starter — drive forward

Use the parent [lab README](../README.md). It has the full Windows, macOS, and Linux blocks.

These lines work only in a terminal that already ran that block (`cd` to the workshop root, PATH, and `.venv`). A new window does not keep them. If `python` or `robotos` is not found, go back to the lab README and paste its block again. Do not run these from `starter/` unless that block was pasted in this same window first.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-01-drive-twist/starter/drive_forward.py
python labs/wh/wh-01-drive-twist/starter/drive_forward.py --wz 0.5 --vx 0 --seconds 2
```

Windows uses PowerShell, `code\robotos-v0.3.0-windows-x64\bin`, `.\.venv\Scripts\Activate.ps1`, and backslashes in the python path. Linux uses `code/robotos-v0.3.0-linux-x64/bin` only if that folder is in your drop.

### CLI alternative (hex Twist `linear.x = 0.2`)

macOS Apple Silicon:

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos topic pub /robot/01/cmd_vel \
  --schema robotos.geometry.v1.Twist \
  --data-hex 0a09099a9999999999c93f \
  --count 100 --rate 20 --allow-commands
```

Windows PowerShell uses `cd YOUR_WORKSHOP_DIR`, then `$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"`, then the same `robotos topic pub` lines with backticks. Linux uses `code/robotos-v0.3.0-linux-x64/bin` only if that folder is in your drop.
