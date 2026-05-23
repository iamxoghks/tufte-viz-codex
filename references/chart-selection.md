# Chart Selection

Choose the display from the data shape and the reader's job. Do not choose by what the library makes easiest.

## Reader Jobs

| Job | Reader needs to |
|---|---|
| Compare | rank, pick a leader, find a laggard, see a gap |
| Track | follow change over time |
| Relate | see whether variables move together |
| Distribute | understand spread, typical value, tails, outliers |
| Locate | find where a value occurs in space or system structure |
| Explain | see mechanism, cause, sequence, or dependency |
| Monitor | notice current status against history, target, and peers |

## Default Choices

| Data shape | Best default | Avoid by default |
|---|---|---|
| Single number with prior/target | Number plus context, sparkline, or compact row | Giant KPI card with no comparator |
| One measure across categories | Sorted dot plot or horizontal bar | Pie, donut, unsorted vertical bars |
| Time series, one measure | Line chart, sparkline, or indexed line | Bars for continuous time, decorative area fill |
| Time series, many groups | Small multiples on shared scales | Many overlapping lines with a distant legend |
| Time series, same unit, different measures | Grouped bars or grouped dots in one panel, plus direct labels | Separate panels that hide useful same-unit comparison |
| Time series, different units | Small multiples on the same time axis | Dual-axis overlay unless explicitly justified |
| Before/after for many items | Slopegraph or paired dot plot | Clustered bars when change is the point |
| Two numeric variables | Scatterplot with direct labels or annotations | Bubble chart unless size is essential and readable |
| Distribution | Histogram, strip plot, beeswarm, or compact quantile display | Violin/box plot for non-technical audiences without explanation |
| Part-to-whole, small n | Sorted bar, dot plot, or small table | Pie/donut unless explicitly required |
| Part-to-whole, large n | Sorted bar with long-tail grouping | Treemap/sunburst for simple shares |
| Funnel or stages | Stage table, horizontal bars, or step chart | 3D funnel, decorative tapered funnel |
| Cohorts | Cohort table with sequential shading and printed values | Rainbow heatmap without values |
| Geographic comparison | Single-hue choropleth with normalization notes | Raw-count bubble map, rainbow choropleth |
| Multivariate comparison | Small multiples, table with sparklines, or layered annotated view | Radar chart for general audiences |
| Process plus data | Annotated sequence, small multiples through time, or process/data pairing | Pure flowchart with no measured evidence |

## Decision Tree

Use this order before choosing a chart:

1. **What is the reader trying to do?**
   - Compare: rank or see gaps.
   - Track: see change over time.
   - Relate: test whether variables move together.
   - Distribute: see spread, tails, or typical values.
   - Explain: show sequence, mechanism, or causal evidence.
   - Monitor: judge current status against history, target, or peers.
2. **Are the measures in the same unit?**
   - Same unit: grouped bars, grouped dots, paired dots, or one shared-scale panel.
   - Same unit but scale gap: small multiples if the smaller metric becomes unreadable.
   - Different unit or rate: aligned panels on a shared axis.
3. **Is time the organizing dimension?**
   - One measure over time: line chart or sparkline.
   - Many groups over time: small multiples or directly labeled lines.
   - Before/after: slopegraph or paired dot plot.
4. **Is uncertainty or forecast present?**
   - Separate actuals from estimates with boundary, color, dash, or annotation.
   - Use bands only when uncertainty ranges are sourced.
   - Use separate target markers for analyst targets.
5. **Do exact values matter as much as shape?**
   - Use a table with sparklines or compact bars.
   - Keep units and source notes close to the table.
6. **Would a simpler sentence answer the question?**
   - If yes, use a sentence plus a compact number/sparkline instead of a full chart.

## Sorting Rules

- Sort categorical comparisons by the value the reader cares about.
- Preserve natural order for time, stages, severity, and ordered cohorts.
- Use alphabetical order only for lookup tables and indexes.
- If sorting hides a meaningful grouping, group first and sort within groups.

## Use A Table When

- Exact values matter more than visual shape.
- The row count is small enough to scan.
- Readers will compare across several columns.
- Sparklines or compact bars can add trend without turning the table into a dashboard.

## Gut Checks

- What is the comparison denominator?
- What would the reader do after seeing this?
- Can a sentence answer the question more clearly than a chart?
- Is an extra visual channel adding information or only activity?
- Would small multiples make the comparison easier than one crowded chart?
- Am I mixing units or scales? If yes, split into aligned panels before reaching for a second axis.
- Are measures in the same unit? If yes, consider grouping them in one panel and separating only rates or percentages.

## Multiple Time-Series Measures

Use this decision order:

1. **Same unit**: default to one aligned panel with grouped marks, direct labels, and a shared axis.
2. **Same unit but large scale gap**: offer or choose small multiples when the smaller measure becomes unreadable or when each metric's individual trend matters more than same-unit comparison.
3. **Different units or rates**: split into aligned panels on the same time axis.
4. **Dual axis**: use only when the user explicitly needs it or when there is a defensible analytical reason that survives a label/readability check.

## Forecast-Aware Choices

- Actual history plus analyst target: line chart for actual history, target as a separate point or band.
- Actual history plus estimate values for the same metric: continue the time axis but change color/line style and add an actual/estimate boundary.
- Actual values for several metrics but estimates for only one: plot estimates only for the sourced metric and leave other estimate fields blank or labeled unavailable.
- Model forecast made by the agent: show it as a scenario and document the formula, not as external consensus.
