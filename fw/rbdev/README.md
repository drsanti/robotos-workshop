# rbdev — optional flash CLI

Students should **prefer esptool** — see [`../README.md`](../README.md).
This folder is a convenience helper; on some PCs the binary is blocked
(Gatekeeper / SmartScreen). If `rb` / `rbdev` fails, use esptool and move on.

Wrappers in the parent folder (`../rb`, `../rb.cmd`) pick the OS binary and
pass `--dir` at `../es3c28p` or `../ws28p`.

| Your OS | Binary |
|---------|--------|
| Windows x64 | `fw/rbdev/windows/rbdev.exe` |
| macOS arm64 | `fw/rbdev/mac/rbdev` |
| Linux x64 | `fw/rbdev/linux/rbdev` |

```bash
cd YOUR_WORKSHOP_DIR/fw
./rb config --port /dev/cu.usbmodemXXXX --board es3c28p
./rb flash-bin
# or:
./rbdev/mac/rbdev flash-bin --dir es3c28p -p /dev/cu.usbmodemXXXX
```

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
cd YOUR_WORKSHOP_DIR\fw
.\rb config --port COMx --board es3c28p
.\rb flash-bin
```
