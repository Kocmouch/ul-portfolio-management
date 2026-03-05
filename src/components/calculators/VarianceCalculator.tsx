import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';

export function VarianceCalculator() {
  const [probsInput, setProbsInput] = useState('');
  const [returnsInput, setReturnsInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const probs = parseNumberList(probsInput);
    const returns = parseNumberList(returnsInput);
    if (!probs || !returns) {
      setError('Please enter numeric probabilities and returns.');
      setResult(null);
      return;
    }
    if (probs.length !== returns.length) {
      setError('Probabilities and returns must have same length.');
      setResult(null);
      return;
    }

    const sumP = probs.reduce((a, b) => a + b, 0);
    const pNormalized = probs.map((p) => p / sumP);
    const expected = returns.reduce((acc, r, i) => acc + pNormalized[i]! * r, 0);
    const variance = returns.reduce((acc, r, i) => acc + pNormalized[i]! * Math.pow(r - expected, 2), 0);
    const stddev = Math.sqrt(variance);

    setError(null);
    setResult(`E(r) = ${(expected * 100).toFixed(2)}%, Var = ${(variance * 10000).toFixed(4)} (\%^2), SD = ${(stddev * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='var-probs'>Probabilities p(s) (space or comma separated)</Label>
        <Input id='var-probs' placeholder='e.g. 0.25 0.5 0.25' value={probsInput} onChange={(e) => setProbsInput(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='var-returns'>Returns r(s) (same order)</Label>
        <Input id='var-returns' placeholder='e.g. 0.3 0.1 -0.1' value={returnsInput} onChange={(e) => setReturnsInput(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>
          <span className='font-semibold'>{result}</span>
        </p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\sigma^2 = \\sum_s p(s)[r(s) - E(r)]^2'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- p(s): probability of state s (normalized)</p>
          <p>- r(s): return in state s (decimal)</p>
          <p>- E(r): expected return</p>
        </div>
      </div>
    </div>
  );
}
