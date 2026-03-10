import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function CMLCalculator() {
  const [riskFreeRate, setRiskFreeRate] = useState('0.02');
  const [marketReturn, setMarketReturn] = useState('0.08');
  const [marketVolatility, setMarketVolatility] = useState('0.18');
  const [portfolioVolatility, setPortfolioVolatility] = useState('0.12');
  const [resultDecimal, setResultDecimal] = useState<string | null>(null);
  const [resultPercent, setResultPercent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rf = Number(riskFreeRate);
    const rm = Number(marketReturn);
    const sigmaM = Number(marketVolatility);
    const sigmaP = Number(portfolioVolatility);

    if (![rf, rm, sigmaM, sigmaP].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    if (sigmaM === 0) {
      setError('Market volatility σ_m must be non-zero.');
      setResultDecimal(null);
      setResultPercent(null);
      return;
    }

    const expectedReturn = rf + ((rm - rf) / sigmaM) * sigmaP;
    setError(null);
    setResultDecimal(expectedReturn.toFixed(4));
    setResultPercent(`${(expectedReturn * 100).toFixed(2)}%`);
  }, [riskFreeRate, marketReturn, marketVolatility, portfolioVolatility]);

  const maxVolatility = Math.max(Number(marketVolatility), Number(portfolioVolatility)) * 1.5;
  const rf = Number(riskFreeRate);
  const rm = Number(marketReturn);
  const sigmaM = Number(marketVolatility);
  const sigmaP = Number(portfolioVolatility);
  const erP = rf + ((rm - rf) / sigmaM) * sigmaP;

  const chartData = {
    datasets: [
      {
        label: 'Capital Market Line',
        data: [
          { x: 0, y: rf },
          { x: sigmaM, y: rm },
          { x: maxVolatility, y: rf + ((rm - rf) / sigmaM) * maxVolatility },
        ],
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        showLine: true,
      },
      {
        label: 'Market Portfolio',
        data: [{ x: sigmaM, y: rm }],
        backgroundColor: 'rgb(245, 158, 11)',
        pointRadius: 6,
        showLine: false,
      },
      {
        label: 'Chosen Portfolio',
        data: [{ x: sigmaP, y: erP }],
        backgroundColor: 'rgb(16, 185, 129)',
        pointRadius: 6,
        showLine: false,
      },
    ],
  };

  const chartOptions = {
    ...defaultChartOptions,
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales.x,
        title: { display: true, text: 'Volatility (σ)', color: 'rgba(255,255,255,0.7)' },
        min: 0,
      },
      y: {
        ...defaultChartOptions.scales.y,
        title: { display: true, text: 'Expected Return', color: 'rgba(255,255,255,0.7)' },
      },
    },
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <Label htmlFor='cml-rf'>Risk-free rate R_f</Label>
          <Input id='cml-rf' value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='cml-rm'>Market Return E(R_m)</Label>
          <Input id='cml-rm' value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='cml-sigma-m'>Market Volatility σ_m</Label>
          <Input id='cml-sigma-m' value={marketVolatility} onChange={(e) => setMarketVolatility(e.target.value)} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='cml-sigma-p'>Portfolio Volatility σ_p</Label>
          <Input id='cml-sigma-p' value={portfolioVolatility} onChange={(e) => setPortfolioVolatility(e.target.value)} />
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {resultPercent && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p>
              Expected Return: <span className='font-bold text-base'>{resultPercent}</span>
            </p>
          </div>
        )}
        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'E(R_p) = R_f + \\frac{E(R_m) - R_f}{\\sigma_M} \\sigma_p'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='\\sigma_p' />: Chosen risk level (volatility)
            </p>
            <p>
              <TeX math='\\frac{E(R_m) - R_f}{\\sigma_M}' />: Market price of risk (Sharpe ratio of market)
            </p>
          </div>
        </div>
      </div>

      <div className='h-[250px] w-full'>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
