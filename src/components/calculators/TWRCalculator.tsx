import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';
import { defaultChartOptions } from '@/lib/charts';

export function TWRCalculator() {
  const [returnsInput, setReturnsInput] = useState('0.05 -0.02 0.08 0.04');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [growthPoints, setGrowthPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const returns = parseNumberList(returnsInput);
    if (!returns || returns.length === 0) {
      setError('Please enter numeric values.');
      setResult(null);
      setGrowthPoints([]);
      return;
    }

    let product = 1;
    const points = [{ x: 0, y: 1 }];
    for (let i = 0; i < returns.length; i++) {
      product *= 1 + returns[i]!;
      points.push({ x: i + 1, y: product });
    }

    const twr = product - 1;
    setError(null);
    setResult(`${(twr * 100).toFixed(2)}%`);
    setGrowthPoints(points);
  }, [returnsInput]);

  const chartData = {
    datasets: [
      {
        label: 'Cumulative Growth',
        data: growthPoints,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='twr-returns'>Subperiod Returns (space separated)</Label>
          <Input id='twr-returns' value={returnsInput} onChange={(e) => setReturnsInput(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              TWR: <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'r_{TWR} = \\prod_{t=1}^T (1 + r_t) - 1'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='r_t' />: Return in subperiod <TeX math='t' />
            </p>
            <p>
              <TeX math='T' />: Total number of subperiods
            </p>
          </div>
        </div>
      </div>

      <div className='h-[200px] w-full'>
        <Line data={chartData} options={defaultChartOptions} />
      </div>
    </div>
  );
}
