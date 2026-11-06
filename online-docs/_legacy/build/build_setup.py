#!/usr/bin/env python3
"""Build the follow-along HTML setup page under online-docs/setup/."""

from __future__ import annotations

import html
import re
import sys
from pathlib import Path

BUILD_DIR = Path(__file__).resolve().parent
DOCS_ROOT = BUILD_DIR.parent
WORKSHOP_ROOT = DOCS_ROOT.parent
sys.path.insert(0, str(BUILD_DIR))

from th_setup import TH  # noqa: E402
from th_setup import t as th_lookup  # noqa: E402

SRC = WORKSHOP_ROOT / "SETUP.md"
OUT = DOCS_ROOT / "setup" / "index.html"

OS_IDS = {"windows": "win", "macos": "mac", "linux": "linux"}
OS_SHELL = {"windows": "PowerShell", "macos": "Terminal", "linux": "bash"}
OS_SHELL_TH = {
    "windows": "ใช้ <strong>PowerShell</strong> อยู่กับแทร็กนี้จนจบ",
    "macos": "ใช้ <strong>Terminal</strong> อยู่กับแทร็กนี้จนจบ",
    "linux": "ใช้ <strong>bash</strong> อยู่กับแทร็กนี้จนจบ",
}


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def inpage_href(href: str) -> str | None:
    if href in ("#windows", "#macos", "#linux"):
        return {"#windows": "#os-win", "#macos": "#os-mac", "#linux": "#os-linux"}[href]
    if href.startswith("#"):
        return href
    if href.startswith(("http://", "https://", "mailto:")):
        return href
    return None


def format_label(label: str) -> str:
    label = label.strip()
    if label.startswith("`") and label.endswith("`") and label.count("`") == 2:
        return f"<code>{esc(label[1:-1])}</code>"
    return esc(label)


def inline(text: str) -> str:
    parts: list[str] = []
    i = 0
    pattern = re.compile(r"`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)")
    for m in pattern.finditer(text):
        parts.append(esc(text[i : m.start()]))
        if m.group(1) is not None:
            parts.append(f"<code>{esc(m.group(1))}</code>")
        elif m.group(2) is not None:
            parts.append(f"<strong>{esc(m.group(2))}</strong>")
        else:
            label_html = format_label(m.group(3))
            href = inpage_href(m.group(4))
            if href:
                parts.append(f'<a href="{esc(href)}">{label_html}</a>')
            else:
                parts.append(label_html)
        i = m.end()
    parts.append(esc(text[i:]))
    return "".join(parts)


def bi_text(en_md: str) -> str:
    """Inline HTML for EN, or EN+TH spans when a Thai string exists."""
    en_html = inline(en_md)
    th_md = th_lookup(en_md)
    if not th_md:
        return en_html
    return (
        f'<span data-lang="en">{en_html}</span>'
        f'<span data-lang="th" hidden>{inline(th_md)}</span>'
    )


def bi_tag(tag: str, en_md: str, class_name: str = "") -> str:
    th_md = th_lookup(en_md)
    cls = f' class="{class_name}"' if class_name else ""
    if not th_md:
        return f"<{tag}{cls}>{inline(en_md)}</{tag}>"
    return (
        f'<{tag}{cls} data-lang="en">{inline(en_md)}</{tag}>'
        f'<{tag}{cls} data-lang="th" hidden>{inline(th_md)}</{tag}>'
    )


def parse_table(rows: list[str]) -> str:
    body = []
    header = None
    for row in rows:
        cells = [c.strip() for c in row.strip().strip("|").split("|")]
        if all(re.fullmatch(r":?-+:?", c or "") for c in cells):
            continue
        if header is None:
            header = cells
            continue
        body.append(cells)
    if not header:
        return ""
    thead = "".join(f"<th>{bi_text(c)}</th>" for c in header)
    trs = []
    for cells in body:
        while len(cells) < len(header):
            cells.append("")
        trs.append(
            "<tr>"
            + "".join(f"<td>{bi_text(c)}</td>" for c in cells[: len(header)])
            + "</tr>"
        )
    return (
        '<div class="table-wrap"><table>'
        f"<thead><tr>{thead}</tr></thead>"
        f'<tbody>{"".join(trs)}</tbody></table></div>'
    )


