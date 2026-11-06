import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { MW05_TRACKS, mw05ByOs } from '../content/labs/mw-05'
import { usePrefs } from '../context/PrefsContext'

export function Mw05Page() {
  const { os, ui } = usePrefs()
  const track = mw05ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="MW-05" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>
      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="mw" labId="mw-05" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Middleware · MW-05" th="Middleware · MW-05" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Record & replay" th="Record & replay" />
          </h1>
          <p>
            <T
              en="Record `/machine/01/sensor/imu` from MW-01’s publisher, inspect, optionally replay."
              th="บันทึก `/machine/01/sensor/imu` จาก publisher ของ MW-01 แล้วตรวจ / เล่นซ้ำได้"
            />
          </p>
          <Callout>
            <T
              en="Same bag workflow as WH-07 / HW-06, on the laptop graph."
              th="เวิร์กโฟลว์ bag เดียวกับ WH-07 / HW-06 แต่บนกราฟแล็ปท็อป"
            />
          </Callout>
          <p className="mt-4 text-sm text-[var(--muted)]">
            <T en="Full sheet: `labs/mw/mw-05-record-replay/README.md` · Publisher: " th="แผ่นเต็ม: `labs/mw/mw-05-record-replay/README.md` · Publisher: " />
            <Link to="/labs/mw-01" className="font-medium text-[var(--accent)]">
              MW-01
            </Link>
          </p>
        </section>
        {MW05_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}
        <LabPager track="mw" labId="mw-05" />
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
