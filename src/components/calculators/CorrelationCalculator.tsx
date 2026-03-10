import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import ChartTools from '@/components/tools/ChartTools';
import TeX from '@matejmazur/react-katex';

export function CorrelationCalculator() {
  const [xInput, setXInput] = useState('0.05 0.08 -0.02 0.04');
  const [yInput, setYInput] = useState('0.04 0.07 -0.01 0.03');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);

  React.useEffect(() => {
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
      setError('Zero volatility detected.');
      setResult(null);
      return;
    }

    const rho = sampleCov / (sdX * sdY);
    setError(null);
    setResult(rho.toFixed(6));
  }, [xInput, yInput]);

  return (
    <div className='space-y-4'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='corr-x'>Series X Returns</Label>
          <Input id='corr-x' value={xInput} onChange={(e) => setXInput(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='corr-y'>Series Y Returns</Label>
          <Input id='corr-y' value={yInput} onChange={(e) => setYInput(e.target.value)} />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button type='button' size='sm' variant='outline' onClick={() => setShowChart((s) => !s)}>
          {showChart ? 'Hide chart' : 'Show scatter plot'}
        </Button>
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
          <p>
            Correlation coefficient <TeX math='\rho_{X,Y}' />: <span className='font-bold text-base'>{result}</span>
          </p>
        </div>
      )}

      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-xl mb-4'>
          <TeX block math={'\\rho_{X,Y} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='\\text{Cov}(X,Y)' />: Covariance between <TeX math='X' /> and <TeX math='Y' />
          </p>
          <p>
            <TeX math='\\sigma_X, \\sigma_Y' />: Standard deviations of <TeX math='X' /> and <TeX math='Y' />
          </p>
        </div>
      </div>

      {showChart && (xInput.trim() || yInput.trim()) && (
        <div className='mt-4 border-t border-border pt-4'>
          <ChartTools chartType='scatter' xInput={xInput} yInput={yInput} compact />
        </div>
      )}
    </div>
  );
}
