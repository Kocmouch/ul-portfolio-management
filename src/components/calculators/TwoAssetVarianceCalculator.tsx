import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';

export function TwoAssetVarianceCalculator() {
  const [w1, setW1] = useState('0.6');
  const [w2, setW2] = useState('0.4');
  const [sigma1, setSigma1] = useState('0.15');
  const [sigma2, setSigma2] = useState('0.10');
  const [rho, setRho] = useState('0.3');
  const [resultVar, setResultVar] = useState<string | null>(null);
  const [resultVol, setResultVol] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const w1Num = Number(w1);
    const w2Num = Number(w2);
    const s1Num = Number(sigma1);
    const s2Num = Number(sigma2);
    const rhoNum = Number(rho);

    if (![w1Num, w2Num, s1Num, s2Num, rhoNum].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResultVar(null);
      setResultVol(null);
      return;
    }

    if (Math.abs(w1Num + w2Num - 1) > 0.05) {
      setError('Weights should sum to ~1.0');
    } else {
      setError(null);
    }

    if (rhoNum < -1 || rhoNum > 1) {
      setError('Correlation must be between -1 and 1.');
      setResultVar(null);
      setResultVol(null);
      return;
    }

    const variance = w1Num * w1Num * s1Num * s1Num + w2Num * w2Num * s2Num * s2Num + 2 * w1Num * w2Num * rhoNum * s1Num * s2Num;
    const volatility = Math.sqrt(Math.max(variance, 0));

    setResultVar(variance.toFixed(6));
    setResultVol(`${(volatility * 100).toFixed(2)}%`);
  }, [w1, w2, sigma1, sigma2, rho]);

  return (
    <div className='space-y-3'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='tav-w1'>
            Weight <TeX math='w_1' />
          </Label>
          <Input id='tav-w1' value={w1} onChange={(event) => setW1(event.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='tav-w2'>
            Weight <TeX math='w_2' />
          </Label>
          <Input id='tav-w2' value={w2} onChange={(event) => setW2(event.target.value)} />
        </div>
      </div>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='tav-s1'>
            Volatility <TeX math='\\sigma_1' />
          </Label>
          <Input id='tav-s1' value={sigma1} onChange={(event) => setSigma1(event.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='tav-s2'>
            Volatility <TeX math='\\sigma_2' />
          </Label>
          <Input id='tav-s2' value={sigma2} onChange={(event) => setSigma2(event.target.value)} />
        </div>
      </div>
      <div className='space-y-1'>
        <Label htmlFor='tav-rho'>
          Correlation <TeX math='\\rho_{12}' />
        </Label>
        <Input id='tav-rho' value={rho} onChange={(event) => setRho(event.target.value)} />
      </div>

      {error && <p className='text-sm text-amber-500'>{error}</p>}
      {resultVar && resultVol && (
        <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20 space-y-1'>
          <p>
            Variance <TeX math='\\sigma_p^2' />: <span className='font-bold'>{resultVar}</span>
          </p>
          <p>
            Volatility <TeX math='\\sigma_p' />: <span className='font-bold text-base'>{resultVol}</span>
          </p>
        </div>
      )}

      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-xl mb-4'>
          <TeX block math={'\\sigma_p^2 = w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\rho_{12} \\sigma_1 \\sigma_2'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='w_i' />: Weight of asset <TeX math='i' />
          </p>
          <p>
            <TeX math='\\sigma_i' />: Volatility (risk) of asset <TeX math='i' />
          </p>
          <p>
            <TeX math='\\rho_{12}' />: Correlation between the two assets
          </p>
        </div>
      </div>
    </div>
  );
}
