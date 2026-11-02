# Persona re-review — Aisha (`linux-advanced`) — 2026-11-02

**Persona:** Ubuntu 24.04 daily CLI user; expects `dialout`/`udev`, `chmod +x`, exact wheel names, bash fences.  
**Prior:** [`linux-advanced-aisha-20261102.md`](linux-advanced-aisha-20261102.md) — **Fail** (Windows-first HW + NOTES; no dialout/chmod/bash).  
**Scope (this pass):** `SETUP.md` (Linux + §7), `docs/ebook/chapters/ch04-board-on-graph.md`, `labs/hw/hw-00-board-connect/README.md`, `labs/hw/hw-01-caps-probe/README.md`, `code/NOTES.txt` §B2.  
**Verdict (Linux HW path):** **PASS** — unsupervised board labs are copy-paste viable on Ubuntu.  
**Dialout / chmod / bash:** **Covered** in SETUP §2/§7, HW-00, NOTES B2, and ch04 troubleshooting.  
**Remaining gaps:** no linux-x64 **sim** pack honesty for WH; NOTES still headed `windows-x64` with B2 bolted on; wheel still a glob not one pinned filename. Not a full rewrite request — residuals only.

---

## Delta vs prior blockers

| Prior | Status | Evidence |
|-------|--------|----------|
| B1 NOTES Win-only | **Fixed (additive)** | §B2 bash + `/dev/ttyACM*` + dialout + `chmod` |
| B2 HW-00 PS-only | **Fixed** | Labeled `bash` Terminal A/B; `/dev/ttyACM0` |
| B3 HW-01 `starter\…` | **Fixed** | `python labs/hw/hw-01-caps-probe/starter/caps_probe.py` |
| B4 no dialout | **Fixed** | SETUP §7 + troubleshooting; HW-00; NOTES B2; ch04 |
| B5 no chmod | **Fixed** | SETUP §2 Linux; §7 bridge; NOTES B2; HW-00 |
| B6 maintainer `D:\CODE\…` smoke | **Fixed** | `YOUR_WORKSHOP_DIR` |
| B7 Linux sim steps / honesty | **Open (WH, not HW)** | §4 still says run `./robotos-sim`; unpack says “when shipped” only |
| B8 wheel exact name | **Partial** | Named Win wheel; Linux still `code/robotos-0.3.0-*.whl` + tag prose |

Ebook depth: theory bullets → **`ch04-board-on-graph.md`** with outcomes, Mermaid arch + sequence, caps table, walkthrough table, expected transcript, troubleshooting, glossary. Labs link into it. Quality bar for HW-00/01 + ch04 is largely met for this track.

---

## 1. Stuck points (this pass)

### Blocker

*None for HW-00 / HW-01 / SETUP §7 / NOTES B2 on a linux-x64 CLI+bridge pack.*

### Confusing

| # | Locus | Why Aisha pauses |
|---|-------|------------------|
| C1 | `code/NOTES.txt` header `OS/arch: windows-x64` + §B PowerShell primary; B2 is appendix | Linux zip that ships this NOTES still reads Windows-first. SETUP/HW-00 say “B / B2” — I find it, but a pack-generated NOTES should flip OS and promote B2. |
| C2 | SETUP §3 Linux: `pip install code/robotos-0.3.0-*.whl` | Glob OK if one wheel; if Win+Linux wheels both present, wrong pick. Prefer one documented filename for the linux drop. |
| C3 | HW-01 bash fence: only `export ROBOTOS_CONNECT=…` | New Terminal B after reboot: PATH / venv not restated (prereq text mentions them; fence does not). Easy miss vs HW-00’s full block. |
| C4 | SETUP §4–5 Linux WH smoke | Implies sim binary exists; no hard “WH sim: not in linux-x64 drop this term — skip WH or use lab Windows box.” |

### Nice-to-have

| # | Item |
|---|------|
| N1 | `groups \| grep dialout` / `ls -l /dev/ttyACM*` self-check next to usermod |
| N2 | “Do not `sudo serial-bridge` to fix permissions” |
| N3 | Optional udev snippet for locked-down lab images |
| N4 | HW-01 troubleshooting row: `Permission denied` → dialout (ch04/HW-00 already have it) |
| N5 | ch04 §5–6 still link-only (acceptable; labs hold OS forks) |

---

## 2. Coverage checklist — dialout / chmod / bash

