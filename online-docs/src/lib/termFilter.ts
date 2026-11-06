/**
 * Never paint workshop-host Run inject lines into xterm.
 *
 * Host inject:  . '/…/.workshop-host-runs/<uuid>.sh'
 * Also drop zsh partial-line marks (bare `%`) and collapse blank lines
 * left after inject erase.
 */

/** Ambiguous prefixes we must not paint until proven innocent. */
const HOLD_PREFIX = /^\s*(?:s(?:t(?:t(?:y.*)?)?)?|\.(?:\s(?:['"].*)?)?)$/
const INJECT_FULL = /\.workshop-host-runs[/\\][^\s'";]+/i
const STTY_NOISE = /^\s*stty\s+/
/** zsh PROMPT_SP / partial-line mark, or a lone prompt char */
const BARE_PROMPT = /^\s*[%#$]\s*$/

export type TermFilterState = {
  line: string
  holding: boolean
  painted: number
  /** True if the last emitted byte was `\n` (or we erased to a clean line). */
  afterNewline: boolean
}

export function createTermFilterState(): TermFilterState {
  return { line: '', holding: false, painted: 0, afterNewline: true }
}

function stripAnsi(line: string): string {
  return line.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, '')
}

/** Apply backspaces so `.\\x08. '/path'` normalizes for inject detection. */
function applyBackspaces(line: string): string {
  let out = ''
  for (const ch of line) {
    if (ch === '\b' || ch === '\x7f') out = out.slice(0, -1)
    else out += ch
  }
  return out
}

function normalizedLine(line: string): string {
  return applyBackspaces(stripAnsi(line))
}

function shouldDrop(line: string): boolean {
  const cleaned = normalizedLine(line)
  return (
    INJECT_FULL.test(cleaned) ||
    STTY_NOISE.test(cleaned) ||
    BARE_PROMPT.test(cleaned)
  )
}

function shouldHold(line: string): boolean {
  const cleaned = normalizedLine(line)
  if (INJECT_FULL.test(cleaned) || STTY_NOISE.test(cleaned) || BARE_PROMPT.test(cleaned)) {
    return true
  }
  return HOLD_PREFIX.test(cleaned)
}

/** Filter decoded PTY text for xterm.write. */
export function filterTermChunk(state: TermFilterState, chunk: string): string {
  let out = ''

  const paint = (s: string) => {
    out += s
    state.painted += s.length
    if (s.includes('\n')) state.afterNewline = s.endsWith('\n')
    else if (s.length > 0) state.afterNewline = false
  }

  const erasePainted = () => {
    if (state.painted > 0) {
      out += '\r\x1b[2K'
      state.painted = 0
    }
  }

  for (let i = 0; i < chunk.length; i++) {
    const ch = chunk[i]!

    if (ch === '\n') {
      if (shouldDrop(state.line)) {
        erasePainted()
        out += '\r\x1b[2K'
        // Stay at line start — do not emit an extra blank line.
        state.afterNewline = true
      } else if (state.line === '' && state.afterNewline) {
        // Collapse consecutive blank lines (inject/prompt cleanup residue).
      } else if (state.holding) {
        out += state.line + '\n'
        state.afterNewline = true
      } else {
        out += '\n'
        state.afterNewline = true
      }
      state.line = ''
      state.holding = false
      state.painted = 0
      continue
    }

    if (ch === '\r') {
      // \r\n → let the \n handler emit a single newline (xterm convertEol).
      if (i + 1 < chunk.length && chunk[i + 1] === '\n') {
        continue
      }
      // Bare CR — zsh prompt redraw needs this (else "labs % labs %").
      if (!state.holding) paint('\r')
      state.line = ''
      state.holding = false
      state.painted = 0
      continue
    }

    if (ch === '\b' || ch === '\x7f') {
      if (state.line.length > 0) {
        state.line = state.line.slice(0, -1)
        if (!state.holding && state.painted > 0) {
          out += '\b \b'
          state.painted = Math.max(0, state.painted - 1)
        }
      }
      continue
    }

    if (ch === '\x1b') {
      let j = i + 1
      if (j >= chunk.length) {
        // Incomplete ESC — hold the rest of the line buffer as-is next chunk.
        state.line += chunk.slice(i)
        break
      }
      const kind = chunk[j]!
      if (kind === '[') {
        j++
        while (j < chunk.length) {
          const c = chunk[j++]!
          if (c >= '@' && c <= '~') break
        }
      } else if (kind === ']') {
        // OSC: ESC ] … BEL / ST (shellMarks should already strip 133)
        j++
        while (j < chunk.length) {
          if (chunk[j] === '\x07') {
            j++
            break
          }
          if (chunk[j] === '\x1b' && j + 1 < chunk.length && chunk[j + 1] === '\\') {
            j += 2
            break
          }
          j++
        }
        if (j >= chunk.length && chunk[chunk.length - 1] !== '\x07') {
          // Incomplete OSC across chunks
          state.line += chunk.slice(i)
          break
        }
      } else {
        j = Math.min(i + 2, chunk.length)
      }
      const seq = chunk.slice(i, j)
      i = j - 1
      if (!state.holding) paint(seq)
      continue
    }

    state.line += ch

    if (!state.holding && shouldHold(state.line)) {
      state.holding = true
      erasePainted()
      continue
    }

    if (state.holding) {
      if (shouldHold(state.line) || shouldDrop(state.line)) continue
      out += state.line
      state.painted += state.line.length
      state.afterNewline = false
      state.holding = false
      continue
    }

    paint(ch)
  }

  return out
}

export function flushTermFilter(state: TermFilterState): string {
  if (state.holding || shouldDrop(state.line)) {
    state.line = ''
    state.holding = false
    state.painted = 0
    return ''
  }
  const rest = state.line
  state.line = ''
  state.painted = 0
  return rest
}
