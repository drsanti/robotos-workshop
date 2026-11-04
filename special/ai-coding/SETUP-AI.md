# Setup — AI Coding Assistance workshop

Do the main [`SETUP.md`](../../SETUP.md) first (sim + `robotos` CLI +
`.venv`). This page adds only what the AI workshop needs.

## 1. An AI coding assistant

The instructor picks the tool and how students get access (school licence,
student plan, or a shared class account). The labs use **Claude Code** as
the reference tool:

- Desktop app or VS Code extension: sign in, then open the
  `robotos-workshop` folder.
- Terminal: install per the official docs, then run `claude` in the
  workshop root.

Other assistants (GitHub Copilot, Cursor, Codex, Gemini CLI …) work for
Parts A and D. For Parts B and C, use the matching file names from
[`handouts/cheat-sheet.md`](handouts/cheat-sheet.md).

Check: ask the assistant *"What files are in labs/wh? Don't change
anything."* It should list `wh-00` … `wh-08`.

## 2. MCP SDK (only for ai-07, ai-09, ai-13)

Install into the **same** workshop `.venv` that has the robotos wheel:

### macOS

```bash
.venv/bin/python -m pip install "mcp>=2.3,<3"
.venv/bin/python -c "from mcp.server import MCPServer; print('mcp ok')"
```

### Windows (PowerShell)

```powershell
.venv\Scripts\python -m pip install "mcp>=2.3,<3"
.venv\Scripts\python -c "from mcp.server import MCPServer; print('mcp ok')"
```

> The MCP Python SDK changed its import in v2 (`mcp.server.MCPServer`).
> Older tutorials that use `mcp.server.fastmcp.FastMCP` are for v1.

## 3. Git

Labs ask you to look at diffs. Make sure `git status` works in the workshop
folder, and commit (or copy the folder) **before** each lab so you can roll
back what the AI did:

```bash
git add -A && git commit -m "before ai-0X"
```

## 4. Where your work goes

Each lab says where to put files. Two kinds:

| Kind | Where | Why |
|------|-------|-----|
| Config the tool reads (`AGENTS.md`, `.claude/…`, `.mcp.json`) | Workshop root | Tools look for them there |
| Your notes, `prompts.md`, reports | `special/ai-coding/work/<your-name>/` | Easy to hand in; one folder per student |

The **starters** in each lab are templates. Copy them where the lab says;
don't edit them in place.