| Concern | SETUP | NOTES B2 | HW-00 | HW-01 | ch04 |
|---------|-------|----------|-------|-------|------|
| Labeled `bash` fences | ✓ §2/3/5/7 | ✓ | ✓ | ✓ | via labs |
| `export ROBOTOS_LISTEN` / `CONNECT` | ✓ §7 | ✓ | ✓ | CONNECT ✓ | theory ✓ |
| `/dev/ttyACM*` (not COM-only) | ✓ | ✓ | ✓ | n/a | troubleshooting ✓ |
| `chmod +x` binaries | ✓ §2, §7 | ✓ | ✓ | — | — |
| `dialout` + re-login | ✓ §7 + table | ✓ | ✓ | — | ✓ troubleshooting |
| Forward-slash lab paths | ✓ | ✓ | ✓ | ✓ | ✓ |
| `python3 -m venv` | ✓ §3 | — | — | — | — |

**Assessment:** Dialout, chmod, and bash coverage for the **Linux HW path** is sufficient for unsupervised Aisha. Prior panic triggers are addressed in the student-facing HW procedure.

---

## 3. Missing / residual for ebook & packs

Against STYLE quality bar (scoped docs only):

| Doc | Bar notes |
|-----|-----------|
| `SETUP.md` | Proc doc — Linux forks good; HW §7 good; WH sim still soft on “missing artifact” |
| `NOTES.txt` B2 | Usable appendix; not a first-class linux-x64 NOTES |
| HW-00 | Outcomes, arch, sequence, dual OS, expected, ≥3 troubleshoot, checklist — **ebook-ready enough** |
| HW-01 | Outcomes, caps theory, dual OS, code notes, sample out, troubleshoot — **OK**; thinner PATH restatement |
| `ch04-board-on-graph.md` | Template sections present; theory shorter than 1.5k–3.5k ideal but no longer instructor bullets alone; hands-on delegated to labs |

**Explicit remaining gaps (do not block HW PASS):**

1. **No linux sim pack** — WH path on Ubuntu still unverified / undocumented as absent. Prefer one SETUP callout: *“If `code/robotos-sim-v*-linux-x64/` is missing, WH labs are out of scope on this machine.”*
2. **NOTES OS identity** — regenerate from template for linux-x64 drops so B2 is the main §B.
3. **Pin Linux wheel filename** in SETUP for the shipped tag (`manylinux` / `py3-none-any`).
4. Optional: HW-02+ not re-audited this pass (prior PS-only risk may remain if those sheets were not upgraded).

---

## 4. Rewrite snippets (residuals only)

### 4.1 SETUP §4 — sim honesty

> **Linux:** If your unzip has no `code/robotos-sim-v*-linux-x64/`, warehouse (WH) labs are not runnable on this pack — use MW/HW only, or a machine with a shipped sim. When the folder exists: `chmod +x` then `./robotos-sim`.

### 4.2 HW-01 bash — mirror HW-00 env (short)

```bash
export PATH="$PWD/code/robotos-v0.3.0-linux-x64/bin:$PATH"
export ROBOTOS_CONNECT=tcp/127.0.0.1:7447
source .venv/bin/activate
python labs/hw/hw-01-caps-probe/starter/caps_probe.py
```

### 4.3 NOTES pack header (linux drop)

```text
OS/arch:    linux-x64
serial-bridge: code/robotos-v0.3.0-linux-x64/bin/serial-bridge
```

Keep current B2 body as primary §B for that zip.

---

## 5. Pass criteria — result

| Criterion (from prior §4) | Met? |
|---------------------------|------|
| bash PATH + chmod + python3-venv + HW bridge in SETUP | **Yes** |
| dialout in student docs / troubleshooting | **Yes** |
| HW-00/01 labeled bash, `/` paths, `/dev/ttyACM*`, `export ROBOTOS_*` | **Yes** |
| NOTES usable for Linux bridge (B2) | **Yes** (appendix form) |
| ch04 beyond talking points (arch + sequence + walkthrough) | **Yes** |
| Tested/honest linux-x64 **sim** or explicit WH skip | **No** — residual |

**Unsupervised Linux HW (board + bridge + caps):** I succeed.  
**Full workshop including WH on Ubuntu:** still blocked until sim ships or SETUP scopes it out.

---

## Files reviewed (this pass)

- `docs/ebook/STYLE.md`, `docs/ebook/personas.md`, `.cursor/skills/student-doc-review/SKILL.md`
- Prior: `docs/ebook/reviews/linux-advanced-aisha-20261102.md`
- `SETUP.md`, `code/NOTES.txt` (§B / §B2)
- `docs/ebook/chapters/ch04-board-on-graph.md`
- `labs/hw/hw-00-board-connect/README.md`
- `labs/hw/hw-01-caps-probe/README.md`
