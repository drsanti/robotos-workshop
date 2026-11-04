# Cheat sheet: same idea, different tools

Checked against vendor docs on **2026-11-04**. These formats change often.
Re-check before each class run, and trust the tool's own docs over this
sheet when they disagree.

## Where each thing lives

| Purpose | Open standard | Claude Code | Cursor | GitHub Copilot | Codex |
|---------|---------------|-------------|--------|----------------|-------|
| **Project memory** | `AGENTS.md` (nested, nearest wins) | `CLAUDE.md` or `.claude/CLAUDE.md`; reads `AGENTS.md` only if no CLAUDE.md | `AGENTS.md` (nested OK) | `.github/copilot-instructions.md`; also `AGENTS.md` (nearest wins) | `AGENTS.md` |
| **Personal memory** | – | `~/.claude/CLAUDE.md`, `CLAUDE.local.md` (gitignore it) | User Rules (settings) | personal instructions (settings) | `~/.codex/AGENTS.md` |
| **Scoped rules** | – | `.claude/rules/*.md` + `paths:` | `.cursor/rules/*.mdc` + `globs` / `alwaysApply` / `description` | `.github/instructions/*.instructions.md` + `applyTo` | nested `AGENTS.md` |
| **Skills** | `SKILL.md` ([agentskills.io](https://agentskills.io)) | `.claude/skills/<name>/SKILL.md` | supported (see docs) | supported (see docs) | `.agents/skills/<name>/SKILL.md` |
| **Subagents / custom agents** | – | `.claude/agents/<name>.md` | supported (see docs) | custom agents (see docs) | see docs |
| **MCP servers** | MCP ([modelcontextprotocol.io](https://modelcontextprotocol.io)) | `.mcp.json` (project) / `claude mcp add` | `.cursor/mcp.json` | `.vscode/mcp.json` (VS Code) | `~/.codex/config.toml` |
| **Hooks** | – | `"hooks"` in `.claude/settings.json` | see docs | see docs | see docs |
| **Permissions** | – | `"permissions"` allow / ask / deny in settings | settings | settings | sandbox / approval settings |
| **Plugins / bundles** | – | `.claude-plugin/plugin.json` + `skills/ agents/ hooks/ .mcp.json` | see docs | see docs | see docs |

"See docs" = the tool has something similar but we haven't checked its exact
file format for this sheet.

## File formats (Claude Code / open standard)

### `SKILL.md` (open standard)

```markdown
---
name: run-lab                # lowercase-hyphen, = folder name, ≤ 64 chars
description: What it does + when to use it (≤ 1024 chars).
---
Steps… Reference files one level deep: scripts/check.py, references/X.md
```

Open-standard optional fields: `license`, `compatibility`, `metadata`,
`allowed-tools`. Claude Code also accepts `disable-model-invocation`,
`paths`, `context: fork`, `arguments`, etc. (other tools may reject these).

### Rule (Claude Code)

```markdown
---
paths:
  - "labs/hw/**"
---
- rule…
```

### Rule (Cursor `.mdc`)

```markdown
---
description: When this applies
globs: labs/hw/**
alwaysApply: false
---
- rule…
```

### Rule (Copilot)

```markdown
---
applyTo: "labs/hw/**"
---
- rule…
```

### Subagent (Claude Code)

```markdown
---
name: lab-reviewer           # required
description: When to delegate # required
tools: Read, Grep, Glob      # optional allowlist
model: sonnet                # optional
---
System prompt…
```

### `.mcp.json` (Claude Code, stdio)

```json
{ "mcpServers": { "robotos": {
    "command": "${CLAUDE_PROJECT_DIR:-.}/.venv/bin/python",
    "args": ["path/to/server.py"],
    "env": { "KEY": "${KEY}" } } } }
```

### Hooks (in `.claude/settings.json`)

```json
{ "hooks": { "PreToolUse": [ { "matcher": "Edit|Write",
    "hooks": [ { "type": "command", "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/guard.py\"" } ] } ] } }
```

Input: tool call JSON on **stdin**. **Exit 2** = block (stderr → model).
Exit 0 = continue. Other codes = non-blocking error.

### Permissions (in `.claude/settings.json`)

```json
{ "permissions": {
    "allow": ["Bash(robotos topic list)"],
    "ask":   ["Bash(git push *)"],
    "deny":  ["Read(./.env)", "Edit(/code/**)"] } }
```

Paths: `/x` = relative to the settings file's project, `./x` = cwd,
`//x` = absolute, `~/x` = home. Deny wins.

### Plugin manifest (`.claude-plugin/plugin.json`)

```json
{ "name": "robotos-workshop-kit", "version": "0.1.0",
  "description": "…", "author": { "name": "…" } }
```

Only `plugin.json` goes inside `.claude-plugin/`. Use `${CLAUDE_PLUGIN_ROOT}`
for paths to files inside the plugin. Test with
`claude plugin validate <dir>` and `claude --plugin-dir <dir>`.

## Useful Claude Code commands

| Command | Shows / does |
|---------|--------------|
| `/memory` | Which CLAUDE.md / AGENTS.md / rules are loaded |
| `/context` | How full the context window is |
| `/mcp` | MCP servers and status |
| `/hooks` | Active hooks |
| `/plugin` | Installed plugins, errors |
| `/init` | Draft a CLAUDE.md for the repo |

## What loads when (context cost)

| Thing | In context |
|-------|------------|
| CLAUDE.md / AGENTS.md (root + parents) | Always, every session |
| Nested CLAUDE.md / AGENTS.md | When the agent works in that folder |
| Rule without `paths` | Always |
| Rule with `paths` | When a matching file is read/edited |
| Skill | Name + description always; body when used; files when referenced |
| Subagent | Name + description always; runs in its own context |
| MCP tools | Tool names/descriptions (may be deferred/searched when there are many) |
| Hooks, permissions | Never in context. The app runs them |
