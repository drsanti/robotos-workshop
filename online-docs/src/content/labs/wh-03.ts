import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Sim **External** + **Native** + **Connect** (WH-02 done). Close serial-bridge. Leave the avoid loop running ≥30 s.',
  th: 'sim **External** + **Native** + **Connect** (ทำ WH-02 แล้ว) ปิด serial-bridge เปิดลูป avoid ≥30 วินาที',
} as const

const failures = [
  {
    see: { en: 'Collides / tunnels into shelves', th: 'ชน / ฝังเข้าชั้น' },
    do: {
      en: 'Raise `--threshold`, lower speed, confirm **External** mode',
      th: 'เพิ่ม `--threshold` ลดความเร็ว ตรวจโหมด **External**',
    },
  },
  {
    see: { en: 'Spins in empty space', th: 'หมุนกลางที่ว่าง' },
    do: {
      en: 'Wait for real scan (not stale `inf`)',
      th: 'รอสแกนจริง (ไม่ใช่ `inf` ค้าง)',
    },
  },
  {
    see: { en: 'Stops every ~0.5 s', th: 'หยุดทุก ~0.5 วินาที' },
    do: {
      en: 'Publish rate too low — keep the starter loop running (20 Hz)',
      th: 'อัตรา publish ต่ำเกินไป — ให้ลูป starter รันต่อ (20 Hz)',
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
  en: '**Expect:** creeps in open space; near walls/shelves spins toward the more open side. Front `<` threshold → yaw only; else small `vx`. Ctrl-C when done.',
  th: '**คาดหวัง:** คลานในที่ว่าง ใกล้กำแพง/ชั้นจะหมุนไปทางโล่งกว่า · หน้า `<` เกณฑ์ → หมุนอย่างเดียว ไม่เช่นนั้น `vx` เล็ก · Ctrl-C เมื่อจบ',
} as const

export const wh03Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-03-win-avoid',
      num: 1,
      title: { en: '1. Bang-bang avoid', th: '1. หลบแบบ bang-bang' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Default threshold is ~0.6 m on front range (`ranges[1]`). Watch the viewport / **Live**.',
            th: 'เกณฑ์เริ่มต้น ~0.6 ม. ที่ระยะด้านหน้า (`ranges[1]`) ดู viewport / **Live**',
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
scripts\\run.cmd wh-03`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-03-win-threshold',
      num: 2,
      title: { en: '2. Tune threshold (optional)', th: '2. ปรับเกณฑ์ (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
python labs\\wh\\wh-03-avoid-front\\starter\\avoid_front.py --threshold 0.6`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-03.', th: 'จบ WH-03 บน Windows' },
}

export const wh03Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-03-mac-avoid',
      num: 1,
      title: { en: '1. Bang-bang avoid', th: '1. หลบแบบ bang-bang' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Default threshold ~0.6 m on front range. Watch the viewport / **Live**.',
            th: 'เกณฑ์เริ่มต้น ~0.6 ม. ที่ระยะด้านหน้า ดู viewport / **Live**',
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
./scripts/run wh-03`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-03-mac-threshold',
      num: 2,
      title: { en: '2. Tune threshold (optional)', th: '2. ปรับเกณฑ์ (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-03-avoid-front/starter/avoid_front.py --threshold 0.6`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-03.', th: 'จบ WH-03 บน macOS' },
}

export const wh03Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-03-linux-avoid',
      num: 1,
      title: { en: '1. Bang-bang avoid', th: '1. หลบแบบ bang-bang' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-03`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-03-linux-threshold',
      num: 2,
      title: { en: '2. Tune threshold (optional)', th: '2. ปรับเกณฑ์ (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-03-avoid-front/starter/avoid_front.py --threshold 0.6`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-03.', th: 'จบ WH-03 บน Linux' },
}

export const WH03_TRACKS: OsTrack[] = [wh03Windows, wh03Macos, wh03Linux]

export function wh03ByOs(os: OsTrack['key']) {
  return WH03_TRACKS.find((t) => t.key === os) ?? wh03Windows
}
