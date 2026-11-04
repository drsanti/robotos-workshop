# Lab AI-05 — Skills (`SKILL.md`)

## Goal

Build a `run-lab` skill that teaches the agent how to run any workshop lab
correctly: check the sim is up, then use the runner. Then fix its
**description** until the agent picks it up by itself.

## Learning outcomes

- Lay out a skill folder (`SKILL.md` + `scripts/`)
- See progressive disclosure: description always, body on use, script on demand
- Write a description that triggers on the words people actually type

## Prerequisites

- AI-03
- Theory: [`05-skills`](../../theory/05-skills.md)
- Sim running for the final test

## Steps

1. Commit first. Copy the starter skill folder:

   | Tool | Copy `starter/run-lab/` to |
   |------|----------------------------|
   | Claude Code | `.claude/skills/run-lab/` |
   | Codex | `.agents/skills/run-lab/` |
   | Others | check [`cheat-sheet`](../../handouts/cheat-sheet.md) |

2. Run the helper script yourself first, so you know what it does:

   ```bash
   python .claude/skills/run-lab/scripts/check_sim.py
   ```

   Expect `OK` and the three `/robot/01/*` topics (exit code 0), or a clear
   `NOT READY` message (exit code 1) when the sim is closed.

3. **Trigger test (weak description).** New session:
   `Try wh-03 with a 0.8 m threshold.` Did the agent use the skill? In
   Claude Code you'll see it load `run-lab`, or you can type `/run-lab wh-03`
   to force it. Log the result.
4. **Fix the description.** The starter's description is deliberately bad.
   Rewrite it: *what it does* + *when to use it* + words like "run", "try",
   "start", lab ids like `wh-03`, `hw-02`. Keep the `name` = folder name.
5. **Finish the body.** Fill the `TODO` steps in `SKILL.md`:
   OS-specific runner command, what to do when `check_sim.py` fails, how to
   pass extra args (`--threshold 0.8`).
6. **Trigger test again** with 3 different phrasings, new session each.
   Also check a **negative**: `Explain what odometry is` should *not*
   trigger it.
7. **Validate** (optional): `pip install skills-ref` then
   `skills-ref validate .claude/skills/run-lab` (checks the open-standard fields).

## Hand in

- Your final `SKILL.md` (+ copy in `work/<your-name>/ai-05/`)
- Trigger table: phrasing → triggered? (before and after the fix)

## Done when

- [ ] 3 of 3 positive phrasings trigger the skill; the negative one doesn't
- [ ] Agent runs `check_sim.py` before the starter, and handles "sim not up"
- [ ] `name` matches the folder; description ≤ 1024 chars

See [CHECKLIST.md](CHECKLIST.md).
