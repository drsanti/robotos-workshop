import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH08_TRACKS, wh08ByOs } from '../content/labs/wh-08'
import { usePrefs } from '../context/PrefsContext'

export function Wh08Page() {
  const { os, ui } = usePrefs()
  const track = wh08ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-08" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-08" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-08" th="Warehouse · WH-08" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Capstone challenge" th="แคปสโตน" />
          </h1>
          <p>
            <T
              en="Apply WH skills on a timed warehouse task. Pairs allowed. **Contract topics only.**"
              th="ใช้ทักษะ WH ในงาน warehouse จับเวลา คู่ได้ · **ท็อปิกตามสัญญาเท่านั้น**"
            />
          </p>

          <Callout>
            <T
              en="Pick one track: **A** Patrol (90 s, return near start) · **B** Clear aisle · **C** Instructor goal. Rubric: task + survival + evidence + honest tune note."
              th="เลือกหนึ่งแทร็ก: **A** ลาดตระเวน (90 วินาที กลับใกล้จุดเริ่ม) · **B** เคลียร์ทางเดิน · **C** เป้าอาจารย์ · เกณฑ์: งาน + รอด + หลักฐาน + โน้ตจูนตามจริง"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T en="Full sheet: `labs/wh/wh-08-capstone/README.md` · " th="แผ่นเต็ม: `labs/wh/wh-08-capstone/README.md` · " />
            <Link to="/labs/wh-06" className="font-medium text-[var(--accent)]">
              WH-06
            </Link>
            <T en=" · " th=" · " />
            <Link to="/labs/wh-07" className="font-medium text-[var(--accent)]">
              WH-07
            </Link>
            <T en=" · " th=" · " />
            <Link to="/labs/wh-05" className="font-medium text-[var(--accent)]">
              WH-05
            </Link>
          </p>
        </section>

        {WH08_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-08" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
