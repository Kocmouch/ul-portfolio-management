import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function HPRCalculator() {
  const [initial, setInitial] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [dividends, setDividends] = useState('0');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const initialNum = Number(initial);
    const finalNum = Number(finalValue);
    const divNum = Number(dividends || '0');

    if (![initialNum, finalNum, divNum].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for all fields.');
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
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='hpr-initial'>Initial value V_begin</Label>
        <Input id='hpr-initial' placeholder='e.g. 10000' value={initial} onChange={(event) => setInitial(event.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='hpr-final'>Final value V_end</Label>
        <Input
          id='hpr-final'
          placeholder='e.g. 11200'
          value={finalValue}
          onChange={(event) => setFinalValue(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='hpr-dividends'>Dividends / cash flows D (optional)</Label>
        <Input
          id='hpr-dividends'
          placeholder='e.g. 200'
          value={dividends}
          onChange={(event) => setDividends(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {!error && resultDecimal && resultPercent && (
        <div className='space-y-1 text-sm text-emerald-500'>
          <p>
            HPR (decimal): <span className='font-semibold'>{resultDecimal}</span>
          </p>
          <p>
            HPR (percent): <span className='font-semibold'>{resultPercent}</span>
          </p>
        </div>
      )}
    </div>
  );
}
