import type { OsTrack } from '../setup/types'

const lead = {
  en: 'Bridge must be up with `--cmd-topic all` (HW-00). Check caps with HW-01 first.',
  th: 'ต้องเปิด bridge ด้วย `--cmd-topic all` (HW-00) และตรวจ caps ด้วย HW-01 ก่อน',
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
    boards: ['ws28p' as const],
    see: { en: 'LED does nothing', th: 'LED ไม่ทำงาน' },
    do: {
      en: '`ws28p` has no LED cap — use Live wave / tone, or switch to `es3c28p`',
      th: '`ws28p` ไม่มี LED — ใช้ wave/tone หรือสลับเป็น `es3c28p`',
    },
  },
  {
    boards: ['es3c28p' as const],
    see: { en: 'LED command OK but no light', th: 'ส่ง LED แล้วแต่ไม่มีแสง' },
    do: {
      en: 'Confirm bridge `--cmd-topic all`, Live LED caps, and flash matching firmware',
      th: 'ตรวจ bridge `--cmd-topic all`, caps ใน Live และเฟิร์มแวร์ที่ตรงรุ่น',
    },
  },
]

export const hw03Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Paste each whole block.',
    th: 'ใช้ **PowerShell** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-03-win-led',
      num: 1,
      title: { en: '1. LED fx (`es3c28p`)', th: '1. LED fx (`es3c28p`)' },
      body: [
        {
          type: 'callout',
          boards: ['es3c28p'],
          text: {
            en: 'Open **Live graph** → LED chips (Off / Solid / Blink / Rainbow) while the script runs — or use the script alone.',
            th: 'เปิด **Live graph** → ปุ่ม LED ขณะรันสคริปต์ หรือใช้สคริปต์อย่างเดียว',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          boards: ['ws28p'],
          text: {
            en: 'Your board is `ws28p` (no LED). Skip this step — use wave below, or switch **Your board** / plug `es3c28p`.',
            th: 'บอร์ด `ws28p` ไม่มี LED ข้ามขั้นนี้ — ใช้ wave ด้านล่าง หรือสลับบอร์ดเป็น `es3c28p`',
          },
        },
        {
          type: 'code',
          boards: ['es3c28p'],
          fence: 'powershell',
          runKind: 'oneshot',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
python labs\\hw\\hw-03-command-actuators\\starter\\led_fx.py solid 0 40 0
python labs\\hw\\hw-03-command-actuators\\starter\\led_fx.py blink 5 120 120 255 0 0
python labs\\hw\\hw-03-command-actuators\\starter\\led_fx.py off`,
        },
      ],
    },
    {
      id: 'hw-03-win-wave',
      num: 2,
      title: { en: '2. Wave / tone', th: '2. Wave / โทน' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Works on both board variants when the bridge forwards cmds.',
            th: 'ใช้ได้ทั้งสองรุ่นบอร์ดเมื่อ bridge ส่งคำสั่งต่อ',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          runKind: 'oneshot',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
python labs\\hw\\hw-03-command-actuators\\starter\\wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs\\hw\\hw-03-command-actuators\\starter\\wave_play.py --off`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Windows HW-03.', th: 'จบ HW-03 บน Windows' },
}

export const hw03Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** (zsh/bash). Paste each whole block.',
    th: 'ใช้ **Terminal** วางทั้งบล็อกทุกครั้ง',
  },
  lead,
  steps: [
    {
      id: 'hw-03-mac-led',
      num: 1,
      title: { en: '1. LED fx (`es3c28p`)', th: '1. LED fx (`es3c28p`)' },
      body: [
        {
          type: 'callout',
          boards: ['es3c28p'],
          text: {
            en: 'Open **Live graph** → LED chips while the script runs — or drive LEDs from Live alone.',
            th: 'เปิด **Live graph** → ปุ่ม LED ขณะรันสคริปต์ หรือสั่งจาก Live อย่างเดียว',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          boards: ['ws28p'],
          text: {
            en: 'Your board is `ws28p` (no LED). Skip this step — use wave below.',
            th: 'บอร์ด `ws28p` ไม่มี LED ข้ามขั้นนี้ — ใช้ wave ด้านล่าง',
          },
        },
        {
          type: 'code',
          boards: ['es3c28p'],
          fence: 'bash',
          runKind: 'oneshot',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/led_fx.py solid 0 40 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py blink 5 120 120 255 0 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py off`,
        },
      ],
    },
    {
      id: 'hw-03-mac-wave',
      num: 2,
      title: { en: '2. Wave / tone', th: '2. Wave / โทน' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs/hw/hw-03-command-actuators/starter/wave_play.py --off`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of macOS HW-03.', th: 'จบ HW-03 บน macOS' },
}

export const hw03Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip when the Linux CLI pack is missing.',
    th: 'ใช้ **bash** ข้ามได้ถ้าไม่มีแพ็ก Linux CLI',
  },
  lead,
  steps: [
    {
      id: 'hw-03-linux-led',
      num: 1,
      title: { en: '1. LED fx (`es3c28p`)', th: '1. LED fx (`es3c28p`)' },
      body: [
        {
          type: 'callout',
          boards: ['ws28p'],
          tone: 'warn',
          text: {
            en: '`ws28p` has no LED — skip to wave.',
            th: '`ws28p` ไม่มี LED — ข้ามไป wave',
          },
        },
        {
          type: 'code',
          boards: ['es3c28p'],
          fence: 'bash',
          runKind: 'oneshot',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/led_fx.py solid 0 40 0
python labs/hw/hw-03-command-actuators/starter/led_fx.py off`,
        },
      ],
    },
    {
      id: 'hw-03-linux-wave',
      num: 2,
      title: { en: '2. Wave / tone', th: '2. Wave / โทน' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          runKind: 'oneshot',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
source .venv/bin/activate
python labs/hw/hw-03-command-actuators/starter/wave_play.py --hz 440 --amp 0.4 --cycles 20
python labs/hw/hw-03-command-actuators/starter/wave_play.py --off`,
        },
      ],
    },
  ],
  failures,
  end: { en: 'End of Linux HW-03.', th: 'จบ HW-03 บน Linux' },
}

export const HW03_TRACKS: OsTrack[] = [hw03Windows, hw03Macos, hw03Linux]

export function hw03ByOs(os: OsTrack['key']) {
  return HW03_TRACKS.find((t) => t.key === os) ?? hw03Windows
}
