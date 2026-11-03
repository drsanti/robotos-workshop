# robotos Workshop Ebook

This site is the **reading and planning** companion for the robotos workshop.
Markdown under `docs/ebook/chapters/` and `labs/` remains the source of truth;
this HTML is **generated** so the curriculum cannot silently drift into a
second copy.

## How to use it

| Mode | What to open |
|------|----------------|
| **Bench (code / sim / board)** | VS Code + lab folder README next to the starters |
| **Read / plan / review** | This ebook (`book/index.html`) |
| **Class-day fast path** | [`SETUP.md`](../../SETUP.md) (must stay consistent with Ch.0) |
| **Student helpers** | `scripts/start-here`, `scripts/start-bridge`, `scripts/run` |

## Three tracks (all labs in this ebook)

Every practice lab under `labs/{mw,wh,hw}/` is in the sidebar — README +
CHECKLIST — plus the [labs overview](generated/labs-index.md) and
[`labs.common` helpers](generated/common/index.md).

| Track | Labs | Focus |
|-------|------|--------|
| **MW** | `mw-00` … `mw-06` | Middleware patterns on the laptop graph |
| **WH** | `wh-00` … `wh-08` | Warehouse sim on `/robot/01/*` |
| **HW** | `hw-00` … `hw-07` | ESP32-S3 (`es3c28p` / `ws28p`) via serial-bridge |

Typical class order if your instructor does not specify otherwise:
**MW → WH → HW**. See [Reading order](reading-order.md).

## Prerequisites

- Workshop drop for **your** OS (Windows x64 or macOS Apple Silicon)
- **VS Code** on class machines
- Python 3.10+ (venv + wheel via `scripts/start-here`)
- Warehouse sim for WH labs; serial-bridge + board for HW labs

Start with [Chapter 0 — Setup your machine](chapters/ch00-setup-your-machine.md).

## Rebuild this ebook

From the workshop root (requires `mdbook` on PATH):

```powershell
pwsh -File .\ebook\scripts\build.ps1
```

Do **not** edit files under `src/chapters/` or `src/generated/` by hand — re-run
the build after changing a chapter or labsheet README.
