# Tufte Viz Codex

Codex에서 정량 데이터 시각화를 설계, 비평, 구현할 때 쓰는 Tufte 스타일 스킬입니다.

목표는 장식적인 차트가 아니라 비교가 잘 보이는 분석 화면입니다. 직접 라벨, 명확한 기준선, 실제/추정 구간 분리, 작은 배수, 스파크라인 표, 모바일 검증을 기본으로 둡니다.

## 설치

이 private repo를 Codex skills 디렉터리에 clone합니다.

```bash
git clone https://github.com/iamxoghks/tufte-viz-codex.git ~/.codex/skills/tufte-viz-codex
```

스킬 진입점은 [`SKILL.md`](SKILL.md)입니다.

## 이 스킬이 다루는 기능

- 데이터 모양과 독자 질문에 맞는 차트 선택
- 같은 단위 지표의 grouped bar
- 다른 단위 지표의 분리 패널
- 실제값과 예측/추정값의 시각적 분리
- 단위가 다른 지표를 비교하는 normalized index
- 시작점과 끝점을 직접 비교하는 slopegraph
- 관계를 보는 scatterplot
- 고점/기준점 대비 하락폭을 정렬하는 dot plot
- 값과 추세를 한 줄에 넣는 sparkline table
- 넓은 메인 차트와 작은 반복 패널의 모바일 동작 분리

아래 코드 조각은 README 설명용으로 축약했습니다. 전체 실행 가능한 예제는 `examples/`의 HTML 파일에 있습니다.

## 예시 1: 삼성전자 재무/예측 화면

질문: 삼성전자의 주가, 매출, 영업이익, 영업이익률이 2023년 저점 이후 어떻게 바뀌었고, 확인 가능한 추정치는 어디까지인가?

전체 예제: [`examples/samsung-financial-forecast.html`](examples/samsung-financial-forecast.html)

![Samsung combined bars](examples/assets/samsung-combined-bars.png)

### 사용한 기능

- **같은 단위 결합**: 매출과 영업이익은 모두 조 원 단위라 한 패널에서 grouped bar로 표시.
- **다른 단위 분리**: 영업이익률은 비율이라 금액 막대와 분리.
- **추정 구간 분리**: 2026-2027 추정치는 색과 구획으로 실제값과 분리.
- **직접 라벨**: 중요한 값은 범례나 tooltip 대신 막대/점 가까이에 표시.
- **모바일 fallback**: 넓은 보고서형 차트는 좁은 화면에서 가로 스크롤 허용.

```js
const yMoney = scale([0, 820], [moneyBottom, moneyTop]);
const yMargin = scale([0, 70], [marginBottom, marginTop]);

for (const d of data) {
  const stroke = d.type === "estimate" ? "var(--forecast)" : "var(--ink)";
  drawBar({ x: x(d.year) - 18, y: yMoney(d.revenue), fill: "revenue", stroke });
  drawBar({ x: x(d.year) + 8, y: yMoney(d.operatingProfit), fill: "profit", stroke });
}

drawLine(actuals.map(d => [x(d.year), yMargin(d.margin)]));
drawForecastRegion({ from: 2026, to: 2027 });
```

## 예시 2: TSLA 전체 대시보드

질문: TSLA의 10년 주가, 매출, 영업이익, 마진, 인도량을 한 화면에서 보고, 같은 데이터로 여러 분석 질문을 어떻게 바꿔 물을 수 있는가?

전체 예제: [`examples/tsla-visualization-lab.html`](examples/tsla-visualization-lab.html)

![TSLA full dashboard](examples/assets/tsla-full-dashboard.png)

### 메인 차트에서 사용한 기능

- **주가 line chart + 목표가 marker**: 실제 종가와 평균 목표가를 분리. 목표가는 주가 예측선이 아니므로 붉은 점과 점선으로만 표시.
- **재무 grouped bar + margin panel**: 매출/영업이익은 달러 단위라 한 패널, 영업이익률은 별도 패널.
- **인도량 bar chart**: 실제 인도량만 표시해 생산/수요 사이클을 추정치와 섞지 않음.

