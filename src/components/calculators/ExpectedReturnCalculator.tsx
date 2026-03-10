import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function ExpectedReturnCalculator() {
  const [weightsInput, setWeightsInput] = useState('0.5 0.3 0.2');
  const [returnsInput, setReturnsInput] = useState('0.10 0.05 0.08');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weights, setWeights] = useState<number[]>([]);

  useEffect(() => {
    const w = parseNumberList(weightsInput);
    const r = parseNumberList(returnsInput);

    if (!w || !r) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    if (w.length !== r.length) {
      setError('Weights and returns must have same length.');
      setResult(null);
      return;
    }

    const sumWeights = w.reduce((acc, val) => acc + val, 0);
    if (Math.abs(sumWeights - 1) > 0.01) {
      setError('Weights should sum to ~1.0 (100%).');
      // We still calculate but warn
    } else {
      setError(null);
    }

    const expectedReturn = w.reduce((acc, val, i) => acc + val * r[i]!, 0);
    setResult(`${(expectedReturn * 100).toFixed(2)}%`);
    setWeights(w);
  }, [weightsInput, returnsInput]);

  const chartData = {
    labels: weights.map((_, i) => `Asset ${i + 1}`),
    datasets: [
      {
        data: weights,
        backgroundColor: [
          'rgba(99, 102, 241, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(139, 92, 246, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='er-weights'>Weights (w_i)</Label>
          <Input
            id='er-weights'
            placeholder='e.g. 0.5 0.3 0.2'
            value={weightsInput}
            onChange={(event) => setWeightsInput(event.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='er-returns'>Expected Returns (r_i)</Label>
          <Input
            id='er-returns'
            placeholder='e.g. 0.05 0.07 0.09'
            value={returnsInput}
            onChange={(event) => setReturnsInput(event.target.value)}
          />
        </div>

        {error && <p className='text-sm text-amber-500 font-medium'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Portfolio expected return: <span className='font-bold text-base'>{result}</span>
            </p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'E(R_p) = \\sum_{i=1}^n w_i E(R_i)'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='w_i' />: Weight of asset <TeX math='i' /> in the portfolio
            </p>
            <p>
              <TeX math='E(R_i)' />: Expected return of asset <TeX math='i' />
            </p>
          </div>
        </div>
      </div>

      <div className='h-[250px] w-full flex items-center justify-center'>
        {weights.length > 0 && <Pie data={chartData} options={defaultChartOptions} />}
      </div>
    </div>
  );
}
