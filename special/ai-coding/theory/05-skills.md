# Theory — Skills (`SKILL.md`)

**Who / when:** Context block, before **ai-05**
**Time:** ~25 min

> **Practice lab:** [`ai-05-skills`](../labs/ai-05-skills/)
> **Spec:** [agentskills.io/specification](https://agentskills.io/specification)

## Learning outcomes

- Describe a skill as a **folder of know-how + scripts** the agent loads *on demand*
- Explain **progressive disclosure** (description → body → files)
- Write a `description` that makes the agent pick the skill at the right time

## Talking points

1. **Why skills:** rules tell the agent *how to behave*; skills teach it *how to do a task* ("run a lab and check the sim is up"), often with scripts.
2. **Format (open Agent Skills standard):**
   ```text
   run-lab/
     SKILL.md        ← frontmatter + instructions
     scripts/        ← code the agent can run
     references/     ← extra docs, read only if needed
   ```
   Required frontmatter: `name` (lowercase-hyphen, = folder name) and `description` (≤ 1024 chars: **what it does + when to use it**).
3. **Progressive disclosure:**
   1. Only `name` + `description` sit in context all the time (~100 tokens).
   2. The body loads when the skill is used.
   3. Files in `scripts/` / `references/` load only when the body points to them.
   So you can have many skills for little context.
4. **The description is the trigger.** "Helps with labs" never fires. "Runs a robotos workshop lab starter by id (wh-01, hw-02 …) and first checks the sim topics exist. Use when asked to run, start or try a lab." fires.
5. **Where (Claude Code):** `.claude/skills/<name>/SKILL.md` (project) or `~/.claude/skills/…` (you). Codex uses `.agents/skills/`. The same folder works in both.
6. **Claude Code extras** (not in the open spec): `disable-model-invocation`, `paths`, `context: fork`, `$ARGUMENTS`, `` !`cmd` `` to inject command output. Stick to the spec fields if you want the skill to work everywhere.
7. Skills **replaced custom slash commands** in Claude Code: every skill is also `/name`.

## Board sketch

```text
 always in context:  run-lab — "Runs a lab starter by id … Use when …"
                          │ agent decides it's relevant
                          ▼
 loaded:             SKILL.md body (steps)
                          │ body says "run scripts/check_sim.py"
                          ▼
 loaded/executed:    scripts/check_sim.py
```

## Check questions

- Why not put the lab-running steps in AGENTS.md? (**Costs context every session; skill loads only when needed.**)
- Your skill never triggers. First thing to fix? (**The description: say when to use it, with the words users type.**)
- `name: Run_Lab`: valid? (**No: lowercase letters, digits, hyphens only; must match folder.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| Skill | Folder with SKILL.md + optional scripts/references |
| Progressive disclosure | Load metadata first, details only when needed |
| Agent Skills | Open standard for SKILL.md (agentskills.io) |
