import type { OsTrack } from './types'

export const macosTrack: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal**. Stay in this track until the end.',
    th: 'ใช้ **Terminal** อยู่กับแทร็กนี้จนจบ',
  },
  lead: {
    en: 'Use **Terminal** on Apple Silicon (`zsh` or `bash`). Stay in this section until you are done.',
    th: 'ใช้ **Terminal** บน Apple Silicon (`zsh` หรือ `bash`) อยู่กับส่วนนี้จนจบ',
  },
  steps: [
    {
      id: 'mac-step-1',
      num: 1,
      title: { en: '1. Check `robotos`', th: '1. ตรวจ `robotos`' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
chmod +x code/robotos-v0.3.0-macos-arm64/bin/* 2>/dev/null || true
robotos version`,
        },
        {
          type: 'p',
          text: {
            en: 'Expect `robotos 0.3.0` (any `0.3.x` is fine). A new terminal needs this block again.',
            th: 'ควรได้ `robotos 0.3.0` (เวอร์ชัน `0.3.x` ก็ใช้ได้) เทอร์มินัลใหม่ต้องวางบล็อกนี้อีกครั้ง',
          },
        },
        {
          type: 'p',
          text: {
            en: 'Once per machine you can double-click `scripts/start-here.command`, or run `./scripts/start-here.sh` from this folder. That creates `.venv`, installs the wheel, and opens the sim. The next terminal is still blank. Paste the blocks below again.',
            th: 'ครั้งแรกต่อเครื่อง สามารถดับเบิลคลิก `scripts/start-here.command` หรือรัน `./scripts/start-here.sh` จากโฟลเดอร์นี้ จะสร้าง `.venv` ติดตั้ง wheel และเปิด sim เทอร์มินัลถัดไปยังว่างอยู่ ต้องวางบล็อกด้านล่างอีกครั้ง',
          },
        },
      ],
    },
    {
      id: 'mac-step-2',
      num: 2,
      title: { en: '2. Python', th: '2. Python' },
      body: [
        {
          type: 'p',
          text: { en: 'Python 3.10 or newer.', th: 'ใช้ Python 3.10 ขึ้นไป' },
        },
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
python -m pip install code/robotos-0.3.0-py3-none-any.whl
python -c "import robotos; print(robotos.Node.version())"`,
        },
        {
          type: 'p',
          text: {
            en: 'If `.venv` already exists, start at `source .venv/bin/activate`. Do not install the `win_amd64` wheel.',
            th: 'ถ้ามี `.venv` อยู่แล้ว ให้เริ่มที่ `source .venv/bin/activate` อย่าติดตั้ง wheel แบบ `win_amd64`',
          },
        },
      ],
    },
    {
      id: 'mac-step-3',
      num: 3,
      title: { en: '3. Warehouse sim', th: '3. Warehouse sim' },
      body: [
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
            en: 'The first launch may say the app cannot be opened. In **Finder**, right-click the app and choose **Open**, or allow it under **System Settings → Privacy & Security**. Confirm connected / **NATIVE**. If not: **Warehouse → Native → External → Connect**. Do not restart the sim every time you open **Terminal**.',
            th: 'ครั้งแรกอาจขึ้นว่าเปิดแอปไม่ได้ ใน **Finder** ให้คลิกขวาแล้วเลือก **Open** หรืออนุญาตใน **System Settings → Privacy & Security** ตรวจว่า connected / **NATIVE** ถ้าไม่ใช่: **Warehouse → Native → External → Connect** อย่ารีสตาร์ท sim ทุกครั้งที่เปิด **Terminal**',
          },
        },
      ],
    },
    {
      id: 'mac-step-4',
      num: 4,
      title: { en: '4. Smoke test', th: '4. ทดสอบเบื้องต้น' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
source .venv/bin/activate
robotos topic list
./scripts/run wh-01`,
        },
        {
          type: 'p',
          text: {
            en: '`topic list` shows `/robot/01/cmd_vel`, `/robot/01/odom`, and `/robot/01/scan`. WH-01 moves the robot about 1 m.',
            th: '`topic list` ควรเห็น `/robot/01/cmd_vel`, `/robot/01/odom` และ `/robot/01/scan` WH-01 จะขยับหุ่นยนต์ประมาณ 1 ม.',
          },
        },
      ],
    },
    {
      id: 'mac-step-5',
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
            en: '**Window A — bridge.** Leave it open. Or run `./scripts/start-bridge.sh` from this folder.',
            th: '**หน้าต่าง A — bridge** เปิดค้างไว้ หรือรัน `./scripts/start-bridge.sh` จากโฟลเดอร์นี้',
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
chmod +x code/robotos-v0.3.0-macos-arm64/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all`,
        },
        {
          type: 'p',
          text: {
            en: 'Auto-detect can skip `/dev/cu.usbmodem*` (`no workshop frame`) and select `/dev/tty.usbmodem…`. Pin the path from the line `[auto] selected`. On the class Mac that path was `/dev/tty.usbmodem101`.',
            th: 'auto-detect อาจข้าม `/dev/cu.usbmodem*` (`no workshop frame`) แล้วเลือก `/dev/tty.usbmodem…` ให้ใช้ path จากบรรทัด `[auto] selected` บน Mac ในคลาสเคยเป็น `/dev/tty.usbmodem101`',
          },
        },
        {
          type: 'callout',
          text: {
            en: '**Window B — labs.** A second terminal.',
            th: '**หน้าต่าง B — แล็บ** เปิดเทอร์มินัลที่สอง',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          session: 'labs',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
unset ROBOTOS_LISTEN
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
robotos topic echo /robot/01/sys/board --count 3
./scripts/run hw-01`,
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
        en: 'Paste section 1 again in **this** terminal',
        th: 'วางส่วนที่ 1 อีกครั้งในเทอร์มินัลนี้',
      },
    },
    {
      see: { en: '`python` not found', th: 'หา `python` ไม่เจอ' },
      do: {
        en: 'Use `python3`, then `source .venv/bin/activate`',
        th: 'ใช้ `python3` แล้ว `source .venv/bin/activate`',
      },
    },
    {
      see: { en: 'Wheel “not supported”', th: 'wheel “not supported”' },
      do: {
        en: 'Install `code/robotos-0.3.0-py3-none-any.whl`',
        th: 'ติดตั้ง `code/robotos-0.3.0-py3-none-any.whl`',
      },
    },
    {
      see: { en: '`./scripts/run` fails', th: '`./scripts/run` ล้มเหลว' },
      do: {
        en: '`cd` to the folder that contains `SETUP.md`, then activate `.venv`',
        th: '`cd` ไปโฟลเดอร์ที่มี `SETUP.md` แล้ว activate `.venv`',
      },
    },
    {
      see: { en: '“cannot be opened”', th: '“cannot be opened”' },
      do: {
        en: '**Privacy & Security** → allow `robotos-sim`',
        th: '**Privacy & Security** → อนุญาต `robotos-sim`',
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
        en: 'Window B must `unset ROBOTOS_LISTEN`',
        th: 'หน้าต่าง B ต้อง `unset ROBOTOS_LISTEN`',
      },
    },
    {
      see: { en: 'Auto skips `cu.usbmodem`', th: 'auto ข้าม `cu.usbmodem`' },
      do: {
        en: 'Use the `/dev/tty.usbmodem…` path from `[auto] selected`',
        th: 'ใช้ path `/dev/tty.usbmodem…` จาก `[auto] selected`',
      },
    },
    {
      see: { en: 'Board silent / port busy', th: 'บอร์ดเงียบ / พอร์ตไม่ว่าง' },
      do: {
        en: 'USB, close other serial programs',
        th: 'เช็ก USB ปิดโปรแกรม serial อื่น',
      },
    },
    {
      boards: ['ws28p'],
      see: { en: 'LED lab does nothing', th: 'แล็บ LED ไม่ทำอะไร' },
      do: { en: 'That board has no LED', th: 'บอร์ดนี้ไม่มี LED' },
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
        en: 'The terminal is not in the workshop folder',
        th: 'เทอร์มินัลนี้ไม่ได้อยู่ในโฟลเดอร์เวิร์กช็อป',
      },
    },
  ],
  end: { en: 'End of the macOS section.', th: 'จบส่วน macOS' },
}
