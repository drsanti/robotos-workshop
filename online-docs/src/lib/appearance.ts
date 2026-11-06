import { readStorage, writeStorage } from './storage'
import type { Theme } from './storage'

export const STORAGE_APPEARANCE = 'robotos-setup-guide-appearance'

export type PagePreset =
  | 'light-slate'
  | 'light-paper'
  | 'light-mist'
  | 'light-sand'
  | 'light-mint'
  | 'dark-navy'
  | 'dark-charcoal'
  | 'dark-midnight'
  | 'dark-graphite'
  | 'dark-forest'

export type CodeBlockStyle =
  | 'match'
  | 'github-light'
  | 'github-dark'
  | 'monokai'
  | 'dracula'
  | 'nord'
  | 'solarized-light'
  | 'solarized-dark'
  | 'one-dark'

export type ChipPreset = 'accent' | 'muted' | 'amber' | 'custom'

export type Appearance = {
  pagePreset: PagePreset
  chipPreset: ChipPreset
  chipFg: string
  chipBg: string
  codeBlockStyle: CodeBlockStyle
}

export type PagePresetMeta = {
  id: PagePreset
  mode: Theme
  labelEn: string
  labelTh: string
  swatch: string
}

export const PAGE_PRESETS: PagePresetMeta[] = [
  { id: 'light-slate', mode: 'light', labelEn: 'Slate', labelTh: 'สเลต', swatch: '#f3f5f8' },
  { id: 'light-paper', mode: 'light', labelEn: 'Paper', labelTh: 'กระดาษ', swatch: '#f7f4ef' },
  { id: 'light-mist', mode: 'light', labelEn: 'Mist', labelTh: 'หมอก', swatch: '#f0f2f5' },
  { id: 'light-sand', mode: 'light', labelEn: 'Sand', labelTh: 'ทราย', swatch: '#f5f1ea' },
  { id: 'light-mint', mode: 'light', labelEn: 'Mint', labelTh: 'มิ้นต์', swatch: '#eef6f2' },
  { id: 'dark-navy', mode: 'dark', labelEn: 'Navy', labelTh: 'กรมท่า', swatch: '#0c1017' },
  { id: 'dark-charcoal', mode: 'dark', labelEn: 'Charcoal', labelTh: 'ถ่าน', swatch: '#141414' },
  { id: 'dark-midnight', mode: 'dark', labelEn: 'Midnight', labelTh: 'เที่ยงคืน', swatch: '#0a0a0a' },
  { id: 'dark-graphite', mode: 'dark', labelEn: 'Graphite', labelTh: 'แกรไฟต์', swatch: '#1a1d21' },
  { id: 'dark-forest', mode: 'dark', labelEn: 'Forest', labelTh: 'ป่า', swatch: '#0c1410' },
]

export const LIGHT_PAGE_PRESETS = PAGE_PRESETS.filter((p) => p.mode === 'light')
export const DARK_PAGE_PRESETS = PAGE_PRESETS.filter((p) => p.mode === 'dark')

const PAGE_PRESET_IDS = new Set(PAGE_PRESETS.map((p) => p.id))

export function pagePresetMode(id: PagePreset): Theme {
  return PAGE_PRESETS.find((p) => p.id === id)?.mode ?? 'light'
}

export function defaultPresetForMode(mode: Theme): PagePreset {
  return mode === 'dark' ? 'dark-navy' : 'light-slate'
}

export const CHIP_PRESETS: Record<
  Exclude<ChipPreset, 'custom'>,
  { fg: string; bg: string; labelEn: string; labelTh: string }
> = {
  accent: {
    fg: 'var(--accent)',
    bg: 'var(--accent-soft)',
    labelEn: 'Accent',
    labelTh: 'สีเน้น',
  },
  muted: {
    fg: 'var(--ink)',
    bg: 'var(--inline-code-bg)',
    labelEn: 'Muted',
    labelTh: 'นุ่ม',
  },
  amber: {
    fg: 'var(--warn)',
    bg: 'var(--callout-bg)',
    labelEn: 'Amber',
    labelTh: 'อำพัน',
  },
}

