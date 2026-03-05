import React, { useMemo, useRef, useState } from 'react';
import { resolveCssVar } from '@/lib/utils';

type Point = { x: number; y: number };
export type Series = { name: string; points: Point[]; color?: string; visible?: boolean; type?: 'scatter' | 'bar' };

const defaultColors = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)', 'var(--color-chart-4)'];

// resolve css variable colors at runtime
function resolveColor(c?: string) {
  if (!c) return null;
  const m = c.match(/var\((--[^)]+)\)/);
  if (m) {
    const varName = m[1];
    const resolved = varName ? resolveCssVar(varName) : undefined;
    return resolved || c;
  }
  return c;
}

// dark‑mode detection helper (same approach as ChartJSChart)
function useIsDark() {
  const check = () =>
    typeof document !== 'undefined' &&
    (document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark'));

  const [dark, setDark] = useState(check);
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

export function InteractiveChart({ series = [], width = 680, height = 300, xLabel = '', yLabel = '' }: { series?: Series[]; width?: number; height?: number; xLabel?: string; yLabel?: string }) {
  const isDark = useIsDark();
  const margin = { top: 12, right: 12, bottom: 36, left: 48 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const seriesList = series ?? [];
  const [visible, setVisible] = useState<boolean[]>(() => seriesList.map((s) => s?.visible ?? true));
  const [xDomain, setXDomain] = useState<[number, number]>(() => {
    const allX = seriesList.flatMap((s) => (s?.points ? s.points.map((p) => p.x) : []));
    return allX.length ? [Math.min(...allX), Math.max(...allX)] : [0, 1];
  });
  const [yDomain, setYDomain] = useState<[number, number]>(() => {
    const allY = seriesList.flatMap((s) => (s?.points ? s.points.map((p) => p.y) : []));
    return allY.length ? [Math.min(...allY), Math.max(...allY)] : [0, 1];
  });

  const [hover, setHover] = useState<{ x: number; px: number; py: number; values: { name: string; y: number }[] } | null>(null);

  const xToPx = (x: number) => margin.left + ((x - xDomain[0]) / (xDomain[1] - xDomain[0])) * plotW;
  const yToPx = (y: number) => margin.top + (1 - (y - yDomain[0]) / (yDomain[1] - yDomain[0])) * plotH;

  const lines = useMemo(() => {
    return seriesList.map((s, i) => ({
      color: resolveColor(s?.color) ?? resolveColor(defaultColors[i % defaultColors.length]) ?? defaultColors[i % defaultColors.length],
      path: s?.points ? s.points.map((p) => `${xToPx(p.x)},${yToPx(p.y)}`).join(' ') : '',
    }));
  }, [series, xDomain, yDomain]);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoom = e.deltaY > 0 ? 1.1 : 0.9;
    const cx = (xDomain[0] + xDomain[1]) / 2;
    const cy = (yDomain[0] + yDomain[1]) / 2;
    const xRange = (xDomain[1] - xDomain[0]) * zoom;
    const yRange = (yDomain[1] - yDomain[0]) * zoom;
    setXDomain([cx - xRange / 2, cx + xRange / 2]);
    setYDomain([cy - yRange / 2, cy + yRange / 2]);
  };

  const svgRef = useRef<SVGSVGElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const xVal = xDomain[0] + ((px - margin.left) / plotW) * (xDomain[1] - xDomain[0]);

    const values: { name: string; y: number }[] = [];
    for (let i = 0; i < seriesList.length; i++) {
      const s = seriesList[i];
      if (!s) continue;
      const pts = s.points ?? [];
      if (!visible[i] || pts.length === 0) continue;
      let nearest = pts[0]!;
      for (const p of pts) {
        if (Math.abs(p.x - xVal) < Math.abs(nearest.x - xVal)) nearest = p;
      }
      values.push({ name: s.name, y: nearest.y });
    }

    setHover({ x: xVal, px, py, values });
  };

  const onLeave = () => setHover(null);

  const toggle = (i: number) => {
    setVisible((v) => v.map((x, idx) => (idx === i ? !x : x)));
  };

  return (
    <div>
      <div className='flex items-center gap-4 mb-2'>
        {seriesList.map((s, i) => (
          <label key={s?.name ?? String(i)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type='checkbox' checked={visible[i]} onChange={() => toggle(i)} />
            <span style={{ width: 12, height: 12, background: s?.color ?? defaultColors[i % defaultColors.length], display: 'inline-block', borderRadius: 3 }} />
            <span style={{ fontSize: 12 }}>{s?.name ?? `Series ${i + 1}`}</span>
          </label>
        ))}
      </div>
      <svg ref={svgRef} width={width} height={height} onWheel={onWheel} onMouseMove={onMove} onMouseLeave={onLeave} style={{ touchAction: 'none', cursor: 'crosshair' }}>
        <rect
          x={margin.left}
          y={margin.top}
          width={plotW}
          height={plotH}
          fill={isDark ? resolveCssVar('--color-card') ?? '#1f2937' : resolveCssVar('--color-card') ?? '#ffffff'}
          stroke={isDark ? resolveCssVar('--color-border') ?? '#4b5563' : resolveCssVar('--color-border') ?? '#e5e7eb'}
        />

        {Array.from({ length: 4 }).map((_, i) => {
          const t = yDomain[0] + ((i / 3) * (yDomain[1] - yDomain[0]));
          const y = yToPx(t);
          return (
            <g key={i}>
              <line
                x1={margin.left}
                x2={margin.left + plotW}
                y1={y}
                y2={y}
                stroke={isDark ? '#374151' : '#f3f4f6'}
              />
              <text x={8} y={y + 4} fontSize={11} fill={isDark ? '#d1d5db' : '#6b7280'}>
                {t.toFixed(2)}
              </text>
            </g>
          );
        })}

        {seriesList.map((s, i) =>
          visible[i] && s && s.points ? (
            s.type === 'bar' ? (
              <g key={s?.name ?? String(i)}>
                {s.points.map((p, j) => {
                  const barW = plotW / (s.points.length || 1) * 0.8;
                  return (
                    <rect
                      key={j}
                      x={xToPx(p.x) - barW / 2}
                      y={yToPx(p.y)}
                      width={barW}
                      height={margin.top + plotH - yToPx(p.y)}
                      fill={resolveColor(s?.color) ?? resolveColor(defaultColors[i % defaultColors.length]) ?? defaultColors[i % defaultColors.length]}
                    />
                  );
                })}
              </g>
            ) : (
              <polyline
                key={s?.name ?? String(i)}
                fill='none'
                stroke={
                  resolveColor(s?.color) ??
                  resolveColor(defaultColors[i % defaultColors.length]) ??
                  defaultColors[i % defaultColors.length]
                }
                strokeWidth={2}
                points={s.points.map((p) => `${xToPx(p.x)},${yToPx(p.y)}`).join(' ')}
              />
            )
          ) : null,
        )}

        {hover && hover.px > margin.left && hover.px < margin.left + plotW ? (
          <g>
            <line x1={hover.px} x2={hover.px} y1={margin.top} y2={margin.top + plotH} stroke='#9ca3af' strokeDasharray='4 4' />
          </g>
        ) : null}
        {/* axis titles */}
        <text
          x={margin.left + plotW / 2}
          y={height - 6}
          fontSize={12}
          textAnchor='middle'
          fill={isDark ? '#d1d5db' : '#374151'}
        >
          {xLabel}
        </text>
        <text
          x={12}
          y={margin.top + plotH / 2}
          fontSize={12}
          textAnchor='middle'
          fill={isDark ? '#d1d5db' : '#374151'}
          transform={`rotate(-90 12 ${margin.top + plotH / 2})`}
        >
          {yLabel}
        </text>
      </svg>

      {hover ? (
        <div style={{ position: 'relative', marginTop: 6 }}>
          <div
            style={{
              background: isDark ? '#111827' : '#ffffff',
              color: isDark ? '#fff' : '#111827',
              padding: 8,
              borderRadius: 6,
              fontSize: 12,
              display: 'inline-block',
            }}
          >
            <div style={{ fontWeight: 600 }}>x: {hover.x.toFixed(2)}</div>
            {hover.values.map((v) => (
              <div key={v.name} style={{ display: 'flex', gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: isDark ? '#fff' : '#000',
                    borderRadius: 2,
                  }}
                />
                <div>{v.name}: {v.y.toFixed(4)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default InteractiveChart;
