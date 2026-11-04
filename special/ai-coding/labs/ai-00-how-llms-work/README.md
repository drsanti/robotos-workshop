# Lab AI-00 — How LLMs work

## Goal

See for yourself that an LLM **predicts** text: it can give different answers
to the same question and confidently invent APIs that don't exist.

## Learning outcomes

- Observe non-determinism (same prompt, different output)
- Catch an invented API by checking it against real code
- Fix the invention by putting the real code into context

## Prerequisites

- [Setup](../../SETUP-AI.md) done; assistant opens the workshop folder
- Theory: [`00-how-llms-work`](../../theory/00-how-llms-work.md)
- Start your prompt log: copy [`../../handouts/prompt-log-template.md`](../../handouts/prompt-log-template.md) to `special/ai-coding/work/<your-name>/prompts.md`

## Steps

### Part 1: Same prompt, three runs (chat, no files attached)

Start a **new chat** each time and paste exactly:

```text
Write a short Python function that returns the distance between two 2D points.
```

Copy the three answers into your log. Note: same names? same approach? same
extra text?

### Part 2: Ask about something the model has never seen

New chat, **no files attached / don't let it read the repo**:

```text
In the robotos Python library, how do I subscribe to a LaserScan topic and
print the front range? Show code.
```

Compare the answer with the real code in
[`labs/wh/wh-02-sense-odom-scan/starter/`](../../../../labs/wh/wh-02-sense-odom-scan/)
and [`labs/common/scan.py`](../../../../labs/common/scan.py). List every
name it **invented** (wrong imports, method names, message fields, topic names).

### Part 3: Same question, with context

New session, but now let the assistant read the repo (or attach
`labs/common/scan.py` and one WH starter). Ask the same question. Compare.

## Hand in (in your `prompts.md`)

- The 3 answers from Part 1 and one sentence on what differed
- A table: *invented name → real name* from Part 2
- One sentence: what changed in Part 3, and why

## Done when

- [ ] At least 2 invented names found in Part 2
- [ ] Part 3 answer uses real robotos names (check by running it with the sim up, if time)

See [CHECKLIST.md](CHECKLIST.md).
