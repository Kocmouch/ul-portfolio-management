import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function SharpeRatioCalculator() {
  const [portfolioReturn, setPortfolioReturn] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [volatility, setVolatility] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const rp = Number(portfolioReturn);
    const rf = Number(riskFreeRate);
    const sigma = Number(volatility);

    if (![rp, rf, sigma].every((value) => Number.isFinite(value))) {
      setError('Please enter numeric values for all fields.');
      setResult(null);
      return;
    }

    if (sigma <= 0) {
      setError('Volatility must be greater than zero.');
      setResult(null);
      return;
    }

    const sharpe = (rp - rf) / sigma;
    setError(null);
    setResult(sharpe.toFixed(2));
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='sr-rp'>Portfolio expected return</Label>
        <Input
          id='sr-rp'
          placeholder='e.g. 0.08'
          value={portfolioReturn}
          onChange={(event) => setPortfolioReturn(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='sr-rf'>Risk-free rate</Label>
        <Input
          id='sr-rf'
          placeholder='e.g. 0.02'
          value={riskFreeRate}
          onChange={(event) => setRiskFreeRate(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='sr-sigma'>Portfolio volatility</Label>
        <Input id='sr-sigma' placeholder='e.g. 0.12' value={volatility} onChange={(event) => setVolatility(event.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-300'>
          Sharpe ratio: <span className='font-semibold'>{result}</span>
        </p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\text{Sharpe} = \\frac{E(R_p) - R_f}{\\sigma_p}'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- E(R_p): portfolio expected return (decimal)</p>
          <p>- R_f: risk-free rate (decimal)</p>
          <p>- σ_p: portfolio volatility (standard deviation)</p>
        </div>
      </div>
    </div>
  );
}
