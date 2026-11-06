import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { MW01_TRACKS, mw01ByOs } from '../content/labs/mw-01'
import { usePrefs } from '../context/PrefsContext'

export function Mw01Page() {
  const { os, ui } = usePrefs()
  const track = mw01ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="MW-01" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="mw" labId="mw-01" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Middleware · MW-01" th="Middleware · MW-01" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Publish & subscribe" th="Publish & subscribe" />
          </h1>
          <p>
            <T
              en="Run a publisher and a subscriber on `/machine/01/sensor/imu` (`robotos.sensor.v1.Imu`) without the warehouse sim."
              th="รัน publisher กับ subscriber บน `/machine/01/sensor/imu` (`robotos.sensor.v1.Imu`) โดยไม่ใช้ warehouse sim"
            />
          </p>

          <Callout>
            <T
              en="Two processes, one topic, same schema. Open **Live** Topics while A publishes. Does **not** need the warehouse sim."
              th="สองโปรเซส หนึ่งท็อปิก สคีมาเดียวกัน เปิด **Live** Topics ขณะ A publish · **ไม่**ต้องใช้ warehouse sim"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/mw/mw-01-pub-sub/README.md` · Prior: "
              th="แผ่นเต็ม: `labs/mw/mw-01-pub-sub/README.md` · ก่อนหน้า: "
            />
            <Link to="/labs/mw-00" className="font-medium text-[var(--accent)]">
              MW-00
            </Link>
          </p>
        </section>

        {MW01_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="mw" labId="mw-01" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
