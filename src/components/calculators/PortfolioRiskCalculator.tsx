import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';
import { defaultChartOptions } from '@/lib/charts';

export function PortfolioRiskCalculator() {
  const [weightsInput, setWeightsInput] = useState('0.4 0.4 0.2');
  const [variancesInput, setVariancesInput] = useState('0.04 0.09 0.01');
  const [avgCorrelation, setAvgCorrelation] = useState('0.3');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [volatilities, setVolatilities] = useState<number[]>([]);
  const [portfolioVol, setPortfolioVol] = useState<number>(0);

  useEffect(() => {
    const weights = parseNumberList(weightsInput);
    const variances = parseNumberList(variancesInput);
    const rho = Number(avgCorrelation);

    if (!weights || !variances || !Number.isFinite(rho)) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    if (weights.length !== variances.length) {
      setError('Weights and variances must have same length.');
      setResult(null);
      return;
    }

    if (rho < -1 || rho > 1) {
      setError('Correlation must be between -1 and 1.');
      setResult(null);
      return;
    }

    const n = weights.length;
    let totalVar = 0;

    for (let i = 0; i < n; i++) {
      totalVar += weights[i]! ** 2 * variances[i]!;
    }

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const cov = rho * Math.sqrt(variances[i]!) * Math.sqrt(variances[j]!);
        totalVar += 2 * weights[i]! * weights[j]! * cov;
      }
    }

    const volatility = Math.sqrt(Math.max(totalVar, 0));
    setError(null);
    setResult(`${(volatility * 100).toFixed(2)}%`);
    setPortfolioVol(volatility);
    setVolatilities(variances.map((v) => Math.sqrt(v)));
  }, [weightsInput, variancesInput, avgCorrelation]);

  const chartData = {
    labels: [...volatilities.map((_, i) => `Asset ${i + 1}`), 'Portfolio'],
    datasets: [
      {
        label: 'Volatility (Standard Deviation)',
        data: [...volatilities, portfolioVol],
        backgroundColor: [...volatilities.map(() => 'rgba(99, 102, 241, 0.4)'), 'rgba(16, 185, 129, 0.7)'],
        borderColor: [...volatilities.map(() => 'rgb(99, 102, 241)'), 'rgb(16, 185, 129)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='risk-weights'>Weights (w_i)</Label>
          <Input
            id='risk-weights'
            placeholder='e.g. 0.4 0.4 0.2'
            value={weightsInput}
            onChange={(e) => setWeightsInput(e.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='risk-vars'>Variances (σ_i²)</Label>
          <Input
            id='risk-vars'
            placeholder='e.g. 0.04 0.09 0.01'
            value={variancesInput}
            onChange={(e) => setVariancesInput(e.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='risk-rho'>Average correlation (ρ)</Label>
          <Input id='risk-rho' placeholder='0.3' value={avgCorrelation} onChange={(e) => setAvgCorrelation(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Portfolio Volatility: <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX
              block
              math={'\\sigma_p^2 = \\sum_{i} w_i^2\\sigma_i^2 + \\sum_{i \\neq j} w_i w_j \\rho_{ij} \\sigma_i \\sigma_j'}
            />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='\\sigma_p' />: Portfolio standard deviation (volatility)
            </p>
            <p>
              <TeX math='w_i' />: Weight of asset <TeX math='i' />
            </p>
            <p>
              <TeX math='\\rho_{ij}' />: Correlation coefficient between asset <TeX math='i' /> and <TeX math='j' />
            </p>
          </div>
        </div>
      </div>

      <div className='h-[250px] w-full'>
        <Bar data={chartData} options={defaultChartOptions} />
      </div>
    </div>
  );
}
