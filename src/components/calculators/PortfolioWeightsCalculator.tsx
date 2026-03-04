import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';

export function PortfolioWeightsCalculator() {
  const [valuesInput, setValuesInput] = useState('');
  const [result, setResult] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const values = parseNumberList(valuesInput);
    if (!values) {
      setError('Please enter numeric values for all asset values.');
      setResult(null);
      return;
    }

    const total = values.reduce((acc, v) => acc + v, 0);
    if (total <= 0) {
      setError('Total portfolio value must be greater than zero.');
      setResult(null);
      return;
    }

    const weights = values.map((v, index) => {
      const w = v / total;
      return `Asset ${index + 1}: ${(w * 100).toFixed(2)}%`;
    });

    setError(null);
    setResult(weights);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='pw-values'>Asset values</Label>
        <Input
          id='pw-values'
          placeholder='e.g. 10000 15000 5000'
          value={valuesInput}
          onChange={(event) => setValuesInput(event.target.value)}
        />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <ul className='list-disc space-y-1 pl-5 text-sm text-emerald-500'>
          {result.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
