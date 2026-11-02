# MW-00 — Getting started

## Goal

Prove the CLI works on your machine before writing any Python.

## Theory first

- Ebook: [`docs/ebook/chapters/ch01-graph-nodes-topics.md`](../../../docs/ebook/chapters/ch01-graph-nodes-topics.md)  
- Short notes: [`docs/theory/01-graph-topics.md`](../../../docs/theory/01-graph-topics.md)

## Prerequisites

Complete [`SETUP.md`](../../../SETUP.md) (PATH + venv + wheel), or run
`scripts/start-here` once and open a **VS Code** terminal. Keep PATH + venv
active for the commands below.

## Practice

From the **workshop root** (`YOUR_WORKSHOP_DIR`):

### Windows (PowerShell)

```powershell
robotos version
robotos doctor
robotos node list
robotos topic list
```

### Linux / macOS (bash)

```bash
robotos version
robotos doctor
robotos node list
robotos topic list
```

Optional: `robotos ui` if the pack embeds the inspector.

**Expect:** `version` prints `robotos 0.3.x`. `node list` / `topic list` may be **empty** until another node (sim, bridge, or MW-01) is running — that is normal.

## Done when

CLI works and you can explain what an empty `topic list` means.

See [CHECKLIST.md](CHECKLIST.md).