```js
const actual = priceData.filter(d => d.type === "actual");
const target = priceData.find(d => d.type === "target");

svg.appendChild(el("path", {
  d: path(actual.map(d => [x(d.year), y(d.close)])),
  fill: "none",
  stroke: "var(--stock)"
}));

svg.appendChild(el("line", {
  x1: x(last.year),
  x2: x(target.year),
  y1: y(last.close),
  y2: y(target.close),
  stroke: "var(--forecast)",
  "stroke-dasharray": "4 5"
}));
```

## 예시 3: Visualization Lab

같은 TSLA 데이터에 스킬의 여러 시각화 패턴을 적용한 섹션입니다.

![TSLA visualization lab](examples/assets/tsla-visualization-lab.png)

### Normalized Index

단위는 다르지만 “같은 출발점에서 얼마나 커졌나”를 보고 싶을 때 씁니다.

```js
const series = [
  { name: "주가", values: actual.map(d => priceByYear.get(d.year) / priceByYear.get(2016) * 100) },
  { name: "매출", values: actual.map(d => d.revenue / actual[0].revenue * 100) },
  { name: "인도량", values: actual.map(d => d.deliveries / actual[0].deliveries * 100) }
];
```

### Slopegraph

두 시점의 변화 방향과 크기를 직접 비교할 때 씁니다. TSLA 예제에서는 각 지표를 2020=100으로 정규화했습니다.

```js
const indexed = metrics.map(m => ({
  ...m,
  start: 100,
  end: m.b / m.a * 100
}));

for (const m of indexed) {
  const stroke = m.end < 100 ? "var(--forecast)" : "var(--ink)";
  drawSlope({ x0, x1, y0: y(m.start), y1: y(m.end), stroke });
}
```

### Scatterplot

시간 순서가 아니라 관계를 볼 때 씁니다. 여기서는 인도량 확대가 영업이익률 개선으로 이어졌는지 확인합니다.

```js
const x = scale([0, 2.0], [margin.left, margin.left + innerW]);
const y = scale([-16, 20], [margin.top + innerH, margin.top]);

for (const d of financialData.filter(d => d.type === "actual")) {
  drawPoint({
    cx: x(d.deliveries),
    cy: y(d.margin),
    color: d.margin < 0 ? "var(--forecast)" : "var(--ink)"
  });
}
```

### Ranked Dot Plot

모든 값이 같은 기준점 또는 고점 대비 차이일 때 씁니다. 막대보다 “순위와 기준점으로부터 거리”가 더 바로 보입니다.

```js
const rows = [
  { name: "매출", value: last.revenue / maxRevenue - 1 },
  { name: "인도량", value: last.deliveries / maxDeliveries - 1 },
  { name: "영업이익", value: last.op / maxOperatingProfit - 1 },
  { name: "영업이익률", value: last.margin - maxMargin }
].sort((a, b) => a.value - b.value);
```

### Sparkline Table

정확한 값과 작은 추세선을 동시에 보여야 할 때 씁니다. 전체 차트보다 작지만, 비교 밀도는 높습니다.

```js
function sparkline(values, width = 150, height = 28) {
  const x = scale([0, values.length - 1], [2, width - 2]);
  const y = scale([Math.min(...values), Math.max(...values)], [height - 3, 3]);
  return path(values.map((v, i) => [x(i), y(v)]));
}
```

## 모바일 반응형에서 얻은 교훈

넓은 메인 차트와 작은 lab 패널은 같은 모바일 규칙을 쓰면 안 됩니다.

```css
.wide-chart svg {
  width: 760px;
  max-width: none;
}

.lab-panel .chart svg {
  width: 100%;
  max-width: 100%;
}
```

![TSLA mobile lab](examples/assets/tsla-visualization-lab-mobile.png)

## 참고 문서

- [`references/chart-selection.md`](references/chart-selection.md)
- [`references/analytical-design.md`](references/analytical-design.md)
- [`references/integrity-checklist.md`](references/integrity-checklist.md)
- [`references/web-implementation.md`](references/web-implementation.md)
