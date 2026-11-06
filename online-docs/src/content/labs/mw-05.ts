import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Terminal **A** runs MW-01 `sim_sensor`; **B** records `/machine/01/sensor/imu` (~15 s) then `bag info`. Same evidence idea as WH-07 / HW-06.',
  th: 'เทอร์มินัล **A** รัน `sim_sensor` จาก MW-01 · **B** บันทึก `/machine/01/sensor/imu` (~15 วินาที) แล้ว `bag info` · แนวหลักฐานเดียวกับ WH-07 / HW-06',
} as const

const failures = [
  {
    see: { en: 'Empty / tiny bag', th: 'bag ว่าง / เล็กมาก' },
    do: {
      en: 'Is A still publishing? Topic spelled `/machine/01/sensor/imu`?',
      th: 'A ยัง publish อยู่ไหม? ท็อปิกเป็น `/machine/01/sensor/imu`?',
    },
  },
]

export const mw05Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Two windows.',
    th: 'ใช้ **PowerShell** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-05-win-pub',
      num: 1,
      title: { en: '1. Terminal A — publisher', th: '1. เทอร์มินัล A — publisher' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-01 sim_sensor`,
        },
      ],
    },
    {
      id: 'mw-05-win-record',
      num: 2,
      title: { en: '2. Terminal B — record + info', th: '2. เทอร์มินัล B — บันทึก + info' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** non-zero Imu count. Replay per pack docs; optional `monitor.py` during replay.',
            th: '**คาดหวัง:** จำนวน Imu ไม่เป็นศูนย์ · เล่นซ้ำตามเอกสารแพ็ก · ทางเลือก `monitor.py` ตอน replay',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows MW-05.', th: 'จบ MW-05 บน Windows' },
}

export const mw05Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Two windows.',
    th: 'ใช้ **Terminal** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-05-mac-pub',
      num: 1,
      title: { en: '1. Terminal A — publisher', th: '1. เทอร์มินัล A — publisher' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-01 sim_sensor`,
        },
      ],
    },
    {
      id: 'mw-05-mac-record',
      num: 2,
      title: { en: '2. Terminal B — record + info', th: '2. เทอร์มินัล B — บันทึก + info' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** non-zero Imu count in `bag info`.',
            th: '**คาดหวัง:** จำนวน Imu ใน `bag info` ไม่เป็นศูนย์',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS MW-05.', th: 'จบ MW-05 บน macOS' },
}

export const mw05Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when Linux pack is missing.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก Linux',
  },
  lead,
  steps: [
    {
      id: 'mw-05-linux-pub',
      num: 1,
      title: { en: '1. Terminal A — publisher', th: '1. เทอร์มินัล A — publisher' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-01 sim_sensor`,
        },
      ],
    },
    {
      id: 'mw-05-linux-record',
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
robotos record -o imu_run.rbag /machine/01/sensor/imu
# Ctrl-C after ~15 s
robotos bag info imu_run.rbag`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux MW-05.', th: 'จบ MW-05 บน Linux' },
}

export const MW05_TRACKS: OsTrack[] = [mw05Windows, mw05Macos, mw05Linux]

export function mw05ByOs(os: OsTrack['key']) {
  return MW05_TRACKS.find((t) => t.key === os) ?? mw05Windows
}
