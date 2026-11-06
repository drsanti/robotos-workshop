import type { ReactNode } from 'react'
import { usePrefs } from '../context/PrefsContext'
import { MarkdownProse } from './MarkdownProse'

export function T({
  en,
  th,
  inline = true,
}: {
  en: ReactNode
  th: ReactNode
  /** Parse string sides as markdown (default true). */
  inline?: boolean
}) {
  const { lang } = usePrefs()
  const value = lang === 'th' ? th : en
  if (typeof value === 'string') {
    return <MarkdownProse inline={inline}>{value}</MarkdownProse>
  }
  return <>{value}</>
}
