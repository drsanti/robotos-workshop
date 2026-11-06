import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { MW03_TRACKS, mw03ByOs } from '../content/labs/mw-03'
import { usePrefs } from '../context/PrefsContext'

export function Mw03Page() {
  const { os, ui } = usePrefs()
  const track = mw03ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="MW-03" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>
      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="mw" labId="mw-03" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Middleware · MW-03" th="Middleware · MW-03" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Actions" th="Actions" />
          </h1>
          <p>
            <T
              en="Run a long-running **action** (`/machine/01/cycle`) with feedback, then a result."
              th="รัน **action** ระยะยาว (`/machine/01/cycle`) พร้อม feedback แล้วค่อย result"
            />
          </p>
          <Callout>
            <T
              en="Unlike MW-02 services: multiple feedback lines before the final result."
              th="ต่างจาก service ใน MW-02: มี feedback หลายบรรทัดก่อน result สุดท้าย"
            />
          </Callout>
          <p className="mt-4 text-sm text-[var(--muted)]">
            <T en="Full sheet: `labs/mw/mw-03-actions/README.md` · Prior: " th="แผ่นเต็ม: `labs/mw/mw-03-actions/README.md` · ก่อนหน้า: " />
            <Link to="/labs/mw-02" className="font-medium text-[var(--accent)]">
              MW-02
            </Link>
          </p>
        </section>
        {MW03_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}
        <LabPager track="mw" labId="mw-03" />
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
