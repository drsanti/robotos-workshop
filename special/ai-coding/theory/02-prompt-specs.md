# Theory — Prompts as specs

**Who / when:** Opening, before **ai-02**
**Time:** ~20 min

> **Practice lab:** [`ai-02-prompt-specs`](../labs/ai-02-prompt-specs/)

## Learning outcomes

- Write a prompt with **goal, context, constraints, done-when**
- Ask for a **plan first** and correct the plan, not the code
- Break a task into steps you can each check

## Talking points

1. **A prompt is a spec.** Vague in, guessed out. Lab sheet "Spec (minimum)" sections are already good prompts. Point at WH-03.
2. **Four parts:**
   - **Goal:** what behavior, in one sentence.
   - **Context:** which files and APIs to use (`labs/common/scan.py`, topic names from `docs/p0-contract.md`).
   - **Constraints:** what *not* to do (don't edit `labs/common/`, loop ≥ 2 Hz, no new packages).
   - **Done-when:** how we'll check it (runs 30 s in sim without hitting a shelf).
3. **Plan first.** "Read X and Y, then propose a plan. Don't edit yet." Fixing a plan costs one message; fixing code costs a review.
4. **Small steps.** One behavior per prompt, run it, then the next. Big-bang prompts give big-bang bugs.
5. **Examples beat adjectives.** "Use the same structure as `avoid_front.py`" works better than "clean code".
6. **When it goes wrong, fix the spec**, don't just say "try again".

## Board sketch

```text
 GOAL         creep forward; turn toward open side when front < 0.6 m
 CONTEXT      starter: labs/wh/wh-03-avoid-front/starter/avoid_front.py
              helpers: labs/common/scan.py, twist.py (don't edit)
 CONSTRAINTS  20 Hz loop; publish zero twist on Ctrl-C; no new deps
 DONE WHEN    30 s in sim, no shelf contact; I can explain each line
```

## Check questions

- What's missing from "make the robot avoid walls"? (**Which robot/topic, threshold, which files, how we check.**)
- Why ask for a plan before code? (**Cheaper to fix; shows what it misunderstood.**)
- The AI added a new dependency you didn't ask for. Which prompt part was missing? (**Constraints.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| Spec | Precise description of what "done" means |
| Constraint | A must-not or must-keep rule |
| Acceptance criteria | Checks that decide pass/fail |
| Few-shot | Giving examples in the prompt |
