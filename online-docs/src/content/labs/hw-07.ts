import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Bridge with `--cmd-topic all` (HW-00). Branch on HW-01 caps: IMU+LED → tilt lights LED; IMU-only → `TILT`/`LEVEL` console; LED-only → instructor battery/param map.',
  th: 'bridge ด้วย `--cmd-topic all` (HW-00) แตกตาม caps จาก HW-01: IMU+LED → เอียงแล้วติด LED · มีแค่ IMU → พิมพ์ `TILT`/`LEVEL` · มีแค่ LED → ตามที่อาจารย์กำหนด',
} as const

const failures = [
  {
    see: { en: 'No prints', th: 'ไม่มีข้อความ' },
    do: {
      en: 'Bridge / IMU cap / `ROBOTOS_CONNECT`?',
      th: 'bridge / caps IMU / `ROBOTOS_CONNECT`?',
    },
  },
  {
    boards: ['ws28p' as const],
    see: { en: 'LED dark with TILT', th: 'มี TILT แต่ LED มืด' },
    do: {
      en: '`ws28p` has no LED — console `TILT`/`LEVEL` still counts',
      th: '`ws28p` ไม่มี LED — console `TILT`/`LEVEL` ก็ผ่าน',
    },
  },
  {
    see: { en: 'Forgot `--cmd-topic all`', th: 'ลืม `--cmd-topic all`' },
    do: {
      en: 'Restart bridge with that flag (HW-00)',
      th: 'เปิด bridge ใหม่พร้อมแฟล็กนั้น (HW-00)',
    },
  },
]

const expectNote = {
  en: '**Expect:** `tilt>… → LED; level → off` (or console-only). Tilt the board — see `TILT` / `LEVEL`. Zero/off on exit when LEDs are used. Ctrl-C to stop.',
  th: '**คาดหวัง:** `tilt>… → LED; level → off` (หรือ console อย่างเดียว) เอียงบอร์ด — เห็น `TILT` / `LEVEL` · ปิด LED เมื่อจบถ้ามีการสั่ง · Ctrl-C เพื่อหยุด',
} as const

export const hw07Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-07-win-loop',
      num: 1,
      title: { en: '1. Closed loop sense → actuate', th: '1. ลูปปิด sense → actuate' },
      body: [
        {
          type: 'callout',
          boards: ['ws28p'],
          text: {
            en: '`ws28p` — IMU path; LED publish may be a no-op. Console state still counts. Open **Live**.',
            th: '`ws28p` — ใช้ IMU · ส่ง LED อาจไม่ติด · สถานะบน console ก็ผ่าน เปิด **Live**',
          },
        },
        {
          type: 'callout',
          boards: ['es3c28p'],
          text: {
            en: '`es3c28p` — typically LED without IMU; starter may use battery/param branch or console. Confirm with HW-01.',
            th: '`es3c28p` — มักมี LED ไม่มี IMU starter อาจใช้แบต/พารามิเตอร์หรือ console ยืนยันด้วย HW-01',
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
scripts\\run.cmd hw-07`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-07.', th: 'จบ HW-07 บน Windows' },
}

export const hw07Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-07-mac-loop',
      num: 1,
      title: { en: '1. Closed loop sense → actuate', th: '1. ลูปปิด sense → actuate' },
      body: [
        {
          type: 'callout',
          boards: ['ws28p'],
          text: {
            en: '`ws28p` — IMU → console (LED no-op OK).',
            th: '`ws28p` — IMU → console (LED ไม่ติดก็ได้)',
          },
        },
        {
          type: 'callout',
          boards: ['es3c28p'],
          text: {
            en: '`es3c28p` — check HW-01 caps; LED path when available.',
            th: '`es3c28p` — ดู caps จาก HW-01 · ใช้ LED เมื่อมี',
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
./scripts/run hw-07`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-07.', th: 'จบ HW-07 บน macOS' },
}

export const hw07Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-v0.3.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'hw-07-linux-loop',
      num: 1,
      title: { en: '1. Closed loop sense → actuate', th: '1. ลูปปิด sense → actuate' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-07`,
        },
        { type: 'p', text: expectNote },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-07.', th: 'จบ HW-07 บน Linux' },
}

export const HW07_TRACKS: OsTrack[] = [hw07Windows, hw07Macos, hw07Linux]

export function hw07ByOs(os: OsTrack['key']) {
  return HW07_TRACKS.find((t) => t.key === os) ?? hw07Windows
}
