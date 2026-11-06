import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleStop,
  Radio,
  RefreshCw,
  X,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useHost } from '../context/HostContext'
import { usePrefs } from '../context/PrefsContext'
import { BoardGauge, ImuGauge, OdomScanStrip, type GaugeSnapshot } from './HwGauges'
import { BOARD_PROFILES, CAP_IMU, CAP_LED, boardHasCap } from '../lib/boards'
import { parseCapsMask } from '../lib/hwCaps'
import {
  fetchRobotosTopics,
  publishLedFx,
  publishTwist,
  robotosWsUrl,
  type RobotosPeerStatus,
  type RobotosTopicRow,
} from '../lib/hostClient'
import { readStorage, writeStorage } from '../lib/storage'

const STORAGE_OPEN = 'robotos-workshop-live-open'
const STORAGE_H = 'robotos-workshop-live-height'
const H_MIN = 220
const H_MAX = 640
const H_DEFAULT = 420
const CMD_VEL = '/robot/01/cmd_vel'
const TOPIC_BOARD = '/robot/01/sys/board'
const TOPIC_IMU = '/robot/01/sensor/imu'
const TOPIC_ODOM = '/robot/01/odom'
const TOPIC_SCAN = '/robot/01/scan'
const TOPIC_LED_STATE = '/robot/01/actuator/led/state'
/** Auto-subscribe these when they appear on the graph. */
const AUTO_SUB = [TOPIC_BOARD, TOPIC_IMU, TOPIC_ODOM, TOPIC_SCAN, TOPIC_LED_STATE] as const
/** Warehouse cmd_vel timeout is ~500 ms — stream well under that. */
const DRIVE_HZ_MS = 50

