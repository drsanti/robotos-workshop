# Lab AI-09 — Plugins: share your setup

## Goal

Package your work from ai-05 (skill), ai-06 (subagent), ai-07 (MCP server)
and ai-08 (hooks) into **one plugin**, and have a classmate load it.

## Learning outcomes

- Lay out a plugin folder and write `plugin.json`
- Load, validate and debug a plugin without a marketplace
- Decide what belongs in a plugin vs. the repo vs. your own config

## Prerequisites

- AI-05 … AI-08 done
- Theory: [`09-plugins`](../../theory/09-plugins.md)

## Steps

1. Copy [`starter/robotos-workshop-kit/`](starter/robotos-workshop-kit/) to
   `work/<your-name>/robotos-workshop-kit/`. Edit `plugin.json` (author name).
2. Move your pieces in (copies, keep the originals for now):

   | From | To (inside the plugin) |
   |------|------------------------|
   | `.claude/skills/run-lab/` | `skills/run-lab/` |
   | `.claude/agents/lab-reviewer.md` | `agents/lab-reviewer.md` |
   | `.claude/hooks/*.py` | `hooks/*.py` |
   | the `"hooks"` object of `.claude/settings.json` | `hooks/hooks.json` |
   | your MCP server | `mcp/robotos_mcp.py` + `.mcp.json` |

3. **Fix paths.** Inside a plugin, use `${CLAUDE_PLUGIN_ROOT}` instead of
   `$CLAUDE_PROJECT_DIR/.claude/…` for files that ship *in* the plugin
   (hook scripts, the MCP server). The starter `hooks/hooks.json` and
   `.mcp.json` show the pattern.
   The MCP server still needs the **workshop** `.venv` Python and the
   workshop root (`robotos_mcp.py` walks up to `SETUP.md`). Discuss: is that
   OK for a plugin? What would you change to make it work outside this repo?
4. **Validate and load:**

   ```bash
   claude plugin validate work/<your-name>/robotos-workshop-kit
   claude --plugin-dir work/<your-name>/robotos-workshop-kit
   ```

   Then remove the originals from `.claude/` (or start a session in a
   clean copy of the workshop) so you know the plugin is what's working.
   Skill is now `/robotos-workshop-kit:run-lab`.
5. **Check it all:** `/plugin` (Installed + Errors tabs), `/mcp`, `/hooks`,
   run the skill, ask for a review, try a blocked edit.
6. **Swap** with a classmate: zip your plugin, load theirs with
   `--plugin-dir`. **Before loading, read every hook and script in it**
   (see card 12). Note one thing you'd change.

## Hand in

- Plugin folder (zip) + `claude plugin validate` output
- Short table: what you put in the plugin vs. left in the repo vs. personal, and why

## Done when

- [ ] `claude plugin validate` passes
- [ ] All four parts work from the plugin with the `.claude/` originals removed
- [ ] Classmate's plugin reviewed and loaded

See [CHECKLIST.md](CHECKLIST.md).
