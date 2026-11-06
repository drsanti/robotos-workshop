import type { OsTrack } from './types'

export const linuxTrack: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Stay in this track until the end.',
    th: 'ใช้ **bash** อยู่กับแทร็กนี้จนจบ',
  },
  lead: {
    en: 'Use **bash**. Stay in this section until you are done. This class drop often has no `code/robotos-v0.3.0-linux-x64` folder. If `ls code` does not show it, this section does not apply.',
    th: 'ใช้ **bash** อยู่กับส่วนนี้จนจบ แพ็กในคลาสอาจไม่มีโฟลเดอร์ `code/robotos-v0.3.0-linux-x64` ถ้า `ls code` ไม่เห็น ให้ข้ามส่วนนี้',
  },
  steps: [
    {
      id: 'linux-step-1',
      num: 1,
      title: { en: '1. Check `robotos`', th: '1. ตรวจ `robotos`' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
chmod +x code/robotos-v0.3.0-linux-x64/bin/* 2>/dev/null || true
robotos version`,
        },
        {
          type: 'p',
          text: {
            en: 'Expect `robotos 0.3.0` (any `0.3.x` is fine). A new terminal needs this block again.',
            th: 'ควรได้ `robotos 0.3.0` (เวอร์ชัน `0.3.x` ก็ใช้ได้) เทอร์มินัลใหม่ต้องวางบล็อกนี้อีกครั้ง',
          },
        },
      ],
    },
    {
      id: 'linux-step-2',
      num: 2,
      title: { en: '2. Python', th: '2. Python' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Python 3.10 or newer. On Ubuntu: `sudo apt install python3 python3-venv`.',
            th: 'ใช้ Python 3.10 ขึ้นไป บน Ubuntu: `sudo apt install python3 python3-venv`',
          },
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
      id: 'linux-step-3',
      num: 3,
      title: { en: '3. Warehouse sim', th: '3. Warehouse sim' },
      body: [
        {
          type: 'p',
          text: {
            en: 'WH labs need a sim binary. This class drop ships Windows and macOS sims. If `code/robotos-sim-v0.1.0-linux-x64` is missing, skip WH and do MW or HW.',
            th: 'แล็บ WH ต้องมีไฟล์ sim แพ็กในคลาสมี sim สำหรับ Windows และ macOS ถ้าไม่มี `code/robotos-sim-v0.1.0-linux-x64` ให้ข้าม WH แล้วทำ MW หรือ HW',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
chmod +x code/robotos-sim-v0.1.0-linux-x64/robotos-sim
./code/robotos-sim-v0.1.0-linux-x64/robotos-sim &`,
        },
        {
          type: 'p',
          text: {
            en: 'Confirm connected / **NATIVE**. If not: **Warehouse → Native → External → Connect**.',
            th: 'ตรวจว่า connected / **NATIVE** ถ้าไม่ใช่: **Warehouse → Native → External → Connect**',
          },
        },
      ],
    },
    {
      id: 'linux-step-4',
      num: 4,
      title: { en: '4. Smoke test', th: '4. ทดสอบเบื้องต้น' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
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
      id: 'linux-step-5',
      num: 5,
      title: { en: '5. Board (HW labs)', th: '5. บอร์ด (แล็บ HW)' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Close the sim first. Serial access needs the `dialout` group. Run this once, then log out and back in:',
            th: 'ปิด sim ก่อน การใช้ serial ต้องอยู่ในกลุ่ม `dialout` รันครั้งเดียว แล้วออกจากระบบแล้วเข้าใหม่:',
          },
        },
        {
          type: 'code',
          fence: 'bash',
          template: 'sudo usermod -aG dialout $USER',
        },
        {
          type: 'p',
          text: {
            en: 'Check with `groups | grep dialout` and `ls -l /dev/ttyACM*`. Do not use `sudo serial-bridge` in place of that.',
            th: 'ตรวจด้วย `groups | grep dialout` และ `ls -l /dev/ttyACM*` อย่าใช้ `sudo serial-bridge` แทน',
          },
        },
        {
          type: 'callout',
          text: {
            en: '**Window A — bridge.** Leave it open.',
            th: '**หน้าต่าง A — bridge** เปิดค้างไว้',
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
chmod +x code/robotos-v0.3.0-linux-x64/bin/serial-bridge 2>/dev/null || true
serial-bridge --port auto --baud 921600 --robot-id 01 --cmd-topic all`,
        },
        {
          type: 'p',
          text: {
            en: 'If auto-detect misses the board, add `--port /dev/ttyACM0`.',
            th: 'ถ้า auto-detect พลาดบอร์ด ให้เพิ่ม `--port /dev/ttyACM0`',
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
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
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
        en: 'Paste section 1 again in **this** terminal. `chmod +x` the files in `code/robotos-v0.3.0-linux-x64/bin`',
        th: 'วางส่วนที่ 1 อีกครั้งในเทอร์มินัลนี้ แล้ว `chmod +x` ไฟล์ใน `code/robotos-v0.3.0-linux-x64/bin`',
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
      see: { en: 'Permission denied on `/dev/ttyACM*`', th: 'Permission denied บน `/dev/ttyACM*`' },
      do: {
        en: '`dialout` group, then log out and back in',
        th: 'เข้ากลุ่ม `dialout` แล้วออกจากระบบแล้วเข้าใหม่',
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
      see: { en: 'Board silent / port busy', th: 'บอร์ดเงียบ / พอร์ตไม่ว่าง' },
      do: {
        en: 'USB, close other serial programs, `--port /dev/ttyACM0`',
        th: 'เช็ก USB ปิดโปรแกรม serial อื่น ใช้ `--port /dev/ttyACM0`',
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
  end: { en: 'End of the Linux section.', th: 'จบส่วน Linux' },
}
