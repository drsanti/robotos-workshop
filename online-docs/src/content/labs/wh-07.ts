import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Two terminals: **A** runs WH-03 or WH-05; **B** records odom+scan (~20–30 s), then `bag info`. Sim Connected (External).',
  th: 'สองเทอร์มินัล: **A** รัน WH-03 หรือ WH-05 · **B** บันทึก odom+scan (~20–30 วินาที) แล้ว `bag info` · sim Connected (External)',
} as const

const failures = [
  {
    see: { en: 'Empty / tiny bag', th: 'bag ว่าง / เล็กมาก' },
    do: {
      en: 'Behavior publishing? Topics spelled `/robot/01/odom` and `/robot/01/scan`?',
      th: 'behavior กำลัง publish? ชื่อท็อปิกเป็น `/robot/01/odom` และ `/robot/01/scan`?',
    },
  },
  {
    see: { en: 'No scan in bag', th: 'ไม่มี scan ใน bag' },
    do: {
      en: 'Add `/robot/01/scan` to the `robotos record` topic list',
      th: 'ใส่ `/robot/01/scan` ในรายการท็อปิกของ `robotos record`',
    },
  },
  {
    see: { en: 'Pack lacks `record`', th: 'แพ็กไม่มี `record`' },
    do: {
      en: 'Fall back: save ~20 lines of WH-02 printout to a text file',
      th: 'ทางเลือก: บันทึก ~20 บรรทัดจาก WH-02 ลงไฟล์ข้อความ',
    },
  },
]

const expectNote = {
  en: '**Expect:** `bag info` lists `/robot/01/odom` and `/robot/01/scan` with non-zero counts. Note path, duration, topics, approx. message counts.',
  th: '**คาดหวัง:** `bag info` แสดง `/robot/01/odom` และ `/robot/01/scan` พร้อมจำนวนข้อความที่ไม่เป็นศูนย์ จด path, ระยะเวลา, ท็อปิก, จำนวนโดยประมาณ',
} as const

export const wh07Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-07-win-behavior',
      num: 1,
      title: { en: '1. Terminal A — behavior', th: '1. เทอร์มินัล A — behavior' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave this running while you record. Prefer WH-03 avoid or WH-05 wall-follow.',
            th: 'เปิดค้างขณะบันทึก แนะนำ WH-03 หลบ หรือ WH-05 ตามกำแพง',
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
      ],
    },
    {
      id: 'wh-07-win-record',
      num: 2,
      title: { en: '2. Terminal B — record + info', th: '2. เทอร์มินัล B — บันทึก + info' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Open a **second** labs terminal (or stop A first if you only have one). Ctrl-C record after ~20–30 s, then run `bag info`.',
            th: 'เปิดเทอร์มินัลแล็บ**ที่สอง** (หรือหยุด A ก่อนถ้ามีแค่หนึ่ง) Ctrl-C record หลัง ~20–30 วินาที แล้วรัน `bag info`',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-07.', th: 'จบ WH-07 บน Windows' },
}

export const wh07Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-07-mac-behavior',
      num: 1,
      title: { en: '1. Terminal A — behavior', th: '1. เทอร์มินัล A — behavior' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave running. Prefer WH-03 or WH-05 (`./scripts/run wh-05` also fine).',
            th: 'เปิดค้าง แนะนำ WH-03 หรือ WH-05 (`./scripts/run wh-05` ก็ได้)',
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
      ],
    },
    {
      id: 'wh-07-mac-record',
      num: 2,
      title: { en: '2. Terminal B — record + info', th: '2. เทอร์มินัล B — บันทึก + info' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Second terminal. Ctrl-C after ~20–30 s, then `bag info`.',
            th: 'เทอร์มินัลที่สอง Ctrl-C หลัง ~20–30 วินาที แล้ว `bag info`',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-07.', th: 'จบ WH-07 บน macOS' },
}

export const wh07Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-07-linux-behavior',
      num: 1,
      title: { en: '1. Terminal A — behavior', th: '1. เทอร์มินัล A — behavior' },
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
      ],
    },
    {
      id: 'wh-07-linux-record',
      num: 2,
      title: { en: '2. Terminal B — record + info', th: '2. เทอร์มินัล B — บันทึก + info' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos record -o run1.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after ~20–30 s
robotos bag info run1.rbag`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-07.', th: 'จบ WH-07 บน Linux' },
}

export const WH07_TRACKS: OsTrack[] = [wh07Windows, wh07Macos, wh07Linux]

export function wh07ByOs(os: OsTrack['key']) {
  return WH07_TRACKS.find((t) => t.key === os) ?? wh07Windows
}
