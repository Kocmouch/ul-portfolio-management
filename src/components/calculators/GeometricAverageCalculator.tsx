import React, { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import TeX from '@matejmazur/react-katex';
import InteractiveChart from '@/components/ui/InteractiveChart';
import ChartJSChart from '@/components/ui/ChartJSChart';

export function GeometricAverageCalculator() {
  const [returnsInput, setReturnsInput] = useState('0.15 -0.05 0.10 0.12');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parseNumberList(returnsInput);
    if (!parsed || parsed.length === 0) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    const returnsArr: number[] = parsed as number[];
    if (returnsArr.some((r) => r <= -1)) {
      setError('Returns must be > -100%.');
      setResult(null);
      return;
    }

    let product = 1;
    for (const r of returnsArr) product *= 1 + r;
    const geom = Math.pow(product, 1 / returnsArr.length) - 1;
    setError(null);
    setResult(`${(geom * 100).toFixed(2)}%`);
  }, [returnsInput]);

  const series = useMemo(() => {
    const returnsArr: number[] = parseNumberList(returnsInput) ?? [];
    if (returnsArr.length === 0) return [] as any;
    const points: { x: number; y: number }[] = [];
    let cum = 1;
    for (const [idx, r] of returnsArr.entries()) {
      cum *= 1 + r;
      points.push({ x: idx + 1, y: cum });
    }
    const arith = returnsArr.reduce((a, b) => a + b, 0) / returnsArr.length;
    const arithPoints = points.map((p) => ({ x: p.x, y: Math.pow(1 + arith, p.x) }));
    return [
      { name: 'Cumulative (actual)', points, color: '#3b82f6' },
      { name: 'Arithmetic avg cumulative', points: arithPoints, color: '#ef4444' },
    ];
  }, [returnsInput]);

  const [useChartJs, setUseChartJs] = useState(false);

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='geom-returns'>Periodic returns (space or comma separated)</Label>
        <Input
          id='geom-returns'
          placeholder='e.g. 0.2 0.05 0.1 0.15'
          value={returnsInput}
          onChange={(e) => setReturnsInput(e.target.value)}
        />
      </div>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
          <p>
            Geometric average: <span className='font-bold text-base'>{result}</span>
          </p>
        </div>
      )}

      <div className='pt-3 border-t border-border mt-4'>
        <div className='text-xl mb-4'>
          <TeX block math={'\\bar{r}_g = \\left[\\prod_{i=1}^n (1 + r_i)\\right]^{1/n} - 1'} />
        </div>
        <div className='space-y-1 text-sm text-muted-foreground'>
          <p className='font-medium text-foreground mb-1'>Parameters:</p>
          <p>
            <TeX math='r_i' />: Periodic return in period <TeX math='i' />
          </p>
          <p>
            <TeX math='n' />: Total number of periods
          </p>
        </div>
      </div>

      {series.length > 0 && (
        <div className='pt-4 border-t border-border mt-4'>
          <div className='flex items-center justify-between mb-4'>
            <h4 className='text-sm font-semibold'>Cumulative growth visualization</h4>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-muted-foreground'>Engine</span>
              <Button
                size='sm'
                variant='outline'
                className='h-7 text-xs px-2'
                type='button'
                onClick={() => setUseChartJs((s) => !s)}
              >
                {useChartJs ? 'SVG' : 'Chart.js'}
              </Button>
            </div>
          </div>

          {useChartJs ?
            <ChartJSChart series={series} width={640} height={260} />
          : <InteractiveChart series={series} width={640} height={260} />}
        </div>
      )}
    </div>
  );
}

export default GeometricAverageCalculator;
