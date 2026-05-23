# Codex Handoff: Tufte Viz Codex

Date: 2026-05-24

## State

- Created a new Codex skill package at `/Users/iamxoghks/Documents/GitHub/tufte-viz-codex`.
- The repo root is the skill root, so `SKILL.md` is at top level for direct cloning into a Codex skills directory.
- The skill treats static charts and web app charts as equal targets. Web work has additional repo-inspection, interaction, responsive, and browser-verification guidance.
- Source direction: use `aref-vc/tufte-claude-skill` as the practical package/preset reference and the `aparente` gist as an analytical-design reference, but write original Codex-oriented instructions.

## Files

- `SKILL.md`: main trigger metadata and routing workflow.
- `references/chart-selection.md`: data shape and reader job to chart form.
- `references/analytical-design.md`: comparison, causality, provenance, layering, micro/macro, sparklines.
- `references/integrity-checklist.md`: final checks for honesty, readability, static output, and web output.
- `references/web-implementation.md`: Codex workflow for integrating charts in web apps.
- `agents/openai.yaml`: UI metadata for Codex skill listing.

## Validation

- Ran the skill creator `quick_validate.py` script in a temporary venv with `PyYAML`.
- Result: `Skill is valid!`

## Next

- Push this repo as a private GitHub repo named `iamxoghks/tufte-viz-codex`.
- Install by cloning or copying this repo to `~/.codex/skills/tufte-viz-codex`.
