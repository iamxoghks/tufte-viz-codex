---
name: tufte-viz-codex
description: Design, critique, or implement quantitative visualizations using Edward Tufte-inspired analytical design. Use when the user asks for a chart, graph, dashboard, KPI table, sparkline, small multiple, data visualization, chart critique, chart refactor, or Tufte-style visualization in Codex. Handles static outputs such as SVG, HTML, reports, and slides, plus web app chart work in React, D3, Recharts, Observable Plot, canvas, or existing project chart libraries.
---

# Tufte Viz Codex

Use this skill to turn data into clear, honest, high-density visual displays and to refactor existing charts without losing the surrounding application's conventions.

This is not web-only. Treat static explanatory graphics, report charts, presentation visuals, and web dashboards as equal output modes. Web work gets extra implementation and verification steps because Codex can inspect the codebase and render the result.

## First Decision

Classify the task before designing:

1. **New static visual**: create SVG, HTML, report, slide, or notebook output.
2. **New web chart**: implement a chart inside an app or component.
3. **Existing chart critique**: review screenshot/code and propose concrete changes.
4. **Existing chart refactor**: edit code and verify the rendered result.
5. **Dashboard or analytical surface**: evaluate the whole information system, not only individual charts.

## Core Workflow

1. **Clarify the analytical job**: what comparison, change, distribution, relationship, exception, or causal claim must be visible?
2. **Inspect the local context** when working in a repo: chart libraries, design tokens, component conventions, data shape, test commands, and running app instructions.
3. **Select the visual form** from data shape and reader task, not from library defaults. Read `references/chart-selection.md` when the choice is not obvious.
4. **Apply analytical design checks**: comparison, causality, multivariate detail, words-numbers integration, evidence quality, layering, and micro/macro reading. Read `references/analytical-design.md` for dense dashboards, explanatory visuals, sparklines, or critique.
5. **Remove chartjunk and distortion**: 3D, decorative gradients, heavy grids, detached legends, rainbow sequential scales, redundant encodings, unjustified dual axes, and KPI tiles with no comparison.
6. **Check data integrity** for sourced data, forecasts, analyst targets, or mixed actual/estimate datasets. Read `references/data-integrity.md`.
7. **Implement in the user's stack**. Prefer existing project chart libraries and design primitives. For web apps, read `references/web-implementation.md`.
8. **Verify before finalizing**. For code changes, run the relevant build/test/lint command when available. For visual web changes, use a browser screenshot or equivalent render check when feasible.
9. **Report tradeoffs plainly**: say what changed, what was verified, and any remaining uncertainty about data semantics or design intent.

## Output Mode Guidance

- **Static SVG/HTML/report**: optimize for immediate reading. Direct labels, compact tables, sparklines, small multiples, and source notes usually beat interactive affordances.
- **Web dashboard/app**: optimize for repeated use. Interaction is allowed when it reveals data, supports filtering, preserves context, or handles density. Tooltips must not carry the only critical value.
- **Presentation**: optimize for one argument per slide. Use annotation and contrast; avoid dashboards squeezed into slides.
- **Exploratory notebook**: keep plots reproducible and data transformations visible.

## Tufte Defaults

- Put data first; make decoration earn its place.
- Show comparisons explicitly. A number without a baseline, prior value, target, cohort, or peer is usually incomplete.
- Use position and length before area, volume, angle, or color.
- Prefer direct labels over remote legends.
- Prefer small multiples over crowded multi-series charts.
- Use color as evidence, grouping, or focus, not ambience.
- Preserve graphical integrity: proportional encodings, honest baselines, consistent intervals, clear scales, and documented sources.
- Do not over-minimize. Useful annotations, source notes, uncertainty bands, and reference lines can be data-ink.

## Reference Files

- `references/chart-selection.md`: choose a chart from data shape and reader task.
- `references/analytical-design.md`: critique and improve analytical depth, causality, layering, micro/macro, sparklines, and evidence.
- `references/data-integrity.md`: handle sources, estimates, transformations, missing forecast series, and public example caveats.
- `references/integrity-checklist.md`: final checks for honesty, labels, accessibility, density, and output-specific quality.
- `references/web-implementation.md`: Codex workflow for app integration, responsive behavior, interaction, and browser verification.
