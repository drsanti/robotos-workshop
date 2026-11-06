import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW04_TRACKS, hw04ByOs } from '../content/labs/hw-04'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES } from '../lib/boards'

export function Hw04Page() {
  const { os, board, ui } = usePrefs()
  const track = hw04ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const profile = BOARD_PROFILES[board]

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-04" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-04" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-04" th="Hardware · HW-04" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Board parameters" th="พารามิเตอร์บอร์ด" />
          </h1>
          <p>
            <T
              en="List / get / set board parameters (optional persist to NVM)."
              th="list / get / set พารามิเตอร์บอร์ด (persist ลง NVM ได้ตามต้องการ)"
            />
          </p>

          <Callout>
            <T
              en={`Focus **${profile.label}** (${profile.notesEn}). Same param idea as MW-04, on silicon. Names differ by SKU — always \`list\` first.`}
              th={`โฟกัส **${profile.label}** (${profile.notesTh}) แนวเดียวกับ MW-04 แต่บนซิลิคอน ชื่อต่างกันตามรุ่น — \`list\` ก่อนเสมอ`}
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-04-board-params/README.md` · Bridge: "
              th="แผ่นเต็ม: `labs/hw/hw-04-board-params/README.md` · Bridge: "
            />
            <Link to="/labs/hw-00" className="font-medium text-[var(--accent)]">
              HW-00
            </Link>
          </p>
        </section>

        {HW04_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-04" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
