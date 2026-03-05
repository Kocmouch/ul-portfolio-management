import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function UtilityCalculator() {
  const [expectedReturn, setExpectedReturn] = useState('');
  const [stddev, setStddev] = useState('');
  const [aCoef, setACoef] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const er = Number(expectedReturn);
    const s = Number(stddev);
    const A = Number(aCoef);
    if (![er, s, A].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for expected return, standard deviation, and A.');
      setResult(null);
      return;
    }

    const variance = s * s;
    const U = er - 0.5 * A * variance;
    setError(null);
    setResult(`Utility = ${U.toFixed(6)}`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='util-er'>Expected return E(r) (decimal)</Label>
        <Input id='util-er' placeholder='e.g. 0.1' value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='util-sd'>Standard deviation σ (decimal)</Label>
        <Input id='util-sd' placeholder='e.g. 0.2' value={stddev} onChange={(e) => setStddev(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='util-A'>Risk aversion coefficient A</Label>
        <Input id='util-A' placeholder='e.g. 3' value={aCoef} onChange={(e) => setACoef(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'><span className='font-semibold'>{result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'U = E(r) - \\tfrac{1}{2} A \\sigma^2'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- E(r): expected return (decimal)</p>
          <p>- A: risk aversion coefficient</p>
          <p>- σ: standard deviation of returns (decimal)</p>
        </div>
      </div>
    </div>
  );
}
