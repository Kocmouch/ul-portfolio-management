import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function JensenAlphaCalculator() {
  const [portfolioReturn, setPortfolioReturn] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [marketReturn, setMarketReturn] = useState('');
  const [beta, setBeta] = useState('');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const rp = Number(portfolioReturn);
    const rf = Number(riskFreeRate);
    const rm = Number(marketReturn);
    const b = Number(beta);

    if (![rp, rf, rm, b].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for all fields.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    const expectedFromCAPM = rf + b * (rm - rf);
    const alpha = rp - expectedFromCAPM;
    setError(null);
    setResultDecimal(alpha.toFixed(4));
    setResultPercent(`${(alpha * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='jensen-rp'>Portfolio return R_p</Label>
        <Input
          id='jensen-rp'
          placeholder='e.g. 0.095'
          value={portfolioReturn}
          onChange={(event) => setPortfolioReturn(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='jensen-rf'>Risk-free rate R_f</Label>
        <Input
          id='jensen-rf'
          placeholder='e.g. 0.02'
          value={riskFreeRate}
          onChange={(event) => setRiskFreeRate(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='jensen-rm'>Market return R_m</Label>
        <Input
          id='jensen-rm'
          placeholder='e.g. 0.08'
          value={marketReturn}
          onChange={(event) => setMarketReturn(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='jensen-beta'>Portfolio beta β_p</Label>
        <Input id='jensen-beta' placeholder='e.g. 1.1' value={beta} onChange={(event) => setBeta(event.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {!error && resultDecimal && resultPercent && (
        <div className='space-y-1 text-sm text-emerald-500'>
          <p>
            Jensen&apos;s alpha (decimal): <span className='font-semibold'>{resultDecimal}</span>
          </p>
          <p>
            Jensen&apos;s alpha (percent): <span className='font-semibold'>{resultPercent}</span>
          </p>
        </div>
      )}
    </div>
  );
}
