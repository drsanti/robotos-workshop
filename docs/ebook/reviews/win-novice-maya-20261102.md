# Persona review — Maya (`win-novice`)

**Date:** 2026-11-02  
**OS:** Windows 11 (university laptop image)  
**Reviewed:** `SETUP.md`, `code/NOTES.txt`, `labs/README.md`, `labs/wh/wh-00-hello-graph/README.md`, `labs/wh/wh-01-drive-twist/README.md` + `starter/drive_forward.py`, `docs/theory/01-graph-topics.md`, `labs/mw/mw-00-getting-started/README.md`, `labs/mw/mw-01-pub-sub/README.md`  
**Lens:** Never opened PowerShell before. Afraid of red text / breaking the PC. Needs “what is a terminal,” copy-paste blocks, “you should see…,” ExecutionPolicy help, where the unzip went.

**Verdict:** I cannot finish SETUP → WH-00 → WH-01 or MW-00 → MW-01 unsupervised. Docs assume I already live in a shell. Against `STYLE.md` / skill quality bar: **FAIL** for every lab sheet and for theory (still instructor bullets). SETUP is the closest to usable but still blocks me before step 2.

---

## 1. Stuck points

Ranked **Blocker** / **Confusing** / **Nice-to-have**. Quotes are exact.

### Blocker

