import { ArrowLeft, ArrowRight, CircuitBoard, FlaskConical, Warehouse } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { LAB_TRACKS, type TrackKey } from '../content/labs/catalog'
import { usePrefs } from '../context/PrefsContext'

const ICONS = {
  mw: FlaskConical,
  wh: Warehouse,
  hw: CircuitBoard,
} as const

function isTrackKey(s: string | undefined): s is TrackKey {
  return s === 'mw' || s === 'wh' || s === 'hw'
}

export function TrackPage() {
  const { track: raw } = useParams<{ track: string }>()
  const { ui, lang } = usePrefs()

  if (!isTrackKey(raw)) return <Navigate to="/" replace />

  const track = LAB_TRACKS.find((t) => t.key === raw)!
  const Icon = ICONS[track.key]
  const kicker =
    track.key === 'mw' ? ui.labsMwKicker : track.key === 'wh' ? ui.labsWhKicker : ui.labsHwKicker
  const body =
    track.key === 'mw' ? ui.labsMwBody : track.key === 'wh' ? ui.labsWhBody : ui.labsHwBody
  const online = track.labs.filter((l) => l.href).length
  const n = track.labs.length
  const countLabel = ui.hubTrackCount
    .replace('{n}', String(n))
    .replace('{online}', String(online))
  const allOnline = online === n

  return (
    <div>
      <TopBar brandQuiet={`${track.code} · ${kicker}`} />
      <main className="mx-auto max-w-[46rem] px-5 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] no-underline transition hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} /> {ui.hubBack}
        </Link>

        <div className="mt-6 flex items-start gap-3">
          <div className="mt-1 shrink-0 text-[var(--accent)]">
            <Icon size={28} />
          </div>
          <div className="min-w-0">
            <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
              {track.code} · {kicker}
              {allOnline ? (
                <span className="ml-2 font-semibold normal-case tracking-normal text-[var(--muted)]">
                  · {ui.hubTrackComplete}
                </span>
              ) : null}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{kicker}</h1>
            <p className="mt-2 text-[var(--muted)]">{body}</p>
            <p className="mt-2 font-mono text-xs text-[var(--muted)]">
              {track.folder}/ · {countLabel}
            </p>
          </div>
        </div>

        <ol className="mt-8 list-none space-y-1 border-t border-[var(--line)] pt-4 pl-0">
          {track.labs.map((lab) => {
            const title = lang === 'th' ? lab.titleTh : lab.titleEn
            const row = (
              <>
                <span className="w-16 shrink-0 font-mono text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {lab.id}
                </span>
                <span className="min-w-0 flex-1 text-sm text-[var(--ink)]">{title}</span>
                <span
                  className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide ${
                    lab.href ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
                  }`}
                >
                  {lab.href ? ui.hubOnline : ui.hubSheet}
                </span>
              </>
            )

            if (lab.href) {
              return (
                <li key={lab.id}>
                  <Link
                    to={lab.href}
                    className="group flex items-center gap-3 rounded-[10px] px-3 py-2.5 no-underline transition hover:bg-[var(--surface)]"
                  >
                    {row}
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                    />
                  </Link>
                </li>
              )
            }

            return (
              <li key={lab.id}>
                <div
                  className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 opacity-75"
                  title={`${lab.id} — repo README`}
                >
                  {row}
                </div>
              </li>
            )
          })}
        </ol>

        <p className="mt-8 text-sm text-[var(--muted)]">{ui.hubLabsHint}</p>
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
