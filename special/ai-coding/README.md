# Special workshop — AI Coding Assistance

Learn to work **with** an AI coding assistant on a real codebase: this
workshop. The playground is the robotos warehouse sim you already know, so
you can always check what the AI wrote. If the robot hits a shelf, the code
is wrong, whatever the AI says.

**Status:** special workshop, separate from the main MW / WH / HW tracks.
Lab ids are `ai-00` … `ai-13`. They are **not** listed by `scripts/run list`.

Browser presentation: [HTML + SVG slides](presentation/index.html) · [presentation guide](presentation/README.md). Covers the opening, setup and all 14 theory/practice pairs.

## Prerequisites

- Main tracks: **MW-00, MW-01, WH-00, WH-01, WH-02** done. You must already
  read a starter and know what `/robot/01/cmd_vel`, `odom` and `scan` are.
  You cannot judge AI-written robot code without that.
- Machine set up per [`../../SETUP.md`](../../SETUP.md) (sim runs,
  `robotos topic list` works).
- An AI coding assistant installed and signed in: see [`SETUP-AI.md`](SETUP-AI.md).

## Reference tool

Labs are written for **Claude Code** because it supports every file type the
workshop covers (CLAUDE.md, AGENTS.md, rules, skills, subagents, MCP,
hooks, plugins). Every concept also exists in other tools under a different
file name. See [`handouts/cheat-sheet.md`](handouts/cheat-sheet.md). Parts A
and D work with any assistant.

## Parts

| Part | Labs | Focus | Mostly |
|------|------|-------|--------|
| **A: Foundations** | `ai-00` … `ai-02` | How LLMs work, tool landscape, prompting with specs | Theory + short labs |
| **B: Context engineering** | `ai-03` … `ai-06` | `AGENTS.md` / `CLAUDE.md`, scoped rules, `SKILL.md`, subagents | Practice |
| **C: Extending the agent** | `ai-07` … `ai-09` | MCP server for robotos, hooks & permissions, plugins | Practice |
| **D: Working well & safely** | `ai-10` … `ai-13` | Verify with evidence, debug/refactor, security, capstone | Practice |

Content map (concept → theory → lab): [`outline.md`](outline.md).
Theory cards (instructor): [`theory/`](theory/).

## Labs

| Lab | Title | Builds |
|-----|-------|--------|
| [ai-00](labs/ai-00-how-llms-work/) | How LLMs work | Notes on 3 runs of one prompt + one made-up API |
| [ai-01](labs/ai-01-tool-landscape/) | Tool landscape | WH-01 done with autocomplete, chat, agent |
| [ai-02](labs/ai-02-prompt-specs/) | Prompts as specs | Vague vs. spec prompt on WH-03 |
| [ai-03](labs/ai-03-agents-md/) | AGENTS.md / CLAUDE.md | Your `AGENTS.md` for the workshop |
| [ai-04](labs/ai-04-scoped-rules/) | Scoped rules | A rule that fires only on `labs/hw/**` |
| [ai-05](labs/ai-05-skills/) | Skills (`SKILL.md`) | A `run-lab` skill |
| [ai-06](labs/ai-06-subagents/) | Subagents | A read-only `lab-reviewer` agent |
| [ai-07](labs/ai-07-mcp-server/) | MCP | An MCP server that lets the agent drive the sim |
| [ai-08](labs/ai-08-hooks-permissions/) | Hooks & permissions | A hook that blocks edits to `code/` |
| [ai-09](labs/ai-09-plugins/) | Plugins | ai-05…08 packaged as one plugin |
| [ai-10](labs/ai-10-verify-evidence/) | Verify with evidence | AI-written wall follow proven with a bag |
| [ai-11](labs/ai-11-debug-refactor/) | Debug & refactor | Planted bugs found; a lab refactored |
| [ai-12](labs/ai-12-security/) | Security & ethics | Audit report on a suspicious skill + MCP config |
| [ai-13](labs/ai-13-capstone/) | Capstone | New behavior + your own AI setup + evidence |

**Order:** 00 → 13. Part B and C labs build on each other (ai-05 → ai-09).

## Short version (half day)

`ai-00` → `ai-02` → `ai-03` → `ai-07` → `ai-10` → `ai-12`.

## Ground rules for the whole workshop

1. **You own every line you commit.** "The AI wrote it" is not an excuse.
2. **Evidence or it didn't happen.** Sim run, bag, test output, or diff.
3. **Never paste secrets** (API keys, passwords, Wi-Fi config) into a prompt.
4. **Keep a prompt log.** Each lab hands in `prompts.md` (what you asked, what
   came back, what you changed). It's part of the grade.
5. Do not let the AI edit `code/` or `labs/common/`. ai-08 makes this
   enforced, not just a rule.
