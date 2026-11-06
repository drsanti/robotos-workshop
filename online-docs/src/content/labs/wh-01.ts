import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Sim **External** + **Native** + **Connect** (WH-00). Close serial-bridge. Stay in the workshop root — do not `cd` into `starter/`.',
  th: 'sim โหมด **External** + **Native** + **Connect** (WH-00) ปิด serial-bridge อยู่ที่รากเวิร์กช็อป — อย่า `cd` เข้า `starter/`',
} as const

const failures = [
  {
    see: { en: '`python` / `robotos` not found', th: 'หา `python` / `robotos` ไม่เจอ' },
    do: {
      en: 'Paste the PATH + activate block again in **this** window',
      th: 'วางบล็อก PATH + activate อีกครั้งในหน้าต่าง**นี้**',
    },
  },
  {
    see: { en: 'Script OK, robot still', th: 'สคริปต์รันได้ แต่หุ่นไม่ขยับ' },
    do: {
      en: 'UI still **Manual** → set **External**; confirm Connected / Native',
      th: 'UI ยังเป็น **Manual** → ตั้ง **External** แล้วตรวจ Connected / Native',
    },
  },
  {
    see: { en: '`ModuleNotFoundError: labs` / ImportError', th: '`ModuleNotFoundError: labs` / ImportError' },
    do: {
      en: 'Workshop root (`SETUP.md` beside `labs/`) + reinstall pack wheel into `.venv`',
      th: 'รากเวิร์กช็อป (`SETUP.md` ข้าง `labs/`) + ติดตั้ง wheel ใหม่ใน `.venv`',
    },
  },
]

const expectNote = {
  en: '**Expect:** `pub Twist vx=0.2 …` then `done — … cmds + zero`. Robot moves ~1 m forward and stops. Second command yaws in place.',
  th: '**คาดหวัง:** `pub Twist vx=0.2 …` แล้ว `done — … cmds + zero` หุ่นเดิน ~1 ม. แล้วหยุด คำสั่งที่สองหมุนอยู่กับที่',
} as const

export const wh01Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-01-win-drive',
      num: 1,
      title: { en: '1. Drive forward', th: '1. ขับไปข้างหน้า' },
      body: [
        {
          type: 'callout',
          text: {
            en: '`scripts\\run.cmd wh-01` runs the default starter. Watch the sim viewport / **Live** Topics for `cmd_vel`.',
            th: '`scripts\\run.cmd wh-01` รัน starter เริ่มต้น ดู viewport ใน sim / **Live** Topics สำหรับ `cmd_vel`',
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
scripts\\run.cmd wh-01`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-01-win-yaw',
      num: 2,
      title: { en: '2. Yaw in place (CLI flags)', th: '2. หมุนอยู่กับที่ (แฟล็ก CLI)' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Change motion with `--vx` / `--wz` / `--seconds` — no file edits.',
            th: 'เปลี่ยนการเคลื่อนที่ด้วย `--vx` / `--wz` / `--seconds` — ไม่ต้องแก้ไฟล์',
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
python labs\\wh\\wh-01-drive-twist\\starter\\drive_forward.py --wz 0.5 --vx 0 --seconds 2`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows WH-01.', th: 'จบ WH-01 บน Windows' },
}

export const wh01Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'wh-01-mac-drive',
      num: 1,
      title: { en: '1. Drive forward', th: '1. ขับไปข้างหน้า' },
      body: [
        {
          type: 'callout',
          text: {
            en: '`./scripts/run wh-01` runs the default starter. Watch the sim / **Live** for `cmd_vel`.',
            th: '`./scripts/run wh-01` รัน starter เริ่มต้น ดู sim / **Live** สำหรับ `cmd_vel`',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-01`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-01-mac-yaw',
      num: 2,
      title: { en: '2. Yaw in place (CLI flags)', th: '2. หมุนอยู่กับที่ (แฟล็ก CLI)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-01-drive-twist/starter/drive_forward.py --wz 0.5 --vx 0 --seconds 2`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS WH-01.', th: 'จบ WH-01 บน macOS' },
}

export const wh01Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux pack / sim is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มีแพ็ก / sim Linux ในดรอป',
  },
  lead,
  steps: [
    {
      id: 'wh-01-linux-drive',
      num: 1,
      title: { en: '1. Drive forward', th: '1. ขับไปข้างหน้า' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run wh-01`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'wh-01-linux-yaw',
      num: 2,
      title: { en: '2. Yaw in place (CLI flags)', th: '2. หมุนอยู่กับที่ (แฟล็ก CLI)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/wh/wh-01-drive-twist/starter/drive_forward.py --wz 0.5 --vx 0 --seconds 2`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux WH-01.', th: 'จบ WH-01 บน Linux' },
}

export const WH01_TRACKS: OsTrack[] = [wh01Windows, wh01Macos, wh01Linux]

export function wh01ByOs(os: OsTrack['key']) {
  return WH01_TRACKS.find((t) => t.key === os) ?? wh01Windows
}
