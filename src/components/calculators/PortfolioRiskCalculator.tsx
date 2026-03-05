import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';

export function PortfolioRiskCalculator() {
  const [weightsInput, setWeightsInput] = useState('');
  const [variancesInput, setVariancesInput] = useState('');
  const [avgCorrelation, setAvgCorrelation] = useState('0');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const weights = parseNumberList(weightsInput);
    const variances = parseNumberList(variancesInput);
    const rho = Number(avgCorrelation);

    if (!weights || !variances || !Number.isFinite(rho)) {
      setError('Please enter numeric values for weights, variances, and average correlation.');
      setResult(null);
      return;
    }

    if (weights.length !== variances.length) {
      setError('Weights and variances must have the same number of entries.');
      setResult(null);
      return;
    }

    const sumWeights = weights.reduce((acc, w) => acc + w, 0);
    if (Math.abs(sumWeights - 1) > 1e-6) {
      setError('Weights should sum to 1 (100%).');
      setResult(null);
      return;
    }

    if (rho < -1 || rho > 1) {
      setError('Average correlation must be between -1 and 1.');
      setResult(null);
      return;
    }

    const n = weights.length;
    let variance = 0;

    // Individual variance terms: w_i^2 * var_i
    for (let i = 0; i < n; i++) {
      const wi = weights[i]!;
      const vi = variances[i]!;
      variance += wi * wi * vi;
    }

    // Approximate covariance terms assuming a single average correlation.
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const vi = variances[i]!;
        const vj = variances[j]!;
        const wi = weights[i]!;
        const wj = weights[j]!;
        const cov = rho * Math.sqrt(vi) * Math.sqrt(vj);
        variance += 2 * wi * wj * cov;
      }
    }

    const volatility = Math.sqrt(Math.max(variance, 0));
    setError(null);
    setResult(`${(volatility * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='risk-weights'>Weights</Label>
        <Input
          id='risk-weights'
          placeholder='e.g. 0.4 0.4 0.2'
          value={weightsInput}
          onChange={(event) => setWeightsInput(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='risk-vars'>Variances</Label>
        <Input
          id='risk-vars'
          placeholder='e.g. 0.04 0.09 0.01'
          value={variancesInput}
          onChange={(event) => setVariancesInput(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='risk-rho'>Average correlation (ρ)</Label>
        <Input
          id='risk-rho'
          placeholder='e.g. 0.3'
          value={avgCorrelation}
          onChange={(event) => setAvgCorrelation(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          Approximate portfolio volatility: <span className='font-semibold'>{result}</span>
        </p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\sigma_p^2 = \\sum_{i=1}^N \\sum_{j=1}^N w_i w_j \\text{Cov}(R_i, R_j)'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- w_i: weight of asset i (decimal)</p>
          <p>- Cov(R_i,R_j): covariance between returns of assets i and j</p>
        </div>
      </div>
    </div>
  );
}
