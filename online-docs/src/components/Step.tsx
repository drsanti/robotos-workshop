import { CheckCircle2 } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { usePrefs } from '../context/PrefsContext'
import { formatDoneAt } from '../lib/i18n'
import { animateStepEnter } from '../lib/motion'
import { MarkdownProse } from './MarkdownProse'

export function Step({
  id,
  num,
  titleEn,
  titleTh,
  children,
}: {
  id: string
  num: number
  titleEn: ReactNode
  titleTh: ReactNode
  children: ReactNode
}) {
  const { checks, setCheck, lang, ui } = usePrefs()
  const entry = checks[id]
  const done = Boolean(entry?.at)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    animateStepEnter(ref.current)
  }, [])

  return (
    <article
      ref={ref}
      id={id}
      className={`relative my-4 overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] ${
        done ? 'bg-[var(--done-bg)]' : ''
      }`}
    >
      {done ? (
        <span className="absolute left-0 top-0 h-9 w-1 rounded-br bg-[var(--ok)]" aria-hidden />
      ) : null}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-1">
        <label className="flex min-w-0 cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="size-4 shrink-0 accent-[var(--accent)]"
            checked={done}
            onChange={(e) => setCheck(id, e.target.checked)}
          />
          <span className="flex min-w-0 items-center gap-2">
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
              {done ? <CheckCircle2 size={16} className="text-[var(--ok)]" /> : num}
            </span>
            <h3 className="m-0 flex items-center text-base font-semibold">
              {typeof (lang === 'th' ? titleTh : titleEn) === 'string' ? (
                <MarkdownProse inline>{String(lang === 'th' ? titleTh : titleEn)}</MarkdownProse>
              ) : (
                (lang === 'th' ? titleTh : titleEn)
              )}
            </h3>
          </span>
        </label>
        {done && entry ? (
          <time className="shrink-0 text-xs text-[var(--muted)]" dateTime={entry.at}>
            {ui.doneAt} · {formatDoneAt(entry.at, lang)}
          </time>
        ) : null}
      </div>
      <div className="px-4 py-3">{children}</div>
    </article>
  )
}
