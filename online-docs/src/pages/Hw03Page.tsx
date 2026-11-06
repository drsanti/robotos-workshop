import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW03_TRACKS, hw03ByOs } from '../content/labs/hw-03'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES, CAP_LED, boardHasCap } from '../lib/boards'

export function Hw03Page() {
  const { os, board, ui } = usePrefs()
  const track = hw03ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const hasLed = boardHasCap(board, CAP_LED)
  const profile = BOARD_PROFILES[board]

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-03" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-03" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-03" th="Hardware · HW-03" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Command actuators" th="สั่งแอคทูเอเตอร์" />
          </h1>
          <p>
            <T
              en="Publish LED fx and/or wave commands. Turn effectors **off** when finished."
              th="สั่ง LED fx และ/หรือ wave แล้ว**ปิด**เอฟเฟกต์เมื่อจบ"
            />
          </p>

          <Callout tone={hasLed ? 'info' : 'warn'}>
            <T
              en={
                hasLed
                  ? `Focus board **${profile.label}** (${profile.notesEn}). Use **Live → LED** alongside the script.`
                  : `Focus board **${profile.label}** (${profile.notesEn}). Skip LED; use wave/tone. Live hides LED controls for this board.`
              }
              th={
                hasLed
                  ? `โฟกัสบอร์ด **${profile.label}** (${profile.notesTh}) ใช้ **Live → LED** คู่กับสคริปต์`
                  : `โฟกัสบอร์ด **${profile.label}** (${profile.notesTh}) ข้าม LED ใช้ wave/tone — Live จะซ่อนปุ่ม LED`
              }
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-03-command-actuators/README.md` · Caps first: "
              th="แผ่นเต็ม: `labs/hw/hw-03-command-actuators/README.md` · ตรวจ caps ก่อน: "
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

        {HW03_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-03" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
