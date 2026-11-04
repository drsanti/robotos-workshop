# Lab AI-03 — AGENTS.md / CLAUDE.md

## Goal

Write the instruction file that makes the agent behave like a good
workshop student: right commands, right folders, and a clear "Do not" list.
Then prove it changes the agent's behavior.

## Learning outcomes

- Critique a bad instruction file
- Write a short, useful `labs/AGENTS.md` (nested, nearest-wins)
- Understand how `CLAUDE.md` / `CLAUDE.local.md` and `AGENTS.md` interact, and fix it with an `@import`

## Prerequisites

- AI-02
- Theory: [`03-agents-md`](../../theory/03-agents-md.md)
- Read the repo's real [`AGENTS.md`](../../../../AGENTS.md) (it's for the
  maintainer, not for students: notice the "Do not" list)

## Steps

### Part 1: Critique (10 min)

Open [`starter/AGENTS.bad.md`](starter/AGENTS.bad.md). In `prompts.md`, list
at least **6 problems** (too long? secrets? stale? vague? wrong commands?
duplicates the README?).

### Part 2: Baseline without your file

1. Commit. New agent session in the workshop root.
2. Ask: `Add a --duration flag to the WH-03 avoid starter so it stops by itself.`
3. Note: Did it run it with `scripts/run`? Did it touch `labs/common/`? Did it
   stop the robot with a zero twist? Revert the changes.

### Part 3: Write `labs/AGENTS.md`

Create **`labs/AGENTS.md`** (don't edit the root one; that's the maintainer's).
Maximum **40 lines**. Must cover:

- How to run a starter (`scripts/run <id>` / `scripts\run.cmd <id>`) and that the sim must be up
- Topic names (link `docs/p0-contract.md`, don't copy it)
- Conventions from the starters: 20 Hz loop, zero twist on Ctrl-C, keep the control law in the starter
- **Do not:** edit `labs/common/`, edit `code/`, add pip packages, rename lab folders

### Part 4: Same task with your file

New session, same prompt as Part 2. Compare behavior. Tip: in Claude Code,
`/memory` shows which instruction files are loaded.

### Part 5 (Claude Code): the CLAUDE.local.md gotcha

1. Create `CLAUDE.local.md` in the workshop root with one personal line,
   e.g. `- Answer briefly.`
2. New session; check `/memory`. Your `AGENTS.md` files **stopped loading**:
   Claude Code reads `AGENTS.md` only when no `CLAUDE.md`/`CLAUDE.local.md`
   exists at or above the working folder.
3. Fix it by adding imports to `CLAUDE.local.md`:

   ```text
   @AGENTS.md
   @labs/AGENTS.md
   - Answer briefly.
   ```

4. Check `/memory` again. Then delete `CLAUDE.local.md` (it's personal).

## Hand in

- `labs/AGENTS.md` (copy it into `work/<your-name>/ai-03/` too)
- Critique list, before/after comparison, and what Part 5 showed

## Done when

- [ ] `labs/AGENTS.md` ≤ 40 lines with run / topics / conventions / do-not
- [ ] Agent behavior visibly better in Part 4 (one concrete example)
- [ ] You can explain why AGENTS.md disappeared in Part 5 and how the import fixed it

See [CHECKLIST.md](CHECKLIST.md).
