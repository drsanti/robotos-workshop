import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Close the serial **bridge** first (port clash). Sim must show **Connected / Native**. Graded WH labs use Native, not Mock.',
  th: 'ปิด **bridge** ก่อน (พอร์ตชน) sim ต้องขึ้น **Connected / Native** แล็บ WH ที่ให้คะแนนใช้ Native ไม่ใช่ Mock',
} as const

const failures = [
  {
    see: { en: '`robotos` not found', th: 'หา `robotos` ไม่เจอ' },
    do: {
      en: 'Paste the PATH block again in **this** window',
      th: 'วางบล็อก PATH อีกครั้งในหน้าต่าง**นี้**',
    },
  },
  {
    see: { en: 'Empty `topic list`', th: '`topic list` ว่าง' },
    do: {
      en: 'Sim running and **Connected / Native**? Not Mock. Confirm Warehouse → Connect',
      th: 'sim รันและ **Connected / Native**? ไม่ใช่ Mock ตรวจ Warehouse → Connect',
    },
  },
  {
    see: { en: 'Echo idle / no odom samples', th: 'echo เงียบ / ไม่มี odom' },
    do: {
      en: 'Nudge the robot in **Manual** briefly, then echo again',
      th: 'ขยับหุ่นในโหมด **Manual** สั้นๆ แล้ว echo อีกครั้ง',
    },
  },
]

const expectNote = {
  en: '**Expect:** `/robot/01/cmd_vel`, `/robot/01/odom`, `/robot/01/scan` on the list. Echo prints odometry. Before WH-01, set sim to **External** (desktop builds often already did).',
  th: '**คาดหวัง:** รายการมี `/robot/01/cmd_vel`, `/robot/01/odom`, `/robot/01/scan` echo พิมพ์ odometry ก่อน WH-01 ตั้ง sim เป็น **External** (บิลด์เดสก์ท็อปมักตั้งไว้แล้ว)',
} as const

export const wh00Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-00-win-sim',
      num: 1,
      title: { en: '1. Start warehouse sim (if needed)', th: '1. เปิด warehouse sim (ถ้ายังไม่เปิด)' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Skip if the sim is already Connected. Do not restart it every PowerShell window.',
            th: 'ข้ามได้ถ้า sim Connected อยู่แล้ว อย่ารีสตาร์ททุกครั้งที่เปิด PowerShell',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'gui',
          template: `cd YOUR_WORKSHOP_DIR
Start-Process .\\code\\robotos-sim-v0.1.0-windows-x64\\robotos-sim.exe`,
        },
        {
          type: 'p',
          text: {
            en: 'Confirm **Connected / Native**. If not: **Warehouse → Native → External → Connect**.',
            th: 'ตรวจ **Connected / Native** ถ้าไม่ใช่: **Warehouse → Native → External → Connect**',
          },
        },
      ],
    },
    {
      id: 'wh-00-win-graph',
      num: 2,
      title: { en: '2. See the graph', th: '2. ดูกราฟ' },
      body: [
        {
          type: 'p',
          text: {
            en: 'No starter script for WH-00 — CLI only. Open **Live** Topics while you echo.',
            th: 'WH-00 ไม่มีสคริปต์ starter — ใช้ CLI อย่างเดียว เปิด **Live** Topics ขณะ echo',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
robotos topic list
robotos topic echo /robot/01/odom --count 5`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-00.', th: 'จบ WH-00 บน Windows' },
}

export const wh00Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-00-mac-sim',
      num: 1,
      title: { en: '1. Start warehouse sim (if needed)', th: '1. เปิด warehouse sim (ถ้ายังไม่เปิด)' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Skip if already Connected. First launch may need Finder → right-click → **Open**.',
            th: 'ข้ามได้ถ้า Connected แล้ว ครั้งแรกอาจต้อง Finder → คลิกขวา → **Open**',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'gui',
          template: `cd YOUR_WORKSHOP_DIR
open code/robotos-sim-v0.1.0-macos-arm64/robotos-sim.app`,
        },
        {
          type: 'p',
          text: {
            en: 'Confirm **Connected / Native**. If not: **Warehouse → Native → External → Connect**.',
            th: 'ตรวจ **Connected / Native** ถ้าไม่ใช่: **Warehouse → Native → External → Connect**',
          },
        },
      ],
    },
    {
      id: 'wh-00-mac-graph',
      num: 2,
      title: { en: '2. See the graph', th: '2. ดูกราฟ' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos topic list
robotos topic echo /robot/01/odom --count 5`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-00.', th: 'จบ WH-00 บน macOS' },
}

export const wh00Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-sim-v0.1.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-sim-v0.1.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'wh-00-linux-sim',
      num: 1,
      title: { en: '1. Start warehouse sim (if needed)', th: '1. เปิด warehouse sim (ถ้ายังไม่เปิด)' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Many class drops ship Windows/macOS sims only. If the Linux sim folder is missing, skip WH.',
            th: 'แพ็กในคลาสหลายชุดมีแค่ sim Windows/macOS ถ้าไม่มีโฟลเดอร์ Linux ให้ข้าม WH',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'gui',
          template: `cd YOUR_WORKSHOP_DIR
chmod +x code/robotos-sim-v0.1.0-linux-x64/robotos-sim
./code/robotos-sim-v0.1.0-linux-x64/robotos-sim &`,
        },
      ],
    },
    {
      id: 'wh-00-linux-graph',
      num: 2,
      title: { en: '2. See the graph', th: '2. ดูกราฟ' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos topic list
robotos topic echo /robot/01/odom --count 5`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-00.', th: 'จบ WH-00 บน Linux' },
}

export const WH00_TRACKS: OsTrack[] = [wh00Windows, wh00Macos, wh00Linux]

export function wh00ByOs(os: OsTrack['key']) {
  return WH00_TRACKS.find((t) => t.key === os) ?? wh00Windows
}
