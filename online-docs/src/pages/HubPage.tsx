import {
  ArrowRight,
  BookOpen,
  CircuitBoard,
  FlaskConical,
  LayoutTemplate,
  Warehouse,
} from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { LAB_TRACKS, type TrackKey } from '../content/labs/catalog'
import { usePrefs } from '../context/PrefsContext'
import { animateHubCards } from '../lib/motion'

function HubLink({
  to,
  kicker,
  title,
  body,
  icon,
  featured,
  openLabel,
  meta,
}: {
  to: string
  kicker: string
  title: string
  body: string
  icon: ReactNode
  featured?: boolean
  openLabel: string
  meta?: string
}) {
  return (
    <Link
      to={to}
      data-hub-card
      className={`group block rounded-[12px] border border-[var(--line)] bg-[var(--surface)] p-5 no-underline shadow-[var(--shadow)] transition hover:border-[var(--accent)] ${
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className={featured ? 'sm:flex sm:items-start sm:gap-5' : ''}>
        <div className="shrink-0 text-[var(--accent)]">{icon}</div>
        <div className="min-w-0 flex-1">
          <p
            className={`m-0 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] ${
              featured ? 'sm:mt-0' : 'mt-3'
            }`}
          >
            {kicker}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[var(--ink)]">{title}</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
          {meta ? <p className="mt-2 font-mono text-[11px] text-[var(--muted)]">{meta}</p> : null}
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]">
            {openLabel}{' '}
            <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function trackMeta(key: TrackKey, ui: ReturnType<typeof usePrefs>['ui']) {
  const track = LAB_TRACKS.find((t) => t.key === key)!
  const online = track.labs.filter((l) => l.href).length
  const n = track.labs.length
  const range = `${track.labs[0].id} … ${track.labs[n - 1].id}`
  const counts = ui.hubTrackCount.replace('{n}', String(n)).replace('{online}', String(online))
  const complete = online === n ? ` · ${ui.hubTrackComplete}` : ''
  return {
    track,
    range,
    countLabel: `${counts}${complete}`,
  }
}

export function HubPage() {
  const { ui } = usePrefs()
  const gridRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = [...(gridRef.current?.querySelectorAll<HTMLElement>('[data-hub-card]') ?? [])]
    animateHubCards(cards)
  }, [])

  const mw = trackMeta('mw', ui)
  const wh = trackMeta('wh', ui)
  const hw = trackMeta('hw', ui)

  return (
    <div>
      <TopBar brandQuiet={ui.brandHub} />
      <main className="mx-auto max-w-[46rem] px-5 py-12">
        <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
          {ui.hubKicker}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{ui.hubTitle}</h1>
        <p className="mt-3 max-w-xl text-[var(--muted)]">{ui.hubLede}</p>

        <section ref={gridRef} className="mt-10 space-y-8" aria-label="Guides">
          <div className="grid gap-4">
            <HubLink
              to="/setup"
              featured
              kicker={ui.setupKicker}
              title={ui.setupTitle}
              body={ui.setupBody}
              openLabel={ui.hubOpen}
              icon={<BookOpen size={28} />}
            />
          </div>

          <div>
            <h2 className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              {ui.hubLabsHeading}
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)]">{ui.hubLabsHint}</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-1">
              <HubLink
                to="/labs/mw"
                kicker={`MW · ${ui.labsMwKicker}`}
                title={ui.labsMwKicker}
                body={ui.labsMwBody}
                meta={`${mw.range} · ${mw.countLabel}`}
                openLabel={ui.hubOpenTrack}
                icon={<FlaskConical size={24} />}
              />
              <HubLink
                to="/labs/wh"
                kicker={`WH · ${ui.labsWhKicker}`}
                title={ui.labsWhKicker}
                body={ui.labsWhBody}
                meta={`${wh.range} · ${wh.countLabel}`}
                openLabel={ui.hubOpenTrack}
                icon={<Warehouse size={24} />}
              />
              <HubLink
                to="/labs/hw"
                kicker={`HW · ${ui.labsHwKicker}`}
                title={ui.labsHwKicker}
                body={ui.labsHwBody}
                meta={`${hw.range} · ${hw.countLabel}`}
                openLabel={ui.hubOpenTrack}
                icon={<CircuitBoard size={24} />}
              />
            </div>
          </div>

          <div>
            <h2 className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              {ui.hubAuthorsHeading}
            </h2>
            <p className="mt-1 text-xs text-[var(--muted)]">{ui.hubAuthorsHint}</p>
            <div className="mt-3">
              <Link
                to="/labs/template"
                data-hub-card
                className="group flex items-start gap-3 rounded-[10px] border border-dashed border-[var(--line)] px-4 py-3 no-underline transition hover:border-[var(--accent)]"
              >
                <LayoutTemplate size={18} className="mt-0.5 shrink-0 text-[var(--muted)]" />
                <div className="min-w-0 flex-1">
                  <p className="m-0 text-sm font-medium text-[var(--ink)]">{ui.labsTemplateTitle}</p>
                  <p className="mb-0 mt-0.5 text-xs text-[var(--muted)]">{ui.labsTemplateBody}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="mt-1 shrink-0 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
