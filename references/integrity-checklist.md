# Integrity Checklist

Run this before considering a visualization done.

## Data Honesty

- Values are proportional to visual marks.
- Bar charts and filled areas use honest baselines.
- Time intervals are consistent or explicitly marked.
- Rates, percentages, and raw counts are not mixed without explanation.
- Different units are separated into aligned panels unless a dual-axis display is explicitly justified and labeled.
- Same-unit measures can share one axis, but their marks must be distinguishable by position, width, weight, or direct labels rather than decorative color alone.
- When same-unit measures share a panel, check whether the smaller measure is still legible; if not, switch to small multiples or explicitly offer that option.
- Denominators are visible where they change the interpretation.
- Area, angle, volume, and color are not used where position or length would be clearer.
- Forecasts, estimates, missing values, and uncertainty are visually distinct.
- Forecasts or analyst estimates are not styled as a continuation of audited actuals unless that continuity is the intended claim.
- Do not invent missing forecast series from adjacent metrics. If revenue estimates exist but operating income or margin estimates do not, show only revenue estimates and mark the missing fields as unavailable.

## Analytical Completeness

- The main comparison is visible without reading a paragraph.
- Current values have prior, target, peer, cohort, or range context.
- Sorting matches the analytical question.
- Important outliers or threshold breaches are annotated.
- Source, time range, unit, and transformation notes are present when needed.

## Ink And Readability

- No decorative 3D, bevels, shadows, glossy gradients, or ornamental icons.
- Gridlines, frames, and ticks are reduced to the minimum needed for reading.
- Legends are removed when direct labels are feasible.
- Labels fit without overlap at target sizes.
- Color is accessible and meaningful; sequential data does not use a rainbow palette.
- Text hierarchy fits the surface: compact in dashboards, larger only for presentation or hero-style explanatory views.

## Static Output Checks

- The chart remains understandable without hover.
- Values and labels are readable in the intended export size.
- Source and caveats survive screenshot, PDF, or slide export.
- The visual still works in grayscale unless color is the subject.

## Web Output Checks

- Critical values are not available only in tooltips.
- Hover/focus states add detail without changing the story.
- The chart handles empty, loading, error, small-data, and dense-data states if the surrounding app expects them.
- The chart has stable responsive dimensions and no label overlap at common mobile and desktop widths.
- Keyboard and screen-reader affordances are considered for interactive charts.
- Render verification was performed when feasible.

## Final Response

Mention:

- The chart form chosen and why.
- The main integrity/analysis safeguard applied.
- Commands or browser checks run.
- Any data assumptions that still need confirmation.
