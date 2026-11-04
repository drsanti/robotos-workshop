# Theory — Debugging & refactoring with AI

**Who / when:** Close block, before **ai-11**
**Time:** ~20 min

> **Practice lab:** [`ai-11-debug-refactor`](../labs/ai-11-debug-refactor/)

## Learning outcomes

- Give the AI **symptoms + logs + repro**, not "it's broken"
- Ask for the **cause** before the fix; reject symptom patches
- Refactor in small steps, each one checked

## Talking points

1. **Bad:** "robot doesn't work, fix it". **Good:** "Running X, expected Y, got Z. Log below. Robot spins in open space. Find the cause; don't edit yet."
2. **Reproduce first.** If you can't make it fail on demand, you can't tell if a fix worked.
3. **Hypotheses before edits.** Ask for 2–3 possible causes and how to tell them apart (e.g. `robotos topic echo /robot/01/scan`). Then check.
4. **Symptom patches to reject:** extra `sleep`, bigger timeouts, `if value is weird: ignore`. Ask "why is the value weird?"
5. **Use the AI to read code:** "Explain `labs/common/loop.py` and who calls it" is a safe, high-value use: nothing is edited.
6. **Refactor = same behavior, better shape.** Before: record a baseline (bag or log). After each step: same behavior? Keep steps small enough to review in one screen.
7. **Know when to stop.** After two failed fix attempts, the context is full of wrong ideas. Start a fresh session with a clean summary.

## Check questions

- What three things should a bug prompt contain? (**What you ran, expected vs. actual, the log/error.**)
- The AI fixes "spins forever" by adding `time.sleep(1)`. Accept? (**No. Ask for the cause.**)
- How do you know a refactor didn't change behavior? (**Same baseline evidence before and after.**)
