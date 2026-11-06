import type { ReactNode } from 'react'

export type SegmentOption<T extends string> = {
  value: T
  label: ReactNode
  title?: string
  'aria-label'?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  'aria-label': ariaLabel,
  size = 'md',
}: {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  'aria-label'?: string
  size?: 'sm' | 'md'
}) {
  const pad = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)]"
    >
      {options.map((opt, i) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            title={opt.title}
            aria-label={opt['aria-label'] || opt.title}
            onClick={() => onChange(opt.value)}
            className={[
              'min-w-14 border-0 font-medium transition-colors',
              pad,
              i > 0 ? 'border-l border-[var(--line)]' : '',
              active
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'bg-transparent text-[var(--ink)] hover:bg-[var(--bg-accent)]',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
