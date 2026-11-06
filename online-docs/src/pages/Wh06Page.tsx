import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH06_TRACKS, wh06ByOs } from '../content/labs/wh-06'
import { usePrefs } from '../context/PrefsContext'

export function Wh06Page() {
  const { os, ui } = usePrefs()
  const track = wh06ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-06" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-06" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-06" th="Warehouse · WH-06" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="State machine" th="เครื่องสถานะ (FSM)" />
          </h1>
          <p>
            <T
              en="Replace ad-hoc if/else with an explicit **FSM** and print state changes."
              th="แทน if/else แบบสุ่มด้วย **FSM** ที่ชัดเจน และพิมพ์ทุกการเปลี่ยนสถานะ"
            />
          </p>

          <Callout>
            <T
              en="Minimum: ≥3 named states with logged transitions (`CRUISE → AVOID`). Include a **RECOVER** path when stuck. Keep publishing Twist so the 500 ms timeout never starves."
              th="ขั้นต่ำ: ≥3 สถานะพร้อม log transition (`CRUISE → AVOID`) มีทาง **RECOVER** เมื่อค้าง · ส่ง Twist ต่อเนื่องเพื่อไม่ให้ timeout 500 ms ตัด"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-06-state-machine/README.md` · Wall follow: "
              th="แผ่นเต็ม: `labs/wh/wh-06-state-machine/README.md` · ตามกำแพง: "
            />
            <Link to="/labs/wh-05" className="font-medium text-[var(--accent)]">
              WH-05
            </Link>
          </p>
        </section>

        {WH06_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-06" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
