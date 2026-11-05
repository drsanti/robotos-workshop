"""Build an offline, source-linked theory/practice deck; execute no lab code."""
from pathlib import Path
import json
import re
from curriculum import TOPICS
from reading import READING

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent


def plain(text):
    code = []
    def preserve(match):
        code.append(match.group(1))
        return f"CODETOKEN{len(code)-1}END"
    text = re.sub(r"`([^`]+)`", preserve, text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = text.replace("**", "").replace("*", "")
    for i, value in enumerate(code):
        text = text.replace(f"CODETOKEN{i}END", value)
    return text.strip()


def section(text, heading):
    match = re.search(r"^## " + re.escape(heading) + r"\n(.*?)(?=\n## |\Z)", text, re.M | re.S)
    return match.group(1).strip() if match else ""


def slide(slug, ident, title, objective, flow, takeaway, evidence, track, kind, source, theory, notes):
    return dict(slug=slug, id=ident, title=title, objective=objective, flow=flow,
                takeaway=takeaway, evidence=evidence, track=track, kind=kind,
                source=source, prompt=theory, background="background.svg", notes=notes,
                mechanism=" → ".join(x[0] for x in flow),
                diagramBrief=". ".join(x[0]+": "+x[1] for x in flow),
                prerequisites="Complete MW-00, MW-01, WH-00, WH-01 and WH-02; follow SETUP-AI.md. AI labs are outside scripts/run list.")


def build():
    intro_notes=[{"title":"Workshop source", "text":(SOURCE/'README.md').read_text()},
                 {"title":"Content map", "text":(SOURCE/'outline.md').read_text()}]
    slides=[slide("opening", "AI WORKSHOP", "Build with AI. Verify with evidence.",
        "Use the familiar robotos warehouse to learn context, tool boundaries and accountable coding.",
        [("A · Foundations", "AI-00–02"),("B · Context", "AI-03–06"),("C · Extensions", "AI-07–09"),("D · Evidence", "AI-10–13")],
        "You own every submitted line. A prompt log, a reviewed diff and observed behavior make the work assessable.",
        "14 theory cards paired with 14 practice labs. Suggested teaching split: about 25% theory and 75% practice.",
        "intro","overview","../README.md","../outline.md",intro_notes),
        slide("setup","SETUP","Prepare the workspace and the evidence trail",
        "Start with the main-track prerequisites, a signed-in assistant and a clean review point.",
        [("Main setup", "Sim + CLI + workshop venv"),("Assistant", "Open the workshop root"),("Work area", "work/<your-name>/"),("Prompt log", "Save prompts + changes")],
        "Check the environment before changing code. Keep tool configuration at the expected scope and student evidence in the work folder.",
        "Confirm repo reading without edits. MCP-specific labs also need the SDK and interpreter checks from SETUP-AI.md.",
        "intro","setup","../SETUP-AI.md","../handouts/cheat-sheet.md",
        [{"title":"Setup source", "text":(SOURCE/'SETUP-AI.md').read_text()},
         {"title":"Prompt-log template", "text":(SOURCE/'handouts/prompt-log-template.md').read_text()}])]
    for i,(title,objective,theory_flow,takeaway,lab_flow,evidence) in enumerate(TOPICS):
        theory=next((SOURCE/'theory').glob(f'{i:02d}-*.md'))
        lab=next((SOURCE/'labs').glob(f'ai-{i:02d}-*'))
        theory_text=theory.read_text();lab_text=(lab/'README.md').read_text()
        part='a' if i<3 else 'b' if i<7 else 'c' if i<10 else 'd'
        notes=[{"title":"Instructor theory card", "text":theory_text},
               {"title":"Practice procedure (source)", "text":lab_text},
               {"title":"Completion checklist", "text":(lab/'CHECKLIST.md').read_text()}]
        # These are source documents, not executable agent configuration.
        src='../labs/'+lab.name+'/README.md';th='../theory/'+theory.name
        slides.append(slide(f'ai-{i:02d}-theory',f'AI-{i:02d}',title,objective,theory_flow,takeaway,
            plain(section(theory_text,'Learning outcomes')),part,'theory',src,th,notes))
        slides.append(slide(f'ai-{i:02d}-practice',f'AI-{i:02d}',f'Practice · {title}',plain(section(lab_text,'Goal')),
            lab_flow,takeaway,evidence,part,'practice',src,th,notes))
    assert len(slides)==30
    for item in slides:
        if item['track'] != 'intro':
            index = int(item['id'].split('-')[1])
            paragraphs, example, steps, practice_example = READING[index]
            item['reading'] = paragraphs
            item['steps'] = steps
            item['example'] = example if item['kind']=='theory' else practice_example
        elif item['slug']=='opening':
            item['reading'] = [
                'This workshop teaches you to collaborate with an AI coding assistant on code you can inspect and run. The familiar warehouse simulator gives you a visible way to compare the requested behavior with the program’s actual behavior.',
                'You will first learn what the model sees, then configure its context and tools, and finally test its work. Keep a prompt log throughout: save your requests, the assistant’s responses, your corrections and the evidence behind your conclusions.'
            ]
            item['steps'] = ['Study a concept, then complete its matching practice lab.', 'Keep changes small and review their scope.', 'Submit your own evidence and be able to explain the code.']
            item['example'] = 'An assistant saying “wall following works” is the start of verification. Read the diff, run the behavior, observe side range and state, and save the log or bag needed to support the claim.'
        else:
            item['reading'] = [
                'Complete the listed MW and WH prerequisites before using AI to change robot code. You need to understand the real command, odometry and scan topics well enough to judge the assistant’s output.',
                'Open the workshop root in the chosen assistant. Use the same workshop virtual environment and pack setup as the main labs. Put personal submissions in special/ai-coding/work/<your-name>/; tool configuration goes where the lab specifies.'
            ]
            item['steps'] = ['Confirm the simulator and robotos CLI work.', 'Check repository reading with a request that makes no edits.', 'Start prompts.md and save a clean review point before changing files.']
            item['example'] = 'Start with “List the files in labs/wh; do not change anything.” For MCP-specific labs, follow SETUP-AI.md for the interpreter and SDK check before connecting a server.'
    (ROOT/'data.js').write_text('// Generated by build.py from curated copy and workshop sources.\nwindow.LAB_SLIDES = '+json.dumps(slides,ensure_ascii=False,indent=2)+';\n')
    print('Built 30 slides: opening + setup + 14 theory/practice pairs.')


if __name__=='__main__':
    build()
