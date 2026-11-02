# Concept coverage checklist

Use this as the “did we cover everything?” list. Scheduling is irrelevant here.

| Concept | Theory | Practice | Status |
|---------|--------|----------|--------|
| Why ROS-style / architecture | `theory/01`, `theory/13` | MW-00 | covered |
| Graph / nodes / topics | `theory/01` | MW-00, MW-01, WH-00 | covered |
| Messages / schema | `theory/07` | MW-01 | covered |
| Publish / subscribe | `01`, `07` | **MW-01**, WH-01–02 | covered |
| Services | `theory/08` | **MW-02** | covered |
| Actions | `theory/09` | **MW-03** | covered |
| Parameters | `theory/10` | **MW-04** | covered |
| Lifecycle | `theory/10` | **MW-04** (CLI) | covered (light practice) |
| Observe / debug | `theory/11` | MW CLI studio | covered |
| QoS / determinism | `theory/11` | CLI flags + discussion | covered (theory-heavy) |
| TF / frames | `theory/12` | Concept + WH odom frames | covered (no dedicated TF binary lab) |
| Record / replay | `theory/06` | **MW-05**, WH-07 | covered |
| Digital twin | `theory/13` | **MW-06**, WH sim | covered |
| Twist / teleop ownership | `theory/02` | **WH-01** | covered |
| Odom + scan sensing | `theory/03` | **WH-02** | covered |
| Feedback control | `theory/04` | **WH-03** | covered |
| Open-loop limits | `theory/04` | **WH-04** | covered |
| Wall follow | `theory/05` | **WH-05** | covered |
| State machines | `theory/05` | **WH-06** | covered |
| Capstone integration | WH-08 README | **WH-08** | covered |
| Arm / car / drone APIs | demo talk | Manual only | demo, not graded |
| Board bring-up / presence | `theory/14` | **HW-00** | covered |
| Caps discovery | `14` | **HW-01** | covered |
| Read board sensors | `14` | **HW-02** | covered |
| Command board actuators | `14` | **HW-03** | covered |
| Board params | `10` | **HW-04** | covered |
| Input events | `14` | **HW-05** | covered |
| Record board topics | `06` | **HW-06** | covered |
| Sense→actuate on board | `04` | **HW-07** | covered |

## Gaps (intentional)

| Item | Note |
|------|------|
| Full TF tree lab | Theory only until you add a dedicated TF traffic lab |
| Deep QoS experiments | Theory + CLI presets; not a multi-QoS bake-off lab |
| Student firmware build/flash | Prebuilt images + instructor flash; IDF build is a different course |
