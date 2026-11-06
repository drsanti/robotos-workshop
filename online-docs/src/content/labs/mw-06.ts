import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Two terminals: **A** plant `machine.py`, **B** twin `twin.py` on `/machine/01/state` + `/machine/01/cmd`. Twin uses the same topic names as the plant.',
  th: 'สองเทอร์มินัล: **A** plant `machine.py` · **B** twin `twin.py` บน `/machine/01/state` + `/machine/01/cmd` · twin ใช้ชื่อท็อปิกเดียวกับ plant',
} as const

const failures = [
  {
    see: { en: 'Twin silent / no speed change', th: 'twin เงียบ / ความเร็วไม่เปลี่ยน' },
    do: {
      en: 'Both processes up? START/STOP from the twin UI or script prompts?',
      th: 'ทั้งสองโปรเซสรัน? กด START/STOP จาก twin หรือตามพรอมต์สคริปต์?',
    },
  },
]

export const mw06Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Two windows.',
    th: 'ใช้ **PowerShell** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-06-win-plant',
      num: 1,
      title: { en: '1. Terminal A — plant', th: '1. เทอร์มินัล A — plant' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-06 machine`,
        },
      ],
    },
    {
      id: 'mw-06-win-twin',
      num: 2,
      title: { en: '2. Terminal B — twin', th: '2. เทอร์มินัล B — twin' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-06 twin`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** START/STOP changes reported speed. Mental bridge: warehouse sim is a 3D twin of `/robot/01/*`.',
            th: '**คาดหวัง:** START/STOP เปลี่ยนความเร็วที่รายงาน · เชื่อมโยง: warehouse sim คือ twin 3D ของ `/robot/01/*`',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows MW-06.', th: 'จบ MW-06 บน Windows' },
}

export const mw06Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Two windows.',
    th: 'ใช้ **Terminal** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-06-mac-plant',
      num: 1,
      title: { en: '1. Terminal A — plant', th: '1. เทอร์มินัล A — plant' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-06 machine`,
        },
      ],
    },
    {
      id: 'mw-06-mac-twin',
      num: 2,
      title: { en: '2. Terminal B — twin', th: '2. เทอร์มินัล B — twin' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-06 twin`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** START/STOP changes reported speed.',
            th: '**คาดหวัง:** START/STOP เปลี่ยนความเร็วที่รายงาน',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS MW-06.', th: 'จบ MW-06 บน macOS' },
}

export const mw06Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when Linux pack is missing.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก Linux',
  },
  lead,
  steps: [
    {
      id: 'mw-06-linux-plant',
      num: 1,
      title: { en: '1. Terminal A — plant', th: '1. เทอร์มินัล A — plant' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-06 machine`,
        },
      ],
    },
    {
      id: 'mw-06-linux-twin',
      num: 2,
      title: { en: '2. Terminal B — twin', th: '2. เทอร์มินัล B — twin' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-06 twin`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux MW-06.', th: 'จบ MW-06 บน Linux' },
}

export const MW06_TRACKS: OsTrack[] = [mw06Windows, mw06Macos, mw06Linux]

export function mw06ByOs(os: OsTrack['key']) {
  return MW06_TRACKS.find((t) => t.key === os) ?? mw06Windows
}
