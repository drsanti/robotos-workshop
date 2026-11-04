# AI workshop — instructor theory cards

Same role as [`docs/theory/`](../../../docs/theory/README.md): **short
live-lecture cards** (outcomes, talking points, sketch, check questions).
About one page each; speak from the card, then go to the lab.

> **Formats move fast.** File paths and frontmatter fields on these cards
> were checked against the vendors' docs on **2026-11-04**. Re-check
> [`../handouts/cheat-sheet.md`](../handouts/cheat-sheet.md) before each run
> of the workshop.

## Index

| Card | Purpose (one line) | Lab |
|------|--------------------|-----|
| [00-how-llms-work](00-how-llms-work.md) | Next-token prediction; context window; why it invents things | [ai-00](../labs/ai-00-how-llms-work/) |
| [01-tool-landscape](01-tool-landscape.md) | Autocomplete / chat / agent; the agent loop; permissions | [ai-01](../labs/ai-01-tool-landscape/) |
| [02-prompt-specs](02-prompt-specs.md) | Goal + constraints + done-when; plan before code | [ai-02](../labs/ai-02-prompt-specs/) |
| [03-agents-md](03-agents-md.md) | AGENTS.md vs. CLAUDE.md; levels; what to put in | [ai-03](../labs/ai-03-agents-md/) |
| [04-scoped-rules](04-scoped-rules.md) | Rules that load only for some paths | [ai-04](../labs/ai-04-scoped-rules/) |
| [05-skills](05-skills.md) | SKILL.md; progressive disclosure; descriptions | [ai-05](../labs/ai-05-skills/) |
| [06-subagents](06-subagents.md) | Separate context + limited tools for a sub-task | [ai-06](../labs/ai-06-subagents/) |
| [07-mcp](07-mcp.md) | Give the agent new tools through a protocol | [ai-07](../labs/ai-07-mcp-server/) |
| [08-hooks-permissions](08-hooks-permissions.md) | Advice (prompts) vs. enforcement (hooks, deny lists) | [ai-08](../labs/ai-08-hooks-permissions/) |
| [09-plugins](09-plugins.md) | Bundle and share a setup | [ai-09](../labs/ai-09-plugins/) |
| [10-verify-evidence](10-verify-evidence.md) | Trust evidence, not the AI's summary | [ai-10](../labs/ai-10-verify-evidence/) |
| [11-debug-refactor](11-debug-refactor.md) | Give logs, reproduce first; refactor behind a test | [ai-11](../labs/ai-11-debug-refactor/) |
| [12-security-ethics](12-security-ethics.md) | Injection, secrets, invented packages, integrity | [ai-12](../labs/ai-12-security/) |
| [13-capstone-workflow](13-capstone-workflow.md) | Plan → build small → verify → review | [ai-13](../labs/ai-13-capstone/) |

## Suggested lecture order

Opening: **00 → 01 → 02** (one block, ~60 min with demos).
Context block: **03 → 04 → 05 → 06** (one card before each lab).
Extend block: **07** (longest lab) → **08 → 09**.
Close: **10 → 11 → 12**, then capstone brief **13**.

## One picture for the whole workshop

```text
            ┌────────────── what the model SEES ──────────────┐
  you  ───► │ system prompt + AGENTS.md/CLAUDE.md + rules      │
  prompt    │ + skill descriptions (+ skill body when used)    │ ──► model
            │ + tool list (built-in + MCP) + chat so far       │      │
            └──────────────────────────────────────────────────┘      │
                                                                       ▼
            ┌───────────── what the agent can DO ─────────────┐   tool call
            │ permissions (allow/ask/deny) → hooks (block/ok) │ ◄────┘
            │ → tool runs (edit, bash, MCP: drive the robot)  │ ──► result back
            └─────────────────────────────────────────────────┘     into context
```

Part B fills the top box. Part C fills the bottom box.
