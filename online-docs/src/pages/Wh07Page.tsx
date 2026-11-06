import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH07_TRACKS, wh07ByOs } from '../content/labs/wh-07'
import { usePrefs } from '../context/PrefsContext'

export function Wh07Page() {
  const { os, ui } = usePrefs()
  const track = wh07ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-07" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-07" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-07" th="Warehouse · WH-07" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Record / inspect" th="บันทึก / ตรวจ bag" />
          </h1>
          <p>
            <T
              en="Capture a short bag of warehouse telemetry while a behavior runs, then inspect it."
              th="บันทึก bag สั้นๆ ของเทเลเมทรี warehouse ขณะ behavior รัน แล้วตรวจด้วย `bag info`"
            />
          </p>

          <Callout>
            <T
              en="Record `/robot/01/odom` + `/robot/01/scan` for ~20–30 s while "
              th="บันทึก `/robot/01/odom` + `/robot/01/scan` ประมาณ 20–30 วินาทีขณะ "
            />
            <Link to="/labs/wh-03" className="font-medium text-[var(--accent)]">
              WH-03
            </Link>
            <T en=" or " th=" หรือ " />
            <Link to="/labs/wh-05" className="font-medium text-[var(--accent)]">
              WH-05
            </Link>
            <T
              en=" runs. Exact flags: `robotos --help` / `code/NOTES.txt`."
              th=" รันอยู่ · แฟล็กจริง: `robotos --help` / `code/NOTES.txt`"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-07-record-bag/README.md`"
              th="แผ่นเต็ม: `labs/wh/wh-07-record-bag/README.md`"
            />
          </p>
        </section>

        {WH07_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-07" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