def parse_blocks(lines: list[str]) -> list[dict]:
    blocks: list[dict] = []
    i = 0
    n = len(lines)

    def flush_para(buf: list[str]) -> None:
        text = " ".join(s.strip() for s in buf if s.strip())
        if text:
            blocks.append({"type": "p", "text": text})

    while i < n:
        line = lines[i]
        stripped = line.strip()
        if not stripped:
            i += 1
            continue
        if stripped.startswith("```"):
            lang = stripped[3:].strip() or "text"
            i += 1
            code: list[str] = []
            while i < n and not lines[i].strip().startswith("```"):
                code.append(lines[i].rstrip("\n"))
                i += 1
            if i < n:
                i += 1
            blocks.append({"type": "code", "lang": lang, "code": "\n".join(code)})
            continue
        if stripped.startswith("|"):
            rows = []
            while i < n and lines[i].strip().startswith("|"):
                rows.append(lines[i].strip())
                i += 1
            blocks.append({"type": "table", "html": parse_table(rows)})
            continue
        if stripped.startswith("- "):
            items = []
            while i < n and lines[i].strip().startswith("- "):
                items.append(lines[i].strip()[2:])
                i += 1
            blocks.append({"type": "ul", "items": items})
            continue
        if stripped.startswith("### "):
            blocks.append({"type": "h3", "text": stripped[4:]})
            i += 1
            continue
        if stripped.startswith("## "):
            blocks.append({"type": "h2", "text": stripped[3:]})
            i += 1
            continue
        if stripped == "---":
            blocks.append({"type": "hr"})
            i += 1
            continue
        para = [stripped]
        i += 1
        while i < n:
            nxt = lines[i].strip()
            if (
                not nxt
                or nxt.startswith("#")
                or nxt.startswith("```")
                or nxt.startswith("|")
                or nxt.startswith("- ")
                or nxt == "---"
            ):
                break
            para.append(nxt)
            i += 1
        flush_para(para)
    return blocks


def split_setup(md: str) -> tuple[list[dict], dict[str, list[dict]]]:
    lines = md.splitlines()
    start = 0
    if lines and lines[0].startswith("# "):
        start = 1
    while start < len(lines) and not lines[start].strip():
        start += 1

    os_heads = {}
    for idx, line in enumerate(lines):
        m = re.match(r"^## (Windows|macOS|Linux)\s*$", line)
        if m:
            os_heads[m.group(1).lower()] = idx

    order = ["windows", "macos", "linux"]
    first_os = min(os_heads[k] for k in order if k in os_heads)
    intro_lines = []
    for ln in lines[start:first_os]:
        s = ln.strip()
        if s.startswith("Follow-along HTML"):
            continue
        if s.startswith("Lab map:"):
            m = re.search(r"Each lab sheet .+", s)
            if m:
                intro_lines.append(m.group(0))
            continue
        intro_lines.append(ln)
    intro = parse_blocks(intro_lines)

    sections: dict[str, list[dict]] = {}
    for i, name in enumerate(order):
        if name not in os_heads:
            continue
        a = os_heads[name] + 1
        b = (
            os_heads[order[i + 1]]
            if i + 1 < len(order) and order[i + 1] in os_heads
            else len(lines)
        )
        chunk = lines[a:b]
        while chunk and chunk[-1].strip() in ("", "---"):
            chunk = chunk[:-1]
        sections[name] = parse_blocks(chunk)
    return intro, sections


def group_steps(blocks: list[dict]) -> list[dict]:
    lead: list[dict] = []
    steps: list[dict] = []
    failures: list[dict] = []
    current: dict | None = None
    mode = "lead"
    for b in blocks:
        if b["type"] == "h3":
            title = b["text"]
            if title.lower().startswith("if something fails"):
                mode = "failures"
                current = None
                failures.append(b)
                continue
            mode = "step"
            current = {"title": title, "blocks": []}
            steps.append(current)
            continue
        if mode == "lead":
            lead.append(b)
        elif mode == "failures":
            failures.append(b)
        elif current is not None:
            current["blocks"].append(b)
    return [
        {"type": "lead", "blocks": lead},
        *[{"type": "step", **s} for s in steps],
        {"type": "failures", "blocks": failures},
    ]


