import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function TreynorCalculator() {
  const [portfolioReturn, setPortfolioReturn] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [beta, setBeta] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const rp = Number(portfolioReturn);
    const rf = Number(riskFreeRate);
    const b = Number(beta);

    if (![rp, rf, b].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for all fields.');
      setResult(null);
      return;
    }

    if (b === 0) {
      setError('Portfolio beta must be non-zero.');
      setResult(null);
      return;
    }

    const treynor = (rp - rf) / b;
    setError(null);
    setResult(treynor.toFixed(3));
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='treynor-rp'>Portfolio return R_p</Label>
        <Input
          id='treynor-rp'
          placeholder='e.g. 0.09'
          value={portfolioReturn}
          onChange={(event) => setPortfolioReturn(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='treynor-rf'>Risk-free rate R_f</Label>
        <Input
          id='treynor-rf'
          placeholder='e.g. 0.02'
          value={riskFreeRate}
          onChange={(event) => setRiskFreeRate(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='treynor-beta'>Portfolio beta β_p</Label>
        <Input id='treynor-beta' placeholder='e.g. 1.1' value={beta} onChange={(event) => setBeta(event.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          Treynor ratio: <span className='font-semibold'>{result}</span>
        </p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\text{Treynor} = \\frac{E(R_p) - R_f}{\\beta_p}'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- E(R_p): portfolio expected return (decimal)</p>
          <p>- R_f: risk-free rate (decimal)</p>
          <p>- β_p: portfolio beta (systematic risk)</p>
        </div>
      </div>
    </div>
  );
}
