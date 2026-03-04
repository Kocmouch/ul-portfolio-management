import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function MSquaredCalculator() {
  const [sharpe, setSharpe] = useState('');
  const [marketVolatility, setMarketVolatility] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [marketReturn, setMarketReturn] = useState('');
  const [resultM2, setResultM2] = useState<string | null>(null);
  const [resultExcess, setResultExcess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const s = Number(sharpe);
    const sigmaM = Number(marketVolatility);
    const rf = Number(riskFreeRate);
    const rm = marketReturn === '' ? null : Number(marketReturn);

    if (![s, sigmaM, rf].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for Sharpe ratio, market volatility, and risk-free rate.');
      setResultM2(null);
      setResultExcess(null);
      return;
    }

    const m2 = rf + s * sigmaM;
    let excess: number | null = null;
    if (rm !== null && Number.isFinite(rm)) {
      excess = m2 - rm;
    }

    setError(null);
    setResultM2(`${(m2 * 100).toFixed(2)}%`);
    setResultExcess(excess !== null ? `${(excess * 100).toFixed(2)}%` : null);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='m2-sharpe'>Portfolio Sharpe ratio S_p</Label>
        <Input id='m2-sharpe' placeholder='e.g. 0.8' value={sharpe} onChange={(event) => setSharpe(event.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='m2-sigma-m'>Market volatility σ_m</Label>
        <Input
          id='m2-sigma-m'
          placeholder='e.g. 0.15'
          value={marketVolatility}
          onChange={(event) => setMarketVolatility(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='m2-rf'>Risk-free rate R_f</Label>
        <Input
          id='m2-rf'
          placeholder='e.g. 0.02'
          value={riskFreeRate}
          onChange={(event) => setRiskFreeRate(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='m2-rm'>Benchmark return R_m (optional)</Label>
        <Input
          id='m2-rm'
          placeholder='e.g. 0.07'
          value={marketReturn}
          onChange={(event) => setMarketReturn(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {!error && resultM2 && (
        <div className='space-y-1 text-sm text-emerald-500'>
          <p>
            M-squared (M²) return: <span className='font-semibold'>{resultM2}</span>
          </p>
          {resultExcess && (
            <p>
              Excess over benchmark: <span className='font-semibold'>{resultExcess}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
