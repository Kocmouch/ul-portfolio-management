import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function JensenAlphaCalculator() {
  const [portfolioReturn, setPortfolioReturn] = useState('0.10');
  const [riskFreeRate, setRiskFreeRate] = useState('0.03');
  const [marketReturn, setMarketReturn] = useState('0.08');
  const [beta, setBeta] = useState('1.2');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expectedFromCAPM, setExpectedFromCAPM] = useState<number>(0);

  useEffect(() => {
    const rp = Number(portfolioReturn);
    const rf = Number(riskFreeRate);
    const rm = Number(marketReturn);
    const b = Number(beta);

    if (![rp, rf, rm, b].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    const capmER = rf + b * (rm - rf);
    const alpha = rp - capmER;
    setError(null);
    setResultDecimal(alpha.toFixed(4));
    setResultPercent(`${(alpha * 100).toFixed(2)}%`);
    setExpectedFromCAPM(capmER);
  }, [portfolioReturn, riskFreeRate, marketReturn, beta]);

  const chartData = {
    labels: ['Actual Return', 'CAPM Expected'],
    datasets: [
      {
        label: 'Return Performance',
        data: [Number(portfolioReturn), expectedFromCAPM],
        backgroundColor: ['rgba(16, 185, 129, 0.5)', 'rgba(99, 102, 241, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='space-y-1'>
            <Label htmlFor='jensen-rp'>Portfolio Return (R_p)</Label>
            <Input id='jensen-rp' value={portfolioReturn} onChange={(e) => setPortfolioReturn(e.target.value)} />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='jensen-beta'>Portfolio Beta (β_p)</Label>
            <Input id='jensen-beta' value={beta} onChange={(e) => setBeta(e.target.value)} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='space-y-1'>
            <Label htmlFor='jensen-rf'>Risk-free (R_f)</Label>
            <Input id='jensen-rf' value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='jensen-rm'>Market Return (R_m)</Label>
            <Input id='jensen-rm' value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)} />
          </div>
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {resultPercent && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Jensen&apos;s Alpha: <span className='font-bold text-base'>{resultPercent}</span>
            </p>
          </div>
        )}
        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'\\alpha = R_p - [R_f + \\beta_p (R_m - R_f)]'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='R_p' />: Actual portfolio return
            </p>
            <p>
              <TeX math='\\beta_p' />: Portfolio beta
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
