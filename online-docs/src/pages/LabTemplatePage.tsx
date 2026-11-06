import { ConfigCard } from '../components/ConfigCard'
import { ProgressBar } from '../components/ProgressBar'
import { TopBar } from '../components/TopBar'
import { usePrefs } from '../context/PrefsContext'
import LabMdx from '../content/labs/template.mdx'

const STEP_IDS = ['lab-template-step-1', 'lab-template-step-2', 'lab-template-step-3']

export function LabTemplatePage() {
  const { ui } = usePrefs()

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet={ui.labsTitle} />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={STEP_IDS} />
        </div>
      </header>
      <main id="guide" className="prose-guide mx-auto max-w-[46rem] px-5 py-8">
        <LabMdx />
      </main>
      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
