/** Workshop lab index — mirrors `labs/{mw,wh,hw}/`. Online routes are opt-in. */

export type LabId =
  | 'mw-00'
  | 'mw-01'
  | 'mw-02'
  | 'mw-03'
  | 'mw-04'
  | 'mw-05'
  | 'mw-06'
  | 'wh-00'
  | 'wh-01'
  | 'wh-02'
  | 'wh-03'
  | 'wh-04'
  | 'wh-05'
  | 'wh-06'
  | 'wh-07'
  | 'wh-08'
  | 'hw-00'
  | 'hw-01'
  | 'hw-02'
  | 'hw-03'
  | 'hw-04'
  | 'hw-05'
  | 'hw-06'
  | 'hw-07'

export type LabEntry = {
  id: LabId
  /** Short EN title (after the id) */
  titleEn: string
  titleTh: string
  /** Hash route when an online sheet exists */
  href?: `/${string}`
}

export type TrackKey = 'mw' | 'wh' | 'hw'

export type TrackEntry = {
  key: TrackKey
  code: 'MW' | 'WH' | 'HW'
  folder: `labs/${TrackKey}`
  labs: LabEntry[]
}

export function trackByKey(key: TrackKey): TrackEntry {
  return LAB_TRACKS.find((t) => t.key === key)!
}

export function labNeighbors(track: TrackKey, labId: LabId): {
  prev: LabEntry | null
  next: LabEntry | null
} {
  const labs = trackByKey(track).labs
  const i = labs.findIndex((l) => l.id === labId)
  if (i < 0) return { prev: null, next: null }
  return {
    prev: i > 0 ? labs[i - 1]! : null,
    next: i < labs.length - 1 ? labs[i + 1]! : null,
  }
}

export const LAB_TRACKS: TrackEntry[] = [
  {
    key: 'mw',
    code: 'MW',
    folder: 'labs/mw',
    labs: [
      { id: 'mw-00', titleEn: 'Getting started', titleTh: 'เริ่มต้นใช้งาน', href: '/labs/mw-00' },
      { id: 'mw-01', titleEn: 'Publish & subscribe', titleTh: 'Publish & subscribe', href: '/labs/mw-01' },
      { id: 'mw-02', titleEn: 'Services', titleTh: 'Services', href: '/labs/mw-02' },
      { id: 'mw-03', titleEn: 'Actions', titleTh: 'Actions', href: '/labs/mw-03' },
      { id: 'mw-04', titleEn: 'Parameters', titleTh: 'Parameters', href: '/labs/mw-04' },
      { id: 'mw-05', titleEn: 'Record & replay', titleTh: 'Record & replay', href: '/labs/mw-05' },
      { id: 'mw-06', titleEn: 'Mini digital twin', titleTh: 'Mini digital twin', href: '/labs/mw-06' },
    ],
  },
  {
    key: 'wh',
    code: 'WH',
    folder: 'labs/wh',
    labs: [
      { id: 'wh-00', titleEn: 'Hello graph', titleTh: 'Hello graph', href: '/labs/wh-00' },
      { id: 'wh-01', titleEn: 'Drive by Twist', titleTh: 'ขับด้วย Twist', href: '/labs/wh-01' },
      { id: 'wh-02', titleEn: 'Sense odom + scan', titleTh: 'อ่าน odom + scan', href: '/labs/wh-02' },
      { id: 'wh-03', titleEn: 'Avoid front', titleTh: 'หลบด้านหน้า', href: '/labs/wh-03' },
      { id: 'wh-04', titleEn: 'Square path', titleTh: 'สี่เหลี่ยม', href: '/labs/wh-04' },
      { id: 'wh-05', titleEn: 'Wall follow', titleTh: 'ตามกำแพง', href: '/labs/wh-05' },
      { id: 'wh-06', titleEn: 'State machine', titleTh: 'เครื่องสถานะ (FSM)', href: '/labs/wh-06' },
      { id: 'wh-07', titleEn: 'Record / inspect', titleTh: 'บันทึก / ตรวจ bag', href: '/labs/wh-07' },
      { id: 'wh-08', titleEn: 'Capstone', titleTh: 'แคปสโตน', href: '/labs/wh-08' },
    ],
  },
  {
    key: 'hw',
    code: 'HW',
    folder: 'labs/hw',
    labs: [
      { id: 'hw-00', titleEn: 'Board on the graph', titleTh: 'บอร์ดบนกราฟ', href: '/labs/hw-00' },
      { id: 'hw-01', titleEn: 'Capability probe', titleTh: 'ตรวจความสามารถ (caps)', href: '/labs/hw-01' },
      { id: 'hw-02', titleEn: 'Read sensors', titleTh: 'อ่านเซนเซอร์', href: '/labs/hw-02' },
      { id: 'hw-03', titleEn: 'Command actuators', titleTh: 'สั่งแอคทูเอเตอร์', href: '/labs/hw-03' },
      { id: 'hw-04', titleEn: 'Board parameters', titleTh: 'พารามิเตอร์บอร์ด', href: '/labs/hw-04' },
      { id: 'hw-05', titleEn: 'Input events', titleTh: 'อินพุตสัมผัส/ปุ่ม', href: '/labs/hw-05' },
      { id: 'hw-06', titleEn: 'Record board', titleTh: 'บันทึกท็อปิกบอร์ด', href: '/labs/hw-06' },
      { id: 'hw-07', titleEn: 'Sense → actuate', titleTh: 'Sense → actuate', href: '/labs/hw-07' },
    ],
  },
]
