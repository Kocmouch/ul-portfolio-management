import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ChartJSChart from '@/components/ui/ChartJSChart';
import { runMonteCarlo, calculatePercentiles, predictLinear, calculateProbabilityOfThreshold } from '@/lib/predictionUtils';

export function PredictiveToolsPage() {
  // Monte Carlo State
  const [startValue, setStartValue] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(8); // percentage
  const [volatility, setVolatility] = useState<number>(15); // percentage
  const [periods, setPeriods] = useState<number>(10);
  const [numSimulations, setNumSimulations] = useState<number>(500);
  const [targetThreshold, setTargetThreshold] = useState<number>(20000);

  const [mcResults, setMcResults] = useState<number[][] | null>(null);

  // ML linear prediction State
  const [histDataStr, setHistDataStr] = useState<string>('100, 105, 102, 110, 115, 112, 120, 125');
  const [periodsForward, setPeriodsForward] = useState<number>(5);

  const [mlResults, setMlResults] = useState<{ hist: number[]; proj: number[] } | null>(null);

  const handleRunMC = () => {
    const results = runMonteCarlo(startValue, expectedReturn / 100, volatility / 100, periods, numSimulations);
    setMcResults(results);
  };

  const handleRunML = () => {
    const dataPoints = histDataStr
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
    if (dataPoints.length < 2) return;
    const proj = predictLinear(dataPoints, periodsForward);
    setMlResults({ hist: dataPoints, proj });
  };

  // Compile Monte Carlo chart series
  const mcChartSeries = useMemo(() => {
    if (!mcResults) return [];

    // Calculate P10, P50, P90 paths
    const p10Path: { x: number; y: number }[] = [];
    const p50Path: { x: number; y: number }[] = [];
    const p90Path: { x: number; y: number }[] = [];

    // mcResults is array of simulations, each simulation is array of values per period
    // We need to calculate percentiles cross-sectionally for each period
    for (let p = 0; p <= periods; p++) {
      const periodValues = mcResults.map((sim) => sim[p] || 0);
      const percentiles = calculatePercentiles(periodValues, [10, 50, 90]);
      p10Path.push({ x: p, y: percentiles[0] || 0 });
      p50Path.push({ x: p, y: percentiles[1] || 0 });
      p90Path.push({ x: p, y: percentiles[2] || 0 });
    }

    return [
      { name: '10th Percentile (P10)', points: p10Path, color: 'var(--color-chart-5)' },
      { name: 'Median (P50)', points: p50Path, color: 'var(--color-chart-1)' },
      { name: '90th Percentile (P90)', points: p90Path, color: 'var(--color-chart-2)' },
    ];
  }, [mcResults, periods]);

  const probabilityStats = useMemo(() => {
    if (!mcResults || mcResults.length === 0) return null;
    const finalValues = mcResults.map((sim) => sim[sim.length - 1] || 0);
    const prob = calculateProbabilityOfThreshold(finalValues, targetThreshold);
    return { probability: prob * 100 };
  }, [mcResults, targetThreshold]);

  // Compile ML chart series
  const mlChartSeries = useMemo(() => {
    if (!mlResults) return [];

    const histPoints = mlResults.hist.map((y, i) => ({ x: i, y }));
    const projPoints = mlResults.proj.map((y, i) => ({ x: mlResults.hist.length + i, y }));

    // Connect the projection line from the last historical point
    if (histPoints.length > 0) {
      projPoints.unshift(histPoints[histPoints.length - 1]!);
    }

    return [
      { name: 'Historical Data', points: histPoints, color: 'var(--color-chart-1)' },
      { name: 'Linear Projection', points: projPoints, color: 'var(--color-chart-3)' },
    ];
  }, [mlResults]);

  return (
    <div className='flex w-full flex-col gap-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Predictive &amp; Simulation Tools</h1>
        <p className='mt-2 text-muted-foreground'>
          Run Monte Carlo simulations, visualize probabilistic outcomes, and forecast potential futures using simple algorithmic
          models.
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {/* Monte Carlo Config */}
        <Card className='md:col-span-2 lg:col-span-1'>
          <CardHeader>
            <CardTitle>Monte Carlo Config</CardTitle>
            <CardDescription>Configure simulation properties</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='startValue'>Initial Portfolio Value</Label>
              <Input id='startValue' type='number' value={startValue} onChange={(e) => setStartValue(Number(e.target.value))} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='expectedReturn'>Expected Return (%)</Label>
                <Input
                  id='expectedReturn'
                  type='number'
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='volatility'>Volatility (%)</Label>
                <Input id='volatility' type='number' value={volatility} onChange={(e) => setVolatility(Number(e.target.value))} />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='periods'>Periods (Years)</Label>
                <Input id='periods' type='number' value={periods} onChange={(e) => setPeriods(Number(e.target.value))} />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='numSimulations'>Simulations</Label>
                <Input
                  id='numSimulations'
                  type='number'
                  max={5000}
                  value={numSimulations}
                  onChange={(e) => setNumSimulations(Number(e.target.value))}
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='targetThreshold'>Probability Target Threshold</Label>
              <Input
                id='targetThreshold'
                type='number'
                value={targetThreshold}
                onChange={(e) => setTargetThreshold(Number(e.target.value))}
              />
            </div>

            <Button onClick={handleRunMC} className='mt-2'>
              Run Monte Carlo
            </Button>
          </CardContent>
        </Card>

        {/* Monte Carlo Results */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>
              {probabilityStats ?
                <>
                  Probability of reaching ${targetThreshold.toLocaleString()}:{' '}
                  <strong>{probabilityStats.probability.toFixed(2)}%</strong>
                </>
              : 'Run the simulation to see results.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mcResults ?
              <ChartJSChart series={mcChartSeries} xLabel='Years' yLabel='Portfolio Value' height={300} />
            : <div className='flex h-[300px] items-center justify-center border border-dashed rounded-md text-muted-foreground'>
                No simulation run yet
              </div>
            }
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {/* ML Config */}
        <Card className='md:col-span-2 lg:col-span-1'>
          <CardHeader>
            <CardTitle>Linear Prediction Model</CardTitle>
            <CardDescription>Forecast future periods based on CSV data</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='histDataStr'>Historical Data (Comma separated)</Label>
              <Input id='histDataStr' type='text' value={histDataStr} onChange={(e) => setHistDataStr(e.target.value)} />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='periodsForward'>Periods Forward</Label>
              <Input
                id='periodsForward'
                type='number'
                value={periodsForward}
                onChange={(e) => setPeriodsForward(Number(e.target.value))}
              />
            </div>

            <Button onClick={handleRunML} className='mt-2'>
              Run Prediction
            </Button>
          </CardContent>
        </Card>

        {/* ML Results */}
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
            <CardDescription>Linear regression projection from your data</CardDescription>
          </CardHeader>
          <CardContent>
            {mlResults ?
              <ChartJSChart series={mlChartSeries} xLabel='Period' yLabel='Value' height={300} />
            : <div className='flex h-[300px] items-center justify-center border border-dashed rounded-md text-muted-foreground'>
                No prediction run yet
              </div>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
