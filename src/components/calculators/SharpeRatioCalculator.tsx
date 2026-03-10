import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function SharpeRatioCalculator() {
  const [portfolioReturn, setPortfolioReturn] = useState('0.12');
  const [riskFreeRate, setRiskFreeRate] = useState('0.03');
  const [volatility, setVolatility] = useState('0.15');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rp = Number(portfolioReturn);
    const rf = Number(riskFreeRate);
    const sigma = Number(volatility);

    if (![rp, rf, sigma].every((value) => Number.isFinite(value))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    if (sigma <= 0) {
      setError('Volatility must be > 0.');
      setResult(null);
      return;
    }

    const sharpe = (rp - rf) / sigma;
    setError(null);
    setResult(sharpe.toFixed(4));
  }, [portfolioReturn, riskFreeRate, volatility]);

  const chartData = {
    labels: ['Risk-Free Rate', 'Expected Return'],
    datasets: [
      {
        label: 'Return Components',
        data: [Number(riskFreeRate), Number(portfolioReturn)],
        backgroundColor: [
          'rgba(245, 158, 11, 0.5)', // Amber
          'rgba(16, 185, 129, 0.5)', // Emerald
        ],
        borderColor: ['rgb(245, 158, 11)', 'rgb(16, 185, 129)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='sr-rp'>Portfolio Expected Return (E[R_p])</Label>
          <Input
            id='sr-rp'
            placeholder='e.g. 0.08'
            value={portfolioReturn}
            onChange={(event) => setPortfolioReturn(event.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='sr-rf'>Risk-free Rate (R_f)</Label>
          <Input
            id='sr-rf'
            placeholder='e.g. 0.02'
            value={riskFreeRate}
            onChange={(event) => setRiskFreeRate(event.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='sr-sigma'>Portfolio Volatility (σ_p)</Label>
          <Input
            id='sr-sigma'
            placeholder='e.g. 0.12'
            value={volatility}
            onChange={(event) => setVolatility(event.target.value)}
          />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Sharpe Ratio: <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'\\text{Sharpe Ratio} = \\frac{E(R_p) - R_f}{\\sigma_p}'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='E(R_p) - R_f' />: Excess return (Risk Premium)
            </p>
            <p>
              <TeX math='\\sigma_p' />: Units of total risk (Standard Deviation)
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
