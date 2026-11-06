import type { OsKey } from './storage'
import { readStorage, writeStorage } from './storage'

export const HOST_STORAGE = {
  base: 'robotos-workshop-host-base',
  token: 'robotos-workshop-host-token',
} as const

export const DEFAULT_HOST_BASE = 'http://127.0.0.1:7420'

export type HostEnv = {
  os: OsKey
  arch: string
  workshopRoot: string
  shellDefault: string
  robotosStatus: string
  host: string
  baseUrl?: string
}

export type HostConnection =
  | { status: 'idle' }
  | { status: 'connecting' }
  | { status: 'disconnected'; error?: string }
  | { status: 'connected'; env: HostEnv; base: string; token: string }

function parseOs(raw: string): OsKey | null {
  if (raw === 'win' || raw === 'mac' || raw === 'linux') return raw
  return null
}

export function readHostQueryParams(): { base?: string; token?: string } {
  if (typeof location === 'undefined') return {}
  const q = new URLSearchParams(location.search)
  const token = q.get('hostToken') || undefined
  const base = q.get('hostBase') || undefined
  return { base, token }
}

export function clearHostQueryParams() {
  if (typeof location === 'undefined' || typeof history === 'undefined') return
  const url = new URL(location.href)
  if (!url.searchParams.has('hostToken') && !url.searchParams.has('hostBase')) return
  url.searchParams.delete('hostToken')
  url.searchParams.delete('hostBase')
  history.replaceState(null, '', `${url.pathname}${url.hash}${url.search}`)
}

export function loadStoredHostAuth(): { base: string; token: string | null } {
  return {
    base: readStorage(HOST_STORAGE.base) || DEFAULT_HOST_BASE,
    token: readStorage(HOST_STORAGE.token),
  }
}

export function saveHostAuth(base: string, token: string | null) {
  writeStorage(HOST_STORAGE.base, base)
  writeStorage(HOST_STORAGE.token, token)
}

export async function probeHostHealth(base: string, signal?: AbortSignal): Promise<boolean> {
  try {
    const res = await fetch(`${base.replace(/\/$/, '')}/api/health`, { signal })
    if (!res.ok) return false
    const body = (await res.json()) as { ok?: boolean; service?: string }
    return body.ok === true && body.service === 'workshop-host'
  } catch {
    return false
  }
}

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` }
}

export async function fetchHostEnv(
  base: string,
  token: string,
  signal?: AbortSignal,
): Promise<HostEnv> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/env`, {
    signal,
    headers: authHeaders(token),
  })
  if (res.status === 401) throw new Error('unauthorized')
  if (!res.ok) throw new Error(`env ${res.status}`)
  const raw = (await res.json()) as {
    os?: string
    arch?: string
    workshopRoot?: string
    shellDefault?: string
    robotosStatus?: string
    host?: string
    baseUrl?: string
  }
  const os = parseOs(raw.os || '')
  if (!os || !raw.workshopRoot) throw new Error('invalid env payload')
  return {
    os,
    arch: raw.arch || '',
    workshopRoot: raw.workshopRoot,
    shellDefault: raw.shellDefault || '',
    robotosStatus: raw.robotosStatus || 'unknown',
    host: raw.host || 'workshop-host',
    baseUrl: raw.baseUrl,
  }
}

export type HostSession = {
  id: string
  label: string
  status: string
  shell: string
  persistentBusy?: boolean
  cols?: number
  rows?: number
}

export async function listSessions(base: string, token: string): Promise<HostSession[]> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/sessions`, {
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error(`sessions ${res.status}`)
  return (await res.json()) as HostSession[]
}

export async function createSession(
  base: string,
  token: string,
  label?: string,
): Promise<HostSession> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/sessions`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ label }),
  })
  if (!res.ok) throw new Error(`create session ${res.status}`)
  return (await res.json()) as HostSession
}

export async function runInSession(
  base: string,
  token: string,
  sessionId: string,
  script: string,
  mode = 'oneshot',
  title?: string,
): Promise<void> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/sessions/${sessionId}/run`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ script, mode, title }),
  })
  if (res.status === 409) {
    const body = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error || 'session busy — Stop/Kill or use another session')
  }
  if (!res.ok) throw new Error(`run ${res.status}`)
}

export async function resizeSession(
  base: string,
  token: string,
  sessionId: string,
  cols: number,
  rows: number,
): Promise<void> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/sessions/${sessionId}/resize`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ cols, rows }),
  })
  if (!res.ok) throw new Error(`resize ${res.status}`)
}

export async function signalSession(
  base: string,
  token: string,
  sessionId: string,
  signal: 'int' | 'kill',
): Promise<HostSession | null> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/sessions/${sessionId}/signal`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ signal }),
  })
  if (!res.ok) throw new Error(`signal ${res.status}`)
  const body = (await res.json()) as { recreated?: HostSession | null }
  return body.recreated ?? null
}

export function sessionTtyUrl(base: string, token: string, sessionId: string): string {
  const root = base.replace(/\/$/, '').replace(/^http/, 'ws')
  return `${root}/api/sessions/${sessionId}/tty?token=${encodeURIComponent(token)}`
}

export type RobotosPeerStatus = {
  enabled: boolean
  connected: boolean
  mode: string
  connectEndpoint: string
  nodeName: string
  detail: string
  topicCount: number | null
}

export async function fetchRobotosStatus(
  base: string,
  token: string,
): Promise<RobotosPeerStatus> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/robotos/status`, {
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error(`robotos status ${res.status}`)
  return (await res.json()) as RobotosPeerStatus
}

export type RobotosTopicRow = {
  topic: string
  pubs: number
  subs: number
  schemaId: string
  allowedSub: boolean
  allowedPub: boolean
}

export async function fetchRobotosTopics(
  base: string,
  token: string,
): Promise<RobotosTopicRow[]> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/robotos/topics`, {
    headers: authHeaders(token),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error || `topics ${res.status}`)
  }
  const body = (await res.json()) as { topics?: RobotosTopicRow[] }
  return body.topics ?? []
}

export async function publishTwist(
  base: string,
  token: string,
  opts: { vx?: number; wz?: number; topic?: string },
): Promise<void> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/robotos/publish`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(opts),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error || `publish ${res.status}`)
  }
}

export function robotosWsUrl(base: string, token: string): string {
  const root = base.replace(/\/$/, '').replace(/^http/, 'ws')
  return `${root}/api/robotos/ws?token=${encodeURIComponent(token)}`
}

export type LedFxPayload = {
  effect: number
  r?: number
  g?: number
  b?: number
  n?: number
  onMs?: number
  offMs?: number
}

export async function publishLedFx(
  base: string,
  token: string,
  payload: LedFxPayload,
): Promise<void> {
  const res = await fetch(`${base.replace(/\/$/, '')}/api/robotos/led`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error || `led ${res.status}`)
  }
}
