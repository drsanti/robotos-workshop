# Theory — Project memory: AGENTS.md / CLAUDE.md

**Who / when:** Context block, before **ai-03**
**Time:** ~25 min

> **Practice lab:** [`ai-03-agents-md`](../labs/ai-03-agents-md/)
> **Real example:** this repo's own [`AGENTS.md`](../../../AGENTS.md)

## Learning outcomes

- Explain why an agent "forgets" between sessions and how instruction files fix it
- Know the file names: **`AGENTS.md`** (open standard) vs. **`CLAUDE.md`** (Claude Code) and their levels
- Write a short, useful one, and know what does **not** belong in it

## Talking points

1. **Every session starts empty.** Instruction files are loaded into context at the start of each session, so they act as the project's memory.
2. **`AGENTS.md`** is an open format ("a README for agents"), read by Codex, Cursor, Copilot, Gemini CLI, Windsurf, Zed, Aider and many more. Plain Markdown, no required fields. **Nested** files are allowed; the **nearest** one to the file being worked on wins.
3. **`CLAUDE.md`** is Claude Code's file. Levels:
   - `~/.claude/CLAUDE.md`: you, all projects
   - `./CLAUDE.md` or `./.claude/CLAUDE.md`: the project, committed
   - `./CLAUDE.local.md`: you, this project, **gitignored**
   - `sub/dir/CLAUDE.md`: loads when the agent works in that folder
   All found files are **joined**, not overridden; closer ones come last.
4. **Both at once.** Claude Code reads `AGENTS.md` only when there's no `CLAUDE.md`. To share one source: put `@AGENTS.md` inside `CLAUDE.md` (an **import**).
5. **What goes in:** build/run/test commands, folder map, conventions, a "Do not" list, gotchas. Our repo's `AGENTS.md` has a "Do not" list: show it.
6. **What stays out:** long docs (link them), secrets, things the linter already enforces, stale "NEXT" notes. Keep it short (< ~200 lines). Every line costs context in **every** session.
7. **It's advice, not a lock.** The model usually follows it, not always. Card 08 is about enforcement.

## Board sketch

```text
 ~/.claude/CLAUDE.md          (me, everywhere)
 repo/AGENTS.md  ◄── @import ── repo/CLAUDE.md   (team, committed)
 repo/CLAUDE.local.md         (me, this repo, gitignored)
 repo/labs/hw/AGENTS.md       (only when working in labs/hw/)
         ↓ all joined into context at session start / on entering folder
```

## Check questions

- A classmate's agent ignores your `AGENTS.md` but follows `CLAUDE.md`. Why? (**Claude Code prefers CLAUDE.md when both exist; import AGENTS.md from it.**)
- Where do *your* personal shortcuts go so the team doesn't get them? (**`CLAUDE.local.md` or `~/.claude/CLAUDE.md`.**)
- Why not paste the whole SETUP.md in? (**Context cost every session; link it instead.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| AGENTS.md | Cross-tool instruction file for coding agents |
| CLAUDE.md | Claude Code's instruction file (user / project / local / nested) |
| `@path` import | Pull another file into CLAUDE.md |
| Nearest-wins | Closest AGENTS.md in the folder tree takes priority |
