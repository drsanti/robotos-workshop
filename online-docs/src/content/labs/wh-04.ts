import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Sim **External** + **Native** + **Connect**. Clear space helps — open loop drifts and hits shelves more easily than WH-03 feedback.',
  th: 'sim **External** + **Native** + **Connect** พื้นที่โล่งช่วยได้ — open loop ลื่นและชนชั้นง่ายกว่า feedback ใน WH-03',
} as const

const failures = [
  {
    see: { en: 'Hits shelf mid-square', th: 'ชนชั้นกลางสี่เหลี่ยม' },
    do: {
      en: 'Clearer space or slower `--vx`; expect worse behavior than WH-03 feedback',
      th: 'หาที่โล่งกว่าหรือลด `--vx` — คาดแย่กว่า feedback ใน WH-03',
    },
  },
  {
    see: { en: 'No motion', th: 'ไม่ขยับ' },
    do: {
      en: 'Confirm **External** mode; publish loop inside starter must keep running',
      th: 'ตรวจโหมด **External** ลูป publish ใน starter ต้องรันต่อ',
    },
  },
  {
    see: { en: '`ModuleNotFoundError: labs`', th: '`ModuleNotFoundError: labs`' },
    do: {
      en: 'Workshop root with `SETUP.md` beside `labs/`',
      th: 'รากเวิร์กช็อปที่มี `SETUP.md` ข้าง `labs/`',
    },
  },
]

const expectNote = {
  en: '**Expect:** four timed sides (forward → 90° turn ×4). Log start/end odom — report Δx/Δy/yaw honestly (millimeter closure is not required).',
  th: '**คาดหวัง:** สี่ด้านตามเวลา (เดินหน้า → เลี้ยว 90° ×4) บันทึก odom ต้น–ท้าย — รายงาน Δx/Δy/yaw ตามจริง (ไม่ต้องปิดวงระดับมม.)',
} as const

export const wh04Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-04-win-square',
      num: 1,
      title: { en: '1. Open-loop square', th: '1. สี่เหลี่ยมแบบ open-loop' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Watch the viewport / **Live**. Note start pose, then end pose after four sides.',
            th: 'ดู viewport / **Live** จดท่าเริ่ม แล้วท่าท้ายหลังสี่ด้าน',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd wh-04`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-04-win-tune',
      num: 2,
      title: { en: '2. Tune side / speed (optional)', th: '2. ปรับด้าน / ความเร็ว (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
python labs\\wh\\wh-04-square-path\\starter\\square.py --side 0.8 --vx 0.2`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-04.', th: 'จบ WH-04 บน Windows' },
}

export const wh04Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-04-mac-square',
      num: 1,
      title: { en: '1. Open-loop square', th: '1. สี่เหลี่ยมแบบ open-loop' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Watch the viewport / **Live**. Note start vs end odom after four sides.',
            th: 'ดู viewport / **Live** จด odom ต้น vs ท้ายหลังสี่ด้าน',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-04`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-04-mac-tune',
      num: 2,
      title: { en: '2. Tune side / speed (optional)', th: '2. ปรับด้าน / ความเร็ว (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-04-square-path/starter/square.py --side 0.8 --vx 0.2`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-04.', th: 'จบ WH-04 บน macOS' },
}

export const wh04Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-04-linux-square',
      num: 1,
      title: { en: '1. Open-loop square', th: '1. สี่เหลี่ยมแบบ open-loop' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-04`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-04-linux-tune',
      num: 2,
      title: { en: '2. Tune side / speed (optional)', th: '2. ปรับด้าน / ความเร็ว (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-04-square-path/starter/square.py --side 0.8 --vx 0.2`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-04.', th: 'จบ WH-04 บน Linux' },
}

export const WH04_TRACKS: OsTrack[] = [wh04Windows, wh04Macos, wh04Linux]

export function wh04ByOs(os: OsTrack['key']) {
  return WH04_TRACKS.find((t) => t.key === os) ?? wh04Windows
}
