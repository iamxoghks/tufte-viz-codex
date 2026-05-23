# Web Implementation

Use this file when implementing or refactoring charts inside a web app.

## Inspect First

Before adding a chart library or pattern, inspect:

- `package.json` for existing chart, visualization, UI, and styling libraries.
- Existing chart components, dashboard pages, table components, and design tokens.
- Data-fetching conventions and type definitions.
- App layout constraints, breakpoints, dark mode, and theme variables.
- Existing test, lint, build, and dev-server scripts.

Prefer the project's existing stack. Add a new visualization library only when the current stack cannot express the needed form without fragile code.

## Library Guidance

- **SVG or custom React SVG**: best for precise Tufte-style dot plots, slopegraphs, sparklines, annotations, and compact tables.
- **D3 scales inside React**: useful for layout math while leaving rendering to React.
- **Recharts**: acceptable for standard line, area, bar, and scatter charts when heavily styled and direct labels are possible.
- **Observable Plot or Vega-Lite**: useful for declarative analytical charts, notebooks, and data-heavy prototypes.
- **Canvas/WebGL**: use for very large point counts or high-frequency rendering, but add SVG/HTML labels or accessible summaries where needed.

## Interaction Rules

Interaction is not chartjunk when it supports repeated analytical work.

Good interactions:

- Filter, brush, zoom, sort, search, compare, pin, annotate, or reveal dense detail.
- Keep the user's context stable while adding detail.
- Make state visible in URL, controls, or labels when the app pattern supports it.

Weak interactions:

- Tooltip-only values for important numbers.
- Animation that hides scale or delays reading.
- Hover effects that create layout shift.
- Decorative transitions with no analytical value.

## Responsive Rules

- Give charts stable dimensions through container constraints, aspect ratios, or explicit min/max sizes.
- Design mobile states intentionally: table fallback, horizontal scroll, small multiples, reduced tick density, or compact sparklines.
- Do not apply one global mobile width rule to every SVG. Wide overview charts may need horizontal scroll, but small multiples, lab panels, sparklines, slopegraphs, and dot plots should usually fit their own container width.
- When a page mixes wide primary charts and compact repeated charts, give them separate classes or components so mobile overflow behavior can differ.
- Check long labels and maximum numeric values.
- Avoid scaling font size with viewport width.
- Keep legends, controls, and source notes from overlapping the plot.

## Implementation Steps

1. Locate the existing surface and data source.
2. Define the analytical job in a short comment or local variable naming where helpful.
3. Transform data explicitly: sorting, grouping, normalization, missing values, domains.
4. Render direct labels and source/context notes near the chart.
5. Use theme tokens and existing UI primitives.
6. Add states required by the app: loading, empty, error, dense, small viewport.
7. Run build/test/lint if available.
8. Start or reuse the dev server and verify visually when feasible.

## Browser Verification

For meaningful frontend chart changes, verify at least one desktop viewport and one narrow viewport when feasible.

Look for:

- Nonblank chart area.
- Correct data ordering and scale direction.
- No text overlap or clipped labels.
- Tooltip/focus behavior if interaction exists.
- Responsive behavior at narrow widths.
- In repeated panels, each chart's rendered width should be no wider than its panel unless intentional horizontal scroll is part of the design.
- No console errors.

If using canvas or WebGL, include a basic pixel/nonblank check when practical.
