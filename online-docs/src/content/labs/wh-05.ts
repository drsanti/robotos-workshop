import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Sim **External** + **Native** + **Connect**. **Reset** should seat you west of the first rack (right ~0.7 m). Default follows the **right** wall.',
  th: 'sim **External** + **Native** + **Connect** · **Reset** ควรให้อยู่ฝั่งตะวันตกของชั้นแรก (ขวา ~0.7 ม.) ค่าเริ่มต้นตามกำแพง**ขวา**',
} as const

const failures = [
  {
    see: { en: 'Spins / `seek-no-wall`', th: 'หมุน / `seek-no-wall`' },
    do: {
      en: 'Drive into a rack aisle first; flip `--side` if wall is on the other side',
      th: 'ขับเข้าทางเดินข้างชั้นก่อน สลับ `--side` ถ้ากำแพงอยู่อีกด้าน',
    },
  },
  {
    see: { en: 'Oscillates along the wall', th: 'แกว่งตามกำแพง' },
    do: {
      en: 'Lower `--k` (try `0.8`)',
      th: 'ลด `--k` (ลอง `0.8`)',
    },
  },
  {
    see: { en: 'Leaves wall / hits corners', th: 'หลุดกำแพง / ชนมุม' },
    do: {
      en: 'Raise `--k` / check `--side`; increase `--front-stop` if corners clip',
      th: 'เพิ่ม `--k` / ตรวจ `--side` เพิ่ม `--front-stop` ถ้าชนมุม',
    },
  },
  {
    see: { en: '`front-avoid` forever', th: '`front-avoid` ไม่จบ' },
    do: {
      en: 'Point down the aisle, not into the rack',
      th: 'หันตามทางเดิน ไม่ใช่เข้าใส่ชั้น',
    },
  },
]

const expectNote = {
  en: '**Expect:** status `follow` when locked; lap a shelf aisle ≥60 s without tunneling. Side band ~0.5–0.9 m (`--target`). Ctrl-C to stop.',
  th: '**คาดหวัง:** สถานะ `follow` เมื่อล็อกได้ วิ่งตามทางเดิน ≥60 วินาทีโดยไม่ฝังเข้าชั้น · ระยะข้าง ~0.5–0.9 ม. (`--target`) · Ctrl-C เพื่อหยุด',
} as const

export const wh05Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-05-win-follow',
      num: 1,
      title: { en: '1. Follow right wall', th: '1. ตามกำแพงขวา' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Defaults: `--side right --target 0.7 --k 1.2`. Watch **Live** / viewport.',
            th: 'ค่าเริ่มต้น: `--side right --target 0.7 --k 1.2` ดู **Live** / viewport',
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
scripts\\run.cmd wh-05`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-05-win-tune',
      num: 2,
      title: { en: '2. Left wall / tune gain (optional)', th: '2. กำแพงซ้าย / ปรับเกน (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
python labs\\wh\\wh-05-wall-follow\\starter\\wall_follow.py --side left --target 0.7 --k 1.0`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-05.', th: 'จบ WH-05 บน Windows' },
}

export const wh05Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-05-mac-follow',
      num: 1,
      title: { en: '1. Follow right wall', th: '1. ตามกำแพงขวา' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Defaults: `--side right --target 0.7`. Oscillates → lower `--k`.',
            th: 'ค่าเริ่มต้น: `--side right --target 0.7` แกว่ง → ลด `--k`',
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
./scripts/run wh-05`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-05-mac-tune',
      num: 2,
      title: { en: '2. Left wall / tune gain (optional)', th: '2. กำแพงซ้าย / ปรับเกน (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side left --target 0.7 --k 0.8`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-05.', th: 'จบ WH-05 บน macOS' },
}

export const wh05Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-05-linux-follow',
      num: 1,
      title: { en: '1. Follow right wall', th: '1. ตามกำแพงขวา' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-05`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-05-linux-tune',
      num: 2,
      title: { en: '2. Left wall / tune gain (optional)', th: '2. กำแพงซ้าย / ปรับเกน (ทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-05-wall-follow/starter/wall_follow.py --side left --target 0.7 --k 0.8`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-05.', th: 'จบ WH-05 บน Linux' },
}

export const WH05_TRACKS: OsTrack[] = [wh05Windows, wh05Macos, wh05Linux]

export function wh05ByOs(os: OsTrack['key']) {
  return WH05_TRACKS.find((t) => t.key === os) ?? wh05Windows
}
