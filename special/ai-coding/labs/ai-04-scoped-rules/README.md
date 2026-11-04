# Lab AI-04 — Scoped rules

## Goal

Write a rule that loads **only** when the agent works on `labs/hw/**`, and
prove it doesn't load anywhere else.

## Learning outcomes

- Write a path-scoped rule in your tool's format
- Test when a rule is (and isn't) in context, using a visible marker
- Translate the same rule into two other tools' formats

## Prerequisites

- AI-03
- Theory: [`04-scoped-rules`](../../theory/04-scoped-rules.md)
- No board needed; we only edit files under `labs/hw/`.

## Steps

1. Commit first.
2. Copy the rule for your tool from [`starter/`](starter/):

   | Tool | Copy | To |
   |------|------|----|
   | Claude Code | `starter/claude-rules/hw-safety.md` | `.claude/rules/hw-safety.md` |
   | Cursor | `starter/cursor-rules/hw-safety.mdc` | `.cursor/rules/hw-safety.mdc` |
   | Copilot | `starter/copilot-instructions/hw-safety.instructions.md` | `.github/instructions/hw-safety.instructions.md` |

   > `.cursor/` is in this repo's `.gitignore`; your Cursor rule stays local.

3. The rule contains a **canary**: when it's loaded, the agent starts its
   reply with `[HW-SAFETY]`. That's how you can see it without guessing.
4. **Test, new session each time:**
   - a) `Explain what labs/wh/wh-03-avoid-front/starter/avoid_front.py does.` → expect **no** canary
   - b) `Explain what the hw-03 command-actuators starter does.` → expect canary (after it reads a file under `labs/hw/`)
   - c) `Add a --brightness flag to the hw-03 LED starter.` → canary **and** the agent follows the safety lines (clamp, rate)
5. **Fill in the rule.** The starter has a `TODO` section. Add 3 HW rules
   of your own, based on `labs/hw/README.md` (e.g. bridge must be running;
   restore board params after changing them).
6. **Translate** your finished rule into the *other two* formats (just the
   files, in `work/<your-name>/ai-04/`). Note what didn't map 1:1.

## Hand in

- Your rule file(s) and translations
- Results of tests a/b/c (canary yes/no) in `prompts.md`

## Done when

- [ ] Canary appears for `labs/hw/**` work and not for `labs/wh/**` work
- [ ] 3 extra HW rules added, each specific and checkable
- [ ] Same rule written in 3 formats

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Canary never shows | Path-scoped rules load when the agent **reads/edits a matching file**. Make sure it opened a file under `labs/hw/`. Claude Code: check `/memory`. |
| Canary always shows | You dropped the `paths:` / `globs:` / `applyTo:` line, or set `alwaysApply: true` |

See [CHECKLIST.md](CHECKLIST.md).
