import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function RealReturnCalculator() {
  const [nominal, setNominal] = useState('0.10');
  const [inflation, setInflation] = useState('0.03');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chartDataState, setChartDataState] = useState<number[]>([]);

  useEffect(() => {
    const R = Number(nominal);
    const i = Number(inflation);
    if (![R, i].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    const real = (1 + R) / (1 + i) - 1;
    setError(null);
    setResult(`${(real * 100).toFixed(2)}%`);
    setChartDataState([R, real]);
  }, [nominal, inflation]);

  const chartData = {
    labels: ['Nominal Return', 'Real Return'],
    datasets: [
      {
        label: 'Returns',
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
          <Label htmlFor='real-nominal'>Nominal Return (R)</Label>
          <Input id='real-nominal' value={nominal} onChange={(e) => setNominal(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='real-inflation'>Inflation Rate (i)</Label>
          <Input id='real-inflation' value={inflation} onChange={(e) => setInflation(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Exact Real Return: <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'r = \\frac{1 + R}{1 + i} - 1'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='R' />: Nominal return
            </p>
            <p>
              <TeX math='i' />: Inflation rate
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
