import type { OsTrack } from './types'

export const windowsTrack: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Stay in this track until the end.',
    th: 'ใช้ **PowerShell** อยู่กับแทร็กนี้จนจบ',
  },
  lead: {
    en: 'Use **PowerShell**. Press the `Win` key, type `PowerShell`, and press `Enter`. Stay in this section until you are done.',
    th: 'ใช้ **PowerShell** กดปุ่ม `Win` พิมพ์ `PowerShell` แล้วกด `Enter` อยู่กับส่วนนี้จนจบ',
  },
  steps: [
    {
      id: 'win-step-1',
      num: 1,
      title: { en: '1. Check `robotos`', th: '1. ตรวจ `robotos`' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
Get-Command robotos
robotos version`,
        },
        {
          type: 'p',
          text: {
            en: 'Expect `robotos 0.3.0` (any `0.3.x` is fine).',
            th: 'ควรได้ `robotos 0.3.0` (เวอร์ชัน `0.3.x` ก็ใช้ได้)',
          },
        },
        {
          type: 'p',
          text: {
            en: 'Once per machine you can double-click `scripts/start-here.cmd`. That creates `.venv`, installs the wheel, and starts the sim. The next **PowerShell** window is still blank. Paste the blocks below again.',
            th: 'ครั้งแรกต่อเครื่อง สามารถดับเบิลคลิก `scripts/start-here.cmd` ได้ จะสร้าง `.venv` ติดตั้ง wheel และเปิด sim แต่หน้าต่าง **PowerShell** ถัดไปยังว่างอยู่ ต้องวางบล็อกด้านล่างอีกครั้ง',
          },
        },
      ],
    },
    {
      id: 'win-step-2',
      num: 2,
      title: { en: '2. Python', th: '2. Python' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Python 3.10 or newer, from python.org. Tick **Add python.exe to PATH** during install.',
            th: 'ใช้ Python 3.10 ขึ้นไป จาก python.org ตอนติดตั้งให้ติ๊ก **Add python.exe to PATH**',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          template: `cd YOUR_WORKSHOP_DIR
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
python -m pip install -U pip
python -m pip install .\\code\\robotos-0.3.0-py3-none-win_amd64.whl
python -c "import robotos; print(robotos.Node.version())"`,
        },
        {
          type: 'p',
          text: {
            en: 'If `.venv` already exists, start at `.\\.venv\\Scripts\\Activate.ps1`. The prompt should show `(.venv)`.',
            th: 'ถ้ามี `.venv` อยู่แล้ว ให้เริ่มที่ `.\\.venv\\Scripts\\Activate.ps1` พรอมต์ควรขึ้น `(.venv)`',
          },
        },
        {
          type: 'p',
          text: {
            en: 'If `Activate.ps1` is blocked, run this once, then activate again:',
            th: 'ถ้า `Activate.ps1` ถูกบล็อก ให้รันคำสั่งนี้ครั้งเดียว แล้ว activate อีกครั้ง:',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          template: 'Set-ExecutionPolicy -Scope CurrentUser RemoteSigned',
        },
        {
          type: 'p',
          text: {
            en: 'If the wheel name differs, run `Get-ChildItem .\\code\\*.whl` and install that file. Use the `win_amd64` wheel.',
            th: 'ถ้าชื่อ wheel ไม่ตรง ให้รัน `Get-ChildItem .\\code\\*.whl` แล้วติดตั้งไฟล์นั้น ใช้ wheel แบบ `win_amd64`',
          },
        },
      ],
    },
    {
      id: 'win-step-3',
      num: 3,
      title: { en: '3. Warehouse sim', th: '3. Warehouse sim' },
      body: [
        {
          type: 'p',
          text: {
            en: 'WH labs need the sim. MW and HW do not.',
            th: 'แล็บ WH ต้องใช้ sim ส่วน MW และ HW ไม่จำเป็น',
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
            en: 'Or double-click `robotos-sim.exe` in that folder. Confirm the window says connected / **NATIVE**. If it does not: **Warehouse → Native → External → Connect**. Graded WH labs use Native, not Mock. Do not restart the sim every time you open **PowerShell**.',
            th: 'หรือดับเบิลคลิก `robotos-sim.exe` ในโฟลเดอร์นั้น ตรวจว่าหน้าต่างขึ้น connected / **NATIVE** ถ้าไม่ใช่: **Warehouse → Native → External → Connect** แล็บ WH ที่ให้คะแนนใช้ Native ไม่ใช่ Mock อย่ารีสตาร์ท sim ทุกครั้งที่เปิด **PowerShell**',
          },
        },
      ],
    },
    {
      id: 'win-step-4',
      num: 4,
      title: { en: '4. Smoke test', th: '4. ทดสอบเบื้องต้น' },
      body: [
        {
          type: 'p',
          text: { en: 'The sim must already be connected.', th: 'sim ต้องเชื่อมต่อไว้แล้ว' },
        },
        {
          type: 'code',
          fence: 'powershell',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
.\\.venv\\Scripts\\Activate.ps1
robotos topic list
scripts\\run.cmd wh-01`,
        },
        {
          type: 'p',
          text: {
            en: '`topic list` shows `/robot/01/cmd_vel`, `/robot/01/odom`, and `/robot/01/scan`. WH-01 moves the robot about 1 m. Use **PowerShell** for these commands. **Git Bash** rewrites paths that start with `/robot/`.',
            th: '`topic list` ควรเห็น `/robot/01/cmd_vel`, `/robot/01/odom` และ `/robot/01/scan` WH-01 จะขยับหุ่นยนต์ประมาณ 1 ม. ใช้ **PowerShell** สำหรับคำสั่งเหล่านี้ **Git Bash** จะแปลง path ที่ขึ้นต้นด้วย `/robot/`',
          },
        },
        {
          type: 'p',
          text: { en: 'Optional, same window:', th: 'ทางเลือก ใช้หน้าต่างเดิม:' },
        },
        {
          type: 'code',
          fence: 'powershell',
          template: 'robotos topic echo /robot/01/odom --count 5',
        },
      ],
    },
    {
      id: 'win-step-5',
      num: 5,
      title: { en: '5. Board (HW labs)', th: '5. บอร์ด (แล็บ HW)' },
      body: [
        {
          type: 'p',
          text: { en: 'Close the sim first. Two windows.', th: 'ปิด sim ก่อน ใช้สองหน้าต่าง' },
        },
        {
          type: 'callout',
          text: {
            en: '**Window A — bridge.** Leave it open. Or double-click `scripts/start-bridge.cmd`.',
            th: '**หน้าต่าง A — bridge** เปิดค้างไว้ หรือดับเบิลคลิก `scripts/start-bridge.cmd`',
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
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all`,
        },
        {
          type: 'p',
          text: {
            en: 'If auto-detect misses the USB port, add `--probe-settle-ms 2000 --probe-ms 5000`, or set `--port COM17` to the COM port shown in **Device Manager**. `serial-bridge.exe` is next to `robotos.exe`.',
            th: 'ถ้า auto-detect พลาดพอร์ต USB ให้เพิ่ม `--probe-settle-ms 2000 --probe-ms 5000` หรือตั้ง `--port COM17` ตาม COM ใน **Device Manager** `serial-bridge.exe` อยู่ข้าง `robotos.exe`',
          },
        },
        {
          type: 'callout',
          text: {
            en: '**Window B — labs.** A second **PowerShell**. Do not reuse window A.',
            th: '**หน้าต่าง B — แล็บ** เปิด **PowerShell** ใหม่ อย่าใช้หน้าต่าง A ซ้ำ',
          },
        },
        {
          type: 'code',
          fence: 'powershell',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
Remove-Item Env:ROBOTOS_LISTEN -ErrorAction SilentlyContinue
$env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"
.\\.venv\\Scripts\\Activate.ps1
robotos topic echo /robot/01/sys/board --count 3
scripts\\run.cmd hw-01`,
        },
        {
          type: 'p',
          boards: ['ws28p'],
          text: {
            en: 'Your board is `ws28p` — expect `caps≈0x3c` (IMU + RTC; no LED/mic). Run HW-01 before IMU labs.',
            th: 'บอร์ดของคุณคือ `ws28p` — คาด `caps≈0x3c` (IMU + RTC; ไม่มี LED/mic) รัน HW-01 ก่อนแล็บ IMU',
          },
        },
        {
          type: 'p',
          boards: ['es3c28p'],
          text: {
            en: 'Your board is `es3c28p` — expect `caps≈0x33` (LED + mic; no IMU). Run HW-01 before LED labs.',
            th: 'บอร์ดของคุณคือ `es3c28p` — คาด `caps≈0x33` (LED + mic; ไม่มี IMU) รัน HW-01 ก่อนแล็บ LED',
          },
        },
      ],
    },
  ],
  failures: [
    {
      see: { en: '`robotos` not found', th: 'หา `robotos` ไม่เจอ' },
      do: {
        en: 'Paste section 1 again in **this** window',
        th: 'วางส่วนที่ 1 อีกครั้งในหน้าต่าง**นี้**',
      },
    },
    {
      see: { en: '`Activate.ps1` blocked', th: '`Activate.ps1` ถูกบล็อก' },
      do: {
        en: '`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, then activate again',
        th: 'รัน `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` แล้ว activate อีกครั้ง',
      },
    },
    {
      see: { en: 'Wheel “not supported”', th: 'wheel “not supported”' },
      do: {
        en: 'Install `code\\robotos-0.3.0-py3-none-win_amd64.whl`',
        th: 'ติดตั้ง `code\\robotos-0.3.0-py3-none-win_amd64.whl`',
      },
    },
    {
      see: { en: '`scripts\\run.cmd` fails', th: '`scripts\\run.cmd` ล้มเหลว' },
      do: {
        en: '`cd` to the folder that contains `SETUP.md`, then activate `.venv`',
        th: '`cd` ไปโฟลเดอร์ที่มี `SETUP.md` แล้ว activate `.venv`',
      },
    },
    {
      see: { en: '`no topics announced`', th: '`no topics announced`' },
      do: {
        en: 'Sim not connected, or the bridge is down',
        th: 'sim ยังไม่เชื่อมต่อ หรือ bridge ดับ',
      },
    },
    {
      see: { en: 'Robot does not move', th: 'หุ่นยนต์ไม่ขยับ' },
      do: {
        en: 'In the sim: **External**, then **Native**. Keep publishing',
        th: 'ใน sim: เลือก **External** แล้ว **Native** แล้วค่อย publish ต่อ',
      },
    },
    {
      see: { en: 'HW-01 waits forever', th: 'HW-01 รอค้าง' },
      do: {
        en: 'Close the sim. Start window A again',
        th: 'ปิด sim แล้วเริ่มหน้าต่าง A ใหม่',
      },
    },
    {
      see: { en: '`CONNECTION_TO_SELF`', th: '`CONNECTION_TO_SELF`' },
      do: {
        en: 'Window B must run `Remove-Item Env:ROBOTOS_LISTEN`. Do not listen and connect in one window',
        th: 'หน้าต่าง B ต้องรัน `Remove-Item Env:ROBOTOS_LISTEN` อย่า listen และ connect ในหน้าต่างเดียว',
      },
    },
    {
      see: { en: '**Git Bash** breaks `/robot/...`', th: '**Git Bash** ทำให้ `/robot/...` พัง' },
      do: { en: 'Use **PowerShell**', th: 'ใช้ **PowerShell**' },
    },
    {
      see: { en: 'Board silent / port busy', th: 'บอร์ดเงียบ / พอร์ตไม่ว่าง' },
      do: {
        en: 'Check USB, close other serial programs, set `--port COMx`',
        th: 'เช็ก USB ปิดโปรแกรม serial อื่น ตั้ง `--port COMx`',
      },
    },
    {
      boards: ['ws28p'],
      see: { en: 'LED lab does nothing', th: 'แล็บ LED ไม่ทำอะไร' },
      do: {
        en: 'That board has no LED. Use the other board, or a non-LED lab',
        th: 'บอร์ดนี้ไม่มี LED ใช้บอร์ดอีกตัว หรือแล็บที่ไม่ใช้ LED',
      },
    },
    {
      boards: ['es3c28p'],
      see: { en: 'IMU timeout', th: 'IMU timeout' },
      do: {
        en: 'That board has no IMU. Use `board_watch`',
        th: 'บอร์ดนี้ไม่มี IMU ใช้ `board_watch`',
      },
    },
    {
      see: { en: '`ModuleNotFoundError: labs`', th: '`ModuleNotFoundError: labs`' },
      do: {
        en: 'The window is not in the workshop folder',
        th: 'หน้าต่างนี้ไม่ได้อยู่ในโฟลเดอร์เวิร์กช็อป',
      },
    },
  ],
  end: { en: 'End of the Windows section.', th: 'จบส่วน Windows' },
}
