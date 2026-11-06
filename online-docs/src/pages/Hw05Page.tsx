import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW05_TRACKS, hw05ByOs } from '../content/labs/hw-05'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES } from '../lib/boards'

export function Hw05Page() {
  const { os, board, ui } = usePrefs()
  const track = hw05ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const profile = BOARD_PROFILES[board]

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-05" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-05" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-05" th="Hardware · HW-05" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Discrete inputs (touch / keys)" th="อินพุตแบบเหตุการณ์ (สัมผัส / ปุ่ม)" />
          </h1>
          <p>
            <T
              en="Treat button/touch as **events on topics**, not host-side GPIO polling."
              th="มองปุ่ม/สัมผัสเป็น**อีเวนต์บนท็อปิก** ไม่ใช่โพล GPIO ฝั่งโฮสต์"
            />
          </p>

          <Callout>
            <T
              en={`Focus **${profile.label}** (${profile.notesEn}). Confirm BTN/touch via HW-01 caps, then press the device while watching.`}
              th={`โฟกัส **${profile.label}** (${profile.notesTh}) ยืนยัน BTN/touch จาก caps ใน HW-01 แล้วกดอุปกรณ์ขณะดู log`}
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-05-input-events/README.md` · Caps: "
              th="แผ่นเต็ม: `labs/hw/hw-05-input-events/README.md` · Caps: "
            />
            <Link to="/labs/hw-01" className="font-medium text-[var(--accent)]">
              HW-01
            </Link>
          </p>
        </section>

        {HW05_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-05" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
