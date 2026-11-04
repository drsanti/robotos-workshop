# Lab AI-13 — Capstone

## Goal

Build a **new warehouse behavior** with the AI as your pair programmer,
using the AI setup you built in this workshop, and prove it works.

## Pick one behavior

| Option | Behavior | Done-when idea |
|--------|----------|----------------|
| A: Patrol | Drive an aisle end to end and back, 3 times, without contact | 3 laps logged; bag shows no stop > 2 s |
| B: Recover | FSM with CRUISE / AVOID / RECOVER; escape a dead-end | State log shows RECOVER → CRUISE at least once |
| C: Agent explorer | Extend your MCP server so the *agent* explores via tools | 60 s of tool calls, no contact, summary of what it "saw" |
| D: Your idea | Agree with the instructor first | You write the criteria |

## Required AI setup (from earlier labs)

- `labs/AGENTS.md` (ai-03), updated for this project
- ≥ 1 scoped rule (ai-04)
- `run-lab` skill or a new skill for your behavior (ai-05)
- MCP server with your limits (ai-07)
- Guard hook + permissions (ai-08)
- Optional: everything as your plugin (ai-09); `lab-reviewer` as second opinion (ai-06)

## Steps

1. **Spec**: write `work/<your-name>/ai-13/SPEC.md` (goal, context, constraints, done-when).
2. **Plan**: plan mode / "plan first". Save the approved plan in `PLAN.md`.
3. **Build in steps**: one behavior piece per prompt → run → commit.
   At least 4 commits.
4. **Verify**: your own run + bag + state/status log (ai-10).
5. **Review**: run `lab-reviewer` against your SPEC; read your own diff end to end.
6. **Reflect**: `REFLECTION.md`, ½ page:
   - where the AI helped most, and where it misled you
   - one config change (AGENTS.md / rule / skill / hook) that would have prevented a problem
   - what you'd never let an AI do unchecked on a real robot

## Hand in (`work/<your-name>/ai-13/`)

`SPEC.md` · `PLAN.md` · code · `prompts.md` · bag + `bag info` output ·
`REFLECTION.md` · copies of your AI config files

## Grading (suggested)

| Part | Weight |
|------|--------|
| Behavior works (evidence) | 35% |
| AI setup quality | 25% |
| Process (prompt log, plan, small commits) | 20% |
| Live check: explain any line the instructor points at | 20% |

See [CHECKLIST.md](CHECKLIST.md).
