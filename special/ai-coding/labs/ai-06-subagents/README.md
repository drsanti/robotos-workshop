# Lab AI-06 — Subagents

## Goal

Create a **read-only `lab-reviewer`** subagent that grades a lab against its
README's "Done when" and CHECKLIST, and reports back in a fixed format,
without being able to edit anything.

## Learning outcomes

- Write an agent definition (`name`, `description`, `tools`, prompt body)
- See the main context stay small while the subagent reads many files
- Apply least privilege: a reviewer that *cannot* edit

## Prerequisites

- AI-05
- Theory: [`06-subagents`](../../theory/06-subagents.md)

## Steps

1. Commit first. Copy [`starter/lab-reviewer.md`](starter/lab-reviewer.md)
   to `.claude/agents/lab-reviewer.md` (Claude Code). Other tools: see the
   cheat sheet ("custom agents").
2. Read the starter and fill the `TODO`s: the report format and the
   `tools:` list. Only tools that **read**.
3. New session. Ask:
   `Use the lab-reviewer agent to review my ai-03 work in special/ai-coding/work/<your-name>/ai-03.`
4. Check:
   - Did the main agent delegate (you'll see the subagent run)?
   - Is the report in your format?
   - Ask the reviewer (through the main agent) to "fix the problems it found".
     It must **not** be able to. Who fixes it then?
5. Try a lab with real code: review your ai-02 `spec/avoid.py` against
   WH-03's CHECKLIST.
6. **Compare cost:** run the same review once *without* the subagent
   ("review it yourself"). In Claude Code, `/context` shows how full the main
   context got each time.

## Hand in

- Final `lab-reviewer.md`
- Two review reports + your opinion: was it fair? what did it miss?
- Context usage with vs. without the subagent

## Done when

- [ ] Reviewer has only read-type tools and refuses / can't edit
- [ ] Report follows your fixed format with PASS/FAIL per checklist line
- [ ] You can say when delegating is worth it and when it isn't

See [CHECKLIST.md](CHECKLIST.md).
