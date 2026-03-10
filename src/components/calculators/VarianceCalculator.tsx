import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';
import { defaultChartOptions } from '@/lib/charts';

export function VarianceCalculator() {
  const [probsInput, setProbsInput] = useState('0.25 0.5 0.25');
  const [returnsInput, setReturnsInput] = useState('0.30 0.10 -0.10');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<{ p: number; r: number }[]>([]);

  useEffect(() => {
    const probs = parseNumberList(probsInput);
    const returns = parseNumberList(returnsInput);
    if (!probs || !returns) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }
    if (probs.length !== returns.length) {
      setError('Probabilities and returns must have same length.');
      setResult(null);
      return;
    }

    const sumP = probs.reduce((a, b) => a + b, 0);
    const pNormalized = probs.map((p) => p / sumP);
    const expected = returns.reduce((acc, r, i) => acc + pNormalized[i]! * r, 0);
    const variance = returns.reduce((acc, r, i) => acc + pNormalized[i]! * Math.pow(r - expected, 2), 0);
    const stddev = Math.sqrt(variance);

    setError(null);
    setResult(`E(R) = ${(expected * 100).toFixed(2)}%, SD = ${(stddev * 100).toFixed(2)}%`);
    setStates(pNormalized.map((p, i) => ({ p, r: returns[i]! })));
  }, [probsInput, returnsInput]);

  const chartData = {
    labels: states.map((_, i) => `State ${i + 1}`),
    datasets: [
      {
        label: 'Return',
        data: states.map((s) => s.r),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Probability',
        data: states.map((s) => s.p),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    ...defaultChartOptions,
    scales: {
      ...defaultChartOptions.scales,
      y: {
        ...defaultChartOptions.scales.y,
        position: 'left' as const,
        title: { display: true, text: 'Return', color: 'rgba(255,255,255,0.7)' },
      },
      y1: {
        ...defaultChartOptions.scales.y,
        position: 'right' as const,
        title: { display: true, text: 'Probability', color: 'rgba(255,255,255,0.7)' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='var-probs'>Probabilities p(s)</Label>
          <Input id='var-probs' value={probsInput} onChange={(e) => setProbsInput(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='var-returns'>Returns r(s)</Label>
          <Input id='var-returns' value={returnsInput} onChange={(e) => setReturnsInput(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p className='font-bold text-base'>{result}</p>
          </div>
        )}

        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'\\sigma^2 = \\sum_s p(s)[r(s) - E(r)]^2'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='p(s)' />: Probability of state <TeX math='s' />
            </p>
            <p>
              <TeX math='r(s)' />: Return in state <TeX math='s' />
            </p>
            <p>
              <TeX math='E(r)' />: Expected return across all states
            </p>
          </div>
        </div>
      </div>

      <div className='h-[250px] w-full'>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
