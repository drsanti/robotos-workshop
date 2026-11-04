# Lab AI-11 — Debug & refactor with AI

## Goal

Part 1: a starter has **planted bugs**. Find each one with the AI, using
symptoms and logs, not guesses. Part 2: refactor a lab safely, behind
a baseline.

## Learning outcomes

- Write bug reports for the AI: what you ran, expected vs. actual, the log
- Ask for causes and checks before fixes; reject symptom patches
- Refactor in small steps with before/after evidence

## Prerequisites

- AI-10
- Theory: [`11-debug-refactor`](../../theory/11-debug-refactor.md)
- Sim running

## Part 1: Planted bugs

The starter [`starter/avoid_front_buggy.py`](starter/avoid_front_buggy.py)
is WH-03 with **more than one** bug.
**Rule:** don't diff it against the WH-03 starter until you've written your
hypotheses. The point is the debugging process.

1. Copy it to `work/<your-name>/ai-11/avoid.py`. Run it 30 s. Write down
   **symptoms** only (what the robot does, what prints).
2. Prompt the agent with a bug report:

   ```text
   I ran: python work/<me>/ai-11/avoid.py
   Expected: creeps forward, turns toward the open side when front < 0.6 m (WH-03 spec)
   Actual: <your symptoms>
   Log: <paste output>
   List possible causes and a command or check to tell them apart.
   Do not edit yet.
   ```

3. Run the checks yourself (e.g. `robotos topic list`,
   `robotos topic echo /robot/01/scan`). Then let it fix **one** bug.
   Re-run. Repeat. Some bugs only show after another one is fixed.
4. Reject any symptom patch (`sleep`, bigger thresholds, `try/except`).
   Log what you rejected and why.

## Part 2: Refactor behind a baseline

1. Pick your ai-02 `spec/avoid.py` (or the fixed ai-11 file).
2. **Baseline:** record 30 s
   (`robotos record -o before.rbag /robot/01/odom /robot/01/scan /robot/01/cmd_vel`).
3. Ask the AI to **explain** [`labs/common/loop.py`](../../../../labs/common/loop.py)
   and how a starter could use it. No edits.
4. Refactor your file to use it, in steps you can review on one screen.
5. **After:** record again, compare `bag info` and behavior. Same?

## Hand in

- Symptom list, bug-report prompt, hypotheses, the checks you ran, each fix
- Rejected patches and why
- Refactor diff + before/after `bag info`

## Done when

- [ ] All planted bugs found, each with evidence of the cause
- [ ] Fixed version passes WH-03's CHECKLIST
- [ ] Refactor keeps behavior (before/after evidence)

See [CHECKLIST.md](CHECKLIST.md).
