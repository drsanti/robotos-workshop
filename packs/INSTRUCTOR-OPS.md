# Instructor ops — docs companion recovery

One page for TAs during a timed workshop. Students use interactive docs + local **docs companion** (`workshop-host`).

## Ports (do not mix)

| Product | Default | Binary |
|---------|---------|--------|
| Workshop docs companion | **`:7420`** | `workshop-host` via `./scripts/start-host.sh` |
| Robotos Studio host | **`:7421`** | `studio-host` |

If start-host says port in use: something else owns **7420**. Studio on 7421 is fine alongside the companion. Check: `lsof -nP -iTCP:7420 -sTCP:LISTEN` (Windows: `netstat -ano | findstr :7420`).

## Start / token

1. Student opens pack root (folder with `SETUP.md`).
2. Run `./scripts/start-host.sh` (Windows: `scripts\start-host.cmd`). Leave the window open.
3. Copy the **Bearer** token from the cyan box (or `.host-token` next to the binary).
4. In docs: **Your setup → Connect companion** → paste token → Connect. URL should be `http://127.0.0.1:7420`.

Token rejected → new token from that host window (restart companion if needed). Wrong port / Studio URL → graph/Connect will fail.

## Dual windows: `labs` vs `bridge`

| Tab | Role |
|-----|------|
| **labs** | One-shot checks, Python labs, `robotos` CLI |
| **bridge** | Long-running `serial-bridge` (and similar) |

Code blocks show **→ labs** / **→ bridge**. If Run seems to do nothing, check the matching tab (it pulses on Run).

## Stop vs Kill

| Action | Effect |
|--------|--------|
| **Stop** | Ctrl+C in the active tab; clears “busy” so oneshot Run can proceed |
| **Kill** | Destroys that PTY and recreates `labs` / `bridge` |

Prefer **Stop** first. Use **Kill** only if the shell is wedged.

Busy yellow dot on a tab = persistent job (usually bridge). Oneshot Run into that tab is rejected with coaching: **Stop bridge** or **Run in labs**.

## TTY dropped

Dock shows **Reconnect terminal** — reattaches to the same host PTY (scrollback/ring kept). Do not restart the companion unless Connect itself failed.

## Quick triage

| Symptom | Try |
|---------|-----|
| No Run / dock says connect | start-host on **:7420**, paste token |
| Port busy on start-host | free 7420; Studio should be on 7421 |
| “Run did nothing” | open dock → correct **labs/bridge** tab |
| Busy / 409 | Stop that tab, or Run in labs |
| Wrong board / no Live | bridge up + peer “graph up”; Your setup → board/serial |
| Inject noise / weird `%` | rebuild companion; short relative inject is current host |

## Class URL flags (docs SPA)

Append to the Pages URL (saved in localStorage after first load):

| Query | Effect |
|-------|--------|
| `?classLock=1` | Lock appearance + terminal font/prompt (classroom defaults) |
| `?projector=1` | Higher contrast + larger type for projectors |
| `?screenReader=1` | xterm accessible buffer |

Turn off with `=0`, or Appearance → **Class mode** checkboxes. Students can still Stop/Kill/Run.

Run scripts always `cd` to the workshop root before executing (cwd drift from hand-typed `cd` no longer breaks relative inject). Dock **⋯ → cd workshop root** resets the interactive shell the same way.

## Links

- Student site: https://drsanti.github.io/robotos-workshop-docs/
- Companion design notes: [workshop-host.md](./workshop-host.md)
- Terminal backlog: [Better workshop terminal](../reports/Better%20workshop%20terminal.md)
