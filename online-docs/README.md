# Interactive workshop docs (offline)

Same guide as https://drsanti.github.io/robotos-workshop-docs/, for use without
the internet.

## Open (recommended)

From the **workshop root** (the folder that contains `SETUP.md`):

**Windows**

```powershell
.\scripts\start-online-docs.cmd
```

**macOS / Linux**

```bash
./scripts/start-online-docs.sh
```

Then open http://127.0.0.1:5510/#/setup

Do **not** use port **5500** — VS Code / Cursor Live Preview often uses that
port for the wrong folder and shows a file listing instead of this guide.

## Open (manual)

You must `cd` into **this** `online-docs/` folder first:

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
2. In the guide: **Your setup** → paste the yellow Bearer token → **Connect**.
3. Host URL: `http://127.0.0.1:7420`

Without the host, **Copy** still works; **Run** needs Connect.
