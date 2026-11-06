import { Link } from 'react-router-dom'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { LabCrumb, LabPager } from '../components/LabCrumb'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { MW00_TRACKS, mw00ByOs } from '../content/labs/mw-00'
import { usePrefs } from '../context/PrefsContext'

export function Mw00Page() {
  const { os, ui } = usePrefs()
  const track = mw00ByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet="MW-00" />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <LabCrumb track="mw" labId="mw-00" />
        <section className="mb-8">
          <p className="m-0 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            <T en="Middleware · MW-00" th="Middleware · MW-00" />
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            <T en="Getting started" th="เริ่มต้นใช้งาน" />
          </h1>
          <p>
            <T
              en="Prove the CLI works on your machine before writing any Python."
              th="พิสูจน์ว่า CLI ใช้ได้บนเครื่องคุณ ก่อนเขียน Python"
            />
          </p>

          <Callout>
            <T
              en="`robotos` lives in `code/…/bin`. It is not installed on the computer. Each new terminal needs the PATH / `$env:PATH` line again — including Cursor. This lab does **not** need the warehouse sim."
              th="`robotos` อยู่ใน `code/…/bin` ไม่ได้ติดตั้งทั้งระบบ เทอร์มินัลใหม่ทุกรอบต้องวางบรรทัด PATH / `$env:PATH` อีกครั้ง รวมถึง Cursor แล็บนี้**ไม่**ต้องใช้ warehouse sim"
            />
          </Callout>

          <p className="mt-4 text-sm text-[var(--muted)]">
            <T
              en="Theory: ebook `docs/ebook/chapters/ch01-graph-nodes-topics.md` · notes `docs/theory/01-graph-topics.md`. Machine setup: "
              th="ทฤษฎี: ebook `docs/ebook/chapters/ch01-graph-nodes-topics.md` · โน้ตสั้น `docs/theory/01-graph-topics.md` · Machine setup: "
            />
            <Link to="/setup" className="font-medium text-[var(--accent)]">
              <T en="#/setup" th="#/setup" />
            </Link>
          </p>
        </section>

        {MW00_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}

        <LabPager track="mw" labId="mw-00" />
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
