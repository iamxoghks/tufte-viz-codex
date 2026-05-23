# Data Integrity Rules

Use this file before plotting sourced data, analyst estimates, forecasts, or mixed-source financial data.

## Source Handling

- Keep the source for each series visible in the output or in a nearby note.
- Separate audited actuals, company guidance, analyst consensus, model output, and user-provided assumptions.
- If two sources disagree, do not silently merge them. Pick one source, explain the choice, or show the discrepancy.
- Keep source dates visible for estimates, targets, and market prices.
- Do not remove caveats that materially change interpretation.

## Forecasts And Estimates

- Do not invent a missing forecast series from another metric.
- If revenue estimates exist but operating income, margin, EPS, deliveries, or free cash flow estimates are missing, show only the sourced estimates and mark the missing metrics as unavailable.
- Do not connect analyst target prices as if they are future actual prices. Show targets as separate markers or bands.
- Do not style forecasts as audited actuals. Use color, line style, region boundaries, or labels to separate them.
- When estimates are model-derived by you, label them as model assumptions and include the formula or method.
- When estimates are externally sourced, label the provider and date.

## Transformations

- Label every transformation: normalization, indexing, log scale, inflation adjustment, currency conversion, per-capita denominator, trailing twelve months, calendar/fiscal year alignment.
- Do not use a normalized index when the baseline value is zero, negative, missing, or unstable. Choose absolute change, percentage point change, or small multiples instead.
- Keep rates and counts separate unless the analytical question is explicitly about their relationship.
- Use percentage points for margin/rate differences, not percent change, unless percent change is the intended claim.
- For split-adjusted prices, label the adjustment source.

## Mixed Units

- Same unit metrics may share a panel if the smaller metric remains legible.
- Different unit metrics should use aligned panels on a shared time axis.
- Avoid dual axes by default. If used, explicitly state why and ensure the visual does not imply a false relationship.
- Do not encode unrelated units only by color in one plot.

## Public Example Safety

- Mark company examples as illustrative, not investment advice.
- Attribute data sources in a concise source note.
- Avoid implying endorsement by companies or data providers.
- Keep example datasets small and purpose-bound.

## Before Finalizing

Confirm:

- Every plotted series has a source or is clearly labeled as sample data.
- Actuals, estimates, and assumptions are distinguishable.
- Missing values are represented as missing, not imputed by accident.
- Transformations are explained where a reader can see them.
- The chart title does not make a stronger claim than the data supports.
