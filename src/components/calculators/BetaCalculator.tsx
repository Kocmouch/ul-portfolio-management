import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function BetaCalculator() {
  const [covariance, setCovariance] = useState('0.015');
  const [marketVariance, setMarketVariance] = useState('0.012');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const covNum = Number(covariance);
    const varNum = Number(marketVariance);

    if (![covNum, varNum].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    if (varNum === 0) {
      setError('Market variance must be > 0.');
      setResult(null);
      return;
    }

    const beta = covNum / varNum;
    setError(null);
    setResult(beta.toFixed(3));
  }, [covariance, marketVariance]);

  const betaVal = Number(result) || 0;
  const chartData = {
    labels: ['Asset Beta'],
    datasets: [
      {
        label: 'Beta Value',
        data: [betaVal],
        backgroundColor: betaVal > 1 ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)',
        borderColor: betaVal > 1 ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    ...defaultChartOptions,
    indexAxis: 'y' as const,
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales.x,
        min: 0,
        max: Math.max(2, betaVal + 0.5),
        grid: {
          ...defaultChartOptions.scales.x.grid,
          color: (context: any) => (context.tick.value === 1 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)'),
        },
      },
    },
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='beta-cov'>Covariance (Cov_im)</Label>
          <Input id='beta-cov' value={covariance} onChange={(e) => setCovariance(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='beta-var'>Market Variance (σ_m²)</Label>
          <Input id='beta-var' value={marketVariance} onChange={(e) => setMarketVariance(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Beta (β): <span className='font-bold text-base'>{result}</span>
            </p>
            <p className='text-xs mt-1 text-emerald-500/80'>
              {betaVal > 1 ? 'Aggressive (more volatile than market)' : 'Defensive (less volatile than market)'}
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'\\beta_i = \\frac{\\text{Cov}(R_i, R_M)}{\\sigma_M^2}'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='\\text{Cov}(R_i, R_M)' />: Covariance between asset <TeX math='i' /> and the market
            </p>
            <p>
              <TeX math='\\sigma_M^2' />: Variance of the market returns
            </p>
          </div>
        </div>
      </div>

      <div className='h-[150px] w-full flex items-center'>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
