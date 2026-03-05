import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import BlockMath from '@matejmazur/react-katex';
import InteractiveChart from '@/components/ui/InteractiveChart';
import ChartJSChart from '@/components/ui/ChartJSChart';

export function GeometricAverageCalculator() {
  const [returnsInput, setReturnsInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const parsed = parseNumberList(returnsInput);
    if (!parsed || parsed.length === 0) {
      setError('Please enter numeric return values.');
      setResult(null);
      return;
    }

    const returnsArr: number[] = parsed as number[];
    if (returnsArr.some((r) => r <= -1)) {
      setError('Returns must be greater than -100% for geometric mean.');
      setResult(null);
      return;
    }

    let product = 1;
    for (const r of returnsArr) product *= 1 + r;
    const geom = Math.pow(product, 1 / returnsArr.length) - 1;
    setError(null);
    setResult(`${(geom * 100).toFixed(2)}%`);
  };

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
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>Geometric average (time-weighted): <span className='font-semibold'>{result}</span></p>
      )}
        <div className='pt-3 text-sm text-muted-foreground'>
          <BlockMath math={'r_g = \\left[\\prod_{i=1}^n (1 + r_i)\\right]^{1/n} - 1'} />
          <div className='mt-1'>
            <p className='font-semibold'>Parameters:</p>
            <p>- r_i: periodic returns (decimal)</p>
            <p>- n: number of periods</p>
          </div>
        </div>

      {series.length > 0 && (
        <div className='pt-4'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-semibold mb-2'>Interactive chart</h4>
            <div className='flex items-center gap-2'>
              <label className='text-sm text-muted-foreground'>Use Chart.js</label>
              <Button size='sm' type='button' onClick={() => setUseChartJs((s) => !s)}>{useChartJs ? 'Switch to SVG' : 'Switch to Chart.js'}</Button>
            </div>
          </div>

          {useChartJs ? (
            <ChartJSChart series={series} width={640} height={260} />
          ) : (
            <InteractiveChart series={series} width={640} height={260} />
          )}
        </div>
      )}

    </div>
  );
}
