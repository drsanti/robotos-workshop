# rbdev — flash CLI (this pack)

In-repo host CLI to **flash prebuilt board images** under [`../`](../)
(`es3c28p/`, `ws28p/`). Students do **not** build firmware here.

Prefer the wrappers in the parent folder (`../rb`, `../rb.cmd`) so the OS
binary is selected and `--dir` points at this pack’s board folder.
On Windows PowerShell use `.\rb` (resolves to `rb.cmd`). Start each window with:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Full flash notes: [`../README.md`](../README.md) · student setup:
[`../../SETUP.md`](../../SETUP.md).

| Your OS | Binary |
|---------|--------|
| Windows x64 | `fw/rbdev/windows/rbdev.exe` |
| macOS arm64 | `fw/rbdev/mac/rbdev` |
| Linux x64 | `fw/rbdev/linux/rbdev` |

Do **not** permanently add this folder to `PATH`. On macOS, first launch
may need **right-click → Open** (Gatekeeper) until notarization.

---

## Flash prebuilt firmware

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
python -m pip install --user esptool

cd YOUR_WORKSHOP_DIR\fw
.\rb config --port COMx --board es3c28p   # or ws28p
.\rb flash-bin
```

```bash
python3 -m pip install --user esptool
cd YOUR_WORKSHOP_DIR/fw
chmod +x rbdev/mac/rbdev rbdev/linux/rbdev rb 2>/dev/null || true
./rb config --port /dev/cu.usbmodemXXXX --board es3c28p
./rb flash-bin
```

If you call `rbdev` directly (not via `rb`), pass the board folder:

```bash
./rbdev/mac/rbdev flash-bin --dir ../es3c28p -p /dev/cu.usbmodemXXXX
```

Manual esptool: see [../README.md](../README.md).
