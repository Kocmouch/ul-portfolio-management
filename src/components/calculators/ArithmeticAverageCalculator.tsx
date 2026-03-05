import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlockMath from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';
import ChartTools from '@/components/tools/ChartTools';

export function ArithmeticAverageCalculator() {
  const [returnsInput, setReturnsInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);

  // compute on input change
  React.useEffect(() => {
    const returns = parseNumberList(returnsInput);
    if (!returns || returns.length === 0) {
      setError('Please enter numeric return values.');
      setResult(null);
      return;
    }
    const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
    setError(null);
    setResult(`${(avg * 100).toFixed(2)}%`);
  }, [returnsInput]);

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='arith-returns'>Periodic returns (space or comma separated)</Label>
        <Input
          id='arith-returns'
          placeholder='e.g. 0.2 0.05 0.1 0.15'
          value={returnsInput}
          onChange={(e) => setReturnsInput(e.target.value)}
        />
      </div>
      <div className='flex items-center gap-2'>
        <Button type='button' size='sm' variant='outline' onClick={() => setShowChart((s) => !s)}>
          {showChart ? 'Hide chart' : 'Show chart'}
        </Button>
        {error && <p className='text-sm text-destructive'>{error}</p>}
      </div>
      {result && !error && (
        <p className='text-sm text-emerald-500'>Arithmetic average: <span className='font-semibold'>{result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'\\text{Arithmetic Average} = \\frac{1}{n} \\sum_{i=1}^n r_i'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- r_i: periodic returns (decimal)</p>
          <p>- n: number of periods</p>
        </div>
      </div>

      {/* chart preview, shown after toggle */}
      {showChart && returnsInput.trim() && (
        <div className='mt-4'>
          <ChartTools chartType='returns' returnsInput={returnsInput} compact />
        </div>
      )}
    </div>
  );
}
