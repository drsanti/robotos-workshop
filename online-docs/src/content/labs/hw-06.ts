import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Bridge streaming (HW-00). Same bag workflow as WH-07, on silicon. Pick topics your **caps** publish.',
  th: 'bridge สตรีมอยู่ (HW-00) เวิร์กโฟลว์ bag เดียวกับ WH-07 แต่บนซิลิคอน เลือกท็อปิกที่ **caps** ของคุณ publish',
} as const

const failures = [
  {
    see: { en: 'Empty bag', th: 'bag ว่าง' },
    do: {
      en: 'Bridge down? `ROBOTOS_CONNECT`? Any publisher on those topics?',
      th: 'bridge ดับ? `ROBOTOS_CONNECT`? มี publisher บนท็อปิกเหล่านั้นไหม?',
    },
  },
  {
    boards: ['es3c28p' as const],
    see: { en: 'IMU missing / empty', th: 'ไม่มี IMU / ว่าง' },
    do: {
      en: '`es3c28p` has no IMU — record `sys/board` / battery instead',
      th: '`es3c28p` ไม่มี IMU — บันทึก `sys/board` / แบตแทน',
    },
  },
]

const expectNote = {
  en: '**Expect:** `bag info` lists the topics you recorded with non-zero counts. Ctrl-C after ~20 s.',
  th: '**คาดหวัง:** `bag info` แสดงท็อปิกที่บันทึกพร้อมจำนวนที่ไม่เป็นศูนย์ · Ctrl-C หลัง ~20 วินาที',
} as const

export const hw06Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-06-win-record',
      num: 1,
      title: { en: '1. Record board topics', th: '1. บันทึกท็อปิกบอร์ด' },
      body: [
        {
          type: 'callout',
          boards: ['ws28p'],
          text: {
            en: '`ws28p` — include IMU. Leave bridge streaming (or HW-02 watchers).',
            th: '`ws28p` — รวม IMU เปิด bridge สตรีม (หรือ watcher จาก HW-02)',
          },
        },
        {
          type: 'callout',
          boards: ['es3c28p'],
          tone: 'warn',
          text: {
            en: '`es3c28p` — no IMU. Record `sys/board` + battery instead.',
            th: '`es3c28p` — ไม่มี IMU บันทึก `sys/board` + แบตแทน',
          },
        },
        {
          type: 'code',
          boards: ['ws28p'],
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag`,
        },
        {
          type: 'code',
          boards: ['es3c28p'],
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
robotos record -o board_run.rbag /robot/01/sys/board /robot/01/sensor/battery
# Ctrl-C after ~20 s
robotos bag info board_run.rbag`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-06.', th: 'จบ HW-06 บน Windows' },
}

export const hw06Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-06-mac-record',
      num: 1,
      title: { en: '1. Record board topics', th: '1. บันทึกท็อปิกบอร์ด' },
      body: [
        {
          type: 'callout',
          boards: ['ws28p'],
          text: {
            en: '`ws28p` — include IMU. Bridge must be streaming.',
            th: '`ws28p` — รวม IMU ต้องมี bridge สตรีม',
          },
        },
        {
          type: 'callout',
          boards: ['es3c28p'],
          tone: 'warn',
          text: {
            en: '`es3c28p` — no IMU; use board + battery.',
            th: '`es3c28p` — ไม่มี IMU ใช้ board + แบต',
          },
        },
        {
          type: 'code',
          boards: ['ws28p'],
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag`,
        },
        {
          type: 'code',
          boards: ['es3c28p'],
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
robotos record -o board_run.rbag /robot/01/sys/board /robot/01/sensor/battery
# Ctrl-C after ~20 s
robotos bag info board_run.rbag`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-06.', th: 'จบ HW-06 บน macOS' },
}

export const hw06Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-v0.3.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'hw-06-linux-record',
      num: 1,
      title: { en: '1. Record board topics', th: '1. บันทึกท็อปิกบอร์ด' },
      body: [
        {
          type: 'code',
          boards: ['ws28p'],
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
robotos record -o board_run.rbag /robot/01/sensor/imu /robot/01/sys/board
# Ctrl-C after ~20 s
robotos bag info board_run.rbag`,
        },
        {
          type: 'code',
          boards: ['es3c28p'],
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
robotos record -o board_run.rbag /robot/01/sys/board /robot/01/sensor/battery
# Ctrl-C after ~20 s
robotos bag info board_run.rbag`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-06.', th: 'จบ HW-06 บน Linux' },
}

export const HW06_TRACKS: OsTrack[] = [hw06Windows, hw06Macos, hw06Linux]

export function hw06ByOs(os: OsTrack['key']) {
  return HW06_TRACKS.find((t) => t.key === os) ?? hw06Windows
}
