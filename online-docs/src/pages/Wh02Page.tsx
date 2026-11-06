import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH02_TRACKS, wh02ByOs } from '../content/labs/wh-02'
import { usePrefs } from '../context/PrefsContext'

export function Wh02Page() {
  const { os, ui } = usePrefs()
  const track = wh02ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-02" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-02" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-02" th="Warehouse · WH-02" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Sense odom + scan" th="อ่าน odom + scan" />
          </h1>
          <p>
            <T
              en="Subscribe to pose and the three rangers while the robot moves."
              th="สมัครรับท่าทางและเรนเจอร์สามทิศขณะหุ่นเคลื่อนที่"
            />
          </p>

          <Callout>
            <T
              en="Laser: `ranges[0]=right`, `[1]=front`, `[2]=left`. Drive toward a wall and watch **F** drop. Topics: `/robot/01/odom`, `/robot/01/scan`."
              th="เลเซอร์: `ranges[0]=ขวา`, `[1]=หน้า`, `[2]=ซ้าย` ขับเข้ากำแพงแล้วดู **F** ลด · ท็อปิก: `/robot/01/odom`, `/robot/01/scan`"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-02-sense-odom-scan/README.md` · Drive helper: "
              th="แผ่นเต็ม: `labs/wh/wh-02-sense-odom-scan/README.md` · ช่วยขับ: "
            />
            <Link to="/labs/wh-01" className="font-medium text-[var(--accent)]">
              WH-01
            </Link>
          </p>
        </section>

        {WH02_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-02" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
