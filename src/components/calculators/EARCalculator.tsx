import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function EARCalculator() {
  const [apr, setApr] = useState('');
  const [periods, setPeriods] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const aprNum = Number(apr);
    const n = Number(periods);
    if (![aprNum, n].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric APR and compounding periods.');
      setResult(null);
      return;
    }
    if (n <= 0) {
      setError('Compounding periods must be positive.');
      setResult(null);
      return;
    }

    const ear = Math.pow(1 + aprNum / n, n) - 1;
    setError(null);
    setResult(`${(ear * 100).toFixed(4)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='ear-apr'>APR (decimal)</Label>
        <Input id='ear-apr' placeholder='e.g. 0.06' value={apr} onChange={(e) => setApr(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ear-n'>Compounding periods per year n</Label>
        <Input id='ear-n' placeholder='e.g. 12' value={periods} onChange={(e) => setPeriods(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>Effective annual rate: <span className='font-semibold'>{result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'r_{eff} = \\left(1 + \\frac{APR}{n}\\right)^n - 1'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- APR: annual percentage rate (decimal)</p>
          <p>- n: number of compounding periods per year</p>
        </div>
      </div>
    </div>
  );
}