function loadNum(key: string, fallback: number, min: number, max: number) {
  const raw = readStorage(key)
  const n = raw ? Number(raw) : fallback
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

function liveHeightCap() {
  if (typeof window === 'undefined') return H_MAX
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--dock-pad').trim()
  const dockPx = raw.endsWith('px') ? Number.parseFloat(raw) : 48
  const dock = Number.isFinite(dockPx) ? dockPx : 48
  return Math.min(H_MAX, Math.max(H_MIN, window.innerHeight - dock - 16))
}

type EchoLine = {
  topic: string
  at: number
  summary: Record<string, unknown>
}

type DriveCmd = { vx: number; wz: number }

export function LiveGraphPanel() {
  const { connection } = useHost()
  const { ui, board, boardChoice, detectedBoard, setBoardChoice, reportDetectedBoard } = usePrefs()
  const [open, setOpen] = useState(() => readStorage(STORAGE_OPEN) === '1')
  const [height, setHeight] = useState(() => loadNum(STORAGE_H, H_DEFAULT, H_MIN, H_MAX))
  const [status, setStatus] = useState<RobotosPeerStatus | null>(null)
  const [topics, setTopics] = useState<RobotosTopicRow[]>([])
  const [echoTopic, setEchoTopic] = useState<string | null>(null)
  const [lines, setLines] = useState<EchoLine[]>([])
  const [boardSnap, setBoardSnap] = useState<GaugeSnapshot | null>(null)
  const [imuSnap, setImuSnap] = useState<GaugeSnapshot | null>(null)
  const [odomSnap, setOdomSnap] = useState<GaugeSnapshot | null>(null)
  const [scanSnap, setScanSnap] = useState<GaugeSnapshot | null>(null)
  const [ledSnap, setLedSnap] = useState<GaugeSnapshot | null>(null)
  /** Last commanded effect (LedState shadow is RGB-only and may lag). */
  const [ledEffect, setLedEffect] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'live' | 'topics' | 'log'>('live')
  const [activeDir, setActiveDir] = useState<'fwd' | 'back' | 'left' | 'right' | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const driveCmdRef = useRef<DriveCmd | null>(null)
  const driveTimerRef = useRef<number | null>(null)
  const keysRef = useRef<Set<string>>(new Set())
  const autoSubRef = useRef<Set<string>>(new Set())
  const echoTopicRef = useRef<string | null>(null)
  const connectionRef = useRef(connection)
  connectionRef.current = connection
  echoTopicRef.current = echoTopic

  useEffect(() => {
    writeStorage(STORAGE_OPEN, open ? '1' : '0')
  }, [open])

  useEffect(() => {
    writeStorage(STORAGE_H, String(height))
  }, [height])

  useEffect(() => {
    function clampToViewport() {
      const cap = liveHeightCap()
      setHeight((h) => Math.min(h, cap))
    }
    clampToViewport()
    window.addEventListener('resize', clampToViewport)
    return () => window.removeEventListener('resize', clampToViewport)
  }, [])

  const onResizeStart = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault()
      const startY = e.clientY
      const startH = height
      const onMove = (ev: PointerEvent) => {
        const next = Math.min(liveHeightCap(), Math.max(H_MIN, startH + (startY - ev.clientY)))
        setHeight(next)
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    },
    [height],
  )

  const refreshHttp = useCallback(async () => {
    if (connection.status !== 'connected') return
    try {
      const list = await fetchRobotosTopics(connection.base, connection.token)
      setTopics(list)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'topics failed')
    }
  }, [connection])

  useEffect(() => {
    if (connection.status !== 'connected' || !open) {
      wsRef.current?.close()
      wsRef.current = null
      autoSubRef.current = new Set()
      return
    }
    const ws = new WebSocket(robotosWsUrl(connection.base, connection.token))
    wsRef.current = ws
    autoSubRef.current = new Set()
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(String(ev.data)) as {
          op: string
          status?: RobotosPeerStatus
          topics?: RobotosTopicRow[]
          topic?: string
          summary?: Record<string, unknown>
          message?: string
        }
        if (msg.op === 'status' && msg.status) setStatus(msg.status)
        if (msg.op === 'topics' && msg.topics) setTopics(msg.topics)
        if (msg.op === 'msg' && msg.topic && msg.summary) {
          const snap: GaugeSnapshot = {
            topic: msg.topic,
            at: Date.now(),
            summary: msg.summary,
          }
          if (msg.topic === TOPIC_BOARD) {
            setBoardSnap(snap)
            reportDetectedBoard(snap.summary.hwModel, snap.summary.capsRaw ?? snap.summary.caps)
          } else if (msg.topic === TOPIC_IMU) setImuSnap(snap)
          else if (msg.topic === TOPIC_ODOM) setOdomSnap(snap)
          else if (msg.topic === TOPIC_SCAN) setScanSnap(snap)
          else if (msg.topic === TOPIC_LED_STATE) {
            setLedSnap(snap)
            if (typeof msg.summary.effect === 'number') {
              setLedEffect(msg.summary.effect)
            }
          }
          // Keep IMU/odom/scan out of the echo log — they flood at high rate.
          const selected = echoTopicRef.current
          const loggable =
            msg.topic === TOPIC_LED_STATE ||
            msg.topic === TOPIC_BOARD ||
            (selected != null && msg.topic === selected)
          if (loggable) {
            setLines((prev) => [snap, ...prev].slice(0, 24))
          }
        }
        if (msg.op === 'error' && msg.message) setError(msg.message)
      } catch {
        /* ignore */
      }
    }
    ws.onerror = () => setError('graph websocket error')
    ws.onopen = () => {
      // Eagerly subscribe allowlisted live topics (don't wait for pubs>0).
      for (const name of AUTO_SUB) {
        if (autoSubRef.current.has(name)) continue
        autoSubRef.current.add(name)
        ws.send(JSON.stringify({ op: 'subscribe', topic: name }))
      }
    }
    void refreshHttp()
    return () => {
      ws.close()
      if (wsRef.current === ws) wsRef.current = null
    }
  }, [connection, open, refreshHttp])

  // Also subscribe when a topic later appears (covers late publishers / reconnect).
  useEffect(() => {
    const sock = wsRef.current
    if (!sock || sock.readyState !== WebSocket.OPEN) return
    for (const name of AUTO_SUB) {
      const row = topics.find((t) => t.topic === name && t.allowedSub)
      if (!row || autoSubRef.current.has(name)) continue
      autoSubRef.current.add(name)
      sock.send(JSON.stringify({ op: 'subscribe', topic: name }))
    }
  }, [topics])

  function onSubscribe(topic: string) {
    setEchoTopic(topic)
    const sock = wsRef.current
    if (sock && sock.readyState === WebSocket.OPEN) {
      autoSubRef.current.add(topic)
      sock.send(JSON.stringify({ op: 'subscribe', topic }))
    }
  }

  function sendLed(payload: {
    effect: number
    r?: number
    g?: number
    b?: number
    n?: number
    onMs?: number
    offMs?: number
  }) {
    // Optimistic preview — MCU LedState is RGB shadow only and may lag
    // or stay unchanged for blink/rainbow.
    const effect = payload.effect
    const r = effect === 0 ? 0 : (payload.r ?? 0)
    const g = effect === 0 ? 0 : (payload.g ?? 0)
    const b = effect === 0 ? 0 : (payload.b ?? 0)
    setLedEffect(effect)
    setLedSnap({
      topic: TOPIC_LED_STATE,
      at: Date.now(),
      summary: { r, g, b },
    })
    const sock = wsRef.current
    if (sock && sock.readyState === WebSocket.OPEN) {
      sock.send(JSON.stringify({ op: 'led', ...payload }))
      setError(null)
      return
    }
    const conn = connectionRef.current
    if (conn.status !== 'connected') return
    void publishLedFx(conn.base, conn.token, payload).catch((err) => {
      setError(err instanceof Error ? err.message : 'led failed')
    })
  }

  const sendTwist = useCallback((vx: number, wz: number) => {
    const sock = wsRef.current
    if (sock && sock.readyState === WebSocket.OPEN) {
      sock.send(
        JSON.stringify({ op: 'publish', topic: CMD_VEL, vx, wz }),
      )
      return
    }
    const conn = connectionRef.current
    if (conn.status !== 'connected') return
    void publishTwist(conn.base, conn.token, { topic: CMD_VEL, vx, wz }).catch((err) => {
      setError(err instanceof Error ? err.message : 'publish failed')
    })
  }, [])

  const stopDrive = useCallback(
    (sendZero: boolean) => {
      if (driveTimerRef.current != null) {
        window.clearInterval(driveTimerRef.current)
        driveTimerRef.current = null
      }
      driveCmdRef.current = null
      setActiveDir(null)
      if (sendZero) sendTwist(0, 0)
    },
    [sendTwist],
  )

  const ensureDriveLoop = useCallback(() => {
    if (driveTimerRef.current != null) return
    driveTimerRef.current = window.setInterval(() => {
      const cmd = driveCmdRef.current
      if (cmd) sendTwist(cmd.vx, cmd.wz)
    }, DRIVE_HZ_MS)
  }, [sendTwist])

  const applyDriveCmd = useCallback(
    (vx: number, wz: number, dir: 'fwd' | 'back' | 'left' | 'right' | null) => {
      if (vx === 0 && wz === 0) {
        stopDrive(true)
        return
      }
      driveCmdRef.current = { vx, wz }
      setActiveDir(dir)
      setError(null)
      sendTwist(vx, wz)
      ensureDriveLoop()
    },
    [ensureDriveLoop, sendTwist, stopDrive],
  )

  const startDrive = useCallback(
    (vx: number, wz: number, dir: 'fwd' | 'back' | 'left' | 'right') => {
      keysRef.current.clear()
      stopDrive(false)
      applyDriveCmd(vx, wz, dir)
    },
    [applyDriveCmd, stopDrive],
  )

  const syncKeysToDrive = useCallback(() => {
    const keys = keysRef.current
    let vx = 0
    let wz = 0
    if (keys.has('w') || keys.has('arrowup')) vx += 0.25
    if (keys.has('s') || keys.has('arrowdown')) vx -= 0.15
    if (keys.has('a') || keys.has('arrowleft')) wz += 0.6
    if (keys.has('d') || keys.has('arrowright')) wz -= 0.6

    let dir: 'fwd' | 'back' | 'left' | 'right' | null = null
    if (vx > 0) dir = 'fwd'
    else if (vx < 0) dir = 'back'
    else if (wz > 0) dir = 'left'
    else if (wz < 0) dir = 'right'

    applyDriveCmd(vx, wz, dir)
  }, [applyDriveCmd])

  useEffect(() => {
    if (!open) {
      keysRef.current.clear()
      stopDrive(true)
    }
  }, [open, stopDrive])

  useEffect(() => {
    return () => stopDrive(true)
  }, [stopDrive])

  useEffect(() => {
    if (!open || connection.status !== 'connected') return

    function typingTarget(el: EventTarget | null) {
      if (!(el instanceof HTMLElement)) return false
      const tag = el.tagName
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
      )
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (typingTarget(e.target)) return
      const key = e.key.toLowerCase()
      if (key === ' ' || key === 'escape') {
        e.preventDefault()
        keysRef.current.clear()
        stopDrive(true)
        return
      }
      if (!['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        return
      }
      e.preventDefault()
      if (e.repeat) return
      keysRef.current.add(key)
      syncKeysToDrive()
    }

    function onKeyUp(e: KeyboardEvent) {
      if (typingTarget(e.target)) return
      const key = e.key.toLowerCase()
      if (!keysRef.current.has(key)) return
      e.preventDefault()
      keysRef.current.delete(key)
      syncKeysToDrive()
    }

    function onBlur() {
      keysRef.current.clear()
      stopDrive(true)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [open, connection.status, stopDrive, syncKeysToDrive])

  function bindHold(vx: number, wz: number, dir: 'fwd' | 'back' | 'left' | 'right') {
    return {
      onPointerDown: (e: ReactPointerEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.currentTarget.setPointerCapture(e.pointerId)
        startDrive(vx, wz, dir)
      },
      onPointerUp: () => stopDrive(true),
      onPointerCancel: () => stopDrive(true),
      onLostPointerCapture: () => stopDrive(true),
    }
  }

  function dirClass(dir: 'fwd' | 'back' | 'left' | 'right') {
    return `rounded-md border p-1.5 text-[var(--ink)] hover:border-[var(--accent)] ${
      activeDir === dir
        ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
        : 'border-[var(--line)]'
    }`
  }

  const visibleTopics = topics
    .filter(
      (t) =>
        t.allowedSub ||
        t.allowedPub ||
        ((t.topic.startsWith('/robot/') || t.topic.startsWith('/machine/')) && t.pubs > 0),
    )
    .sort(
      (a, b) =>
        Number(b.allowedSub) - Number(a.allowedSub) ||
        Number(b.pubs > 0) - Number(a.pubs > 0) ||
        a.topic.localeCompare(b.topic),
    )

  if (connection.status !== 'connected') return null

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(var(--dock-pad,3rem)+0.75rem)] right-4 z-50 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/95 px-3 py-2 text-xs font-medium text-[var(--ink)] shadow-[var(--shadow)] backdrop-blur-md hover:border-[var(--accent)]"
      >
        <Radio size={14} className="text-[var(--accent)]" />
        {ui.hostLiveOpen}
      </button>
    )
  }

  const peerOk = status?.connected
  const tabBtn = (id: typeof tab, label: string) => (
    <button
      key={id}
      type="button"
      role="tab"
      aria-selected={tab === id}
      onClick={() => setTab(id)}
      className={`relative flex-1 px-2 py-1.5 text-[0.65rem] font-medium transition-colors ${
        tab === id ? 'text-[var(--ink)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
      }`}
    >
      {label}
      {tab === id ? (
        <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
      ) : null}
    </button>
  )

  return (
    <aside
      className="fixed right-3 z-50 flex w-[min(100%-1.5rem,20rem)] flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]/95 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md sm:right-4"
      style={{
        bottom: 'calc(var(--dock-pad, 3rem) + 0.5rem)',
        height,
        maxHeight: 'calc(100dvh - var(--dock-pad, 3rem) - 1rem)',
      }}
    >
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-valuenow={Math.round(height)}
        aria-valuemin={H_MIN}
        aria-valuemax={H_MAX}
        onPointerDown={onResizeStart}
        className="group flex h-2.5 shrink-0 cursor-ns-resize items-center justify-center"
        title={ui.hostLiveResize}
      >
        <span className="h-0.5 w-10 rounded-full bg-[var(--line-strong)] opacity-40 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="flex shrink-0 items-center gap-2 border-b border-[var(--line)] px-2.5 py-1.5">
        <Radio size={13} className={peerOk ? 'text-[var(--ok)]' : 'text-[var(--muted)]'} />
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[0.7rem] font-semibold text-[var(--ink)]">{ui.hostLiveTitle}</p>
          <p className="m-0 truncate text-[0.6rem] text-[var(--muted)]">
            {status?.detail || ui.hostLiveHint}
          </p>
        </div>
        <button
          type="button"
          title={ui.hostLiveRefresh}
          aria-label={ui.hostLiveRefresh}
          onClick={() => {
            wsRef.current?.send(JSON.stringify({ op: 'refresh' }))
            void refreshHttp()
          }}
          className="rounded-md p-1 text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]"
        >
          <RefreshCw size={13} />
        </button>
        <button
          type="button"
          aria-label={ui.hostLiveClose}
          onClick={() => setOpen(false)}
          className="rounded-md p-1 text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)]"
        >
          <X size={13} />
        </button>
      </div>

      {error ? (
        <p className="m-0 shrink-0 border-b border-[var(--line)] bg-[var(--warn)]/10 px-2.5 py-1 text-[0.65rem] text-[var(--warn)]">
          {error}
        </p>
      ) : null}

      <div
        className="flex shrink-0 border-b border-[var(--line)]"
        role="tablist"
        aria-label={ui.hostLiveTitle}
      >
        {tabBtn('live', ui.hostLiveTabLive)}
        {tabBtn('topics', ui.hostLiveTabTopics)}
        {tabBtn('log', ui.hostLiveTabLog)}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {tab === 'live' ? (
          <div className="space-y-1.5 p-2.5">
            {(() => {
              const liveCaps =
                boardSnap != null
                  ? typeof boardSnap.summary.capsRaw === 'number'
                    ? (boardSnap.summary.capsRaw as number)
                    : parseCapsMask(boardSnap.summary.caps)
                  : null
              const hasImu =
                liveCaps != null ? (liveCaps & CAP_IMU) !== 0 : boardHasCap(board, CAP_IMU)
              const hasLed =
                liveCaps != null ? (liveCaps & CAP_LED) !== 0 : boardHasCap(board, CAP_LED)
              const docsMismatch =
                boardChoice !== 'auto' &&
                detectedBoard != null &&
                boardChoice !== detectedBoard
              return (
                <>
            {docsMismatch && detectedBoard ? (
              <div className="rounded-md border border-[var(--warn)]/35 bg-[var(--warn)]/10 px-2 py-1.5">
                <p className="m-0 text-[0.65rem] text-[var(--warn)]">
                  {ui.hostLiveBoardMismatch
                    .replace('{docs}', BOARD_PROFILES[board].label)
                    .replace('{live}', BOARD_PROFILES[detectedBoard].label)}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <button
                    type="button"
                    className="rounded border border-[var(--line)] px-1.5 py-0.5 text-[0.6rem] text-[var(--ink)] hover:border-[var(--accent)]"
                    onClick={() => setBoardChoice('auto')}
                  >
                    {ui.boardUseAuto}
                  </button>
                  <button
                    type="button"
                    className="rounded border border-[var(--line)] px-1.5 py-0.5 text-[0.6rem] text-[var(--ink)] hover:border-[var(--accent)]"
                    onClick={() => setBoardChoice(detectedBoard)}
                  >
                    {ui.boardUseLive}
                  </button>
                </div>
              </div>
            ) : null}
            <BoardGauge snap={boardSnap} />
            {hasImu ? <ImuGauge snap={imuSnap} /> : null}
            <OdomScanStrip odom={odomSnap} scan={scanSnap} />
            {(() => {
              if (!hasLed) return null
              const chip =
                'rounded-md border border-[var(--line)] px-2 py-1 text-[0.65rem] text-[var(--ink)] hover:border-[var(--accent)]'
              const lr = typeof ledSnap?.summary.r === 'number' ? ledSnap.summary.r : null
              const lg = typeof ledSnap?.summary.g === 'number' ? ledSnap.summary.g : null
              const lb = typeof ledSnap?.summary.b === 'number' ? ledSnap.summary.b : null
              const ledKnown = lr != null && lg != null && lb != null
              const isRainbow = ledEffect === 4
              const isBlink = ledEffect === 2
              const swatchBg = isRainbow
                ? 'linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)'
                : ledKnown
                  ? `rgb(${lr},${lg},${lb})`
                  : 'transparent'
              const swatchLabel = isRainbow
                ? `${ui.hostLedState}: rainbow`
                : ledKnown
                  ? `${ui.hostLedState}: rgb(${lr},${lg},${lb})${isBlink ? ' blink' : ''}`
                  : ui.hostLedStateWait
              return (
                <div className="rounded-md border border-[var(--line)] px-2 py-1.5">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="m-0 flex-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--muted)]">
                      {ui.hostLed}
                    </p>
                    <span
                      className={`inline-block h-3 w-3 shrink-0 rounded-sm border border-[var(--line-strong)] ${
                        isBlink ? 'animate-pulse' : ''
                      }`}
                      style={{ background: swatchBg }}
                      title={swatchLabel}
                      aria-label={swatchLabel}
                    />
                    <span className="font-mono text-[0.55rem] text-[var(--muted)]">
                      {isRainbow
                        ? 'fx:rainbow'
                        : ledKnown
                          ? `${lr},${lg},${lb}${isBlink ? ' blink' : ''}`
                          : '—'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <button type="button" className={chip} onClick={() => sendLed({ effect: 0 })}>
                      {ui.hostLedOff}
                    </button>
                    <button
                      type="button"
                      className={chip}
                      onClick={() => sendLed({ effect: 1, r: 255, g: 40, b: 0 })}
                    >
                      {ui.hostLedSolid}
                    </button>
                    <button
                      type="button"
                      className={chip}
                      onClick={() =>
                        sendLed({ effect: 2, r: 0, g: 180, b: 255, n: 6, onMs: 120, offMs: 120 })
                      }
                    >
                      {ui.hostLedBlink}
                    </button>
                    <button
                      type="button"
                      className={chip}
                      onClick={() => sendLed({ effect: 4, onMs: 400, offMs: 400 })}
                    >
                      {ui.hostLedRainbow}
                    </button>
                  </div>
                </div>
              )
            })()}
            <div className="rounded-md border border-[var(--line)] px-2 py-1.5">
              <p className="mb-1 mt-0 text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--muted)]">
                {ui.hostLiveDrive}
              </p>
              <div className="grid grid-cols-3 gap-1 place-items-center touch-none select-none">
                <span />
                <button type="button" {...bindHold(0.25, 0, 'fwd')} className={dirClass('fwd')} title="Hold: forward">
                  <ArrowUp size={15} />
                </button>
                <span />
                <button type="button" {...bindHold(0, 0.6, 'left')} className={dirClass('left')} title="Hold: turn left">
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault()
                    stopDrive(true)
                  }}
                  className="rounded-md border border-[var(--line)] p-1.5 text-[var(--warn)] hover:border-[var(--warn)]"
                  title="Stop"
                >
                  <CircleStop size={15} />
                </button>
                <button type="button" {...bindHold(0, -0.6, 'right')} className={dirClass('right')} title="Hold: turn right">
                  <ArrowRight size={15} />
                </button>
                <span />
                <button type="button" {...bindHold(-0.15, 0, 'back')} className={dirClass('back')} title="Hold: back">
                  <ArrowDown size={15} />
                </button>
                <span />
              </div>
              <p className="mb-0 mt-1 text-[0.6rem] text-[var(--muted)]">{ui.hostLiveDriveHint}</p>
            </div>
                </>
              )
            })()}
          </div>
        ) : null}

        {tab === 'topics' ? (
          <div className="p-1.5">
            {visibleTopics.length === 0 ? (
              <p className="m-0 px-2 py-3 text-[0.7rem] text-[var(--muted)]">{ui.hostLiveEmpty}</p>
            ) : (
              <ul className="m-0 list-none space-y-0.5 p-0">
                {visibleTopics.map((t) => (
                  <li key={t.topic}>
                    <button
                      type="button"
                      disabled={!t.allowedSub}
                      onClick={() => {
                        onSubscribe(t.topic)
                        setTab('log')
                      }}
                      className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-[0.65rem] ${
                        echoTopic === t.topic
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                          : 'text-[var(--ink)] hover:bg-[var(--bg)]'
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      <span className="min-w-0 flex-1 truncate font-mono">{t.topic}</span>
                      <span className="shrink-0 text-[var(--muted)]">
                        {t.pubs}p/{t.subs}s
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}

        {tab === 'log' ? (
          <div className="space-y-1 p-2.5 font-mono text-[0.6rem] text-[var(--muted)]">
            {lines.length === 0 ? (
              <p className="m-0">{ui.hostLiveEchoHint}</p>
            ) : (
              lines.map((line, i) => (
                <p key={`${line.at}-${i}`} className="m-0 break-all text-[var(--ink)]">
                  <span className="text-[var(--accent)]">{line.topic.split('/').pop()}</span>{' '}
                  {JSON.stringify(line.summary)}
                </p>
              ))
            )}
          </div>
        ) : null}
      </div>
    </aside>
  )
}
