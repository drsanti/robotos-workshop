import type { OsTrack } from '../setup/types'

const lead = {
  en: 'No warehouse sim. Two terminals: **A** publishes Imu on `/machine/01/sensor/imu`; **B** lists / echoes / monitors. MW-00 first.',
  th: 'ไม่ต้องใช้ warehouse sim สองเทอร์มินัล: **A** publish Imu บน `/machine/01/sensor/imu` · **B** list / echo / monitor · ทำ MW-00 ก่อน',
} as const

const failures = [
  {
    see: { en: 'Empty topic list / no echo', th: 'topic list ว่าง / ไม่มี echo' },
    do: {
      en: 'Is Terminal A still publishing? Same workshop PATH / `.venv` in both windows?',
      th: 'เทอร์มินัล A ยัง publish อยู่ไหม? PATH / `.venv` ชุดเดียวกันทั้งสองหน้าต่าง?',
    },
  },
  {
    see: { en: '`ModuleNotFoundError: labs`', th: '`ModuleNotFoundError: labs`' },
    do: {
      en: 'Run from workshop root (`SETUP.md` beside `labs/`)',
      th: 'รันจากรากเวิร์กช็อป (`SETUP.md` ข้าง `labs/`)',
    },
  },
]

const expectPub = {
  en: '**Expect:** `publishing on /machine/01/sensor/imu`. Looks “stuck” — normal. Ctrl-C later.',
  th: '**คาดหวัง:** `publishing on /machine/01/sensor/imu` ดูเหมือนค้าง — ปกติ Ctrl-C ทีหลัง',
} as const

const expectSub = {
  en: '**Expect:** `topic list` shows the imu topic with PUBS/SUBS; echo prints samples; `monitor.py 5` exits after ~5 s.',
  th: '**คาดหวัง:** `topic list` มีท็อปิก imu พร้อม PUBS/SUBS · echo พิมพ์ตัวอย่าง · `monitor.py 5` จบหลัง ~5 วินาที',
} as const

export const mw01Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Two windows — paste whole blocks in each.',
    th: 'ใช้ **PowerShell** สองหน้าต่าง — วางทั้งบล็อกในแต่ละอัน',
  },
  lead,
  steps: [
    {
      id: 'mw-01-win-pub',
      num: 1,
      title: { en: '1. Terminal A — publisher', th: '1. เทอร์มินัล A — publisher' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave this running while Terminal B subscribes.',
            th: 'เปิดค้างขณะเทอร์มินัล B subscribe',
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
scripts\\run.cmd mw-01 sim_sensor`,
        },
        { type: 'p', text: expectPub },
      ],
    },
    {
      id: 'mw-01-win-sub',
      num: 2,
      title: { en: '2. Terminal B — subscribe / CLI', th: '2. เทอร์มินัล B — subscribe / CLI' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Open a **second** PowerShell. Prefer `scripts\\run.cmd mw-01 monitor 5` after echo.',
            th: 'เปิด **PowerShell ที่สอง** หลัง echo ใช้ `scripts\\run.cmd mw-01 monitor 5` ได้',
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
robotos topic list
robotos topic echo /machine/01/sensor/imu --count 5
scripts\\run.cmd mw-01 monitor 5`,
        },
        { type: 'p', text: expectSub },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows MW-01.', th: 'จบ MW-01 บน Windows' },
}

export const mw01Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Two windows — paste whole blocks in each.',
    th: 'ใช้ **Terminal** สองหน้าต่าง — วางทั้งบล็อกในแต่ละอัน',
  },
  lead,
  steps: [
    {
      id: 'mw-01-mac-pub',
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
        { type: 'p', text: expectPub },
      ],
    },
    {
      id: 'mw-01-mac-sub',
      num: 2,
      title: { en: '2. Terminal B — subscribe / CLI', th: '2. เทอร์มินัล B — subscribe / CLI' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list
robotos topic echo /machine/01/sensor/imu --count 5
./scripts/run mw-01 monitor 5`,
        },
        { type: 'p', text: expectSub },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS MW-01.', th: 'จบ MW-01 บน macOS' },
}

export const mw01Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'mw-01-linux-pub',
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
        { type: 'p', text: expectPub },
      ],
    },
    {
      id: 'mw-01-linux-sub',
      num: 2,
      title: { en: '2. Terminal B — subscribe / CLI', th: '2. เทอร์มินัล B — subscribe / CLI' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
robotos topic list
robotos topic echo /machine/01/sensor/imu --count 5
./scripts/run mw-01 monitor 5`,
        },
        { type: 'p', text: expectSub },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux MW-01.', th: 'จบ MW-01 บน Linux' },
}

export const MW01_TRACKS: OsTrack[] = [mw01Windows, mw01Macos, mw01Linux]

export function mw01ByOs(os: OsTrack['key']) {
  return MW01_TRACKS.find((t) => t.key === os) ?? mw01Windows
}
