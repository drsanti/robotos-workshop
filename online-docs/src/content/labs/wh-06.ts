import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Sim **External** + **Native** + **Connect**. WH-03 / WH-05 help. Run ≥90 s and watch transition logs.',
  th: 'sim **External** + **Native** + **Connect** · WH-03 / WH-05 ช่วยได้ รัน ≥90 วินาทีแล้วดู log การเปลี่ยนสถานะ',
} as const

const failures = [
  {
    see: { en: 'No transitions printed', th: 'ไม่มีบรรทัด transition' },
    do: {
      en: 'Logging missing, or thresholds never fire — drive toward obstacles / aisles',
      th: 'ไม่ได้ log หรือเกณฑ์ไม่เคยถึง — ขับเข้าหาสิ่งกีดขวาง / ทางเดิน',
    },
  },
  {
    see: { en: 'Stuck in AVOID', th: 'ค้างใน AVOID' },
    do: {
      en: 'Add / use RECOVER when front+sides are all close',
      th: 'เพิ่ม / ใช้ RECOVER เมื่อหน้า+ข้างใกล้หมด',
    },
  },
  {
    see: { en: 'Stops every ~0.5 s (timeout)', th: 'หยุดทุก ~0.5 วินาที (timeout)' },
    do: {
      en: 'Raise publish rate — keep the FSM loop publishing Twist',
      th: 'เพิ่มอัตรา publish — ให้ลูป FSM ส่ง Twist ต่อเนื่อง',
    },
  },
]

const expectNote = {
  en: '**Expect:** lines like `t=… CRUISE → AVOID`. States include CRUISE / AVOID / (optional FOLLOW) / RECOVER. No freeze in one bad state for ≥90 s. Ctrl-C to stop.',
  th: '**คาดหวัง:** บรรทัดแบบ `t=… CRUISE → AVOID` มีสถานะ CRUISE / AVOID / (FOLLOW ตามต้องการ) / RECOVER · ไม่ค้างสถานะเดียว ≥90 วินาที · Ctrl-C เพื่อหยุด',
} as const

export const wh06Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-06-win-fsm',
      num: 1,
      title: { en: '1. Run the FSM driver', th: '1. รันไดรเวอร์ FSM' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Starter prints every transition. Watch the viewport / **Live** while states change.',
            th: 'starter พิมพ์ทุก transition ดู viewport / **Live** ขณะสถานะเปลี่ยน',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd wh-06`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-06.', th: 'จบ WH-06 บน Windows' },
}

export const wh06Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-06-mac-fsm',
      num: 1,
      title: { en: '1. Run the FSM driver', th: '1. รันไดรเวอร์ FSM' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Starter prints every transition. Watch the viewport / **Live**.',
            th: 'starter พิมพ์ทุก transition ดู viewport / **Live**',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-06`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-06.', th: 'จบ WH-06 บน macOS' },
}

export const wh06Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-06-linux-fsm',
      num: 1,
      title: { en: '1. Run the FSM driver', th: '1. รันไดรเวอร์ FSM' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-06`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-06.', th: 'จบ WH-06 บน Linux' },
}

export const WH06_TRACKS: OsTrack[] = [wh06Windows, wh06Macos, wh06Linux]

export function wh06ByOs(os: OsTrack['key']) {
  return WH06_TRACKS.find((t) => t.key === os) ?? wh06Windows
}
