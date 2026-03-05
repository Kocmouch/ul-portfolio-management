import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PlotlyChart from '@/components/ui/PlotlyChart';
import InteractiveChart from '@/components/ui/InteractiveChart';
import {
  computeCumulativeSeries,
  arithmeticAvgSeries,
  computeGeometricAverage,
  computeRegressionSeries,
  computeHistogramSeries,
} from '@/lib/chartUtils';
import type { Series as PlotlySeries } from '@/components/ui/PlotlyChart';
import type { Series as InteractiveSeries } from '@/components/ui/InteractiveChart';

export function ChartTools() {
  type ChartType = 'returns' | 'regression' | 'histogram';
  const chartOptions: { value: ChartType; label: string }[] = [
    { value: 'returns', label: 'Returns / cumulative' },
    { value: 'regression', label: 'Regression (x vs y)' },
    { value: 'histogram', label: 'Histogram' },
  ];

  const [chartType, setChartType] = useState<ChartType>('returns');
  const [returnsInput, setReturnsInput] = useState('0.02 0.03 -0.01 0.05 0.02');
  const [xInput, setXInput] = useState('1 2 3 4 5');
  const [yInput, setYInput] = useState('2 4 1 3 5');
  const [histInput, setHistInput] = useState('1 2 2 3 4 4 4 5 6');
  const [histBins, setHistBins] = useState(5);
  const [usePlotly, setUsePlotly] = useState(true);

  // compute derived data based on chartType
  type LocalSeries = PlotlySeries & { visible?: boolean };

  const { series, xLabel, yLabel, extraInfo } = React.useMemo<{
    series: LocalSeries[];
    xLabel: string;
    yLabel: string;
    extraInfo: string | null;
  }>(() => {
    switch (chartType) {
      case 'returns': {
        const cumulative = computeCumulativeSeries(returnsInput);
        const arith = arithmeticAvgSeries(returnsInput);
        const geom = computeGeometricAverage(returnsInput);
        return {
          series: [
            { name: 'Cumulative (actual)', points: cumulative, color: '#3b82f6' },
            { name: 'Arithmetic avg', points: arith, color: '#ef4444' },
          ],
          xLabel: 'Period',
          yLabel: 'Cumulative factor',
          extraInfo: geom == null ? null : `Geometric avg ${ (geom * 100).toFixed(2) }%`,
        };
      }
      case 'regression': {
        const reg = computeRegressionSeries(xInput, yInput);
        if (reg == null) {
          return { series: [], xLabel: 'x', yLabel: 'y', extraInfo: 'invalid input' };
        }
        return {
          series: [
            { name: 'Data', points: reg.scatter, color: '#3b82f6', type: 'scatter' },
            { name: 'Fit line', points: reg.line, color: '#ef4444', type: 'scatter' },
          ],
          xLabel: 'x',
          yLabel: 'y',
          extraInfo: `slope ${reg.slope.toFixed(3)}, intercept ${reg.intercept.toFixed(3)}`,
        };
      }
      case 'histogram': {
        const hist = computeHistogramSeries(histInput, histBins);
        return {
          series: [{ name: 'Count', points: hist, color: '#3b82f6', type: 'bar' }],
          xLabel: 'Value',
          yLabel: 'Count',
          extraInfo: null,
        };
      }
    }
  }, [chartType, returnsInput, xInput, yInput, histInput, histBins]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <Label>Chart</Label>
        <select
          className='border border-gray-300 rounded px-2 py-1'
          value={chartType}
          onChange={(e) => setChartType(e.target.value as ChartType)}
        >
          {chartOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* inputs */}
      {chartType === 'returns' && (
        <div className='space-y-1'>
          <Label htmlFor='chart-returns'>Sample returns (space separated)</Label>
          <Input id='chart-returns' value={returnsInput} onChange={(e) => setReturnsInput(e.target.value)} />
        </div>
      )}

      {chartType === 'regression' && (
        <div className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor='chart-x'>X values (space separated)</Label>
            <Input id='chart-x' value={xInput} onChange={(e) => setXInput(e.target.value)} />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='chart-y'>Y values (space separated)</Label>
            <Input id='chart-y' value={yInput} onChange={(e) => setYInput(e.target.value)} />
          </div>
        </div>
      )}

      {chartType === 'histogram' && (
        <div className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor='chart-hist'>Values (space separated)</Label>
            <Input id='chart-hist' value={histInput} onChange={(e) => setHistInput(e.target.value)} />
          </div>
          <div className='space-y-1 flex items-center gap-2'>
            <Label htmlFor='chart-bins'>Bins</Label>
            <Input
              id='chart-bins'
              type='number'
              value={histBins}
              onChange={(e) => setHistBins(parseInt(e.target.value) || 0)}
              className='w-16'
            />
          </div>
        </div>
      )}

      {/* controls */}
      <div className='flex items-center gap-2'>
        <Button size='sm' type='button' onClick={() => setUsePlotly((s) => !s)}>
          {usePlotly ? 'Plotly' : 'SVG'}
        </Button>
        {extraInfo && <div className='text-sm text-muted-foreground'>{extraInfo}</div>}
      </div>

      {/* chart display */}
      <div>
        {usePlotly ? (
          <PlotlyChart series={series as PlotlySeries[]} xLabel={xLabel} yLabel={yLabel} />
        ) : (
          <InteractiveChart series={series as InteractiveSeries[]} xLabel={xLabel} yLabel={yLabel} />
        )}
      </div>
    </div>
  );
}

export default ChartTools;
