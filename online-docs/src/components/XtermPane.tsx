import { FitAddon } from '@xterm/addon-fit'
import { SearchAddon } from '@xterm/addon-search'
import { WebLinksAddon } from '@xterm/addon-web-links'
import { Terminal } from '@xterm/xterm'
import { useEffect, useRef } from 'react'
import { sessionTtyUrl } from '../lib/hostClient'
import { createShellMarkState, feedShellMarks } from '../lib/shellMarks'
import { createTermFilterState, filterTermChunk, flushTermFilter } from '../lib/termFilter'
import { TERM_FONT_FAMILY, readXtermTheme } from '../lib/termTheme'
import '@xterm/xterm/css/xterm.css'

export type TermSearchDetail = { query: string; dir: 'next' | 'prev' }

export type ShellExitDetail = {
  sessionId: string
  exitCode: number
}

function bufferAbsY(term: Terminal): number {
  const buf = term.buffer.active
  return buf.baseY + buf.cursorY
}

function readBufferRange(term: Terminal, startY: number, endY: number): string {
  const buf = term.buffer.active
  const lo = Math.max(0, Math.min(startY, endY))
  const hi = Math.min(buf.length - 1, Math.max(startY, endY))
  const lines: string[] = []
  for (let y = lo; y <= hi; y++) {
    lines.push(buf.getLine(y)?.translateToString(true) ?? '')
  }
  return lines.join('\n').trim()
}

type Props = {
  sessionId: string
  base: string
  token: string
  active: boolean
  fontSize: number
  /** Bumps when page theme/preset changes so we refresh colors. */
  themeKey: string
}

