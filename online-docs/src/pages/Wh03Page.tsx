import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { WH03_TRACKS, wh03ByOs } from '../content/labs/wh-03'
import { usePrefs } from '../context/PrefsContext'

export function Wh03Page() {
  const { os, ui } = usePrefs()
  const track = wh03ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="WH-03" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="wh" labId="wh-03" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Warehouse · WH-03" th="Warehouse · WH-03" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Avoid front (bang-bang)" th="หลบด้านหน้า (bang-bang)" />
          </h1>
          <p>
            <T
              en="Closed loop: use front range to stop or turn before hitting a wall."
              th="ลูปปิด: ใช้ระยะด้านหน้าเพื่อหยุดหรือเลี้ยวก่อนชนกำแพง"
            />
          </p>

          <Callout>
            <T
              en="If front `<` threshold → spin (`angular.z` only); else creep forward. Keep publishing ≥2 Hz (starter: 20 Hz) so the 500 ms Twist timeout never starves."
              th="ถ้าหน้า `<` เกณฑ์ → หมุน (`angular.z` อย่างเดียว) ไม่เช่นนั้นคลานไปข้างหน้า · publish ≥2 Hz (starter: 20 Hz) เพื่อไม่ให้ timeout 500 ms ของ Twist ตัด"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Full sheet: `labs/wh/wh-03-avoid-front/README.md` · Sense first: "
              th="แผ่นเต็ม: `labs/wh/wh-03-avoid-front/README.md` · อ่านเซนเซอร์ก่อน: "
            />
            <Link to="/labs/wh-02" className="font-medium text-[var(--accent)]">
              WH-02
            </Link>
          </p>
        </section>

        {WH03_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="wh" labId="wh-03" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
