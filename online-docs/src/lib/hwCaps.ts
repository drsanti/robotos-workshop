/** Board capability bits — matches firmware `board_caps()` / MCP decode. */
export const CAP_BITS: ReadonlyArray<readonly [number, string]> = [
  [0x01, 'LED'],
  [0x02, 'MIC'],
  [0x04, 'IMU'],
  [0x08, 'RTC'],
  [0x10, 'BATT'],
  [0x20, 'BTN'],
] as const

export function parseCapsMask(raw: unknown): number {
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw >>> 0
  if (typeof raw === 'string') {
    const s = raw.trim().toLowerCase()
    if (s.startsWith('0x')) return Number.parseInt(s.slice(2), 16) >>> 0
    const n = Number(s)
    if (Number.isFinite(n)) return n >>> 0
  }
  return 0
}

export function capsLabels(mask: number): string[] {
  return CAP_BITS.filter(([bit]) => (mask & bit) !== 0).map(([, name]) => name)
}

export function num(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}
