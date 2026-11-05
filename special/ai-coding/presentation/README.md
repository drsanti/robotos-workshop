# AI Coding Assistance — HTML + SVG presentation

Open [index.html](index.html) directly in a modern browser. The deck works offline without a server, package installation or external fonts. Keep this folder inside the workshop repository for source links to resolve.

The **30 slides** cover the opening and setup, followed by a **theory/practice pair for AI-00 through AI-13**. The four parts follow the workshop content map: Foundations, Context engineering, Extending the agent, and Working well & safely.

Text is selectable HTML. Diagrams and the blurred workstation backdrop are native SVG. The visual system uses dark slate panels, lavender concept flows and lime action accents. Each slide has an objective, student-facing reading content, a worked example, a compact mechanism/workflow, learning outcomes or completion evidence, and a declarative Takeaway.

Theory slides explain the concept in plain language before showing the diagram. Practice slides show three concrete steps and an example or check. A **Student reading** section below the presentation adds the explanation, worked example, practice steps, full-size diagram, completion evidence and source links for the selected topic. Students can study this directly without opening presenter notes. On phones, the reading section reflows into one readable column.

## Presenting

- Left / Right, Page Up / Page Down, or Space: navigate.
- Home / End: first / last slide in the selected part.
- **EN / TH**: switch the slide language. Thai keeps technical names in English (MCP, topic, Twist, scan, agent, prompt, and so on). The choice is remembered in this browser.
- **Pointer**: comet cursor. Set color, size, tail length, and tail life. Track color follows the slide. The choice is remembered in this browser.
- **Topics**: search titles, lab IDs and concepts in either language; select a theory or practice slide.
- **N**: presenter notes with original theory cards, practice procedures and completion checklists. Source command dumps stay in English.
- **F** or **Present**: fullscreen; Escape exits and closes panels.
- **Export diagram SVG**: download a standalone vector diagram with embedded theme colors.
- **Print deck**: print all 30 slides or the selected part. Use landscape orientation, background graphics on, and browser headers/footers off.

The instructor notes preserve source text, including source teaching questions and lab commands; on-slide panels use Takeaways. Nothing in the deck runs a shell command, connects to MCP or moves the simulator. Suspicious AI-12 samples remain read-only audit material. AI-07 explicitly marks the starter's input clamps and front check as incomplete TODOs.

## Sources and scope

- [Workshop README](../README.md), [content map](../outline.md) and [setup](../SETUP-AI.md).
- All 14 [theory cards](../theory/README.md).
- All 14 lab READMEs and CHECKLISTs under `../labs/`.
- [Prompt-log template](../handouts/prompt-log-template.md) and [tool cheat sheet](../handouts/cheat-sheet.md).

Vendor-specific formats follow the workshop source snapshot dated **2026-11-04**. The presentation is a conversion of local teaching material, not a fresh certification of vendor behavior. Consult the cheat sheet and current official documentation before a class. Examples and diagrams do not claim a successful live run; bag counts alone do not establish physical or simulator behavior.

## Editing and rebuilding

Edit `curriculum.py` for objectives and workflow labels, `reading.py` for student explanations, examples and steps, `diagrams.js` for vector mechanisms, `style.css` for layout/theme, and `app.js` for presentation controls. Full source text is embedded into the notes by the builder; it is rendered as escaped text. SVG export downloads the full mechanism rather than only the compact slide ribbon.

From the workshop root:

```bash
python3 special/ai-coding/presentation/build.py
```

On Windows, use `py special\ai-coding\presentation\build.py` or your workshop venv interpreter. Rebuilding needs only Python's standard library. Viewing needs only a browser.

Created 2026-11-05. The original theory cards, labs, starter programs and assistant configurations were not changed or executed.
