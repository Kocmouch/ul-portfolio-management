import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';

export function TWRCalculator() {
  const [returnsInput, setReturnsInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const returns = parseNumberList(returnsInput);
    if (!returns) {
      setError('Please enter numeric values for all subperiod returns.');
      setResult(null);
      return;
    }

    let product = 1;
    for (const r of returns) {
      product *= 1 + r;
    }

    const twr = product - 1;
    setError(null);
    setResult(`${(twr * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='twr-returns'>Subperiod returns R_t</Label>
        <Input
          id='twr-returns'
          placeholder='e.g. 0.02 -0.01 0.015'
          value={returnsInput}
          onChange={(event) => setReturnsInput(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          Time-weighted return: <span className='font-semibold'>{result}</span>
        </p>
      )}
    </div>
  );
}
