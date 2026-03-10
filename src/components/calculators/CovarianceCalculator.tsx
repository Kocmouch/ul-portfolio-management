import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import TeX from '@matejmazur/react-katex';

export function CovarianceCalculator() {
  const [xInput, setXInput] = useState('0.10 0.05 0.12');
  const [yInput, setYInput] = useState('0.08 0.06 0.15');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const x = parseNumberList(xInput);
    const y = parseNumberList(yInput);
    if (!x || !y) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }
    if (x.length !== y.length) {
      setError('Series must have same length.');
      setResult(null);
      return;
    }

    const n = x.length;
    if (n < 2) {
      setError('Need at least 2 points.');
      setResult(null);
      return;
    }

    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    let cov = 0;
    for (let i = 0; i < n; i++) cov += (x[i]! - meanX) * (y[i]! - meanY);
    const sampleCov = cov / (n - 1);
    setError(null);
    setResult(sampleCov.toFixed(6));
  }, [xInput, yInput]);

  return (
    <div className='space-y-4'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='cov-x'>Series X Returns</Label>
          <Input id='cov-x' value={xInput} onChange={(e) => setXInput(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='cov-y'>Series Y Returns</Label>
          <Input id='cov-y' value={yInput} onChange={(e) => setYInput(e.target.value)} />
        </div>
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
          <p>
            Sample Covariance: <span className='font-bold text-base'>{result}</span>
          </p>
        </div>
      )}

      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-xl mb-4'>
          <TeX block math={'\\text{Cov}(X,Y) = \\frac{\\sum (X_i - \\bar{X})(Y_i - \\bar{Y})}{n-1}'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='X_i, Y_i' />: Paired observations (returns)
          </p>
          <p>
            <TeX math='\\bar{X}, \\bar{Y}' />: Sample means of the series
          </p>
          <p>
            <TeX math='n' />: Sample size
          </p>
        </div>
      </div>
    </div>
  );
}
