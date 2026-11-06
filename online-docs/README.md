# robotos online docs

Interactive follow-along docs (Vite + React + Tailwind) for GitHub Pages.

```text
online-docs/
  src/                 # React app
    components/        # Step, CodeBlock, ConfigCard, …
    content/setup/     # OS tracks (EN/TH)
    content/labs/      # MDX lab sheets
  _legacy/             # Previous static HTML kit (reference)
  dist/                # npm run build output (Pages publish root)
```

## Develop

```bash
cd online-docs
npm install
npm run dev
```

Open the printed local URL. Routes use hash history (`#/`, `#/setup`, `#/labs/template`) so GitHub Pages works without a server rewrite.

## Build / publish

```bash
cd online-docs
npm run build
```

Publish the `dist/` folder (or point Pages at it).

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Lucide icons
- GSAP motion (respects `prefers-reduced-motion`)
- Radix collapsible
- MDX for lab sheets
- localStorage prefs (theme, language, OS, workshop path, step checks) — same keys as the legacy guide

## Content ownership

| Kind | Edit here | Publishes to |
|------|-----------|--------------|
| Paste commands / failure tables | [`../SETUP.md`](../SETUP.md) | zip + hand-port into `src/content/setup/*` |
| Interactive EN/TH UX | `src/content/setup/*`, `src/pages/SetupPage.tsx` | Pages `#/setup` |
| Pedagogy / preferred helpers | [`../docs/ebook/chapters/ch00-setup-your-machine.md`](../docs/ebook/chapters/ch00-setup-your-machine.md) | mdBook / EPUB |
| Lab online sheets | `src/content/labs/*` (`.ts` OS tracks or `.mdx`) | Pages `#/labs/…` (e.g. `#/labs/mw-00`) |

Command fences in React should match `SETUP.md`. Do not treat the old Python HTML builders as the publish path.

### Inline highlighting (markdown-first)

Prose is markdown. Everything between backticks is **one** chip — do not invent tokens in the renderer.

```markdown
If `.venv` already exists, start at `.\.venv\Scripts\Activate.ps1`.
```

If something should look special but does not, **add backticks in `SETUP.md` / content**, then re-port. Known keys (`Win`, `Enter`) become `<kbd>`; app names may become `.app-name`; everything else stays `<code>`.

## Related

- Source of truth for commands: [`../SETUP.md`](../SETUP.md)
- Planned local companion (multi-terminal + robotos peer): [`../docs/workshop-host.md`](../docs/workshop-host.md)
- Legacy static site: [`_legacy/`](_legacy/) (reference only — do not rebuild for students)
- Old redirect folder: [`../setup-guide/`](../setup-guide/)
