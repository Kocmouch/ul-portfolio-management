import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function RiskPremiumCalculator() {
  const [expected, setExpected] = useState('');
  const [riskFree, setRiskFree] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const er = Number(expected);
    const rf = Number(riskFree);
    if (![er, rf].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric expected return and risk-free rate.');
      setResult(null);
      return;
    }

    const rp = er - rf;
    setError(null);
    setResult(`${(rp * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='rp-expected'>Expected return E(R) (decimal)</Label>
        <Input id='rp-expected' placeholder='e.g. 0.10' value={expected} onChange={(e) => setExpected(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='rp-rf'>Risk-free rate R_f (decimal)</Label>
        <Input id='rp-rf' placeholder='e.g. 0.02' value={riskFree} onChange={(e) => setRiskFree(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'><span className='font-semibold'>Risk premium: {result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'RP = E(R) - R_f'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- E(R): expected return (decimal)</p>
          <p>- R_f: risk-free rate (decimal)</p>
          <p>- RP: risk premium (decimal)</p>
        </div>
      </div>
    </div>
  );
}
