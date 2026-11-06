import type { ReactNode } from 'react'
import type { BoardKey } from '../../lib/boards'

export type Bi = { en: ReactNode; th: ReactNode }

export type SetupBlock =
  | { type: 'p'; text: Bi; boards?: BoardKey[] }
  | { type: 'callout'; text: Bi; tone?: 'info' | 'warn'; boards?: BoardKey[] }
  | {
      type: 'code'
      fence: string
      template: string
      runKind?: 'oneshot' | 'persistent' | 'gui' | 'manual'
      session?: 'labs' | 'bridge' | string
      boards?: BoardKey[]
    }

export type SetupStep = {
  id: string
  num: number
  title: Bi
  body: SetupBlock[]
}

/** If `boards` is set, row only shows when that board is selected. */
export type FailRow = { see: Bi; do: Bi; boards?: BoardKey[] }

export type OsTrack = {
  key: 'win' | 'mac' | 'linux'
  title: string
  shellTag: Bi
  lead: Bi
  steps: SetupStep[]
  failures: FailRow[]
  end: Bi
}
