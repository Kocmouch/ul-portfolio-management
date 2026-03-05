import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import BlockMath from '@matejmazur/react-katex';

export function ExpectedReturnCalculator() {
  const [weightsInput, setWeightsInput] = useState('');
  const [returnsInput, setReturnsInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const weights = parseNumberList(weightsInput);
    const returns = parseNumberList(returnsInput);

    if (!weights || !returns) {
      setError('Please enter numeric values for both weights and expected returns.');
      setResult(null);
      return;
    }

    if (weights.length !== returns.length) {
      setError('Weights and expected returns must have the same number of entries.');
      setResult(null);
      return;
    }

    const sumWeights = weights.reduce((acc, w) => acc + w, 0);
    if (Math.abs(sumWeights - 1) > 1e-6) {
      setError('Weights should sum to 1 (100%).');
      setResult(null);
      return;
    }

    const expectedReturn = weights.reduce((acc, w, i) => acc + w * returns[i]!, 0);
    setError(null);
    setResult(`${(expectedReturn * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='er-weights'>Weights</Label>
        <Input
          id='er-weights'
          placeholder='e.g. 0.5 0.3 0.2'
          value={weightsInput}
          onChange={(event) => setWeightsInput(event.target.value)}
        />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='er-returns'>Expected returns</Label>
        <Input
          id='er-returns'
          placeholder='e.g. 0.05 0.07 0.09'
          value={returnsInput}
          onChange={(event) => setReturnsInput(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          Portfolio expected return: <span className='font-semibold'>{result}</span>
        </p>
      )}
        <div className='pt-3 text-sm text-muted-foreground'>
          <BlockMath math={'E(r) = \\sum_s p(s) r(s)'} />
          <div className='mt-1'>
            <p className='font-semibold'>Parameters:</p>
            <p>- p(s): probability of state s</p>
            <p>- r(s): return in state s (decimal)</p>
          </div>
        </div>
    </div>
  );
}
