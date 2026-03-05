import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function TwoAssetVarianceCalculator() {
  const [w1, setW1] = useState('');
  const [w2, setW2] = useState('');
  const [sigma1, setSigma1] = useState('');
  const [sigma2, setSigma2] = useState('');
  const [rho, setRho] = useState('');
  const [resultVar, setResultVar] = useState<string | null>(null);
  const [resultVol, setResultVol] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const w1Num = Number(w1);
    const w2Num = Number(w2);
    const s1Num = Number(sigma1);
    const s2Num = Number(sigma2);
    const rhoNum = Number(rho);

    if (![w1Num, w2Num, s1Num, s2Num, rhoNum].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for all fields.');
      setResultVar(null);
      setResultVol(null);
      return;
    }

    if (Math.abs(w1Num + w2Num - 1) > 1e-6) {
      setError('Weights w₁ and w₂ should sum to 1 (100%).');
      setResultVar(null);
      setResultVol(null);
      return;
    }

    if (rhoNum < -1 || rhoNum > 1) {
      setError('Correlation ρ must be between -1 and 1.');
      setResultVar(null);
      setResultVol(null);
      return;
    }

    const variance = w1Num * w1Num * s1Num * s1Num + w2Num * w2Num * s2Num * s2Num + 2 * w1Num * w2Num * rhoNum * s1Num * s2Num;

    const volatility = Math.sqrt(Math.max(variance, 0));

    setError(null);
    setResultVar(variance.toFixed(6));
    setResultVol(`${(volatility * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='tav-w1'>Weight w₁</Label>
          <Input id='tav-w1' placeholder='e.g. 0.6' value={w1} onChange={(event) => setW1(event.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='tav-w2'>Weight w₂</Label>
          <Input id='tav-w2' placeholder='e.g. 0.4' value={w2} onChange={(event) => setW2(event.target.value)} />
        </div>
      </div>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='tav-s1'>Volatility σ₁</Label>
          <Input id='tav-s1' placeholder='e.g. 0.15' value={sigma1} onChange={(event) => setSigma1(event.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='tav-s2'>Volatility σ₂</Label>
          <Input id='tav-s2' placeholder='e.g. 0.08' value={sigma2} onChange={(event) => setSigma2(event.target.value)} />
        </div>
      </div>
      <div className='space-y-1'>
        <Label htmlFor='tav-rho'>Correlation ρ₁₂</Label>
        <Input id='tav-rho' placeholder='e.g. 0.3' value={rho} onChange={(event) => setRho(event.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {!error && resultVar && resultVol && (
        <div className='space-y-1 text-sm text-emerald-500'>
          <p>
            Portfolio variance σₚ²: <span className='font-semibold'>{resultVar}</span>
          </p>
          <p>
            Portfolio volatility σₚ: <span className='font-semibold'>{resultVol}</span>
          </p>
        </div>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\sigma_p^2 = w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\rho_{12} \\sigma_1 \\sigma_2'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- w_i: weight of asset i in the portfolio (decimal)</p>
          <p>- σ_i: volatility (standard deviation) of asset i</p>
          <p>- ρ_12: correlation between asset returns</p>
        </div>
      </div>
    </div>
  );
}
