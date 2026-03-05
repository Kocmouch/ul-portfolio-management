import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';

function computeIRR(cashFlows: number[], guess = 0.1): number | null {
  const maxIter = 1000;
  const tol = 1e-7;
  let rate = guess;

  for (let iter = 0; iter < maxIter; iter++) {
    let npv = 0;
    let dnpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const cf = cashFlows[t]!;
      const denom = Math.pow(1 + rate, t);
      npv += cf / denom;
      if (denom !== 0) {
        dnpv -= (t * cf) / (denom * (1 + rate));
      }
    }

    if (Math.abs(npv) < tol) {
      return rate;
    }

    if (!Number.isFinite(dnpv) || dnpv === 0) {
      break;
    }

    const newRate = rate - npv / dnpv;
    if (!Number.isFinite(newRate)) {
      break;
    }
    rate = newRate;
  }

  return null;
}

export function MWRCalculator() {
  const [cashFlowsInput, setCashFlowsInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const cashFlows = parseNumberList(cashFlowsInput);
    if (!cashFlows) {
      setError('Please enter numeric values for all cash flows.');
      setResult(null);
      return;
    }

    const hasPositive = cashFlows.some((cf) => cf > 0);
    const hasNegative = cashFlows.some((cf) => cf < 0);
    if (!hasPositive || !hasNegative) {
      setError('IRR requires at least one positive and one negative cash flow.');
      setResult(null);
      return;
    }

    const irr = computeIRR(cashFlows);
    if (irr === null) {
      setError('Could not find a stable money-weighted return (IRR) for these cash flows.');
      setResult(null);
      return;
    }

    setError(null);
    setResult(`${(irr * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='mwr-cashflows'>Cash flows CF_t (periodic)</Label>
        <Input
          id='mwr-cashflows'
          placeholder='e.g. -10000 500 500 500 11500'
          value={cashFlowsInput}
          onChange={(event) => setCashFlowsInput(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          Money-weighted return (IRR): <span className='font-semibold'>{result}</span>
        </p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\sum_{t=0}^T \\frac{CF_t}{(1+IRR)^t} = 0'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- CF_t: cash flow at time t (negative for outflow)</p>
          <p>- IRR: internal rate of return (money-weighted return)</p>
        </div>
      </div>
    </div>
  );
}
