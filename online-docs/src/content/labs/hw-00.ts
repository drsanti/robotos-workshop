import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Two terminals: **A** runs `serial-bridge` (leave open); **B** connects and echoes `/robot/01/sys/board`. Prefer `scripts/start-bridge` when available.',
  th: 'สองเทอร์มินัล: **A** รัน `serial-bridge` (เปิดค้าง); **B** เชื่อมแล้ว echo `/robot/01/sys/board` ใช้ `scripts/start-bridge` ได้ถ้ามี',
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
    see: { en: 'No topics / empty list', th: 'ไม่มีท็อปิก / รายการว่าง' },
    do: {
      en: 'Bridge still up? USB plugged? `ROBOTOS_CONNECT` set in the lab window (not LISTEN+CONNECT together)?',
      th: 'bridge ยังรันอยู่? เสียบ USB? ตั้ง `ROBOTOS_CONNECT` ในหน้าต่างแล็บ (อย่าใส่ LISTEN+CONNECT พร้อมกัน)?',
    },
  },
  {
    see: { en: 'Port busy / open failed', th: 'พอร์ตไม่ว่าง / เปิดไม่ได้' },
    do: {
      en: 'Close other serial monitors or bridges, then restart bridge',
      th: 'ปิด serial monitor หรือ bridge อื่น แล้วเปิด bridge ใหม่',
    },
  },
  {
    see: { en: 'Linux permission denied', th: 'Linux ถูกปฏิเสธสิทธิ์' },
    do: {
      en: '`sudo usermod -aG dialout $USER` then log out/in',
      th: '`sudo usermod -aG dialout $USER` แล้วออกจากระบบ/เข้าใหม่',
    },
  },
]

export const hw00Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-00-win-bridge',
      num: 1,
      title: { en: '1. Bridge (terminal A)', th: '1. Bridge (เทอร์มินัล A)' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave this terminal open. Or double-click `scripts\\start-bridge.cmd`.',
            th: 'เปิดค้างหน้าต่างนี้ หรือดับเบิลคลิก `scripts\\start-bridge.cmd`',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'persistent',
          session: 'bridge',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
$env:ROBOTOS_LISTEN = "tcp/0.0.0.0:7447"
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
# or: serial-bridge --port COM7 --baud 921600 --robot-id 01 --cmd-topic all`,
        },
      ],
    },
    {
      id: 'hw-00-win-echo',
      num: 2,
      title: { en: '2. Practice (terminal B)', th: '2. ฝึก (เทอร์มินัล B)' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
Remove-Item Env:ROBOTOS_LISTEN -ErrorAction SilentlyContinue
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
robotos node list
robotos topic list
robotos topic echo /robot/01/sys/board --count 3`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `topic list` shows `/robot/01/sys/board` (often IMU/battery too). Echo prints `BoardInfo { … }`. Open **Live** to confirm the board while the bridge runs.',
            th: '**คาดหวัง:** `topic list` มี `/robot/01/sys/board` (มักมี IMU/แบตด้วย) echo พิมพ์ `BoardInfo { … }` เปิด **Live** ตรวจบอร์ดขณะ bridge รัน',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-00.', th: 'จบ HW-00 บน Windows' },
}

export const hw00Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-00-mac-bridge',
      num: 1,
      title: { en: '1. Bridge (terminal A)', th: '1. Bridge (เทอร์มินัล A)' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave this terminal open. Or run `./scripts/start-bridge.sh` from the workshop folder.',
            th: 'เปิดค้างหน้าต่างนี้ หรือรัน `./scripts/start-bridge.sh` จากโฟลเดอร์เวิร์กช็อป',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'bridge',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x code/robotos-v*/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
# If auto skips /dev/cu.usbmodem* , pin the "[auto] selected" path.`,
        },
      ],
    },
    {
      id: 'hw-00-mac-echo',
      num: 2,
      title: { en: '2. Practice (terminal B)', th: '2. ฝึก (เทอร์มินัล B)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
unset ROBOTOS_LISTEN
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
robotos node list
robotos topic list
robotos topic echo /robot/01/sys/board --count 3`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `topic list` shows `/robot/01/sys/board`. Echo prints `BoardInfo { … }`. Open **Live** while the bridge runs.',
            th: '**คาดหวัง:** `topic list` มี `/robot/01/sys/board` echo พิมพ์ `BoardInfo { … }` เปิด **Live** ขณะ bridge รัน',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-00.', th: 'จบ HW-00 บน macOS' },
}

export const hw00Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามถ้าไม่มี `code/robotos-v0.3.0-linux-x64` ในแพ็ก',
  },
  lead,
  steps: [
    {
      id: 'hw-00-linux-bridge',
      num: 1,
      title: { en: '1. Bridge (terminal A)', th: '1. Bridge (เทอร์มินัล A)' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Leave this terminal open. Or run `./scripts/start-bridge.sh`.',
            th: 'เปิดค้างหน้าต่างนี้ หรือรัน `./scripts/start-bridge.sh`',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          runKind: 'persistent',
          session: 'bridge',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_LISTEN=tcp/0.0.0.0:7447
chmod +x code/robotos-v*/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all
# or: --port /dev/ttyACM0`,
        },
      ],
    },
    {
      id: 'hw-00-linux-echo',
      num: 2,
      title: { en: '2. Practice (terminal B)', th: '2. ฝึก (เทอร์มินัล B)' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
unset ROBOTOS_LISTEN
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
robotos node list
robotos topic list
robotos topic echo /robot/01/sys/board --count 3`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `/robot/01/sys/board` on `topic list` and a `BoardInfo` echo. Permission denied → `dialout` + re-login.',
            th: '**คาดหวัง:** มี `/robot/01/sys/board` และ echo เป็น `BoardInfo` — ถ้าถูกปฏิเสธสิทธิ์ ให้เข้า `dialout` แล้วล็อกอินใหม่',
          },
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-00.', th: 'จบ HW-00 บน Linux' },
}

export const HW00_TRACKS: OsTrack[] = [hw00Windows, hw00Macos, hw00Linux]

export function hw00ByOs(os: OsTrack['key']) {
  return HW00_TRACKS.find((t) => t.key === os) ?? hw00Windows
}
