# robotos-workshop

Student-facing curriculum + **prebuilt** `code/` packs (robotos CLI, wheels, robotos-sim).  
Do **not** clone `robotos` or `robotos-sim` source for class labs.

## Layout (in progress)

```text
code/
  robotos-v0.3.0-macos-arm64/       # CLI + SDK headers
  robotos-sim-v0.1.0-macos-arm64/   # warehouse desktop sim (.app)
packs/
  SMOKE.md                          # maintainer smoke log
```

Windows / Linux sim + full SETUP / labs land as the class pack fills in.
See private `robotos-sim` docs: `workshop-bundle-building.md`.

## macOS quick smoke

```bash
export PATH="$PWD/code/robotos-v0.3.0-macos-arm64/bin:$PATH"
open ./code/robotos-sim-v0.1.0-macos-arm64/robotos-sim.app
# Gatekeeper first launch: right-click → Open if blocked
robotos topic list   # expect /robot/01/cmd_vel|odom|scan
```
