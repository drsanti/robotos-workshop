/**
 * FinalTerm / VS Code shell integration markers (OSC 133).
 *
 * C — command output starts
 * D;<code> — command finished with exit code
 *
 * workshop-host wraps Run scripts with these; we strip them from the
 * painted stream and surface events for the dock chip / Copy.
 */

export type ShellMarkEvent =
  | { type: 'cmd-start' }
  | { type: 'cmd-end'; exitCode: number }

export type ShellMarkState = {
  /** Incomplete ESC/OSC carry across WebSocket chunks. */
  pending: string
}

export function createShellMarkState(): ShellMarkState {
  return { pending: '' }
}

function parseExit(raw: string | undefined): number {
  if (raw === undefined || raw === '') return 0
  const n = Number(raw)
  return Number.isFinite(n) ? n : 0
}

/**
 * Strip OSC 133 C/D from `chunk`, pass other bytes through (including other OSC).
 * Incomplete sequences stay in `state.pending`.
 */
export function feedShellMarks(
  state: ShellMarkState,
  chunk: string,
): { text: string; events: ShellMarkEvent[] } {
  const data = state.pending + chunk
  state.pending = ''
  let text = ''
  const events: ShellMarkEvent[] = []
  let i = 0

  while (i < data.length) {
    if (data[i] !== '\x1b') {
      text += data[i]!
      i++
      continue
    }

    // Lone ESC at end of chunk — wait for more.
    if (i + 1 >= data.length) {
      state.pending = data.slice(i)
      break
    }

    const kind = data[i + 1]!

    // OSC: ESC ] … BEL  or  ESC ] … ESC \
    if (kind === ']') {
      let j = i + 2
      let termAt = -1
      while (j < data.length) {
        if (data[j] === '\x07') {
          termAt = j + 1
          break
        }
        if (data[j] === '\x1b' && j + 1 < data.length && data[j + 1] === '\\') {
          termAt = j + 2
          break
        }
        j++
      }
      if (termAt < 0) {
        state.pending = data.slice(i)
        break
      }
      const bodyEnd = data[termAt - 1] === '\x07' ? termAt - 1 : termAt - 2
      const body = data.slice(i + 2, bodyEnd)
      if (body.startsWith('133;')) {
        const parts = body.split(';')
        const op = parts[1]
        if (op === 'C') {
          events.push({ type: 'cmd-start' })
        } else if (op === 'D') {
          events.push({ type: 'cmd-end', exitCode: parseExit(parts[2]) })
        }
        // Drop from painted stream.
      } else {
        text += data.slice(i, termAt)
      }
      i = termAt
      continue
    }

    // CSI and other short sequences — pass through for termFilter / xterm.
    text += data[i]!
    i++
  }

  return { text, events }
}
