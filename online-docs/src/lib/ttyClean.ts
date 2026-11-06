/** Strip ANSI / terminal control noise for the workshop terminal dock. */

export type TtyCleanState = {
  /** Incomplete ESC sequence waiting for more bytes */
  esc: string
  /** Current line being edited (for bare CR / backspace) */
  line: string
}

export function createTtyCleanState(): TtyCleanState {
  return { esc: '', line: '' }
}

/**
 * Incremental cleaner — keeps state across WebSocket chunks.
 * Returns text that should be appended to the log (complete lines only).
 * Callers can also render `state.line` as a live trailing line.
 *
 * Important: PTY shells emit `\r\n`. A bare `\r` redraws the line; `\r` before
 * `\n` must NOT clear the line or every output line is discarded.
 */
export function cleanTtyStream(state: TtyCleanState, input: string): string {
  let committed = ''
  let i = 0

  const push = (ch: string) => {
    if (ch === '\n') {
      committed += state.line + '\n'
      state.line = ''
      return
    }
    if (ch === '\r') {
      // Handled in the main loop (needs lookahead for \r\n).
      return
    }
    if (ch === '\b' || ch === '\u007f') {
      state.line = state.line.slice(0, -1)
      return
    }
    if (ch === '\u0007') return
    if (ch < ' ' && ch !== '\t') return
    state.line += ch
  }

  const data = state.esc + input
  state.esc = ''

  while (i < data.length) {
    const ch = data[i]!

    if (ch === '\r') {
      // `\r\n` → newline (keep line content). Bare `\r` → progress redraw.
      if (i + 1 >= data.length) {
        // Might be split across chunks: hold CR in esc buffer as a sentinel.
        state.esc = '\r'
        break
      }
      if (data[i + 1] === '\n') {
        i += 2
        committed += state.line + '\n'
        state.line = ''
        continue
      }
      state.line = ''
      i++
      continue
    }

    if (ch === '\u001b') {
      let j = i + 1
      if (j >= data.length) {
        state.esc = data.slice(i)
        break
      }
      const n0 = data[j]!

      if (n0 === '[') {
        j++
        let complete = false
        while (j < data.length) {
          const c = data[j]!
          j++
          if (c >= '@' && c <= '~') {
            complete = true
            break
          }
        }
        if (!complete) {
          state.esc = data.slice(i)
          break
        }
        i = j
        continue
      }

      if (n0 === ']') {
        j++
        let complete = false
        while (j < data.length) {
          if (data[j] === '\u0007') {
            j++
            complete = true
            break
          }
          if (data[j] === '\u001b' && j + 1 < data.length && data[j + 1] === '\\') {
            j += 2
            complete = true
            break
          }
          j++
        }
        if (!complete) {
          state.esc = data.slice(i)
          break
        }
        i = j
        continue
      }

      if (j + 1 <= data.length) {
        i = j + 1
        continue
      }
      state.esc = data.slice(i)
      break
    }

    push(ch)
    i++
  }

  return committed
}
