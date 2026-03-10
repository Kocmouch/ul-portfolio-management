import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { parseNumberList } from '@/lib/calculatorUtils';
import ChartTools from '@/components/tools/ChartTools';

function ArithmeticAverageCalculator() {
  const [returnsInput, setReturnsInput] = useState('0.12 -0.05 0.08 0.15');
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
        <p className='text-sm text-emerald-500'>
          Arithmetic average: <span className='font-semibold'>{result}</span>
        </p>
      )}
      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-md mb-4'>
          <TeX block math={'\\bar{r} = \\frac{1}{n} \\sum_{i=1}^n r_i'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='r_i' />: Periodic return in period <TeX math='i' />
          </p>
          <p>
            <TeX math='n' />: Number of periods
          </p>
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

export default ArithmeticAverageCalculator;
