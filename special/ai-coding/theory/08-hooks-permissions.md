# Theory — Hooks, commands & permissions

**Who / when:** Extend block, before **ai-08**
**Time:** ~20 min

> **Practice lab:** [`ai-08-hooks-permissions`](../labs/ai-08-hooks-permissions/)

## Learning outcomes

- Tell **advice** (AGENTS.md, rules, skills) from **enforcement** (permissions, hooks)
- Write a permission deny rule and a `PreToolUse` hook that blocks a tool call
- Use a `PostToolUse` hook to run a check automatically after edits

## Talking points

1. **Key idea:** instructions are *read* by the model and *usually* followed. Hooks and permissions are run by the **app**. The model cannot skip them.
2. **Permissions** in `.claude/settings.json`: lists of `allow`, `ask`, `deny` rules like `Bash(robotos topic list)`, `Edit(code/**)`. Deny wins. Good for "never" rules that match a simple pattern.
3. **Hooks** are your scripts, run on lifecycle events. Most used:
   - `PreToolUse`: before a tool runs; can **block** it (exit code 2, stderr is the reason).
   - `PostToolUse`: after; e.g. run lint/tests on an edited file.
   - `SessionStart`, `UserPromptSubmit`, `Stop`: add context, check prompts, final checks.
4. **Shape** (in settings.json): event → matcher (tool name, e.g. `Edit|Write`) → handler (`"type": "command"`). The hook gets the tool call as **JSON on stdin**.
5. **Settings files:** `~/.claude/settings.json` (you), `.claude/settings.json` (team, committed), `.claude/settings.local.json` (you, gitignored).
6. **Custom commands:** in Claude Code, skills are the slash commands now (`/run-lab`). The old `.claude/commands/*.md` still works.
7. **Cross-OS tip for this class:** write hooks in **Python**, not bash+jq. Windows and macOS students can run the same hook.
8. **A hook runs as you, with your rights.** Review hooks in repos you clone like any script.

## Board sketch

```text
 model: "Edit code/robotos-…/x.py"
          │
          ▼
 permissions: deny Edit(code/**) ? ── yes ─► blocked
          │ no
          ▼
 PreToolUse hook guard_code_dir.py ── exit 2 ─► blocked, reason → model
          │ exit 0
          ▼
 tool runs ─► PostToolUse hook (lint) ─► result + lint output → model
```

## Check questions

- AGENTS.md says "don't touch code/". Agent edits it anyway. What makes that impossible? (**Deny rule or PreToolUse hook.**)
- Hook exits with code 1. Is the call blocked? (**No. Only exit 2 blocks; other non-zero codes are non-blocking errors.**)
- Why Python hooks here? (**Same script on Windows and macOS; no jq install.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| Hook | Your command run by the app on an event |
| Matcher | Which tool names a hook applies to |
| Exit code 2 | "Block this call" (PreToolUse) |
| Deny rule | Permission pattern that always refuses |
