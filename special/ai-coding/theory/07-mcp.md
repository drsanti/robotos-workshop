# Theory — MCP (Model Context Protocol)

**Who / when:** Extend block, before **ai-07** (the longest lab)
**Time:** ~30 min

> **Practice lab:** [`ai-07-mcp-server`](../labs/ai-07-mcp-server/)
> **Spec + SDKs:** [modelcontextprotocol.io](https://modelcontextprotocol.io)

## Learning outcomes

- Explain MCP as **"USB for AI tools"**: one protocol, any tool, any client
- Name the three things a server offers: **tools, resources, prompts**
- Configure a stdio server in `.mcp.json` and explain the trust risk

## Talking points

1. **Problem:** every agent has built-in tools (read, edit, bash). For anything else (a database, Slack, *our robot*), you'd write a custom integration per tool. MCP is one shared protocol instead.
2. **Roles:** the **client** is inside the agent app; the **server** is a small program that exposes capabilities. One client can connect to many servers.
3. **What a server offers:**
   - **Tools:** functions the model can call (`read_scan()`, `drive(vx, wz, seconds)`). Most used.
   - **Resources:** data the app can read (`robotos://contract`).
   - **Prompts:** reusable prompt templates.
4. **Transports:** **stdio** (app starts the server as a child process; local) or **streamable HTTP** (remote server, often with OAuth).
5. **Config (Claude Code):** `.mcp.json` in the project root (team, committed), or `claude mcp add --scope local|project|user …`. Other tools: `.cursor/mcp.json`, `.vscode/mcp.json`, `~/.codex/config.toml`.
6. **Same idea as our graph!** A tool schema is a contract, like a protobuf message on a topic. Docstrings and type hints become the tool description the model reads, so write them well.
7. **Risk:** a server runs **as you**, and its tool descriptions and results go straight into the model's context. A bad server can lie, leak data or carry prompt injection. Install only what you'd install as a normal program. Clients ask before using project servers: read that prompt.
8. **Safety in tool design:** clamp inputs (max speed, max seconds), always stop the robot at the end, return clear errors. The model *will* pass silly values.

## Board sketch

```text
  Claude Code ──(MCP client)── stdio ──► robotos_mcp.py ──► robotos graph ──► sim
      ▲                                    tools: topic_list, read_scan, drive
      └── tool results (JSON/text) ◄───────────┘
```

## Check questions

- Why not just let the agent run `robotos` CLI via bash? (**Possible, but MCP gives typed, clamped, safe-by-design tools and fewer permission prompts; also works in clients without shell.**)
- Server prints debug lines with `print()`. What breaks? (**stdio transport: stdout *is* the protocol channel; log to stderr.**)
- Who decides `drive(vx=5.0)` is too fast? (**The server: clamp it. Never trust the model to pick safe values.**)

## Mini-glossary

| Term | One-line gloss |
|------|----------------|
| MCP | Open protocol connecting AI apps to tools and data |
| Server / client | Provides tools / consumes them inside the agent app |
| Tool / resource / prompt | Callable function / readable data / prompt template |
| stdio / HTTP | Local child-process / network transport |
