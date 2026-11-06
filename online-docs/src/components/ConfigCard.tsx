import * as Collapsible from '@radix-ui/react-collapsible'
import {
  ChevronDown,
  CircuitBoard,
  FolderOpen,
  Loader2,
  Monitor,
  PlugZap,
  Radio,
  ScanSearch,
  Unplug,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useHost } from '../context/HostContext'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_KEYS, BOARD_PROFILES, type BoardChoice } from '../lib/boards'
import { fetchRobotosStatus, type RobotosPeerStatus } from '../lib/hostClient'
import { OS_LABEL } from '../lib/i18n'
import { normalizeWorkshopDir } from '../lib/path'
import type { OsKey } from '../lib/storage'
import { SegmentedControl } from './SegmentedControl'

function StatusChip({
  label,
  title,
  className,
  icon,
}: {
  label: string
  title?: string
  className?: string
  icon: ReactNode
}) {
  return (
    <span
      title={title ?? label}
      aria-label={title ?? label}
      className={`inline-flex shrink-0 items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--bg)] px-1.5 py-0.5 text-[0.65rem] font-medium ${className ?? ''}`}
    >
      {icon}
      <span className="max-w-[7.5rem] truncate sm:max-w-none">{label}</span>
    </span>
  )
}

const OS_OPTIONS: OsKey[] = ['win', 'mac', 'linux']
const BOARD_OPTIONS: BoardChoice[] = ['auto', ...BOARD_KEYS]

const inputClass =
  'w-full rounded-md border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1.5 font-mono text-xs text-[var(--ink)] outline-none focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60'

