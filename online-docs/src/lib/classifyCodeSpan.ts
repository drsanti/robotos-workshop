export type CodeSpanKind = 'code' | 'kbd' | 'app'

/** Keys pressed — only classify already-parsed markdown code spans. */
const KBD_SPANS = new Set([
  'Win',
  'Enter',
  'Return',
  'Esc',
  'Escape',
  'Tab',
  'Shift',
  'Ctrl',
  'Control',
  'Alt',
  'Option',
  'Command',
  'Cmd',
  'Delete',
  'Backspace',
  'Space',
])

/** App / shell names that may appear in backticks in older copy — render as .app-name. */
const APP_SPANS = new Set([
  'PowerShell',
  'Terminal',
  'Finder',
  'Git Bash',
  'System Settings',
  'Device Manager',
  'Spotlight',
  'bash',
  'zsh',
])

/** Classify a markdown code span; never invents spans from bare prose. */
export function classifyCodeSpan(text: string): CodeSpanKind {
  const t = text.trim()
  if (KBD_SPANS.has(t)) return 'kbd'
  if (APP_SPANS.has(t)) return 'app'
  return 'code'
}
