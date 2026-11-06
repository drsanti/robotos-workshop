import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Bridge up with `--cmd-topic all` (HW-00). Close warehouse sim. `scripts/run` sets `ROBOTOS_CONNECT`. Param names differ by board (e.g. mic.* on es3c28p; rtc on ws28p).',
  th: 'เปิด bridge ด้วย `--cmd-topic all` (HW-00) ปิด warehouse sim · `scripts/run` ตั้ง `ROBOTOS_CONNECT` · ชื่อพารามิเตอร์ต่างกันตามบอร์ด (เช่น mic.* บน es3c28p · rtc บน ws28p)',
} as const

const failures = [
  {
    see: { en: 'Empty list / timeout', th: 'list ว่าง / timeout' },
    do: {
      en: 'Bridge up? `ROBOTOS_CONNECT`? `--cmd-topic all`?',
      th: 'bridge รัน? `ROBOTOS_CONNECT`? `--cmd-topic all`?',
    },
  },
  {
    see: { en: 'Persist ignored', th: 'persist ไม่ติด' },
    do: {
      en: 'That param may not be NVM-backed on this firmware',
      th: 'พารามิเตอร์นั้นอาจไม่เก็บใน NVM บนเฟิร์มแวร์นี้',
    },
  },
  {
    see: { en: 'Set rejected', th: 'set ถูกปฏิเสธ' },
    do: {
      en: 'Wrong type/range — read the command error; pick a name from `list`',
      th: 'ชนิด/ช่วงผิด — อ่านข้อความ error เลือกชื่อจาก `list`',
    },
  },
]

const expectNote = {
  en: '**Expect:** `list` prints names; after `set`, `get` shows the new value. Stretch: `--persist`, unplug/replug, `get` again.',
  th: '**คาดหวัง:** `list` พิมพ์ชื่อ · หลัง `set` ให้ `get` เห็นค่าใหม่ · ขั้นสูง: `--persist` ถอดปลั๊กแล้ว `get` อีกครั้ง',
} as const

export const hw04Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-04-win-list',
      num: 1,
      title: { en: '1. List parameters', th: '1. รายการพารามิเตอร์' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Copy a `<name>` from the output for the next steps.',
            th: 'คัดลอก `<name>` จากผลลัพธ์ไปใช้ขั้นถัดไป',
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
scripts\\run.cmd hw-04 list`,
        },
      ],
    },
    {
      id: 'hw-04-win-getset',
      num: 2,
      title: { en: '2. Get / set (then verify)', th: '2. Get / set (แล้วตรวจ)' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Replace `PARAM_NAME` / `VALUE` with entries from `list` (uplink / wifi / board-specific fields as shipped).',
            th: 'แทน `PARAM_NAME` / `VALUE` ด้วยรายการจาก `list` (uplink / wifi / ฟิลด์ตามบอร์ดตามที่แพ็กส่งมา)',
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
scripts\\run.cmd hw-04 get PARAM_NAME
scripts\\run.cmd hw-04 set PARAM_NAME VALUE
scripts\\run.cmd hw-04 get PARAM_NAME`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-04-win-persist',
      num: 3,
      title: { en: '3. Persist (stretch)', th: '3. Persist (ขั้นสูง)' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
scripts\\run.cmd hw-04 set PARAM_NAME VALUE --persist`,
        },
        {
          type: 'p',
          text: {
            en: 'Unplug/replug USB, restart bridge, then `get` again.',
            th: 'ถอด/เสียบ USB ใหม่ เปิด bridge ใหม่ แล้ว `get` อีกครั้ง',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-04.', th: 'จบ HW-04 บน Windows' },
}

export const hw04Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-04-mac-list',
      num: 1,
      title: { en: '1. List parameters', th: '1. รายการพารามิเตอร์' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-04 list`,
        },
      ],
    },
    {
      id: 'hw-04-mac-getset',
      num: 2,
      title: { en: '2. Get / set (then verify)', th: '2. Get / set (แล้วตรวจ)' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Replace `PARAM_NAME` / `VALUE` from `list` output.',
            th: 'แทน `PARAM_NAME` / `VALUE` จากผล `list`',
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
./scripts/run hw-04 get PARAM_NAME
./scripts/run hw-04 set PARAM_NAME VALUE
./scripts/run hw-04 get PARAM_NAME`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-04-mac-persist',
      num: 3,
      title: { en: '3. Persist (stretch)', th: '3. Persist (ขั้นสูง)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-04 set PARAM_NAME VALUE --persist`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-04.', th: 'จบ HW-04 บน macOS' },
}

export const hw04Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-v0.3.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'hw-04-linux-list',
      num: 1,
      title: { en: '1. List parameters', th: '1. รายการพารามิเตอร์' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-04 list`,
        },
      ],
    },
    {
      id: 'hw-04-linux-getset',
      num: 2,
      title: { en: '2. Get / set (then verify)', th: '2. Get / set (แล้วตรวจ)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-04 get PARAM_NAME
./scripts/run hw-04 set PARAM_NAME VALUE
./scripts/run hw-04 get PARAM_NAME`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-04-linux-persist',
      num: 3,
      title: { en: '3. Persist (stretch)', th: '3. Persist (ขั้นสูง)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-04 set PARAM_NAME VALUE --persist`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-04.', th: 'จบ HW-04 บน Linux' },
}

export const HW04_TRACKS: OsTrack[] = [hw04Windows, hw04Macos, hw04Linux]

export function hw04ByOs(os: OsTrack['key']) {
  return HW04_TRACKS.find((t) => t.key === os) ?? hw04Windows
}
