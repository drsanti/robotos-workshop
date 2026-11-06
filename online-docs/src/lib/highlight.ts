export type TokenType =
  | 'plain'
  | 'comment'
  | 'string'
  | 'variable'
  | 'keyword'
  | 'command'
  | 'flag'
  | 'number'
  | 'operator'
  | 'path'

export type Token = { type: TokenType; text: string }

type Rule = [RegExp, Exclude<TokenType, 'plain'>]

function powershellRules(): Rule[] {
  return [
    [/#[^\n]*/y, 'comment'],
    [/<(?:#[\s\S]*?#|![^>]*)>/y, 'comment'],
    [/"([^"\\]|\\.)*"/y, 'string'],
    [/'([^'\\]|\\.)*'/y, 'string'],
    [/\$[A-Za-z_][\w:-]*|\$\{[^}]+\}/y, 'variable'],
    [
      /\b(?:If|Else|ElseIf|ForEach|For|While|Switch|Function|Param|Return|Break|Continue|Try|Catch|Finally|Begin|Process|End)\b/iy,
      'keyword',
    ],
    [/\b[A-Z][\w]*-[A-Z][\w]*\b/y, 'command'],
    [/\b(?:cd|pwd|ls|dir|echo|exit|clear|robotos|serial-bridge|python|pip)\b/y, 'command'],
    [/--?[\w-]+/y, 'flag'],
    [/\b\d+(?:\.\d+)?\b/y, 'number'],
    [/[=|;&(){}[\]]/y, 'operator'],
  ]
}

function shellRules(): Rule[] {
  return [
    [/#[^\n]*/y, 'comment'],
    [/"([^"\\]|\\.)*"/y, 'string'],
    [/'([^'\\]|\\.)*'/y, 'string'],
    [/\$[A-Za-z_][\w]*|\$\{[^}]+\}/y, 'variable'],
    [
      /\b(?:if|then|else|elif|fi|for|while|do|done|case|esac|function|return|export|source|local|true|false)\b/y,
      'keyword',
    ],
    [
      /\b(?:cd|ls|pwd|chmod|chown|sudo|apt|open|python3?|pip|robotos|serial-bridge|unset|groups|grep)\b/y,
      'command',
    ],
    [/\.\/[\w./-]+/y, 'path'],
    [/--?[\w-]+/y, 'flag'],
    [/\b\d+(?:\.\d+)?\b/y, 'number'],
    [/[=|;&(){}[\]]/y, 'operator'],
  ]
}

export function tokenize(code: string, fence = 'text'): Token[] {
  const kind = fence.toLowerCase()
  if (kind === 'text') return [{ type: 'plain', text: code }]

  const rules = kind === 'powershell' || kind === 'ps1' ? powershellRules() : shellRules()
  const out: Token[] = []
  let i = 0

  while (i < code.length) {
    let matched = false
    for (const [re, type] of rules) {
      re.lastIndex = i
      const m = re.exec(code)
      if (m && m.index === i) {
        out.push({ type, text: m[0] })
        i += m[0].length
        matched = true
        break
      }
    }
    if (matched) continue

    let j = i + 1
    while (j < code.length) {
      let hit = false
      for (const [re] of rules) {
        re.lastIndex = j
        const m = re.exec(code)
        if (m && m.index === j) {
          hit = true
          break
        }
      }
      if (hit) break
      j += 1
    }
    out.push({ type: 'plain', text: code.slice(i, j) })
    i = j
  }

  return out
}
