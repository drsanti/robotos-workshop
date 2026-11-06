import type { ITheme } from '@xterm/xterm'

function cssVar(name: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

/** Build an xterm theme from `--term-*` / page CSS variables (concrete hex). */
export function readXtermTheme(): ITheme {
  return {
    background: cssVar('--term-bg', '#0f1419'),
    foreground: cssVar('--term-fg', '#d7dee8'),
    cursor: cssVar('--term-cursor', cssVar('--accent', '#5eb1ff')),
    cursorAccent: cssVar('--term-bg', '#0f1419'),
    selectionBackground: cssVar('--term-selection', '#264f78'),
    selectionForeground: cssVar('--term-fg', '#d7dee8'),
    black: cssVar('--term-black', '#1a1f26'),
    red: cssVar('--term-red', '#f07178'),
    green: cssVar('--term-green', '#7fd962'),
    yellow: cssVar('--term-yellow', '#e6c07b'),
    blue: cssVar('--term-blue', '#6cb6ff'),
    magenta: cssVar('--term-magenta', '#d2a8ff'),
    cyan: cssVar('--term-cyan', '#56d4dd'),
    white: cssVar('--term-white', '#d7dee8'),
    brightBlack: cssVar('--term-bright-black', '#6e7681'),
    brightRed: cssVar('--term-bright-red', '#ff7b72'),
    brightGreen: cssVar('--term-bright-green', '#56d364'),
    brightYellow: cssVar('--term-bright-yellow', '#e3b341'),
    brightBlue: cssVar('--term-bright-blue', '#79c0ff'),
    brightMagenta: cssVar('--term-bright-magenta', '#d2a8ff'),
    brightCyan: cssVar('--term-bright-cyan', '#56d4dd'),
    brightWhite: cssVar('--term-bright-white', '#f0f3f6'),
  }
}

export const TERM_FONT_FAMILY =
  '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

export const TERM_FONT_MIN = 11
export const TERM_FONT_MAX = 20
export const TERM_FONT_DEFAULT = 13
