import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { HW07_TRACKS, hw07ByOs } from '../content/labs/hw-07'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_PROFILES, CAP_IMU, CAP_LED, boardHasCap } from '../lib/boards'

export function Hw07Page() {
  const { os, board, ui } = usePrefs()
  const track = hw07ByOs(os)
  const stepIds = track.steps.map((s) => s.id)
  const profile = BOARD_PROFILES[board]
  const hasImu = boardHasCap(board, CAP_IMU)
  const hasLed = boardHasCap(board, CAP_LED)

  const branchEn = hasImu && hasLed
    ? 'IMU + LED — tilt should drive LED solid / off.'
    : hasImu
      ? 'IMU only — expect console `TILT` / `LEVEL` (LED may no-op).'
      : hasLed
        ? 'LED path — map battery/param per starter / instructor.'
        : 'Confirm caps with HW-01 before commanding.'

  const branchTh = hasImu && hasLed
    ? 'IMU + LED — เอียงแล้ว LED solid / ดับ'
    : hasImu
      ? 'มีแค่ IMU — คาด `TILT` / `LEVEL` บน console (LED อาจไม่ติด)'
      : hasLed
        ? 'เส้นทาง LED — map แบต/พารามิเตอร์ตาม starter / อาจารย์'
        : 'ยืนยัน caps ด้วย HW-01 ก่อนสั่ง'

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="HW-07" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="hw" labId="hw-07" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Hardware · HW-07" th="Hardware · HW-07" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Sense → actuate" th="Sense → actuate" />
          </h1>
          <p>
            <T
              en="One host node: **read a sensor**, **command an actuator** (WH-03 pattern on hardware)."
              th="โหนดโฮสต์เดียว: **อ่านเซนเซอร์** แล้ว**สั่งแอคทูเอเตอร์** (แนว WH-03 บนฮาร์ดแวร์)"
            />
          </p>

          <Callout>
            <T
              en={`Focus **${profile.label}** (${profile.notesEn}). ${branchEn}`}
              th={`โฟกัส **${profile.label}** (${profile.notesTh}) ${branchTh}`}
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/hw/hw-07-sense-actuate/README.md` · Caps: "
              th="แผ่นเต็ม: `labs/hw/hw-07-sense-actuate/README.md` · Caps: "
            />
            <Link to="/labs/hw-01" className="font-medium text-[var(--accent)]">
              HW-01
            </Link>
            <T en=" · Actuators: " th=" · แอคทูเอเตอร์: " />
            <Link to="/labs/hw-03" className="font-medium text-[var(--accent)]">
              HW-03
            </Link>
          </p>
        </section>

        {HW07_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="hw" labId="hw-07" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
