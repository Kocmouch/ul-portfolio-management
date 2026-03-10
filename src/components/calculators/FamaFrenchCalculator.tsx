import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TeX from '@matejmazur/react-katex';
import { defaultChartOptions } from '@/lib/charts';

export function FamaFrenchCalculator() {
  const [betaM, setBetaM] = useState('1.0');
  const [betaSMB, setBetaSMB] = useState('0.2');
  const [betaHML, setBetaHML] = useState('-0.1');
  const [rf, setRf] = useState('0.02');
  const [marketReturn, setMarketReturn] = useState('0.08');
  const [smbPrem, setSmbPrem] = useState('0.03');
  const [hmlPrem, setHmlPrem] = useState('0.04');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contributions, setContributions] = useState<number[]>([]);

  useEffect(() => {
    const bM = Number(betaM);
    const bSMB = Number(betaSMB);
    const bHML = Number(betaHML);
    const Rf = Number(rf);
    const ERm = Number(marketReturn);
    const sPrem = Number(smbPrem);
    const hPrem = Number(hmlPrem);

    if (![bM, bSMB, bHML, Rf, ERm, sPrem, hPrem].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric values.');
      setResult(null);
      return;
    }

    const marketCont = bM * (ERm - Rf);
    const smbCont = bSMB * sPrem;
    const hmlCont = bHML * hPrem;
    const expected = Rf + marketCont + smbCont + hmlCont;

    setError(null);
    setResult(`${(expected * 100).toFixed(2)}%`);
    setContributions([Rf, marketCont, smbCont, hmlCont]);
  }, [betaM, betaSMB, betaHML, rf, marketReturn, smbPrem, hmlPrem]);

  const chartData = {
    labels: ['Risk-Free', 'Market', 'SMB', 'HML'],
    datasets: [
      {
        label: 'Contribution to Return',
        data: contributions,
        backgroundColor: [
          'rgba(245, 158, 11, 0.5)',
          'rgba(99, 102, 241, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='space-y-2'>
        <div className='grid grid-cols-3 gap-2'>
          <div className='space-y-1'>
            <Label htmlFor='ff-bm'>Beta (M)</Label>
            <Input id='ff-bm' value={betaM} onChange={(e) => setBetaM(e.target.value)} />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='ff-bsmb'>Beta (SMB)</Label>
            <Input id='ff-bsmb' value={betaSMB} onChange={(e) => setBetaSMB(e.target.value)} />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='ff-bhml'>Beta (HML)</Label>
            <Input id='ff-bhml' value={betaHML} onChange={(e) => setBetaHML(e.target.value)} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='space-y-1'>
            <Label htmlFor='ff-rf'>Risk-free (Rf)</Label>
            <Input id='ff-rf' value={rf} onChange={(e) => setRf(e.target.value)} />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='ff-rm'>Market Return (Rm)</Label>
            <Input id='ff-rm' value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)} />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='space-y-1'>
            <Label htmlFor='ff-smb'>SMB Premium</Label>
            <Input id='ff-smb' value={smbPrem} onChange={(e) => setSmbPrem(e.target.value)} />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='ff-hml'>HML Premium</Label>
            <Input id='ff-hml' value={hmlPrem} onChange={(e) => setHmlPrem(e.target.value)} />
          </div>
        </div>

        {error && <p className='text-sm text-destructive'>{error}</p>}
        {result && (
          <div className='rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-500 border border-emerald-500/20'>
            <p className='font-bold text-base'>Expected Return: {result}</p>
          </div>
        )}
        <div className='pt-3 border-t border-border mt-4'>
          <div className='text-xl mb-4'>
            <TeX block math={'E(R_i) = R_f + \\beta_M [E(R_M) - R_f] + \\beta_{SMB} SMB + \\beta_{HML} HML'} />
          </div>
          <div className='space-y-1 text-sm text-muted-foreground'>
            <p className='font-medium text-foreground mb-1'>Parameters:</p>
            <p>
              <TeX math='SMB' />: Small Minus Big (size premium)
            </p>
            <p>
              <TeX math='HML' />: High Minus Low (value premium)
            </p>
            <p>
              <TeX math='\\beta_M, \\beta_{SMB}, \\beta_{HML}' />: Factor sensitivities
            </p>
          </div>
        </div>
      </div>

      <div className='h-[250px] w-full'>
        <Bar data={chartData} options={defaultChartOptions} />
      </div>
    </div>
  );
}
