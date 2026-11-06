import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_APPEARANCE,
  applyAppearance,
  defaultPresetForMode,
  loadAppearance,
  pagePresetMode,
  saveAppearance,
  type Appearance,
  type ChipPreset,
  type CodeBlockStyle,
  type PagePreset,
} from '../lib/appearance'
import { uiPack } from '../lib/i18n'
import { normalizeWorkshopDir } from '../lib/path'
import {
  detectBoardKey,
  resolveBoard,
  type BoardChoice,
  type BoardKey,
} from '../lib/boards'
import {
  STORAGE,
  bootBoardChoice,
  bootLang,
  bootOs,
  bootTheme,
  loadChecks,
  readStorage,
  saveChecks,
  writeStorage,
  type CheckMap,
  type Lang,
  type OsKey,
  type Theme,
} from '../lib/storage'

type Prefs = {
  lang: Lang
  theme: Theme
  os: OsKey
  /** User picker: Auto or a concrete board. */
  boardChoice: BoardChoice
  /** Last BoardInfo detection (null until host/Live sees a board). */
  detectedBoard: BoardKey | null
  /** Resolved board for docs + UI gating. */
  board: BoardKey
  workshopDir: string
  workshopDirInput: string
  configOpen: boolean
  checks: CheckMap
  appearance: Appearance
  ui: ReturnType<typeof uiPack>
  setLang: (lang: Lang) => void
  toggleLang: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setPagePreset: (preset: PagePreset) => void
  setOs: (os: OsKey, opts?: { scroll?: boolean }) => void
  setBoardChoice: (choice: BoardChoice) => void
  reportDetectedBoard: (hwModel: unknown, capsRaw?: unknown) => void
  clearDetectedBoard: () => void
  setWorkshopDir: (dir: string, opts?: { normalize?: boolean }) => void
  setConfigOpen: (open: boolean) => void
  setCheck: (id: string, done: boolean) => void
  clearProgressForOs: (os: OsKey) => void
  progressForOs: (os: OsKey, stepIds: string[]) => { done: number; total: number; pct: number }
  setChipPreset: (preset: ChipPreset) => void
  setChipColors: (fg: string, bg: string) => void
  setCodeBlockStyle: (style: CodeBlockStyle) => void
  resetAppearance: () => void
}

