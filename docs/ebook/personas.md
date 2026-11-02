# Student personas (doc & ebook QA)

Use these characters when reviewing or drafting student materials.
Automation: project skill `.cursor/skills/student-doc-review/`.

---

## Maya — `win-novice`

- **OS:** Windows 11, laptop from university image  
- **Skill:** Never opened PowerShell or CMD before this course  
- **Goals:** Pass WH labs; afraid of “breaking” the computer  
- **Needs:** Screenshots-level wording, what a terminal *is*, copy-paste blocks, “you should see…”, ExecutionPolicy help, where unzip went  
- **Panic triggers:** Red text, `command not found`, Python launcher asking which install, venv activation policy errors  

## Priya — `mac-novice`

- **OS:** macOS (Apple Silicon), Terminal never used  
- **Skill:** Strong with Finder/apps; zero shell vocabulary  
- **Needs:** Open Terminal.app steps, `cd` explained, Gatekeeper “cannot be opened” for `robotos-sim`, `python3` not `python`  
- **Panic triggers:** Permission dialogs, Homebrew suggestions she does not have  

## Kenji — `mac-intermediate`

- **OS:** macOS Apple Silicon  
- **Skill:** CS undergrad; comfortable with git/bash; little robotics  
- **Needs:** Clear contracts (`/robot/01/*`), why Native≠Mock, schema names; less hand-holding on `cd`  
- **Panic triggers:** Ambiguous “connect the sim”; ARM vs x64 pack mismatch  

## Leo — `win-intermediate`

- **OS:** Windows 11  
- **Skill:** Some PowerShell; has run Python scripts in class  
- **Needs:** Multi-terminal workflows (bridge + lab), env var lifetime, how to know the board is on the graph  
- **Panic triggers:** `ROBOTOS_LISTEN` + `ROBOTOS_CONNECT` self-connect; COM port vs `--port auto`  

## Aisha — `linux-advanced`

- **OS:** Ubuntu 24.04  
- **Skill:** Daily terminal user; reads man pages  
- **Needs:** Precise package names, udev/`dialout`, executable bits, which wheel filename  
- **Panic triggers:** Docs that only show PowerShell; silent failures; “just install Python” without version  

---

## Coverage matrix (minimum)

Every student-facing procedure must be attempted by at least:

| Procedure | Maya | Kenji | Aisha |
|-----------|------|-------|-------|
| Unpack + PATH + venv | ✓ | ✓ | ✓ |
| Launch sim + WH-01 | ✓ | ✓ | ✓ |
| MW-01 pub/sub | ✓ | ✓ | ✓ |
| HW-00/01 bridge | Leo | — | ✓ |
