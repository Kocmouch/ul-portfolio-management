import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function RealReturnCalculator() {
  const [nominal, setNominal] = useState('');
  const [inflation, setInflation] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const R = Number(nominal);
    const i = Number(inflation);
    if (![R, i].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric nominal return and inflation.');
      setResult(null);
      return;
    }

    const real = (1 + R) / (1 + i) - 1;
    const approx = R - i;
    setError(null);
    setResult(`Exact: ${(real * 100).toFixed(2)}%, Approx: ${(approx * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='real-nominal'>Nominal return R (decimal)</Label>
        <Input id='real-nominal' placeholder='e.g. 0.10' value={nominal} onChange={(e) => setNominal(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='real-inflation'>Inflation i (decimal)</Label>
        <Input id='real-inflation' placeholder='e.g. 0.03' value={inflation} onChange={(e) => setInflation(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'><span className='font-semibold'>{result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'1 + r = \\dfrac{1 + R}{1 + i}'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- R: nominal return (decimal)</p>
          <p>- i: inflation rate (decimal)</p>
          <p>- r: real return (decimal); approximation: r \u2248 R - i</p>
        </div>
      </div>
    </div>
  );
}
