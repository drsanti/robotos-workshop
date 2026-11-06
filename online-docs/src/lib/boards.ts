import { parseCapsMask } from './hwCaps'

/** Workshop HW boards students pick in Your setup. */
export type BoardKey = 'es3c28p' | 'ws28p'

/** `auto` follows live BoardInfo when present; otherwise last manual / default. */
export type BoardChoice = 'auto' | BoardKey

export type BoardProfile = {
  key: BoardKey
  label: string
  /** Typical caps from HW-01 / docs. */
  typicalCaps: number
  notesEn: string
  notesTh: string
  firmwareDir: string
}

export const BOARD_KEYS: BoardKey[] = ['es3c28p', 'ws28p']

export const BOARD_PROFILES: Record<BoardKey, BoardProfile> = {
  es3c28p: {
    key: 'es3c28p',
    label: 'es3c28p',
    typicalCaps: 0x33,
    notesEn: 'LED + mic',
    notesTh: 'มี LED + mic',
    firmwareDir: 'hardware-interface-workshop/firmware-prebuilt/es3c28p/',
  },
  ws28p: {
    key: 'ws28p',
    label: 'ws28p',
    typicalCaps: 0x3c,
    notesEn: 'IMU + RTC; no LED/mic',
    notesTh: 'มี IMU + RTC; ไม่มี LED/mic',
    firmwareDir: 'hardware-interface-workshop/firmware-prebuilt/ws28p/',
  },
}

export const CAP_LED = 0x01
export const CAP_MIC = 0x02
export const CAP_IMU = 0x04

export function parseBoardKey(raw: string | null | undefined): BoardKey | null {
  if (!raw) return null
  const s = raw.trim().toLowerCase()
  if (s === 'es3c28p' || s === 'es3' || s === 'ternion') return 'es3c28p'
  if (s === 'ws28p' || s === 'ws' || s === 'waveshare') return 'ws28p'
  return null
}

export function parseBoardChoice(raw: string | null | undefined): BoardChoice | null {
  if (!raw) return null
  if (raw.trim().toLowerCase() === 'auto') return 'auto'
  return parseBoardKey(raw)
}

/** Infer board from `hw_model` string and/or caps mask. */
export function detectBoardKey(hwModel: unknown, capsRaw?: unknown): BoardKey | null {
  const fromName = parseBoardKey(typeof hwModel === 'string' ? hwModel : String(hwModel ?? ''))
  if (fromName) return fromName

  const caps = typeof capsRaw === 'number' ? capsRaw >>> 0 : parseCapsMask(capsRaw)
  if (!caps) return null
  const hasLed = (caps & CAP_LED) !== 0
  const hasImu = (caps & CAP_IMU) !== 0
  // es3c28p ≈ LED+mic; ws28p ≈ IMU+RTC without LED
  if (hasLed && !hasImu) return 'es3c28p'
  if (hasImu && !hasLed) return 'ws28p'
  return null
}

export function boardHasCap(board: BoardKey, bit: number): boolean {
  return (BOARD_PROFILES[board].typicalCaps & bit) !== 0
}

export function resolveBoard(
  choice: BoardChoice,
  detected: BoardKey | null,
  fallback: BoardKey = 'ws28p',
): BoardKey {
  if (choice === 'auto') return detected ?? fallback
  return choice
}
