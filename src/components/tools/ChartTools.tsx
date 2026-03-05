// A lightweight utility component used on the Tools page and in calculators when
// a quick visualisation of numeric data is useful.  The selector allows the
// user (or a parent component, if extended) to choose from a variety of
// chart types; the underlying series builders live in `lib/chartUtils.ts` so
// that calculators can re‑use them programmatically.
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import ChartJSChart from '@/components/ui/ChartJSChart';
import InteractiveChart from '@/components/ui/InteractiveChart';
import {
  computeCumulativeSeries,
  arithmeticAvgSeries,
  computeGeometricAverage,
  computeRegressionSeries,
  computeHistogramSeries,
  computeSeriesFromList,
  computeXYSeries,
} from '@/lib/chartUtils';
import type { Series as ChartSeries } from '@/components/ui/ChartJSChart';
import type { Series as InteractiveSeries } from '@/components/ui/InteractiveChart';

export type ChartType = 'returns' | 'regression' | 'histogram' | 'scatter' | 'line' | 'bar';

export interface ChartToolsProps {
  /** When rendered inside a calculator, pre‑select a type. */
  chartType?: ChartType;
  /** Take provided values as initial/input data.  If `compact` is set the
   * parent component is expected to control all inputs; controls will be
   * hidden. */
  returnsInput?: string;
  xInput?: string;
  yInput?: string;
  simpleInput?: string;
  histInput?: string;
  histBins?: number;
  /** if true, do not render the selector or data entry fields; just display
   * the resulting chart and the Chart.js/SVG toggle. */
  compact?: boolean;
}

