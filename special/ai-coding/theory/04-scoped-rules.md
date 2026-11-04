# Theory — Scoped rules

**Who / when:** Context block, before **ai-04**
**Time:** ~20 min

> **Practice lab:** [`ai-04-scoped-rules`](../labs/ai-04-scoped-rules/)

## Learning outcomes

- Explain why a big AGENTS.md wastes context, and how **path-scoped rules** fix it
- Write a rule in at least one tool's format
- Pick the right load mode: **always / by path / by relevance / manual**

## Talking points

1. **Problem:** HW safety rules matter only in `labs/hw/`. In AGENTS.md they cost context in every session and blur other rules.
2. **Rules = small instruction files with a scope.** Same idea in each tool, different names:

   | Tool | Where | Scope field |
   |------|-------|-------------|
   | Claude Code | `.claude/rules/*.md` (subfolders OK) | `paths:` list of globs; no `paths` = always |
   | Cursor | `.cursor/rules/*.mdc` | `alwaysApply`, `globs`, `description` |
   | Copilot | `.github/instructions/*.instructions.md` | `applyTo:` glob |

3. **Cursor's four modes** show the whole idea: Always Apply · Apply Intelligently (by `description`) · Apply to Specific Files (`globs`) · Apply Manually (`@rule-name`).
4. **One topic per rule file**, descriptive name (`hw-safety.md`, `starter-style.md`).
5. **Rules vs. nested AGENTS.md:** nested files follow *folders*; rules follow *globs* (e.g. `**/*_test.py` anywhere).
6. **Still advice.** A rule saying "never publish without a rate limit" can be ignored. If it must never happen → hook (card 08).

## Board sketch

```markdown
---                          ← Claude Code: .claude/rules/hw-safety.md
paths:
  - "labs/hw/**"
---
# HW safety
- Clamp actuator commands; publish ≤ 20 Hz
- Never change board params without saving the old value first
```

## Check questions

- Rule has no `paths:` in Claude Code. When does it load? (**Always, like CLAUDE.md.**)
- You want a rule for every test file in any folder. Nested AGENTS.md or glob rule? (**Glob rule.**)
- Cursor rule with `alwaysApply: true` *and* `globs`. Which wins? (**alwaysApply; globs are ignored.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| Rule | Small instruction file with a load condition |
| Glob | Path pattern like `labs/hw/**` |
| `.mdc` | Cursor rule file (Markdown + frontmatter) |
| `applyTo` | Copilot's glob field |
