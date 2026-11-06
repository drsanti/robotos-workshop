import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Sim **Native** + **Connected**. Use a second window (WH-01) or Manual to move while this script listens. Close serial-bridge.',
  th: 'sim **Native** + **Connected** เปิดหน้าต่างที่สอง (WH-01) หรือ Manual เพื่อขยับขณะสคริปต์นี้ฟัง ปิด serial-bridge',
} as const

const failures = [
  {
    see: { en: '`odom=?` / `scan=?`', th: '`odom=?` / `scan=?`' },
    do: {
      en: 'Sim Connected? `robotos topic list` shows odom/scan pubs?',
      th: 'sim Connected? `robotos topic list` มี odom/scan?',
    },
  },
  {
    see: { en: 'Numbers never change', th: 'ตัวเลขไม่เปลี่ยน' },
    do: {
      en: 'Drive with WH-01 or nudge in Manual',
      th: 'ขับด้วย WH-01 หรือขยับใน Manual',
    },
  },
  {
    see: { en: '`robotos` / import errors', th: '`robotos` / import พัง' },
    do: {
      en: 'Paste PATH + activate again. If `.venv` is missing, do MW-00',
      th: 'วาง PATH + activate อีกครั้ง ถ้าไม่มี `.venv` ให้ทำ MW-00',
    },
  },
]

const expectNote = {
  en: '**Expect:** lines like `x=… y=… yaw=…  R=… F=… L=…`. Drive toward a wall — `F=` (`ranges[1]`) should drop. Ctrl-C to stop.',
  th: '**คาดหวัง:** บรรทัดแบบ `x=… y=… yaw=…  R=… F=… L=…` ขับเข้ากำแพง — `F=` (`ranges[1]`) ควรลด กด Ctrl-C เพื่อหยุด',
} as const

export const wh02Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-02-win-sense',
      num: 1,
      title: { en: '1. Listen odom + scan', th: '1. ฟัง odom + scan' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave this running. Open **Live** Topics, then drive in another window (`#/labs/wh-01`) or Manual.',
            th: 'เปิดค้างไว้ เปิด **Live** Topics แล้วขับในอีกหน้าต่าง (`#/labs/wh-01`) หรือ Manual',
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
scripts\\run.cmd wh-02`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-02.', th: 'จบ WH-02 บน Windows' },
}

export const wh02Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-02-mac-sense',
      num: 1,
      title: { en: '1. Listen odom + scan', th: '1. ฟัง odom + scan' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave this running. Drive via WH-01 or Manual in another window; watch **Live**.',
            th: 'เปิดค้างไว้ ขับผ่าน WH-01 หรือ Manual ในอีกหน้าต่าง ดู **Live**',
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
./scripts/run wh-02`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-02.', th: 'จบ WH-02 บน macOS' },
}

export const wh02Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-02-linux-sense',
      num: 1,
      title: { en: '1. Listen odom + scan', th: '1. ฟัง odom + scan' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-02`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-02.', th: 'จบ WH-02 บน Linux' },
}

export const WH02_TRACKS: OsTrack[] = [wh02Windows, wh02Macos, wh02Linux]

export function wh02ByOs(os: OsTrack['key']) {
  return WH02_TRACKS.find((t) => t.key === os) ?? wh02Windows
}
