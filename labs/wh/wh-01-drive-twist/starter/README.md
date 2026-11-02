# Starter — drive forward

Prefer the parent [lab README](../README.md) from **workshop root**.  
Advanced only (same folder, pack env active):

```bash
python drive_forward.py
python drive_forward.py --wz 0.5 --vx 0 --seconds 2
```

### CLI alternative (hex Twist `linear.x = 0.2`)

```bash
robotos topic pub /robot/01/cmd_vel `
  --schema robotos.geometry.v1.Twist `
  --data-hex 0a09099a9999999999c93f `
  --count 100 --rate 20 --allow-commands
```

(Linux/macOS: one line, no backticks.)
