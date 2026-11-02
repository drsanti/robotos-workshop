# Theory — Parameters & lifecycle

**For:** Day 2 → MW-04 (laptop); mention HW-04 as board NVM cousin  
**Time:** ~20 min talk + live `param set`  
**Who:** instructor short notes — students read ebook Ch.10 for depth

> **Student ebook:** [`docs/ebook/chapters/ch10-params-lifecycle.md`](../ebook/chapters/ch10-params-lifecycle.md)  
> **Practice labs:** [`labs/mw/mw-04-parameters/`](../../labs/mw/mw-04-parameters/README.md) · board cousin [`labs/hw/hw-04-board-params/`](../../labs/hw/hw-04-board-params/README.md)

## Outcomes

Students can:

1. Treat params as **typed named config on a node**, not a “config topic.”  
2. Name MW-04 node `tuning_node` and params `setpoint`, `mode`.  
3. Run the mental loop `declare → get/set/watch` (+ optional persist).  
4. Say why remote sets need `set_allow_remote_params` and why lifecycle ≠ `kill -9`.

## Talking points

### Parameters

1. **Workshop contract (MW-04):**  
   - Node name: `tuning_node`  
   - Params: `setpoint` (default `42`), `mode` (default `"auto"`)  
   - API: `declare_parameter` → `param_get` / CLI `robotos param list|get|set`  
   - Remote write: `node.set_allow_remote_params(True)` — without it, CLI set is rejected  
2. **Param ≠ topic:** a topic streams forever; a param is addressed config **on that node**. Don’t invent `/tuning/config` spam when the platform has params.  
3. **Persist:** laptop demo is live RAM; board **HW-04** `--persist` / NVM is the silicon cousin — only for supported caps.  
4. **Trust:** remote set is a security boundary; allow explicitly.

### Lifecycle

1. States (concept): unconfigured → inactive → active → …  
2. CLI: `robotos lifecycle --help` / pack NOTES — query/transition where exposed.  
3. **Why:** orderly bring-up / shutdown; not pedagogy via force-kill.

## Board / sequence

```text
[robotos param CLI] --set setpoint 99--> [tuning_node]
[tuning_node] --print--> terminal  setpoint=99  mode=auto
```

```mermaid
sequenceDiagram
  participant N as tuning_node
  participant C as robotos param
  N->>N: declare setpoint, mode; allow remote
  C->>N: param set tuning_node setpoint 99
  N-->>C: ok
  N->>N: print setpoint=99
```

## Common confusions

| Confusion | Clarify |
|-----------|---------|
| Param = topic of config messages | Different address model; params are on the **node**, typed, get/set/watch. |
| `setpoint` is global on the mesh | Scoped to **node name** `tuning_node`. |
| CLI set always works | Needs running node + allow-remote + correct type. |
| Lifecycle = restart the process | Explicit state machine; process may stay up while inactive. |
| MW-04 needs Native sim / serial-bridge | No — laptop node + CLI only. HW-04 needs board + bridge. |

## Check questions

1. Difference between a param and a topic of “config messages”?  
   **A:** Param = typed field on a node with get/set/watch; topic = continuous pub/sub stream with no node-owned config API.  
2. Why does `param set` fail with the node printing defaults forever?  
   **A:** Often allow-remote off, wrong node name, or type mismatch — not “Zenoh down.”  
3. Does MW-04 `setpoint` survive reboot?  
   **A:** No (RAM). Board NVM persist is HW-04 stretch, not this lab.