| # | Quote / location | Why I stop |
|---|------------------|------------|
| B1 | `SETUP.md` §2 opens with PowerShell fences; nowhere says *how to open* PowerShell | I do not know Start → type “PowerShell” vs CMD vs Terminal. First command is already `cd <robotos-workshop>`. |
| B2 | `cd <robotos-workshop>` (`SETUP.md` L30, `NOTES.txt` L30) | Angle brackets look like syntax I must type. I do not know my unzip folder. “Use a short path without spaces” does not tell me *where* File Explorer put the zip. |
| B3 | `.\.venv\Scripts\Activate.ps1` (`SETUP.md` L55, `NOTES.txt` L21) | Persona panic: ExecutionPolicy red error. SETUP troubleshooting table has *no* row for this. STYLE mentions the admonition; student SETUP does not. |
| B4 | `python -m venv .venv` (`SETUP.md` L54) | University image may open the “which Python / Microsoft Store” picker, or `python` not found. No “install Python 3.11+, check Add to PATH,” no `py -3` fallback. |
| B5 | `pip install code\robotos-0.3.0-*.whl` (`SETUP.md` L58) | Exact wheel in pack is `robotos-0.3.0-py3-none-win_amd64.whl`. Wildcard + wrong cwd → scary pip error. `NOTES.txt` has the real filename; SETUP does not copy it. |
| B6 | §4 “Launch desktop sim from `code/robotos-sim-v*/`” (`SETUP.md` L64) | Glob path. I need: File Explorer → `code\robotos-sim-v0.1.0-windows-x64\` → double-click `robotos-sim.exe` (as `code/.../README.txt` actually says). SETUP never says double-click / `.exe`. |
| B7 | “Confirm the UI shows connected / NATIVE” + “Warehouse → Native → External → Connect” (`SETUP.md` L65–66; WH labs) | No screenshot, no “you should see…”. I do not know which menu is Warehouse or what External vs Manual looks like. Afraid to click wrong thing. |
| B8 | Smoke uses `cd d:\CODE\2027\cronos\robotos-workshop` (`SETUP.md` L73) | That is the author’s machine path, not mine. STYLE says avoid absolute local paths. I will copy it and fail. |
| B9 | WH-01 Run block is fenced `bash` with `cd labs/wh/wh-01-drive-twist/starter` (`wh-01/.../README.md` L13–17) | I am on Windows. No PowerShell fence. No reminder that PATH + `.venv` must already be active in *this* window. Running from File Explorer double-click is not covered. |
| B10 | MW-01: “Two terminals:” then `python starter\sim_sensor.py` (`mw-01/.../README.md` L9–14) | I do not know how to open a *second* PowerShell. Paths assume cwd is `labs/mw/mw-01-pub-sub` but never `cd` there. No Activate.ps1. First terminal hangs in `while True` — I will think it froze (Ctrl-C never taught). |
| B11 | WH-00 step 1 is bare `` `robotos topic list` `` (`wh-00/.../README.md` L13) | No “open PowerShell, paste PATH lines from SETUP.” If PATH was only set in a closed window, `robotos` not found → panic. |

### Confusing

| # | Quote / location | Why I hesitate |
|---|------------------|----------------|
| C1 | §3 fence mixes `# source .venv/bin/activate  # Linux/macOS` inside the PowerShell block (`SETUP.md` L54–60) | STYLE: never mix shells in one fence. I might uncomment the Linux line and get red text. |
| C2 | Optional `# $env:ROBOTOS_CONNECT = "tcp/127.0.0.1:7447"` (`SETUP.md` L33–34; `NOTES.txt` L13–14) | “Optional if NOTES.txt specifies endpoints” — NOTES says leave unset *or* set. I do not know which for class Wi‑Fi. Wrong guess → empty `topic list`. |
| C3 | WH-00: “names may appear when sim is publishing” (`wh-00` L13) | Soft language. Am I done if the list is empty? Done-when points at `p0-contract.md` (dense) instead of a sample transcript. |
| C4 | WH-00: “Switch sim to **External** before Lab 01” vs SETUP “auto-select External + Native” | Contradiction in my head: auto vs I must switch. Checklist says Manual nudge then External — order unclear without UI labels. |
| C5 | WH-01 tasks say publish `linear.x = 0.2` / `angular.z = 0.5` but Run already shows flags (`wh-01` L15–26) | Do I edit the `.py` file or only pass `--vx` / `--wz`? No line-by-line walkthrough of `drive_forward.py`. |
| C6 | `starter/README.md` CLI hex Twist + backtick continuation | Hex + `` ` `` line continue is advanced PowerShell. Linked as “Details” — I will open it and freeze. |
| C7 | Theory: “Graph ≠ one process,” “protobuf,” “Mock vs Native” (`docs/theory/01-graph-topics.md`) | Instructor talking points. No definition of *node* / *topic* for someone who has never seen ROS/middleware. Board sketch helps a little; still not a student chapter. |
| C8 | MW-00: `robotos doctor` / optional `robotos ui` with no sample output | If `doctor` prints warnings I do not understand, I stop. Empty `node list` is “may be empty” — good, but no example of success. |
| C9 | `labs/README.md` is only a folder table | Fine as index; does not tell me MW before WH or that SETUP is mandatory first. |
| C10 | `NOTES.txt` is Windows-shaped (good for me) but still assumes I know `$env:PATH`, `$PWD`, second terminal | Better copy-paste than SETUP for the wheel name; still not “open PowerShell.” |

### Nice-to-have

| # | Location | Note |
|---|----------|------|
| N1 | All lab READMEs | Thai gloss callouts for “terminal / venv / topic” would calm first week (STYLE allows). |
| N2 | Sim `README.txt` | Short and clearer than SETUP §4 — SETUP should promote that double-click line. |
| N3 | Expected odom numbers / screenshot of moved robot after WH-01 | “~1 m” is abstract without viewport cue. |
| N4 | Glossary link from every lab | Terms: PowerShell, venv, PATH, topic, Twist, External, Native. |

---

## 2. Missing for ebook (quality bar scorecard)

Per skill: fail if missing Learning outcomes, Prerequisites, Theory depth, Architecture diagram, Sequence diagram, OS-forked steps, Code walkthrough, Expected output, Troubleshooting (≥3), Check yourself, Glossary.

| Doc | LO | Prereq | Theory | Arch | Seq | Win/bash forks | Code walk | Expected out | Trouble (≥3) | Check | Glossary | Ebook-ready? |
|-----|----|--------|--------|------|-----|----------------|-----------|--------------|--------------|-------|----------|--------------|
| `SETUP.md` | ✗ | partial | ✗ | ✗ | ✗ | partial (mixed fence) | ✗ | partial | ✓ table | ✗ | ✗ | **No** (Ch.0 needs zero-to-running for novices) |
| `code/NOTES.txt` | ✗ | partial | ✗ | ✗ | ✗ | Win-only pack OK | ✗ | ✗ | partial | ✗ | ✗ | Cheat sheet only |
| `labs/README.md` | — | — | — | — | — | — | — | — | — | — | — | Index OK; not a lab |
| `wh-00` README | goal only | ✓ short | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | checklist only | ✗ | **No** |
| `wh-01` README + starter | goal only | ✓ short | ✗ | ✗ | ✗ | bash-only **fail** | ✗ (file unexplained) | vague “~1 m” | ✗ | checklist only | ✗ | **No** |
| `docs/theory/01-graph-topics.md` | talk outcomes | ✗ | bullets ≠ ≥1 page | ASCII only | ✗ | ✗ | ✗ | ✗ | ✗ | 2 Qs | ✗ | **No** — migrate to `docs/ebook/chapters/` |
| `mw-00` README | ✗ | via SETUP | link only | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | checklist | ✗ | **No** |
| `mw-01` README | ✗ | ✗ | link only | ✗ | ✗ (2 processes!) | powershell paths but no `cd`/venv | ✗ | ✗ | ✗ | checklist | ✗ | **No** |

**Biggest ebook gaps**

1. No Mermaid flowchart / sequence for learner ↔ topics ↔ sim (WH) or sensor ↔ monitor (MW-01).  
2. No line-by-line walkthrough of `drive_forward.py`, `sim_sensor.py`, `monitor.py`.  
3. No minimal successful transcript (5–15 lines) anywhere in these lab sheets.  
4. Theory file is instructor notes, not a student chapter (skill anti-pattern).  
5. Windows novice path: open shell → cd → PATH → venv → ExecutionPolicy → exact wheel → launch `.exe` is incomplete.

---

## 3. Rewrite snippets (concrete only — not full curriculum)

### 3.1 SETUP — before first command

```markdown
## 0. Open PowerShell (Windows)