def render_blocks(blocks: list[dict], *, copyable: bool = True) -> str:
    out = []
    for b in blocks:
        t = b["type"]
        if t == "p":
            text = b["text"]
            if text.startswith("**Window "):
                out.append(bi_tag("p", text, "callout"))
            elif text.startswith("End of the "):
                out.append(bi_tag("p", text, "section-end"))
            else:
                out.append(bi_tag("p", text))
        elif t == "ul":
            # Prefer one list with bilingual items so markers stay shared.
            items = "".join(f"<li>{bi_text(it)}</li>" for it in b["items"])
            out.append(f"<ul>{items}</ul>")
        elif t == "table":
            out.append(b["html"])
        elif t == "code":
            code = b["code"]
            lang = b["lang"]
            copy_btn = (
                f'<button type="button" class="copy" data-copy="{esc(code)}">'
                f'<span data-ui="copy">Copy</span></button>'
                if copyable
                else ""
            )
            out.append(
                f'<div class="code-block" data-fence="{esc(lang)}" data-template="{esc(code)}">'
                f'<div class="code-meta"><span>{esc(lang)}</span>{copy_btn}</div>'
                f"<pre><code>{esc(code)}</code></pre></div>"
            )
        elif t == "h3":
            out.append(bi_tag("h3", b["text"]))
        elif t == "hr":
            out.append("<hr>")
    return "\n".join(out)


def render_os(name: str, blocks: list[dict]) -> str:
    oid = OS_IDS[name]
    label = {"windows": "Windows", "macos": "macOS", "linux": "Linux"}[name]
    shell = OS_SHELL[name]
    grouped = group_steps(blocks)
    parts = [
        f'<section class="os-panel" data-os="{oid}" id="os-{oid}"{" hidden" if oid != "win" else ""}>',
        f'<header class="os-head"><h2>{esc(label)}</h2>',
        f'<p class="shell-tag" data-lang="en">Use <strong>{esc(shell)}</strong>. Stay in this track until the end.</p>',
        f'<p class="shell-tag" data-lang="th" hidden>{OS_SHELL_TH[name]}</p>',
        "</header>",
    ]
    step_n = 0
    for g in grouped:
        if g["type"] == "lead":
            parts.append(f'<div class="os-lead">{render_blocks(g["blocks"])}</div>')
        elif g["type"] == "step":
            step_n += 1
            sid = f"{oid}-step-{step_n}"
            parts.append(
                f'<article class="step" id="{sid}" data-step="{step_n}">'
                f'<div class="step-head">'
                f'<label class="step-check"><input type="checkbox" data-check="{sid}">'
                f'<span class="step-num">{step_n}</span>'
                f'{bi_tag("h3", g["title"])}</label>'
                f'<time class="step-done-at" hidden datetime=""></time>'
                f"</div>"
                f'<div class="step-body">{render_blocks(g["blocks"])}</div>'
                f"</article>"
            )
        elif g["type"] == "failures":
            parts.append(
                f'<section class="failures" id="{oid}-failures">'
                f"{render_blocks(g['blocks'], copyable=True)}"
                f"</section>"
            )
    parts.append("</section>")
    return "\n".join(parts)


