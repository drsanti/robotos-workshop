import type { OsTrack } from '../setup/types'

const sharedFailures = {
  robotos: {
    see: { en: '`robotos` not found', th: 'หา `robotos` ไม่เจอ' },
    do: {
      en: 'Paste the PATH / `$env:PATH` line again in **this** window',
      th: 'วางบรรทัด PATH / `$env:PATH` อีกครั้งในหน้าต่าง**นี้**',
    },
  },
  empty: {
    see: { en: 'Empty `topic list` / `node list`', th: '`topic list` / `node list` ว่าง' },
    do: {
      en: 'Expected until the sim, bridge, or MW-01 is running. Empty means a quiet graph, not a broken CLI',
      th: 'ปกติจนกว่าจะเปิด sim, bridge หรือ MW-01 — ว่างแปลว่ากราฟเงียบ ไม่ใช่ CLI พัง',
    },
  },
  labs: {
    see: { en: '`ModuleNotFoundError: labs`', th: '`ModuleNotFoundError: labs`' },
    do: {
      en: 'The window is not in the workshop folder',
      th: 'หน้าต่างนี้ไม่ได้อยู่ในโฟลเดอร์เวิร์กช็อป',
    },
  },
} as const

export const mw00Windows: OsTrack = {
  key: 'win',
  title: 'Windows',
  shellTag: {
    en: 'Use **PowerShell**. Follow this track from the first block to the last.',
    th: 'ใช้ **PowerShell** ทำตามแทร็กนี้จากบล็อกแรกถึงบล็อกสุดท้าย',
  },
  lead: {
    en: 'Replace nothing if you are already in the workshop root. `cd` to that folder first if the prompt shows some other path.',
    th: 'ถ้าอยู่ที่รากเวิร์กช็อปอยู่แล้ว ไม่ต้องแทนอะไร ถ้าพรอมต์ชี้ที่อื่น ให้ `cd` มาก่อน',
  },
  steps: [
    {
      id: 'mw-00-win-cli',
      num: 1,
      title: { en: '1. Practice — CLI', th: '1. ฝึก — CLI' },
      body: [
        {
          type: 'code',
          fence: 'powershell',
          template: `cd YOUR_WORKSHOP_DIR
$env:PATH = "$PWD\\code\\robotos-v0.3.0-windows-x64\\bin;$env:PATH"
robotos version
robotos doctor
robotos node list
robotos topic list`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `robotos version` prints `robotos 0.3.0` (any `0.3.x` is fine). `node list` and `topic list` may be **empty** until the sim, the serial bridge, or MW-01 is running. An empty list is a valid quiet graph. It does not mean the CLI is broken.',
            th: '**คาดหวัง:** `robotos version` พิมพ์ `robotos 0.3.0` (เวอร์ชัน `0.3.x` ก็ใช้ได้) `node list` และ `topic list` อาจ**ว่าง**จนกว่าจะเปิด sim, serial bridge หรือ MW-01 รายการว่างคือกราฟเงียบที่ถูกต้อง ไม่ได้แปลว่า CLI พัง',
          },
        },
        {
          type: 'p',
          text: {
            en: 'Optional: `robotos ui` if the pack embeds the inspector.',
            th: 'ทางเลือก: `robotos ui` ถ้าแพ็กมี inspector',
          },
        },
      ],
    },
    {
      id: 'mw-00-win-python',
      num: 2,
      title: { en: '2. Python SDK check', th: '2. ตรวจ Python SDK' },
      body: [
        {
          type: 'p',
          text: {
            en: 'The checklist also asks for a successful `import robotos`. Paste the whole block. Do not run `.\\.venv\\Scripts\\Activate.ps1` before `.venv` exists.',
            th: 'เช็คลิสต์ยังต้องการ `import robotos` สำเร็จ วางทั้งบล็อก อย่ารัน `.\\.venv\\Scripts\\Activate.ps1` ก่อนมี `.venv`',
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
            en: 'If `.venv` already exists, skip `python -m venv .venv` and start at `.\\.venv\\Scripts\\Activate.ps1`.',
            th: 'ถ้ามี `.venv` อยู่แล้ว ข้าม `python -m venv .venv` แล้วเริ่มที่ `.\\.venv\\Scripts\\Activate.ps1`',
          },
        },
        {
          type: 'p',
          text: {
            en: 'If activation is blocked, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, then activate again. The prompt should show `(.venv)`.',
            th: 'ถ้า activate ถูกบล็อก ให้รัน `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` ครั้งเดียว แล้ว activate อีกครั้ง พรอมต์ควรขึ้น `(.venv)`',
          },
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** the import prints a version string. Use the `win_amd64` wheel in the block above.',
            th: '**คาดหวัง:** import พิมพ์สตริงเวอร์ชัน ใช้ wheel แบบ `win_amd64` ในบล็อกด้านบน',
          },
        },
      ],
    },
    {
      id: 'mw-00-win-explain',
      num: 3,
      title: { en: '3. Empty graph check', th: '3. ตรวจกราฟว่าง' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Done when the CLI works and you can explain what an empty `topic list` means (quiet graph — not a broken install). Full setup, sim, and board bridge live on the Machine setup page. This lab does not need the sim.',
            th: 'จบเมื่อ CLI ใช้ได้ และอธิบายได้ว่า `topic list` ว่างหมายถึงอะไร (กราฟเงียบ — ไม่ใช่ติดตั้งพัง) setup เต็ม sim และ bridge อยู่ที่หน้า Machine setup แล็บนี้ไม่ต้องใช้ sim',
          },
        },
      ],
    },
  ],
  failures: [
    sharedFailures.robotos,
    {
      see: { en: '`Activate.ps1` blocked', th: '`Activate.ps1` ถูกบล็อก' },
      do: {
        en: '`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, then activate again',
        th: 'รัน `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` แล้ว activate อีกครั้ง',
      },
    },
    sharedFailures.empty,
    sharedFailures.labs,
  ],
  end: { en: 'End of the Windows MW-00 track.', th: 'จบแทร็ก MW-00 บน Windows' },
}