1. Press the **Start** key, type `PowerShell`, open **Windows PowerShell**
   (not Command Prompt).
2. A blue or black window with a blinking cursor is your **terminal** —
   you type or paste commands here and press Enter.
3. Unzip the course zip (right-click → Extract All…) to a short path
   **without spaces**, e.g. `C:\robotos-workshop\`.
4. In PowerShell, go there (edit the path to match yours):

```powershell
cd C:\robotos-workshop
```

> **Windows only:** If a script later fails with *running scripts is disabled*
> (`ExecutionPolicy`), run **once** in this window:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
> then retry `.\.venv\Scripts\Activate.ps1`.
```

### 3.2 SETUP — Python wheel (replace wildcard line)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
# Prompt should start with (.venv). If `python` opens the Store, install
# Python 3.11+ from python.org and tick "Add python.exe to PATH", then reopen PowerShell.
python -m pip install -U pip
python -m pip install code\robotos-0.3.0-py3-none-win_amd64.whl
python -c "import robotos; print(robotos.Node.version())"
```

**You should see:** a version string printed (no `ModuleNotFoundError`).

### 3.3 SETUP — start sim (replace §4 bullet 1)

```markdown
1. In File Explorer open:
   `code\robotos-sim-v0.1.0-windows-x64\`
2. Double-click `robotos-sim.exe`.
3. Wait until the UI shows **Native** and **connected** (External mode).
   If not: Warehouse → Native → External → **Connect**.
```

Also replace smoke `cd d:\CODE\2027\...` with `cd` to *your* unpack path.

### 3.4 WH-00 — first runnable steps

```markdown
## Hands-on — Windows (PowerShell)

Keep the sim window open. In PowerShell (PATH + venv from SETUP still active):

```powershell
robotos topic list
```

**You should see** lines including `/robot/01/cmd_vel`, `/robot/01/odom`, `/robot/01/scan`
(not only `no topics announced`).

```powershell
robotos topic echo /robot/01/odom --count 5
```

**You should see** several decoded pose lines, then the command ends.
```

