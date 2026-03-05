import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function CAPMCalculator() {
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [beta, setBeta] = useState('');
  const [marketReturn, setMarketReturn] = useState('');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const rf = Number(riskFreeRate);
    const b = Number(beta);
    const rm = Number(marketReturn);

    if (![rf, b, rm].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for all fields.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    const expectedReturn = rf + b * (rm - rf);
    setError(null);
    setResultDecimal(expectedReturn.toFixed(4));
    setResultPercent(`${(expectedReturn * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='capm-rf'>Risk-free rate R_f</Label>
        <Input
          id='capm-rf'
          placeholder='e.g. 0.02'
          value={riskFreeRate}
          onChange={(event) => setRiskFreeRate(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='capm-beta'>Asset beta β_i</Label>
        <Input id='capm-beta' placeholder='e.g. 1.2' value={beta} onChange={(event) => setBeta(event.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='capm-rm'>Expected market return E(R_m)</Label>
        <Input
          id='capm-rm'
          placeholder='e.g. 0.08'
          value={marketReturn}
          onChange={(event) => setMarketReturn(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {!error && resultDecimal && resultPercent && (
        <div className='space-y-1 text-sm text-emerald-500'>
          <p>
            Expected return (decimal): <span className='font-semibold'>{resultDecimal}</span>
          </p>
          <p>
            Expected return (percent): <span className='font-semibold'>{resultPercent}</span>
          </p>
        </div>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'E(R_i) = R_f + \\beta_i [E(R_M) - R_f]'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- R_f: risk-free rate (decimal)</p>
          <p>- β_i: asset beta (sensitivity to market)</p>
          <p>- E(R_M): expected market return (decimal)</p>
        </div>
      </div>
    </div>
  );
}
