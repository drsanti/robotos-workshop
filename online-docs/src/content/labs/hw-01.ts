import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Bridge must already be running (HW-00). This lab is the **probe** window only — paste the whole block.',
  th: 'ต้องเปิด bridge อยู่แล้ว (HW-00) แล็บนี้เป็นหน้าต่าง**probe** อย่างเดียว — วางทั้งบล็อก',
} as const

const failures = [
  {
    see: { en: 'Timeout / no BoardInfo', th: 'Timeout / ไม่มี BoardInfo' },
    do: {
      en: 'Bridge up? USB? Same host/port as `ROBOTOS_CONNECT`? Close the warehouse sim first.',
      th: 'bridge รันอยู่? USB? host/port ตรงกับ `ROBOTOS_CONNECT`? ปิด warehouse sim ก่อน',
    },
  },
  {
    see: { en: 'Caps all `no`', th: 'caps เป็น `no` หมด' },
    do: {
      en: 'Unexpected firmware — check `fw_version` / reflash matching `es3c28p` or `ws28p`',
      th: 'เฟิร์มแวร์ไม่ตรง — ดู `fw_version` / แฟลชให้ตรง `es3c28p` หรือ `ws28p`',
    },
  },
  {
    see: { en: '`ModuleNotFoundError: labs` / import errors', th: '`ModuleNotFoundError: labs` / import พัง' },
    do: {
      en: 'Activate `.venv` from the workshop root (folder with `SETUP.md` + `labs/`)',
      th: 'activate `.venv` จากรากเวิร์กช็อป (โฟลเดอร์ที่มี `SETUP.md` + `labs/`)',
    },
  },
]

const expectNote = {
  en: '**Expect:** `hw_model=…` and `caps=0x..` with yes/no for LED / MIC / IMU / RTC / BATT / BTN. `ws28p` ≈ `0x3c` (IMU+RTC; no LED). `es3c28p` ≈ `0x33` (LED+mic; no IMU).',
  th: '**คาดหวัง:** `hw_model=…` และ `caps=0x..` พร้อม yes/no สำหรับ LED / MIC / IMU / RTC / BATT / BTN — `ws28p` ≈ `0x3c` · `es3c28p` ≈ `0x33`',
} as const

export const hw01Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-01-win-probe',
      num: 1,
      title: { en: '1. Probe (terminal B)', th: '1. Probe (เทอร์มินัล B)' },
      body: [
        {
          type: 'callout',
          text: {
            en: '`scripts\\run.cmd hw-01` sets `ROBOTOS_CONNECT` for you. Keep the bridge (HW-00) in another window.',
            th: '`scripts\\run.cmd hw-01` ตั้ง `ROBOTOS_CONNECT` ให้ คุณเปิด bridge (HW-00) ค้างอีกหน้าต่าง',
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
scripts\\run.cmd hw-01`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-01-win-manual',
      num: 2,
      title: { en: '2. Manual fallback (optional)', th: '2. ทางเลือกลงมือเอง (ถ้า TA ขอ)' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
python labs\\hw\\hw-01-caps-probe\\starter\\caps_probe.py`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-01.', th: 'จบ HW-01 บน Windows' },
}

export const hw01Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-01-mac-probe',
      num: 1,
      title: { en: '1. Probe (terminal B)', th: '1. Probe (เทอร์มินัล B)' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Keep `./scripts/start-bridge.sh` (or HW-00 bridge) running. `./scripts/run hw-01` sets `ROBOTOS_CONNECT`.',
            th: 'เปิด `./scripts/start-bridge.sh` (หรือ bridge จาก HW-00) ค้างไว้ `./scripts/run hw-01` จะตั้ง `ROBOTOS_CONNECT`',
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
./scripts/run hw-01`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-01-mac-manual',
      num: 2,
      title: { en: '2. Manual fallback (optional)', th: '2. ทางเลือกลงมือเอง (ถ้า TA ขอ)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
python labs/hw/hw-01-caps-probe/starter/caps_probe.py`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-01.', th: 'จบ HW-01 บน macOS' },
}

export const hw01Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-v0.3.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'hw-01-linux-probe',
      num: 1,
      title: { en: '1. Probe (terminal B)', th: '1. Probe (เทอร์มินัล B)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
./scripts/run hw-01`,
        },
        { type: 'p', text: expectNote },
      ],
    },
    {
      id: 'hw-01-linux-manual',
      num: 2,
      title: { en: '2. Manual fallback (optional)', th: '2. ทางเลือกลงมือเอง (ถ้า TA ขอ)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
python labs/hw/hw-01-caps-probe/starter/caps_probe.py`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-01.', th: 'จบ HW-01 บน Linux' },
}

export const HW01_TRACKS: OsTrack[] = [hw01Windows, hw01Macos, hw01Linux]

export function hw01ByOs(os: OsTrack['key']) {
  return HW01_TRACKS.find((t) => t.key === os) ?? hw01Windows
}
