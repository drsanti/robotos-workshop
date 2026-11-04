# Lab AI-02 — Prompts as specs

## Goal

Get the WH-03 behavior (avoid front) from the agent twice: once with a
**vague** prompt, once with a **spec** prompt. Compare.

## Learning outcomes

- Write a prompt with goal, context, constraints, done-when
- Use plan-first and correct the plan before any edit
- See how spec quality changes the result

## Prerequisites

- AI-01; WH-03 read (you don't need to have solved it)
- Theory: [`02-prompt-specs`](../../theory/02-prompt-specs.md)

## Steps

1. Commit: `git add -A && git commit -m "before ai-02"`.
2. **Vague run.** New agent session:

   ```text
   make the robot avoid walls
   ```

   Let it work. Save whatever it produces under
   `special/ai-coding/work/<your-name>/ai-02/vague/` (move files there if it
   put them elsewhere). Run it in the sim for 30 s. Note what happened.
   Then `git stash` or revert anything it changed outside `work/`.

3. **Write a spec prompt** using this template:

   ```text
   GOAL: …one sentence…
   CONTEXT: read <files>; topics from docs/p0-contract.md
   CONSTRAINTS: …what not to do / must keep…
   DONE WHEN: …how we check it in the sim…
   First read the files and propose a plan. Do not edit until I say go.
   Put the result in special/ai-coding/work/<your-name>/ai-02/spec/avoid.py
   ```

4. **Spec run.** New session, paste your spec. Review the plan. Correct at
   least one thing in the plan if you can (there usually is one). Then say go.
5. Run the spec version in the sim for 30 s.

## Hand in

- Both prompts (verbatim) and both results in `prompts.md`
- What the vague version guessed wrong (topic names? new files? rate?)
- The correction you made to the plan, and why

## Done when

- [ ] Spec version runs ≥ 30 s without hitting a shelf
- [ ] Spec prompt has all four parts
- [ ] Vague-vs-spec differences written up

See [CHECKLIST.md](CHECKLIST.md).
