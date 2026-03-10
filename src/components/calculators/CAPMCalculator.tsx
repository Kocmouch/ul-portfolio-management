import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function CAPMCalculator() {
  const [riskFreeRate, setRiskFreeRate] = useState('0.03');
  const [beta, setBeta] = useState('1.2');
  const [marketReturn, setMarketReturn] = useState('0.09');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rf = Number(riskFreeRate);
    const b = Number(beta);
    const rm = Number(marketReturn);

    if (![rf, b, rm].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    const expectedReturn = rf + b * (rm - rf);
    setError(null);
    setResultDecimal(expectedReturn.toFixed(4));
    setResultPercent(`${(expectedReturn * 100).toFixed(2)}%`);
  }, [riskFreeRate, beta, marketReturn]);

  const maxBeta = Math.max(1, Number(beta)) * 1.5;
  const rf = Number(riskFreeRate);
  const rm = Number(marketReturn);
  const bVal = Number(beta);
  const erVal = rf + bVal * (rm - rf);

  const chartData = {
    datasets: [
      {
        label: 'Security Market Line (SML)',
        data: [
          { x: 0, y: rf },
          { x: 1, y: rm },
          { x: maxBeta, y: rf + maxBeta * (rm - rf) },
        ],
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        showLine: true,
      },
      {
        label: 'Asset',
        data: [{ x: bVal, y: erVal }],
        backgroundColor: 'rgb(16, 185, 129)',
        pointRadius: 6,
        showLine: false,
      },
    ],
  };

  const chartOptions = {
    ...defaultChartOptions,
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales.x,
        title: { display: true, text: 'Beta (β)', color: 'rgba(255,255,255,0.7)' },
        min: 0,
      },
      y: {
        ...defaultChartOptions.scales.y,
        title: { display: true, text: 'Expected Return', color: 'rgba(255,255,255,0.7)' },
      },
    },
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='capm-rf'>Risk-free Rate (R_f)</Label>
          <Input id='capm-rf' value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='capm-beta'>Asset Beta (β)</Label>
          <Input id='capm-beta' value={beta} onChange={(e) => setBeta(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='capm-rm'>Market Return E(R_m)</Label>
          <Input id='capm-rm' value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {resultPercent && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              CAPM Return: <span className='font-bold text-base'>{resultPercent}</span>
            </p>
          </div>
        )}
        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'E(R_i) = R_f + \\beta_i [E(R_M) - R_f]'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='R_f' />: Risk-free rate
            </p>
            <p>
              <TeX math='\\beta_i' />: Asset beta (relative risk)
            </p>
            <p>
              <TeX math='E(R_M)' />: Expected market return
            </p>
          </div>
        </div>
      </div>

      <div className='h-[250px] w-full'>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
