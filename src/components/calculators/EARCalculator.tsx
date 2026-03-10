import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function EARCalculator() {
  const [apr, setApr] = useState('0.06');
  const [periods, setPeriods] = useState('12');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chartDataState, setChartDataState] = useState<number[]>([]);

  useEffect(() => {
    const aprNum = Number(apr);
    const n = Number(periods);
    if (![aprNum, n].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }
    if (n <= 0) {
      setError('Periods must be > 0.');
      setResult(null);
      return;
    }

    const ear = Math.pow(1 + aprNum / n, n) - 1;
    setError(null);
    setResult(`${(ear * 100).toFixed(4)}%`);
    setChartDataState([aprNum, ear]);
  }, [apr, periods]);

  const chartData = {
    labels: ['APR (Annual Rate)', 'EAR (Effective Rate)'],
    datasets: [
      {
        label: 'Rate Comparison',
        data: chartDataState,
        backgroundColor: ['rgba(99, 102, 241, 0.5)', 'rgba(16, 185, 129, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='ear-apr'>Annual Percentage Rate (APR)</Label>
          <Input id='ear-apr' value={apr} onChange={(e) => setApr(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='ear-n'>Compounding Periods (n)</Label>
          <Input id='ear-n' value={periods} onChange={(e) => setPeriods(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              EAR: <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'EAR = \\left(1 + \\frac{APR}{n}\\right)^n - 1'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='APR' />: Annual Percentage Rate
            </p>
            <p>
              <TeX math='n' />: Number of compounding periods per year
            </p>
          </div>
        </div>
      </div>

      <div className='h-[200px] w-full'>
        <Bar data={chartData} options={defaultChartOptions} />
      </div>
    </div>
  );
}
