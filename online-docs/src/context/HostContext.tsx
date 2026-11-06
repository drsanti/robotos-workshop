import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_HOST_BASE,
  clearHostQueryParams,
  createSession,
  fetchHostEnv,
  listSessions,
  loadStoredHostAuth,
  probeHostHealth,
  readHostQueryParams,
  robotosWsUrl,
  runInSession,
  saveHostAuth,
  signalSession,
  type HostConnection,
  type HostEnv,
  type HostSession,
} from '../lib/hostClient'
import { usePrefs } from './PrefsContext'

const TOPIC_BOARD = '/robot/01/sys/board'

export type LastRunState = {
  title: string
  sessionLabel: string
  sessionId?: string
  status: 'running' | 'ok' | 'error'
  detail?: string
  exitCode?: number
}

type HostApi = {
  connection: HostConnection
  base: string
  tokenInput: string
  sessions: HostSession[]
  activeSessionId: string | null
  lastRun: LastRunState | null
  setBase: (base: string) => void
  setTokenInput: (token: string) => void
  setActiveSessionId: (id: string) => void
  connect: (opts?: { base?: string; token?: string }) => Promise<void>
  disconnect: () => void
  refresh: () => Promise<void>
  refreshSessions: () => Promise<void>
  ensureSession: (label: string) => Promise<HostSession | null>
  runScript: (
    script: string,
    opts?: { sessionLabel?: string; mode?: string; title?: string },
  ) => Promise<void>
  interruptActive: () => Promise<void>
  killActive: () => Promise<void>
}

const HostContext = createContext<HostApi | null>(null)

function applyEnvToPrefs(
  env: HostEnv,
  setOs: (os: HostEnv['os'], opts?: { scroll?: boolean }) => void,
  setWorkshopDir: (dir: string, opts?: { normalize?: boolean }) => void,
) {
  setOs(env.os, { scroll: false })
  setWorkshopDir(env.workshopRoot, { normalize: true })
}

