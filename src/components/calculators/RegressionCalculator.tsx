import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';
import ChartTools from '@/components/tools/ChartTools';

export function RegressionCalculator() {
  const [xInput, setXInput] = useState('1 2 3 4 5');
  const [yInput, setYInput] = useState('2.1 3.9 6.2 8.1 10.2');
  const [interceptResult, setInterceptResult] = useState<string | null>(null);
  const [slopeResult, setSlopeResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);

  React.useEffect(() => {
    const x = parseNumberList(xInput);
    const y = parseNumberList(yInput);
    if (!x || !y) {
      setError('Please enter numeric values.');
      setInterceptResult(null);
      setSlopeResult(null);
      return;
    }
    if (x.length !== y.length) {
      setError('Series must have same length.');
      setInterceptResult(null);
      setSlopeResult(null);
      return;
    }

    const n = x.length;
    if (n < 2) {
      setError('Need at least 2 points.');
      setInterceptResult(null);
      setSlopeResult(null);
      return;
    }

    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    let num = 0;
    let den = 0;
    for (let i = 0; i < n; i++) {
      num += (x[i]! - meanX) * (y[i]! - meanY);
      den += (x[i]! - meanX) * (x[i]! - meanX);
    }
    if (den === 0) {
      setError('Zero variance in X detected.');
      setInterceptResult(null);
      setSlopeResult(null);
      return;
    }
    const slope = num / den;
    const intercept = meanY - slope * meanX;
    setError(null);
    setSlopeResult(slope.toFixed(4));
    setInterceptResult(intercept.toFixed(4));
  }, [xInput, yInput]);

  return (
    <div className='space-y-4'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='reg-x'>Independent X (Returns/Values)</Label>
          <Input id='reg-x' value={xInput} onChange={(e) => setXInput(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='reg-y'>Dependent Y (Returns/Values)</Label>
          <Input id='reg-y' value={yInput} onChange={(e) => setYInput(e.target.value)} />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button type='button' size='sm' variant='outline' onClick={() => setShowChart((s) => !s)}>
          {showChart ? 'Hide chart' : 'Show regression chart'}
        </Button>
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}
      {slopeResult && interceptResult && !error && (
        <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
          <p>
            Regression Model:{' '}
            <span className='font-bold text-base'>
              Y = {interceptResult} + {slopeResult}X
            </span>
          </p>
          <div className='mt-1 text-xs opacity-80 grid grid-cols-2'>
            <p>Intercept (a): {interceptResult}</p>
            <p>Slope (b): {slopeResult}</p>
          </div>
        </div>
      )}

      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-xl mb-4'>
          <TeX block math={'Y_i = a + b X_i + \\varepsilon_i'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='a' />: Intercept (value of <TeX math='Y' /> when <TeX math='X=0' />)
          </p>
          <p>
            <TeX math='b' />: Slope coefficient (change in <TeX math='Y' /> for unit change in <TeX math='X' />)
          </p>
          <p>
            <TeX math='\\varepsilon_i' />: Residual (error) term
          </p>
        </div>
      </div>

      {showChart && (xInput.trim() || yInput.trim()) && (
        <div className='mt-4 border-t border-border pt-4'>
          <ChartTools chartType='regression' xInput={xInput} yInput={yInput} compact />
        </div>
      )}
    </div>
  );
}
