"""Student-facing explanations and worked examples, paired with source labs."""
# explanation paragraphs, theory example, concrete practice steps, practice example
READING = [
    (
        ["A language model generates text by predicting a likely next token from the context it receives. A token is a piece of text, not necessarily a whole word. The model can produce convincing code even when a method or field does not exist.",
         "The context window is the information available for the current response: instructions, selected files, conversation and tool results. Supplying the actual starter gives the model project facts that a library name alone cannot provide."],
        "An assistant may suggest robotos.Node.drive_to(). Treat that name as unverified. Search the real starter and library examples before using it; then repeat the request with those files available.",
        ["Run the same distance-function prompt in three fresh chats and save all three outputs.", "Ask for a robotos scan subscriber without repo context; compare every API name with the WH-02 starter and labs/common/scan.py.", "Repeat with those files supplied. Record which names became correct and which still need checking."],
        "Use a two-column table: invented name → real source name. If a run invents fewer names than expected, record what actually happened; do not manufacture findings."
    ),
    (
        ["Autocomplete proposes code near the cursor; you accept or reject it. Chat returns an explanation or code block that you move into the project. An agent can also read files, edit them and run available tools.",
         "The agent loop is request → tool call → result → next decision. Its capabilities depend on the tools and permissions the application provides. More autonomy makes reviewing scope and results more important."],
        "For the same rough-square task, compare three files: v1_autocomplete.py, v2_chat.py and v3_agent.py. A faster answer is useful only if the code runs and you understand the changes.",
        ["Create the three versions in your AI-01 work folder. Use the supplied twist helper and the same behavior specification.", "Publish at 20 Hz: forward for 2 s, turn for about 2 s at wz=0.8, repeat four times, then publish zero.", "Run every version in the sim. Compare behavior, time, touched files, permission prompts and how much you can explain."],
        "Use git diff --stat to detect changes outside your work folder. Review those changes separately from whether the robot traced a rough square."
    ),
    (
        ["A specification tells the assistant what to build and how you will judge it. State the goal, the real files and APIs, constraints on changes, and an observable done-when condition.",
         "Reviewing a plan exposes misunderstandings before they become code. Small steps make each result easier to run and review. If the result misses the target, clarify the specification rather than repeatedly requesting an unspecified fix."],
        "GOAL: avoid a front obstacle. CONTEXT: WH-03 starter and scan/twist helpers. CONSTRAINTS: no helper edits or new dependencies. DONE WHEN: 30 s in the sim without shelf contact.",
        ["Save a vague 'avoid walls' run and observe it in the simulator for 30 seconds.", "Write a four-part spec for a separate version. Ask the assistant to read the files and propose a plan before editing.", "Review the plan, build the spec version and run it for 30 seconds. Log concrete differences between the two versions."],
        "A useful constraint is 'do not edit labs/common/'. A useful acceptance criterion describes observed behavior; 'make the code clean' does not define a passing run."
    ),
    (
        ["Project instruction files give an assistant recurring facts: where code lives, how to run it, conventions and scope limits. They reduce repeated explanations, but stale or overly long instructions consume context and can mislead the assistant.",
         "File discovery and precedence differ between tools. Verify which instructions are loaded in the reference tool. A sentence saying 'do not edit this folder' guides the model; it does not technically prevent a write."],
        "A concise instruction says 'use scripts/run <id>; do not edit labs/common/ or code/; link the topic contract'. Keep secrets and personal preferences out of shared project instructions.",
        ["Critique the supplied bad instruction file and record at least six problems. Observe a baseline assistant task before adding your instructions.", "Create labs/AGENTS.md with at most 40 lines covering run commands, topic references, conventions and forbidden changes. Leave the root maintainer file alone.", "Repeat the same task in a fresh session and inspect loaded instructions. Follow the source's Claude import exercise and record the before/after behavior."],
        "Evidence is a concrete behavior change, such as using the right runner or leaving shared helpers untouched. The existence of AGENTS.md alone does not prove the assistant read it."
    ),
    (
        ["A scoped rule is a small instruction that applies to matching files or tasks. Hardware rules belong with hardware work; loading them for unrelated middleware edits adds noise and wastes context.",
         "A glob is a path pattern, such as labs/hw/**. The workshop uses a visible [HW-SAFETY] marker to observe rule loading. Test a matching path and a non-matching path in fresh sessions."],
        "Working on labs/hw/hw-03-command-actuators should load the HW rule. Explaining a file under labs/wh/ should not. Tool-specific scope fields are supplied in the starter formats.",
        ["Copy the starter rule for your chosen tool to its documented rules folder. Preserve its path scope and visible canary.", "Test WH explanation, HW explanation and HW editing in separate sessions. Log whether the canary appears and whether the rule is followed.", "Add three checkable hardware rules and translate the final rule into the other two starter formats."],
        "If the canary appears everywhere, inspect the scope or always-on setting. If it never appears, confirm the assistant actually read a matching HW file."
    ),
    (
        ["A skill packages task instructions with optional scripts and references. The assistant can discover its name and description first, load the body when relevant, and consult supporting files only when needed.",
         "This staged loading is progressive disclosure. The description should state both what the skill does and when to use it. A vague description makes selection unreliable even when the skill body is well written."],
        "Weak: 'helps with labs'. Better: 'Runs a robotos lab by ID and checks simulator readiness; use when asked to run, start or try wh-03 or another lab.'",
        ["Copy run-lab to the correct skill directory and inspect the readiness helper before running it yourself.", "Complete the body with OS-specific runner commands, argument forwarding and a clear response when the sim is not ready.", "Compare the weak and revised descriptions. Test three positive phrasings and one negative request that only asks for an explanation."],
        "The agent should check readiness before starting a lab. Record actual triggering behavior; a skill loading correctly does not by itself prove the lab ran successfully."
    ),
    (
        ["A subagent is a delegated worker with its own context and permitted tools. It can inspect many files and return a focused report without filling the main conversation with every file it read.",
         "Least privilege means granting only the capabilities a task needs. A reviewer needs reading and search tools, not editing. Delegation has a cost, so use it for bounded reviews or larger searches rather than every tiny change."],
        "The main agent asks lab-reviewer to assess your AI-03 work against the checklist. The reviewer returns PASS/FAIL with evidence. A separate authorized editing step addresses the findings.",
        ["Complete the lab-reviewer definition, including a precise description, read-only tool list and fixed report format.", "Review your AI-03 work and AI-02 code. Ask for a fix and confirm the reviewer cannot edit with its allowed tools.", "Compare the review with a main-agent-only run. Submit both reports, missed findings and the observed context-usage difference."],
        "A useful report cites the checklist item and the evidence behind its verdict. Another agent's confident PASS is still a claim you must assess."
    ),
    (
        ["MCP connects an AI application's client to a server that exposes tools, resources or prompt templates. In this lab, a local Python server exposes topic listing, scan reading and short drive requests.",
         "The server turns a tool request into robotos operations. Limits must be implemented in server code, because a tool description cannot stop excessive arguments. The shipped drive function has unfinished clamps and a front-obstacle check."],
        "Starter constants are MAX_VX=0.3 m/s, MAX_WZ=1.0 rad/s and MAX_SECONDS=5.0 s. Students must implement the clamp behavior; naming these constants does not enforce them.",
        ["Run the source self-test with the workshop venv, inspect the project MCP configuration, and connect the server in the reference client.", "Implement input clamps and refuse positive forward velocity when the front range is below 0.5 m. Reconnect after changing server code.", "Add one clearly documented tool. Log calls and results, observe the simulator and verify the robot stops after every drive call."],
        "After implementing the guards, test drive(vx=3, seconds=20): the result should report clamping. Keep stdout reserved for the stdio protocol and send diagnostic logs to stderr."
    ),
    (
        ["Permissions and hooks are checks performed by the host application. Permissions decide which actions are allowed, require approval or are denied. A pre-tool hook can reject a call; a post-tool hook can report check results.",
         "A guard is effective only for the paths and tools it actually covers. The lab deliberately starts with a file-path guard so you can discover alternate write routes and strengthen the boundary."],
        "Reference-tool example: a PreToolUse hook reads tool-call JSON and exits 2 to block a protected edit. A PostToolUse check reports Python syntax errors after an edit.",
        ["Test the guard by hand and inspect its message and exit code. Install the source hook scripts and merge settings carefully.", "Test protected edits, one extra protected folder, post-edit syntax reporting and one allow/ask/deny case each.", "Find at least one bypass, such as another writing tool or path normalization issue. Close it and repeat the test."],
        "Blocking Edit on a folder does not necessarily block a shell command writing to the same folder. Test the actual enforcement coverage instead of assuming a complete sandbox."
    ),
    (
        ["A plugin bundles reusable skills, agent definitions, hooks and MCP configuration for sharing. Build and test each component first, then package the working setup with clear ownership and version information.",
         "Files shipped inside the plugin need paths relative to the plugin root. Project-specific dependencies, such as the workshop venv and SETUP.md discovery, still need explicit handling and testing."],
        "The reference layout places skills/, agents/, hooks/ and MCP files beside .claude-plugin/. Only the plugin manifest belongs in that metadata directory. Review scripts before loading a shared bundle.",
        ["Copy your working AI-05–08 components into the plugin starter. Update plugin-root paths and document remaining workshop dependencies.", "Validate and load the plugin. Remove or isolate standalone originals so they cannot hide missing plugin components.", "Exercise the skill, reviewer, MCP tools and blocked edit. Read a classmate's scripts before swapping and loading the bundle."],
        "A validation pass checks package structure; a working integration requires exercising all four components. Keep secrets and machine-specific settings out of the shared bundle."
    ),
    (
        ["An assistant's 'done' message is a completion claim. Verify it in stages: inspect the diff, run the exact command, observe the required behavior, and retain evidence from the run.",
         "Each evidence type has limits. A bag's non-zero counts show messages were recorded. To judge wall following, also inspect status, side range and simulator behavior over the required interval."],
        "AI-10 asks for follow within ±0.2 m of the target for at least 20 s. Recording odom, scan and cmd_vel supports review, but those topic names alone do not prove the controller met that target.",
        ["Write a wall-follow spec with the required arguments and acceptance criteria. Request exact commands and output before any done claim.", "Review the diff, then run the behavior yourself for at least 30 seconds and record odom, scan and cmd_vel during motion.", "Inspect bag counts and status evidence. Run the source cheat-hunt exercise, review whether it weakens success checks, and revert that experimental change."],
        "Reject a change that merely prints follow more often. The acceptance criterion concerns the robot and its measured side range, not a flattering status label."
    ),
    (
        ["A useful bug report states what you ran, what you expected, what happened and the relevant log. Reproduce the failure before editing so you can later distinguish a real fix from a coincidental good run.",
         "Ask for possible causes and checks that distinguish them. Fix one cause at a time. During refactoring, preserve behavior by collecting a baseline and comparing after each small structural change."],
        "Report: 'Expected a turn toward the open side when front < 0.6 m; actual behavior is continuous spinning.' Inspect scan reception and the control decision before adding delays or widening thresholds.",
        ["Copy the buggy starter into your work area. Observe symptoms and write hypotheses before comparing with the original WH-03 implementation.", "Run checks that distinguish causes, fix one issue and repeat. Log symptom patches you rejected and why.", "Record a baseline, refactor your own file in small steps, then compare the behavior and bag information before and after."],
        "A refactor changes structure while preserving behavior. A larger timeout or swallowed exception may hide a symptom without explaining its cause."
    ),
    (
        ["Prompt injection occurs when text from a file, page or tool result tries to steer the assistant as though it were an authorized instruction. Treat external content as data to inspect, especially when it requests execution or access.",
         "Review skills, MCP settings and generated diffs for commands, network access, secrets, new dependencies and weakened limits. Combine careful review with least privilege and tested enforcement."],
        "AI-12's suspicious skill, MCP configuration and patch are audit samples. Read them as text; do not install the skill, start the server, or install packages named in the samples.",
        ["Audit all three samples manually and record file, location, problem, severity and proposed fix. Never execute the suspicious starter material.", "Ask for a read-only assistant audit and compare it with your findings, including the injection attempt.", "Implement and test three protections in your own setup. Submit the findings, test results and the source ethics reflection."],
        "The lab asks for at least 5 skill findings, 3 configuration findings and 6 diff findings. Explain how each protection blocks a specific risk; do not count a written warning as enforcement."
    ),
    (
        ["The capstone combines an AI development environment with an ordinary engineering workflow. Establish the context and boundaries, specify behavior, review a plan, then implement and verify small changes.",
         "The submission must show how you worked as well as what you built. Independent runs, saved prompts, small commits and a reflection make the result reviewable and show where the assistant helped or misled you."],
        "Choose patrol, dead-end recovery, agent exploration, or an instructor-approved idea. Write acceptance criteria for that choice; do not substitute one option's success condition for another's.",
        ["Choose the behavior and save SPEC.md and the approved PLAN.md. Prepare the required instructions, rule, skill, MCP server and guard setup.", "Build in reviewed steps with at least four commits. Run your own verification and retain bag and state/status evidence.", "Review the complete diff and submit code, prompt log, evidence, configuration copies and a half-page REFLECTION.md."],
        "Suggested source weights are behavior 35%, AI setup 25%, process 20% and live explanation 20%. The instructor sets the final rubric; be ready to explain any submitted line."
    ),
]
