# Theory notes (short)

Short concept cards that pair with the labs. For full reading, use the ebook
chapters under [`docs/ebook/chapters/`](../ebook/chapters/). Lab procedures stay
under [`labs/`](../../labs/).

| Layer | What it’s for |
|-------|----------------|
| `docs/theory/` | One-page concept notes |
| `docs/ebook/chapters/` | Longer reading |
| `labs/**/README.md` | Hands-on steps |

Card numbers (01–14) do not always match ebook chapter numbers (e.g. theory 04 → ebook Ch.5). Prefer the links below.

## Index

| Card | Purpose (one line) | Ebook | Lab(s) |
|------|--------------------|-------|--------|
| [01-graph-topics](01-graph-topics.md) | Nodes, topics, schemas; discovery vs empty graph | [ch01](../ebook/chapters/ch01-graph-nodes-topics.md) | [mw-00](../../labs/mw/mw-00-getting-started/), [wh-00](../../labs/wh/wh-00-hello-graph/) |
| [02-twist-control](02-twist-control.md) | Twist fields, ownership, External + cmd timeout | [ch02](../ebook/chapters/ch02-twist-control.md) | [wh-01](../../labs/wh/wh-01-drive-twist/) |
| [03-odometry-scan](03-odometry-scan.md) | Odom pose + three-beam scan indices | [ch03](../ebook/chapters/ch03-odometry-scan.md) | [wh-02](../../labs/wh/wh-02-sense-odom-scan/) |
| [04-feedback-control](04-feedback-control.md) | Open vs closed loop; bang-bang; square drift | [ch05](../ebook/chapters/ch05-feedback-control.md) | [wh-03](../../labs/wh/wh-03-avoid-front/), [wh-04](../../labs/wh/wh-04-square-path/) |
| [05-wall-follow-fsm](05-wall-follow-fsm.md) | Side-range error + named FSM transitions | [ch08](../ebook/chapters/ch08-wall-follow-fsm.md) | [wh-05](../../labs/wh/wh-05-wall-follow/), [wh-06](../../labs/wh/wh-06-state-machine/) |
| [06-bags-evidence](06-bags-evidence.md) | Bags as grading evidence; min topics; replay ≠ live | [ch09](../ebook/chapters/ch09-bags-evidence.md) | [mw-05](../../labs/mw/mw-05-record-replay/), [wh-07](../../labs/wh/wh-07-record-bag/), [hw-06](../../labs/hw/hw-06-record-board/) |
| [07-messages-schema](07-messages-schema.md) | Typed protobuf payloads; schema as contract | *(see ch01 § schemas; no dedicated chapter)* | [mw-01](../../labs/mw/mw-01-pub-sub/) |
| [08-services](08-services.md) | Request/response vs streams; when not to use | [ch06](../ebook/chapters/ch06-services.md) | [mw-02](../../labs/mw/mw-02-services/) |
| [09-actions](09-actions.md) | Goal / feedback / result / cancel | [ch07](../ebook/chapters/ch07-actions.md) | [mw-03](../../labs/mw/mw-03-actions/) |
| [10-params-lifecycle](10-params-lifecycle.md) | Node params + lifecycle states | [ch10](../ebook/chapters/ch10-params-lifecycle.md) | [mw-04](../../labs/mw/mw-04-parameters/) |
| [11-observe-qos](11-observe-qos.md) | Observe tools before blaming mesh; QoS presets | [ch12](../ebook/chapters/ch12-observe-qos.md) | Cross-cutting (any MW/WH debug) |
| [12-tf-frames](12-tf-frames.md) | frame_id / TF tree; pose without frame is junk | [ch13](../ebook/chapters/ch13-tf-frames.md) | Concept (WH odom fields) |
| [13-digital-twin](13-digital-twin.md) | Twin consumes same contracts; MW-06 → WH scale | [ch11](../ebook/chapters/ch11-digital-twin.md) | [mw-06](../../labs/mw/mw-06-mini-twin/) |
| [14-board-on-graph](14-board-on-graph.md) | Bridge LISTEN vs CONNECT; sys/board; caps; dialout | [ch04](../ebook/chapters/ch04-board-on-graph.md) | [hw-00](../../labs/hw/hw-00-board-connect/), [hw-01](../../labs/hw/hw-01-caps-probe/) |

## Suggested reading order

WH/MW start: **01 → 02 → 03 → 04** (+ **07**, **08** with MW).  
Autonomy + bags: **05 → 06** (+ **09**, **10**, **11**).  
Extra concepts: **12**, **13**.  
HW track: **14** before HW-00 (bags on board reuse **06**).
