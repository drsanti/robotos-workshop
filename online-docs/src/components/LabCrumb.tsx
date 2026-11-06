import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { labNeighbors, type LabId, type TrackKey } from '../content/labs/catalog'
import { usePrefs } from '../context/PrefsContext'

const TRACK_LABEL: Record<TrackKey, { en: string; th: string }> = {
  mw: { en: 'Middleware', th: 'Middleware' },
  wh: { en: 'Warehouse', th: 'Warehouse' },
  hw: { en: 'Hardware', th: 'Hardware' },
}

function NeighborLink({
  lab,
  side,
  label,
}: {
  lab: NonNullable<ReturnType<typeof labNeighbors>['prev']>
  side: 'prev' | 'next'
  label: string
}) {
  const inner = (
    <>
      {side === 'prev' ? <ChevronLeft size={14} /> : null}
      <span className="font-mono text-[11px] uppercase tracking-wide">{lab.id}</span>
      <span className="hidden sm:inline">· {label}</span>
      {side === 'next' ? <ChevronRight size={14} /> : null}
    </>
  )

  if (lab.href) {
    return (
      <Link
        to={lab.href}
        className="inline-flex items-center gap-1 rounded-[6px] px-1.5 py-0.5 text-[var(--muted)] no-underline transition hover:bg-[var(--surface)] hover:text-[var(--accent)]"
      >
        {inner}
      </Link>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[var(--muted)] opacity-60"
      title="Repo README only"
    >
      {inner}
    </span>
  )
}

export function LabCrumb({ track, labId }: { track: TrackKey; labId: LabId }) {
  const { ui, lang } = usePrefs()
  const label = TRACK_LABEL[track][lang === 'th' ? 'th' : 'en']
  const { prev, next } = labNeighbors(track, labId)

  return (
    <div className="mb-5 space-y-2">
      <nav
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--muted)]"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[var(--muted)] no-underline transition hover:text-[var(--accent)]"
        >
          <ArrowLeft size={14} />
          {ui.hubBack}
        </Link>
        <span aria-hidden>/</span>
        <Link to={`/labs/${track}`} className="no-underline transition hover:text-[var(--accent)]">
          {track.toUpperCase()} · {label}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[var(--ink)]">
          {labId}
        </span>
      </nav>

      {(prev || next) && (
        <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <div className="min-w-0">
            {prev ? (
              <NeighborLink lab={prev} side="prev" label={ui.labPrev} />
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 opacity-40">
                <ChevronLeft size={14} />
                {ui.labPrev}
              </span>
            )}
          </div>
          <div className="min-w-0 text-right">
            {next ? (
              <NeighborLink lab={next} side="next" label={ui.labNext} />
            ) : (
              <span className="inline-flex items-center gap-1 px-1.5 opacity-40">
                {ui.labNext}
                <ChevronRight size={14} />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/** Optional footer twin for long pages — same neighbors. */
export function LabPager({ track, labId }: { track: TrackKey; labId: LabId }) {
  const { ui } = usePrefs()
  const { prev, next } = labNeighbors(track, labId)
  if (!prev && !next) return null

  return (
    <div className="mt-10 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4 text-sm">
      {prev?.href ? (
        <Link
          to={prev.href}
          className="inline-flex items-center gap-1 text-[var(--accent)] no-underline transition hover:gap-1.5"
        >
          <ArrowLeft size={14} />
          <span className="font-mono text-xs uppercase">{prev.id}</span>
        </Link>
      ) : (
        <span />
      )}
      {next?.href ? (
        <Link
          to={next.href}
          className="inline-flex items-center gap-1 text-[var(--accent)] no-underline transition hover:gap-1.5"
        >
          <span className="font-mono text-xs uppercase">{next.id}</span>
          <ArrowRight size={14} />
        </Link>
      ) : next ? (
        <span className="font-mono text-xs uppercase text-[var(--muted)] opacity-60" title={ui.hubSheet}>
          {next.id}
        </span>
      ) : (
        <span />
      )}
    </div>
  )
}
