import { AlertTriangle, Info } from 'lucide-react'
import type { ReactNode } from 'react'

export function Callout({
  children,
  tone = 'info',
}: {
  children: ReactNode
  tone?: 'info' | 'warn'
}) {
  const Icon = tone === 'warn' ? AlertTriangle : Info
  return (
    <p
      className="my-3 flex gap-2 rounded-[10px] border border-[var(--line)] px-3 py-2.5"
      style={{ background: tone === 'warn' ? 'var(--callout-bg)' : 'var(--accent-soft)' }}
    >
      <Icon size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
      <span>{children}</span>
    </p>
  )
}
