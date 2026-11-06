import type { ReactNode } from 'react'
import { MarkdownProse } from '../components/MarkdownProse'

/**
 * @deprecated Prefer MarkdownProse for string content.
 * Kept so non-string ReactNode titles still pass through unchanged.
 */
export function richText(input: ReactNode): ReactNode {
  if (typeof input === 'string') {
    return <MarkdownProse inline>{input}</MarkdownProse>
  }
  return input
}
