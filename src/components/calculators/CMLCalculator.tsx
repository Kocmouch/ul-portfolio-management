import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CMLCalculator() {
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [marketReturn, setMarketReturn] = useState('');
  const [marketVolatility, setMarketVolatility] = useState('');
  const [portfolioVolatility, setPortfolioVolatility] = useState('');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const rf = Number(riskFreeRate);
    const rm = Number(marketReturn);
    const sigmaM = Number(marketVolatility);
    const sigmaP = Number(portfolioVolatility);

    if (![rf, rm, sigmaM, sigmaP].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for all fields.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    if (sigmaM === 0) {
      setError('Market volatility σ_m must be non-zero.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    const expectedReturn = rf + ((rm - rf) / sigmaM) * sigmaP;
    setError(null);
    setResultDecimal(expectedReturn.toFixed(4));
    setResultPercent(`${(expectedReturn * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='cml-rf'>Risk-free rate R_f</Label>
        <Input
          id='cml-rf'
          placeholder='e.g. 0.02'
          value={riskFreeRate}
          onChange={(event) => setRiskFreeRate(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='cml-rm'>Expected market return E(R_m)</Label>
        <Input
          id='cml-rm'
          placeholder='e.g. 0.08'
          value={marketReturn}
          onChange={(event) => setMarketReturn(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='cml-sigma-m'>Market volatility σ_m</Label>
        <Input
          id='cml-sigma-m'
          placeholder='e.g. 0.18'
          value={marketVolatility}
          onChange={(event) => setMarketVolatility(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='cml-sigma-p'>Chosen portfolio volatility σ_p</Label>
        <Input
          id='cml-sigma-p'
          placeholder='e.g. 0.12'
          value={portfolioVolatility}
          onChange={(event) => setPortfolioVolatility(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {!error && resultDecimal && resultPercent && (
        <div className='space-y-1 text-sm text-emerald-500'>
          <p>
            Expected portfolio return (decimal): <span className='font-semibold'>{resultDecimal}</span>
          </p>
          <p>
            Expected portfolio return (percent): <span className='font-semibold'>{resultPercent}</span>
          </p>
        </div>
      )}
    </div>
  );
}
