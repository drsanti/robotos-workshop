import { useEffect, useRef } from 'react'
import { usePrefs } from '../context/PrefsContext'
import { animateProgress } from '../lib/motion'

export function ProgressBar({ stepIds }: { stepIds: string[] }) {
  const { os, progressForOs, ui, clearProgressForOs } = usePrefs()
  const fillRef = useRef<HTMLSpanElement>(null)
  const { done, total, pct } = progressForOs(os, stepIds)

  useEffect(() => {
    animateProgress(fillRef.current, pct)
  }, [pct])

  if (!total) return null

  return (
    <div className="mx-auto max-w-[46rem] px-5 pb-4">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-[var(--muted)]">{ui.progressLabel}</span>
        <div className="flex items-center gap-3">
          <span className="font-medium">
            {done} / {total}
          </span>
          {done > 0 ? (
            <button
              type="button"
              className="text-xs text-[var(--muted)] underline-offset-2 hover:underline"
              onClick={() => clearProgressForOs(os)}
            >
              {ui.clearProgress}
            </button>
          ) : null}
        </div>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--line)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
      >
        <span
          ref={fillRef}
          className={`block h-full rounded-full ${done === total ? 'bg-[var(--ok)]' : 'bg-[var(--accent)]'}`}
          style={{ width: 0 }}
        />
      </div>
    </div>
  )
}
