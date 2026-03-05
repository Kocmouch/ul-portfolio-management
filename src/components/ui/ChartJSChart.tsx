import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { resolveCssVar } from '@/lib/utils';

// register components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export type Series = { name: string; points: Point[]; color?: string; type?: 'scatter' | 'bar' };
type Point = { x: number; y: number };

// helper hook to detect tailwind dark mode class changes
function useIsDark() {
  const check = () =>
    typeof document !== 'undefined' &&
    (document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark'));

  const [dark, setDark] = React.useState(check);
  React.useEffect(() => {
    const obs = new MutationObserver(() => setDark(check()));
    if (document.documentElement) {
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
    if (document.body) {
      obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
    return () => obs.disconnect();
  }, []);
  return dark;
}

export default function ChartJSChart({
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
  const isDark = useIsDark();

  const resolveColor = (c?: string) => {
    if (!c) return null;
    const m = c.match(/var\((--[^)]+)\)/);
    if (m) {
      const varName = m[1];
      const resolved = varName ? resolveCssVar(varName) : undefined;
      return resolved || c;
    }
    return c;
  };

  const datasets = series.map((s, idx) => {
    const color = resolveColor(s.color) ?? resolveColor('var(--color-chart-1)');
    const common: any = {
      label: s.name,
      data: s.points.map((p) => ({ x: p.x, y: p.y })),
      backgroundColor: color,
      borderColor: color,
      fill: false,
      tension: 0.1,
      pointRadius: 3,
    };
    if (s.type === 'bar') {
      return {
        ...common,
        type: 'bar',
      };
    }
    // scatter/line
    return {
      ...common,
      type: 'line',
    };
  });

  const data = {
    datasets,
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: { display: true, text: xLabel, color: isDark ? '#f9fafb' : '#111827' },
        grid: { color: isDark ? '#374151' : '#e5e7eb' },
        ticks: { color: isDark ? '#f9fafb' : '#111827' },
      },
      y: {
        title: { display: true, text: yLabel, color: isDark ? '#f9fafb' : '#111827' },
        grid: { color: isDark ? '#374151' : '#e5e7eb' },
        ticks: { color: isDark ? '#f9fafb' : '#111827' },
      },
    },
    plugins: {
      legend: { labels: { color: isDark ? '#f9fafb' : '#111827' } },
      tooltip: { mode: 'nearest' },
    },
  };

  return (
    <div style={{ width: '100%', height }}>
      <Chart type='line' data={data} options={options} />
    </div>
  );
}
