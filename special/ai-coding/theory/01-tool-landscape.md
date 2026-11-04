# Theory — Tool landscape: autocomplete, chat, agent

**Who / when:** Opening, before **ai-01**
**Time:** ~20 min

> **Practice lab:** [`ai-01-tool-landscape`](../labs/ai-01-tool-landscape/)

## Learning outcomes

- Tell apart **autocomplete**, **chat**, and **agent** tools by what they can see and do
- Draw the **agent loop** (think → tool call → result → think …)
- Explain why agents need **permissions** and why you should read before you approve

## Talking points

1. **Autocomplete** (inline suggestions): sees the open file and a few neighbours, writes a few lines. Fast, local, easy to accept without reading.
2. **Chat**: you paste or attach context; it answers in text. **You** copy code back, so you stay the one who acts.
3. **Agent** (Claude Code, Codex, Copilot agent mode, Cursor agent …): has **tools**: read files, search, edit, run shell commands, call MCP servers. It loops until it thinks it's done.
4. **The loop:** model plans → asks to call a tool → the app runs it (if allowed) → result goes back into context → repeat.
5. **Permissions.** Agents ask before risky tools (edit, shell). Modes range from "ask every time" → "auto-accept edits" → "plan only". Approving without reading = giving a stranger your keyboard.
6. **Plan mode / ask first.** For anything bigger than a one-liner, have the agent show a plan before it edits.
7. **Same model, different tools.** Many products use the same few models. What differs is context gathering, tools and safety rails. That's what Parts B and C teach.

## Board sketch

```text
 autocomplete:  file ──► model ──► ghost text            (you accept/reject)
 chat:          you paste ──► model ──► answer           (you copy code)
 agent:         goal ──► model ⇄ tools(read/edit/bash/MCP) ──► done?
                              ▲  permission check each call
```

## Check questions

- Which tool type can break your repo while you get coffee? (**Agent with auto-approve.**)
- Why does the agent read files before editing? (**To put the real code in its context, see card 00.**)
- What is one reason to still use chat over an agent? (**Learning: you type the code yourself; or the task is a question, not an edit.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| Agent | LLM + tools + a loop that acts on your machine |
| Tool call | Structured request from the model to run a tool |
| Permission mode | How much the agent may do without asking |
| Plan mode | Agent proposes steps; no edits until you approve |
