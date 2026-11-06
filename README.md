# robotos-workshop

Hands-on labs for **robotos**: middleware on your laptop, the warehouse sim,
and ESP32-S3 board work. Everything you need is in this folder (`code/`,
`labs/`, `scripts/`).

**Supported:** Windows x64 and macOS Apple Silicon. Use the OS section that
matches your machine.

## Start here

1. Open this folder in **VS Code** (or Cursor). The folder that contains this
   `README.md` is `YOUR_WORKSHOP_DIR`.
2. Follow **one** OS section below, then open the lab sheets under `labs/`.
3. Prefer the interactive guide if you want clickable Copy / Run:
   - Online: https://drsanti.github.io/robotos-workshop-docs/
   - Offline: [`scripts/start-online-docs.cmd`](scripts/start-online-docs.cmd)
     (Windows) or [`scripts/start-online-docs.sh`](scripts/start-online-docs.sh)
     (macOS) → http://127.0.0.1:5510/#/setup

Full manual steps: [`SETUP.md`](SETUP.md) · ebook
[Chapter 0](docs/ebook/chapters/ch00-setup-your-machine.md).

`robotos` lives under `code/…/bin`. It is **not** installed system-wide. A new
terminal does not remember PATH or `.venv`. Paste the **whole** block from
your OS section (or from the lab README) every time you open a new window.

---

## Windows

Use **PowerShell** (not Git Bash — it rewrites paths that start with `/robot/`).

**Once:** double-click [`scripts/start-here.cmd`](scripts/start-here.cmd). That
creates `.venv`, installs the Python wheel, and starts the sim. You can close
that helper window afterward.

```powershell
cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\code\robotos-v0.3.0-windows-x64\bin;$env:PATH"
.\.venv\Scripts\Activate.ps1
robotos topic list
scripts\run.cmd wh-01
```

With the sim connected, `topic list` should show `/robot/01/cmd_vel`, `odom`,
and `scan`. An empty list usually means the sim is not running.

If activate says `.venv` does not exist, do
[MW-00](labs/mw/mw-00-getting-started/README.md) first.

**Board labs:** close the sim, double-click
[`scripts/start-bridge.cmd`](scripts/start-bridge.cmd), leave it open, then
paste the HW lab block in a **second** PowerShell window.

**Optional interactive docs Connect:** leave
[`scripts/start-host.cmd`](scripts/start-host.cmd) running, copy the yellow
Bearer token, then **Connect** in the guide (online or offline).

---

## macOS

Use **Terminal** on Apple Silicon.

**Once:** double-click [`scripts/start-here.command`](scripts/start-here.command),
or run `./scripts/start-here.sh` from this folder.

```bash
cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list
./scripts/run wh-01
```

With the sim connected, expect `/robot/01/cmd_vel`, `odom`, and `scan`.

If activate says `.venv` does not exist, do
[MW-00](labs/mw/mw-00-getting-started/README.md) first.

**Board labs:** close the sim, run `./scripts/start-bridge.sh`, leave it open,
then paste the HW lab block in a second terminal.

**Optional interactive docs Connect:** `./scripts/start-host.sh`, then paste
the yellow Bearer token into the guide.

The first sim launch may need right-click → **Open**.

---

## Tracks

Typical order if your instructor does not specify otherwise: **MW → WH → HW**.

| Track | Labs | Focus |
|-------|------|--------|
| **MW** | `mw-00` … `mw-06` | Middleware patterns on the laptop graph |
| **WH** | `wh-00` … `wh-08` | Warehouse sim on `/robot/01/*` |
| **HW** | `hw-00` … `hw-07` | ESP32-S3 board: probe, sense, actuate, params, bag |

Lab sheets: [`labs/mw/`](labs/mw/), [`labs/wh/`](labs/wh/),
[`labs/hw/`](labs/hw/). Concept map: [`docs/lab-outline.md`](docs/lab-outline.md).

List runnable labs anytime:

```text
scripts\run.cmd list          # Windows
./scripts/run list            # macOS
```

---

## What’s in this folder

| Path | What it’s for |
|------|----------------|
| [`SETUP.md`](SETUP.md) | Full setup (PATH, wheel, sim, bridge) |
| [`scripts/`](scripts/) | `start-here`, `start-bridge`, `start-host`, `start-online-docs`, `run` |
| [`labs/`](labs/) | Lab READMEs and starter code |
| [`code/`](code/) | Prebuilt `robotos`, wheel, warehouse sim |
| [`online-docs/`](online-docs/) | Offline interactive guide (same as the website) |
| [`docs/ebook/`](docs/ebook/) | Ebook chapters (start at Ch.0) |
| [`docs/p0-contract.md`](docs/p0-contract.md) | Warehouse topic names |

---

## License

Closed / workshop use.
