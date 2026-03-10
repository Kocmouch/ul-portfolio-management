import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function UtilityCalculator() {
  const [expectedReturn, setExpectedReturn] = useState('0.10');
  const [stddev, setStddev] = useState('0.20');
  const [aCoef, setACoef] = useState('3.0');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const er = Number(expectedReturn);
    const s = Number(stddev);
    const A = Number(aCoef);
    if (![er, s, A].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    const variance = s * s;
    const penalty = 0.5 * A * variance;
    const U = er - penalty;
    setError(null);
    setResult(U.toFixed(4));
    setData([er, penalty, U]);
  }, [expectedReturn, stddev, aCoef]);

  const chartData = {
    labels: ['Expected Return', 'Risk Penalty', 'Net Utility'],
    datasets: [
      {
        label: 'Utility Components',
        data: data,
        backgroundColor: ['rgba(16, 185, 129, 0.5)', 'rgba(239, 68, 68, 0.5)', 'rgba(99, 102, 241, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='util-er'>Expected Return E(r)</Label>
          <Input id='util-er' value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='util-sd'>Standard Deviation σ</Label>
          <Input id='util-sd' value={stddev} onChange={(e) => setStddev(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='util-A'>Risk Aversion Coefficient (A)</Label>
          <Input id='util-A' value={aCoef} onChange={(e) => setACoef(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Utility (U): <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'U = E(r) - \\frac{1}{2} A \\sigma^2'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='E(r)' />: Expected return of the portfolio
            </p>
            <p>
              <TeX math='A' />: Investor's risk aversion coefficient
            </p>
            <p>
              <TeX math='\\sigma' />: Standard deviation (risk)
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
