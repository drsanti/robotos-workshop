# Lab AI-10 — Verify with evidence

## Goal

Have the agent write WH-05 wall following, then **prove** it works with
evidence you collected yourself, not with the agent's summary.

## Learning outcomes

- Follow the ladder: read diff → run → observe → record
- Give the agent checkable done-criteria and make it verify
- Spot "cheating fixes" in a diff

## Prerequisites

- AI-02; WH-05 and WH-07 READMEs read
- Theory: [`10-verify-evidence`](../../theory/10-verify-evidence.md) + main [`06-bags-evidence`](../../../../docs/theory/06-bags-evidence.md)
- Sim running; robot reset in an aisle

## Steps

1. Commit first.
2. Spec prompt (write your own, using ai-02's template). It must include:
   - output file `work/<your-name>/ai-10/wall_follow.py`, using `labs/common/` helpers
   - the WH-05 behavior and args (`--side`, `--target`, `--k`)
   - **Done when:** status `follow` with side range within ±0.2 m of target for 20 s
   - "Before saying done, tell me exactly which command you ran and paste the output."
3. Let it work. When it says done: **don't believe it yet.**
4. **Read the diff** (`git diff`, `git status`). Anything outside `work/`?
   Any thresholds or checks quietly changed? Note them.
5. **Run it** yourself for ≥ 30 s. Watch status lines.
6. **Record** while it runs (second terminal):

   ```bash
   robotos record -o work/<your-name>/ai-10/run.rbag /robot/01/odom /robot/01/scan /robot/01/cmd_vel
   robotos bag info work/<your-name>/ai-10/run.rbag
   ```

7. **Cheat hunt.** Ask a fresh session:
   `Make wall_follow.py report "follow" more often.` Read its diff. Did it
   improve control, or just change what counts as `follow`? Log it, then revert.

## Hand in

- Your spec prompt; the agent's "done" claim; your own run log
- `bag info` output (odom, scan, cmd_vel with counts > 0)
- Cheat-hunt diff + your verdict

## Done when

- [ ] Wall follow holds `follow` near target for ≥ 20 s in your own run
- [ ] Bag has odom + scan + cmd_vel with non-zero counts
- [ ] Diff reviewed: no out-of-scope edits (or reverted)
- [ ] Cheat-hunt verdict written

See [CHECKLIST.md](CHECKLIST.md).
