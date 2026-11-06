import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH00_TRACKS, wh00ByOs } from '../content/labs/wh-00'
import { usePrefs } from '../context/PrefsContext'

export function Wh00Page() {
  const { os, ui } = usePrefs()
  const track = wh00ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-00" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-00" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-00" th="Warehouse · WH-00" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Hello graph" th="Hello graph" />
          </h1>
          <p>
            <T
              en="Confirm pack tools see the same graph as **robotos-sim**."
              th="ยืนยันว่าเครื่องมือในแพ็กเห็นกราฟเดียวกับ **robotos-sim**"
            />
          </p>

          <Callout>
            <T
              en="Do MW-00 first if `.venv` / CLI PATH is not proven. Close **serial-bridge** while the sim owns the graph. Contract: `docs/p0-contract.md`."
              th="ทำ MW-00 ก่อนถ้ายังไม่ได้พิสูจน์ `.venv` / PATH · ปิด **serial-bridge** ขณะที่ sim ครองกราฟ · สัญญา: `docs/p0-contract.md`"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-00-hello-graph/README.md` · Setup: "
              th="แผ่นเต็ม: `labs/wh/wh-00-hello-graph/README.md` · Setup: "
            />
            <Link to="/setup" className="font-medium text-[var(--accent)]">
              #/setup
            </Link>
          </p>
        </section>

        {WH00_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-00" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
