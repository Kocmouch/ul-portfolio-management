import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';

export function BetaCalculator() {
  const [covariance, setCovariance] = useState('');
  const [marketVariance, setMarketVariance] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const covNum = Number(covariance);
    const varNum = Number(marketVariance);

    if (![covNum, varNum].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values for covariance and market variance.');
      setResult(null);
      return;
    }

    if (varNum === 0) {
      setError('Market variance must be non-zero.');
      setResult(null);
      return;
    }

    const beta = covNum / varNum;
    setError(null);
    setResult(beta.toFixed(3));
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='beta-cov'>Covariance Cov(R_i, R_m)</Label>
        <Input
          id='beta-cov'
          placeholder='e.g. 0.018'
          value={covariance}
          onChange={(event) => setCovariance(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='beta-var'>Market variance Var(R_m)</Label>
        <Input
          id='beta-var'
          placeholder='e.g. 0.012'
          value={marketVariance}
          onChange={(event) => setMarketVariance(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          Beta: <span className='font-semibold'>{result}</span>
        </p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\beta_i = \\frac{\\text{Cov}(R_i, R_M)}{\\text{Var}(R_M)}'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- Cov(R_i, R_M): covariance of asset and market returns</p>
          <p>- Var(R_M): variance of market returns</p>
        </div>
      </div>
    </div>
  );
}
