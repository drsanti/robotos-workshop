import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { MW04_TRACKS, mw04ByOs } from '../content/labs/mw-04'
import { usePrefs } from '../context/PrefsContext'

export function Mw04Page() {
  const { os, ui } = usePrefs()
  const track = mw04ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="MW-04" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>
      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="mw" labId="mw-04" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Middleware · MW-04" th="Middleware · MW-04" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Parameters (& lifecycle)" th="Parameters (& lifecycle)" />
          </h1>
          <p>
            <T
              en="Change live node config with `robotos param` while `tuning_node` runs."
              th="เปลี่ยนคอนฟิกละเอียดสดด้วย `robotos param` ขณะ `tuning_node` รัน"
            />
          </p>
          <Callout>
            <T
              en="Same param idea later on silicon — see HW-04. Optional lifecycle CLI in pack NOTES."
              th="แนวพารามิเตอร์เดียวกันบนซิลิคอนภายหลัง — ดู HW-04 · lifecycle CLI ตาม NOTES ในแพ็ก"
            />
          </Callout>
          <p className="mt-4 text-sm text-[var(--muted)]">
            <T en="Full sheet: `labs/mw/mw-04-parameters/README.md` · Hardware twin: " th="แผ่นเต็ม: `labs/mw/mw-04-parameters/README.md` · คู่ฮาร์ดแวร์: " />
            <Link to="/labs/hw-04" className="font-medium text-[var(--accent)]">
              HW-04
            </Link>
          </p>
        </section>
        {MW04_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}
        <LabPager track="mw" labId="mw-04" />
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
