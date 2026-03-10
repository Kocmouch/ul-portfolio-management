import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';

export function PortfolioWeightsCalculator() {
  const [valuesInput, setValuesInput] = useState('10000 15000 5000');
  const [result, setResult] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const values = parseNumberList(valuesInput);
    if (!values || values.length === 0) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    const total = values.reduce((acc, v) => acc + v, 0);
    if (total <= 0) {
      setError('Total value must be > 0.');
      setResult(null);
      return;
    }

    const weights = values.map((v, index) => {
      const w = v / total;
      return `Asset ${index + 1}: ${(w * 100).toFixed(2)}%`;
    });

    setError(null);
    setResult(weights);
  }, [valuesInput]);

  return (
    <div className='space-y-4'>
      <div className='space-y-1'>
        <Label htmlFor='pw-values'>Asset market values (space or comma separated)</Label>
        <Input id='pw-values' value={valuesInput} onChange={(event) => setValuesInput(event.target.value)} />
      </div>

      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
          <p className='font-medium mb-1'>Calculated weights:</p>
          <ul className='list-disc space-y-1 pl-5'>
            {result.map((line) => (
              <li key={line} className='font-medium'>
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-xl mb-4'>
          <TeX block math={'w_i = \\frac{V_i}{\\sum_{j=1}^n V_j}'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='V_i' />: Market value of asset <TeX math='i' />
          </p>
          <p>
            <TeX math='\sum V_j' />: Total market value of the portfolio
          </p>
        </div>
      </div>
    </div>
  );
}
