# Pack layout (shipping recipe)

Binary packs are **not** committed (large, closed). Assembled drop shape:

```text
robotos-workshop/          # zip root OR git checkout + code/ filled
  SETUP.md
  README.md
  docs/
  labs/
    mw/  wh/  hw/
  code/
    NOTES.txt                 # from packs/NOTES.<os-arch>.txt
    OS_ARCH.txt               # optional stamp
    robotos-v0.3.0-<os-arch>/
    robotos-0.3.0-*.whl       # ship only the OS you need per class
    robotos-sim-v0.1.0-<os-arch>/   # when available (WH labs)
```

Prefer **per-OS ZIPs** for students (one OS folder + one wheel + one sim), not a mega-archive of all three.

## Build inputs

| Artifact | Source |
|----------|--------|
| `robotos-v*` + wheel | `robotos` — [`docs/workshop-bundle-building.md`](../../robotos/docs/workshop-bundle-building.md) |
| `serial-bridge[.exe]` | `cargo build --release -p serial-bridge` → `robotos-v*/bin/` (HW labs) |
| `robotos-sim-v*` | **On target OS** from private https://github.com/drsanti/robotos-sim — [`workshop-bundle-building.md`](../../robotos-sim/docs/workshop-bundle-building.md) (P2.1 deferred until Mac/Linux builds) |
| Curriculum | this repo |
| `NOTES.txt` | `packs/NOTES.windows-x64.txt` / `NOTES.macos-arm64.txt` / `NOTES.linux-x64.txt` |

## P2.1 deferred (Mac / Linux sim)

Skip building sim on Windows. When ready: Mac → `macos-arm64` only; Linux/CI → `linux-x64`. Docs already fence “missing sim → skip WH”.

## Assemble

### PowerShell (`assemble.ps1`)

```powershell
.\packs\assemble.ps1 `
  -RobotosDist D:\builds\robotos-v0.3.0-windows-x64 `
  -WheelPath D:\builds\robotos-0.3.0-py3-none-win_amd64.whl `
  -SerialBridge D:\CODE\2027\cronos\robotos\target\release\serial-bridge.exe `
  -SimDist D:\builds\robotos-sim-v0.1.0-windows-x64 `
  -OsArch windows-x64 `
  -OutDir D:\drops\robotos-workshop-windows-x64
```

`-OsArch` auto-selects `packs/NOTES.<OsArch>.txt` when `-NotesTemplate` is omitted.

### Bash (`assemble.sh`)

```bash
./packs/assemble.sh \
  --robotos /path/to/robotos-v0.3.0-macos-arm64 \
  --wheel /path/to/robotos-0.3.0-*-macosx*.whl \
  --sim /path/to/robotos-sim-v0.1.0-macos-arm64 \
  --serial-bridge /path/to/serial-bridge \
  --os-arch macos-arm64 \
  --out ~/drops/robotos-workshop-macos-arm64
```

## Execute bit after zip (macOS / Linux)

Zip tools (especially on Windows) often strip the Unix execute bit. After students unzip:

```bash
chmod +x code/robotos-v*/bin/robotos \
         code/robotos-v*/bin/serial-bridge \
         code/robotos-sim-v*/robotos-sim 2>/dev/null || true
```

`assemble.sh` restores `+x` while staging; students may still need the commands above after re-zip. Documented in SETUP troubleshooting and per-OS NOTES.

Do not commit `code/*.whl` or OS trees into git. Edit COM/`cu`/`ttyACM` in class NOTES only if the room uses fixed ports.
