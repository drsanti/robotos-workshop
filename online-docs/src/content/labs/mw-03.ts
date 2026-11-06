import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Two terminals: **A** `cycle_server`, **B** `cycle_client` on `/machine/01/cycle`. Feedback lines, then a result — longer than MW-02 services.',
  th: 'สองเทอร์มินัล: **A** `cycle_server` · **B** `cycle_client` บน `/machine/01/cycle` · มี feedback แล้วค่อย result — ยาวกว่า service ใน MW-02',
} as const

const failures = [
  {
    see: { en: 'No feedback / hangs', th: 'ไม่มี feedback / ค้าง' },
    do: {
      en: 'Server running first? Same workshop env in both windows?',
      th: 'เปิดเซิร์ฟเวอร์ก่อน? env ชุดเดียวกันทั้งสองหน้าต่าง?',
    },
  },
]

export const mw03Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Two windows.',
    th: 'ใช้ **PowerShell** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-03-win-server',
      num: 1,
      title: { en: '1. Terminal A — action server', th: '1. เทอร์มินัล A — action server' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-03 cycle_server`,
        },
      ],
    },
    {
      id: 'mw-03-win-client',
      num: 2,
      title: { en: '2. Terminal B — action client', th: '2. เทอร์มินัล B — action client' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-03 cycle_client`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** several feedback lines, then a final result. Stretch: cancel mid-cycle if the pack supports it.',
            th: '**คาดหวัง:** feedback หลายบรรทัด แล้ว result สุดท้าย · ขั้นสูง: cancel กลางรอบถ้าแพ็กรองรับ',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows MW-03.', th: 'จบ MW-03 บน Windows' },
}

export const mw03Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Two windows.',
    th: 'ใช้ **Terminal** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-03-mac-server',
      num: 1,
      title: { en: '1. Terminal A — action server', th: '1. เทอร์มินัล A — action server' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-03 cycle_server`,
        },
      ],
    },
    {
      id: 'mw-03-mac-client',
      num: 2,
      title: { en: '2. Terminal B — action client', th: '2. เทอร์มินัล B — action client' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-03 cycle_client`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** feedback lines, then result.',
            th: '**คาดหวัง:** บรรทัด feedback แล้ว result',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS MW-03.', th: 'จบ MW-03 บน macOS' },
}

export const mw03Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when Linux pack is missing.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก Linux',
  },
  lead,
  steps: [
    {
      id: 'mw-03-linux-server',
      num: 1,
      title: { en: '1. Terminal A — action server', th: '1. เทอร์มินัล A — action server' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-03 cycle_server`,
        },
      ],
    },
    {
      id: 'mw-03-linux-client',
      num: 2,
      title: { en: '2. Terminal B — action client', th: '2. เทอร์มินัล B — action client' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-03 cycle_client`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux MW-03.', th: 'จบ MW-03 บน Linux' },
}

export const MW03_TRACKS: OsTrack[] = [mw03Windows, mw03Macos, mw03Linux]

export function mw03ByOs(os: OsTrack['key']) {
  return MW03_TRACKS.find((t) => t.key === os) ?? mw03Windows
}
