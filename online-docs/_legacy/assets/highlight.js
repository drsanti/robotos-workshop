/* Lightweight shell/PowerShell highlighter for setup-guide (no CDN). */
(() => {
  'use strict';

  const esc = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function tokenize(code, fence) {
    const kind = (fence || 'text').toLowerCase();
    if (kind === 'text') return [{ type: 'plain', text: code }];

    const rules =
      kind === 'powershell' || kind === 'ps1'
        ? [
            [/#[^\n]*/y, 'comment'],
            [/<(?:#[\s\S]*?#|![^>]*)>/y, 'comment'],
            [/"([^"\\]|\\.)*"/y, 'string'],
            [/'([^'\\]|\\.)*'/y, 'string'],
            [/\$[A-Za-z_][\w:-]*|\$\{[^}]+\}/y, 'variable'],
            [/\b(?:If|Else|ElseIf|ForEach|For|While|Switch|Function|Param|Return|Break|Continue|Try|Catch|Finally|Begin|Process|End)\b/iy, 'keyword'],
            [/\b[A-Z][\w]*-[A-Z][\w]*\b/y, 'command'],
            [/\b(?:cd|pwd|ls|dir|echo|exit|clear)\b/y, 'command'],
            [/--?[\w-]+/y, 'flag'],
            [/\b\d+(?:\.\d+)?\b/y, 'number'],
            [/[=|;&(){}[\]]/y, 'operator'],
          ]
        : [
            [/#[^\n]*/y, 'comment'],
            [/"([^"\\]|\\.)*"/y, 'string'],
            [/'([^'\\]|\\.)*'/y, 'string'],
            [/\$[A-Za-z_][\w]*|\$\{[^}]+\}/y, 'variable'],
            [/\b(?:if|then|else|elif|fi|for|while|do|done|case|esac|function|return|export|source|local|true|false)\b/y, 'keyword'],
            [/\b(?:cd|ls|pwd|chmod|chown|sudo|apt|open|python3?|pip|robotos|serial-bridge|unset|groups|grep)\b/y, 'command'],
            [/\.\/[\w./-]+/y, 'path'],
            [/--?[\w-]+/y, 'flag'],
            [/\b\d+(?:\.\d+)?\b/y, 'number'],
            [/[=|;&(){}[\]]/y, 'operator'],
          ];

    const out = [];
    let i = 0;
    while (i < code.length) {
      let matched = false;
      for (const [re, type] of rules) {
        re.lastIndex = i;
        const m = re.exec(code);
        if (m && m.index === i) {
          out.push({ type, text: m[0] });
          i += m[0].length;
          matched = true;
          break;
        }
      }
      if (matched) continue;
      // gather plain run until next possible token start
      let j = i + 1;
      while (j < code.length) {
        let hit = false;
        for (const [re] of rules) {
          re.lastIndex = j;
          const m = re.exec(code);
          if (m && m.index === j) {
            hit = true;
            break;
          }
        }
        if (hit) break;
        j += 1;
      }
      out.push({ type: 'plain', text: code.slice(i, j) });
      i = j;
    }
    return out;
  }

  function toHtml(tokens) {
    return tokens
      .map(({ type, text }) =>
        type === 'plain'
          ? esc(text)
          : `<span class="tok-${type}">${esc(text)}</span>`
      )
      .join('');
  }

  function highlightElement(preCode) {
    const block = preCode.closest('.code-block');
    const fence = block?.getAttribute('data-fence') || 'text';
    const raw = preCode.textContent;
    preCode.innerHTML = toHtml(tokenize(raw, fence));
  }

  function highlightAll(root = document) {
    root.querySelectorAll('.code-block pre code').forEach(highlightElement);
  }

  globalThis.guideHighlight = { highlightAll, highlightElement, tokenize };
})();
