import type { OsTrack } from '../setup/types'

const lead = {
  en: 'No new starter — fork WH-05/06 (or your own) on **External** + **Native**. One Reset before the scored clock. Contract topics only (`docs/p0-contract.md`).',
  th: 'ไม่มี starter ใหม่ — แตกจาก WH-05/06 (หรือของตัวเอง) บน **External** + **Native** Reset ได้ครั้งเดียวก่อนนาฬิกา · ท็อปิกตามสัญญาเท่านั้น (`docs/p0-contract.md`)',
} as const

const failures = [
  {
    see: { en: 'Scored run ignores cmds', th: 'รอบให้คะแนนไม่รับคำสั่ง' },
    do: {
      en: 'Still **Manual** — switch to **External**',
      th: 'ยังเป็น **Manual** — สลับเป็น **External**',
    },
  },
  {
    see: { en: 'Weak evidence', th: 'หลักฐานอ่อน' },
    do: {
      en: 'Record odom+scan while scoring (WH-07) or keep FSM transition logs',
      th: 'บันทึก odom+scan ขณะให้คะแนน (WH-07) หรือเก็บ log transition ของ FSM',
    },
  },
  {
    see: { en: 'Instant fail into wall', th: 'ชนกำแพงทันที' },
    do: {
      en: 'Rehearse WH-03 / WH-05 first, then score',
      th: 'ซ้อม WH-03 / WH-05 ก่อน แล้วค่อยให้คะแนน',
    },
  },
]

const deliverNote = {
  en: '**Deliverables:** (1) script you ran · (2) evidence — transition log **or** WH-07 `bag info` · (3) 3-sentence note: what failed + what you’d tune.',
  th: '**ส่งงาน:** (1) สคริปต์ที่ใช้ · (2) หลักฐาน — log transition **หรือ** `bag info` จาก WH-07 · (3) โน้ต 3 ประโยค: อะไรพัง + จะจูนอะไร',
} as const

export const wh08Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Capstone adds no new command — reuse your WH env.',
    th: 'ใช้ **PowerShell** แคปสโตนไม่มีคำสั่งใหม่ — ใช้ env จากแล็บ WH เดิม',
  },
  lead,
  steps: [
    {
      id: 'wh-08-win-env',
      num: 1,
      title: { en: '1. Warm the workshop env', th: '1. เตรียม env เวิร์กช็อป' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
robotos topic list`,
        },
        {
          type: 'p',
          text: {
            en: 'Confirm sim Connected and topics include `/robot/01/cmd_vel`, `odom`, `scan`.',
            th: 'ตรวจว่า sim Connected และมี `/robot/01/cmd_vel`, `odom`, `scan`',
          },
        },
      ],
    },
    {
      id: 'wh-08-win-rehearse',
      num: 2,
      title: { en: '2. Rehearse (optional base)', th: '2. ซ้อม (ฐานทางเลือก)' },
      body: [
        {
          type: 'callout',
          text: {
            en: '**Tracks:** A Patrol (90 s, return near start) · B Clear aisle (wall-follow OK) · C Instructor goal. Many teams start from WH-06 FSM or WH-05.',
            th: '**แทร็ก:** A ลาดตระเวน (90 วินาที กลับใกล้จุดเริ่ม) · B เคลียร์ทางเดิน (wall-follow ได้) · C เป้าที่อาจารย์ประกาศ · หลายทีมเริ่มจาก WH-06 หรือ WH-05',
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
scripts\\run.cmd wh-06`,
        },
      ],
    },
    {
      id: 'wh-08-win-evidence',
      num: 3,
      title: { en: '3. Evidence while scoring', th: '3. หลักฐานขณะให้คะแนน' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Second terminal — record during the scored run (see WH-07). No Manual during the scored 90 s.',
            th: 'เทอร์มินัลที่สอง — บันทึกระหว่างรอบให้คะแนน (ดู WH-07) ห้าม Manual ใน 90 วินาทีที่ให้คะแนน',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
robotos record -o capstone.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after the scored run
robotos bag info capstone.rbag`,
        },
        { type: 'p', text: deliverNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-08.', th: 'จบ WH-08 บน Windows' },
}

export const wh08Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Capstone adds no new command — reuse your WH env.',
    th: 'ใช้ **Terminal** แคปสโตนไม่มีคำสั่งใหม่ — ใช้ env จากแล็บ WH เดิม',
  },
  lead,
  steps: [
    {
      id: 'wh-08-mac-env',
      num: 1,
      title: { en: '1. Warm the workshop env', th: '1. เตรียม env เวิร์กช็อป' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list`,
        },
      ],
    },
    {
      id: 'wh-08-mac-rehearse',
      num: 2,
      title: { en: '2. Rehearse (optional base)', th: '2. ซ้อม (ฐานทางเลือก)' },
      body: [
        {
          type: 'callout',
          text: {
            en: '**Tracks:** A Patrol · B Clear aisle · C Instructor goal. Base often WH-06 or WH-05.',
            th: '**แทร็ก:** A ลาดตระเวน · B เคลียร์ทางเดิน · C เป้าอาจารย์ · มักเริ่มจาก WH-06 หรือ WH-05',
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
./scripts/run wh-06`,
        },
      ],
    },
    {
      id: 'wh-08-mac-evidence',
      num: 3,
      title: { en: '3. Evidence while scoring', th: '3. หลักฐานขณะให้คะแนน' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos record -o capstone.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after the scored run
robotos bag info capstone.rbag`,
        },
        { type: 'p', text: deliverNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-08.', th: 'จบ WH-08 บน macOS' },
}

export const wh08Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-08-linux-env',
      num: 1,
      title: { en: '1. Warm the workshop env', th: '1. เตรียม env เวิร์กช็อป' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
robotos topic list`,
        },
      ],
    },
    {
      id: 'wh-08-linux-rehearse',
      num: 2,
      title: { en: '2. Rehearse (optional base)', th: '2. ซ้อม (ฐานทางเลือก)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-06`,
        },
      ],
    },
    {
      id: 'wh-08-linux-evidence',
      num: 3,
      title: { en: '3. Evidence while scoring', th: '3. หลักฐานขณะให้คะแนน' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos record -o capstone.rbag /robot/01/odom /robot/01/scan
# Ctrl-C after the scored run
robotos bag info capstone.rbag`,
        },
        { type: 'p', text: deliverNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-08.', th: 'จบ WH-08 บน Linux' },
}

export const WH08_TRACKS: OsTrack[] = [wh08Windows, wh08Macos, wh08Linux]

export function wh08ByOs(os: OsTrack['key']) {
  return WH08_TRACKS.find((t) => t.key === os) ?? wh08Windows
}