export function HostProvider({ children }: { children: ReactNode }) {
  const { setOs, setWorkshopDir, reportDetectedBoard, clearDetectedBoard } = usePrefs()
  const stored = loadStoredHostAuth()
  const [base, setBaseState] = useState(stored.base || DEFAULT_HOST_BASE)
  const [tokenInput, setTokenInput] = useState(stored.token || '')
  const [connection, setConnection] = useState<HostConnection>({ status: 'idle' })
  const [sessions, setSessions] = useState<HostSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [lastRun, setLastRun] = useState<LastRunState | null>(null)

  const setBase = useCallback((next: string) => {
    setBaseState(next.trim() || DEFAULT_HOST_BASE)
  }, [])

  const refreshSessions = useCallback(async () => {
    if (connection.status !== 'connected') {
      setSessions([])
      return
    }
    try {
      const list = await listSessions(connection.base, connection.token)
      setSessions(list)
      setActiveSessionId((prev) => {
        if (prev && list.some((s) => s.id === prev)) return prev
        const labs = list.find((s) => s.label === 'labs')
        return labs?.id ?? list[0]?.id ?? null
      })
    } catch {
      /* keep previous */
    }
  }, [connection])

  const disconnect = useCallback(() => {
    // Keep base + token so Connect can reconnect without re-pasting.
    saveHostAuth(base, tokenInput.trim() || null)
    setSessions([])
    setActiveSessionId(null)
    setLastRun(null)
    clearDetectedBoard()
    setConnection({ status: 'disconnected' })
  }, [base, tokenInput, clearDetectedBoard])

  // Quiet BoardInfo subscription so Your board → Auto can detect without Live open.
  useEffect(() => {
    if (connection.status !== 'connected') return
    const ws = new WebSocket(robotosWsUrl(connection.base, connection.token))
    ws.onopen = () => {
      ws.send(JSON.stringify({ op: 'subscribe', topic: TOPIC_BOARD }))
    }
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(String(ev.data)) as {
          op?: string
          topic?: string
          summary?: { hwModel?: unknown; caps?: unknown; capsRaw?: unknown }
        }
        if (msg.op === 'msg' && msg.topic === TOPIC_BOARD && msg.summary) {
          reportDetectedBoard(msg.summary.hwModel, msg.summary.capsRaw ?? msg.summary.caps)
        }
      } catch {
        /* ignore */
      }
    }
    return () => {
      ws.close()
    }
  }, [connection, reportDetectedBoard])

  const finishConnect = useCallback(
    async (nextBase: string, nextToken: string) => {
      const env = await fetchHostEnv(nextBase, nextToken)
      saveHostAuth(nextBase, nextToken)
      setTokenInput(nextToken)
      applyEnvToPrefs(env, setOs, setWorkshopDir)
      setConnection({ status: 'connected', env, base: nextBase, token: nextToken })
      const list = await listSessions(nextBase, nextToken)
      setSessions(list)
      const labs = list.find((s) => s.label === 'labs')
      setActiveSessionId(labs?.id ?? list[0]?.id ?? null)
    },
    [setOs, setWorkshopDir],
  )

  const connect = useCallback(
    async (opts?: { base?: string; token?: string }) => {
      const nextBase = (opts?.base ?? base).replace(/\/$/, '') || DEFAULT_HOST_BASE
      const nextToken = (opts?.token ?? tokenInput).trim()
      setBaseState(nextBase)
      setConnection({ status: 'connecting' })

      const alive = await probeHostHealth(nextBase)
      if (!alive) {
        setConnection({
          status: 'disconnected',
          error: 'Host not reachable. Is workshop-host running?',
        })
        return
      }
      if (!nextToken) {
        setConnection({
          status: 'disconnected',
          error: 'Paste the bearer token from the host terminal.',
        })
        return
      }
      try {
        await finishConnect(nextBase, nextToken)
      } catch (err) {
        const msg =
          err instanceof Error && err.message === 'unauthorized'
            ? 'Token rejected. Copy the current token from the host log.'
            : 'Could not load /api/env from host.'
        setConnection({ status: 'disconnected', error: msg })
      }
    },
    [base, tokenInput, finishConnect],
  )

  const refresh = useCallback(async () => {
    if (connection.status !== 'connected') return
    try {
      const env = await fetchHostEnv(connection.base, connection.token)
      applyEnvToPrefs(env, setOs, setWorkshopDir)
      setConnection({ status: 'connected', env, base: connection.base, token: connection.token })
      await refreshSessions()
    } catch {
      setConnection({ status: 'disconnected', error: 'Lost connection to workshop-host.' })
    }
  }, [connection, setOs, setWorkshopDir, refreshSessions])

  const ensureSession = useCallback(
    async (label: string) => {
      if (connection.status !== 'connected') return null
      const existing = sessions.find((s) => s.label === label)
      if (existing) return existing
      const created = await createSession(connection.base, connection.token, label)
      await refreshSessions()
      return created
    },
    [connection, sessions, refreshSessions],
  )

  const runScript = useCallback(
    async (
      script: string,
      opts?: { sessionLabel?: string; mode?: string; title?: string },
    ) => {
      if (connection.status !== 'connected') throw new Error('not connected')
      const sessionLabel = opts?.sessionLabel ?? 'labs'
      let sessionId = activeSessionId
      const target = await ensureSession(sessionLabel)
      sessionId = target?.id ?? sessionId
      if (!sessionId) throw new Error('no session')

      if (target?.persistentBusy && opts?.mode !== 'persistent') {
        throw new Error(
          `session '${sessionLabel}' is running a persistent job — Stop/Kill it, or Run in another session`,
        )
      }

      const title = opts?.title?.trim() || sessionLabel
      const mode = opts?.mode
      setActiveSessionId(sessionId)
      setLastRun({ title, sessionLabel, sessionId, status: 'running' })
      try {
        await runInSession(
          connection.base,
          connection.token,
          sessionId,
          script,
          mode,
          title,
        )
        // Stay "running" until OSC 133 D arrives from the PTY (real exit code).
        // Oneshot fallback only — persistent jobs can outlive any short timer.
        if (mode !== 'persistent') {
          window.setTimeout(() => {
            setLastRun((prev) => {
              if (!prev || prev.sessionId !== sessionId || prev.status !== 'running') {
                return prev
              }
              return { ...prev, status: 'ok' }
            })
          }, 8_000)
        }
      } catch (err) {
        const detail = err instanceof Error ? err.message : 'run failed'
        setLastRun({ title, sessionLabel, sessionId, status: 'error', detail })
        throw err
      }
    },
    [connection, activeSessionId, ensureSession],
  )

  useEffect(() => {
    function onShellExit(ev: Event) {
      const detail = (ev as CustomEvent<{ sessionId: string; exitCode: number }>).detail
      if (!detail) return
      setLastRun((prev) => {
        if (!prev) return prev
        if (prev.sessionId && prev.sessionId !== detail.sessionId) return prev
        const ok = detail.exitCode === 0
        return {
          ...prev,
          status: ok ? 'ok' : 'error',
          exitCode: detail.exitCode,
          detail: ok ? undefined : `exit ${detail.exitCode}`,
        }
      })
    }
    window.addEventListener('workshop-shell-exit', onShellExit)
    return () => window.removeEventListener('workshop-shell-exit', onShellExit)
  }, [])

  const interruptActive = useCallback(async () => {
    if (connection.status !== 'connected' || !activeSessionId) return
    await signalSession(connection.base, connection.token, activeSessionId, 'int')
  }, [connection, activeSessionId])

  const killActive = useCallback(async () => {
    if (connection.status !== 'connected' || !activeSessionId) return
    const recreated = await signalSession(connection.base, connection.token, activeSessionId, 'kill')
    await refreshSessions()
    if (recreated) setActiveSessionId(recreated.id)
  }, [connection, activeSessionId, refreshSessions])

  useEffect(() => {
    const q = readHostQueryParams()
    const initialBase = q.base || stored.base || DEFAULT_HOST_BASE
    const initialToken = q.token || stored.token || ''
    if (q.base || q.token) clearHostQueryParams()
    setBaseState(initialBase)
    setTokenInput(initialToken)

    let cancelled = false
    ;(async () => {
      const alive = await probeHostHealth(initialBase)
      if (cancelled) return
      if (!alive) {
        setConnection({ status: 'disconnected' })
        return
      }
      if (!initialToken) {
        setConnection({
          status: 'disconnected',
          error: 'Host is up. Paste its bearer token to lock OS and path.',
        })
        return
      }
      try {
        await finishConnect(initialBase, initialToken)
      } catch {
        if (cancelled) return
        setConnection({
          status: 'disconnected',
          error: 'Host is up but the saved token is invalid. Paste a fresh one.',
        })
      }
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo<HostApi>(
    () => ({
      connection,
      base,
      tokenInput,
      sessions,
      activeSessionId,
      lastRun,
      setBase,
      setTokenInput,
      setActiveSessionId,
      connect,
      disconnect,
      refresh,
      refreshSessions,
      ensureSession,
      runScript,
      interruptActive,
      killActive,
    }),
    [
      connection,
      base,
      tokenInput,
      sessions,
      activeSessionId,
      lastRun,
      setBase,
      connect,
      disconnect,
      refresh,
      refreshSessions,
      ensureSession,
      runScript,
      interruptActive,
      killActive,
    ],
  )

  return <HostContext.Provider value={value}>{children}</HostContext.Provider>
}

export function useHost() {
  const ctx = useContext(HostContext)
  if (!ctx) throw new Error('useHost must be used within HostProvider')
  return ctx
}