Add a tiny Mermaid + “Check yourself” + glossary terms (`topic`, `node`, `External`).

### 3.5 WH-01 — PowerShell run + expected transcript

```markdown
## Hands-on — Windows (PowerShell)

Sim must show **External + Native + Connect**. Same PowerShell as SETUP:

```powershell
cd labs\wh\wh-01-drive-twist\starter
python drive_forward.py
```

**You should see** something like:

```text
robotos 0.3.0 — pub Twist vx=0.2 wz=0.0 for ~5.0s @ 20.0 Hz
done — 100 cmds + zero
```

and the robot in the sim moves forward about 1 m, then stops.
```

### 3.6 WH-01 — code walkthrough snippet (`drive_forward.py`)

```markdown
## Code walkthrough

- `from ... geometry_pb2 import Twist` — message type the sim expects on cmd_vel.
- `node.create_publisher(TOPIC, Twist)` — join the graph as a publisher.
- `time.sleep(0.8)` — brief wait so discovery can see you (same idea as CLI).
- Loop at 20 Hz — sim command timeout needs steady pubs (≥ ~2 Hz), not one shot.
- Final `pub.publish(Twist())` — send zero so the robot stops cleanly.
```

### 3.7 MW-01 — two windows, explicit cds

```markdown
## Hands-on — Windows (PowerShell)

**Terminal A** (Start → PowerShell again = second window). PATH + venv, then:

```powershell
cd labs\mw\mw-01-pub-sub
python starter\sim_sensor.py
```

Leave it running. Printing `publishing on /machine/01/sensor/imu` is success (not frozen).
Stop later with **Ctrl+C**.

**Terminal B:**

```powershell
cd labs\mw\mw-01-pub-sub
# PATH + Activate.ps1 again in this new window
python starter\monitor.py 5
```

**You should see** repeating `acc.z=9.81  gyro.x=...` lines.
```

Add `sequenceDiagram`: sim_sensor → topic → monitor.

### 3.8 Theory migration one-liner (ebook chapter seed)

Expand `docs/theory/01-graph-topics.md` into `docs/ebook/chapters/` with: why many processes share names, Mermaid flowchart (learner / sim / topics), sequence for Connect → topic list → echo, Windows + bash command blocks, glossary (node, topic, schema, discovery, Native vs Mock). Keep the ASCII board sketch as print fallback.

---

## 4. Pass criteria (Maya succeeds unsupervised)

I pass when I can do all of the following **without asking an instructor**, using only the student docs:

1. **Find and open PowerShell**; `cd` to my real unpack folder (no `<…>` leftovers, no author’s `d:\CODE\...`).  
2. **PATH + `robotos version`** with a shown success line; know that closing the window forgets PATH.  
3. **Create/activate venv**; survive or fix **ExecutionPolicy**; install the **exact** `win_amd64` wheel; `import robotos` works.  
4. **Double-click** `robotos-sim.exe` and recognize **Native / External / Connected** (screenshot or labeled steps).  
5. **WH-00:** `topic list` matches expected names; `topic echo … --count 5` shows sample-like output; I can say sim is one node and cmd_vel is in / odom+scan are out.  
6. **WH-01:** PowerShell commands (not bash-only); robot moves ~1 m; I understand why the rate loop and zero Twist matter (short walkthrough).  
7. **MW-00:** empty `topic list` means “no one announcing,” not “I broke PATH.”  
8. **MW-01:** two PowerShell windows; publisher left running; monitor prints; I know Ctrl+C stops the publisher.  
9. Every lab sheet meets the **STYLE / skill quality bar** (outcomes, prereqs, theory bite, diagram, OS forks, walkthrough, expected output, ≥3 troubleshooting rows, check-yourself, glossary).  
10. Red-text failures I am likely to hit (`command not found`, ExecutionPolicy, wrong wheel, Store Python, `no topics announced`) appear in troubleshooting with a one-line fix.

Until then: **do not ship these pages as ebook lab sheets** — treat current lab READMEs as outlines and SETUP as a draft fast-path that still strands a Windows novice at “what is PowerShell?”
