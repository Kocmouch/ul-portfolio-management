/**
 * Generates a normally distributed random number using the Box-Muller transform.
 */
export function randomNormal(mean: number, stdDev: number): number {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * stdDev + mean;
}

/**
 * Runs a Monte Carlo simulation for a specific number of periods.
 * Returns an array of simulated final values or paths.
 */
export function runMonteCarlo(
  startValue: number,
  expectedReturn: number, // annualized decimal (e.g. 0.08)
  volatility: number, // annualized decimal (e.g. 0.15)
  periods: number, // years
  numSimulations: number,
): number[][] {
  const simulations: number[][] = [];

  for (let i = 0; i < numSimulations; i++) {
    const path: number[] = [startValue];
    let currentValue = startValue;

    for (let p = 0; p < periods; p++) {
      const stepReturn = randomNormal(expectedReturn, volatility);
      currentValue = currentValue * (1 + stepReturn);
      path.push(currentValue);
    }
    simulations.push(path);
  }

  return simulations;
}

/**
 * Calculates percentiles across an array of numbers.
 * @param values Array of numbers (e.g., final portfolio values)
 * @param percentiles Array of percentiles to calculate (0 to 100)
 */
export function calculatePercentiles(values: number[], percentiles: number[]): number[] {
  if (values.length === 0) return percentiles.map(() => 0);

  const sorted = [...values].sort((a, b) => a - b);
  return percentiles.map((p) => {
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;

    if (upper >= sorted.length) return sorted[sorted.length - 1] ?? 0;
    const lowerVal = sorted[lower] ?? 0;
    const upperVal = sorted[upper] ?? 0;
    return lowerVal * (1 - weight) + upperVal * weight;
  });
}

/**
 * Calculates the probability of exceeding a specific threshold.
 */
export function calculateProbabilityOfThreshold(values: number[], threshold: number): number {
  if (values.length === 0) return 0;
  const count = values.filter((v) => v >= threshold).length;
  return count / values.length;
}

/**
 * Simple Linear Regression ML stub matching y = mx + b
 * Fits a line to the dataPoints.
 * @param dataPoints Array of numbers representing historical values
 * @param periodsForward How many periods to project
 * @returns Projected values extending from the end of dataPoints
 */
export function predictLinear(dataPoints: number[], periodsForward: number): number[] {
  if (dataPoints.length < 2) return Array(periodsForward).fill(dataPoints[0] || 0);

  const n = dataPoints.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  for (let i = 0; i < n; i++) {
    const x = i;
    const y = dataPoints[i] ?? 0;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const projections: number[] = [];
  const startIdx = n;
  for (let i = 0; i < periodsForward; i++) {
    const predictedY = slope * (startIdx + i) + intercept;
    projections.push(Math.max(0, predictedY)); // Prevent negative values generally for portfolio logic
  }

  return projections;
}
