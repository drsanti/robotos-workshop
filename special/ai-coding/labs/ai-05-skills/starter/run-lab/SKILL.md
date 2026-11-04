---
name: run-lab
description: Helps with labs.
---

# Run a workshop lab

## Steps

1. Check the warehouse sim is up:

   ```bash
   python scripts/check_sim.py
   ```

   (path is relative to this skill's folder)

2. TODO: if the check fails, what should the agent tell the user to do?
   (hint: `scripts/start-here` in the workshop root; External + Native + Connect)

3. TODO: run the lab with the workshop runner from the workshop root.
   Windows and macOS use different commands; see `scripts/README.md`.

4. TODO: how to pass extra arguments (e.g. `--threshold 0.8`) through the runner.

5. Leave the starter running only as long as the user asked; Ctrl-C stops the robot.

## Do not

- Start a second copy of the sim.
- Edit files in `labs/common/` or `code/` to make a lab run.
