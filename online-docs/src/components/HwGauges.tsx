import { Cpu, Gauge } from 'lucide-react'
import { CAP_BITS, num, parseCapsMask } from '../lib/hwCaps'
import { usePrefs } from '../context/PrefsContext'

export type GaugeSnapshot = {
  topic: string
  at: number
  summary: Record<string, unknown>
}

function AxisBar({
  label,
  value,
  max,
}: {
  label: string
  value: number
  max: number
}) {
  const half = Math.max(0, Math.min(50, (Math.abs(value) / max) * 50))
  const neg = value < 0
  return (
    <div className="grid grid-cols-[1.25rem_1fr_2.4rem] items-center gap-1">
      <span className="font-mono text-[0.6rem] text-[var(--muted)]">{label}</span>
      <div className="relative h-1 overflow-hidden rounded-full bg-[var(--bg)]">
        <div className="absolute left-1/2 top-0 z-[1] h-full w-px bg-[var(--line-strong)]" />
        <div
          className="absolute top-0 h-full rounded-full bg-[var(--accent)] transition-[width,left,right] duration-75"
          style={
            neg ? { right: '50%', width: `${half}%` } : { left: '50%', width: `${half}%` }
          }
        />
      </div>
      <span className="text-right font-mono text-[0.6rem] tabular-nums text-[var(--ink)]">
        {value.toFixed(1)}
      </span>
    </div>
  )
}

export function BoardGauge({ snap }: { snap: GaugeSnapshot | null }) {
  const { ui } = usePrefs()
  if (!snap) {
    return (
      <div className="rounded-md border border-dashed border-[var(--line)] px-2 py-1.5">
        <p className="m-0 flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--muted)]">
          <Cpu size={11} /> {ui.hostGaugeBoard}
        </p>
        <p className="mb-0 mt-0.5 text-[0.65rem] text-[var(--muted)]">{ui.hostGaugeBoardEmpty}</p>
      </div>
    )
  }
  const s = snap.summary
  const mask =
    typeof s.capsRaw === 'number' ? (s.capsRaw as number) : parseCapsMask(s.caps)
  const uptime = num(s.uptimeS)

  return (
    <div className="rounded-md border border-[var(--line)] bg-[var(--bg)]/40 px-2 py-1.5">
      <div className="flex items-center gap-1.5">
        <Cpu size={11} className="shrink-0 text-[var(--ok)]" />
        <span className="truncate font-mono text-[0.7rem] text-[var(--ink)]">
          {String(s.hwModel ?? '—')}
        </span>
        <span className="truncate text-[0.6rem] text-[var(--muted)]">{String(s.fw ?? '')}</span>
        <span className="ml-auto shrink-0 font-mono text-[0.6rem] tabular-nums text-[var(--muted)]">
          {uptime != null ? `${Math.floor(uptime)}s` : '—'}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap gap-0.5">
        {CAP_BITS.map(([bit, name]) => {
          const on = (mask & bit) !== 0
          return (
            <span
              key={name}
              className={`rounded px-1 py-px font-mono text-[0.55rem] ${
                on
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'text-[var(--muted)] opacity-40'
              }`}
            >
              {name}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export function ImuGauge({ snap }: { snap: GaugeSnapshot | null }) {
  const { ui } = usePrefs()
  if (!snap) {
    return (
      <div className="rounded-md border border-dashed border-[var(--line)] px-2 py-1.5">
        <p className="m-0 flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--muted)]">
          <Gauge size={11} /> {ui.hostGaugeImu}
        </p>
        <p className="mb-0 mt-0.5 text-[0.65rem] text-[var(--muted)]">{ui.hostGaugeImuEmpty}</p>
      </div>
    )
  }
  const ax = num(snap.summary.ax) ?? 0
  const ay = num(snap.summary.ay) ?? 0
  const az = num(snap.summary.az) ?? 0
  const max = Math.max(12, Math.abs(ax), Math.abs(ay), Math.abs(az), 2)

  return (
    <div className="rounded-md border border-[var(--line)] bg-[var(--bg)]/40 px-2 py-1.5">
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="m-0 flex items-center gap-1 text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--muted)]">
          <Gauge size={11} className="text-[var(--accent)]" /> {ui.hostGaugeImu}
        </p>
        <span className="font-mono text-[0.55rem] text-[var(--muted)]">m/s²</span>
      </div>
      <div className="space-y-0.5">
        <AxisBar label="ax" value={ax} max={max} />
        <AxisBar label="ay" value={ay} max={max} />
        <AxisBar label="az" value={az} max={max} />
      </div>
    </div>
  )
}

export function OdomScanStrip({
  odom,
  scan,
}: {
  odom: GaugeSnapshot | null
  scan: GaugeSnapshot | null
}) {
  const { ui } = usePrefs()
  if (!odom && !scan) return null
  const x = odom ? num(odom.summary.x) : null
  const y = odom ? num(odom.summary.y) : null
  const yaw = odom ? num(odom.summary.yawDeg) : null
  const r = scan ? num(scan.summary.right) : null
  const f = scan ? num(scan.summary.front) : null
  const l = scan ? num(scan.summary.left) : null

  return (
    <div className="rounded-md border border-[var(--line)] bg-[var(--bg)]/40 px-2 py-1.5">
      <p className="mb-1 mt-0 text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--muted)]">
        {ui.hostGaugeSense}
      </p>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[0.65rem] tabular-nums">
        {odom ? (
          <span className="text-[var(--ink)]">
            <span className="text-[var(--muted)]">xy </span>
            {x?.toFixed(2) ?? '—'},{y?.toFixed(2) ?? '—'}
            <span className="text-[var(--muted)]"> · </span>
            {yaw?.toFixed(0) ?? '—'}°
          </span>
        ) : null}
        {scan ? (
          <span className="text-[var(--ink)]">
            <span className="text-[var(--muted)]">RFL </span>
            {r?.toFixed(2) ?? '—'} {f?.toFixed(2) ?? '—'} {l?.toFixed(2) ?? '—'}
          </span>
        ) : null}
      </div>
    </div>
  )
}
