import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import BlockMath from '@matejmazur/react-katex';

export function CovarianceCalculator() {
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
    let cov = 0;
    for (let i = 0; i < n; i++) cov += (x[i]! - meanX) * (y[i]! - meanY);
    // sample covariance (N-1)
    const sampleCov = cov / (n - 1);
    setError(null);
    setResult(sampleCov.toFixed(6));
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='cov-x'>Series X (space or comma separated)</Label>
        <Input id='cov-x' placeholder='e.g. 1 2 3' value={xInput} onChange={(e) => setXInput(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='cov-y'>Series Y (same length)</Label>
        <Input id='cov-y' placeholder='e.g. 2 4 6' value={yInput} onChange={(e) => setYInput(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>Sample covariance: <span className='font-semibold'>{result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\text{Cov}(X,Y) = \\frac{\\sum (X_i - E(X))(Y_i - E(Y))}{N-1}'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- X_i, Y_i: paired observations</p>
          <p>- E(X), E(Y): sample means</p>
          <p>- N: sample size</p>
        </div>
      </div>
    </div>
  );
}
