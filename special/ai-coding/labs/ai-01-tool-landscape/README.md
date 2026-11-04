# Lab AI-01 — Autocomplete vs. chat vs. agent

## Goal

Do the **same small task three ways** and feel the difference in what each
tool type sees, does, and needs from you.

## Learning outcomes

- Use inline autocomplete, chat, and an agent on one task
- See the agent loop (reads → plans → edits → runs) and its permission prompts
- Compare speed, correctness, and how much you understood

## Prerequisites

- AI-00; WH-01 done in the main track
- Theory: [`01-tool-landscape`](../../theory/01-tool-landscape.md)
- Sim running (External + Native + Connect)

## Task (same for all three)

Write `drive_square_ish.py`: drive forward 2 s, turn left ~90° (2 s at
`wz=0.8`), repeat 4 times, then publish a zero twist. Use
`labs/common/twist.py`. Publish at 20 Hz so the 500 ms cmd timeout never
starves the robot.

Put each version in `special/ai-coding/work/<your-name>/ai-01/`:
`v1_autocomplete.py`, `v2_chat.py`, `v3_agent.py`.

## Steps

1. **Commit first** so you can roll back: `git add -A && git commit -m "before ai-01"`.
2. **Autocomplete:** copy the top of
   [`labs/wh/wh-01-drive-twist/starter/`](../../../../labs/wh/wh-01-drive-twist/)'s
   starter into `v1_autocomplete.py`, then type comments like
   `# drive forward 2 s at 20 Hz` and accept/reject suggestions. No chat.
3. **Chat:** in a chat panel, paste the task + the starter. Copy the answer
   into `v2_chat.py` yourself.
4. **Agent:** give the agent the task text and the file path. Turn on plan
   mode / ask it to plan first. **Read every permission prompt** before you
   approve. Count them.
5. Run all three with the sim. Note which ones drive a rough square.
6. `git diff --stat`: did the agent change anything **outside** `work/`?

## Hand in (in `prompts.md`)

| | Autocomplete | Chat | Agent |
|---|---|---|---|
| Time taken | | | |
| Ran first try? | | | |
| Files it touched | | | |
| Permission prompts | – | – | |
| I can explain every line (Y/N) | | | |

Plus 2–3 sentences: when would you pick each tool?

## Done when

- [ ] Three versions exist and were run in the sim
- [ ] Comparison table filled
- [ ] No unexpected changes outside `work/` (or you reverted them)

See [CHECKLIST.md](CHECKLIST.md).
