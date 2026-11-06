import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Bridge up (HW-00). BTN / touch caps help (HW-01). Events arrive on topics — not host GPIO polling.',
  th: 'เปิด bridge (HW-00) · caps BTN/touch ช่วยได้ (HW-01) · อีเวนต์มาบนท็อปิก ไม่ใช่โพล GPIO ฝั่งโฮสต์',
} as const

const failures = [
  {
    see: { en: 'No events', th: 'ไม่มีอีเวนต์' },
    do: {
      en: 'Caps lack BTN/touch? Bridge up? `ROBOTOS_CONNECT` correct?',
      th: 'ไม่มี caps BTN/touch? bridge รัน? `ROBOTOS_CONNECT` ถูก?',
    },
  },
  {
    see: { en: 'Script hangs forever', th: 'สคริปต์ค้างไม่จบ' },
    do: {
      en: 'Pass a seconds arg (e.g. `10`) or Ctrl-C',
      th: 'ใส่จำนวนวินาที (เช่น `10`) หรือ Ctrl-C',
    },
  },
]

const expectNote = {
  en: '**Expect:** lines like `touch gest=… DOWN/UP (x,y)`. Press/short/long on the device; host log should match. Topics: `/robot/01/input/touch`, `/robot/01/display/ui/event` (as available).',
  th: '**คาดหวัง:** บรรทัดแบบ `touch gest=… DOWN/UP (x,y)` กดสั้น/ยาวบนอุปกรณ์ ให้ log โฮสต์ตรงกัน · ท็อปิก: `/robot/01/input/touch`, `/robot/01/display/ui/event` (ถ้ามี)',
} as const

export const hw05Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-05-win-watch',
      num: 1,
      title: { en: '1. Watch touch / UI events', th: '1. ดูอีเวนต์สัมผัส / UI' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave running and press the board. Open **Live** Topics if useful. Ctrl-C to stop.',
            th: 'เปิดค้างแล้วกดบอร์ด เปิด **Live** Topics ได้ Ctrl-C เพื่อหยุด',
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
scripts\\run.cmd hw-05`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-05-win-timed',
      num: 2,
      title: { en: '2. Timed run (optional)', th: '2. รันจับเวลา (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd hw-05 10`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-05.', th: 'จบ HW-05 บน Windows' },
}

export const hw05Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-05-mac-watch',
      num: 1,
      title: { en: '1. Watch touch / UI events', th: '1. ดูอีเวนต์สัมผัส / UI' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Press/short/long on the device while this runs.',
            th: 'กดสั้น/ยาวบนอุปกรณ์ขณะรัน',
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
./scripts/run hw-05`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-05-mac-timed',
      num: 2,
      title: { en: '2. Timed run (optional)', th: '2. รันจับเวลา (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-05 10`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-05.', th: 'จบ HW-05 บน macOS' },
}

export const hw05Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-v0.3.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'hw-05-linux-watch',
      num: 1,
      title: { en: '1. Watch touch / UI events', th: '1. ดูอีเวนต์สัมผัส / UI' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-05`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-05-linux-timed',
      num: 2,
      title: { en: '2. Timed run (optional)', th: '2. รันจับเวลา (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-05 10`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-05.', th: 'จบ HW-05 บน Linux' },
}

export const HW05_TRACKS: OsTrack[] = [hw05Windows, hw05Macos, hw05Linux]

export function hw05ByOs(os: OsTrack['key']) {
  return HW05_TRACKS.find((t) => t.key === os) ?? hw05Windows
}
