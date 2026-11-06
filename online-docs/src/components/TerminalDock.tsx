import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Eraser,
  Maximize2,
  Minus,
  Plus,
  Search,
  Square,
  Terminal,
  Trash2,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useHost } from '../context/HostContext'
import { usePrefs } from '../context/PrefsContext'
import { readStorage, writeStorage } from '../lib/storage'
import {
  TERM_FONT_DEFAULT,
  TERM_FONT_MAX,
  TERM_FONT_MIN,
} from '../lib/termTheme'
import { XtermPane } from './XtermPane'

const STORAGE_DOCK_H = 'robotos-workshop-term-height'
const STORAGE_FONT = 'robotos-workshop-term-font'
const STORAGE_OPEN = 'robotos-workshop-term-open'

function loadNum(key: string, fallback: number, min: number, max: number) {
  const raw = readStorage(key)
  const n = raw ? Number(raw) : fallback
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

export function TerminalDock() {
  const {
    connection,
    sessions,
    activeSessionId,
    setActiveSessionId,
    interruptActive,
    killActive,
    lastRun,
  } = useHost()
  const { ui, appearance, theme } = usePrefs()
  const [open, setOpen] = useState(() => readStorage(STORAGE_OPEN) !== '0')
  const [height, setHeight] = useState(() => loadNum(STORAGE_DOCK_H, 220, 120, 560))
  const [fontSize, setFontSize] = useState(() =>
    loadNum(STORAGE_FONT, TERM_FONT_DEFAULT, TERM_FONT_MIN, TERM_FONT_MAX),
  )
  const [busy, setBusy] = useState(false)
  const [focused, setFocused] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const themeKey = `${theme}:${appearance.pagePreset}:${appearance.codeBlockStyle}`

  const bodyHeight = maximized
    ? Math.max(320, typeof window !== 'undefined' ? window.innerHeight * 0.7 : 420)
    : height

  useEffect(() => {
    writeStorage(STORAGE_OPEN, open ? '1' : '0')
  }, [open])

  useEffect(() => {
    writeStorage(STORAGE_DOCK_H, String(height))
  }, [height])

  useEffect(() => {
    writeStorage(STORAGE_FONT, String(fontSize))
  }, [fontSize])

  useEffect(() => {
    // Toolbar (~40) + optional search (~42) + terminal body
    const chrome = 40 + (open && searchOpen ? 42 : 0)
    const pad = connection.status === 'connected' ? (open ? bodyHeight + chrome : 44) : 0
    document.body.style.paddingBottom = pad ? `${pad}px` : ''
    document.documentElement.style.setProperty('--dock-pad', pad ? `${pad}px` : '3rem')
    return () => {
      document.body.style.paddingBottom = ''
      document.documentElement.style.removeProperty('--dock-pad')
    }
  }, [connection.status, open, bodyHeight, searchOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '`' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'f' && (e.ctrlKey || e.metaKey) && connection.status === 'connected') {
        e.preventDefault()
        setOpen(true)
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [connection.status])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  const runSearch = useCallback(
    (dir: 'next' | 'prev') => {
      if (!activeSessionId) return
      const termHost = document.querySelector(`[data-session="${activeSessionId}"]`)
      termHost?.dispatchEvent(
        new CustomEvent('workshop-term-search', {
          detail: { query: searchQuery, dir },
        }),
      )
    },
    [activeSessionId, searchQuery],
  )

  useEffect(() => {
    if (!activeSessionId || searchQuery.trim()) return
    const termHost = document.querySelector(`[data-session="${activeSessionId}"]`)
    termHost?.dispatchEvent(
      new CustomEvent('workshop-term-search', { detail: { query: '', dir: 'next' } }),
    )
  }, [activeSessionId, searchQuery])

  const onDragStart = useCallback(
    (e: ReactPointerEvent) => {
      if (maximized) return
      e.preventDefault()
      const startY = e.clientY
      const startH = height
      const onMove = (ev: PointerEvent) => {
        const next = Math.min(560, Math.max(120, startH + (startY - ev.clientY)))
        setHeight(next)
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    },
    [height, maximized],
  )

  const clearActive = useCallback(() => {
    const termHost = document.querySelector(`[data-session="${activeSessionId}"]`)
    termHost?.dispatchEvent(new CustomEvent('workshop-term-clear'))
  }, [activeSessionId])

  const copyActive = useCallback(() => {
    const termHost = document.querySelector(`[data-session="${activeSessionId}"]`)
    termHost?.dispatchEvent(
      new CustomEvent('workshop-term-copy', { detail: { mode: 'last-run' } }),
    )
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }, [activeSessionId])

  const runChip = useMemo(() => {
    if (!lastRun) return null
    const title = lastRun.title
    if (lastRun.status === 'running') {
      return {
        status: ui.hostRunRunning,
        title,
        className: 'text-[var(--warn)]',
        tip: `${ui.hostRunRunning} ${title}`,
      }
    }
    const exit =
      typeof lastRun.exitCode === 'number' ? `${ui.hostExit} ${lastRun.exitCode}` : null
    if (lastRun.status === 'ok') {
      return {
        status: exit ? `${ui.hostRunOk} · ${exit}` : ui.hostRunOk,
        title,
        className: 'text-[var(--ok)]',
        tip: exit ? `${ui.hostRunOk} · ${title} · ${exit}` : `${ui.hostRunOk} · ${title}`,
      }
    }
    const failLabel = lastRun.detail?.startsWith('exit')
      ? ui.hostRunFail
      : lastRun.detail || ui.hostRunFail
    return {
      status: exit ? `${ui.hostRunFail} · ${exit}` : failLabel,
      title,
      className: 'text-red-400',
      tip: exit
        ? `${ui.hostRunFail} · ${title} · ${exit}`
        : `${ui.hostRunFail} · ${lastRun.detail || title}`,
    }
  }, [lastRun, ui])

  if (connection.status !== 'connected') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-md">
        <div className="flex w-full items-center gap-2.5 px-4 py-2.5 sm:px-5">
          <Terminal size={16} className="shrink-0 text-[var(--muted)]" />
          <p className="m-0 text-xs text-[var(--muted)]">{ui.hostTerminalNeedsConnect}</p>
        </div>
      </div>
    )
  }

  async function onStop() {
    setBusy(true)
    try {
      await interruptActive()
    } finally {
      setBusy(false)
    }
  }

  async function onKill() {
    setBusy(true)
    try {
      await killActive()
    } finally {
      setBusy(false)
    }
  }

  const iconBtn =
    'rounded-md p-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] disabled:opacity-40'

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 flex flex-col border-t bg-[var(--surface)]/95 shadow-[0_-8px_32px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[border-color] duration-150 ${
        focused ? 'border-[var(--accent)]' : 'border-[var(--line)]'
      }`}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        onPointerDown={onDragStart}
        className="group flex h-2 shrink-0 cursor-ns-resize items-center justify-center"
        title="Drag to resize"
      >
        <span className="h-0.5 w-12 rounded-full bg-[var(--line-strong)] opacity-40 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="flex h-10 w-full shrink-0 items-center gap-2 border-b border-[var(--line)] px-3 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Terminal size={15} className="hidden shrink-0 text-[var(--accent)] sm:block" />
          <div
            className="flex min-w-0 items-stretch gap-0.5 overflow-x-auto"
            role="tablist"
            aria-label={ui.hostTerminals}
          >
            {sessions.map((s) => {
              const active = s.id === activeSessionId
              const busyDot = s.persistentBusy
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveSessionId(s.id)}
                  className={`relative inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? 'text-[var(--ink)]'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      busyDot ? 'animate-pulse bg-[var(--warn)]' : 'bg-[var(--ok)]'
                    }`}
                  />
                  {s.label}
                  {active ? (
                    <span className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
                  ) : null}
                </button>
              )
            })}
          </div>

          {runChip ? (
            <span
              title={runChip.tip}
              className={`ml-1 hidden min-w-0 max-w-[20rem] items-center gap-1 truncate rounded-md bg-[var(--bg)]/60 px-2 py-0.5 text-[0.7rem] md:inline-flex ${runChip.className}`}
            >
              <span className="shrink-0">{runChip.status}</span>
              {runChip.title ? (
                <span className="truncate opacity-70">· {runChip.title}</span>
              ) : null}
            </span>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            disabled={busy || !activeSessionId}
            title={ui.hostStop}
            aria-label={ui.hostStop}
            onClick={() => void onStop()}
            className={`${iconBtn} text-[var(--warn)] hover:text-[var(--warn)]`}
          >
            <Square size={13} />
          </button>
          <button
            type="button"
            disabled={busy || !activeSessionId}
            title={ui.hostKill}
            aria-label={ui.hostKill}
            onClick={() => void onKill()}
            className={`${iconBtn} text-red-500 hover:text-red-500`}
          >
            <Trash2 size={13} />
          </button>
          <span className="mx-1 hidden h-4 w-px bg-[var(--line)] sm:block" aria-hidden />
          <button
            type="button"
            title={ui.hostSearch}
            aria-label={ui.hostSearch}
            onClick={() => {
              setSearchOpen(true)
              setOpen(true)
            }}
            className={iconBtn}
          >
            <Search size={14} />
          </button>
          <button
            type="button"
            title={ui.hostCopyHint}
            aria-label={ui.hostCopy}
            onClick={copyActive}
            className={iconBtn}
          >
            {copied ? <Check size={14} className="text-[var(--ok)]" /> : <Copy size={14} />}
          </button>
          <button
            type="button"
            title={ui.hostClear}
            aria-label={ui.hostClear}
            onClick={clearActive}
            className={iconBtn}
          >
            <Eraser size={14} />
          </button>
          <button
            type="button"
            title={ui.hostFontSmaller}
            aria-label={ui.hostFontSmaller}
            onClick={() => setFontSize((n) => Math.max(TERM_FONT_MIN, n - 1))}
            className={iconBtn}
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            title={ui.hostFontLarger}
            aria-label={ui.hostFontLarger}
            onClick={() => setFontSize((n) => Math.min(TERM_FONT_MAX, n + 1))}
            className={iconBtn}
          >
            <Plus size={14} />
          </button>
          <button
            type="button"
            title={ui.hostMaximize}
            aria-label={ui.hostMaximize}
            onClick={() => setMaximized((v) => !v)}
            className={iconBtn}
          >
            <Maximize2 size={14} />
          </button>
          <button
            type="button"
            aria-label={open ? ui.hostTerminalHide : ui.hostTerminalShow}
            onClick={() => setOpen((v) => !v)}
            className={iconBtn}
          >
            <ChevronDown size={16} className={`transition-transform ${open ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </div>

      {open && searchOpen ? (
        <div className="flex w-full items-center gap-2 border-b border-[var(--line)] bg-[var(--bg)]/40 px-3 py-2 sm:px-4">
          <Search size={14} className="shrink-0 text-[var(--muted)]" />
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            placeholder={ui.hostSearchPlaceholder}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                runSearch(e.shiftKey ? 'prev' : 'next')
              } else if (e.key === 'Escape') {
                setSearchOpen(false)
              }
            }}
            className="min-w-0 flex-1 rounded-md border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          />
          <button
            type="button"
            title={ui.hostSearchPrev}
            aria-label={ui.hostSearchPrev}
            onClick={() => runSearch('prev')}
            className={iconBtn}
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            title={ui.hostSearchNext}
            aria-label={ui.hostSearchNext}
            onClick={() => runSearch('next')}
            className={iconBtn}
          >
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            title={ui.hostTerminalHide}
            aria-label={ui.hostTerminalHide}
            onClick={() => setSearchOpen(false)}
            className={iconBtn}
          >
            <X size={14} />
          </button>
        </div>
      ) : null}

      {open ? (
        <div className="w-full bg-[var(--term-bg)]" style={{ height: bodyHeight }}>
          {sessions.map((s) => (
            <div
              key={s.id}
              className="h-full"
              style={{ display: s.id === activeSessionId ? 'block' : 'none' }}
            >
              <XtermPane
                sessionId={s.id}
                base={connection.base}
                token={connection.token}
                active={s.id === activeSessionId}
                fontSize={fontSize}
                themeKey={themeKey}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
