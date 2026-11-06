# Pack layout (shipping recipe)

Student delivery must be **self-contained**: `code/` (CLI pack + wheel + sim when
available) ships **in this repo** so a clone/unzip works without sibling repos.
`drops/` and assemble zips are optional class mirrors, not the only channel.

Assembled drop shape (same tree as git + filled `code/`):

```text
robotos-workshop/          # zip root OR git checkout + code/ filled
  SETUP.md
  README.md
  .vscode/                 # VS Code: robotos on terminal PATH
  scripts/                 # start-here, start-bridge, run
  docs/
  online-docs/             # optional offline interactive site (built dist/, not source)
  labs/
    mw/  wh/  hw/
  code/
    NOTES.txt                 # from packs/NOTES.<os-arch>.txt
    OS_ARCH.txt               # optional stamp
    robotos-v0.3.0-<os-arch>/
    robotos-0.3.0-*.whl       # ship only the OS you need per class
    robotos-sim-v0.1.0-<os-arch>/   # Win + Mac shipped
```

Prefer **per-OS ZIPs** for students (one OS folder + one wheel + one sim), not a mega-archive of all three.

## Build inputs

| Artifact | Source |
|----------|--------|
| `robotos-v*` + wheel | `robotos` — [`docs/workshop-bundle-building.md`](../../robotos/docs/workshop-bundle-building.md) |
| `serial-bridge[.exe]` | `cargo build --release -p serial-bridge` → `robotos-v*/bin/` (HW labs) |
| `wifi-cfg[.exe]` | `cargo build --release -p serial-bridge --bin wifi-cfg` → same `bin/` (optional board Wi‑Fi) |
| `workshop-host` (macOS/Linux) | Private `robotos-workshop-tools` — `./scripts/ship-host.sh` → `robotos-v*/bin/` |
| `workshop-host.exe` (Windows) | Same tools repo **on a Windows machine** — `.\scripts\ship-host.ps1` → `robotos-v*-windows-x64\bin\` (checklist: tools `WINDOWS-SHIP.md`) |
| Interactive docs (optional) | Same tools repo — `./scripts/ship-docs.sh` → student `online-docs/` (or `publish-docs-site.sh` → Pages). Never ship tools `src/`. |
| `robotos-sim-v*` | Private https://github.com/drsanti/robotos-sim — build on target OS; Win+Mac shipped in this repo `code/` |
| Curriculum | this repo |
| `NOTES.txt` | `packs/NOTES.windows-x64.txt` / `NOTES.macos-arm64.txt` / `NOTES.linux-x64.txt` |

## OS packs

Class focus: **windows-x64** + **macos-arm64** (both in `code/`). Linux sim deferred.
Rebuild a sim pack only after new sim fixes (see robotos-sim building playbook).

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
         code/robotos-v*/bin/workshop-host \
         code/robotos-sim-v*/robotos-sim 2>/dev/null || true
```


`assemble.sh` restores `+x` while staging; students may still need the commands above after re-zip. Documented in SETUP troubleshooting and per-OS NOTES.

Commit the OS packs you teach under `code/` (windows-x64 + macos-arm64). Keep
`drops/` and `packs/*.zip` gitignored. Edit COM/`cu`/`ttyACM` in class
`code/NOTES.txt` only if the room uses fixed ports. After editing
`packs/NOTES.<os>.txt`, re-run assemble (or copy to `code/NOTES.txt`) so the
student drop matches.
