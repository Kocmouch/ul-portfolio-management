import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import BlockMath from '@matejmazur/react-katex';

export function CorrelationCalculator() {
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
    let sx = 0;
    let sy = 0;
    for (let i = 0; i < n; i++) {
      const dx = x[i]! - meanX;
      const dy = y[i]! - meanY;
      cov += dx * dy;
      sx += dx * dx;
      sy += dy * dy;
    }
    const sampleCov = cov / (n - 1);
    const sdX = Math.sqrt(sx / (n - 1));
    const sdY = Math.sqrt(sy / (n - 1));
    if (sdX === 0 || sdY === 0) {
      setError('Standard deviation of one series is zero; correlation undefined.');
      setResult(null);
      return;
    }

    const rho = sampleCov / (sdX * sdY);
    setError(null);
    setResult(rho.toFixed(6));
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='corr-x'>Series X (space or comma separated)</Label>
        <Input id='corr-x' placeholder='e.g. 1 2 3' value={xInput} onChange={(e) => setXInput(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='corr-y'>Series Y (same length)</Label>
        <Input id='corr-y' placeholder='e.g. 2 4 6' value={yInput} onChange={(e) => setYInput(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>Correlation (rho): <span className='font-semibold'>{result}</span></p>
      )}
        <div className='pt-3 text-sm text-muted-foreground'>
          <BlockMath math={'\\rho_{X,Y} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}'} />
          <div className='mt-1'>
            <p className='font-semibold'>Parameters:</p>
            <p>- Cov(X,Y): covariance between X and Y</p>
            <p>- σ_X, σ_Y: standard deviations of X and Y</p>
          </div>
        </div>
    </div>
  );
}
