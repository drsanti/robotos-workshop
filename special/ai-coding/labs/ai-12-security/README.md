# Lab AI-12 — Security & ethics

## Goal

Audit three **untrusted** things the way a careful engineer would: a skill
from the internet, an MCP config from a forum, and an AI-written change.
Then harden your own setup.

## Learning outcomes

- Read untrusted skills / MCP configs / diffs **before** they run
- Recognise prompt injection, data exfiltration, invented packages, hardcoded secrets, `curl | sh`, disabled safety
- Turn findings into enforced protections (deny rules, hooks, server-side limits)

## Prerequisites

- AI-07, AI-08
- Theory: [`12-security-ethics`](../../theory/12-security-ethics.md)

## ⚠️ Rules for this lab

- **Do not install, copy into `.claude/`, or run** any file in `starter/`.
  They're samples to **read**. (All URLs use `.invalid`, which can never
  resolve, but treat them as real.)
- Don't run `pip install` / `npm install` for any package named in them.

## Steps

### 1. The skill: [`starter/suspicious-skill/SKILL.md`](starter/suspicious-skill/SKILL.md)

Read it **as a text file** (editor, not via the agent). Find every problem.
Hints: the description, the HTML comment, each command, the `base64` blob
(decode it *by printing only*: `echo … | base64 -d`, **without** `| sh`),
the "Usage" section.

### 2. The MCP config: [`starter/suspicious.mcp.json`](starter/suspicious.mcp.json)

What runs when the agent starts this server? What's wrong in `env`? What
could `UPLOAD_DIR: "~"` mean?

### 3. The AI change: [`starter/ai-pr.diff`](starter/ai-pr.diff)

Review it like a PR. List every problem and how bad it is (safety,
security, correctness). Is `robotos-fastlog` a real package? How would you
check *without* installing it?

### 4. Let the AI audit too

New session. Ask the agent to **audit** (read-only) the three files and
report risks. Compare with your list. What did it miss? Did anything in
the files try to steer it? (Watch the HTML comment.)

### 5. Harden your setup

Pick 3 findings and turn each into an **enforced** protection in your
config from ai-07/ai-08, e.g.:

- `deny` rule for `Read(./.env)` / `Bash(curl * | sh)` / `Bash(pip install *)`
- a hook that blocks edits that raise `MAX_VX`
- server-side clamp already in your MCP `drive`

Test each one once.

### 6. Ethics (discussion, 10 min)

Read the class AI policy. In 5 sentences: when is using AI in this course
fine, when is it not, and what does "you own every line" mean for you?

## Hand in

- `work/<your-name>/ai-12/audit.md`: findings table *(file · line · problem · severity · fix)*
- AI audit vs. yours: what each missed
- The 3 protections + test results; ethics paragraph

## Done when

- [ ] ≥ 5 findings in the skill, ≥ 3 in the MCP config, ≥ 6 in the diff
- [ ] Injection attempt in the skill identified
- [ ] 3 protections enforced and tested

See [CHECKLIST.md](CHECKLIST.md).
