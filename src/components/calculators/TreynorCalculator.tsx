import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function TreynorCalculator() {
  const [portfolioReturn, setPortfolioReturn] = useState('0.10');
  const [riskFreeRate, setRiskFreeRate] = useState('0.03');
  const [beta, setBeta] = useState('1.1');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rp = Number(portfolioReturn);
    const rf = Number(riskFreeRate);
    const b = Number(beta);

    if (![rp, rf, b].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    if (b === 0) {
      setError('Beta must be non-zero.');
      setResult(null);
      return;
    }

    const treynor = (rp - rf) / b;
    setError(null);
    setResult(treynor.toFixed(4));
  }, [portfolioReturn, riskFreeRate, beta]);

  const chartData = {
    labels: ['Risk-Free Rate', 'Portfolio Return'],
    datasets: [
      {
        label: 'Returns',
        data: [Number(riskFreeRate), Number(portfolioReturn)],
        backgroundColor: ['rgba(245, 158, 11, 0.5)', 'rgba(16, 185, 129, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='treynor-rp'>Portfolio Return (R_p)</Label>
          <Input id='treynor-rp' value={portfolioReturn} onChange={(e) => setPortfolioReturn(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='treynor-rf'>Risk-free Rate (R_f)</Label>
          <Input id='treynor-rf' value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='treynor-beta'>Portfolio Beta (β_p)</Label>
          <Input id='treynor-beta' value={beta} onChange={(e) => setBeta(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Treynor Ratio: <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'\\text{Treynor Ratio} = \\frac{E(R_p) - R_f}{\\beta_p}'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='E(R_p)-R_f' />: Excess return (Portfolio Risk Premium)
            </p>
            <p>
              <TeX math='\\beta_p' />: Systematic risk (Beta)
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
