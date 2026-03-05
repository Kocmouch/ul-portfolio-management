import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';

export function RegressionCalculator() {
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const x = parseNumberList(xInput);
    const y = parseNumberList(yInput);
    if (!x || !y) {
      setError('Please enter numeric values for both series.');
      setResult(null);
      return;
    }
    if (x.length !== y.length) {
      setError('Both series must have the same length.');
      setResult(null);
      return;
    }

    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      num += (x[i]! - meanX) * (y[i]! - meanY);
      den += (x[i]! - meanX) * (x[i]! - meanX);
    }
    if (den === 0) {
      setError('Variance of X is zero; slope undefined.');
      setResult(null);
      return;
    }
    const slope = num / den;
    const intercept = meanY - slope * meanX;
    setError(null);
    setResult(`slope = ${slope.toFixed(6)}, intercept = ${intercept.toFixed(6)}`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='reg-x'>Independent X (space or comma separated)</Label>
        <Input id='reg-x' placeholder='e.g. 1 2 3' value={xInput} onChange={(e) => setXInput(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='reg-y'>Dependent Y (same length)</Label>
        <Input id='reg-y' placeholder='e.g. 2 4 6' value={yInput} onChange={(e) => setYInput(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'><span className='font-semibold'>{result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'Y_i = a + b X_i + \\varepsilon_i'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- a: intercept</p>
          <p>- b: slope (estimated via covariance/variance)</p>
          <p>- ε_i: error term</p>
        </div>
      </div>
    </div>
  );
}
