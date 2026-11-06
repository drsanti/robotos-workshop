import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Two terminals: **A** `tuning_node`, **B** `robotos param list/get/set`. Live config — same idea later on HW-04 silicon.',
  th: 'สองเทอร์มินัล: **A** `tuning_node` · **B** `robotos param list/get/set` · คอนฟิกละเอียดสด — แนวเดียวกับ HW-04 บนซิลิคอน',
} as const

const failures = [
  {
    see: { en: 'Empty param list / unknown node', th: 'param list ว่าง / ไม่รู้จักโหนด' },
    do: {
      en: 'Is `tuning_node` still running in Terminal A?',
      th: '`tuning_node` ยังรันในเทอร์มินัล A อยู่ไหม?',
    },
  },
]

export const mw04Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Two windows.',
    th: 'ใช้ **PowerShell** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-04-win-node',
      num: 1,
      title: { en: '1. Terminal A — tuning node', th: '1. เทอร์มินัล A — tuning node' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-04`,
        },
      ],
    },
    {
      id: 'mw-04-win-cli',
      num: 2,
      title: { en: '2. Terminal B — param CLI', th: '2. เทอร์มินัล B — param CLI' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `get` shows `99` after `set`. Optional: `robotos lifecycle --help` / pack NOTES.',
            th: '**คาดหวัง:** หลัง `set` ค่า `get` เป็น `99` · ทางเลือก: `robotos lifecycle --help` / NOTES ในแพ็ก',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows MW-04.', th: 'จบ MW-04 บน Windows' },
}

export const mw04Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Two windows.',
    th: 'ใช้ **Terminal** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-04-mac-node',
      num: 1,
      title: { en: '1. Terminal A — tuning node', th: '1. เทอร์มินัล A — tuning node' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-04`,
        },
      ],
    },
    {
      id: 'mw-04-mac-cli',
      num: 2,
      title: { en: '2. Terminal B — param CLI', th: '2. เทอร์มินัล B — param CLI' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `get` shows `99` after `set`.',
            th: '**คาดหวัง:** หลัง `set` ค่า `get` เป็น `99`',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS MW-04.', th: 'จบ MW-04 บน macOS' },
}

export const mw04Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when Linux pack is missing.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก Linux',
  },
  lead,
  steps: [
    {
      id: 'mw-04-linux-node',
      num: 1,
      title: { en: '1. Terminal A — tuning node', th: '1. เทอร์มินัล A — tuning node' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-04`,
        },
      ],
    },
    {
      id: 'mw-04-linux-cli',
      num: 2,
      title: { en: '2. Terminal B — param CLI', th: '2. เทอร์มินัล B — param CLI' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos param list tuning_node
robotos param set tuning_node setpoint 99
robotos param get tuning_node setpoint`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux MW-04.', th: 'จบ MW-04 บน Linux' },
}

export const MW04_TRACKS: OsTrack[] = [mw04Windows, mw04Macos, mw04Linux]

export function mw04ByOs(os: OsTrack['key']) {
  return MW04_TRACKS.find((t) => t.key === os) ?? mw04Windows
}
