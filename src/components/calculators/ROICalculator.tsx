import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ROICalculator() {
  const [initial, setInitial] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [netContrib, setNetContrib] = useState('0');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const initialNum = Number(initial);
    const finalNum = Number(finalValue);
    const contribNum = Number(netContrib || '0');

    if (![initialNum, finalNum, contribNum].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for all fields.');
      setResult(null);
      return;
    }

    if (initialNum === 0) {
      setError('Initial value must be non-zero.');
      setResult(null);
      return;
    }

    const roi = (finalNum - initialNum - contribNum) / initialNum;
    setError(null);
    setResult(`${(roi * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='roi-initial'>Initial value V_begin</Label>
        <Input id='roi-initial' placeholder='e.g. 10000' value={initial} onChange={(event) => setInitial(event.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='roi-final'>Final value V_end</Label>
        <Input
          id='roi-final'
          placeholder='e.g. 11200'
          value={finalValue}
          onChange={(event) => setFinalValue(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='roi-contrib'>Net contributions C (optional)</Label>
        <Input
          id='roi-contrib'
          placeholder='e.g. 500 (deposits minus withdrawals)'
          value={netContrib}
          onChange={(event) => setNetContrib(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          ROI: <span className='font-semibold'>{result}</span>
        </p>
      )}
    </div>
  );
}
