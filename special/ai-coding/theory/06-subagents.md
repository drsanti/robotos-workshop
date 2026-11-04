# Theory — Subagents

**Who / when:** Context block, before **ai-06**
**Time:** ~20 min

> **Practice lab:** [`ai-06-subagents`](../labs/ai-06-subagents/)

## Learning outcomes

- Explain what a subagent is: **a helper with its own context, prompt and tool list**
- Know when splitting work helps (and when it just costs more)
- Write an agent definition file

## Talking points

1. **Problem:** a long search or review fills the main context with file dumps. A subagent does the work in **its own** context and returns only the summary.
2. **Second benefit: fewer tools.** A reviewer that can only `Read, Grep, Glob` cannot "fix" things you didn't ask it to fix.
3. **Format (Claude Code):** `.claude/agents/<name>.md` (project) or `~/.claude/agents/` (you). Body = the subagent's system prompt.
   ```markdown
   ---
   name: lab-reviewer
   description: Grades a workshop lab against its README "Done when". Use after a student finishes a lab.
   tools: Read, Grep, Glob
   model: sonnet
   ---
   You are a strict lab grader …
   ```
   Required: `name`, `description`. Common optional: `tools`, `disallowedTools`, `model`, `permissionMode`, `skills`, `mcpServers`.
4. **`description` again decides** when the main agent delegates. Same lesson as skills.
5. **About the name `AGENT.md`:** some early tools used a single `AGENT.md` file as project memory. The ecosystem moved to **`AGENTS.md`** (card 03). Agent *definitions* are per-file in an `agents/` folder.
6. **Costs:** each subagent is another model run. Don't split a 3-line edit. Do split: wide searches, independent reviews, parallel checks.
7. Other tools have the same idea under names like "custom agents" or "modes".

## Board sketch

```text
 main agent  ── "review ai-03 work" ──►  lab-reviewer (own context, Read/Grep only)
     ▲                                         │ reads 12 files
     └──────── 10-line verdict ◄───────────────┘
```

## Check questions

- Why give the reviewer no `Edit` tool? (**Least privilege: it should report, not change.**)
- When is a subagent a bad idea? (**Small tasks; tasks that need the main conversation's details.**)
- Skill vs. subagent? (**Skill = know-how loaded into *this* context; subagent = separate worker with its own context.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| Subagent | Delegated agent with separate context and settings |
| Least privilege | Give only the tools a job needs |
| Delegation | Main agent hands a sub-task to a subagent |
