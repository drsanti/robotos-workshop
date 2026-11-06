import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW06_TRACKS, hw06ByOs } from '../content/labs/hw-06'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES, CAP_IMU, boardHasCap } from '../lib/boards'

export function Hw06Page() {
  const { os, board, ui } = usePrefs()
  const track = hw06ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const profile = BOARD_PROFILES[board]
  const hasImu = boardHasCap(board, CAP_IMU)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-06" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-06" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-06" th="Hardware · HW-06" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Record board topics" th="บันทึกท็อปิกบอร์ด" />
          </h1>
          <p>
            <T
              en="Record live board topics to a `.rbag` and inspect with `bag info`."
              th="บันทึกท็อปิกบอร์ดสดลง `.rbag` แล้วตรวจด้วย `bag info`"
            />
          </p>

          <Callout tone={hasImu ? 'info' : 'warn'}>
            <T
              en={
                hasImu
                  ? `Focus **${profile.label}** — record IMU + sys/board (~20 s).`
                  : `Focus **${profile.label}** — no IMU; record sys/board + battery instead.`
              }
              th={
                hasImu
                  ? `โฟกัส **${profile.label}** — บันทึก IMU + sys/board (~20 วินาที)`
                  : `โฟกัส **${profile.label}** — ไม่มี IMU บันทึก sys/board + แบตแทน`
              }
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-06-record-board/README.md` · Sim bags: "
              th="แผ่นเต็ม: `labs/hw/hw-06-record-board/README.md` · bag ซิม: "
            />
            <Link to="/labs/wh-07" className="font-medium text-[var(--accent)]">
              WH-07
            </Link>
            <T en=" · Sensors: " th=" · เซนเซอร์: " />
            <Link to="/labs/hw-02" className="font-medium text-[var(--accent)]">
              HW-02
            </Link>
          </p>
        </section>

        {HW06_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-06" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
