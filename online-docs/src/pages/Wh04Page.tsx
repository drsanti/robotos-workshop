import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH04_TRACKS, wh04ByOs } from '../content/labs/wh-04'
import { usePrefs } from '../context/PrefsContext'

export function Wh04Page() {
  const { os, ui } = usePrefs()
  const track = wh04ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-04" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-04" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-04" th="Warehouse · WH-04" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Square path (open loop)" th="สี่เหลี่ยม (open loop)" />
          </h1>
          <p>
            <T
              en="Drive an approximate square using timed `linear.x` / `angular.z` segments; compare to odom."
              th="ขับสี่เหลี่ยมโดยประมาณด้วยช่วงเวลา `linear.x` / `angular.z` แล้วเทียบกับ odom"
            />
          </p>

          <Callout>
            <T
              en="Open loop drifts — grading is “attempted square + honest odom delta,” not millimeter closure. Contrast with WH-03 feedback near obstacles."
              th="open loop ลื่น — ให้คะแนนที่ “พยายามสี่เหลี่ยม + Δ odom ตามจริง” ไม่ใช่ปิดวงระดับมม. เทียบกับ feedback ใน WH-03 ใกล้สิ่งกีดขวาง"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-04-square-path/README.md` · Feedback contrast: "
              th="แผ่นเต็ม: `labs/wh/wh-04-square-path/README.md` · เทียบ feedback: "
            />
            <Link to="/labs/wh-03" className="font-medium text-[var(--accent)]">
              WH-03
            </Link>
          </p>
        </section>

        {WH04_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-04" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
