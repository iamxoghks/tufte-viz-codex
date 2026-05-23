# Analytical Design

Use this file when creating or reviewing dense dashboards, explanatory graphics, sparklines, small multiples, causal arguments, or any visual that must support a decision.

## Six Questions

1. **Compared to what?** Every analytical display should expose contrasts, baselines, alternatives, or prior states.
2. **What mechanism is claimed?** If the chart implies cause, intervention, risk, or process, show the proposed mechanism or sequence near the evidence.
3. **What variables are missing?** Real problems are multivariate. Avoid reducing a decision to one number when segment, time, cohort, uncertainty, or denominator changes the story.
4. **Are words, numbers, and graphics integrated?** Put labels, values, units, thresholds, and caveats next to the data they describe.
5. **Can the evidence be evaluated?** Include source, time period, measurement definition, normalization, sample size, and known caveats when they affect trust.
6. **Is the content strong enough?** Design cannot rescue weak, irrelevant, cherry-picked, or undocumented evidence.

## Layering

Layer by importance, not by decoration.

- Primary data should remain visible when squinting.
- Labels and annotations should sit close to their evidence.
- Axes, gridlines, reference bands, and separators should recede.
- Use color, weight, opacity, and spacing to separate layers before adding boxes.
- Avoid visual collisions where adjacent heavy elements create unintended emphasis.

## Micro And Macro

Good analytical displays work at more than one distance.

- Macro: overall trend, ranking, cluster, anomaly, or system state.
- Micro: individual values, labels, exceptions, sources, and uncertainty.

For dashboards, the macro layer often comes from layout and sorting; the micro layer comes from rows, sparklines, direct values, and concise annotations.

## Sparklines

Use sparklines when trend shape matters but a full chart would dominate.

- Best inside tables, metric rows, prose, or compact monitoring surfaces.
- Pair with current value and delta when possible.
- Mark only the meaningful point: current, min/max, threshold breach, or anomaly.
- Do not use sparklines when exact intermediate readings are required.

## Causality And Sequence

When a display is meant to explain why something happened:

- Show intervention and response in the same visual system.
- Align time axes across cause and effect views.
- Annotate the mechanism directly on the data when possible.
- Consider pairing a measured chart with a compact process diagram.
- Distinguish observed correlation from claimed causation.

## Evidence And Provenance

Add source notes when data is external, transformed, sampled, normalized, or decision-critical.

Useful provenance includes:

- Source system or dataset.
- Time range and refresh time.
- Unit and denominator.
- Filter or cohort definition.
- Sample size or missing-data caveat.
- Whether values are estimated, forecast, audited, or user-entered.

## Critique Format

For chart critique, lead with the highest-risk issue:

1. Integrity problems: distorted scale, wrong denominator, misleading baseline, missing uncertainty.
2. Analytical gaps: no comparison, no source, hidden causality, over-reduction.
3. Reading friction: legend distance, poor sorting, crowded labels, inaccessible colors.
4. Ink cleanup: frames, shadows, gradients, redundant marks, excessive ticks.

When editing code, turn each critique into a concrete implementation change.
