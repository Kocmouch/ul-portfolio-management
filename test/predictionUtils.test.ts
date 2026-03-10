import { describe, it, expect } from 'bun:test';
import { calculatePercentiles, calculateProbabilityOfThreshold, predictLinear, randomNormal } from '../src/lib/predictionUtils';

describe('predictionUtils', () => {
  it('calculates percentiles correctly', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const p = calculatePercentiles(values, [10, 50, 90]);
    // index for 10% of 9 is 0.9. between index 0 (1) and 1 (2). 1 * 0.1 + 2 * 0.9 = 1.9
    // actually, p=10 on len=10 => index=0.9 => lower=0 (val 1), upper=1 (val 2), weight=0.9.
    // 1 * 0.1 + 2 * 0.9 = 1.9.
    expect(p[0]).toBeCloseTo(1.9);
    expect(p[1]).toBeCloseTo(5.5); // Median between 5 and 6
    expect(p[2]).toBeCloseTo(9.1);
  });

  it('calculates probabilities correctly', () => {
    const values = [10, 20, 30, 40, 50];
    expect(calculateProbabilityOfThreshold(values, 25)).toBe(0.6); // 3 out of 5
    expect(calculateProbabilityOfThreshold(values, 100)).toBe(0);
    expect(calculateProbabilityOfThreshold(values, 0)).toBe(1);
  });

  it('performs linear prediction correctly', () => {
    const dataPoints = [10, 20, 30, 40, 50]; // perfect line y = 10x + 10 (idx 0 to 4)
    const projections = predictLinear(dataPoints, 3);

    expect(projections.length).toBe(3);
    expect(projections[0]).toBeCloseTo(60);
    expect(projections[1]).toBeCloseTo(70);
    expect(projections[2]).toBeCloseTo(80);
  });

  it('random normal produces expected mean over many iterations', () => {
    const n = 10000;
    let sum = 0;
    for (let i = 0; i < n; i++) sum += randomNormal(0.05, 0.1);
    const avg = sum / n;
    expect(avg).toBeGreaterThan(0.04);
    expect(avg).toBeLessThan(0.06);
  });
});
