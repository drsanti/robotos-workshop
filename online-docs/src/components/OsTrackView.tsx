import { Cpu, Terminal } from 'lucide-react'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { Step } from './Step'
import { T } from './LangText'
import { usePrefs } from '../context/PrefsContext'
import type { BoardKey } from '../lib/boards'
import type { OsTrack, SetupBlock } from '../content/setup/types'

function forBoard(boards: BoardKey[] | undefined, board: BoardKey) {
  return !boards || boards.includes(board)
}

function Block({
  block,
  runTitle,
  board,
}: {
  block: SetupBlock
  runTitle?: string
  board: BoardKey
}) {
  if (!forBoard(block.boards, board)) return null
  if (block.type === 'code') {
    return (
      <CodeBlock
        fence={block.fence}
        template={block.template}
        runKind={block.runKind}
        sessionLabel={block.session ?? 'labs'}
        runTitle={runTitle}
      />
    )
  }
  if (block.type === 'callout') {
    return (
      <Callout tone={block.tone}>
        <T en={block.text.en} th={block.text.th} />
      </Callout>
    )
  }
  return (
    <p className="my-2">
      <T en={block.text.en} th={block.text.th} />
    </p>
  )
}

export function OsTrackView({ track }: { track: OsTrack }) {
  const { os, board } = usePrefs()
  if (track.key !== os) return null

  const failures = track.failures.filter((row) => forBoard(row.boards, board))

  return (
    <section id={`os-${track.key}`} className="scroll-mt-4">
      <header className="mb-4 flex items-start gap-3">
        <span className="mt-1 rounded-lg bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
          {track.key === 'win' ? <Cpu size={20} /> : <Terminal size={20} />}
        </span>
        <div>
          <h2 className="m-0 text-2xl font-semibold">{track.title}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            <T en={track.shellTag.en} th={track.shellTag.th} />
          </p>
        </div>
      </header>
      <p className="mb-4">
        <T en={track.lead.en} th={track.lead.th} />
      </p>
      {track.steps.map((step) => {
        const runTitle =
          typeof step.title.en === 'string' ? step.title.en : `Step ${step.num}`
        return (
          <Step key={step.id} id={step.id} num={step.num} titleEn={step.title.en} titleTh={step.title.th}>
            {step.body.map((block, i) => (
              <Block key={i} block={block} runTitle={runTitle} board={board} />
            ))}
          </Step>
        )
      })}
      <section className="mt-8 rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-4">
        <h3 className="mt-0">
          <T en="If something fails" th="ถ้ามีปัญหา" />
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)]">
                <th className="py-2 pr-3 font-semibold">
                  <T en="What you see" th="สิ่งที่เห็น" />
                </th>
                <th className="py-2 font-semibold">
                  <T en="What to do" th="วิธีแก้" />
                </th>
              </tr>
            </thead>
            <tbody>
              {failures.map((row, i) => (
                <tr key={i} className="border-b border-[var(--line)] align-top">
                  <td className="py-2 pr-3">
                    <T en={row.see.en} th={row.see.th} />
                  </td>
                  <td className="py-2">
                    <T en={row.do.en} th={row.do.th} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-0 mt-4 text-[var(--muted)]">
          <T en={track.end.en} th={track.end.th} />
        </p>
      </section>
    </section>
  )
}
