# Theory — How LLMs work (for coders)

**Who / when:** Opening, before **ai-00**
**Time:** ~20 min

> **Practice lab:** [`ai-00-how-llms-work`](../labs/ai-00-how-llms-work/)

## Learning outcomes

- Explain an LLM as a **next-token predictor**, not a database of facts
- Say what the **context window** is and why everything the model knows about *your* project must be in it
- Predict two failure modes: **invented answers** (made-up APIs) and **different answers each run**

## Talking points

1. **Tokens.** Text is cut into pieces (~¾ of an English word each; code and Thai cut into more pieces). Limits and cost are counted in tokens.
2. **Next-token prediction.** The model picks a likely next token, again and again. "Likely" ≠ "true". A made-up `robotos.Node.drive_to()` looks just as likely as a real one.
3. **Context window = the model's only short-term memory.** Your files, the chat, tool results, instruction files all compete for that space. When it fills, older parts get dropped or summarised.
4. **Training cutoff.** The model learned from public data up to a date. It has **never seen robotos** (private), so it guesses from ROS 2 patterns it did see.
5. **Non-determinism.** Same prompt, different output. So lab sheets give *acceptance criteria*, not expected code.
6. **Consequence for the whole workshop:** our job is to (a) put the right context in, (b) check what comes out.

## Board sketch

```text
 [instructions][your files][chat][tool results] ...   ← context window (limited)
                         │
                         ▼
             model: P(next token | everything above)
                         │
                         ▼
             "pub = node.create_publisher(" → next token? ...
```

## Check questions

- Why might the AI write `rclpy` code when asked about robotos? (**It has seen lots of ROS 2 code and none of robotos; it fills gaps with what's likely.**)
- Running the same prompt gives different code. Is one of them "the right answer"? (**Maybe neither. Judge each against the spec and the sim.**)
- What fixes most invented APIs? (**Put the real API in context: open the starter, point at `labs/common/`, or an instruction file.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| Token | Unit of text the model reads and writes |
| Context window | Max tokens the model can see at once |
| Hallucination | Confident output that is false (e.g. a made-up API) |
| Temperature | Randomness setting; one reason for different outputs |
| Training cutoff | Date after which the model knows nothing by itself |
