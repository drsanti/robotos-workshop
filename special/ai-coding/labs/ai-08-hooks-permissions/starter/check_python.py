#!/usr/bin/env python3
"""AI-08 — PostToolUse hook: syntax-check a Python file right after the AI edits it.

The edit already happened, so exit 2 can't undo it. It sends stderr back to
the model so it fixes its own mistake in the next step.
"""

from __future__ import annotations

import json
import py_compile
import sys


def main() -> int:
    try:
        call = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0
    target = (call.get("tool_input") or {}).get("file_path", "")
    if not target.endswith(".py"):
        return 0
    try:
        py_compile.compile(target, doraise=True)
    except py_compile.PyCompileError as e:
        print(f"Syntax check failed after your edit:\n{e.msg}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
