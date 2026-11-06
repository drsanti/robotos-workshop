import { CircuitBoard, FolderTree, Layers } from 'lucide-react'
import { Callout } from '../components/Callout'
import { ConfigCard } from '../components/ConfigCard'
import { CodeBlock } from '../components/CodeBlock'
import { OsTrackView } from '../components/OsTrackView'
import { ProgressBar } from '../components/ProgressBar'
import { T } from '../components/LangText'
import { TopBar } from '../components/TopBar'
import { OS_TRACKS, trackByOs } from '../content/setup'
import { usePrefs } from '../context/PrefsContext'
import { BOARD_KEYS, BOARD_PROFILES } from '../lib/boards'

export function SetupPage() {
  const { os, board, boardChoice, detectedBoard, ui } = usePrefs()
  const track = trackByOs(os)
  const stepIds = track.steps.map((s) => s.id)

  return (
    <div>
      <a className="skip" href="#guide">
        {ui.skip}
      </a>
      <header className="sticky top-0 z-20">
        <TopBar brandQuiet={ui.brandQuiet} />
        <div className="relative z-10 border-b border-[var(--line)] bg-[var(--top-bg)] backdrop-blur-md">
          <ConfigCard />
          <ProgressBar stepIds={stepIds} />
        </div>
      </header>

      <main id="guide" className="mx-auto max-w-[46rem] px-5 py-8">
        <section className="mb-10">
          <h1 className="mt-0 text-3xl font-semibold tracking-tight">
            <T en="SETUP — student machine" th="SETUP — เครื่องของนักเรียน" />
          </h1>
          <p>
            <T
              en="Follow **one** section and stop at the end of it."
              th="ทำตาม**เพียงหนึ่ง**ส่วนแล้วหยุดเมื่อจบส่วนนั้น"
            />
          </p>

          <div className="my-5 grid gap-3 sm:grid-cols-3">
            {[
              { icon: FolderTree, label: 'YOUR_WORKSHOP_DIR', tipEn: 'Short path, no spaces', tipTh: 'path สั้น ไม่มีช่องว่าง' },
              { icon: Layers, label: 'MW / WH / HW', tipEn: 'Different lab needs', tipTh: 'ต้องการต่างกันตามแล็บ' },
              {
                icon: CircuitBoard,
                label: BOARD_PROFILES[board].label,
                tipEn: `Selected in Your setup${boardChoice === 'auto' && detectedBoard ? ' (auto)' : ''}`,
                tipTh: `เลือกใน Your setup${boardChoice === 'auto' && detectedBoard ? ' (อัตโนมัติ)' : ''}`,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-[var(--shadow)]"
              >
                <item.icon className="mb-2 text-[var(--accent)]" size={22} />
                <p className="m-0 text-sm font-semibold">{item.label}</p>
                <p className="m-0 mt-1 text-xs text-[var(--muted)]">
                  <T en={item.tipEn} th={item.tipTh} />
                </p>
              </div>
            ))}
          </div>

          <p>
            <T
              en="`YOUR_WORKSHOP_DIR` is the folder that contains this file, `code/`, and `labs/`. Use a short path without spaces."
              th="`YOUR_WORKSHOP_DIR` คือโฟลเดอร์ที่มีไฟล์นี้ รวมถึง `code/` และ `labs/` ใช้ path สั้นและไม่มีช่องว่าง"
            />
          </p>
          <p>
            <T en="Unzip so you see:" th="แตกไฟล์แล้วควรเห็นโครงสร้างแบบนี้:" />
          </p>
          <CodeBlock
            fence="text"
            template={`robotos-workshop/
  SETUP.md
  scripts/
  labs/
  code/
    robotos-v0.3.0-<os>-<arch>/
    robotos-0.3.0-*.whl
    robotos-sim-v<ver>-<os>-<arch>/
    NOTES.txt`}
          />
          <ul className="my-3 space-y-1 pl-5">
            <li>
              <T
                en="**MW** labs use the CLI and Python. The sim is optional."
                th="แล็บ **MW** ใช้ CLI และ Python — sim เป็นตัวเลือก"
              />
            </li>
            <li>
              <T
                en="**WH** labs need the warehouse sim when your pack includes it."
                th="แล็บ **WH** ต้องใช้ warehouse sim เมื่อแพ็กมีไฟล์นั้น"
              />
            </li>
            <li>
              <T
                en="**HW** labs need the board and `serial-bridge`. Close the sim first. The sim and the bridge both use port `7447`."
                th="แล็บ **HW** ต้องมีบอร์ดและ `serial-bridge` ปิด sim ก่อน — sim กับ bridge ใช้พอร์ต `7447` ร่วมกัน"
              />
            </li>
          </ul>
          <p>
            <T
              en="Two boards. Pick yours under **Your setup → Your board** (Auto uses BoardInfo when the bridge is up). Flash the matching folder."
              th="มีบอร์ดสองรุ่น เลือกใน **Your setup → Your board** (อัตโนมัติใช้ BoardInfo เมื่อ bridge ทำงาน) แล้วแฟลชโฟลเดอร์ที่ตรงรุ่น"
            />
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="py-2 pr-3">
                    <T en="Board" th="บอร์ด" />
                  </th>
                  <th className="py-2 pr-3">
                    <T en="Firmware" th="เฟิร์มแวร์" />
                  </th>
                  <th className="py-2 pr-3">
                    <T en="Typical caps" th="caps โดยทั่วไป" />
                  </th>
                  <th className="py-2">
                    <T en="Notes" th="หมายเหตุ" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {BOARD_KEYS.map((key) => {
                  const profile = BOARD_PROFILES[key]
                  const selected = board === key
                  return (
                    <tr
                      key={key}
                      className={`border-b border-[var(--line)] ${
                        selected ? 'bg-[var(--accent-soft)]' : 'opacity-55'
                      }`}
                    >
                      <td className="py-2 pr-3">
                        <code>{profile.label}</code>
                        {selected ? (
                          <span className="ml-2 text-[0.65rem] font-medium text-[var(--accent)]">
                            ←{' '}
                            {boardChoice === 'auto' && detectedBoard === key
                              ? ui.boardDetected
                              : ui.boardSelected}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-2 pr-3">
                        <code>{profile.firmwareDir}</code>
                      </td>
                      <td className="py-2 pr-3">
                        <code>≈ 0x{profile.typicalCaps.toString(16)}</code>
                      </td>
                      <td className="py-2">
                        <T en={profile.notesEn} th={profile.notesTh} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <Callout tone="info">
              <T
                en={`Focus: **${BOARD_PROFILES[board].label}** — ${BOARD_PROFILES[board].notesEn}. Flash \`${BOARD_PROFILES[board].firmwareDir}\`.`}
                th={`โฟกัส: **${BOARD_PROFILES[board].label}** — ${BOARD_PROFILES[board].notesTh} แฟลช \`${BOARD_PROFILES[board].firmwareDir}\``}
              />
            </Callout>
          </div>
          <p className="mt-4">
            <T
              en="Lab map: `docs/lab-outline.md`. Each lab sheet repeats the setup lines, because a new window forgets them."
              th="แผนที่แล็บ: `docs/lab-outline.md` แผ่นแล็บแต่ละใบจะทวนบรรทัด setup อีกครั้ง เพราะหน้าต่างใหม่จะลืม"
            />
          </p>
          <p>
            <T
              en="`robotos` is a file in `code/…/bin`. It is not installed on the computer. Paste each block in full. A new window needs the block again."
              th="`robotos` เป็นไฟล์ใน `code/…/bin` ไม่ได้ติดตั้งทั้งระบบ วางคำสั่งทั้งบล็อก หน้าต่างใหม่ต้องวางบล็อกเดิมอีกครั้ง"
            />
          </p>
        </section>

        {OS_TRACKS.map((t) => (
          <OsTrackView key={t.key} track={t} />
        ))}
      </main>

      <footer className="mx-auto max-w-[46rem] px-5 pb-10 text-sm text-[var(--muted)]">
        <p>{ui.foot}</p>
      </footer>
    </div>
  )
}
