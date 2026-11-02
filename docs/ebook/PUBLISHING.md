# Publishing the student ebook

Source of truth: `docs/ebook/chapters/ch*.md` + lab sheets under `labs/`.  
Style: [`STYLE.md`](STYLE.md). Status table: [`README.md`](README.md).

## Suggested reading order (TOC)

| Ch | File | Title |
|----|------|-------|
| 0 | `chapters/ch00-setup-your-machine.md` | Setup your machine |
| 1 | `chapters/ch01-graph-nodes-topics.md` | Graph, nodes, topics |
| 2 | `chapters/ch02-twist-control.md` | Twist & control ownership |
| 3 | `chapters/ch03-odometry-scan.md` | Odometry & scan |
| 4 | `chapters/ch04-board-on-graph.md` | Board on the graph |
| 5 | `chapters/ch05-feedback-control.md` | Feedback vs open loop |
| 6 | `chapters/ch06-services.md` | Services |
| 7 | `chapters/ch07-actions.md` | Actions |
| 8 | `chapters/ch08-wall-follow-fsm.md` | Wall follow & FSM |
| 9 | `chapters/ch09-bags-evidence.md` | Bags & evidence |
| 10 | `chapters/ch10-params-lifecycle.md` | Parameters & lifecycle |
| 11 | `chapters/ch11-digital-twin.md` | Digital twin |
| 12 | `chapters/ch12-observe-qos.md` | Observe, debug & QoS |
| 13 | `chapters/ch13-tf-frames.md` | Frames & TF |

Lab sheets are companion “practice” PDFs/pages — link from each chapter §Hands-on; do not duplicate full CLI in the print book unless desired.

## Pandoc → EPUB

From `robotos-workshop/`:

```bash
# Helper (PowerShell) — tries Mermaid filter if installed:
./docs/ebook/build-epub.ps1

# Or raw pandoc (GitHub-style Mermaid may appear as code fences in EPUB):
pandoc docs/ebook/chapters/ch*.md \
  -o drops/robotos-workshop-ebook.epub \
  --metadata title="robotos Workshop" \
  --metadata author="Robotos Workshop" \
  --toc --toc-depth=2
```

### Mermaid in EPUB / PDF

Chapters use fenced ` ```mermaid ` diagrams. Pandoc does **not** render them by default.

| Approach | When to use |
|----------|-------------|
| **A. `mermaid-filter`** (recommended for EPUB) | Node + `npm i -g mermaid-filter` (needs Chromium/Puppeteer deps). Then: `pandoc … -F mermaid-filter -o out.epub` |
| **B. Pre-render** | CI: turn each diagram into SVG, replace fences before pandoc (heavier; best quality) |
| **C. Skip diagrams in print** | Ship EPUB with ASCII board sketches only; leave Mermaid for GitHub / course site |

`build-epub.ps1` uses **A** when `mermaid-filter` is on `PATH`, otherwise **C-ish** (plain pandoc — Mermaid stays as code blocks; still readable TOC).

Install filter (maintainer machine):

```bash
npm install -g @mermaid-js/mermaid-cli   # optional peer tooling
npm install -g mermaid-filter
# verify:
mermaid-filter --help
```

If filter install is painful on a locked lab image, prefer course site (GFM Mermaid) + ASCII in theory cards for print.

## Pandoc → PDF (example)

```bash
pandoc docs/ebook/chapters/ch*.md -o drops/robotos-workshop-ebook.pdf --toc
# With Mermaid: add -F mermaid-filter when available
```

Requires a LaTeX engine or `weasyprint`/`wkhtmltopdf` depending on pandoc args.

## QA before publish

1. Persona re-review (Maya / Kenji / Aisha) on Ch.0 + SETUP + WH-01 / HW-01 after `labs.common` changes.  
2. Fix blockers in `docs/ebook/reviews/`.  
3. Rebuild student zip via `packs/assemble.ps1` so NOTES/lab paths match.  
