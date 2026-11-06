import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH05_TRACKS, wh05ByOs } from '../content/labs/wh-05'
import { usePrefs } from '../context/PrefsContext'

export function Wh05Page() {
  const { os, ui } = usePrefs()
  const track = wh05ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-05" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-05" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-05" th="Warehouse · WH-05" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Wall follow" th="ตามกำแพง" />
          </h1>
          <p>
            <T
              en="Follow a wall using the three rangers (default: **right** wall)."
              th="ตามกำแพงด้วยเรนเจอร์สามทิศ (ค่าเริ่มต้น: กำแพง**ขวา**)"
            />
          </p>

          <Callout>
            <T
              en="Hold side range near a target (`--target`); if front is blocked, turn away (WH-03 idea). Keep `cmd_vel` flowing (~20 Hz). Status `follow` = locked; `seek-no-wall` = wrong side / open floor."
              th="รักษาระยะข้างใกล้เป้า (`--target`) ถ้าหน้าถูกบล็อกให้หันหนี (แนว WH-03) · ส่ง `cmd_vel` ต่อเนื่อง (~20 Hz) · `follow` = ล็อกแล้ว · `seek-no-wall` = ด้านผิด / พื้นโล่ง"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-05-wall-follow/README.md` · Avoid first: "
              th="แผ่นเต็ม: `labs/wh/wh-05-wall-follow/README.md` · หลบก่อน: "
            />
            <Link to="/labs/wh-03" className="font-medium text-[var(--accent)]">
              WH-03
            </Link>
          </p>
        </section>

        {WH05_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-05" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
