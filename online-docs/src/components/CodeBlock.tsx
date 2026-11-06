import { Check, Copy, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useHost } from '../context/HostContext'
import { usePrefs } from '../context/PrefsContext'
import { tokenize } from '../lib/highlight'
import { substituteDir } from '../lib/path'

export type RunKind = 'oneshot' | 'persistent' | 'gui' | 'manual'

export function CodeBlock({
  fence = 'text',
  template,
  runKind = 'oneshot',
  sessionLabel = 'labs',
  runTitle,
}: {
  fence?: string
  template: string
  runKind?: RunKind
  /** Host session label: labs | bridge | … */
  sessionLabel?: string
  /** Short label shown in the terminal marker / last-run chip */
  runTitle?: string
}) {
  const { workshopDir, ui } = usePrefs()
  const { connection, runScript } = useHost()
  const [copied, setCopied] = useState(false)
  const [running, setRunning] = useState(false)
  const [runError, setRunError] = useState<string | null>(null)
  const text = useMemo(
    () => substituteDir(template, workshopDir, fence),
    [template, workshopDir, fence],
  )
  const tokens = useMemo(() => tokenize(text, fence), [text, fence])

  const runEligible =
    runKind !== 'manual' && runKind !== 'gui' && fence !== 'text'
  const canRun = runEligible && connection.status === 'connected'

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  async function onRun() {
    if (!canRun) return
    setRunning(true)
    setRunError(null)
    try {
      const title =
        runTitle?.trim() ||
        text
          .split('\n')
          .map((l) => l.trim())
          .find((l) => l && !l.startsWith('#'))
          ?.slice(0, 48) ||
        sessionLabel
      await runScript(text, { sessionLabel, mode: runKind, title })
    } catch (err) {
      setRunError(err instanceof Error ? err.message : 'run failed')
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="my-3 overflow-hidden rounded-[10px] border border-[var(--code-border)] bg-[var(--code-bg)]">
      <div className="flex items-center justify-between gap-2 border-b border-[var(--code-border)] bg-[var(--code-meta-bg)] px-3 py-1.5 text-xs text-[var(--code-meta-ink)]">
        <span>{fence}</span>
        <div className="flex items-center gap-1">
          {runEligible ? (
            <button
              type="button"
              disabled={!canRun || running}
              onClick={() => void onRun()}
              title={canRun ? `${ui.run} → ${sessionLabel}` : ui.runNeedsHost}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-[var(--copy-hover)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Play size={14} />
              {running ? ui.running : ui.run}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void onCopy()}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-[var(--copy-hover)]"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? ui.copied : ui.copy}
          </button>
        </div>
      </div>
      {runError ? (
        <p className="m-0 border-b border-[var(--code-border)] px-3 py-1 text-xs text-red-400">
          {runError}
        </p>
      ) : null}
      <pre className="m-0 overflow-x-auto p-3 text-[0.86rem] leading-relaxed text-[var(--code-ink)]">
        <code>
          {tokens.map((tok, i) =>
            tok.type === 'plain' ? (
              <span key={i}>{tok.text}</span>
            ) : (
              <span key={i} className={`tok-${tok.type}`}>
                {tok.text}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  )
}
