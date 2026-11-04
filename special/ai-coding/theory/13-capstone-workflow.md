# Theory — Capstone workflow

**Who / when:** Before **ai-13**
**Time:** ~15 min

> **Practice lab:** [`ai-13-capstone`](../labs/ai-13-capstone/)

## Learning outcomes

- Run the full loop: **set up context → spec → plan → small steps → verify → review**
- Show the process (prompt log, config, evidence), not only the result

## Talking points

1. **Set up context once:** AGENTS.md (ai-03), a rule (ai-04), a skill (ai-05), MCP tools (ai-07), a guard hook (ai-08). This is your "dev environment for the AI".
2. **Spec** the behavior with acceptance criteria (card 02).
3. **Plan mode first:** approve or edit the plan.
4. **Build in steps;** after each: run, observe, commit.
5. **Verify** with a bag + status log (card 10). Use the `lab-reviewer` subagent (ai-06) as a second opinion, not the final grade.
6. **Review your own diff** like a teammate's PR. Can you explain every line?
7. **Reflect:** where did the AI help most, and where did it mislead you? What config change would have prevented that?

## Grading weight (suggested)

| Part | Weight |
|------|--------|
| Behavior works (evidence) | 35% |
| AI setup quality (AGENTS.md, rule, skill, MCP, hook) | 25% |
| Process (prompt log, plan, commits) | 20% |
| Explain-your-code check (live) | 20% |
