import React from 'react';
import PlotDefault from 'react-plotly.js';
import * as factoryModule from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist-min';

export type Series = { name: string; points: Point[]; color?: string; type?: 'scatter' | 'bar' };

type Point = { x: number; y: number };

let Plot: any;
try {
  let create: any = (factoryModule as any).default ?? factoryModule;
  if (typeof create !== 'function' && (create as any).default) create = (create as any).default;
  Plot = create(Plotly as any);
} catch (err) {
  Plot = (PlotDefault as any) ?? null;
}

export default function PlotlyChart({
  series,
  width = 640,
  height = 260,
  xLabel = 'Period',
  yLabel = 'Cumulative factor',
}: {
  series: Series[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
}) {
  const data = series.map((s) => ({
    x: s.points.map((p) => p.x),
    y: s.points.map((p) => p.y),
    name: s.name,
    type: s.type === 'bar' ? 'bar' : 'scatter',
    mode: s.type === 'bar' ? undefined : 'lines+markers',
    marker: { color: s.color ?? '#3b82f6' },
  }));

  const layout: any = {
    width,
    height,
    margin: { t: 8, b: 36, l: 50, r: 8 },
    xaxis: { title: xLabel },
    yaxis: { title: yLabel },
  };

  return (
    <div>
      <Plot data={data} layout={layout} useResizeHandler style={{ width: '100%', height }} />
    </div>
  );
}
