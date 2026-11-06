import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { MW06_TRACKS, mw06ByOs } from '../content/labs/mw-06'
import { usePrefs } from '../context/PrefsContext'

export function Mw06Page() {
  const { os, ui } = usePrefs()
  const track = mw06ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="MW-06" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>
      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="mw" labId="mw-06" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Middleware · MW-06" th="Middleware · MW-06" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Mini digital twin" th="Mini digital twin" />
          </h1>
          <p>
            <T
              en="Run a plant (`machine.py`) and a twin (`twin.py`) on shared cmd/state topics."
              th="รัน plant (`machine.py`) กับ twin (`twin.py`) บนท็อปิก cmd/state ร่วมกัน"
            />
          </p>
          <Callout>
            <T
              en="Twin uses the **same** topic names as the plant. Bridge mentally to warehouse sim as a 3D twin."
              th="twin ใช้ชื่อท็อปิก**เดียว**กับ plant · เชื่อมโยงไป warehouse sim ในฐานะ twin 3D"
            />
          </Callout>
          <p className="mt-4 text-sm text-[var(--muted)]">
            <T en="Full sheet: `labs/mw/mw-06-mini-twin/README.md` · Pub/sub: " th="แผ่นเต็ม: `labs/mw/mw-06-mini-twin/README.md` · Pub/sub: " />
            <Link to="/labs/mw-01" className="font-medium text-[var(--accent)]">
              MW-01
            </Link>
            <T en=" · Warehouse: " th=" · Warehouse: " />
            <Link to="/labs/wh-00" className="font-medium text-[var(--accent)]">
              WH-00
            </Link>
          </p>
        </section>
        {MW06_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}
        <LabPager track="mw" labId="mw-06" />
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
