# robotos workshop — ebook source

Canonical **student-facing** long-form chapters for the future online ebook / print PDF.

| Path | Purpose |
|------|---------|
| [`STYLE.md`](STYLE.md) | Writing rules, chapter template, diagram requirements |
| [`personas.md`](personas.md) | Simulated students (Win/macOS/Linux × skill) |
| [`chapters/`](chapters/) | Publishable chapters |
| [`reviews/`](reviews/) | Persona QA reports (not published) |

## Chapter status

| ID | Title | Status |
|----|-------|--------|
| Ch.0 | [`ch00-setup-your-machine.md`](chapters/ch00-setup-your-machine.md) | Draft v1 |
| Ch.1 | [`ch01-graph-nodes-topics.md`](chapters/ch01-graph-nodes-topics.md) | Draft v1 |
| Ch.2 | [`ch02-twist-control.md`](chapters/ch02-twist-control.md) | Draft v1 |
| Ch.3 | [`ch03-odometry-scan.md`](chapters/ch03-odometry-scan.md) | Draft v1 |
| Ch.4 | [`ch04-board-on-graph.md`](chapters/ch04-board-on-graph.md) | Draft v1 |
| Ch.5 | [`ch05-feedback-control.md`](chapters/ch05-feedback-control.md) | Draft v1 |
| Ch.6 | [`ch06-services.md`](chapters/ch06-services.md) | Draft v1 |
| Ch.7 | [`ch07-actions.md`](chapters/ch07-actions.md) | Draft v1 |
| Ch.8 | [`ch08-wall-follow-fsm.md`](chapters/ch08-wall-follow-fsm.md) | Draft v1 |
| Ch.9 | [`ch09-bags-evidence.md`](chapters/ch09-bags-evidence.md) | Draft v1 |
| Ch.10 | [`ch10-params-lifecycle.md`](chapters/ch10-params-lifecycle.md) | Draft v1 |
| Ch.11 | [`ch11-digital-twin.md`](chapters/ch11-digital-twin.md) | Draft v1 |
| Ch.12 | [`ch12-observe-qos.md`](chapters/ch12-observe-qos.md) | Draft v1 |
| Ch.13 | [`ch13-tf-frames.md`](chapters/ch13-tf-frames.md) | Draft v1 |

Publish/TOC: [`PUBLISHING.md`](PUBLISHING.md). Backlog: [`BACKLOG.md`](BACKLOG.md).

## QA loop

1. Author or expand a chapter to match `STYLE.md`.  
2. Run persona reviews via skill `student-doc-review` (Maya / Kenji / Aisha / …).  
3. File reports under `reviews/`.  
4. Fix blockers before class ship.

Class-day short path remains [`SETUP.md`](../../SETUP.md); it must stay consistent with Ch.0.
