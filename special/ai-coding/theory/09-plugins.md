# Theory — Plugins & sharing a setup

**Who / when:** Extend block, before **ai-09**
**Time:** ~15 min

> **Practice lab:** [`ai-09-plugins`](../labs/ai-09-plugins/)

## Learning outcomes

- Explain a plugin as **one installable bundle** of skills, agents, hooks and MCP servers
- Lay out a plugin folder and load it for one session
- Decide what to share as a plugin, what to commit to the repo, and what to keep local

## Talking points

1. **Standalone first.** Skills, agents, hooks, MCP all work without a plugin. Make a plugin to **share** one setup across projects or people, with versions.
2. **Layout (Claude Code):**
   ```text
   robotos-workshop-kit/
     .claude-plugin/plugin.json   ← only the manifest goes here
     skills/run-lab/SKILL.md
     agents/lab-reviewer.md
     hooks/hooks.json             ← same shape as "hooks" in settings
     .mcp.json
   ```
   `plugin.json` needs only `name`; add `description`, `version`, `author`.
3. **Names get a prefix:** skill `run-lab` becomes `/robotos-workshop-kit:run-lab`, so two plugins can't clash.
4. **Try without installing:** `claude --plugin-dir ./robotos-workshop-kit`; check with `claude plugin validate <dir>`; `/reload-plugins` after edits.
5. **Share:** give the folder/zip, or list it in a **marketplace** (a repo with `.claude-plugin/marketplace.json`).
6. **Cost:** an enabled plugin's skill/agent descriptions sit in context **every** turn, and its MCP servers and hooks run in every session. Disable what you don't use.
7. **Trust:** a plugin runs code as you. Same rules as card 12.

## What goes where

| Thing | Where | Why |
|-------|-------|-----|
| Team rules for *this* repo | `AGENTS.md`, `.claude/` committed | Everyone cloning gets them |
| Your own habits | `~/.claude/`, `CLAUDE.local.md` | Not forced on others |
| A toolkit for many repos / classes | Plugin | Install once, versioned |
| Secrets (API keys) | Env vars, never in any of the above | Repos and plugins get shared |

## Check questions

- Where must `skills/` go: inside `.claude-plugin/` or next to it? (**Next to it; only plugin.json goes inside.**)
- Two plugins both have a `run-lab` skill. Conflict? (**No, prefixes differ.**)
- Why not install 30 plugins "just in case"? (**Context cost every turn + more code running as you.**)
