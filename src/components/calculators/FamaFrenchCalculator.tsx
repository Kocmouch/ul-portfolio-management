import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { parseNumberList } from '@/lib/calculatorUtils';
import BlockMath from '@matejmazur/react-katex';

export function FamaFrenchCalculator() {
  const [betaM, setBetaM] = useState('');
  const [betaSMB, setBetaSMB] = useState('');
  const [betaHML, setBetaHML] = useState('');
  const [rf, setRf] = useState('');
  const [marketReturn, setMarketReturn] = useState('');
  const [smbPrem, setSmbPrem] = useState('');
  const [hmlPrem, setHmlPrem] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // inputs: expected market return E(R_M), SMB premium, HML premium
  const handleCalculate = () => {
    const bM = Number(betaM);
    const bSMB = Number(betaSMB);
    const bHML = Number(betaHML);
    const Rf = Number(rf);
    const ERm = Number(marketReturn);
    const sPrem = Number(smbPrem);
    const hPrem = Number(hmlPrem);
    if (![bM, bSMB, bHML, Rf, ERm, sPrem, hPrem].every((v) => Number.isFinite(v))) {
      setError('Please enter numeric betas, risk-free rate, expected market return and factor premiums.');
      setResult(null);
      return;
    }

    const marketPrem = ERm - Rf;
    const expected = Rf + bM * marketPrem + bSMB * sPrem + bHML * hPrem;
    setError(null);
    setResult(`${(expected * 100).toFixed(2)}%`);
  };

  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <Label htmlFor='ff-bm'>Beta (market)</Label>
        <Input id='ff-bm' placeholder='e.g. 1.0' value={betaM} onChange={(e) => setBetaM(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ff-bsmb'>Beta (SMB)</Label>
        <Input id='ff-bsmb' placeholder='e.g. 0.2' value={betaSMB} onChange={(e) => setBetaSMB(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ff-bhml'>Beta (HML)</Label>
        <Input id='ff-bhml' placeholder='e.g. -0.1' value={betaHML} onChange={(e) => setBetaHML(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ff-rf'>Risk-free rate R_f (decimal)</Label>
        <Input id='ff-rf' placeholder='e.g. 0.02' value={rf} onChange={(e) => setRf(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ff-rm'>Expected market return E(R_m) (decimal)</Label>
        <Input id='ff-rm' placeholder='e.g. 0.08' value={marketReturn} onChange={(e) => setMarketReturn(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ff-smb'>SMB premium (decimal)</Label>
        <Input id='ff-smb' placeholder='e.g. 0.02' value={smbPrem} onChange={(e) => setSmbPrem(e.target.value)} />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ff-hml'>HML premium (decimal)</Label>
        <Input id='ff-hml' placeholder='e.g. 0.03' value={hmlPrem} onChange={(e) => setHmlPrem(e.target.value)} />
      </div>
      <Button type='button' size='sm' onClick={handleCalculate}>
        Calculate
      </Button>
      {error && <p className='text-sm text-destructive'>{error}</p>}
      {result && !error && (
        <p className='text-sm text-emerald-500'>Fama-French expected return: <span className='font-semibold'>{result}</span></p>
      )}
      <div className='pt-3 text-sm text-muted-foreground'>
        <BlockMath math={'E(R_i) = R_f + \\beta_M [E(R_M) - R_f] + \\beta_{SMB} \\cdot SMB + \\beta_{HML} \\cdot HML'} />
        <div className='mt-1'>
          <p className='font-semibold'>Parameters:</p>
          <p>- R_f: risk-free rate (decimal)</p>
          <p>- β_M: market beta</p>
          <p>- E(R_M): expected market return (decimal)</p>
          <p>- β_SMB: sensitivity to size factor (SMB)</p>
          <p>- SMB: small-minus-big premium (decimal)</p>
          <p>- β_HML: sensitivity to value factor (HML)</p>
          <p>- HML: high-minus-low premium (decimal)</p>
        </div>
      </div>
    </div>
  );
}
