import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW02_TRACKS, hw02ByOs } from '../content/labs/hw-02'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES, CAP_IMU, boardHasCap } from '../lib/boards'

export function Hw02Page() {
  const { os, board, ui } = usePrefs()
  const track = hw02ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const profile = BOARD_PROFILES[board]
  const hasImu = boardHasCap(board, CAP_IMU)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-02" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-02" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-02" th="Hardware · HW-02" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Read sensors" th="อ่านเซนเซอร์" />
          </h1>
          <p>
            <T
              en="Subscribe to live telemetry the MCU publishes (IMU and/or board status)."
              th="สมัครรับเทเลเมทรีสดจาก MCU (IMU และ/หรือสถานะบอร์ด)"
            />
          </p>

          <Callout tone={hasImu ? 'info' : 'warn'}>
            <T
              en={
                hasImu
                  ? `Focus **${profile.label}** — run IMU watch and tilt the board. Also try board_watch.`
                  : `Focus **${profile.label}** — no IMU cap. Skip IMU; use **board_watch** (battery / sys/board).`
              }
              th={
                hasImu
                  ? `โฟกัส **${profile.label}** — รัน IMU watch แล้วเอียงบอร์ด ลอง board_watch ด้วย`
                  : `โฟกัส **${profile.label}** — ไม่มี IMU ข้าม IMU ใช้ **board_watch** (แบต / sys/board)`
              }
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-02-read-sensors/README.md` · Caps: "
              th="แผ่นเต็ม: `labs/hw/hw-02-read-sensors/README.md` · Caps: "
            />
            <Link to="/labs/hw-01" className="font-medium text-[var(--accent)]">
              HW-01
            </Link>
          </p>
        </section>

        {HW02_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-02" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
