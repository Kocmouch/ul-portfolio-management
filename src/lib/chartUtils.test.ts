import { describe, test, expect } from 'bun:test';

import {
  computeSeriesFromList,
  computeXYSeries,
  computeHistogramSeries,
  computeCumulativeSeries,
} from './chartUtils';

// helper to ease points comparison
function pts(arr: number[]) {
  return arr.map((v, i) => ({ x: i + 1, y: v }));
}

describe('chartUtils helpers', () => {
  test('computeSeriesFromList handles simple and empty input', () => {
    expect(computeSeriesFromList('1 2 3')).toEqual(pts([1, 2, 3]));
    expect(computeSeriesFromList('')).toEqual([]);
    expect(computeSeriesFromList('  ')).toEqual([]);
    expect(computeSeriesFromList('5')).toEqual([{ x: 1, y: 5 }]);
  });

  test('computeXYSeries zips pairs and rejects invalid cases', () => {
    expect(computeXYSeries('1 2 3', '4 5 6')).toEqual([
      { x: 1, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 6 },
    ]);

    // unequal lengths
    expect(computeXYSeries('1 2', '1 2 3')).toBeNull();
    expect(computeXYSeries('', '1 2')).toBeNull();
    expect(computeXYSeries('1 a', '2 3')).toBeNull();
  });

  test('histogram still behaves correctly on degenerate data', () => {
    const flat = computeHistogramSeries('5 5 5', 4);
    expect(flat).toEqual([{ x: 5, y: 3 }]);
  });

  test('cumulative series returns an increasing product', () => {
    const cum = computeCumulativeSeries('0.1 0.2 0');
    expect(cum.map((p) => p.y)).toEqual([
      1.1,
      1.1 * 1.2,
      1.1 * 1.2 * 1,
    ]);
  });
});