export function ChartTools({
  chartType: propType,
  returnsInput: propReturns,
  xInput: propX,
  yInput: propY,
  simpleInput: propSimple,
  histInput: propHist,
  histBins: propHistBins,
  compact = false,
}: ChartToolsProps = {}) {
  type ChartType = 'returns' | 'regression' | 'histogram' | 'scatter' | 'line' | 'bar';
  const chartOptions: { value: ChartType; label: string }[] = [
    { value: 'returns', label: 'Returns / cumulative' },
    { value: 'regression', label: 'Regression (x vs y)' },
    { value: 'scatter', label: 'Scatter (x vs y)' },
    { value: 'line', label: 'Line from list' },
    { value: 'bar', label: 'Bar from list' },
    { value: 'histogram', label: 'Histogram' },
  ];

  const [chartType, setChartType] = useState<ChartType>(propType ?? 'returns');
  const [returnsInput, setReturnsInput] = useState(propReturns ?? '0.02 0.03 -0.01 0.05 0.02');
  const [xInput, setXInput] = useState(propX ?? '1 2 3 4 5');
  const [yInput, setYInput] = useState(propY ?? '2 4 1 3 5');
  const [simpleInput, setSimpleInput] = useState(propSimple ?? '1 2 3 4 5');
  const [histInput, setHistInput] = useState(propHist ?? '1 2 2 3 4 4 4 5 6');
  const [histBins, setHistBins] = useState(propHistBins ?? 5);
  const [useChartJs, setUseChartJs] = useState(true);

  // keep state in sync when props change
  React.useEffect(() => {
    if (propType && propType !== chartType) setChartType(propType);
  }, [propType]);
  React.useEffect(() => {
    if (propReturns !== undefined) setReturnsInput(propReturns);
  }, [propReturns]);
  React.useEffect(() => {
    if (propX !== undefined) setXInput(propX);
  }, [propX]);
  React.useEffect(() => {
    if (propY !== undefined) setYInput(propY);
  }, [propY]);
  React.useEffect(() => {
    if (propSimple !== undefined) setSimpleInput(propSimple);
  }, [propSimple]);
  React.useEffect(() => {
    if (propHist !== undefined) setHistInput(propHist);
  }, [propHist]);
  React.useEffect(() => {
    if (propHistBins !== undefined) setHistBins(propHistBins);
  }, [propHistBins]);

  // compute derived data based on chartType
  type LocalSeries = ChartSeries & { visible?: boolean };

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
            { name: 'Cumulative (actual)', points: cumulative, color: 'var(--color-chart-1)' },
            { name: 'Arithmetic avg', points: arith, color: 'var(--color-chart-2)' },
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
            { name: 'Data', points: reg.scatter, color: 'var(--color-chart-1)', type: 'scatter' },
            { name: 'Fit line', points: reg.line, color: 'var(--color-chart-2)', type: 'scatter' },
          ],
          xLabel: 'x',
          yLabel: 'y',
          extraInfo: `slope ${reg.slope.toFixed(3)}, intercept ${reg.intercept.toFixed(3)}`,
        };
      }
      case 'scatter': {
        const pts = computeXYSeries(xInput, yInput);
        if (pts == null) {
          return { series: [], xLabel: 'x', yLabel: 'y', extraInfo: 'invalid input' };
        }
        return {
          series: [{ name: 'Points', points: pts, color: 'var(--color-chart-1)', type: 'scatter' }],
          xLabel: 'x',
          yLabel: 'y',
          extraInfo: null,
        };
      }
      case 'line': {
        const pts = computeSeriesFromList(simpleInput);
        return {
          series: [{ name: 'Series', points: pts, color: 'var(--color-chart-1)' }],
          xLabel: 'Index',
          yLabel: 'Value',
          extraInfo: null,
        };
      }
      case 'bar': {
        const pts = computeSeriesFromList(simpleInput);
        return {
          series: [{ name: 'Bars', points: pts, color: 'var(--color-chart-1)', type: 'bar' }],
          xLabel: 'Index',
          yLabel: 'Value',
          extraInfo: null,
        };
      }
      case 'histogram': {
        const hist = computeHistogramSeries(histInput, histBins);
        return {
          series: [{ name: 'Count', points: hist, color: 'var(--color-chart-1)', type: 'bar' }],
          xLabel: 'Value',
          yLabel: 'Count',
          extraInfo: null,
        };
      }
    }
  }, [chartType, returnsInput, xInput, yInput, simpleInput, histInput, histBins]);

  return (
    <div className='space-y-4'>
      {!compact && (
        <>
          <div className='flex items-center gap-2'>
            <Label>Chart</Label>
            <Select value={chartType} onValueChange={(v) => setChartType(v as ChartType)}>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='Choose type' />
              </SelectTrigger>
              <SelectContent>
                {chartOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* inputs */}

          {chartType === 'returns' && (
            <div className='space-y-1'>
              <Label htmlFor='chart-returns'>Sample returns (space separated)</Label>
              <Input id='chart-returns' value={returnsInput} onChange={(e) => setReturnsInput(e.target.value)} />
            </div>
          )}

          {(chartType === 'regression' || chartType === 'scatter') && (
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

          {(chartType === 'line' || chartType === 'bar') && (
            <div className='space-y-1'>
              <Label htmlFor='chart-simple'>Values (space separated)</Label>
              <Input
                id='chart-simple'
                value={simpleInput}
                onChange={(e) => setSimpleInput(e.target.value)}
              />
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
        </>
      )}

      {/* controls */}
      <div className='flex items-center gap-2'>
        <Button size='sm' type='button' onClick={() => setUseChartJs((s) => !s)}>
          {useChartJs ? 'Chart.js' : 'SVG'}
        </Button>
        {extraInfo && <div className='text-sm text-muted-foreground'>{extraInfo}</div>}
      </div>

      {/* chart display */}
      <div>
        {useChartJs ? (
          <ChartJSChart series={series as ChartSeries[]} xLabel={xLabel} yLabel={yLabel} />
        ) : (
          <InteractiveChart series={series as InteractiveSeries[]} xLabel={xLabel} yLabel={yLabel} />
        )}
      </div>
    </div>
  );
}

export default ChartTools;
