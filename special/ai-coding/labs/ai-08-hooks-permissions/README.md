# Lab AI-08 — Hooks & permissions

## Goal

Turn the "Do not edit `code/` or `labs/common/`" **advice** from your
AGENTS.md into **enforcement** the agent can't skip, and add an automatic
check after every Python edit.

## Learning outcomes

- Write permission `allow` / `ask` / `deny` rules
- Install a `PreToolUse` hook that blocks a tool call (exit 2) and a `PostToolUse` hook that reports back
- Test a guard, then try to **get around** it, and fix what you find

## Prerequisites

- AI-03 (your `labs/AGENTS.md` with a Do-not list)
- Theory: [`08-hooks-permissions`](../../theory/08-hooks-permissions.md)

## Steps

1. Commit first.
2. **Try the hooks by hand.** From the workshop root:

   ```bash
   echo '{"tool_name":"Edit","tool_input":{"file_path":"code/NOTES.txt"}}' | python special/ai-coding/labs/ai-08-hooks-permissions/starter/guard_code_dir.py
   ```

   Expect the "Blocked" message. Check the exit code: `echo $?` (macOS) or
   `$LASTEXITCODE` (PowerShell) → `2`.
   > Windows PowerShell: put the JSON in a file and use
   > `Get-Content call.json | python …` (quoting `'{"…"}'` is painful there).

3. **Install.**
   - Copy `starter/guard_code_dir.py` and `starter/check_python.py` to `.claude/hooks/`.
   - Copy `starter/settings.example.json` to `.claude/settings.json`
     (or merge into it if it exists).
   - **Windows:** change `python3` to `python` in both `command` lines.
   - New session. In Claude Code, `/hooks` lists what's active.
4. **Test block.** Ask: `Add a docstring to labs/common/scan.py.` The edit
   must be blocked and the agent must tell you why. Then add one more
   protected folder to `PROTECTED` (e.g. `scripts`) and test that too.
5. **Test the post-edit check.** Ask the agent to add a function to your
   ai-02 `avoid.py`. Then (you, by hand) break the syntax and ask for another
   small edit. Does the agent see the syntax error and fix it?
6. **Test permissions.** `What topics are up?` should run
   `robotos topic list` with no prompt (allowed). `git push` must ask.
   Ask the agent to `read .env` (create a dummy one) and it must be refused.
7. **Red team your guard (important).** Your guard checks `file_path` only.
   Find at least **one way the agent could still change `labs/common/`**
   (hint: what other tools can write files? what about letter case on
   macOS/Windows?). Write it down, then close the hole with a `deny` rule
   or a better hook.

## Hand in

- Your final `.claude/settings.json` and hook scripts (copies in `work/<your-name>/ai-08/`)
- Test log for steps 4–6
- The bypass you found and how you closed it

## Done when

- [ ] Edits to `code/`, `labs/common/` and your extra folder are blocked with a clear reason
- [ ] Syntax errors after an edit are reported back to the agent
- [ ] allow / ask / deny rules each tested once
- [ ] One bypass found and closed

See [CHECKLIST.md](CHECKLIST.md).
