import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW00_TRACKS, hw00ByOs } from '../content/labs/hw-00'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES } from '../lib/boards'

export function Hw00Page() {
  const { os, board, ui } = usePrefs()
  const track = hw00ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const profile = BOARD_PROFILES[board]

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-00" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-00" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-00" th="Hardware · HW-00" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Board on the graph" th="บอร์ดบนกราฟ" />
          </h1>
          <p>
            <T
              en="Bring the ESP32-S3 onto the robotos graph via `serial-bridge` and see `/robot/01/sys/board`."
              th="พา ESP32-S3 ขึ้นกราฟ robotos ผ่าน `serial-bridge` แล้วดู `/robot/01/sys/board`"
            />
          </p>

          <Callout>
            <T
              en={`Docs board **${profile.label}** (${profile.notesEn}). Bridge needs \`--cmd-topic all\`. Do MW-00 first if \`.venv\` is missing.`}
              th={`บอร์ดในเอกสาร **${profile.label}** (${profile.notesTh}) bridge ต้องมี \`--cmd-topic all\` ถ้ายังไม่มี \`.venv\` ให้ทำ MW-00 ก่อน`}
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-00-board-connect/README.md` · Next: "
              th="แผ่นเต็ม: `labs/hw/hw-00-board-connect/README.md` · ถัดไป: "
            />
            <Link to="/labs/hw-01" className="font-medium text-[var(--accent)]">
              HW-01
            </Link>
            <T en=" · Setup: " th=" · Setup: " />
            <Link to="/setup" className="font-medium text-[var(--accent)]">
              #/setup
            </Link>
          </p>
        </section>

        {HW00_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-00" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