const PrefsContext = createContext<Prefs | null>(null)

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => bootLang())
  const [os, setOsState] = useState<OsKey>(() => bootOs())
  const [boardChoice, setBoardChoiceState] = useState<BoardChoice>(() => bootBoardChoice())
  const [detectedBoard, setDetectedBoard] = useState<BoardKey | null>(null)
  const [workshopDir, setWorkshopDirState] = useState(() => readStorage(STORAGE.dir) || '')
  const [configOpen, setConfigOpenState] = useState(() => {
    const saved = readStorage(STORAGE.configOpen)
    const dir = readStorage(STORAGE.dir)
    if (saved === '0' || (saved === null && dir)) return false
    return true
  })
  const [checks, setChecks] = useState<CheckMap>(() => loadChecks())
  const [appearance, setAppearanceState] = useState<Appearance>(() => loadAppearance(bootTheme()))

  const theme = pagePresetMode(appearance.pagePreset)
  const lastByMode = useRef<{ light: PagePreset; dark: PagePreset }>(
    (() => {
      const initial = loadAppearance(bootTheme())
      const mode = pagePresetMode(initial.pagePreset)
      return {
        light: mode === 'light' ? initial.pagePreset : defaultPresetForMode('light'),
        dark: mode === 'dark' ? initial.pagePreset : defaultPresetForMode('dark'),
      }
    })(),
  )

  useEffect(() => {
    document.documentElement.lang = lang
    writeStorage(STORAGE.lang, lang)
  }, [lang])

  useEffect(() => {
    const mode = pagePresetMode(appearance.pagePreset)
    lastByMode.current[mode] = appearance.pagePreset
    applyAppearance(appearance)
    saveAppearance(appearance)
    writeStorage(STORAGE.theme, mode)
  }, [appearance])

  useEffect(() => {
    writeStorage(STORAGE.os, os)
  }, [os])

  useEffect(() => {
    writeStorage(STORAGE.board, boardChoice)
  }, [boardChoice])

  const board = useMemo(
    () => resolveBoard(boardChoice, detectedBoard),
    [boardChoice, detectedBoard],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest('input,textarea,select')) return
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault()
        setLangState((prev) => (prev === 'th' ? 'en' : 'th'))
      } else if (e.key === 't' || e.key === 'T') {
        // T = theme (not D — D is WASD teleop in Live graph)
        e.preventDefault()
        setAppearanceState((prev) => {
          const mode = pagePresetMode(prev.pagePreset)
          const nextMode: Theme = mode === 'dark' ? 'light' : 'dark'
          return { ...prev, pagePreset: lastByMode.current[nextMode] }
        })
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const setLang = useCallback((next: Lang) => setLangState(next === 'th' ? 'th' : 'en'), [])
  const toggleLang = useCallback(() => setLangState((p) => (p === 'th' ? 'en' : 'th')), [])

  const setTheme = useCallback((next: Theme) => {
    setAppearanceState((prev) => {
      if (pagePresetMode(prev.pagePreset) === next) return prev
      return { ...prev, pagePreset: lastByMode.current[next] }
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setAppearanceState((prev) => {
      const mode = pagePresetMode(prev.pagePreset)
      const nextMode: Theme = mode === 'dark' ? 'light' : 'dark'
      return { ...prev, pagePreset: lastByMode.current[nextMode] }
    })
  }, [])

  const setPagePreset = useCallback((preset: PagePreset) => {
    setAppearanceState((prev) => ({ ...prev, pagePreset: preset }))
  }, [])

  const setOs = useCallback((next: OsKey, opts?: { scroll?: boolean }) => {
    setOsState(next)
    if (opts?.scroll === false) return
    requestAnimationFrame(() => {
      document.getElementById(`os-${next}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    })
  }, [])

  const setBoardChoice = useCallback((choice: BoardChoice) => {
    setBoardChoiceState(choice)
  }, [])

  const reportDetectedBoard = useCallback((hwModel: unknown, capsRaw?: unknown) => {
    const key = detectBoardKey(hwModel, capsRaw)
    if (!key) return
    setDetectedBoard((prev) => (prev === key ? prev : key))
  }, [])

  const clearDetectedBoard = useCallback(() => {
    setDetectedBoard(null)
  }, [])

  const setWorkshopDir = useCallback((raw: string, opts?: { normalize?: boolean }) => {
    if (opts?.normalize === false) {
      setWorkshopDirState(raw)
      writeStorage(STORAGE.dir, normalizeWorkshopDir(raw) || null)
      return
    }
    const stored = normalizeWorkshopDir(raw)
    setWorkshopDirState(stored)
    writeStorage(STORAGE.dir, stored || null)
  }, [])

  const setConfigOpen = useCallback((open: boolean) => {
    setConfigOpenState(open)
    writeStorage(STORAGE.configOpen, open ? '1' : '0')
  }, [])

  const setCheck = useCallback((id: string, done: boolean) => {
    setChecks((prev) => {
      const next = { ...prev }
      if (done) next[id] = { at: new Date().toISOString() }
      else delete next[id]
      saveChecks(next)
      return next
    })
  }, [])

  const clearProgressForOs = useCallback((osKey: OsKey) => {
    setChecks((prev) => {
      const next = { ...prev }
      for (const id of Object.keys(next)) {
        if (id.startsWith(`${osKey}-`)) delete next[id]
      }
      saveChecks(next)
      return next
    })
  }, [])

  const progressForOs = useCallback(
    (_osKey: OsKey, stepIds: string[]) => {
      const total = stepIds.length
      const done = stepIds.filter((id) => Boolean(checks[id])).length
      return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
    },
    [checks],
  )

  const setChipPreset = useCallback((preset: ChipPreset) => {
    setAppearanceState((prev) => ({ ...prev, chipPreset: preset }))
  }, [])

  const setChipColors = useCallback((fg: string, bg: string) => {
    setAppearanceState((prev) => ({
      ...prev,
      chipPreset: 'custom',
      chipFg: fg,
      chipBg: bg,
    }))
  }, [])

  const setCodeBlockStyle = useCallback((style: CodeBlockStyle) => {
    setAppearanceState((prev) => ({ ...prev, codeBlockStyle: style }))
  }, [])

  const resetAppearance = useCallback(() => {
    setAppearanceState({ ...DEFAULT_APPEARANCE })
  }, [])

  const value = useMemo<Prefs>(
    () => ({
      lang,
      theme,
      os,
      boardChoice,
      detectedBoard,
      board,
      workshopDir: normalizeWorkshopDir(workshopDir),
      workshopDirInput: workshopDir,
      configOpen,
      checks,
      appearance,
      ui: uiPack(lang),
      setLang,
      toggleLang,
      setTheme,
      toggleTheme,
      setPagePreset,
      setOs,
      setBoardChoice,
      reportDetectedBoard,
      clearDetectedBoard,
      setWorkshopDir,
      setConfigOpen,
      setCheck,
      clearProgressForOs,
      progressForOs,
      setChipPreset,
      setChipColors,
      setCodeBlockStyle,
      resetAppearance,
    }),
    [
      lang,
      theme,
      os,
      boardChoice,
      detectedBoard,
      board,
      workshopDir,
      configOpen,
      checks,
      appearance,
      setLang,
      toggleLang,
      setTheme,
      toggleTheme,
      setPagePreset,
      setOs,
      setBoardChoice,
      reportDetectedBoard,
      clearDetectedBoard,
      setWorkshopDir,
      setConfigOpen,
      setCheck,
      clearProgressForOs,
      progressForOs,
      setChipPreset,
      setChipColors,
      setCodeBlockStyle,
      resetAppearance,
    ],
  )

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}

export function usePrefs() {
  const ctx = useContext(PrefsContext)
  if (!ctx) throw new Error('usePrefs must be used within PrefsProvider')
  return ctx
}
