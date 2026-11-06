import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW01_TRACKS, hw01ByOs } from '../content/labs/hw-01'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES, CAP_IMU, CAP_LED, boardHasCap } from '../lib/boards'

export function Hw01Page() {
  const { os, board, ui } = usePrefs()
  const track = hw01ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const profile = BOARD_PROFILES[board]
  const hasLed = boardHasCap(board, CAP_LED)
  const hasImu = boardHasCap(board, CAP_IMU)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-01" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-01" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-01" th="Hardware · HW-01" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Capability probe" th="ตรวจความสามารถ (caps)" />
          </h1>
          <p>
            <T
              en="Read `BoardInfo.caps` and know which demos apply on **this** board."
              th="อ่าน `BoardInfo.caps` แล้วรู้ว่าเดโมไหนใช้ได้บนบอร์ด**นี้**"
            />
          </p>

          <Callout tone="info">
            <T
              en={
                hasLed
                  ? `Focus **${profile.label}** — expect LED/MIC yes, IMU usually no (\`caps≈0x33\`). Probe before commanding (HW-03).`
                  : hasImu
                    ? `Focus **${profile.label}** — expect IMU/RTC yes, LED/MIC no (\`caps≈0x3c\`). Skip LED labs; use IMU paths.`
                    : `Focus **${profile.label}** (${profile.notesEn}). Match printed \`hw_model\` to the plugged-in board.`
              }
              th={
                hasLed
                  ? `โฟกัส **${profile.label}** — คาด LED/MIC ใช่ IMU มักไม่ (\`caps≈0x33\`) ตรวจก่อนสั่ง (HW-03)`
                  : hasImu
                    ? `โฟกัส **${profile.label}** — คาด IMU/RTC ใช่ LED/MIC ไม่ (\`caps≈0x3c\`) ข้ามแล็บ LED`
                    : `โฟกัส **${profile.label}** (${profile.notesTh}) ให้ \`hw_model\` ตรงบอร์ดที่เสียบ`
              }
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-01-caps-probe/README.md` · Prior lab: "
              th="แผ่นเต็ม: `labs/hw/hw-01-caps-probe/README.md` · แล็บก่อนหน้า: "
            />
            <Link to="/labs/hw-00" className="font-medium text-[var(--accent)]">
              HW-00
            </Link>
          </p>
        </section>

        {HW01_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-01" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
