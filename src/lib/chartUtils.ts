import { parseNumberList } from './calculatorUtils';

export function computeCumulativeSeries(returnsInput: string) {
  const returns = parseNumberList(returnsInput) ?? [];
  let cum = 1;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < returns.length; i++) {
    // returns[i] is guaranteed because i < returns.length
    cum *= 1 + returns[i]!;
    points.push({ x: i + 1, y: cum });
  }
  return points;
}

export function computeGeometricAverage(returnsInput: string) {
  const returns = parseNumberList(returnsInput);
  if (!returns || returns.length === 0) return null;
  if (returns.some((r) => r <= -1)) return null;
  const product = returns.reduce((p, r) => p * (1 + r), 1);
  const geom = Math.pow(product, 1 / returns.length) - 1;
  return geom;
}

export function arithmeticAvgSeries(returnsInput: string) {
  const returns = parseNumberList(returnsInput) ?? [];
  if (returns.length === 0) return [];
  const arith = returns.reduce((a, b) => a + b, 0) / returns.length;
  return returns.map((_, i) => ({ x: i + 1, y: Math.pow(1 + arith, i + 1) }));
}

// regression: parse two lists of equal length and return scatter + fit line
export interface RegressionResult {
  scatter: { x: number; y: number }[];
  line: { x: number; y: number }[];
  slope: number;
  intercept: number;
}

export function computeRegressionSeries(xInput: string, yInput: string): RegressionResult | null {
  const xs = parseNumberList(xInput) ?? [];
  const ys = parseNumberList(yInput) ?? [];
  if (xs.length === 0 || ys.length === 0 || xs.length !== ys.length) return null;
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let denom = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i]! - meanX;
    num += dx * (ys[i]! - meanY);
    denom += dx * dx;
  }
  const slope = denom === 0 ? 0 : num / denom;
  const intercept = meanY - slope * meanX;
  const scatter = xs.map((x, i) => ({ x, y: ys[i]! }));
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const line = [
    { x: minX, y: intercept + slope * minX },
    { x: maxX, y: intercept + slope * maxX },
  ];
  return { scatter, line, slope, intercept };
}

// histogram: simple equal-width bins
export function computeHistogramSeries(valuesInput: string, bins = 10): { x: number; y: number }[] {
  const values = parseNumberList(valuesInput) ?? [];
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = max - min;
  if (width === 0) {
    // all values identical
    return [{ x: min, y: values.length }];
  }
  const binWidth = width / bins;
  const counts = Array(bins).fill(0);
  values.forEach((v) => {
    let idx = Math.floor((v - min) / binWidth);
    if (idx < 0) idx = 0;
    if (idx >= bins) idx = bins - 1;
    counts[idx]++;
  });
  return counts.map((count, i) => ({ x: min + i * binWidth + binWidth / 2, y: count }));
}