export const CODE_BLOCK_PALETTES: {
  id: CodeBlockStyle
  labelEn: string
  labelTh: string
  swatch: string
}[] = [
  { id: 'match', labelEn: 'Match page', labelTh: 'ตามหน้า', swatch: 'var(--surface)' },
  { id: 'github-light', labelEn: 'GitHub Light', labelTh: 'GitHub สว่าง', swatch: '#f6f8fa' },
  { id: 'github-dark', labelEn: 'GitHub Dark', labelTh: 'GitHub มืด', swatch: '#0d1117' },
  { id: 'monokai', labelEn: 'Monokai', labelTh: 'Monokai', swatch: '#272822' },
  { id: 'dracula', labelEn: 'Dracula', labelTh: 'Dracula', swatch: '#282a36' },
  { id: 'nord', labelEn: 'Nord', labelTh: 'Nord', swatch: '#2e3440' },
  { id: 'solarized-light', labelEn: 'Solarized Light', labelTh: 'Solarized สว่าง', swatch: '#fdf6e3' },
  { id: 'solarized-dark', labelEn: 'Solarized Dark', labelTh: 'Solarized มืด', swatch: '#002b36' },
  { id: 'one-dark', labelEn: 'One Dark', labelTh: 'One Dark', swatch: '#282c34' },
]

const CODE_BLOCK_IDS = new Set(CODE_BLOCK_PALETTES.map((p) => p.id))

export const DEFAULT_APPEARANCE: Appearance = {
  pagePreset: 'light-slate',
  chipPreset: 'accent',
  chipFg: '#0b6bcb',
  chipBg: '#e7f1fb',
  codeBlockStyle: 'match',
}

function normalizeCodeBlockStyle(raw: unknown): CodeBlockStyle {
  if (raw === 'light') return 'github-light'
  if (raw === 'dark') return 'github-dark'
  if (typeof raw === 'string' && CODE_BLOCK_IDS.has(raw as CodeBlockStyle)) {
    return raw as CodeBlockStyle
  }
  return 'match'
}

function normalizePagePreset(raw: unknown, themeHint?: Theme): PagePreset {
  if (typeof raw === 'string' && PAGE_PRESET_IDS.has(raw as PagePreset)) {
    return raw as PagePreset
  }
  return defaultPresetForMode(themeHint ?? 'light')
}

export function loadAppearance(themeHint?: Theme): Appearance {
  try {
    const raw = JSON.parse(readStorage(STORAGE_APPEARANCE) || 'null')
    if (!raw || typeof raw !== 'object') {
      return {
        ...DEFAULT_APPEARANCE,
        pagePreset: defaultPresetForMode(themeHint ?? 'light'),
      }
    }
    const chipPreset =
      raw.chipPreset === 'accent' ||
      raw.chipPreset === 'muted' ||
      raw.chipPreset === 'amber' ||
      raw.chipPreset === 'custom'
        ? raw.chipPreset
        : 'accent'
    return {
      pagePreset: normalizePagePreset(raw.pagePreset, themeHint),
      chipPreset,
      chipFg: typeof raw.chipFg === 'string' ? raw.chipFg : DEFAULT_APPEARANCE.chipFg,
      chipBg: typeof raw.chipBg === 'string' ? raw.chipBg : DEFAULT_APPEARANCE.chipBg,
      codeBlockStyle: normalizeCodeBlockStyle(raw.codeBlockStyle),
    }
  } catch {
    return {
      ...DEFAULT_APPEARANCE,
      pagePreset: defaultPresetForMode(themeHint ?? 'light'),
    }
  }
}

export function saveAppearance(a: Appearance) {
  writeStorage(STORAGE_APPEARANCE, JSON.stringify(a))
}

/** Resolve page preset, chips, and code-block palette onto documentElement. */
export function applyAppearance(a: Appearance) {
  const root = document.documentElement
  const mode = pagePresetMode(a.pagePreset)
  root.setAttribute('data-theme', mode)
  root.setAttribute('data-page-preset', a.pagePreset)

  if (a.chipPreset === 'custom') {
    root.style.setProperty('--chip-fg', a.chipFg)
    root.style.setProperty('--chip-bg', a.chipBg)
  } else {
    const preset = CHIP_PRESETS[a.chipPreset]
    root.style.setProperty('--chip-fg', preset.fg)
    root.style.setProperty('--chip-bg', preset.bg)
  }

  const block =
    a.codeBlockStyle === 'match'
      ? mode === 'dark'
        ? 'github-dark'
        : 'github-light'
      : a.codeBlockStyle
  root.setAttribute('data-code-block', block)
}