def build() -> None:
    md = SRC.read_text(encoding="utf-8")
    intro, sections = split_setup(md)
    intro_html = render_blocks(intro)
    os_html = "\n".join(
        render_os(name, sections[name])
        for name in ("windows", "macos", "linux")
        if name in sections
    )

    page = f"""<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>robotos · Setup guide</title>
  <script>
    try {{
      var t = localStorage.getItem('robotos-setup-guide-theme');
      if (t !== 'light' && t !== 'dark')
        t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', t);
      var os = (location.hash || '').replace(/^#/, '');
      if (os === 'windows') os = 'os-win';
      if (os === 'macos') os = 'os-mac';
      if (os === 'linux') os = 'os-linux';
      if (os !== 'os-win' && os !== 'os-mac' && os !== 'os-linux') {{
        var savedOs = localStorage.getItem('robotos-setup-guide-os');
        os = savedOs === 'mac' ? 'os-mac' : savedOs === 'linux' ? 'os-linux' : 'os-win';
      }}
      document.documentElement.setAttribute('data-boot-os', os);
    }} catch (e) {{}}
  </script>
  <link rel="stylesheet" href="../assets/style.css">
  <script defer src="../assets/highlight.js"></script>
  <script defer src="../assets/app.js"></script>
</head>
<body class="os-chosen">
  <a class="skip" href="#guide" data-ui="skip">Skip to guide</a>
  <header class="top">
    <div class="top-toolbar">
      <div class="top-inner top-toolbar-inner">
        <div class="top-brand-block">
          <a class="brand" href="../index.html"><span class="mark">r/</span> robotos <span class="quiet" data-ui="brandQuiet">setup guide</span></a>
        </div>
        <div class="top-actions">
          <button type="button" id="theme-toggle" aria-label="Theme: Light (D to switch)" title="Theme: Light · D to switch">Light</button>
          <button type="button" id="lang-toggle" aria-label="Language EN (L to switch)" title="Language: EN · L to switch">EN</button>
        </div>
      </div>
    </div>
    <div class="top-config">
      <div class="top-inner top-config-inner">
        <section class="config-card" id="config-card" data-open="true">
          <button type="button" class="config-card-toggle" id="config-toggle"
            aria-expanded="true" aria-controls="config-card-body">
            <span class="config-card-title" data-ui="configHeading">Your setup</span>
            <span class="config-card-summary" id="config-summary"></span>
            <span class="config-card-chevron" aria-hidden="true"></span>
          </button>
          <div class="config-card-body" id="config-card-body">
            <div class="config-grid">
              <div class="config-field">
                <span class="config-label" data-ui="osPicker">Your computer</span>
                <nav class="os-picker" aria-label="Your computer" data-ui-aria="osPicker">
                  <button type="button" data-os="win" aria-pressed="true">Windows</button>
                  <button type="button" data-os="mac" aria-pressed="false">macOS</button>
                  <button type="button" data-os="linux" aria-pressed="false">Linux</button>
                </nav>
              </div>
              <div class="config-field">
                <label class="workshop-dir" for="workshop-dir">
                  <span class="config-label" data-ui="workshopDir">Workshop folder</span>
                  <input id="workshop-dir" type="text" spellcheck="false" autocomplete="off"
                    placeholder="/Users/you/robotos-workshop">
                </label>
              </div>
            </div>
          </div>
        </section>
        <div class="track-progress" id="track-progress" hidden>
          <div class="track-progress-meta">
            <span class="track-progress-label" data-ui="progressLabel">Track progress</span>
            <span class="track-progress-count" id="track-progress-count">0 / 5</span>
          </div>
          <div class="track-progress-bar" id="track-progress-bar" role="progressbar"
            aria-valuemin="0" aria-valuemax="5" aria-valuenow="0" aria-labelledby="track-progress-count">
            <span class="track-progress-fill" id="track-progress-fill"></span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main id="guide" class="guide">
    <section class="shared" id="shared">
      <h1 data-lang="en">SETUP — student machine</h1>
      <h1 data-lang="th" hidden>SETUP — เครื่องของนักเรียน</h1>
      {intro_html}
    </section>

    <div id="os-panels">
      {os_html}
    </div>
  </main>

  <footer class="foot">
    <p data-lang="en">Workshop root is the folder that contains this guide’s matching workshop files (<code>code/</code>, <code>labs/</code>, <code>scripts/</code>). Replace <code>YOUR_WORKSHOP_DIR</code> with that path, or <code>cd</code> there first.</p>
    <p data-lang="th" hidden>รากเวิร์กช็อปคือโฟลเดอร์ที่มีไฟล์เวิร์กช็อปคู่กับคู่มือนี้ (<code>code/</code>, <code>labs/</code>, <code>scripts/</code>) ให้แทน <code>YOUR_WORKSHOP_DIR</code> ด้วย path นั้น หรือ <code>cd</code> ไปที่โฟลเดอร์ก่อน</p>
  </footer>
</body>
</html>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(page, encoding="utf-8")
    print(f"Wrote {OUT.relative_to(WORKSHOP_ROOT)} from {SRC.name} ({len(TH)} Thai strings)")


if __name__ == "__main__":
    build()
