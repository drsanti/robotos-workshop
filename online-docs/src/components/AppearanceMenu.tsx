import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import {
  CHIP_PRESETS,
  CODE_BLOCK_PALETTES,
  DARK_PAGE_PRESETS,
  LIGHT_PAGE_PRESETS,
  type ChipPreset,
  type PagePreset,
  type PagePresetMeta,
} from '../lib/appearance'
import { usePrefs } from '../context/PrefsContext'

function PagePresetGrid({
  presets,
  active,
  lang,
  onSelect,
}: {
  presets: PagePresetMeta[]
  active: PagePreset
  lang: string
  onSelect: (id: PagePreset) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {presets.map((p) => {
        const label = lang === 'th' ? p.labelTh : p.labelEn
        const selected = active === p.id
        return (
          <button
            key={p.id}
            type="button"
            aria-pressed={selected}
            title={label}
            onClick={() => onSelect(p.id)}
            className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-left text-xs font-medium ${
              selected
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-[var(--line)] hover:border-[var(--line-strong)]'
            }`}
          >
            <span
              className="size-3.5 shrink-0 rounded-sm border border-[var(--line-strong)]"
              style={{ background: p.swatch }}
              aria-hidden
            />
            <span className="truncate">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function AppearanceMenu() {
  const {
    ui,
    lang,
    appearance,
    setPagePreset,
    setChipPreset,
    setChipColors,
    setCodeBlockStyle,
    resetAppearance,
  } = usePrefs()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const presetOptions: { value: ChipPreset; label: string }[] = [
    { value: 'accent', label: lang === 'th' ? CHIP_PRESETS.accent.labelTh : CHIP_PRESETS.accent.labelEn },
    { value: 'muted', label: lang === 'th' ? CHIP_PRESETS.muted.labelTh : CHIP_PRESETS.muted.labelEn },
    { value: 'amber', label: lang === 'th' ? CHIP_PRESETS.amber.labelTh : CHIP_PRESETS.amber.labelEn },
    { value: 'custom', label: ui.chipCustom },
  ]

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={ui.menuOpen}
        title={ui.menuOpen}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]"
      >
        <Menu size={18} />
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={ui.appearance}
          className="absolute right-0 z-50 mt-2 max-h-[min(32rem,calc(100vh-5rem))] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto rounded-[12px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[var(--shadow)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="m-0 text-sm font-semibold">{ui.appearance}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{ui.appearanceHint}</p>
            </div>
            <button
              type="button"
              aria-label={ui.menuClose}
              title={ui.menuClose}
              onClick={() => setOpen(false)}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/15 text-red-500 hover:bg-red-500/25"
            >
              <X size={16} />
            </button>
          </div>

          <section className="mt-4">
            <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              {ui.pageThemeLight}
            </p>
            <PagePresetGrid
              presets={LIGHT_PAGE_PRESETS}
              active={appearance.pagePreset}
              lang={lang}
              onSelect={setPagePreset}
            />
          </section>

          <section className="mt-4">
            <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              {ui.pageThemeDark}
            </p>
            <PagePresetGrid
              presets={DARK_PAGE_PRESETS}
              active={appearance.pagePreset}
              lang={lang}
              onSelect={setPagePreset}
            />
          </section>

          <section className="mt-5">
            <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              {ui.chipStyle}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {presetOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={appearance.chipPreset === opt.value}
                  onClick={() => setChipPreset(opt.value)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                    appearance.chipPreset === opt.value
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                      : 'border-[var(--line)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <p className="mt-3 mb-1.5 text-xs text-[var(--muted)]">{ui.previewChip}</p>
            <p className="m-0 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm">
              Use <code>code/</code> and <code>.venv</code> paths.
            </p>

            {appearance.chipPreset === 'custom' ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label className="block text-xs text-[var(--muted)]">
                  {ui.chipFg}
                  <input
                    type="color"
                    value={appearance.chipFg}
                    onChange={(e) => setChipColors(e.target.value, appearance.chipBg)}
                    className="mt-1 block h-9 w-full cursor-pointer rounded-md border border-[var(--line)] bg-[var(--bg)]"
                  />
                </label>
                <label className="block text-xs text-[var(--muted)]">
                  {ui.chipBg}
                  <input
                    type="color"
                    value={appearance.chipBg}
                    onChange={(e) => setChipColors(appearance.chipFg, e.target.value)}
                    className="mt-1 block h-9 w-full cursor-pointer rounded-md border border-[var(--line)] bg-[var(--bg)]"
                  />
                </label>
              </div>
            ) : null}
          </section>

          <section className="mt-5">
            <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              {ui.codeBlockStyle}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {CODE_BLOCK_PALETTES.map((p) => {
                const label = lang === 'th' ? p.labelTh : p.labelEn
                const active = appearance.codeBlockStyle === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    title={label}
                    onClick={() => setCodeBlockStyle(p.id)}
                    className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-left text-xs font-medium ${
                      active
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                        : 'border-[var(--line)] hover:border-[var(--line-strong)]'
                    }`}
                  >
                    <span
                      className="size-3.5 shrink-0 rounded-sm border border-[var(--line-strong)]"
                      style={{ background: p.swatch }}
                      aria-hidden
                    />
                    <span className="truncate">{label}</span>
                  </button>
                )
              })}
            </div>

            <p className="mt-3 mb-1.5 text-xs text-[var(--muted)]">{ui.previewChip}</p>
            <div className="overflow-hidden rounded-[10px] border border-[var(--code-border)] bg-[var(--code-bg)]">
              <div className="border-b border-[var(--code-border)] bg-[var(--code-meta-bg)] px-2.5 py-1 text-[0.7rem] text-[var(--code-meta-ink)]">
                powershell
              </div>
              <pre className="m-0 overflow-x-auto p-2.5 font-mono text-[0.75rem] leading-relaxed text-[var(--code-ink)]">
                <span className="tok-command">cd</span> YOUR_WORKSHOP_DIR{'\n'}
                <span className="tok-variable">$env:PATH</span> <span className="tok-operator">=</span>{' '}
                <span className="tok-string">"...bin"</span>
                {'\n'}
                <span className="tok-command">robotos</span> <span className="tok-flag">version</span>
              </pre>
            </div>
          </section>

          <button
            type="button"
            onClick={resetAppearance}
            className="mt-5 w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
          >
            {ui.resetAppearance}
          </button>
        </div>
      ) : null}
    </div>
  )
}
