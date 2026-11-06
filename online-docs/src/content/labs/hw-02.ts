import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Bridge up (HW-00); caps known (HW-01). Pick IMU vs board_watch from caps — IMU needs `0x04`.',
  th: 'เปิด bridge (HW-00) และรู้ caps (HW-01) แล้ว — เลือก IMU หรือ board_watch ตาม caps · IMU ต้องมี `0x04`',
} as const

const failures = [
  {
    boards: ['ws28p' as const],
    see: { en: 'IMU timeouts forever', th: 'IMU timeout ไม่จบ' },
    do: {
      en: 'Bridge up? USB? Confirm HW-01 showed IMU **yes**',
      th: 'bridge รัน? USB? ยืนยัน HW-01 ว่า IMU เป็น **yes**',
    },
  },
  {
    boards: ['es3c28p' as const],
    see: { en: 'IMU quiet / no samples', th: 'IMU เงียบ / ไม่มีตัวอย่าง' },
    do: {
      en: '`es3c28p` has no IMU — use **board_watch** instead, or switch to `ws28p`',
      th: '`es3c28p` ไม่มี IMU — ใช้ **board_watch** หรือสลับเป็น `ws28p`',
    },
  },
  {
    see: { en: 'ImportError / `robotos` missing', th: 'ImportError / ไม่มี `robotos`' },
    do: {
      en: 'Activate `.venv` + pack wheel from the workshop root',
      th: 'activate `.venv` + wheel จากรากเวิร์กช็อป',
    },
  },
]

export const hw02Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-02-win-imu',
      num: 1,
      title: { en: '1. IMU watch (`ws28p`)', th: '1. IMU watch (`ws28p`)' },
      body: [
        {
          type: 'callout',
          boards: ['ws28p'],
          text: {
            en: '`scripts\\run.cmd` sets `ROBOTOS_CONNECT`. Tilt the board — accel should leave “table flat.” Open **Live** for IMU gauges.',
            th: '`scripts\\run.cmd` ตั้ง `ROBOTOS_CONNECT` ให้ เอียงบอร์ด — accel ควรออกจากแนวโต๊ะ เปิด **Live** ดูเกจ IMU',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          boards: ['es3c28p'],
          text: {
            en: 'Your board is `es3c28p` (no IMU). Skip this step — use board_watch below.',
            th: 'บอร์ด `es3c28p` ไม่มี IMU ข้ามขั้นนี้ — ใช้ board_watch ด้านล่าง',
          },
        },
        {
          type: 'code',
          boards: ['ws28p'],
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd hw-02 imu_watch`,
        },
      ],
    },
    {
      id: 'hw-02-win-board',
      num: 2,
      title: { en: '2. Board / battery watch', th: '2. Board / battery watch' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Works on both SKUs — battery / Wi‑Fi / `sys/board` fields.',
            th: 'ใช้ได้ทั้งสองรุ่น — แบต / Wi‑Fi / ฟิลด์ `sys/board`',
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
scripts\\run.cmd hw-02 board_watch`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-02.', th: 'จบ HW-02 บน Windows' },
}

export const hw02Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-02-mac-imu',
      num: 1,
      title: { en: '1. IMU watch (`ws28p`)', th: '1. IMU watch (`ws28p`)' },
      body: [
        {
          type: 'callout',
          boards: ['ws28p'],
          text: {
            en: '`./scripts/run` sets `ROBOTOS_CONNECT`. Tilt the board; use **Live** IMU gauges.',
            th: '`./scripts/run` ตั้ง `ROBOTOS_CONNECT` เอียงบอร์ด ใช้เกจ IMU ใน **Live**',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          boards: ['es3c28p'],
          text: {
            en: 'Your board is `es3c28p` (no IMU). Skip — use board_watch below.',
            th: 'บอร์ด `es3c28p` ไม่มี IMU ข้าม — ใช้ board_watch ด้านล่าง',
          },
        },
        {
          type: 'code',
          boards: ['ws28p'],
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-02 imu_watch`,
        },
      ],
    },
    {
      id: 'hw-02-mac-board',
      num: 2,
      title: { en: '2. Board / battery watch', th: '2. Board / battery watch' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-02 board_watch`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-02.', th: 'จบ HW-02 บน macOS' },
}

export const hw02Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-v0.3.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'hw-02-linux-imu',
      num: 1,
      title: { en: '1. IMU watch (`ws28p`)', th: '1. IMU watch (`ws28p`)' },
      body: [
        {
          type: 'callout',
          tone: 'warn',
          boards: ['es3c28p'],
          text: {
            en: '`es3c28p` has no IMU — skip to board_watch.',
            th: '`es3c28p` ไม่มี IMU — ข้ามไป board_watch',
          },
        },
        {
          type: 'code',
          boards: ['ws28p'],
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-02 imu_watch`,
        },
      ],
    },
    {
      id: 'hw-02-linux-board',
      num: 2,
      title: { en: '2. Board / battery watch', th: '2. Board / battery watch' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-02 board_watch`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-02.', th: 'จบ HW-02 บน Linux' },
}

export const HW02_TRACKS: OsTrack[] = [hw02Windows, hw02Macos, hw02Linux]

export function hw02ByOs(os: OsTrack['key']) {
  return HW02_TRACKS.find((t) => t.key === os) ?? hw02Windows
}