export const mw00Macos: OsTrack = {
  key: 'mac',
  title: 'macOS',
  shellTag: {
    en: 'Use **Terminal** on Apple Silicon (`zsh` or `bash`). Follow this track from the first block to the last.',
    th: 'ใช้ **Terminal** บน Apple Silicon (`zsh` หรือ `bash`) ทำตามแทร็กนี้จากบล็อกแรกถึงบล็อกสุดท้าย',
  },
  lead: {
    en: 'Replace nothing if you are already in the workshop root. `cd` to that folder first if the prompt shows some other path.',
    th: 'ถ้าอยู่ที่รากเวิร์กช็อปอยู่แล้ว ไม่ต้องแทนอะไร ถ้าพรอมต์ชี้ที่อื่น ให้ `cd` มาก่อน',
  },
  steps: [
    {
      id: 'mw-00-mac-cli',
      num: 1,
      title: { en: '1. Practice — CLI', th: '1. ฝึก — CLI' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
robotos version
robotos doctor
robotos node list
robotos topic list`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `robotos version` prints `robotos 0.3.0` (any `0.3.x` is fine). `node list` and `topic list` may be **empty** until the sim, the serial bridge, or MW-01 is running. An empty list is a valid quiet graph. It does not mean the CLI is broken.',
            th: '**คาดหวัง:** `robotos version` พิมพ์ `robotos 0.3.0` (เวอร์ชัน `0.3.x` ก็ใช้ได้) `node list` และ `topic list` อาจ**ว่าง**จนกว่าจะเปิด sim, serial bridge หรือ MW-01 รายการว่างคือกราฟเงียบที่ถูกต้อง ไม่ได้แปลว่า CLI พัง',
          },
        },
        {
          type: 'p',
          text: {
            en: 'Optional: `robotos ui` if the pack embeds the inspector.',
            th: 'ทางเลือก: `robotos ui` ถ้าแพ็กมี inspector',
          },
        },
      ],
    },
    {
      id: 'mw-00-mac-python',
      num: 2,
      title: { en: '2. Python SDK check', th: '2. ตรวจ Python SDK' },
      body: [
        {
          type: 'p',
          text: {
            en: 'The checklist also asks for a successful `import robotos`. Paste the whole block. Do not run `source .venv/bin/activate` before `.venv` exists.',
            th: 'เช็คลิสต์ยังต้องการ `import robotos` สำเร็จ วางทั้งบล็อก อย่ารัน `source .venv/bin/activate` ก่อนมี `.venv`',
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
            en: 'If `.venv` already exists, skip `python3 -m venv .venv` and start at `source .venv/bin/activate`.',
            th: 'ถ้ามี `.venv` อยู่แล้ว ข้าม `python3 -m venv .venv` แล้วเริ่มที่ `source .venv/bin/activate`',
          },
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** the import prints a version string. Use the wheel in the block above.',
            th: '**คาดหวัง:** import พิมพ์สตริงเวอร์ชัน ใช้ wheel ในบล็อกด้านบน',
          },
        },
      ],
    },
    {
      id: 'mw-00-mac-explain',
      num: 3,
      title: { en: '3. Empty graph check', th: '3. ตรวจกราฟว่าง' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Done when the CLI works and you can explain what an empty `topic list` means (quiet graph — not a broken install). Full setup, sim, and board bridge live on the Machine setup page. This lab does not need the sim.',
            th: 'จบเมื่อ CLI ใช้ได้ และอธิบายได้ว่า `topic list` ว่างหมายถึงอะไร (กราฟเงียบ — ไม่ใช่ติดตั้งพัง) setup เต็ม sim และ bridge อยู่ที่หน้า Machine setup แล็บนี้ไม่ต้องใช้ sim',
          },
        },
      ],
    },
  ],
  failures: [
    sharedFailures.robotos,
    {
      see: { en: '`python` not found', th: 'หา `python` ไม่เจอ' },
      do: {
        en: 'Use `python3`, then `source .venv/bin/activate`',
        th: 'ใช้ `python3` แล้ว `source .venv/bin/activate`',
      },
    },
    sharedFailures.empty,
    sharedFailures.labs,
  ],
  end: { en: 'End of the macOS MW-00 track.', th: 'จบแทร็ก MW-00 บน macOS' },
}

export const mw00Linux: OsTrack = {
  key: 'linux',
  title: 'Linux',
  shellTag: {
    en: 'Use **bash**. Skip this track when `code/robotos-v0.3.0-linux-x64` is not in your drop.',
    th: 'ใช้ **bash** ข้ามแทร็กนี้ถ้าแพ็กไม่มี `code/robotos-v0.3.0-linux-x64`',
  },
  lead: {
    en: 'Replace nothing if you are already in the workshop root. `cd` to that folder first if the prompt shows some other path. Linux packs are not in the current class drop — only continue if your drop has the folder.',
    th: 'ถ้าอยู่ที่รากเวิร์กช็อปอยู่แล้ว ไม่ต้องแทนอะไร ถ้าพรอมต์ชี้ที่อื่น ให้ `cd` มาก่อน แพ็ก Linux ไม่อยู่ในคลาสปัจจุบัน — ทำต่อเฉพาะเมื่อมีโฟลเดอร์นั้น',
  },
  steps: [
    {
      id: 'mw-00-linux-cli',
      num: 1,
      title: { en: '1. Practice — CLI', th: '1. ฝึก — CLI' },
      body: [
        {
          type: 'code',
          fence: 'bash',
          template: `cd YOUR_WORKSHOP_DIR
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
robotos version
robotos doctor
robotos node list
robotos topic list`,
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** `robotos version` prints `robotos 0.3.0` (any `0.3.x` is fine). `node list` and `topic list` may be **empty** until the sim, the serial bridge, or MW-01 is running. An empty list is a valid quiet graph. It does not mean the CLI is broken.',
            th: '**คาดหวัง:** `robotos version` พิมพ์ `robotos 0.3.0` (เวอร์ชัน `0.3.x` ก็ใช้ได้) `node list` และ `topic list` อาจ**ว่าง**จนกว่าจะเปิด sim, serial bridge หรือ MW-01 รายการว่างคือกราฟเงียบที่ถูกต้อง ไม่ได้แปลว่า CLI พัง',
          },
        },
        {
          type: 'p',
          text: {
            en: 'Optional: `robotos ui` if the pack embeds the inspector.',
            th: 'ทางเลือก: `robotos ui` ถ้าแพ็กมี inspector',
          },
        },
      ],
    },
    {
      id: 'mw-00-linux-python',
      num: 2,
      title: { en: '2. Python SDK check', th: '2. ตรวจ Python SDK' },
      body: [
        {
          type: 'p',
          text: {
            en: 'Only if `code/robotos-0.3.0-py3-none-any.whl` is in your drop. Paste the whole block. Do not run `source .venv/bin/activate` before `.venv` exists.',
            th: 'ทำเฉพาะเมื่อมี `code/robotos-0.3.0-py3-none-any.whl` ในแพ็ก วางทั้งบล็อก อย่ารัน `source .venv/bin/activate` ก่อนมี `.venv`',
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
            en: 'If `.venv` already exists, skip `python3 -m venv .venv` and start at `source .venv/bin/activate`.',
            th: 'ถ้ามี `.venv` อยู่แล้ว ข้าม `python3 -m venv .venv` แล้วเริ่มที่ `source .venv/bin/activate`',
          },
        },
        {
          type: 'p',
          text: {
            en: '**Expect:** the import prints a version string. Use the wheel in the block above.',
            th: '**คาดหวัง:** import พิมพ์สตริงเวอร์ชัน ใช้ wheel ในบล็อกด้านบน',
          },
        },
      ],
    },
    {
      id: 'mw-00-linux-explain',
      num: 3,
      title: { en: '3. Empty graph check', th: '3. ตรวจกราฟว่าง' },
      body: [
        {
          type: 'callout',
          text: {
            en: 'Done when the CLI works and you can explain what an empty `topic list` means (quiet graph — not a broken install). Full setup, sim, and board bridge live on the Machine setup page. This lab does not need the sim.',
            th: 'จบเมื่อ CLI ใช้ได้ และอธิบายได้ว่า `topic list` ว่างหมายถึงอะไร (กราฟเงียบ — ไม่ใช่ติดตั้งพัง) setup เต็ม sim และ bridge อยู่ที่หน้า Machine setup แล็บนี้ไม่ต้องใช้ sim',
          },
        },
      ],
    },
  ],
  failures: [
    sharedFailures.robotos,
    {
      see: { en: '`python` not found', th: 'หา `python` ไม่เจอ' },
      do: {
        en: 'Use `python3`, then `source .venv/bin/activate`',
        th: 'ใช้ `python3` แล้ว `source .venv/bin/activate`',
      },
    },
    sharedFailures.empty,
    sharedFailures.labs,
  ],
  end: { en: 'End of the Linux MW-00 track.', th: 'จบแทร็ก MW-00 บน Linux' },
}

export const MW00_TRACKS: OsTrack[] = [mw00Windows, mw00Macos, mw00Linux]

export function mw00ByOs(os: OsTrack['key']) {
  return MW00_TRACKS.find((t) => t.key === os) ?? mw00Windows
}
