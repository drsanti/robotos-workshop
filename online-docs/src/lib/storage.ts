import { parseBoardChoice, type BoardChoice } from './boards'

export type { BoardChoice, BoardKey } from './boards'

export const STORAGE = {
  os: 'robotos-setup-guide-os',
  board: 'robotos-setup-guide-board',
  checks: 'robotos-setup-guide-checks',
  lang: 'robotos-setup-guide-lang',
  theme: 'robotos-setup-guide-theme',
  dir: 'robotos-setup-guide-dir',
  configOpen: 'robotos-setup-guide-config-open',
} as const

export type OsKey = 'win' | 'mac' | 'linux'
export type Lang = 'en' | 'th'
export type Theme = 'light' | 'dark'
export type CheckMap = Record<string, { at: string }>

export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function bootBoardChoice(): BoardChoice {
  return parseBoardChoice(readStorage(STORAGE.board)) ?? 'auto'
}

export function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

export function loadChecks(): CheckMap {
  try {
    const raw = JSON.parse(readStorage(STORAGE.checks) || '{}') || {}
    const map: CheckMap = {}
    let migrated = false
    for (const [id, val] of Object.entries(raw)) {
      if (val && typeof val === 'object' && 'at' in (val as object)) {
        map[id] = { at: String((val as { at: string }).at) }
      } else if (val) {
        map[id] = { at: new Date().toISOString() }
        migrated = true
      }
    }
    if (migrated) saveChecks(map)
    return map
  } catch {
    return {}
  }
}

export function saveChecks(map: CheckMap) {
  writeStorage(STORAGE.checks, JSON.stringify(map))
}

export function bootTheme(): Theme {
  const saved = readStorage(STORAGE.theme)
  if (saved === 'dark' || saved === 'light') return saved
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function bootLang(): Lang {
  return readStorage(STORAGE.lang) === 'th' ? 'th' : 'en'
}

export function parseOsParam(raw: string | null | undefined): OsKey | null {
  if (!raw) return null
  if (raw === 'win' || raw === 'windows' || raw === 'os-win') return 'win'
  if (raw === 'mac' || raw === 'macos' || raw === 'os-mac') return 'mac'
  if (raw === 'linux' || raw === 'os-linux') return 'linux'
  return null
}

export function bootOs(): OsKey {
  if (typeof location !== 'undefined') {
    const query = new URLSearchParams(location.search).get('os')
    const fromQuery = parseOsParam(query)
    if (fromQuery) return fromQuery

    // HashRouter query: #/setup?os=mac
    const hash = location.hash
    const qIndex = hash.indexOf('?')
    if (qIndex >= 0) {
      const fromHashQuery = parseOsParam(new URLSearchParams(hash.slice(qIndex)).get('os'))
      if (fromHashQuery) return fromHashQuery
    }

    // Legacy static guide: #os-win
    const bare = hash.replace(/^#/, '').split('?')[0]
    const fromLegacy = parseOsParam(bare)
    if (fromLegacy) return fromLegacy
  }
  const saved = readStorage(STORAGE.os)
  if (saved === 'win' || saved === 'mac' || saved === 'linux') return saved
  return 'win'
}
