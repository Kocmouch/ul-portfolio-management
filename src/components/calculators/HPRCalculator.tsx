import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function HPRCalculator() {
  const [initial, setInitial] = useState('10000');
  const [finalValue, setFinalValue] = useState('11200');
  const [dividends, setDividends] = useState('200');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialNum = Number(initial);
    const finalNum = Number(finalValue);
    const divNum = Number(dividends || '0');

    if (![initialNum, finalNum, divNum].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    if (initialNum === 0) {
      setError('Initial value must be non-zero.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    const hpr = (finalNum - initialNum + divNum) / initialNum;
    setError(null);
    setResultDecimal(hpr.toFixed(4));
    setResultPercent(`${(hpr * 100).toFixed(2)}%`);
  }, [initial, finalValue, dividends]);

  const chartData = {
    labels: ['Initial', 'Current Total'],
    datasets: [
      {
        label: 'Value',
        data: [Number(initial), Number(finalValue) + Number(dividends || 0)],
        backgroundColor: [
          'rgba(99, 102, 241, 0.5)', // Indigo
          'rgba(16, 185, 129, 0.5)', // Emerald
        ],
        borderColor: ['rgb(99, 102, 241)', 'rgb(16, 185, 129)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='hpr-initial'>Initial value (V_begin)</Label>
          <Input id='hpr-initial' placeholder='e.g. 10000' value={initial} onChange={(event) => setInitial(event.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='hpr-final'>Final value (V_end)</Label>
          <Input
            id='hpr-final'
            placeholder='e.g. 11200'
            value={finalValue}
            onChange={(event) => setFinalValue(event.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='hpr-dividends'>Dividends / Cash Flows (D)</Label>
          <Input
            id='hpr-dividends'
            placeholder='e.g. 200'
            value={dividends}
            onChange={(event) => setDividends(event.target.value)}
          />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {!error && resultDecimal && resultPercent && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              HPR (decimal): <span className='font-bold text-base'>{resultDecimal}</span>
            </p>
            <p>
              HPR (percent): <span className='font-bold text-base'>{resultPercent}</span>
            </p>
          </div>
        )}
        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'HPR = \\frac{V_{end} - V_{begin} + D}{V_{begin}}'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='V_{begin}' />: Purchase price / initial value
            </p>
            <p>
              <TeX math='V_{end}' />: Sale price / final value
            </p>
            <p>
              <TeX math='D' />: Dividends or intermediate cash flows
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

export default HPRCalculator;