export function ConfigCard() {
  const {
    os,
    setOs,
    boardChoice,
    setBoardChoice,
    board,
    detectedBoard,
    workshopDir,
    workshopDirInput,
    setWorkshopDir,
    configOpen,
    setConfigOpen,
    ui,
  } = usePrefs()
  const {
    connection,
    base,
    tokenInput,
    setBase,
    setTokenInput,
    connect,
    disconnect,
  } = useHost()
  const autoCollapseArmed = useRef(!workshopDir)
  const hostLocked = connection.status === 'connected'
  const [peer, setPeer] = useState<RobotosPeerStatus | null>(null)

  useEffect(() => {
    if (workshopDir) autoCollapseArmed.current = false
  }, [workshopDir])

  useEffect(() => {
    if (connection.status === 'disconnected' && connection.error) {
      setConfigOpen(true)
    }
  }, [connection, setConfigOpen])

  useEffect(() => {
    if (connection.status !== 'connected') {
      setPeer(null)
      return
    }
    let cancelled = false
    const tick = async () => {
      try {
        const s = await fetchRobotosStatus(connection.base, connection.token)
        if (!cancelled) setPeer(s)
      } catch {
        if (!cancelled) setPeer(null)
      }
    }
    void tick()
    const id = window.setInterval(() => void tick(), 4000)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [connection])

  function maybeCollapse() {
    if (!autoCollapseArmed.current) return
    const dir = normalizeWorkshopDir(workshopDir)
    if (!dir || !configOpen) return
    autoCollapseArmed.current = false
    setConfigOpen(false)
  }

  const hostShort =
    connection.status === 'connected'
      ? ui.hostConnected
      : connection.status === 'connecting'
        ? ui.hostConnecting
        : ui.hostDisconnected
  const hostLabel =
    connection.status === 'connected'
      ? `${ui.hostConnected} · ${connection.env.os}`
      : hostShort

  const boardSummary =
    boardChoice === 'auto'
      ? detectedBoard
        ? `${ui.boardAuto} → ${BOARD_PROFILES[detectedBoard].label}`
        : ui.boardAuto
      : BOARD_PROFILES[board].label
  const boardChipLabel =
    boardChoice === 'auto' && !detectedBoard ? ui.boardAuto : BOARD_PROFILES[board].label
  const pathSummary = workshopDir || ui.pathNotSet
  const pathLeaf = workshopDir
    ? workshopDir.split(/[\\/]/).filter(Boolean).pop() || workshopDir
    : ui.pathNotSet
  const peerOk = Boolean(hostLocked && peer?.connected)
  const peerLabel =
    hostLocked && peer ? (peer.connected ? ui.hostPeerUp : ui.hostPeerDown) : null
  const hostChipClass =
    connection.status === 'connected'
      ? 'border-[var(--ok)]/30 text-[var(--ok)]'
      : connection.status === 'connecting'
        ? 'text-[var(--muted)]'
        : connection.status === 'disconnected' && connection.error
          ? 'border-[var(--warn)]/40 text-[var(--warn)]'
          : 'text-[var(--muted)]'
  const osKey = hostLocked ? connection.env.os : os
  const boardHint =
    boardChoice === 'auto'
      ? detectedBoard
        ? `${ui.boardDetected}: ${BOARD_PROFILES[detectedBoard].label}`
        : ui.boardAutoHint
      : `${BOARD_PROFILES[board].notesEn}`
  const boardMismatch =
    boardChoice !== 'auto' && detectedBoard != null && boardChoice !== detectedBoard

  return (
    <div className="mx-auto max-w-[46rem] px-5 pb-3 pt-3">
      <Collapsible.Root open={configOpen} onOpenChange={setConfigOpen}>
        <section className="overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
          <div className="flex items-center gap-1.5 px-3 py-2 sm:px-4">
            <Collapsible.Trigger
              className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-0.5 text-left hover:bg-[var(--bg-accent)]"
              aria-label={`${ui.configHeading}: ${hostLabel}${peerLabel ? `, ${peerLabel}` : ''}, ${boardSummary}. ${configOpen ? ui.configCollapse : ui.configExpand}`}
            >
              <span className="shrink-0 text-sm font-semibold">{ui.configHeading}</span>
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
                <StatusChip
                  label={hostShort}
                  title={hostLabel}
                  className={hostChipClass}
                  icon={
                    connection.status === 'connecting' ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : connection.status === 'connected' ? (
                      <PlugZap size={12} />
                    ) : (
                      <Unplug size={12} />
                    )
                  }
                />
                <StatusChip
                  label={OS_LABEL[osKey]}
                  className="text-[var(--ink)]"
                  icon={<Monitor size={12} />}
                />
                {peerLabel ? (
                  <StatusChip
                    label={peerLabel}
                    title={peer?.detail || peerLabel}
                    className={
                      peerOk ? 'border-[var(--ok)]/30 text-[var(--ok)]' : 'text-[var(--muted)]'
                    }
                    icon={<Radio size={12} />}
                  />
                ) : null}
                <StatusChip
                  label={boardChipLabel}
                  title={
                    boardMismatch && detectedBoard
                      ? `${boardSummary} ≠ live ${BOARD_PROFILES[detectedBoard].label}`
                      : boardSummary
                  }
                  className={
                    boardMismatch
                      ? 'font-mono border-[var(--warn)]/40 text-[var(--warn)]'
                      : 'font-mono text-[var(--ink)]'
                  }
                  icon={
                    boardChoice === 'auto' && !detectedBoard ? (
                      <ScanSearch size={12} />
                    ) : (
                      <CircuitBoard size={12} />
                    )
                  }
                />
                <StatusChip
                  label={pathLeaf}
                  title={pathSummary}
                  className="font-mono text-[var(--muted)]"
                  icon={<FolderOpen size={12} />}
                />
              </span>
            </Collapsible.Trigger>
            {hostLocked ? (
              <button
                type="button"
                onClick={disconnect}
                className="shrink-0 rounded-md border border-[var(--line)] px-2 py-1 text-[0.65rem] hover:border-[var(--line-strong)]"
              >
                {ui.hostDisconnect}
              </button>
            ) : null}
            <Collapsible.Trigger
              className="inline-flex shrink-0 items-center justify-center rounded-md p-1.5 text-[var(--muted)] hover:bg-[var(--bg-accent)] hover:text-[var(--ink)]"
              aria-label={configOpen ? ui.configCollapse : ui.configExpand}
              title={configOpen ? ui.configCollapse : ui.configExpand}
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${configOpen ? 'rotate-180' : ''}`}
              />
            </Collapsible.Trigger>
          </div>

          <Collapsible.Content>
            <div className="space-y-3 border-t border-[var(--line)] px-3 py-3 sm:px-4">
              {!hostLocked ? (
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
                  <label className="block min-w-0 text-[0.65rem] text-[var(--muted)]">
                    Host URL
                    <input
                      type="text"
                      spellCheck={false}
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      className={`${inputClass} mt-1`}
                    />
                  </label>
                  <label className="block min-w-0 text-[0.65rem] text-[var(--muted)]">
                    {ui.hostToken}
                    <input
                      type="text"
                      spellCheck={false}
                      autoComplete="off"
                      placeholder={ui.hostTokenPlaceholder}
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      className={`${inputClass} mt-1`}
                    />
                  </label>
                  <button
                    type="button"
                    disabled={connection.status === 'connecting'}
                    onClick={() => void connect()}
                    className="h-[2.125rem] self-end rounded-md border border-[var(--accent)] bg-[var(--accent-soft)] px-3 text-xs font-medium text-[var(--accent)]"
                  >
                    {ui.hostConnect}
                  </button>
                  {connection.error ? (
                    <p className="m-0 text-[0.65rem] text-[var(--warn)] sm:col-span-3">
                      {connection.error}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 text-[0.65rem] font-medium text-[var(--muted)]">
                    <Monitor size={12} />
                    {ui.osPicker}
                    {hostLocked ? (
                      <span className="font-normal opacity-80">· {ui.hostLockedHint}</span>
                    ) : null}
                  </div>
                  <div className={hostLocked ? 'pointer-events-none opacity-55' : ''}>
                    <SegmentedControl<OsKey>
                      aria-label={ui.osPicker}
                      size="sm"
                      value={os}
                      onChange={(key) => {
                        if (hostLocked) return
                        setOs(key, { scroll: false })
                      }}
                      options={OS_OPTIONS.map((key) => ({
                        value: key,
                        label: OS_LABEL[key],
                      }))}
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 text-[0.65rem] font-medium text-[var(--muted)]">
                    <CircuitBoard size={12} />
                    {ui.boardPicker}
                    {!boardMismatch ? (
                      <span className="truncate font-normal opacity-80">· {boardHint}</span>
                    ) : null}
                  </div>
                  <SegmentedControl<BoardChoice>
                    aria-label={ui.boardPicker}
                    size="sm"
                    value={boardChoice}
                    onChange={setBoardChoice}
                    options={BOARD_OPTIONS.map((key) => ({
                      value: key,
                      label: key === 'auto' ? ui.boardAuto : BOARD_PROFILES[key].label,
                      title:
                        key === 'auto' ? ui.boardAutoHint : BOARD_PROFILES[key].notesEn,
                    }))}
                  />
                </div>
              </div>

              {boardMismatch && detectedBoard ? (
                <div className="flex flex-wrap items-center gap-2 rounded-md border border-[var(--warn)]/30 bg-[var(--warn)]/8 px-2.5 py-1.5">
                  <p className="m-0 min-w-0 flex-1 text-[0.65rem] text-[var(--warn)]">
                    {ui.boardMismatch
                      .replace('{live}', BOARD_PROFILES[detectedBoard].label)
                      .replace('{docs}', BOARD_PROFILES[board].label)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setBoardChoice('auto')}
                    className="rounded border border-[var(--line)] px-2 py-0.5 text-[0.65rem] hover:border-[var(--accent)]"
                  >
                    {ui.boardUseAuto}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBoardChoice(detectedBoard)}
                    className="rounded border border-[var(--line)] px-2 py-0.5 text-[0.65rem] hover:border-[var(--accent)]"
                  >
                    {ui.boardUseLive}
                  </button>
                </div>
              ) : null}

              <label className="block min-w-0" htmlFor="workshop-dir">
                <div className="mb-1 flex items-center gap-1.5 text-[0.65rem] font-medium text-[var(--muted)]">
                  <FolderOpen size={12} />
                  {ui.workshopDir}
                </div>
                <input
                  id="workshop-dir"
                  type="text"
                  spellCheck={false}
                  autoComplete="off"
                  placeholder={ui.workshopDirPlaceholder}
                  value={workshopDirInput}
                  disabled={hostLocked}
                  onChange={(e) => setWorkshopDir(e.target.value, { normalize: false })}
                  onBlur={() => {
                    setWorkshopDir(workshopDirInput, { normalize: true })
                    maybeCollapse()
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setWorkshopDir(workshopDirInput, { normalize: true })
                      maybeCollapse()
                    }
                  }}
                  className={inputClass}
                />
              </label>
            </div>
          </Collapsible.Content>
        </section>
      </Collapsible.Root>
    </div>
  )
}
