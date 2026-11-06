# Interactive workshop docs (offline)

Prebuilt site (same content as https://drsanti.github.io/robotos-workshop-docs/).
Open this folder — not the private `robotos-workshop-tools` source.

## Open (recommended)

From the **workshop root** (`robotos-workshop/`):

**Windows**

```powershell
.\scripts\start-online-docs.cmd
```

**macOS / Linux**

```bash
./scripts/start-online-docs.sh
```

Then open http://127.0.0.1:5510/#/setup

Do **not** use port **5500** — Cursor/VS Code Live Preview often binds that
port to the workspace root and shows a folder listing instead of these docs.

## Open (manual)

`cd` into **this** `online-docs/` folder first:

```powershell
cd online-docs
python -m http.server 5510
```

```powershell
cd online-docs
npx --yes serve . -p 5510
```

```bash
cd online-docs
python3 -m http.server 5510
# or: npx --yes serve . -p 5510
```

## Connect / Run

1. Leave `scripts/start-host.cmd` (Windows) or `./scripts/start-host.sh` (macOS) running.
2. In **Your setup**, paste the yellow Bearer token.
3. Host URL: `http://127.0.0.1:7420`

Without the host, **Copy** still works; **Run** needs Connect.

Instructors rebuild from private tools: `./scripts/ship-docs.sh` → this `online-docs/` folder.
