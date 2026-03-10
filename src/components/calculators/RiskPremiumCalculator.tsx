import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';

export function RiskPremiumCalculator() {
  const [expected, setExpected] = useState('0.10');
  const [riskFree, setRiskFree] = useState('0.03');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const er = Number(expected);
    const rf = Number(riskFree);
    if (![er, rf].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    const rp = er - rf;
    setError(null);
    setResult(`${(rp * 100).toFixed(2)}%`);
  }, [expected, riskFree]);

  return (
    <div className='space-y-4'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div className='space-y-1'>
          <Label htmlFor='rp-expected'>
            Expected Return <TeX math='E(R)' />
          </Label>
          <Input id='rp-expected' value={expected} onChange={(e) => setExpected(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='rp-rf'>
            Risk-free Rate <TeX math='R_f' />
          </Label>
          <Input id='rp-rf' value={riskFree} onChange={(e) => setRiskFree(e.target.value)} />
        </div>
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
          <p>
            Risk Premium: <span className='font-bold text-base'>{result}</span>
          </p>
        </div>
      )}

      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-xl mb-4'>
          <TeX block math={'RP = E(R) - R_f'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='E(R)' />: Expected return of the asset or portfolio
          </p>
          <p>
            <TeX math='R_f' />: Promised return on a risk-free asset
          </p>
        </div>
      </div>
    </div>
  );
}
