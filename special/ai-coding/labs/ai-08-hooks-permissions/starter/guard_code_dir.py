#!/usr/bin/env python3
"""AI-08 — PreToolUse hook: block AI edits to protected workshop folders.

Claude Code sends the tool call as JSON on stdin. Exit 2 blocks the call and
stderr is shown to the model as the reason. Exit 0 lets it continue.

Try it by hand:
    echo '{"tool_name":"Edit","tool_input":{"file_path":"code/NOTES.txt"}}' | python guard_code_dir.py
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

# Relative to the workshop root. TODO (lab step 4): add one more folder.
PROTECTED = ("code", "labs/common")


def main() -> int:
    try:
        call = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0  # not our business; never break the session on bad input

    tool_input = call.get("tool_input") or {}
    target = tool_input.get("file_path") or tool_input.get("notebook_path")
    if not target:
        return 0

    root = Path(os.environ.get("CLAUDE_PROJECT_DIR") or call.get("cwd") or ".").resolve()
    path = Path(target)
    if not path.is_absolute():
        path = root / path
    path = path.resolve()

    for folder in PROTECTED:
        if path.is_relative_to(root / folder):
            print(
                f"Blocked by workshop hook: {folder}/ is read-only for AI edits "
                f"(see AGENTS.md 'Do not'). Change your own starter instead.",
                file=sys.stderr,
            )
            return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
