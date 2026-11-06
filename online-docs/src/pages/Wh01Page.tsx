import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH01_TRACKS, wh01ByOs } from '../content/labs/wh-01'
import { usePrefs } from '../context/PrefsContext'

export function Wh01Page() {
  const { os, ui } = usePrefs()
  const track = wh01ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-01" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-01" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-01" th="Warehouse · WH-01" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Drive by Twist" th="ขับด้วย Twist" />
          </h1>
          <p>
            <T
              en="Move the warehouse robot by publishing `/robot/01/cmd_vel` (`robotos.geometry.v1.Twist`)."
              th="ขยับหุ่น warehouse ด้วยการ publish `/robot/01/cmd_vel` (`robotos.geometry.v1.Twist`)"
            />
          </p>

          <Callout>
            <T
              en="Publish continuously (~20 Hz) then send a final **zero** Twist. Sim must be **External** (not Manual). Hold **WASD** in Live only for teleop demos — this lab uses the script."
              th="publish ต่อเนื่อง (~20 Hz) แล้วส่ง Twist **ศูนย์** ท้ายสุด · sim ต้องเป็น **External** (ไม่ใช่ Manual) · WASD ใน Live สำหรับ teleop — แล็บนี้ใช้สคริปต์"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-01-drive-twist/README.md` · Prior: "
              th="แผ่นเต็ม: `labs/wh/wh-01-drive-twist/README.md` · ก่อนหน้า: "
            />
            <Link to="/labs/wh-00" className="font-medium text-[var(--accent)]">
              WH-00
            </Link>
          </p>
        </section>

        {WH01_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-01" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
