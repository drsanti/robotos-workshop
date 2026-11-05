# robotos HTML + SVG lab presentation

Open [index.html](index.html) directly in a modern browser. No installation, build server, CDN, external fonts or network connection is required to view the deck. JavaScript is required. Keep this folder inside the workshop repository so the source links and optional background images resolve.

The deck contains **24 lab overviews** from option A of `labs/.prompt`: 7 MW, 9 WH and 8 HW. Text is HTML; mechanisms are real inline SVG shapes, connectors and labels. Generated raster images are used only as heavily blurred, dimmed background atmosphere. They are not flattened foreground slide content.

Every slide includes two explanatory paragraphs, three concrete practice steps, a worked example, a compact practice sequence, expected evidence and a Takeaway. The **Student reading** section below each slide adds the full-width SVG mechanism, prerequisites, the source run procedure with terminal/OS labels, and cleanup. Students can read this without opening presenter notes; on phones it reflows into one column.

## Presenting

- Use Left / Right, Page Up / Page Down, or Space to navigate; Home / End jump within the selected track.
- Choose **EN** or **TH** to read the lesson in that language. Thai keeps technical words in English (CLI, topic, Twist, Imu, and the command lines). The choice is remembered in this browser.
- Choose **Pointer** to set the comet color, size, tail length, and tail life. Track color follows the current slide. The choice is remembered in this browser.
- Filter MW, WH or HW, or select All to present the complete workshop.
- Choose **Read** to jump to the current lab's explanation, full diagram and run procedure.
- Open **Labs** to search by ID, title or topic and jump to a slide. Slide URLs include a lab fragment, so bookmarks open the selected lab.
- Press **N** for presenter notes, including terminal roles, source procedures, technical guards, practice and cleanup.
- Press **F** or choose **Present** for fullscreen. Browser support is required; Escape exits fullscreen and closes overlays.
- Choose **Export diagram SVG** to download the full vector mechanism with its track colors embedded, rather than only the compact practice sequence shown on the slide.
- Choose **Print deck** to print the selected track or all 24 slides. Use landscape orientation, no browser headers/footers, and background graphics enabled. PDF output remains browser-dependent.

## Track design

| Track | Design | Accents |
| --- | --- | --- |
| MW | Signal Lab | Electric blue and signal yellow |
| WH | Industrial Ice | Ice blue and muted orange |
| HW | Dark sci-fi electronics | Copper-orange and mint |

All tracks have dark panels, an objective, a source-faithful mechanism, expected evidence and a declarative Takeaway. Diagrams and expected behavior are teaching illustrations; the deck does not claim live simulator or hardware tests. The source lab sheet remains the complete student procedure.

## Editing and rebuilding

- Edit `style.css` for typography, slide layout and track colors.
- Edit `reading.py` for student explanations, examples, steps and practice-sequence labels. Rebuild afterward.
- Edit `diagrams.js` for the SVG mechanisms. Each mechanism is keyed by lab ID and uses explicit nodes, paths and labels.
- Edit `app.js` for navigation, presenter notes, printing and SVG export.
- Edit the source prompt files for objectives, evidence, Takeaways and notes, then run:

```bash
python3 labs/presentation/build.py
```

Run from the workshop root. On Windows, use your Python launcher (`py labs\presentation\build.py`) or the workshop virtual-environment interpreter. Python is needed only to rebuild `data.js`, not to view the presentation. Review the SVG mechanism whenever source technical behavior changes; diagrams are curated separately from generated prompt text.

This is the overview deck. The eight-slide-per-lab alternatives in option B have not been expanded into this presentation.
