import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Two terminals: **A** `echo_server`, **B** `client` + `service list`. Topic streams (MW-01) vs request/reply. No warehouse sim.',
  th: 'สองเทอร์มินัล: **A** `echo_server` · **B** `client` + `service list` · สตรีมท็อปิก (MW-01) vs request/reply · ไม่ใช้ warehouse sim',
} as const

const failures = [
  {
    see: { en: 'Client retries / unavailable', th: 'client รีทราย / unavailable' },
    do: {
      en: 'Expected while the server starts — leave A running, then B',
      th: 'ปกติขณะเซิร์ฟเวอร์กำลังขึ้น — เปิด A ค้าง แล้วค่อย B',
    },
  },
  {
    see: { en: 'No `/test/echo`', th: 'ไม่มี `/test/echo`' },
    do: {
      en: 'Server still up? Same workshop env in both windows?',
      th: 'เซิร์ฟเวอร์ยังรัน? env เวิร์กช็อปชุดเดียวกันทั้งสองหน้าต่าง?',
    },
  },
]

export const mw02Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Two windows.',
    th: 'ใช้ **PowerShell** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-02-win-server',
      num: 1,
      title: { en: '1. Terminal A — server', th: '1. เทอร์มินัล A — server' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-02 echo_server`,
        },
      ],
    },
    {
      id: 'mw-02-win-client',
      num: 2,
      title: { en: '2. Terminal B — client', th: '2. เทอร์มินัล B — client' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd mw-02 client
robotos service list`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** echo reply on `/test/echo`. Optional: `robotos service call` (see CLI help).',
            th: '**คาดหวัง:** คำตอบ echo บน `/test/echo` · ทางเลือก: `robotos service call` (ดู CLI help)',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows MW-02.', th: 'จบ MW-02 บน Windows' },
}

export const mw02Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Two windows.',
    th: 'ใช้ **Terminal** สองหน้าต่าง',
  },
  lead,
  steps: [
    {
      id: 'mw-02-mac-server',
      num: 1,
      title: { en: '1. Terminal A — server', th: '1. เทอร์มินัล A — server' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-02 echo_server`,
        },
      ],
    },
    {
      id: 'mw-02-mac-client',
      num: 2,
      title: { en: '2. Terminal B — client', th: '2. เทอร์มินัล B — client' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-02 client
robotos service list`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** echo reply on `/test/echo`.',
            th: '**คาดหวัง:** คำตอบ echo บน `/test/echo`',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS MW-02.', th: 'จบ MW-02 บน macOS' },
}

export const mw02Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when Linux pack is missing.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก Linux',
  },
  lead,
  steps: [
    {
      id: 'mw-02-linux-server',
      num: 1,
      title: { en: '1. Terminal A — server', th: '1. เทอร์มินัล A — server' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-02 echo_server`,
        },
      ],
    },
    {
      id: 'mw-02-linux-client',
      num: 2,
      title: { en: '2. Terminal B — client', th: '2. เทอร์มินัล B — client' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run mw-02 client
robotos service list`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux MW-02.', th: 'จบ MW-02 บน Linux' },
}

export const MW02_TRACKS: OsTrack[] = [mw02Windows, mw02Macos, mw02Linux]

export function mw02ByOs(os: OsTrack['key']) {
  return MW02_TRACKS.find((t) => t.key === os) ?? mw02Windows
}
