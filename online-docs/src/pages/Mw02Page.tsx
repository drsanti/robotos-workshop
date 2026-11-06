import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { MW02_TRACKS, mw02ByOs } from '../content/labs/mw-02'
import { usePrefs } from '../context/PrefsContext'

export function Mw02Page() {
  const { os, ui } = usePrefs()
  const track = mw02ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="MW-02" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>
      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="mw" labId="mw-02" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Middleware · MW-02" th="Middleware · MW-02" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Services" th="Services" />
          </h1>
          <p>
            <T
              en="Call a request/reply **service** (`/test/echo`) while a server is running."
              th="เรียก **service** แบบ request/reply (`/test/echo`) ขณะเซิร์ฟเวอร์รัน"
            />
          </p>
          <Callout>
            <T
              en="Contrast with topic streams (MW-01). Client may retry while the server starts — expected."
              th="เทียบกับสตรีมท็อปิก (MW-01) client อาจรีทรายขณะเซิร์ฟเวอร์ขึ้น — ปกติ"
            />
          </Callout>
          <p className="mt-4 text-sm text-[var(--muted)]">
            <T en="Full sheet: `labs/mw/mw-02-services/README.md` · Prior: " th="แผ่นเต็ม: `labs/mw/mw-02-services/README.md` · ก่อนหน้า: " />
            <Link to="/labs/mw-01" className="font-medium text-[var(--accent)]">
              MW-01
            </Link>
          </p>
        </section>
        {MW02_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}
        <LabPager track="mw" labId="mw-02" />
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