export function XtermPane({
  sessionId,
  base,
  token,
  active,
  fontSize,
  themeKey,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal | null>(null)
  const fitRef = useRef<FitAddon | null>(null)
  const searchRef = useRef<SearchAddon | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const genRef = useRef(0)
  const filterRef = useRef(createTermFilterState())
  const marksRef = useRef(createShellMarkState())
  const lastCmdRef = useRef<{ startY: number; endY: number } | null>(null)
  const decoderRef = useRef(new TextDecoder())

  // Create terminal + WS once per session id
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const gen = ++genRef.current

    const term = new Terminal({
      convertEol: true,
      cursorBlink: true,
      fontFamily: TERM_FONT_FAMILY,
      fontSize,
      lineHeight: 1.35,
      scrollback: 10_000,
      theme: readXtermTheme(),
      allowProposedApi: true,
    })
    const fit = new FitAddon()
    const search = new SearchAddon()
    term.loadAddon(fit)
    term.loadAddon(search)
    term.loadAddon(
      new WebLinksAddon((_e, uri) => {
        if (uri.startsWith('http://') || uri.startsWith('https://')) {
          window.open(uri, '_blank', 'noopener,noreferrer')
        }
      }),
    )
    term.open(el)
    termRef.current = term
    fitRef.current = fit
    searchRef.current = search

    const sendResize = () => {
      try {
        fit.fit()
      } catch {
        return
      }
      const dims = { cols: term.cols, rows: term.rows }
      const ws = wsRef.current
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'resize', cols: dims.cols, rows: dims.rows }))
      }
    }

    requestAnimationFrame(() => sendResize())

    const url = sessionTtyUrl(base, token, sessionId)
    const ws = new WebSocket(url)
    ws.binaryType = 'arraybuffer'
    wsRef.current = ws
    filterRef.current = createTermFilterState()
    marksRef.current = createShellMarkState()
    lastCmdRef.current = null
    decoderRef.current = new TextDecoder()

    ws.onopen = () => {
      if (gen !== genRef.current) return
      sendResize()
    }
    ws.onmessage = (ev) => {
      if (gen !== genRef.current) return
      if (typeof ev.data === 'string') return // control/error JSON — ignore in stream
      const text = decoderRef.current.decode(ev.data as ArrayBuffer, { stream: true })
      const { text: unmarked, events } = feedShellMarks(marksRef.current, text)
      const started = events.some((e) => e.type === 'cmd-start')
      const ended = events.find((e) => e.type === 'cmd-end')
      // Mark start before paint so the range includes this chunk's output.
      if (started) {
        const y = bufferAbsY(term)
        lastCmdRef.current = { startY: y, endY: y }
      }
      const cleaned = filterTermChunk(filterRef.current, unmarked)
      const finishExit = () => {
        if (!ended || ended.type !== 'cmd-end') return
        const prev = lastCmdRef.current
        lastCmdRef.current = {
          startY: prev?.startY ?? bufferAbsY(term),
          endY: bufferAbsY(term),
        }
        window.dispatchEvent(
          new CustomEvent<ShellExitDetail>('workshop-shell-exit', {
            detail: { sessionId, exitCode: ended.exitCode },
          }),
        )
      }
      // Wait for xterm to parse the write so endY includes this chunk.
      if (cleaned) term.write(cleaned, finishExit)
      else finishExit()
    }
    ws.onerror = () => {
      if (gen !== genRef.current) return
      term.writeln('\r\n\x1b[33m[tty connection error]\x1b[0m')
    }

    const dataSub = term.onData((data) => {
      const sock = wsRef.current
      if (!sock || sock.readyState !== WebSocket.OPEN) return
      sock.send(new TextEncoder().encode(data))
    })

    const ro = new ResizeObserver(() => {
      if (!active) return
      sendResize()
    })
    ro.observe(el)

    const onClear = () => {
      term.clear()
    }
    const searchOpts = {
      incremental: false,
      decorations: {
        matchBackground: '#264f7888',
        matchOverviewRuler: '#5eb1ff',
        activeMatchBackground: '#e3b341aa',
        activeMatchColorOverviewRuler: '#e3b341',
      },
    }
    const onSearch = (ev: Event) => {
      const detail = (ev as CustomEvent<TermSearchDetail>).detail
      if (!detail?.query?.trim()) {
        search.clearDecorations()
        return
      }
      if (detail.dir === 'prev') search.findPrevious(detail.query, searchOpts)
      else search.findNext(detail.query, searchOpts)
    }
    const onCopy = async (ev: Event) => {
      const mode = (ev as CustomEvent<{ mode?: string }>).detail?.mode ?? 'selection'
      let text = term.getSelection()
      if (!text && mode === 'last-run') {
        const range = lastCmdRef.current
        if (range) {
          text = readBufferRange(term, range.startY, range.endY)
        }
        if (!text) {
          // Fallback: lines after the last workshop Run title marker (── … ──).
          const buf = term.buffer.active
          const lines: string[] = []
          for (let y = 0; y < buf.length; y++) {
            lines.push(buf.getLine(y)?.translateToString(true) ?? '')
          }
          const joined = lines.join('\n')
          const marker = joined.lastIndexOf('──')
          text =
            marker >= 0
              ? joined.slice(marker).trim()
              : lines.slice(-40).join('\n').trim()
        }
      }
      if (!text) return
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        /* ignore */
      }
    }
    el.addEventListener('workshop-term-clear', onClear)
    el.addEventListener('workshop-term-search', onSearch)
    el.addEventListener('workshop-term-copy', onCopy)

    return () => {
      genRef.current++
      const rest = flushTermFilter(filterRef.current)
      if (rest) term.write(rest)
      el.removeEventListener('workshop-term-clear', onClear)
      el.removeEventListener('workshop-term-search', onSearch)
      el.removeEventListener('workshop-term-copy', onCopy)
      dataSub.dispose()
      ro.disconnect()
      try {
        ws.close()
      } catch {
        /* ignore */
      }
      wsRef.current = null
      term.dispose()
      termRef.current = null
      fitRef.current = null
      searchRef.current = null
    }
    // session identity — recreate when session id / auth changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, base, token])

  useEffect(() => {
    const term = termRef.current
    if (!term) return
    term.options.fontSize = fontSize
    try {
      fitRef.current?.fit()
    } catch {
      /* ignore */
    }
    const ws = wsRef.current
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }))
    }
  }, [fontSize])

  useEffect(() => {
    const term = termRef.current
    if (!term) return
    term.options.theme = readXtermTheme()
  }, [themeKey])

  useEffect(() => {
    if (!active) return
    const term = termRef.current
    const fit = fitRef.current
    if (!term || !fit) return
    requestAnimationFrame(() => {
      try {
        fit.fit()
      } catch {
        return
      }
      const ws = wsRef.current
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }))
      }
      term.focus()
    })
  }, [active])

  return (
    <div
      ref={hostRef}
      className="h-full w-full min-h-0 px-3 pt-2 sm:px-4 [&_.xterm]:h-full [&_.xterm-viewport]:overflow-auto"
      style={{ display: active ? 'block' : 'none', height: '100%' }}
      data-session={sessionId}
    />
  )
}
