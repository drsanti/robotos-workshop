# Theory — Verify with evidence

**Who / when:** Close block, before **ai-10**
**Time:** ~15 min

> **Practice lab:** [`ai-10-verify-evidence`](../labs/ai-10-verify-evidence/)
> **Reuses:** main theory [`06-bags-evidence`](../../../docs/theory/06-bags-evidence.md)

## Learning outcomes

- Treat the AI's "Done! It works." as a **claim**, not a result
- Use the verification ladder: **read diff → run → observe → record**
- Make the agent verify its own work against acceptance criteria

## Talking points

1. **The summary is not the evidence.** Agents sometimes say tests pass when they didn't run, or "fix" by weakening the check.
2. **Ladder:**
   1. **Read the diff:** what changed, and what *else* changed?
   2. **Run it:** sim up, starter runs, no traceback.
   3. **Observe:** robot does the spec (status lines, behavior).
   4. **Record:** bag (`robotos record … ; robotos bag info`) = proof for grading.
3. **Give the agent a way to check.** "Done when `bag info` shows odom + scan with counts > 0 and the status log shows `follow`." Agents do much better with a checkable target.
4. **Watch for cheating fixes:** deleted assertions, `try/except: pass`, thresholds changed until it "passes", hardcoded outputs.
5. **Small diffs are easier to verify.** That's another reason for small steps (card 02).

## Check questions

- Agent: "wall following works now". What do you ask for? (**Diff + sim run + bag info.**)
- The diff also changes `labs/common/scan.py`. Accept? (**No. Out of scope and forbidden; revert and re-prompt with the constraint.**)
- Why is a bag better evidence than a screenshot? (**Replayable data with counts and timestamps.**)
